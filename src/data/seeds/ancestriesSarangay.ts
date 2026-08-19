import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_TIAN_XIA_CG_ID } from './sources'

export const ANCESTRY_SARANGAY_ID = 'ancestry-sarangay'

export const HERITAGE_FULL_MOON_SARANGAY_ID = 'heritage-full-moon-sarangay'
export const HERITAGE_HALF_MOON_SARANGAY_ID = 'heritage-half-moon-sarangay'
export const HERITAGE_NEW_MOON_SARANGAY_ID = 'heritage-new-moon-sarangay'
export const HERITAGE_WANING_MOON_SARANGAY_ID = 'heritage-waning-moon-sarangay'
export const HERITAGE_WAXING_MOON_SARANGAY_ID = 'heritage-waxing-moon-sarangay'

/** Sarangay — Tian Xia Character Guide, Archives of Nethys ID 89 */
export const sarangayAncestry: Ancestry = {
  id: ANCESTRY_SARANGAY_ID,
  name: 'Sarangay',
  originalName: 'Sarangay',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_TIAN_XIA_CG_ID,
  sourcePage: 58,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'sarangay-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'sarangay-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'sarangay-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['wisdom'],
  languages: {
    automatic: ['Comum'],
    additionalOptions: [
      'Empíreo',
      'Feérico',
      'Nagaji',
      'Petran',
      'Pyric',
      'Sussuran',
      'Talássico',
      'Yaksha',
    ],
    additionalFromIntelligence: true,
  },
  senses: [],
  specialAbilities: [
    {
      id: 'sarangay-horns',
      name: 'Chifres',
      originalName: 'Horns',
      actionType: 'passive',
      description:
        'Seus chifres poderosos são armas formidáveis. Você tem um ataque desarmado de chifres que causa 1d6 de dano perfurante e tem o traço empurrar. Os chifres estão no grupo briga.',
    },
    {
      id: 'sarangay-head-gem',
      name: 'Gema da Testa',
      originalName: 'Head Gem',
      actionType: 'passive',
      description:
        'Na testa há uma gema que abriga sua alma. Ao conjurar magia ou ritual para devolvê-lo à vida, a gema intacta pode substituir o corpo. Você pode remover a gema livremente, mas em geral outra criatura só a remove ou destrói à força se você estiver morto ou permanentemente incapacitado (magia poderosa pode contornar isso, a critério do mestre). Se a gema for removida ou destruída, pode ser regerada com um ritual de um dia; restos da gema anterior viram pó na hora.',
    },
  ],
  traits: ['Sarangay', 'Humanoide'],
  lore: {
    summary:
      'Sarangays são guerreiros de cabeça de carabao das ilhas de Minata, conhecidos pela gema mágica na testa que abriga a alma. Valorizam a comunidade, o líder escolhido e a natureza — o Pai Lua e a Mãe Terra.',
    youMight: [
      'Mostrar a gema da testa a quem ama e escondê-la de quem não confia.',
      'Exaltar uma cultura guerreira de proteger o que é seu e as florestas ao redor.',
      'Ser superprotetor com quem ama, até com violência.',
    ],
    othersProbably: [
      'Evitam o assunto da gema — por respeito ou por ganância.',
      'Confiam na sua palavra de proteger quem ama.',
      'Subestimam o quanto você pode ser gentil com os seus.',
    ],
    physicalDescription:
      'Sarangays são guerreiros altos, em geral de 1,80 a 2,10 m, com físico visivelmente musculoso. Olhos são orbes pretos com crescentes brancos no lugar de pupilas. Mãos grandes e garradas; pernas terminam em cascos capazes de derrubar árvores. Alcançam a idade adulta quando os chifres chegam a cerca de 60 cm. Joias incluem placas nos chifres, argolas no nariz e pulseiras pesadas de ouro. Desde o nascimento, cada um tem uma pedra reluzente na testa — a gema da alma. Ao escolher um parceiro, trocam as gemas e amam-se pelo resto da vida. A raridade e o valor espiritual das gemas atraem caçadores e magos inescrupulosos.',
    society:
      'Sozinhos são fortes; juntos, dizem-se imbatíveis. Vilarejos pequenos no fundo das florestas, com casas fáceis de desmontar e reconstruir conforme estações, marés e geomancia. No centro fica a casa do datu (às vezes ratu), o kraton de madeira nobre. O datu vive cercado de parentes e vassalos que formam sua banda de guerra. A hierarquia vem do respeito a um líder digno: datu indignos são depostos pelos comuns, que escolhem outro — até dentre si. Se a gema é destruída, um ritual xamânico a faz crescer de novo, mas o sarangay cai em torpor sem sonhos até lá. Bandos inteiros se formam contra caçadores de gemas.',
    beliefs:
      'Apesar do poder oculto inato, sintonizam-se à natureza. Chamam a lua de Ama Vulan — Pai Lua —, o Primeiro Ancestral: os chifres são o crescente, a gema é a lua cheia. Na lua cheia fazem rituais para mérito e favor. Também reverenciam a Mãe Terra e os mil deuses miúdos das folhas, das gotas e das brasas. A natureza é divina e viva.',
    popularEdicts: [
      'Proteger o que é seu',
      'Buscar entender a dualidade da terra e da lua',
      'Passar tempo no ritmo da natureza',
    ],
    popularAnathema: [
      'Trair um líder digno',
      'Remover a gema da testa sem boa causa',
    ],
    sampleNames: [
      'Dakal',
      'Davvun',
      'Karatallu',
      'Kasta',
      'Makkan Vulan',
      'Mangi Yavu',
      'Nallutu',
      'Tadday',
      'Uzzin',
      'Vulu Vvuga',
    ],
  },
  heritageIds: [
    HERITAGE_FULL_MOON_SARANGAY_ID,
    HERITAGE_HALF_MOON_SARANGAY_ID,
    HERITAGE_NEW_MOON_SARANGAY_ID,
    HERITAGE_WANING_MOON_SARANGAY_ID,
    HERITAGE_WAXING_MOON_SARANGAY_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=89',
}

export const sarangayHeritages: Heritage[] = [
  {
    id: HERITAGE_FULL_MOON_SARANGAY_ID,
    ancestryId: ANCESTRY_SARANGAY_ID,
    name: 'Sarangay da Lua Cheia',
    originalName: 'Full Moon Sarangay',
    description:
      'Você foi criado numa tradição xamânica que atravessa comunidades e heranças sarangay. Passou a juventude com um xamã ancião, aprendendo a comungar com espíritos para um dia aconselhar o povo. Sacerdotes e xamãs desse caminho canalizam espíritos e veem o que outros não veem. Você recebe o boost de ancestralidade em Sabedoria em vez de Força, e a falha em Constituição em vez de Sabedoria. Ganha o feito de ancestralidade Curandeiro Popular.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 60,
    rulesSummary:
      'Boost de SAB (em vez de FOR); falha de CON (em vez de SAB); feito Curandeiro Popular.',
    featGrants: [
      {
        id: 'full-moon-folk-healer',
        featId: 'feat-sarangay-folk-healer',
        featName: 'Curandeiro Popular',
        originalName: 'Folk Healer',
        featType: 'ancestry',
      },
    ],
    specialAbilities: [
      {
        id: 'full-moon-attributes',
        name: 'Atributos da Lua Cheia',
        originalName: 'Full Moon Attributes',
        actionType: 'passive',
        description:
          'Substitua o boost de Força da ancestralidade por Sabedoria e a falha de Sabedoria por Constituição. Ajuste os atributos da ficha de acordo.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=391',
  },
  {
    id: HERITAGE_HALF_MOON_SARANGAY_ID,
    ancestryId: ANCESTRY_SARANGAY_ID,
    name: 'Sarangay da Meia-Lua',
    originalName: 'Half Moon Sarangay',
    description:
      'Você vem de comunidades viajantes que migram com as estações pelos rios e montanhas de Tian Xia, levando notícias de vilarejo em vilarejo. O povo une comunidades distantes, simbolizado pela meia-lua que junta claro e escuro. Ancestrais altos e robustos, pelagem preta reluzente com manchas claras e chifres curtos bem curvados. Você fica treinado em duas perícias de Conhecimento à escolha e recebe +1 de bônus de circunstância a Recordar Conhecimento com essas perícias.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 60,
    rulesSummary:
      'Treinado em 2 Conhecimentos à escolha; +1 circunstância a Recordar Conhecimento com eles.',
    choices: [
      {
        id: 'half-moon-lore-1',
        label: 'Primeiro Conhecimento',
        hint: 'Tema livre (ex.: Minata, Rios, Geografia). Anote o nome nas notas se escolher Outro.',
        options: [
          { id: 'minata', label: 'Conhecimento de Minata' },
          { id: 'forest', label: 'Conhecimento de Floresta' },
          { id: 'sailing', label: 'Conhecimento de Navegação' },
          { id: 'warfare', label: 'Conhecimento de Guerra' },
          { id: 'other-1', label: 'Outro (anotar nas notas)' },
        ],
      },
      {
        id: 'half-moon-lore-2',
        label: 'Segundo Conhecimento',
        options: [
          { id: 'minata', label: 'Conhecimento de Minata' },
          { id: 'forest', label: 'Conhecimento de Floresta' },
          { id: 'sailing', label: 'Conhecimento de Navegação' },
          { id: 'warfare', label: 'Conhecimento de Guerra' },
          { id: 'other-2', label: 'Outro (anotar nas notas)' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'half-moon-lores',
        name: 'Saberes da Estrada',
        originalName: 'Traveling Lores',
        actionType: 'passive',
        description:
          'Treinado nas duas perícias de Conhecimento escolhidas. +1 de bônus de circunstância a Recordar Conhecimento com elas.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=392',
  },
  {
    id: HERITAGE_NEW_MOON_SARANGAY_ID,
    ancestryId: ANCESTRY_SARANGAY_ID,
    name: 'Sarangay da Lua Nova',
    originalName: 'New Moon Sarangay',
    description:
      'Alguns o chamam de sarangay anão e ao seu povo de “os que se escondem”. Outros sussurram que saem com a lua quando ela “vai à caça” — ditado para a lua nova que some do céu. Ancestrais elusivos erguiam moradias à sombra de bambuzais e valorizavam cautela e independência, passando o saber de andar leve e mover-se como fumaça no bambu. Pelagem marrom-escura ou cinza com marcas brancas e um par em V de chifres chatos e triangulares. Seu tamanho é Pequeno em vez de Médio. Você recebe 10 PV da ancestralidade em vez de 8 e +2 de bônus de circunstância a testes de Atletismo para Empurrar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 60,
    rulesSummary:
      'Tamanho Pequeno; 10 PV (em vez de 8); +2 circunstância a Atletismo para Empurrar.',
    hitPointsOverride: 10,
    sizeOverride: 'small',
    specialAbilities: [
      {
        id: 'new-moon-shove',
        name: 'Empurrão do Bambu',
        originalName: 'Bamboo Shove',
        actionType: 'passive',
        description:
          '+2 de bônus de circunstância a testes de Atletismo para Empurrar.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=393',
  },
  {
    id: HERITAGE_WANING_MOON_SARANGAY_ID,
    ancestryId: ANCESTRY_SARANGAY_ID,
    name: 'Sarangay da Lua Minguante',
    originalName: 'Waning Moon Sarangay',
    description:
      'Seus ancestrais foram nomeados pela lua em transição, sempre mutável. São guardiões de artes secretas, como a lua minguante esconde o rosto, e as comunidades eram famosas por contadores de histórias, artistas e performers. Você viveu à beira de florestas ou rios, onde muitas respostas vinham em enigmas. O povo costuma ser ruivo ou fulvo, com olhos proeminentes e chifres chatos e compactos. Você fica treinado em Acrobacia, Ofício ou Performance (escolha). 1 vez por dia, quando rolar falha crítica com a perícia escolhida, pode rolar de novo e ficar com o novo resultado, mesmo se for pior (fortuna).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 60,
    rulesSummary:
      'Treinado em Acrobacia, Ofício ou Performance; 1×/dia rerrolar falha crítica nessa perícia (fortuna).',
    choices: [
      {
        id: 'skill-waning-moon',
        label: 'Perícia da herança',
        options: [
          { id: 'acrobatics', label: 'Acrobacia', originalLabel: 'Acrobatics' },
          { id: 'crafting', label: 'Ofício', originalLabel: 'Crafting' },
          {
            id: 'performance',
            label: 'Performance',
            originalLabel: 'Performance',
          },
        ],
      },
    ],
    skillGrants: [{ id: 'waning-moon', rank: 'trained' }],
    specialAbilities: [
      {
        id: 'waning-moon-reroll',
        name: 'Segunda Chance Artística',
        originalName: 'Artistic Reroll',
        actionType: 'free',
        frequency: '1 vez por dia',
        description:
          '(Fortuna.) Quando rolar falha crítica com a perícia escolhida, pode rolar de novo e ficar com o novo resultado, mesmo se for pior.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=394',
  },
  {
    id: HERITAGE_WAXING_MOON_SARANGAY_ID,
    ancestryId: ANCESTRY_SARANGAY_ID,
    name: 'Sarangay da Lua Crescente',
    originalName: 'Waxing Moon Sarangay',
    description:
      'Seus ancestrais viviam em pântanos, charcos e florestas alagadas, enfrentando predadores ferozes e formando bandos de raide por recursos escassos. Abençoado pelo crescente, você é um dos evisceradores, capaz de vencer ameaças na água turva e em terra. Nadador poderoso, pelagem marrom ou cinza e chifres curvados para trás ou para baixo. Você recebe +2 de bônus de circunstância a testes de Atletismo para Salto em Distância ou Nadar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 60,
    rulesSummary:
      '+2 circunstância a Atletismo para Salto em Distância ou Nadar.',
    specialAbilities: [
      {
        id: 'waxing-moon-athlete',
        name: 'Atleta do Charco',
        originalName: 'Fen Athlete',
        actionType: 'passive',
        description:
          '+2 de bônus de circunstância a testes de Atletismo para Salto em Distância ou Nadar.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=395',
  },
]
