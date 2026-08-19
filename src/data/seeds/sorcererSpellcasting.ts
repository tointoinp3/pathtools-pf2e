import type { SpellcastingDefinition } from '@/types/spell'
import {
  standardCantrips,
  standardSpontaneousSlotTable,
} from './fullCasterSlots'

/** Feiticeiro — Player Core 2 / AoN Classes ID 62. */
export const sorcererSpellcasting: SpellcastingDefinition = {
  id: 'sorcerer-spellcasting',
  kind: 'class',
  label: 'Conjuração de Feiticeiro',
  style: 'spontaneous',
  tradition: 'occult',
  attributeOptions: ['charisma'],
  proficiencyRank: 'trained',
  slotsByCharacterLevel: standardSpontaneousSlotTable(),
  cantripsByCharacterLevel: standardCantrips(5),
  slotTableCaption:
    'Conjurador completo espontâneo: 3 espaços no 1º, depois 4. A linhagem define a tradição. Truques: 5 em todos os níveis.',
  features: {
    repertoire: true,
    focusPool: true,
    signatureSpells: true,
  },
  styleHint:
    'Espontâneo (Player Core 2): repertório + espaços. A linhagem define a tradição (arcana, divina, oculta ou primal) — a aba segue a linhagem escolhida. Linhagem dracônica usa a perícia da tradição do exemplar. Truques à vontade. Magias emblemáticas (signature) permitem elevar livremente. Potência Feiticeira soma o posto da magia ao dano/cura inicial de magias de espaço.',
}
