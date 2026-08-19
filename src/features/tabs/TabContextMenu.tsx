import type { AppTab } from '@/features/tabs/tabLogic'

export interface TabMenuState {
  tabId: string | null
  x: number
  y: number
}

interface TabContextMenuProps {
  state: TabMenuState
  tab: AppTab | null
  canReopen: boolean
  hasOthers: boolean
  hasRight: boolean
  onCloseMenu: () => void
  onNew: () => void
  onDuplicate: () => void
  onPin: () => void
  onReload: () => void
  onClose: () => void
  onCloseOthers: () => void
  onCloseRight: () => void
  onCloseUnpinned: () => void
  onReopen: () => void
  onCopy: () => void
}

export function TabContextMenu({
  state,
  tab,
  canReopen,
  hasOthers,
  hasRight,
  onCloseMenu,
  onNew,
  onDuplicate,
  onPin,
  onReload,
  onClose,
  onCloseOthers,
  onCloseRight,
  onCloseUnpinned,
  onReopen,
  onCopy,
}: TabContextMenuProps) {
  if (!tab && state.tabId !== null) return null
  const barMenu = state.tabId === null

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={onCloseMenu}
      onContextMenu={(event) => {
        event.preventDefault()
        onCloseMenu()
      }}
    >
      <ul
        role="menu"
        style={{ left: state.x, top: state.y }}
        className="absolute min-w-[13.5rem] overflow-hidden rounded-lg border border-border bg-surface-2 py-1 text-sm shadow-[var(--shadow-panel)]"
        onClick={(event) => event.stopPropagation()}
      >
        <MenuItem
          label="Nova aba"
          hint="à direita"
          onClick={onNew}
        />
        {!barMenu && (
          <MenuItem label="Duplicar" onClick={onDuplicate} />
        )}
        {!barMenu && (
          <MenuItem
            label={tab?.pinned ? 'Desafixar' : 'Fixar'}
            onClick={onPin}
          />
        )}
        {!barMenu && <MenuItem label="Recarregar" onClick={onReload} />}
        {!barMenu && (
          <MenuItem label="Copiar endereço" onClick={onCopy} />
        )}
        <Separator />
        {!barMenu && <MenuItem label="Fechar" onClick={onClose} />}
        {!barMenu && (
          <MenuItem
            label="Fechar as outras"
            disabled={!hasOthers}
            onClick={onCloseOthers}
          />
        )}
        {!barMenu && (
          <MenuItem
            label="Fechar à direita"
            disabled={!hasRight}
            onClick={onCloseRight}
          />
        )}
        <MenuItem label="Fechar não fixadas" onClick={onCloseUnpinned} />
        <Separator />
        <MenuItem
          label="Reabrir aba fechada"
          disabled={!canReopen}
          onClick={onReopen}
        />
      </ul>
    </div>
  )
}

function Separator() {
  return <li className="my-1 border-t border-border" />
}

function MenuItem({
  label,
  hint,
  disabled,
  onClick,
}: {
  label: string
  hint?: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <li>
      <button
        type="button"
        role="menuitem"
        disabled={disabled}
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-3 py-1.5 text-left text-text enabled:hover:bg-surface-3 disabled:text-text-dim"
      >
        <span>{label}</span>
        {hint && <span className="text-[10px] text-text-dim">{hint}</span>}
      </button>
    </li>
  )
}
