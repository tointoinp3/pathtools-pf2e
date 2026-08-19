import type { EquipmentItem } from './equipment'

/** Campanha / mesa: várias fichas juntas. */
export interface CharacterGroup {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

/** Baú compartilhado da mesa ou de um grupo. */
export interface SharedStash {
  id: string
  name: string
  /** `null` = baú geral da mesa (sem grupo). */
  groupId: string | null
  coinsCp: number
  equipment: EquipmentItem[]
  createdAt: string
  updatedAt: string
}

export const MESA_STASH_ID = 'stash-mesa'
export const MESA_STASH_NAME = 'Baú da mesa'
