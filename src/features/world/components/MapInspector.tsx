import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import type { MapLegendEntry, WorldNote } from '@/types'
import {
  MAP_PATH_STYLES,
  MAP_PATH_STYLE_LABELS,
  MARKER_SHAPES,
  MARKER_SHAPE_LABELS,
} from '@/types'
import {
  COUNTRY_COLOR_PRESETS,
  MARKER_COLOR_PRESETS,
} from '@/features/world/markerShapes'
import { ColorField, writeLastCountryColor } from '@/features/world/components/ColorField'
import {
  MARKER_SIZE_MAX,
  MARKER_SIZE_MIN,
  PATH_WIDTH_MAX,
  PATH_WIDTH_MIN,
} from '@/features/world/worldRepository'
import { polygonCentroid, polygonPoints } from '@/engine/worldMap'
import { createId } from '@/utils/id'
import { useWorldMapStore } from '@/stores/worldMapStore'
import { useWorldStore } from '@/stores/worldStore'

function NotePick({
  value,
  notes,
  onChange,
}: {
  value: string | null
  notes: WorldNote[]
  onChange: (id: string | null) => void
}) {
  const [query, setQuery] = useState('')
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    return notes
      .filter((note) => !q || note.title.toLowerCase().includes(q))
      .slice(0, 8)
  }, [notes, query])
  const current = notes.find((note) => note.id === value)

  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-text-dim">
        Nota ligada
      </div>
      {current ? (
        <div className="mt-1 flex items-center justify-between gap-2 text-sm">
          <span className="truncate">{current.title}</span>
          <button
            type="button"
            className="text-xs text-danger/80"
            onClick={() => onChange(null)}
          >
            Soltar
          </button>
        </div>
      ) : (
        <Input
          className="mt-1"
          placeholder="Buscar nota…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      )}
      {!current && query && (
        <ul className="mt-1 max-h-32 overflow-y-auto rounded border border-border">
          {matches.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                className="block w-full px-2 py-1 text-left text-xs hover:bg-surface-2"
                onClick={() => {
                  onChange(note.id)
                  setQuery('')
                }}
              >
                {note.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

async function createLinkedNote(title: string): Promise<string> {
  const note = await useWorldStore.getState().createNote({
    title,
    content: `## ${title}\n\n`,
  })
  return note.id
}

export function MapInspector() {
  const navigate = useNavigate()
  const map = useWorldMapStore((s) => s.current)
  const notes = useWorldStore((s) => s.notes)
  const loadAllNotes = useWorldStore((s) => s.loadAll)
  const selectedMarkerId = useWorldMapStore((s) => s.selectedMarkerId)
  const selectedCountryId = useWorldMapStore((s) => s.selectedCountryId)
  const selectedPathId = useWorldMapStore((s) => s.selectedPathId)
  const marker = map?.markers.find((entry) => entry.id === selectedMarkerId)
  const country = map?.countries.find((entry) => entry.id === selectedCountryId)
  const path = (map?.paths ?? []).find((entry) => entry.id === selectedPathId)
  const [catalogQuery, setCatalogQuery] = useState('')

  useEffect(() => {
    void loadAllNotes()
  }, [loadAllNotes])

  if (!map) return null

  if (marker) {
    return (
      <div className="space-y-3 text-sm">
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
          Ícone
        </h3>
        <label className="block text-xs text-text-dim">
          Rótulo
          <Input
            className="mt-1"
            value={marker.label}
            onChange={(event) =>
              useWorldMapStore.getState().updateMarker(marker.id, {
                label: event.target.value,
                showLabel: event.target.value.trim().length > 0,
              })
            }
          />
        </label>
        <label className="block text-xs text-text-dim">
          Tamanho
          <input
            type="range"
            min={MARKER_SIZE_MIN}
            max={MARKER_SIZE_MAX}
            step={0.0005}
            value={Math.min(
              MARKER_SIZE_MAX,
              Math.max(MARKER_SIZE_MIN, marker.size),
            )}
            onChange={(event) => {
              const size = Number(event.target.value)
              useWorldMapStore.getState().updateMarker(marker.id, { size })
              useWorldMapStore.getState().setMarkerSize(size)
            }}
            className="mt-1 w-full"
          />
          <div className="mt-1 flex flex-wrap gap-1">
            {(
              [
                ['Minúsculo', 0.002],
                ['Pequeno', 0.007],
                ['Médio', 0.016],
                ['Grande', 0.032],
              ] as const
            ).map(([label, size]) => (
              <button
                key={label}
                type="button"
                className="rounded px-1.5 py-0.5 text-[10px] text-text-muted hover:bg-surface-2 hover:text-text"
                onClick={() => {
                  useWorldMapStore.getState().updateMarker(marker.id, { size })
                  useWorldMapStore.getState().setMarkerSize(size)
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </label>
        <ColorField
          value={marker.color}
          presets={MARKER_COLOR_PRESETS}
          onChange={(color) =>
            useWorldMapStore.getState().updateMarker(marker.id, { color })
          }
        />
        <NotePick
          value={marker.noteId}
          notes={notes}
          onChange={(noteId) =>
            useWorldMapStore.getState().updateMarker(marker.id, { noteId })
          }
        />
        <div className="flex flex-wrap gap-1">
          {marker.noteId ? (
            <Button
              size="sm"
              onClick={() => navigate(`/mundo/notas/${marker.noteId}`)}
            >
              Abrir nota
            </Button>
          ) : (
            <Button
              size="sm"
              variant="accent"
              onClick={() => {
                void createLinkedNote(
                  marker.label.trim() || 'Novo lugar',
                ).then((noteId) => {
                  useWorldMapStore
                    .getState()
                    .updateMarker(marker.id, { noteId })
                  navigate(`/mundo/notas/${noteId}`)
                })
              }}
            >
              Nova nota ligada
            </Button>
          )}
        </div>
        <Button
          size="sm"
          variant="danger"
          onClick={() => useWorldMapStore.getState().removeMarker(marker.id)}
        >
          Remover ícone
        </Button>
      </div>
    )
  }

  if (path) {
    return (
      <div className="space-y-3 text-sm">
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
          Caminho
        </h3>
        <Input
          value={path.name}
          onChange={(event) =>
            useWorldMapStore.getState().updatePath(path.id, {
              name: event.target.value,
            })
          }
        />
        <ColorField
          value={path.color}
          presets={COUNTRY_COLOR_PRESETS}
          onChange={(color) =>
            useWorldMapStore.getState().updatePath(path.id, { color })
          }
        />
        <div className="flex flex-wrap gap-1">
          {MAP_PATH_STYLES.map((id) => (
            <button
              key={id}
              type="button"
              className={`rounded-md px-2 py-1 text-[11px] ${
                path.style === id
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:bg-surface-2'
              }`}
              onClick={() =>
                useWorldMapStore.getState().updatePath(path.id, { style: id })
              }
            >
              {MAP_PATH_STYLE_LABELS[id]}
            </button>
          ))}
        </div>
        <label className="block text-xs text-text-dim">
          Espessura
          <input
            type="range"
            min={PATH_WIDTH_MIN}
            max={PATH_WIDTH_MAX}
            step={0.00025}
            value={Math.min(
              PATH_WIDTH_MAX,
              Math.max(PATH_WIDTH_MIN, path.width),
            )}
            onChange={(event) =>
              useWorldMapStore.getState().updatePath(path.id, {
                width: Number(event.target.value),
              })
            }
            className="mt-1 w-full"
          />
        </label>
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={path.showLabel}
            onChange={(event) =>
              useWorldMapStore.getState().updatePath(path.id, {
                showLabel: event.target.checked,
              })
            }
          />
          Mostrar nome no mapa
        </label>
        <NotePick
          value={path.noteId}
          notes={notes}
          onChange={(noteId) =>
            useWorldMapStore.getState().updatePath(path.id, { noteId })
          }
        />
        <div className="flex flex-wrap gap-1">
          {path.noteId && (
            <Button
              size="sm"
              onClick={() => navigate(`/mundo/notas/${path.noteId}`)}
            >
              Abrir nota
            </Button>
          )}
          {!path.noteId && (
            <Button
              size="sm"
              onClick={() => {
                void createLinkedNote(path.name.trim() || 'Nova rota').then(
                  (noteId) => {
                    useWorldMapStore.getState().updatePath(path.id, { noteId })
                    navigate(`/mundo/notas/${noteId}`)
                  },
                )
              }}
            >
              Nova nota ligada
            </Button>
          )}
        </div>
        <Button
          size="sm"
          variant="danger"
          onClick={() => useWorldMapStore.getState().removePath(path.id)}
        >
          Remover caminho
        </Button>
      </div>
    )
  }

  if (country) {
    const label = country.label ?? {
      dx: 0,
      dy: 0,
      rotation: 0,
      scale: 1,
      curve: 0,
    }
    return (
      <div className="space-y-3 text-sm">
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
          País
        </h3>
        <Input
          value={country.name}
          onChange={(event) =>
            useWorldMapStore.getState().updateCountry(country.id, {
              name: event.target.value,
            })
          }
        />
        <ColorField
          value={country.color}
          presets={COUNTRY_COLOR_PRESETS}
          onChange={(color) => {
            writeLastCountryColor(color)
            useWorldMapStore.getState().updateCountry(country.id, { color })
          }}
        />
        <label className="block text-xs text-text-dim">
          Preenchimento
          <input
            type="range"
            min={0.08}
            max={0.8}
            step={0.02}
            value={country.fillOpacity}
            onChange={(event) =>
              useWorldMapStore.getState().updateCountry(country.id, {
                fillOpacity: Number(event.target.value),
              })
            }
            className="w-full"
          />
        </label>
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={country.showLabel}
            onChange={(event) =>
              useWorldMapStore.getState().updateCountry(country.id, {
                showLabel: event.target.checked,
              })
            }
          />
          Mostrar nome
        </label>
        <p className="text-[11px] text-text-dim">
          O nome se curva sozinho no formato do país. Arraste no mapa ou
          ajuste abaixo.
        </p>
        <label className="block text-xs text-text-dim">
          Curva {label.curve.toFixed(2)}
          <input
            type="range"
            min={-1}
            max={1}
            step={0.05}
            value={label.curve}
            onChange={(event) =>
              useWorldMapStore.getState().updateCountry(country.id, {
                label: { ...label, curve: Number(event.target.value) },
              })
            }
            className="w-full"
          />
        </label>
        <label className="block text-xs text-text-dim">
          Rotação {label.rotation.toFixed(0)}°
          <input
            type="range"
            min={-90}
            max={90}
            step={1}
            value={label.rotation}
            onChange={(event) =>
              useWorldMapStore.getState().updateCountry(country.id, {
                label: { ...label, rotation: Number(event.target.value) },
              })
            }
            className="w-full"
          />
        </label>
        <label className="block text-xs text-text-dim">
          Tamanho {label.scale.toFixed(2)}×
          <input
            type="range"
            min={0.4}
            max={2.2}
            step={0.05}
            value={label.scale}
            onChange={(event) =>
              useWorldMapStore.getState().updateCountry(country.id, {
                label: { ...label, scale: Number(event.target.value) },
              })
            }
            className="w-full"
          />
        </label>
        <Button
          size="sm"
          onClick={() =>
            useWorldMapStore
              .getState()
              .updateCountry(country.id, { label: null })
          }
        >
          Restaurar automático
        </Button>
        <NotePick
          value={country.noteId}
          notes={notes}
          onChange={(noteId) =>
            useWorldMapStore.getState().updateCountry(country.id, { noteId })
          }
        />
        <div className="flex flex-wrap gap-1">
          {country.noteId ? (
            <Button
              size="sm"
              onClick={() => navigate(`/mundo/notas/${country.noteId}`)}
            >
              Abrir nota
            </Button>
          ) : (
            <Button
              size="sm"
              variant="accent"
              onClick={() => {
                void createLinkedNote(
                  country.name.trim() || 'Novo país',
                ).then((noteId) => {
                  useWorldMapStore
                    .getState()
                    .updateCountry(country.id, { noteId })
                  navigate(`/mundo/notas/${noteId}`)
                })
              }}
            >
              Nova nota ligada
            </Button>
          )}
        </div>
        <Button
          size="sm"
          variant="danger"
          onClick={() =>
            useWorldMapStore.getState().removeCountry(country.id)
          }
        >
          Remover país
        </Button>
      </div>
    )
  }

  const q = catalogQuery.trim().toLowerCase()
  const countries = map.countries.filter(
    (entry) => !q || entry.name.toLowerCase().includes(q),
  )
  const markers = map.markers.filter(
    (entry) =>
      !q ||
      entry.label.toLowerCase().includes(q) ||
      (entry.noteId &&
        notes
          .find((note) => note.id === entry.noteId)
          ?.title.toLowerCase()
          .includes(q)),
  )
  const paths = (map.paths ?? []).filter(
    (entry) => !q || entry.name.toLowerCase().includes(q),
  )
  const vertexById = new Map(map.vertices.map((vertex) => [vertex.id, vertex]))

  return (
    <div className="space-y-3 text-sm">
      <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
        No mapa
      </h3>
      <label className="block text-xs text-text-dim">
        Escala de todos os ícones
        <input
          type="range"
          min={0.15}
          max={2.4}
          step={0.05}
          value={map.iconScale ?? 1}
          onChange={(event) =>
            useWorldMapStore.getState().mutateQuiet((current) => ({
              ...current,
              iconScale: Number(event.target.value),
            }))
          }
          className="mt-1 w-full"
        />
        <div className="mt-1 flex justify-between text-[10px] text-text-dim">
          <span>Bem menor</span>
          <span>{Math.round((map.iconScale ?? 1) * 100)}%</span>
          <span>Maior</span>
        </div>
      </label>
      <Input
        placeholder="Buscar país, ícone ou caminho…"
        value={catalogQuery}
        onChange={(event) => setCatalogQuery(event.target.value)}
      />
      {countries.length > 0 && (
        <ul className="space-y-0.5">
          {countries.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-xs hover:bg-surface-2"
                onClick={() => {
                  useWorldMapStore.getState().selectCountry(entry.id)
                  const points = polygonPoints(entry, vertexById)
                  if (points.length >= 3) {
                    const c = polygonCentroid(points)
                    useWorldMapStore.getState().requestFocus(c.x, c.y)
                  }
                }}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-sm border border-black/30"
                  style={{ background: entry.color }}
                />
                <span className="truncate">{entry.name || 'Sem nome'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {markers.length > 0 && (
        <ul className="space-y-0.5">
          {markers.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-xs hover:bg-surface-2"
                onClick={() => {
                  useWorldMapStore.getState().selectMarker(entry.id)
                  useWorldMapStore.getState().requestFocus(entry.x, entry.y)
                }}
              >
                <span
                  className="h-3 w-3 shrink-0 rounded-full border border-black/30"
                  style={{ background: entry.color }}
                />
                <span className="truncate">
                  {entry.label || 'Ícone sem rótulo'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {paths.length > 0 && (
        <ul className="space-y-0.5">
          {paths.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left text-xs hover:bg-surface-2"
                onClick={() => {
                  useWorldMapStore.getState().selectPath(entry.id)
                  const mid = entry.points[Math.floor(entry.points.length / 2)]
                  if (mid) useWorldMapStore.getState().requestFocus(mid.x, mid.y)
                }}
              >
                <span
                  className="h-0.5 w-4 shrink-0 rounded-full"
                  style={{ background: entry.color }}
                />
                <span className="truncate">{entry.name || 'Caminho'}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {countries.length === 0 && markers.length === 0 && paths.length === 0 && (
        <p className="text-[11px] text-text-dim">
          Nada com esse nome. Clique no mapa, desenhe uma fronteira ou um
          caminho.
        </p>
      )}
      <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
        Legenda
      </h3>
      <p className="text-[11px] text-text-dim">
        As formas não significam nada por si. Anote aqui o que estrela,
        círculo e os ícones importados representam neste mapa.
      </p>
      <ul className="space-y-2">
        {(map.legend ?? []).map((entry) => (
          <li key={entry.id} className="flex gap-1">
            <Select
              value={entry.shape ?? ''}
              onChange={(event) => {
                const shape = event.target.value as typeof entry.shape | ''
                useWorldMapStore.getState().upsertLegend({
                  ...entry,
                  shape: shape || null,
                })
              }}
            >
              <option value="">Ícone</option>
              {MARKER_SHAPES.map((id) => (
                <option key={id} value={id}>
                  {MARKER_SHAPE_LABELS[id]}
                </option>
              ))}
            </Select>
            <Input
              value={entry.meaning}
              placeholder="significa…"
              onChange={(event) =>
                useWorldMapStore.getState().upsertLegend({
                  ...entry,
                  meaning: event.target.value,
                })
              }
            />
            <button
              type="button"
              className="text-danger/80"
              onClick={() =>
                useWorldMapStore.getState().removeLegend(entry.id)
              }
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <Button
        size="sm"
        onClick={() => {
          const entry: MapLegendEntry = {
            id: createId('leg'),
            shape: 'circle',
            assetId: null,
            meaning: '',
            color: null,
          }
          useWorldMapStore.getState().upsertLegend(entry)
        }}
      >
        + Linha
      </Button>
    </div>
  )
}
