import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Tip } from '@/components/ui/Panel'
import { FilterCount } from '@/components/ui/FilterCount'
import { WorldJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { useWorldMapStore } from '@/stores/worldMapStore'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function WorldMapListPage() {
  const navigate = useNavigate()
  const { maps, loading, loadAll, createNew, remove, duplicate } =
    useWorldMapStore()
  const [query, setQuery] = useState('')

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return maps
    return maps.filter((map) => {
      const hay = [
        map.name,
        ...map.countries.map((country) => country.name),
        ...map.markers.map((marker) => marker.label),
      ].join(' ')
      return normalize(hay).includes(q)
    })
  }, [maps, query])

  async function handleCreate() {
    const map = await createNew()
    navigate(`/mundo/mapas/${map.id}`)
  }

  return (
    <div className="mx-auto max-w-6xl animate-fade-up p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Mapas da campanha
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Importe um fundo, plante ícones e desenhe fronteiras por vértices —
            no estilo grand strategy.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <WorldJsonButtons />
          <Button variant="accent" onClick={() => void handleCreate()}>
            + Novo mapa
          </Button>
        </div>
      </div>
      <Tip>
        Com a ferramenta Fronteira, clique os cantos. O ímã puxa o ponto para
        cima da bolinha ou da linha (sem vãos). Com três pontas, o primeiro
        vértice fica verde — clique nele, aperte Enter ou use Formar país.
      </Tip>
      <div className="mt-4 flex items-center gap-3">
        <Input
          type="search"
          placeholder="Buscar mapa, país ou ícone…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-sm"
        />
        <FilterCount shown={visible.length} total={maps.length} />
      </div>
      {loading && maps.length === 0 ? (
        <p className="mt-6 text-sm text-text-dim">Carregando…</p>
      ) : visible.length === 0 ? (
        <p className="mt-6 text-sm text-text-dim">
          Nenhum mapa ainda. Crie um e importe a imagem da campanha.
        </p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((map) => (
            <li key={map.id}>
              <button
                type="button"
                className="interactive-lift w-full rounded-xl border border-border bg-surface-1 p-3 text-left hover:border-accent/50"
                onClick={() => navigate(`/mundo/mapas/${map.id}`)}
              >
                <div className="font-display text-base text-accent">
                  {map.name}
                </div>
                <div className="mt-1 text-[11px] text-text-dim">
                  {map.countries.length} país
                  {map.countries.length === 1 ? '' : 'es'} · {map.markers.length}{' '}
                  ícone{map.markers.length === 1 ? '' : 's'}
                  {map.imageAssetId ? ' · com fundo' : ''}
                </div>
              </button>
              <div className="mt-1 flex gap-1">
                <Button
                  size="sm"
                  onClick={() => void duplicate(map.id).then((copy) => navigate(`/mundo/mapas/${copy.id}`))}
                >
                  Duplicar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (!window.confirm(`Excluir “${map.name}”?`)) return
                    void remove(map.id)
                  }}
                >
                  Excluir
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
