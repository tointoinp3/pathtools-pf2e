import { create } from 'zustand'
import type { Archetype } from '@/types'
import { listOfficialArchetypes } from '@/data/seeds/archetypes'
import { sortArchetypes } from '@/engine'
import { setHomebrewArchetypes } from '@/engine/archetypeRegistry'
import {
  deleteArchetype,
  duplicateArchetypeAsHomebrew,
  listHomebrewArchetypes,
  saveArchetype,
} from '@/features/archetypes/archetypeRepository'

interface ArchetypeStoreState {
  archetypes: Archetype[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getById: (id: string) => Archetype | undefined
  upsertArchetype: (archetype: Archetype) => Promise<Archetype>
  removeArchetype: (id: string) => Promise<void>
  duplicateArchetype: (id: string) => Promise<Archetype>
}

export const useArchetypeStore = create<ArchetypeStoreState>((set, get) => ({
  archetypes: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const homebrew = await listHomebrewArchetypes()
      setHomebrewArchetypes(homebrew)
      set({
        archetypes: sortArchetypes([...listOfficialArchetypes(), ...homebrew]),
        loading: false,
      })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar arquétipos',
      })
    }
  },

  getById: (id) => get().archetypes.find((a) => a.id === id),

  upsertArchetype: async (archetype) => {
    const saved = await saveArchetype(archetype)
    const homebrew = await listHomebrewArchetypes()
    set({
      archetypes: sortArchetypes([...listOfficialArchetypes(), ...homebrew]),
    })
    return saved
  },

  removeArchetype: async (id) => {
    await deleteArchetype(id)
    const homebrew = await listHomebrewArchetypes()
    set({
      archetypes: sortArchetypes([...listOfficialArchetypes(), ...homebrew]),
    })
  },

  duplicateArchetype: async (id) => {
    const copy = await duplicateArchetypeAsHomebrew(id)
    const homebrew = await listHomebrewArchetypes()
    set({
      archetypes: sortArchetypes([...listOfficialArchetypes(), ...homebrew]),
    })
    return copy
  },
}))
