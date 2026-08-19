import type { Deity } from '@/types/deity'
import { SOURCE_SHEPHERD_OF_DECAY_ID } from './sources'

/**
 * Divindades extras de Pathfinder #203 Shepherd of Decay.
 * Não editar `deities.ts` (gerado). Sem legado.
 */
export const shepherdOfDecayDeities: Deity[] = [
  {
    id: 'deity-zibik',
    name: 'Zibik',
    originalName: 'Zibik',
    epithet: 'Pastor da Decomposição e dos Recomeços',
    kind: 'deity',
    category: 'Green Man Faiths',
    rarity: 'common',
    provenance: { type: 'official' },
    summary: 'Homem-verde de decomposição, recomeços e fungos.',
    areasOfConcern: ['decomposição', 'recomeços', 'fungos'],
    edicts: [
      'Fomentar ciclos naturais de decomposição e recrescimento',
      'Erradicar criaturas invasoras',
      'Tratar doenças não naturais',
    ],
    anathema: [
      'Ignorar maus-tratos ao ambiente',
      'Atrasar a morte natural',
      'Desequilibrar um ecossistema',
    ],
    attributes: ['constitution', 'wisdom'],
    skillId: 'medicine',
    favoredWeapons: ['Scythe'],
    font: ['harm', 'heal'],
    sanctification: [],
    sanctificationRequired: false,
    domains: ['Decay', 'Healing', 'Nature', 'Protection'],
    primaryDomains: ['Decay', 'Healing', 'Nature', 'Protection'],
    alternateDomains: [],
    clericSpells: ['Flourishing Flora', 'Life-Draining Roots', 'Tangling Creepers'],
    pantheons: [],
    source: 'Pathfinder #203 Shepherd of Decay',
    sourceId: SOURCE_SHEPHERD_OF_DECAY_ID,
    aonUrl: 'https://2e.aonprd.com/Deities.aspx?ID=685',
  },
]
