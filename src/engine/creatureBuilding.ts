/**
 * Tabelas de Construção de Criaturas (GM Core, cap. 2 / AoN Rules ID 2874).
 * Números de cima para baixo — não são a matemática de personagem.
 */

import type { AttributeId } from '@/types'
import type { Creature, CreatureAttack, CreatureSpellcasting } from '@/types/creature'

export type CreatureStatBand =
  | 'extreme'
  | 'high'
  | 'moderate'
  | 'low'
  | 'terrible'

export type CreatureRoadMapId =
  | 'brute'
  | 'magicalStriker'
  | 'skillParagon'
  | 'skirmisher'
  | 'sniper'
  | 'soldier'
  | 'spellcaster'

export const CREATURE_LEVELS: readonly number[] = Array.from(
  { length: 26 },
  (_, i) => i - 1,
)

export const STAT_BANDS: CreatureStatBand[] = [
  'extreme',
  'high',
  'moderate',
  'low',
  'terrible',
]

export const STAT_BAND_LABELS: Record<CreatureStatBand, string> = {
  extreme: 'Extremo',
  high: 'Alto',
  moderate: 'Moderado',
  low: 'Baixo',
  terrible: 'Terrível',
}

const MIN_LEVEL = -1
const MAX_LEVEL = 24

export function clampCreatureLevel(level: number): number {
  if (!Number.isFinite(level)) return 1
  return Math.min(MAX_LEVEL, Math.max(MIN_LEVEL, Math.trunc(level)))
}

function idx(level: number): number {
  return clampCreatureLevel(level) + 1
}

function pick<T>(rows: readonly T[], level: number): T {
  return rows[idx(level)] as T
}

/** Percepção e salvaguardas usam a mesma escala (tabelas 2–2 e 2–6). */
const CHECK: ReadonlyArray<
  readonly [number, number, number, number, number]
> = [
  [9, 8, 5, 2, 0],
  [10, 9, 6, 3, 1],
  [11, 10, 7, 4, 2],
  [12, 11, 8, 5, 3],
  [14, 12, 9, 6, 4],
  [15, 14, 11, 8, 6],
  [17, 15, 12, 9, 7],
  [18, 17, 14, 11, 8],
  [20, 18, 15, 12, 10],
  [21, 19, 16, 13, 11],
  [23, 21, 18, 15, 12],
  [24, 22, 19, 16, 14],
  [26, 24, 21, 18, 15],
  [27, 25, 22, 19, 16],
  [29, 26, 23, 20, 18],
  [30, 28, 25, 22, 19],
  [32, 29, 26, 23, 20],
  [33, 30, 28, 25, 22],
  [35, 32, 29, 26, 23],
  [36, 33, 30, 27, 24],
  [38, 35, 32, 29, 26],
  [39, 36, 33, 30, 27],
  [41, 38, 35, 32, 28],
  [43, 39, 36, 33, 30],
  [44, 40, 37, 34, 31],
  [46, 42, 38, 36, 32],
]

/** Tabela 2–1. Extremo inexistente em −1 e 0. Terrível de atributo = −5. */
const ATTR: ReadonlyArray<readonly [number | null, number, number, number]> = [
  [null, 3, 2, 0],
  [null, 3, 2, 0],
  [5, 4, 3, 1],
  [5, 4, 3, 1],
  [5, 4, 3, 1],
  [6, 5, 3, 2],
  [6, 5, 4, 2],
  [7, 5, 4, 2],
  [7, 6, 4, 2],
  [7, 6, 4, 3],
  [7, 6, 4, 3],
  [8, 7, 5, 3],
  [8, 7, 5, 3],
  [8, 7, 5, 4],
  [9, 8, 5, 4],
  [9, 8, 5, 4],
  [9, 8, 6, 4],
  [10, 9, 6, 5],
  [10, 9, 6, 5],
  [10, 9, 6, 5],
  [11, 10, 6, 5],
  [11, 10, 7, 6],
  [11, 10, 7, 6],
  [11, 10, 8, 6],
  [11, 10, 8, 6],
  [13, 12, 9, 7],
]

/** Tabela 2–3. Baixo é um intervalo; gravamos o teto (primeiro número do livro). */
const SKILL: ReadonlyArray<readonly [number, number, number, number, number]> = [
  [8, 5, 4, 2, 1],
  [9, 6, 5, 3, 2],
  [10, 7, 6, 4, 3],
  [11, 8, 7, 5, 4],
  [13, 10, 9, 7, 5],
  [15, 12, 10, 8, 7],
  [16, 13, 12, 10, 8],
  [18, 15, 13, 11, 9],
  [20, 17, 15, 13, 11],
  [21, 18, 16, 14, 12],
  [23, 20, 18, 16, 13],
  [25, 22, 19, 17, 15],
  [26, 23, 21, 19, 16],
  [28, 25, 22, 20, 17],
  [30, 27, 24, 22, 19],
  [31, 28, 25, 23, 20],
  [33, 30, 27, 25, 21],
  [35, 32, 28, 26, 23],
  [36, 33, 30, 28, 24],
  [38, 35, 31, 29, 25],
  [40, 37, 33, 31, 27],
  [41, 38, 34, 32, 28],
  [43, 40, 36, 34, 29],
  [45, 42, 37, 35, 31],
  [46, 43, 38, 36, 32],
  [48, 45, 40, 38, 33],
]

/** Tabela 2–5. Sem Terrível. */
const AC: ReadonlyArray<readonly [number, number, number, number]> = [
  [18, 15, 14, 12],
  [19, 16, 15, 13],
  [19, 16, 15, 13],
  [21, 18, 17, 15],
  [22, 19, 18, 16],
  [24, 21, 20, 18],
  [25, 22, 21, 19],
  [27, 24, 23, 21],
  [28, 25, 24, 22],
  [30, 27, 26, 24],
  [31, 28, 27, 25],
  [33, 30, 29, 27],
  [34, 31, 30, 28],
  [36, 33, 32, 30],
  [37, 34, 33, 31],
  [39, 36, 35, 33],
  [40, 37, 36, 34],
  [42, 39, 38, 36],
  [43, 40, 39, 37],
  [45, 42, 41, 39],
  [46, 43, 42, 40],
  [48, 45, 44, 42],
  [49, 46, 45, 43],
  [51, 48, 47, 45],
  [52, 49, 48, 46],
  [54, 51, 50, 48],
]

/** Tabela 2–7: [altoMáx, altoMín, modMáx, modMín, baixoMáx, baixoMín]. */
const HP: ReadonlyArray<
  readonly [number, number, number, number, number, number]
> = [
  [9, 9, 8, 7, 6, 5],
  [20, 17, 16, 14, 13, 11],
  [26, 24, 21, 19, 16, 14],
  [40, 36, 32, 28, 25, 21],
  [59, 53, 48, 42, 37, 31],
  [78, 72, 63, 57, 48, 42],
  [97, 91, 78, 72, 59, 53],
  [123, 115, 99, 91, 75, 67],
  [148, 140, 119, 111, 90, 82],
  [173, 165, 139, 131, 105, 97],
  [198, 190, 159, 151, 120, 112],
  [223, 215, 179, 171, 135, 127],
  [248, 240, 199, 191, 150, 142],
  [273, 265, 219, 211, 165, 157],
  [298, 290, 239, 231, 180, 172],
  [323, 315, 259, 251, 195, 187],
  [348, 340, 279, 271, 210, 202],
  [373, 365, 299, 291, 225, 217],
  [398, 390, 319, 311, 240, 232],
  [423, 415, 339, 331, 255, 247],
  [448, 440, 359, 351, 270, 262],
  [473, 465, 379, 371, 285, 277],
  [505, 495, 405, 395, 305, 295],
  [544, 532, 436, 424, 329, 317],
  [581, 569, 466, 454, 351, 339],
  [633, 617, 508, 492, 383, 367],
]

/** Tabela 2–8. */
const RESIST: ReadonlyArray<readonly [number, number]> = [
  [1, 1],
  [3, 1],
  [3, 2],
  [5, 2],
  [6, 3],
  [7, 4],
  [8, 4],
  [9, 5],
  [10, 5],
  [11, 6],
  [12, 6],
  [13, 7],
  [14, 7],
  [15, 8],
  [16, 8],
  [17, 9],
  [18, 9],
  [19, 9],
  [19, 10],
  [20, 10],
  [21, 11],
  [22, 11],
  [23, 12],
  [24, 12],
  [25, 13],
  [26, 13],
]

/** Tabela 2–9. */
const STRIKE: ReadonlyArray<readonly [number, number, number, number]> = [
  [10, 8, 6, 4],
  [10, 8, 6, 4],
  [11, 9, 7, 5],
  [13, 11, 9, 7],
  [14, 12, 10, 8],
  [16, 14, 12, 9],
  [17, 15, 13, 11],
  [19, 17, 15, 12],
  [20, 18, 16, 13],
  [22, 20, 18, 15],
  [23, 21, 19, 16],
  [25, 23, 21, 17],
  [27, 24, 22, 19],
  [28, 26, 24, 20],
  [29, 27, 25, 21],
  [31, 29, 27, 23],
  [32, 30, 28, 24],
  [34, 32, 30, 25],
  [35, 33, 31, 27],
  [37, 35, 33, 28],
  [38, 36, 34, 29],
  [40, 38, 36, 31],
  [41, 39, 37, 32],
  [43, 41, 39, 33],
  [44, 42, 40, 35],
  [46, 44, 42, 36],
]

export interface StrikeDamageRow {
  expr: string
  avg: number
}

/** Tabela 2–10. */
const DAMAGE: ReadonlyArray<
  readonly [StrikeDamageRow, StrikeDamageRow, StrikeDamageRow, StrikeDamageRow]
> = [
  [
    { expr: '1d6+1', avg: 4 },
    { expr: '1d4+1', avg: 3 },
    { expr: '1d4', avg: 3 },
    { expr: '1d4', avg: 2 },
  ],
  [
    { expr: '1d6+3', avg: 6 },
    { expr: '1d6+2', avg: 5 },
    { expr: '1d4+2', avg: 4 },
    { expr: '1d4+1', avg: 3 },
  ],
  [
    { expr: '1d8+4', avg: 8 },
    { expr: '1d6+3', avg: 6 },
    { expr: '1d6+2', avg: 5 },
    { expr: '1d4+2', avg: 4 },
  ],
  [
    { expr: '1d12+4', avg: 11 },
    { expr: '1d10+4', avg: 9 },
    { expr: '1d8+4', avg: 8 },
    { expr: '1d6+3', avg: 6 },
  ],
  [
    { expr: '1d12+8', avg: 15 },
    { expr: '1d10+6', avg: 12 },
    { expr: '1d8+6', avg: 10 },
    { expr: '1d6+5', avg: 8 },
  ],
  [
    { expr: '2d10+7', avg: 18 },
    { expr: '2d8+5', avg: 14 },
    { expr: '2d6+5', avg: 12 },
    { expr: '2d4+4', avg: 9 },
  ],
  [
    { expr: '2d12+7', avg: 20 },
    { expr: '2d8+7', avg: 16 },
    { expr: '2d6+6', avg: 13 },
    { expr: '2d4+6', avg: 11 },
  ],
  [
    { expr: '2d12+10', avg: 23 },
    { expr: '2d8+9', avg: 18 },
    { expr: '2d6+8', avg: 15 },
    { expr: '2d4+7', avg: 12 },
  ],
  [
    { expr: '2d12+12', avg: 25 },
    { expr: '2d10+9', avg: 20 },
    { expr: '2d8+8', avg: 17 },
    { expr: '2d6+6', avg: 13 },
  ],
  [
    { expr: '2d12+15', avg: 28 },
    { expr: '2d10+11', avg: 22 },
    { expr: '2d8+9', avg: 18 },
    { expr: '2d6+8', avg: 15 },
  ],
  [
    { expr: '2d12+17', avg: 30 },
    { expr: '2d10+13', avg: 24 },
    { expr: '2d8+11', avg: 20 },
    { expr: '2d6+9', avg: 16 },
  ],
  [
    { expr: '2d12+20', avg: 33 },
    { expr: '2d12+13', avg: 26 },
    { expr: '2d10+11', avg: 22 },
    { expr: '2d6+10', avg: 17 },
  ],
  [
    { expr: '2d12+22', avg: 35 },
    { expr: '2d12+15', avg: 28 },
    { expr: '2d10+12', avg: 23 },
    { expr: '2d8+10', avg: 19 },
  ],
  [
    { expr: '3d12+19', avg: 38 },
    { expr: '3d10+14', avg: 30 },
    { expr: '3d8+12', avg: 25 },
    { expr: '3d6+10', avg: 20 },
  ],
  [
    { expr: '3d12+21', avg: 40 },
    { expr: '3d10+16', avg: 32 },
    { expr: '3d8+14', avg: 27 },
    { expr: '3d6+11', avg: 21 },
  ],
  [
    { expr: '3d12+24', avg: 43 },
    { expr: '3d10+18', avg: 34 },
    { expr: '3d8+15', avg: 28 },
    { expr: '3d6+13', avg: 23 },
  ],
  [
    { expr: '3d12+26', avg: 45 },
    { expr: '3d12+17', avg: 36 },
    { expr: '3d10+14', avg: 30 },
    { expr: '3d6+14', avg: 24 },
  ],
  [
    { expr: '3d12+29', avg: 48 },
    { expr: '3d12+18', avg: 37 },
    { expr: '3d10+15', avg: 31 },
    { expr: '3d6+15', avg: 25 },
  ],
  [
    { expr: '3d12+31', avg: 50 },
    { expr: '3d12+19', avg: 38 },
    { expr: '3d10+16', avg: 32 },
    { expr: '3d6+16', avg: 26 },
  ],
  [
    { expr: '3d12+34', avg: 53 },
    { expr: '3d12+20', avg: 40 },
    { expr: '3d10+17', avg: 33 },
    { expr: '3d6+17', avg: 27 },
  ],
  [
    { expr: '4d12+29', avg: 55 },
    { expr: '4d10+20', avg: 42 },
    { expr: '4d8+17', avg: 35 },
    { expr: '4d6+14', avg: 28 },
  ],
  [
    { expr: '4d12+32', avg: 58 },
    { expr: '4d10+22', avg: 44 },
    { expr: '4d8+19', avg: 37 },
    { expr: '4d6+15', avg: 29 },
  ],
  [
    { expr: '4d12+34', avg: 60 },
    { expr: '4d10+24', avg: 46 },
    { expr: '4d8+20', avg: 38 },
    { expr: '4d6+17', avg: 31 },
  ],
  [
    { expr: '4d12+37', avg: 63 },
    { expr: '4d10+26', avg: 48 },
    { expr: '4d8+22', avg: 40 },
    { expr: '4d6+18', avg: 32 },
  ],
  [
    { expr: '4d12+39', avg: 65 },
    { expr: '4d12+24', avg: 50 },
    { expr: '4d10+20', avg: 42 },
    { expr: '4d6+19', avg: 33 },
  ],
  [
    { expr: '4d12+42', avg: 68 },
    { expr: '4d12+26', avg: 52 },
    { expr: '4d10+22', avg: 44 },
    { expr: '4d6+21', avg: 35 },
  ],
]

export interface SpellDcRow {
  dc: number
  attack: number
}

/** Tabela 2–11. Sem coluna Baixo. */
const SPELL: ReadonlyArray<readonly [SpellDcRow, SpellDcRow, SpellDcRow]> = [
  [
    { dc: 19, attack: 11 },
    { dc: 16, attack: 8 },
    { dc: 13, attack: 5 },
  ],
  [
    { dc: 19, attack: 11 },
    { dc: 16, attack: 8 },
    { dc: 13, attack: 5 },
  ],
  [
    { dc: 20, attack: 12 },
    { dc: 17, attack: 9 },
    { dc: 14, attack: 6 },
  ],
  [
    { dc: 22, attack: 14 },
    { dc: 18, attack: 10 },
    { dc: 15, attack: 7 },
  ],
  [
    { dc: 23, attack: 15 },
    { dc: 20, attack: 12 },
    { dc: 17, attack: 9 },
  ],
  [
    { dc: 25, attack: 17 },
    { dc: 21, attack: 13 },
    { dc: 18, attack: 10 },
  ],
  [
    { dc: 26, attack: 18 },
    { dc: 22, attack: 14 },
    { dc: 19, attack: 11 },
  ],
  [
    { dc: 27, attack: 19 },
    { dc: 24, attack: 16 },
    { dc: 21, attack: 13 },
  ],
  [
    { dc: 29, attack: 21 },
    { dc: 25, attack: 17 },
    { dc: 22, attack: 14 },
  ],
  [
    { dc: 30, attack: 22 },
    { dc: 26, attack: 18 },
    { dc: 23, attack: 15 },
  ],
  [
    { dc: 32, attack: 24 },
    { dc: 28, attack: 20 },
    { dc: 25, attack: 17 },
  ],
  [
    { dc: 33, attack: 25 },
    { dc: 29, attack: 21 },
    { dc: 26, attack: 18 },
  ],
  [
    { dc: 34, attack: 26 },
    { dc: 30, attack: 22 },
    { dc: 27, attack: 19 },
  ],
  [
    { dc: 36, attack: 28 },
    { dc: 32, attack: 24 },
    { dc: 29, attack: 21 },
  ],
  [
    { dc: 37, attack: 29 },
    { dc: 33, attack: 25 },
    { dc: 30, attack: 22 },
  ],
  [
    { dc: 39, attack: 31 },
    { dc: 34, attack: 26 },
    { dc: 31, attack: 23 },
  ],
  [
    { dc: 40, attack: 32 },
    { dc: 36, attack: 28 },
    { dc: 33, attack: 25 },
  ],
  [
    { dc: 41, attack: 33 },
    { dc: 37, attack: 29 },
    { dc: 34, attack: 26 },
  ],
  [
    { dc: 43, attack: 35 },
    { dc: 38, attack: 30 },
    { dc: 35, attack: 27 },
  ],
  [
    { dc: 44, attack: 36 },
    { dc: 40, attack: 32 },
    { dc: 37, attack: 29 },
  ],
  [
    { dc: 46, attack: 38 },
    { dc: 41, attack: 33 },
    { dc: 38, attack: 30 },
  ],
  [
    { dc: 47, attack: 39 },
    { dc: 42, attack: 34 },
    { dc: 39, attack: 31 },
  ],
  [
    { dc: 48, attack: 40 },
    { dc: 44, attack: 36 },
    { dc: 41, attack: 33 },
  ],
  [
    { dc: 50, attack: 42 },
    { dc: 45, attack: 37 },
    { dc: 42, attack: 34 },
  ],
  [
    { dc: 51, attack: 43 },
    { dc: 46, attack: 38 },
    { dc: 43, attack: 35 },
  ],
  [
    { dc: 52, attack: 44 },
    { dc: 48, attack: 40 },
    { dc: 45, attack: 37 },
  ],
]

export interface AreaDamageRow {
  expr: string
  avg: number
}

/** Tabela 2–12. Ilimitado = à vontade; limitado = 1–2 vezes. */
const AREA: ReadonlyArray<readonly [AreaDamageRow, AreaDamageRow]> = [
  [
    { expr: '1d4', avg: 2 },
    { expr: '1d6', avg: 4 },
  ],
  [
    { expr: '1d6', avg: 4 },
    { expr: '1d10', avg: 6 },
  ],
  [
    { expr: '2d4', avg: 5 },
    { expr: '2d6', avg: 7 },
  ],
  [
    { expr: '2d6', avg: 7 },
    { expr: '3d6', avg: 11 },
  ],
  [
    { expr: '2d8', avg: 9 },
    { expr: '4d6', avg: 14 },
  ],
  [
    { expr: '3d6', avg: 11 },
    { expr: '5d6', avg: 18 },
  ],
  [
    { expr: '2d10', avg: 12 },
    { expr: '6d6', avg: 21 },
  ],
  [
    { expr: '4d6', avg: 14 },
    { expr: '7d6', avg: 25 },
  ],
  [
    { expr: '4d6', avg: 15 },
    { expr: '8d6', avg: 28 },
  ],
  [
    { expr: '5d6', avg: 17 },
    { expr: '9d6', avg: 32 },
  ],
  [
    { expr: '5d6', avg: 18 },
    { expr: '10d6', avg: 35 },
  ],
  [
    { expr: '6d6', avg: 20 },
    { expr: '11d6', avg: 39 },
  ],
  [
    { expr: '6d6', avg: 21 },
    { expr: '12d6', avg: 42 },
  ],
  [
    { expr: '5d8', avg: 23 },
    { expr: '13d6', avg: 46 },
  ],
  [
    { expr: '7d6', avg: 24 },
    { expr: '14d6', avg: 49 },
  ],
  [
    { expr: '4d12', avg: 26 },
    { expr: '15d6', avg: 53 },
  ],
  [
    { expr: '6d8', avg: 27 },
    { expr: '16d6', avg: 56 },
  ],
  [
    { expr: '8d6', avg: 28 },
    { expr: '17d6', avg: 60 },
  ],
  [
    { expr: '8d6', avg: 29 },
    { expr: '18d6', avg: 63 },
  ],
  [
    { expr: '9d6', avg: 30 },
    { expr: '19d6', avg: 67 },
  ],
  [
    { expr: '7d8', avg: 32 },
    { expr: '20d6', avg: 70 },
  ],
  [
    { expr: '6d10', avg: 33 },
    { expr: '21d6', avg: 74 },
  ],
  [
    { expr: '10d6', avg: 35 },
    { expr: '22d6', avg: 77 },
  ],
  [
    { expr: '8d8', avg: 36 },
    { expr: '23d6', avg: 81 },
  ],
  [
    { expr: '11d6', avg: 38 },
    { expr: '24d6', avg: 84 },
  ],
  [
    { expr: '11d6', avg: 39 },
    { expr: '25d6', avg: 88 },
  ],
]

const BAND_INDEX: Record<Exclude<CreatureStatBand, 'terrible'>, 0 | 1 | 2 | 3> = {
  extreme: 0,
  high: 1,
  moderate: 2,
  low: 3,
}

export function attributeModifier(
  level: number,
  band: CreatureStatBand,
): number | null {
  if (band === 'terrible') return -5
  const row = pick(ATTR, level)
  return row[BAND_INDEX[band]]
}

export function perceptionBonus(
  level: number,
  band: CreatureStatBand,
): number {
  const row = pick(CHECK, level)
  if (band === 'terrible') return row[4]
  return row[BAND_INDEX[band]]
}

export function saveBonus(level: number, band: CreatureStatBand): number {
  return perceptionBonus(level, band)
}

export function skillBonus(level: number, band: CreatureStatBand): number {
  const row = pick(SKILL, level)
  if (band === 'terrible') return row[4]
  return row[BAND_INDEX[band]]
}

export function skillLowRange(
  level: number,
): { max: number; min: number } {
  const row = pick(SKILL, level)
  return { max: row[3], min: row[4] }
}

export function armorClass(level: number, band: CreatureStatBand): number | null {
  if (band === 'terrible') return null
  return pick(AC, level)[BAND_INDEX[band]]
}

export function hitPointsRange(
  level: number,
  band: Exclude<CreatureStatBand, 'extreme' | 'terrible'>,
): { max: number; min: number } {
  const row = pick(HP, level)
  if (band === 'high') return { max: row[0], min: row[1] }
  if (band === 'moderate') return { max: row[2], min: row[3] }
  return { max: row[4], min: row[5] }
}

export function hitPoints(level: number, band: CreatureStatBand): number | null {
  if (band === 'extreme' || band === 'terrible') return null
  return hitPointsRange(level, band).max
}

export function resistanceValue(
  level: number,
  end: 'max' | 'min' = 'max',
): number {
  const row = pick(RESIST, level)
  return end === 'max' ? row[0] : row[1]
}

export function strikeBonus(
  level: number,
  band: CreatureStatBand,
): number | null {
  if (band === 'terrible') return null
  return pick(STRIKE, level)[BAND_INDEX[band]]
}

export function strikeDamage(
  level: number,
  band: CreatureStatBand,
): StrikeDamageRow | null {
  if (band === 'terrible') return null
  return pick(DAMAGE, level)[BAND_INDEX[band]]
}

export function spellDc(
  level: number,
  band: CreatureStatBand,
): SpellDcRow | null {
  if (band === 'low' || band === 'terrible') return null
  const col = band === 'extreme' ? 0 : band === 'high' ? 1 : 2
  return pick(SPELL, level)[col]
}

export function areaDamage(
  level: number,
  use: 'unlimited' | 'limited',
): AreaDamageRow {
  return pick(AREA, level)[use === 'unlimited' ? 0 : 1]
}

/** Tabela 2–4. */
export function safeItemLevel(creatureLevel: number): number {
  const level = clampCreatureLevel(creatureLevel)
  if (level <= 3) return 0
  if (level <= 5) return 1
  if (level === 6) return 2
  if (level === 7) return 3
  if (level === 8) return 4
  if (level === 9) return 5
  if (level === 10) return 6
  if (level === 11) return 7
  if (level === 12) return 8
  if (level === 13) return 9
  if (level === 14) return 10
  if (level === 15) return 11
  if (level === 16) return 12
  if (level === 17) return 13
  if (level === 18) return 14
  if (level === 19) return 15
  if (level === 20) return 16
  if (level === 21) return 17
  if (level === 22) return 18
  if (level === 23) return 19
  return 20
}

export function typicalExtremeCount(level: number): { min: number; max: number } {
  const lv = clampCreatureLevel(level)
  if (lv >= 20) return { min: 3, max: 4 }
  if (lv >= 15) return { min: 2, max: 2 }
  if (lv >= 11) return { min: 1, max: 1 }
  return { min: 0, max: 1 }
}

/** Posto máximo típico de magia preparada/espontânea: metade do nível, para cima. */
export function typicalSpellRank(level: number): number {
  const lv = clampCreatureLevel(level)
  if (lv < 1) return 1
  return Math.ceil(lv / 2)
}

export function mapFromBonus(
  bonus: number,
  agile: boolean,
): [number, number] {
  const second = agile ? 4 : 5
  const third = agile ? 8 : 10
  return [bonus - second, bonus - third]
}

export function damageWithSuffix(existing: string, expr: string): string {
  const trimmed = existing.trim()
  const suffix = trimmed.replace(/^[\d]+d[\d]+(?:\s*[+-]\s*\d+)?/i, '').trim()
  return suffix ? `${expr} ${suffix}` : expr
}

function nearestBand(
  value: number,
  numbered: Array<{ band: CreatureStatBand; n: number }>,
): CreatureStatBand | 'custom' {
  let best: { band: CreatureStatBand; dist: number } | null = null
  for (const row of numbered) {
    const dist = Math.abs(row.n - value)
    if (!best || dist < best.dist) best = { band: row.band, dist }
  }
  if (!best || best.dist > 1) return 'custom'
  return best.band
}

export function classifyCheck(
  level: number,
  value: number,
): CreatureStatBand | 'custom' {
  return nearestBand(value, [
    { band: 'extreme', n: perceptionBonus(level, 'extreme') },
    { band: 'high', n: perceptionBonus(level, 'high') },
    { band: 'moderate', n: perceptionBonus(level, 'moderate') },
    { band: 'low', n: perceptionBonus(level, 'low') },
    { band: 'terrible', n: perceptionBonus(level, 'terrible') },
  ])
}

export function classifyArmorClass(
  level: number,
  value: number,
): CreatureStatBand | 'custom' {
  return nearestBand(value, [
    { band: 'extreme', n: armorClass(level, 'extreme') ?? 0 },
    { band: 'high', n: armorClass(level, 'high') ?? 0 },
    { band: 'moderate', n: armorClass(level, 'moderate') ?? 0 },
    { band: 'low', n: armorClass(level, 'low') ?? 0 },
  ])
}

export function classifyHitPoints(
  level: number,
  value: number,
): CreatureStatBand | 'custom' {
  for (const band of ['high', 'moderate', 'low'] as const) {
    const { min, max } = hitPointsRange(level, band)
    if (value >= min && value <= max) return band
  }
  return nearestBand(value, [
    { band: 'high', n: hitPointsRange(level, 'high').max },
    { band: 'moderate', n: hitPointsRange(level, 'moderate').max },
    { band: 'low', n: hitPointsRange(level, 'low').max },
  ])
}

export function classifyAttribute(
  level: number,
  value: number,
): CreatureStatBand | 'custom' {
  if (value <= -5) return 'terrible'
  const numbered: Array<{ band: CreatureStatBand; n: number }> = [
    { band: 'high', n: attributeModifier(level, 'high') ?? 0 },
    { band: 'moderate', n: attributeModifier(level, 'moderate') ?? 0 },
    { band: 'low', n: attributeModifier(level, 'low') ?? 0 },
  ]
  const extreme = attributeModifier(level, 'extreme')
  if (extreme != null) numbered.unshift({ band: 'extreme', n: extreme })
  return nearestBand(value, numbered)
}

export function classifyStrikeBonus(
  level: number,
  value: number,
): CreatureStatBand | 'custom' {
  return nearestBand(value, [
    { band: 'extreme', n: strikeBonus(level, 'extreme') ?? 0 },
    { band: 'high', n: strikeBonus(level, 'high') ?? 0 },
    { band: 'moderate', n: strikeBonus(level, 'moderate') ?? 0 },
    { band: 'low', n: strikeBonus(level, 'low') ?? 0 },
  ])
}

export function classifySpellDc(
  level: number,
  value: number,
): CreatureStatBand | 'custom' {
  return nearestBand(value, [
    { band: 'extreme', n: spellDc(level, 'extreme')?.dc ?? 0 },
    { band: 'high', n: spellDc(level, 'high')?.dc ?? 0 },
    { band: 'moderate', n: spellDc(level, 'moderate')?.dc ?? 0 },
  ])
}

export function classifySkill(
  level: number,
  value: number,
): CreatureStatBand | 'custom' {
  const low = skillLowRange(level)
  if (value >= low.min && value <= low.max) return 'low'
  return nearestBand(value, [
    { band: 'extreme', n: skillBonus(level, 'extreme') },
    { band: 'high', n: skillBonus(level, 'high') },
    { band: 'moderate', n: skillBonus(level, 'moderate') },
    { band: 'low', n: low.max },
  ])
}

export function bandLabelForValue(
  band: CreatureStatBand | 'custom',
): string {
  if (band === 'custom') return 'fora da tabela'
  return STAT_BAND_LABELS[band]
}

export interface CreatureRoadMap {
  id: CreatureRoadMapId
  name: string
  summary: string
  perception: CreatureStatBand
  ac: CreatureStatBand
  fortitude: CreatureStatBand
  reflex: CreatureStatBand
  will: CreatureStatBand
  hp: Exclude<CreatureStatBand, 'extreme' | 'terrible'>
  strikeBonus: CreatureStatBand
  strikeDamage: CreatureStatBand
  spellDc?: Exclude<CreatureStatBand, 'low' | 'terrible'>
  attributes: Partial<Record<AttributeId, CreatureStatBand>>
  landSpeed?: number
}

export const CREATURE_ROAD_MAPS: CreatureRoadMap[] = [
  {
    id: 'brute',
    name: 'Bruto',
    summary:
      'Ogro, troll, coisa grande: Percepção baixa, Força alta, CA média, muitos PV, golpe forte. Reflexos e Vontade fracos.',
    perception: 'low',
    ac: 'moderate',
    fortitude: 'high',
    reflex: 'low',
    will: 'low',
    hp: 'high',
    strikeBonus: 'high',
    strikeDamage: 'high',
    attributes: {
      strength: 'high',
      constitution: 'high',
      dexterity: 'low',
      intelligence: 'low',
      wisdom: 'low',
      charisma: 'low',
    },
  },
  {
    id: 'soldier',
    name: 'Soldado',
    summary:
      'Linha de frente: Força alta, CA alta (ou extrema), Fortitude alta, bônus e dano de Golpe altos. Pense em Golpe Reativo.',
    perception: 'moderate',
    ac: 'high',
    fortitude: 'high',
    reflex: 'moderate',
    will: 'moderate',
    hp: 'moderate',
    strikeBonus: 'high',
    strikeDamage: 'high',
    attributes: { strength: 'high', constitution: 'high' },
  },
  {
    id: 'skirmisher',
    name: 'Escaramuçador',
    summary:
      'Rápido: Destreza alta, Reflexos altos, Fortitude baixa, deslocamento acima de 7,5 m.',
    perception: 'moderate',
    ac: 'moderate',
    fortitude: 'low',
    reflex: 'high',
    will: 'moderate',
    hp: 'moderate',
    strikeBonus: 'high',
    strikeDamage: 'moderate',
    attributes: { dexterity: 'high', constitution: 'low' },
    landSpeed: 35,
  },
  {
    id: 'sniper',
    name: 'Atirador',
    summary:
      'Percepção e Destreza altas, PV médios ou baixos. Golpe à distância alto; corpo a corpo mais fraco.',
    perception: 'high',
    ac: 'moderate',
    fortitude: 'low',
    reflex: 'high',
    will: 'moderate',
    hp: 'moderate',
    strikeBonus: 'high',
    strikeDamage: 'high',
    attributes: { dexterity: 'high', wisdom: 'high', constitution: 'low' },
  },
  {
    id: 'spellcaster',
    name: 'Conjurador',
    summary:
      'CD de magia alta (extrema no 15+), PV baixos, Fortitude baixa, Vontade alta, Golpes fracos. Posto até metade do nível.',
    perception: 'moderate',
    ac: 'low',
    fortitude: 'low',
    reflex: 'moderate',
    will: 'high',
    hp: 'low',
    strikeBonus: 'low',
    strikeDamage: 'moderate',
    spellDc: 'high',
    attributes: { wisdom: 'high', intelligence: 'high', strength: 'low' },
  },
  {
    id: 'magicalStriker',
    name: 'Atacante mágico',
    summary:
      'Golpe alto + um pouco de magia (inata ou lista até metade do nível − 1). CD de magia moderada a alta.',
    perception: 'moderate',
    ac: 'moderate',
    fortitude: 'moderate',
    reflex: 'moderate',
    will: 'high',
    hp: 'moderate',
    strikeBonus: 'high',
    strikeDamage: 'high',
    spellDc: 'high',
    attributes: { charisma: 'high', strength: 'high' },
  },
  {
    id: 'skillParagon',
    name: 'Paragão de perícia',
    summary:
      'Atributo da melhor perícia alto ou extremo. Muitas perícias; ao menos uma habilidade que use perícia no combate.',
    perception: 'high',
    ac: 'moderate',
    fortitude: 'low',
    reflex: 'high',
    will: 'high',
    hp: 'moderate',
    strikeBonus: 'moderate',
    strikeDamage: 'moderate',
    attributes: { charisma: 'high', dexterity: 'high', constitution: 'low' },
  },
]

export function applyRoadMapToCreature(
  creature: Creature,
  roadMap: CreatureRoadMap,
): Creature {
  const level = clampCreatureLevel(creature.level)
  const attributes = { ...creature.attributes }
  for (const [key, band] of Object.entries(roadMap.attributes) as Array<
    [AttributeId, CreatureStatBand]
  >) {
    const n = attributeModifier(level, band)
    if (n != null) attributes[key] = n
  }

  const strike = strikeBonus(level, roadMap.strikeBonus) ?? creature.attacks[0]?.bonus ?? 0
  const dmg = strikeDamage(level, roadMap.strikeDamage)
    const attacks: CreatureAttack[] =
    creature.attacks.length === 0
      ? []
      : creature.attacks.map((attack, i) => {
          if (i > 0 && roadMap.id === 'sniper' && attack.kind === 'melee') {
            const lowBonus = strikeBonus(level, 'low') ?? attack.bonus
            const lowDmg = strikeDamage(level, 'low')
            return {
              ...attack,
              bonus: lowBonus,
              map: mapFromBonus(lowBonus, attack.traits.some((t) => t.toLowerCase() === 'agile')),
              damage: lowDmg
                ? damageWithSuffix(attack.damage, lowDmg.expr)
                : attack.damage,
            }
          }
          const kindBonus =
            roadMap.id === 'sniper' && attack.kind === 'ranged'
              ? strike
              : i === 0
                ? strike
                : attack.bonus
          const kindDmg =
            i === 0 && dmg
              ? damageWithSuffix(attack.damage, dmg.expr)
              : attack.damage
          return {
            ...attack,
            bonus: kindBonus,
            map: mapFromBonus(
              kindBonus,
              attack.traits.some((t) => t.toLowerCase() === 'agile'),
            ),
            damage: kindDmg,
          }
        })

  const spell = roadMap.spellDc ? spellDc(level, roadMap.spellDc) : null
  let spellcasting: CreatureSpellcasting | undefined = creature.spellcasting
  if (spell) {
    spellcasting = {
      tradition: creature.spellcasting?.tradition ?? 'arcane',
      dc: spell.dc,
      attack: spell.attack,
      kind: creature.spellcasting?.kind ?? (roadMap.id === 'spellcaster' ? 'prepared' : 'innate'),
      spells: creature.spellcasting?.spells ?? [],
    }
  }

  return {
    ...creature,
    perception: perceptionBonus(level, roadMap.perception),
    attributes,
    ac: armorClass(level, roadMap.ac) ?? creature.ac,
    fortitude: saveBonus(level, roadMap.fortitude),
    reflex: saveBonus(level, roadMap.reflex),
    will: saveBonus(level, roadMap.will),
    hp: hitPoints(level, roadMap.hp) ?? creature.hp,
    speeds: {
      ...creature.speeds,
      land: roadMap.landSpeed ?? creature.speeds.land ?? 25,
    },
    attacks,
    spellcasting,
  }
}

export const TYPE_TRAIT_HINTS: Record<string, string> = {
  Aberration: 'Em geral visão no escuro; idioma Aklo.',
  Animal: 'Sem idioma. Inteligência −4 (cão, golfinho) ou −5 (aranha, instinto).',
  Dragon: 'Visão no escuro, idioms Dracônico; sopro e auras combinam com o tema.',
  Undead: 'Imunidade a morte, doença, inconsciente, veneno; visão no escuro.',
  Construct: 'Imunidades de construto; muitas vezes sem Intelecto (−5) se mindless.',
  Fiend: 'Idiomas infernais/abissais; fraqueza a dano sagrado combina com o tema.',
  Celestial: 'Traço sagrado; muitas vezes deslocamento de voo.',
  Elemental: 'Imunidade ao elemento do qual é feito; idioma elemental.',
  Fey: 'Visão na penumbra; idioma Mítico (Fey).',
  Ooze: 'Sem reações na maioria; visão no escuro ou sem visão precisa.',
  Plant: 'Imunidade a efeitos que só afetam animais/humanoides, se fizer sentido.',
  Fungus: 'Parecido com planta; muitas vezes veneno ou esporos em área.',
  Giant: 'Tamanho Grande+; Força alta. Extremo de Força só se o tamanho permitir.',
  Humanoid: 'Itens fabricados: respeite o nível seguro da Tabela 2–4.',
  Mindless: 'Inteligência −5; imunidade a efeitos mentais.',
  Swarm: 'Imunidade a Golpe visado; fraqueza a área. Ações em massa.',
  Incorporeal: 'Resistência a dano físico (exceto força/fantasmal).',
  Amphibious: 'Deslocamento de natação + respirar ar e água.',
  Aquatic: 'Só água, salvo indicação.',
}

export function extremeStrengthAllowed(
  level: number,
  size: Creature['size'],
): boolean {
  const lv = clampCreatureLevel(level)
  if (lv <= 5) return size === 'large' || size === 'huge' || size === 'gargantuan'
  if (lv <= 9) return size === 'huge' || size === 'gargantuan'
  if (lv <= 15) return size === 'gargantuan'
  return false
}
