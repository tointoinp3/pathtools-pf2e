import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_PLAYER_CORE_ID } from './sources'

export const ANCESTRY_ORC_ID = 'ancestry-orc'

export const HERITAGE_BADLANDS_ORC_ID = 'heritage-badlands-orc'
export const HERITAGE_BATTLE_READY_ORC_ID = 'heritage-battle-ready-orc'
export const HERITAGE_DEEP_ORC_ID = 'heritage-deep-orc'
export const HERITAGE_GRAVE_ORC_ID = 'heritage-grave-orc'
export const HERITAGE_HOLD_SCARRED_ORC_ID = 'heritage-hold-scarred-orc'
export const HERITAGE_RAINFALL_ORC_ID = 'heritage-rainfall-orc'
export const HERITAGE_WINTER_ORC_ID = 'heritage-winter-orc'

/** Orc — Player Core (Remaster), Archives of Nethys ID 66 */
export const orcAncestry: Ancestry = {
  id: ANCESTRY_ORC_ID,
  name: 'Orc',
  originalName: 'Orc',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 70,
  hitPoints: 10,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'orc-boost-free-1',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
    {
      id: 'orc-boost-free-2',
      label: 'Segundo boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: [],
  languages: {
    automatic: ['Comum', 'Orc'],
    additionalOptions: ['Goblin', 'Jotun', 'Petran', 'Sakvroth'],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'orc-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [],
  traits: ['Orc', 'Humanoide'],
  lore: {
    summary:
      'Orcs são um povo orgulhoso e forte, de físico endurecido, que valoriza poder físico e glória em combate.',
    youMight: [
      'Aceitar de bom grado qualquer chance de provar sua força em um desafio físico.',
      'Preferir morrer em combate glorioso a uma morte mundana de velhice ou doença.',
    ],
    othersProbably: [
      'Veem você como violento ou indisciplinado.',
      'Admiram sua franqueza e honestidade direta.',
    ],
    physicalDescription:
      'Orcs são altos e poderosamente construídos, com braços longos e pernas robustas. Muitos passam de 2,10 m, embora tendam a posturas largas, quase arqueadas, e ombros inclinados à frente. Têm pele áspera, ossos densos e músculos duros como pedra — feitos para a guerra e tarefas físicas pesadas. A pele costuma ser algum tom de verde, embora alguns tenham outras cores que refletem adaptações ao ambiente. Consideram atraentes (independente de gênero) corpos poderosos, pele muito cicatrizada, grandes presas e tatuagens. Alcançam a maturidade física por volta dos 17 anos, e muitos vivem até cerca de 60.',
    society:
      'A maioria das comunidades orcs — chamadas holds — define-se por duas coisas: dor e glória. Cada uma rende respeito em medida quase igual, desde que a dor seja suportada com estoicismo. Um orc cheio de cicatrizes que caminha sem reclamar com a perna quebrada atrai tanta admiração quanto quem conquista uma grande vitória no campo de batalha. O poder também define as dinâmicas entre famílias e holds: orcs mais fracos trabalham sob a direção dos fortes, e o poder muda constantemente entre quem prova sua força. Costumam dividir deveres familiares, criando filhos em comunidade e compartilhando responsabilidades por toda a hold.',
    beliefs:
      'Um ditado orc comum é “você é as cicatrizes que o moldam”. Vidas violentas e caóticas em terras violentas e caóticas fazem a maioria dos orcs esperar e aceitar a violência. Lamashtu e Rovagug são cultuados com frequência em comunidades mais belicosas; holds menos violentas adoram deuses como Sarenrae, cujos preceitos de fogo, redenção e glória também apelam à sensibilidade orc. Embora existam deidades orcs, o culto a elas é surpreendentemente raro: orcs acreditam que, se uma criatura tem rosto e nome, pode ser morta — e suas próprias deidades muitas vezes são alvos, não objetos de reverência. Algumas holds ensinam que os maiores membros podem ganhar a chance de desafiar as deidades orcs por um lugar no panteão.',
    popularEdicts: [
      'Tornar-se ainda mais forte',
      'Compartilhar conhecimento conquistado pela dor',
      'Destruir os mortos-vivos',
    ],
    popularAnathema: [
      'Aceitar a derrota sem prova de força',
      'Remoldar ou reanimar uma criatura em algo inferior',
    ],
    sampleNames: [
      'Arkus',
      'Durra',
      'Grask',
      'Grillgiss',
      'Krugga',
      'Mahja',
      'Murdut',
      'Ollak',
      'Onyat',
      'Thurk',
      'Uirch',
      'Unach',
    ],
  },
  heritageIds: [
    HERITAGE_BADLANDS_ORC_ID,
    HERITAGE_BATTLE_READY_ORC_ID,
    HERITAGE_DEEP_ORC_ID,
    HERITAGE_GRAVE_ORC_ID,
    HERITAGE_HOLD_SCARRED_ORC_ID,
    HERITAGE_RAINFALL_ORC_ID,
    HERITAGE_WINTER_ORC_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=66',
}

export const orcHeritages: Heritage[] = [
  {
    id: HERITAGE_BADLANDS_ORC_ID,
    ancestryId: ANCESTRY_ORC_ID,
    name: 'Orc das Terras Áridas',
    originalName: 'Badlands Orc',
    description:
      'Você vem de terras áridas escaldantes, onde pernas longas e resistência aos elementos ajudaram você a prosperar. Pode Pressionar o Ritmo pelo dobro do tempo enquanto explora antes de precisar parar, e trata efeitos ambientais de calor como se fossem um grau menos extremos (calor incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 71,
    rulesSummary:
      'Pressionar o Ritmo pelo dobro do tempo; calor ambiental um grau menos extremo.',
  },
  {
    id: HERITAGE_BATTLE_READY_ORC_ID,
    ancestryId: ANCESTRY_ORC_ID,
    name: 'Orc Pronto para a Batalha',
    originalName: 'Battle-Ready Orc',
    description:
      'Você descende de uma linhagem de aterradores comandantes de campo. Fica treinado em Intimidação e recebe o feito de perícia Olhar Intimidante.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 71,
    rulesSummary: 'Treinado em Intimidação; feito Olhar Intimidante.',
    skillGrants: [{ id: 'battle-ready-intimidation', skillId: 'intimidation', rank: 'trained' }],
    featGrants: [
      {
        id: 'battle-ready-intimidating-glare',
        featId: 'feat-intimidating-glare',
        featName: 'Olhar Intimidante',
        originalName: 'Intimidating Glare',
        featType: 'skill',
      },
    ],
  },
  {
    id: HERITAGE_DEEP_ORC_ID,
    ancestryId: ANCESTRY_ORC_ID,
    name: 'Orc Profundo',
    originalName: 'Deep Orc',
    description:
      'Suas mãos calejadas e olhos vermelhos falam de uma vida nas trevas profundas de cavernas montanhosas, onde aprendeu a lutar em penhascos rochosos e sobreviver com o mínimo. Recebe o feito de perícia Expertise em Terreno (subterrâneo) e o feito Escalador de Combate.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 71,
    rulesSummary:
      'Expertise em Terreno (subterrâneo); Escalador de Combate.',
    featGrants: [
      {
        id: 'deep-terrain-expertise',
        featId: 'feat-terrain-expertise',
        featName: 'Expertise em Terreno (subterrâneo)',
        originalName: 'Terrain Expertise (underground)',
        featType: 'skill',
      },
      {
        id: 'deep-combat-climber',
        featId: 'feat-combat-climber',
        featName: 'Escalador de Combate',
        originalName: 'Combat Climber',
        featType: 'skill',
      },
    ],
  },
  {
    id: HERITAGE_GRAVE_ORC_ID,
    ancestryId: ANCESTRY_ORC_ID,
    name: 'Orc da Tumba',
    originalName: 'Grave Orc',
    description:
      'Você foi exposto a energias necromânticas poderosas que deveriam tê-lo matado — mas sobreviveu. Sua pele é fria, úmida e acinzentada. Recebe resistência a dano de vazio igual à metade do seu nível (mínimo 1). Também recebe +1 de bônus de circunstância a salvaguardas contra efeitos com o traço morte ou vazio.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 71,
    rulesSummary:
      'Resistência a vazio = metade do nível (mín. 1); +1 vs morte/vazio.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'void',
        label: 'Resistência a vazio',
      },
    ],
  },
  {
    id: HERITAGE_HOLD_SCARRED_ORC_ID,
    ancestryId: ANCESTRY_ORC_ID,
    name: 'Orc Marcado da Hold',
    originalName: 'Hold-Scarred Orc',
    description:
      'Você faz parte de uma comunidade orc (hold) que pratica escarificação ritual ou tatuagem. As marcas na pele mostram sua vitalidade excepcional. Você recebe 12 PV da ancestralidade em vez de 10. Também recebe o feito Difícil de Matar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 71,
    rulesSummary: '12 PV de ancestralidade (em vez de 10); feito Difícil de Matar.',
    hitPointsOverride: 12,
    specialAbilities: [
      {
        id: 'hold-scarred-hp',
        name: 'Vitalidade Marcada',
        originalName: 'Hold-Scarred Hit Points',
        actionType: 'passive',
        description: 'Você recebe 12 PV da ancestralidade em vez de 10.',
      },
    ],
    featGrants: [
      {
        id: 'hold-scarred-diehard',
        featName: 'Difícil de Matar',
        originalName: 'Diehard',
        featType: 'general',
        featId: 'feat-diehard',
      },
    ],
  },
  {
    id: HERITAGE_RAINFALL_ORC_ID,
    ancestryId: ANCESTRY_ORC_ID,
    name: 'Orc da Chuva',
    originalName: 'Rainfall Orc',
    description:
      'Você nasceu em uma floresta tropical onde só emaranhados de árvores protegem das tempestades torrenciais e enchentes. Aprendeu a mover-se com destreza na selva e a resistir a males comuns em ambientes úmidos. Recebe +2 de bônus de circunstância a testes de Atletismo para Escalar ou Nadar e +1 de bônus de circunstância a salvaguardas contra doenças.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 71,
    rulesSummary: '+2 Atletismo para Escalar/Nadar; +1 vs doenças.',
  },
  {
    id: HERITAGE_WINTER_ORC_ID,
    ancestryId: ANCESTRY_ORC_ID,
    name: 'Orc do Inverno',
    originalName: 'Winter Orc',
    description:
      'Seus ancestrais sobreviveram em climas frios. Fica treinado em Sobrevivência e trata efeitos ambientais de frio como se fossem um grau menos extremos (frio incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 71,
    rulesSummary:
      'Treinado em Sobrevivência; frio ambiental um grau menos extremo.',
    skillGrants: [{ id: 'winter-survival', skillId: 'survival', rank: 'trained' }],
  },
]
