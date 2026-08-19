import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'

export const ANCESTRY_CATFOLK_ID = 'ancestry-catfolk'

export const HERITAGE_CLAWED_CATFOLK_ID = 'heritage-clawed-catfolk'
export const HERITAGE_HUNTING_CATFOLK_ID = 'heritage-hunting-catfolk'
export const HERITAGE_JUNGLE_CATFOLK_ID = 'heritage-jungle-catfolk'
export const HERITAGE_LIMINAL_CATFOLK_ID = 'heritage-liminal-catfolk'
export const HERITAGE_NINE_LIVES_CATFOLK_ID = 'heritage-nine-lives-catfolk'
export const HERITAGE_SHARP_EARED_CATFOLK_ID = 'heritage-sharp-eared-catfolk'
export const HERITAGE_WINTER_CATFOLK_ID = 'heritage-winter-catfolk'

/** Catfolk — Player Core 2 (Remaster), Archives of Nethys ID 77 */
export const catfolkAncestry: Ancestry = {
  id: ANCESTRY_CATFOLK_ID,
  name: 'Povo-Felino',
  originalName: 'Catfolk',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 8,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'catfolk-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'catfolk-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'catfolk-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['wisdom'],
  languages: {
    automatic: ['Amurrun', 'Comum'],
    additionalOptions: [
      'Dracônico',
      'Elfo',
      'Gnomo',
      'Goblin',
      'Halfling',
      'Iruxi',
      'Jotun',
      'Feérico',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'catfolk-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'catfolk-land-on-feet',
      name: 'Cair em Pé',
      originalName: 'Land on Your Feet',
      actionType: 'passive',
      description:
        'Quando você cai, sofre apenas metade do dano normal e não fica caído.',
    },
  ],
  traits: ['Povo-Felino', 'Humanoide'],
  lore: {
    summary:
      'Catfolk são humanoides felinos altamente sociais, propensos à curiosidade e ao nomadismo. Gostam de aprender coisas novas, colecionar histórias e bugigangas e garantir que seus entes queridos estejam seguros e felizes.',
    youMight: [
      'Ser um viajante curioso que demonstra interesse genuíno fazendo muitas perguntas entusiasmadas.',
      'Atuar como conector social, unindo pessoas e comunidades com charme e empatia.',
    ],
    othersProbably: [
      'Acham que você é volúvel ou muda de humor de um instante para outro.',
      'Consideram você encantador, mas às vezes dominador em conversas com perguntas ou opiniões sem fim.',
    ],
    physicalDescription:
      'Embora todos os catfolk andem eretos e tenham pelagem macia, cauda, orelhas grandes e pupilas verticais, mostram tanta variedade quanto felinos comuns. Têm dedos ágeis com garras curtas, em geral retráteis. Amadurecem rápido e andam com poucos meses de idade, mas começam carreiras por volta da mesma idade que humanos e vivem cerca de 60 ou 70 anos.',
    society:
      'Catfolk se chamam amurruns, embora muitos considerem esse nome privado. Criam os filhos em grandes famílias estendidas, com liberdade para explorar e se meter em confusão desde cedo. Aprendem ofícios em aprendizado informal e a maioria domina vários ao longo da vida. Sociedades catfolk costumam ser lideradas por um representante que fala pela comunidade e media disputas; preferem resolver desavenças demonstrando desinteresse elaborado ou até deixando a comunidade por um tempo.',
    beliefs:
      'Muitos catfolk acreditam ter sido elevados de grandes felinos primordiais para confrontar abominações que profanam lugares naturais. Os mais religiosos praticam formas nebulosas de animismo ou veneram deuses como Desna e Nethys, além de espíritos da natureza. A sede de viajar e a proteção de lugares selvagens moldam crenças e valores comunitários.',
    popularEdicts: [
      'Seguir a curiosidade e aprender com o mundo',
      'Fortalecer laços de comunidade e cuidar dos seus',
      'Viajar e proteger lugares naturais',
    ],
    popularAnathema: [
      'Praticar crueldade contra gatos ou felinos',
      'Reprimir ou sufocar a curiosidade — própria ou alheia',
    ],
    sampleNames: [
      'Keeper-Seeks-Yellow',
      'Soft-Patch-Yellow-Eyes',
      'Merricat',
      'Sandru',
      'Alyara',
      'Crinto',
      'Ruun',
      'Yonsol',
      'Zakkar',
      'Hoya',
    ],
  },
  heritageIds: [
    HERITAGE_CLAWED_CATFOLK_ID,
    HERITAGE_HUNTING_CATFOLK_ID,
    HERITAGE_JUNGLE_CATFOLK_ID,
    HERITAGE_LIMINAL_CATFOLK_ID,
    HERITAGE_NINE_LIVES_CATFOLK_ID,
    HERITAGE_SHARP_EARED_CATFOLK_ID,
    HERITAGE_WINTER_CATFOLK_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=77',
}

export const catfolkHeritages: Heritage[] = [
  {
    id: HERITAGE_CLAWED_CATFOLK_ID,
    ancestryId: ANCESTRY_CATFOLK_ID,
    name: 'Povo-Felino com Garras',
    originalName: 'Clawed Catfolk',
    description:
      'Sua família tem garras particularmente longas e afiadas, capazes de golpes cortantes. Você ganha um ataque desarmado de garra que causa 1d6 de dano cortante. Suas garras estão no grupo briga e têm os traços ágil, finura e desarmado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 9,
    rulesSummary:
      'Garra desarmada 1d6 cortante (briga, ágil, finura, desarmado).',
    specialAbilities: [
      {
        id: 'clawed-catfolk-claw',
        name: 'Garra',
        originalName: 'Claw',
        actionType: 'passive',
        description:
          'Ataque desarmado de garra: 1d6 cortante, grupo briga, traços ágil, finura e desarmado.',
      },
    ],
  },
  {
    id: HERITAGE_HUNTING_CATFOLK_ID,
    ancestryId: ANCESTRY_CATFOLK_ID,
    name: 'Povo-Felino Caçador',
    originalName: 'Hunting Catfolk',
    description:
      'Você vem de uma longa linhagem de caçadores e rastreadores habilidosos e tem olfato especialmente aguçado. Você ganha faro impreciso com alcance de 30 pés. Isso significa que pode usar o olfato para determinar a localização de uma criatura. O mestre normalmente dobra o alcance se você estiver a favor do vento da criatura, ou reduz pela metade se estiver contra o vento. Além disso, recebe +2 de bônus de circunstância a testes de Rastrear uma criatura ou objeto se já os tiver cheirado antes.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 9,
    rulesSummary:
      'Faro impreciso 30 pés; +2 Rastrear se já cheirou o alvo.',
    specialAbilities: [
      {
        id: 'hunting-catfolk-scent',
        name: 'Faro Impreciso',
        originalName: 'Imprecise Scent',
        actionType: 'passive',
        description:
          'Você tem faro impreciso com alcance de 30 pés e +2 de bônus de circunstância a Rastrear criaturas ou objetos que já tenha cheirado.',
      },
    ],
  },
  {
    id: HERITAGE_JUNGLE_CATFOLK_ID,
    ancestryId: ANCESTRY_CATFOLK_ID,
    name: 'Povo-Felino da Selva',
    originalName: 'Jungle Catfolk',
    description:
      'Você descende de predadores da selva e se move com rapidez por matagal e sub-bosque. Ignora terreno difícil causado por vegetação rasteira; terreno difícil maior causado por vegetação rasteira conta apenas como terreno difícil para você.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 9,
    rulesSummary:
      'Ignora terreno difícil de vegetação rasteira; vegetação rasteira maior vira apenas difícil.',
  },
  {
    id: HERITAGE_LIMINAL_CATFOLK_ID,
    ancestryId: ANCESTRY_CATFOLK_ID,
    name: 'Povo-Felino Liminal',
    originalName: 'Liminal Catfolk',
    description:
      'Você herdou uma proximidade com os cantos distantes do mundo, onde as fronteiras entre dimensões se tornam tênues. Pode conjurar o truque detectar magia como magia oculta inata à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Também recebe +1 de bônus de circunstância a testes de Ocultismo para Recordar Conhecimento sobre criaturas originárias de planos além do Universo.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 9,
    rulesSummary:
      'Detectar magia oculto inato à vontade; +1 Ocultismo RK sobre criaturas extraplanares.',
    specialAbilities: [
      {
        id: 'liminal-detect-magic',
        name: 'Detectar Magia Inato',
        originalName: 'Innate Detect Magic',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura detectar magia como truque oculto inato à vontade (posto = metade do nível, arredondado para cima).',
      },
    ],
  },
  {
    id: HERITAGE_NINE_LIVES_CATFOLK_ID,
    ancestryId: ANCESTRY_CATFOLK_ID,
    name: 'Povo-Felino das Nove Vidas',
    originalName: 'Nine Lives Catfolk',
    description:
      'Sua família sempre parece se recuperar de desastres — não por robustez física ou perícia especializada, mas por pura sorte. Outros catfolk sussurram que você tem nove vidas. Enquanto estiver morrendo, não soma seu valor de morrendo à CD dos testes de recuperação (a CD costuma ser 10). Além disso, recebe o feito geral Difícil de Matar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 9,
    rulesSummary:
      'Ao morrer, não soma morrendo à CD de recuperação; feito Difícil de Matar.',
    specialAbilities: [
      {
        id: 'nine-lives-dying',
        name: 'Nove Vidas',
        originalName: 'Nine Lives',
        actionType: 'passive',
        description:
          'Enquanto estiver morrendo, não soma seu valor de morrendo à CD dos testes de recuperação.',
      },
    ],
    featGrants: [
      {
        id: 'nine-lives-diehard',
        featName: 'Difícil de Matar',
        originalName: 'Diehard',
        featType: 'general',
        featId: 'feat-diehard',
      },
    ],
  },
  {
    id: HERITAGE_SHARP_EARED_CATFOLK_ID,
    ancestryId: ANCESTRY_CATFOLK_ID,
    name: 'Povo-Felino de Orelhas Aguçadas',
    originalName: 'Sharp-Eared Catfolk',
    description:
      'Você nasceu com orelhas grandes e expressivas que se movem com seu humor e se erguem a qualquer som inesperado. Recebe +2 de bônus de circunstância para localizar criaturas não detectadas que você pudesse ouvir a até 30 pés com a ação Procurar. Enquanto estiver ciente de uma criatura pelo som, uma vez por rodada suas orelhas podem ajudá-lo a Apontar a criatura para todos os aliados como uma ação livre.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 9,
    rulesSummary:
      '+2 Procurar para achar não detectados ouvidos a 30 pés; Apontar como livre 1×/rodada por som.',
  },
  {
    id: HERITAGE_WINTER_CATFOLK_ID,
    ancestryId: ANCESTRY_CATFOLK_ID,
    name: 'Povo-Felino do Inverno',
    originalName: 'Winter Catfolk',
    description:
      'Você tem um pelo espesso que o protege do frio. Recebe resistência a frio igual à metade do seu nível (mínimo 1). Trata efeitos ambientais de frio como se fossem um grau menos extremos (frio incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 9,
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
]
