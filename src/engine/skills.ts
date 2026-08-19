import type { AttributeId, ModifierContribution, ProficiencyRank, SkillId } from '@/types'
import { SKILL_ATTRIBUTES } from '@/types'
import { ATTRIBUTE_LABELS, PROFICIENCY_LABELS } from '@/utils/labels'
import { calculateProficiencyBonus } from './proficiency'

export interface SkillModifierInput {
  skillId: SkillId | string
  attributeModifier: number
  attributeId: AttributeId
  rank: ProficiencyRank
  level: number
  extraContributions?: ModifierContribution[]
  skillLabel?: string
  withoutLevel?: boolean
}

export interface SkillModifierResult {
  total: number
  breakdown: Array<{ label: string; value: number }>
  contributions: ModifierContribution[]
}

export function calculateSkillModifier(input: SkillModifierInput): SkillModifierResult {
  const proficiency = calculateProficiencyBonus(input.rank, input.level, {
    withoutLevel: input.withoutLevel,
  })
  const attrLabel = ATTRIBUTE_LABELS[input.attributeId]

  const contributions: ModifierContribution[] = [
    {
      id: `attr-${input.attributeId}`,
      sourceType: 'attribute',
      sourceId: input.attributeId,
      sourceLabel: attrLabel,
      target: `skill.${input.skillId}`,
      value: input.attributeModifier,
      bonusType: 'attribute',
      label: attrLabel,
    },
    {
      id: `prof-${input.skillId}`,
      sourceType: 'proficiency',
      sourceId: input.rank,
      sourceLabel: PROFICIENCY_LABELS[input.rank],
      target: `skill.${input.skillId}`,
      value: proficiency,
      bonusType: 'proficiency',
      label: `${PROFICIENCY_LABELS[input.rank]}`,
      proficiencyRank: input.rank,
    },
    ...(input.extraContributions ?? []),
  ]

  const total = contributions.reduce((sum, c) => sum + c.value, 0)

  return {
    total,
    breakdown: contributions.map((c) => ({ label: c.label, value: c.value })),
    contributions,
  }
}

export function getSkillAttribute(skillId: SkillId): AttributeId {
  return SKILL_ATTRIBUTES[skillId]
}
