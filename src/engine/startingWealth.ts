import type { Character, EquipmentItem } from '@/types'
import { createInventoryItemFromDefinition } from './equipment'
import { findItemByOriginalName, listItemDefinitions } from './equipmentCatalog'
import {
  getClassKit,
  STARTING_WEALTH_CP,
  type ClassKitDefinition,
  type ClassKitItem,
} from '@/data/seeds/classKits'
import type { AdventuringKitDefinition } from '@/data/seeds/adventuringKits'
import { createId } from '@/utils/id'

export { STARTING_WEALTH_CP, getClassKit }
export type { ClassKitDefinition }

export interface KitMaterializeResult {
  items: EquipmentItem[]
  missingItems: string[]
}

function materializeEntries(
  entries: ClassKitItem[],
  note: string,
): KitMaterializeResult {
  const items: EquipmentItem[] = []
  const missingItems: string[] = []
  for (const entry of entries) {
    const def = findItemByOriginalName(entry.originalName)
    if (!def) {
      missingItems.push(entry.originalName)
      continue
    }
    const item = createInventoryItemFromDefinition(def, createId('eq'))
    if (entry.quantity != null && entry.quantity > 0) {
      item.quantity = entry.quantity
    }
    item.notes = note
    item.equipped = true
    items.push(item)
  }
  return { items, missingItems }
}

/** Itens do pacote rápido de classe, já equipados. */
export function materializeClassKitItems(
  kit: ClassKitDefinition,
): KitMaterializeResult {
  return materializeEntries(kit.items, kit.name)
}

/** Kit de aventura como um item do catálogo (pacote, curandeiro, ladrão…). */
export function materializeAdventuringKitItems(
  kit: AdventuringKitDefinition,
): KitMaterializeResult {
  const def = findItemByOriginalName(kit.originalName)
  if (!def) {
    return { items: [], missingItems: [kit.originalName] }
  }
  const item = createInventoryItemFromDefinition(def, createId('eq'))
  item.notes = kit.name
  item.equipped = true
  return { items: [item], missingItems: [] }
}

export interface StartingWealthResult {
  equipment: EquipmentItem[]
  coinsCp: number
  startingWealth: NonNullable<Character['startingWealth']>
  missingItems: string[]
}

export function formatCoinsCp(cp: number): string {
  const safe = Math.max(0, Math.floor(cp))
  const gp = Math.floor(safe / 100)
  const rem = safe % 100
  const sp = Math.floor(rem / 10)
  const copper = rem % 10
  const parts: string[] = []
  if (gp) parts.push(`${gp} po`)
  if (sp) parts.push(`${sp} pp`)
  if (copper) parts.push(`${copper} pc`)
  return parts.length ? parts.join(' ') : '0 po'
}

const LEFTOVER_CATEGORIES = new Set([
  'weapon',
  'armor',
  'shield',
  'adventuringGear',
  'ammunition',
  'consumable',
  'alchemical',
  'held',
])

/** Itens baratos do catálogo para gastar a sobra do kit (nível 0–1). */
export function leftoverPurchaseSuggestions(
  leftoverCp: number,
  alreadyOwnedIds: Set<string>,
  limit = 8,
) {
  if (leftoverCp <= 0) return []
  return listItemDefinitions()
    .filter((item) => {
      if (!LEFTOVER_CATEGORIES.has(item.category)) return false
      if (item.level > 1) return false
      if (item.priceCp == null || item.priceCp <= 0) return false
      if (item.priceCp > leftoverCp) return false
      if (alreadyOwnedIds.has(item.id)) return false
      return true
    })
    .sort((a, b) => (a.priceCp ?? 0) - (b.priceCp ?? 0) || a.name.localeCompare(b.name, 'pt-BR'))
    .slice(0, limit)
}

function addKitItems(kit: ClassKitDefinition): KitMaterializeResult {
  return materializeClassKitItems(kit)
}

/** Aplica 15 po ou o kit da classe. Não duplica se já houver escolha. */
export function applyStartingWealth(
  character: Pick<Character, 'equipment' | 'coinsCp' | 'startingWealth' | 'classId'>,
  kind: 'coins' | 'kit',
): StartingWealthResult | { error: string } {
  if (character.startingWealth) {
    return { error: 'A riqueza inicial já foi aplicada nesta ficha.' }
  }
  if (kind === 'coins') {
    return {
      equipment: [...(character.equipment ?? [])],
      coinsCp: STARTING_WEALTH_CP,
      startingWealth: { kind: 'coins' },
      missingItems: [],
    }
  }
  const kit = getClassKit(character.classId)
  if (!kit) {
    return {
      error:
        'Esta classe não tem pacote rápido Remaster no AoN. Use 15 po e compre no catálogo.',
    }
  }
  const { items, missingItems } = addKitItems(kit)
  return {
    equipment: [...(character.equipment ?? []), ...items],
    coinsCp: kit.leftoverCp,
    startingWealth: { kind: 'kit', kitId: kit.id },
    missingItems,
  }
}
