import type { Spell, SpellRank } from '@/types'

export type SpellKind = 'cantrip' | 'spell' | 'focus'

export const SPELL_RANKS: SpellRank[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const SPELL_KIND_TABS: Array<{ id: SpellKind | 'all'; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'cantrip', label: 'Truques' },
  { id: 'spell', label: 'Magias' },
  { id: 'focus', label: 'Foco' },
]

export const SPELL_RANK_FILTER_OPTIONS = SPELL_RANKS.map((rank) => ({
  value: String(rank),
  label: rank === 0 ? 'Truques' : String(rank),
}))

export const SPELL_ACTION_FILTER_OPTIONS = [
  { value: 'one', label: '1 ação' },
  { value: 'two', label: '2 ações' },
  { value: 'three', label: '3 ações' },
  { value: 'free', label: 'Livre' },
  { value: 'reaction', label: 'Reação' },
] as const

export function spellKind(spell: Spell): SpellKind {
  if (spell.focus) return 'focus'
  if (spell.rank === 0) return 'cantrip'
  return 'spell'
}

export function spellKindLabel(kind: SpellKind): string {
  if (kind === 'cantrip') return 'Truque'
  if (kind === 'focus') return 'Foco'
  return 'Magia'
}

export function spellRankLabel(rank: number): string {
  return rank === 0 ? 'Truque' : `Posto ${rank}`
}

export function spellMatchesQuery(spell: Spell, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    spell.name.toLowerCase().includes(q) ||
    spell.originalName.toLowerCase().includes(q) ||
    (spell.summary ?? '').toLowerCase().includes(q) ||
    (spell.description ?? '').toLowerCase().includes(q) ||
    spell.traits.some((t) => t.toLowerCase().includes(q))
  )
}
