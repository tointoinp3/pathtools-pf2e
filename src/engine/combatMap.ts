import type { CombatMapBackdrop } from '@/types/combat'

export const MAP_SIZE_MIN = 2
export const MAP_SIZE_MAX = 200

export type MapHandle = 'nw' | 'ne' | 'sw' | 'se'

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function round3(value: number): number {
  return Math.round(value * 1000) / 1000
}

export function snapMapValue(value: number, step: number): number {
  if (step <= 0) return value
  return Math.round(value / step) * step
}

export function roundMapBackdrop(map: CombatMapBackdrop): CombatMapBackdrop {
  return {
    x: round3(map.x),
    y: round3(map.y),
    width: round3(map.width),
    height: round3(map.height),
    aspect: map.aspect,
  }
}

/** Encaixa a imagem inteira no tabuleiro, centrada, sem distorcer. */
export function mapContainInGrid(
  aspect: number,
  cols: number,
  rows: number,
): CombatMapBackdrop {
  const safeAspect = aspect > 0 && Number.isFinite(aspect) ? aspect : 1
  const gridAspect = cols / rows
  if (safeAspect >= gridAspect) {
    const width = cols
    const height = width / safeAspect
    return roundMapBackdrop({
      x: 0,
      y: (rows - height) / 2,
      width,
      height,
      aspect: safeAspect,
    })
  }
  const height = rows
  const width = height * safeAspect
  return roundMapBackdrop({
    x: (cols - width) / 2,
    y: 0,
    width,
    height,
    aspect: safeAspect,
  })
}

export function centerMapOnGrid(
  map: CombatMapBackdrop,
  cols: number,
  rows: number,
): CombatMapBackdrop {
  return roundMapBackdrop({
    ...map,
    x: (cols - map.width) / 2,
    y: (rows - map.height) / 2,
  })
}

/** Muda a largura e mantém o centro (e a proporção da imagem). */
export function setMapWidthCentered(
  map: CombatMapBackdrop,
  width: number,
): CombatMapBackdrop {
  const nextWidth = clamp(width, MAP_SIZE_MIN, MAP_SIZE_MAX)
  const height = nextWidth / map.aspect
  const cx = map.x + map.width / 2
  const cy = map.y + map.height / 2
  return roundMapBackdrop({
    ...map,
    width: nextWidth,
    height,
    x: cx - nextWidth / 2,
    y: cy - height / 2,
  })
}

export function panMap(
  map: CombatMapBackdrop,
  x: number,
  y: number,
  snap: number,
): CombatMapBackdrop {
  return roundMapBackdrop({
    ...map,
    x: snapMapValue(x, snap),
    y: snapMapValue(y, snap),
  })
}

export function nudgeMap(
  map: CombatMapBackdrop,
  dx: number,
  dy: number,
): CombatMapBackdrop {
  return roundMapBackdrop({
    ...map,
    x: map.x + dx,
    y: map.y + dy,
  })
}

/**
 * Redimensiona a partir de um canto, com o canto oposto fixo.
 * Usa o eixo que “puxa mais” para o gesto parecer natural.
 */
export function scaleMapFromCorner(
  map: CombatMapBackdrop,
  handle: MapHandle,
  pointerX: number,
  pointerY: number,
  snap: number,
): CombatMapBackdrop {
  const { aspect } = map
  const right = map.x + map.width
  const bottom = map.y + map.height

  let fromX: number
  let fromY: number
  if (handle === 'se') {
    fromX = pointerX - map.x
    fromY = (pointerY - map.y) * aspect
  } else if (handle === 'sw') {
    fromX = right - pointerX
    fromY = (pointerY - map.y) * aspect
  } else if (handle === 'ne') {
    fromX = pointerX - map.x
    fromY = (bottom - pointerY) * aspect
  } else {
    fromX = right - pointerX
    fromY = (bottom - pointerY) * aspect
  }

  const width = clamp(
    snapMapValue(Math.max(fromX, fromY), snap),
    MAP_SIZE_MIN,
    MAP_SIZE_MAX,
  )
  const height = width / aspect

  if (handle === 'se') {
    return roundMapBackdrop({ ...map, width, height })
  }
  if (handle === 'sw') {
    return roundMapBackdrop({ ...map, x: right - width, width, height })
  }
  if (handle === 'ne') {
    return roundMapBackdrop({ ...map, y: bottom - height, width, height })
  }
  return roundMapBackdrop({
    ...map,
    x: right - width,
    y: bottom - height,
    width,
    height,
  })
}

/** Aceita "24,5" (pt-BR) ou "24.5". */
export function parseMapWidthInput(raw: string): number | null {
  const parsed = Number(raw.trim().replace(',', '.'))
  if (!Number.isFinite(parsed) || parsed <= 0) return null
  return clamp(parsed, MAP_SIZE_MIN, MAP_SIZE_MAX)
}

export async function readImageAspect(blob: Blob): Promise<number> {
  if (typeof createImageBitmap === 'function') {
    const bitmap = await createImageBitmap(blob)
    const aspect = bitmap.width / bitmap.height
    bitmap.close()
    if (!Number.isFinite(aspect) || aspect <= 0) {
      throw new Error('Imagem inválida')
    }
    return aspect
  }
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(url)
      const aspect = image.naturalWidth / image.naturalHeight
      if (!Number.isFinite(aspect) || aspect <= 0) {
        reject(new Error('Imagem inválida'))
        return
      }
      resolve(aspect)
    }
    image.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Imagem inválida'))
    }
    image.src = url
  })
}
