import type { Character, CharacterStickyNote, StickyNoteColor } from '@/types'
import { clamp } from '@/utils/fn'
import { createId, nowIso } from '@/utils/id'

export const STICKY_NOTE_COLORS: StickyNoteColor[] = [
  'parchment',
  'amber',
  'sage',
  'rose',
  'sky',
  'slate',
]

export const STICKY_NOTE_MIN_WIDTH = 160
export const STICKY_NOTE_MIN_HEIGHT = 140
export const STICKY_NOTE_DEFAULT_WIDTH = 220
export const STICKY_NOTE_DEFAULT_HEIGHT = 180

export const STICKY_NOTE_SIZE_PRESETS = {
  sm: { width: 180, height: 150 },
  md: { width: 220, height: 180 },
  lg: { width: 280, height: 240 },
  xl: { width: 340, height: 300 },
} as const

export type StickyNoteSizePreset = keyof typeof STICKY_NOTE_SIZE_PRESETS

export const STICKY_NOTE_COLOR_LABELS: Record<StickyNoteColor, string> = {
  parchment: 'Pergaminho',
  amber: 'Âmbar',
  sage: 'Sálvia',
  rose: 'Rosa',
  sky: 'Céu',
  slate: 'Ardósia',
}

export const STICKY_NOTE_GRID = 16

export const STICKY_NOTE_SIZE_LABELS: Record<StickyNoteSizePreset, string> = {
  sm: 'P',
  md: 'M',
  lg: 'G',
  xl: 'GG',
}

export interface StickyNoteTemplate {
  id: string
  label: string
  hint: string
  title: string
  body: string
  color: StickyNoteColor
}

export const STICKY_NOTE_TEMPLATES: StickyNoteTemplate[] = [
  {
    id: 'blank',
    label: 'Em branco',
    hint: 'Começar do zero',
    title: '',
    body: '',
    color: 'parchment',
  },
  {
    id: 'session',
    label: 'Sessão',
    hint: 'O que rolou hoje',
    title: 'Sessão',
    body: 'Data:\nOnde:\nO que aconteceu:\nNPCs:\nPróximo:\n',
    color: 'sky',
  },
  {
    id: 'npc',
    label: 'NPC',
    hint: 'Nome e gancho',
    title: 'NPC',
    body: 'Nome:\nOnde encontra:\nO que quer:\nComo ajuda ou atrapalha:\n',
    color: 'rose',
  },
  {
    id: 'loot',
    label: 'Tesouro',
    hint: 'O que acharam',
    title: 'Tesouro',
    body: 'O quê:\nOnde:\nQuem ficou com:\n',
    color: 'amber',
  },
  {
    id: 'ask',
    label: 'Dúvida',
    hint: 'Perguntar ao MJ',
    title: 'Dúvida',
    body: '',
    color: 'sage',
  },
  {
    id: 'secret',
    label: 'Segredo',
    hint: 'Só este personagem',
    title: 'Segredo',
    body: '(só este personagem sabe)\n',
    color: 'slate',
  },
]

/** Converte nota antiga (string) em mural, se necessário */
export function resolveStickyNotes(
  character: Pick<Character, 'stickyNotes' | 'notes'>,
): CharacterStickyNote[] {
  if (character.stickyNotes && character.stickyNotes.length > 0) {
    return character.stickyNotes
  }

  const legacy = character.notes?.trim()
  if (!legacy) return character.stickyNotes ?? []

  const now = nowIso()
  return [
    {
      id: 'note-legacy-migrated',
      title: 'Notas antigas',
      body: legacy,
      color: 'parchment',
      x: 28,
      y: 28,
      width: STICKY_NOTE_DEFAULT_WIDTH,
      height: Math.max(STICKY_NOTE_DEFAULT_HEIGHT, 220),
      zIndex: 1,
      createdAt: now,
      updatedAt: now,
    },
  ]
}

/** True quando ainda existe texto antigo para virar mural */
export function needsStickyNotesMigration(
  character: Pick<Character, 'stickyNotes' | 'notes'>,
): boolean {
  return (
    !(character.stickyNotes && character.stickyNotes.length > 0) &&
    Boolean(character.notes?.trim())
  )
}

export function createStickyNote(
  overrides?: Partial<CharacterStickyNote>,
  existing: CharacterStickyNote[] = [],
): CharacterStickyNote {
  const now = nowIso()
  const maxZ = existing.reduce((max, note) => Math.max(max, note.zIndex), 0)
  const offset = (existing.length % 6) * 18

  return {
    id: createId('note'),
    title: '',
    body: '',
    color: STICKY_NOTE_COLORS[existing.length % STICKY_NOTE_COLORS.length]!,
    x: 32 + offset,
    y: 32 + offset,
    width: STICKY_NOTE_DEFAULT_WIDTH,
    height: STICKY_NOTE_DEFAULT_HEIGHT,
    zIndex: maxZ + 1,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

export function updateStickyNote(
  notes: CharacterStickyNote[],
  id: string,
  patch: Partial<CharacterStickyNote>,
): CharacterStickyNote[] {
  return notes.map((note) =>
    note.id === id
      ? { ...note, ...patch, updatedAt: nowIso() }
      : note,
  )
}

export function bringStickyNoteToFront(
  notes: CharacterStickyNote[],
  id: string,
): CharacterStickyNote[] {
  const maxZ = notes.reduce((max, note) => Math.max(max, note.zIndex), 0)
  return updateStickyNote(notes, id, { zIndex: maxZ + 1 })
}

export function clampStickyNoteSize(width: number, height: number) {
  return {
    width: clamp(width, STICKY_NOTE_MIN_WIDTH, 520),
    height: clamp(height, STICKY_NOTE_MIN_HEIGHT, 480),
  }
}

export function snapStickyValue(value: number): number {
  return Math.max(0, Math.round(value / STICKY_NOTE_GRID) * STICKY_NOTE_GRID)
}

export function snapStickyPosition(x: number, y: number) {
  return { x: snapStickyValue(x), y: snapStickyValue(y) }
}

export function stickyNoteMatches(
  note: CharacterStickyNote,
  query: string,
): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    (note.title ?? '').toLowerCase().includes(q) ||
    note.body.toLowerCase().includes(q)
  )
}

export function stickyNoteSnippet(
  note: CharacterStickyNote,
  max = 96,
): string {
  const text = note.body.replace(/\s+/g, ' ').trim()
  if (!text) return 'Vazia'
  return text.length > max ? `${text.slice(0, max)}…` : text
}

export function stickyNoteTitle(note: CharacterStickyNote): string {
  const title = note.title?.trim()
  if (title) return title
  const line = note.body.split('\n').find((part) => part.trim())
  if (line) {
    const trimmed = line.trim()
    return trimmed.length > 32 ? `${trimmed.slice(0, 32)}…` : trimmed
  }
  return 'Sem título'
}

export function sortStickyNotes(
  notes: CharacterStickyNote[],
): CharacterStickyNote[] {
  return [...notes].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1
    return b.updatedAt.localeCompare(a.updatedAt)
  })
}

export function formatStickyNoteTime(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diff = Date.now() - then
  if (diff < 45_000) return 'agora'
  if (diff < 3_600_000) return `${Math.max(1, Math.round(diff / 60_000))} min`
  if (diff < 86_400_000) return `${Math.max(1, Math.round(diff / 3_600_000))} h`
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
  })
}

export function duplicateStickyNote(
  notes: CharacterStickyNote[],
  id: string,
): CharacterStickyNote[] {
  const source = notes.find((note) => note.id === id)
  if (!source) return notes
  const copy = createStickyNote(
    {
      title: source.title?.trim()
        ? `${source.title.trim()} (cópia)`
        : 'Cópia',
      body: source.body,
      color: source.color,
      width: source.width,
      height: source.height,
      x: source.x + STICKY_NOTE_GRID * 2,
      y: source.y + STICKY_NOTE_GRID * 2,
      pinned: false,
    },
    notes,
  )
  return [...notes, copy]
}

export function tileStickyNotes(
  notes: CharacterStickyNote[],
): CharacterStickyNote[] {
  const pad = STICKY_NOTE_GRID * 2
  const gap = STICKY_NOTE_GRID
  const maxRow = 920
  let x = pad
  let y = pad
  let rowHeight = 0
  const now = nowIso()
  return sortStickyNotes(notes).map((note) => {
    if (x > pad && x + note.width > maxRow) {
      x = pad
      y += rowHeight + gap
      rowHeight = 0
    }
    const placed = { ...note, x, y, updatedAt: now }
    x += note.width + gap
    rowHeight = Math.max(rowHeight, note.height)
    return placed
  })
}

export function stickyNotesBoardSize(notes: CharacterStickyNote[]) {
  let width = 880
  let height = 520
  for (const note of notes) {
    width = Math.max(width, note.x + note.width + 64)
    height = Math.max(height, note.y + note.height + 64)
  }
  return { width, height }
}
