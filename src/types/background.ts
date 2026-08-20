import type {
  AttributeId,
  ProficiencyRank,
  Provenance,
  Rarity,
} from './core'

/** Opção de atributo em um boost */
export type AttributeBoostOption =
  | { kind: 'specific'; attributes: AttributeId[] }
  | { kind: 'free'; excludeAlreadyChosen?: boolean }

/** Regra de boost de atributo (uma escolha) */
export interface AttributeBoostRule {
  id: string
  /** Rótulo exibido (ex.: "Boost restrito", "Boost livre") */
  label: string
  option: AttributeBoostOption
}

/** Concessão de perícia — fixa ou escolha */
export interface SkillGrantRule {
  id: string
  rank: ProficiencyRank
  /** Uma perícia fixa */
  skillId?: string
  /** Escolha entre várias perícias */
  skillOptions?: string[]
  /**
   * Se definido, a partir deste nível a perícia concedida sobe para especialista
   * (ex.: Humano Hábil no 5º nível).
   */
  expertAtLevel?: number
  /**
   * Se a perícia já vem treinada (classe, origem…), o personagem escolhe outra.
   */
  replaceIfTrained?: boolean
}

/** Concessão de Lore/Conhecimento — fixa, escolha, ou personalizada */
export interface LoreGrantRule {
  id: string
  rank: ProficiencyRank
  /** Lore fixa (id estável) */
  loreId?: string
  loreName?: string
  /** Escolha entre várias Lores */
  loreOptions?: Array<{ id: string; name: string }>
  /** Permite o usuário digitar uma Lore personalizada */
  allowCustom?: boolean
  /** Instrução do que esse Conhecimento deve ser (ex.: divindade que o abençoou). */
  hint?: string
  /** A partir deste nível a lore sobe para especialista (ex.: Comandante 3º). */
  expertAtLevel?: number
  /** A partir deste nível a lore sobe para mestre. */
  masterAtLevel?: number
  /** A partir deste nível a lore sobe para lendário. */
  legendaryAtLevel?: number
}

/** Concessão de feito — nesta versão, principalmente por nome */
export interface FeatGrantRule {
  id: string
  /** Referência futura ao compêndio de feats */
  featId?: string
  /** Nome exibido (até o compêndio existir) */
  featName: string
  originalName?: string
  featType?:
    | 'skill'
    | 'general'
    | 'class'
    | 'ancestry'
    | 'archetype'
    | 'other'
  /** Texto de regras quando o benefício não é um feito do catálogo (magia inata, sentido…). */
  description?: string
  actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
  frequency?: string
  trigger?: string
  traits?: string[]
  /**
   * Se definido, só concede o feito quando a escolha de perícia
   * do skillGrant correspondente for este skillId.
   */
  requiresSkillId?: string
  /** Se true, o nome do feito inclui a perícia escolhida (ex.: Garantia) */
  appendChosenSkillName?: boolean
  skillGrantIdForName?: string
  /** Só concede se a escolha da herança for este valor. */
  requiresChoiceId?: string
  requiresChoiceValue?: string
  /**
   * Lista fechada: o jogador escolhe um (ex.: Ofício Especializado ou Poliglota).
   * A escolha fica em `BackgroundChoices.featChoices[grant.id]`.
   */
  featOptions?: FeatGrantOption[]
  /**
   * Seletor aberto: qualquer feito de perícia do catálogo ligado a esta perícia
   * (ex.: feito de Atletismo à escolha).
   */
  chooseSkillFeat?: string
  chooseHint?: string
}

/** Opção de um feito concedido pela origem */
export interface FeatGrantOption {
  id: string
  featId?: string
  featName: string
  originalName?: string
  description?: string
  actionType?: 'passive' | 'free' | 'reaction' | 'one' | 'two' | 'three'
  frequency?: string
  trigger?: string
  traits?: string[]
}

/** Origem (Background) — oficial e homebrew usam a mesma entidade */
export interface Background {
  id: string
  name: string
  originalName?: string
  description: string
  rarity: Rarity
  provenance: Provenance
  sourceId?: string
  sourcePage?: number
  attributeBoosts: AttributeBoostRule[]
  skillGrants: SkillGrantRule[]
  loreGrants: LoreGrantRule[]
  featGrants: FeatGrantRule[]
  createdAt?: string
  updatedAt?: string
}

/** Escolhas do personagem para uma origem */
export interface BackgroundChoices {
  /** Mapa de boostRuleId → AttributeId escolhido */
  attributeBoosts: Record<string, AttributeId>
  /** Mapa de skillGrantRuleId → skillId escolhido (quando há opções) */
  skillChoices: Record<string, string>
  /** Mapa de loreGrantRuleId → loreId ou nome custom */
  loreChoices: Record<string, string>
  /** Lore customizadas digitadas: ruleId → nome */
  customLoreNames?: Record<string, string>
  /** Mapa de featGrantRuleId → featId do catálogo ou id da opção */
  featChoices?: Record<string, string>
}
