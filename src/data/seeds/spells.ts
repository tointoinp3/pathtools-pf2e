import type { Spell } from '@/types/spell'
import { SOURCE_PLAYER_CORE_ID } from './sources'
import { arcaneSpellsRank0to3 } from './spellsArcaneRank0to3'
import { arcaneSpellsRank4to6 } from './spellsArcaneRank4to6'
import { arcaneSpellsRank7to10 } from './spellsArcaneRank7to10'
import { divineSpellsRank0to3 } from './spellsDivineRank0to3'
import { divineSpellsRank4to6 } from './spellsDivineRank4to6'
import { divineSpellsRank7to10 } from './spellsDivineRank7to10'
import { occultSpellsRank0to3 } from './spellsOccultRank0to3'
import { occultSpellsRank4to6 } from './spellsOccultRank4to6'
import { occultSpellsRank7to10 } from './spellsOccultRank7to10'
import { primalSpellsRank0to3 } from './spellsPrimalRank0to3'
import { primalSpellsRank4to6 } from './spellsPrimalRank4to6'
import { primalSpellsRank7to10 } from './spellsPrimalRank7to10'
import { focusSpells } from './spellsFocus'
import { classCantrips } from './spellsClassCantrips'
import { impossibleMagicSpells } from './spellsImpossibleMagic'
import { remasterExpansionSpells } from './spellsRemasterExpansions'
import { remasterRemainderSpells } from './spellsRemasterRemainder'
import { severedAtTheRootSpells } from './spellsSeveredAtTheRoot'
import { shepherdOfDecaySpells } from './spellsShepherdOfDecay'
import { apRemainderSpells } from './spellsApRemainder'

/**
 * Magias de foco oficiais entram por `focusSpells` e por fontes pontuais
 * (ex.: Pathfinder #202 em `severedAtTheRootSpells`).
 * Magias de tradição de Impossible Magic entram por `impossibleMagicSpells`.
 * Expansões Remaster (Rival Academies, Shining Kingdoms, etc.) entram por `remasterExpansionSpells`.
 */
export const catalogSpells: Spell[] = [
  ...arcaneSpellsRank0to3,
  ...arcaneSpellsRank4to6,
  ...arcaneSpellsRank7to10,
  ...divineSpellsRank0to3,
  ...divineSpellsRank4to6,
  ...divineSpellsRank7to10,
  ...occultSpellsRank0to3,
  ...occultSpellsRank4to6,
  ...occultSpellsRank7to10,
  ...primalSpellsRank0to3,
  ...primalSpellsRank4to6,
  ...primalSpellsRank7to10,
  ...impossibleMagicSpells,
  ...remasterExpansionSpells,
  ...remasterRemainderSpells,
  ...severedAtTheRootSpells,
  ...shepherdOfDecaySpells,
  ...apRemainderSpells,
  ...focusSpells,
  ...classCantrips,
]

export const sampleSpells = catalogSpells

export const SAMPLE_SPELL_SOURCE_ID = SOURCE_PLAYER_CORE_ID

const SPELLS_BY_ID = Object.fromEntries(
  catalogSpells.map((spell) => [spell.id, spell]),
) as Record<string, Spell>

export function getSpellById(id: string | null | undefined): Spell | null {
  if (!id) return null
  return SPELLS_BY_ID[id] ?? null
}

export function listSpellsByRank(rank: Spell['rank']): Spell[] {
  return catalogSpells
    .filter((spell) => spell.rank === rank && !spell.focus)
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}
