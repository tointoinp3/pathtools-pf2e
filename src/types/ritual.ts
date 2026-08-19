import type { Provenance, Rarity, SkillId } from './core'
import type { SpellRank } from './spell'

/** Posto de ritual (1–10; rituais não têm truque) */
export type RitualRank = Exclude<SpellRank, 0>

export function isHomebrewRitual(ritual: { provenance?: Provenance }): boolean {
  return ritual.provenance?.type === 'homebrew'
}

/**
 * Ritual Remaster. Não usa tradição nem espaços de magia:
 * o teste principal é de perícia (Arcanismo, Natureza, Ocultismo, Religião…).
 */
export interface Ritual {
  id: string
  name: string
  originalName: string
  rank: RitualRank
  traits: string[]
  rarity: Rarity
  provenance: Provenance
  description: string
  summary?: string
  /** Tempo de conjuração (ex.: 1 dia, 1 hora) */
  castTime?: string
  cost?: string
  primaryCheck?: string
  /** Perícias do teste principal (para dados na ficha) */
  primaryCheckSkills?: SkillId[]
  secondaryCasters?: string
  secondaryChecks?: string
  secondaryCheckSkills?: SkillId[]
  duration?: string
  range?: string
  target?: string
  source?: string
  aonUrl?: string
  sourceId?: string
  createdAt?: string
  updatedAt?: string
}
