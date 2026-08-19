import type { SpellcastingDefinition } from '@/types/spell'
import {
  standardCantrips,
  standardSpontaneousSlotTable,
} from './fullCasterSlots'

export const oracleSpellcasting: SpellcastingDefinition = {
  id: 'oracle-spellcasting',
  kind: 'class',
  label: 'Conjuração de Oráculo',
  style: 'spontaneous',
  tradition: 'divine',
  attributeOptions: ['charisma'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: standardSpontaneousSlotTable(),
  cantripsByCharacterLevel: standardCantrips(),
  slotTableCaption:
    'Conjurador completo espontâneo divino: 3 espaços no 1º, depois 4. Clareza Oracular (19º) dá o espaço de 10º (regras especiais). Truques: 5 em todos os níveis.',
  features: {
    repertoire: true,
    focusPool: true,
    signatureSpells: true,
  },
  styleHint:
    'Espontâneo divino (Player Core 2): repertório + espaços. Carisma. O mistério coloca magias no repertório e uma magia de revelação (foco). Magias emblemáticas (3º) elevam livremente. Refocus também reduz maldição vinculada em 1 — anote o valor nas notas. Clareza Oracular (19º) dá o espaço de 10º (regras especiais).',
}
