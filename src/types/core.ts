/** Atributos do Pathfinder 2e Remaster */
export type AttributeId =
  | 'strength'
  | 'dexterity'
  | 'constitution'
  | 'intelligence'
  | 'wisdom'
  | 'charisma'

export const ATTRIBUTE_IDS: AttributeId[] = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
]

/** Graus de proficiência */
export type ProficiencyRank =
  | 'untrained'
  | 'trained'
  | 'expert'
  | 'master'
  | 'legendary'

export const PROFICIENCY_RANKS: ProficiencyRank[] = [
  'untrained',
  'trained',
  'expert',
  'master',
  'legendary',
]

/** Raridade de conteúdo */
export type Rarity = 'common' | 'uncommon' | 'rare' | 'unique'

export const RARITIES: Rarity[] = ['common', 'uncommon', 'rare', 'unique']

/** Procedência do conteúdo — única diferença entre oficial e homebrew */
export type ProvenanceType = 'official' | 'homebrew'

export interface Provenance {
  type: ProvenanceType
}

/** Tipo de fonte de conteúdo */
export type ContentSourceType = 'official' | 'homebrew'

/** Fonte reutilizável (Player Core, homebrew, etc.) */
export interface ContentSource {
  id: string
  name: string
  type: ContentSourceType
  author?: string
  createdAt?: string
  updatedAt?: string
}

/** Perícias gerais */
export type SkillId =
  | 'acrobatics'
  | 'arcana'
  | 'athletics'
  | 'crafting'
  | 'deception'
  | 'diplomacy'
  | 'intimidation'
  | 'medicine'
  | 'nature'
  | 'occultism'
  | 'performance'
  | 'religion'
  | 'society'
  | 'stealth'
  | 'survival'
  | 'thievery'

export const SKILL_IDS: SkillId[] = [
  'acrobatics',
  'arcana',
  'athletics',
  'crafting',
  'deception',
  'diplomacy',
  'intimidation',
  'medicine',
  'nature',
  'occultism',
  'performance',
  'religion',
  'society',
  'stealth',
  'survival',
  'thievery',
]

export const SKILL_ATTRIBUTES: Record<SkillId, AttributeId> = {
  acrobatics: 'dexterity',
  arcana: 'intelligence',
  athletics: 'strength',
  crafting: 'intelligence',
  deception: 'charisma',
  diplomacy: 'charisma',
  intimidation: 'charisma',
  medicine: 'wisdom',
  nature: 'wisdom',
  occultism: 'intelligence',
  performance: 'charisma',
  religion: 'wisdom',
  society: 'intelligence',
  stealth: 'dexterity',
  survival: 'wisdom',
  thievery: 'dexterity',
}
