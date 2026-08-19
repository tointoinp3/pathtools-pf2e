import { useCallback } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { hrefWithQueryId } from '@/features/tabs/tabLogic'
import { intentFromPointer, type TabPointerEvent } from '@/features/tabs/tabPointer'
import { useAppTabs } from '@/features/tabs/useAppTabs'

export function useCatalogPreview() {
  const [params, setParams] = useSearchParams()
  const { pathname } = useLocation()
  const { openInTab } = useAppTabs()
  const previewId = params.get('id')

  const onActiveChange = useCallback(
    (id: string | null, event?: TabPointerEvent) => {
      if (id && event && intentFromPointer(event) !== 'current') {
        openInTab(hrefWithQueryId(pathname, id), intentFromPointer(event))
        event.preventDefault()
        event.stopPropagation?.()
        return
      }
      if (id) setParams({ id }, { replace: true })
      else setParams({}, { replace: true })
    },
    [openInTab, pathname, setParams],
  )

  return { previewId, onActiveChange }
}
