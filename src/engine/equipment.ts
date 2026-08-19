import type { AttributeId, ProficiencyRank, SkillId } from '@/types'
import type { CreatureSize } from '@/types'
import type {
  AlchemicalBombStats,
  ArmorStats,
  BulkValue,
  DamageTypeId,
  EquipmentItem,
  ItemDefinition,
  ResolvedEquipment,
  ResolvedInventoryItem,
  ResolvedRunes,
  ResolvedWeaponAttack,
  ResolvedWieldedShield,
  ResolvedWornArmor,
  RuneAppliesTo,
  RuneExtraDamage,
  RuneReinforcing,
  RuneStats,
  ShieldStats,
  WeaponGroupId,
  WeaponStats,
} from '@/types/equipment'
import {
  BULK_LIMIT_BASE,
  BULK_MAXIMUM_BASE,
  DAMAGE_TYPE_LABELS,
  DEFAULT_INVESTMENT_LIMIT,
  LIGHT_BULK_PER_BULK,
} from '@/types/equipment'
import { PROFICIENCY_LABELS, SKILL_LABELS } from '@/utils/labels'
import { getItemDefinition, listItemDefinitions, slotFromCategory } from './equipmentCatalog'
import { collectWornMagic } from './wornMagic'
import { getSpellById } from '@/engine/spellCatalog'
import {
  getAttackRankForWeapon,
  type ResolvedClassBenefits,
} from './class'
import { calculateProficiencyBonus } from './proficiency'
import {
  bestFamiliarityShift,
  pickBetterRank,
  type WeaponFamiliarityGrant,
} from './training'
import {
  combinationDisplayName,
  combinationPartnerDefinitionId,
  isCombinationWeapon,
} from './combinationWeapons'

/** Perícias de FOR/DES que sofrem penalidade de teste da armadura (não-ataque). */
const ARMOR_CHECK_PENALTY_SKILLS: SkillId[] = [
  'acrobatics',
  'athletics',
  'stealth',
  'thievery',
]

export interface ResolveEquipmentInput {
  items: EquipmentItem[]
  level: number
  strengthModifier: number
  dexterityModifier: number
  classBenefits?: ResolvedClassBenefits | null
  investmentLimit?: number
  weaponFamiliarities?: WeaponFamiliarityGrant[]
  /** Tamanho efetivo (Minúsculo ajusta carga e alcance). */
  size?: CreatureSize | null
  /**
   * Dado do punho quando Punho Poderoso (ou equivalente) sobe 1d4 → 1d6.
   * Player Core: Fist 1d4 B, ágil, finura, não letal, desarmado.
   */
  fistDamageDie?: string
}

/** Punho do Player Core — golpe desarmado que todo mundo tem. */
export const FIST_ITEM_DEFINITION_ID = 'weapon-356'
/** Ataque desarmado inato (não entra no inventário). */
export const INNATE_UNARMED_ITEM_ID = 'innate-unarmed-fist'

const IMPROVED_FIST_SOURCE_IDS = new Set([
  'monk-powerful-fist',
  'feat-martial-artist-dedication',
  'feat-magus-arcane-fists',
  'feat-talos-ferrousoul',
  'feat-spirit-warrior-dedication',
  'warrior-fist',
])

/** 1d6 se o personagem tem Punho Poderoso, Dedicação de Artista Marcial, etc. */
export function improvedFistDamageDie(
  sourceIds: Iterable<string>,
): string | undefined {
  for (const id of sourceIds) {
    if (IMPROVED_FIST_SOURCE_IDS.has(id)) return '1d6'
  }
  return undefined
}

export function emptyEquipmentItem(): EquipmentItem {
  return {
    id: '',
    name: '',
    slot: 'other',
    quantity: 1,
    equipped: true,
    invested: false,
    bulk: '',
    notes: '',
    definitionId: null,
    runeIds: [],
    raised: false,
  }
}

export function bulkToNumeric(bulk: BulkValue): number {
  switch (bulk.unit) {
    case 'negligible':
      return 0
    case 'light':
      return bulk.count / LIGHT_BULK_PER_BULK
    case 'bulk':
      return bulk.count
  }
}

export function parseBulkString(raw: string | null | undefined): BulkValue {
  if (raw == null) return { unit: 'negligible' }
  const text = raw.trim().toLowerCase()
  if (!text || text === '—' || text === '-' || text === 'n' || text === 'neg') {
    return { unit: 'negligible' }
  }
  if (text === 'l' || text === 'light') {
    return { unit: 'light', count: 1 }
  }
  const lightMatch = text.match(/^(\d+(?:[.,]\d+)?)\s*l$/)
  if (lightMatch) {
    return { unit: 'light', count: Number((lightMatch[1] ?? '1').replace(',', '.')) }
  }
  const n = Number(text.replace(',', '.'))
  if (!Number.isFinite(n) || n <= 0) return { unit: 'negligible' }
  if (n < 1) return { unit: 'light', count: Math.round(n * LIGHT_BULK_PER_BULK) }
  return { unit: 'bulk', count: n }
}

export function formatBulk(bulk: BulkValue): string {
  switch (bulk.unit) {
    case 'negligible':
      return '—'
    case 'light':
      return bulk.count === 1 ? 'L' : `${bulk.count} L`
    case 'bulk':
      return String(bulk.count)
  }
}

export function formatPriceCp(priceCp: number | null | undefined): string {
  if (priceCp == null) return '—'
  if (priceCp <= 0) return '—'
  if (priceCp % 100 === 0) return `${priceCp / 100} po`
  if (priceCp % 10 === 0) return `${priceCp / 10} pp`
  return `${priceCp} pc`
}

const RUNE_HOST_LABELS: Record<RuneAppliesTo, string> = {
  weapon: 'arma',
  armor: 'armadura',
  shield: 'escudo',
}

/** Resumo curto da runa (potência, dados, resistência) — o texto completo fica em `description`. */
export function formatRuneSummary(def: ItemDefinition): string {
  const rune = def.rune
  if (!rune) return ''
  const parts: string[] = []
  parts.push(rune.kind === 'fundamental' ? 'Fundamental' : 'Propriedade')
  if (rune.appliesTo.length > 0) {
    parts.push(`grava em ${rune.appliesTo.map((target) => RUNE_HOST_LABELS[target] ?? target).join(', ')}`)
  }
  if (rune.potency != null) parts.push(`potência +${rune.potency}`)
  if (rune.strikingDice != null) parts.push(`+${rune.strikingDice} dado(s) de dano`)
  if (rune.resilientBonus != null) parts.push(`+${rune.resilientBonus} nas salvaguardas`)
  if (rune.kind === 'property') parts.push('ocupa 1 espaço (limite = potência)')
  for (const part of rune.extraDamage ?? []) {
    const type =
      DAMAGE_TYPE_LABELS[part.damageType as keyof typeof DAMAGE_TYPE_LABELS] ??
      part.damageType
    const bits = [`${part.dice} ${type}`]
    if (part.persistent) bits.push('persistente')
    if (part.when === 'crit') bits.push('no crítico')
    if (part.note) bits.push(part.note)
    parts.push(bits.join(' '))
  }
  if (rune.energyResistance) {
    const type =
      DAMAGE_TYPE_LABELS[
        rune.energyResistance.damageType as keyof typeof DAMAGE_TYPE_LABELS
      ] ?? rune.energyResistance.damageType
    parts.push(`resistência ${rune.energyResistance.value} a ${type}`)
  }
  if (rune.reinforcing) {
    parts.push(
      `solidez +${rune.reinforcing.hardness}, PV +${rune.reinforcing.hp}`,
    )
  }
  if (rune.skillBonus) {
    parts.push(
      `+${rune.skillBonus.value} em ${SKILL_LABELS[rune.skillBonus.skillId]}`,
    )
  }
  return parts.join(' · ')
}

export function etchedRuneDefinitions(item: EquipmentItem): ItemDefinition[] {
  const seen = new Set<string>()
  const defs: ItemDefinition[] = []
  for (const id of itemEffectiveRuneIds(item)) {
    if (seen.has(id)) continue
    seen.add(id)
    const def = getItemDefinition(id)
    if (def?.rune) defs.push(def)
  }
  return defs
}

export function emptyResolvedRunes(): ResolvedRunes {
  return {
    potency: 0,
    strikingDice: 0,
    resilientBonus: 0,
    propertyCount: 0,
    propertyLimit: 0,
    labels: [],
    shortLabels: [],
    activeIds: [],
    dormantIds: [],
    extraDamage: [],
    grantedTraits: [],
    reinforcing: null,
    skillBonuses: [],
    energyResistances: [],
    bulkAdjust: 0,
    strengthAdjust: 0,
    overLimit: false,
  }
}

interface LoadedRune {
  id: string
  def: ItemDefinition
  rune: RuneStats
}

function loadRune(id: string): LoadedRune | null {
  const def = getItemDefinition(id)
  if (!def?.rune) return null
  return { id, def, rune: def.rune }
}

/** Uma runa por família (a de maior nível). Propriedades além da potência ficam dormentes. */
export function itemEffectiveRuneIds(item: EquipmentItem): string[] {
  return [...(item.runeIds ?? []), ...(item.temporaryRuneIds ?? [])]
}

export function resolveRunes(runeIds: string[] | undefined): ResolvedRunes {
  const loaded: LoadedRune[] = []
  for (const id of runeIds ?? []) {
    const row = loadRune(id)
    if (row) loaded.push(row)
  }
  if (loaded.length === 0) return emptyResolvedRunes()

  const byFamily = new Map<string, LoadedRune>()
  const familyOrder: string[] = []
  for (const row of loaded) {
    const prev = byFamily.get(row.rune.family)
    if (!prev) {
      byFamily.set(row.rune.family, row)
      familyOrder.push(row.rune.family)
    } else if (row.def.level > prev.def.level) {
      byFamily.set(row.rune.family, row)
    }
  }

  const unique = familyOrder.map((family) => byFamily.get(family)!)
  const kept: LoadedRune[] = []
  const keptFamilies = new Set<string>()
  const dormantIds: string[] = []
  for (const row of unique) {
    const blocked = (row.rune.exclusiveFamilies ?? []).some((family) =>
      keptFamilies.has(family),
    )
    if (blocked) {
      dormantIds.push(row.id)
      continue
    }
    kept.push(row)
    keptFamilies.add(row.rune.family)
  }

  let potency = 0
  let strikingDice = 0
  let resilientBonus = 0
  let reinforcing: RuneReinforcing | null = null
  const fundamentals: LoadedRune[] = []
  const properties: LoadedRune[] = []
  for (const row of kept) {
    if (row.rune.kind === 'fundamental') fundamentals.push(row)
    else properties.push(row)
    if (row.rune.potency != null) potency = Math.max(potency, row.rune.potency)
    if (row.rune.strikingDice != null) {
      strikingDice = Math.max(strikingDice, row.rune.strikingDice)
    }
    if (row.rune.resilientBonus != null) {
      resilientBonus = Math.max(resilientBonus, row.rune.resilientBonus)
    }
    if (row.rune.reinforcing) reinforcing = row.rune.reinforcing
  }

  const propertyLimit = potency
  const activeProps: LoadedRune[] = []
  for (const row of properties) {
    if (activeProps.length < propertyLimit) activeProps.push(row)
    else dormantIds.push(row.id)
  }

  const activeSet = new Set([
    ...fundamentals.map((row) => row.id),
    ...activeProps.map((row) => row.id),
  ])
  const extraDamage: RuneExtraDamage[] = []
  const grantedTraits: string[] = []
  const skillBonuses: Array<{ skillId: SkillId; value: number }> = []
  const energyResistances: Array<{ damageType: string; value: number }> = []
  let bulkAdjust = 0
  let strengthAdjust = 0
  const shortLabels: string[] = []
  const labels: string[] = []
  const activeIds: string[] = []

  const orderedActive = [
    ...fundamentals.filter((row) => row.rune.potency != null),
    ...fundamentals.filter((row) => row.rune.strikingDice != null),
    ...fundamentals.filter((row) => row.rune.resilientBonus != null),
    ...fundamentals.filter((row) => row.rune.reinforcing != null),
    ...activeProps,
  ]
  const seen = new Set<string>()
  for (const row of orderedActive) {
    if (seen.has(row.id)) continue
    seen.add(row.id)
    shortLabels.push(row.rune.shortLabel)
    labels.push(row.def.name)
    activeIds.push(row.id)
  }

  for (const row of kept) {
    if (!activeSet.has(row.id)) continue
    extraDamage.push(...(row.rune.extraDamage ?? []))
    grantedTraits.push(...(row.rune.grantedTraits ?? []))
    if (row.rune.skillBonus) skillBonuses.push(row.rune.skillBonus)
    if (row.rune.energyResistance) {
      energyResistances.push({
        damageType: row.rune.energyResistance.damageType,
        value: row.rune.energyResistance.value,
      })
    }
    bulkAdjust += row.rune.bulkAdjust ?? 0
    strengthAdjust += row.rune.strengthAdjust ?? 0
  }

  return {
    potency,
    strikingDice,
    resilientBonus,
    propertyCount: activeProps.length,
    propertyLimit,
    labels,
    shortLabels,
    activeIds,
    dormantIds,
    extraDamage,
    grantedTraits,
    reinforcing,
    skillBonuses,
    energyResistances,
    bulkAdjust,
    strengthAdjust,
    overLimit: dormantIds.length > 0,
  }
}

export function itemRuneHostKind(
  definition: ItemDefinition | null | undefined,
): RuneAppliesTo | null {
  if (!definition) return null
  if (definition.wornMagic?.unarmedHost) return 'weapon'
  if (definition.category === 'weapon' && definition.weapon) return 'weapon'
  if (definition.category === 'staff' && definition.weapon) return 'weapon'
  if (definition.category === 'armor' && definition.armor) return 'armor'
  if (definition.category === 'shield' && definition.shield) return 'shield'
  return null
}

function weaponDealsType(
  stats: WeaponStats,
  traits: string[],
  ...types: string[]
): boolean {
  if (types.includes(String(stats.damageType))) return true
  return traits.some((trait) => {
    const lower = trait.toLowerCase()
    return types.some((type) => {
      const letter = type[0]
      return (
        lower === `versatile ${letter}` ||
        lower.startsWith(`versatile ${letter}`)
      )
    })
  })
}

function runeRestrictionReason(
  rune: RuneStats,
  host: ItemDefinition,
): string | null {
  const restriction = rune.usageRestriction
  if (!restriction) return null
  const stats = host.weapon
  const armor = host.armor
  const traits = host.traits ?? []
  switch (restriction) {
    case 'melee':
      return stats?.rangeType === 'melee' ? null : 'Só em arma corpo a corpo.'
    case 'ranged':
      return stats?.rangeType === 'ranged' ? null : 'Só em arma à distância.'
    case 'thrown':
      return traitMatches(traits, 'thrown', 'arremesso')
        ? null
        : 'Só em arma de arremesso.'
    case 'melee-piercing-or-slashing':
      if (stats?.rangeType !== 'melee') return 'Só em arma corpo a corpo.'
      return weaponDealsType(stats, traits, 'piercing', 'slashing')
        ? null
        : 'Só em arma perfurante ou cortante.'
    case 'melee-bludgeoning':
      if (stats?.rangeType !== 'melee') return 'Só em arma corpo a corpo.'
      return weaponDealsType(stats, traits, 'bludgeoning')
        ? null
        : 'Só em arma de concussão.'
    case 'melee-slashing':
      if (stats?.rangeType !== 'melee') return 'Só em arma corpo a corpo.'
      return weaponDealsType(stats, traits, 'slashing')
        ? null
        : 'Só em arma cortante.'
    case 'armor-light':
      return armor?.category === 'light' ? null : 'Só em armadura leve.'
    case 'armor-light-or-medium':
      return armor?.category === 'light' || armor?.category === 'medium'
        ? null
        : 'Só em armadura leve ou média.'
    case 'armor-medium-or-heavy':
      return armor?.category === 'medium' || armor?.category === 'heavy'
        ? null
        : 'Só em armadura média ou pesada.'
    case 'not-unholy':
      return traitMatches(traits, 'unholy', 'profano')
        ? 'Não combina com o traço profano.'
        : null
    case 'not-holy':
      return traitMatches(traits, 'holy', 'sagrado')
        ? 'Não combina com o traço sagrado.'
        : null
  }
}

export type EtchCheck =
  | { ok: true; warning?: string }
  | { ok: false; reason: string }

export function canEtchRune(
  item: EquipmentItem,
  runeId: string,
): EtchCheck {
  const host = getItemDefinition(item.definitionId)
  const runeDef = getItemDefinition(runeId)
  if (!runeDef?.rune) return { ok: false, reason: 'Isso não é uma runa do catálogo.' }
  const kind = itemRuneHostKind(host)
  if (!kind || !host) {
    return { ok: false, reason: 'Só dá para gravar em arma, armadura ou escudo do catálogo.' }
  }
  if (!runeDef.rune.appliesTo.includes(kind)) {
    return { ok: false, reason: 'Esta runa não se aplica a este item.' }
  }
  if (host.category === 'staff' && runeDef.rune.kind === 'property') {
    return {
      ok: false,
      reason: 'Cajado mágico só aceita runas fundamentais de arma (potência e impactante).',
    }
  }
  const restriction = runeRestrictionReason(runeDef.rune, host)
  if (restriction) return { ok: false, reason: restriction }

  const remaining = (item.runeIds ?? []).filter((id) => {
    const other = getItemDefinition(id)?.rune
    return other != null && other.family !== runeDef.rune!.family
  })
  for (const id of remaining) {
    const other = getItemDefinition(id)?.rune
    if (!other) continue
    const clash =
      (runeDef.rune.exclusiveFamilies ?? []).includes(other.family) ||
      (other.exclusiveFamilies ?? []).includes(runeDef.rune.family)
    if (clash) {
      return {
        ok: false,
        reason: `Não combina com ${getItemDefinition(id)?.name ?? 'outra runa'}.`,
      }
    }
  }

  const preview = resolveRunes([...remaining, runeId])
  if (preview.overLimit && runeDef.rune.kind === 'property') {
    return {
      ok: true,
      warning:
        'Sem slots de potência suficientes — a runa fica dormente até você gravar uma potência maior.',
    }
  }
  return { ok: true }
}

export function etchRune(
  item: EquipmentItem,
  runeId: string,
): { ok: true; item: EquipmentItem; warning?: string } | { ok: false; reason: string } {
  const check = canEtchRune(item, runeId)
  if (!check.ok) return check
  const runeDef = getItemDefinition(runeId)
  const family = runeDef?.rune?.family
  const current = [...(item.runeIds ?? [])]
  const existingIndex = current.findIndex(
    (id) => getItemDefinition(id)?.rune?.family === family,
  )
  const nextIds =
    existingIndex >= 0
      ? current.map((id, index) => (index === existingIndex ? runeId : id))
      : [...current, runeId]
  const hostKind = itemRuneHostKind(getItemDefinition(item.definitionId))
  return {
    ok: true,
    item: {
      ...item,
      runeIds: nextIds,
      invested: hostKind === 'armor' ? true : item.invested,
    },
    warning: check.warning,
  }
}

export function removeRune(item: EquipmentItem, runeId: string): EquipmentItem {
  return {
    ...item,
    runeIds: (item.runeIds ?? []).filter((id) => id !== runeId),
  }
}

export function listCompatibleRunes(item: EquipmentItem): ItemDefinition[] {
  const host = getItemDefinition(item.definitionId)
  const kind = itemRuneHostKind(host)
  if (!kind) return []
  return listItemDefinitions().filter((def) => {
    if (!def.rune?.appliesTo.includes(kind)) return false
    if (host?.category === 'staff' && def.rune.kind === 'property') return false
    return true
  })
}

export function etchedDisplayName(
  item: EquipmentItem,
  definition: ItemDefinition | null,
  runes: ResolvedRunes,
): string {
  if (item.broken) {
    const base = item.name.trim() || definition?.name || 'Item'
    return `${base} (destruída)`
  }
  if (definition?.wand && item.wandSpellId) {
    const spell = getSpellById(item.wandSpellId)
    if (spell) return `Varinha de ${spell.name}`
  }
  const base = item.name.trim() || definition?.name || 'Item sem nome'
  if (runes.shortLabels.length === 0) return base
  return `${runes.shortLabels.join(' ')} ${base}`
}

function addBulk(bulk: BulkValue, extra: number): BulkValue {
  if (extra <= 0) return bulk
  if (bulk.unit === 'negligible' || bulk.unit === 'light') {
    return { unit: 'bulk', count: extra }
  }
  return { unit: 'bulk', count: bulk.count + extra }
}

function applyReinforcing(
  stats: ShieldStats,
  reinforcing: RuneReinforcing | null,
): ShieldStats {
  if (!reinforcing) return stats
  return {
    ...stats,
    hardness: Math.min(
      reinforcing.maxHardness,
      stats.hardness + reinforcing.hardness,
    ),
    hp: Math.min(reinforcing.maxHp, stats.hp + reinforcing.hp),
    bt: Math.min(reinforcing.maxBt, stats.bt + reinforcing.bt),
  }
}

function applyArmorRuneAdjust(
  stats: ArmorStats,
  runes: ResolvedRunes,
  magicActive: boolean,
): ArmorStats {
  if (!magicActive || runes.strengthAdjust === 0) return stats
  const strength =
    stats.strength == null
      ? runes.strengthAdjust
      : stats.strength + runes.strengthAdjust
  return { ...stats, strength }
}

function armorMagicActive(item: EquipmentItem): boolean {
  const hasRunes = (item.runeIds?.length ?? 0) > 0
  if (!hasRunes) return true
  return Boolean(item.invested)
}

function formatExtraDamagePart(part: RuneExtraDamage): string {
  const typeLabel =
    DAMAGE_TYPE_LABELS[part.damageType as DamageTypeId] ?? part.damageType
  const persist = part.persistent ? ' persistente' : ''
  const note = part.note ? ` ${part.note}` : ''
  return `${part.dice} ${typeLabel}${persist}${note}`
}

function formatExtraDamageSuffix(extras: RuneExtraDamage[]): string {
  if (extras.length === 0) return ''
  const hit = extras.filter((part) => (part.when ?? 'hit') === 'hit')
  const crit = extras.filter((part) => part.when === 'crit')
  const hitText = hit.map(formatExtraDamagePart).join(' + ')
  const critText = crit.map(formatExtraDamagePart).join(', ')
  let suffix = hitText ? ` + ${hitText}` : ''
  if (critText) suffix += ` (crítico: ${critText})`
  return suffix
}

function itemBulk(item: EquipmentItem, definition: ItemDefinition | null): BulkValue {
  if (definition) {
    const runes = resolveRunes(itemEffectiveRuneIds(item))
    const wornArmor = Boolean(item.equipped && definition.armor)
    const bulk = addBulk(definition.bulk, runes.bulkAdjust)
    if (definition.armor && !wornArmor) {
      return carriedArmorBulk(bulk)
    }
    return bulk
  }
  return parseBulkString(item.bulk)
}

/** Armadura carregada (não vestida) = +1 Bulk, ou 1 Bulk se era L. Player Core. */
function carriedArmorBulk(worn: BulkValue): BulkValue {
  if (worn.unit === 'negligible' || worn.unit === 'light') {
    return { unit: 'bulk', count: 1 }
  }
  return { unit: 'bulk', count: worn.count + 1 }
}

function resolveInventoryItem(item: EquipmentItem): ResolvedInventoryItem {
  const definition = getItemDefinition(item.definitionId)
  const bulk = itemBulk(item, definition)
  const qty = Math.max(1, item.quantity || 1)
  const runes = resolveRunes(itemEffectiveRuneIds(item))
  return {
    item,
    definition,
    displayName: etchedDisplayName(item, definition, runes),
    bulk,
    bulkNumeric: bulkToNumeric(bulk) * qty,
    runes,
  }
}

function meetsArmorStrength(
  stats: ArmorStats,
  strengthModifier: number,
): boolean {
  if (stats.strength == null) return true
  return strengthModifier >= stats.strength
}

function effectiveArmorPenalties(
  stats: ArmorStats,
  strengthModifier: number,
): { checkPenalty: number; speedPenalty: number; meetsStrength: boolean } {
  const meets = meetsArmorStrength(stats, strengthModifier)
  const checkPenalty = meets ? 0 : stats.checkPenalty
  let speedPenalty = stats.speedPenalty
  if (meets && speedPenalty < 0) {
    speedPenalty = Math.min(0, speedPenalty + 5)
  }
  return { checkPenalty, speedPenalty, meetsStrength: meets }
}

function findEquippedArmor(
  resolved: ResolvedInventoryItem[],
): ResolvedWornArmor | null {
  const match = resolved.find(
    (r) =>
      r.item.equipped !== false &&
      r.definition?.armor &&
      (r.item.slot === 'armor' || r.definition.category === 'armor'),
  )
  if (!match?.definition?.armor) return null
  const magicActive = armorMagicActive(match.item)
  const stats = applyArmorRuneAdjust(
    match.definition.armor,
    match.runes,
    magicActive,
  )
  const potency = magicActive ? match.runes.potency : 0
  return {
    item: match.item,
    definition: match.definition,
    stats,
    runes: match.runes,
    itemBonus: stats.acBonus + potency,
    dexCap: stats.dexCap,
    checkPenalty: stats.checkPenalty,
    speedPenalty: stats.speedPenalty,
    meetsStrength: true,
    magicActive,
  }
}

function findEquippedShield(
  resolved: ResolvedInventoryItem[],
): ResolvedWieldedShield | null {
  const match = resolved.find(
    (r) =>
      r.item.equipped !== false &&
      r.definition?.shield &&
      (r.item.slot === 'shield' || r.definition.category === 'shield'),
  )
  if (!match?.definition?.shield) return null
  return {
    item: match.item,
    definition: match.definition,
    stats: applyReinforcing(match.definition.shield, match.runes.reinforcing),
    runes: match.runes,
    raised: Boolean(match.item.raised),
  }
}

function traitMatches(traits: string[], ...keys: string[]): boolean {
  return traits.some((trait) => {
    const lower = trait.toLowerCase()
    return keys.some(
      (key) =>
        lower === key ||
        lower.startsWith(`${key} `) ||
        lower.startsWith(`${key}-`),
    )
  })
}

function formatWeaponDamageSummary(
  damageDie: string,
  strikingDice: number,
  damageType: string,
  strToDamage: number,
): string {
  const bonus =
    strToDamage !== 0
      ? ` ${strToDamage > 0 ? '+' : ''}${strToDamage}`
      : ''
  const typeLabel =
    DAMAGE_TYPE_LABELS[damageType as DamageTypeId] ?? damageType
  const die = damageDie.trim()
  if (!die || die === '0' || /^varies$/i.test(die)) {
    if (die === '0') return ''
    return `Varia${bonus}`.trim()
  }
  if (!die.includes('d')) {
    const flat = Number(die)
    if (Number.isFinite(flat)) return `${flat}${bonus} ${typeLabel}`.trim()
    return `${die}${bonus} ${typeLabel}`.trim()
  }
  const [diceCountRaw, dieSize] = die.split('d')
  const diceCount = Number(diceCountRaw) + strikingDice
  return `${diceCount}d${dieSize} ${typeLabel}${bonus}`
}

function formatBombDamageSummary(
  bomb: AlchemicalBombStats,
  base: string,
): string {
  const parts: string[] = []
  const trimmed = base.trim()
  if (trimmed && !/^0\b/.test(trimmed)) parts.push(trimmed)
  const typeLabel =
    DAMAGE_TYPE_LABELS[bomb.damageType as DamageTypeId] ?? bomb.damageType
  if (bomb.persistentDice) {
    parts.push(`${bomb.persistentDice} ${typeLabel} persistente`)
  }
  if (bomb.persistentFlat) {
    parts.push(`${bomb.persistentFlat} ${typeLabel} persistente`)
  }
  if (bomb.splash) {
    const splashType =
      DAMAGE_TYPE_LABELS[
        (bomb.splashType ?? bomb.damageType) as DamageTypeId
      ] ??
      bomb.splashType ??
      bomb.damageType
    parts.push(`${bomb.splash} respingo ${splashType}`)
  }
  if (bomb.hitEffect) parts.push(bomb.hitEffect)
  return parts.join(' + ') || 'Efeito (sem dano)'
}

function weaponAttackAttribute(
  stats: WeaponStats,
  strengthModifier: number,
  dexterityModifier: number,
  traits: string[],
): AttributeId {
  const finesse = traitMatches(traits, 'finesse', 'sutileza')
  if (stats.rangeType === 'ranged') return 'dexterity'
  if (finesse) {
    return dexterityModifier >= strengthModifier ? 'dexterity' : 'strength'
  }
  return 'strength'
}

function isUsableEquippedWeapon(row: ResolvedInventoryItem): boolean {
  if (!row.definition?.weapon) return false
  if (row.item.equipped === false) return false
  if ((row.item.quantity ?? 1) < 1) return false
  if (row.item.broken) return false
  if (row.definition.wornMagic?.unarmedHost) return false
  return true
}

function overlayFistDefinition(
  definition: ItemDefinition,
  fistDamageDie?: string,
): ItemDefinition {
  if (definition.id !== FIST_ITEM_DEFINITION_ID || !definition.weapon) {
    return definition
  }
  if (!fistDamageDie || definition.weapon.damageDie === fistDamageDie) {
    return definition
  }
  return {
    ...definition,
    weapon: { ...definition.weapon, damageDie: fistDamageDie },
  }
}

function injectInnateUnarmed(
  rows: ResolvedInventoryItem[],
  wrapRuneIds: string[],
): void {
  const fist = getItemDefinition(FIST_ITEM_DEFINITION_ID)
  if (!fist?.weapon) return
  rows.push({
    item: {
      id: INNATE_UNARMED_ITEM_ID,
      name: 'Ataque desarmado',
      slot: 'weapon',
      quantity: 1,
      equipped: true,
      definitionId: fist.id,
      runeIds: wrapRuneIds,
    },
    definition: fist,
    displayName: 'Ataque desarmado',
    bulk: fist.bulk,
    bulkNumeric: 0,
    runes: resolveRunes(wrapRuneIds),
  })
}

function resolveWeaponAttacks(
  resolved: ResolvedInventoryItem[],
  input: ResolveEquipmentInput,
): ResolvedWeaponAttack[] {
  const worn = collectWornMagic(input.items)
  const wrapRunes = worn.unarmedHostRuneIds
  const doubling = worn.doublingRings

  const rows = [...resolved]
  const usable = rows.filter(isUsableEquippedWeapon)
  const hasUnarmed = usable.some(
    (row) => row.definition?.weapon?.proficiency === 'unarmed',
  )
  // Sem arma equipada: o golpe desarmado básico (Punho) sempre está disponível.
  // Envoltórios de golpes poderosos também exigem o punho para aplicar as runas.
  if (!hasUnarmed && (wrapRunes.length > 0 || usable.length === 0)) {
    injectInnateUnarmed(rows, wrapRunes)
  }

  const meleeHosts = rows.filter((row) => {
    const stats = row.definition?.weapon
    if (!stats || row.item.equipped === false) return false
    if (row.definition?.wornMagic?.unarmedHost) return false
    if (stats.rangeType !== 'melee') return false
    if (stats.proficiency === 'unarmed') return false
    return true
  })
  const doublingSource = doubling && meleeHosts.length >= 2 ? meleeHosts[0] : null
  const doublingReplicaId =
    doublingSource && meleeHosts[1] ? meleeHosts[1].item.id : null
  const doublingRuneIds = doublingSource
    ? doubling === 'greater'
      ? itemEffectiveRuneIds(doublingSource.item)
      : itemEffectiveRuneIds(doublingSource.item).filter((id) => {
          const rune = getItemDefinition(id)?.rune
          return rune?.kind === 'fundamental'
        })
    : []

  const attacks: ResolvedWeaponAttack[] = []
  for (const row of rows) {
    const stats = row.definition?.weapon
    if (!stats || !row.definition || row.item.equipped === false) continue
    if (row.definition.wornMagic?.unarmedHost) continue
    if ((row.item.quantity ?? 1) < 1) continue
    if (row.item.broken) continue
    let runes = row.runes
    if (stats.proficiency === 'unarmed' && wrapRunes.length > 0) {
      runes = resolveRunes([...wrapRunes, ...itemEffectiveRuneIds(row.item)])
    } else if (doubling && row.item.id === doublingReplicaId) {
      runes = resolveRunes(doublingRuneIds)
    }
    attacks.push(
      resolveWeaponAttackFromDefinition(
        row.item,
        row.definition,
        runes,
        input,
        row.displayName,
      ),
    )
  }
  return expandCombinationWeaponAttacks(attacks, input)
}

function finishResolvedWeaponAttack(attack: {
  item: EquipmentItem
  definition: ItemDefinition
  stats: WeaponStats
  runes: ResolvedRunes
  displayName: string
  attackBonus: number | null
  attackPending: boolean
  damageSummary: string
  damageDice: string
  damageModifier: number
  attributeId: AttributeId
  proficiencyRank: ProficiencyRank | null
  breakdown: Array<{ label: string; value: number | string }>
}): ResolvedWeaponAttack {
  return {
    ...attack,
    attackPendingReason: attack.attackPending
      ? 'Falta proficiência de ataque (classe).'
      : undefined,
    combinationMode: isCombinationWeapon(attack.definition)
      ? attack.stats.rangeType
      : undefined,
  }
}

function applyTinyMeleeReach(
  attacks: ResolvedWeaponAttack[],
  size?: CreatureSize | null,
): ResolvedWeaponAttack[] {
  if (size !== 'tiny') return attacks
  return attacks.map((attack) => {
    if (attack.stats.rangeType !== 'melee') return attack
    const traits = attack.definition.traits ?? []
    const hasReach = traits.some(
      (t) => t.toLowerCase() === 'reach' || t.toLowerCase() === 'alcance',
    )
    const note = hasReach
      ? 'Alcance 1,5 m (Minúsculo com alcance)'
      : 'Alcance 0 (Minúsculo)'
    if (attack.breakdown.some((row) => row.label === 'Alcance')) return attack
    return {
      ...attack,
      breakdown: [...attack.breakdown, { label: 'Alcance', value: note }],
    }
  })
}

function expandCombinationWeaponAttacks(
  attacks: ResolvedWeaponAttack[],
  input: ResolveEquipmentInput,
): ResolvedWeaponAttack[] {
  const expanded: ResolvedWeaponAttack[] = []
  for (const attack of attacks) {
    expanded.push(attack)
    const partnerId = combinationPartnerDefinitionId(attack.definition)
    if (!partnerId) continue
    if (
      attacks.some(
        (other) =>
          other.item.id === attack.item.id &&
          other.definition.id === partnerId,
      )
    ) {
      continue
    }
    if (
      attacks.some(
        (other) =>
          other.item.id !== attack.item.id &&
          other.definition.id === partnerId,
      )
    ) {
      continue
    }
    const partnerDef = getItemDefinition(partnerId)
    if (!partnerDef?.weapon) continue
    expanded.push(
      resolveWeaponAttackFromDefinition(
        attack.item,
        partnerDef,
        attack.runes,
        input,
        combinationDisplayName(
          attack.item.name || attack.displayName,
          partnerDef.weapon.rangeType,
        ),
      ),
    )
  }
  return expanded
}

function resolveWeaponAttackFromDefinition(
  item: EquipmentItem,
  rawDefinition: ItemDefinition,
  runes: ResolvedRunes,
  input: ResolveEquipmentInput,
  displayName: string,
): ResolvedWeaponAttack {
  const definition = overlayFistDefinition(
    rawDefinition,
    input.fistDamageDie,
  )
  const stats = definition.weapon!
  const traits = definition.traits ?? []
  const attributeId = weaponAttackAttribute(
    stats,
    input.strengthModifier,
    input.dexterityModifier,
    traits,
  )
  const attrMod =
    attributeId === 'dexterity'
      ? input.dexterityModifier
      : input.strengthModifier
  const originalRank = getAttackRankForWeapon(
    input.classBenefits,
    stats.proficiency,
    stats.group,
  )
  const fam = bestFamiliarityShift(
    stats.proficiency,
    input.weaponFamiliarities ?? [],
    {
      originalName: definition.originalName ?? item.name,
      name: definition.name ?? item.name,
      traits,
      group: stats.group,
    },
  )
  const shiftedRank =
    fam.grant && fam.category !== stats.proficiency
      ? getAttackRankForWeapon(
          input.classBenefits,
          fam.category,
          stats.group,
        )
      : null
  const listedRank = pickBetterRank(originalRank, shiftedRank)
  const rank = listedRank ?? (input.classBenefits ? 'untrained' : null)
  const proficiencyBonus =
    rank != null ? calculateProficiencyBonus(rank, input.level) : null
  const isBomb =
    definition.category === 'alchemical' ||
    stats.proficiency === 'bomb' ||
    traitMatches(traits, 'bomb', 'bomba')
  const bomb = definition.alchemical?.bomb
  const thrown = traitMatches(traits, 'thrown', 'arremesso')
  const propulsive = traitMatches(traits, 'propulsive', 'propulsão')
  let strToDamage = 0
  if (!isBomb) {
    if (stats.rangeType === 'melee' || thrown) {
      strToDamage = input.strengthModifier
    } else if (propulsive && input.strengthModifier > 0) {
      strToDamage = Math.floor(input.strengthModifier / 2)
    }
  }
  const runeItemBonus = runes.potency
  const bombItemBonus = bomb?.attackItemBonus ?? 0
  const itemBonus = runeItemBonus + bombItemBonus
  const attackPending = proficiencyBonus == null
  const attackBonus = attackPending
    ? null
    : (proficiencyBonus ?? 0) + attrMod + itemBonus

  let damageDice = ''
  const dieMatch = stats.damageDie.trim().match(/^(\d+)d(\d+)$/i)
  if (dieMatch) {
    const striking = isBomb ? 0 : runes.strikingDice
    damageDice = `${Number(dieMatch[1]) + striking}d${dieMatch[2]}`
  }

  let damageSummary =
    formatWeaponDamageSummary(
      stats.damageDie,
      isBomb ? 0 : runes.strikingDice,
      stats.damageType,
      strToDamage,
    ) + formatExtraDamageSuffix(runes.extraDamage)
  if (bomb) {
    damageSummary = formatBombDamageSummary(bomb, damageSummary)
  }
  if (item.appliedPoisonId) {
    const poisonDef = getItemDefinition(item.appliedPoisonId)
    const poison = poisonDef?.alchemical?.poison
    if (poison) {
      damageSummary += ` · veneno CD ${poison.dc}`
    }
  }
  if (item.temporaryMaterial) {
    const material =
      item.temporaryMaterial === 'silver' ? 'prata' : item.temporaryMaterial
    damageSummary += ` · ${material}`
  }

  const breakdown: Array<{ label: string; value: number | string }> = [
    {
      label: attributeId === 'dexterity' ? 'Destreza' : 'Força',
      value: attrMod,
    },
  ]
  if (proficiencyBonus != null && rank) {
    breakdown.push({
      label: `Proficiência (${PROFICIENCY_LABELS[rank]})`,
      value: proficiencyBonus,
    })
  } else {
    breakdown.push({ label: 'Proficiência', value: 'Pendente' })
  }
  if (fam.grant && fam.category !== stats.proficiency) {
    breakdown.push({
      label: `Familiaridade (${fam.grant.sourceLabel})`,
      value:
        fam.category === 'simple' || fam.category === 'simpleFirearm'
          ? 'marcial como simples'
          : 'avançada como marcial',
    })
  }
  if (runeItemBonus) breakdown.push({ label: 'Potência', value: runeItemBonus })
  if (bombItemBonus) breakdown.push({ label: 'Item', value: bombItemBonus })

  return finishResolvedWeaponAttack({
    item,
    definition,
    stats,
    runes,
    displayName,
    attackBonus,
    attackPending,
    damageSummary,
    damageDice,
    damageModifier: strToDamage,
    attributeId,
    proficiencyRank: rank,
    breakdown,
  })
}

export function bulkLimitsForSize(
  size: CreatureSize | null | undefined,
  strengthModifier: number,
): { bulkLimit: number; bulkMaximum: number } {
  if (size === 'tiny') {
    return {
      bulkLimit: Math.max(1, 1 + strengthModifier),
      bulkMaximum: Math.max(2, 2 + strengthModifier * 2),
    }
  }
  return {
    bulkLimit: BULK_LIMIT_BASE + strengthModifier,
    bulkMaximum: BULK_MAXIMUM_BASE + strengthModifier,
  }
}

export function resolveEquipment(input: ResolveEquipmentInput): ResolvedEquipment {
  const items = (input.items ?? []).map(resolveInventoryItem)
  const bulkUsed = items.reduce((sum, row) => sum + row.bulkNumeric, 0)
  const { bulkLimit, bulkMaximum } = bulkLimitsForSize(
    input.size,
    input.strengthModifier,
  )

  const armorRaw = findEquippedArmor(items)
  let armor: ResolvedWornArmor | null = null
  let checkPenalty = 0
  let speedPenalty = 0
  if (armorRaw) {
    const penalties = effectiveArmorPenalties(
      armorRaw.stats,
      input.strengthModifier,
    )
    armor = {
      ...armorRaw,
      checkPenalty: penalties.checkPenalty,
      speedPenalty: penalties.speedPenalty,
      meetsStrength: penalties.meetsStrength,
    }
    checkPenalty = penalties.checkPenalty
    speedPenalty = penalties.speedPenalty
  }

  const shield = findEquippedShield(items)
  if (shield) {
    speedPenalty += shield.stats.speedPenalty
  }
  const shieldAcBonus =
    shield && shield.raised ? shield.stats.acBonus : 0

  const investedCount = items.filter((row) => {
    const definition = getItemDefinition(row.item.definitionId)
    if (definition?.category === 'tattoo') return true
    return Boolean(row.item.invested)
  }).length
  const investmentLimit = input.investmentLimit ?? DEFAULT_INVESTMENT_LIMIT

  return {
    items,
    armor,
    shield,
    weapons: applyTinyMeleeReach(resolveWeaponAttacks(items, input), input.size),
    bulkUsed,
    bulkLimit,
    bulkMaximum,
    encumbered: bulkUsed > bulkLimit && bulkUsed <= bulkMaximum,
    overloaded: bulkUsed > bulkMaximum,
    investedCount,
    investmentLimit,
    checkPenalty,
    speedPenalty,
    shieldAcBonus,
  }
}

export function armorCheckPenaltyApplies(skillId: SkillId): boolean {
  return ARMOR_CHECK_PENALTY_SKILLS.includes(skillId)
}

export function skillHasArmorCheckPenalty(
  skillId: SkillId,
  attributeId: AttributeId,
): boolean {
  if (ARMOR_CHECK_PENALTY_SKILLS.includes(skillId)) return true
  return attributeId === 'strength' || attributeId === 'dexterity'
}

export function createInventoryItemFromDefinition(
  definition: ItemDefinition,
  id: string,
): EquipmentItem {
  return {
    id,
    name: definition.name,
    slot: slotFromCategory(definition.category),
    quantity: definition.category === 'ammunition' ? 10 : 1,
    equipped: true,
    invested: Boolean(definition.requiresInvestiture),
    definitionId: definition.id,
    runeIds: definition.grantedRuneIds ?? [],
    raised: false,
    notes: '',
    charges: definition.wand ? 1 : definition.staff ? 0 : undefined,
    preparedStaff: false,
    wandOvercharges: 0,
    wandSpellId: definition.wand?.fixedSpellId ?? null,
    scrollSpellId: null,
    spellcastingSourceId: null,
    affixedTalismanId: null,
    affixedTalismanMaterial: null,
    affixedSpellheartId: null,
    preparedGrimoire: false,
    broken: false,
  }
}

export type WeaponShotKind = 'ammo' | 'self' | null

/** Arma que gasta munição à parte, se consome a si (bomba) ou não gasta nada. */
export function weaponShotKind(definition: ItemDefinition | null | undefined): WeaponShotKind {
  if (!definition) return null
  if (definition.alchemical?.bomb) return 'self'
  const stats = definition.weapon
  if (!stats || stats.rangeType !== 'ranged') return null
  if (traitMatches(definition.traits, 'thrown', 'arremesso')) return null
  const group = stats.group
  if (
    group === 'bow' ||
    group === 'crossbow' ||
    group === 'sling' ||
    group === 'dart' ||
    group === 'firearm'
  ) {
    return 'ammo'
  }
  return null
}

export function ammoMatchesWeaponGroup(
  definition: ItemDefinition | null | undefined,
  group: WeaponGroupId,
): boolean {
  return Boolean(definition?.ammunition?.weaponGroups.includes(group))
}

export function listCompatibleAmmo(
  items: EquipmentItem[],
  group: WeaponGroupId,
): EquipmentItem[] {
  return items.filter((item) => {
    if ((item.quantity ?? 0) < 1) return false
    return ammoMatchesWeaponGroup(getItemDefinition(item.definitionId), group)
  })
}

export function pickLoadedAmmo(
  items: EquipmentItem[],
  weapon: EquipmentItem,
  group: WeaponGroupId,
): EquipmentItem | null {
  const compatible = listCompatibleAmmo(items, group)
  if (compatible.length === 0) return null
  if (weapon.loadedAmmoItemId) {
    const loaded = compatible.find((item) => item.id === weapon.loadedAmmoItemId)
    if (loaded) return loaded
  }
  return compatible[0] ?? null
}

export interface SpendWeaponShotResult {
  items: EquipmentItem[]
  ok: boolean
  remaining: number
  ammoName?: string
  reason?: string
}

function decrementStack(item: EquipmentItem): EquipmentItem | null {
  const qty = Math.max(0, (item.quantity ?? 1) - 1)
  if (qty <= 0) return null
  return { ...item, quantity: qty }
}

function replaceStack(
  items: EquipmentItem[],
  next: EquipmentItem | null,
  id: string,
): EquipmentItem[] {
  if (!next) return items.filter((item) => item.id !== id)
  return items.map((item) => (item.id === id ? next : item))
}

/** Gasta 1 munição (ou a própria bomba) ao atacar. Armas corpo a corpo / arremesso não gastam. */
export function spendWeaponShot(
  items: EquipmentItem[],
  weaponId: string,
): SpendWeaponShotResult {
  const weapon = items.find((item) => item.id === weaponId)
  const definition = getItemDefinition(weapon?.definitionId)
  if (!weapon || !definition) {
    return { items, ok: false, remaining: 0, reason: 'Arma não encontrada.' }
  }
  const kind = weaponShotKind(definition)
  if (kind == null) {
    return { items, ok: true, remaining: Number.POSITIVE_INFINITY }
  }
  if (kind === 'self') {
    const qty = weapon.quantity ?? 1
    if (qty < 1) {
      return { items, ok: false, remaining: 0, reason: 'Acabou.' }
    }
    const next = decrementStack(weapon)
    return {
      items: replaceStack(items, next, weapon.id),
      ok: true,
      remaining: next?.quantity ?? 0,
      ammoName: weapon.name,
    }
  }
  const group = definition.weapon?.group
  if (!group) {
    return { items, ok: false, remaining: 0, reason: 'Esta arma não tem munição cadastrada.' }
  }
  const ammo = pickLoadedAmmo(items, weapon, group)
  if (!ammo) {
    return { items, ok: false, remaining: 0, reason: 'Sem munição.' }
  }
  const nextAmmo = decrementStack(ammo)
  let nextItems = replaceStack(items, nextAmmo, ammo.id)
  if (!nextAmmo) {
    nextItems = nextItems.map((item) =>
      item.id === weapon.id ? { ...item, loadedAmmoItemId: null } : item,
    )
  }
  return {
    items: nextItems,
    ok: true,
    remaining: nextAmmo?.quantity ?? 0,
    ammoName: ammo.name,
  }
}

export function weaponSpecializationDamage(
  rank: ProficiencyRank | null | undefined,
  tier: 'none' | 'normal' | 'greater',
): number {
  if (tier === 'none' || rank == null) return 0
  if (rank === 'untrained' || rank === 'trained') return 0
  if (tier === 'greater') {
    if (rank === 'legendary') return 8
    if (rank === 'master') return 6
    return 4
  }
  if (rank === 'legendary') return 4
  if (rank === 'master') return 3
  return 2
}

/** +2/+3/+4 (ou +4/+6/+8 na maior) em armas e desarmados com especialista+. */
export function applyWeaponSpecialization(
  weapons: ResolvedWeaponAttack[],
  tier: 'none' | 'normal' | 'greater',
): ResolvedWeaponAttack[] {
  if (tier === 'none') return weapons
  const label =
    tier === 'greater' ? 'Especialização maior' : 'Especialização em arma'
  return weapons.map((weapon) => {
    const extra = weaponSpecializationDamage(weapon.proficiencyRank, tier)
    if (extra === 0) return weapon
    return {
      ...weapon,
      damageModifier: weapon.damageModifier + extra,
      damageSummary: `${weapon.damageSummary} +${extra}`,
      breakdown: [...weapon.breakdown, { label, value: extra }],
    }
  })
}

export { getItemDefinition, listItemDefinitions, catalogItemCount, slotFromCategory } from './equipmentCatalog'
export {
  isCombinationWeapon,
  combinationPartnerDefinitionId,
  getCombinationPartnerDefinition,
  combinationBaseName,
  combinationModeLabel,
  combinationModeTitle,
  combinationDisplayName,
  resolvedWeaponAttackKey,
} from './combinationWeapons'
