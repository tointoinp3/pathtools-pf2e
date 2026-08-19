import type { Pf2ActionType } from '@/components/ui/ActionIcon'

/** Custo de ação na referência de combate (inclui variável). */
export type CombatActionCost = Exclude<Pf2ActionType, 'passive'> | 'variable'

export type CombatActionCategory = 'basic' | 'specialty'

/** Ação básica / especial do Player Core (referência AoN Actions). */
export interface CombatAction {
  id: string
  name: string
  originalName: string
  actionType: CombatActionCost
  category: CombatActionCategory
  traits: string[]
  trigger?: string
  requirements?: string
  description: string
  source: string
}
