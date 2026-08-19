import type { ReactNode } from 'react'
import type { Spell } from '@/types'
import { spellViewForRules } from '@/engine/deity'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { ActionCost } from '@/components/ui/ActionIcon'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'

const SKIP_LABEL = /^ver descrição\.?$/i

export function SpellRulesCard({
  spell,
  originalName,
  title,
  subtitle,
  actions,
  toolbar,
  compact = true,
}: {
  spell?: Spell | null
  originalName?: string
  title?: string
  subtitle?: string
  actions?: ReactNode
  toolbar?: ReactNode
  compact?: boolean
}) {
  const lookupName = spell?.originalName ?? originalName?.trim() ?? ''
  if (lookupName && SKIP_LABEL.test(lookupName)) return null
  if (!lookupName && !title) return null

  const view = lookupName ? spellViewForRules(lookupName) : null
  const heading = title ?? view?.name ?? lookupName
  const meta = [subtitle, view?.meta].filter(Boolean).join(' · ')
  const body = polishRulesText(view?.body ?? '')

  return (
    <ExpandableCard
      compact={compact}
      title={heading}
      subtitle={meta || undefined}
      badges={
        view?.actionType ? <ActionCost type={view.actionType} /> : undefined
      }
      actions={actions}
      toolbar={toolbar}
    >
      {body ? (
        <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
          {body}
        </RichText>
      ) : (
        <p className="italic text-text-dim">
          Texto desta magia ainda não está no catálogo.
        </p>
      )}
    </ExpandableCard>
  )
}
