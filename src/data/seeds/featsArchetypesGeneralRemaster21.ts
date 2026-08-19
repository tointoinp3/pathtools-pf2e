/** Gerais Remaster: Estilhaço Gélido, Blackjacket, Cavaleiro da Águia, Lâmina do Leão, Profeta de Kalistrade. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  SOURCE_PLAYER_CORE_ID,
  SOURCE_SHINING_KINGDOMS_ID,
  SOURCE_TREASURE_VAULT_ID,
} from './sources'

function f(opts: {
  id: string
  name: string
  originalName: string
  level: number
  archetypeId: string
  description: string
  prereqId?: string
  prereqName?: string
  extraPrereq?: Feat['prerequisites']
  effects?: Feat['effects']
  traits?: string[]
  actionType?: Feat['actionType']
  trigger?: string
  frequency?: string
  sourcePage?: number
  aonUrl: string
  sourceId?: string
  isDedication?: boolean
  repeatable?: boolean
  rarity?: Feat['rarity']
  ignoresDedicationLock?: boolean
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'archetype',
    archetypeId: opts.archetypeId,
    isDedication: opts.isDedication,
    traits: opts.traits ?? (opts.isDedication ? ['Arquétipo', 'Dedicação'] : ['Arquétipo']),
    rarity: opts.rarity ?? 'common',
    provenance: { type: 'official' },
    description: opts.description,
    effects: opts.effects,
    prerequisites: [
      ...(opts.prereqId
        ? [{ kind: 'feat' as const, featId: opts.prereqId, featName: opts.prereqName }]
        : []),
      ...(opts.extraPrereq ?? []),
    ],
    actionType: opts.actionType,
    trigger: opts.trigger,
    frequency: opts.frequency,
    repeatable: opts.repeatable,
    ignoresDedicationLock: opts.ignoresDedicationLock,
    sourceId: opts.sourceId ?? SOURCE_SHINING_KINGDOMS_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_GELID = {
  id: 'feat-gelid-shard-dedication',
  name: 'Dedicação do Estilhaço Gélido',
}
const DED_BLACK = {
  id: 'feat-blackjacket-dedication',
  name: 'Dedicação de Blackjacket',
}
const DED_EAGLE = {
  id: 'feat-eagle-knight-dedication',
  name: 'Dedicação de Cavaleiro da Águia',
}
const DED_LION = {
  id: 'feat-lion-blade-dedication',
  name: 'Dedicação de Lâmina do Leão',
}
const DED_PROP = {
  id: 'feat-prophet-kalistrade-dedication',
  name: 'Dedicação de Profeta de Kalistrade',
}

const GELID_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-gelid-shard-archetype',
  label: 'Conjuração de Estilhaço Gélido',
  style: 'spontaneous',
  tradition: 'arcane',
  attributeId: 'charisma',
  proficiencyRank: 'trained',
  cantripsPerDay: 2,
  classOriginalName: 'Gelid Shard',
  features: { repertoire: true },
}

const PROPHET_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-prophet-kalistrade-archetype',
  label: 'Conjuração de Profeta de Kalistrade',
  style: 'spontaneous',
  tradition: 'occult',
  attributeId: 'charisma',
  proficiencyRank: 'trained',
  cantripsPerDay: 3,
  classOriginalName: 'Prophet of Kalistrade',
  features: { repertoire: true },
}

const REACTIVE_STRIKE = {
  kind: 'specialAbility' as const,
  name: 'Golpe Reativo',
  actionType: 'reaction' as const,
  description:
    'Gatilho: uma criatura no seu alcance usa manipular ou movimento, faz um ataque à distância, ou sai de um quadrado durante um movimento. Golpe corpo a corpo contra a criatura. Crítico + gatilho de manipular: interrompe a ação. Este Golpe não conta para a penalidade de ataque múltiplo, e a penalidade não se aplica a ele.',
}

const gelidShardArchetypeFeats: Feat[] = [
  f({
    id: DED_GELID.id,
    name: DED_GELID.name,
    originalName: 'Gelid Shard Dedication',
    level: 2,
    archetypeId: 'archetype-gelid-shard',
    isDedication: true,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Possuir e investir um estilhaço gélido (artefato vinculado cravado no coração)',
      },
    ],
    description:
      'Arquétipo de item: o estilhaço gélido cravado no coração concede a Dedicação. Resistência a frio igual ao nível. +2 de status em salvaguardas contra emoção. Bônus de efeitos de emoção caem em 1 (mínimo 0; no 10º nível, caem em 2). CD de Causar Impressão, Pedir favor ou Ajudar nessas tentativas aumenta em 2. A conjuração vem em Primeira Geada, não nesta Dedicação.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Coração congelado',
        description:
          'Resistência a frio igual ao nível. +2 de status em salvaguardas contra emoção. Bônus de efeitos de emoção reduzidos em 1 (mínimo 0; −2 no 10º nível). +2 na CD para Causar Impressão, Pedir favor ou Ajudar nessas tentativas.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=201',
  }),
  f({
    id: 'feat-gelid-shard-first-frost',
    name: 'Primeira Geada',
    originalName: 'First Frost',
    level: 2,
    archetypeId: 'archetype-gelid-shard',
    prereqId: DED_GELID.id,
    prereqName: DED_GELID.name,
    description:
      'Conjuração espontânea arcana (Conjurar uma Magia). Repertório com os truques Geada (frostbite) e Toque de Geada (frost’s touch). Treinado em ataque e CD de magia. Atributo-chave: Carisma. Os dois truques são os do livro; o motor não escolhe outros.',
    effects: [
      { kind: 'spellcasting', access: GELID_SPELL },
      {
        kind: 'specialAbility',
        name: 'Truques Geada e Toque de Geada',
        description:
          'O repertório começa com frostbite e frost’s touch. Você não escolhe outros truques neste feito.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4096',
  }),
  f({
    id: 'feat-gelid-shard-snowcaster',
    name: 'Conjurador da Neve',
    originalName: 'Snowcaster',
    level: 4,
    archetypeId: 'archetype-gelid-shard',
    prereqId: 'feat-gelid-shard-first-frost',
    prereqName: 'Primeira Geada',
    description:
      'Benefícios de conjuração básica. Sempre que ganhar espaço de um posto novo deste arquétipo, adicione ao repertório uma magia arcana comum com o traço frio daquele posto (incluindo versões elevadas) ou outra magia de frio a que tenha acesso. Você escolhe cada magia; o motor não escolhe.',
    effects: [{ kind: 'spellcastingTier', sourceId: GELID_SPELL.id, tier: 'basic' }],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4097',
  }),
  f({
    id: 'feat-gelid-shard-snow-step',
    name: 'Passo na Neve',
    originalName: 'Snow Step',
    level: 6,
    archetypeId: 'archetype-gelid-shard',
    prereqId: DED_GELID.id,
    prereqName: DED_GELID.name,
    description:
      'Ignora terreno difícil de neve e gelo. Trata terreno difícil maior de neve e gelo como terreno difícil. Não deixa rastros ao se mover por neve ou gelo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Passo na neve',
        description:
          'Ignora terreno difícil de neve/gelo; terreno difícil maior vira difícil; sem rastros na neve ou gelo.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4098',
  }),
  f({
    id: 'feat-gelid-shard-frozen-breadth',
    name: 'Amplitude Congelada',
    originalName: 'Frozen Breadth',
    level: 8,
    archetypeId: 'archetype-gelid-shard',
    prereqId: 'feat-gelid-shard-snowcaster',
    prereqName: 'Conjurador da Neve',
    description:
      'Aumenta em 1 o número de magias no repertório e de espaços deste arquétipo em cada posto, exceto os dois postos mais altos de Estilhaço Gélido.',
    effects: [{ kind: 'spellSlotBreadth', sourceId: GELID_SPELL.id }],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4099',
  }),
  f({
    id: 'feat-gelid-shard-winters-embrace',
    name: 'Abraço do Inverno',
    originalName: "Winter's Embrace",
    level: 10,
    archetypeId: 'archetype-gelid-shard',
    prereqId: DED_GELID.id,
    prereqName: DED_GELID.name,
    description:
      '+1 de status em salvaguardas contra efeitos que causam ofuscado. Neve não prejudica a visão: ignora ocultação de queda de neve. Protegido contra frio e calor severos. A pele fica fria ao toque, às vezes com geada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Abraço do inverno',
        description:
          '+1 de status contra ofuscado. Ignora ocultação de queda de neve. Protegido contra frio e calor severos.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4100',
  }),
  f({
    id: 'feat-gelid-shard-expert-snowcasting',
    name: 'Conjuração Perita da Neve',
    originalName: 'Expert Snowcasting',
    level: 12,
    archetypeId: 'archetype-gelid-shard',
    prereqId: 'feat-gelid-shard-snowcaster',
    prereqName: 'Conjurador da Neve',
    description: 'Benefícios de conjuração perita deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: GELID_SPELL.id, tier: 'expert' }],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4101',
  }),
  f({
    id: 'feat-gelid-shard-winters-kiss',
    name: 'Beijo do Inverno',
    originalName: "Winter's Kiss",
    level: 14,
    archetypeId: 'archetype-gelid-shard',
    prereqId: DED_GELID.id,
    prereqName: DED_GELID.name,
    description:
      'Protegido contra frio e calor extremos. Resistência a fogo igual à metade do nível. Se já tiver resistência a fogo igual à metade do nível por herança, feito de ancestralidade, classe ou outro arquétipo, a resistência a fogo passa a ser igual ao nível.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência a fogo (metade do nível)',
        description:
          'Protegido contra frio e calor extremos. Resistência a fogo = metade do nível (ou igual ao nível se já tinha metade por herança/ancestralidade/classe/outro arquétipo).',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4102',
  }),
  f({
    id: 'feat-gelid-shard-greater-snow-step',
    name: 'Passo na Neve Maior',
    originalName: 'Greater Snow Step',
    level: 16,
    archetypeId: 'archetype-gelid-shard',
    prereqId: 'feat-gelid-shard-snow-step',
    prereqName: 'Passo na Neve',
    description:
      'Não pode ser impedido por efeitos ambientais que dependam de frio ou seus subprodutos. Ignora terreno difícil maior causado por neve e gelo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Passo na neve maior',
        description:
          'Ignora terreno difícil maior de neve e gelo. Efeitos ambientais de frio não o impedem.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4103',
  }),
  f({
    id: 'feat-gelid-shard-master-snowcasting',
    name: 'Conjuração Mestra da Neve',
    originalName: 'Master Snowcasting',
    level: 18,
    archetypeId: 'archetype-gelid-shard',
    prereqId: 'feat-gelid-shard-expert-snowcasting',
    prereqName: 'Conjuração Perita da Neve',
    description: 'Benefícios de conjuração mestra deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: GELID_SPELL.id, tier: 'master' }],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4104',
  }),
  f({
    id: 'feat-gelid-shard-icy-apotheosis',
    name: 'Apoteose Gélida',
    originalName: 'Icy Apotheosis',
    level: 20,
    archetypeId: 'archetype-gelid-shard',
    prereqId: DED_GELID.id,
    prereqName: DED_GELID.name,
    description:
      'Imune a dano de frio e ganha o traço frio. Sucesso automático em salvaguardas contra efeitos com o traço frio.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Apoteose gélida',
        description:
          'Imunidade a frio, traço frio, sucesso automático em salvaguardas contra efeitos de frio.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4105',
  }),
]

const blackjacketArchetypeFeats: Feat[] = [
  f({
    id: DED_BLACK.id,
    name: DED_BLACK.name,
    originalName: 'Blackjacket Dedication',
    level: 2,
    archetypeId: 'archetype-blackjacket',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'text', label: 'Treinado em armadura média e armas marciais; acesso: Druma' },
    ],
    description:
      'Treinado em Intimidação (perito se já for treinado). Conhecimento Adicional de Guerra (sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à sua escolha — nomeie na ficha). Enquanto usa armadura média ou pesada, +1 de circunstância em Intimidação.',
    effects: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'trained', bumpIfAlready: true },
      { kind: 'lore', loreName: 'Guerra', rank: 'trained' },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Intimidação enquanto usa armadura média ou pesada',
      },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Guerra)',
        description:
          'Guerra sobe sozinha nos níveis 3, 7 e 15. Se já era treinado em Guerra, também fica treinado em outro Conhecimento à sua escolha (nomeie na ficha; o motor não escolhe).',
      },
    ],
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7689',
  }),
  f({
    id: 'feat-blackjacket-belay-that',
    name: 'Cancelem Isso!',
    originalName: 'Belay That!',
    level: 4,
    archetypeId: 'archetype-blackjacket',
    traits: ['Arquétipo', 'Auditivo'],
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    description:
      'O próximo Golpe do aliado disparador até o fim do turno dele usa a mesma penalidade de ataque múltiplo do Golpe que falhou criticamente, mas conta para a penalidade como normal.',
    actionType: 'reaction',
    trigger: 'Um aliado a 9 m falha criticamente em um Golpe.',
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7690',
  }),
  f({
    id: 'feat-blackjacket-intimidating-strike',
    name: 'Golpe Intimidante',
    originalName: 'Intimidating Strike',
    level: 4,
    archetypeId: 'archetype-blackjacket',
    traits: ['Arquétipo', 'Emoção', 'Medo', 'Mental'],
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro/bárbaro' }],
    description:
      'Golpe corpo a corpo. Se acertar e causar dano, o alvo fica amedrontado 1 (amedrontado 2 no crítico).',
    actionType: 'two',
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=316',
  }),
  f({
    id: 'feat-blackjacket-mercenary-motivation',
    name: 'Motivação Mercenária',
    originalName: 'Mercenary Motivation',
    level: 4,
    archetypeId: 'archetype-blackjacket',
    traits: ['Arquétipo', 'Concentração', 'Exploração'],
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    description:
      '1 minuto planejando um curso de ação para uma tarefa contratada (proteger, derrotar, recuperar — você nomeia; o motor não escolhe). Só um plano ativo. Em testes de Percepção ou perícia que avancem o plano (o MJ decide quais), +1 de circunstância. Ao completar, o bônus permanece até você planejar outro ou Dispensar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Curso de ação mercenário',
        description:
          'Nomeie o plano na ficha (proteger, derrotar, recuperar ou outro combinado com o MJ). +1 de circunstância em Percepção e perícias que avancem esse plano. Só um plano por vez. O motor não escolhe o curso.',
      },
    ],
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7691',
  }),
  f({
    id: 'feat-blackjacket-battlefield-agility',
    name: 'Agilidade no Campo de Batalha',
    originalName: 'Battlefield Agility',
    level: 6,
    archetypeId: 'archetype-blackjacket',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    extraPrereq: [{ kind: 'text', label: 'Você está flanqueado' }],
    description:
      'Golpe corpo a corpo contra um dos inimigos que o flanqueiam e Passo, em qualquer ordem.',
    actionType: 'one',
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7692',
  }),
  f({
    id: 'feat-blackjacket-reactive-striker',
    name: 'Atacante Reativo',
    originalName: 'Reactive Striker',
    level: 6,
    archetypeId: 'archetype-blackjacket',
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description: 'Ganha a reação Golpe Reativo.',
    effects: [REACTIVE_STRIKE],
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=316',
  }),
  f({
    id: 'feat-blackjacket-lead-by-example',
    name: 'Liderar pelo Exemplo',
    originalName: 'Lead by Example',
    level: 8,
    archetypeId: 'archetype-blackjacket',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    description:
      'Golpe corpo a corpo ou à distância com −2 de circunstância. Acerto: o próximo aliado a mirar a mesma criatura com um Golpe ganha +2 de circunstância no ataque. Crítico: o bônus vale para qualquer aliado que agir antes do início do seu próximo turno.',
    actionType: 'one',
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7693',
  }),
  f({
    id: 'feat-blackjacket-nothing-personal',
    name: 'Nada Pessoal',
    originalName: 'Nothing Personal',
    level: 8,
    archetypeId: 'archetype-blackjacket',
    prereqId: 'feat-blackjacket-mercenary-motivation',
    prereqName: 'Motivação Mercenária',
    description:
      'Designe uma criatura visível como impedimento do seu plano ativo. O primeiro Golpe contra ela em cada rodada causa 1 dado extra de dano da arma (2 dados no 14º, 3 no 20º). Só um impedimento por vez; nova designação substitui a anterior. Dura 1 hora.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Impedimento',
        actionType: 'one',
        description:
          'Você escolhe a criatura. 1 dado extra no primeiro Golpe por rodada (2 no 14º, 3 no 20º). O motor não escolhe o alvo.',
      },
    ],
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7694',
  }),
  f({
    id: 'feat-blackjacket-shatter-defenses',
    name: 'Quebrar Defesas',
    originalName: 'Shatter Defenses',
    level: 8,
    archetypeId: 'archetype-blackjacket',
    traits: ['Arquétipo', 'Pressão'],
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro; alvo amedrontado' }],
    description:
      'Golpe corpo a corpo contra criatura amedrontada. Se acertar e causar dano, o alvo fica desprevenido até o amedrontado acabar. Se já estava desprevenido contra você, não pode reduzir o amedrontado abaixo de 1 até o início do seu próximo turno.',
    actionType: 'one',
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=316',
  }),
  f({
    id: 'feat-blackjacket-close-contract',
    name: 'Fechar Contrato',
    originalName: 'Close Contract',
    level: 10,
    archetypeId: 'archetype-blackjacket',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: 'feat-blackjacket-mercenary-motivation',
    prereqName: 'Motivação Mercenária',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Você completou o curso de ação ativo e ainda não o Dispensou nem escolheu outro',
      },
    ],
    description:
      'Dispensa o plano atual e ganha 15 PV temporários (1 hora). +5 PV temporários no 12º nível e a cada 2 níveis seguintes.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Contrato fechado',
        actionType: 'one',
        description:
          '15 PV temporários por 1 hora (+5 no 12º e a cada 2 níveis). Dispensa o plano ativo.',
      },
    ],
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7695',
  }),
  f({
    id: 'feat-blackjacket-opportune-opening',
    name: 'Abertura Oportuna',
    originalName: 'Opportune Opening',
    level: 10,
    archetypeId: 'archetype-blackjacket',
    prereqId: DED_BLACK.id,
    prereqName: DED_BLACK.name,
    description:
      'Golpe corpo a corpo contra a mesma criatura. Ela está desprevenida contra este Golpe.',
    actionType: 'reaction',
    trigger: 'Um aliado acerta um crítico em uma criatura no seu alcance corpo a corpo.',
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7696',
  }),
]

const eagleKnightArchetypeFeats: Feat[] = [
  f({
    id: DED_EAGLE.id,
    name: DED_EAGLE.name,
    originalName: 'Eagle Knight Dedication',
    level: 2,
    archetypeId: 'archetype-eagle-knight',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'diplomacy', rank: 'trained' },
      { kind: 'skillRank', skillId: 'society', rank: 'trained' },
      {
        kind: 'text',
        label:
          'Treinado em Diplomacia e Sociedade; acesso: convite de Cavaleiro da Águia ou do Conselho do Povo',
      },
    ],
    description:
      'Na primeira rodada, se rolar Diplomacia na iniciativa, criaturas que ainda não agiram estão desprevenidas contra você. Conhecimento Adicional de Política (sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à sua escolha — nomeie na ficha). Pode usar Política para Causar Impressão, Pedir ou Recolher Informações sobre oficiais. Sucesso crítico em Recolher Informações com Política: você já sabe, sem gastar tempo.',
    effects: [
      { kind: 'lore', loreName: 'Política', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Iniciativa diplomática',
        description:
          'Na primeira rodada, se a iniciativa foi Diplomacia, criaturas que ainda não agiram estão desprevenidas contra você.',
      },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Política)',
        description:
          'Política sobe sozinha nos níveis 3, 7 e 15. Se já era treinado, também outro Conhecimento à sua escolha (nomeie; o motor não escolhe). Use Política para Causar Impressão, Pedir ou Recolher Informações sobre oficiais. Crítico em Recolher Informações: sabe de imediato.',
      },
    ],
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7666',
  }),
  f({
    id: 'feat-eagle-knight-commitment-to-equality',
    name: 'Compromisso com a Igualdade',
    originalName: 'Commitment to Equality',
    level: 4,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Auditivo', 'Mental', 'Perícia'],
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    description:
      'Aliado a 9 m: tente reduzir amedrontado ou estupefato (você escolhe se houver os dois). Mestre em Diplomacia: também desajeitado e enfraquecido. Lendário: também atordoado (não se a duração for tempo em vez de valor). Teste de Diplomacia contra a CD de salvaguarda do efeito (ou CD difícil do nível da fonte). Artefato ou efeito acima do 20º: só se for lendário, e a CD sobe 10. Não trata maldição, doença ou estado natural. O alvo fica imune por 1 hora. Crítico: −2 no valor. Sucesso: −1. Falha crítica: +1.',
    actionType: 'two',
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7667',
  }),
  f({
    id: 'feat-eagle-knight-interpose',
    name: 'Interpor',
    originalName: 'Interpose',
    level: 4,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    description:
      'Avance até o Deslocamento, terminando adjacente a um aliado. Vocês trocam de posição. Depois pode fazer um Golpe corpo a corpo contra um inimigo no alcance.',
    actionType: 'two',
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7668',
  }),
  f({
    id: 'feat-eagle-knight-quick-draw',
    name: 'Saque Rápido',
    originalName: 'Quick Draw',
    level: 4,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino/patrulheiro' }],
    description: 'Interaja para sacar uma arma e então Golpeie com ela.',
    actionType: 'one',
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=314',
  }),
  f({
    id: 'feat-eagle-knight-commitment-to-justice',
    name: 'Compromisso com a Justiça',
    originalName: 'Commitment to Justice',
    level: 6,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Você viu uma criatura matar ou reduzir um aliado a 0 PV desde o seu último turno',
      },
    ],
    description:
      'Golpe contra a criatura exigida. Se acertar, +circunstância no dano igual a três vezes o número de dados de dano da arma.',
    actionType: 'one',
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7669',
  }),
  f({
    id: 'feat-eagle-knight-commitment-to-liberty',
    name: 'Compromisso com a Liberdade',
    originalName: 'Commitment to Liberty',
    level: 6,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [{ kind: 'text', label: 'Uma criatura tem um aliado agarrado ou restringido' }],
    description:
      'Golpe contra a criatura exigida. Se acertar, o aliado agarrado ou restringido pode Escapar como ação livre. Crítico: o aliado ganha +2 de circunstância nessa tentativa.',
    actionType: 'two',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7670',
  }),
  f({
    id: 'feat-eagle-knight-bolster-ally',
    name: 'Fortalecer Aliado',
    originalName: 'Bolster Ally',
    level: 8,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Auditivo'],
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    description:
      'O aliado pode usar o seu modificador de salvaguarda no lugar do dele contra a magia ou habilidade disparadora.',
    actionType: 'reaction',
    frequency: '1/10 minutos',
    trigger:
      'Um aliado a 9 m é alvo de magia ou habilidade que permite salvaguarda.',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7671',
  }),
  f({
    id: 'feat-eagle-knight-reactive-striker',
    name: 'Atacante Reativo',
    originalName: 'Reactive Striker',
    level: 8,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description: 'Ganha a reação Golpe Reativo.',
    effects: [REACTIVE_STRIKE],
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=314',
  }),
  f({
    id: 'feat-eagle-knight-blind-fight',
    name: 'Combate às Cegas',
    originalName: 'Blind-Fight',
    level: 10,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [
      { kind: 'text', label: 'Mestre em Percepção; feito adicional de guerreiro/investigador/patrulheiro/ladino' },
    ],
    description:
      'Não precisa de teste simples para mirar criaturas ocultas. Não fica desprevenido contra ocultas (salvo por outro motivo) e só precisa de CD 5 simples para mirá-las. Adjacente a uma não detectada do seu nível ou menor: ela fica apenas oculta para você.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Combate às cegas',
        description:
          'Sem teste simples contra ocultas. Não desprevenido por ocultas. CD 5 para mirar ocultas. Não detectada adjacente (nível ≤ o seu) vira oculta.',
      },
    ],
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=314',
  }),
  f({
    id: 'feat-eagle-knight-hazard-finder',
    name: 'Localizador de Perigos',
    originalName: 'Hazard Finder',
    level: 10,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de patrulheiro' }],
    description:
      '+1 de circunstância em Percepção para achar armadilhas e perigos, na CA contra os ataques deles e nas salvaguardas contra os efeitos. Pode achar perigos que normalmente exigem Buscar mesmo sem estar Buscando.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Percepção para achar armadilhas/perigos; CA e salvaguardas contra eles',
      },
      {
        kind: 'specialAbility',
        name: 'Localizador de perigos',
        description: 'Acha perigos que exigiriam Buscar mesmo sem Buscar.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 161,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4884',
  }),
  f({
    id: 'feat-eagle-knight-stir-allies',
    name: 'Agitar Aliados',
    originalName: 'Stir Allies',
    level: 10,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Auditivo', 'Ímpeto'],
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    description:
      'Aliados a 9 m podem usar uma reação para Passo. Se você for lendário em Diplomacia, podem Avançar no lugar.',
    actionType: 'two',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7672',
  }),
  f({
    id: 'feat-eagle-knight-aura-of-confidence',
    name: 'Aura de Confiança',
    originalName: 'Aura of Confidence',
    level: 12,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    description:
      'Resistência a dano mental igual à metade do nível. Você e aliados a 4,5 m ganham +2 de status em salvaguardas contra efeitos mentais.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência mental (metade do nível)',
        description: 'Resistência a dano mental igual à metade do nível.',
      },
      {
        kind: 'specialAbility',
        name: 'Aura de confiança (4,5 m)',
        description:
          'Você e aliados a 4,5 m: +2 de status em salvaguardas contra efeitos mentais.',
      },
    ],
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7673',
  }),
  f({
    id: 'feat-eagle-knight-tactical-reflexes',
    name: 'Reflexos Táticos',
    originalName: 'Tactical Reflexes',
    level: 12,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro; Golpe Reativo' }],
    description:
      'No início de cada turno, ao recuperar ações, ganha uma reação extra só para Golpe Reativo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Reação extra (Golpe Reativo)',
        description:
          'No início do turno, uma reação adicional que só pode ser usada para Golpe Reativo.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4830',
  }),
  f({
    id: 'feat-eagle-knight-talmandors-shout',
    name: 'Grito de Talmandor',
    originalName: "Talmandor's Shout",
    level: 12,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'master' },
      {
        kind: 'text',
        label:
          'Mestre em Intimidação; você viu uma criatura causar dano a um aliado a 9 m desde o seu último turno',
      },
    ],
    description:
      'Teste de Intimidação para Desmoralizar, comparando o resultado à CD de Vontade de cada inimigo numa emanação de 18 m. Sem penalidade por não compartilhar idioma. Graus de sucesso podem diferir por alvo.',
    actionType: 'two',
    frequency: '1/dia',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7674',
  }),
  f({
    id: 'feat-eagle-knight-even-the-odds',
    name: 'Equilibrar as Chances',
    originalName: 'Even the Odds',
    level: 14,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: 'feat-eagle-knight-commitment-to-equality',
    prereqName: 'Compromisso com a Igualdade',
    description:
      'Se a próxima ação for Compromisso com a Igualdade, role o teste de Diplomacia duas vezes e use o maior. Se tiver sucesso, o alvo também ganha 25 PV temporários por 1 minuto.',
    actionType: 'free',
    frequency: '1/dia',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7675',
  }),
  f({
    id: 'feat-eagle-knight-immediate-rebuke',
    name: 'Repreensão Imediata',
    originalName: 'Immediate Rebuke',
    level: 14,
    archetypeId: 'archetype-eagle-knight',
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [{ kind: 'text', label: 'Golpe Reativo' }],
    description:
      'Pode usar Golpe Reativo quando uma criatura no seu alcance Golpeia um aliado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Repreensão imediata',
        description:
          'Golpe Reativo também dispara quando uma criatura no alcance Golpeia um aliado.',
      },
    ],
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7676',
  }),
  f({
    id: 'feat-eagle-knight-determination',
    name: 'Determinação',
    originalName: 'Determination',
    level: 16,
    archetypeId: 'archetype-eagle-knight',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_EAGLE.id,
    prereqName: DED_EAGLE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description:
      'Escolha uma condição não permanente, magia ou efeito mágico que o afeta. Condição: o efeito em você acaba. Magia/efeito: tente contrapor (posto = metade do nível, arredondado para cima; salvaguarda de Vontade como teste). Não remove PV já perdidos; só afeta você. Não remove aflição contínua nem condições automáticas de situação (caído, flanqueado). Você escolhe o efeito; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=314',
  }),
]

const lionBladeArchetypeFeats: Feat[] = [
  f({
    id: DED_LION.id,
    name: DED_LION.name,
    originalName: 'Lion Blade Dedication',
    level: 2,
    archetypeId: 'archetype-lion-blade',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'performance', rank: 'trained' },
      {
        kind: 'text',
        label: 'Membro das Lâminas do Leão; treinado em Performance; acesso: Taldor',
      },
    ],
    description:
      'Treinado em Enganação ou Furtividade (perito se já for treinado na escolhida). Conhecimento Adicional de Espionagem (sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à sua escolha — nomeie na ficha). Sem penalidade de circunstância por disfarce de ancestralidade, idade etc., desde que o tamanho seja adequado. Você escolhe a perícia; o motor não escolhe.',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'lion-blade-skill',
        rank: 'trained',
        skillOptions: ['deception', 'stealth'],
        bumpIfAlready: true,
        hint: 'Enganação ou Furtividade. Se já for treinado, fica perito. O motor não escolhe.',
      },
      { kind: 'lore', loreName: 'Espionagem', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Espionagem)',
        description:
          'Espionagem sobe sozinha nos níveis 3, 7 e 15. Se já era treinado, também outro Conhecimento à sua escolha (nomeie; o motor não escolhe).',
      },
      {
        kind: 'specialAbility',
        name: 'Disfarce sem penalidade de circunstância',
        description:
          'Sem penalidade de circunstância por disfarce de outra ancestralidade, idade etc., se o tamanho for adequado.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7724',
  }),
  f({
    id: 'feat-lion-blade-focused-fascination',
    name: 'Fascínio Focado',
    originalName: 'Focused Fascination',
    level: 4,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    extraPrereq: [
      { kind: 'text', label: 'Performance Fascinante; feito adicional de espadachim' },
    ],
    description:
      'Em combate, Performance Fascinante só precisa de sucesso (não crítico) para fascinar, e somente se mirar um único alvo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fascínio focado',
        description:
          'Um alvo em combate: sucesso em Performance Fascinante já fascina (não precisa de crítico).',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=319',
  }),
  f({
    id: 'feat-lion-blade-inspiring-recitation',
    name: 'Recitação Inspiradora',
    originalName: 'Inspiring Recitation',
    level: 4,
    archetypeId: 'archetype-lion-blade',
    traits: ['Arquétipo', 'Concentração', 'Emoção', 'Mental'],
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    description:
      '+1 de status em uma perícia à sua escolha até o início do seu próximo turno (você escolhe a perícia a cada uso; o motor não escolhe). Pode Sustentar até 1 minuto. Perito em Performance: +2. Mestre: +3. Lendário: +4.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Recitação inspiradora',
        actionType: 'one',
        description:
          'A cada uso, escolha uma perícia. +1 de status (+2 perito / +3 mestre / +4 lendário em Performance). Sustentar até 1 minuto. O motor não escolhe a perícia.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7725',
  }),
  f({
    id: 'feat-lion-blade-lost-in-the-crowd',
    name: 'Perdido na Multidão',
    originalName: 'Lost in the Crowd',
    level: 4,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    description:
      'Move-se em velocidade total em multidões. Pode usar cobertura de multidões para Furtar-se e Esgueirar-se: +2 de circunstância em Furtividade numa multidão de ao menos 10 criaturas, +4 se ao menos 100.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Perdido na multidão',
        description:
          'Velocidade total em multidões. +2 de circunstância em Furtividade (10+ criaturas) ou +4 (100+).',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7726',
  }),
  f({
    id: 'feat-lion-blade-sneak-attacker',
    name: 'Atacante Furtivo',
    originalName: 'Sneak Attacker',
    level: 4,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description:
      'Ganha Ataque Furtivo, mas causa 1d4 (1d6 no 6º nível). Os dados não aumentam com o nível além disso.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ataque Furtivo',
        description:
          '1d4 de precisão extra contra desprevenido ou flanqueado com arma ágil/acerto ou desarmado ágil (1d6 no 6º). Sem dados extras além disso.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=319',
  }),
  f({
    id: 'feat-lion-blade-crowd-mastery',
    name: 'Maestria na Multidão',
    originalName: 'Crowd Mastery',
    level: 6,
    archetypeId: 'archetype-lion-blade',
    prereqId: 'feat-lion-blade-lost-in-the-crowd',
    prereqName: 'Perdido na Multidão',
    description:
      'Ao determinar se o inimigo está flanqueado, trate quadrados ocupados por uma multidão como se fossem de um aliado com alcance corpo a corpo de 1,5 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Maestria na multidão',
        description:
          'Quadrados de multidão contam como aliado com alcance 1,5 m para flanquear.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7727',
  }),
  f({
    id: 'feat-lion-blade-expeditious-advance',
    name: 'Avanço Expedito',
    originalName: 'Expeditious Advance',
    level: 6,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    extraPrereq: [{ kind: 'text', label: 'Sem armadura ou usando armadura leve' }],
    description:
      '+10 pés de status no Deslocamento enquanto estiver sem armadura ou de armadura leve.',
    effects: [
      {
        kind: 'specialAbility',
        name: '+10 de status no Deslocamento (sem armadura ou leve)',
        description:
          '+10 pés de status no Speed se estiver sem armadura ou de armadura leve. Não se aplica de média ou pesada.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7728',
  }),
  f({
    id: 'feat-lion-blade-ongoing-investigation',
    name: 'Investigação Contínua',
    originalName: 'Ongoing Investigation',
    level: 6,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de investigador' }],
    description:
      'Move-se em velocidade total ao Investigar (exploração) e pode usar outra atividade de exploração ao mesmo tempo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Investigação contínua',
        description:
          'Velocidade total ao Investigar; pode combinar com outra atividade de exploração.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=319',
  }),
  f({
    id: 'feat-lion-blade-interposing-crowd',
    name: 'Multidão Interposta',
    originalName: 'Interposing Crowd',
    level: 8,
    archetypeId: 'archetype-lion-blade',
    prereqId: 'feat-lion-blade-lost-in-the-crowd',
    prereqName: 'Perdido na Multidão',
    description:
      'Ações de movimento não disparam reações enquanto você permanecer numa multidão durante toda a ação.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Multidão interposta',
        description:
          'Movimento não dispara reações se você ficar na multidão o tempo todo da ação.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7729',
  }),
  f({
    id: 'feat-lion-blade-lions-magic',
    name: 'Magia do Leão',
    originalName: "Lion's Magic",
    level: 8,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    description:
      'Sugestão de 4º posto como magia inata oculta 1/dia. No 12º nível, também sugestão subconsciente de 5º posto 1/dia.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magia do leão',
        description:
          'Sugestão 4º inata oculta 1/dia. No 12º: também sugestão subconsciente 5º 1/dia.',
      },
    ],
    sourcePage: 170,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7730',
  }),
  f({
    id: 'feat-lion-blade-spys-countermeasures',
    name: 'Contramedidas do Espião',
    originalName: "Spy's Countermeasures",
    level: 10,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    description:
      'Pode Identificar Magia com a perícia da tradição ou Espionagem, mesmo sem ter visto a conjuração. Se identificar e o efeito falharia ou não teria efeito, pode fazer o conjurador achar que funcionou (você decide o resultado informado). Se o efeito o influenciaria, pode fingir; vínculo mental funciona, mas você ignora comandos.',
    actionType: 'free',
    trigger: 'Você tem sucesso em uma salvaguarda contra detecção, mental ou vidência.',
    sourcePage: 171,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7731',
  }),
  f({
    id: 'feat-lion-blade-flickering-twirl',
    name: 'Pirueta Cintilante',
    originalName: 'Flickering Twirl',
    level: 12,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    description:
      'Ganha ocultação até o início do seu próximo turno. Como é manifestação visual óbvia, não pode usar essa ocultação para Furtar-se.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Pirueta cintilante',
        actionType: 'one',
        description:
          'Ocultação até o início do próximo turno. Não serve para Furtar-se.',
      },
    ],
    sourcePage: 171,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7732',
  }),
  f({
    id: 'feat-lion-blade-slowing-strike',
    name: 'Golpe Lento',
    originalName: 'Slowing Strike',
    level: 12,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    description:
      'O alvo faz Fortitude contra a CD de classe ou de magia, a que for maior. Crítico: nada. Sucesso: −10 pés de status nos Deslocamentos até o início do seu próximo turno. Falha: o mesmo, por 1 minuto.',
    actionType: 'free',
    frequency: '1/rodada',
    trigger: 'Seu Golpe acerta uma criatura desprevenida e causa dano.',
    sourcePage: 171,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7733',
  }),
  f({
    id: 'feat-lion-blade-stunning-surprise',
    name: 'Surpresa Atordoante',
    originalName: 'Stunning Surprise',
    level: 14,
    archetypeId: 'archetype-lion-blade',
    prereqId: DED_LION.id,
    prereqName: DED_LION.name,
    description:
      'Mova-se até o Deslocamento e faça um Golpe corpo a corpo. Se acertar e causar dano, Fortitude contra CD de classe ou de magia (a maior). Depois o alvo fica imune por 24 horas. Crítico: nada. Sucesso: atordoado 1 e sem reações até o próximo turno. Falha: atordoado 3 e sem reações. Falha crítica: inconsciente por 1 minuto.',
    actionType: 'two',
    sourcePage: 171,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7734',
  }),
]

const prophetKalistradeArchetypeFeats: Feat[] = [
  f({
    id: DED_PROP.id,
    name: DED_PROP.name,
    originalName: 'Prophet of Kalistrade Dedication',
    level: 2,
    archetypeId: 'archetype-prophet-kalistrade',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'society', rank: 'trained' },
      { kind: 'attribute', attributeId: 'charisma', min: 2 },
      {
        kind: 'text',
        label: 'Treinado em Sociedade e Conhecimento Mercantil; Carisma +2; acesso: Druma',
      },
    ],
    description:
      'Perito em Sociedade. Pode usar Sociedade no lugar de Diplomacia para Causar Impressão em mercadores e negociantes. Se ainda não conjura com espaços: conjuração espontânea oculta (Conjurar uma Magia), repertório com dois truques ocultos comuns (você escolhe) mais Prestidigitação ou Ler Aura (você escolhe; o motor não escolhe). Treinado em ataque e CD. Atributo-chave: Carisma. Tradição oculta. Afiliação visível salvo se você a esconder.',
    effects: [
      { kind: 'skillRank', skillId: 'society', rank: 'expert' },
      { kind: 'lore', loreName: 'Mercantil', rank: 'trained' },
      { kind: 'spellcasting', access: PROPHET_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'prophet-kalistrade-extra-cantrip',
        options: [
          { id: 'prestidigitation', label: 'Prestidigitação' },
          { id: 'read-aura', label: 'Ler Aura' },
        ],
        hint: 'Prestidigitação ou Ler Aura. O motor não escolhe.',
        abilityName: 'Truque extra: {choice}',
        abilityDescription:
          'Entra no repertório além dos dois truques ocultos comuns. Só se você ainda não conjurava com espaços.',
      },
      {
        kind: 'specialAbility',
        name: 'Dois truques ocultos comuns',
        description:
          'Você escolhe os dois truques. O motor não escolhe. Se já conjurava com espaços, a Dedicação não entrega este repertório de truques.',
      },
      {
        kind: 'specialAbility',
        name: 'Sociedade com mercadores',
        description:
          'Use Sociedade no lugar de Diplomacia para Causar Impressão em mercadores e negociantes.',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7680',
  }),
  f({
    id: 'feat-prophet-kalistrade-basic-spellcasting',
    name: 'Conjuração Básica de Profeta',
    originalName: 'Basic Prophet Spellcasting',
    level: 4,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: DED_PROP.id,
    prereqName: DED_PROP.name,
    description:
      'Benefícios de conjuração básica. Sempre que ganhar espaço de um posto novo deste arquétipo, adicione ao repertório uma magia oculta comum daquele posto ou outra oculta apropriada que tenha aprendido. Você escolhe cada magia; o motor não escolhe.',
    effects: [{ kind: 'spellcastingTier', sourceId: PROPHET_SPELL.id, tier: 'basic' }],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7681',
  }),
  f({
    id: 'feat-prophet-kalistrade-gossip-lore',
    name: 'Conhecimento de Fofoca',
    originalName: 'Gossip Lore',
    level: 4,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: DED_PROP.id,
    prereqName: DED_PROP.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional (Dândi / Profeta)' }],
    description:
      'Treinado em Conhecimento Fofoca, usado só para Recordar Conhecimento, mas em qualquer tópico. Falha nesse teste aplica Conhecimento Duvidoso. Lendário em Sociedade: perito em Fofoca (não sobe por outros meios).',
    effects: [
      { kind: 'lore', loreName: 'Fofoca', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Fofoca versátil',
        description:
          'Só para Recordar Conhecimento, qualquer tópico. Falha = Conhecimento Duvidoso. Lendário em Sociedade → perito em Fofoca.',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=315',
  }),
  f({
    id: 'feat-prophet-kalistrade-smile-at-failure',
    name: 'Sorrir ante o Fracasso',
    originalName: 'Smile at Failure',
    level: 4,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: DED_PROP.id,
    prereqName: DED_PROP.name,
    description:
      'Quando uma criatura com quem você interage cai de indiferente para antipático ou de antipático para hostil, +2 de circunstância para Causar Impressão nela na próxima hora. Se essa queda levar a combate, +1 de circunstância na iniciativa seguinte no lugar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sorrir ante o fracasso',
        description:
          '+2 de circunstância para Causar Impressão por 1 hora após a atitude cair (indiferente→antipático ou antipático→hostil). Se virar combate: +1 de circunstância na iniciativa no lugar.',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7682',
  }),
  f({
    id: 'feat-prophet-kalistrade-fortunes-favor',
    name: 'Favor da Fortuna',
    originalName: "Fortune's Favor",
    level: 6,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: DED_PROP.id,
    prereqName: DED_PROP.name,
    description: '+2 de circunstância na rolagem disparadora.',
    actionType: 'free',
    frequency: '1/dia',
    trigger:
      'Você está prestes a rerrolar um teste de perícia ou salvaguarda falho devido a um efeito de fortuna.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Rerrolagem de fortuna (Favor da Fortuna, 1/dia)',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7683',
  }),
  f({
    id: 'feat-prophet-kalistrade-prolific-spellcasting',
    name: 'Conjuração Prolífica de Profeta',
    originalName: 'Prolific Prophet Spellcasting',
    level: 8,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: 'feat-prophet-kalistrade-basic-spellcasting',
    prereqName: 'Conjuração Básica de Profeta',
    description:
      'Aumenta em 1 o número de magias no repertório e de espaços deste arquétipo em cada posto, exceto os dois postos mais altos de Profeta de Kalistrade.',
    effects: [{ kind: 'spellSlotBreadth', sourceId: PROPHET_SPELL.id }],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7684',
  }),
  f({
    id: 'feat-prophet-kalistrade-prophets-lockbox',
    name: 'Cofre do Profeta',
    originalName: "Prophet's Lockbox",
    level: 10,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: DED_PROP.id,
    prereqName: DED_PROP.name,
    description:
      'Cofre imaginário como magia inata oculta de 5º posto 1/dia. No 12º nível e a cada 2 níveis, o Bulk máximo alvo aumenta em 1.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cofre imaginário',
        description:
          'Inata oculta 5º, 1/dia. Bulk máximo +1 no 12º e a cada 2 níveis.',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7685',
  }),
  f({
    id: 'feat-prophet-kalistrade-expert-spellcasting',
    name: 'Conjuração Perita de Profeta',
    originalName: 'Expert Prophet Spellcasting',
    level: 12,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: 'feat-prophet-kalistrade-basic-spellcasting',
    prereqName: 'Conjuração Básica de Profeta',
    description: 'Benefícios de conjuração perita deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: PROPHET_SPELL.id, tier: 'expert' }],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7686',
  }),
  f({
    id: 'feat-prophet-kalistrade-master-merchant',
    name: 'Mercador Mestre',
    originalName: 'Master Merchant',
    level: 14,
    archetypeId: 'archetype-prophet-kalistrade',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_PROP.id,
    prereqName: DED_PROP.name,
    description:
      'Se falhar (não criticamente) em Sociedade ou Conhecimento Mercantil para Ganhar Renda numa tarefa específica e puder continuar nos dias seguintes, pode tentar de novo no dia seguinte. Sucesso nessa nova tentativa conta como crítico, e você continua ganhando esse valor nos dias seguintes da tarefa.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mercador mestre',
        description:
          'Falha (não crítica) em Ganhar Renda com Sociedade ou Mercantil: pode rerrolar no dia seguinte; sucesso vira crítico e persiste na tarefa.',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7687',
  }),
  f({
    id: 'feat-prophet-kalistrade-master-spellcasting',
    name: 'Conjuração Mestra de Profeta',
    originalName: 'Master Prophet Spellcasting',
    level: 18,
    archetypeId: 'archetype-prophet-kalistrade',
    prereqId: 'feat-prophet-kalistrade-expert-spellcasting',
    prereqName: 'Conjuração Perita de Profeta',
    description: 'Benefícios de conjuração mestra deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: PROPHET_SPELL.id, tier: 'master' }],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7688',
  }),
]

export const archetypeFeatsGeneralRemaster21: Feat[] = [
  ...gelidShardArchetypeFeats,
  ...blackjacketArchetypeFeats,
  ...eagleKnightArchetypeFeats,
  ...lionBladeArchetypeFeats,
  ...prophetKalistradeArchetypeFeats,
]
