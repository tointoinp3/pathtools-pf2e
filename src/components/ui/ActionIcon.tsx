import { Fragment, type CSSProperties, type ReactNode } from 'react'
import icon1A from '@/assets/actions/1A.png'
import icon2A from '@/assets/actions/2A.png'
import icon3A from '@/assets/actions/3A.png'
import iconFA from '@/assets/actions/FA.png'
import iconR from '@/assets/actions/R.png'

/** Custos de ação padrão PF2e (como no AoN / livros) */
export type Pf2ActionType =
  | 'one'
  | 'two'
  | 'three'
  | 'free'
  | 'reaction'
  | 'passive'

export const ACTION_LABELS_PT: Record<Pf2ActionType, string> = {
  one: '1 ação',
  two: '2 ações',
  three: '3 ações',
  free: 'Ação livre',
  reaction: 'Reação',
  passive: 'Passivo',
}

/** Confere se um texto solto (dado do catálogo) é um custo de ação válido. */
export function isPf2ActionType(value: unknown): value is Pf2ActionType {
  return typeof value === 'string' && value in ACTION_LABELS_PT
}

/** Tipos com ícone (o passivo não tem figura). */
export const ACTION_ICON_TYPES: Array<Exclude<Pf2ActionType, 'passive'>> = [
  'one',
  'two',
  'three',
  'free',
  'reaction',
]

/**
 * Tokens que o RichText troca pelo ícone oficial.
 * Homebrew grava o texto; a ficha e o compêndio mostram o símbolo.
 */
export const ACTION_INSERT_TOKENS: Record<
  Exclude<Pf2ActionType, 'passive'>,
  string
> = {
  one: '[1 ação]',
  two: '[2 ações]',
  three: '[3 ações]',
  free: '[ação livre]',
  reaction: '[reação]',
}

export const ACTION_INSERT_COMBOS: Array<{
  types: Array<Exclude<Pf2ActionType, 'passive'>>
  token: string
  title: string
}> = [
  { types: ['one', 'two'], token: '[1 ou 2 ações]', title: '1 ou 2 ações' },
  {
    types: ['one', 'two', 'three'],
    token: '[1, 2 ou 3 ações]',
    title: '1, 2 ou 3 ações',
  },
]

export function insertActionToken(
  text: string,
  token: string,
  start: number,
  end: number,
): { next: string; caret: number } {
  const from = Math.max(0, Math.min(start, text.length))
  const to = Math.max(from, Math.min(end, text.length))
  const before = text.slice(0, from)
  const after = text.slice(to)
  const spaceBefore = before.length > 0 && !/\s$/.test(before)
  const spaceAfter = after.length > 0 && !/^\s/.test(after)
  const piece = `${spaceBefore ? ' ' : ''}${token}${spaceAfter ? ' ' : ''}`
  return {
    next: before + piece + after,
    caret: before.length + piece.length - (spaceAfter ? 1 : 0),
  }
}

const ACTION_IMAGES: Record<Exclude<Pf2ActionType, 'passive'>, string> = {
  one: icon1A,
  two: icon2A,
  three: icon3A,
  free: iconFA,
  reaction: iconR,
}

const WIDTH: Record<Exclude<Pf2ActionType, 'passive'>, string> = {
  one: '1.15em',
  two: '1.35em',
  three: '1.55em',
  free: '1.15em',
  reaction: '1.15em',
}

export function ActionIcon({
  type,
  className = '',
  title,
}: {
  type: Pf2ActionType
  className?: string
  title?: string
}) {
  if (type === 'passive') return null
  const label = title ?? ACTION_LABELS_PT[type]
  const style: CSSProperties = { width: WIDTH[type], height: '1.2em' }

  return (
    <span
      role="img"
      aria-label={label}
      title={label}
      className={`inline-flex shrink-0 items-center justify-center leading-none ${className}`}
      style={style}
    >
      <img
        src={ACTION_IMAGES[type]}
        alt=""
        draggable={false}
        className="action-icon-img h-full w-full object-contain"
      />
    </span>
  )
}

/** Ícone + rótulo curto (pt-BR), padrão AoN ao lado do nome do feito/magia */
export function ActionCost({
  type,
  showLabel = false,
  className = '',
}: {
  type?: Pf2ActionType | null
  showLabel?: boolean
  className?: string
}) {
  if (!type || type === 'passive') return null
  return (
    <span
      className={`inline-flex items-center gap-1.5 align-middle text-text ${className}`}
    >
      <ActionIcon type={type} />
      {showLabel && (
        <span className="text-[10px] leading-none text-text-dim">
          {ACTION_LABELS_PT[type]}
        </span>
      )}
    </span>
  )
}

function ActionCostIcons({
  types,
  keyPrefix,
}: {
  types: Pf2ActionType[]
  keyPrefix: string
}) {
  const visible = types.filter((t) => t !== 'passive')
  if (visible.length === 0) return null
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      {visible.map((type, i) => (
        <ActionIcon key={`${keyPrefix}-${type}-${i}`} type={type} />
      ))}
    </span>
  )
}

const COST_PATTERNS: Array<{ re: RegExp; types: Pf2ActionType[] }> = [
  {
    re: /^1,\s*2\s+ou\s+3\s+a[cç][oõ]es(?![a-zà-ú])/i,
    types: ['one', 'two', 'three'],
  },
  {
    re: /^(?:uma|1)\s+ou\s+(?:duas|2)\s+a[cç][oõ]es(?![a-zà-ú])/i,
    types: ['one', 'two'],
  },
  {
    re: /^(?:duas|2)\s+ou\s+(?:tr[eê]s|3)\s+a[cç][oõ]es(?![a-zà-ú])/i,
    types: ['two', 'three'],
  },
  {
    re: /^\[(?:one|1)[- ]actions?\]/i,
    types: ['one'],
  },
  {
    re: /^\[(?:two|2)[- ]actions?\]/i,
    types: ['two'],
  },
  {
    re: /^\[(?:three|3)[- ]actions?\]/i,
    types: ['three'],
  },
  { re: /^\[free[- ]actions?\]/i, types: ['free'] },
  { re: /^\[reactions?\]/i, types: ['reaction'] },
  {
    re: /^(?:tr[eê]s|3)\s+a[cç][oõ]es(?![a-zà-ú])/i,
    types: ['three'],
  },
  {
    re: /^(?:duas|2)\s+a[cç][oõ]es(?![a-zà-ú])/i,
    types: ['two'],
  },
  {
    re: /^(?:uma|1)\s+a[cç][aã]o\s+livre(?![a-zà-ú])/i,
    types: ['free'],
  },
  { re: /^a[cç][aã]o\s+livre(?![a-zà-ú])/i, types: ['free'] },
  {
    re: /^(?:uma\s+)?[uú]nica\s+a[cç][aã]o(?![a-zà-ú])/i,
    types: ['one'],
  },
  {
    re: /^(?:uma|1)\s+a[cç][aã]o(?![a-zà-ú])/i,
    types: ['one'],
  },
  {
    re: /^(?:uma|1)\s+rea[cç][aã]o(?![a-zà-ú])/i,
    types: ['reaction'],
  },
  { re: /^(?:one|1)[- ]actions?(?![a-z])/i, types: ['one'] },
  { re: /^(?:two|2)[- ]actions?(?![a-z])/i, types: ['two'] },
  { re: /^(?:three|3)[- ]actions?(?![a-z])/i, types: ['three'] },
  { re: /^free[- ]actions?(?![a-z])/i, types: ['free'] },
]

function isStartBoundary(full: string, index: number): boolean {
  if (index <= 0) return true
  const prev = full[index - 1]
  if (prev === undefined) return true
  return /[\s([{\-–—·,;:/*_>]/.test(prev)
}

function isGrantContext(full: string, index: number): boolean {
  const before = full.slice(0, index)
  if (
    /(?:ganha|ganham|dá|dão|recebe|recebem|concede|concedem|recupera|restauram?)\s+$/i.test(
      before,
    )
  ) {
    return true
  }
  return /^\d+\s+a[cç][oõ]es?\s+ao\s+(?:construto|lacaio|familiar|companheiro)/i.test(
    full.slice(index),
  )
}

function hasBadFollow(text: string, tokenLength: number): boolean {
  return /^(?:\s+de\s+(?:movimento|manipular)|\s+básicas)/i.test(
    text.slice(tokenLength),
  )
}

function matchCostToken(
  text: string,
): { length: number; types: Pf2ActionType[] } | null {
  let offset = 0
  let rest = text

  const prefix = rest.match(/^(?:custo(?:\s+de)?[:\s]+|como\s+)/i)
  if (prefix) {
    offset = prefix[0].length
    rest = rest.slice(offset)
  }

  for (const { re, types } of COST_PATTERNS) {
    const m = rest.match(re)
    if (m) {
      return { length: offset + m[0].length, types }
    }
  }

  const rx = rest.match(/^rea[cç][aã]o(?![a-zà-ú])/i)
  if (rx) {
    const after = rest.slice(rx[0].length)
    const ok =
      prefix != null || after.length === 0 || /^\s*[,:]/.test(after)
    if (ok) {
      return { length: offset + rx[0].length, types: ['reaction'] }
    }
  }

  return null
}

function matchActionCostAt(
  full: string,
  index: number,
): { length: number; types: Pf2ActionType[] } | null {
  const text = full.slice(index)

  if (text[0] === '(' || text[0] === '[') {
    const closeCh = text[0] === '(' ? ')' : ']'
    const closeIdx = text.indexOf(closeCh, 1)
    if (closeIdx > 1) {
      const inner = text.slice(1, closeIdx).trim()
      const innerMatch = matchCostToken(inner)
      if (
        innerMatch &&
        innerMatch.length === inner.length &&
        !isGrantContext(full, index + 1)
      ) {
        return { length: closeIdx + 1, types: innerMatch.types }
      }
    }
  }

  if (!isStartBoundary(full, index)) return null
  if (isGrantContext(full, index)) return null

  const token = matchCostToken(text)
  if (!token) return null
  if (hasBadFollow(text, token.length)) return null

  let length = token.length
  const colon = text.slice(length).match(/^\s*:/)
  if (colon) length += colon[0].length
  return { length, types: token.types }
}

/** Troca frases de custo (“1 ação”, “reação:”…) pelos ícones oficiais. */
export function parseActionCostText(
  text: string,
  keyPrefix: string,
): ReactNode[] {
  const nodes: ReactNode[] = []
  let i = 0
  let n = 0
  let buffer = ''

  const flush = () => {
    if (!buffer) return
    nodes.push(
      <Fragment key={`${keyPrefix}-t${n}`}>{buffer}</Fragment>,
    )
    n += 1
    buffer = ''
  }

  while (i < text.length) {
    const hit = matchActionCostAt(text, i)
    if (hit) {
      flush()
      nodes.push(
        <ActionCostIcons
          key={`${keyPrefix}-a${n}`}
          keyPrefix={`${keyPrefix}-a${n}`}
          types={hit.types}
        />,
      )
      n += 1
      i += hit.length
      continue
    }
    buffer += text[i]
    i += 1
  }
  flush()
  return nodes
}
