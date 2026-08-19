import type { SpellcastingDefinition } from '@/types/spell'

export const championSpellcasting: SpellcastingDefinition = {
  id: 'champion-spellcasting',
  kind: 'class',
  label: 'Magias de Devoção',
  style: 'focusOnly',
  tradition: 'divine',
  attributeOptions: ['charisma'],
  proficiencyRank: 'trained',
  features: {
    focusPool: true,
  },
  styleHint:
    'Só foco (Player Core 2): sem espaços de magia. Magias de devoção usam Carisma e Pontos de Foco. No 1º escolha Escudos do Espírito ou a magia da fonte divina (Imposição das Mãos / Toque do Vazio). Recarrega nas preparações ou com 10 min de Refocar.',
}
