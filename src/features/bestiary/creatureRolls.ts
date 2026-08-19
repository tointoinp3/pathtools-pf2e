import { parseDamageExpression } from '@/utils/dice'
import { useDiceStore } from '@/stores/diceStore'
import { formatModifier } from '@/utils/labels'

export function rollCreatureCheck(
  creatureName: string,
  statLabel: string,
  modifier: number,
) {
  useDiceStore
    .getState()
    .rollCheck(`${statLabel} · ${creatureName}`, modifier)
}

export function rollCreatureDamage(
  creatureName: string,
  label: string,
  formula: string,
) {
  const parsed = parseDamageExpression(formula)
  if (!parsed) return
  useDiceStore
    .getState()
    .rollFree(
      parsed.sides,
      parsed.count,
      parsed.modifier,
      `${label} · ${creatureName}`,
    )
}

export function formatDamageHint(formula: string): string {
  const parsed = parseDamageExpression(formula)
  if (!parsed) return formula
  const bonus = parsed.modifier === 0 ? '' : formatModifier(parsed.modifier)
  return `${parsed.count}d${parsed.sides}${bonus}`
}
