import { useEffect } from 'react'
import { APP_NAME } from '@/brand'
import { useTabStore } from '@/stores/tabStore'

const BASE_TITLE = APP_NAME

/**
 * Define o título da aba. Passe `null` para manter só o nome do app.
 * Restaura o título base ao desmontar.
 */
export function useDocumentTitle(title: string | null | undefined): void {
  useEffect(() => {
    const trimmed = title?.trim()
    document.title = trimmed ? `${trimmed} · ${BASE_TITLE}` : BASE_TITLE
    if (trimmed) useTabStore.getState().setActiveTitle(trimmed)
    return () => {
      document.title = BASE_TITLE
    }
  }, [title])
}
