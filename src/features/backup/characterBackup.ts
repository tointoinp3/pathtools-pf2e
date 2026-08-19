import { db } from '@/db'
import {
  getPortraitByCharacter,
  saveCharacter,
} from '@/features/characters/characterRepository'
import type { Character, PortraitTransform } from '@/types'
import { DEFAULT_PORTRAIT_TRANSFORM } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { dateStamp, downloadJson, fileSlug, jsonFormatOf, pickJsonFiles } from '@/utils/jsonFile'
import { useCharacterStore } from '@/stores/characterStore'
import { APP_SLUG } from '@/brand'
import {
  CHARACTER_FORMAT,
  CHARACTERS_FORMAT,
  isCharacterFileFormat,
  isCharactersFileFormat,
  isHomebrewFileFormat,
  invalidBackupJsonMessage,
} from '@/features/backup/formats'

export { CHARACTER_FORMAT, CHARACTERS_FORMAT }
export const CHARACTER_BACKUP_VERSION = 1

export interface PortraitJson {
  mimeType: string
  dataBase64: string
  transform?: PortraitTransform
}

export interface CharacterBackupEntry {
  character: Character
  portrait: PortraitJson | null
}

export interface CharacterFile {
  format: typeof CHARACTER_FORMAT
  version: number
  exportedAt: string
  character: Character
  portrait: PortraitJson | null
}

export interface CharactersFile {
  format: typeof CHARACTERS_FORMAT
  version: number
  exportedAt: string
  entries: CharacterBackupEntry[]
}

export interface CharacterImportResult {
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
    reader.onerror = () => reject(new Error('Falha ao ler o retrato.'))
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

function isCharacterLike(value: unknown): value is Character {
  if (typeof value !== 'object' || value === null) return false
  const c = value as Partial<Character>
  return typeof c.id === 'string' && typeof c.name === 'string'
}

function isPortraitJson(value: unknown): value is PortraitJson {
  if (typeof value !== 'object' || value === null) return false
  const p = value as Partial<PortraitJson>
  return typeof p.mimeType === 'string' && typeof p.dataBase64 === 'string'
}

async function entryFromCharacter(character: Character): Promise<CharacterBackupEntry> {
  const record = await getPortraitByCharacter(character.id)
  if (!record) {
    return {
      character: { ...character, portraitId: character.portraitId ?? null },
      portrait: null,
    }
  }
  return {
    character,
    portrait: {
      mimeType: record.mimeType,
      dataBase64: await blobToBase64(record.blob),
      transform: record.transform ?? DEFAULT_PORTRAIT_TRANSFORM,
    },
  }
}

export async function buildCharacterFile(character: Character): Promise<CharacterFile> {
  const entry = await entryFromCharacter(character)
  return {
    format: CHARACTER_FORMAT,
    version: CHARACTER_BACKUP_VERSION,
    exportedAt: nowIso(),
    character: entry.character,
    portrait: entry.portrait,
  }
}

export async function buildCharactersFile(
  characters: Character[],
): Promise<CharactersFile> {
  const entries: CharacterBackupEntry[] = []
  for (const character of characters) {
    entries.push(await entryFromCharacter(character))
  }
  return {
    format: CHARACTERS_FORMAT,
    version: CHARACTER_BACKUP_VERSION,
    exportedAt: nowIso(),
    entries,
  }
}

export async function exportCharacterToFile(character: Character): Promise<void> {
  const file = await buildCharacterFile(character)
  downloadJson(
    `personagem-${fileSlug(character.name, 'ficha')}.json`,
    file,
  )
}

export async function exportAllCharactersToFile(): Promise<boolean> {
  const characters = await db.characters.orderBy('updatedAt').reverse().toArray()
  if (characters.length === 0) {
    window.alert('Não há personagens para exportar.')
    return false
  }
  return exportCharactersToFile(
    characters,
    `personagens-${APP_SLUG}-${dateStamp()}.json`,
  )
}

export async function exportCharactersToFile(
  characters: Character[],
  filename?: string,
): Promise<boolean> {
  if (characters.length === 0) {
    window.alert('Selecione pelo menos um personagem.')
    return false
  }
  if (characters.length === 1) {
    const only = characters[0]
    if (only) await exportCharacterToFile(only)
    return true
  }
  const file = await buildCharactersFile(characters)
  downloadJson(
    filename ?? `personagens-lote-${characters.length}-${dateStamp()}.json`,
    file,
  )
  return true
}

export async function runCharacterExportMany(characters: Character[]): Promise<void> {
  await exportCharactersToFile(characters)
}

function parseEntries(data: unknown): CharacterBackupEntry[] {
  if (typeof data !== 'object' || data === null) {
    throw new Error(invalidBackupJsonMessage())
  }
  const raw = data as Record<string, unknown>
  const format = raw.format

  if (isCharacterFileFormat(format)) {
    if (!isCharacterLike(raw.character)) {
      throw new Error('Este JSON de personagem está incompleto.')
    }
    return [
      {
        character: raw.character,
        portrait: isPortraitJson(raw.portrait) ? raw.portrait : null,
      },
    ]
  }

  if (isCharactersFileFormat(format)) {
    if (!Array.isArray(raw.entries)) {
      throw new Error('Este JSON de personagens está incompleto.')
    }
    const entries: CharacterBackupEntry[] = []
    for (const item of raw.entries) {
      if (typeof item !== 'object' || item === null) continue
      const row = item as Record<string, unknown>
      if (!isCharacterLike(row.character)) continue
      entries.push({
        character: row.character,
        portrait: isPortraitJson(row.portrait) ? row.portrait : null,
      })
    }
    if (entries.length === 0) {
      throw new Error('Este arquivo não contém personagens.')
    }
    return entries
  }

  if (isHomebrewFileFormat(format)) {
    throw new Error(
      'Este arquivo é de conteúdo homebrew. Importe-o na página Homebrew.',
    )
  }

  throw new Error(invalidBackupJsonMessage('character'))
}

async function writePortrait(
  characterId: string,
  portraitId: string,
  portrait: PortraitJson,
): Promise<void> {
  await db.portraits.put({
    id: portraitId,
    characterId,
    blob: base64ToBlob(portrait.dataBase64, portrait.mimeType),
    mimeType: portrait.mimeType,
    transform: portrait.transform ?? DEFAULT_PORTRAIT_TRANSFORM,
    updatedAt: nowIso(),
  })
}

async function existingGroupId(
  groupId: string | null | undefined,
): Promise<string | null> {
  if (!groupId) return null
  const group = await db.characterGroups.get(groupId)
  return group ? groupId : null
}

async function importOne(
  entry: CharacterBackupEntry,
  mode: 'replace' | 'copy',
): Promise<'created' | 'replaced' | 'copied'> {
  const existing = await db.characters.get(entry.character.id)
  const now = nowIso()

  if (!existing || mode === 'replace') {
    const portraitId = entry.portrait
      ? (existing?.portraitId ?? entry.character.portraitId ?? createId('portrait'))
      : null
    const character: Character = {
      ...entry.character,
      portraitId,
      groupId: await existingGroupId(entry.character.groupId),
      updatedAt: now,
      createdAt: existing?.createdAt ?? entry.character.createdAt ?? now,
    }
    await saveCharacter(character)
    if (entry.portrait && portraitId) {
      await writePortrait(character.id, portraitId, entry.portrait)
    } else if (existing?.portraitId && !entry.portrait) {
      await db.portraits.delete(existing.portraitId)
      await db.portraits.where('characterId').equals(character.id).delete()
    }
    return existing ? 'replaced' : 'created'
  }

  const newId = createId('char')
  const newPortraitId = entry.portrait ? createId('portrait') : null
  const character: Character = {
    ...entry.character,
    id: newId,
    name: `${entry.character.name} (cópia)`,
    portraitId: newPortraitId,
    groupId: await existingGroupId(entry.character.groupId),
    createdAt: now,
    updatedAt: now,
  }
  await saveCharacter(character)
  if (entry.portrait && newPortraitId) {
    await writePortrait(newId, newPortraitId, entry.portrait)
  }
  return 'copied'
}

export async function importCharacterData(
  data: unknown,
): Promise<CharacterImportResult> {
  return importCharacterEntries(parseEntries(data))
}

export async function importCharacterFromFiles(
  datas: unknown[],
): Promise<{ result: CharacterImportResult; skippedOther: number; fileCount: number }> {
  const entries: CharacterBackupEntry[] = []
  let skippedOther = 0
  for (const data of datas) {
    const format = jsonFormatOf(data)
    if (isHomebrewFileFormat(format)) {
      skippedOther += 1
      continue
    }
    entries.push(...parseEntries(data))
  }
  if (entries.length === 0) {
    if (skippedOther > 0) {
      throw new Error(
        'Estes arquivos são de homebrew. Importe-os na página Homebrew.',
      )
    }
    throw new Error('Nenhum personagem neste lote.')
  }
  return {
    result: await importCharacterEntries(entries),
    skippedOther,
    fileCount: datas.length - skippedOther,
  }
}

async function importCharacterEntries(
  entries: CharacterBackupEntry[],
): Promise<CharacterImportResult> {
  const collisions: CharacterBackupEntry[] = []
  for (const entry of entries) {
    if (await db.characters.get(entry.character.id)) collisions.push(entry)
  }

  let mode: 'replace' | 'copy' = 'replace'
  const firstCollision = collisions[0]
  if (firstCollision) {
    const names = collisions.map((e) => e.character.name).join(', ')
    const ok =
      entries.length === 1
        ? window.confirm(
            `Já existe um personagem com este ID (“${firstCollision.character.name}”). OK substitui a ficha local. Cancelar importa como cópia.`,
          )
        : window.confirm(
            `Alguns personagens deste arquivo já existem (${names}). OK substitui os que coincidirem. Cancelar importa todos como cópias.`,
          )
    mode = ok ? 'replace' : 'copy'
  }

  const result: CharacterImportResult = {
    created: 0,
    replaced: 0,
    copied: 0,
    names: [],
  }

  for (const entry of entries) {
    const status = await importOne(entry, mode)
    result[status] += 1
    result.names.push(
      status === 'copied' ? `${entry.character.name} (cópia)` : entry.character.name,
    )
  }

  return result
}

export function formatCharacterImportSummary(result: CharacterImportResult): string {
  const parts: string[] = []
  if (result.created) parts.push(`${result.created} novo${result.created === 1 ? '' : 's'}`)
  if (result.replaced) {
    parts.push(`${result.replaced} substituído${result.replaced === 1 ? '' : 's'}`)
  }
  if (result.copied) parts.push(`${result.copied} cópia${result.copied === 1 ? '' : 's'}`)
  const detail = parts.length ? ` (${parts.join(', ')})` : ''
  if (result.names.length === 1) {
    return `Personagem importado: ${result.names[0]}${detail}.`
  }
  return `${result.names.length} personagens importados${detail}.`
}

export async function runCharacterImport(): Promise<void> {
  const files = await pickJsonFiles()
  if (files == null || files.length === 0) return
  const { result, skippedOther, fileCount } = await importCharacterFromFiles(files)
  const extra =
    files.length > 1
      ? ` ${fileCount} arquivo${fileCount === 1 ? '' : 's'} de ficha.`
      : ''
  const skip =
    skippedOther > 0
      ? ` ${skippedOther} arquivo${skippedOther === 1 ? '' : 's'} de homebrew ignorado${skippedOther === 1 ? '' : 's'}.`
      : ''
  await useCharacterStore.getState().loadAll()
  window.alert(`${formatCharacterImportSummary(result)}${extra}${skip}`)
}

export async function runCharacterExportAll(): Promise<void> {
  await exportAllCharactersToFile()
}

export async function runCharacterExportOne(character: Character): Promise<void> {
  await exportCharacterToFile(character)
}
