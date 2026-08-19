import type { ItemCategory, ItemDefinition } from '@/types/equipment'
import {
  ITEM_DEFINITIONS,
  catalogItemCount as officialCatalogCount,
  findItemByOriginalName as findOfficialByOriginalName,
  getItemDefinition as getOfficialItemDefinition,
  listItemDefinitions as listOfficialItemDefinitions,
  listItemDefinitionsByCategory as listOfficialByCategory,
  slotFromCategory,
  ITEM_BROWSER_TABS,
} from '@/data/seeds/equipment'
import { getHomebrewItems } from './equipmentRegistry'

function byPtName(a: ItemDefinition, b: ItemDefinition): number {
  return a.name.localeCompare(b.name, 'pt-BR')
}

export function listItemDefinitions(): ItemDefinition[] {
  return [...listOfficialItemDefinitions(), ...getHomebrewItems()].sort(byPtName)
}

export function getItemDefinition(
  id: string | null | undefined,
): ItemDefinition | null {
  if (!id) return null
  return (
    getHomebrewItems().find((item) => item.id === id) ??
    getOfficialItemDefinition(id)
  )
}

export function findItemByOriginalName(
  originalName: string | null | undefined,
): ItemDefinition | null {
  if (!originalName) return null
  const want = originalName.trim().toLowerCase()
  return (
    getHomebrewItems().find(
      (item) => item.originalName.toLowerCase() === want,
    ) ?? findOfficialByOriginalName(originalName)
  )
}

function normalizeItemKey(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()[\],]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

/** Qualidade / estado — no AoN “shoddy breastplate” aponta para Breastplate. */
const ITEM_QUALITY_RE =
  /\b(?:shoddy|broken|standard|tosco|tosca|quebrado|quebrada)\b/gi

function stripQualityWords(value: string): string {
  return value.replace(ITEM_QUALITY_RE, ' ').replace(/\s+/g, ' ').trim()
}

function isModifierNote(inner: string): boolean {
  const key = normalizeItemKey(inner)
  if (!key) return true
  if (/^\d+/.test(key)) return true
  if (/^(hardness|solidez|hp|pv|bt)\b/.test(key)) return true
  if (
    /^(shoddy|broken|standard|tosco|tosca|quebrado|quebrada)$/.test(key)
  ) {
    return true
  }
  return false
}

/**
 * Nomes da ficha de criatura (AoN): quantidade, qualidade e alias entre
 * parênteses. “Breastplate (Shoddy)” e “Baton (Light Mace)” viram o item-base.
 */
export function itemLookupCandidates(query: string): string[] {
  const primary: string[] = []
  const aliases: string[] = []
  const seen = new Set<string>()

  const push = (list: string[], value: string) => {
    const trimmed = value.replace(/\s+/g, ' ').trim()
    if (!trimmed) return
    const key = normalizeItemKey(trimmed)
    if (!key || seen.has(key)) return
    seen.add(key)
    list.push(trimmed)
  }

  let current = query.trim()
  push(primary, current)

  for (let i = 0; i < 5 && current; i += 1) {
    const match = current.match(/^(.*?)\s*\(([^)]+)\)\s*$/u)
    if (!match) break
    const outer = match[1].trim()
    const inner = match[2].trim()
    push(primary, outer)
    if (!isModifierNote(inner)) push(aliases, inner)
    current = outer
  }

  for (const candidate of [...primary]) {
    push(primary, stripQualityWords(candidate))
  }
  for (const candidate of [...aliases]) {
    push(aliases, stripQualityWords(candidate))
  }

  return [...primary, ...aliases]
}

function matchCatalogKey(
  list: ItemDefinition[],
  want: string,
): ItemDefinition | null {
  if (!want) return null
  const exact = list.find(
    (item) =>
      normalizeItemKey(item.name) === want ||
      normalizeItemKey(item.originalName) === want,
  )
  if (exact) return exact
  const singular = want.endsWith('s') ? want.slice(0, -1) : want
  if (singular === want || singular.length < 3) return null
  return (
    list.find(
      (item) =>
        normalizeItemKey(item.name) === singular ||
        normalizeItemKey(item.originalName) === singular,
    ) ?? null
  )
}

/** Nome mais longo do catálogo que cabe no começo ou no fim do texto. */
function matchCatalogAffix(
  list: ItemDefinition[],
  query: string,
): ItemDefinition | null {
  const want = normalizeItemKey(query)
  if (!want) return null
  let best: ItemDefinition | null = null
  let bestLen = 0
  for (const item of list) {
    for (const label of [item.name, item.originalName]) {
      const key = normalizeItemKey(label)
      if (key.length < 4) continue
      const hit =
        want === key ||
        want.startsWith(`${key} `) ||
        want.endsWith(` ${key}`)
      if (hit && key.length > bestLen) {
        best = item
        bestLen = key.length
      }
    }
  }
  return best
}

/**
 * Nome na ficha (pt ou original): quantidade, qualidade (tosco/shoddy) e
 * alias entre parênteses não mudam o item do catálogo.
 */
export function findCatalogItem(
  query: string | null | undefined,
): ItemDefinition | null {
  if (!query) return null
  const list = listItemDefinitions()
  for (const candidate of itemLookupCandidates(query)) {
    const hit = matchCatalogKey(list, normalizeItemKey(candidate))
    if (hit) return hit
  }
  let outer = query.trim()
  for (let i = 0; i < 5; i += 1) {
    const next = outer.replace(/\s*\([^)]+\)\s*$/u, '').trim()
    if (next === outer) break
    outer = next
  }
  return matchCatalogAffix(list, stripQualityWords(outer))
}

export function listItemDefinitionsByCategory(
  category: ItemCategory,
): ItemDefinition[] {
  return listItemDefinitions().filter((item) => item.category === category)
}

export function catalogItemCount(): number {
  return officialCatalogCount() + getHomebrewItems().length
}

export { slotFromCategory, ITEM_BROWSER_TABS, ITEM_DEFINITIONS }
export { listOfficialItemDefinitions, listOfficialByCategory }
