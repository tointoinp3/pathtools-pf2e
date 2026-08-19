import type { Ritual } from '@/types/ritual'
import {
  SOURCE_DESTROYERS_DOOM_ID,
  SOURCE_PACTBREAKER_ID,
  SOURCE_RIVAL_ACADEMIES_ID,
  SOURCE_SKINSAW_ID,
  SOURCE_VOICE_BLIGHT_ID,
} from './sources'

/**
 * Rituais Remaster que o gerador (livros-base) ainda não puxava:
 * Pactbreaker, Skinsaw, Destroyer's Doom, Voice in the Blight, Rival Academies.
 */
export const apRemainderRituals: Ritual[] = [
  {
    id: 'ritual-commune-with-corazal',
    name: 'Comungar com Corazal',
    originalName: 'Commune With Corazal',
    rank: 4,
    traits: ['Unique'],
    rarity: 'unique',
    provenance: { type: 'official' },
    summary:
      'Toca os sentidos de Corazal para achar um estopim na Floresta Verduran. 4 h; Natureza CD 24 (mestre) ou 29 (perito); 3 secundários.',
    description:
      'Você acessa os inúmeros sentidos de Corazal para identificar distúrbios na Floresta Verduran.\n\n**Sucesso crítico** Você e Corazal identificam um estopim: evento iminente que pode inflamar desconfiança. Premonição sensorial do evento; pode conjurar _conhecer o caminho_ como truque de 7º posto rumo ao local; sabe qual Carvalho Ancião está mais perto.\n\n**Sucesso** Como o crítico, mas drena o corpo e a mente: drenado 1 e, enquanto durar, também estupefato 1.\n\n**Falha** Sem efeito.\n\n**Falha crítica** Sem efeito além de sobrecarregar a mente. Drenado 2; enquanto durar, também estupefato 1 e o feito Conhecimento Duvidoso. Sempre que o drenado deveria cair, não cai a menos que passe num teste plano CD 11.',
    castTime: '4 horas',
    primaryCheck: 'Natureza CD 24 (mestre) ou CD 29 (perito)',
    primaryCheckSkills: ['nature'],
    secondaryCasters: '3',
    secondaryChecks: 'Conhecimento de Floresta, Percepção ou Sobrevivência CD 24',
    secondaryCheckSkills: ['survival'],
    source: 'Pathfinder #201: Pactbreaker pg. 33',
    sourceId: SOURCE_PACTBREAKER_ID,
    aonUrl: 'https://2e.aonprd.com/Rituals.aspx?ID=204',
  },
  {
    id: 'ritual-song-of-silver',
    name: 'Canção de Prata',
    originalName: 'Song of Silver',
    rank: 6,
    traits: ['Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    summary:
      'Performance de 8 h num palco de Kintargo. Contrapõe teleporte profano e trata armas como prata. Altura 10º: todo Ravounel.',
    description:
      'A maior parte do tempo é preparação no palco em Kintargo; o canto em si ocupa o último minuto. Até 6 secundários ajudam a decorar (Ofício) ou a reunir plateia (Sociedade).\n\n**Sucesso crítico** O palco e o telhado brilham prata por 1 semana. O ritual tenta contrapor teleporte e viagem planar de criaturas profanas para dentro ou fora de Kintargo; armas empunhadas em Kintargo contam como prata contra fraqueza a prata. Também gera os efeitos de Sucesso. Não pode ser tentado de novo por 1 mês.\n\n**Sucesso** Por 1 semana, conjuradores primário e secundários +2 status em salvaguardas contra mental (+4 contra medo) e cada um conjura _sopro de vida_ inato oculto 1 vez no posto do ritual, só dentro de Kintargo. Não pode ser tentado de novo por 1 mês.\n\n**Falha** Falha; não pode ser tentado de novo por 1 mês.\n\n**Falha crítica** Falha; o primário fica estupefato 2 por 1 semana (não removível). Não pode ser tentado de novo por 6 meses.\n\n**Altura (10º)** Os efeitos cobrem todo Ravounel.',
    castTime: '8 horas',
    primaryCheck: 'Atuação',
    primaryCheckSkills: ['performance'],
    secondaryCasters: 'até 6',
    secondaryChecks: 'Ofício, Sociedade',
    secondaryCheckSkills: ['crafting', 'society'],
    duration: '1 semana',
    range: 'Kintargo',
    source: 'Pathfinder #205: Singer, Stalker, Skinsaw Man pg. 84',
    sourceId: SOURCE_SKINSAW_ID,
    aonUrl: 'https://2e.aonprd.com/Rituals.aspx?ID=202',
  },
  {
    id: 'ritual-entreat-thunderbird',
    name: 'Suplicar à Ave-Trovão',
    originalName: 'Entreat Thunderbird',
    rank: 5,
    traits: ['Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    summary:
      'Convence a ave-trovão das Montanhas da Presa a ajudar. 1 h; Natureza ou Religião CD 29; 3 secundários.',
    description:
      'Você pede à ave-trovão das Montanhas da Presa que venha em auxílio. Secundários podem apelar ao orgulho ou à natureza tempestuosa dela para +2 circunstância nos testes.\n\n**Sucesso crítico** A ave-trovão fica prestativa pelos casters durante a duração.\n\n**Sucesso** Fica amistosa.\n\n**Falha** Ignora o pedido e permanece indiferente.\n\n**Falha crítica** Ofende-se e parte da área em definitivo.',
    castTime: '1 hora',
    cost: 'incenso raro e oferendas no valor de 300 PO',
    primaryCheck: 'Natureza ou Religião CD 29',
    primaryCheckSkills: ['nature', 'religion'],
    secondaryCasters: '3',
    secondaryChecks: 'Diplomacia, Conhecimento de Montanha, Natureza ou Sobrevivência',
    secondaryCheckSkills: ['diplomacy', 'nature', 'survival'],
    duration: '1 mês',
    source: "Pathfinder #209: Destroyer's Doom pg. 40",
    sourceId: SOURCE_DESTROYERS_DOOM_ID,
    aonUrl: 'https://2e.aonprd.com/Rituals.aspx?ID=206',
  },
  {
    id: 'ritual-purify-tanglebriar',
    name: 'Purificar Tanglebriar',
    originalName: 'Purify Tanglebriar',
    rank: 9,
    traits: ['Consecration', 'Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    summary:
      'Purifica 1,6 km de Tanglebriar. Natureza ou Religião CD 41 (43 se Treerazer estiver na área).',
    description:
      'Chama a presença primal da Floresta Fierani e o legado élfico de Kyonin para purificar um trecho de Tanglebriar (não o próprio Treerazer). Primário CD 41; secundários CD 36. Se Treerazer estiver na área, CDs 43/38. Se o primário vestir a Coroa Viridiana, todas as CDs −5.\n\n**Sucesso crítico** Por 1 mês a praga recua: terreno maior difícil vira difícil, difícil vira normal, perigoso deixa de ser. CDs de Orientar-se, Subsistir e resistir a aflições ambientais −4. Aliados de Treerazer −2 status na iniciativa. Se Treerazer estiver na área: +2 Pontos de Tormento e +2 de Triunfo.\n\n**Sucesso** Como o crítico, mas por 1 semana e sem penalidade de iniciativa. Se Treerazer estiver na área: +1 Tormento e +1 Triunfo.\n\n**Falha** Sem efeito.\n\n**Falha crítica** Sem efeito na região; cada caster sofre 20d6 vazio (Fortitude básico CD 38). Por 1 mês, o mesmo primário sofre +5 nas CDs deste ritual.',
    castTime: '8 horas',
    cost: 'incenso raro e oferendas no valor de 2.000 PO',
    primaryCheck: 'Natureza ou Religião CD 41 (CD 43 se Treerazer estiver na área)',
    primaryCheckSkills: ['nature', 'religion'],
    secondaryCasters: '3',
    secondaryChecks:
      'Arcanismo, Natureza, Religião, Sobrevivência ou Conhecimento de Tanglebriar CD 36',
    secondaryCheckSkills: ['arcana', 'nature', 'religion', 'survival'],
    duration: 'varia',
    range: 'círculo de 1,6 km centrado em você',
    source: 'Pathfinder #212: A Voice in the Blight pg. 78',
    sourceId: SOURCE_VOICE_BLIGHT_ID,
    aonUrl: 'https://2e.aonprd.com/Rituals.aspx?ID=203',
  },
  {
    id: 'ritual-retreat-among-the-rains',
    name: 'Retiro entre as Chuvas',
    originalName: 'Retreat Among the Rains',
    rank: 4,
    traits: ['Mental', 'Rare', 'Water'],
    rarity: 'rare',
    provenance: { type: 'official' },
    summary:
      'Paisagem mental de 1 dia para retreinar feito ou perícia (crítico: também característica de classe).',
    description:
      'Ganhil criou este ritual para emular os estados mentais do Desafio do Céu e do Céu de 4718. Os pensamentos entram numa paisagem mental cujo tempo subjetivo é diferente, permitindo retreinar que levaria pelo menos uma semana. O corpo ainda precisa de comida e abrigo: o secundário alimenta com mingau de leite ou protege das intempéries.\n\n**Sucesso crítico** Ao fim, você pode retreinar uma característica de classe, um feito ou uma perícia.\n\n**Sucesso** Pode retreinar um feito ou uma perícia.\n\n**Falha** Fatigado.\n\n**Falha crítica** Como falha, e sofre fome e sede como se não tivesse comido por uma semana (10d4+7 de dano, só cura após comer e beber).',
    castTime: '1 dia',
    cost: 'pelo menos 5 gotas de água de fonte natural (chuva, rio ou mar) no rosto do primário',
    primaryCheck: 'Natureza (mestre) ou Ocultismo (mestre)',
    primaryCheckSkills: ['nature', 'occultism'],
    secondaryCasters: '1',
    secondaryChecks: 'Conhecimento de Culinária ou Sobrevivência',
    secondaryCheckSkills: ['survival'],
    source: 'Rival Academies pg. 78',
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    aonUrl: 'https://2e.aonprd.com/Rituals.aspx?ID=201',
  },
]
