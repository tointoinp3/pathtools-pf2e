import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_TIAN_XIA_CG_ID } from './sources'

export const ANCESTRY_SAMSARAN_ID = 'ancestry-samsaran'

export const HERITAGE_HEALER_SAMSARAN_ID = 'heritage-healer-samsaran'
export const HERITAGE_MOUNTAINEER_SAMSARAN_ID = 'heritage-mountaineer-samsaran'
export const HERITAGE_ORACULAR_SAMSARAN_ID = 'heritage-oracular-samsaran'
export const HERITAGE_SANCTUARY_SAMSARAN_ID = 'heritage-sanctuary-samsaran'
export const HERITAGE_WILDERNESS_SAMSARAN_ID = 'heritage-wilderness-samsaran'

/** Samsaran — Tian Xia Character Guide, Archives of Nethys ID 88 */
export const samsaranAncestry: Ancestry = {
  id: ANCESTRY_SAMSARAN_ID,
  name: 'Samsaran',
  originalName: 'Samsaran',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_TIAN_XIA_CG_ID,
  sourcePage: 52,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'samsaran-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'samsaran-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'samsaran-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['charisma'],
  languages: {
    automatic: ['Comum', 'Samsaran'],
    additionalOptions: [
      'Ctoniano',
      'Diabólico',
      'Dracônico',
      'Empíreo',
      'Jotun',
      'Petran',
      'Pyric',
      'Sussuran',
      'Talássico',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'samsaran-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'samsaran-cryptomnesia',
      name: 'Criptomnésia',
      originalName: 'Cryptomnesia',
      actionType: 'passive',
      description:
        'Você retém fragmentos de conhecimento de vidas anteriores. Recebe +1 de bônus de circunstância a testes de perícia destreinados.',
    },
    {
      id: 'samsaran-wanderers-soul',
      name: 'Alma Errante',
      originalName: "Wanderer's Soul",
      actionType: 'passive',
      description:
        'Sua alma volta com facilidade ao ciclo da reencarnação. Quando você é alvo de reerguer os mortos, reencarnar ou ritual semelhante que o devolva à vida, o conjurador principal usa o resultado um grau de sucesso melhor do que o rolado. Você sempre retorna à vida como samsaran, mesmo que o ritual reencarnasse você em outra ancestralidade.',
    },
  ],
  traits: ['Samsaran', 'Humanoide'],
  lore: {
    summary:
      'Samsarans são um povo de pele azul nativo de Zi Ha, que reencarna ao morrer e lembra pedaços de vidas passadas. Dedicam-se a alcançar a iluminação — compreensão verdadeira de tudo e de todos — até o ciclo cessar e o corpo derreter em água pura.',
    youMight: [
      'Ser obstinado rumo ao próximo passo da iluminação.',
      'Ter curiosidade profunda por outras pessoas e perspectivas.',
      'Levar as coisas com calma, adiando o que pode esperar o próximo ciclo.',
    ],
    othersProbably: [
      'Acham que você é muito sábio e conhecedor.',
      'Assumem que é profundamente espiritual e desligado do mundano.',
      'Invejam sua capacidade de reencarnar e o consideram imortal.',
    ],
    physicalDescription:
      'Samsarans refletem a diversidade da ancestralidade da primeira vida mortal; só na primeira renascença assumem os traços únicos do povo. A pele é azul — do pálido ao azul-marinho mais profundo. Os olhos não têm pupila e costumam ser pálidos como a lua. O sangue é transparente, como água cristalina. Ao morrer, reencarnam como bebê de um casal humanoide não samsaran, muitas vezes na região a que mais se apegaram. Envelhecem como humanos e, salvo morte prematura, morrem de velhice aos 100 anos. Filhos de samsarans vivem o primeiro ciclo na ancestralidade mortal dos pais e só ganham a pele e os olhos samsarans após a primeira morte.',
    society:
      'Não há um único caminho para a iluminação. Alguns estudam por décadas em escolas; outros servem deuses; muitos isolam-se em reflexão; uns poucos saem para viver tudo em primeira mão. Comunidades samsarans são pequenas e unidas, em geral em escolas e templos, e convidam não samsarans de confiança a compartilhar saberes. Fora dos enclaves, vivem nômade até achar algo a estudar. Raramente têm filhos; a tradição é que a criança viva a primeira vida entre os da própria ancestralidade. Nomes misturam o dado pelos pais desta vida com um segundo nome escolhido na idade adulta, refletindo o que aprenderam ou o que buscam neste ciclo.',
    beliefs:
      'Muitos tendem à ordem, temperada por empatia de inúmeros corpos. Crenças mudam entre encarnações. Religião oferece comunidade e um mapa do mundo; Tsukiyo é citado como patrono, pela própria história de renascimento e pelo ciclo da lua. Alguns contos dizem que ele abençoou as nascentes mágicas dos primeiros samsarans.',
    popularEdicts: [
      'Alcançar maior autocompreensão',
      'Encontrar seu caminho pessoal rumo à iluminação',
      'Não ter pressa nas jornadas',
    ],
    popularAnathema: [
      'Viver sem intenção ou propósito',
      'Impedir tentativas genuínas de aprendizado',
      'Estagnar em pensamento ou paixão',
    ],
    sampleNames: [
      'Altuin Nurture',
      'Davare Clarity',
      'Enkhma Defense',
      'Jochi Spellcrafter',
      'Narintya Softheart',
      'Sarange Lawseeker',
    ],
  },
  heritageIds: [
    HERITAGE_HEALER_SAMSARAN_ID,
    HERITAGE_MOUNTAINEER_SAMSARAN_ID,
    HERITAGE_ORACULAR_SAMSARAN_ID,
    HERITAGE_SANCTUARY_SAMSARAN_ID,
    HERITAGE_WILDERNESS_SAMSARAN_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=88',
}

export const samsaranHeritages: Heritage[] = [
  {
    id: HERITAGE_HEALER_SAMSARAN_ID,
    ancestryId: ANCESTRY_SAMSARAN_ID,
    name: 'Samsaran Curandeiro',
    originalName: 'Healer Samsaran',
    description:
      'Em busca da iluminação, suas encarnações passadas deixaram Zi Ha e cruzaram Tian Xia e o resto de Golarion. Encontros perigosos nas viagens deixaram flashbacks de curar feridas. Você fica treinado em Medicina (ou em outra perícia se já for treinado em Medicina). Ao usar Medicina para Tratar Ferimentos em si mesmo, soma o seu nível aos PV recuperados.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 54,
    rulesSummary:
      'Treinado em Medicina (ou outra se já for); ao Tratar Ferimentos em si, +nível aos PV recuperados.',
    skillGrants: [
      {
        id: 'healer-medicine',
        skillId: 'medicine',
        rank: 'trained',
        replaceIfTrained: true,
      },
    ],
    specialAbilities: [
      {
        id: 'healer-self-treat',
        name: 'Técnicas de Autocura',
        originalName: 'Self-Treatment',
        actionType: 'passive',
        description:
          'Ao usar Medicina para Tratar Ferimentos em si mesmo, some o seu nível aos PV recuperados.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=386',
  },
  {
    id: HERITAGE_MOUNTAINEER_SAMSARAN_ID,
    ancestryId: ANCESTRY_SAMSARAN_ID,
    name: 'Samsaran Montanhista',
    originalName: 'Mountaineer Samsaran',
    description:
      'Encarnações passadas habitaram cavernas nas montanhas nevadas de Tian Xia, e o corpo se adaptou a tempestades gélidas. Você recebe resistência a frio igual à metade do seu nível (mínimo 1). Efeitos ambientais de frio são um grau menos extremos para você.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 54,
    rulesSummary:
      'Resistência a frio = metade do nível (mín. 1); frio ambiental um grau menos extremo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'cold',
        label: 'Resistência a frio',
      },
    ],
    specialAbilities: [
      {
        id: 'mountaineer-cold-acclimation',
        name: 'Aclimatação ao Frio',
        originalName: 'Cold Acclimation',
        actionType: 'passive',
        description:
          'Efeitos ambientais de frio são um grau menos extremos para você.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=387',
  },
  {
    id: HERITAGE_ORACULAR_SAMSARAN_ID,
    ancestryId: ANCESTRY_SAMSARAN_ID,
    name: 'Samsaran Oracular',
    originalName: 'Oracular Samsaran',
    description:
      'Vidas passadas deram insight aguçado ao mundo espiritual e a eventos presentes e futuros — a história se repete. Escolha arcana, divina ou oculta. Você ganha um truque da lista dessa tradição e o conjura como magia inata à vontade, da tradição escolhida. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 55,
    rulesSummary:
      'Escolha tradição (arcana, divina ou oculta): 1 truque inato à vontade, elevado à metade do nível.',
    choices: [
      {
        id: 'oracular-tradition',
        label: 'Tradição do truque',
        hint: 'Anote também o truque escolhido da lista dessa tradição.',
        options: [
          { id: 'arcane', label: 'Arcana', originalLabel: 'Arcane' },
          { id: 'divine', label: 'Divina', originalLabel: 'Divine' },
          { id: 'occult', label: 'Oculta', originalLabel: 'Occult' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'oracular-cantrip',
        name: 'Truque Oracular',
        originalName: 'Oracular Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura um truque da tradição escolhida como magia inata à vontade, elevado à metade do seu nível (arredondado para cima).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=388',
  },
  {
    id: HERITAGE_SANCTUARY_SAMSARAN_ID,
    ancestryId: ANCESTRY_SAMSARAN_ID,
    name: 'Samsaran do Santuário',
    originalName: 'Sanctuary Samsaran',
    description:
      'Encarnações passadas nasceram em santuários do norte de Zi Ha, treinadas a concentrar-se por longos períodos. Flashbacks nebulosos revelam escrituras úteis nos livros que vidas anteriores devoraram. Você ganha a ação Recorrer ao Passado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 55,
    rulesSummary:
      '1×/dia, ao Recordar Conhecimento: role de novo e use o maior (fortuna); crítico falha→falha; sucesso→crítico.',
    specialAbilities: [
      {
        id: 'sanctuary-tap-the-past',
        name: 'Recorrer ao Passado',
        originalName: 'Tap the Past',
        actionType: 'free',
        frequency: '1 vez por dia',
        trigger: 'Você está prestes a fazer um teste para Recordar Conhecimento',
        description:
          '(Fortuna.) Você se concentra em vislumbres de uma vida anterior para achar a memória de um tomo ou lição aplicável. Role uma segunda vez e use o maior resultado. Se rolar falha crítica, vira falha. Se rolar sucesso, vira sucesso crítico.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=389',
  },
  {
    id: HERITAGE_WILDERNESS_SAMSARAN_ID,
    ancestryId: ANCESTRY_SAMSARAN_ID,
    name: 'Samsaran da Natureza',
    originalName: 'Wilderness Samsaran',
    description:
      'Vidas anteriores nasceram em ambientes remotos, longe de grandes assentamentos. Elas aprenderam a sobreviver com poucos recursos, e você lembra essa vontade de viver. Você fica treinado em Sobrevivência (ou em outra perícia se já for treinado em Sobrevivência). Ignora terreno difícil de árvores, folhagem e vegetação rasteira.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 55,
    rulesSummary:
      'Treinado em Sobrevivência (ou outra se já for); ignora terreno difícil de árvores, folhagem e vegetação.',
    skillGrants: [
      {
        id: 'wilderness-survival',
        skillId: 'survival',
        rank: 'trained',
        replaceIfTrained: true,
      },
    ],
    specialAbilities: [
      {
        id: 'wilderness-undergrowth',
        name: 'Trilha Interiorana',
        originalName: 'Undergrowth Stride',
        actionType: 'passive',
        description:
          'Você ignora terreno difícil causado por árvores, folhagem e vegetação rasteira.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=390',
  },
]
