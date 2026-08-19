import {
  getAnimalCompanionType as getOfficialAnimalCompanionType,
  listAnimalCompanionTypes as listOfficialAnimalCompanionTypes,
} from '@/data/seeds/animalCompanions'
import {
  getEidolonType as getOfficialEidolonType,
  listEidolonTypes as listOfficialEidolonTypes,
} from '@/data/seeds/eidolons'
import {
  getFamiliarForm as getOfficialFamiliarForm,
  listFamiliarForms as listOfficialFamiliarForms,
} from '@/data/seeds/familiarForms'
import {
  getSpecificFamiliar as getOfficialSpecificFamiliar,
  listSpecificFamiliars as listOfficialSpecificFamiliars,
} from '@/data/seeds/specificFamiliars'
import type {
  AnimalCompanionTypeDefinition,
  EidolonTypeDefinition,
  FamiliarFormDefinition,
  SpecificFamiliarDefinition,
} from '@/types/companion'
import {
  getHomebrewAnimalCompanionTypes,
  getHomebrewEidolonTypes,
  getHomebrewFamiliarForms,
  getHomebrewSpecificFamiliars,
} from './companionRegistry'

function byPtName<T extends { name: string }>(a: T, b: T): number {
  return a.name.localeCompare(b.name, 'pt-BR')
}

export function listAnimalCompanionTypes(): AnimalCompanionTypeDefinition[] {
  return [
    ...listOfficialAnimalCompanionTypes(),
    ...getHomebrewAnimalCompanionTypes(),
  ].sort(byPtName)
}

export function getAnimalCompanionType(
  id: string | null | undefined,
): AnimalCompanionTypeDefinition | null {
  if (!id) return null
  return (
    getHomebrewAnimalCompanionTypes().find((t) => t.id === id) ??
    getOfficialAnimalCompanionType(id)
  )
}

export function listEidolonTypes(): EidolonTypeDefinition[] {
  return [...listOfficialEidolonTypes(), ...getHomebrewEidolonTypes()].sort(
    byPtName,
  )
}

export function getEidolonType(id: string | null | undefined) {
  if (!id) return undefined
  return (
    getHomebrewEidolonTypes().find((t) => t.id === id) ??
    getOfficialEidolonType(id)
  )
}

export function listFamiliarForms(): FamiliarFormDefinition[] {
  return [
    ...listOfficialFamiliarForms().filter((f) => f.id === 'form-custom'),
    ...[
      ...listOfficialFamiliarForms().filter((f) => f.id !== 'form-custom'),
      ...getHomebrewFamiliarForms(),
    ].sort(byPtName),
  ]
}

export function getFamiliarForm(
  id: string | null | undefined,
): FamiliarFormDefinition | null {
  if (!id) return null
  return (
    getHomebrewFamiliarForms().find((f) => f.id === id) ??
    getOfficialFamiliarForm(id)
  )
}

export function listSpecificFamiliars(): SpecificFamiliarDefinition[] {
  return [
    ...listOfficialSpecificFamiliars(),
    ...getHomebrewSpecificFamiliars(),
  ].sort(byPtName)
}

export function getSpecificFamiliar(
  id: string | null | undefined,
): SpecificFamiliarDefinition | null {
  if (!id) return null
  return (
    getHomebrewSpecificFamiliars().find((f) => f.id === id) ??
    getOfficialSpecificFamiliar(id)
  )
}
