import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_TIAN_XIA_CG_ID } from './sources'

export const ANCESTRY_YAKSHA_ID = 'ancestry-yaksha'

export const HERITAGE_DENY_FIRSTBORN_YAKSHA_ID = 'heritage-deny-the-firstborn-pursuit'
export const HERITAGE_DENY_NANBYO_YAKSHA_ID = 'heritage-deny-lady-nanbyos-charity'
export const HERITAGE_DENY_TRAITOR_YAKSHA_ID = 'heritage-deny-the-traitors-rebirth'
export const HERITAGE_RESPITE_CLOUDLESS_YAKSHA_ID = 'heritage-respite-of-cloudless-paths'
export const HERITAGE_RESPITE_LOAM_YAKSHA_ID = 'heritage-respite-of-loam-and-leaf'
export const HERITAGE_RESPITE_ROOFS_YAKSHA_ID = 'heritage-respite-of-a-thousand-roofs'

/** Yaksha — Tian Xia Character Guide, Archives of Nethys ID 92 */
export const yakshaAncestry: Ancestry = {
  id: ANCESTRY_YAKSHA_ID,
  name: 'Yaksha',
  originalName: 'Yaksha',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_TIAN_XIA_CG_ID,
  sourcePage: 76,
  hitPoints: 8,
  size: 'medium',
  speed: 25,
  attributeBoosts: [
    {
      id: 'yaksha-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'yaksha-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'yaksha-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['intelligence'],
  languages: {
    automatic: ['Comum', 'Feérico', 'Yaksha'],
    additionalOptions: [
      'Empíreo',
      'Diabólico',
      'Nagaji',
      'Tang',
      'Tengu',
      'Vudrani',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'yaksha-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [],
  traits: ['Yaksha', 'Espírito'],
  lore: {
    summary:
      'Yakshas são espíritos divinos emigrados do Primeiro Mundo. Famosos por votos resolutos e magia primal, abrigam os pobres e protegem a natureza, punindo quem ameaça um ou outro com fúria que esmaga ossos.',
    youMight: [
      'Ter jurado votos para salvaguardar comunidades rurais pouco conhecidas ou ermos remotos.',
      'Ser estoico sem ser insensível, aceitando fardos alheios para entender a própria identidade.',
      'Gostar demais de trocadilhos, tão familiarizado com votos cuidadosamente redigidos.',
    ],
    othersProbably: [
      'Divertem-se tentando enganá-lo a prometer tarefas ou favores mesquinhos.',
      'Assumem que você é incansável e sacrificial e nunca reclamará.',
      'Desdenham de você como simplório e sem interesse em etiqueta ou moda.',
    ],
    physicalDescription:
      'Yakshas não nascem de carne e osso. Manifestam-se quando há excesso de emoções positivas numa área indômita e grande necessidade de proteção. Aparecem como humanos de físico marcante: uns com cerca de 2,10 m e musculatura poderosa; outros robustos e roliços, com no máximo 1,20 m. Todos têm juba luxuosa como figueira-de-bengala, presa em coque ou sob lenço. O poder primal dos votos pode sustentá-los por mil anos; ironicamente, poucos vivem mais de um século, tal o perigo dos juramentos.',
    society:
      'A maioria evita pompa e os excessos da civilização. Reúnem-se em seitas provinciais ou assimilam-se a povos de fronteira. No Primeiro Mundo, alguns reinaram em cidades-templo; em Tian Xia, desencorajam essa grandiosidade — o amor a lucre e prestígio teria levado alguns ao Grande Abandono, e ajuntar-se em massa atraiu a ira dos cruéis. Hoje ficam à margem, protetores ou vingadores dos humildes, envoltos nas esperanças dos pobres.',
    beliefs:
      'Como espíritos guardiões, muitos tendem à benevolência. Poucos são ao mesmo tempo bondosos e disciplinados: o abandono divino e a injustiça imperial os fazem duvidar da hierarquia. Há yakshas selvagens que devoram vilarejos inteiros que violaram tabus; contos de Irori falam de monges que os domam rumo ao arrependimento. Irori é popular entre yakshas avessos a deuses. Yamatsumi também, tratado mais como irmão poderoso do que superior. Opoem-se a Lady Nanbyo e reservam o ódio maior a rakshasas e asuras.',
    popularEdicts: [
      'Guiar os perdidos e cansados',
      'Dar refúgio aos fracos e oprimidos',
      'Jurar votos primordiais',
    ],
    popularAnathema: [
      'Quebrar um voto',
      'Empanturrar-se no extravagante da civilização',
    ],
    sampleNames: [
      'Ahimsaka',
      'Fanren Meng',
      'Hariti',
      'Iryoku',
      'Janavasbha',
      'Mahavana',
      'Osugi',
      'Pattana',
      'Tataka',
      'Wu Shizhi',
    ],
  },
  heritageIds: [
    HERITAGE_DENY_FIRSTBORN_YAKSHA_ID,
    HERITAGE_DENY_NANBYO_YAKSHA_ID,
    HERITAGE_DENY_TRAITOR_YAKSHA_ID,
    HERITAGE_RESPITE_CLOUDLESS_YAKSHA_ID,
    HERITAGE_RESPITE_LOAM_YAKSHA_ID,
    HERITAGE_RESPITE_ROOFS_YAKSHA_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=92',
}

export const yakshaHeritages: Heritage[] = [
  {
    id: HERITAGE_DENY_FIRSTBORN_YAKSHA_ID,
    ancestryId: ANCESTRY_YAKSHA_ID,
    name: 'Negar a Perseguição dos Primogênitos',
    originalName: 'Deny the Firstborn Pursuit',
    description:
      'Você jurou abrigar outros das crueldades do Primeiro Mundo. Ciente das habilidades mentais dos feéricos, o voto concede resistência mental igual à metade do seu nível (mínimo 1) e +2 de bônus de circunstância a testes de Natureza para Recordar Conhecimento sobre feéricos. Édito adicional: confrontar feéricos cruéis que encontrar (desde que tenha chance razoável de sucesso).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 78,
    rulesSummary:
      'Resistência mental = metade do nível (mín. 1); +2 Natureza para RC sobre feéricos. Édito: confrontar feéricos cruéis.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'mental',
        label: 'Resistência mental',
      },
    ],
    specialAbilities: [
      {
        id: 'firstborn-fey-lore',
        name: 'Sabedoria contra os Feéricos',
        originalName: 'Fey Insight',
        actionType: 'passive',
        description:
          '+2 de bônus de circunstância a Natureza para Recordar Conhecimento sobre feéricos. Édito adicional: confrontar feéricos cruéis (se houver chance razoável de sucesso).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=406',
  },
  {
    id: HERITAGE_DENY_NANBYO_YAKSHA_ID,
    ancestryId: ANCESTRY_YAKSHA_ID,
    name: 'Negar a Caridade de Lady Nanbyo',
    originalName: "Deny Lady Nanbyo's Charity",
    description:
      'Você jurou libertar outros de calamidades naturais. O voto dá força para carregar 1 Bulk a mais antes de ficar sobrecarregado e até 2 Bulk a mais no máximo, além de +1 de bônus de circunstância a Atletismo para Forçar Abertura ou Escapar. Édito adicional: fazer o máximo para ajudar ou resgatar quem estiver preso ou afetado por desastres naturais.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 78,
    rulesSummary:
      '+1 Bulk antes de sobrecarregado, +2 Bulk no máximo; +1 Atletismo para Forçar Abertura ou Escapar. Édito: resgatar vítimas de desastre.',
    specialAbilities: [
      {
        id: 'nanbyo-burden',
        name: 'Ombros do Voto',
        originalName: "Vow's Burden",
        actionType: 'passive',
        description:
          'Carrega 1 Bulk a mais antes de sobrecarregado e até 2 Bulk a mais no máximo. +1 de bônus de circunstância a Atletismo para Forçar Abertura ou Escapar. Édito adicional: ajudar ou resgatar afetados por desastres naturais.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=407',
  },
  {
    id: HERITAGE_DENY_TRAITOR_YAKSHA_ID,
    ancestryId: ANCESTRY_YAKSHA_ID,
    name: 'Negar o Renascimento do Traidor',
    originalName: "Deny the Traitor's Rebirth",
    description:
      'Você jurou livrar outros de rakshasas e asuras, que lendas yaksha condenam como parentes corrompidos. Para contrariar seus esquemas, o voto concede visão no escuro e +1 de bônus de circunstância a Percepção para Procurar ou Perceber Motivação de rakshasas e asuras. Édito adicional: confrontar rakshasas e asuras que encontrar (se houver chance razoável); um rakshasa ou asura benevolente não precisa ser confrontado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 78,
    rulesSummary:
      'Visão no escuro; +1 Percepção para Procurar/Perceber Motivação de rakshasas e asuras. Édito: confrontá-los.',
    senses: [
      {
        id: 'traitor-darkvision',
        kind: 'darkvision',
        name: 'Visão no Escuro',
        originalName: 'Darkvision',
        description:
          'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
      },
    ],
    specialAbilities: [
      {
        id: 'traitor-sense',
        name: 'Olho contra o Parente Falso',
        originalName: 'False-Kin Sense',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância a Percepção para Procurar ou Perceber Motivação de rakshasas e asuras. Édito adicional: confrontá-los se houver chance razoável (exceto os benevolentes).',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=408',
  },
  {
    id: HERITAGE_RESPITE_CLOUDLESS_YAKSHA_ID,
    ancestryId: ANCESTRY_YAKSHA_ID,
    name: 'Respiro dos Caminhos sem Nuvem',
    originalName: 'Respite of Cloudless Paths',
    description:
      'Você jurou proteger os extraviados e perdidos. Efeitos ambientais de calor e de frio são um grau menos extremos para você, e você recebe +1 de bônus de circunstância a salvaguardas contra feições ou perigos ambientais (enchentes, deslizamentos, tempestades de areia). Édito adicional: ajudar viajantes perdidos ou incapacitados.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 78,
    rulesSummary:
      'Calor e frio ambientais um grau menos extremos; +1 salvaguardas vs perigos ambientais. Édito: ajudar viajantes perdidos.',
    specialAbilities: [
      {
        id: 'cloudless-paths',
        name: 'Guardião da Estrada',
        originalName: 'Road Guardian',
        actionType: 'passive',
        description:
          'Calor e frio ambientais são um grau menos extremos. +1 de bônus de circunstância a salvaguardas contra feições ou perigos ambientais. Édito adicional: ajudar viajantes perdidos ou incapacitados.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=409',
  },
  {
    id: HERITAGE_RESPITE_LOAM_YAKSHA_ID,
    ancestryId: ANCESTRY_YAKSHA_ID,
    name: 'Respiro de Húmus e Folha',
    originalName: 'Respite of Loam and Leaf',
    description:
      'Você jurou preservar o alicerce do santuário: a grande terra e tudo que nela cresce. O voto concede o poder espiritual da terra: você ganha um truque da lista primal e o conjura como magia inata primal à vontade, elevado à metade do seu nível (arredondado para cima). Suas raízes no mundo concedem o traço planta. Édito adicional: curar ou remover praga e poluição das plantas e do solo que encontrar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 78,
    rulesSummary:
      '1 truque inato primal à vontade (metade do nível); traço planta. Édito: curar praga e poluição.',
    traits: ['Planta'],
    specialAbilities: [
      {
        id: 'loam-cantrip',
        name: 'Truque da Terra',
        originalName: 'Earth Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura um truque da lista primal como magia inata primal à vontade, elevado à metade do seu nível (arredondado para cima). Ganha o traço planta. Édito adicional: curar ou remover praga e poluição de plantas e solo.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=410',
  },
  {
    id: HERITAGE_RESPITE_ROOFS_YAKSHA_ID,
    ancestryId: ANCESTRY_YAKSHA_ID,
    name: 'Respiro de Mil Telhados',
    originalName: 'Respite of a Thousand Roofs',
    description:
      'Você jurou abrigar e alimentar os pobres. O voto dá jeito com carpintaria, panela e pano: você fica treinado em Ofício e em Conhecimento de Culinária e ganha o feito de perícia Improvisar Ferramenta. Édito adicional: ajudar os empobrecidos na medida do possível, consertando moradias e roupas ou alimentando-os.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 78,
    rulesSummary:
      'Treinado em Ofício e Conhecimento de Culinária; feito Improvisar Ferramenta. Édito: ajudar os pobres.',
    skillGrants: [{ id: 'roofs-crafting', skillId: 'crafting', rank: 'trained' }],
    featGrants: [
      {
        id: 'roofs-improvise-tool',
        featId: 'feat-improvise-tool',
        featName: 'Improvisar Ferramenta',
        originalName: 'Improvise Tool',
        featType: 'skill',
      },
    ],
    specialAbilities: [
      {
        id: 'roofs-cooking-lore',
        name: 'Conhecimento de Culinária',
        originalName: 'Cooking Lore',
        actionType: 'passive',
        description:
          'Treinado em Conhecimento de Culinária. Édito adicional: ajudar os empobrecidos consertando moradias e roupas ou alimentando-os.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=411',
  },
]
