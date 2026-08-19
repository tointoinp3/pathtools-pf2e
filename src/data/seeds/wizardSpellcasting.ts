import type { SpellcastingDefinition } from '@/types/spell'
import { standardCantrips, standardPreparedSlotTable } from './fullCasterSlots'

/** Mago — Player Core / AoN Classes ID 39. 5 truques em todos os níveis. */
export const wizardSpellcasting: SpellcastingDefinition = {
  id: 'wizard-spellcasting',
  kind: 'class',
  label: 'Conjuração de Mago',
  style: 'prepared',
  tradition: 'arcane',
  attributeOptions: ['intelligence'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: standardPreparedSlotTable(),
  cantripsByCharacterLevel: standardCantrips(5),
  slotTableCaption:
    'Espaços do livro. Escola Remaster (exceto Teoria Mágica Unificada) dá +1 espaço extra por posto só para magias do currículo — isso não entra nesta tabela. Truques: 5 em todos os níveis.',
  features: {
    spellbook: true,
    focusPool: true,
    bondedItem: true,
    curriculumBonusSlot: true,
  },
  styleHint:
    'Preparado (Player Core): nas preparações diárias você escolhe magias do grimório para preencher os espaços. Cada magia gasta o espaço ao ser conjurada (exceto truques, ilimitados). Escola Remaster dá +1 espaço por posto para o currículo, salvo Teoria Mágica Unificada. Vínculo Arcano pode reerguer uma magia preparada 1×/dia. Foco é separado dos espaços.',
}
