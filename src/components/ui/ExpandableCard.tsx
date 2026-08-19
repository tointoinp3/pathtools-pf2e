import { useState, type ReactNode } from 'react'

export function ExpandableCard({
  title,
  subtitle,
  badges,
  actions,
  toolbar,
  children,
  lazyBody,
  defaultOpen = false,
  selected = false,
  className = '',
  compact,
}: {
  title: ReactNode
  subtitle?: ReactNode
  badges?: ReactNode
  /** Controles à direita do cabeçalho — o clique não abre/fecha o texto. */
  actions?: ReactNode
  /** Rolagens visíveis sem abrir o card. */
  toolbar?: ReactNode
  children?: ReactNode
  /** Só monta o conteúdo quando o card abre (listas longas). */
  lazyBody?: () => ReactNode
  defaultOpen?: boolean
  selected?: boolean
  className?: string
  compact?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const hasBody = children != null || lazyBody != null

  return (
    <div
      className={`rounded-lg border transition-colors ${
        selected
          ? 'border-accent/50 bg-accent/12 shadow-[0_0_0_1px_rgba(212,168,75,0.18)]'
          : open
            ? 'border-accent/40 bg-accent/8'
            : 'border-border/70 bg-surface-2/40'
      } ${compact ? 'px-2.5 py-1.5' : 'px-2.5 py-2'} ${className}`}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          disabled={!hasBody}
          aria-expanded={hasBody ? open : undefined}
          onClick={() => {
            if (hasBody) setOpen((v) => !v)
          }}
          className="flex min-w-0 flex-1 items-start justify-between gap-2 text-left disabled:cursor-default"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-medium text-text">{title}</span>
              {badges}
            </div>
            {subtitle ? (
              <div className="mt-0.5 text-[10px] leading-snug text-text-dim">
                {subtitle}
              </div>
            ) : null}
          </div>
          {hasBody ? (
            <span
              className="mt-0.5 shrink-0 text-[10px] text-text-dim"
              aria-hidden
            >
              {open ? '▾' : '▸'}
            </span>
          ) : null}
        </button>
        {actions ? (
          <div className="shrink-0 pt-0.5">{actions}</div>
        ) : null}
      </div>
      {toolbar ? (
        <div className="mt-1.5 empty:hidden">{toolbar}</div>
      ) : null}
      {open && hasBody ? (
        <div className="mt-1.5 space-y-1.5 text-xs leading-relaxed text-text-muted">
          {children ?? lazyBody?.()}
        </div>
      ) : null}
    </div>
  )
}
