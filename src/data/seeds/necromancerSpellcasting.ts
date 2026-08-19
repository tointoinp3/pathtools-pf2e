import type { SpellcastingDefinition } from '@/types/spell'
import { limitedCasterSlotTable, standardCantrips } from './fullCasterSlots'

/**
 * Necromante — Impossible Magic.
 * Preparado oculto limitado (máx. 2/posto). O “grimório” é o réquiem interno.
 */
export const necromancerSpellcasting: SpellcastingDefinition = {
  id: 'necromancer-spellcasting',
  kind: 'class',
  label: 'Conjuração de Necromante',
  style: 'prepared',
  tradition: 'occult',
  attributeOptions: ['intelligence'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: limitedCasterSlotTable({ tenthRankFromLevel: 19 }),
  cantripsByCharacterLevel: standardCantrips(5),
  slotTableCaption:
    'Preparado oculto limitado: máx. 2 por posto; os baixos permanecem. O grimório da ficha é o réquiem interno. Epitáfio (19º): 1 espaço de 10º com regras especiais. Truques: 5 preparados do dia.',
  features: {
    spellbook: true,
    focusPool: true,
    focusPoolBase: 2,
    limitedSlots: true,
  },
  styleHint:
    'Preparado oculto limitado (Inteligência): máx. 2 espaços por posto; os baixos permanecem. O grimório da ficha é o réquiem interno (dirge): 8 truques ocultos + harm + 4 magias de 1º; +2 magias por nível. Prepare 5 truques + os espaços do dia. Magias de túmulo = foco (aba Foco): Bomba Necrótica + a do fascínio (reserva 2). Truques de túmulo (Criar Servo, Investida de Servo) são extra, sem PF. 10º no 19º é o Epitáfio (1 espaço, regras especiais).',
}
