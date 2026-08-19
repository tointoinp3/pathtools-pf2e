import type { Character, CharacterClass } from '@/types'
import {
  CLASS_DRUID_ID,
  CLASS_INVENTOR_ID,
  CLASS_SUMMONER_ID,
  CLASS_WITCH_ID,
} from '@/data/seeds/ids'
import { subclassCountsAs } from './class'
import { getFamiliarForm } from './companionCatalog'

export type RequiredCompanionKind = 'animal' | 'familiar' | 'eidolon' | 'construct'

export interface CompanionCreationGap {
  id: string
  kind: RequiredCompanionKind
  label: string
  detail: string
}

const ANIMAL_COMPANION_FEAT_IDS = new Set([
  'feat-druid-animal-companion',
  'feat-ranger-animal-companion',
])

const FAMILIAR_FEAT_IDS = new Set(['feat-druid-leshy-familiar'])

function selectedFeatIds(character: Character): Set<string> {
  return new Set(
    (character.featSelections ?? [])
      .map((s) => s.featId)
      .filter((id): id is string => Boolean(id)),
  )
}

export function requiredCompanionKinds(
  character: Character,
  characterClass: CharacterClass | null,
): RequiredCompanionKind[] {
  const kinds = new Set<RequiredCompanionKind>()
  const subclassId = character.classChoices?.subclassId
  const classId = characterClass?.id ?? character.classId
  const feats = selectedFeatIds(character)

  if (classId === CLASS_WITCH_ID) kinds.add('familiar')
  if (classId === CLASS_SUMMONER_ID) kinds.add('eidolon')
  if (classId === CLASS_INVENTOR_ID && subclassId === 'innovation-construct') {
    kinds.add('construct')
  }
  const subclass =
    characterClass?.subclass?.options.find((o) => o.id === subclassId) ?? null

  if (classId === CLASS_DRUID_ID && subclassId === 'order-animal') {
    kinds.add('animal')
  }
  if (
    classId === CLASS_DRUID_ID &&
    (subclassId === 'order-leaf' ||
      subclassId === 'order-cultivation' ||
      subclassId === 'order-spore' ||
      subclassCountsAs(subclass, 'order-leaf'))
  ) {
    kinds.add('familiar')
  }

  for (const id of feats) {
    if (ANIMAL_COMPANION_FEAT_IDS.has(id)) kinds.add('animal')
    if (FAMILIAR_FEAT_IDS.has(id)) kinds.add('familiar')
  }

  return [...kinds]
}

export function companionCreationGaps(
  character: Character,
  characterClass: CharacterClass | null,
): CompanionCreationGap[] {
  const companions = character.companions
  const gaps: CompanionCreationGap[] = []

  for (const kind of requiredCompanionKinds(character, characterClass)) {
    if (kind === 'animal') {
      const animal = companions?.animalCompanion
      if (!animal?.typeId) {
        gaps.push({
          id: 'companion-animal',
          kind,
          label: 'Companheiro animal',
          detail: animal
            ? 'Escolha o tipo no catálogo'
            : 'A classe/feito pede um companheiro animal',
        })
      }
    }
    if (kind === 'familiar') {
      const familiar = companions?.familiarOrPet
      const sporeOrder = character.classChoices?.subclassId === 'order-spore'
      if (familiar?.kind !== 'familiar' || !familiar.typeId) {
        gaps.push({
          id: 'companion-familiar',
          kind,
          label: sporeOrder ? 'Familiar leshy fungo' : 'Familiar',
          detail:
            familiar?.kind === 'familiar'
              ? sporeOrder
                ? 'Escolha a forma Leshy fungo no catálogo'
                : 'Escolha a forma Tiny no catálogo'
              : sporeOrder
                ? 'A ordem dos Esporos pede um familiar leshy fungo'
                : 'A classe pede um familiar',
        })
      } else if (sporeOrder) {
        const form = getFamiliarForm(familiar.typeId)
        const hasFungus =
          Boolean(form?.innateAbilityIds.includes('fam-fungus')) ||
          (familiar.selectedAbilities ?? []).some(
            (a) => a.abilityId === 'fam-fungus',
          )
        if (!hasFungus) {
          gaps.push({
            id: 'companion-familiar-fungus',
            kind,
            label: 'Familiar leshy fungo',
            detail:
              'A ordem dos Esporos exige um familiar leshy com a habilidade Fungo',
          })
        }
      }
    }
    if (kind === 'eidolon') {
      const eidolon = companions?.eidolon
      if (!eidolon?.typeId) {
        gaps.push({
          id: 'companion-eidolon',
          kind,
          label: 'Eidolon',
          detail: eidolon
            ? 'Confirme o tipo na aba Companheiros'
            : 'O invocador ancora um eidolon no 1º nível',
        })
      }
    }
    if (kind === 'construct') {
      const construct = companions?.constructCompanion
      if (!construct) {
        gaps.push({
          id: 'companion-construct',
          kind,
          label: 'Companheiro construto',
          detail: 'A inovação de construto precisa da ficha na aba Companheiros',
        })
      } else if (!construct.initialModificationId) {
        gaps.push({
          id: 'companion-construct',
          kind,
          label: 'Modificação inicial',
          detail: 'Escolha a modificação inicial do construto',
        })
      }
    }
  }

  return gaps
}
