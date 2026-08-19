import { db } from '@/db'
import { emptySpellState } from '@/engine'
import type { Character, PortraitRecord, PortraitTransform } from '@/types'
import { DEFAULT_PORTRAIT_TRANSFORM } from '@/types'
import { createId, nowIso } from '@/utils/id'

export function createEmptyCharacter(partial?: Partial<Character>): Character {
  const now = nowIso()
  return {
    id: createId('char'),
    name: 'Novo Personagem',
    level: 1,
    xp: 0,
    portraitId: null,
    ancestryId: null,
    heritageId: null,
    ancestryChoices: null,
    backgroundId: null,
    backgroundChoices: null,
    classId: null,
    classChoices: null,
    deityId: null,
    deityChoices: null,
    featSelections: [],
    featChoices: {},
    levelAttributeBoosts: {},
    skillIncreases: [],
    customSkills: [],
    currentHp: null,
    coinsCp: 0,
    startingWealth: null,
    equipment: [],
    groupId: null,
    companions: {
      animalCompanion: null,
      familiarOrPet: null,
      constructCompanion: null,
    },
    connections: [],
    stickyNotes: [],
    spellState: emptySpellState(),
    createdAt: now,
    updatedAt: now,
    ...partial,
  }
}

export async function listCharacters(): Promise<Character[]> {
  return db.characters.orderBy('updatedAt').reverse().toArray()
}

export async function getCharacter(id: string): Promise<Character | undefined> {
  return db.characters.get(id)
}

export async function saveCharacter(character: Character): Promise<Character> {
  const updated: Character = {
    ...character,
    updatedAt: nowIso(),
  }
  await db.characters.put(updated)
  return updated
}

function nextCopyName(name: string, taken: Set<string>): string {
  const root = name.replace(/\s*\(cópia(?: \d+)?\)\s*$/i, '').trim() || name
  const first = `${root} (cópia)`
  if (!taken.has(first.toLowerCase())) return first
  let n = 2
  while (taken.has(`${root} (cópia ${n})`.toLowerCase())) n += 1
  return `${root} (cópia ${n})`
}

/** Cópia independente da ficha (e do retrato, se houver). */
export async function duplicateCharacter(id: string): Promise<Character> {
  const source = await db.characters.get(id)
  if (!source) throw new Error('Personagem não encontrado')

  const others = await db.characters.toArray()
  const taken = new Set(
    others.map((c) => c.name.trim().toLowerCase()).filter(Boolean),
  )
  const now = nowIso()
  const newId = createId('char')

  return db.transaction('rw', db.characters, db.portraits, async () => {
    let portraitId: string | null = null
    const portrait = source.portraitId
      ? await db.portraits.get(source.portraitId)
      : await db.portraits.where('characterId').equals(id).first()

    if (portrait) {
      portraitId = createId('portrait')
      await db.portraits.add({
        id: portraitId,
        characterId: newId,
        blob: portrait.blob,
        mimeType: portrait.mimeType,
        transform: portrait.transform,
        updatedAt: now,
      })
    }

    const copy: Character = {
      ...source,
      id: newId,
      name: nextCopyName(source.name, taken),
      portraitId,
      createdAt: now,
      updatedAt: now,
    }
    await db.characters.put(copy)
    return copy
  })
}

export async function deleteCharacter(id: string): Promise<void> {
  await db.transaction('rw', db.characters, db.portraits, async () => {
    const character = await db.characters.get(id)
    if (character?.portraitId) {
      await db.portraits.delete(character.portraitId)
    }
    await db.portraits.where('characterId').equals(id).delete()
    await db.characters.delete(id)
  })
}

export async function getPortrait(portraitId: string): Promise<PortraitRecord | undefined> {
  return db.portraits.get(portraitId)
}

export async function getPortraitByCharacter(
  characterId: string,
): Promise<PortraitRecord | undefined> {
  return db.portraits.where('characterId').equals(characterId).first()
}

export async function setCharacterPortrait(
  characterId: string,
  file: Blob,
  mimeType: string,
  transform: PortraitTransform = DEFAULT_PORTRAIT_TRANSFORM,
): Promise<Character> {
  return db.transaction('rw', db.characters, db.portraits, async () => {
    const character = await db.characters.get(characterId)
    if (!character) throw new Error('Personagem não encontrado')

    let portraitId = character.portraitId ?? null
    const existing = portraitId ? await db.portraits.get(portraitId) : undefined

    if (existing) {
      await db.portraits.put({
        ...existing,
        blob: file,
        mimeType,
        // Nova imagem: reseta zoom/pan, mantém tamanho do quadro
        transform: {
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
          frameSize:
            existing.transform?.frameSize ?? DEFAULT_PORTRAIT_TRANSFORM.frameSize,
        },
        updatedAt: nowIso(),
      })
    } else {
      portraitId = createId('portrait')
      await db.portraits.add({
        id: portraitId,
        characterId,
        blob: file,
        mimeType,
        transform,
        updatedAt: nowIso(),
      })
    }

    const updated: Character = {
      ...character,
      portraitId,
      updatedAt: nowIso(),
    }
    await db.characters.put(updated)
    return updated
  })
}

export async function updatePortraitTransform(
  characterId: string,
  transform: PortraitTransform,
): Promise<void> {
  const character = await db.characters.get(characterId)
  if (!character?.portraitId) return
  const portrait = await db.portraits.get(character.portraitId)
  if (!portrait) return
  await db.portraits.put({
    ...portrait,
    transform,
    updatedAt: nowIso(),
  })
}

export async function removeCharacterPortrait(characterId: string): Promise<Character> {
  return db.transaction('rw', db.characters, db.portraits, async () => {
    const character = await db.characters.get(characterId)
    if (!character) throw new Error('Personagem não encontrado')

    if (character.portraitId) {
      await db.portraits.delete(character.portraitId)
    }
    await db.portraits.where('characterId').equals(characterId).delete()

    const updated: Character = {
      ...character,
      portraitId: null,
      updatedAt: nowIso(),
    }
    await db.characters.put(updated)
    return updated
  })
}
