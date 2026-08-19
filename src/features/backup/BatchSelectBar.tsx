import { Button } from '@/components/ui/Button'
import type { ReactNode } from 'react'

export function BatchSelectBar({
  selectedCount,
  totalCount,
  nounOne,
  nounMany,
  onSelectAll,
  onClear,
  onExport,
  exportBusy,
  children,
}: {
  selectedCount: number
  totalCount: number
  nounOne: string
  nounMany: string
  onSelectAll: () => void
  onClear: () => void
  onExport: () => void
  exportBusy?: boolean
  children?: ReactNode
}) {
  if (totalCount === 0) return null
  const noun = selectedCount === 1 ? nounOne : nounMany
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-1 px-3 py-2">
      <span className="text-xs text-text-dim">
        {selectedCount} {noun} selecionado{selectedCount === 1 ? '' : 's'}
        {totalCount !== selectedCount ? ` · ${totalCount} no total` : ''}
      </span>
      <Button size="sm" onClick={onSelectAll}>
        Selecionar visíveis
      </Button>
      <Button size="sm" disabled={selectedCount === 0} onClick={onClear}>
        Limpar
      </Button>
      <Button
        size="sm"
        variant="accent"
        disabled={selectedCount === 0 || exportBusy}
        onClick={onExport}
      >
        {exportBusy
          ? 'Aguarde…'
          : selectedCount === 0
            ? 'Exportar selecionados'
            : `Exportar ${selectedCount} JSON`}
      </Button>
      {children}
    </div>
  )
}
