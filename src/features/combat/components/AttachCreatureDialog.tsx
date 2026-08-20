import { useEffect, useMemo, useState } from 'react'
import type { Creature } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { listCreatures } from '@/engine/bestiaryCatalog'
import { SIZE_LABELS } from '@/utils/labels'
import { getTokenImage } from '@/features/combat/combatImageRepository'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function AttachCreatureDialog({
  onClose,
  onPick,
  busy,
}: {
  onClose: () => void
  onPick: (creature: Creature) => void
  busy?: boolean
}) {
  const [query, setQuery] = useState('')
  const [hasImage, setHasImage] = useState<Record<string, boolean>>({})
  const catalog = useMemo(() => listCreatures(), [])

  const matches = useMemo(() => {
    const q = normalize(query.trim())
    if (q.length < 2) return catalog.slice(0, 40)
    return catalog
      .filter((creature) => {
        const hay = normalize(
          [
            creature.name,
            creature.originalName,
            ...creature.traits,
            SIZE_LABELS[creature.size],
          ].join(' '),
        )
        return hay.includes(q)
      })
      .slice(0, 80)
  }, [catalog, query])

  useEffect(() => {
    let cancelled = false
    void Promise.all(
      matches.slice(0, 40).map(async (creature) => {
        const record = await getTokenImage('creature', creature.id)
        return [creature.id, Boolean(record)] as const
      }),
    ).then((rows) => {
      if (cancelled) return
      setHasImage((prev) => {
        const next = { ...prev }
        for (const [id, value] of rows) next[id] = value
        return next
      })
    })
    return () => {
      cancelled = true
    }
  }, [matches])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
      role="presentation"
      onClick={() => {
        if (!busy) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="attach-token-title"
        className="flex max-h-[min(36rem,80vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-3">
          <h2
            id="attach-token-title"
            className="font-display text-lg font-semibold tracking-wide text-accent"
          >
            Atrelar ao bestiário
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Sempre que essa criatura entrar no grid, o token aparece.
          </p>
          <Input
            className="mt-2"
            type="search"
            autoComplete="off"
            placeholder="Buscar criatura…"
            aria-label="Buscar criatura"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <ul className="min-h-0 flex-1 overflow-y-auto p-2">
          {matches.map((creature) => (
            <li key={creature.id}>
              <button
                type="button"
                disabled={busy}
                className="flex w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left hover:bg-surface-3 disabled:opacity-50"
                onClick={() => onPick(creature)}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-text">
                    {creature.name}
                  </span>
                  <span className="text-[11px] text-text-dim">
                    nv. {creature.level} · {SIZE_LABELS[creature.size]}
                    {hasImage[creature.id] ? ' · já tem token' : ''}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        {query.trim().length > 0 && query.trim().length < 2 ? (
          <p className="px-4 pb-2 text-[11px] text-text-dim">
            Digite ao menos 2 letras para filtrar o catálogo.
          </p>
        ) : null}
        <div className="flex justify-end border-t border-border/70 px-3 py-2.5">
          <Button size="sm" disabled={busy} onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
