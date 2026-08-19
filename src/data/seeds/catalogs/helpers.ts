import type { ClassCatalogOption, ClassCatalogSection } from '@/types/class'
import type { SpecialAbilityDefinition } from '@/types/ancestry'
import type { SkillId } from '@/types/core'

export function catalogOption(
  opts: {
    id: string
    name: string
    originalName: string
    category?: string
    level?: number
    usage?: string
    description: string
    rulesSummary: string
    sections?: ClassCatalogSection[]
    actionType?: SpecialAbilityDefinition['actionType']
    traits?: string[]
    subclassIds?: string[]
    prerequisiteOptionIds?: string[]
    skillId?: SkillId
    loreNames?: string[]
    loreExpertAtLevel?: number
    loreMasterAtLevel?: number
    sourcePage?: number
  },
): ClassCatalogOption {
  return {
    rarity: 'common',
    ...opts,
  }
}

export function section(
  label: string,
  body: string,
  actionType?: SpecialAbilityDefinition['actionType'],
): ClassCatalogSection {
  return { label, body, actionType }
}
