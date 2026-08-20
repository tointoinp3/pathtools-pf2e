import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  centerMapOnGrid,
  mapContainInGrid,
  parseMapWidthInput,
  scaleMapFromCorner,
  setMapWidthCentered,
  snapMapValue,
} from './combatMap.ts'

describe('mapContainInGrid', () => {
  test('imagem mais larga preenche a largura e centraliza na vertical', () => {
    const map = mapContainInGrid(2, 40, 20)
    assert.equal(map.width, 40)
    assert.equal(map.height, 20)
    assert.equal(map.x, 0)
    assert.equal(map.y, 0)
  })

  test('imagem mais alta preenche a altura e centraliza na horizontal', () => {
    const map = mapContainInGrid(0.5, 10, 10)
    assert.equal(map.height, 10)
    assert.equal(map.width, 5)
    assert.equal(map.x, 2.5)
    assert.equal(map.y, 0)
  })
})

describe('setMapWidthCentered', () => {
  test('mantém o centro ao mudar a largura', () => {
    const map = setMapWidthCentered(
      { x: 0, y: 0, width: 10, height: 5, aspect: 2 },
      20,
    )
    assert.equal(map.width, 20)
    assert.equal(map.height, 10)
    assert.equal(map.x, -5)
    assert.equal(map.y, -2.5)
  })
})

describe('scaleMapFromCorner', () => {
  test('SE aumenta com o canto oposto fixo', () => {
    const map = scaleMapFromCorner(
      { x: 2, y: 2, width: 4, height: 2, aspect: 2 },
      'se',
      10,
      6,
      0.5,
    )
    assert.equal(map.x, 2)
    assert.equal(map.y, 2)
    assert.equal(map.width, 8)
    assert.equal(map.height, 4)
  })

  test('NW move o canto superior esquerdo', () => {
    const start = { x: 4, y: 4, width: 4, height: 2, aspect: 2 }
    const map = scaleMapFromCorner(start, 'nw', 2, 3, 0.5)
    assert.equal(map.x + map.width, 8)
    assert.equal(map.y + map.height, 6)
    assert.ok(map.width > 4)
  })
})

describe('centerMapOnGrid', () => {
  test('centraliza um mapa menor', () => {
    const map = centerMapOnGrid(
      { x: 0, y: 0, width: 4, height: 2, aspect: 2 },
      10,
      10,
    )
    assert.equal(map.x, 3)
    assert.equal(map.y, 4)
  })
})

describe('parseMapWidthInput', () => {
  test('aceita vírgula decimal', () => {
    assert.equal(parseMapWidthInput('24,5'), 24.5)
  })

  test('rejeita texto vazio', () => {
    assert.equal(parseMapWidthInput('  '), null)
  })
})

describe('snapMapValue', () => {
  test('arredonda no passo pedido', () => {
    assert.equal(snapMapValue(10.24, 0.5), 10)
    assert.equal(snapMapValue(10.3, 0.5), 10.5)
  })
})
