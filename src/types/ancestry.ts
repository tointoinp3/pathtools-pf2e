import type {
  AttributeBoostRule,
  FeatGrantRule,
  SkillGrantRule,
} from './background'
import type { AttributeId, Provenance, Rarity } from './core'

/** Tamanho de criatura PF2e */
export type CreatureSize =
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge'
  | 'gargantuan'

/** Tipos de sentido suportados */
export type SenseKind =
  | 'darkvision'
  | 'lowLightVision'
  | 'scent'
  | 'tremorsense'
  | 'other'

export interface SenseDefinition {
  id: string
  kind: SenseKind
  name: string
  originalName?: string
  /** Alcance em pés, quando aplicável */
  range?: number
  description: string
}

export interface SpecialAbilityDefinition {
  id: string
  name: string
  originalName?: string
  description: string
  actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
  trigger?: string
  frequency?: string
}

/** Resistência calculável automaticamente */
export type ResistanceRule =
  | {
      kind: 'halfLevelMin1'
      damageType: string
      label: string
    }
  | {
      kind: 'fixed'
      damageType: string
      value: number
      label: string
    }

/** Opção de uma escolha de herança (pode alterar deslocamento). */
export interface HeritageChoiceOption {
  id: string
  label: string
  originalLabel?: string
  /** Texto da opção na criação (se não for feito/magia do catálogo). */
  description?: string
  /** Substitui o deslocamento terrestre da ancestralidade. */
  speedOverride?: number
  /** Soma em pés no deslocamento terrestre. */
  speedBonus?: number
  additionalSpeeds?: Partial<Record<'climb' | 'swim' | 'fly', number>>
}

/** Escolha mecânica dentro de uma herança (ex.: tipo de dano) */
export interface HeritageChoiceRule {
  id: string
  label: string
  options: HeritageChoiceOption[]
  /** Padrão true. False = opcional até um feito exigir (ex.: exemplar dracônico). */
  required?: boolean
  hint?: string
}

/**
 * Escolha extra da ancestralidade (tamanho, tradição, criatura do catálogo…).
 * O catálogo de criaturas começa vazio e será preenchido depois.
 */
export type AncestryExtraChoiceKind = 'size' | 'creatureCatalog' | 'options'

export interface AncestryExtraChoiceRule {
  id: string
  label: string
  kind: AncestryExtraChoiceKind
  required?: boolean
  hint?: string
  sizeOptions?: CreatureSize[]
  options?: Array<{
    id: string
    label: string
    originalLabel?: string
    description?: string
  }>
  catalog?: {
    /** Chave estável (ex.: awakened-animal). */
    id: string
    kinds?: string[]
    allowCustomUntilCatalogReady?: boolean
    customPlaceholder?: string
  }
}

/** Herança (específica da ancestralidade ou versátil) */
export interface Heritage {
  id: string
  /** null = herança versátil (qualquer ancestralidade) */
  ancestryId: string | null
  name: string
  originalName: string
  description: string
  rarity: Rarity
  provenance: Provenance
  sourceId?: string
  sourcePage?: number
  isVersatile?: boolean
  /**
   * Ancestralidades cujos feitos esta herança libera
   * (ex.: Aiuvarin → feitos de elfo).
   */
  grantedAncestryIds?: string[]
  /**
   * Heranças cujos feitos esta herança também libera
   * (ex.: geniekin → feitos compartilhados Elemental Eyes, armas de gênio).
   */
  grantedHeritageIds?: string[]
  /**
   * Traços que a ancestralidade precisa ter para pegar esta herança versátil
   * (ex.: Beastkin exige Humanoide — leshy e animal despertado ficam de fora).
   */
  requiredAncestryTraits?: string[]
  /** Sentidos concedidos (ex.: visão na penumbra do Aiuvarin). */
  senses?: SenseDefinition[]
  /**
   * Se a ancestralidade já tem visão na penumbra, a herança concede visão no escuro
   * no lugar (Nephilim). Sem visão na penumbra, aplica o sentido listado em `senses`.
   */
  upgradeLowLightToDarkvision?: boolean
  /** Idiomas extras na lista de opções da Inteligência (ex.: Dracônico do Dragonblood). */
  additionalLanguageOptions?: string[]
  /** Idiomas conhecidos automaticamente (ex.: Feérico do dragonete feérico). */
  grantedLanguages?: string[]
  skillGrants?: SkillGrantRule[]
  featGrants?: FeatGrantRule[]
  resistances?: ResistanceRule[]
  specialAbilities?: SpecialAbilityDefinition[]
  choices?: HeritageChoiceRule[]
  /** Resumo didático do efeito (PT) */
  rulesSummary: string
  traits?: string[]
  /**
   * Substitui os PV da ancestralidade (ex.: Goblin Inquebrável = 10 em vez de 6).
   */
  hitPointsOverride?: number
  /** Substitui o tamanho da ancestralidade (ex.: Lua Nova Sarangay = Pequeno). */
  sizeOverride?: CreatureSize
  /** Substitui o deslocamento terrestre da ancestralidade. */
  speedOverride?: number
  /** Soma em pés no deslocamento terrestre (Centauro Ventania = 5). */
  speedBonus?: number
  additionalSpeeds?: Partial<Record<'climb' | 'swim' | 'fly', number>>
  aonUrl?: string
  createdAt?: string
  updatedAt?: string
}

/** Idiomas da ancestralidade */
export interface AncestryLanguages {
  automatic: string[]
  additionalOptions: string[]
  /** Quantidade extra = max(0, modificador de Inteligência) */
  additionalFromIntelligence: boolean
  /**
   * Idiomas adicionais fixos além da Inteligência (ex.: humano = 1 + INT).
   * Somado aos slots de Inteligência quando additionalFromIntelligence é true.
   */
  bonusSlots?: number
}

/** Flavor / lore da ancestralidade */
export interface AncestryLore {
  summary: string
  youMight: string[]
  othersProbably: string[]
  physicalDescription: string
  society: string
  beliefs: string
  popularEdicts?: string[]
  popularAnathema?: string[]
  sampleNames: string[]
}

/** Ancestralidade (Ancestry) */
export interface Ancestry {
  id: string
  name: string
  originalName: string
  rarity: Rarity
  provenance: Provenance
  sourceId?: string
  sourcePage?: number
  hitPoints: number
  size: CreatureSize
  /** Deslocamento terrestre em pés (herança / escolhas podem substituir) */
  speed: number
  /**
   * PV por tamanho, quando a ancestralidade deixa o jogador escolher
   * (ex.: Animal Despertado: 6 / 8 / 10).
   */
  hitPointsBySize?: Partial<Record<CreatureSize, number>>
  extraChoices?: AncestryExtraChoiceRule[]
  attributeBoosts: AttributeBoostRule[]
  attributeFlaws: AttributeId[]
  languages: AncestryLanguages
  senses: SenseDefinition[]
  specialAbilities: SpecialAbilityDefinition[]
  traits: string[]
  lore: AncestryLore
  /** IDs de heranças específicas desta ancestralidade */
  heritageIds: string[]
  aonUrl?: string
  createdAt?: string
  updatedAt?: string
}

/** Escolhas do personagem para ancestralidade + herança */
export interface AncestryChoices {
  /** Mapa boostRuleId → AttributeId (só boosts que exigem escolha) */
  attributeBoosts: Record<string, AttributeId>
  /** Idiomas adicionais escolhidos */
  additionalLanguages: string[]
  /** Escolhas da herança: choiceRuleId → optionId */
  heritageChoices: Record<string, string>
  /** Escolhas extras da ancestralidade: ruleId → optionId (ou 'custom') */
  extraChoices?: Record<string, string>
  /** Rótulos livres (ex.: nome do animal enquanto o catálogo está vazio) */
  customLabels?: Record<string, string>
  /**
   * Player Core: em vez dos aumentos fixos da ancestralidade, dois aumentos livres
   * e sem falha. O jogador escolhe.
   */
  useFlexibleBoosts?: boolean
}

/** Resistência resolvida (valor numérico) */
export interface ResolvedResistance {
  id: string
  label: string
  damageType: string
  value: number
  sourceType: 'heritage' | 'ancestry' | 'feat' | 'other'
  sourceId: string
  sourceLabel: string
  breakdown: Array<{ label: string; value: number | string }>
}

/** Imunidade resolvida (presença, sem valor numérico). */
export interface ResolvedImmunity {
  id: string
  label: string
  kind: string
  sourceLabel: string
  sources: Array<{ label: string }>
}
