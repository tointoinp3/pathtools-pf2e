import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { navItemIsActive } from './sidebarNav.ts'

function loc(pathname: string, search = '') {
  return { pathname, search }
}

describe('navItemIsActive', () => {
  test('catálogo e criar criatura não ligam os dois ao mesmo tempo', () => {
    const catalog = '/bestiario'
    const create = '/bestiario?criar=1'

    assert.equal(navItemIsActive(catalog, loc('/bestiario')), true)
    assert.equal(navItemIsActive(create, loc('/bestiario')), false)

    assert.equal(navItemIsActive(catalog, loc('/bestiario', '?criar=1')), false)
    assert.equal(navItemIsActive(create, loc('/bestiario', '?criar=1')), true)
  })

  test('editar homebrew marca criar criatura, não o catálogo', () => {
    assert.equal(
      navItemIsActive('/bestiario', loc('/bestiario', '?edit=abc')),
      false,
    )
    assert.equal(
      navItemIsActive('/bestiario?criar=1', loc('/bestiario', '?edit=abc')),
      true,
    )
  })

  test('ficha de criatura não deixa criar criatura aceso', () => {
    assert.equal(navItemIsActive('/bestiario?criar=1', loc('/bestiario/wolf')), false)
    assert.equal(navItemIsActive('/bestiario', loc('/bestiario/wolf')), false)
  })

  test('encontros não acendem criar criatura', () => {
    assert.equal(
      navItemIsActive('/bestiario?criar=1', loc('/bestiario/encontros')),
      false,
    )
    assert.equal(
      navItemIsActive('/bestiario/encontros', loc('/bestiario/encontros')),
      true,
    )
    assert.equal(
      navItemIsActive('/bestiario/encontros', loc('/bestiario/encontros/novo')),
      false,
    )
    assert.equal(
      navItemIsActive('/bestiario/encontros/novo', loc('/bestiario/encontros/novo')),
      true,
    )
  })
})
