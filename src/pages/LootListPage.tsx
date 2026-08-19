import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Tip } from '@/components/ui/Panel'
import { FilterCount } from '@/components/ui/FilterCount'
import { formatPriceCp } from '@/engine/equipment'
import { haulTotalCp, threatLabel } from '@/engine/lootGenerator'
import { claimedCount } from '@/engine/lootDelivery'
import { ActiveGroupsBar } from '@/features/groups/ActiveGroupsBar'
import { useLootStore } from '@/stores/lootStore'
import type { LootKind } from '@/types'

const KIND_LABEL: Record<LootKind, string> = {
  level: 'Tesouro do nível',
  encounter: 'Encontro',
  custom: 'Livre',
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function LootListPage() {
  const navigate = useNavigate()
  const { hauls, loading, loadAll, createNew, remove, duplicate } =
    useLootStore()
  const [query, setQuery] = useState('')

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  async function handleCreate() {
    const haul = await createNew()
    navigate(`/saques/${haul.id}`)
  }

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return hauls
    return hauls.filter((haul) => {
      const hay = [
        haul.name,
        KIND_LABEL[haul.kind],
        `nivel ${haul.partyLevel}`,
        ...haul.lines.map((line) => line.name),
      ].join(' ')
      return normalize(hay).includes(q)
    })
  }, [hauls, query])

  return (
    <div className="mx-auto max-w-6xl animate-fade-up p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Meus Saques
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Tesouros sorteados do catálogo Remaster — salvos neste navegador.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/saques/mesa">
            <Button>Inventário da mesa</Button>
          </Link>
          <Button variant="accent" onClick={() => void handleCreate()}>
            + Criar Saque
          </Button>
        </div>
      </div>

      <Tip>
        Escolha o nível, sorteie o tesouro e mande as peças para uma ficha
        ou para o baú compartilhado. Para passar item ou ouro entre eles,
        use o{' '}
        <Link to="/saques/mesa" className="text-accent hover:underline">
          inventário da mesa
        </Link>
        .
      </Tip>

      <ActiveGroupsBar className="mt-4" />

      {hauls.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar saque ou item…"
            aria-label="Buscar saques"
            className="max-w-md flex-1"
          />
          <FilterCount shown={visible.length} total={hauls.length} />
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-text-dim">Carregando saques…</p>
        ) : hauls.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-14 text-center">
            <div className="font-display text-lg text-accent">
              O primeiro baú
            </div>
            <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
              Ainda não há saques. Crie um, escolha o nível da mesa e sorteie
              o tesouro com os itens que já estão no app.
            </p>
            <Button
              className="mt-5"
              variant="accent"
              onClick={() => void handleCreate()}
            >
              Criar Saque
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-10 text-center">
            <p className="text-sm text-text-muted">
              Nenhum saque encontrado para “{query}”.
            </p>
            <Button className="mt-4" size="sm" onClick={() => setQuery('')}>
              Limpar busca
            </Button>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((haul) => {
              const total = haulTotalCp(haul.lines)
              const itemCount = haul.lines.filter(
                (line) => line.kind === 'item',
              ).length
              const delivered = claimedCount(haul)
              const kind =
                haul.kind === 'encounter'
                  ? `Encontro ${threatLabel(haul.encounterThreat)}`
                  : KIND_LABEL[haul.kind]

              return (
                <li
                  key={haul.id}
                  className="interactive-lift group rounded-xl border border-border bg-surface-1/90 p-4 hover:border-accent/40"
                >
                  <Link
                    to={`/saques/${haul.id}`}
                    className="block truncate font-display text-base font-semibold text-text transition-colors group-hover:text-accent"
                  >
                    {haul.name}
                  </Link>
                  <div className="mt-1.5 text-xs text-text-dim">
                    Nível {haul.partyLevel} · {haul.partySize} pers. · {kind}
                  </div>
                  <div className="mt-2 text-sm text-text-muted">
                    {itemCount} item(ns)
                    {total > 0 ? ` · ${formatPriceCp(total)}` : ''}
                    {delivered > 0
                      ? ` · ${delivered} entregue${delivered === 1 ? '' : 's'}`
                      : ''}
                  </div>
                  <div className="mt-2 text-[11px] text-text-dim">
                    Atualizado{' '}
                    {new Date(haul.updatedAt).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() => navigate(`/saques/${haul.id}`)}
                    >
                      Abrir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        void duplicate(haul.id)
                          .then((copy) => navigate(`/saques/${copy.id}`))
                          .catch((error) =>
                            window.alert(
                              error instanceof Error
                                ? error.message
                                : 'Falha ao duplicar o saque.',
                            ),
                          )
                      }}
                    >
                      Duplicar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Excluir o saque "${haul.name}"? Esta ação não pode ser desfeita.`,
                          )
                        ) {
                          void remove(haul.id)
                        }
                      }}
                    >
                      Excluir
                    </Button>
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
