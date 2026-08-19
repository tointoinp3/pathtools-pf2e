import type { SpellcastingDefinition } from '@/types/spell'
import { standardCantrips, standardPreparedSlotTable } from './fullCasterSlots'

export const witchSpellcasting: SpellcastingDefinition = {
  id: 'witch-spellcasting',
  kind: 'class',
  label: 'Conjuração de Bruxa',
  style: 'prepared',
  tradition: 'occult',
  attributeOptions: ['intelligence'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: standardPreparedSlotTable(),
  cantripsByCharacterLevel: standardCantrips(),
  slotTableCaption:
    'Espaços do livro (conjurador completo preparado). O familiar guarda as magias no lugar do grimório. A tradição vem do patrono. Truques: 5 em todos os níveis.',
  features: {
    spellbook: true,
    familiar: true,
    focusPool: true,
  },
  styleHint:
    'Preparado: o familiar guarda as magias (como um grimório). Nas preparações diárias você escolhe o que o familiar conhece. A tradição vem do patrono. Hexes usam Pontos de Foco (aba Foco) — só 1 hex por turno.',
}
