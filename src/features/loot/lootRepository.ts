import { db } from '@/db'
import type { LootHaul } from '@/types'
import { createId, nowIso } from '@/utils/id'

const PENDING_CREATE_KEY = 'sp-new-loot-id'

export function peekPendingLootCreate(): string | null {
  try {
    return sessionStorage.getItem(PENDING_CREATE_KEY)
  } catch {
    return null
  }
}

export function markPendingLootCreate(id: string) {
  try {
    sessionStorage.setItem(PENDING_CREATE_KEY, id)
  } catch {
    /* ignore */
  }
}

export function clearPendingLootCreate() {
  try {
    sessionStorage.removeItem(PENDING_CREATE_KEY)
  } catch {
    /* ignore */
  }
}

export function createEmptyHaul(partial?: Partial<LootHaul>): LootHaul {
  const now = nowIso()
  return {
    id: createId('loot'),
    name: 'Novo saque',
    partyLevel: 1,
    partySize: 4,
    kind: 'encounter',
    encounterThreat: 'moderate',
    customItemCount: 6,
    categories: [],
    rarities: [],
    includeHomebrew: true,
    includeCoins: true,
    lines: [],
    notes: '',
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}

export async function listHauls(): Promise<LootHaul[]> {
  return db.lootHauls.orderBy('updatedAt').reverse().toArray()
}

export async function getHaul(id: string): Promise<LootHaul | undefined> {
  return db.lootHauls.get(id)
}

export async function saveHaul(haul: LootHaul): Promise<void> {
  await db.lootHauls.put({ ...haul, updatedAt: nowIso() })
}

export async function deleteHaul(id: string): Promise<void> {
  await db.lootHauls.delete(id)
}

export async function duplicateHaul(id: string): Promise<LootHaul> {
  const source = await getHaul(id)
  if (!source) throw new Error('Saque não encontrado.')
  const copy = createEmptyHaul({
    ...source,
    id: createId('loot'),
    name: `${source.name} (cópia)`,
    createdAt: nowIso(),
  })
  await saveHaul(copy)
  return copy
}
