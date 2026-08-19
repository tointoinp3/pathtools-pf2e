import type { CreatureSpell } from '@/types/creature'
import type { Ritual } from '@/types/ritual'
import type { Spell } from '@/types/spell'
import { findSpellByDisplayLabel } from './spellheartSpells'
import { getSpellById } from './spellCatalog'
import { getRitualById, listRituals } from './ritualCatalog'
import { normalizeSpellName } from './grantedSpells'

export interface ResolvedCreatureSpell {
  entry: CreatureSpell
  spell: Spell | null
  ritual: Ritual | null
  note: string | null
}

const INNATE_NOTE_PT: Record<string, string> = {
  'at will': 'à vontade',
  constant: 'constante',
  'self only': 'somente em si',
  'visual only': 'só visual',
  'gourds only': 'só cabaças',
  'fungi only': 'só fungos',
  'trees only': 'só árvores',
  'arthropods only': 'só artrópodes',
  'see tree meld': 'ver Fusão com a Árvore',
}

function localizeInnateNote(note: string): string {
  return note
    .split(',')
    .map((part) => {
      const key = part.trim().toLowerCase()
      return INNATE_NOTE_PT[key] ?? part.trim()
    })
    .join(', ')
}

function splitCatalogName(originalName: string): { catalogName: string; note: string | null } {
  const match = originalName.match(/^(.*?)\s*\((.*)\)\s*$/)
  if (!match) return { catalogName: originalName.trim(), note: null }
  const catalogName = match[1]?.trim() ?? originalName.trim()
  const rawNote = match[2]?.trim()
  return {
    catalogName,
    note: rawNote ? localizeInnateNote(rawNote) : null,
  }
}

function findRitualByName(name: string): Ritual | null {
  const key = normalizeSpellName(name)
  if (!key) return null
  return (
    listRituals().find(
      (ritual) =>
        normalizeSpellName(ritual.originalName) === key ||
        normalizeSpellName(ritual.name) === key,
    ) ?? null
  )
}

/** Liga a magia da ficha ao texto Remaster do catálogo (magia ou ritual). */
export function resolveCreatureSpell(entry: CreatureSpell): ResolvedCreatureSpell {
  const { catalogName, note } = splitCatalogName(entry.originalName)
  const spell =
    getSpellById(`spell-${entry.id}`) ??
    getSpellById(entry.id) ??
    findSpellByDisplayLabel(catalogName) ??
    findSpellByDisplayLabel(entry.name.replace(/\s*\([^)]*\)\s*$/, '').trim())

  const ritual = spell
    ? null
    : (getRitualById(`ritual-${entry.id}`) ??
      getRitualById(entry.id) ??
      findRitualByName(catalogName))

  return { entry, spell, ritual, note }
}

/** Rótulo de seção na ficha: Truques, 1º posto, 2º posto… */
export function creatureSpellRankGroupLabel(rank: number): string {
  return rank <= 0 ? 'Truques' : `${rank}º posto`
}

export function groupCreatureSpellsByRank(
  spells: CreatureSpell[],
): Array<{ rank: number; label: string; spells: CreatureSpell[] }> {
  const byRank = new Map<number, CreatureSpell[]>()
  for (const spell of spells) {
    const rank = Number.isFinite(spell.rank) ? spell.rank : 0
    const list = byRank.get(rank) ?? []
    list.push(spell)
    byRank.set(rank, list)
  }
  return [...byRank.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([rank, group]) => ({
      rank,
      label: creatureSpellRankGroupLabel(rank),
      spells: group,
    }))
}
