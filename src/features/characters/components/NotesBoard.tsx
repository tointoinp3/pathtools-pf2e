import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Tip } from '@/components/ui/Panel'
import type { CharacterStickyNote, StickyNoteColor } from '@/types'
import {
  STICKY_NOTE_COLOR_LABELS,
  STICKY_NOTE_COLORS,
  STICKY_NOTE_SIZE_LABELS,
  STICKY_NOTE_SIZE_PRESETS,
  STICKY_NOTE_TEMPLATES,
  bringStickyNoteToFront,
  clampStickyNoteSize,
  createStickyNote,
  duplicateStickyNote,
  formatStickyNoteTime,
  snapStickyPosition,
  sortStickyNotes,
  stickyNoteMatches,
  stickyNoteSnippet,
  stickyNoteTitle,
  stickyNotesBoardSize,
  tileStickyNotes,
  updateStickyNote,
  type StickyNoteSizePreset,
  type StickyNoteTemplate,
} from '@/features/characters/stickyNotes'
import { useSlashSearch } from '@/utils/useSlashSearch'

const COLOR_TONE: Record<StickyNoteColor, string> = {
  parchment: 'var(--color-accent)',
  amber: 'var(--color-crit)',
  sage: 'var(--color-success)',
  rose: 'var(--color-danger)',
  sky: 'var(--color-info)',
  slate: 'var(--color-text-dim)',
}

const VIEW_KEY = 'sp.notes.view'

type NotesView = 'cards' | 'mural'

function readView(): NotesView {
  try {
    const saved = sessionStorage.getItem(VIEW_KEY)
    if (saved === 'cards' || saved === 'mural') return saved
  } catch {
    /* private mode */
  }
  return 'cards'
}

function noteChrome(color: StickyNoteColor) {
  const tone = COLOR_TONE[color]
  return {
    background: `color-mix(in srgb, ${tone} 16%, var(--color-surface-2))`,
    border: `color-mix(in srgb, ${tone} 40%, var(--color-border))`,
    bar: tone,
  }
}

interface NotesBoardProps {
  notes: CharacterStickyNote[]
  onChange: (notes: CharacterStickyNote[]) => void
}

export function NotesBoard({ notes, onChange }: NotesBoardProps) {
  const searchRef = useSlashSearch()
  const [query, setQuery] = useState('')
  const [colorFilter, setColorFilter] = useState<StickyNoteColor | 'all'>(
    'all',
  )
  const [view, setView] = useState<NotesView>(readView)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [templatesOpen, setTemplatesOpen] = useState(false)
  const templatesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!templatesOpen) return
    function onDoc(e: MouseEvent) {
      if (templatesRef.current?.contains(e.target as Node)) return
      setTemplatesOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setTemplatesOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      window.removeEventListener('keydown', onKey)
    }
  }, [templatesOpen])

  const visible = useMemo(() => {
    return sortStickyNotes(notes).filter((note) => {
      if (colorFilter !== 'all' && note.color !== colorFilter) return false
      return stickyNoteMatches(note, query)
    })
  }, [notes, query, colorFilter])

  function setViewPersist(next: NotesView) {
    setView(next)
    try {
      sessionStorage.setItem(VIEW_KEY, next)
    } catch {
      /* private mode */
    }
  }

  function addNote(template?: StickyNoteTemplate, at?: { x: number; y: number }) {
    const next = [
      ...notes,
      createStickyNote(
        {
          title: template?.title,
          body: template?.body ?? '',
          color: template?.color,
          ...at,
        },
        notes,
      ),
    ]
    onChange(next)
    setActiveId(next[next.length - 1]!.id)
    setTemplatesOpen(false)
    setColorFilter('all')
  }

  function patchNote(id: string, patch: Partial<CharacterStickyNote>) {
    onChange(updateStickyNote(notes, id, patch))
  }

  function removeNote(id: string) {
    const note = notes.find((item) => item.id === id)
    const label = note ? stickyNoteTitle(note) : 'esta nota'
    if (!window.confirm(`Excluir “${label}”?`)) return
    onChange(notes.filter((item) => item.id !== id))
    if (activeId === id) setActiveId(null)
  }

  function focusNote(id: string) {
    setActiveId(id)
    onChange(bringStickyNoteToFront(notes, id))
  }

  function duplicate(id: string) {
    const next = duplicateStickyNote(notes, id)
    onChange(next)
    const copy = next[next.length - 1]
    if (copy) setActiveId(copy.id)
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-border/90 bg-surface-1 shadow-[0_4px_20px_rgba(0,0,0,0.18)]">
      <header className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border/50 px-3 py-2">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
            Notas
            <span className="ml-2 font-sans text-xs font-normal normal-case tracking-normal text-text-dim">
              {notes.length === 0
                ? 'anotações da mesa'
                : `${visible.length} de ${notes.length}`}
            </span>
          </h2>
        </div>
        <Input
          ref={searchRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar  ( / )"
          className="h-8 w-44 max-w-full !py-1 text-xs"
        />
        <div className="flex rounded-lg border border-border bg-surface-2 p-0.5">
          {(
            [
              ['cards', 'Cartões'],
              ['mural', 'Mural'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setViewPersist(id)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
                view === id
                  ? 'bg-accent/20 text-accent'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {notes.length > 1 && view === 'mural' ? (
          <Button
            size="sm"
            onClick={() => onChange(tileStickyNotes(notes))}
          >
            Organizar
          </Button>
        ) : null}
        <div className="relative" ref={templatesRef}>
          <Button
            size="sm"
            variant="accent"
            onClick={() => setTemplatesOpen((open) => !open)}
          >
            + Nova
          </Button>
          {templatesOpen ? (
            <div className="absolute right-0 z-30 mt-1 w-56 rounded-xl border border-border bg-surface-2 p-1.5 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
              {STICKY_NOTE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => addNote(template)}
                  className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left hover:bg-accent/10"
                >
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: COLOR_TONE[template.color] }}
                  />
                  <span className="min-w-0">
                    <span className="block text-xs font-medium text-text">
                      {template.label}
                    </span>
                    <span className="block text-[10px] text-text-dim">
                      {template.hint}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      {notes.length > 0 ? (
        <div className="flex shrink-0 flex-wrap items-center gap-1 border-b border-border/40 px-3 py-1.5">
          <FilterChip
            active={colorFilter === 'all'}
            onClick={() => setColorFilter('all')}
          >
            Todas
          </FilterChip>
          {STICKY_NOTE_COLORS.map((color) => (
            <FilterChip
              key={color}
              active={colorFilter === color}
              onClick={() =>
                setColorFilter((current) =>
                  current === color ? 'all' : color,
                )
              }
              swatch={COLOR_TONE[color]}
            >
              {STICKY_NOTE_COLOR_LABELS[color]}
            </FilterChip>
          ))}
        </div>
      ) : null}

      {notes.length === 0 ? (
        <EmptyNotes onPick={addNote} />
      ) : view === 'cards' ? (
        <CardsView
          notes={visible}
          total={notes.length}
          activeId={activeId}
          onFocus={setActiveId}
          onChange={patchNote}
          onDuplicate={duplicate}
          onRemove={removeNote}
        />
      ) : (
        <MuralView
          notes={notes}
          visibleIds={new Set(visible.map((note) => note.id))}
          activeId={activeId}
          onFocus={focusNote}
          onChange={patchNote}
          onDuplicate={duplicate}
          onRemove={removeNote}
          onAddAt={(pos) => addNote(undefined, pos)}
        />
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  swatch,
  children,
}: {
  active: boolean
  onClick: () => void
  swatch?: string
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
        active
          ? 'border-accent/40 bg-accent/15 text-accent'
          : 'border-border/70 bg-surface-2/60 text-text-muted hover:text-text'
      }`}
    >
      {swatch ? (
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: swatch }}
        />
      ) : null}
      {children}
    </button>
  )
}

function EmptyNotes({
  onPick,
}: {
  onPick: (template?: StickyNoteTemplate) => void
}) {
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center p-6">
      <div className="max-w-md space-y-3 text-center">
        <p className="font-display text-lg text-text">Nada anotado ainda</p>
        <p className="text-sm text-text-muted">
          Guarde o que a ficha não calcula: recado de sessão, NPC, tesouro,
          dúvida para o MJ ou um segredo só deste personagem.
        </p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {STICKY_NOTE_TEMPLATES.map((template) => (
            <Button
              key={template.id}
              size="sm"
              variant={template.id === 'blank' ? 'accent' : 'secondary'}
              onClick={() => onPick(template)}
            >
              {template.label}
            </Button>
          ))}
        </div>
        <Tip>
          Cartões são melhores para escrever. O mural serve para espalhar as
          notas na mesa, como post-its.
        </Tip>
      </div>
    </div>
  )
}

function CardsView({
  notes,
  total,
  activeId,
  onFocus,
  onChange,
  onDuplicate,
  onRemove,
}: {
  notes: CharacterStickyNote[]
  total: number
  activeId: string | null
  onFocus: (id: string) => void
  onChange: (id: string, patch: Partial<CharacterStickyNote>) => void
  onDuplicate: (id: string) => void
  onRemove: (id: string) => void
}) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-text-muted">
        Nenhuma nota com esse filtro. {total} no total.
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-3">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {notes.map((note) => {
          const open = activeId === note.id
          const chrome = noteChrome(note.color)
          return (
            <article
              key={note.id}
              className="flex flex-col overflow-hidden rounded-xl border transition-colors"
              style={{
                background: chrome.background,
                borderColor: open ? chrome.bar : chrome.border,
                boxShadow: open
                  ? `0 0 0 1px ${chrome.bar}`
                  : undefined,
              }}
            >
              <button
                type="button"
                onClick={() => onFocus(note.id)}
                className="flex items-start gap-2 px-3 py-2 text-left"
              >
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: chrome.bar }}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-1.5">
                    <span className="text-sm font-medium text-text">
                      {stickyNoteTitle(note)}
                    </span>
                    {note.pinned ? (
                      <Badge tone="accent">Fixada</Badge>
                    ) : null}
                  </span>
                  {!open ? (
                    <span className="mt-0.5 line-clamp-2 block text-[11px] text-text-muted">
                      {stickyNoteSnippet(note)}
                    </span>
                  ) : null}
                  <span className="mt-0.5 block text-[10px] text-text-dim">
                    {STICKY_NOTE_COLOR_LABELS[note.color]} ·{' '}
                    {formatStickyNoteTime(note.updatedAt)}
                  </span>
                </span>
                <span className="shrink-0 text-[10px] text-text-dim">
                  {open ? '▾' : '▸'}
                </span>
              </button>
              {open ? (
                <div className="flex min-h-0 flex-1 flex-col gap-2 border-t border-border/50 px-3 py-2">
                  <NoteFields
                    note={note}
                    rows={8}
                    onChange={(patch) => onChange(note.id, patch)}
                  />
                  <NoteToolbar
                    note={note}
                    onChange={(patch) => onChange(note.id, patch)}
                    onDuplicate={() => onDuplicate(note.id)}
                    onRemove={() => onRemove(note.id)}
                    showSizes={false}
                  />
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function MuralView({
  notes,
  visibleIds,
  activeId,
  onFocus,
  onChange,
  onDuplicate,
  onRemove,
  onAddAt,
}: {
  notes: CharacterStickyNote[]
  visibleIds: Set<string>
  activeId: string | null
  onFocus: (id: string) => void
  onChange: (id: string, patch: Partial<CharacterStickyNote>) => void
  onDuplicate: (id: string) => void
  onRemove: (id: string) => void
  onAddAt: (pos: { x: number; y: number }) => void
}) {
  const boardRef = useRef<HTMLDivElement>(null)
  const size = stickyNotesBoardSize(notes)
  const listed = sortStickyNotes(notes).filter((note) => visibleIds.has(note.id))

  function scrollToNote(id: string) {
    onFocus(id)
    const note = notes.find((item) => item.id === id)
    const scroller = boardRef.current
    if (!note || !scroller) return
    scroller.scrollTo({
      left: Math.max(0, note.x - 48),
      top: Math.max(0, note.y - 48),
      behavior: 'smooth',
    })
  }

  function onCanvasDoubleClick(e: ReactMouseEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return
    const rect = e.currentTarget.getBoundingClientRect()
    onAddAt(
      snapStickyPosition(e.clientX - rect.left, e.clientY - rect.top),
    )
  }

  return (
    <div className="flex min-h-0 flex-1">
      <aside className="hidden w-52 shrink-0 overflow-y-auto border-r border-border/60 lg:block">
        {listed.map((note) => (
          <button
            key={note.id}
            type="button"
            onClick={() => scrollToNote(note.id)}
            className={`flex w-full items-start gap-2 border-b border-border/40 px-2.5 py-2 text-left hover:bg-accent/8 ${
              activeId === note.id ? 'bg-accent/12' : ''
            }`}
          >
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ background: COLOR_TONE[note.color] }}
            />
            <span className="min-w-0">
              <span className="block truncate text-xs font-medium text-text">
                {stickyNoteTitle(note)}
              </span>
              <span className="block truncate text-[10px] text-text-dim">
                {note.pinned ? 'Fixada · ' : ''}
                {formatStickyNoteTime(note.updatedAt)}
              </span>
            </span>
          </button>
        ))}
        {listed.length === 0 ? (
          <p className="px-3 py-4 text-[11px] text-text-dim">
            Nada com esse filtro.
          </p>
        ) : null}
      </aside>
      <div
        ref={boardRef}
        className="relative min-h-0 flex-1 overflow-auto"
        style={{
          backgroundColor: 'var(--color-surface-0)',
          backgroundImage: `
            radial-gradient(circle at 18% 12%, rgb(var(--color-accent-rgb) / 0.07), transparent 38%),
            linear-gradient(var(--color-border) 1px, transparent 1px),
            linear-gradient(90deg, var(--color-border) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 16px 16px, 16px 16px',
          backgroundPosition: '0 0, 0 0, 0 0',
        }}
      >
        <div
          className="relative"
          style={{ width: size.width, height: size.height }}
          onDoubleClick={onCanvasDoubleClick}
        >
          <p className="pointer-events-none absolute left-3 top-2 text-[10px] text-text-dim">
            Clique duplo no vazio cria uma nota · arraste pelo topo
          </p>
          {notes.map((note) => (
            <StickyNoteCard
              key={note.id}
              note={note}
              active={activeId === note.id}
              dimmed={!visibleIds.has(note.id)}
              onFocus={() => onFocus(note.id)}
              onChange={(patch) => onChange(note.id, patch)}
              onDuplicate={() => onDuplicate(note.id)}
              onRemove={() => onRemove(note.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function NoteFields({
  note,
  rows,
  compact,
  onChange,
}: {
  note: CharacterStickyNote
  rows?: number
  compact?: boolean
  onChange: (patch: Partial<CharacterStickyNote>) => void
}) {
  return (
    <>
      <input
        value={note.title ?? ''}
        onChange={(e) => onChange({ title: e.target.value })}
        placeholder="Título"
        className={`w-full bg-transparent font-semibold text-text outline-none placeholder:text-text-dim ${
          compact ? 'text-[12px]' : 'text-sm'
        }`}
      />
      <textarea
        value={note.body}
        onChange={(e) => onChange({ body: e.target.value })}
        placeholder="Escreva qualquer coisa da mesa…"
        rows={rows}
        className={`w-full flex-1 bg-transparent text-[13px] leading-relaxed text-text outline-none placeholder:text-text-dim ${
          compact ? 'min-h-0 resize-none' : 'min-h-24 resize-y'
        }`}
      />
    </>
  )
}

function NoteToolbar({
  note,
  onChange,
  onDuplicate,
  onRemove,
  showSizes,
}: {
  note: CharacterStickyNote
  onChange: (patch: Partial<CharacterStickyNote>) => void
  onDuplicate: () => void
  onRemove: () => void
  showSizes: boolean
}) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {STICKY_NOTE_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          title={STICKY_NOTE_COLOR_LABELS[color]}
          onClick={() => onChange({ color })}
          className="h-4 w-4 rounded-full border border-black/20"
          style={{
            background: COLOR_TONE[color],
            outline:
              note.color === color
                ? '2px solid var(--color-text)'
                : undefined,
            outlineOffset: 1,
          }}
        />
      ))}
      {showSizes
        ? (Object.keys(STICKY_NOTE_SIZE_PRESETS) as StickyNoteSizePreset[]).map(
            (preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onChange(STICKY_NOTE_SIZE_PRESETS[preset])}
                className="rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-muted hover:text-text"
              >
                {STICKY_NOTE_SIZE_LABELS[preset]}
              </button>
            ),
          )
        : null}
      <button
        type="button"
        onClick={() => onChange({ pinned: !note.pinned })}
        className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
          note.pinned ? 'text-accent' : 'text-text-muted hover:text-text'
        }`}
      >
        {note.pinned ? 'Fixada' : 'Fixar'}
      </button>
      <button
        type="button"
        onClick={onDuplicate}
        className="rounded px-1.5 py-0.5 text-[10px] font-medium text-text-muted hover:text-text"
      >
        Duplicar
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium text-danger hover:text-danger-hover"
      >
        Excluir
      </button>
    </div>
  )
}

function StickyNoteCard({
  note,
  active,
  dimmed,
  onFocus,
  onChange,
  onDuplicate,
  onRemove,
}: {
  note: CharacterStickyNote
  active: boolean
  dimmed: boolean
  onFocus: () => void
  onChange: (patch: Partial<CharacterStickyNote>) => void
  onDuplicate: () => void
  onRemove: () => void
}) {
  const chrome = noteChrome(note.color)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const [live, setLive] = useState({
    x: note.x,
    y: note.y,
    width: note.width,
    height: note.height,
  })

  useEffect(() => {
    setLive({
      x: note.x,
      y: note.y,
      width: note.width,
      height: note.height,
    })
  }, [note.x, note.y, note.width, note.height])

  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)
  const resizeRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originW: number
    originH: number
  } | null>(null)

  useEffect(() => {
    function onPointerMove(e: PointerEvent) {
      if (dragRef.current && dragRef.current.pointerId === e.pointerId) {
        const next = snapStickyPosition(
          dragRef.current.originX + (e.clientX - dragRef.current.startX),
          dragRef.current.originY + (e.clientY - dragRef.current.startY),
        )
        setLive((prev) => ({ ...prev, ...next }))
      }
      if (resizeRef.current && resizeRef.current.pointerId === e.pointerId) {
        const sized = clampStickyNoteSize(
          resizeRef.current.originW + (e.clientX - resizeRef.current.startX),
          resizeRef.current.originH + (e.clientY - resizeRef.current.startY),
        )
        setLive((prev) => ({ ...prev, ...sized }))
      }
    }

    function onPointerUp(e: PointerEvent) {
      if (dragRef.current?.pointerId === e.pointerId) {
        const d = dragRef.current
        dragRef.current = null
        onChangeRef.current(
          snapStickyPosition(
            d.originX + (e.clientX - d.startX),
            d.originY + (e.clientY - d.startY),
          ),
        )
      }
      if (resizeRef.current?.pointerId === e.pointerId) {
        const r = resizeRef.current
        resizeRef.current = null
        onChangeRef.current(
          clampStickyNoteSize(
            r.originW + (e.clientX - r.startX),
            r.originH + (e.clientY - r.startY),
          ),
        )
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [])

  function startDrag(e: ReactPointerEvent) {
    if ((e.target as HTMLElement).closest('button, input, textarea')) return
    e.preventDefault()
    onFocus()
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: live.x,
      originY: live.y,
    }
  }

  function startResize(e: ReactPointerEvent) {
    e.preventDefault()
    e.stopPropagation()
    onFocus()
    resizeRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originW: live.width,
      originH: live.height,
    }
  }

  return (
    <article
      className="absolute flex flex-col overflow-hidden rounded-xl shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-opacity duration-150"
      style={{
        left: live.x,
        top: live.y,
        width: live.width,
        height: live.height,
        zIndex: note.zIndex,
        background: chrome.background,
        border: `1px solid ${active ? chrome.bar : chrome.border}`,
        boxShadow: active
          ? `0 14px 30px rgba(0,0,0,0.4), 0 0 0 1px ${chrome.bar}`
          : undefined,
        opacity: dimmed ? 0.28 : 1,
        pointerEvents: dimmed ? 'none' : undefined,
      }}
      onPointerDown={() => onFocus()}
    >
      <div
        className="flex h-6 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing"
        style={{ background: chrome.bar }}
        onPointerDown={startDrag}
      >
        <span className="h-1 w-8 rounded-full bg-black/25" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-2.5 pb-2 pt-1.5">
        <NoteFields note={note} compact onChange={onChange} />
        {active ? (
          <div className="mt-1.5">
            <NoteToolbar
              note={note}
              onChange={onChange}
              onDuplicate={onDuplicate}
              onRemove={onRemove}
              showSizes
            />
          </div>
        ) : (
          <p className="mt-1 text-[10px] text-text-dim">
            {formatStickyNoteTime(note.updatedAt)}
          </p>
        )}
      </div>
      <button
        type="button"
        aria-label="Redimensionar nota"
        title="Arraste para redimensionar"
        onPointerDown={startResize}
        className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 cursor-se-resize opacity-60 hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${chrome.bar} 50%)`,
        }}
      />
    </article>
  )
}
