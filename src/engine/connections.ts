import type {
  AttributeId,
  CreatureSize,
  ResolvedImmunity,
  ResolvedResistance,
} from '@/types'
import type {
  CharacterConnection,
  ConnectionTarget,
  ResolvedConnection,
} from '@/types/connections'
import {
  immunityDisplayLabel,
  immunityKindFromTarget,
  isImmunityTarget,
} from '@/types/connections'
import type { ResolvedWeaponAttack } from '@/types/equipment'
import { DAMAGE_TYPE_IDS, DAMAGE_TYPE_LABELS } from '@/types/equipment'
import { buildFormulaVars, evaluateFormula } from './formula'

/** Ordem PF2e de categorias de tamanho (menor → maior). */
export const CREATURE_SIZE_ORDER: CreatureSize[] = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
]

/**
 * Desloca o tamanho em N categorias (+ = maior, − = menor).
 * Limita em Minúsculo…Imenso.
 */
export function shiftCreatureSize(
  base: CreatureSize,
  steps: number,
): CreatureSize {
  const idx = CREATURE_SIZE_ORDER.indexOf(base)
  if (idx < 0) return base
  const delta = Number.isFinite(steps) ? Math.trunc(steps) : 0
  const next = Math.min(
    CREATURE_SIZE_ORDER.length - 1,
    Math.max(0, idx + delta),
  )
  return CREATURE_SIZE_ORDER[next]!
}

export function resolveConnectionValue(
  connection: CharacterConnection,
  attrMods: Partial<Record<AttributeId, number>>,
  level: number,
): { value: number | null; error?: string } {
  if (!connection.enabled) {
    return { value: null }
  }
  if (connection.mode === 'flat') {
    const v = connection.flatValue ?? 0
    if (!Number.isFinite(v)) {
      return { value: null, error: 'Valor flat inválido.' }
    }
    return { value: v }
  }
  const formula = connection.formula?.trim() ?? ''
  if (!formula) {
    return { value: null, error: 'Fórmula vazia.' }
  }
  const result = evaluateFormula(formula, buildFormulaVars(attrMods, level))
  if (!result.ok) return { value: null, error: result.error }
  return { value: result.value }
}

export function resolveConnections(
  connections: CharacterConnection[] | undefined,
  attrMods: Partial<Record<AttributeId, number>>,
  level: number,
): ResolvedConnection[] {
  return (connections ?? []).map((c) => {
    const { value, error } = resolveConnectionValue(c, attrMods, level)
    return {
      id: c.id,
      name: c.name,
      sourceLabel: c.sourceLabel,
      sourceKind: c.sourceKind,
      target: c.target,
      mode: c.mode,
      enabled: c.enabled,
      resolvedValue: value,
      error,
      notes: c.notes,
    }
  })
}

/** Soma bônus resolvidos para um alvo */
export function sumConnectionBonus(
  resolved: ResolvedConnection[],
  target: ConnectionTarget,
): { total: number; parts: Array<{ label: string; value: number }> } {
  const parts: Array<{ label: string; value: number }> = []
  for (const c of resolved) {
    if (!c.enabled || c.target !== target || c.resolvedValue == null) continue
    parts.push({
      label: c.name || c.sourceLabel,
      value: c.resolvedValue,
    })
  }
  return {
    total: parts.reduce((s, p) => s + p.value, 0),
    parts,
  }
}

export function sumConnectionBonuses(
  resolved: ResolvedConnection[],
  targets: ConnectionTarget[],
): { total: number; parts: Array<{ label: string; value: number }> } {
  const parts: Array<{ label: string; value: number }> = []
  for (const target of targets) {
    parts.push(...sumConnectionBonus(resolved, target).parts)
  }
  return {
    total: parts.reduce((s, p) => s + p.value, 0),
    parts,
  }
}

function signedBonus(n: number): string {
  return n > 0 ? `+${n}` : String(n)
}

function attackTargetsFor(weapon: ResolvedWeaponAttack): ConnectionTarget[] {
  const targets: ConnectionTarget[] = ['attack']
  if (weapon.stats.proficiency === 'unarmed') targets.push('attack.unarmed')
  if (weapon.stats.rangeType === 'melee') targets.push('attack.melee')
  if (weapon.stats.rangeType === 'ranged') targets.push('attack.ranged')
  return targets
}

function damageTargetsFor(weapon: ResolvedWeaponAttack): ConnectionTarget[] {
  const targets: ConnectionTarget[] = ['damage']
  if (weapon.stats.proficiency === 'unarmed') targets.push('damage.unarmed')
  if (weapon.stats.rangeType === 'melee') targets.push('damage.melee')
  if (weapon.stats.rangeType === 'ranged') targets.push('damage.ranged')
  return targets
}

/** Aplica conexões de Golpe e dano nas armas resolvidas da ficha. */
export function applyWeaponConnections(
  weapons: ResolvedWeaponAttack[],
  resolved: ResolvedConnection[],
): ResolvedWeaponAttack[] {
  return weapons.map((weapon) => {
    const attack = sumConnectionBonuses(resolved, attackTargetsFor(weapon))
    const damage = sumConnectionBonuses(resolved, damageTargetsFor(weapon))
    if (attack.parts.length === 0 && damage.parts.length === 0) return weapon
    const breakdown = [...weapon.breakdown]
    for (const part of attack.parts) {
      breakdown.push({ label: `Conexão: ${part.label}`, value: part.value })
    }
    for (const part of damage.parts) {
      breakdown.push({
        label: `Conexão (dano): ${part.label}`,
        value: part.value,
      })
    }
    return {
      ...weapon,
      attackBonus:
        weapon.attackBonus != null
          ? weapon.attackBonus + attack.total
          : weapon.attackBonus,
      damageSummary:
        damage.total !== 0
          ? `${weapon.damageSummary} ${signedBonus(damage.total)}`
          : weapon.damageSummary,
      damageModifier: weapon.damageModifier + damage.total,
      breakdown,
    }
  })
}

/**
 * Tamanho final = ancestralidade + soma de conexões `size` (em categorias).
 */
export function resolveCreatureSize(
  baseSize: CreatureSize | null | undefined,
  resolvedConnections: ResolvedConnection[],
  extraShift = 0,
): {
  size: CreatureSize | null
  baseSize: CreatureSize | null
  sizeShift: number
  sizeBreakdown: Array<{ label: string; value: number }>
} {
  const base = baseSize ?? null
  const { total, parts } = sumConnectionBonus(resolvedConnections, 'size')
  const connectionShift = Number.isFinite(total) ? Math.trunc(total) : 0
  const sizeShift = connectionShift + extraShift
  const breakdown =
    extraShift !== 0
      ? [...parts, { label: 'Feito', value: extraShift }]
      : parts
  if (!base) {
    return {
      size: null,
      baseSize: null,
      sizeShift,
      sizeBreakdown: breakdown,
    }
  }
  return {
    size: shiftCreatureSize(base, sizeShift),
    baseSize: base,
    sizeShift,
    sizeBreakdown: breakdown,
  }
}

export function isAttributeTarget(
  target: ConnectionTarget,
): target is `attribute.${AttributeId}` {
  return target.startsWith('attribute.')
}

export function attributeIdFromTarget(
  target: `attribute.${AttributeId}`,
): AttributeId {
  return target.slice('attribute.'.length) as AttributeId
}

/** Agrupa conexões ativas por alvo (para o resumo da aba). */
export function summarizeActiveConnections(
  resolved: ResolvedConnection[],
): Array<{ target: ConnectionTarget; total: number; count: number }> {
  const map = new Map<ConnectionTarget, { total: number; count: number }>()
  for (const c of resolved) {
    if (!c.enabled || c.resolvedValue == null) continue
    if (isImmunityTarget(c.target)) continue
    const current = map.get(c.target) ?? { total: 0, count: 0 }
    current.total += c.resolvedValue
    current.count += 1
    map.set(c.target, current)
  }
  return [...map.entries()].map(([target, { total, count }]) => ({
    target,
    total,
    count,
  }))
}

function typedDefenseLabel(
  kind: 'resistance' | 'weakness',
  damageType: string,
): string {
  const prefix = kind === 'resistance' ? 'Resistência a' : 'Fraqueza a'
  if (damageType === 'all') return `${prefix} todo dano`
  if (damageType === 'physical') return `${prefix} físico`
  if (damageType === 'force') return `${prefix} força`
  if (damageType === 'precision') return `${prefix} precisão`
  const named =
    DAMAGE_TYPE_LABELS[damageType as keyof typeof DAMAGE_TYPE_LABELS] ??
    damageType
  return `${prefix} ${named}`
}

/**
 * Soma conexões de resistência/fraqueza no array da ficha.
 * `resistance` / `weakness` = todo dano (um selo).
 * `*.physical` = contundente, perfurante e cortante (um selo).
 * `*.fire` etc. = aquele tipo, mesclado com herança/runas.
 */
export function mergeTypedDefenses(
  existing: ResolvedResistance[],
  resolved: ResolvedConnection[],
  kind: 'resistance' | 'weakness',
): ResolvedResistance[] {
  const byType = new Map<string, ResolvedResistance>()
  for (const entry of existing) {
    byType.set(entry.damageType, {
      ...entry,
      breakdown: [...entry.breakdown],
    })
  }

  function add(
    damageType: string,
    parts: Array<{ label: string; value: number }>,
  ) {
    if (parts.length === 0) return
    const extra = parts.reduce((sum, part) => sum + part.value, 0)
    const rows = parts.map((part) => ({
      label: `Conexão: ${part.label}`,
      value: part.value,
    }))
    const current = byType.get(damageType)
    if (current) {
      current.value += extra
      current.breakdown.push(...rows)
      return
    }
    byType.set(damageType, {
      id: `connection-${kind}-${damageType}`,
      label: typedDefenseLabel(kind, damageType),
      damageType,
      value: extra,
      sourceType: 'other',
      sourceId: 'connection',
      sourceLabel: 'Conexão',
      breakdown: rows,
    })
  }

  add('all', sumConnectionBonus(resolved, kind).parts)
  add(
    'physical',
    sumConnectionBonus(
      resolved,
      kind === 'resistance' ? 'resistance.physical' : 'weakness.physical',
    ).parts,
  )
  const types = new Set<string>(DAMAGE_TYPE_IDS)
  const prefix = `${kind}.`
  for (const connection of resolved) {
    if (!connection.target.startsWith(prefix)) continue
    const rest = connection.target.slice(prefix.length)
    if (!rest || rest === 'physical') continue
    types.add(rest)
  }
  for (const id of types) {
    if (id === 'untyped') continue
    add(
      id,
      sumConnectionBonus(
        resolved,
        `${kind}.${id}` as ConnectionTarget,
      ).parts,
    )
  }

  return [...byType.values()].filter((entry) => entry.value !== 0)
}

/**
 * Imunidade é presença: conexão ligada = selo na ficha (o número não entra).
 * `immunity.custom` usa o nome do efeito como texto.
 */
export function collectConnectionImmunities(
  resolved: ResolvedConnection[],
): ResolvedImmunity[] {
  const byKind = new Map<string, ResolvedImmunity>()
  for (const connection of resolved) {
    if (!connection.enabled || !isImmunityTarget(connection.target)) continue
    let kind = immunityKindFromTarget(connection.target)
    const customName =
      kind === 'custom' ? connection.name || connection.sourceLabel : undefined
    if (kind === 'custom') {
      const slug = (customName ?? '').trim().toLowerCase() || connection.id
      kind = `custom:${slug}`
    }
    const current = byKind.get(kind)
    const source = {
      label: connection.sourceLabel || connection.name || 'Conexão',
    }
    if (current) {
      current.sources.push(source)
      continue
    }
    byKind.set(kind, {
      id: `connection-immunity-${kind}`,
      label: immunityDisplayLabel(kind, customName),
      kind,
      sourceLabel: source.label,
      sources: [source],
    })
  }
  return [...byKind.values()]
}
