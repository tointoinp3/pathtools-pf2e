import { db } from '@/db'
import type { ContentSource, Ritual } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import { getRitualById as getOfficialRitual } from '@/engine/ritualCatalog'
import { setHomebrewRituals } from '@/engine/ritualRegistry'

async function refreshHomebrewRegistry(): Promise<void> {
  const rows = await db.rituals
    .filter((ritual) => ritual.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewRituals(rows)
}

export async function listHomebrewRituals(): Promise<Ritual[]> {
  return db.rituals
    .filter((ritual) => ritual.provenance?.type === 'homebrew')
    .toArray()
}

export async function getStoredRitual(id: string): Promise<Ritual | undefined> {
  return db.rituals.get(id)
}

export async function saveRitual(ritual: Ritual): Promise<Ritual> {
  if (ritual.provenance?.type === 'official') {
    throw new Error('Rituais oficiais não são gravados neste banco')
  }
  const updated: Ritual = {
    ...ritual,
    provenance: { type: 'homebrew' },
    updatedAt: nowIso(),
    createdAt: ritual.createdAt ?? nowIso(),
  }
  await db.rituals.put(updated)
  await refreshHomebrewRegistry()
  return updated
}

export async function deleteRitual(id: string): Promise<void> {
  const ritual = await db.rituals.get(id)
  if (!ritual) return
  if (ritual.provenance?.type === 'official') {
    throw new Error('Rituais oficiais não podem ser excluídos')
  }
  await db.rituals.delete(id)
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

export async function duplicateRitualAsHomebrew(
  sourceId: string,
): Promise<Ritual> {
  const stored = await db.rituals.get(sourceId)
  const source = stored ?? getOfficialRitual(sourceId)
  if (!source) throw new Error('Ritual não encontrado')

  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )
  const now = nowIso()
  const copy: Ritual = {
    ...structuredClone(source),
    id: createId('ritual'),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    source: 'Homebrew',
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }
  await db.rituals.put(copy)
  await refreshHomebrewRegistry()
  return copy
}
