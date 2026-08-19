import type { Ritual } from '@/types/ritual'
import { SOURCE_SEVERED_AT_THE_ROOT_ID } from './sources'

/** Ritual único da trama de Pathfinder #202 (Idyllis / linhas ley). */
export const severedAtTheRootRituals: Ritual[] = [
  {
    id: 'ritual-drain-planar-connection',
    name: 'Drenar Conexão Planar',
    originalName: 'Drain Planar Connection',
    rank: 5,
    traits: ['Unique'],
    rarity: 'unique',
    provenance: { type: 'official' },
    summary:
      'Puxa a energia planar de Idyllis pelas linhas ley para seis esferas. 1 dia; Natureza (mestre) CD 31; 5 secundários.',
    description: "Você atrai a energia planar de Idyllis, através das linhas ley, e para as seis esferas de treliça.\n\n**Sucesso crítico** Você corta permanentemente a conexão de Idyllis com o Plano da Madeira.\n\n**Sucesso** Você corta a conexão de Idyllis com o Plano da Madeira por 10 anos.\n\n**Falha** Você corta a conexão de Idyllis com o Plano da Madeira por 1 ano, mas o tiro sai pela culatra, causando 4d12+26 dano de força a todos os conjuradores secundários (CD 26 salvaguarda básica de Reflexos) – esse dano mata Madge.\n\n**Falha crítica** O tiro sai pela culatra como um fracasso, mas não corta a conexão de Idyllis.",
    castTime: '1 dia',
    cost: 'seis conjuntos de ervas raras, 50 po cada',
    primaryCheck: 'Natureza (mestre) CD 31',
    primaryCheckSkills: ['nature'],
    secondaryCasters: "5",
    secondaryChecks: 'Diplomacia, Natureza ou Ocultismo CD 26',
    secondaryCheckSkills: ['diplomacy', 'nature', 'occultism'],
    source: 'Pathfinder #202: Severed at the Root pg. 60',
    sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
    aonUrl: 'https://2e.aonprd.com/Rituals.aspx?ID=205',
  },
]
