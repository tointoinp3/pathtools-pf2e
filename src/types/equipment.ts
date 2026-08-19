import type { AttackProficiencyCategory, DefenseProficiencyCategory } from './class'
import type { AttributeId, ProficiencyRank, Provenance, Rarity, SkillId } from './core'
import type { SpellRank } from './spell'

/**
 * Equipamento Pathfinder 2e Remaster.
 * Campos alinhados ao Archives of Nethys (Equipment.aspx) e ao Player Core cap. 6.
 * Catálogo = ItemDefinition. Ficha = EquipmentItem (instância).
 */

/** Categoria do AoN, agrupada para a ficha (não inclui Services / Structures / Vehicles). */
export type ItemCategory =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'rune'
  | 'staff'
  | 'wand'
  | 'worn'
  | 'held'
  | 'consumable'
  | 'alchemical'
  | 'adventuringGear'
  | 'ammunition'
  | 'material'
  | 'snare'
  | 'grimoire'
  | 'spellheart'
  | 'apex'
  | 'tattoo'
  | 'assistive'
  | 'other'

/** Onde o item “mora” na ficha (inventário). Derivado da categoria do catálogo. */
export type EquipmentSlot =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'accessory'
  | 'worn'
  | 'held'
  | 'consumable'
  | 'magic'
  | 'other'

/** Bulk do Player Core: negligible / Light (L) / Bulk inteiro. 10 L = 1 Bulk. */
export type BulkValue =
  | { unit: 'negligible' }
  | { unit: 'light'; count: number }
  | { unit: 'bulk'; count: number }

export type WeaponHands = '1' | '1+' | '2'

export type WeaponGroupId =
  | 'axe'
  | 'bomb'
  | 'bow'
  | 'brawling'
  | 'club'
  | 'crossbow'
  | 'dart'
  | 'firearm'
  | 'flail'
  | 'hammer'
  | 'knife'
  | 'pick'
  | 'polearm'
  | 'shield'
  | 'sling'
  | 'spear'
  | 'sword'

export type ArmorGroupId =
  | 'cloth'
  | 'leather'
  | 'chain'
  | 'composite'
  | 'plate'
  | 'wood'
  | 'skeletal'

export type DamageTypeId =
  | 'bludgeoning'
  | 'piercing'
  | 'slashing'
  | 'acid'
  | 'cold'
  | 'electricity'
  | 'fire'
  | 'sonic'
  | 'spirit'
  | 'vitality'
  | 'void'
  | 'mental'
  | 'poison'
  | 'bleed'
  | 'untyped'

/** Como o item é usado (campo Usage do AoN). */
export type ItemUsage =
  | 'held'
  | 'worn'
  | 'worn-armor'
  | 'etched-weapon'
  | 'etched-armor'
  | 'etched-shield'
  | 'affixed'
  | 'installed'
  | 'other'

export type RuneKind = 'fundamental' | 'property'
export type RuneAppliesTo = 'weapon' | 'armor' | 'shield'

export type RuneUsageRestriction =
  | 'melee'
  | 'ranged'
  | 'thrown'
  | 'melee-piercing-or-slashing'
  | 'melee-bludgeoning'
  | 'melee-slashing'
  | 'armor-light'
  | 'armor-light-or-medium'
  | 'armor-medium-or-heavy'
  | 'not-unholy'
  | 'not-holy'

export interface RuneExtraDamage {
  /** Ex.: "1d6" */
  dice: string
  damageType: DamageTypeId | string
  when?: 'hit' | 'crit'
  persistent?: boolean
  /** Texto extra (ex.: "contra mortos-vivos") */
  note?: string
}

export interface RuneReinforcing {
  hardness: number
  hp: number
  bt: number
  maxHardness: number
  maxHp: number
  maxBt: number
}

export interface WeaponStats {
  /** Proficiência: simples / marcial / avançada / desarmada */
  proficiency: AttackProficiencyCategory
  rangeType: 'melee' | 'ranged'
  /** Ex.: "1d8", "1" (zarabatana) ou "Varies" (bomba alquímica) */
  damageDie: string
  damageType: DamageTypeId | string
  group: WeaponGroupId
  /** Ausente em munição */
  hands?: WeaponHands
  /** Incremento de alcance em pés (armas à distância / arremesso) */
  range?: number
  /** Ações para recarregar; 0 = não recarrega */
  reload?: number
  magazine?: number
  /**
   * Outro modo de uma arma Combination (ex.: `weapon-344-melee`).
   * Se omitido, o motor liga `…-ranged` ↔ `…-melee` pelo id.
   */
  combinationPartnerId?: string
}

export interface ArmorStats {
  category: DefenseProficiencyCategory
  /** Bônus de item na CA (Player Core: AC Bonus) */
  acBonus: number
  /** Teto do modificador de Destreza; null = sem teto */
  dexCap: number | null
  /** Penalidade de teste (0 ou negativa). Some se FOR ≥ strength. */
  checkPenalty: number
  /** Penalidade de deslocamento em pés (0, −5 ou −10). */
  speedPenalty: number
  /**
   * Limiar de Força — Remaster usa o *modificador*, não o valor.
   * Player Core pg. 271. null = sem limiar.
   */
  strength: number | null
  group?: ArmorGroupId
}

export interface ShieldStats {
  /** Bônus de circunstância na CA ao Erguer o Escudo */
  acBonus: number
  /** Penalidade de deslocamento enquanto segura o escudo */
  speedPenalty: number
  hardness: number
  hp: number
  /** Broken Threshold */
  bt: number
}

export interface RuneStats {
  kind: RuneKind
  appliesTo: RuneAppliesTo[]
  /** Potency +1 / +2 / +3 (fundamental de arma ou armadura) */
  potency?: number
  /** Dados extras de Striking / Greater / Major (1 / 2 / 3) */
  strikingDice?: number
  /** Bônus de item em salvaguardas (Resilient / Greater / Major) */
  resilientBonus?: number
  /** Slots de propriedade que esta runa ocupa (em geral 1; fundamentais = 0) */
  propertySlots?: number
  /**
   * Família: só uma runa por família no item (a mais forte vale).
   * Ex.: "weapon-potency", "striking", "flaming", "energy-resist-fire".
   */
  family: string
  /** Rótulo curto no nome do item: "+1", "impactante", "flamejante" */
  shortLabel: string
  extraDamage?: RuneExtraDamage[]
  grantedTraits?: string[]
  reinforcing?: RuneReinforcing
  usageRestriction?: RuneUsageRestriction
  exclusiveFamilies?: string[]
  /** Ajuste de Bulk da armadura (fortificação +1) */
  bulkAdjust?: number
  /** Ajuste no limiar de Força da armadura (fortificação +1) */
  strengthAdjust?: number
  /** Bônus de item em perícia enquanto a armadura está investida */
  skillBonus?: { skillId: SkillId; value: number }
  /** Resistência a um tipo de dano (resistente a energia) */
  energyResistance?: { damageType: DamageTypeId | string; value: number }
}

export interface StaffSpellEntry {
  rank: number
  spellIds: string[]
  spellNames: string[]
}

export interface StaffStats {
  /** Magias deste grau, já incluindo as dos graus inferiores. */
  spellsByRank: StaffSpellEntry[]
  /** Bônus ao empunhar (ex.: +2 de circunstância em Natureza para identificar animais) */
  wieldNote?: string
  /** Cajado da Cura: bônus de item nos PV restaurados por curar */
  healItemBonus?: number
}

export type WandKind = 'generic' | 'continuation' | 'widening' | 'shardstorm'

export interface WandStats {
  spellRank: Exclude<SpellRank, 0>
  kind?: WandKind
  /** Varinha que sempre contém esta magia (ex.: saraivada de força). */
  fixedSpellId?: string
  /** Texto curto da alteração (duração +50%, área maior, mísseis extras). */
  effectNote?: string
  /** A ativação gasta mais ações que a magia normal. */
  extraCastActions?: string
}

export type AlchemicalKind = 'bomb' | 'elixir' | 'mutagen' | 'tool' | 'poison'

export type PoisonExposure = 'injury' | 'ingested' | 'inhaled' | 'contact'

export interface PoisonStage {
  duration: string
  effect: string
}

export interface AlchemicalPoisonStats {
  exposure: PoisonExposure
  dc: number
  onset?: string
  maxDuration?: string
  virulent?: boolean
  stages: PoisonStage[]
  hands?: '1' | '2'
  extraNote?: string
}

export type ConsumableKind = 'potion' | 'oil'

export type TalismanHost =
  | 'weapon'
  | 'melee-weapon'
  | 'metal-weapon'
  | 'armor'
  | 'shield'
  | 'weapon-or-shield'
  | 'armor-or-weapon'
  | 'metal-armor-or-weapon'
  | 'non-metal-armor-or-weapon'

export interface TalismanStats {
  affixesTo: TalismanHost
  activate: string
  trigger?: string
  requirements?: string
  note: string
  /** Cristal de potência: runas temporárias até o fim do turno. */
  potencyRuneIds?: string[]
  /** Orbe de liga: materiais à escolha na ativação. */
  alloyMaterials?: string[]
  maxWeaponLevel?: number | null
}

export interface ScrollStats {
  spellRank: Exclude<SpellRank, 0>
}

export interface SnareStats {
  note: string
  save?: string
  craftRequirement?: string
}

export interface GrimoireStats {
  activate: string
  frequency: string
  note: string
}

export interface SpellheartStats {
  affixesTo: TalismanHost
  spellAttack?: number
  spellDc?: number
  armorBenefit: string
  weaponBenefit: string
  cantrip: string
  dailySpells?: string[]
}

export interface OilPotencyStats {
  duration: string
  weaponRuneIds: string[]
  armorRuneIds: string[]
}

export interface ConsumableStats {
  kind: ConsumableKind
  effectFamily?: AlchemicalEffectFamily | string
  hpDice?: string
  hpFlat?: number
  duration?: string
  note?: string
  speedBonus?: number
  oil?: OilPotencyStats
}

/** Família de efeito ativo: beber outro da mesma família substitui o anterior. */
export type AlchemicalEffectFamily =
  | 'mutagen'
  | 'antidote'
  | 'antiplague'
  | 'cheetah'
  | 'bravo'
  | 'eagle-eye'
  | 'cats-eye'
  | 'mistform'
  | 'elixir-of-life'
  | 'smoke'
  | 'glow-rod'
  | 'oil-potency'
  | 'silver-salve'
  | 'emergency-escape'
  | 'bombers-eye'
  | 'comprehension'
  | 'cooling'
  | 'darkvision'
  | 'sea-touch'
  | 'stone-fist'
  | 'witchwarg'

export interface AlchemicalBombStats {
  damageDie?: string
  damageType: DamageTypeId | string
  persistentFlat?: number
  persistentDice?: string
  splash?: number
  splashType?: DamageTypeId | string
  attackItemBonus?: number
  range?: number
  /** Efeito extra (ex.: desprevenido, penalidade de deslocamento) */
  hitEffect?: string
}

export interface AlchemicalElixirStats {
  hpDice?: string
  hpFlat?: number
  duration?: string
  skillBonus?: { skillId: SkillId; value: number }
  willBonus?: number
  willVsFear?: number
  perceptionBonus?: number
  speedBonus?: number
  fortVsPoison?: number
  fortVsDisease?: number
  note?: string
}

export interface AlchemicalUnarmedGrant {
  name: string
  damageDie: string
  damageType: DamageTypeId
  traits: string[]
}

export interface AlchemicalMutagenStats {
  duration: string
  benefit: string
  drawback: string
  itemBonus?: number
  skillBonuses?: Array<{ skillId: SkillId; value: number }>
  skillPenalties?: Array<{ skillId: SkillId; value: number }>
  saveBonuses?: Array<{ save: 'fortitude' | 'reflex' | 'will'; value: number }>
  savePenalties?: Array<{ save: 'fortitude' | 'reflex' | 'will'; value: number }>
  perceptionBonus?: number
  perceptionPenalty?: number
  unarmedAttackBonus?: number
  dexAttackBonus?: number
  attackPenalty?: number
  acItemBonus?: number
  dexCap?: number
  speedBonus?: number
  tempHp?: number
  bulkEncumberedAdjust?: number
  bulkMaxAdjust?: number
  loreBonus?: number
  unarmedAttacks?: AlchemicalUnarmedGrant[]
  extraNote?: string
  /** Ex.: Ímpeto final do coração de drake. */
  endActionLabel?: string
}

export interface AlchemicalToolStats {
  duration?: string
  note: string
}

export interface AlchemicalStats {
  kind: AlchemicalKind
  effectFamily?: AlchemicalEffectFamily
  bomb?: AlchemicalBombStats
  elixir?: AlchemicalElixirStats
  mutagen?: AlchemicalMutagenStats
  tool?: AlchemicalToolStats
  poison?: AlchemicalPoisonStats
}

/** Efeito de item consumível ainda ativo na ficha (mutagênico, elixir, etc.). */
export interface ActiveItemEffect {
  id: string
  definitionId: string
  name: string
  family: AlchemicalEffectFamily | string
  /** Arma ou armadura afetada (óleo, unguento de prata). */
  targetItemId?: string
}

export interface ResolvedActiveItemEffect {
  id: string
  definitionId: string
  name: string
  family: string
  duration?: string
  benefit?: string
  drawback?: string
  notes: string[]
  endActionLabel?: string
}

export interface AmmunitionStats {
  /** Grupos de arma que usam esta munição (arco, besta, funda…). */
  weaponGroups: WeaponGroupId[]
}

export interface ItemActivation {
  actionType?: 'free' | 'reaction' | 'one' | 'two' | 'three' | 'minutes'
  frequency?: string
  trigger?: string
}

/** Passivas e ativações de itens vestidos, segurados e ápice (GM Core). */
export interface WornMagicStats {
  skillBonuses?: Array<{ skillId: SkillId; value: number }>
  saveBonus?: number
  perceptionBonus?: number
  speedBonus?: number
  acItemBonus?: number
  dexCap?: number
  energyResistances?: Array<{ damageType: DamageTypeId | string; value: number }>
  extraBulkCapacity?: number
  apexAttribute?: AttributeId
  /** Faixas de golpes poderosos: hospedam runas de arma para ataques desarmados. */
  unarmedHost?: boolean
  doublingRings?: 'standard' | 'greater'
  /** Só o companheiro animal investe (ferraduras, coleiras, barda). */
  companionOnly?: boolean
  note?: string
  activate?: string
  frequency?: string
  slot?: string
  /** Ativações no formato AoN (nome, custo, frequência, efeito). */
  activations?: WornMagicActivation[]
}

export interface WornMagicActivation {
  name: string
  actionType?: 'free' | 'reaction' | 'one' | 'two' | 'three'
  /** Custo que não é ícone de ação (ex.: "10 minutos"). */
  timeCost?: string
  traits?: string[]
  frequency?: string
  trigger?: string
  requirements?: string
  effect: string
}

/**
 * Entrada do catálogo oficial ou homebrew.
 * Stats específicas ficam em `weapon` / `armor` / `shield` / `rune` / `staff`.
 */
export interface ItemDefinition {
  id: string
  name: string
  originalName: string
  category: ItemCategory
  /** Subcategoria do AoN (ex.: "Base Weapons", "Elixirs") */
  subcategory?: string
  level: number
  rarity: Rarity
  traits: string[]
  description: string
  source: string
  aonUrl?: string
  provenance?: Provenance
  sourceId?: string
  createdAt?: string
  updatedAt?: string
  /** Preço em peças de cobre. null = não vendido / preço variável. 1 po = 100 pc. */
  priceCp?: number | null
  bulk: BulkValue
  usage?: ItemUsage
  /** Precisa ser investido para funcionar (itens mágicos vestidos) */
  requiresInvestiture?: boolean
  weapon?: WeaponStats
  armor?: ArmorStats
  shield?: ShieldStats
  rune?: RuneStats
  staff?: StaffStats
  wand?: WandStats
  alchemical?: AlchemicalStats
  consumable?: ConsumableStats
  talisman?: TalismanStats
  scroll?: ScrollStats
  snare?: SnareStats
  grimoire?: GrimoireStats
  spellheart?: SpellheartStats
  ammunition?: AmmunitionStats
  wornMagic?: WornMagicStats
  activation?: ItemActivation
  /** Runas já gravadas ao criar a instância (ex.: cajado de poder arcano +1 impactante) */
  grantedRuneIds?: string[]
}

export function isHomebrewItem(item: { provenance?: Provenance }): boolean {
  return item.provenance?.type === 'homebrew'
}

/**
 * Item na ficha (inventário).
 * `definitionId` liga ao catálogo; sem ele, é anotação livre (fichas antigas).
 */
export interface EquipmentItem {
  id: string
  name: string
  slot: EquipmentSlot
  quantity: number
  invested?: boolean
  equipped?: boolean
  /** Bulk livre quando não há ficha de catálogo (ex.: "1", "L") */
  bulk?: string
  notes?: string
  /** ID no catálogo; null/omitido = item customizado */
  definitionId?: string | null
  /** Runas gravadas nesta instância (IDs do catálogo) */
  runeIds?: string[]
  /** Escudo erguido neste turno (ação Erguer o Escudo) */
  raised?: boolean
  /** Cargas atuais (cajado / varinha) */
  charges?: number
  /** Este cajado foi o preparado hoje (só um por dia) */
  preparedStaff?: boolean
  /** Vezes que a varinha foi sobrecarregada hoje */
  wandOvercharges?: number
  /** Magia escolhida numa varinha genérica */
  wandSpellId?: string | null
  /** Varinha destruída na sobrecarga */
  broken?: boolean
  /** Munição carregada nesta arma (id da pilha no inventário) */
  loadedAmmoItemId?: string | null
  /** Dose de veneno de ferimento aplicada nesta arma (id do catálogo) */
  appliedPoisonId?: string | null
  /** Runas temporárias (óleo de potência); somam às gravadas */
  temporaryRuneIds?: string[]
  /** Material precioso temporário (unguento de prata) */
  temporaryMaterial?: string | null
  /** Talismã afixado neste item (id do catálogo) */
  affixedTalismanId?: string | null
  /** Material escolhido no orbe de liga ao afixar */
  affixedTalismanMaterial?: string | null
  /** Magia gravada num pergaminho genérico */
  scrollSpellId?: string | null
  /**
   * Qual conjuração (classe/arquétipo) usa ataque e CD neste item
   * (varinha, pergaminho, cajado, coração de magia).
   */
  spellcastingSourceId?: string | null
  /** Este grimório foi o estudado hoje (só um por dia) */
  preparedGrimoire?: boolean
  /** Coração de magia afixado neste item (id do catálogo) */
  affixedSpellheartId?: string | null
}

export interface ResolvedRunes {
  potency: number
  strikingDice: number
  resilientBonus: number
  propertyCount: number
  propertyLimit: number
  labels: string[]
  shortLabels: string[]
  activeIds: string[]
  dormantIds: string[]
  extraDamage: RuneExtraDamage[]
  grantedTraits: string[]
  reinforcing: RuneReinforcing | null
  skillBonuses: Array<{ skillId: SkillId; value: number }>
  energyResistances: Array<{ damageType: string; value: number }>
  bulkAdjust: number
  strengthAdjust: number
  overLimit: boolean
}

export interface ResolvedInventoryItem {
  item: EquipmentItem
  definition: ItemDefinition | null
  displayName: string
  bulk: BulkValue
  bulkNumeric: number
  runes: ResolvedRunes
}

export interface ResolvedWornArmor {
  item: EquipmentItem
  definition: ItemDefinition
  stats: ArmorStats
  runes: ResolvedRunes
  itemBonus: number
  dexCap: number | null
  checkPenalty: number
  speedPenalty: number
  meetsStrength: boolean
  /** Armadura com runas só aplica magia se estiver investida. */
  magicActive: boolean
}

export interface ResolvedWieldedShield {
  item: EquipmentItem
  definition: ItemDefinition
  stats: ShieldStats
  runes: ResolvedRunes
  raised: boolean
}

export interface ResolvedWeaponAttack {
  item: EquipmentItem
  definition: ItemDefinition
  stats: WeaponStats
  runes: ResolvedRunes
  displayName: string
  attackBonus: number | null
  attackPending: boolean
  attackPendingReason?: string
  damageSummary: string
  /** Dados principais após Impactante, ex.: "2d8". Vazio se não der para rolar. */
  damageDice: string
  /** Força / propulsão no dano (bombas = 0). */
  damageModifier: number
  /** Dano extra do kit de classe (imanência, implemento…). */
  kitExtraDamage?: Array<{
    label: string
    amount: number
    damageType: string
    persistent?: boolean
  }>
  attributeId: AttributeId
  proficiencyRank: ProficiencyRank | null
  breakdown: Array<{ label: string; value: number | string }>
  /** Modo de arma Combination, se este Golpe for uma das duas configurações. */
  combinationMode?: 'melee' | 'ranged'
}

export interface ResolvedEquipment {
  items: ResolvedInventoryItem[]
  armor: ResolvedWornArmor | null
  shield: ResolvedWieldedShield | null
  weapons: ResolvedWeaponAttack[]
  bulkUsed: number
  bulkLimit: number
  bulkMaximum: number
  encumbered: boolean
  overloaded: boolean
  investedCount: number
  investmentLimit: number
  checkPenalty: number
  speedPenalty: number
  shieldAcBonus: number
}

export const EQUIPMENT_SLOT_LABELS: Record<EquipmentSlot, string> = {
  weapon: 'Arma',
  armor: 'Armadura',
  shield: 'Escudo',
  accessory: 'Acessório',
  worn: 'Vestido',
  held: 'Segurado',
  consumable: 'Consumível',
  magic: 'Mágico',
  other: 'Outro',
}

export const EQUIPMENT_SLOTS: EquipmentSlot[] = [
  'weapon',
  'armor',
  'shield',
  'worn',
  'held',
  'consumable',
  'accessory',
  'magic',
  'other',
]

export const TALISMAN_HOST_LABELS: Record<TalismanHost, string> = {
  weapon: 'arma',
  'melee-weapon': 'arma corpo a corpo',
  'metal-weapon': 'arma de metal',
  armor: 'armadura',
  shield: 'escudo',
  'weapon-or-shield': 'arma ou escudo',
  'armor-or-weapon': 'armadura ou arma',
  'metal-armor-or-weapon': 'armadura ou arma de metal',
  'non-metal-armor-or-weapon': 'armadura sem metal ou arma',
}

export const POISON_EXPOSURE_LABELS: Record<PoisonExposure, string> = {
  injury: 'Ferimento',
  ingested: 'Ingerido',
  inhaled: 'Inalado',
  contact: 'Contato',
}

export const ITEM_CATEGORY_LABELS: Record<ItemCategory, string> = {
  weapon: 'Armas',
  armor: 'Armaduras',
  shield: 'Escudos',
  rune: 'Runas',
  staff: 'Cajados',
  wand: 'Varinhas',
  worn: 'Itens vestidos',
  held: 'Itens segurados',
  consumable: 'Consumíveis',
  alchemical: 'Alquímicos',
  adventuringGear: 'Equipamento de aventura',
  ammunition: 'Munição',
  material: 'Materiais',
  snare: 'Ciladas',
  grimoire: 'Grimórios',
  spellheart: 'Corações de magia',
  apex: 'Ápice',
  tattoo: 'Tatuagens',
  assistive: 'Itens assistivos',
  other: 'Outros',
}

export const WEAPON_GROUP_LABELS: Record<WeaponGroupId, string> = {
  axe: 'Machado',
  bomb: 'Bomba',
  bow: 'Arco',
  brawling: 'Briga',
  club: 'Clava',
  crossbow: 'Besta',
  dart: 'Dardo',
  firearm: 'Arma de fogo',
  flail: 'Mangual',
  hammer: 'Martelo',
  knife: 'Faca',
  pick: 'Picareta',
  polearm: 'Arma de haste',
  shield: 'Escudo',
  sling: 'Funda',
  spear: 'Lança',
  sword: 'Espada',
}

export const ARMOR_GROUP_LABELS: Record<ArmorGroupId, string> = {
  cloth: 'Tecido',
  leather: 'Couro',
  chain: 'Malha',
  composite: 'Composta',
  plate: 'Placas',
  wood: 'Madeira',
  skeletal: 'Esquelética',
}

export const DAMAGE_TYPE_LABELS: Record<DamageTypeId, string> = {
  bludgeoning: 'contundente',
  piercing: 'perfurante',
  slashing: 'cortante',
  acid: 'ácido',
  cold: 'frio',
  electricity: 'eletricidade',
  fire: 'fogo',
  sonic: 'sônico',
  spirit: 'espírito',
  vitality: 'vitalidade',
  void: 'vazio',
  mental: 'mental',
  poison: 'veneno',
  bleed: 'sangramento',
  untyped: 'não tipado',
}

export const DAMAGE_TYPE_IDS = Object.keys(DAMAGE_TYPE_LABELS) as DamageTypeId[]

export const DEFAULT_INVESTMENT_LIMIT = 10

/** Limite de Bulk sem penalidade = 5 + modificador de Força (Player Core). */
export const BULK_LIMIT_BASE = 5

/** Máximo absoluto = 10 + modificador de Força. */
export const BULK_MAXIMUM_BASE = 10

export const LIGHT_BULK_PER_BULK = 10
