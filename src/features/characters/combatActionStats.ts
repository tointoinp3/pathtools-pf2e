import type { ResolvedCharacterSheet, SkillId } from '@/types'
import { SKILL_LABELS } from '@/utils/labels'

export interface ActionCombatHints {
  skillIds: SkillId[]
  perception: boolean
  attackKind: 'weapon' | 'spell' | 'impulse' | null
  useWeaponDamage: boolean
  saveLabel: string | null
  useSpellDc: boolean
  damageFormula: string | null
}

const SKILL_WORDS: Array<{ id: SkillId; words: string[] }> = [
  { id: 'athletics', words: ['athletics', 'atletismo'] },
  { id: 'acrobatics', words: ['acrobatics', 'acrobacia'] },
  { id: 'thievery', words: ['thievery', 'ladroagem', 'ladinagem'] },
  { id: 'intimidation', words: ['intimidation', 'intimidação', 'intimidacao'] },
  { id: 'deception', words: ['deception', 'enganação', 'enganacao'] },
  { id: 'stealth', words: ['stealth', 'furtividade'] },
  { id: 'medicine', words: ['medicine', 'medicina'] },
  { id: 'diplomacy', words: ['diplomacy', 'diplomacia'] },
  { id: 'performance', words: ['performance', 'atuação', 'atuacao'] },
  { id: 'survival', words: ['survival', 'sobrevivência', 'sobrevivencia'] },
  { id: 'religion', words: ['religion', 'religião', 'religiao'] },
  { id: 'nature', words: ['nature', 'natureza'] },
  { id: 'arcana', words: ['arcana', 'arcanismo'] },
  { id: 'occultism', words: ['occultism', 'ocultismo'] },
  { id: 'crafting', words: ['crafting', 'ofício', 'oficio'] },
  { id: 'society', words: ['society', 'sociedade'] },
]

const SAVE_PATTERNS: Array<{ re: RegExp; label: string }> = [
  { re: /\b(fortitude|fort)\b/i, label: 'Fortitude' },
  { re: /\b(reflexos|reflex)\b/i, label: 'Reflexos' },
  { re: /\b(vontade|will)\b/i, label: 'Vontade' },
]

const BASIC_OVERRIDES: Record<string, Partial<ActionCombatHints>> = {
  'action-strike': { attackKind: 'weapon', useWeaponDamage: true },
  'action-escape': { skillIds: ['athletics', 'acrobatics'] },
  'action-seek': { perception: true },
  'action-sense-motive': { perception: true },
  'action-arrest-fall': { skillIds: ['acrobatics'] },
  'action-grab-edge': { skillIds: ['acrobatics'] },
}

function traitKeys(traits: string[] | undefined): string[] {
  return (traits ?? []).map((t) => t.trim().toLowerCase())
}

function mentionsSkillCheck(text: string, word: string): boolean {
  const w = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return (
    new RegExp(
      `(?:attempt|make|roll|fa[cç]a|fazer)\\s+(?:a\\s+|an\\s+|um\\s+|uma\\s+)?${w}\\s+check`,
      'i',
    ).test(text) ||
    new RegExp(`${w}\\s+check`, 'i').test(text) ||
    new RegExp(`teste(?:s)?\\s+de\\s+${w}`, 'i').test(text) ||
    new RegExp(`check\\s+(?:with\\s+|against\\s+)?(?:the\\s+)?${w}`, 'i').test(
      text,
    )
  )
}

function detectSkillChecks(text: string): SkillId[] {
  const found: SkillId[] = []
  for (const { id, words } of SKILL_WORDS) {
    if (words.some((word) => mentionsSkillCheck(text, word))) {
      found.push(id)
    }
  }
  return found
}

export function inferActionCombat(args: {
  traits?: string[]
  description?: string
  actionId?: string
}): ActionCombatHints {
  const override = args.actionId ? BASIC_OVERRIDES[args.actionId] : undefined
  const traits = traitKeys(args.traits)
  const text = args.description ?? ''
  const isAttackTrait =
    traits.includes('attack') || traits.includes('ataque')
  const isImpulse = traits.includes('impulse') || traits.includes('impulso')
  const isSpellAttack = /ataque de magia|spell attack/i.test(text)
  const mentionsStrike =
    /\b(?:make a(?: melee| ranged)? strike|fa[cç]a(?: um)? golpe|golpeie)\b/i.test(
      text,
    ) || /\bstrike\b/i.test(text) && /make a/i.test(text)
  const skillIds = detectSkillChecks(text)
  const perception =
    mentionsSkillCheck(text, 'perception') ||
    mentionsSkillCheck(text, 'percepção') ||
    mentionsSkillCheck(text, 'percepcao')

  let attackKind: ActionCombatHints['attackKind'] = null
  if (isImpulse && (isAttackTrait || isSpellAttack)) {
    attackKind = 'impulse'
  } else if (isSpellAttack) {
    attackKind = 'spell'
  } else if (skillIds.length === 0 && (isAttackTrait || mentionsStrike)) {
    attackKind = 'weapon'
  }

  let saveLabel: string | null = null
  const vsTargetDc =
    /against the target's|contra a cd|contra o cd|contra a ca\b/i.test(text)
  const enemySave =
    /(?:fortitude|reflex|will)\s+save/i.test(text) ||
    /basic\s+(?:fortitude|reflex|will)/i.test(text) ||
    /salvaguarda de\s+(?:fortitude|reflexos|vontade)/i.test(text)
  if (enemySave && !vsTargetDc) {
    for (const pattern of SAVE_PATTERNS) {
      if (pattern.re.test(text)) {
        saveLabel = pattern.label
        break
      }
    }
  }

  const dice = text.match(/(\d+)\s*d\s*(4|6|8|10|12|20)\b/i)
  const damageFormula = dice ? `${dice[1]}d${dice[2]}`.toLowerCase() : null
  const useSpellDc = /cd de magia|spell dc/i.test(text)

  const base: ActionCombatHints = {
    skillIds,
    perception,
    attackKind,
    useWeaponDamage: Boolean(attackKind === 'weapon' && !damageFormula),
    saveLabel,
    useSpellDc,
    damageFormula,
  }

  if (!override) return base
  const mergedKind =
    override.attackKind !== undefined
      ? override.attackKind
      : override.skillIds
        ? null
        : base.attackKind
  const mergedDamage = override.damageFormula ?? base.damageFormula
  return {
    ...base,
    ...override,
    skillIds: override.skillIds ?? base.skillIds,
    attackKind: mergedKind,
    damageFormula: mergedDamage,
    useWeaponDamage:
      override.useWeaponDamage ??
      Boolean(mergedKind === 'weapon' && !mergedDamage),
  }
}

export function skillLabel(id: SkillId): string {
  return SKILL_LABELS[id]
}

export function bestWeaponAttack(sheet: ResolvedCharacterSheet): {
  bonus: number | null
  name: string
  damageDice: string
  damageModifier: number
  breakdown: Array<{ label: string; value: number }>
  traits: string[]
} | null {
  const weapons = sheet.equipment.weapons
  if (weapons.length === 0) return null
  const ranked = [...weapons].sort((a, b) => {
    const av = a.attackBonus ?? -999
    const bv = b.attackBonus ?? -999
    return bv - av
  })
  const weapon = ranked[0]
  if (!weapon) return null
  return {
    bonus: weapon.attackBonus,
    name: weapon.displayName,
    damageDice: weapon.damageDice,
    damageModifier: weapon.damageModifier,
    breakdown: weapon.breakdown.filter(
      (b): b is { label: string; value: number } => typeof b.value === 'number',
    ),
    traits: [
      ...(weapon.definition.traits ?? []),
      ...(weapon.runes.grantedTraits ?? []),
    ],
  }
}
