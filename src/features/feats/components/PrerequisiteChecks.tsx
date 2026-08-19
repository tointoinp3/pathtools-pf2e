import type { FeatPrerequisiteCheck } from '@/types'

export function PrerequisiteChecks({
  checks,
  compact = false,
}: {
  checks: FeatPrerequisiteCheck[]
  compact?: boolean
}) {
  if (checks.length === 0) return null
  return (
    <ul className={compact ? 'space-y-0.5' : 'space-y-1'}>
      {checks.map((check) => {
        const tone =
          check.met === true
            ? 'text-success'
            : check.met === false
              ? 'text-danger'
              : 'text-text-dim'
        const mark =
          check.met === true ? '✓' : check.met === false ? '✗' : '·'
        return (
          <li
            key={check.key}
            className={`${compact ? 'text-[11px]' : 'text-xs'} ${tone}`}
          >
            <span className="mr-1.5 font-semibold" aria-hidden>
              {mark}
            </span>
            <span className="font-medium">{check.label}</span>
            {check.current ? (
              <span className="text-text-dim"> · você: {check.current}</span>
            ) : null}
            {check.met === null ? (
              <span className="text-text-dim"> · você e o MJ decidem</span>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
