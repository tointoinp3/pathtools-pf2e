import { useEffect, useMemo, useState } from 'react'
import type { WorldNote } from '@/types'
import { extractHeadings } from '@/features/world/markdown'
import { MarkdownPreview } from './MarkdownPreview'
import { LiveNoteEditor } from './LiveNoteEditor'

type EditorMode = 'edit' | 'source' | 'preview'

const MODE_KEY = 'sp-world-note-mode'

function readMode(): EditorMode {
  try {
    const value = localStorage.getItem(MODE_KEY)
    if (value === 'source' || value === 'preview' || value === 'edit') return value
    if (value === 'split') return 'edit'
  } catch {
    /* ignore */
  }
  return 'edit'
}

export function NoteEditor({
  note,
  notes,
  onChange,
  onRename,
  onOpenNote,
  onCreateLinked,
}: {
  note: WorldNote
  notes: readonly WorldNote[]
  onChange: (content: string) => void
  onRename: (title: string) => void
  onOpenNote: (note: WorldNote) => void
  onCreateLinked: (title: string) => void
}) {
  const [mode, setMode] = useState<EditorMode>(readMode)
  const [title, setTitle] = useState(note.title)
  const [source, setSource] = useState(note.content)

  useEffect(() => {
    setTitle(note.title)
  }, [note.id, note.title])

  useEffect(() => {
    setSource(note.content)
  }, [note.id, note.content])

  function setModePersist(next: EditorMode) {
    setMode(next)
    try {
      localStorage.setItem(MODE_KEY, next)
    } catch {
      /* ignore */
    }
  }

  const headings = useMemo(
    () => extractHeadings(note.content),
    [note.content],
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/70 px-3 py-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => {
            const next = title.trim() || 'Sem título'
            if (next !== note.title) onRename(next)
            setTitle(next)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.currentTarget.blur()
          }}
          className="field-control min-w-0 flex-1 rounded-lg border border-transparent bg-transparent px-2 py-1 font-display text-lg text-accent outline-none focus:border-border"
          aria-label="Título da nota"
        />
        <div className="flex rounded-lg border border-border text-[11px]">
          {(
            [
              ['edit', 'Editar'],
              ['source', 'Fonte'],
              ['preview', 'Ler'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`px-2 py-1 transition-colors duration-150 ${
                mode === id
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-muted hover:bg-surface-2'
              }`}
              onClick={() => setModePersist(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {headings.length > 0 && mode !== 'source' && (
        <div className="flex gap-1 overflow-x-auto border-b border-border/40 px-3 py-1">
          {headings.map((heading) => (
            <span
              key={`${heading.offset}-${heading.text}`}
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] text-text-dim"
              style={{ paddingLeft: 8 + heading.level * 4 }}
            >
              {heading.text || 'Título'}
            </span>
          ))}
        </div>
      )}

      {mode === 'edit' && (
        <LiveNoteEditor
          noteId={note.id}
          content={note.content}
          notes={notes}
          onChange={onChange}
          onOpenNote={onOpenNote}
          onCreateLinked={onCreateLinked}
        />
      )}
      {mode === 'source' && (
        <textarea
          value={source}
          onChange={(event) => {
            setSource(event.target.value)
            onChange(event.target.value)
          }}
          spellCheck
          className="field-control min-h-0 flex-1 resize-none rounded-none border-0 bg-transparent px-4 py-3 font-mono text-sm leading-relaxed"
          placeholder="Fonte markdown — o modo Editar esconde isso e mostra o visual."
        />
      )}
      {mode === 'preview' && (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          <MarkdownPreview
            content={note.content}
            notes={notes}
            onOpen={onOpenNote}
            onCreate={onCreateLinked}
          />
        </div>
      )}
    </div>
  )
}

export function copyWikiLink(title: string) {
  const text = `[[${title}]]`
  void navigator.clipboard?.writeText(text)
}
