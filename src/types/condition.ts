import type { AttributeId } from './core'

/**
 * Condições do Player Core (Remaster) rastreadas na ficha.
 * IDs em inglês; nomes na UI em pt-BR.
 */
export type ConditionId =
  | 'frightened'
  | 'sickened'
  | 'clumsy'
  | 'enfeebled'
  | 'stupefied'
  | 'drained'
  | 'doomed'
  | 'wounded'
  | 'dying'
  | 'fatigued'
  | 'offGuard'
  | 'prone'
  | 'slowed'
  | 'quickened'
  | 'stunned'
  | 'persistentDamage'
  | 'blinded'
  | 'dazzled'
  | 'deafened'
  | 'concealed'
  | 'hidden'
  | 'invisible'
  | 'undetected'
  | 'grabbed'
  | 'restrained'
  | 'immobilized'
  | 'paralyzed'
  | 'unconscious'
  | 'confused'
  | 'controlled'
  | 'fascinated'
  | 'fleeing'
  | 'petrified'
  | 'encumbered'
  | 'broken'
  | 'observed'
  | 'unnoticed'
  | 'helpful'
  | 'friendly'
  | 'indifferent'
  | 'unfriendly'
  | 'hostile'

export type ConditionGroup =
  | 'penalty'
  | 'death'
  | 'actions'
  | 'senses'
  | 'control'
  | 'attitude'
  | 'other'

export interface PersistentDamageState {
  /** Fórmula ou valor (ex.: `1d6` ou `3`). */
  amount: string
  /** Tipo de dano (fogo, sangramento…). */
  damageType: string
}

/** Instância ativa no personagem (persistida). */
export interface ActiveCondition {
  id: string
  conditionId: ConditionId
  /** Valor (amedrontado 2, drenado 1…). Omitido em condições sem valor. */
  value?: number
  persistent?: PersistentDamageState
  notes?: string
}

export interface ConditionDefinition {
  id: ConditionId
  name: string
  originalName: string
  group: ConditionGroup
  valued: boolean
  minValue?: number
  maxValue?: number
  defaultValue?: number
  summary: string
  description: string
  /** O motor aplica penalidade numérica na ficha. */
  affectsNumbers: boolean
  sourcePage?: number
}

export interface ConditionPenaltySlice {
  amount: number
  label: string
  kind: 'status' | 'circumstance'
}

export interface ResolvedConditionEffects {
  instances: ActiveCondition[]
  impliedIds: ConditionId[]
  ac: ConditionPenaltySlice[]
  fortitude: ConditionPenaltySlice[]
  reflex: ConditionPenaltySlice[]
  will: ConditionPenaltySlice[]
  perception: ConditionPenaltySlice[]
  skillByAttribute: Partial<Record<AttributeId, ConditionPenaltySlice[]>>
  attackByAttribute: Partial<Record<AttributeId, ConditionPenaltySlice[]>>
  attackCircumstance: ConditionPenaltySlice | null
  damageStrength: ConditionPenaltySlice | null
  spell: ConditionPenaltySlice[]
  classDcByAttribute: Partial<Record<AttributeId, ConditionPenaltySlice[]>>
  hpMaxPenalty: number
  hpMaxLabel?: string
  doomed: number
  wounded: number
  dying: number
  slowed: number
  stunned: number
  quickened: boolean
  notes: string[]
}
