import type { Creature, CreatureFamily } from '@/types/creature'
import { listFamiliesForCreature } from '@/engine/bestiaryCatalog'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { formatSourceLabel } from '@/utils/labels'

function FamilyBlock({ family }: { family: CreatureFamily }) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-accent/90">
          {family.name}
        </h3>
        <span className="text-[11px] text-text-dim">
          {formatSourceLabel(family.source, family.sourcePage)}
        </span>
      </div>
      <RichText
        as="p"
        className="whitespace-pre-line text-[13px] leading-relaxed text-text-muted"
      >
        {family.intro}
      </RichText>
      <div className="space-y-1.5">
        {family.sections.map((section) => (
          <ExpandableCard
            key={section.id}
            title={
              <span className="font-display text-[12px] font-semibold uppercase tracking-[0.12em] text-accent/90">
                {section.title}
              </span>
            }
            compact
            defaultOpen
          >
            <RichText as="p" className="whitespace-pre-line">
              {section.body}
            </RichText>
          </ExpandableCard>
        ))}
      </div>
    </div>
  )
}

export function CreatureFamilyLore({ creature }: { creature: Creature }) {
  const families = listFamiliesForCreature(creature)
  if (families.length === 0) return null

  return (
    <div className="space-y-4 border-t border-border/60 pt-3">
      {families.map((family) => (
        <FamilyBlock key={family.id} family={family} />
      ))}
    </div>
  )
}
