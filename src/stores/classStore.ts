import { create } from 'zustand'
import type { CharacterClass } from '@/types'
import {
  deleteClass,
  duplicateClassAsHomebrew,
  getClass,
  listClasses,
  saveClass,
} from '@/features/classes/classRepository'

interface ClassStoreState {
  classes: CharacterClass[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getById: (id: string) => CharacterClass | undefined
  fetchOne: (id: string) => Promise<CharacterClass | undefined>
  upsertClass: (characterClass: CharacterClass) => Promise<CharacterClass>
  removeClass: (id: string) => Promise<void>
  duplicateClass: (id: string) => Promise<CharacterClass>
}

export const useClassStore = create<ClassStoreState>((set, get) => ({
  classes: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const classes = await listClasses()
      set({ classes, loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar classes',
      })
    }
  },

  getById: (id) => get().classes.find((c) => c.id === id),

  fetchOne: async (id) => {
    const cached = get().getById(id)
    if (cached) return cached
    return getClass(id)
  },

  upsertClass: async (characterClass) => {
    const saved = await saveClass(characterClass)
    const classes = await listClasses()
    set({ classes })
    return saved
  },

  removeClass: async (id) => {
    await deleteClass(id)
    const classes = await listClasses()
    set({ classes })
  },

  duplicateClass: async (id) => {
    const copy = await duplicateClassAsHomebrew(id)
    const classes = await listClasses()
    set({ classes })
    return copy
  },
}))
