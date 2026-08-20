import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Tip } from '@/components/ui/Panel'
import { FilterCount } from '@/components/ui/FilterCount'
import { BatchSelectBar } from '@/features/backup/BatchSelectBar'
import { CombatJsonButtons } from '@/features/backup/JsonExchangeButtons'
import {
  runCombatExportMany,
  runCombatExportOne,
} from '@/features/backup/combatBackup'
import { useCombatStore } from '@/stores/combatStore'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function CombatListPage() {
  const navigate = useNavigate()
  const { sessions, loading, loadAll, createNew, remove, duplicate } =
    useCombatStore()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Set<string>>(() => new Set())
  const [exportBusy, setExportBusy] = useState(false)

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  async function handleCreate() {
    const session = await createNew()
    navigate(`/combate/${session.id}`)
  }

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return sessions
    return sessions.filter((session) => {
      const hay = [
        session.name,
        ...session.tokens.map((token) => token.name),
      ].join(' ')
      return normalize(hay).includes(q)
    })
  }, [sessions, query])

  useEffect(() => {
    const ids = new Set(sessions.map((session) => session.id))
    setSelected((prev) => {
      const next = new Set([...prev].filter((id) => ids.has(id)))
      return next.size === prev.size ? prev : next
    })
  }, [sessions])

  function toggleSelected(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function exportSelected() {
    const chosen = visible.filter((session) => selected.has(session.id))
    setExportBusy(true)
    try {
      await runCombatExportMany(chosen)
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : 'Falha ao exportar o lote.',
      )
    } finally {
      setExportBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl animate-fade-up p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Combate
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Tabuleiros de combate com fichas do bestiário — salvos neste
            navegador.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CombatJsonButtons />
          <Button variant="accent" onClick={() => void handleCreate()}>
            + Novo Combate
          </Button>
        </div>
      </div>

      <Tip>
        Importe um encontro salvo ou busque fichas direto do bestiário. Marque
        vários combates para exportar um JSON só, ou importe vários arquivos de
        uma vez. Em Criar token você monta o círculo de VTT e cola no
        bestiário.
      </Tip>

      {sessions.length > 0 ? (
        <div className="mt-4">
          <BatchSelectBar
            selectedCount={visible.filter((session) => selected.has(session.id)).length}
            totalCount={visible.length}
            nounOne="combate"
            nounMany="combates"
            onSelectAll={() =>
              setSelected(new Set(visible.map((session) => session.id)))
            }
            onClear={() => setSelected(new Set())}
            onExport={() => void exportSelected()}
            exportBusy={exportBusy}
          />
        </div>
      ) : null}

      {sessions.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar combate ou criatura…"
            aria-label="Buscar combates"
            className="max-w-md flex-1"
          />
          <FilterCount shown={visible.length} total={sessions.length} />
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-text-dim">Carregando combates…</p>
        ) : sessions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-14 text-center">
            <div className="font-display text-lg text-accent">
              Role a iniciativa
            </div>
            <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
              Ainda não há combates. Crie um tabuleiro e traga as fichas de um
              encontro salvo ou direto do bestiário.
            </p>
            <Button
              className="mt-5"
              variant="accent"
              onClick={() => void handleCreate()}
            >
              Novo Combate
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-10 text-center">
            <p className="text-sm text-text-muted">
              Nenhum combate encontrado para “{query}”.
            </p>
            <Button className="mt-4" size="sm" onClick={() => setQuery('')}>
              Limpar busca
            </Button>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((session) => {
              const alive = session.tokens.filter((t) => !t.defeated).length
              return (
                <li
                  key={session.id}
                  className={`interactive-lift group rounded-xl border bg-surface-1/90 p-4 hover:border-accent/40 ${
                    selected.has(session.id)
                      ? 'border-accent/60'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <label className="mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-[var(--color-accent)]"
                        checked={selected.has(session.id)}
                        onChange={() => toggleSelected(session.id)}
                        aria-label={`Selecionar ${session.name}`}
                      />
                    </label>
                    <div className="min-w-0 flex-1">
                  <Link
                    to={`/combate/${session.id}`}
                    className="block truncate font-display text-base font-semibold text-text transition-colors group-hover:text-accent"
                  >
                    {session.name}
                  </Link>
                  <div className="mt-1.5 text-xs text-text-dim">
                    Rodada {session.round} · grid {session.gridCols}×
                    {session.gridRows}
                  </div>
                  <div className="mt-2 text-sm text-text-muted">
                    {session.tokens.length} ficha
                    {session.tokens.length === 1 ? '' : 's'}
                    {session.tokens.length > 0
                      ? ` · ${alive} em pé`
                      : ''}
                  </div>
                  <div className="mt-2 text-[11px] text-text-dim">
                    Atualizado{' '}
                    {new Date(session.updatedAt).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => navigate(`/combate/${session.id}`)}
                    >
                      Abrir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        void duplicate(session.id)
                          .then((copy) => navigate(`/combate/${copy.id}`))
                          .catch((error) =>
                            window.alert(
                              error instanceof Error
                                ? error.message
                                : 'Falha ao duplicar o combate.',
                            ),
                          )
                      }}
                    >
                      Duplicar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        void runCombatExportOne(session).catch((error) =>
                          window.alert(
                            error instanceof Error
                              ? error.message
                              : 'Falha ao exportar o combate.',
                          ),
                        )
                      }}
                    >
                      Exportar JSON
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Excluir o combate "${session.name}"? Esta ação não pode ser desfeita.`,
                          )
                        ) {
                          void remove(session.id)
                        }
                      }}
                    >
                      Excluir
                    </Button>
                  </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
