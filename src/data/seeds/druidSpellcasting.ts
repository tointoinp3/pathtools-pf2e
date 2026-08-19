import type { SpellcastingDefinition } from '@/types/spell'
import { standardCantrips, standardPreparedSlotTable } from './fullCasterSlots'

export const druidSpellcasting: SpellcastingDefinition = {
  id: 'druid-spellcasting',
  kind: 'class',
  label: 'Conjuração de Druida',
  style: 'prepared',
  tradition: 'primal',
  attributeOptions: ['wisdom'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: standardPreparedSlotTable(),
  cantripsByCharacterLevel: standardCantrips(),
  slotTableCaption:
    'Espaços do livro (conjurador completo preparado). A ordem concede magia de foco — isso fica na aba Foco, não nesta tabela. Truques: 5 em todos os níveis.',
  features: {
    traditionList: true,
    focusPool: true,
  },
  styleHint:
    'Preparado primal: nas preparações diárias você escolhe magias da lista primal (não precisa grimório). Truques à vontade depois de preparados. A ordem concede uma magia de foco — use a aba Foco.',
}
