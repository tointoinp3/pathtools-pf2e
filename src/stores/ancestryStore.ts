import { create } from 'zustand'
import type { Ancestry, Heritage } from '@/types'
import {
  deleteAncestry,
  deleteHeritage,
  duplicateAncestryAsHomebrew,
  duplicateHeritageAsHomebrew,
  getAncestry,
  getHeritage,
  listAncestries,
  listHeritages,
  listHeritagesForAncestry,
  saveAncestry,
  saveHeritage,
} from '@/features/ancestries/ancestryRepository'
import { partitionHeritagesForAncestry } from '@/engine'

interface AncestryStoreState {
  ancestries: Ancestry[]
  heritages: Heritage[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getAncestryById: (id: string) => Ancestry | undefined
  getHeritageById: (id: string) => Heritage | undefined
  heritagesFor: (ancestryId: string) => Heritage[]
  fetchAncestry: (id: string) => Promise<Ancestry | undefined>
  fetchHeritage: (id: string) => Promise<Heritage | undefined>
  upsertAncestry: (ancestry: Ancestry) => Promise<Ancestry>
  upsertHeritage: (heritage: Heritage) => Promise<Heritage>
  removeAncestry: (id: string) => Promise<void>
  removeHeritage: (id: string) => Promise<void>
  duplicateAncestry: (id: string) => Promise<Ancestry>
  duplicateHeritage: (id: string) => Promise<Heritage>
}

export const useAncestryStore = create<AncestryStoreState>((set, get) => ({
  ancestries: [],
  heritages: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const [ancestries, heritages] = await Promise.all([
        listAncestries(),
        listHeritages(),
      ])
      set({ ancestries, heritages, loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar ancestralidades',
      })
    }
  },

  getAncestryById: (id) => get().ancestries.find((a) => a.id === id),

  getHeritageById: (id) => get().heritages.find((h) => h.id === id),

  heritagesFor: (ancestryId) => {
    const ancestry = get().ancestries.find((a) => a.id === ancestryId)
    const { specific, versatile } = partitionHeritagesForAncestry(
      get().heritages,
      ancestryId,
      '',
      ancestry?.traits,
    )
    return [...specific, ...versatile]
  },

  fetchAncestry: async (id) => {
    const cached = get().getAncestryById(id)
    if (cached) return cached
    return getAncestry(id)
  },

  fetchHeritage: async (id) => {
    const cached = get().getHeritageById(id)
    if (cached) return cached
    return getHeritage(id)
  },

  upsertAncestry: async (ancestry) => {
    const saved = await saveAncestry(ancestry)
    const ancestries = await listAncestries()
    set({ ancestries })
    return saved
  },

  upsertHeritage: async (heritage) => {
    const saved = await saveHeritage(heritage)
    const [ancestries, heritages] = await Promise.all([
      listAncestries(),
      listHeritages(),
    ])
    set({ ancestries, heritages })
    return saved
  },

  removeAncestry: async (id) => {
    await deleteAncestry(id)
    const [ancestries, heritages] = await Promise.all([
      listAncestries(),
      listHeritages(),
    ])
    set({ ancestries, heritages })
  },

  removeHeritage: async (id) => {
    await deleteHeritage(id)
    const [ancestries, heritages] = await Promise.all([
      listAncestries(),
      listHeritages(),
    ])
    set({ ancestries, heritages })
  },

  duplicateAncestry: async (id) => {
    const copy = await duplicateAncestryAsHomebrew(id)
    const [ancestries, heritages] = await Promise.all([
      listAncestries(),
      listHeritages(),
    ])
    set({ ancestries, heritages })
    return copy
  },

  duplicateHeritage: async (id) => {
    const copy = await duplicateHeritageAsHomebrew(id)
    const [ancestries, heritages] = await Promise.all([
      listAncestries(),
      listHeritages(),
    ])
    set({ ancestries, heritages })
    return copy
  },
}))

export async function preloadHeritagesFor(
  ancestryId: string,
): Promise<Heritage[]> {
  return listHeritagesForAncestry(ancestryId)
}
