import type { AttributeId, Provenance, Rarity, SkillId } from './core'
import type { CreatureSize, SenseKind, SpecialAbilityDefinition } from './ancestry'

/** Ajuste Elite / Fraca do Monster Core. Padrão na ficha: normal. */
export type CreaturePowerVariant = 'normal' | 'elite' | 'weak'

/** Sentido impresso na ficha de criatura (alcance interno em pés). */
export interface CreatureSense {
  kind: SenseKind
  name?: string
  range?: number
  /** Padrão: preciso. Faro costuma ser impreciso. */
  precise?: boolean
}

export interface CreatureSkillBonus {
  skillId: SkillId
  bonus: number
}

/** Custo impresso ao lado do nome (ícone oficial da ficha). */
export type CreatureActionCost = 'one' | 'two' | 'three' | 'free' | 'reaction'

export interface CreatureAttack {
  id: string
  name: string
  originalName: string
  kind: 'melee' | 'ranged'
  actionType: CreatureActionCost
  bonus: number
  /** 2º e 3º ataques, como no bloco do livro. */
  map: [number, number]
  /** Ex.: "1d6+2 perfurante" */
  damage: string
  traits: string[]
  /** Riders (Derrubar, Agarrar…). */
  plus?: string[]
}

/** Item listado na ficha; liga ao catálogo de equipamento quando possível. */
export interface CreatureItemRef {
  /** Texto na ficha, com quantidade se houver (ex.: "Arco curto (10 flechas)"). */
  name: string
  originalName?: string
  itemId?: string
}

export interface CreatureFamilySection {
  id: string
  title: string
  body: string
}

/**
 * Lore de família / tag (Goblin, Ogro, Lobo…).
 * Compartilhado por todas as fichas daquele tipo; a criatura pode
 * apontar `familyIds` quando o traço sozinho não basta (Animal, Gigante…).
 */
export interface CreatureFamily {
  id: string
  name: string
  originalName: string
  /** Traço que associa sozinho (Goblin). `null` = só via `familyIds`. */
  trait: string | null
  intro: string
  sections: CreatureFamilySection[]
  source: string
  sourcePage?: number
  aonUrl?: string
}

export interface CreatureSpell {
  id: string
  name: string
  originalName: string
  rank: number
  actionType?: CreatureActionCost
  attack?: number
  dc?: number
  damage?: string
}

export interface CreatureSpellcasting {
  tradition: 'arcane' | 'divine' | 'occult' | 'primal'
  dc: number
  attack?: number
  /** Como a criatura lança — a ficha usa a mesma CD para todas. */
  kind?: 'prepared' | 'spontaneous' | 'innate' | 'focus'
  spells: CreatureSpell[]
}

export interface CreatureAbility extends SpecialAbilityDefinition {
  requirements?: string
}

export interface CreatureRecallKnowledge {
  label: string
  dc: number
}

/**
 * Ficha de criatura do bestiário (Monster Core / Remaster).
 * Não confundir com `CreatureCatalogEntry` (lista do Animal Despertado).
 */
export interface Creature {
  id: string
  name: string
  originalName: string
  level: number
  rarity: Rarity
  size: CreatureSize
  traits: string[]
  perception: number
  senses: CreatureSense[]
  languages: string[]
  skills: CreatureSkillBonus[]
  attributes: Record<AttributeId, number>
  items?: CreatureItemRef[]
  ac: number
  fortitude: number
  reflex: number
  will: number
  hp: number
  immunities?: string[]
  weaknesses?: Array<{ type: string; value: number }>
  resistances?: Array<{ type: string; value: number }>
  speeds: {
    land?: number
    fly?: number
    climb?: number
    burrow?: number
    swim?: number
  }
  attacks: CreatureAttack[]
  spellcasting?: CreatureSpellcasting
  abilities: CreatureAbility[]
  /** Frase curta para lista e para a descrição minimizada. */
  summary: string
  /**
   * Lore completa da criatura (vários parágrafos), visível por padrão
   * na ficha. Distinta do `summary` e da lore de família.
   */
  description?: string
  /**
   * Sidebars do livro (ex.: Olhos dos Mortos), no fim da ficha.
   */
  loreSections?: CreatureFamilySection[]
  recallKnowledge?: CreatureRecallKnowledge[]
  sourceId: string
  source: string
  sourcePage?: number
  aonUrl: string
  provenance: Provenance
  /**
   * Famílias de lore. Se omitido, usa as famílias cujo `trait` está nos
   * traços da criatura. Use isto quando o traço é genérico (Animal, Gigante).
   */
  familyIds?: string[]
  createdAt?: string
  updatedAt?: string
}

export function isHomebrewCreature(creature: {
  provenance?: Provenance
}): boolean {
  return creature.provenance?.type === 'homebrew'
}
