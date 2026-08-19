import type { SpellcastingDefinition } from '@/types/spell'
import { standardCantrips, standardPreparedSlotTable } from './fullCasterSlots'

/**
 * Bardo — Player Core / AoN Classes ID 32.
 * Espontâneo oculto, mas a tabela de espaços é a de conjurador completo
 * preparado (2 no 1º, depois 3) — não a do feiticeiro.
 */
export const bardSpellcasting: SpellcastingDefinition = {
  id: 'bard-spellcasting',
  kind: 'class',
  label: 'Conjuração de Bardo',
  style: 'spontaneous',
  tradition: 'occult',
  attributeOptions: ['charisma'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: standardPreparedSlotTable(),
  cantripsByCharacterLevel: standardCantrips(5),
  slotTableCaption:
    'Espontâneo, mas a quantidade de espaços é a de conjurador completo preparado (2 no 1º, depois 3) — não a do feiticeiro (3 no 1º, depois 4). Composições usam Pontos de Foco. Truques: 5 em todos os níveis.',
  features: {
    repertoire: true,
    focusPool: true,
    signatureSpells: true,
  },
  styleHint:
    'Espontâneo (Player Core): você conhece magias no repertório e gasta espaços ao conjurar, escolhendo a magia na hora. Truques à vontade. Composições usam Pontos de Foco. Magias emblemáticas (3º): 1 por posto — eleva livremente.',
}
