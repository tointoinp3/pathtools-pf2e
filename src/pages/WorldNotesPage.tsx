import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Tip } from '@/components/ui/Panel'
import { useWorldStore } from '@/stores/worldStore'
import { backlinksTo } from '@/features/world/markdown'
import { filterNotes, folderPath } from '@/features/world/noteTree'
import { NOTE_TEMPLATES } from '@/features/world/noteTemplates'
import { NoteTreePanel } from '@/features/world/components/NoteTreePanel'
import {
  NoteEditor,
  copyWikiLink,
} from '@/features/world/components/NoteEditor'
import { NoteAttachments } from '@/features/world/components/NoteAttachments'
import { WorldJsonButtons } from '@/features/backup/JsonExchangeButtons'

export function WorldNotesPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    notes,
    folders,
    current,
    loading,
    loadAll,
    loadNote,
    createNote,
    duplicateNote,
    removeNote,
    flushSave,
    setCurrentContent,
    renameCurrent,
    moveNote,
    togglePin,
    createFolder,
    duplicateFolder,
    renameFolder,
    removeFolder,
    moveFolder,
  } = useWorldStore()
  const [query, setQuery] = useState('')
  const [switcher, setSwitcher] = useState(false)
  const [switcherQuery, setSwitcherQuery] = useState('')
  const [switcherIndex, setSwitcherIndex] = useState(0)

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  useEffect(() => {
    if (id) void loadNote(id)
  }, [id, loadNote])

  useEffect(() => {
    return () => {
      void flushSave()
    }
  }, [flushSave, id])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const mod = event.ctrlKey || event.metaKey
      if (mod && (event.key === 'k' || event.key === 'p')) {
        event.preventDefault()
        setSwitcher(true)
        setSwitcherQuery('')
      }
      if (mod && event.key.toLowerCase() === 's') {
        event.preventDefault()
        void flushSave()
      }
      if (event.key === 'Escape') setSwitcher(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flushSave])

  const note = current && current.id === id ? current : notes.find((n) => n.id === id) ?? null
  const crumbs = folderPath(folders, note?.folderId ?? null)
  const backlinks = useMemo(
    () => (note ? backlinksTo(notes, note) : []),
    [note, notes],
  )
  const switcherHits = useMemo(
    () => filterNotes(notes, switcherQuery).slice(0, 12),
    [notes, switcherQuery],
  )
  const canCreateFromSwitcher =
    switcherQuery.trim().length > 0 &&
    !notes.some(
      (entry) =>
        entry.title.toLowerCase() === switcherQuery.trim().toLowerCase(),
    )

  useEffect(() => {
    setSwitcherIndex(0)
  }, [switcherQuery, switcher])

  async function openOrCreate(title: string) {
    const existing = notes.find(
      (entry) => entry.title.toLowerCase() === title.toLowerCase(),
    )
    if (existing) {
      navigate(`/mundo/notas/${existing.id}`)
      return
    }
    const created = await createNote({
      title,
      folderId: note?.folderId ?? null,
    })
    navigate(`/mundo/notas/${created.id}`)
  }

  async function handleNew(folderId: string | null, templateId?: string) {
    const template =
      NOTE_TEMPLATES.find((item) => item.id === templateId) ?? NOTE_TEMPLATES[0]
    const created = await createNote({
      folderId,
      title: template?.title,
      content: template?.content,
    })
    navigate(`/mundo/notas/${created.id}`)
  }

  return (
    <div className="flex h-full min-h-0">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface-1">
        <div className="border-b border-border/70 px-3 py-2">
          <div className="font-display text-sm font-semibold tracking-wide text-accent">
            Notas
          </div>
          <p className="text-[10px] text-text-dim">
            Pastas, [[links]] e atrelados · Ctrl+K busca
          </p>
        </div>
        <NoteTreePanel
          notes={notes}
          folders={folders}
          currentId={id ?? null}
          query={query}
          onQuery={setQuery}
          onOpen={(noteId) => navigate(`/mundo/notas/${noteId}`)}
          onNewNote={(folderId) => void handleNew(folderId)}
          onNewFolder={(parentId) => void createFolder({ parentId })}
          onRenameFolder={(folderId, name) => void renameFolder(folderId, name)}
          onDeleteFolder={(folderId) => {
            if (
              window.confirm(
                'Excluir esta pasta? As notas sobem um nível; subpastas também saem.',
              )
            ) {
              void removeFolder(folderId)
            }
          }}
          onDuplicateFolder={(folderId) => void duplicateFolder(folderId)}
          onDropNote={(noteId, folderId) => void moveNote(noteId, folderId)}
          onDropFolder={(folderId, parentId) => void moveFolder(folderId, parentId)}
          onDuplicateNote={(noteId) => {
            void duplicateNote(noteId).then((copy) =>
              navigate(`/mundo/notas/${copy.id}`),
            )
          }}
          onDeleteNote={(noteId) => {
            const target = notes.find((entry) => entry.id === noteId)
            if (!target) return
            if (!window.confirm(`Excluir “${target.title}”?`)) return
            void removeNote(noteId).then(() => {
              if (id === noteId) navigate('/mundo')
            })
          }}
          onTogglePin={(noteId) => void togglePin(noteId)}
        />
        <div className="border-t border-border/70 p-2">
          <WorldJsonButtons />
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        {!id || !note ? (
          <div className="mx-auto max-w-lg p-6">
            <h1 className="font-display text-2xl font-semibold text-accent">
              Mundo
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              Wiki da campanha — notas em markdown, ligadas por
              [[colchetes duplos]], com pastas livres e um mapa político à
              parte.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {NOTE_TEMPLATES.map((template) => (
                <Button
                  key={template.id}
                  size="sm"
                  variant={template.id === 'blank' ? 'accent' : 'secondary'}
                  title={template.hint}
                  onClick={() => void handleNew(null, template.id)}
                >
                  {template.label}
                </Button>
              ))}
            </div>
            <div className="mt-4">
              <Tip>
                Um círculo no mapa não significa cidade — você decide a
                legenda. O mesmo vale para as notas: atrele um combate ao covil
                ou o estoque ao mercador quando quiser.
              </Tip>
            </div>
            {loading && (
              <p className="mt-3 text-xs text-text-dim">Carregando…</p>
            )}
          </div>
        ) : (
          <div className="flex min-h-0 flex-1">
            <div className="flex min-w-0 flex-1 flex-col">
              {crumbs.length > 0 && (
                <div className="border-b border-border/40 px-3 py-1 text-[11px] text-text-dim">
                  {crumbs.map((folder, index) => (
                    <span key={folder.id}>
                      {index > 0 ? ' / ' : ''}
                      {folder.name}
                    </span>
                  ))}
                </div>
              )}
              <NoteEditor
                note={note}
                notes={notes}
                onChange={setCurrentContent}
                onRename={renameCurrent}
                onOpenNote={(target) => navigate(`/mundo/notas/${target.id}`)}
                onCreateLinked={(title) => void openOrCreate(title)}
              />
            </div>
            <aside className="flex w-64 shrink-0 flex-col gap-4 overflow-y-auto border-l border-border bg-surface-1 p-3">
              <div className="flex flex-wrap gap-1">
                <Button size="sm" onClick={() => void togglePin(note.id)}>
                  {note.pinned ? 'Desafixar' : 'Fixar'}
                </Button>
                <Button size="sm" onClick={() => copyWikiLink(note.title)}>
                  Copiar [[link]]
                </Button>
                <Button
                  size="sm"
                  onClick={async () => {
                    const copy = await duplicateNote(note.id)
                    navigate(`/mundo/notas/${copy.id}`)
                  }}
                >
                  Duplicar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    if (!window.confirm(`Excluir “${note.title}”?`)) return
                    void removeNote(note.id).then(() => navigate('/mundo'))
                  }}
                >
                  Excluir
                </Button>
              </div>
              <NoteAttachments note={note} />
              <div>
                <h3 className="mb-2 font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
                  Menções
                </h3>
                {backlinks.length === 0 ? (
                  <p className="text-[11px] text-text-dim">
                    Nenhuma nota aponta para esta ainda. Use [[{note.title}]]
                    em outra página.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {backlinks.map((entry) => (
                      <li key={entry.id}>
                        <button
                          type="button"
                          className="text-sm text-info hover:underline"
                          onClick={() => navigate(`/mundo/notas/${entry.id}`)}
                        >
                          {entry.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        )}
      </section>

      {switcher && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/45 p-8 animate-fade-up"
          onClick={() => setSwitcher(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface-1 shadow-xl animate-pop-in"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              autoFocus
              value={switcherQuery}
              onChange={(event) => setSwitcherQuery(event.target.value)}
              placeholder="Abrir ou criar nota…"
              className="w-full border-b border-border bg-transparent px-3 py-2 text-sm outline-none"
              onKeyDown={(event) => {
                const total = switcherHits.length + (canCreateFromSwitcher ? 1 : 0)
                if (event.key === 'ArrowDown' && total > 0) {
                  event.preventDefault()
                  setSwitcherIndex((i) => (i + 1) % total)
                }
                if (event.key === 'ArrowUp' && total > 0) {
                  event.preventDefault()
                  setSwitcherIndex((i) => (i - 1 + total) % total)
                }
                if (event.key === 'Enter') {
                  event.preventDefault()
                  const hit = switcherHits[switcherIndex]
                  if (hit && switcherIndex < switcherHits.length) {
                    navigate(`/mundo/notas/${hit.id}`)
                    setSwitcher(false)
                    return
                  }
                  if (canCreateFromSwitcher) {
                    void openOrCreate(switcherQuery.trim())
                    setSwitcher(false)
                  }
                }
              }}
            />
            <ul className="max-h-80 overflow-y-auto">
              {switcherHits.map((entry, index) => (
                <li key={entry.id}>
                  <button
                    type="button"
                    className={`block w-full px-3 py-2 text-left text-sm ${
                      index === switcherIndex
                        ? 'bg-accent/15 text-accent'
                        : 'hover:bg-surface-2'
                    }`}
                    onClick={() => {
                      navigate(`/mundo/notas/${entry.id}`)
                      setSwitcher(false)
                    }}
                  >
                    {entry.title}
                  </button>
                </li>
              ))}
              {canCreateFromSwitcher && (
                <li>
                  <button
                    type="button"
                    className={`block w-full px-3 py-2 text-left text-sm ${
                      switcherIndex === switcherHits.length
                        ? 'bg-accent/15 text-accent'
                        : 'text-accent hover:bg-surface-2'
                    }`}
                    onClick={() => {
                      void openOrCreate(switcherQuery.trim())
                      setSwitcher(false)
                    }}
                  >
                    Criar “{switcherQuery.trim()}”
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
