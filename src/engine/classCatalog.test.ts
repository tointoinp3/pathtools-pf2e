import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { ClassCatalogDefinition, ClassChoices } from '@/types/class'
import {
  catalogPreparedSlotCount,
  hydrateCatalogPrepared,
  toggleCatalogPick,
} from './classCatalog.ts'
import { emptyClassChoices } from './class.ts'

const opt = (id: string): ClassCatalogDefinition['options'][number] => ({
  id,
  name: id,
  originalName: id,
  description: id,
  rulesSummary: id,
})

const fieldCatalog: ClassCatalogDefinition = {
  id: 'alchemist-field-formulas',
  classId: 'class-alchemist',
  label: 'Fórmulas do campo',
  description: '',
  kind: 'repertoire',
  unique: true,
  slotsByLevel: [{ minLevel: 1, count: 2 }],
  options: [opt('antidote'), opt('antiplague'), opt('bomb-a')],
}

const bookCatalog: ClassCatalogDefinition = {
  id: 'alchemist-formulas',
  classId: 'class-alchemist',
  label: 'Livro de fórmulas',
  description: '',
  kind: 'repertoire',
  unique: true,
  slotsByLevel: [{ minLevel: 1, count: 8 }],
  preparedSlotsByLevel: [{ minLevel: 1, count: 4 }],
  preparedAddIntelligence: true,
  preparedFromPicks: true,
  preparedFromCatalogIds: ['alchemist-field-formulas'],
  allowPreparedDuplicates: true,
  preparedLabel: 'Itens infundidos do dia',
  options: [
    opt('antidote'),
    opt('antiplague'),
    opt('bomb-a'),
    opt('bomb-b'),
    opt('elixir-a'),
    opt('elixir-b'),
    opt('elixir-c'),
  ],
}

const catalogs = [fieldCatalog, bookCatalog]

function choices(partial: Partial<ClassChoices> = {}): ClassChoices {
  return { ...emptyClassChoices(), ...partial }
}

describe('toggleCatalogPick — alquimista', () => {
  test('escolher fórmula já conta como item infundido do dia', () => {
    let next = choices()
    next = toggleCatalogPick(bookCatalog, catalogs, next, 'bomb-a', 1, 3)
    next = toggleCatalogPick(bookCatalog, catalogs, next, 'bomb-b', 1, 3)
    assert.deepEqual(next.catalogPicks?.['alchemist-formulas'], [
      'bomb-a',
      'bomb-b',
    ])
    assert.deepEqual(next.catalogPrepared?.['alchemist-formulas'], [
      'bomb-a',
      'bomb-b',
    ])
  })

  test('fórmula do campo também infunde no livro', () => {
    let next = choices()
    next = toggleCatalogPick(fieldCatalog, catalogs, next, 'antidote', 1, 3)
    assert.deepEqual(next.catalogPicks?.['alchemist-field-formulas'], [
      'antidote',
    ])
    assert.deepEqual(next.catalogPrepared?.['alchemist-formulas'], ['antidote'])
  })

  test('não passa de 4+INT infusões ao escolher mais fórmulas', () => {
    let next = choices()
    for (const id of [
      'bomb-a',
      'bomb-b',
      'elixir-a',
      'elixir-b',
      'elixir-c',
      'antidote',
      'antiplague',
    ]) {
      next = toggleCatalogPick(bookCatalog, catalogs, next, id, 1, 3)
    }
    assert.equal(next.catalogPicks?.['alchemist-formulas']?.length, 7)
    assert.equal(next.catalogPrepared?.['alchemist-formulas']?.length, 7)
    assert.equal(catalogPreparedSlotCount(bookCatalog, 1, 3), 7)
  })

  test('tirar do livro remove a infusão, salvo se ainda estiver no campo', () => {
    let next = choices()
    next = toggleCatalogPick(fieldCatalog, catalogs, next, 'antidote', 1, 3)
    next = toggleCatalogPick(bookCatalog, catalogs, next, 'antidote', 1, 3)
    assert.deepEqual(next.catalogPrepared?.['alchemist-formulas'], [
      'antidote',
      'antidote',
    ])
    next = toggleCatalogPick(bookCatalog, catalogs, next, 'antidote', 1, 3)
    assert.deepEqual(next.catalogPicks?.['alchemist-formulas'], [])
    assert.deepEqual(next.catalogPrepared?.['alchemist-formulas'], ['antidote'])
    next = toggleCatalogPick(fieldCatalog, catalogs, next, 'antidote', 1, 3)
    assert.deepEqual(next.catalogPrepared?.['alchemist-formulas'], [])
  })
})

describe('hydrateCatalogPrepared', () => {
  test('fórmulas já escolhidas passam a contar como infundidas', () => {
    const stuck = choices({
      catalogPicks: {
        'alchemist-formulas': [
          'bomb-a',
          'bomb-b',
          'elixir-a',
          'elixir-b',
          'elixir-c',
          'antidote',
          'antiplague',
        ],
      },
    })
    const next = hydrateCatalogPrepared(catalogs, stuck, 1, 3)
    assert.ok(next)
    assert.deepEqual(next.catalogPrepared?.['alchemist-formulas'], [
      'bomb-a',
      'bomb-b',
      'elixir-a',
      'elixir-b',
      'elixir-c',
      'antidote',
      'antiplague',
    ])
  })

  test('não sobrescreve infusões já escolhidas', () => {
    const existing = choices({
      catalogPicks: { 'alchemist-formulas': ['bomb-a', 'bomb-b'] },
      catalogPrepared: { 'alchemist-formulas': ['bomb-a'] },
    })
    assert.equal(hydrateCatalogPrepared(catalogs, existing, 1, 3), null)
  })
})

const apparitionCatalog: ClassCatalogDefinition = {
  id: 'animist-apparitions',
  classId: 'class-animist',
  label: 'Aparições sintonizadas',
  description: '',
  kind: 'daily',
  unique: true,
  slotsByLevel: [{ minLevel: 1, count: 2 }],
  primaryPick: {
    label: 'Aparição primária',
    description: 'A do vaso.',
  },
  options: [opt('grove'), opt('vault'), opt('hearth')],
}

describe('toggleCatalogPick — animista', () => {
  test('sintonizar já define a aparição primária', () => {
    let next = choices()
    next = toggleCatalogPick(apparitionCatalog, [apparitionCatalog], next, 'grove', 1)
    assert.deepEqual(next.catalogPrepared?.['animist-apparitions'], ['grove'])
    assert.equal(next.catalogPrimary?.['animist-apparitions'], 'grove')
    next = toggleCatalogPick(apparitionCatalog, [apparitionCatalog], next, 'vault', 1)
    assert.deepEqual(next.catalogPrepared?.['animist-apparitions'], [
      'grove',
      'vault',
    ])
    assert.equal(next.catalogPrimary?.['animist-apparitions'], 'grove')
  })

  test('tirar a primária passa a primária para a outra sintonizada', () => {
    let next = choices()
    next = toggleCatalogPick(apparitionCatalog, [apparitionCatalog], next, 'grove', 1)
    next = toggleCatalogPick(apparitionCatalog, [apparitionCatalog], next, 'vault', 1)
    next = toggleCatalogPick(apparitionCatalog, [apparitionCatalog], next, 'grove', 1)
    assert.deepEqual(next.catalogPrepared?.['animist-apparitions'], ['vault'])
    assert.equal(next.catalogPrimary?.['animist-apparitions'], 'vault')
  })
})

describe('hydrateCatalogPrepared — primária', () => {
  test('aparições já sintonizadas ganham primária se estiver faltando', () => {
    const stuck = choices({
      catalogPrepared: { 'animist-apparitions': ['grove', 'vault'] },
    })
    const next = hydrateCatalogPrepared([apparitionCatalog], stuck, 1)
    assert.ok(next)
    assert.equal(next.catalogPrimary?.['animist-apparitions'], 'grove')
  })
})
