import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  elfAncestry,
  elfHeritages,
} from './ancestriesElf'
import {
  gnomeAncestry,
  gnomeHeritages,
} from './ancestriesGnome'
import {
  goblinAncestry,
  goblinHeritages,
} from './ancestriesGoblin'
import {
  halflingAncestry,
  halflingHeritages,
} from './ancestriesHalfling'
import {
  humanAncestry,
  humanHeritages,
} from './ancestriesHuman'
import {
  orcAncestry,
  orcHeritages,
} from './ancestriesOrc'
import {
  leshyAncestry,
  leshyHeritages,
} from './ancestriesLeshy'
import {
  catfolkAncestry,
  catfolkHeritages,
} from './ancestriesCatfolk'
import {
  koboldAncestry,
  koboldHeritages,
} from './ancestriesKobold'
import {
  tenguAncestry,
  tenguHeritages,
} from './ancestriesTengu'
import {
  hobgoblinAncestry,
  hobgoblinHeritages,
} from './ancestriesHobgoblin'
import {
  lizardfolkAncestry,
  lizardfolkHeritages,
} from './ancestriesLizardfolk'
import {
  ratfolkAncestry,
  ratfolkHeritages,
} from './ancestriesRatfolk'
import {
  kholoAncestry,
  kholoHeritages,
} from './ancestriesKholo'
import {
  tripkeeAncestry,
  tripkeeHeritages,
} from './ancestriesTripkee'
import {
  centaurAncestry,
  centaurHeritages,
} from './ancestriesCentaur'
import {
  athamaruAncestry,
  athamaruHeritages,
} from './ancestriesAthamaru'
import {
  merfolkAncestry,
  merfolkHeritages,
} from './ancestriesMerfolk'
import {
  minotaurAncestry,
  minotaurHeritages,
} from './ancestriesMinotaur'
import {
  surkiAncestry,
  surkiHeritages,
} from './ancestriesSurki'
import {
  awakenedAnimalAncestry,
  awakenedAnimalHeritages,
} from './ancestriesAwakenedAnimal'
import {
  samsaranAncestry,
  samsaranHeritages,
} from './ancestriesSamsaran'
import {
  sarangayAncestry,
  sarangayHeritages,
} from './ancestriesSarangay'
import {
  tanukiAncestry,
  tanukiHeritages,
} from './ancestriesTanuki'
import {
  wayangAncestry,
  wayangHeritages,
} from './ancestriesWayang'
import {
  yakshaAncestry,
  yakshaHeritages,
} from './ancestriesYaksha'
import {
  yaoguaiAncestry,
  yaoguaiHeritages,
} from './ancestriesYaoguai'
import {
  automatonAncestry,
  automatonHeritages,
} from './ancestriesAutomaton'
import {
  jotunbornAncestry,
  jotunbornHeritages,
} from './ancestriesJotunborn'
import {
  dragonetAncestry,
  dragonetHeritages,
} from './ancestriesDragonet'
import { versatileHeritages } from './heritagesVersatile'
import {
  SOURCE_PLAYER_CORE_ID,
} from './sources'

export const ANCESTRY_DWARF_ID = 'ancestry-dwarf'

export const HERITAGE_ANCIENT_BLOODED_DWARF_ID = 'heritage-ancient-blooded-dwarf'
export const HERITAGE_DEATH_WARDEN_DWARF_ID = 'heritage-death-warden-dwarf'
export const HERITAGE_FORGE_DWARF_ID = 'heritage-forge-dwarf'
export const HERITAGE_ROCK_DWARF_ID = 'heritage-rock-dwarf'
export const HERITAGE_STRONG_BLOODED_DWARF_ID = 'heritage-strong-blooded-dwarf'

/** Anão — Player Core (Remaster), Archives of Nethys ID 59 */
export const dwarfAncestry: Ancestry = {
  id: ANCESTRY_DWARF_ID,
  name: 'Anão',
  originalName: 'Dwarf',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 43,
  hitPoints: 10,
  size: 'medium',
  speed: 20,
  attributeBoosts: [
    {
      id: 'dwarf-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'dwarf-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'dwarf-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['charisma'],
  languages: {
    automatic: ['Comum', 'Anão'],
    additionalOptions: [
      'Gnomo',
      'Goblin',
      'Jotun',
      'Orc',
      'Petran',
      'Sakvroth',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'dwarf-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [
    {
      id: 'dwarf-clan-dagger',
      name: 'Adaga do Clã',
      originalName: 'Clan Dagger',
      actionType: 'passive',
      description:
        'Você recebe uma adaga do clã de graça, presenteada no nascimento. Vender essa adaga é um tabu terrível e atrai o desdém de outros anões.',
    },
  ],
  traits: ['Anão', 'Humanoide'],
  lore: {
    summary:
      'Anões são um povo baixo e robusto, muitas vezes teimosos, ferozes e dedicados. Têm reputação de estoicos e severos, mas também um zelo desenfreado e valorizam profundamente o artesanato. Para um estranho, podem parecer desconfiados e clânicos; para amigos e família, são calorosos e cuidadosos. A confiança de um anão é difícil de conquistar — mas, uma vez ganha, é forte como ferro.',
    youMight: [
      'Esforçar-se para manter a honra pessoal e recusar-se a recuar.',
      'Apreciar artesanato de qualidade em todas as formas e insistir nisso em todo o seu equipamento.',
    ],
    othersProbably: [
      'Veem você como teimoso — e se isso é virtude ou defeito muda a cada instante.',
      'Reconhecem a conexão profunda que você tem com família, herança e amigos.',
    ],
    physicalDescription:
      'Anões são baixos e robustos, cerca de 30 cm mais baixos que a maioria dos humanos. Têm corpos largos e compactos, com estrutura corpulenta. Anões de todos os gêneros orgulham-se do comprimento do cabelo e da barba, frequentemente trançados em padrões intricados — alguns representando clãs específicos. Uma barba longa é sinal de maturidade e honra em muitos clãs. Anões tipicamente alcançam a maturidade física por volta dos 25 anos, embora a cultura tradicionalista valorize mais as cerimônias de passagem de cada clã do que uma idade fixa. Um anão típico pode viver cerca de 350 anos.',
    society:
      'Embora o antigo império anão tenha caído há muito tempo, esmagado por orcs e goblinoides, os anões de hoje mantêm muitas das qualidades que os levaram à grandeza: ferocidade, determinação e teimosia em seus empreendimentos. Vivem em Cidadelas Celestes montanhosas espalhadas pela superfície, o que pode criar grandes divisões culturais entre clãs. Quase todos compartilham paixão por trabalho em pedra, metal e família. Poucos anões são vistos sem a adaga do clã no cinto — forjada pouco antes do nascimento e distintiva do clã. Ao se apresentarem, anões costumam listar família, clã e outros vínculos e títulos honoríficos.',
    beliefs:
      'Anões tendem a valorizar a honra e seguir de perto as tradições de seus clãs e reinos. Têm forte senso de amizade e justiça, embora sejam particulares sobre quem consideram amigos. Trabalham duro e se divertem ainda mais — especialmente com cerveja forte. Torag, deus dos anões, é a divindade principal, embora a adoração da família de Torag também seja comum.',
    popularEdicts: [
      'Criar arte com utilidade',
      'Proteger sua comunidade contra quem a ameace',
      'Manter a adaga do clã por perto',
    ],
    popularAnathema: [
      'Deixar uma atividade ou promessa incompleta',
      'Abandonar a família',
    ],
    sampleNames: [
      'Agna',
      'Bodill',
      'Edrukk',
      'Grunyar',
      'Ingra',
      'Kotri',
      'Morgrym',
      'Rogar',
      'Torra',
      'Yangrit',
    ],
  },
  heritageIds: [
    HERITAGE_ANCIENT_BLOODED_DWARF_ID,
    HERITAGE_DEATH_WARDEN_DWARF_ID,
    HERITAGE_FORGE_DWARF_ID,
    HERITAGE_ROCK_DWARF_ID,
    HERITAGE_STRONG_BLOODED_DWARF_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=59',
}

export const dwarfHeritages: Heritage[] = [
  {
    id: HERITAGE_ANCIENT_BLOODED_DWARF_ID,
    ancestryId: ANCESTRY_DWARF_ID,
    name: 'Anão de Sangue Antigo',
    originalName: 'Ancient-Blooded Dwarf',
    description:
      'Heróis anões de outrora conseguiam ignorar a magia dos inimigos, e parte dessa resistência se manifesta em você. Você ganha a reação Invocar Sangue Antigo.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 43,
    rulesSummary:
      'Reação: +1 de bônus de circunstância a salvaguardas contra efeitos mágicos (até o fim do turno).',
    specialAbilities: [
      {
        id: 'call-on-ancient-blood',
        name: 'Invocar Sangue Antigo',
        originalName: 'Call on Ancient Blood',
        actionType: 'reaction',
        trigger:
          'Você tenta uma salvaguarda contra um efeito mágico, mas ainda não rolou.',
        description:
          'A resistência inata à magia de seus ancestrais surge e depois esvai lentamente. Você recebe +1 de bônus de circunstância a salvaguardas até o fim deste turno. Este bônus também se aplica à salvaguarda que disparou a reação.',
      },
    ],
  },
  {
    id: HERITAGE_DEATH_WARDEN_DWARF_ID,
    ancestryId: ANCESTRY_DWARF_ID,
    name: 'Anão Guardião da Morte',
    originalName: 'Death Warden Dwarf',
    description:
      'Seus ancestrais eram guardiões de túmulos, e o poder de afastar a morte passou a você. Se você obtiver sucesso em uma salvaguarda contra um efeito com o traço vazio ou criado por uma criatura morta-viva, o resultado vira um sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 43,
    rulesSummary:
      'Sucesso → sucesso crítico em salvaguardas contra efeitos vazio ou criados por mortos-vivos.',
  },
  {
    id: HERITAGE_FORGE_DWARF_ID,
    ancestryId: ANCESTRY_DWARF_ID,
    name: 'Anão da Forja',
    originalName: 'Forge Dwarf',
    description:
      'Você tem uma adaptação notável a ambientes quentes. Isso concede resistência a fogo igual à metade do seu nível (mínimo 1), e você trata efeitos ambientais de calor como se fossem um grau menos extremos (calor incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 43,
    rulesSummary:
      'Resistência a fogo = metade do nível (mín. 1). Calor ambiental um grau menos extremo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'fire',
        label: 'Resistência a fogo',
      },
    ],
  },
  {
    id: HERITAGE_ROCK_DWARF_ID,
    ancestryId: ANCESTRY_DWARF_ID,
    name: 'Anão da Rocha',
    originalName: 'Rock Dwarf',
    description:
      'Seus ancestrais viviam e trabalhavam entre as pedras antigas das montanhas ou nas profundezas da terra. Isso o torna sólido como rocha quando planta os pés. Você recebe +2 de bônus de circunstância à sua CD de Fortitude ou Reflexos contra tentativas de Reposicionar, Empurrar ou Derrubar você. Este bônus também se aplica a salvaguardas contra magias ou efeitos que tentem forçá-lo a se mover ou derrubá-lo. Além disso, se qualquer efeito o forçasse a se mover 3 metros ou mais, você se move apenas metade da distância.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 43,
    rulesSummary:
      '+2 de circunstância à CD vs Reposicionar/Empurrar/Derrubar; metade do movimento forçado (≥ 3 m).',
  },
  {
    id: HERITAGE_STRONG_BLOODED_DWARF_ID,
    ancestryId: ANCESTRY_DWARF_ID,
    name: 'Anão de Sangue Forte',
    originalName: 'Strong-Blooded Dwarf',
    description:
      'Seu sangue é vigoroso e forte, e você consegue sacudir toxinas. Você recebe resistência a veneno igual à metade do seu nível (mínimo 1), e cada salvaguarda bem-sucedida contra uma aflição de veneno reduz o estágio em 2, ou em 1 para um veneno virulento. Cada sucesso crítico contra um veneno contínuo reduz o estágio em 3, ou em 2 para um veneno virulento.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 43,
    rulesSummary:
      'Resistência a veneno = metade do nível (mín. 1). Sucessos reduzem mais estágios de veneno.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'poison',
        label: 'Resistência a veneno',
      },
    ],
  },
]

export const officialAncestries: Ancestry[] = [
  athamaruAncestry,
  automatonAncestry,
  awakenedAnimalAncestry,
  catfolkAncestry,
  centaurAncestry,
  dwarfAncestry,
  dragonetAncestry,
  elfAncestry,
  gnomeAncestry,
  goblinAncestry,
  halflingAncestry,
  hobgoblinAncestry,
  humanAncestry,
  jotunbornAncestry,
  kholoAncestry,
  koboldAncestry,
  leshyAncestry,
  lizardfolkAncestry,
  merfolkAncestry,
  minotaurAncestry,
  orcAncestry,
  ratfolkAncestry,
  samsaranAncestry,
  sarangayAncestry,
  surkiAncestry,
  tanukiAncestry,
  tenguAncestry,
  tripkeeAncestry,
  wayangAncestry,
  yakshaAncestry,
  yaoguaiAncestry,
]

export const officialHeritages: Heritage[] = [
  ...athamaruHeritages,
  ...automatonHeritages,
  ...awakenedAnimalHeritages,
  ...catfolkHeritages,
  ...centaurHeritages,
  ...dwarfHeritages,
  ...dragonetHeritages,
  ...elfHeritages,
  ...gnomeHeritages,
  ...goblinHeritages,
  ...halflingHeritages,
  ...hobgoblinHeritages,
  ...humanHeritages,
  ...jotunbornHeritages,
  ...kholoHeritages,
  ...koboldHeritages,
  ...leshyHeritages,
  ...lizardfolkHeritages,
  ...merfolkHeritages,
  ...minotaurHeritages,
  ...orcHeritages,
  ...ratfolkHeritages,
  ...samsaranHeritages,
  ...sarangayHeritages,
  ...surkiHeritages,
  ...tanukiHeritages,
  ...tenguHeritages,
  ...tripkeeHeritages,
  ...wayangHeritages,
  ...yakshaHeritages,
  ...yaoguaiHeritages,
  ...versatileHeritages,
]
