import { db } from '@/db'
import { tokenImageId, type CombatSession } from '@/types'
import { createId, nowIso } from '@/utils/id'
import {
  dateStamp,
  downloadJson,
  fileSlug,
  jsonFormatOf,
  pickJsonFiles,
} from '@/utils/jsonFile'
import { APP_SLUG } from '@/brand'
import {
  COMBAT_FORMAT,
  COMBATS_FORMAT,
  COMBAT_BACKUP_VERSION,
  parseCombatPack,
  remapCombatEntry,
  type CombatBackupEntry,
  type CombatImageJson,
} from '@/engine/combatPack'
import {
  isCharacterFileFormat,
  isCharactersFileFormat,
  isHomebrewFileFormat,
} from '@/features/backup/formats'
import { saveCombatSession } from '@/features/combat/combatRepository'
import { saveTokenImage } from '@/features/combat/combatImageRepository'
import { useCombatStore } from '@/stores/combatStore'

export { COMBAT_FORMAT, COMBATS_FORMAT, COMBAT_BACKUP_VERSION }

export interface CombatImportResult {
  created: number
  replaced: number
  copied: number
  names: string[]
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = String(reader.result ?? '')
      const comma = result.indexOf(',')
      resolve(comma >= 0 ? result.slice(comma + 1) : result)
    }
    reader.onerror = () => reject(new Error('Falha ao ler uma imagem do combate.'))
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

async function imagesForSession(
  session: CombatSession,
): Promise<CombatImageJson[]> {
  const images: CombatImageJson[] = []
  const seen = new Set<string>()

  async function push(
    scope: CombatImageJson['scope'],
    ownerId: string,
  ) {
    const key = `${scope}:${ownerId}`
    if (seen.has(key)) return
    seen.add(key)
    const record = await db.tokenImages.get(tokenImageId(scope, ownerId))
    if (!record) return
    images.push({
      scope,
      ownerId,
      mimeType: record.mimeType,
      dataBase64: await blobToBase64(record.blob),
    })
  }

  await push('map', session.id)
  for (const token of session.tokens) {
    await push('token', token.id)
    if (token.creatureId) await push('creature', token.creatureId)
  }
  return images
}

async function entryFromSession(
  session: CombatSession,
): Promise<CombatBackupEntry> {
  return { session, images: await imagesForSession(session) }
}

export async function buildCombatFile(
  session: CombatSession,
): Promise<{
  format: typeof COMBAT_FORMAT
  version: number
  exportedAt: string
  session: CombatSession
  images: CombatImageJson[]
}> {
  const entry = await entryFromSession(session)
  return {
    format: COMBAT_FORMAT,
    version: COMBAT_BACKUP_VERSION,
    exportedAt: nowIso(),
    session: entry.session,
    images: entry.images,
  }
}

export async function exportCombatToFile(session: CombatSession): Promise<void> {
  const file = await buildCombatFile(session)
  downloadJson(`combate-${fileSlug(session.name, 'combate')}.json`, file)
}

export async function exportCombatsToFile(
  sessions: CombatSession[],
  filename?: string,
): Promise<boolean> {
  if (sessions.length === 0) {
    window.alert('Selecione pelo menos um combate.')
    return false
  }
  if (sessions.length === 1) {
    const only = sessions[0]
    if (only) await exportCombatToFile(only)
    return true
  }
  const entries: CombatBackupEntry[] = []
  for (const session of sessions) {
    entries.push(await entryFromSession(session))
  }
  downloadJson(
    filename ?? `combates-lote-${sessions.length}-${dateStamp()}.json`,
    {
      format: COMBATS_FORMAT,
      version: COMBAT_BACKUP_VERSION,
      exportedAt: nowIso(),
      entries,
    },
  )
  return true
}

export async function exportAllCombatsToFile(): Promise<boolean> {
  const sessions = await db.combatSessions.orderBy('updatedAt').reverse().toArray()
  if (sessions.length === 0) {
    window.alert('Não há combates para exportar.')
    return false
  }
  return exportCombatsToFile(
    sessions,
    `combates-${APP_SLUG}-${dateStamp()}.json`,
  )
}

async function writeImages(images: CombatImageJson[]): Promise<void> {
  for (const image of images) {
    await saveTokenImage(
      image.scope,
      image.ownerId,
      base64ToBlob(image.dataBase64, image.mimeType),
    )
  }
}

async function importOne(
  entry: CombatBackupEntry,
  mode: 'replace' | 'copy',
): Promise<'created' | 'replaced' | 'copied'> {
  const existing = await db.combatSessions.get(entry.session.id)
  const now = nowIso()

  if (!existing || mode === 'replace') {
    const session: CombatSession = {
      ...entry.session,
      updatedAt: now,
      createdAt: existing?.createdAt ?? entry.session.createdAt ?? now,
    }
    await saveCombatSession(session)
    await writeImages(entry.images)
    return existing ? 'replaced' : 'created'
  }

  const remapped = remapCombatEntry(
    entry,
    createId('combat'),
    () => createId('combat-token'),
    `${entry.session.name} (cópia)`,
    now,
  )
  await saveCombatSession(remapped.session)
  await writeImages(remapped.images)
  return 'copied'
}

async function importEntries(
  entries: CombatBackupEntry[],
): Promise<CombatImportResult> {
  const collisions: CombatBackupEntry[] = []
  for (const entry of entries) {
    if (await db.combatSessions.get(entry.session.id)) collisions.push(entry)
  }

  let mode: 'replace' | 'copy' = 'replace'
  const firstCollision = collisions[0]
  if (firstCollision) {
    const names = collisions.map((entry) => entry.session.name).join(', ')
    const ok =
      entries.length === 1
        ? window.confirm(
            `Já existe um combate com este ID (“${firstCollision.session.name}”). OK substitui o tabuleiro local. Cancelar importa como cópia.`,
          )
        : window.confirm(
            `Alguns combates deste arquivo já existem (${names}). OK substitui os que coincidirem. Cancelar importa todos como cópias.`,
          )
    mode = ok ? 'replace' : 'copy'
  }

  const result: CombatImportResult = {
    created: 0,
    replaced: 0,
    copied: 0,
    names: [],
  }

  for (const entry of entries) {
    const status = await importOne(entry, mode)
    result[status] += 1
    result.names.push(
      status === 'copied'
        ? `${entry.session.name} (cópia)`
        : entry.session.name,
    )
  }
  return result
}

export function formatCombatImportSummary(result: CombatImportResult): string {
  const parts: string[] = []
  if (result.created) {
    parts.push(`${result.created} novo${result.created === 1 ? '' : 's'}`)
  }
  if (result.replaced) {
    parts.push(
      `${result.replaced} substituído${result.replaced === 1 ? '' : 's'}`,
    )
  }
  if (result.copied) {
    parts.push(`${result.copied} cópia${result.copied === 1 ? '' : 's'}`)
  }
  const detail = parts.length ? ` (${parts.join(', ')})` : ''
  if (result.names.length === 1) {
    return `Combate importado: ${result.names[0]}${detail}.`
  }
  return `${result.names.length} combates importados${detail}.`
}

export async function importCombatFromFiles(
  datas: unknown[],
): Promise<{
  result: CombatImportResult
  skippedOther: number
  fileCount: number
}> {
  const entries: CombatBackupEntry[] = []
  let skippedOther = 0
  for (const data of datas) {
    const format = jsonFormatOf(data)
    if (
      isHomebrewFileFormat(format) ||
      isCharacterFileFormat(format) ||
      isCharactersFileFormat(format)
    ) {
      skippedOther += 1
      continue
    }
    entries.push(...parseCombatPack(data))
  }
  if (entries.length === 0) {
    if (skippedOther > 0) {
      throw new Error(
        'Estes arquivos não são de combate. Personagens vão em Personagens; homebrew, na página Homebrew.',
      )
    }
    throw new Error('Nenhum combate neste lote.')
  }
  return {
    result: await importEntries(entries),
    skippedOther,
    fileCount: datas.length - skippedOther,
  }
}

export async function runCombatImport(): Promise<void> {
  const files = await pickJsonFiles()
  if (files == null || files.length === 0) return
  const { result, skippedOther, fileCount } = await importCombatFromFiles(files)
  const extra =
    files.length > 1
      ? ` ${fileCount} arquivo${fileCount === 1 ? '' : 's'} de combate.`
      : ''
  const skip =
    skippedOther > 0
      ? ` ${skippedOther} arquivo${skippedOther === 1 ? '' : 's'} de outro tipo ignorado${skippedOther === 1 ? '' : 's'}.`
      : ''
  const store = useCombatStore.getState()
  await store.loadAll()
  store.bumpImageVersion()
  const current = store.current
  if (current) await store.loadOne(current.id)
  window.alert(`${formatCombatImportSummary(result)}${extra}${skip}`)
}

export async function runCombatExportAll(): Promise<void> {
  await exportAllCombatsToFile()
}

export async function runCombatExportOne(session: CombatSession): Promise<void> {
  await exportCombatToFile(session)
}

export async function runCombatExportMany(
  sessions: CombatSession[],
): Promise<void> {
  await exportCombatsToFile(sessions)
}
