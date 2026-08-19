import type { ConnectionTarget } from './connections'

/** Quando o efeito numérico entra na ficha. */
export type CatalogEffectWhen =
  | 'always'
  | 'overdrive'
  | 'overdriveCritical'
  | 'spark'
  | 'exploit'
  | 'etched'
  | 'toggle'
  | 'implement'

export interface CatalogTableEffect {
  kind: 'bonus' | 'damagePerDie'
  /** Alvo de conexão (CA, dano, resistência.fogo, perícia…). */
  target?: ConnectionTarget
  /** Fórmula: NIVEL, MEIO_NIVEL, INT, MEIO_INT… */
  formula?: string
  damageType?: string
  perDie?: number
  persistent?: boolean
  when?: CatalogEffectWhen
  appliesTo?: 'all' | 'melee' | 'ranged'
  label?: string
}

export type InventorOverdriveState = 'off' | 'success' | 'critical' | 'fail'

export interface CatalogWeaponExtra {
  label: string
  amountPerDie?: number
  amountFlat?: number
  damageType: string
  persistent?: boolean
  appliesTo: 'all' | 'melee' | 'ranged'
}

export interface CatalogActiveEffect {
  label: string
  value: string
}
