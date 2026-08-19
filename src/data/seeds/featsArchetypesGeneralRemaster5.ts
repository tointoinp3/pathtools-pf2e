/** Gerais Remaster: Envenenador, Ritualista, Batedor, Trapaceiro de Pergaminhos, Catador. Sem Legacy. */
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

const DED_POI = { id: 'feat-poisoner-dedication', name: 'Dedicação de Envenenador' }
const DED_RIT = { id: 'feat-ritualist-dedication', name: 'Dedicação de Ritualista' }
const DED_SCO = { id: 'feat-scout-dedication', name: 'Dedicação de Batedor' }
const DED_SCR = {
  id: 'feat-scroll-trickster-dedication',
  name: 'Dedicação de Trapaceiro de Pergaminhos',
}
const DED_SCG = { id: 'feat-scrounger-dedication', name: 'Dedicação de Catador' }

const TERRAIN_STALKER = [
  { id: 'rubble', label: 'Escombros' },
  { id: 'snow', label: 'Neve' },
  { id: 'underbrush', label: 'Matagal' },
]

const poisonerArchetypeFeats: Feat[] = [
  f({
    id: DED_POI.id,
    name: DED_POI.name,
    originalName: 'Poisoner Dedication',
    level: 2,
    archetypeId: 'archetype-poisoner',
    isDedication: true,
    description:
      'Ganha os benefícios de alquimia avançada: 4 consumíveis de veneno alquímico por dia. Lembra as fórmulas de veneno alquímico (sem livro).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Venenos avançados',
        description: 'Alquimia avançada: 4 consumíveis de veneno alquímico por dia. Sem livro de fórmulas para esses venenos.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ofício' },
    ],
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6382',
  }),
  f({
    id: 'feat-poisoner-blowgun-poisoner',
    name: 'Envenenador de Zarabatana',
    originalName: 'Blowgun Poisoner',
    level: 4,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Golpes de zarabatana aplicam veneno de ferimento mesmo sem dano por resistência. Crítico com dardo envenenado: o save inicial do veneno piora um grau (infortúnio). Se Golpear com zarabatana enquanto escondido ou indetectado, não fica observado automaticamente: teste de Furtividade contra a CD de Percepção do alvo; sucesso: permanece escondido.',
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=259',
  }),
  f({
    id: 'feat-poisoner-poison-resistance',
    name: 'Resistência a Veneno',
    originalName: 'Poison Resistance',
    level: 4,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Resistência a veneno igual à metade do seu nível e +1 de status em salvaguardas contra venenos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência a veneno',
        description: 'Resistência a veneno = metade do nível. +1 de status em salvaguardas contra veneno.',
      },
    ],
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=259',
  }),
  f({
    id: 'feat-poisoner-poisoners-twist',
    name: 'Torção do Envenenador',
    originalName: "Poisoner's Twist",
    level: 4,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'medicine', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Medicina' },
      {
        kind: 'text',
        label:
          'Sua última ação foi um Golpe corpo a corpo que causou dano a um alvo sob um veneno que você conhece',
      },
    ],
    description:
      'Causa 1d6 do tipo de dano do Golpe exigido e 1d6 de veneno. No 18º, 2d6 de cada tipo.',
    actionType: 'one',
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6383',
  }),
  f({
    id: 'feat-poisoner-advanced-poisoncraft',
    name: 'Ofício de Veneno Avançado',
    originalName: 'Advanced Poisoncraft',
    level: 6,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Cria até 6 venenos por dia com alquimia avançada. Especial: no 10º ou mais, pode pegar de novo para subir para 8. Você decide se pega de novo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mais venenos',
        description: '6 venenos por dia (8 se pegar este feito de novo no 10º+).',
      },
    ],
    repeatable: true,
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=259',
  }),
  f({
    id: 'feat-poisoner-poison-coat',
    name: 'Casaco Envenenado',
    originalName: 'Poison Coat',
    level: 6,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Gaste um veneno de contato ou ferimento e 10 minutos para impregnar a roupa (só um por vez). Reação Uma Mordida: criatura adjacente acerta você com Golpe desarmado corpo a corpo — ela é exposta ao veneno, que fica inerte.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Uma Mordida',
        actionType: 'reaction',
        description:
          'Gatilho: Golpe desarmado corpo a corpo adjacente acerta você. A criatura é exposta ao veneno impregnado.',
      },
    ],
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=259',
  }),
  f({
    id: 'feat-poisoner-poison-weapon',
    name: 'Arma Envenenada',
    originalName: 'Poison Weapon',
    level: 6,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando uma arma' }],
    description:
      'Aplica veneno de contato ou ferimento na arma; com mão livre, pode Interagir para sacar nesta ação. Nas preparações, cria venenos simples de ferimento iguais ao seu nível (1d4 de veneno, sem salvaguarda; só você aplica; expiram na próxima preparação).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Venenos simples',
        description: 'Nas preparações: venenos simples = seu nível (1d4 de veneno).',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 171,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4933',
  }),
  f({
    id: 'feat-poisoner-tenacious-toxins',
    name: 'Toxinas Tenazes',
    originalName: 'Tenacious Toxins',
    level: 6,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'A duração máxima de qualquer veneno que você cria aumenta pelo intervalo do estágio 1, até o dobro da duração máxima.',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5776',
  }),
  f({
    id: 'feat-poisoner-acquired-tolerance',
    name: 'Tolerância Adquirida',
    originalName: 'Acquired Tolerance',
    level: 8,
    archetypeId: 'archetype-poisoner',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Rerrole o teste disparador e use o segundo resultado. Depois pode usar de novo no mesmo tipo de veneno naquele dia, mas não em outro tipo até a próxima preparação.',
    actionType: 'reaction',
    trigger: 'Você falha numa salvaguarda contra um veneno.',
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6386',
  }),
  f({
    id: 'feat-poisoner-sticky-poison',
    name: 'Veneno Grudento',
    originalName: 'Sticky Poison',
    level: 8,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Se o Golpe com arma envenenada gastaria o veneno sem save inicial (resistência ou falha crítica), teste simples CD 5; sucesso: a arma continua envenenada. Se o Golpe acertar, teste simples CD 17; sucesso: continua envenenada até o fim do seu próximo turno.',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 66,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5781',
  }),
  f({
    id: 'feat-poisoner-improved-poison-weapon',
    name: 'Arma Envenenada Aprimorada',
    originalName: 'Improved Poison Weapon',
    level: 10,
    archetypeId: 'archetype-poisoner',
    prereqId: 'feat-poisoner-poison-weapon',
    prereqName: 'Arma Envenenada',
    description:
      'Veneno simples aplicado com Arma Envenenada causa 2d4 em vez de 1d4. Não gasta o veneno num ataque com falha crítica.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 173,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4951',
  }),
  f({
    id: 'feat-poisoner-pinpoint-poisoner',
    name: 'Envenenador Preciso',
    originalName: 'Pinpoint Poisoner',
    level: 10,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Ao acertar um desprevenido com arma envenenada ou expô-lo a veneno inalado, ele sofre −2 de circunstância no save inicial daquele veneno.',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5785',
  }),
  f({
    id: 'feat-poisoner-chemical-contagion',
    name: 'Contágio Químico',
    originalName: 'Chemical Contagion',
    level: 18,
    archetypeId: 'archetype-poisoner',
    prereqId: DED_POI.id,
    prereqName: DED_POI.name,
    description:
      'Ganha a descoberta maior de campo do toxicólogo: se o alvo falhar no save inicial de um veneno de ferimento, o veneno espirra numa criatura adjacente à sua escolha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Descoberta maior (toxicólogo)',
        description:
          'Falha no save inicial de veneno de ferimento: espirra em 1 adjacente à sua escolha.',
      },
    ],
    sourcePage: 210,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6387',
  }),
]

const ritualistArchetypeFeats: Feat[] = [
  f({
    id: DED_RIT.id,
    name: DED_RIT.name,
    originalName: 'Ritualist Dedication',
    level: 4,
    archetypeId: 'archetype-ritualist',
    isDedication: true,
    description:
      '+2 de circunstância em todos os testes para realizar um ritual. Aprende dois rituais incomuns de 2º posto ou menor. Precisa cumprir os pré-requisitos de conjurador primário; não pode ensinar nem deixar outro ser primário a menos que ele também conheça o ritual. No 8º e a cada 4 níveis, aprende mais dois, posto máximo igual à metade do nível. Você escolhe cada ritual; o motor não escolhe.',
    effects: [
      { kind: 'circumstanceBonus', value: 2, appliesTo: 'testes para realizar rituais' },
      {
        kind: 'specialAbility',
        name: 'Rituais conhecidos',
        description:
          '2 rituais incomuns de 2º ou menor agora; +2 no 8º, 12º, 16º e 20º (posto máx. = metade do nível). Você nomeia os rituais.',
      },
    ],
    extraPrereq: [
      {
        kind: 'text',
        label: 'Perito em Arcanismo, Natureza, Ocultismo ou Religião',
      },
    ],
    sourcePage: 211,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=260',
  }),
  f({
    id: 'feat-ritualist-flexible-ritualist',
    name: 'Ritualista Flexível',
    originalName: 'Flexible Ritualist',
    level: 6,
    archetypeId: 'archetype-ritualist',
    prereqId: DED_RIT.id,
    prereqName: DED_RIT.name,
    description:
      'Ao conjurar um ritual, pode reduzir os conjuradores secundários em 1. Você cumpre os requisitos desse secundário e faz o teste dele. Não substitui um secundário que seja o alvo (ex.: expiação).',
    sourcePage: 211,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=260',
  }),
  f({
    id: 'feat-ritualist-resourceful-ritualist',
    name: 'Ritualista Inventivo',
    originalName: 'Resourceful Ritualist',
    level: 6,
    archetypeId: 'archetype-ritualist',
    prereqId: DED_RIT.id,
    prereqName: DED_RIT.name,
    description:
      'Pode tentar rituais que pedem perito se for treinado, mestre se for perito, ou lendário se for mestre.',
    sourcePage: 211,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=260',
  }),
  f({
    id: 'feat-ritualist-efficient-rituals',
    name: 'Rituais Eficientes',
    originalName: 'Efficient Rituals',
    level: 8,
    archetypeId: 'archetype-ritualist',
    prereqId: DED_RIT.id,
    prereqName: DED_RIT.name,
    description:
      'Ritual de 1 dia: 4 horas. Mais de 1 dia: metade dos dias (arredondado para cima). No 14º, ritual medido em dias pode ser feito em igual número de horas (se passar de 8 horas, divide entre dias como o normal).',
    sourcePage: 211,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=260',
  }),
  f({
    id: 'feat-ritualist-assured-ritualist',
    name: 'Ritualista Seguro',
    originalName: 'Assured Ritualist',
    level: 10,
    archetypeId: 'archetype-ritualist',
    prereqId: DED_RIT.id,
    prereqName: DED_RIT.name,
    description:
      'Se for o conjurador primário, depois de todos os testes secundários, escolha um que foi falha ou falha crítica e melhore um grau.',
    sourcePage: 211,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=260',
  }),
  f({
    id: 'feat-ritualist-enterprising-ritualist',
    name: 'Ritualista Empreendedor',
    originalName: 'Enterprising Ritualist',
    level: 14,
    archetypeId: 'archetype-ritualist',
    prereqId: DED_RIT.id,
    prereqName: DED_RIT.name,
    description:
      'Se o ritual tiver Custo em PO, gaste 10% a menos. Sucesso crítico no teste primário: reduz o valor em PO consumido pelo mesmo montante de novo.',
    sourcePage: 211,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=260',
  }),
]

const scoutArchetypeFeats: Feat[] = [
  f({
    id: DED_SCO.id,
    name: DED_SCO.name,
    originalName: 'Scout Dedication',
    level: 2,
    archetypeId: 'archetype-scout',
    isDedication: true,
    description:
      'Pode fazer a atividade de exploração Batedor ao mesmo tempo que Evitar Atenção. O bônus de iniciativa que você concede ao Bater é +2 em vez de +1.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Batedor alerta',
        description:
          'Batedor + Evitar Atenção ao mesmo tempo. Iniciativa do grupo ao Bater: +2 em vez de +1.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained' },
      { kind: 'skillRank', skillId: 'survival', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Furtividade e Sobrevivência' },
    ],
    sourcePage: 212,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=261',
  }),
  f({
    id: 'feat-scout-scouts-charge',
    name: 'Investida do Batedor',
    originalName: "Scout's Charge",
    level: 4,
    archetypeId: 'archetype-scout',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_SCO.id,
    prereqName: DED_SCO.name,
    description:
      'Escolha um inimigo. Desloque-se, Finte contra ele e Golpeie. Na Finta, pode usar Furtividade no lugar de Enganação.',
    actionType: 'two',
    sourcePage: 212,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=261',
  }),
  f({
    id: 'feat-scout-terrain-scout',
    name: 'Batedor de Terreno',
    originalName: 'Terrain Scout',
    level: 4,
    archetypeId: 'archetype-scout',
    prereqId: DED_SCO.id,
    prereqName: DED_SCO.name,
    description:
      'Ganha Espreitador do Terreno duas vezes, cada uma num terreno diferente (escombros, neve ou matagal). Se Evitar Atenção e aliados usarem Seguir o Especialista, escolha um aliado para ganhar o benefício de um dos seus Espreitador do Terreno. Você escolhe os dois terrenos e o aliado; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'terrain-a',
        options: TERRAIN_STALKER,
        hint: 'Primeiro terreno de Espreitador. O motor não escolhe.',
        abilityName: 'Espreitador do Terreno ({choice})',
        abilityDescription:
          'Nesse terreno, enquanto não detectado por não-aliados, pode Furtar-se sem teste se mover no máximo 1,5 m e não passar a 3 m de um inimigo.',
      },
      {
        kind: 'textChoice',
        choiceId: 'terrain-b',
        options: TERRAIN_STALKER,
        hint: 'Segundo terreno (diferente do primeiro). O motor não escolhe.',
        abilityName: 'Espreitador do Terreno ({choice})',
        abilityDescription:
          'Nesse terreno, enquanto não detectado por não-aliados, pode Furtar-se sem teste se mover no máximo 1,5 m e não passar a 3 m de um inimigo.',
      },
    ],
    sourcePage: 212,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=261',
  }),
  f({
    id: 'feat-scout-fleeting-shadow',
    name: 'Sombra Fugaz',
    originalName: 'Fleeting Shadow',
    level: 6,
    archetypeId: 'archetype-scout',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_SCO.id,
    prereqName: DED_SCO.name,
    description: 'Esconda-se e então Furtive-se duas vezes.',
    actionType: 'two',
    sourcePage: 212,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=261',
  }),
  f({
    id: 'feat-scout-scouts-speed',
    name: 'Velocidade do Batedor',
    originalName: "Scout's Speed",
    level: 6,
    archetypeId: 'archetype-scout',
    prereqId: DED_SCO.id,
    prereqName: DED_SCO.name,
    description:
      '+3 m de status no Deslocamento. Ao calcular velocidade de viagem, o bônus sobe para +6 m.',
    effects: [
      { kind: 'speedBonus', value: 10 },
      {
        kind: 'specialAbility',
        name: 'Viagem rápida',
        description: 'Na velocidade de viagem, o bônus de status no Deslocamento é +6 m.',
      },
    ],
    sourcePage: 212,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=261',
  }),
  f({
    id: 'feat-scout-scouts-pounce',
    name: 'Salto do Batedor',
    originalName: "Scout's Pounce",
    level: 10,
    archetypeId: 'archetype-scout',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_SCO.id,
    prereqName: DED_SCO.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Escondido ou indetectado por todos os oponentes, e a pelo menos 3 m de qualquer inimigo',
      },
    ],
    description:
      'Desloque-se até o Deslocamento e Golpeie duas vezes. Se estava escondido ou despercebido pelo alvo, ele fica desprevenido contra os dois ataques. Penalidade de ataque múltiplo normal.',
    actionType: 'two',
    sourcePage: 212,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6399',
  }),
  f({
    id: 'feat-scout-camouflage',
    name: 'Camuflagem',
    originalName: 'Camouflage',
    level: 12,
    archetypeId: 'archetype-scout',
    prereqId: DED_SCO.id,
    prereqName: DED_SCO.name,
    description:
      'Em terreno natural, pode Esconder-se e Furtar-se mesmo sem cobertura ou estar oculto.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 156,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=261',
  }),
]

const scrollTricksterArchetypeFeats: Feat[] = [
  f({
    id: DED_SCR.id,
    name: DED_SCR.name,
    originalName: 'Scroll Trickster Dedication',
    level: 2,
    archetypeId: 'archetype-scroll-trickster',
    isDedication: true,
    description:
      'Ganha o feito Trapacear Item Mágico. +2 de circunstância em testes para Trapacear pergaminhos. Falha crítica para Trapacear um pergaminho vira falha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Trapacear Item Mágico',
        actionType: 'one',
        description:
          'Ganha Trapacear Item Mágico. +2 para Trapacear pergaminhos. Falha crítica em pergaminho vira falha.',
      },
      { kind: 'circumstanceBonus', value: 2, appliesTo: 'Trapacear Item Mágico em pergaminhos' },
    ],
    extraPrereq: [
      {
        kind: 'text',
        label: 'Treinado em Arcanismo, Natureza, Ocultismo ou Religião',
      },
    ],
    sourcePage: 213,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=262',
  }),
  f({
    id: 'feat-scroll-trickster-basic-scroll-cache',
    name: 'Reserva Básica de Pergaminhos',
    originalName: 'Basic Scroll Cache',
    level: 6,
    archetypeId: 'archetype-scroll-trickster',
    prereqId: DED_SCR.id,
    prereqName: DED_SCR.name,
    description:
      'Nas preparações, crie um pergaminho temporário de 1º posto (magia comum, com acesso, ou que você conjure; treinado na perícia de pelo menos uma tradição dela). Pode Aprender uma Magia para ampliar a lista mesmo sem ser conjurador. O pergaminho perde a magia na próxima preparação e não serve para Aprender a Magia. No 8º, um segundo pergaminho de 2º posto. Você escolhe as magias; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Pergaminhos temporários',
        description:
          '1 pergaminho de 1º por dia; +1 de 2º no 8º. Você escolhe as magias nas preparações.',
      },
    ],
    sourcePage: 213,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=262',
  }),
  f({
    id: 'feat-scroll-trickster-skim-scroll',
    name: 'Folhear Pergaminho',
    originalName: 'Skim Scroll',
    level: 8,
    archetypeId: 'archetype-scroll-trickster',
    prereqId: DED_SCR.id,
    prereqName: DED_SCR.name,
    description: 'Interaja para sacar um pergaminho e então Trapacear Item Mágico nele.',
    actionType: 'one',
    sourcePage: 213,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=262',
  }),
  f({
    id: 'feat-scroll-trickster-expert-scroll-cache',
    name: 'Reserva Perita de Pergaminhos',
    originalName: 'Expert Scroll Cache',
    level: 12,
    archetypeId: 'archetype-scroll-trickster',
    prereqId: 'feat-scroll-trickster-basic-scroll-cache',
    prereqName: 'Reserva Básica de Pergaminhos',
    description:
      'Além dos da Reserva Básica: um pergaminho de 3º. No 14º, um de 4º. No 16º, um de 5º. Você escolhe as magias.',
    sourcePage: 213,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=262',
  }),
  f({
    id: 'feat-scroll-trickster-master-scroll-cache',
    name: 'Reserva Mestra de Pergaminhos',
    originalName: 'Master Scroll Cache',
    level: 18,
    archetypeId: 'archetype-scroll-trickster',
    prereqId: 'feat-scroll-trickster-expert-scroll-cache',
    prereqName: 'Reserva Perita de Pergaminhos',
    description:
      'Além das reservas Básica e Perita: um pergaminho de 6º. No 20º, um de 7º. Você escolhe as magias.',
    sourcePage: 213,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=262',
  }),
]

const scroungerArchetypeFeats: Feat[] = [
  f({
    id: DED_SCG.id,
    name: DED_SCG.name,
    originalName: 'Scrounger Dedication',
    level: 2,
    archetypeId: 'archetype-scrounger',
    isDedication: true,
    description:
      'Pode Fabricar sem ferramentas ou oficina. Não precisa de livro físico: memoriza as fórmulas (custo de aprender igual). Ganha Juntar nas Coxas (exploração, 10 minutos): crie um item temporário comum, não mágico, de no máximo metade do seu nível — arma, armadura ou equipamento de aventura não consumível (ou 10 munições de um tipo). Item de má qualidade; você pode escolher uma criatura que não sofre a penalidade. Dura 1d4 horas (o MJ rola em segredo). Você escolhe o item e para quem ele é feito.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Juntar nas Coxas',
        description:
          'Exploração, 10 minutos. Item temporário comum não mágico ≤ metade do nível. 1d4 horas. Você escolhe o item.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ofício' },
    ],
    sourcePage: 214,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=263',
  }),
  f({
    id: 'feat-scrounger-reverse-engineering',
    name: 'Engenharia Reversa',
    originalName: 'Reverse Engineering',
    level: 4,
    archetypeId: 'archetype-scrounger',
    prereqId: DED_SCG.id,
    prereqName: DED_SCG.name,
    description:
      '+2 de circunstância em Ofício para engenharia reversa de fórmula. Pode tentar após 1 dia de preparo em vez de 2. Sucesso crítico: pode reassentar o item original junto com a fórmula (em vez de fórmula + metade do valor em matéria-prima).',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Ofício para engenharia reversa de fórmula',
      },
    ],
    sourcePage: 214,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=263',
  }),
  f({
    id: 'feat-scrounger-magical-scrounger',
    name: 'Catador Mágico',
    originalName: 'Magical Scrounger',
    level: 6,
    archetypeId: 'archetype-scrounger',
    prereqId: DED_SCG.id,
    prereqName: DED_SCG.name,
    description:
      '1/dia, Juntar nas Coxas um item mágico temporário: comum, mágico, ≤ metade do nível, que possa ser segurado, empunhado ou vestido. Requisitos de Ofício valem. Não cria consumível, runa nem item com runas. Se precisar vestir ou afixar, removê-lo destrói o item. Você escolhe o item.',
    frequency: '1/dia',
    sourcePage: 214,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=263',
  }),
  f({
    id: 'feat-scrounger-expert-disassembly',
    name: 'Desmontagem Perita',
    originalName: 'Expert Disassembly',
    level: 7,
    archetypeId: 'archetype-scrounger',
    prereqId: DED_SCG.id,
    prereqName: DED_SCG.name,
    description:
      'Pode usar Ofício no lugar de Furtividade para Desativar um Dispositivo ou Abrir uma Fechadura.',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'expert' },
      { kind: 'text', label: 'Perito em Ofício' },
    ],
    sourcePage: 214,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=263',
  }),
]

export const archetypeFeatsGeneralRemaster5: Feat[] = [
  ...poisonerArchetypeFeats,
  ...ritualistArchetypeFeats,
  ...scoutArchetypeFeats,
  ...scrollTricksterArchetypeFeats,
  ...scroungerArchetypeFeats,
]
