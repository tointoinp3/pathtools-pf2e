import { create } from 'zustand'
import type { CombatSession, CombatToken } from '@/types'
import {
  clampRectToGrid,
  cloneToken,
  findFreeSpot,
  nextTokenName,
  rectsOverlap,
} from '@/engine/combat'
import {
  createEmptyCombatSession,
  deleteCombatSession,
  duplicateCombatSession,
  getCombatSession,
  listCombatSessions,
  saveCombatSession,
} from '@/features/combat/combatRepository'
import { copyTokenImage } from '@/features/combat/combatImageRepository'

const HISTORY_LIMIT = 100
const SAVE_DEBOUNCE_MS = 400

let saveTimer: ReturnType<typeof setTimeout> | null = null

/** Cópia deslocada 1 célula para baixo/direita; cai no primeiro vão livre. */
function placeClone(
  session: CombatSession,
  placed: CombatToken[],
  source: CombatToken,
): { x: number; y: number } {
  const offset = clampRectToGrid(
    { x: source.x + 1, y: source.y + 1, w: source.w, h: source.h },
    session.gridCols,
    session.gridRows,
  )
  const collides = placed.some((token) => rectsOverlap(offset, token))
  if (!collides) return { x: offset.x, y: offset.y }
  return findFreeSpot(
    placed,
    session.gridCols,
    session.gridRows,
    source.w,
    source.h,
  )
}

function cloneIntoSession(
  session: CombatSession,
  sources: CombatToken[],
): CombatToken[] {
  const placed = [...session.tokens]
  const clones: CombatToken[] = []
  for (const source of sources) {
    const spot = placeClone(session, placed, source)
    const name = nextTokenName(
      source.name,
      placed.map((token) => token.name),
    )
    const copy = cloneToken(source, spot, name)
    placed.push(copy)
    clones.push(copy)
  }
  return clones
}

interface CombatStoreState {
  sessions: CombatSession[]
  current: CombatSession | null
  past: CombatSession[]
  future: CombatSession[]
  strokeBase: CombatSession | null
  selectedTokenId: string | null
  clipboard: CombatToken[]
  /** Muda quando alguma imagem é salva/removida — re-renderiza os tokens. */
  imageVersion: number
  loading: boolean
  error: string | null

  loadAll: () => Promise<void>
  loadOne: (id: string) => Promise<CombatSession | null>
  createNew: () => Promise<CombatSession>
  duplicate: (id: string) => Promise<CombatSession>
  remove: (id: string) => Promise<void>
  flushSave: () => Promise<void>

  selectToken: (id: string | null) => void
  /** Edição registrada no histórico (Ctrl+Z desfaz). */
  mutate: (mutator: (session: CombatSession) => CombatSession) => void
  /** Salva sem entrar no histórico (zoom, ajustes cosméticos). */
  mutateQuiet: (mutator: (session: CombatSession) => CombatSession) => void
  /** Prévia sem histórico nem save — arrasto/digitação em andamento. */
  preview: (mutator: (session: CombatSession) => CombatSession) => void
  beginStroke: () => void
  endStroke: () => void
  undo: () => void
  redo: () => void

  updateToken: (id: string, patch: Partial<CombatToken>) => void
  addTokens: (tokens: CombatToken[]) => void
  removeToken: (id: string) => void
  copySelected: () => void
  paste: () => void
  duplicateToken: (id: string) => void
  bumpImageVersion: () => void
}

export const useCombatStore = create<CombatStoreState>((set, get) => {
  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      saveTimer = null
      const current = get().current
      if (!current) return
      void saveCombatSession(current)
    }, SAVE_DEBOUNCE_MS)
  }

  function pushHistory(snapshot: CombatSession) {
    set((state) => ({
      past: [...state.past.slice(-(HISTORY_LIMIT - 1)), snapshot],
      future: [],
    }))
  }

  return {
    sessions: [],
    current: null,
    past: [],
    future: [],
    strokeBase: null,
    selectedTokenId: null,
    clipboard: [],
    imageVersion: 0,
    loading: false,
    error: null,

    loadAll: async () => {
      set({ loading: true, error: null })
      try {
        const sessions = await listCombatSessions()
        set({ sessions, loading: false })
      } catch (e) {
        set({
          loading: false,
          error: e instanceof Error ? e.message : 'Erro ao carregar combates',
        })
      }
    },

    loadOne: async (id) => {
      set({ loading: true, error: null })
      try {
        const session = (await getCombatSession(id)) ?? null
        set({
          current: session,
          past: [],
          future: [],
          strokeBase: null,
          selectedTokenId: null,
          loading: false,
        })
        return session
      } catch (e) {
        set({
          loading: false,
          error: e instanceof Error ? e.message : 'Erro ao carregar combate',
        })
        return null
      }
    },

    createNew: async () => {
      const session = createEmptyCombatSession()
      await saveCombatSession(session)
      const sessions = await listCombatSessions()
      set({ sessions, current: session, past: [], future: [], selectedTokenId: null })
      return session
    },

    duplicate: async (id) => {
      const copy = await duplicateCombatSession(id)
      const sessions = await listCombatSessions()
      set({ sessions })
      return copy
    },

    remove: async (id) => {
      await deleteCombatSession(id)
      const sessions = await listCombatSessions()
      const current = get().current
      set({
        sessions,
        current: current?.id === id ? null : current,
      })
    },

    flushSave: async () => {
      if (saveTimer) {
        clearTimeout(saveTimer)
        saveTimer = null
      }
      const current = get().current
      if (current) await saveCombatSession(current)
    },

    selectToken: (id) => set({ selectedTokenId: id }),

    mutate: (mutator) => {
      const current = get().current
      if (!current) return
      const next = mutator(current)
      if (next === current) return
      pushHistory(current)
      set({ current: next })
      scheduleSave()
    },

    mutateQuiet: (mutator) => {
      const current = get().current
      if (!current) return
      const next = mutator(current)
      if (next === current) return
      set({ current: next })
      scheduleSave()
    },

    preview: (mutator) => {
      const current = get().current
      if (!current) return
      const next = mutator(current)
      if (next === current) return
      set({ current: next })
    },

    beginStroke: () => {
      const current = get().current
      if (current) set({ strokeBase: current })
    },

    endStroke: () => {
      const { strokeBase, current } = get()
      set({ strokeBase: null })
      if (!strokeBase || !current || strokeBase === current) return
      pushHistory(strokeBase)
      scheduleSave()
    },

    undo: () => {
      const { past, current, selectedTokenId } = get()
      const previous = past[past.length - 1]
      if (!previous || !current) return
      set((state) => ({
        current: previous,
        past: state.past.slice(0, -1),
        future: [current, ...state.future].slice(0, HISTORY_LIMIT),
        strokeBase: null,
        selectedTokenId: previous.tokens.some((t) => t.id === selectedTokenId)
          ? selectedTokenId
          : null,
      }))
      scheduleSave()
    },

    redo: () => {
      const { future, current, selectedTokenId } = get()
      const next = future[0]
      if (!next || !current) return
      set((state) => ({
        current: next,
        past: [...state.past.slice(-(HISTORY_LIMIT - 1)), current],
        future: state.future.slice(1),
        strokeBase: null,
        selectedTokenId: next.tokens.some((t) => t.id === selectedTokenId)
          ? selectedTokenId
          : null,
      }))
      scheduleSave()
    },

    updateToken: (id, patch) => {
      get().mutate((session) => ({
        ...session,
        tokens: session.tokens.map((token) => {
          if (token.id !== id) return token
          const merged = { ...token, ...patch }
          const rect = clampRectToGrid(
            merged,
            session.gridCols,
            session.gridRows,
          )
          return { ...merged, ...rect }
        }),
      }))
    },

    addTokens: (tokens) => {
      if (tokens.length === 0) return
      get().mutate((session) => ({
        ...session,
        tokens: [...session.tokens, ...tokens],
      }))
      const last = tokens[tokens.length - 1]
      if (last) set({ selectedTokenId: last.id })
    },

    removeToken: (id) => {
      get().mutate((session) => ({
        ...session,
        turnTokenId: session.turnTokenId === id ? null : session.turnTokenId,
        tokens: session.tokens.filter((token) => token.id !== id),
      }))
      if (get().selectedTokenId === id) set({ selectedTokenId: null })
    },

    copySelected: () => {
      const { current, selectedTokenId } = get()
      const token = current?.tokens.find((t) => t.id === selectedTokenId)
      if (!token) return
      set({ clipboard: [{ ...token, conditions: [...token.conditions] }] })
    },

    paste: () => {
      const { current, clipboard } = get()
      if (!current || clipboard.length === 0) return
      const clones = cloneIntoSession(current, clipboard)
      get().addTokens(clones)
      clipboard.forEach((source, index) => {
        const clone = clones[index]
        if (!clone) return
        void copyTokenImage(source.id, clone.id).then((copied) => {
          if (copied) get().bumpImageVersion()
        })
      })
    },

    duplicateToken: (id) => {
      const { current } = get()
      const source = current?.tokens.find((t) => t.id === id)
      if (!current || !source) return
      const clones = cloneIntoSession(current, [source])
      get().addTokens(clones)
      const clone = clones[0]
      if (!clone) return
      void copyTokenImage(source.id, clone.id).then((copied) => {
        if (copied) get().bumpImageVersion()
      })
    },

    bumpImageVersion: () =>
      set((state) => ({ imageVersion: state.imageVersion + 1 })),
  }
})
