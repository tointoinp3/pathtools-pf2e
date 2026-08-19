import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { locationHref, type TabOpenIntent } from '@/features/tabs/tabLogic'
import { APP_NAME } from '@/brand'
import { useTabStore } from '@/stores/tabStore'

export function useTabLocationSync() {
  const location = useLocation()
  const href = locationHref(location)
  const syncFromLocation = useTabStore((s) => s.syncFromLocation)
  const tabs = useTabStore((s) => s.tabs)
  const activeId = useTabStore((s) => s.activeId)

  useEffect(() => {
    syncFromLocation(href)
  }, [href, syncFromLocation])

  useEffect(() => {
    const tab = tabs.find((entry) => entry.id === activeId) ?? tabs[0]
    if (!tab) return
    document.title = `${tab.title} · ${APP_NAME}`
  }, [tabs, activeId])
}

export function useAppTabs() {
  const navigate = useNavigate()
  const location = useLocation()

  const go = useCallback(
    (nextHref: string) => {
      if (locationHref(location) === nextHref) return
      navigate(nextHref)
    },
    [location, navigate],
  )

  const activate = useCallback(
    (tabId: string) => {
      const tab = useTabStore.getState().tabs.find((entry) => entry.id === tabId)
      if (!tab) return
      useTabStore.getState().setActive(tabId)
      go(tab.href)
    },
    [go],
  )

  const openInTab = useCallback(
    (nextHref: string, intent: TabOpenIntent = 'foreground') => {
      if (intent === 'current') {
        go(nextHref)
        return
      }
      useTabStore.getState().openNew(nextHref, { activate: intent === 'foreground' })
      if (intent === 'foreground') go(nextHref)
    },
    [go],
  )

  const newTab = useCallback(
    (nextHref?: string, afterId?: string) => {
      const target = nextHref ?? locationHref(location)
      const tab = useTabStore.getState().openNew(target, {
        activate: true,
        afterId,
      })
      if (tab) go(tab.href)
    },
    [go, location],
  )

  const closeOthers = useCallback(
    (tabId: string) => {
      useTabStore.getState().closeOthers(tabId)
      const tab = useTabStore.getState().tabs.find((entry) => entry.id === tabId)
      if (tab) go(tab.href)
    },
    [go],
  )

  const closeRight = useCallback(
    (tabId: string) => {
      useTabStore.getState().closeRight(tabId)
      const state = useTabStore.getState()
      const tab = state.tabs.find((entry) => entry.id === state.activeId)
      if (tab) go(tab.href)
    },
    [go],
  )

  const closeUnpinned = useCallback(() => {
    useTabStore.getState().closeUnpinned()
    const state = useTabStore.getState()
    const tab = state.tabs.find((entry) => entry.id === state.activeId)
    if (tab) go(tab.href)
  }, [go])

  const duplicate = useCallback(
    (tabId: string) => {
      const tab = useTabStore.getState().duplicate(tabId)
      if (tab) go(tab.href)
    },
    [go],
  )

  const close = useCallback(
    (tabId: string) => {
      const next = useTabStore.getState().close(tabId)
      if (next) go(next.href)
    },
    [go],
  )

  const reopenClosed = useCallback(() => {
    const tab = useTabStore.getState().reopenClosed()
    if (tab) go(tab.href)
  }, [go])

  const reload = useCallback((tabId: string) => {
    useTabStore.getState().reload(tabId)
  }, [])

  return {
    activate,
    openInTab,
    newTab,
    duplicate,
    close,
    closeOthers,
    closeRight,
    closeUnpinned,
    reopenClosed,
    reload,
  }
}
