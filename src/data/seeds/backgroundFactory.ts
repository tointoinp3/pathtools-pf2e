import type {
  AttributeId,
  Background,
  FeatGrantRule,
  LoreGrantRule,
  Rarity,
  SkillGrantRule,
  SkillId,
} from '@/types'

export type LoreSpec =
  | { type: 'fixed'; id: string; name: string }
  | { type: 'choice'; options: Array<{ id: string; name: string }> }
  | {
      type: 'custom'
      prompt?: string
      expertAtLevel?: number
      masterAtLevel?: number
      legendaryAtLevel?: number
    }
  | { type: 'none' }

export type SkillSpec =
  | SkillId
  | { type: 'choice'; options: SkillId[] }
  | { type: 'multi'; skills: SkillId[] }
  | { type: 'none' }

export interface FeatSpec {
  name: string
  originalName?: string
  featType?: FeatGrantRule['featType']
  description?: string
  actionType?: FeatGrantRule['actionType']
  frequency?: string
  trigger?: string
  traits?: string[]
  requiresSkillId?: SkillId
  appendChosenSkillName?: boolean
  skillGrantIdForName?: string
  featOptions?: FeatGrantRule['featOptions']
  chooseSkillFeat?: SkillId
  chooseHint?: string
}

export interface BackgroundDraft {
  id: string
  name: string
  originalName: string
  description: string
  sourceId: string
  sourcePage: number
  rarity?: Rarity
  boosts: AttributeId[] | 'free' | null
  freeBoost?: boolean
  extraFreeBoosts?: number
  skill: SkillSpec
  lore: LoreSpec
  /** Multiple lore grants (e.g. Concordance Researcher) */
  extraLores?: LoreSpec[]
  feats?: FeatSpec[]
}

function standardBoosts(
  restricted: AttributeId[] | 'free' | null,
  includeFree: boolean,
  extraFree = 0,
): Background['attributeBoosts'] {
  const boosts: Background['attributeBoosts'] = []

  if (restricted === 'free') {
    boosts.push({
      id: 'restricted',
      label: 'Boost restrito',
      option: { kind: 'free', excludeAlreadyChosen: true },
    })
  } else if (restricted && restricted.length > 0) {
    boosts.push({
      id: 'restricted',
      label: 'Boost restrito',
      option: { kind: 'specific', attributes: restricted },
    })
  }

  if (includeFree) {
    boosts.push({
      id: 'free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    })
  }

  for (let i = 0; i < extraFree; i++) {
    boosts.push({
      id: `free-${i + 2}`,
      label: `Boost livre ${i + 2}`,
      option: { kind: 'free', excludeAlreadyChosen: true },
    })
  }

  return boosts
}

function buildSkillGrants(skill: SkillSpec): SkillGrantRule[] {
  if (typeof skill !== 'string' && skill.type === 'none') {
    return []
  }
  if (typeof skill === 'string') {
    return [{ id: 'skill', rank: 'trained', skillId: skill }]
  }
  if (skill.type === 'choice') {
    return [{ id: 'skill', rank: 'trained', skillOptions: skill.options }]
  }
  return skill.skills.map((skillId, index) => ({
    id: `skill-${index + 1}`,
    rank: 'trained' as const,
    skillId,
  }))
}

function buildSingleLoreGrant(lore: LoreSpec, id: string): LoreGrantRule[] {
  if (lore.type === 'none') return []
  if (lore.type === 'fixed') {
    return [
      {
        id,
        rank: 'trained',
        loreId: lore.id,
        loreName: lore.name,
      },
    ]
  }
  if (lore.type === 'choice') {
    return [
      {
        id,
        rank: 'trained',
        loreOptions: lore.options,
      },
    ]
  }
  return [
    {
      id,
      rank: 'trained',
      allowCustom: true,
      hint: lore.prompt,
      expertAtLevel: lore.expertAtLevel,
      masterAtLevel: lore.masterAtLevel,
      legendaryAtLevel: lore.legendaryAtLevel,
    },
  ]
}

function buildLoreGrants(
  lore: LoreSpec,
  extraLores?: LoreSpec[],
): LoreGrantRule[] {
  const primary = buildSingleLoreGrant(lore, 'lore')
  const extras = (extraLores ?? []).flatMap((spec, index) =>
    buildSingleLoreGrant(spec, `lore-${index + 2}`),
  )
  return [...primary, ...extras]
}

function buildFeatGrants(feats: FeatSpec[] | undefined): FeatGrantRule[] {
  if (!feats || feats.length === 0) return []
  return feats.map((feat, index) => ({
    id: feats.length === 1 ? 'feat' : `feat-${index + 1}`,
    featName: feat.name,
    originalName: feat.originalName,
    featType: feat.featType ?? 'skill',
    description: feat.description,
    actionType: feat.actionType,
    frequency: feat.frequency,
    trigger: feat.trigger,
    traits: feat.traits,
    requiresSkillId: feat.requiresSkillId,
    appendChosenSkillName: feat.appendChosenSkillName,
    skillGrantIdForName: feat.skillGrantIdForName,
    featOptions: feat.featOptions,
    chooseSkillFeat: feat.chooseSkillFeat,
    chooseHint: feat.chooseHint,
  }))
}

export function makeBackground(draft: BackgroundDraft): Background {
  const includeFree = draft.freeBoost ?? draft.boosts !== null
  return {
    id: draft.id,
    name: draft.name,
    originalName: draft.originalName,
    description: draft.description,
    rarity: draft.rarity ?? 'common',
    provenance: { type: 'official' },
    sourceId: draft.sourceId,
    sourcePage: draft.sourcePage,
    attributeBoosts: standardBoosts(
      draft.boosts,
      includeFree && draft.boosts !== null,
      draft.extraFreeBoosts ?? 0,
    ),
    skillGrants: buildSkillGrants(draft.skill),
    loreGrants: buildLoreGrants(draft.lore, draft.extraLores),
    featGrants: buildFeatGrants(draft.feats),
  }
}

export function makeTripleFreeBoostBackground(
  draft: BackgroundDraft,
): Background {
  return {
    id: draft.id,
    name: draft.name,
    originalName: draft.originalName,
    description: draft.description,
    rarity: draft.rarity ?? 'rare',
    provenance: { type: 'official' },
    sourceId: draft.sourceId,
    sourcePage: draft.sourcePage,
    attributeBoosts: [
      {
        id: 'free-1',
        label: 'Boost livre 1',
        option: { kind: 'free', excludeAlreadyChosen: true },
      },
      {
        id: 'free-2',
        label: 'Boost livre 2',
        option: { kind: 'free', excludeAlreadyChosen: true },
      },
      {
        id: 'free-3',
        label: 'Boost livre 3 (mestre)',
        option: { kind: 'free', excludeAlreadyChosen: true },
      },
    ],
    skillGrants: [],
    loreGrants: [],
    featGrants: [],
  }
}
