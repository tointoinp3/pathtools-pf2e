import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { CombatSession } from '@/types/combat'
import {
  COMBAT_FORMAT,
  COMBATS_FORMAT,
  parseCombatPack,
  remapCombatEntry,
} from './combatPack.ts'

function session(partial: Partial<CombatSession> = {}): CombatSession {
  return {
    id: 'combat-1',
    name: 'Emboscada',
    round: 2,
    turnTokenId: 'tok-a',
    gridCols: 12,
    gridRows: 8,
    cellSize: 48,
    tokens: [
      {
        id: 'tok-a',
        creatureId: 'wolf',
        name: 'Lobo',
        variant: 'normal',
        level: 1,
        x: 1,
        y: 1,
        w: 1,
        h: 1,
        facing: 'down',
        maxHp: 15,
        currentHp: 15,
        tempHp: 0,
        ac: 16,
        initiativeBonus: 6,
        initiative: 18,
        actionsUsed: 0,
        reactionUsed: false,
        conditions: ['Amedrontado 1'],
        notes: '',
        defeated: false,
      },
    ],
    notes: '',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...partial,
  }
}

describe('parseCombatPack', () => {
  test('lê um combate só', () => {
    const entries = parseCombatPack({
      format: COMBAT_FORMAT,
      session: session(),
      images: [
        {
          scope: 'map',
          ownerId: 'combat-1',
          mimeType: 'image/png',
          dataBase64: 'aaa',
        },
      ],
    })
    assert.equal(entries.length, 1)
    assert.equal(entries[0]?.session.name, 'Emboscada')
    assert.equal(entries[0]?.images[0]?.scope, 'map')
  })

  test('lê um lote', () => {
    const entries = parseCombatPack({
      format: COMBATS_FORMAT,
      entries: [
        { session: session({ id: 'a', name: 'A', turnTokenId: null, tokens: [] }) },
        { session: session({ id: 'b', name: 'B', turnTokenId: null, tokens: [] }) },
      ],
    })
    assert.equal(entries.length, 2)
  })

  test('recusa JSON de personagem', () => {
    assert.throws(
      () => parseCombatPack({ format: 'pathtools-2e.character' }),
      /personagem/,
    )
  })
})

describe('remapCombatEntry', () => {
  test('troca id do combate, das fichas e das imagens de token/mapa', () => {
    const remapped = remapCombatEntry(
      {
        session: session(),
        images: [
          {
            scope: 'map',
            ownerId: 'combat-1',
            mimeType: 'image/png',
            dataBase64: 'm',
          },
          {
            scope: 'token',
            ownerId: 'tok-a',
            mimeType: 'image/png',
            dataBase64: 't',
          },
          {
            scope: 'creature',
            ownerId: 'wolf',
            mimeType: 'image/png',
            dataBase64: 'c',
          },
        ],
      },
      'combat-2',
      (id) => `${id}-copy`,
      'Emboscada (cópia)',
      '2026-08-20T00:00:00.000Z',
    )
    assert.equal(remapped.session.id, 'combat-2')
    assert.equal(remapped.session.tokens[0]?.id, 'tok-a-copy')
    assert.equal(remapped.session.turnTokenId, 'tok-a-copy')
    assert.equal(remapped.images[0]?.ownerId, 'combat-2')
    assert.equal(remapped.images[1]?.ownerId, 'tok-a-copy')
    assert.equal(remapped.images[2]?.ownerId, 'wolf')
    assert.equal(remapped.session.name, 'Emboscada (cópia)')
  })
})
