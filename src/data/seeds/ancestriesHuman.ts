import type { Ancestry, Heritage } from '@/types/ancestry'
import { SKILL_IDS } from '@/types/core'
import { SKILL_LABELS } from '@/utils/labels'
import { SOURCE_PLAYER_CORE_ID } from './sources'

export const ANCESTRY_HUMAN_ID = 'ancestry-human'

export const HERITAGE_SKILLED_HUMAN_ID = 'heritage-skilled-human'
export const HERITAGE_VERSATILE_HUMAN_ID = 'heritage-versatile-human'

const skillChoiceOptions = SKILL_IDS.map((id) => ({
  id,
  label: SKILL_LABELS[id],
}))

/** Humano — Player Core (Remaster), Archives of Nethys ID 64 */
export const humanAncestry: Ancestry = {
  id: ANCESTRY_HUMAN_ID,
  name: 'Humano',
  originalName: 'Human',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 63,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'human-boost-free-1',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
    {
      id: 'human-boost-free-2',
      label: 'Segundo boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: [],
  languages: {
    automatic: ['Comum'],
    additionalOptions: [
      'Anão',
      'Dracônico',
      'Elfo',
      'Empíreo',
      'Feérico',
      'Gnomo',
      'Goblin',
      'Halfling',
      'Jotun',
      'Kholo',
      'Orc',
      'Petran',
      'Sakvroth',
    ],
    additionalFromIntelligence: true,
    /** Humano: idiomas adicionais = 1 + modificador de Inteligência */
    bonusSlots: 1,
  },
  senses: [],
  specialAbilities: [],
  traits: ['Humano', 'Humanoide'],
  lore: {
    summary:
      'Humanos são um povo diverso e adaptável, de amplo potencial e ambições profundas. Tão imprevisíveis e variados quanto qualquer povo de Golarion, têm impulso excepcional e capacidade de endurecer e expandir. Embora muitas civilizações tenham florescido antes da humanidade, humanos construíram algumas das maiores — e das mais terríveis — sociedades da história, e hoje são o povo mais populoso ao redor do Mar Interior. Ambição, versatilidade e potencial excepcional os tornaram a ancestralidade predominante do mundo.',
    youMight: [
      'Esforçar-se para alcançar a grandeza, em nome próprio ou de uma causa.',
      'Buscar entender seu propósito no mundo.',
      'Valorizar profundamente relações com família e amigos.',
    ],
    othersProbably: [
      'Respeitam sua flexibilidade, adaptabilidade e — na maioria dos casos — mente aberta.',
      'Desconfiam de suas intenções, temendo que você busque só poder ou riqueza.',
      'Não sabem o que esperar de você e hesitam em assumir suas intenções.',
    ],
    physicalDescription:
      'As características físicas dos humanos variam tanto quanto os climas do mundo: ampla variedade de tons de pele e cabelo, tipos de corpo e traços faciais. Em geral, a pele tende a ser mais escura quanto mais perto do equador vivem ou viveram seus ancestrais. Alcançam a maturidade física por volta dos 15 anos, embora a maturidade mental venha alguns anos depois. Um humano típico pode viver cerca de 90 anos. Em relação a outras ancestralidades, têm características físicas excepcionalmente mutáveis — maior variação de altura, peso e outros parâmetros.',
    society:
      'A variedade humana também aparece em governos, atitudes e normas sociais. Embora as culturas humanas mais antigas possam traçar histórias compartilhadas por milhares de anos, comparadas às sociedades élficas ou anãs as civilizações humanas parecem em constante fluxo — impérios se fragmentam e novos reinos absorvem os antigos. Etnias do Mar Interior incluem Garundi, Keleshitas, Kellids, Mwangi, Shoanti, Taldanos, Tians, Ulfens e Varisianos, entre outras; um humano pode ser de qualquer etnia, independentemente da terra que chama de lar.',
    beliefs:
      'Humanos dedicam-se a causas, códigos morais e ambições pessoais com intensidade. Muitos exploram o mundo ou buscam grandeza; outros encontram propósito em família, fé ou comunidade. Sua diversidade de crenças acompanha a diversidade de culturas — do culto a deuses regionais a filosofias seculares.',
    popularEdicts: [
      'Explorar o mundo',
      'Buscar a grandeza',
      'Dedicar-se a uma visão moral',
    ],
    popularAnathema: ['Desperdiçar o pouco tempo que você tem'],
    sampleNames: [
      'Aisha',
      'Belor',
      'Damiel',
      'Harsk',
      'Ileosa',
      'Joran',
      'Lirianne',
      'Marcos',
      'Nualia',
      'Quinn',
      'Sajan',
      'Seelah',
      'Valeros',
      'Yasmina',
      'Ezren',
    ],
  },
  heritageIds: [HERITAGE_SKILLED_HUMAN_ID, HERITAGE_VERSATILE_HUMAN_ID],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=64',
}

export const humanHeritages: Heritage[] = [
  {
    id: HERITAGE_SKILLED_HUMAN_ID,
    ancestryId: ANCESTRY_HUMAN_ID,
    name: 'Humano Hábil',
    originalName: 'Skilled Human',
    description:
      'Sua engenhosidade permite treinar em uma ampla variedade de perícias. Você fica treinado em uma perícia à sua escolha. No 5º nível, fica especialista nessa perícia.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 63,
    rulesSummary:
      'Treinado em 1 perícia à escolha; especialista nela no 5º nível.',
    choices: [
      {
        id: 'skill-skilled',
        label: 'Perícia da herança',
        options: skillChoiceOptions,
      },
    ],
    skillGrants: [
      {
        id: 'skilled',
        rank: 'trained',
        expertAtLevel: 5,
      },
    ],
  },
  {
    id: HERITAGE_VERSATILE_HUMAN_ID,
    ancestryId: ANCESTRY_HUMAN_ID,
    name: 'Humano Versátil',
    originalName: 'Versatile Human',
    description:
      'A versatilidade e ambição da humanidade alimentaram sua ascensão à ancestralidade mais comum na maioria das nações. Escolha um feito geral para o qual você atenda aos pré-requisitos (como o feito de ancestralidade, pode selecioná-lo em qualquer ponto da criação do personagem).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 63,
    rulesSummary: 'Ganha 1 feito geral (pré-requisitos devem ser atendidos).',
    choices: [
      {
        id: 'versatile-general-feat',
        label: 'Feito geral',
        options: [
          { id: 'feat-toughness', label: 'Resistência', originalLabel: 'Toughness' },
          {
            id: 'feat-diehard',
            label: 'Difícil de Matar',
            originalLabel: 'Diehard',
          },
          { id: 'other', label: 'Outro (anotar nas notas)' },
        ],
      },
    ],
    featGrants: [
      {
        id: 'versatile-general',
        featName: 'Feito geral (escolhido)',
        originalName: 'General Feat',
        featType: 'general',
      },
    ],
  },
]
