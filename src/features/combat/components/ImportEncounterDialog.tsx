import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { EncounterPlan } from '@/types'
import { Button } from '@/components/ui/Button'
import { combatThreatLabel } from '@/engine/encounterGenerator'
import { listEncounters } from '@/features/encounters/encounterRepository'
import { useCombatStore } from '@/stores/combatStore'
import { buildCreatureTokens } from '@/features/combat/combatImport'

function linesSummary(plan: EncounterPlan): string {
  return plan.lines
    .map(
      (line) =>
        `${line.quantity}× ${line.name}${
          line.variant === 'elite'
            ? ' (Elite)'
            : line.variant === 'weak'
              ? ' (Fraca)'
              : ''
        }`,
    )
    .join(', ')
}

export function ImportEncounterDialog({ onClose }: { onClose: () => void }) {
  const [encounters, setEncounters] = useState<EncounterPlan[] | null>(null)

  useEffect(() => {
    void listEncounters().then(setEncounters)
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleImport(plan: EncounterPlan) {
    const store = useCombatStore.getState()
    const session = store.current
    if (!session) return
    const tokens = buildCreatureTokens(
      session,
      plan.lines.map((line) => ({
        creatureId: line.creatureId,
        variant: line.variant,
        quantity: line.quantity,
      })),
    )
    store.addTokens(tokens)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-encounter-title"
        className="flex max-h-[min(34rem,90vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-3">
          <h2
            id="import-encounter-title"
            className="font-display text-lg font-semibold tracking-wide text-accent"
          >
            Importar encontro salvo
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Todas as criaturas do encontro entram no tabuleiro de uma vez,
            já numeradas e com PV e tamanho corretos.
          </p>
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto p-2">
          {encounters == null ? (
            <li className="px-2 py-6 text-center text-sm text-text-dim">
              Carregando encontros…
            </li>
          ) : encounters.length === 0 ? (
            <li className="px-2 py-6 text-center text-sm text-text-dim">
              Nenhum encontro salvo.{' '}
              <Link
                to="/bestiario/encontros/novo"
                className="text-info hover:underline"
                onClick={onClose}
              >
                Criar um encontro
              </Link>
              .
            </li>
          ) : (
            encounters.map((plan) => {
              const qty = plan.lines.reduce(
                (sum, line) => sum + line.quantity,
                0,
              )
              return (
                <li key={plan.id}>
                  <div className="flex items-center gap-2 rounded-lg px-2.5 py-2 hover:bg-surface-2">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-text">
                        {plan.name}
                      </div>
                      <div className="truncate text-[11px] text-text-dim">
                        Nível {plan.partyLevel} ·{' '}
                        {combatThreatLabel(plan.threat)} · {qty} criatura
                        {qty === 1 ? '' : 's'}
                      </div>
                      {plan.lines.length > 0 ? (
                        <div className="mt-0.5 truncate text-[11px] text-text-muted">
                          {linesSummary(plan)}
                        </div>
                      ) : null}
                    </div>
                    <Button
                      size="sm"
                      variant="accent"
                      disabled={qty === 0}
                      onClick={() => handleImport(plan)}
                    >
                      Importar
                    </Button>
                  </div>
                </li>
              )
            })
          )}
        </ul>

        <div className="flex justify-end border-t border-border/70 px-4 py-2.5">
          <Button size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}
