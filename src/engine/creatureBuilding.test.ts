import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  armorClass,
  attributeModifier,
  classifyArmorClass,
  classifyHitPoints,
  hitPoints,
  mapFromBonus,
  perceptionBonus,
  safeItemLevel,
  spellDc,
  strikeBonus,
  strikeDamage,
  typicalExtremeCount,
  typicalSpellRank,
  applyRoadMapToCreature,
  CREATURE_ROAD_MAPS,
} from './creatureBuilding.ts'
import type { Creature } from '@/types/creature'

function stub(level: number): Creature {
  return {
    id: 'c',
    name: 'Teste',
    originalName: 'Test',
    level,
    rarity: 'common',
    size: 'medium',
    traits: ['Humanoid'],
    perception: 0,
    senses: [],
    languages: ['Comum'],
    skills: [],
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    ac: 10,
    fortitude: 0,
    reflex: 0,
    will: 0,
    hp: 1,
    speeds: { land: 25 },
    attacks: [
      {
        id: 'a',
        name: 'Garras',
        originalName: 'Claw',
        kind: 'melee',
        actionType: 'one',
        bonus: 0,
        map: [0, 0],
        damage: '1d4 perfurante',
        traits: [],
      },
    ],
    abilities: [],
    summary: '',
    sourceId: 'homebrew',
    source: 'Homebrew',
    aonUrl: '',
    provenance: { type: 'homebrew' },
  }
}

describe('creatureBuilding GM Core tables', () => {
  test('nível 1: CA alta 16, Percepção moderada +7, Golpe alto +9', () => {
    assert.equal(armorClass(1, 'high'), 16)
    assert.equal(perceptionBonus(1, 'moderate'), 7)
    assert.equal(strikeBonus(1, 'high'), 9)
    assert.equal(hitPoints(1, 'high'), 26)
  })

  test('CA 16 no nível 1 é Alta', () => {
    assert.equal(classifyArmorClass(1, 16), 'high')
    assert.equal(classifyHitPoints(1, 25), 'high')
  })

  test('atributo extremo não existe em −1; terrível é −5', () => {
    assert.equal(attributeModifier(-1, 'extreme'), null)
    assert.equal(attributeModifier(-1, 'high'), 3)
    assert.equal(attributeModifier(5, 'terrible'), -5)
  })

  test('CD de magia alta no 1 é 17 / +9; sem coluna baixa', () => {
    assert.deepEqual(spellDc(1, 'high'), { dc: 17, attack: 9 })
    assert.equal(spellDc(1, 'low'), null)
  })

  test('dano de Golpe alto no 1 é 1d6+3 (6)', () => {
    assert.deepEqual(strikeDamage(1, 'high'), { expr: '1d6+3', avg: 6 })
  })

  test('MAP padrão −5/−10 e ágil −4/−8', () => {
    assert.deepEqual(mapFromBonus(11, false), [6, 1])
    assert.deepEqual(mapFromBonus(11, true), [7, 3])
  })

  test('posto típico de magia e extremos por nível', () => {
    assert.equal(typicalSpellRank(7), 4)
    assert.equal(typicalSpellRank(1), 1)
    assert.deepEqual(typicalExtremeCount(11), { min: 1, max: 1 })
    assert.deepEqual(typicalExtremeCount(15), { min: 2, max: 2 })
    assert.deepEqual(typicalExtremeCount(20), { min: 3, max: 4 })
  })

  test('nível seguro de item: 6º = 2, 8º = 4', () => {
    assert.equal(safeItemLevel(1), 0)
    assert.equal(safeItemLevel(6), 2)
    assert.equal(safeItemLevel(8), 4)
  })

  test('mapa Soldado preenche CA alta e Golpe alto', () => {
    const soldier = CREATURE_ROAD_MAPS.find((m) => m.id === 'soldier')
    assert.ok(soldier)
    const next = applyRoadMapToCreature(stub(1), soldier)
    assert.equal(next.ac, 16)
    assert.equal(next.attacks[0]?.bonus, 9)
    assert.equal(next.fortitude, 10)
  })
})
