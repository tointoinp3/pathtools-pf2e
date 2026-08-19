import { useEffect, useRef, type RefObject } from 'react'

/**
 * `/` foca o campo de busca, como no Archives of Nethys.
 * Ignora se o foco já está num campo de texto.
 */
export function useSlashSearch(): RefObject<HTMLInputElement | null> {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      const el = e.target as HTMLElement | null
      if (el?.isContentEditable) return
      e.preventDefault()
      ref.current?.focus()
      ref.current?.select()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return ref
}
