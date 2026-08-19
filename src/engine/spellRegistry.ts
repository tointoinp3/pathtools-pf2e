import type { Spell } from '@/types/spell'

/** Homebrew carregado do Dexie — o catálogo oficial continua nos seeds. */
let homebrewSpells: Spell[] = []

export function setHomebrewSpells(list: Spell[]): void {
  homebrewSpells = list.filter((spell) => spell.provenance?.type === 'homebrew')
}

export function getHomebrewSpells(): Spell[] {
  return homebrewSpells
}
