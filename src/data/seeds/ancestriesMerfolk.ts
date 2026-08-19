import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_HOWL_OF_THE_WILD_ID } from './sources'

export const ANCESTRY_MERFOLK_ID = 'ancestry-merfolk'

export const HERITAGE_ABYSSAL_MERFOLK_ID = 'heritage-abyssal-merfolk'
export const HERITAGE_CARCHARODON_MERFOLK_ID = 'heritage-carcharodon-merfolk'
export const HERITAGE_PELAGIC_MERFOLK_ID = 'heritage-pelagic-merfolk'
export const HERITAGE_REEF_MERFOLK_ID = 'heritage-reef-merfolk'
export const HERITAGE_SAILFISH_MERFOLK_ID = 'heritage-sailfish-merfolk'

/** Merfolk — Howl of the Wild, Archives of Nethys ID 74 */
export const merfolkAncestry: Ancestry = {
  id: ANCESTRY_MERFOLK_ID,
  name: 'Povo-marinho',
  originalName: 'Merfolk',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
  sourcePage: 35,
  hitPoints: 8,
  size: 'medium',
  speed: 5,
  attributeBoosts: [
    {
      id: 'merfolk-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'merfolk-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'merfolk-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['constitution'],
  languages: {
    automatic: ['Comum', 'Talássico'],
    additionalOptions: ['Aklo', 'Azlanti', 'Dracônico', 'Elfo', 'Feérico'],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'merfolk-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'merfolk-swim',
      name: 'Natação',
      originalName: 'Swim',
      actionType: 'passive',
      description: 'Deslocamento de natação 7,5 m.',
    },
    {
      id: 'merfolk-aquatic-grace',
      name: 'Graça Aquática',
      originalName: 'Aquatic Grace',
      actionType: 'passive',
      description:
        'Quando obtém sucesso em uma salvaguarda contra um efeito de água, o resultado vira sucesso crítico.',
    },
    {
      id: 'merfolk-hydration',
      name: 'Hidratação',
      originalName: 'Hydration',
      actionType: 'passive',
      description:
        'Seu corpo exige retorno a ambientes aquáticos pelo menos uma vez a cada 24 horas. Após as primeiras 24 horas fora da água, você sofre −1 de penalidade de status a salvaguardas de Fortitude. Após 48 horas, luta para respirar ar e começa a sufocar até ser devolvido à água.',
    },
  ],
  traits: ['Merfolk', 'Anfíbio', 'Humanoide'],
  lore: {
    summary:
      'O povo-marinho é um povo aquático meio humano, meio peixe que habita todos os oceanos e mares de Golarion. Usam magia como outras gentes usam ferramentas comuns — sobretudo para controlar água, criar presságios e em suas canções sedutoras.',
    youMight: [
      'Tratar magia como ferramenta normal, comum e útil, em vez de mistério sublime.',
      'Sentir superioridade na água — seja desdém arrogante por quem nada ou navega, seja preocupação paternal de que possam se machucar.',
    ],
    othersProbably: [
      'Ficam impressionados com seus talentos musicais e místicos.',
      'Presumem que a vida sob as ondas é radicalmente diferente da vida na superfície.',
    ],
    physicalDescription:
      'O povo-marinho está entre as ancestralidades mais distintas de Golarion. Da cintura para cima têm corpos humanoides poderosos e traços aerodinâmicos; olhos um pouco maiores que humanos e, com frequência, orelhas levemente pontudas. Abaixo da cintura, o corpo de um grande peixe — cauda escamada longa terminando em nadadeira ou par de nadadeiras. Tons de pele e escamas cobrem todas as cores imagináveis: muitos próximos à terra têm tons semelhantes a humanos ou elfos locais; os que vivem longe da costa tendem a azuis, cinzas ou verdes; o povo-marinho abissal pode ter pele cinza-escura, azul-noite ou até translúcida. Caudas espelham peixes da região — iridescentes prateadas em águas temperadas, padrões vibrantes nos trópicos, ou listras fracamente bioluminescentes nas profundezas.',
    society:
      'Concentram-se em reinos aquáticos nas plataformas continentais, em geral em águas temperadas. Territórios incluem aldeias e cidades sob famílias aristocráticas com política de corte rival a qualquer monarquia do Mar Interior. Diplomacia ativa, alianças e tratados comerciais unem esses reinos; muitos são mais reservados com habitantes da superfície, embora alguns busquem aprendê-la ativamente. Magia é altamente valorizada: quem aspira a liderança precisa de domínio sólido da feitiçaria de vento, onda e canção. Reis e rainhas do povo-marinho raramente são os magos mais poderosos do território, mas costumam estar perto disso, com acesso a ensinamentos e artefatos transmitidos de geração em geração.',
    beliefs:
      'Em geral seguem costumes dos pais e da comunidade — que variam enormemente pelo mundo. Muitos creem que atos de altruísmo elevam a comunidade como um todo. Divindades da água são altamente estimadas: Gozreh e os Senhores Elementais da Água Kelizandri ou Lysianassa; Abadar em assentamentos maiores; e uma versão de Erastil mais associada a tubarões do que a cervos em aldeias menores.',
    popularEdicts: [
      'Ajudar o próximo sempre que possível',
      'Trazer a beleza da música ao mundo',
      'Proteger os mares de ameaças internas e externas',
    ],
    popularAnathema: [
      'Lutar contra a corrente de frente',
      'Usar magia para ferir inocentes ou acumular riqueza',
    ],
    sampleNames: [
      'Aloori',
      "Iri'kik",
      'Ouliette',
      "T'konaa",
      'Uathanak',
    ],
  },
  heritageIds: [
    HERITAGE_ABYSSAL_MERFOLK_ID,
    HERITAGE_CARCHARODON_MERFOLK_ID,
    HERITAGE_PELAGIC_MERFOLK_ID,
    HERITAGE_REEF_MERFOLK_ID,
    HERITAGE_SAILFISH_MERFOLK_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=74',
}

export const merfolkHeritages: Heritage[] = [
  {
    id: HERITAGE_ABYSSAL_MERFOLK_ID,
    ancestryId: ANCESTRY_MERFOLK_ID,
    name: 'Povo-marinho Abissal',
    originalName: 'Abyssal Merfolk',
    description:
      'Você vive muito, muito abaixo da superfície do oceano. Sua cauda pode lembrar um peixe-víbora ou peixe-pescador, e você pode ter olhos luminosos ou pele translúcida. O povo-marinho abissal tem reputação inquietante, mas consegue existir até nos reinos mais sem luz. Você ganha visão no escuro e é imune à pressão esmagadora das profundezas oceânicas.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 35,
    rulesSummary:
      'Visão no Escuro; imune à pressão esmagadora das profundezas oceânicas.',
    specialAbilities: [
      {
        id: 'abyssal-merfolk-darkvision',
        name: 'Visão no Escuro',
        originalName: 'Darkvision',
        actionType: 'passive',
        description:
          'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
      },
      {
        id: 'abyssal-merfolk-pressure',
        name: 'Imunidade à Pressão',
        originalName: 'Pressure Immunity',
        actionType: 'passive',
        description:
          'Você é imune à pressão esmagadora das profundezas oceânicas.',
      },
    ],
  },
  {
    id: HERITAGE_CARCHARODON_MERFOLK_ID,
    ancestryId: ANCESTRY_MERFOLK_ID,
    name: 'Povo-marinho Carcharodon',
    originalName: 'Carcharodon Merfolk',
    description:
      'Como um temível povo-marinho-tubarão, a metade inferior do seu corpo se assemelha a um dos predadores de ápice do oceano. Como um tubarão, você sente o cheiro de sangue a grande distância. Você ganha faro como sentido impreciso com alcance de 9 m. Porém, consegue cheirar sangue derramado a 36 m no ar e a 150 m na água.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 35,
    rulesSummary:
      'Faro impreciso 9 m; sangue: 36 m no ar / 150 m na água.',
    specialAbilities: [
      {
        id: 'carcharodon-scent',
        name: 'Faro de Tubarão',
        originalName: 'Shark Scent',
        actionType: 'passive',
        description:
          'Faro impreciso com alcance de 9 m. Sangue derramado: faro a 36 m no ar e 150 m na água.',
      },
    ],
  },
  {
    id: HERITAGE_PELAGIC_MERFOLK_ID,
    ancestryId: ANCESTRY_MERFOLK_ID,
    name: 'Povo-marinho Pelágico',
    originalName: 'Pelagic Merfolk',
    description:
      'Você é um povo-marinho dos mares abertos. Sua cauda tem padrões dos atuns e arenques prateados que se agrupam aos milhões em seus territórios de caça. A água obedece à sua vontade e, com uma palavra rápida, você pode envolver-se nela. Você ganha a ação Onda Protetora.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 36,
    rulesSummary:
      'Onda Protetora (1 ação, primal/água): até o início do próximo turno, o 1º dano de ácido/fogo ganha resist. metade do nível (mín. 1); nível inteiro se submerso ou se já usou magia/habilidade de água neste turno.',
    specialAbilities: [
      {
        id: 'pelagic-shielding-wave',
        name: 'Onda Protetora',
        originalName: 'Shielding Wave',
        actionType: 'one',
        description:
          '(Primal, água) Até o início do seu próximo turno, a primeira vez que você sofrer dano de ácido ou fogo, recebe resistência a esse dano igual à metade do seu nível (mínimo 1). A resistência é igual ao seu nível se você estiver submerso em água, se já tiver Conjurado uma Magia com o traço água, ou se tiver usado outra habilidade com o traço água neste turno.',
      },
    ],
  },
  {
    id: HERITAGE_REEF_MERFOLK_ID,
    ancestryId: ANCESTRY_MERFOLK_ID,
    name: 'Povo-marinho do Recife',
    originalName: 'Reef Merfolk',
    description:
      'Você foi criado entre corais coloridos e cardumes de peixes tropicais. Comparado à maioria do povo-marinho, seu corpo tem cores vivas com listras, manchas e padrões como peixe-palhaço ou peixe-anjo. Está acostumado aos habitantes ocasionalmente tóxicos do lar e pouco se incomoda com ferroadas ou venenos banais. Você recebe resistência a veneno igual à metade do seu nível (mínimo 1), e cada salvaguarda bem-sucedida contra uma aflição de veneno reduz o estágio em 2, ou em 1 para um veneno virulento. Cada sucesso crítico contra um veneno contínuo reduz o estágio em 3, ou em 2 para um veneno virulento.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 36,
    rulesSummary:
      'Resistência a veneno = metade do nível (mín. 1). Sucessos reduzem mais estágios de veneno (como Anão de Sangue Forte).',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'poison',
        label: 'Resistência a veneno',
      },
    ],
    specialAbilities: [
      {
        id: 'reef-merfolk-poison-resilience',
        name: 'Resiliência a Veneno',
        originalName: 'Poison Resilience',
        actionType: 'passive',
        description:
          'Cada salvaguarda bem-sucedida contra aflição de veneno reduz o estágio em 2 (1 se virulento). Sucesso crítico contra veneno contínuo reduz em 3 (2 se virulento).',
      },
    ],
  },
  {
    id: HERITAGE_SAILFISH_MERFOLK_ID,
    ancestryId: ANCESTRY_MERFOLK_ID,
    name: 'Povo-marinho Peixe-Vela',
    originalName: 'Sailfish Merfolk',
    description:
      'A metade inferior do seu corpo se assemelha a um poderoso peixe-vela, completa com grande nadadeira dorsal. Com essa nadadeira, você se move pela água mais rápido e salta mais longe. Seu Deslocamento de natação aumenta para 9 m. Ao tentar um Salto Alto ou Salto Longo, você recebe +1 de bônus de circunstância ao teste de Atletismo e pode Nadar em vez de Dar Passada antes de tentar o salto.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 36,
    rulesSummary:
      'Natação 9 m; +1 Atletismo em Salto Alto/Longo; pode Nadar (em vez de Dar Passada) antes do salto.',
    specialAbilities: [
      {
        id: 'sailfish-swim-speed',
        name: 'Natação de Peixe-Vela',
        originalName: 'Sailfish Swim Speed',
        actionType: 'passive',
        description:
          'Deslocamento de natação aumenta para 9 m. +1 de circunstância a Atletismo em Salto Alto ou Longo; pode Nadar em vez de Dar Passada antes do salto.',
      },
    ],
  },
]
