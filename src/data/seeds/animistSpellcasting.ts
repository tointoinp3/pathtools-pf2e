import type { SpellcastingDefinition } from '@/types/spell'
import { animistSlotTable } from './fullCasterSlots'

const ANIMIST = animistSlotTable()

/**
 * Animista — War of Immortals.
 * Dois motores (não misturar espaços): preparado da lista divina + espontâneo
 * das aparições. A ficha soma os dois; a tabela mostra “A+S” como no livro.
 */
export const animistSpellcasting: SpellcastingDefinition = {
  id: 'animist-spellcasting',
  kind: 'class',
  label: 'Conjuração de Animista',
  style: 'prepared',
  tradition: 'divine',
  attributeOptions: ['wisdom'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: ANIMIST.slots,
  cantripsByCharacterLevel: ANIMIST.cantrips,
  slotLabelsByCharacterLevel: ANIMIST.labels,
  cantripLabelsByCharacterLevel: ANIMIST.cantripLabels,
  slotTableCaption:
    'O número antes do + é preparado da lista divina; o depois é espontâneo das aparições sintonizadas (todas emblemáticas). Ex.: 2+1 no 2º = dois preparados de 1º e um espaço de aparição. O 10º (0+1*) vem de Aparição Suprema e funciona diferente. Cajado/item: você conta como conjurador preparado.',
  features: {
    traditionList: true,
    repertoire: true,
    focusPool: true,
    focusPoolBase: 1,
  },
  styleHint:
    'Dois motores divinos (Sabedoria), espaços separados no livro: o número antes do + é preparado da lista divina; o depois é espontâneo do repertório das aparições sintonizadas (todas signature). A aba soma os dois para marcar. Magia de vaso = foco da aparição primária (aba Foco). 10º (19º) é só de aparição (avatar da primária). Cajado/item: você conta como conjurador preparado.',
}
