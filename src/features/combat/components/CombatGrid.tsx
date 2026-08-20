import {
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { CombatToken } from '@/types'
import {
  hexToRgba,
  paintKey,
  parsePaintKey,
  parseRgba,
  tokenConditionEffects,
  tokenKind,
} from '@/engine/combat'
import {
  CELL_SIZE_MAX,
  CELL_SIZE_MIN,
} from '@/features/combat/combatRepository'
import { useCombatStore } from '@/stores/combatStore'
import { TokenTileContent } from './TokenTileContent'

export type BoardTool = 'select' | 'brush' | 'eraser' | 'picker'

interface DragState {
  kind: 'move' | 'resize'
  tokenId: string
  pointerId: number
  /** Distância entre o ponteiro e o canto da ficha, em px (só no move). */
  grabX: number
  grabY: number
}

export function CombatGrid({
  tool,
  brushColor,
  brushOpacity,
  onPickColor,
}: {
  tool: BoardTool
  brushColor: string
  brushOpacity: number
  /** Conta-gotas: devolve a cor e a opacidade da célula clicada. */
  onPickColor: (hex: string, alpha: number) => void
}) {
  const session = useCombatStore((s) => s.current)
  const selectedTokenId = useCombatStore((s) => s.selectedTokenId)
  const selectToken = useCombatStore((s) => s.selectToken)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const paintingRef = useRef(false)

  // Ctrl+scroll ajusta o zoom do tabuleiro (precisa de listener não-passivo).
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    function onWheel(event: WheelEvent) {
      if (!event.ctrlKey) return
      event.preventDefault()
      event.stopPropagation()
      const store = useCombatStore.getState()
      const current = store.current
      if (!current) return
      const delta = event.deltaY > 0 ? -4 : 4
      const next = Math.min(
        CELL_SIZE_MAX,
        Math.max(CELL_SIZE_MIN, current.cellSize + delta),
      )
      if (next !== current.cellSize) {
        store.mutateQuiet((s) => ({ ...s, cellSize: next }))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  if (!session) return null
  const cell = session.cellSize
  const painting = tool !== 'select'

  function startMove(event: ReactPointerEvent, token: CombatToken) {
    if (event.button !== 0) return
    const board = boardRef.current
    if (!board) return
    const rect = board.getBoundingClientRect()
    selectToken(token.id)
    useCombatStore.getState().beginStroke()
    dragRef.current = {
      kind: 'move',
      tokenId: token.id,
      pointerId: event.pointerId,
      grabX: event.clientX - rect.left - token.x * cell,
      grabY: event.clientY - rect.top - token.y * cell,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function startResize(event: ReactPointerEvent, token: CombatToken) {
    if (event.button !== 0) return
    event.stopPropagation()
    selectToken(token.id)
    useCombatStore.getState().beginStroke()
    dragRef.current = {
      kind: 'resize',
      tokenId: token.id,
      pointerId: event.pointerId,
      grabX: 0,
      grabY: 0,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function paintAt(event: ReactPointerEvent) {
    const board = boardRef.current
    if (!board) return
    const store = useCombatStore.getState()
    const current = store.current
    if (!current) return
    const rect = board.getBoundingClientRect()
    const x = Math.floor((event.clientX - rect.left) / cell)
    const y = Math.floor((event.clientY - rect.top) / cell)
    if (x < 0 || y < 0 || x >= current.gridCols || y >= current.gridRows)
      return
    const key = paintKey(x, y)
    const paint = current.paint ?? {}
    if (tool === 'eraser') {
      if (!(key in paint)) return
      const next = { ...paint }
      delete next[key]
      store.preview((s) => ({ ...s, paint: next }))
      return
    }
    const color = hexToRgba(brushColor, brushOpacity)
    if (paint[key] === color) return
    store.preview((s) => ({
      ...s,
      paint: { ...(s.paint ?? {}), [key]: color },
    }))
  }

  function handleBoardPointerDown(event: ReactPointerEvent) {
    if (tool === 'picker') {
      if (event.button !== 0) return
      const board = boardRef.current
      const current = useCombatStore.getState().current
      if (!board || !current) return
      const rect = board.getBoundingClientRect()
      const x = Math.floor((event.clientX - rect.left) / cell)
      const y = Math.floor((event.clientY - rect.top) / cell)
      const color = (current.paint ?? {})[paintKey(x, y)]
      if (!color) return
      const parsed = parseRgba(color)
      if (parsed) onPickColor(parsed.hex, parsed.alpha)
      return
    }
    if (painting) {
      if (event.button !== 0) return
      useCombatStore.getState().beginStroke()
      paintingRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      paintAt(event)
      return
    }
    if (event.target === event.currentTarget) selectToken(null)
  }

  function handlePointerMove(event: ReactPointerEvent) {
    if (paintingRef.current) {
      paintAt(event)
      return
    }

    const drag = dragRef.current
    const board = boardRef.current
    if (!drag || !board || drag.pointerId !== event.pointerId) return
    const store = useCombatStore.getState()
    const current = store.current
    if (!current) return
    const token = current.tokens.find((t) => t.id === drag.tokenId)
    if (!token) return

    const rect = board.getBoundingClientRect()

    if (drag.kind === 'move') {
      const x = Math.max(
        0,
        Math.min(
          Math.round((event.clientX - rect.left - drag.grabX) / cell),
          current.gridCols - token.w,
        ),
      )
      const y = Math.max(
        0,
        Math.min(
          Math.round((event.clientY - rect.top - drag.grabY) / cell),
          current.gridRows - token.h,
        ),
      )
      if (x === token.x && y === token.y) return
      store.preview((s) => ({
        ...s,
        tokens: s.tokens.map((t) =>
          t.id === token.id ? { ...t, x, y } : t,
        ),
      }))
      return
    }

    const w = Math.max(
      1,
      Math.min(
        Math.round((event.clientX - rect.left) / cell) - token.x,
        current.gridCols - token.x,
      ),
    )
    const h = Math.max(
      1,
      Math.min(
        Math.round((event.clientY - rect.top) / cell) - token.y,
        current.gridRows - token.y,
      ),
    )
    if (w === token.w && h === token.h) return
    store.preview((s) => ({
      ...s,
      tokens: s.tokens.map((t) => (t.id === token.id ? { ...t, w, h } : t)),
    }))
  }

  function endInteraction(event: ReactPointerEvent) {
    if (paintingRef.current) {
      paintingRef.current = false
      useCombatStore.getState().endStroke()
      return
    }
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    useCombatStore.getState().endStroke()
  }

  return (
    <div ref={wrapperRef} className="h-full overflow-auto p-4">
      <div
        ref={boardRef}
        className={`relative rounded-lg border border-border-strong bg-surface-1 shadow-[0_4px_20px_rgba(0,0,0,0.14)] ${
          painting ? 'cursor-crosshair touch-none' : ''
        }`}
        style={{
          width: session.gridCols * cell + 1,
          height: session.gridRows * cell + 1,
          backgroundImage:
            'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
          backgroundSize: `${cell}px ${cell}px`,
        }}
        onPointerDown={handleBoardPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endInteraction}
        onPointerCancel={endInteraction}
      >
        {/* Células pintadas com o pincel (terreno, áreas de magia…) */}
        {Object.entries(session.paint ?? {}).map(([key, color]) => {
          const pos = parsePaintKey(key)
          if (
            !pos ||
            pos.x < 0 ||
            pos.y < 0 ||
            pos.x >= session.gridCols ||
            pos.y >= session.gridRows
          ) {
            return null
          }
          return (
            <div
              key={key}
              aria-hidden
              className="pointer-events-none absolute"
              style={{
                left: pos.x * cell,
                top: pos.y * cell,
                width: cell + 1,
                height: cell + 1,
                backgroundColor: color,
              }}
            />
          )
        })}

        {session.tokens.length === 0 ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
            <p className="max-w-sm text-center text-sm text-text-dim">
              Tabuleiro vazio. Use “+ Bestiário” para buscar fichas, “+
              Jogadores” para trazer a mesa, “+ Baú” para tesouro no mapa ou
              “Importar encontro” para um combate salvo inteiro.
            </p>
          </div>
        ) : null}

        {session.tokens.map((token) => {
          const selected = token.id === selectedTokenId
          const active = token.id === session.turnTokenId
          const isLoot = tokenKind(token) === 'loot'
          const info = isLoot ? null : tokenConditionEffects(token)
          const acLabel =
            token.ac != null
              ? info && info.acPenalty > 0
                ? ` · CA ${info.effectiveAc} (base ${token.ac})`
                : ` · CA ${token.ac}`
              : ''
          const conditionsLabel =
            !isLoot && token.conditions.length > 0
              ? ` · ${token.conditions.join(', ')}`
              : ''
          return (
            <div
              key={token.id}
              role="button"
              tabIndex={-1}
              aria-label={token.name}
              data-token-id={token.id}
              title={
                isLoot
                  ? `${token.name} — ${token.lootItems?.length ?? 0} itens`
                  : `${token.name} — PV ${token.currentHp}/${token.maxHp}${acLabel}${conditionsLabel}`
              }
              className={`absolute touch-none rounded-md ${
                painting
                  ? 'pointer-events-none'
                  : 'cursor-grab active:cursor-grabbing'
              } ${
                selected
                  ? 'ring-2 ring-info'
                  : active
                    ? 'ring-2 ring-accent'
                    : ''
              }`}
              style={{
                left: token.x * cell,
                top: token.y * cell,
                width: token.w * cell + 1,
                height: token.h * cell + 1,
                zIndex: selected ? 30 : active ? 20 : 10,
              }}
              onPointerDown={(event) => startMove(event, token)}
            >
              <TokenTileContent token={token} cellSize={cell} active={active} />
              {selected && !painting ? (
                <div
                  aria-label="Redimensionar"
                  title="Arraste para mudar o tamanho (células)"
                  className="absolute -bottom-1.5 -right-1.5 z-20 h-3.5 w-3.5 cursor-nwse-resize touch-none rounded-sm border border-surface-1 bg-info"
                  onPointerDown={(event) => startResize(event, token)}
                />
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
