import { useEffect, useState } from 'react'
import { getAsset } from './worldRepository'

/** URL temporária de um asset do mundo; recria quando a versão muda. */
export function useWorldAssetUrl(
  id: string | null,
  version: number,
): string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setUrl(null)
      return
    }
    let cancelled = false
    let objectUrl: string | null = null
    void getAsset(id).then((record) => {
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
  }, [id, version])

  return url
}

export function useWorldAssetUrls(
  ids: readonly string[],
  version: number,
): Record<string, string> {
  const [urls, setUrls] = useState<Record<string, string>>({})
  const key = ids.join('|')

  useEffect(() => {
    let cancelled = false
    const created: string[] = []
    void (async () => {
      const next: Record<string, string> = {}
      for (const id of ids) {
        const record = await getAsset(id)
        if (cancelled || !record) continue
        const url = URL.createObjectURL(record.blob)
        created.push(url)
        next[id] = url
      }
      if (!cancelled) setUrls(next)
    })()
    return () => {
      cancelled = true
      for (const url of created) URL.revokeObjectURL(url)
    }
  }, [key, version])

  return urls
}
