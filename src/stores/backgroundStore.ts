import { create } from 'zustand'
import type { Background, ContentSource } from '@/types'
import {
  deleteBackground,
  duplicateBackgroundAsHomebrew,
  listBackgrounds,
  listContentSources,
  saveBackground,
  saveContentSource,
} from '@/features/backgrounds/backgroundRepository'

interface BackgroundStoreState {
  backgrounds: Background[]
  sources: ContentSource[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  upsertBackground: (background: Background) => Promise<Background>
  upsertSource: (source: ContentSource) => Promise<ContentSource>
  removeBackground: (id: string) => Promise<void>
  duplicateAsHomebrew: (id: string) => Promise<Background>
  getById: (id: string) => Background | undefined
  getSourceById: (id: string) => ContentSource | undefined
}

export const useBackgroundStore = create<BackgroundStoreState>((set, get) => ({
  backgrounds: [],
  sources: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const [backgrounds, sources] = await Promise.all([
        listBackgrounds(),
        listContentSources(),
      ])
      set({ backgrounds, sources, loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar origens',
      })
    }
  },

  upsertBackground: async (background) => {
    const saved = await saveBackground(background)
    const backgrounds = await listBackgrounds()
    set({ backgrounds })
    return saved
  },

  upsertSource: async (source) => {
    const saved = await saveContentSource(source)
    const sources = await listContentSources()
    set({ sources })
    return saved
  },

  removeBackground: async (id) => {
    await deleteBackground(id)
    const backgrounds = await listBackgrounds()
    set({ backgrounds })
  },

  duplicateAsHomebrew: async (id) => {
    const copy = await duplicateBackgroundAsHomebrew(id)
    const [backgrounds, sources] = await Promise.all([
      listBackgrounds(),
      listContentSources(),
    ])
    set({ backgrounds, sources })
    return copy
  },

  getById: (id) => get().backgrounds.find((b) => b.id === id),

  getSourceById: (id) => get().sources.find((s) => s.id === id),
}))
