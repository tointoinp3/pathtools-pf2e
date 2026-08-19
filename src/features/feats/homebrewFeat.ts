import type { Feat, FeatCategory, FeatEffect } from '@/types'
import { createId, nowIso } from '@/utils/id'

const CATEGORY_DEFAULT_TRAITS: Record<FeatCategory, string[]> = {
  skill: ['Geral', 'Perícia'],
  general: ['Geral'],
  ancestry: [],
  class: [],
  archetype: ['Arquétipo'],
  mythic: ['Mítico'],
  other: [],
}

const SLOT_TRAITS = ['Geral', 'Perícia', 'Arquétipo', 'Mítico'] as const

export const FEAT_CREATE_QUERY: Record<FeatCategory, string> = {
  general: 'geral',
  skill: 'pericia',
  ancestry: 'ancestralidade',
  class: 'classe',
  archetype: 'arquetipo',
  mythic: 'mitico',
  other: 'outro',
}

export const FEAT_CREATE_CATEGORIES: FeatCategory[] = [
  'ancestry',
  'class',
  'skill',
  'general',
  'archetype',
  'mythic',
  'other',
]

export function defaultTraitsForFeatCategory(
  category: FeatCategory,
  extra: string[] = [],
): string[] {
  const base = CATEGORY_DEFAULT_TRAITS[category]
  return [...base, ...extra.filter((trait) => !base.includes(trait))]
}

export function featCategoryFromQuery(query: string | null): FeatCategory | null {
  if (!query) return null
  switch (query) {
    case '1':
    case 'geral':
      return 'general'
    case 'pericia':
      return 'skill'
    case 'ancestralidade':
      return 'ancestry'
    case 'classe':
      return 'class'
    case 'arquetipo':
      return 'archetype'
    case 'mitico':
      return 'mythic'
    case 'outro':
      return 'other'
    default:
      return null
  }
}

export function applyFeatCategory(feat: Feat, category: FeatCategory): Feat {
  const extra = feat.traits.filter(
    (trait) => !SLOT_TRAITS.includes(trait as (typeof SLOT_TRAITS)[number]),
  )
  const next: Feat = {
    ...feat,
    category,
    traits: defaultTraitsForFeatCategory(category, extra),
  }
  if (category !== 'ancestry') {
    next.ancestryId = null
    next.heritageId = null
  }
  if (category !== 'class') next.classId = null
  if (category !== 'archetype') {
    next.archetypeId = null
    next.isDedication = undefined
    next.traits = next.traits.filter((trait) => trait !== 'Dedicação')
  }
  return next
}

export function emptyHomebrewFeat(opts: {
  category: FeatCategory
  ancestryId?: string | null
  classId?: string | null
  heritageId?: string | null
  archetypeId?: string | null
  isDedication?: boolean
  level?: number
  trait?: string
  traits?: string[]
}): Feat {
  const now = nowIso()
  const extra = opts.traits ?? (opts.trait ? [opts.trait] : [])
  const traits = defaultTraitsForFeatCategory(
    opts.category,
    opts.isDedication && !extra.includes('Dedicação')
      ? [...extra, 'Dedicação']
      : extra,
  )
  return {
    id: createId('feat'),
    name: opts.isDedication ? 'Dedicação' : 'Novo feito',
    originalName: opts.isDedication ? 'Dedication' : 'New Feat',
    level:
      opts.level ??
      (opts.isDedication
        ? 2
        : opts.category === 'ancestry' ||
            opts.category === 'general' ||
            opts.category === 'skill'
          ? 1
          : 4),
    category: opts.category,
    traits,
    rarity: 'common',
    provenance: { type: 'homebrew' },
    description: '',
    ancestryId: opts.ancestryId ?? null,
    classId: opts.classId ?? null,
    heritageId: opts.heritageId ?? null,
    archetypeId: opts.archetypeId ?? null,
    isDedication: opts.isDedication || undefined,
    createdAt: now,
    updatedAt: now,
  }
}

export function normalizeFeatEffects(effects: FeatEffect[] | undefined): FeatEffect[] {
  return (effects ?? []).filter(Boolean)
}
