import { db } from '@/db'
import type { ContentSource, Deity } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import { getDeityById as getOfficialDeity } from '@/engine/deityCatalog'
import { setHomebrewDeities } from '@/engine/deityRegistry'

async function refreshHomebrewRegistry(): Promise<void> {
  const rows = await db.deities
    .filter((deity) => deity.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewDeities(rows)
}

export async function listHomebrewDeities(): Promise<Deity[]> {
  return db.deities
    .filter((deity) => deity.provenance?.type === 'homebrew')
    .toArray()
}

export async function getStoredDeity(id: string): Promise<Deity | undefined> {
  return db.deities.get(id)
}

export async function saveDeity(deity: Deity): Promise<Deity> {
  if (deity.provenance?.type === 'official') {
    throw new Error('Divindades oficiais não são gravadas neste banco')
  }
  const updated: Deity = {
    ...deity,
    provenance: { type: 'homebrew' },
    updatedAt: nowIso(),
    createdAt: deity.createdAt ?? nowIso(),
  }
  await db.deities.put(updated)
  await refreshHomebrewRegistry()
  return updated
}

export async function deleteDeity(id: string): Promise<void> {
  const deity = await db.deities.get(id)
  if (!deity) return
  if (deity.provenance?.type === 'official') {
    throw new Error('Divindades oficiais não podem ser excluídas')
  }
  await db.deities.delete(id)
  await refreshHomebrewRegistry()
}

async function ensureHomebrewSource(label: string): Promise<string> {
  const now = nowIso()
  const sourceId = createId('source')
  const source: ContentSource = {
    id: sourceId,
    name: label,
    type: 'homebrew',
    createdAt: now,
    updatedAt: now,
  }
  await saveContentSource(source)
  return sourceId
}

export async function duplicateDeityAsHomebrew(
  sourceId: string,
): Promise<Deity> {
  const stored = await db.deities.get(sourceId)
  const source = stored ?? getOfficialDeity(sourceId)
  if (!source) throw new Error('Divindade não encontrada')

  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )
  const now = nowIso()
  const copy: Deity = {
    ...structuredClone(source),
    id: createId('deity'),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    source: 'Homebrew',
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }
  await db.deities.put(copy)
  await refreshHomebrewRegistry()
  return copy
}
