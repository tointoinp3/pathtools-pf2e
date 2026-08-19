import type {
  AttributeId,
  Background,
  BackgroundChoices,
  Feat,
  FeatGrantRule,
  GrantedFeatPick,
  GrantedFeatPickOption,
  ModifierContribution,
  ProficiencyRank,
  SkillId,
} from '@/types'
import { ATTRIBUTE_IDS } from '@/types'
import { ATTRIBUTE_LABELS, PROFICIENCY_LABELS, SKILL_LABELS } from '@/utils/labels'
import { localizeFeatName } from '@/data/i18n/featNamesPt'
import { maxProficiencyRank, proficiencyRankValue } from './proficiency'
import { findFeatInCatalog } from './feats'

export interface BackgroundValidationIssue {
  field: string
  message: string
}

export interface ResolvedBackgroundBenefits {
  attributeContributions: ModifierContribution[]
  skillRanks: Partial<Record<SkillId, ProficiencyRank>>
  lores: Array<{
    id: string
    name: string
    rank: ProficiencyRank
    sourceLabel: string
  }>
  feats: Array<{
    id: string
    featId?: string
    featName: string
    originalName?: string
    featType?: string
    description?: string
    actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
    frequency?: string
    trigger?: string
    traits?: string[]
    sourceLabel: string
  }>
  issues: BackgroundValidationIssue[]
}

/** Valida escolhas de origem sem depender de IDs hardcoded */
export function validateBackgroundChoices(
  background: Background,
  choices: BackgroundChoices,
): BackgroundValidationIssue[] {
  const issues: BackgroundValidationIssue[] = []
  const chosenAttributes: AttributeId[] = []

  for (const rule of background.attributeBoosts) {
    const selected = choices.attributeBoosts[rule.id]
    if (!selected) {
      issues.push({
        field: `attributeBoosts.${rule.id}`,
        message: `Escolha um atributo para: ${rule.label}`,
      })
      continue
    }

    if (!ATTRIBUTE_IDS.includes(selected)) {
      issues.push({
        field: `attributeBoosts.${rule.id}`,
        message: 'Atributo inválido',
      })
      continue
    }

    if (rule.option.kind === 'specific') {
      if (!rule.option.attributes.includes(selected)) {
        issues.push({
          field: `attributeBoosts.${rule.id}`,
          message: `Atributo deve ser uma das opções: ${rule.option.attributes
            .map((a) => ATTRIBUTE_LABELS[a])
            .join(' ou ')}`,
        })
      }
    }

    if (rule.option.kind === 'free' && rule.option.excludeAlreadyChosen !== false) {
      if (chosenAttributes.includes(selected)) {
        issues.push({
          field: `attributeBoosts.${rule.id}`,
          message: `O mesmo atributo não pode receber dois boosts nesta etapa (${ATTRIBUTE_LABELS[selected]})`,
        })
      }
    }

    if (chosenAttributes.includes(selected) && rule.option.kind !== 'free') {
      // Também impede duplicata entre boosts específicos se o usuário tentar
      // (ex.: dois boosts restritos apontando ao mesmo atributo)
    }

    chosenAttributes.push(selected)
  }

  // Impede qualquer atributo duplicado entre boosts da mesma origem
  const unique = new Set(chosenAttributes)
  if (unique.size !== chosenAttributes.length) {
    const alreadyReported = issues.some((i) =>
      i.message.includes('não pode receber dois boosts'),
    )
    if (!alreadyReported) {
      issues.push({
        field: 'attributeBoosts',
        message: 'Cada atributo só pode receber um boost desta origem',
      })
    }
  }

  for (const grant of background.skillGrants) {
    if (grant.skillOptions && grant.skillOptions.length > 0) {
      const selected = choices.skillChoices[grant.id]
      if (!selected) {
        issues.push({
          field: `skillChoices.${grant.id}`,
          message: 'Escolha uma perícia',
        })
      } else if (!grant.skillOptions.includes(selected)) {
        issues.push({
          field: `skillChoices.${grant.id}`,
          message: 'Perícia inválida para esta origem',
        })
      }
    }
  }

  for (const grant of background.loreGrants) {
    if (grant.loreOptions && grant.loreOptions.length > 0) {
      const selected = choices.loreChoices[grant.id]
      if (!selected) {
        issues.push({
          field: `loreChoices.${grant.id}`,
message: 'Escolha uma especialização de Conhecimento',
      })
      } else if (
        !grant.allowCustom &&
        !grant.loreOptions.some((o) => o.id === selected)
      ) {
        issues.push({
          field: `loreChoices.${grant.id}`,
          message: 'Conhecimento inválido para esta origem',
        })
      }
    } else if (grant.allowCustom && !grant.loreId) {
      const name = choices.customLoreNames?.[grant.id] ?? choices.loreChoices[grant.id]
      if (!name?.trim()) {
        issues.push({
          field: `loreChoices.${grant.id}`,
          message: 'Informe o nome do Conhecimento',
        })
      }
    }
  }

  for (const grant of background.featGrants) {
    if (!featGrantIsChoice(grant)) continue
    const selected = choices.featChoices?.[grant.id]?.trim()
    if (!selected) {
      issues.push({
        field: `featChoices.${grant.id}`,
        message: grant.chooseHint ?? 'Escolha o feito concedido por esta origem',
      })
    }
  }

  return issues
}

/** Atributos disponíveis para um boost livre, excluindo já escolhidos */
export function getAvailableAttributesForBoost(
  background: Background,
  ruleId: string,
  choices: BackgroundChoices,
): AttributeId[] {
  const rule = background.attributeBoosts.find((r) => r.id === ruleId)
  if (!rule) return []

  const chosenElsewhere = background.attributeBoosts
    .filter((r) => r.id !== ruleId)
    .map((r) => choices.attributeBoosts[r.id])
    .filter((a): a is AttributeId => Boolean(a))

  if (rule.option.kind === 'specific') {
    return rule.option.attributes
  }

  if (rule.option.excludeAlreadyChosen === false) {
    return [...ATTRIBUTE_IDS]
  }

  return ATTRIBUTE_IDS.filter((a) => !chosenElsewhere.includes(a))
}

/**
 * Resolve contribuições da origem a partir dos dados + escolhas.
 * Sem condicionais por ID de origem.
 */
export function resolveBackgroundBenefits(
  background: Background,
  choices: BackgroundChoices,
  level = 1,
): ResolvedBackgroundBenefits {
  const issues = validateBackgroundChoices(background, choices)
  const attributeContributions: ModifierContribution[] = []
  const skillRanks: Partial<Record<SkillId, ProficiencyRank>> = {}
  const lores: ResolvedBackgroundBenefits['lores'] = []
  const feats: ResolvedBackgroundBenefits['feats'] = []

  for (const rule of background.attributeBoosts) {
    const attr = choices.attributeBoosts[rule.id]
    if (!attr) continue

    attributeContributions.push({
      id: `bg-boost-${background.id}-${rule.id}`,
      sourceType: 'background',
      sourceId: background.id,
      sourceLabel: background.name,
      target: `attribute.${attr}`,
      value: 1,
      bonusType: 'untyped',
      label: `Origem: ${background.name} (${rule.label})`,
    })
  }

  for (const grant of background.skillGrants) {
    const skillId = (grant.skillId ??
      choices.skillChoices[grant.id]) as SkillId | undefined
    if (!skillId) continue

    const current = skillRanks[skillId] ?? 'untrained'
    skillRanks[skillId] = maxProficiencyRank(current, grant.rank)
  }

  for (const grant of background.loreGrants) {
    let loreId: string | undefined
    let loreName: string | undefined

    if (grant.loreId) {
      loreId = grant.loreId
      loreName = grant.loreName ?? grant.loreId
    } else if (grant.loreOptions && grant.loreOptions.length > 0) {
      const selected = choices.loreChoices[grant.id]
      const option = grant.loreOptions.find((o) => o.id === selected)
      if (option) {
        loreId = option.id
        loreName = option.name
      } else if (grant.allowCustom && selected) {
        loreId = `custom-${grant.id}`
        loreName =
          choices.customLoreNames?.[grant.id] ?? selected
      }
    } else if (grant.allowCustom) {
      loreName =
        choices.customLoreNames?.[grant.id] ??
        choices.loreChoices[grant.id]
      loreId = `custom-${grant.id}`
    }

    if (loreId && loreName) {
      let rank = grant.rank
      if (grant.legendaryAtLevel != null && level >= grant.legendaryAtLevel) {
        rank = maxProficiencyRank(rank, 'legendary')
      } else if (grant.masterAtLevel != null && level >= grant.masterAtLevel) {
        rank = maxProficiencyRank(rank, 'master')
      } else if (grant.expertAtLevel != null && level >= grant.expertAtLevel) {
        rank = maxProficiencyRank(rank, 'expert')
      }
      lores.push({
        id: loreId,
        name: loreName,
        rank,
        sourceLabel: `Origem: ${background.name}`,
      })
    }
  }

  for (const grant of background.featGrants) {
    if (grant.requiresSkillId) {
      const relatedSkillGrant = background.skillGrants.find((s) =>
        Boolean(choices.skillChoices[s.id] || s.skillId),
      )
      const chosenSkill =
        relatedSkillGrant?.skillId ??
        (relatedSkillGrant
          ? choices.skillChoices[relatedSkillGrant.id]
          : undefined)
      if (chosenSkill !== grant.requiresSkillId) continue
    }

    if (featGrantIsChoice(grant)) {
      const selected = resolveChosenBackgroundFeat(grant, choices)
      if (!selected) continue
      feats.push({
        id: selected.featId ?? `${grant.id}:${selected.id}`,
        featId: selected.featId,
        featName: selected.featName,
        originalName: selected.originalName,
        featType: grant.featType,
        description: selected.description,
        actionType: selected.actionType,
        frequency: selected.frequency,
        trigger: selected.trigger,
        traits: selected.traits,
        sourceLabel: `Origem: ${background.name}`,
      })
      continue
    }

    let featName = localizeFeatName(grant.featName, grant.originalName)
    if (grant.appendChosenSkillName && grant.skillGrantIdForName) {
      const skillId =
        choices.skillChoices[grant.skillGrantIdForName] ??
        background.skillGrants.find((s) => s.id === grant.skillGrantIdForName)
          ?.skillId
      if (skillId) {
        const label =
          SKILL_LABELS[skillId as SkillId] ?? skillId
        featName = `${featName} (${label})`
      }
    }

    feats.push({
      id: grant.featId ?? grant.id,
      featId: grant.featId,
      featName,
      originalName: grant.originalName,
      featType: grant.featType,
      description: grant.description,
      actionType: grant.actionType,
      frequency: grant.frequency,
      trigger: grant.trigger,
      traits: grant.traits,
      sourceLabel: `Origem: ${background.name}`,
    })
  }

  return {
    attributeContributions,
    skillRanks,
    lores,
    feats,
    issues,
  }
}

export function describeBoostRule(rule: Background['attributeBoosts'][number]): string {
  if (rule.option.kind === 'free') {
    return 'Qualquer atributo (livre)'
  }
  return rule.option.attributes.map((a) => ATTRIBUTE_LABELS[a]).join(' ou ')
}

export function describeSkillGrant(grant: Background['skillGrants'][number]): string {
  const rank = PROFICIENCY_LABELS[grant.rank]
  if (grant.skillId) {
    return `${SKILL_LABELS[grant.skillId as SkillId] ?? grant.skillId} — ${rank}`
  }
  if (grant.skillOptions) {
    const names = grant.skillOptions
      .map((id) => SKILL_LABELS[id as SkillId] ?? id)
      .join(' ou ')
    return `${names} — ${rank}`
  }
  return rank
}

export function describeLoreGrant(grant: Background['loreGrants'][number]): string {
  const rank = PROFICIENCY_LABELS[grant.rank]
  if (grant.loreName) {
    return `${grant.loreName} — ${rank}`
  }
  if (grant.loreOptions) {
    return `${grant.loreOptions.map((o) => o.name).join(' ou ')} — ${rank}`
  }
  if (grant.allowCustom) {
    return grant.hint
      ? `${grant.hint} — ${rank}`
      : `Conhecimento personalizado — ${rank}`
  }
  return rank
}

export function featGrantIsChoice(grant: FeatGrantRule): boolean {
  return Boolean(grant.chooseSkillFeat) || (grant.featOptions?.length ?? 0) > 0
}

function featTiedToSkill(feat: Feat, skillId: SkillId): boolean {
  return (feat.prerequisites ?? []).some(
    (pre) => pre.kind === 'skillRank' && pre.skillId === skillId,
  )
}

export function resolveChosenBackgroundFeat(
  grant: FeatGrantRule,
  choices: BackgroundChoices,
): {
  id: string
  featId?: string
  featName: string
  originalName?: string
  description?: string
  actionType?: FeatGrantRule['actionType']
  frequency?: string
  trigger?: string
  traits?: string[]
} | null {
  const selected = choices.featChoices?.[grant.id]?.trim()
  if (!selected) return null
  if (grant.chooseSkillFeat) {
    return {
      id: selected,
      featId: selected,
      featName: grant.featName,
      originalName: grant.originalName,
    }
  }
  const option = grant.featOptions?.find(
    (entry) => entry.id === selected || entry.featId === selected,
  )
  if (!option) return null
  return {
    id: option.id,
    featId: option.featId,
    featName: localizeFeatName(option.featName, option.originalName),
    originalName: option.originalName,
    description: option.description,
    actionType: option.actionType,
    frequency: option.frequency,
    trigger: option.trigger,
    traits: option.traits,
  }
}

export function buildBackgroundFeatPick(
  grant: FeatGrantRule,
  choices: BackgroundChoices,
  catalog: Feat[],
  opts?: {
    level?: number
    skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
  },
): GrantedFeatPick | null {
  if (!featGrantIsChoice(grant)) return null
  const level = opts?.level ?? 1
  const selected = choices.featChoices?.[grant.id]
  const skillId = grant.chooseSkillFeat as SkillId | undefined
  const assumedRank: ProficiencyRank = skillId
    ? maxProficiencyRank(opts?.skillRanks?.[skillId] ?? 'untrained', 'trained')
    : 'trained'

  let options: GrantedFeatPickOption[] = []
  if (skillId) {
    options = catalog
      .filter(
        (feat) =>
          feat.category === 'skill' &&
          !feat.isDedication &&
          featTiedToSkill(feat, skillId),
      )
      .map((feat) => {
        const reasons: string[] = []
        if (feat.level > level) {
          reasons.push(`Requer nível ${feat.level}.`)
        }
        for (const pre of feat.prerequisites ?? []) {
          if (pre.kind === 'skillRank' && pre.skillId === skillId) {
            if (
              proficiencyRankValue(assumedRank) < proficiencyRankValue(pre.rank)
            ) {
              reasons.push(
                `Requer ${PROFICIENCY_LABELS[pre.rank]} em ${SKILL_LABELS[skillId]}.`,
              )
            }
          } else if (pre.kind === 'feat') {
            reasons.push(`Requer o feito ${pre.featName ?? pre.featId}.`)
          }
        }
        return {
          id: feat.id,
          name: feat.name,
          originalName: feat.originalName,
          level: feat.level,
          actionType: feat.actionType,
          traits: feat.traits,
          description: feat.description,
          available: reasons.length === 0,
          reasons,
        }
      })
      .sort((a, b) => {
        if (a.available !== b.available) return a.available ? -1 : 1
        if (a.level !== b.level) return a.level - b.level
        return a.name.localeCompare(b.name, 'pt-BR')
      })
  } else {
    options = (grant.featOptions ?? []).map((option) => {
      const catalogFeat = findFeatInCatalog(catalog, {
        featId: option.featId,
        originalName: option.originalName,
        featName: option.featName,
      })
      return {
        id: option.featId ?? option.id,
        name: catalogFeat?.name ?? option.featName,
        originalName: catalogFeat?.originalName ?? option.originalName,
        level: catalogFeat?.level ?? 1,
        actionType: catalogFeat?.actionType ?? option.actionType,
        traits: catalogFeat?.traits ?? option.traits ?? [],
        description: catalogFeat?.description || option.description || '',
        available: true,
        reasons: [],
      }
    })
  }

  const selectedOk = selected
    ? options.some((option) => option.id === selected)
    : false

  return {
    key: grant.id,
    parentFeatId: grant.featId ?? grant.id,
    parentName: localizeFeatName(grant.featName, grant.originalName),
    hint:
      grant.chooseHint ??
      'Escolha o feito. O motor não escolhe por você.',
    selectedFeatId: selectedOk ? selected : undefined,
    options,
  }
}
