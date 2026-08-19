import type { Creature } from '@/types/creature'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'

/**
 * Sidebars do Monster Core (Olhos dos Mortos, tesouros, variantes…).
 * Ficam no fim da ficha, abertas por padrão, com opção de recolher.
 */
export function CreatureLoreSections({ creature }: { creature: Creature }) {
  const sections = creature.loreSections ?? []
  if (sections.length === 0) return null

  return (
    <div className="space-y-1.5 border-t border-border/60 pt-3">
      {sections.map((section) => (
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
          <RichText as="p" className="whitespace-pre-line text-[13px] leading-relaxed">
            {section.body}
          </RichText>
        </ExpandableCard>
      ))}
    </div>
  )
}
