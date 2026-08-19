import type { Heritage } from '@/types/ancestry'
import { SOURCE_ANCESTRY_GUIDE_ID, SOURCE_RAGE_OF_ELEMENTS_ID } from './sources'

/** Feitos compartilhados de qualquer geniekin (Olhos Elementais, armas de gênio…). */
export const HERITAGE_GENIEKIN_SHARED_ID = 'heritage-geniekin-shared'

export const HERITAGE_IFRIT_ID = 'heritage-ifrit'
export const HERITAGE_OREAD_ID = 'heritage-oread'
export const HERITAGE_SULI_ID = 'heritage-suli'
export const HERITAGE_SYLPH_ID = 'heritage-sylph'
export const HERITAGE_UNDINE_ID = 'heritage-undine'
export const HERITAGE_ARDANDE_ID = 'heritage-ardande'
export const HERITAGE_TALOS_ID = 'heritage-talos'

const LOW_LIGHT_VISION = {
  kind: 'lowLightVision' as const,
  name: 'Visão na Penumbra',
  originalName: 'Low-Light Vision',
  description:
    'Você enxerga na penumbra como se fosse luz intensa, ignorando a condição ocultado causada por penumbra.',
}

const GENIEKIN_FEATS: Heritage['specialAbilities'] = [
  {
    id: 'geniekin-shared-feats',
    name: 'Feitos Geniekin',
    originalName: 'Geniekin Feats',
    actionType: 'passive',
    description:
      'Ao ganhar um feito de ancestralidade, você pode escolher feitos desta herança, feitos geniekin compartilhados e feitos da sua ancestralidade.',
  },
]

/**
 * Geniekin — ciontes planares elementais.
 * Ardande e Talos: Rage of Elements (Remaster).
 * Ifrit, Oread, Suli, Sylph e Undine: Ancestry Guide (única fonte oficial;
 * nunca republicados no Remaster, mas continuam a opção vigente).
 */
export const ifritHeritage: Heritage = {
  id: HERITAGE_IFRIT_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Ifrit',
  originalName: 'Ifrit',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_ANCESTRY_GUIDE_ID,
  sourcePage: 101,
  traits: ['Ifrit', 'Geniekin'],
  grantedHeritageIds: [HERITAGE_GENIEKIN_SHARED_ID],
  description:
    'Ifrits descendem de criaturas como efritis, salamandras e dragões de magma. A faísca ancestral lhes dá fama de apaixonados — e caprichosos. Muitos constroem uma relação pessoal com o fogo: energia mutável, luz que ilumina ou natureza destrutiva.\n\nAlguns nascem ligados a um aspecto específico — radiância, cinza, lava — a linhagem ifrit. Costuma seguir a dos pais, mas pode surgir do lugar do nascimento (florestas propensas a incêndio geram almas de cinzas) ou do ancestral planar (um peri de fogo, um dragão de magma).\n\nPele vermelha, laranja ou latão é comum; outros têm cinza de carvão, branco radiante ou azul. O cabelo cai em espirais de chama. Descendentes de salamandra podem ter escamas; de efriti, chifres vermelhos enormes.\n\nVocê pode… ligar a identidade ao fogo elemental; manter-se em movimento, com medo de que parar apague o fogo interior; ter orgulho da linhagem, sobretudo se se vê parente dos maliks efritis.\n\nOutros provavelmente… procuram você como autoridade em magia de fogo; veem você como poço de paixão que nunca se apaga; assumem que você é impulsivo e age antes de pensar.\n\nVocê descende de elementais do fogo ou carrega a marca das Esferas Interiores. Você ganha o traço ifrit, além dos da sua ancestralidade. Você ganha resistência a fogo igual à metade do seu nível (mínimo 1) e trata efeitos ambientais de calor como um grau menos extremos. Ao ganhar um feito de ancestralidade, pode escolher feitos ifrit, geniekin e da sua ancestralidade.',
  rulesSummary:
    'Traço ifrit; resistência a fogo = metade do nível (mín. 1); calor ambiental um grau menos extremo; feitos ifrit e geniekin.',
  resistances: [
    {
      kind: 'halfLevelMin1',
      damageType: 'fire',
      label: 'Resistência a fogo',
    },
  ],
  specialAbilities: [
    {
      id: 'ifrit-heat',
      name: 'Calor Ancestral',
      originalName: 'Ancestral Heat',
      actionType: 'passive',
      description:
        'Você trata efeitos ambientais de calor como se fossem um grau menos extremos (calor incrível vira extremo, extremo vira severo, e assim por diante).',
    },
    ...GENIEKIN_FEATS!,
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=130',
}

export const oreadHeritage: Heritage = {
  id: HERITAGE_OREAD_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Oread',
  originalName: 'Oread',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_ANCESTRY_GUIDE_ID,
  sourcePage: 105,
  traits: ['Oread', 'Geniekin'],
  grantedHeritageIds: [HERITAGE_GENIEKIN_SHARED_ID],
  upgradeLowLightToDarkvision: true,
  description:
    'A influência do Plano da Terra corre na família oread, em geral de um shaitan ou dragão de cristal. Oreads tendem a ser estoicos, firmes e confiáveis, mas guardam profundezas que a superfície não mostra. Revelam o verdadeiro eu com calma — ou têm mistério bastante para mostrar uma faceta nova a cada dia.\n\nMuitos sentem que personificam um aspecto da terra: a tenacidade de um penhasco contra a erosão, a generosidade do solo fértil, o brilho de uma gema. Linhagens (poeira, gema, lodo) passam de pais a filhos ou surgem do lugar de nascimento.\n\nVocê pode… ser lento para se abrir, mas leal quando o faz; sentir-se estável quando os outros entram em pânico; colecionar pedras, cristais ou histórias tão antigas quanto montanhas.\n\nOutros provavelmente… apoiam-se na sua calma; acham você teimoso ou inflexível; procuram você para assuntos de pedra, minas ou o Plano da Terra.\n\nUm ancestral elemental da terra influenciou seu sangue. Você pode ter brilho cristalino ou metálico na pele ou no cabelo, carne rochosa ou olhos de gema. Você ganha o traço oread, além dos da sua ancestralidade. Você também ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos oread, geniekin e da sua ancestralidade.',
  rulesSummary:
    'Traço oread; visão na penumbra, ou visão no escuro se você já enxerga na penumbra; feitos oread e geniekin.',
  senses: [{ id: 'oread-low-light-vision', ...LOW_LIGHT_VISION }],
  specialAbilities: GENIEKIN_FEATS,
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=131',
}

export const suliHeritage: Heritage = {
  id: HERITAGE_SULI_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Suli',
  originalName: 'Suli',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_ANCESTRY_GUIDE_ID,
  sourcePage: 110,
  traits: ['Suli', 'Geniekin'],
  grantedHeritageIds: [HERITAGE_GENIEKIN_SHARED_ID],
  upgradeLowLightToDarkvision: true,
  description:
    'Sulis são geniekin que encarnam uma mistura de elementos — em geral ar, terra, fogo e água. Costumam ser descendentes de jann, gênios dos quatro elementos que vagueiam o Plano Material em vez de morar nos Planos Elementais.\n\nAo nascer, um suli se parece com a ancestralidade mortal; a herança desperta na adolescência. Fortes de corpo e vontade, são dinâmicos e mutáveis: uns sentem todos os elementos ao mesmo tempo; outros ciclam faces — uma para cada elemento — ao longo de dias ou semanas.\n\nVocê pode… ligar a identidade à mistura de elementos, com um lado para cada um; trabalhar para harmonizar e gerar entendimento; gabar-se das próprias conquistas e das da família ou aliados.\n\nOutros provavelmente… contam com suas habilidades elementais; acham que você descende de um janni, se reconhecem que é geniekin; assumem que o nexo de elementos opostos o torna instável ou diplomático demais.\n\nVocê descende de um janni ou encarna uma dicotomia de forças planares opostas. Você ganha o traço suli, além dos da sua ancestralidade. Você também ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos suli, geniekin e da sua ancestralidade.',
  rulesSummary:
    'Traço suli; visão na penumbra, ou visão no escuro se você já enxerga na penumbra; feitos suli e geniekin.',
  senses: [{ id: 'suli-low-light-vision', ...LOW_LIGHT_VISION }],
  specialAbilities: GENIEKIN_FEATS,
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=132',
}

export const sylphHeritage: Heritage = {
  id: HERITAGE_SYLPH_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Sylph',
  originalName: 'Sylph',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_ANCESTRY_GUIDE_ID,
  sourcePage: 114,
  traits: ['Sylph', 'Geniekin'],
  grantedHeritageIds: [HERITAGE_GENIEKIN_SHARED_ID],
  upgradeLowLightToDarkvision: true,
  description:
    'Sylphs são um povo intenso e vivo, volúvel e tempestuoso. Têm parentesco com seres do ar elemental: djinn, perseguidores invisíveis, dragões das nuvens. Gostam de seguir o próprio ritmo, oscilando entre energia selvagem que atrai todos os olhares e a brisa invisível que some sem deixar nota.\n\nMuitos constroem a identidade em torno do ar: brisa suave, relâmpago súbito, tempestade incontrolável. Linhagens (fumaça, tempestade, gás tóxico) passam dos pais ou surgem do lugar de nascimento — almas da tempestade em regiões de tornados; almas de fumaça, muitas vezes de belkers.\n\nVocê pode… ligar a identidade ao elemento ar; aparecer e desaparecer conforme o humor; sentir-se preso em espaços fechados ou sem vento.\n\nOutros provavelmente… acham você distraído ou imprevisível; pedem notícias e rumores, como se o vento os trouxesse; assumem que você voa ou controla o clima.\n\nVocê descende de elementais do ar ou nasceu sob a influência do elemento. Você ganha o traço sylph, além dos da sua ancestralidade. Você também ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos sylph, geniekin e da sua ancestralidade.',
  rulesSummary:
    'Traço sylph; visão na penumbra, ou visão no escuro se você já enxerga na penumbra; feitos sylph e geniekin.',
  senses: [{ id: 'sylph-low-light-vision', ...LOW_LIGHT_VISION }],
  specialAbilities: GENIEKIN_FEATS,
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=133',
}

export const undineHeritage: Heritage = {
  id: HERITAGE_UNDINE_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Undine',
  originalName: 'Undine',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_ANCESTRY_GUIDE_ID,
  sourcePage: 118,
  traits: ['Undine', 'Geniekin', 'Amphibious'],
  grantedHeritageIds: [HERITAGE_GENIEKIN_SHARED_ID],
  additionalSpeeds: { swim: 10 },
  description:
    'Esses mortais fluidos rastreiam a ancestralidade até criaturas do Plano da Água: marids, mephits da água, dragões de salmoura. Muitos passam a vida em fases que mudam — interesses que crescem, minguam ou se transformam. Estrutura dá foco; sem metas ou apoio, podem estagnar na desânimo.\n\nA maioria sente que personifica um aspecto da água: força das ondas, tenacidade da corrente, calma de um lago. Outros identificam-se com todos, o humor mudando como a maré. Linhagens (gelo, salmoura, névoa) passam dos pais ou vêm do clima — almas de gelo no norte ou nos picos.\n\nVocê pode… fluir de um interesse a outro; precisar de rotina ou de pessoas que o ancoram; sentir-se mais você mesmo na água ou sob chuva.\n\nOutros provavelmente… acham você instável ou difícil de acompanhar; pedem que você nade, mergulhe ou fale com o mar; assumem que você é frio ou emocional demais, conforme o dia.\n\nUm ancestral elemental da água influencia seu sangue. Você ganha o traço undine, além dos da sua ancestralidade. Você ganha deslocamento de natação de 10 pés e o traço anfíbio: respira água e ar. Ao ganhar um feito de ancestralidade, pode escolher feitos undine, geniekin e da sua ancestralidade.',
  rulesSummary:
    'Traço undine e anfíbio; natação 10 pés; respira água e ar; feitos undine e geniekin.',
  specialAbilities: [
    {
      id: 'undine-amphibious',
      name: 'Anfíbio',
      originalName: 'Amphibious',
      actionType: 'passive',
      description:
        'Você respira água e ar. Você ganha deslocamento de natação de 10 pés.',
    },
    ...GENIEKIN_FEATS!,
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=134',
}

export const ardandeHeritage: Heritage = {
  id: HERITAGE_ARDANDE_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Ardande',
  originalName: 'Ardande',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_RAGE_OF_ELEMENTS_ID,
  sourcePage: 47,
  traits: ['Ardande', 'Geniekin'],
  grantedHeritageIds: [HERITAGE_GENIEKIN_SHARED_ID],
  upgradeLowLightToDarkvision: true,
  description:
    'A força de um tronco de baobá e a flexibilidade do teixo, flores e frutos no dossel como joias, musgo macio, constelações diurnas de luz entre as folhas — disso são feitos os ardandes. São geniekin com madeira elemental na carne e seiva no lugar do sangue: tanta essência elemental quanto mortal. Descendem de elementais da madeira, kizidhars, dríades e dragões da floresta, ou nasceram sob forças ligadas ao Primeiro Mundo ou ao Plano da Madeira.\n\nLinhagens (âmbar, primavera, podridão) costumam seguir o pai ardande, mas podem ser novas. Às vezes refletem o lugar — almas da primavera na Floresta Grungir, almas da podridão no Fangwood do Darkblight — ou o ancestral (kizidhar → alma de âmbar).\n\nPele verde, marrom ou cinza de cinza; musgo, casca ou madeira nodosa. Cabelo de hera ou videiras floridas, barba de pétalas, cheiro de orvalho e chão de floresta.\n\nVocê pode… ligar a identidade à madeira e às plantas; expressar afeto com comida e hospitalidade; ter orgulho da conexão com o Plano da Madeira, antes perdido.\n\nOutros provavelmente… veem você como autoridade em plantas e no Plano da Madeira; tomam sua paciência como poço sem fundo; confundem você com ghoran ou dríade.\n\nVocê descende de elementais da madeira ou tem herança do Plano da Madeira. Pode ter pele musgosa, videiras no lugar do cabelo ou apêndices como gravetos. Você ganha o traço ardande, além dos da sua ancestralidade. Você também ganha visão na penumbra, ou visão no escuro se a ancestralidade já tiver visão na penumbra. Ao ganhar um feito de ancestralidade, pode escolher feitos ardande, geniekin e da sua ancestralidade.',
  rulesSummary:
    'Traço ardande; visão na penumbra, ou visão no escuro se você já enxerga na penumbra; feitos ardande e geniekin.',
  senses: [{ id: 'ardande-low-light-vision', ...LOW_LIGHT_VISION }],
  specialAbilities: GENIEKIN_FEATS,
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=232',
}

export const talosHeritage: Heritage = {
  id: HERITAGE_TALOS_ID,
  ancestryId: null,
  isVersatile: true,
  name: 'Talos',
  originalName: 'Talos',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_RAGE_OF_ELEMENTS_ID,
  sourcePage: 51,
  traits: ['Talos', 'Geniekin'],
  grantedHeritageIds: [HERITAGE_GENIEKIN_SHARED_ID],
  description:
    'Taloses, geniekin do Plano do Metal, ressoam com o potencial do minério cru, o brilho do ouro polido ou o tilintar de um martelo reforjando uma lâmina. Com o Plano do Metal retomando contato, sua influência nas linhagens cresce — não só em recém-nascidos: adultos com conexão latente podem despertar. Algumas linhagens ficaram em Golarion desde antes da retirada do plano, confundidas com oreads ou aforitas.\n\nLinhagens ligam-se a um aspecto: metais ferrosos, metais preciosos lustrosos, metais líquidos como mercúrio ou djezet. Encontram-se entre alquimistas, ferreiros, inventores e mineiros.\n\nA pele tem brilho metálico, do minério opaco ao polimento de lâmina nova; o desgaste aparece como pátina, ferrugem ou esmerilhamento. Cabelo como ouro fiado, aço enrolado, fiação de cobre ou correntes trançadas.\n\nVocê pode… sentir conexão forte com o metal elemental; gostar de forjar, consertar ou colecionar lâminas e joias; tratar o próprio corpo como algo que se reforja com o tempo.\n\nOutros provavelmente… pedem que você detecte minério ou conserte equipamento; acham sua pele fria ou “não natural”; confundem você com um construto ou com um oread.\n\nSeus traços refletem a influência de um zuhra ou outro elemental do metal. Você ganha o traço talos, além dos da sua ancestralidade. Você ganha resistência a eletricidade igual à metade do seu nível (mínimo 1). Você pode conjurar o truque Detectar Metal como magia arcana inata à vontade (elevado à metade do nível, arredondado para cima). Ao ganhar um feito de ancestralidade, pode escolher feitos talos, geniekin e da sua ancestralidade.',
  rulesSummary:
    'Traço talos; resistência a eletricidade = metade do nível (mín. 1); Detectar Metal (arcano inato) à vontade; feitos talos e geniekin.',
  resistances: [
    {
      kind: 'halfLevelMin1',
      damageType: 'electricity',
      label: 'Resistência a eletricidade',
    },
  ],
  specialAbilities: [
    {
      id: 'talos-detect-metal',
      name: 'Detectar Metal',
      originalName: 'Detect Metal',
      actionType: 'passive',
      description:
        'Você pode conjurar o truque Detectar Metal como magia arcana inata à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima).',
    },
    ...GENIEKIN_FEATS!,
  ],
  aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=233',
}

export const geniekinHeritages: Heritage[] = [
  ifritHeritage,
  oreadHeritage,
  suliHeritage,
  sylphHeritage,
  undineHeritage,
  ardandeHeritage,
  talosHeritage,
]
