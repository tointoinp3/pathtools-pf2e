import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_DRACONIC_CODEX_ID } from './sources'

export const ANCESTRY_DRAGONET_ID = 'ancestry-dragonet'

export const HERITAGE_FEY_DRAGONET_ID = 'heritage-fey-dragonet'
export const HERITAGE_HOMING_DRAKE_ID = 'heritage-homing-drake'
export const HERITAGE_HOUSE_DRAKE_ID = 'heritage-house-drake'
export const HERITAGE_PEARL_DRAGONET_ID = 'heritage-pearl-dragonet'
export const HERITAGE_TIDEPOOL_DRAGONET_ID = 'heritage-tidepool-dragonet'

/** Dragonete — Draconic Codex, Archives of Nethys ID 96 */
export const dragonetAncestry: Ancestry = {
  id: ANCESTRY_DRAGONET_ID,
  name: 'Dragonete',
  originalName: 'Dragonet',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_DRACONIC_CODEX_ID,
  sourcePage: 208,
  hitPoints: 8,
  size: 'tiny',
  speed: 20,
  attributeBoosts: [
    {
      id: 'dragonet-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'dragonet-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'dragonet-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['constitution'],
  languages: {
    automatic: ['Comum', 'Dracônico'],
    additionalOptions: [],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'dragonet-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [
    {
      id: 'dragonet-big-sharp-teeth',
      name: 'Dentes Grandes e Afiados',
      originalName: 'Big Sharp Teeth',
      actionType: 'passive',
      description:
        'Sua boca está repleta de dentes afiados. Você ganha um ataque desarmado de mandíbulas que causa 1d4 de dano perfurante. As mandíbulas estão no grupo briga e têm os traços finura e desarmado.',
    },
    {
      id: 'dragonet-wings',
      name: 'Asas',
      originalName: 'Wings',
      actionType: 'passive',
      description:
        'Suas asas podem não ser tão fortes quanto as de outros dragonetes, mas ainda evitam quedas descontroladas. Você não sofre dano de queda, independentemente da distância.',
    },
    {
      id: 'dragonet-tiny-pcs',
      name: 'PJ Minúsculo',
      originalName: 'Tiny PCs',
      actionType: 'passive',
      description:
        'Como criatura Minúscula, você pode entrar no espaço de outra criatura — necessário para Golpes corpo a corpo, que normalmente têm alcance 0. Armas e armaduras do seu tamanho usam as mesmas estatísticas, mas armas corpo a corpo têm alcance 0 (ou 1,5 m a menos se tiverem o traço alcance). Ajuste carga e limite de Bulk para o tamanho Minúsculo.',
    },
  ],
  traits: ['Dragonet', 'Dragão'],
  lore: {
    summary:
      'Dragonetes são dragões em miniatura: asas, dentes, sopro mágico. Alguns um dia acordam transformados — o sopro, o voo e a magia inata enfraquecem, e em troca ganham tamanho ou inteligência e talento com espada ou magia. Muitos viram aventureiros.',
    youMight: [
      'Ser orgulhoso — você pode ser um dragão minúsculo, mas ainda é um dragão!',
      'Adorar passar o dia preguiçando e sendo mimado.',
      'Acumular algo — ouro, um tipo de bugiganga ou amigos.',
    ],
    othersProbably: [
      'Temem que você tenha um sopro poderoso pronto para disparar.',
      'Esperam ter de recompensá-lo pela ajuda.',
      'Acham que você é familiar de mago, companheiro de druida ou até um animal de estimação.',
    ],
    physicalDescription:
      'Parecem dragões: corpo escamado, pescoço serpentino, asas, garras, cauda e mandíbulas cheias de presas. Podem ter chifres pequenos ou espinhos na espinha ou na cauda. A cor das escamas varia: cinzas e marrons dos dracos-homing, tons arco-íris dos dragonetes feéricos, branco e preto iridescente dos dragonetes-pérola. Olhos amarelos, do creme ao âmbar, com pupilas verticais.',
    society:
      'Costumam ser sociáveis com outras ancestralidades e menos entre si. Muitos vivem sozinhos e só compartilham toca com outros dragonetes em família. São ferozmente protetores dos filhotes até a maturidade, cerca de um ano. Cada um reina sobre um território pequeno — caverna, biblioteca, santuário — como mestre inquestionável. Confederacões locais funcionam como cidades-estado, com um “arquidragonete” coordenando. Nomes próprios lembram dragões (quatro ou cinco sílabas) ou apelidos dados por quem os criou.',
    beliefs:
      'Alguns veem a transformação como dom do deus-dragão Gaasham; outros, como lição de Apsu para aprender a andar no chão antes de merecer o céu. Outros acreditam ter escolhido ser mais mortais para apreciar a quase-imortalidade dracônica.',
    sampleNames: [
      'Butterwing',
      'Churlet',
      'Dazzlebreeze',
      'Epondorax',
      'Jumpy',
      'Nandren',
      'Ogedrie',
      'Pearleye',
      'Silverslash',
      'Smooch',
      'Tazicyroth, o Audaz',
    ],
  },
  extraChoices: [
    {
      id: 'dragonet-story-type',
      label: 'Tipo de dragonete (história)',
      kind: 'options',
      required: false,
      hint: 'Com herança versátil, escolha o tipo só para história e feitos (Sopro, etc.). Sem versátil, a herança específica já define o tipo.',
      options: [
        { id: 'fey', label: 'Dragonete feérico', originalLabel: 'Fey Dragonet' },
        { id: 'homing', label: 'Draco-homing', originalLabel: 'Homing Drake' },
        { id: 'house', label: 'Draco doméstico', originalLabel: 'House Drake' },
        { id: 'pearl', label: 'Dragonete-pérola', originalLabel: 'Pearl Dragonet' },
        { id: 'tidepool', label: 'Dragonete de poça', originalLabel: 'Tidepool Dragonet' },
      ],
    },
  ],
  heritageIds: [
    HERITAGE_FEY_DRAGONET_ID,
    HERITAGE_HOMING_DRAKE_ID,
    HERITAGE_HOUSE_DRAKE_ID,
    HERITAGE_PEARL_DRAGONET_ID,
    HERITAGE_TIDEPOOL_DRAGONET_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=96',
}

export const dragonetHeritages: Heritage[] = [
  {
    id: HERITAGE_FEY_DRAGONET_ID,
    ancestryId: ANCESTRY_DRAGONET_ID,
    name: 'Dragonete Feérico',
    originalName: 'Fey Dragonet',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 210,
    traits: ['Dragonete', 'Feérico'],
    description:
      'Corpo colorido com escamas que ficam mais lustrosas com a idade e asas iridescentes de borboleta. Você pode mudar a cor e o padrão das asas com 1 ação para se camuflar. Quando as asas combinam com o ambiente, você ganha +2 de bônus de circunstância em Furtividade até o entorno mudar. Você ganha o traço feérico e adiciona Feérico à lista de idiomas conhecidos.',
    grantedLanguages: ['Feérico'],
    rulesSummary:
      'Traço feérico; idioma Feérico; 1 ação para camuflar as asas (+2 circunstância em Furtividade).',
    specialAbilities: [
      {
        id: 'fey-dragonet-wings',
        name: 'Asas Camufladas',
        originalName: 'Camouflage Wings',
        actionType: 'one',
        description:
          'Mude a cor e o padrão das asas. Enquanto combinarem com o ambiente, +2 de bônus de circunstância em testes de Furtividade até o entorno mudar de cor ou padrão.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=422',
  },
  {
    id: HERITAGE_HOMING_DRAKE_ID,
    ancestryId: ANCESTRY_DRAGONET_ID,
    name: 'Draco-Homing',
    originalName: 'Homing Drake',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 210,
    traits: ['Dragonete'],
    description:
      'Focinho curto e espinhos minúsculos que lembram pelos. Escamas vivas ou marrom-acinzentadas. Você conjura o truque conhecer o caminho como magia inata arcana à vontade (altura igual à metade do nível, arredondada para cima). Sempre sabe a distância e a direção até sua casa. Pode designar um novo lar após 1 semana lá; só um lar por vez.',
    rulesSummary:
      'Truque inato arcano conhecer o caminho; sempre sabe onde fica o lar (troca após 1 semana).',
    specialAbilities: [
      {
        id: 'homing-drake-home',
        name: 'Senso de Lar',
        originalName: 'Sense Home',
        actionType: 'passive',
        description:
          'Sempre sabe a distância e a direção até seu lar. Designa um novo lar após 1 semana no local; só um lar por vez. Truque inato arcano conhecer o caminho à vontade.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=423',
  },
  {
    id: HERITAGE_HOUSE_DRAKE_ID,
    ancestryId: ANCESTRY_DRAGONET_ID,
    name: 'Draco Doméstico',
    originalName: 'House Drake',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 210,
    traits: ['Dragonete'],
    description:
      'Escamas azul e roxo vivas, dentes e garras prateados. Suas mandíbulas contam como prata e você ganha +1 de bônus de circunstância em rolagens de dano contra fiends. Adiciona Diabólico à lista de idiomas conhecidos.',
    grantedLanguages: ['Diabólico'],
    rulesSummary:
      'Mandíbulas contam como prata; +1 circunstância no dano contra fiends; idioma Diabólico.',
    specialAbilities: [
      {
        id: 'house-drake-silver',
        name: 'Presas Prateadas',
        originalName: 'Silver Jaws',
        actionType: 'passive',
        description:
          'Mandíbulas contam como prata. +1 de bônus de circunstância em dano contra fiends.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=424',
  },
  {
    id: HERITAGE_PEARL_DRAGONET_ID,
    ancestryId: ANCESTRY_DRAGONET_ID,
    name: 'Dragonete-Pérola',
    originalName: 'Pearl Dragonet',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 210,
    traits: ['Dragonete'],
    description:
      'Escamas peroladas e corpo redondo, pernas curtas, asas pequenas e cauda longa. O formato do corpo absorve um golpe e permite rolar para longe.\n\n**Quicar para Longe** [reação] Frequência 1 vez a cada 10 minutos; Gatilho um Golpe corpo a corpo acerta você e causa dano contundente; Efeito você ganha resistência igual ao seu nível ao dano contundente do Golpe, depois Avança até metade do Deslocamento. Pode Voar em vez de Avançar se tiver Deslocamento de voo.',
    rulesSummary:
      'Reação Quicar para Longe: resistência a contundente = nível e Avançar (ou Voar) metade do deslocamento.',
    specialAbilities: [
      {
        id: 'pearl-bounce-away',
        name: 'Quicar para Longe',
        originalName: 'Bounce Away',
        actionType: 'reaction',
        frequency: '1 vez a cada 10 minutos',
        trigger:
          'Um Golpe corpo a corpo acerta você e causa dano contundente.',
        description:
          'Ganha resistência igual ao nível ao dano contundente do Golpe, depois Avança até metade do Deslocamento (ou Voar se tiver voo).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=425',
  },
  {
    id: HERITAGE_TIDEPOOL_DRAGONET_ID,
    ancestryId: ANCESTRY_DRAGONET_ID,
    name: 'Dragonete de Poça',
    originalName: 'Tidepool Dragonet',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 210,
    traits: ['Dragonete', 'Anfíbio'],
    description:
      'Corpo esbelto como enguia, escamas azul-celeste. As asas acompanham o corpo como nadadeiras, adequadas à água. Você ganha o traço anfíbio e Deslocamento de natação de 4,5 m. Adiciona Talássico à lista de idiomas conhecidos.',
    grantedLanguages: ['Talássico'],
    rulesSummary: 'Traço anfíbio; natação 4,5 m; idioma Talássico.',
    additionalSpeeds: { swim: 15 },
    specialAbilities: [
      {
        id: 'tidepool-amphibious',
        name: 'Anfíbio',
        originalName: 'Amphibious',
        actionType: 'passive',
        description:
          'Respira ar e água. Deslocamento de natação de 4,5 m.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=426',
  },
]
