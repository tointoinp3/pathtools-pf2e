import type { SpellcastingDefinition } from '@/types/spell'

export const monkSpellcasting: SpellcastingDefinition = {
  id: 'monk-spellcasting',
  kind: 'class',
  label: 'Magias de Qi',
  style: 'focusOnly',
  tradition: 'occult',
  attributeOptions: ['wisdom'],
  proficiencyRank: 'trained',
  features: {
    focusPool: true,
  },
  styleHint:
    'Só foco: o monge não tem espaços de magia. Magias de Qi vêm de feitos (ex.: Magias de Qi). Ao ganhar a primeira, escolha tradição divina ou oculta nesta aba. Atributo: Sabedoria. Recarrega nas preparações ou com 10 min de Refocar (mente e respiração).',
}
