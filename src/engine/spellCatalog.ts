import type { Spell, SpellRank } from '@/types/spell'
import {
  catalogSpells,
  getSpellById as getOfficialSpellById,
  listSpellsByRank as listOfficialByRank,
} from '@/data/seeds/spells'
import { getHomebrewSpells } from './spellRegistry'

function byRankThenName(a: Spell, b: Spell): number {
  return a.rank - b.rank || a.name.localeCompare(b.name, 'pt-BR')
}

export function listSpells(): Spell[] {
  return [...catalogSpells, ...getHomebrewSpells()].sort(byRankThenName)
}

export function getSpellById(id: string | null | undefined): Spell | null {
  if (!id) return null
  return (
    getHomebrewSpells().find((spell) => spell.id === id) ??
    getOfficialSpellById(id)
  )
}

export function listSpellsByRank(rank: SpellRank): Spell[] {
  const homebrew = getHomebrewSpells().filter(
    (spell) => spell.rank === rank && !spell.focus,
  )
  if (homebrew.length === 0) return listOfficialByRank(rank)
  return [...listOfficialByRank(rank), ...homebrew].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export function catalogSpellCount(): number {
  return catalogSpells.length + getHomebrewSpells().length
}

export { catalogSpells }
