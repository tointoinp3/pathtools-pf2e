import type {
  AnimalCompanionTypeDefinition,
  EidolonTypeDefinition,
  FamiliarFormDefinition,
  HomebrewCompanionRecord,
  SpecificFamiliarDefinition,
} from '@/types/companion'

/** Homebrew carregado do Dexie — o catálogo oficial continua nos seeds. */
let homebrewAnimals: AnimalCompanionTypeDefinition[] = []
let homebrewEidolons: EidolonTypeDefinition[] = []
let homebrewForms: FamiliarFormDefinition[] = []
let homebrewSpecifics: SpecificFamiliarDefinition[] = []
let homebrewRecords: HomebrewCompanionRecord[] = []

export function setHomebrewCompanions(list: HomebrewCompanionRecord[]): void {
  homebrewRecords = list.filter((r) => r.provenance.type === 'homebrew')
  homebrewAnimals = []
  homebrewEidolons = []
  homebrewForms = []
  homebrewSpecifics = []
  for (const record of homebrewRecords) {
    switch (record.catalogKind) {
      case 'animal':
        homebrewAnimals.push(record)
        break
      case 'eidolon':
        homebrewEidolons.push(record)
        break
      case 'familiarForm':
        homebrewForms.push(record)
        break
      case 'specificFamiliar':
        homebrewSpecifics.push(record)
        break
    }
  }
}

export function getHomebrewCompanionRecords(): HomebrewCompanionRecord[] {
  return homebrewRecords
}

export function getHomebrewAnimalCompanionTypes(): AnimalCompanionTypeDefinition[] {
  return homebrewAnimals
}

export function getHomebrewEidolonTypes(): EidolonTypeDefinition[] {
  return homebrewEidolons
}

export function getHomebrewFamiliarForms(): FamiliarFormDefinition[] {
  return homebrewForms
}

export function getHomebrewSpecificFamiliars(): SpecificFamiliarDefinition[] {
  return homebrewSpecifics
}
