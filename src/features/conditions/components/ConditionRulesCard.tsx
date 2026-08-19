import type { ReactNode } from 'react'
import type { ConditionDefinition } from '@/types'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { Badge } from '@/components/ui/Badge'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'

export function conditionCardTitle(
  definition: ConditionDefinition,
  value?: number,
): string {
  if (definition.valued && value != null) return `${definition.name} ${value}`
  return definition.name
}

export function ConditionRulesCard({
  definition,
  value,
  subtitle,
  badges,
  actions,
  toolbar,
  implied,
  selected,
}: {
  definition: ConditionDefinition
  value?: number
  subtitle?: string
  badges?: ReactNode
  actions?: ReactNode
  toolbar?: ReactNode
  implied?: boolean
  selected?: boolean
}) {
  const body = polishRulesText(definition.description.trim())
  const sub = [definition.originalName, subtitle ?? definition.summary]
    .filter(Boolean)
    .join(' · ')

  return (
    <ExpandableCard
      compact
      title={conditionCardTitle(definition, value)}
      subtitle={sub}
      selected={selected}
      badges={
        <>
          {implied ? <Badge className="!text-[9px]">implícita</Badge> : null}
          {definition.affectsNumbers ? (
            <Badge tone="accent" className="!text-[9px]">
              na ficha
            </Badge>
          ) : null}
          {badges}
        </>
      }
      actions={actions}
      toolbar={toolbar}
      lazyBody={() => (
        <>
          {body ? (
            <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
              {body}
            </RichText>
          ) : (
            <p className="italic text-text-dim">
              Texto ainda não está cadastrado.
            </p>
          )}
          {definition.sourcePage ? (
            <p className="text-[10px] text-text-dim">
              Player Core pg. {definition.sourcePage}
            </p>
          ) : null}
        </>
      )}
    />
  )
}
