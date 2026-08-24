import type { ReactNode } from 'react'
import type { InlineToken, MarkdownBlock } from '../markdown'
import {
  findNoteByTitle,
  parseMarkdown,
  serializeInline,
} from '../markdown'
import type { WorldNote } from '@/types'
import { VisualTable } from './VisualTable'

function Inline({
  tokens,
  notes,
  onOpen,
  onCreate,
}: {
  tokens: InlineToken[]
  notes: readonly WorldNote[]
  onOpen: (note: WorldNote) => void
  onCreate?: (title: string) => void
}) {
  return (
    <>
      {tokens.map((token, index) => {
        if (token.type === 'text') return <span key={index}>{token.text}</span>
        if (token.type === 'bold') return <strong key={index}>{token.text}</strong>
        if (token.type === 'italic') return <em key={index}>{token.text}</em>
        if (token.type === 'strike') return <s key={index}>{token.text}</s>
        if (token.type === 'code') {
          return (
            <code
              key={index}
              className="rounded bg-surface-3 px-1 py-0.5 font-mono text-[0.9em]"
            >
              {token.text}
            </code>
          )
        }
        if (token.type === 'link') {
          return (
            <a
              key={index}
              href={token.href}
              target="_blank"
              rel="noreferrer"
              className="text-info underline decoration-dotted underline-offset-2"
            >
              {token.text}
            </a>
          )
        }
        const found = findNoteByTitle(notes, token.target)
        const label = token.alias || token.target
        if (found) {
          return (
            <button
              key={index}
              type="button"
              className="text-info underline decoration-dotted underline-offset-2"
              onClick={() => onOpen(found)}
            >
              {label}
            </button>
          )
        }
        return (
          <button
            key={index}
            type="button"
            title={
              onCreate
                ? `Criar nota “${token.target}”`
                : `Nota “${token.target}” ainda não existe`
            }
            className="text-danger/90 underline decoration-dotted underline-offset-2"
            onClick={() => onCreate?.(token.target)}
          >
            {label}
          </button>
        )
      })}
    </>
  )
}

const HEADING_CLASS: Record<1 | 2 | 3 | 4, string> = {
  1: 'font-display text-2xl font-semibold text-accent',
  2: 'font-display text-xl font-semibold text-accent/90',
  3: 'font-display text-lg font-semibold text-text',
  4: 'text-sm font-semibold uppercase tracking-wide text-text-muted',
}

function Block({
  block,
  notes,
  onOpen,
  onCreate,
  onToggleTask,
  taskOffset,
}: {
  block: MarkdownBlock
  notes: readonly WorldNote[]
  onOpen: (note: WorldNote) => void
  onCreate?: (title: string) => void
  onToggleTask?: (index: number) => void
  taskOffset: { value: number }
}) {
  const inline = (tokens: InlineToken[]) => (
    <Inline tokens={tokens} notes={notes} onOpen={onOpen} onCreate={onCreate} />
  )
  if (block.type === 'heading') {
    const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4'
    return <Tag className={`${HEADING_CLASS[block.level]} mt-4 mb-2 first:mt-0`}>{inline(block.inline)}</Tag>
  }
  if (block.type === 'paragraph') {
    return <p className="mb-3 leading-relaxed text-text">{inline(block.inline)}</p>
  }
  if (block.type === 'hr') {
    return <hr className="my-4 border-border" />
  }
  if (block.type === 'code') {
    return (
      <pre className="mb-3 overflow-x-auto rounded-lg bg-surface-3 px-3 py-2 font-mono text-xs text-text">
        {block.text}
      </pre>
    )
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="mb-3 border-l-2 border-accent/60 pl-3 text-text-muted italic">
        {block.lines.map((line, index) => (
          <p key={index} className="mb-1 last:mb-0">
            {inline(line)}
          </p>
        ))}
      </blockquote>
    )
  }
  if (block.type === 'table') {
    return (
      <VisualTable
        headers={block.headers.map((cell) => serializeInline(cell))}
        rows={block.rows.map((row) => row.map((cell) => serializeInline(cell)))}
        readOnly
      />
    )
  }
  const List = block.ordered ? 'ol' : 'ul'
  return (
    <List
      className={`mb-3 pl-5 ${block.ordered ? 'list-decimal' : 'list-disc'} space-y-1`}
    >
      {block.items.map((item, index) => {
        if (item.checked === null) {
          return <li key={index}>{inline(item.inline)}</li>
        }
        const taskIndex = taskOffset.value
        taskOffset.value += 1
        return (
          <li key={index} className="list-none">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggleTask?.(taskIndex)}
                className="mt-1"
              />
              <span className={item.checked ? 'text-text-dim line-through' : ''}>
                {inline(item.inline)}
              </span>
            </label>
          </li>
        )
      })}
    </List>
  )
}

export function MarkdownPreview({
  content,
  notes,
  onOpen,
  onCreate,
  onToggleTask,
  empty,
}: {
  content: string
  notes: readonly WorldNote[]
  onOpen: (note: WorldNote) => void
  onCreate?: (title: string) => void
  onToggleTask?: (index: number) => void
  empty?: ReactNode
}) {
  const blocks = parseMarkdown(content)
  if (blocks.length === 0) {
    return (
      <div className="text-sm text-text-dim">
        {empty ?? 'A prévia aparece aqui. Use [[colchetes duplos]] para ligar notas.'}
      </div>
    )
  }
  const taskOffset = { value: 0 }
  return (
    <div className="text-sm leading-relaxed">
      {blocks.map((block, index) => (
        <Block
          key={index}
          block={block}
          notes={notes}
          onOpen={onOpen}
          onCreate={onCreate}
          onToggleTask={onToggleTask}
          taskOffset={taskOffset}
        />
      ))}
    </div>
  )
}
