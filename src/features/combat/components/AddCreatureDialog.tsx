import { useEffect, useMemo, useRef, useState } from 'react'
import type { Creature, CreaturePowerVariant } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { listCreatures } from '@/engine/bestiaryCatalog'
import { customToken, findFreeSpot, nextTokenName } from '@/engine/combat'
import { SIZE_LABELS } from '@/utils/labels'
import { useCombatStore } from '@/stores/combatStore'
import { buildCreatureTokens } from '@/features/combat/combatImport'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const RESULT_LIMIT = 60

export function AddCreatureDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [variant, setVariant] = useState<CreaturePowerVariant>('normal')
  const [quantity, setQuantity] = useState(1)
  const [customName, setCustomName] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const creatures = useMemo(() => listCreatures(), [])
  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return creatures.slice(0, RESULT_LIMIT)
    return creatures
      .filter((creature) =>
        normalize(
          `${creature.name} ${creature.originalName} ${creature.traits.join(' ')}`,
        ).includes(q),
      )
      .slice(0, RESULT_LIMIT)
  }, [creatures, query])

  useEffect(() => {
    searchRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  function handleAdd(creature: Creature) {
    const store = useCombatStore.getState()
    const session = store.current
    if (!session) return
    const qty = Math.max(1, Math.min(20, quantity))
    const tokens = buildCreatureTokens(session, [
      { creatureId: creature.id, variant, quantity: qty },
    ])
    store.addTokens(tokens)
    setFeedback(
      `${qty}× ${creature.name} no tabuleiro${
        variant === 'elite' ? ' (Elite)' : variant === 'weak' ? ' (Fraca)' : ''
      }.`,
    )
  }

  function handleAddCustom() {
    const store = useCombatStore.getState()
    const session = store.current
    if (!session) return
    const spot = findFreeSpot(
      session.tokens,
      session.gridCols,
      session.gridRows,
      1,
      1,
    )
    const name = nextTokenName(
      customName.trim() || 'Ficha avulsa',
      session.tokens.map((token) => token.name),
    )
    store.addTokens([customToken(name, spot)])
    setCustomName('')
    setFeedback(`“${name}” no tabuleiro.`)
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
        aria-labelledby="add-creature-title"
        className="flex max-h-[min(38rem,90vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-3">
          <h2
            id="add-creature-title"
            className="font-display text-lg font-semibold tracking-wide text-accent"
          >
            Adicionar fichas do bestiário
          </h2>
          <div className="mt-2 flex gap-2">
            <Input
              ref={searchRef}
              type="search"
              placeholder="Buscar criatura ou traço…"
              aria-label="Buscar criatura"
              className="flex-1"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Select
              aria-label="Variante"
              className="w-28"
              value={variant}
              onChange={(event) =>
                setVariant(event.target.value as CreaturePowerVariant)
              }
            >
              <option value="normal">Normal</option>
              <option value="elite">Elite</option>
              <option value="weak">Fraca</option>
            </Select>
            <Input
              type="number"
              aria-label="Quantidade"
              title="Quantas fichas adicionar por clique"
              className="w-16 text-center"
              min={1}
              max={20}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Math.round(Number(event.target.value)) || 1))
              }
            />
          </div>
          {feedback ? (
            <p className="mt-1.5 text-[11px] text-success">{feedback}</p>
          ) : (
            <p className="mt-1.5 text-[11px] text-text-dim">
              Clique em uma criatura para colocá-la no tabuleiro. O diálogo
              fica aberto para adicionar várias.
            </p>
          )}
        </div>

        <ul className="min-h-0 flex-1 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-2 py-6 text-center text-sm text-text-dim">
              Nenhuma criatura para “{query}”.
            </li>
          ) : (
            filtered.map((creature) => (
              <li key={creature.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left hover:bg-surface-2"
                  onClick={() => handleAdd(creature)}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-text">
                      {creature.name}
                    </span>
                    <span className="block truncate text-[11px] text-text-dim">
                      {creature.originalName} · {SIZE_LABELS[creature.size]}
                    </span>
                  </span>
                  <span className="shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-text-muted">
                    Nv {creature.level}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="border-t border-border/70 px-4 py-3">
          <div className="flex gap-2">
            <Input
              placeholder="Ficha avulsa (PJ, aliado, objeto…)"
              aria-label="Nome da ficha avulsa"
              value={customName}
              onChange={(event) => setCustomName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleAddCustom()
              }}
            />
            <Button size="sm" onClick={handleAddCustom}>
              + Avulsa
            </Button>
            <Button size="sm" variant="accent" onClick={onClose}>
              Concluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
