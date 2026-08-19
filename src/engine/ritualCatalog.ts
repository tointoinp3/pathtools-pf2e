import type { Ritual, RitualRank } from '@/types/ritual'
import {
  catalogRituals as officialRituals,
  getRitualById as getOfficialRitualById,
  listRitualsByRank as listOfficialByRank,
} from '@/data/seeds/rituals'
import { severedAtTheRootRituals } from '@/data/seeds/ritualsSeveredAtTheRoot'
import { mythicApRituals } from '@/data/seeds/ritualsMythicAps'
import { apRemainderRituals } from '@/data/seeds/ritualsApRemainder'
import { getHomebrewRituals } from './ritualRegistry'

function byRankThenName(a: Ritual, b: Ritual): number {
  return a.rank - b.rank || a.name.localeCompare(b.name, 'pt-BR')
}

const extraOfficialRituals = [
  ...severedAtTheRootRituals,
  ...mythicApRituals,
  ...apRemainderRituals,
]

export function listRituals(): Ritual[] {
  return [...officialRituals, ...extraOfficialRituals, ...getHomebrewRituals()].sort(
    byRankThenName,
  )
}

export function getRitualById(id: string | null | undefined): Ritual | null {
  if (!id) return null
  return (
    getHomebrewRituals().find((ritual) => ritual.id === id) ??
    extraOfficialRituals.find((ritual) => ritual.id === id) ??
    getOfficialRitualById(id)
  )
}

export function listRitualsByRank(rank: RitualRank): Ritual[] {
  const extra = extraOfficialRituals.filter((ritual) => ritual.rank === rank)
  const homebrew = getHomebrewRituals().filter((ritual) => ritual.rank === rank)
  if (extra.length === 0 && homebrew.length === 0) return listOfficialByRank(rank)
  return [...listOfficialByRank(rank), ...extra, ...homebrew].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export function catalogRitualCount(): number {
  return officialRituals.length + extraOfficialRituals.length + getHomebrewRituals().length
}

export const catalogRituals = [...officialRituals, ...extraOfficialRituals]
