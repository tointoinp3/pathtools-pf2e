import type {
  AttributeId,
  Character,
  CharacterClass,
  FeatSlot,
  LevelAttributeBoostLevel,
  ProficiencyRank,
  SkillId,
  SkillIncreaseEntry,
} from '@/types'
import { ATTRIBUTE_IDS } from '@/types'
import { getFeatSlots } from './feats'
import { getGradualBoostLevels } from './variantRules'
import {
  canIncreaseSkillRank,
  nextProficiencyRank,
} from './proficiency'

export const ATTRIBUTE_BOOST_LEVELS: LevelAttributeBoostLevel[] = [
  5, 10, 15, 20,
]

export const BOOSTS_PER_LEVEL = 4

const SKILL_INCREASE_FEATURE = 'aumento de perícia'

export function getAttributeBoostLevels(): LevelAttributeBoostLevel[] {
  return ATTRIBUTE_BOOST_LEVELS
}

/** Níveis com “Aumento de perícia” na tabela da classe */
export function getSkillIncreaseLevels(
  characterClass?: CharacterClass | null,
): number[] {
  if (!characterClass) return []
  const levels: number[] = []
  for (const row of characterClass.levelTable) {
    const count = row.features.filter((f) =>
      f.toLowerCase().includes(SKILL_INCREASE_FEATURE),
    ).length
    for (let i = 0; i < count; i += 1) {
      levels.push(row.level)
    }
  }
  return levels
}

export function isAttributeBoostLevel(
  level: number,
): level is LevelAttributeBoostLevel {
  return (ATTRIBUTE_BOOST_LEVELS as number[]).includes(level)
}

/** Features da tabela que não são escolha interativa nesta UI */
export function getAutomaticFeaturesForLevel(
  characterClass: CharacterClass | null | undefined,
  level: number,
): string[] {
  const row = characterClass?.levelTable.find((r) => r.level === level)
  if (!row) return []
  return row.features.filter((f) => {
    const lower = f.toLowerCase()
    if (lower.includes(SKILL_INCREASE_FEATURE)) return false
    if (lower.includes('boosts de atributo')) return false
    if (lower.includes('aumentos de atributo')) return false
    if (lower.startsWith('feito ')) return false
    if (lower.includes('feito de')) return false
    if (lower === 'ancestralidade e origem') return false
    return true
  })
}

export type ProgressionChoiceStatus = 'complete' | 'pending' | 'locked'

export interface LevelProgressionView {
  level: number
  /** Acima do nível atual do personagem */
  locked: boolean
  automaticFeatures: string[]
  featSlots: FeatSlot[]
  hasAttributeBoosts: boolean
  attributeBoosts: AttributeId[]
  attributeBoostComplete: boolean
  hasSkillIncrease: boolean
  skillIncrease?: SkillIncreaseEntry
  skillIncreaseComplete: boolean
  pendingCount: number
  status: ProgressionChoiceStatus
}

export function buildLevelProgression(
  character: Pick<
    Character,
    | 'level'
    | 'ancestryId'
    | 'classId'
    | 'classChoices'
    | 'featSelections'
    | 'levelAttributeBoosts'
    | 'gradualAttributeBoosts'
    | 'skillIncreases'
    | 'mythicCallingId'
  >,
  characterClass?: CharacterClass | null,
  options?: {
    freeArchetype?: boolean
    mythicRules?: boolean
    mythicCallingId?: string | null
    ancestryParagon?: boolean
    secondClass?: CharacterClass | null
    gradualAbilityBoosts?: boolean
  },
): LevelProgressionView[] {
  const charLevel = Math.max(1, Math.min(20, character.level))
  /** Slots de 1–20 para preview de níveis futuros (escolha só se !locked) */
  const allFeatSlots = getFeatSlots(
    { ...character, level: 20 },
    characterClass,
    {
      freeArchetype: options?.freeArchetype,
      mythicRules: options?.mythicRules,
      mythicCallingId: options?.mythicCallingId ?? character.mythicCallingId,
      ancestryParagon: options?.ancestryParagon,
      secondClass: options?.secondClass,
    },
  )
  const selectionBySlot = new Map(
    (character.featSelections ?? []).map((s) => [s.slotId, s.featId]),
  )
  const skillLevels = [
    ...getSkillIncreaseLevels(characterClass),
    ...getSkillIncreaseLevels(options?.secondClass),
  ]
  const skillByLevel = new Map(
    (character.skillIncreases ?? []).map((s) => [s.level, s]),
  )
  const gradualLevels = options?.gradualAbilityBoosts
    ? new Set(getGradualBoostLevels())
    : null

  const views: LevelProgressionView[] = []

  for (let level = 1; level <= 20; level += 1) {
    const locked = level > charLevel
    const featSlots = allFeatSlots.filter((s) => s.gainedAtLevel === level)
    const hasAttributeBoosts = gradualLevels
      ? gradualLevels.has(level)
      : isAttributeBoostLevel(level)
    const attributeBoosts = hasAttributeBoosts
      ? gradualLevels
        ? character.gradualAttributeBoosts?.[level]
          ? [character.gradualAttributeBoosts[level] as AttributeId]
          : []
        : (character.levelAttributeBoosts?.[level as LevelAttributeBoostLevel] ??
          [])
      : []
    const neededBoosts = gradualLevels ? 1 : BOOSTS_PER_LEVEL
    const attributeBoostComplete =
      !hasAttributeBoosts ||
      (attributeBoosts.length === neededBoosts &&
        new Set(attributeBoosts).size === neededBoosts)

    const skillSlotsAtLevel = skillLevels.filter((L) => L === level).length
    const hasSkillIncrease = skillSlotsAtLevel > 0
    const skillIncrease = hasSkillIncrease
      ? skillByLevel.get(level)
      : undefined
    const skillIncreaseComplete = !hasSkillIncrease || Boolean(skillIncrease)

    let pendingCount = 0
    if (!locked) {
      for (const slot of featSlots) {
        if (!selectionBySlot.has(slot.id)) pendingCount += 1
      }
      if (hasAttributeBoosts && !attributeBoostComplete) pendingCount += 1
      if (hasSkillIncrease && !skillIncreaseComplete) pendingCount += 1
    }

    const status: ProgressionChoiceStatus = locked
      ? 'locked'
      : pendingCount > 0
        ? 'pending'
        : 'complete'

    views.push({
      level,
      locked,
      automaticFeatures: getAutomaticFeaturesForLevel(characterClass, level),
      featSlots,
      hasAttributeBoosts,
      attributeBoosts,
      attributeBoostComplete,
      hasSkillIncrease,
      skillIncrease,
      skillIncreaseComplete,
      pendingCount,
      status,
    })
  }

  return views
}

export function countPendingProgressionChoices(
  character: Parameters<typeof buildLevelProgression>[0],
  characterClass?: CharacterClass | null,
  options?: {
    freeArchetype?: boolean
    mythicRules?: boolean
    ancestryParagon?: boolean
    secondClass?: CharacterClass | null
    gradualAbilityBoosts?: boolean
  },
): number {
  return buildLevelProgression(character, characterClass, options)
    .filter((v) => !v.locked)
    .reduce((sum, v) => sum + v.pendingCount, 0)
}

export function validateAttributeBoostSet(
  boosts: AttributeId[] | undefined,
): { ok: boolean; message?: string } {
  const list = boosts ?? []
  if (list.length !== BOOSTS_PER_LEVEL) {
    return {
      ok: false,
      message: `Escolha ${BOOSTS_PER_LEVEL} atributos diferentes.`,
    }
  }
  if (new Set(list).size !== BOOSTS_PER_LEVEL) {
    return { ok: false, message: 'Os 4 boosts devem ser em atributos diferentes.' }
  }
  for (const id of list) {
    if (!ATTRIBUTE_IDS.includes(id)) {
      return { ok: false, message: `Atributo inválido: ${id}` }
    }
  }
  return { ok: true }
}

export function toggleAttributeInBoostSet(
  current: AttributeId[],
  attributeId: AttributeId,
): AttributeId[] {
  if (current.includes(attributeId)) {
    return current.filter((a) => a !== attributeId)
  }
  if (current.length >= BOOSTS_PER_LEVEL) return current
  return [...current, attributeId]
}

/**
 * Aplica aumentos de perícia em ordem de nível sobre um mapa base de ranks.
 */
export function applySkillIncreases(
  baseRanks: Partial<Record<SkillId, ProficiencyRank>>,
  increases: SkillIncreaseEntry[] | null | undefined,
  characterLevel: number,
): Partial<Record<SkillId, ProficiencyRank>> {
  const ranks: Partial<Record<SkillId, ProficiencyRank>> = { ...baseRanks }
  const ordered = [...(increases ?? [])]
    .filter((inc) => inc.level <= characterLevel)
    .sort((a, b) => a.level - b.level || a.skillId.localeCompare(b.skillId))

  for (const inc of ordered) {
    const from = ranks[inc.skillId] ?? 'untrained'
    if (!canIncreaseSkillRank(from, inc.level)) continue
    const next = nextProficiencyRank(from)
    if (next) ranks[inc.skillId] = next
  }

  return ranks
}

/** Contribuições de boosts de nível para um atributo */
export function getLevelBoostContributions(
  character: Pick<Character, 'level' | 'levelAttributeBoosts'>,
  attributeId: AttributeId,
): Array<{ level: LevelAttributeBoostLevel; value: number }> {
  const out: Array<{ level: LevelAttributeBoostLevel; value: number }> = []
  const boosts = character.levelAttributeBoosts ?? {}
  for (const level of ATTRIBUTE_BOOST_LEVELS) {
    if (character.level < level) continue
    const set = boosts[level] ?? []
    const count = set.filter((a) => a === attributeId).length
    if (count > 0) out.push({ level, value: count })
  }
  return out
}

export function pruneLevelAttributeBoosts(
  boosts: Character['levelAttributeBoosts'] | undefined,
  level: number,
): Character['levelAttributeBoosts'] {
  const next: NonNullable<Character['levelAttributeBoosts']> = {
    ...(boosts ?? {}),
  }
  for (const L of ATTRIBUTE_BOOST_LEVELS) {
    if (L > level) delete next[L]
  }
  return next
}

/** Níveis 5/10/15/20 já ganhos cuja escolha de 4 boosts ainda não está completa. */
export function incompleteAttributeBoostLevels(
  character: Pick<Character, 'level' | 'levelAttributeBoosts'>,
): LevelAttributeBoostLevel[] {
  return ATTRIBUTE_BOOST_LEVELS.filter((level) => {
    if (character.level < level) return false
    return !validateAttributeBoostSet(character.levelAttributeBoosts?.[level]).ok
  })
}

/** Níveis já ganhos com “Aumento de perícia” ainda sem perícia escolhida. */
export function incompleteSkillIncreaseLevels(
  character: Pick<Character, 'level' | 'skillIncreases'>,
  characterClass?: CharacterClass | null,
): number[] {
  const earned = [
    ...new Set(
      getSkillIncreaseLevels(characterClass).filter(
        (level) => level <= character.level,
      ),
    ),
  ].sort((a, b) => a - b)
  const filled = new Set(
    (character.skillIncreases ?? [])
      .filter((entry) => Boolean(entry.skillId))
      .map((entry) => entry.level),
  )
  return earned.filter((level) => !filled.has(level))
}

export function pruneSkillIncreases(
  increases: SkillIncreaseEntry[] | null | undefined,
  level: number,
  characterClass?: CharacterClass | null,
): SkillIncreaseEntry[] {
  const allowed = new Set(
    getSkillIncreaseLevels(characterClass).filter((L) => L <= level),
  )
  const seen = new Set<number>()
  const kept: SkillIncreaseEntry[] = []
  for (const inc of increases ?? []) {
    if (!allowed.has(inc.level)) continue
    if (seen.has(inc.level)) continue
    seen.add(inc.level)
    kept.push(inc)
  }
  return kept
}

/**
 * Rank “antes” dos aumentos de um nível específico (para preview na UI).
 */
export function getSkillRankBeforeIncrease(
  baseRanks: Partial<Record<SkillId, ProficiencyRank>>,
  increases: SkillIncreaseEntry[] | null | undefined,
  skillId: SkillId,
  beforeLevel: number,
): ProficiencyRank {
  const prior = (increases ?? []).filter((i) => i.level < beforeLevel)
  const ranks = applySkillIncreases(baseRanks, prior, beforeLevel - 1)
  return ranks[skillId] ?? 'untrained'
}
