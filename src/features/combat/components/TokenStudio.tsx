import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import type { Creature } from '@/types'
import { Button } from '@/components/ui/Button'
import {
  DEFAULT_TOKEN_TRANSFORM,
  TOKEN_CANVAS_SIZE,
  TOKEN_COLOR_SWATCHES,
  TOKEN_FRAMES,
  TOKEN_HOLE_MAX,
  TOKEN_HOLE_MIN,
  TOKEN_ZOOM_MAX,
  TOKEN_ZOOM_MIN,
  clampTokenTransform,
  type TokenFrameId,
  type TokenStudioTransform,
} from '@/engine/tokenStudio'
import { canvasToPngBlob, paintToken } from '@/features/combat/tokenCompose'
import {
  getTokenImage,
  saveTokenImage,
} from '@/features/combat/combatImageRepository'
import { useCombatStore } from '@/stores/combatStore'
import { downloadBlob, fileSlug } from '@/utils/jsonFile'
import { AttachCreatureDialog } from './AttachCreatureDialog'

const CHECKER =
  'linear-gradient(45deg, var(--checker-cell) 25%, transparent 25%), linear-gradient(-45deg, var(--checker-cell) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--checker-cell) 75%), linear-gradient(-45deg, transparent 75%, var(--checker-cell) 75%)'

export function TokenStudio() {
  const previewRef = useRef<HTMLCanvasElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)
  const imageUrlRef = useRef<string | null>(null)
  const bumpImageVersion = useCombatStore((s) => s.bumpImageVersion)

  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [fileLabel, setFileLabel] = useState<string | null>(null)
  const [transform, setTransform] = useState<TokenStudioTransform>(
    DEFAULT_TOKEN_TRANSFORM,
  )
  const [frameId, setFrameId] = useState<TokenFrameId>('gear')
  const [color, setColor] = useState<string>(TOKEN_COLOR_SWATCHES[0]!.hex)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [attachOpen, setAttachOpen] = useState(false)

  function applyTransform(patch: Partial<TokenStudioTransform>) {
    setTransform((prev) => clampTokenTransform(patch, prev))
  }

  useEffect(() => {
    const canvas = previewRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    paintToken(ctx, TOKEN_CANVAS_SIZE, {
      ...transform,
      image,
      imageWidth: image?.naturalWidth ?? 0,
      imageHeight: image?.naturalHeight ?? 0,
      frameId,
      color,
    })
  }, [image, transform, frameId, color])

  useEffect(() => {
    const canvas = previewRef.current
    if (!canvas) return
    function onWheel(event: WheelEvent) {
      if (!image) return
      event.preventDefault()
      const delta = event.deltaY > 0 ? -0.08 : 0.08
      setTransform((prev) =>
        clampTokenTransform({ zoom: prev.zoom + delta }, prev),
      )
    }
    canvas.addEventListener('wheel', onWheel, { passive: false })
    return () => canvas.removeEventListener('wheel', onWheel)
  }, [image])

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current)
    }
  }, [])

  async function handleFile(file: File | null | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current)
    const url = URL.createObjectURL(file)
    imageUrlRef.current = url
    const img = new Image()
    img.onload = () => {
      setImage(img)
      setFileLabel(file.name)
      setTransform(DEFAULT_TOKEN_TRANSFORM)
      setFeedback(null)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      imageUrlRef.current = null
      setFeedback('Não deu para ler essa imagem.')
    }
    img.src = url
  }

  function startPan(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!image || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: transform.offsetX,
      originY: transform.offsetY,
    }
  }

  function movePan(event: ReactPointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const canvas = previewRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dx = ((event.clientX - drag.startX) / rect.width) * 100
    const dy = ((event.clientY - drag.startY) / rect.height) * 100
    applyTransform({
      offsetX: drag.originX + dx,
      offsetY: drag.originY + dy,
    })
  }

  function endPan(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (dragRef.current?.pointerId === event.pointerId) dragRef.current = null
  }

  async function pngBlob(): Promise<Blob> {
    const canvas = previewRef.current
    if (!canvas) throw new Error('Prévia ainda não está pronta.')
    return canvasToPngBlob(canvas)
  }

  async function handleDownload() {
    setBusy(true)
    try {
      const blob = await pngBlob()
      downloadBlob(`${fileSlug(fileLabel ?? 'token', 'token')}.png`, blob)
      setFeedback('PNG baixado.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Falha ao exportar.')
    } finally {
      setBusy(false)
    }
  }

  async function handleAttach(creature: Creature) {
    const existing = await getTokenImage('creature', creature.id)
    if (existing) {
      const ok = window.confirm(
        `“${creature.name}” já tem um token. Substituir pelo que está na prévia?`,
      )
      if (!ok) return
    }
    setBusy(true)
    try {
      const blob = await pngBlob()
      await saveTokenImage('creature', creature.id, blob)
      bumpImageVersion()
      setAttachOpen(false)
      setFeedback(`Token atrelado a ${creature.name}. Vale em todo o grid.`)
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : 'Não deu para atrelar.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <div className="flex flex-col items-center gap-3">
        <div
          className="rounded-full border border-border p-2"
          style={{
            backgroundColor: 'var(--portrait-stage)',
            backgroundImage: CHECKER,
            backgroundSize: '14px 14px',
            backgroundPosition: '0 0, 0 7px, 7px -7px, -7px 0',
          }}
        >
          <canvas
            ref={previewRef}
            width={TOKEN_CANVAS_SIZE}
            height={TOKEN_CANVAS_SIZE}
            className={`h-72 w-72 touch-none ${
              image ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
            aria-label="Prévia do token"
            onPointerDown={startPan}
            onPointerMove={movePan}
            onPointerUp={endPan}
            onPointerCancel={endPan}
          />
        </div>
        <p className="max-w-xs text-center text-[11px] text-text-dim">
          {image
            ? 'Arraste a foto · scroll = zoom.'
            : 'Importe uma foto para preencher o círculo.'}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/*"
          className="hidden"
          onChange={(event) => {
            void handleFile(event.target.files?.[0])
            event.target.value = ''
          }}
        />
        <div className="flex flex-wrap justify-center gap-2">
          <Button onClick={() => inputRef.current?.click()} disabled={busy}>
            {image ? 'Trocar foto…' : 'Importar foto…'}
          </Button>
          <Button
            variant="accent"
            disabled={busy}
            onClick={() => void handleDownload()}
          >
            Salvar PNG
          </Button>
          <Button
            disabled={busy}
            title="A foto vale para todas as fichas dessa criatura no tabuleiro"
            onClick={() => setAttachOpen(true)}
          >
            Atrelar ao bestiário…
          </Button>
        </div>
        {feedback ? (
          <p className="text-center text-sm text-success">{feedback}</p>
        ) : null}
      </div>

      <div className="space-y-4">
        <section>
          <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
            Moldura
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {TOKEN_FRAMES.map((frame) => (
              <FrameThumb
                key={frame.id}
                frameId={frame.id}
                name={frame.name}
                color={color}
                selected={frameId === frame.id}
                onSelect={() => setFrameId(frame.id)}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
            Cor
          </h2>
          <div className="flex flex-wrap items-center gap-1.5">
            {TOKEN_COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.id}
                type="button"
                title={swatch.name}
                aria-label={swatch.name}
                aria-pressed={color.toLowerCase() === swatch.hex.toLowerCase()}
                className={`h-7 w-7 rounded-full border-2 ${
                  color.toLowerCase() === swatch.hex.toLowerCase()
                    ? 'border-info ring-1 ring-info'
                    : 'border-border'
                }`}
                style={{ backgroundColor: swatch.hex }}
                onClick={() => setColor(swatch.hex)}
              />
            ))}
            <label className="ml-1 flex items-center gap-1.5 text-[11px] text-text-dim">
              Custom
              <input
                type="color"
                aria-label="Cor customizada da moldura"
                className="h-7 w-9 cursor-pointer rounded-md border border-border bg-surface-2 p-0.5"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-border bg-surface-2 p-3">
          <SliderRow
            label="Zoom da foto"
            valueLabel={`${Math.round(transform.zoom * 100)}%`}
            min={TOKEN_ZOOM_MIN * 100}
            max={TOKEN_ZOOM_MAX * 100}
            step={5}
            value={Math.round(transform.zoom * 100)}
            onChange={(value) => applyTransform({ zoom: value / 100 })}
          />
          <SliderRow
            label="Abertura do círculo"
            valueLabel={`${Math.round(transform.hole * 100)}%`}
            min={TOKEN_HOLE_MIN * 100}
            max={TOKEN_HOLE_MAX * 100}
            step={1}
            value={Math.round(transform.hole * 100)}
            onChange={(value) => applyTransform({ hole: value / 100 })}
            hint="Mais abertura = mais foto, moldura mais fininha."
          />
          <div>
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              Posição da foto
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  applyTransform({ offsetX: transform.offsetX - 6 })
                }
              >
                ←
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  applyTransform({ offsetY: transform.offsetY - 6 })
                }
              >
                ↑
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  applyTransform({ offsetY: transform.offsetY + 6 })
                }
              >
                ↓
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  applyTransform({ offsetX: transform.offsetX + 6 })
                }
              >
                →
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => applyTransform(DEFAULT_TOKEN_TRANSFORM)}
              >
                Resetar
              </Button>
            </div>
          </div>
        </section>
      </div>

      {attachOpen ? (
        <AttachCreatureDialog
          busy={busy}
          onClose={() => setAttachOpen(false)}
          onPick={(creature) => void handleAttach(creature)}
        />
      ) : null}
    </div>
  )
}

function SliderRow({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  hint,
}: {
  label: string
  valueLabel: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
  hint?: string
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wide text-text-dim">
        <span>{label}</span>
        <span className="tabular-nums text-text-muted">{valueLabel}</span>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        className="w-full accent-[var(--color-accent)]"
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {hint ? <p className="mt-1 text-[10px] text-text-dim">{hint}</p> : null}
    </div>
  )
}

function FrameThumb({
  frameId,
  name,
  color,
  selected,
  onSelect,
}: {
  frameId: TokenFrameId
  name: string
  color: string
  selected: boolean
  onSelect: () => void
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    paintToken(ctx, 96, {
      ...DEFAULT_TOKEN_TRANSFORM,
      image: null,
      imageWidth: 0,
      imageHeight: 0,
      frameId,
      color,
    })
  }, [frameId, color])

  return (
    <button
      type="button"
      title={name}
      aria-pressed={selected}
      onClick={onSelect}
      className={`rounded-lg border p-1 ${
        selected
          ? 'border-info bg-info/10'
          : 'border-border bg-surface-2 hover:border-accent/50'
      }`}
    >
      <canvas
        ref={ref}
        width={96}
        height={96}
        className="mx-auto h-14 w-14"
        aria-hidden
      />
      <span className="mt-0.5 block text-center text-[10px] text-text-muted">
        {name}
      </span>
    </button>
  )
}
