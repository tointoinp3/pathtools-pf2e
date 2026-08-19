import { create } from 'zustand'
import {
  bumpReload,
  closeOtherTabs,
  closeTab,
  closeTabsToTheRight,
  closeUnpinnedTabs,
  duplicateTab,
  emptyTabSession,
  moveTab,
  openNewTab,
  parseTabSession,
  reopenClosedTab,
  setActiveTab,
  setTabTitle,
  syncFromLocation,
  togglePinTab,
  type AppTab,
  type TabSession,
} from '@/features/tabs/tabLogic'
import {
  homeHrefForMode,
  homeTitleForMode,
  titleFromHref,
} from '@/features/tabs/tabTitle'
import { useWorkspaceStore } from '@/stores/workspaceStore'

const STORAGE_KEY = 'sp-app-tabs'

function homeHref(): string {
  return homeHrefForMode(useWorkspaceStore.getState().mode)
}

function homeTitle(): string {
  return homeTitleForMode(useWorkspaceStore.getState().mode)
}

function fallbackSession(): TabSession {
  return emptyTabSession(homeHref(), homeTitle())
}

function readStoredSession(): TabSession {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallbackSession()
    return parseTabSession(JSON.parse(raw), fallbackSession())
  } catch {
    return fallbackSession()
  }
}

function writeStoredSession(session: TabSession) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tabs: session.tabs.map((tab) => ({
          id: tab.id,
          href: tab.href,
          title: tab.title,
          pinned: tab.pinned,
        })),
        activeId: session.activeId,
        closed: session.closed.map((tab) => ({
          href: tab.href,
          title: tab.title,
          pinned: tab.pinned,
        })),
      }),
    )
  } catch {
    /* ignore quota / private mode */
  }
}

interface TabStoreState extends TabSession {
  syncFromLocation: (href: string) => void
  setActive: (tabId: string) => void
  setActiveTitle: (title: string) => void
  openNew: (
    href: string,
    options?: { activate?: boolean; afterId?: string },
  ) => AppTab | undefined
  duplicate: (tabId: string) => AppTab | undefined
  close: (tabId: string) => AppTab | undefined
  closeOthers: (tabId: string) => void
  closeRight: (tabId: string) => void
  closeUnpinned: () => void
  reopenClosed: () => AppTab | undefined
  togglePin: (tabId: string) => void
  move: (fromId: string, toId: string) => void
  reload: (tabId: string) => void
}

function apply(set: (partial: Partial<TabStoreState>) => void, next: TabSession) {
  writeStoredSession(next)
  set(next)
}

export const useTabStore = create<TabStoreState>((set, get) => ({
  ...readStoredSession(),

  syncFromLocation: (href) => {
    const current = get()
    const next = syncFromLocation(current, href, titleFromHref(href))
    if (next === current) return
    apply(set, next)
  },

  setActive: (tabId) => {
    apply(set, setActiveTab(get(), tabId))
  },

  setActiveTitle: (title) => {
    const current = get()
    const next = setTabTitle(current, current.activeId, title)
    if (next === current) return
    apply(set, next)
  },

  openNew: (href, options) => {
    const before = new Set(get().tabs.map((tab) => tab.id))
    const next = openNewTab(get(), href, titleFromHref(href), {
      activate: options?.activate !== false,
      afterId: options?.afterId,
    })
    apply(set, next)
    return next.tabs.find((tab) => !before.has(tab.id))
  },

  duplicate: (tabId) => {
    const next = duplicateTab(get(), tabId)
    apply(set, next)
    return next.tabs.find((tab) => tab.id === next.activeId)
  },

  close: (tabId) => {
    const next = closeTab(get(), tabId, homeHref(), homeTitle())
    apply(set, next)
    return next.tabs.find((tab) => tab.id === next.activeId)
  },

  closeOthers: (tabId) => {
    apply(set, closeOtherTabs(get(), tabId))
  },

  closeRight: (tabId) => {
    apply(set, closeTabsToTheRight(get(), tabId))
  },

  closeUnpinned: () => {
    apply(set, closeUnpinnedTabs(get(), homeHref(), homeTitle()))
  },

  reopenClosed: () => {
    const next = reopenClosedTab(get())
    apply(set, next)
    return next.tabs.find((tab) => tab.id === next.activeId)
  },

  togglePin: (tabId) => {
    apply(set, togglePinTab(get(), tabId))
  },

  move: (fromId, toId) => {
    apply(set, moveTab(get(), fromId, toId))
  },

  reload: (tabId) => {
    apply(set, bumpReload(get(), tabId))
  },
}))
