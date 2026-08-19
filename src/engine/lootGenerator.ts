import type { ItemCategory, ItemDefinition, Rarity } from '@/types'
import { isHomebrewItem } from '@/types'
import type {
  EncounterThreat,
  LootHaul,
  LootItemRole,
  LootLine,
} from '@/types/loot'
import { createId } from '@/utils/id'
import { treasureRowForLevel } from './lootTreasure'

const CONSUMABLE_CATEGORIES: ItemCategory[] = [
  'consumable',
  'alchemical',
  'ammunition',
  'snare',
]

const RARITY_WEIGHT: Record<Rarity, number> = {
  common: 10,
  uncommon: 4,
  rare: 1,
  unique: 0.2,
}

export const ENCOUNTER_FRACTION: Record<EncounterThreat, number> = {
  low: 0.15,
  moderate: 0.25,
  severe: 0.4,
  extreme: 0.55,
}

export function isConsumableDefinition(item: ItemDefinition): boolean {
  if (CONSUMABLE_CATEGORIES.includes(item.category)) return true
  if (item.consumable || item.scroll || item.alchemical) return true
  return item.traits.some((trait) => trait.toLowerCase() === 'consumable')
}

export function lootLineValueCp(line: LootLine): number {
  if (line.kind === 'coins') return line.coinsCp ?? 0
  const unit = line.priceCp ?? 0
  return Math.max(0, unit) * Math.max(1, line.quantity)
}

export function haulTotalCp(lines: LootLine[]): number {
  return lines.reduce((sum, line) => sum + lootLineValueCp(line), 0)
}

function matchesFilters(
  item: ItemDefinition,
  haul: Pick<LootHaul, 'categories' | 'rarities' | 'includeHomebrew'>,
): boolean {
  if (!haul.includeHomebrew && isHomebrewItem(item)) return false
  if (haul.categories.length > 0 && !haul.categories.includes(item.category)) {
    return false
  }
  if (haul.rarities.length > 0 && !haul.rarities.includes(item.rarity)) {
    return false
  }
  return true
}

function pickWeighted(
  pool: ItemDefinition[],
  usedIds: Set<string>,
  allowReuse: boolean,
): ItemDefinition | null {
  const available = allowReuse
    ? pool
    : pool.filter((item) => !usedIds.has(item.id))
  if (available.length === 0) return null
  const weights = available.map((item) => RARITY_WEIGHT[item.rarity] ?? 1)
  const total = weights.reduce((sum, w) => sum + w, 0)
  let roll = Math.random() * total
  for (let i = 0; i < available.length; i++) {
    const weight = weights[i] ?? 1
    roll -= weight
    if (roll <= 0) return available[i] ?? null
  }
  return available.at(-1) ?? null
}

function poolForSlot(
  catalog: ItemDefinition[],
  haul: Pick<LootHaul, 'categories' | 'rarities' | 'includeHomebrew'>,
  role: LootItemRole,
  itemLevel: number,
): ItemDefinition[] {
  const wantConsumable = role === 'consumable'
  const filtered = catalog.filter((item) => {
    if (!matchesFilters(item, haul)) return false
    return isConsumableDefinition(item) === wantConsumable
  })
  const offsets = [0, -1, 1, -2, 2]
  for (const offset of offsets) {
    const target = Math.max(0, itemLevel + offset)
    const atLevel = filtered.filter((item) => item.level === target)
    if (atLevel.length > 0) return atLevel
  }
  return filtered
}

function lineFromItem(
  item: ItemDefinition,
  role: LootItemRole,
  slotLevel: number,
): LootLine {
  return {
    id: createId('loot-line'),
    kind: 'item',
    role,
    definitionId: item.id,
    name: item.name,
    originalName: item.originalName,
    quantity: 1,
    slotLevel,
    level: item.level,
    category: item.category,
    rarity: item.rarity,
    priceCp: item.priceCp ?? null,
  }
}

function coinsLine(gp: number): LootLine {
  const safe = Math.max(0, Math.round(gp))
  return {
    id: createId('loot-coins'),
    kind: 'coins',
    name: 'Moedas',
    quantity: 1,
    coinsCp: safe * 100,
    priceCp: safe * 100,
  }
}

interface ItemSlot {
  role: LootItemRole
  itemLevel: number
}

function expandSlots(
  entries: Array<{ itemLevel: number; count: number }>,
  role: LootItemRole,
): ItemSlot[] {
  const slots: ItemSlot[] = []
  for (const entry of entries) {
    for (let i = 0; i < entry.count; i++) {
      slots.push({ role, itemLevel: entry.itemLevel })
    }
  }
  return slots
}

function adjustForPartySize(slots: ItemSlot[], extraPcs: number): ItemSlot[] {
  if (extraPcs === 0 || slots.length === 0) return slots
  const next = [...slots]
  const add = extraPcs > 0
  const steps = Math.abs(extraPcs)
  for (let i = 0; i < steps; i++) {
    const permanents = next.filter((s) => s.role === 'permanent')
    const consumables = next.filter((s) => s.role === 'consumable')
    const peakPermanent = permanents.reduce(
      (best, slot) => (slot.itemLevel > best ? slot.itemLevel : best),
      0,
    )
    const peakConsumable = consumables.reduce(
      (best, slot) => (slot.itemLevel > best ? slot.itemLevel : best),
      0,
    )
    if (add) {
      if (peakPermanent > 0) {
        next.push({ role: 'permanent', itemLevel: peakPermanent })
      }
      if (peakConsumable > 0) {
        next.push({ role: 'consumable', itemLevel: peakConsumable })
      }
    } else {
      const permIdx = next.findIndex(
        (s) => s.role === 'permanent' && s.itemLevel === peakPermanent,
      )
      if (permIdx >= 0) next.splice(permIdx, 1)
      const consIdx = next.findIndex(
        (s) => s.role === 'consumable' && s.itemLevel === peakConsumable,
      )
      if (consIdx >= 0) next.splice(consIdx, 1)
    }
  }
  return next
}

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = next[i]
    next[i] = next[j]!
    next[j] = tmp!
  }
  return next
}

function fillSlots(
  catalog: ItemDefinition[],
  haul: LootHaul,
  slots: ItemSlot[],
): LootLine[] {
  const usedIds = new Set<string>()
  const lines: LootLine[] = []
  for (const slot of slots) {
    const pool = poolForSlot(catalog, haul, slot.role, slot.itemLevel)
    const picked = pickWeighted(pool, usedIds, slot.role === 'consumable')
    if (!picked) continue
    if (slot.role === 'permanent') usedIds.add(picked.id)
    const existing =
      slot.role === 'consumable'
        ? lines.find((line) => line.definitionId === picked.id)
        : undefined
    if (existing) {
      existing.quantity += 1
    } else {
      lines.push(lineFromItem(picked, slot.role, slot.itemLevel))
    }
  }
  return lines
}

function slotsForHaul(haul: LootHaul): { slots: ItemSlot[]; currencyGp: number } {
  const row = treasureRowForLevel(haul.partyLevel)
  const extraPcs = haul.partySize - 4
  let slots = adjustForPartySize(
    [
      ...expandSlots(row.permanent, 'permanent'),
      ...expandSlots(row.consumables, 'consumable'),
    ],
    extraPcs,
  )
  let currencyGp = row.currencyGp + Math.max(0, extraPcs) * row.extraPcCurrencyGp
  if (extraPcs < 0) {
    const missing = Math.abs(extraPcs)
    currencyGp = Math.max(
      0,
      Math.round(row.currencyGp * ((4 - missing) / 4)),
    )
  }

  if (haul.kind === 'encounter') {
    const fraction = ENCOUNTER_FRACTION[haul.encounterThreat]
    const keep = Math.max(1, Math.round(slots.length * fraction))
    slots = shuffle(slots).slice(0, keep)
    currencyGp = Math.round(currencyGp * fraction)
  }

  if (haul.kind === 'custom') {
    const count = Math.min(30, Math.max(1, haul.customItemCount || 6))
    slots = []
    for (let i = 0; i < count; i++) {
      const consumable = Math.random() < 0.45
      const spread = Math.floor(Math.random() * 3)
      const itemLevel = Math.max(
        0,
        Math.min(20, haul.partyLevel + 1 - spread),
      )
      slots.push({
        role: consumable ? 'consumable' : 'permanent',
        itemLevel,
      })
    }
    currencyGp = Math.round(
      (row.currencyGp * count) / Math.max(1, row.permanent.length * 2 + 6),
    )
  }

  return { slots, currencyGp }
}

export function generateLootLines(
  catalog: ItemDefinition[],
  haul: LootHaul,
): LootLine[] {
  const { slots, currencyGp } = slotsForHaul(haul)
  const lines = fillSlots(catalog, haul, slots)
  if (haul.includeCoins && currencyGp > 0) {
    lines.push(coinsLine(currencyGp))
  }
  return lines
}

export function rerollLootLine(
  catalog: ItemDefinition[],
  haul: LootHaul,
  line: LootLine,
): LootLine {
  if (line.kind === 'coins') {
    const { currencyGp } = slotsForHaul(haul)
    return coinsLine(currencyGp)
  }
  const role = line.role ?? 'permanent'
  const slotLevel = line.slotLevel ?? line.level ?? haul.partyLevel
  const usedIds = new Set(
    haul.lines
      .filter((other) => other.id !== line.id && other.definitionId)
      .map((other) => other.definitionId as string),
  )
  const pool = poolForSlot(catalog, haul, role, slotLevel)
  const picked = pickWeighted(pool, usedIds, role === 'consumable')
  if (!picked) return line
  return {
    ...lineFromItem(picked, role, slotLevel),
    id: line.id,
    quantity: line.quantity,
  }
}

export function haulAsPlainText(haul: LootHaul): string {
  const kindLabel =
    haul.kind === 'level'
      ? 'tesouro do nível'
      : haul.kind === 'encounter'
        ? `encontro ${threatLabel(haul.encounterThreat)}`
        : 'saque livre'
  const header = [
    haul.name,
    `Nível ${haul.partyLevel} · ${haul.partySize} personagem(ns) · ${kindLabel}`,
    '',
  ]
  const body = haul.lines.map((line) => {
    const claimed = line.claimedByName ? ` → ${line.claimedByName}` : ''
    if (line.kind === 'coins') {
      const gp = (line.coinsCp ?? 0) / 100
      return `• Moedas: ${gp} po${claimed}`
    }
    const qty = line.quantity > 1 ? ` ×${line.quantity}` : ''
    const level = line.level != null ? ` (nv. ${line.level})` : ''
    return `• ${line.name}${qty}${level}${claimed}`
  })
  if (haul.notes.trim()) {
    body.push('', haul.notes.trim())
  }
  return [...header, ...body].join('\n')
}

export function threatLabel(threat: EncounterThreat): string {
  return {
    low: 'leve',
    moderate: 'moderado',
    severe: 'severo',
    extreme: 'extremo',
  }[threat]
}
