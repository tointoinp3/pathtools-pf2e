import { type ReactNode } from 'react'
import { parseActionCostText } from '@/components/ui/ActionIcon'

/**
 * Texto de regra com markdown leve:
 * `**negrito**` e `_itálico_`.
 * Frases de custo de ação viram o ícone oficial (o resto do texto fica).
 * Usado em descrições de feitos, classes, ancestralidades, etc.
 */
export function RichText({
  children,
  className,
  as: Tag = 'span',
}: {
  children?: string | null
  className?: string
  as?: 'span' | 'p' | 'div' | 'li'
}) {
  if (!children) return null
  return <Tag className={className}>{parseInlineMarkdown(children)}</Tag>
}

export function parseInlineMarkdown(text: string): ReactNode[] {
  return parseBold(text, 'r')
}

function parseBold(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = /\*\*(.+?)\*\*/g
  let last = 0
  let i = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text))) {
    if (match.index > last) {
      nodes.push(
        ...parseItalics(text.slice(last, match.index), `${keyPrefix}-t${i}`),
      )
    }
    nodes.push(
      <strong key={`${keyPrefix}-b${i}`} className="font-semibold text-text">
        {parseItalics(match[1] ?? '', `${keyPrefix}-bi${i}`)}
      </strong>,
    )
    last = match.index + match[0].length
    i += 1
  }
  if (last < text.length) {
    nodes.push(...parseItalics(text.slice(last), `${keyPrefix}-t${i}`))
  }
  return nodes
}

function parseItalics(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = /_([^_\n]+)_/g
  let last = 0
  let i = 0
  let match: RegExpExecArray | null
  while ((match = re.exec(text))) {
    if (match.index > last) {
      nodes.push(
        ...parseActionCostText(
          text.slice(last, match.index),
          `${keyPrefix}-x${i}`,
        ),
      )
    }
    nodes.push(
      <em key={`${keyPrefix}-i${i}`} className="italic">
        {parseActionCostText(match[1] ?? '', `${keyPrefix}-ii${i}`)}
      </em>,
    )
    last = match.index + match[0].length
    i += 1
  }
  if (last < text.length) {
    nodes.push(
      ...parseActionCostText(text.slice(last), `${keyPrefix}-x${i}`),
    )
  }
  return nodes
}
