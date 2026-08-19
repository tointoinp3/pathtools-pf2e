import type { DerivedStat } from '@/types'

export interface HitPointsInput {
  level: number
  constitutionModifier: number
  ancestryHitPoints?: number | null
  ancestryHitPointsLabel?: string
  /** PV por nível da classe — ainda opcional */
  classHitPointsPerLevel?: number | null
  className?: string | null
}

/**
 * Fórmula oficial PF2e:
 * PV máx = PV da ancestralidade + (PV da classe + mod. Constituição) × nível
 *
 * Sem classe, calculamos a parte conhecida e marcamos como provisório.
 */
export function calculateHitPoints(input: HitPointsInput): DerivedStat {
  const {
    level,
    constitutionModifier,
    ancestryHitPoints,
    ancestryHitPointsLabel,
    classHitPointsPerLevel,
    className,
  } = input

  const breakdown: Array<{ label: string; value: number | string }> = []

  if (ancestryHitPoints == null) {
    return {
      key: 'hp',
      label: 'Pontos de Vida',
      value: null,
      pending: true,
      pendingReason:
        'Escolha uma ancestralidade para começar a calcular os PV. Em PF2e, a ancestralidade dá PV uma vez; a cada nível você soma PV da classe + Constituição.',
    }
  }

  breakdown.push({
    label: ancestryHitPointsLabel
      ? `Ancestralidade (${ancestryHitPointsLabel})`
      : 'Ancestralidade (uma vez)',
    value: ancestryHitPoints,
  })

  const conPerLevel = constitutionModifier
  const conTotal = conPerLevel * level
  breakdown.push({
    label: `Constituição ${conPerLevel >= 0 ? `+${conPerLevel}` : conPerLevel} × nível ${level}`,
    value: conTotal,
  })

  if (classHitPointsPerLevel == null) {
    const provisional = ancestryHitPoints + conTotal
    breakdown.push({
      label: 'Classe (por nível)',
      value: 'pendente',
    })
    return {
      key: 'hp',
      label: 'PV provisórios',
      value: provisional,
      pending: false,
      provisional: true,
      pendingReason: `Falta a classe. Fórmula completa: ${ancestryHitPoints} (ancestralidade) + (PV da classe + CON) × nível. Valor atual já inclui ancestralidade + CON × nível.`,
      breakdown,
    }
  }

  const classTotal = classHitPointsPerLevel * level
  breakdown.push({
    label: `${className ?? 'Classe'} ${classHitPointsPerLevel} × nível ${level}`,
    value: classTotal,
  })

  const total = ancestryHitPoints + classTotal + conTotal
  breakdown.push({ label: 'Total', value: total })

  return {
    key: 'hp',
    label: 'Pontos de Vida',
    value: total,
    pending: false,
    provisional: false,
    breakdown,
  }
}
