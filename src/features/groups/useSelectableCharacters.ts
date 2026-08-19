import { useMemo } from 'react'
import { useCharacterStore } from '@/stores/characterStore'
import { useGroupStore } from '@/stores/groupStore'
import { useStashStore } from '@/stores/stashStore'
import {
  filterCharactersByActiveGroups,
  filterStashesByActiveGroups,
} from '@/features/groups/groupFilter'
import type { Character, SharedStash } from '@/types'

/** Fichas que aparecem nos menus de saque / inventário da mesa. */
export function useSelectableCharacters(): Character[] {
  const characters = useCharacterStore((s) => s.characters)
  const groups = useGroupStore((s) => s.groups)
  const activeGroupIds = useGroupStore((s) => s.activeGroupIds)
  return useMemo(
    () => filterCharactersByActiveGroups(characters, groups, activeGroupIds),
    [characters, groups, activeGroupIds],
  )
}

export function useSelectableStashes(): SharedStash[] {
  const stashes = useStashStore((s) => s.stashes)
  const groups = useGroupStore((s) => s.groups)
  const activeGroupIds = useGroupStore((s) => s.activeGroupIds)
  return useMemo(
    () => filterStashesByActiveGroups(stashes, groups, activeGroupIds),
    [stashes, groups, activeGroupIds],
  )
}
