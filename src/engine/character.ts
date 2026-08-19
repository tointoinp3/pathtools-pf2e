import type {
  Ancestry,
  AttributeId,
  Background,
  BackgroundChoices,
  Character,
  CharacterClass,
  ClassChoices,
  ContentSource,
  DamageTypeId,
  DerivedStat,
  Feat,
  GrantedFeat,
  Heritage,
  ModifierContribution,
  ModifierTarget,
  ProficiencyRank,
  ResolvedAttribute,
  ResolvedCharacterSheet,
  ResolvedClassDc,
  ResolvedCustomSkill,
  ResolvedLore,
  ResolvedSkill,
  ResolvedSpellcastingAccess,
  SkillId,
  ConnectionTarget,
  ResolvedConnection,
} from '@/types'
import {
  ATTRIBUTE_IDS,
  DAMAGE_TYPE_LABELS,
  HERO_POINTS_MAX_BASE,
  HERO_POINTS_START_BASE,
  MYTHIC_POINTS_MAX,
  MYTHIC_POINTS_START,
  SKILL_IDS,
  SKILL_ATTRIBUTES,
} from '@/types'
import {
  ATTRIBUTE_LABELS,
  formatSourceLabel,
  formatSpeedMeters,
  PROFICIENCY_LABELS,
} from '@/utils/labels'
import {
  additionalSpeedBreakdown,
  emptyAncestryChoices,
  formatAncestryDisplayName,
  resolveAncestryBenefits,
} from './ancestry'
import { calculateArmorClass } from './armorClass'
import { resolveBackgroundBenefits } from './background'
import {
  buildPerceptionStat,
  buildSaveStat,
  emptyClassChoices,
  getDefenseRankForCategory,
  getUnarmoredDefenseRank,
  resolveClassBenefits,
  collectClassGrantedFeatPicks,
} from './class'
import {
  armorCheckPenaltyApplies,
  applyWeaponSpecialization,
  improvedFistDamageDie,
  resolveEquipment,
} from './equipment'
import { applyApexToAttributes, collectWornMagic } from './wornMagic'
import {
  applyAttackAdjustments,
  mutagenUnarmedAttacks,
  resolveActiveItemEffects,
} from './activeItems'
import {
  resolveConnections,
  resolveCreatureSize,
  sumConnectionBonus,
  sumConnectionBonuses,
  applyWeaponConnections,
  mergeTypedDefenses,
  collectConnectionImmunities,
} from './connections'
import { resolveArchetypeProgress } from './archetypes'
import { resolveClassSignature } from './classSignatures'
import {
  applyCatalogWeaponExtras,
  resolveCatalogKit,
} from './catalogKit'
import {
  applyFeatEffects,
  collectFeatsForEffects,
  collectGrantedChildFeatIds,
  earnedSelectedFeats,
  FEAT_ATTACK_LABELS,
  FEAT_DEFENSE_LABELS,
  mergeProficiencyList,
  mergeSkillRanksFromFeats,
} from './featEffects'
import {
  getFeatSlots,
  selectionsToGrantedFeats,
  catalogFeatIdsForGrants,
  hydrateGrantedFeat,
} from './feats'
import {
  calculateMythicProficiencyBonus,
  isMythicCharacter,
  mythicAbilitiesForCalling,
  resolveMythicCalling,
} from './mythic'
import { calculateHitPoints } from './hitPoints'
import { applySkillIncreases } from './progression'
import { calculateProficiencyBonus, maxProficiencyRank } from './proficiency'
import {
  dualClassHitPointsPerLevel,
  resolveAutomaticBonusProgression,
  skillPotencyBonus,
} from './variantRules'
import { calculateSkillModifier } from './skills'
import { resolveSpellcastingAccess } from './spellcasting'
import {
  addSkillRank,
  applyHeritageReplaceGrants,
  emptySkillRankBook,
  trainedSkillSet,
} from './skillRanks'
import { resolveDeityBenefits } from './deity'
import {
  formatFamiliarityRules,
  formatFamiliaritySummary,
  parseCircumstanceBonusesFromText,
  sumAlwaysOnCircumstance,
} from './training'
import {
  applyConditionsToClassDc,
  applyConditionsToSpellcasting,
  applyConditionsToWeapons,
  applyConditionSlicesToDerived,
  applyConditionSlicesToModifier,
  resolveConditionEffects,
} from './conditions'

function parseSpeedFeet(value: number | string): number {
  if (typeof value === 'number') return value
  const text = String(value)
  const meters = text.match(/(-?[\d.,]+)\s*m/)
  if (meters) {
    return Math.round(Number(meters[1]!.replace(',', '.')) / 0.3)
  }
  const feet = text.match(/(-?\d+)/)
  return feet ? Number(feet[1]) : 0
}

function applyAdditionalSpeedConnections(
  stat: DerivedStat,
  resolved: ResolvedConnection[],
): DerivedStat {
  const kinds: Array<{ target: ConnectionTarget; label: string }> = [
    { target: 'speed.climb', label: 'Escalada' },
    { target: 'speed.swim', label: 'Natação' },
    { target: 'speed.fly', label: 'Voo' },
  ]
  const allBonus = sumConnectionBonus(resolved, 'speed.all')
  let breakdown = [...(stat.breakdown ?? [])]
  let changed = false
  for (const kind of kinds) {
    const specific = sumConnectionBonus(resolved, kind.target)
    const existingIdx = breakdown.findIndex((row) => row.label === kind.label)
    const hasExisting = existingIdx >= 0
    const fromAll = hasExisting ? allBonus.total : 0
    const extra = specific.total + fromAll
    if (extra === 0) continue
    changed = true
    const prevNum = hasExisting ? parseSpeedFeet(breakdown[existingIdx]!.value) : 0
    const next = prevNum + extra
    if (hasExisting) {
      breakdown[existingIdx] = { label: kind.label, value: formatSpeedMeters(next) }
    } else {
      breakdown.push({ label: kind.label, value: formatSpeedMeters(next) })
    }
    for (const part of specific.parts) {
      breakdown.push({ label: `Conexão: ${part.label}`, value: part.value })
    }
  }
  return changed ? { ...stat, breakdown } : stat
}

function applyConnectionBonus(
  stat: DerivedStat,
  bonus: { total: number; parts: Array<{ label: string; value: number }> },
): DerivedStat {
  if (bonus.total === 0 || bonus.parts.length === 0) return stat
  if (stat.value == null && stat.pending) return stat

  const nextValue = (stat.value ?? 0) + bonus.total
  return {
    ...stat,
    value: nextValue,
    breakdown: [
      ...(stat.breakdown ?? []),
      ...bonus.parts.map((p) => ({
        label: `Conexão: ${p.label}`,
        value: p.value,
      })),
    ],
  }
}

function extrasFromConnections(
  resolved: ResolvedConnection[],
  target: ConnectionTarget,
  contributionTarget?: ModifierTarget,
): ModifierContribution[] {
  return sumConnectionBonus(resolved, target).parts.map((part, index) => ({
    id: `connection-${target}-${index}`,
    sourceType: 'connection',
    sourceId: part.label,
    sourceLabel: part.label,
    target: contributionTarget ?? (target as ModifierTarget),
    value: part.value,
    bonusType: 'untyped',
    label: `Conexão: ${part.label}`,
  }))
}

function applyClassDcConnections(
  classDc: ResolvedClassDc | null,
  resolved: ResolvedConnection[],
): ResolvedClassDc | null {
  if (!classDc || classDc.value == null) return classDc
  const bonus = sumConnectionBonus(resolved, 'classDc')
  if (bonus.total === 0) return classDc
  const value = classDc.value + bonus.total
  return {
    ...classDc,
    value,
    breakdown: [
      ...classDc.breakdown.filter((row) => row.label !== 'Total'),
      ...bonus.parts.map((part) => ({
        label: `Conexão: ${part.label}`,
        value: part.value,
      })),
      { label: 'Total', value },
    ],
  }
}

function applySpellcastingConnections(
  access: ResolvedSpellcastingAccess,
  resolved: ResolvedConnection[],
): ResolvedSpellcastingAccess {
  const attack = sumConnectionBonus(resolved, 'spell.attack')
  const dc = sumConnectionBonus(resolved, 'spell.dc')
  const focus = sumConnectionBonus(resolved, 'focus.pool')
  const cantrips = sumConnectionBonus(resolved, 'spell.cantrips')
  const slots = sumConnectionBonus(resolved, 'spell.slots')
  if (
    attack.total === 0 &&
    dc.total === 0 &&
    focus.total === 0 &&
    cantrips.total === 0 &&
    slots.total === 0
  ) {
    return access
  }

  const nextFocusMax =
    focus.total === 0
      ? access.focusPointsMax
      : Math.max(0, (access.focusPointsMax ?? 0) + focus.total)
  const grantFocusPool = focus.total > 0 && (nextFocusMax ?? 0) > 0

  let slotsByRank = access.slotsByRank
  let highestSlotRank = access.highestSlotRank
  if (slots.total !== 0) {
    const current = { ...(access.slotsByRank ?? {}) }
    const rank = (
      access.highestSlotRank && access.highestSlotRank >= 1
        ? access.highestSlotRank
        : Math.max(0, ...Object.keys(current).map(Number))
    ) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    if (rank >= 1) {
      current[rank] = Math.max(0, (current[rank] ?? 0) + slots.total)
      slotsByRank = current
      highestSlotRank = Math.max(highestSlotRank ?? 0, rank)
    }
  }

  const cantripsPerDay =
    cantrips.total === 0 && access.cantripsPerDay == null
      ? access.cantripsPerDay
      : Math.max(0, (access.cantripsPerDay ?? 0) + cantrips.total)

  return {
    ...access,
    spellAttack:
      access.spellAttack != null
        ? access.spellAttack + attack.total
        : access.spellAttack,
    spellDc:
      access.spellDc != null ? access.spellDc + dc.total : access.spellDc,
    spellAttackExtras:
      attack.parts.length > 0
        ? attack.parts.map((part) => ({
            label: `Conexão: ${part.label}`,
            value: part.value,
          }))
        : undefined,
    spellDcExtras:
      dc.parts.length > 0
        ? dc.parts.map((part) => ({
            label: `Conexão: ${part.label}`,
            value: part.value,
          }))
        : undefined,
    focusPointsMax: nextFocusMax,
    focusPoolExtras:
      focus.parts.length > 0
        ? focus.parts.map((part) => ({
            label: `Conexão: ${part.label}`,
            value: part.value,
          }))
        : undefined,
    cantripsPerDay,
    slotsByRank,
    highestSlotRank,
    sources: access.sources.map((source, index) => {
      const withCombat = {
        ...source,
        spellAttack:
          source.spellAttack != null
            ? source.spellAttack + attack.total
            : source.spellAttack,
        spellDc:
          source.spellDc != null ? source.spellDc + dc.total : source.spellDc,
        spellAttackExtras:
          attack.parts.length > 0
            ? [
                ...(source.spellAttackExtras ?? []),
                ...attack.parts.map((part) => ({
                  label: `Conexão: ${part.label}`,
                  value: part.value,
                })),
              ]
            : source.spellAttackExtras,
        spellDcExtras:
          dc.parts.length > 0
            ? [
                ...(source.spellDcExtras ?? []),
                ...dc.parts.map((part) => ({
                  label: `Conexão: ${part.label}`,
                  value: part.value,
                })),
              ]
            : source.spellDcExtras,
      }
      if (index !== 0) return withCombat
      const nextSlots = { ...(withCombat.slotsByRank ?? {}) }
      if (slots.total !== 0) {
        const rank = (
          access.highestSlotRank && access.highestSlotRank >= 1
            ? access.highestSlotRank
            : Math.max(0, ...Object.keys(nextSlots).map(Number))
        ) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
        if (rank >= 1) {
          nextSlots[rank] = Math.max(0, (nextSlots[rank] ?? 0) + slots.total)
        }
      }
      return {
        ...withCombat,
        cantripsPerDay:
          cantrips.total === 0
            ? withCombat.cantripsPerDay
            : Math.max(0, (withCombat.cantripsPerDay ?? 0) + cantrips.total),
        slotsByRank: slots.total === 0 ? withCombat.slotsByRank : nextSlots,
      }
    }),
    features: grantFocusPool
      ? {
          ...access.features,
          focusPool: true,
          focusPoolBase: Math.max(
            access.features.focusPoolBase ?? 0,
            nextFocusMax ?? 0,
          ),
        }
      : access.features,
  }
}

function applyItemSaveBonus(
  stat: DerivedStat,
  bonus: number,
  label = 'Runa resiliente',
): DerivedStat {
  if (bonus === 0 || stat.value == null) return stat
  return {
    ...stat,
    value: stat.value + bonus,
    breakdown: [
      ...(stat.breakdown ?? []),
      { label, value: bonus },
    ],
  }
}

function appendDerivedParts(
  stat: DerivedStat,
  parts: Array<{ label: string; value: number }>,
): DerivedStat {
  if (parts.length === 0 || stat.value == null) return stat
  const extra = parts.reduce((sum, p) => sum + p.value, 0)
  const breakdown = (stat.breakdown ?? []).filter((b) => b.label !== 'Total')
  const value = stat.value + extra
  return {
    ...stat,
    value,
    breakdown: [...breakdown, ...parts, { label: 'Total', value }],
  }
}

/** CD de classe = 10 + bônus de proficiência + modificador do atributo-chave */
function resolveClassDc(input: {
  characterClass?: CharacterClass | null
  classChoices: ClassChoices
  classDcRank?: ProficiencyRank
  level: number
  attrMap: Record<AttributeId, number>
  withoutLevel?: boolean
}): ResolvedClassDc | null {
  const { characterClass, classChoices, classDcRank, level, attrMap } = input
  if (!characterClass || !classDcRank) return null

  const label = `CD de ${characterClass.name}`
  const keyAttributeId = classChoices.keyAttribute
  const proficiencyBonus = calculateProficiencyBonus(
    classDcRank,
    level,
    input.withoutLevel ? { withoutLevel: true } : undefined,
  )

  if (!keyAttributeId) {
    return {
      label,
      rank: classDcRank,
      value: null,
      pending: true,
      pendingReason: 'Escolha o atributo-chave da classe para calcular a CD.',
      proficiencyBonus,
      breakdown: [
        { label: 'Base', value: 10 },
        {
          label: `${PROFICIENCY_LABELS[classDcRank]} (nv. ${level})`,
          value: proficiencyBonus,
        },
        { label: 'Atributo-chave', value: '—' },
      ],
    }
  }

  const keyAttributeModifier = attrMap[keyAttributeId] ?? 0
  const value = 10 + proficiencyBonus + keyAttributeModifier

  return {
    label,
    rank: classDcRank,
    value,
    pending: false,
    keyAttributeId,
    keyAttributeModifier,
    proficiencyBonus,
    breakdown: [
      { label: 'Base', value: 10 },
      {
        label: `${PROFICIENCY_LABELS[classDcRank]} (nv. ${level})`,
        value: proficiencyBonus,
      },
      {
        label: ATTRIBUTE_LABELS[keyAttributeId],
        value: keyAttributeModifier,
      },
      { label: 'Total', value },
    ],
  }
}

export interface ResolveCharacterContext {
  character: Character
  background?: Background | null
  ancestry?: Ancestry | null
  heritage?: Heritage | null
  characterClass?: CharacterClass | null
  secondClass?: CharacterClass | null
  sources?: ContentSource[]
  /** Catálogo de feitos (para resolver seleções) */
  feats?: Feat[]
  /** GM Core pág. 84 — slots extras de arquétipo nos pares. */
  freeArchetype?: boolean
  /** War of Immortals — chamado, pontos míticos e feitos extras. */
  mythicRules?: boolean
  ancestryParagon?: boolean
  dualClass?: boolean
  gradualAbilityBoosts?: boolean
  automaticBonusProgression?: boolean
  proficiencyWithoutLevel?: boolean
}

function emptyBackgroundChoices(): BackgroundChoices {
  return {
    attributeBoosts: {},
    skillChoices: {},
    loreChoices: {},
    customLoreNames: {},
    featChoices: {},
  }
}

function heritageGrantedFeatIds(
  granted: Array<{ featId?: string }>,
  heritage: Heritage | null | undefined,
  heritageChoices: Record<string, string>,
): string[] {
  const ids: string[] = []
  for (const g of granted) {
    if (g.featId) ids.push(g.featId)
  }
  if (!heritage) return ids
  for (const choice of heritage.choices ?? []) {
    const selected = heritageChoices[choice.id]
    if (selected?.startsWith('feat-')) ids.push(selected)
  }
  return ids
}

function automaticGrantedFeatIds(
  grants: Array<{ featId?: string; originalName?: string; featName: string }>,
  featCatalog: Feat[],
  heritage?: Heritage | null,
  heritageChoices?: Record<string, string>,
): string[] {
  const fromCatalog = catalogFeatIdsForGrants(grants, featCatalog)
  const fromHeritage = heritageGrantedFeatIds(
    grants,
    heritage,
    heritageChoices ?? {},
  )
  return [...new Set([...fromCatalog, ...fromHeritage])]
}

function featsApplyingEffects(
  earned: Feat[],
  grantedFeatIds: Array<string | undefined | null>,
  featsById: Map<string, Feat>,
  featChoices?: Record<string, string>,
): Feat[] {
  const parents = collectFeatsForEffects(earned, grantedFeatIds, featsById)
  const childIds = collectGrantedChildFeatIds(parents, featChoices, featsById)
  return collectFeatsForEffects(parents, childIds, featsById)
}

function fillSkillBookFromBenefits(
  book: ReturnType<typeof emptySkillRankBook>,
  input: {
    ancRanks: Partial<Record<SkillId, ProficiencyRank>>
    ancLabel: string
    bgRanks: Partial<Record<SkillId, ProficiencyRank>>
    bgLabel: string
    classRanks: Partial<Record<SkillId, ProficiencyRank>>
    classLabel: string
    deityRanks?: Partial<Record<SkillId, ProficiencyRank>>
    deityLabel?: string
  },
) {
  for (const [skillId, rank] of Object.entries(input.ancRanks) as Array<
    [SkillId, ProficiencyRank]
  >) {
    addSkillRank(book, skillId, rank, input.ancLabel)
  }
  for (const [skillId, rank] of Object.entries(input.bgRanks) as Array<
    [SkillId, ProficiencyRank]
  >) {
    addSkillRank(book, skillId, rank, input.bgLabel)
  }
  for (const [skillId, rank] of Object.entries(input.classRanks) as Array<
    [SkillId, ProficiencyRank]
  >) {
    addSkillRank(book, skillId, rank, input.classLabel)
  }
  if (input.deityRanks && input.deityLabel) {
    for (const [skillId, rank] of Object.entries(input.deityRanks) as Array<
      [SkillId, ProficiencyRank]
    >) {
      addSkillRank(book, skillId, rank, input.deityLabel)
    }
  }
}

/** Ranks de perícia concedidos (antes dos aumentos de progressão) */
export function resolveGrantedSkillRanks(
  character: Character,
  background?: Background | null,
  ancestry?: Ancestry | null,
  heritage?: Heritage | null,
  characterClass?: CharacterClass | null,
  featCatalog: Feat[] = [],
  options?: {
    freeArchetype?: boolean
    mythicRules?: boolean
    ancestryParagon?: boolean
    secondClass?: CharacterClass | null
  },
): Partial<Record<SkillId, ProficiencyRank>> {
  const bgChoices = character.backgroundChoices ?? emptyBackgroundChoices()
  const ancChoices = character.ancestryChoices ?? emptyAncestryChoices()
  const classChoices = character.classChoices ?? emptyClassChoices()

  const bgBenefits =
    background && character.backgroundId === background.id
      ? resolveBackgroundBenefits(background, bgChoices, character.level)
      : null

  const activeHeritage =
    heritage && character.heritageId === heritage.id ? heritage : null

  const ancBenefits =
    ancestry && character.ancestryId === ancestry.id
      ? resolveAncestryBenefits(
          ancestry,
          ancChoices,
          activeHeritage,
          character.level,
        )
      : null

  const classBenefits =
    characterClass && character.classId === characterClass.id
      ? resolveClassBenefits(characterClass, classChoices, character.level)
      : null

  const deityBenefits = resolveDeityBenefits(
    character,
    characterClass,
    featCatalog,
  )
  const deityRanks: Partial<Record<SkillId, ProficiencyRank>> = {}
  if (deityBenefits.skillId) {
    deityRanks[deityBenefits.skillId] = 'trained'
  }

  const book = emptySkillRankBook()
  fillSkillBookFromBenefits(book, {
    ancRanks: ancBenefits?.skillRanks ?? {},
    ancLabel: activeHeritage?.name ?? ancestry?.name ?? 'Ancestralidade',
    bgRanks: bgBenefits?.skillRanks ?? {},
    bgLabel: background?.name ?? 'Origem',
    classRanks: classBenefits?.skillRanks ?? {},
    classLabel: characterClass?.name ?? 'Classe',
    deityRanks,
    deityLabel: deityBenefits.deity?.name ?? 'Divindade',
  })
  applyHeritageReplaceGrants(
    book,
    activeHeritage,
    ancChoices,
    character.level,
  )

  if (featCatalog.length > 0) {
    const featsById = new Map(featCatalog.map((f) => [f.id, f]))
    const slots = getFeatSlots(character, characterClass, {
      freeArchetype: options?.freeArchetype,
      mythicRules: options?.mythicRules,
      mythicCallingId: character.mythicCallingId,
      ancestryParagon: options?.ancestryParagon,
      secondClass: options?.secondClass,
      selections: character.featSelections,
      feats: featCatalog,
    })
    const earned = earnedSelectedFeats(
      character.featSelections,
      featsById,
      slots,
    )
    const dummyAttr = Object.fromEntries(
      ATTRIBUTE_IDS.map((id) => [id, 0]),
    ) as Record<AttributeId, number>
    const featEffects = applyFeatEffects({
      feats: featsApplyingEffects(
        earned,
        automaticGrantedFeatIds(
          [
            ...(ancBenefits?.feats ?? []),
            ...(bgBenefits?.feats ?? []),
            ...(classBenefits?.feats ?? []),
          ],
          featCatalog,
          activeHeritage,
          ancChoices.heritageChoices,
        ),
        featsById,
        character.featChoices,
      ),
      level: character.level,
      attrMap: dummyAttr,
      baseDefense: classBenefits?.defenseProficiencies,
      featChoices: character.featChoices,
      alreadyTrained: trainedSkillSet(book.ranks),
      baseSaves: classBenefits?.saveRanks,
      baseSkillRanks: book.ranks,
      baseAttack: classBenefits?.attackProficiencies,
      featCatalog,
    })
    return mergeSkillRanksFromFeats(book.ranks, featEffects.skillRanks)
  }

  return book.ranks
}

export function resolveAttributeModifiers(
  character: Character,
  background?: Background | null,
  ancestry?: Ancestry | null,
  heritage?: Heritage | null,
  characterClass?: CharacterClass | null,
  options?: {
    secondClass?: CharacterClass | null
    gradualAbilityBoosts?: boolean
    automaticBonusProgression?: boolean
  },
): ResolvedAttribute[] {
  const bgChoices = character.backgroundChoices ?? emptyBackgroundChoices()
  const ancChoices = character.ancestryChoices ?? emptyAncestryChoices()
  const classChoices = character.classChoices ?? emptyClassChoices()
  const secondChoices = character.secondClassChoices ?? emptyClassChoices()

  const bgBenefits =
    background && character.backgroundId
      ? resolveBackgroundBenefits(background, bgChoices, character.level)
      : null

  const ancBenefits =
    ancestry && character.ancestryId
      ? resolveAncestryBenefits(
          ancestry,
          ancChoices,
          heritage && character.heritageId === heritage.id ? heritage : null,
          character.level,
        )
      : null

  const classBenefits =
    characterClass && character.classId === characterClass.id
      ? resolveClassBenefits(characterClass, classChoices, character.level)
      : null

  const secondClass = options?.secondClass
  const secondBenefits =
    secondClass &&
    character.secondClassId === secondClass.id &&
    secondClass.id !== characterClass?.id
      ? resolveClassBenefits(secondClass, secondChoices, character.level)
      : null

  return ATTRIBUTE_IDS.map((id) => {
    const contributions: ResolvedAttribute['contributions'] = [
      { label: 'Base', value: 0, sourceType: 'base' },
    ]

    const fromAncestry =
      ancBenefits?.attributeContributions.filter(
        (c) => c.target === `attribute.${id}`,
      ) ?? []
    for (const c of fromAncestry) {
      contributions.push({
        label: c.label,
        value: c.value,
        sourceType: c.sourceType,
      })
    }

    const fromBackground =
      bgBenefits?.attributeContributions.filter(
        (c) => c.target === `attribute.${id}`,
      ) ?? []
    for (const c of fromBackground) {
      contributions.push({
        label: c.label,
        value: c.value,
        sourceType: c.sourceType,
      })
    }

    const fromClass =
      classBenefits?.attributeContributions.filter(
        (c) => c.target === `attribute.${id}`,
      ) ?? []
    for (const c of fromClass) {
      contributions.push({
        label: c.label,
        value: c.value,
        sourceType: c.sourceType,
      })
    }

    const fromSecond =
      secondBenefits?.attributeContributions.filter(
        (c) => c.target === `attribute.${id}`,
      ) ?? []
    for (const c of fromSecond) {
      contributions.push({
        label: `${c.label} (2ª classe)`,
        value: c.value,
        sourceType: c.sourceType,
      })
    }

    const manual = character.attributeBoosts?.[id] ?? 0
    if (manual !== 0) {
      contributions.push({
        label: 'Ajustes manuais',
        value: manual,
        sourceType: 'manual',
      })
    }

    if (options?.gradualAbilityBoosts) {
      const gradual = character.gradualAttributeBoosts ?? {}
      for (const [levelRaw, attr] of Object.entries(gradual)) {
        const boostLevel = Number(levelRaw)
        if (character.level < boostLevel || attr !== id) continue
        contributions.push({
          label: `Aumento gradual nv. ${boostLevel}`,
          value: 1,
          sourceType: 'levelBoost',
        })
      }
    } else {
      const levelBoosts = character.levelAttributeBoosts ?? {}
      for (const boostLevel of [5, 10, 15, 20] as const) {
        if (character.level < boostLevel) continue
        const set = levelBoosts[boostLevel] ?? []
        const count = set.filter((a) => a === id).length
        if (count === 0) continue
        contributions.push({
          label: `Boost nv. ${boostLevel}`,
          value: count,
          sourceType: 'levelBoost',
        })
      }
    }

    if (
      options?.automaticBonusProgression &&
      character.level >= 17 &&
      character.abpApexAttributeId === id
    ) {
      const soFar = contributions.reduce((sum, c) => sum + c.value, 0)
      const toFour = Math.max(0, 4 - soFar)
      const bump = Math.max(1, toFour)
      contributions.push({
        label: 'Ápice automático (17º)',
        value: bump,
        sourceType: 'levelBoost',
      })
    }

    const modifier = contributions.reduce((sum, c) => sum + c.value, 0)
    return { id, modifier, contributions }
  })
}

export function resolveCharacterSheet(
  ctx: ResolveCharacterContext,
): ResolvedCharacterSheet {
  const {
    character,
    background,
    ancestry,
    heritage,
    characterClass,
    secondClass = null,
    sources = [],
    feats: featCatalog = [],
    freeArchetype = false,
    mythicRules = false,
    ancestryParagon = false,
    dualClass = false,
    gradualAbilityBoosts = false,
    automaticBonusProgression = false,
    proficiencyWithoutLevel = false,
  } = ctx
  const pwl = { withoutLevel: proficiencyWithoutLevel } as const
  const abp = automaticBonusProgression
    ? resolveAutomaticBonusProgression(character.level)
    : null
  const bgChoices = character.backgroundChoices ?? emptyBackgroundChoices()
  const ancChoices = character.ancestryChoices ?? emptyAncestryChoices()
  const classChoices = character.classChoices ?? emptyClassChoices()
  const secondChoices = character.secondClassChoices ?? emptyClassChoices()
  const activeSecond =
    dualClass &&
    secondClass &&
    character.secondClassId === secondClass.id &&
    secondClass.id !== characterClass?.id
      ? secondClass
      : null

  const bgBenefits =
    background && character.backgroundId === background.id
      ? resolveBackgroundBenefits(background, bgChoices, character.level)
      : null

  const activeHeritage =
    heritage && character.heritageId === heritage.id ? heritage : null

  const ancBenefits =
    ancestry && character.ancestryId === ancestry.id
      ? resolveAncestryBenefits(
          ancestry,
          ancChoices,
          activeHeritage,
          character.level,
        )
      : null

  const classBenefits =
    characterClass && character.classId === characterClass.id
      ? resolveClassBenefits(
          characterClass,
          classChoices,
          character.level,
          character.featChoices,
        )
      : null

  const secondBenefits = activeSecond
    ? resolveClassBenefits(
        activeSecond,
        secondChoices,
        character.level,
        character.featChoices,
      )
    : null

  const attributes = resolveAttributeModifiers(
    character,
    background,
    ancestry,
    activeHeritage,
    characterClass,
    {
      secondClass: activeSecond,
      gradualAbilityBoosts,
      automaticBonusProgression,
    },
  )

  // Conexões em atributos (usam mods base, antes das próprias conexões)
  const baseAttrMap = Object.fromEntries(
    attributes.map((a) => [a.id, a.modifier]),
  ) as Record<AttributeId, number>

  const attrConnectionPreview = resolveConnections(
    character.connections,
    baseAttrMap,
    character.level,
  )

  for (const attr of attributes) {
    const bonus = sumConnectionBonus(
      attrConnectionPreview,
      `attribute.${attr.id}`,
    )
    if (bonus.total === 0) continue
    for (const part of bonus.parts) {
      attr.contributions.push({
        label: `Conexão: ${part.label}`,
        value: part.value,
        sourceType: 'connection',
      })
    }
    attr.modifier = attr.contributions.reduce((sum, c) => sum + c.value, 0)
  }

  applyApexToAttributes(
    attributes,
    automaticBonusProgression ? [] : (character.equipment ?? []),
  )

  const attrMap = Object.fromEntries(
    attributes.map((a) => [a.id, a.modifier]),
  ) as Record<AttributeId, number>

  const featsById = new Map(featCatalog.map((f) => [f.id, f]))
  const classGrantedFeatPicks = collectClassGrantedFeatPicks(
    characterClass && character.classId === characterClass.id
      ? characterClass
      : null,
    character.level,
    classChoices,
    featsById,
    character.featChoices,
  )
  const featSlots = getFeatSlots(character, characterClass, {
    freeArchetype,
    mythicRules,
    mythicCallingId: character.mythicCallingId,
    ancestryParagon,
    secondClass: activeSecond,
    selections: character.featSelections,
    feats: featCatalog,
  })
  const earnedFeats = earnedSelectedFeats(
    character.featSelections,
    featsById,
    featSlots,
  )

  const deityBenefits = resolveDeityBenefits(
    character,
    characterClass,
    featCatalog,
  )
  const deityRanks: Partial<Record<SkillId, ProficiencyRank>> = {}
  if (deityBenefits.skillId) {
    deityRanks[deityBenefits.skillId] = 'trained'
  }

  const skillBook = emptySkillRankBook()
  fillSkillBookFromBenefits(skillBook, {
    ancRanks: ancBenefits?.skillRanks ?? {},
    ancLabel: activeHeritage?.name ?? ancestry?.name ?? 'Ancestralidade',
    bgRanks: bgBenefits?.skillRanks ?? {},
    bgLabel: background?.name ?? 'Origem',
    classRanks: classBenefits?.skillRanks ?? {},
    classLabel: characterClass?.name ?? 'Classe',
    deityRanks,
    deityLabel: deityBenefits.deity?.name ?? 'Divindade',
  })
  if (secondBenefits) {
    fillSkillBookFromBenefits(skillBook, {
      ancRanks: {},
      ancLabel: '',
      bgRanks: {},
      bgLabel: '',
      classRanks: secondBenefits.skillRanks,
      classLabel: activeSecond?.name ?? '2ª classe',
      deityRanks: {},
      deityLabel: '',
    })
  }
  applyHeritageReplaceGrants(
    skillBook,
    activeHeritage,
    ancChoices,
    character.level,
  )

  const featEffects = applyFeatEffects({
    feats: featsApplyingEffects(
      earnedFeats,
      automaticGrantedFeatIds(
        [
          ...(ancBenefits?.feats ?? []),
          ...(bgBenefits?.feats ?? []),
          ...(classBenefits?.feats ?? []),
        ],
        featCatalog,
        activeHeritage,
        ancChoices.heritageChoices,
      ),
      featsById,
      character.featChoices,
    ),
    level: character.level,
    attrMap,
    baseDefense: classBenefits?.defenseProficiencies,
    baseAttack: classBenefits?.attackProficiencies,
    featChoices: character.featChoices,
    alreadyTrained: trainedSkillSet(skillBook.ranks),
    baseSaves: classBenefits?.saveRanks,
    featCatalog,
    baseSkillRanks: skillBook.ranks,
    capArchetypeScalingAtHalfLevel: freeArchetype,
  })

  const attackProficiencies = mergeProficiencyList(
    classBenefits?.attackProficiencies ?? [],
    featEffects.attackRanks,
    FEAT_ATTACK_LABELS,
    'Feito',
  )
  const defenseProficiencies = mergeProficiencyList(
    classBenefits?.defenseProficiencies ?? [],
    featEffects.defenseRanks,
    FEAT_DEFENSE_LABELS,
    'Feito',
  )
  const patchedClassBenefits = classBenefits
    ? {
        ...classBenefits,
        attackProficiencies,
        defenseProficiencies,
        perceptionRank: featEffects.perceptionRank
          ? maxProficiencyRank(
              classBenefits.perceptionRank,
              featEffects.perceptionRank,
            )
          : classBenefits.perceptionRank,
        saveRanks: {
          fortitude: maxProficiencyRank(
            featEffects.saveRanks.fortitude
              ? maxProficiencyRank(
                  classBenefits.saveRanks.fortitude,
                  featEffects.saveRanks.fortitude,
                )
              : classBenefits.saveRanks.fortitude,
            secondBenefits?.saveRanks.fortitude ?? 'untrained',
          ),
          reflex: maxProficiencyRank(
            featEffects.saveRanks.reflex
              ? maxProficiencyRank(
                  classBenefits.saveRanks.reflex,
                  featEffects.saveRanks.reflex,
                )
              : classBenefits.saveRanks.reflex,
            secondBenefits?.saveRanks.reflex ?? 'untrained',
          ),
          will: maxProficiencyRank(
            featEffects.saveRanks.will
              ? maxProficiencyRank(
                  classBenefits.saveRanks.will,
                  featEffects.saveRanks.will,
                )
              : classBenefits.saveRanks.will,
            secondBenefits?.saveRanks.will ?? 'untrained',
          ),
        },
      }
    : classBenefits

  // Re-resolve conexões com atributos já ajustados (fórmulas de PV etc.)
  let resolvedConnectionList = resolveConnections(
    character.connections,
    attrMap,
    character.level,
  )

  const sizeResolved = resolveCreatureSize(
    ancBenefits?.size ?? null,
    resolvedConnectionList,
    featEffects.sizeShift,
  )

  const resolvedEquipment = resolveEquipment({
    items: character.equipment ?? [],
    level: character.level,
    strengthModifier: attrMap.strength,
    dexterityModifier: attrMap.dexterity,
    classBenefits: patchedClassBenefits,
    weaponFamiliarities: featEffects.weaponFamiliarities,
    size: sizeResolved.size,
    fistDamageDie: improvedFistDamageDie([
      ...(classBenefits?.activeFeatures ?? []).map((f) => f.id),
      ...(secondBenefits?.activeFeatures ?? []).map((f) => f.id),
      ...(ancBenefits?.specialAbilities ?? []).map((a) => a.id),
      ...earnedFeats.map((f) => f.id),
      ...(ancBenefits?.feats ?? [])
        .map((f) => f.featId)
        .filter((id): id is string => Boolean(id)),
      ...(classBenefits?.feats ?? [])
        .map((f) => f.featId)
        .filter((id): id is string => Boolean(id)),
    ]),
  })
  const wornMagic = collectWornMagic(character.equipment ?? [])
  const activeItems = resolveActiveItemEffects(character.activeItemEffects)

  for (const entry of featEffects.skillRankSources) {
    addSkillRank(
      skillBook,
      entry.skillId,
      entry.source.rank,
      entry.source.label,
    )
  }
  skillBook.pending.push(...featEffects.pendingSkillChoices)

  const skillRankMap: Partial<Record<SkillId, ProficiencyRank>> = {
    ...skillBook.ranks,
  }
  const ranksAfterIncreases = applySkillIncreases(
    skillRankMap,
    character.skillIncreases,
    character.level,
  )
  for (const inc of character.skillIncreases ?? []) {
    if (inc.level > character.level) continue
    const rank = ranksAfterIncreases[inc.skillId]
    if (!rank) continue
    const list = skillBook.sources[inc.skillId] ?? []
    list.push({
      label: `Aumento de perícia (nv. ${inc.level})`,
      rank,
    })
    skillBook.sources[inc.skillId] = list
  }
  for (const skillId of SKILL_IDS) {
    const rank = ranksAfterIncreases[skillId]
    if (rank) skillRankMap[skillId] = rank
  }

  const catalogKit = resolveCatalogKit({
    character,
    characterClass,
    attrMap,
    craftingRank: skillRankMap.crafting ?? 'untrained',
  })
  if (catalogKit.connections.length > 0) {
    resolvedConnectionList = [
      ...resolvedConnectionList,
      ...catalogKit.connections,
    ]
  }

  const skills: ResolvedSkill[] = SKILL_IDS.map((skillId) => {
    const attributeId = SKILL_ATTRIBUTES[skillId]
    const rank = skillRankMap[skillId] ?? 'untrained'
    const extra: ModifierContribution[] = []
    if (
      resolvedEquipment.checkPenalty !== 0 &&
      armorCheckPenaltyApplies(skillId)
    ) {
      extra.push({
        id: 'armor-check-penalty',
        sourceType: 'item',
        sourceId: resolvedEquipment.armor?.definition.id ?? 'armor',
        sourceLabel: resolvedEquipment.armor?.definition.name ?? 'Armadura',
        target: `skill.${skillId}`,
        value: resolvedEquipment.checkPenalty,
        bonusType: 'untyped',
        label: 'Penalidade de armadura',
      })
    }
    const worn = resolvedEquipment.armor
    if (worn?.magicActive) {
      for (const bonus of worn.runes.skillBonuses) {
        if (bonus.skillId !== skillId) continue
        extra.push({
          id: `rune-skill-${bonus.skillId}`,
          sourceType: 'item',
          sourceId: worn.definition.id,
          sourceLabel: worn.definition.name,
          target: `skill.${skillId}`,
          value: bonus.value,
          bonusType: 'item',
          label: 'Runa',
        })
      }
    }
    for (const bonus of wornMagic.skillBonuses) {
      if (bonus.skillId !== skillId) continue
      const existingItem = extra
        .filter((entry) => entry.bonusType === 'item')
        .reduce((max, entry) => Math.max(max, entry.value), 0)
      if (bonus.value <= existingItem) continue
      extra.push({
        id: `worn-skill-${bonus.skillId}`,
        sourceType: 'item',
        sourceId: bonus.label,
        sourceLabel: bonus.label,
        target: `skill.${skillId}`,
        value: bonus.value,
        bonusType: 'item',
        label: bonus.label,
      })
    }
    for (const bonus of activeItems.skillBonuses) {
      if (bonus.skillId !== skillId) continue
      extra.push({
        id: `alch-skill-${bonus.skillId}-${bonus.label}`,
        sourceType: 'item',
        sourceId: bonus.label,
        sourceLabel: bonus.label,
        target: `skill.${skillId}`,
        value: bonus.value,
        bonusType: 'item',
        label: bonus.label,
      })
    }
    for (const penalty of activeItems.skillPenalties) {
      if (penalty.skillId !== skillId) continue
      extra.push({
        id: `alch-skill-pen-${penalty.skillId}-${penalty.label}`,
        sourceType: 'item',
        sourceId: penalty.label,
        sourceLabel: penalty.label,
        target: `skill.${skillId}`,
        value: penalty.value,
        bonusType: 'untyped',
        label: penalty.label,
      })
    }
    if (
      rank === 'untrained' &&
      featEffects.untrainedProficiencyBonus != null &&
      featEffects.untrainedProficiencyBonus !== 0
    ) {
      extra.push({
        id: 'untrained-improvisation',
        sourceType: 'feat',
        sourceId: 'untrained-improvisation',
        sourceLabel: 'Improvisação Destreinada',
        target: `skill.${skillId}`,
        value: featEffects.untrainedProficiencyBonus,
        bonusType: 'untyped',
        label: 'Improvisação Destreinada',
      })
    }
    extra.push(
      ...extrasFromConnections(
        resolvedConnectionList,
        'skill',
        `skill.${skillId}`,
      ),
      ...extrasFromConnections(resolvedConnectionList, `skill.${skillId}`),
    )
    if (abp) {
      const potency = skillPotencyBonus(skillId, character.abpSkillPotencies)
      if (potency > 0) {
        extra.push({
          id: `abp-skill-${skillId}`,
          sourceType: 'effect',
          sourceId: 'abp',
          sourceLabel: 'Progressão automática',
          target: `skill.${skillId}`,
          value: potency,
          bonusType: 'item',
          label: 'Potência (ABP)',
        })
      }
    }
    const result = calculateSkillModifier({
      skillId,
      attributeId,
      attributeModifier: attrMap[attributeId],
      rank,
      level: character.level,
      extraContributions: extra.length > 0 ? extra : undefined,
      withoutLevel: proficiencyWithoutLevel,
    })
    return {
      id: skillId,
      attributeId,
      rank,
      modifier: result.total,
      breakdown: result.breakdown,
      rankSources: skillBook.sources[skillId],
    }
  })

  const customSkills: ResolvedCustomSkill[] = (character.customSkills ?? []).map(
    (skill) => {
      const extra = [
        ...extrasFromConnections(
          resolvedConnectionList,
          'skill',
          `skill.${skill.id}`,
        ),
        ...extrasFromConnections(
          resolvedConnectionList,
          `skill.${skill.id}`,
        ),
      ]
      const result = calculateSkillModifier({
        skillId: skill.id,
        skillLabel: skill.name,
        attributeId: skill.attributeId,
        attributeModifier: attrMap[skill.attributeId],
        rank: skill.rank,
        level: character.level,
        extraContributions: extra.length > 0 ? extra : undefined,
        withoutLevel: proficiencyWithoutLevel,
      })
      return {
        id: skill.id,
        name: skill.name,
        attributeId: skill.attributeId,
        rank: skill.rank,
        modifier: result.total,
        breakdown: result.breakdown,
        notes: skill.notes,
      }
    },
  )

  const loreById = new Map<
    string,
    { id: string; name: string; rank: ProficiencyRank; sourceLabel: string }
  >()
  for (const lore of bgBenefits?.lores ?? []) {
    loreById.set(lore.id, lore)
  }
  for (const lore of featEffects.lores) {
    const current = loreById.get(lore.id)
    if (!current) {
      loreById.set(lore.id, lore)
    } else {
      loreById.set(lore.id, {
        ...current,
        rank: maxProficiencyRank(current.rank, lore.rank),
        name: current.name || lore.name,
      })
    }
  }
  for (const lore of classBenefits?.lores ?? []) {
    const current = loreById.get(lore.id)
    if (!current) {
      loreById.set(lore.id, lore)
    } else {
      loreById.set(lore.id, {
        ...current,
        rank: maxProficiencyRank(current.rank, lore.rank),
        name: current.name || lore.name,
      })
    }
  }
  const lores: ResolvedLore[] = [...loreById.values()].map((lore) => {
    const extra: ModifierContribution[] = []
    if (activeItems.loreBonus) {
      extra.push({
        id: 'alch-lore',
        sourceType: 'item',
        sourceId: 'mutagen',
        sourceLabel: 'Mutagênico',
        target: `skill.${lore.id}`,
        value: activeItems.loreBonus,
        bonusType: 'item',
        label: 'Mutagênico',
      })
    }
    extra.push(
      ...extrasFromConnections(
        resolvedConnectionList,
        'skill',
        `lore.${lore.id}`,
      ),
      ...extrasFromConnections(resolvedConnectionList, 'lore', `lore.${lore.id}`),
      ...extrasFromConnections(resolvedConnectionList, `lore.${lore.id}`),
    )
    const result = calculateSkillModifier({
      skillId: lore.id,
      skillLabel: lore.name,
      attributeId: 'intelligence',
      attributeModifier: attrMap.intelligence,
      rank: lore.rank,
      level: character.level,
      extraContributions: extra.length > 0 ? extra : undefined,
      withoutLevel: proficiencyWithoutLevel,
    })
    return {
      id: lore.id,
      name: lore.name,
      rank: lore.rank,
      modifier: result.total,
      breakdown: result.breakdown,
      sourceLabel: lore.sourceLabel,
    }
  })

  const selectedFeats = selectionsToGrantedFeats(
    character.featSelections ?? [],
    featsById,
    featSlots,
  )

  const feats: GrantedFeat[] = [
    ...(ancBenefits?.feats ?? []).map((f) =>
      hydrateGrantedFeat(
        {
          id: f.id,
          featId: f.featId,
          featName: f.featName,
          originalName: f.originalName,
          featType: f.featType,
          description: f.description,
          actionType: f.actionType as GrantedFeat['actionType'],
          frequency: f.frequency,
          trigger: f.trigger,
          traits: f.traits,
          sourceType: 'heritage',
          sourceId: activeHeritage?.id ?? '',
          sourceLabel: f.sourceLabel,
        },
        featsById,
      ),
    ),
    ...(bgBenefits?.feats ?? []).map((f) =>
      hydrateGrantedFeat(
        {
          id: f.id,
          featId: f.featId,
          featName: f.featName,
          originalName: f.originalName,
          featType: f.featType,
          description: f.description,
          actionType: f.actionType,
          frequency: f.frequency,
          trigger: f.trigger,
          traits: f.traits,
          sourceType: 'background',
          sourceId: background?.id ?? '',
          sourceLabel: f.sourceLabel,
        },
        featsById,
      ),
    ),
    ...(classBenefits?.feats ?? []).map((f) =>
      hydrateGrantedFeat(
        {
          id: f.id,
          featId: f.featId,
          featName: f.featName,
          originalName: f.originalName,
          featType: f.featType,
          sourceType: 'class',
          sourceId: characterClass?.id ?? '',
          sourceLabel: f.sourceLabel,
        },
        featsById,
      ),
    ),
    ...selectedFeats,
    ...featEffects.grantedFeatPicks.flatMap((pick) => {
      if (!pick.selectedFeatId) return []
      const child = featsById.get(pick.selectedFeatId)
      if (!child) return []
      const alreadyOnSheet = [
        ...(ancBenefits?.feats ?? []),
        ...(bgBenefits?.feats ?? []),
        ...(classBenefits?.feats ?? []),
        ...selectedFeats,
      ].some((grant) => grant.featId === child.id)
      if (alreadyOnSheet) return []
      return [
        hydrateGrantedFeat(
          {
            id: `granted-child:${pick.key}`,
            featId: child.id,
            featName: child.name,
            originalName: child.originalName,
            featType: child.category,
            description: child.description,
            actionType: child.actionType,
            traits: child.traits,
            trigger: child.trigger,
            frequency: child.frequency,
            rarity: child.rarity,
            aonUrl: child.aonUrl,
            level: child.level,
            sourceType: 'featSelection',
            sourceId: pick.parentFeatId,
            sourceLabel: pick.parentName,
          },
          featsById,
        ),
      ]
    }),
  ]

  const sheetFeatIds = new Set(
    feats.map((grant) => grant.featId).filter((id): id is string => Boolean(id)),
  )
  for (const childId of featEffects.grantedChildFeatIds) {
    if (sheetFeatIds.has(childId)) continue
    const child = featsById.get(childId)
    if (!child) continue
    let parentName = 'Concedido'
    for (const sel of character.featSelections ?? []) {
      const parent = featsById.get(sel.featId)
      if (!parent?.effects?.some((effect) => effect.kind === 'grantedFeat' && effect.featId === childId)) {
        continue
      }
      parentName = parent.name
      break
    }
    sheetFeatIds.add(childId)
    feats.push(
      hydrateGrantedFeat(
        {
          id: `granted-child-auto:${childId}`,
          featId: child.id,
          featName: child.name,
          originalName: child.originalName,
          featType: child.category,
          description: child.description,
          actionType: child.actionType,
          traits: child.traits,
          trigger: child.trigger,
          frequency: child.frequency,
          rarity: child.rarity,
          aonUrl: child.aonUrl,
          level: child.level,
          sourceType: 'featSelection',
          sourceId: childId,
          sourceLabel: parentName,
        },
        featsById,
      ),
    )
  }

  const selectedFeatDefs = (character.featSelections ?? [])
    .map((sel) => featsById.get(sel.featId))
    .filter((f): f is Feat => Boolean(f))
  const archetypes = resolveArchetypeProgress(selectedFeatDefs)

  const unarmoredRank = patchedClassBenefits
    ? getUnarmoredDefenseRank(patchedClassBenefits)
    : null
  const armorCategory = resolvedEquipment.armor?.stats.category ?? 'unarmored'
  const defenseRank = patchedClassBenefits
    ? getDefenseRankForCategory(patchedClassBenefits, armorCategory) ??
      unarmoredRank
    : featEffects.defenseRanks[armorCategory] ??
      featEffects.defenseRanks.unarmored ??
      null
  const armorItemBonus = resolvedEquipment.armor?.itemBonus ?? 0
  const itemBonus = Math.max(
    armorItemBonus,
    activeItems.acItemBonus,
    wornMagic.acItemBonus,
  )
  let dexCap = resolvedEquipment.armor?.dexCap ?? null
  if (activeItems.dexCap != null) {
    dexCap =
      dexCap == null ? activeItems.dexCap : Math.min(dexCap, activeItems.dexCap)
  }
  if (wornMagic.dexCap != null) {
    dexCap =
      dexCap == null
        ? wornMagic.dexCap
        : Math.min(dexCap, wornMagic.dexCap)
  }
  const acRaw = calculateArmorClass({
    dexModifier: attrMap.dexterity,
    dexCap,
    proficiencyBonus:
      defenseRank != null
        ? calculateProficiencyBonus(defenseRank, character.level, pwl)
        : null,
    itemBonus,
    bonuses:
      resolvedEquipment.shieldAcBonus +
      (automaticBonusProgression
        ? resolveAutomaticBonusProgression(character.level).defensePotency
        : 0),
  })

  let hp = calculateHitPoints({
    level: character.level,
    constitutionModifier: attrMap.constitution,
    ancestryHitPoints: ancBenefits?.hitPointsFromAncestry ?? null,
    ancestryHitPointsLabel: ancBenefits?.hitPointsSourceLabel,
    classHitPointsPerLevel: activeSecond
      ? dualClassHitPointsPerLevel(characterClass, activeSecond)
      : classBenefits?.hitPointsPerLevel ?? null,
    className: activeSecond
      ? `${characterClass?.name} + ${activeSecond.name}`
      : characterClass?.name,
  })

  hp = appendDerivedParts(
    hp,
    sumConnectionBonus(resolvedConnectionList, 'hp.max').parts.map((p) => ({
      label: `Conexão: ${p.label}`,
      value: p.value,
    })),
  )
  hp = appendDerivedParts(hp, featEffects.hpParts)
  const dyingConn = sumConnectionBonus(resolvedConnectionList, 'dying.max')
  const dyingBase =
    featEffects.dyingMax != null
      ? featEffects.dyingMax + dyingConn.total
      : dyingConn.total !== 0
        ? 4 + dyingConn.total
        : 4
  const conditionEffects = resolveConditionEffects(
    character.activeConditions,
    character.level,
  )
  const dyingMax = Math.max(1, dyingBase - conditionEffects.doomed)
  if ((featEffects.dyingMax != null || dyingConn.total !== 0 || conditionEffects.doomed > 0 || conditionEffects.dying > 0 || conditionEffects.wounded > 0) && hp.breakdown) {
    const dyingNotes: Array<{ label: string; value: number | string }> = [
      {
        label: `Morrendo (máx. ${dyingMax})`,
        value:
          conditionEffects.doomed > 0
            ? `base ${dyingBase} − condenado ${conditionEffects.doomed}`
            : featEffects.dyingMax != null
              ? 'Difícil de Matar'
              : dyingConn.total !== 0
                ? 'Conexão'
                : 'Padrão 4',
      },
    ]
    if (conditionEffects.dying > 0) {
      dyingNotes.push({
        label: 'Morrendo agora',
        value: conditionEffects.dying,
      })
    }
    if (conditionEffects.wounded > 0) {
      dyingNotes.push({
        label: 'Ferido',
        value: conditionEffects.wounded,
      })
    }
    hp = {
      ...hp,
      breakdown: [...(hp.breakdown ?? []), ...dyingNotes],
    }
  }
  if (conditionEffects.hpMaxPenalty > 0) {
    hp = applyConditionSlicesToDerived(hp, [
      {
        amount: conditionEffects.hpMaxPenalty,
        label: conditionEffects.hpMaxLabel ?? 'Drenado',
        kind: 'status',
      },
    ])
  }

  const tempHpBonus = sumConnectionBonus(resolvedConnectionList, 'hp.temp')
  const tempHp: DerivedStat = {
    key: 'tempHp',
    label: 'PV temporários',
    value: tempHpBonus.total !== 0 ? tempHpBonus.total : null,
    pending: false,
    breakdown: tempHpBonus.parts.map((part) => ({
      label: `Conexão: ${part.label}`,
      value: part.value,
    })),
  }

  const acStat: DerivedStat = {
    key: 'ac',
    label: 'Classe de Armadura',
    value: acRaw.total,
    pending: acRaw.total == null,
    provisional: acRaw.provisional,
    pendingReason:
      acRaw.missing.length > 0
        ? `Falta: ${acRaw.missing.join(', ')}`
        : undefined,
    breakdown: acRaw.breakdown,
  }
  const ac = applyConnectionBonus(
    applyConnectionBonus(
      acStat,
      sumConnectionBonus(resolvedConnectionList, 'ac'),
    ),
    resolvedEquipment.shield?.raised
      ? sumConnectionBonus(resolvedConnectionList, 'shield.ac')
      : { total: 0, parts: [] },
  )

  const bgSource = background?.sourceId
    ? sources.find((s) => s.id === background.sourceId)
    : undefined
  const ancSource = ancestry?.sourceId
    ? sources.find((s) => s.id === ancestry.sourceId)
    : undefined
  const herSource = activeHeritage?.sourceId
    ? sources.find((s) => s.id === activeHeritage.sourceId)
    : undefined
  const classSource = characterClass?.sourceId
    ? sources.find((s) => s.id === characterClass.sourceId)
    : undefined

  const speedStat = ancBenefits
    ? (() => {
        const breakdown: Array<{ label: string; value: number | string }> = [
          {
            label: 'Terrestre',
            value: formatSpeedMeters(ancBenefits.speed),
          },
          ...additionalSpeedBreakdown(ancBenefits.additionalSpeeds),
        ]
        let value = ancBenefits.speed
        if (
          resolvedEquipment.speedPenalty !== 0 &&
          !featEffects.ignoreArmorSpeedPenalty
        ) {
          value = Math.max(5, value + resolvedEquipment.speedPenalty)
          breakdown.push({
            label: 'Penalidade de armadura/escudo',
            value: formatSpeedMeters(resolvedEquipment.speedPenalty),
          })
        }
        if (resolvedEquipment.encumbered) {
          const encPenalty = Math.min(
            0,
            -10 + featEffects.reduceOtherSpeedPenalties,
          )
          value = Math.max(5, value + encPenalty)
          breakdown.push({
            label: 'Sobrecarga',
            value: formatSpeedMeters(encPenalty),
          })
        }
        const wearingArmor =
          armorCategory !== 'unarmored' && resolvedEquipment.armor != null
        const featSpeed =
          featEffects.speedBonus +
          featEffects.ancestrySpeedBonus +
          (wearingArmor ? 0 : featEffects.speedBonusUnarmored)
        if (featSpeed !== 0) {
          value += featSpeed
          breakdown.push({
            label: 'Feito (deslocamento)',
            value: formatSpeedMeters(featSpeed),
          })
        }
        const classSpeed =
          (classBenefits?.speedBonus ?? 0) +
          (wearingArmor ? 0 : (classBenefits?.speedBonusUnarmored ?? 0))
        if (classSpeed) {
          value += classSpeed
          breakdown.push({
            label: 'Classe (deslocamento)',
            value: formatSpeedMeters(classSpeed),
          })
        }
        if (wornMagic.speedBonus) {
          value += wornMagic.speedBonus
          breakdown.push({
            label: wornMagic.speedLabel ?? 'Item vestido',
            value: formatSpeedMeters(wornMagic.speedBonus),
          })
        }
        return {
          key: 'speed',
          label: 'Velocidade',
          value,
          pending: false,
          breakdown,
        }
      })()
    : {
        key: 'speed',
        label: 'Velocidade',
        value: null,
        pending: true,
        pendingReason: 'Velocidade depende principalmente da ancestralidade.',
      }

  const perception = patchedClassBenefits
    ? (() => {
        const stat = buildPerceptionStat({
          wisdomModifier: attrMap.wisdom,
          rank: patchedClassBenefits.perceptionRank,
          level: character.level,
          className: characterClass!.name,
        })
        return {
          key: 'perception',
          label: 'Percepção',
          value: stat.value,
          pending: false,
          breakdown: stat.breakdown,
          pendingReason: `${PROFICIENCY_LABELS[stat.rank]} · ${characterClass!.name}`,
        }
      })()
    : {
        key: 'perception',
        label: 'Percepção',
        value: null,
        pending: true,
        pendingReason:
          'Percepção depende da proficiência concedida principalmente pela classe.',
      }

  function saveDerived(
    key: 'fortitude' | 'reflex' | 'will',
    label: string,
    attributeId: AttributeId,
  ) {
    if (!patchedClassBenefits || !characterClass) {
      return {
        key,
        label,
        value: null,
        pending: true,
        pendingReason: `${label} aguarda a classe.`,
      }
    }
    const stat = buildSaveStat({
      key,
      label,
      attributeId,
      attributeModifier: attrMap[attributeId],
      rank: patchedClassBenefits.saveRanks[key],
      level: character.level,
      className: characterClass.name,
    })
    return {
      key,
      label,
      value: stat.value,
      pending: false,
      breakdown: stat.breakdown,
      pendingReason: `${PROFICIENCY_LABELS[stat.rank]} · ${characterClass.name}`,
    }
  }

  const mythicCalling = mythicRules
    ? resolveMythicCalling(character.mythicCallingId)
    : null
  const mythicActive = isMythicCharacter({
    mythicRulesEnabled: mythicRules,
    mythicCallingId: character.mythicCallingId,
  })

  const specialAbilities = [
    ...(ancBenefits?.specialAbilities ?? []),
    ...(classBenefits?.specialAbilities ?? []),
    ...deityBenefits.specialAbilities,
    ...featEffects.specialAbilities,
    ...(mythicCalling
      ? mythicAbilitiesForCalling(mythicCalling).map((ability) => ({
          ...ability,
          sourceLabel: mythicCalling.name,
        }))
      : []),
  ]

  const circumstanceBonuses = [
    ...(activeHeritage
      ? parseCircumstanceBonusesFromText(
          activeHeritage.description,
          activeHeritage.name,
        )
      : []),
    ...specialAbilities.flatMap((ability) =>
      parseCircumstanceBonusesFromText(
        ability.description,
        ability.sourceLabel,
      ),
    ),
    ...featEffects.circumstanceBonuses,
  ].filter(
    (bonus, index, list) =>
      list.findIndex(
        (other) =>
          other.sourceLabel === bonus.sourceLabel &&
          other.appliesTo === bonus.appliesTo &&
          other.value === bonus.value,
      ) === index,
  )

  const perceptionItemBonus = Math.max(
    activeItems.perceptionBonus ?? 0,
    wornMagic.perceptionBonus,
  )
  const perceptionItemLabel =
    wornMagic.perceptionBonus > (activeItems.perceptionBonus ?? 0)
      ? (wornMagic.perceptionLabel ?? 'Item vestido')
      : (activeItems.perceptionLabel ?? 'Item alquímico')
  const perceptionFinal = appendDerivedParts(
    applyConnectionBonus(
      perception,
      sumConnectionBonus(resolvedConnectionList, 'perception'),
    ),
    [
      ...(perceptionItemBonus
        ? [{ label: perceptionItemLabel, value: perceptionItemBonus }]
        : []),
      ...(abp?.perceptionPotency
        ? [{ label: 'Potência (ABP)', value: abp.perceptionPotency }]
        : []),
    ],
  )
  const initiativeBonus = sumConnectionBonus(
    resolvedConnectionList,
    'initiative',
  )
  const initiativeFromFeats = sumAlwaysOnCircumstance(
    circumstanceBonuses,
    'initiative',
  )
  const initiativeFeatTotal = initiativeFromFeats.reduce(
    (sum, part) => sum + part.value,
    0,
  )
  const initiative: DerivedStat = {
    key: 'initiative',
    label: 'Iniciativa',
    value:
      perceptionFinal.value == null
        ? null
        : perceptionFinal.value + initiativeBonus.total + initiativeFeatTotal,
    pending: perceptionFinal.pending,
    pendingReason: perceptionFinal.pending
      ? 'Iniciativa usa Percepção até a classe definir a proficiência.'
      : undefined,
    breakdown:
      perceptionFinal.value == null
        ? perceptionFinal.breakdown
        : [
            { label: 'Percepção', value: perceptionFinal.value },
            ...initiativeFromFeats.map((part) => ({
              label: part.label,
              value: part.value,
            })),
            ...initiativeBonus.parts.map((part) => ({
              label: `Conexão: ${part.label}`,
              value: part.value,
            })),
          ],
  }
  const resilient =
    resolvedEquipment.armor?.magicActive
      ? (resolvedEquipment.armor.runes.resilientBonus ?? 0)
      : 0
  const itemSaveBonus = Math.max(resilient, wornMagic.saveBonus)
  const itemSaveLabel =
    wornMagic.saveBonus > resilient
      ? (wornMagic.saveLabel ?? 'Item vestido')
      : 'Runa resiliente'
  function withAlchemicalSave(
    key: 'fortitude' | 'reflex' | 'will',
    stat: DerivedStat,
  ): DerivedStat {
    const parts = activeItems.saveBonuses
      .filter((entry) => entry.save === key)
      .map((entry) => ({ label: entry.label, value: entry.value }))
    return appendDerivedParts(stat, [
      ...parts,
      ...(abp?.savePotency
        ? [{ label: 'Potência (ABP)', value: abp.savePotency }]
        : []),
    ])
  }
  const fortitude = withAlchemicalSave(
    'fortitude',
    applyConnectionBonus(
      applyItemSaveBonus(
        saveDerived('fortitude', 'Fortitude', 'constitution'),
        itemSaveBonus,
        itemSaveLabel,
      ),
      sumConnectionBonuses(resolvedConnectionList, [
        'save.fortitude',
        'save',
      ]),
    ),
  )
  const reflex = withAlchemicalSave(
    'reflex',
    applyConnectionBonus(
      applyItemSaveBonus(
        saveDerived('reflex', 'Reflexos', 'dexterity'),
        itemSaveBonus,
        itemSaveLabel,
      ),
      sumConnectionBonuses(resolvedConnectionList, ['save.reflex', 'save']),
    ),
  )
  const will = withAlchemicalSave(
    'will',
    applyConnectionBonus(
      applyItemSaveBonus(
        saveDerived('will', 'Vontade', 'wisdom'),
        itemSaveBonus,
        itemSaveLabel,
      ),
      sumConnectionBonuses(resolvedConnectionList, ['save.will', 'save']),
    ),
  )
  const speed = applyAdditionalSpeedConnections(
    appendDerivedParts(
      applyConnectionBonus(
        speedStat,
        sumConnectionBonuses(resolvedConnectionList, ['speed', 'speed.all']),
      ),
      activeItems.speedBonus
        ? [
            {
              label: activeItems.speedLabel ?? 'Elixir',
              value: activeItems.speedBonus,
            },
          ]
        : [],
    ),
    resolvedConnectionList,
  )

  const bulkBonus = sumConnectionBonus(resolvedConnectionList, 'bulk.limit')
  const bulkLimit =
    resolvedEquipment.bulkLimit +
    bulkBonus.total +
    activeItems.bulkEncumberedAdjust +
    featEffects.bulkLimitBonus +
    wornMagic.extraBulkCapacity
  const bulkMaximum =
    resolvedEquipment.bulkMaximum +
    bulkBonus.total +
    activeItems.bulkMaxAdjust +
    featEffects.bulkLimitBonus +
    wornMagic.extraBulkCapacity
  const adjustedWeapons = applyWeaponSpecialization(
    applyCatalogWeaponExtras(
      applyWeaponConnections(
        [
          ...applyAttackAdjustments(resolvedEquipment.weapons, activeItems),
          ...mutagenUnarmedAttacks(activeItems, {
            level: character.level,
            strengthModifier: attrMap.strength,
            classBenefits: patchedClassBenefits,
          }),
        ],
        resolvedConnectionList,
      ),
      catalogKit.weaponExtras,
    ),
    patchedClassBenefits?.weaponSpecialization ?? 'none',
  )
  const investBonus = sumConnectionBonus(
    resolvedConnectionList,
    'investment.limit',
  )
  const hardnessBonus = sumConnectionBonus(
    resolvedConnectionList,
    'shield.hardness',
  )
  const equipmentForSheet = {
    ...resolvedEquipment,
    weapons: adjustedWeapons,
    bulkLimit,
    bulkMaximum,
    investmentLimit: resolvedEquipment.investmentLimit + investBonus.total,
    shield:
      resolvedEquipment.shield && hardnessBonus.total !== 0
        ? {
            ...resolvedEquipment.shield,
            stats: {
              ...resolvedEquipment.shield.stats,
              hardness:
                resolvedEquipment.shield.stats.hardness + hardnessBonus.total,
            },
          }
        : resolvedEquipment.shield,
    encumbered:
      resolvedEquipment.bulkUsed > bulkLimit &&
      resolvedEquipment.bulkUsed <= bulkMaximum,
    overloaded: resolvedEquipment.bulkUsed > bulkMaximum,
  }

  const wearingNamedArmor = Boolean(resolvedEquipment.armor)
  const acFinal: DerivedStat = {
    ...ac,
    label: ac.provisional
      ? 'CA provisória'
      : wearingNamedArmor
        ? 'CA'
        : 'CA (sem armadura)',
    pending: false,
    pendingReason: ac.provisional
      ? `Ainda sem proficiência de armadura (classe). ${acRaw.missing.join('; ')}.`
      : wearingNamedArmor
        ? resolvedEquipment.armor?.definition.name
        : 'Sem armadura do catálogo — usando defesa sem armadura da classe.',
  }

  const runeResistances =
    resolvedEquipment.armor?.magicActive
      ? resolvedEquipment.armor.runes.energyResistances.map((entry) => {
          const typeLabel =
            DAMAGE_TYPE_LABELS[entry.damageType as DamageTypeId] ??
            entry.damageType
          return {
            id: `rune-resist-${entry.damageType}`,
            label: `Resistência a ${typeLabel}`,
            damageType: entry.damageType,
            value: entry.value,
            sourceType: 'other' as const,
            sourceId: resolvedEquipment.armor!.definition.id,
            sourceLabel: resolvedEquipment.armor!.definition.name,
            breakdown: [{ label: 'Runa', value: entry.value }],
          }
        })
      : []
  const wornResistances = wornMagic.energyResistances.map((entry) => {
    const typeLabel =
      DAMAGE_TYPE_LABELS[entry.damageType as DamageTypeId] ?? entry.damageType
    return {
      id: `worn-resist-${entry.damageType}`,
      label: `Resistência a ${typeLabel}`,
      damageType: entry.damageType,
      value: entry.value,
      sourceType: 'other' as const,
      sourceId: entry.label,
      sourceLabel: entry.label,
      breakdown: [{ label: entry.label, value: entry.value }],
    }
  })

  const weaponFamiliarities = featEffects.weaponFamiliarities.map((grant) => ({
    sourceLabel: grant.sourceLabel,
    itemsLabel: formatFamiliaritySummary(grant),
    rulesLabel: formatFamiliarityRules(grant),
    critSpecReady:
      grant.critSpecAtLevel != null && character.level >= grant.critSpecAtLevel,
  }))

  const heroMaxBonus = sumConnectionBonus(
    resolvedConnectionList,
    'heroPoints.max',
  )
  const heroStartBonus = sumConnectionBonus(
    resolvedConnectionList,
    'heroPoints.start',
  )
  const heroPointsMax: DerivedStat = {
    key: 'heroPointsMax',
    label: 'Pontos de herói (máx.)',
    value: Math.max(1, HERO_POINTS_MAX_BASE + heroMaxBonus.total),
    pending: false,
    breakdown: [
      { label: 'Base', value: HERO_POINTS_MAX_BASE },
      ...heroMaxBonus.parts.map((part) => ({
        label: `Conexão: ${part.label}`,
        value: part.value,
      })),
    ],
  }
  const heroPointsStart: DerivedStat = {
    key: 'heroPointsStart',
    label: 'Pontos de herói (início)',
    value: Math.max(0, HERO_POINTS_START_BASE + heroStartBonus.total),
    pending: false,
    breakdown: [
      { label: 'Base', value: HERO_POINTS_START_BASE },
      ...heroStartBonus.parts.map((part) => ({
        label: `Conexão: ${part.label}`,
        value: part.value,
      })),
    ],
  }

  const mythicProfBonus = calculateMythicProficiencyBonus(character.level)
  const mythicPointsMax: DerivedStat | undefined = mythicActive
    ? {
        key: 'mythicPointsMax',
        label: 'Pontos Míticos (máx.)',
        value: MYTHIC_POINTS_MAX,
        pending: false,
        breakdown: [{ label: 'Base (sessão)', value: MYTHIC_POINTS_MAX }],
      }
    : undefined
  const mythicPointsStart: DerivedStat | undefined = mythicActive
    ? {
        key: 'mythicPointsStart',
        label: 'Pontos Míticos (início)',
        value: MYTHIC_POINTS_START,
        pending: false,
        breakdown: [{ label: 'Início de sessão', value: MYTHIC_POINTS_START }],
      }
    : undefined
  const mythicProficiency: DerivedStat | undefined = mythicActive
    ? {
        key: 'mythicProficiency',
        label: 'Proficiência mítica',
        value: mythicProfBonus,
        pending: false,
        breakdown: [
          { label: 'Nível', value: character.level },
          { label: 'Mítico', value: 10 },
          { label: 'Total', value: mythicProfBonus },
        ],
      }
    : undefined

  const classDcRaw = applyClassDcConnections(
    resolveClassDc({
      characterClass,
      classChoices,
      classDcRank: classBenefits?.classDcRank,
      level: character.level,
      attrMap,
      withoutLevel: proficiencyWithoutLevel,
    }),
    resolvedConnectionList,
  )
  const spellcastingRaw = applySpellcastingConnections(
    resolveSpellcastingAccess(
      character,
      characterClass,
      attrMap,
      featEffects.spellcasting,
      featEffects.focusPoolBonus,
      deityBenefits,
      featEffects.extraSignatureSpells,
      featEffects.grantedFocusSpellOriginalNames,
      featEffects.grantedFocusSpellLabels,
    ),
    resolvedConnectionList,
  )

  const acResolved = applyConditionSlicesToDerived(acFinal, conditionEffects.ac)
  const perceptionResolved = applyConditionSlicesToDerived(
    perceptionFinal,
    conditionEffects.perception,
  )
  const initiativeResolved = applyConditionSlicesToDerived(
    initiative,
    conditionEffects.perception,
  )
  const fortitudeResolved = applyConditionSlicesToDerived(
    fortitude,
    conditionEffects.fortitude,
  )
  const reflexResolved = applyConditionSlicesToDerived(
    reflex,
    conditionEffects.reflex,
  )
  const willResolved = applyConditionSlicesToDerived(
    will,
    conditionEffects.will,
  )
  const skillsResolved = skills.map((skill) => {
    const slices = conditionEffects.skillByAttribute[skill.attributeId] ?? []
    const next = applyConditionSlicesToModifier(
      skill.modifier,
      skill.breakdown,
      slices,
    )
    return { ...skill, modifier: next.modifier, breakdown: next.breakdown }
  })
  const customSkillsResolved = customSkills.map((skill) => {
    const slices = conditionEffects.skillByAttribute[skill.attributeId] ?? []
    const next = applyConditionSlicesToModifier(
      skill.modifier,
      skill.breakdown,
      slices,
    )
    return { ...skill, modifier: next.modifier, breakdown: next.breakdown }
  })
  const loresResolved = lores.map((lore) => {
    const slices = conditionEffects.skillByAttribute.intelligence ?? []
    const next = applyConditionSlicesToModifier(
      lore.modifier,
      lore.breakdown,
      slices,
    )
    return { ...lore, modifier: next.modifier, breakdown: next.breakdown }
  })
  const classDc = applyConditionsToClassDc(classDcRaw, conditionEffects)
  const spellcasting = applyConditionsToSpellcasting(
    spellcastingRaw,
    conditionEffects,
  )
  const equipmentResolved = {
    ...equipmentForSheet,
    weapons: applyConditionsToWeapons(
      equipmentForSheet.weapons,
      conditionEffects,
    ),
  }
  const classSignature = resolveClassSignature({
    character,
    characterClass,
    classDc,
    spellcasting,
    feats,
    attrMap,
    catalogKit,
  })

  return {
    character,
    attributes,
    skills: skillsResolved,
    customSkills: customSkillsResolved,
    lores: loresResolved,
    feats,
    pendingSkillChoices: [
      ...skillBook.pending,
      ...deityBenefits.pendingChoices,
      ...classGrantedFeatPicks.pending,
    ],
    grantedFeatPicks: [
      ...featEffects.grantedFeatPicks,
      ...classGrantedFeatPicks.picks,
    ],
    archetypes,
    senses: ancBenefits?.senses ?? [],
    specialAbilities,
    resistances: mergeTypedDefenses(
      [...(ancBenefits?.resistances ?? []), ...runeResistances, ...wornResistances],
      resolvedConnectionList,
      'resistance',
    ),
    weaknesses: mergeTypedDefenses([], resolvedConnectionList, 'weakness'),
    immunities: collectConnectionImmunities(resolvedConnectionList),
    languages: [
      ...(ancBenefits?.languages ?? []),
      ...featEffects.languages.filter(
        (lang) => !(ancBenefits?.languages ?? []).includes(lang),
      ),
    ],
    familiarAbilitySlotBonus:
      featEffects.familiarAbilitySlotBonus +
      sumConnectionBonus(resolvedConnectionList, 'familiar.abilities').total,
    size: sizeResolved.size,
    baseSize: sizeResolved.baseSize,
    sizeShift: sizeResolved.sizeShift,
    sizeBreakdown: sizeResolved.sizeBreakdown,
    attackProficiencies,
    defenseProficiencies,
    weaponFamiliarities,
    circumstanceBonuses,
    classDc,
    extraClassDcs: featEffects.extraClassDcs.map((dc) => {
      const bonus = sumConnectionBonus(resolvedConnectionList, 'classDc')
      const slices =
        conditionEffects.classDcByAttribute[dc.attributeId] ?? []
      const extraPenalty = slices.reduce((sum, slice) => sum + slice.amount, 0)
      const extras = [
        ...bonus.parts.map((part) => ({
          label: `Conexão: ${part.label}`,
          value: part.value,
        })),
        ...slices.map((slice) => ({
          label: slice.label,
          value: -slice.amount,
        })),
      ]
      if (bonus.total === 0 && extraPenalty === 0) return dc
      return {
        ...dc,
        value: dc.value + bonus.total - extraPenalty,
        extras,
      }
    }),
    spellcasting,
    classSignature,
    connections: resolvedConnectionList,
    equipment: equipmentResolved,
    activeItemEffects: activeItems.effects,
    conditionEffects,
    bulkLimit,
    ancestryName: ancestry
      ? formatAncestryDisplayName(ancestry, ancChoices)
      : undefined,
    ancestrySourceLabel: ancestry
      ? formatSourceLabel(
          ancSource?.name ??
            (ancestry.provenance.type === 'homebrew' ? 'Homebrew' : undefined),
          ancestry.sourcePage,
        )
      : undefined,
    heritageName: activeHeritage?.name,
    heritageSourceLabel: activeHeritage
      ? formatSourceLabel(
          herSource?.name ??
            (activeHeritage.provenance.type === 'homebrew'
              ? 'Homebrew'
              : undefined),
          activeHeritage.sourcePage,
        )
      : undefined,
    backgroundName: background?.name,
    backgroundSourceLabel: background
      ? formatSourceLabel(
          bgSource?.name ??
            (background.provenance.type === 'homebrew' ? 'Homebrew' : undefined),
          background.sourcePage,
        )
      : undefined,
    className: characterClass?.name,
    classSourceLabel: characterClass
      ? formatSourceLabel(
          classSource?.name ??
            (characterClass.provenance.type === 'homebrew'
              ? 'Homebrew'
              : undefined),
          characterClass.sourcePage,
        )
      : undefined,
    deityName: deityBenefits.deity?.name,
    derived: {
      hp,
      ac: acResolved,
      perception: perceptionResolved,
      initiative: initiativeResolved,
      fortitude: fortitudeResolved,
      reflex: reflexResolved,
      will: willResolved,
      speed,
      tempHp,
      heroPointsMax,
      heroPointsStart,
      mythicPointsMax,
      mythicPointsStart,
      mythicProficiency,
    },
    mythicActive,
    mythicCallingName: mythicCalling?.name,
    mythicCallingOriginalName: mythicCalling?.originalName,
    languageSlotBonus: sumConnectionBonus(
      resolvedConnectionList,
      'language.slots',
    ).total,
  }
}
