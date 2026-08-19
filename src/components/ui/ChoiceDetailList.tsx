import { Badge } from '@/components/ui/Badge'
import { ActionCost } from '@/components/ui/ActionIcon'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import type { ChoiceDetailOption } from '@/features/characters/choiceDetails'

export function ChoiceDetailList({
  hint,
  options,
  selectedId,
  onSelect,
  selectLabel = 'Escolher',
  selectedLabel = 'Selecionado',
}: {
  hint?: string
  options: ChoiceDetailOption[]
  selectedId?: string
  onSelect: (id: string) => void
  selectLabel?: string
  selectedLabel?: string
}) {
  return (
    <div className="space-y-1.5">
      {hint ? (
        <p className="text-[11px] text-text-dim">{hint}</p>
      ) : null}
      {options.map((opt) => {
        const selected = selectedId === opt.id
        return (
          <ExpandableCard
            key={opt.id}
            compact
            title={opt.name}
            subtitle={opt.subtitle}
            selected={selected}
            defaultOpen={selected}
            badges={
              <>
                <ActionCost type={opt.actionType} />
                {opt.traits?.slice(0, 4).map((trait) => (
                  <Badge key={trait} className="!text-[9px]">
                    {trait}
                  </Badge>
                ))}
                {selected ? (
                  <Badge tone="accent" className="!text-[9px]">
                    Escolhido
                  </Badge>
                ) : null}
              </>
            }
            actions={
              <button
                type="button"
                onClick={() => onSelect(opt.id)}
                className={`rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${
                  selected
                    ? 'border-accent bg-accent/20 text-accent'
                    : 'border-border bg-surface-3 text-text-muted hover:border-accent/50 hover:text-text'
                }`}
              >
                {selected ? selectedLabel : selectLabel}
              </button>
            }
          >
            {opt.description?.trim() ? (
              <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
                {polishRulesText(opt.description)}
              </RichText>
            ) : (
              <p className="text-[11px] text-text-dim">
                Sem texto no catálogo para esta opção.
              </p>
            )}
          </ExpandableCard>
        )
      })}
    </div>
  )
}
