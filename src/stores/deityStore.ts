import { create } from 'zustand'
import { listDeities } from '@/engine/deityCatalog'
import { setHomebrewDeities } from '@/engine/deityRegistry'
import type { Deity } from '@/types'
import {
  deleteDeity,
  duplicateDeityAsHomebrew,
  listHomebrewDeities,
  saveDeity,
} from '@/features/deities/deityRepository'

interface DeityStoreState {
  deities: Deity[]
  homebrew: Deity[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getHomebrewById: (id: string) => Deity | undefined
  upsertDeity: (deity: Deity) => Promise<Deity>
  removeDeity: (id: string) => Promise<void>
  duplicateDeity: (id: string) => Promise<Deity>
}

function applyLists(
  homebrew: Deity[],
): Pick<DeityStoreState, 'deities' | 'homebrew'> {
  setHomebrewDeities(homebrew)
  return {
    homebrew,
    deities: listDeities(),
  }
}

export const useDeityStore = create<DeityStoreState>((set, get) => ({
  deities: listDeities(),
  homebrew: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const homebrew = await listHomebrewDeities()
      set({ ...applyLists(homebrew), loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar divindades',
      })
    }
  },

  getHomebrewById: (id) => get().homebrew.find((deity) => deity.id === id),

  upsertDeity: async (deity) => {
    const saved = await saveDeity(deity)
    const homebrew = await listHomebrewDeities()
    set(applyLists(homebrew))
    return saved
  },

  removeDeity: async (id) => {
    await deleteDeity(id)
    const homebrew = await listHomebrewDeities()
    set(applyLists(homebrew))
  },

  duplicateDeity: async (id) => {
    const copy = await duplicateDeityAsHomebrew(id)
    const homebrew = await listHomebrewDeities()
    set(applyLists(homebrew))
    return copy
  },
}))
