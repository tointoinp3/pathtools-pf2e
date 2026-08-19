/** Estado puro das abas internas — testável sem React. */

export interface AppTab {
  id: string
  href: string
  title: string
  pinned: boolean
  reloadToken: number
}

export interface TabSession {
  tabs: AppTab[]
  activeId: string
  closed: AppTab[]
}

export type TabOpenIntent = 'current' | 'background' | 'foreground'

export const CLOSED_STACK_MAX = 20
export const DEFAULT_HOME_HREF = '/personagens'

const EMPTY_SESSION: TabSession = {
  tabs: [],
  activeId: '',
  closed: [],
}

export function normalizeHref(href: string): string {
  try {
    const url = new URL(href, 'http://app.local')
    let path = url.pathname || '/'
    if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
    return `${path}${url.search}${url.hash}`
  } catch {
    const trimmed = href.trim()
    return trimmed.length > 0 ? trimmed : DEFAULT_HOME_HREF
  }
}

export function locationHref(loc: {
  pathname: string
  search: string
  hash: string
}): string {
  return normalizeHref(`${loc.pathname}${loc.search}${loc.hash}`)
}

export function hrefWithQueryId(pathname: string, id: string | null): string {
  const path = pathname.split('?')[0]?.split('#')[0] || '/'
  if (!id) return normalizeHref(path)
  return normalizeHref(`${path}?id=${encodeURIComponent(id)}`)
}

export function tabOpenIntent(event: {
  button: number
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
}): TabOpenIntent {
  const modified = event.ctrlKey || event.metaKey
  if (event.button === 1) return 'background'
  if (modified && event.shiftKey) return 'foreground'
  if (modified) return 'background'
  return 'current'
}

export function createTab(
  href: string,
  title: string,
  extras: Partial<AppTab> = {},
): AppTab {
  return {
    id: extras.id ?? crypto.randomUUID(),
    href: normalizeHref(href),
    title: title.trim() || 'Aba',
    pinned: extras.pinned ?? false,
    reloadToken: extras.reloadToken ?? 0,
  }
}

export function emptyTabSession(homeHref = DEFAULT_HOME_HREF, title = 'Personagens'): TabSession {
  const tab = createTab(homeHref, title)
  return { tabs: [tab], activeId: tab.id, closed: [] }
}

export function activeTab(session: TabSession): AppTab | undefined {
  return session.tabs.find((tab) => tab.id === session.activeId) ?? session.tabs[0]
}

function rememberClosed(closed: AppTab[], tab: AppTab): AppTab[] {
  return [tab, ...closed.filter((entry) => entry.id !== tab.id)].slice(
    0,
    CLOSED_STACK_MAX,
  )
}

function neighborAfterClose(session: TabSession, index: number): string {
  const right = session.tabs[index + 1]
  if (right) return right.id
  const left = session.tabs[index - 1]
  if (left) return left.id
  return session.activeId
}

export function syncFromLocation(
  session: TabSession,
  href: string,
  title: string,
): TabSession {
  const nextHref = normalizeHref(href)
  const nextTitle = title.trim() || 'Aba'
  if (session.tabs.length === 0) {
    const tab = createTab(nextHref, nextTitle)
    return { tabs: [tab], activeId: tab.id, closed: session.closed }
  }
  const current = activeTab(session)
  if (!current) {
    const tab = createTab(nextHref, nextTitle)
    return { tabs: [tab], activeId: tab.id, closed: session.closed }
  }
  if (current.href === nextHref) return session
  const existing = session.tabs.find((tab) => tab.href === nextHref)
  if (existing) {
    if (session.activeId === existing.id) return session
    return { ...session, activeId: existing.id }
  }
  if (current.pinned) {
    return insertTab(session, createTab(nextHref, nextTitle), {
      afterId: current.id,
      activate: true,
    })
  }
  return {
    ...session,
    tabs: session.tabs.map((tab) =>
      tab.id === current.id ? { ...tab, href: nextHref, title: nextTitle } : tab,
    ),
  }
}

export function setActiveTab(session: TabSession, tabId: string): TabSession {
  if (!session.tabs.some((tab) => tab.id === tabId)) return session
  if (session.activeId === tabId) return session
  return { ...session, activeId: tabId }
}

export function setTabTitle(
  session: TabSession,
  tabId: string,
  title: string,
): TabSession {
  const trimmed = title.trim()
  if (!trimmed) return session
  const tab = session.tabs.find((entry) => entry.id === tabId)
  if (!tab || tab.title === trimmed) return session
  return {
    ...session,
    tabs: session.tabs.map((entry) =>
      entry.id === tabId ? { ...entry, title: trimmed } : entry,
    ),
  }
}

export function insertTab(
  session: TabSession,
  tab: AppTab,
  options: { afterId?: string; activate?: boolean } = {},
): TabSession {
  const afterId = options.afterId ?? session.activeId
  const index = session.tabs.findIndex((entry) => entry.id === afterId)
  const nextTabs = [...session.tabs]
  const insertAt = index >= 0 ? index + 1 : nextTabs.length
  nextTabs.splice(insertAt, 0, tab)
  return {
    ...session,
    tabs: nextTabs,
    activeId: options.activate === false ? session.activeId : tab.id,
  }
}

export function openNewTab(
  session: TabSession,
  href: string,
  title: string,
  options: { activate?: boolean; afterId?: string } = {},
): TabSession {
  if (session.tabs.length === 0) {
    const tab = createTab(href, title)
    return { tabs: [tab], activeId: tab.id, closed: session.closed }
  }
  return insertTab(session, createTab(href, title), {
    afterId: options.afterId,
    activate: options.activate !== false,
  })
}

export function duplicateTab(session: TabSession, tabId: string): TabSession {
  const tab = session.tabs.find((entry) => entry.id === tabId)
  if (!tab) return session
  return insertTab(
    session,
    createTab(tab.href, tab.title, { pinned: false }),
    { afterId: tab.id, activate: true },
  )
}

export function closeTab(
  session: TabSession,
  tabId: string,
  fallbackHref: string,
  fallbackTitle: string,
): TabSession {
  const index = session.tabs.findIndex((tab) => tab.id === tabId)
  if (index < 0) return session
  const closing = session.tabs[index]
  if (!closing) return session
  const remaining = session.tabs.filter((tab) => tab.id !== tabId)
  const closed = rememberClosed(session.closed, closing)
  if (remaining.length === 0) {
    const tab = createTab(fallbackHref, fallbackTitle)
    return { tabs: [tab], activeId: tab.id, closed }
  }
  const nextActive =
    session.activeId === tabId ? neighborAfterClose(session, index) : session.activeId
  const safeActive = remaining.some((tab) => tab.id === nextActive)
    ? nextActive
    : remaining[0]!.id
  return { tabs: remaining, activeId: safeActive, closed }
}

export function closeOtherTabs(session: TabSession, tabId: string): TabSession {
  const keep = session.tabs.find((tab) => tab.id === tabId)
  if (!keep) return session
  const dismissed = session.tabs.filter((tab) => tab.id !== tabId)
  let closed = session.closed
  for (const tab of [...dismissed].reverse()) {
    closed = rememberClosed(closed, tab)
  }
  return { tabs: [keep], activeId: keep.id, closed }
}

export function closeTabsToTheRight(session: TabSession, tabId: string): TabSession {
  const index = session.tabs.findIndex((tab) => tab.id === tabId)
  if (index < 0) return session
  const keep = session.tabs.slice(0, index + 1)
  const dismissed = session.tabs.slice(index + 1)
  if (dismissed.length === 0) return session
  let closed = session.closed
  for (const tab of [...dismissed].reverse()) {
    closed = rememberClosed(closed, tab)
  }
  const activeStillThere = keep.some((tab) => tab.id === session.activeId)
  return {
    tabs: keep,
    activeId: activeStillThere ? session.activeId : tabId,
    closed,
  }
}

export function closeUnpinnedTabs(
  session: TabSession,
  fallbackHref: string,
  fallbackTitle: string,
): TabSession {
  const pinned = session.tabs.filter((tab) => tab.pinned)
  const dismissed = session.tabs.filter((tab) => !tab.pinned)
  if (dismissed.length === 0) return session
  let closed = session.closed
  for (const tab of [...dismissed].reverse()) {
    closed = rememberClosed(closed, tab)
  }
  if (pinned.length === 0) {
    const tab = createTab(fallbackHref, fallbackTitle)
    return { tabs: [tab], activeId: tab.id, closed }
  }
  const activeStillThere = pinned.some((tab) => tab.id === session.activeId)
  return {
    tabs: pinned,
    activeId: activeStillThere ? session.activeId : pinned[0]!.id,
    closed,
  }
}

export function reopenClosedTab(session: TabSession): TabSession {
  const [restored, ...rest] = session.closed
  if (!restored) return session
  const tab = createTab(restored.href, restored.title, { pinned: restored.pinned })
  const after = activeTab(session)
  return {
    ...insertTab(session, tab, { afterId: after?.id, activate: true }),
    closed: rest,
  }
}

export function togglePinTab(session: TabSession, tabId: string): TabSession {
  const tab = session.tabs.find((entry) => entry.id === tabId)
  if (!tab) return session
  const pinned = !tab.pinned
  const without = session.tabs.filter((entry) => entry.id !== tabId)
  const updated = { ...tab, pinned }
  let lastPinned = -1
  for (let i = 0; i < without.length; i += 1) {
    if (without[i]?.pinned) lastPinned = i
  }
  const next = [...without]
  next.splice(lastPinned + 1, 0, updated)
  return { ...session, tabs: next }
}

export function moveTab(session: TabSession, fromId: string, toId: string): TabSession {
  if (fromId === toId) return session
  const fromIndex = session.tabs.findIndex((tab) => tab.id === fromId)
  const toIndex = session.tabs.findIndex((tab) => tab.id === toId)
  if (fromIndex < 0 || toIndex < 0) return session
  const from = session.tabs[fromIndex]
  const to = session.tabs[toIndex]
  if (!from || !to) return session
  if (from.pinned !== to.pinned) return session
  const next = [...session.tabs]
  next.splice(fromIndex, 1)
  const insertAt = fromIndex < toIndex ? toIndex - 1 : toIndex
  next.splice(insertAt, 0, from)
  return { ...session, tabs: next }
}

export function bumpReload(session: TabSession, tabId: string): TabSession {
  return {
    ...session,
    tabs: session.tabs.map((tab) =>
      tab.id === tabId ? { ...tab, reloadToken: tab.reloadToken + 1 } : tab,
    ),
  }
}

export function parseTabSession(raw: unknown, fallback: TabSession): TabSession {
  if (!raw || typeof raw !== 'object') return fallback
  const data = raw as {
    tabs?: unknown
    activeId?: unknown
    closed?: unknown
  }
  if (!Array.isArray(data.tabs) || data.tabs.length === 0) return fallback
  const tabs: AppTab[] = []
  for (const entry of data.tabs) {
    if (!entry || typeof entry !== 'object') continue
    const item = entry as Record<string, unknown>
    if (typeof item.id !== 'string' || typeof item.href !== 'string') continue
    tabs.push(
      createTab(item.href, typeof item.title === 'string' ? item.title : 'Aba', {
        id: item.id,
        pinned: item.pinned === true,
        reloadToken: 0,
      }),
    )
  }
  if (tabs.length === 0) return fallback
  const closed: AppTab[] = []
  if (Array.isArray(data.closed)) {
    for (const entry of data.closed) {
      if (!entry || typeof entry !== 'object') continue
      const item = entry as Record<string, unknown>
      if (typeof item.href !== 'string') continue
      closed.push(
        createTab(item.href, typeof item.title === 'string' ? item.title : 'Aba', {
          pinned: item.pinned === true,
        }),
      )
    }
  }
  const activeId =
    typeof data.activeId === 'string' && tabs.some((tab) => tab.id === data.activeId)
      ? data.activeId
      : tabs[0]!.id
  return { tabs, activeId, closed: closed.slice(0, CLOSED_STACK_MAX) }
}

export { EMPTY_SESSION }
