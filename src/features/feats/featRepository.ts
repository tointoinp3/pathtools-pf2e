import { db } from '@/db'
import type { Feat } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import { dedupeOfficialFeats, withLocalizedFeatName } from './localizeFeats'

export async function listFeats(): Promise<Feat[]> {
  const rows = await db.feats.orderBy('name').toArray()
  return dedupeOfficialFeats(rows).sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export async function getFeat(id: string): Promise<Feat | undefined> {
  const feat = await db.feats.get(id)
  return feat ? withLocalizedFeatName(feat) : undefined
}

export async function saveFeat(feat: Feat): Promise<Feat> {
  const updated: Feat = {
    ...feat,
    updatedAt: nowIso(),
    createdAt: feat.createdAt ?? nowIso(),
  }
  await db.feats.put(updated)
  return withLocalizedFeatName(updated)
}

export async function deleteFeat(id: string): Promise<void> {
  const feat = await db.feats.get(id)
  if (!feat) return
  if (feat.provenance.type === 'official') {
    throw new Error('Feitos oficiais não podem ser excluídos')
  }
  await db.feats.delete(id)
}

export async function listFeatsForAncestry(ancestryId: string): Promise<Feat[]> {
  const rows = await db.feats.where('ancestryId').equals(ancestryId).toArray()
  return rows.sort((a, b) =>
    a.level !== b.level
      ? a.level - b.level
      : a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export async function listFeatsForClass(classId: string): Promise<Feat[]> {
  const rows = await db.feats.where('classId').equals(classId).toArray()
  return rows.sort((a, b) =>
    a.level !== b.level
      ? a.level - b.level
      : a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export async function listFeatsForHeritage(heritageId: string): Promise<Feat[]> {
  const rows = await db.feats.where('heritageId').equals(heritageId).toArray()
  return rows.sort((a, b) =>
    a.level !== b.level
      ? a.level - b.level
      : a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export async function deleteHomebrewFeatsForAncestry(
  ancestryId: string,
): Promise<void> {
  const rows = await db.feats.where('ancestryId').equals(ancestryId).toArray()
  for (const feat of rows) {
    if (feat.provenance.type === 'homebrew') await db.feats.delete(feat.id)
  }
}

export async function deleteHomebrewFeatsForClass(classId: string): Promise<void> {
  const rows = await db.feats.where('classId').equals(classId).toArray()
  for (const feat of rows) {
    if (feat.provenance.type === 'homebrew') await db.feats.delete(feat.id)
  }
}

export async function deleteHomebrewFeatsForHeritage(
  heritageId: string,
): Promise<void> {
  const rows = await db.feats.where('heritageId').equals(heritageId).toArray()
  for (const feat of rows) {
    if (feat.provenance.type === 'homebrew') await db.feats.delete(feat.id)
  }
}

export async function copyAncestryFeatsAsHomebrew(opts: {
  oldAncestryId: string
  newAncestryId: string
  heritageIdMap: Map<string, string>
  sourceId: string
}): Promise<Feat[]> {
  const now = nowIso()
  const sourceFeats = await listFeatsForAncestry(opts.oldAncestryId)
  const copies: Feat[] = sourceFeats.map((feat) => {
    const heritageId = feat.heritageId
      ? (opts.heritageIdMap.get(feat.heritageId) ?? feat.heritageId)
      : feat.heritageId
    return {
      ...structuredClone(feat),
      id: createId('feat'),
      ancestryId: opts.newAncestryId,
      heritageId: heritageId ?? null,
      classId: null,
      provenance: { type: 'homebrew' },
      sourceId: opts.sourceId,
      aonUrl: undefined,
      createdAt: now,
      updatedAt: now,
    }
  })
  for (const feat of copies) {
    await db.feats.put(feat)
  }
  return copies
}

export async function copyClassFeatsAsHomebrew(opts: {
  oldClassId: string
  newClassId: string
  sourceId: string
}): Promise<Feat[]> {
  const now = nowIso()
  const sourceFeats = await listFeatsForClass(opts.oldClassId)
  const copies: Feat[] = sourceFeats.map((feat) => ({
    ...structuredClone(feat),
    id: createId('feat'),
    classId: opts.newClassId,
    ancestryId: null,
    heritageId: null,
    provenance: { type: 'homebrew' },
    sourceId: opts.sourceId,
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }))
  for (const feat of copies) {
    await db.feats.put(feat)
  }
  return copies
}

export async function duplicateFeatAsHomebrew(id: string): Promise<Feat> {
  const source = await db.feats.get(id)
  if (!source) throw new Error('Feito não encontrado')
  const now = nowIso()
  const sourceId = createId('source')
  await saveContentSource({
    id: sourceId,
    name: `Homebrew baseado em ${source.name}`,
    type: 'homebrew',
    createdAt: now,
    updatedAt: now,
  })
  const copy: Feat = {
    ...structuredClone(source),
    id: createId('feat'),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId,
    aonUrl: undefined,
    createdAt: now,
    updatedAt: now,
  }
  await db.feats.put(copy)
  return withLocalizedFeatName(copy)
}

export async function listFeatsForArchetype(archetypeId: string): Promise<Feat[]> {
  const rows = await db.feats.where('archetypeId').equals(archetypeId).toArray()
  return rows.sort((a, b) =>
    a.level !== b.level
      ? a.level - b.level
      : a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export async function deleteHomebrewFeatsForArchetype(
  archetypeId: string,
): Promise<void> {
  const rows = await db.feats.where('archetypeId').equals(archetypeId).toArray()
  for (const feat of rows) {
    if (feat.provenance.type === 'homebrew') await db.feats.delete(feat.id)
  }
}
