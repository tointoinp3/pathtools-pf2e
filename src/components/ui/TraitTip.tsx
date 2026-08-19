import type { ReactNode } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import {
  describeTrait,
  traitOriginalLabel,
} from '@/data/i18n/traitGlossaryPt'

function TraitPreview({ trait }: { trait: string }) {
  const label = localizeTraitLabel(trait)
  const original = traitOriginalLabel(trait)
  const description = describeTrait(trait) ?? ''

  return (
    <span className="block space-y-1 whitespace-normal text-left">
      <span className="block font-medium text-text">{label}</span>
      {original ? (
        <span className="block text-[10px] text-text-dim">{original}</span>
      ) : null}
      <span className="block text-text-muted">{description}</span>
    </span>
  )
}

/** Traço com tooltip no mesmo atraso do detalhador de modificadores. */
export function TraitTip({
  trait,
  children,
}: {
  trait: string
  children?: ReactNode
}) {
  const label = localizeTraitLabel(trait)
  const description = describeTrait(trait)
  const trigger = children ?? (
    <span className="underline decoration-dotted decoration-text-dim/70 underline-offset-2 print:no-underline">
      {label}
    </span>
  )

  if (!description) {
    return <span>{children ?? label}</span>
  }

  return (
    <Tooltip
      className="cursor-help"
      tipClassName="max-w-80 whitespace-normal"
      content={<TraitPreview trait={trait} />}
    >
      {trigger}
    </Tooltip>
  )
}

/** Lista de traços de ataque, cada um com tooltip. */
export function TraitTipList({
  traits,
  className = '',
}: {
  traits: string[]
  className?: string
}) {
  if (traits.length === 0) return null
  return (
    <span className={className}>
      {traits.map((trait, index) => (
        <span key={`${trait}-${index}`}>
          {index > 0 ? ', ' : null}
          <TraitTip trait={trait} />
        </span>
      ))}
    </span>
  )
}
