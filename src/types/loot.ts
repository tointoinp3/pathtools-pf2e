import type { Rarity } from './core'
import type { ItemCategory } from './equipment'

export type LootKind = 'level' | 'encounter' | 'custom'
export type EncounterThreat = 'low' | 'moderate' | 'severe' | 'extreme'
export type LootLineKind = 'item' | 'coins'
export type LootItemRole = 'permanent' | 'consumable'

/** Uma linha do saque sorteado (item do catálogo ou moedas). */
export interface LootLine {
  id: string
  kind: LootLineKind
  role?: LootItemRole
  definitionId?: string | null
  name: string
  originalName?: string
  quantity: number
  /** Nível pedido na tabela (para sortear de novo o mesmo “espaço”). */
  slotLevel?: number
  level?: number
  category?: ItemCategory
  rarity?: Rarity
  priceCp?: number | null
  /** Moedas em peças de cobre. */
  coinsCp?: number
  /** Quem já levou esta linha para o inventário. */
  claimedByCharacterId?: string | null
  claimedByName?: string
  claimedAt?: string
}

/** Saque salvo neste dispositivo. */
export interface LootHaul {
  id: string
  name: string
  partyLevel: number
  partySize: number
  kind: LootKind
  encounterThreat: EncounterThreat
  customItemCount: number
  categories: ItemCategory[]
  rarities: Rarity[]
  includeHomebrew: boolean
  includeCoins: boolean
  lines: LootLine[]
  notes: string
  createdAt: string
  updatedAt: string
}
