import type { AttributeId, SkillId } from '@/types'
import type {
  ActiveItemEffect,
  AlchemicalMutagenStats,
  EquipmentItem,
  ItemDefinition,
  ResolvedActiveItemEffect,
  ResolvedWeaponAttack,
  TalismanHost,
  WeaponStats,
} from '@/types/equipment'
import { DAMAGE_TYPE_LABELS } from '@/types/equipment'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import { consumeItem, replaceInventoryItem } from './magicItems'
import { createInventoryItemFromDefinition } from './equipment'
import { createId } from '@/utils/id'
import { calculateProficiencyBonus } from './proficiency'
import {
  getAttackRankForWeapon,
  type ResolvedClassBenefits,
} from './class'

export interface ResolvedActiveItems {
  effects: ResolvedActiveItemEffect[]
  skillBonuses: Array<{ skillId: SkillId; value: number; label: string }>
  skillPenalties: Array<{ skillId: SkillId; value: number; label: string }>
  saveBonuses: Array<{
    save: 'fortitude' | 'reflex' | 'will'
    value: number
    label: string
  }>
  perceptionBonus: number
  perceptionLabel?: string
  acItemBonus: number
  dexCap: number | null
  speedBonus: number
  speedLabel?: string
  bulkEncumberedAdjust: number
  bulkMaxAdjust: number
  loreBonus: number
  unarmedAttackBonus: number
  dexAttackBonus: number
  attackPenalty: number
  unarmedAttacks: NonNullable<AlchemicalMutagenStats['unarmedAttacks']>
  notes: string[]
}

const EMPTY: ResolvedActiveItems = {
  effects: [],
  skillBonuses: [],
  skillPenalties: [],
  saveBonuses: [],
  perceptionBonus: 0,
  acItemBonus: 0,
  dexCap: null,
  speedBonus: 0,
  bulkEncumberedAdjust: 0,
  bulkMaxAdjust: 0,
  loreBonus: 0,
  unarmedAttackBonus: 0,
  dexAttackBonus: 0,
  attackPenalty: 0,
  unarmedAttacks: [],
  notes: [],
}

function effectFamily(definition: ItemDefinition): string | undefined {
  return (
    definition.alchemical?.effectFamily ??
    definition.consumable?.effectFamily ??
    (definition.alchemical?.kind === 'mutagen' ? 'mutagen' : undefined)
  )
}

export function activateAlchemicalEffect(
  current: ActiveItemEffect[],
  definition: ItemDefinition,
  id: string,
  targetItemId?: string,
): ActiveItemEffect[] {
  const family = effectFamily(definition)
  if (!family) return current
  const next: ActiveItemEffect = {
    id,
    definitionId: definition.id,
    name: definition.name,
    family,
    targetItemId,
  }
  return [
    ...current.filter((entry) => {
      if (entry.family !== family) return true
      if (targetItemId) return entry.targetItemId !== targetItemId
      return false
    }),
    next,
  ]
}

export function dismissActiveEffect(
  current: ActiveItemEffect[],
  effectId: string,
): ActiveItemEffect[] {
  return current.filter((entry) => entry.id !== effectId)
}

export function dismissActiveItemEffect(
  effects: ActiveItemEffect[],
  items: EquipmentItem[],
  effectId: string,
): { effects: ActiveItemEffect[]; items: EquipmentItem[] } {
  const effect = effects.find((entry) => entry.id === effectId)
  let nextItems = items
  if (effect?.targetItemId) {
    nextItems = items.map((it) => {
      if (it.id !== effect.targetItemId) return it
      if (
        effect.family === 'oil-potency' ||
        effect.family === 'potency-crystal'
      ) {
        return { ...it, temporaryRuneIds: [] }
      }
      if (
        effect.family === 'silver-salve' ||
        effect.family === 'alloy-orb'
      ) {
        return { ...it, temporaryMaterial: null }
      }
      return it
    })
  }
  return {
    effects: effects.filter((entry) => entry.id !== effectId),
    items: nextItems,
  }
}

export function canApplyInjuryPoison(
  definition: ItemDefinition | null,
): boolean {
  if (!definition?.weapon) return false
  if (definition.alchemical?.kind === 'bomb') return false
  const damageType = definition.weapon.damageType
  return damageType === 'piercing' || damageType === 'slashing'
}

export function canApplyOil(definition: ItemDefinition | null): boolean {
  if (!definition) return false
  if (definition.alchemical?.kind === 'bomb') return false
  return Boolean(definition.weapon || definition.armor)
}

export function canApplySilverSalve(
  definition: ItemDefinition | null,
): boolean {
  if (!definition?.weapon) return false
  return definition.alchemical?.kind !== 'bomb'
}

export function applyInjuryPoison(
  items: EquipmentItem[],
  poisonItem: EquipmentItem,
  weaponId: string,
): EquipmentItem[] {
  const definition = getItemDefinition(poisonItem.definitionId)
  const poison = definition?.alchemical?.poison
  if (!poison || poison.exposure !== 'injury') return items
  return replaceInventoryItem(
    items.map((it) =>
      it.id === weaponId ? { ...it, appliedPoisonId: definition.id } : it,
    ),
    consumeItem(poisonItem),
    poisonItem.id,
  )
}

export function spendWeaponPoison(
  items: EquipmentItem[],
  weaponId: string,
): EquipmentItem[] {
  return items.map((it) =>
    it.id === weaponId ? { ...it, appliedPoisonId: null } : it,
  )
}

export function applyOilOfPotency(
  items: EquipmentItem[],
  effects: ActiveItemEffect[],
  oilItem: EquipmentItem,
  targetId: string,
  effectId: string,
): { items: EquipmentItem[]; effects: ActiveItemEffect[] } {
  const definition = getItemDefinition(oilItem.definitionId)
  const oil = definition?.consumable?.oil
  const target = items.find((it) => it.id === targetId)
  const targetDef = getItemDefinition(target?.definitionId)
  if (!definition || !oil || !targetDef) {
    return { items, effects }
  }
  const runeIds = targetDef.armor ? oil.armorRuneIds : oil.weaponRuneIds
  const nextItems = replaceInventoryItem(
    items.map((it) =>
      it.id === targetId ? { ...it, temporaryRuneIds: runeIds } : it,
    ),
    consumeItem(oilItem),
    oilItem.id,
  )
  return {
    items: nextItems,
    effects: activateAlchemicalEffect(effects, definition, effectId, targetId),
  }
}

export function applySilverSalve(
  items: EquipmentItem[],
  effects: ActiveItemEffect[],
  salveItem: EquipmentItem,
  weaponId: string,
  effectId: string,
): { items: EquipmentItem[]; effects: ActiveItemEffect[] } {
  const definition = getItemDefinition(salveItem.definitionId)
  if (!definition) return { items, effects }
  const nextItems = replaceInventoryItem(
    items.map((it) =>
      it.id === weaponId ? { ...it, temporaryMaterial: 'silver' } : it,
    ),
    consumeItem(salveItem),
    salveItem.id,
  )
  return {
    items: nextItems,
    effects: activateAlchemicalEffect(
      effects,
      definition,
      effectId,
      weaponId,
    ),
  }
}

function isBombHost(definition: ItemDefinition | null): boolean {
  return definition?.alchemical?.kind === 'bomb'
}

export function canAffixTalisman(
  host: ItemDefinition | null,
  talisman: { affixesTo: TalismanHost; maxWeaponLevel?: number | null } | null | undefined,
): boolean {
  if (!host || !talisman || isBombHost(host)) return false
  if (
    talisman.maxWeaponLevel != null &&
    host.level > talisman.maxWeaponLevel
  ) {
    return false
  }
  switch (talisman.affixesTo) {
    case 'weapon':
    case 'metal-weapon':
      return Boolean(host.weapon)
    case 'melee-weapon':
      return Boolean(host.weapon && host.weapon.rangeType === 'melee')
    case 'armor':
      return Boolean(host.armor)
    case 'shield':
      return Boolean(host.shield)
    case 'weapon-or-shield':
      return Boolean(host.weapon || host.shield)
    case 'armor-or-weapon':
    case 'metal-armor-or-weapon':
    case 'non-metal-armor-or-weapon':
      return Boolean(host.weapon || host.armor)
    default:
      return false
  }
}

function returnCatalogItemToInventory(
  items: EquipmentItem[],
  definitionId: string,
): EquipmentItem[] {
  const existing = items.find((it) => it.definitionId === definitionId)
  if (existing) {
    return items.map((it) =>
      it.id === existing.id
        ? { ...it, quantity: (it.quantity ?? 1) + 1 }
        : it,
    )
  }
  const definition = getItemDefinition(definitionId)
  if (!definition) return items
  return [
    ...items,
    createInventoryItemFromDefinition(definition, createId('eq')),
  ]
}

function hostKeepsSpellcastingSource(definition: ItemDefinition | null | undefined) {
  return Boolean(definition?.wand || definition?.staff || definition?.scroll)
}

function returnAffixedWithSource(
  items: EquipmentItem[],
  definitionId: string,
  sourceId?: string | null,
): EquipmentItem[] {
  const next = returnCatalogItemToInventory(items, definitionId)
  if (!sourceId) return next
  const returned = next.find((it) => it.definitionId === definitionId)
  if (!returned) return next
  return next.map((it) =>
    it.id === returned.id ? { ...it, spellcastingSourceId: sourceId } : it,
  )
}

export function affixTalisman(
  items: EquipmentItem[],
  talismanItem: EquipmentItem,
  hostId: string,
  material?: string,
): EquipmentItem[] {
  const definition = getItemDefinition(talismanItem.definitionId)
  const talisman = definition?.talisman
  if (!talisman) return items
  const host = items.find((it) => it.id === hostId)
  const hostDef = getItemDefinition(host?.definitionId)
  if (!host || !canAffixTalisman(hostDef, talisman)) return items
  let next = items
  if (host.affixedTalismanId) {
    next = returnCatalogItemToInventory(next, host.affixedTalismanId)
  }
  if (host.affixedSpellheartId) {
    next = returnAffixedWithSource(
      next,
      host.affixedSpellheartId,
      host.spellcastingSourceId,
    )
  }
  next = next.map((it) =>
    it.id === hostId
      ? {
          ...it,
          affixedTalismanId: definition.id,
          affixedTalismanMaterial: material ?? null,
          affixedSpellheartId: null,
          ...(hostKeepsSpellcastingSource(hostDef)
            ? {}
            : { spellcastingSourceId: null }),
        }
      : it,
  )
  return replaceInventoryItem(next, consumeItem(talismanItem), talismanItem.id)
}

export function unfixTalisman(
  items: EquipmentItem[],
  hostId: string,
): EquipmentItem[] {
  const host = items.find((it) => it.id === hostId)
  if (!host?.affixedTalismanId) return items
  const next = returnCatalogItemToInventory(items, host.affixedTalismanId)
  return next.map((it) =>
    it.id === hostId
      ? { ...it, affixedTalismanId: null, affixedTalismanMaterial: null }
      : it,
  )
}

export function activateAffixedTalisman(
  items: EquipmentItem[],
  effects: ActiveItemEffect[],
  hostId: string,
  effectId: string,
): { items: EquipmentItem[]; effects: ActiveItemEffect[] } {
  const host = items.find((it) => it.id === hostId)
  const definition = getItemDefinition(host?.affixedTalismanId)
  const talisman = definition?.talisman
  if (!host || !definition || !talisman) return { items, effects }
  let nextItems = items.map((it) =>
    it.id === hostId
      ? { ...it, affixedTalismanId: null, affixedTalismanMaterial: null }
      : it,
  )
  let nextEffects = effects
  if (talisman.potencyRuneIds?.length) {
    nextItems = nextItems.map((it) =>
      it.id === hostId
        ? { ...it, temporaryRuneIds: talisman.potencyRuneIds }
        : it,
    )
    nextEffects = [
      ...effects.filter((entry) => entry.family !== 'potency-crystal'),
      {
        id: effectId,
        definitionId: definition.id,
        name: definition.name,
        family: 'potency-crystal',
        targetItemId: hostId,
      },
    ]
  } else if (talisman.alloyMaterials?.length) {
    const material = host.affixedTalismanMaterial ?? talisman.alloyMaterials[0]
    nextItems = nextItems.map((it) =>
      it.id === hostId ? { ...it, temporaryMaterial: material } : it,
    )
    nextEffects = [
      ...effects.filter((entry) => entry.family !== 'alloy-orb'),
      {
        id: effectId,
        definitionId: definition.id,
        name: definition.name,
        family: 'alloy-orb',
        targetItemId: hostId,
      },
    ]
  } else {
    nextEffects = [
      ...effects.filter((entry) => entry.family !== 'talisman'),
      {
        id: effectId,
        definitionId: definition.id,
        name: definition.name,
        family: 'talisman',
        targetItemId: hostId,
      },
    ]
  }
  return { items: nextItems, effects: nextEffects }
}

export function affixSpellheart(
  items: EquipmentItem[],
  spellheartItem: EquipmentItem,
  hostId: string,
): EquipmentItem[] {
  const definition = getItemDefinition(spellheartItem.definitionId)
  const spellheart = definition?.spellheart
  if (!spellheart) return items
  const host = items.find((it) => it.id === hostId)
  const hostDef = getItemDefinition(host?.definitionId)
  if (!host || !canAffixTalisman(hostDef, spellheart)) return items
  let next = items
  if (host.affixedTalismanId) {
    next = returnCatalogItemToInventory(next, host.affixedTalismanId)
  }
  if (host.affixedSpellheartId) {
    next = returnAffixedWithSource(
      next,
      host.affixedSpellheartId,
      host.spellcastingSourceId,
    )
  }
  next = next.map((it) =>
    it.id === hostId
      ? {
          ...it,
          affixedSpellheartId: definition.id,
          affixedTalismanId: null,
          affixedTalismanMaterial: null,
          spellcastingSourceId:
            spellheartItem.spellcastingSourceId ??
            host.spellcastingSourceId ??
            null,
        }
      : it,
  )
  return replaceInventoryItem(next, consumeItem(spellheartItem), spellheartItem.id)
}

export function unfixSpellheart(
  items: EquipmentItem[],
  hostId: string,
): EquipmentItem[] {
  const host = items.find((it) => it.id === hostId)
  if (!host?.affixedSpellheartId) return items
  const hostDef = getItemDefinition(host.definitionId)
  const next = returnAffixedWithSource(
    items,
    host.affixedSpellheartId,
    host.spellcastingSourceId,
  )
  return next.map((it) =>
    it.id === hostId
      ? {
          ...it,
          affixedSpellheartId: null,
          ...(hostKeepsSpellcastingSource(hostDef)
            ? {}
            : { spellcastingSourceId: null }),
        }
      : it,
  )
}

export function resolveActiveItemEffects(
  raw: ActiveItemEffect[] | undefined,
): ResolvedActiveItems {
  if (!raw?.length) return EMPTY
  const acc: ResolvedActiveItems = {
    ...EMPTY,
    effects: [],
    skillBonuses: [],
    skillPenalties: [],
    saveBonuses: [],
    unarmedAttacks: [],
    notes: [],
  }

  for (const entry of raw) {
    const definition = getItemDefinition(entry.definitionId)
    if (!definition) continue
    if (definition.talisman) {
      const duration =
        entry.family === 'potency-crystal'
          ? 'até o fim do turno'
          : entry.family === 'alloy-orb'
            ? '1 minuto'
            : undefined
      acc.effects.push({
        id: entry.id,
        definitionId: entry.definitionId,
        name: entry.name || definition.name,
        family: entry.family,
        duration,
        notes: [definition.talisman.note],
      })
      continue
    }
    const alchemical = definition.alchemical
    const consumable = definition.consumable
    if (!alchemical && !consumable) continue
    const mutagen = alchemical?.mutagen
    const elixir = alchemical?.elixir
    const tool = alchemical?.tool
    const notes: string[] = []
    if (elixir?.note) notes.push(elixir.note)
    if (tool?.note) notes.push(tool.note)
    if (mutagen?.extraNote) notes.push(mutagen.extraNote)
    if (consumable?.note) notes.push(consumable.note)
    if (elixir?.fortVsPoison) {
      notes.push(
        `+${elixir.fortVsPoison} de bônus de item em Fortitude contra veneno.`,
      )
    }
    if (elixir?.fortVsDisease) {
      notes.push(
        `+${elixir.fortVsDisease} de bônus de item em Fortitude contra doença.`,
      )
    }
    if (elixir?.willVsFear) {
      notes.push(`+${elixir.willVsFear} em Vontade contra medo.`)
    }
    if (mutagen?.tempHp) {
      notes.push(`${mutagen.tempHp} PV temporários.`)
    }

    acc.effects.push({
      id: entry.id,
      definitionId: entry.definitionId,
      name: entry.name || definition.name,
      family: entry.family,
      duration:
        mutagen?.duration ??
        elixir?.duration ??
        tool?.duration ??
        consumable?.duration,
      benefit: mutagen?.benefit,
      drawback: mutagen?.drawback,
      notes,
      endActionLabel: mutagen?.endActionLabel,
    })

    const label = definition.name
    if (mutagen) {
      for (const bonus of mutagen.skillBonuses ?? []) {
        acc.skillBonuses.push({ ...bonus, label })
      }
      for (const penalty of mutagen.skillPenalties ?? []) {
        acc.skillPenalties.push({ ...penalty, label })
      }
      for (const save of mutagen.saveBonuses ?? []) {
        acc.saveBonuses.push({ ...save, label })
      }
      for (const save of mutagen.savePenalties ?? []) {
        acc.saveBonuses.push({ ...save, label })
      }
      acc.perceptionBonus += mutagen.perceptionBonus ?? 0
      acc.perceptionBonus += mutagen.perceptionPenalty ?? 0
      if (mutagen.perceptionBonus || mutagen.perceptionPenalty) {
        acc.perceptionLabel = label
      }
      acc.acItemBonus = Math.max(acc.acItemBonus, mutagen.acItemBonus ?? 0)
      if (mutagen.dexCap != null) {
        acc.dexCap =
          acc.dexCap == null ? mutagen.dexCap : Math.min(acc.dexCap, mutagen.dexCap)
      }
      acc.speedBonus += mutagen.speedBonus ?? 0
      if (mutagen.speedBonus) acc.speedLabel = label
      acc.bulkEncumberedAdjust += mutagen.bulkEncumberedAdjust ?? 0
      acc.bulkMaxAdjust += mutagen.bulkMaxAdjust ?? 0
      acc.loreBonus += mutagen.loreBonus ?? 0
      acc.unarmedAttackBonus += mutagen.unarmedAttackBonus ?? 0
      acc.dexAttackBonus += mutagen.dexAttackBonus ?? 0
      acc.attackPenalty += mutagen.attackPenalty ?? 0
      acc.unarmedAttacks.push(...(mutagen.unarmedAttacks ?? []))
    }
    if (elixir) {
      if (elixir.skillBonus) {
        acc.skillBonuses.push({ ...elixir.skillBonus, label })
      }
      if (elixir.willBonus) {
        acc.saveBonuses.push({
          save: 'will',
          value: elixir.willBonus,
          label,
        })
      }
      if (elixir.perceptionBonus) {
        acc.perceptionBonus += elixir.perceptionBonus
        acc.perceptionLabel = label
      }
      if (elixir.speedBonus) {
        acc.speedBonus += elixir.speedBonus
        acc.speedLabel = label
      }
    }
    if (consumable?.speedBonus) {
      acc.speedBonus += consumable.speedBonus
      acc.speedLabel = label
    }
  }

  return acc
}

export function applyAttackAdjustments(
  weapons: ResolvedWeaponAttack[],
  active: ResolvedActiveItems,
): ResolvedWeaponAttack[] {
  if (
    !active.unarmedAttackBonus &&
    !active.dexAttackBonus &&
    !active.attackPenalty
  ) {
    return weapons
  }
  return weapons.map((weapon) => {
    let extra = active.attackPenalty
    const breakdown = [...weapon.breakdown]
    if (active.unarmedAttackBonus && weapon.stats.proficiency === 'unarmed') {
      extra += active.unarmedAttackBonus
      breakdown.push({ label: 'Mutagênico', value: active.unarmedAttackBonus })
    }
    if (active.dexAttackBonus && weapon.attributeId === 'dexterity') {
      extra += active.dexAttackBonus
      breakdown.push({ label: 'Mutagênico', value: active.dexAttackBonus })
    }
    if (active.attackPenalty) {
      breakdown.push({ label: 'Mutagênico', value: active.attackPenalty })
    }
    if (!extra || weapon.attackBonus == null) return weapon
    return {
      ...weapon,
      attackBonus: weapon.attackBonus + extra,
      breakdown,
    }
  })
}

export function mutagenUnarmedAttacks(
  active: ResolvedActiveItems,
  input: {
    level: number
    strengthModifier: number
    classBenefits?: ResolvedClassBenefits | null
  },
): ResolvedWeaponAttack[] {
  return active.unarmedAttacks.map((grant) => {
    const stats: WeaponStats = {
      proficiency: 'unarmed',
      rangeType: 'melee',
      damageDie: grant.damageDie,
      damageType: grant.damageType,
      group: 'brawling',
      hands: '1',
    }
    const rank = input.classBenefits
      ? getAttackRankForWeapon(input.classBenefits, 'unarmed', 'brawling')
      : null
    const proficiencyBonus =
      rank != null ? calculateProficiencyBonus(rank, input.level) : null
    const itemBonus = active.unarmedAttackBonus
    const attackPending = proficiencyBonus == null
    const attackBonus = attackPending
      ? null
      : (proficiencyBonus ?? 0) + input.strengthModifier + itemBonus
    const typeLabel =
      DAMAGE_TYPE_LABELS[grant.damageType] ?? grant.damageType
    const breakdown: Array<{ label: string; value: number | string }> = [
      { label: 'Força', value: input.strengthModifier },
    ]
    if (proficiencyBonus != null && rank) {
      breakdown.push({ label: `Proficiência (${rank})`, value: proficiencyBonus })
    } else {
      breakdown.push({ label: 'Proficiência', value: 'Pendente' })
    }
    if (itemBonus) breakdown.push({ label: 'Mutagênico', value: itemBonus })
    const dummyItem = {
      id: `mutagen-${grant.name}`,
      name: grant.name,
      slot: 'weapon' as const,
      quantity: 1,
      equipped: true,
      definitionId: null,
    }
    const dummyDefinition: ItemDefinition = {
      id: `mutagen-unarmed-${grant.name}`,
      name: grant.name,
      originalName: grant.name,
      category: 'weapon',
      level: 0,
      rarity: 'common',
      traits: grant.traits,
      description: '',
      source: 'Mutagênico',
      bulk: { unit: 'negligible' },
      weapon: stats,
    }
    return {
      item: dummyItem,
      definition: dummyDefinition,
      stats,
      runes: {
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
      },
      displayName: grant.name,
      attackBonus,
      attackPending,
      attackPendingReason: attackPending
        ? 'Falta proficiência de ataque (classe).'
        : undefined,
      damageSummary: `${grant.damageDie} ${typeLabel}`,
      damageDice: grant.damageDie,
      damageModifier: input.strengthModifier,
      attributeId: 'strength' as AttributeId,
      proficiencyRank: rank,
      breakdown,
    }
  })
}
