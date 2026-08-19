import type { Character, CharacterGroup, SharedStash } from '@/types'
import { MESA_STASH_ID } from '@/types'

export function filterCharactersByActiveGroups(
  characters: Character[],
  groups: CharacterGroup[],
  activeGroupIds: string[],
): Character[] {
  if (groups.length === 0 || activeGroupIds.length === 0) return characters
  const active = new Set(
    activeGroupIds.filter((id) => groups.some((group) => group.id === id)),
  )
  if (active.size === 0) return characters
  return characters.filter(
    (character) => character.groupId != null && active.has(character.groupId),
  )
}

export function filterStashesByActiveGroups(
  stashes: SharedStash[],
  groups: CharacterGroup[],
  activeGroupIds: string[],
): SharedStash[] {
  const mesa = stashes.filter((stash) => stash.id === MESA_STASH_ID)
  const others = stashes.filter((stash) => stash.id !== MESA_STASH_ID)
  if (groups.length === 0 || activeGroupIds.length === 0) {
    return [...mesa, ...others]
  }
  const active = new Set(
    activeGroupIds.filter((id) => groups.some((group) => group.id === id)),
  )
  if (active.size === 0) return [...mesa, ...others]
  return [
    ...mesa,
    ...others.filter(
      (stash) => stash.groupId != null && active.has(stash.groupId),
    ),
  ]
}

/** Se há exatamente um grupo ativo, novas fichas entram nele. */
export function soleActiveGroupId(
  groups: CharacterGroup[],
  activeGroupIds: string[],
): string | null {
  if (groups.length === 0) return null
  const valid = activeGroupIds.filter((id) =>
    groups.some((group) => group.id === id),
  )
  return valid.length === 1 ? (valid[0] ?? null) : null
}
