import type { ItemDefinition, WornMagicActivation } from '@/types/equipment'
import { ActionCost } from '@/components/ui/ActionIcon'
import { RichText } from '@/components/ui/RichText'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'

function traitLabel(trait: string): string {
  const titled = trait.slice(0, 1).toUpperCase() + trait.slice(1)
  return localizeTraitLabel(titled)
}

function polish(value?: string): string | undefined {
  return typeof value === 'string' && value.trim()
    ? polishRulesText(value)
    : value
}

/** Bloco Ativar no estilo AoN, com ícone de custo de ação. */
export function ItemActivationBlocks({
  activations,
}: {
  activations: WornMagicActivation[]
}) {
  if (!activations.length) return null
  return (
    <div className="space-y-3">
      {activations.map((activation, index) => (
        <div
          key={`${activation.name}-${index}`}
          className="space-y-0.5 text-sm leading-relaxed text-text-muted"
        >
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-text">
            <strong className="font-semibold">
              Ativar{activation.name ? `—${activation.name}` : ''}
            </strong>
            {activation.actionType ? (
              <ActionCost type={activation.actionType} />
            ) : null}
            {activation.timeCost ? (
              <span className="text-text-dim">{activation.timeCost}</span>
            ) : null}
            {activation.traits && activation.traits.length > 0 ? (
              <span className="text-text-dim">
                ({activation.traits.map(traitLabel).join(', ')})
              </span>
            ) : null}
          </p>
          {polish(activation.frequency) ? (
            <p>
              <strong className="text-text">Frequência</strong>{' '}
              {polish(activation.frequency)}
            </p>
          ) : null}
          {polish(activation.trigger) ? (
            <p>
              <strong className="text-text">Gatilho</strong>{' '}
              <RichText>{polish(activation.trigger)!}</RichText>
            </p>
          ) : null}
          {polish(activation.requirements) ? (
            <p>
              <strong className="text-text">Requisitos</strong>{' '}
              <RichText>{polish(activation.requirements)!}</RichText>
            </p>
          ) : null}
          {polish(activation.effect) ? (
            <p>
              <strong className="text-text">Efeito</strong>{' '}
              <RichText>{polish(activation.effect)!}</RichText>
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export function ItemDetailRules({ item }: { item: ItemDefinition }) {
  const activations = item.wornMagic?.activations
  const hasStructured = Boolean(activations?.length)
  const flavor = hasStructured
    ? item.description.replace(/\n*\*\*Ativar[\s\S]*/u, '').trim()
    : item.description
  const paragraphs = flavor.split(/\n\n+/).filter(Boolean)
  return (
    <div className="space-y-3 text-text-muted">
      {paragraphs.map((paragraph, index) => (
        <RichText key={index} as="p" className="leading-relaxed">
          {polishRulesText(paragraph)}
        </RichText>
      ))}
      {hasStructured ? (
        <ItemActivationBlocks activations={activations!} />
      ) : item.wornMagic?.activate ? (
        <div className="space-y-0.5">
          <p>
            <strong className="text-text">Ativar</strong>{' '}
            <RichText>{polish(item.wornMagic.activate)}</RichText>
          </p>
          {item.wornMagic.frequency ? (
            <p>
              <strong className="text-text">Frequência</strong>{' '}
              {polish(item.wornMagic.frequency)}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
