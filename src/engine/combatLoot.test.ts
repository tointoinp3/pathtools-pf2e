import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { LootTokenItem } from '@/types'
import {
  addOrStackCombatLoot,
  canDeliverCombatLootItem,
  combatLootItemToLine,
} from './combatLoot.ts'

function item(partial: Partial<LootTokenItem> = {}): LootTokenItem {
  return {
    id: partial.id ?? 'i1',
    name: partial.name ?? 'Poção',
    quantity: partial.quantity ?? 1,
    taken: partial.taken ?? false,
    definitionId: partial.definitionId ?? null,
    coinsCp: partial.coinsCp,
  }
}

describe('combatLoot', () => {
  test('item de catálogo vira linha de saque', () => {
    const line = combatLootItemToLine(
      item({ definitionId: 'item-longsword', name: 'Espada longa', quantity: 2 }),
    )
    assert.equal(line.kind, 'item')
    assert.equal(line.definitionId, 'item-longsword')
    assert.equal(line.quantity, 2)
  })

  test('moedas viram linha de ouro', () => {
    const line = combatLootItemToLine(
      item({ name: '18 po', coinsCp: 1800, quantity: 1 }),
    )
    assert.equal(line.kind, 'coins')
    assert.equal(line.coinsCp, 1800)
  })

  test('só entrega o que tem catálogo ou ouro e ainda não foi pego', () => {
    assert.equal(canDeliverCombatLootItem(item({ coinsCp: 100 })), true)
    assert.equal(
      canDeliverCombatLootItem(item({ definitionId: null, name: 'Anotação' })),
      false,
    )
    assert.equal(
      canDeliverCombatLootItem(item({ coinsCp: 100, taken: true })),
      false,
    )
  })

  test('ouro no mesmo baú soma numa linha só', () => {
    const first = item({ id: 'c1', name: '10 po', coinsCp: 1000 })
    const next = addOrStackCombatLoot(
      [first],
      item({ id: 'c2', name: '5 po', coinsCp: 500 }),
    )
    assert.equal(next.length, 1)
    assert.equal(next[0]?.coinsCp, 1500)
  })
})
