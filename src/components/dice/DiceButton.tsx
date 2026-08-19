import type { ButtonHTMLAttributes } from 'react'
import { useDiceStore } from '@/stores/diceStore'
import { formatModifier } from '@/utils/labels'

interface DiceButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: string
  modifier: number
  breakdown?: Array<{ label: string; value: number }>
  disabledReason?: string
  size?: 'sm' | 'md'
}

export function DiceIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
      <circle cx="8.2" cy="9.2" r="0.9" fill="currentColor" />
      <circle cx="15.8" cy="9.2" r="0.9" fill="currentColor" />
      <circle cx="8.2" cy="14.8" r="0.9" fill="currentColor" />
      <circle cx="15.8" cy="14.8" r="0.9" fill="currentColor" />
    </svg>
  )
}

/** Botão de rolagem rápida: 1d20 + modificador da ficha. */
export function DiceButton({
  label,
  modifier,
  breakdown,
  disabledReason,
  size = 'sm',
  className = '',
  title,
  ...props
}: DiceButtonProps) {
  const rollCheck = useDiceStore((s) => s.rollCheck)
  const disabled = Boolean(disabledReason) || props.disabled

  return (
    <button
      type="button"
      {...props}
      disabled={disabled}
      title={
        disabledReason ??
        title ??
        `Rolar ${label} (${formatModifier(modifier)})`
      }
      aria-label={`Rolar ${label}`}
      onClick={(e) => {
        e.stopPropagation()
        if (disabled) return
        rollCheck(label, modifier, breakdown)
      }}
      className={`group inline-flex items-center justify-center rounded-md border border-transparent text-accent/80 transition-all duration-200 hover:border-accent/40 hover:bg-accent/15 hover:text-accent hover:scale-110 active:scale-95 disabled:pointer-events-none disabled:opacity-30 ${
        size === 'sm' ? 'h-7 w-7' : 'h-8 w-8'
      } ${className}`}
    >
      <DiceIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
    </button>
  )
}
