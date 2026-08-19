import { create } from 'zustand'
import type { LootHaul } from '@/types'
import {
  createEmptyHaul,
  deleteHaul,
  duplicateHaul,
  getHaul,
  listHauls,
  saveHaul,
} from '@/features/loot/lootRepository'

interface LootStoreState {
  hauls: LootHaul[]
  current: LootHaul | null
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  loadOne: (id: string) => Promise<LootHaul | null>
  createNew: () => Promise<LootHaul>
  duplicate: (id: string) => Promise<LootHaul>
  updateCurrent: (patch: Partial<LootHaul>) => Promise<void>
  remove: (id: string) => Promise<void>
}

export const useLootStore = create<LootStoreState>((set, get) => ({
  hauls: [],
  current: null,
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const hauls = await listHauls()
      set({ hauls, loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar saques',
      })
    }
  },

  loadOne: async (id) => {
    set({ loading: true, error: null })
    try {
      const haul = (await getHaul(id)) ?? null
      set({ current: haul, loading: false })
      return haul
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar saque',
      })
      return null
    }
  },

  createNew: async () => {
    const haul = createEmptyHaul()
    await saveHaul(haul)
    const hauls = await listHauls()
    set({ hauls, current: haul })
    return haul
  },

  duplicate: async (id) => {
    const copy = await duplicateHaul(id)
    const hauls = await listHauls()
    set({ hauls, current: copy })
    return copy
  },

  updateCurrent: async (patch) => {
    const current = get().current
    if (!current) return
    const next = { ...current, ...patch }
    await saveHaul(next)
    const hauls = await listHauls()
    set({ current: next, hauls })
  },

  remove: async (id) => {
    await deleteHaul(id)
    const hauls = await listHauls()
    const current = get().current
    set({
      hauls,
      current: current?.id === id ? null : current,
    })
  },
}))
