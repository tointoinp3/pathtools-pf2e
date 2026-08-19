import { create } from 'zustand'
import { listItemDefinitions } from '@/engine/equipmentCatalog'
import { setHomebrewItems } from '@/engine/equipmentRegistry'
import type { ItemDefinition } from '@/types'
import {
  deleteItem,
  duplicateItemAsHomebrew,
  listHomebrewItems,
  saveItem,
} from '@/features/equipment/itemRepository'

interface EquipmentStoreState {
  items: ItemDefinition[]
  homebrew: ItemDefinition[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getHomebrewById: (id: string) => ItemDefinition | undefined
  upsertItem: (item: ItemDefinition) => Promise<ItemDefinition>
  removeItem: (id: string) => Promise<void>
  duplicateItem: (id: string) => Promise<ItemDefinition>
}

function applyLists(homebrew: ItemDefinition[]): Pick<
  EquipmentStoreState,
  'items' | 'homebrew'
> {
  setHomebrewItems(homebrew)
  return {
    homebrew,
    items: listItemDefinitions(),
  }
}

export const useEquipmentStore = create<EquipmentStoreState>((set, get) => ({
  items: listItemDefinitions(),
  homebrew: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const homebrew = await listHomebrewItems()
      set({ ...applyLists(homebrew), loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar equipamento',
      })
    }
  },

  getHomebrewById: (id) => get().homebrew.find((item) => item.id === id),

  upsertItem: async (item) => {
    const saved = await saveItem(item)
    const homebrew = await listHomebrewItems()
    set(applyLists(homebrew))
    return saved
  },

  removeItem: async (id) => {
    await deleteItem(id)
    const homebrew = await listHomebrewItems()
    set(applyLists(homebrew))
  },

  duplicateItem: async (id) => {
    const copy = await duplicateItemAsHomebrew(id)
    const homebrew = await listHomebrewItems()
    set(applyLists(homebrew))
    return copy
  },
}))
