import { db } from '@/db'
import type { CharacterClass, ContentSource } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import {
  copyClassFeatsAsHomebrew,
  deleteHomebrewFeatsForClass,
} from '@/features/feats/featRepository'

export async function listClasses(): Promise<CharacterClass[]> {
  return db.classes.orderBy('name').toArray()
}

export async function getClass(id: string): Promise<CharacterClass | undefined> {
  return db.classes.get(id)
}

export async function saveClass(
  characterClass: CharacterClass,
): Promise<CharacterClass> {
  const updated: CharacterClass = {
    ...characterClass,
    updatedAt: nowIso(),
    createdAt: characterClass.createdAt ?? nowIso(),
  }
  await db.classes.put(updated)
  return updated
}

export async function countCharactersUsingClass(
  classId: string,
): Promise<number> {
  return db.characters.where('classId').equals(classId).count()
}

export async function deleteClass(id: string): Promise<void> {
  const characterClass = await db.classes.get(id)
  if (!characterClass) return
  if (characterClass.provenance.type === 'official') {
    throw new Error('Classes oficiais não podem ser excluídas')
  }
  await deleteHomebrewFeatsForClass(id)
  await db.classes.delete(id)
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

export async function duplicateClassAsHomebrew(
  sourceId: string,
): Promise<CharacterClass> {
  const source = await db.classes.get(sourceId)
  if (!source) throw new Error('Classe não encontrada')

  const now = nowIso()
  const newClassId = createId('class')
  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )

  const copy: CharacterClass = {
    ...structuredClone(source),
    id: newClassId,
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    aonUrl: undefined,
    spellcasting: source.spellcasting
      ? { ...structuredClone(source.spellcasting), id: `${newClassId}-spellcasting` }
      : undefined,
    createdAt: now,
    updatedAt: now,
  }

  await db.classes.put(copy)
  await copyClassFeatsAsHomebrew({
    oldClassId: source.id,
    newClassId,
    sourceId: homebrewSourceId,
  })
  return copy
}
