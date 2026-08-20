export const TOKEN_CANVAS_SIZE = 512

export const TOKEN_ZOOM_MIN = 0.4
export const TOKEN_ZOOM_MAX = 3
export const TOKEN_OFFSET_MIN = -80
export const TOKEN_OFFSET_MAX = 80
export const TOKEN_HOLE_MIN = 0.52
export const TOKEN_HOLE_MAX = 0.82
export const TOKEN_HOLE_DEFAULT = 0.7

export const TOKEN_FRAMES = [
  { id: 'gear', name: 'Engrenagem' },
  { id: 'ring', name: 'Anel' },
  { id: 'double', name: 'Duplo' },
  { id: 'bevel', name: 'Chanfrado' },
  { id: 'hex', name: 'Hexágono' },
  { id: 'spike', name: 'Espinhos' },
  { id: 'ornate', name: 'Ornado' },
  { id: 'square', name: 'Quadrado' },
] as const

export type TokenFrameId = (typeof TOKEN_FRAMES)[number]['id']

export const TOKEN_COLOR_SWATCHES = [
  { id: 'gold', name: 'Ouro', hex: '#c9a227' },
  { id: 'silver', name: 'Prata', hex: '#c5cdd8' },
  { id: 'iron', name: 'Ferro', hex: '#6d7380' },
  { id: 'bronze', name: 'Bronze', hex: '#b87333' },
  { id: 'copper', name: 'Cobre', hex: '#c47a4a' },
  { id: 'blood', name: 'Sangue', hex: '#8b2e2e' },
  { id: 'forest', name: 'Verde', hex: '#3d6b4f' },
  { id: 'royal', name: 'Azul', hex: '#3a4d8f' },
  { id: 'void', name: 'Umbra', hex: '#3a3348' },
] as const

export interface TokenStudioTransform {
  zoom: number
  offsetX: number
  offsetY: number
  hole: number
}

export const DEFAULT_TOKEN_TRANSFORM: TokenStudioTransform = {
  zoom: 1,
  offsetX: 0,
  offsetY: 0,
  hole: TOKEN_HOLE_DEFAULT,
}

export function isTokenFrameId(value: string): value is TokenFrameId {
  return TOKEN_FRAMES.some((frame) => frame.id === value)
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function clampTokenTransform(
  patch: Partial<TokenStudioTransform>,
  base: TokenStudioTransform = DEFAULT_TOKEN_TRANSFORM,
): TokenStudioTransform {
  const next = { ...base, ...patch }
  return {
    zoom: clamp(next.zoom, TOKEN_ZOOM_MIN, TOKEN_ZOOM_MAX),
    offsetX: clamp(next.offsetX, TOKEN_OFFSET_MIN, TOKEN_OFFSET_MAX),
    offsetY: clamp(next.offsetY, TOKEN_OFFSET_MIN, TOKEN_OFFSET_MAX),
    hole: clamp(next.hole, TOKEN_HOLE_MIN, TOKEN_HOLE_MAX),
  }
}

export function parseHexRgb(hex: string): [number, number, number] | null {
  const raw = hex.trim().replace('#', '')
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : raw
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null
  return [
    Number.parseInt(full.slice(0, 2), 16),
    Number.parseInt(full.slice(2, 4), 16),
    Number.parseInt(full.slice(4, 6), 16),
  ]
}

function toHex(r: number, g: number, b: number): string {
  const byte = (n: number) =>
    Math.round(clamp(n, 0, 255))
      .toString(16)
      .padStart(2, '0')
  return `#${byte(r)}${byte(g)}${byte(b)}`
}

export function mixHex(hex: string, other: string, amount: number): string {
  const a = parseHexRgb(hex)
  const b = parseHexRgb(other)
  if (!a || !b) return hex
  const t = clamp(amount, 0, 1)
  return toHex(
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  )
}

export function lightenHex(hex: string, amount: number): string {
  return mixHex(hex, '#ffffff', amount)
}

export function darkenHex(hex: string, amount: number): string {
  return mixHex(hex, '#000000', amount)
}
