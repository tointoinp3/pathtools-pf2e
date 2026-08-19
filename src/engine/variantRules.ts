import type {
  AttributeId,
  Character,
  CharacterClass,
  FeatSlot,
  LevelAttributeBoostLevel,
  ProficiencyRank,
  SkillId,
} from '@/types'
import { ATTRIBUTE_IDS } from '@/types'

/** Variantes de mesa (GM Core) ligadas nas Configurações. */
export interface TableVariantRules {
  freeArchetype?: boolean
  ignoreDedicationLock?: boolean
  mythicRules?: boolean
  ancestryParagon?: boolean
  dualClass?: boolean
  gradualAbilityBoosts?: boolean
  automaticBonusProgression?: boolean
  proficiencyWithoutLevel?: boolean
}

export const EMPTY_TABLE_VARIANTS: TableVariantRules = {}

/** Ancestralidade paragon: 2 feitos no 1º e mais um em cada ímpar (3–19). Total 11. */
export function getAncestryParagonFeatLevels(): number[] {
  const levels = [1, 1]
  for (let level = 3; level <= 19; level += 2) levels.push(level)
  return levels
}

/**
 * Aumentos graduais (GM Core): 4 conjuntos de 1 boost.
 * 2–5, 7–10, 12–15, 17–20. Não pode repetir atributo no mesmo conjunto.
 */
export const GRADUAL_BOOST_SETS: number[][] = [
  [2, 3, 4, 5],
  [7, 8, 9, 10],
  [12, 13, 14, 15],
  [17, 18, 19, 20],
]

export function gradualBoostSetIndex(level: number): number {
  return GRADUAL_BOOST_SETS.findIndex((set) => set.includes(level))
}

export function getGradualBoostLevels(): number[] {
  return GRADUAL_BOOST_SETS.flat()
}

export function attributesAlreadyBoostedInGradualSet(
  character: Pick<Character, 'gradualAttributeBoosts'>,
  level: number,
): AttributeId[] {
  const setIdx = gradualBoostSetIndex(level)
  if (setIdx < 0) return []
  const chosen = character.gradualAttributeBoosts ?? {}
  const used: AttributeId[] = []
  for (const L of GRADUAL_BOOST_SETS[setIdx] ?? []) {
    if (L === level) continue
    const attr = chosen[L]
    if (attr && ATTRIBUTE_IDS.includes(attr)) used.push(attr)
  }
  return used
}

export function incompleteGradualBoostLevels(
  character: Pick<Character, 'level' | 'gradualAttributeBoosts'>,
): number[] {
  const chosen = character.gradualAttributeBoosts ?? {}
  return getGradualBoostLevels().filter((level) => {
    if (character.level < level) return false
    const attr = chosen[level]
    return !attr || !ATTRIBUTE_IDS.includes(attr)
  })
}

export function pruneGradualAttributeBoosts(
  boosts: Character['gradualAttributeBoosts'] | undefined,
  level: number,
): Character['gradualAttributeBoosts'] {
  const next: NonNullable<Character['gradualAttributeBoosts']> = {
    ...(boosts ?? {}),
  }
  for (const L of getGradualBoostLevels()) {
    if (L > level) delete next[L]
  }
  return next
}

/** Proficiência sem nível: destreinado −2; treinado +2, perito +4, mestre +6, lendário +8. */
export function proficiencyBonusWithoutLevel(rank: ProficiencyRank): number {
  switch (rank) {
    case 'untrained':
      return -2
    case 'trained':
      return 2
    case 'expert':
      return 4
    case 'master':
      return 6
    case 'legendary':
      return 8
    default: {
      const _exhaustive: never = rank
      return _exhaustive
    }
  }
}

/** Progressão automática de bônus — GM Core pág. 83. */
export interface AutomaticBonusProgression {
  attackPotency: number
  devastatingDice: number
  defensePotency: number
  perceptionPotency: number
  savePotency: number
  skillPotencySlots: number
  apex: boolean
}

export function resolveAutomaticBonusProgression(
  level: number,
): AutomaticBonusProgression {
  const L = Math.max(1, Math.min(20, level))
  return {
    attackPotency: L >= 16 ? 3 : L >= 10 ? 2 : L >= 2 ? 1 : 0,
    devastatingDice: L >= 19 ? 3 : L >= 12 ? 2 : L >= 4 ? 1 : 0,
    defensePotency: L >= 18 ? 3 : L >= 11 ? 2 : L >= 5 ? 1 : 0,
    perceptionPotency: L >= 19 ? 3 : L >= 13 ? 2 : L >= 7 ? 1 : 0,
    savePotency: L >= 15 ? 3 : L >= 9 ? 2 : L >= 3 ? 1 : 0,
    skillPotencySlots: L >= 14 ? 4 : L >= 13 ? 3 : L >= 8 ? 2 : L >= 5 ? 1 : 0,
    apex: L >= 17,
  }
}

export function skillPotencyBonus(
  skillId: SkillId,
  picks: Character['abpSkillPotencies'] | undefined,
): number {
  const count = (picks ?? []).filter((id) => id === skillId).length
  return Math.min(3, count)
}

const STANDARD_ANCESTRY_FEAT_LEVELS = [1, 5, 9, 13, 17]

export function ancestryFeatLevelsFor(
  ancestryParagon?: boolean,
): number[] {
  return ancestryParagon
    ? getAncestryParagonFeatLevels()
    : [...STANDARD_ANCESTRY_FEAT_LEVELS]
}

export function dualClassFeatSlotPrefix(classIndex: 1 | 2): string {
  return classIndex === 1 ? 'class' : 'class2'
}

export function labelDualClassFeatSlot(
  className: string,
  level: number,
  classIndex: 1 | 2,
): string {
  if (classIndex === 1) return `Feito de ${className} · nv. ${level}`
  return `Feito de ${className} (2ª classe) · nv. ${level}`
}

export function isDualClassFeatSlot(slot: Pick<FeatSlot, 'id'>): boolean {
  return slot.id.startsWith('class2-')
}

/** Soma os PV por nível das duas classes (variante Classe dupla). */
export function dualClassHitPointsPerLevel(
  primary: CharacterClass | null | undefined,
  secondary: CharacterClass | null | undefined,
): number {
  return (primary?.hitPointsPerLevel ?? 0) + (secondary?.hitPointsPerLevel ?? 0)
}
