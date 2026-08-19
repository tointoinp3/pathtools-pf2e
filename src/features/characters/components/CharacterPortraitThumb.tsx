import { useEffect, useState } from 'react'
import { getPortrait } from '@/features/characters/characterRepository'
import {
  DEFAULT_PORTRAIT_TRANSFORM,
  type PortraitTransform,
} from '@/types'

/**
 * Miniatura só aparece se o personagem tiver retrato.
 * Sem foto: não renderiza nada (o card fica como estava).
 */
export function CharacterPortraitThumb({
  portraitId,
  name,
  className = 'h-24 w-[4.5rem]',
}: {
  portraitId?: string | null
  name?: string
  className?: string
}) {
  const [url, setUrl] = useState<string | null>(null)
  const [missing, setMissing] = useState(false)
  const [transform, setTransform] = useState<PortraitTransform>(
    DEFAULT_PORTRAIT_TRANSFORM,
  )

  useEffect(() => {
    let objectUrl: string | null = null
    let cancelled = false

    async function load() {
      if (!portraitId) {
        setUrl(null)
        setMissing(false)
        return
      }
      setMissing(false)
      const portrait = await getPortrait(portraitId)
      if (cancelled) return
      if (!portrait) {
        setUrl(null)
        setMissing(true)
        return
      }
      objectUrl = URL.createObjectURL(portrait.blob)
      setUrl(objectUrl)
      setTransform(portrait.transform ?? DEFAULT_PORTRAIT_TRANSFORM)
    }

    void load()

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [portraitId])

  if (!portraitId || missing) return null

  return (
    <div
      role="img"
      aria-label={name ? `Retrato de ${name}` : 'Retrato do personagem'}
      className={`relative shrink-0 overflow-hidden rounded-lg border border-accent/30 bg-[var(--portrait-stage)] ${className}`}
    >
      {url ? (
        <img
          src={url}
          alt=""
          draggable={false}
          className="pointer-events-none absolute left-1/2 top-1/2 max-h-full max-w-full select-none"
          style={{
            width: 'auto',
            height: 'auto',
            transform: `translate(calc(-50% + ${transform.offsetX}%), calc(-50% + ${transform.offsetY}%)) scale(${transform.zoom})`,
            transformOrigin: 'center center',
          }}
        />
      ) : null}
    </div>
  )
}
