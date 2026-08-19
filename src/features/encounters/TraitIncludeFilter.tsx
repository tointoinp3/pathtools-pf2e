import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'

export interface TraitIncludeOption {
  value: string
  label: string
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

/**
 * `null` = todos os traços (padrão). `[]` = nenhum.
 * A criatura entra no sorteio se tiver ao menos um traço marcado.
 */
export function TraitIncludeFilter({
  options,
  selected,
  onChange,
}: {
  options: TraitIncludeOption[]
  selected: string[] | null
  onChange: (next: string[] | null) => void
}) {
  const [query, setQuery] = useState('')
  const allValues = useMemo(
    () => options.map((option) => option.value),
    [options],
  )
  const isAll = selected == null
  const selectedCount = isAll ? options.length : selected.length

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return options
    return options.filter(
      (option) =>
        normalize(option.label).includes(q) ||
        normalize(option.value).includes(q),
    )
  }, [options, query])

  function isOn(value: string): boolean {
    if (isAll) return true
    return selected.includes(value)
  }

  function toggle(value: string) {
    if (isAll) {
      onChange(allValues.filter((entry) => entry !== value))
      return
    }
    if (selected.includes(value)) {
      onChange(selected.filter((entry) => entry !== value))
      return
    }
    const next = [...selected, value]
    if (next.length === allValues.length) onChange(null)
    else onChange(next)
  }

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          Incluir traços
        </span>
        <span className="text-[10px] text-text-dim">
          {isAll
            ? `Todos (${options.length})`
            : selectedCount === 0
              ? 'Nenhum'
              : `${selectedCount} de ${options.length}`}
        </span>
      </div>
      <div className="mb-2 flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant={isAll ? 'accent' : 'secondary'}
          onClick={() => onChange(null)}
          disabled={isAll || options.length === 0}
        >
          Selecionar tudo
        </Button>
        <Button
          size="sm"
          onClick={() => onChange([])}
          disabled={!isAll && selected.length === 0}
        >
          Desselecionar tudo
        </Button>
      </div>
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar traço… ex.: goblin, dragão"
        aria-label="Buscar traço"
        className="mb-2"
      />
      {options.length === 0 ? (
        <p className="text-[11px] text-text-dim">Nenhum traço no catálogo.</p>
      ) : visible.length === 0 ? (
        <p className="text-[11px] text-text-dim">
          Nenhum traço para “{query}”.
        </p>
      ) : (
        <div className="max-h-52 overflow-y-auto rounded-lg border border-border/70 bg-surface-2/40 p-1.5">
          <div className="flex flex-wrap gap-1">
            {visible.map((option) => {
              const on = isOn(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  title={option.value}
                  onClick={() => toggle(option.value)}
                  className={`inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
                    on
                      ? 'border-accent/50 bg-accent/15 text-accent'
                      : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
                  }`}
                >
                  {on ? <span className="mr-1 text-accent">✓</span> : null}
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
      <p className="mt-1.5 text-[11px] text-text-dim">
        {selectedCount === 0
          ? 'Nenhum traço marcado: o sorteio não encontra criatura. Aperte Selecionar tudo ou marque os que quiser (Goblin, Dragão…).'
          : 'A criatura entra se tiver ao menos um dos traços marcados. Padrão: todos. Desselecione tudo para escolher do zero.'}
      </p>
    </div>
  )
}
