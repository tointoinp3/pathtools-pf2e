import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'

export const ANCESTRY_RATFOLK_ID = 'ancestry-ratfolk'

export const HERITAGE_DEEP_RAT_ID = 'heritage-deep-rat'
export const HERITAGE_DESERT_RAT_ID = 'heritage-desert-rat'
export const HERITAGE_LONGSNOUT_RAT_ID = 'heritage-longsnout-rat'
export const HERITAGE_SEWER_RAT_ID = 'heritage-sewer-rat'
export const HERITAGE_SHADOW_RAT_ID = 'heritage-shadow-rat'
export const HERITAGE_SNOW_RAT_ID = 'heritage-snow-rat'
export const HERITAGE_TUNNEL_RAT_ID = 'heritage-tunnel-rat'

/** Ratfolk — Player Core 2 (Remaster), Archives of Nethys ID 82 */
export const ratfolkAncestry: Ancestry = {
  id: ANCESTRY_RATFOLK_ID,
  name: 'Ysoki',
  originalName: 'Ratfolk',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 28,
  hitPoints: 6,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'ratfolk-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'ratfolk-boost-int',
      label: 'Boost de Inteligência',
      option: { kind: 'specific', attributes: ['intelligence'] },
    },
    {
      id: 'ratfolk-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['strength'],
  languages: {
    automatic: ['Comum', 'Ysoki'],
    additionalOptions: [
      'Aklo',
      'Dracônico',
      'Anão',
      'Gnomo',
      'Goblin',
      'Halfling',
      'Kholo',
      'Orc',
      'Sakvroth',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'ratfolk-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'ratfolk-sharp-teeth',
      name: 'Dentes Afiados',
      originalName: 'Sharp Teeth',
      actionType: 'passive',
      description:
        'Seus incisivos proeminentes oferecem uma alternativa aos punhos que outros humanoides levam para a briga. Você tem um ataque desarmado de mandíbulas que causa 1d4 de dano perfurante. Suas mandíbulas estão no grupo briga e têm os traços ágil, finura e desarmado.',
    },
  ],
  traits: ['Ysoki', 'Humanoide'],
  lore: {
    summary:
      'Ratfolk são humanoides pequenos, astutos e adaptáveis, com traços de rato e amor por comunidade. Os ysoki preferem condições apertadas — até cem indivíduos podem viver numa mesma casa — e acumulam mercadorias trazidas de expedições comerciais.',
    youMight: [
      'Ter orgulho da sua grande família estendida e manter contato com todos os parentes.',
      'Gostar de viajar por perto e por longe em busca de novas experiências, provavelmente colecionando bugigangas pelo caminho.',
    ],
    othersProbably: [
      'Se surpreendem com sua higiene cuidadosa e outros hábitos meticulosos.',
      'Acham que você invade o espaço pessoal deles ou os “aperta” demais.',
    ],
    physicalDescription:
      'Ratfolk têm focinho com bigodes, orelhas grandes e cauda sem pelos; em geral têm olhos vermelhos e pelo curto marrom ou preto. Um ratfolk comum tem cerca de 1,20 m e pesa cerca de 36 kg, mas há muita variação — até dentro de uma mesma família. O instinto os leva a manter limpeza, reforçado por estruturas sociais fortes. Como sua aparência costuma incomodar outros humanoides — que até os confundem com licantropos —, ratfolk frequentemente escondem traços físicos com várias camadas de roupa ao circular em espaços dominados por outras ancestralidades.',
    society:
      'A cultura ysoki valoriza cooperação e comunidade. Todo ratfolk aprende — por jogos comunitários, encontros sociais e esportes — a fazer amizades rápidas com ysoki de fora da família. Com longa tradição de comerciantes e inventores, viajam frequentemente de uma cidade a outra, muitas vezes em caravanas de até meia dúzia de carroças puxadas por ratos gigantes excepcionalmente grandes; muitos ysoki conseguem falar com esses animais.',
    beliefs:
      'Ratfolk se importam mais com a família do que com conceitos abstratos de bem e mal. Suas tocas podem ser covis caóticos cheios de tralhas acumuladas, mas também obedecem códigos sociais rígidos. Reverenciam ancestrais e tendem a reconhecer a divindade prevalente na região; Lao Shu Po, a Vovó Rato, tem papel especial — encarna interesses que ysoki prefeririam não cultivar pessoalmente, mas que precisam que alguém cuide.',
    popularEdicts: [
      'Colocar os interesses da comunidade acima dos seus',
      'Manter aparência limpa',
      'Ser honesto nos negócios',
    ],
    popularAnathema: ['Descartar algo que possa ser útil'],
    sampleNames: [
      'Barnan',
      'Chikis',
      'Jix',
      'Kipmek',
      'Neeka',
      'Pippik',
      'Quarik',
      'Rattim',
      'Skitto',
      'Tamoq',
    ],
  },
  heritageIds: [
    HERITAGE_DEEP_RAT_ID,
    HERITAGE_DESERT_RAT_ID,
    HERITAGE_LONGSNOUT_RAT_ID,
    HERITAGE_SEWER_RAT_ID,
    HERITAGE_SHADOW_RAT_ID,
    HERITAGE_SNOW_RAT_ID,
    HERITAGE_TUNNEL_RAT_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=82',
}

export const ratfolkHeritages: Heritage[] = [
  {
    id: HERITAGE_DEEP_RAT_ID,
    ancestryId: ANCESTRY_RATFOLK_ID,
    name: 'Rato Profundo',
    originalName: 'Deep Rat',
    description:
      'Seus ancestrais viveram mais fundo no subsolo que outros ratfolk, concedendo-lhe a capacidade de enxergar no escuro. Você ganha visão no escuro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 29,
    rulesSummary: 'Ganha visão no escuro.',
    specialAbilities: [
      {
        id: 'deep-rat-darkvision',
        name: 'Visão no Escuro',
        originalName: 'Darkvision',
        actionType: 'passive',
        description:
          'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
      },
    ],
  },
  {
    id: HERITAGE_DESERT_RAT_ID,
    ancestryId: ANCESTRY_RATFOLK_ID,
    name: 'Rato do Deserto',
    originalName: 'Desert Rat',
    description:
      'Você é nativo de planícies áridas e provavelmente cresceu viajando pelas estradas. Se tiver as duas mãos livres, pode aumentar seu deslocamento para 30 pés correndo em quatro patas. Além disso, efeitos ambientais de calor são um grau menos extremos para você, e você aguenta dez vezes mais tempo que o normal antes de ser afetado por fome ou sede. Porém, a menos que use proteção ou abrigo, efeitos ambientais de frio são um grau mais extremos para você.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 29,
    rulesSummary:
      'Com ambas as mãos livres, deslocamento 30 pés em quatro patas; calor um grau menos extremo; fome/sede 10× mais demoradas; frio um grau mais extremo sem abrigo.',
  },
  {
    id: HERITAGE_LONGSNOUT_RAT_ID,
    ancestryId: ANCESTRY_RATFOLK_ID,
    name: 'Rato de Focinho Longo',
    originalName: 'Longsnout Rat',
    description:
      'Seu focinho longo concede olfato mais aguçado que o da maioria dos ratfolk. Você ganha faro impreciso com alcance de 30 pés — pode usar o olfato para determinar a localização de uma criatura. O mestre normalmente dobra o alcance se você estiver a favor do vento da criatura, ou reduz pela metade se estiver contra o vento. Além disso, recebe +2 de bônus de circunstância a testes de Percepção para Buscar uma criatura ou objeto dentro do alcance do faro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 29,
    rulesSummary:
      'Faro impreciso 30 pés; +2 Percepção para Buscar no alcance do faro.',
    specialAbilities: [
      {
        id: 'longsnout-scent',
        name: 'Faro',
        originalName: 'Scent',
        actionType: 'passive',
        description:
          'Faro impreciso com alcance de 30 pés; +2 a Buscar criaturas/objetos nesse alcance.',
      },
    ],
  },
  {
    id: HERITAGE_SEWER_RAT_ID,
    ancestryId: ANCESTRY_RATFOLK_ID,
    name: 'Rato do Esgoto',
    originalName: 'Sewer Rat',
    description:
      'Você vem de uma longa linhagem de ratfolk cuja comunidade vive nos esgotos sob um grande assentamento. Você é imune à doença peste pútrida. Recebe +1 de bônus de circunstância a salvaguardas contra doenças e venenos. Se obtiver sucesso em uma salvaguarda contra doença ou veneno, o resultado vira sucesso crítico. Se você tiver outra habilidade que melhore a salvaguarda dessa forma (como a característica de classe Endurecido pela Batalha do guerreiro), ao rolar falha crítica na salvaguarda você obtém falha em vez de falha crítica.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 29,
    rulesSummary:
      'Imune a peste pútrida; +1 vs doença/veneno; sucesso → crítico (empilha com habilidades similares).',
  },
  {
    id: HERITAGE_SHADOW_RAT_ID,
    ancestryId: ANCESTRY_RATFOLK_ID,
    name: 'Rato das Sombras',
    originalName: 'Shadow Rat',
    description:
      'Seus ancestrais viveram em espaços escuros no subsolo, concedendo-lhe peloagem escura e um ar vagamente sobrenatural. Você fica treinado em Intimidação e pode usar Intimidação para Coagir animais. Ao Desmoralizar um animal, não sofre penalidade por não compartilhar idioma com ele. Se ficaria automaticamente treinado em Intimidação (por antecedente ou classe, por exemplo), fica treinado em outra perícia à sua escolha. A atitude dos animais em relação a você começa um grau pior que o normal — em geral antipático em vez de indiferente para animais domesticados, e hostil em vez de antipático para animais selvagens.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 29,
    rulesSummary:
      'Treinado em Intimidação; Coagir/Desmoralizar animais; animais começam uma atitude pior.',
    skillGrants: [{ id: 'shadow-rat-intimidation', skillId: 'intimidation', rank: 'trained', replaceIfTrained: true }],
  },
  {
    id: HERITAGE_SNOW_RAT_ID,
    ancestryId: ANCESTRY_RATFOLK_ID,
    name: 'Rato da Neve',
    originalName: 'Snow Rat',
    description:
      'Você tem um pelo mais espesso e um corpo mais robusto para se defender do frio, concedendo resistência a frio igual à metade do seu nível (mínimo 1). Trata efeitos ambientais de frio como se fossem um grau menos extremos (frio incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 29,
    rulesSummary:
      'Resistência a frio = metade do nível (mín. 1); frio ambiental um grau menos extremo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'cold',
        label: 'Resistência a frio',
      },
    ],
  },
  {
    id: HERITAGE_TUNNEL_RAT_ID,
    ancestryId: ANCESTRY_RATFOLK_ID,
    name: 'Rato de Túnel',
    originalName: 'Tunnel Rat',
    description:
      'Você comprime o corpo com facilidade e passa por vãos estreitos. Recebe o feito Espremer-se Rápido como feito bônus, mesmo sem treinamento em Acrobacia. Espaços apertados que não sejam estreitos o bastante para exigir a ação Espremer-se não são terreno difícil para você.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 29,
    rulesSummary:
      'Feito Espremer-se Rápido; espaços apertados (sem Squeeze) não são terreno difícil.',
    featGrants: [
      {
        id: 'tunnel-quick-squeeze',
        featId: 'feat-quick-squeeze',
        featName: 'Espremer-se Rápido',
        originalName: 'Quick Squeeze',
        featType: 'skill',
      },
    ],
  },
]
