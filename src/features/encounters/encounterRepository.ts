import { db } from '@/db'
import type { EncounterPlan } from '@/types'
import { createId, nowIso } from '@/utils/id'

const PENDING_CREATE_KEY = 'sp-new-encounter-id'

export function peekPendingEncounterCreate(): string | null {
  try {
    return sessionStorage.getItem(PENDING_CREATE_KEY)
  } catch {
    return null
  }
}

export function markPendingEncounterCreate(id: string) {
  try {
    sessionStorage.setItem(PENDING_CREATE_KEY, id)
  } catch {
    /* ignore */
  }
}

export function clearPendingEncounterCreate() {
  try {
    sessionStorage.removeItem(PENDING_CREATE_KEY)
  } catch {
    /* ignore */
  }
}

export function createEmptyEncounter(
  partial?: Partial<EncounterPlan>,
): EncounterPlan {
  const now = nowIso()
  return {
    id: createId('encounter'),
    name: 'Novo encontro',
    partyLevel: 1,
    partySize: 4,
    threat: 'moderate',
    shape: 'balanced',
    prioritizeSameType: true,
    rarities: [],
    traits: null,
    includeHomebrew: true,
    includeUnique: false,
    themeKey: null,
    themeLabel: null,
    lines: [],
    notes: '',
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}

export async function listEncounters(): Promise<EncounterPlan[]> {
  return db.encounters.orderBy('updatedAt').reverse().toArray()
}

export async function getEncounter(
  id: string,
): Promise<EncounterPlan | undefined> {
  return db.encounters.get(id)
}

export async function saveEncounter(plan: EncounterPlan): Promise<void> {
  await db.encounters.put({ ...plan, updatedAt: nowIso() })
}

export async function deleteEncounter(id: string): Promise<void> {
  await db.encounters.delete(id)
}

export async function duplicateEncounter(id: string): Promise<EncounterPlan> {
  const source = await getEncounter(id)
  if (!source) throw new Error('Encontro não encontrado.')
  const copy = createEmptyEncounter({
    ...source,
    id: createId('encounter'),
    name: `${source.name} (cópia)`,
    createdAt: nowIso(),
  })
  await saveEncounter(copy)
  return copy
}
