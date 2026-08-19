import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { titleFromHref } from './tabTitle.ts'

describe('titleFromHref', () => {
  test('usa o nome da seção nas rotas conhecidas', () => {
    assert.equal(titleFromHref('/personagens'), 'Personagens')
    assert.equal(titleFromHref('/compendio/arquetipos'), 'Arquétipos')
    assert.equal(titleFromHref('/saques/mesa'), 'Inventário da mesa')
    assert.equal(titleFromHref('/bestiario/encontros'), 'Encontros')
    assert.equal(titleFromHref('/bestiario?criar=1'), 'Criar criatura')
  })

  test('fichas salvas ficam com rótulo genérico até a página informar o nome', () => {
    assert.equal(titleFromHref('/personagens/abc'), 'Personagem')
    assert.equal(titleFromHref('/saques/abc'), 'Saque')
    assert.equal(titleFromHref('/bestiario/encontros/abc'), 'Encontro')
  })
})
