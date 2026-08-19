import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_BATTLECRY_ID } from './sources'

export const ANCESTRY_JOTUNBORN_ID = 'ancestry-jotunborn'

export const HERITAGE_WARRIOR_JOTUNBORN_ID = 'heritage-warrior-jotunborn'
export const HERITAGE_KEEPER_JOTUNBORN_ID = 'heritage-keeper-jotunborn'
export const HERITAGE_SAGE_JOTUNBORN_ID = 'heritage-sage-jotunborn'
export const HERITAGE_WEAVER_JOTUNBORN_ID = 'heritage-weaver-jotunborn'
export const HERITAGE_PLANE_HOPPER_JOTUNBORN_ID = 'heritage-plane-hopper-jotunborn'

/** Jotunborn — Battlecry!, Archives of Nethys ID 95 */
export const jotunbornAncestry: Ancestry = {
  id: ANCESTRY_JOTUNBORN_ID,
  name: 'Jotunborn',
  originalName: 'Jotunborn',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_BATTLECRY_ID,
  sourcePage: 10,
  hitPoints: 10,
  size: 'large',
  speed: 25,
  attributeBoosts: [
    {
      id: 'jotunborn-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'jotunborn-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'jotunborn-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['charisma'],
  languages: {
    automatic: ['Comum', 'Jotun'],
    additionalOptions: [
      'Cyclops',
      'Anão',
      'Empíreo',
      'Feérico',
      'Orc',
      'Petran',
      'Língua das Sombras',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'jotunborn-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'jotunborn-iivlar-weaving',
      name: 'Trama de Iivlar',
      originalName: 'Iivlar Weaving',
      actionType: 'passive',
      description:
        'Fio planar produzido por criaturas chamadas iivlars está tecido na sua pele. O fio brilha com luz fraca numa emanação de 3 m. Você pode Sustentar para apagar, reativar ou mudar a cor dessa luz.',
    },
  ],
  traits: ['Jotunborn', 'Gigante', 'Humanoide'],
  lore: {
    summary:
      'Forjados do sangue de titãs antigos, os jotunborn foram criados pelos primeiros deuses para vigiar o Universo. Gigantes de pele pálida e fios mágicos na pele, hoje muitos ficaram presos em Golarion após a Chuva dos Deuses.',
    youMight: [
      'Confiar no tamanho e na força para alcançar seus objetivos.',
      'Querer cuidar de outras pessoas ou de um lugar natural específico.',
    ],
    othersProbably: [
      'Assumem que você descende de gigantes do fogo, da pedra e afins.',
      'Te acham lento só pela aparência.',
    ],
    physicalDescription:
      'Humanoides grandes, cerca do dobro de um humano: uns 3,6 m de altura e mais de 680 kg. Corpo grosso e musculoso, ombros e pescoço especialmente largos. Tons de pele em roxos pálidos, azuis e cinzas claros. Apesar do porte, são ágeis e usam as pernas poderosas para se mover rápido. Adultos por volta dos 20 anos; podem viver até 200. Continuam crescendo com a idade — os mais velhos chegam a 6 m.\n\nO traço mais marcante são os fios tecidos na pele. Jotunborn criam iivlars, insetos planares cuja seda tem propriedades mágicas. Tecida na pele, permite tocar esses efeitos: a trama brilha, útil para se achar no subplano. Com o tempo o efeito vira biológico e funciona até onde a magia falha. Alguns aprofundam a conexão e desenvolvem poderes mágicos.',
    society:
      'A maioria vive em clãs seminômades de até 100 membros. Papéis-chave: criadores de iivlar, cronistas, guardas, batedores e tecelões. Não há líder fixo: os mais seniores desses papéis guiam o grupo e votam nas decisões. É comum um sênior ceder o posto a alguém mais hábil e voltar a aprendiz — várias vezes na vida.\n\nO nomadismo vem do Fray, o subplano entre o Universo mortal e o Plano Etéreo. Comida é escassa; cópias etéreas de coisas do Universo sustentam pouco. Os clãs migram atrás de forragem e dos iivlars. Depois da Chuva dos Deuses, a volta ao Fray ficou difícil. No Universo mortal, jotunborn tentam ficar perto dos seus ou criar laços com outros mortais.',
    beliefs:
      'A missão original era cuidar da criação dos deuses e só voltar à superfície em desastres. Muitos ainda se veem como mordomos do mundo: avaliam o dano e tentam devolver estabilidade. Outros, presos em Golarion, buscam um sítio vinculado ou um clã novo entre os povos menores.',
    sampleNames: [
      'Bronric',
      'Clarden',
      'Gremm',
      'Hilgrid',
      'Ingard',
      'Jorynn',
      'Kromari',
      'Rodro',
      'Tatro',
      'Yraldis',
    ],
  },
  heritageIds: [
    HERITAGE_WARRIOR_JOTUNBORN_ID,
    HERITAGE_KEEPER_JOTUNBORN_ID,
    HERITAGE_SAGE_JOTUNBORN_ID,
    HERITAGE_WEAVER_JOTUNBORN_ID,
    HERITAGE_PLANE_HOPPER_JOTUNBORN_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=95',
}

export const jotunbornHeritages: Heritage[] = [
  {
    id: HERITAGE_WARRIOR_JOTUNBORN_ID,
    ancestryId: ANCESTRY_JOTUNBORN_ID,
    name: 'Jotunborn Guerreiro',
    originalName: 'Warrior Jotunborn',
    description:
      'O corpo mais resistente fez de você um recruta natural para o combate. O dado de dano do seu punho sobe para 1d6. Você não sofre penalidade ao fazer um ataque letal com o punho.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 12,
    rulesSummary:
      'Punho 1d6; sem penalidade em ataque letal com o punho.',
    specialAbilities: [
      {
        id: 'warrior-fist',
        name: 'Punho Endurecido',
        originalName: 'Hardened Fist',
        actionType: 'passive',
        description:
          'O dado de dano do punho é 1d6. Sem penalidade ao atacar de forma letal com o punho.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=420',
  },
  {
    id: HERITAGE_KEEPER_JOTUNBORN_ID,
    ancestryId: ANCESTRY_JOTUNBORN_ID,
    name: 'Jotunborn Guardião',
    originalName: 'Keeper Jotunborn',
    description:
      'O trabalho como criador de iivlars deu a você entendimento dessas criaturas sagradas e a habilidade de rastreá-las, por mais elusivas que sejam. Você fica treinado em Sobrevivência e ganha o feito de perícia Observar Vida Selvagem. Ganha +1 de bônus de circunstância para Rastrear animais.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 12,
    rulesSummary:
      'Treinado em Sobrevivência; Observar Vida Selvagem; +1 de circunstância para Rastrear animais.',
    skillGrants: [
      {
        id: 'keeper-survival',
        skillId: 'survival',
        rank: 'trained',
        replaceIfTrained: true,
      },
    ],
    featGrants: [
      {
        id: 'keeper-survey-wildlife',
        featId: 'feat-survey-wildlife',
        featName: 'Observar Vida Selvagem',
        originalName: 'Survey Wildlife',
        featType: 'skill',
      },
    ],
    specialAbilities: [
      {
        id: 'keeper-track-animals',
        name: 'Rastro de Iivlar',
        originalName: 'Track Animals',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância para Rastrear animais.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=417',
  },
  {
    id: HERITAGE_SAGE_JOTUNBORN_ID,
    ancestryId: ANCESTRY_JOTUNBORN_ID,
    name: 'Jotunborn Sábio',
    originalName: 'Sage Jotunborn',
    description:
      'Você ficou encarregado de guardar histórias orais e bordadas da família, do clã ou de um povoado inteiro. Fica treinado em Sociedade. Também ganha o feito geral Conhecimento Adicional para um conhecimento à sua escolha.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 12,
    rulesSummary:
      'Treinado em Sociedade; Conhecimento Adicional (um conhecimento à escolha).',
    skillGrants: [
      {
        id: 'sage-society',
        skillId: 'society',
        rank: 'trained',
        replaceIfTrained: true,
      },
    ],
    featGrants: [
      {
        id: 'sage-additional-lore',
        featId: 'feat-additional-lore',
        featName: 'Conhecimento Adicional',
        originalName: 'Additional Lore',
        featType: 'skill',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=419',
  },
  {
    id: HERITAGE_WEAVER_JOTUNBORN_ID,
    ancestryId: ANCESTRY_JOTUNBORN_ID,
    name: 'Jotunborn Tecelão',
    originalName: 'Weaver Jotunborn',
    description:
      'Você dominou a arte de tecer seda de iivlar, técnica que exige atenção fina aos detalhes. Fica treinado em Ofício. Ganha +1 de bônus de circunstância a testes de Percepção para Buscar ao procurar detalhes escondidos, como portas secretas ou armadilhas.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 12,
    rulesSummary:
      'Treinado em Ofício; +1 de circunstância em Percepção para Buscar detalhes escondidos (portas secretas, armadilhas).',
    skillGrants: [
      {
        id: 'weaver-crafting',
        skillId: 'crafting',
        rank: 'trained',
        replaceIfTrained: true,
      },
    ],
    specialAbilities: [
      {
        id: 'weaver-seek-details',
        name: 'Olho da Trama',
        originalName: 'Weaver’s Eye',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância a Percepção para Buscar detalhes escondidos (portas secretas, armadilhas).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=421',
  },
  {
    id: HERITAGE_PLANE_HOPPER_JOTUNBORN_ID,
    ancestryId: ANCESTRY_JOTUNBORN_ID,
    name: 'Jotunborn Saltador de Planos',
    originalName: 'Plane-Hopper Jotunborn',
    description:
      'Você foi escolhido pelo tamanho menor, que facilita atravessar limiares planares. Em geral serve de mensageiro ou batedor, e a exposição planar deu uma centelha de magia. Em vez de Grande, seu tamanho é Médio. Ganha um truque da lista oculta, conjurado como magia inata oculta à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 12,
    rulesSummary:
      'Tamanho Médio (em vez de Grande); 1 truque inato oculto à vontade, elevado à metade do nível.',
    sizeOverride: 'medium',
    specialAbilities: [
      {
        id: 'plane-hopper-cantrip',
        name: 'Centelha Planar',
        originalName: 'Planar Spark',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Escolha um truque da lista oculta. Você o conjura como magia inata oculta à vontade, elevado à metade do seu nível (arredondado para cima). Anote o truque nas notas.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=418',
  },
]
