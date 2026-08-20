import type { CombatSession, CombatToken, TokenImageRecord } from '@/types/combat'
import {
  COMBAT_FORMAT,
  COMBATS_FORMAT,
  isCharacterFileFormat,
  isCharactersFileFormat,
  isCombatFileFormat,
  isCombatsFileFormat,
  isHomebrewFileFormat,
  invalidBackupJsonMessage,
} from '@/features/backup/formats'

export { COMBAT_FORMAT, COMBATS_FORMAT }

export const COMBAT_BACKUP_VERSION = 1

export interface CombatImageJson {
  scope: TokenImageRecord['scope']
  ownerId: string
  mimeType: string
  dataBase64: string
}

export interface CombatBackupEntry {
  session: CombatSession
  images: CombatImageJson[]
}

const IMAGE_SCOPES = new Set<TokenImageRecord['scope']>([
  'token',
  'creature',
  'map',
])

function isSessionLike(value: unknown): value is CombatSession {
  if (typeof value !== 'object' || value === null) return false
  const session = value as Partial<CombatSession>
  return (
    typeof session.id === 'string' &&
    typeof session.name === 'string' &&
    Array.isArray(session.tokens) &&
    typeof session.gridCols === 'number' &&
    typeof session.gridRows === 'number'
  )
}

function isImageJson(value: unknown): value is CombatImageJson {
  if (typeof value !== 'object' || value === null) return false
  const image = value as Partial<CombatImageJson>
  return (
    typeof image.scope === 'string' &&
    IMAGE_SCOPES.has(image.scope) &&
    typeof image.ownerId === 'string' &&
    typeof image.mimeType === 'string' &&
    typeof image.dataBase64 === 'string'
  )
}

function readImages(value: unknown): CombatImageJson[] {
  if (!Array.isArray(value)) return []
  return value.filter(isImageJson)
}

/** Lê um JSON de um combate ou de um lote. */
export function parseCombatPack(data: unknown): CombatBackupEntry[] {
  if (typeof data !== 'object' || data === null) {
    throw new Error(invalidBackupJsonMessage('combat'))
  }
  const raw = data as Record<string, unknown>
  const format = raw.format

  if (isCharacterFileFormat(format) || isCharactersFileFormat(format)) {
    throw new Error(
      'Este arquivo é de personagem. Importe-o na página Personagens.',
    )
  }
  if (isHomebrewFileFormat(format)) {
    throw new Error(
      'Este arquivo é de conteúdo homebrew. Importe-o na página Homebrew.',
    )
  }

  if (isCombatFileFormat(format)) {
    if (!isSessionLike(raw.session)) {
      throw new Error('Este JSON de combate está incompleto.')
    }
    return [{ session: raw.session, images: readImages(raw.images) }]
  }

  if (isCombatsFileFormat(format)) {
    if (!Array.isArray(raw.entries)) {
      throw new Error('Este JSON de combates está incompleto.')
    }
    const entries: CombatBackupEntry[] = []
    for (const item of raw.entries) {
      if (typeof item !== 'object' || item === null) continue
      const row = item as Record<string, unknown>
      if (!isSessionLike(row.session)) continue
      entries.push({
        session: row.session,
        images: readImages(row.images),
      })
    }
    if (entries.length === 0) {
      throw new Error('Este arquivo não contém combates.')
    }
    return entries
  }

  throw new Error(invalidBackupJsonMessage('combat'))
}

export function remapCombatEntry(
  entry: CombatBackupEntry,
  newSessionId: string,
  tokenIdFor: (oldId: string) => string,
  copiedName: string,
  now: string,
): CombatBackupEntry {
  const idMap = new Map<string, string>()
  const tokens: CombatToken[] = entry.session.tokens.map((token) => {
    const nextId = tokenIdFor(token.id)
    idMap.set(token.id, nextId)
    return {
      ...token,
      id: nextId,
      conditions: [...token.conditions],
      lootItems: token.lootItems?.map((item) => ({ ...item })),
    }
  })
  const turnTokenId = entry.session.turnTokenId
    ? (idMap.get(entry.session.turnTokenId) ?? null)
    : null

  return {
    session: {
      ...entry.session,
      id: newSessionId,
      name: copiedName,
      tokens,
      turnTokenId,
      createdAt: now,
      updatedAt: now,
    },
    images: entry.images.map((image) => {
      if (image.scope === 'map') {
        return { ...image, ownerId: newSessionId }
      }
      if (image.scope === 'token') {
        return {
          ...image,
          ownerId: idMap.get(image.ownerId) ?? image.ownerId,
        }
      }
      return { ...image }
    }),
  }
}
