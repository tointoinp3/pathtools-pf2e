import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { CombatSession, CombatToken } from '@/types/combat'
import {
  advanceTurn,
  applyDamage,
  applyHealing,
  characterToken,
  clampRectToGrid,
  cloneToken,
  decrementFrightened,
  endCombatReset,
  findFreeSpot,
  footprintForSize,
  hexToRgba,
  hpTone,
  initiativeOrder,
  lootToken,
  nextTokenName,
  oppositeFacing,
  paintKey,
  parsePaintKey,
  parseRgba,
  parseTokenConditions,
  rectsOverlap,
  restartCombat,
  rollAllInitiatives,
  rotateFacing,
  startCombat,
  stopCombat,
  tokenConditionEffects,
  tokenKind,
} from './combat.ts'

function token(partial: Partial<CombatToken> = {}): CombatToken {
  return {
    id: partial.id ?? `t-${Math.random().toString(36).slice(2)}`,
    creatureId: null,
    name: 'Ficha',
    variant: 'normal',
    level: null,
    x: 0,
    y: 0,
    w: 1,
    h: 1,
    facing: 'down',
    maxHp: 20,
    currentHp: 20,
    tempHp: 0,
    ac: null,
    initiativeBonus: 0,
    initiative: null,
    actionsUsed: 0,
    reactionUsed: false,
    conditions: [],
    notes: '',
    defeated: false,
    ...partial,
  }
}

function session(
  tokens: CombatToken[],
  partial: Partial<CombatSession> = {},
): CombatSession {
  return {
    id: 'combat-1',
    name: 'Combate',
    round: 1,
    turnTokenId: null,
    gridCols: 10,
    gridRows: 10,
    cellSize: 48,
    tokens,
    notes: '',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...partial,
  }
}

describe('footprintForSize', () => {
  test('tamanhos pequenos ocupam 1×1', () => {
    assert.deepEqual(footprintForSize('tiny'), { w: 1, h: 1 })
    assert.deepEqual(footprintForSize('medium'), { w: 1, h: 1 })
  })

  test('grande 2×2, enorme 3×3, imenso 4×4', () => {
    assert.deepEqual(footprintForSize('large'), { w: 2, h: 2 })
    assert.deepEqual(footprintForSize('huge'), { w: 3, h: 3 })
    assert.deepEqual(footprintForSize('gargantuan'), { w: 4, h: 4 })
  })
})

describe('facing', () => {
  test('gira em sentido horário e volta ao início', () => {
    assert.equal(rotateFacing('up'), 'right')
    assert.equal(rotateFacing('left'), 'up')
    assert.equal(rotateFacing('up', -1), 'left')
  })

  test('costas são o lado oposto da frente', () => {
    assert.equal(oppositeFacing('up'), 'down')
    assert.equal(oppositeFacing('right'), 'left')
  })
})

describe('grid', () => {
  test('rectsOverlap detecta sobreposição e ignora vizinhos', () => {
    assert.ok(rectsOverlap({ x: 0, y: 0, w: 2, h: 2 }, { x: 1, y: 1, w: 2, h: 2 }))
    assert.ok(!rectsOverlap({ x: 0, y: 0, w: 2, h: 2 }, { x: 2, y: 0, w: 1, h: 1 }))
  })

  test('clampRectToGrid segura a ficha dentro do tabuleiro', () => {
    assert.deepEqual(clampRectToGrid({ x: 9, y: 9, w: 2, h: 4 }, 10, 10), {
      x: 8,
      y: 6,
      w: 2,
      h: 4,
    })
  })

  test('clampRectToGrid encolhe fichas maiores que o tabuleiro', () => {
    assert.deepEqual(clampRectToGrid({ x: 0, y: 0, w: 20, h: 2 }, 10, 10), {
      x: 0,
      y: 0,
      w: 10,
      h: 2,
    })
  })

  test('findFreeSpot pula fichas existentes', () => {
    const occupied = [{ x: 0, y: 0, w: 2, h: 2 }]
    assert.deepEqual(findFreeSpot(occupied, 10, 10, 2, 2), { x: 2, y: 0 })
  })

  test('findFreeSpot devolve o canto quando não há espaço', () => {
    const occupied = [{ x: 0, y: 0, w: 4, h: 4 }]
    assert.deepEqual(findFreeSpot(occupied, 4, 4, 2, 2), { x: 0, y: 0 })
  })
})

describe('nextTokenName', () => {
  test('primeira ficha fica sem número', () => {
    assert.equal(nextTokenName('Zumbi', []), 'Zumbi')
  })

  test('repetidas ganham 2, 3…', () => {
    assert.equal(nextTokenName('Zumbi', ['Zumbi']), 'Zumbi 2')
    assert.equal(nextTokenName('Zumbi', ['Zumbi', 'Zumbi 2']), 'Zumbi 3')
  })

  test('copiar "Zumbi 2" gera "Zumbi 3", não "Zumbi 2 2"', () => {
    assert.equal(nextTokenName('Zumbi 2', ['Zumbi', 'Zumbi 2']), 'Zumbi 3')
  })
})

describe('initiativeOrder', () => {
  test('maior iniciativa primeiro; sem valor vai para o fim', () => {
    const a = token({ id: 'a', name: 'A', initiative: 12 })
    const b = token({ id: 'b', name: 'B', initiative: 20 })
    const c = token({ id: 'c', name: 'C', initiative: null })
    assert.deepEqual(
      initiativeOrder([a, c, b]).map((t) => t.id),
      ['b', 'a', 'c'],
    )
  })

  test('empate decide pelo bônus de iniciativa', () => {
    const a = token({ id: 'a', initiative: 15, initiativeBonus: 4 })
    const b = token({ id: 'b', initiative: 15, initiativeBonus: 9 })
    assert.deepEqual(
      initiativeOrder([a, b]).map((t) => t.id),
      ['b', 'a'],
    )
  })
})

describe('advanceTurn', () => {
  const a = token({ id: 'a', name: 'A', initiative: 20 })
  const b = token({ id: 'b', name: 'B', initiative: 10 })

  test('começa pelo topo da ordem', () => {
    const next = advanceTurn(session([a, b]))
    assert.equal(next.turnTokenId, 'a')
    assert.equal(next.round, 1)
  })

  test('avança e fecha a rodada ao voltar para o topo', () => {
    let state = session([a, b], { turnTokenId: 'a' })
    state = advanceTurn(state)
    assert.equal(state.turnTokenId, 'b')
    assert.equal(state.round, 1)
    state = advanceTurn(state)
    assert.equal(state.turnTokenId, 'a')
    assert.equal(state.round, 2)
  })

  test('pula fichas derrotadas e devolve ações à ficha ativa', () => {
    const down = token({ id: 'x', initiative: 30, defeated: true })
    const spent = token({
      id: 'a',
      initiative: 20,
      actionsUsed: 3,
      reactionUsed: true,
    })
    const state = advanceTurn(session([down, spent, b], { turnTokenId: 'b' }))
    assert.equal(state.turnTokenId, 'a')
    const active = state.tokens.find((t) => t.id === 'a')
    assert.equal(active?.actionsUsed, 0)
    assert.equal(active?.reactionUsed, false)
  })

  test('sem fichas vivas, nada muda', () => {
    const down = token({ id: 'x', defeated: true })
    const state = session([down])
    assert.equal(advanceTurn(state), state)
  })
})

describe('dano e cura', () => {
  test('dano consome PV temporário antes do PV', () => {
    const hit = applyDamage(token({ tempHp: 5, currentHp: 20 }), 8)
    assert.equal(hit.tempHp, 0)
    assert.equal(hit.currentHp, 17)
  })

  test('chegar a 0 PV marca como derrotada', () => {
    const hit = applyDamage(token({ currentHp: 3 }), 10)
    assert.equal(hit.currentHp, 0)
    assert.equal(hit.defeated, true)
  })

  test('cura não passa do máximo e reanima quem estava a 0', () => {
    const downed = token({ currentHp: 0, maxHp: 20, defeated: true })
    const healed = applyHealing(downed, 50)
    assert.equal(healed.currentHp, 20)
    assert.equal(healed.defeated, false)
  })

  test('hpTone acompanha a fração de vida', () => {
    assert.equal(hpTone(20, 20), 'ok')
    assert.equal(hpTone(9, 20), 'hurt')
    assert.equal(hpTone(4, 20), 'critical')
    assert.equal(hpTone(0, 20), 'down')
  })
})

describe('cloneToken', () => {
  test('gera id novo e não compartilha condições', () => {
    const original = token({ id: 'a', conditions: ['Agarrado'] })
    const copy = cloneToken(original, { x: 3, y: 4 }, 'Zumbi 2')
    assert.notEqual(copy.id, original.id)
    assert.equal(copy.name, 'Zumbi 2')
    assert.deepEqual({ x: copy.x, y: copy.y }, { x: 3, y: 4 })
    copy.conditions.push('Cego')
    assert.deepEqual(original.conditions, ['Agarrado'])
  })

  test('itens do baú são copiados, não compartilhados', () => {
    const chest = lootToken('Baú', { x: 0, y: 0 })
    chest.lootItems = [{ id: 'i1', name: 'Poção', quantity: 2, taken: false }]
    const copy = cloneToken(chest, { x: 1, y: 1 }, 'Baú 2')
    copy.lootItems?.push({ id: 'i2', name: 'Corda', quantity: 1, taken: false })
    assert.equal(chest.lootItems.length, 1)
    assert.equal(copy.lootItems?.length, 2)
  })
})

describe('tipos de ficha', () => {
  test('tokenKind deriva de creatureId em dados antigos', () => {
    assert.equal(tokenKind({ creatureId: 'zombie' }), 'creature')
    assert.equal(tokenKind({ creatureId: null }), 'custom')
    assert.equal(tokenKind({ kind: 'loot', creatureId: null }), 'loot')
  })

  test('baú não entra na ordem de turnos', () => {
    const chest = { ...lootToken('Baú', { x: 0, y: 0 }), initiative: 30 }
    const zombie = token({ id: 'z', initiative: 5 })
    const state = advanceTurn(session([chest, zombie]))
    assert.equal(state.turnTokenId, 'z')
  })

  test('characterToken congela PV, CA e percepção', () => {
    const pc = characterToken(
      {
        characterId: 'char-1',
        name: 'Valeros',
        level: 5,
        maxHp: 68,
        currentHp: 40,
        ac: 23,
        perception: 11,
        summary: null,
      },
      { x: 2, y: 2 },
    )
    assert.equal(pc.kind, 'character')
    assert.equal(pc.maxHp, 68)
    assert.equal(pc.currentHp, 40)
    assert.equal(pc.ac, 23)
    assert.equal(pc.initiativeBonus, 11)
  })

  test('characterToken sem números resolvidos usa padrões seguros', () => {
    const pc = characterToken(
      {
        characterId: 'char-2',
        name: 'Nova',
        level: null,
        maxHp: null,
        currentHp: null,
        ac: null,
        perception: null,
        summary: null,
      },
      { x: 0, y: 0 },
    )
    assert.equal(pc.maxHp, 20)
    assert.equal(pc.currentHp, 20)
    assert.equal(pc.initiativeBonus, 0)
  })
})

describe('encerrar combate', () => {
  test('zera rodada, turno, iniciativas e ações', () => {
    const a = token({
      id: 'a',
      initiative: 18,
      actionsUsed: 2,
      reactionUsed: true,
    })
    const state = endCombatReset(session([a], { round: 4, turnTokenId: 'a' }))
    assert.equal(state.round, 1)
    assert.equal(state.turnTokenId, null)
    const reset = state.tokens[0]
    assert.equal(reset?.initiative, null)
    assert.equal(reset?.actionsUsed, 0)
    assert.equal(reset?.reactionUsed, false)
  })
})

describe('pintura do grid', () => {
  test('paintKey e parsePaintKey são inversos', () => {
    assert.equal(paintKey(3, 7), '3,7')
    assert.deepEqual(parsePaintKey('3,7'), { x: 3, y: 7 })
    assert.equal(parsePaintKey('lixo'), null)
  })

  test('hexToRgba converte cor e limita opacidade', () => {
    assert.equal(hexToRgba('#ff0000', 0.5), 'rgba(255, 0, 0, 0.5)')
    assert.equal(hexToRgba('#0f0', 2), 'rgba(0, 255, 0, 1)')
    assert.equal(hexToRgba('inválido', 0.3), 'rgba(212, 168, 75, 0.3)')
  })

  test('parseRgba desfaz o hexToRgba (conta-gotas)', () => {
    assert.deepEqual(parseRgba('rgba(212, 168, 75, 0.4)'), {
      hex: '#d4a84b',
      alpha: 0.4,
    })
    assert.deepEqual(parseRgba(hexToRgba('#ff0000', 0.75)), {
      hex: '#ff0000',
      alpha: 0.75,
    })
    assert.equal(parseRgba('azul'), null)
  })
})

describe('condições calculadas', () => {
  test('reconhece nomes em pt com e sem valor; guarda o que não conhece', () => {
    const parsed = parseTokenConditions([
      'Amedrontado 2',
      'desprevenido',
      'Maldição estranha',
    ])
    assert.equal(parsed.instances.length, 2)
    assert.deepEqual(
      parsed.instances.map((i) => [i.conditionId, i.value ?? null]),
      [
        ['frightened', 2],
        ['offGuard', null],
      ],
    )
    assert.deepEqual(parsed.unknown, ['Maldição estranha'])
  })

  test('CA: pior status + desprevenido de circunstância', () => {
    const info = tokenConditionEffects(
      token({ ac: 20, conditions: ['Amedrontado 2', 'Enjoado 1', 'Caído'] }),
    )
    // status −2 (pior entre amedrontado 2 e enjoado 1) + circunstância −2
    assert.equal(info.acPenalty, 4)
    assert.equal(info.effectiveAc, 16)
  })

  test('Lentificado e Atordoado tiram ações; Acelerado dá uma extra', () => {
    const slowed = tokenConditionEffects(
      token({ conditions: ['Lentificado 1'] }),
    )
    assert.equal(slowed.actionLoss, 1)
    assert.equal(slowed.maxActions, 2)
    const quick = tokenConditionEffects(token({ conditions: ['Acelerado'] }))
    assert.equal(quick.maxActions, 4)
  })

  test('Drenado reduz PV máximo efetivo pelo nível', () => {
    const info = tokenConditionEffects(
      token({ maxHp: 50, level: 5, conditions: ['Drenado 2'] }),
    )
    assert.equal(info.hpMaxPenalty, 10)
    assert.equal(info.effectiveMaxHp, 40)
  })

  test('penalidade de percepção entra no bônus de iniciativa', () => {
    const info = tokenConditionEffects(
      token({ initiativeBonus: 7, conditions: ['Enjoado 2'] }),
    )
    assert.equal(info.initiativePenalty, 2)
    assert.equal(info.effectiveInitiativeBonus, 5)
  })

  test('amedrontado cai 1 no fim do turno e some no zero', () => {
    assert.deepEqual(decrementFrightened(['Amedrontado 3', 'Caído']), [
      'Amedrontado 2',
      'Caído',
    ])
    assert.deepEqual(decrementFrightened(['Amedrontado 1']), [])
    const untouched = ['Caído']
    assert.equal(decrementFrightened(untouched), untouched)
  })

  test('advanceTurn desconta ações do Lentificado e reduz Amedrontado de quem terminou', () => {
    const a = token({
      id: 'a',
      initiative: 20,
      conditions: ['Amedrontado 2'],
    })
    const b = token({ id: 'b', initiative: 10, conditions: ['Lentificado 1'] })
    const afterFirst = advanceTurn(session([a, b], { turnTokenId: 'a' }))
    assert.equal(afterFirst.turnTokenId, 'b')
    const endedTurn = afterFirst.tokens.find((t) => t.id === 'a')
    assert.deepEqual(endedTurn?.conditions, ['Amedrontado 1'])
    const nowActive = afterFirst.tokens.find((t) => t.id === 'b')
    assert.equal(nowActive?.actionsUsed, 1)
  })
})

describe('fluxo do combate', () => {
  test('startCombat rola quem falta e entra na ordem sozinho', () => {
    const a = token({ id: 'a', initiative: 15 })
    const b = token({ id: 'b', initiative: null, initiativeBonus: 0 })
    const state = startCombat(session([a, b]))
    assert.notEqual(state.turnTokenId, null)
    assert.equal(state.round, 1)
    const rolled = state.tokens.find((t) => t.id === 'b')
    assert.ok(rolled?.initiative != null)
    assert.equal(state.tokens.find((t) => t.id === 'a')?.initiative, 15)
  })

  test('stopCombat volta para antes da rodada 1 mantendo iniciativas', () => {
    const a = token({ id: 'a', initiative: 18, actionsUsed: 2 })
    const state = stopCombat(session([a], { round: 5, turnTokenId: 'a' }))
    assert.equal(state.round, 1)
    assert.equal(state.turnTokenId, null)
    assert.equal(state.tokens[0]?.initiative, 18)
    assert.equal(state.tokens[0]?.actionsUsed, 0)
  })

  test('restartCombat recomeça na rodada 1 com o primeiro da ordem', () => {
    const a = token({ id: 'a', initiative: 18 })
    const b = token({ id: 'b', initiative: 5 })
    const state = restartCombat(session([a, b], { round: 4, turnTokenId: 'b' }))
    assert.equal(state.round, 1)
    assert.equal(state.turnTokenId, 'a')
  })

  test('rollAllInitiatives respeita onlyMissing e pula baús', () => {
    const a = token({ id: 'a', initiative: 12 })
    const b = token({ id: 'b', initiative: null })
    const chest = lootToken('Baú', { x: 0, y: 0 })
    const missing = rollAllInitiatives(session([a, b, chest]), {
      onlyMissing: true,
    })
    assert.equal(missing.tokens.find((t) => t.id === 'a')?.initiative, 12)
    assert.ok(missing.tokens.find((t) => t.id === 'b')?.initiative != null)
    assert.equal(
      missing.tokens.find((t) => tokenKind(t) === 'loot')?.initiative,
      null,
    )
    const all = rollAllInitiatives(session([a]))
    assert.ok(all.tokens[0]?.initiative != null)
  })
})
