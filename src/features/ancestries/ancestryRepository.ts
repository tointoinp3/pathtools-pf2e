import { partitionHeritagesForAncestry } from '@/engine'
import { db } from '@/db'
import type { Ancestry, ContentSource, Heritage } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import {
  copyAncestryFeatsAsHomebrew,
  deleteHomebrewFeatsForAncestry,
  deleteHomebrewFeatsForHeritage,
} from '@/features/feats/featRepository'

export async function listAncestries(): Promise<Ancestry[]> {
  return db.ancestries.orderBy('name').toArray()
}

export async function listHeritages(): Promise<Heritage[]> {
  return db.heritages.orderBy('name').toArray()
}

export async function getAncestry(id: string): Promise<Ancestry | undefined> {
  return db.ancestries.get(id)
}

export async function getHeritage(id: string): Promise<Heritage | undefined> {
  return db.heritages.get(id)
}

export async function listHeritagesForAncestry(
  ancestryId: string,
): Promise<Heritage[]> {
  const all = await listHeritages()
  const ancestry = await getAncestry(ancestryId)
  const { specific, versatile } = partitionHeritagesForAncestry(
    all,
    ancestryId,
    '',
    ancestry?.traits,
  )
  return [...specific, ...versatile]
}

export async function saveAncestry(ancestry: Ancestry): Promise<Ancestry> {
  const updated: Ancestry = {
    ...ancestry,
    updatedAt: nowIso(),
    createdAt: ancestry.createdAt ?? nowIso(),
  }
  await db.ancestries.put(updated)
  return updated
}

export async function saveHeritage(heritage: Heritage): Promise<Heritage> {
  const updated: Heritage = {
    ...heritage,
    updatedAt: nowIso(),
    createdAt: heritage.createdAt ?? nowIso(),
  }
  const previous = await db.heritages.get(updated.id)
  await db.heritages.put(updated)

  const oldParentId = previous?.ancestryId ?? null
  const newParentId = updated.isVersatile ? null : updated.ancestryId

  if (oldParentId && oldParentId !== newParentId) {
    const oldParent = await db.ancestries.get(oldParentId)
    if (
      oldParent?.provenance.type === 'homebrew' &&
      oldParent.heritageIds.includes(updated.id)
    ) {
      await db.ancestries.put({
        ...oldParent,
        heritageIds: oldParent.heritageIds.filter((hid) => hid !== updated.id),
        updatedAt: nowIso(),
      })
    }
  }

  if (newParentId) {
    const parent = await db.ancestries.get(newParentId)
    if (
      parent?.provenance.type === 'homebrew' &&
      !parent.heritageIds.includes(updated.id)
    ) {
      await db.ancestries.put({
        ...parent,
        heritageIds: [...parent.heritageIds, updated.id],
        updatedAt: nowIso(),
      })
    }
  }

  return updated
}

export async function countCharactersUsingAncestry(
  ancestryId: string,
): Promise<number> {
  return db.characters.where('ancestryId').equals(ancestryId).count()
}

export async function countCharactersUsingHeritage(
  heritageId: string,
): Promise<number> {
  return db.characters.where('heritageId').equals(heritageId).count()
}

export async function deleteAncestry(id: string): Promise<void> {
  const ancestry = await db.ancestries.get(id)
  if (!ancestry) return
  if (ancestry.provenance.type === 'official') {
    throw new Error('Ancestralidades oficiais não podem ser excluídas')
  }
  const kids = await db.heritages.where('ancestryId').equals(id).toArray()
  for (const h of kids) {
    if (h.provenance.type === 'homebrew') {
      await deleteHomebrewFeatsForHeritage(h.id)
      await db.heritages.delete(h.id)
    }
  }
  await deleteHomebrewFeatsForAncestry(id)
  await db.ancestries.delete(id)
}

export async function deleteHeritage(id: string): Promise<void> {
  const heritage = await db.heritages.get(id)
  if (!heritage) return
  if (heritage.provenance.type === 'official') {
    throw new Error('Heranças oficiais não podem ser excluídas')
  }
  const parent = heritage.ancestryId
    ? await db.ancestries.get(heritage.ancestryId)
    : undefined
  if (parent && parent.heritageIds.includes(id)) {
    await db.ancestries.put({
      ...parent,
      heritageIds: parent.heritageIds.filter((hid) => hid !== id),
      updatedAt: nowIso(),
    })
  }
  await deleteHomebrewFeatsForHeritage(id)
  await db.heritages.delete(id)
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

export async function duplicateAncestryAsHomebrew(
  sourceId: string,
): Promise<Ancestry> {
  const source = await db.ancestries.get(sourceId)
  if (!source) throw new Error('Ancestralidade não encontrada')

  const now = nowIso()
  const newAncestryId = createId('ancestry')
  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )

  const oldHeritages = (await listHeritages()).filter(
    (h) => h.ancestryId === source.id && !h.isVersatile,
  )
  const idMap = new Map<string, string>()
  const copies: Heritage[] = oldHeritages.map((h) => {
    const newId = createId('heritage')
    idMap.set(h.id, newId)
    return {
      ...structuredClone(h),
      id: newId,
      ancestryId: newAncestryId,
      isVersatile: false,
      name: h.name,
      originalName: h.originalName,
      provenance: { type: 'homebrew' },
      sourceId: homebrewSourceId,
      createdAt: now,
      updatedAt: now,
    }
  })

  const copy: Ancestry = {
    ...structuredClone(source),
    id: newAncestryId,
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    heritageIds: copies.map((h) => h.id),
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }

  await db.ancestries.put(copy)
  for (const h of copies) {
    await db.heritages.put(h)
  }
  await copyAncestryFeatsAsHomebrew({
    oldAncestryId: source.id,
    newAncestryId,
    heritageIdMap: idMap,
    sourceId: homebrewSourceId,
  })
  return copy
}

export async function duplicateHeritageAsHomebrew(
  sourceId: string,
): Promise<Heritage> {
  const source = await db.heritages.get(sourceId)
  if (!source) throw new Error('Herança não encontrada')

  const now = nowIso()
  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )
  const copy: Heritage = {
    ...structuredClone(source),
    id: createId('heritage'),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }
  await db.heritages.put(copy)
  if (copy.ancestryId) {
    const parent = await db.ancestries.get(copy.ancestryId)
    if (parent && parent.provenance.type === 'homebrew') {
      await db.ancestries.put({
        ...parent,
        heritageIds: [...parent.heritageIds, copy.id],
        updatedAt: now,
      })
    }
  }
  return copy
}
