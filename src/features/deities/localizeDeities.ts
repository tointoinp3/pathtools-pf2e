import type { Deity, DivineDomain } from '@/types/deity'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import {
  localizeDeityCategory,
  localizeDeityEpithet,
  localizeDeityWeapon,
  localizeDomainName,
} from '@/data/i18n/deityLabelsPt'
import { localizeSpellName } from '@/data/i18n/spellNamesPt'

export {
  localizeDeityCategory,
  localizeDeityEpithet,
  localizeDeityWeapon,
  localizeDomainName,
} from '@/data/i18n/deityLabelsPt'

export const DEITY_KIND_LABELS = {
  deity: 'Divindade',
  pantheon: 'Panteão',
  philosophy: 'Filosofia',
  covenant: 'Pacto',
} as const

function polishLine(text: string): string {
  return polishRulesText(text)
}

export function withLocalizedDeity<T extends Deity>(deity: T): T {
  return {
    ...deity,
    epithet: deity.epithet ? localizeDeityEpithet(deity.epithet) : deity.epithet,
    summary: polishLine(deity.summary),
    areasOfConcern: deity.areasOfConcern.map(polishLine),
    edicts: deity.edicts.map(polishLine),
    anathema: deity.anathema.map(polishLine),
  }
}

export function withLocalizedDomain<T extends DivineDomain>(domain: T): T {
  const name = localizeDomainName(domain.originalName)
  const initial = localizeSpellName(domain.initialSpell)
  const advanced = domain.advancedSpell
    ? localizeSpellName(domain.advancedSpell)
    : undefined
  const summary = advanced
    ? `Domínio de ${name}. Magia inicial: ${initial}. Magia avançada: ${advanced}.`
    : `Domínio de ${name}. Magia inicial: ${initial}.`
  return { ...domain, name, summary }
}

export function deitySearchHaystack(deity: Deity): string {
  return [
    deity.name,
    deity.originalName,
    deity.epithet,
    deity.epithet ? localizeDeityEpithet(deity.epithet) : '',
    localizeDeityCategory(deity.category),
    deity.category,
    deity.summary,
    ...deity.areasOfConcern,
    ...deity.domains.map(localizeDomainName),
    ...deity.domains,
    ...deity.favoredWeapons.map(localizeDeityWeapon),
    ...deity.favoredWeapons,
    ...deity.clericSpells,
    ...deity.clericSpells.map(localizeSpellName),
    ...deity.pantheons,
    deity.skillId,
    deity.source,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}
