import { db } from '@/db'
import type { CombatSession } from '@/types'
import { cloneToken } from '@/engine/combat'
import { createId, nowIso } from '@/utils/id'
import {
  copyTokenImage,
  deleteTokenImagesFor,
} from './combatImageRepository'

export const DEFAULT_GRID_COLS = 40
export const DEFAULT_GRID_ROWS = 26
export const GRID_MIN = 4
export const GRID_MAX = 100
export const DEFAULT_CELL_SIZE = 48
export const CELL_SIZE_MIN = 28
export const CELL_SIZE_MAX = 88

export function createEmptyCombatSession(
  partial?: Partial<CombatSession>,
): CombatSession {
  const now = nowIso()
  return {
    id: createId('combat'),
    name: 'Novo combate',
    round: 1,
    turnTokenId: null,
    gridCols: DEFAULT_GRID_COLS,
    gridRows: DEFAULT_GRID_ROWS,
    cellSize: DEFAULT_CELL_SIZE,
    tokens: [],
    paint: {},
    notes: '',
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}

export async function listCombatSessions(): Promise<CombatSession[]> {
  return db.combatSessions.orderBy('updatedAt').reverse().toArray()
}

export async function getCombatSession(
  id: string,
): Promise<CombatSession | undefined> {
  return db.combatSessions.get(id)
}

export async function saveCombatSession(
  session: CombatSession,
): Promise<void> {
  await db.combatSessions.put({ ...session, updatedAt: nowIso() })
}

export async function deleteCombatSession(id: string): Promise<void> {
  const session = await getCombatSession(id)
  await db.combatSessions.delete(id)
  if (session) {
    await deleteTokenImagesFor(session.tokens.map((token) => token.id))
  }
}

export async function duplicateCombatSession(
  id: string,
): Promise<CombatSession> {
  const source = await getCombatSession(id)
  if (!source) throw new Error('Combate não encontrado.')

  const tokens = []
  for (const token of source.tokens) {
    const copy = cloneToken(token, { x: token.x, y: token.y }, token.name)
    tokens.push(copy)
    await copyTokenImage(token.id, copy.id)
  }

  const now = nowIso()
  const copy: CombatSession = {
    ...source,
    id: createId('combat'),
    name: `${source.name} (cópia)`,
    tokens,
    createdAt: now,
    updatedAt: now,
  }
  await db.combatSessions.put(copy)
  return copy
}
