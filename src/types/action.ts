import type { Pf2ActionType } from '@/components/ui/ActionIcon'

/** Custo de ação na referência de combate (inclui variável e atividades longas). */
export type CombatActionCost =
  | Exclude<Pf2ActionType, 'passive'>
  | 'variable'
  | 'activity'

export type CombatActionCategory =
  | 'basic'
  | 'specialty'
  | 'skill'
  | 'activity'
  | 'feat'

/**
 * Agrupamento da referência (cheatsheet da mesa).
 * Combate no topo; exploração / intervalo começam ocultos na ficha.
 */
export type ActionGroup =
  | 'attack'
  | 'magic'
  | 'defense'
  | 'conflict'
  | 'stealth'
  | 'movement'
  | 'objects'
  | 'medicine'
  | 'other'
  | 'exploration'
  | 'social'
  | 'travel'
  | 'downtime'
  | 'feats'
  | 'subsystem'

export const ACTION_GROUP_ORDER: ActionGroup[] = [
  'attack',
  'magic',
  'defense',
  'conflict',
  'stealth',
  'movement',
  'objects',
  'medicine',
  'other',
  'feats',
  'exploration',
  'social',
  'travel',
  'downtime',
  'subsystem',
]

export const ACTION_GROUP_LABELS: Record<ActionGroup, string> = {
  attack: 'Ataque',
  magic: 'Magia',
  defense: 'Defesa',
  conflict: 'Conflito',
  stealth: 'Furtividade',
  movement: 'Movimento',
  objects: 'Objetos',
  medicine: 'Medicina',
  other: 'Outras',
  feats: 'Feitos (referência)',
  exploration: 'Exploração',
  social: 'Social',
  travel: 'Viagem',
  downtime: 'Intervalo',
  subsystem: 'Subsistemas',
}

/** Grupos da 2ª página do cheatsheet: começam escondidos na aba Combate. */
export const ACTION_GROUPS_HIDDEN_BY_DEFAULT: ActionGroup[] = [
  'exploration',
  'social',
  'travel',
  'downtime',
  'subsystem',
]

/** Ação básica / perícia / atividade — Player Core, Player Core 2 e GM Core (Remaster). */
export interface CombatAction {
  id: string
  name: string
  originalName: string
  actionType: CombatActionCost
  category: CombatActionCategory
  group: ActionGroup
  traits: string[]
  trigger?: string
  requirements?: string
  description: string
  source: string
  /** Tempo quando não é ação de turno (`10 min`, `1 dia`, `exploração`…). */
  activityTime?: string
  /** Só quem tem o feito (a carta fica na referência mesmo assim). */
  featRequired?: boolean
  /** Exige ser treinado na perícia. */
  trainedOnly?: boolean
}
