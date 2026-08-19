import type { Deity } from '@/types/deity'

/** Homebrew carregado do Dexie — o catálogo oficial continua nos seeds. */
let homebrewDeities: Deity[] = []

export function setHomebrewDeities(list: Deity[]): void {
  homebrewDeities = list.filter((deity) => deity.provenance?.type === 'homebrew')
}

export function getHomebrewDeities(): Deity[] {
  return homebrewDeities
}
