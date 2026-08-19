import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Tip } from '@/components/ui/Panel'
import { FilterCount } from '@/components/ui/FilterCount'
import {
  combatThreatLabel,
  encounterLinesXp,
  encounterShapeLabel,
  encounterXpBudget,
  resolveEncounterShape,
} from '@/engine/encounterGenerator'
import { useEncounterStore } from '@/stores/encounterStore'
import type { CombatThreat } from '@/types'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function threatOf(threat: CombatThreat): string {
  return combatThreatLabel(threat)
}

export function EncounterListPage() {
  const navigate = useNavigate()
  const { encounters, loading, loadAll, createNew, remove, duplicate } =
    useEncounterStore()
  const [query, setQuery] = useState('')

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  async function handleCreate() {
    const encounter = await createNew()
    navigate(`/bestiario/encontros/${encounter.id}`)
  }

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return encounters
    return encounters.filter((encounter) => {
      const hay = [
        encounter.name,
        threatOf(encounter.threat),
        encounter.themeLabel ?? '',
        encounterShapeLabel(resolveEncounterShape(encounter.shape)),
        `nivel ${encounter.partyLevel}`,
        ...encounter.lines.map((line) => line.name),
      ].join(' ')
      return normalize(hay).includes(q)
    })
  }, [encounters, query])

  return (
    <div className="mx-auto max-w-6xl animate-fade-up p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Meus Encontros
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Combates sorteados do bestiário Remaster — salvos neste navegador.
          </p>
        </div>
        <Button variant="accent" onClick={() => void handleCreate()}>
          + Criar Encontro
        </Button>
      </div>

      <Tip>
        Escolha o nível da mesa, o estilo (equilíbrio mistura chefe e horda;
        ou só chefe, ou só horda) e sorteie pelo orçamento de XP — ou monte o
        combate à mão, buscando a ficha e a quantidade. Dá para priorizar o
        mesmo tipo no sorteio: 2× a mesma ficha, ou parentes como monitor e
        infernal, em vez de misturar goblin com drake.
      </Tip>

      {encounters.length > 1 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar encontro ou criatura…"
            aria-label="Buscar encontros"
            className="max-w-md flex-1"
          />
          <FilterCount shown={visible.length} total={encounters.length} />
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-text-dim">Carregando encontros…</p>
        ) : encounters.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-14 text-center">
            <div className="font-display text-lg text-accent">
              O primeiro combate
            </div>
            <p className="mx-auto mt-2 max-w-md text-sm text-text-muted">
              Ainda não há encontros. Crie um, escolha o nível da mesa e
              sorteie criaturas do catálogo pelo orçamento de XP.
            </p>
            <Button
              className="mt-5"
              variant="accent"
              onClick={() => void handleCreate()}
            >
              Criar Encontro
            </Button>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-10 text-center">
            <p className="text-sm text-text-muted">
              Nenhum encontro encontrado para “{query}”.
            </p>
            <Button className="mt-4" size="sm" onClick={() => setQuery('')}>
              Limpar busca
            </Button>
          </div>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((encounter) => {
              const budget = encounterXpBudget(
                encounter.threat,
                encounter.partySize,
              )
              const used = encounterLinesXp(encounter.lines)
              const qty = encounter.lines.reduce(
                (sum, line) => sum + line.quantity,
                0,
              )

              return (
                <li
                  key={encounter.id}
                  className="interactive-lift group rounded-xl border border-border bg-surface-1/90 p-4 hover:border-accent/40"
                >
                  <Link
                    to={`/bestiario/encontros/${encounter.id}`}
                    className="block truncate font-display text-base font-semibold text-text transition-colors group-hover:text-accent"
                  >
                    {encounter.name}
                  </Link>
                  <div className="mt-1.5 text-xs text-text-dim">
                    Nível {encounter.partyLevel} · {encounter.partySize} pers. ·{' '}
                    {threatOf(encounter.threat)} ·{' '}
                    {encounterShapeLabel(resolveEncounterShape(encounter.shape))}
                    {encounter.prioritizeSameType && encounter.themeLabel
                      ? ` · ${encounter.themeLabel}`
                      : ''}
                  </div>
                  <div className="mt-2 text-sm text-text-muted">
                    {qty} criatura{qty === 1 ? '' : 's'}
                    {qty > 0 ? ` · ${used}/${budget} XP` : ''}
                  </div>
                  <div className="mt-2 text-[11px] text-text-dim">
                    Atualizado{' '}
                    {new Date(encounter.updatedAt).toLocaleString('pt-BR', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="accent"
                      onClick={() =>
                        navigate(`/bestiario/encontros/${encounter.id}`)
                      }
                    >
                      Abrir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        void duplicate(encounter.id)
                          .then((copy) =>
                            navigate(`/bestiario/encontros/${copy.id}`),
                          )
                          .catch((error) =>
                            window.alert(
                              error instanceof Error
                                ? error.message
                                : 'Falha ao duplicar o encontro.',
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
                            `Excluir o encontro "${encounter.name}"? Esta ação não pode ser desfeita.`,
                          )
                        ) {
                          void remove(encounter.id)
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
