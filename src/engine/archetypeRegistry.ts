import type { Archetype } from '@/types'

/** Homebrew carregado do Dexie — o catálogo oficial continua nos seeds. */
let homebrewArchetypes: Archetype[] = []

export function setHomebrewArchetypes(list: Archetype[]): void {
  homebrewArchetypes = list.filter((a) => a.provenance.type === 'homebrew')
}

export function getHomebrewArchetypes(): Archetype[] {
  return homebrewArchetypes
}
