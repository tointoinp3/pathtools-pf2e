/** Penalidade de ataque múltiplo — Player Core Remaster. */

export const MAP_STEP_LABELS = ['1º', '2º', '3º'] as const

export interface MapProfile {
  agile: boolean
  /** Penalidade do 2º ataque (negativa). */
  second: number
  /** Penalidade do 3º ataque e seguintes (negativa). */
  third: number
}

export interface MapFlags {
  /** Feito Graça Ágil: ágil vira −3 / −6 em vez de −4 / −8. */
  agileGrace?: boolean
}

const AGILE_KEYS = ['agile', 'ágil', 'agil']

function traitKey(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function hasAgileTrait(traits: Iterable<string>): boolean {
  for (const trait of traits) {
    const key = traitKey(trait)
    if (AGILE_KEYS.some((name) => key === name || key.startsWith(`${name} `))) {
      return true
    }
  }
  return false
}

export function traitsForMap(weapon: {
  definition?: { traits?: string[] } | null
  runes?: { grantedTraits?: string[] } | null
}): string[] {
  return [
    ...(weapon.definition?.traits ?? []),
    ...(weapon.runes?.grantedTraits ?? []),
  ]
}

/**
 * Padrão: −5 / −10.
 * Ágil: −4 / −8.
 * Graça Ágil (guerreiro): ágil −3 / −6.
 */
export function resolveMapProfile(
  traits: Iterable<string>,
  flags?: MapFlags,
): MapProfile {
  const agile = hasAgileTrait(traits)
  if (agile && flags?.agileGrace) {
    return { agile: true, second: -3, third: -6 }
  }
  if (agile) {
    return { agile: true, second: -4, third: -8 }
  }
  return { agile: false, second: -5, third: -10 }
}

export function mapPenaltyForStep(
  profile: MapProfile,
  stepIndex: number,
): number {
  if (stepIndex <= 0) return 0
  if (stepIndex === 1) return profile.second
  return profile.third
}

export function mapAttackBonus(
  base: number,
  profile: MapProfile,
  stepIndex: number,
): number {
  return base + mapPenaltyForStep(profile, stepIndex)
}

export function mapPenaltyBreakdownLabel(profile: MapProfile): string {
  if (profile.agile) return 'Ataque múltiplo (ágil)'
  return 'Ataque múltiplo'
}

export function mapFlagsFromSheet(sheet: {
  feats?: Array<{ featId?: string; id?: string; originalName?: string }>
}): MapFlags {
  const feats = sheet.feats ?? []
  return {
    agileGrace: feats.some(
      (feat) =>
        feat.featId === 'feat-fighter-agile-grace' ||
        feat.id === 'feat-fighter-agile-grace' ||
        feat.originalName === 'Agile Grace',
    ),
  }
}
