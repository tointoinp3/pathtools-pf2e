import type { Creature, CreatureAbility, CreatureAttack } from '@/types/creature'
import { createId, nowIso } from '@/utils/id'
import {
  applyRoadMapToCreature,
  armorClass,
  attributeModifier,
  CREATURE_ROAD_MAPS,
  hitPoints,
  mapFromBonus,
  perceptionBonus,
  saveBonus,
  strikeBonus,
  strikeDamage,
} from '@/engine/creatureBuilding'
import { dcByLevel } from '@/engine/creatureVariant'

export const CREATURE_CREATE_QUERY = '1'

export function splitList(value: string): string[] {
  return value
    .split(/[,;\n]/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function emptyStrike(level: number): CreatureAttack {
  const bonus = strikeBonus(level, 'high') ?? 9
  const dmg = strikeDamage(level, 'high')
  return {
    id: createId('strike'),
    name: 'Garras',
    originalName: 'Claw',
    kind: 'melee',
    actionType: 'one',
    bonus,
    map: mapFromBonus(bonus, false),
    damage: dmg ? `${dmg.expr} perfurante` : '1d6+3 perfurante',
    traits: [],
  }
}

export function emptyAbility(): CreatureAbility {
  return {
    id: createId('ability'),
    name: '',
    originalName: '',
    actionType: 'one',
    description: '',
  }
}

export function createEmptyHomebrewCreature(): Creature {
  const now = nowIso()
  const level = 1
  const soldier = CREATURE_ROAD_MAPS.find((m) => m.id === 'soldier')
  const moderateAttr = attributeModifier(level, 'moderate') ?? 3
  const base: Creature = {
    id: createId('creature'),
    name: 'Nova criatura',
    originalName: '',
    level,
    rarity: 'common',
    size: 'medium',
    traits: ['Humanoid'],
    perception: perceptionBonus(level, 'moderate'),
    senses: [],
    languages: ['Comum'],
    skills: [],
    attributes: {
      strength: attributeModifier(level, 'high') ?? 4,
      dexterity: moderateAttr,
      constitution: attributeModifier(level, 'high') ?? 4,
      intelligence: moderateAttr,
      wisdom: moderateAttr,
      charisma: moderateAttr,
    },
    ac: armorClass(level, 'high') ?? 16,
    fortitude: saveBonus(level, 'high'),
    reflex: saveBonus(level, 'moderate'),
    will: saveBonus(level, 'moderate'),
    hp: hitPoints(level, 'moderate') ?? 21,
    speeds: { land: 25 },
    attacks: [emptyStrike(level)],
    abilities: [],
    summary: '',
    description: '',
    recallKnowledge: [
      { label: 'Humanoide (Sociedade)', dc: dcByLevel(level) },
    ],
    sourceId: '',
    source: 'Homebrew',
    aonUrl: '',
    provenance: { type: 'homebrew' },
    createdAt: now,
    updatedAt: now,
  }
  return soldier ? applyRoadMapToCreature(base, soldier) : base
}

export function rescaleCreatureToLevel(
  creature: Creature,
  nextLevel: number,
): Creature {
  const previous = creature.level
  const soldier = CREATURE_ROAD_MAPS.find((m) => m.id === 'soldier')
  if (!soldier) return { ...creature, level: nextLevel }
  const scaled = applyRoadMapToCreature(
    { ...creature, level: nextLevel },
    soldier,
  )
  return {
    ...scaled,
    name: creature.name,
    originalName: creature.originalName,
    traits: creature.traits,
    size: creature.size,
    rarity: creature.rarity,
    languages: creature.languages,
    senses: creature.senses,
    skills: creature.skills,
    abilities: creature.abilities,
    items: creature.items,
    immunities: creature.immunities,
    weaknesses: creature.weaknesses,
    resistances: creature.resistances,
    summary: creature.summary,
    description: creature.description,
    recallKnowledge: (creature.recallKnowledge ?? []).map((row) => ({
      ...row,
      dc: row.dc === dcByLevel(previous) ? dcByLevel(nextLevel) : row.dc,
    })),
    attacks:
      creature.attacks.length > 0
        ? scaled.attacks.map((attack, i) => ({
            ...attack,
            name: creature.attacks[i]?.name ?? attack.name,
            originalName: creature.attacks[i]?.originalName ?? attack.originalName,
            kind: creature.attacks[i]?.kind ?? attack.kind,
            actionType: creature.attacks[i]?.actionType ?? attack.actionType,
            traits: creature.attacks[i]?.traits ?? attack.traits,
            plus: creature.attacks[i]?.plus,
            damage: attack.damage,
          }))
        : [emptyStrike(nextLevel)],
  }
}
