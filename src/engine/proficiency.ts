import type { ProficiencyRank } from '@/types'

/**
 * Bônus de proficiência padrão do Pathfinder 2e Remaster.
 * Destreinado: +0
 * Treinado: nível + 2
 * Especialista: nível + 4
 * Mestre: nível + 6
 * Lendário: nível + 8
 */
export function calculateProficiencyBonus(
  rank: ProficiencyRank,
  level: number,
  options?: { withoutLevel?: boolean },
): number {
  if (options?.withoutLevel) {
    switch (rank) {
      case 'untrained':
        return -2
      case 'trained':
        return 2
      case 'expert':
        return 4
      case 'master':
        return 6
      case 'legendary':
        return 8
      default: {
        const _exhaustive: never = rank
        return _exhaustive
      }
    }
  }
  switch (rank) {
    case 'untrained':
      return 0
    case 'trained':
      return level + 2
    case 'expert':
      return level + 4
    case 'master':
      return level + 6
    case 'legendary':
      return level + 8
    default: {
      const _exhaustive: never = rank
      return _exhaustive
    }
  }
}

/** War of Immortals: proficiência mítica = nível + 10. Só quando a habilidade pede. */
export function calculateMythicProficiencyBonus(level: number): number {
  return Math.max(1, Math.min(20, level)) + 10
}

export function proficiencyRankValue(rank: ProficiencyRank): number {
  switch (rank) {
    case 'untrained':
      return 0
    case 'trained':
      return 1
    case 'expert':
      return 2
    case 'master':
      return 3
    case 'legendary':
      return 4
    default: {
      const _exhaustive: never = rank
      return _exhaustive
    }
  }
}

export function maxProficiencyRank(
  a: ProficiencyRank,
  b: ProficiencyRank,
): ProficiencyRank {
  return proficiencyRankValue(a) >= proficiencyRankValue(b) ? a : b
}

/** Próximo grau (null se já lendário) */
export function nextProficiencyRank(
  rank: ProficiencyRank,
): ProficiencyRank | null {
  switch (rank) {
    case 'untrained':
      return 'trained'
    case 'trained':
      return 'expert'
    case 'expert':
      return 'master'
    case 'master':
      return 'legendary'
    case 'legendary':
      return null
    default: {
      const _exhaustive: never = rank
      return _exhaustive
    }
  }
}

/**
 * Pode usar um aumento de perícia neste nível para subir `from` → próximo?
 * (Player Core: master a partir do nv. 7, legendary a partir do nv. 15)
 */
export function canIncreaseSkillRank(
  from: ProficiencyRank,
  atLevel: number,
): boolean {
  const next = nextProficiencyRank(from)
  if (!next) return false
  if (next === 'master' && atLevel < 7) return false
  if (next === 'legendary' && atLevel < 15) return false
  return true
}

/** Motivo legível quando o aumento está bloqueado pelo nível */
export function skillIncreaseBlockReason(
  from: ProficiencyRank,
  atLevel: number,
): string | null {
  const next = nextProficiencyRank(from)
  if (!next) return 'Já está lendário'
  if (next === 'master' && atLevel < 7) {
    return 'Mestre só a partir do nv. 7'
  }
  if (next === 'legendary' && atLevel < 15) {
    return 'Lendário só a partir do nv. 15'
  }
  return null
}
