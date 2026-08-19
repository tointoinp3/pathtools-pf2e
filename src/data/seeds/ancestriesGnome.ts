import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  SOURCE_PLAYER_CORE_ID,
  SOURCE_TIAN_XIA_CG_ID,
} from './sources'

export const ANCESTRY_GNOME_ID = 'ancestry-gnome'

export const HERITAGE_CHAMELEON_GNOME_ID = 'heritage-chameleon-gnome'
export const HERITAGE_FEY_TOUCHED_GNOME_ID = 'heritage-fey-touched-gnome'
export const HERITAGE_KIJIMUNA_GNOME_ID = 'heritage-kijimuna-gnome'
export const HERITAGE_SENSATE_GNOME_ID = 'heritage-sensate-gnome'
export const HERITAGE_UMBRAL_GNOME_ID = 'heritage-umbral-gnome'
export const HERITAGE_WELLSPRING_GNOME_ID = 'heritage-wellspring-gnome'

/** Gnomo — Player Core (Remaster), Archives of Nethys ID 61 */
export const gnomeAncestry: Ancestry = {
  id: ANCESTRY_GNOME_ID,
  name: 'Gnomo',
  originalName: 'Gnome',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 51,
  hitPoints: 8,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'gnome-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'gnome-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'gnome-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['strength'],
  languages: {
    automatic: ['Comum', 'Feérico', 'Gnomo'],
    additionalOptions: ['Dracônico', 'Anão', 'Elfo', 'Goblin', 'Jotun', 'Orc'],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'gnome-low-light-vision',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, ignorando a condição ocultado causada por penumbra.',
    },
  ],
  specialAbilities: [],
  traits: ['Gnomo', 'Humanoide'],
  lore: {
    summary:
      'Gnomos são um povo baixo e resistente, com curiosidade inesgotável e hábitos excêntricos. Há muito tempo, ancestrais gnomos emigraram do Primeiro Mundo, reino feérico. Não está claro por que os primeiros gnomos vieram a Golarion, mas essa linhagem aparece hoje como raciocínio bizarro, excentricidade, obsessões e o que alguns veem como ingenuidade. Sempre famintos por novas experiências, gnomos vagam mental e fisicamente para adiar uma aflição terrível: o Desbotamento, que atinge gnomos que deixam de sonhar, inovar e viver o novo. O Desbotamento drena as cores — literalmente — e mergulha as vítimas em depressão profunda que acaba ceifando suas vidas. Poucos sobrevivem, tornando-se desbotados melancólicos e sábios.',
    youMight: [
      'Abraçar o aprendizado e saltar de uma área de estudo a outra sem aviso.',
      'Falar, pensar e se mover rápido, e perder a paciência com quem não acompanha.',
    ],
    othersProbably: [
      'Apreciam seu entusiasmo e a energia com que enfrenta situações novas.',
      'Têm dificuldade em entender suas motivações ou se adaptar às suas mudanças rápidas de direção.',
    ],
    physicalDescription:
      'A maioria dos gnomos mede pouco mais de 90 cm e pesa pouco mais que uma criança humana. Exibem ampla variedade de cores naturais de pele, cabelo e olhos. Para gnomos que ainda não iniciaram o Desbotamento, quase qualquer cor de cabelo e olhos além do branco é possível — cores vibrantes são as mais frequentes —, enquanto tons de pele tendem a tons terrosos e rosados, ocasionalmente verdes, pretos ou azul-claros. Gnomos tipicamente atingem a maturidade física aos 18 anos, embora muitos mantenham curiosidade infantil mesmo adultos. Um gnomo pode, em teoria, viver indefinidamente se evitar o Desbotamento, mas na prática raramente passa dos 400 anos.',
    society:
      'Embora a maioria dos gnomos adote práticas culturais da região onde vive, costuma escolher à la carte, ajustando comunidades à própria lógica feérica. Isso muitas vezes faz comunidades majoritariamente gnomônicas acabarem quase só com gnomos, enquanto outros povos, confusos com decisões políticas gnomônicas, partem. Há pouquíssima cultura que considerem inteiramente sua; reinos gnomos na superfície de Golarion são excepcionalmente raros. Por necessidade, poucos gnomos se casam para a vida — deixam relacionamentos seguirem seu curso antes de seguir adiante amigavelmente, para adiar o Desbotamento com novas experiências. Famílias tendem a ser pequenas, e muitas comunidades criam filhos de forma comunitária, com limites familiares fluidos. Nomes gnomônicos podem ser longos e polissilábicos; gnomos raramente se preocupam com a pronúncia e costumam usar apelidos mais curtos.',
    beliefs:
      'Embora sejam trapaceiros impulsivos com motivos inescrutáveis, muitos tentam tornar o mundo um lugar melhor. São propensos a emoções poderosas e raramente tímidos em ajudar quem julgam merecer. Adoram com mais frequência divindades que valorizam individualidade e natureza, como Cayden Cailean, Desna, Gozreh e Shelyn.',
    popularEdicts: [
      'Buscar novas experiências',
      'Abraçar sua inspiração',
      'Passar de obsessão em obsessão',
    ],
    popularAnathema: [
      'Desacelerar para se explicar',
      'Privar alguém de toda estimulação',
    ],
    sampleNames: [
      'Abroshtor',
      'Bastargre',
      'Besh',
      'Fijit',
      'Halungalom',
      'Krolmnite',
      'Neji',
      'Majet',
      'Pai',
      'Poshment',
      'Queck',
      'Trig',
      'Zarzuket',
      'Zatqualmie',
    ],
  },
  heritageIds: [
    HERITAGE_CHAMELEON_GNOME_ID,
    HERITAGE_FEY_TOUCHED_GNOME_ID,
    HERITAGE_KIJIMUNA_GNOME_ID,
    HERITAGE_SENSATE_GNOME_ID,
    HERITAGE_UMBRAL_GNOME_ID,
    HERITAGE_WELLSPRING_GNOME_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=61',
}

export const gnomeHeritages: Heritage[] = [
  {
    id: HERITAGE_CHAMELEON_GNOME_ID,
    ancestryId: ANCESTRY_GNOME_ID,
    name: 'Gnomo Camaleão',
    originalName: 'Chameleon Gnome',
    description:
      'A cor do seu cabelo e da sua pele é mutável, possivelmente por magia latente do Primeiro Mundo ou efeitos de ilusão remanescentes. Você pode mudar lentamente a vivacidade e a cor exata, e a coloração pode variar pelo corpo, permitindo padrões ou desenhos. Leva uma ação para mudanças locais menores e até uma hora para mudanças dramáticas em todo o corpo. Enquanto dorme, as cores mudam sozinhas ao ritmo dos sonhos. Quando você está em uma área em que sua coloração é aproximadamente semelhante ao ambiente (por exemplo, verde-floresta em uma floresta), pode usar a ação única para mudanças locais menores que ajudam a se camuflar, recebendo +2 de bônus de circunstância a testes de Furtividade até o entorno mudar de cor ou padrão.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 51,
    rulesSummary:
      '1 ação: camuflagem cromática (+2 Furtividade enquanto a coloração combina com o ambiente).',
    specialAbilities: [
      {
        id: 'chameleon-blend',
        name: 'Camuflagem Cromática',
        originalName: 'Chameleon Blend',
        actionType: 'one',
        description:
          'Em área cuja coloração é semelhante à sua, faça mudanças locais menores para se camuflar. Você recebe +2 de bônus de circunstância a testes de Furtividade até o entorno mudar de cor ou padrão.',
      },
    ],
  },
  {
    id: HERITAGE_FEY_TOUCHED_GNOME_ID,
    ancestryId: ANCESTRY_GNOME_ID,
    name: 'Gnomo Tocado pelos Feéricos',
    originalName: 'Fey-touched Gnome',
    description:
      'O sangue feérico corre em suas veias, saturando-o com magia e tornando-o verdadeiramente um deles. Você ganha o traço feérico, além dos traços gnomo e humanoide. Escolha um truque da lista de magias primais. Você pode conjurá-lo como magia primal inata à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Você pode trocar esse truque por outro da mesma lista uma vez por dia meditando 10 minutos para se realinhar com o Primeiro Mundo (atividade com o traço concentrar).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 51,
    rulesSummary:
      'Traço feérico; 1 truque primal inato à vontade (trocável 1×/dia com 10 min).',
    traits: ['Feérico'],
    choices: [
      {
        id: 'fey-touched-cantrip',
        label: 'Truque primal inato',
        options: [
          { id: 'detect-magic', label: 'Detectar Magia', originalLabel: 'Detect Magic' },
          { id: 'guidance', label: 'Orientação', originalLabel: 'Guidance' },
          { id: 'light', label: 'Luz', originalLabel: 'Light' },
          { id: 'prestidigitation', label: 'Prestidigitação', originalLabel: 'Prestidigitation' },
          { id: 'stabilize', label: 'Estabilizar', originalLabel: 'Stabilize' },
          { id: 'tanglefoot', label: 'Pé-de-galinha', originalLabel: 'Tanglefoot' },
          { id: 'other', label: 'Outro (anotar nas notas)' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'fey-touched-innate-cantrip',
        name: 'Truque Primal Inato',
        originalName: 'Primal Innate Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura o truque primal escolhido como magia inata à vontade. Pode trocá-lo 1 vez por dia com 10 minutos de meditação (concentrar).',
      },
    ],
  },
  {
    id: HERITAGE_KIJIMUNA_GNOME_ID,
    ancestryId: ANCESTRY_GNOME_ID,
    name: 'Gnomo Kijimuna',
    originalName: 'Kijimuna Gnome',
    description:
      'Seus ancestrais viviam nas árvores e pescavam em todas as águas de Tian Xia. Você ganha um dos benefícios a seguir (a escolha é permanente): pode escalar qualquer banian — recebe o feito Escalador de Combate e, se obtiver sucesso no teste de Atletismo para Escalar, o resultado vira sucesso crítico; ou pode pegar qualquer peixe — recebe deslocamento de natação de 4,5 metros.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 38,
    rulesSummary:
      'Escolha permanente: Escalador de Combate + sucesso→crítico ao Escalar, ou natação 4,5 m.',
    choices: [
      {
        id: 'kijimuna-benefit',
        label: 'Benefício kijimuna',
        options: [
          {
            id: 'climb-banyan',
            label: 'Escalar qualquer banian',
            originalLabel: 'Climb any banyan',
            description:
              'Você recebe o feito Escalador de Combate. Se obtiver sucesso no teste de Atletismo para Escalar, o resultado vira sucesso crítico.',
          },
          {
            id: 'catch-fish',
            label: 'Pegar qualquer peixe (natação 4,5 m)',
            originalLabel: 'Catch any fish',
            description:
              'Você recebe deslocamento de natação de 4,5 metros.',
          },
        ],
      },
    ],
    featGrants: [
      {
        id: 'kijimuna-combat-climber',
        featId: 'feat-combat-climber',
        featName: 'Escalador de Combate',
        originalName: 'Combat Climber',
        featType: 'general',
        requiresChoiceId: 'kijimuna-benefit',
        requiresChoiceValue: 'climb-banyan',
      },
    ],
  },
  {
    id: HERITAGE_SENSATE_GNOME_ID,
    ancestryId: ANCESTRY_GNOME_ID,
    name: 'Gnomo Sensorial',
    originalName: 'Sensate Gnome',
    description:
      'Você vê todas as cores mais vivas, ouve todos os sons mais ricos e, sobretudo, cheira todos os aromas com detalhe incrível. Você ganha um sentido especial: faro impreciso com alcance de 9 metros. Isso significa que pode usar o olfato para determinar a localização exata de uma criatura. O mestre normalmente dobra o alcance se você estiver a favor do vento da criatura, ou reduz pela metade se estiver contra o vento. Além disso, recebe +2 de bônus de circunstância a testes de Percepção ao tentar localizar uma criatura não detectada dentro do alcance do faro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 51,
    rulesSummary:
      'Faro impreciso 9 m; +2 Percepção para achar não detectados no alcance do faro.',
    specialAbilities: [
      {
        id: 'sensate-scent',
        name: 'Faro Impreciso',
        originalName: 'Imprecise Scent',
        actionType: 'passive',
        description:
          'Você tem faro impreciso com alcance de 9 metros e +2 de bônus de circunstância a Percepção para localizar criaturas não detectadas nesse alcance.',
      },
    ],
  },
  {
    id: HERITAGE_UMBRAL_GNOME_ID,
    ancestryId: ANCESTRY_GNOME_ID,
    name: 'Gnomo Umbral',
    originalName: 'Umbral Gnome',
    description:
      'Seja por conexão com seres feéricos sombrios, pelos gnomos subterrâneos conhecidos como drathnelar ou por outra fonte, você enxerga na escuridão completa. Você ganha visão no escuro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 51,
    rulesSummary: 'Ganha Visão no Escuro.',
    specialAbilities: [
      {
        id: 'umbral-darkvision',
        name: 'Visão no Escuro',
        originalName: 'Darkvision',
        actionType: 'passive',
        description:
          'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
      },
    ],
  },
  {
    id: HERITAGE_WELLSPRING_GNOME_ID,
    ancestryId: ANCESTRY_GNOME_ID,
    name: 'Gnomo da Nascente',
    originalName: 'Wellspring Gnome',
    description:
      'Alguma outra fonte de magia tem mais influência sobre você do que a magia primal de sua linhagem feérica. Essa conexão pode vir de um plano oculto ou de uma canção antiga; de uma divindade, celestial ou demônio; de efluente mágico deixado por uma guerra de magos; ou de magia rúnica antiga. Escolha arcana, divina ou oculta. Você ganha um truque da lista dessa tradição e pode conjurá-lo como magia inata à vontade, dessa tradição. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Sempre que ganhar uma magia primal inata de um feito de ancestralidade gnomo, mude a tradição dela de primal para a tradição escolhida.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 51,
    rulesSummary:
      '1 truque inato (arcano, divino ou oculto) à vontade; magias gnomônicas inatas usam essa tradição.',
    choices: [
      {
        id: 'wellspring-tradition',
        label: 'Tradição mágica',
        options: [
          { id: 'arcane', label: 'Arcana', originalLabel: 'Arcane' },
          { id: 'divine', label: 'Divina', originalLabel: 'Divine' },
          { id: 'occult', label: 'Oculta', originalLabel: 'Occult' },
        ],
      },
      {
        id: 'wellspring-cantrip',
        label: 'Truque inato',
        options: [
          { id: 'detect-magic', label: 'Detectar Magia', originalLabel: 'Detect Magic' },
          { id: 'guidance', label: 'Orientação', originalLabel: 'Guidance' },
          { id: 'light', label: 'Luz', originalLabel: 'Light' },
          { id: 'message', label: 'Mensagem', originalLabel: 'Message' },
          { id: 'shield', label: 'Escudo', originalLabel: 'Shield' },
          { id: 'other', label: 'Outro (anotar nas notas)' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'wellspring-innate-cantrip',
        name: 'Truque Inato da Nascente',
        originalName: 'Wellspring Innate Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura o truque escolhido como magia inata da tradição escolhida à vontade.',
      },
    ],
  },
]
