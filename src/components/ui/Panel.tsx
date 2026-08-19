import { useState, type ReactNode } from 'react'

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className = '',
  bodyClassName = '',
  quiet,
  compact,
  collapsible = false,
  defaultOpen = true,
}: {
  title?: string
  subtitle?: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
  /** Classes no bloco do conteúdo (ex.: overflow para painéis altos). */
  bodyClassName?: string
  quiet?: boolean
  compact?: boolean
  /** Cabeçalho abre/fecha o conteúdo. */
  collapsible?: boolean
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const showBody = !collapsible || open

  return (
    <section
      className={`rounded-xl border border-border/90 bg-surface-1 ${
        quiet ? '' : 'shadow-[0_4px_20px_rgba(0,0,0,0.18)]'
      } ${className}`}
    >
      {(title || actions) && (
        <header
          className={`flex shrink-0 items-center justify-between gap-2 ${
            showBody ? 'border-b border-border/50' : ''
          } ${compact ? 'px-2.5 py-1.5' : 'px-3 py-2'}`}
        >
          {collapsible && title ? (
            <button
              type="button"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              className="flex min-w-0 flex-1 items-center justify-between gap-2 text-left"
            >
              <h2 className="min-w-0 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
                {title}
                {subtitle ? (
                  <span className="ml-2 font-sans text-xs font-normal normal-case tracking-normal text-text-dim">
                    {subtitle}
                  </span>
                ) : null}
              </h2>
              <span
                className="shrink-0 text-[10px] text-text-dim"
                aria-hidden
              >
                {open ? '▾' : '▸'}
              </span>
            </button>
          ) : (
            <div className="min-w-0">
              {title ? (
                <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
                  {title}
                  {subtitle ? (
                    <span className="ml-2 font-sans text-xs font-normal normal-case tracking-normal text-text-dim">
                      {subtitle}
                    </span>
                  ) : null}
                </h2>
              ) : (
                <span />
              )}
            </div>
          )}
          {actions}
        </header>
      )}
      {showBody ? (
        <div className={`${compact ? 'p-2' : 'p-3'} ${bodyClassName}`}>
          {children}
        </div>
      ) : null}
    </section>
  )
}

/** Célula de faixa contínua (sem gap entre vizinhas) */
export function StatBox({
  label,
  value,
  hint,
  provisional,
  action,
  pending,
  detail,
  className = '',
  flush,
}: {
  label: string
  value: string | number
  hint?: string
  provisional?: boolean
  action?: ReactNode
  pending?: boolean
  detail?: string
  className?: string
  /** Sem borda/radius próprios — para usar dentro de StatStrip */
  flush?: boolean
}) {
  return (
    <div
      className={`group relative flex min-w-0 flex-col items-center justify-center px-1.5 py-1.5 text-center transition-colors hover:bg-accent/8 ${
        flush
          ? 'h-full flex-1 bg-transparent'
          : 'rounded-lg border border-border/70 bg-surface-2/70 hover:border-accent/40'
      } ${pending ? 'opacity-75' : ''} ${className}`}
      aria-label={hint}
    >
      <div className="text-xs font-semibold uppercase tracking-[0.08em] text-text-dim">
        {label}
        {provisional ? <span className="text-accent/70">*</span> : null}
      </div>
      <div className="font-display text-base font-semibold tabular-nums leading-none text-text sm:text-lg">
        {value}
      </div>
      {detail && (
        <div className="mt-0.5 truncate text-xs leading-tight text-text-dim">
          {detail}
        </div>
      )}
      {action && (
        <div className="mt-0.5 flex justify-center opacity-45 transition-opacity group-hover:opacity-100">
          {action}
        </div>
      )}
    </div>
  )
}

/** Faixa única sem buracos entre células */
export function StatStrip({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`flex overflow-hidden rounded-xl border border-border/90 bg-surface-2/40 divide-x divide-border/70 ${className}`}
    >
      {children}
    </div>
  )
}

export function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-1.5 text-xs leading-relaxed text-text-muted">
      {children}
    </div>
  )
}
