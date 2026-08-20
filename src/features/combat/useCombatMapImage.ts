import { useEffect, useState } from 'react'
import { useCombatStore } from '@/stores/combatStore'
import { getTokenImage } from './combatImageRepository'

/**
 * URL do cenário do combate. Recarrega quando qualquer imagem muda no app.
 */
export function useCombatMapImage(sessionId: string | null): string | null {
  const imageVersion = useCombatStore((s) => s.imageVersion)
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) {
      setUrl(null)
      return
    }
    let cancelled = false
    let objectUrl: string | null = null

    void getTokenImage('map', sessionId).then((record) => {
      if (cancelled) return
      if (!record) {
        setUrl(null)
        return
      }
      objectUrl = URL.createObjectURL(record.blob)
      setUrl(objectUrl)
    })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [sessionId, imageVersion])

  return url
}
