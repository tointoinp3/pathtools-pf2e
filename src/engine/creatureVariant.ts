import type {
  Creature,
  CreatureAbility,
  CreatureAttack,
  CreaturePowerVariant,
  CreatureRecallKnowledge,
  CreatureSpell,
  CreatureSpellcasting,
} from '@/types/creature'

/**
 * DCs por nível (GM Core). Recordar Conhecimento de criatura usa esta tabela;
 * o AoN recalcula a CD pela nível novo da versão Elite/Fraca.
 * Nível −2 não está na tabela impressa; o AoN usa 12 (um passo abaixo de −1).
 */
const DC_FROM_ZERO = [
  14, 15, 16, 18, 19, 20, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 38,
  39, 40, 42, 44, 46, 48, 50,
] as const

export function dcByLevel(level: number): number {
  if (level < 0) return 14 + level
  if (level <= 25) return DC_FROM_ZERO[level] ?? 50
  return 50 + (level - 25) * 2
}

export function parseCreatureVariant(
  raw: string | null | undefined,
): CreaturePowerVariant {
  if (raw === 'elite') return 'elite'
  if (raw === 'fraca' || raw === 'weak') return 'weak'
  return 'normal'
}

export function creatureVariantQuery(
  variant: CreaturePowerVariant,
): string | null {
  if (variant === 'elite') return 'elite'
  if (variant === 'weak') return 'fraca'
  return null
}

export function creatureVariantLabel(variant: CreaturePowerVariant): string {
  if (variant === 'elite') return 'Elite'
  if (variant === 'weak') return 'Fraca'
  return 'Normal'
}

function variantLevel(
  level: number,
  variant: Exclude<CreaturePowerVariant, 'normal'>,
): number {
  if (variant === 'elite') return level <= 0 ? level + 2 : level + 1
  return level === 1 ? level - 2 : level - 1
}

/** Monster Core pág. 6. */
function eliteHpDelta(startingLevel: number): number {
  if (startingLevel <= 1) return 10
  if (startingLevel <= 4) return 15
  if (startingLevel <= 19) return 20
  return 30
}

/** Monster Core pág. 7. Nível −1/0 não entram na tabela; o AoN não muda o PV. */
function weakHpDelta(startingLevel: number): number {
  if (startingLevel < 1) return 0
  if (startingLevel <= 2) return -10
  if (startingLevel <= 5) return -15
  if (startingLevel <= 20) return -20
  return -30
}

function bump(value: number, delta: number): number {
  return value + delta
}

/**
 * Ajusta "1d6", "1d6+2 perfurante", "1d4 de dano extra".
 * Produz texto limpo (1d6+4), não o "1d6+2+2" do script do AoN.
 */
export function adjustDamageText(text: string, delta: number): string {
  if (!delta || !text) return text
  return text.replace(
    /(\d+)d(\d+)(?:\s*([+-])\s*(\d+))?/gi,
    (_full, count: string, sides: string, sign?: string, bonus?: string) => {
      const current = sign && bonus ? (sign === '-' ? -Number(bonus) : Number(bonus)) : 0
      const next = current + delta
      const die = `${count}d${sides}`
      if (next === 0) return die
      return `${die}${next > 0 ? '+' : ''}${next}`
    },
  )
}

function adjustDcMentions(text: string, delta: number): string {
  if (!delta || !text) return text
  return text.replace(/\bCD\s+(\d+)\b/gi, (_full, raw: string) => `CD ${Number(raw) + delta}`)
}

function adjustAbilityText(
  text: string,
  strikeDelta: number,
  limitedDelta: number,
  limited: boolean,
): string {
  const damageDelta = limited ? limitedDelta : strikeDelta
  return adjustDcMentions(adjustDamageText(text, damageDelta), strikeDelta)
}

function variantNames(
  creature: Creature,
  variant: CreaturePowerVariant,
): Pick<Creature, 'name' | 'originalName'> {
  if (variant === 'elite') {
    return {
      name: `Elite ${creature.name}`,
      originalName: `Elite ${creature.originalName}`,
    }
  }
  if (variant === 'weak') {
    return {
      name: `${creature.name} Fraco`,
      originalName: `Weak ${creature.originalName}`,
    }
  }
  return { name: creature.name, originalName: creature.originalName }
}

function applyAttack(
  attack: CreatureAttack,
  delta: number,
): CreatureAttack {
  return {
    ...attack,
    bonus: bump(attack.bonus, delta),
    map: [bump(attack.map[0], delta), bump(attack.map[1], delta)],
    damage: adjustDamageText(attack.damage, delta),
  }
}

function applyAbility(
  ability: CreatureAbility,
  strikeDelta: number,
  limitedDelta: number,
): CreatureAbility {
  const limited = Boolean(ability.frequency)
  return {
    ...ability,
    description: adjustAbilityText(
      ability.description,
      strikeDelta,
      limitedDelta,
      limited,
    ),
  }
}

function applySpell(
  spell: CreatureSpell,
  strikeDelta: number,
  limitedDelta: number,
): CreatureSpell {
  return {
    ...spell,
    attack: spell.attack != null ? bump(spell.attack, strikeDelta) : undefined,
    dc: spell.dc != null ? bump(spell.dc, strikeDelta) : undefined,
    damage: spell.damage
      ? adjustDamageText(spell.damage, limitedDelta)
      : undefined,
  }
}

function applySpellcasting(
  block: CreatureSpellcasting,
  strikeDelta: number,
  limitedDelta: number,
): CreatureSpellcasting {
  return {
    ...block,
    dc: bump(block.dc, strikeDelta),
    attack: block.attack != null ? bump(block.attack, strikeDelta) : undefined,
    spells: block.spells.map((spell) =>
      applySpell(spell, strikeDelta, limitedDelta),
    ),
  }
}

function applyRecall(
  entries: CreatureRecallKnowledge[] | undefined,
  fromLevel: number,
  toLevel: number,
): CreatureRecallKnowledge[] | undefined {
  if (!entries || entries.length === 0) return entries
  const shift = dcByLevel(toLevel) - dcByLevel(fromLevel)
  if (shift === 0) return entries
  return entries.map((entry) => ({ ...entry, dc: bump(entry.dc, shift) }))
}

/**
 * Versão Elite ou Fraca (Monster Core págs. 6–7).
 * Atributos, deslocamento e itens não mudam — só números de combate,
 * PV, nível e CDs, como no Archives of Nethys.
 */
export function applyCreatureVariant(
  creature: Creature,
  variant: CreaturePowerVariant,
): Creature {
  if (variant === 'normal') return creature

  const delta = variant === 'elite' ? 2 : -2
  const limitedDelta = variant === 'elite' ? 4 : -4
  const nextLevel = variantLevel(creature.level, variant)
  const hpDelta =
    variant === 'elite'
      ? eliteHpDelta(creature.level)
      : weakHpDelta(creature.level)
  const names = variantNames(creature, variant)

  return {
    ...creature,
    ...names,
    level: nextLevel,
    perception: bump(creature.perception, delta),
    skills: creature.skills.map((skill) => ({
      ...skill,
      bonus: bump(skill.bonus, delta),
    })),
    ac: bump(creature.ac, delta),
    fortitude: bump(creature.fortitude, delta),
    reflex: bump(creature.reflex, delta),
    will: bump(creature.will, delta),
    hp: Math.max(1, creature.hp + hpDelta),
    attacks: creature.attacks.map((attack) => applyAttack(attack, delta)),
    abilities: creature.abilities.map((ability) =>
      applyAbility(ability, delta, limitedDelta),
    ),
    spellcasting: creature.spellcasting
      ? applySpellcasting(creature.spellcasting, delta, limitedDelta)
      : undefined,
    recallKnowledge: applyRecall(
      creature.recallKnowledge,
      creature.level,
      nextLevel,
    ),
  }
}
