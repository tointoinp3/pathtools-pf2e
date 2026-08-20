import { useRef, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'
import type { CombatMapBackdrop } from '@/types'
import {
  panMap,
  scaleMapFromCorner,
  type MapHandle,
} from '@/engine/combatMap'
import { useCombatStore } from '@/stores/combatStore'

const HANDLES: { id: MapHandle; className: string }[] = [
  { id: 'nw', className: '-left-2.5 -top-2.5 cursor-nwse-resize' },
  { id: 'ne', className: '-right-2.5 -top-2.5 cursor-nesw-resize' },
  { id: 'sw', className: '-left-2.5 -bottom-2.5 cursor-nesw-resize' },
  { id: 'se', className: '-right-2.5 -bottom-2.5 cursor-nwse-resize' },
]

type DragState =
  | { kind: 'pan'; pointerId: number; grabX: number; grabY: number }
  | { kind: 'resize'; pointerId: number; handle: MapHandle }

export function CombatMapLayer({
  boardRef,
  cell,
  map,
  url,
  adjusting,
}: {
  boardRef: RefObject<HTMLDivElement | null>
  cell: number
  map: CombatMapBackdrop
  url: string | null
  adjusting: boolean
}) {
  const dragRef = useRef<DragState | null>(null)

  function pointerCells(event: ReactPointerEvent) {
    const board = boardRef.current
    if (!board) return null
    const rect = board.getBoundingClientRect()
    return {
      x: (event.clientX - rect.left) / cell,
      y: (event.clientY - rect.top) / cell,
    }
  }

  function snapStep(event: ReactPointerEvent) {
    return event.shiftKey ? 0.1 : 0.5
  }

  function startPan(event: ReactPointerEvent) {
    if (event.button !== 0) return
    const point = pointerCells(event)
    const current = useCombatStore.getState().current?.mapBackdrop
    if (!point || !current) return
    event.stopPropagation()
    useCombatStore.getState().beginStroke()
    dragRef.current = {
      kind: 'pan',
      pointerId: event.pointerId,
      grabX: point.x - current.x,
      grabY: point.y - current.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function startResize(event: ReactPointerEvent, handle: MapHandle) {
    if (event.button !== 0) return
    event.stopPropagation()
    useCombatStore.getState().beginStroke()
    dragRef.current = {
      kind: 'resize',
      pointerId: event.pointerId,
      handle,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleMove(event: ReactPointerEvent) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const point = pointerCells(event)
    const store = useCombatStore.getState()
    const current = store.current?.mapBackdrop
    if (!point || !current) return
    const snap = snapStep(event)
    if (drag.kind === 'pan') {
      const next = panMap(
        current,
        point.x - drag.grabX,
        point.y - drag.grabY,
        snap,
      )
      if (next.x === current.x && next.y === current.y) return
      store.preview((session) => ({ ...session, mapBackdrop: next }))
      return
    }
    const next = scaleMapFromCorner(
      current,
      drag.handle,
      point.x,
      point.y,
      snap,
    )
    if (
      next.width === current.width &&
      next.height === current.height &&
      next.x === current.x &&
      next.y === current.y
    ) {
      return
    }
    store.preview((session) => ({ ...session, mapBackdrop: next }))
  }

  function endDrag(event: ReactPointerEvent) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    useCombatStore.getState().endStroke()
  }

  const box = {
    left: map.x * cell,
    top: map.y * cell,
    width: map.width * cell,
    height: map.height * cell,
  }

  return (
    <>
      {url ? (
        <img
          src={url}
          alt=""
          draggable={false}
          className="pointer-events-none absolute z-0 select-none object-fill"
          style={box}
        />
      ) : null}

      {adjusting ? (
        <div
          className="absolute z-40 cursor-move touch-none select-none border-2 border-dashed border-info shadow-[0_0_0_1px_rgba(11,17,32,0.35)]"
          style={box}
          onPointerDown={startPan}
          onPointerMove={handleMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {box.width > 180 && box.height > 72 ? (
            <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-info px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm">
              Arraste o mapa · cantos mudam o tamanho
            </span>
          ) : null}
          {HANDLES.map((handle) => (
            <div
              key={handle.id}
              aria-label={`Redimensionar canto ${handle.id.toUpperCase()}`}
              title="Arraste para o tamanho bater com os quadradinhos"
              className={`absolute z-10 h-5 w-5 rounded-sm border-2 border-white bg-info shadow-[0_1px_4px_rgba(0,0,0,0.45)] ${handle.className}`}
              onPointerDown={(event) => startResize(event, handle.id)}
              onPointerMove={handleMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            />
          ))}
        </div>
      ) : null}
    </>
  )
}
