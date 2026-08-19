import type { Creature, CreatureFamily, CreaturePowerVariant } from '@/types/creature'
import { isHomebrewCreature } from '@/types/creature'
import type {
  CombatThreat,
  EncounterLine,
  EncounterPlan,
  EncounterShape,
} from '@/types/encounter'
import { createId } from '@/utils/id'

/**
 * XP da criatura pelo nível relativo ao grupo (GM Core / Foundry encounter builder).
 * Fora de −4…+4 a criatura não entra no orçamento (XP 0).
 */
export const CREATURE_XP_BY_DELTA: Record<number, number> = {
  [-4]: 10,
  [-3]: 15,
  [-2]: 20,
  [-1]: 30,
  [0]: 40,
  [1]: 60,
  [2]: 80,
  [3]: 120,
  [4]: 160,
}

/** Orçamento para 4 PCs. */
export const THREAT_XP_BUDGET_4PC: Record<CombatThreat, number> = {
  trivial: 40,
  low: 60,
  moderate: 80,
  severe: 120,
  extreme: 160,
}

/** Ajuste por personagem a mais ou a menos que 4. */
export const THREAT_XP_PER_PC: Record<CombatThreat, number> = {
  trivial: 10,
  low: 15,
  moderate: 20,
  severe: 30,
  extreme: 40,
}

const RARITY_WEIGHT = {
  common: 10,
  uncommon: 4,
  rare: 1,
  unique: 0.2,
} as const

const BROAD_TRAITS = new Set([
  'humanoid',
  'humanoide',
  'animal',
  'beast',
  'fera',
])

const NON_TYPE_TRAITS = new Set([
  'common',
  'uncommon',
  'rare',
  'unique',
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
  'minúsculo',
  'minusculo',
  'pequeno',
  'médio',
  'medio',
  'grande',
  'enorme',
  'imenso',
  'holy',
  'unholy',
  'sagrado',
  'profano',
  'amphibious',
  'aquatic',
  'anfíbio',
  'anfibio',
  'aquático',
  'aquatico',
])

const MAX_CREATURES = 24
const MAX_PICK_ATTEMPTS = 60

export const COMBAT_THREATS: CombatThreat[] = [
  'trivial',
  'low',
  'moderate',
  'severe',
  'extreme',
]

export const ENCOUNTER_SHAPES: EncounterShape[] = ['boss', 'balanced', 'horde']

export function resolveEncounterShape(
  shape: EncounterShape | null | undefined,
): EncounterShape {
  if (shape === 'boss' || shape === 'horde' || shape === 'balanced') return shape
  return 'balanced'
}

export function encounterShapeLabel(shape: EncounterShape): string {
  return {
    boss: 'chefe',
    balanced: 'equilíbrio',
    horde: 'horda',
  }[shape]
}

/** Faixa de delta (nível da ficha − nível do grupo) que o modo prefere. */
export function preferredDeltaRange(
  shape: EncounterShape,
  partyLevel: number,
): { min: number; max: number } {
  const level = Number.isFinite(partyLevel) ? partyLevel : 1
  if (shape === 'boss') {
    if (level <= 4) return { min: 0, max: 2 }
    if (level <= 12) return { min: 1, max: 3 }
    return { min: 1, max: 4 }
  }
  if (shape === 'balanced') {
    if (level <= 4) return { min: -2, max: 1 }
    if (level <= 12) return { min: -3, max: 2 }
    return { min: -4, max: 3 }
  }
  if (level <= 4) return { min: -2, max: 0 }
  if (level <= 10) return { min: -4, max: -1 }
  return { min: -4, max: -2 }
}

function fallbackDeltaRange(
  shape: EncounterShape,
): { min: number; max: number } {
  if (shape === 'boss') return { min: -1, max: 4 }
  if (shape === 'balanced') return { min: -4, max: 3 }
  return { min: -4, max: 0 }
}

function deltaInRange(
  delta: number,
  range: { min: number; max: number },
): boolean {
  return delta >= range.min && delta <= range.max
}

/**
 * Quantas criaturas o sorteio mira. Nível baixo = menos corpos;
 * nível alto = mais, principalmente na horda.
 */
export function encounterCountRange(
  shape: EncounterShape,
  partyLevel: number,
  partySize: number,
  threat: CombatThreat,
): { min: number; max: number } {
  const level = Math.min(20, Math.max(1, Math.round(partyLevel) || 1))
  const extraHeads = partySize > 4 ? 1 : 0
  if (shape === 'boss') {
    const max = Math.min(4, 1 + Math.floor((level - 1) / 6) + extraHeads)
    return { min: 1, max: Math.max(1, max) }
  }
  const threatBoost =
    threat === 'extreme' ? 3 : threat === 'severe' ? 2 : threat === 'moderate' ? 1 : 0
  if (shape === 'balanced') {
    const min = 2 + Math.floor((level - 1) / 6) + extraHeads
    const max = Math.min(
      MAX_CREATURES,
      4 + Math.floor((level - 1) / 3) + threatBoost + extraHeads,
    )
    return { min, max: Math.max(min, max) }
  }
  const min = 3 + Math.floor((level - 1) / 5) + extraHeads
  const max = Math.min(
    MAX_CREATURES,
    6 + Math.floor((level - 1) / 2) + threatBoost + extraHeads,
  )
  return { min, max: Math.max(min, max) }
}

export type EncounterCatalogCreature = Pick<
  Creature,
  | 'id'
  | 'name'
  | 'originalName'
  | 'level'
  | 'rarity'
  | 'traits'
  | 'familyIds'
  | 'provenance'
>

export type EncounterFamily = Pick<CreatureFamily, 'id' | 'name' | 'trait'>

export interface EncounterGenerateInput {
  partyLevel: number
  partySize: number
  threat: CombatThreat
  shape?: EncounterShape | null
  prioritizeSameType: boolean
  rarities: EncounterPlan['rarities']
  /** `null`/omitido = todos. `[]` = nenhum. */
  traits?: string[] | null
  includeHomebrew: boolean
  includeUnique: boolean
  themeKey?: string | null
}

export interface EncounterGenerateResult {
  lines: EncounterLine[]
  themeKey: string | null
  themeLabel: string | null
}

export interface EncounterTheme {
  key: string
  label: string
}

/** Monster Core: Elite +1 (ou +2 se nível ≤ 0); Fraca −1 (ou −2 se nível 1). */
export function encounterLevelForVariant(
  baseLevel: number,
  variant: CreaturePowerVariant,
): number {
  if (variant === 'elite') return baseLevel <= 0 ? baseLevel + 2 : baseLevel + 1
  if (variant === 'weak') return baseLevel === 1 ? baseLevel - 2 : baseLevel - 1
  return baseLevel
}

export function creatureEncounterXp(
  creatureLevel: number,
  partyLevel: number,
): number {
  const delta = creatureLevel - partyLevel
  return CREATURE_XP_BY_DELTA[delta] ?? 0
}

export function encounterXpBudget(
  threat: CombatThreat,
  partySize: number,
): number {
  const size = Number.isFinite(partySize) ? Math.max(1, Math.round(partySize)) : 4
  const base = THREAT_XP_BUDGET_4PC[threat]
  const per = THREAT_XP_PER_PC[threat]
  return Math.max(per, base + (size - 4) * per)
}

export function encounterLinesXp(lines: EncounterLine[]): number {
  return lines.reduce(
    (sum, line) => sum + line.xpEach * Math.max(1, line.quantity),
    0,
  )
}

export function combatThreatLabel(threat: CombatThreat): string {
  return {
    trivial: 'trivial',
    low: 'leve',
    moderate: 'moderado',
    severe: 'severo',
    extreme: 'extremo',
  }[threat]
}

export function familiesForCreature(
  creature: Pick<EncounterCatalogCreature, 'traits' | 'familyIds'>,
  families: EncounterFamily[],
): EncounterFamily[] {
  const fromIds = (creature.familyIds ?? [])
    .map((id) => families.find((family) => family.id === id))
    .filter((family): family is EncounterFamily => family != null)
  if (fromIds.length > 0) return fromIds
  return families.filter(
    (family) => family.trait != null && creature.traits.includes(family.trait),
  )
}

export function themeKeysForCreature(
  creature: EncounterCatalogCreature,
  families: EncounterFamily[],
): EncounterTheme[] {
  const matched = familiesForCreature(creature, families)
  const specific = matched.filter((family) => {
    const trait = family.trait?.trim().toLowerCase() ?? ''
    return !trait || !BROAD_TRAITS.has(trait)
  })
  const use = specific.length > 0 ? specific : matched
  if (use.length > 0) {
    return use.map((family) => ({ key: family.id, label: family.name }))
  }

  const trait = creature.traits.find((entry) => {
    const key = entry.trim().toLowerCase()
    return key.length > 0 && !NON_TYPE_TRAITS.has(key) && !BROAD_TRAITS.has(key)
  })
  if (trait) return [{ key: `trait:${trait.toLowerCase()}`, label: trait }]

  const broad = creature.traits.find((entry) =>
    BROAD_TRAITS.has(entry.trim().toLowerCase()),
  )
  if (broad) return [{ key: `trait:${broad.toLowerCase()}`, label: broad }]

  return [{ key: `solo:${creature.id}`, label: creature.name }]
}

export function creatureMatchesTheme(
  creature: EncounterCatalogCreature,
  families: EncounterFamily[],
  themeKey: string | null | undefined,
): boolean {
  if (!themeKey) return true
  return themeKeysForCreature(creature, families).some(
    (theme) => theme.key === themeKey,
  )
}

function refreshLine(
  line: EncounterLine,
  partyLevel: number,
): EncounterLine {
  const level = encounterLevelForVariant(line.baseLevel, line.variant)
  return {
    ...line,
    level,
    xpEach: creatureEncounterXp(level, partyLevel),
  }
}

export function refreshEncounterLines(
  lines: EncounterLine[],
  partyLevel: number,
): EncounterLine[] {
  return lines.map((line) => refreshLine(line, partyLevel))
}

export function lineFromCreature(
  creature: EncounterCatalogCreature,
  partyLevel: number,
  families: EncounterFamily[],
  variant: CreaturePowerVariant = 'normal',
): EncounterLine {
  const themes = themeKeysForCreature(creature, families)
  const theme = themes[0]
  const base: EncounterLine = {
    id: createId('enc-line'),
    creatureId: creature.id,
    name: creature.name,
    originalName: creature.originalName,
    quantity: 1,
    baseLevel: creature.level,
    variant,
    level: creature.level,
    xpEach: 0,
    rarity: creature.rarity,
    themeKey: theme?.key,
    themeLabel: theme?.label,
  }
  return refreshLine(base, partyLevel)
}

export function creatureMatchesTraitFilter(
  creatureTraits: string[],
  selected: string[] | null | undefined,
): boolean {
  if (selected == null) return true
  if (selected.length === 0) return false
  const allowed = new Set(selected)
  return creatureTraits.some((trait) => allowed.has(trait))
}

function matchesFilters(
  creature: EncounterCatalogCreature,
  input: EncounterGenerateInput,
): boolean {
  if (!input.includeHomebrew && isHomebrewCreature(creature)) return false
  if (!input.includeUnique && creature.rarity === 'unique') return false
  if (input.rarities.length > 0 && !input.rarities.includes(creature.rarity)) {
    return false
  }
  if (!creatureMatchesTraitFilter(creature.traits, input.traits)) return false
  return true
}

function eligiblePool(
  catalog: EncounterCatalogCreature[],
  families: EncounterFamily[],
  input: EncounterGenerateInput,
  themeKey: string | null,
): EncounterCatalogCreature[] {
  return catalog.filter((creature) => {
    if (!matchesFilters(creature, input)) return false
    const xp = creatureEncounterXp(creature.level, input.partyLevel)
    if (xp <= 0) return false
    if (themeKey && !creatureMatchesTheme(creature, families, themeKey)) {
      return false
    }
    return true
  })
}

function pickWeighted<T>(
  items: T[],
  weightOf: (item: T) => number,
  random: () => number,
): T | null {
  if (items.length === 0) return null
  const weights = items.map((item) => Math.max(0, weightOf(item)))
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  if (total <= 0) return items[Math.floor(random() * items.length)] ?? null
  let roll = random() * total
  for (let i = 0; i < items.length; i += 1) {
    roll -= weights[i] ?? 0
    if (roll <= 0) return items[i] ?? null
  }
  return items.at(-1) ?? null
}

function pickTheme(
  pool: EncounterCatalogCreature[],
  families: EncounterFamily[],
  input: EncounterGenerateInput,
  random: () => number,
): EncounterTheme | null {
  const budget = encounterXpBudget(input.threat, input.partySize)
  const groups = new Map<string, { label: string; creatures: EncounterCatalogCreature[] }>()

  for (const creature of pool) {
    for (const theme of themeKeysForCreature(creature, families)) {
      const group = groups.get(theme.key)
      if (group) {
        if (!group.creatures.some((entry) => entry.id === creature.id)) {
          group.creatures.push(creature)
        }
      } else {
        groups.set(theme.key, { label: theme.label, creatures: [creature] })
      }
    }
  }

  const shape = resolveEncounterShape(input.shape)
  const preferred = preferredDeltaRange(shape, input.partyLevel)
  const bossBand = preferredDeltaRange('boss', input.partyLevel)
  const hordeBand = preferredDeltaRange('horde', input.partyLevel)
  const viable: Array<{
    theme: EncounterTheme
    count: number
    preferred: number
    mixed: number
  }> = []
  for (const [key, group] of groups) {
    const minXp = Math.min(
      ...group.creatures.map((creature) =>
        creatureEncounterXp(creature.level, input.partyLevel),
      ),
    )
    if (!(minXp > 0 && minXp <= budget)) continue
    if (key.startsWith('solo:') && groups.size > 1) continue
    const preferredCount = group.creatures.filter((creature) =>
      deltaInRange(creature.level - input.partyLevel, preferred),
    ).length
    const bossCount = group.creatures.filter((creature) =>
      deltaInRange(creature.level - input.partyLevel, bossBand),
    ).length
    const hordeCount = group.creatures.filter((creature) =>
      deltaInRange(creature.level - input.partyLevel, hordeBand),
    ).length
    viable.push({
      theme: { key, label: group.label },
      count: group.creatures.length,
      preferred: preferredCount,
      mixed: bossCount > 0 && hordeCount > 0 ? bossCount + hordeCount : 0,
    })
  }

  if (viable.length === 0) return null

  const mixed = viable.filter((entry) => entry.mixed > 0)
  const withPreferred = viable.filter((entry) => entry.preferred > 0)
  const candidates =
    shape === 'balanced' && mixed.length > 0
      ? mixed
      : withPreferred.length > 0
        ? withPreferred
        : viable
  const picked = pickWeighted(
    candidates,
    (entry) =>
      entry.count +
      entry.preferred * 2 +
      (shape === 'balanced' ? entry.mixed * 3 : 0),
    random,
  )
  return picked?.theme ?? null
}

function creatureWeight(creature: EncounterCatalogCreature): number {
  return RARITY_WEIGHT[creature.rarity] ?? 1
}

function randomInt(min: number, max: number, random: () => number): number {
  const low = Math.ceil(min)
  const high = Math.floor(max)
  if (high <= low) return low
  return low + Math.floor(random() * (high - low + 1))
}

function xpOf(
  creature: EncounterCatalogCreature,
  partyLevel: number,
): number {
  return creatureEncounterXp(creature.level, partyLevel)
}

function poolForShape(
  pool: EncounterCatalogCreature[],
  partyLevel: number,
  shape: EncounterShape,
): EncounterCatalogCreature[] {
  const preferred = preferredDeltaRange(shape, partyLevel)
  const inPreferred = pool.filter((creature) =>
    deltaInRange(creature.level - partyLevel, preferred),
  )
  if (inPreferred.length > 0) return inPreferred
  const fallback = fallbackDeltaRange(shape)
  const inFallback = pool.filter((creature) =>
    deltaInRange(creature.level - partyLevel, fallback),
  )
  return inFallback.length > 0 ? inFallback : pool
}

function pickCreatureForShape(
  candidates: EncounterCatalogCreature[],
  usedIds: Set<string>,
  remaining: number,
  partyLevel: number,
  shape: EncounterShape,
  random: () => number,
  preferNewSheet: boolean,
): EncounterCatalogCreature | null {
  const fitting = candidates.filter(
    (creature) => xpOf(creature, partyLevel) <= remaining,
  )
  if (fitting.length === 0) return null

  const unused = fitting.filter((creature) => !usedIds.has(creature.id))
  const pool =
    preferNewSheet && unused.length > 0 ? unused : fitting.length > 0 ? fitting : unused

  if (shape === 'horde') {
    return pickWeighted(
      pool,
      (creature) =>
        creatureWeight(creature) * Math.max(1, 170 - xpOf(creature, partyLevel)),
      random,
    )
  }
  return pickWeighted(
    pool,
    (creature) => creatureWeight(creature) * xpOf(creature, partyLevel),
    random,
  )
}

function cheapestXp(
  source: EncounterCatalogCreature[],
  partyLevel: number,
): number {
  const values = source
    .map((creature) => xpOf(creature, partyLevel))
    .filter((xp) => xp > 0)
  return values.length > 0 ? Math.min(...values) : 0
}

function fillWithShape(
  source: EncounterCatalogCreature[],
  shape: 'boss' | 'horde',
  input: EncounterGenerateInput,
  families: EncounterFamily[],
  random: () => number,
  phaseBudget: number,
  counts: Map<string, EncounterLine>,
): void {
  if (source.length === 0 || phaseBudget < 10) return

  const cheapest = cheapestXp(source, input.partyLevel)
  if (!Number.isFinite(cheapest) || cheapest <= 0 || cheapest > phaseBudget) return

  const range = encounterCountRange(
    shape,
    input.partyLevel,
    input.partySize,
    input.threat,
  )
  const already = [...counts.values()].reduce(
    (sum, line) => sum + Math.max(1, line.quantity),
    0,
  )
  const maxByXp = Math.floor(phaseBudget / cheapest)
  const target = Math.max(
    1,
    Math.min(randomInt(range.min, range.max, random), maxByXp, MAX_CREATURES),
  )
  const cap =
    shape === 'horde'
      ? Math.min(
          MAX_CREATURES,
          Math.max(target + already, Math.min(range.max, maxByXp) + already),
        )
      : already + target
  const maxSheets = shape === 'boss' ? 2 : 3
  const stackChance = shape === 'horde' ? 0.7 : 0.25

  let remaining = phaseBudget
  let totalQty = already
  let attempts = 0
  const phaseIds = new Set<string>()
  const sourceIds = new Set(source.map((creature) => creature.id))

  while (
    remaining >= cheapest &&
    totalQty < cap &&
    attempts < MAX_PICK_ATTEMPTS
  ) {
    attempts += 1
    const stackable = [...counts.values()].filter(
      (line) =>
        line.xpEach > 0 &&
        line.xpEach <= remaining &&
        sourceIds.has(line.creatureId),
    )
    const atSheetCap = phaseIds.size >= maxSheets
    const wantStack =
      stackable.length > 0 &&
      (atSheetCap || (phaseIds.size > 0 && random() < stackChance))

    if (wantStack) {
      const line = pickWeighted(
        stackable,
        (entry) =>
          shape === 'horde' ? Math.max(1, 80 - entry.xpEach) : entry.xpEach,
        random,
      )
      if (!line) break
      const room = Math.min(cap - totalQty, Math.floor(remaining / line.xpEach))
      if (room < 1) {
        if (stackable.every((entry) => entry.xpEach > remaining)) break
        continue
      }
      const add = shape === 'boss' ? 1 : randomInt(1, room, random)
      line.quantity += add
      remaining -= add * line.xpEach
      totalQty += add
      continue
    }

    const preferNewSheet = phaseIds.size > 0 && phaseIds.size < maxSheets
    const creature = pickCreatureForShape(
      source,
      new Set(counts.keys()),
      remaining,
      input.partyLevel,
      shape,
      random,
      preferNewSheet,
    )
    if (!creature) {
      if (stackable.length === 0) break
      continue
    }
    const xp = xpOf(creature, input.partyLevel)
    const room = Math.min(cap - totalQty, Math.floor(remaining / xp))
    if (room < 1) break

    let add: number
    if (shape === 'boss') {
      add = room >= 2 && target >= 2 && random() < 0.2 ? Math.min(2, room) : 1
    } else {
      const want = Math.max(1, target - (totalQty - already))
      const chunkMax = Math.min(room, want)
      add =
        chunkMax <= 1
          ? 1
          : randomInt(Math.min(2, chunkMax), chunkMax, random)
    }

    const existing = counts.get(creature.id)
    if (existing) {
      existing.quantity += add
    } else {
      const line = lineFromCreature(creature, input.partyLevel, families)
      line.quantity = add
      counts.set(creature.id, line)
    }
    phaseIds.add(creature.id)
    remaining -= add * xp
    totalQty += add
  }
}

function fillBalanced(
  pool: EncounterCatalogCreature[],
  input: EncounterGenerateInput,
  families: EncounterFamily[],
  random: () => number,
): EncounterLine[] {
  const budget = encounterXpBudget(input.threat, input.partySize)
  const bossSource = poolForShape(pool, input.partyLevel, 'boss')
  const hordeSource = poolForShape(pool, input.partyLevel, 'horde')
  const counts = new Map<string, EncounterLine>()

  if (bossSource.length === 0) {
    fillWithShape(hordeSource.length > 0 ? hordeSource : pool, 'horde', input, families, random, budget, counts)
    return [...counts.values()]
  }
  if (hordeSource.length === 0) {
    fillWithShape(bossSource, 'boss', input, families, random, budget, counts)
    return [...counts.values()]
  }

  const cheapestHorde = cheapestXp(hordeSource, input.partyLevel)
  const cheapestBoss = cheapestXp(bossSource, input.partyLevel)
  if (cheapestHorde <= 0) {
    fillWithShape(bossSource, 'boss', input, families, random, budget, counts)
    return [...counts.values()]
  }
  if (cheapestBoss <= 0) {
    fillWithShape(hordeSource, 'horde', input, families, random, budget, counts)
    return [...counts.values()]
  }

  const minMinions =
    input.partyLevel <= 4 ? 1 : input.partyLevel <= 10 ? 2 : 3
  const reserved = cheapestHorde * minMinions
  let bossPhaseBudget = budget - reserved
  if (bossPhaseBudget < cheapestBoss) {
    if (cheapestBoss <= budget - cheapestHorde) {
      bossPhaseBudget = cheapestBoss
    } else if (cheapestBoss <= budget) {
      fillWithShape(bossSource, 'boss', input, families, random, budget, counts)
      return [...counts.values()]
    } else {
      fillWithShape(hordeSource, 'horde', input, families, random, budget, counts)
      return [...counts.values()]
    }
  }
  bossPhaseBudget = Math.min(bossPhaseBudget, Math.floor(budget * 0.75))
  if (bossPhaseBudget < cheapestBoss) bossPhaseBudget = cheapestBoss

  fillWithShape(
    bossSource,
    'boss',
    input,
    families,
    random,
    bossPhaseBudget,
    counts,
  )

  const spent = encounterLinesXp([...counts.values()])
  const leftover = budget - spent
  if (leftover < cheapestHorde) return [...counts.values()]

  const strongest = Math.max(
    0,
    ...[...counts.values()].map((line) => line.xpEach),
  )
  let minions = hordeSource.filter(
    (creature) => xpOf(creature, input.partyLevel) < strongest,
  )
  if (minions.length === 0) {
    minions = hordeSource.filter(
      (creature) =>
        xpOf(creature, input.partyLevel) <= strongest &&
        !counts.has(creature.id),
    )
  }
  if (minions.length === 0) minions = hordeSource

  fillWithShape(
    minions,
    'horde',
    input,
    families,
    random,
    leftover,
    counts,
  )
  return [...counts.values()]
}

function fillLines(
  pool: EncounterCatalogCreature[],
  input: EncounterGenerateInput,
  families: EncounterFamily[],
  random: () => number,
): EncounterLine[] {
  const shape = resolveEncounterShape(input.shape)
  if (shape === 'balanced') {
    return fillBalanced(pool, input, families, random)
  }

  const source = poolForShape(pool, input.partyLevel, shape)
  if (source.length === 0) return []
  const budget = encounterXpBudget(input.threat, input.partySize)
  const counts = new Map<string, EncounterLine>()
  fillWithShape(source, shape, input, families, random, budget, counts)
  return [...counts.values()]
}

export function generateEncounterLines(
  input: EncounterGenerateInput,
  catalog: EncounterCatalogCreature[],
  families: EncounterFamily[],
  options?: { random?: () => number },
): EncounterGenerateResult {
  const random = options?.random ?? Math.random
  const filtered = eligiblePool(catalog, families, input, null)
  let themeKey: string | null = null
  let themeLabel: string | null = null

  if (input.prioritizeSameType) {
    let theme: EncounterTheme | null = null
    if (input.themeKey) {
      const sample = filtered.find((creature) =>
        creatureMatchesTheme(creature, families, input.themeKey),
      )
      if (sample) {
        theme =
          themeKeysForCreature(sample, families).find(
            (entry) => entry.key === input.themeKey,
          ) ?? { key: input.themeKey, label: sample.name }
      }
    }
    theme ??= pickTheme(filtered, families, input, random)
    if (theme) {
      themeKey = theme.key
      themeLabel = theme.label
    }
  }

  const pool = themeKey
    ? eligiblePool(catalog, families, input, themeKey)
    : filtered
  const source = pool.length > 0 ? pool : filtered
  const lines = fillLines(source, input, families, random)

  return {
    lines,
    themeKey: input.prioritizeSameType ? themeKey : null,
    themeLabel: input.prioritizeSameType ? themeLabel : null,
  }
}

export function rerollEncounterLine(
  line: EncounterLine,
  plan: EncounterGenerateInput,
  catalog: EncounterCatalogCreature[],
  families: EncounterFamily[],
  currentLines: EncounterLine[],
  options?: { random?: () => number },
): EncounterLine {
  const random = options?.random ?? Math.random
  const budget = encounterXpBudget(plan.threat, plan.partySize)
  const spentWithout =
    encounterLinesXp(currentLines) - line.xpEach * Math.max(1, line.quantity)
  const room = Math.max(10, budget - spentWithout)
  const themeKey = plan.prioritizeSameType ? (plan.themeKey ?? null) : null
  const shape = resolveEncounterShape(plan.shape)
  const role: 'boss' | 'horde' =
    shape === 'balanced'
      ? line.level >= plan.partyLevel
        ? 'boss'
        : 'horde'
      : shape
  const eligible = eligiblePool(catalog, families, plan, themeKey).filter(
    (creature) => creature.id !== line.creatureId,
  )
  const shaped = poolForShape(eligible, plan.partyLevel, role)
  const pool = (shaped.length > 0 ? shaped : eligible).filter((creature) => {
    const xp = creatureEncounterXp(creature.level, plan.partyLevel)
    return xp > 0 && xp <= room
  })
  const source = pool.length > 0 ? pool : eligible
  const picked = pickWeighted(
    source,
    (creature) => {
      const xp = creatureEncounterXp(creature.level, plan.partyLevel)
      return role === 'boss'
        ? creatureWeight(creature) * Math.max(1, xp)
        : creatureWeight(creature) * Math.max(1, 170 - xp)
    },
    random,
  )
  if (!picked) return line

  const xp = creatureEncounterXp(picked.level, plan.partyLevel)
  const maxQty =
    xp > 0 ? Math.max(1, Math.min(line.quantity, Math.floor(room / xp))) : 1
  const next = lineFromCreature(picked, plan.partyLevel, families)
  next.quantity = maxQty
  return next
}

export function encounterAsPlainText(
  plan: Pick<
    EncounterPlan,
    | 'name'
    | 'partyLevel'
    | 'partySize'
    | 'threat'
    | 'shape'
    | 'prioritizeSameType'
    | 'themeLabel'
    | 'lines'
    | 'notes'
  >,
): string {
  const budget = encounterXpBudget(plan.threat, plan.partySize)
  const used = encounterLinesXp(plan.lines)
  const header = [
    plan.name,
    `Nível ${plan.partyLevel} · ${plan.partySize} personagem(ns) · ${combatThreatLabel(plan.threat)} · ${encounterShapeLabel(resolveEncounterShape(plan.shape))} · ${used}/${budget} XP`,
  ]
  if (plan.prioritizeSameType && plan.themeLabel) {
    header.push(`Tipo: ${plan.themeLabel}`)
  }
  header.push('')
  const body = plan.lines.map((line) => {
    const qty = line.quantity > 1 ? ` ×${line.quantity}` : ''
    const variant =
      line.variant === 'normal'
        ? ''
        : line.variant === 'elite'
          ? ' (Elite)'
          : ' (Fraca)'
    return `• ${line.name}${variant}${qty} — nv. ${line.level} · ${line.xpEach * line.quantity} XP`
  })
  if (plan.notes.trim()) {
    body.push('', plan.notes.trim())
  }
  return [...header, ...body].join('\n')
}
