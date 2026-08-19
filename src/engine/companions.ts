import type { AttributeId, ResolvedCharacterSheet } from '@/types'
import type {
  AnimalCompanionSpecialization,
  AnimalCompanionStage,
  AnimalCompanionState,
  CharacterCompanions,
  ConstructCompanionState,
  EidolonState,
  FamiliarAbilityDefinition,
  FamiliarAbilitySelection,
  FamiliarOrPetState,
} from '@/types/companion'
import {
  ANIMAL_COMPANION_STAGE_LABELS,
  ANIMAL_SPECIALIZATION_LABELS,
  CONSTRUCT_COMPANION_STAGE_LABELS,
  DEFAULT_FAMILIAR_ABILITY_SLOTS,
  FAMILIAR_HP_PER_LEVEL,
  TOUGH_HP_PER_LEVEL,
} from '@/types/companion'
import {
  FAMILIAR_ABILITIES_BY_ID,
  FAMILIAR_ABILITY_DEFINITIONS,
} from '@/data/seeds/familiarAbilities'
import {
  getAnimalCompanionType,
  getEidolonType,
  getFamiliarForm,
  getSpecificFamiliar,
  listAnimalCompanionTypes,
  listEidolonTypes,
  listFamiliarForms,
  listSpecificFamiliars,
} from './companionCatalog'
import {
  resolveAnimalCompanionStats,
  type ResolvedAnimalCompanionStats,
} from './animalCompanion'
import {
  CONSTRUCT_MIRACLE_GEARS_SKILLS,
  nextConstructCompanionStages,
  resolveConstructCompanionStats,
  type ResolvedConstructCompanionStats,
} from './constructCompanion'
import { getConstructModification } from '@/data/seeds/constructCompanions'
import {
  resolveEidolonStats,
  type ResolvedEidolonStats,
} from './eidolon'
import { createId } from '@/utils/id'
import { sumConnectionBonus } from './connections'
import type { ResolvedCompanionAttack } from './animalCompanion'

export {
  listAnimalCompanionTypes,
  getAnimalCompanionType,
  listFamiliarForms,
  getFamiliarForm,
  listEidolonTypes,
  getEidolonType,
  listSpecificFamiliars,
  getSpecificFamiliar,
}
export {
  getConstructModification,
  listConstructModifications,
} from '@/data/seeds/constructCompanions'
export {
  CONSTRUCT_MIRACLE_GEARS_SKILLS,
  nextConstructCompanionStages,
  resolveConstructCompanionStats,
}
export type { ResolvedAnimalCompanionStats, ResolvedConstructCompanionStats, ResolvedEidolonStats }

export interface CompanionValidationIssue {
  field: string
  message: string
}

export interface ResolvedFamiliarAbility {
  selection: FamiliarAbilitySelection
  definition: FamiliarAbilityDefinition | null
  /** Seleção aponta para ID desconhecido */
  missing: boolean
}

export interface ResolvedFamiliarOrPet {
  state: FamiliarOrPetState
  abilitySlots: number
  abilitiesUsed: number
  abilities: ResolvedFamiliarAbility[]
  maxHp: number | null
  currentHp: number | null
  /** Percepção / Acrobacia / Furtividade sugeridos (familiar) */
  skillModifier: number | null
  ac: number | null
  issues: CompanionValidationIssue[]
  /** Ficha de tipo ainda não ligada */
  catalogPending: boolean
}

export interface ResolvedAnimalCompanion {
  state: AnimalCompanionState
  stageLabel: string
  specializationLabel: string | null
  currentHp: number | null
  maxHp: number | null
  stats: ResolvedAnimalCompanionStats | null
  /** Stats completos dependem do typeId no catálogo */
  catalogPending: boolean
  issues: CompanionValidationIssue[]
}

export interface ResolvedConstructCompanion {
  state: ConstructCompanionState
  stageLabel: string
  currentHp: number | null
  maxHp: number | null
  stats: ResolvedConstructCompanionStats
  issues: CompanionValidationIssue[]
}

export interface ResolvedEidolon {
  state: EidolonState
  currentHp: number | null
  maxHp: number | null
  stats: ResolvedEidolonStats | null
  catalogPending: boolean
  issues: CompanionValidationIssue[]
}

export interface ResolvedCompanions {
  animalCompanion: ResolvedAnimalCompanion | null
  familiarOrPet: ResolvedFamiliarOrPet | null
  constructCompanion: ResolvedConstructCompanion | null
  eidolon: ResolvedEidolon | null
  issues: CompanionValidationIssue[]
  /** Resumo das regras de coexistência */
  coexistenceNote: string
}

export function emptyCompanions(): CharacterCompanions {
  return {
    animalCompanion: null,
    familiarOrPet: null,
    constructCompanion: null,
    eidolon: null,
  }
}

export function createEmptyAnimalCompanion(
  partial?: Partial<AnimalCompanionState>,
): AnimalCompanionState {
  return {
    id: createId('acomp'),
    kind: 'animalCompanion',
    name: 'Companheiro',
    typeId: null,
    typeLabel: '',
    stage: 'young',
    specialization: null,
    isMount: false,
    currentHp: null,
    notes: '',
    ...partial,
  }
}

export function createEmptyFamiliar(
  partial?: Partial<FamiliarOrPetState>,
): FamiliarOrPetState {
  return {
    id: createId('fam'),
    kind: 'familiar',
    name: 'Familiar',
    formLabel: '',
    typeId: null,
    extraAbilitySlots: 0,
    selectedAbilities: [],
    spellcastingAttributeId: null,
    currentHp: null,
    notes: '',
    ...partial,
  }
}

export function createEmptyPet(
  partial?: Partial<FamiliarOrPetState>,
): FamiliarOrPetState {
  return {
    ...createEmptyFamiliar({ name: 'Mascote', kind: 'pet' }),
    ...partial,
    kind: 'pet',
  }
}

export function createEmptyConstructCompanion(
  partial?: Partial<ConstructCompanionState>,
): ConstructCompanionState {
  return {
    id: createId('ccomp'),
    kind: 'constructCompanion',
    name: 'Construto',
    stage: 'prototype',
    size: 'medium',
    agileDamageType: 'cortante',
    projectileDamageType: 'perfurante',
    initialModificationId: null,
    breakthroughModificationId: null,
    revolutionaryModificationId: null,
    miracleGearsSkillIds: null,
    turretMode: false,
    isMount: false,
    currentHp: null,
    notes: '',
    ...partial,
  }
}

export function createEmptyEidolon(
  partial?: Partial<EidolonState>,
): EidolonState {
  return {
    id: createId('eidl'),
    kind: 'eidolon',
    name: 'Eidolon',
    typeId: null,
    typeLabel: '',
    keyAttribute: 'strength',
    arrayId: null,
    size: 'medium',
    primaryAttack: 'd8-shove',
    primaryFormLabel: 'Golpe primário',
    secondaryFormLabel: 'Golpe secundário',
    manifested: true,
    notes: '',
    ...partial,
  }
}

export function listFamiliarAbilityDefinitions(opts?: {
  includeMaster?: boolean
  forPet?: boolean
}): FamiliarAbilityDefinition[] {
  const includeMaster = opts?.includeMaster !== false
  const forPet = opts?.forPet === true
  return FAMILIAR_ABILITY_DEFINITIONS.filter((a) => {
    if (forPet) return a.kind === 'pet'
    if (!includeMaster && a.kind === 'master') return false
    return true
  })
}

export function getFamiliarAbilitySlots(
  state: FamiliarOrPetState | null | undefined,
): number {
  if (!state) return 0
  const extra = Math.max(0, state.extraAbilitySlots ?? 0)
  return DEFAULT_FAMILIAR_ABILITY_SLOTS + extra
}

/** Habilidades inatas da forma que se aplicam a este familiar / mascote. */
export function innateAbilityIdsForForm(
  formId: string | null | undefined,
  kind: FamiliarOrPetState['kind'],
): string[] {
  const form = getFamiliarForm(formId)
  if (!form) return []
  return form.innateAbilityIds.filter((id) => {
    const def = FAMILIAR_ABILITIES_BY_ID[id]
    if (!def) return false
    if (kind === 'pet') return def.kind === 'pet'
    return true
  })
}

/** Troca a forma e trava as habilidades inatas (remove inatas da forma anterior). */
export function applyFamiliarForm(
  state: FamiliarOrPetState,
  formId: string | null,
): FamiliarOrPetState {
  const form = getFamiliarForm(formId)
  const kept = state.selectedAbilities.filter((s) => !s.innate)
  if (!form) {
    return {
      ...state,
      typeId: null,
      formLabel: '',
      selectedAbilities: kept,
    }
  }
  const innateIds = innateAbilityIdsForForm(form.id, state.kind)
  const innateSet = new Set(innateIds)
  const innate = innateIds.map((abilityId) => ({
    abilityId,
    innate: true as const,
  }))
  const keptUnique = kept.filter((s) => !innateSet.has(s.abilityId))
  const wasSpecific = state.typeId?.startsWith('specific-')
  return {
    ...state,
    typeId: form.id,
    formLabel: form.id === 'form-custom' ? (state.formLabel ?? '') : form.name,
    extraAbilitySlots: wasSpecific ? 0 : state.extraAbilitySlots,
    selectedAbilities: [...innate, ...keptUnique],
  }
}

/** Aplica um familiar específico (trava habilidades concedidas e slots exigidos). */
export function applySpecificFamiliar(
  state: FamiliarOrPetState,
  specificId: string | null,
): FamiliarOrPetState {
  if (!specificId) {
    return applyFamiliarForm(
      { ...state, extraAbilitySlots: 0 },
      'form-custom',
    )
  }
  const spec = getSpecificFamiliar(specificId)
  if (!spec) return state
  const innate = spec.grantedAbilities.flatMap((g) =>
    g.abilityId
      ? [
          {
            abilityId: g.abilityId,
            innate: true as const,
            optionNote: g.note,
          },
        ]
      : [],
  )
  const innateSet = new Set(innate.map((s) => s.abilityId))
  const kept = state.selectedAbilities.filter(
    (s) => !s.innate && !innateSet.has(s.abilityId),
  )
  return {
    ...state,
    typeId: spec.id,
    formLabel: spec.name,
    extraAbilitySlots: Math.max(
      0,
      spec.requiredAbilities - DEFAULT_FAMILIAR_ABILITY_SLOTS,
    ),
    selectedAbilities: [...innate, ...kept],
  }
}

function hasTough(selections: FamiliarAbilitySelection[]): boolean {
  return selections.some((s) => s.abilityId === 'fam-tough')
}

/** PV máx. provisórios (5×nível; +2×nível com Resistente). */
export function estimateFamiliarMaxHp(
  level: number,
  selections: FamiliarAbilitySelection[],
): number {
  const lv = Math.max(1, level)
  let hp = FAMILIAR_HP_PER_LEVEL * lv
  if (hasTough(selections)) hp += TOUGH_HP_PER_LEVEL * lv
  return hp
}

/**
 * Modificador sugerido para Percepção / Acrobacia / Furtividade do familiar.
 * max(3 + nível, atributo de conjuração + nível).
 */
export function estimateFamiliarSkillModifier(
  level: number,
  spellcastingMod: number | null | undefined,
): number {
  const lv = Math.max(1, level)
  const base = 3 + lv
  if (spellcastingMod == null || !Number.isFinite(spellcastingMod)) return base
  return Math.max(base, spellcastingMod + lv)
}

const STAGE_ORDER: AnimalCompanionStage[] = [
  'young',
  'mature',
  'nimble',
  'savage',
  'specialized',
]

/** Próximos estágios válidos a partir do atual (UI de avanço). */
export function nextAnimalCompanionStages(
  stage: AnimalCompanionStage,
): AnimalCompanionStage[] {
  switch (stage) {
    case 'young':
      return ['mature']
    case 'mature':
      return ['nimble', 'savage']
    case 'nimble':
    case 'savage':
      return ['specialized']
    case 'specialized':
      return []
  }
}

export function animalCompanionStageRank(stage: AnimalCompanionStage): number {
  return STAGE_ORDER.indexOf(stage)
}

export function validateFamiliarSelections(
  state: FamiliarOrPetState,
  characterLevel: number,
): CompanionValidationIssue[] {
  const issues: CompanionValidationIssue[] = []
  const slots = getFamiliarAbilitySlots(state)
  const used = state.selectedAbilities.length

  if (state.typeId && !getFamiliarForm(state.typeId)) {
    issues.push({
      field: 'familiarOrPet.typeId',
      message: `Forma de familiar desconhecida: ${state.typeId}`,
    })
  }

  if (used > slots) {
    issues.push({
      field: 'selectedAbilities',
      message: `Mais habilidades (${used}) do que slots (${slots}). Remova ou aumente slots extras.`,
    })
  }

  const traitChangers = state.selectedAbilities.filter((s) => {
    const def = FAMILIAR_ABILITIES_BY_ID[s.abilityId]
    return def?.changesCreatureTrait
  })
  if (traitChangers.length > 1) {
    issues.push({
      field: 'selectedAbilities',
      message:
        'No máximo uma habilidade que muda o traço da criatura (constructo, planta, etc.).',
    })
  }

  const seen = new Set<string>()
  for (const sel of state.selectedAbilities) {
    const def = FAMILIAR_ABILITIES_BY_ID[sel.abilityId]
    if (!def) {
      issues.push({
        field: 'selectedAbilities',
        message: `Habilidade desconhecida: ${sel.abilityId}`,
      })
      continue
    }
    if (state.kind === 'pet' && def.kind !== 'pet') {
      issues.push({
        field: 'selectedAbilities',
        message: `Mascote só usa habilidades do feito Mascote — “${def.name}” não se aplica.`,
      })
    }
    if (def.minLevel != null && characterLevel < def.minLevel) {
      issues.push({
        field: 'selectedAbilities',
        message: `“${def.name}” exige nível ${def.minLevel}+.`,
      })
    }
    if (!def.repeatable) {
      if (seen.has(sel.abilityId)) {
        issues.push({
          field: 'selectedAbilities',
          message: `“${def.name}” não é repetível.`,
        })
      }
      seen.add(sel.abilityId)
    }
  }

  if (
    state.kind === 'familiar' &&
    state.selectedAbilities.some((s) => s.abilityId === 'fam-construct') &&
    !hasTough(state.selectedAbilities)
  ) {
    issues.push({
      field: 'selectedAbilities',
      message: 'Construto exige a habilidade Resistente.',
    })
  }

  return issues
}

export function validateCompanions(
  companions: CharacterCompanions | null | undefined,
  characterLevel: number,
): CompanionValidationIssue[] {
  const issues: CompanionValidationIssue[] = []
  if (!companions) return issues

  const f = companions.familiarOrPet
  if (f) {
    if (f.kind !== 'familiar' && f.kind !== 'pet') {
      issues.push({
        field: 'familiarOrPet.kind',
        message: 'Tipo inválido: use familiar ou mascote.',
      })
    }
    issues.push(...validateFamiliarSelections(f, characterLevel))
  }

  const a = companions.animalCompanion
  if (a) {
    if (
      a.stage === 'specialized' &&
      (a.specialization == null || a.specialization === undefined)
    ) {
      issues.push({
        field: 'animalCompanion.specialization',
        message: 'Companheiro especializado precisa de uma especialização.',
      })
    }
    if (a.stage !== 'specialized' && a.specialization) {
      issues.push({
        field: 'animalCompanion.specialization',
        message: 'Especialização só se aplica no estágio Especializado.',
      })
    }
    const type = getAnimalCompanionType(a.typeId)
    if (type?.minLevel != null && characterLevel < type.minLevel) {
      issues.push({
        field: 'animalCompanion.typeId',
        message: `“${type.name}” é companheiro avançado (nível ${type.minLevel}+).`,
      })
    }
  }

  const c = companions.constructCompanion
  if (c) {
    issues.push(...validateConstructCompanion(c, characterLevel))
  }

  const e = companions.eidolon
  if (e) {
    if (e.typeId && !getEidolonType(e.typeId)) {
      issues.push({
        field: 'eidolon.typeId',
        message: `Tipo de eidolon desconhecido: ${e.typeId}`,
      })
    }
  }

  if (a && c) {
    issues.push({
      field: 'constructCompanion',
      message:
        'Companheiro construto ou companheiro animal — não os dois (Guns & Gears).',
    })
  }

  return issues
}

function validateConstructCompanion(
  state: ConstructCompanionState,
  characterLevel: number,
): CompanionValidationIssue[] {
  const issues: CompanionValidationIssue[] = []
  const increased = state.initialModificationId === 'construct-mod-increased-size'

  if (state.stage === 'prototype' && !increased) {
    if (state.size !== 'small' && state.size !== 'medium') {
      issues.push({
        field: 'constructCompanion.size',
        message:
          'No protótipo o tamanho é Pequeno ou Médio (Grande exige Tamanho Aumentado).',
      })
    }
  } else if (
    state.size !== 'small' &&
    state.size !== 'medium' &&
    state.size !== 'large'
  ) {
    issues.push({
      field: 'constructCompanion.size',
      message: 'Tamanho do construto: Pequeno, Médio ou Grande.',
    })
  }

  const slots: Array<{
    field: string
    id: string | null | undefined
    expected: 'initial' | 'breakthrough' | 'revolutionary'
  }> = [
    {
      field: 'constructCompanion.initialModificationId',
      id: state.initialModificationId,
      expected: 'initial',
    },
    {
      field: 'constructCompanion.breakthroughModificationId',
      id: state.breakthroughModificationId,
      expected: 'breakthrough',
    },
    {
      field: 'constructCompanion.revolutionaryModificationId',
      id: state.revolutionaryModificationId,
      expected: 'revolutionary',
    },
  ]

  const selected = new Set<string>()
  for (const slot of slots) {
    if (!slot.id) continue
    const def = getConstructModification(slot.id)
    if (!def) {
      issues.push({
        field: slot.field,
        message: `Modificação desconhecida: ${slot.id}`,
      })
      continue
    }
    selected.add(def.id)
    if (def.tier !== slot.expected) {
      issues.push({
        field: slot.field,
        message: `“${def.name}” não é uma modificação ${slot.expected}.`,
      })
    }
    if (def.minLevel != null && characterLevel < def.minLevel) {
      issues.push({
        field: slot.field,
        message: `“${def.name}” exige nível ${def.minLevel}+.`,
      })
    }
    if (
      def.prerequisiteModificationId &&
      !selected.has(def.prerequisiteModificationId) &&
      state.initialModificationId !== def.prerequisiteModificationId &&
      state.breakthroughModificationId !== def.prerequisiteModificationId
    ) {
      const pre = getConstructModification(def.prerequisiteModificationId)
      issues.push({
        field: slot.field,
        message: `“${def.name}” exige ${pre?.name ?? def.prerequisiteModificationId}.`,
      })
    }
  }

  if (
    state.breakthroughModificationId === 'construct-mod-marvelous-gears' &&
    state.initialModificationId !== 'construct-mod-wonder-gears'
  ) {
    issues.push({
      field: 'constructCompanion.breakthroughModificationId',
      message: 'Engrenagens Magníficas exige Engrenagens Maravilha.',
    })
  }
  if (
    state.breakthroughModificationId === 'construct-mod-turret-configuration' &&
    state.initialModificationId !== 'construct-mod-projectile-launcher'
  ) {
    issues.push({
      field: 'constructCompanion.breakthroughModificationId',
      message: 'Configuração de Torre exige Lançador de Projéteis.',
    })
  }
  if (
    state.revolutionaryModificationId === 'construct-mod-miracle-gears' &&
    state.breakthroughModificationId !== 'construct-mod-marvelous-gears'
  ) {
    issues.push({
      field: 'constructCompanion.revolutionaryModificationId',
      message: 'Engrenagens Milagre exige Engrenagens Magníficas.',
    })
  }

  if (state.revolutionaryModificationId === 'construct-mod-miracle-gears') {
    const picks = state.miracleGearsSkillIds
    if (!picks || picks.length !== 2 || picks[0] === picks[1]) {
      issues.push({
        field: 'constructCompanion.miracleGearsSkillIds',
        message:
          'Engrenagens Milagre: escolha duas perícias diferentes de Inteligência ou Carisma.',
      })
    } else {
      for (const id of picks) {
        if (!CONSTRUCT_MIRACLE_GEARS_SKILLS.includes(id)) {
          issues.push({
            field: 'constructCompanion.miracleGearsSkillIds',
            message: `“${id}” não é perícia de Inteligência ou Carisma.`,
          })
        }
      }
    }
  }

  return issues
}

function signedBonus(n: number): string {
  return n > 0 ? `+${n}` : String(n)
}

function applyCompanionCombatBonuses<
  T extends { maxHp?: number; ac: number; attacks: ResolvedCompanionAttack[] },
>(stats: T, sheet: ResolvedCharacterSheet, withHp: boolean): T {
  const hp = withHp
    ? sumConnectionBonus(sheet.connections, 'companion.hp')
    : { total: 0, parts: [] }
  const ac = sumConnectionBonus(sheet.connections, 'companion.ac')
  const atk = sumConnectionBonus(sheet.connections, 'companion.attack')
  const dmg = sumConnectionBonus(sheet.connections, 'companion.damage')
  if (hp.total === 0 && ac.total === 0 && atk.total === 0 && dmg.total === 0) {
    return stats
  }
  return {
    ...stats,
    ...(withHp && stats.maxHp != null
      ? { maxHp: stats.maxHp + hp.total }
      : {}),
    ac: stats.ac + ac.total,
    attacks: stats.attacks.map((attack) => ({
      ...attack,
      attackModifier: attack.attackModifier + atk.total,
      damageLabel:
        dmg.total !== 0
          ? `${attack.damageLabel} ${signedBonus(dmg.total)}`
          : attack.damageLabel,
    })),
  } as T
}

function resolveSpellMod(
  sheet: ResolvedCharacterSheet,
  attributeId: AttributeId | null | undefined,
): number | null {
  if (!attributeId) return null
  const attr = sheet.attributes.find((a) => a.id === attributeId)
  return attr?.modifier ?? null
}

export function resolveCompanions(
  companions: CharacterCompanions | null | undefined,
  sheet: ResolvedCharacterSheet,
): ResolvedCompanions {
  const level = sheet.character.level
  const issues = validateCompanions(companions, level)
  const ac = sheet.derived.ac.value

  let animalCompanion: ResolvedAnimalCompanion | null = null
  if (companions?.animalCompanion) {
    const state = companions.animalCompanion
    const localIssues = issues.filter((i) =>
      i.field.startsWith('animalCompanion'),
    )
    const statsRaw = resolveAnimalCompanionStats(state, level)
    const stats = statsRaw
      ? applyCompanionCombatBonuses(statsRaw, sheet, true)
      : null
    const maxHp = stats?.maxHp ?? null
    const currentHp =
      maxHp == null
        ? (state.currentHp ?? null)
        : state.currentHp == null
          ? maxHp
          : Math.min(maxHp, Math.max(0, state.currentHp))
    if (state.typeId && !stats) {
      localIssues.push({
        field: 'animalCompanion.typeId',
        message: `Tipo de companheiro desconhecido: ${state.typeId}`,
      })
    }
    animalCompanion = {
      state,
      stageLabel: ANIMAL_COMPANION_STAGE_LABELS[state.stage],
      specializationLabel: state.specialization
        ? ANIMAL_SPECIALIZATION_LABELS[state.specialization]
        : null,
      currentHp,
      maxHp,
      stats,
      catalogPending: !state.typeId,
      issues: localIssues,
    }
  }

  let familiarOrPet: ResolvedFamiliarOrPet | null = null
  if (companions?.familiarOrPet) {
    const state = companions.familiarOrPet
    const slots =
      getFamiliarAbilitySlots(state) + (sheet.familiarAbilitySlotBonus ?? 0)
    const abilities: ResolvedFamiliarAbility[] = state.selectedAbilities.map(
      (selection) => {
        const definition = FAMILIAR_ABILITIES_BY_ID[selection.abilityId] ?? null
        return {
          selection,
          definition,
          missing: !definition,
        }
      },
    )
    const maxHp =
      estimateFamiliarMaxHp(level, state.selectedAbilities) +
      sumConnectionBonus(sheet.connections, 'familiar.hp').total
    const spellMod =
      state.kind === 'familiar'
        ? resolveSpellMod(sheet, state.spellcastingAttributeId)
        : null
    const skillModifier =
      state.kind === 'familiar'
        ? estimateFamiliarSkillModifier(level, spellMod)
        : 3 + Math.max(1, level)
    const famAcBonus = sumConnectionBonus(sheet.connections, 'familiar.ac').total

    familiarOrPet = {
      state,
      abilitySlots: slots,
      abilitiesUsed: state.selectedAbilities.length,
      abilities,
      maxHp,
      currentHp:
        state.currentHp == null
          ? maxHp
          : Math.min(maxHp, Math.max(0, state.currentHp)),
      skillModifier,
      ac: ac != null ? ac + famAcBonus : ac,
      issues: issues.filter((i) => i.field.startsWith('selectedAbilities') || i.field.startsWith('familiarOrPet')),
      catalogPending: !state.typeId,
    }
  }

  let constructCompanion: ResolvedConstructCompanion | null = null
  if (companions?.constructCompanion) {
    const state = companions.constructCompanion
    const stats = applyCompanionCombatBonuses(
      resolveConstructCompanionStats(state, level),
      sheet,
      true,
    )
    const maxHp = stats.maxHp
    const currentHp =
      state.currentHp == null
        ? maxHp
        : Math.min(maxHp, Math.max(0, state.currentHp))
    constructCompanion = {
      state,
      stageLabel: CONSTRUCT_COMPANION_STAGE_LABELS[state.stage],
      currentHp,
      maxHp,
      stats,
      issues: issues.filter((i) => i.field.startsWith('constructCompanion')),
    }
  }

  let eidolon: ResolvedEidolon | null = null
  if (companions?.eidolon) {
    const state = companions.eidolon
    const rawStats = resolveEidolonStats(state, level)
    const stats = rawStats
      ? applyCompanionCombatBonuses(rawStats, sheet, false)
      : null
    const maxHp = sheet.derived.hp.value
    const currentHp = sheet.character.currentHp ?? maxHp
    eidolon = {
      state,
      currentHp,
      maxHp,
      stats,
      catalogPending: !state.typeId,
      issues: issues.filter((i) => i.field.startsWith('eidolon')),
    }
  }

  return {
    animalCompanion,
    familiarOrPet,
    constructCompanion,
    eidolon,
    issues,
    coexistenceNote:
      'Você pode ter um companheiro animal ou um construto (não os dois), e ao mesmo tempo um familiar ou um pet — mas não familiar e pet juntos. O eidolon do invocador é independente (PV compartilhados com você).',
  }
}

export function canAddFamiliarOrPet(
  companions: CharacterCompanions | null | undefined,
): boolean {
  return !companions?.familiarOrPet
}

export function canAddAnimalCompanion(
  companions: CharacterCompanions | null | undefined,
): boolean {
  return !companions?.animalCompanion && !companions?.constructCompanion
}

export function canAddConstructCompanion(
  companions: CharacterCompanions | null | undefined,
): boolean {
  return !companions?.constructCompanion && !companions?.animalCompanion
}

export function canAddEidolon(
  companions: CharacterCompanions | null | undefined,
): boolean {
  return !companions?.eidolon
}

export type { AnimalCompanionSpecialization, AnimalCompanionStage }
