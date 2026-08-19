import type {
  Character,
  EquipmentItem,
  ItemDefinition,
  LootHaul,
  LootLine,
  SharedStash,
} from '@/types'
import { createInventoryItemFromDefinition } from '@/engine/equipment'
import { isConsumableDefinition } from '@/engine/lootGenerator'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import {
  holderKey,
  parseHolderKey,
  type HolderRef,
} from '@/engine/partyTransfer'
import {
  getCharacter,
  saveCharacter,
} from '@/features/characters/characterRepository'
import { getStash, saveStash } from '@/features/groups/groupRepository'
import { useCharacterStore } from '@/stores/characterStore'
import { useStashStore } from '@/stores/stashStore'
import { createId, nowIso } from '@/utils/id'

const LAST_CHARACTER_KEY = 'sp-loot-last-character-id'
const LAST_HOLDER_KEY = 'sp-loot-last-holder'

export function readLastLootCharacterId(): string | null {
  try {
    return localStorage.getItem(LAST_CHARACTER_KEY)
  } catch {
    return null
  }
}

export function writeLastLootCharacterId(id: string) {
  try {
    localStorage.setItem(LAST_CHARACTER_KEY, id)
  } catch {
    /* ignore */
  }
}

export function readLastLootHolder(): HolderRef | null {
  try {
    const raw = localStorage.getItem(LAST_HOLDER_KEY)
    if (raw) {
      const parsed = parseHolderKey(raw)
      if (parsed) return parsed
    }
    const legacy = readLastLootCharacterId()
    return legacy ? { kind: 'character', id: legacy } : null
  } catch {
    return null
  }
}

export function writeLastLootHolder(ref: HolderRef) {
  try {
    localStorage.setItem(LAST_HOLDER_KEY, holderKey(ref))
    if (ref.kind === 'character') writeLastLootCharacterId(ref.id)
  } catch {
    /* ignore */
  }
}

export function isLootLineClaimed(line: LootLine): boolean {
  return Boolean(line.claimedByCharacterId)
}

function isStackable(definition: ItemDefinition): boolean {
  return (
    isConsumableDefinition(definition) || definition.category === 'ammunition'
  )
}

function addItemToEquipment(
  equipment: EquipmentItem[],
  definition: ItemDefinition,
  quantity: number,
  note: string,
): EquipmentItem[] {
  if (isStackable(definition)) {
    const existing = equipment.find((item) => item.definitionId === definition.id)
    if (existing) {
      return equipment.map((item) =>
        item.id === existing.id
          ? { ...item, quantity: (item.quantity ?? 1) + quantity }
          : item,
      )
    }
  }
  const created = createInventoryItemFromDefinition(definition, createId('eq'))
  created.quantity = Math.max(1, quantity)
  created.equipped = false
  created.notes = note
  return [...equipment, created]
}

export interface LootDeliveryResult {
  holderName: string
  holderKind: HolderRef['kind']
  characterId?: string
  character?: Character
  characterName: string
  itemCount: number
  coinsCp: number
  missingNames: string[]
}

function applyLootLinesToInventory(
  equipment: EquipmentItem[],
  coinsCp: number,
  lines: LootLine[],
  haulName: string,
): {
  equipment: EquipmentItem[]
  coinsCp: number
  itemCount: number
  coinsAdded: number
  missingNames: string[]
} {
  const note = `Do saque: ${haulName}`
  let nextEquipment = [...equipment]
  const coinsBefore = coinsCp
  let nextCoins = coinsCp
  let itemCount = 0
  const missingNames: string[] = []

  for (const line of lines) {
    if (line.kind === 'coins') {
      nextCoins += Math.max(0, line.coinsCp ?? 0)
      continue
    }
    const definition = getItemDefinition(line.definitionId)
    if (!definition) {
      missingNames.push(line.name)
      continue
    }
    nextEquipment = addItemToEquipment(
      nextEquipment,
      definition,
      line.quantity || 1,
      note,
    )
    itemCount += 1
  }

  return {
    equipment: nextEquipment,
    coinsCp: nextCoins,
    itemCount,
    coinsAdded: nextCoins - coinsBefore,
    missingNames,
  }
}

export function applyLootLinesToCharacter(
  character: Character,
  lines: LootLine[],
  haulName: string,
): Omit<LootDeliveryResult, 'characterName' | 'holderName' | 'holderKind'> {
  const applied = applyLootLinesToInventory(
    character.equipment ?? [],
    character.coinsCp ?? 0,
    lines,
    haulName,
  )
  return {
    character: {
      ...character,
      equipment: applied.equipment,
      coinsCp: applied.coinsCp,
    },
    characterId: character.id,
    itemCount: applied.itemCount,
    coinsCp: applied.coinsAdded,
    missingNames: applied.missingNames,
  }
}

export function markLinesClaimed(
  lines: LootLine[],
  selectedIds: Set<string>,
  character: Pick<Character, 'id' | 'name'>,
  removeAfter: boolean,
): LootLine[] {
  const at = nowIso()
  const next = lines.map((line) => {
    if (!selectedIds.has(line.id)) return line
    return {
      ...line,
      claimedByCharacterId: character.id,
      claimedByName: character.name,
      claimedAt: at,
    }
  })
  if (!removeAfter) return next
  return next.filter((line) => !selectedIds.has(line.id))
}

export function unclaimLine(line: LootLine): LootLine {
  return {
    ...line,
    claimedByCharacterId: null,
    claimedByName: undefined,
    claimedAt: undefined,
  }
}

async function deliverLootToCharacter(
  characterId: string,
  lines: LootLine[],
  haulName: string,
): Promise<LootDeliveryResult> {
  const store = useCharacterStore.getState()
  const loaded =
    store.current?.id === characterId
      ? store.current
      : await getCharacter(characterId)
  if (!loaded) {
    throw new Error('Personagem não encontrado.')
  }

  const applied = applyLootLinesToCharacter(loaded, lines, haulName)
  if (!applied.character) throw new Error('Personagem não encontrado.')
  const saved = await saveCharacter(applied.character)
  writeLastLootHolder({ kind: 'character', id: characterId })
  await store.loadAll()
  if (useCharacterStore.getState().current?.id === characterId) {
    useCharacterStore.setState({
      current: saved,
      saveStatus: 'saved',
    })
  }

  return {
    ...applied,
    character: saved,
    characterId: saved.id,
    holderKind: 'character',
    holderName: saved.name,
    characterName: saved.name,
  }
}

async function deliverLootToStash(
  stashId: string,
  lines: LootLine[],
  haulName: string,
): Promise<LootDeliveryResult> {
  const loaded = await getStash(stashId)
  if (!loaded) throw new Error('Baú não encontrado.')
  const applied = applyLootLinesToInventory(
    loaded.equipment ?? [],
    loaded.coinsCp ?? 0,
    lines,
    haulName,
  )
  const saved: SharedStash = {
    ...loaded,
    equipment: applied.equipment,
    coinsCp: applied.coinsCp,
  }
  await saveStash(saved)
  writeLastLootHolder({ kind: 'stash', id: stashId })
  await useStashStore.getState().loadAll()
  return {
    holderKind: 'stash',
    holderName: saved.name,
    characterName: saved.name,
    itemCount: applied.itemCount,
    coinsCp: applied.coinsAdded,
    missingNames: applied.missingNames,
  }
}

export async function deliverLootToHolder(
  holder: HolderRef,
  lines: LootLine[],
  haulName: string,
): Promise<LootDeliveryResult> {
  if (holder.kind === 'stash') {
    return deliverLootToStash(holder.id, lines, haulName)
  }
  return deliverLootToCharacter(holder.id, lines, haulName)
}

export function claimedCount(haul: LootHaul): number {
  return haul.lines.filter((line) => isLootLineClaimed(line)).length
}
