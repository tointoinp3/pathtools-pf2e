import type { Creature, CreatureFamily } from '@/types/creature'
import {
  catalogCreatures as officialCreatures,
  getCatalogCreatureById,
} from '@/data/seeds/creatures'
import {
  catalogCreatureFamilies,
  getCreatureFamilyById,
} from '@/data/seeds/creatureFamilies'
import { getHomebrewCreatures } from './creatureRegistry'

function byPtName(a: Creature, b: Creature): number {
  return a.name.localeCompare(b.name, 'pt-BR')
}

export function listCreatures(): Creature[] {
  return [...officialCreatures, ...getHomebrewCreatures()].sort(byPtName)
}

export function getCreatureById(id: string | null | undefined): Creature | null {
  if (!id) return null
  return (
    getHomebrewCreatures().find((creature) => creature.id === id) ??
    getCatalogCreatureById(id)
  )
}

export function catalogCreatureCount(): number {
  return officialCreatures.length + getHomebrewCreatures().length
}

export function listCreatureFamilies(): CreatureFamily[] {
  return catalogCreatureFamilies
}

export function listFamiliesForCreature(creature: Creature): CreatureFamily[] {
  const fromIds = (creature.familyIds ?? [])
    .map((id) => getCreatureFamilyById(id))
    .filter((family): family is CreatureFamily => family != null)
  if (fromIds.length > 0) return fromIds
  return catalogCreatureFamilies.filter(
    (family) => family.trait != null && creature.traits.includes(family.trait),
  )
}
