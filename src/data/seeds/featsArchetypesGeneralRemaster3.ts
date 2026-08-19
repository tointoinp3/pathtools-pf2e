/** Gerais Remaster: Guerreiro de Duas Armas, Duelista, Arqueiro Arcano, Mestre de Familiar, Gladiador. Sem Legacy. */
import type { Feat } from '@/types/feat'
import { SOURCE_PLAYER_CORE_2_ID, SOURCE_PLAYER_CORE_ID } from './sources'

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
  allowedSlotKinds?: Feat['allowedSlotKinds']
  repeatable?: boolean
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
    rarity: 'common',
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
    allowedSlotKinds: opts.allowedSlotKinds,
    repeatable: opts.repeatable,
    sourceId: opts.sourceId ?? SOURCE_PLAYER_CORE_2_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_DUAL = {
  id: 'feat-dual-weapon-warrior-dedication',
  name: 'Dedicação de Guerreiro de Duas Armas',
}
const DED_DUEL = { id: 'feat-duelist-dedication', name: 'Dedicação de Duelista' }
const DED_ELD = {
  id: 'feat-eldritch-archer-dedication',
  name: 'Dedicação de Arqueiro Arcano',
}
const DED_FAM = {
  id: 'feat-familiar-master-dedication',
  name: 'Dedicação de Mestre de Familiar',
}
const DED_GLAD = { id: 'feat-gladiator-dedication', name: 'Dedicação de Gladiador' }

const ELD_SPELL = {
  id: 'spellcasting-eldritch-archer-archetype',
  label: 'Conjuração de Arqueiro Arcano',
  style: 'spontaneous' as const,
  tradition: 'arcane' as const,
  traditionChoiceId: 'eldritch-archer-tradition',
  traditionChoiceHint:
    'Se você ainda não conjura com espaços, escolha a tradição do truque (precisa ter ataque de magia). Se já conjura com espaços, a Dedicação não entrega o truque — escolha a tradição só se for pegar Conjuração Básica deste arquétipo. O motor não escolhe o truque.',
  grantTraditionSkill: false,
  attributeId: 'charisma' as const,
  proficiencyRank: 'trained' as const,
  cantripsPerDay: 1,
  classOriginalName: 'Eldritch Archer',
  features: { repertoire: true },
}

const dualWeaponWarriorArchetypeFeats: Feat[] = [
  f({
    id: DED_DUAL.id,
    name: DED_DUAL.name,
    originalName: 'Dual-Weapon Warrior Dedication',
    level: 2,
    archetypeId: 'archetype-dual-weapon-warrior',
    isDedication: true,
    description:
      'Você ganha o feito Corte Duplo do guerreiro: duas ações, dois Golpes corpo a corpo no mesmo alvo, cada um com a penalidade de ataque múltiplo atual. Se o segundo não for ágil, −2. Se ambos acertarem, some o dano e aplique resistências/fraquezas uma vez; dano de precisão só uma vez, na arma que você escolher. Conta como dois ataques.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Corte Duplo',
        actionType: 'two',
        description:
          'Dois Golpes corpo a corpo no mesmo alvo. Segundo Golpe −2 se a arma não for ágil. Se ambos acertarem, some o dano (precisão só uma vez). Conta como dois ataques na penalidade de ataque múltiplo.',
      },
    ],
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=247',
  }),
  f({
    id: 'feat-dual-weapon-warrior-dual-thrower',
    name: 'Arremessador Duplo',
    originalName: 'Dual Thrower',
    level: 4,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    description:
      'Quando um feito deste arquétipo permitir um Golpe corpo a corpo, você pode fazer um Golpe à distância com arma de arremesso ou arma à distância de uma mão (armas de 1+ mãos, como arco longo, não valem). Efeitos que valem para armas corpo a corpo de uma mão também valem para essas armas à distância.',
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6308',
  }),
  f({
    id: 'feat-dual-weapon-warrior-dual-weapon-reload',
    name: 'Recarga com Duas Armas',
    originalName: 'Dual-Weapon Reload',
    level: 4,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    description:
      'Enquanto empunha duas armas de uma mão, uma em cada mão, não precisa de mão livre para recarregar a arma à distância de uma mão.',
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6309',
  }),
  f({
    id: 'feat-dual-weapon-warrior-quick-draw',
    name: 'Saque Rápido',
    originalName: 'Quick Draw',
    level: 4,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    description: 'Interaja para sacar uma arma e então Golpeie com ela.',
    actionType: 'one',
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=247',
  }),
  f({
    id: 'feat-dual-weapon-warrior-twin-parry',
    name: 'Aparar Gêmeo',
    originalName: 'Twin Parry',
    level: 6,
    archetypeId: 'archetype-dual-weapon-warrior',
    traits: ['Arquétipo'],
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    extraPrereq: [
      { kind: 'text', label: 'Empunhando duas armas corpo a corpo, uma em cada mão' },
    ],
    description:
      '+1 de circunstância na CA até o início do seu próximo turno, ou +2 se qualquer arma tiver o traço aparar. Perde o bônus se deixar de cumprir o requisito.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 144,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4796',
  }),
  f({
    id: 'feat-dual-weapon-warrior-flensing-slice',
    name: 'Corte Esfolador',
    originalName: 'Flensing Slice',
    level: 8,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    extraPrereq: [
      { kind: 'text', label: 'Sua última ação foi Corte Duplo e ambos os ataques acertaram o alvo' },
    ],
    description:
      'O alvo sofre 1d8 de sangramento persistente por dado de dano da arma com mais dados (máx. 4d8). Até o início do seu próximo turno fica desprevenido e suas resistências a dano físico caem em 5.',
    actionType: 'one',
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6310',
  }),
  f({
    id: 'feat-dual-weapon-warrior-dual-weapon-blitz',
    name: 'Blitz de Duas Armas',
    originalName: 'Dual-Weapon Blitz',
    level: 10,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Empunhando duas armas corpo a corpo de uma mão, uma em cada mão',
      },
    ],
    description:
      'Desloque-se até o seu Deslocamento. Durante o movimento, Golpeie uma vez com cada arma de uma mão, em qualquer ponto do trajeto.',
    actionType: 'two',
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6311',
  }),
  f({
    id: 'feat-dual-weapon-warrior-twin-riposte',
    name: 'Riposta Gêmea',
    originalName: 'Twin Riposte',
    level: 12,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: 'feat-dual-weapon-warrior-twin-parry',
    prereqName: 'Aparar Gêmeo',
    extraPrereq: [
      { kind: 'text', label: 'Você está se beneficiando de Aparar Gêmeo' },
    ],
    description:
      'Faça um Golpe corpo a corpo ou Desarme contra o oponente disparador.',
    actionType: 'reaction',
    trigger: 'Uma criatura no seu alcance falha criticamente um Golpe contra você.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4831',
  }),
  f({
    id: 'feat-dual-weapon-warrior-dual-onslaught',
    name: 'Investida Dupla',
    originalName: 'Dual Onslaught',
    level: 14,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    description:
      'Quando usa Corte Duplo e erra os dois Golpes, escolha uma das armas e aplique os efeitos de um acerto com ela. Não pode escolher uma arma cujo teste foi falha crítica (se ambos foram falha crítica, erra por completo).',
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=247',
  }),
  f({
    id: 'feat-dual-weapon-warrior-improved-twin-riposte',
    name: 'Riposta Gêmea Aprimorada',
    originalName: 'Improved Twin Riposte',
    level: 16,
    archetypeId: 'archetype-dual-weapon-warrior',
    prereqId: 'feat-dual-weapon-warrior-twin-riposte',
    prereqName: 'Riposta Gêmea',
    description:
      'Pode usar Riposta Gêmea mesmo sem Aparar Gêmeo (ainda precisa de duas armas corpo a corpo, uma em cada mão). No início de cada turno, ganha uma reação extra só para Riposta Gêmea.',
    sourcePage: 196,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=247',
  }),
  f({
    id: 'feat-dual-weapon-warrior-two-weapon-flurry',
    name: 'Saraivada de Duas Armas',
    originalName: 'Two-Weapon Flurry',
    level: 16,
    archetypeId: 'archetype-dual-weapon-warrior',
    traits: ['Arquétipo', 'Ímpeto', 'Pressão'],
    prereqId: DED_DUAL.id,
    prereqName: DED_DUAL.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando duas armas, uma em cada mão' }],
    description: 'Golpeie duas vezes, uma com cada arma.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 150,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4846',
  }),
  f({
    id: 'feat-dual-weapon-warrior-twinned-defense',
    name: 'Defesa Gêmea',
    originalName: 'Twinned Defense',
    level: 18,
    archetypeId: 'archetype-dual-weapon-warrior',
    traits: ['Arquétipo', 'Postura'],
    prereqId: 'feat-dual-weapon-warrior-twin-parry',
    prereqName: 'Aparar Gêmeo',
    extraPrereq: [
      { kind: 'text', label: 'Empunhando duas armas corpo a corpo, uma em cada mão' },
    ],
    description: 'Enquanto estiver nesta postura, tem continuamente os benefícios de Aparar Gêmeo.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 150,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4853',
  }),
]

const duelistArchetypeFeats: Feat[] = [
  f({
    id: DED_DUEL.id,
    name: DED_DUEL.name,
    originalName: 'Duelist Dedication',
    level: 2,
    archetypeId: 'archetype-duelist',
    isDedication: true,
    description:
      'Você ganha Saque Rápido: uma ação para Interagir sacando uma arma e então Golpear com ela.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Saque Rápido',
        actionType: 'one',
        description: 'Interaja para sacar uma arma e então Golpeie com ela.',
      },
    ],
    extraPrereq: [
      { kind: 'text', label: 'Treinado em armadura leve e armas simples' },
    ],
    sourcePage: 197,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6313',
  }),
  f({
    id: 'feat-duelist-dueling-parry',
    name: 'Aparar de Duelo',
    originalName: 'Dueling Parry',
    level: 4,
    archetypeId: 'archetype-duelist',
    prereqId: DED_DUEL.id,
    prereqName: DED_DUEL.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Empunhando uma única arma corpo a corpo de uma mão e nada nas outras mãos',
      },
    ],
    description:
      '+2 de circunstância na CA até o início do seu próximo turno, enquanto cumprir o requisito.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4781',
  }),
  f({
    id: 'feat-duelist-duelists-challenge',
    name: 'Desafio do Duelista',
    originalName: "Duelist's Challenge",
    level: 4,
    archetypeId: 'archetype-duelist',
    prereqId: DED_DUEL.id,
    prereqName: DED_DUEL.name,
    description:
      'Escolha um inimigo visível: ele é seu oponente de duelo até ser derrotado, fugir ou o encontro acabar. Golpes com uma única arma corpo a corpo de uma mão (outras mãos livres) ganham bônus de circunstância no dano igual ao número de dados da arma. Se atacar outra criatura, sofre penalidade de circunstância igual a esses dados.',
    actionType: 'one',
    sourcePage: 197,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=248',
  }),
  f({
    id: 'feat-duelist-disarming-stance',
    name: 'Postura Desarmadora',
    originalName: 'Disarming Stance',
    level: 8,
    archetypeId: 'archetype-duelist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_DUEL.id,
    prereqName: DED_DUEL.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo' },
      {
        kind: 'text',
        label: 'Empunhando uma única arma corpo a corpo de uma mão e nada nas outras mãos',
      },
    ],
    description:
      '+1 de circunstância em Atletismo para Desarmar e +2 na CD de Reflexos contra Desarmar. Pode Desarmar criaturas até dois tamanhos maiores.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 145,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4800',
  }),
  f({
    id: 'feat-duelist-selfless-parry',
    name: 'Aparar Altruísta',
    originalName: 'Selfless Parry',
    level: 8,
    archetypeId: 'archetype-duelist',
    prereqId: 'feat-duelist-dueling-parry',
    prereqName: 'Aparar de Duelo',
    description:
      'Enquanto se beneficia de Aparar de Duelo, aliados adjacentes ganham +1 de circunstância na CA. Se tiver Riposta de Duelo, pode usá-la quando um inimigo no alcance falhar criticamente um Golpe contra um aliado adjacente.',
    sourcePage: 197,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=248',
  }),
  f({
    id: 'feat-duelist-dueling-riposte',
    name: 'Riposta de Duelo',
    originalName: 'Dueling Riposte',
    level: 10,
    archetypeId: 'archetype-duelist',
    prereqId: 'feat-duelist-dueling-parry',
    prereqName: 'Aparar de Duelo',
    extraPrereq: [{ kind: 'text', label: 'Você está se beneficiando de Aparar de Duelo' }],
    description: 'Faça um Golpe corpo a corpo ou tente Desarmar a criatura disparadora.',
    actionType: 'reaction',
    trigger: 'Uma criatura no seu alcance falha criticamente um Golpe contra você.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4811',
  }),
  f({
    id: 'feat-duelist-disarming-twist',
    name: 'Torção Desarmadora',
    originalName: 'Disarming Twist',
    level: 12,
    archetypeId: 'archetype-duelist',
    traits: ['Arquétipo', 'Pressão'],
    prereqId: DED_DUEL.id,
    prereqName: DED_DUEL.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo' },
      {
        kind: 'text',
        label: 'Empunhando uma única arma corpo a corpo de uma mão e nada nas outras mãos',
      },
    ],
    description:
      'Golpe corpo a corpo de uma mão. Além do normal, aplica sucesso/sucesso crítico de Desarmar. Falha: o alvo fica desprevenido até o fim do seu turno atual. Se estiver em Postura Desarmadora, +1 de circunstância no ataque.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 147,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4824',
  }),
  f({
    id: 'feat-duelist-student-of-the-dueling-arts',
    name: 'Estudante das Artes do Duelo',
    originalName: 'Student of the Dueling Arts',
    level: 12,
    archetypeId: 'archetype-duelist',
    prereqId: DED_DUEL.id,
    prereqName: DED_DUEL.name,
    description:
      'Nos preparativos diários, pode trocar qualquer número de feitos deste arquétipo por outros feitos de duelista do nível adequado que você cumpra. Não troca a Dedicação nem este feito. Também pode entrar numa postura de um feito de duelista que você não tem, aumentando em 1 o número de ações (em geral para 2). Ainda precisa cumprir os pré-requisitos da postura. O motor não escolhe as trocas.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Repertório de duelo',
        description:
          'Troque feitos de duelista nos preparativos (exceto Dedicação e este). Postura que você não tem: +1 ação para entrar. Você escolhe o que trocar.',
      },
    ],
    sourcePage: 197,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=248',
  }),
  f({
    id: 'feat-duelist-dueling-dance',
    name: 'Dança de Duelo',
    originalName: 'Dueling Dance',
    level: 14,
    archetypeId: 'archetype-duelist',
    traits: ['Arquétipo', 'Postura'],
    prereqId: 'feat-duelist-dueling-parry',
    prereqName: 'Aparar de Duelo',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Empunhando uma única arma corpo a corpo de uma mão e nada nas outras mãos',
      },
    ],
    description: 'Enquanto estiver nesta postura, tem continuamente os benefícios de Aparar de Duelo.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 149,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4834',
  }),
  f({
    id: 'feat-duelist-improved-dueling-riposte',
    name: 'Riposta de Duelo Aprimorada',
    originalName: 'Improved Dueling Riposte',
    level: 14,
    archetypeId: 'archetype-duelist',
    prereqId: 'feat-duelist-dueling-riposte',
    prereqName: 'Riposta de Duelo',
    description:
      'Pode usar Riposta de Duelo mesmo sem Aparar de Duelo (ainda precisa de uma única arma de uma mão e nada nas outras mãos). No início de cada turno, ganha uma reação extra só para Riposta de Duelo.',
    sourcePage: 197,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=248',
  }),
  f({
    id: 'feat-duelist-guiding-riposte',
    name: 'Riposta Guia',
    originalName: 'Guiding Riposte',
    level: 16,
    archetypeId: 'archetype-duelist',
    prereqId: 'feat-duelist-dueling-riposte',
    prereqName: 'Riposta de Duelo',
    description:
      'Quando usa Riposta de Duelo para Golpear e acerta, pode Reposicionar o alvo em até 3 m.',
    sourcePage: 197,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=248',
  }),
]

const eldritchArcherArchetypeFeats: Feat[] = [
  f({
    id: DED_ELD.id,
    name: DED_ELD.name,
    originalName: 'Eldritch Archer Dedication',
    level: 6,
    archetypeId: 'archetype-eldritch-archer',
    isDedication: true,
    description:
      'Se você ainda não conjura com espaços, ganha conjuração espontânea, Conjurar uma Magia, repertório com um truque à sua escolha (tradição à sua escolha; o truque precisa ter ataque de magia) e treino em ataque/CD (Carisma). Sempre ganha Tiro Arcano (três ações): conjure uma magia de 1 ou 2 ações com ataque de magia, imbuindo o arco/besta, e Golpeie; o resultado do ataque resolve o Golpe e a magia. Conta como dois ataques. Some os danos para resistências/fraquezas. Você escolhe tradição e truque; o motor não escolhe.',
    effects: [
      { kind: 'spellcasting', access: ELD_SPELL },
      {
        kind: 'specialAbility',
        name: 'Tiro Arcano',
        actionType: 'three',
        description:
          'Requisito: arco ou besta carregada. Conjure magia de 1–2 ações com ataque de magia; o efeito vai na munição. Golpeie com o arco. O teste resolve Golpe e magia. Dois ataques na penalidade, aplicada depois. Some os danos contra resistências/fraquezas.',
      },
    ],
    extraPrereq: [
      { kind: 'text', label: 'Perito em pelo menos um tipo de arco ou besta' },
    ],
    sourcePage: 198,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-basic-spellcasting',
    name: 'Conjuração Básica de Arqueiro Arcano',
    originalName: 'Basic Eldritch Archer Spellcasting',
    level: 8,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description:
      'Ganha os benefícios de conjuração básica. Cada espaço de um posto novo deste arquétipo adiciona uma magia da tradição escolhida ao repertório (comum ou outra que você tenha acesso).',
    effects: [{ kind: 'spellcastingTier', sourceId: ELD_SPELL.id, tier: 'basic' }],
    sourcePage: 198,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-enchanting-shot',
    name: 'Tiro Encantador',
    originalName: 'Enchanting Shot',
    level: 8,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description:
      'Golpe de arco ou besta. Acerto: +2d6 mental. Crítico: também atordoado 1. O dano mental sobe para 3d6 com runa de golpe maior e 4d6 com golpe máximo.',
    actionType: 'two',
    sourcePage: 198,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-magic-ammunition',
    name: 'Munição Mágica',
    originalName: 'Magic Ammunition',
    level: 8,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description:
      'Escolha três tipos de munição mágica comum de 4º nível ou menor. Ação livre (1/rodada): transforme uma flecha/virote não mágico em um desses tipos até o fim do turno. Se a munição tiver Ativar, ainda gasta as ações. Pode aplicar munição de virote em flecha e vice-versa. Pode pegar de novo: mais três tipos. O motor não escolhe os tipos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Transformar Munição',
        actionType: 'free',
        description:
          '1/rodada. Escolha três tipos ao pegar o feito (e mais três a cada vez que repetir). Você nomeia os tipos.',
      },
    ],
    frequency: '1/rodada (Transformar Munição)',
    repeatable: true,
    sourcePage: 198,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-precious-ammunition',
    name: 'Munição Preciosa',
    originalName: 'Precious Ammunition',
    level: 8,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description:
      'Uma ação: encante uma munição. Se disparar até o fim do turno, conta como ferro frio ou prata (você escolhe na hora). No 14º, também pode escolher adamantina. O motor não escolhe o material.',
    actionType: 'one',
    sourcePage: 198,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-running-reload',
    name: 'Recarga em Movimento',
    originalName: 'Running Reload',
    level: 8,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description: 'Desloque-se, Dê um Passo ou Furtive-se e então Interaja para recarregar.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-eldritch-reload',
    name: 'Recarga Arcana',
    originalName: 'Eldritch Reload',
    level: 10,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Sua última ação neste turno foi Tiro Arcano, Conjurar uma Magia de um espaço, ou ativar munição mágica (não pode ter sido ação livre ou reação)',
      },
    ],
    description: 'Interaja para recarregar uma arma que está empunhando.',
    actionType: 'free',
    sourcePage: 199,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6322',
  }),
  f({
    id: 'feat-eldritch-archer-expert-spellcasting',
    name: 'Conjuração Perita de Arqueiro Arcano',
    originalName: 'Expert Eldritch Archer Spellcasting',
    level: 12,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: 'feat-eldritch-archer-basic-spellcasting',
    prereqName: 'Conjuração Básica de Arqueiro Arcano',
    description: 'Ganha os benefícios de conjuração perita.',
    effects: [{ kind: 'spellcastingTier', sourceId: ELD_SPELL.id, tier: 'expert' }],
    sourcePage: 199,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-homing-shot',
    name: 'Tiro Teleguiado',
    originalName: 'Homing Shot',
    level: 14,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description:
      'Golpe de arco ou besta contra um inimigo que você vê; a munição contorna cantos. Ignora a condição oculto do alvo e toda cobertura.',
    actionType: 'one',
    sourcePage: 199,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-incorporeal-shot',
    name: 'Tiro Incorpóreo',
    originalName: 'Incorporeal Shot',
    level: 16,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description:
      'Golpe de arco ou besta contra inimigo observado ou escondido (não indetectado). A munição atravessa barreiras não mágicas em linha reta. Ignora cobertura, oculto, escondido e bônus de circunstância na CA de escudos. +4 de status contra criaturas de armadura. Bloqueio com Escudo não mágico não reduz o dano.',
    actionType: 'one',
    sourcePage: 199,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-fatal-shot',
    name: 'Tiro Fatal',
    originalName: 'Fatal Shot',
    level: 18,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    description:
      'Golpe de arco ou besta. Acerto: +10d10 de precisão. Crítico: Fortitude contra a maior entre CD de classe e CD de magia ou morre imediatamente (morte e incapacitação).',
    actionType: 'three',
    sourcePage: 199,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-master-spellcasting',
    name: 'Conjuração Mestra de Arqueiro Arcano',
    originalName: 'Master Eldritch Archer Spellcasting',
    level: 18,
    archetypeId: 'archetype-eldritch-archer',
    prereqId: 'feat-eldritch-archer-expert-spellcasting',
    prereqName: 'Conjuração Perita de Arqueiro Arcano',
    description: 'Ganha os benefícios de conjuração mestra.',
    effects: [{ kind: 'spellcastingTier', sourceId: ELD_SPELL.id, tier: 'master' }],
    sourcePage: 199,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=249',
  }),
  f({
    id: 'feat-eldritch-archer-impossible-volley',
    name: 'Saraivada Impossível',
    originalName: 'Impossible Volley',
    level: 20,
    archetypeId: 'archetype-eldritch-archer',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_ELD.id,
    prereqName: DED_ELD.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Empunhando arma à distância com volley e recarga 0',
      },
    ],
    description:
      'Um Golpe com −2 contra cada inimigo numa explosão de 3 m centrada no alcance de volley ou além. Role o dano uma vez para todos. Cada ataque conta na penalidade, que só sobe depois de todos.',
    actionType: 'three',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 150,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4854',
  }),
]

const familiarMasterArchetypeFeats: Feat[] = [
  f({
    id: DED_FAM.id,
    name: DED_FAM.name,
    originalName: 'Familiar Master Dedication',
    level: 2,
    archetypeId: 'archetype-familiar-master',
    isDedication: true,
    description:
      'Você ganha um familiar. Se já tinha um, ganha o feito Familiar Aprimorado (4 habilidades por dia em vez de 2). Adicione o familiar em Companheiros. O motor não escolhe qual dos dois casos vale — se já tinha familiar, marque as 4 habilidades lá.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Familiar',
        description:
          'Ganha um familiar (2 habilidades). Se já tinha, trata como Familiar Aprimorado (+2 habilidades, total 4). Você indica o caso em Companheiros.',
      },
    ],
    sourcePage: 200,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=250',
  }),
  f({
    id: 'feat-familiar-master-enhanced-familiar',
    name: 'Familiar Aprimorado',
    originalName: 'Enhanced Familiar',
    level: 4,
    archetypeId: 'archetype-familiar-master',
    prereqId: DED_FAM.id,
    prereqName: DED_FAM.name,
    description:
      'Seleciona quatro habilidades de familiar ou mestre por dia, em vez de duas. Bruxa: some as habilidades bônus de bruxa. Mago com tese de familiar aprimorado: a base (antes da tese) passa a ser quatro.',
    effects: [{ kind: 'familiarAbilitySlots', extra: 2 }],
    sourcePage: 200,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=250',
  }),
  f({
    id: 'feat-familiar-master-familiar-conduit',
    name: 'Conduíte do Familiar',
    originalName: 'Familiar Conduit',
    level: 4,
    archetypeId: 'archetype-familiar-master',
    traits: ['Arquétipo', 'Concentração', 'Forma de Magia'],
    prereqId: DED_FAM.id,
    prereqName: DED_FAM.name,
    extraPrereq: [
      { kind: 'text', label: 'Capaz de conjurar magias' },
      { kind: 'text', label: 'Linha de efeito até o familiar' },
    ],
    description:
      'Se a próxima ação for Conjurar uma Magia com alcance, a magia usa o familiar como origem.',
    actionType: 'one',
    sourcePage: 200,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6330',
  }),
  f({
    id: 'feat-familiar-master-familiar-mascot',
    name: 'Mascote Familiar',
    originalName: 'Familiar Mascot',
    level: 4,
    archetypeId: 'archetype-familiar-master',
    prereqId: DED_FAM.id,
    prereqName: DED_FAM.name,
    description:
      'Ao escolher habilidades de mestre, pode indicar um aliado para se beneficiar. Cada habilidade de mestre só beneficia um personagem, e só pode ser selecionada uma vez salvo se o texto disser o contrário. Você escolhe o aliado.',
    sourcePage: 200,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=250',
  }),
  f({
    id: 'feat-familiar-master-improved-familiar',
    name: 'Familiar Melhorado',
    originalName: 'Improved Familiar',
    level: 6,
    archetypeId: 'archetype-familiar-master',
    prereqId: DED_FAM.id,
    prereqName: DED_FAM.name,
    description:
      'O número de habilidades exigido para tornar o familiar um familiar específico é 2 menor que o normal.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Familiar específico mais barato',
        description: 'Custo de familiar específico −2 habilidades.',
      },
    ],
    sourcePage: 200,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=250',
  }),
  f({
    id: 'feat-familiar-master-mutable-familiar',
    name: 'Familiar Mutável',
    originalName: 'Mutable Familiar',
    level: 8,
    archetypeId: 'archetype-familiar-master',
    prereqId: DED_FAM.id,
    prereqName: DED_FAM.name,
    description:
      'Atividade de exploração de 10 minutos: troque uma ou mais destas habilidades por outras da lista: anfíbio, escavador, escalador, visão no escuro, movimento rápido, destreza manual, resistência e faro. Só habilidades que você já poderia reescolher no dia, não as obrigatórias do familiar. Não remova uma habilidade exigida por outra (ex.: destreza manual se tiver entrega de item).',
    sourcePage: 200,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=250',
  }),
  f({
    id: 'feat-familiar-master-incredible-familiar',
    name: 'Familiar Incrível',
    originalName: 'Incredible Familiar',
    level: 10,
    archetypeId: 'archetype-familiar-master',
    prereqId: 'feat-familiar-master-enhanced-familiar',
    prereqName: 'Familiar Aprimorado',
    description: 'Seleciona seis habilidades de familiar ou mestre por dia, em vez de quatro.',
    effects: [{ kind: 'familiarAbilitySlots', extra: 2 }],
    sourcePage: 200,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=250',
  }),
]

const gladiatorArchetypeFeats: Feat[] = [
  f({
    id: DED_GLAD.id,
    name: DED_GLAD.name,
    originalName: 'Gladiator Dedication',
    level: 2,
    archetypeId: 'archetype-gladiator',
    isDedication: true,
    description:
      'Ganha Conhecimento Adicional em Conhecimento Gladiatorial (sobe nos níveis 3, 7 e 15). Se já era treinado nisso, também fica treinado em outro Conhecimento à sua escolha. No início de um combate com espectadores: PV temporários iguais ao seu nível (1 minuto) e pode rolar Performance na iniciativa. Espectadores = criaturas sapientes observando, sem participar nem ajudar. O MJ decide. Nomeie o Conhecimento; o motor não escolhe o extra.',
    effects: [
      {
        kind: 'loreChoice',
        choiceId: 'gladiatorial-lore',
        rank: 'trained',
        increaseAtLevels: [3, 7, 15],
        hint: 'O padrão é Gladiatorial. Se já era treinado, nomeie outro Conhecimento. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Palco de combate',
        description:
          'Com espectadores: PV temporários = nível (1 minuto) e Performance na iniciativa. Se já era treinado em Gladiatorial, também treina outro Conhecimento (anote na ficha).',
      },
    ],
    extraPrereq: [
      { kind: 'feat', featId: 'feat-impressive-performance', featName: 'Performance Impressionante' },
      { kind: 'text', label: 'Performance Impressionante' },
    ],
    sourcePage: 201,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=251',
  }),
  f({
    id: 'feat-gladiator-fancy-moves',
    name: 'Movimentos Elegantes',
    originalName: 'Fancy Moves',
    level: 4,
    archetypeId: 'archetype-gladiator',
    prereqId: DED_GLAD.id,
    prereqName: DED_GLAD.name,
    description: 'Pode usar Performance para Desmoralizar.',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'performance', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Performance' },
    ],
    sourcePage: 201,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=251',
  }),
  f({
    id: 'feat-gladiator-play-to-the-crowd',
    name: 'Jogar para a Plateia',
    originalName: 'Play to the Crowd',
    level: 4,
    archetypeId: 'archetype-gladiator',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_GLAD.id,
    prereqName: DED_GLAD.name,
    description:
      'Teste de Performance (CD típica do seu nível ou Impressionar a plateia, a maior). Sucesso: escolha um benefício. Sucesso crítico: dois. PV temporários = nível (1 minuto); +1 de circunstância na CA até o fim do próximo turno; ou +1 de circunstância no próximo ataque até o fim do próximo turno.',
    actionType: 'reaction',
    trigger: 'Você reduz um inimigo a 0 PV num combate com espectadores.',
    sourcePage: 201,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6335',
  }),
  f({
    id: 'feat-gladiator-stage-fighting',
    name: 'Luta de Palco',
    originalName: 'Stage Fighting',
    level: 4,
    archetypeId: 'archetype-gladiator',
    prereqId: DED_GLAD.id,
    prereqName: DED_GLAD.name,
    description:
      'Não sofre a penalidade de −2 de circunstância ao fazer ataque não letal com arma ou desarmado sem o traço não letal.',
    sourcePage: 201,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=251',
  }),
  f({
    id: 'feat-gladiator-performative-weapons-training',
    name: 'Treino de Armas Performáticas',
    originalName: 'Performative Weapons Training',
    level: 6,
    archetypeId: 'archetype-gladiator',
    prereqId: DED_GLAD.id,
    prereqName: DED_GLAD.name,
    description:
      'Familiaridade com cajado bo, capa de duelo, corrente com espinhos, bengala-espada, tridente, mangual de guerra e chicote: tratam-se como simples para proficiência. Crítico com essas armas aplica especialização crítica. O MJ pode incluir outras marciais da região.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        weapons: [
          'Bo Staff',
          'Dueling Cape',
          'Spiked Chain',
          'Sword Cane',
          'Trident',
          'War Flail',
          'Whip',
        ],
        martialAsSimple: true,
        advancedAsMartial: false,
      },
      {
        kind: 'specialAbility',
        name: 'Especialização crítica (armas performáticas)',
        description: 'Acerto crítico com essas armas aplica o efeito de especialização crítica.',
      },
    ],
    sourcePage: 201,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=251',
  }),
  f({
    id: 'feat-gladiator-call-your-shot',
    name: 'Anunciar o Golpe',
    originalName: 'Call Your Shot',
    level: 8,
    archetypeId: 'archetype-gladiator',
    prereqId: 'feat-gladiator-play-to-the-crowd',
    prereqName: 'Jogar para a Plateia',
    description:
      'Quando obtém sucesso em Jogar para a Plateia, adiciona à lista: uma criatura visível a até 9 m fica amedrontada 2 (emoção, medo, mental, visual).',
    sourcePage: 201,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=251',
  }),
]

export const archetypeFeatsGeneralRemaster3: Feat[] = [
  ...dualWeaponWarriorArchetypeFeats,
  ...duelistArchetypeFeats,
  ...eldritchArcherArchetypeFeats,
  ...familiarMasterArchetypeFeats,
  ...gladiatorArchetypeFeats,
]
