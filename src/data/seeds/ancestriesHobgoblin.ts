import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'

export const ANCESTRY_HOBGOBLIN_ID = 'ancestry-hobgoblin'

export const HERITAGE_ELFBANE_HOBGOBLIN_ID = 'heritage-elfbane-hobgoblin'
export const HERITAGE_RUNTBOSS_HOBGOBLIN_ID = 'heritage-runtboss-hobgoblin'
export const HERITAGE_SHORTSHANKS_HOBGOBLIN_ID = 'heritage-shortshanks-hobgoblin'
export const HERITAGE_SMOKEWORKER_HOBGOBLIN_ID = 'heritage-smokeworker-hobgoblin'
export const HERITAGE_WARMARCH_HOBGOBLIN_ID = 'heritage-warmarch-hobgoblin'
export const HERITAGE_WARRENBRED_HOBGOBLIN_ID = 'heritage-warrenbred-hobgoblin'

/** Hobgoblin — Player Core 2 (Remaster), Archives of Nethys ID 78 */
export const hobgoblinAncestry: Ancestry = {
  id: ANCESTRY_HOBGOBLIN_ID,
  name: 'Hobgoblin',
  originalName: 'Hobgoblin',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 12,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'hobgoblin-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'hobgoblin-boost-int',
      label: 'Boost de Inteligência',
      option: { kind: 'specific', attributes: ['intelligence'] },
    },
    {
      id: 'hobgoblin-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['wisdom'],
  languages: {
    automatic: ['Comum', 'Goblin'],
    additionalOptions: [
      'Dracônico',
      'Anão',
      'Jotun',
      'Halfling',
      'Kholo',
      'Orc',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'hobgoblin-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [],
  traits: ['Hobgoblin', 'Humanoide'],
  lore: {
    summary:
      'Hobgoblins são goblinoides mais altos e fortes que seus parentes goblins, organizados em estruturas militares rígidas e movidos por disciplina, dever e eficiência. Valorizam ordem, resistência e provas de mérito em combate; muitas comunidades espelham hierarquias de exército, mesmo em ofícios civis. O ciclo avassalador de conflitos com hobgoblins tem sido abalado recentemente por nações como Oprak, que buscam cooperação internacional — mas sua reputação de soldados formidáveis e aparência intimidadora ainda molda como outros povos os veem.',
    youMight: [
      'Buscar as soluções mais eficazes e práticas para qualquer problema.',
      'Incentivar uma cadeia de comando clara entre quem viaja com você, obedecendo ordens mesmo quando discorda delas.',
    ],
    othersProbably: [
      'Consideram você perigoso por causa da reputação e da aparência intimidadora.',
      'Reconhecem sua resistência, dedicação e disciplina incomuns.',
    ],
    physicalDescription:
      'Hobgoblins têm cabeças largas e carecas, olhos pequenos e pele acinzentada que fica azul-acinzentada quando bronzeada. São notavelmente resistentes: se recuperam rápido de doenças e conseguem se esforçar por longos períodos com pouca dificuldade. Amadurecem cedo — a maioria anda, fala e empunha uma arma por volta de 1 ano, chega à adolescência entre 8 e 12 anos e à idade adulta por volta dos 14. Costumam viver até cerca de 70 anos.',
    society:
      'Hobgoblins estruturam a sociedade como hierarquias militares. Até grupos civis — como coletivos agrícolas ou casas comerciais — se organizam em regimentos, companhias e divisões. Veteranos ocupam posição elevada, muitas vezes como líderes ou conselheiros. A magia é raramente praticada e muitas vezes desprezada, pois a maioria confia mais na força das próprias armas do que em feitiços. Suas artes tendem a inclinação marcial: marchas inspiradoras e forja de armas são, para muitos, as únicas artes que valem a pena.',
    beliefs:
      'A maioria dos hobgoblins prefere viver dentro de hierarquias estabelecidas. Embora muitos considerem sentimentalismo fraqueza, os de temperamento mais moderado têm encontrado sucesso recente na diplomacia. A fé tem pouco lugar na sociedade hobgoblin — muitos a veem como impraticável —, embora hobgoblins religiosos possam ganhar aceitação relutante por magias curativas úteis. Editos populares incluem desprezar magia arcana, esconder sentimentalismo e emoções positivas, e aproveitar chances de provar valor. Anatemas comuns incluem desobedecer ordens militares.',
    popularEdicts: [
      'Desprezar magia arcana em favor da força e da tática',
      'Esconder sentimentalismo e emoções positivas',
      'Aproveitar qualquer chance de provar seu valor',
    ],
    popularAnathema: ['Desobedecer ordens militares'],
    sampleNames: [
      'Azaer',
      'Dakor',
      'Mazkorien',
      'Druknar',
      'Ghargam',
      'Hathkren',
      'Imakra',
      'Kralaeng',
      'Olzu',
      'Rezal',
      'Sivkrag',
      'Volmak',
      'Zornum',
    ],
  },
  heritageIds: [
    HERITAGE_ELFBANE_HOBGOBLIN_ID,
    HERITAGE_RUNTBOSS_HOBGOBLIN_ID,
    HERITAGE_SHORTSHANKS_HOBGOBLIN_ID,
    HERITAGE_SMOKEWORKER_HOBGOBLIN_ID,
    HERITAGE_WARMARCH_HOBGOBLIN_ID,
    HERITAGE_WARRENBRED_HOBGOBLIN_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=78',
}

export const hobgoblinHeritages: Heritage[] = [
  {
    id: HERITAGE_ELFBANE_HOBGOBLIN_ID,
    ancestryId: ANCESTRY_HOBGOBLIN_ID,
    name: 'Hobgoblin Antielfo',
    originalName: 'Elfbane Hobgoblin',
    description:
      'Hobgoblins foram criados há muito tempo a partir dos goblins instáveis para servir como exército contra os elfos. Embora os elfos tenham libertado os hobgoblins dessa servidão, alguns ainda retêm resistência ancestral à magia — que chamam de “magia élfica”. Você ganha a reação Resistir Magia Élfica.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 13,
    rulesSummary:
      'Reação: +1 salvaguarda vs efeito mágico (+2 se arcana).',
    specialAbilities: [
      {
        id: 'elfbane-resist-elf-magic',
        name: 'Resistir Magia Élfica',
        originalName: 'Resist Elf Magic',
        actionType: 'reaction',
        trigger:
          'Você tenta uma salvaguarda contra um efeito mágico, mas ainda não rolou.',
        description:
          'Sua resistência ancestral à magia o protege. Você recebe +1 de bônus de circunstância à salvaguarda que disparou a reação. Se o efeito for arcana, recebe +2 de bônus de circunstância em vez de +1.',
      },
    ],
  },
  {
    id: HERITAGE_RUNTBOSS_HOBGOBLIN_ID,
    ancestryId: ANCESTRY_HOBGOBLIN_ID,
    name: 'Hobgoblin Chefe dos Pequenos',
    originalName: 'Runtboss Hobgoblin',
    description:
      'Você vem de uma longa linhagem de hobgoblins que comandavam goblins. É menor que outros hobgoblins, mas goblins ainda obedecem aos comandos que você vocifera. Você recebe o feito de perícia Coerção em Grupo. Se obtiver sucesso em um teste de Intimidação para Coagir um goblin, o resultado vira sucesso crítico; se obtiver falha crítica, o resultado vira falha.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 13,
    rulesSummary:
      'Feito Coerção em Grupo; sucesso→crítico e crítico→falha ao Coagir goblins.',
    featGrants: [
      {
        id: 'runtboss-group-coercion',
        featId: 'feat-group-coercion',
        featName: 'Coerção em Grupo',
        originalName: 'Group Coercion',
        featType: 'skill',
      },
    ],
  },
  {
    id: HERITAGE_SHORTSHANKS_HOBGOBLIN_ID,
    ancestryId: ANCESTRY_HOBGOBLIN_ID,
    name: 'Hobgoblin Pernas Curtas',
    originalName: 'Shortshanks Hobgoblin',
    description:
      'Você tem tronco mais longo e ombros mais largos que a maioria dos hobgoblins, o que faz suas pernas parecerem curtas — mas lhe dá um core forte e centro de gravidade baixo, útil para montaria e escalada. Treinou montaria desde tenra idade. Você recebe o feito Montar. Além disso, não fica desprevenido enquanto Escalar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 13,
    rulesSummary: 'Feito Montar; não fica desprevenido ao Escalar.',
    featGrants: [
      {
        id: 'shortshanks-ride',
        featId: 'feat-ride',
        featName: 'Montar',
        originalName: 'Ride',
        featType: 'general',
      },
    ],
  },
  {
    id: HERITAGE_SMOKEWORKER_HOBGOBLIN_ID,
    ancestryId: ANCESTRY_HOBGOBLIN_ID,
    name: 'Hobgoblin Operário de Fumaça',
    originalName: 'Smokeworker Hobgoblin',
    description:
      'Sua família há gerações trabalha como alquimistas, engenheiros e cientistas em projetos que levam fumaça e fogo ao campo de batalha. Você recebe resistência a fogo igual à metade do seu nível (mínimo 1). Obtém sucesso automático no teste simples CD 5 para mirar em uma criatura oculta se ela estiver oculta apenas por fumaça.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 13,
    rulesSummary:
      'Resistência a fogo = metade do nível (mín. 1); sucesso automático CD 5 vs oculto por fumaça.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'fire',
        label: 'Resistência a fogo',
      },
    ],
  },
  {
    id: HERITAGE_WARMARCH_HOBGOBLIN_ID,
    ancestryId: ANCESTRY_HOBGOBLIN_ID,
    name: 'Hobgoblin Marcha de Guerra',
    originalName: 'Warmarch Hobgoblin',
    description:
      'Você vem de uma linhagem de mercenários errantes sempre em marcha, sobrevivendo com o que encontram na estrada. Se falhar (mas não falhar criticamente) ao Subsistir na natureza, ainda consegue se alimentar com refeições ruins. Ao explorar, pode Pressionar o Ritmo pelo dobro do tempo antes de precisar parar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 13,
    rulesSummary:
      'Falha (não crítica) em Subsistir na natureza ainda dá refeições ruins; Pressionar o Ritmo 2× mais tempo ao explorar.',
  },
  {
    id: HERITAGE_WARRENBRED_HOBGOBLIN_ID,
    ancestryId: ANCESTRY_HOBGOBLIN_ID,
    name: 'Hobgoblin das Tocas',
    originalName: 'Warrenbred Hobgoblin',
    description:
      'Seus ancestrais viveram no subsolo. Suas orelhas são maiores que as de outros hobgoblins e sensíveis a ecos. Enquanto estiver no subsolo, ao mirar em um oponente oculto ou escondido, reduza a CD do teste simples para 3 se estiver oculto ou 9 se estiver escondido. Além disso, se obtiver sucesso em um teste de Acrobacia para Apertar-se, o resultado vira sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 13,
    rulesSummary:
      'Subsolo: teste simples CD 3 (oculto) / 9 (escondido); sucesso→crítico em Apertar-se.',
  },
]
