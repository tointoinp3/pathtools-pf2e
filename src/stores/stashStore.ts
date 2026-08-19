import { create } from 'zustand'
import type { SharedStash } from '@/types'
import { listStashes, saveStash } from '@/features/groups/groupRepository'

interface StashStoreState {
  stashes: SharedStash[]
  loading: boolean
  loadAll: () => Promise<void>
  upsert: (stash: SharedStash) => Promise<SharedStash>
}

export const useStashStore = create<StashStoreState>((set) => ({
  stashes: [],
  loading: false,

  loadAll: async () => {
    set({ loading: true })
    try {
      const stashes = await listStashes()
      set({ stashes, loading: false })
    } catch {
      set({ loading: false })
    }
  },

  upsert: async (stash) => {
    const saved = await saveStash(stash)
    const stashes = await listStashes()
    set({ stashes })
    return saved
  },
}))
