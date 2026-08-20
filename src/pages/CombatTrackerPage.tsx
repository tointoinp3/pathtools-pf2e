import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import {
  clampRectToGrid,
  findFreeSpot,
  lootToken,
  nextTokenName,
  parseRgba,
  rotateFacing,
} from '@/engine/combat'
import { nudgeMap } from '@/engine/combatMap'
import {
  CELL_SIZE_MAX,
  CELL_SIZE_MIN,
  GRID_MAX,
  GRID_MIN,
  listCombatSessions,
} from '@/features/combat/combatRepository'
import {
  CombatGrid,
  type BoardTool,
} from '@/features/combat/components/CombatGrid'
import {
  CombatMapAdjustBar,
  CombatMapButtons,
} from '@/features/combat/components/CombatMapControls'
import { InitiativePanel } from '@/features/combat/components/InitiativePanel'
import { TokenDetailsPanel } from '@/features/combat/components/TokenDetailsPanel'
import { AddCreatureDialog } from '@/features/combat/components/AddCreatureDialog'
import { AddCharacterDialog } from '@/features/combat/components/AddCharacterDialog'
import { ImportEncounterDialog } from '@/features/combat/components/ImportEncounterDialog'
import { runCombatExportOne } from '@/features/backup/combatBackup'
import { useCombatStore } from '@/stores/combatStore'

/**
 * Campo numérico do tamanho do grid. Aplica na hora quando o valor é
 * válido (setinhas do campo funcionam) e normaliza no blur.
 */
function GridSizeField({
  value,
  onCommit,
  ariaLabel,
}: {
  value: number
  onCommit: (next: number) => void
  ariaLabel: string
}) {
  const [text, setText] = useState(String(value))
  useEffect(() => {
    setText(String(value))
  }, [value])

  return (
    <Input
      type="number"
      aria-label={ariaLabel}
      className="w-16 text-center"
      min={GRID_MIN}
      max={GRID_MAX}
      value={text}
      onChange={(event) => {
        const raw = event.target.value
        setText(raw)
        const parsed = Math.round(Number(raw))
        if (
          Number.isFinite(parsed) &&
          parsed >= GRID_MIN &&
          parsed <= GRID_MAX &&
          parsed !== value
        ) {
          onCommit(parsed)
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') event.currentTarget.blur()
      }}
      onBlur={() => {
        const parsed = Math.round(Number(text))
        if (!Number.isFinite(parsed)) {
          setText(String(value))
          return
        }
        const clamped = Math.max(GRID_MIN, Math.min(GRID_MAX, parsed))
        setText(String(clamped))
        if (clamped !== value) onCommit(clamped)
      }}
    />
  )
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  if (target.isContentEditable) return true
  const tag = target.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

const TOOL_OPTIONS: { id: BoardTool; label: string; hint: string }[] = [
  { id: 'select', label: 'Selecionar', hint: 'Mover e editar fichas (V)' },
  { id: 'brush', label: 'Pincel', hint: 'Pintar células do grid (B)' },
  { id: 'eraser', label: 'Borracha', hint: 'Apagar pintura (E)' },
  {
    id: 'picker',
    label: 'Conta-gotas',
    hint: 'Pegar a cor de uma célula pintada (I)',
  },
]

export function CombatTrackerPage() {
  const { id } = useParams<{ id: string }>()
  const session = useCombatStore((s) => s.current)
  const loading = useCombatStore((s) => s.loading)
  const canUndo = useCombatStore((s) => s.past.length > 0)
  const canRedo = useCombatStore((s) => s.future.length > 0)
  const [notFound, setNotFound] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [showPlayers, setShowPlayers] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [tool, setTool] = useState<BoardTool>('select')
  const [brushColor, setBrushColor] = useState('#d4a84b')
  const [brushOpacity, setBrushOpacity] = useState(0.4)
  const [adjustingMap, setAdjustingMap] = useState(false)
  const toolRef = useRef(tool)
  toolRef.current = tool
  const adjustingMapRef = useRef(adjustingMap)
  adjustingMapRef.current = adjustingMap

  useEffect(() => {
    if (!id) return
    setNotFound(false)
    setAdjustingMap(false)
    let cancelled = false
    void (async () => {
      const store = useCombatStore.getState()
      if (id === 'grid') {
        // Atalho da sidebar: abre o combate mais recente (ou cria o 1º).
        const sessions = await listCombatSessions()
        if (cancelled) return
        const latest = sessions[0]
        if (latest) await store.loadOne(latest.id)
        else await store.createNew()
        return
      }
      const loaded = await store.loadOne(id)
      if (!cancelled && !loaded) setNotFound(true)
    })()
    return () => {
      cancelled = true
      void useCombatStore.getState().flushSave()
    }
  }, [id])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (isEditableTarget(event.target)) return
      const store = useCombatStore.getState()
      if (!store.current) return
      const mod = event.ctrlKey || event.metaKey
      const key = event.key.toLowerCase()

      if (mod && key === 'z' && !event.shiftKey) {
        event.preventDefault()
        store.undo()
        return
      }
      if ((mod && key === 'y') || (mod && event.shiftKey && key === 'z')) {
        event.preventDefault()
        store.redo()
        return
      }
      if (mod && key === 'c') {
        store.copySelected()
        return
      }
      if (mod && key === 'v') {
        store.paste()
        return
      }
      if (mod && key === 'd') {
        event.preventDefault()
        if (store.selectedTokenId) store.duplicateToken(store.selectedTokenId)
        return
      }

      if (adjustingMapRef.current) {
        if (event.key === 'Escape') {
          event.preventDefault()
          setAdjustingMap(false)
          return
        }
        const mapMove: Record<string, { dx: number; dy: number }> = {
          ArrowUp: { dx: 0, dy: -1 },
          ArrowDown: { dx: 0, dy: 1 },
          ArrowLeft: { dx: -1, dy: 0 },
          ArrowRight: { dx: 1, dy: 0 },
        }
        const nudge = mapMove[event.key]
        if (nudge && !mod) {
          event.preventDefault()
          const step = event.shiftKey ? 0.1 : 0.5
          store.mutate((s) =>
            s.mapBackdrop
              ? {
                  ...s,
                  mapBackdrop: nudgeMap(
                    s.mapBackdrop,
                    nudge.dx * step,
                    nudge.dy * step,
                  ),
                }
              : s,
          )
        }
        return
      }

      if (!mod && key === 'v') {
        setTool('select')
        return
      }
      if (!mod && key === 'b') {
        setTool('brush')
        return
      }
      if (!mod && key === 'e') {
        setTool('eraser')
        return
      }
      if (!mod && key === 'i') {
        setTool('picker')
        return
      }
      if (event.key === 'Escape') {
        if (toolRef.current !== 'select') setTool('select')
        else store.selectToken(null)
        return
      }

      const tokenId = store.selectedTokenId
      if (!tokenId) return
      const token = store.current.tokens.find((t) => t.id === tokenId)
      if (!token) return

      if (event.key === 'Delete' || event.key === 'Backspace') {
        event.preventDefault()
        store.removeToken(tokenId)
        return
      }
      if (key === 'r') {
        store.updateToken(tokenId, { facing: rotateFacing(token.facing) })
        return
      }
      const arrows: Record<string, { dx: number; dy: number }> = {
        ArrowUp: { dx: 0, dy: -1 },
        ArrowDown: { dx: 0, dy: 1 },
        ArrowLeft: { dx: -1, dy: 0 },
        ArrowRight: { dx: 1, dy: 0 },
      }
      const move = arrows[event.key]
      if (move) {
        event.preventDefault()
        store.updateToken(tokenId, {
          x: token.x + move.dx,
          y: token.y + move.dy,
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (notFound) {
    return (
      <div className="mx-auto max-w-xl p-8 text-center">
        <p className="text-sm text-text-muted">Combate não encontrado.</p>
        <Link
          to="/combate"
          className="mt-3 inline-block text-sm font-medium text-info hover:underline"
        >
          Voltar aos combates
        </Link>
      </div>
    )
  }

  if (!session || (id !== 'grid' && session.id !== id)) {
    return (
      <div className="p-4 text-sm text-text-muted">
        {loading ? 'Carregando combate…' : 'Abrindo…'}
      </div>
    )
  }

  const store = useCombatStore.getState()
  const hasPaint = Object.keys(session.paint ?? {}).length > 0

  /** Cores distintas já pintadas no grid, para reaproveitar com um clique. */
  const usedColorMap = new Map<string, { hex: string; alpha: number }>()
  for (const color of Object.values(session.paint ?? {})) {
    if (usedColorMap.has(color)) continue
    const parsed = parseRgba(color)
    if (parsed) usedColorMap.set(color, parsed)
    if (usedColorMap.size >= 10) break
  }
  const usedColors = [...usedColorMap.entries()]

  function handlePickColor(hex: string, alpha: number) {
    setBrushColor(hex)
    setBrushOpacity(alpha)
    setTool('brush')
  }

  function setGridSize(cols: number, rows: number) {
    store.mutate((s) => ({
      ...s,
      gridCols: cols,
      gridRows: rows,
      tokens: s.tokens.map((token) => ({
        ...token,
        ...clampRectToGrid(token, cols, rows),
      })),
    }))
  }

  function handleAddChest() {
    const s = useCombatStore.getState()
    const current = s.current
    if (!current) return
    const spot = findFreeSpot(
      current.tokens,
      current.gridCols,
      current.gridRows,
      1,
      1,
    )
    const name = nextTokenName(
      'Baú',
      current.tokens.map((t) => t.name),
    )
    s.addTokens([lootToken(name, spot)])
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="border-b border-border bg-surface-1">
        <div className="flex flex-wrap items-center gap-2 px-3 py-2">
          <Link
            to="/combate"
            title="Voltar aos combates"
            className="rounded-lg px-2 py-1 text-sm text-text-muted hover:bg-surface-2 hover:text-text"
          >
            ←
          </Link>
          <Input
            aria-label="Nome do combate"
            className="w-52 font-medium"
            value={session.name}
            onFocus={store.beginStroke}
            onBlur={store.endStroke}
            onChange={(event) =>
              store.preview((s) => ({ ...s, name: event.target.value }))
            }
          />

          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              disabled={!canUndo}
              title="Desfazer (Ctrl+Z)"
              onClick={() => store.undo()}
            >
              ↩ Desfazer
            </Button>
            <Button
              size="sm"
              variant="ghost"
              disabled={!canRedo}
              title="Refazer (Ctrl+Y)"
              onClick={() => store.redo()}
            >
              ↪ Refazer
            </Button>
          </div>

          <div className="mx-1 h-5 w-px bg-border" aria-hidden />

          <Button size="sm" variant="accent" onClick={() => setShowAdd(true)}>
            + Bestiário
          </Button>
          <Button
            size="sm"
            title="Importar fichas de jogadores como versão de mesa"
            onClick={() => setShowPlayers(true)}
          >
            + Jogadores
          </Button>
          <Button
            size="sm"
            title="Baú com itens no mapa — importe um saque ou liste à mão"
            onClick={handleAddChest}
          >
            + Baú
          </Button>
          <Button size="sm" onClick={() => setShowImport(true)}>
            Importar encontro
          </Button>
          <Button
            size="sm"
            title="Baixa este combate em JSON (com mapa e fotos das fichas)"
            onClick={() => {
              void (async () => {
                await store.flushSave()
                const current = useCombatStore.getState().current
                if (!current) return
                try {
                  await runCombatExportOne(current)
                } catch (error) {
                  window.alert(
                    error instanceof Error
                      ? error.message
                      : 'Falha ao exportar o combate.',
                  )
                }
              })()
            }}
          >
            Exportar JSON
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border/60 px-3 py-1.5">
          <div
            className="flex overflow-hidden rounded-lg border border-border"
            role="group"
            aria-label="Ferramenta do tabuleiro"
          >
            {TOOL_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                title={option.hint}
                aria-pressed={tool === option.id}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                  tool === option.id
                    ? 'bg-info/20 text-info'
                    : 'text-text-muted hover:bg-surface-2 hover:text-text'
                }`}
                onClick={() => {
                  setTool(option.id)
                  if (option.id !== 'select') setAdjustingMap(false)
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <input
            type="color"
            aria-label="Cor do pincel"
            title="Cor do pincel"
            className="h-7 w-9 cursor-pointer rounded-md border border-border bg-surface-2 p-0.5"
            value={brushColor}
            onChange={(event) => {
              setBrushColor(event.target.value)
              setTool('brush')
              setAdjustingMap(false)
            }}
          />
          <span className="text-[11px] text-text-dim">Opacidade</span>
          <input
            type="range"
            aria-label="Opacidade do pincel"
            title={`Opacidade: ${Math.round(brushOpacity * 100)}%`}
            min={10}
            max={100}
            step={5}
            value={Math.round(brushOpacity * 100)}
            className="w-20 accent-[var(--color-accent)]"
            onChange={(event) =>
              setBrushOpacity(Number(event.target.value) / 100)
            }
          />
          {usedColors.length > 0 ? (
            <div
              className="flex items-center gap-1"
              role="group"
              aria-label="Cores já usadas no grid"
            >
              {usedColors.map(([rgba, { hex, alpha }]) => (
                <button
                  key={rgba}
                  type="button"
                  title={`Usar ${hex} · ${Math.round(alpha * 100)}% no pincel`}
                  aria-label={`Usar a cor ${hex}`}
                  className={`h-5 w-5 rounded border transition-transform hover:scale-110 ${
                    hex === brushColor &&
                    Math.round(alpha * 100) === Math.round(brushOpacity * 100)
                      ? 'border-info ring-1 ring-info'
                      : 'border-border'
                  }`}
                  style={{ backgroundColor: rgba }}
                  onClick={() => handlePickColor(hex, alpha)}
                />
              ))}
            </div>
          ) : null}
          <Button
            size="sm"
            variant="ghost"
            disabled={!hasPaint}
            title="Remove toda a pintura do grid (dá para desfazer)"
            onClick={() => store.mutate((s) => ({ ...s, paint: {} }))}
          >
            Limpar pintura
          </Button>

          <div className="mx-1 h-5 w-px bg-border" aria-hidden />

          <CombatMapButtons
            hasMap={Boolean(session.mapBackdrop)}
            adjusting={adjustingMap}
            onImported={() => {
              setTool('select')
              store.selectToken(null)
            }}
            onAdjustingChange={(next) => {
              setAdjustingMap(next)
              if (next) {
                setTool('select')
                store.selectToken(null)
              }
            }}
          />

          <div className="ml-auto flex items-center gap-2">
            <span className="text-[11px] text-text-dim">Grid</span>
            <GridSizeField
              ariaLabel="Colunas do grid"
              value={session.gridCols}
              onCommit={(cols) => setGridSize(cols, session.gridRows)}
            />
            <span className="text-xs text-text-dim">×</span>
            <GridSizeField
              ariaLabel="Linhas do grid"
              value={session.gridRows}
              onCommit={(rows) => setGridSize(session.gridCols, rows)}
            />
            <span className="ml-2 text-[11px] text-text-dim">Zoom</span>
            <input
              type="range"
              aria-label="Zoom do tabuleiro"
              title="Zoom (ou Ctrl+scroll no tabuleiro)"
              min={CELL_SIZE_MIN}
              max={CELL_SIZE_MAX}
              step={4}
              value={session.cellSize}
              className="w-24 accent-[var(--color-accent)]"
              onChange={(event) =>
                store.mutateQuiet((s) => ({
                  ...s,
                  cellSize: Number(event.target.value),
                }))
              }
            />
            <span className="ml-2 text-[11px] text-text-dim">Linhas</span>
            <input
              type="range"
              aria-label="Opacidade das linhas do grid"
              title={`Linhas do grid: ${Math.round((session.gridLineOpacity ?? 1) * 100)}%`}
              min={0}
              max={100}
              step={5}
              value={Math.round((session.gridLineOpacity ?? 1) * 100)}
              className="w-20 accent-[var(--color-accent)]"
              onChange={(event) =>
                store.mutateQuiet((s) => ({
                  ...s,
                  gridLineOpacity: Number(event.target.value) / 100,
                }))
              }
            />
            <span className="w-8 text-[11px] tabular-nums text-text-dim">
              {Math.round((session.gridLineOpacity ?? 1) * 100)}%
            </span>
          </div>
        </div>
        {adjustingMap && session.mapBackdrop ? (
          <CombatMapAdjustBar onDone={() => setAdjustingMap(false)} />
        ) : null}
      </header>

      <div className="flex min-h-0 flex-1">
        <InitiativePanel />
        <main className="min-h-0 min-w-0 flex-1">
          <CombatGrid
            tool={tool}
            brushColor={brushColor}
            brushOpacity={brushOpacity}
            onPickColor={handlePickColor}
            adjustingMap={adjustingMap}
          />
        </main>
        <TokenDetailsPanel />
      </div>

      {showAdd ? <AddCreatureDialog onClose={() => setShowAdd(false)} /> : null}
      {showPlayers ? (
        <AddCharacterDialog onClose={() => setShowPlayers(false)} />
      ) : null}
      {showImport ? (
        <ImportEncounterDialog onClose={() => setShowImport(false)} />
      ) : null}
    </div>
  )
}
