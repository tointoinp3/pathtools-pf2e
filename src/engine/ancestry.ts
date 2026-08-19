import type {
  Ancestry,
  AncestryChoices,
  AttributeId,
  CreatureSize,
  Heritage,
  ModifierContribution,
  ProficiencyRank,
  ResolvedResistance,
  SkillId,
} from '@/types'
import { ATTRIBUTE_IDS } from '@/types'
import { ATTRIBUTE_LABELS, PROFICIENCY_LABELS, SIZE_LABELS, SKILL_LABELS, formatSpeedMeters } from '@/utils/labels'
import { maxProficiencyRank } from './proficiency'
import {
  getCatalogCreature,
  isCreatureCatalogReady,
  listCatalogCreatures,
} from '@/data/creatureCatalog'
import { additionalLanguageOptionsFor } from './heritage'
import { isPlaceholderFeatLookup } from './feats'

export interface AncestryValidationIssue {
  field: string
  message: string
}

export interface ResolvedAncestryBenefits {
  attributeContributions: ModifierContribution[]
  skillRanks: Partial<Record<SkillId, ProficiencyRank>>
  feats: Array<{
    id: string
    featId?: string
    featName: string
    originalName?: string
    featType?: string
    description?: string
    actionType?: string
    frequency?: string
    trigger?: string
    traits?: string[]
    sourceLabel: string
  }>
  senses: Array<{
    id: string
    name: string
    description: string
    sourceLabel: string
  }>
  specialAbilities: Array<{
    id: string
    name: string
    description: string
    sourceLabel: string
    actionType?: string
  }>
  resistances: ResolvedResistance[]
  languages: string[]
  hitPointsFromAncestry: number
  /** Quem concedeu os PV (ancestralidade, ou herança que substitui). */
  hitPointsSourceLabel: string
  speed: number
  additionalSpeeds: Partial<Record<'climb' | 'swim' | 'fly', number>>
  size: Ancestry['size']
  issues: AncestryValidationIssue[]
}

export function emptyAncestryChoices(): AncestryChoices {
  return {
    attributeBoosts: {},
    additionalLanguages: [],
    heritageChoices: {},
    extraChoices: {},
    customLabels: {},
    useFlexibleBoosts: false,
  }
}

const FLEXIBLE_BOOST_RULES: Ancestry['attributeBoosts'] = [
  {
    id: 'flex-boost-1',
    label: 'Aumento livre',
    option: { kind: 'free', excludeAlreadyChosen: true },
  },
  {
    id: 'flex-boost-2',
    label: 'Aumento livre',
    option: { kind: 'free', excludeAlreadyChosen: true },
  },
]

/** Player Core: dois aumentos livres no lugar dos fixos, sem falha. */
export function ancestryBoostRules(
  ancestry: Ancestry,
  choices: AncestryChoices,
): Ancestry['attributeBoosts'] {
  return choices.useFlexibleBoosts ? FLEXIBLE_BOOST_RULES : ancestry.attributeBoosts
}

/** Boosts fixos (uma única opção) são aplicados automaticamente */
export function isAutoAttributeBoost(
  rule: Ancestry['attributeBoosts'][number],
): boolean {
  return rule.option.kind === 'specific' && rule.option.attributes.length === 1
}

export function getRequiredFreeBoostRules(
  ancestry: Ancestry,
  choices?: AncestryChoices,
) {
  const rules = choices
    ? ancestryBoostRules(ancestry, choices)
    : ancestry.attributeBoosts
  return rules.filter((r) => !isAutoAttributeBoost(r))
}

export function getEffectiveAncestryBoostChoices(
  ancestry: Ancestry,
  choices: AncestryChoices,
): Record<string, AttributeId> {
  const rules = ancestryBoostRules(ancestry, choices)
  const effective: Record<string, AttributeId> = { ...choices.attributeBoosts }
  for (const rule of rules) {
    if (isAutoAttributeBoost(rule) && rule.option.kind === 'specific') {
      const autoAttr = rule.option.attributes[0]
      if (autoAttr) effective[rule.id] = autoAttr
    }
  }
  return effective
}

export function getAvailableAttributesForAncestryBoost(
  ancestry: Ancestry,
  choices: AncestryChoices,
  ruleId: string,
): AttributeId[] {
  const rules = ancestryBoostRules(ancestry, choices)
  const rule = rules.find((r) => r.id === ruleId)
  if (!rule) return []

  const effective = getEffectiveAncestryBoostChoices(ancestry, choices)
  const chosenElsewhere = rules
    .filter((r) => r.id !== ruleId)
    .map((r) => effective[r.id])
    .filter(Boolean) as AttributeId[]

  if (rule.option.kind === 'specific') {
    return rule.option.attributes
  }

  const exclude = rule.option.excludeAlreadyChosen !== false
  if (!exclude) return [...ATTRIBUTE_IDS]
  return ATTRIBUTE_IDS.filter((id) => !chosenElsewhere.includes(id))
}

export function additionalLanguageSlots(
  intelligenceModifier: number,
  ancestry: Ancestry,
  extraSlots = 0,
): number {
  const bonus = ancestry.languages.bonusSlots ?? 0
  const fromInt = ancestry.languages.additionalFromIntelligence
    ? Math.max(0, intelligenceModifier)
    : 0
  const extra = Number.isFinite(extraSlots) ? Math.trunc(extraSlots) : 0
  return Math.max(0, fromInt + bonus + extra)
}

export function validateAncestryChoices(
  ancestry: Ancestry,
  choices: AncestryChoices,
  heritage: Heritage | null | undefined,
  intelligenceModifier?: number,
  extraLanguageSlots = 0,
): AncestryValidationIssue[] {
  const issues: AncestryValidationIssue[] = []
  const boostRules = ancestryBoostRules(ancestry, choices)
  const effective = getEffectiveAncestryBoostChoices(ancestry, choices)
  const chosen: AttributeId[] = []

  for (const rule of boostRules) {
    const selected = effective[rule.id]
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
    if (rule.option.kind === 'specific' && !rule.option.attributes.includes(selected)) {
      issues.push({
        field: `attributeBoosts.${rule.id}`,
        message: `Atributo deve ser: ${rule.option.attributes
          .map((a) => ATTRIBUTE_LABELS[a])
          .join(' ou ')}`,
      })
    }
    if (
      rule.option.kind === 'free' &&
      rule.option.excludeAlreadyChosen !== false &&
      chosen.includes(selected)
    ) {
      issues.push({
        field: `attributeBoosts.${rule.id}`,
        message: `O boost livre não pode repetir um atributo já aumentado nesta etapa (${ATTRIBUTE_LABELS[selected]})`,
      })
    }
    chosen.push(selected)
  }

  const unique = new Set(chosen)
  if (unique.size !== chosen.length) {
    const already = issues.some((i) => i.message.includes('não pode repetir'))
    if (!already) {
      issues.push({
        field: 'attributeBoosts',
        message: 'Cada atributo só pode receber um boost desta ancestralidade',
      })
    }
  }

  if (heritage) {
    if (heritage.ancestryId && heritage.ancestryId !== ancestry.id) {
      issues.push({
        field: 'heritageId',
        message: 'Esta herança não é compatível com a ancestralidade escolhida',
      })
    }
    for (const choice of heritage.choices ?? []) {
      const selected = choices.heritageChoices[choice.id]
      if (!selected) {
        if (choice.required === false) continue
        issues.push({
          field: `heritageChoices.${choice.id}`,
          message: `Escolha: ${choice.label}`,
        })
      } else if (!choice.options.some((o) => o.id === selected)) {
        issues.push({
          field: `heritageChoices.${choice.id}`,
          message: 'Opção inválida para esta herança',
        })
      }
    }
  }

  if (intelligenceModifier != null) {
    const slots = additionalLanguageSlots(
      intelligenceModifier,
      ancestry,
      extraLanguageSlots,
    )
    const languageOptions = additionalLanguageOptionsFor(ancestry, heritage)
    if (choices.additionalLanguages.length > slots) {
      issues.push({
        field: 'additionalLanguages',
        message: `Você só pode escolher ${slots} idioma(s) adicional(is) com Inteligência ${intelligenceModifier >= 0 ? `+${intelligenceModifier}` : intelligenceModifier}`,
      })
    }
    for (const lang of choices.additionalLanguages) {
      if (
        !languageOptions.includes(lang) &&
        !ancestry.languages.automatic.includes(lang)
      ) {
        // Allow regional/other access languages as free text later; for now warn soft
        // but still accept if user typed something not in list via UI only from list
      }
    }
  }

  for (const rule of ancestry.extraChoices ?? []) {
    if (rule.required === false) continue
    const selected = choices.extraChoices?.[rule.id]
    if (rule.kind === 'size') {
      const allowed = rule.sizeOptions ?? []
      if (!selected || !allowed.includes(selected as CreatureSize)) {
        issues.push({
          field: `extraChoices.${rule.id}`,
          message: `Escolha o tamanho (${(rule.sizeOptions ?? [])
            .map((s) => SIZE_LABELS[s])
            .join(', ')})`,
        })
      }
    } else if (rule.kind === 'options') {
      if (!selected || !rule.options?.some((o) => o.id === selected)) {
        issues.push({
          field: `extraChoices.${rule.id}`,
          message: `Escolha: ${rule.label}`,
        })
      }
    } else if (rule.kind === 'creatureCatalog' && rule.catalog) {
      const catalogReady = isCreatureCatalogReady(rule.catalog.id)
      const custom = choices.customLabels?.[rule.id]?.trim()
      if (catalogReady) {
        const validId = listCatalogCreatures(
          rule.catalog.id,
          rule.catalog.kinds,
        ).some((c) => c.id === selected)
        const customOk =
          rule.catalog.allowCustomUntilCatalogReady !== false &&
          selected === 'custom' &&
          Boolean(custom)
        if (!validId && !customOk) {
          issues.push({
            field: `extraChoices.${rule.id}`,
            message: `Escolha: ${rule.label}`,
          })
        }
      } else if (rule.catalog.allowCustomUntilCatalogReady !== false) {
        if (!custom) {
          issues.push({
            field: `extraChoices.${rule.id}`,
            message: `Anote o ${rule.label.toLowerCase()} (a lista de criaturas ainda vai entrar no app)`,
          })
        }
      }
    }
  }

  return issues
}

export function resolveResistanceValue(
  rule: NonNullable<Heritage['resistances']>[number],
  level: number,
): number {
  if (rule.kind === 'fixed') return rule.value
  return Math.max(1, Math.floor(level / 2))
}

export function resolveAncestryBenefits(
  ancestry: Ancestry,
  choices: AncestryChoices,
  heritage: Heritage | null | undefined,
  level: number,
): ResolvedAncestryBenefits {
  const effective = getEffectiveAncestryBoostChoices(ancestry, choices)
  const attributeContributions: ModifierContribution[] = []
  const boostRules = ancestryBoostRules(ancestry, choices)

  for (const rule of boostRules) {
    const attr = effective[rule.id]
    if (!attr) continue
    attributeContributions.push({
      id: `ancestry-boost-${rule.id}`,
      sourceType: 'ancestry',
      sourceId: ancestry.id,
      sourceLabel: ancestry.name,
      target: `attribute.${attr}`,
      value: 1,
      bonusType: 'untyped',
      label: `${rule.label} (${ancestry.name})`,
    })
  }

  if (!choices.useFlexibleBoosts) {
    for (const flaw of ancestry.attributeFlaws) {
      attributeContributions.push({
        id: `ancestry-flaw-${flaw}`,
        sourceType: 'ancestry',
        sourceId: ancestry.id,
        sourceLabel: ancestry.name,
        target: `attribute.${flaw}`,
        value: -1,
        bonusType: 'untyped',
        label: `Falha de ${ATTRIBUTE_LABELS[flaw]} (${ancestry.name})`,
      })
    }
  }

  const skillRanks: Partial<Record<SkillId, ProficiencyRank>> = {}
  const feats: ResolvedAncestryBenefits['feats'] = []
  const resistances: ResolvedResistance[] = []
  const specialAbilities: ResolvedAncestryBenefits['specialAbilities'] = [
    ...ancestry.specialAbilities.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      sourceLabel: ancestry.name,
      actionType: a.actionType,
    })),
  ]

  if (heritage) {
    for (const grant of heritage.skillGrants ?? []) {
      if (grant.replaceIfTrained) continue
      const skillId = (grant.skillId ??
        choices.heritageChoices[`skill-${grant.id}`]) as SkillId | undefined
      if (!skillId) continue
      let rank = grant.rank
      if (grant.expertAtLevel != null && level >= grant.expertAtLevel) {
        rank = maxProficiencyRank(rank, 'expert')
      }
      const current = skillRanks[skillId]
      skillRanks[skillId] = current
        ? maxProficiencyRank(current, rank)
        : rank
    }

    for (const grant of heritage.featGrants ?? []) {
      if (
        grant.requiresChoiceId &&
        choices.heritageChoices[grant.requiresChoiceId] !==
          grant.requiresChoiceValue
      ) {
        continue
      }

      let featId = grant.featId
      let featName = grant.featName
      let originalName = grant.originalName
      let featType = grant.featType
      if (!featId) {
        for (const choice of heritage.choices ?? []) {
          const selected = choices.heritageChoices[choice.id]
          if (!selected || selected === 'other') continue
          if (selected.startsWith('feat-')) {
            featId = selected
            const opt = choice.options.find((o) => o.id === selected)
            if (opt) {
              featName = opt.label
              originalName = opt.originalLabel ?? originalName
            }
            break
          }
          if (grant.originalName === 'Multiclass Dedication') {
            const opt = choice.options.find((o) => o.id === selected)
            if (opt) {
              featId = `feat-${selected}-dedication`
              featName = `Dedicação de ${opt.label}`
              originalName = `${opt.originalLabel ?? opt.label} Dedication`
              featType = 'archetype'
            }
            break
          }
        }
      }
      if (
        !featId &&
        isPlaceholderFeatLookup({
          originalName,
          featName,
        })
      ) {
        continue
      }
      feats.push({
        id: `${heritage.id}-${grant.id}`,
        featId,
        featName,
        originalName,
        featType,
        description: grant.description,
        actionType: grant.actionType,
        frequency: grant.frequency,
        trigger: grant.trigger,
        traits: grant.traits,
        sourceLabel: heritage.name,
      })
    }

    for (const rule of heritage.resistances ?? []) {
      const value = resolveResistanceValue(rule, level)
      resistances.push({
        id: `${heritage.id}-${rule.damageType}`,
        label: rule.label,
        damageType: rule.damageType,
        value,
        sourceType: 'heritage',
        sourceId: heritage.id,
        sourceLabel: heritage.name,
        breakdown: [
          {
            label:
              rule.kind === 'halfLevelMin1'
                ? `Metade do nível (mín. 1)`
                : 'Valor fixo',
            value:
              rule.kind === 'halfLevelMin1'
                ? `⌊${level}/2⌋ = ${value}`
                : value,
          },
        ],
      })
    }

    for (const ability of heritage.specialAbilities ?? []) {
      let description = ability.description
      if (ability.trigger) {
        description = `Gatilho: ${ability.trigger}\n\n${description}`
      }
      if (ability.frequency) {
        description = `Frequência: ${ability.frequency}\n\n${description}`
      }
      // Inject heritage choice labels into ability descriptions when present
      for (const choice of heritage.choices ?? []) {
        const selected = choices.heritageChoices[choice.id]
        if (!selected) continue
        const opt = choice.options.find((o) => o.id === selected)
        if (opt) {
          description += `\n\n${choice.label}: ${opt.label}.`
          if (opt.description?.trim()) {
            description += ` ${opt.description.trim()}`
          }
        }
      }
      specialAbilities.push({
        id: ability.id,
        name: ability.name,
        description,
        sourceLabel: heritage.name,
        actionType: ability.actionType,
      })
    }

    if ((heritage.specialAbilities?.length ?? 0) === 0) {
      const base = heritage.description?.trim() || heritage.rulesSummary
      if (base) {
        let description = base
        for (const choice of heritage.choices ?? []) {
          const selected = choices.heritageChoices[choice.id]
          if (!selected) continue
          const opt = choice.options.find((o) => o.id === selected)
          if (!opt) continue
          description += `\n\n${choice.label}: ${opt.label}.`
          if (opt.description?.trim()) {
            description += ` ${opt.description.trim()}`
          }
        }
        specialAbilities.push({
          id: `${heritage.id}-heritage-rules`,
          name: heritage.name,
          description,
          sourceLabel: heritage.name,
          actionType: 'passive',
        })
      }
    }
  }

  const languages = [
    ...ancestry.languages.automatic,
    ...(heritage?.grantedLanguages ?? []),
    ...choices.additionalLanguages.filter(
      (l) =>
        !ancestry.languages.automatic.includes(l) &&
        !(heritage?.grantedLanguages ?? []).includes(l),
    ),
  ]

  const senses = ancestry.senses.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    sourceLabel: ancestry.name,
  }))
  const existingSenseKinds = new Set(ancestry.senses.map((s) => s.kind))
  if (heritage?.senses) {
    for (const sense of heritage.senses) {
      if (
        heritage.upgradeLowLightToDarkvision &&
        sense.kind === 'lowLightVision' &&
        existingSenseKinds.has('lowLightVision') &&
        !existingSenseKinds.has('darkvision')
      ) {
        senses.push({
          id: `${heritage.id}-darkvision`,
          name: 'Visão no Escuro',
          description:
            'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
          sourceLabel: heritage.name,
        })
        existingSenseKinds.add('darkvision')
        continue
      }
      if (existingSenseKinds.has(sense.kind)) continue
      if (sense.kind === 'lowLightVision' && existingSenseKinds.has('darkvision')) {
        continue
      }
      senses.push({
        id: sense.id,
        name: sense.name,
        description: sense.description,
        sourceLabel: heritage.name,
      })
      existingSenseKinds.add(sense.kind)
    }
  }

  const size = resolveAncestrySize(ancestry, choices, heritage)
  const baseHitPoints = ancestry.hitPointsBySize?.[size] ?? ancestry.hitPoints
  const hitPointsFromAncestry =
    heritage?.hitPointsOverride != null
      ? heritage.hitPointsOverride
      : baseHitPoints
  const hitPointsSourceLabel =
    heritage?.hitPointsOverride != null
      ? `${ancestry.name} · ${heritage.name}`
      : ancestry.name

  let speed = ancestry.speed
  let additionalSpeeds: Partial<Record<'climb' | 'swim' | 'fly', number>> = {}
  if (heritage?.speedOverride != null) speed = heritage.speedOverride
  if (heritage?.speedBonus) speed += heritage.speedBonus
  if (heritage?.additionalSpeeds) {
    additionalSpeeds = { ...heritage.additionalSpeeds }
  }
  if (heritage) {
    for (const choice of heritage.choices ?? []) {
      const selected = choices.heritageChoices[choice.id]
      const opt = choice.options.find((o) => o.id === selected)
      if (!opt) continue
      if (opt.speedOverride != null) speed = opt.speedOverride
      if (opt.speedBonus) speed += opt.speedBonus
      if (opt.additionalSpeeds) {
        additionalSpeeds = { ...additionalSpeeds, ...opt.additionalSpeeds }
      }
    }
  }

  const issues = validateAncestryChoices(ancestry, choices, heritage)

  return {
    attributeContributions,
    skillRanks,
    feats,
    senses,
    specialAbilities,
    resistances,
    languages,
    hitPointsFromAncestry,
    hitPointsSourceLabel,
    speed,
    additionalSpeeds,
    size,
    issues,
  }
}

export function resolveAncestrySize(
  ancestry: Ancestry,
  choices: AncestryChoices,
  heritage?: Heritage | null,
): CreatureSize {
  if (heritage?.sizeOverride) return heritage.sizeOverride
  const sizeRule = ancestry.extraChoices?.find((r) => r.kind === 'size')
  if (sizeRule) {
    const selected = choices.extraChoices?.[sizeRule.id] as
      | CreatureSize
      | undefined
    if (selected && (sizeRule.sizeOptions ?? []).includes(selected)) {
      return selected
    }
  }
  return ancestry.size
}

const SPEED_KIND_LABELS: Record<'climb' | 'swim' | 'fly', string> = {
  climb: 'Escalada',
  swim: 'Natação',
  fly: 'Voo',
}

/** Resumo de deslocamento (terrestre + extras da herança). */
export function formatSpeedSummary(
  land: number,
  additional?: Partial<Record<'climb' | 'swim' | 'fly', number>>,
): string {
  const parts: string[] = []
  if (land > 0) parts.push(formatSpeedMeters(land))
  for (const kind of ['climb', 'swim', 'fly'] as const) {
    const value = additional?.[kind]
    if (value) parts.push(`${SPEED_KIND_LABELS[kind].toLowerCase()} ${formatSpeedMeters(value)}`)
  }
  if (parts.length === 0) parts.push(formatSpeedMeters(land))
  return parts.join(' · ')
}

export function additionalSpeedBreakdown(
  additional?: Partial<Record<'climb' | 'swim' | 'fly', number>>,
): Array<{ label: string; value: string }> {
  const rows: Array<{ label: string; value: string }> = []
  for (const kind of ['climb', 'swim', 'fly'] as const) {
    const value = additional?.[kind]
    if (value) rows.push({ label: SPEED_KIND_LABELS[kind], value: formatSpeedMeters(value) })
  }
  return rows
}

export function formatAncestryDisplayName(
  ancestry: Ancestry,
  choices?: AncestryChoices | null,
): string {
  const creatureRule = ancestry.extraChoices?.find(
    (r) => r.kind === 'creatureCatalog',
  )
  if (!creatureRule?.catalog || !choices) return ancestry.name
  const selected = choices.extraChoices?.[creatureRule.id]
  if (selected && selected !== 'custom') {
    const entry = getCatalogCreature(creatureRule.catalog.id, selected)
    if (entry) return `${ancestry.name} (${entry.name})`
  }
  const custom = choices.customLabels?.[creatureRule.id]?.trim()
  if (custom) return `${ancestry.name} (${custom})`
  return ancestry.name
}

export function describeAncestryBoostRule(
  rule: Ancestry['attributeBoosts'][number],
): string {
  if (rule.option.kind === 'specific') {
    return rule.option.attributes.map((a) => ATTRIBUTE_LABELS[a]).join(' ou ')
  }
  return 'Qualquer atributo (exceto os já aumentados nesta etapa)'
}

export function describeSkillGrantShort(
  skillId: string,
  rank: ProficiencyRank,
): string {
  const name = SKILL_LABELS[skillId as SkillId] ?? skillId
  return `${name} (${PROFICIENCY_LABELS[rank]})`
}
