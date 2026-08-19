import type {
  AnimalCompanionTypeDefinition,
  CompanionCatalogKind,
  CompanionUnarmedAttack,
  EidolonAbility,
  EidolonTypeDefinition,
  FamiliarFormDefinition,
  HomebrewCompanionRecord,
  SpecificFamiliarDefinition,
} from '@/types/companion'
import { createId, nowIso } from '@/utils/id'

export const COMPANION_CREATE_QUERY: Record<CompanionCatalogKind, string> = {
  animal: 'animal',
  eidolon: 'eidolon',
  familiarForm: 'forma',
  specificFamiliar: 'especifico',
}

export function companionKindFromQuery(
  value: string | null,
): CompanionCatalogKind | null {
  if (!value) return null
  if (value === '1' || value === 'animal') return 'animal'
  if (value === 'eidolon') return 'eidolon'
  if (value === 'forma') return 'familiarForm'
  if (value === 'especifico') return 'specificFamiliar'
  return null
}

export const YOUNG_DAMAGE_DICE = ['1d4', '1d6', '1d8', '1d10'] as const

export const MANEUVER_ACTION_TYPES = [
  'one',
  'two',
  'three',
  'free',
  'reaction',
] as const

export const MANEUVER_ACTION_LABELS: Record<
  (typeof MANEUVER_ACTION_TYPES)[number],
  string
> = {
  one: '1 ação',
  two: '2 ações',
  three: '3 ações',
  free: 'Livre',
  reaction: 'Reação',
}

function emptyAbility(
  name: string,
  originalName: string,
  actionType: EidolonAbility['actionType'] = 'one',
): EidolonAbility {
  return {
    name,
    originalName,
    actionType,
    description: '',
  }
}

export function emptyCompanionAttack(
  prefix: string,
): CompanionUnarmedAttack {
  return {
    id: createId(prefix),
    name: 'Golpe',
    originalName: 'Strike',
    traits: [],
    damageDie: '1d8',
    damageType: 'contundente',
  }
}

export function createEmptyHomebrewCompanion(
  kind: CompanionCatalogKind,
): HomebrewCompanionRecord {
  const now = nowIso()
  const meta = {
    provenance: { type: 'homebrew' as const },
    source: 'Homebrew',
    createdAt: now,
    updatedAt: now,
  }

  if (kind === 'animal') {
    const id = createId('companion')
    const animal: AnimalCompanionTypeDefinition & typeof meta = {
      id,
      name: 'Novo Companheiro',
      originalName: 'New Companion',
      description: '',
      ...meta,
      size: 'small',
      traits: ['animal', 'minion'],
      attributes: {
        strength: 3,
        dexterity: 2,
        constitution: 2,
        intelligence: -4,
        wisdom: 1,
        charisma: 0,
      },
      ancestryHitPoints: 6,
      skill: 'survival',
      senses: ['visão na penumbra'],
      speeds: { land: 25 },
      attacks: [emptyCompanionAttack('atk')],
      supportBenefit: '',
      advancedManeuver: {
        name: 'Manobra',
        originalName: 'Maneuver',
        actionType: 'two',
        description: '',
      },
    }
    return { ...animal, catalogKind: 'animal' }
  }

  if (kind === 'eidolon') {
    const id = createId('eidolon')
    const eidolon: EidolonTypeDefinition & typeof meta = {
      id,
      name: 'Novo Eidolon',
      originalName: 'New Eidolon',
      description: '',
      ...meta,
      tradition: 'primal',
      sizeOptions: ['medium'],
      traits: ['eidolon'],
      homePlane: '',
      language: '',
      skills: ['athletics'],
      senses: ['visão na penumbra'],
      speeds: { land: 25 },
      suggestedAttacks: 'garra (cortante), mandíbulas (perfurante)',
      attributes: {
        constitution: 2,
        intelligence: -1,
        wisdom: 1,
        charisma: 0,
      },
      initialAbility: emptyAbility('Poder inicial', 'Initial Ability'),
      symbiosisAbility: emptyAbility('Simbiose', 'Symbiosis', 'one'),
      transcendenceAbility: emptyAbility(
        'Transcendência',
        'Transcendence',
        'free',
      ),
    }
    return { ...eidolon, catalogKind: 'eidolon' }
  }

  if (kind === 'familiarForm') {
    const id = createId('form')
    const form: FamiliarFormDefinition & typeof meta = {
      id,
      name: 'Nova Forma',
      originalName: 'New Form',
      description: '',
      ...meta,
      innateAbilityIds: [],
      traits: ['animal'],
    }
    return { ...form, catalogKind: 'familiarForm' }
  }

  const id = createId('specific')
  const specific: SpecificFamiliarDefinition & typeof meta = {
    id,
    name: 'Novo Familiar Específico',
    originalName: 'New Specific Familiar',
    description: '',
    ...meta,
    traits: [],
    rarity: 'common',
    requiredAbilities: 4,
    grantedAbilities: [],
    specialAbilities: [],
  }
  return { ...specific, catalogKind: 'specificFamiliar' }
}
