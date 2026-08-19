import type {
  AlchemicalStats,
  AmmunitionStats,
  ArmorGroupId,
  ArmorStats,
  BulkValue,
  ConsumableStats,
  DamageTypeId,
  GrimoireStats,
  ItemCategory,
  ItemDefinition,
  ItemUsage,
  RuneStats,
  ScrollStats,
  ShieldStats,
  SnareStats,
  SpellheartStats,
  StaffStats,
  TalismanStats,
  WandStats,
  WeaponGroupId,
  WeaponHands,
  WeaponStats,
  WornMagicStats,
} from '@/types/equipment'
import type { Rarity } from '@/types/core'
import type {
  AttackProficiencyCategory,
  DefenseProficiencyCategory,
} from '@/types/class'

const AON = 'https://2e.aonprd.com'

export function bulkOf(raw: number | 'L' | '—'): BulkValue {
  if (raw === '—' || raw === 0) return { unit: 'negligible' }
  if (raw === 'L') return { unit: 'light', count: 1 }
  return { unit: 'bulk', count: raw }
}

/** Peças de ouro → cobre. */
export const po = (n: number) => Math.round(n * 100)
/** Peças de prata → cobre. */
export const pp = (n: number) => Math.round(n * 10)
export const pc = (n: number) => n

const PROF_LABEL: Record<AttackProficiencyCategory, string> = {
  unarmed: 'Desarmada',
  simple: 'Simples',
  martial: 'Marcial',
  advanced: 'Avançada',
  bomb: 'Bomba',
  simpleFirearm: 'Arma de fogo/besta simples',
  martialFirearm: 'Arma de fogo/besta marcial',
  advancedFirearm: 'Arma de fogo/besta avançada',
}

const ARMOR_CAT_LABEL: Record<DefenseProficiencyCategory, string> = {
  unarmored: 'Sem armadura',
  light: 'Leve',
  medium: 'Média',
  heavy: 'Pesada',
  allArmor: 'Todas',
}

function aonUrl(
  kind: 'Weapons' | 'Armor' | 'Shields' | 'Equipment',
  aonId: number,
): string {
  return `${AON}/${kind}.aspx?ID=${aonId}`
}

export function weaponItem(opts: {
  aonId: number
  name: string
  originalName: string
  proficiency: AttackProficiencyCategory
  rangeType: 'melee' | 'ranged'
  damageDie: string
  damageType: DamageTypeId | string
  group: WeaponGroupId
  hands?: WeaponHands
  range?: number
  reload?: number
  priceCp?: number | null
  bulk: number | 'L' | '—'
  traits?: string[]
  page: number
  rarity?: Rarity
  description: string
  category?: Extract<ItemCategory, 'weapon' | 'ammunition'>
}): ItemDefinition {
  const category = opts.category ?? 'weapon'
  const isAmmo = category === 'ammunition'
  const weapon: WeaponStats | undefined = isAmmo
    ? undefined
    : {
        proficiency: opts.proficiency,
        rangeType: opts.rangeType,
        damageDie: opts.damageDie,
        damageType: opts.damageType,
        group: opts.group,
        ...(opts.hands ? { hands: opts.hands } : {}),
        ...(opts.range != null ? { range: opts.range } : {}),
        ...(opts.reload != null ? { reload: opts.reload } : {}),
      }
  const subcategory = isAmmo
    ? 'Munição'
    : opts.proficiency === 'unarmed'
      ? 'Desarmada'
      : `${PROF_LABEL[opts.proficiency]} · ${opts.rangeType === 'melee' ? 'corpo a corpo' : 'à distância'}`
  return {
    id: `weapon-${opts.aonId}`,
    name: opts.name,
    originalName: opts.originalName,
    category,
    subcategory,
    level: 0,
    rarity: opts.rarity ?? 'common',
    traits: opts.traits ?? [],
    description: opts.description,
    source: `Player Core pg. ${opts.page}`,
    aonUrl: aonUrl('Weapons', opts.aonId),
    priceCp: opts.priceCp ?? null,
    bulk: bulkOf(opts.bulk),
    usage: 'held',
    weapon,
    ...(isAmmo ? { ammunition: { weaponGroups: [opts.group] } } : {}),
  }
}

export function armorItem(opts: {
  aonId: number
  name: string
  originalName: string
  category: DefenseProficiencyCategory
  acBonus: number
  dexCap: number | null
  checkPenalty: number
  speedPenalty: number
  strength: number | null
  group?: ArmorGroupId
  priceCp: number | null
  bulk: number | 'L' | '—'
  traits?: string[]
  page?: number
  description: string
}): ItemDefinition {
  const armor: ArmorStats = {
    category: opts.category,
    acBonus: opts.acBonus,
    dexCap: opts.dexCap,
    checkPenalty: opts.checkPenalty,
    speedPenalty: opts.speedPenalty,
    strength: opts.strength,
    ...(opts.group ? { group: opts.group } : {}),
  }
  return {
    id: `armor-${opts.aonId}`,
    name: opts.name,
    originalName: opts.originalName,
    category: 'armor',
    subcategory: ARMOR_CAT_LABEL[opts.category],
    level: 0,
    rarity: 'common',
    traits: opts.traits ?? [],
    description: opts.description,
    source: `Player Core pg. ${opts.page ?? 273}`,
    aonUrl: aonUrl('Armor', opts.aonId),
    priceCp: opts.priceCp,
    bulk: bulkOf(opts.bulk),
    usage: 'worn-armor',
    armor,
  }
}

export function shieldItem(opts: {
  aonId: number
  name: string
  originalName: string
  acBonus: number
  speedPenalty?: number
  hardness: number
  hp: number
  bt: number
  priceCp: number
  bulk: number | 'L' | '—'
  description: string
}): ItemDefinition {
  const shield: ShieldStats = {
    acBonus: opts.acBonus,
    speedPenalty: opts.speedPenalty ?? 0,
    hardness: opts.hardness,
    hp: opts.hp,
    bt: opts.bt,
  }
  return {
    id: `shield-${opts.aonId}`,
    name: opts.name,
    originalName: opts.originalName,
    category: 'shield',
    subcategory: 'Escudo',
    level: 0,
    rarity: 'common',
    traits: [],
    description: opts.description,
    source: 'Player Core pg. 274',
    aonUrl: aonUrl('Shields', opts.aonId),
    priceCp: opts.priceCp,
    bulk: bulkOf(opts.bulk),
    usage: 'held',
    shield,
  }
}

export function gearItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  priceCp?: number | null
  bulk: number | 'L' | '—'
  level?: number
  rarity?: Rarity
  traits?: string[]
  page: number
  usage?: ItemUsage
}): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'adventuringGear',
    subcategory: 'Equipamento de aventura',
    level: opts.level ?? 0,
    rarity: opts.rarity ?? 'common',
    traits: opts.traits ?? [],
    description: opts.description,
    source: `Player Core pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: opts.priceCp ?? null,
    bulk: bulkOf(opts.bulk),
    usage: opts.usage ?? 'held',
  }
}

export function runeItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  usage: Extract<ItemUsage, 'etched-weapon' | 'etched-armor' | 'etched-shield'>
  rune: RuneStats
  rarity?: Rarity
  traits?: string[]
  sourceBook?: string
}): ItemDefinition {
  const rarity = opts.rarity ?? 'common'
  const traits = ['Magical', ...(opts.traits ?? [])]
  if (rarity === 'uncommon' && !traits.includes('Uncommon')) {
    traits.unshift('Uncommon')
  }
  if (rarity === 'rare' && !traits.includes('Rare')) {
    traits.unshift('Rare')
  }
  const subcategory =
    opts.usage === 'etched-weapon'
      ? opts.rune.kind === 'fundamental'
        ? 'Runa fundamental de arma'
        : 'Runa de propriedade de arma'
      : opts.usage === 'etched-armor'
        ? opts.rune.kind === 'fundamental'
          ? 'Runa fundamental de armadura'
          : 'Runa de propriedade de armadura'
        : 'Runa de escudo'
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'rune',
    subcategory,
    level: opts.level,
    rarity,
    traits,
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('—'),
    usage: opts.usage,
    rune: {
      ...opts.rune,
      propertySlots:
        opts.rune.propertySlots ?? (opts.rune.kind === 'property' ? 1 : 0),
    },
  }
}

const STAFF_WEAPON: WeaponStats = {
  proficiency: 'simple',
  rangeType: 'melee',
  damageDie: '1d4',
  damageType: 'bludgeoning',
  group: 'club',
  hands: '1+',
}

export function staffItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  staff: StaffStats
  rarity?: Rarity
  traits?: string[]
  grantedRuneIds?: string[]
  sourceBook?: string
}): ItemDefinition {
  const rarity = opts.rarity ?? 'common'
  const traits = ['Magical', 'Staff', 'Monk', 'Two-Hand 1d8', ...(opts.traits ?? [])]
  if (rarity === 'uncommon' && !traits.includes('Uncommon')) traits.unshift('Uncommon')
  if (rarity === 'rare' && !traits.includes('Rare')) traits.unshift('Rare')
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'staff',
    subcategory: 'Cajado mágico',
    level: opts.level,
    rarity,
    traits,
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf(1),
    usage: 'held',
    weapon: STAFF_WEAPON,
    staff: opts.staff,
    grantedRuneIds: opts.grantedRuneIds,
  }
}

export function wandItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  wand: WandStats
  rarity?: Rarity
  traits?: string[]
  subcategory?: string
  sourceBook?: string
}): ItemDefinition {
  const kind = opts.wand.kind ?? 'generic'
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'wand',
    subcategory: opts.subcategory ?? (kind === 'generic' ? 'Varinha mágica' : 'Varinha especial'),
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits: ['Magical', 'Wand', ...(opts.traits ?? [])],
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('L'),
    usage: 'held',
    wand: opts.wand,
  }
}

const POISON_EXPOSURE_TRAIT: Record<string, string> = {
  injury: 'Injury',
  ingested: 'Ingested',
  inhaled: 'Inhaled',
  contact: 'Contact',
}

export function alchemicalItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  alchemical: AlchemicalStats
  traits?: string[]
  rarity?: Rarity
  bulk?: number | 'L' | '—'
}): ItemDefinition {
  const kindLabel =
    opts.alchemical.kind === 'bomb'
      ? 'Bomba alquímica'
      : opts.alchemical.kind === 'elixir'
        ? 'Elixir alquímico'
        : opts.alchemical.kind === 'mutagen'
          ? 'Mutagênico'
          : opts.alchemical.kind === 'poison'
            ? 'Veneno alquímico'
            : 'Ferramenta alquímica'
  const bomb = opts.alchemical.bomb
  const poison = opts.alchemical.poison
  const weapon: WeaponStats | undefined = bomb
    ? {
        proficiency: 'bomb',
        rangeType: 'ranged',
        damageDie: bomb.damageDie ?? '0',
        damageType: bomb.damageType,
        group: 'bomb',
        hands: '1',
        range: bomb.range ?? 20,
      }
    : undefined
  const traits = [
    'Alchemical',
    'Consumable',
    ...(opts.alchemical.kind === 'bomb' ? ['Bomb'] : []),
    ...(opts.alchemical.kind === 'bomb' && opts.alchemical.bomb?.splash
      ? ['Splash']
      : []),
    ...(opts.alchemical.kind === 'elixir' || opts.alchemical.kind === 'mutagen'
      ? ['Elixir']
      : []),
    ...(opts.alchemical.kind === 'mutagen' ? ['Mutagen', 'Polymorph'] : []),
    ...(opts.alchemical.kind === 'poison' ? ['Poison'] : []),
    ...(poison ? [POISON_EXPOSURE_TRAIT[poison.exposure] ?? 'Poison'] : []),
    ...(poison?.virulent ? ['Virulent'] : []),
    ...(opts.traits ?? []),
  ]
  const effectFamily =
    opts.alchemical.effectFamily ??
    (opts.alchemical.kind === 'mutagen' ? 'mutagen' : undefined)
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'alchemical',
    subcategory: kindLabel,
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits,
    description: opts.description,
    source: `Player Core 2 pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf(opts.bulk ?? 'L'),
    usage: 'held',
    weapon,
    alchemical: { ...opts.alchemical, effectFamily },
  }
}

export function consumableItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  sourceBook?: 'GM Core' | 'Player Core 2'
  consumable: ConsumableStats
  traits?: string[]
  rarity?: Rarity
}): ItemDefinition {
  const kindLabel = opts.consumable.kind === 'oil' ? 'Óleo' : 'Poção'
  const kindTrait = opts.consumable.kind === 'oil' ? 'Oil' : 'Potion'
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'consumable',
    subcategory: kindLabel,
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits: ['Consumable', 'Magical', kindTrait, ...(opts.traits ?? [])],
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('L'),
    usage: 'held',
    consumable: opts.consumable,
  }
}

export function talismanItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  sourceBook?: 'GM Core' | 'Player Core 2'
  talisman: TalismanStats
  traits?: string[]
  rarity?: Rarity
}): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'consumable',
    subcategory: 'Talismã',
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits: ['Consumable', 'Magical', 'Talisman', ...(opts.traits ?? [])],
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('—'),
    usage: 'affixed',
    talisman: opts.talisman,
  }
}

export function scrollItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  scroll: ScrollStats
}): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'consumable',
    subcategory: 'Pergaminho',
    level: opts.level,
    rarity: 'common',
    traits: ['Consumable', 'Magical', 'Scroll'],
    description: opts.description,
    source: `GM Core pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('L'),
    usage: 'held',
    scroll: opts.scroll,
  }
}

export function snareItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  snare: SnareStats
  traits?: string[]
  rarity?: Rarity
}): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'snare',
    subcategory: 'Cilada',
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits: [
      'Consumable',
      'Mechanical',
      'Snare',
      'Trap',
      ...(opts.traits ?? []),
    ],
    description: opts.description,
    source: `Player Core 2 pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('—'),
    usage: 'other',
    snare: opts.snare,
  }
}

export function grimoireItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  grimoire: GrimoireStats
  traits?: string[]
  rarity?: Rarity
}): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'grimoire',
    subcategory: 'Grimório',
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits: ['Grimoire', 'Magical', ...(opts.traits ?? [])],
    description: opts.description,
    source: `Impossible Magic pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('L'),
    usage: 'held',
    grimoire: opts.grimoire,
  }
}

export function spellheartItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  sourceBook: 'Rage of Elements' | 'Impossible Magic' | 'Treasure Vault (Remastered)'
  spellheart: SpellheartStats
  traits?: string[]
  rarity?: Rarity
}): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'spellheart',
    subcategory: 'Coração de magia',
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits: ['Magical', 'Spellheart', ...(opts.traits ?? [])],
    description: opts.description,
    source: `${opts.sourceBook} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf('—'),
    usage: 'affixed',
    spellheart: opts.spellheart,
  }
}

type MagicItemOpts = {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  bulk?: number | 'L' | '—'
  usage?: ItemUsage
  traits?: string[]
  rarity?: Rarity
  subcategory?: string
  requiresInvestiture?: boolean
  wornMagic?: WornMagicStats
  grantedRuneIds?: string[]
  weapon?: WeaponStats
  sourceBook?: string
}

function magicItemBase(
  opts: MagicItemOpts,
  category: ItemCategory,
  defaultSubcategory: string,
  defaultTraits: string[],
  defaultUsage: ItemUsage,
  investDefault: boolean,
): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category,
    subcategory: opts.subcategory ?? defaultSubcategory,
    level: opts.level,
    rarity: opts.rarity ?? 'common',
    traits: [...defaultTraits, ...(opts.traits ?? [])],
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf(opts.bulk ?? '—'),
    usage: opts.usage ?? defaultUsage,
    requiresInvestiture: opts.requiresInvestiture ?? investDefault,
    wornMagic: opts.wornMagic,
    grantedRuneIds: opts.grantedRuneIds,
    weapon: opts.weapon,
  }
}

/** Item vestido permanente. Investido por padrão. */
export function wornItem(opts: MagicItemOpts): ItemDefinition {
  return magicItemBase(
    opts,
    'worn',
    'Vestido',
    ['Invested', 'Magical'],
    'worn',
    true,
  )
}

/** Item segurado permanente (GM Core). */
export function heldItem(opts: MagicItemOpts): ItemDefinition {
  return magicItemBase(
    opts,
    'held',
    'Segurado',
    ['Magical'],
    'held',
    false,
  )
}

/** Item ápice. Um por personagem; o motor aplica o primeiro investido. */
export function apexItem(opts: MagicItemOpts): ItemDefinition {
  return magicItemBase(
    opts,
    'apex',
    'Ápice',
    ['Apex', 'Invested', 'Magical'],
    'worn',
    true,
  )
}

/** Tatuagem mágica permanente (Treasure Vault Remastered). Sempre investida. */
export function tattooItem(opts: MagicItemOpts): ItemDefinition {
  return magicItemBase(
    {
      ...opts,
      sourceBook: opts.sourceBook ?? 'Treasure Vault (Remastered)',
    },
    'tattoo',
    'Tatuagem',
    ['Invested', 'Magical', 'Tattoo'],
    'worn',
    true,
  )
}

/** Material precioso (GM Core) — pedaço, lingote ou objeto por Carga. */
export function materialItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  bulk: number | 'L' | '—'
  rarity?: Rarity
  traits?: string[]
  subcategory?: string
  sourceBook?: string
}): ItemDefinition {
  const rarity = opts.rarity ?? 'common'
  const traits = ['Precious', ...(opts.traits ?? [])]
  if (rarity === 'uncommon' && !traits.includes('Uncommon')) {
    traits.unshift('Uncommon')
  }
  if (rarity === 'rare' && !traits.includes('Rare')) {
    traits.unshift('Rare')
  }
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'material',
    subcategory: opts.subcategory ?? 'Material precioso',
    level: opts.level,
    rarity,
    traits,
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: po(opts.priceGp),
    bulk: bulkOf(opts.bulk),
    usage: 'other',
  }
}

/** Item assistivo Remaster (Player Core / Howl of the Wild). */
export function assistiveItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  priceCp: number
  bulk: number | 'L' | '—'
  page: number
  usage?: ItemUsage
  traits?: string[]
  rarity?: Rarity
  level?: number
  subcategory?: string
  sourceBook?: 'Player Core' | 'Howl of the Wild' | 'Treasure Vault (Remastered)'
}): ItemDefinition {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: 'assistive',
    subcategory: opts.subcategory ?? 'Assistivo',
    level: opts.level ?? 0,
    rarity: opts.rarity ?? 'common',
    traits: opts.traits ?? [],
    description: opts.description,
    source: `${opts.sourceBook ?? 'Player Core'} pg. ${opts.page}`,
    aonUrl: aonUrl('Equipment', opts.aonId),
    priceCp: opts.priceCp,
    bulk: bulkOf(opts.bulk),
    usage: opts.usage ?? 'worn',
  }
}

/** Item genérico do catálogo (artefato, material aplicado, munição mágica, etc.). */
export function catalogItem(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  category: ItemCategory
  description: string
  page: number
  sourceBook?: string
  level?: number
  priceGp?: number | null
  priceCp?: number | null
  bulk?: number | 'L' | '—'
  usage?: ItemUsage
  traits?: string[]
  rarity?: Rarity
  subcategory?: string
  requiresInvestiture?: boolean
  armor?: ArmorStats
  weapon?: WeaponStats
  shield?: ShieldStats
  wornMagic?: WornMagicStats
  grantedRuneIds?: string[]
  consumable?: ConsumableStats
  rune?: RuneStats
  staff?: StaffStats
  wand?: WandStats
  alchemical?: AlchemicalStats
  grimoire?: GrimoireStats
  spellheart?: SpellheartStats
  ammunition?: AmmunitionStats
  aonKind?: 'Weapons' | 'Armor' | 'Shields' | 'Equipment'
}): ItemDefinition {
  const rarity = opts.rarity ?? 'common'
  const traits = [...(opts.traits ?? [])]
  if (rarity === 'uncommon' && !traits.includes('Uncommon')) traits.unshift('Uncommon')
  if (rarity === 'rare' && !traits.includes('Rare')) traits.unshift('Rare')
  if (rarity === 'unique' && !traits.includes('Unique')) traits.unshift('Unique')
  const priceCp =
    opts.priceCp !== undefined
      ? opts.priceCp
      : opts.priceGp == null
        ? null
        : po(opts.priceGp)
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    category: opts.category,
    subcategory: opts.subcategory,
    level: opts.level ?? 0,
    rarity,
    traits,
    description: opts.description,
    source: `${opts.sourceBook ?? 'GM Core'} pg. ${opts.page}`,
    aonUrl: aonUrl(opts.aonKind ?? 'Equipment', opts.aonId),
    priceCp,
    bulk: bulkOf(opts.bulk ?? '—'),
    usage: opts.usage ?? 'other',
    requiresInvestiture: opts.requiresInvestiture,
    armor: opts.armor,
    weapon: opts.weapon,
    shield: opts.shield,
    wornMagic: opts.wornMagic,
    grantedRuneIds: opts.grantedRuneIds,
    consumable: opts.consumable,
    rune: opts.rune,
    staff: opts.staff,
    wand: opts.wand,
    alchemical: opts.alchemical,
    grimoire: opts.grimoire,
    spellheart: opts.spellheart,
    ammunition: opts.ammunition,
  }
}
