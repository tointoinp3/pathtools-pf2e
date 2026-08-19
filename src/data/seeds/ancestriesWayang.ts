import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_TIAN_XIA_CG_ID } from './sources'

export const ANCESTRY_WAYANG_ID = 'ancestry-wayang'

export const HERITAGE_SHADOW_COURTIER_WAYANG_ID = 'heritage-shadow-of-the-courtier'
export const HERITAGE_SHADOW_HERMIT_WAYANG_ID = 'heritage-shadow-of-the-hermit'
export const HERITAGE_SHADOW_SAILOR_WAYANG_ID = 'heritage-shadow-of-the-sailor'
export const HERITAGE_SHADOW_SMITH_WAYANG_ID = 'heritage-shadow-of-the-smith'
export const HERITAGE_SHADOW_WANDERER_WAYANG_ID = 'heritage-shadow-of-the-wanderer'

/** Wayang — Tian Xia Character Guide, Archives of Nethys ID 91 */
export const wayangAncestry: Ancestry = {
  id: ANCESTRY_WAYANG_ID,
  name: 'Wayang',
  originalName: 'Wayang',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_TIAN_XIA_CG_ID,
  sourcePage: 70,
  hitPoints: 8,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'wayang-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'wayang-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'wayang-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['constitution'],
  languages: {
    automatic: ['Comum', 'Língua das Sombras', 'Wayang'],
    additionalOptions: [
      "D'ziriak",
      'Diabólico',
      'Minatan',
      'Nagaji',
      'Talássico',
      'Vudrani',
      'Yaksha',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'wayang-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [],
  traits: ['Wayang', 'Humanoide', 'Sombra'],
  lore: {
    summary:
      'Wayangs são um povo pequeno nativo do Mundo Inferior, que imigrou a Golarion após a Queda da Terra. Herdeiros de artes místicas e marciais da escuridão ainda não profanada, lutam para libertar as sombras da Desecração e compartilhar a filosofia da Dissolução.',
    youMight: [
      'Buscar os lugares escuros de Tian Xia — cavernas, mangues sombreados, copas da floresta.',
      'Ter curiosidade pelo mundo ensolarado e buscar experiências para a arte e a meditação.',
      'Sonhar com o dia em que seu povo derrubará os senhores invasores.',
    ],
    othersProbably: [
      'Consideram você criativo e querem encomendá-lo como artesão ou avaliador.',
      'Não entendem os motivos e as lutas distantes do seu povo.',
      'Sussurram rumores medonhos sobre sua origem e atribuem maldições à sua presença.',
    ],
    physicalDescription:
      'A luta interplanar e a vida no mar dão a muitos wayangs um porte fibroso e uma gravidade que desmente o tamanho pequeno. A pele vai do marfim ao preto de duskwood e quase não queima ao sol — bênção do amor da escuridão por seus filhos. Sombras espessas dançam como uma segunda pele, abrigando-os do clarão. Decoram a pele com padrões de tinta que forasteiros confundem com cicatrizes ou tatuagens. Com treino, movem a sombra independente do corpo — útil em emboscadas e em narrativas. Cabelo longo, toucados de concha e chifre, xales e lenços nos ombros.',
    society:
      'A sociedade wayang equilibra o coletivo e o individual: vilarejos agrários ou tripulações em que cada um faz a sua parte, mas eremitas e iconoclastas têm lugar especial. O universo político é feito de mandalas sobrepostas em torno de chefes, artesãos, capitães — e, acima, mestres de virtude ou sabedoria. Serve a diásporas espalhadas por ilhas e planos: independência para a própria jornada, interdependência para o chamado de ajuda. O contato com outros povos costuma ser o de artesãos visitantes com bens preciosos e proteção sobrenatural contra demônios e mortos-vivos. Não vendem essas peças: oferecem-nas a quem é tocado pelas sombras, para fortalecer aliados contra outras trevas e, com o tempo, ensinar a Dissolução.',
    beliefs:
      'Histórias longas de aliança favorecem o respeito à comunidade, mas exploradores e artesãos abraçam curiosidade e espírito livre. A vida na escuridão ensina ceticismo e desencoraja absolutos. Raramente são cruéis — rejeição consciente da Desecração. Religião sincrética: austeridades de Irori, metafísica de Sangpotshi e Pharasma, espíritos indígenas do Mundo Inferior. Muitos invocam Lao Shu Po, a Irmã Cerva-Rato, cuja astúcia inspira a luta anticolonial. Poucos adoram Abadar, por ter condenado o Mundo Inferior a Zon-Kuthon. Ironicamente, alguns wayangs caídos tornaram-se kuthitas.',
    popularEdicts: [
      'Agir de forma altruísta com a comunidade',
      'Fazer aliados poderosos',
      'Rejeitar a Desecração da escuridão',
      'Buscar inspiração para a sua arte',
    ],
    popularAnathema: [
      'Causar dor desnecessária a uma criatura',
      'Fazer concessões na busca da liberdade',
      'Vender suas criações sem critério',
      'Falar abertamente da Dissolução',
    ],
    sampleNames: [
      'Putri Rubah Hebat',
      'Hakim Gunung Api',
      'Raja Ribut Hitam',
      'Adik Musang',
    ],
  },
  heritageIds: [
    HERITAGE_SHADOW_COURTIER_WAYANG_ID,
    HERITAGE_SHADOW_HERMIT_WAYANG_ID,
    HERITAGE_SHADOW_SAILOR_WAYANG_ID,
    HERITAGE_SHADOW_SMITH_WAYANG_ID,
    HERITAGE_SHADOW_WANDERER_WAYANG_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=91',
}

export const wayangHeritages: Heritage[] = [
  {
    id: HERITAGE_SHADOW_COURTIER_WAYANG_ID,
    ancestryId: ANCESTRY_WAYANG_ID,
    name: 'Sombra do Cortesão',
    originalName: 'Shadow of the Courtier',
    description:
      'Sua sombra dança ao seu lado. Você ganha o feito de perícia Performance Impressionante, permitindo Causar Impressão com Performance em vez de Diplomacia. 1 vez por dia, se falhar (mas não criticamente) num teste para Causar Impressão, pode disfarçar como parte de uma apresentação e rolar de novo (fortuna).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 72,
    rulesSummary:
      'Feito Performance Impressionante; 1×/dia rerrolar falha (não crítica) ao Causar Impressão (fortuna).',
    featGrants: [
      {
        id: 'courtier-impressive-performance',
        featId: 'feat-impressive-performance',
        featName: 'Performance Impressionante',
        originalName: 'Impressive Performance',
        featType: 'skill',
      },
    ],
    specialAbilities: [
      {
        id: 'courtier-play-it-off',
        name: 'Desconversar em Cena',
        originalName: 'Play It Off',
        actionType: 'free',
        frequency: '1 vez por dia',
        description:
          '(Fortuna.) Se falhar, mas não criticamente, num teste para Causar Impressão, pode tratar como parte de uma apresentação e rolar de novo.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=401',
  },
  {
    id: HERITAGE_SHADOW_HERMIT_WAYANG_ID,
    ancestryId: ANCESTRY_WAYANG_ID,
    name: 'Sombra do Eremita',
    originalName: 'Shadow of the Hermit',
    description:
      'Sua sombra parece cheia de segredos — segredos que compartilha com você. Escolha um truque da lista oculta. Você o conjura como magia inata oculta à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 72,
    rulesSummary:
      '1 truque inato oculto à vontade, elevado à metade do nível. Anote o truque escolhido.',
    specialAbilities: [
      {
        id: 'hermit-cantrip',
        name: 'Truque da Sombra',
        originalName: 'Shadow Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura um truque da lista oculta como magia inata oculta à vontade, elevado à metade do seu nível (arredondado para cima).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=402',
  },
  {
    id: HERITAGE_SHADOW_SAILOR_WAYANG_ID,
    ancestryId: ANCESTRY_WAYANG_ID,
    name: 'Sombra do Marinheiro',
    originalName: 'Shadow of the Sailor',
    description:
      'Sua sombra esvoaça na superfície da água — e você também. Pode andar na superfície de água parada e outros líquidos não danosos, com metade do Deslocamento. Em água corrente, ainda se move com metade do Deslocamento, mas precisa passar num teste de Acrobacia para Equilibrar-se usando a CD de um teste de Atletismo para Nadar naquela água; em caso de falha, cai na água. Esse teste de Acrobacia não gasta uma ação.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 72,
    rulesSummary:
      'Andar sobre água parada (½ desloc.); água corrente: Acrobacia para Equilibrar (CD de Nadar), sem gastar ação.',
    specialAbilities: [
      {
        id: 'sailor-water-walk',
        name: 'Passo na Sombra d’Água',
        originalName: 'Shadow Water Walk',
        actionType: 'passive',
        description:
          'Anda na superfície de líquidos não danosos com metade do Deslocamento. Em correnteza, teste de Acrobacia para Equilibrar (CD de Nadar); falha = cai na água. O teste não gasta ação.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=403',
  },
  {
    id: HERITAGE_SHADOW_SMITH_WAYANG_ID,
    ancestryId: ANCESTRY_WAYANG_ID,
    name: 'Sombra do Ferreiro',
    originalName: 'Shadow of the Smith',
    description:
      'Sua sombra é espessa e líquida, como se pudesse temperar o melhor minério. Você ganha a ação Inscrever Pamor de Sombra.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 72,
    rulesSummary:
      '1×/minuto: próxima pancada, se acertar, deixa o alvo ofuscado até o seu próximo turno (Interagir para rasgar); crítico: não dá para rasgar.',
    specialAbilities: [
      {
        id: 'smith-inscribe-shadow-pamor',
        name: 'Inscrever Pamor de Sombra',
        originalName: 'Inscribe Shadow Pamor',
        actionType: 'one',
        frequency: '1 vez por minuto',
        description:
          '(Oculta, sombra.) Você mergulha o punho ou a arma na sombra, envolvendo-a num padrão ondulante de escuridão. Se a próxima ação for um Golpe, as sombras grudam no inimigo. Em um acerto, o alvo fica ofuscado até o início do seu próximo turno e pode usar Interagir para rasgar as sombras e remover ofuscado. Em um crítico, as sombras são teimosas demais e não podem ser rasgadas.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=404',
  },
  {
    id: HERITAGE_SHADOW_WANDERER_WAYANG_ID,
    ancestryId: ANCESTRY_WAYANG_ID,
    name: 'Sombra do Errante',
    originalName: 'Shadow of the Wanderer',
    description:
      'Sua sombra dispara à frente, abrindo o caminho. Seu Deslocamento aumenta em 1,5 metro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 72,
    rulesSummary: 'Deslocamento +1,5 m (30 pés no total).',
    speedOverride: 30,
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=405',
  },
]
