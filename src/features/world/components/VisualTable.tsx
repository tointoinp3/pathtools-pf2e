import { useState } from 'react'

export function VisualTable({
  headers,
  rows,
  onChange,
  readOnly = false,
}: {
  headers: string[]
  rows: string[][]
  onChange?: (headers: string[], rows: string[][]) => void
  readOnly?: boolean
}) {
  const [focus, setFocus] = useState<{ row: number; col: number } | null>(null)
  const cols = Math.max(
    1,
    headers.length,
    ...rows.map((row) => row.length),
  )
  const body = rows.length > 0 ? rows : [Array.from({ length: cols }, () => '')]

  function padRow(row: string[]): string[] {
    const next = [...row]
    while (next.length < cols) next.push('')
    return next.slice(0, cols)
  }

  function commit(nextHeaders: string[], nextRows: string[][]) {
    onChange?.(nextHeaders, nextRows)
  }

  function setCell(row: number, col: number, value: string) {
    if (row < 0) {
      const next = [...headers]
      while (next.length <= col) next.push('')
      next[col] = value
      commit(next, body.map(padRow))
      return
    }
    const nextRows = body.map((entry, index) => {
      const padded = padRow(entry)
      if (index !== row) return padded
      padded[col] = value
      return padded
    })
    const nextHeaders = [...headers]
    while (nextHeaders.length < cols) nextHeaders.push('')
    commit(nextHeaders, nextRows)
  }

  function addColumn(after = (focus?.col ?? cols - 1)) {
    const at = after + 1
    const nextHeaders = [...headers]
    while (nextHeaders.length < cols) nextHeaders.push('')
    nextHeaders.splice(at, 0, '')
    const nextRows = body.map((row) => {
      const padded = padRow(row)
      padded.splice(at, 0, '')
      return padded
    })
    commit(nextHeaders, nextRows)
  }

  function addRow(after = body.length - 1) {
    const next = body.map(padRow)
    next.splice(after + 1, 0, Array.from({ length: cols }, () => ''))
    const nextHeaders = [...headers]
    while (nextHeaders.length < cols) nextHeaders.push('')
    commit(nextHeaders, next)
  }

  function removeColumn(col: number) {
    if (cols <= 1) return
    commit(
      headers.filter((_, index) => index !== col),
      body.map((row) => padRow(row).filter((_, index) => index !== col)),
    )
  }

  function removeRow(row: number) {
    if (body.length <= 1) return
    commit(
      headers.length > 0 ? headers : [''],
      body.filter((_, index) => index !== row),
    )
  }

  function cell(row: number, col: number, value: string, header: boolean) {
    if (readOnly) {
      const Tag = header ? 'th' : 'td'
      return (
        <Tag
          key={`${row}-${col}`}
          className={`border border-border/80 px-2.5 py-1.5 text-sm ${
            header ? 'bg-surface-3/70 font-semibold text-accent' : 'text-text'
          }`}
        >
          {value || (header ? '' : '')}
        </Tag>
      )
    }
    return (
      <td
        key={`${row}-${col}`}
        className={`relative border border-border/80 p-0 ${
          header ? 'bg-surface-3/70' : 'bg-surface-1'
        }`}
      >
        <input
          value={value}
          aria-label={
            header ? `Cabeçalho ${col + 1}` : `Célula ${row + 1}, ${col + 1}`
          }
          onFocus={() => setFocus({ row, col })}
          onChange={(event) => setCell(row, col, event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Tab' && !event.shiftKey) {
              const last = col === cols - 1 && row === body.length - 1
              if (last && row >= 0) {
                event.preventDefault()
                addRow(row)
              }
            }
            if (event.key === 'Enter' && !event.shiftKey && row >= 0) {
              event.preventDefault()
              addRow(row)
            }
          }}
          className={`w-full min-w-28 bg-transparent px-2.5 py-1.5 text-sm outline-none focus:bg-accent/10 ${
            header ? 'font-semibold text-accent' : 'text-text'
          }`}
        />
      </td>
    )
  }

  return (
    <div className="group/livetable relative mb-3 max-w-full">
      <div className="flex items-stretch overflow-x-auto">
        <table className="border-collapse text-left">
          <thead>
            <tr>
              {Array.from({ length: cols }, (_, col) =>
                cell(-1, col, headers[col] ?? '', true),
              )}
            </tr>
          </thead>
          <tbody>
            {body.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: cols }, (_, col) =>
                  cell(rowIndex, col, padRow(row)[col] ?? '', false),
                )}
                {!readOnly && (
                  <td className="w-6 border-none p-0 align-middle">
                    <button
                      type="button"
                      title="Remover linha"
                      className="ml-1 hidden h-5 w-5 items-center justify-center rounded text-[11px] text-text-dim group-hover/livetable:flex hover:bg-surface-3 hover:text-danger"
                      onClick={() => removeRow(rowIndex)}
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {!readOnly && (
          <button
            type="button"
            title="Inserir coluna à direita"
            className="live-table-plus ml-1 flex w-7 shrink-0 items-center justify-center self-stretch rounded-md text-lg text-text-dim hover:bg-accent/15 hover:text-accent"
            onClick={() => addColumn()}
          >
            +
          </button>
        )}
      </div>
      {!readOnly && (
        <div className="mt-1 flex items-center gap-1">
          <button
            type="button"
            title="Inserir linha abaixo"
            className="live-table-plus flex h-7 flex-1 items-center justify-center rounded-md text-lg text-text-dim hover:bg-accent/15 hover:text-accent"
            onClick={() => addRow()}
          >
            +
          </button>
          {cols > 1 && (
            <button
              type="button"
              title="Remover última coluna"
              className="live-table-plus hidden h-7 items-center rounded-md px-2 text-[11px] text-text-dim group-hover/livetable:flex hover:text-danger"
              onClick={() => removeColumn(cols - 1)}
            >
              − Coluna
            </button>
          )}
        </div>
      )}
    </div>
  )
}
