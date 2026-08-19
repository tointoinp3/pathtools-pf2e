import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  SOURCE_PLAYER_CORE_2_ID,
  SOURCE_TIAN_XIA_CG_ID,
} from './sources'

export const ANCESTRY_LIZARDFOLK_ID = 'ancestry-lizardfolk'

export const HERITAGE_BAKUWA_LIZARDFOLK_ID = 'heritage-bakuwa-lizardfolk'
export const HERITAGE_CLIFFSCALE_LIZARDFOLK_ID = 'heritage-cliffscale-lizardfolk'
export const HERITAGE_CLOUDLEAPER_LIZARDFOLK_ID = 'heritage-cloudleaper-lizardfolk'
export const HERITAGE_FRILLED_LIZARDFOLK_ID = 'heritage-frilled-lizardfolk'
export const HERITAGE_MAKARI_LIZARDFOLK_ID = 'heritage-makari-lizardfolk'
export const HERITAGE_SANDSTRIDER_LIZARDFOLK_ID = 'heritage-sandstrider-lizardfolk'
export const HERITAGE_UNSEEN_LIZARDFOLK_ID = 'heritage-unseen-lizardfolk'
export const HERITAGE_WETLANDER_LIZARDFOLK_ID = 'heritage-wetlander-lizardfolk'
export const HERITAGE_WOODSTALKER_LIZARDFOLK_ID = 'heritage-woodstalker-lizardfolk'

/** Lizardfolk — Player Core 2 (Remaster), Archives of Nethys ID 81 */
export const lizardfolkAncestry: Ancestry = {
  id: ANCESTRY_LIZARDFOLK_ID,
  name: 'Iruxi',
  originalName: 'Lizardfolk',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 24,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'lizardfolk-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'lizardfolk-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'lizardfolk-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['intelligence'],
  languages: {
    automatic: ['Comum', 'Iruxi'],
    additionalOptions: [
      'Amurrun',
      'Boggard',
      'Dracônico',
      'Elfo',
      'Feérico',
      'Jotun',
      'Thalassic',
    ],
    additionalFromIntelligence: true,
  },
  senses: [],
  specialAbilities: [
    {
      id: 'lizardfolk-claws',
      name: 'Garras',
      originalName: 'Claws',
      actionType: 'passive',
      description:
        'Você tem um ataque desarmado de garra que causa 1d4 de dano cortante. Suas garras estão no grupo briga e têm os traços ágil, finura e desarmado.',
    },
    {
      id: 'lizardfolk-aquatic-adaptation',
      name: 'Adaptação Aquática',
      originalName: 'Aquatic Adaptation',
      actionType: 'passive',
      description:
        'Sua biologia reptiliana permite prender a respiração por muito tempo. Você ganha o feito geral Controle da Respiração como feito bônus.',
    },
  ],
  traits: ['Iruxi', 'Humanoide'],
  lore: {
    summary:
      'Lizardfolk são humanoides escamados com uma história que remonta a impérios considerados antigos até pelos elfos. Conhecidos entre si como iruxi, são sobreviventes consumados que se movem pelas sociedades de outros humanoides com a reserva fria de predadores natos.',
    youMight: [
      'Valorizar a história do seu povo e buscar no passado soluções para problemas atuais.',
      'Esforçar-se para se adaptar perfeitamente ao ambiente, preservando cultura e tradições.',
    ],
    othersProbably: [
      'Assumir que você é escravo da tradição e detém conhecimento ancestral.',
      'Vê-lo como frio e insensível por causa de reações físicas contidas.',
    ],
    physicalDescription:
      'Lizardfolk variam conforme o ambiente, mas compartilham focinhos dentados e caudas longas e poderosas. Muitos exibem espinhos dorsais ou golas no pescoço que indicam linhagem do clã. Alcançam a maturidade física aos 15 anos e vivem até cerca de 120 anos. A altura média é de 1,80 a 2,10 m, mas continuam crescendo ao longo da vida, ganhando força e tamanho com a idade.',
    society:
      'Iruxi são criados em comunidade desde que saem do ovo. Possuem tradição oral de milhares de anos, mantida viva por poemas épicos, entalhes evocativos e ritos ancestrais entre campos de ossos fossilizados. São astrólogos apaixonados, com um olho no futuro; se parecem lentos para agir, é porque a longa história lhes ensinou o valor da paciência. Assentamentos verdadeiros costumam passar despercebidos, pois ficam parcial ou totalmente submersos. Ossos de iruxi frequentemente adornam as paredes, pois muitos acreditam que espíritos ancestrais podem animá-los quando os moradores estão em perigo.',
    beliefs:
      'A maioria dos iruxi não se preocupa com grandes questões morais abstratas e concentra esforços no plano local. A religião desempenha papel prático, misturando animismo, culto aos ancestrais e ritos druídicos. Entre os deuses, Gozreh é o mais reverenciado.',
    popularEdicts: [
      'Manter vivas as memórias do passado',
      'Esperar pela presa',
      'Adaptar seus planos ao ambiente',
    ],
    popularAnathema: ['Desafiar a vontade das estrelas'],
    sampleNames: [
      'Arasheg',
      'Barashk',
      'Essaru',
      'Enshuk',
      'Gishkim',
      'Hazi',
      'Inishish',
      'Kutak',
      'Nasha',
      'Shulkuru',
      'Tizkar',
      'Utakish',
      'Zelkelek',
    ],
  },
  heritageIds: [
    HERITAGE_BAKUWA_LIZARDFOLK_ID,
    HERITAGE_CLIFFSCALE_LIZARDFOLK_ID,
    HERITAGE_CLOUDLEAPER_LIZARDFOLK_ID,
    HERITAGE_FRILLED_LIZARDFOLK_ID,
    HERITAGE_MAKARI_LIZARDFOLK_ID,
    HERITAGE_SANDSTRIDER_LIZARDFOLK_ID,
    HERITAGE_UNSEEN_LIZARDFOLK_ID,
    HERITAGE_WETLANDER_LIZARDFOLK_ID,
    HERITAGE_WOODSTALKER_LIZARDFOLK_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=81',
}

export const lizardfolkHeritages: Heritage[] = [
  {
    id: HERITAGE_BAKUWA_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Bakuwa',
    originalName: 'Bakuwa Lizardfolk',
    description:
      'Placas ósseas cobrem seu corpo e funcionam como armadura de placas média: +4 de CA, limite de Destreza +1, penalidade de teste −2, Deslocamento −1,5 m e Força +3, com os traços aquadinâmico e conforto. Você não pode vestir outras armaduras, mas pode gravar runas de armadura nessas placas como se fossem uma armadura de placas média.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 44,
    rulesSummary:
      'Placas = placas média (+4 CA, Dex +1, −2 testes, −1,5 m, For +3, aquadinâmico, conforto); não veste outra armadura; runas permitidas.',
    specialAbilities: [
      {
        id: 'bakuwa-bony-plates',
        name: 'Placas Ósseas',
        originalName: 'Bony Plates',
        actionType: 'passive',
        description:
          'Suas placas funcionam como armadura de placas média integrada, com aquadinâmico e conforto. Runas de armadura podem ser gravadas nelas.',
      },
    ],
  },
  {
    id: HERITAGE_CLIFFSCALE_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Escama de Penhasco',
    originalName: 'Cliffscale Lizardfolk',
    description:
      'Você recebe o feito Escalador de Combate. Ao Escalar, não precisa ter nenhuma mão livre. Além disso, se obtiver sucesso em um teste de Atletismo para Escalar, o resultado vira sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 25,
    rulesSummary:
      'Escalador de Combate; escalar sem mãos livres; sucesso→crítico ao Escalar.',
    featGrants: [
      {
        id: 'cliffscale-combat-climber',
        featId: 'feat-combat-climber',
        featName: 'Escalador de Combate',
        originalName: 'Combat Climber',
        featType: 'general',
      },
    ],
  },
  {
    id: HERITAGE_CLOUDLEAPER_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Saltador das Nuvens',
    originalName: 'Cloudleaper Lizardfolk',
    description:
      'Você cai com a leveza de uma nuvem. Se puder agir enquanto cai e tiver espaço suficiente, não sofre dano de queda.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 25,
    rulesSummary: 'Sem dano de queda se puder agir e houver espaço.',
  },
  {
    id: HERITAGE_FRILLED_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi com Babado',
    originalName: 'Frilled Lizardfolk',
    description:
      'Sua gola pode se expandir de forma ameaçadora. Quando usa Intimidação para Demoralizar, pode usar impulso visual em vez de auditivo e ignora o requisito de compartilhar idioma com o alvo. Você ganha a ação Abordagem Ameaçadora. Abordagem Ameaçadora [1 ação] (visual): ergue a gola e adota postura intimidadora. Tente Demoralizar cada inimigo em alcance de 9 metros, ignorando os requisitos de ver seu rosto e de compartilhar idioma.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 25,
    rulesSummary:
      'Demoralizar visual, sem idioma; ação Abordagem Ameaçadora (9 m).',
    specialAbilities: [
      {
        id: 'frilled-threatening-approach',
        name: 'Abordagem Ameaçadora',
        originalName: 'Threatening Approach',
        actionType: 'one',
        description:
          'Tente Demoralizar cada inimigo em alcance de 9 metros com impulso visual, ignorando requisitos de ver o rosto e de idioma compartilhado.',
      },
    ],
  },
  {
    id: HERITAGE_MAKARI_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Makari',
    originalName: 'Makari Lizardfolk',
    description:
      'Você canaliza poder divino pelas tradições mágicas do seu povo. Magias de herança e de feitos de ancestralidade lizardfolk que você possua passam a ser divinas em vez de suas tradições originais. Escolha um truque divino: você pode conjurá-lo à vontade como magia divina inata. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Você é treinado em modificador de ataque mágico e CD de magia, e sua habilidade de conjuração é Sabedoria.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 44,
    rulesSummary:
      'Magias de herança/feitos lizardfolk viram divinas; 1 truque divino inato à vontade (conjuração Sabedoria).',
    choices: [
      {
        id: 'makari-divine-cantrip',
        label: 'Truque divino inato',
        options: [
          {
            id: 'divine-lance',
            label: 'Lança Divina',
            originalLabel: 'Divine Lance',
          },
          {
            id: 'forbidding-ward',
            label: 'Barreira Proibitória',
            originalLabel: 'Forbidding Ward',
          },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'makari-divine-tradition',
        name: 'Tradição Divina',
        originalName: 'Divine Tradition',
        actionType: 'passive',
        description:
          'Magias de herança e de feitos de ancestralidade lizardfolk passam a ser divinas. Você conjura o truque escolhido à vontade como magia divina inata.',
      },
    ],
  },
  {
    id: HERITAGE_SANDSTRIDER_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Andarilho da Areia',
    originalName: 'Sandstrider Lizardfolk',
    description:
      'Você prospera em desertos escaldantes. Recebe resistência a fogo igual à metade do seu nível (mínimo 1). Calor ambiental é um grau menos extremo para você. Pode resistir à sede e à fome por dez vezes mais tempo que o normal. Porém, frio ambiental é um grau mais extremo para você se não tiver abrigo.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 25,
    rulesSummary:
      'Resistência a fogo = metade do nível (mín. 1); calor −1 grau; sede/fome 10×; frio +1 grau sem abrigo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'fire',
        label: 'Resistência a fogo',
      },
    ],
  },
  {
    id: HERITAGE_UNSEEN_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Indetectável',
    originalName: 'Unseen Lizardfolk',
    description:
      'Você pode mudar a coloração da pele para se misturar ao ambiente. Com uma ação, pode fazer pequenos ajustes na coloração. Enquanto a coloração combinar com o ambiente, recebe +2 de bônus de circunstância a testes de Furtividade.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 25,
    rulesSummary:
      'Mudança de cor (1 ação); +2 Furtividade se a cor combinar com o ambiente.',
    specialAbilities: [
      {
        id: 'unseen-color-change',
        name: 'Mudança de Cor',
        originalName: 'Color Change',
        actionType: 'one',
        description:
          'Ajusta a coloração da pele com uma ação. +2 de bônus de circunstância a Furtividade enquanto a cor combinar com o ambiente.',
      },
    ],
  },
  {
    id: HERITAGE_WETLANDER_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Pantaneiro',
    originalName: 'Wetlander Lizardfolk',
    description:
      'Você cresceu em pântanos e zonas úmidas e nada com facilidade natural. Você ganha deslocamento de natação de 4,5 metros (15 pés).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 25,
    rulesSummary: 'Deslocamento de natação 4,5 m (15 pés).',
    specialAbilities: [
      {
        id: 'wetlander-swim',
        name: 'Natação Natural',
        originalName: 'Swim Speed',
        actionType: 'passive',
        description: 'Deslocamento de natação de 4,5 metros.',
      },
    ],
  },
  {
    id: HERITAGE_WOODSTALKER_LIZARDFOLK_ID,
    ancestryId: ANCESTRY_LIZARDFOLK_ID,
    name: 'Iruxi Caçador da Floresta',
    originalName: 'Woodstalker Lizardfolk',
    description:
      'Você se move com facilidade por florestas e selvas. Pode sempre usar a ação Tomar Cobertura em terreno de floresta ou selva, mesmo sem cobertura adequada. Também recebe o feito Espreitador de Terreno (sub-bosque), mesmo que não seja treinado em Furtividade.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 25,
    rulesSummary:
      'Tomar Cobertura em floresta/selva sempre; Espreitador de Terreno (sub-bosque) sem treino em Furtividade.',
    featGrants: [
      {
        id: 'woodstalker-terrain-stalker',
        featId: 'feat-terrain-stalker',
        featName: 'Espreitador de Terreno (sub-bosque)',
        originalName: 'Terrain Stalker (underbrush)',
        featType: 'skill',
      },
    ],
    specialAbilities: [
      {
        id: 'woodstalker-take-cover',
        name: 'Tomar Cobertura na Selva',
        originalName: 'Take Cover',
        actionType: 'passive',
        description:
          'Você pode sempre Tomar Cobertura em terreno de floresta ou selva, mesmo sem cobertura adequada.',
      },
    ],
  },
]
