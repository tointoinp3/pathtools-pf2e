import type {
  AttributeId,
  Character,
  CharacterClass,
  CharacterSpellState,
  PreparedSpellSlot,
  ProficiencyRank,
  ResolvedSpellcastingAccess,
  Spell,
  SpellRank,
  SpellTradition,
  SpellcastingFeatures,
  SpellcastingStyle,
  ResolvedSpellcastingSource,
  SourceSpellState,
} from '@/types'
import { CLASS_FOCUS_TRAITS, isHomebrewSpell } from '@/types'
import {
  CLASS_ANIMIST_ID,
  CLASS_BARD_ID,
  CLASS_CHAMPION_ID,
  CLASS_CLERIC_ID,
  CLASS_DRUID_ID,
  CLASS_MAGUS_ID,
  CLASS_MONK_ID,
  CLASS_NECROMANCER_ID,
  CLASS_ORACLE_ID,
  CLASS_PSYCHIC_ID,
  CLASS_RANGER_ID,
  CLASS_RUNESMITH_ID,
  CLASS_SORCERER_ID,
  CLASS_SUMMONER_ID,
  CLASS_WITCH_ID,
  CLASS_WIZARD_ID,
} from '@/data/seeds/ids'
import type { FeatSpellcastingSource } from './featEffects'
import { calculateProficiencyBonus } from './proficiency'
import type { ResolvedDeityBenefits } from './deity'
import { collectGrantedClassSpells, normalizeSpellName } from './grantedSpells'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  TRADITION_LABELS,
} from '@/utils/labels'

export function traditionLabel(tradition: SpellTradition): string {
  return TRADITION_LABELS[tradition]
}

export function spellcastingStyleLabel(style: SpellcastingStyle): string {
  switch (style) {
    case 'prepared':
      return 'Preparado'
    case 'spontaneous':
      return 'Espontâneo'
    case 'bounded':
      return 'Onda (limitada)'
    case 'focusOnly':
      return 'Só foco'
    default:
      return style
  }
}

/**
 * Como o personagem gasta slots no dia (UI/engine).
 * Bounded usa prepared (Magus) ou spontaneous (Summoner) conforme features.
 */
export function resolveCastMode(
  access: Pick<ResolvedSpellcastingAccess, 'primaryStyle' | 'features'>,
): 'prepared' | 'spontaneous' | 'focusOnly' {
  const style = access.primaryStyle
  if (style === 'focusOnly') return 'focusOnly'
  if (style === 'spontaneous') return 'spontaneous'
  if (style === 'prepared') return 'prepared'
  if (style === 'bounded') {
    if (access.features.boundedMode) return access.features.boundedMode
    if (access.features.repertoire && !access.features.spellbook) {
      return 'spontaneous'
    }
    return 'prepared'
  }
  return 'prepared'
}

export function usesPreparedSlots(
  access: Pick<ResolvedSpellcastingAccess, 'primaryStyle' | 'features'>,
): boolean {
  return resolveCastMode(access) === 'prepared'
}

export function usesSpellbookCollection(
  access: Pick<ResolvedSpellcastingAccess, 'primaryStyle' | 'features'>,
): boolean {
  if (access.features.spellbook || access.features.familiar) return true
  if (access.features.repertoire || access.features.traditionList) return false
  return false
}

/** Clérigo / druida: preparam da lista da tradição, sem aprender no grimório. */
export function preparesFromTraditionList(
  access: Pick<ResolvedSpellcastingAccess, 'primaryStyle' | 'features'>,
): boolean {
  if (access.features.traditionList) return true
  return (
    resolveCastMode(access) === 'prepared' &&
    !access.features.spellbook &&
    !access.features.familiar &&
    !access.features.repertoire
  )
}

export function spellCollectionLabel(
  access: Pick<ResolvedSpellcastingAccess, 'primaryStyle' | 'features'>,
): string {
  if (access.features.familiar) return 'Familiar'
  if (usesSpellbookCollection(access)) return 'Grimório'
  if (preparesFromTraditionList(access)) return 'Lista da tradição'
  return 'Repertório'
}

/** Altura automática de truques / foco: metade do nível (arred. cima) */
export function autoHeightenRank(characterLevel: number): number {
  return Math.max(1, Math.ceil(Math.max(1, characterLevel) / 2))
}

export function emptySpellState(): CharacterSpellState {
  return {
    collectionSpellIds: [],
    cantripIds: [],
    focusSpellIds: [],
    ritualIds: [],
    preparedSlots: [],
    spontaneousSlotsUsed: {},
    focusPointsCurrent: 0,
    bondedItemAvailable: true,
    signatureSpellIds: [],
    bySource: {},
    notes: '',
  }
}

/**
 * Resolve acesso a magia + números (ataque, CD, slots, foco).
 * Fontes: classe conjuradora e feitos/arquétipos com `effects` (Dedicação, Guardião Iniciado…).
 */
export function resolveSpellcastingAccess(
  character: Pick<Character, 'level' | 'classId' | 'classChoices'>,
  characterClass: CharacterClass | null | undefined,
  attrMap: Partial<Record<AttributeId, number>>,
  featSpellcasting: FeatSpellcastingSource[] = [],
  featFocusPoolBonus = 0,
  deity?: Pick<
    ResolvedDeityBenefits,
    | 'extraSpellOriginalNames'
    | 'grantedFocusSpellOriginalNames'
    | 'fontSlotCount'
    | 'resolvedFont'
  > | null,
  featExtraSignatureSpells = 0,
  featGrantedFocusSpellOriginalNames: string[] = [],
  featGrantedFocusSpellLabels: Record<string, string> = {},
): ResolvedSpellcastingAccess {
  const sources: ResolvedSpellcastingSource[] = []
  let features: SpellcastingFeatures = {}
  let styleHint: string | undefined
  const focusClassNames = new Set<string>()
  if (characterClass?.originalName) {
    focusClassNames.add(characterClass.originalName)
  }

  const level = Math.max(1, Math.min(20, character.level))
  const levelIndex = level - 1
  const def = characterClass?.spellcasting
  const classSlots: Partial<Record<Exclude<SpellRank, 0>, number>> = {}
  const classFeatures: SpellcastingFeatures = def?.features
    ? { ...def.features }
    : {}
  if (characterClass?.id === CLASS_ANIMIST_ID) {
    classFeatures.focusPoolBase = level >= 15 ? 3 : level >= 7 ? 2 : 1
  }
  const slotRow = def?.slotsByCharacterLevel?.[levelIndex]
  if (slotRow) {
    for (let rank = 1; rank <= 10; rank += 1) {
      let n = slotRow[rank] ?? 0
      if (
        n > 0 &&
        classFeatures.curriculumBonusSlot &&
        shouldApplyCurriculumBonus(character.classChoices?.subclassId)
      ) {
        n += 1
      }
      if (n > 0) classSlots[rank as Exclude<SpellRank, 0>] = n
    }
  }
  const classCantrips = def?.cantripsByCharacterLevel?.[levelIndex] ?? 0

  let featCantrips = 0
  const featSlots: Partial<Record<Exclude<SpellRank, 0>, number>> = {}
  let featPrimaryAttribute: AttributeId | undefined

  if (
    character.classId &&
    characterClass &&
    character.classId === characterClass.id &&
    characterClass.spellcasting
  ) {
    const sc = characterClass.spellcasting
    features = { ...classFeatures }
    styleHint = sc.styleHint
    const tradition = resolveTraditionForCharacter(
      sc.tradition,
      characterClass,
      character.classChoices,
    )
    const classAttributeId =
      character.classChoices?.keyAttribute &&
      sc.attributeOptions.includes(character.classChoices.keyAttribute)
        ? character.classChoices.keyAttribute
        : sc.attributeOptions[0]
    sources.push({
      id: sc.id,
      kind: sc.kind,
      label: sc.label,
      style: sc.style,
      tradition,
      proficiencyRank: resolveSpellProficiencyForLevel(
        sc.proficiencyRank,
        character.level,
        characterClass.id,
        character.classChoices?.subclassId,
      ),
      features: { ...classFeatures },
      slotsByRank: { ...classSlots },
      cantripsPerDay: classCantrips > 0 ? classCantrips : undefined,
      classOriginalName: characterClass.originalName,
      attributeId: classAttributeId,
      hasSignatureSpells: Boolean(classFeatures.signatureSpells && level >= 3),
    })
  }

  for (const featSc of featSpellcasting) {
    features = { ...features, ...featSc.features }
    sources.push({
      id: featSc.access.id,
      kind: 'feat',
      label: featSc.access.label,
      style: featSc.access.style,
      tradition: featSc.access.tradition,
      proficiencyRank: featSc.proficiencyRank,
      features: { ...featSc.features },
      slotsByRank: { ...featSc.slotsByRank },
      cantripsPerDay:
        featSc.cantripsPerDay > 0 ? featSc.cantripsPerDay : undefined,
      classOriginalName: featSc.access.classOriginalName,
      attributeId: featSc.access.attributeId,
      hasSignatureSpells: Boolean(
        featSc.features.signatureSpells && level >= 3,
      ),
    })
    if (featSc.access.classOriginalName) {
      focusClassNames.add(featSc.access.classOriginalName)
    }
    featCantrips += featSc.cantripsPerDay
    for (const [rank, n] of Object.entries(featSc.slotsByRank)) {
      const key = Number(rank) as Exclude<SpellRank, 0>
      featSlots[key] = (featSlots[key] ?? 0) + (n ?? 0)
    }
    if (!featPrimaryAttribute) {
      featPrimaryAttribute = featSc.access.attributeId
      if (!styleHint) {
        styleHint =
          featSc.access.style === 'focusOnly'
            ? `Só foco: ${featSc.access.label}.`
            : `${featSc.access.label}.`
      }
    }
  }

  if (featFocusPoolBonus > 0) {
    features = {
      ...features,
      focusPool: true,
      focusPoolBase: Math.max(features.focusPoolBase ?? 1, featFocusPoolBonus),
    }
  }

  if (sources.length === 0) {
    const rangerLocked =
      characterClass?.id === CLASS_RANGER_ID
        ? 'O patrulheiro não conjura por padrão. Escolha o feito Guardião Iniciado para ganhar magias de foco (primal, Sabedoria).'
        : characterClass?.id === CLASS_RUNESMITH_ID
          ? 'O forjador de runas não conjura magias — o poder sai das runas gravadas e traçadas. Rituais continuam disponíveis.'
          : 'Sem fonte de magia ainda (classe conjuradora, feito como Guardião Iniciado, arquétipo, etc.). A aba fica pronta para quando isso mudar.'
    return {
      hasAccess: false,
      sources: [],
      features: {},
      lockedReason: rangerLocked,
    }
  }

  const primary = sources[0]!

  const spellAttributeId = def
    ? character.classChoices?.keyAttribute &&
      def.attributeOptions.includes(character.classChoices.keyAttribute)
      ? character.classChoices.keyAttribute
      : def.attributeOptions[0]
    : featPrimaryAttribute

  const spellAttributeModifier =
    spellAttributeId != null ? (attrMap[spellAttributeId] ?? 0) : 0

  const proficiencyRank = primary.proficiencyRank
  const proficiencyBonus = calculateProficiencyBonus(proficiencyRank, level)

  const spellAttack =
    spellAttributeId != null
      ? proficiencyBonus + spellAttributeModifier
      : null
  const spellDc =
    spellAttributeId != null
      ? 10 + proficiencyBonus + spellAttributeModifier
      : null

  const slotsByRank: Partial<Record<Exclude<SpellRank, 0>, number>> = {
    ...classSlots,
  }
  for (const [rank, n] of Object.entries(featSlots)) {
    const key = Number(rank) as Exclude<SpellRank, 0>
    const add = n ?? 0
    if (add <= 0) continue
    slotsByRank[key] = (slotsByRank[key] ?? 0) + add
  }

  const cantripsPerDay =
    classCantrips + featCantrips > 0
      ? classCantrips + featCantrips
      : undefined
  const heighten = autoHeightenRank(level)
  const highestSlotRank = Math.max(
    0,
    ...Object.keys(slotsByRank).map(Number),
  )

  const classGrants = collectGrantedClassSpells(
    characterClass,
    character.classChoices,
    level,
  )
  const grantedLabels = { ...classGrants.labels }
  for (const [name, label] of Object.entries(featGrantedFocusSpellLabels)) {
    const key = normalizeSpellName(name)
    if (!grantedLabels[key]) grantedLabels[key] = label
  }
  for (const name of deity?.grantedFocusSpellOriginalNames ?? []) {
    const key = normalizeSpellName(name)
    if (!grantedLabels[key]) grantedLabels[key] = 'Domínio'
  }
  for (const name of featGrantedFocusSpellOriginalNames) {
    const key = normalizeSpellName(name)
    if (!grantedLabels[key]) grantedLabels[key] = 'Feito'
  }

  const deityExtras = deity?.extraSpellOriginalNames ?? []
  const classExtras = classGrants.extraOriginalNames
  for (const source of sources) {
    const extras: string[] = []
    if (source.kind === 'class') extras.push(...classExtras)
    if (source.classOriginalName === 'Cleric') extras.push(...deityExtras)
    if (extras.length > 0) source.extraSpellOriginalNames = extras
    if (source.classOriginalName === 'Cleric') {
      source.fontSlotCount = deity?.fontSlotCount ?? 0
      source.fontKind = deity?.resolvedFont
    }
    applySourceCombatStats(source, attrMap, level)
  }

  const focusPointsMax = features.focusPool
    ? (features.focusPoolBase ?? 1)
    : undefined

  return {
    hasAccess: true,
    sources,
    primaryStyle: primary.style,
    features,
    styleHint,
    spellAttributeId: primary.attributeId ?? spellAttributeId,
    spellAttributeModifier:
      primary.attributeModifier ?? spellAttributeModifier,
    spellAttack: primary.spellAttack ?? spellAttack,
    spellDc: primary.spellDc ?? spellDc,
    proficiencyRank: primary.proficiencyRank,
    proficiencyBonus: primary.proficiencyBonus ?? proficiencyBonus,
    slotsByRank,
    cantripsPerDay,
    autoHeightenRank: heighten,
    highestSlotRank: highestSlotRank > 0 ? highestSlotRank : undefined,
    focusPointsMax,
    classOriginalName: characterClass?.originalName,
    focusClassNames: [...focusClassNames],
    extraSpellOriginalNames: [
      ...(deity?.extraSpellOriginalNames ?? []),
      ...classGrants.extraOriginalNames,
    ],
    grantedFocusSpellOriginalNames: [
      ...(deity?.grantedFocusSpellOriginalNames ?? []),
      ...classGrants.focusOriginalNames,
      ...featGrantedFocusSpellOriginalNames,
    ],
    grantedCantripOriginalNames: classGrants.cantripOriginalNames,
    grantedCollectionOriginalNames: classGrants.collectionOriginalNames,
    grantedSpellLabels: grantedLabels,
    fontSlotCount: deity?.fontSlotCount ?? 0,
    fontKind: deity?.resolvedFont,
    hasSignatureSpells: Boolean(features.signatureSpells && level >= 3),
    extraSignatureSpells: featExtraSignatureSpells,
    extraSignatureMaxRank: featExtraSignatureSpells > 0 ? 3 : undefined,
  }
}

function shouldApplyCurriculumBonus(subclassId?: string | null): boolean {
  if (!subclassId) return false
  // Unified Magical Theory (Remaster) / Universalist legado: sem slot de currículo
  const id = subclassId.toLowerCase()
  return !id.includes('unified') && !id.includes('universal')
}

function applySourceCombatStats(
  source: ResolvedSpellcastingSource,
  attrMap: Partial<Record<AttributeId, number>>,
  level: number,
): void {
  const attributeId = source.attributeId
  const attributeModifier =
    attributeId != null ? (attrMap[attributeId] ?? 0) : 0
  const proficiencyBonus = calculateProficiencyBonus(
    source.proficiencyRank,
    level,
  )
  source.attributeModifier = attributeId != null ? attributeModifier : undefined
  source.proficiencyBonus = proficiencyBonus
  source.spellAttack =
    attributeId != null ? proficiencyBonus + attributeModifier : null
  source.spellDc =
    attributeId != null ? 10 + proficiencyBonus + attributeModifier : null
}

export function spellSourceStatLabel(source: ResolvedSpellcastingSource): string {
  const tradition = traditionLabel(source.tradition)
  return source.attributeId
    ? `${tradition} (${ATTRIBUTE_ABBREVIATIONS[source.attributeId]})`
    : tradition
}

export function sourceAttackBreakdown(
  source: Pick<
    ResolvedSpellcastingSource,
    | 'proficiencyBonus'
    | 'attributeModifier'
    | 'attributeId'
    | 'spellAttackExtras'
    | 'spellAttack'
  >,
): Array<{ label: string; value: number }> | undefined {
  if (source.spellAttack == null) return undefined
  const parts: Array<{ label: string; value: number }> = []
  if (source.proficiencyBonus != null) {
    parts.push({ label: 'Proficiência', value: source.proficiencyBonus })
  }
  if (source.attributeModifier != null) {
    parts.push({
      label: source.attributeId
        ? ATTRIBUTE_LABELS[source.attributeId]
        : 'Atributo',
      value: source.attributeModifier,
    })
  }
  for (const extra of source.spellAttackExtras ?? []) {
    parts.push(extra)
  }
  return parts
}

export function suggestedSpellcastingSource(
  sources: ResolvedSpellcastingSource[],
  spell?: Pick<Spell, 'traditions'> | null,
): ResolvedSpellcastingSource | undefined {
  if (sources.length === 0) return undefined
  const traditions = spell?.traditions ?? []
  if (traditions.length > 0) {
    const match = sources.find((source) =>
      traditions.includes(source.tradition),
    )
    if (match) return match
  }
  return sources[0]
}

export function resolveItemSpellcastingSource(
  sources: ResolvedSpellcastingSource[],
  storedId?: string | null,
  spell?: Pick<Spell, 'traditions'> | null,
): ResolvedSpellcastingSource | undefined {
  if (storedId) {
    const stored = sources.find((source) => source.id === storedId)
    if (stored) return stored
  }
  return suggestedSpellcastingSource(sources, spell)
}

export function spellSourceCastLabel(source: ResolvedSpellcastingSource): string {
  const attack =
    source.spellAttack != null
      ? source.spellAttack >= 0
        ? `+${source.spellAttack}`
        : String(source.spellAttack)
      : null
  const parts = [
    source.label,
    traditionLabel(source.tradition),
    source.attributeId ? ATTRIBUTE_ABBREVIATIONS[source.attributeId] : null,
    attack ? `atq ${attack}` : null,
    source.spellDc != null ? `CD ${source.spellDc}` : null,
  ]
  return parts.filter(Boolean).join(' · ')
}

export function sourceMatchesSpellTradition(
  source: Pick<ResolvedSpellcastingSource, 'tradition'>,
  spell?: Pick<Spell, 'traditions'> | null,
): boolean {
  if (!spell?.traditions?.length) return true
  return spell.traditions.includes(source.tradition)
}

export function suggestedSpellcastingSourceForSpells(
  sources: ResolvedSpellcastingSource[],
  spells: Array<Pick<Spell, 'traditions'> | null | undefined>,
): ResolvedSpellcastingSource | undefined {
  if (sources.length === 0) return undefined
  for (const spell of spells) {
    const traditions = spell?.traditions ?? []
    if (traditions.length === 0) continue
    const match = sources.find((source) =>
      traditions.includes(source.tradition),
    )
    if (match) return match
  }
  return sources[0]
}

export function resolveItemSpellcastingSourceForSpells(
  sources: ResolvedSpellcastingSource[],
  storedId?: string | null,
  spells: Array<Pick<Spell, 'traditions'> | null | undefined> = [],
): ResolvedSpellcastingSource | undefined {
  if (storedId) {
    const stored = sources.find((source) => source.id === storedId)
    if (stored) return stored
  }
  return suggestedSpellcastingSourceForSpells(sources, spells)
}

/** Ao gravar outra magia no item, troca a fonte se a atual não bate na tradição. */
export function nextSpellcastingSourceIdOnSpellChange(
  sources: ResolvedSpellcastingSource[],
  storedId: string | null | undefined,
  spell?: Pick<Spell, 'traditions'> | null,
): string | null {
  const stored = storedId
    ? sources.find((source) => source.id === storedId)
    : undefined
  if (stored && sourceMatchesSpellTradition(stored, spell)) {
    return stored.id
  }
  return suggestedSpellcastingSource(sources, spell)?.id ?? storedId ?? null
}

const SKILL_TO_TRADITION: Partial<Record<string, SpellTradition>> = {
  arcana: 'arcane',
  religion: 'divine',
  occultism: 'occult',
  nature: 'primal',
}

function resolveTraditionForCharacter(
  fallback: SpellTradition,
  characterClass: CharacterClass,
  classChoices: Character['classChoices'],
): SpellTradition {
  if (classChoices?.spellTradition) return classChoices.spellTradition
  const subclassId = classChoices?.subclassId
  const option = characterClass.subclass?.options.find((o) => o.id === subclassId)
  if (option?.tradition) return option.tradition
  const skill = classChoices?.subclassSkillChoice
  if (skill && SKILL_TO_TRADITION[skill]) return SKILL_TO_TRADITION[skill]!
  return fallback
}

function resolveSpellProficiencyForLevel(
  base: ProficiencyRank,
  level: number,
  classId: string,
  subclassId?: string | null,
): ProficiencyRank {
  // Sacerdote Guerreiro: expert 11, master 19 (sem lendário)
  if (classId === CLASS_CLERIC_ID && subclassId === 'doctrine-warpriest') {
    if (level >= 19) return 'master'
    if (level >= 11) return 'expert'
    return base
  }
  if (classId === CLASS_CLERIC_ID && subclassId === 'doctrine-battle-creed') {
    if (level >= 11) return 'expert'
    return base
  }

  const fullCaster =
    classId === CLASS_WIZARD_ID ||
    classId === CLASS_BARD_ID ||
    classId === CLASS_SORCERER_ID ||
    classId === CLASS_ORACLE_ID ||
    classId === CLASS_PSYCHIC_ID ||
    classId === CLASS_CLERIC_ID ||
    classId === CLASS_DRUID_ID ||
    classId === CLASS_WITCH_ID ||
    classId === CLASS_ANIMIST_ID ||
    classId === CLASS_NECROMANCER_ID

  if (fullCaster) {
    if (level >= 19) return 'legendary'
    if (level >= 15) return 'master'
    if (level >= 7) return 'expert'
  }

  // Magus / invocador / campeão / monge: especialista 9, mestre 17 (sem lendário)
  const martialCaster =
    classId === CLASS_MAGUS_ID ||
    classId === CLASS_SUMMONER_ID ||
    classId === CLASS_CHAMPION_ID ||
    classId === CLASS_MONK_ID

  if (martialCaster) {
    if (level >= 17) return 'master'
    if (level >= 9) return 'expert'
  }

  return base
}

export function knownTraditionsFromAccess(
  access: Pick<ResolvedSpellcastingAccess, 'hasAccess' | 'sources'>,
): SpellTradition[] {
  if (!access.hasAccess) return []
  const seen = new Set<SpellTradition>()
  const out: SpellTradition[] = []
  for (const source of access.sources) {
    if (seen.has(source.tradition)) continue
    seen.add(source.tradition)
    out.push(source.tradition)
  }
  return out
}

export function spellMatchesKnownTraditions(
  spell: Pick<Spell, 'traditions'>,
  traditions: Iterable<SpellTradition>,
): boolean {
  const allowed = traditions instanceof Set ? traditions : new Set(traditions)
  if (allowed.size === 0) return false
  return (spell.traditions ?? []).some((t) => allowed.has(t))
}

export function spellAllowedForAccess(
  spell: Spell,
  access: ResolvedSpellcastingAccess,
): boolean {
  if (!access.hasAccess) return false
  const traditions = new Set(knownTraditionsFromAccess(access))
  const focusNames = new Set(
    access.focusClassNames?.length
      ? access.focusClassNames
      : access.classOriginalName
        ? [access.classOriginalName]
        : [],
  )
  const isNecromancer =
    access.classOriginalName === 'Necromancer' ||
    access.focusClassNames?.includes('Necromancer')
  const extra = new Set(
    (access.extraSpellOriginalNames ?? []).map((n) => normalizeSpellName(n)),
  )

  if (spell.focus) {
    const matchesClass = [...focusNames].some((name) =>
      spell.traits.includes(name),
    )
    if (matchesClass) return true
    if (isHomebrewSpell(spell)) {
      const tagged = CLASS_FOCUS_TRAITS.some((trait) =>
        spell.traits.includes(trait),
      )
      return !tagged
    }
    return false
  }
  if (isNecromancer && spell.originalName === 'Harm') return true
  if (extra.has(normalizeSpellName(spell.originalName))) return true
  return spellMatchesKnownTraditions(spell, traditions)
}

type SlotRankAccess = Pick<
  ResolvedSpellcastingAccess,
  'slotsByRank' | 'cantripsPerDay' | 'highestSlotRank'
>

/** Maior posto com espaço (1–10). 0 se ainda não há espaços. */
export function maxLearnableSpellRank(access: SlotRankAccess): number {
  if (access.highestSlotRank && access.highestSlotRank > 0) {
    return access.highestSlotRank
  }
  return Math.max(0, ...Object.keys(access.slotsByRank ?? {}).map(Number))
}

/**
 * Postos que dá para aprender / listar: truques (se houver) e magias até o
 * maior espaço. Postos acima não entram — não há como conjurá-los.
 */
export function learnableSpellRanks(access: SlotRankAccess): number[] {
  const max = maxLearnableSpellRank(access)
  const ranks: number[] = []
  if ((access.cantripsPerDay ?? 0) > 0 || max > 0) ranks.push(0)
  for (let rank = 1; rank <= max; rank++) ranks.push(rank)
  return ranks
}

export function spellRankIsLearnable(
  rank: number,
  access: SlotRankAccess,
): boolean {
  if (rank === 0) {
    return (access.cantripsPerDay ?? 0) > 0 || maxLearnableSpellRank(access) > 0
  }
  return rank >= 1 && rank <= maxLearnableSpellRank(access)
}

export function filterSpellsForAccess(
  spells: Spell[],
  access: ResolvedSpellcastingAccess,
): Spell[] {
  if (!access.hasAccess) return []
  return spells.filter((sp) => spellAllowedForAccess(sp, access))
}

export function primarySpellSourceId(
  access: Pick<ResolvedSpellcastingAccess, 'sources'>,
): string | undefined {
  return (
    access.sources.find((s) => s.kind === 'class')?.id ?? access.sources[0]?.id
  )
}

export function spellSourcesWithCollection(
  access: Pick<ResolvedSpellcastingAccess, 'sources'>,
): ResolvedSpellcastingSource[] {
  return access.sources.filter((s) => s.style !== 'focusOnly')
}

export function accessForSource(
  access: ResolvedSpellcastingAccess,
  source: ResolvedSpellcastingSource,
): ResolvedSpellcastingAccess {
  const highest = Math.max(
    0,
    ...Object.keys(source.slotsByRank ?? {}).map(Number),
  )
  const isClass = source.kind === 'class'
  return {
    ...access,
    sources: [source],
    primaryStyle: source.style,
    features: source.features,
    styleHint: access.styleHint,
    slotsByRank: source.slotsByRank,
    cantripsPerDay: source.cantripsPerDay,
    highestSlotRank: highest > 0 ? highest : undefined,
    extraSpellOriginalNames: source.extraSpellOriginalNames ?? [],
    grantedCantripOriginalNames: isClass
      ? access.grantedCantripOriginalNames
      : [],
    grantedCollectionOriginalNames: isClass
      ? access.grantedCollectionOriginalNames
      : [],
    fontSlotCount: source.fontSlotCount ?? 0,
    fontKind: source.fontKind,
    hasSignatureSpells: source.hasSignatureSpells,
    extraSignatureSpells: source.hasSignatureSpells
      ? access.extraSignatureSpells
      : 0,
    extraSignatureMaxRank: source.hasSignatureSpells
      ? access.extraSignatureMaxRank
      : undefined,
    classOriginalName: source.classOriginalName ?? access.classOriginalName,
    focusClassNames: source.classOriginalName
      ? [source.classOriginalName]
      : access.focusClassNames,
    spellAttributeId: source.attributeId ?? access.spellAttributeId,
    spellAttributeModifier:
      source.attributeModifier ?? access.spellAttributeModifier,
    spellAttack: source.spellAttack ?? access.spellAttack,
    spellDc: source.spellDc ?? access.spellDc,
    proficiencyRank: source.proficiencyRank,
    proficiencyBonus: source.proficiencyBonus ?? access.proficiencyBonus,
    spellAttackExtras: source.spellAttackExtras ?? access.spellAttackExtras,
    spellDcExtras: source.spellDcExtras ?? access.spellDcExtras,
  }
}

function emptySourceSpellState(): SourceSpellState {
  return {
    collectionSpellIds: [],
    cantripIds: [],
    preparedSlots: [],
    spontaneousSlotsUsed: {},
    signatureSpellIds: [],
  }
}

export function getSourceSpellState(
  state: CharacterSpellState | undefined,
  sourceId: string,
  primaryId?: string,
): SourceSpellState {
  const stored = state?.bySource?.[sourceId]
  if (stored) return stored
  if (primaryId && sourceId === primaryId) {
    return {
      collectionSpellIds: state?.collectionSpellIds ?? [],
      cantripIds: state?.cantripIds ?? [],
      preparedSlots: state?.preparedSlots ?? [],
      spontaneousSlotsUsed: state?.spontaneousSlotsUsed ?? {},
      signatureSpellIds: state?.signatureSpellIds ?? [],
    }
  }
  return emptySourceSpellState()
}

export function viewStateForSource(
  state: CharacterSpellState | undefined,
  sourceId: string,
  primaryId?: string,
): CharacterSpellState {
  const piece = getSourceSpellState(state, sourceId, primaryId)
  return {
    ...emptySpellState(),
    ...state,
    collectionSpellIds: piece.collectionSpellIds,
    cantripIds: piece.cantripIds,
    preparedSlots: piece.preparedSlots,
    spontaneousSlotsUsed: piece.spontaneousSlotsUsed,
    signatureSpellIds: piece.signatureSpellIds,
  }
}

function pieceFromState(state: CharacterSpellState): SourceSpellState {
  return {
    collectionSpellIds: state.collectionSpellIds ?? [],
    cantripIds: state.cantripIds ?? [],
    preparedSlots: state.preparedSlots ?? [],
    spontaneousSlotsUsed: state.spontaneousSlotsUsed ?? {},
    signatureSpellIds: state.signatureSpellIds ?? [],
  }
}

export function commitSourceSpellState(
  state: CharacterSpellState | undefined,
  sourceId: string,
  nextView: CharacterSpellState,
  primaryId?: string,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  const piece = pieceFromState(nextView)
  const bySource = { ...(base.bySource ?? {}), [sourceId]: piece }
  const mirrored =
    primaryId && sourceId === primaryId
      ? {
          collectionSpellIds: piece.collectionSpellIds,
          cantripIds: piece.cantripIds,
          preparedSlots: piece.preparedSlots,
          spontaneousSlotsUsed: piece.spontaneousSlotsUsed,
          signatureSpellIds: piece.signatureSpellIds,
        }
      : {}
  return {
    ...base,
    ...mirrored,
    bySource,
    focusSpellIds: nextView.focusSpellIds ?? base.focusSpellIds,
    ritualIds: nextView.ritualIds ?? base.ritualIds,
    notes: nextView.notes ?? base.notes,
    focusPointsCurrent:
      nextView.focusPointsCurrent ?? base.focusPointsCurrent,
    bondedItemAvailable:
      nextView.bondedItemAvailable ?? base.bondedItemAvailable,
  }
}

export function filterSpellsForSource(
  spells: Spell[],
  access: ResolvedSpellcastingAccess,
  source: ResolvedSpellcastingSource,
): Spell[] {
  return filterSpellsForAccess(spells, accessForSource(access, source))
}

function sameIdList(a: string[] | undefined, b: string[]): boolean {
  const left = a ?? []
  if (left.length !== b.length) return false
  const set = new Set(left)
  return b.every((id) => set.has(id))
}

function pruneIds(ids: string[] | undefined, allowed: Set<string>): string[] {
  return (ids ?? []).filter((id) => allowed.has(id))
}

function pruneSourcePiece(
  piece: SourceSpellState,
  allowedIds: Set<string>,
): SourceSpellState {
  const collectionSpellIds = pruneIds(piece.collectionSpellIds, allowedIds)
  const cantripIds = pruneIds(piece.cantripIds, allowedIds)
  const signatureSpellIds = pruneIds(piece.signatureSpellIds, allowedIds)
  let preparedChanged = false
  const preparedSlots = (piece.preparedSlots ?? []).map((slot) => {
    if (slot.spellId && !allowedIds.has(slot.spellId)) {
      preparedChanged = true
      return { ...slot, spellId: null, expended: false }
    }
    return slot
  })
  if (
    sameIdList(piece.collectionSpellIds, collectionSpellIds) &&
    sameIdList(piece.cantripIds, cantripIds) &&
    sameIdList(piece.signatureSpellIds, signatureSpellIds) &&
    !preparedChanged
  ) {
    return piece
  }
  return {
    ...piece,
    collectionSpellIds,
    cantripIds,
    signatureSpellIds,
    preparedSlots,
  }
}

/**
 * Tira do grimório / repertório / espaços magias que aquela fonte não pode
 * mais conjurar (troca de patrono, perde arquétipo, tradição errada).
 */
export function pruneSpellStateForAccess(
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
  spells: Spell[],
): CharacterSpellState | undefined {
  if (!state) return state
  const primaryId = primarySpellSourceId(access)
  let next: CharacterSpellState = state
  let changed = false

  for (const source of spellSourcesWithCollection(access)) {
    const allowed = new Set(
      filterSpellsForSource(spells, access, source).map((s) => s.id),
    )
    const piece = getSourceSpellState(next, source.id, primaryId)
    const pruned = pruneSourcePiece(piece, allowed)
    if (pruned === piece) continue
    next = commitSourceSpellState(
      next,
      source.id,
      { ...viewStateForSource(next, source.id, primaryId), ...pruned },
      primaryId,
    )
    changed = true
  }

  const focusAllowed = new Set(
    filterSpellsForAccess(spells, access)
      .filter((s) => s.focus)
      .map((s) => s.id),
  )
  const focusSpellIds = pruneIds(next.focusSpellIds, focusAllowed)
  if (!sameIdList(next.focusSpellIds, focusSpellIds)) {
    next = { ...next, focusSpellIds }
    changed = true
  }

  return changed ? next : state
}

/** Garante que preparedSlots bate com slotsByRank do acesso */
export function syncPreparedSlots(
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
): PreparedSpellSlot[] {
  const existing = state?.preparedSlots ?? []
  const byId = new Map(existing.map((s) => [s.id, s]))
  const next: PreparedSpellSlot[] = []

  const ranks = Object.entries(access.slotsByRank ?? {})
    .map(([r, n]) => [Number(r) as SpellRank, n] as const)
    .sort(([a], [b]) => a - b)

  for (const [rank, count] of ranks) {
    for (let i = 0; i < (count ?? 0); i += 1) {
      const id = `r${rank}-${i}`
      const prev = byId.get(id)
      next.push(
        prev ?? {
          id,
          rank,
          spellId: null,
          expended: false,
        },
      )
    }
  }

  const fontCount = access.fontSlotCount ?? 0
  const fontRank = access.highestSlotRank as SpellRank | undefined
  if (fontCount > 0 && fontRank && fontRank > 0) {
    for (let i = 0; i < fontCount; i += 1) {
      const id = `font-${fontRank}-${i}`
      const prev = byId.get(id)
      next.push(
        prev
          ? { ...prev, font: true, rank: fontRank }
          : {
              id,
              rank: fontRank,
              spellId: null,
              expended: false,
              font: true,
            },
      )
    }
  }

  return next
}

/** Preparações diárias: limpa gastos, reabre vínculo, recarrega foco */
export function applyDailyPreparations(
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
): CharacterSpellState {
  const primaryId = primarySpellSourceId(access)
  let next = { ...emptySpellState(), ...state }
  const collectionSources = spellSourcesWithCollection(access)

  if (collectionSources.length === 0) {
    const preparedSlots = usesPreparedSlots(access)
      ? syncPreparedSlots(next, access).map((s) => ({ ...s, expended: false }))
      : next.preparedSlots
    return {
      ...next,
      preparedSlots,
      spontaneousSlotsUsed: {},
      focusPointsCurrent: resolveFocusMax(next, access),
      bondedItemAvailable: access.features.bondedItem
        ? true
        : next.bondedItemAvailable,
    }
  }

  for (const source of collectionSources) {
    const slice = accessForSource(access, source)
    const view = viewStateForSource(next, source.id, primaryId)
    const preparedSlots = usesPreparedSlots(slice)
      ? syncPreparedSlots(view, slice).map((s) => ({ ...s, expended: false }))
      : view.preparedSlots
    next = commitSourceSpellState(
      next,
      source.id,
      {
        ...view,
        preparedSlots,
        spontaneousSlotsUsed: {},
      },
      primaryId,
    )
  }

  return {
    ...next,
    focusPointsCurrent: resolveFocusMax(next, access),
    bondedItemAvailable: access.features.bondedItem
      ? true
      : next.bondedItemAvailable,
  }
}

export function resolveFocusMax(
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
): number {
  if (!access.features.focusPool) return 0
  const base = access.features.focusPoolBase ?? access.focusPointsMax ?? 1
  const learned = state?.focusSpellIds?.length ?? 0
  const granted = access.grantedFocusSpellOriginalNames?.length ?? 0
  const known = learned + granted
  return Math.min(3, Math.max(base, known || base))
}

export function learnSpell(
  state: CharacterSpellState | undefined,
  spell: Spell,
  access?: ResolvedSpellcastingAccess,
): CharacterSpellState {
  if (access && !spellAllowedForAccess(spell, access)) {
    return { ...emptySpellState(), ...state }
  }
  if (access && !spell.focus && !spellRankIsLearnable(spell.rank, access)) {
    return { ...emptySpellState(), ...state }
  }
  const base = { ...emptySpellState(), ...state }
  if (spell.focus) {
    const ids = new Set(base.focusSpellIds ?? [])
    ids.add(spell.id)
    return { ...base, focusSpellIds: [...ids] }
  }
  if (spell.rank === 0) {
    const ids = new Set(base.cantripIds ?? [])
    ids.add(spell.id)
    return { ...base, cantripIds: [...ids] }
  }
  const ids = new Set(base.collectionSpellIds ?? [])
  ids.add(spell.id)
  return { ...base, collectionSpellIds: [...ids] }
}

export function unlearnSpell(
  state: CharacterSpellState | undefined,
  spellId: string,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  return {
    ...base,
    collectionSpellIds: (base.collectionSpellIds ?? []).filter((id) => id !== spellId),
    cantripIds: (base.cantripIds ?? []).filter((id) => id !== spellId),
    focusSpellIds: (base.focusSpellIds ?? []).filter((id) => id !== spellId),
    signatureSpellIds: (base.signatureSpellIds ?? []).filter((id) => id !== spellId),
    preparedSlots: (base.preparedSlots ?? []).map((s) =>
      s.spellId === spellId ? { ...s, spellId: null, expended: false } : s,
    ),
  }
}

export function learnRitual(
  state: CharacterSpellState | undefined,
  ritualId: string,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  const ids = new Set(base.ritualIds ?? [])
  ids.add(ritualId)
  return { ...base, ritualIds: [...ids] }
}

export function unlearnRitual(
  state: CharacterSpellState | undefined,
  ritualId: string,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  return {
    ...base,
    ritualIds: (base.ritualIds ?? []).filter((id) => id !== ritualId),
  }
}

export function prepareIntoSlot(
  state: CharacterSpellState | undefined,
  slotId: string,
  spellId: string | null,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  return {
    ...base,
    preparedSlots: (base.preparedSlots ?? []).map((s) =>
      s.id === slotId
        ? { ...s, spellId, expended: false }
        : s,
    ),
  }
}

export function setSlotExpended(
  state: CharacterSpellState | undefined,
  slotId: string,
  expended: boolean,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  return {
    ...base,
    preparedSlots: (base.preparedSlots ?? []).map((s) =>
      s.id === slotId ? { ...s, expended } : s,
    ),
  }
}

/** Gasta um slot espontâneo do posto. `null` = não havia slot livre. */
export function spendSpontaneousSlot(
  state: CharacterSpellState | undefined,
  rank: Exclude<SpellRank, 0>,
  maxSlots: number,
): CharacterSpellState | null {
  const base = { ...emptySpellState(), ...state }
  const used = base.spontaneousSlotsUsed?.[rank] ?? 0
  if (used >= maxSlots) return null
  return {
    ...base,
    spontaneousSlotsUsed: {
      ...base.spontaneousSlotsUsed,
      [rank]: used + 1,
    },
  }
}

export function restoreSpontaneousSlot(
  state: CharacterSpellState | undefined,
  rank: Exclude<SpellRank, 0>,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  const used = base.spontaneousSlotsUsed?.[rank] ?? 0
  return {
    ...base,
    spontaneousSlotsUsed: {
      ...base.spontaneousSlotsUsed,
      [rank]: Math.max(0, used - 1),
    },
  }
}

export function spendFocusPoint(
  state: CharacterSpellState | undefined,
): CharacterSpellState | null {
  const base = { ...emptySpellState(), ...state }
  const cur = base.focusPointsCurrent ?? 0
  if (cur <= 0) return null
  return { ...base, focusPointsCurrent: cur - 1 }
}

/** Refocus (10 min): recupera 1 PF */
export function refocus(
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  const max = resolveFocusMax(base, access)
  return {
    ...base,
    focusPointsCurrent: Math.min(max, (base.focusPointsCurrent ?? 0) + 1),
  }
}

/** Gasta o vínculo do item vinculado do dia. `null` = já foi usado. */
export function spendBondedItem(
  state: CharacterSpellState | undefined,
): CharacterSpellState | null {
  const base = { ...emptySpellState(), ...state }
  if (!base.bondedItemAvailable) return null
  return { ...base, bondedItemAvailable: false }
}

export function toggleCantripPrepared(
  state: CharacterSpellState | undefined,
  spellId: string,
  maxCantrips: number,
): CharacterSpellState {
  const base = { ...emptySpellState(), ...state }
  const list = base.cantripIds ?? []
  if (list.includes(spellId)) {
    return { ...base, cantripIds: list.filter((id) => id !== spellId) }
  }
  if (list.length >= maxCantrips) return base
  return { ...base, cantripIds: [...list, spellId] }
}

/** Contagem de slots prepared preenchidos / gastos */
export function summarizePreparedDay(slots: PreparedSpellSlot[]) {
  const byRank: Record<
    number,
    { total: number; filled: number; expended: number }
  > = {}
  for (const s of slots) {
    const row = byRank[s.rank] ?? { total: 0, filled: 0, expended: 0 }
    row.total += 1
    if (s.spellId) row.filled += 1
    if (s.expended) row.expended += 1
    byRank[s.rank] = row
  }
  return byRank
}
