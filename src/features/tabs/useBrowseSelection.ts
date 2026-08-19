import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'
import { catalogRowPointerProps } from '@/features/tabs/tabPointer'

export function useBrowseSelection(
  previewId: string | null | undefined,
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void,
  options?: { toggle?: boolean },
) {
  const toggle = options?.toggle !== false
  const [localId, setLocalId] = useState<string | null>(previewId ?? null)

  useEffect(() => {
    if (previewId !== undefined) setLocalId(previewId)
  }, [previewId])

  const activeId = previewId !== undefined ? previewId : localId

  function select(clickedId: string, event: ReactMouseEvent<HTMLButtonElement>) {
    const modified = event.button === 1 || event.ctrlKey || event.metaKey
    if (modified) {
      onActiveChange?.(clickedId, event)
      return
    }
    const next = toggle && activeId === clickedId ? null : clickedId
    onActiveChange?.(next, event)
    if (event.defaultPrevented) return
    if (previewId === undefined) setLocalId(next)
  }

  function rowProps(clickedId: string) {
    return catalogRowPointerProps((event) => select(clickedId, event))
  }

  return { activeId, select, rowProps, setLocalId }
}
