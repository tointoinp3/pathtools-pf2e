import type { SpellcastingDefinition } from '@/types/spell'
import { limitedCasterSlotTable, standardCantrips } from './fullCasterSlots'

/**
 * Magus Remaster (Impossible Magic / AoN Classes ID 74).
 * Preparado limitado: máx. 2 espaços por posto; os baixos permanecem.
 * Não é a “onda” do Magus legado (Secrets of Magic).
 */
export const magusSpellcasting: SpellcastingDefinition = {
  id: 'magus-spellcasting',
  kind: 'class',
  label: 'Conjuração de Magus',
  style: 'prepared',
  tradition: 'arcane',
  attributeOptions: ['intelligence'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: limitedCasterSlotTable(),
  cantripsByCharacterLevel: standardCantrips(5),
  slotTableCaption:
    'Preparado limitado (Impossible Magic): no máximo 2 espaços por posto; os baixos permanecem. Sem espaço de 10º. Truques: 5 em todos os níveis.',
  features: {
    spellbook: true,
    focusPool: true,
    limitedSlots: true,
  },
  styleHint:
    'Preparado limitado (Impossible Magic): no máximo 2 espaços por posto; os baixos não somem ao subir de nível. Prepare do grimório. Ataque e CD usam Inteligência (não o atributo-chave marcial). Magias de confluxo usam Pontos de Foco. Spellstrike entra em versão futura.',
}
