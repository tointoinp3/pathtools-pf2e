import { db } from '@/db'
import type { ContentSource, Creature } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import { getCatalogCreatureById } from '@/data/seeds/creatures'
import { setHomebrewCreatures } from '@/engine/creatureRegistry'

async function refreshHomebrewRegistry(): Promise<void> {
  const rows = await db.creatures
    .filter((creature) => creature.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewCreatures(rows)
}

export async function listHomebrewCreatures(): Promise<Creature[]> {
  return db.creatures
    .filter((creature) => creature.provenance?.type === 'homebrew')
    .toArray()
}

export async function getStoredCreature(
  id: string,
): Promise<Creature | undefined> {
  return db.creatures.get(id)
}

export async function saveCreature(creature: Creature): Promise<Creature> {
  if (creature.provenance?.type === 'official') {
    throw new Error('Criaturas oficiais não são gravadas neste banco')
  }
  const updated: Creature = {
    ...creature,
    provenance: { type: 'homebrew' },
    updatedAt: nowIso(),
    createdAt: creature.createdAt ?? nowIso(),
  }
  await db.creatures.put(updated)
  await refreshHomebrewRegistry()
  return updated
}

export async function deleteCreature(id: string): Promise<void> {
  const creature = await db.creatures.get(id)
  if (!creature) return
  if (creature.provenance?.type === 'official') {
    throw new Error('Criaturas oficiais não podem ser excluídas')
  }
  await db.creatures.delete(id)
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

export async function duplicateCreatureAsHomebrew(
  sourceId: string,
): Promise<Creature> {
  const stored = await db.creatures.get(sourceId)
  const source = stored ?? getCatalogCreatureById(sourceId)
  if (!source) throw new Error('Criatura não encontrada')

  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )
  const now = nowIso()
  const copy: Creature = {
    ...structuredClone(source),
    id: createId('creature'),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    source: 'Homebrew',
    aonUrl: '',
    createdAt: now,
    updatedAt: now,
  }
  await db.creatures.put(copy)
  await refreshHomebrewRegistry()
  return copy
}
