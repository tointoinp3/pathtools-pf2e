import { create } from 'zustand'
import { listSpells } from '@/engine/spellCatalog'
import { setHomebrewSpells } from '@/engine/spellRegistry'
import type { Spell } from '@/types'
import {
  deleteSpell,
  duplicateSpellAsHomebrew,
  listHomebrewSpells,
  saveSpell,
} from '@/features/spells/spellRepository'

interface SpellStoreState {
  spells: Spell[]
  homebrew: Spell[]
  loading: boolean
  error: string | null
  loadAll: () => Promise<void>
  getHomebrewById: (id: string) => Spell | undefined
  upsertSpell: (spell: Spell) => Promise<Spell>
  removeSpell: (id: string) => Promise<void>
  duplicateSpell: (id: string) => Promise<Spell>
}

function applyLists(homebrew: Spell[]): Pick<SpellStoreState, 'spells' | 'homebrew'> {
  setHomebrewSpells(homebrew)
  return {
    homebrew,
    spells: listSpells(),
  }
}

export const useSpellStore = create<SpellStoreState>((set, get) => ({
  spells: listSpells(),
  homebrew: [],
  loading: false,
  error: null,

  loadAll: async () => {
    set({ loading: true, error: null })
    try {
      const homebrew = await listHomebrewSpells()
      set({ ...applyLists(homebrew), loading: false })
    } catch (e) {
      set({
        loading: false,
        error: e instanceof Error ? e.message : 'Erro ao carregar magias',
      })
    }
  },

  getHomebrewById: (id) => get().homebrew.find((spell) => spell.id === id),

  upsertSpell: async (spell) => {
    const saved = await saveSpell(spell)
    const homebrew = await listHomebrewSpells()
    set(applyLists(homebrew))
    return saved
  },

  removeSpell: async (id) => {
    await deleteSpell(id)
    const homebrew = await listHomebrewSpells()
    set(applyLists(homebrew))
  },

  duplicateSpell: async (id) => {
    const copy = await duplicateSpellAsHomebrew(id)
    const homebrew = await listHomebrewSpells()
    set(applyLists(homebrew))
    return copy
  },
}))
