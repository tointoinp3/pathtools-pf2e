import { create } from 'zustand'
import type {
  MapLegendEntry,
  MapMarker,
  MapPath,
  MapPathStyle,
  MarkerShape,
  WorldAssetRecord,
  WorldCountry,
  WorldMap,
} from '@/types'
import {
  createAssetFromBlob,
  createEmptyMap,
  deleteAsset,
  deleteMap,
  duplicateMap,
  getMap,
  listAssets,
  listMaps,
  readImageSize,
  saveMap,
  DEFAULT_COUNTRY_FILL,
  DEFAULT_PATH_WIDTH,
  readLastMarkerSize,
  writeLastMarkerSize,
} from '@/features/world/worldRepository'
import {
  distance,
  moveVertex,
  pruneNearDuplicates,
  pruneUnusedVertices,
  removeVertexEverywhere,
  resolveBorderSnap,
  snapToGeometry,
  splitEdgeInCountries,
} from '@/engine/worldMap'
import { createId } from '@/utils/id'

const HISTORY_LIMIT = 80
const SAVE_DEBOUNCE_MS = 400
/** Raio do ímã em pixels da tela — grande o bastante para “puxar” o clique. */
const SNAP_SCREEN_PX = 26
const CLOSE_SNAP_FACTOR = 1.7

let saveTimer: ReturnType<typeof setTimeout> | null = null

export type MapTool = 'pan' | 'marker' | 'border' | 'select' | 'path'

export interface DraftVertex {
  id: string
  x: number
  y: number
  reuseId: string | null
  splitEdge: { a: string; b: string } | null
}

export function snapThreshold(map: WorldMap, scale: number): number {
  const width = Math.max(1, map.imageWidth)
  return SNAP_SCREEN_PX / (width * Math.max(0.15, scale))
}

export function closeSnapThreshold(map: WorldMap, scale: number): number {
  return snapThreshold(map, scale) * CLOSE_SNAP_FACTOR
}

export function borderSnapAt(
  map: WorldMap,
  draft: readonly DraftVertex[],
  point: { x: number; y: number },
  scale: number,
) {
  return resolveBorderSnap(
    point,
    map.vertices,
    map.countries,
    draft,
    snapThreshold(map, scale),
    closeSnapThreshold(map, scale),
  )
}

interface WorldMapStoreState {
  maps: WorldMap[]
  current: WorldMap | null
  past: WorldMap[]
  future: WorldMap[]
  icons: WorldAssetRecord[]
  assetVersion: number
  selectedMarkerId: string | null
  selectedCountryId: string | null
  selectedVertexId: string | null
  selectedPathId: string | null
  tool: MapTool
  markerShape: MarkerShape
  markerAssetId: string | null
  markerColor: string
  markerSize: number
  pathStyle: MapPathStyle
  pathColor: string
  draftVertices: DraftVertex[]
  loading: boolean
  error: string | null

  viewCommand: { seq: number; type: 'fit' | 'focus'; x?: number; y?: number } | null

  loadAll: () => Promise<void>
  loadOne: (id: string) => Promise<WorldMap | null>
  createNew: () => Promise<WorldMap>
  duplicate: (id: string) => Promise<WorldMap>
  remove: (id: string) => Promise<void>
  flushSave: () => Promise<void>
  loadIcons: () => Promise<void>

  mutate: (mutator: (map: WorldMap) => WorldMap) => void
  mutateQuiet: (mutator: (map: WorldMap) => WorldMap) => void
  beginStroke: () => void
  undo: () => void
  redo: () => void
  setTool: (tool: MapTool) => void
  selectMarker: (id: string | null) => void
  selectCountry: (id: string | null) => void
  selectVertex: (id: string | null) => void
  selectPath: (id: string | null) => void
  setMarkerShape: (shape: MarkerShape) => void
  setMarkerAsset: (assetId: string | null) => void
  setMarkerColor: (color: string) => void
  setMarkerSize: (size: number) => void
  setPathStyle: (style: MapPathStyle) => void
  setPathColor: (color: string) => void

  rename: (name: string) => void
  setCamera: (x: number, y: number, scale: number) => void
  requestFit: () => void
  requestFocus: (x: number, y: number) => void
  toggleLayer: (layer: 'showMarkers' | 'showCountries' | 'showLabels' | 'showPaths') => void

  addMarkerAt: (x: number, y: number) => void
  updateMarker: (id: string, patch: Partial<MapMarker>) => void
  removeMarker: (id: string) => void
  moveMarker: (id: string, x: number, y: number) => void

  clickBorder: (
    x: number,
    y: number,
    scale: number,
    shiftKey?: boolean,
  ) => 'added' | 'close' | 'ignored'
  finishCountry: (name: string, color: string) => void
  cancelDraft: () => void
  undoDraftVertex: () => void
  clickPath: (
    x: number,
    y: number,
    scale: number,
    shiftKey?: boolean,
  ) => 'added' | 'ignored'
  finishPath: () => void
  updatePath: (id: string, patch: Partial<MapPath>) => void
  removePath: (id: string) => void
  dragPathPoint: (pathId: string, index: number, x: number, y: number) => void
  updateCountry: (id: string, patch: Partial<WorldCountry>) => void
  removeCountry: (id: string) => void
  dragVertex: (id: string, x: number, y: number, scale: number) => void
  endVertexDrag: (id: string, scale: number) => void
  insertVertexOnEdge: (
    countryId: string,
    afterIndex: number,
    x: number,
    y: number,
  ) => void
  deleteSelectedVertex: () => void

  upsertLegend: (entry: MapLegendEntry) => void
  removeLegend: (id: string) => void

  importBackground: (file: File) => Promise<void>
  clearBackground: () => Promise<void>
  importIcon: (file: File) => Promise<WorldAssetRecord>
  removeIcon: (id: string) => Promise<void>
  bumpAssetVersion: () => void
}

export const useWorldMapStore = create<WorldMapStoreState>((set, get) => {
  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      saveTimer = null
      const current = get().current
      if (!current) return
      void saveMap(current)
    }, SAVE_DEBOUNCE_MS)
  }

  function pushHistory(snapshot: WorldMap) {
    set((state) => ({
      past: [...state.past.slice(-(HISTORY_LIMIT - 1)), snapshot],
      future: [],
    }))
  }

  function apply(
    mutator: (map: WorldMap) => WorldMap,
    options: { history: boolean },
  ) {
    const current = get().current
    if (!current) return
    if (options.history) pushHistory(current)
    const next = mutator(current)
    set((state) => ({
      current: next,
      maps: state.maps.map((map) => (map.id === next.id ? next : map)),
    }))
    scheduleSave()
  }

  return {
    maps: [],
    current: null,
    past: [],
    future: [],
    icons: [],
    assetVersion: 0,
    selectedMarkerId: null,
    selectedCountryId: null,
    selectedVertexId: null,
    selectedPathId: null,
    tool: 'select',
    markerShape: 'circle',
    markerAssetId: null,
    markerColor: '#d4a84b',
    markerSize: readLastMarkerSize(),
    pathStyle: 'dashed',
    pathColor: '#d4a84b',
    draftVertices: [],
    loading: false,
    error: null,
    viewCommand: null,

    loadAll: async () => {
      set({ loading: true, error: null })
      try {
        const [maps, icons] = await Promise.all([
          listMaps(),
          listAssets('icon'),
        ])
        set({ maps, icons, loading: false })
      } catch (e) {
        set({
          loading: false,
          error: e instanceof Error ? e.message : 'Erro ao carregar mapas',
        })
      }
    },

    loadOne: async (id) => {
      set({ loading: true, error: null })
      try {
        const map = (await getMap(id)) ?? null
        const normalized = map
          ? {
              ...map,
              paths: map.paths ?? [],
              showPaths: map.showPaths ?? true,
              iconScale: map.iconScale ?? 1,
            }
          : null
        set({
          current: normalized,
          past: [],
          future: [],
          draftVertices: [],
          selectedMarkerId: null,
          selectedCountryId: null,
          selectedVertexId: null,
          selectedPathId: null,
          loading: false,
        })
        return normalized
      } catch (e) {
        set({
          loading: false,
          error: e instanceof Error ? e.message : 'Erro ao carregar mapa',
        })
        return null
      }
    },

    createNew: async () => {
      const map = createEmptyMap()
      await saveMap(map)
      const maps = await listMaps()
      set({
        maps,
        current: map,
        past: [],
        future: [],
        draftVertices: [],
      })
      return map
    },

    duplicate: async (id) => {
      const copy = await duplicateMap(id)
      const maps = await listMaps()
      set({ maps, current: copy, past: [], future: [] })
      return copy
    },

    remove: async (id) => {
      await deleteMap(id)
      const maps = await listMaps()
      const current = get().current
      set({
        maps,
        current: current?.id === id ? null : current,
      })
    },

    flushSave: async () => {
      if (saveTimer) {
        clearTimeout(saveTimer)
        saveTimer = null
      }
      const current = get().current
      if (current) await saveMap(current)
    },

    loadIcons: async () => {
      set({ icons: await listAssets('icon') })
    },

    mutate: (mutator) => apply(mutator, { history: true }),
    mutateQuiet: (mutator) => apply(mutator, { history: false }),
    beginStroke: () => {
      const current = get().current
      if (current) pushHistory(current)
    },

    undo: () => {
      const { past, current, future } = get()
      const previous = past[past.length - 1]
      if (!previous || !current) return
      if (saveTimer) {
        clearTimeout(saveTimer)
        saveTimer = null
      }
      set({
        current: previous,
        past: past.slice(0, -1),
        future: [current, ...future],
        draftVertices: [],
        maps: get().maps.map((map) =>
          map.id === previous.id ? previous : map,
        ),
      })
      void saveMap(previous)
    },

    redo: () => {
      const { future, current, past } = get()
      const next = future[0]
      if (!next || !current) return
      set({
        current: next,
        past: [...past, current],
        future: future.slice(1),
        maps: get().maps.map((map) => (map.id === next.id ? next : map)),
      })
      void saveMap(next)
    },

    setTool: (tool) =>
      set({
        tool,
        draftVertices:
          tool === 'border' || tool === 'path' ? get().draftVertices : [],
        selectedVertexId: tool === 'select' ? get().selectedVertexId : null,
      }),
    selectMarker: (id) =>
      set({
        selectedMarkerId: id,
        selectedCountryId: null,
        selectedVertexId: null,
        selectedPathId: null,
      }),
    selectCountry: (id) =>
      set({
        selectedCountryId: id,
        selectedMarkerId: null,
        selectedVertexId: null,
        selectedPathId: null,
      }),
    selectVertex: (id) => set({ selectedVertexId: id }),
    selectPath: (id) =>
      set({
        selectedPathId: id,
        selectedMarkerId: null,
        selectedCountryId: null,
        selectedVertexId: null,
      }),
    setMarkerShape: (shape) => set({ markerShape: shape, markerAssetId: null }),
    setMarkerAsset: (assetId) => set({ markerAssetId: assetId }),
    setMarkerColor: (color) => set({ markerColor: color }),
    setMarkerSize: (size) => {
      writeLastMarkerSize(size)
      set({ markerSize: size })
    },
    setPathStyle: (style) => set({ pathStyle: style }),
    setPathColor: (color) => set({ pathColor: color }),

    rename: (name) => apply((map) => ({ ...map, name }), { history: false }),

    setCamera: (x, y, scale) =>
      apply(
        (map) => ({
          ...map,
          camera: { x, y, scale },
        }),
        { history: false },
      ),

    requestFit: () =>
      set({
        viewCommand: { seq: Date.now(), type: 'fit' },
      }),
    requestFocus: (x, y) =>
      set({
        viewCommand: { seq: Date.now(), type: 'focus', x, y },
      }),

    toggleLayer: (layer) =>
      apply((map) => {
        const current =
          layer === 'showPaths' ? (map.showPaths ?? true) : Boolean(map[layer])
        return { ...map, [layer]: !current }
      }, { history: false }),

    addMarkerAt: (x, y) => {
      const { markerShape, markerAssetId, markerColor, markerSize } = get()
      apply(
        (map) => ({
          ...map,
          markers: [
            ...map.markers,
            {
              id: createId('pin'),
              x,
              y,
              shape: markerAssetId ? null : markerShape,
              assetId: markerAssetId,
              color: markerColor,
              size: markerSize,
              label: '',
              showLabel: false,
              noteId: null,
            },
          ],
        }),
        { history: true },
      )
      const markers = get().current?.markers
      const last = markers?.[markers.length - 1]
      if (last) set({ selectedMarkerId: last.id, selectedCountryId: null })
    },

    updateMarker: (id, patch) =>
      apply(
        (map) => ({
          ...map,
          markers: map.markers.map((marker) =>
            marker.id === id ? { ...marker, ...patch } : marker,
          ),
        }),
        { history: true },
      ),

    removeMarker: (id) => {
      apply(
        (map) => ({
          ...map,
          markers: map.markers.filter((marker) => marker.id !== id),
        }),
        { history: true },
      )
      if (get().selectedMarkerId === id) set({ selectedMarkerId: null })
    },

    moveMarker: (id, x, y) =>
      apply(
        (map) => ({
          ...map,
          markers: map.markers.map((marker) =>
            marker.id === id ? { ...marker, x, y } : marker,
          ),
        }),
        { history: true },
      ),

    clickBorder: (x, y, scale, shiftKey = false) => {
      const current = get().current
      if (!current) return 'ignored'
      const draft = get().draftVertices
      const hover = { x, y }
      const snap = shiftKey
        ? { x, y, vertexId: null, edge: null, close: false }
        : borderSnapAt(current, draft, hover, scale)
      if (snap.close) return 'close'
      const last = draft[draft.length - 1]
      if (last && distance(last, snap) <= snapThreshold(current, scale) * 0.35) {
        return 'ignored'
      }
      const committed = new Set(current.vertices.map((vertex) => vertex.id))
      const reuseId =
        snap.vertexId && committed.has(snap.vertexId) ? snap.vertexId : null
      const splitEdge =
        !reuseId &&
        snap.edge &&
        committed.has(snap.edge.a) &&
        committed.has(snap.edge.b)
          ? snap.edge
          : null
      const point: DraftVertex = {
        id: reuseId ?? createId('vtx'),
        x: snap.x,
        y: snap.y,
        reuseId,
        splitEdge,
      }
      if (last && last.id === point.id) return 'ignored'
      set({ draftVertices: [...draft, point] })
      return 'added'
    },

    finishCountry: (name, color) => {
      const { current, draftVertices } = get()
      if (!current || draftVertices.length < 3) return
      const mergeR = 14 / Math.max(1, current.imageWidth)
      const cleaned = pruneNearDuplicates(draftVertices, mergeR)
      if (cleaned.length < 3) return
      apply((map) => {
        let vertices = [...map.vertices]
        let countries = [...map.countries]
        const vertexIds: string[] = []
        const seen = new Set(vertices.map((vertex) => vertex.id))
        for (const draft of cleaned) {
          const id = draft.reuseId ?? draft.id
          if (!seen.has(id)) {
            vertices = [...vertices, { id, x: draft.x, y: draft.y }]
            seen.add(id)
            if (draft.splitEdge) {
              countries = splitEdgeInCountries(
                countries,
                draft.splitEdge.a,
                draft.splitEdge.b,
                id,
              )
            }
          }
          vertexIds.push(id)
        }
        countries = [
          ...countries,
          {
            id: createId('land'),
            name: name.trim() || 'Novo país',
            color,
            vertexIds,
            fillOpacity: DEFAULT_COUNTRY_FILL,
            showLabel: true,
            label: null,
            noteId: null,
          },
        ]
        return { ...map, vertices, countries }
      }, { history: true })
      set({
        draftVertices: [],
        selectedCountryId: get().current?.countries.at(-1)?.id ?? null,
        tool: 'select',
      })
    },

    cancelDraft: () => set({ draftVertices: [] }),

    undoDraftVertex: () => {
      const draft = get().draftVertices
      if (draft.length === 0) return
      set({ draftVertices: draft.slice(0, -1) })
    },

    clickPath: (x, y, scale, shiftKey = false) => {
      const current = get().current
      if (!current) return 'ignored'
      const draft = get().draftVertices
      const extras = [
        ...current.vertices,
        ...current.markers.map((marker) => ({
          id: `pin:${marker.id}`,
          x: marker.x,
          y: marker.y,
        })),
      ]
      const snap = shiftKey
        ? { x, y, vertexId: null, edge: null }
        : snapToGeometry(
            { x, y },
            extras,
            current.countries,
            snapThreshold(current, scale),
            { extraVertices: draft },
          )
      const last = draft[draft.length - 1]
      if (last && distance(last, snap) <= snapThreshold(current, scale) * 0.35) {
        return 'ignored'
      }
      set({
        draftVertices: [
          ...draft,
          {
            id: createId('vtx'),
            x: snap.x,
            y: snap.y,
            reuseId: null,
            splitEdge: null,
          },
        ],
      })
      return 'added'
    },

    finishPath: () => {
      const { current, draftVertices, pathStyle, pathColor } = get()
      if (!current || draftVertices.length < 2) return
      const n = (current.paths ?? []).length + 1
      const id = createId('path')
      apply(
        (map) => ({
          ...map,
          paths: [
            ...(map.paths ?? []),
            {
              id,
              name: `Caminho ${n}`,
              color: pathColor,
              width: DEFAULT_PATH_WIDTH,
              style: pathStyle,
              points: draftVertices.map((point) => ({ x: point.x, y: point.y })),
              noteId: null,
              showLabel: true,
            },
          ],
          showPaths: map.showPaths ?? true,
        }),
        { history: true },
      )
      set({ draftVertices: [], selectedPathId: id })
    },

    updatePath: (id, patch) =>
      apply(
        (map) => ({
          ...map,
          paths: (map.paths ?? []).map((path) =>
            path.id === id ? { ...path, ...patch } : path,
          ),
        }),
        { history: true },
      ),

    removePath: (id) => {
      apply(
        (map) => ({
          ...map,
          paths: (map.paths ?? []).filter((path) => path.id !== id),
        }),
        { history: true },
      )
      if (get().selectedPathId === id) set({ selectedPathId: null })
    },

    dragPathPoint: (pathId, index, x, y) =>
      apply(
        (map) => ({
          ...map,
          paths: (map.paths ?? []).map((path) =>
            path.id !== pathId
              ? path
              : {
                  ...path,
                  points: path.points.map((point, i) =>
                    i === index ? { x, y } : point,
                  ),
                },
          ),
        }),
        { history: false },
      ),

    updateCountry: (id, patch) =>
      apply(
        (map) => ({
          ...map,
          countries: map.countries.map((country) =>
            country.id === id ? { ...country, ...patch } : country,
          ),
        }),
        { history: true },
      ),

    removeCountry: (id) => {
      apply(
        (map) =>
          pruneUnusedVertices({
            ...map,
            countries: map.countries.filter((country) => country.id !== id),
          }),
        { history: true },
      )
      if (get().selectedCountryId === id) set({ selectedCountryId: null })
    },

    dragVertex: (id, x, y, scale) => {
      const current = get().current
      if (!current) return
      const threshold = snapThreshold(current, scale)
      const snap = snapToGeometry({ x, y }, current.vertices, current.countries, threshold, {
        ignoreVertexIds: new Set([id]),
      })
      apply((map) => moveVertex(map, id, snap.x, snap.y), { history: false })
    },

    endVertexDrag: (id, scale) => {
      const current = get().current
      if (!current) return
      const vertex = current.vertices.find((entry) => entry.id === id)
      if (!vertex) return
      const snap = snapToGeometry(
        vertex,
        current.vertices,
        current.countries,
        snapThreshold(current, scale),
        { ignoreVertexIds: new Set([id]) },
      )
      if (snap.vertexId && snap.vertexId !== id) {
        apply((map) => {
          const countries = map.countries.map((country) => ({
            ...country,
            vertexIds: country.vertexIds.map((vid) =>
              vid === id ? snap.vertexId! : vid,
            ),
          }))
          return pruneUnusedVertices({
            ...map,
            countries,
            vertices: map.vertices.filter((entry) => entry.id !== id),
          })
        }, { history: true })
        set({ selectedVertexId: snap.vertexId })
        return
      }
      apply((map) => moveVertex(map, id, snap.x, snap.y), { history: false })
    },

    insertVertexOnEdge: (countryId, afterIndex, x, y) => {
      apply((map) => {
        const country = map.countries.find((entry) => entry.id === countryId)
        if (!country) return map
        const a = country.vertexIds[afterIndex]
        const b = country.vertexIds[(afterIndex + 1) % country.vertexIds.length]
        if (!a || !b) return map
        const id = createId('vtx')
        return {
          ...map,
          vertices: [...map.vertices, { id, x, y }],
          countries: splitEdgeInCountries(map.countries, a, b, id),
        }
      }, { history: true })
    },

    deleteSelectedVertex: () => {
      const id = get().selectedVertexId
      if (!id) return
      apply((map) => removeVertexEverywhere(map, id), { history: true })
      set({ selectedVertexId: null })
    },

    upsertLegend: (entry) =>
      apply(
        (map) => {
          const exists = map.legend.some((item) => item.id === entry.id)
          return {
            ...map,
            legend: exists
              ? map.legend.map((item) => (item.id === entry.id ? entry : item))
              : [...map.legend, entry],
          }
        },
        { history: true },
      ),

    removeLegend: (id) =>
      apply(
        (map) => ({
          ...map,
          legend: map.legend.filter((entry) => entry.id !== id),
        }),
        { history: true },
      ),

    importBackground: async (file) => {
      const current = get().current
      if (!current) return
      const blob = file.slice(0, file.size, file.type || 'image/png')
      const size = await readImageSize(blob)
      const asset = await createAssetFromBlob(
        'map',
        file.name.replace(/\.[^.]+$/, '') || current.name,
        blob,
      )
      apply(
        (map) => ({
          ...map,
          imageAssetId: asset.id,
          imageWidth: size.width,
          imageHeight: size.height,
        }),
        { history: true },
      )
      set((state) => ({
        assetVersion: state.assetVersion + 1,
        viewCommand: { seq: Date.now(), type: 'fit' },
      }))
    },

    clearBackground: async () => {
      apply(
        (map) => ({ ...map, imageAssetId: null }),
        { history: true },
      )
      set((state) => ({ assetVersion: state.assetVersion + 1 }))
    },

    importIcon: async (file) => {
      const blob = file.slice(0, file.size, file.type || 'image/png')
      const asset = await createAssetFromBlob(
        'icon',
        file.name.replace(/\.[^.]+$/, '') || 'Ícone',
        blob,
      )
      const icons = await listAssets('icon')
      set((state) => ({
        icons,
        markerAssetId: asset.id,
        assetVersion: state.assetVersion + 1,
      }))
      return asset
    },

    removeIcon: async (id) => {
      await deleteAsset(id)
      const [icons, maps] = await Promise.all([listAssets('icon'), listMaps()])
      const currentId = get().current?.id
      const current = currentId
        ? (maps.find((map) => map.id === currentId) ?? get().current)
        : get().current
      set((state) => ({
        icons,
        maps,
        current,
        markerAssetId: state.markerAssetId === id ? null : state.markerAssetId,
        assetVersion: state.assetVersion + 1,
      }))
    },

    bumpAssetVersion: () =>
      set((state) => ({ assetVersion: state.assetVersion + 1 })),
  }
})
