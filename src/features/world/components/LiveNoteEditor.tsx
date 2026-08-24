import { useEffect, useMemo, useRef, useState } from 'react'
import type { WorldNote } from '@/types'
import {
  contentToLiveBlocks,
  emptyTableBlock,
  filterSlashCommands,
  findNoteByTitle,
  liveBlocksToContent,
  nextLiveId,
  paragraphShortcut,
  parseInline,
  tsvToMarkdownTable,
  type LiveBlock,
} from '@/features/world/markdown'
import { filterNotes } from '@/features/world/noteTree'
import { VisualTable } from './VisualTable'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function markdownToHtml(text: string, notes: readonly WorldNote[]): string {
  return parseInline(text)
    .map((token) => {
      if (token.type === 'text') return escapeHtml(token.text)
      if (token.type === 'bold') return `<strong>${escapeHtml(token.text)}</strong>`
      if (token.type === 'italic') return `<em>${escapeHtml(token.text)}</em>`
      if (token.type === 'strike') return `<s>${escapeHtml(token.text)}</s>`
      if (token.type === 'code') {
        return `<code>${escapeHtml(token.text)}</code>`
      }
      if (token.type === 'link') {
        return `<a href="${escapeHtml(token.href)}">${escapeHtml(token.text)}</a>`
      }
      const found = findNoteByTitle(notes, token.target)
      const label = escapeHtml(token.alias || token.target)
      const missing = found ? '' : ' wiki-chip-missing'
      return `<span contenteditable="false" data-wiki="${escapeHtml(token.target)}" class="wiki-chip${missing}">${label}</span>`
    })
    .join('')
}

function htmlToMarkdown(root: HTMLElement): string {
  function walk(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? ''
    if (node.nodeType !== Node.ELEMENT_NODE) return ''
    const el = node as HTMLElement
    const wiki = el.getAttribute('data-wiki')
    if (wiki) {
      const alias = (el.textContent ?? '').trim()
      return alias && alias !== wiki ? `[[${wiki}|${alias}]]` : `[[${wiki}]]`
    }
    const inner = [...el.childNodes].map(walk).join('')
    const tag = el.tagName
    if (tag === 'STRONG' || tag === 'B') return `**${inner}**`
    if (tag === 'EM' || tag === 'I') return `*${inner}*`
    if (tag === 'S' || tag === 'DEL' || tag === 'STRIKE') return `~~${inner}~~`
    if (tag === 'CODE') return `\`${inner}\``
    if (tag === 'A') {
      const href = el.getAttribute('href') ?? ''
      return `[${inner}](${href})`
    }
    if (tag === 'BR') return ''
    return inner
  }
  return walk(root).replace(/\u00a0/g, ' ')
}

function wikiDraft(text: string): { start: number; query: string } | null {
  const open = text.lastIndexOf('[[')
  if (open < 0) return null
  const rest = text.slice(open + 2)
  if (rest.includes(']]')) return null
  return { start: open, query: rest }
}

const HEADING_CLASS: Record<1 | 2 | 3 | 4, string> = {
  1: 'font-display text-2xl font-semibold text-accent',
  2: 'font-display text-xl font-semibold text-accent/90',
  3: 'font-display text-lg font-semibold text-text',
  4: 'text-sm font-semibold uppercase tracking-wide text-text-muted',
}

function RichLine({
  value,
  notes,
  className,
  placeholder,
  onChange,
  onEnter,
  onBackspaceEmpty,
}: {
  value: string
  notes: readonly WorldNote[]
  className?: string
  placeholder?: string
  onChange: (value: string) => void
  onEnter: () => void
  onBackspaceEmpty?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const focused = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (focused.current && htmlToMarkdown(el) === value) return
    const html = markdownToHtml(value, notes)
    if (el.innerHTML !== html) el.innerHTML = html
  }, [value, notes])

  function emit() {
    const el = ref.current
    if (!el) return
    onChange(htmlToMarkdown(el))
  }

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-label={placeholder}
      data-placeholder={placeholder ?? ''}
      className={`live-line min-h-[1.4em] outline-none ${className ?? ''}`}
      onFocus={() => {
        focused.current = true
      }}
      onBlur={() => {
        focused.current = false
        emit()
        const el = ref.current
        if (el) el.innerHTML = markdownToHtml(htmlToMarkdown(el), notes)
      }}
      onInput={() => emit()}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()
          emit()
          onEnter()
          return
        }
        if (event.key === 'Backspace') {
          const el = ref.current
          const empty = !el || htmlToMarkdown(el).length === 0
          if (empty && onBackspaceEmpty) {
            event.preventDefault()
            onBackspaceEmpty()
          }
        }
      }}
      onPaste={(event) => {
        const raw = event.clipboardData.getData('text/plain')
        if (!raw) return
        event.preventDefault()
        document.execCommand('insertText', false, raw)
      }}
    />
  )
}

export function LiveNoteEditor({
  noteId,
  content,
  notes,
  onChange,
  onOpenNote,
  onCreateLinked,
}: {
  noteId: string
  content: string
  notes: readonly WorldNote[]
  onChange: (content: string) => void
  onOpenNote: (note: WorldNote) => void
  onCreateLinked: (title: string) => void
}) {
  const [blocks, setBlocks] = useState<LiveBlock[]>(() =>
    contentToLiveBlocks(content),
  )
  const sent = useRef(content)
  const [slash, setSlash] = useState<{ blockId: string; query: string } | null>(
    null,
  )
  const [slashIndex, setSlashIndex] = useState(0)
  const [wiki, setWiki] = useState<{
    blockId: string
    start: number
    query: string
  } | null>(null)

  useEffect(() => {
    setBlocks(contentToLiveBlocks(content))
    sent.current = content
    setSlash(null)
    setWiki(null)
  }, [noteId])

  useEffect(() => {
    if (content === sent.current) return
    setBlocks(contentToLiveBlocks(content))
    sent.current = content
  }, [content])

  function append(extra: LiveBlock[]) {
    setBlocks((current) => {
      const next = [...current, ...extra]
      const md = liveBlocksToContent(next)
      sent.current = md
      onChange(md)
      return next
    })
  }

  function patch(
    id: string,
    mutator: (block: LiveBlock) => LiveBlock | LiveBlock[],
  ) {
    setBlocks((current) => {
      const next: LiveBlock[] = []
      for (const block of current) {
        if (block.id !== id) {
          next.push(block)
          continue
        }
        const result = mutator(block)
        if (Array.isArray(result)) next.push(...result)
        else next.push(result)
      }
      const normalized =
        next.length > 0
          ? next
          : [{ id: nextLiveId(), type: 'paragraph' as const, text: '' }]
      const md = liveBlocksToContent(normalized)
      sent.current = md
      onChange(md)
      return normalized
    })
  }

  function insertAfter(id: string, extra: LiveBlock[]) {
    setBlocks((current) => {
      const next: LiveBlock[] = []
      for (const block of current) {
        next.push(block)
        if (block.id === id) next.push(...extra)
      }
      const md = liveBlocksToContent(next)
      sent.current = md
      onChange(md)
      return next
    })
  }

  function removeBlock(id: string) {
    setBlocks((current) => {
      const next = current.filter((block) => block.id !== id)
      const normalized =
        next.length > 0
          ? next
          : [{ id: nextLiveId(), type: 'paragraph' as const, text: '' }]
      const md = liveBlocksToContent(normalized)
      sent.current = md
      onChange(md)
      return normalized
    })
  }

  const slashHits = useMemo(
    () => (slash ? filterSlashCommands(slash.query) : []),
    [slash],
  )

  useEffect(() => {
    setSlashIndex(0)
  }, [slash?.query])

  function applySlash(blockId: string, commandId: string) {
    const command =
      slashHits.find((item) => item.id === commandId) ?? slashHits[0]
    if (!command) return
    setSlash(null)
    if (command.id === 'table') {
      patch(blockId, () => [
        emptyTableBlock(),
        { id: nextLiveId(), type: 'paragraph', text: '' },
      ])
      return
    }
    if (command.id === 'h2') {
      patch(blockId, () => ({
        id: blockId,
        type: 'heading',
        level: 2,
        text: '',
      }))
      return
    }
    if (command.id === 'ul' || command.id === 'task') {
      patch(blockId, () => ({
        id: blockId,
        type: 'list',
        ordered: false,
        items: [
          {
            id: nextLiveId('li'),
            text: '',
            checked: command.id === 'task' ? false : null,
          },
        ],
      }))
      return
    }
    if (command.id === 'quote') {
      patch(blockId, () => ({ id: blockId, type: 'quote', text: '' }))
      return
    }
    if (command.id === 'code') {
      patch(blockId, () => ({ id: blockId, type: 'code', text: '' }))
      return
    }
    if (command.id === 'hr') {
      patch(blockId, () => [
        { id: nextLiveId(), type: 'hr' },
        { id: nextLiveId(), type: 'paragraph', text: '' },
      ])
      return
    }
    if (command.id === 'wiki') {
      patch(blockId, (block) =>
        block.type === 'paragraph' || block.type === 'heading'
          ? { ...block, text: '[[' }
          : block,
      )
    }
  }

  function onParagraphChange(
    block: Extract<LiveBlock, { type: 'paragraph' }>,
    text: string,
  ) {
    const shortcut = paragraphShortcut(text)
    if (shortcut?.type === 'heading') {
      patch(block.id, () => ({
        id: block.id,
        type: 'heading',
        level: shortcut.level,
        text: shortcut.text,
      }))
      return
    }
    if (shortcut?.type === 'list') {
      patch(block.id, () => ({
        id: block.id,
        type: 'list',
        ordered: shortcut.ordered,
        items: [
          {
            id: nextLiveId('li'),
            text: shortcut.text,
            checked: shortcut.checked,
          },
        ],
      }))
      return
    }
    if (shortcut?.type === 'quote') {
      patch(block.id, () => ({
        id: block.id,
        type: 'quote',
        text: shortcut.text,
      }))
      return
    }
    if (shortcut?.type === 'hr') {
      patch(block.id, () => [
        { id: nextLiveId(), type: 'hr' },
        { id: nextLiveId(), type: 'paragraph', text: '' },
      ])
      return
    }
    if (shortcut?.type === 'code') {
      patch(block.id, () => ({ id: block.id, type: 'code', text: '' }))
      return
    }
    const draft = wikiDraft(text)
    setWiki(
      draft ? { blockId: block.id, start: draft.start, query: draft.query } : null,
    )
    setSlash(
      text.startsWith('/') && !text.includes(' ')
        ? { blockId: block.id, query: text.slice(1) }
        : null,
    )
    patch(block.id, (current) =>
      current.type === 'paragraph' ? { ...current, text } : current,
    )
  }

  function applyWiki(title: string) {
    if (!wiki) return
    patch(wiki.blockId, (current) => {
      if (
        current.type === 'paragraph' ||
        current.type === 'heading' ||
        current.type === 'quote'
      ) {
        return { ...current, text: `${current.text.slice(0, wiki.start)}[[${title}]]` }
      }
      return current
    })
    setWiki(null)
  }

  const wikiHits = useMemo(() => {
    if (!wiki) return []
    return filterNotes(notes, wiki.query)
      .filter((note) => note.id !== noteId)
      .slice(0, 8)
  }, [wiki, notes, noteId])

  const canCreateWiki =
    Boolean(wiki?.query.trim()) &&
    !notes.some(
      (note) =>
        note.title.toLowerCase() === (wiki?.query.trim() ?? '').toLowerCase(),
    )

  function formatSelection(kind: 'bold' | 'italic' | 'strike') {
    const cmd =
      kind === 'bold' ? 'bold' : kind === 'italic' ? 'italic' : 'strikeThrough'
    document.execCommand(cmd, false)
  }

  function insertBlock(
    kind: 'heading' | 'list' | 'task' | 'table' | 'quote' | 'wiki',
  ) {
    if (kind === 'table') {
      append([
        emptyTableBlock(),
        { id: nextLiveId(), type: 'paragraph', text: '' },
      ])
      return
    }
    if (kind === 'heading') {
      append([{ id: nextLiveId(), type: 'heading', level: 2, text: '' }])
      return
    }
    if (kind === 'list' || kind === 'task') {
      append([
        {
          id: nextLiveId(),
          type: 'list',
          ordered: false,
          items: [
            {
              id: nextLiveId('li'),
              text: '',
              checked: kind === 'task' ? false : null,
            },
          ],
        },
      ])
      return
    }
    if (kind === 'quote') {
      append([{ id: nextLiveId(), type: 'quote', text: '' }])
      return
    }
    append([{ id: nextLiveId(), type: 'paragraph', text: '[[' }])
  }

  return (
    <div className="live-note flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap gap-1 border-b border-border/50 px-3 py-1.5 text-[11px]">
        <button type="button" className="live-tool" onClick={() => insertBlock('heading')}>
          Título
        </button>
        <button type="button" className="live-tool" onClick={() => insertBlock('list')}>
          Lista
        </button>
        <button type="button" className="live-tool" onClick={() => insertBlock('task')}>
          Tarefa
        </button>
        <button type="button" className="live-tool" onClick={() => insertBlock('table')}>
          Tabela
        </button>
        <button type="button" className="live-tool" onClick={() => insertBlock('wiki')}>
          [[Link]]
        </button>
        <button
          type="button"
          className="live-tool font-semibold"
          title="Negrito (Ctrl+B)"
          onMouseDown={(event) => {
            event.preventDefault()
            formatSelection('bold')
          }}
        >
          Negrito
        </button>
        <button
          type="button"
          className="live-tool italic"
          title="Itálico (Ctrl+I)"
          onMouseDown={(event) => {
            event.preventDefault()
            formatSelection('italic')
          }}
        >
          Itálico
        </button>
        <button
          type="button"
          className="live-tool line-through"
          title="Riscado"
          onMouseDown={(event) => {
            event.preventDefault()
            formatSelection('strike')
          }}
        >
          Riscado
        </button>
        <span className="self-center px-1 text-[10px] text-text-dim">
          Digite / para blocos · # espaço vira título · a tabela cresce no +
        </span>
      </div>
      <div
        className="relative min-h-0 flex-1 overflow-y-auto px-5 py-4"
        onClick={(event) => {
          const chip = (event.target as HTMLElement).closest('[data-wiki]')
          if (!chip) return
          const title = chip.getAttribute('data-wiki')
          if (!title) return
          const found = findNoteByTitle(notes, title)
          if (found) onOpenNote(found)
        }}
        onKeyDown={(event) => {
          const mod = event.ctrlKey || event.metaKey
          if (mod && event.key.toLowerCase() === 'b') {
            event.preventDefault()
            formatSelection('bold')
          }
          if (mod && event.key.toLowerCase() === 'i') {
            event.preventDefault()
            formatSelection('italic')
          }
          if (!slash || slashHits.length === 0) return
          if (event.key === 'ArrowDown') {
            event.preventDefault()
            setSlashIndex((index) => (index + 1) % slashHits.length)
          }
          if (event.key === 'ArrowUp') {
            event.preventDefault()
            setSlashIndex(
              (index) => (index - 1 + slashHits.length) % slashHits.length,
            )
          }
          if (event.key === 'Enter' || event.key === 'Tab') {
            const command = slashHits[slashIndex]
            if (command) {
              event.preventDefault()
              applySlash(slash.blockId, command.id)
            }
          }
          if (event.key === 'Escape') setSlash(null)
        }}
        onPaste={(event) => {
          const raw = event.clipboardData.getData('text/plain')
          const table = tsvToMarkdownTable(raw)
          if (!table) return
          event.preventDefault()
          append([
            ...contentToLiveBlocks(table),
            { id: nextLiveId(), type: 'paragraph', text: '' },
          ])
        }}
      >
        {blocks.map((block, index) => (
          <BlockView
            key={block.id}
            block={block}
            index={index}
            total={blocks.length}
            notes={notes}
            onParagraphChange={onParagraphChange}
            patch={patch}
            insertAfter={insertAfter}
            removeBlock={removeBlock}
          />
        ))}

        {slash && slashHits.length > 0 && (
          <div className="sticky bottom-3 overflow-hidden rounded-lg border border-border bg-surface-1 shadow-lg animate-pop-in">
            <div className="px-2 py-1 text-[10px] uppercase tracking-wide text-text-dim">
              Inserir bloco
            </div>
            <ul>
              {slashHits.map((command, index) => (
                <li key={command.id}>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between px-2 py-1.5 text-left text-sm ${
                      index === slashIndex
                        ? 'bg-accent/15 text-accent'
                        : 'hover:bg-surface-2'
                    }`}
                    onMouseDown={(event) => {
                      event.preventDefault()
                      applySlash(slash.blockId, command.id)
                    }}
                  >
                    <span>{command.label}</span>
                    <span className="text-[10px] text-text-dim">{command.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {wiki && (
          <WikiPicker
            query={wiki.query}
            hits={wikiHits}
            canCreate={canCreateWiki}
            onPick={applyWiki}
            onCreateLinked={(title) => {
              onCreateLinked(title)
              applyWiki(title)
            }}
          />
        )}
      </div>
    </div>
  )
}

function WikiPicker({
  query,
  hits,
  canCreate,
  onPick,
  onCreateLinked,
}: {
  query: string
  hits: WorldNote[]
  canCreate: boolean
  onPick: (title: string) => void
  onCreateLinked: (title: string) => void
}) {
  return (
    <div className="sticky bottom-3 overflow-hidden rounded-lg border border-border bg-surface-1 shadow-lg">
      <div className="px-2 py-1 text-[10px] uppercase tracking-wide text-text-dim">
        Ligar nota
      </div>
      {hits.length === 0 && !canCreate ? (
        <div className="px-2 py-2 text-xs text-text-dim">
          Nenhuma nota com “{query}”.
        </div>
      ) : (
        <ul>
          {hits.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                className="block w-full px-2 py-1.5 text-left text-sm hover:bg-surface-2"
                onMouseDown={(event) => {
                  event.preventDefault()
                  onPick(entry.title)
                }}
              >
                {entry.title}
              </button>
            </li>
          ))}
          {canCreate && (
            <li>
              <button
                type="button"
                className="block w-full px-2 py-1.5 text-left text-sm text-accent hover:bg-surface-2"
                onMouseDown={(event) => {
                  event.preventDefault()
                  onCreateLinked(query.trim())
                }}
              >
                Criar “{query.trim()}”
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

function BlockView({
  block,
  index,
  total,
  notes,
  onParagraphChange,
  patch,
  insertAfter,
  removeBlock,
}: {
  block: LiveBlock
  index: number
  total: number
  notes: readonly WorldNote[]
  onParagraphChange: (
    block: Extract<LiveBlock, { type: 'paragraph' }>,
    text: string,
  ) => void
  patch: (id: string, mutator: (block: LiveBlock) => LiveBlock | LiveBlock[]) => void
  insertAfter: (id: string, extra: LiveBlock[]) => void
  removeBlock: (id: string) => void
}) {
  if (block.type === 'heading') {
    return (
      <div className="mb-2">
        <RichLine
          value={block.text}
          notes={notes}
          className={HEADING_CLASS[block.level]}
          placeholder="Título"
          onChange={(text) =>
            patch(block.id, (current) =>
              current.type === 'heading' ? { ...current, text } : current,
            )
          }
          onEnter={() =>
            insertAfter(block.id, [
              { id: nextLiveId(), type: 'paragraph', text: '' },
            ])
          }
          onBackspaceEmpty={() =>
            patch(block.id, () => ({
              id: block.id,
              type: 'paragraph',
              text: '',
            }))
          }
        />
      </div>
    )
  }
  if (block.type === 'paragraph') {
    return (
      <div className="relative mb-2">
        <RichLine
          value={block.text}
          notes={notes}
          className="leading-relaxed text-text"
          placeholder={
            index === 0 && total === 1
              ? 'Comece a escrever. / abre blocos, [[ liga notas.'
              : ''
          }
          onChange={(text) => onParagraphChange(block, text)}
          onEnter={() =>
            insertAfter(block.id, [
              { id: nextLiveId(), type: 'paragraph', text: '' },
            ])
          }
          onBackspaceEmpty={() => {
            if (total > 1) removeBlock(block.id)
          }}
        />
      </div>
    )
  }
  if (block.type === 'list') {
    return (
      <ul className="mb-3 space-y-1 pl-1">
        {block.items.map((item, itemIndex) => (
          <li key={item.id} className="flex items-start gap-2">
            {item.checked === null ? (
              <span className="mt-1 w-4 shrink-0 text-center text-text-dim">
                {block.ordered ? `${itemIndex + 1}.` : '•'}
              </span>
            ) : (
              <input
                type="checkbox"
                className="mt-1.5"
                checked={item.checked}
                onChange={(event) =>
                  patch(block.id, (current) =>
                    current.type === 'list'
                      ? {
                          ...current,
                          items: current.items.map((entry) =>
                            entry.id === item.id
                              ? { ...entry, checked: event.target.checked }
                              : entry,
                          ),
                        }
                      : current,
                  )
                }
              />
            )}
            <RichLine
              value={item.text}
              notes={notes}
              className={`flex-1 leading-relaxed ${item.checked ? 'text-text-dim line-through' : 'text-text'}`}
              placeholder="Item"
              onChange={(text) =>
                patch(block.id, (current) =>
                  current.type === 'list'
                    ? {
                        ...current,
                        items: current.items.map((entry) =>
                          entry.id === item.id ? { ...entry, text } : entry,
                        ),
                      }
                    : current,
                )
              }
              onEnter={() => {
                if (!item.text.trim()) {
                  const remaining = block.items.filter((entry) => entry.id !== item.id)
                  if (remaining.length === 0) {
                    patch(block.id, () => ({
                      id: block.id,
                      type: 'paragraph',
                      text: '',
                    }))
                    return
                  }
                  patch(block.id, (current) =>
                    current.type === 'list'
                      ? { ...current, items: remaining }
                      : current,
                  )
                  insertAfter(block.id, [
                    { id: nextLiveId(), type: 'paragraph', text: '' },
                  ])
                  return
                }
                patch(block.id, (current) => {
                  if (current.type !== 'list') return current
                  const items = [...current.items]
                  items.splice(itemIndex + 1, 0, {
                    id: nextLiveId('li'),
                    text: '',
                    checked: item.checked === null ? null : false,
                  })
                  return { ...current, items }
                })
              }}
              onBackspaceEmpty={() => {
                if (block.items.length <= 1) {
                  patch(block.id, () => ({
                    id: block.id,
                    type: 'paragraph',
                    text: '',
                  }))
                  return
                }
                patch(block.id, (current) =>
                  current.type === 'list'
                    ? {
                        ...current,
                        items: current.items.filter((entry) => entry.id !== item.id),
                      }
                    : current,
                )
              }}
            />
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === 'quote') {
    return (
      <blockquote className="mb-3 border-l-2 border-accent/60 pl-3 text-text-muted italic">
        <RichLine
          value={block.text}
          notes={notes}
          placeholder="Citação"
          onChange={(text) =>
            patch(block.id, (current) =>
              current.type === 'quote' ? { ...current, text } : current,
            )
          }
          onEnter={() =>
            insertAfter(block.id, [
              { id: nextLiveId(), type: 'paragraph', text: '' },
            ])
          }
          onBackspaceEmpty={() =>
            patch(block.id, () => ({
              id: block.id,
              type: 'paragraph',
              text: '',
            }))
          }
        />
      </blockquote>
    )
  }
  if (block.type === 'code') {
    return (
      <pre className="mb-3 overflow-x-auto rounded-lg bg-surface-3 px-3 py-2 font-mono text-xs text-text">
        <textarea
          value={block.text}
          onChange={(event) =>
            patch(block.id, (current) =>
              current.type === 'code'
                ? { ...current, text: event.target.value }
                : current,
            )
          }
          className="block w-full resize-y bg-transparent font-mono text-xs outline-none"
          rows={Math.max(3, block.text.split('\n').length)}
        />
      </pre>
    )
  }
  if (block.type === 'hr') {
    return (
      <button
        type="button"
        title="Remover régua"
        className="my-4 block w-full border-0 border-t border-border bg-transparent"
        onClick={() => removeBlock(block.id)}
      />
    )
  }
  return (
    <VisualTable
      headers={block.headers}
      rows={block.rows}
      onChange={(headers, rows) =>
        patch(block.id, (current) =>
          current.type === 'table' ? { ...current, headers, rows } : current,
        )
      }
    />
  )
}
