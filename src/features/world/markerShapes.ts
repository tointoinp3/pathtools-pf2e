/**
 * Glifos SVG das formas de marcador. ViewBox 0 0 24 24, centro em 12,12.
 * Sem significado fixo — o usuário decide o que cada forma representa.
 */

import type { MarkerShape } from '@/types/world'

function polygon(points: string, extra = ''): string {
  return `<polygon points="${points}"${extra} />`
}

function path(d: string, extra = ''): string {
  return `<path d="${d}"${extra} />`
}

const STAR5 =
  '12,2 14.5,8.5 21.5,9 16.2,13.6 17.8,20.5 12,16.8 6.2,20.5 7.8,13.6 2.5,9 9.5,8.5'
const STAR4 = '12,2 14,10 22,12 14,14 12,22 10,14 2,12 10,10'
const PENTAGON = '12,2.5 21.5,9.5 17.8,20.5 6.2,20.5 2.5,9.5'
const HEXAGON = '12,2 20.5,7 20.5,17 12,22 3.5,17 3.5,7'

export function markerSvgInner(shape: MarkerShape): string {
  switch (shape) {
    case 'circle':
      return '<circle cx="12" cy="12" r="8.5" />'
    case 'ring':
      return '<circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.6" />'
    case 'square':
      return '<rect x="4" y="4" width="16" height="16" rx="1.5" />'
    case 'diamond':
      return polygon('12,2.5 21.5,12 12,21.5 2.5,12')
    case 'triangle':
      return polygon('12,3 21.5,20.5 2.5,20.5')
    case 'triangleDown':
      return polygon('12,21 21.5,3.5 2.5,3.5')
    case 'star':
      return polygon(STAR5)
    case 'star4':
      return polygon(STAR4)
    case 'pentagon':
      return polygon(PENTAGON)
    case 'hexagon':
      return polygon(HEXAGON)
    case 'cross':
      return path(
        'M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z',
      )
    case 'x':
      return path(
        'M5.2 3.8 12 10.6 18.8 3.8 20.2 5.2 13.4 12l6.8 6.8-1.4 1.4L12 13.4l-6.8 6.8-1.4-1.4L10.6 12 3.8 5.2z',
      )
    case 'pin':
      return path(
        'M12 2c-4 0-7 3.1-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z',
      )
    case 'flag':
      return path('M6 3h2v18H6zm3 1h11l-3 4 3 4H9z')
  }
}

export const COUNTRY_COLOR_PRESETS = [
  '#c45c4a',
  '#d4a84b',
  '#4c8f6a',
  '#5b8def',
  '#8b6bb8',
  '#c45ed1',
  '#3aa0a8',
  '#d4783a',
  '#6d8a9e',
  '#b85c7a',
  '#7a9e4a',
  '#4a6db8',
  '#a8783a',
  '#8a4a4a',
  '#3d6b5c',
  '#5c4a8a',
] as const

export const MARKER_COLOR_PRESETS = [
  '#d4a84b',
  '#eef0f5',
  '#d45454',
  '#4caf7a',
  '#5b8def',
  '#c45ed1',
  '#3aa0a8',
  '#1a1a1a',
] as const
