import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_HOWL_OF_THE_WILD_ID } from './sources'

export const ANCESTRY_SURKI_ID = 'ancestry-surki'

export const HERITAGE_BREAKER_SURKI_ID = 'heritage-breaker-surki'
export const HERITAGE_ELYTRON_SURKI_ID = 'heritage-elytron-surki'
export const HERITAGE_HARDSHELL_SURKI_ID = 'heritage-hardshell-surki'
export const HERITAGE_LANTERN_SURKI_ID = 'heritage-lantern-surki'

/** Surki — Howl of the Wild, Archives of Nethys ID 76 */
export const surkiAncestry: Ancestry = {
  id: ANCESTRY_SURKI_ID,
  name: 'Surki',
  originalName: 'Surki',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
  sourcePage: 47,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  extraChoices: [
    {
      id: 'surki-magiphage-tradition',
      label: 'Tradição do Magífago',
      kind: 'options',
      required: true,
      hint: 'A magia que você mais absorveu como larva. Todas as magias e ações mágicas de surki passam a essa tradição.',
      options: [
        { id: 'arcane', label: 'Arcana', originalLabel: 'Arcane' },
        { id: 'divine', label: 'Divina', originalLabel: 'Divine' },
        { id: 'occult', label: 'Oculta', originalLabel: 'Occult' },
        { id: 'primal', label: 'Primeva', originalLabel: 'Primal' },
      ],
    },
  ],
  attributeBoosts: [
    {
      id: 'surki-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'surki-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: [],
  languages: {
    automatic: ['Comum', 'Surki'],
    additionalOptions: ['Elfo', 'Feérico', 'Sakvroth'],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'surki-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [
    {
      id: 'surki-magiphage',
      name: 'Magífago',
      originalName: 'Magiphage',
      actionType: 'passive',
      description:
        'Os nódulos do seu corpo absorvem magia latente. Você não precisa comer nem beber, salvo em ambiente especialmente pobre em magia (como as Terras da Mana). A tradição escolhida na larva se enraíza no corpo e muda a tradição de todas as magias e ações mágicas de surki para essa tradição.',
    },
  ],
  traits: ['Surki', 'Humanoide'],
  lore: {
    summary:
      'Surkis estão emergindo das Terras Sombrias num escavar geracional rumo à superfície. São insetoides altamente metamórficos que se alimentam da magia latente do mundo e desenvolvem adaptações únicas — de garras escavadoras a asas energizadas.',
    youMight: [
      'Sentir conexão forte com o mundo ao redor, percebendo a magia latente em tudo.',
      'Querer viajar longe ou aprender o máximo sobre seu lar.',
      'Prestar atenção especial a como outros vivem em ambientes que você não conhece.',
    ],
    othersProbably: [
      'Confundem sua individualidade e empolgação com as adaptações com orgulho jactancioso.',
      'Acham sua empolgação com gente, lugares e coisas novas cativante.',
      'Confiam nos seus sentidos mágicos mais do que nos próprios mapas em apertos.',
    ],
    physicalDescription:
      'A vida surki tem três estágios bem distintos. Larvas passam 10 a 100 anos dormentes no ovo e emergem como grubs de cerca de 60 cm, com nódulos luminescentes e garras de escavação. Adultos — a forma mais vista na superfície — são bípedes de membros multiarticulados, duas antenas em pluma, barbilhões sensoriais e placas de quitina marrom-ferrugem ou laranja nas costas. Nódulos mágicos se agrupam no abdômen, ombros e membros, acumulando magia para novas adaptações. A forma evoluída, após a grande metamorfose, transforma esses nódulos em órgãos capazes de projetar magia tangível: cunhas de força, asas que desafiam a gravidade e outros aparelhos únicos.',
    society:
      'A cura da Ferida do Mundo disparou um dos maiores escavares geracionais da história, trazendo surkis às cavernas da Cicatriz de Sarkoris e à superfície. Valorizam individualidade e inovação; cada um deve achar o próprio jeito. Assentamentos impactam o ambiente o mínimo possível, tecendo sedas em plantas e fungos para formar abrigos. Relacionamentos buscam adaptações que se complementam; são em geral poliamorosos e de um só sexo. Adultos se reproduzem por partenogênese, raramente mais de um ovo a cada poucos anos. Ovos de um escavar geracional eclodem em massa e as larvas coordenam a partida, atraídas por magia.',
    beliefs:
      'A conexão com o ambiente leva muitos a deuses naturais. Tradições antigas veem cada criatura com um espírito, e espécies-chave ocupam papel deífico no ecossistema. Em Sarkoris, o culto a Gozreh e Sturovenen cresceu rápido. É importante que a vida siga seu curso natural — morte, violência e guerra também têm lugar.',
    popularEdicts: [
      'Incentivar outros a descobrir o verdadeiro eu',
      'Proteger e nutrir ecossistemas naturais',
      'Trabalhar com outros para promover relações simbióticas',
    ],
    popularAnathema: [
      'Forçar outro a mudar antes de estar pronto',
    ],
    sampleNames: [
      'Portador de Pedregulhos Pesados',
      'Tecelão de Teias Intricadas',
      'Com o Canto Mais Hábil',
      'Quem Brilha Intensamente',
      'Cujos Padrões São Ousados',
      'Cuja Voz É Música',
    ],
  },
  heritageIds: [
    HERITAGE_BREAKER_SURKI_ID,
    HERITAGE_ELYTRON_SURKI_ID,
    HERITAGE_HARDSHELL_SURKI_ID,
    HERITAGE_LANTERN_SURKI_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=76',
}

export const surkiHeritages: Heritage[] = [
  {
    id: HERITAGE_BREAKER_SURKI_ID,
    ancestryId: ANCESTRY_SURKI_ID,
    name: 'Surki Quebrador',
    originalName: 'Breaker Surki',
    description:
      'Suas garras são especialmente duras e atravessam terra e predadores. Você ganha um ataque desarmado de garra que causa 1d4 de dano cortante. As garras estão no grupo briga e têm os traços ágil, acuidade, desarmado e versátil E (contundente). Evoluções posteriores (feitos) podem projetar uma cunha mágica de escavação e espinhos de ancoragem.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 48,
    rulesSummary:
      'Garra 1d4 C (ágil, acuidade, desarmado, versátil E). Evolução: cunha 1d6 + traços mágico/raze/força; ancoragem contra movimento forçado.',
    specialAbilities: [
      {
        id: 'breaker-claw',
        name: 'Garra',
        originalName: 'Claw',
        actionType: 'passive',
        description:
          'Ataque desarmado de garra: 1d4 cortante, grupo briga, traços ágil, acuidade, desarmado e versátil E.',
      },
    ],
  },
  {
    id: HERITAGE_ELYTRON_SURKI_ID,
    ancestryId: ANCESTRY_SURKI_ID,
    name: 'Surki Élitros',
    originalName: 'Elytron Surki',
    description:
      'A camada superior da carapaça é móvel e se abre para apanhar o ar quando você cai. Você não sofre dano de queda, independentemente da distância. Evoluções posteriores podem projetar asas brilhantes (Voar inato 1×/dia) ou membranas que produzem o Canto Estridulante.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 49,
    rulesSummary:
      'Imune a dano de queda. Evolução: Voar inato 1×/dia (luz) ou Canto Estridulante (enjoado).',
    specialAbilities: [
      {
        id: 'elytron-fall',
        name: 'Queda Graciosa',
        originalName: 'Graceful Fall',
        actionType: 'passive',
        description:
          'Você não sofre dano de queda, independentemente da distância.',
      },
    ],
  },
  {
    id: HERITAGE_HARDSHELL_SURKI_ID,
    ancestryId: ANCESTRY_SURKI_ID,
    name: 'Surki Casca-Dura',
    originalName: 'Hardshell Surki',
    description:
      'Sua carapaça é bem mais densa e funciona como armadura própria. É armadura média do grupo placa: +4 de bônus de item à CA, limite de Des +1, penalidade de teste −2, penalidade de Deslocamento −5 pés, valor de Força +3, traço conforto. Você nunca pode vestir outra armadura nem remover a carapaça. Pode gravar runas nela. Evoluções posteriores reforçam a carapaça contra críticos e projetam um campo contra a tradição do Magífago.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 49,
    rulesSummary:
      'Carapaça = armadura média placa (+4 CA, Des +1, −2 teste, −5 pés, For +3, conforto). Não veste outra armadura; aceita runas.',
    specialAbilities: [
      {
        id: 'hardshell-carapace',
        name: 'Carapaça',
        originalName: 'Carapace',
        actionType: 'passive',
        description:
          'Armadura média do grupo placa: +4 CA, limite de Des +1, penalidade de teste −2, −5 pés de Deslocamento, Força +3, traço conforto. Não pode vestir outra armadura nem remover a carapaça. Aceita runas de armadura.',
      },
    ],
  },
  {
    id: HERITAGE_LANTERN_SURKI_ID,
    ancestryId: ANCESTRY_SURKI_ID,
    name: 'Surki Lanterna',
    originalName: 'Lantern Surki',
    description:
      'Os nódulos do abdômen são especialmente luminosos. Com uma ação de Interagir, você emite luz num raio de 6 m (e penumbra nos 6 m seguintes). É um efeito de luz mágica de nível igual ao seu. Pode mudar a cor ou apagar com outra ação de Interagir. Evoluções posteriores convertem isso em Feixe de Lanterna (linha de fogo) ou Estrobo de Lanterna (ofuscado/cego).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 49,
    rulesSummary:
      'Interagir: luz 6 m (penumbra +6 m). Evolução: feixe de fogo em linha ou estrobo ofuscante.',
    specialAbilities: [
      {
        id: 'lantern-light',
        name: 'Luz Abdominal',
        originalName: 'Abdominal Light',
        actionType: 'one',
        description:
          'Interagir para emitir luz num raio de 6 m (penumbra nos 6 m seguintes). Efeito de luz mágica de nível igual ao seu. Outra Interagir muda a cor ou apaga.',
      },
    ],
  },
]
