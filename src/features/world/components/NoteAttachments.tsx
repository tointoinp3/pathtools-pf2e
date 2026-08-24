import { useEffect, useMemo, useRef, useState } from 'react'
import { db } from '@/db'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { listCreatures } from '@/engine/bestiaryCatalog'
import { listItemDefinitions } from '@/engine/equipmentCatalog'
import type {
  NoteAttachment,
  NoteAttachmentKind,
  WorldNote,
} from '@/types'
import {
  NOTE_ATTACHMENT_KIND_LABELS,
  NOTE_ATTACHMENT_KINDS,
} from '@/types'
import { newAttachmentId } from '@/features/world/worldRepository'
import { useWorldStore } from '@/stores/worldStore'
import { Link } from 'react-router-dom'

interface CatalogRow {
  id: string
  name: string
  hint: string
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

const HREF: Record<NoteAttachmentKind, (id: string) => string> = {
  creature: (id) => `/bestiario/${id}`,
  character: (id) => `/personagens/${id}`,
  encounter: (id) => `/bestiario/encontros/${id}`,
  combat: (id) => `/combate/${id}`,
  loot: (id) => `/saques/${id}`,
  item: (id) => `/compendio/equipamento?id=${encodeURIComponent(id)}`,
}

function attachmentHref(attachment: NoteAttachment): string {
  return HREF[attachment.kind](attachment.refId)
}

async function loadKind(kind: NoteAttachmentKind): Promise<CatalogRow[]> {
  if (kind === 'creature') {
    return listCreatures().map((creature) => ({
      id: creature.id,
      name: creature.name,
      hint: `Nv ${creature.level} · ${creature.originalName}`,
    }))
  }
  if (kind === 'item') {
    return listItemDefinitions().map((item) => ({
      id: item.id,
      name: item.name,
      hint: `${item.originalName} · nv ${item.level}`,
    }))
  }
  if (kind === 'character') {
    const rows = await db.characters.orderBy('name').toArray()
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      hint: row.playerName ? `Jogador: ${row.playerName}` : 'Personagem',
    }))
  }
  if (kind === 'encounter') {
    const rows = await db.encounters.orderBy('name').toArray()
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      hint: `Nv ${row.partyLevel} · ${row.lines.length} fichas`,
    }))
  }
  if (kind === 'combat') {
    const rows = await db.combatSessions.orderBy('name').toArray()
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      hint: `${row.tokens.length} tokens`,
    }))
  }
  const rows = await db.lootHauls.orderBy('name').toArray()
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    hint: `Nv ${row.partyLevel}`,
  }))
}

export function AttachPickerDialog({
  onClose,
  onPick,
}: {
  onClose: () => void
  onPick: (attachment: NoteAttachment) => void
}) {
  const [kind, setKind] = useState<NoteAttachmentKind>('creature')
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState<CatalogRow[]>([])
  const [loading, setLoading] = useState(true)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    void loadKind(kind).then((list) => {
      if (cancelled) return
      setRows(list)
      setLoading(false)
    })
    return () => {
      cancelled = true
    }
  }, [kind])

  useEffect(() => {
    searchRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const filtered = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean)
    if (words.length === 0) return rows
    return rows.filter((row) => {
      const hay = normalize(`${row.name} ${row.hint} ${row.id}`)
      return words.every((word) => hay.includes(word))
    })
  }, [rows, query])

  function pick(row: CatalogRow) {
    onPick({
      id: newAttachmentId(),
      kind,
      refId: row.id,
      label: row.name,
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="flex max-h-[min(40rem,92vh)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-3">
          <h2 className="font-display text-lg font-semibold text-accent">
            Atrelar à nota
          </h2>
          <div className="mt-2 flex flex-wrap gap-1">
            {NOTE_ATTACHMENT_KINDS.map((id) => (
              <button
                key={id}
                type="button"
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  kind === id
                    ? 'bg-accent/20 text-accent'
                    : 'bg-surface-2 text-text-muted hover:text-text'
                }`}
                onClick={() => {
                  setKind(id)
                  setQuery('')
                }}
              >
                {NOTE_ATTACHMENT_KIND_LABELS[id]}
              </button>
            ))}
          </div>
          <Input
            ref={searchRef}
            className="mt-2"
            placeholder="Buscar…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="mt-1 flex justify-end">
            <FilterCount shown={filtered.length} total={rows.length} />
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {loading ? (
            <p className="p-4 text-sm text-text-dim">Carregando…</p>
          ) : filtered.length === 0 ? (
            <p className="p-4 text-sm text-text-dim">Nada neste catálogo.</p>
          ) : (
            <ul>
              {filtered.slice(0, 80).map((row) => (
                <li key={row.id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 px-4 py-2 text-left hover:bg-surface-2"
                    onClick={() => pick(row)}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-text">
                        {row.name}
                      </span>
                      <span className="block truncate text-[11px] text-text-dim">
                        {row.hint}
                      </span>
                    </span>
                    <span className="text-xs text-accent">Atrelar</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-border/70 px-4 py-2 text-right">
          <Button size="sm" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  )
}

export function NoteAttachments({ note }: { note: WorldNote }) {
  const [picker, setPicker] = useState(false)
  const addAttachment = useWorldStore((s) => s.addAttachment)
  const updateAttachment = useWorldStore((s) => s.updateAttachment)
  const removeAttachment = useWorldStore((s) => s.removeAttachment)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-accent/85">
          Atrelados
        </h3>
        <Button size="sm" onClick={() => setPicker(true)}>
          + Atrelar
        </Button>
      </div>
      {note.attachments.length === 0 ? (
        <p className="text-[11px] text-text-dim">
          Fichas, encontros, combates, saques ou itens — um mercador pode
          carregar o inventário da loja; um covil, o combate pronto.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {note.attachments.map((attachment) => (
            <li
              key={attachment.id}
              className="rounded-lg border border-border/70 bg-surface-2/50 px-2 py-1.5"
            >
              <div className="flex items-start justify-between gap-2">
                <Link
                  to={attachmentHref(attachment)}
                  className="min-w-0 text-sm text-info hover:underline"
                >
                  {attachment.label || attachment.refId}
                </Link>
                <button
                  type="button"
                  className="text-xs text-danger/80"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  ×
                </button>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-text-dim">
                {NOTE_ATTACHMENT_KIND_LABELS[attachment.kind]}
              </div>
              <input
                value={attachment.label ?? ''}
                placeholder="Anotação (ex.: até 50 PO)"
                className="mt-1 w-full bg-transparent text-xs text-text-muted outline-none"
                onChange={(event) =>
                  updateAttachment(attachment.id, {
                    label: event.target.value,
                  })
                }
              />
            </li>
          ))}
        </ul>
      )}
      {picker && (
        <AttachPickerDialog
          onClose={() => setPicker(false)}
          onPick={(attachment) => {
            addAttachment(attachment)
            setPicker(false)
          }}
        />
      )}
    </div>
  )
}
