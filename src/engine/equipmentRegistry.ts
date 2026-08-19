import type { ItemDefinition } from '@/types/equipment'

/** Homebrew carregado do Dexie — o catálogo oficial continua nos seeds. */
let homebrewItems: ItemDefinition[] = []

export function setHomebrewItems(list: ItemDefinition[]): void {
  homebrewItems = list.filter((item) => item.provenance?.type === 'homebrew')
  void import('./training').then((m) => m.invalidateWeaponNameIndex())
}

export function getHomebrewItems(): ItemDefinition[] {
  return homebrewItems
}
