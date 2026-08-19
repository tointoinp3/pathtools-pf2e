import type {
  ActiveCondition,
  AttributeId,
  ConditionId,
  ConditionPenaltySlice,
  DerivedStat,
  ResolvedClassDc,
  ResolvedConditionEffects,
  ResolvedSpellcastingAccess,
  ResolvedWeaponAttack,
} from '@/types'
import { getConditionDefinition } from '@/data/seeds/conditions'

function valueOf(list: ActiveCondition[], id: ConditionId): number {
  let max = 0
  for (const entry of list) {
    if (entry.conditionId !== id) continue
    max = Math.max(max, entry.value ?? 1)
  }
  return max
}

function has(list: ActiveCondition[], id: ConditionId): boolean {
  return list.some((entry) => entry.conditionId === id)
}

function worst(
  entries: Array<{ amount: number; label: string }>,
): ConditionPenaltySlice | null {
  const viable = entries.filter((entry) => entry.amount > 0)
  if (viable.length === 0) return null
  const top = viable.reduce((a, b) => (a.amount >= b.amount ? a : b))
  return { amount: top.amount, label: top.label, kind: 'status' }
}

function pack(
  ...slices: Array<ConditionPenaltySlice | null | undefined>
): ConditionPenaltySlice[] {
  return slices.filter((slice): slice is ConditionPenaltySlice => Boolean(slice))
}

/**
 * Penalidades de condição (Player Core). Penalidades do mesmo tipo não somam:
 * vale a pior de status e a pior de circunstância.
 */
export function resolveConditionEffects(
  instances: ActiveCondition[] | null | undefined,
  level: number,
): ResolvedConditionEffects {
  const list = instances ?? []
  const frightened = valueOf(list, 'frightened')
  const sickened = valueOf(list, 'sickened')
  const clumsy = Math.max(
    valueOf(list, 'clumsy'),
    has(list, 'encumbered') ? 1 : 0,
  )
  const enfeebled = valueOf(list, 'enfeebled')
  const stupefied = valueOf(list, 'stupefied')
  const drained = valueOf(list, 'drained')
  const doomed = valueOf(list, 'doomed')
  const wounded = valueOf(list, 'wounded')
  const dying = valueOf(list, 'dying')
  const slowed = valueOf(list, 'slowed')
  const stunned = valueOf(list, 'stunned')
  const fatigued = has(list, 'fatigued') ? 1 : 0
  const fascinated = has(list, 'fascinated') ? 2 : 0
  const blinded = has(list, 'blinded') ? 4 : 0
  const deafened = has(list, 'deafened') ? 2 : 0
  const prone = has(list, 'prone')
  const quickened = has(list, 'quickened')
  const unconscious =
    has(list, 'unconscious') || dying > 0 ? 4 : 0

  const implied = new Set<ConditionId>()
  if (dying > 0) {
    implied.add('unconscious')
    implied.add('prone')
    implied.add('offGuard')
    implied.add('blinded')
  }
  if (has(list, 'unconscious')) {
    implied.add('offGuard')
    implied.add('prone')
    implied.add('blinded')
  }
  if (has(list, 'blinded')) implied.add('offGuard')
  if (has(list, 'grabbed')) {
    implied.add('offGuard')
    implied.add('immobilized')
  }
  if (has(list, 'restrained')) {
    implied.add('offGuard')
    implied.add('immobilized')
  }
  if (has(list, 'paralyzed')) implied.add('offGuard')
  if (has(list, 'confused')) implied.add('offGuard')
  if (prone) implied.add('offGuard')
  if (has(list, 'encumbered')) implied.add('clumsy')
  if (has(list, 'unnoticed')) implied.add('undetected')

  const offGuard =
    has(list, 'offGuard') ||
    implied.has('offGuard') ||
    prone ||
    dying > 0

  const allChecks = worst([
    { amount: frightened, label: `Amedrontado ${frightened}` },
    { amount: sickened, label: `Enjoado ${sickened}` },
  ])
  const fascinatedSlice = worst([
    { amount: fascinated, label: 'Fascinado' },
  ])
  const clumsySlice = worst([{ amount: clumsy, label: `Desajeitado ${clumsy}` }])
  const enfeebledSlice = worst([
    { amount: enfeebled, label: `Enfraquecido ${enfeebled}` },
  ])
  const stupefiedSlice = worst([
    { amount: stupefied, label: `Estupefato ${stupefied}` },
  ])
  const drainedSlice = worst([{ amount: drained, label: `Drenado ${drained}` }])
  const fatiguedSlice = worst([{ amount: fatigued, label: 'Fatigado' }])
  const blindedSlice = worst([{ amount: blinded, label: 'Cego' }])
  const deafenedSlice = worst([{ amount: deafened, label: 'Surdo' }])
  const unconsciousSlice = worst([
    { amount: unconscious, label: 'Inconsciente' },
  ])

  const dexStatus = worst(
    [allChecks, clumsySlice, fatiguedSlice].filter(Boolean).map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )
  const strStatus = worst(
    [allChecks, enfeebledSlice].filter(Boolean).map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )
  const mentalStatus = worst(
    [allChecks, stupefiedSlice].filter(Boolean).map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )
  const conStatus = worst(
    [allChecks, drainedSlice, fatiguedSlice].filter(Boolean).map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )
  const acStatus = worst(
    [allChecks, clumsySlice, fatiguedSlice, unconsciousSlice]
      .filter(Boolean)
      .map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )
  const perceptionStatus = worst(
    [
      allChecks,
      stupefiedSlice,
      blindedSlice,
      deafenedSlice,
      fascinatedSlice,
      unconsciousSlice,
    ]
      .filter(Boolean)
      .map((slice) => ({ amount: slice!.amount, label: slice!.label })),
  )
  const fortStatus = worst(
    [allChecks, drainedSlice, fatiguedSlice].filter(Boolean).map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )
  const refStatus = worst(
    [dexStatus, unconsciousSlice].filter(Boolean).map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )
  const willStatus = worst(
    [allChecks, stupefiedSlice, fatiguedSlice].filter(Boolean).map((slice) => ({
      amount: slice!.amount,
      label: slice!.label,
    })),
  )

  const acCirc: ConditionPenaltySlice | null = offGuard
    ? { amount: 2, label: 'Desprevenido', kind: 'circumstance' }
    : null
  const attackCirc: ConditionPenaltySlice | null = prone
    ? { amount: 2, label: 'Caído', kind: 'circumstance' }
    : null

  const skillByAttribute: ResolvedConditionEffects['skillByAttribute'] = {
    strength: pack(strStatus, fascinatedSlice),
    dexterity: pack(dexStatus, fascinatedSlice),
    constitution: pack(conStatus, fascinatedSlice),
    intelligence: pack(mentalStatus, fascinatedSlice),
    wisdom: pack(mentalStatus, fascinatedSlice),
    charisma: pack(mentalStatus, fascinatedSlice),
  }
  const attackByAttribute: ResolvedConditionEffects['attackByAttribute'] = {
    strength: pack(strStatus),
    dexterity: pack(dexStatus),
    constitution: pack(allChecks),
    intelligence: pack(mentalStatus),
    wisdom: pack(mentalStatus),
    charisma: pack(mentalStatus),
  }
  const classDcByAttribute: ResolvedConditionEffects['classDcByAttribute'] = {
    ...attackByAttribute,
  }

  const notes: string[] = []
  if (prone) {
    notes.push(
      'Caído: desprevenido. Usar Abrigo no chão dá +4 de circunstância na CA contra ataques à distância.',
    )
  }
  if (stupefied > 0) {
    notes.push(
      `Estupefato ${stupefied}: teste plano CD ${5 + stupefied} ao Conjurar uma Magia.`,
    )
  }
  if (dying > 0) {
    notes.push(
      `Morrendo ${dying}: inconsciente. Teste de recuperação no início do turno.`,
    )
  }
  if (drained > 0) {
    notes.push(
      `Drenado ${drained}: −${drained * Math.max(1, level)} PV máximo (nível × valor).`,
    )
  }

  return {
    instances: list,
    impliedIds: [...implied],
    ac: pack(acStatus, acCirc),
    fortitude: pack(fortStatus),
    reflex: pack(refStatus),
    will: pack(willStatus),
    perception: pack(perceptionStatus),
    skillByAttribute,
    attackByAttribute,
    attackCircumstance: attackCirc,
    damageStrength: enfeebledSlice,
    spell: pack(mentalStatus),
    classDcByAttribute,
    hpMaxPenalty: drained * Math.max(1, level),
    hpMaxLabel:
      drained > 0 ? `Drenado ${drained} (× nv. ${level})` : undefined,
    doomed,
    wounded,
    dying,
    slowed,
    stunned,
    quickened,
    notes,
  }
}

export function conditionSlicesTotal(slices: ConditionPenaltySlice[]): number {
  return slices.reduce((sum, slice) => sum + slice.amount, 0)
}

export function applyConditionSlicesToDerived(
  stat: DerivedStat,
  slices: ConditionPenaltySlice[],
): DerivedStat {
  if (slices.length === 0 || stat.value == null) return stat
  const extra = slices.reduce((sum, slice) => sum + slice.amount, 0)
  const breakdown = (stat.breakdown ?? []).filter((row) => row.label !== 'Total')
  const value = stat.value - extra
  return {
    ...stat,
    value,
    breakdown: [
      ...breakdown,
      ...slices.map((slice) => ({
        label: slice.label,
        value: -slice.amount,
      })),
      { label: 'Total', value },
    ],
  }
}

export function applyConditionSlicesToModifier(
  modifier: number,
  breakdown: Array<{ label: string; value: number }>,
  slices: ConditionPenaltySlice[],
): { modifier: number; breakdown: Array<{ label: string; value: number }> } {
  if (slices.length === 0) return { modifier, breakdown }
  const extra = slices.reduce((sum, slice) => sum + slice.amount, 0)
  const next = modifier - extra
  return {
    modifier: next,
    breakdown: [
      ...breakdown.filter((row) => row.label !== 'Total'),
      ...slices.map((slice) => ({ label: slice.label, value: -slice.amount })),
      { label: 'Total', value: next },
    ],
  }
}

export function applyConditionsToClassDc(
  dc: ResolvedClassDc | null | undefined,
  effects: ResolvedConditionEffects,
): ResolvedClassDc | null | undefined {
  if (!dc || dc.value == null) return dc
  const attr = dc.keyAttributeId
  const slices = attr
    ? (effects.classDcByAttribute[attr] ?? effects.spell)
    : effects.spell
  if (slices.length === 0) return dc
  const extra = slices.reduce((sum, slice) => sum + slice.amount, 0)
  return {
    ...dc,
    value: dc.value - extra,
    breakdown: [
      ...dc.breakdown,
      ...slices.map((slice) => ({ label: slice.label, value: -slice.amount })),
    ],
  }
}

export function applyConditionsToSpellcasting(
  access: ResolvedSpellcastingAccess | undefined,
  effects: ResolvedConditionEffects,
): ResolvedSpellcastingAccess | undefined {
  if (!access) return access

  const applyTo = (
    attr: AttributeId | undefined,
    attack: number | null | undefined,
    dc: number | null | undefined,
    attackExtras: Array<{ label: string; value: number }> | undefined,
    dcExtras: Array<{ label: string; value: number }> | undefined,
  ) => {
    const slices = attr
      ? (effects.attackByAttribute[attr] ?? effects.spell)
      : effects.spell
    if (slices.length === 0) {
      return { attack, dc, attackExtras, dcExtras, changed: false }
    }
    const extra = slices.reduce((sum, slice) => sum + slice.amount, 0)
    const extras = slices.map((slice) => ({
      label: slice.label,
      value: -slice.amount,
    }))
    return {
      attack: attack != null ? attack - extra : attack,
      dc: dc != null ? dc - extra : dc,
      attackExtras: [...(attackExtras ?? []), ...extras],
      dcExtras: [...(dcExtras ?? []), ...extras],
      changed: true,
    }
  }

  const top = applyTo(
    access.spellAttributeId,
    access.spellAttack,
    access.spellDc,
    access.spellAttackExtras,
    access.spellDcExtras,
  )
  const sources = access.sources.map((source) => {
    const next = applyTo(
      source.attributeId,
      source.spellAttack,
      source.spellDc,
      source.spellAttackExtras,
      source.spellDcExtras,
    )
    if (!next.changed) return source
    return {
      ...source,
      spellAttack: next.attack,
      spellDc: next.dc,
      spellAttackExtras: next.attackExtras,
      spellDcExtras: next.dcExtras,
    }
  })
  if (!top.changed && sources.every((s, i) => s === access.sources[i])) {
    return access
  }
  return {
    ...access,
    sources,
    spellAttack: top.attack,
    spellDc: top.dc,
    spellAttackExtras: top.attackExtras,
    spellDcExtras: top.dcExtras,
  }
}

export function applyConditionsToWeapons(
  weapons: ResolvedWeaponAttack[],
  effects: ResolvedConditionEffects,
): ResolvedWeaponAttack[] {
  if (weapons.length === 0) return weapons
  return weapons.map((weapon) => {
    const slices = [
      ...(effects.attackByAttribute[weapon.attributeId] ?? []),
      ...(effects.attackCircumstance ? [effects.attackCircumstance] : []),
    ]
    if (slices.length === 0 && !effects.damageStrength) return weapon
    const extra = slices.reduce((sum, slice) => sum + slice.amount, 0)
    const attackBonus =
      weapon.attackBonus == null ? null : weapon.attackBonus - extra
    let damageModifier = weapon.damageModifier
    const damageParts: Array<{ label: string; value: number | string }> = []
    if (
      effects.damageStrength &&
      weapon.attributeId === 'strength' &&
      effects.damageStrength.amount > 0
    ) {
      damageModifier -= effects.damageStrength.amount
      damageParts.push({
        label: effects.damageStrength.label,
        value: -effects.damageStrength.amount,
      })
    }
    return {
      ...weapon,
      attackBonus,
      damageModifier,
      breakdown: [
        ...weapon.breakdown,
        ...slices.map((slice) => ({
          label: slice.label,
          value: -slice.amount,
        })),
        ...damageParts,
      ],
    }
  })
}

export function emptyActiveConditions(): ActiveCondition[] {
  return []
}

export function upsertCondition(
  list: ActiveCondition[],
  conditionId: ConditionId,
  createId: () => string,
  patch?: Partial<ActiveCondition>,
): ActiveCondition[] {
  const def = getConditionDefinition(conditionId)
  if (!def) return list
  if (conditionId === 'persistentDamage') {
    return [
      ...list,
      {
        id: createId(),
        conditionId,
        persistent: patch?.persistent ?? { amount: '1d6', damageType: 'bleed' },
        notes: patch?.notes,
      },
    ]
  }
  const existing = list.find((entry) => entry.conditionId === conditionId)
  if (existing) {
    if (!def.valued) return list
    const max = def.maxValue ?? 4
    const nextValue = Math.min(max, (existing.value ?? def.defaultValue ?? 1) + 1)
    return list.map((entry) =>
      entry.id === existing.id ? { ...entry, value: nextValue, ...patch } : entry,
    )
  }
  return [
    ...list,
    {
      id: createId(),
      conditionId,
      value: def.valued ? (patch?.value ?? def.defaultValue ?? 1) : undefined,
      notes: patch?.notes,
      persistent: patch?.persistent,
    },
  ]
}

export function setConditionValue(
  list: ActiveCondition[],
  instanceId: string,
  value: number,
): ActiveCondition[] {
  return list.map((entry) => {
    if (entry.id !== instanceId) return entry
    const def = getConditionDefinition(entry.conditionId)
    const min = def?.minValue ?? 1
    const max = def?.maxValue ?? 4
    return { ...entry, value: Math.min(max, Math.max(min, value)) }
  })
}

export function removeCondition(
  list: ActiveCondition[],
  instanceId: string,
): ActiveCondition[] {
  return list.filter((entry) => entry.id !== instanceId)
}

export function drainedHpDelta(
  previous: ActiveCondition[] | undefined,
  next: ActiveCondition[],
  level: number,
): number {
  const before = valueOf(previous ?? [], 'drained')
  const after = valueOf(next, 'drained')
  return (after - before) * Math.max(1, level)
}
