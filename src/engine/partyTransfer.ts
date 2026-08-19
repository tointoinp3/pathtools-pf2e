import type {
  Character,
  EquipmentItem,
  ItemDefinition,
  SharedStash,
} from '@/types'
import { createInventoryItemFromDefinition } from '@/engine/equipment'
import { isConsumableDefinition } from '@/engine/lootGenerator'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import {
  PartyTransferError,
  addOrStack,
  coinsToCp,
  moveCoins,
  moveItem,
  type HolderInventory,
} from '@/engine/partyTransferCore'
import {
  getCharacter,
  saveCharacter,
} from '@/features/characters/characterRepository'
import { getStash, saveStash } from '@/features/groups/groupRepository'
import { useCharacterStore } from '@/stores/characterStore'
import { useStashStore } from '@/stores/stashStore'
import { createId } from '@/utils/id'

export type { CoinUnit } from '@/engine/partyTransferCore'
export { coinsToCp }

export type HolderKind = 'character' | 'stash'

export interface HolderRef {
  kind: HolderKind
  id: string
}

type LoadedHolder =
  | { kind: 'character'; data: Character }
  | { kind: 'stash'; data: SharedStash }

export function holderKey(ref: HolderRef): string {
  return `${ref.kind}:${ref.id}`
}

export function parseHolderKey(key: string): HolderRef | null {
  const sep = key.indexOf(':')
  if (sep <= 0) return null
  const kind = key.slice(0, sep)
  const id = key.slice(sep + 1)
  if ((kind !== 'character' && kind !== 'stash') || !id) return null
  return { kind, id }
}

export function isStackableItem(item: EquipmentItem): boolean {
  const definition = getItemDefinition(item.definitionId)
  if (definition) {
    return (
      isConsumableDefinition(definition) || definition.category === 'ammunition'
    )
  }
  return (item.quantity ?? 1) > 1
}

/** Regra de empilhamento ao guardar: só vale com ficha de catálogo. */
function stacksByCatalog(item: EquipmentItem): boolean {
  const definition = getItemDefinition(item.definitionId)
  if (!definition) return false
  return (
    isConsumableDefinition(definition) || definition.category === 'ammunition'
  )
}

function holderName(holder: LoadedHolder): string {
  return holder.data.name
}

function holderInventory(holder: LoadedHolder): HolderInventory {
  return {
    coinsCp: holder.data.coinsCp ?? 0,
    equipment: holder.data.equipment ?? [],
  }
}

function withInventory(
  holder: LoadedHolder,
  inventory: HolderInventory,
): LoadedHolder {
  const { coinsCp, equipment } = inventory
  if (holder.kind === 'character') {
    return { kind: 'character', data: { ...holder.data, coinsCp, equipment } }
  }
  return { kind: 'stash', data: { ...holder.data, coinsCp, equipment } }
}

function missingLabel(kind: HolderKind): string {
  return kind === 'stash' ? 'Baú não encontrado.' : 'Personagem não encontrado.'
}

function notEnoughGold(kind: HolderKind): string {
  return kind === 'stash'
    ? 'Esse baú não tem ouro suficiente.'
    : 'Essa ficha não tem ouro suficiente.'
}

function itemMissing(kind: HolderKind): string {
  return kind === 'stash'
    ? 'Item não encontrado nesse baú.'
    : 'Item não encontrado nessa ficha.'
}

/** Traduz o código do motor para a frase que o portador de origem pede. */
function transferMessage(error: PartyTransferError, kind: HolderKind): string {
  switch (error.code) {
    case 'invalid-amount':
      return 'Informe um valor maior que zero.'
    case 'invalid-quantity':
      return 'Informe a quantidade.'
    case 'not-enough-coins':
      return notEnoughGold(kind)
    case 'item-missing':
      return itemMissing(kind)
    case 'quantity-too-high':
      return `Só há ${error.available ?? 0} desse item.`
  }
}

/** Roda o motor puro e converte o erro dele na frase da interface. */
function runTransfer<T>(run: () => T, kind: HolderKind): T {
  try {
    return run()
  } catch (error) {
    if (error instanceof PartyTransferError) {
      throw new Error(transferMessage(error, kind))
    }
    throw error
  }
}

async function loadHolder(ref: HolderRef): Promise<LoadedHolder> {
  if (ref.kind === 'character') {
    const store = useCharacterStore.getState()
    const data =
      store.current?.id === ref.id ? store.current : await getCharacter(ref.id)
    if (!data) throw new Error(missingLabel('character'))
    return { kind: 'character', data }
  }
  const data = await getStash(ref.id)
  if (!data) throw new Error(missingLabel('stash'))
  return { kind: 'stash', data }
}

async function persistHolder(holder: LoadedHolder): Promise<LoadedHolder> {
  if (holder.kind === 'character') {
    const saved = await saveCharacter(holder.data)
    return { kind: 'character', data: saved }
  }
  const saved = await saveStash(holder.data)
  return { kind: 'stash', data: saved }
}

async function syncStoresAfterPersist(holders: LoadedHolder[]) {
  await useCharacterStore.getState().loadAll()
  await useStashStore.getState().loadAll()
  const current = useCharacterStore.getState().current
  if (!current) return
  const match = holders.find(
    (holder) => holder.kind === 'character' && holder.data.id === current.id,
  )
  if (match?.kind === 'character') {
    useCharacterStore.setState({ current: match.data, saveStatus: 'saved' })
  }
}

async function persistPair(
  from: LoadedHolder,
  to: LoadedHolder,
): Promise<{ from: LoadedHolder; to: LoadedHolder }> {
  const savedFrom = await persistHolder(from)
  const savedTo = await persistHolder(to)
  await syncStoresAfterPersist([savedFrom, savedTo])
  return { from: savedFrom, to: savedTo }
}

export interface PartyTransferResult {
  summary: string
}

function sameHolder(a: HolderRef, b: HolderRef): boolean {
  return a.kind === b.kind && a.id === b.id
}

export async function transferCoins(input: {
  from: HolderRef
  to: HolderRef
  coinsCp: number
}): Promise<PartyTransferResult> {
  if (sameHolder(input.from, input.to)) {
    throw new Error('Escolha outro destino.')
  }
  const amount = Math.floor(input.coinsCp)
  if (amount <= 0) throw new Error('Informe um valor maior que zero.')

  const from = await loadHolder(input.from)
  const to = await loadHolder(input.to)

  const moved = runTransfer(
    () => moveCoins(holderInventory(from), holderInventory(to), amount),
    from.kind,
  )

  const saved = await persistPair(
    withInventory(from, moved.from),
    withInventory(to, moved.to),
  )
  return {
    summary: `${holderName(saved.from)} → ${holderName(saved.to)}`,
  }
}

export async function transferItem(input: {
  from: HolderRef
  to: HolderRef
  itemId: string
  quantity: number
}): Promise<PartyTransferResult> {
  if (sameHolder(input.from, input.to)) {
    throw new Error('Escolha outro destino.')
  }
  const qty = Math.floor(input.quantity)
  if (qty <= 0) throw new Error('Informe a quantidade.')

  const from = await loadHolder(input.from)
  const to = await loadHolder(input.to)

  const moved = runTransfer(
    () =>
      moveItem(holderInventory(from), holderInventory(to), {
        itemId: input.itemId,
        quantity: qty,
        isStackable: stacksByCatalog,
        createItemId: () => createId('eq'),
      }),
    from.kind,
  )

  const saved = await persistPair(
    withInventory(from, moved.from),
    withInventory(to, moved.to),
  )
  const label =
    moved.movedQuantity > 1
      ? `${moved.movedItem.name} ×${moved.movedQuantity}`
      : moved.movedItem.name
  return {
    summary: `${label}: ${holderName(saved.from)} → ${holderName(saved.to)}`,
  }
}

export async function grantCatalogItemToHolder(input: {
  to: HolderRef
  definition: ItemDefinition
  quantity?: number
}): Promise<PartyTransferResult> {
  const holder = await loadHolder(input.to)
  const created = createInventoryItemFromDefinition(
    input.definition,
    createId('eq'),
  )
  if (input.quantity != null) {
    created.quantity = Math.max(1, Math.floor(input.quantity))
  }
  created.equipped = false
  created.invested = false
  const inventory = holderInventory(holder)
  const next = addOrStack(inventory.equipment, created, stacksByCatalog)
  const saved = await persistHolder(
    withInventory(holder, { coinsCp: inventory.coinsCp, equipment: next }),
  )
  await syncStoresAfterPersist([saved])
  return {
    summary: `${input.definition.name} → ${holderName(saved)}`,
  }
}

export function partyCoinsCp(
  characters: Character[],
  stashes: SharedStash[] = [],
): number {
  const fromChars = characters.reduce((sum, c) => sum + (c.coinsCp ?? 0), 0)
  const fromStash = stashes.reduce((sum, s) => sum + (s.coinsCp ?? 0), 0)
  return fromChars + fromStash
}

export function partyItemCount(
  characters: Character[],
  stashes: SharedStash[] = [],
): number {
  const count = (equipment: EquipmentItem[] | undefined) =>
    (equipment ?? []).reduce((n, item) => n + (item.quantity ?? 1), 0)
  return (
    characters.reduce((sum, c) => sum + count(c.equipment), 0) +
    stashes.reduce((sum, s) => sum + count(s.equipment), 0)
  )
}

export function itemCatalog(item: EquipmentItem): ItemDefinition | null {
  return getItemDefinition(item.definitionId)
}
