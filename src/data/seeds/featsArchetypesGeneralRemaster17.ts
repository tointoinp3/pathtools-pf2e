/** Gerais Remaster: Vanguarda dos Cinco Sopros, Necrologista, Despertador do Mundo, Emissário Rivethun, Invocador Rivethun. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  SOURCE_BATTLECRY_ID,
  SOURCE_DIVINE_MYSTERIES_ID,
  SOURCE_IMPOSSIBLE_MAGIC_ID,
  SOURCE_TIAN_XIA_CG_ID,
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
    sourceId: opts.sourceId ?? SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_FIVE = {
  id: 'feat-five-breath-dedication',
  name: 'Dedicação de Vanguarda dos Cinco Sopros',
}
const DED_NECRO = { id: 'feat-necrologist-dedication', name: 'Dedicação de Necrologista' }
const DED_WORLD = {
  id: 'feat-world-rouser-dedication',
  name: 'Dedicação de Despertador do Mundo',
}
const DED_EMIS = {
  id: 'feat-rivethun-emissary-dedication',
  name: 'Dedicação de Emissário Rivethun',
}
const DED_INV = {
  id: 'feat-rivethun-invoker-dedication',
  name: 'Dedicação de Invocador Rivethun',
}

const RIVETHUN_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-rivethun-emissary-archetype',
  label: 'Magias de foco de Emissário Rivethun',
  style: 'focusOnly',
  tradition: 'divine',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  classOriginalName: 'Rivethun Emissary',
  features: { focusPool: true },
}

const fiveBreathArchetypeFeats: Feat[] = [
  f({
    id: DED_FIVE.id,
    name: DED_FIVE.name,
    originalName: 'Five-breath Vanguard Dedication',
    level: 6,
    archetypeId: 'archetype-five-breath-vanguard',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Duas das cinco posturas elementais (Sangue de Ferro, Montanha, Ondulação Reflexiva, Chama Alimentada, Floresta Emaranhada). Acesso: origem Tian Xia ou exposição ao elementalismo Tian.',
      },
    ],
    description:
      'Você flui como o ciclo elemental, trocando postura e técnica a cada instante. Ganha Ciclar Postura Elemental (1 ação). Requisito: você está em uma das posturas elementais (Sangue de Ferro/metal, Montanha/terra, Ondulação Reflexiva/água, Chama Alimentada/fogo, Floresta Emaranhada/madeira). Efeito: Caminhe ou Dê um Passo e então entre em uma postura elemental diferente da atual. Você escolhe o movimento e a nova postura; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ciclar Postura Elemental',
        description:
          '1 ação. Requisito: em postura elemental. Caminhe ou Dê um Passo e entre em outra postura elemental que você conheça. Você escolhe o movimento e a postura.',
        actionType: 'one',
      },
    ],
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 90,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=272',
  }),
  f({
    id: 'feat-five-breath-renewing-cycle',
    name: 'Ciclo Renovador',
    originalName: 'Renewing Cycle',
    level: 10,
    archetypeId: 'archetype-five-breath-vanguard',
    prereqId: DED_FIVE.id,
    prereqName: DED_FIVE.name,
    description:
      'Na primeira vez a cada rodada em que Ciclar Postura Elemental, ganha PV temporários iguais à metade do seu nível até o início do seu próximo turno. Depois de ganhar PV temporários por entrar em uma postura elemental específica, não ganha de novo ao entrar nela até ter entrado em todas as outras posturas elementais que conhece ou passarem 10 minutos (o que ocorrer primeiro).',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 90,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=272',
  }),
  f({
    id: 'feat-five-breath-induce-imbalance',
    name: 'Induzir Desequilíbrio',
    originalName: 'Induce Imbalance',
    level: 14,
    archetypeId: 'archetype-five-breath-vanguard',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_FIVE.id,
    prereqName: DED_FIVE.name,
    extraPrereq: [{ kind: 'text', label: 'Você está em uma postura elemental' }],
    description:
      'Seus golpes desequilibram as energias elementais do corpo. Golpeie o alvo com o ataque desarmado da postura elemental atual. Em um sucesso, o alvo faz Fortitude contra sua CD de classe: falha = desajeitado 2 até o fim do seu próximo turno; falha crítica = desajeitado 3 por 1 minuto. Elementais sofrem −2 de circunstância na salvaguarda.',
    actionType: 'two',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 90,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=272',
  }),
  f({
    id: 'feat-five-breath-protective-cycle',
    name: 'Ciclo Protetor',
    originalName: 'Protective Cycle',
    level: 16,
    archetypeId: 'archetype-five-breath-vanguard',
    prereqId: DED_FIVE.id,
    prereqName: DED_FIVE.name,
    extraPrereq: [{ kind: 'text', label: 'Você está em uma postura elemental' }],
    description:
      'Reage ao dano fluindo para uma postura com novas vantagens. Ciclar Postura Elemental e ganha +2 de circunstância na CA até o fim do seu próximo turno. Você escolhe a nova postura; o motor não escolhe.',
    actionType: 'reaction',
    trigger: 'Você toma dano de um ataque.',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 90,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=272',
  }),
  f({
    id: 'feat-five-breath-one-death',
    name: 'Cinco Sopros, Uma Morte',
    originalName: 'Five Breaths, One Death',
    level: 18,
    archetypeId: 'archetype-five-breath-vanguard',
    prereqId: 'feat-five-breath-induce-imbalance',
    prereqName: 'Induzir Desequilíbrio',
    extraPrereq: [
      { kind: 'text', label: 'Você está em uma postura elemental; o alvo está sob Induzir Desequilíbrio' },
    ],
    description:
      'Cicla os elementos num combo devastador. Golpeie o alvo com o desarmado da postura atual, Ciclar Postura Elemental, então Golpeie com o desarmado da nova postura. Continue a ciclar e Golpear até ter feito um Golpe com o desarmado de cada postura elemental que conhece, aplicando a penalidade de ataques múltiplos normalmente. Se acertar o alvo com os cinco Golpes elementais desta habilidade, ele faz Fortitude contra sua CD de classe ou morre (efeito de morte: cada órgão associado a um elemento cessa).',
    actionType: 'two',
    frequency: '1 vez a cada 10 minutos',
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 90,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=272',
  }),
]

const necrologistArchetypeFeats: Feat[] = [
  f({
    id: DED_NECRO.id,
    name: DED_NECRO.name,
    originalName: 'Necrologist Dedication',
    level: 6,
    archetypeId: 'archetype-necrologist',
    isDedication: true,
    rarity: 'rare',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Capaz de conjurar magias com espaços de magia; capaz de conjurar conjurar morto-vivo',
      },
    ],
    description:
      'Estudos das listas dos mortos permitem chamar uma horda com uma breve invocação. Ganha Erguer a Horda (2 ações, concentração, mágico, manipular, 1/10 min) e Assalto da Multidão (1 ação, concentração) enquanto a horda estiver erguida. A conexão impede companheiro animal ou outro companheiro (seguidor etc.); se uma habilidade permitir mais de um seguidor, a horda conta como um. A horda não ataca você nem aliados. Erguida: Enorme, Deslocamento 6 m, traços sem mente e morto-vivo; pode ser atacada; não compartilha espaço (salvo feitos). Usa sua CA, salvaguardas e estatísticas defensivas (CDs de perícia); imune a agarrado, caído e imobilizado. Resistência a dano físico igual ao nível; fraqueza a área e respingo igual ao nível. Dano que a horda tomaria é aplicado a você; se um efeito atingir você e a horda, toma o dano uma vez (o maior). Erguer a Horda: a horda surge em espaço desocupado a 9 m. Escolha esqueletos ou zumbis (afeta o dano do Assalto). Permanece até o fim do seu próximo turno; Sustente até 1 minuto. Encerra se terminar o turno a mais de 36 m. Ao erguer e a cada Sustentar, a horda pode Caminhar. Ao encerrar, os mortos-vivos desabam e apodrecem (não podem ser alvos nem agir). Assalto da Multidão: cada inimigo numa emanação de 1,5 m da horda toma 2d6 de concussão (zumbis) ou cortante (esqueletos), Reflexos básico contra sua CD de magia. No 10º e a cada 4 níveis, +2d6. Você escolhe o tipo ao erguer; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'necrologist-horde-type',
        options: [
          { id: 'skeleton', label: 'Esqueletos (cortante no Assalto da Multidão)' },
          { id: 'zombie', label: 'Zumbis (concussão no Assalto da Multidão)' },
        ],
        hint: 'Tipo atual ao Erguer a Horda. Pode mudar a cada uso (e com Mudar a Horda). Espíritos exigem Canto Fantasma. O motor não escolhe.',
        abilityName: 'Horda: {choice}',
        abilityDescription: 'Tipo atual da horda erguida. Você escolhe ao erguer.',
      },
      {
        kind: 'specialAbility',
        name: 'Erguer a Horda',
        description:
          '2 ações, 1/10 min. Horda Enorme a 9 m (Deslocamento 6 m). Esqueletos ou zumbis. Sustente até 1 minuto; encerra a mais de 36 m. Ao erguer/Sustentar, a horda pode Caminhar. Dano da horda vai para você.',
        actionType: 'two',
      },
      {
        kind: 'specialAbility',
        name: 'Assalto da Multidão',
        description:
          '1 ação. Inimigos na emanação de 1,5 m: 2d6 concussão (zumbis) ou cortante (esqueletos), Reflexos básico vs CD de magia. +2d6 no 10º e a cada 4 níveis.',
        actionType: 'one',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 66,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-dismal-harvest',
    name: 'Colheita Lúgubre',
    originalName: 'Dismal Harvest',
    level: 8,
    archetypeId: 'archetype-necrologist',
    traits: ['Arquétipo', 'Concentração', 'Mágico'],
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description:
      'Os últimos suspiros dos inimigos alimentam seu poder. Ganha 15 PV temporários por 1 minuto. Os PV temporários aumentam em 5 no 10º nível e a cada 2 níveis seguintes.',
    actionType: 'free',
    trigger:
      'Sua última ação foi um Assalto da Multidão da horda que reduziu ao menos uma criatura viva a 0 PV.',
    frequency: '1 vez por rodada',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 66,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-grasping-corpses',
    name: 'Cadáveres Agarradores',
    originalName: 'Grasping Corpses',
    level: 8,
    archetypeId: 'archetype-necrologist',
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description:
      'Os zumbis ou esqueletos da horda deixam os inimigos cambaleando. Uma criatura danificada pelo Assalto da Multidão fica desprevenida até o início do seu próximo turno.',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 66,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-shambling-march',
    name: 'Marcha Cambaleante',
    originalName: 'Shambling March',
    level: 8,
    archetypeId: 'archetype-necrologist',
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description: 'A horda marcha no ritmo do seu comando. Aumente o Deslocamento da horda em 3 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Deslocamento da horda +3 m',
        description: 'A horda erguida tem +3 m de Deslocamento (base 6 m). Não altera o seu Deslocamento.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 66,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-deathguard',
    name: 'Guarda da Morte',
    originalName: 'Deathguard',
    level: 10,
    archetypeId: 'archetype-necrologist',
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description:
      'Membros podres, ossos ou ectoplasma da horda encobrem a visão. Você e aliados podem ocupar o mesmo espaço da horda; ao fazê-lo, ficam ocultos para todas as criaturas.',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-ghostsong',
    name: 'Canto Fantasma',
    originalName: 'Ghostsong',
    level: 10,
    archetypeId: 'archetype-necrologist',
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description:
      'Compreende a dor e a fúria dos espíritos e pode erguê-los. Ao Erguer a Horda, pode escolher espíritos em vez de esqueletos ou zumbis. A horda ganha o traço incorpóreo e imunidade a doença, veneno e dano de precisão; o Assalto da Multidão causa dano de vazio. Você escolhe o tipo ao erguer; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Horda de espíritos',
        description:
          'Opção extra ao Erguer a Horda: incorpórea, imune a doença/veneno/precisão; Assalto causa vazio.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-preserve-horde',
    name: 'Preservar a Horda',
    originalName: 'Preserve the Horde',
    level: 10,
    archetypeId: 'archetype-necrologist',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    extraPrereq: [{ kind: 'text', label: 'Sua horda está erguida' }],
    description:
      'Invocar outros mortos-vivos não faz você perder o foco para manter a horda. Sustente a horda.',
    actionType: 'free',
    trigger: 'Você conjura conjurar morto-vivo.',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-danse-macabre',
    name: 'Dança Macabra',
    originalName: 'Danse Macabre',
    level: 12,
    archetypeId: 'archetype-necrologist',
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description:
      'A horda arrasta vítimas enquanto avança. Ela Caminha até o Deslocamento e pode atravessar espaços de criaturas Grandes ou menores, mas deve terminar em espaço desocupado. Cada criatura cujo espaço atravessar sofre o Assalto da Multidão (Reflexos básico). Quem falhar também é Reposicionado para um quadrado desocupado à sua escolha adjacente à posição final da horda. Não pode mover a criatura para dentro ou através de obstáculos. Você escolhe o caminho e os quadrados; o motor não escolhe.',
    actionType: 'two',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-shift-horde',
    name: 'Mudar a Horda',
    originalName: 'Shift Horde',
    level: 12,
    archetypeId: 'archetype-necrologist',
    traits: ['Arquétipo', 'Manipular'],
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description:
      'Com um gesto, a horda atual desaba e outra sobe no lugar. Sustente a horda, dispersando o grupo atual e substituindo por outro tipo de morto-vivo a que você tenha acesso (esqueletos, zumbis ou espíritos com Canto Fantasma). Você escolhe o novo tipo; o motor não escolhe.',
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-wailing-dead',
    name: 'Mortos Uivantes',
    originalName: 'Wailing Dead',
    level: 12,
    archetypeId: 'archetype-necrologist',
    prereqId: 'feat-necrologist-ghostsong',
    prereqName: 'Canto Fantasma',
    extraPrereq: [{ kind: 'text', label: 'Horda de espíritos erguida' }],
    description:
      'As vozes dos espíritos que comanda despertam medo. Sustente a horda e mande os espíritos uivar em uníssono. Cada inimigo vivo numa emanação de 6 m da horda toma 5d10 de dano mental, conforme Vontade contra sua CD de magia. O dano aumenta em 1d10 no 14º e a cada 2 níveis. Crítico: imune. Sucesso: metade do dano e amedrontado 1. Falha: dano total e amedrontado 2. Falha crítica: dano dobrado e amedrontado 3.',
    actionType: 'two',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-death-rattle',
    name: 'Último Suspiro',
    originalName: 'Death Rattle',
    level: 14,
    archetypeId: 'archetype-necrologist',
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    description:
      'Quando a horda volta ao descanso, a partida puxa os próximos para a morte. Dispense a horda erguida; ela puxa energia vital ao desabar. Cada criatura viva no espaço da horda ou numa emanação de 1,5 m faz Fortitude contra sua CD de magia ou fica drenado 1 (drenado 2 em falha crítica).',
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
  f({
    id: 'feat-necrologist-horde-grip',
    name: 'No Aperto da Horda',
    originalName: "In the Horde's Grip",
    level: 14,
    archetypeId: 'archetype-necrologist',
    prereqId: DED_NECRO.id,
    prereqName: DED_NECRO.name,
    extraPrereq: [{ kind: 'text', label: 'Horda de esqueletos ou zumbis erguida' }],
    description:
      'Garras e mãos podres agarram e rasgam. Comande a horda a fazer Assalto da Multidão. Em vez de desprevenida, uma criatura que tome dano físico por falhar na salvaguarda fica agarrada pela horda (imobilizado/restrained em falha crítica). A CD para Escapar é sua CD de magia. Criaturas agarradas pela horda que falharem contra o Assalto da Multidão tomam 2d6 de sangramento persistente.',
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=330',
  }),
]

const worldRouserArchetypeFeats: Feat[] = [
  f({
    id: DED_WORLD.id,
    name: DED_WORLD.name,
    originalName: 'World Rouser Dedication',
    level: 2,
    archetypeId: 'archetype-world-rouser',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Natureza' },
    ],
    description:
      'Sabe despertar o mundo ao redor. Ganha Despertar o Mundo (1 ação, concentração, primordial). A CD das habilidades deste arquétipo é a maior entre CD de classe e CD de magia (CD de despertador do mundo). Despertar o Mundo: flora, fauna e elementos numa explosão de 3 m a até 9 m se agitam. Essa área é o mundo despertado. Nela, você e aliados ganham +1 de circunstância em Atletismo e Acrobacia, e você ganha +1 de circunstância em Natureza para Recordar Conhecimento sobre criaturas e perigos na área. Dura 10 minutos; pode Dispensar. 1/rodada em turnos seguintes, Sustente para aumentar a explosão em 3 m. Só uma área por vez; usar de novo normaliza a primeira. Você escolhe o centro; o motor não escolhe.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo:
          'Acrobacia e Atletismo na área do mundo despertado; Natureza para Recordar Conhecimento na área',
      },
      {
        kind: 'specialAbility',
        name: 'Despertar o Mundo',
        description:
          '1 ação. Explosão de 3 m a até 9 m (mundo despertado, 10 min). +1 circ. em Atletismo/Acrobacia na área (você e aliados); +1 circ. em Natureza para RK sobre criaturas/perigos na área. Sustente: +3 m na explosão. Uma área por vez. CD = a maior entre classe e magia.',
        actionType: 'one',
      },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 106,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-natures-embrace',
    name: 'Abraço da Natureza',
    originalName: "Nature's Embrace",
    level: 4,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um mundo despertado' }],
    description:
      'Chama o mundo para atrapalhar os inimigos: plantas agarram, vento ou correnteza empurram, o chão cede. O mundo despertado vira terreno difícil para inimigos até o início do seu próximo turno.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 106,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-whispers',
    name: 'O Mundo Sussurra',
    originalName: 'The World Whispers',
    level: 4,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um mundo despertado' }],
    description:
      'O mundo despertado fala das criaturas ocultas. Procure no mundo despertado. Se tiver sucesso ou sucesso crítico contra uma criatura que estava não detectada por você, Aponte a criatura a quaisquer aliados no mundo despertado. Ao Apontar assim, a ação não tem os traços visual nem manipular, mas os aliados ainda precisam ouvir e entender você.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 106,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-slumber',
    name: 'Tudo Volta ao Sono',
    originalName: 'All Returns to Slumber',
    level: 6,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um mundo despertado' }],
    description:
      'O mundo despertado volta a dormir e impõe a paz do sono profundo. Dispense o mundo despertado; todas as criaturas na área fazem Vontade contra sua CD de despertador. Animais, feras e plantas nativos deste mundo tratam o resultado como um grau pior. Depois, ficam imunes a esta habilidade por 1 hora. Sucesso: sem efeito. Falha: não pode usar reações por 1 rodada. Falha crítica: como falha, e lento 1.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 106,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-sheltering-hand',
    name: 'Mão Protetora',
    originalName: 'Sheltering Hand',
    level: 6,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um mundo despertado' }],
    description:
      'Animais, plantas e a terra se interpõem entre vocês e o perigo. Você e aliados no mundo despertado ganham cobertura contra inimigos de que você está ciente até o início do seu próximo turno. 1 ação: cobertura menor. 2 ações: cobertura padrão. Você escolhe quantas ações gastar; o motor não escolhe.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 106,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-dust-cloud',
    name: 'Nuvem de Poeira',
    originalName: 'Dust Cloud',
    level: 8,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um mundo despertado' }],
    description:
      'Poeira e pólen enchem o mundo despertado. Todas as criaturas na área ficam ocultas, e as de fora ficam ocultas para as de dentro, até o início do seu próximo turno. Quem terminar o turno na área faz Fortitude contra sua CD de despertador: falha = ofuscado até o fim do próximo turno; falha crítica = cego.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-wake-tremble',
    name: 'Despertar e Tremer',
    originalName: 'Wake and Tremble',
    level: 8,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    description:
      'O mundo acorda com um convulso. Todas as outras criaturas na área quando você Despertar o Mundo fazem Reflexos contra sua CD de despertador. Sucesso: sem efeito. Falha: cai e fica caído. Falha crítica: como falha, e enjoado 1.',
    actionType: 'free',
    trigger: 'Você usa Despertar o Mundo.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-hush',
    name: 'Um Silêncio Cai Sobre o Mundo',
    originalName: 'A Hush Falls Over the World',
    level: 10,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um mundo despertado' }],
    description:
      'O som é absorvido no mundo despertado até o início do seu próximo turno. Criaturas na área ficam escondidas para audição imprecisa ou ocultas para audição precisa. Quem na área tentar magia ou efeito com traço auditivo ou sônico precisa de teste plano CD 4; falha = o efeito é interrompido. Sempre que uma criatura na área for afetada por efeito auditivo ou sônico, teste plano CD 16: sucesso = não é afetada por essa parte (outros aspectos do efeito ainda valem).',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-wilderness',
    name: 'Venha do Ermo',
    originalName: 'Come in From the Wilderness',
    level: 10,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Aliado disposto no chão no mundo despertado' }],
    description:
      'Um aliado disposto no chão no mundo despertado é envolvido pela terra. Para cada fonte de dano persistente, pode testar imediatamente para se recuperar (com a redução de CD de assistência adequada). Enquanto engolido, fica paralisado e não pode ser alvo nem afetado por efeitos novos (efeitos contínuos seguem). No início do seu próximo turno, recupera 6d8 PV e emerge no local anterior (se ocupado, é empurrado para o espaço disponível mais próximo). Depois fica imune até suas próximas preparações diárias. Você escolhe o aliado; o motor não escolhe.',
    actionType: 'two',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-devours',
    name: 'O Mundo Devora',
    originalName: 'The World Devours',
    level: 12,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um mundo despertado' }],
    description:
      'O chão do mundo despertado se abre para consumir uma criatura em pé nele (Reflexos vs CD de despertador). Média ou menor; Grande ou menor se a explosão for de 6 m; Enorme ou menor se for de 9 m ou mais. Se já houver criatura agarrada ou devorada, ela é libertada automaticamente. Se o mundo despertado acabar, libertação automática. Crítico: sem efeito. Sucesso: 3d6 de concussão. Falha: 6d6 de concussão e agarrada pela terra (Escapar vs CD de despertador). Falha crítica: puxada para a terra (6d6 de concussão, devorada: agarrada, lento 1, 6d6 de concussão no fim de cada turno, não pode ser alvo). Escapar também pode ser Natureza; com Deslocamento de escavar, Escapa automaticamente e move até esse Deslocamento. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'two',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
  f({
    id: 'feat-world-rouser-roar',
    name: 'Desperta com um Rugido',
    originalName: 'Awake With a Roar',
    level: 14,
    archetypeId: 'archetype-world-rouser',
    prereqId: DED_WORLD.id,
    prereqName: DED_WORLD.name,
    description:
      'Ao Despertar o Mundo, ele acorda com um brado que atordoa os desavisados. Todos os inimigos na área fazem Vontade contra sua CD de despertador. Quem fizer essa salvaguarda ou observar a habilidade fica imune por 24 horas. Crítico: sem efeito. Sucesso: amedrontado 1. Falha: amedrontado 2 e atordoado 1. Falha crítica: amedrontado 3 e atordoado 1.',
    actionType: 'free',
    trigger: 'Você usa Despertar o Mundo.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 107,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=396',
  }),
]

const rivethunEmissaryArchetypeFeats: Feat[] = [
  f({
    id: DED_EMIS.id,
    name: DED_EMIS.name,
    originalName: 'Rivethun Emissary Dedication',
    level: 2,
    archetypeId: 'archetype-rivethun-emissary',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'diplomacy', rank: 'trained' },
      { kind: 'skillRank', skillId: 'religion', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Diplomacia e Religião. Acesso: seguidores de Rivethun.' },
    ],
    description:
      'Emissário Rivethun em prática, hábil em interagir e vincular-se a espíritos. Perito em Diplomacia e Religião. Ganha Vincular-se ao Espírito (exploração, 10 min, concentração) e a magia de foco suplicar ao espírito. Se ainda não tiver, ganha reserva de foco (Refoco: nutrir seu poço de poder espiritual). Magias de foco Rivethun são divinas; treinado em ataque e CD de magia. Atributo-chave: Sabedoria. Vincular-se ao Espírito: vínculo com criatura ao menos amistosa (sapiente precisa consentir e pode romper como ação livre de concentração) ou com o terreno em que está; 10 minutos adjacente à criatura ou no terreno. Dura enquanto estiver a 1,5 km, até usar de novo ou até as preparações diárias. Precisa do vínculo para conjurar suplicar ao espírito. Você escolhe criatura ou terreno e os nomeia; o motor não escolhe.',
    effects: [
      { kind: 'skillRank', skillId: 'diplomacy', rank: 'expert' },
      { kind: 'skillRank', skillId: 'religion', rank: 'expert' },
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: RIVETHUN_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'rivethun-emissary-bond',
        options: [
          { id: 'creature', label: 'Criatura (ao menos amistosa; sapiente precisa consentir)' },
          { id: 'terrain', label: 'Terreno em que você está' },
        ],
        hint: 'Tipo do vínculo atual. Nomeie a criatura ou o terreno. O motor não escolhe.',
        abilityName: 'Vínculo: {choice}',
        abilityDescription: 'Necessário para conjurar suplicar ao espírito.',
      },
      {
        kind: 'specialAbility',
        name: 'Vincular-se ao Espírito',
        description:
          'Exploração, 10 min. Vínculo com criatura amistosa ou terreno atual. Dura a 1,5 km, até novo vínculo ou preparações. Você escolhe e nomeia.',
      },
      {
        kind: 'specialAbility',
        name: 'Suplicar ao espírito',
        description: 'Magia de foco divina (Sabedoria). Requer vínculo ativo.',
      },
    ],
    sourcePage: 292,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-familiar',
    name: 'Familiar do Emissário',
    originalName: 'Emissary Familiar',
    level: 4,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    description:
      'Forja vínculo místico com um espírito ou cria um de um fragmento da própria alma. Ganha um familiar. Se já tiver familiar, ganha o feito Familiar Aprimorado. O familiar ganha duas habilidades extras por dia; uma delas deve ser a habilidade de mestre Sincronizar Espírito: 1/rodada, Sustente para sincronizar até o início do seu próximo turno; enquanto sincronizado, Golpes e magias sem duração que causem dano causam dano de espírito no lugar do dano normal. Indique o familiar em Companheiros; o motor não escolhe as habilidades além da obrigatória.',
    effects: [
      { kind: 'familiarAbilitySlots', extra: 2 },
      {
        kind: 'specialAbility',
        name: 'Familiar (ou Familiar Aprimorado) e Sincronizar Espírito',
        description:
          'Ganha familiar; se já tinha, trata como Familiar Aprimorado. Uma das duas habilidades extras deve ser Sincronizar Espírito. Você escolhe as demais.',
      },
    ],
    sourcePage: 292,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-domain-spirit',
    name: 'Espírito de Domínio',
    originalName: 'Domain Spirit',
    level: 6,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    extraPrereq: [{ kind: 'text', label: 'Vínculo ativo com Vincular-se ao Espírito' }],
    description:
      'Vínculo intenso de 24 h (a 9 m da criatura ou no terreno; sapiente consente e pode romper). Esse espírito é seu espírito de domínio (um por vez; distância não enfraquece). Sempre pode escolher cura ou alma. Criatura: ambição, confiança, família, poder, proteção ou trapaça. Terreno: ar, cidades, escuridão, terra, natureza, viagem, água ou madeira. Se o espírito tiver traço com o mesmo nome de um domínio, esse domínio entra na lista; o MJ pode acrescentar. O domínio precisa ter ligação clara com o espírito (o MJ decide). Ganha a magia de domínio inicial (foco Rivethun). Trocar de espírito de domínio leva 24 h (sem magias de domínio durante a comunhão). Você escolhe espírito e domínio; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: RIVETHUN_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'rivethun-emissary-domain',
        options: [
          { id: 'healing', label: 'Cura (sempre disponível)' },
          { id: 'soul', label: 'Alma (sempre disponível)' },
          { id: 'ambition', label: 'Ambição (criatura)' },
          { id: 'confidence', label: 'Confiança (criatura)' },
          { id: 'family', label: 'Família (criatura)' },
          { id: 'might', label: 'Poder (criatura)' },
          { id: 'protection', label: 'Proteção (criatura)' },
          { id: 'trickery', label: 'Trapaça (criatura)' },
          { id: 'air', label: 'Ar (terreno)' },
          { id: 'cities', label: 'Cidades (terreno)' },
          { id: 'darkness', label: 'Escuridão (terreno)' },
          { id: 'earth', label: 'Terra (terreno)' },
          { id: 'nature', label: 'Natureza (terreno)' },
          { id: 'travel', label: 'Viagem (terreno)' },
          { id: 'water', label: 'Água (terreno)' },
          { id: 'wood', label: 'Madeira (terreno)' },
          { id: 'other', label: 'Outro (traço do espírito ou lista do MJ; nomeie)' },
        ],
        hint: 'Domínio ligado ao espírito de domínio. Só opções da lista do tipo (criatura/terreno) mais cura/alma. O motor não escolhe.',
        abilityName: 'Domínio: {choice}',
        abilityDescription: 'Magia de domínio inicial (foco Rivethun).',
      },
    ],
    sourcePage: 292,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-enhanced-familiar',
    name: 'Familiar Aprimorado',
    originalName: 'Enhanced Familiar',
    level: 6,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem um familiar' }],
    description:
      'Quatro habilidades de familiar ou mestre por dia, em vez de duas. Bruxa: some as habilidades bônus de bruxa. Mago com tese de familiar aprimorado: a base (antes da tese) passa a quatro.',
    effects: [{ kind: 'familiarAbilitySlots', extra: 2 }],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-incredible-familiar',
    name: 'Familiar Incrível',
    originalName: 'Incredible Familiar',
    level: 8,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: 'feat-rivethun-emissary-enhanced-familiar',
    prereqName: 'Familiar Aprimorado',
    description:
      'Seis habilidades de familiar ou mestre por dia, em vez de quatro. Bruxa: some as habilidades bônus de bruxa.',
    effects: [{ kind: 'familiarAbilitySlots', extra: 2 }],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-kaleidoscopic',
    name: 'Súplica Caleidoscópica',
    originalName: 'Kaleidoscopic Entreaty',
    level: 8,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    description:
      'Se a próxima ação for conjurar suplicar ao espírito, o espírito libera um espetáculo de cor, luz e som numa emanação de 3 m centrada em você. Cada criatura na área faz Fortitude contra sua CD de classe ou de magia. Crítico: sem efeito. Sucesso: ofuscado 1 rodada. Falha: ofuscado 1 minuto. Falha crítica: cego 1 rodada e ofuscado 1 minuto.',
    actionType: 'one',
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-devotion',
    name: 'Devoção Rivethun',
    originalName: 'Rivethun Devotion',
    level: 8,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    extraPrereq: [{ kind: 'text', label: 'Acesso: seguidores de Rivethun' }],
    description:
      'Estudo e introspecção ensinam magia que afeta o espírito. Ganha ver o invisível e elo espiritual como magias inatas divinas de 2º posto, cada uma 1/dia. Se for mestre em Religião, elo espiritual é elevado a 3º posto. Se for lendário em Religião, elo espiritual é elevado a 4º posto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ver o invisível e elo espiritual (inatos divinos, 2º, 1/dia cada)',
        description: 'Elo espiritual sobe para 3º se mestre em Religião e 4º se lendário.',
      },
    ],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-advanced-domain',
    name: 'Espírito de Domínio Avançado',
    originalName: 'Advanced Domain Spirit',
    level: 10,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: 'feat-rivethun-emissary-domain-spirit',
    prereqName: 'Espírito de Domínio',
    description:
      'A conexão com o espírito de domínio se aprofunda. Ganha a magia de domínio avançada do domínio concedido pelo espírito de domínio (foco Rivethun).',
    effects: [
      { kind: 'spellcasting', access: RIVETHUN_SPELL },
      {
        kind: 'specialAbility',
        name: 'Magia de domínio avançada',
        description: 'A magia avançada do domínio escolhido em Espírito de Domínio.',
      },
    ],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-consult',
    name: 'Consultar os Espíritos',
    originalName: 'Consult the Spirits',
    level: 12,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    description:
      '1 hora em comunhão com espíritos poderosos. Escolha conselho ou respostas. Conselho: descreva um objetivo, atividade ou evento esperado hoje; os espíritos dão pista críptica (rima ou presságio). Respostas: faça duas perguntas claras; se for fácil de responder com precisão, respondem com clareza; senão, de forma críptica. Em qualquer caso, os espíritos abençoam: +1 de status numa perícia que eles (o MJ) acreditam ser útil hoje, até o fim do dia. Você escolhe conselho ou respostas e formula o pedido; o motor não escolhe a perícia.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'rivethun-emissary-consult-mode',
        options: [
          { id: 'advice', label: 'Conselho (pista sobre um objetivo ou evento de hoje)' },
          { id: 'answers', label: 'Respostas (duas perguntas claras)' },
        ],
        hint: 'Modo da consulta. A perícia abençoada é escolhida pelos espíritos/MJ, não pelo motor.',
        abilityName: 'Consulta: {choice}',
        abilityDescription: '1 hora. +1 de status numa perícia que o MJ escolhe pelos espíritos até o fim do dia.',
      },
      {
        kind: 'specialAbility',
        name: 'Bênção dos espíritos (+1 de status numa perícia)',
        description:
          'O MJ escolhe a perícia em nome dos espíritos. Não use skillRankChoice: o motor não escolhe.',
      },
    ],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-manifold',
    name: 'Conduíte Múltiplo',
    originalName: 'Manifold Conduit',
    level: 12,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    description:
      'Pode manifestar vários espíritos de uma vez num ciclone ao redor. Ganha a magia de foco suplicar aos muitos.',
    actionType: 'one',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: RIVETHUN_SPELL },
      {
        kind: 'specialAbility',
        name: 'Suplicar aos muitos',
        description: 'Magia de foco divina Rivethun.',
        actionType: 'one',
      },
    ],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-adept',
    name: 'Adepto Rivethun',
    originalName: 'Rivethun Adept',
    level: 16,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: DED_EMIS.id,
    prereqName: DED_EMIS.name,
    description:
      'A magia espiritual se aprofunda. Pode conjurar falar com pedras e guardião espiritual como magias inatas divinas de 5º posto, cada uma 1/dia. Se for lendário em Religião, guardião espiritual é elevado a 7º posto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Falar com pedras e guardião espiritual (inatos divinos, 5º, 1/dia cada)',
        description: 'Guardião espiritual sobe para 7º se lendário em Religião.',
      },
    ],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
  f({
    id: 'feat-rivethun-emissary-embolded',
    name: 'Embelezado com Propósito Glorioso',
    originalName: 'Embolded With Glorious Purpose',
    level: 18,
    archetypeId: 'archetype-rivethun-emissary',
    prereqId: 'feat-rivethun-emissary-consult',
    prereqName: 'Consultar os Espíritos',
    description:
      'A comunhão com espíritos e poderes maiores enche o coração de propósito. Sempre que Consultar os Espíritos, ganha +1 de status em salvaguardas de Vontade até as próximas preparações diárias (+2 contra efeitos de emoção e medo). Até as próximas preparações, pode fazer cada um destes uma vez: rolar Vontade duas vezes e usar o melhor (fortuna); rolar um ataque duas vezes e usar o melhor (fortuna); rolar um teste da perícia abençoada na consulta duas vezes e usar o melhor (fortuna). A perícia do terceiro rerrolagem é a que os espíritos/MJ escolheram; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Propósito glorioso',
        description:
          'Após Consultar os Espíritos: +1 status em Vontade (+2 vs emoção/medo) até as preparações. Três rerrolagens de fortuna 1/dia (Vontade, ataque, perícia abençoada).',
      },
    ],
    sourcePage: 293,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=308',
  }),
]

const rivethunInvokerArchetypeFeats: Feat[] = [
  f({
    id: DED_INV.id,
    name: DED_INV.name,
    originalName: 'Rivethun Invoker Dedication',
    level: 2,
    archetypeId: 'archetype-rivethun-invoker',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'skillRank', skillId: 'religion', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo e Religião. Acesso: seguidores de Rivethun.' },
    ],
    description:
      'Invocador Rivethun em prática, capaz de entrar em transe que o liga física e mentalmente aos espíritos ao redor. Perito em Atletismo e Religião. Ganha o feito geral Difícil de Matar (morrendo máximo 5) e Entrar em Transe Espiritual (1 ação, concentração, divino, mental): PV temporários iguais ao nível + modificador de Constituição. O transe dura 1 minuto, até você ficar inconsciente ou Dispensar. Nele, +1 de status em Fortitude e Vontade, e Golpes corpo a corpo causam +1 de dano de espírito. Outras habilidades podem exigir o transe. Ao encerrar, perde os PV temporários restantes desta habilidade e não pode Entrar em Transe Espiritual por 1 minuto.',
    effects: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'expert' },
      { kind: 'skillRank', skillId: 'religion', rank: 'expert' },
      { kind: 'dyingMax', value: 5 },
      {
        kind: 'specialAbility',
        name: 'Entrar em Transe Espiritual',
        description:
          '1 minuto. PV temp. = nível + CON. +1 status em Fortitude e Vontade; +1 dano de espírito em Golpes corpo a corpo. Ao encerrar, 1 minuto sem repetir.',
        actionType: 'one',
      },
    ],
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-offense',
    name: 'Invocar Ofensa',
    originalName: 'Invoke Offense',
    level: 4,
    archetypeId: 'archetype-rivethun-invoker',
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    extraPrereq: [{ kind: 'text', label: 'Você está em Transe Espiritual' }],
    description:
      'Manifesta um ataque físico dos espíritos (garra de espírito animal, cipó de espírito da natureza, etc.). Ganha um ataque desarmado que causa 1d8 de dano de espírito pela duração do transe. Grupo briga; traços ágil, acuidade e mágico. No 5º, benefícios de runa de golpe; no 12º, golpe maior; no 20º, golpe máximo. Você descreve a forma; o motor não escolhe.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ataque desarmado espiritual (1d8, ágil, acuidade, mágico)',
        description:
          'Só no transe. Golpe no 5º, golpe maior no 12º, golpe máximo no 20º. Você descreve a forma.',
        actionType: 'one',
      },
    ],
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-barreling-charge',
    name: 'Investida Atrapalhadora',
    originalName: 'Barreling Charge',
    level: 6,
    archetypeId: 'archetype-rivethun-invoker',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo' },
    ],
    description:
      'Avança, afastando inimigos para alcançar o alvo. Caminhe tentando atravessar espaços inimigos. Teste de Atletismo contra a CD de Fortitude de cada criatura cujo espaço tentar atravessar: sucesso = atravessa; falha = o movimento termina antes de entrar. Depois pode Golpear, independentemente de como o Caminhar terminou. Pode Cavar, Escalar, Voar ou Nadar no lugar de Caminhar se tiver o movimento correspondente.',
    actionType: 'two',
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-leverage-anguish',
    name: 'Aproveitar a Angústia',
    originalName: 'Leverage Anguish',
    level: 6,
    archetypeId: 'archetype-rivethun-invoker',
    traits: ['Arquétipo', 'Cura'],
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    description:
      'Usa o tumulto emocional para remendar o corpo. Recupera 2d8 PV. Se for mestre em Atletismo, 4d8. Se for lendário em Atletismo, 6d8.',
    actionType: 'reaction',
    trigger:
      'Você falha ou falha criticamente numa salvaguarda contra um efeito de maldição, morte, emoção ou medo.',
    frequency: '1 vez por dia',
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-slam-down',
    name: 'Pancada ao Chão',
    originalName: 'Slam Down',
    level: 6,
    archetypeId: 'archetype-rivethun-invoker',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo' },
    ],
    description:
      'Golpe corpo a corpo para desequilibrar, seguido de rasteira. Golpeie corpo a corpo. Se acertar e causar dano, teste de Atletismo para Derrubar o alvo. Com arma corpo a corpo de duas mãos, ignore a mão livre do Derrubar. Os dois contam na penalidade de ataques múltiplos, que só sobe depois dos dois.',
    actionType: 'two',
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-defense',
    name: 'Invocar Defesa',
    originalName: 'Invoke Defense',
    level: 8,
    archetypeId: 'archetype-rivethun-invoker',
    traits: ['Arquétipo', 'Morfo'],
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    extraPrereq: [{ kind: 'text', label: 'Você está em Transe Espiritual' }],
    description:
      'Manifesta uma qualidade defensiva dos espíritos (couro grosso, casca, etc.). Escolha concussão, perfurante ou cortante. Ganha resistência igual à metade do nível a esse tipo pela duração do transe. Se usar de novo, pode escolher outro tipo, mas perde a resistência anterior. Você escolhe o tipo a cada uso; o motor não escolhe.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência espiritual (metade do nível)',
        description:
          'No transe. Escolha concussão, perfurante ou cortante a cada uso. Novo uso troca o tipo.',
        actionType: 'one',
      },
    ],
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-defy-sorrow',
    name: 'Desafiar a Tristeza',
    originalName: 'Defy Sorrow',
    level: 10,
    archetypeId: 'archetype-rivethun-invoker',
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    description:
      'A dor espiritual empurra o corpo. Ganha acelerado até o fim do seu próximo turno. A ação extra só pode ser usada para Dar um Passo ou Caminhar.',
    actionType: 'reaction',
    trigger:
      'Você toma dano mental ou de espírito, ou falha ou falha criticamente numa salvaguarda contra um efeito mental.',
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-crashing-slam',
    name: 'Pancada Esmagadora',
    originalName: 'Crashing Slam',
    level: 12,
    archetypeId: 'archetype-rivethun-invoker',
    prereqId: 'feat-rivethun-invoker-slam-down',
    prereqName: 'Pancada ao Chão',
    description:
      'Derruba o inimigo num único golpe. Ao usar Pancada ao Chão, em vez de Golpe seguido de Derrubar, pode fazer um único Golpe. Se acertar, obtém automaticamente sucesso crítico no Derrubar (sem teste). Golpe e Derrubar ainda contam na penalidade de ataques múltiplos. Se o Golpe foi com arma corpo a corpo de duas mãos, use o tamanho de dado da arma no dano do Derrubar crítico.',
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-movement',
    name: 'Invocar Movimento',
    originalName: 'Invoke Movement',
    level: 12,
    archetypeId: 'archetype-rivethun-invoker',
    traits: ['Arquétipo', 'Morfo'],
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    extraPrereq: [{ kind: 'text', label: 'Você está em Transe Espiritual' }],
    description:
      'Manifesta um modo de locomoção dos espíritos (asas, fluxo aquático, etc.). Escolha escavar, escalar, voar ou nadar. Ganha Deslocamento desse tipo igual ao Deslocamento base (metade se escolheu escavar) pela duração do transe. Se usar de novo, pode escolher outro tipo, mas perde o anterior. Você escolhe o tipo a cada uso; o motor não escolhe.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Locomoção espiritual',
        description:
          'No transe. Escolha escavar, escalar, voar ou nadar a cada uso (escavar = metade do Deslocamento). Novo uso troca o tipo.',
        actionType: 'one',
      },
    ],
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-overpowering-charge',
    name: 'Investida Dominadora',
    originalName: 'Overpowering Charge',
    level: 12,
    archetypeId: 'archetype-rivethun-invoker',
    prereqId: 'feat-rivethun-invoker-barreling-charge',
    prereqName: 'Investida Atrapalhadora',
    description:
      'Pisa nos inimigos ao passar. Quando usa Investida Atrapalhadora e atravessa com sucesso o espaço de uma criatura, ela toma dano de concussão igual ao seu modificador de Força. Em sucesso crítico, dano dobrado e desprevenida até o fim do seu próximo turno.',
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
  f({
    id: 'feat-rivethun-invoker-one-with-spirits',
    name: 'Um com os Espíritos',
    originalName: 'One with the Spirits',
    level: 16,
    archetypeId: 'archetype-rivethun-invoker',
    prereqId: DED_INV.id,
    prereqName: DED_INV.name,
    extraPrereq: [{ kind: 'text', label: 'Você está em Transe Espiritual' }],
    description:
      'Ecos e fragmentos dos espíritos invocados ao longo da vida cobrem a carne. Por 1 minuto, cura acelerada 5 e fica oculto (não pode usar essa ocultação para Esconder-se). Golpes ganham os benefícios de uma runa de toque fantasma. Sempre que causar dano com um Golpe, pode fazer o dano ser de espírito em vez do tipo usual. Se for nocauteado ou o valor de morrendo aumentar enquanto a habilidade estiver ativa, os espíritos o revivem no início do seu próximo turno com 30 PV, e Um com os Espíritos encerra imediatamente. Você escolhe quando converter o dano do Golpe; o motor não escolhe.',
    actionType: 'one',
    frequency: '1 vez por hora',
    sourcePage: 294,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=309',
  }),
]

export const archetypeFeatsGeneralRemaster17: Feat[] = [
  ...fiveBreathArchetypeFeats,
  ...necrologistArchetypeFeats,
  ...worldRouserArchetypeFeats,
  ...rivethunEmissaryArchetypeFeats,
  ...rivethunInvokerArchetypeFeats,
]
