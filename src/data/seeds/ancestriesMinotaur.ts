import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_HOWL_OF_THE_WILD_ID } from './sources'

export const ANCESTRY_MINOTAUR_ID = 'ancestry-minotaur'

export const HERITAGE_GHOST_BULL_MINOTAUR_ID = 'heritage-ghost-bull-minotaur'
export const HERITAGE_GLACIER_CAVERN_MINOTAUR_ID = 'heritage-glacier-cavern-minotaur'
export const HERITAGE_LITTLEHORN_MINOTAUR_ID = 'heritage-littlehorn-minotaur'
export const HERITAGE_ROAMING_MINOTAUR_ID = 'heritage-roaming-minotaur'
export const HERITAGE_SLABSOUL_MINOTAUR_ID = 'heritage-slabsoul-minotaur'
export const HERITAGE_STALKER_MINOTAUR_ID = 'heritage-stalker-minotaur'

/** Minotauro — Howl of the Wild, Archives of Nethys ID 75 */
export const minotaurAncestry: Ancestry = {
  id: ANCESTRY_MINOTAUR_ID,
  name: 'Minotauro',
  originalName: 'Minotaur',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
  sourcePage: 41,
  hitPoints: 10,
  size: 'large',
  speed: 25,
  attributeBoosts: [
    {
      id: 'minotaur-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'minotaur-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'minotaur-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['charisma'],
  languages: {
    automatic: ['Comum', 'Jotun'],
    additionalOptions: ['Cyclops', 'Anão', 'Feérico', 'Petran', 'Sakvroth'],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'minotaur-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [
    {
      id: 'minotaur-horns',
      name: 'Chifres',
      originalName: 'Horns',
      actionType: 'passive',
      description:
        'Seus chifres afiados são tão mortais quanto lanças. Você tem um ataque desarmado de chifres que causa 1d8 de dano perfurante. Seus chifres estão no grupo briga e têm o traço desarmado.',
    },
  ],
  traits: ['Minotauro', 'Besta', 'Humanoide'],
  lore: {
    summary:
      'Minotauros são humanoides bovinos com chifres, originários de uma antiga maldição divina. Grandes e fortes, são mestres de ofícios e enigmas — inclinações que levam muitos a explorar arquitetura e trabalho em pedra. Sentem-se em casa em labirintos, sejam naturais, artificiais ou psicológicos.',
    youMight: [
      'Decorar cascos e chifres com desenhos ou cores de significado pessoal.',
      'Ser hábil em navegação e enigmas.',
    ],
    othersProbably: [
      'Se intimidam com seu tamanho ou o consideram calculista.',
      'Acham que você enxerga através da pedra.',
    ],
    physicalDescription:
      'Minotauros são humanoides altos e robustos com traços bovinos — chifres, cascos e rostos alongados. Padrões de pelagem costumam ser monocromáticos em marrons profundos ou pretos, embora branco ou cinza não sejam raros. Apesar do tamanho, o equilíbrio sobre os cascos torna os passos quietos e precisos; quando precisam ser ouvidos, porém, caem como trovão. Os chifres são fonte de orgulho e frequentemente acentuados por moda: anéis e correntes de metais raros, tingimento ou gravuras; quem tem pouco chifre pode raspar a pelagem na base, tatuar círculos estilizados ou encaixar tampas metálicas nas pontas.',
    society:
      'Em geral residem em enclaves comunais subterrâneos e insulares, orgulhosos da arquitetura talhada em pedra e cavernas. Um enclave costuma ter quase o dobro de edificações necessárias — o excedente como arte funcional onde jovens praticam caça e espreita, cada geração acrescentando corredores retorcidos, saliências inesperadas e jardins compartilhados. Mitos os pintam como carnívoros ferozes ou até canibais; na realidade, a maioria é caçadora-coletora, alimentando-se de líquen e flora, com rituais mensais em que espreitadores trazem presas perigosas e a comunidade festeja carne em gratidão. Tendem a ser diretos e literais, raramente usam ironias elaboradas. Narinas dilatadas e olhos revirados intimidam forasteiros, mas entre minotauros contam histórias complexas. O ditado “um touro irritado bate o casco uma vez e chifra duas” adverte contra exibições agressivas demais e lembra que o verdadeiro temível fala com ações.',
    beliefs:
      'Tradições longas de isolamento favorecem uma visão equilibrada e adaptável. Criados entre os seus costumam evitar associação com deuses — pouco surpreendente dada a lenda de origem: seres divinos são vistos como mesquinhos e indiferentes. Muitos adotam filosofias lógicas ou espirituais; mistérios são enigmas ainda sem resposta, explicáveis com estudo cuidadoso. Quando seguem divindades, atraem-se por autoaperfeiçoamento e autocontrole, como Irori e Nethys.',
    popularEdicts: [
      'Construir arquitetura bela e duradoura',
      'Buscar enigmas cada vez mais perplexos',
      'Aprimorar as próprias capacidades',
    ],
    popularAnathema: [
      'Deixar o destino nas mãos dos deuses em vez da iniciativa mortal',
      'Perder a chance de investigar um mistério',
    ],
    sampleNames: [
      'Actilea',
      'Iraiasos',
      'Paxaidio',
      'Rotherion',
      'Zavmandris',
    ],
  },
  heritageIds: [
    HERITAGE_GHOST_BULL_MINOTAUR_ID,
    HERITAGE_GLACIER_CAVERN_MINOTAUR_ID,
    HERITAGE_LITTLEHORN_MINOTAUR_ID,
    HERITAGE_ROAMING_MINOTAUR_ID,
    HERITAGE_SLABSOUL_MINOTAUR_ID,
    HERITAGE_STALKER_MINOTAUR_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=75',
}

export const minotaurHeritages: Heritage[] = [
  {
    id: HERITAGE_GHOST_BULL_MINOTAUR_ID,
    ancestryId: ANCESTRY_MINOTAUR_ID,
    name: 'Minotauro Touro Fantasma',
    originalName: 'Ghost Bull Minotaur',
    description:
      'Sua pelagem é pálida como a morte, possivelmente por alguma conexão sua ou da família com o além, o que lhe permite achar o caminho de forma sobrenatural. Você pode conjurar conhecer o caminho como magia inata oculta à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Além disso, recebe +1 de bônus de circunstância contra magias ou efeitos que causem a condição confuso.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 42,
    rulesSummary:
      'Truque inato oculta conhecer o caminho à vontade; +1 circunstância vs efeitos que causem confuso.',
    specialAbilities: [
      {
        id: 'ghost-bull-know-the-way',
        name: 'Conhecer o Caminho',
        originalName: 'Know the Way',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura conhecer o caminho como magia inata oculta à vontade, elevada à metade do seu nível (arredondado para cima).',
      },
      {
        id: 'ghost-bull-confused-bonus',
        name: 'Mente Orientada',
        originalName: 'Oriented Mind',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância contra magias ou efeitos que causem a condição confuso.',
      },
    ],
  },
  {
    id: HERITAGE_GLACIER_CAVERN_MINOTAUR_ID,
    ancestryId: ANCESTRY_MINOTAUR_ID,
    name: 'Minotauro da Caverna Glacial',
    originalName: 'Glacier Cavern Minotaur',
    description:
      'Sua pelagem cresce espessa e quente, bem adequada às montanhas congeladas onde você reside. Você recebe resistência a frio igual à metade do seu nível (mínimo 1). Efeitos ambientais de frio são um grau menos extremos para você.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 42,
    rulesSummary:
      'Resistência a frio = metade do nível (mín. 1); frio ambiental um grau menos extremo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'cold',
        label: 'Resistência a frio',
      },
    ],
    specialAbilities: [
      {
        id: 'glacier-cavern-cold-acclimation',
        name: 'Aclimatação ao Frio',
        originalName: 'Cold Acclimation',
        actionType: 'passive',
        description:
          'Efeitos ambientais de frio são um grau menos extremos para você.',
      },
    ],
  },
  {
    id: HERITAGE_LITTLEHORN_MINOTAUR_ID,
    ancestryId: ANCESTRY_MINOTAUR_ID,
    name: 'Minotauro Pequeno Chifre',
    originalName: 'Littlehorn Minotaur',
    description:
      'Embora não seja menos poderoso, seu porte (e seus chifres) são menores que os da maioria dos outros minotauros. Em vez de Grande, seu tamanho é Médio. Seu ataque desarmado de chifres causa 1d6 de dano perfurante em vez de 1d8, mas tem o traço ágil.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 42,
    rulesSummary:
      'Tamanho Médio (em vez de Grande); chifres 1d6 perfurante com traço ágil.',
    specialAbilities: [
      {
        id: 'littlehorn-medium-size',
        name: 'Tamanho Médio',
        originalName: 'Medium Size',
        actionType: 'passive',
        description:
          'Seu tamanho é Médio em vez de Grande. Isso substitui o tamanho padrão da ancestralidade minotauro.',
      },
      {
        id: 'littlehorn-horns',
        name: 'Chifres Ágeis',
        originalName: 'Agile Horns',
        actionType: 'passive',
        description:
          'Ataque desarmado de chifres causa 1d6 perfurante (em vez de 1d8) e tem o traço ágil.',
      },
    ],
  },
  {
    id: HERITAGE_ROAMING_MINOTAUR_ID,
    ancestryId: ANCESTRY_MINOTAUR_ID,
    name: 'Minotauro Errante',
    originalName: 'Roaming Minotaur',
    description:
      'Seus cascos são largos e poderosos, perfeitos para limpar entulho enquanto avança. Você fica treinado em Sobrevivência (ou em outra perícia se já for treinado em Sobrevivência) e recebe o feito de perícia Expertise em Terreno. Você ignora terreno difícil causado por solo irregular natural enquanto estiver no terreno escolhido para Expertise em Terreno.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 42,
    rulesSummary:
      'Treinado em Sobrevivência (ou outra se já for); Expertise em Terreno; ignora terreno difícil natural irregular no terreno escolhido.',
    skillGrants: [
      { id: 'roaming-survival', skillId: 'survival', rank: 'trained', replaceIfTrained: true },
    ],
    featGrants: [
      {
        id: 'roaming-terrain-expertise',
        featId: 'feat-terrain-expertise',
        featName: 'Expertise em Terreno',
        originalName: 'Terrain Expertise',
        featType: 'skill',
      },
    ],
    choices: [
      {
        id: 'roaming-terrain',
        label: 'Terreno de Expertise',
        options: [
          { id: 'arctic', label: 'Ártico', originalLabel: 'Arctic' },
          { id: 'desert', label: 'Deserto', originalLabel: 'Desert' },
          { id: 'forest', label: 'Floresta', originalLabel: 'Forest' },
          { id: 'mountain', label: 'Montanha', originalLabel: 'Mountain' },
          { id: 'plains', label: 'Planícies', originalLabel: 'Plains' },
          { id: 'swamp', label: 'Pântano', originalLabel: 'Swamp' },
          { id: 'underground', label: 'Subterrâneo', originalLabel: 'Underground' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'roaming-uneven-terrain',
        name: 'Passo Seguro',
        originalName: 'Steady Hooves',
        actionType: 'passive',
        description:
          'Você ignora terreno difícil causado por solo irregular natural no terreno escolhido para Expertise em Terreno.',
      },
    ],
  },
  {
    id: HERITAGE_SLABSOUL_MINOTAUR_ID,
    ancestryId: ANCESTRY_MINOTAUR_ID,
    name: 'Minotauro Alma de Laje',
    originalName: 'Slabsoul Minotaur',
    description:
      'Sua profunda conexão com pedra e muros permite conjurar lajes massivas de granito que desabam sobre inimigos. Você ganha a atividade Erguer Lajes.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 42,
    rulesSummary:
      'Erguer Lajes (2 ações, terra/divino) 1×/dia: 1d6 contusão adjacente (Reflexos básico CD de classe/magia); falha crítica → caído; +1d6 no 3º e a cada 2 níveis.',
    specialAbilities: [
      {
        id: 'slabsoul-raise-slabs',
        name: 'Erguer Lajes',
        originalName: 'Raise Slabs',
        actionType: 'two',
        frequency: '1 por dia',
        description:
          '(Terra, divino) Lajes espessas de pedra se erguem ao seu redor e tombam. Você causa 1d6 de dano de contusão a todas as criaturas adjacentes (Reflexos básico contra sua CD de classe ou de magia, a maior). Em falha crítica, a criatura também fica caída. No 3º nível e a cada 2 níveis seguintes, o dano aumenta em 1d6.',
      },
    ],
  },
  {
    id: HERITAGE_STALKER_MINOTAUR_ID,
    ancestryId: ANCESTRY_MINOTAUR_ID,
    name: 'Minotauro Espreitador',
    originalName: 'Stalker Minotaur',
    description:
      'Apesar do porte pesado, você anda sobre cascos peludos que abafam os passos, permitindo surpreender a presa. Você fica treinado em Furtividade (ou em outra perícia se já for treinado em Furtividade) e recebe o feito de perícia Espreitador de Terreno, exceto que deve escolher entulho e pode Mover-se Furtivamente até 10 pés em vez de 5 sem tentar um teste de Furtividade.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 42,
    rulesSummary:
      'Treinado em Furtividade (ou outra se já for); Espreitador de Terreno (entulho); Furtivo até 10 pés sem teste (em vez de 5).',
    skillGrants: [
      { id: 'stalker-stealth', skillId: 'stealth', rank: 'trained', replaceIfTrained: true },
    ],
    featGrants: [
      {
        id: 'stalker-terrain-stalker',
        featId: 'feat-terrain-stalker',
        featName: 'Espreitador de Terreno (entulho)',
        originalName: 'Terrain Stalker (rubble)',
        featType: 'skill',
      },
    ],
    specialAbilities: [
      {
        id: 'stalker-extended-sneak',
        name: 'Passos Abafados',
        originalName: 'Muffled Steps',
        actionType: 'passive',
        description:
          'Com Espreitador de Terreno (entulho), você pode Mover-se Furtivamente até 10 pés sem teste de Furtividade (em vez de 5 pés).',
      },
    ],
  },
]
