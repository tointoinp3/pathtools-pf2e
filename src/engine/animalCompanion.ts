import type {
  AttributeId,
  CreatureSize,
  ProficiencyRank,
  SkillId,
} from '@/types'
import type {
  AnimalCompanionSpecialization,
  AnimalCompanionStage,
  AnimalCompanionState,
  AnimalCompanionTypeDefinition,
  CompanionSpeeds,
} from '@/types/companion'
import { getAnimalCompanionType } from './companionCatalog'
import { shiftCreatureSize } from './connections'
import { formatCompanionSpeeds } from '@/utils/labels'
import { calculateProficiencyBonus } from './proficiency'
import { SIZE_LABELS, SKILL_LABELS } from '@/utils/labels'

export interface ResolvedCompanionAttack {
  id: string
  name: string
  traits: string[]
  attackModifier: number
  damageLabel: string
  damageType: string
  magical: boolean
}

export interface ResolvedAnimalCompanionStats {
  type: AnimalCompanionTypeDefinition
  size: CreatureSize
  sizeLabel: string
  attributes: Record<AttributeId, number>
  maxHp: number
  ac: number
  perception: number
  fortitude: number
  reflex: number
  will: number
  speeds: CompanionSpeeds
  speedLabel: string
  senses: string[]
  skillId: SkillId | null
  skillLabel: string | null
  skillModifier: number | null
  attacks: ResolvedCompanionAttack[]
  supportBenefit: string
  advancedManeuver: AnimalCompanionTypeDefinition['advancedManeuver'] | null
  unarmedRank: ProficiencyRank
  saveRank: ProficiencyRank
  perceptionRank: ProficiencyRank
  extraDamage: number
  notes: string[]
}

function bumpRank(
  current: ProficiencyRank,
  to: ProficiencyRank,
): ProficiencyRank {
  const order: ProficiencyRank[] = [
    'untrained',
    'trained',
    'expert',
    'master',
    'legendary',
  ]
  return order.indexOf(to) > order.indexOf(current) ? to : current
}

function parseDie(die: string): { count: number; faces: number } {
  const m = /^(\d+)d(\d+)$/i.exec(die.trim())
  if (!m) return { count: 1, faces: 4 }
  return { count: Number(m[1]), faces: Number(m[2]) }
}

function formatDamage(
  baseDie: string,
  stage: AnimalCompanionStage,
  extraDamage: number,
): string {
  const { count, faces } = parseDie(baseDie)
  let dice = count
  if (stage === 'mature' || stage === 'nimble' || stage === 'savage') {
    dice = Math.max(dice, 2)
  }
  if (stage === 'specialized') {
    dice = Math.max(dice, 3)
  }
  const extra = extraDamage > 0 ? `+${extraDamage}` : ''
  return `${dice}d${faces}${extra}`
}

const NIMBLEISH: AnimalCompanionSpecialization[] = [
  'ambusher',
  'daredevil',
  'racer',
]

function applyAttributeAdvances(
  base: Record<AttributeId, number>,
  stage: AnimalCompanionStage,
  specialization: AnimalCompanionSpecialization | null | undefined,
): Record<AttributeId, number> {
  const attrs = { ...base }

  if (stage === 'young') return attrs

  attrs.strength += 1
  attrs.dexterity += 1
  attrs.constitution += 1
  attrs.wisdom += 1

  if (stage === 'mature') return attrs

  if (stage === 'nimble') {
    attrs.dexterity += 2
    attrs.strength += 1
    attrs.constitution += 1
    attrs.wisdom += 1
    return attrs
  }

  if (stage === 'savage') {
    attrs.strength += 2
    attrs.dexterity += 1
    attrs.constitution += 1
    attrs.wisdom += 1
    return attrs
  }

  const path: 'nimble' | 'savage' =
    specialization && NIMBLEISH.includes(specialization) ? 'nimble' : 'savage'

  if (path === 'nimble') {
    attrs.dexterity += 2
    attrs.strength += 1
    attrs.constitution += 1
    attrs.wisdom += 1
  } else {
    attrs.strength += 2
    attrs.dexterity += 1
    attrs.constitution += 1
    attrs.wisdom += 1
  }

  attrs.dexterity += 1
  attrs.intelligence += 2

  switch (specialization) {
    case 'ambusher':
      attrs.dexterity += 1
      break
    case 'bully':
      attrs.strength += 1
      attrs.charisma += 3
      break
    case 'daredevil':
      attrs.dexterity += 1
      break
    case 'racer':
      attrs.constitution += 1
      break
    case 'tracker':
      attrs.wisdom += 1
      break
    case 'wrecker':
      attrs.strength += 1
      break
    default:
      break
  }

  return attrs
}

function resolveSizeWithSpec(
  base: CreatureSize,
  stage: AnimalCompanionStage,
  specialization: AnimalCompanionSpecialization | null | undefined,
): CreatureSize {
  let size = base
  if (stage === 'young') return size

  if (size === 'tiny' || size === 'small' || size === 'medium') {
    size = shiftCreatureSize(size, 1)
  }

  if (stage === 'nimble') return size

  if (stage === 'savage') {
    if (size === 'tiny' || size === 'small' || size === 'medium') {
      size = shiftCreatureSize(size, 1)
    }
    return size
  }

  const fromNimble = specialization
    ? NIMBLEISH.includes(specialization)
    : false
  if (!fromNimble) {
    if (size === 'tiny' || size === 'small' || size === 'medium') {
      size = shiftCreatureSize(size, 1)
    }
  }
  return size
}

function extraDamageForStage(
  stage: AnimalCompanionStage,
  specialization: AnimalCompanionSpecialization | null | undefined,
): number {
  if (stage === 'nimble') return 2
  if (stage === 'savage') return 3
  if (stage === 'specialized') {
    const fromNimble = specialization
      ? NIMBLEISH.includes(specialization)
      : false
    return fromNimble ? 4 : 6
  }
  return 0
}

function formatSpeeds(speeds: CompanionSpeeds): string {
  return formatCompanionSpeeds(speeds)
}

/** Resolve stats a partir do tipo + estágio + nível do mestre. */
export function resolveAnimalCompanionStats(
  state: AnimalCompanionState,
  masterLevel: number,
): ResolvedAnimalCompanionStats | null {
  const type = getAnimalCompanionType(state.typeId)
  if (!type) return null

  const level = Math.max(1, masterLevel)
  const stage = state.stage
  const attrs = applyAttributeAdvances(
    type.attributes,
    stage,
    state.specialization,
  )
  const size = resolveSizeWithSpec(type.size, stage, state.specialization)
  const extraDamage = extraDamageForStage(stage, state.specialization)

  let unarmedRank: ProficiencyRank = 'trained'
  let saveRank: ProficiencyRank = 'trained'
  let perceptionRank: ProficiencyRank = 'trained'
  let acrobaticsRank: ProficiencyRank = 'trained'
  let athleticsRank: ProficiencyRank = 'trained'
  let typeSkillRank: ProficiencyRank = 'trained'

  if (stage !== 'young') {
    perceptionRank = bumpRank(perceptionRank, 'expert')
    saveRank = bumpRank(saveRank, 'expert')
    if (
      type.skill === 'intimidation' ||
      type.skill === 'stealth' ||
      type.skill === 'survival'
    ) {
      typeSkillRank = bumpRank(typeSkillRank, 'expert')
    }
  }

  if (stage === 'nimble') {
    acrobaticsRank = bumpRank(acrobaticsRank, 'expert')
  }
  if (stage === 'savage') {
    athleticsRank = bumpRank(athleticsRank, 'expert')
  }

  if (stage === 'specialized') {
    unarmedRank = bumpRank(unarmedRank, 'expert')
    saveRank = bumpRank(saveRank, 'master')
    perceptionRank = bumpRank(perceptionRank, 'master')
    const fromNimble = state.specialization
      ? NIMBLEISH.includes(state.specialization)
      : false
    if (fromNimble) acrobaticsRank = bumpRank(acrobaticsRank, 'expert')
    else athleticsRank = bumpRank(athleticsRank, 'expert')

    switch (state.specialization) {
      case 'ambusher':
        if (type.skill === 'stealth') {
          typeSkillRank = bumpRank(typeSkillRank, 'master')
        }
        break
      case 'bully':
        athleticsRank = bumpRank(athleticsRank, 'expert')
        break
      case 'daredevil':
        acrobaticsRank = bumpRank(acrobaticsRank, 'master')
        break
      case 'racer':
        saveRank = bumpRank(saveRank, 'legendary')
        break
      case 'tracker':
        if (type.skill === 'survival') {
          typeSkillRank = bumpRank(typeSkillRank, 'master')
        }
        break
      case 'wrecker':
        athleticsRank = bumpRank(athleticsRank, 'master')
        break
      default:
        break
    }
  }

  const unarmedProf = calculateProficiencyBonus(unarmedRank, level)
  const saveProf = calculateProficiencyBonus(saveRank, level)
  const percProf = calculateProficiencyBonus(perceptionRank, level)

  const maxHp = type.ancestryHitPoints + (6 + attrs.constitution) * level

  let unarmoredRank: ProficiencyRank = 'trained'
  if (
    stage === 'specialized' &&
    (state.specialization === 'ambusher' ||
      state.specialization === 'daredevil')
  ) {
    unarmoredRank = 'expert'
  }
  const ac =
    10 + attrs.dexterity + calculateProficiencyBonus(unarmoredRank, level)

  const perception = attrs.wisdom + percProf
  const fortitude = attrs.constitution + saveProf
  const reflex = attrs.dexterity + saveProf
  const will = attrs.wisdom + saveProf

  const skillId = type.skill ?? null
  const skillRank = !skillId
    ? null
    : skillId === 'acrobatics'
      ? acrobaticsRank
      : skillId === 'athletics'
        ? athleticsRank
        : typeSkillRank
  const skillAttr: AttributeId =
    skillId === 'acrobatics' ||
    skillId === 'stealth' ||
    skillId === 'thievery'
      ? 'dexterity'
      : skillId === 'athletics'
        ? 'strength'
        : skillId === 'intimidation' ||
            skillId === 'deception' ||
            skillId === 'diplomacy' ||
            skillId === 'performance'
          ? 'charisma'
          : skillId === 'arcana' ||
              skillId === 'crafting' ||
              skillId === 'occultism' ||
              skillId === 'society'
            ? 'intelligence'
            : 'wisdom'

  const skillModifier =
    skillId && skillRank
      ? attrs[skillAttr] + calculateProficiencyBonus(skillRank, level)
      : null

  let speeds = { ...type.speeds }
  if (stage === 'specialized' && state.specialization === 'racer') {
    if (speeds.fly != null) speeds = { ...speeds, fly: speeds.fly + 10 }
    else if (speeds.land != null)
      speeds = { ...speeds, land: speeds.land + 10 }
  }

  const magical =
    stage === 'nimble' || stage === 'savage' || stage === 'specialized'

  const attacks: ResolvedCompanionAttack[] = type.attacks.map((atk) => {
    const attrMod = atk.finesse
      ? Math.max(attrs.strength, attrs.dexterity)
      : attrs.strength
    return {
      id: atk.id,
      name: atk.name,
      traits: [...atk.traits, ...(magical ? ['mágico'] : [])],
      attackModifier: attrMod + unarmedProf,
      damageLabel: formatDamage(atk.damageDie, stage, extraDamage),
      damageType: atk.damageType,
      magical,
    }
  })

  const notes: string[] = []
  if (magical) {
    notes.push(
      'Ataques desarmados contam como mágicos para ignorar resistências.',
    )
  }
  if (stage === 'nimble' || stage === 'savage' || stage === 'specialized') {
    notes.push('Manobra avançada disponível.')
  }

  return {
    type,
    size,
    sizeLabel: SIZE_LABELS[size],
    attributes: attrs,
    maxHp,
    ac,
    perception,
    fortitude,
    reflex,
    will,
    speeds,
    speedLabel: formatSpeeds(speeds),
    senses: type.senses,
    skillId,
    skillLabel: skillId ? SKILL_LABELS[skillId] : null,
    skillModifier,
    attacks,
    supportBenefit: type.supportBenefit,
    advancedManeuver:
      stage === 'nimble' || stage === 'savage' || stage === 'specialized'
        ? type.advancedManeuver
        : null,
    unarmedRank,
    saveRank,
    perceptionRank,
    extraDamage,
    notes,
  }
}
