import type {
  AttributeId,
  CreatureSize,
  ProficiencyRank,
  SkillId,
} from '@/types'
import type {
  CompanionSpeeds,
  ConstructCompanionStage,
  ConstructCompanionState,
} from '@/types/companion'
import {
  CONSTRUCT_COMPANION_BASE_HP,
  CONSTRUCT_COMPANION_DEFAULT_SENSES,
  CONSTRUCT_COMPANION_IMMUNITIES,
  getConstructModification,
} from '@/data/seeds/constructCompanions'
import { calculateProficiencyBonus, maxProficiencyRank } from './proficiency'
import { SIZE_LABELS, SKILL_LABELS, formatCompanionSpeeds, formatSpeedMeters } from '@/utils/labels'
import type { ResolvedCompanionAttack } from './animalCompanion'

const INT_CHA_SKILLS: SkillId[] = [
  'arcana',
  'crafting',
  'occultism',
  'society',
  'deception',
  'diplomacy',
  'intimidation',
  'performance',
]

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

export interface ResolvedConstructSkill {
  id: SkillId
  label: string
  rank: ProficiencyRank
  modifier: number
}

export interface ResolvedConstructCompanionStats {
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
  skills: ResolvedConstructSkill[]
  attacks: ResolvedCompanionAttack[]
  unarmedRank: ProficiencyRank
  unarmoredRank: ProficiencyRank
  saveRank: ProficiencyRank
  perceptionRank: ProficiencyRank
  extraDamage: number
  immunities: string[]
  notes: string[]
}

function parseDie(die: string): { count: number; faces: number } {
  const m = /^(\d+)d(\d+)$/i.exec(die.trim())
  if (!m) return { count: 1, faces: 4 }
  return { count: Number(m[1]), faces: Number(m[2]) }
}

function diceCount(stage: ConstructCompanionStage): number {
  if (stage === 'paragon') return 3
  if (stage === 'advanced' || stage === 'incredible') return 2
  return 1
}

function extraDamageForStage(stage: ConstructCompanionStage): number {
  if (stage === 'paragon') return 4
  if (stage === 'incredible') return 2
  return 0
}

function formatDamage(
  baseDie: string,
  stage: ConstructCompanionStage,
  extraDamage: number,
  propulsiveBonus = 0,
): string {
  const { faces } = parseDie(baseDie)
  const dice = diceCount(stage)
  const extra = extraDamage + propulsiveBonus
  const extraLabel = extra > 0 ? `+${extra}` : extra < 0 ? `${extra}` : ''
  return `${dice}d${faces}${extraLabel}`
}

function formatSpeeds(speeds: CompanionSpeeds): string {
  return formatCompanionSpeeds(speeds)
}

function hasMod(state: ConstructCompanionState, id: string): boolean {
  return (
    state.initialModificationId === id ||
    state.breakthroughModificationId === id ||
    state.revolutionaryModificationId === id
  )
}

function applyStageAttributes(
  stage: ConstructCompanionStage,
  miracleGears: boolean,
): Record<AttributeId, number> {
  const attrs: Record<AttributeId, number> = {
    strength: 3,
    dexterity: 3,
    constitution: 2,
    intelligence: -4,
    wisdom: 1,
    charisma: 0,
  }
  if (stage === 'advanced' || stage === 'incredible' || stage === 'paragon') {
    attrs.strength += 1
    attrs.dexterity += 1
    attrs.constitution += 1
    attrs.wisdom += 1
  }
  if (stage === 'incredible' || stage === 'paragon') {
    attrs.strength += 2
    attrs.dexterity += 2
    attrs.constitution += 2
    attrs.wisdom += 2
  }
  if (stage === 'paragon') {
    attrs.strength += 1
    attrs.dexterity += 1
    attrs.constitution += 1
    attrs.wisdom += 1
  }
  if (miracleGears) attrs.intelligence += 2
  return attrs
}

function trioRank(
  stage: ConstructCompanionStage,
  wonder: boolean,
  marvelous: boolean,
  revolutionaryFeature: boolean,
): ProficiencyRank {
  let rank: ProficiencyRank = 'untrained'
  if (wonder || stage !== 'prototype') rank = 'trained'
  if (wonder && stage !== 'prototype') rank = 'expert'

  if (marvelous) {
    if (revolutionaryFeature) {
      rank = rank === 'expert' ? 'legendary' : 'master'
    } else {
      rank = rank === 'expert' ? 'master' : 'expert'
    }
  }
  return rank
}

function resolveSize(state: ConstructCompanionState): CreatureSize {
  if (
    state.size === 'small' ||
    state.size === 'medium' ||
    state.size === 'large'
  ) {
    return state.size
  }
  if (hasMod(state, 'construct-mod-increased-size')) return 'large'
  return 'medium'
}

export function nextConstructCompanionStages(
  stage: ConstructCompanionStage,
): ConstructCompanionStage[] {
  switch (stage) {
    case 'prototype':
      return ['advanced']
    case 'advanced':
      return ['incredible']
    case 'incredible':
      return ['paragon']
    case 'paragon':
      return []
  }
}

export function resolveConstructCompanionStats(
  state: ConstructCompanionState,
  masterLevel: number,
): ResolvedConstructCompanionStats {
  const level = Math.max(1, masterLevel)
  const stage = state.stage
  const wonder = hasMod(state, 'construct-mod-wonder-gears')
  const marvelous = hasMod(state, 'construct-mod-marvelous-gears')
  const miracle = hasMod(state, 'construct-mod-miracle-gears')
  const revolutionaryFeature = Boolean(state.revolutionaryModificationId)
  const attrs = applyStageAttributes(stage, miracle)

  let unarmedRank: ProficiencyRank = 'trained'
  let unarmoredRank: ProficiencyRank = 'trained'
  let saveRank: ProficiencyRank = 'trained'
  let perceptionRank: ProficiencyRank = 'trained'
  let acrobaticsRank: ProficiencyRank = 'trained'
  let athleticsRank: ProficiencyRank = 'trained'

  if (stage !== 'prototype') {
    perceptionRank = maxProficiencyRank(perceptionRank, 'expert')
    saveRank = maxProficiencyRank(saveRank, 'expert')
  }
  if (stage === 'incredible' || stage === 'paragon') {
    acrobaticsRank = maxProficiencyRank(acrobaticsRank, 'expert')
    athleticsRank = maxProficiencyRank(athleticsRank, 'expert')
  }
  if (stage === 'paragon') {
    unarmedRank = maxProficiencyRank(unarmedRank, 'expert')
    unarmoredRank = maxProficiencyRank(unarmoredRank, 'expert')
    saveRank = maxProficiencyRank(saveRank, 'master')
    perceptionRank = maxProficiencyRank(perceptionRank, 'master')
    acrobaticsRank = maxProficiencyRank(acrobaticsRank, 'master')
    athleticsRank = maxProficiencyRank(athleticsRank, 'master')
  }

  const extraDamage = extraDamageForStage(stage)
  const magical = stage === 'incredible' || stage === 'paragon'

  let maxHp = CONSTRUCT_COMPANION_BASE_HP + (6 + attrs.constitution) * level
  if (hasMod(state, 'construct-mod-durable-construction')) {
    maxHp += level
  }

  const ac =
    10 + attrs.dexterity + calculateProficiencyBonus(unarmoredRank, level)
  const perception =
    attrs.wisdom + calculateProficiencyBonus(perceptionRank, level)
  const fortitude =
    attrs.constitution + calculateProficiencyBonus(saveRank, level)
  const reflex = attrs.dexterity + calculateProficiencyBonus(saveRank, level)
  const will = attrs.wisdom + calculateProficiencyBonus(saveRank, level)

  const speeds: CompanionSpeeds = {
    land: hasMod(state, 'construct-mod-accelerated-mobility') ? 40 : 25,
  }
  if (hasMod(state, 'construct-mod-amphibious-construction')) {
    speeds.swim = 25
  }
  if (hasMod(state, 'construct-mod-climbing-limbs')) {
    speeds.climb = Math.floor((speeds.land ?? 25) / 2)
  }
  if (hasMod(state, 'construct-mod-flight-chassis')) {
    speeds.fly = 25
  }

  const senses = [...CONSTRUCT_COMPANION_DEFAULT_SENSES]
  if (hasMod(state, 'construct-mod-sensory-array')) {
    senses.push(
      'visão na penumbra',
      'visão no escuro',
      'sentido sísmico impreciso 9 m',
    )
  }

  const unarmedProf = calculateProficiencyBonus(unarmedRank, level)
  const attacks: ResolvedCompanionAttack[] = [
    {
      id: 'construct-strike',
      name: 'Golpe',
      traits: magical ? ['mágico'] : [],
      attackModifier: attrs.strength + unarmedProf,
      damageLabel: formatDamage('1d8', stage, extraDamage),
      damageType: 'contundente',
      magical,
    },
    {
      id: 'construct-agile',
      name: 'Golpe ágil',
      traits: ['ágil', 'finesse', ...(magical ? ['mágico'] : [])],
      attackModifier:
        Math.max(attrs.strength, attrs.dexterity) + unarmedProf,
      damageLabel: formatDamage('1d6', stage, extraDamage),
      damageType: state.agileDamageType,
      magical,
    },
  ]

  if (hasMod(state, 'construct-mod-projectile-launcher')) {
    const turret =
      hasMod(state, 'construct-mod-turret-configuration') &&
      Boolean(state.turretMode)
    const die = turret ? '1d6' : '1d4'
    const range = turret ? 60 : 30
    const propulsive =
      attrs.strength > 0 ? Math.floor(attrs.strength / 2) : 0
    attacks.push({
      id: 'construct-projectile',
      name: 'Lançador',
      traits: [
        'propulsivo',
        `incremento ${formatSpeedMeters(range)}`,
        ...(magical ? ['mágico'] : []),
      ],
      attackModifier: attrs.dexterity + unarmedProf,
      damageLabel: formatDamage(die, stage, extraDamage, propulsive),
      damageType: state.projectileDamageType ?? 'perfurante',
      magical,
    })
  }

  const skillRanks = new Map<SkillId, ProficiencyRank>()
  skillRanks.set('acrobatics', acrobaticsRank)
  skillRanks.set('athletics', athleticsRank)

  const trio = trioRank(stage, wonder, marvelous, revolutionaryFeature)
  if (trio !== 'untrained') {
    skillRanks.set('intimidation', trio)
    skillRanks.set('stealth', trio)
    skillRanks.set('survival', trio)
  }

  if (miracle) {
    const picks = state.miracleGearsSkillIds ?? []
    for (const id of picks) {
      if (INT_CHA_SKILLS.includes(id)) {
        skillRanks.set(id, 'legendary')
      }
    }
  }

  const skills: ResolvedConstructSkill[] = [...skillRanks.entries()]
    .map(([id, rank]) => ({
      id,
      label: SKILL_LABELS[id],
      rank,
      modifier: attrs[SKILL_ATTR[id]] + calculateProficiencyBonus(rank, level),
    }))
    .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))

  const notes: string[] = [
    'Não é criatura viva nem morta-viva (traço construto).',
    'A 0 PV fica quebrado e começa a faiscar — Estabilizar com Primeiros Socorros usa Ofício, não Medicina. Destruído se quebrar mais de duas vezes em 10 minutos.',
    'Recuperar PV: Reparar (ou efeitos que curam objetos / não vivos). Não come nem respira.',
    'Únicos bônus de item permitidos: Velocidade.',
  ]
  if (magical) {
    notes.push(
      'Ataques desarmados contam como mágicos para ignorar resistências.',
    )
  }
  if (hasMod(state, 'construct-mod-manual-dexterity')) {
    notes.push(
      'Destreza Manual: ações de manipular com até dois membros (sem armas/itens sem traço companion).',
    )
  }
  if (hasMod(state, 'construct-mod-antimagic-construction')) {
    notes.push('+2 de circunstância em salvaguardas e CA contra magias.')
  }
  if (hasMod(state, 'construct-mod-resistant-coating')) {
    notes.push('Resistência 5 a todo dano (exceto adamantina).')
  }
  if (hasMod(state, 'construct-mod-advanced-weaponry')) {
    notes.push(
      'Armamento Avançado: anote na mesa qual ataque ganhou a modificação inicial de arma.',
    )
  }
  if (hasMod(state, 'construct-mod-runic-keystone')) {
    notes.push('Pedra-chave Rúnica: pode guardar uma runa de propriedade.')
  }
  if (hasMod(state, 'construct-mod-wall-configuration')) {
    notes.push(
      'Configuração de Muralha: 2 ações para virar muralha (desprevenido, −2 de status na CA).',
    )
  }
  if (hasMod(state, 'construct-mod-turret-configuration') && state.turretMode) {
    notes.push('Forma de torre: imobilizado.')
  }
  if (miracle) {
    notes.push(
      'Engrenagens Milagre: pode usar ações que exigem mais Inteligência (Coagir, Decifrar Escrita) e aprende um idioma que você conhece.',
    )
  }

  const size = resolveSize(state)

  return {
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
    senses,
    skills,
    attacks,
    unarmedRank,
    unarmoredRank,
    saveRank,
    perceptionRank,
    extraDamage,
    immunities: CONSTRUCT_COMPANION_IMMUNITIES,
    notes,
  }
}

export { INT_CHA_SKILLS as CONSTRUCT_MIRACLE_GEARS_SKILLS }
export { getConstructModification }
