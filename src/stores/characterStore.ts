import { create } from 'zustand'
import type { Character } from '@/types'
import type { PortraitTransform } from '@/types'
import {
  createEmptyCharacter,
  deleteCharacter,
  getCharacter,
  listCharacters,
  removeCharacterPortrait,
  duplicateCharacter,
  saveCharacter,
  setCharacterPortrait,
  updatePortraitTransform,
} from '@/features/characters/characterRepository'
import { soleActiveGroupId } from '@/features/groups/groupFilter'
import { useGroupStore } from '@/stores/groupStore'

export type SaveStatus = 'idle' | 'dirty' | 'saving' | 'saved' | 'error'

interface CharacterStoreState {
  characters: Character[]
  current: Character | null
  saveStatus: SaveStatus
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  loadOne: (id: string) => Promise<Character | null>
  createNew: () => Promise<Character>
  duplicate: (id: string) => Promise<Character>
  updateCurrent: (patch: Partial<Character>) => void
  persistCurrent: () => Promise<void>
  remove: (id: string) => Promise<void>
  setPortrait: (file: Blob, mimeType: string) => Promise<void>
  updatePortraitTransform: (transform: PortraitTransform) => Promise<void>
  clearPortrait: () => Promise<void>
  setSaveStatus: (status: SaveStatus) => void
}

export const useCharacterStore = create<CharacterStoreState>((set, get) => ({
  characters: [],
  current: null,
  saveStatus: 'idle',
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const characters = await listCharacters()
      set({ characters, loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar personagens',
      })
    }
  },

  loadOne: async (id) => {
    set({ loading: true, error: null })
    try {
      const character = await getCharacter(id)
      set({ current: character ?? null, loading: false, saveStatus: 'idle' })
      return character ?? null
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar personagem',
      })
      return null
    }
  },

  createNew: async () => {
    const { groups, activeGroupIds } = useGroupStore.getState()
    const groupId = soleActiveGroupId(groups, activeGroupIds)
    const character = createEmptyCharacter({ groupId })
    await saveCharacter(character)
    const characters = await listCharacters()
    set({ characters, current: character, saveStatus: 'saved' })
    return character
  },

  duplicate: async (id) => {
    const copy = await duplicateCharacter(id)
    const characters = await listCharacters()
    set({ characters, current: copy, saveStatus: 'saved' })
    return copy
  },

  updateCurrent: (patch) => {
    const current = get().current
    if (!current) return
    set({
      current: { ...current, ...patch },
      saveStatus: 'dirty',
    })
  },

  persistCurrent: async () => {
    const current = get().current
    if (!current) return
    set({ saveStatus: 'saving' })
    try {
      const saved = await saveCharacter(current)
      const characters = await listCharacters()
      set({ current: saved, characters, saveStatus: 'saved' })
    } catch (e) {
      set({
        saveStatus: 'error',
        error: e instanceof Error ? e.message : 'Erro ao salvar',
      })
    }
  },

  remove: async (id) => {
    await deleteCharacter(id)
    const characters = await listCharacters()
    const current = get().current
    set({
      characters,
      current: current?.id === id ? null : current,
    })
  },

  setPortrait: async (file, mimeType) => {
    const current = get().current
    if (!current) return
    set({ saveStatus: 'saving' })
    const updated = await setCharacterPortrait(current.id, file, mimeType)
    const characters = await listCharacters()
    set({ current: updated, characters, saveStatus: 'saved' })
  },

  updatePortraitTransform: async (transform) => {
    const current = get().current
    if (!current) return
    await updatePortraitTransform(current.id, transform)
  },

  clearPortrait: async () => {
    const current = get().current
    if (!current) return
    set({ saveStatus: 'saving' })
    const updated = await removeCharacterPortrait(current.id)
    const characters = await listCharacters()
    set({ current: updated, characters, saveStatus: 'saved' })
  },

  setSaveStatus: (status) => set({ saveStatus: status }),
}))
