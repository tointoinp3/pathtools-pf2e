import type { CreatureSense } from '@/types/creature'
import { Panel } from '@/components/ui/Panel'
import { SenseRulesCard } from '@/features/senses/components/SenseRulesCard'
import { NORMAL_VISION_CARD } from '@/data/seeds/senses'

export function SensesPanel({
  senses,
  title = 'Sentidos',
  subtitle = 'Player Core pg. 433 · toque no nome para ler',
  emptyAsNormalVision = true,
  bare = false,
}: {
  senses: Array<{
    id?: string
    name: string
    description?: string
    sourceLabel?: string
    kind?: string
    range?: number
    precise?: boolean
  }>
  title?: string
  subtitle?: string
  emptyAsNormalVision?: boolean
  bare?: boolean
}) {
  const list =
    senses.length > 0
      ? senses
      : emptyAsNormalVision
        ? [{ id: 'vision-normal', name: 'Visão normal', kind: 'vision' }]
        : []
  if (list.length === 0) return null

  const cards = (
      <ul className="space-y-1">
        {list.map((sense, index) => (
          <li key={sense.id ?? `${sense.name}-${index}`}>
            {sense.kind === 'vision' && senses.length === 0 ? (
              <SenseRulesCard model={NORMAL_VISION_CARD} />
            ) : (
              <SenseRulesCard
                kind={sense.kind}
                name={sense.name}
                rangeFeet={sense.range}
                precise={sense.precise}
                description={sense.description}
                sourceLabel={sense.sourceLabel}
              />
            )}
          </li>
        ))}
      </ul>
  )

  if (bare) return cards

  return (
    <Panel quiet compact title={title} subtitle={subtitle}>
      {cards}
    </Panel>
  )
}

export function CreatureSensesBlock({
  senses,
}: {
  senses: CreatureSense[]
}) {
  if (senses.length === 0) return null
  return (
    <ul className="space-y-1">
      {senses.map((sense, index) => (
        <li key={`${sense.kind}-${sense.name ?? ''}-${index}`}>
          <SenseRulesCard
            kind={sense.kind}
            name={sense.name}
            rangeFeet={sense.range}
            precise={sense.precise}
          />
        </li>
      ))}
    </ul>
  )
}
