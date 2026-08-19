import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'

export const ANCESTRY_KHOLO_ID = 'ancestry-kholo'

export const HERITAGE_ANT_KHOLO_ID = 'heritage-ant-kholo'
export const HERITAGE_CAVE_KHOLO_ID = 'heritage-cave-kholo'
export const HERITAGE_DOG_KHOLO_ID = 'heritage-dog-kholo'
export const HERITAGE_GREAT_KHOLO_ID = 'heritage-great-kholo'
export const HERITAGE_SWEETBREATH_KHOLO_ID = 'heritage-sweetbreath-kholo'
export const HERITAGE_WINTER_KHOLO_ID = 'heritage-winter-kholo'
export const HERITAGE_WITCH_KHOLO_ID = 'heritage-witch-kholo'

/** Kholo — Player Core 2 (Remaster), Archives of Nethys ID 79 */
export const kholoAncestry: Ancestry = {
  id: ANCESTRY_KHOLO_ID,
  name: 'Kholo',
  originalName: 'Kholo',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 16,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'kholo-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'kholo-boost-int',
      label: 'Boost de Inteligência',
      option: { kind: 'specific', attributes: ['intelligence'] },
    },
    {
      id: 'kholo-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['wisdom'],
  languages: {
    automatic: ['Comum', 'Kholo'],
    additionalOptions: [
      'Dracônico',
      'Elfo',
      'Feérico',
      'Iruxi',
      'Necril',
      'Orc',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'kholo-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'kholo-bite',
      name: 'Mordida',
      originalName: 'Bite',
      actionType: 'passive',
      description:
        'Seus dentes afiados e mandíbulas poderosas são armas temíveis. Você ganha um ataque desarmado de mandíbulas que causa 1d6 de dano perfurante. Suas mandíbulas estão no grupo briga.',
    },
  ],
  traits: ['Kholo', 'Humanoide'],
  lore: {
    summary:
      'Kholos são humanoides de cabeça de hiena (antigos gnolls, no remaster) que abraçam o pragmatismo e a eficiência. Caçadores e saqueadores por tradição, vivem em matilhas e valorizam vitória tática acima de honra ou crueldade gratuita.',
    youMight: [
      'Ser fisicamente demonstrativo — abraçar, socar ou lamber amigos como forma de afeto.',
      'Guardar um osso de parente querido para pedir conselhos.',
    ],
    othersProbably: [
      'Se intimidam com seu tamanho, dentes e risada inquietante.',
      'Respeitam a eficiência brutal do seu estilo de caça.',
    ],
    physicalDescription:
      'Kholos lembram hienas humanoides, com focinhos curtos, dentes afiados e orelhas redondas grandes e expressivas. O corpo é coberto de pelagem áspera nas costas e mais macia e clara no ventre e na garganta, em tons off-white, bege ou marrom; manchas e listras são comuns. Em geral medem entre 1,80 e 2,10 m. Mulheres costumam ser cerca de uma cabeça mais altas que homens e correspondentemente mais fortes. São considerados adultos aos 15 anos e vivem cerca de 60 anos.',
    society:
      'Kholos vivem em clãs semi-nômades de 10 a 20 grupos familiares, com 100 a 200 membros. Um conselho de kholos mulheres — em geral anciãs de cada família — governa o clã. Guardiões de ossos cuidam dos ancestrais e deuses, adornando roupas e moradias com ossos ancestrais. Contadores de histórias são professores e sábios, esperados a conhecer história do clã, tradição oral regional e tudo mais relevante ao grupo. A caça, o saque oportunista e emboscadas bem planejadas são tradições centrais.',
    beliefs:
      'Kholos têm uma abordagem direta e sem sentimentalismo da vida, priorizando resultados sobre métodos. Costumam ser leais e generosos com os seus e impiedosos com forasteiros — se isso é aceitável depende de quem consideram “seu povo”. Muitos reverenciam Lamashtu como origem do povo e guia num mundo caótico; outros honram Calistria e Shelyn. Nethys é patrona dos guardiões de ossos. Práticas de veneração ancestral e endocannibalismo reverencial — consumir os mortos em festa solene e transformar ossos em arte ou armas — são mal compreendidas fora do clã.',
    popularEdicts: [
      'Fortalecer aliados e companheiros de matilha',
      'Recontar os contos dos ancestrais',
      'Neutralizar inimigos com tática e astúcia',
    ],
    popularAnathema: [
      'Arriscar a si ou à matilha sem motivo',
      'Deixar um kholo morto ou ente querido apodrecer como carcaça',
    ],
    sampleNames: [
      'Droha',
      'Gnarl',
      'Baobá',
      'Chacal',
      'Onix Elefante nas Sombras',
      'Espinho Vermelho',
      'Caniço de Ferro Intocado',
      'Acácia Branca',
      'Dente Saudoso',
      'Pica-pau',
    ],
  },
  heritageIds: [
    HERITAGE_ANT_KHOLO_ID,
    HERITAGE_CAVE_KHOLO_ID,
    HERITAGE_DOG_KHOLO_ID,
    HERITAGE_GREAT_KHOLO_ID,
    HERITAGE_SWEETBREATH_KHOLO_ID,
    HERITAGE_WINTER_KHOLO_ID,
    HERITAGE_WITCH_KHOLO_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=79',
}

export const kholoHeritages: Heritage[] = [
  {
    id: HERITAGE_ANT_KHOLO_ID,
    ancestryId: ANCESTRY_KHOLO_ID,
    name: 'Kholo Formiga',
    originalName: 'Ant Kholo',
    description:
      'Você é um kholo de traços finos e orelhas grandes, com cerca de 90 cm de altura. Muitos duvidam que você seja de fato um kholo. Seu tamanho é Pequeno em vez de Médio. Você fica treinado em Enganação (ou em outra perícia se já fosse treinado em Enganação). Recebe +1 de bônus de circunstância a testes de Enganação para Mentir quando alega inocência especificamente, à CD de Enganação contra testes de Perceber Motivação para descobrir essas mentiras, e a testes de iniciativa quando rolar Enganação para iniciativa.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 17,
    rulesSummary:
      'Tamanho Pequeno; treinado em Enganação; +1 Mentir (inocência), CD vs Perceber Motivação e iniciativa (Enganação).',
    skillGrants: [{ id: 'ant-kholo-deception', skillId: 'deception', rank: 'trained', replaceIfTrained: true }],
  },
  {
    id: HERITAGE_CAVE_KHOLO_ID,
    ancestryId: ANCESTRY_KHOLO_ID,
    name: 'Kholo da Caverna',
    originalName: 'Cave Kholo',
    description:
      'Contadores de histórias falam de tempos antigos em que kholos viviam em cavernas e no subsolo antes de a maioria do povo aventurar-se à luz. Você é um resquício desses ancestrais, com peito largo e marcas que lembram traços pretos curtos em vez de manchas. Seus olhos se desenvolveram para enxergar perfeitamente no escuro — uma vantagem valiosa para o clã. Você ganha visão no escuro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 17,
    rulesSummary: 'Ganha visão no escuro.',
    specialAbilities: [
      {
        id: 'cave-kholo-darkvision',
        name: 'Visão no Escuro',
        originalName: 'Darkvision',
        actionType: 'passive',
        description:
          'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
      },
    ],
  },
  {
    id: HERITAGE_DOG_KHOLO_ID,
    ancestryId: ANCESTRY_KHOLO_ID,
    name: 'Kholo Cão',
    originalName: 'Dog Kholo',
    description:
      'Você é um kholo ágil, de corpo quase pré-histórico e aparência canina. Embora normalmente se mova como quadrúpede, ainda pode ficar de pé e lutar como bípede, usando equipamento normalmente. Se tiver as duas mãos livres, pode aumentar seu deslocamento para 30 pés correndo em quatro patas.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 17,
    rulesSummary:
      'Com ambas as mãos livres, deslocamento 30 pés correndo em quatro patas.',
  },
  {
    id: HERITAGE_GREAT_KHOLO_ID,
    ancestryId: ANCESTRY_KHOLO_ID,
    name: 'Kholo Grande',
    originalName: 'Great Kholo',
    description:
      'Você é um kholo imponente e poderoso, com pelagem amarelada e manchas marrons. Recebe 10 PV da ancestralidade em vez de 8 e +1 de bônus de circunstância a testes de Atletismo para Reposicionar, Empurrar ou Derrubar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 17,
    rulesSummary:
      '10 PV (em vez de 8); +1 Atletismo para Reposicionar, Empurrar ou Derrubar.',
    hitPointsOverride: 10,
    specialAbilities: [
      {
        id: 'great-kholo-ancestry-hp',
        name: 'Vitalidade Imponente',
        originalName: 'Great Kholo Hit Points',
        actionType: 'passive',
        description: 'Você recebe 10 PV da ancestralidade em vez de 8.',
      },
    ],
  },
  {
    id: HERITAGE_SWEETBREATH_KHOLO_ID,
    ancestryId: ANCESTRY_KHOLO_ID,
    name: 'Kholo de Hálito Doce',
    originalName: 'Sweetbreath Kholo',
    description:
      'Você é um kholo listrado de pelagem pálida, com hálito estranhamente agradável que pode usar para encantar presas. Você fica treinado em Diplomacia (ou em outra perícia se já fosse treinado em Diplomacia). Também recebe +1 de bônus de circunstância a testes para Causar Boa Impressão se o alvo puder sentir seu hálito.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 17,
    rulesSummary:
      'Treinado em Diplomacia; +1 Causar Boa Impressão se o alvo sentir seu hálito.',
    skillGrants: [{ id: 'sweetbreath-kholo-diplomacy', skillId: 'diplomacy', rank: 'trained', replaceIfTrained: true }],
  },
  {
    id: HERITAGE_WINTER_KHOLO_ID,
    ancestryId: ANCESTRY_KHOLO_ID,
    name: 'Kholo do Inverno',
    originalName: 'Winter Kholo',
    description:
      'Você é um kholo resistente, coberto de pelagem grossa e tufoada que o permite sobreviver aos invernos rigorosos dos territórios mais frios. Recebe resistência a frio igual à metade do seu nível (mínimo 1). Trata efeitos ambientais de frio como se fossem um grau menos extremos (frio incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 17,
    rulesSummary:
      'Resistência a frio = metade do nível (mín. 1); frio ambiental um grau menos extremo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'cold',
        label: 'Resistência a frio',
      },
    ],
  },
  {
    id: HERITAGE_WITCH_KHOLO_ID,
    ancestryId: ANCESTRY_KHOLO_ID,
    name: 'Kholo Bruxo',
    originalName: 'Witch Kholo',
    description:
      'Você é um kholo peludo e de pelagem escura, capaz de produzir sons verdadeiramente inquietantes. Pode conjurar o truque figmento como magia oculta inata à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Além disso, recebe +1 de bônus de circunstância a testes para Criar Distração e Personificar quando usar apenas a voz.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 17,
    rulesSummary:
      'Figmento (oculto inato) à vontade; +1 Criar Distração / Personificar só com a voz.',
    specialAbilities: [
      {
        id: 'witch-kholo-figment',
        name: 'Figmento',
        originalName: 'Figment',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura o truque figmento como magia oculta inata à vontade, elevado à metade do seu nível (arredondado para cima).',
      },
    ],
  },
]
