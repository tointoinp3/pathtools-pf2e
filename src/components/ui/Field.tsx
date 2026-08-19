import {
  forwardRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from 'react'

const fieldClass =
  'field-control w-full rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-sm text-text placeholder:text-text-dim outline-none transition-[border-color,box-shadow] duration-150'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className = '', ...props }, ref) {
    return <input ref={ref} className={`${fieldClass} ${className}`} {...props} />
  },
)

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`${fieldClass} min-h-24 resize-y ${className}`}
      {...props}
    />
  )
})

export function Select({
  className = '',
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={`${fieldClass} ${className}`} {...props}>
      {children}
    </select>
  )
}

export function Label({
  children,
  htmlFor,
  className = '',
}: {
  children: ReactNode
  htmlFor?: string
  className?: string
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted ${className}`}
    >
      {children}
    </label>
  )
}

export function Field({
  label,
  hint,
  children,
  className = '',
}: {
  label: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
      {hint && <p className="mt-1 text-[11px] text-text-dim">{hint}</p>}
    </div>
  )
}
