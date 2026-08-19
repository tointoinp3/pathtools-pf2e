import type { Spell } from '@/types'
import { listSpells } from '@/engine/spellCatalog'
import {
  localizeInlineSpellNames,
  localizeSpellName,
} from '@/data/i18n/spellNamesPt'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'

function polishSpellBody(value?: string): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return value
  return localizeInlineSpellNames(polishRulesText(value))
}

function polishOpt(value?: string): string | undefined {
  return typeof value === 'string' && value.trim()
    ? polishRulesText(value)
    : value
}

/** Aplica nome, traços e corpo pt-BR na hora de exibir. O seed permanece canônico. */
export function withLocalizedSpell<T extends Spell>(spell: T): T {
  const localized = localizeSpellName(spell.originalName)
  const name =
    localized !== spell.originalName ? localized : spell.name
  const traits = spell.traits?.map(localizeTraitLabel) ?? spell.traits
  return {
    ...spell,
    name,
    traits,
    description: polishSpellBody(spell.description) ?? spell.description,
    summary: polishSpellBody(spell.summary),
    trigger: polishOpt(spell.trigger),
    requirements: polishOpt(spell.requirements),
    targets: polishOpt(spell.targets),
    duration: polishOpt(spell.duration),
    defense: polishOpt(spell.defense),
    range: polishOpt(spell.range),
    area: polishOpt(spell.area),
  }
}

/** Catálogo Remaster sem ids duplicados, já traduzido e ordenado. */
export function listLocalizedCatalogSpells(): Spell[] {
  const seen = new Set<string>()
  const out: Spell[] = []
  for (const raw of listSpells()) {
    if (seen.has(raw.id)) continue
    seen.add(raw.id)
    out.push(withLocalizedSpell(raw))
  }
  return out.sort(
    (a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'pt'),
  )
}
