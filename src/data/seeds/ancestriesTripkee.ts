import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  SOURCE_HIGH_SEAS_ID,
  SOURCE_PLAYER_CORE_2_ID,
} from './sources'

export const ANCESTRY_TRIPKEE_ID = 'ancestry-tripkee'

export const HERITAGE_CAMOUFLAGE_TRIPKEE_ID = 'heritage-camouflage-tripkee'
export const HERITAGE_POISONHIDE_TRIPKEE_ID = 'heritage-poisonhide-tripkee'
export const HERITAGE_RIVERSIDE_TRIPKEE_ID = 'heritage-riverside-tripkee'
export const HERITAGE_SNAPTONGUE_TRIPKEE_ID = 'heritage-snaptongue-tripkee'
export const HERITAGE_STICKYTOE_TRIPKEE_ID = 'heritage-stickytoe-tripkee'
export const HERITAGE_THICKSKIN_TRIPKEE_ID = 'heritage-thickskin-tripkee'
export const HERITAGE_WINDWEB_TRIPKEE_ID = 'heritage-windweb-tripkee'

/** Tripkee — Player Core 2 (Remaster), Archives of Nethys ID 84 */
export const tripkeeAncestry: Ancestry = {
  id: ANCESTRY_TRIPKEE_ID,
  name: 'Tripkee',
  originalName: 'Tripkee',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 36,
  hitPoints: 6,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'tripkee-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'tripkee-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'tripkee-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['strength'],
  languages: {
    automatic: ['Comum', 'Tripkee'],
    additionalOptions: [
      'Boggard',
      'Chthonian',
      'Dracônico',
      'Elfo',
      'Feérico',
      'Iruxi',
      'Thalassic',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'tripkee-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'tripkee-natural-climber',
      name: 'Escalador Natural',
      originalName: 'Natural Climber',
      actionType: 'passive',
      description:
        'Você recebe +2 de bônus de circunstância a testes de Atletismo para Escalar.',
    },
  ],
  traits: ['Tripkee', 'Humanoide'],
  lore: {
    summary:
      'Tripkees são humanoides semelhantes a sapos e pererecas cujo espírito frequentemente supera sua estatura — sobreviventes reclusos das copas das selvas que moldam o ambiente com astúcia e ferramentas simples.',
    youMight: [
      'Buscar maneiras inteligentes de explorar o ambiente ao superar desafios.',
      'Fazer amizades devagar, receoso com histórias de alerta sobre estranhos exploradores.',
    ],
    othersProbably: [
      'Confiam na sua abordagem imparcial e ponderada para entender situações e resolver problemas.',
      'Mantêm distância, temendo que tocá-lo seja tóxico.',
    ],
    physicalDescription:
      'Tripkees lembram pererecas humanoides, com olhos enormes, bocas largas e corpos esguios. Estruturas leves e dedos dos pés grandes garantem excelente aderência ao escalar; a pele colorida oferece camuflagem confiável que varia conforme o ambiente — verde e marrom em grupos da selva, azul e laranja em comunidades ribeirinhas, e muitas outras tonalidades entre elas. Um tripkee cresce rápido, atingindo o tamanho adulto de cerca de 60 cm cerca de 3 anos após a eclosão, embora só seja considerado adulto por volta dos 12 anos. Raramente vivem além dos 60 anos, embora indivíduos excepcionais ocasionalmente cheguem a um século.',
    society:
      'Tripkees levam um estilo de vida sofisticado de caça e coleta, remodelando a paisagem às suas necessidades: construindo represas para prender peixes, semeando árvores frutíferas, plantando folhagens que concedem cobertura para caçadas futuras e outras técnicas que muitas vezes escapam ao olhar de um agricultor. Essas estratégias dependem de cooperação comunitária e populações dispersas, então tripkees costumam viver em pequenas aldeias, cada uma parte de uma teia complexa de alianças e relações. O recluso preservou vidas e modos de vida tripkee por milênios, mas eles se veem cada vez mais ameaçados por males antigos e novos exploradores.',
    beliefs:
      'Ensinados a esperar, observar e respeitar os processos naturais de vida e morte, muitos tripkees adotam atitudes pacientes. Aqueles que assumem um papel mais ativo na repressão da crueldade podem integrar organizações que misturam religião e filosofia, como os guardiões de demônios tripkee que absorvem um ser profano em sua alma para contê-lo e, eventualmente, transformar sua maldade por meio de atos virtuosos. Divindades da natureza como Gozreh ou Erastil frequentemente conquistam o respeito dos tripkees, mas comunidades costumam preferir divindades menos proeminentes e mais íntimas, como lordes empíreos, condutores psicopompos ou os Anciões feéricos.',
    popularEdicts: [
      'Melhorar sua parte do mundo sem causar dano a outros',
      'Praticar paciência sempre que possível',
    ],
    popularAnathema: [
      'Criar arquitetura que substitua o mundo natural',
      'Tomar ações precipitadas que tragam risco à sua comunidade',
    ],
    sampleNames: [
      'Aalpo\'ol',
      'Bogwynne',
      'Ctaprak',
      'Eegru',
      'Gpoun',
      'Gruoksh',
      'Hrrauti',
      'Iopo',
      'Iykiki',
      'Kyrsiik',
      'Mhruugu',
      'Oplugo',
      'Quaasol',
      'Yolkuu',
      'Ztaal',
    ],
  },
  heritageIds: [
    HERITAGE_CAMOUFLAGE_TRIPKEE_ID,
    HERITAGE_POISONHIDE_TRIPKEE_ID,
    HERITAGE_RIVERSIDE_TRIPKEE_ID,
    HERITAGE_SNAPTONGUE_TRIPKEE_ID,
    HERITAGE_STICKYTOE_TRIPKEE_ID,
    HERITAGE_THICKSKIN_TRIPKEE_ID,
    HERITAGE_WINDWEB_TRIPKEE_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=84',
}

export const tripkeeHeritages: Heritage[] = [
  {
    id: HERITAGE_CAMOUFLAGE_TRIPKEE_ID,
    ancestryId: ANCESTRY_TRIPKEE_ID,
    name: 'Tripkee Camuflagem',
    originalName: 'Camouflage Tripkee',
    description:
      'O padrão da sua pele imita naturalmente terreno e folhagem. Escolha terreno aquático, florestal ou pântano. No terreno escolhido, você pode Esconder-se ou Furtar-se sem cobertura ou sem estar oculto.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HIGH_SEAS_ID,
    sourcePage: 21,
    rulesSummary:
      'Escolha aquático/floresta/pântano; Esconder-se/Furtar-se sem cobertura ou oculto no terreno.',
    choices: [
      {
        id: 'camouflage-terrain',
        label: 'Terreno de camuflagem',
        options: [
          { id: 'aquatic', label: 'Aquático', originalLabel: 'Aquatic' },
          { id: 'forest', label: 'Florestal', originalLabel: 'Forest' },
          { id: 'swamp', label: 'Pântano', originalLabel: 'Swamp' },
        ],
      },
    ],
  },
  {
    id: HERITAGE_POISONHIDE_TRIPKEE_ID,
    ancestryId: ANCESTRY_TRIPKEE_ID,
    name: 'Tripkee Pele Venenosa',
    originalName: 'Poisonhide Tripkee',
    description:
      'Você pode ser pequeno, mas as glândulas venenosas escondidas pelo seu corpo guardam uma defesa mortal. Você ganha a reação Pele Tóxica. Pele Tóxica [reação] (veneno) Frequência uma vez por hora; Gatilho: uma criatura toca você, como ao Agarrar você, acertar você com um ataque desarmado ou usar uma magia de alcance toque contra você; Efeito: você exala uma toxina mortal. A criatura gatilho sofre 1d4 de dano de veneno (salvaguarda básica de Fortitude usando sua CD de classe ou CD de magia, o que for maior). No 3º nível e a cada 2 níveis depois, o dano aumenta em 1d4.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 37,
    rulesSummary:
      'Pele Tóxica 1×/hora: 1d4 veneno (+1d4 a cada 2 níveis a partir do 3º); salvaguarda básica de Fortitude.',
    specialAbilities: [
      {
        id: 'poisonhide-toxic-skin',
        name: 'Pele Tóxica',
        originalName: 'Toxic Skin',
        actionType: 'reaction',
        frequency: '1 por hora',
        description:
          'Quando uma criatura toca você, exala toxina: 1d4 de dano de veneno (salvaguarda básica de Fortitude com CD de classe ou magia). Dano aumenta em 1d4 no 3º nível e a cada 2 níveis.',
      },
    ],
  },
  {
    id: HERITAGE_RIVERSIDE_TRIPKEE_ID,
    ancestryId: ANCESTRY_TRIPKEE_ID,
    name: 'Tripkee Ribeirinho',
    originalName: 'Riverside Tripkee',
    description:
      'Seus ancestrais viviam em e sobre a água. Você ganha deslocamento de natação de 4,5 metros (15 pés).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 37,
    rulesSummary: 'Deslocamento de natação 4,5 m (15 pés).',
    specialAbilities: [
      {
        id: 'riverside-swim',
        name: 'Natação Ribeirinha',
        originalName: 'Swim Speed',
        actionType: 'passive',
        description: 'Deslocamento de natação de 4,5 metros.',
      },
    ],
  },
  {
    id: HERITAGE_SNAPTONGUE_TRIPKEE_ID,
    ancestryId: ANCESTRY_TRIPKEE_ID,
    name: 'Tripkee Língua Estala',
    originalName: 'Snaptongue Tripkee',
    description:
      'Sua língua é especialmente longa e você pode lançá-la com alcance e precisão extraordinários. Você pode usar a língua para entregar magias de alcance toque e realizar ações Interagir extremamente simples, como abrir alguns tipos de portas destrancadas. Sua língua não pode realizar ações que exijam dedos ou destreza manual significativa, incluindo qualquer ação que exigiria um teste, e você não pode usá-la para segurar itens.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 37,
    rulesSummary:
      'Língua entrega magias toque e Interagir simples; sem dedos, testes ou segurar itens.',
  },
  {
    id: HERITAGE_STICKYTOE_TRIPKEE_ID,
    ancestryId: ANCESTRY_TRIPKEE_ID,
    name: 'Tripkee Pé Pegajoso',
    originalName: 'Stickytoe Tripkee',
    description:
      'Suas mãos e pés exalam um filme que as ajuda a aderir a superfícies. Você recebe +2 de bônus de circunstância às suas CDs de Fortitude e Reflexos contra tentativas de Desarmar, Empurrar, Reposicionar ou Derrubar você. Ao subir árvores, cipós e outra folhagem, se obtiver sucesso em um teste de Atletismo para Escalar, o resultado vira sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 37,
    rulesSummary:
      '+2 CD Fort/Ref vs Desarmar/Empurrar/Reposicionar/Derrubar; sucesso→crítico ao Escalar folhagem.',
  },
  {
    id: HERITAGE_THICKSKIN_TRIPKEE_ID,
    ancestryId: ANCESTRY_TRIPKEE_ID,
    name: 'Tripkee Pele Grossa',
    originalName: 'Thickskin Tripkee',
    description:
      'Sua pele grossa e coriácea lembra a de um sapo. Você recebe 8 PV da ancestralidade em vez de 6. Você recebe +1 de bônus de circunstância a salvaguardas contra doenças e venenos.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 37,
    rulesSummary:
      '8 PV (em vez de 6); +1 salvaguardas vs doenças e venenos.',
    hitPointsOverride: 8,
    specialAbilities: [
      {
        id: 'thickskin-ancestry-hp',
        name: 'Vitalidade Coriácea',
        originalName: 'Thickskin Hit Points',
        actionType: 'passive',
        description: 'Você recebe 8 PV da ancestralidade em vez de 6.',
      },
    ],
  },
  {
    id: HERITAGE_WINDWEB_TRIPKEE_ID,
    ancestryId: ANCESTRY_TRIPKEE_ID,
    name: 'Tripkee Teia de Vento',
    originalName: 'Windweb Tripkee',
    description:
      'Teia resistente ao longo das mãos e dos dedos dos pés pode amortecer qualquer queda. Enquanto tiver uma mão livre, você não sofre dano de queda, independentemente da distância.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 37,
    rulesSummary: 'Sem dano de queda com uma mão livre.',
  },
]
