/**
 * Árvore de pastas das notas do mundo. Funções puras — a UI só renderiza.
 */

import type { WorldFolder, WorldNote } from '@/types/world'
import { normalizeTitleKey } from './markdown'

export interface FolderNode {
  folder: WorldFolder
  children: FolderNode[]
  notes: WorldNote[]
}

export function sortByName<T extends { name?: string; title?: string }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => {
    const left = normalizeTitleKey(a.title ?? a.name ?? '')
    const right = normalizeTitleKey(b.title ?? b.name ?? '')
    return left.localeCompare(right, 'pt')
  })
}

export function notesInFolder(
  notes: readonly WorldNote[],
  folderId: string | null,
): WorldNote[] {
  return sortByName(notes.filter((note) => note.folderId === folderId))
}

export function childFolders(
  folders: readonly WorldFolder[],
  parentId: string | null,
): WorldFolder[] {
  return sortByName(folders.filter((folder) => folder.parentId === parentId))
}

export function buildFolderTree(
  folders: readonly WorldFolder[],
  notes: readonly WorldNote[],
): FolderNode[] {
  function nodeFor(folder: WorldFolder): FolderNode {
    return {
      folder,
      children: childFolders(folders, folder.id).map(nodeFor),
      notes: notesInFolder(notes, folder.id),
    }
  }
  return childFolders(folders, null).map(nodeFor)
}

export function folderPath(
  folders: readonly WorldFolder[],
  folderId: string | null,
): WorldFolder[] {
  const byId = new Map(folders.map((folder) => [folder.id, folder]))
  const path: WorldFolder[] = []
  let current = folderId ? byId.get(folderId) : undefined
  const seen = new Set<string>()
  while (current && !seen.has(current.id)) {
    seen.add(current.id)
    path.unshift(current)
    current = current.parentId ? byId.get(current.parentId) : undefined
  }
  return path
}

/** A pasta e todas as pastas dentro dela (para busca/exclusão em cascata). */
export function descendantFolderIds(
  folders: readonly WorldFolder[],
  folderId: string,
): string[] {
  const ids = [folderId]
  const children = folders.filter((folder) => folder.parentId === folderId)
  for (const child of children) {
    ids.push(...descendantFolderIds(folders, child.id))
  }
  return ids
}

/**
 * Não dá para soltar uma pasta dentro dela mesma ou de um descendente —
 * isso criaria um ciclo.
 */
export function canMoveFolder(
  folders: readonly WorldFolder[],
  folderId: string,
  newParentId: string | null,
): boolean {
  if (newParentId === folderId) return false
  if (newParentId === null) return true
  const blocked = new Set(descendantFolderIds(folders, folderId))
  return !blocked.has(newParentId)
}

export function uniqueTitle(
  notes: readonly WorldNote[],
  desired: string,
  exceptId?: string,
): string {
  const base = desired.trim() || 'Nova nota'
  const taken = new Set(
    notes
      .filter((note) => note.id !== exceptId)
      .map((note) => normalizeTitleKey(note.title)),
  )
  if (!taken.has(normalizeTitleKey(base))) return base
  let n = 2
  while (taken.has(normalizeTitleKey(`${base} ${n}`))) n += 1
  return `${base} ${n}`
}

export function uniqueFolderName(
  folders: readonly WorldFolder[],
  parentId: string | null,
  desired: string,
  exceptId?: string,
): string {
  const base = desired.trim() || 'Nova pasta'
  const siblings = folders.filter(
    (folder) => folder.parentId === parentId && folder.id !== exceptId,
  )
  const taken = new Set(siblings.map((folder) => normalizeTitleKey(folder.name)))
  if (!taken.has(normalizeTitleKey(base))) return base
  let n = 2
  while (taken.has(normalizeTitleKey(`${base} ${n}`))) n += 1
  return `${base} ${n}`
}

export function filterNotes(
  notes: readonly WorldNote[],
  query: string,
): WorldNote[] {
  const words = normalizeTitleKey(query)
    .split(/\s+/)
    .filter(Boolean)
  if (words.length === 0) return [...notes]
  return notes.filter((note) => {
    const hay = normalizeTitleKey(
      `${note.title} ${note.content} ${note.attachments.map((a) => a.label ?? '').join(' ')}`,
    )
    return words.every((word) => hay.includes(word))
  })
}
