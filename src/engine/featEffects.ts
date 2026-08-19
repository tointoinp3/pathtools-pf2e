import type {
  AttackProficiencyCategory,
  AttributeId,
  DefenseProficiencyCategory,
  Feat,
  FeatEffect,
  FeatSelection,
  FeatSlot,
  FeatSpellcastingAccess,
  PendingSkillChoice,
  ProficiencyRank,
  ResolvedClassProficiency,
  SkillId,
  SkillRankSource,
  SpellRank,
  SpellTradition,
  SpellcastingFeatures,
  GrantedFeatPick,
  GrantedFeatPickOption,
  FeatCategory,
} from '@/types'
import { SKILL_IDS } from '@/types'
import {
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  SAVE_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
} from '@/utils/labels'
import { COMMON_LANGUAGES_PT } from '@/data/languages'
import { ADOPTED_ANCESTRY_OPTIONS } from '@/data/seeds/ancestryChoiceList'
import {
  calculateProficiencyBonus,
  maxProficiencyRank,
  nextProficiencyRank,
  proficiencyRankValue,
} from './proficiency'
import { effectsForFeat, isKnownSkillId } from './parseFeatEffects'
import type {
  CircumstanceBonusGrant,
  WeaponFamiliarityGrant,
} from './training'

type SaveId = 'fortitude' | 'reflex' | 'will'

const SAVE_IDS: SaveId[] = ['fortitude', 'reflex', 'will']
const TRADITION_IDS: SpellTradition[] = ['arcane', 'divine', 'occult', 'primal']
const TRADITION_SKILL: Record<SpellTradition, SkillId> = {
  arcane: 'arcana',
  divine: 'religion',
  occult: 'occultism',
  primal: 'nature',
}

function isSaveId(value: string): value is SaveId {
  return (SAVE_IDS as string[]).includes(value)
}

function isTraditionId(value: string): value is SpellTradition {
  return (TRADITION_IDS as string[]).includes(value)
}

const ATTACK_LABELS: Record<AttackProficiencyCategory, string> = {
  unarmed: 'Desarmado',
  simple: 'Armas simples',
  martial: 'Armas marciais',
  advanced: 'Armas avançadas',
  bomb: 'Bombas',
  simpleFirearm: 'Armas de fogo simples',
  martialFirearm: 'Armas de fogo marciais',
  advancedFirearm: 'Armas de fogo avançadas',
}

const DEFENSE_LABELS: Record<DefenseProficiencyCategory, string> = {
  unarmored: 'Defesa sem armadura',
  light: 'Armadura leve',
  medium: 'Armadura média',
  heavy: 'Armadura pesada',
  allArmor: 'Todas as armaduras',
}

export interface FeatSpellcastingSource {
  access: FeatSpellcastingAccess
  proficiencyRank: ProficiencyRank
  slotsByRank: Partial<Record<Exclude<SpellRank, 0>, number>>
  cantripsPerDay: number
  breadth: boolean
  features: SpellcastingFeatures
}

export interface AppliedFeatEffects {
  hpBonus: number
  hpParts: Array<{ label: string; value: number }>
  skillRanks: Partial<Record<SkillId, ProficiencyRank>>
  skillRankSources: Array<{ skillId: SkillId; source: SkillRankSource }>
  attackRanks: Partial<Record<AttackProficiencyCategory, ProficiencyRank>>
  defenseRanks: Partial<Record<DefenseProficiencyCategory, ProficiencyRank>>
  saveRanks: Partial<Record<'fortitude' | 'reflex' | 'will', ProficiencyRank>>
  perceptionRank: ProficiencyRank | null
  extraClassDcs: Array<{
    label: string
    rank: ProficiencyRank
    attributeId: AttributeId
    value: number
  }>
  spellcasting: FeatSpellcastingSource[]
  focusPoolBonus: number
  specialAbilities: Array<{
    id: string
    name: string
    description: string
    sourceLabel: string
    actionType?: string
  }>
  lores: Array<{
    id: string
    name: string
    rank: ProficiencyRank
    sourceLabel: string
  }>
  pendingSkillChoices: PendingSkillChoice[]
  languages: string[]
  speedBonus: number
  /** Bônus só sem armadura (Movimentos de Monge). */
  speedBonusUnarmored: number
  /** Maior bônus de feitos de ancestralidade (não soma Elfo Ágil + Ligeiro). */
  ancestrySpeedBonus: number
  ignoreArmorSpeedPenalty: boolean
  reduceOtherSpeedPenalties: number
  familiarAbilitySlotBonus: number
  weaponFamiliarities: WeaponFamiliarityGrant[]
  circumstanceBonuses: CircumstanceBonusGrant[]
  extraAncestryIds: string[]
  dyingMax: number | null
  untrainedProficiencyBonus: number | null
  bulkLimitBonus: number
  extraSignatureSpells: number
  grantedFeatPicks: GrantedFeatPick[]
  grantedChildFeatIds: string[]
  grantedFocusSpellOriginalNames: string[]
  grantedFocusSpellLabels: Record<string, string>
  sizeShift: number
}

const EMPTY: AppliedFeatEffects = {
  hpBonus: 0,
  hpParts: [],
  skillRanks: {},
  skillRankSources: [],
  attackRanks: {},
  defenseRanks: {},
  saveRanks: {},
  perceptionRank: null,
  extraClassDcs: [],
  spellcasting: [],
  focusPoolBonus: 0,
  specialAbilities: [],
  lores: [],
  pendingSkillChoices: [],
  languages: [],
  speedBonus: 0,
  speedBonusUnarmored: 0,
  ancestrySpeedBonus: 0,
  ignoreArmorSpeedPenalty: false,
  reduceOtherSpeedPenalties: 0,
  familiarAbilitySlotBonus: 0,
  weaponFamiliarities: [],
  circumstanceBonuses: [],
  extraAncestryIds: [],
  dyingMax: null,
  untrainedProficiencyBonus: null,
  bulkLimitBonus: 0,
  extraSignatureSpells: 0,
  grantedFeatPicks: [],
  grantedChildFeatIds: [],
  grantedFocusSpellOriginalNames: [],
  grantedFocusSpellLabels: {},
  sizeShift: 0,
}

export function earnedSelectedFeats(
  selections: FeatSelection[] | null | undefined,
  featsById: Map<string, Feat>,
  slots: FeatSlot[],
): Feat[] {
  const slotMap = new Map(slots.map((s) => [s.id, s]))
  const out: Feat[] = []
  for (const sel of selections ?? []) {
    const slot = slotMap.get(sel.slotId)
    if (!slot || slot.earned === false) continue
    const feat = featsById.get(sel.featId)
    if (feat) out.push(feat)
  }
  return out
}

export function archetypeSpellSlotsForTier(
  tier: 'basic' | 'expert' | 'master',
  characterLevel: number,
): Partial<Record<Exclude<SpellRank, 0>, number>> {
  const slots: Partial<Record<Exclude<SpellRank, 0>, number>> = {}
  const L = characterLevel
  if (L >= 1) slots[1] = 1
  if (L >= 6) slots[2] = 1
  if (L >= 8) slots[3] = 1
  if (tier === 'expert' || tier === 'master') {
    if (L >= 12) slots[4] = 1
    if (L >= 14) slots[5] = 1
    if (L >= 16) slots[6] = 1
  }
  if (tier === 'master') {
    if (L >= 18) slots[7] = 1
    if (L >= 20) slots[8] = 1
  }
  return slots
}

function applyBreadth(
  slots: Partial<Record<Exclude<SpellRank, 0>, number>>,
): Partial<Record<Exclude<SpellRank, 0>, number>> {
  const ranks = (Object.keys(slots) as unknown as Array<Exclude<SpellRank, 0>>)
    .map(Number)
    .filter((r) => (slots[r as Exclude<SpellRank, 0>] ?? 0) > 0)
    .sort((a, b) => b - a)
  const skip = new Set(ranks.slice(0, 2))
  const next = { ...slots }
  for (const rank of ranks) {
    if (skip.has(rank)) continue
    const key = rank as Exclude<SpellRank, 0>
    next[key] = (next[key] ?? 0) + 1
  }
  return next
}

function grantedFeatMaxLevel(
  maxLevel: number | 'halfCharacterLevel',
  characterLevel: number,
): number {
  if (maxLevel === 'halfCharacterLevel') {
    return Math.max(1, Math.floor(characterLevel / 2))
  }
  return maxLevel
}

function childFeatChoiceReasons(
  candidate: Feat,
  ctx: {
    classId: string
    category: FeatCategory
    maxLevel: number
    minLevel: number
    excludedTraits?: string[]
    selectedFeatIds: string[]
    currentPick?: string
    claimedByOther?: boolean
    attrMap: Record<AttributeId, number>
    skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
  },
): string[] {
  const reasons: string[] = []
  const category = ctx.category ?? 'class'
  if (candidate.category !== category) {
    reasons.push('Não é um feito desta categoria.')
  }
  if (candidate.classId && candidate.classId !== ctx.classId) {
    reasons.push('Feito de outra classe.')
  }
  if (!candidate.classId && category === 'class') {
    reasons.push('Não é um feito de classe.')
  }
  if (candidate.level > ctx.maxLevel) {
    reasons.push(`Requer feito de nv. ${candidate.level} (máx. ${ctx.maxLevel}).`)
  }
  if (candidate.level < ctx.minLevel) {
    reasons.push(`Nível mínimo ${ctx.minLevel}.`)
  }
  if (candidate.isDedication) {
    reasons.push('Dedicação não entra neste seletor.')
  }
  const excluded = (ctx.excludedTraits ?? []).map((t) => t.toLowerCase())
  if (
    excluded.length > 0 &&
    candidate.traits.some((t) => excluded.includes(t.toLowerCase()))
  ) {
    reasons.push('Traço não permitido neste feito.')
  }
  if (
    candidate.id !== ctx.currentPick &&
    ctx.selectedFeatIds.includes(candidate.id) &&
    !candidate.repeatable
  ) {
    reasons.push('Este feito já está na ficha.')
  }
  if (ctx.claimedByOther && !candidate.repeatable) {
    reasons.push('Este feito já foi escolhido em outro feito de arquétipo.')
  }
  for (const pre of candidate.prerequisites ?? []) {
    if (pre.kind === 'level' && pre.min > ctx.maxLevel) {
      reasons.push(
        `Pré-requisito: nível de classe ${pre.min} (aqui conta como nv. ${ctx.maxLevel}).`,
      )
    }
    if (pre.kind === 'feat' && !ctx.selectedFeatIds.includes(pre.featId)) {
      reasons.push(`Pré-requisito: ${pre.featName ?? 'outro feito'}.`)
    }
    if (pre.kind === 'class' && pre.classId !== ctx.classId) {
      reasons.push('Pré-requisito de classe não atendido.')
    }
    if (pre.kind === 'attribute') {
      const mod = ctx.attrMap[pre.attributeId] ?? 0
      if (mod < pre.min) {
        reasons.push(
          `Pré-requisito: ${ATTRIBUTE_LABELS[pre.attributeId]} ${pre.min >= 0 ? `+${pre.min}` : pre.min}.`,
        )
      }
    }
    if (pre.kind === 'skillRank' && ctx.skillRanks) {
      const rank = ctx.skillRanks[pre.skillId] ?? 'untrained'
      if (proficiencyRankValue(rank) < proficiencyRankValue(pre.rank)) {
        reasons.push(
          `Pré-requisito: ${PROFICIENCY_LABELS[pre.rank]} em ${SKILL_LABELS[pre.skillId]}.`,
        )
      }
    }
  }
  return reasons
}

export function collectGrantedChildFeatIds(
  parentFeats: Feat[],
  featChoices: Record<string, string> | undefined,
  featsById: Map<string, Feat>,
): string[] {
  const ids: string[] = []
  const occurrence = new Map<string, number>()
  for (const feat of parentFeats) {
    const n = occurrence.get(feat.id) ?? 0
    occurrence.set(feat.id, n + 1)
    const prefix = n === 0 ? feat.id : `${feat.id}#${n}`
    for (const effect of effectsForFeat(feat)) {
      if (effect.kind === 'grantedFeat') {
        if (featsById.has(effect.featId) && !ids.includes(effect.featId)) {
          ids.push(effect.featId)
        }
        continue
      }
      if (effect.kind !== 'grantedFeatChoice') continue
      const chosen = featChoices?.[`${prefix}:${effect.choiceId}`]
      if (chosen && featsById.has(chosen) && !ids.includes(chosen)) {
        ids.push(chosen)
      }
    }
  }
  return ids
}

function bumpRank(
  map: Partial<Record<string, ProficiencyRank>>,
  key: string,
  rank: ProficiencyRank,
) {
  const current = map[key]
  map[key] = current ? maxProficiencyRank(current, rank) : rank
}

function rankFromList(
  list: ResolvedClassProficiency[] | undefined,
  key: string,
): ProficiencyRank | null {
  return list?.find((p) => p.key === key)?.rank ?? null
}

export function applyFeatEffects(input: {
  feats: Feat[]
  level: number
  attrMap: Record<AttributeId, number>
  baseDefense?: ResolvedClassProficiency[]
  baseAttack?: ResolvedClassProficiency[]
  baseSaves?: Partial<Record<SaveId, ProficiencyRank>>
  featChoices?: Record<string, string>
  alreadyTrained?: ReadonlySet<SkillId>
  baseSkillRanks?: Partial<Record<SkillId, ProficiencyRank>>
  featCatalog?: Feat[]
  /**
   * GM Core (Arquétipos grátis): feitos que somam PV por feito de arquétipo
   * (Resiliência de multiclasse) contam no máximo metade do nível.
   */
  capArchetypeScalingAtHalfLevel?: boolean
}): AppliedFeatEffects {
  const {
    feats,
    level,
    attrMap,
    baseDefense,
    baseAttack,
    baseSaves,
    featChoices,
    alreadyTrained,
    baseSkillRanks,
    featCatalog = [],
    capArchetypeScalingAtHalfLevel = false,
  } = input
  if (feats.length === 0) return EMPTY

  const result: AppliedFeatEffects = {
    hpBonus: 0,
    hpParts: [],
    skillRanks: {},
    skillRankSources: [],
    attackRanks: {},
    defenseRanks: {},
    saveRanks: {},
    perceptionRank: null,
    extraClassDcs: [],
    spellcasting: [],
    focusPoolBonus: 0,
    specialAbilities: [],
    lores: [],
    pendingSkillChoices: [],
    languages: [],
    speedBonus: 0,
    speedBonusUnarmored: 0,
    ancestrySpeedBonus: 0,
    ignoreArmorSpeedPenalty: false,
    reduceOtherSpeedPenalties: 0,
    familiarAbilitySlotBonus: 0,
    weaponFamiliarities: [],
    circumstanceBonuses: [],
    extraAncestryIds: [],
    dyingMax: null,
    untrainedProficiencyBonus: null,
    bulkLimitBonus: 0,
    extraSignatureSpells: 0,
    grantedFeatPicks: [],
    grantedChildFeatIds: [],
    grantedFocusSpellOriginalNames: [],
    grantedFocusSpellLabels: {},
    sizeShift: 0,
  }

  function isTrained(skillId: SkillId): boolean {
    if (alreadyTrained?.has(skillId)) return true
    const rank = result.skillRanks[skillId] ?? baseSkillRanks?.[skillId]
    return rank != null && rank !== 'untrained'
  }

  function currentSkillRank(skillId: SkillId): ProficiencyRank {
    const fromFeat = result.skillRanks[skillId]
    const fromBase = baseSkillRanks?.[skillId]
    if (fromFeat && fromBase) return maxProficiencyRank(fromFeat, fromBase)
    return fromFeat ?? fromBase ?? 'untrained'
  }

  function grantSkill(
    feat: Feat,
    skillId: SkillId,
    rank: ProficiencyRank,
    replaceIfTrained: boolean | undefined,
    replaceKey: string,
    originalLabel: string,
  ) {
    if (replaceIfTrained && isTrained(skillId)) {
      const chosenRaw = featChoices?.[replaceKey]
      const chosen =
        chosenRaw && isKnownSkillId(chosenRaw) ? chosenRaw : undefined
      if (chosen) {
        bumpRank(result.skillRanks, chosen, rank)
        result.skillRankSources.push({
          skillId: chosen,
          source: { label: feat.name, rank },
        })
        return
      }
      const options = SKILL_IDS.filter((id) => id !== skillId && !isTrained(id))
      result.pendingSkillChoices.push({
        key: replaceKey,
        store: 'feat',
        label: feat.name,
        hint: `Já treinado em ${originalLabel}. Escolha outra perícia.`,
        options: options.length > 0 ? options : SKILL_IDS.filter((id) => id !== skillId),
        valueKind: 'skill',
      })
      return
    }
    bumpRank(result.skillRanks, skillId, rank)
    result.skillRankSources.push({
      skillId,
      source: { label: feat.name, rank },
    })
  }

  function currentSaveRank(save: SaveId): ProficiencyRank {
    const fromFeat = result.saveRanks[save]
    const fromClass = baseSaves?.[save]
    if (fromFeat && fromClass) return maxProficiencyRank(fromFeat, fromClass)
    return fromFeat ?? fromClass ?? 'untrained'
  }

  function skillChoiceOptions(
    listed?: SkillId[],
    requireRank?: ProficiencyRank,
    minRank?: ProficiencyRank,
  ): SkillId[] {
    const pool = listed && listed.length > 0 ? listed : [...SKILL_IDS]
    if (minRank) {
      const eligible = pool.filter(
        (id) =>
          proficiencyRankValue(currentSkillRank(id)) >=
          proficiencyRankValue(minRank),
      )
      return eligible.length > 0 ? eligible : pool
    }
    if (requireRank) {
      const eligible = pool.filter((id) => currentSkillRank(id) === requireRank)
      return eligible.length > 0 ? eligible : pool
    }
    if (listed && listed.length > 0) {
      const untrained = listed.filter((id) => !isTrained(id))
      if (untrained.length > 0) return untrained
      const others = SKILL_IDS.filter((id) => !isTrained(id))
      return others.length > 0 ? others : SKILL_IDS.filter((id) => !listed.includes(id))
    }
    const untrained = SKILL_IDS.filter((id) => !isTrained(id))
    return untrained.length > 0 ? untrained : [...SKILL_IDS]
  }

  const spellById = new Map<string, FeatSpellcastingSource>()
  const countByArchetype = new Map<string, number>()
  for (const feat of feats) {
    if (!feat.archetypeId) continue
    countByArchetype.set(
      feat.archetypeId,
      (countByArchetype.get(feat.archetypeId) ?? 0) + 1,
    )
  }

  const run = (effect: FeatEffect, feat: Feat, prefix: string) => {
    switch (effect.kind) {
      case 'hpFlat':
        result.hpBonus += effect.value
        result.hpParts.push({ label: feat.name, value: effect.value })
        break
      case 'hpPerLevel': {
        const value = effect.value * level
        result.hpBonus += value
        result.hpParts.push({
          label: `${feat.name} (${effect.value} × nv. ${level})`,
          value,
        })
        break
      }
      case 'hpPerArchetypeFeat': {
        const raw = countByArchetype.get(effect.archetypeId) ?? 0
        const cap = capArchetypeScalingAtHalfLevel
          ? Math.max(1, Math.floor(level / 2))
          : raw
        const count = Math.min(raw, cap)
        const value = effect.perFeat * count
        if (value <= 0) break
        result.hpBonus += value
        result.hpParts.push({
          label:
            count < raw
              ? `${feat.name} (${effect.perFeat} × ${count} feitos; teto nv./2)`
              : `${feat.name} (${effect.perFeat} × ${count} feitos)`,
          value,
        })
        break
      }
      case 'skillRank':
        if (effect.minLevel != null && level < effect.minLevel) break
        if (effect.bumpIfAlready && currentSkillRank(effect.skillId) === effect.rank) {
          const next = nextProficiencyRank(effect.rank)
          if (next) {
            bumpRank(result.skillRanks, effect.skillId, next)
            result.skillRankSources.push({
              skillId: effect.skillId,
              source: { label: feat.name, rank: next },
            })
          }
          break
        }
        grantSkill(
          feat,
          effect.skillId,
          effect.rank,
          effect.replaceIfTrained,
          `${prefix}:replace:${effect.skillId}`,
          SKILL_LABELS[effect.skillId],
        )
        break
      case 'skillRankChoice': {
        const key = `${prefix}:${effect.choiceId}`
        const chosenRaw = featChoices?.[key]
        const chosen =
          chosenRaw && isKnownSkillId(chosenRaw) ? chosenRaw : undefined
        const options = skillChoiceOptions(effect.skillOptions, effect.requireRank)
        if (chosen) {
          if (effect.requireRank) {
            const current = currentSkillRank(chosen)
            if (
              current === effect.requireRank ||
              proficiencyRankValue(current) >= proficiencyRankValue(effect.rank)
            ) {
              bumpRank(result.skillRanks, chosen, effect.rank)
              result.skillRankSources.push({
                skillId: chosen,
                source: { label: feat.name, rank: effect.rank },
              })
              break
            }
          } else {
            if (
              effect.bumpIfAlready &&
              currentSkillRank(chosen) === effect.rank
            ) {
              const next = nextProficiencyRank(effect.rank)
              if (next) {
                bumpRank(result.skillRanks, chosen, next)
                result.skillRankSources.push({
                  skillId: chosen,
                  source: { label: feat.name, rank: next },
                })
              }
              break
            }
            grantSkill(
              feat,
              chosen,
              effect.rank,
              effect.replaceIfTrained,
              `${key}:replace`,
              SKILL_LABELS[chosen],
            )
            break
          }
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint: effect.hint ?? 'Escolha a perícia deste feito.',
          options,
          valueKind: 'skill',
        })
        break
      }
      case 'lore': {
        let rank: ProficiencyRank = effect.rank ?? 'trained'
        if (effect.bumpIfAlready) {
          const existing = result.lores.find(
            (l) => l.name.toLowerCase() === effect.loreName.toLowerCase(),
          )
          if (existing && existing.rank === rank) {
            const next = nextProficiencyRank(rank)
            if (next) rank = next
          }
        }
        const slug = effect.loreName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
        result.lores.push({
          id: `feat-lore-${feat.id}-${slug}`,
          name: effect.loreName,
          rank,
          sourceLabel: feat.name,
        })
        break
      }
      case 'attackRank':
        for (const cat of effect.categories) {
          bumpRank(result.attackRanks, cat, effect.rank)
        }
        break
      case 'defenseRank':
        for (const cat of effect.categories) {
          bumpRank(result.defenseRanks, cat, effect.rank)
        }
        break
      case 'defenseRankIfAlready': {
        const already = effect.check.every((cat) => {
          const base = rankFromList(baseDefense, cat)
          return base != null && base !== 'untrained'
        })
        if (!already) break
        for (const cat of effect.then.categories) {
          bumpRank(result.defenseRanks, cat, effect.then.rank)
        }
        break
      }
      case 'saveRank':
        bumpRank(result.saveRanks, effect.save, effect.rank)
        break
      case 'saveRankChoice': {
        const key = `${prefix}:${effect.choiceId}`
        const pool =
          effect.saveOptions && effect.saveOptions.length > 0
            ? effect.saveOptions
            : SAVE_IDS
        const eligible = effect.requireRank
          ? pool.filter(
              (save) =>
                proficiencyRankValue(currentSaveRank(save)) >=
                proficiencyRankValue(effect.requireRank!),
            )
          : pool
        const options = eligible.length > 0 ? eligible : pool
        const chosenRaw = featChoices?.[key]
        const chosen = chosenRaw && isSaveId(chosenRaw) ? chosenRaw : undefined
        if (chosen && options.includes(chosen)) {
          bumpRank(result.saveRanks, chosen, effect.rank)
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint:
            effect.hint ??
            'Escolha a salvaguarda deste feito. O motor não escolhe por você.',
          options,
          valueKind: 'save',
        })
        break
      }
      case 'perceptionRank':
        result.perceptionRank = result.perceptionRank
          ? maxProficiencyRank(result.perceptionRank, effect.rank)
          : effect.rank
        break
      case 'classDc': {
        if (effect.minLevel != null && level < effect.minLevel) break
        const ids =
          effect.attributeIds && effect.attributeIds.length > 0
            ? effect.attributeIds
            : [effect.attributeId]
        let bestId = ids[0] ?? effect.attributeId
        let bestMod = attrMap[bestId] ?? 0
        for (const id of ids) {
          const mod = attrMap[id] ?? 0
          if (mod > bestMod) {
            bestId = id
            bestMod = mod
          }
        }
        const bonus = calculateProficiencyBonus(effect.rank, level)
        const value = 10 + bonus + bestMod
        const existingDc = result.extraClassDcs.find((dc) => dc.label === effect.label)
        if (existingDc) {
          if (proficiencyRankValue(effect.rank) > proficiencyRankValue(existingDc.rank)) {
            existingDc.rank = effect.rank
            existingDc.attributeId = bestId
            existingDc.value = value
          }
        } else {
          result.extraClassDcs.push({
            label: effect.label,
            rank: effect.rank,
            attributeId: bestId,
            value,
          })
        }
        const stored = result.extraClassDcs.find((dc) => dc.label === effect.label)!
        const storedBonus = calculateProficiencyBonus(stored.rank, level)
        const storedMod = attrMap[stored.attributeId] ?? 0
        const dcAbilityId = `class-dc-${effect.label}`
        result.specialAbilities = result.specialAbilities.filter((a) => a.id !== dcAbilityId)
        result.specialAbilities.push({
          id: dcAbilityId,
          name: `${stored.label} ${stored.value}`,
          description: `${PROFICIENCY_LABELS[stored.rank]} · ${ATTRIBUTE_LABELS[stored.attributeId]} ${storedMod >= 0 ? `+${storedMod}` : storedMod} · 10 + ${storedBonus} (proficiência) + ${storedMod} (atributo).`,
          sourceLabel: feat.name,
          actionType: 'passive',
        })
        break
      }
      case 'spellcasting': {
        let access = effect.access
        if (access.traditionChoiceId) {
          const key = `${prefix}:${access.traditionChoiceId}`
          const traditionOptions =
            access.traditionOptions && access.traditionOptions.length > 0
              ? access.traditionOptions
              : TRADITION_IDS
          const chosenRaw = featChoices?.[key]
          const chosen =
            chosenRaw &&
            isTraditionId(chosenRaw) &&
            traditionOptions.includes(chosenRaw)
              ? chosenRaw
              : undefined
          if (!chosen) {
            result.pendingSkillChoices.push({
              key,
              store: 'feat',
              label: feat.name,
              hint:
                access.traditionChoiceHint ??
                'Escolha a tradição mágica. A conjuração só entra depois desta escolha.',
              options: [...traditionOptions],
              optionLabels: Object.fromEntries(
                traditionOptions.map((t) => [t, TRADITION_LABELS[t]]),
              ),
              valueKind: 'tradition',
            })
            break
          }
          access = { ...access, tradition: chosen }
          if (access.grantTraditionSkill !== false) {
            grantSkill(
              feat,
              TRADITION_SKILL[chosen],
              'trained',
              true,
              `${key}:skill`,
              `${SKILL_LABELS[TRADITION_SKILL[chosen]]} (${TRADITION_LABELS[chosen]})`,
            )
          }
        }
        if (access.attributeChoiceId) {
          const key = `${prefix}:${access.attributeChoiceId}`
          const options =
            access.attributeOptions && access.attributeOptions.length > 0
              ? access.attributeOptions
              : (['intelligence', 'charisma'] as AttributeId[])
          const chosenRaw = featChoices?.[key]
          const chosen =
            chosenRaw &&
            (options as string[]).includes(chosenRaw)
              ? (chosenRaw as AttributeId)
              : undefined
          if (!chosen) {
            result.pendingSkillChoices.push({
              key,
              store: 'feat',
              label: feat.name,
              hint:
                access.attributeChoiceHint ??
                'Escolha o atributo-chave desta conjuração. O motor não escolhe por você.',
              options: [...options],
              valueKind: 'attribute',
            })
            break
          }
          access = { ...access, attributeId: chosen }
        }
        const existing = spellById.get(access.id)
        const proficiencyRank = existing
          ? maxProficiencyRank(existing.proficiencyRank, access.proficiencyRank)
          : access.proficiencyRank
        const source: FeatSpellcastingSource = existing ?? {
          access,
          proficiencyRank,
          slotsByRank: {},
          cantripsPerDay: 0,
          breadth: false,
          features: { ...access.features },
        }
        source.access = {
          ...access,
          tradition: existing?.access.tradition ?? access.tradition,
          attributeId: existing?.access.attributeId ?? access.attributeId,
        }
        source.proficiencyRank = proficiencyRank
        source.cantripsPerDay = Math.max(
          source.cantripsPerDay,
          access.cantripsPerDay ?? 0,
        )
        source.features = { ...source.features, ...access.features }
        spellById.set(access.id, source)
        break
      }
      case 'spellcastingTier': {
        const source = spellById.get(effect.sourceId)
        if (!source) break
        const slots = archetypeSpellSlotsForTier(effect.tier, level)
        source.slotsByRank = { ...source.slotsByRank, ...slots }
        if (effect.tier === 'expert') {
          source.proficiencyRank = maxProficiencyRank(
            source.proficiencyRank,
            'expert',
          )
        }
        if (effect.tier === 'master') {
          source.proficiencyRank = maxProficiencyRank(
            source.proficiencyRank,
            'master',
          )
        }
        break
      }
      case 'spellSlotBreadth': {
        const source = spellById.get(effect.sourceId)
        if (source) source.breadth = true
        break
      }
      case 'focusPool':
        result.focusPoolBonus += effect.points ?? 1
        break
      case 'grantedFocusSpell': {
        const name = effect.originalName.trim()
        if (
          name &&
          !result.grantedFocusSpellOriginalNames.includes(name)
        ) {
          result.grantedFocusSpellOriginalNames.push(name)
        }
        if (name && effect.label) {
          result.grantedFocusSpellLabels[name] = effect.label
        }
        break
      }
      case 'specialAbility':
        result.specialAbilities.push({
          id: `${feat.id}-${effect.name}`,
          name: effect.name,
          description: effect.description,
          sourceLabel: feat.name,
          actionType: effect.actionType ?? feat.actionType ?? 'passive',
        })
        break
      case 'language':
        if (!result.languages.includes(effect.name)) {
          result.languages.push(effect.name)
        }
        break
      case 'speedBonus':
        if (effect.stackGroup === 'ancestry') {
          result.ancestrySpeedBonus = Math.max(
            result.ancestrySpeedBonus,
            effect.value,
          )
        } else if (effect.unarmoredOnly) {
          result.speedBonusUnarmored += effect.value
        } else {
          result.speedBonus += effect.value
        }
        break
      case 'ignoreArmorSpeedPenalty':
        result.ignoreArmorSpeedPenalty = true
        break
      case 'reduceOtherSpeedPenalties':
        result.reduceOtherSpeedPenalties = Math.max(
          result.reduceOtherSpeedPenalties,
          effect.value,
        )
        break
      case 'familiarAbilitySlots':
        result.familiarAbilitySlotBonus += effect.extra
        break
      case 'weaponFamiliarity':
        result.weaponFamiliarities.push({
          sourceLabel: feat.name,
          weapons: effect.weapons ?? [],
          traits: effect.traits ?? [],
          groups: (effect.groups ?? []) as WeaponFamiliarityGrant['groups'],
          martialAsSimple: effect.martialAsSimple ?? true,
          advancedAsMartial: effect.advancedAsMartial ?? false,
          critSpecAtLevel: effect.critSpecAtLevel,
          accessUncommonTrait: effect.accessUncommonTrait,
        })
        break
      case 'circumstanceBonus':
        result.circumstanceBonuses.push({
          sourceLabel: feat.name,
          value: effect.value,
          appliesTo: effect.appliesTo,
        })
        break
      case 'skillSelect': {
        const key = `${prefix}:${effect.choiceId}`
        const options = skillChoiceOptions(
          effect.skillOptions,
          undefined,
          effect.minRank,
        )
        const chosenRaw = featChoices?.[key]
        const chosen =
          chosenRaw && isKnownSkillId(chosenRaw) ? chosenRaw : undefined
        if (chosen && options.includes(chosen)) {
          const skillLabel = SKILL_LABELS[chosen]
          const name = (effect.abilityName ?? feat.name).replace(
            /\{skill\}/g,
            skillLabel,
          )
          const description = (
            effect.abilityDescription ?? feat.description
          ).replace(/\{skill\}/g, skillLabel)
          result.specialAbilities.push({
            id: `${prefix}-skill-select`,
            name,
            description,
            sourceLabel: feat.name,
            actionType: feat.actionType ?? 'passive',
          })
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint: effect.hint ?? 'Escolha a perícia deste feito. O motor não escolhe por você.',
          options,
          valueKind: 'skill',
        })
        break
      }
      case 'loreChoice': {
        const key = `${prefix}:${effect.choiceId}`
        const chosen = featChoices?.[key]?.trim()
        if (chosen) {
          let rank: ProficiencyRank = effect.rank ?? 'trained'
          const bumps = (effect.increaseAtLevels ?? []).filter(
            (L) => level >= L,
          ).length
          for (let i = 0; i < bumps; i += 1) {
            const next = nextProficiencyRank(rank)
            if (!next) break
            rank = next
          }
          const slug = chosen
            .toLowerCase()
            .replace(/[^a-z0-9à-ú]+/gi, '-')
            .replace(/^-|-$/g, '')
          result.lores.push({
            id: `feat-lore-${prefix}-${slug}`,
            name: chosen,
            rank,
            sourceLabel: feat.name,
          })
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint: effect.hint ?? 'Nomeie o Conhecimento. O motor não escolhe por você.',
          options: [],
          valueKind: 'lore',
          inputKind: 'text',
          placeholder: 'Ex.: Engenharia, Heraldica, Cidade de Absalom…',
        })
        break
      }
      case 'languageChoice': {
        let count = effect.count ?? 1
        if (effect.extraAtRank && effect.skillId) {
          const current = currentSkillRank(effect.skillId)
          const currentVal = proficiencyRankValue(current)
          for (const [rank, extra] of Object.entries(effect.extraAtRank)) {
            if (
              extra &&
              currentVal >= proficiencyRankValue(rank as ProficiencyRank)
            ) {
              count += extra
            }
          }
        }
        for (let i = 0; i < count; i += 1) {
          const key = `${prefix}:${effect.choiceId}:${i}`
          const chosen = featChoices?.[key]?.trim()
          if (chosen) {
            if (!result.languages.includes(chosen)) {
              result.languages.push(chosen)
            }
            continue
          }
          result.pendingSkillChoices.push({
            key,
            store: 'feat',
            label: `${feat.name} (${i + 1}/${count})`,
            hint:
              effect.hint ??
              'Escolha o idioma. O motor não escolhe por você.',
            options: [...COMMON_LANGUAGES_PT],
            valueKind: 'language',
            inputKind: 'text',
            placeholder: 'Ou escreva outro idioma…',
          })
        }
        break
      }
      case 'ancestryChoice': {
        const key = `${prefix}:${effect.choiceId}`
        const options = ADOPTED_ANCESTRY_OPTIONS.map((o) => o.id)
        const labels = Object.fromEntries(
          ADOPTED_ANCESTRY_OPTIONS.map((o) => [o.id, o.label]),
        )
        const chosenRaw = featChoices?.[key]
        const chosen =
          chosenRaw && options.includes(chosenRaw) ? chosenRaw : undefined
        if (chosen) {
          if (!result.extraAncestryIds.includes(chosen)) {
            result.extraAncestryIds.push(chosen)
          }
          const label = labels[chosen] ?? chosen
          result.specialAbilities.push({
            id: `${prefix}-adopted`,
            name: `Ancestralidade adotada: ${label}`,
            description: `Você pode selecionar feitos de ${label}, além dos da sua ancestralidade.`,
            sourceLabel: feat.name,
            actionType: 'passive',
          })
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint:
            effect.hint ??
            'Escolha a ancestralidade adotada. O motor não escolhe por você.',
          options,
          optionLabels: labels,
          valueKind: 'ancestry',
        })
        break
      }
      case 'extraAncestryFeatSlot':
        break
      case 'saveOrPerceptionChoice': {
        const key = `${prefix}:${effect.choiceId}`
        const options = ['fortitude', 'reflex', 'will', 'perception']
        const chosenRaw = featChoices?.[key]
        const chosen =
          chosenRaw && options.includes(chosenRaw) ? chosenRaw : undefined
        const rank =
          effect.rankAtLevel && level >= effect.rankAtLevel.level
            ? effect.rankAtLevel.rank
            : effect.rank
        if (chosen) {
          if (chosen === 'perception') {
            result.perceptionRank = result.perceptionRank
              ? maxProficiencyRank(result.perceptionRank, rank)
              : rank
          } else if (isSaveId(chosen)) {
            bumpRank(result.saveRanks, chosen, rank)
          }
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint:
            effect.hint ??
            'Escolha Fortitude, Reflexos, Vontade ou Percepção.',
          options,
          valueKind: 'saveOrPerception',
          optionLabels: {
            fortitude: SAVE_LABELS.fortitude,
            reflex: SAVE_LABELS.reflex,
            will: SAVE_LABELS.will,
            perception: 'Percepção',
          },
        })
        break
      }
      case 'textChoice': {
        const key = `${prefix}:${effect.choiceId}`
        const options = effect.options.map((o) => o.id)
        const labels = Object.fromEntries(
          effect.options.map((o) => [o.id, o.label]),
        )
        const chosenRaw = featChoices?.[key]
        const chosen =
          chosenRaw && options.includes(chosenRaw) ? chosenRaw : undefined
        if (chosen) {
          const choiceLabel = labels[chosen] ?? chosen
          const name = (effect.abilityName ?? feat.name).replace(
            /\{choice\}/g,
            choiceLabel,
          )
          const description = (
            effect.abilityDescription ?? feat.description
          ).replace(/\{choice\}/g, choiceLabel)
          result.specialAbilities.push({
            id: `${prefix}-text-choice`,
            name,
            description,
            sourceLabel: feat.name,
            actionType: feat.actionType ?? 'passive',
          })
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint: effect.hint ?? 'Faça a escolha deste feito. O motor não escolhe por você.',
          options,
          optionLabels: labels,
          valueKind: 'text',
        })
        break
      }
      case 'nextArmorTraining': {
        const order: DefenseProficiencyCategory[] = ['light', 'medium', 'heavy']
        const rankOf = (cat: DefenseProficiencyCategory): ProficiencyRank => {
          const fromFeat = result.defenseRanks[cat]
          const fromClass = rankFromList(baseDefense, cat)
          if (fromFeat && fromClass) return maxProficiencyRank(fromFeat, fromClass)
          return fromFeat ?? fromClass ?? 'untrained'
        }
        let granted: DefenseProficiencyCategory = 'heavy'
        for (const cat of order) {
          if (rankOf(cat) === 'untrained') {
            granted = cat
            break
          }
        }
        const rank: ProficiencyRank = level >= 13 ? 'expert' : 'trained'
        bumpRank(result.defenseRanks, granted, rank)
        break
      }
      case 'martialOrAdvancedChoice': {
        const martialFeat = result.attackRanks.martial
        const martialClass = rankFromList(baseAttack, 'martial')
        const martial =
          martialFeat && martialClass
            ? maxProficiencyRank(martialFeat, martialClass)
            : (martialFeat ?? martialClass ?? 'untrained')
        const rank: ProficiencyRank =
          effect.expertAtLevel != null && level >= effect.expertAtLevel
            ? 'expert'
            : 'trained'
        if (martial === 'untrained') {
          bumpRank(result.attackRanks, 'martial', rank)
          break
        }
        const key = `${prefix}:${effect.choiceId}`
        const chosen = featChoices?.[key]?.trim()
        if (chosen) {
          result.specialAbilities.push({
            id: `${prefix}-advanced-weapon`,
            name: `Arma avançada: ${chosen}`,
            description: `Você é ${PROFICIENCY_LABELS[rank].toLowerCase()} com ${chosen}.`,
            sourceLabel: feat.name,
            actionType: 'passive',
          })
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint:
            effect.hint ??
            'Nomeie a arma avançada. O motor não escolhe por você.',
          options: [],
          valueKind: 'text',
          inputKind: 'text',
          placeholder: 'Ex.: Espada de duas mãos, kusarigama…',
        })
        break
      }
      case 'dyingMax':
        result.dyingMax =
          result.dyingMax == null
            ? effect.value
            : Math.max(result.dyingMax, effect.value)
        break
      case 'untrainedProficiency': {
        const bonus =
          level >= 7 ? level : level >= 5 ? level - 1 : Math.max(0, level - 2)
        result.untrainedProficiencyBonus = Math.max(
          result.untrainedProficiencyBonus ?? 0,
          bonus,
        )
        break
      }
      case 'bulkLimitBonus':
        result.bulkLimitBonus += effect.value
        break
      case 'extraSignatureSpells':
        result.extraSignatureSpells += effect.count
        break
      case 'grantedFeatChoice': {
        const key = `${prefix}:${effect.choiceId}`
        const maxLevel = grantedFeatMaxLevel(effect.maxLevel, level)
        const minLevel = effect.minLevel ?? 1
        const category = effect.category ?? 'class'
        const chosen = featChoices?.[key]
        const selectedFeatIds = feats.map((f) => f.id)
        const options: GrantedFeatPickOption[] = featCatalog
          .filter(
            (candidate) =>
              candidate.category === category &&
              candidate.classId === effect.classId &&
              !candidate.isDedication &&
              candidate.level >= minLevel &&
              candidate.level <= 20,
          )
          .map((candidate) => {
            const claimedByOther = Object.entries(featChoices ?? {}).some(
              ([otherKey, value]) =>
                otherKey !== key && value === candidate.id,
            )
            const reasons = childFeatChoiceReasons(candidate, {
              classId: effect.classId,
              category,
              maxLevel,
              minLevel,
              excludedTraits: effect.excludedTraits,
              selectedFeatIds,
              currentPick: chosen,
              claimedByOther,
              attrMap,
              skillRanks: {
                ...baseSkillRanks,
                ...result.skillRanks,
              },
            })
            return {
              id: candidate.id,
              name: candidate.name,
              originalName: candidate.originalName,
              level: candidate.level,
              actionType: candidate.actionType,
              traits: candidate.traits,
              description: candidate.description,
              available: reasons.length === 0,
              reasons,
            }
          })
          .sort((a, b) => {
            if (a.available !== b.available) return a.available ? -1 : 1
            if (a.level !== b.level) return a.level - b.level
            return a.name.localeCompare(b.name, 'pt-BR')
          })
        const selectedOk =
          chosen &&
          options.some((opt) => opt.id === chosen && opt.available)
        result.grantedFeatPicks.push({
          key,
          parentFeatId: feat.id,
          parentName: feat.name,
          hint:
            effect.hint ??
            'Escolha o feito concedido. O motor não escolhe por você.',
          selectedFeatId: selectedOk ? chosen : undefined,
          options,
        })
        if (selectedOk && chosen) {
          if (!result.grantedChildFeatIds.includes(chosen)) {
            result.grantedChildFeatIds.push(chosen)
          }
          break
        }
        result.pendingSkillChoices.push({
          key,
          store: 'feat',
          label: feat.name,
          hint:
            effect.hint ??
            'Escolha o feito de classe concedido por este arquétipo.',
          options: options.filter((opt) => opt.available).map((opt) => opt.id),
          optionLabels: Object.fromEntries(
            options.map((opt) => [opt.id, `${opt.name} (nv. ${opt.level})`]),
          ),
          valueKind: 'feat',
          inputKind: 'select',
          featOptions: options,
          selected: chosen,
        })
        break
      }
      case 'grantedFeat':
        if (effect.minLevel && level < effect.minLevel) break
        if (!result.grantedChildFeatIds.includes(effect.featId)) {
          result.grantedChildFeatIds.push(effect.featId)
        }
        break
      case 'sizeShift':
        result.sizeShift += effect.value
        break
    }
  }

  const firstPass: FeatEffect['kind'][] = [
    'hpFlat',
    'hpPerLevel',
    'hpPerArchetypeFeat',
    'skillRank',
    'skillRankChoice',
    'lore',
    'attackRank',
    'defenseRank',
    'defenseRankIfAlready',
    'saveRank',
    'saveRankChoice',
    'perceptionRank',
    'classDc',
    'spellcasting',
    'focusPool',
    'grantedFocusSpell',
    'specialAbility',
    'language',
    'speedBonus',
    'ignoreArmorSpeedPenalty',
    'reduceOtherSpeedPenalties',
    'familiarAbilitySlots',
    'weaponFamiliarity',
    'circumstanceBonus',
    'skillSelect',
    'loreChoice',
    'languageChoice',
    'ancestryChoice',
    'extraAncestryFeatSlot',
    'saveOrPerceptionChoice',
    'textChoice',
    'nextArmorTraining',
    'martialOrAdvancedChoice',
    'dyingMax',
    'untrainedProficiency',
    'bulkLimitBonus',
    'extraSignatureSpells',
    'grantedFeatChoice',
    'grantedFeat',
    'sizeShift',
  ]
  const secondPass: FeatEffect['kind'][] = [
    'spellcastingTier',
    'spellSlotBreadth',
  ]

  const occurrence = new Map<string, number>()
  function prefixFor(feat: Feat): string {
    const n = occurrence.get(feat.id) ?? 0
    occurrence.set(feat.id, n + 1)
    return n === 0 ? feat.id : `${feat.id}#${n}`
  }

  for (const feat of feats) {
    const prefix = prefixFor(feat)
    for (const effect of effectsForFeat(feat)) {
      if (firstPass.includes(effect.kind)) run(effect, feat, prefix)
    }
  }
  occurrence.clear()
  for (const feat of feats) {
    const prefix = prefixFor(feat)
    for (const effect of effectsForFeat(feat)) {
      if (secondPass.includes(effect.kind)) run(effect, feat, prefix)
    }
  }

  for (const source of spellById.values()) {
    if (source.breadth) {
      source.slotsByRank = applyBreadth(source.slotsByRank)
    }
    result.spellcasting.push(source)
  }

  return result
}

export function collectFeatsForEffects(
  earned: Feat[],
  grantedFeatIds: Array<string | undefined | null>,
  featsById: Map<string, Feat>,
): Feat[] {
  const seen = new Set<string>()
  const out: Feat[] = []
  for (const feat of earned) {
    if (seen.has(feat.id) && !feat.repeatable) continue
    if (!feat.repeatable) seen.add(feat.id)
    out.push(feat)
  }
  for (const id of grantedFeatIds) {
    if (!id || seen.has(id)) continue
    const feat = featsById.get(id)
    if (!feat) continue
    seen.add(id)
    out.push(feat)
  }
  return out
}

export function extraAncestryIdsFromFeatChoices(
  featChoices?: Record<string, string> | null,
): string[] {
  if (!featChoices) return []
  const out: string[] = []
  for (const [key, value] of Object.entries(featChoices)) {
    if (!value.startsWith('ancestry-')) continue
    if (!/:ancestry(?:#\d+)?$/.test(key) && !key.includes(':ancestry')) continue
    if (!out.includes(value)) out.push(value)
  }
  return out
}

export function mergeSkillRanksFromFeats(
  base: Partial<Record<SkillId, ProficiencyRank>>,
  featRanks: Partial<Record<SkillId, ProficiencyRank>>,
): Partial<Record<SkillId, ProficiencyRank>> {
  const next = { ...base }
  for (const [skillId, rank] of Object.entries(featRanks) as Array<
    [SkillId, ProficiencyRank]
  >) {
    const current = next[skillId]
    next[skillId] = current ? maxProficiencyRank(current, rank) : rank
  }
  return next
}

export function mergeProficiencyList(
  base: ResolvedClassProficiency[],
  extra: Partial<Record<string, ProficiencyRank>>,
  labels: Record<string, string>,
  sourceLabel: string,
): ResolvedClassProficiency[] {
  const list = base.map((p) => ({ ...p }))
  for (const [key, rank] of Object.entries(extra)) {
    if (!rank) continue
    const existing = list.find((p) => p.key === key)
    if (existing) {
      existing.rank = maxProficiencyRank(existing.rank, rank)
    } else {
      list.push({
        key,
        label: labels[key] ?? key,
        rank,
        sourceLabel,
      })
    }
  }
  return list
}

export const FEAT_ATTACK_LABELS = ATTACK_LABELS
export const FEAT_DEFENSE_LABELS = DEFENSE_LABELS

export function describeFeatSkillRanks(
  ranks: Partial<Record<SkillId, ProficiencyRank>>,
): string {
  return (Object.entries(ranks) as Array<[SkillId, ProficiencyRank]>)
    .map(([id, rank]) => `${SKILL_LABELS[id]} (${PROFICIENCY_LABELS[rank]})`)
    .join(', ')
}
