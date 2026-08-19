import type { CreaturePowerVariant } from '@/types/creature'

const OPTIONS: Array<{ value: CreaturePowerVariant; label: string }> = [
  { value: 'weak', label: 'Fraca' },
  { value: 'normal', label: 'Normal' },
  { value: 'elite', label: 'Elite' },
]

export function CreatureVariantToggle({
  value,
  onChange,
}: {
  value: CreaturePowerVariant
  onChange: (next: CreaturePowerVariant) => void
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Versão da ficha"
      className="flex flex-wrap gap-0.5 rounded-lg border border-border/80 bg-surface-2/60 p-0.5"
    >
      {OPTIONS.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
              active
                ? 'bg-accent/20 text-accent'
                : 'text-text-dim hover:bg-surface-3 hover:text-text'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
