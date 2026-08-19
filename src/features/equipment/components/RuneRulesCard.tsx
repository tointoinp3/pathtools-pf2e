import type { ReactNode } from 'react'
import type { ItemDefinition } from '@/types'
import { formatRuneSummary } from '@/engine/equipment'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { RarityBadge } from '@/components/ui/Badge'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'

export function RuneRulesCard({
  definition,
  dormant,
  temporary,
  actions,
}: {
  definition: ItemDefinition
  dormant?: boolean
  temporary?: boolean
  actions?: ReactNode
}) {
  const flags = [
    dormant ? 'Dormente — potência insuficiente' : null,
    temporary ? 'Temporária' : null,
  ].filter(Boolean)
  const summary = formatRuneSummary(definition)
  const subtitle = [...flags, summary].filter(Boolean).join(' · ')
  const body = definition.description?.trim()

  return (
    <ExpandableCard
      compact
      title={definition.name}
      subtitle={subtitle || undefined}
      badges={
        definition.rarity !== 'common' ? (
          <RarityBadge rarity={definition.rarity} />
        ) : undefined
      }
      actions={actions}
    >
      {body ? (
        <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
          {polishRulesText(body)}
        </RichText>
      ) : (
        <p className="italic text-text-dim">
          Texto desta runa ainda não está cadastrado.
        </p>
      )}
    </ExpandableCard>
  )
}
