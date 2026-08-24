import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { COUNTRY_COLOR_PRESETS } from '@/features/world/markerShapes'
import {
  ColorField,
  readLastCountryColor,
  writeLastCountryColor,
} from '@/features/world/components/ColorField'
import { WorldMapCanvas } from '@/features/world/components/WorldMapCanvas'
import { WorldMapToolbar } from '@/features/world/components/WorldMapToolbar'
import { MapInspector } from '@/features/world/components/MapInspector'
import { useWorldMapStore } from '@/stores/worldMapStore'

function fieldTarget(event: KeyboardEvent): boolean {
  const tag = (event.target as HTMLElement | null)?.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

export function WorldMapPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const loadOne = useWorldMapStore((s) => s.loadOne)
  const current = useWorldMapStore((s) => s.current)
  const loading = useWorldMapStore((s) => s.loading)
  const flushSave = useWorldMapStore((s) => s.flushSave)
  const cancelDraft = useWorldMapStore((s) => s.cancelDraft)
  const undoDraftVertex = useWorldMapStore((s) => s.undoDraftVertex)
  const undo = useWorldMapStore((s) => s.undo)
  const redo = useWorldMapStore((s) => s.redo)
  const deleteSelectedVertex = useWorldMapStore((s) => s.deleteSelectedVertex)
  const selectedMarkerId = useWorldMapStore((s) => s.selectedMarkerId)
  const selectedCountryId = useWorldMapStore((s) => s.selectedCountryId)
  const selectedPathId = useWorldMapStore((s) => s.selectedPathId)
  const [finishOpen, setFinishOpen] = useState(false)
  const [countryName, setCountryName] = useState('')
  const [countryColor, setCountryColor] = useState<string>(readLastCountryColor)

  function submitCountry() {
    writeLastCountryColor(countryColor)
    useWorldMapStore.getState().finishCountry(countryName, countryColor)
    setFinishOpen(false)
    setCountryName('')
  }

  useEffect(() => {
    if (id) void loadOne(id)
  }, [id, loadOne])

  useEffect(() => {
    return () => {
      void flushSave()
    }
  }, [flushSave, id])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const mod = event.ctrlKey || event.metaKey
      if (mod && event.key.toLowerCase() === 'z') {
        event.preventDefault()
        if (event.shiftKey) redo()
        else undo()
      }
      if (mod && event.key.toLowerCase() === 'y') {
        event.preventDefault()
        redo()
      }
      if (event.key === 'Escape') {
        cancelDraft()
        useWorldMapStore.getState().selectMarker(null)
        useWorldMapStore.getState().selectCountry(null)
        setFinishOpen(false)
      }
      if (event.key === 'Enter') {
        if (fieldTarget(event)) return
        const state = useWorldMapStore.getState()
        if (state.tool === 'path' && state.draftVertices.length >= 2) {
          event.preventDefault()
          state.finishPath()
          return
        }
        if (state.draftVertices.length >= 3) {
          event.preventDefault()
          setFinishOpen(true)
        }
      }
      if (event.key === 'Backspace') {
        if (fieldTarget(event)) return
        const tool = useWorldMapStore.getState().tool
        if (tool === 'border' || tool === 'path') {
          undoDraftVertex()
        }
      }
      if (event.key === 'Delete') {
        if (fieldTarget(event)) return
        const state = useWorldMapStore.getState()
        if (state.selectedVertexId) state.deleteSelectedVertex()
        else if (state.selectedMarkerId) state.removeMarker(state.selectedMarkerId)
        else if (state.selectedCountryId) state.removeCountry(state.selectedCountryId)
        else if (state.selectedPathId) state.removePath(state.selectedPathId)
      }
      if (fieldTarget(event) || mod) return
      const key = event.key.toLowerCase()
      if (key === 'v' || key === '1') useWorldMapStore.getState().setTool('select')
      if (key === 'h' || key === '2') useWorldMapStore.getState().setTool('pan')
      if (key === 'i' || key === 'm' || key === '3') {
        useWorldMapStore.getState().setTool('marker')
      }
      if (key === 'b' || key === '4') useWorldMapStore.getState().setTool('border')
      if (key === 'r' || key === '5') useWorldMapStore.getState().setTool('path')
      if (key === 'f') {
        event.preventDefault()
        useWorldMapStore.getState().requestFit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cancelDraft, undo, redo, undoDraftVertex, deleteSelectedVertex])

  if (loading && current?.id !== id) {
    return <div className="p-4 text-sm text-text-dim">Carregando mapa…</div>
  }
  if (!current || current.id !== id) {
    return (
      <div className="p-4 text-sm text-text-dim">
        Mapa não encontrado.{' '}
        <button type="button" className="text-info" onClick={() => navigate('/mundo/mapas')}>
          Voltar
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WorldMapToolbar onFinishCountry={() => setFinishOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <WorldMapCanvas
          onFinishCountry={() => setFinishOpen(true)}
          onOpenNote={(noteId) => navigate(`/mundo/notas/${noteId}`)}
        />
        <aside className="w-64 shrink-0 overflow-y-auto border-l border-border bg-surface-1 p-3">
          <MapInspector />
          {!selectedMarkerId && !selectedCountryId && !selectedPathId && (
            <p className="mt-4 text-[11px] text-text-dim">
              Clique um país, ícone ou caminho na lista para ir até ele. Duplo
              clique no mapa abre a nota. V/H/I/B/R troca ferramenta, Espaço
              arrasta, F enquadra. Caminhos aceitam pontilhado, tracejado e
              estrada.
            </p>
          )}
        </aside>
      </div>
      {finishOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 animate-fade-up"
          onClick={() => setFinishOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-border bg-surface-1 p-4 shadow-panel animate-pop-in"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="font-display text-lg text-accent">Novo país</h2>
            <p className="mt-1 text-xs text-text-dim">
              Nome e cor. O polígono que você acabou de fechar vira o país —
              o rótulo se acomoda ao formato e dá para puxar depois.
            </p>
            <Input
              className="mt-3"
              autoFocus
              placeholder="Nome"
              value={countryName}
              onChange={(event) => setCountryName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitCountry()
              }}
            />
            <div className="mt-3">
              <ColorField
                value={countryColor}
                presets={COUNTRY_COLOR_PRESETS}
                onChange={setCountryColor}
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button size="sm" onClick={() => setFinishOpen(false)}>
                Cancelar
              </Button>
              <Button
                size="sm"
                variant="accent"
                onClick={submitCountry}
              >
                Criar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
