import type { ReactNode } from 'react'
import type { Spell, SpellheartStats, StaffStats } from '@/types'
import { getSpellById } from '@/engine/spellCatalog'
import {
  listSpellheartSpellEntries,
  type SpellheartSpellEntry,
} from '@/engine/spellheartSpells'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import { SpellRulesCard } from '@/features/spells/components/SpellRulesCard'

export function staffRankLabel(rank: number): string {
  return rank === 0 ? 'Truque' : `${rank}º posto`
}

export function StaffSpellCards({
  staff,
  actionsFor,
  toolbarFor,
}: {
  staff: StaffStats
  actionsFor?: (info: {
    spell: Spell | null
    rank: number
    label: string
  }) => ReactNode
  toolbarFor?: (info: {
    spell: Spell | null
    rank: number
    label: string
  }) => ReactNode
}) {
  return (
    <div className="space-y-2">
      {staff.spellsByRank.map((entry) => (
        <div key={entry.rank}>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            {staffRankLabel(entry.rank)}
            {entry.rank > 0 ? ` · ${entry.rank} carga(s)` : ' · sem carga'}
          </p>
          <ul className="space-y-1">
            {entry.spellIds.map((id, index) => {
              const spell = getSpellById(id)
              const fallback = entry.spellNames[index] ?? id
              const label = spell ? withLocalizedSpell(spell).name : fallback
              const info = { spell, rank: entry.rank, label }
              return (
                <li key={`${id}-${index}`}>
                  <SpellRulesCard
                    spell={spell}
                    originalName={spell?.originalName ?? fallback}
                    subtitle={
                      entry.rank === 0 ? 'Truque' : `${entry.rank} carga(s)`
                    }
                    actions={actionsFor?.(info)}
                    toolbar={toolbarFor?.(info)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function SpellheartSpellCards({
  stats,
  toolbarFor,
}: {
  stats: SpellheartStats
  toolbarFor?: (entry: SpellheartSpellEntry) => ReactNode
}) {
  const entries = listSpellheartSpellEntries(stats).filter(
    (entry) => !/^ver descrição\.?$/i.test(entry.label.trim()),
  )
  if (entries.length === 0) return null
  return (
    <ul className="space-y-1">
      {entries.map((entry, index) => (
        <li key={`${entry.label}-${index}`}>
          <SpellRulesCard
            spell={entry.spell}
            originalName={entry.spell?.originalName ?? entry.label}
            title={
              entry.spell ? withLocalizedSpell(entry.spell).name : entry.label
            }
            subtitle={entry.kind === 'cantrip' ? 'Truque' : '1/dia'}
            toolbar={toolbarFor?.(entry)}
          />
        </li>
      ))}
    </ul>
  )
}
