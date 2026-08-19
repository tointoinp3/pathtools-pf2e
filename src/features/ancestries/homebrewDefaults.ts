import type {
  Ancestry,
  AttributeId,
  CreatureSize,
  Heritage,
  SenseDefinition,
  SpecialAbilityDefinition,
} from '@/types'
import { createId, nowIso } from '@/utils/id'

export const LOW_LIGHT_SENSE: SenseDefinition = {
  id: 'sense-low-light',
  kind: 'lowLightVision',
  name: 'Visão na Penumbra',
  originalName: 'Low-Light Vision',
  description:
    'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
}

export const DARKVISION_SENSE: SenseDefinition = {
  id: 'sense-darkvision',
  kind: 'darkvision',
  name: 'Visão no Escuro',
  originalName: 'Darkvision',
  description:
    'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
}

export type AncestryBoostModel = 'classic' | 'flexible' | 'versatile'

export function boostsForModel(
  model: AncestryBoostModel,
  specific: AttributeId[] = ['strength', 'wisdom'],
  flaw: AttributeId | null = 'charisma',
): Pick<Ancestry, 'attributeBoosts' | 'attributeFlaws'> {
  if (model === 'versatile') {
    return {
      attributeBoosts: [
        {
          id: 'boost-free-1',
          label: 'Boost livre',
          option: { kind: 'free', excludeAlreadyChosen: true },
        },
        {
          id: 'boost-free-2',
          label: 'Boost livre',
          option: { kind: 'free', excludeAlreadyChosen: true },
        },
      ],
      attributeFlaws: [],
    }
  }
  if (model === 'flexible') {
    const attr = specific[0] ?? 'strength'
    return {
      attributeBoosts: [
        {
          id: `boost-${attr}`,
          label: `Boost de ${attr}`,
          option: { kind: 'specific', attributes: [attr] },
        },
        {
          id: 'boost-free',
          label: 'Boost livre',
          option: { kind: 'free', excludeAlreadyChosen: true },
        },
      ],
      attributeFlaws: [],
    }
  }
  const a = specific[0] ?? 'strength'
  const b = specific[1] ?? 'wisdom'
  return {
    attributeBoosts: [
      {
        id: `boost-${a}`,
        label: `Boost de ${a}`,
        option: { kind: 'specific', attributes: [a] },
      },
      {
        id: `boost-${b}`,
        label: `Boost de ${b}`,
        option: { kind: 'specific', attributes: [b] },
      },
      {
        id: 'boost-free',
        label: 'Boost livre',
        option: { kind: 'free', excludeAlreadyChosen: true },
      },
    ],
    attributeFlaws: flaw ? [flaw] : [],
  }
}

export function detectBoostModel(ancestry: Ancestry): AncestryBoostModel {
  const specific = ancestry.attributeBoosts.filter(
    (r) => r.option.kind === 'specific',
  ).length
  const free = ancestry.attributeBoosts.filter(
    (r) => r.option.kind === 'free',
  ).length
  if (specific === 0 && free >= 2) return 'versatile'
  if (specific <= 1 && free >= 1 && ancestry.attributeFlaws.length === 0) {
    return 'flexible'
  }
  return 'classic'
}

export function emptyLore(): Ancestry['lore'] {
  return {
    summary: '',
    youMight: [],
    othersProbably: [],
    physicalDescription: '',
    society: '',
    beliefs: '',
    sampleNames: [],
  }
}

export function createEmptyHomebrewAncestry(): Ancestry {
  const now = nowIso()
  const { attributeBoosts, attributeFlaws } = boostsForModel('classic')
  return {
    id: createId('ancestry'),
    name: 'Nova Ancestralidade',
    originalName: 'New Ancestry',
    rarity: 'common',
    provenance: { type: 'homebrew' },
    hitPoints: 8,
    size: 'medium',
    speed: 25,
    attributeBoosts,
    attributeFlaws,
    languages: {
      automatic: ['Comum'],
      additionalOptions: [],
      additionalFromIntelligence: true,
    },
    senses: [],
    specialAbilities: [],
    traits: ['Humanoide'],
    lore: emptyLore(),
    heritageIds: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function createEmptyHomebrewHeritage(
  ancestryId: string | null,
): Heritage {
  const now = nowIso()
  const versatile = ancestryId == null
  return {
    id: createId('heritage'),
    ancestryId,
    isVersatile: versatile,
    name: versatile ? 'Nova Herança Versátil' : 'Nova Herança',
    originalName: versatile ? 'New Versatile Heritage' : 'New Heritage',
    description: '',
    rarity: 'common',
    provenance: { type: 'homebrew' },
    rulesSummary: '',
    specialAbilities: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function emptySpecialAbility(): SpecialAbilityDefinition {
  return {
    id: createId('ability'),
    name: '',
    actionType: 'passive',
    description: '',
  }
}

export const PLAYABLE_SIZES: CreatureSize[] = [
  'tiny',
  'small',
  'medium',
  'large',
]
