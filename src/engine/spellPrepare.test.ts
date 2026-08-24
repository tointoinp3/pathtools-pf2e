import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { ResolvedSpellcastingAccess, Spell } from '@/types'
import {
  fillEmptyPreparedSlot,
  hydratePreparedSlotsFromKnown,
  learnSpell,
} from './spellcasting.ts'

const access: ResolvedSpellcastingAccess = {
  hasAccess: true,
  sources: [
    {
      id: 'class',
      kind: 'class',
      label: 'Mago',
      style: 'prepared',
      tradition: 'arcane',
      proficiencyRank: 'trained',
      features: { spellbook: true },
      slotsByRank: { 1: 2 },
      cantripsPerDay: 5,
    },
  ],
  primaryStyle: 'prepared',
  features: { spellbook: true },
  slotsByRank: { 1: 2 },
  highestSlotRank: 1,
  cantripsPerDay: 5,
}

function spell(id: string, rank: 0 | 1 = 1): Spell {
  return {
    id,
    name: id,
    originalName: id,
    rank,
    traditions: ['arcane'],
    traits: [],
    rarity: 'common',
    provenance: { type: 'official' },
    description: id,
  }
}

describe('aprender magia já preenche o espaço do dia', () => {
  test('Aprender uma magia de 1º ocupa um espaço vazio', () => {
    const next = learnSpell(undefined, spell('magic-missile'), access)
    assert.deepEqual(next.collectionSpellIds, ['magic-missile'])
    const filled = (next.preparedSlots ?? []).filter((s) => s.spellId)
    assert.equal(filled.length, 1)
    assert.equal(filled[0]?.spellId, 'magic-missile')
  })

  test('segunda magia ocupa o outro espaço; a terceira só entra no grimório', () => {
    let next = learnSpell(undefined, spell('magic-missile'), access)
    next = learnSpell(next, spell('grease'), access)
    next = learnSpell(next, spell('fear'), access)
    assert.equal(next.collectionSpellIds?.length, 3)
    const filled = (next.preparedSlots ?? []).filter((s) => s.spellId)
    assert.equal(filled.length, 2)
  })

  test('não duplica no dia se a magia já está preparada', () => {
    const once = learnSpell(undefined, spell('magic-missile'), access)
    const twice = fillEmptyPreparedSlot(once, access, 'magic-missile', 1)
    const filled = (twice.preparedSlots ?? []).filter(
      (s) => s.spellId === 'magic-missile',
    )
    assert.equal(filled.length, 1)
  })
})

describe('hydratePreparedSlotsFromKnown', () => {
  test('grimório cheio e dia vazio: preenche os espaços', () => {
    const stuck = {
      collectionSpellIds: ['magic-missile', 'grease', 'fear'],
      preparedSlots: [
        { id: 'r1-0', rank: 1 as const, spellId: null, expended: false },
        { id: 'r1-1', rank: 1 as const, spellId: null, expended: false },
      ],
    }
    const next = hydratePreparedSlotsFromKnown(stuck, access, [
      spell('magic-missile'),
      spell('grease'),
      spell('fear'),
    ])
    assert.ok(next)
    assert.deepEqual(
      (next.preparedSlots ?? []).map((s) => s.spellId),
      ['magic-missile', 'grease'],
    )
  })

  test('não mexe se o jogador já preparou alguma', () => {
    const partial = {
      collectionSpellIds: ['magic-missile', 'grease'],
      preparedSlots: [
        { id: 'r1-0', rank: 1 as const, spellId: 'magic-missile', expended: false },
        { id: 'r1-1', rank: 1 as const, spellId: null, expended: false },
      ],
    }
    assert.equal(
      hydratePreparedSlotsFromKnown(partial, access, [
        spell('magic-missile'),
        spell('grease'),
      ]),
      null,
    )
  })
})
