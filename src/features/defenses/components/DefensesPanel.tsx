import type { ResolvedImmunity, ResolvedResistance } from '@/types'
import { Panel } from '@/components/ui/Panel'
import { DefenseRulesCard } from '@/features/defenses/components/DefenseRulesCard'

export function DefensesPanel({
  immunities = [],
  resistances = [],
  weaknesses = [],
  title = 'Imunidades, resistências e fraquezas',
  subtitle = 'Player Core pg. 407–408 · toque no nome para ler',
  bare = false,
}: {
  immunities?: ResolvedImmunity[]
  resistances?: ResolvedResistance[]
  weaknesses?: ResolvedResistance[]
  title?: string
  subtitle?: string
  bare?: boolean
}) {
  if (
    immunities.length === 0 &&
    resistances.length === 0 &&
    weaknesses.length === 0
  ) {
    return null
  }

  const list = (
      <ul className="space-y-1">
        {immunities.map((entry) => (
          <li key={entry.id}>
            <DefenseRulesCard
              kind="immunity"
              type={entry.kind}
              label={entry.label}
              sourceLabel={entry.sources.map((s) => s.label).join(', ')}
            />
          </li>
        ))}
        {resistances.map((entry) => (
          <li key={entry.id}>
            <DefenseRulesCard
              kind="resistance"
              type={entry.damageType}
              value={entry.value}
              label={entry.label}
              sourceLabel={entry.sourceLabel}
            />
          </li>
        ))}
        {weaknesses.map((entry) => (
          <li key={entry.id}>
            <DefenseRulesCard
              kind="weakness"
              type={entry.damageType}
              value={entry.value}
              label={entry.label}
              sourceLabel={entry.sourceLabel}
            />
          </li>
        ))}
      </ul>
  )

  if (bare) return list

  return (
    <Panel quiet compact title={title} subtitle={subtitle}>
      {list}
    </Panel>
  )
}

export function CreatureDefensesBlock({
  immunities,
  resistances,
  weaknesses,
}: {
  immunities?: string[]
  resistances?: Array<{ type: string; value: number }>
  weaknesses?: Array<{ type: string; value: number }>
}) {
  if (
    !(immunities?.length || resistances?.length || weaknesses?.length)
  ) {
    return null
  }

  return (
    <ul className="space-y-1">
      {(immunities ?? []).map((item) => (
        <li key={`imm-${item}`}>
          <DefenseRulesCard kind="immunity" type={item} />
        </li>
      ))}
      {(weaknesses ?? []).map((item) => (
        <li key={`wk-${item.type}-${item.value}`}>
          <DefenseRulesCard
            kind="weakness"
            type={item.type}
            value={item.value}
          />
        </li>
      ))}
      {(resistances ?? []).map((item) => (
        <li key={`res-${item.type}-${item.value}`}>
          <DefenseRulesCard
            kind="resistance"
            type={item.type}
            value={item.value}
          />
        </li>
      ))}
    </ul>
  )
}

export function ImmunityLabelList({
  labels,
}: {
  labels: string[]
}) {
  if (labels.length === 0) return null
  return (
    <ul className="space-y-1">
      {labels.map((item) => (
        <li key={item}>
          <DefenseRulesCard kind="immunity" type={item} />
        </li>
      ))}
    </ul>
  )
}
