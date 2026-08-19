import { db } from '@/db'
import type { ContentSource, ItemDefinition } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import { getItemDefinition as getOfficialItem } from '@/data/seeds/equipment'
import { setHomebrewItems } from '@/engine/equipmentRegistry'

async function refreshHomebrewRegistry(): Promise<void> {
  const rows = await db.itemDefinitions
    .filter((item) => item.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewItems(rows)
}

export async function listHomebrewItems(): Promise<ItemDefinition[]> {
  return db.itemDefinitions
    .filter((item) => item.provenance?.type === 'homebrew')
    .toArray()
}

export async function getStoredItem(
  id: string,
): Promise<ItemDefinition | undefined> {
  return db.itemDefinitions.get(id)
}

export async function saveItem(item: ItemDefinition): Promise<ItemDefinition> {
  if (item.provenance?.type === 'official') {
    throw new Error('Itens oficiais não são gravados neste banco')
  }
  const updated: ItemDefinition = {
    ...item,
    provenance: { type: 'homebrew' },
    updatedAt: nowIso(),
    createdAt: item.createdAt ?? nowIso(),
  }
  await db.itemDefinitions.put(updated)
  await refreshHomebrewRegistry()
  return updated
}

export async function deleteItem(id: string): Promise<void> {
  const item = await db.itemDefinitions.get(id)
  if (!item) return
  if (item.provenance?.type === 'official') {
    throw new Error('Itens oficiais não podem ser excluídos')
  }
  await db.itemDefinitions.delete(id)
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

export async function duplicateItemAsHomebrew(
  sourceId: string,
): Promise<ItemDefinition> {
  const stored = await db.itemDefinitions.get(sourceId)
  const source = stored ?? getOfficialItem(sourceId)
  if (!source) throw new Error('Item não encontrado')

  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )
  const now = nowIso()
  const copy: ItemDefinition = {
    ...structuredClone(source),
    id: createId('item'),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    source: 'Homebrew',
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }
  await db.itemDefinitions.put(copy)
  await refreshHomebrewRegistry()
  return copy
}
