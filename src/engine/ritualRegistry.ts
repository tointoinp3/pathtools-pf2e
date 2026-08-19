import type { Ritual } from '@/types/ritual'

/** Homebrew carregado do Dexie — o catálogo oficial continua nos seeds. */
let homebrewRituals: Ritual[] = []

export function setHomebrewRituals(list: Ritual[]): void {
  homebrewRituals = list.filter(
    (ritual) => ritual.provenance?.type === 'homebrew',
  )
}

export function getHomebrewRituals(): Ritual[] {
  return homebrewRituals
}
