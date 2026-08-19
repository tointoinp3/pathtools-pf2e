import type { ReactNode } from 'react'
import type {
  SpecificFamiliarGrantedAbility,
  SpecificFamiliarSpecialAbility,
} from '@/types/companion'
import { FAMILIAR_ABILITY_KIND_LABELS } from '@/types/companion'
import { FAMILIAR_ABILITIES_BY_ID } from '@/data/seeds/familiarAbilities'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Badge } from '@/components/ui/Badge'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'

export function CompanionRulesCard({
  title,
  subtitle,
  badges,
  description,
  actions,
}: {
  title: string
  subtitle?: string
  badges?: ReactNode
  description: string
  actions?: ReactNode
}) {
  const body = polishRulesText(description.trim())
  return (
    <ExpandableCard
      compact
      title={title}
      subtitle={subtitle}
      badges={badges}
      actions={actions}
    >
      {body ? (
        <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
          {body}
        </RichText>
      ) : (
        <p className="italic text-text-dim">
          Texto ainda não está cadastrado.
        </p>
      )}
    </ExpandableCard>
  )
}

export function SpecificGrantedAbilityCards({
  granted,
}: {
  granted: SpecificFamiliarGrantedAbility[]
}) {
  if (granted.length === 0) return null
  return (
    <ul className="space-y-1">
      {granted.map((entry, index) => {
        const def = entry.abilityId
          ? FAMILIAR_ABILITIES_BY_ID[entry.abilityId]
          : undefined
        const title = def?.name ?? entry.label
        const body = [def?.description, entry.note].filter(Boolean).join('\n\n')
        return (
          <li key={`${entry.abilityId ?? entry.label}-${index}`}>
            <CompanionRulesCard
              title={title}
              subtitle={def?.originalName}
              badges={
                def ? (
                  <Badge className="!text-[9px]">
                    {FAMILIAR_ABILITY_KIND_LABELS[def.kind]}
                  </Badge>
                ) : undefined
              }
              description={
                body || 'Texto desta habilidade ainda não está no catálogo.'
              }
            />
          </li>
        )
      })}
    </ul>
  )
}

export function SpecificSpecialAbilityCards({
  abilities,
}: {
  abilities: SpecificFamiliarSpecialAbility[]
}) {
  if (abilities.length === 0) return null
  return (
    <ul className="space-y-1">
      {abilities.map((ability) => (
        <li key={ability.originalName}>
          <CompanionRulesCard
            title={ability.name}
            subtitle={ability.originalName}
            badges={
              ability.actionType ? (
                <ActionCost type={ability.actionType} />
              ) : undefined
            }
            description={ability.description}
          />
        </li>
      ))}
    </ul>
  )
}
