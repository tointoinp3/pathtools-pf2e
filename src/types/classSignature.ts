import type { SpecialAbilityDefinition } from './ancestry'
import type { ClassCatalogSection } from './class'
import type {
  CatalogActiveEffect,
  InventorOverdriveState,
} from './catalogEffects'
import type { ProficiencyRank } from './core'

export interface MagusSignatureKit {
  charged: number
  maxCharges: number
  spellAttack: number | null
  rechargeNote: string
  doubleSpellstrike: boolean
  preparedAttackSpells: Array<{
    name: string
    originalName?: string
    rank: number
  }>
}

export interface KineticistBlastOption {
  id: string
  elementId: string
  elementName: string
  rangeType: 'melee' | 'ranged'
  rangeFeet: number
  dice: number
  die: string
  damageTypeLabels: string[]
  attackBonus: number | null
  meleeDamageBonus: number
  twoActionBonus: number
}

export interface KineticistImpulseEntry {
  id: string
  name: string
  actionType?: SpecialAbilityDefinition['actionType']
  traits: string[]
  description: string
  overflow: boolean
}

export interface KineticistSignatureKit {
  auraActive: boolean
  elements: string[]
  impulseAttack: number | null
  classDc: number | null
  blasts: KineticistBlastOption[]
  impulses: KineticistImpulseEntry[]
}

export interface NecromancerSignatureKit {
  count: number
  strikeDice: number
  spellAttack: number | null
  speedFeet: number
  methodLabel?: string
  fascinationLabel?: string
  extraOnCreate: boolean
}

export interface CatalogSignatureItem {
  id: string
  optionId?: string
  name: string
  catalogLabel: string
  role: 'pick' | 'prepared' | 'primary'
  actionType?: SpecialAbilityDefinition['actionType']
  rulesSummary: string
  description: string
  sections: ClassCatalogSection[]
  activeEffects?: CatalogActiveEffect[]
  /** Chave em classTrackers.kitToggles (ex.: etched:rune-holtrik). */
  toggleKey?: string
  toggled?: boolean
}

export interface InventorSignatureKit {
  overdrive: InventorOverdriveState
  damageBonus: number
  craftingRank: ProficiencyRank
  overdriveDc: number
  checkLabel: string
}

export interface ExemplarSignatureKit {
  sparkIkonId: string | null
  ikons: Array<{ id: string; name: string; empowered: boolean }>
}

export interface ThaumaturgeSignatureKit {
  exploitActive: boolean
  antithesis: number
  implementInHand: boolean
  empowermentPerDie: number
  exploitDc: number
}

export interface RunesmithSignatureKit {
  etchedIds: string[]
}

export interface AlchemistSignatureKit {
  vials: number
  vialsMax: number
}

export interface CommanderSignatureKit {
  squadSize: number
}

export interface EidolonSignatureAbility {
  name: string
  description: string
  actionType?: SpecialAbilityDefinition['actionType']
  tier: 'initial' | 'symbiosis' | 'transcendence'
  unlocked: boolean
}

export interface EidolonSignatureKit {
  name: string
  typeName: string
  ac: number
  attacks: Array<{
    id: string
    name: string
    attackModifier: number
    damageLabel: string
    damageType: string
    traits: string[]
  }>
  abilities: EidolonSignatureAbility[]
}

export interface ClassSignatureKit {
  magus?: MagusSignatureKit
  kineticist?: KineticistSignatureKit
  necromancer?: NecromancerSignatureKit
  inventor?: InventorSignatureKit
  exemplar?: ExemplarSignatureKit
  thaumaturge?: ThaumaturgeSignatureKit
  runesmith?: RunesmithSignatureKit
  alchemist?: AlchemistSignatureKit
  commander?: CommanderSignatureKit
  catalog: CatalogSignatureItem[]
  eidolon?: EidolonSignatureKit
}
