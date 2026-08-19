import type {
  AlchemicalKind,
  AlchemicalStats,
  ArmorStats,
  BulkValue,
  ConsumableKind,
  ItemCategory,
  ItemDefinition,
  ItemUsage,
  RuneStats,
  ShieldStats,
  WeaponStats,
  WornMagicStats,
} from '@/types/equipment'
import { createId, nowIso } from '@/utils/id'

export type EquipmentCreateKind = ItemCategory | 'artifact'

export const EQUIPMENT_CREATE_KINDS: EquipmentCreateKind[] = [
  'weapon',
  'armor',
  'shield',
  'ammunition',
  'rune',
  'worn',
  'held',
  'apex',
  'staff',
  'wand',
  'grimoire',
  'spellheart',
  'consumable',
  'alchemical',
  'snare',
  'adventuringGear',
  'material',
  'tattoo',
  'assistive',
  'other',
  'artifact',
]

export const EQUIPMENT_CREATE_QUERY: Record<EquipmentCreateKind, string> = {
  weapon: 'arma',
  armor: 'armadura',
  shield: 'escudo',
  ammunition: 'municao',
  rune: 'runa',
  worn: 'vestido',
  held: 'segurado',
  apex: 'apice',
  staff: 'cajado',
  wand: 'varinha',
  grimoire: 'grimorio',
  spellheart: 'coracao',
  consumable: 'consumivel',
  alchemical: 'alquimico',
  snare: 'cilada',
  adventuringGear: 'aventura',
  material: 'material',
  tattoo: 'tatuagem',
  assistive: 'assistivo',
  other: 'outro',
  artifact: 'artefato',
}

const QUERY_TO_KIND = Object.fromEntries(
  Object.entries(EQUIPMENT_CREATE_QUERY).map(([kind, query]) => [query, kind]),
) as Record<string, EquipmentCreateKind>

export function equipmentKindFromQuery(
  value: string | null,
): EquipmentCreateKind | null {
  if (!value) return null
  if (value === '1') return 'weapon'
  const fromQuery = QUERY_TO_KIND[value]
  if (fromQuery) return fromQuery
  if ((EQUIPMENT_CREATE_KINDS as string[]).includes(value)) {
    return value as EquipmentCreateKind
  }
  return null
}

export function createKindFromCategory(
  category: ItemCategory,
): EquipmentCreateKind {
  return category
}

export const WEAPON_PROFICIENCY_LABELS: Record<
  WeaponStats['proficiency'],
  string
> = {
  unarmed: 'Desarmada',
  simple: 'Simples',
  martial: 'Marcial',
  advanced: 'Avançada',
  bomb: 'Bomba',
  simpleFirearm: 'Arma de fogo/besta simples',
  martialFirearm: 'Arma de fogo/besta marcial',
  advancedFirearm: 'Arma de fogo/besta avançada',
}

export const ARMOR_PROFICIENCY_LABELS: Record<
  Exclude<ArmorStats['category'], 'allArmor'>,
  string
> = {
  unarmored: 'Sem armadura',
  light: 'Leve',
  medium: 'Média',
  heavy: 'Pesada',
}

export const DAMAGE_DICE = [
  '1',
  '1d4',
  '1d6',
  '1d8',
  '1d10',
  '1d12',
  '2d6',
  '2d8',
] as const

export const CONSUMABLE_SUBKIND_LABELS: Record<
  ConsumableKind | 'scroll' | 'talisman' | 'other',
  string
> = {
  potion: 'Poção',
  oil: 'Óleo',
  scroll: 'Pergaminho',
  talisman: 'Talismã',
  other: 'Outro',
}

export const ALCHEMICAL_KIND_LABELS: Record<AlchemicalKind, string> = {
  bomb: 'Bomba',
  elixir: 'Elixir',
  mutagen: 'Mutagênico',
  tool: 'Ferramenta',
  poison: 'Veneno',
}

export const ARTIFACT_CHASSIS: ItemCategory[] = [
  'held',
  'worn',
  'weapon',
  'armor',
  'rune',
  'other',
]

export function defaultUsage(category: ItemCategory): ItemUsage {
  switch (category) {
    case 'weapon':
    case 'ammunition':
      return 'held'
    case 'armor':
      return 'worn-armor'
    case 'shield':
      return 'held'
    case 'rune':
      return 'etched-weapon'
    case 'worn':
    case 'apex':
    case 'tattoo':
    case 'assistive':
      return 'worn'
    case 'held':
    case 'staff':
    case 'wand':
    case 'grimoire':
      return 'held'
    case 'spellheart':
      return 'affixed'
    case 'snare':
      return 'other'
    default:
      return 'other'
  }
}

export function defaultBulk(category: ItemCategory): BulkValue {
  switch (category) {
    case 'weapon':
    case 'shield':
      return { unit: 'bulk', count: 1 }
    case 'armor':
      return { unit: 'bulk', count: 2 }
    case 'ammunition':
    case 'consumable':
    case 'alchemical':
    case 'wand':
    case 'tattoo':
      return { unit: 'light', count: 1 }
    default:
      return { unit: 'negligible' }
  }
}

function emptyWeapon(): WeaponStats {
  return {
    proficiency: 'martial',
    rangeType: 'melee',
    damageDie: '1d8',
    damageType: 'slashing',
    group: 'sword',
    hands: '1',
  }
}

function emptyArmor(): ArmorStats {
  return {
    category: 'medium',
    acBonus: 3,
    dexCap: 2,
    checkPenalty: -2,
    speedPenalty: -5,
    strength: 2,
    group: 'composite',
  }
}

function emptyShield(): ShieldStats {
  return {
    acBonus: 2,
    speedPenalty: 0,
    hardness: 5,
    hp: 20,
    bt: 10,
  }
}

function emptyRune(): RuneStats {
  return {
    kind: 'property',
    appliesTo: ['weapon'],
    family: 'custom',
    shortLabel: 'homebrew',
    propertySlots: 1,
  }
}

function emptyWornMagic(): WornMagicStats {
  return { note: '' }
}

function emptyAlchemical(kind: AlchemicalKind): AlchemicalStats {
  if (kind === 'bomb') {
    return {
      kind: 'bomb',
      bomb: {
        damageDie: '1d8',
        damageType: 'fire',
        splash: 1,
        range: 20,
        attackItemBonus: 1,
      },
    }
  }
  if (kind === 'elixir') {
    return {
      kind: 'elixir',
      elixir: { duration: '1 hora', note: '' },
    }
  }
  if (kind === 'mutagen') {
    return {
      kind: 'mutagen',
      effectFamily: 'mutagen',
      mutagen: {
        duration: '1 minuto',
        benefit: '',
        drawback: '',
      },
    }
  }
  if (kind === 'poison') {
    return {
      kind: 'poison',
      poison: {
        exposure: 'injury',
        dc: 15,
        stages: [{ duration: '1 rodada', effect: '' }],
      },
    }
  }
  return { kind: 'tool', tool: { note: '' } }
}

function categoryLabel(kind: EquipmentCreateKind): {
  name: string
  originalName: string
} {
  switch (kind) {
    case 'weapon':
      return { name: 'Nova Arma', originalName: 'New Weapon' }
    case 'armor':
      return { name: 'Nova Armadura', originalName: 'New Armor' }
    case 'shield':
      return { name: 'Novo Escudo', originalName: 'New Shield' }
    case 'rune':
      return { name: 'Nova Runa', originalName: 'New Rune' }
    case 'worn':
      return { name: 'Novo Item Vestido', originalName: 'New Worn Item' }
    case 'held':
      return { name: 'Novo Item Segurado', originalName: 'New Held Item' }
    case 'apex':
      return { name: 'Novo Ápice', originalName: 'New Apex Item' }
    case 'staff':
      return { name: 'Novo Cajado', originalName: 'New Staff' }
    case 'wand':
      return { name: 'Nova Varinha', originalName: 'New Wand' }
    case 'consumable':
      return { name: 'Novo Consumível', originalName: 'New Consumable' }
    case 'alchemical':
      return { name: 'Novo Alquímico', originalName: 'New Alchemical' }
    case 'grimoire':
      return { name: 'Novo Grimório', originalName: 'New Grimoire' }
    case 'spellheart':
      return { name: 'Novo Coração de Magia', originalName: 'New Spellheart' }
    case 'snare':
      return { name: 'Nova Cilada', originalName: 'New Snare' }
    case 'ammunition':
      return { name: 'Nova Munição', originalName: 'New Ammunition' }
    case 'adventuringGear':
      return { name: 'Novo Equipamento', originalName: 'New Gear' }
    case 'material':
      return { name: 'Novo Material', originalName: 'New Material' }
    case 'tattoo':
      return { name: 'Nova Tatuagem', originalName: 'New Tattoo' }
    case 'assistive':
      return { name: 'Novo Item Assistivo', originalName: 'New Assistive Item' }
    case 'artifact':
      return { name: 'Novo Artefato', originalName: 'New Artifact' }
    default:
      return { name: 'Novo Item', originalName: 'New Item' }
  }
}

function applyCategoryStats(
  item: ItemDefinition,
  category: ItemCategory,
): ItemDefinition {
  const next: ItemDefinition = {
    ...item,
    category,
    usage: defaultUsage(category),
    weapon: undefined,
    armor: undefined,
    shield: undefined,
    rune: undefined,
    staff: undefined,
    wand: undefined,
    alchemical: undefined,
    consumable: undefined,
    talisman: undefined,
    scroll: undefined,
    snare: undefined,
    grimoire: undefined,
    spellheart: undefined,
    ammunition: undefined,
    wornMagic: undefined,
  }
  switch (category) {
    case 'weapon':
      next.weapon = emptyWeapon()
      next.subcategory = 'Marcial · corpo a corpo'
      break
    case 'armor':
      next.armor = emptyArmor()
      next.subcategory = 'Média'
      next.requiresInvestiture = false
      break
    case 'shield':
      next.shield = emptyShield()
      next.subcategory = 'Escudo'
      break
    case 'ammunition':
      next.ammunition = { weaponGroups: ['bow'] }
      next.subcategory = 'Munição'
      break
    case 'rune':
      next.rune = emptyRune()
      next.subcategory = 'Runa de propriedade'
      break
    case 'worn':
    case 'apex':
    case 'tattoo':
    case 'assistive':
      next.wornMagic = emptyWornMagic()
      next.requiresInvestiture = true
      if (category === 'apex') {
        next.wornMagic = { apexAttribute: 'strength', note: '' }
        next.subcategory = 'Ápice'
      }
      if (category === 'tattoo') next.subcategory = 'Tatuagem'
      if (category === 'assistive') next.subcategory = 'Assistivo'
      if (category === 'worn') next.subcategory = 'Item vestido'
      break
    case 'held':
      next.wornMagic = emptyWornMagic()
      next.subcategory = 'Item segurado'
      break
    case 'staff':
      next.staff = {
        spellsByRank: [{ rank: 1, spellIds: [], spellNames: [] }],
      }
      next.subcategory = 'Cajado'
      break
    case 'wand':
      next.wand = { spellRank: 1, kind: 'generic' }
      next.subcategory = 'Varinha'
      break
    case 'consumable':
      next.consumable = { kind: 'potion', note: '' }
      next.subcategory = 'Poção'
      break
    case 'alchemical':
      next.alchemical = emptyAlchemical('elixir')
      next.subcategory = 'Elixir'
      break
    case 'snare':
      next.snare = { note: '' }
      next.subcategory = 'Cilada'
      break
    case 'grimoire':
      next.grimoire = { activate: '1 minuto', frequency: '1×/dia', note: '' }
      next.subcategory = 'Grimório'
      break
    case 'spellheart':
      next.spellheart = {
        affixesTo: 'weapon',
        armorBenefit: '',
        weaponBenefit: '',
        cantrip: '',
      }
      next.subcategory = 'Coração de magia'
      break
    case 'adventuringGear':
      next.subcategory = 'Equipamento de aventura'
      break
    case 'material':
      next.subcategory = 'Material'
      break
    default:
      next.subcategory = 'Outro'
  }
  return next
}

export function createEmptyHomebrewItem(
  kind: EquipmentCreateKind,
): ItemDefinition {
  const now = nowIso()
  const names = categoryLabel(kind)
  const isArtifact = kind === 'artifact'
  const category: ItemCategory = isArtifact ? 'held' : kind
  const base: ItemDefinition = {
    id: createId('item'),
    name: names.name,
    originalName: names.originalName,
    category,
    level: isArtifact ? 20 : 0,
    rarity: isArtifact ? 'unique' : 'common',
    traits: isArtifact ? ['Artifact', 'Magical', 'Unique'] : [],
    description: '',
    source: 'Homebrew',
    provenance: { type: 'homebrew' },
    priceCp: isArtifact ? null : 0,
    bulk: isArtifact ? { unit: 'light', count: 1 } : defaultBulk(category),
    usage: defaultUsage(category),
    createdAt: now,
    updatedAt: now,
  }
  const withStats = applyCategoryStats(base, category)
  if (isArtifact) {
    withStats.subcategory = 'Artefato'
    withStats.level = 20
    withStats.rarity = 'unique'
    withStats.priceCp = null
  }
  return withStats
}

export function retargetArtifactChassis(
  item: ItemDefinition,
  chassis: ItemCategory,
): ItemDefinition {
  const next = applyCategoryStats(item, chassis)
  next.subcategory = 'Artefato'
  next.rarity = 'unique'
  next.priceCp = null
  next.level = Math.max(item.level, 16)
  const traits = new Set(item.traits.map((t) => t))
  traits.add('Artifact')
  traits.add('Unique')
  next.traits = [...traits]
  return next
}

export function isArtifactItem(item: ItemDefinition): boolean {
  return (
    item.subcategory === 'Artefato' ||
    item.traits.some((t) => t.toLowerCase() === 'artifact')
  )
}

export function setConsumableSubkind(
  item: ItemDefinition,
  sub:
    | ConsumableKind
    | 'scroll'
    | 'talisman'
    | 'other',
): ItemDefinition {
  const next: ItemDefinition = {
    ...item,
    consumable: undefined,
    talisman: undefined,
    scroll: undefined,
  }
  if (sub === 'scroll') {
    next.scroll = { spellRank: 1 }
    next.subcategory = 'Pergaminho'
    return next
  }
  if (sub === 'talisman') {
    next.talisman = {
      affixesTo: 'weapon',
      activate: 'livre',
      note: '',
    }
    next.subcategory = 'Talismã'
    return next
  }
  if (sub === 'other') {
    next.consumable = { kind: 'potion', note: '' }
    next.subcategory = 'Consumível'
    return next
  }
  next.consumable = { kind: sub, note: item.consumable?.note ?? '' }
  next.subcategory = CONSUMABLE_SUBKIND_LABELS[sub]
  return next
}

export function setAlchemicalKind(
  item: ItemDefinition,
  kind: AlchemicalKind,
): ItemDefinition {
  return {
    ...item,
    alchemical: emptyAlchemical(kind),
    subcategory: ALCHEMICAL_KIND_LABELS[kind],
  }
}

export function goldToCp(gold: number | null): number | null {
  if (gold == null || !Number.isFinite(gold) || gold < 0) return null
  return Math.round(gold * 100)
}

export function cpToGold(cp: number | null | undefined): string {
  if (cp == null) return ''
  if (cp === 0) return '0'
  if (cp % 100 === 0) return String(cp / 100)
  return String(cp / 100)
}

export function bulkFromEditor(
  unit: BulkValue['unit'],
  count: number,
): BulkValue {
  if (unit === 'negligible') return { unit: 'negligible' }
  if (unit === 'light') return { unit: 'light', count: Math.max(1, count) }
  return { unit: 'bulk', count: Math.max(1, count) }
}
