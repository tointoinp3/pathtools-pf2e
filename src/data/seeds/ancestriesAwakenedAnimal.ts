import type { Ancestry, Heritage } from '@/types/ancestry'
import { AWAKENED_ANIMAL_CATALOG_ID } from '@/data/creatureCatalog'
import { SOURCE_HOWL_OF_THE_WILD_ID } from './sources'

export const ANCESTRY_AWAKENED_ANIMAL_ID = 'ancestry-awakened-animal'

export const HERITAGE_CLIMBING_ANIMAL_ID = 'heritage-climbing-animal'
export const HERITAGE_FLYING_ANIMAL_ID = 'heritage-flying-animal'
export const HERITAGE_RUNNING_ANIMAL_ID = 'heritage-running-animal'
export const HERITAGE_SWIMMING_ANIMAL_ID = 'heritage-swimming-animal'

/**
 * Animal Despertado — Howl of the Wild, Archives of Nethys ID 72.
 *
 * A forma (qual animal) vem do catálogo de criaturas (`awakened-animal`).
 * O jogador escolhe da lista ou anota um animal que não esteja nela.
 */
export const awakenedAnimalAncestry: Ancestry = {
  id: ANCESTRY_AWAKENED_ANIMAL_ID,
  name: 'Animal Despertado',
  originalName: 'Awakened Animal',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
  sourcePage: 23,
  hitPoints: 8,
  size: 'medium',
  speed: 20,
  hitPointsBySize: {
    tiny: 6,
    small: 6,
    medium: 8,
    large: 10,
  },
  extraChoices: [
    {
      id: 'awakened-animal-form',
      label: 'Animal',
      kind: 'creatureCatalog',
      required: true,
      hint: 'Escolha na lista (Monster Core, Howl of the Wild e formas comuns) ou anote outro animal.',
      catalog: {
        id: AWAKENED_ANIMAL_CATALOG_ID,
        kinds: ['animal'],
        allowCustomUntilCatalogReady: true,
        customPlaceholder: 'Ex.: lobo, corvo, tartaruga…',
      },
    },
    {
      id: 'awakened-animal-size',
      label: 'Tamanho',
      kind: 'size',
      required: true,
      hint: 'PV da ancestralidade: Minúsculo/Pequeno 6, Médio 8, Grande 10.',
      sizeOptions: ['tiny', 'small', 'medium', 'large'],
    },
  ],
  attributeBoosts: [
    {
      id: 'awakened-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'awakened-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'awakened-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['intelligence'],
  languages: {
    automatic: ['Comum'],
    additionalOptions: [
      'Dracônico',
      'Anão',
      'Elfo',
      'Feérico',
      'Gnomo',
      'Goblin',
      'Halfling',
      'Jotun',
      'Orc',
      'Sakvroth',
    ],
    additionalFromIntelligence: true,
  },
  senses: [],
  specialAbilities: [
    {
      id: 'awakened-form',
      name: 'Forma Despertada',
      originalName: 'Awakened Form',
      actionType: 'passive',
      description:
        'O despertar alterou sua forma: você fala verbalmente e se sustenta sobre duas pernas. Pode vestir, segurar, empunhar e usar itens. Quais membros usa e quantos fica a critério seu e do mestre, mas nas regras você funciona como um humanoide com duas mãos.',
    },
    {
      id: 'awakened-mind',
      name: 'Mente Despertada',
      originalName: 'Awakened Mind',
      actionType: 'passive',
      description:
        'Você não é mais um animal, mas ainda pode fazer perguntas, receber respostas e usar Diplomacia com animais do seu tipo. Ao lembrar dos instintos, pode se deixar afetar por magias e efeitos como se ainda fosse um animal.',
    },
  ],
  traits: ['Animal Despertado', 'Besta'],
  lore: {
    summary:
      'Animais despertados eram criaturas comuns até ganharem sapiência — um pé na natureza e outro nas cidades. Quase qualquer animal pode despertar, o que permite uma enorme variedade de personagens.',
    youMight: [
      'Mediar sociedades humanoides e criaturas do ermo.',
      'Oscilar entre ruminação e agressão selvagem.',
    ],
    othersProbably: [
      'Pensam que você é uma fera facilmente provocada.',
      'Querem estudá-lo como curiosidade, sem respeito à sua agência.',
    ],
    physicalDescription:
      'Animais despertados se parecem muito com o animal que foram. De relance, humanoides mal distinguem. De perto, olhos e movimentos denunciam autoconsciência. Muitos passam a usar roupas, adornos e ferramentas. Animais reconhecem o despertado na hora e reagem com receio no início. Despertares traumáticos às vezes deixam marcas visuais — ursos de pelo vermelho-chama, aves de penas fantasmagóricas.',
    society:
      'São raros o bastante para raramente formarem sociedades próprias. Muitos se integram a comunidades próximas, disfarçados de animal “típico” ou abertamente como artesãos e trabalhadores. Quem rejeita a vida “civilizada” costuma liderar matilhas ou bandos. Há rumores de Roam, em Iobaria: uma cidade só de animais despertados, lar verdadeiro onde intelecto e espírito selvagem são igualmente bem-vindos.',
    beliefs:
      'Tendem a ver o mundo pela ordem natural. Deuses da natureza como Gozreh são comuns; alguns grupos menores cultuam Lamashtu ou Rovagug. Quem foi despertado por um companheiro pode adotar a visão — e a religião — dessa pessoa.',
    popularEdicts: [
      'Explorar a sapiência recém-descoberta',
      'Aproveitar os confortos da civilização humana',
      'Seguir éditos ligados ao lado animal (ex.: manter a matilha unida)',
    ],
    popularAnathema: ['Regredir a comportamentos puramente animalísticos'],
    sampleNames: [
      'Pelovermelho',
      'Olho Rosnador',
      'Rei Meio-Chifre',
      'Focinhanegra',
      'Bocajoia',
      'Rainha Escama',
      'Bicoamarelo',
      'Garragrande',
      'Mandíbula Sorridente',
      'Carranca',
    ],
  },
  heritageIds: [
    HERITAGE_CLIMBING_ANIMAL_ID,
    HERITAGE_FLYING_ANIMAL_ID,
    HERITAGE_RUNNING_ANIMAL_ID,
    HERITAGE_SWIMMING_ANIMAL_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=72',
}

const ANIMAL_ATTACK_OPTIONS = [
  { id: 'beak', label: 'Bico', originalLabel: 'Beak' },
  { id: 'claw', label: 'Garra', originalLabel: 'Claw' },
  { id: 'fist', label: 'Punho', originalLabel: 'Fist' },
  { id: 'jaws', label: 'Mandíbulas', originalLabel: 'Jaws' },
  { id: 'talon', label: 'Gadanho', originalLabel: 'Talon' },
  { id: 'tail', label: 'Cauda', originalLabel: 'Tail' },
  { id: 'wing', label: 'Asa', originalLabel: 'Wing' },
  { id: 'other', label: 'Outro (anotar nas notas)' },
]

export const awakenedAnimalHeritages: Heritage[] = [
  {
    id: HERITAGE_CLIMBING_ANIMAL_ID,
    ancestryId: ANCESTRY_AWAKENED_ANIMAL_ID,
    name: 'Animal Escalador',
    originalName: 'Climbing Animal',
    description:
      'Seus membros servem para agarrar, escalar e se balançar — chimpanzé, lontra, urso, guaxinim ou preguiça. Você tem Deslocamento terrestre 20 pés, Deslocamento de escalada 20 pés e um ataque animal à sua escolha (em geral garra, punho ou mandíbulas).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 24,
    rulesSummary: 'Deslocamento 20 pés; escalada 20 pés; 1 ataque animal.',
    speedOverride: 20,
    additionalSpeeds: { climb: 20 },
    choices: [
      {
        id: 'climbing-attack',
        label: 'Ataque animal',
        options: ANIMAL_ATTACK_OPTIONS.filter((o) =>
          ['claw', 'fist', 'jaws', 'other'].includes(o.id),
        ),
      },
    ],
    specialAbilities: [
      {
        id: 'climbing-animal-attack',
        name: 'Ataque Animal',
        originalName: 'Animal Attack',
        actionType: 'passive',
        description:
          'Você tem um ataque desarmado do tipo escolhido, no grupo briga (veja a barra lateral de Ataques Animais no livro).',
      },
    ],
  },
  {
    id: HERITAGE_FLYING_ANIMAL_ID,
    ancestryId: ANCESTRY_AWAKENED_ANIMAL_ID,
    name: 'Animal Voador',
    originalName: 'Flying Animal',
    description:
      'Você é um animal que voava em rajadas longas — águia, morcego, abelha ou esquilo-voador. O despertar atrapalhou o voo automático: o que era instinto agora exige pensamento até voltar a ser natural. Você ainda abranda a queda e não sofre dano de queda. A maioria pega o feito Tomar Voo no 1º nível para recuperar voo limitado. Deslocamento terrestre 20 pés e um ataque animal (bico, garra, mandíbulas, gadanho ou asa).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 24,
    rulesSummary:
      'Deslocamento 20 pés; imune a dano de queda; 1 ataque animal. Voo limitado via feito Tomar Voo.',
    speedOverride: 20,
    choices: [
      {
        id: 'flying-attack',
        label: 'Ataque animal',
        options: ANIMAL_ATTACK_OPTIONS.filter((o) =>
          ['beak', 'claw', 'jaws', 'talon', 'wing', 'other'].includes(o.id),
        ),
      },
    ],
    specialAbilities: [
      {
        id: 'flying-fall',
        name: 'Queda Amortecida',
        originalName: 'Slow Fall',
        actionType: 'passive',
        description:
          'Você não sofre dano de queda, independentemente da distância.',
      },
      {
        id: 'flying-animal-attack',
        name: 'Ataque Animal',
        originalName: 'Animal Attack',
        actionType: 'passive',
        description:
          'Você tem um ataque desarmado do tipo escolhido, no grupo briga.',
      },
    ],
  },
  {
    id: HERITAGE_RUNNING_ANIMAL_ID,
    ancestryId: ANCESTRY_AWAKENED_ANIMAL_ID,
    name: 'Animal Corredor',
    originalName: 'Running Animal',
    description:
      'Você nasceu para correr em terra. Em geral de quatro — cão, guepardo, iguana — mas também pode usar duas pernas, como canguru, ema ou pinguim. Deslocamento terrestre 30 pés e um ataque animal (garra, mandíbulas ou cauda).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 24,
    rulesSummary: 'Deslocamento 30 pés; 1 ataque animal.',
    speedOverride: 30,
    choices: [
      {
        id: 'running-attack',
        label: 'Ataque animal',
        options: ANIMAL_ATTACK_OPTIONS.filter((o) =>
          ['claw', 'jaws', 'tail', 'other'].includes(o.id),
        ),
      },
    ],
    specialAbilities: [
      {
        id: 'running-animal-attack',
        name: 'Ataque Animal',
        originalName: 'Animal Attack',
        actionType: 'passive',
        description:
          'Você tem um ataque desarmado do tipo escolhido, no grupo briga.',
      },
    ],
  },
  {
    id: HERITAGE_SWIMMING_ANIMAL_ID,
    ancestryId: ANCESTRY_AWAKENED_ANIMAL_ID,
    name: 'Animal Nadador',
    originalName: 'Swimming Animal',
    description:
      'Você é um animal aquático mais à vontade na água — jacaré, foca, baleia, golfinho, peixe ou crustáceo. Escolha se é aquático ou habitante da água. Um ataque animal (garra, mandíbulas ou cauda).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 24,
    rulesSummary:
      'Aquático: natação 30 pés, respira água. Habitante da água: natação 20 pés, terrestre 20 pés, prende a respiração 10 min.',
    speedOverride: 20,
    additionalSpeeds: { swim: 20 },
    choices: [
      {
        id: 'swimming-lifestyle',
        label: 'Estilo de vida',
        options: [
          {
            id: 'aquatic',
            label: 'Aquático (respira água)',
            originalLabel: 'Aquatic',
            speedOverride: 0,
            additionalSpeeds: { swim: 30 },
          },
          {
            id: 'water-dwelling',
            label: 'Habitante da água (prende a respiração)',
            originalLabel: 'Water-dwelling',
            speedOverride: 20,
            additionalSpeeds: { swim: 20 },
          },
        ],
      },
      {
        id: 'swimming-attack',
        label: 'Ataque animal',
        options: ANIMAL_ATTACK_OPTIONS.filter((o) =>
          ['claw', 'jaws', 'tail', 'other'].includes(o.id),
        ),
      },
    ],
    specialAbilities: [
      {
        id: 'swimming-lifestyle',
        name: 'Vida Aquática',
        originalName: 'Aquatic or Water-Dwelling',
        actionType: 'passive',
        description:
          'Aquático: traço aquático, natação 30 pés, respira água (não ar); Golpes desarmados contundentes/cortantes não sofrem −2 debaixo d’água. Habitante da água: prende a respiração 10 minutos; natação 20 pés e, se puder se mover em terra, Deslocamento 20 pés.',
      },
      {
        id: 'swimming-animal-attack',
        name: 'Ataque Animal',
        originalName: 'Animal Attack',
        actionType: 'passive',
        description:
          'Você tem um ataque desarmado do tipo escolhido, no grupo briga.',
      },
    ],
  },
]
