import type { Deity } from '@/types/deity'
import {
  catalogDeities as officialDeities,
  getDeityById as getOfficialDeityById,
} from '@/data/seeds/deities'
import { shepherdOfDecayDeities } from '@/data/seeds/deitiesShepherdOfDecay'
import { apRemainderDeities } from '@/data/seeds/deitiesApRemainder'
import { getHomebrewDeities } from './deityRegistry'

function byPtName(a: Deity, b: Deity): number {
  return a.name.localeCompare(b.name, 'pt-BR')
}

const extraOfficialDeities = [...shepherdOfDecayDeities, ...apRemainderDeities]

export const catalogDeities: Deity[] = [...officialDeities, ...extraOfficialDeities]

export function listDeities(): Deity[] {
  return [...catalogDeities, ...getHomebrewDeities()].sort(byPtName)
}

export function getDeityById(id: string | null | undefined): Deity | null {
  if (!id) return null
  return (
    getHomebrewDeities().find((deity) => deity.id === id) ??
    extraOfficialDeities.find((deity) => deity.id === id) ??
    getOfficialDeityById(id)
  )
}

export function catalogDeityCount(): number {
  return catalogDeities.length + getHomebrewDeities().length
}
