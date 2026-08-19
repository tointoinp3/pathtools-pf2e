import { useEffect, useRef } from 'react'
import { useAppTabs } from '@/features/tabs/useAppTabs'
import { tabOpenIntent } from '@/features/tabs/tabLogic'

function internalHref(anchor: HTMLAnchorElement): string | null {
  if (anchor.hasAttribute('download')) return null
  if (anchor.target && anchor.target !== '_self') return null
  const hrefAttr = anchor.getAttribute('href')
  if (!hrefAttr || hrefAttr.startsWith('mailto:') || hrefAttr.startsWith('javascript:')) {
    return null
  }
  try {
    const url = new URL(anchor.href, window.location.origin)
    if (url.origin !== window.location.origin) return null
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return null
  }
}

function anchorFromEvent(event: Event): HTMLAnchorElement | null {
  const target = event.target
  if (!(target instanceof Element)) return null
  return target.closest('a')
}

export function AppTabLinkInterceptor() {
  const { openInTab } = useAppTabs()
  const openRef = useRef(openInTab)
  openRef.current = openInTab

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = anchorFromEvent(event)
      if (!anchor) return
      const href = internalHref(anchor)
      if (!href) return
      const intent = tabOpenIntent(event)
      if (intent === 'current') return
      event.preventDefault()
      event.stopPropagation()
      openRef.current(href, intent)
    }

    function onMouseDown(event: MouseEvent) {
      if (event.button !== 1) return
      const anchor = anchorFromEvent(event)
      if (!anchor || !internalHref(anchor)) return
      event.preventDefault()
    }

    document.addEventListener('click', onClick, true)
    document.addEventListener('auxclick', onClick, true)
    document.addEventListener('mousedown', onMouseDown, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      document.removeEventListener('auxclick', onClick, true)
      document.removeEventListener('mousedown', onMouseDown, true)
    }
  }, [])

  return null
}
