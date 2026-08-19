import type {
  AttributeId,
  Character,
  CharacterClass,
  Feat,
  FeatAvailability,
  FeatPrerequisiteCheck,
  FeatCategory,
  FeatSelection,
  FeatSlot,
  GrantedFeat,
  Heritage,
  ProficiencyRank,
  SkillId,
} from '@/types'
import { CLASS_KINETICIST_ID, CLASS_ROGUE_ID, CLASS_WIZARD_ID } from '@/data/seeds/ids'
import { localizeFeatName } from '@/data/i18n/featNamesPt'
import { localizeFeatDescription } from '@/data/i18n/featDescriptionsPt'
import { localizePrerequisiteLabel } from '@/features/feats/localizeFeats'
import {
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  SKILL_LABELS,
} from '@/utils/labels'
import {
  extraAncestryIdsFromHeritage,
  extraHeritageIdsFromHeritage,
  isVersatileHeritage,
} from './heritage'
import { extraAncestryIdsFromFeatChoices } from './featEffects'
import { enrichFeatDescription } from './featDisplay'
import { ancestryFeatLevelsFor } from './variantRules'
import { proficiencyRankValue } from './proficiency'
import {
  dedicationLockReason,
  featFitsSlot,
  featIgnoresDedicationLockFor,
  findArchetypeForFeat,
  listArchetypes,
  multiclassDedicationReason,
  resolveArchetypeProgress,
} from './archetypes'
import {
  getMythicFeatLevels,
  isGeneralMythicFeat,
  isMythicDestinyDedication,
  hasMythicTrait,
} from './mythic'

export interface FeatValidationIssue {
  field: string
  message: string
}

const DEFAULT_GENERAL_FEAT_LEVELS = [3, 7, 11, 15, 19]

/** Padrão PF2e marcial: feito de classe no 1º e em todos os pares. */
export function defaultClassFeatLevels(maxLevel = 20): number[] {
  const levels = [1]
  for (let L = 2; L <= maxLevel; L += 2) levels.push(L)
  return levels
}

/** Casters como o mago: feitos de classe só nos pares a partir do 2. */
export function evenClassFeatLevelsFrom2(maxLevel = 20): number[] {
  const levels: number[] = []
  for (let L = 2; L <= maxLevel; L += 2) levels.push(L)
  return levels
}

function isClassFeatFeature(feature: string): boolean {
  const f = feature.toLowerCase()
  if (f.includes('feito de perícia')) return false
  if (f.includes('feito geral')) return false
  if (f.includes('feito de ancestralidade')) return false
  return f.startsWith('feito de ') || f.includes('feito de classe')
}

function levelsFromClassTable(
  characterClass: CharacterClass,
  match: (feature: string) => boolean,
): number[] {
  const levels: number[] = []
  for (const row of characterClass.levelTable) {
    const count = row.features.filter(match).length
    for (let i = 0; i < count; i += 1) levels.push(row.level)
  }
  return levels
}

/** Níveis com feito de classe — tabela da classe é a fonte (AoN / Player Core). */
export function getClassFeatLevels(characterClass: CharacterClass): number[] {
  const fromTable = levelsFromClassTable(characterClass, isClassFeatFeature)
  if (fromTable.length > 0) return fromTable
  if (characterClass.classFeatLevels?.length) {
    return characterClass.classFeatLevels
  }
  return defaultClassFeatLevels()
}

export function getSkillFeatLevels(characterClass: CharacterClass): number[] {
  const fromTable = levelsFromClassTable(characterClass, (f) =>
    f.toLowerCase().includes('feito de perícia'),
  )
  if (fromTable.length > 0) return fromTable
  if (characterClass.id === CLASS_ROGUE_ID) {
    return Array.from({ length: 20 }, (_, i) => i + 1)
  }
  const levels: number[] = []
  for (let L = 2; L <= 20; L += 2) levels.push(L)
  return levels
}

export function getGeneralFeatLevels(characterClass: CharacterClass): number[] {
  const fromTable = levelsFromClassTable(characterClass, (f) =>
    f.toLowerCase().includes('feito geral'),
  )
  return fromTable.length > 0 ? fromTable : DEFAULT_GENERAL_FEAT_LEVELS
}

export function getAncestryFeatLevels(ancestryParagon?: boolean): number[] {
  return ancestryFeatLevelsFor(ancestryParagon)
}

function pushIndexedSlots(
  slots: FeatSlot[],
  levels: number[],
  through: number,
  charLevel: number,
  kind: FeatCategory,
  idPrefix: string,
  labelFor: (level: number) => string,
) {
  const seen = new Map<number, number>()
  for (const L of levels) {
    if (L > through) continue
    const n = (seen.get(L) ?? 0) + 1
    seen.set(L, n)
    const id = n === 1 ? `${idPrefix}-${L}` : `${idPrefix}-${L}-${n}`
    slots.push({
      id,
      kind,
      gainedAtLevel: L,
      label: labelFor(L),
      earned: L <= charLevel,
    })
  }
}

export const KINETIC_ELEMENT_TRAIT: Record<string, string> = {
  air: 'Air',
  earth: 'Earth',
  fire: 'Fire',
  metal: 'Metal',
  water: 'Water',
  wood: 'Wood',
}

const KINETIC_ELEMENT_LABEL: Record<string, string> = {
  air: 'Ar',
  earth: 'Terra',
  fire: 'Fogo',
  metal: 'Metal',
  water: 'Água',
  wood: 'Madeira',
}

const GATE_THRESHOLD_LEVELS = [5, 9, 13, 17] as const

function kineticGateElements(subclassId: string | undefined): string[] {
  if (!subclassId) return []
  if (subclassId.startsWith('gate-single-')) {
    return [subclassId.slice('gate-single-'.length)]
  }
  if (subclassId.startsWith('gate-dual-')) {
    const rest = subclassId.slice('gate-dual-'.length)
    const parts = rest.split('-')
    if (parts.length >= 2) return [parts[0]!, parts[1]!]
  }
  return []
}

function extraClassFeatSlots(
  character: Pick<Character, 'level' | 'classId'> & {
    classChoices?: Character['classChoices']
  },
  characterClass: CharacterClass,
  through: number,
  charLevel: number,
): FeatSlot[] {
  const extra: FeatSlot[] = []
  const subclassId = character.classChoices?.subclassId
  const thesisId = character.classChoices?.secondarySubclassId

  const push = (
    id: string,
    level: number,
    label: string,
    requiredTraits?: string[],
  ) => {
    if (level > through) return
    extra.push({
      id,
      kind: 'class',
      gainedAtLevel: level,
      label,
      earned: level <= charLevel,
      requiredTraits,
    })
  }

  if (characterClass.id === CLASS_KINETICIST_ID) {
    const elements = kineticGateElements(subclassId)
    if (elements.length === 1) {
      const el = elements[0]!
      const trait = KINETIC_ELEMENT_TRAIT[el]
      const name = KINETIC_ELEMENT_LABEL[el] ?? el
      push(
        'class-gate-impulse-1',
        1,
        `Impulso do portão (${name}) · nv. 1`,
        trait ? ['Impulse', trait] : ['Impulse'],
      )
      push(
        'class-gate-impulse-2',
        1,
        `Impulso do portão (${name}) · nv. 1`,
        trait ? ['Impulse', trait] : ['Impulse'],
      )
    } else if (elements.length >= 2) {
      elements.slice(0, 2).forEach((el, i) => {
        const trait = KINETIC_ELEMENT_TRAIT[el]
        const name = KINETIC_ELEMENT_LABEL[el] ?? el
        push(
          `class-gate-impulse-${i + 1}`,
          1,
          `Impulso do portão (${name}) · nv. 1`,
          trait ? ['Impulse', trait] : ['Impulse'],
        )
      })
    }
    if (elements.length > 0) {
      for (const L of GATE_THRESHOLD_LEVELS) {
        push(`class-gate-threshold-${L}`, L, `Limiar do portão · nv. ${L}`, [
          'Impulse',
        ])
      }
    }
  }

  if (characterClass.id === CLASS_WIZARD_ID) {
    if (subclassId === 'school-unified-theory') {
      push('class-unified-feat-1', 1, 'Feito da teoria unificada · nv. 1')
    }
    if (thesisId === 'thesis-experimental-spellshaping') {
      push('class-thesis-spellshape-1', 1, 'Moldagem experimental · nv. 1', [
        'Spellshape',
      ])
    }
  }

  return extra
}

export function extraFeatSlotsFromSelections(
  selections: FeatSelection[] | undefined,
  featsById: Map<string, Feat>,
  sourceSlots: FeatSlot[],
  _charLevel: number,
): FeatSlot[] {
  const slotMap = new Map(sourceSlots.map((s) => [s.id, s]))
  const extra: FeatSlot[] = []
  for (const sel of selections ?? []) {
    const feat = featsById.get(sel.featId)
    if (!feat) continue
    for (const effect of feat.effects ?? []) {
      if (effect.kind !== 'extraAncestryFeatSlot') continue
      const source = slotMap.get(sel.slotId)
      extra.push({
        id: `bonus-ancestry-${sel.slotId}`,
        kind: 'ancestry',
        gainedAtLevel: effect.maxFeatLevel,
        label: `${feat.name} · feito extra`,
        earned: source != null && source.earned !== false,
      })
    }
  }
  return extra
}

/**
 * Slots de feito conforme ancestralidade + tabela da classe (PF2e).
 * Por padrão só os já ganhos (nível atual). `throughLevel` serve para
 * preview da tabela 1–20 na Progressão — a ficha não aplica o que ainda
 * não foi ganho.
 */
export function getFreeArchetypeFeatLevels(maxLevel = 20): number[] {
  const levels: number[] = []
  for (let L = 2; L <= maxLevel; L += 2) levels.push(L)
  return levels
}

export interface FeatSlotOptions {
  throughLevel?: number
  /** GM Core pág. 84 — slots extras só de arquétipo nos pares. */
  freeArchetype?: boolean
  /** War of Immortals — slots extras só de feito mítico nos pares. */
  mythicRules?: boolean
  /** Sem chamado, os slots míticos ainda não existem. */
  mythicCallingId?: string | null
  /** GM Core: 2 feitos no 1º e mais um em cada ímpar. */
  ancestryParagon?: boolean
  /** Segunda classe (variante Classe dupla). */
  secondClass?: CharacterClass | null
  selections?: FeatSelection[]
  feats?: Feat[]
}

export function getFeatSlots(
  character: Pick<Character, 'level' | 'ancestryId' | 'classId'> & {
    classChoices?: Character['classChoices']
  },
  characterClass?: CharacterClass | null,
  options?: FeatSlotOptions,
): FeatSlot[] {
  const charLevel = Math.max(1, Math.min(20, character.level))
  const through = Math.max(
    1,
    Math.min(20, options?.throughLevel ?? charLevel),
  )
  const slots: FeatSlot[] = []

  pushIndexedSlots(
    slots,
    getAncestryFeatLevels(options?.ancestryParagon),
    through,
    charLevel,
    'ancestry',
    'ancestry',
    (L) => `Feito de ancestralidade · nv. ${L}`,
  )

  if (character.classId && characterClass) {
    pushIndexedSlots(
      slots,
      getClassFeatLevels(characterClass),
      through,
      charLevel,
      'class',
      'class',
      (L) => `Feito de ${characterClass.name} · nv. ${L}`,
    )
    const second = options?.secondClass
    if (second && second.id !== characterClass.id) {
      pushIndexedSlots(
        slots,
        getClassFeatLevels(second),
        through,
        charLevel,
        'class',
        'class2',
        (L) => `Feito de ${second.name} (2ª classe) · nv. ${L}`,
      )
    }
    slots.push(
      ...extraClassFeatSlots(character, characterClass, through, charLevel),
    )
    pushIndexedSlots(
      slots,
      getSkillFeatLevels(characterClass),
      through,
      charLevel,
      'skill',
      'skill',
      (L) => `Feito de perícia · nv. ${L}`,
    )
    pushIndexedSlots(
      slots,
      getGeneralFeatLevels(characterClass),
      through,
      charLevel,
      'general',
      'general',
      (L) => `Feito geral · nv. ${L}`,
    )
    if (options?.freeArchetype) {
      pushIndexedSlots(
        slots,
        getFreeArchetypeFeatLevels(),
        through,
        charLevel,
        'archetype',
        'free-archetype',
        (L) => `Arquétipo grátis · nv. ${L}`,
      )
    }
    if (options?.mythicRules && options.mythicCallingId) {
      pushIndexedSlots(
        slots,
        getMythicFeatLevels(),
        through,
        charLevel,
        'mythic',
        'mythic',
        (L) =>
          L === 12
            ? `Destino mítico · nv. ${L}`
            : `Feito mítico · nv. ${L}`,
      )
    }
  }

  if (options?.selections && options.feats) {
    const featsById = new Map(options.feats.map((f) => [f.id, f]))
    slots.push(
      ...extraFeatSlotsFromSelections(
        options.selections,
        featsById,
        slots,
        charLevel,
      ),
    )
  }

  return slots
}

/** Só slots já ganhos no nível atual da ficha (sem reservas futuras). */
export function getFeatSlotsForBuilder(
  character: Pick<Character, 'level' | 'ancestryId' | 'classId'> & {
    classChoices?: Character['classChoices']
  },
  characterClass?: CharacterClass | null,
  options?: FeatSlotOptions,
): FeatSlot[] {
  return getFeatSlots(character, characterClass, options)
}

type FeatPrereqContext = {
  level: number
  ancestryId?: string | null
  heritageId?: string | null
  extraAncestryIds?: string[]
  extraHeritageIds?: string[]
  hasVersatileHeritage?: boolean
  classId?: string | null
  selectedFeatIds: string[]
  skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
  attributeModifiers?: Partial<Record<AttributeId, number>>
  featsById?: Map<string, Feat>
  ignoreDedicationLock?: boolean
  mythicRulesEnabled?: boolean
  mythicCallingId?: string | null
}

function formatSigned(value: number): string {
  return value >= 0 ? `+${value}` : String(value)
}

function isAttributeEchoLabel(label: string): boolean {
  return /^(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma|Força|Destreza|Constituição|Inteligência|Sabedoria|Carisma)\s*\+?-?\d+$/i.test(
    label.trim(),
  )
}

function selectedFeatsFromCtx(ctx: FeatPrereqContext): Feat[] {
  if (!ctx.featsById) return []
  return ctx.selectedFeatIds
    .map((id) => ctx.featsById!.get(id))
    .filter((f): f is Feat => Boolean(f))
}

function reasonFromCheck(check: FeatPrerequisiteCheck): string {
  if (
    check.key === 'dedication-lock' ||
    check.key === 'already-selected' ||
    check.key === 'multiclass' ||
    check.key.startsWith('mythic') ||
    check.key.startsWith('feat-class') ||
    check.key.startsWith('feat-ancestry') ||
    check.key.startsWith('feat-heritage')
  ) {
    return check.label
  }
  return check.current
    ? `Pré-requisito: ${check.label} (você: ${check.current}).`
    : `Pré-requisito: ${check.label}.`
}

/** Lista cada pré-requisito do feito e se a ficha cumpre. */
export function evaluateFeatPrerequisiteChecks(
  feat: Feat,
  ctx: FeatPrereqContext,
): FeatPrerequisiteCheck[] {
  const archetypes = listArchetypes()
  const selectedFeats = selectedFeatsFromCtx(ctx)
  const extraAncestryIds = ctx.extraAncestryIds ?? []
  const extraHeritageIds = ctx.extraHeritageIds ?? []
  const checks: FeatPrerequisiteCheck[] = []
  const pres = feat.prerequisites ?? []

  if (feat.level > 1 && !pres.some((pre) => pre.kind === 'level')) {
    checks.push({
      key: 'feat-level',
      label: `nível ${feat.level}+`,
      met: ctx.level >= feat.level,
      current: `nv. ${ctx.level}`,
    })
  }

  pres.forEach((pre, index) => {
    const key = `${pre.kind}-${index}`
    switch (pre.kind) {
      case 'level':
        checks.push({
          key,
          label: `nível ${pre.min}+`,
          met: ctx.level >= pre.min,
          current: `nv. ${ctx.level}`,
        })
        break
      case 'feat': {
        const name = localizeFeatName(pre.featName ?? 'outro feito', pre.featName)
        const met = ctx.selectedFeatIds.includes(pre.featId)
        checks.push({
          key,
          label: name,
          met,
          current: met ? 'na ficha' : 'ainda não',
        })
        break
      }
      case 'ancestry': {
        const met = Boolean(
          ctx.ancestryId &&
            (ctx.ancestryId === pre.ancestryId ||
              extraAncestryIds.includes(pre.ancestryId)),
        )
        checks.push({
          key,
          label: 'ancestralidade específica',
          met,
        })
        break
      }
      case 'class':
        checks.push({
          key,
          label: 'classe específica',
          met: ctx.classId === pre.classId,
        })
        break
      case 'heritage': {
        const met = Boolean(
          ctx.heritageId &&
            (ctx.heritageId === pre.heritageId ||
              extraHeritageIds.includes(pre.heritageId)),
        )
        checks.push({
          key,
          label: 'herança específica',
          met,
        })
        break
      }
      case 'archetype': {
        const hasArch = selectedFeats.some((f) => {
          const arch = findArchetypeForFeat(f, archetypes)
          return arch?.id === pre.archetypeId || f.archetypeId === pre.archetypeId
        })
        checks.push({
          key,
          label: 'Dedicação deste arquétipo',
          met: hasArch,
          current: hasArch ? 'na ficha' : 'ainda não',
        })
        break
      }
      case 'skillRank': {
        const rank = ctx.skillRanks?.[pre.skillId] ?? 'untrained'
        const met =
          ctx.skillRanks == null
            ? null
            : proficiencyRankValue(rank) >= proficiencyRankValue(pre.rank)
        checks.push({
          key,
          label: `${PROFICIENCY_LABELS[pre.rank]} em ${SKILL_LABELS[pre.skillId]}`,
          met,
          current: PROFICIENCY_LABELS[rank],
        })
        break
      }
      case 'attribute': {
        const mod = ctx.attributeModifiers?.[pre.attributeId] ?? 0
        const met =
          ctx.attributeModifiers == null ? null : mod >= pre.min
        checks.push({
          key,
          label: `${ATTRIBUTE_LABELS[pre.attributeId]} ${formatSigned(pre.min)}`,
          met,
          current: formatSigned(mod),
        })
        break
      }
      case 'text':
        if (/versatile heritage/i.test(pre.label)) {
          checks.push({
            key,
            label: 'herança versátil',
            met: Boolean(ctx.hasVersatileHeritage),
          })
        } else if (isAttributeEchoLabel(pre.label)) {
          break
        } else {
          checks.push({
            key,
            label: localizePrerequisiteLabel(pre.label),
            met: null,
          })
        }
        break
      default:
        break
    }
  })

  if (feat.ancestryId && !pres.some((pre) => pre.kind === 'ancestry')) {
    const ancestryOk =
      Boolean(ctx.ancestryId) &&
      (feat.ancestryId === ctx.ancestryId ||
        extraAncestryIds.includes(feat.ancestryId))
    const altHeritageOk = Boolean(
      feat.altHeritageIds?.length &&
        ctx.heritageId &&
        (feat.altHeritageIds.includes(ctx.heritageId) ||
          extraHeritageIds.some((id) => feat.altHeritageIds!.includes(id))),
    )
    const met = ancestryOk || altHeritageOk
    checks.push({
      key: 'feat-ancestry',
      label: !ctx.ancestryId
        ? 'Escolha a ancestralidade correspondente primeiro.'
        : met
          ? 'ancestralidade correspondente'
          : 'Feito de outra ancestralidade — não disponível para a sua.',
      met,
    })
  }

  if (feat.classId && !pres.some((pre) => pre.kind === 'class')) {
    const met = Boolean(ctx.classId) && feat.classId === ctx.classId
    checks.push({
      key: 'feat-class',
      label: !ctx.classId
        ? 'Escolha a classe correspondente primeiro.'
        : met
          ? 'classe correspondente'
          : 'Feito de outra classe — não disponível para a sua.',
      met,
    })
  }

  if (feat.heritageId && !pres.some((pre) => pre.kind === 'heritage')) {
    const met = Boolean(
      ctx.heritageId &&
        (feat.heritageId === ctx.heritageId ||
          extraHeritageIds.includes(feat.heritageId)),
    )
    checks.push({
      key: 'feat-heritage',
      label: met
        ? 'herança correspondente'
        : 'Requer uma herança específica que você não possui.',
      met,
    })
  }

  const multiclassReason = multiclassDedicationReason(
    feat,
    ctx.classId,
    archetypes,
  )
  if (multiclassReason) {
    checks.push({ key: 'multiclass', label: multiclassReason, met: false })
  }

  const lockReason = dedicationLockReason(
    feat,
    selectedFeats,
    archetypes,
    ctx.ignoreDedicationLock,
  )
  if (lockReason) {
    checks.push({ key: 'dedication-lock', label: lockReason, met: false })
  } else if (!ctx.ignoreDedicationLock) {
    const incomplete = resolveArchetypeProgress(selectedFeats, archetypes).find(
      (entry) => entry.incomplete,
    )
    if (
      incomplete &&
      featIgnoresDedicationLockFor(feat, incomplete.archetypeId)
    ) {
      checks.push({
        key: 'dedication-lock-exception',
        label: `pode pegar sem os 2 feitos extras de ${incomplete.name}`,
        met: true,
      })
    }
  }

  if (ctx.selectedFeatIds.includes(feat.id) && !feat.repeatable) {
    checks.push({
      key: 'already-selected',
      label: 'Este feito já ocupa outro slot.',
      met: false,
    })
  }

  if (hasMythicTrait(feat) || isGeneralMythicFeat(feat)) {
    if (!ctx.mythicRulesEnabled) {
      checks.push({
        key: 'mythic-rules',
        label: 'Requer regras míticas ligadas em Configurações.',
        met: false,
      })
    } else if (!ctx.mythicCallingId) {
      checks.push({
        key: 'mythic-calling',
        label: 'Escolha o chamado mítico primeiro.',
        met: false,
      })
    }
  }

  return checks
}

export function evaluateFeatAvailability(
  feat: Feat,
  ctx: {
    level: number
    ancestryId?: string | null
    heritageId?: string | null
    extraAncestryIds?: string[]
    extraHeritageIds?: string[]
    hasVersatileHeritage?: boolean
    classId?: string | null
    selectedFeatIds: string[]
    /** Postos atuais — para pré-requisito de perícia. */
    skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
    /** Modificadores de atributo — para pré-requisito de atributo. */
    attributeModifiers?: Partial<Record<AttributeId, number>>
    /** Slot que estamos preenchendo (filtra categoria) */
    slotKind?: FeatCategory
    /** Nível em que o slot foi concedido (feito ≤ este nível) */
    slotLevel?: number
    /** Traços obrigatórios deste slot (Impulse, Spellshape…). */
    requiredTraits?: string[]
    /** Catálogo para resolver Dedicações e o bloqueio de arquétipo. */
    featsById?: Map<string, Feat>
    /** GM Core: ignorar o bloqueio de 2 feitos entre Dedicações. */
    ignoreDedicationLock?: boolean
    mythicRulesEnabled?: boolean
    mythicCallingId?: string | null
  },
): FeatAvailability {
  const reasons: string[] = []
  const archetypes = listArchetypes()
  const selectedFeats = (ctx.featsById
    ? ctx.selectedFeatIds
        .map((id) => ctx.featsById!.get(id))
        .filter((f): f is Feat => Boolean(f))
    : []) as Feat[]

  if (ctx.slotKind) {
    if (!featFitsSlot(feat, ctx.slotKind, archetypes)) {
      const catLabel: Record<FeatCategory, string> = {
        ancestry: 'ancestralidade',
        class: 'classe',
        skill: 'perícia',
        general: 'geral',
        archetype: 'arquétipo',
        mythic: 'mítico',
        other: 'outro',
      }
      reasons.push(
        `Este feito é de ${catLabel[feat.category]}, não encaixa neste slot de ${catLabel[ctx.slotKind]}.`,
      )
    }
  }

  if (ctx.slotLevel != null && feat.level > ctx.slotLevel) {
    reasons.push(
      `Este slot é do nv. ${ctx.slotLevel}; o feito exige nv. ${feat.level}.`,
    )
  }

  if (ctx.requiredTraits && ctx.requiredTraits.length > 0) {
    const traits = (feat.traits ?? []).map((t) => t.toLowerCase())
    for (const needed of ctx.requiredTraits) {
      if (!traits.includes(needed.toLowerCase())) {
        reasons.push(`Este slot pede o traço ${needed}.`)
      }
    }
  }

  if (ctx.slotKind === 'mythic' && ctx.slotLevel != null) {
    const selectedDestiny = selectedFeats.find((f) =>
      isMythicDestinyDedication(f),
    )
    if (ctx.slotLevel === 12) {
      if (!isMythicDestinyDedication(feat)) {
        reasons.push(
          'No 12º o slot mítico extra é a Dedicação de um destino mítico.',
        )
      }
    } else if (ctx.slotLevel < 12) {
      if (!isGeneralMythicFeat(feat)) {
        reasons.push('Até o 10º este slot só aceita feitos míticos (não destinos).')
      }
    } else if (isMythicDestinyDedication(feat)) {
      reasons.push(
        'A Dedicação de destino entra no slot mítico do 12º. Daqui pra frente, feitos daquele destino ou feitos míticos que você ainda não tem.',
      )
    } else if (feat.archetypeId) {
      if (!selectedDestiny) {
        reasons.push('Pegue a Dedicação de destino no slot mítico do 12º primeiro.')
      } else if (feat.archetypeId !== selectedDestiny.archetypeId) {
        reasons.push('Só o seu destino mítico (um por personagem).')
      }
    } else if (!isGeneralMythicFeat(feat)) {
      reasons.push('Este slot mítico aceita feitos do seu destino ou feitos míticos.')
    }
  }

  for (const check of evaluateFeatPrerequisiteChecks(feat, ctx)) {
    if (check.met === false) reasons.push(reasonFromCheck(check))
  }

  return {
    feat,
    available: reasons.length === 0,
    reasons,
  }
}

export function sanitizeFeatSelections(
  selections: FeatSelection[] | null | undefined,
  slots: FeatSlot[],
  featsById: Map<string, Feat>,
  ctx: {
    level: number
    ancestryId?: string | null
    heritageId?: string | null
    extraAncestryIds?: string[]
    extraHeritageIds?: string[]
    hasVersatileHeritage?: boolean
    classId?: string | null
    ignoreDedicationLock?: boolean
    mythicRulesEnabled?: boolean
    mythicCallingId?: string | null
  },
): FeatSelection[] {
  const slotMap = new Map(slots.map((s) => [s.id, s]))
  const selectedIds = (selections ?? []).map((s) => s.featId)
  const kept: FeatSelection[] = []

  for (const sel of selections ?? []) {
    const slot = slotMap.get(sel.slotId)
    const feat = featsById.get(sel.featId)
    if (!slot || !feat) continue
    const avail = evaluateFeatAvailability(feat, {
      ...ctx,
      selectedFeatIds: selectedIds.filter((id) => id !== sel.featId),
      slotKind: slot.kind,
      slotLevel: slot.gainedAtLevel,
      featsById,
    })
    if (avail.available) kept.push(sel)
  }
  return kept
}

export function validateFeatSelections(
  selections: FeatSelection[],
  slots: FeatSlot[],
  featsById: Map<string, Feat>,
  ctx: {
    level: number
    ancestryId?: string | null
    heritageId?: string | null
    extraAncestryIds?: string[]
    extraHeritageIds?: string[]
    hasVersatileHeritage?: boolean
    classId?: string | null
    ignoreDedicationLock?: boolean
  },
): FeatValidationIssue[] {
  const issues: FeatValidationIssue[] = []
  const slotMap = new Map(slots.map((s) => [s.id, s]))
  const usedSlots = new Set<string>()
  const usedFeats = new Set<string>()

  for (const sel of selections) {
    if (usedSlots.has(sel.slotId)) {
      issues.push({
        field: sel.slotId,
        message: 'Slot preenchido mais de uma vez',
      })
    }
    usedSlots.add(sel.slotId)

    const slot = slotMap.get(sel.slotId)
    const feat = featsById.get(sel.featId)

    if (usedFeats.has(sel.featId) && !feat?.repeatable) {
      issues.push({
        field: sel.featId,
        message: 'O mesmo feito não pode ocupar dois slots',
      })
    }
    usedFeats.add(sel.featId)

    if (!slot) {
      issues.push({ field: sel.slotId, message: 'Slot inválido para este nível/classe' })
      continue
    }
    if (!feat) {
      issues.push({ field: sel.featId, message: 'Feito não encontrado no compêndio' })
      continue
    }
    const avail = evaluateFeatAvailability(feat, {
      ...ctx,
      selectedFeatIds: selections
        .filter((s) => s.featId !== sel.featId)
        .map((s) => s.featId),
      slotKind: slot.kind,
      slotLevel: slot.gainedAtLevel,
      featsById,
    })
    if (!avail.available) {
      issues.push({
        field: sel.slotId,
        message: `${feat.name}: ${avail.reasons[0]}`,
      })
    }
  }

  return issues
}

export function pruneFeatSelections(
  character: Pick<
    Character,
    | 'level'
    | 'ancestryId'
    | 'heritageId'
    | 'classId'
    | 'featSelections'
    | 'featChoices'
  >,
  feats: Feat[],
  characterClass?: CharacterClass | null,
  heritage?: Heritage | null,
  options?: {
    freeArchetype?: boolean
    ignoreDedicationLock?: boolean
    mythicRules?: boolean
    mythicCallingId?: string | null
    ancestryParagon?: boolean
    secondClass?: CharacterClass | null
  },
): FeatSelection[] {
  const featsById = new Map(feats.map((f) => [f.id, f]))
  const slots = getFeatSlots(character, characterClass, {
    freeArchetype: options?.freeArchetype,
    mythicRules: options?.mythicRules,
    mythicCallingId: options?.mythicCallingId,
    ancestryParagon: options?.ancestryParagon,
    secondClass: options?.secondClass,
    selections: character.featSelections,
    feats,
  })
  const activeHeritage =
    heritage && character.heritageId === heritage.id ? heritage : null
  return sanitizeFeatSelections(character.featSelections, slots, featsById, {
    level: character.level,
    ancestryId: character.ancestryId,
    heritageId: character.heritageId,
    extraAncestryIds: [
      ...extraAncestryIdsFromHeritage(activeHeritage),
      ...extraAncestryIdsFromFeatChoices(character.featChoices),
    ],
    extraHeritageIds: extraHeritageIdsFromHeritage(activeHeritage),
    hasVersatileHeritage: isVersatileHeritage(activeHeritage),
    classId: character.classId,
    ignoreDedicationLock: options?.ignoreDedicationLock,
    mythicRulesEnabled: options?.mythicRules,
    mythicCallingId: options?.mythicCallingId,
  })
}

export function selectionsToGrantedFeats(
  selections: FeatSelection[],
  featsById: Map<string, Feat>,
  slots: FeatSlot[],
): GrantedFeat[] {
  const slotMap = new Map(slots.map((s) => [s.id, s]))
  return selections.flatMap((sel) => {
    const feat = featsById.get(sel.featId)
    const slot = slotMap.get(sel.slotId)
    if (!feat || !slot || slot.earned === false) return []
    return [
      hydrateGrantedFeat(
        {
          id: `sel-${sel.slotId}-${feat.id}`,
          featId: feat.id,
          featName: feat.name,
          originalName: feat.originalName,
          featType: feat.category,
          description: feat.description,
          actionType: feat.actionType,
          traits: feat.traits,
          trigger: feat.trigger,
          frequency: feat.frequency,
          rarity: feat.rarity,
          aonUrl: feat.aonUrl,
          level: feat.level,
          sourceType: 'featSelection',
          sourceId: feat.id,
          sourceLabel: slot.label,
        },
        featsById,
      ),
    ]
  })
}

export type FeatLookupQuery = {
  featId?: string | null
  originalName?: string
  featName?: string
}

const PLACEHOLDER_FEAT_KEYS = new Set([
  'general feat',
  'feito geral',
  'feito geral escolhido',
  'multiclass dedication',
  'dedicacao multiclasse',
  'dedicacao multiclasse classe escolhida',
  'everyday form or teakettle form',
  'forma',
  'forma escolhida',
  'athletics skill feat',
  'feito de atletismo',
  'specialty crafting or multilingual',
  'feito de pericia',
])

export function isPlaceholderFeatLookup(query: FeatLookupQuery): boolean {
  for (const raw of [query.originalName, query.featName]) {
    if (!raw?.trim()) continue
    const key = normalizeFeatLookupKey(raw)
    if (key && PLACEHOLDER_FEAT_KEYS.has(key)) return true
  }
  return false
}

export function normalizeFeatLookupKey(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/\s*\([^)]*\)/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function findFeatInCatalog(
  feats: Feat[] | Map<string, Feat>,
  query: FeatLookupQuery,
): Feat | undefined {
  const byId =
    feats instanceof Map
      ? feats
      : new Map(feats.map((feat) => [feat.id, feat]))
  const list = feats instanceof Map ? [...feats.values()] : feats

  if (query.featId) {
    const hit = byId.get(query.featId)
    if (hit) return hit
  }

  const candidates = [query.originalName, query.featName].filter(
    (value): value is string => Boolean(value?.trim()),
  )
  for (const raw of candidates) {
    const key = normalizeFeatLookupKey(raw)
    if (!key || PLACEHOLDER_FEAT_KEYS.has(key)) continue
    const found = list.find(
      (feat) =>
        normalizeFeatLookupKey(feat.originalName) === key ||
        normalizeFeatLookupKey(feat.name) === key,
    )
    if (found) return found
  }
  return undefined
}

export function hydrateGrantedFeat(
  grant: GrantedFeat,
  feats: Feat[] | Map<string, Feat>,
): GrantedFeat {
  const found = findFeatInCatalog(feats, grant)
  const originalName = found?.originalName ?? grant.originalName
  const rawDescription = grant.description || found?.description || ''
  const lookedUp = localizeFeatDescription(
    rawDescription,
    originalName,
    grant.featName,
  )
  const description = enrichFeatDescription(
    {
      description: lookedUp.trim() ? lookedUp : rawDescription,
      effects: found?.effects,
    },
    feats,
  )
  if (!found) {
    return description !== (grant.description ?? '')
      ? { ...grant, description }
      : grant
  }
  return {
    ...grant,
    featId: grant.featId ?? found.id,
    featName: found.name,
    originalName: originalName ?? grant.originalName,
    featType: grant.featType ?? found.category,
    description: description || found.description,
    actionType: grant.actionType ?? found.actionType,
    traits: grant.traits?.length ? grant.traits : found.traits,
    trigger: grant.trigger ?? found.trigger,
    frequency: grant.frequency ?? found.frequency,
    rarity: grant.rarity ?? found.rarity,
    aonUrl: grant.aonUrl ?? found.aonUrl,
    level: grant.level ?? found.level,
  }
}

export function catalogFeatIdsForGrants(
  grants: FeatLookupQuery[],
  feats: Feat[] | Map<string, Feat>,
): string[] {
  const ids: string[] = []
  const seen = new Set<string>()
  for (const grant of grants) {
    const found = findFeatInCatalog(feats, grant)
    if (found && !seen.has(found.id)) {
      seen.add(found.id)
      ids.push(found.id)
    }
  }
  return ids
}
