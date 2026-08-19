import { create } from 'zustand'
import type { Feat } from '@/types'
import {
  deleteFeat,
  duplicateFeatAsHomebrew,
  getFeat,
  listFeats,
  saveFeat,
} from '@/features/feats/featRepository'

interface FeatStoreState {
  feats: Feat[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getById: (id: string) => Feat | undefined
  getHomebrewById: (id: string) => Feat | undefined
  fetchOne: (id: string) => Promise<Feat | undefined>
  upsertFeat: (feat: Feat) => Promise<Feat>
  removeFeat: (id: string) => Promise<void>
  duplicateFeat: (id: string) => Promise<Feat>
}

export const useFeatStore = create<FeatStoreState>((set, get) => ({
  feats: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const feats = await listFeats()
      set({ feats, loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar feitos',
      })
    }
  },

  getById: (id) => get().feats.find((f) => f.id === id),

  getHomebrewById: (id) =>
    get().feats.find((f) => f.id === id && f.provenance.type === 'homebrew'),

  fetchOne: async (id) => {
    const cached = get().getById(id)
    if (cached) return cached
    return getFeat(id)
  },

  upsertFeat: async (feat) => {
    const saved = await saveFeat(feat)
    const feats = await listFeats()
    set({ feats })
    return saved
  },

  removeFeat: async (id) => {
    await deleteFeat(id)
    const feats = await listFeats()
    set({ feats })
  },

  duplicateFeat: async (id) => {
    const copy = await duplicateFeatAsHomebrew(id)
    const feats = await listFeats()
    set({ feats })
    return copy
  },
}))
