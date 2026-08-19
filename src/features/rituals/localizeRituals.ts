import type { Ritual } from '@/types'
import { listRituals } from '@/engine/ritualCatalog'
import {
  localizeInlineRitualNames,
  localizeRitualName,
} from '@/data/i18n/ritualNamesPt'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'

function polishRitualBody(value?: string): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return value
  return localizeInlineRitualNames(polishRulesText(value))
}

function polishOpt(value?: string): string | undefined {
  return typeof value === 'string' && value.trim()
    ? polishRulesText(value)
    : value
}

/** Aplica nome, traços e corpo pt-BR na hora de exibir. O seed permanece canônico. */
export function withLocalizedRitual<T extends Ritual>(ritual: T): T {
  const localized = localizeRitualName(ritual.originalName)
  const name =
    localized !== ritual.originalName ? localized : ritual.name
  const traits = ritual.traits?.map(localizeTraitLabel) ?? ritual.traits
  return {
    ...ritual,
    name,
    traits,
    description: polishRitualBody(ritual.description) ?? ritual.description,
    summary: polishRitualBody(ritual.summary),
    cost: polishOpt(ritual.cost),
    target: polishOpt(ritual.target),
    secondaryCasters: polishOpt(ritual.secondaryCasters),
    secondaryChecks: polishOpt(ritual.secondaryChecks),
    duration: polishOpt(ritual.duration),
    range: polishOpt(ritual.range),
    castTime: polishOpt(ritual.castTime),
  }
}

/** Catálogo Remaster + homebrew, já traduzido e ordenado. */
export function listLocalizedCatalogRituals(): Ritual[] {
  const seen = new Set<string>()
  const out: Ritual[] = []
  for (const raw of listRituals()) {
    if (seen.has(raw.id)) continue
    seen.add(raw.id)
    out.push(withLocalizedRitual(raw))
  }
  return out.sort(
    (a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'pt'),
  )
}
