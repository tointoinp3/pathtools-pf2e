import { create } from 'zustand'
import { listRituals } from '@/engine/ritualCatalog'
import { setHomebrewRituals } from '@/engine/ritualRegistry'
import type { Ritual } from '@/types'
import {
  deleteRitual,
  duplicateRitualAsHomebrew,
  listHomebrewRituals,
  saveRitual,
} from '@/features/rituals/ritualRepository'

interface RitualStoreState {
  rituals: Ritual[]
  homebrew: Ritual[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getHomebrewById: (id: string) => Ritual | undefined
  upsertRitual: (ritual: Ritual) => Promise<Ritual>
  removeRitual: (id: string) => Promise<void>
  duplicateRitual: (id: string) => Promise<Ritual>
}

function applyLists(
  homebrew: Ritual[],
): Pick<RitualStoreState, 'rituals' | 'homebrew'> {
  setHomebrewRituals(homebrew)
  return {
    homebrew,
    rituals: listRituals(),
  }
}

export const useRitualStore = create<RitualStoreState>((set, get) => ({
  rituals: listRituals(),
  homebrew: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const homebrew = await listHomebrewRituals()
      set({ ...applyLists(homebrew), loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar rituais',
      })
    }
  },

  getHomebrewById: (id) => get().homebrew.find((ritual) => ritual.id === id),

  upsertRitual: async (ritual) => {
    const saved = await saveRitual(ritual)
    const homebrew = await listHomebrewRituals()
    set(applyLists(homebrew))
    return saved
  },

  removeRitual: async (id) => {
    await deleteRitual(id)
    const homebrew = await listHomebrewRituals()
    set(applyLists(homebrew))
  },

  duplicateRitual: async (id) => {
    const copy = await duplicateRitualAsHomebrew(id)
    const homebrew = await listHomebrewRituals()
    set(applyLists(homebrew))
    return copy
  },
}))
