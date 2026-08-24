import { useEffect, useMemo, useRef, useState } from 'react'
import type { MapMarker, MapPath, WorldCountry, WorldMap } from '@/types'
import { markerSvgInner } from '@/features/world/markerShapes'
import {
  computeCountryLabel,
  labelDrawParams,
  pathDasharray,
  polygonPoints,
  snapToGeometry,
} from '@/engine/worldMap'
import {
  borderSnapAt,
  useWorldMapStore,
  type DraftVertex,
} from '@/stores/worldMapStore'
import {
  MAP_SCALE_MAX,
  MAP_SCALE_MIN,
  mapShortSide,
  markerPixelSize,
} from '@/features/world/worldRepository'
import { useWorldAssetUrl, useWorldAssetUrls } from '@/features/world/useWorldAssetUrl'

function toPx(map: WorldMap, x: number, y: number): { x: number; y: number } {
  return { x: x * map.imageWidth, y: y * map.imageHeight }
}

function fromPx(map: WorldMap, x: number, y: number): { x: number; y: number } {
  return {
    x: x / Math.max(1, map.imageWidth),
    y: y / Math.max(1, map.imageHeight),
  }
}

function countryPath(map: WorldMap, country: WorldCountry): string {
  const byId = new Map(map.vertices.map((vertex) => [vertex.id, vertex]))
  const points = polygonPoints(country, byId).map((point) =>
    toPx(map, point.x, point.y),
  )
  if (points.length < 2) return ''
  return (
    points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ') + ' Z'
  )
}

export function WorldMapCanvas({
  onFinishCountry,
  onOpenNote,
}: {
  onFinishCountry: () => void
  onOpenNote?: (noteId: string) => void
}) {
  const map = useWorldMapStore((s) => s.current)
  const tool = useWorldMapStore((s) => s.tool)
  const draft = useWorldMapStore((s) => s.draftVertices)
  const selectedMarkerId = useWorldMapStore((s) => s.selectedMarkerId)
  const selectedCountryId = useWorldMapStore((s) => s.selectedCountryId)
  const selectedVertexId = useWorldMapStore((s) => s.selectedVertexId)
  const selectedPathId = useWorldMapStore((s) => s.selectedPathId)
  const pathColor = useWorldMapStore((s) => s.pathColor)
  const pathStyle = useWorldMapStore((s) => s.pathStyle)
  const assetVersion = useWorldMapStore((s) => s.assetVersion)
  const bgUrl = useWorldAssetUrl(map?.imageAssetId ?? null, assetVersion)
  const iconIds = useMemo(() => {
    if (!map) return []
    const ids = new Set<string>()
    for (const marker of map.markers) {
      if (marker.assetId) ids.add(marker.assetId)
    }
    return [...ids]
  }, [map])
  const iconUrls = useWorldAssetUrls(iconIds, assetVersion)

  const viewportRef = useRef<HTMLDivElement>(null)
  const [cam, setCam] = useState({ x: 0, y: 0, scale: 0.35 })
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null)
  const [holdShift, setHoldShift] = useState(false)
  const [holdSpace, setHoldSpace] = useState(false)
  const viewCommand = useWorldMapStore((s) => s.viewCommand)
  const drag = useRef<
    | { kind: 'pan'; x: number; y: number; cx: number; cy: number }
    | { kind: 'marker'; id: string }
    | { kind: 'vertex'; id: string }
    | { kind: 'label'; id: string; ox: number; oy: number }
    | { kind: 'path-point'; pathId: string; index: number }
    | null
  >(null)

  useEffect(() => {
    if (map?.camera) {
      setCam(map.camera)
      return
    }
    if (map) useWorldMapStore.getState().requestFit()
  }, [map?.id])

  useEffect(() => {
    if (!map) return
    const timer = window.setTimeout(() => {
      useWorldMapStore.getState().setCamera(cam.x, cam.y, cam.scale)
    }, 400)
    return () => window.clearTimeout(timer)
  }, [cam, map])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const tag = (event.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (event.code === 'Space') {
        event.preventDefault()
        setHoldSpace(true)
      }
    }
    function onKeyUp(event: KeyboardEvent) {
      if (event.code === 'Space') setHoldSpace(false)
    }
    function clearSpace() {
      setHoldSpace(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clearSpace)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clearSpace)
    }
  }, [])

  useEffect(() => {
    if (!map || !viewCommand || !viewportRef.current) return
    const rect = viewportRef.current.getBoundingClientRect()
    if (viewCommand.type === 'fit') {
      const nextK = Math.min(
        MAP_SCALE_MAX,
        Math.max(
          MAP_SCALE_MIN,
          Math.min(rect.width / map.imageWidth, rect.height / map.imageHeight) *
            0.96,
        ),
      )
      setCam({
        x: (rect.width - map.imageWidth * nextK) / 2,
        y: (rect.height - map.imageHeight * nextK) / 2,
        scale: nextK,
      })
      return
    }
    if (
      viewCommand.type === 'focus' &&
      viewCommand.x !== undefined &&
      viewCommand.y !== undefined
    ) {
      const nextK = Math.min(MAP_SCALE_MAX, Math.max(cam.scale, 0.9))
      setCam({
        x: rect.width / 2 - viewCommand.x * map.imageWidth * nextK,
        y: rect.height / 2 - viewCommand.y * map.imageHeight * nextK,
        scale: nextK,
      })
    }
  }, [viewCommand?.seq])

  if (!map) return null
  const world = map

  function clientToNorm(clientX: number, clientY: number) {
    const rect = viewportRef.current?.getBoundingClientRect()
    if (!rect) return { x: 0, y: 0 }
    const px = (clientX - rect.left - cam.x) / cam.scale
    const py = (clientY - rect.top - cam.y) / cam.scale
    return fromPx(world, px, py)
  }

  function onWheel(event: React.WheelEvent) {
    event.preventDefault()
    const rect = viewportRef.current?.getBoundingClientRect()
    if (!rect) return
    const factor = event.deltaY < 0 ? 1.12 : 1 / 1.12
    const nextK = Math.min(
      MAP_SCALE_MAX,
      Math.max(MAP_SCALE_MIN, cam.scale * factor),
    )
    const cx = event.clientX - rect.left
    const cy = event.clientY - rect.top
    const nx = cx - ((cx - cam.x) * nextK) / cam.scale
    const ny = cy - ((cy - cam.y) * nextK) / cam.scale
    setCam({ x: nx, y: ny, scale: nextK })
  }

  function onPointerDown(event: React.PointerEvent) {
    const pan =
      tool === 'pan' ||
      holdSpace ||
      event.button === 1 ||
      event.buttons === 4 ||
      event.altKey
    if (pan) {
      drag.current = {
        kind: 'pan',
        x: event.clientX,
        y: event.clientY,
        cx: cam.x,
        cy: cam.y,
      }
      event.currentTarget.setPointerCapture(event.pointerId)
      return
    }
    const p = clientToNorm(event.clientX, event.clientY)
    if (tool === 'marker' && event.button === 0) {
      useWorldMapStore.getState().addMarkerAt(p.x, p.y)
      return
    }
    if (tool === 'border' && event.button === 0) {
      if (event.detail > 1) {
        if (draft.length >= 3) onFinishCountry()
        return
      }
      const result = useWorldMapStore
        .getState()
        .clickBorder(p.x, p.y, cam.scale, event.shiftKey)
      if (result === 'close') onFinishCountry()
      return
    }
    if (tool === 'path' && event.button === 0) {
      if (event.detail > 1) {
        if (draft.length >= 2) useWorldMapStore.getState().finishPath()
        return
      }
      useWorldMapStore.getState().clickPath(p.x, p.y, cam.scale, event.shiftKey)
      return
    }
    if (tool === 'select' && event.button === 0) {
      useWorldMapStore.getState().selectMarker(null)
      useWorldMapStore.getState().selectCountry(null)
      useWorldMapStore.getState().selectPath(null)
    }
  }

  function onPointerMove(event: React.PointerEvent) {
    const p = clientToNorm(event.clientX, event.clientY)
    setHover(p)
    setHoldShift(event.shiftKey)
    const active = drag.current
    if (!active) return
    if (active.kind === 'pan') {
      setCam({
        ...cam,
        x: active.cx + (event.clientX - active.x),
        y: active.cy + (event.clientY - active.y),
      })
      return
    }
    if (active.kind === 'marker') {
      useWorldMapStore.getState().mutateQuiet((current) => ({
        ...current,
        markers: current.markers.map((marker) =>
          marker.id === active.id ? { ...marker, ...p } : marker,
        ),
      }))
      return
    }
    if (active.kind === 'vertex') {
      useWorldMapStore.getState().dragVertex(active.id, p.x, p.y, cam.scale)
      return
    }
    if (active.kind === 'label') {
      const country = world.countries.find((entry) => entry.id === active.id)
      if (!country) return
      const byId = new Map(world.vertices.map((v) => [v.id, v]))
      const points = polygonPoints(country, byId)
      const auto = computeCountryLabel(points, country.name)
      useWorldMapStore.getState().mutateQuiet((current) => ({
        ...current,
        countries: current.countries.map((entry) =>
          entry.id === active.id
            ? {
                ...entry,
                label: {
                  dx: p.x - auto.x,
                  dy: p.y - auto.y,
                  rotation: country.label?.rotation ?? 0,
                  scale: country.label?.scale ?? 1,
                  curve: country.label?.curve ?? 0,
                },
              }
            : entry,
        ),
      }))
      return
    }
    if (active.kind === 'path-point') {
      useWorldMapStore
        .getState()
        .dragPathPoint(active.pathId, active.index, p.x, p.y)
    }
  }

  function onPointerUp() {
    const active = drag.current
    drag.current = null
    if (active?.kind === 'vertex') {
      useWorldMapStore.getState().endVertexDrag(active.id, cam.scale)
    }
  }

  const snap =
    tool === 'border' && hover
      ? holdShift
        ? { ...hover, vertexId: null, edge: null, close: false }
        : borderSnapAt(map, draft, hover, cam.scale)
      : tool === 'path' && hover
        ? holdShift
          ? { ...hover, vertexId: null, edge: null, close: false }
          : {
              ...snapToGeometry(
                hover,
                [
                  ...map.vertices,
                  ...map.markers.map((marker) => ({
                    id: `pin:${marker.id}`,
                    x: marker.x,
                    y: marker.y,
                  })),
                ],
                map.countries,
                26 / (Math.max(1, map.imageWidth) * Math.max(0.15, cam.scale)),
                { extraVertices: draft },
              ),
              close: false,
            }
        : null

  const selectedCountry = map.countries.find((c) => c.id === selectedCountryId)
  const vertexById = new Map(map.vertices.map((v) => [v.id, v]))

  return (
    <div
      ref={viewportRef}
      className={`relative h-full min-h-0 flex-1 overflow-hidden bg-surface-0 ${
        tool === 'pan' || holdSpace
          ? 'cursor-grab'
          : tool === 'marker' || tool === 'border' || tool === 'path'
            ? 'cursor-crosshair'
            : 'cursor-default'
      }`}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerLeave={() => {
        setHover(null)
        setHoldShift(false)
      }}
      onDoubleClick={() => {
        if (tool === 'border' && draft.length >= 3) onFinishCountry()
        if (tool === 'path' && draft.length >= 2) {
          useWorldMapStore.getState().finishPath()
        }
      }}
    >
      {tool === 'border' && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 animate-fade-up rounded-full border border-accent/40 bg-surface-1/90 px-3 py-1.5 text-[11px] text-text shadow-panel backdrop-blur-sm">
          {draft.length === 0
            ? 'Clique para o primeiro vértice. O ímã puxa para bolinha ou linha.'
            : draft.length < 3
              ? `${draft.length} pontas · continue. Shift solta o ímã. Backspace desfaz.`
              : snap?.close
                ? 'Solte para fechar o país — o ímã grudou no primeiro ponto.'
                : 'Clique no ponto verde (ou Enter) para virar país. Duplo clique também fecha.'}
        </div>
      )}
      {tool === 'path' && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 animate-fade-up rounded-full border border-accent/40 bg-surface-1/90 px-3 py-1.5 text-[11px] text-text shadow-panel backdrop-blur-sm">
          {draft.length === 0
            ? 'Clique os pontos da rota. Tracejado, pontilhado e estrada ficam na barra.'
            : draft.length < 2
              ? 'Mais um clique para ter um trecho. Backspace desfaz.'
              : `${draft.length} pontos · Enter ou duplo clique grava o caminho.`}
        </div>
      )}
      <div
        style={{
          width: map.imageWidth,
          height: map.imageHeight,
          transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.scale})`,
          transformOrigin: '0 0',
        }}
        className="relative"
      >
        {bgUrl ? (
          <img
            src={bgUrl}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full select-none"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#1a1f2a_25%,transparent_25%),linear-gradient(-45deg,#1a1f2a_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1a1f2a_75%),linear-gradient(-45deg,transparent_75%,#1a1f2a_75%)] bg-[length:48px_48px] bg-[position:0_0,0_24px,24px_-24px,-24px_0] bg-surface-2" />
        )}
        <svg
          className="absolute inset-0"
          width={map.imageWidth}
          height={map.imageHeight}
          viewBox={`0 0 ${map.imageWidth} ${map.imageHeight}`}
        >
          {map.showCountries &&
            map.countries.map((country) => (
              <path
                key={country.id}
                d={countryPath(map, country)}
                className="world-country-fill"
                fill={country.color}
                fillOpacity={country.fillOpacity}
                stroke={
                  country.id === selectedCountryId ? '#fff' : country.color
                }
                strokeWidth={
                  (country.id === selectedCountryId ? 3 : 1.6) / cam.scale
                }
                onPointerDown={(event) => {
                  if (tool !== 'select') return
                  event.stopPropagation()
                  useWorldMapStore.getState().selectCountry(country.id)
                }}
                onDoubleClick={(event) => {
                  event.stopPropagation()
                  if (country.noteId) onOpenNote?.(country.noteId)
                }}
              />
            ))}
          {(map.showPaths ?? true) &&
            (map.paths ?? []).map((path) => (
              <PathStroke
                key={path.id}
                map={map}
                path={path}
                k={cam.scale}
                selected={path.id === selectedPathId}
                tool={tool}
                onSelect={() => useWorldMapStore.getState().selectPath(path.id)}
                onOpenNote={onOpenNote}
                onPointDown={(index, event) => {
                  event.stopPropagation()
                  useWorldMapStore.getState().selectPath(path.id)
                  useWorldMapStore.getState().beginStroke()
                  drag.current = {
                    kind: 'path-point',
                    pathId: path.id,
                    index,
                  }
                }}
              />
            ))}
          {map.showLabels &&
            map.countries.map((country) => {
              if (!country.showLabel || !country.name.trim()) return null
              const points = polygonPoints(country, vertexById)
              if (points.length < 3) return null
              const auto = computeCountryLabel(points, country.name)
              const draw = labelDrawParams(auto, country.label)
              const font = draw.fontSize * map.imageWidth
              if (font < 4) return null
              const pathId = `label-${country.id}`
              const pixelPath = draw.path.replace(
                /([-\d.]+)\s+([-\d.]+)/g,
                (_, x: string, y: string) =>
                  `${Number(x) * map.imageWidth} ${Number(y) * map.imageHeight}`,
              )
              return (
                <g
                  key={`label-${country.id}`}
                  onPointerDown={(event) => {
                    if (tool !== 'select') return
                    event.stopPropagation()
                    useWorldMapStore.getState().selectCountry(country.id)
                    useWorldMapStore.getState().beginStroke()
                    drag.current = { kind: 'label', id: country.id, ox: 0, oy: 0 }
                  }}
                >
                  <path id={pathId} d={pixelPath} fill="none" />
                  <text
                    fill="#f7f1e1"
                    stroke="#1a140c"
                    strokeWidth={Math.max(2, font * 0.08)}
                    paintOrder="stroke"
                    fontSize={font}
                    fontFamily="Cinzel, serif"
                    fontWeight={700}
                    style={{ letterSpacing: '0.08em' }}
                  >
                    <textPath
                      href={`#${pathId}`}
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      {country.name.toUpperCase()}
                    </textPath>
                  </text>
                </g>
              )
            })}
          {draft.length > 0 && (
            <DraftPreview
              map={map}
              draft={draft}
              hover={snap}
              k={cam.scale}
              closing={Boolean(snap?.close) && tool === 'border'}
              asPath={tool === 'path'}
              color={tool === 'path' ? pathColor : '#d4a84b'}
              style={tool === 'path' ? pathStyle : undefined}
            />
          )}
          {draft.map((vertex, index) => (
            <DraftDot
              key={vertex.id}
              map={map}
              vertex={vertex}
              k={cam.scale}
              origin={tool === 'border' && index === 0 && draft.length >= 3}
              pulling={Boolean(snap?.close && index === 0 && tool === 'border')}
              onClose={
                tool === 'border' && index === 0 && draft.length >= 3
                  ? (event) => {
                      event.stopPropagation()
                      onFinishCountry()
                    }
                  : undefined
              }
            />
          ))}
          {snap && (
            <g className="world-snap-ring">
              <circle
                cx={snap.x * map.imageWidth}
                cy={snap.y * map.imageHeight}
                r={(snap.close || snap.vertexId || snap.edge ? 10 : 6) / cam.scale}
                fill={
                  snap.close
                    ? 'rgba(76, 175, 122, 0.28)'
                    : snap.vertexId || snap.edge
                      ? 'rgba(76, 175, 122, 0.18)'
                      : 'none'
                }
                stroke={
                  snap.close || snap.vertexId || snap.edge ? '#4caf7a' : '#d4a84b'
                }
                strokeWidth={2 / cam.scale}
              />
            </g>
          )}
          {tool === 'select' &&
            selectedCountry &&
            selectedCountry.vertexIds.map((vid, index) => {
              const vertex = vertexById.get(vid)
              if (!vertex) return null
              const p = toPx(map, vertex.x, vertex.y)
              return (
                <circle
                  key={vid}
                  cx={p.x}
                  cy={p.y}
                  r={(vid === selectedVertexId ? 7 : 5) / cam.scale}
                  fill={vid === selectedVertexId ? '#fff' : '#d4a84b'}
                  stroke="#111"
                  strokeWidth={1 / cam.scale}
                  onPointerDown={(event) => {
                    event.stopPropagation()
                    useWorldMapStore.getState().selectVertex(vid)
                    useWorldMapStore.getState().beginStroke()
                    drag.current = { kind: 'vertex', id: vid }
                  }}
                  onDoubleClick={(event) => {
                    event.stopPropagation()
                    const b =
                      selectedCountry.vertexIds[
                        (index + 1) % selectedCountry.vertexIds.length
                      ]
                    if (!b) return
                    const vb = vertexById.get(b)
                    if (!vb) return
                    useWorldMapStore.getState().insertVertexOnEdge(
                      selectedCountry.id,
                      index,
                      (vertex.x + vb.x) / 2,
                      (vertex.y + vb.y) / 2,
                    )
                  }}
                />
              )
            })}
          {map.showMarkers &&
            map.markers.map((marker) => (
              <MarkerGlyph
                key={marker.id}
                map={map}
                marker={marker}
                k={cam.scale}
                selected={marker.id === selectedMarkerId}
                iconUrl={marker.assetId ? iconUrls[marker.assetId] : undefined}
                onPointerDown={(event) => {
                  if (tool === 'border' || tool === 'marker') return
                  event.stopPropagation()
                  useWorldMapStore.getState().selectMarker(marker.id)
                  if (tool === 'select') {
                    useWorldMapStore.getState().beginStroke()
                    drag.current = { kind: 'marker', id: marker.id }
                  }
                }}
                onDoubleClick={() => {
                  if (marker.noteId) onOpenNote?.(marker.noteId)
                }}
              />
            ))}
        </svg>
      </div>
    </div>
  )
}

function PathStroke({
  map,
  path,
  k,
  selected,
  tool,
  onSelect,
  onOpenNote,
  onPointDown,
}: {
  map: WorldMap
  path: MapPath
  k: number
  selected: boolean
  tool: string
  onSelect: () => void
  onOpenNote?: (noteId: string) => void
  onPointDown: (index: number, event: React.PointerEvent) => void
}) {
  const pts = path.points.map((point) => toPx(map, point.x, point.y))
  if (pts.length < 2) return null
  const unit = Math.max(0.7 / k, mapShortSide(map) * path.width)
  const dash = pathDasharray(path.style, unit)
  const points = pts.map((point) => `${point.x},${point.y}`).join(' ')
  const mid = pts[Math.floor(pts.length / 2)]!
  return (
    <g>
      {path.style === 'rail' && (
        <polyline
          points={points}
          fill="none"
          stroke={path.color}
          strokeWidth={unit * 2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={selected ? 1 : 0.9}
          onPointerDown={(event) => {
            if (tool !== 'select') return
            event.stopPropagation()
            onSelect()
          }}
          onDoubleClick={(event) => {
            event.stopPropagation()
            if (path.noteId) onOpenNote?.(path.noteId)
          }}
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={path.style === 'rail' ? '#1a140c' : path.color}
        strokeWidth={path.style === 'rail' ? unit * 0.75 : unit}
        strokeDasharray={dash}
        strokeLinecap={
          path.style === 'dotted' || path.style === 'trail' ? 'round' : 'butt'
        }
        strokeLinejoin="round"
        opacity={selected ? 1 : 0.92}
        onPointerDown={(event) => {
          if (tool !== 'select') return
          event.stopPropagation()
          onSelect()
        }}
        onDoubleClick={(event) => {
          event.stopPropagation()
          if (path.noteId) onOpenNote?.(path.noteId)
        }}
      />
      {selected &&
        tool === 'select' &&
        pts.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={6 / k}
            fill="#f7f1e1"
            stroke={path.color}
            strokeWidth={1.4 / k}
            className="cursor-grab"
            onPointerDown={(event) => onPointDown(index, event)}
          />
        ))}
      {path.showLabel && path.name.trim() && (
        <text
          x={mid.x}
          y={mid.y - 10 / k}
          fill={path.color}
          stroke="#1a140c"
          strokeWidth={2.4 / k}
          paintOrder="stroke"
          fontSize={12 / k}
          fontFamily="Cinzel, serif"
          textAnchor="middle"
          style={{ pointerEvents: 'none' }}
        >
          {path.name}
        </text>
      )}
    </g>
  )
}

function DraftPreview({
  map,
  draft,
  hover,
  k,
  closing,
  asPath,
  color,
  style,
}: {
  map: WorldMap
  draft: DraftVertex[]
  hover: { x: number; y: number } | null
  k: number
  closing: boolean
  asPath?: boolean
  color?: string
  style?: string
}) {
  const pts = draft.map((vertex) => toPx(map, vertex.x, vertex.y))
  if (hover && !closing) {
    pts.push(toPx(map, hover.x, hover.y))
  }
  const pointsAttr = pts.map((p) => `${p.x},${p.y}`).join(' ')
  const fillAttr =
    !asPath && pts.length >= 3 ? pts.map((p) => `${p.x},${p.y}`).join(' ') : ''
  const stroke = closing ? '#4caf7a' : color ?? '#d4a84b'
  const unit = 2.2 / k
  const dash =
    asPath && style
      ? pathDasharray(style as import('@/types').MapPathStyle, unit) ??
        `${8 / k} ${6 / k}`
      : `${8 / k} ${6 / k}`
  return (
    <g>
      {fillAttr && (
        <polygon
          points={fillAttr}
          fill={closing ? 'rgba(76, 175, 122, 0.28)' : 'rgba(212, 168, 75, 0.18)'}
          stroke="none"
          className="world-draft-fill"
        />
      )}
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth={2.2 / k}
        strokeDasharray={dash}
        strokeLinejoin="round"
        strokeLinecap="round"
        points={
          closing && pts[0]
            ? `${pointsAttr} ${pts[0].x},${pts[0].y}`
            : pointsAttr
        }
      />
    </g>
  )
}

function DraftDot({
  map,
  vertex,
  k,
  origin,
  pulling,
  onClose,
}: {
  map: WorldMap
  vertex: DraftVertex
  k: number
  origin?: boolean
  pulling?: boolean
  onClose?: (event: React.PointerEvent) => void
}) {
  const p = toPx(map, vertex.x, vertex.y)
  const r = (origin ? 9 : 5.5) / k
  return (
    <g
      onPointerDown={onClose}
      className={origin ? 'cursor-pointer' : undefined}
      style={{ pointerEvents: origin ? 'auto' : 'none' }}
    >
      {origin && (
        <circle
          cx={p.x}
          cy={p.y}
          r={(pulling ? 18 : 14) / k}
          fill="rgba(76, 175, 122, 0.18)"
          stroke="none"
          className="world-close-halo"
        />
      )}
      <circle
        cx={p.x}
        cy={p.y}
        r={r}
        fill={origin ? '#4caf7a' : '#d4a84b'}
        stroke="#111"
        strokeWidth={1.2 / k}
      />
    </g>
  )
}

function MarkerGlyph({
  map,
  marker,
  k,
  selected,
  iconUrl,
  onPointerDown,
  onDoubleClick,
}: {
  map: WorldMap
  marker: MapMarker
  k: number
  selected: boolean
  iconUrl?: string
  onPointerDown: (event: React.PointerEvent) => void
  onDoubleClick?: () => void
}) {
  const p = toPx(map, marker.x, marker.y)
  const size = markerPixelSize(map, marker.size)
  return (
    <g
      transform={`translate(${p.x}, ${p.y})`}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      className="cursor-pointer"
    >
      <circle r={Math.max(size / 2, 8 / k)} fill="transparent" />
      {iconUrl ? (
        <image
          href={iconUrl}
          x={-size / 2}
          y={-size / 2}
          width={size}
          height={size}
        />
      ) : (
        <g
          transform={`translate(${-size / 2}, ${-size / 2}) scale(${size / 24})`}
          fill={marker.color}
          stroke="#111"
          strokeWidth={1.2}
          dangerouslySetInnerHTML={{
            __html: markerSvgInner(marker.shape ?? 'circle'),
          }}
        />
      )}
      {selected && (
        <circle
          r={size * 0.7}
          fill="none"
          stroke="#fff"
          strokeWidth={2 / k}
        />
      )}
      {marker.showLabel && marker.label && (
        <text
          y={size * 0.85}
          textAnchor="middle"
          fill="#f7f1e1"
          stroke="#111"
          strokeWidth={2 / k}
          paintOrder="stroke"
          fontSize={Math.max(8 / k, Math.min(14 / k, size * 0.55))}
        >
          {marker.label}
        </text>
      )}
    </g>
  )
}
