import type { AttributeId, Provenance, Rarity, SkillId } from './core'

/** Fonte divina: Curar, Ferir, ou as duas (o jogador escolhe). */
export type DivineFont = 'heal' | 'harm'

/** Santificação sagrada / profana. */
export type Sanctification = 'holy' | 'unholy'

/**
 * Tipo de entrada no catálogo divino.
 * Panteões, filosofias e pactos também vivem em Deities.aspx no AoN.
 */
export type DeityKind = 'deity' | 'pantheon' | 'philosophy' | 'covenant'

/**
 * Divindade / panteão / filosofia Remaster.
 * Resumos curtos em pt-BR; texto completo no livro / AoN.
 */
export interface Deity {
  id: string
  name: string
  originalName: string
  epithet?: string
  kind: DeityKind
  /** Chave estável da categoria AoN (ex.: Gods of the Inner Sea). */
  category: string
  rarity: Rarity
  provenance: Provenance
  summary: string
  areasOfConcern: string[]
  edicts: string[]
  anathema: string[]
  attributes: AttributeId[]
  skillId?: SkillId
  favoredWeapons: string[]
  /** Vazio = sem fonte divina. Um item = automática. Dois = o jogador escolhe. */
  font: DivineFont[]
  /** Opções de santificação oferecidas. */
  sanctification: Sanctification[]
  /** true = precisa escolher uma das opções (não pode ficar sem). */
  sanctificationRequired: boolean
  domains: string[]
  primaryDomains: string[]
  alternateDomains: string[]
  /** Nomes canônicos (AoN) das magias extras na lista de clérigo. */
  clericSpells: string[]
  pantheons: string[]
  source: string
  aonUrl?: string
  sourceId?: string
  createdAt?: string
  updatedAt?: string
}

export function isHomebrewDeity(deity: { provenance?: Provenance }): boolean {
  return deity.provenance?.type === 'homebrew'
}

/** Domínio divino (magias de foco inicial / avançada). */
export interface DivineDomain {
  id: string
  name: string
  originalName: string
  summary: string
  initialSpell: string
  advancedSpell?: string
  source?: string
  aonUrl?: string
}

/**
 * Escolhas do jogador ligadas à divindade.
 * Nunca pré-preencher: fonte, santificação e domínio só entram aqui
 * quando o jogador escolhe.
 */
export interface DeityChoices {
  font?: DivineFont
  /** `none` = recusou santificação opcional. */
  sanctification?: Sanctification | 'none'
  /** Domínio do Iniciado de Domínio / Claustro. */
  domainId?: string
}

export function emptyDeityChoices(): DeityChoices {
  return {}
}
