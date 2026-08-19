import type { ItemDefinition, WornMagicActivation } from '@/types/equipment'
import { polishRulesText } from './featDescriptionsPt'

function polishOpt(value?: string): string | undefined {
  return typeof value === 'string' && value.trim()
    ? polishRulesText(value)
    : value
}

export function polishWornActivation(
  activation: WornMagicActivation,
): WornMagicActivation {
  return {
    ...activation,
    name: polishOpt(activation.name) ?? activation.name,
    timeCost: polishOpt(activation.timeCost),
    frequency: polishOpt(activation.frequency),
    trigger: polishOpt(activation.trigger),
    requirements: polishOpt(activation.requirements),
    effect: polishRulesText(activation.effect),
  }
}

/** Limpa descrição e blocos Ativar oficiais na hora de montar o catálogo. */
export function polishItemDefinition<T extends ItemDefinition>(item: T): T {
  const worn = item.wornMagic
  const talisman = item.talisman
  return {
    ...item,
    description: polishRulesText(item.description),
    wornMagic: worn
      ? {
          ...worn,
          activate: polishOpt(worn.activate),
          frequency: polishOpt(worn.frequency),
          activations: worn.activations?.map(polishWornActivation),
        }
      : worn,
    talisman: talisman
      ? {
          ...talisman,
          activate: polishRulesText(talisman.activate),
          trigger: polishOpt(talisman.trigger),
          requirements: polishOpt(talisman.requirements),
          note: polishRulesText(talisman.note),
        }
      : talisman,
    snare: item.snare
      ? {
          ...item.snare,
          note: polishRulesText(item.snare.note),
          save: polishOpt(item.snare.save),
          craftRequirement: polishOpt(item.snare.craftRequirement),
        }
      : item.snare,
  }
}
