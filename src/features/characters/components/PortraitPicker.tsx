import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Button } from '@/components/ui/Button'
import { getPortrait } from '@/features/characters/characterRepository'
import {
  DEFAULT_PORTRAIT_TRANSFORM,
  type PortraitFrameSize,
  type PortraitTransform,
} from '@/types'
import { clamp, debounce } from '@/utils/fn'

interface PortraitPickerProps {
  characterId: string
  portraitId?: string | null
  onSelect: (file: Blob, mimeType: string) => Promise<void>
  onTransformChange?: (transform: PortraitTransform) => Promise<void> | void
  onRemove: () => Promise<void>
}

const FRAME_SIZES: Record<
  PortraitFrameSize,
  { label: string; className: string; hint: string }
> = {
  sm: {
    label: 'Pequeno',
    className: 'h-28 w-[5.5rem]',
    hint: 'Compacto na ficha',
  },
  md: {
    label: 'Normal',
    className: 'h-40 w-32',
    hint: 'Tamanho padrão',
  },
  lg: {
    label: 'Grande',
    className: 'h-56 w-44',
    hint: 'Destaque visual',
  },
}

/** Fundo xadrez sutil — mostra transparência de PNGs */
const CHECKER_BG =
  'linear-gradient(45deg, var(--checker-cell) 25%, transparent 25%), linear-gradient(-45deg, var(--checker-cell) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--checker-cell) 75%), linear-gradient(-45deg, transparent 75%, var(--checker-cell) 75%)'

export function PortraitPicker({
  characterId,
  portraitId,
  onSelect,
  onTransformChange,
  onRemove,
}: PortraitPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [mimeType, setMimeType] = useState<string>('image/png')
  const [busy, setBusy] = useState(false)
  const [editing, setEditing] = useState(false)
  const [transform, setTransform] = useState<PortraitTransform>(
    DEFAULT_PORTRAIT_TRANSFORM,
  )
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)

  const isTransparentCapable =
    mimeType === 'image/png' || mimeType === 'image/webp'

  useEffect(() => {
    let objectUrl: string | null = null
    let cancelled = false

    async function load() {
      if (!portraitId) {
        setUrl(null)
        setTransform(DEFAULT_PORTRAIT_TRANSFORM)
        return
      }
      const portrait = await getPortrait(portraitId)
      if (cancelled) return
      if (!portrait) {
        setUrl(null)
        return
      }
      objectUrl = URL.createObjectURL(portrait.blob)
      setUrl(objectUrl)
      setMimeType(portrait.mimeType || portrait.blob.type || 'image/png')
      setTransform(portrait.transform ?? DEFAULT_PORTRAIT_TRANSFORM)
    }

    void load()

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [portraitId, characterId])

  /** Ref evita fechar sobre um callback obsoleto dentro do debounce */
  const onTransformChangeRef = useRef(onTransformChange)
  onTransformChangeRef.current = onTransformChange

  const persistTransform = useMemo(
    () =>
      debounce((next: PortraitTransform) => {
        void onTransformChangeRef.current?.(next)
      }, 400),
    [],
  )

  /** Grava o enquadramento pendente ao desmontar, em vez de descartá-lo */
  useEffect(() => {
    return () => persistTransform.flush()
  }, [persistTransform])

  function applyTransform(patch: Partial<PortraitTransform>) {
    setTransform((prev) => {
      const next = { ...prev, ...patch }
      persistTransform(next)
      return next
    })
  }

  async function handleFile(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    setBusy(true)
    try {
      // Preserva PNG/WebP com alpha; não converte para JPEG
      await onSelect(file, file.type)
      setEditing(true)
    } finally {
      setBusy(false)
    }
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!url || !editing) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: transform.offsetX,
      originY: transform.offsetY,
    }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const frame = frameRef.current
    if (!frame) return
    const rect = frame.getBoundingClientRect()
    const dx = ((e.clientX - drag.startX) / rect.width) * 100
    const dy = ((e.clientY - drag.startY) / rect.height) * 100
    applyTransform({
      offsetX: clamp(drag.originX + dx, -60, 60),
      offsetY: clamp(drag.originY + dy, -60, 60),
    })
  }

  function onPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId === e.pointerId) {
      dragRef.current = null
    }
  }

  function onWheel(e: React.WheelEvent<HTMLDivElement>) {
    if (!url || !editing) return
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.08 : 0.08
    applyTransform({
      zoom: clamp(Number((transform.zoom + delta).toFixed(2)), 0.4, 3),
    })
  }

  const frame = FRAME_SIZES[transform.frameSize]

  return (
    <div className="flex w-full max-w-[16rem] flex-col items-center gap-2">
      <div
        ref={frameRef}
        role="img"
        aria-label="Retrato do personagem"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onDoubleClick={() => {
          if (url) setEditing((v) => !v)
          else inputRef.current?.click()
        }}
        className={`interactive-lift group relative overflow-hidden rounded-xl border border-border transition-[width,height] duration-300 ${frame.className} ${
          editing && url
            ? 'cursor-grab border-accent/50 active:cursor-grabbing'
            : 'cursor-pointer'
        }`}
        style={{
          backgroundColor: 'var(--portrait-stage)',
          backgroundImage:
            isTransparentCapable && url && editing ? CHECKER_BG : undefined,
          backgroundSize:
            isTransparentCapable && url && editing ? '12px 12px' : undefined,
          backgroundPosition:
            isTransparentCapable && url && editing
              ? '0 0, 0 6px, 6px -6px, -6px 0'
              : undefined,
        }}
        title={
          url
            ? editing
              ? 'Arraste para mover · scroll para zoom · duplo clique sai do ajuste'
              : 'Duplo clique para ajustar enquadramento'
            : 'Clique para adicionar retrato'
        }
        onClick={() => {
          if (!url) inputRef.current?.click()
        }}
      >
        {url ? (
          <img
            src={url}
            alt="Retrato do personagem"
            draggable={false}
            className="pointer-events-none absolute left-1/2 top-1/2 max-h-full max-w-full select-none"
            style={{
              width: 'auto',
              height: 'auto',
              // contain: a imagem inteira cabe no quadro em zoom 1
              // (não corta laterais como object-cover)
              transform: `translate(calc(-50% + ${transform.offsetX}%), calc(-50% + ${transform.offsetY}%)) scale(${transform.zoom})`,
              transformOrigin: 'center center',
            }}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 text-center text-[11px] text-text-dim">
            <span className="font-display text-2xl text-accent/50">◇</span>
            <span>Clique para adicionar retrato</span>
          </div>
        )}

        {editing && url && (
          <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/55 to-transparent px-2 py-1 text-center text-[10px] text-white">
            Arraste · scroll = zoom
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/*"
        className="hidden"
        onChange={(e) => {
          void handleFile(e.target.files?.[0])
          e.target.value = ''
        }}
      />

      <div className="flex flex-wrap justify-center gap-1">
        <Button
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
        >
          {url ? 'Trocar' : 'Adicionar'}
        </Button>
        {url && (
          <Button
            size="sm"
            variant={editing ? 'accent' : 'secondary'}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? 'Pronto' : 'Ajustar'}
          </Button>
        )}
        {url && (
          <Button
            size="sm"
            variant="danger"
            disabled={busy}
            onClick={() => {
              void onRemove()
              setEditing(false)
            }}
          >
            Remover
          </Button>
        )}
      </div>

      {url && editing && (
        <div className="w-full animate-fade-up space-y-3 rounded-xl border border-border bg-surface-2 p-3">
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              Tamanho do quadro
            </div>
            <div className="grid grid-cols-3 gap-1">
              {(Object.keys(FRAME_SIZES) as PortraitFrameSize[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  title={FRAME_SIZES[size].hint}
                  onClick={() => applyTransform({ frameSize: size })}
                  className={`rounded-md border px-2 py-1.5 text-[11px] font-medium transition-colors ${
                    transform.frameSize === size
                      ? 'border-accent bg-accent/20 text-accent'
                      : 'border-border bg-surface-3 text-text-muted hover:text-text'
                  }`}
                >
                  {FRAME_SIZES[size].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              <span>Zoom</span>
              <span className="tabular-nums text-text-muted">
                {Math.round(transform.zoom * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={300}
              step={5}
              value={Math.round(transform.zoom * 100)}
              onChange={(e) =>
                applyTransform({ zoom: Number(e.target.value) / 100 })
              }
              className="w-full accent-[var(--color-accent)]"
            />
            <div className="mt-1 flex justify-between gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  applyTransform({
                    zoom: clamp(transform.zoom - 0.15, 0.4, 3),
                  })
                }
              >
                −
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  applyTransform({ zoom: 1, offsetX: 0, offsetY: 0 })
                }
              >
                Resetar posição
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  applyTransform({
                    zoom: clamp(transform.zoom + 0.15, 0.4, 3),
                  })
                }
              >
                +
              </Button>
            </div>
          </div>

            <p className="text-[10px] leading-relaxed text-text-dim">
              Zoom 100% mostra a imagem inteira (sem cortar). Aumente o zoom e
              arraste para enquadrar o que quiser.
            </p>
            {isTransparentCapable && (
              <p className="text-[10px] leading-relaxed text-text-dim">
                PNG/WebP transparente: o xadrez só aparece no editor.
              </p>
            )}
        </div>
      )}
    </div>
  )
}
