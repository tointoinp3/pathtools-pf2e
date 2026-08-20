import type { TokenFrameId, TokenStudioTransform } from '@/engine/tokenStudio'
import { darkenHex, lightenHex } from '@/engine/tokenStudio'

const TAU = Math.PI * 2

export interface TokenPaintSpec extends TokenStudioTransform {
  image: CanvasImageSource | null
  imageWidth: number
  imageHeight: number
  frameId: TokenFrameId
  color: string
}

function polar(
  cx: number,
  cy: number,
  radius: number,
  angle: number,
): { x: number; y: number } {
  return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius }
}

function paintPhoto(
  ctx: CanvasRenderingContext2D,
  spec: TokenPaintSpec,
  cx: number,
  cy: number,
  holeR: number,
) {
  if (!spec.image || spec.imageWidth <= 0 || spec.imageHeight <= 0) return
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, holeR, 0, TAU)
  ctx.clip()
  const cover =
    Math.max((holeR * 2) / spec.imageWidth, (holeR * 2) / spec.imageHeight) *
    spec.zoom
  const dw = spec.imageWidth * cover
  const dh = spec.imageHeight * cover
  const dx = cx - dw / 2 + (spec.offsetX / 100) * holeR * 2
  const dy = cy - dh / 2 + (spec.offsetY / 100) * holeR * 2
  ctx.drawImage(spec.image, dx, dy, dw, dh)
  ctx.restore()
}

function metalFill(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string,
) {
  const gradient = ctx.createLinearGradient(
    cx - radius,
    cy - radius,
    cx + radius,
    cy + radius,
  )
  gradient.addColorStop(0, lightenHex(color, 0.42))
  gradient.addColorStop(0.45, color)
  gradient.addColorStop(1, darkenHex(color, 0.38))
  ctx.fillStyle = gradient
}

function strokeOuterAndHole(
  ctx: CanvasRenderingContext2D,
  frameId: TokenFrameId,
  cx: number,
  cy: number,
  outerR: number,
  holeR: number,
  color: string,
) {
  const width = Math.max(1.5, outerR * 0.018)
  ctx.lineWidth = width
  ctx.strokeStyle = darkenHex(color, 0.45)
  traceOuter(ctx, frameId, cx, cy, outerR - width / 2)
  ctx.stroke()
  ctx.strokeStyle = lightenHex(color, 0.35)
  ctx.beginPath()
  ctx.arc(cx, cy, holeR + width / 2, 0, TAU)
  ctx.stroke()
}

function traceOuter(
  ctx: CanvasRenderingContext2D,
  frameId: TokenFrameId,
  cx: number,
  cy: number,
  outerR: number,
) {
  ctx.beginPath()
  if (
    frameId === 'ring' ||
    frameId === 'double' ||
    frameId === 'bevel'
  ) {
    ctx.arc(cx, cy, outerR, 0, TAU)
    return
  }
  if (frameId === 'gear') gearOuter(ctx, cx, cy, outerR)
  else if (frameId === 'hex') hexOuter(ctx, cx, cy, outerR)
  else if (frameId === 'spike') spikeOuter(ctx, cx, cy, outerR)
  else if (frameId === 'ornate') ornateOuter(ctx, cx, cy, outerR)
  else squareOuter(ctx, cx, cy, outerR)
  ctx.closePath()
}

/** Zera o alfa fora da silhueta — os cantos do PNG não cobrem o grid. */
function punchOutsideFrame(
  ctx: CanvasRenderingContext2D,
  frameId: TokenFrameId,
  cx: number,
  cy: number,
  outerR: number,
) {
  ctx.save()
  ctx.globalCompositeOperation = 'destination-in'
  ctx.fillStyle = '#ffffff'
  traceOuter(ctx, frameId, cx, cy, outerR)
  ctx.fill()
  ctx.restore()
}

function evenoddRing(
  ctx: CanvasRenderingContext2D,
  outer: () => void,
  cx: number,
  cy: number,
  holeR: number,
) {
  ctx.beginPath()
  outer()
  ctx.closePath()
  ctx.moveTo(cx + holeR, cy)
  ctx.arc(cx, cy, holeR, 0, TAU, true)
  ctx.closePath()
  ctx.fill('evenodd')
}

function gearOuter(ctx: CanvasRenderingContext2D, cx: number, cy: number, outerR: number) {
  const teeth = 12
  const valley = outerR * 0.82
  const tip = outerR
  for (let i = 0; i < teeth; i++) {
    const a0 = (i / teeth) * TAU - TAU / 4
    const a1 = a0 + TAU / teeth
    const mid = (a0 + a1) / 2
    const tooth = TAU / teeth
    const p0 = polar(cx, cy, valley, a0)
    const p1 = polar(cx, cy, tip, a0 + tooth * 0.18)
    const p2 = polar(cx, cy, tip, a0 + tooth * 0.38)
    const p3 = polar(cx, cy, valley, mid)
    const p4 = polar(cx, cy, tip, a1 - tooth * 0.38)
    const p5 = polar(cx, cy, tip, a1 - tooth * 0.18)
    if (i === 0) ctx.moveTo(p0.x, p0.y)
    else ctx.lineTo(p0.x, p0.y)
    ctx.lineTo(p1.x, p1.y)
    ctx.quadraticCurveTo(
      polar(cx, cy, tip * 1.02, a0 + tooth * 0.28).x,
      polar(cx, cy, tip * 1.02, a0 + tooth * 0.28).y,
      p2.x,
      p2.y,
    )
    ctx.lineTo(p3.x, p3.y)
    ctx.lineTo(p4.x, p4.y)
    ctx.quadraticCurveTo(
      polar(cx, cy, tip * 1.02, a1 - tooth * 0.28).x,
      polar(cx, cy, tip * 1.02, a1 - tooth * 0.28).y,
      p5.x,
      p5.y,
    )
  }
}

function hexOuter(ctx: CanvasRenderingContext2D, cx: number, cy: number, outerR: number) {
  for (let i = 0; i < 6; i++) {
    const p = polar(cx, cy, outerR, (i * TAU) / 6 - TAU / 12)
    if (i === 0) ctx.moveTo(p.x, p.y)
    else ctx.lineTo(p.x, p.y)
  }
}

function spikeOuter(ctx: CanvasRenderingContext2D, cx: number, cy: number, outerR: number) {
  const spikes = 16
  const valley = outerR * 0.78
  for (let i = 0; i < spikes; i++) {
    const a = (i / spikes) * TAU - TAU / 4
    const tip = polar(cx, cy, outerR, a)
    const left = polar(cx, cy, valley, a - TAU / spikes / 2)
    if (i === 0) ctx.moveTo(left.x, left.y)
    else ctx.lineTo(left.x, left.y)
    ctx.lineTo(tip.x, tip.y)
  }
}

function ornateOuter(ctx: CanvasRenderingContext2D, cx: number, cy: number, outerR: number) {
  const petals = 10
  const inner = outerR * 0.86
  for (let i = 0; i < petals; i++) {
    const a0 = (i / petals) * TAU - TAU / 4
    const a1 = ((i + 1) / petals) * TAU - TAU / 4
    const mid = (a0 + a1) / 2
    const start = polar(cx, cy, inner, a0)
    const bulge = polar(cx, cy, outerR, mid)
    if (i === 0) ctx.moveTo(start.x, start.y)
    ctx.quadraticCurveTo(bulge.x, bulge.y, polar(cx, cy, inner, a1).x, polar(cx, cy, inner, a1).y)
  }
}

function squareOuter(ctx: CanvasRenderingContext2D, cx: number, cy: number, outerR: number) {
  const s = outerR * 1.42
  const x = cx - s / 2
  const y = cy - s / 2
  const r = s * 0.18
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + s, y, x + s, y + s, r)
  ctx.arcTo(x + s, y + s, x, y + s, r)
  ctx.arcTo(x, y + s, x, y, r)
  ctx.arcTo(x, y, x + s, y, r)
}

function paintFrame(
  ctx: CanvasRenderingContext2D,
  frameId: TokenFrameId,
  cx: number,
  cy: number,
  outerR: number,
  holeR: number,
  color: string,
) {
  metalFill(ctx, cx, cy, outerR, color)

  if (frameId === 'ring') {
    ctx.beginPath()
    ctx.arc(cx, cy, (outerR + holeR) / 2, 0, TAU)
    ctx.lineWidth = outerR - holeR
    ctx.strokeStyle = ctx.fillStyle
    ctx.stroke()
  } else if (frameId === 'double') {
    const mid = (outerR + holeR) / 2
    ctx.beginPath()
    ctx.arc(cx, cy, (outerR + mid) / 2, 0, TAU)
    ctx.lineWidth = (outerR - mid) * 0.85
    ctx.strokeStyle = ctx.fillStyle
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx, cy, (mid + holeR) / 2, 0, TAU)
    ctx.lineWidth = (mid - holeR) * 0.7
    ctx.stroke()
  } else if (frameId === 'bevel') {
    evenoddRing(
      ctx,
      () => ctx.arc(cx, cy, outerR, 0, TAU),
      cx,
      cy,
      holeR,
    )
    ctx.strokeStyle = lightenHex(color, 0.5)
    ctx.lineWidth = Math.max(2, outerR * 0.04)
    ctx.beginPath()
    ctx.arc(cx, cy, (outerR + holeR) / 2, 0, TAU)
    ctx.stroke()
  } else {
    evenoddRing(
      ctx,
      () => {
        if (frameId === 'gear') gearOuter(ctx, cx, cy, outerR)
        else if (frameId === 'hex') hexOuter(ctx, cx, cy, outerR)
        else if (frameId === 'spike') spikeOuter(ctx, cx, cy, outerR)
        else if (frameId === 'ornate') ornateOuter(ctx, cx, cy, outerR)
        else squareOuter(ctx, cx, cy, outerR)
      },
      cx,
      cy,
      holeR,
    )
  }

  strokeOuterAndHole(ctx, frameId, cx, cy, outerR, holeR, color)
}

export function paintToken(
  ctx: CanvasRenderingContext2D,
  size: number,
  spec: TokenPaintSpec,
) {
  ctx.clearRect(0, 0, size, size)
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 1
  const holeR = outerR * spec.hole
  paintPhoto(ctx, spec, cx, cy, holeR)
  paintFrame(ctx, spec.frameId, cx, cy, outerR, holeR, spec.color)
  punchOutsideFrame(ctx, spec.frameId, cx, cy, outerR)
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Não deu para gerar o PNG.'))
    }, 'image/png')
  })
}
