import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { describeTrait, traitOriginalLabel } from './traitGlossaryPt.ts'
import { localizeTraitLabel } from './traitLabelsPt.ts'
import { toEnglishTraitKey } from './traitKey.ts'

describe('toEnglishTraitKey', () => {
  test('mapeia português e hífens para a chave inglesa', () => {
    assert.equal(toEnglishTraitKey('mortal d10'), 'deadly d10')
    assert.equal(toEnglishTraitKey('deadly-2d8'), 'deadly 2d8')
    assert.equal(toEnglishTraitKey('ágil'), 'agile')
    assert.equal(toEnglishTraitKey('alcance 3 m'), 'reach 3 m')
    assert.equal(toEnglishTraitKey('alcance 4,5 m'), 'reach 4,5 m')
    assert.equal(toEnglishTraitKey('incremento de alcance 18 m'), 'range increment 18 m')
    assert.equal(toEnglishTraitKey('incremento 18 m'), 'range increment 18 m')
    assert.equal(toEnglishTraitKey('derrubar à distância'), 'ranged trip')
    assert.equal(toEnglishTraitKey('versátil C'), 'versatile c')
  })
})

describe('describeTrait', () => {
  test('Mortal d10 em português e em inglês descrevem a mesma regra', () => {
    const fromPt = describeTrait('mortal d10')
    const fromEn = describeTrait('deadly d10')
    assert.ok(fromPt)
    assert.equal(fromPt, fromEn)
    assert.match(fromPt!, /d10 extra/)
  })

  test('hífen deadly-2d8 e mortal 2d8 descrevem dados extras', () => {
    const hyphen = describeTrait('deadly-2d8')
    const pt = describeTrait('mortal 2d8')
    assert.ok(hyphen)
    assert.equal(hyphen, pt)
    assert.match(hyphen!, /2d8 extra/)
  })

  test('alcance em metros não passa pelo conversor de pés', () => {
    const text = describeTrait('alcance 3 m')
    assert.ok(text)
    assert.match(text!, /3 m/)
    assert.equal(text, describeTrait('reach 10 feet'))
  })

  test('alcance 4,5 m mantém o decimal brasileiro', () => {
    const text = describeTrait('alcance 4,5 m')
    assert.ok(text)
    assert.match(text!, /4,5 m/)
  })

  test('ágil, acuidade e recarga 0 batem o glossário inglês', () => {
    assert.equal(describeTrait('ágil'), describeTrait('Agile'))
    assert.equal(describeTrait('acuidade'), describeTrait('Finesse'))
    assert.ok(describeTrait('recarga 0'))
    assert.equal(describeTrait('recarga 0'), describeTrait('reload 0'))
  })

  test('versátil C descreve concussão', () => {
    const text = describeTrait('versátil C')
    assert.ok(text)
    assert.match(text!, /concussão/)
  })

  test('rajada 9 m e arremesso 6 m usam metros do seed', () => {
    assert.match(describeTrait('rajada 9 m') ?? '', /9 m/)
    assert.match(describeTrait('arremesso 6 m') ?? '', /6 m/)
  })

  test('capacity-5 descreve o número de cargas', () => {
    const text = describeTrait('capacity-5')
    assert.ok(text)
    assert.match(text!, /5 cargas/)
  })
})

describe('localizeTraitLabel', () => {
  test('capitaliza traços de ataque já em português', () => {
    assert.equal(localizeTraitLabel('mortal d10'), 'Mortal d10')
    assert.equal(localizeTraitLabel('ágil'), 'Ágil')
    assert.equal(localizeTraitLabel('alcance 3 m'), 'Alcance 3 m')
    assert.equal(localizeTraitLabel('deadly d10'), 'Mortal d10')
  })
})

describe('traitOriginalLabel', () => {
  test('mostra o id inglês quando o seed está em português', () => {
    assert.equal(traitOriginalLabel('mortal d10'), 'deadly d10')
    assert.equal(traitOriginalLabel('deadly d10'), 'deadly d10')
  })
})
