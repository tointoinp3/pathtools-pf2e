import type { AttributeId } from './core'
import type { CreaturePowerVariant } from './creature'

/** Direção para onde a FRENTE da ficha aponta no grid. */
export type TokenFacing = 'up' | 'right' | 'down' | 'left'

/**
 * O que a ficha representa. Combates salvos antes deste campo não o têm:
 * use `tokenKind()` do engine, que deriva de `creatureId`.
 */
export type CombatTokenKind = 'creature' | 'character' | 'loot' | 'custom'

/** Item dentro de um baú colocado no mapa. */
export interface LootTokenItem {
  id: string
  name: string
  quantity: number
  /** Já foi pego pelos jogadores. */
  taken: boolean
}

/** Golpe do jogador congelado no token (com MAP e dano roláveis). */
export interface CombatTokenStrike {
  label: string
  bonus: number | null
  /** Resumo legível do dano ("1d8+4 cortante"). */
  damage: string
  traits?: string[]
  /** Penalidades do 2º e 3º ataque (−5/−10; ágil −4/−8). */
  mapPenalties?: [number, number]
  /** Dados principais ("2d8") para rolar o dano. */
  damageDice?: string
  damageModifier?: number
}

/** Magia da ficha do jogador (nome/texto vêm do catálogo pelo id). */
export interface CombatTokenSpell {
  id: string
  label: string
  kind: string
  rank: number
  expended?: boolean
}

/** Ação/habilidade do jogador (feito ativo ou habilidade especial). */
export interface CombatTokenAbility {
  name: string
  actionType?: string
  traits?: string[]
  trigger?: string
  frequency?: string
  description?: string
  sourceLabel?: string
}

/** Números úteis da ficha do jogador, congelados na importação. */
export interface CombatTokenCharacterSummary {
  className: string | null
  ancestryName?: string | null
  /** Modificadores de atributo (For, Des…), como na ficha de criatura. */
  attributes?: Partial<Record<AttributeId, number>> | null
  fortitude: number | null
  reflex: number | null
  will: number | null
  speed: number | null
  classDc?: number | null
  spellAttack?: number | null
  spellDc?: number | null
  spellTraditions?: string[]
  /** Perícias treinadas ou melhores. */
  skills?: Array<{ name: string; modifier: number }>
  /** Golpes com arma, com MAP embutido como nas criaturas. */
  strikes?: CombatTokenStrike[]
  /** Magias preparadas/repertório/foco/rituais. */
  spells?: CombatTokenSpell[]
  /** Ações, reações e habilidades (feitos ativos + habilidades especiais). */
  abilities?: CombatTokenAbility[]
  senses?: string[]
  languages?: string[]
}

/** Uma ficha posicionada no grid de combate. */
export interface CombatToken {
  id: string
  kind?: CombatTokenKind
  /** Ficha do bestiário de origem; null = ficha avulsa (PJ, aliado, marcador). */
  creatureId: string | null
  /** Personagem de origem (kind 'character'). */
  characterId?: string | null
  characterSummary?: CombatTokenCharacterSummary | null
  /** Conteúdo do baú (kind 'loot'). */
  lootItems?: LootTokenItem[]
  name: string
  variant: CreaturePowerVariant
  level: number | null
  /** Célula superior esquerda (base 0). */
  x: number
  y: number
  /** Tamanho em células, editável à vontade (ex.: Tarrasque 2×4). */
  w: number
  h: number
  facing: TokenFacing
  maxHp: number
  currentHp: number
  tempHp: number
  ac: number | null
  /** Bônus somado ao d20 ao rolar iniciativa (Percepção na criatura). */
  initiativeBonus: number
  initiative: number | null
  /** Ações gastas no turno atual (0–3). */
  actionsUsed: number
  reactionUsed: boolean
  conditions: string[]
  notes: string
  defeated: boolean
}

/** Estado completo de um combate salvo neste dispositivo. */
export interface CombatSession {
  id: string
  name: string
  round: number
  /** Ficha com o turno ativo (null = combate ainda não começou). */
  turnTokenId: string | null
  gridCols: number
  gridRows: number
  /** Lado da célula em pixels — zoom do tabuleiro. */
  cellSize: number
  tokens: CombatToken[]
  /**
   * Células pintadas com o pincel: chave "x,y" → cor CSS (rgba com
   * opacidade). Ausente em combates antigos.
   */
  paint?: Record<string, string>
  notes: string
  createdAt: string
  updatedAt: string
}

/**
 * Imagem atrelada a fichas do grid.
 * `scope: 'creature'` vale para todas as fichas daquela criatura;
 * `scope: 'token'` vale só para uma ficha específica (sobrepõe a da criatura).
 */
export interface TokenImageRecord {
  id: string
  scope: 'creature' | 'token'
  ownerId: string
  blob: Blob
  mimeType: string
  updatedAt: string
}

/** Id determinístico: trocar a imagem de um dono é um simples `put`. */
export function tokenImageId(
  scope: TokenImageRecord['scope'],
  ownerId: string,
): string {
  return `token-image-${scope}-${ownerId}`
}
