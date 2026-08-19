import type { Creature } from '@/types/creature'

/** Homebrew carregado do Dexie — o catálogo oficial continua nos seeds. */
let homebrewCreatures: Creature[] = []

export function setHomebrewCreatures(list: Creature[]): void {
  homebrewCreatures = list.filter(
    (creature) => creature.provenance?.type === 'homebrew',
  )
}

export function getHomebrewCreatures(): Creature[] {
  return homebrewCreatures
}
