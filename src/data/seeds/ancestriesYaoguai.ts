import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_TIAN_XIA_CG_ID } from './sources'

export const ANCESTRY_YAOGUAI_ID = 'ancestry-yaoguai'

export const HERITAGE_BORN_OF_ANIMAL_ID = 'heritage-born-of-animal'
export const HERITAGE_BORN_OF_CELESTIAL_ID = 'heritage-born-of-celestial'
export const HERITAGE_BORN_OF_ELEMENTS_ID = 'heritage-born-of-elements'
export const HERITAGE_BORN_OF_ITEM_ID = 'heritage-born-of-item'
export const HERITAGE_BORN_OF_VEGETATION_ID = 'heritage-born-of-vegetation'

/** Yaoguai — Tian Xia Character Guide, Archives of Nethys ID 93 */
export const yaoguaiAncestry: Ancestry = {
  id: ANCESTRY_YAOGUAI_ID,
  name: 'Yaoguai',
  originalName: 'Yaoguai',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_TIAN_XIA_CG_ID,
  sourcePage: 82,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  extraChoices: [
    {
      id: 'yaoguai-humanoid-form',
      label: 'Forma humanoide',
      kind: 'options',
      required: true,
      hint: 'Ancestralidade humanoide comum da região onde você nasceu (em geral humano). A forma tem a mesma idade aparente e tipo de corpo da forma yaoguai.',
      options: [
        { id: 'human', label: 'Humano', originalLabel: 'Human' },
        { id: 'elf', label: 'Elfo', originalLabel: 'Elf' },
        { id: 'dwarf', label: 'Anão', originalLabel: 'Dwarf' },
        { id: 'gnome', label: 'Gnomo', originalLabel: 'Gnome' },
        { id: 'halfling', label: 'Halfling', originalLabel: 'Halfling' },
        { id: 'orc', label: 'Orc', originalLabel: 'Orc' },
        { id: 'tengu', label: 'Tengu', originalLabel: 'Tengu' },
        { id: 'other', label: 'Outra (anotar nas notas)', originalLabel: 'Other' },
      ],
    },
  ],
  attributeBoosts: [
    {
      id: 'yaoguai-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'yaoguai-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'yaoguai-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['intelligence'],
  languages: {
    automatic: ['Comum'],
    additionalOptions: [
      'Aklo',
      'Dracônico',
      'Elfo',
      'Feérico',
      'Kitsune',
      'Nagaji',
      'Sakvroth',
      'Tengu',
      'Ysoki',
    ],
    additionalFromIntelligence: true,
  },
  senses: [],
  specialAbilities: [
    {
      id: 'yaoguai-change-shape',
      name: 'Mudar Forma',
      originalName: 'Change Shape',
      actionType: 'one',
      description:
        '(Concentrar, oculta, polimorfia, yaoguai.) Você passa da forma yaoguai verdadeira para uma forma humanoide alternativa (ou o contrário) — uma ancestralidade humanoide Média comum da região onde nasceu (em geral humano). A forma tem a mesma idade aparente e tipo de corpo da forma yaoguai, com traços físicos análogos. Conta como criar um disfarce para Personificar (Enganação). Pode permanecer na forma humanoide indefinidamente, mas reverte à forma yaoguai após 1 hora inconsciente ou 1 minuto após a morte. Habilidades de herança distinguem forma humanoide e forma yaoguai.',
    },
  ],
  traits: ['Yaoguai', 'Humanoide'],
  lore: {
    summary:
      'Yaoguais em geral começam como animais, plantas ou objetos simples e despertam à sapiência pela cultivação. Metamorfos que escondem a forma verdadeira, buscam transcender a origem — ou aceitá-la e amassar poder.',
    youMight: [
      'Ficar atento a modos de obter, destravar ou treinar o poder até transcender o ser.',
      'Desconfiar de quem pode feri-lo, sobretudo outros yaoguais.',
      'Ofender-se quando questionam suas habilidades.',
    ],
    othersProbably: [
      'Mostram interesse ou awe pelos poderes que você tem.',
      'Ficam chocados ao saber que a forma verdadeira não é a que você mostra.',
      'Assumem que você é malicioso por natureza e inveja a sociedade.',
    ],
    physicalDescription:
      'A forma original pode ser quase qualquer coisa: se existe e banha-se nas condições certas por milênios, pode virar yaoguai. Herdam traços da forma pré-despertar — pelo e orelhas pontudas de animal, pele de pedra ou metal de objeto. Muitos viajam à noite, o que gera suspeita; por isso praticam a forma humanoide com afinco, mesmo que fiquem traços yaoguai. Alguns preferem essa forma incompleta pela facilidade de acessar os poderes; outros buscam a perfeição até ficarem indistinguíveis. Muitos nascem adultos. A expectativa de vida reflete o poder: os mais fortes rivalizam dragões, milhares de anos ou imortalidade.',
    society:
      'Há quem fique entre yaoguais, quem entre e saia de outras sociedades, e quem viva disfarçado. Enclaves de mesma origem formam famílias encontradas, com o mais velho como figura parental, ou dinâmicas mestre-aluno. Os que frequentam outras culturas costumam ser trapaceiros — as peças úteis ou de bom gosto duram mais. Entidades poderosas patrocinam yaoguais de má intenção, e a caça a yaoguais é indústria em Tian Xia; por isso quem vive disfarçado anda sozinho ou no máximo em trio.',
    beliefs:
      'A ideia de que yaoguais são maus por natureza é mito. A maioria pode ser tão heroica quanto qualquer aventureiro de Tian Xia. Enclaves reverenciam Shizuru e Tsukiyo, pois se crê que sol e lua concedem o despertar. Qi Zhong é citado como mestre do primeiro yaoguai que ascendeu à divindade, Sun Wukong — cujas histórias quase todos conhecem, mesmo que o Rei Macaco não seja culto popular.',
    popularEdicts: [
      'Descobrir o próprio nome',
      'Deixar boa impressão por onde passar',
      'Buscar modos de cultivar o poder e transcender a natureza',
    ],
    popularAnathema: [
      'Aceitar as limitações impostas a você',
      'Desafiar as leis do seu enclave',
      'Dispensar uma oportunidade de crescimento',
    ],
    sampleNames: [
      '“Lamplight” Deng',
      'Geomi',
      'Mindeulle',
      'Qing Yeliu',
      'Qiu Haitang',
      'Sekiko',
    ],
  },
  heritageIds: [
    HERITAGE_BORN_OF_ANIMAL_ID,
    HERITAGE_BORN_OF_CELESTIAL_ID,
    HERITAGE_BORN_OF_ELEMENTS_ID,
    HERITAGE_BORN_OF_ITEM_ID,
    HERITAGE_BORN_OF_VEGETATION_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=93',
}

export const yaoguaiHeritages: Heritage[] = [
  {
    id: HERITAGE_BORN_OF_ANIMAL_ID,
    ancestryId: ANCESTRY_YAOGUAI_ID,
    name: 'Nascido de Animal',
    originalName: 'Born of Animal',
    description:
      'Você era um animal simples até o sol iluminá-lo. Forma humanoide: animais sentem o poder da sua presença — +1 de bônus de circunstância a Intimidação contra animais e bestas, e você não sofre penalidade por Intimidar animais ou bestas com quem não compartilha idioma. Forma yaoguai: pode disparar como um animal; com as duas mãos livres, aumenta o Deslocamento para 9 metros ao correr de quatro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 84,
    rulesSummary:
      'Humanoide: +1 Intimidação vs animais/bestas (sem penalidade de idioma). Yaoguai: desloc. 9 m de quatro (duas mãos livres).',
    specialAbilities: [
      {
        id: 'animal-humanoid',
        name: 'Presença Bestial (forma humanoide)',
        originalName: 'Bestial Presence',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância a Intimidação contra animais e bestas; sem penalidade por não compartilhar idioma.',
      },
      {
        id: 'animal-yaoguai',
        name: 'Disparada (forma yaoguai)',
        originalName: 'Animal Dash',
        actionType: 'passive',
        description:
          'Com as duas mãos livres, seu Deslocamento sobe para 9 metros ao correr de quatro.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=412',
  },
  {
    id: HERITAGE_BORN_OF_CELESTIAL_ID,
    ancestryId: ANCESTRY_YAOGUAI_ID,
    name: 'Nascido de Celestial',
    originalName: 'Born of Celestial',
    description:
      'Você foi um celestial poderoso até uma fuga ou grande punição deixá-lo numa casca mortal, com memórias vagas e poder limitado. Por causa do poder divino residual, a tradição de magias ou habilidades mágicas de herança ou feito yaoguai é divina em vez da tradição normal (em geral oculta). Forma humanoide: fragmentos de memória divina — +1 de bônus de circunstância a Religião. Forma yaoguai: escolha um truque da lista divina; conjura-o como truque inato divino à vontade, elevado à metade do seu nível (arredondado para cima).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 84,
    rulesSummary:
      'Magias yaoguai viram divinas. Humanoide: +1 Religião. Yaoguai: 1 truque inato divino à vontade (metade do nível).',
    specialAbilities: [
      {
        id: 'celestial-tradition',
        name: 'Tradição Divina Residual',
        originalName: 'Residual Divine Tradition',
        actionType: 'passive',
        description:
          'Magias e habilidades mágicas de herança ou feito yaoguai usam a tradição divina em vez da normal (em geral oculta).',
      },
      {
        id: 'celestial-humanoid',
        name: 'Memória Divina (forma humanoide)',
        originalName: 'Divine Memory',
        actionType: 'passive',
        description: '+1 de bônus de circunstância a Religião.',
      },
      {
        id: 'celestial-yaoguai',
        name: 'Truque Celestial (forma yaoguai)',
        originalName: 'Celestial Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Um truque da lista divina como magia inata divina à vontade, elevado à metade do seu nível. Anote o truque escolhido.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=413',
  },
  {
    id: HERITAGE_BORN_OF_ELEMENTS_ID,
    ancestryId: ANCESTRY_YAOGUAI_ID,
    name: 'Nascido de Elementos',
    originalName: 'Born of Elements',
    description:
      'Você era um aspecto da natureza — a chuva, o vento, um raio de luz — até as essências selvagens lhe darem uma alma. Por essa conexão, a tradição de magias ou habilidades mágicas de herança ou feito yaoguai é primal em vez da normal (em geral oculta). Forma humanoide: +1 de bônus de circunstância a Sobrevivência para Sentir Direção, sem penalidade por não ter bússola. Forma yaoguai: escolha arco elétrico, geada, ignição, dardos de agulha, madeira, espalhar cascalho, lufada cortante ou jato; conjura como truque inato primal à vontade, elevado à metade do seu nível.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 84,
    rulesSummary:
      'Magias yaoguai viram primais. Humanoide: +1 Sentir Direção (sem bússola). Yaoguai: 1 truque primal da lista (à vontade).',
    choices: [
      {
        id: 'elements-cantrip',
        label: 'Truque primal (forma yaoguai)',
        options: [
          { id: 'electric-arc', label: 'Arco elétrico', originalLabel: 'Electric Arc' },
          { id: 'frostbite', label: 'Geada', originalLabel: 'Frostbite' },
          { id: 'ignition', label: 'Ignição', originalLabel: 'Ignition' },
          { id: 'needle-darts', label: 'Dardos de agulha', originalLabel: 'Needle Darts' },
          { id: 'timber', label: 'Madeira', originalLabel: 'Timber' },
          { id: 'scatter-scree', label: 'Espalhar cascalho', originalLabel: 'Scatter Scree' },
          { id: 'slashing-gust', label: 'Lufada cortante', originalLabel: 'Slashing Gust' },
          { id: 'spout', label: 'Jato', originalLabel: 'Spout' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'elements-tradition',
        name: 'Tradição Primal',
        originalName: 'Primal Tradition',
        actionType: 'passive',
        description:
          'Magias e habilidades mágicas de herança ou feito yaoguai usam a tradição primal em vez da normal (em geral oculta).',
      },
      {
        id: 'elements-humanoid',
        name: 'Sintonizado à Natureza (forma humanoide)',
        originalName: 'Nature Attunement',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância a Sobrevivência para Sentir Direção; sem penalidade por não ter bússola.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=414',
  },
  {
    id: HERITAGE_BORN_OF_ITEM_ID,
    ancestryId: ANCESTRY_YAOGUAI_ID,
    name: 'Nascido de Objeto',
    originalName: 'Born of Item',
    description:
      'Você era um objeto até a lua soprar vida em você. Escolha uma perícia de Conhecimento ligada ao tipo de ferramenta que você era (ex.: Conhecimento de Culinária para um cutelo, Conhecimento de Agricultura para um ancinho); fica treinado nela. Forma humanoide: +1 de bônus de circunstância a essa perícia de Conhecimento. Forma yaoguai: o tempo como objeto sem mente dificulta afetá-lo mentalmente — sucesso contra efeito mental vira sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 84,
    rulesSummary:
      'Treinado num Conhecimento do objeto. Humanoide: +1 nesse Conhecimento. Yaoguai: sucesso vs mental → crítico.',
    choices: [
      {
        id: 'item-lore',
        label: 'Conhecimento do objeto',
        hint: 'Ligado ao que você era (cutelo → Culinária, ancinho → Agricultura…).',
        options: [
          { id: 'cooking', label: 'Conhecimento de Culinária' },
          { id: 'farming', label: 'Conhecimento de Agricultura' },
          { id: 'engineering', label: 'Conhecimento de Engenharia' },
          { id: 'warfare', label: 'Conhecimento de Guerra' },
          { id: 'scribing', label: 'Conhecimento de Escriba' },
          { id: 'other', label: 'Outro (anotar nas notas)' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'item-humanoid',
        name: 'Memória de Ofício (forma humanoide)',
        originalName: 'Tool Memory',
        actionType: 'passive',
        description:
          'Treinado no Conhecimento escolhido. +1 de bônus de circunstância a essa perícia na forma humanoide.',
      },
      {
        id: 'item-yaoguai',
        name: 'Mente de Objeto (forma yaoguai)',
        originalName: 'Object Mind',
        actionType: 'passive',
        description:
          'Se rolar sucesso contra um efeito mental, vira sucesso crítico.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=415',
  },
  {
    id: HERITAGE_BORN_OF_VEGETATION_ID,
    ancestryId: ANCESTRY_YAOGUAI_ID,
    name: 'Nascido de Vegetação',
    originalName: 'Born of Vegetation',
    description:
      'Você era planta ou fungo até a chuva lhe dar uma mente. Escolha o traço planta ou fungo. Forma humanoide: com vegetação fresca, ajuda melhor quem precisa — +1 de bônus de circunstância a Medicina para Administrar Primeiros Socorros. Forma yaoguai: quando alguém usa Medicina para Tratar seus Ferimentos, some o seu nível aos PV recuperados; além disso, quem faz o teste recebe +1 de bônus de circunstância se você tem o traço planta e está sob luz intensa, ou o traço fungo e está na escuridão.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 84,
    rulesSummary:
      'Traço planta ou fungo. Humanoide: +1 Primeiros Socorros. Yaoguai: +nível aos PV de Tratar Ferimentos; +1 no teste se planta+luz intensa ou fungo+escuridão.',
    choices: [
      {
        id: 'vegetation-trait',
        label: 'Traço de origem',
        options: [
          { id: 'plant', label: 'Planta', originalLabel: 'Plant' },
          { id: 'fungus', label: 'Fungo', originalLabel: 'Fungus' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'vegetation-humanoid',
        name: 'Seiva Curativa (forma humanoide)',
        originalName: 'Healing Sap',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância a Medicina para Administrar Primeiros Socorros.',
      },
      {
        id: 'vegetation-yaoguai',
        name: 'Tratamento Enraizado (forma yaoguai)',
        originalName: 'Rooted Recovery',
        actionType: 'passive',
        description:
          'Ao ser alvo de Tratar Ferimentos, some o seu nível aos PV recuperados. Quem faz o teste recebe +1 se você tem planta e está sob luz intensa, ou fungo e está na escuridão.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=416',
  },
]
