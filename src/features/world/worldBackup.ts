import { db } from '@/db'
import type { WorldAssetRecord } from '@/types'
import { nowIso } from '@/utils/id'
import {
  dateStamp,
  downloadJson,
  pickJsonFiles,
} from '@/utils/jsonFile'
import { APP_SLUG } from '@/brand'
import {
  WORLD_FORMAT,
  WORLD_BACKUP_VERSION,
  parseWorldPack,
  remapWorldPack,
  worldPackIsEmpty,
  type WorldAssetJson,
  type WorldPack,
} from '@/engine/worldPack'
import {
  isCharacterFileFormat,
  isCharactersFileFormat,
  isCombatFileFormat,
  isCombatsFileFormat,
  isHomebrewFileFormat,
} from '@/features/backup/formats'
import { jsonFormatOf } from '@/utils/jsonFile'
import { useWorldStore } from '@/stores/worldStore'
import { useWorldMapStore } from '@/stores/worldMapStore'

export { WORLD_FORMAT, WORLD_BACKUP_VERSION }

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result ?? '')
      const comma = result.indexOf(',')
      resolve(comma >= 0 ? result.slice(comma + 1) : result)
    }
    reader.onerror = () =>
      reject(new Error('Falha ao ler uma imagem do mundo.'))
    reader.readAsDataURL(blob)
  })
}

function base64ToBlob(base64: string, mimeType: string): Blob {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new Blob([bytes], { type: mimeType || 'application/octet-stream' })
}

async function collectPack(): Promise<WorldPack> {
  const [notes, folders, maps, assets] = await Promise.all([
    db.worldNotes.toArray(),
    db.worldFolders.toArray(),
    db.worldMaps.toArray(),
    db.worldAssets.toArray(),
  ])
  const images: WorldAssetJson[] = []
  for (const asset of assets) {
    images.push({
      id: asset.id,
      kind: asset.kind,
      name: asset.name,
      mimeType: asset.mimeType,
      dataBase64: await blobToBase64(asset.blob),
    })
  }
  return { notes, folders, maps, assets: images }
}

export async function exportWorldToFile(): Promise<boolean> {
  const pack = await collectPack()
  if (worldPackIsEmpty(pack)) {
    window.alert('Não há notas, pastas nem mapas para exportar.')
    return false
  }
  downloadJson(`mundo-${APP_SLUG}-${dateStamp()}.json`, {
    format: WORLD_FORMAT,
    version: WORLD_BACKUP_VERSION,
    exportedAt: nowIso(),
    ...pack,
  })
  return true
}

async function writePack(pack: WorldPack): Promise<void> {
  const now = nowIso()
  await db.transaction(
    'rw',
    [db.worldNotes, db.worldFolders, db.worldMaps, db.worldAssets],
    async () => {
      if (pack.folders.length) await db.worldFolders.bulkPut(pack.folders)
      if (pack.notes.length) await db.worldNotes.bulkPut(pack.notes)
      if (pack.maps.length) await db.worldMaps.bulkPut(pack.maps)
      for (const asset of pack.assets) {
        const record: WorldAssetRecord = {
          id: asset.id,
          kind: asset.kind,
          name: asset.name,
          mimeType: asset.mimeType,
          blob: base64ToBlob(asset.dataBase64, asset.mimeType),
          createdAt: now,
          updatedAt: now,
        }
        await db.worldAssets.put(record)
      }
    },
  )
}

export interface WorldImportResult {
  notes: number
  folders: number
  maps: number
  assets: number
  copied: boolean
}

async function importPack(pack: WorldPack): Promise<WorldImportResult> {
  const collisions =
    (await Promise.all(pack.notes.map((note) => db.worldNotes.get(note.id)))).some(
      Boolean,
    ) ||
    (await Promise.all(pack.maps.map((map) => db.worldMaps.get(map.id)))).some(
      Boolean,
    )

  let next = pack
  let copied = false
  if (collisions) {
    const ok = window.confirm(
      'Já existe mundo com alguns destes IDs. OK substitui as notas/mapas que coincidirem. Cancelar importa tudo como cópia.',
    )
    if (!ok) {
      next = remapWorldPack(pack, nowIso())
      copied = true
    }
  }
  await writePack(next)
  return {
    notes: next.notes.length,
    folders: next.folders.length,
    maps: next.maps.length,
    assets: next.assets.length,
    copied,
  }
}

export function formatWorldImportSummary(result: WorldImportResult): string {
  const bits = [
    result.notes ? `${result.notes} nota${result.notes === 1 ? '' : 's'}` : '',
    result.folders
      ? `${result.folders} pasta${result.folders === 1 ? '' : 's'}`
      : '',
    result.maps ? `${result.maps} mapa${result.maps === 1 ? '' : 's'}` : '',
    result.assets
      ? `${result.assets} imagem${result.assets === 1 ? '' : 'ns'}`
      : '',
  ].filter(Boolean)
  const suffix = result.copied ? ' (cópia)' : ''
  if (bits.length === 0) return 'Nada para importar.'
  return `Mundo importado: ${bits.join(', ')}${suffix}.`
}

export async function importWorldFromFiles(
  datas: unknown[],
): Promise<{ result: WorldImportResult; skippedOther: number }> {
  const packs: WorldPack[] = []
  let skippedOther = 0
  for (const data of datas) {
    const format = jsonFormatOf(data)
    if (
      isHomebrewFileFormat(format) ||
      isCharacterFileFormat(format) ||
      isCharactersFileFormat(format) ||
      isCombatFileFormat(format) ||
      isCombatsFileFormat(format)
    ) {
      skippedOther += 1
      continue
    }
    packs.push(parseWorldPack(data))
  }
  if (packs.length === 0) {
    if (skippedOther > 0) {
      throw new Error(
        'Estes arquivos não são de mundo. Personagens, combates e homebrew têm a própria página de importação.',
      )
    }
    throw new Error('Nenhum mundo neste lote.')
  }
  const merged: WorldPack = {
    notes: packs.flatMap((pack) => pack.notes),
    folders: packs.flatMap((pack) => pack.folders),
    maps: packs.flatMap((pack) => pack.maps),
    assets: packs.flatMap((pack) => pack.assets),
  }
  return { result: await importPack(merged), skippedOther }
}

export async function runWorldImport(): Promise<void> {
  const files = await pickJsonFiles()
  if (files == null || files.length === 0) return
  const { result, skippedOther } = await importWorldFromFiles(files)
  const skip =
    skippedOther > 0
      ? ` ${skippedOther} arquivo${skippedOther === 1 ? '' : 's'} de outro tipo ignorado${skippedOther === 1 ? '' : 's'}.`
      : ''
  await useWorldStore.getState().loadAll()
  await useWorldMapStore.getState().loadAll()
  useWorldMapStore.getState().bumpAssetVersion()
  window.alert(`${formatWorldImportSummary(result)}${skip}`)
}

export async function runWorldExport(): Promise<void> {
  await exportWorldToFile()
}
