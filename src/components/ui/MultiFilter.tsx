import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

export interface MultiFilterOption<T extends string> {
  value: T
  label: string
  tone?: string
  /** Se existir, o chip mostra o ícone no lugar do texto (o label vira o title). */
  icon?: ReactNode
}

interface MultiFilterProps<T extends string> {
  label: string
  options: MultiFilterOption<T>[]
  selected: T[]
  onChange: (next: T[]) => void
  /** Texto quando nada está selecionado (= mostrar tudo) */
  emptyLabel?: string
  className?: string
}

/** Filtro multi-seleção: clique marca/desmarca; vazio = todas. */
export function matchesSelected<T>(value: T, selected: T[]): boolean {
  return selected.length === 0 || selected.includes(value)
}

export function MultiFilter<T extends string>({
  label,
  options,
  selected,
  onChange,
  emptyLabel = 'Todas',
  className = '',
}: MultiFilterProps<T>) {
  const allSelected = selected.length === 0

  function toggle(value: T) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  function selectAll() {
    onChange([])
  }

  const summary = allSelected
    ? emptyLabel
    : selected
        .map((v) => options.find((o) => o.value === v)?.label ?? v)
        .join(', ')

  return (
    <div className={className}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          {label}
        </span>
        {!allSelected && (
          <button
            type="button"
            onClick={selectAll}
            className="text-[10px] text-text-dim hover:text-accent"
          >
            Limpar
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        <FilterChip
          selected={allSelected}
          onClick={selectAll}
          title="Mostrar todas as categorias"
        >
          {emptyLabel}
        </FilterChip>
        {options.map((opt) => {
          const isOn = selected.includes(opt.value)
          return (
            <FilterChip
              key={opt.value}
              selected={isOn}
              onClick={() => toggle(opt.value)}
              title={
                isOn
                  ? `Remover ${opt.label} do filtro`
                  : `Incluir ${opt.label}`
              }
            >
              {opt.icon ? (
                <>
                  {opt.icon}
                  <span className="sr-only">{opt.label}</span>
                </>
              ) : (
                opt.label
              )}
            </FilterChip>
          )
        })}
      </div>
      {!allSelected && (
        <div className="mt-1 truncate text-[10px] text-text-dim" title={summary}>
          Filtrando: {summary}
        </div>
      )}
    </div>
  )
}

function FilterChip({
  selected,
  onClick,
  children,
  title,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  title?: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
        selected
          ? 'border-accent/50 bg-accent/15 text-accent'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
      }`}
    >
      {selected && <span className="mr-1 text-accent">✓</span>}
      {children}
    </button>
  )
}

/** Dropdown multi-select com checkboxes (alternativa compacta). */
export function MultiSelectDropdown<T extends string>({
  label,
  options,
  selected,
  onChange,
  emptyLabel = 'Todas',
}: MultiFilterProps<T>) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const listId = useId()
  const allSelected = selected.length === 0

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

  const summary = allSelected
    ? emptyLabel
    : selected.length === 1
      ? (options.find((o) => o.value === selected[0])?.label ?? selected[0])
      : `${selected.length} selecionadas`

  function toggle(value: T) {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-left text-sm transition-colors hover:border-border-strong"
      >
        <span className="min-w-0 truncate">
          <span className="mr-1.5 text-[10px] uppercase text-text-dim">
            {label}
          </span>
          <span className={allSelected ? 'text-text-muted' : 'text-text'}>
            {summary}
          </span>
        </span>
        <span className="text-text-dim">{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-multiselectable
          className="absolute z-30 mt-1 max-h-72 w-full animate-fade-up overflow-y-auto rounded-lg border border-border bg-surface-2 shadow-[var(--shadow-panel)]"
        >
          <button
            type="button"
            role="option"
            aria-selected={allSelected}
            onClick={() => onChange([])}
            className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-surface-3 ${
              allSelected ? 'bg-surface-3 text-accent' : 'text-text-muted'
            }`}
          >
            <span className="w-4 text-center">{allSelected ? '✓' : ''}</span>
            {emptyLabel}
          </button>
          {options.map((opt) => {
            const isOn = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isOn}
                onClick={() => toggle(opt.value)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-surface-3 ${
                  isOn ? 'text-accent' : 'text-text-muted'
                }`}
              >
                <span
                  className={`flex h-3.5 w-3.5 items-center justify-center rounded border text-[9px] ${
                    isOn
                      ? 'border-accent bg-accent/20 text-accent'
                      : 'border-border'
                  }`}
                >
                  {isOn ? '✓' : ''}
                </span>
                {opt.icon ? (
                  <span className="inline-flex items-center gap-1.5">
                    {opt.icon}
                    <span className="sr-only">{opt.label}</span>
                  </span>
                ) : (
                  opt.label
                )}
              </button>
            )
          })}
          {!allSelected && (
            <div className="border-t border-border px-3 py-1.5 text-[10px] text-text-dim">
              Clique de novo para desmarcar · Esc fecha
            </div>
          )}
        </div>
      )}
    </div>
  )
}
