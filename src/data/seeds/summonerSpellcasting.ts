import type { SpellcastingDefinition } from '@/types/spell'
import { limitedCasterSlotTable, standardCantrips } from './fullCasterSlots'

/**
 * Invocador Remaster (Impossible Magic / AoN Classes ID 77).
 * Espontâneo limitado: máx. 2 por posto; os baixos permanecem.
 */
export const summonerSpellcasting: SpellcastingDefinition = {
  id: 'summoner-spellcasting',
  kind: 'class',
  label: 'Conjuração de Invocador',
  style: 'spontaneous',
  tradition: 'occult',
  attributeOptions: ['charisma'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: limitedCasterSlotTable(),
  cantripsByCharacterLevel: standardCantrips(5),
  slotTableCaption:
    'Espontâneo limitado: no máximo 2 espaços por posto; os baixos permanecem. Sem espaço de 10º. A tradição vem do eidolon. Truques: 5 em todos os níveis.',
  features: {
    repertoire: true,
    focusPool: true,
    limitedSlots: true,
    signatureSpells: true,
  },
  styleHint:
    'Espontâneo limitado (Impossible Magic): repertório + poucos espaços (máx. 2 por posto). Os baixos não somem. A tradição vem do eidolon. Carisma. Magias de vínculo (foco): comece com Surto de Evolução. Magias emblemáticas no 3º.',
}
