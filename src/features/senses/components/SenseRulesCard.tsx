import type { ReactNode } from 'react'
import type { SenseAcuity, SenseCardModel } from '@/data/seeds/senses'
import { composeSenseCard, parseSenseLabel } from '@/data/seeds/senses'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { Badge } from '@/components/ui/Badge'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'

const ACUITY_CLASS: Record<SenseAcuity, string> = {
  precise: '!text-[9px]',
  imprecise: '!text-[9px]',
  vague: '!text-[9px] text-text-dim',
}

export function SenseRulesCard({
  model,
  kind,
  name,
  rangeFeet,
  rangeLabel,
  precise,
  acuity,
  description,
  sourceLabel,
  badges,
}: {
  model?: SenseCardModel
  kind?: string
  name?: string
  rangeFeet?: number
  rangeLabel?: string
  precise?: boolean
  acuity?: SenseAcuity
  description?: string
  sourceLabel?: string
  badges?: ReactNode
}) {
  const card =
    model ??
    composeSenseCard({
      kind,
      name,
      rangeFeet,
      rangeLabel,
      precise,
      acuity,
      description,
      sourceLabel,
    })
  const body = polishRulesText(card.description.trim())

  return (
    <ExpandableCard
      compact
      title={card.title}
      subtitle={
        card.subtitle ? `${card.subtitle} · ${card.summary}` : card.summary
      }
      badges={
        <>
          <Badge className={ACUITY_CLASS[card.acuity]}>{card.acuity === 'precise' ? 'preciso' : card.acuity === 'imprecise' ? 'impreciso' : 'vago'}</Badge>
          {badges}
        </>
      }
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

export function SenseLabelList({ labels }: { labels: string[] }) {
  if (labels.length === 0) return null
  return (
    <ul className="space-y-1">
      {labels.map((label) => {
        const parsed = parseSenseLabel(label)
        return (
          <li key={label}>
            <SenseRulesCard
              name={parsed.name}
              kind={parsed.subject?.id}
              rangeLabel={parsed.rangeLabel}
              acuity={parsed.acuity}
            />
          </li>
        )
      })}
    </ul>
  )
}
