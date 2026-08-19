import type {
  AttributeId,
  CreatureSize,
  ProficiencyRank,
  SkillId,
  SpellTradition,
} from '@/types'
import type {
  CompanionSpeeds,
  EidolonKeyAttribute,
  EidolonPrimaryAttackId,
  EidolonState,
  EidolonTypeDefinition,
} from '@/types/companion'
import { getEidolonType } from './companionCatalog'
import { calculateProficiencyBonus } from './proficiency'
import { SIZE_LABELS, SKILL_LABELS, formatCompanionSpeeds } from '@/utils/labels'
import type { ResolvedCompanionAttack } from './animalCompanion'

const SKILL_ATTR: Record<SkillId, AttributeId> = {
  acrobatics: 'dexterity',
  arcana: 'intelligence',
  athletics: 'strength',
  crafting: 'intelligence',
  deception: 'charisma',
  diplomacy: 'charisma',
  intimidation: 'charisma',
  medicine: 'wisdom',
  nature: 'wisdom',
  occultism: 'intelligence',
  performance: 'charisma',
  religion: 'wisdom',
  society: 'intelligence',
  stealth: 'dexterity',
  survival: 'wisdom',
  thievery: 'dexterity',
}

export const EIDOLON_PRIMARY_ATTACKS: Record<
  EidolonPrimaryAttackId,
  { label: string; damageDie: `${number}d${number}`; traits: string[] }
> = {
  'd8-disarm': {
    label: '1d8 (desarmar)',
    damageDie: '1d8',
    traits: ['desarmar'],
  },
  'd8-nonlethal': {
    label: '1d8 (não letal)',
    damageDie: '1d8',
    traits: ['não letal'],
  },
  'd8-shove': {
    label: '1d8 (empurrar)',
    damageDie: '1d8',
    traits: ['empurrar'],
  },
  'd8-trip': {
    label: '1d8 (derrubar)',
    damageDie: '1d8',
    traits: ['derrubar'],
  },
  'd6-fatal': {
    label: '1d6 (fatal d10)',
    damageDie: '1d6',
    traits: ['fatal d10'],
  },
  'd6-forceful': {
    label: '1d6 (vigoroso, varredura)',
    damageDie: '1d6',
    traits: ['vigoroso', 'varredura'],
  },
  'd6-deadly': {
    label: '1d6 (mortal d8, finesse)',
    damageDie: '1d6',
    traits: ['mortal d8', 'finesse'],
  },
}

export interface ResolvedEidolonStats {
  type: EidolonTypeDefinition
  size: CreatureSize
  sizeLabel: string
  tradition: SpellTradition | null
  attributes: Record<AttributeId, number>
  ac: number
  acItemBonus: number
  dexCap: number
  perception: number
  fortitude: number
  reflex: number
  will: number
  speeds: CompanionSpeeds
  speedLabel: string
  senses: string[]
  skills: Array<{ id: SkillId; label: string; modifier: number }>
  attacks: ResolvedCompanionAttack[]
  unarmedRank: ProficiencyRank
  unarmoredRank: ProficiencyRank
  perceptionRank: ProficiencyRank
  fortRank: ProficiencyRank
  reflexRank: ProficiencyRank
  willRank: ProficiencyRank
  extraDamage: number
  notes: string[]
}

function bumpTo(level: number, thresholds: Array<[number, ProficiencyRank]>): ProficiencyRank {
  let rank: ProficiencyRank = 'trained'
  for (const [min, next] of thresholds) {
    if (level >= min) rank = next
  }
  return rank
}

function formatSpeeds(speeds: CompanionSpeeds): string {
  return formatCompanionSpeeds(speeds)
}

function extraDamage(level: number, unarmedRank: ProficiencyRank): number {
  if (level < 7) return 0
  const greater = level >= 15
  if (unarmedRank === 'legendary') return greater ? 8 : 4
  if (unarmedRank === 'master') return greater ? 6 : 3
  if (unarmedRank === 'expert') return greater ? 4 : 2
  return 0
}

function resolveAttributes(
  type: EidolonTypeDefinition,
  state: EidolonState,
): {
  attributes: Record<AttributeId, number>
  acItemBonus: number
  dexCap: number
} {
  if (type.namedArrays?.length) {
    const arr =
      type.namedArrays.find((a) => a.id === state.arrayId) ?? type.namedArrays[0]!
    return {
      attributes: { ...arr.attributes },
      acItemBonus: arr.acItemBonus,
      dexCap: arr.dexCap,
    }
  }

  const key: EidolonKeyAttribute = state.keyAttribute ?? 'strength'
  const strength = key === 'strength' ? 4 : 2
  const dexterity = key === 'dexterity' ? 4 : 2
  const rest = type.attributes ?? {
    constitution: 1,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  }
  return {
    attributes: {
      strength,
      dexterity,
      constitution: rest.constitution,
      intelligence: rest.intelligence,
      wisdom: rest.wisdom,
      charisma: rest.charisma,
    },
    acItemBonus: key === 'strength' ? 2 : 1,
    dexCap: key === 'strength' ? 3 : 4,
  }
}

function attackModifier(
  attrs: Record<AttributeId, number>,
  traits: string[],
  unarmedRank: ProficiencyRank,
  level: number,
): number {
  const finesse = traits.some((t) => /finesse/i.test(t))
  const attr = finesse
    ? Math.max(attrs.strength, attrs.dexterity)
    : attrs.strength
  return calculateProficiencyBonus(unarmedRank, level) + attr
}

function damageLabel(
  die: string,
  attrBonus: number,
  extra: number,
): string {
  const total = attrBonus + extra
  if (total > 0) return `${die}+${total}`
  if (total < 0) return `${die}${total}`
  return die
}

export function resolveEidolonStats(
  state: EidolonState,
  masterLevel: number,
  traditionOverride?: SpellTradition | null,
): ResolvedEidolonStats | null {
  const type = getEidolonType(state.typeId)
  if (!type) return null

  const level = Math.max(1, Math.min(20, masterLevel))
  const { attributes, acItemBonus, dexCap } = resolveAttributes(type, state)
  const size = type.sizeOptions.includes(state.size)
    ? state.size
    : type.sizeOptions[0]!

  const unarmedRank = bumpTo(level, [
    [1, 'trained'],
    [5, 'expert'],
    [13, 'master'],
  ])
  const unarmoredRank = bumpTo(level, [
    [1, 'trained'],
    [11, 'expert'],
    [19, 'master'],
  ])
  const perceptionRank = bumpTo(level, [
    [1, 'trained'],
    [3, 'expert'],
  ])
  const fortRank = bumpTo(level, [
    [1, 'expert'],
    [11, 'master'],
  ])
  const reflexRank = bumpTo(level, [
    [1, 'trained'],
    [9, 'expert'],
  ])
  const willRank = bumpTo(level, [
    [1, 'expert'],
    [15, 'master'],
  ])

  const dexForAc = Math.min(attributes.dexterity, dexCap)
  const ac =
    10 +
    dexForAc +
    calculateProficiencyBonus(unarmoredRank, level) +
    acItemBonus

  const extra = extraDamage(level, unarmedRank)
  const primary = EIDOLON_PRIMARY_ATTACKS[state.primaryAttack]
  const primaryFinesse = primary.traits.some((t) => /finesse/i.test(t))
  const primaryAttr = primaryFinesse
    ? Math.max(attributes.strength, attributes.dexterity)
    : attributes.strength

  const attacks: ResolvedCompanionAttack[] = [
    {
      id: 'eidolon-primary',
      name: state.primaryFormLabel || 'Golpe primário',
      traits: primary.traits,
      attackModifier: attackModifier(
        attributes,
        primary.traits,
        unarmedRank,
        level,
      ),
      damageLabel: damageLabel(primary.damageDie, primaryAttr, extra),
      damageType: 'conforme a forma',
      magical: true,
    },
    {
      id: 'eidolon-secondary',
      name: state.secondaryFormLabel || 'Golpe secundário',
      traits: ['ágil', 'finesse'],
      attackModifier: attackModifier(
        attributes,
        ['finesse'],
        unarmedRank,
        level,
      ),
      damageLabel: damageLabel(
        '1d6',
        Math.max(attributes.strength, attributes.dexterity),
        extra,
      ),
      damageType: 'conforme a forma',
      magical: true,
    },
  ]

  const tradition =
    type.tradition ?? traditionOverride ?? null
  const skillIds: SkillId[] = [...type.skills]
  if (tradition && type.traditionSkillByTradition?.[tradition]) {
    const extraSkill = type.traditionSkillByTradition[tradition]!
    if (!skillIds.includes(extraSkill)) skillIds.push(extraSkill)
  }

  const skills = skillIds.map((id) => {
    const attr = SKILL_ATTR[id]
    const mod =
      calculateProficiencyBonus('trained', level) + (attributes[attr] ?? 0)
    return { id, label: SKILL_LABELS[id], modifier: mod }
  })

  const notes: string[] = [
    'PV compartilhados com o invocador — dano e cura nos dois saem da mesma barra.',
    'Ações e PAM compartilhadas. Agir Juntos 1×/rodada.',
  ]
  if (level >= 7) {
    notes.push(`Simbiose: ${type.symbiosisAbility.name}.`)
  }
  if (level >= 17) {
    notes.push(`Transcendência: ${type.transcendenceAbility.name}.`)
  }

  return {
    type,
    size,
    sizeLabel: SIZE_LABELS[size],
    tradition,
    attributes,
    ac,
    acItemBonus,
    dexCap,
    perception:
      calculateProficiencyBonus(perceptionRank, level) + attributes.wisdom,
    fortitude:
      calculateProficiencyBonus(fortRank, level) + attributes.constitution,
    reflex: calculateProficiencyBonus(reflexRank, level) + attributes.dexterity,
    will: calculateProficiencyBonus(willRank, level) + attributes.wisdom,
    speeds: type.speeds,
    speedLabel: formatSpeeds(type.speeds),
    senses: type.senses,
    skills,
    attacks,
    unarmedRank,
    unarmoredRank,
    perceptionRank,
    fortRank,
    reflexRank,
    willRank,
    extraDamage: extra,
    notes,
  }
}
