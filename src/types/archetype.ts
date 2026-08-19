import type { Provenance, Rarity } from './core'
import type { SpellcastingDefinition } from './spell'

/**
 * Família do arquétipo (Player Core / Player Core 2):
 * - multiclass: Dedicação de outra classe (Guerreiro, Mago…)
 * - class: arquétipo amarrado a uma classe (ex.: especializações extras)
 * - general: arquétipo aberto (não é multiclasse de uma classe)
 */
export type ArchetypeKind = 'multiclass' | 'class' | 'general'

export const ARCHETYPE_KIND_LABELS: Record<ArchetypeKind, string> = {
  multiclass: 'Multiclasse',
  class: 'De classe',
  general: 'Geral',
}

/** Agrupamento da UI: multiclasse sempre primeiro. */
export type ArchetypeUiGroup = 'multiclass' | 'other'

export const ARCHETYPE_GROUP_LABELS: Record<ArchetypeUiGroup, string> = {
  multiclass: 'Arquétipos de multiclasse',
  other: 'Outros arquétipos',
}

export function archetypeUiGroup(kind: ArchetypeKind): ArchetypeUiGroup {
  return kind === 'multiclass' ? 'multiclass' : 'other'
}

/** Player Core: 2 feitos do arquétipo atual antes da próxima Dedicação. */
export const DEFAULT_FEATS_BEFORE_NEXT_DEDICATION = 2

/** Registro de um arquétipo no catálogo (oficial ou homebrew). */
export interface Archetype {
  id: string
  name: string
  originalName: string
  kind: ArchetypeKind
  traits: string[]
  rarity: Rarity
  provenance: Provenance
  description: string
  /** Feito de Dedicação — porta de entrada do arquétipo. */
  dedicationFeatId: string
  /** Demais feitos do arquétipo (sem a Dedicação). */
  featIds: string[]
  /**
   * Multiclasse: id da classe correspondente.
   * Quem já é dessa classe não pode pegar esta Dedicação.
   */
  multiclassClassId?: string | null
  /**
   * Quantos feitos deste arquétipo (além da Dedicação) antes de outra Dedicação.
   * Padrão: 2 (Player Core).
   */
  featsRequiredBeforeNextDedication?: number
  /**
   * Se true, feitos deste arquétipo também podem ocupar slot de perícia
   * (além do slot de classe, que é o padrão).
   */
  allowsSkillFeatSlots?: boolean
  /**
   * Conjuração concedida pelo arquétipo. O motor de magias ainda não consome
   * isto — o campo existe para quando o conteúdo for cadastrado.
   */
  spellcasting?: SpellcastingDefinition
  sourceId?: string
  sourcePage?: number
  aonUrl?: string
  createdAt?: string
  updatedAt?: string
}

/** Progresso de um arquétipo já iniciado na ficha (Dedicação ± feitos). */
export interface ArchetypeProgress {
  /** Null se a Dedicação ainda não está no catálogo de arquétipos. */
  archetypeId: string | null
  name: string
  originalName?: string
  kind?: ArchetypeKind
  dedicationFeatId: string | null
  dedicationFeatName?: string
  /** Feitos do arquétipo além da Dedicação. */
  otherFeatCount: number
  requiredBeforeNext: number
  featIds: string[]
  canTakeAnotherDedication: boolean
  /** Dedicação sem os feitos extras exigidos. */
  incomplete: boolean
}
