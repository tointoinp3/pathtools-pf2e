import type { ReactNode } from 'react'

export interface DataTableColumn {
  key: string
  label: string
  align?: 'left' | 'center' | 'right'
}

export interface DataTableRow {
  key: string
  cells: ReactNode[]
  highlighted?: boolean
}

export function DataTable({
  columns,
  rows,
  caption,
  empty,
  compact,
}: {
  columns: DataTableColumn[]
  rows: DataTableRow[]
  caption?: string
  empty?: string
  compact?: boolean
}) {
  const alignClass = (align?: DataTableColumn['align']) =>
    align === 'center'
      ? 'text-center'
      : align === 'right'
        ? 'text-right'
        : 'text-left'

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-surface-1">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-surface-2/80">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`sticky top-0 whitespace-nowrap px-2 py-1.5 font-display text-[9px] font-semibold uppercase tracking-[0.12em] text-accent/90 ${
                    compact ? 'px-1.5 py-1' : ''
                  } ${alignClass(col.align)}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-6 text-center text-sm text-text-dim"
                >
                  {empty ?? 'Nada nesta tabela.'}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.key}
                  className={`border-b border-border/50 last:border-b-0 ${
                    row.highlighted
                      ? 'bg-accent/15 text-text'
                      : 'text-text-muted hover:bg-surface-2/60'
                  }`}
                >
                  {row.cells.map((cell, i) => {
                    const col = columns[i]
                    const isFirst = i === 0
                    return (
                      <td
                        key={`${row.key}-${col?.key ?? i}`}
                        className={`${
                          compact
                            ? 'px-1.5 py-0.5 text-[11px]'
                            : 'px-2 py-1 text-xs'
                        } ${alignClass(col?.align)} ${
                          isFirst
                            ? 'font-medium tabular-nums text-text'
                            : 'tabular-nums'
                        }`}
                      >
                        {cell === '' || cell == null ? (
                          <span className="text-text-dim">—</span>
                        ) : (
                          cell
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {caption ? (
        <p className="border-t border-border/60 bg-surface-2/40 px-3 py-2 text-[11px] leading-relaxed text-text-dim">
          {caption}
        </p>
      ) : null}
    </div>
  )
}
