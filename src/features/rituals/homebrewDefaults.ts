import type { Ritual, RitualRank } from '@/types/ritual'
import { createId, nowIso } from '@/utils/id'

export function ritualKindFromQuery(value: string | null): boolean {
  if (!value) return false
  return value === '1' || value === 'ritual'
}

export function createEmptyHomebrewRitual(): Ritual {
  const now = nowIso()
  return {
    id: createId('ritual'),
    name: 'Novo ritual',
    originalName: '',
    rank: 1,
    traits: ['Ritual'],
    rarity: 'uncommon',
    provenance: { type: 'homebrew' },
    description: '',
    summary: '',
    castTime: '1 dia',
    cost: '',
    primaryCheck: 'Arcanismo (especialista)',
    primaryCheckSkills: ['arcana'],
    secondaryCasters: '',
    secondaryChecks: '',
    secondaryCheckSkills: [],
    duration: '',
    range: '',
    target: '',
    source: 'Homebrew',
    createdAt: now,
    updatedAt: now,
  }
}

export const RITUAL_RANKS: RitualRank[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function splitTraitList(value: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const part of value.split(/[,;]/)) {
    const trimmed = part.trim()
    if (!trimmed || seen.has(trimmed)) continue
    seen.add(trimmed)
    out.push(trimmed)
  }
  return out
}
