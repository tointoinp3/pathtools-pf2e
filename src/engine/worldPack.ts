import type {
  WorldAssetRecord,
  WorldFolder,
  WorldMap,
  WorldNote,
} from '@/types'
import {
  WORLD_FORMAT,
  isCharacterFileFormat,
  isCharactersFileFormat,
  isCombatFileFormat,
  isCombatsFileFormat,
  isHomebrewFileFormat,
  invalidBackupJsonMessage,
} from '@/features/backup/formats'
import { createId } from '@/utils/id'

export { WORLD_FORMAT }
export const WORLD_BACKUP_VERSION = 1

export interface WorldAssetJson {
  id: string
  kind: 'icon' | 'map'
  name: string
  mimeType: string
  dataBase64: string
}

export interface WorldPack {
  notes: WorldNote[]
  folders: WorldFolder[]
  maps: WorldMap[]
  assets: WorldAssetJson[]
}

function isNote(value: unknown): value is WorldNote {
  if (typeof value !== 'object' || value === null) return false
  const note = value as Partial<WorldNote>
  return (
    typeof note.id === 'string' &&
    typeof note.title === 'string' &&
    typeof note.content === 'string' &&
    Array.isArray(note.attachments)
  )
}

function isFolder(value: unknown): value is WorldFolder {
  if (typeof value !== 'object' || value === null) return false
  const folder = value as Partial<WorldFolder>
  return typeof folder.id === 'string' && typeof folder.name === 'string'
}

function isMap(value: unknown): value is WorldMap {
  if (typeof value !== 'object' || value === null) return false
  const map = value as Partial<WorldMap>
  return (
    typeof map.id === 'string' &&
    typeof map.name === 'string' &&
    Array.isArray(map.markers) &&
    Array.isArray(map.countries)
  )
}

function isAssetJson(value: unknown): value is WorldAssetJson {
  if (typeof value !== 'object' || value === null) return false
  const asset = value as Partial<WorldAssetJson>
  return (
    typeof asset.id === 'string' &&
    (asset.kind === 'icon' || asset.kind === 'map') &&
    typeof asset.name === 'string' &&
    typeof asset.mimeType === 'string' &&
    typeof asset.dataBase64 === 'string'
  )
}

export function parseWorldPack(data: unknown): WorldPack {
  if (typeof data !== 'object' || data === null) {
    throw new Error(invalidBackupJsonMessage('world'))
  }
  const raw = data as Record<string, unknown>
  const format = raw.format
  if (
    isCharacterFileFormat(format) ||
    isCharactersFileFormat(format)
  ) {
    throw new Error(
      'Este arquivo é de personagem. Importe-o na página Personagens.',
    )
  }
  if (isHomebrewFileFormat(format)) {
    throw new Error(
      'Este arquivo é de conteúdo homebrew. Importe-o na página Homebrew.',
    )
  }
  if (isCombatFileFormat(format) || isCombatsFileFormat(format)) {
    throw new Error(
      'Este arquivo é de combate. Importe-o na página Combate.',
    )
  }
  if (format !== WORLD_FORMAT) {
    throw new Error(invalidBackupJsonMessage('world'))
  }
  return {
    notes: Array.isArray(raw.notes) ? raw.notes.filter(isNote) : [],
    folders: Array.isArray(raw.folders) ? raw.folders.filter(isFolder) : [],
    maps: Array.isArray(raw.maps) ? raw.maps.filter(isMap) : [],
    assets: Array.isArray(raw.assets) ? raw.assets.filter(isAssetJson) : [],
  }
}

function remapId(id: string, table: Map<string, string>, prefix: string): string {
  const existing = table.get(id)
  if (existing) return existing
  const next = createId(prefix)
  table.set(id, next)
  return next
}

/** Cópia com IDs novos, mantendo os vínculos internos. */
export function remapWorldPack(pack: WorldPack, now: string): WorldPack {
  const notes = new Map<string, string>()
  const folders = new Map<string, string>()
  const maps = new Map<string, string>()
  const assets = new Map<string, string>()

  const nextFolders = pack.folders.map((folder) => ({
    ...folder,
    id: remapId(folder.id, folders, 'folder'),
    parentId: folder.parentId
      ? remapId(folder.parentId, folders, 'folder')
      : null,
    createdAt: folder.createdAt,
    updatedAt: now,
  }))

  const nextNotes = pack.notes.map((note) => ({
    ...note,
    id: remapId(note.id, notes, 'note'),
    folderId: note.folderId ? remapId(note.folderId, folders, 'folder') : null,
    attachments: note.attachments.map((attachment) => ({
      ...attachment,
      id: createId('att'),
    })),
    createdAt: note.createdAt,
    updatedAt: now,
  }))

  const nextAssets = pack.assets.map((asset) => ({
    ...asset,
    id: remapId(asset.id, assets, asset.kind === 'icon' ? 'icon' : 'wimg'),
  }))

  const nextMaps = pack.maps.map((map) => {
    const vtx = new Map<string, string>()
    const vertices = map.vertices.map((vertex) => ({
      ...vertex,
      id: remapId(vertex.id, vtx, 'vtx'),
    }))
    return {
      ...map,
      id: remapId(map.id, maps, 'wmap'),
      imageAssetId: map.imageAssetId
        ? remapId(map.imageAssetId, assets, 'wimg')
        : null,
      markers: map.markers.map((marker) => ({
        ...marker,
        id: createId('pin'),
        assetId: marker.assetId
          ? remapId(marker.assetId, assets, 'icon')
          : null,
        noteId: marker.noteId ? (notes.get(marker.noteId) ?? null) : null,
      })),
      vertices,
      countries: map.countries.map((country) => ({
        ...country,
        id: createId('land'),
        vertexIds: country.vertexIds.map((id) => remapId(id, vtx, 'vtx')),
        noteId: country.noteId ? (notes.get(country.noteId) ?? null) : null,
      })),
      legend: (map.legend ?? []).map((entry) => ({
        ...entry,
        id: createId('leg'),
        assetId: entry.assetId
          ? remapId(entry.assetId, assets, 'icon')
          : null,
      })),
      paths: (map.paths ?? []).map((path) => ({
        ...path,
        id: createId('path'),
        noteId: path.noteId ? (notes.get(path.noteId) ?? null) : null,
      })),
      createdAt: map.createdAt,
      updatedAt: now,
    }
  })

  return {
    notes: nextNotes,
    folders: nextFolders,
    maps: nextMaps,
    assets: nextAssets,
  }
}

export function worldPackIsEmpty(pack: WorldPack): boolean {
  return (
    pack.notes.length === 0 &&
    pack.folders.length === 0 &&
    pack.maps.length === 0 &&
    pack.assets.length === 0
  )
}

export function assetToRecord(
  asset: WorldAssetJson,
  blob: Blob,
  now: string,
): WorldAssetRecord {
  return {
    id: asset.id,
    kind: asset.kind,
    name: asset.name,
    blob,
    mimeType: asset.mimeType,
    createdAt: now,
    updatedAt: now,
  }
}
