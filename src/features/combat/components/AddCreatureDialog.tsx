import { useEffect, useMemo, useRef, useState } from 'react'
import type { Creature, CreaturePowerVariant } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
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

function creatureHaystack(creature: Creature): string {
  return normalize(
    [
      creature.name,
      creature.originalName,
      ...creature.traits,
      `nv ${creature.level}`,
      `nivel ${creature.level}`,
      SIZE_LABELS[creature.size],
    ].join(' '),
  )
}

const ROW_H = 52

function CreaturePickList({
  creatures,
  onAdd,
}: {
  creatures: Creature[]
  onAdd: (creature: Creature) => void
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [viewH, setViewH] = useState(360)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const sync = () => setViewH(el.clientHeight)
    sync()
    const observer = new ResizeObserver(sync)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0 })
    setScrollTop(0)
  }, [creatures])

  const overscan = 12
  const start = Math.max(0, Math.floor(scrollTop / ROW_H) - overscan)
  const visible = Math.ceil(viewH / ROW_H) + overscan * 2
  const end = Math.min(creatures.length, start + visible)
  const slice = creatures.slice(start, end)

  return (
    <div
      ref={scrollerRef}
      className="min-h-0 flex-1 overflow-y-auto"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
    >
      <ul
        className="relative px-2 py-1"
        style={{ height: Math.max(ROW_H, creatures.length * ROW_H) }}
      >
        {slice.map((creature, index) => (
          <li
            key={creature.id}
            className="absolute right-2 left-2"
            style={{ top: (start + index) * ROW_H, height: ROW_H }}
          >
            <button
              type="button"
              className="flex h-full w-full items-center gap-2 rounded-lg px-2.5 text-left hover:bg-surface-2"
              onClick={() => onAdd(creature)}
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
        ))}
      </ul>
    </div>
  )
}

export function AddCreatureDialog({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [variant, setVariant] = useState<CreaturePowerVariant>('normal')
  const [quantity, setQuantity] = useState(1)
  const [customName, setCustomName] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  const catalog = useMemo(
    () =>
      listCreatures().map((creature) => ({
        creature,
        hay: creatureHaystack(creature),
      })),
    [],
  )

  const filtered = useMemo(() => {
    const words = normalize(query.trim())
      .split(/\s+/)
      .filter(Boolean)
    if (words.length === 0) return catalog.map((row) => row.creature)
    return catalog
      .filter((row) => words.every((word) => row.hay.includes(word)))
      .map((row) => row.creature)
  }, [catalog, query])

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
        className="flex max-h-[min(44rem,92vh)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-3">
          <h2
            id="add-creature-title"
            className="font-display text-lg font-semibold tracking-wide text-accent"
          >
            Adicionar fichas do bestiário
          </h2>
          <label
            htmlFor="combat-bestiary-search"
            className="mt-3 mb-1 block text-xs font-medium tracking-wide text-text-muted uppercase"
          >
            Pesquisar criatura
          </label>
          <Input
            id="combat-bestiary-search"
            ref={searchRef}
            type="search"
            autoComplete="off"
            className="min-w-0"
            placeholder="Nome, original, traço ou nível — ex.: goblin, wolf, 7…"
            aria-label="Pesquisar criatura"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return
              event.preventDefault()
              if (filtered[0]) handleAdd(filtered[0])
            }}
          />
          <div className="mt-2 flex gap-2">
            <Select
              aria-label="Variante"
              className="min-w-0 flex-1"
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
              className="w-20 text-center"
              min={1}
              max={20}
              value={quantity}
              onChange={(event) =>
                setQuantity(
                  Math.max(1, Math.round(Number(event.target.value)) || 1),
                )
              }
            />
          </div>
          <div className="mt-1.5 flex items-start justify-between gap-3">
            {feedback ? (
              <p className="text-[11px] text-success">{feedback}</p>
            ) : (
              <p className="text-[11px] text-text-dim">
                Clique numa criatura para colocá-la no tabuleiro. Enter adiciona
                o primeiro resultado. O diálogo fica aberto para várias.
              </p>
            )}
            <FilterCount
              shown={filtered.length}
              total={catalog.length}
              className="shrink-0 pt-0.5"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="min-h-0 flex-1 px-4 py-8 text-center text-sm text-text-dim">
            Nenhuma criatura para “{query.trim()}”.
          </p>
        ) : (
          <CreaturePickList creatures={filtered} onAdd={handleAdd} />
        )}

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
