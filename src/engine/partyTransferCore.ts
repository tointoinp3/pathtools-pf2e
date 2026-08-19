import type { EquipmentItem } from '@/types'

export type CoinUnit = 'gp' | 'sp' | 'cp'

export type TransferErrorCode =
  | 'invalid-amount'
  | 'invalid-quantity'
  | 'not-enough-coins'
  | 'item-missing'
  | 'quantity-too-high'

/**
 * Erro de transferência sem texto de interface: quem chama traduz o código
 * para a mensagem certa (a frase muda entre ficha e baú).
 */
export class PartyTransferError extends Error {
  code: TransferErrorCode
  /** Quanto havia de fato, quando o pedido passou do disponível. */
  available: number | null

  constructor(code: TransferErrorCode, available: number | null = null) {
    super(code)
    this.name = 'PartyTransferError'
    this.code = code
    this.available = available
  }
}

/** Inventário de um portador (ficha ou baú), sem banco nem store no meio. */
export interface HolderInventory {
  coinsCp: number
  equipment: EquipmentItem[]
}

export interface CoinMoveResult {
  from: HolderInventory
  to: HolderInventory
  movedCp: number
}

export interface ItemMoveResult {
  from: HolderInventory
  to: HolderInventory
  /** Cópia do item como ele chegou no destino. */
  movedItem: EquipmentItem
  movedQuantity: number
}

export interface ItemMoveOptions {
  itemId: string
  quantity: number
  /** Consumíveis e munição empilham; o resto entra como linha separada. */
  isStackable: (item: EquipmentItem) => boolean
  /** Id do item novo quando a pilha é dividida. */
  createItemId: () => string
}

export function coinsToCp(amount: number, unit: CoinUnit): number {
  if (!Number.isFinite(amount) || amount <= 0) return 0
  if (unit === 'gp') return Math.round(amount * 100)
  if (unit === 'sp') return Math.round(amount * 10)
  return Math.round(amount)
}

/** Quantidade efetiva de uma linha do inventário (nunca menos que 1). */
export function itemQuantity(item: EquipmentItem): number {
  return Math.max(1, item.quantity ?? 1)
}

/** Item trocando de dono: sai equipado, investido, erguido e sem munição. */
export function prepareMovedItem(
  item: EquipmentItem,
  quantity: number,
): EquipmentItem {
  return {
    ...item,
    quantity,
    equipped: false,
    invested: false,
    raised: false,
    loadedAmmoItemId: null,
  }
}

/** Armas que apontavam para uma munição que saiu do inventário ficam vazias. */
export function scrubAmmoLinks(
  equipment: EquipmentItem[],
  goneIds: Set<string>,
): EquipmentItem[] {
  if (goneIds.size === 0) return equipment
  return equipment.map((item) =>
    item.loadedAmmoItemId && goneIds.has(item.loadedAmmoItemId)
      ? { ...item, loadedAmmoItemId: null }
      : item,
  )
}

/** Soma na pilha existente quando empilhável; senão, entra como linha nova. */
export function addOrStack(
  equipment: EquipmentItem[],
  incoming: EquipmentItem,
  isStackable: (item: EquipmentItem) => boolean,
): EquipmentItem[] {
  if (incoming.definitionId && isStackable(incoming)) {
    const existing = equipment.find(
      (item) => item.definitionId === incoming.definitionId,
    )
    if (existing) {
      return equipment.map((item) =>
        item.id === existing.id
          ? { ...item, quantity: itemQuantity(item) + itemQuantity(incoming) }
          : item,
      )
    }
  }
  return [...equipment, incoming]
}

/**
 * Move moedas entre dois inventários. O total do grupo não muda: o que sai
 * de um entra no outro, em peças de cobre inteiras.
 */
export function moveCoins(
  from: HolderInventory,
  to: HolderInventory,
  amountCp: number,
): CoinMoveResult {
  const amount = Math.floor(amountCp)
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new PartyTransferError('invalid-amount')
  }
  const have = from.coinsCp ?? 0
  if (amount > have) {
    throw new PartyTransferError('not-enough-coins', have)
  }
  return {
    from: { coinsCp: have - amount, equipment: from.equipment },
    to: { coinsCp: (to.coinsCp ?? 0) + amount, equipment: to.equipment },
    movedCp: amount,
  }
}

/**
 * Move um item (ou parte de uma pilha) entre dois inventários. A soma das
 * quantidades dos dois lados é a mesma antes e depois.
 */
export function moveItem(
  from: HolderInventory,
  to: HolderInventory,
  options: ItemMoveOptions,
): ItemMoveResult {
  const qty = Math.floor(options.quantity)
  if (!Number.isFinite(qty) || qty <= 0) {
    throw new PartyTransferError('invalid-quantity')
  }

  const sourceItems = [...from.equipment]
  const item = sourceItems.find((entry) => entry.id === options.itemId)
  if (!item) {
    throw new PartyTransferError('item-missing')
  }

  const have = itemQuantity(item)
  if (qty > have) {
    throw new PartyTransferError('quantity-too-high', have)
  }

  const goneIds = new Set<string>()
  let nextSourceItems: EquipmentItem[]
  let incoming: EquipmentItem

  if (qty >= have) {
    goneIds.add(item.id)
    nextSourceItems = sourceItems.filter((entry) => entry.id !== item.id)
    incoming = prepareMovedItem(item, have)
  } else {
    nextSourceItems = sourceItems.map((entry) =>
      entry.id === item.id ? { ...entry, quantity: have - qty } : entry,
    )
    incoming = {
      ...prepareMovedItem(item, qty),
      id: options.createItemId(),
    }
  }

  return {
    from: {
      coinsCp: from.coinsCp ?? 0,
      equipment: scrubAmmoLinks(nextSourceItems, goneIds),
    },
    to: {
      coinsCp: to.coinsCp ?? 0,
      equipment: addOrStack(to.equipment, incoming, options.isStackable),
    },
    movedItem: incoming,
    movedQuantity: qty >= have ? have : qty,
  }
}
