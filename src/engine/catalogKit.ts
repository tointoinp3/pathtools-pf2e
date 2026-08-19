import type {
  AlchemistSignatureKit,
  Character,
  CharacterClass,
  CommanderSignatureKit,
  ExemplarSignatureKit,
  InventorSignatureKit,
  ProficiencyRank,
  ResolvedConnection,
  ResolvedWeaponAttack,
  RunesmithSignatureKit,
  ThaumaturgeSignatureKit,
} from '@/types'
import type {
  CatalogActiveEffect,
  CatalogTableEffect,
  CatalogWeaponExtra,
  InventorOverdriveState,
} from '@/types/catalogEffects'
import {
  CLASS_ALCHEMIST_ID,
  CLASS_COMMANDER_ID,
  CLASS_EXEMPLAR_ID,
  CLASS_INVENTOR_ID,
  CLASS_RUNESMITH_ID,
  CLASS_THAUMATURGE_ID,
} from '@/data/seeds/ids'
import {
  CATALOG_TABLE_EFFECTS,
  ENHANCED_RESISTANCE_OPTION_ID,
  HYPER_BOOSTERS_OPTION_ID,
  INCREDIBLE_RESISTANCE_OPTION_ID,
  MUSCULAR_OPTION_ID,
  SPEED_BOOSTERS_OPTION_ID,
  SUBTLE_OPTION_ID,
} from '@/data/seeds/catalogs/tableEffects'
import { DAMAGE_TYPE_LABELS } from '@/types/equipment'
import { selectedCatalogOptions } from './classCatalog'
import { emptyClassChoices } from './class'
import { buildFormulaVars, evaluateFormula } from './formula'
import { calculateProficiencyBonus } from './proficiency'

/** CD padrão por nível (GM Core). */
const LEVEL_DC = [
  0, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 38,
  39, 40,
]

export function standardDcForLevel(level: number): number {
  const lv = Math.max(1, Math.min(20, Math.floor(level)))
  return LEVEL_DC[lv] ?? 15 + lv
}

const SKILL_STATUS_SCALE = new Set([
  'rune-ledria',
  'rune-sertum',
  'rune-tilus',
])

const PHYSICAL_RESIST_MODS = new Set([
  'armor-mod-dense-plating',
  'armor-mod-layered-mesh',
  'armor-mod-tensile-absorption',
])

export interface CatalogKitResolved {
  connections: ResolvedConnection[]
  weaponExtras: CatalogWeaponExtra[]
  activeByOptionId: Record<string, CatalogActiveEffect[]>
  inventor?: InventorSignatureKit
  exemplar?: ExemplarSignatureKit
  thaumaturge?: ThaumaturgeSignatureKit
  runesmith?: RunesmithSignatureKit
  alchemist?: AlchemistSignatureKit
  commander?: CommanderSignatureKit
}

function skillStatusValue(level: number): number {
  if (level >= 17) return 3
  if (level >= 9) return 2
  return 1
}

function overdriveSuccessExtra(level: number): number {
  if (level >= 15) return 3
  if (level >= 7) return 2
  if (level >= 3) return 1
  return 0
}

function evalFormula(
  formula: string,
  attrMap: Partial<Record<string, number>>,
  level: number,
): number {
  const vars = {
    ...buildFormulaVars(attrMap, level),
    meio_nivel: Math.floor(level / 2),
    meio_int: Math.floor((attrMap.intelligence ?? 0) / 2),
  }
  const result = evaluateFormula(formula, vars)
  if (!result.ok) return 0
  return Math.floor(result.value)
}

function effectIsOn(
  effect: CatalogTableEffect,
  ctx: {
    overdrive: InventorOverdriveState
    sparkOn: boolean
    exploit: boolean
    etched: boolean
    toggled: boolean
    implement: boolean
  },
): boolean {
  switch (effect.when ?? 'always') {
    case 'always':
      return true
    case 'overdrive':
      return ctx.overdrive === 'success' || ctx.overdrive === 'critical'
    case 'overdriveCritical':
      return ctx.overdrive === 'critical'
    case 'spark':
      return ctx.sparkOn
    case 'exploit':
      return ctx.exploit
    case 'etched':
      return ctx.etched
    case 'toggle':
      return ctx.toggled
    case 'implement':
      return ctx.implement
    default:
      return true
  }
}

function formatEffectValue(effect: CatalogTableEffect, amount: number): string {
  if (effect.kind === 'damagePerDie') {
    const type =
      DAMAGE_TYPE_LABELS[
        (effect.damageType ?? '') as keyof typeof DAMAGE_TYPE_LABELS
      ] ?? effect.damageType
    const persist = effect.persistent ? ' persistente' : ''
    return `+${effect.perDie} ${type}/dado${persist}`
  }
  const sign = amount > 0 ? '+' : ''
  return `${sign}${amount}`
}

export function resolveCatalogKit(args: {
  character: Character
  characterClass?: CharacterClass | null
  attrMap: Partial<Record<string, number>>
  craftingRank: ProficiencyRank
}): CatalogKitResolved {
  const { character, characterClass, attrMap, craftingRank } = args
  const level = character.level
  const trackers = character.classTrackers ?? {}
  const choices = character.classChoices ?? emptyClassChoices()
  const intMod = attrMap.intelligence ?? 0
  const selectedIds = new Set<string>()
  const optionName = new Map<string, string>()

  if (characterClass) {
    for (const { option } of selectedCatalogOptions(
      characterClass,
      choices,
      level,
    )) {
      selectedIds.add(option.id)
      optionName.set(option.id, option.name)
    }
  }

  const overdrive: InventorOverdriveState =
    characterClass?.id === CLASS_INVENTOR_ID
      ? (trackers.inventorOverdrive ?? 'off')
      : 'off'

  const ikonIds = [...selectedIds].filter((id) => id.startsWith('ikon-'))
  const sparkIkonId =
    characterClass?.id === CLASS_EXEMPLAR_ID
      ? (trackers.exemplarSparkIkonId ?? ikonIds[0] ?? null)
      : null

  const exploit =
    characterClass?.id === CLASS_THAUMATURGE_ID &&
    Boolean(trackers.thaumaturgeExploit)
  const implementInHand =
    characterClass?.id === CLASS_THAUMATURGE_ID
      ? trackers.thaumaturgeImplementInHand !== false
      : false

  const etchedIds = new Set(
    Object.entries(trackers.kitToggles ?? {})
      .filter(([key, on]) => on && key.startsWith('etched:'))
      .map(([key]) => key.slice('etched:'.length)),
  )

  const connections: ResolvedConnection[] = []
  const weaponExtras: CatalogWeaponExtra[] = []
  const activeByOptionId: Record<string, CatalogActiveEffect[]> = {}

  function pushBonus(
    optionId: string,
    sourceLabel: string,
    target: NonNullable<CatalogTableEffect['target']>,
    amount: number,
    label: string,
  ) {
    if (amount === 0) return
    connections.push({
      id: `kit-${optionId}-${target}-${label}`,
      name: label,
      sourceLabel,
      sourceKind: 'class',
      target,
      mode: 'flat',
      enabled: true,
      resolvedValue: amount,
    })
    const list = activeByOptionId[optionId] ?? []
    list.push({
      label,
      value: `${amount > 0 ? '+' : ''}${amount}`,
    })
    activeByOptionId[optionId] = list
  }

  function applyEffect(
    optionId: string,
    sourceLabel: string,
    effect: CatalogTableEffect,
    ctx: Parameters<typeof effectIsOn>[1],
  ) {
    if (!effectIsOn(effect, ctx)) return
    if (effect.kind === 'damagePerDie') {
      const amount = effect.perDie ?? 0
      if (amount === 0) return
      weaponExtras.push({
        label: effect.label ?? sourceLabel,
        amountPerDie: amount,
        damageType: effect.damageType ?? 'untyped',
        persistent: effect.persistent,
        appliesTo: effect.appliesTo ?? 'all',
      })
      const list = activeByOptionId[optionId] ?? []
      list.push({
        label: effect.label ?? sourceLabel,
        value: formatEffectValue(effect, amount),
      })
      activeByOptionId[optionId] = list
      return
    }
    if (!effect.target || !effect.formula) return
    let amount = evalFormula(effect.formula, attrMap, level)
    if (SKILL_STATUS_SCALE.has(optionId) && effect.target.startsWith('skill.')) {
      amount = skillStatusValue(level)
    }
    if (
      optionId === 'rune-feikris' &&
      effect.target === 'skill.athletics' &&
      level >= 17
    ) {
      amount = 3
    }
    if (
      optionId === 'rune-cruonign' &&
      effect.target === 'damage'
    ) {
      amount = 3 + Math.floor(Math.max(0, level - 1) / 2)
    }
    if (
      optionId === 'rune-oljinex' &&
      effect.target === 'shield.hardness'
    ) {
      amount = 2 + Math.floor(level / 4)
    }
    if (
      selectedIds.has(ENHANCED_RESISTANCE_OPTION_ID) &&
      effect.target.startsWith('resistance.') &&
      effect.formula.includes('MEIO_NIVEL') &&
      (optionId.startsWith('armor-mod-harmonic') ||
        optionId.startsWith('armor-mod-metallic') ||
        optionId.startsWith('armor-mod-phlogistonic') ||
        optionId.startsWith('armor-mod-otherworldly'))
    ) {
      amount = evalFormula(effect.formula.replace('MEIO_NIVEL', 'NIVEL'), attrMap, level)
    }
    if (
      selectedIds.has(INCREDIBLE_RESISTANCE_OPTION_ID) &&
      PHYSICAL_RESIST_MODS.has(optionId) &&
      effect.target.startsWith('resistance.')
    ) {
      amount = level
    }
    if (
      optionId === MUSCULAR_OPTION_ID &&
      (craftingRank === 'master' || craftingRank === 'legendary')
    ) {
      amount = Math.max(amount, 2)
    }
    if (
      optionId === SUBTLE_OPTION_ID &&
      (craftingRank === 'master' || craftingRank === 'legendary')
    ) {
      amount = Math.max(amount, 2)
    }
    if (
      optionId === HYPER_BOOSTERS_OPTION_ID &&
      effect.when === 'overdrive' &&
      craftingRank === 'legendary'
    ) {
      amount += 10
    }
    pushBonus(
      optionId,
      sourceLabel,
      effect.target,
      amount,
      effect.label ?? sourceLabel,
    )
  }

  for (const optionId of selectedIds) {
    const effects = CATALOG_TABLE_EFFECTS[optionId]
    if (!effects) continue
    if (
      optionId === SPEED_BOOSTERS_OPTION_ID &&
      selectedIds.has(HYPER_BOOSTERS_OPTION_ID)
    ) {
      continue
    }
    const name = optionName.get(optionId) ?? optionId
    const ctx = {
      overdrive,
      sparkOn: sparkIkonId === optionId,
      exploit,
      etched: etchedIds.has(optionId),
      toggled: Boolean(trackers.kitToggles?.[optionId]),
      implement: implementInHand,
    }
    for (const effect of effects) {
      applyEffect(optionId, name, effect, ctx)
    }
  }

  const out: CatalogKitResolved = {
    connections,
    weaponExtras,
    activeByOptionId,
  }

  if (characterClass?.id === CLASS_INVENTOR_ID) {
    const halfInt = Math.floor(Math.max(0, intMod) / 2)
    const extra = overdriveSuccessExtra(level)
    let damageBonus = 0
    if (overdrive === 'critical') damageBonus = intMod
    else if (overdrive === 'success') damageBonus = halfInt + extra
    else if (overdrive === 'fail') damageBonus = 1
    if (damageBonus !== 0) {
      connections.push({
        id: 'kit-inventor-overdrive-damage',
        name: 'Sobrecarga',
        sourceLabel: 'Sobrecarga',
        sourceKind: 'class',
        target: 'damage',
        mode: 'flat',
        enabled: true,
        resolvedValue: damageBonus,
      })
    }
    out.inventor = {
      overdrive,
      damageBonus,
      craftingRank,
      overdriveDc: standardDcForLevel(level),
      checkLabel: 'Artesanato (Sobrecarga)',
    }
  }

  if (characterClass?.id === CLASS_EXEMPLAR_ID && ikonIds.length > 0) {
    out.exemplar = {
      sparkIkonId,
      ikons: ikonIds.map((id) => ({
        id,
        name: optionName.get(id) ?? id,
        empowered: id === sparkIkonId,
      })),
    }
  }

  if (characterClass?.id === CLASS_THAUMATURGE_ID) {
    const antithesis = 2 + Math.floor(level / 2)
    if (exploit) {
      connections.push({
        id: 'kit-thaumaturge-antithesis',
        name: 'Antítese pessoal',
        sourceLabel: 'Explorar Vulnerabilidade',
        sourceKind: 'class',
        target: 'damage',
        mode: 'flat',
        enabled: true,
        resolvedValue: antithesis,
      })
    }
    if (implementInHand) {
      weaponExtras.push({
        label: 'Empoderamento do Implemento',
        amountPerDie: 2,
        damageType: 'untyped',
        appliesTo: 'all',
      })
    }
    out.thaumaturge = {
      exploitActive: exploit,
      antithesis,
      implementInHand,
      empowermentPerDie: implementInHand ? 2 : 0,
      exploitDc: standardDcForLevel(level),
    }
  }

  if (characterClass?.id === CLASS_RUNESMITH_ID) {
    out.runesmith = { etchedIds: [...etchedIds] }
  }

  if (characterClass?.id === CLASS_ALCHEMIST_ID) {
    const vialsMax = Math.max(0, 2 + intMod)
    const fromDetails = Number(choices.catalogDetails?.versatileVials)
    const vials =
      trackers.alchemistVials ??
      (Number.isFinite(fromDetails) ? fromDetails : vialsMax)
    out.alchemist = {
      vials: Math.max(0, vials),
      vialsMax,
    }
  }

  if (characterClass?.id === CLASS_COMMANDER_ID) {
    out.commander = { squadSize: 2 + Math.max(0, intMod) }
  }

  return out
}

function diceCount(damageDice: string): number {
  const match = /^(\d+)d/i.exec(damageDice.trim())
  return match ? Number(match[1]) : 1
}

export function applyCatalogWeaponExtras(
  weapons: ResolvedWeaponAttack[],
  extras: CatalogWeaponExtra[],
): ResolvedWeaponAttack[] {
  if (extras.length === 0) return weapons
  return weapons.map((weapon) => {
    const count = Math.max(1, diceCount(weapon.damageDice))
    const notes: NonNullable<ResolvedWeaponAttack['kitExtraDamage']> = [
      ...(weapon.kitExtraDamage ?? []),
    ]
    let summary = weapon.damageSummary
    for (const extra of extras) {
      if (extra.appliesTo === 'melee' && weapon.stats.rangeType !== 'melee') {
        continue
      }
      if (extra.appliesTo === 'ranged' && weapon.stats.rangeType !== 'ranged') {
        continue
      }
      const amount =
        extra.amountFlat ?? (extra.amountPerDie ?? 0) * count
      if (amount === 0) continue
      const typeLabel =
        DAMAGE_TYPE_LABELS[extra.damageType as keyof typeof DAMAGE_TYPE_LABELS] ??
        (extra.damageType === 'untyped' ? '' : extra.damageType)
      notes.push({
        label: extra.label,
        amount,
        damageType: extra.damageType,
        persistent: extra.persistent,
      })
      const persist = extra.persistent ? ' persistente' : ''
      summary += typeLabel
        ? ` +${amount} ${typeLabel}${persist}`
        : ` +${amount}${persist}`
    }
    if (notes.length === (weapon.kitExtraDamage?.length ?? 0)) return weapon
    return {
      ...weapon,
      damageSummary: summary,
      kitExtraDamage: notes,
    }
  })
}

export function craftingCheckBonus(
  rank: ProficiencyRank,
  level: number,
  intelligence: number,
): number {
  return calculateProficiencyBonus(rank, level) + intelligence
}
