import { create } from 'zustand'
import type {
  NoteAttachment,
  WorldFolder,
  WorldNote,
} from '@/types'
import {
  createEmptyFolder,
  createEmptyNote,
  deleteFolder,
  deleteNote,
  listFolders,
  listNotes,
  saveFolder,
  saveNote,
} from '@/features/world/worldRepository'
import { canMoveFolder, descendantFolderIds } from '@/features/world/noteTree'
import { createId, nowIso } from '@/utils/id'

const SAVE_DEBOUNCE_MS = 400
let saveTimer: ReturnType<typeof setTimeout> | null = null

interface WorldStoreState {
  notes: WorldNote[]
  folders: WorldFolder[]
  current: WorldNote | null
  loading: boolean
  error: string | null

  loadAll: () => Promise<void>
  loadNote: (id: string) => Promise<WorldNote | null>
  createNote: (partial?: Partial<WorldNote>) => Promise<WorldNote>
  duplicateNote: (id: string) => Promise<WorldNote>
  removeNote: (id: string) => Promise<void>
  flushSave: () => Promise<void>
  patchCurrent: (patch: Partial<WorldNote>) => void
  setCurrentContent: (content: string) => void
  renameCurrent: (title: string) => void
  moveNote: (id: string, folderId: string | null) => Promise<void>
  togglePin: (id: string) => Promise<void>
  addAttachment: (attachment: NoteAttachment) => void
  updateAttachment: (id: string, patch: Partial<NoteAttachment>) => void
  removeAttachment: (id: string) => void

  createFolder: (partial?: Partial<WorldFolder>) => Promise<WorldFolder>
  duplicateFolder: (id: string) => Promise<WorldFolder | null>
  renameFolder: (id: string, name: string) => Promise<void>
  moveFolder: (id: string, parentId: string | null) => Promise<void>
  removeFolder: (id: string) => Promise<void>
}

export const useWorldStore = create<WorldStoreState>((set, get) => {
  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      saveTimer = null
      const current = get().current
      if (!current) return
      void saveNote(current)
    }, SAVE_DEBOUNCE_MS)
  }

  function commitCurrent(next: WorldNote) {
    set((state) => ({
      current: next,
      notes: state.notes.map((note) => (note.id === next.id ? next : note)),
    }))
    scheduleSave()
  }

  return {
    notes: [],
    folders: [],
    current: null,
    loading: false,
    error: null,

    loadAll: async () => {
      set({ loading: true, error: null })
      try {
        const [notes, folders] = await Promise.all([listNotes(), listFolders()])
        set({ notes, folders, loading: false })
      } catch (e) {
        set({
          loading: false,
          error: e instanceof Error ? e.message : 'Erro ao carregar o mundo',
        })
      }
    },

    loadNote: async (id) => {
      const fromList = get().notes.find((note) => note.id === id)
      const note = fromList ?? (await listNotes()).find((n) => n.id === id) ?? null
      if (!note) {
        const fresh = await listNotes()
        const found = fresh.find((n) => n.id === id) ?? null
        set({ current: found, notes: fresh })
        return found
      }
      set({ current: note })
      return note
    },

    createNote: async (partial) => {
      const note = createEmptyNote(get().notes, partial)
      await saveNote(note)
      const notes = await listNotes()
      set({ notes, current: note })
      return note
    },

    duplicateNote: async (id) => {
      const source = get().notes.find((note) => note.id === id)
      if (!source) throw new Error('Nota não encontrada.')
      const copy = createEmptyNote(get().notes, {
        ...source,
        id: createId('note'),
        title: `${source.title} (cópia)`,
        createdAt: nowIso(),
      })
      await saveNote(copy)
      const notes = await listNotes()
      set({ notes, current: copy })
      return copy
    },

    removeNote: async (id) => {
      await deleteNote(id)
      const notes = await listNotes()
      const current = get().current
      set({
        notes,
        current: current?.id === id ? null : current,
      })
    },

    flushSave: async () => {
      if (saveTimer) {
        clearTimeout(saveTimer)
        saveTimer = null
      }
      const current = get().current
      if (current) await saveNote(current)
    },

    patchCurrent: (patch) => {
      const current = get().current
      if (!current) return
      commitCurrent({ ...current, ...patch })
    },

    setCurrentContent: (content) => {
      const current = get().current
      if (!current) return
      commitCurrent({ ...current, content })
    },

    renameCurrent: (title) => {
      const current = get().current
      if (!current) return
      commitCurrent({ ...current, title })
    },

    moveNote: async (id, folderId) => {
      const note = get().notes.find((entry) => entry.id === id)
      if (!note) return
      const next = { ...note, folderId }
      await saveNote(next)
      set((state) => ({
        notes: state.notes.map((entry) => (entry.id === id ? next : entry)),
        current: state.current?.id === id ? next : state.current,
      }))
    },

    togglePin: async (id) => {
      const note = get().notes.find((entry) => entry.id === id)
      if (!note) return
      const next = { ...note, pinned: !note.pinned }
      await saveNote(next)
      set((state) => ({
        notes: state.notes.map((entry) => (entry.id === id ? next : entry)),
        current: state.current?.id === id ? next : state.current,
      }))
    },

    addAttachment: (attachment) => {
      const current = get().current
      if (!current) return
      commitCurrent({
        ...current,
        attachments: [...current.attachments, attachment],
      })
    },

    updateAttachment: (id, patch) => {
      const current = get().current
      if (!current) return
      commitCurrent({
        ...current,
        attachments: current.attachments.map((item) =>
          item.id === id ? { ...item, ...patch } : item,
        ),
      })
    },

    removeAttachment: (id) => {
      const current = get().current
      if (!current) return
      commitCurrent({
        ...current,
        attachments: current.attachments.filter((item) => item.id !== id),
      })
    },

    createFolder: async (partial) => {
      const folder = createEmptyFolder(get().folders, partial)
      await saveFolder(folder)
      set({ folders: await listFolders() })
      return folder
    },

    duplicateFolder: async (id) => {
      const folders = get().folders
      const notes = get().notes
      const source = folders.find((folder) => folder.id === id)
      if (!source) return null
      const treeIds = descendantFolderIds(folders, id)
      const idMap = new Map<string, string>()
      for (const oldId of treeIds) idMap.set(oldId, createId('folder'))
      const now = nowIso()
      const copies: WorldFolder[] = []
      for (const oldId of treeIds) {
        const folder = folders.find((entry) => entry.id === oldId)
        if (!folder) continue
        const nextId = idMap.get(oldId)!
        const parentId =
          oldId === id
            ? folder.parentId
            : folder.parentId
              ? (idMap.get(folder.parentId) ?? folder.parentId)
              : null
        copies.push({
          ...folder,
          id: nextId,
          parentId,
          name:
            oldId === id
              ? createEmptyFolder(folders, {
                  name: `${folder.name} (cópia)`,
                  parentId: folder.parentId,
                }).name
              : folder.name,
          createdAt: now,
          updatedAt: now,
        })
      }
      const noteCopies: WorldNote[] = []
      for (const note of notes) {
        if (!note.folderId || !idMap.has(note.folderId)) continue
        noteCopies.push(
          createEmptyNote(notes.concat(noteCopies), {
            ...note,
            id: createId('note'),
            folderId: idMap.get(note.folderId) ?? null,
            title: note.title,
            createdAt: now,
            updatedAt: now,
          }),
        )
      }
      for (const folder of copies) await saveFolder(folder)
      for (const note of noteCopies) await saveNote(note)
      set({
        notes: await listNotes(),
        folders: await listFolders(),
      })
      return copies.find((folder) => folder.parentId === source.parentId) ?? copies[0] ?? null
    },

    renameFolder: async (id, name) => {
      const folder = get().folders.find((entry) => entry.id === id)
      if (!folder) return
      await saveFolder({ ...folder, name })
      set({ folders: await listFolders() })
    },

    moveFolder: async (id, parentId) => {
      const folders = get().folders
      if (!canMoveFolder(folders, id, parentId)) return
      const folder = folders.find((entry) => entry.id === id)
      if (!folder) return
      await saveFolder({ ...folder, parentId })
      set({ folders: await listFolders() })
    },

    removeFolder: async (id) => {
      await deleteFolder(id)
      const [notes, folders] = await Promise.all([listNotes(), listFolders()])
      set({ notes, folders })
    },
  }
})
