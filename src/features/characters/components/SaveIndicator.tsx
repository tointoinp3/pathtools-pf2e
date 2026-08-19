import type { SaveStatus } from '@/stores/characterStore'

const labels: Record<SaveStatus, string> = {
  idle: '',
  dirty: 'Alterações pendentes',
  saving: 'Salvando…',
  saved: 'Salvo',
  error: 'Erro ao salvar',
}

export function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null

  const color =
    status === 'error'
      ? 'border-danger/40 bg-danger/10 text-danger'
      : status === 'saved'
        ? 'border-success/40 bg-success/10 text-success'
        : status === 'saving'
          ? 'border-accent/40 bg-accent/10 text-accent'
          : 'border-border bg-surface-3 text-text-dim'

  return (
    <span
      className={`rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors ${color}`}
      aria-live="polite"
    >
      {labels[status]}
    </span>
  )
}
