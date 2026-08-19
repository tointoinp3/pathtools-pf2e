import type { CreatureItemRef } from '@/types/creature'
import type { ItemDefinition } from '@/types/equipment'
import {
  findCatalogItem,
  getItemDefinition,
} from '@/engine/equipmentCatalog'

/**
 * Liga o item da ficha ao catálogo como o AoN: qualidade (tosco/shoddy),
 * quantidade e notas entre parênteses não criam um item novo.
 */
export function resolveCreatureItem(
  ref: CreatureItemRef,
): ItemDefinition | null {
  if (ref.itemId) {
    const byId = getItemDefinition(ref.itemId)
    if (byId) return byId
  }
  return findCatalogItem(ref.originalName) ?? findCatalogItem(ref.name)
}
