import type { ItemDefinition, LootLine, LootTokenItem } from '@/types'
import { isConsumableDefinition } from '@/engine/lootGenerator'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import { createId } from '@/utils/id'

export function combatLootStacks(definition: ItemDefinition): boolean {
  return (
    isConsumableDefinition(definition) || definition.category === 'ammunition'
  )
}

export function canDeliverCombatLootItem(item: LootTokenItem): boolean {
  if (item.taken) return false
  if ((item.coinsCp ?? 0) > 0) return true
  return Boolean(item.definitionId && getItemDefinition(item.definitionId))
}

export function combatLootItemFromCatalog(
  definition: ItemDefinition,
  quantity = 1,
): LootTokenItem {
  return {
    id: createId('loot-item'),
    name: definition.name,
    quantity: Math.max(1, Math.round(quantity) || 1),
    taken: false,
    definitionId: definition.id,
  }
}

export function combatLootItemFromHaulLine(line: LootLine): LootTokenItem {
  const coins = line.kind === 'coins' ? Math.max(0, line.coinsCp ?? 0) : 0
  return {
    id: createId('loot-item'),
    name: line.name,
    quantity: Math.max(1, line.quantity || 1),
    taken: false,
    definitionId: line.definitionId ?? null,
    coinsCp: coins > 0 ? coins : undefined,
  }
}

export function combatLootItemToLine(item: LootTokenItem): LootLine {
  if ((item.coinsCp ?? 0) > 0) {
    return {
      id: item.id,
      kind: 'coins',
      name: item.name,
      quantity: 1,
      coinsCp: item.coinsCp,
    }
  }
  return {
    id: item.id,
    kind: 'item',
    definitionId: item.definitionId ?? null,
    name: item.name,
    quantity: Math.max(1, item.quantity),
  }
}

export function addOrStackCombatLoot(
  items: LootTokenItem[],
  incoming: LootTokenItem,
): LootTokenItem[] {
  if ((incoming.coinsCp ?? 0) > 0) {
    const existing = items.find(
      (item) => !item.taken && (item.coinsCp ?? 0) > 0,
    )
    if (existing) {
      return items.map((item) =>
        item.id === existing.id
          ? {
              ...item,
              coinsCp: (item.coinsCp ?? 0) + (incoming.coinsCp ?? 0),
              name: incoming.name || item.name,
            }
          : item,
      )
    }
    return [...items, incoming]
  }

  const definition = getItemDefinition(incoming.definitionId)
  if (!definition || !combatLootStacks(definition)) {
    return [...items, incoming]
  }
  const existing = items.find(
    (item) =>
      !item.taken &&
      item.definitionId === incoming.definitionId &&
      (item.coinsCp ?? 0) === 0,
  )
  if (!existing) return [...items, incoming]
  return items.map((item) =>
    item.id === existing.id
      ? { ...item, quantity: item.quantity + incoming.quantity }
      : item,
  )
}
