import { db } from '@/db'
import type { Archetype, ContentSource, Feat } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import {
  deleteHomebrewFeatsForArchetype,
  listFeatsForArchetype,
} from '@/features/feats/featRepository'
import { getOfficialArchetype } from '@/data/seeds/archetypes'
import { setHomebrewArchetypes } from '@/engine/archetypeRegistry'

async function refreshHomebrewRegistry(): Promise<void> {
  const rows = await db.archetypes
    .filter((a) => a.provenance.type === 'homebrew')
    .toArray()
  setHomebrewArchetypes(rows)
}

export async function listHomebrewArchetypes(): Promise<Archetype[]> {
  return db.archetypes
    .filter((a) => a.provenance.type === 'homebrew')
    .toArray()
}

export async function getStoredArchetype(
  id: string,
): Promise<Archetype | undefined> {
  return db.archetypes.get(id)
}

export async function saveArchetype(archetype: Archetype): Promise<Archetype> {
  if (archetype.provenance.type === 'official') {
    throw new Error('Arquétipos oficiais não são gravados neste banco')
  }
  const updated: Archetype = {
    ...archetype,
    updatedAt: nowIso(),
    createdAt: archetype.createdAt ?? nowIso(),
  }
  await db.archetypes.put(updated)
  await refreshHomebrewRegistry()
  return updated
}

export async function deleteArchetype(id: string): Promise<void> {
  const archetype = await db.archetypes.get(id)
  if (!archetype) return
  if (archetype.provenance.type === 'official') {
    throw new Error('Arquétipos oficiais não podem ser excluídos')
  }
  await deleteHomebrewFeatsForArchetype(id)
  await db.archetypes.delete(id)
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

function remapPrereqs(feat: Feat, idMap: Map<string, string>): Feat {
  if (!feat.prerequisites?.length) return feat
  return {
    ...feat,
    prerequisites: feat.prerequisites.map((pre) => {
      if (pre.kind !== 'feat') return pre
      const nextId = idMap.get(pre.featId)
      return nextId ? { ...pre, featId: nextId } : pre
    }),
  }
}

export async function duplicateArchetypeAsHomebrew(
  sourceId: string,
): Promise<Archetype> {
  const source =
    (await db.archetypes.get(sourceId)) ?? getOfficialArchetype(sourceId)
  if (!source) throw new Error('Arquétipo não encontrado')

  const now = nowIso()
  const newArchetypeId = createId('archetype')
  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )

  const linked = await listFeatsForArchetype(source.id)
  const byId = new Map(linked.map((f) => [f.id, f]))
  const orderedIds = [
    source.dedicationFeatId,
    ...source.featIds.filter((id) => id !== source.dedicationFeatId),
  ]
  for (const feat of linked) {
    if (!orderedIds.includes(feat.id)) orderedIds.push(feat.id)
  }

  const idMap = new Map<string, string>()
  const rawCopies: Feat[] = []
  for (const oldId of orderedIds) {
    const feat = byId.get(oldId) ?? (await db.feats.get(oldId))
    if (!feat) continue
    const newId = createId('feat')
    idMap.set(oldId, newId)
    rawCopies.push({
      ...structuredClone(feat),
      id: newId,
      archetypeId: newArchetypeId,
      provenance: { type: 'homebrew' },
      sourceId: homebrewSourceId,
      aonUrl: undefined,
      createdAt: now,
      updatedAt: now,
    })
  }
  const copies = rawCopies.map((feat) => remapPrereqs(feat, idMap))

  const newDedicationId =
    idMap.get(source.dedicationFeatId) ?? copies.find((f) => f.isDedication)?.id
  if (!newDedicationId) {
    throw new Error('Este arquétipo não tem feito de Dedicação para copiar')
  }

  const extraIds = copies
    .filter((f) => f.id !== newDedicationId)
    .map((f) => f.id)

  const copy: Archetype = {
    ...structuredClone(source),
    id: newArchetypeId,
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    dedicationFeatId: newDedicationId,
    featIds: extraIds,
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }

  await db.archetypes.put(copy)
  for (const feat of copies) {
    await db.feats.put(feat)
  }
  await refreshHomebrewRegistry()
  return copy
}
