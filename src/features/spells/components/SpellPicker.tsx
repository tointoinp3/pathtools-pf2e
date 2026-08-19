import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { Spell } from '@/types'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Input } from '@/components/ui/Field'
import { spellMatchesQuery, spellRankLabel } from '@/features/spells/spellUi'
import { FilterCount } from '@/components/ui/FilterCount'

export function SpellPicker({
  spells,
  value,
  onChange,
  emptyLabel = '— vazio —',
  disabled,
  heightenRank,
  onNameClick,
}: {
  spells: Spell[]
  value: string | null
  onChange: (id: string | null) => void
  emptyLabel?: string
  disabled?: boolean
  /** Posto do espaço — marca magias elevadas. */
  heightenRank?: number
  /** Clique no nome (com magia escolhida) — ex.: abrir o texto. */
  onNameClick?: () => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const selected = spells.find((s) => s.id === value) ?? null
  const nameOpensList = !onNameClick || !selected

  function toggleList() {
    setOpen((v) => !v)
  }

  const filtered = useMemo(
    () => spells.filter((s) => spellMatchesQuery(s, query)),
    [spells, query],
  )

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function pick(id: string | null) {
    onChange(id)
    setOpen(false)
    setQuery('')
  }

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <div className="flex w-full min-w-0 items-stretch overflow-hidden rounded-lg border border-border bg-surface-3 transition-colors focus-within:border-accent/50">
        <button
          type="button"
          disabled={disabled}
          title={
            selected && onNameClick
              ? 'Ver o que a magia faz'
              : undefined
          }
          onClick={() => {
            if (nameOpensList) toggleList()
            else onNameClick?.()
          }}
          className="flex min-w-0 flex-1 items-center gap-1.5 px-2.5 py-1.5 text-left text-xs outline-none hover:bg-surface-2 disabled:opacity-40"
        >
          <span className="flex min-w-0 items-center gap-1.5 truncate">
            {selected ? (
              <>
                {selected.actionType ? (
                  <ActionCost type={selected.actionType} />
                ) : null}
                <span className="truncate font-medium text-text">
                  {selected.name}
                </span>
                {heightenRank != null && selected.rank < heightenRank ? (
                  <span className="shrink-0 text-[10px] text-text-dim">
                    elevada
                  </span>
                ) : null}
              </>
            ) : (
              <span className="text-text-dim">{emptyLabel}</span>
            )}
          </span>
        </button>
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label="Escolher magia"
          title="Escolher magia"
          onClick={toggleList}
          className="shrink-0 border-l border-border/70 px-2 text-text-dim outline-none hover:bg-surface-2 hover:text-text disabled:opacity-40"
        >
          {open ? '▴' : '▾'}
        </button>
      </div>

      {open && (
        <div
          id={listId}
          role="listbox"
          className="absolute z-30 mt-1 w-full min-w-[16rem] animate-fade-up overflow-hidden rounded-lg border border-border bg-surface-2 shadow-[var(--shadow-panel)]"
        >
          <div className="border-b border-border/60 p-1.5">
            <Input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar magia…"
              className="px-2 py-1 text-xs"
            />
            <FilterCount
              shown={filtered.length}
              total={spells.length}
              className="mt-1 px-0.5"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            <button
              type="button"
              role="option"
              aria-selected={!value}
              onClick={() => pick(null)}
              className={`flex w-full items-center px-3 py-2 text-left text-xs hover:bg-surface-3 ${
                !value ? 'bg-surface-3 text-accent' : 'text-text-muted'
              }`}
            >
              {emptyLabel}
            </button>
            {filtered.map((sp) => {
              const active = value === sp.id
              const heightened =
                heightenRank != null && sp.rank < heightenRank
              return (
                <button
                  key={sp.id}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => pick(sp.id)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs hover:bg-surface-3 ${
                    active ? 'bg-accent/10 text-accent' : 'text-text-muted'
                  }`}
                >
                  {sp.actionType ? <ActionCost type={sp.actionType} /> : null}
                  <span className="min-w-0 flex-1 truncate font-medium text-text">
                    {sp.name}
                  </span>
                  <span className="shrink-0 text-[10px] text-text-dim">
                    {heightened
                      ? `${spellRankLabel(sp.rank)} → ${heightenRank}`
                      : spellRankLabel(sp.rank)}
                  </span>
                </button>
              )
            })}
            {filtered.length === 0 && (
              <p className="px-3 py-3 text-center text-[11px] text-text-dim">
                Nenhuma magia neste filtro.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
