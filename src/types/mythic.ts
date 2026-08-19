import type { Provenance, Rarity } from './core'

export const MYTHIC_POINTS_MAX = 3
export const MYTHIC_POINTS_START = 3

/** Chamado mítico (War of Immortals). O jogador escolhe; o motor não escolhe. */
export interface MythicCalling {
  id: string
  name: string
  originalName: string
  rarity: Rarity
  provenance: Provenance
  summary: string
  /** Gastar 1 Ponto Mítico para testar com proficiência mítica. */
  mythicSpend: string
  /** Primeiro crítico do dia que devolve 1 Ponto Mítico. */
  mythicRegain: string
  edicts: string[]
  anathema: string[]
  sourceId: string
  sourcePage: number
  aonUrl: string
}
