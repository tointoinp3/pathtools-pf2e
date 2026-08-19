import { create } from 'zustand'
import type { EncounterPlan } from '@/types'
import {
  createEmptyEncounter,
  deleteEncounter,
  duplicateEncounter,
  getEncounter,
  listEncounters,
  saveEncounter,
} from '@/features/encounters/encounterRepository'

interface EncounterStoreState {
  encounters: EncounterPlan[]
  current: EncounterPlan | null
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  loadOne: (id: string) => Promise<EncounterPlan | null>
  createNew: () => Promise<EncounterPlan>
  duplicate: (id: string) => Promise<EncounterPlan>
  updateCurrent: (patch: Partial<EncounterPlan>) => Promise<void>
  remove: (id: string) => Promise<void>
}

export const useEncounterStore = create<EncounterStoreState>((set, get) => ({
  encounters: [],
  current: null,
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const encounters = await listEncounters()
      set({ encounters, loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar encontros',
      })
    }
  },

  loadOne: async (id) => {
    set({ loading: true, error: null })
    try {
      const encounter = (await getEncounter(id)) ?? null
      set({ current: encounter, loading: false })
      return encounter
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar encontro',
      })
      return null
    }
  },

  createNew: async () => {
    const encounter = createEmptyEncounter()
    await saveEncounter(encounter)
    const encounters = await listEncounters()
    set({ encounters, current: encounter })
    return encounter
  },

  duplicate: async (id) => {
    const copy = await duplicateEncounter(id)
    const encounters = await listEncounters()
    set({ encounters, current: copy })
    return copy
  },

  updateCurrent: async (patch) => {
    const current = get().current
    if (!current) return
    const next = { ...current, ...patch }
    await saveEncounter(next)
    const encounters = await listEncounters()
    set({ current: next, encounters })
  },

  remove: async (id) => {
    await deleteEncounter(id)
    const encounters = await listEncounters()
    const current = get().current
    set({
      encounters,
      current: current?.id === id ? null : current,
    })
  },
}))
