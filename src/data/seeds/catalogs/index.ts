import type { CharacterClass, ClassCatalogDefinition } from '@/types/class'
import {
  CLASS_ALCHEMIST_ID,
  CLASS_ANIMIST_ID,
  CLASS_COMMANDER_ID,
  CLASS_EXEMPLAR_ID,
  CLASS_INVENTOR_ID,
  CLASS_RUNESMITH_ID,
  CLASS_THAUMATURGE_ID,
} from '../ids'
import { exemplarEpithetCatalog, exemplarIkonCatalog } from './exemplar'
import { animistApparitionCatalog } from './animist'
import { runesmithRuneCatalog } from './runesmith'
import { commanderTacticCatalog } from './commander'
import { inventorCatalog } from './inventor'
import { buildAlchemistCatalogs } from './alchemist'
import { buildThaumaturgeCatalog } from './thaumaturge'

const STATIC: Record<string, ClassCatalogDefinition[]> = {
  [CLASS_EXEMPLAR_ID]: [exemplarIkonCatalog, exemplarEpithetCatalog],
  [CLASS_ANIMIST_ID]: [animistApparitionCatalog],
  [CLASS_RUNESMITH_ID]: [runesmithRuneCatalog],
  [CLASS_COMMANDER_ID]: [commanderTacticCatalog],
  [CLASS_INVENTOR_ID]: [inventorCatalog],
}

export function getClassCatalogs(
  classDef: CharacterClass,
): ClassCatalogDefinition[] {
  if (classDef.id === CLASS_ALCHEMIST_ID) return buildAlchemistCatalogs()
  if (classDef.id === CLASS_THAUMATURGE_ID) {
    return [buildThaumaturgeCatalog(classDef)]
  }
  return STATIC[classDef.id] ?? []
}

export function classHasCatalogs(classId: string | null | undefined): boolean {
  if (!classId) return false
  return (
    classId in STATIC ||
    classId === CLASS_ALCHEMIST_ID ||
    classId === CLASS_THAUMATURGE_ID
  )
}
