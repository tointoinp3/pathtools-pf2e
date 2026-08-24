import { useEffect, useRef, useState } from 'react'
import type { WorldFolder, WorldNote } from '@/types'
import {
  buildFolderTree,
  notesInFolder,
  type FolderNode,
} from '@/features/world/noteTree'
import { Button } from '@/components/ui/Button'

const NOTE_DRAG = 'text/sp-note'
const FOLDER_DRAG = 'text/sp-folder'

function parseDrag(event: React.DragEvent): {
  noteId?: string
  folderId?: string
} {
  const noteId =
    event.dataTransfer.getData(NOTE_DRAG) ||
    (event.dataTransfer.getData('text/plain').startsWith('note:')
      ? event.dataTransfer.getData('text/plain').slice(5)
      : '')
  const folderId =
    event.dataTransfer.getData(FOLDER_DRAG) ||
    (event.dataTransfer.getData('text/plain').startsWith('folder:')
      ? event.dataTransfer.getData('text/plain').slice(7)
      : '')
  return {
    noteId: noteId || undefined,
    folderId: folderId || undefined,
  }
}

function ItemMenu({
  items,
}: {
  items: { label: string; danger?: boolean; onClick: () => void }[]
}) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onDoc(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        title="Mais ações"
        className="flex h-6 w-6 items-center justify-center rounded text-lg leading-none text-text-dim hover:bg-surface-3 hover:text-text"
        onClick={(event) => {
          event.stopPropagation()
          event.preventDefault()
          const rect = event.currentTarget.getBoundingClientRect()
          setPos({
            top: rect.bottom + 4,
            left: Math.max(8, rect.right - 168),
          })
          setOpen((value) => !value)
        }}
      >
        ⋯
      </button>
      {open && (
        <div
          className="fixed z-50 min-w-40 overflow-hidden rounded-lg border border-border bg-surface-1 py-1 shadow-panel animate-pop-in"
          style={{ top: pos.top, left: pos.left }}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`block w-full px-3 py-1.5 text-left text-xs hover:bg-surface-2 ${
                item.danger ? 'text-danger' : 'text-text'
              }`}
              onClick={(event) => {
                event.stopPropagation()
                setOpen(false)
                item.onClick()
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function FolderBlock({
  node,
  currentId,
  depth,
  onOpen,
  onNewNote,
  onNewFolder,
  onRenameFolder,
  onDeleteFolder,
  onDuplicateFolder,
  onDropNote,
  onDropFolder,
  onDuplicateNote,
  onDeleteNote,
  onTogglePin,
}: {
  node: FolderNode
  currentId: string | null
  depth: number
  onOpen: (id: string) => void
  onNewNote: (folderId: string | null) => void
  onNewFolder: (parentId: string | null) => void
  onRenameFolder: (id: string, name: string) => void
  onDeleteFolder: (id: string) => void
  onDuplicateFolder: (id: string) => void
  onDropNote: (noteId: string, folderId: string | null) => void
  onDropFolder: (folderId: string, parentId: string | null) => void
  onDuplicateNote: (id: string) => void
  onDeleteNote: (id: string) => void
  onTogglePin: (id: string) => void
}) {
  const [open, setOpen] = useState(true)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(node.folder.name)
  const [over, setOver] = useState(false)

  function acceptDrop(event: React.DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    const drag = parseDrag(event)
    if (drag.noteId) onDropNote(drag.noteId, node.folder.id)
    if (drag.folderId && drag.folderId !== node.folder.id) {
      onDropFolder(drag.folderId, node.folder.id)
    }
    setOver(false)
  }

  return (
    <div>
      <div
        className={`group flex items-center gap-1 rounded-md py-0.5 pr-0.5 transition-colors duration-150 ${
          over ? 'bg-accent/20 ring-1 ring-accent/50' : 'hover:bg-surface-2'
        }`}
        style={{ paddingLeft: 4 + depth * 10 }}
        onDragOver={(event) => {
          event.preventDefault()
          event.stopPropagation()
          event.dataTransfer.dropEffect = 'move'
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={acceptDrop}
      >
        <button
          type="button"
          className="w-4 shrink-0 text-[10px] text-text-dim"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Recolher pasta' : 'Expandir pasta'}
        >
          {open ? '▾' : '▸'}
        </button>
        <span className="shrink-0 text-[11px] text-accent/80" aria-hidden>
          ▣
        </span>
        {editing ? (
          <input
            autoFocus
            value={name}
            className="min-w-0 flex-1 rounded border border-border bg-surface-3 px-1 text-sm"
            onChange={(event) => setName(event.target.value)}
            onBlur={() => {
              setEditing(false)
              const next = name.trim() || node.folder.name
              if (next !== node.folder.name) onRenameFolder(node.folder.id, next)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') event.currentTarget.blur()
            }}
          />
        ) : (
          <button
            type="button"
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData(FOLDER_DRAG, node.folder.id)
              event.dataTransfer.setData('text/plain', `folder:${node.folder.id}`)
              event.dataTransfer.effectAllowed = 'move'
            }}
            className="min-w-0 flex-1 truncate text-left text-sm text-text"
            onDoubleClick={() => setEditing(true)}
            onClick={() => setOpen((value) => !value)}
          >
            {node.folder.name}
          </button>
        )}
        <ItemMenu
          items={[
            { label: 'Nova nota aqui', onClick: () => onNewNote(node.folder.id) },
            {
              label: 'Nova subpasta',
              onClick: () => onNewFolder(node.folder.id),
            },
            { label: 'Renomear', onClick: () => setEditing(true) },
            {
              label: 'Duplicar pasta',
              onClick: () => onDuplicateFolder(node.folder.id),
            },
            {
              label: 'Excluir',
              danger: true,
              onClick: () => onDeleteFolder(node.folder.id),
            },
          ]}
        />
      </div>
      {open && (
        <div
          className="ml-3 border-l border-accent/25"
          onDragOver={(event) => {
            event.preventDefault()
            event.stopPropagation()
            event.dataTransfer.dropEffect = 'move'
          }}
          onDrop={acceptDrop}
        >
          {node.children.map((child) => (
            <FolderBlock
              key={child.folder.id}
              node={child}
              depth={0}
              currentId={currentId}
              onOpen={onOpen}
              onNewNote={onNewNote}
              onNewFolder={onNewFolder}
              onRenameFolder={onRenameFolder}
              onDeleteFolder={onDeleteFolder}
              onDuplicateFolder={onDuplicateFolder}
              onDropNote={onDropNote}
              onDropFolder={onDropFolder}
              onDuplicateNote={onDuplicateNote}
              onDeleteNote={onDeleteNote}
              onTogglePin={onTogglePin}
            />
          ))}
          {node.notes.map((entry) => (
            <NoteRow
              key={entry.id}
              note={entry}
              depth={1}
              active={entry.id === currentId}
              onOpen={onOpen}
              onDuplicate={onDuplicateNote}
              onDelete={onDeleteNote}
              onTogglePin={onTogglePin}
            />
          ))}
          {node.children.length === 0 && node.notes.length === 0 && (
            <p className="px-2 py-1 text-[10px] text-text-dim">
              Vazia — solte uma nota aqui
            </p>
          )}
        </div>
      )}
    </div>
  )
}

function NoteRow({
  note,
  active,
  depth,
  onOpen,
  onDuplicate,
  onDelete,
  onTogglePin,
}: {
  note: WorldNote
  active: boolean
  depth: number
  onOpen: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
}) {
  return (
    <div
      className={`group flex w-full items-center gap-1 rounded-md py-0.5 pr-0.5 text-sm transition-colors duration-150 ${
        active
          ? 'bg-info/15 text-info'
          : 'text-text-muted hover:bg-surface-2 hover:text-text'
      }`}
      style={{ paddingLeft: 8 + depth * 10 }}
    >
      <button
        type="button"
        draggable
        onDragStart={(event) => {
          event.dataTransfer.setData(NOTE_DRAG, note.id)
          event.dataTransfer.setData('text/plain', `note:${note.id}`)
          event.dataTransfer.effectAllowed = 'move'
        }}
        onClick={() => onOpen(note.id)}
        className="flex min-w-0 flex-1 items-center gap-1 truncate text-left"
      >
        {note.pinned ? <span className="text-[10px] text-accent">●</span> : null}
        <span className="truncate">{note.title}</span>
      </button>
      <ItemMenu
        items={[
          { label: 'Abrir', onClick: () => onOpen(note.id) },
          { label: 'Duplicar', onClick: () => onDuplicate(note.id) },
          {
            label: note.pinned ? 'Desafixar' : 'Fixar',
            onClick: () => onTogglePin(note.id),
          },
          {
            label: 'Excluir',
            danger: true,
            onClick: () => onDelete(note.id),
          },
        ]}
      />
    </div>
  )
}

export function NoteTreePanel({
  notes,
  folders,
  currentId,
  query,
  onQuery,
  onOpen,
  onNewNote,
  onNewFolder,
  onRenameFolder,
  onDeleteFolder,
  onDuplicateFolder,
  onDropNote,
  onDropFolder,
  onDuplicateNote,
  onDeleteNote,
  onTogglePin,
}: {
  notes: WorldNote[]
  folders: WorldFolder[]
  currentId: string | null
  query: string
  onQuery: (value: string) => void
  onOpen: (id: string) => void
  onNewNote: (folderId: string | null) => void
  onNewFolder: (parentId: string | null) => void
  onRenameFolder: (id: string, name: string) => void
  onDeleteFolder: (id: string) => void
  onDuplicateFolder: (id: string) => void
  onDropNote: (noteId: string, folderId: string | null) => void
  onDropFolder: (folderId: string, parentId: string | null) => void
  onDuplicateNote: (id: string) => void
  onDeleteNote: (id: string) => void
  onTogglePin: (id: string) => void
}) {
  const tree = buildFolderTree(folders, notes)
  const roots = notesInFolder(notes, null)
  const q = query.trim()
  const filtered = q
    ? notes.filter((note) => {
        const hay = `${note.title} ${note.content}`.toLowerCase()
        return hay.includes(q.toLowerCase())
      })
    : null

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex gap-1 border-b border-border/70 p-2">
        <Button size="sm" variant="accent" onClick={() => onNewNote(null)}>
          + Nota
        </Button>
        <Button size="sm" onClick={() => onNewFolder(null)}>
          + Pasta
        </Button>
      </div>
      <div className="p-2">
        <input
          type="search"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Buscar notas…"
          className="field-control w-full rounded-lg border border-border bg-surface-2 px-2 py-1 text-sm"
        />
      </div>
      <div
        className="min-h-0 flex-1 overflow-y-auto px-1 pb-3"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          const target = event.target as HTMLElement
          if (target.closest('[data-tree-item]')) return
          const drag = parseDrag(event)
          if (drag.noteId) onDropNote(drag.noteId, null)
          if (drag.folderId) onDropFolder(drag.folderId, null)
        }}
      >
        {filtered ? (
          filtered.length === 0 ? (
            <p className="px-2 text-xs text-text-dim">Nada para “{query}”.</p>
          ) : (
            filtered.map((note) => (
              <NoteRow
                key={note.id}
                note={note}
                depth={0}
                active={note.id === currentId}
                onOpen={onOpen}
                onDuplicate={onDuplicateNote}
                onDelete={onDeleteNote}
                onTogglePin={onTogglePin}
              />
            ))
          )
        ) : (
          <>
            {tree.map((node) => (
              <div key={node.folder.id} data-tree-item>
                <FolderBlock
                  node={node}
                  depth={0}
                  currentId={currentId}
                  onOpen={onOpen}
                  onNewNote={onNewNote}
                  onNewFolder={onNewFolder}
                  onRenameFolder={onRenameFolder}
                  onDeleteFolder={onDeleteFolder}
                  onDuplicateFolder={onDuplicateFolder}
                  onDropNote={onDropNote}
                  onDropFolder={onDropFolder}
                  onDuplicateNote={onDuplicateNote}
                  onDeleteNote={onDeleteNote}
                  onTogglePin={onTogglePin}
                />
              </div>
            ))}
            {roots.map((note) => (
              <NoteRow
                key={note.id}
                note={note}
                depth={0}
                active={note.id === currentId}
                onOpen={onOpen}
                onDuplicate={onDuplicateNote}
                onDelete={onDeleteNote}
                onTogglePin={onTogglePin}
              />
            ))}
            {notes.length === 0 && folders.length === 0 && (
              <p className="px-2 text-xs text-text-dim">
                Crie uma nota ou uma pasta para começar o worldbuilding.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
