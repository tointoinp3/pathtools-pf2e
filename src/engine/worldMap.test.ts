import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  chordThrough,
  closestPointOnSegment,
  computeCountryLabel,
  countryEdges,
  interiorAnchor,
  moveVertex,
  pointInPolygon,
  polygonArea,
  polygonCentroid,
  pruneNearDuplicates,
  pruneUnusedVertices,
  removeVertexEverywhere,
  resolveBorderSnap,
  snapToGeometry,
  splitEdgeInCountries,
  wouldCloseDraft,
  pathDasharray,
} from './worldMap.ts'
import type { MapVertex, WorldCountry, WorldMap } from '@/types/world'

function vertex(id: string, x: number, y: number): MapVertex {
  return { id, x, y }
}

function country(
  id: string,
  vertexIds: string[],
  partial?: Partial<WorldCountry>,
): WorldCountry {
  return {
    id,
    name: id,
    color: '#888888',
    vertexIds,
    fillOpacity: 0.35,
    showLabel: true,
    label: null,
    noteId: null,
    ...partial,
  }
}

function worldMap(
  vertices: MapVertex[],
  countries: WorldCountry[],
): WorldMap {
  return {
    id: 'map-1',
    name: 'Teste',
    imageAssetId: null,
    imageWidth: 100,
    imageHeight: 100,
    markers: [],
    vertices,
    countries,
    paths: [],
    legend: [],
    camera: null,
    showMarkers: true,
    showCountries: true,
    showLabels: true,
    showPaths: true,
    iconScale: 1,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }
}

describe('closestPointOnSegment', () => {
  test('projeta dentro do segmento', () => {
    const { point, t } = closestPointOnSegment(
      { x: 5, y: 3 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    )
    assert.equal(point.x, 5)
    assert.equal(point.y, 0)
    assert.equal(t, 0.5)
  })

  test('gruda no extremo quando o ponto passa da ponta', () => {
    const { point, t } = closestPointOnSegment(
      { x: 15, y: 2 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    )
    assert.equal(point.x, 10)
    assert.equal(t, 1)
  })
})

describe('snapToGeometry', () => {
  const vertices = [vertex('a', 0, 0), vertex('b', 10, 0), vertex('c', 5, 8)]
  const countries = [country('c1', ['a', 'b', 'c'])]

  test('gruda no vértice mais próximo dentro do raio', () => {
    const snap = snapToGeometry({ x: 0.5, y: 0.5 }, vertices, countries, 1)
    assert.equal(snap.vertexId, 'a')
    assert.equal(snap.x, 0)
    assert.equal(snap.y, 0)
    assert.equal(snap.edge, null)
  })

  test('gruda na aresta quando não há vértice perto', () => {
    const snap = snapToGeometry({ x: 5, y: 0.4 }, vertices, countries, 1)
    assert.equal(snap.vertexId, null)
    assert.deepEqual(snap.edge, { a: 'a', b: 'b' })
    assert.equal(snap.x, 5)
    assert.equal(snap.y, 0)
  })

  test('vértice vence aresta quando os dois estão no raio', () => {
    const snap = snapToGeometry({ x: 0.8, y: 0.3 }, vertices, countries, 2)
    assert.equal(snap.vertexId, 'a')
  })

  test('fora do raio devolve o ponto original', () => {
    const snap = snapToGeometry({ x: 50, y: 50 }, vertices, countries, 1)
    assert.equal(snap.vertexId, null)
    assert.equal(snap.edge, null)
    assert.equal(snap.x, 50)
  })

  test('ignora vértices marcados (ex.: o que está sendo arrastado)', () => {
    const snap = snapToGeometry(
      { x: 0.5, y: 0.5 },
      vertices,
      countries,
      1,
      { ignoreVertexIds: new Set(['a']) },
    )
    assert.equal(snap.vertexId, null)
  })

  test('gruda em vértice extra do rascunho', () => {
    const snap = snapToGeometry(
      { x: 20.2, y: 20.1 },
      vertices,
      countries,
      1,
      { extraVertices: [vertex('draft', 20, 20)] },
    )
    assert.equal(snap.vertexId, 'draft')
    assert.equal(snap.x, 20)
    assert.equal(snap.y, 20)
  })

  test('gruda em aresta extra do rascunho', () => {
    const snap = snapToGeometry(
      { x: 5, y: 0.3 },
      [],
      [],
      1,
      {
        extraEdges: [
          { a: vertex('p', 0, 0), b: vertex('q', 10, 0) },
        ],
      },
    )
    assert.deepEqual(snap.edge, { a: 'p', b: 'q' })
    assert.equal(snap.y, 0)
  })
})

describe('fecho do rascunho de país', () => {
  test('wouldCloseDraft exige 3+ pontos e proximidade do primeiro', () => {
    const draft = [
      vertex('a', 0, 0),
      vertex('b', 10, 0),
      vertex('c', 10, 10),
    ]
    assert.equal(wouldCloseDraft({ x: 0.2, y: 0.2 }, draft, 1), true)
    assert.equal(wouldCloseDraft({ x: 5, y: 5 }, draft, 1), false)
    assert.equal(
      wouldCloseDraft({ x: 0.2, y: 0.2 }, draft.slice(0, 2), 1),
      false,
    )
  })

  test('resolveBorderSnap puxa para o primeiro vértice e marca close', () => {
    const draft = [
      vertex('a', 0, 0),
      vertex('b', 10, 0),
      vertex('c', 10, 10),
      vertex('d', 0, 10),
    ]
    const snap = resolveBorderSnap(
      { x: 0.4, y: 0.3 },
      [],
      [],
      draft,
      0.2,
      1,
    )
    assert.equal(snap.close, true)
    assert.equal(snap.x, 0)
    assert.equal(snap.y, 0)
    assert.equal(snap.vertexId, 'a')
  })

  test('pruneNearDuplicates tira o bolinha extra que quase fecha o retângulo', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 8 },
      { x: 0, y: 8 },
      { x: 0.2, y: 0.1 },
    ]
    const cleaned = pruneNearDuplicates(points, 0.5)
    assert.equal(cleaned.length, 4)
    assert.equal(cleaned[0]?.x, 0)
    assert.equal(cleaned.at(-1)?.y, 8)
  })
})

describe('splitEdgeInCountries', () => {
  test('insere o novo vértice em todos os países que usam a aresta', () => {
    const left = country('left', ['a', 'b', 'c'])
    const right = country('right', ['b', 'a', 'd'])
    const result = splitEdgeInCountries([left, right], 'a', 'b', 'novo')
    assert.deepEqual(result[0]?.vertexIds, ['a', 'novo', 'b', 'c'])
    assert.deepEqual(result[1]?.vertexIds, ['b', 'novo', 'a', 'd'])
  })

  test('divide também a aresta de fechamento do polígono', () => {
    const only = country('only', ['a', 'b', 'c'])
    const result = splitEdgeInCountries([only], 'c', 'a', 'novo')
    assert.deepEqual(result[0]?.vertexIds, ['a', 'b', 'c', 'novo'])
  })

  test('não mexe em países sem a aresta', () => {
    const other = country('other', ['x', 'y', 'z'])
    const result = splitEdgeInCountries([other], 'a', 'b', 'novo')
    assert.equal(result[0], other)
  })
})

describe('polígonos', () => {
  const square = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
  ]

  test('área e centróide do quadrado', () => {
    assert.equal(polygonArea(square), 100)
    const centroid = polygonCentroid(square)
    assert.equal(centroid.x, 5)
    assert.equal(centroid.y, 5)
  })

  test('ponto dentro e fora', () => {
    assert.equal(pointInPolygon({ x: 5, y: 5 }, square), true)
    assert.equal(pointInPolygon({ x: 15, y: 5 }, square), false)
  })

  test('âncora interna cai dentro mesmo em polígono côncavo (formato C)', () => {
    const cShape = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 8 },
      { x: 10, y: 8 },
      { x: 10, y: 10 },
      { x: 0, y: 10 },
    ]
    const anchor = interiorAnchor(cShape)
    assert.equal(pointInPolygon(anchor, cShape), true)
  })

  test('corda horizontal do quadrado mede o lado inteiro', () => {
    const chord = chordThrough(square, { x: 5, y: 5 }, 0)
    assert.ok(Math.abs(chord.length - 10) < 1e-6)
    assert.ok(Math.abs(chord.start.x - 0) < 1e-6)
    assert.ok(Math.abs(chord.end.x - 10) < 1e-6)
  })

  test('countryEdges fecha o polígono', () => {
    const edges = countryEdges(country('c', ['a', 'b', 'c']))
    assert.deepEqual(edges, [
      ['a', 'b'],
      ['b', 'c'],
      ['c', 'a'],
    ])
  })
})

describe('computeCountryLabel', () => {
  test('retângulo largo gera rótulo horizontal centrado', () => {
    const wide = [
      { x: 0, y: 0 },
      { x: 40, y: 0 },
      { x: 40, y: 10 },
      { x: 0, y: 10 },
    ]
    const label = computeCountryLabel(wide, 'Reino')
    assert.equal(label.angleDeg, 0)
    assert.ok(Math.abs(label.x - 20) < 1e-6)
    assert.ok(Math.abs(label.y - 5) < 1e-6)
    assert.ok(label.fontSize > 0)
    // A fonte cabe na altura do retângulo.
    assert.ok(label.fontSize <= 5)
  })

  test('retângulo alto inclina o rótulo', () => {
    const tall = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 10, y: 40 },
      { x: 0, y: 40 },
    ]
    const label = computeCountryLabel(tall, 'Império')
    assert.ok(Math.abs(label.angleDeg) >= 60)
  })
})

describe('mutações do mapa', () => {
  test('moveVertex arrasta a fronteira dos dois países vizinhos', () => {
    const map = worldMap(
      [vertex('a', 0, 0), vertex('b', 10, 0), vertex('c', 5, 8), vertex('d', 5, -8)],
      [country('norte', ['a', 'b', 'c']), country('sul', ['b', 'a', 'd'])],
    )
    const moved = moveVertex(map, 'a', 1, 1)
    const a = moved.vertices.find((v) => v.id === 'a')
    assert.equal(a?.x, 1)
    assert.equal(a?.y, 1)
    // Os dois países continuam apontando para o mesmo vértice.
    assert.ok(moved.countries.every((c) => c.vertexIds.includes('a')))
  })

  test('removeVertexEverywhere descarta países degenerados e vértices órfãos', () => {
    const map = worldMap(
      [vertex('a', 0, 0), vertex('b', 10, 0), vertex('c', 5, 8)],
      [country('tri', ['a', 'b', 'c'])],
    )
    const result = removeVertexEverywhere(map, 'c')
    assert.equal(result.countries.length, 0)
    assert.equal(result.vertices.length, 0)
  })

  test('pruneUnusedVertices preserva vértices compartilhados em uso', () => {
    const map = worldMap(
      [vertex('a', 0, 0), vertex('b', 10, 0), vertex('c', 5, 8), vertex('orfao', 99, 99)],
      [country('tri', ['a', 'b', 'c'])],
    )
    const result = pruneUnusedVertices(map)
    assert.deepEqual(
      result.vertices.map((v) => v.id),
      ['a', 'b', 'c'],
    )
  })
})

describe('estilos de caminho', () => {
  test('sólido e estrada não usam dash', () => {
    assert.equal(pathDasharray('solid', 2), undefined)
    assert.equal(pathDasharray('rail', 2), undefined)
  })

  test('tracejado, pontilhado e trilha devolvem intervalos', () => {
    assert.ok(pathDasharray('dashed', 2))
    assert.ok(pathDasharray('dotted', 2))
    assert.ok(pathDasharray('dashdot', 2))
    assert.ok(pathDasharray('trail', 2))
  })
})
