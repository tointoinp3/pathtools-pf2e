import type { Archetype, Feat } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { emptyHomebrewFeat } from '@/features/feats/homebrewFeat'

export const ARCHETYPE_EXTRA_FEAT_LEVELS = [
  4, 6, 8, 10, 12, 14, 16, 18, 20,
]

export function dedicationTraits(kind: Archetype['kind']): string[] {
  if (kind === 'multiclass') {
    return ['Arquétipo', 'Dedicação', 'Multiclasse']
  }
  return ['Arquétipo', 'Dedicação']
}

export function extraFeatTraits(kind: Archetype['kind']): string[] {
  if (kind === 'multiclass') return ['Arquétipo', 'Multiclasse']
  return ['Arquétipo']
}

export function createEmptyHomebrewArchetype(): {
  archetype: Archetype
  dedication: Feat
  extraFeats: Feat[]
} {
  const now = nowIso()
  const archetypeId = createId('archetype')
  const dedication = emptyHomebrewFeat({
    category: 'archetype',
    archetypeId,
    isDedication: true,
    level: 2,
    traits: dedicationTraits('general'),
  })
  dedication.name = 'Dedicação'
  dedication.originalName = 'Dedication'
  dedication.description =
    'Você se dedica a este caminho. Os feitos seguintes deste arquétipo exigem esta Dedicação.'

  const archetype: Archetype = {
    id: archetypeId,
    name: 'Novo Arquétipo',
    originalName: 'New Archetype',
    kind: 'general',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'homebrew' },
    description: '',
    dedicationFeatId: dedication.id,
    featIds: [],
    featsRequiredBeforeNextDedication: 2,
    createdAt: now,
    updatedAt: now,
  }

  return { archetype, dedication, extraFeats: [] }
}
