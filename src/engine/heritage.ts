import type { Ancestry, Heritage } from '@/types'

/** Herança versátil: qualquer ancestralidade (ancestryId nulo). */
export function isVersatileHeritage(
  heritage: Heritage | null | undefined,
): boolean {
  if (!heritage) return false
  return heritage.isVersatile === true || heritage.ancestryId == null
}

function ancestryHasRequiredTrait(
  ancestryTraits: string[],
  required: string,
): boolean {
  const aliases: Record<string, string[]> = {
    humanoide: ['humanoide', 'humanoid'],
    humanoid: ['humanoide', 'humanoid'],
  }
  const want = aliases[required.toLowerCase()] ?? [required.toLowerCase()]
  return ancestryTraits.some((t) => want.includes(t.toLowerCase()))
}

export function isHeritageCompatibleWithAncestry(
  heritage: Heritage,
  ancestryId: string,
  ancestryTraits: string[] = [],
): boolean {
  if (heritage.ancestryId === ancestryId) return true
  if (!isVersatileHeritage(heritage)) return false
  const required = heritage.requiredAncestryTraits
  if (!required?.length) return true
  return required.every((t) => ancestryHasRequiredTrait(ancestryTraits, t))
}

function matchesHeritageQuery(heritage: Heritage, query: string): boolean {
  if (!query) return true
  return (
    heritage.name.toLowerCase().includes(query) ||
    heritage.originalName.toLowerCase().includes(query) ||
    heritage.rulesSummary.toLowerCase().includes(query)
  )
}

function byNamePt(a: Heritage, b: Heritage): number {
  return a.name.localeCompare(b.name, 'pt-BR')
}

/**
 * Separa heranças da ancestralidade e versáteis.
 * A UI deve listar `specific` primeiro, depois `versatile`.
 */
export function partitionHeritagesForAncestry(
  heritages: Heritage[],
  ancestryId: string,
  search = '',
  ancestryTraits: string[] = [],
): { specific: Heritage[]; versatile: Heritage[] } {
  const q = search.trim().toLowerCase()
  const specific = heritages
    .filter((h) => h.ancestryId === ancestryId)
    .filter((h) => matchesHeritageQuery(h, q))
    .sort(byNamePt)
  const versatile = heritages
    .filter((h) => h.ancestryId !== ancestryId && isVersatileHeritage(h))
    .filter((h) =>
      isHeritageCompatibleWithAncestry(h, ancestryId, ancestryTraits),
    )
    .filter((h) => matchesHeritageQuery(h, q))
    .sort(byNamePt)
  return { specific, versatile }
}

export function extraAncestryIdsFromHeritage(
  heritage: Heritage | null | undefined,
): string[] {
  return heritage?.grantedAncestryIds ?? []
}

export function extraHeritageIdsFromHeritage(
  heritage: Heritage | null | undefined,
): string[] {
  return heritage?.grantedHeritageIds ?? []
}

/** Idiomas extras da Inteligência: ancestralidade + herança (ex.: Dracônico). */
export function additionalLanguageOptionsFor(
  ancestry: Ancestry,
  heritage?: Heritage | null,
): string[] {
  const automatic = new Set(ancestry.languages.automatic)
  const seen = new Set<string>()
  const out: string[] = []
  for (const lang of [
    ...ancestry.languages.additionalOptions,
    ...(heritage?.additionalLanguageOptions ?? []),
  ]) {
    if (automatic.has(lang) || seen.has(lang)) continue
    seen.add(lang)
    out.push(lang)
  }
  return out
}
