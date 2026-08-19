import { create } from 'zustand'

export type WorkspaceMode = 'character' | 'loot' | 'bestiary'

const STORAGE_KEY = 'sp-workspace-mode'

function parseMode(value: string | null): WorkspaceMode {
  if (value === 'loot' || value === 'bestiary') return value
  return 'character'
}

function readStoredMode(): WorkspaceMode {
  try {
    return parseMode(localStorage.getItem(STORAGE_KEY))
  } catch {
    return 'character'
  }
}

function writeStoredMode(mode: WorkspaceMode) {
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    /* ignore quota / private mode */
  }
}

function modeFromPath(pathname: string): WorkspaceMode | null {
  if (pathname.startsWith('/saques')) return 'loot'
  if (pathname.startsWith('/bestiario')) return 'bestiary'
  if (pathname.startsWith('/personagens')) return 'character'
  return null
}

interface WorkspaceState {
  mode: WorkspaceMode
  setMode: (mode: WorkspaceMode) => void
  syncFromPath: (pathname: string) => void
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  mode: readStoredMode(),

  setMode: (mode) => {
    writeStoredMode(mode)
    set({ mode })
  },

  syncFromPath: (pathname) => {
    const next = modeFromPath(pathname)
    if (!next) return
    set((state) => {
      if (state.mode === next) return state
      writeStoredMode(next)
      return { mode: next }
    })
  },
}))
