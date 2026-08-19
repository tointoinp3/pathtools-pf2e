import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_HOWL_OF_THE_WILD_ID } from './sources'

export const ANCESTRY_CENTAUR_ID = 'ancestry-centaur'

export const HERITAGE_BUDDING_SPEAKER_CENTAUR_ID = 'heritage-budding-speaker-centaur'
export const HERITAGE_FLEETWIND_CENTAUR_ID = 'heritage-fleetwind-centaur'
export const HERITAGE_IRONHOOF_CENTAUR_ID = 'heritage-ironhoof-centaur'
export const HERITAGE_MOTTLE_COAT_CENTAUR_ID = 'heritage-mottle-coat-centaur'
export const HERITAGE_PONYGAIT_CENTAUR_ID = 'heritage-ponygait-centaur'
export const HERITAGE_STOUTHEART_CENTAUR_ID = 'heritage-stoutheart-centaur'

/** Centauro — Howl of the Wild, Archives of Nethys ID 73 */
export const centaurAncestry: Ancestry = {
  id: ANCESTRY_CENTAUR_ID,
  name: 'Centauro',
  originalName: 'Centaur',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
  sourcePage: 40,
  hitPoints: 8,
  size: 'large',
  speed: 30,
  attributeBoosts: [
    {
      id: 'centaur-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'centaur-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'centaur-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['charisma'],
  languages: {
    automatic: ['Comum', 'Feérico'],
    additionalOptions: [
      'Arboreal',
      'Cyclops',
      'Anão',
      'Elfo',
      'Gnomo',
      'Halfling',
      'Jotun',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'centaur-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [
    {
      id: 'centaur-mount',
      name: 'Montaria',
      originalName: 'Mount',
      actionType: 'passive',
      description:
        'Seu corpo equino é bem adequado para carregar aliados de confiança. Um PC pode montar em você se for uma categoria de tamanho menor que você (Médio, para a maioria dos centauros), em vez de precisar ser duas categorias menor.',
    },
    {
      id: 'centaur-robust',
      name: 'Robusto',
      originalName: 'Robust',
      actionType: 'passive',
      description:
        'Você aumenta seus limites máximo e de sobrecarga de Carga em 2.',
    },
  ],
  traits: ['Centauro', 'Humanoide'],
  lore: {
    summary:
      'Centauros são nômades meio humanos, meio cavalos que percorrem livremente suas terras ancestrais. São sobrevivencialistas com longa tradição de ensino e instrução, que enfrentam o perigo com arco, herbalismo e magia.',
    youMight: [
      'Ir a grandes extremos para proteger seu lar e as pessoas que ama.',
      'Gostar de competição, especialmente esportes organizados e provas de força ou resistência.',
      'Respeitar e valorizar o mundo natural.',
    ],
    othersProbably: [
      'Presumem que você é um arqueiro expert ou guerreiro feroz.',
      'Acham que você entende de cavalos.',
      'Consideram você agressivo e excessivamente competitivo.',
    ],
    physicalDescription:
      'Centauros têm a forma de humanos musculosos com corpo de cavalo a partir da cintura. São resistentes e estáveis, capazes de carregar fardos pesados e volumosos por longos períodos. Variam muito em tamanho, pelagem e coloração; a maioria tem cerca de 2,10 m de altura e pesa mais de 900 kg. Embora a coloração seja frequentemente herdada, as marcas do pelo são imprevisíveis, e muitos se orgulham dos padrões, posições e variações cromáticas distintas do próprio pelo. Essas marcas estão presentes ao nascer e não mudam ao longo da vida.',
    society:
      'Centauros são originários do continente de Casmaron e ainda habitam sobretudo Iblydos e Iobaria. Vivem em bandos nômades de caçadores-coletores com territórios amplos e bem definidos, mantidos por gerações. No centro de cada território há um local de importância — muitas vezes um acampamento para os idosos e doentes que não podem mais viajar com o bando. A liderança recai sobre membros respeitados, em geral de meia-idade ou mais velhos, pois a experiência de vida é vista como qualidade essencial. Muitos centauros gostam de mentoria e competem entre si por formar os alunos mais promissores. Consideram selas e rédeas restritivas e insultuosas, parecidas com algemas e gaiolas, e recusam servir de montaria exceto nas circunstâncias mais extremas ou para companheiros de total confiança.',
    beliefs:
      'Muitos centauros seguem a Fé Verde ou adoram divindades que compartilham seu respeito pela natureza, como Cernunnos, Erastil ou Gozreh. Outros sentem afinidade com Desna, deusa das viagens. Curandeiros e herbalistas favorecem Immonhiel ou Pharasma. Centauros têm duas figuras religiosas principais: Oradores Verdes e Oradores da Fé. Oradores Verdes estão em sintonia com a natureza, são herbalistas excepcionais e conhecem os caminhos do mundo natural. Oradores da Fé são devotos piedosos de deuses, demônios, celestiais e outros seres. Ambos recebem respeito igual, considerados duas faces da mesma moeda.',
    popularEdicts: [
      'Garantir que o conhecimento seja transmitido',
      'Viver em harmonia com o mundo natural',
      'Competir de forma justa e honesta',
    ],
    popularAnathema: [
      'Deixar de vagar',
      'Ajudar na destruição desenfreada de uma paisagem natural',
    ],
    sampleNames: [
      'Aecora',
      'Demeleon',
      'Ertris',
      'Hycanthe',
      'Irdan',
      'Jalvayne',
      'Karala',
      'Malion',
      'Oridius',
      'Tolron',
      'Vorag',
    ],
  },
  heritageIds: [
    HERITAGE_BUDDING_SPEAKER_CENTAUR_ID,
    HERITAGE_FLEETWIND_CENTAUR_ID,
    HERITAGE_IRONHOOF_CENTAUR_ID,
    HERITAGE_MOTTLE_COAT_CENTAUR_ID,
    HERITAGE_PONYGAIT_CENTAUR_ID,
    HERITAGE_STOUTHEART_CENTAUR_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=73',
}

export const centaurHeritages: Heritage[] = [
  {
    id: HERITAGE_BUDDING_SPEAKER_CENTAUR_ID,
    ancestryId: ANCESTRY_CENTAUR_ID,
    name: 'Centauro Orador Nascente',
    originalName: 'Budding Speaker Centaur',
    description:
      'Você nasceu com uma centelha de magia que pode colocá-lo no caminho de se tornar um Orador Verde ou Orador da Fé. Escolha divino ou primal. Se escolheu divino, você é um Orador da Fé. Se escolheu primal, você é um Orador Verde. Essa escolha não pode ser alterada. Você ganha um truque da lista de magias escolhida. Pode conjurá-lo como magia inata à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 30,
    rulesSummary:
      'Escolha divino (Orador da Fé) ou primal (Orador Verde); 1 truque inato à vontade da lista escolhida.',
    choices: [
      {
        id: 'budding-speaker-tradition',
        label: 'Tradição do Orador',
        options: [
          {
            id: 'divine',
            label: 'Divino — Orador da Fé',
            originalLabel: 'Divine — Faithspeaker',
          },
          {
            id: 'primal',
            label: 'Primal — Orador Verde',
            originalLabel: 'Primal — Greenspeaker',
          },
        ],
      },
      {
        id: 'budding-speaker-cantrip',
        label: 'Truque inato',
        options: [
          { id: 'other', label: 'Truque da lista escolhida (anotar nas notas)' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'budding-speaker-innate-cantrip',
        name: 'Truque Inato',
        originalName: 'Innate Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura o truque escolhido da lista divina ou primal como magia inata à vontade, elevado à metade do seu nível (arredondado para cima).',
      },
    ],
  },
  {
    id: HERITAGE_FLEETWIND_CENTAUR_ID,
    ancestryId: ANCESTRY_CENTAUR_ID,
    name: 'Centauro Ventania',
    originalName: 'Fleetwind Centaur',
    description:
      'Você tem porte esguio e é capaz de atingir velocidades incríveis apenas com os cascos. Seu Deslocamento aumenta em 1,5 metro (5 pés).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 30,
    rulesSummary: 'Deslocamento +1,5 m (5 pés).',
    speedBonus: 5,
    specialAbilities: [
      {
        id: 'fleetwind-speed',
        name: 'Ventania',
        originalName: 'Fleetwind',
        actionType: 'passive',
        description: 'Seu Deslocamento terrestre aumenta em 1,5 metro (5 pés).',
      },
    ],
  },
  {
    id: HERITAGE_IRONHOOF_CENTAUR_ID,
    ancestryId: ANCESTRY_CENTAUR_ID,
    name: 'Centauro Casco de Ferro',
    originalName: 'Ironhoof Centaur',
    description:
      'Seus cascos são incrivelmente fortes e servem como armas formidáveis. Você ganha um ataque desarmado de casco que causa 1d6 de dano de contusão. Seus cascos estão no grupo briga e têm os traços finura e desarmado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 30,
    rulesSummary:
      'Casco desarmado 1d6 contusão (briga, finura, desarmado).',
    specialAbilities: [
      {
        id: 'ironhoof-hoof',
        name: 'Casco',
        originalName: 'Hoof',
        actionType: 'passive',
        description:
          'Ataque desarmado de casco: 1d6 contusão, grupo briga, traços finura e desarmado.',
      },
    ],
  },
  {
    id: HERITAGE_MOTTLE_COAT_CENTAUR_ID,
    ancestryId: ANCESTRY_CENTAUR_ID,
    name: 'Centauro Pelagem Manchada',
    originalName: 'Mottle-Coat Centaur',
    description:
      'Sua pelagem é manchada ou listrada, concedendo camuflagem natural no ambiente de origem. Escolha um terreno entre: ártico, deserto, floresta, montanha, planícies ou pântano. No terreno escolhido, você recebe +1 de bônus de circunstância a testes de Furtividade para Ocultar-se ou Mover-se Furtivamente e a testes de Enganação para Blefar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 31,
    rulesSummary:
      'Escolha terreno; +1 Furtividade (Ocultar/Furtivo) e Enganação (Blefar) nesse terreno.',
    choices: [
      {
        id: 'mottle-coat-terrain',
        label: 'Terreno de origem',
        options: [
          { id: 'arctic', label: 'Ártico', originalLabel: 'Arctic' },
          { id: 'desert', label: 'Deserto', originalLabel: 'Desert' },
          { id: 'forest', label: 'Floresta', originalLabel: 'Forest' },
          { id: 'mountain', label: 'Montanha', originalLabel: 'Mountain' },
          { id: 'plains', label: 'Planícies', originalLabel: 'Plains' },
          { id: 'swamp', label: 'Pântano', originalLabel: 'Swamp' },
        ],
      },
    ],
  },
  {
    id: HERITAGE_PONYGAIT_CENTAUR_ID,
    ancestryId: ANCESTRY_CENTAUR_ID,
    name: 'Centauro Passo de Pônei',
    originalName: 'Ponygait Centaur',
    description:
      'Você é menor que a maioria dos outros centauros, embora não seja menos veloz. Em vez de Grande, seu tamanho é Médio — isso substitui o tamanho Grande padrão da ancestralidade centauro e afeta regras que dependem de tamanho (incluindo Montaria: PCs Pequenos podem montar em você, em vez de apenas Médios). Você recebe +1 de bônus de circunstância a salvaguardas de Reflexos.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 31,
    rulesSummary:
      'Tamanho Médio (em vez de Grande); +1 salvaguardas de Reflexos.',
    specialAbilities: [
      {
        id: 'ponygait-medium-size',
        name: 'Tamanho Médio',
        originalName: 'Medium Size',
        actionType: 'passive',
        description:
          'Seu tamanho é Médio em vez de Grande. Isso substitui o tamanho padrão da ancestralidade centauro e altera quem pode montar em você (PCs Pequenos, em vez de Médios).',
      },
    ],
  },
  {
    id: HERITAGE_STOUTHEART_CENTAUR_ID,
    ancestryId: ANCESTRY_CENTAUR_ID,
    name: 'Centauro Coração Robusto',
    originalName: 'Stoutheart Centaur',
    description:
      'Você é um centauro resistente, firme de postura e forte de coração. Você recebe 10 PV da ancestralidade em vez de 8 e ganha +1 de bônus de circunstância a testes de Acrobacia para Equilíbrio e à sua CD de Reflexos para evitar ser derrubado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 31,
    rulesSummary:
      '10 PV de ancestralidade (em vez de 8); +1 Acrobacia (Equilíbrio) e CD de Reflexos vs derrubar.',
    hitPointsOverride: 10,
    specialAbilities: [
      {
        id: 'stoutheart-ancestry-hp',
        name: 'Vitalidade Robusta',
        originalName: 'Stoutheart Hit Points',
        actionType: 'passive',
        description: 'Você recebe 10 PV da ancestralidade em vez de 8.',
      },
    ],
  },
]
