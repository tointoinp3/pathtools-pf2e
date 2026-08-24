import { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { MARKER_SHAPES, MARKER_SHAPE_LABELS, MAP_PATH_STYLES, MAP_PATH_STYLE_LABELS } from '@/types'
import { markerSvgInner } from '@/features/world/markerShapes'
import { MARKER_COLOR_PRESETS } from '@/features/world/markerShapes'
import {
  MARKER_SIZE_MAX,
  MARKER_SIZE_MIN,
} from '@/features/world/worldRepository'
import {
  useWorldMapStore,
  type MapTool,
} from '@/stores/worldMapStore'
import { useWorldAssetUrls } from '@/features/world/useWorldAssetUrl'

function toolHint(tool: MapTool): string {
  if (tool === 'pan') return 'Arraste para mover. Roda do mouse: zoom.'
  if (tool === 'marker') return 'Clique para plantar um ícone. Ele não cria nota sozinho.'
  if (tool === 'border') {
    return 'Clique os cantos. O ímã puxa para bolinha ou linha. Com 3+ pontas, clique no ponto verde (ou Enter) para formar o país. Shift solta o ímã.'
  }
  if (tool === 'path') {
    return 'Clique os pontos da rota (estrada, trilha, pontilhado). Enter ou duplo clique grava. R troca para este modo.'
  }
  return 'V selecionar · H mão · I ícone · B fronteira · R caminho · Espaço arrasta · F enquadra. Arraste vértice, ícone ou nome. Del apaga. Duplo clique abre a nota.'
}

const TOOLS: { id: MapTool; label: string }[] = [
  { id: 'select', label: 'Selecionar' },
  { id: 'pan', label: 'Mão' },
  { id: 'marker', label: 'Ícone' },
  { id: 'border', label: 'Fronteira' },
  { id: 'path', label: 'Caminho' },
]

export function WorldMapToolbar({
  onFinishCountry,
}: {
  onFinishCountry: () => void
}) {
  const tool = useWorldMapStore((s) => s.tool)
  const setTool = useWorldMapStore((s) => s.setTool)
  const shape = useWorldMapStore((s) => s.markerShape)
  const setShape = useWorldMapStore((s) => s.setMarkerShape)
  const color = useWorldMapStore((s) => s.markerColor)
  const setColor = useWorldMapStore((s) => s.setMarkerColor)
  const markerSize = useWorldMapStore((s) => s.markerSize)
  const setMarkerSize = useWorldMapStore((s) => s.setMarkerSize)
  const pathStyle = useWorldMapStore((s) => s.pathStyle)
  const setPathStyle = useWorldMapStore((s) => s.setPathStyle)
  const pathColor = useWorldMapStore((s) => s.pathColor)
  const setPathColor = useWorldMapStore((s) => s.setPathColor)
  const markerAssetId = useWorldMapStore((s) => s.markerAssetId)
  const setMarkerAsset = useWorldMapStore((s) => s.setMarkerAsset)
  const icons = useWorldMapStore((s) => s.icons)
  const assetVersion = useWorldMapStore((s) => s.assetVersion)
  const importBackground = useWorldMapStore((s) => s.importBackground)
  const importIcon = useWorldMapStore((s) => s.importIcon)
  const clearBackground = useWorldMapStore((s) => s.clearBackground)
  const map = useWorldMapStore((s) => s.current)
  const draft = useWorldMapStore((s) => s.draftVertices)
  const undo = useWorldMapStore((s) => s.undo)
  const redo = useWorldMapStore((s) => s.redo)
  const past = useWorldMapStore((s) => s.past)
  const future = useWorldMapStore((s) => s.future)
  const toggleLayer = useWorldMapStore((s) => s.toggleLayer)
  const bgRef = useRef<HTMLInputElement>(null)
  const iconRef = useRef<HTMLInputElement>(null)
  const iconUrls = useWorldAssetUrls(
    icons.map((icon) => icon.id),
    assetVersion,
  )

  return (
    <div className="flex flex-col gap-2 border-b border-border bg-surface-1 px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <input
          value={map?.name ?? ''}
          onChange={(event) =>
            useWorldMapStore.getState().rename(event.target.value)
          }
          className="field-control w-48 rounded-lg border border-border bg-surface-2 px-2 py-1 font-display text-sm text-accent"
          aria-label="Nome do mapa"
        />
        <div className="flex rounded-lg border border-border text-[11px]">
          {TOOLS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              className={`px-2 py-1 transition-colors duration-150 ${
                tool === entry.id
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:bg-surface-2'
              }`}
              onClick={() => setTool(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => useWorldMapStore.getState().requestFit()}>
          Enquadrar
        </Button>
        <Button size="sm" disabled={past.length === 0} onClick={undo}>
          Desfazer
        </Button>
        <Button size="sm" disabled={future.length === 0} onClick={redo}>
          Refazer
        </Button>
        <Button size="sm" onClick={() => bgRef.current?.click()}>
          {map?.imageAssetId ? 'Trocar fundo' : 'Importar mapa'}
        </Button>
        {map?.imageAssetId && (
          <Button size="sm" onClick={() => void clearBackground()}>
            Sem fundo
          </Button>
        )}
        <label className="flex items-center gap-1 text-[11px] text-text-dim">
          <input
            type="checkbox"
            checked={map?.showCountries ?? true}
            onChange={() => toggleLayer('showCountries')}
          />
          Países
        </label>
        <label className="flex items-center gap-1 text-[11px] text-text-dim">
          <input
            type="checkbox"
            checked={map?.showMarkers ?? true}
            onChange={() => toggleLayer('showMarkers')}
          />
          Ícones
        </label>
        <label className="flex items-center gap-1 text-[11px] text-text-dim">
          <input
            type="checkbox"
            checked={map?.showLabels ?? true}
            onChange={() => toggleLayer('showLabels')}
          />
          Nomes
        </label>
        <label className="flex items-center gap-1 text-[11px] text-text-dim">
          <input
            type="checkbox"
            checked={map?.showPaths ?? true}
            onChange={() => toggleLayer('showPaths')}
          />
          Caminhos
        </label>
        {draft.length > 0 && (
          <>
            <Button size="sm" onClick={() => useWorldMapStore.getState().undoDraftVertex()}>
              Desfazer ponta
            </Button>
            <Button size="sm" onClick={() => useWorldMapStore.getState().cancelDraft()}>
              Cancelar traço
            </Button>
          </>
        )}
        {tool === 'path' && draft.length >= 2 && (
          <Button
            size="sm"
            variant="accent"
            onClick={() => useWorldMapStore.getState().finishPath()}
          >
            Gravar caminho ({draft.length})
          </Button>
        )}
        {tool !== 'path' && draft.length >= 3 && (
          <Button
            size="sm"
            variant="accent"
            className="animate-pulse-glow"
            onClick={onFinishCountry}
          >
            Formar país ({draft.length} pontas)
          </Button>
        )}
        <input
          ref={bgRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (file) void importBackground(file)
          }}
        />
        <input
          ref={iconRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0]
            event.target.value = ''
            if (file) void importIcon(file)
          }}
        />
      </div>
      {tool === 'marker' && (
        <div className="flex flex-wrap items-center gap-2">
          {MARKER_SHAPES.map((id) => (
            <button
              key={id}
              type="button"
              title={MARKER_SHAPE_LABELS[id]}
              className={`flex h-8 w-8 items-center justify-center rounded border ${
                !markerAssetId && shape === id
                  ? 'border-accent bg-accent/15'
                  : 'border-border hover:bg-surface-2'
              }`}
              onClick={() => setShape(id)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="text-text"
                fill="currentColor"
                dangerouslySetInnerHTML={{ __html: markerSvgInner(id) }}
              />
            </button>
          ))}
          {MARKER_COLOR_PRESETS.map((hex) => (
            <button
              key={hex}
              type="button"
              className={`h-5 w-5 rounded-full border ${
                color === hex ? 'border-white' : 'border-black/40'
              }`}
              style={{ background: hex }}
              onClick={() => setColor(hex)}
            />
          ))}
          <input
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(color) ? color : '#d4a84b'}
            title="Cor livre"
            onChange={(event) => setColor(event.target.value)}
            className="h-7 w-10 cursor-pointer rounded border border-border bg-transparent p-0"
          />
          <label className="flex items-center gap-2 text-[11px] text-text-dim">
            Tamanho
            <input
              type="range"
              min={MARKER_SIZE_MIN}
              max={MARKER_SIZE_MAX}
              step={0.0005}
              value={markerSize}
              onChange={(event) => setMarkerSize(Number(event.target.value))}
              className="w-28"
            />
          </label>
          <Button size="sm" onClick={() => iconRef.current?.click()}>
            Importar ícone
          </Button>
          {icons.map((icon) => (
            <button
              key={icon.id}
              type="button"
              title={icon.name}
              className={`h-8 w-8 overflow-hidden rounded border ${
                markerAssetId === icon.id
                  ? 'border-accent'
                  : 'border-border'
              }`}
              onClick={() => setMarkerAsset(icon.id)}
            >
              {iconUrls[icon.id] ? (
                <img src={iconUrls[icon.id]} alt={icon.name} className="h-full w-full object-contain" />
              ) : null}
            </button>
          ))}
        </div>
      )}
      {tool === 'path' && (
        <div className="flex flex-wrap items-center gap-2">
          {MAP_PATH_STYLES.map((id) => (
            <button
              key={id}
              type="button"
              className={`rounded-md px-2 py-1 text-[11px] ${
                pathStyle === id
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:bg-surface-2'
              }`}
              onClick={() => setPathStyle(id)}
            >
              {MAP_PATH_STYLE_LABELS[id]}
            </button>
          ))}
          <input
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(pathColor) ? pathColor : '#d4a84b'}
            title="Cor da rota"
            onChange={(event) => setPathColor(event.target.value)}
            className="h-7 w-10 cursor-pointer rounded border border-border bg-transparent p-0"
          />
        </div>
      )}
      <p className="text-[11px] text-text-dim">{toolHint(tool)}</p>
    </div>
  )
}
