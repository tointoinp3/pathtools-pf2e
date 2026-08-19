import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { CreaturePowerVariant } from '@/types/creature'
import type { Rarity } from '@/types'
import {
  combatThreatLabel,
  creatureEncounterXp,
  encounterLevelForVariant,
  encounterLinesXp,
  encounterXpBudget,
  generateEncounterLines,
  creatureMatchesTraitFilter,
  lineFromCreature,
  encounterCountRange,
  encounterShapeLabel,
  preferredDeltaRange,
  resolveEncounterShape,
  rerollEncounterLine,
  themeKeysForCreature,
  type EncounterCatalogCreature,
  type EncounterFamily,
  type EncounterGenerateInput,
} from './encounterGenerator.ts'

function creature(
  id: string,
  level: number,
  traits: string[],
  extra: Partial<EncounterCatalogCreature> = {},
): EncounterCatalogCreature {
  return {
    id,
    name: extra.name ?? id,
    originalName: extra.originalName ?? id,
    level,
    rarity: extra.rarity ?? 'common',
    traits,
    familyIds: extra.familyIds,
    provenance: extra.provenance ?? { type: 'official' },
    ...extra,
  }
}

const FAMILIES: EncounterFamily[] = [
  { id: 'family-goblin', name: 'Goblin', trait: 'Goblin' },
  { id: 'family-drake', name: 'Drake', trait: 'Drake' },
]

function plan(
  extra: Partial<EncounterGenerateInput> = {},
): EncounterGenerateInput {
  return {
    partyLevel: 1,
    partySize: 4,
    threat: 'moderate',
    shape: 'horde',
    prioritizeSameType: false,
    rarities: [],
    includeHomebrew: true,
    includeUnique: false,
    ...extra,
  }
}

/** random() sempre 0 → pega o primeiro peso / o começo da lista. */
function alwaysFirst(): () => number {
  return () => 0
}

function sequence(values: number[]): () => number {
  let index = 0
  return () => {
    const value = values[index] ?? 0
    index += 1
    return value
  }
}

describe('orçamento de XP (GM Core)', () => {
  test('4 PCs: trivial 40, leve 60, moderado 80, severo 120, extremo 160', () => {
    assert.equal(encounterXpBudget('trivial', 4), 40)
    assert.equal(encounterXpBudget('low', 4), 60)
    assert.equal(encounterXpBudget('moderate', 4), 80)
    assert.equal(encounterXpBudget('severe', 4), 120)
    assert.equal(encounterXpBudget('extreme', 4), 160)
  })

  test('cada PC a mais ou a menos ajusta o orçamento', () => {
    assert.equal(encounterXpBudget('moderate', 5), 100)
    assert.equal(encounterXpBudget('moderate', 3), 60)
    assert.equal(encounterXpBudget('severe', 6), 180)
    assert.equal(encounterXpBudget('trivial', 1), 10)
  })
})

describe('XP da criatura pelo nível relativo', () => {
  test('tabela −4 a +4', () => {
    assert.equal(creatureEncounterXp(1, 5), 10)
    assert.equal(creatureEncounterXp(2, 5), 15)
    assert.equal(creatureEncounterXp(3, 5), 20)
    assert.equal(creatureEncounterXp(4, 5), 30)
    assert.equal(creatureEncounterXp(5, 5), 40)
    assert.equal(creatureEncounterXp(6, 5), 60)
    assert.equal(creatureEncounterXp(7, 5), 80)
    assert.equal(creatureEncounterXp(8, 5), 120)
    assert.equal(creatureEncounterXp(9, 5), 160)
  })

  test('fora da faixa vale 0', () => {
    assert.equal(creatureEncounterXp(0, 5), 0)
    assert.equal(creatureEncounterXp(10, 5), 0)
  })

  test('Elite e Fraca mudam o nível efetivo (Monster Core)', () => {
    assert.equal(encounterLevelForVariant(-1, 'elite'), 1)
    assert.equal(encounterLevelForVariant(5, 'elite'), 6)
    assert.equal(encounterLevelForVariant(1, 'weak'), -1)
    assert.equal(encounterLevelForVariant(5, 'weak'), 4)
    assert.equal(encounterLevelForVariant(5, 'normal'), 5)
  })
})

describe('tema / mesmo tipo', () => {
  test('agrupa pelo traço da família', () => {
    const goblin = creature('g1', -1, ['Goblin', 'Humanoid'])
    const themes = themeKeysForCreature(goblin, FAMILIES)
    assert.deepEqual(
      themes.map((theme) => theme.key),
      ['family-goblin'],
    )
  })

  test('familyIds ganha do traço genérico', () => {
    const wyrm = creature('adamantine', 11, ['Dragon'], {
      familyIds: ['family-dragon-adamantine'],
    })
    const families: EncounterFamily[] = [
      { id: 'family-dragon-adamantine', name: 'Dragão de Adamantina', trait: null },
      { id: 'family-goblin', name: 'Goblin', trait: 'Goblin' },
    ]
    const themes = themeKeysForCreature(wyrm, families)
    assert.equal(themes[0]?.key, 'family-dragon-adamantine')
  })
})

describe('gerar encontro', () => {
  const goblins = [
    creature('goblin-warrior', -1, ['Goblin'], { name: 'Guerreiro Goblin' }),
    creature('goblin-commando', 1, ['Goblin'], { name: 'Comando Goblin' }),
    creature('goblin-pyro', 2, ['Goblin'], { name: 'Pirogoblin' }),
  ]
  const drakes = [
    creature('river-drake', 3, ['Drake'], { name: 'Drake-rio' }),
    creature('flame-drake', 5, ['Drake'], { name: 'Drake-chama' }),
  ]
  const catalog = [...goblins, ...drakes]

  test('não passa do orçamento', () => {
    const result = generateEncounterLines(
      plan({ partyLevel: 1, threat: 'moderate' }),
      catalog,
      FAMILIES,
      { random: alwaysFirst() },
    )
    const used = encounterLinesXp(result.lines)
    assert.ok(result.lines.length > 0, 'sorteou alguém')
    assert.ok(used <= 80, `usado ${used} > 80`)
  })

  test('priorizar mesmo tipo não mistura goblin e drake', () => {
    const result = generateEncounterLines(
      plan({
        partyLevel: 1,
        threat: 'moderate',
        prioritizeSameType: true,
      }),
      catalog,
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.ok(result.themeKey)
    const keys = new Set(
      result.lines.flatMap((line) => {
        const found = catalog.find((entry) => entry.id === line.creatureId)
        return found ? themeKeysForCreature(found, FAMILIES).map((t) => t.key) : []
      }),
    )
    const familiesUsed = [...keys].filter((key) => key.startsWith('family-'))
    assert.equal(familiesUsed.length, 1, `misturou ${[...familiesUsed].join(', ')}`)
  })

  test('sem priorizar, não fixa um tipo de família', () => {
    const mixed = generateEncounterLines(
      plan({
        partyLevel: 3,
        threat: 'severe',
        prioritizeSameType: false,
      }),
      catalog,
      FAMILIES,
      { random: sequence([0.99, 0, 0.99, 0, 0.99, 0, 0.99, 0]) },
    )
    assert.equal(mixed.themeKey, null)
    assert.ok(mixed.lines.length > 0, 'sorteou alguém no combate misturado')
  })

  test('unique fica de fora por padrão', () => {
    const withUnique = [
      creature('unique-boss', 1, ['Fiend'], {
        rarity: 'unique' as Rarity,
        name: 'Chefe único',
      }),
      ...goblins,
    ]
    const result = generateEncounterLines(
      plan({
        partyLevel: 1,
        threat: 'moderate',
        includeUnique: false,
        prioritizeSameType: false,
      }),
      withUnique,
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.ok(result.lines.length > 0)
    assert.ok(result.lines.every((line) => line.creatureId !== 'unique-boss'))
  })

  test('homebrew respeita o interruptor', () => {
    const homebrew = creature('home-gob', -1, ['Goblin'], {
      provenance: { type: 'homebrew' },
    })
    const result = generateEncounterLines(
      plan({ includeHomebrew: false, prioritizeSameType: false }),
      [homebrew, ...goblins],
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.ok(result.lines.every((line) => line.creatureId !== 'home-gob'))
  })

  test('traços: todos por padrão, lista restringe, vazio não sorteia', () => {
    assert.equal(
      creatureMatchesTraitFilter(['Goblin'], null),
      true,
    )
    assert.equal(creatureMatchesTraitFilter(['Goblin'], []), false)
    assert.equal(
      creatureMatchesTraitFilter(['Goblin'], ['Goblin', 'Dragon']),
      true,
    )
    assert.equal(
      creatureMatchesTraitFilter(['Drake'], ['Goblin', 'Dragon']),
      false,
    )
    const mixed = [
      creature('goblin-warrior', -1, ['Goblin']),
      creature('kobold-scout', -1, ['Kobold']),
    ]
    const onlyGoblin = generateEncounterLines(
      plan({
        traits: ['Goblin'],
        partyLevel: 1,
        threat: 'moderate',
        prioritizeSameType: false,
      }),
      mixed,
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.ok(onlyGoblin.lines.length > 0)
    assert.ok(
      onlyGoblin.lines.every((line) => line.creatureId === 'goblin-warrior'),
    )
    const none = generateEncounterLines(
      plan({ traits: [], partyLevel: 1, threat: 'moderate' }),
      mixed,
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.equal(none.lines.length, 0)
  })

  test('rótulos de ameaça em pt-BR', () => {
    assert.equal(combatThreatLabel('trivial'), 'trivial')
    assert.equal(combatThreatLabel('low'), 'leve')
    assert.equal(combatThreatLabel('moderate'), 'moderado')
  })
})

describe('trocar linha e variante', () => {
  test('trocar não reaproveita a mesma ficha', () => {
    const catalog = [
      creature('goblin-a', -1, ['Goblin'], { name: 'A' }),
      creature('goblin-b', -1, ['Goblin'], { name: 'B' }),
    ]
    const input = plan({ prioritizeSameType: true, themeKey: 'family-goblin' })
    const line = lineFromCreature(catalog[0]!, 1, FAMILIES)
    const next = rerollEncounterLine(line, input, catalog, FAMILIES, [line], {
      random: alwaysFirst(),
    })
    assert.equal(next.creatureId, 'goblin-b')
  })

  test('Elite sobe o XP da linha', () => {
    const goblin = creature('goblin-warrior', -1, ['Goblin'])
    const normal = lineFromCreature(goblin, 1, FAMILIES, 'normal')
    const elite = lineFromCreature(goblin, 1, FAMILIES, 'elite' as CreaturePowerVariant)
    assert.equal(normal.level, -1)
    assert.equal(normal.xpEach, 20)
    assert.equal(elite.level, 1)
    assert.equal(elite.xpEach, 40)
  })
})

function totalQty(
  lines: Array<{ quantity: number }>,
): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0)
}

describe('chefe e horda', () => {
  test('rótulos em pt-BR', () => {
    assert.equal(encounterShapeLabel('boss'), 'chefe')
    assert.equal(encounterShapeLabel('balanced'), 'equilíbrio')
    assert.equal(encounterShapeLabel('horde'), 'horda')
    assert.equal(resolveEncounterShape(undefined), 'balanced')
    assert.equal(resolveEncounterShape('horde'), 'horde')
  })

  test('nível alto mira mais corpos na horda do que nível baixo', () => {
    const low = encounterCountRange('horde', 1, 4, 'moderate')
    const high = encounterCountRange('horde', 16, 4, 'moderate')
    assert.ok(low.min >= 3)
    assert.ok(high.min > low.min)
    assert.ok(high.max > low.max)
    const bossLow = encounterCountRange('boss', 1, 4, 'moderate')
    const bossHigh = encounterCountRange('boss', 16, 4, 'moderate')
    assert.equal(bossLow.max, 1)
    assert.ok(bossHigh.max >= 2)
    assert.ok(bossHigh.max < high.min)
    const mid = encounterCountRange('balanced', 16, 4, 'moderate')
    assert.ok(mid.min > bossHigh.min)
    assert.ok(mid.max < high.max)
  })

  test('horda prefere mais fracos em nível alto', () => {
    assert.deepEqual(preferredDeltaRange('horde', 1), { min: -2, max: 0 })
    assert.deepEqual(preferredDeltaRange('horde', 16), { min: -4, max: -2 })
    assert.deepEqual(preferredDeltaRange('boss', 1), { min: 0, max: 2 })
    assert.deepEqual(preferredDeltaRange('boss', 16), { min: 1, max: 4 })
    assert.deepEqual(preferredDeltaRange('balanced', 1), { min: -2, max: 1 })
  })

  test('horda sorteia quantidade da mesma ficha', () => {
    const troop = creature('soulrider-monitor', -1, ['Goblin'], {
      name: 'Soulrider Monitor',
    })
    const result = generateEncounterLines(
      plan({ shape: 'horde', partyLevel: 1, threat: 'moderate' }),
      [troop],
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.equal(result.lines.length, 1)
    assert.ok(
      result.lines[0]!.quantity >= 2,
      `esperava 2+ da mesma ficha, veio ${result.lines[0]!.quantity}`,
    )
    assert.ok(encounterLinesXp(result.lines) <= 80)
  })

  test('chefe traz poucos inimigos fortes', () => {
    const minion = creature('goblin-warrior', -1, ['Goblin'], { name: 'Guerreiro' })
    const ogre = creature('ogre', 2, ['Giant'], { name: 'Ogro' })
    const result = generateEncounterLines(
      plan({ shape: 'boss', partyLevel: 1, threat: 'moderate' }),
      [minion, ogre],
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.ok(totalQty(result.lines) <= 2)
    assert.ok(result.lines.every((line) => line.creatureId === 'ogre'))
  })

  test('horda em nível alto tem mais corpos que em nível baixo', () => {
    const low = generateEncounterLines(
      plan({ shape: 'horde', partyLevel: 1, threat: 'moderate' }),
      [creature('low-minion', -1, ['Goblin'])],
      FAMILIES,
      { random: alwaysFirst() },
    )
    const high = generateEncounterLines(
      plan({ shape: 'horde', partyLevel: 10, threat: 'moderate' }),
      [creature('high-minion', 6, ['Goblin'])],
      FAMILIES,
      { random: alwaysFirst() },
    )
    assert.ok(
      totalQty(high.lines) > totalQty(low.lines),
      `nível 10 tinha ${totalQty(high.lines)}, nível 1 tinha ${totalQty(low.lines)}`,
    )
  })

  test('equilíbrio mistura forte e tropa no orçamento', () => {
    const minion = creature('goblin-warrior', -1, ['Goblin'], { name: 'Guerreiro' })
    const ogre = creature('ogre', 2, ['Giant'], { name: 'Ogro' })
    const result = generateEncounterLines(
      plan({ shape: 'balanced', partyLevel: 1, threat: 'moderate' }),
      [minion, ogre],
      FAMILIES,
      { random: alwaysFirst() },
    )
    const ids = new Set(result.lines.map((line) => line.creatureId))
    assert.ok(ids.has('ogre'), 'faltou o chefe')
    assert.ok(ids.has('goblin-warrior'), 'faltou a tropa')
    assert.ok(encounterLinesXp(result.lines) <= 80)
    assert.ok(totalQty(result.lines) >= 2)
  })
})
