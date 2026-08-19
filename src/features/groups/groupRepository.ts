import { db } from '@/db'
import type { CharacterGroup, SharedStash } from '@/types'
import { MESA_STASH_ID, MESA_STASH_NAME } from '@/types'
import { createId, nowIso } from '@/utils/id'
import { deleteCharacter } from '@/features/characters/characterRepository'

export function createEmptyGroup(name: string): CharacterGroup {
  const now = nowIso()
  return {
    id: createId('group'),
    name: name.trim() || 'Novo grupo',
    createdAt: now,
    updatedAt: now,
  }
}

export function createGroupStash(group: CharacterGroup): SharedStash {
  const now = nowIso()
  return {
    id: createId('stash'),
    name: `Baú — ${group.name}`,
    groupId: group.id,
    coinsCp: 0,
    equipment: [],
    createdAt: now,
    updatedAt: now,
  }
}

export function emptyMesaStash(): SharedStash {
  const now = nowIso()
  return {
    id: MESA_STASH_ID,
    name: MESA_STASH_NAME,
    groupId: null,
    coinsCp: 0,
    equipment: [],
    createdAt: now,
    updatedAt: now,
  }
}

export async function listGroups(): Promise<CharacterGroup[]> {
  const rows = await db.characterGroups.toArray()
  return rows.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
}

export async function saveGroup(group: CharacterGroup): Promise<CharacterGroup> {
  const next = { ...group, updatedAt: nowIso() }
  await db.characterGroups.put(next)
  return next
}

export async function listStashes(): Promise<SharedStash[]> {
  await ensureMesaStash()
  const rows = await db.sharedStashes.toArray()
  return rows.sort((a, b) => {
    if (a.id === MESA_STASH_ID) return -1
    if (b.id === MESA_STASH_ID) return 1
    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

export async function getStash(id: string): Promise<SharedStash | undefined> {
  if (id === MESA_STASH_ID) await ensureMesaStash()
  return db.sharedStashes.get(id)
}

export async function saveStash(stash: SharedStash): Promise<SharedStash> {
  const next = { ...stash, updatedAt: nowIso() }
  await db.sharedStashes.put(next)
  return next
}

export async function ensureMesaStash(): Promise<SharedStash> {
  const existing = await db.sharedStashes.get(MESA_STASH_ID)
  if (existing) return existing
  const created = emptyMesaStash()
  await db.sharedStashes.put(created)
  return created
}

export async function createGroupWithStash(
  name: string,
): Promise<{ group: CharacterGroup; stash: SharedStash }> {
  const group = await saveGroup(createEmptyGroup(name))
  const stash = await saveStash(createGroupStash(group))
  return { group, stash }
}

export async function renameGroup(
  id: string,
  name: string,
): Promise<CharacterGroup> {
  const group = await db.characterGroups.get(id)
  if (!group) throw new Error('Grupo não encontrado.')
  const nextName = name.trim() || group.name
  const saved = await saveGroup({ ...group, name: nextName })
  const stashes = await db.sharedStashes.where('groupId').equals(id).toArray()
  await Promise.all(
    stashes.map((stash) => {
      if (stash.name !== `Baú — ${group.name}`) return Promise.resolve()
      return saveStash({ ...stash, name: `Baú — ${nextName}` })
    }),
  )
  return saved
}

export async function moveCharacterToGroup(
  characterId: string,
  groupId: string | null,
): Promise<void> {
  const character = await db.characters.get(characterId)
  if (!character) throw new Error('Personagem não encontrado.')
  await db.characters.put({
    ...character,
    groupId,
    updatedAt: nowIso(),
  })
}

export async function moveCharactersToGroup(
  characterIds: string[],
  groupId: string | null,
): Promise<void> {
  await db.transaction('rw', db.characters, async () => {
    for (const id of characterIds) {
      const character = await db.characters.get(id)
      if (!character) continue
      await db.characters.put({
        ...character,
        groupId,
        updatedAt: nowIso(),
      })
    }
  })
}

export async function mergeStashIntoMesa(stash: SharedStash): Promise<void> {
  if (stash.id === MESA_STASH_ID) return
  const mesa = await ensureMesaStash()
  await saveStash({
    ...mesa,
    coinsCp: (mesa.coinsCp ?? 0) + (stash.coinsCp ?? 0),
    equipment: [...(mesa.equipment ?? []), ...(stash.equipment ?? [])],
  })
  await db.sharedStashes.delete(stash.id)
}

/**
 * @param deleteCharacters — se true, apaga as fichas do grupo; senão elas ficam órfãs.
 */
export async function deleteGroup(
  id: string,
  options: { deleteCharacters: boolean },
): Promise<void> {
  const members = await db.characters.where('groupId').equals(id).toArray()
  const stashes = await db.sharedStashes.where('groupId').equals(id).toArray()

  if (options.deleteCharacters) {
    for (const member of members) {
      await deleteCharacter(member.id)
    }
    for (const stash of stashes) {
      await db.sharedStashes.delete(stash.id)
    }
  } else {
    await moveCharactersToGroup(
      members.map((m) => m.id),
      null,
    )
    for (const stash of stashes) {
      await mergeStashIntoMesa(stash)
    }
  }

  await db.characterGroups.delete(id)
}
