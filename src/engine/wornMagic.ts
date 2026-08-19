import type { AttributeId, EquipmentItem, ResolvedAttribute, SkillId } from '@/types'
import { getItemDefinition } from '@/engine/equipmentCatalog'

export interface CollectedWornMagic {
  skillBonuses: Array<{ skillId: SkillId; value: number; label: string }>
  saveBonus: number
  saveLabel: string | null
  perceptionBonus: number
  perceptionLabel: string | null
  speedBonus: number
  speedLabel: string | null
  acItemBonus: number
  acLabel: string | null
  dexCap: number | null
  energyResistances: Array<{
    damageType: string
    value: number
    label: string
  }>
  extraBulkCapacity: number
  apexAttribute: AttributeId | null
  apexLabel: string | null
  unarmedHostRuneIds: string[]
  doublingRings: 'standard' | 'greater' | null
}

function emptyCollected(): CollectedWornMagic {
  return {
    skillBonuses: [],
    saveBonus: 0,
    saveLabel: null,
    perceptionBonus: 0,
    perceptionLabel: null,
    speedBonus: 0,
    speedLabel: null,
    acItemBonus: 0,
    acLabel: null,
    dexCap: null,
    energyResistances: [],
    extraBulkCapacity: 0,
    apexAttribute: null,
    apexLabel: null,
    unarmedHostRuneIds: [],
    doublingRings: null,
  }
}

export function isWornMagicActive(item: EquipmentItem): boolean {
  const definition = getItemDefinition(item.definitionId)
  if (!definition?.wornMagic) return false
  if (definition.wornMagic.companionOnly) return false
  if (item.equipped === false && definition.category !== 'tattoo') return false
  if ((item.quantity ?? 1) < 1) return false
  if (item.broken) return false
  if (definition.category === 'tattoo') return true
  if (definition.requiresInvestiture && !item.invested) return false
  return true
}

function keepHighest(
  current: number,
  next: number,
  currentLabel: string | null,
  nextLabel: string,
): { value: number; label: string | null } {
  if (next > current) return { value: next, label: nextLabel }
  return { value: current, label: currentLabel }
}

/** Passivas de itens vestidos/segurados/ápice investidos (ou equipados, se não exigem investir). */
export function collectWornMagic(
  items: EquipmentItem[] | undefined,
): CollectedWornMagic {
  const acc = emptyCollected()
  const skillBest = new Map<SkillId, { value: number; label: string }>()
  const resistBest = new Map<string, { value: number; label: string }>()

  for (const item of items ?? []) {
    const definition = getItemDefinition(item.definitionId)
    const magic = definition?.wornMagic
    if (!magic || !isWornMagicActive(item)) continue
    const label = definition.name

    for (const bonus of magic.skillBonuses ?? []) {
      const prev = skillBest.get(bonus.skillId)
      if (!prev || bonus.value > prev.value) {
        skillBest.set(bonus.skillId, { value: bonus.value, label })
      }
    }

    if (magic.saveBonus) {
      const kept = keepHighest(acc.saveBonus, magic.saveBonus, acc.saveLabel, label)
      acc.saveBonus = kept.value
      acc.saveLabel = kept.label
    }
    if (magic.perceptionBonus) {
      const kept = keepHighest(
        acc.perceptionBonus,
        magic.perceptionBonus,
        acc.perceptionLabel,
        label,
      )
      acc.perceptionBonus = kept.value
      acc.perceptionLabel = kept.label
    }
    if (magic.speedBonus) {
      const kept = keepHighest(
        acc.speedBonus,
        magic.speedBonus,
        acc.speedLabel,
        label,
      )
      acc.speedBonus = kept.value
      acc.speedLabel = kept.label
    }
    if (magic.acItemBonus) {
      const kept = keepHighest(
        acc.acItemBonus,
        magic.acItemBonus,
        acc.acLabel,
        label,
      )
      acc.acItemBonus = kept.value
      acc.acLabel = kept.label
    }
    if (magic.dexCap != null) {
      acc.dexCap =
        acc.dexCap == null ? magic.dexCap : Math.min(acc.dexCap, magic.dexCap)
    }
    if (magic.extraBulkCapacity) {
      acc.extraBulkCapacity += magic.extraBulkCapacity
    }
    for (const resist of magic.energyResistances ?? []) {
      const key = String(resist.damageType)
      const prev = resistBest.get(key)
      if (!prev || resist.value > prev.value) {
        resistBest.set(key, { value: resist.value, label })
      }
    }
    if (magic.unarmedHost) {
      acc.unarmedHostRuneIds = [
        ...(item.runeIds ?? []),
        ...(item.temporaryRuneIds ?? []),
      ]
    }
    if (magic.doublingRings && !acc.doublingRings) {
      acc.doublingRings = magic.doublingRings
    }
  }

  acc.skillBonuses = [...skillBest.entries()].map(([skillId, row]) => ({
    skillId,
    value: row.value,
    label: row.label,
  }))
  acc.energyResistances = [...resistBest.entries()].map(([damageType, row]) => ({
    damageType,
    value: row.value,
    label: row.label,
  }))
  return acc
}

/** Só o primeiro ápice investido conta. Fórmula: max(atual + 1, 4). */
export function applyApexToAttributes(
  attributes: ResolvedAttribute[],
  items: EquipmentItem[] | undefined,
): void {
  for (const item of items ?? []) {
    const definition = getItemDefinition(item.definitionId)
    const apex = definition?.wornMagic?.apexAttribute
    if (!apex) continue
    if (!isWornMagicActive(item)) continue
    const attr = attributes.find((entry) => entry.id === apex)
    if (!attr) return
    const next = Math.max(attr.modifier + 1, 4)
    const delta = next - attr.modifier
    if (delta === 0) return
    attr.contributions.push({
      label: definition.name,
      value: delta,
      sourceType: 'item',
    })
    attr.modifier = next
    return
  }
}

export function wornMagicDamageTypeLabel(damageType: string): string {
  const labels: Record<string, string> = {
    acid: 'ácido',
    cold: 'frio',
    electricity: 'eletricidade',
    fire: 'fogo',
    force: 'força',
    sonic: 'sônico',
    spirit: 'espírito',
    vitality: 'vitalidade',
    void: 'vazio',
    mental: 'mental',
    poison: 'veneno',
  }
  return labels[damageType] ?? damageType
}
