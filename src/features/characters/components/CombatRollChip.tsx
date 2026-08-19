import { DiceIcon } from '@/components/dice/DiceButton'
import { parseDiceFormula } from '@/utils/dice'
import { formatModifier } from '@/utils/labels'
import { useDiceStore } from '@/stores/diceStore'
import {
  MAP_STEP_LABELS,
  mapPenaltyBreakdownLabel,
  mapPenaltyForStep,
  type MapProfile,
} from '@/engine/multipleAttackPenalty'

export function CombatRollChip({
  label,
  hint,
  title,
  disabled,
  onClick,
}: {
  label: string
  hint?: string
  title?: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-lg border border-accent/40 bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent transition-colors hover:bg-accent/20 disabled:pointer-events-none disabled:opacity-40"
    >
      <DiceIcon className="h-3.5 w-3.5" />
      {label}
      {hint ? (
        <span className="tabular-nums text-accent/85">{hint}</span>
      ) : null}
    </button>
  )
}

export function MapAttackChips({
  name,
  baseBonus,
  profile,
  breakdown = [],
  disabled,
  disabledTitle,
  onBeforeRoll,
}: {
  name: string
  baseBonus: number | null
  profile: MapProfile
  breakdown?: Array<{ label: string; value: number }>
  disabled?: boolean
  disabledTitle?: string
  onBeforeRoll?: () => boolean | void
}) {
  return (
    <>
      {MAP_STEP_LABELS.map((label, index) => {
        const penalty = mapPenaltyForStep(profile, index)
        const bonus = baseBonus == null ? null : baseBonus + penalty
        const stepTitle = `${index + 1}º ataque`
        const mapNote =
          penalty !== 0
            ? ` · ${mapPenaltyBreakdownLabel(profile)} ${formatModifier(penalty)}`
            : profile.agile
              ? ' · ágil'
              : ''
        return (
          <CombatRollChip
            key={label}
            label={label}
            hint={bonus != null ? formatModifier(bonus) : '—'}
            disabled={disabled || bonus == null}
            title={
              disabled
                ? disabledTitle
                : bonus == null
                  ? undefined
                  : `${stepTitle} · 1d20 ${formatModifier(bonus)}${mapNote}`
            }
            onClick={() => {
              if (bonus == null) return
              if (onBeforeRoll?.() === false) return
              const parts = [...breakdown]
              if (penalty) {
                parts.push({
                  label: mapPenaltyBreakdownLabel(profile),
                  value: penalty,
                })
              }
              useDiceStore
                .getState()
                .rollCheck(`${name} (${stepTitle})`, bonus, parts)
            }}
          />
        )
      })}
    </>
  )
}

export function rollParsedFormula(
  label: string,
  formula: string,
  modifier = 0,
) {
  const parsed = parseDiceFormula(formula)
  if (!parsed) return
  useDiceStore.getState().rollFree(parsed.sides, parsed.count, modifier, label)
}
