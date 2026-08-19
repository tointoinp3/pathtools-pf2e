import type {
  AttackProficiencyCategory,
  AttributeId,
  CharacterClass,
  ClassChoices,
  ClassFeature,
  ClassFeatureEffect,
  ClassSubclassOption,
  DefenseProficiencyCategory,
  Feat,
  GrantedFeatPick,
  GrantedFeatPickOption,
  LoreGrantRule,
  ModifierContribution,
  PendingSkillChoice,
  ProficiencyRank,
  ResolvedClassProficiency,
  SkillId,
} from '@/types'
import { ATTRIBUTE_IDS, SKILL_IDS } from '@/types'
import { ATTRIBUTE_LABELS, PROFICIENCY_LABELS, SAVE_LABELS, SKILL_LABELS } from '@/utils/labels'
import { calculateProficiencyBonus, maxProficiencyRank, proficiencyRankValue } from './proficiency'
import {
  catalogGrantedLores,
  catalogGrantedSkills,
  selectedCatalogOptions,
  validateClassCatalogs,
} from './classCatalog'
import { collectGrantedClassSpells } from './grantedSpells'

export interface ClassValidationIssue {
  field: string
  message: string
}

export interface ResolvedClassBenefits {
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
    sourceLabel: string
  }>
  specialAbilities: Array<{
    id: string
    name: string
    description: string
    sourceLabel: string
    actionType?: string
  }>
  perceptionRank: ProficiencyRank
  saveRanks: {
    fortitude: ProficiencyRank
    reflex: ProficiencyRank
    will: ProficiencyRank
  }
  classDcRank: ProficiencyRank
  attackProficiencies: ResolvedClassProficiency[]
  defenseProficiencies: ResolvedClassProficiency[]
  hitPointsPerLevel: number
  activeFeatures: CharacterClass['features']
  subclass?: ClassSubclassOption | null
  issues: ClassValidationIssue[]
  speedBonus: number
  speedBonusUnarmored: number
  /** Dano extra permanente em armas/desarmados com proficiência especialista+. */
  weaponSpecialization: 'none' | 'normal' | 'greater'
}

export function emptyClassChoices(): ClassChoices {
  return {
    additionalSkills: [],
    creationFreeBoosts: [],
    grantedSpellPicks: {},
    featurePicks: {},
  }
}

/** Recurso que só diz “ganha o feito X” — o cartão do feito já explica. */
export function classFeatureIsFeatStub(feature: ClassFeature): boolean {
  const text = feature.description.replace(/\s+/g, ' ').trim()
  if (/^Ganha o feito (avançado|maior) do seu caminho\.?$/i.test(text)) {
    return true
  }
  const hasGrant = feature.effects?.some((e) => e.kind === 'grantedFeat')
  if (!hasGrant) return false
  if (text.length > 160) return false
  if (
    /identifica automaticamente|morrendo|retreina|1ª vez no dia|além disso/i.test(
      text,
    )
  ) {
    return false
  }
  return /ganha o feito/i.test(text)
}

export function classFeaturePickValue(
  choices: ClassChoices,
  choiceId: string,
  featChoices?: Record<string, string>,
): string | undefined {
  const fromClass = choices.featurePicks?.[choiceId]
  if (fromClass) return fromClass
  return featChoices?.[`class:${choiceId}`]
}

/** Copia escolhas antigas (`featChoices['class:…']`) para `featurePicks`. */
export function mergeFeatChoicesIntoClassPicks(
  choices: ClassChoices | null | undefined,
  featChoices?: Record<string, string>,
): ClassChoices {
  const base = { ...emptyClassChoices(), ...(choices ?? {}) }
  const featurePicks = { ...(base.featurePicks ?? {}) }
  for (const [key, value] of Object.entries(featChoices ?? {})) {
    if (!key.startsWith('class:') || !value) continue
    const choiceId = key.slice('class:'.length)
    if (!featurePicks[choiceId]) featurePicks[choiceId] = value
  }
  return { ...base, featurePicks }
}

export function getSelectedSubclass(
  classDef: CharacterClass,
  choices: ClassChoices,
): ClassSubclassOption | null {
  if (!classDef.subclass || !choices.subclassId) return null
  return (
    classDef.subclass.options.find((o) => o.id === choices.subclassId) ?? null
  )
}

/** Variantes (ex.: Cultivo/Esporos) também contam como a especialização-base. */
export function subclassCountsAs(
  option: ClassSubclassOption | null | undefined,
  targetId: string,
): boolean {
  if (!option) return false
  if (option.id === targetId) return true
  return Boolean(option.countsAsSubclassIds?.includes(targetId))
}

export function getSelectedSecondarySubclass(
  classDef: CharacterClass,
  choices: ClassChoices,
): ClassSubclassOption | null {
  if (!classDef.secondarySubclass || !choices.secondarySubclassId) return null
  return (
    classDef.secondarySubclass.options.find(
      (o) => o.id === choices.secondarySubclassId,
    ) ?? null
  )
}

/** Atributos-chave efetivos = classe + extras do racket/especialização */
export function getEffectiveKeyAttributes(
  classDef: CharacterClass,
  choices: ClassChoices,
): AttributeId[] {
  const subclass = getSelectedSubclass(classDef, choices)
  const secondary = getSelectedSecondarySubclass(classDef, choices)
  const set = new Set<AttributeId>(classDef.keyAttributeOptions)
  for (const attr of subclass?.extraKeyAttributes ?? []) set.add(attr)
  const secondaryKeys = secondary?.extraKeyAttributes
  if (secondaryKeys && secondaryKeys.length > 0) {
    return ATTRIBUTE_IDS.filter((id) => secondaryKeys.includes(id))
  }
  return ATTRIBUTE_IDS.filter((id) => set.has(id))
}

export function getReservedClassSkills(
  classDef: CharacterClass,
  choices: ClassChoices,
): Set<SkillId> {
  const reserved = new Set<SkillId>()
  for (const grant of classDef.skills.fixed ?? []) {
    if (grant.skillId) reserved.add(grant.skillId as SkillId)
  }
  if (choices.skillChoice) reserved.add(choices.skillChoice)
  if (choices.subclassSkillChoice) reserved.add(choices.subclassSkillChoice)
  const subclass = getSelectedSubclass(classDef, choices)
  for (const grant of subclass?.skillGrants ?? []) {
    if (grant.skillId) reserved.add(grant.skillId as SkillId)
  }
  return reserved
}

export function additionalClassSkillSlots(
  intelligenceModifier: number,
  classDef: CharacterClass,
  choices?: ClassChoices,
): number {
  const subclass = choices ? getSelectedSubclass(classDef, choices) : null
  const base =
    subclass?.additionalSkillBaseOverride ?? classDef.skills.additionalBase
  if (!classDef.skills.additionalFromIntelligence) return base
  return base + Math.max(0, intelligenceModifier)
}

export function validateClassChoices(
  classDef: CharacterClass,
  choices: ClassChoices,
  intelligenceModifier?: number,
  characterLevel = 1,
  featChoices?: Record<string, string>,
): ClassValidationIssue[] {
  const issues: ClassValidationIssue[] = []

  if (classDef.subclass?.required) {
    if (!choices.subclassId) {
      issues.push({
        field: 'subclassId',
        message: `Escolha: ${classDef.subclass.label}`,
      })
    } else if (
      !classDef.subclass.options.some((o) => o.id === choices.subclassId)
    ) {
      issues.push({
        field: 'subclassId',
        message: 'Especialização inválida para esta classe',
      })
    }
  }

  if (classDef.secondarySubclass?.required) {
    if (!choices.secondarySubclassId) {
      issues.push({
        field: 'secondarySubclassId',
        message: `Escolha: ${classDef.secondarySubclass.label}`,
      })
    } else if (
      !classDef.secondarySubclass.options.some(
        (o) => o.id === choices.secondarySubclassId,
      )
    ) {
      issues.push({
        field: 'secondarySubclassId',
        message: 'Segunda especialização inválida para esta classe',
      })
    }
  }

  const subclass = getSelectedSubclass(classDef, choices)
  const keyOptions = getEffectiveKeyAttributes(classDef, choices)

  if (!choices.keyAttribute) {
    issues.push({
      field: 'keyAttribute',
      message: 'Escolha o atributo-chave da classe',
    })
  } else if (!keyOptions.includes(choices.keyAttribute)) {
    issues.push({
      field: 'keyAttribute',
      message: `Atributo-chave deve ser: ${keyOptions
        .map((a) => ATTRIBUTE_LABELS[a])
        .join(' ou ')}`,
    })
  }

  if (subclass?.skillChoiceOptions?.length) {
    if (!choices.subclassSkillChoice) {
      issues.push({
        field: 'subclassSkillChoice',
        message: subclass.skillChoiceLabel ?? 'Escolha uma perícia da especialização',
      })
    } else if (
      !subclass.skillChoiceOptions.includes(choices.subclassSkillChoice)
    ) {
      issues.push({
        field: 'subclassSkillChoice',
        message: 'Perícia inválida para esta especialização',
      })
    }
  }

  const free = choices.creationFreeBoosts ?? []
  if (free.length !== 4) {
    issues.push({
      field: 'creationFreeBoosts',
      message: `Escolha exatamente 4 boosts livres de criação (faltam ${Math.max(0, 4 - free.length)})`,
    })
  } else {
    const unique = new Set(free)
    if (unique.size !== 4) {
      issues.push({
        field: 'creationFreeBoosts',
        message: 'Os 4 boosts livres devem ser em atributos diferentes',
      })
    }
    for (const attr of free) {
      if (!ATTRIBUTE_IDS.includes(attr)) {
        issues.push({
          field: 'creationFreeBoosts',
          message: 'Atributo inválido nos boosts livres',
        })
        break
      }
    }
  }

  const choiceCount = classDef.skills.choiceCount ?? 0
  const subclassCoversSkillChoice =
    !!subclass &&
    (classDef.skills.choiceOptions ?? []).every((s) =>
      subclass.skillGrants?.some((g) => g.skillId === s),
    )
  if (
    choiceCount > 0 &&
    classDef.skills.choiceOptions?.length &&
    !subclassCoversSkillChoice
  ) {
    if (!choices.skillChoice) {
      issues.push({
        field: 'skillChoice',
        message: `Escolha ${choiceCount === 1 ? 'uma perícia' : `${choiceCount} perícias`} da classe`,
      })
    } else if (!classDef.skills.choiceOptions.includes(choices.skillChoice)) {
      issues.push({
        field: 'skillChoice',
        message: 'Perícia inválida para esta classe',
      })
    }
  }

  if (intelligenceModifier != null) {
    const slots = additionalClassSkillSlots(
      intelligenceModifier,
      classDef,
      choices,
    )
    if (choices.additionalSkills.length !== slots) {
      issues.push({
        field: 'additionalSkills',
        message: `Escolha exatamente ${slots} perícia(s) adicional(is) (${classDef.skills.additionalBase}+INT)`,
      })
    }
    const reserved = getReservedClassSkills(classDef, choices)
    for (const skill of choices.additionalSkills) {
      if (!SKILL_IDS.includes(skill)) {
        issues.push({
          field: 'additionalSkills',
          message: 'Perícia adicional inválida',
        })
        break
      }
      if (
        reserved.has(skill) ||
        choices.additionalSkills.filter((s) => s === skill).length > 1
      ) {
        issues.push({
          field: 'additionalSkills',
          message: 'Não repita perícias já concedidas pela classe/especialização',
        })
        break
      }
    }
  }

  if (characterLevel >= 5 && classDef.weaponGroupOptions?.length) {
    if (!choices.weaponGroup) {
      issues.push({
        field: 'weaponGroup',
        message: 'No 5º nível+, escolha o grupo de arma da Maestria de Arma',
      })
    } else if (
      !classDef.weaponGroupOptions.some((g) => g.id === choices.weaponGroup)
    ) {
      issues.push({
        field: 'weaponGroup',
        message: 'Grupo de arma inválido',
      })
    }
  }

  const granted = collectGrantedClassSpells(classDef, choices, characterLevel)
  for (const pending of granted.pending) {
    issues.push({
      field: `grantedSpellPicks.${pending.choiceId}`,
      message: `Escolha: ${pending.label}`,
    })
  }

  for (const pick of collectClassGrantedFeatPicks(
    classDef,
    characterLevel,
    choices,
    new Map(),
    featChoices,
  ).pending) {
    issues.push({
      field: `featurePicks.${pick.key}`,
      message: `Escolha: ${pick.label}`,
    })
  }

  issues.push(
    ...validateClassCatalogs(
      classDef,
      choices,
      characterLevel,
      intelligenceModifier ?? 0,
    ),
  )

  return issues
}

function applyRankMap(
  map: Map<string, ProficiencyRank>,
  key: string,
  rank: ProficiencyRank,
) {
  const current = map.get(key)
  map.set(key, current ? maxProficiencyRank(current, rank) : rank)
}

/** Dano de ataque furtivo do Ladino: 1d6 → +1d6 nos níveis 5, 11 e 17 */
export function sneakAttackDice(level: number): number {
  let dice = 1
  if (level >= 5) dice += 1
  if (level >= 11) dice += 1
  if (level >= 17) dice += 1
  return dice
}

function loreRankAtLevel(grant: LoreGrantRule, level: number): ProficiencyRank {
  if (grant.legendaryAtLevel != null && level >= grant.legendaryAtLevel) {
    return 'legendary'
  }
  if (grant.masterAtLevel != null && level >= grant.masterAtLevel) {
    return 'master'
  }
  if (grant.expertAtLevel != null && level >= grant.expertAtLevel) {
    return 'expert'
  }
  return grant.rank
}

function weaponSpecializationFromFeatures(
  features: CharacterClass['features'],
): 'none' | 'normal' | 'greater' {
  let tier: 'none' | 'normal' | 'greater' = 'none'
  for (const feature of features) {
    const name = (feature.originalName ?? '').toLowerCase()
    if (name === 'greater weapon specialization') return 'greater'
    if (name === 'weapon specialization') tier = 'normal'
  }
  return tier
}

export function resolveClassBenefits(
  classDef: CharacterClass,
  choices: ClassChoices,
  level: number,
  featChoices?: Record<string, string>,
): ResolvedClassBenefits {
  const attributeContributions: ModifierContribution[] = []
  const subclass = getSelectedSubclass(classDef, choices)

  if (choices.keyAttribute) {
    attributeContributions.push({
      id: `class-key-${choices.keyAttribute}`,
      sourceType: 'class',
      sourceId: classDef.id,
      sourceLabel: classDef.name,
      target: `attribute.${choices.keyAttribute}`,
      value: 1,
      bonusType: 'untyped',
      label: subclass
        ? `Atributo-chave (${classDef.name} · ${subclass.name})`
        : `Atributo-chave (${classDef.name})`,
    })
  }

  for (const attr of choices.creationFreeBoosts ?? []) {
    attributeContributions.push({
      id: `class-free-${attr}`,
      sourceType: 'freeBoost',
      sourceId: classDef.id,
      sourceLabel: 'Boosts livres (criação)',
      target: `attribute.${attr}`,
      value: 1,
      bonusType: 'untyped',
      label: `Boost livre de criação`,
    })
  }

  const skillRanks: Partial<Record<SkillId, ProficiencyRank>> = {}
  if (choices.skillChoice) {
    skillRanks[choices.skillChoice] = 'trained'
  }
  if (choices.subclassSkillChoice) {
    skillRanks[choices.subclassSkillChoice] = 'trained'
  }
  for (const skill of choices.additionalSkills) {
    skillRanks[skill] = 'trained'
  }
  const omitSkills = new Set(subclass?.omitClassSkillIds ?? [])
  for (const grant of classDef.skills.fixed ?? []) {
    if (grant.skillId) {
      const id = grant.skillId as SkillId
      if (omitSkills.has(id)) continue
      skillRanks[id] = maxProficiencyRank(skillRanks[id] ?? 'untrained', grant.rank)
    }
  }
  for (const grant of subclass?.skillGrants ?? []) {
    if (grant.skillId) {
      const id = grant.skillId as SkillId
      skillRanks[id] = maxProficiencyRank(skillRanks[id] ?? 'untrained', grant.rank)
    }
  }
  for (const skill of catalogGrantedSkills(classDef, choices)) {
    skillRanks[skill] = maxProficiencyRank(skillRanks[skill] ?? 'untrained', 'trained')
  }

  const lores: ResolvedClassBenefits['lores'] = []
  for (const grant of classDef.skills.loreGrants ?? []) {
    const id = grant.loreId ?? grant.id
    const name = grant.loreName ?? 'Conhecimento'
    lores.push({
      id,
      name,
      rank: loreRankAtLevel(grant, level),
      sourceLabel: classDef.name,
    })
  }
  for (const lore of catalogGrantedLores(classDef, choices, level)) {
    lores.push({
      id: lore.id,
      name: lore.name,
      rank: lore.rank,
      sourceLabel: classDef.name,
    })
  }

  let perceptionRank = classDef.perceptionRank
  const saveRanks = { ...classDef.saves }
  let classDcRank = classDef.classDcRank

  const attackMap = new Map<string, ProficiencyRank>()
  for (const rule of classDef.attacks) {
    attackMap.set(rule.category, rule.rank)
  }
  const defenseMap = new Map<string, ProficiencyRank>()
  for (const rule of classDef.defenses) {
    defenseMap.set(rule.category, rule.rank)
  }
  for (const rule of subclass?.defenseGrants ?? []) {
    applyRankMap(defenseMap, rule.category, rule.rank)
  }
  for (const rule of subclass?.attackGrants ?? []) {
    applyRankMap(attackMap, rule.category, rule.rank)
  }
  for (const grant of subclass?.saveGrants ?? []) {
    saveRanks[grant.save] = maxProficiencyRank(saveRanks[grant.save], grant.rank)
  }
  if (subclass?.id === 'path-warrior-of-legend') {
    defenseMap.delete('allArmor')
    applyRankMap(defenseMap, 'light', 'trained')
    applyRankMap(defenseMap, 'medium', 'trained')
    applyRankMap(defenseMap, 'unarmored', 'trained')
  }
  if (subclass?.id === 'method-reaper') {
    if (level >= 11) applyRankMap(attackMap, 'martial', 'expert')
    if (level >= 13) applyRankMap(defenseMap, 'medium', 'expert')
  }

  const feats: ResolvedClassBenefits['feats'] = []
  const specialAbilities: ResolvedClassBenefits['specialAbilities'] = []
  let speedBonus = 0
  let speedBonusUnarmored = 0
  const skipFeatureIds = new Set(subclass?.replacesFeatureIds ?? [])
  const activeFeatures = classDef.features.filter(
    (f) => f.level <= level && !skipFeatureIds.has(f.id),
  )
  if (subclass?.grantedFeat) {
    feats.push({
      id: `subclass-${subclass.id}-feat`,
      featId: subclass.grantedFeat.featId,
      featName: subclass.grantedFeat.featName,
      originalName: subclass.grantedFeat.originalName,
      featType: subclass.grantedFeat.featType,
      sourceLabel: subclass.name,
    })
  }

  if (subclass) {
    specialAbilities.push({
      id: `subclass-${subclass.id}`,
      name: subclass.name,
      description: `${subclass.description}\n\n${subclass.rulesSummary}`,
      sourceLabel: classDef.subclass?.label ?? classDef.name,
      actionType: 'passive',
    })
  }

  const secondarySubclass = getSelectedSecondarySubclass(classDef, choices)
  if (secondarySubclass?.grantedFeat) {
    feats.push({
      id: `secondary-subclass-${secondarySubclass.id}-feat`,
      featId: secondarySubclass.grantedFeat.featId,
      featName: secondarySubclass.grantedFeat.featName,
      originalName: secondarySubclass.grantedFeat.originalName,
      featType: secondarySubclass.grantedFeat.featType,
      sourceLabel: secondarySubclass.name,
    })
  }
  if (secondarySubclass) {
    specialAbilities.push({
      id: `secondary-subclass-${secondarySubclass.id}`,
      name: secondarySubclass.name,
      description: `${secondarySubclass.description}\n\n${secondarySubclass.rulesSummary}`,
      sourceLabel: classDef.secondarySubclass?.label ?? classDef.name,
      actionType: 'passive',
    })
  }

  for (const { catalog, option, role } of selectedCatalogOptions(
    classDef,
    choices,
    level,
  )) {
    const suffix =
      role === 'primary' ? ' (primária)' : role === 'prepared' ? '' : ''
    specialAbilities.push({
      id: `catalog-${catalog.id}-${option.id}`,
      name: `${option.name}${suffix}`,
      description: [option.description, option.rulesSummary]
        .filter(Boolean)
        .join('\n\n'),
      sourceLabel: catalog.label,
      actionType: option.actionType ?? 'passive',
    })
  }

  for (const feature of activeFeatures) {
    const isFeatPlaceholder =
      /-(feat|feat)-\d+$/.test(feature.id) ||
      feature.id.endsWith('-feat-1') ||
      feature.id.includes('-class-feat')

    let description = feature.description
    if (feature.id.includes('sneak-attack')) {
      const dice = sneakAttackDice(level)
      description = `${description}\n\nDano atual (nível ${level}): ${dice}d6 de precisão.`
    }
    if (feature.trigger) {
      description = `Gatilho: ${feature.trigger}\n\n${description}`
    }

    if (feature.actionType && feature.actionType !== 'passive') {
      specialAbilities.push({
        id: feature.id,
        name: feature.name,
        description,
        sourceLabel: classDef.name,
        actionType: feature.actionType,
      })
    } else if (!isFeatPlaceholder && !classFeatureIsFeatStub(feature)) {
      specialAbilities.push({
        id: feature.id,
        name: feature.name,
        description,
        sourceLabel: `${classDef.name} · nível ${feature.level}`,
        actionType: 'passive',
      })
    }

    for (const effect of feature.effects ?? []) {
      switch (effect.kind) {
        case 'saveRank':
          saveRanks[effect.save] = maxProficiencyRank(
            saveRanks[effect.save],
            effect.rank,
          )
          break
        case 'perceptionRank':
          perceptionRank = maxProficiencyRank(perceptionRank, effect.rank)
          break
        case 'classDcRank':
          classDcRank = maxProficiencyRank(classDcRank, effect.rank)
          break
        case 'defenseRank':
          for (const cat of effect.categories) {
            applyRankMap(defenseMap, cat, effect.rank)
          }
          break
        case 'attackRank':
          for (const cat of effect.categories) {
            applyRankMap(attackMap, cat, effect.rank)
          }
          break
        case 'grantedFeat':
          feats.push({
            id: `${feature.id}-feat`,
            featId: effect.featId,
            featName: effect.featName,
            originalName: effect.originalName,
            featType: effect.featType,
            sourceLabel: feature.name,
          })
          break
        case 'grantedFeatChoice': {
          if (
            !effectAllowedForSubclass(effect.whenSubclassIds, choices.subclassId)
          ) {
            break
          }
          const chosen = classFeaturePickValue(
            choices,
            effect.choiceId,
            featChoices,
          )
          if (chosen && effect.featIds.includes(chosen)) {
            feats.push({
              id: `${feature.id}-choice`,
              featId: chosen,
              featName: chosen,
              featType: 'class',
              sourceLabel: feature.name,
            })
          }
          break
        }
        case 'saveRankChoice': {
          const chosen = classFeaturePickValue(
            choices,
            effect.choiceId,
            featChoices,
          )
          const pool = saveChoicePool(effect, choices, featChoices, saveRanks)
          if (chosen && isSaveId(chosen) && pool.includes(chosen)) {
            saveRanks[chosen] = maxProficiencyRank(saveRanks[chosen], effect.rank)
          }
          break
        }
        case 'featureChoice': {
          if (
            !effectAllowedForSubclass(effect.whenSubclassIds, choices.subclassId)
          ) {
            break
          }
          const chosen = classFeaturePickValue(
            choices,
            effect.choiceId,
            featChoices,
          )
          const option = effect.options.find((opt) => opt.id === chosen)
          if (!option) break
          specialAbilities.push({
            id: `${feature.id}-${option.id}`,
            name: option.name,
            description: option.description,
            sourceLabel: feature.name,
            actionType: 'passive',
          })
          if (option.speedBonus) speedBonus += option.speedBonus
          break
        }
        case 'speedBonus': {
          let amount = effect.value
          if (
            effect.extraEveryLevels &&
            effect.extraAmount &&
            effect.extraEveryLevels > 0
          ) {
            amount +=
              effect.extraAmount *
              Math.floor(
                Math.max(0, level - feature.level) / effect.extraEveryLevels,
              )
          }
          if (effect.halfRoundedDownTo5) {
            amount = Math.floor(amount / 10) * 5
          }
          if (effect.unarmoredOnly) speedBonusUnarmored += amount
          else speedBonus += amount
          break
        }
      }
    }
  }

  const attackProficiencies: ResolvedClassProficiency[] = classDef.attacks.map(
    (rule) => ({
      key: rule.category,
      label: rule.label,
      rank: attackMap.get(rule.category) ?? rule.rank,
      sourceLabel: classDef.name,
    }),
  )
  for (const cat of ['unarmed', 'simple', 'martial', 'advanced'] as const) {
    if (attackMap.has(cat) && !attackProficiencies.some((a) => a.key === cat)) {
      const labels: Record<typeof cat, string> = {
        unarmed: 'Ataques desarmados',
        simple: 'Armas simples',
        martial: 'Armas marciais',
        advanced: 'Armas avançadas',
      }
      attackProficiencies.push({
        key: cat,
        label: labels[cat],
        rank: attackMap.get(cat)!,
        sourceLabel: subclass?.name ?? classDef.name,
      })
    }
  }

  const defenseProficiencies: ResolvedClassProficiency[] =
    classDef.defenses.map((rule) => ({
      key: rule.category,
      label: rule.label,
      rank: defenseMap.get(rule.category) ?? rule.rank,
      sourceLabel: classDef.name,
    }))

  for (const cat of ['light', 'medium', 'heavy', 'unarmored'] as const) {
    if (defenseMap.has(cat) && !defenseProficiencies.some((d) => d.key === cat)) {
      defenseProficiencies.push({
        key: cat,
        label:
          cat === 'unarmored'
            ? 'Defesa sem armadura'
            : `Armadura ${cat === 'light' ? 'leve' : cat === 'medium' ? 'média' : 'pesada'}`,
        rank: defenseMap.get(cat)!,
        sourceLabel: subclass?.name ?? classDef.name,
      })
    }
  }

  // Rufião / Avenger: expertise/maestria de armadura leve também sobem a média
  if (
    subclass &&
    (subclass.id === 'racket-ruffian' || subclass.id === 'racket-avenger')
  ) {
    const light = defenseMap.get('light')
    if (light && (light === 'expert' || light === 'master' || light === 'legendary')) {
      applyRankMap(defenseMap, 'medium', light)
      const existing = defenseProficiencies.find((d) => d.key === 'medium')
      if (existing) {
        existing.rank = maxProficiencyRank(existing.rank, light)
      } else {
        defenseProficiencies.push({
          key: 'medium',
          label: 'Armadura média',
          rank: light,
          sourceLabel: subclass.name,
        })
      }
    }
  }

  return {
    attributeContributions,
    skillRanks,
    lores,
    feats,
    specialAbilities,
    perceptionRank,
    saveRanks,
    classDcRank,
    attackProficiencies,
    defenseProficiencies,
    hitPointsPerLevel: classDef.hitPointsPerLevel,
    activeFeatures,
    subclass,
    issues: validateClassChoices(classDef, choices, undefined, level, featChoices),
    speedBonus,
    speedBonusUnarmored,
    weaponSpecialization: weaponSpecializationFromFeatures(activeFeatures),
  }
}

export function buildSaveStat(input: {
  key: 'fortitude' | 'reflex' | 'will'
  label: string
  attributeId: AttributeId
  attributeModifier: number
  rank: ProficiencyRank
  level: number
  className: string
}): {
  value: number
  rank: ProficiencyRank
  breakdown: Array<{ label: string; value: number | string }>
} {
  const prof = calculateProficiencyBonus(input.rank, input.level)
  const total = input.attributeModifier + prof
  return {
    value: total,
    rank: input.rank,
    breakdown: [
      {
        label: ATTRIBUTE_LABELS[input.attributeId],
        value: input.attributeModifier,
      },
      {
        label: `Proficiência ${PROFICIENCY_LABELS[input.rank]} (${input.className})`,
        value: prof,
      },
      { label: 'Total', value: total },
    ],
  }
}

export function buildPerceptionStat(input: {
  wisdomModifier: number
  rank: ProficiencyRank
  level: number
  className: string
}): {
  value: number
  rank: ProficiencyRank
  breakdown: Array<{ label: string; value: number | string }>
} {
  const prof = calculateProficiencyBonus(input.rank, input.level)
  const total = input.wisdomModifier + prof
  return {
    value: total,
    rank: input.rank,
    breakdown: [
      { label: 'Sabedoria', value: input.wisdomModifier },
      {
        label: `Proficiência ${PROFICIENCY_LABELS[input.rank]} (${input.className})`,
        value: prof,
      },
      { label: 'Total', value: total },
    ],
  }
}

export function getUnarmoredDefenseRank(
  benefits: ResolvedClassBenefits,
): ProficiencyRank | null {
  return getDefenseRankForCategory(benefits, 'unarmored')
}

/** Proficiência de defesa para a categoria da armadura equipada. */
export function getDefenseRankForCategory(
  benefits: ResolvedClassBenefits | null | undefined,
  category: DefenseProficiencyCategory,
): ProficiencyRank | null {
  if (!benefits) return null
  const specific = benefits.defenseProficiencies.find((d) => d.key === category)
  if (specific) return specific.rank
  const allArmor = benefits.defenseProficiencies.find((d) => d.key === 'allArmor')
  return allArmor?.rank ?? null
}

/** Proficiência de ataque para a categoria da arma (simples / marcial / …). */
export function getAttackRankForCategory(
  benefits: ResolvedClassBenefits | null | undefined,
  category: AttackProficiencyCategory,
): ProficiencyRank | null {
  if (!benefits) return null
  const specific = benefits.attackProficiencies.find((d) => d.key === category)
  return specific?.rank ?? null
}

const FIREARM_TRACK: Partial<
  Record<AttackProficiencyCategory, AttackProficiencyCategory>
> = {
  simple: 'simpleFirearm',
  martial: 'martialFirearm',
  advanced: 'advancedFirearm',
}

/**
 * Pistolero (e similares) têm trilha própria para armas de fogo e bestas.
 * Usa o melhor entre a categoria geral da arma e a trilha de arma de fogo.
 */
export function getAttackRankForWeapon(
  benefits: ResolvedClassBenefits | null | undefined,
  category: AttackProficiencyCategory,
  group?: string,
): ProficiencyRank | null {
  const base = getAttackRankForCategory(benefits, category)
  if (group !== 'firearm' && group !== 'crossbow') return base
  const track = FIREARM_TRACK[category]
  const firearmRank = track
    ? getAttackRankForCategory(benefits, track)
    : null
  if (!base) return firearmRank
  if (!firearmRank) return base
  return maxProficiencyRank(base, firearmRank)
}

const SAVE_IDS = ['fortitude', 'reflex', 'will'] as const
type SaveId = (typeof SAVE_IDS)[number]

function isSaveId(value: string): value is SaveId {
  return (SAVE_IDS as readonly string[]).includes(value)
}

function effectAllowedForSubclass(
  whenSubclassIds: string[] | undefined,
  subclassId: string | undefined,
): boolean {
  if (!whenSubclassIds?.length) return true
  return Boolean(subclassId && whenSubclassIds.includes(subclassId))
}

function saveChoicePool(
  effect: Extract<ClassFeatureEffect, { kind: 'saveRankChoice' }>,
  choices: ClassChoices,
  featChoices: Record<string, string> | undefined,
  saveRanks: Record<SaveId, ProficiencyRank>,
): SaveId[] {
  const base =
    effect.saveOptions && effect.saveOptions.length > 0
      ? effect.saveOptions
      : [...SAVE_IDS]
  const excluded = new Set<string>()
  for (const id of effect.excludeChoiceIds ?? []) {
    const value = classFeaturePickValue(choices, id, featChoices)
    if (value) excluded.add(value)
  }
  let pool = base.filter((save) => !excluded.has(save))
  if (effect.requireRank) {
    const eligible = pool.filter(
      (save) =>
        proficiencyRankValue(saveRanks[save]) >=
        proficiencyRankValue(effect.requireRank!),
    )
    if (eligible.length > 0) pool = eligible
  }
  return pool
}

export interface ClassFeaturePickView {
  choiceId: string
  label: string
  hint: string
  kind: 'feat' | 'save' | 'feature'
  options: Array<{ id: string; name: string; description?: string }>
  selected?: string
}

/** Escolhas de recurso de classe (Voz da Natureza, caminhos do monge, bênção). */
export function collectClassGrantedFeatPicks(
  classDef: CharacterClass | null | undefined,
  level: number,
  choices: ClassChoices,
  featsById: Map<string, Feat>,
  featChoices?: Record<string, string>,
): {
  views: ClassFeaturePickView[]
  picks: GrantedFeatPick[]
  pending: PendingSkillChoice[]
} {
  const views: ClassFeaturePickView[] = []
  const picks: GrantedFeatPick[] = []
  const pending: PendingSkillChoice[] = []
  if (!classDef) return { views, picks, pending }

  const classChoices = choices
  const fallbackFeatChoices = featChoices

  const runningSaves: Record<SaveId, ProficiencyRank> = {
    ...classDef.saves,
  }

  for (const feature of classDef.features) {
    if (feature.level > level) continue
    for (const effect of feature.effects ?? []) {
      if (effect.kind === 'saveRank') {
        runningSaves[effect.save] = maxProficiencyRank(
          runningSaves[effect.save],
          effect.rank,
        )
        continue
      }
      if (effect.kind === 'saveRankChoice') {
        const chosen = classFeaturePickValue(
          classChoices,
          effect.choiceId,
          fallbackFeatChoices,
        )
        const pool = saveChoicePool(
          effect,
          classChoices,
          fallbackFeatChoices,
          runningSaves,
        )
        const selectedOk = Boolean(chosen && isSaveId(chosen) && pool.includes(chosen))
        if (selectedOk && chosen && isSaveId(chosen)) {
          runningSaves[chosen] = maxProficiencyRank(
            runningSaves[chosen],
            effect.rank,
          )
        }
        const hint =
          effect.hint ??
          'Escolha a salvaguarda. O motor não escolhe por você.'
        const options = pool.map((id) => ({
          id,
          name: SAVE_LABELS[id],
        }))
        views.push({
          choiceId: effect.choiceId,
          label: feature.name,
          hint,
          kind: 'save',
          options,
          selected: selectedOk ? chosen : undefined,
        })
        if (!selectedOk) {
          pending.push({
            key: effect.choiceId,
            store: 'class',
            label: feature.name,
            hint,
            options: pool,
            optionLabels: Object.fromEntries(
              options.map((opt) => [opt.id, opt.name]),
            ),
            valueKind: 'save',
            selected: chosen,
          })
        }
        continue
      }
      if (effect.kind === 'featureChoice') {
        if (
          !effectAllowedForSubclass(
            effect.whenSubclassIds,
            classChoices.subclassId,
          )
        ) {
          continue
        }
        const chosen = classFeaturePickValue(
          classChoices,
          effect.choiceId,
          fallbackFeatChoices,
        )
        const selectedOk = Boolean(
          chosen && effect.options.some((opt) => opt.id === chosen),
        )
        const hint =
          effect.hint ??
          'Escolha uma opção. O motor não escolhe por você.'
        views.push({
          choiceId: effect.choiceId,
          label: effect.label ?? feature.name,
          hint,
          kind: 'feature',
          options: effect.options.map((opt) => ({
            id: opt.id,
            name: opt.name,
            description: opt.description,
          })),
          selected: selectedOk ? chosen : undefined,
        })
        if (!selectedOk) {
          pending.push({
            key: effect.choiceId,
            store: 'class',
            label: effect.label ?? feature.name,
            hint,
            options: effect.options.map((opt) => opt.id),
            optionLabels: Object.fromEntries(
              effect.options.map((opt) => [opt.id, opt.name]),
            ),
            optionDescriptions: Object.fromEntries(
              effect.options.map((opt) => [opt.id, opt.description]),
            ),
            valueKind: 'text',
            selected: chosen,
          })
        }
        continue
      }
      if (effect.kind !== 'grantedFeatChoice') continue
      if (
        !effectAllowedForSubclass(
          effect.whenSubclassIds,
          classChoices.subclassId,
        )
      ) {
        continue
      }
      const chosen = classFeaturePickValue(
        classChoices,
        effect.choiceId,
        fallbackFeatChoices,
      )
      const options: GrantedFeatPickOption[] = effect.featIds.map((id) => {
        const feat = featsById.get(id)
        return {
          id,
          name: feat?.name ?? id,
          originalName: feat?.originalName,
          level: feat?.level ?? feature.level,
          actionType: feat?.actionType,
          traits: feat?.traits ?? [],
          description: feat?.description ?? '',
          available: Boolean(feat) || featsById.size === 0,
          reasons: feat || featsById.size === 0 ? [] : ['Feito ausente no catálogo.'],
        }
      })
      const selectedOk = Boolean(chosen && effect.featIds.includes(chosen))
      const hint =
        effect.hint ??
        'Escolha o feito concedido. O motor não escolhe por você.'
      views.push({
        choiceId: effect.choiceId,
        label: effect.label ?? feature.name,
        hint,
        kind: 'feat',
        options: options.map((opt) => ({
          id: opt.id,
          name: opt.name,
          description: opt.description,
        })),
        selected: selectedOk ? chosen : undefined,
      })
      picks.push({
        key: `class:${effect.choiceId}`,
        parentFeatId: feature.id,
        parentName: effect.label ?? feature.name,
        hint,
        selectedFeatId: selectedOk ? chosen : undefined,
        options,
      })
      if (selectedOk) continue
      pending.push({
        key: effect.choiceId,
        store: 'class',
        label: effect.label ?? feature.name,
        hint,
        options: effect.featIds,
        optionLabels: Object.fromEntries(
          options.map((opt) => [opt.id, opt.name]),
        ),
        valueKind: 'feat',
        featOptions: options,
        selected: chosen,
      })
    }
  }

  return { views, picks, pending }
}

export function describeClassSkillSlots(
  classDef: CharacterClass,
  intelligenceModifier: number,
  choices?: ClassChoices,
): string {
  const slots = additionalClassSkillSlots(intelligenceModifier, classDef, choices)
  const choice = classDef.skills.choiceOptions
    ?.map((s) => SKILL_LABELS[s])
    .join(' ou ')
  const fixed = classDef.skills.fixed
    ?.map((g) => (g.skillId ? SKILL_LABELS[g.skillId as SkillId] : null))
    .filter(Boolean)
    .join(', ')
  const parts: string[] = []
  if (fixed) parts.push(`Treinado em ${fixed}`)
  if (choice) parts.push(`Escolha: ${choice}`)
  parts.push(`+ ${slots} perícias adicionais`)
  return parts.join(' · ')
}
