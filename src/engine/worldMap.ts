/**
 * Geometria pura do mapa de mundo: snap de vértices/arestas (fronteiras
 * sem vãos), utilidades de polígono e posicionamento automático de
 * rótulos de países. Sem DOM — tudo testável em Node.
 */

import type {
  MapVertex,
  WorldCountry,
  WorldMap,
  CountryLabelStyle,
  MapPathStyle,
} from '@/types/world'

export interface Point {
  x: number
  y: number
}

export interface SnapResult {
  x: number
  y: number
  /** Vértice existente reaproveitado (attach perfeito). */
  vertexId: string | null
  /** Aresta existente onde o ponto encostou — deve ser dividida. */
  edge: { a: string; b: string } | null
}

export interface SnapOptions {
  ignoreVertexIds?: ReadonlySet<string>
  /** Vértices extras (ex.: rascunho do país em construção). */
  extraVertices?: ReadonlyArray<MapVertex>
  /** Arestas extras sem país gravado (lados do rascunho). */
  extraEdges?: ReadonlyArray<{ a: MapVertex; b: MapVertex }>
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

/** Projeção de `p` no segmento `ab`, com o parâmetro t (0 = a, 1 = b). */
export function closestPointOnSegment(
  p: Point,
  a: Point,
  b: Point,
): { point: Point; t: number } {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const lengthSq = dx * dx + dy * dy
  if (lengthSq === 0) return { point: { x: a.x, y: a.y }, t: 0 }
  const raw = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSq
  const t = Math.max(0, Math.min(1, raw))
  return { point: { x: a.x + t * dx, y: a.y + t * dy }, t }
}

/** Pares consecutivos do polígono, incluindo o fechamento. */
export function countryEdges(country: WorldCountry): [string, string][] {
  const ids = country.vertexIds
  if (ids.length < 2) return []
  const edges: [string, string][] = []
  for (let i = 0; i < ids.length; i += 1) {
    const a = ids[i]
    const b = ids[(i + 1) % ids.length]
    if (!a || !b || a === b) continue
    if (i === ids.length - 1 && ids.length < 3) break
    edges.push([a, b])
  }
  return edges
}

/**
 * Gruda o ponto no vértice ou na aresta mais próxima dentro do raio.
 * Vértice vence aresta — reaproveitar um vértice é o attach ideal.
 */
export function snapToGeometry(
  point: Point,
  vertices: MapVertex[],
  countries: WorldCountry[],
  threshold: number,
  options?: SnapOptions,
): SnapResult {
  const ignore = options?.ignoreVertexIds
  const pool = options?.extraVertices
    ? [...vertices, ...options.extraVertices]
    : vertices
  let bestVertex: MapVertex | null = null
  let bestVertexDist = threshold
  for (const vertex of pool) {
    if (ignore?.has(vertex.id)) continue
    const dist = distance(point, vertex)
    if (dist <= bestVertexDist) {
      bestVertex = vertex
      bestVertexDist = dist
    }
  }
  if (bestVertex) {
    return {
      x: bestVertex.x,
      y: bestVertex.y,
      vertexId: bestVertex.id,
      edge: null,
    }
  }

  const byId = new Map(pool.map((vertex) => [vertex.id, vertex]))
  let bestEdge: { a: string; b: string } | null = null
  let bestEdgePoint: Point | null = null
  let bestEdgeDist = threshold
  const seen = new Set<string>()
  const pairs: { a: MapVertex; b: MapVertex }[] = []
  for (const country of countries) {
    for (const [idA, idB] of countryEdges(country)) {
      const va = byId.get(idA)
      const vb = byId.get(idB)
      if (va && vb) pairs.push({ a: va, b: vb })
    }
  }
  for (const extra of options?.extraEdges ?? []) {
    pairs.push(extra)
  }
  for (const { a: va, b: vb } of pairs) {
    if (ignore?.has(va.id) || ignore?.has(vb.id)) continue
    const key = va.id < vb.id ? `${va.id}|${vb.id}` : `${vb.id}|${va.id}`
    if (seen.has(key)) continue
    seen.add(key)
    const { point: proj } = closestPointOnSegment(point, va, vb)
    const dist = distance(point, proj)
    if (dist <= bestEdgeDist) {
      bestEdge = { a: va.id, b: vb.id }
      bestEdgePoint = proj
      bestEdgeDist = dist
    }
  }
  if (bestEdge && bestEdgePoint) {
    return {
      x: bestEdgePoint.x,
      y: bestEdgePoint.y,
      vertexId: null,
      edge: bestEdge,
    }
  }

  return { x: point.x, y: point.y, vertexId: null, edge: null }
}

export function extrasFromDraft(
  draft: ReadonlyArray<MapVertex>,
): Pick<SnapOptions, 'extraVertices' | 'extraEdges'> {
  const extraVertices = draft.length >= 3 && draft[0] ? [draft[0]] : []
  const extraEdges: { a: MapVertex; b: MapVertex }[] = []
  for (let i = 0; i < draft.length - 1; i += 1) {
    const a = draft[i]
    const b = draft[i + 1]
    if (a && b) extraEdges.push({ a, b })
  }
  return { extraVertices, extraEdges }
}

/**
 * Snap do traçado de fronteira: ímã em vértices/arestas gravados, nos
 * lados do rascunho, e um raio maior no primeiro ponto para fechar o país.
 */
export function resolveBorderSnap(
  point: Point,
  vertices: MapVertex[],
  countries: WorldCountry[],
  draft: ReadonlyArray<MapVertex>,
  threshold: number,
  closeThreshold: number,
): SnapResult & { close: boolean } {
  const first = draft[0]
  if (wouldCloseDraft(point, draft, closeThreshold) && first) {
    return {
      x: first.x,
      y: first.y,
      vertexId: first.id,
      edge: null,
      close: true,
    }
  }
  const snap = snapToGeometry(
    point,
    vertices,
    countries,
    threshold,
    extrasFromDraft(draft),
  )
  const close = Boolean(
    first && draft.length >= 3 && snap.vertexId === first.id,
  )
  return { ...snap, close }
}

/** O clique fecha o polígono se cair perto do primeiro vértice do rascunho. */
export function wouldCloseDraft(
  point: Point,
  draft: ReadonlyArray<Point>,
  threshold: number,
): boolean {
  if (draft.length < 3) return false
  const first = draft[0]
  return Boolean(first && distance(point, first) <= threshold)
}

/**
 * Tira vértices colados e o último se ele só repete o primeiro —
 * o caso clássico de “fechei o retângulo mas ficou um bolinha a mais”.
 */
export function pruneNearDuplicates<T extends Point>(
  points: T[],
  threshold: number,
): T[] {
  const out: T[] = []
  for (const point of points) {
    const prev = out[out.length - 1]
    if (prev && distance(prev, point) <= threshold) continue
    out.push(point)
  }
  if (out.length >= 4) {
    const first = out[0]
    const last = out[out.length - 1]
    if (first && last && distance(first, last) <= threshold) out.pop()
  }
  return out
}

/**
 * Insere `newVertexId` em toda fronteira que percorre a aresta `a—b`.
 * É o que garante que dividir a aresta de um país divide também a do
 * vizinho que compartilha o mesmo trecho.
 */
export function splitEdgeInCountries(
  countries: WorldCountry[],
  a: string,
  b: string,
  newVertexId: string,
): WorldCountry[] {
  return countries.map((country) => {
    const ids = country.vertexIds
    if (ids.length < 2) return country
    const next: string[] = []
    let changed = false
    for (let i = 0; i < ids.length; i += 1) {
      const current = ids[i]
      if (!current) continue
      next.push(current)
      const following = ids[(i + 1) % ids.length]
      const isLast = i === ids.length - 1
      if (isLast && ids.length < 3) continue
      const matches =
        (current === a && following === b) ||
        (current === b && following === a)
      if (matches && !isLast) {
        next.push(newVertexId)
        changed = true
      } else if (matches && isLast) {
        // Aresta de fechamento: o novo vértice entra no fim da lista.
        next.push(newVertexId)
        changed = true
      }
    }
    return changed ? { ...country, vertexIds: next } : country
  })
}

/** Pontos ordenados do polígono do país (ignora vértices ausentes). */
export function polygonPoints(
  country: WorldCountry,
  vertexById: ReadonlyMap<string, MapVertex>,
): Point[] {
  const points: Point[] = []
  for (const id of country.vertexIds) {
    const vertex = vertexById.get(id)
    if (vertex) points.push({ x: vertex.x, y: vertex.y })
  }
  return points
}

export function polygonArea(points: Point[]): number {
  if (points.length < 3) return 0
  let sum = 0
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i]!
    const b = points[(i + 1) % points.length]!
    sum += a.x * b.y - b.x * a.y
  }
  return Math.abs(sum) / 2
}

export function polygonCentroid(points: Point[]): Point {
  if (points.length === 0) return { x: 0, y: 0 }
  if (points.length < 3) {
    const sx = points.reduce((acc, p) => acc + p.x, 0)
    const sy = points.reduce((acc, p) => acc + p.y, 0)
    return { x: sx / points.length, y: sy / points.length }
  }
  let areaSum = 0
  let cx = 0
  let cy = 0
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i]!
    const b = points[(i + 1) % points.length]!
    const cross = a.x * b.y - b.x * a.y
    areaSum += cross
    cx += (a.x + b.x) * cross
    cy += (a.y + b.y) * cross
  }
  if (Math.abs(areaSum) < 1e-12) {
    const sx = points.reduce((acc, p) => acc + p.x, 0)
    const sy = points.reduce((acc, p) => acc + p.y, 0)
    return { x: sx / points.length, y: sy / points.length }
  }
  return { x: cx / (3 * areaSum), y: cy / (3 * areaSum) }
}

export function pointInPolygon(point: Point, points: Point[]): boolean {
  let inside = false
  for (let i = 0, j = points.length - 1; i < points.length; j = i, i += 1) {
    const a = points[i]!
    const b = points[j]!
    const intersects =
      a.y > point.y !== b.y > point.y &&
      point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x
    if (intersects) inside = !inside
  }
  return inside
}

/** Âncora garantidamente dentro do polígono (centróide, com fallback). */
export function interiorAnchor(points: Point[]): Point {
  const centroid = polygonCentroid(points)
  if (pointInPolygon(centroid, points)) return centroid
  const xs = points.map((p) => p.x)
  const ys = points.map((p) => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  // Varre uma grade dentro do bounding box e fica com o ponto interno
  // mais distante da borda (aproximação barata do polo de inacessibilidade).
  let best: Point | null = null
  let bestScore = -Infinity
  const steps = 12
  for (let ix = 1; ix < steps; ix += 1) {
    for (let iy = 1; iy < steps; iy += 1) {
      const candidate = {
        x: minX + ((maxX - minX) * ix) / steps,
        y: minY + ((maxY - minY) * iy) / steps,
      }
      if (!pointInPolygon(candidate, points)) continue
      let minDist = Infinity
      for (let i = 0; i < points.length; i += 1) {
        const a = points[i]!
        const b = points[(i + 1) % points.length]!
        const { point: proj } = closestPointOnSegment(candidate, a, b)
        minDist = Math.min(minDist, distance(candidate, proj))
      }
      if (minDist > bestScore) {
        bestScore = minDist
        best = candidate
      }
    }
  }
  return best ?? centroid
}

/**
 * Comprimento da corda do polígono passando por `anchor` na direção
 * `angleRad`, e os extremos dela. Em polígonos côncavos usa o trecho
 * contínuo que contém a âncora.
 */
export function chordThrough(
  points: Point[],
  anchor: Point,
  angleRad: number,
): { length: number; start: Point; end: Point } {
  const dir = { x: Math.cos(angleRad), y: Math.sin(angleRad) }
  const params: number[] = []
  for (let i = 0; i < points.length; i += 1) {
    const a = points[i]!
    const b = points[(i + 1) % points.length]!
    const ex = b.x - a.x
    const ey = b.y - a.y
    const denom = dir.x * ey - dir.y * ex
    if (Math.abs(denom) < 1e-12) continue
    // anchor + t*dir = a + s*(b-a)
    const t = ((a.x - anchor.x) * ey - (a.y - anchor.y) * ex) / denom
    const s =
      Math.abs(ex) > Math.abs(ey)
        ? (anchor.x + t * dir.x - a.x) / ex
        : (anchor.y + t * dir.y - a.y) / ey
    if (s >= -1e-9 && s <= 1 + 1e-9) params.push(t)
  }
  params.sort((left, right) => left - right)
  let bestSpan: [number, number] | null = null
  for (let i = 0; i + 1 < params.length; i += 1) {
    const t1 = params[i]!
    const t2 = params[i + 1]!
    if (t2 - t1 < 1e-9) continue
    const mid = (t1 + t2) / 2
    const midPoint = { x: anchor.x + mid * dir.x, y: anchor.y + mid * dir.y }
    if (!pointInPolygon(midPoint, points)) continue
    const containsAnchor = t1 <= 0 && t2 >= 0
    if (containsAnchor) {
      bestSpan = [t1, t2]
      break
    }
    if (!bestSpan || t2 - t1 > bestSpan[1] - bestSpan[0]) {
      bestSpan = [t1, t2]
    }
  }
  if (!bestSpan) return { length: 0, start: anchor, end: anchor }
  const [t1, t2] = bestSpan
  return {
    length: t2 - t1,
    start: { x: anchor.x + t1 * dir.x, y: anchor.y + t1 * dir.y },
    end: { x: anchor.x + t2 * dir.x, y: anchor.y + t2 * dir.y },
  }
}

export interface LabelPlacement {
  /** Centro do rótulo. */
  x: number
  y: number
  /** Rotação em graus (-90..90, texto nunca de cabeça para baixo). */
  angleDeg: number
  fontSize: number
  /** Metade do comprimento útil da corda (para desenhar o caminho). */
  halfLength: number
}

/**
 * Posição automática do nome do país: procura a corda interna mais longa
 * (com leve preferência pela horizontal), centraliza o texto nela e
 * dimensiona a fonte para caber tanto no comprimento quanto na “altura”
 * do polígono naquele ponto.
 */
export function computeCountryLabel(
  points: Point[],
  text: string,
): LabelPlacement {
  const anchor = interiorAnchor(points)
  if (points.length < 3) {
    return { x: anchor.x, y: anchor.y, angleDeg: 0, fontSize: 0, halfLength: 0 }
  }
  const chars = Math.max(3, text.trim().length || 3)
  let best: { angleDeg: number; chord: ReturnType<typeof chordThrough>; score: number } | null =
    null
  for (let angleDeg = -75; angleDeg <= 75; angleDeg += 15) {
    const chord = chordThrough(points, anchor, (angleDeg * Math.PI) / 180)
    // Penaliza levemente rótulos inclinados: entre duas cordas parecidas,
    // vence a mais horizontal (como nos jogos grand strategy).
    const score = chord.length * (1 - Math.abs(angleDeg) / 360)
    if (!best || score > best.score) best = { angleDeg, chord, score }
  }
  if (!best || best.chord.length <= 0) {
    return { x: anchor.x, y: anchor.y, angleDeg: 0, fontSize: 0, halfLength: 0 }
  }
  const { angleDeg, chord } = best
  const center = {
    x: (chord.start.x + chord.end.x) / 2,
    y: (chord.start.y + chord.end.y) / 2,
  }
  const usable = chord.length * 0.72
  // Largura média de letra maiúscula ≈ 0.72 × fontSize (fonte display).
  let fontSize = usable / (chars * 0.72)
  const perpendicular = chordThrough(
    points,
    center,
    ((angleDeg + 90) * Math.PI) / 180,
  )
  if (perpendicular.length > 0) {
    fontSize = Math.min(fontSize, perpendicular.length * 0.5)
  }
  return {
    x: center.x,
    y: center.y,
    angleDeg,
    fontSize,
    halfLength: chord.length * 0.45,
  }
}

export interface LabelDraw {
  x: number
  y: number
  angleDeg: number
  fontSize: number
  path: string
}

/** Caminho SVG do nome do país, já com os ajustes manuais. */
export function labelDrawParams(
  placement: LabelPlacement,
  style: CountryLabelStyle | null,
): LabelDraw {
  const x = placement.x + (style?.dx ?? 0)
  const y = placement.y + (style?.dy ?? 0)
  const angleDeg = placement.angleDeg + (style?.rotation ?? 0)
  const scale = Math.max(0.25, style?.scale ?? 1)
  const curve = style?.curve ?? 0
  const fontSize = placement.fontSize * scale
  const half = Math.max(placement.halfLength, fontSize * 2)
  const rad = (angleDeg * Math.PI) / 180
  const dx = Math.cos(rad) * half
  const dy = Math.sin(rad) * half
  const startX = x - dx
  const startY = y - dy
  const endX = x + dx
  const endY = y + dy
  if (Math.abs(curve) < 0.02) {
    return {
      x,
      y,
      angleDeg,
      fontSize,
      path: `M ${startX} ${startY} L ${endX} ${endY}`,
    }
  }
  const ctrlX = x + -Math.sin(rad) * curve * half * 0.85
  const ctrlY = y + Math.cos(rad) * curve * half * 0.85
  return {
    x,
    y,
    angleDeg,
    fontSize,
    path: `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`,
  }
}

/** Remove vértices que nenhum país usa mais (após excluir fronteiras). */
export function pruneUnusedVertices(map: WorldMap): WorldMap {
  const used = new Set<string>()
  for (const country of map.countries) {
    for (const id of country.vertexIds) used.add(id)
  }
  const vertices = map.vertices.filter((vertex) => used.has(vertex.id))
  if (vertices.length === map.vertices.length) return map
  return { ...map, vertices }
}

/**
 * Remove um vértice de todos os países. Países que ficarem com menos de
 * 3 vértices deixam de ser polígonos e são descartados.
 */
export function removeVertexEverywhere(
  map: WorldMap,
  vertexId: string,
): WorldMap {
  const countries = map.countries
    .map((country) => ({
      ...country,
      vertexIds: country.vertexIds.filter((id) => id !== vertexId),
    }))
    .filter((country) => country.vertexIds.length >= 3)
  return pruneUnusedVertices({
    ...map,
    countries,
    vertices: map.vertices.filter((vertex) => vertex.id !== vertexId),
  })
}

/** Move um vértice — as fronteiras de todos os vizinhos acompanham. */
export function moveVertex(
  map: WorldMap,
  vertexId: string,
  x: number,
  y: number,
): WorldMap {
  return {
    ...map,
    vertices: map.vertices.map((vertex) =>
      vertex.id === vertexId ? { ...vertex, x, y } : vertex,
    ),
  }
}

export function pathDasharray(
  style: MapPathStyle,
  unit: number,
): string | undefined {
  if (style === 'solid' || style === 'rail') return undefined
  if (style === 'dashed') return `${unit * 10} ${unit * 7}`
  if (style === 'dotted') return `${unit * 1.8} ${unit * 5}`
  if (style === 'dashdot') return `${unit * 12} ${unit * 5} ${unit * 2} ${unit * 5}`
  return `${unit * 6} ${unit * 5}`
}

export function pathPolyline(points: Point[]): string {
  return points.map((point) => `${point.x},${point.y}`).join(' ')
}
