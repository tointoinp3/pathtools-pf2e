import { create } from 'zustand'
import { listCreatures } from '@/engine/bestiaryCatalog'
import { setHomebrewCreatures } from '@/engine/creatureRegistry'
import type { Creature } from '@/types'
import {
  deleteCreature,
  duplicateCreatureAsHomebrew,
  listHomebrewCreatures,
  saveCreature,
} from '@/features/bestiary/creatureRepository'

interface CreatureStoreState {
  creatures: Creature[]
  homebrew: Creature[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getHomebrewById: (id: string) => Creature | undefined
  upsertCreature: (creature: Creature) => Promise<Creature>
  removeCreature: (id: string) => Promise<void>
  duplicateCreature: (id: string) => Promise<Creature>
}

function applyLists(
  homebrew: Creature[],
): Pick<CreatureStoreState, 'creatures' | 'homebrew'> {
  setHomebrewCreatures(homebrew)
  return {
    homebrew,
    creatures: listCreatures(),
  }
}

export const useCreatureStore = create<CreatureStoreState>((set, get) => ({
  creatures: listCreatures(),
  homebrew: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const homebrew = await listHomebrewCreatures()
      set({ ...applyLists(homebrew), loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar criaturas',
      })
    }
  },

  getHomebrewById: (id) => get().homebrew.find((creature) => creature.id === id),

  upsertCreature: async (creature) => {
    const saved = await saveCreature(creature)
    const homebrew = await listHomebrewCreatures()
    set(applyLists(homebrew))
    return saved
  },

  removeCreature: async (id) => {
    await deleteCreature(id)
    const homebrew = await listHomebrewCreatures()
    set(applyLists(homebrew))
  },

  duplicateCreature: async (id) => {
    const copy = await duplicateCreatureAsHomebrew(id)
    const homebrew = await listHomebrewCreatures()
    set(applyLists(homebrew))
    return copy
  },
}))
