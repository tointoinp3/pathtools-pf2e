import { useEffect, useRef, useState, type MouseEvent } from 'react'
import type { AppTab } from '@/features/tabs/tabLogic'
import { homeHrefForMode } from '@/features/tabs/tabTitle'
import {
  TabContextMenu,
  type TabMenuState,
} from '@/features/tabs/TabContextMenu'
import { useAppTabs, useTabLocationSync } from '@/features/tabs/useAppTabs'
import { useTabStore } from '@/stores/tabStore'
import { useWorkspaceStore } from '@/stores/workspaceStore'

export function TabBar() {
  useTabLocationSync()
  const tabs = useTabStore((s) => s.tabs)
  const activeId = useTabStore((s) => s.activeId)
  const closed = useTabStore((s) => s.closed)
  const mode = useWorkspaceStore((s) => s.mode)
  const {
    activate,
    newTab,
    duplicate,
    close,
    closeOthers,
    closeRight,
    closeUnpinned,
    reopenClosed,
    reload,
  } = useAppTabs()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [menu, setMenu] = useState<TabMenuState | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  useEffect(() => {
    const active = scrollerRef.current?.querySelector('[data-active-tab="true"]')
    if (active instanceof HTMLElement) {
      active.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
  }, [activeId])

  useEffect(() => {
    if (!menu) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])

  const menuTab = menu?.tabId
    ? (tabs.find((tab) => tab.id === menu.tabId) ?? null)
    : null
  const menuIndex = menuTab
    ? tabs.findIndex((tab) => tab.id === menuTab.id)
    : -1

  function openMenu(event: MouseEvent, tabId: string | null) {
    event.preventDefault()
    const x = Math.min(event.clientX, window.innerWidth - 230)
    const y = Math.min(event.clientY, window.innerHeight - 320)
    setMenu({ tabId, x, y })
  }

  function runMenu(action: () => void) {
    action()
    setMenu(null)
  }

  return (
    <div className="print-hidden flex shrink-0 items-stretch border-b border-border bg-surface-1">
      <div
        ref={scrollerRef}
        className="flex min-w-0 flex-1 items-stretch gap-px overflow-x-auto px-1 pt-1"
        role="tablist"
        aria-label="Abas abertas"
        onContextMenu={(event) => {
          if (event.target === event.currentTarget) openMenu(event, null)
        }}
        onDoubleClick={(event) => {
          if (event.target === event.currentTarget) {
            newTab(homeHrefForMode(mode))
          }
        }}
      >
        {tabs.map((tab) => (
          <TabChip
            key={tab.id}
            tab={tab}
            active={tab.id === activeId}
            dragging={draggingId === tab.id}
            onActivate={() => activate(tab.id)}
            onClose={() => close(tab.id)}
            onDuplicate={() => duplicate(tab.id)}
            onMenu={(event) => openMenu(event, tab.id)}
            onDragStart={() => setDraggingId(tab.id)}
            onDragEnd={() => setDraggingId(null)}
            onDropOn={() => {
              if (draggingId) useTabStore.getState().move(draggingId, tab.id)
              setDraggingId(null)
            }}
          />
        ))}
      </div>
      <button
        type="button"
        title="Nova aba"
        aria-label="Nova aba"
        onClick={() => newTab(homeHrefForMode(mode))}
        className="mx-1 my-1 flex w-8 shrink-0 items-center justify-center rounded-md text-lg leading-none text-text-muted hover:bg-surface-3 hover:text-text"
      >
        +
      </button>
      {menu && (
        <TabContextMenu
          state={menu}
          tab={menuTab}
          canReopen={closed.length > 0}
          hasOthers={tabs.length > 1}
          hasRight={menuIndex >= 0 && menuIndex < tabs.length - 1}
          onCloseMenu={() => setMenu(null)}
          onNew={() =>
            runMenu(() => newTab(homeHrefForMode(mode), menu.tabId ?? undefined))
          }
          onDuplicate={() =>
            runMenu(() => {
              if (menu.tabId) duplicate(menu.tabId)
            })
          }
          onPin={() =>
            runMenu(() => {
              if (menu.tabId) useTabStore.getState().togglePin(menu.tabId)
            })
          }
          onReload={() =>
            runMenu(() => {
              if (menu.tabId) reload(menu.tabId)
            })
          }
          onClose={() =>
            runMenu(() => {
              if (menu.tabId) close(menu.tabId)
            })
          }
          onCloseOthers={() =>
            runMenu(() => {
              if (menu.tabId) closeOthers(menu.tabId)
            })
          }
          onCloseRight={() =>
            runMenu(() => {
              if (menu.tabId) closeRight(menu.tabId)
            })
          }
          onCloseUnpinned={() => runMenu(() => closeUnpinned())}
          onReopen={() => runMenu(() => reopenClosed())}
          onCopy={() =>
            runMenu(() => {
              if (!menuTab) return
              void navigator.clipboard?.writeText(
                `${window.location.origin}${menuTab.href}`,
              )
            })
          }
        />
      )}
    </div>
  )
}

function TabChip({
  tab,
  active,
  dragging,
  onActivate,
  onClose,
  onDuplicate,
  onMenu,
  onDragStart,
  onDragEnd,
  onDropOn,
}: {
  tab: AppTab
  active: boolean
  dragging: boolean
  onActivate: () => void
  onClose: () => void
  onDuplicate: () => void
  onMenu: (event: MouseEvent) => void
  onDragStart: () => void
  onDragEnd: () => void
  onDropOn: () => void
}) {
  return (
    <div
      data-active-tab={active ? 'true' : undefined}
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', tab.id)
        onDragStart()
      }}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
      }}
      onDrop={(event) => {
        event.preventDefault()
        onDropOn()
      }}
      onDragEnd={onDragEnd}
      onMouseDown={(event) => {
        if (event.button === 1) event.preventDefault()
      }}
      onClick={onActivate}
      onAuxClick={(event) => {
        if (event.button === 1) {
          event.preventDefault()
          onClose()
        }
      }}
      onDoubleClick={onDuplicate}
      onContextMenu={onMenu}
      role="tab"
      aria-selected={active}
      title={tab.title}
      className={`group relative flex w-44 max-w-[14rem] min-w-[7rem] shrink-0 cursor-pointer select-none items-center gap-1.5 rounded-t-lg border border-b-0 px-2 py-1.5 text-left text-xs transition-colors ${
        active
          ? 'border-border bg-surface-0 text-text'
          : 'border-transparent bg-transparent text-text-muted hover:bg-surface-2 hover:text-text'
      } ${dragging ? 'opacity-50' : ''}`}
    >
      {tab.pinned && (
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
          title="Aba fixada"
        />
      )}
      <span className="min-w-0 flex-1 truncate font-medium">{tab.title}</span>
      <button
        type="button"
        title="Fechar aba"
        aria-label={`Fechar ${tab.title}`}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onClose()
        }}
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-sm text-[11px] leading-none text-text-dim hover:bg-surface-3 hover:text-text ${
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        ×
      </button>
    </div>
  )
}
