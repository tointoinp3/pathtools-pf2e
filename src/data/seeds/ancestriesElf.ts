import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  SOURCE_HIGH_SEAS_ID,
  SOURCE_PLAYER_CORE_ID,
} from './sources'

export const ANCESTRY_ELF_ID = 'ancestry-elf'

export const HERITAGE_ANCIENT_ELF_ID = 'heritage-ancient-elf'
export const HERITAGE_AQUATIC_ELF_ID = 'heritage-aquatic-elf'
export const HERITAGE_ARCTIC_ELF_ID = 'heritage-arctic-elf'
export const HERITAGE_CAVERN_ELF_ID = 'heritage-cavern-elf'
export const HERITAGE_SEER_ELF_ID = 'heritage-seer-elf'
export const HERITAGE_WHISPER_ELF_ID = 'heritage-whisper-elf'
export const HERITAGE_WOODLAND_ELF_ID = 'heritage-woodland-elf'

/** Elfo — Player Core (Remaster), Archives of Nethys ID 60 */
export const elfAncestry: Ancestry = {
  id: ANCESTRY_ELF_ID,
  name: 'Elfo',
  originalName: 'Elf',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 47,
  hitPoints: 6,
  size: 'medium',
  speed: 30,
  attributeBoosts: [
    {
      id: 'elf-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'elf-boost-int',
      label: 'Boost de Inteligência',
      option: { kind: 'specific', attributes: ['intelligence'] },
    },
    {
      id: 'elf-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['constitution'],
  languages: {
    automatic: ['Comum', 'Elfo'],
    additionalOptions: [
      'Dracônico',
      'Empíreo',
      'Feérico',
      'Gnomo',
      'Goblin',
      'Kholo',
      'Orc',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'elf-low-light-vision',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, ignorando a condição ocultado causada por penumbra.',
    },
  ],
  specialAbilities: [],
  traits: ['Elfo', 'Humanoide'],
  lore: {
    summary:
      'Elfos são um povo alto e longevo, com forte tradição de arte e magia. Como povo antigo, viram grandes mudanças e têm a perspectiva de quem observou o arco da história. Depois de deixar Golarion em tempos antigos, retornaram a uma terra transformada e ainda lutam para recuperar seus lares ancestrais. Valorizam bondade, intelecto e beleza; muitos se esforçam para aprimorar modos, aparência e cultura. Seus estudos vão a um nível de detalhe que povos de vida mais curta consideram excessivo. Elfos costumam ser reservados, envoltos nos segredos de seus bosques e grupos de parentesco. São lentos para fazer amizades fora dos seus — elfos que vivem entre povos de vida curta muitas vezes ficam melancólicos ao ver gerações de companheiros envelhecerem e morrerem. Esses elfos são conhecidos como Desolados entre os seus.',
    youMight: [
      'Cultivar com cuidado relações com pessoas de expectativa de vida mais curta.',
      'Adotar interesses especializados ou obscuros só pelo prazer de dominá-los.',
    ],
    othersProbably: [
      'Focam na sua aparência — admirando sua graça ou tratando-o como fisicamente frágil.',
      'Temem que você os menospreze em privado, ou sentem que é condescendente e distante.',
    ],
    physicalDescription:
      'Embora em geral mais altos que humanos, elfos possuem uma graça frágil, acentuada por traços alongados e orelhas pontudas. Seus olhos são largos e arredondados, com pupilas grandes e frequentemente de cores vibrantes que ocupam toda a porção visível do olho — dando-lhes um ar alienígena e permitindo visão aguçada mesmo com pouca luz. Elfos se adaptam gradualmente ao ambiente e aos companheiros, e muitas vezes adquirem traços físicos que refletem o entorno. Um elfo que viveu séculos em florestas primevas pode ter cabelo verdejante e dedos retorcidos; um que viveu no deserto pode ter pupilas e pele douradas. Elfos alcançam a maturidade física por volta dos 20 anos, embora outros elfos só os considerem emocionalmente maduros perto do fim do primeiro século. Um elfo típico pode viver cerca de 600 anos.',
    society:
      'A paciência inata e a curiosidade intelectual fazem dos elfos excelentes sábios, filósofos e magos; suas sociedades se apoiam no senso de maravilha e conhecimento. Cultivam ideais profundos de individualismo, permitindo que cada elfo explore várias ocupações antes de se fixar em uma paixão. Guardam rancores notórios contra rivais — chamados ilduliel — mas essas rivalidades às vezes florescem em amizades com o tempo. Um elfo mantém o nome pessoal em segredo entre a família e usa um apelido ao conhecer outras pessoas; esse apelido pode mudar com eventos da vida ou por capricho. Nomes élficos têm várias sílabas e devem fluir de forma lírica — ao menos na língua élfica.',
    beliefs:
      'Elfos costumam ser emocionais e caprichosos, mas guardam altos ideais no coração. Preferem divindades que compartilhem o amor pelo místico e artístico. Desna e Shelyn são favoritas particulares — a primeira pelo senso de maravilha, a segunda pela apreciação da arte. Calistria é a mais notória das divindades élficas, pois representa muitos ideais élficos levados ao extremo.',
    popularEdicts: [
      'Encontrar beleza na natureza e na arte',
      'Explorar o que outros manteriam oculto',
      'Demonstrar superioridade ao seu rival',
    ],
    popularAnathema: [
      'Abandonar o próprio caminho',
      'Forçar outra criatura a fazer algo',
    ],
    sampleNames: [
      'Aerel',
      'Amrunelara',
      'Caladrel',
      'Dardlara',
      'Faunra',
      'Heldalel',
      'Jathal',
      'Lanliss',
      'Oparal',
      'Seldlon',
      'Soumral',
      'Talathel',
      'Tessara',
      'Variel',
      'Yalandlara',
      'Zordlon',
    ],
  },
  heritageIds: [
    HERITAGE_ANCIENT_ELF_ID,
    HERITAGE_AQUATIC_ELF_ID,
    HERITAGE_ARCTIC_ELF_ID,
    HERITAGE_CAVERN_ELF_ID,
    HERITAGE_SEER_ELF_ID,
    HERITAGE_WHISPER_ELF_ID,
    HERITAGE_WOODLAND_ELF_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=60',
}

export const elfHeritages: Heritage[] = [
  {
    id: HERITAGE_ANCIENT_ELF_ID,
    ancestryId: ANCESTRY_ELF_ID,
    name: 'Elfo Antigo',
    originalName: 'Ancient Elf',
    description:
      'Em sua longa vida, você experimentou muitos caminhos e estilos. Um elfo antigo típico tem pelo menos 100 anos, embora possa ser mais jovem a critério do mestre. Escolha uma classe diferente da sua. Você ganha o feito de dedicação multiclasse dessa classe, mesmo sem atender ao pré-requisito de nível. Ainda precisa atender aos demais pré-requisitos para obter o feito.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 47,
    rulesSummary:
      'Ganha o feito de dedicação multiclasse de outra classe (ignora pré-requisito de nível).',
    choices: [
      {
        id: 'ancient-elf-dedication',
        label: 'Classe da dedicação multiclasse',
        options: [
          { id: 'alchemist', label: 'Alquimista', originalLabel: 'Alchemist' },
          { id: 'barbarian', label: 'Bárbaro', originalLabel: 'Barbarian' },
          { id: 'bard', label: 'Bardo', originalLabel: 'Bard' },
          { id: 'champion', label: 'Campeão', originalLabel: 'Champion' },
          { id: 'cleric', label: 'Clérigo', originalLabel: 'Cleric' },
          { id: 'druid', label: 'Druida', originalLabel: 'Druid' },
          { id: 'fighter', label: 'Guerreiro', originalLabel: 'Fighter' },
          {
            id: 'investigator',
            label: 'Investigador',
            originalLabel: 'Investigator',
          },
          { id: 'magus', label: 'Mago de Guerra', originalLabel: 'Magus' },
          { id: 'monk', label: 'Monge', originalLabel: 'Monk' },
          { id: 'oracle', label: 'Oráculo', originalLabel: 'Oracle' },
          { id: 'psychic', label: 'Psíquico', originalLabel: 'Psychic' },
          { id: 'ranger', label: 'Patrulheiro', originalLabel: 'Ranger' },
          { id: 'rogue', label: 'Ladino', originalLabel: 'Rogue' },
          { id: 'sorcerer', label: 'Feiticeiro', originalLabel: 'Sorcerer' },
          { id: 'summoner', label: 'Invocador', originalLabel: 'Summoner' },
          {
            id: 'swashbuckler',
            label: 'Espadachim',
            originalLabel: 'Swashbuckler',
          },
          {
            id: 'thaumaturge',
            label: 'Taumaturgo',
            originalLabel: 'Thaumaturge',
          },
          { id: 'witch', label: 'Bruxo', originalLabel: 'Witch' },
          { id: 'wizard', label: 'Mago', originalLabel: 'Wizard' },
          {
            id: 'kineticist',
            label: 'Kineticista',
            originalLabel: 'Kineticist',
          },
          { id: 'inventor', label: 'Inventor', originalLabel: 'Inventor' },
          {
            id: 'gunslinger',
            label: 'Pistoleiro',
            originalLabel: 'Gunslinger',
          },
          { id: 'other', label: 'Outra (anotar nas notas)' },
        ],
      },
    ],
    featGrants: [
      {
        id: 'ancient-elf-dedication-feat',
        featName: 'Dedicação multiclasse (classe escolhida)',
        originalName: 'Multiclass Dedication',
        featType: 'other',
      },
    ],
  },
  {
    id: HERITAGE_AQUATIC_ELF_ID,
    ancestryId: ANCESTRY_ELF_ID,
    name: 'Elfo Aquático',
    originalName: 'Aquatic Elf',
    description:
      'Você é um elfo aquático que passa a maior parte da vida debaixo d’água. Pode respirar ar e água, mas não consegue viver indefinidamente na superfície. Você ganha o traço anfíbio e deslocamento de natação de 9 metros. Pelo menos uma vez por semana, precisa de um período de 8 horas de descanso debaixo d’água. Se não o fizer, fica fatigado e não pode se recuperar dessa fadiga até descansar debaixo d’água.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HIGH_SEAS_ID,
    sourcePage: 19,
    rulesSummary:
      'Traço anfíbio; natação 9 m; precisa descansar 8 h/semana debaixo d’água ou fica fatigado.',
    specialAbilities: [
      {
        id: 'aquatic-elf-amphibious',
        name: 'Anfíbio',
        originalName: 'Amphibious',
        actionType: 'passive',
        description:
          'Você respira ar e água e tem deslocamento de natação de 9 metros. Pelo menos uma vez por semana, deve descansar 8 horas debaixo d’água; caso contrário, fica fatigado até fazê-lo.',
      },
    ],
    traits: ['Anfíbio'],
  },
  {
    id: HERITAGE_ARCTIC_ELF_ID,
    ancestryId: ANCESTRY_ELF_ID,
    name: 'Elfo Ártico',
    originalName: 'Arctic Elf',
    description:
      'Você habita as profundezas do norte congelado e ganhou resiliência incrível contra ambientes frios, o que concede resistência a frio igual à metade do seu nível (mínimo 1). Você trata efeitos ambientais de frio como se fossem um grau menos extremos (frio incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 47,
    rulesSummary:
      'Resistência a frio = metade do nível (mín. 1). Frio ambiental um grau menos extremo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'cold',
        label: 'Resistência a frio',
      },
    ],
  },
  {
    id: HERITAGE_CAVERN_ELF_ID,
    ancestryId: ANCESTRY_ELF_ID,
    name: 'Elfo das Cavernas',
    originalName: 'Cavern Elf',
    description:
      'Você nasceu ou passou muitos anos em túneis subterrâneos ou cavernas onde a luz é escassa. Você ganha visão no escuro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 47,
    rulesSummary: 'Ganha Visão no Escuro.',
    specialAbilities: [
      {
        id: 'cavern-elf-darkvision',
        name: 'Visão no Escuro',
        originalName: 'Darkvision',
        actionType: 'passive',
        description:
          'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
      },
    ],
  },
  {
    id: HERITAGE_SEER_ELF_ID,
    ancestryId: ANCESTRY_ELF_ID,
    name: 'Elfo Vidente',
    originalName: 'Seer Elf',
    description:
      'Você tem uma capacidade inata de detectar e compreender fenômenos mágicos. Pode conjurar o truque Detectar Magia como magia arcana inata à vontade. Um truque é elevado a um posto de magia igual à metade do seu nível (arredondado para cima). Além disso, recebe +1 de bônus de circunstância a testes para Identificar Magia e para Decifrar Escrita de natureza mágica. Essas ações de perícia tipicamente usam Arcanismo, Natureza, Ocultismo ou Religião.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 47,
    rulesSummary:
      'Detectar Magia à vontade (arcano inato); +1 Identificar Magia / Decifrar Escrita mágica.',
    specialAbilities: [
      {
        id: 'seer-elf-detect-magic',
        name: 'Detectar Magia',
        originalName: 'Detect Magic',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você pode conjurar o truque Detectar Magia como magia arcana inata à vontade. O truque é elevado a um posto igual à metade do seu nível (arredondado para cima).',
      },
    ],
  },
  {
    id: HERITAGE_WHISPER_ELF_ID,
    ancestryId: ANCESTRY_ELF_ID,
    name: 'Elfo Sussurro',
    originalName: 'Whisper Elf',
    description:
      'Suas orelhas são finamente afinadas, capazes de detectar até o mais leve sussurro. Você recebe +2 de bônus de circunstância ao usar a ação Procurar para encontrar criaturas escondidas ou não detectadas a até 9 metros. Ao mirar um oponente ocultado ou escondido de você, reduza a CD do teste simples para 3 (ocultado) ou 9 (escondido). Este benefício não se aplica se você não puder ouvir ou se a criatura for incapaz de fazer som (por exemplo, sob o efeito de uma magia de silêncio).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 47,
    rulesSummary:
      '+2 Procurar vs escondidos/não detectados (9 m); CD do teste simples 3/9 vs ocultado/escondido.',
  },
  {
    id: HERITAGE_WOODLAND_ELF_ID,
    ancestryId: ANCESTRY_ELF_ID,
    name: 'Elfo Silvestre',
    originalName: 'Woodland Elf',
    description:
      'Você está adaptado à vida na floresta, na selva profunda ou em ambiente semelhante, e sabe escalar árvores e usar a folhagem a seu favor. Ao Escalar árvores, vinhas e outra folhagem, move-se com metade do Deslocamento em um sucesso e com Deslocamento completo em um sucesso crítico (e com Deslocamento completo em um sucesso se tiver Escalada Rápida). Isso não o afeta se estiver usando deslocamento de escalada. Você sempre pode usar a ação Cobrir-se quando estiver em terreno de floresta para obter cobertura, mesmo sem estar ao lado de um obstáculo atrás do qual se cobrir.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 47,
    rulesSummary:
      'Escalar folhagem mais rápido; Cobrir-se sempre disponível em terreno de floresta.',
  },
]
