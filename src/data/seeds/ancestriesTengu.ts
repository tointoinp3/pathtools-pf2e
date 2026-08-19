import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'

export const ANCESTRY_TENGU_ID = 'ancestry-tengu'

export const HERITAGE_DOGTOOTH_TENGU_ID = 'heritage-dogtooth-tengu'
export const HERITAGE_JINXED_TENGU_ID = 'heritage-jinxed-tengu'
export const HERITAGE_MOUNTAINKEEPER_TENGU_ID = 'heritage-mountainkeeper-tengu'
export const HERITAGE_SKYBORN_TENGU_ID = 'heritage-skyborn-tengu'
export const HERITAGE_STORMTOSSED_TENGU_ID = 'heritage-stormtossed-tengu'
export const HERITAGE_TALONED_TENGU_ID = 'heritage-taloned-tengu'
export const HERITAGE_WAVEDIVER_TENGU_ID = 'heritage-wavediver-tengu'

/** Tengu — Player Core 2 (Remaster), Archives of Nethys ID 83 */
export const tenguAncestry: Ancestry = {
  id: ANCESTRY_TENGU_ID,
  name: 'Tengu',
  originalName: 'Tengu',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 32,
  hitPoints: 6,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'tengu-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'tengu-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: [],
  languages: {
    automatic: ['Comum', 'Tengu'],
    additionalOptions: ['Anão', 'Elfo', 'Halfling', 'Gnomo', 'Goblin', 'Feérico'],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'tengu-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'tengu-sharp-beak',
      name: 'Bico Afiado',
      originalName: 'Sharp Beak',
      actionType: 'passive',
      description:
        'Com seu bico afiado, você nunca fica sem uma arma. Você tem um ataque desarmado de bico que causa 1d6 de dano perfurante. Seu bico está no grupo briga e tem os traços finura e desarmado.',
    },
  ],
  traits: ['Tengu', 'Humanoide'],
  lore: {
    summary:
      'Tengu são humanoides aviários sociáveis e engenhosos, que acumulam conhecimento e tesouros por igual.',
    youMight: [
      'Ser sociável e ansioso para encontrar um bando seu.',
      'Absorver vorazmente as práticas de quem está ao seu redor, às vezes até esquecendo de onde vieram.',
    ],
    othersProbably: [
      'Ficam confusos com seu respeito simultâneo e desprezo pela tradição.',
      'Têm dificuldade para ler suas expressões ou o veem com suspeita e superstição.',
    ],
    physicalDescription:
      'Tengu têm muitas características aviárias. O rosto termina em bico afiado; antebraços e pernas escamados terminam em garras. Como calçados fechados costumam não servir bem sem serem feitos sob medida, muitos usam sandálias abertas ou vão descalços. Raramente passam de 1,50 m e são ainda mais leves do que o porte pequeno sugere, pois têm ossos ocos. Uma pequena parcela possui asas vestigiais.',
    society:
      'A maior divisão na sociedade tengu é entre os que permanecem no lar ancestral e os dispersos pelo mundo. Tengu chamam esses grupos de “no poleiro” e “em migração”. Os do poleiro tendem a ser mais tradicionalistas e conservadores, especialmente preocupados em preservar a cultura diante de anos de erosão pela opressão. Os migrantes, por outro lado, absorvem vorazmente a cultura das nações e assentamentos que agora chamam de lar.',
    beliefs:
      'Tengu costumam seguir a fé da região em que foram criados, embora a divindade ancestral tengu seja o deus das tempestades Hei Feng. Antes da diáspora, praticavam uma fé sincrética que misturava culto politeísta às divindades responsáveis pelo mundo natural. Como o folclore tengu diz que desceram do céu noturno em estrelas cadentes para repousar nos picos mais altos de Golarion, ritos animistas eram praticados em montanhas e outras grandes feições naturais.',
    popularEdicts: [
      'Proteger tradições tengu',
      'Adotar lições de outras culturas',
      'Buscar maravilhas naturais',
    ],
    popularAnathema: ['Perder o controle das emoções'],
    sampleNames: [
      'Arkkak',
      'Chuko',
      'Dolgra',
      'Dorodara',
      'Kakkariel',
      'Kora',
      'Marrak',
      'Mossarah',
      'Pularrka',
      'Rarorel',
      'Ruk',
      'Ruyo',
      'Taicho',
      'Tak-Tak',
      'Tsukotarra',
    ],
  },
  heritageIds: [
    HERITAGE_DOGTOOTH_TENGU_ID,
    HERITAGE_JINXED_TENGU_ID,
    HERITAGE_MOUNTAINKEEPER_TENGU_ID,
    HERITAGE_SKYBORN_TENGU_ID,
    HERITAGE_STORMTOSSED_TENGU_ID,
    HERITAGE_TALONED_TENGU_ID,
    HERITAGE_WAVEDIVER_TENGU_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=83',
}

export const tenguHeritages: Heritage[] = [
  {
    id: HERITAGE_DOGTOOTH_TENGU_ID,
    ancestryId: ANCESTRY_TENGU_ID,
    name: 'Tengu Denteado',
    originalName: 'Dogtooth Tengu',
    description:
      'Além do bico, sua boca também tem dentes pontiagudos e ferozes. Algumas lendas dizem que suas mandíbulas poderosas podem até morder aço — você ainda não é tão forte, mas seus dentes podem deixar feridas terríveis. Seu ataque desarmado de bico ganha o traço mortal d8.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 33,
    rulesSummary: 'Bico desarmado ganha mortal d8.',
    specialAbilities: [
      {
        id: 'dogtooth-deadly-beak',
        name: 'Bico Mortal',
        originalName: 'Deadly Beak',
        actionType: 'passive',
        description:
          'Seu ataque desarmado de bico ganha o traço mortal d8.',
      },
    ],
  },
  {
    id: HERITAGE_JINXED_TENGU_ID,
    ancestryId: ANCESTRY_TENGU_ID,
    name: 'Tengu Amaldiçoado',
    originalName: 'Jinxed Tengu',
    description:
      'Sua linhagem foi exposta a maldição após maldição, e agora elas escorregam de suas penas como chuva. Se obtiver sucesso em uma salvaguarda contra um efeito de maldição ou infortúnio, o resultado vira sucesso crítico. Quando ganharia a condição condenado, faça um teste simples CD 17. Em sucesso, reduza em 1 o valor de condenado que ganharia.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 33,
    rulesSummary:
      'Sucesso → crítico vs maldição/infortúnio; CD 17 reduz condenado em 1.',
  },
  {
    id: HERITAGE_MOUNTAINKEEPER_TENGU_ID,
    ancestryId: ANCESTRY_TENGU_ID,
    name: 'Tengu Guardião da Montanha',
    originalName: 'Mountainkeeper Tengu',
    description:
      'Você vem de uma linhagem de ascetas tengu, o que lhe deixa um vínculo com os espíritos do mundo e do Grande Além. Pode conjurar o truque chicote de vitalidade como magia primal inata à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Sempre que conjurar uma magia de uma herança ou feito de ancestralidade tengu, pode decidir se é divina ou primal.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 33,
    rulesSummary:
      'Chicote de vitalidade primal inato à vontade; magias tengu podem ser divinas ou primais.',
    specialAbilities: [
      {
        id: 'mountainkeeper-vitality-lash',
        name: 'Chicote de Vitalidade',
        originalName: 'Vitality Lash',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura chicote de vitalidade como truque primal inato à vontade. Magias de heranças e feitos tengu podem ser divinas ou primais.',
      },
    ],
  },
  {
    id: HERITAGE_SKYBORN_TENGU_ID,
    ancestryId: ANCESTRY_TENGU_ID,
    name: 'Tengu Nascido do Céu',
    originalName: 'Skyborn Tengu',
    description:
      'Seus ossos podem ser especialmente leves, você pode ser um tengu raro com asas, ou seu vínculo com espíritos do vento e do céu pode ser mais forte que o usual, retardando sua queda pelo ar. Você não sofre dano de queda, independentemente da distância.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 33,
    rulesSummary: 'Imune a dano de queda.',
  },
  {
    id: HERITAGE_STORMTOSSED_TENGU_ID,
    ancestryId: ANCESTRY_TENGU_ID,
    name: 'Tengu Atormentado pela Tempestade',
    originalName: 'Stormtossed Tengu',
    description:
      'Seja por uma bênção de Hei Feng ou por ter chocado do ovo durante uma tempestade, você é resistente a tempestades. Ganha resistência a eletricidade igual à metade do seu nível (mínimo 1). Obtém sucesso automático no teste simples para mirar uma criatura oculta se ela estiver oculta apenas por chuva ou neblina.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 33,
    rulesSummary:
      'Resistência a eletricidade = metade do nível (mín. 1); sucesso auto vs oculto por chuva/neblina.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'electricity',
        label: 'Resistência a eletricidade',
      },
    ],
  },
  {
    id: HERITAGE_TALONED_TENGU_ID,
    ancestryId: ANCESTRY_TENGU_ID,
    name: 'Tengu Garrudo',
    originalName: 'Taloned Tengu',
    description:
      'Suas garras são tão afiadas e fortes quanto seu bico. Você ganha um ataque desarmado de garras que causa 1d4 de dano cortante. Suas garras estão no grupo briga e têm os traços ágil, finura, desarmado e versátil P.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 33,
    rulesSummary:
      'Garras desarmadas 1d4 cortante (briga, ágil, finura, desarmado, versátil P).',
    specialAbilities: [
      {
        id: 'taloned-talons',
        name: 'Garras',
        originalName: 'Talons',
        actionType: 'passive',
        description:
          'Ataque desarmado de garras: 1d4 cortante, grupo briga, traços ágil, finura, desarmado e versátil P.',
      },
    ],
  },
  {
    id: HERITAGE_WAVEDIVER_TENGU_ID,
    ancestryId: ANCESTRY_TENGU_ID,
    name: 'Tengu Mergulhador',
    originalName: 'Wavediver Tengu',
    description:
      'Você é um dos raros tengu que cortam a água como um pássaro corta o ar, e muitas vezes espreita em rios ou oceanos onde poucos esperam encontrá-lo. Você ganha deslocamento de natação de 4,5 metros.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 33,
    rulesSummary: 'Deslocamento de natação 4,5 m (15 pés).',
    specialAbilities: [
      {
        id: 'wavediver-swim',
        name: 'Natação Natural',
        originalName: 'Swim Speed',
        actionType: 'passive',
        description: 'Deslocamento de natação de 4,5 metros (15 pés).',
      },
    ],
  },
]
