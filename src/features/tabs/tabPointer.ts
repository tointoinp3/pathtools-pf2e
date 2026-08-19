import type { MouseEvent as ReactMouseEvent } from 'react'
import { tabOpenIntent, type TabOpenIntent } from '@/features/tabs/tabLogic'

export type TabPointerEvent = {
  button: number
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  preventDefault: () => void
  stopPropagation?: () => void
}

export function intentFromPointer(event: TabPointerEvent): TabOpenIntent {
  return tabOpenIntent(event)
}

export function isModifiedTabPointer(event: TabPointerEvent): boolean {
  return intentFromPointer(event) !== 'current'
}

export function catalogRowPointerProps(
  onSelect: (event: ReactMouseEvent<HTMLButtonElement>) => void,
): {
  onClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
  onAuxClick: (event: ReactMouseEvent<HTMLButtonElement>) => void
  onMouseDown: (event: ReactMouseEvent<HTMLButtonElement>) => void
} {
  return {
    onClick: onSelect,
    onAuxClick: onSelect,
    onMouseDown: (event) => {
      if (event.button === 1) event.preventDefault()
    },
  }
}
