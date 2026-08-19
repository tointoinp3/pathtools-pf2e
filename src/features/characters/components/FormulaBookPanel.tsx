import { useMemo, useState } from 'react'
import type { ItemDefinition } from '@/types'
import { listItemDefinitions } from '@/engine/equipmentCatalog'
import { formatPriceCp } from '@/engine/equipment'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { FilterCount } from '@/components/ui/FilterCount'

interface FormulaBookPanelProps {
  knownIds: string[]
  characterLevel: number
  onChange: (ids: string[]) => void
}

const FORMULA_CATEGORIES = new Set(['alchemical', 'snare'])

export function FormulaBookPanel({
  knownIds,
  characterLevel,
  onChange,
}: FormulaBookPanelProps) {
  const [search, setSearch] = useState('')
  const searchRef = useSlashSearch()
  const known = useMemo(() => new Set(knownIds), [knownIds])

  const pool = useMemo(
    () =>
      listItemDefinitions()
        .filter((item) => {
          if (!FORMULA_CATEGORIES.has(item.category)) return false
          if ((item.level ?? 0) > characterLevel) return false
          return true
        })
        .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name, 'pt-BR')),
    [characterLevel],
  )

  const catalog = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return pool
    return pool.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.originalName.toLowerCase().includes(q),
    )
  }, [search, pool])

  const knownItems = useMemo(
    () =>
      knownIds
        .map((id) => listItemDefinitions().find((item) => item.id === id))
        .filter((item): item is ItemDefinition => Boolean(item)),
    [knownIds],
  )

  function toggle(id: string) {
    if (known.has(id)) onChange(knownIds.filter((x) => x !== id))
    else onChange([...knownIds, id])
  }

  return (
    <Panel
      title="Livro de fórmulas"
      subtitle={`${knownIds.length} conhecidas · alquimia, ciladas e ofício`}
      collapsible
      defaultOpen={false}
    >
      <Tip>
        Alquimista, inventor e feitos de Criação Alquímica pedem fórmulas
        anotadas. Marque o que o personagem conhece — o motor não escolhe.
      </Tip>
      {knownItems.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {knownItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className="rounded-full border border-accent/40 bg-accent/15 px-2 py-0.5 text-[11px] text-accent hover:bg-accent/25"
              onClick={() => toggle(item.id)}
            >
              {item.name} ×
            </button>
          ))}
        </div>
      ) : null}
      <Input
        ref={searchRef}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar fórmula…"
        aria-label="Buscar fórmula"
      />
      <FilterCount shown={catalog.length} total={pool.length} className="mt-1" />
      <ul className="mt-2 max-h-64 overflow-y-auto">
        {catalog.slice(0, 80).map((item) => {
          const selected = known.has(item.id)
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className={`flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left text-sm ${
                  selected
                    ? 'bg-accent/15 text-accent'
                    : 'hover:bg-surface-3'
                }`}
              >
                <span>
                  {item.name}
                  <span className="ml-1.5 text-[11px] text-text-dim">
                    nv. {item.level}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] text-text-dim">
                  {formatPriceCp(item.priceCp)}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      {search.trim() ? (
        <Button
          size="sm"
          variant="secondary"
          className="mt-2"
          onClick={() => setSearch('')}
        >
          Limpar busca
        </Button>
      ) : null}
    </Panel>
  )
}
