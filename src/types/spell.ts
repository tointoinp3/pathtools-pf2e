import type { AttributeId, ProficiencyRank, Provenance, Rarity } from './core'

/** Tradição mágica PF2e */
export type SpellTradition = 'arcane' | 'divine' | 'occult' | 'primal'

/**
 * Estilo de conjuração (Player Core / Impossible Magic / AoN Remaster):
 * - prepared: prepara espaços do grimório ou da lista (mago, clérigo, magus…)
 * - spontaneous: repertório; escolhe a magia na hora de gastar o espaço
 * - bounded: “onda” legado — poucos espaços só nos postos mais altos
 *   (Magus Remaster NÃO usa; é preparado limitado)
 * - focusOnly: só magias de foco (campeão, monge), sem espaços
 */
export type SpellcastingStyle =
  | 'prepared'
  | 'spontaneous'
  | 'bounded'
  | 'focusOnly'

/** Origem do acesso a magia (extensível: arquétipo, item, etc.) */
export type SpellcastingSourceKind =
  | 'class'
  | 'archetype'
  | 'heritage'
  | 'feat'
  | 'item'
  | 'other'

/** Posto de magia (cantrip = 0) */
export type SpellRank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const SPELL_TRADITIONS: SpellTradition[] = [
  'arcane',
  'divine',
  'occult',
  'primal',
]

/**
 * Traços de classe (originalName) usados para filtrar magias de foco.
 * Homebrew de foco sem nenhum destes aparece para qualquer conjurador com PF.
 */
export const CLASS_FOCUS_TRAITS = [
  'Alchemist',
  'Animist',
  'Barbarian',
  'Bard',
  'Champion',
  'Cleric',
  'Commander',
  'Druid',
  'Exemplar',
  'Fighter',
  'Guardian',
  'Gunslinger',
  'Inventor',
  'Investigator',
  'Kineticist',
  'Magus',
  'Monk',
  'Necromancer',
  'Oracle',
  'Psychic',
  'Ranger',
  'Rogue',
  'Runesmith',
  'Sorcerer',
  'Summoner',
  'Swashbuckler',
  'Thaumaturge',
  'Witch',
  'Wizard',
] as const

export type ClassFocusTrait = (typeof CLASS_FOCUS_TRAITS)[number]

export function isHomebrewSpell(spell: { provenance?: Provenance }): boolean {
  return spell.provenance?.type === 'homebrew'
}

/** Entrada de magia no catálogo (texto de efeito na ficha; resumo só na lista). */
export interface Spell {
  id: string
  name: string
  originalName: string
  /** 0 = truque (cantrip) */
  rank: SpellRank
  traditions: SpellTradition[]
  traits: string[]
  rarity: Rarity
  provenance: Provenance
  description: string
  actionType?: 'free' | 'reaction' | 'one' | 'two' | 'three'
  summary?: string
  /** Alcance já convertido (ex.: 9 m, toque, varia). */
  range?: string
  area?: string
  targets?: string
  defense?: string
  duration?: string
  requirements?: string
  trigger?: string
  /** Magia de foco (não usa slot; usa Ponto de Foco) */
  focus?: boolean
  aonUrl?: string
  source?: string
  sourceId?: string
  createdAt?: string
  updatedAt?: string
}

/** Flags de mecânicas por fonte (modular — cada classe liga o que precisa) */
export interface SpellcastingFeatures {
  /** Prepared: coleção = grimório (mago, magus) */
  spellbook?: boolean
  /** Spontaneous: coleção = repertório (bardo, feiticeiro, invocador…) */
  repertoire?: boolean
  /** Pool de Pontos de Foco */
  focusPool?: boolean
  /**
   * Reserva inicial de PF (psíquico começa com 2).
   * Sem isso, o padrão é 1 quando `focusPool` está ligado.
   */
  focusPoolBase?: number
  /** Ex.: Vínculo Arcano / Drain Bonded Item (mago) */
  bondedItem?: boolean
  /**
   * Slot bônus por posto para currículo da escola (especialista Remaster).
   * Unified Magical Theory não recebe.
   */
  curriculumBonusSlot?: boolean
  /**
   * Bounded legado (“onda”): Magus SoM. Remaster Magus/Invocador NÃO usam.
   * Se omitido: spellbook → prepared, repertoire → spontaneous, senão prepared.
   */
  boundedMode?: 'prepared' | 'spontaneous'
  /**
   * Poucos espaços (máx. 2/posto), postos baixos permanecem.
   * Magus, invocador e psíquico Remaster.
   */
  limitedSlots?: boolean
  /**
   * Preparado da lista inteira da tradição (clérigo, druida) — sem grimório.
   * A UI deixa preparar direto do catálogo.
   */
  traditionList?: boolean
  /** Bruxa: o familiar guarda as magias (funciona como grimório) */
  familiar?: boolean
  /**
   * Magias emblemáticas (signature) no 3º nível.
   * Bardo, feiticeiro, oráculo, psíquico, invocador — 1 por posto.
   */
  signatureSpells?: boolean
}

/** Definição de conjuração ligada a uma classe (ou futura fonte) */
export interface SpellcastingDefinition {
  id: string
  kind: SpellcastingSourceKind
  label: string
  style: SpellcastingStyle
  tradition: SpellTradition
  attributeOptions: AttributeId[]
  proficiencyRank: ProficiencyRank
  /**
   * Slots por nível do personagem: índice 0 = nv.1 … 19 = nv.20.
   * Cada entrada: slots[rank] onde rank 1–10 (índice 0 ignorado).
   */
  slotsByCharacterLevel?: number[][]
  /** Truques por nível do personagem (índice 0 = nv.1) */
  cantripsByCharacterLevel?: number[]
  /**
   * Rótulo da célula na tabela (ex.: animista “2+1”).
   * Mesmo formato de `slotsByCharacterLevel`; se omitido, mostra o número.
   */
  slotLabelsByCharacterLevel?: string[][]
  /** Rótulo dos truques por nível (ex.: “2+2”). */
  cantripLabelsByCharacterLevel?: string[]
  /** Nota de rodapé da tabela de espaços (currículo, fonte divina, A+S…). */
  slotTableCaption?: string
  features?: SpellcastingFeatures
  /** Texto curto de QoL para a UI (PT) */
  styleHint?: string
}

/** Um slot preparado do dia (prepared casters) */
export interface PreparedSpellSlot {
  /** id estável: `r{rank}-{index}` */
  id: string
  rank: SpellRank
  spellId: string | null
  expended: boolean
  /** Espaço extra da Fonte Divina (só Curar ou Ferir). */
  font?: boolean
}

/**
 * Grimório / repertório / espaços de uma fonte (classe ou arquétipo).
 * Não mistura tradições: Magus fica no livro arcano, Dedicação de Clérigo na lista divina.
 */
export interface SourceSpellState {
  collectionSpellIds?: string[]
  cantripIds?: string[]
  preparedSlots?: PreparedSpellSlot[]
  spontaneousSlotsUsed?: Partial<Record<Exclude<SpellRank, 0>, number>>
  signatureSpellIds?: string[]
}

/**
 * Estado persistido de magias no personagem.
 * Modular: prepared usa preparedSlots; spontaneous usa spontaneousSlotsUsed.
 * `bySource` separa classe e arquétipos; os campos soltos espelham a fonte principal.
 */
export interface CharacterSpellState {
  /** Grimório (prepared) ou repertório (spontaneous) */
  collectionSpellIds?: string[]
  /** Truques preparados / no repertório */
  cantripIds?: string[]
  /** Magias de foco conhecidas (IDs) */
  focusSpellIds?: string[]
  /** Rituais conhecidos (IDs). Qualquer personagem pode conhecê-los. */
  ritualIds?: string[]
  /** Slots do dia — prepared */
  preparedSlots?: PreparedSpellSlot[]
  /** Quantos slots espontâneos já gastos por posto hoje */
  spontaneousSlotsUsed?: Partial<Record<Exclude<SpellRank, 0>, number>>
  /** Pontos de foco atuais */
  focusPointsCurrent?: number
  /** Drain Bonded Item disponível hoje */
  bondedItemAvailable?: boolean
  /**
   * Magias emblemáticas (IDs do catálogo).
   * 1 por posto de espaço + extras de feitos (posto ≤ 3).
   */
  signatureSpellIds?: string[]
  /** Coleção e espaços por fonte de conjuração (`ResolvedSpellcastingSource.id`). */
  bySource?: Record<string, SourceSpellState>
  notes?: string
}

/** Uma fonte de conjuração já resolvida (classe, dedicação, feito…). */
export interface ResolvedSpellcastingSource {
  id: string
  kind: SpellcastingSourceKind
  label: string
  style: SpellcastingStyle
  tradition: SpellTradition
  proficiencyRank: ProficiencyRank
  features: SpellcastingFeatures
  slotsByRank?: Partial<Record<Exclude<SpellRank, 0>, number>>
  cantripsPerDay?: number
  classOriginalName?: string
  attributeId?: AttributeId
  attributeModifier?: number
  proficiencyBonus?: number
  spellAttack?: number | null
  spellDc?: number | null
  spellAttackExtras?: Array<{ label: string; value: number }>
  spellDcExtras?: Array<{ label: string; value: number }>
  extraSpellOriginalNames?: string[]
  fontSlotCount?: number
  fontKind?: 'heal' | 'harm'
  hasSignatureSpells?: boolean
}

/** Visão resolvida para a UI de Magias */
export interface ResolvedSpellcastingAccess {
  hasAccess: boolean
  sources: ResolvedSpellcastingSource[]
  primaryStyle?: SpellcastingStyle
  features: SpellcastingFeatures
  styleHint?: string
  spellAttributeId?: AttributeId
  spellAttributeModifier?: number
  spellAttack?: number | null
  spellDc?: number | null
  /** Partes extras (conexões) já somadas em `spellAttack`. */
  spellAttackExtras?: Array<{ label: string; value: number }>
  /** Partes extras (conexões) já somadas em `spellDc`. */
  spellDcExtras?: Array<{ label: string; value: number }>
  /** Partes extras (conexões) já somadas em `focusPointsMax`. */
  focusPoolExtras?: Array<{ label: string; value: number }>
  proficiencyRank?: ProficiencyRank
  proficiencyBonus?: number
  /** Slots do nível atual (já com bônus de currículo se aplicável) */
  slotsByRank?: Partial<Record<Exclude<SpellRank, 0>, number>>
  cantripsPerDay?: number
  /** ceil(nível/2) — altura automática de truques e foco */
  autoHeightenRank?: number
  highestSlotRank?: number
  focusPointsMax?: number
  /** originalName da classe (Wizard, Champion…) para filtrar magias de foco */
  classOriginalName?: string
  /** Classes cujas magias de foco aparecem (classe + feitos/arquétipos). */
  focusClassNames?: string[]
  /** Magias extras da divindade (lista de clérigo), por originalName. */
  extraSpellOriginalNames?: string[]
  /** Magias de foco concedidas (domínio + classe), por originalName. */
  grantedFocusSpellOriginalNames?: string[]
  /** Truques que a classe/especialização entrega (hex, currículo, musa…). */
  grantedCantripOriginalNames?: string[]
  /** Magias no grimório/repertório entregues pela classe. */
  grantedCollectionOriginalNames?: string[]
  /** Rótulo da fonte por originalName em minúsculas. */
  grantedSpellLabels?: Record<string, string>
  /** Espaços extras da Fonte Divina no posto mais alto. */
  fontSlotCount?: number
  fontKind?: 'heal' | 'harm'
  /** Classe tem o recurso; só vale a partir do 3º. */
  hasSignatureSpells?: boolean
  /** Extras do feito Expansão de Magia Emblemática (postos ≤ 3). */
  extraSignatureSpells?: number
  extraSignatureMaxRank?: number
  lockedReason?: string
}
