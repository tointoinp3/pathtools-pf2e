import type { EquipmentItem } from '@/types/equipment'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import { getSpellById } from '@/engine/spellCatalog'

/** CD da sobrecarga da varinha: 10 + 5 × tentativas extras já feitas hoje. */
export function wandOverchargeDc(overcharges: number): number {
  return 10 + 5 * Math.max(0, overcharges)
}

export function prepareStaff(
  items: EquipmentItem[],
  itemId: string,
  highestSlotRank = 0,
): EquipmentItem[] {
  return items.map((item) => {
    const isStaff = Boolean(getItemDefinition(item.definitionId)?.staff)
    if (!isStaff) return item
    const prepared = item.id === itemId
    return {
      ...item,
      preparedStaff: prepared,
      charges: prepared ? Math.max(0, highestSlotRank) : 0,
    }
  })
}

export function unprepareStaff(item: EquipmentItem): EquipmentItem {
  return { ...item, preparedStaff: false, charges: 0 }
}

export function prepareGrimoire(
  items: EquipmentItem[],
  itemId: string,
): EquipmentItem[] {
  return items.map((item) => {
    const isGrimoire = Boolean(getItemDefinition(item.definitionId)?.grimoire)
    if (!isGrimoire) return item
    return { ...item, preparedGrimoire: item.id === itemId }
  })
}

export function refreshDailyMagicItems(
  items: EquipmentItem[],
  highestSlotRank: number,
): EquipmentItem[] {
  return items.map((item) => {
    const def = getItemDefinition(item.definitionId)
    if (def?.wand) {
      if (item.broken) return { ...item, charges: 0, wandOvercharges: 0 }
      return { ...item, charges: 1, wandOvercharges: 0 }
    }
    if (def?.staff) {
      const charges = item.preparedStaff ? Math.max(0, highestSlotRank) : 0
      return { ...item, charges }
    }
    return item
  })
}

export function spendStaffCharge(
  item: EquipmentItem,
  spellRank: number,
): EquipmentItem | null {
  const charges = item.charges ?? 0
  if (spellRank < 0 || charges < spellRank) return null
  return { ...item, charges: charges - spellRank }
}

export function spendWandCharge(item: EquipmentItem): EquipmentItem | null {
  if (item.broken) return null
  const charges = item.charges ?? 0
  if (charges >= 1) return { ...item, charges: 0 }
  return {
    ...item,
    wandOvercharges: (item.wandOvercharges ?? 0) + 1,
  }
}

export function breakWand(item: EquipmentItem): EquipmentItem {
  return { ...item, broken: true, charges: 0 }
}

export function consumeItem(item: EquipmentItem): EquipmentItem | null {
  const qty = Math.max(0, (item.quantity ?? 1) - 1)
  if (qty <= 0) return null
  return { ...item, quantity: qty }
}

export function replaceInventoryItem(
  items: EquipmentItem[],
  next: EquipmentItem | null,
  id: string,
): EquipmentItem[] {
  if (!next) return items.filter((it) => it.id !== id)
  return items.map((it) => (it.id === id ? next : it))
}

export function staffChargeCostLabel(rank: number): string {
  if (rank <= 0) return 'truque (0 cargas)'
  return `${rank} carga${rank === 1 ? '' : 's'}`
}

export function wandSpellLabel(item: EquipmentItem): string {
  const spell = getSpellById(item.wandSpellId)
  if (spell) return spell.name
  return 'escolha a magia'
}
