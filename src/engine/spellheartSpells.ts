import type { ResolvedSpellcastingSource, Spell, SpellheartStats } from '@/types'
import { listSpells } from '@/engine/spellCatalog'
import { localizeSpellName } from '@/data/i18n/spellNamesPt'
import { normalizeSpellName } from './grantedSpells'

const RANK_SUFFIX = /\s*\(\d+\s*[ºo°]\s*posto\)\s*$/i

export interface SpellheartSpellEntry {
  label: string
  spell: Spell | null
  kind: 'cantrip' | 'daily'
}

function splitSpellheartLabel(label: string): string[] {
  return label
    .split(/\s+ou\s+/i)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function findSpellByDisplayLabel(label: string): Spell | null {
  const key = normalizeSpellName(label.replace(RANK_SUFFIX, '').trim())
  if (!key) return null
  for (const spell of listSpells()) {
    const localized = localizeSpellName(spell.originalName)
    if (
      normalizeSpellName(spell.originalName) === key ||
      normalizeSpellName(spell.name) === key ||
      normalizeSpellName(localized) === key
    ) {
      return spell
    }
  }
  return null
}

export function listSpellheartSpellEntries(
  stats: SpellheartStats,
): SpellheartSpellEntry[] {
  const entries: SpellheartSpellEntry[] = []
  for (const part of splitSpellheartLabel(stats.cantrip)) {
    entries.push({
      label: part,
      spell: findSpellByDisplayLabel(part),
      kind: 'cantrip',
    })
  }
  for (const daily of stats.dailySpells ?? []) {
    const parts = splitSpellheartLabel(daily)
    for (const part of parts) {
      entries.push({
        label: part,
        spell: findSpellByDisplayLabel(part),
        kind: 'daily',
      })
    }
  }
  return entries
}

export function listSpellheartSpells(stats: SpellheartStats): Spell[] {
  const seen = new Set<string>()
  const spells: Spell[] = []
  for (const entry of listSpellheartSpellEntries(stats)) {
    if (!entry.spell || seen.has(entry.spell.id)) continue
    seen.add(entry.spell.id)
    spells.push(entry.spell)
  }
  return spells
}

function maxNullable(a: number | null | undefined, b: number | null | undefined) {
  if (a == null) return b ?? null
  if (b == null) return a
  return Math.max(a, b)
}

/** Ataque e CD: o maior entre a fonte do personagem e o valor do coração. */
export function resolveSpellheartCastStats(
  source: ResolvedSpellcastingSource | undefined,
  stats: SpellheartStats,
): {
  spellAttack: number | null
  spellDc: number | null
  usedSourceAttack: boolean
} {
  const itemAttack = stats.spellAttack ?? null
  const itemDc = stats.spellDc ?? null
  const sourceAttack = source?.spellAttack ?? null
  const sourceDc = source?.spellDc ?? null
  const spellAttack = maxNullable(sourceAttack, itemAttack)
  return {
    spellAttack,
    spellDc: maxNullable(sourceDc, itemDc),
    usedSourceAttack:
      spellAttack != null &&
      sourceAttack != null &&
      (itemAttack == null || sourceAttack >= itemAttack),
  }
}
