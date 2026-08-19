import { formatModifier } from './labels'

export type DiceSides = 4 | 6 | 8 | 10 | 12 | 20 | 100

export interface CheckRollResult {
  label: string
  natural: number
  modifier: number
  total: number
  formula: string
  breakdownLines: string[]
  isNat20: boolean
  isNat1: boolean
}

export interface FreeDiceRollResult {
  label: string
  sides: DiceSides
  count: number
  rolls: number[]
  modifier: number
  total: number
  formula: string
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function rollDie(sides: DiceSides): number {
  return randomInt(1, sides)
}

export function rollDice(count: number, sides: DiceSides): number[] {
  return Array.from({ length: Math.max(1, count) }, () => rollDie(sides))
}

const DIE_SIDES: DiceSides[] = [4, 6, 8, 10, 12, 20, 100]

/** Lê "2d8", "1d6" etc. Ignora bônus (+4) — isso vai no modificador. */
export function parseDiceFormula(
  raw: string | null | undefined,
): { count: number; sides: DiceSides } | null {
  if (!raw) return null
  const match = raw.trim().toLowerCase().replace(/\s+/g, '').match(/^(\d+)d(\d+)$/)
  if (!match) return null
  const count = Number(match[1])
  const sides = Number(match[2]) as DiceSides
  if (!DIE_SIDES.includes(sides) || count < 1) return null
  return { count, sides }
}

/**
 * Lê dano de ficha: "1d6", "1d6+2", "1d10+7 perfurante".
 * O texto depois do dado (tipo de dano) é ignorado.
 */
export function parseDamageExpression(
  raw: string | null | undefined,
): { count: number; sides: DiceSides; modifier: number } | null {
  if (!raw) return null
  const match = raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .match(/^(\d+)d(\d+)([+-]\d+)?/)
  if (!match) return null
  const count = Number(match[1])
  const sides = Number(match[2]) as DiceSides
  if (!DIE_SIDES.includes(sides) || count < 1) return null
  return {
    count,
    sides,
    modifier: match[3] ? Number(match[3]) : 0,
  }
}

/** Encontra expressões de dado no texto de habilidade / magia. */
export function findDamageExpressions(text: string): Array<{
  raw: string
  count: number
  sides: DiceSides
  modifier: number
}> {
  const found: Array<{
    raw: string
    count: number
    sides: DiceSides
    modifier: number
  }> = []
  const seen = new Set<string>()
  const re = /(\d+)d(\d+)(?:\s*[+-]\s*\d+)?/gi
  for (const match of text.matchAll(re)) {
    const raw = match[0] ?? ''
    const parsed = parseDamageExpression(raw)
    if (!parsed) continue
    const key = raw.replace(/\s+/g, '').toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    found.push({ raw, ...parsed })
  }
  return found
}

/** Teste PF2e padrão: 1d20 + modificador (já calculado pela ficha). */
export function rollCheck(
  label: string,
  modifier: number,
  breakdown?: Array<{ label: string; value: number }>,
): CheckRollResult {
  const natural = rollDie(20)
  const total = natural + modifier
  const modText = formatModifier(modifier)
  const breakdownLines = [
    `d20: ${natural}`,
    ...(breakdown ?? []).map((b) => `${b.label}: ${formatModifier(b.value)}`),
    `Total: ${formatModifier(total)}`,
  ]

  return {
    label,
    natural,
    modifier,
    total,
    formula: `1d20 ${modText}`,
    breakdownLines,
    isNat20: natural === 20,
    isNat1: natural === 1,
  }
}

export function rollFreeDice(
  sides: DiceSides,
  count = 1,
  modifier = 0,
  label?: string,
): FreeDiceRollResult {
  const rolls = rollDice(count, sides)
  const sum = rolls.reduce((a, b) => a + b, 0) + modifier
  const modText = modifier === 0 ? '' : formatModifier(modifier)
  const formula = `${count}d${sides}${modText}`

  return {
    label: label ?? formula,
    sides,
    count,
    rolls,
    modifier,
    total: sum,
    formula,
  }
}
