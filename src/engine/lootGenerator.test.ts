import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { ItemCategory, ItemDefinition, Rarity } from '@/types'
import type { LootHaul, LootLine } from '@/types/loot'
import {
  ENCOUNTER_FRACTION,
  generateLootLines,
  haulTotalCp,
  isConsumableDefinition,
  lootLineValueCp,
  rerollLootLine,
} from './lootGenerator.ts'
import { PARTY_TREASURE_BY_LEVEL, treasureRowForLevel } from './lootTreasure.ts'

function definition(
  id: string,
  level: number,
  category: ItemCategory,
  overrides: Partial<ItemDefinition> = {},
): ItemDefinition {
  return {
    id,
    name: id,
    originalName: id,
    category,
    level,
    rarity: 'common',
    traits: [],
    description: '',
    source: 'Teste',
    priceCp: (level + 1) * 100,
    bulk: { unit: 'negligible' },
    ...overrides,
  }
}

/** Catálogo sintético: níveis 0–21, com permanentes e consumíveis de sobra. */
function buildCatalog(): ItemDefinition[] {
  const items: ItemDefinition[] = []
  for (let level = 0; level <= 21; level += 1) {
    for (let i = 0; i < 5; i += 1) {
      items.push(definition(`perm-${level}-${i}`, level, 'weapon'))
      items.push(definition(`cons-${level}-${i}`, level, 'consumable'))
    }
  }
  return items
}

const CATALOG = buildCatalog()

function haul(overrides: Partial<LootHaul> = {}): LootHaul {
  return {
    id: 'haul-teste',
    name: 'Saque de teste',
    partyLevel: 1,
    partySize: 4,
    kind: 'level',
    encounterThreat: 'moderate',
    customItemCount: 6,
    categories: [],
    rarities: [],
    includeHomebrew: false,
    includeCoins: true,
    lines: [],
    notes: '',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

function slotCountForRow(level: number): number {
  const row = treasureRowForLevel(level)
  const count = (entries: Array<{ count: number }>) =>
    entries.reduce((sum, entry) => sum + entry.count, 0)
  return count(row.permanent) + count(row.consumables)
}

function itemLines(lines: LootLine[]): LootLine[] {
  return lines.filter((line) => line.kind === 'item')
}

function itemTotal(lines: LootLine[]): number {
  return itemLines(lines).reduce((sum, line) => sum + line.quantity, 0)
}

function coinsGp(lines: LootLine[]): number {
  const coins = lines.find((line) => line.kind === 'coins')
  return (coins?.coinsCp ?? 0) / 100
}

describe('tabela de tesouro', () => {
  test('cobre os níveis 1 a 20 sem buraco', () => {
    assert.equal(PARTY_TREASURE_BY_LEVEL.length, 20)
    for (let level = 1; level <= 20; level += 1) {
      assert.equal(treasureRowForLevel(level).level, level)
    }
  })

  test('nível fora da faixa cai na ponta mais próxima', () => {
    assert.equal(treasureRowForLevel(0).level, 1)
    assert.equal(treasureRowForLevel(-3).level, 1)
    assert.equal(treasureRowForLevel(25).level, 20)
  })

  test('o orçamento total sobe a cada nível', () => {
    for (let i = 1; i < PARTY_TREASURE_BY_LEVEL.length; i += 1) {
      const anterior = PARTY_TREASURE_BY_LEVEL[i - 1]
      const atual = PARTY_TREASURE_BY_LEVEL[i]
      assert.ok(
        (atual?.totalGp ?? 0) > (anterior?.totalGp ?? 0),
        `nível ${atual?.level} não subiu`,
      )
    }
  })
})

describe('generateLootLines — tesouro do nível', () => {
  test('grupo de 4 recebe exatamente os itens da tabela', () => {
    const lines = generateLootLines(CATALOG, haul({ partyLevel: 5 }))
    assert.equal(itemTotal(lines), slotCountForRow(5))
  })

  test('as moedas seguem a coluna do nível', () => {
    const lines = generateLootLines(CATALOG, haul({ partyLevel: 5 }))
    assert.equal(coinsGp(lines), treasureRowForLevel(5).currencyGp)
  })

  test('sem moedas quando o saque pede só itens', () => {
    const lines = generateLootLines(CATALOG, haul({ includeCoins: false }))
    assert.equal(
      lines.some((line) => line.kind === 'coins'),
      false,
    )
  })

  test('cada personagem a mais soma itens e moedas', () => {
    const base = generateLootLines(CATALOG, haul({ partyLevel: 5 }))
    const maior = generateLootLines(
      CATALOG,
      haul({ partyLevel: 5, partySize: 5 }),
    )
    const row = treasureRowForLevel(5)

    assert.equal(itemTotal(maior), itemTotal(base) + 2)
    assert.equal(coinsGp(maior), row.currencyGp + row.extraPcCurrencyGp)
  })

  test('grupo menor recebe menos', () => {
    const lines = generateLootLines(
      CATALOG,
      haul({ partyLevel: 5, partySize: 3 }),
    )
    const row = treasureRowForLevel(5)

    assert.equal(itemTotal(lines), slotCountForRow(5) - 2)
    assert.equal(coinsGp(lines), Math.round(row.currencyGp * 0.75))
  })

  test('itens permanentes não se repetem no mesmo saque', () => {
    for (let run = 0; run < 20; run += 1) {
      const lines = generateLootLines(CATALOG, haul({ partyLevel: 8 }))
      const permanentes = itemLines(lines)
        .filter((line) => line.role === 'permanent')
        .map((line) => line.definitionId)
      assert.equal(new Set(permanentes).size, permanentes.length)
    }
  })

  test('o nível dos itens fica perto do nível pedido', () => {
    const lines = generateLootLines(CATALOG, haul({ partyLevel: 10 }))
    for (const line of itemLines(lines)) {
      assert.ok(
        Math.abs((line.level ?? 0) - (line.slotLevel ?? 0)) <= 2,
        `${line.name} saiu longe do nível pedido`,
      )
    }
  })
})

describe('generateLootLines — encontro', () => {
  test('cada severidade leva sua fatia do orçamento', () => {
    const row = treasureRowForLevel(6)
    for (const threat of ['low', 'moderate', 'severe', 'extreme'] as const) {
      const lines = generateLootLines(
        CATALOG,
        haul({ partyLevel: 6, kind: 'encounter', encounterThreat: threat }),
      )
      const fracao = ENCOUNTER_FRACTION[threat]
      assert.equal(coinsGp(lines), Math.round(row.currencyGp * fracao))
      assert.equal(
        itemTotal(lines),
        Math.max(1, Math.round(slotCountForRow(6) * fracao)),
      )
    }
  })

  test('um encontro leve rende menos que um extremo', () => {
    const leve = generateLootLines(
      CATALOG,
      haul({ partyLevel: 10, kind: 'encounter', encounterThreat: 'low' }),
    )
    const extremo = generateLootLines(
      CATALOG,
      haul({ partyLevel: 10, kind: 'encounter', encounterThreat: 'extreme' }),
    )
    assert.ok(haulTotalCp(leve) < haulTotalCp(extremo))
  })
})

describe('generateLootLines — saque livre', () => {
  test('respeita a quantidade pedida', () => {
    const lines = generateLootLines(
      CATALOG,
      haul({ kind: 'custom', customItemCount: 9, includeCoins: false }),
    )
    assert.equal(itemTotal(lines), 9)
  })

  test('a quantidade é limitada a 30', () => {
    const lines = generateLootLines(
      CATALOG,
      haul({ kind: 'custom', customItemCount: 500, includeCoins: false }),
    )
    assert.ok(itemTotal(lines) <= 30)
    assert.ok(itemTotal(lines) >= 20)
  })

  /**
   * Comportamento conhecido: um espaço fica vazio quando não sobrou item
   * permanente inédito no nível pedido — o saque sai menor do que o pedido,
   * sem avisar. Só aparece com catálogo estreito (filtro apertado ou nível
   * alto). Se um dia o gerador passar a buscar em níveis vizinhos nesse
   * caso, este teste é o que muda.
   */
  test('catálogo estreito devolve menos itens do que o pedido', () => {
    const estreito = [
      definition('perm-unico', 3, 'weapon'),
      definition('cons-unico', 3, 'consumable'),
    ]
    const lines = generateLootLines(
      estreito,
      haul({
        partyLevel: 2,
        kind: 'custom',
        customItemCount: 10,
        includeCoins: false,
      }),
    )
    assert.ok(itemTotal(lines) < 10)
  })
})

describe('filtros do saque', () => {
  test('a raridade escolhida é a única que aparece', () => {
    const catalog = [
      ...CATALOG,
      ...[0, 1, 2, 3, 4, 5, 6].flatMap((level) =>
        [0, 1, 2].map((i) =>
          definition(`raro-${level}-${i}`, level, 'weapon', {
            rarity: 'rare' as Rarity,
          }),
        ),
      ),
    ]
    const lines = generateLootLines(
      catalog,
      haul({ partyLevel: 3, rarities: ['rare'] }),
    )
    for (const line of itemLines(lines)) {
      assert.equal(line.rarity, 'rare')
    }
  })

  test('homebrew fica de fora quando não é pedido', () => {
    const homebrew = [0, 1, 2, 3].flatMap((level) =>
      [0, 1, 2].map((i) =>
        definition(`hb-${level}-${i}`, level, 'weapon', {
          provenance: { type: 'homebrew' },
        }),
      ),
    )
    const lines = generateLootLines(
      [...CATALOG, ...homebrew],
      haul({ partyLevel: 2, includeHomebrew: false }),
    )
    for (const line of itemLines(lines)) {
      assert.ok(!line.definitionId?.startsWith('hb-'))
    }
  })

  test('categoria escolhida limita o sorteio', () => {
    const lines = generateLootLines(
      CATALOG,
      haul({ partyLevel: 4, categories: ['consumable'] }),
    )
    for (const line of itemLines(lines)) {
      assert.equal(line.category, 'consumable')
    }
  })
})

describe('valores e re-sorteio', () => {
  test('o total soma itens e moedas', () => {
    const lines: LootLine[] = [
      { id: 'l1', kind: 'item', name: 'Poção', quantity: 3, priceCp: 400 },
      { id: 'l2', kind: 'coins', name: 'Moedas', quantity: 1, coinsCp: 1000 },
    ]
    assert.equal(lootLineValueCp(lines[0] as LootLine), 1200)
    assert.equal(haulTotalCp(lines), 2200)
  })

  test('re-sortear um item mantém o papel e o nível do espaço', () => {
    const gerado = generateLootLines(CATALOG, haul({ partyLevel: 7 }))
    const original = itemLines(gerado)[0] as LootLine
    const atual = haul({ partyLevel: 7, lines: gerado })

    const novo = rerollLootLine(CATALOG, atual, original)

    assert.equal(novo.id, original.id)
    assert.equal(novo.role, original.role)
    assert.equal(novo.slotLevel, original.slotLevel)
  })

  test('re-sortear moedas devolve moedas', () => {
    const atual = haul({ partyLevel: 7 })
    const linha: LootLine = {
      id: 'coins-1',
      kind: 'coins',
      name: 'Moedas',
      quantity: 1,
      coinsCp: 10,
    }
    const novo = rerollLootLine(CATALOG, atual, linha)
    assert.equal(novo.kind, 'coins')
    assert.equal((novo.coinsCp ?? 0) / 100, treasureRowForLevel(7).currencyGp)
  })
})

describe('isConsumableDefinition', () => {
  test('reconhece consumível pela categoria', () => {
    assert.equal(isConsumableDefinition(definition('c', 1, 'consumable')), true)
    assert.equal(isConsumableDefinition(definition('a', 1, 'alchemical')), true)
    assert.equal(isConsumableDefinition(definition('m', 1, 'ammunition')), true)
    assert.equal(isConsumableDefinition(definition('s', 1, 'snare')), true)
  })

  test('arma e armadura não são consumíveis', () => {
    assert.equal(isConsumableDefinition(definition('w', 1, 'weapon')), false)
    assert.equal(isConsumableDefinition(definition('a', 1, 'armor')), false)
  })

  test('reconhece consumível pelo traço', () => {
    assert.equal(
      isConsumableDefinition(
        definition('t', 1, 'worn', { traits: ['Consumable'] }),
      ),
      true,
    )
  })
})
