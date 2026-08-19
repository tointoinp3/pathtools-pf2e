import type { ItemDefinition } from '@/types/equipment'
import { getItemDefinition } from './equipmentCatalog'

const MODE_SUFFIX =
  /\s*\((à distância|corpo a corpo|ranged|melee)\)\s*$/i

export function isCombinationWeapon(
  definition: ItemDefinition | null | undefined,
): boolean {
  if (!definition?.weapon) return false
  return definition.traits.some((trait) => {
    const lower = trait.toLowerCase()
    return lower === 'combination' || lower === 'combinação'
  })
}

export function combinationPartnerDefinitionId(
  definition: ItemDefinition | null | undefined,
): string | null {
  if (!definition?.weapon || !isCombinationWeapon(definition)) return null
  if (definition.weapon.combinationPartnerId) {
    return definition.weapon.combinationPartnerId
  }
  const id = definition.id
  if (id.endsWith('-ranged')) return `${id.slice(0, -'-ranged'.length)}-melee`
  if (id.endsWith('-melee')) return `${id.slice(0, -'-melee'.length)}-ranged`
  return null
}

export function getCombinationPartnerDefinition(
  definition: ItemDefinition | null | undefined,
): ItemDefinition | null {
  const partnerId = combinationPartnerDefinitionId(definition)
  if (!partnerId) return null
  const partner = getItemDefinition(partnerId)
  return partner?.weapon ? partner : null
}

export function combinationBaseName(name: string): string {
  return name.replace(MODE_SUFFIX, '').trim()
}

export function combinationModeLabel(
  rangeType: 'melee' | 'ranged',
): string {
  return rangeType === 'ranged' ? 'à distância' : 'corpo a corpo'
}

export function combinationModeTitle(
  rangeType: 'melee' | 'ranged',
): string {
  return rangeType === 'ranged' ? 'À distância' : 'Corpo a corpo'
}

export function combinationDisplayName(
  itemName: string,
  rangeType: 'melee' | 'ranged',
): string {
  const base = combinationBaseName(itemName) || itemName
  return `${base} (${combinationModeLabel(rangeType)})`
}

export function resolvedWeaponAttackKey(itemId: string, definitionId: string): string {
  return `${itemId}:${definitionId}`
}
