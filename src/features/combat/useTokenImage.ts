import { useEffect, useState } from 'react'
import { useCombatStore } from '@/stores/combatStore'
import { resolveTokenImage, type TokenImageScope } from './combatImageRepository'

interface TokenImageState {
  url: string | null
  scope: TokenImageScope | null
}

/**
 * URL exibível da imagem de uma ficha: a imagem exclusiva da ficha vence a
 * imagem da criatura. Recarrega quando qualquer imagem muda no app.
 */
export function useTokenImage(
  tokenId: string,
  creatureId: string | null,
): TokenImageState {
  const imageVersion = useCombatStore((s) => s.imageVersion)
  const [state, setState] = useState<TokenImageState>({
    url: null,
    scope: null,
  })

  useEffect(() => {
    let cancelled = false
    let objectUrl: string | null = null

    void resolveTokenImage(tokenId, creatureId).then((record) => {
      if (cancelled) return
      if (!record) {
        setState({ url: null, scope: null })
        return
      }
      objectUrl = URL.createObjectURL(record.blob)
      setState({ url: objectUrl, scope: record.scope })
    })

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [tokenId, creatureId, imageVersion])

  return state
}
