import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  TOKEN_FRAMES,
  clampTokenTransform,
  isTokenFrameId,
  lightenHex,
  parseHexRgb,
} from './tokenStudio.ts'

describe('tokenStudio', () => {
  test('molduras têm ids únicos', () => {
    const ids = TOKEN_FRAMES.map((frame) => frame.id)
    assert.equal(new Set(ids).size, ids.length)
    assert.ok(isTokenFrameId('gear'))
    assert.equal(isTokenFrameId('banana'), false)
  })

  test('clamp segura zoom, recorte e deslocamento', () => {
    const clamped = clampTokenTransform({
      zoom: 99,
      offsetX: -400,
      offsetY: 400,
      hole: 0.1,
    })
    assert.equal(clamped.zoom, 3)
    assert.equal(clamped.offsetX, -80)
    assert.equal(clamped.offsetY, 80)
    assert.equal(clamped.hole, 0.52)
  })

  test('parseHexRgb lê #rgb e #rrggbb', () => {
    assert.deepEqual(parseHexRgb('#0f0'), [0, 255, 0])
    assert.deepEqual(parseHexRgb('#c9a227'), [201, 162, 39])
  })

  test('lightenHex clareia a cor', () => {
    const lit = parseHexRgb(lightenHex('#808080', 0.5))
    assert.ok(lit)
    assert.ok(lit[0] > 128)
  })
})
