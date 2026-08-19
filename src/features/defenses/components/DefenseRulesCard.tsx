import type { ReactNode } from 'react'
import type { DefenseCardModel, DefenseKind } from '@/data/seeds/defenses'
import { composeDefenseCard } from '@/data/seeds/defenses'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { Badge } from '@/components/ui/Badge'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'

const KIND_TONE: Record<DefenseKind, 'info' | 'success' | undefined> = {
  immunity: 'info',
  resistance: 'success',
  weakness: undefined,
}

export function DefenseRulesCard({
  model,
  kind,
  type,
  value,
  label,
  sourceLabel,
  badges,
  actions,
  selected,
}: {
  model?: DefenseCardModel
  kind?: DefenseKind
  type?: string
  value?: number
  label?: string
  sourceLabel?: string
  badges?: ReactNode
  actions?: ReactNode
  selected?: boolean
}) {
  const card =
    model ??
    (kind && type
      ? composeDefenseCard({ kind, type, value, label, sourceLabel })
      : null)
  if (!card) return null
  const body = polishRulesText(card.description.trim())

  return (
    <ExpandableCard
      compact
      title={card.title}
      subtitle={card.subtitle ? `${card.subtitle} · ${card.summary}` : card.summary}
      selected={selected}
      badges={
        <>
          <Badge
            tone={KIND_TONE[card.kind]}
            className={
              card.kind === 'weakness'
                ? '!text-[9px] border-danger/40 bg-danger/10 text-danger'
                : '!text-[9px]'
            }
          >
            {card.kind === 'immunity'
              ? 'imunidade'
              : card.kind === 'resistance'
                ? 'resistência'
                : 'fraqueza'}
          </Badge>
          {badges}
        </>
      }
      actions={actions}
      lazyBody={() => (
        <>
          <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
            {polishRulesText(card.summary)}
          </RichText>
          {body ? (
            <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
              {body}
            </RichText>
          ) : null}
          <p className="text-[10px] text-text-dim">
            Player Core pg. {card.sourcePage}
          </p>
        </>
      )}
    />
  )
}
