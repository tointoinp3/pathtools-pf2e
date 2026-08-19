import type { AttributeId, ProficiencyRank } from './core'

/** Tipos de bônus/penalidade PF2e */
export type BonusType =
  | 'untyped'
  | 'item'
  | 'status'
  | 'circumstance'
  | 'proficiency'
  | 'attribute'
  | 'base'

/** Tipos de fonte de contribuição */
export type ModifierSourceType =
  | 'base'
  | 'background'
  | 'ancestry'
  | 'heritage'
  | 'class'
  | 'feat'
  | 'item'
  | 'condition'
  | 'effect'
  | 'manual'
  | 'level'
  | 'freeBoost'
  | 'attribute'
  | 'proficiency'
  | 'connection'

/** Alvos de modificadores */
export type ModifierTarget =
  | `attribute.${AttributeId}`
  | `skill.${string}`
  | `lore.${string}`
  | 'ac'
  | 'hp.max'
  | 'perception'
  | 'save.fortitude'
  | 'save.reflex'
  | 'save.will'
  | 'speed'
  | `proficiency.skill.${string}`
  | `proficiency.lore.${string}`
  | `feat.${string}`

/** Contribuição genérica de modificador */
export interface ModifierContribution {
  id: string
  sourceType: ModifierSourceType
  sourceId: string
  sourceLabel: string
  target: ModifierTarget
  value: number
  bonusType: BonusType
  label: string
  /** Se true, esta contribuição concede treino (valor = rank numérico implícito) */
  proficiencyRank?: ProficiencyRank
}

/** Breakdown resolvido de um valor */
export interface ResolvedModifier {
  total: number
  contributions: ModifierContribution[]
  /** Detalhes para tooltip de depuração */
  breakdown: Array<{ label: string; value: number }>
}

/** Resultado de CA com componentes explícitos */
export interface ArmorClassInput {
  base?: number
  dexModifier: number
  dexCap?: number | null
  proficiencyBonus?: number | null
  itemBonus?: number
  bonuses?: number
  penalties?: number
}

export interface ArmorClassResult {
  total: number | null
  provisional: boolean
  components: {
    base: number
    dex: number
    proficiency: number | null
    item: number
    bonuses: number
    penalties: number
  }
  missing: string[]
  breakdown: Array<{ label: string; value: number | string }>
}
