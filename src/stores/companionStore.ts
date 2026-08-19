import { create } from 'zustand'
import {
  listAnimalCompanionTypes,
  listEidolonTypes,
  listFamiliarForms,
  listSpecificFamiliars,
} from '@/engine/companionCatalog'
import { setHomebrewCompanions } from '@/engine/companionRegistry'
import type {
  AnimalCompanionTypeDefinition,
  EidolonTypeDefinition,
  FamiliarFormDefinition,
  HomebrewCompanionRecord,
  SpecificFamiliarDefinition,
} from '@/types/companion'
import {
  deleteCompanion,
  duplicateCompanionAsHomebrew,
  listHomebrewCompanions,
  saveCompanion,
} from '@/features/companions/companionRepository'

interface CompanionStoreState {
  animals: AnimalCompanionTypeDefinition[]
  eidolons: EidolonTypeDefinition[]
  forms: FamiliarFormDefinition[]
  specifics: SpecificFamiliarDefinition[]
  homebrew: HomebrewCompanionRecord[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getHomebrewById: (id: string) => HomebrewCompanionRecord | undefined
  upsertCompanion: (
    record: HomebrewCompanionRecord,
  ) => Promise<HomebrewCompanionRecord>
  removeCompanion: (id: string) => Promise<void>
  duplicateCompanion: (id: string) => Promise<HomebrewCompanionRecord>
}

function applyLists(
  homebrew: HomebrewCompanionRecord[],
): Pick<
  CompanionStoreState,
  'animals' | 'eidolons' | 'forms' | 'specifics' | 'homebrew'
> {
  setHomebrewCompanions(homebrew)
  return {
    homebrew,
    animals: listAnimalCompanionTypes(),
    eidolons: listEidolonTypes(),
    forms: listFamiliarForms(),
    specifics: listSpecificFamiliars(),
  }
}

export const useCompanionStore = create<CompanionStoreState>((set, get) => ({
  animals: listAnimalCompanionTypes(),
  eidolons: listEidolonTypes(),
  forms: listFamiliarForms(),
  specifics: listSpecificFamiliars(),
  homebrew: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const homebrew = await listHomebrewCompanions()
      set({ ...applyLists(homebrew), loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar companheiros',
      })
    }
  },

  getHomebrewById: (id) => get().homebrew.find((r) => r.id === id),

  upsertCompanion: async (record) => {
    const saved = await saveCompanion(record)
    const homebrew = await listHomebrewCompanions()
    set(applyLists(homebrew))
    return saved
  },

  removeCompanion: async (id) => {
    await deleteCompanion(id)
    const homebrew = await listHomebrewCompanions()
    set(applyLists(homebrew))
  },

  duplicateCompanion: async (id) => {
    const copy = await duplicateCompanionAsHomebrew(id)
    const homebrew = await listHomebrewCompanions()
    set(applyLists(homebrew))
    return copy
  },
}))
