import { db } from '@/db'
import type {
  WorldAssetKind,
  WorldAssetRecord,
  WorldFolder,
  WorldMap,
  WorldNote,
} from '@/types'
import { createId, nowIso } from '@/utils/id'
import { descendantFolderIds, uniqueFolderName, uniqueTitle } from './noteTree'

export const DEFAULT_MAP_WIDTH = 1600
export const DEFAULT_MAP_HEIGHT = 1000
/** Fração do lado menor do mapa. 0.007 ≈ alfinete discreto. */
export const DEFAULT_MARKER_SIZE = 0.007
export const MARKER_SIZE_MIN = 0.001
export const MARKER_SIZE_MAX = 0.06
export const MAP_SCALE_MIN = 0.02
export const MAP_SCALE_MAX = 12
export const DEFAULT_COUNTRY_FILL = 0.38
export const DEFAULT_PATH_WIDTH = 0.002
export const PATH_WIDTH_MIN = 0.00025
export const PATH_WIDTH_MAX = 0.018

export function mapShortSide(map: {
  imageWidth: number
  imageHeight: number
}): number {
  return Math.max(1, Math.min(map.imageWidth, map.imageHeight))
}

/** Tamanho de desenho do ícone em pixels da imagem. */
export function markerPixelSize(
  map: { imageWidth: number; imageHeight: number; iconScale?: number },
  size: number,
): number {
  const scale = Math.max(0.08, map.iconScale ?? 1)
  return Math.max(1, size * scale * mapShortSide(map))
}

const MARKER_SIZE_KEY = 'sp-world-marker-size'

export function readLastMarkerSize(): number {
  try {
    const n = Number(localStorage.getItem(MARKER_SIZE_KEY))
    if (Number.isFinite(n) && n >= MARKER_SIZE_MIN && n <= MARKER_SIZE_MAX) {
      return n
    }
  } catch {
    /* ignore */
  }
  return DEFAULT_MARKER_SIZE
}

export function writeLastMarkerSize(size: number) {
  try {
    localStorage.setItem(MARKER_SIZE_KEY, String(size))
  } catch {
    /* ignore */
  }
}

export function createEmptyNote(
  notes: readonly WorldNote[],
  partial?: Partial<WorldNote>,
): WorldNote {
  const now = nowIso()
  const base: WorldNote = {
    id: createId('note'),
    title: 'Nova nota',
    folderId: null,
    content: '',
    pinned: false,
    attachments: [],
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
  return {
    ...base,
    title: uniqueTitle(notes, base.title, base.id),
  }
}

export function createEmptyFolder(
  folders: readonly WorldFolder[],
  partial?: Partial<WorldFolder>,
): WorldFolder {
  const now = nowIso()
  const parentId = partial?.parentId ?? null
  const base: WorldFolder = {
    id: createId('folder'),
    name: 'Nova pasta',
    parentId,
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
  return {
    ...base,
    name: uniqueFolderName(folders, base.parentId, base.name, base.id),
  }
}

export function createEmptyMap(partial?: Partial<WorldMap>): WorldMap {
  const now = nowIso()
  return {
    id: createId('wmap'),
    name: 'Novo mapa',
    imageAssetId: null,
    imageWidth: DEFAULT_MAP_WIDTH,
    imageHeight: DEFAULT_MAP_HEIGHT,
    markers: [],
    vertices: [],
    countries: [],
    paths: [],
    legend: [],
    camera: null,
    showMarkers: true,
    showCountries: true,
    showLabels: true,
    showPaths: true,
    iconScale: 1,
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}

export async function listNotes(): Promise<WorldNote[]> {
  return db.worldNotes.orderBy('updatedAt').reverse().toArray()
}

export async function getNote(id: string): Promise<WorldNote | undefined> {
  return db.worldNotes.get(id)
}

export async function saveNote(note: WorldNote): Promise<void> {
  await db.worldNotes.put({ ...note, updatedAt: nowIso() })
}

export async function deleteNote(id: string): Promise<void> {
  await db.worldNotes.delete(id)
  const maps = await db.worldMaps.toArray()
  for (const map of maps) {
    let changed = false
    const markers = map.markers.map((marker) => {
      if (marker.noteId !== id) return marker
      changed = true
      return { ...marker, noteId: null }
    })
    const countries = map.countries.map((country) => {
      if (country.noteId !== id) return country
      changed = true
      return { ...country, noteId: null }
    })
    if (changed) {
      await db.worldMaps.put({ ...map, markers, countries, updatedAt: nowIso() })
    }
  }
}

export async function listFolders(): Promise<WorldFolder[]> {
  return db.worldFolders.toArray()
}

export async function saveFolder(folder: WorldFolder): Promise<void> {
  await db.worldFolders.put({ ...folder, updatedAt: nowIso() })
}

export async function deleteFolder(id: string): Promise<void> {
  const folders = await listFolders()
  const notes = await listNotes()
  const doomed = new Set(descendantFolderIds(folders, id))
  const parent = folders.find((folder) => folder.id === id)?.parentId ?? null
  await db.transaction('rw', [db.worldFolders, db.worldNotes], async () => {
    for (const folder of folders) {
      if (doomed.has(folder.id)) continue
      if (folder.parentId && doomed.has(folder.parentId)) {
        await db.worldFolders.put({
          ...folder,
          parentId: parent,
          updatedAt: nowIso(),
        })
      }
    }
    for (const note of notes) {
      if (note.folderId && doomed.has(note.folderId)) {
        await db.worldNotes.put({
          ...note,
          folderId: parent,
          updatedAt: nowIso(),
        })
      }
    }
    await db.worldFolders.bulkDelete([...doomed])
  })
}

export async function listMaps(): Promise<WorldMap[]> {
  return db.worldMaps.orderBy('updatedAt').reverse().toArray()
}

export async function getMap(id: string): Promise<WorldMap | undefined> {
  return db.worldMaps.get(id)
}

export async function saveMap(map: WorldMap): Promise<void> {
  await db.worldMaps.put({ ...map, updatedAt: nowIso() })
}

export async function deleteMap(id: string): Promise<void> {
  const map = await getMap(id)
  await db.worldMaps.delete(id)
  if (map?.imageAssetId) {
    const stillUsed = await db.worldMaps
      .filter((other) => other.imageAssetId === map.imageAssetId)
      .count()
    if (stillUsed === 0) {
      const asset = await db.worldAssets.get(map.imageAssetId)
      if (asset?.kind === 'map') await db.worldAssets.delete(map.imageAssetId)
    }
  }
}

export async function duplicateMap(id: string): Promise<WorldMap> {
  const source = await getMap(id)
  if (!source) throw new Error('Mapa não encontrado.')
  const copy = createEmptyMap({
    ...source,
    id: createId('wmap'),
    name: `${source.name} (cópia)`,
    createdAt: nowIso(),
  })
  await saveMap(copy)
  return copy
}

export async function listAssets(
  kind?: WorldAssetKind,
): Promise<WorldAssetRecord[]> {
  if (kind) {
    return db.worldAssets.where('kind').equals(kind).reverse().sortBy('updatedAt')
  }
  return db.worldAssets.orderBy('updatedAt').reverse().toArray()
}

export async function getAsset(
  id: string,
): Promise<WorldAssetRecord | undefined> {
  return db.worldAssets.get(id)
}

export async function saveAsset(
  asset: Omit<WorldAssetRecord, 'updatedAt'> & { updatedAt?: string },
): Promise<WorldAssetRecord> {
  const record: WorldAssetRecord = {
    ...asset,
    updatedAt: nowIso(),
  }
  await db.worldAssets.put(record)
  return record
}

export async function createAssetFromBlob(
  kind: WorldAssetKind,
  name: string,
  blob: Blob,
): Promise<WorldAssetRecord> {
  return saveAsset({
    id: createId(kind === 'icon' ? 'icon' : 'wimg'),
    kind,
    name: name.trim() || (kind === 'icon' ? 'Ícone' : 'Mapa'),
    blob,
    mimeType: blob.type || 'image/png',
    createdAt: nowIso(),
  })
}

export async function deleteAsset(id: string): Promise<void> {
  await db.worldAssets.delete(id)
  const maps = await db.worldMaps.toArray()
  for (const map of maps) {
    let changed = false
    let imageAssetId = map.imageAssetId
    if (imageAssetId === id) {
      imageAssetId = null
      changed = true
    }
    const markers = map.markers.map((marker) => {
      if (marker.assetId !== id) return marker
      changed = true
      return { ...marker, assetId: null, shape: marker.shape ?? 'circle' }
    })
    const legend = map.legend.filter((entry) => entry.assetId !== id)
    if (legend.length !== map.legend.length) changed = true
    if (changed) {
      await db.worldMaps.put({
        ...map,
        imageAssetId,
        markers,
        legend,
        updatedAt: nowIso(),
      })
    }
  }
}

export async function readImageSize(
  blob: Blob,
): Promise<{ width: number; height: number }> {
  const url = URL.createObjectURL(blob)
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = () => reject(new Error('Não foi possível ler a imagem.'))
      el.src = url
    })
    return {
      width: Math.max(1, image.naturalWidth),
      height: Math.max(1, image.naturalHeight),
    }
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function newAttachmentId(): string {
  return createId('att')
}
