import type { Rarity } from './core'
import type { CreaturePowerVariant } from './creature'

/**
 * Importância do combate (GM Core — Building Encounters).
 * Inclui trivial, que o tesouro de encontro do saque não usa.
 */
export type CombatThreat = 'trivial' | 'low' | 'moderate' | 'severe' | 'extreme'

/** Chefe = poucos fortes. Equilíbrio = forte(s) + tropa. Horda = muitos médios/fracos. */
export type EncounterShape = 'boss' | 'balanced' | 'horde'

/** Uma ficha (ou várias iguais) no encontro sorteado. */
export interface EncounterLine {
  id: string
  creatureId: string
  name: string
  originalName: string
  quantity: number
  /** Nível impresso na ficha, antes de Elite / Fraca. */
  baseLevel: number
  variant: CreaturePowerVariant
  /** Nível efetivo (Elite +1 / Fraca −1, com os saltos do Monster Core). */
  level: number
  xpEach: number
  rarity: Rarity
  themeKey?: string
  themeLabel?: string
}

/** Encontro salvo neste dispositivo, no molde do saque. */
export interface EncounterPlan {
  id: string
  name: string
  partyLevel: number
  partySize: number
  threat: CombatThreat
  /**
   * Chefe: poucos inimigos fortes. Equilíbrio (padrão): um ou dois
   * fortes e tropa mais fraca. Horda: muitos médios/fracos, com
   * quantidade sorteada (ex.: 2× monitor + 1× infernal).
   * Encontros antigos sem o campo são lidos como equilíbrio.
   */
  shape?: EncounterShape
  /**
   * Se true, o sorteio puxa fichas da mesma família (vários goblins)
   * em vez de misturar tipos (goblin + drake).
   */
  prioritizeSameType: boolean
  rarities: Rarity[]
  /**
   * Traços que entram no sorteio. `null`/omitido = todos (padrão).
   * `[]` = nenhum. Lista = a criatura precisa ter ao menos um deles.
   */
  traits?: string[] | null
  includeHomebrew: boolean
  includeUnique: boolean
  /** Família/tema escolhido no último sorteio com “mesmo tipo”. */
  themeKey: string | null
  themeLabel: string | null
  lines: EncounterLine[]
  notes: string
  createdAt: string
  updatedAt: string
}
