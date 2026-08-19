import type { AttributeId, Provenance, Rarity, SkillId } from './core'
import type { CreatureSize } from './ancestry'
import type { SpellTradition } from './spell'

/** Tipo de entrada homebrew no catálogo de companheiros. */
export type CompanionCatalogKind =
  | 'animal'
  | 'eidolon'
  | 'familiarForm'
  | 'specificFamiliar'

export const COMPANION_CATALOG_KIND_LABELS: Record<
  CompanionCatalogKind,
  string
> = {
  animal: 'Companheiro animal',
  eidolon: 'Eidolon',
  familiarForm: 'Forma de familiar',
  specificFamiliar: 'Familiar específico',
}

export function isHomebrewCompanion(item: {
  provenance?: Provenance
}): boolean {
  return item.provenance?.type === 'homebrew'
}

/** Papel do companheiro nas regras Remaster (Player Core / Guns & Gears). */
export type CompanionKind =
  | 'animalCompanion'
  | 'familiar'
  | 'pet'
  | 'constructCompanion'
  | 'eidolon'

/**
 * Progressão do companheiro construto (Inventor — Guns & Gears Remastered).
 * prototype → advanced → incredible → paragon
 */
export type ConstructCompanionStage =
  | 'prototype'
  | 'advanced'
  | 'incredible'
  | 'paragon'

export type ConstructModificationTier =
  | 'initial'
  | 'breakthrough'
  | 'revolutionary'

/**
 * Progressão de companheiro animal.
 * young → mature → (nimble | savage) → specialized
 */
export type AnimalCompanionStage =
  | 'young'
  | 'mature'
  | 'nimble'
  | 'savage'
  | 'specialized'

export type AnimalCompanionSpecialization =
  | 'ambusher'
  | 'bully'
  | 'daredevil'
  | 'racer'
  | 'tracker'
  | 'wrecker'

/** Categoria de habilidade de familiar / pet. */
export type FamiliarAbilityKind = 'familiar' | 'master' | 'pet'

/**
 * Entrada de catálogo de habilidade (não é ficha de criatura).
 * Fonte principal: Player Core + Pet feat (AoN Familiars).
 */
export interface FamiliarAbilityDefinition {
  id: string
  name: string
  originalName: string
  kind: FamiliarAbilityKind
  description: string
  source: string
  /**
   * Troca o traço da criatura (animal → construct/plant/…).
   * No máximo uma dessas por familiar.
   */
  changesCreatureTrait?: boolean
  /** Nível mínimo do mestre para selecionar */
  minLevel?: number
  /** Dica de pré-requisito (texto livre por enquanto) */
  prerequisiteHint?: string
  /** Pode ser escolhida mais de uma vez (ex.: Skilled) */
  repeatable?: boolean
}

/** Seleção diária (ou fixa, no caso de pet) de uma habilidade. */
export interface FamiliarAbilitySelection {
  abilityId: string
  /** Para habilidades repetíveis / com escolha (ex.: perícia do Skilled) */
  optionNote?: string
  /**
   * Habilidade inata da forma (ex.: voar de um corvo) — conta no limite
   * e não pode ser trocada nas preparações.
   */
  innate?: boolean
}

/** Ataque desarmado do tipo de companheiro (ficha jovem). */
export interface CompanionUnarmedAttack {
  id: string
  name: string
  originalName: string
  traits: string[]
  /** Ex.: "1d8" — o motor multiplica dados no avanço */
  damageDie: `${number}d${number}`
  damageType: string
  /** Usa Destreza se maior (traço finesse) */
  finesse?: boolean
}

/** Velocidades em pés (como no AoN). */
export interface CompanionSpeeds {
  land?: number
  climb?: number
  fly?: number
  burrow?: number
  swim?: number
}

/**
 * Ficha de tipo no catálogo (Companions.aspx).
 * Stats = companheiro jovem; avanço aplica-se no motor.
 */
export interface AnimalCompanionTypeDefinition {
  id: string
  name: string
  originalName: string
  description: string
  source: string
  provenance?: Provenance
  sourceId?: string
  createdAt?: string
  updatedAt?: string
  /** Tamanho do companheiro jovem */
  size: CreatureSize
  traits: string[]
  attributes: Record<AttributeId, number>
  /** PV de “ancestralidade” do tipo (somados a (6+CON)×nível) */
  ancestryHitPoints: number
  /** Perícia extra treinada do tipo. Null = sem perícia (ex.: sem mente). */
  skill?: SkillId | null
  senses: string[]
  speeds: CompanionSpeeds
  /** Especial de montaria do tipo */
  isMount?: boolean
  /** Companheiro avançado (ex.: Howl of the Wild nv. 4+) */
  minLevel?: number
  special?: string
  attacks: CompanionUnarmedAttack[]
  supportBenefit: string
  advancedManeuver: {
    name: string
    originalName: string
    actionType: 'one' | 'two' | 'three' | 'free' | 'reaction'
    requirements?: string
    description: string
  }
}

/**
 * Estado de um companheiro animal.
 * `typeId` aponta para o catálogo de fichas.
 */
export interface AnimalCompanionState {
  id: string
  kind: 'animalCompanion'
  /** Nome de exibição (ex.: “Luna”) */
  name: string
  /** ID da ficha de tipo no catálogo — null até escolher */
  typeId: string | null
  /** Rótulo livre / cache do nome do tipo */
  typeLabel?: string
  stage: AnimalCompanionStage
  specialization?: AnimalCompanionSpecialization | null
  /** Tem a habilidade especial de montaria do tipo */
  isMount?: boolean
  currentHp?: number | null
  notes?: string
}

/**
 * Forma genérica de familiar / mascote (Tiny).
 * Stats são os do familiar; a forma só trava habilidades inatas.
 */
export interface FamiliarFormDefinition {
  id: string
  name: string
  originalName: string
  description: string
  source: string
  provenance?: Provenance
  sourceId?: string
  createdAt?: string
  updatedAt?: string
  /** Habilidades inatas da forma (contam nos slots; não trocam nas preparações). */
  innateAbilityIds: string[]
  traits?: string[]
}

/**
 * Familiar (mágico) ou Pet (feito Pet).
 * Regras: familiar OU pet — não os dois. Companheiro animal é independente.
 */
export interface FamiliarOrPetState {
  id: string
  kind: 'familiar' | 'pet'
  name: string
  /**
   * Nome da forma (preenchido pelo catálogo, ou texto livre em “Outra forma”).
   */
  formLabel?: string
  /** ID em `familiarForms` (`form-crow`, `form-custom`, …). */
  typeId: string | null
  /**
   * Slots de habilidade além do padrão (2).
   * Ex.: Enhanced Familiar (+2), tese de mago, etc. — ajuste manual até
   * o motor ler feitos automaticamente.
   */
  extraAbilitySlots?: number
  /**
   * Familiar: escolhidas nas preparações diárias.
   * Pet: duas fixas ao ganhar o pet (não trocam todo dia).
   */
  selectedAbilities: FamiliarAbilitySelection[]
  /**
   * Modificador de atributo de conjuração do mestre (para Percepção /
   * Acrobacia / Furtividade do familiar). Null = usar só 3 + nível.
   */
  spellcastingAttributeId?: AttributeId | null
  currentHp?: number | null
  notes?: string
}

/**
 * Companheiros do personagem.
 * Pode ter 1 companheiro animal OU 1 construto (não os dois),
 * e ao mesmo tempo 1 familiar OU 1 pet.
 */
export interface CharacterCompanions {
  animalCompanion?: AnimalCompanionState | null
  familiarOrPet?: FamiliarOrPetState | null
  constructCompanion?: ConstructCompanionState | null
  eidolon?: EidolonState | null
}

/**
 * Modificação de inovação construto (Guns & Gears Remastered).
 * Uma inicial no 1º; avanço no 7º; revolucionária no 15º.
 */
export interface ConstructModificationDefinition {
  id: string
  name: string
  originalName: string
  tier: ConstructModificationTier
  description: string
  source: string
  /** Ex.: Marvelous Gears exige Wonder Gears. */
  prerequisiteModificationId?: string
  minLevel?: number
}

/**
 * Ficha do companheiro construto na personagem.
 * Chassi único (protótipo); o motor aplica estágio + modificações.
 */
export interface ConstructCompanionState {
  id: string
  kind: 'constructCompanion'
  name: string
  stage: ConstructCompanionStage
  /** Pequeno ou Médio no protótipo; Grande com Increased Size ou Avançado+. */
  size: CreatureSize
  /** Dano do golpe ágil (1d6): cortante ou perfurante. */
  agileDamageType: 'cortante' | 'perfurante'
  /** Dano do lançador de projéteis, se a modificação estiver ativa. */
  projectileDamageType?: 'contundente' | 'perfurante'
  initialModificationId?: string | null
  breakthroughModificationId?: string | null
  revolutionaryModificationId?: string | null
  /** Duas perícias de INT ou CAR (Miracle Gears). */
  miracleGearsSkillIds?: [SkillId, SkillId] | null
  /** Turret Configuration: forma de torre (imóvel, d6, 60 pés). */
  turretMode?: boolean
  isMount?: boolean
  currentHp?: number | null
  notes?: string
}

/** Atributo-chave do eidolon (Impossible Magic): Força ou Destreza. */
export type EidolonKeyAttribute = 'strength' | 'dexterity'

/**
 * Ataque primário do eidolon (Impossible Magic — Unarmed Attacks).
 * O secundário é sempre 1d6 ágil + finesse.
 */
export type EidolonPrimaryAttackId =
  | 'd8-disarm'
  | 'd8-nonlethal'
  | 'd8-shove'
  | 'd8-trip'
  | 'd6-fatal'
  | 'd6-forceful'
  | 'd6-deadly'

export interface EidolonAbility {
  name: string
  originalName: string
  description: string
  actionType?: 'free' | 'reaction' | 'one' | 'two' | 'three'
}

/** Arranjo nomeado (Elemental / Enxame — livros anteriores ao IM). */
export interface EidolonNamedArray {
  id: string
  name: string
  originalName: string
  attributes: Record<AttributeId, number>
  acItemBonus: number
  dexCap: number
}

/**
 * Tipo de eidolon no catálogo (Impossible Magic / Rage of Elements / Battlecry!).
 * Stats = ficha inicial; o motor aplica proficiência pelo nível do invocador.
 * PV são compartilhados com o invocador — não há pool separado.
 */
export interface EidolonTypeDefinition {
  id: string
  name: string
  originalName: string
  description: string
  source: string
  provenance?: Provenance
  sourceId?: string
  createdAt?: string
  updatedAt?: string
  sourcePage?: number
  /** Omitido no Dragão — tradição escolhida na ficha. */
  tradition?: SpellTradition
  sizeOptions: CreatureSize[]
  traits: string[]
  homePlane: string
  language: string
  skills: SkillId[]
  /** Dragão: perícia extra conforme a tradição. */
  traditionSkillByTradition?: Partial<Record<SpellTradition, SkillId>>
  senses: string[]
  speeds: CompanionSpeeds
  suggestedAttacks: string
  /**
   * Con/Int/Sab/Car fixos (Impossible Magic).
   * Força/Destreza vêm do atributo-chave.
   */
  attributes?: Pick<
    Record<AttributeId, number>,
    'constitution' | 'intelligence' | 'wisdom' | 'charisma'
  >
  /** Se presente, usa arranjo nomeado em vez de atributo-chave. */
  namedArrays?: EidolonNamedArray[]
  initialAbility: EidolonAbility
  symbiosisAbility: EidolonAbility
  transcendenceAbility: EidolonAbility
  aonUrl?: string
}

export interface EidolonState {
  id: string
  kind: 'eidolon'
  name: string
  typeId: string | null
  typeLabel?: string
  keyAttribute: EidolonKeyAttribute
  /** Só Elemental / Enxame. */
  arrayId?: string | null
  size: CreatureSize
  primaryAttack: EidolonPrimaryAttackId
  primaryFormLabel: string
  secondaryFormLabel: string
  manifested?: boolean
  notes?: string
}

export const ANIMAL_COMPANION_STAGE_LABELS: Record<
  AnimalCompanionStage,
  string
> = {
  young: 'Jovem',
  mature: 'Maduro',
  nimble: 'Ágil',
  savage: 'Feroz',
  specialized: 'Especializado',
}

export const ANIMAL_SPECIALIZATION_LABELS: Record<
  AnimalCompanionSpecialization,
  string
> = {
  ambusher: 'Emboscador',
  bully: 'Valentão',
  daredevil: 'Temerário',
  racer: 'Corredor',
  tracker: 'Rastreador',
  wrecker: 'Demolidor',
}

export const COMPANION_KIND_LABELS: Record<CompanionKind, string> = {
  animalCompanion: 'Companheiro animal',
  familiar: 'Familiar',
  pet: 'Mascote',
  constructCompanion: 'Companheiro construto',
  eidolon: 'Eidolon',
}

export const CONSTRUCT_COMPANION_STAGE_LABELS: Record<
  ConstructCompanionStage,
  string
> = {
  prototype: 'Protótipo',
  advanced: 'Avançado',
  incredible: 'Incrível',
  paragon: 'Paragão',
}

export const CONSTRUCT_MODIFICATION_TIER_LABELS: Record<
  ConstructModificationTier,
  string
> = {
  initial: 'Inicial',
  breakthrough: 'Avanço (7º)',
  revolutionary: 'Revolucionária (15º)',
}

/** HP base por nível (Pet / Familiar Remaster — 5 × nível). */
export const FAMILIAR_HP_PER_LEVEL = 5
/** Bônus do pet ability Tough */
export const TOUGH_HP_PER_LEVEL = 2
/** Slots padrão de habilidade (familiar diário / pet fixo) */
export const DEFAULT_FAMILIAR_ABILITY_SLOTS = 2

export const FAMILIAR_ABILITY_KIND_LABELS: Record<FamiliarAbilityKind, string> =
  {
    familiar: 'Familiar',
    master: 'Mestre',
    pet: 'Mascote',
  }

/** Habilidade concedida por um familiar específico (pode apontar ao catálogo). */
export interface SpecificFamiliarGrantedAbility {
  abilityId?: string
  label: string
  note?: string
}

/** Poder extra do tipo (além das habilidades concedidas). */
export interface SpecificFamiliarSpecialAbility {
  name: string
  originalName: string
  actionType?: 'one' | 'two' | 'three' | 'free' | 'reaction'
  description: string
}

/**
 * Familiar específico (AoN Specific Familiars).
 * Consulta no compêndio; a ficha ainda monta o familiar por habilidades.
 */
export interface SpecificFamiliarDefinition {
  id: string
  name: string
  originalName: string
  description: string
  source: string
  provenance?: Provenance
  sourceId?: string
  createdAt?: string
  updatedAt?: string
  traits: string[]
  rarity?: Rarity
  requiredAbilities: number
  grantedAbilities: SpecificFamiliarGrantedAbility[]
  specialAbilities: SpecificFamiliarSpecialAbility[]
  accessHint?: string
}

interface CompanionHomebrewFields {
  provenance: Provenance
  sourceId?: string
  createdAt?: string
  updatedAt?: string
}

/** Registro Dexie: definição de catálogo + metadados homebrew. */
export type HomebrewCompanionRecord =
  | (AnimalCompanionTypeDefinition &
      CompanionHomebrewFields & { catalogKind: 'animal' })
  | (EidolonTypeDefinition &
      CompanionHomebrewFields & { catalogKind: 'eidolon' })
  | (FamiliarFormDefinition &
      CompanionHomebrewFields & { catalogKind: 'familiarForm' })
  | (SpecificFamiliarDefinition &
      CompanionHomebrewFields & { catalogKind: 'specificFamiliar' })
