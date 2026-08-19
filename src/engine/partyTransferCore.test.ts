import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { EquipmentItem } from '@/types'
import {
  PartyTransferError,
  addOrStack,
  coinsToCp,
  moveCoins,
  moveItem,
  type HolderInventory,
} from './partyTransferCore.ts'

function item(
  id: string,
  overrides: Partial<EquipmentItem> = {},
): EquipmentItem {
  return {
    id,
    name: id,
    slot: 'held',
    quantity: 1,
    ...overrides,
  }
}

function holder(
  coinsCp: number,
  equipment: EquipmentItem[] = [],
): HolderInventory {
  return { coinsCp, equipment }
}

/** Consumíveis e munição empilham; usado no lugar do catálogo real. */
const stacksConsumables = (entry: EquipmentItem) =>
  entry.definitionId?.startsWith('consumable-') === true ||
  entry.definitionId?.startsWith('ammo-') === true

const nunca = () => false

let idCounter = 0
const nextId = () => `eq-novo-${(idCounter += 1)}`

function totalCoins(...holders: HolderInventory[]): number {
  return holders.reduce((sum, h) => sum + h.coinsCp, 0)
}

function totalItems(...holders: HolderInventory[]): number {
  return holders.reduce(
    (sum, h) =>
      sum + h.equipment.reduce((n, entry) => n + (entry.quantity ?? 1), 0),
    0,
  )
}

describe('coinsToCp', () => {
  test('converte po, pp e pc para peças de cobre', () => {
    assert.equal(coinsToCp(1, 'gp'), 100)
    assert.equal(coinsToCp(1, 'sp'), 10)
    assert.equal(coinsToCp(1, 'cp'), 1)
    assert.equal(coinsToCp(2.5, 'gp'), 250)
  })

  test('valor inválido ou negativo vira zero', () => {
    assert.equal(coinsToCp(0, 'gp'), 0)
    assert.equal(coinsToCp(-5, 'gp'), 0)
    assert.equal(coinsToCp(Number.NaN, 'gp'), 0)
    assert.equal(coinsToCp(Number.POSITIVE_INFINITY, 'gp'), 0)
  })
})

describe('moveCoins', () => {
  test('o total do grupo não muda ao passar ouro', () => {
    const from = holder(1000)
    const to = holder(250)
    const antes = totalCoins(from, to)

    const moved = moveCoins(from, to, 400)

    assert.equal(moved.from.coinsCp, 600)
    assert.equal(moved.to.coinsCp, 650)
    assert.equal(totalCoins(moved.from, moved.to), antes)
  })

  test('passar tudo zera a origem sem criar moeda no destino', () => {
    const moved = moveCoins(holder(1000), holder(0), 1000)
    assert.equal(moved.from.coinsCp, 0)
    assert.equal(moved.to.coinsCp, 1000)
  })

  test('não deixa ficar devendo', () => {
    assert.throws(
      () => moveCoins(holder(300), holder(0), 500),
      (error: unknown) =>
        error instanceof PartyTransferError &&
        error.code === 'not-enough-coins' &&
        error.available === 300,
    )
  })

  test('recusa valor zero, negativo ou quebrado', () => {
    for (const amount of [0, -100, 0.4]) {
      assert.throws(
        () => moveCoins(holder(1000), holder(0), amount),
        (error: unknown) =>
          error instanceof PartyTransferError &&
          error.code === 'invalid-amount',
      )
    }
  })

  test('não altera os inventários originais', () => {
    const from = holder(1000)
    const to = holder(0)
    moveCoins(from, to, 500)
    assert.equal(from.coinsCp, 1000)
    assert.equal(to.coinsCp, 0)
  })
})

describe('moveItem', () => {
  test('item único sai de um lado e chega no outro', () => {
    const espada = item('eq-espada', { name: 'Espada longa' })
    const from = holder(0, [espada])
    const to = holder(0, [])

    const moved = moveItem(from, to, {
      itemId: 'eq-espada',
      quantity: 1,
      isStackable: nunca,
      createItemId: nextId,
    })

    assert.equal(moved.from.equipment.length, 0)
    assert.equal(moved.to.equipment.length, 1)
    assert.equal(moved.to.equipment[0]?.name, 'Espada longa')
    assert.equal(totalItems(moved.from, moved.to), 1)
  })

  test('pilha dividida conserva a quantidade total', () => {
    const from = holder(0, [
      item('eq-pocao', { quantity: 5, definitionId: 'consumable-cura' }),
    ])
    const to = holder(0, [])
    const antes = totalItems(from, to)

    const moved = moveItem(from, to, {
      itemId: 'eq-pocao',
      quantity: 2,
      isStackable: stacksConsumables,
      createItemId: nextId,
    })

    assert.equal(moved.from.equipment[0]?.quantity, 3)
    assert.equal(moved.to.equipment[0]?.quantity, 2)
    assert.equal(totalItems(moved.from, moved.to), antes)
  })

  test('a parte que fica e a que vai têm ids diferentes', () => {
    const moved = moveItem(
      holder(0, [
        item('eq-pocao', { quantity: 5, definitionId: 'consumable-cura' }),
      ]),
      holder(0, []),
      {
        itemId: 'eq-pocao',
        quantity: 2,
        isStackable: stacksConsumables,
        createItemId: nextId,
      },
    )

    assert.equal(moved.from.equipment[0]?.id, 'eq-pocao')
    assert.notEqual(moved.to.equipment[0]?.id, 'eq-pocao')
  })

  test('consumível igual empilha no destino em vez de duplicar a linha', () => {
    const from = holder(0, [
      item('eq-pocao-a', { quantity: 3, definitionId: 'consumable-cura' }),
    ])
    const to = holder(0, [
      item('eq-pocao-b', { quantity: 2, definitionId: 'consumable-cura' }),
    ])
    const antes = totalItems(from, to)

    const moved = moveItem(from, to, {
      itemId: 'eq-pocao-a',
      quantity: 3,
      isStackable: stacksConsumables,
      createItemId: nextId,
    })

    assert.equal(moved.to.equipment.length, 1)
    assert.equal(moved.to.equipment[0]?.quantity, 5)
    assert.equal(totalItems(moved.from, moved.to), antes)
  })

  test('item não empilhável entra como linha separada', () => {
    const moved = moveItem(
      holder(0, [item('eq-adaga-a', { definitionId: 'weapon-adaga' })]),
      holder(0, [item('eq-adaga-b', { definitionId: 'weapon-adaga' })]),
      {
        itemId: 'eq-adaga-a',
        quantity: 1,
        isStackable: nunca,
        createItemId: nextId,
      },
    )

    assert.equal(moved.to.equipment.length, 2)
    assert.equal(totalItems(moved.from, moved.to), 2)
  })

  test('item sem ficha de catálogo nunca empilha', () => {
    const moved = moveItem(
      holder(0, [item('eq-lembranca-a', { name: 'Lembrança' })]),
      holder(0, [item('eq-lembranca-b', { name: 'Lembrança' })]),
      {
        itemId: 'eq-lembranca-a',
        quantity: 1,
        isStackable: () => true,
        createItemId: nextId,
      },
    )

    assert.equal(moved.to.equipment.length, 2)
  })

  test('o item chega desequipado, desinvestido e sem escudo erguido', () => {
    const moved = moveItem(
      holder(0, [
        item('eq-escudo', {
          equipped: true,
          invested: true,
          raised: true,
        }),
      ]),
      holder(0, []),
      {
        itemId: 'eq-escudo',
        quantity: 1,
        isStackable: nunca,
        createItemId: nextId,
      },
    )

    const chegou = moved.to.equipment[0]
    assert.equal(chegou?.equipped, false)
    assert.equal(chegou?.invested, false)
    assert.equal(chegou?.raised, false)
  })

  test('arma da origem perde o vínculo com a munição que foi embora', () => {
    const from = holder(0, [
      item('eq-arco', { loadedAmmoItemId: 'eq-flechas' }),
      item('eq-flechas', { quantity: 10, definitionId: 'ammo-flecha' }),
    ])

    const moved = moveItem(from, holder(0, []), {
      itemId: 'eq-flechas',
      quantity: 10,
      isStackable: stacksConsumables,
      createItemId: nextId,
    })

    assert.equal(moved.from.equipment[0]?.loadedAmmoItemId, null)
  })

  test('vínculo continua quando só parte da munição sai', () => {
    const from = holder(0, [
      item('eq-arco', { loadedAmmoItemId: 'eq-flechas' }),
      item('eq-flechas', { quantity: 10, definitionId: 'ammo-flecha' }),
    ])

    const moved = moveItem(from, holder(0, []), {
      itemId: 'eq-flechas',
      quantity: 4,
      isStackable: stacksConsumables,
      createItemId: nextId,
    })

    assert.equal(moved.from.equipment[0]?.loadedAmmoItemId, 'eq-flechas')
    assert.equal(moved.from.equipment[1]?.quantity, 6)
  })

  test('a arma que muda de dono chega sem munição carregada', () => {
    const moved = moveItem(
      holder(0, [item('eq-arco', { loadedAmmoItemId: 'eq-flechas' })]),
      holder(0, []),
      {
        itemId: 'eq-arco',
        quantity: 1,
        isStackable: nunca,
        createItemId: nextId,
      },
    )

    assert.equal(moved.to.equipment[0]?.loadedAmmoItemId, null)
  })

  test('não move mais do que existe na pilha', () => {
    assert.throws(
      () =>
        moveItem(
          holder(0, [item('eq-pocao', { quantity: 2 })]),
          holder(0, []),
          {
            itemId: 'eq-pocao',
            quantity: 3,
            isStackable: nunca,
            createItemId: nextId,
          },
        ),
      (error: unknown) =>
        error instanceof PartyTransferError &&
        error.code === 'quantity-too-high' &&
        error.available === 2,
    )
  })

  test('item inexistente na origem é recusado', () => {
    assert.throws(
      () =>
        moveItem(holder(0, []), holder(0, []), {
          itemId: 'eq-fantasma',
          quantity: 1,
          isStackable: nunca,
          createItemId: nextId,
        }),
      (error: unknown) =>
        error instanceof PartyTransferError && error.code === 'item-missing',
    )
  })

  test('quantidade zero ou negativa é recusada', () => {
    for (const quantity of [0, -1]) {
      assert.throws(
        () =>
          moveItem(
            holder(0, [item('eq-pocao', { quantity: 5 })]),
            holder(0, []),
            {
              itemId: 'eq-pocao',
              quantity,
              isStackable: nunca,
              createItemId: nextId,
            },
          ),
        (error: unknown) =>
          error instanceof PartyTransferError &&
          error.code === 'invalid-quantity',
      )
    }
  })

  test('não altera os inventários originais', () => {
    const from = holder(0, [item('eq-pocao', { quantity: 5 })])
    const to = holder(0, [])

    moveItem(from, to, {
      itemId: 'eq-pocao',
      quantity: 2,
      isStackable: nunca,
      createItemId: nextId,
    })

    assert.equal(from.equipment.length, 1)
    assert.equal(from.equipment[0]?.quantity, 5)
    assert.equal(to.equipment.length, 0)
  })

  test('moedas não mudam numa transferência de item', () => {
    const moved = moveItem(
      holder(1000, [item('eq-pocao')]),
      holder(250, []),
      {
        itemId: 'eq-pocao',
        quantity: 1,
        isStackable: nunca,
        createItemId: nextId,
      },
    )

    assert.equal(moved.from.coinsCp, 1000)
    assert.equal(moved.to.coinsCp, 250)
  })

  test('ida e volta devolve o inventário ao estado inicial', () => {
    const a = holder(0, [
      item('eq-pocao', { quantity: 4, definitionId: 'consumable-cura' }),
    ])
    const b = holder(0, [])

    const ida = moveItem(a, b, {
      itemId: 'eq-pocao',
      quantity: 4,
      isStackable: stacksConsumables,
      createItemId: nextId,
    })
    const idQueChegou = ida.to.equipment[0]?.id ?? ''
    const volta = moveItem(ida.to, ida.from, {
      itemId: idQueChegou,
      quantity: 4,
      isStackable: stacksConsumables,
      createItemId: nextId,
    })

    assert.equal(volta.from.equipment.length, 0)
    assert.equal(volta.to.equipment.length, 1)
    assert.equal(volta.to.equipment[0]?.quantity, 4)
    assert.equal(totalItems(volta.from, volta.to), 4)
  })
})

describe('addOrStack', () => {
  test('empilha pela ficha de catálogo, não pelo nome', () => {
    const destino = [
      item('eq-a', { name: 'Poção', quantity: 1, definitionId: 'consumable-x' }),
    ]
    const chegando = item('eq-b', {
      name: 'Poção',
      quantity: 2,
      definitionId: 'consumable-y',
    })

    const next = addOrStack(destino, chegando, () => true)

    assert.equal(next.length, 2)
  })

  test('item sem definitionId nunca empilha', () => {
    const next = addOrStack([item('eq-a')], item('eq-b'), () => true)
    assert.equal(next.length, 2)
  })
})
