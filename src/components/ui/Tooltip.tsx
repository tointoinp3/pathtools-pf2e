import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useSettingsStore } from '@/stores/settingsStore'
import {
  DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS,
  clampSourceTooltipDelaySeconds,
} from '@/types'
import { RichText } from './RichText'

/** Padrão histórico: 3s. O valor real vem das Configurações. */
export const SOURCE_TOOLTIP_DELAY_MS =
  DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS * 1000

function useSourceTooltipDelayMs(overrideMs?: number) {
  const seconds = useSettingsStore(
    (s) => s.settings?.sourceTooltipDelaySeconds,
  )
  if (overrideMs != null) return overrideMs
  return (
    clampSourceTooltipDelaySeconds(
      seconds ?? DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS,
    ) * 1000
  )
}

function formatLine(label: string, value: string | number): string {
  const shown =
    typeof value === 'number' && value > 0 ? `+${value}` : String(value)
  return `${label}: ${shown}`
}

function formatBreakdownText(
  lines: Array<{ label: string; value: string | number }>,
): string {
  return lines.map((l) => formatLine(l.label, l.value)).join('\n')
}

/** Tooltip visual com hover (substitui title nativo quando possível). */
export function Tooltip({
  content,
  children,
  className = '',
  delayMs,
  tipClassName = '',
}: {
  content: ReactNode
  children: ReactNode
  className?: string
  delayMs?: number
  tipClassName?: string
}) {
  const resolvedDelayMs = useSourceTooltipDelayMs(delayMs)
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{
    top: number
    left: number
    place: 'above' | 'below'
  } | null>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const tipRef = useRef<HTMLSpanElement | null>(null)
  const timerRef = useRef<number | null>(null)

  function clearTimer() {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  function place() {
    const trigger = triggerRef.current
    const tip = tipRef.current
    if (!trigger || !tip) return
    const r = trigger.getBoundingClientRect()
    const t = tip.getBoundingClientRect()
    const pad = 8
    const gap = 6
    const placeAbove = r.top >= t.height + gap + pad
    const nextPlace: 'above' | 'below' = placeAbove ? 'above' : 'below'
    const top = nextPlace === 'above' ? r.top - gap : r.bottom + gap
    const half = t.width / 2
    const left = Math.min(
      window.innerWidth - pad - half,
      Math.max(pad + half, r.left + r.width / 2),
    )
    setCoords((prev) => {
      if (
        prev &&
        prev.top === top &&
        prev.left === left &&
        prev.place === nextPlace
      ) {
        return prev
      }
      return { top, left, place: nextPlace }
    })
  }

  function setTipNode(node: HTMLSpanElement | null) {
    tipRef.current = node
    if (node) place()
  }

  function onEnter() {
    clearTimer()
    timerRef.current = window.setTimeout(() => {
      const trigger = triggerRef.current
      if (trigger) {
        const r = trigger.getBoundingClientRect()
        setCoords({
          top: r.top - 6,
          left: r.left + r.width / 2,
          place: 'above',
        })
      }
      setOpen(true)
    }, resolvedDelayMs)
  }

  function onLeave() {
    clearTimer()
    setOpen(false)
  }

  useLayoutEffect(() => {
    if (!open) return
    place()
  }, [open, content])

  useEffect(() => {
    if (!open) return
    function onMove() {
      place()
    }
    window.addEventListener('scroll', onMove, true)
    window.addEventListener('resize', onMove)
    return () => {
      window.removeEventListener('scroll', onMove, true)
      window.removeEventListener('resize', onMove)
    }
  }, [open])

  useEffect(() => () => clearTimer(), [])

  // Em faixas densas passe `flex min-w-0 flex-1`; no texto fica inline-flex.
  const layout = /\bflex\b/.test(className)
    ? className
    : /\bblock\b/.test(className)
      ? className
      : `inline-flex ${className}`.trim()

  if (!content) {
    return <span className={layout}>{children}</span>
  }

  const tooltip =
    open && coords && typeof document !== 'undefined'
      ? createPortal(
          <span
            ref={setTipNode}
            role="tooltip"
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              transform:
                coords.place === 'above'
                  ? 'translate(-50%, -100%)'
                  : 'translate(-50%, 0)',
              zIndex: 80,
            }}
            className={`pointer-events-none w-max max-w-72 rounded-lg border border-border bg-surface-3 px-2.5 py-1.5 text-left text-[11px] leading-snug text-text shadow-[var(--shadow-panel)] whitespace-pre-line ${tipClassName}`}
          >
            {typeof content === 'string' ? <RichText>{content}</RichText> : content}
          </span>,
          document.body,
        )
      : null

  const extraCursor = /\bcursor-/.test(className) ? '' : 'cursor-help '

  return (
    <span
      ref={triggerRef}
      className={`relative ${extraCursor}${layout}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
    >
      {children}
      {tooltip}
    </span>
  )
}

export function BreakdownTooltip({
  lines,
  children,
  className = '',
  delayMs,
  fallback,
}: {
  lines: Array<{ label: string; value: string | number }>
  children: ReactNode
  className?: string
  delayMs?: number
  fallback?: string
}) {
  const enabled = useSettingsStore(
    (s) => s.settings?.showModifierBreakdown ?? true,
  )
  const text = lines.length > 0 ? formatBreakdownText(lines) : (fallback ?? '')

  const layout = /\bflex\b/.test(className)
    ? className
    : /\bblock\b/.test(className)
      ? className
      : `inline-flex ${className}`.trim()

  if (!enabled || !text) {
    return <span className={layout}>{children}</span>
  }

  return (
    <Tooltip className={className} content={text} delayMs={delayMs}>
      {children}
    </Tooltip>
  )
}
