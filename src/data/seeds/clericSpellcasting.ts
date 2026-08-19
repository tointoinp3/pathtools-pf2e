import type { SpellcastingDefinition } from '@/types/spell'
import { standardCantrips, standardPreparedSlotTable } from './fullCasterSlots'

export const clericSpellcasting: SpellcastingDefinition = {
  id: 'cleric-spellcasting',
  kind: 'class',
  label: 'Conjuração de Clérigo',
  style: 'prepared',
  tradition: 'divine',
  attributeOptions: ['wisdom'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: standardPreparedSlotTable(),
  cantripsByCharacterLevel: standardCantrips(),
  slotTableCaption:
    'Espaços do livro. Fonte Divina concede espaços extras no posto mais alto só para Curar ou Ferir (quantidade = modificador de Carisma, mínimo 1) — não está nesta tabela. Truques: 5 em todos os níveis.',
  features: {
    traditionList: true,
    focusPool: true,
  },
  styleHint:
    'Preparado divino: nas preparações diárias você escolhe magias da lista divina (não precisa grimório). Truques à vontade depois de preparados. Fonte Divina: espaços extras no posto mais alto só para Curar ou Ferir, conforme a divindade. Foco vem de domínio / doutrina.',
}
