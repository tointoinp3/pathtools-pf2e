import type { SpellcastingDefinition } from '@/types/spell'
import { limitedCasterSlotTable } from './fullCasterSlots'

/**
 * Psíquico Remaster (Dark Archives Remastered / AoN Classes ID 68).
 * Espontâneo limitado oculto. 3 truques à escolha; a mente consciente dá +3 psi.
 * Reserva inicial 2 PF. 19º: 1 espaço de 10º (Mente Infinita).
 */
export const psychicSpellcasting: SpellcastingDefinition = {
  id: 'psychic-spellcasting',
  kind: 'class',
  label: 'Conjuração de Psíquico',
  style: 'spontaneous',
  tradition: 'occult',
  attributeOptions: ['intelligence', 'charisma'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: limitedCasterSlotTable({ tenthRankFromLevel: 19 }),
  cantripsByCharacterLevel: Array.from({ length: 20 }, () => 3),
  slotTableCaption:
    'Espontâneo limitado oculto: máx. 2 por posto; os baixos permanecem. 3 truques à escolha (a mente consciente dá +3 psi à parte). Mente Infinita (19º): 1 espaço de 10º com regras especiais.',
  features: {
    repertoire: true,
    focusPool: true,
    focusPoolBase: 2,
    limitedSlots: true,
    signatureSpells: true,
  },
  styleHint:
    'Espontâneo limitado oculto (Dark Archives Remastered): repertório + poucos espaços (máx. 2 por posto). Os baixos não somem. INT ou CAR conforme a mente subconsciente. 3 truques à escolha + 3 truques psi da mente consciente (amps gastam PF, não são magias de foco). Reserva inicial 2 PF; Clareza de Foco (5º) sobe para 3. Sem incantação — só o pensamento. Magias emblemáticas no 3º. Mente Infinita (19º): 1 espaço de 10º com regras especiais.',
}
