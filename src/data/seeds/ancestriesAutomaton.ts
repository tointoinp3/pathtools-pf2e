import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_GUNS_GEARS_ID, SOURCE_IMPOSSIBLE_MAGIC_ID } from './sources'

export const ANCESTRY_AUTOMATON_ID = 'ancestry-automaton'

export const HERITAGE_HUNTER_AUTOMATON_ID = 'heritage-hunter-automaton'
export const HERITAGE_MAGE_AUTOMATON_ID = 'heritage-mage-automaton'
export const HERITAGE_SHARPSHOOTER_AUTOMATON_ID = 'heritage-sharpshooter-automaton'
export const HERITAGE_WARRIOR_AUTOMATON_ID = 'heritage-warrior-automaton'
export const HERITAGE_NEWLY_MINTED_AUTOMATON_ID = 'heritage-newly-minted-automaton'
export const HERITAGE_DEFENSIVE_AUTOMATON_ID = 'heritage-defensive-automaton'

/** Autômato — Guns & Gears (Remastered), Archives of Nethys ID 48 */
export const automatonAncestry: Ancestry = {
  id: ANCESTRY_AUTOMATON_ID,
  name: 'Autômato',
  originalName: 'Automaton',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_GUNS_GEARS_ID,
  sourcePage: 36,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  extraChoices: [
    {
      id: 'automaton-size',
      label: 'Tamanho',
      kind: 'size',
      required: true,
      hint: 'Corpo Médio ou Pequeno — a construção Jistkan cabia nos dois portes.',
      sizeOptions: ['medium', 'small'],
    },
  ],
  attributeBoosts: [
    {
      id: 'automaton-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'automaton-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: [],
  languages: {
    automatic: ['Comum', 'Utopian'],
    additionalOptions: [
      'Ctoniano',
      'Diabólico',
      'Anão',
      'Elfo',
      'Empíreo',
      'Petran',
      'Pyric',
      'Talássico',
      'Sussuran',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'automaton-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'automaton-core',
      name: 'Núcleo de Autômato',
      originalName: 'Automaton Core',
      actionType: 'passive',
      description:
        'Seu corpo guarda um núcleo infundido com quintessência planar: alma, energia vital e poder. Você é uma criatura viva — não tem as imunidades típicas de construto, pode ser alvo de efeitos que afetam vivos e recupera PV com energia de vitalidade. Ao chegar a 0 PV você não é destruído: fica nocauteado e começa a morrer, como qualquer vivo.',
    },
    {
      id: 'automaton-constructed-body',
      name: 'Corpo Construído',
      originalName: 'Constructed Body',
      actionType: 'passive',
      description:
        'Você não precisa comer nem beber. Não dorme, mas precisa de 2 horas em estado de espera (standby) por dia: consciente do entorno, sem as penalidades de inconsciente. Sem isso, fica fatigado até completar as 2 horas. Ainda precisa de ar respirável para ventilar o exaustor mágico do núcleo — pode sufocar como um vivo.',
    },
  ],
  traits: ['Autômato', 'Construto'],
  lore: {
    summary:
      'Construtos inteligentes que abrigam almas de verdade: o último grande feito do Império Jistka. Tecnologia e magia fundidas num ser único em Golarion.',
    youMight: [
      'Ter séculos de vida e ter visto muitos acontecimentos.',
      'Hesitar em confiar até a pessoa merecer.',
      'Lembrar pouco da vida antes de virar autômato.',
    ],
    othersProbably: [
      'Te confundem com um construto sem mente à primeira vista.',
      'Assumem que você guarda segredos de magia e tecnologia.',
      'Olham para você com espanto.',
    ],
    physicalDescription:
      'Autômatos misturam metais e pedra tratados magicamente: resistentes, pesados e ainda assim tão rápidos quanto outros combatentes. A forma varia com o papel — a maioria é humanoide, alguns lembram animais. Quase todos têm um olho que brilha com luz mágica. No interior, um artefato poderoso (o núcleo) guarda a alma e combina energia vital e planar. Não envelhecem; muitos têm milhares de anos, o corpo intacto mesmo quando a mente cedeu ao tempo.',
    society:
      'A maioria leva vida solitária. Grupos que foram feitos para trabalhar juntos ainda viajam em equipe, mas povoados de autômatos são raríssimos — em geral escondidos nas ruínas de Jistka. Encontros com outras ancestralidades vão do sigilo extremo à convivência aberta. Cidades grandes (Absalom, Azir, Quantium) facilitam o dia a dia, mas caçadores e estudiosos sempre tentam o núcleo.',
    beliefs:
      'Muitos emulam os eões de Axis e evitam desordem. Poucos são especialmente bondosos ou cruéis. Cultos comuns: Brigh, Nethys, Irori, Pharasma e, mais recentemente, Casandalee. Pharasmins costumam aprender a libertar a alma do núcleo.',
    popularEdicts: [
      'Dedicar-se ao propósito do seu corpo',
      'Ajudar outros autômatos a libertar a alma quando pedirem',
      'Minimizar quantas pessoas te veem',
      'Viajar para outros planos',
    ],
    popularAnathema: [
      'Permitir que outros acessem seu núcleo',
      'Usar o corpo para destruição em massa',
    ],
    sampleNames: [
      'Alnhaman',
      'Busmin',
      'The Doleful',
      'Enoh',
      'Himar',
      'Kantral',
      'The Kindred',
      'Numinar',
      'Scholar',
      'Tehkis',
      'Wayfarer',
      'Yulmian',
    ],
  },
  heritageIds: [
    HERITAGE_HUNTER_AUTOMATON_ID,
    HERITAGE_MAGE_AUTOMATON_ID,
    HERITAGE_SHARPSHOOTER_AUTOMATON_ID,
    HERITAGE_WARRIOR_AUTOMATON_ID,
    HERITAGE_NEWLY_MINTED_AUTOMATON_ID,
    HERITAGE_DEFENSIVE_AUTOMATON_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=48',
}

export const automatonHeritages: Heritage[] = [
  {
    id: HERITAGE_HUNTER_AUTOMATON_ID,
    ancestryId: ANCESTRY_AUTOMATON_ID,
    name: 'Autômato Caçador',
    originalName: 'Hunter Automaton',
    description:
      'Você foi feito para batedor ou assassino, com corpo de caçador de matilha (gato grande ou lobo). Costuma se mover como quadrúpede, mas ainda luta em pé e usa equipamento normalmente. Com as duas mãos livres, o Deslocamento sobe para 9 m ao correr nas quatro patas.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 36,
    rulesSummary:
      'Com as duas mãos livres, Deslocamento 9 m ao correr como quadrúpede.',
    specialAbilities: [
      {
        id: 'hunter-quadruped',
        name: 'Quadrúpede',
        originalName: 'Quadruped Design',
        actionType: 'passive',
        description:
          'Se tiver as duas mãos livres, seu Deslocamento aumenta para 9 m enquanto corre nas quatro patas. Ainda pode ficar em pé e usar todo o equipamento.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=184',
  },
  {
    id: HERITAGE_MAGE_AUTOMATON_ID,
    ancestryId: ANCESTRY_AUTOMATON_ID,
    name: 'Autômato Mago',
    originalName: 'Mage Automaton',
    description:
      'A câmara do núcleo liga-se mais direto ao corpo humanoide, e você canaliza a magia do núcleo. Ganha um truque da lista arcana, conjurado como magia inata arcana à vontade. O truque é elevado à metade do seu nível (arredondado para cima). Anote o truque nas notas.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 36,
    rulesSummary: 'Um truque arcano inato à vontade (elevado à metade do nível).',
    specialAbilities: [
      {
        id: 'mage-core-cantrip',
        name: 'Truque do Núcleo',
        originalName: 'Core Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Escolha um truque da lista arcana. Você o conjura como magia inata arcana à vontade, elevado à metade do seu nível (arredondado para cima).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=185',
  },
  {
    id: HERITAGE_SHARPSHOOTER_AUTOMATON_ID,
    ancestryId: ANCESTRY_AUTOMATON_ID,
    name: 'Autômato Atirador',
    originalName: 'Sharpshooter Automaton',
    description:
      'Forma humanaide leve, feita para velocidade e precisão à distância. Você ganha a ação Mira de Autômato.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 36,
    rulesSummary: 'Ação Mira de Autômato (reduz penalidade de incremento de alcance).',
    specialAbilities: [
      {
        id: 'sharpshooter-automaton-aim',
        name: 'Mira de Autômato',
        originalName: 'Automaton Aim',
        actionType: 'one',
        description:
          'Você firma o corpo e observa o campo. A penalidade por atirar no segundo incremento de alcance cai de –2 para 0 no próximo ataque à distância neste turno. Pode usar a ação de novo no mesmo turno para zerar a penalidade do terceiro incremento (de –4 para 0) nesse próximo ataque.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=186',
  },
  {
    id: HERITAGE_WARRIOR_AUTOMATON_ID,
    ancestryId: ANCESTRY_AUTOMATON_ID,
    name: 'Autômato Guerreiro',
    originalName: 'Warrior Automaton',
    description:
      'Corpo mais volumoso, pensado para combate. O dado de dano do soco sobe para 1d6 (em vez de 1d4). Você não sofre penalidade ao fazer um ataque letal com o soco ou outro ataque desarmado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 36,
    rulesSummary: 'Soco 1d6; sem penalidade em ataques desarmados letais.',
    specialAbilities: [
      {
        id: 'warrior-fist',
        name: 'Punho Reforçado',
        originalName: 'Bulkier Fist',
        actionType: 'passive',
        description:
          'O dado de dano do seu soco é 1d6. Ataques desarmados letais não sofrem a penalidade usual.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=187',
  },
  {
    id: HERITAGE_NEWLY_MINTED_AUTOMATON_ID,
    ancestryId: ANCESTRY_AUTOMATON_ID,
    name: 'Autômato Recém-Cunhado',
    originalName: 'Newly Minted Automaton',
    description:
      'Você é um autômato novo, em geral construído em Quantium. O corpo é o de sempre, mas a mente é fresca e aprende rápido. Ganha o feito de perícia Conhecimento Adicional em um conhecimento à escolha e um idioma extra da lista a que tem acesso.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 110,
    rulesSummary: 'Conhecimento Adicional (um conhecimento) e +1 idioma de acesso.',
    featGrants: [
      {
        id: 'newly-minted-additional-lore',
        featId: 'feat-additional-lore',
        featName: 'Conhecimento Adicional',
        originalName: 'Additional Lore',
        featType: 'skill',
      },
    ],
    specialAbilities: [
      {
        id: 'newly-minted-language',
        name: 'Mente Fresca',
        originalName: 'Fresh Mind',
        actionType: 'passive',
        description:
          'Você conhece um idioma adicional da lista a que tem acesso. Anote-o nas notas.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=439',
  },
  {
    id: HERITAGE_DEFENSIVE_AUTOMATON_ID,
    ancestryId: ANCESTRY_AUTOMATON_ID,
    name: 'Autômato Defensivo',
    originalName: 'Defensive Automaton',
    description:
      'Você foi construído especialmente resistente. Ganha 10 PV da ancestralidade (em vez de 8) e o feito Robustez.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 110,
    rulesSummary: 'PV da ancestralidade 10; feito Robustez.',
    hitPointsOverride: 10,
    featGrants: [
      {
        id: 'defensive-toughness',
        featId: 'feat-toughness',
        featName: 'Robustez',
        originalName: 'Toughness',
        featType: 'general',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=438',
  },
]
