import { create } from 'zustand'
import type { CharacterGroup } from '@/types'
import {
  createGroupWithStash,
  deleteGroup,
  listGroups,
  moveCharacterToGroup,
  moveCharactersToGroup,
  renameGroup,
} from '@/features/groups/groupRepository'

const ACTIVE_KEY = 'sp-active-group-ids'

function readActiveIds(): string[] {
  try {
    const raw = localStorage.getItem(ACTIVE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string')
  } catch {
    return []
  }
}

function writeActiveIds(ids: string[]) {
  try {
    localStorage.setItem(ACTIVE_KEY, JSON.stringify(ids))
  } catch {
    /* ignore */
  }
}

interface GroupStoreState {
  groups: CharacterGroup[]
  activeGroupIds: string[]
  loading: boolean
  loadAll: () => Promise<void>
  create: (name: string) => Promise<CharacterGroup>
  rename: (id: string, name: string) => Promise<void>
  remove: (id: string, deleteCharacters: boolean) => Promise<void>
  moveCharacter: (characterId: string, groupId: string | null) => Promise<void>
  moveCharacters: (characterIds: string[], groupId: string | null) => Promise<void>
  toggleActive: (id: string) => void
  setActive: (ids: string[]) => void
  clearActive: () => void
}

export const useGroupStore = create<GroupStoreState>((set, get) => ({
  groups: [],
  activeGroupIds: readActiveIds(),
  loading: false,

  loadAll: async () => {
    set({ loading: true })
    try {
      const groups = await listGroups()
      const valid = new Set(groups.map((g) => g.id))
      const activeGroupIds = get().activeGroupIds.filter((id) => valid.has(id))
      if (activeGroupIds.length !== get().activeGroupIds.length) {
        writeActiveIds(activeGroupIds)
      }
      set({ groups, activeGroupIds, loading: false })
    } catch {
      set({ loading: false })
    }
  },

  create: async (name) => {
    const { group } = await createGroupWithStash(name)
    await get().loadAll()
    return group
  },

  rename: async (id, name) => {
    await renameGroup(id, name)
    await get().loadAll()
  },

  remove: async (id, deleteCharacters) => {
    await deleteGroup(id, { deleteCharacters })
    const activeGroupIds = get().activeGroupIds.filter((gid) => gid !== id)
    writeActiveIds(activeGroupIds)
    set({ activeGroupIds })
    await get().loadAll()
  },

  moveCharacter: async (characterId, groupId) => {
    await moveCharacterToGroup(characterId, groupId)
  },

  moveCharacters: async (characterIds, groupId) => {
    await moveCharactersToGroup(characterIds, groupId)
  },

  toggleActive: (id) => {
    const current = get().activeGroupIds
    const next = current.includes(id)
      ? current.filter((gid) => gid !== id)
      : [...current, id]
    writeActiveIds(next)
    set({ activeGroupIds: next })
  },

  setActive: (ids) => {
    writeActiveIds(ids)
    set({ activeGroupIds: ids })
  },

  clearActive: () => {
    writeActiveIds([])
    set({ activeGroupIds: [] })
  },
}))
