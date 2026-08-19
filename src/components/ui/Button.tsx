import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent'
type Size = 'sm' | 'md'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-surface-4 hover:bg-border-strong text-text border border-border hover:border-border-strong',
  secondary:
    'bg-surface-2 hover:bg-surface-3 text-text border border-border hover:border-border-strong',
  ghost: 'bg-transparent hover:bg-surface-3 text-text-muted hover:text-text',
  danger:
    'bg-danger/15 hover:bg-danger/25 text-danger border border-danger/40',
  accent:
    'bg-accent/18 hover:bg-accent/28 text-accent border border-accent/45 hover:border-accent/70',
}

const sizes: Record<Size, string> = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-1.5 text-sm',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`interactive-lift inline-flex items-center justify-center gap-1.5 rounded-lg font-medium disabled:pointer-events-none disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
