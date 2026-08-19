/** Arquétipos gerais Remaster (Player Core 2 + feitos adicionais Remaster). Sem Legacy. */
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
  sourcePage: number
  aonUrl: string
  sourceId?: string
  isDedication?: boolean
  allowedSlotKinds?: Feat['allowedSlotKinds']
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
    sourceId: opts.sourceId ?? SOURCE_PLAYER_CORE_2_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED = {
  archaeologist: { id: 'feat-archaeologist-dedication', name: 'Dedicação de Arqueólogo' },
  archer: { id: 'feat-archer-dedication', name: 'Dedicação de Arqueiro' },
  assassin: { id: 'feat-assassin-dedication', name: 'Dedicação de Assassino' },
  bastion: { id: 'feat-bastion-dedication', name: 'Dedicação de Bastião' },
  beastmaster: { id: 'feat-beastmaster-dedication', name: 'Dedicação de Senhor das Feras' },
  blessed: { id: 'feat-blessed-one-dedication', name: 'Dedicação de Abençoado' },
  bounty: { id: 'feat-bounty-hunter-dedication', name: 'Dedicação de Caçador de Recompensas' },
  cavalier: { id: 'feat-cavalier-dedication', name: 'Dedicação de Cavalheiro' },
  celebrity: { id: 'feat-celebrity-dedication', name: 'Dedicação de Celebridade' },
  dandy: { id: 'feat-dandy-dedication', name: 'Dedicação de Dândi' },
} as const

const archaeologistArchetypeFeats: Feat[] = [
  f({
    id: DED.archaeologist.id,
    name: DED.archaeologist.name,
    originalName: 'Archaeologist Dedication',
    level: 2,
    archetypeId: 'archetype-archaeologist',
    isDedication: true,
    description:
      'Você fica perito em Sociedade e Furtividade. Ganha +1 de circunstância em Recordar Conhecimento sobre história antiga, povos e culturas.',
    effects: [
      { kind: 'skillRank', skillId: 'society', rank: 'expert' },
      { kind: 'skillRank', skillId: 'thievery', rank: 'expert' },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Recordar Conhecimento (história antiga, povos e culturas)',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'society', rank: 'trained' },
      { kind: 'skillRank', skillId: 'thievery', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Sociedade e Furtividade' },
    ],
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=237',
  }),
  f({
    id: 'feat-archaeologist-magical-scholastics',
    name: 'Escolástica Mágica',
    originalName: 'Magical Scholastics',
    level: 4,
    archetypeId: 'archetype-archaeologist',
    prereqId: DED.archaeologist.id,
    prereqName: DED.archaeologist.name,
    description:
      'Você pode conjurar detectar magia, orientação e ler aura como truques inatos ocultos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Truques inatos ocultos',
        description: 'Detectar magia, orientação e ler aura como truques inatos ocultos.',
      },
    ],
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=237',
  }),
  f({
    id: 'feat-archaeologist-settlement-scholastics',
    name: 'Escolástica de Assentamento',
    originalName: 'Settlement Scholastics',
    level: 4,
    archetypeId: 'archetype-archaeologist',
    prereqId: DED.archaeologist.id,
    prereqName: DED.archaeologist.name,
    description:
      'Escolha um assentamento específico. Ganha o feito Conhecimento Adicional na perícia de Conhecimento desse lugar e aprende um idioma comum ou incomum prevalente lá (você escolhe). Pode pegar de novo com outro assentamento.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Assentamento estudado',
        description:
          'Escolha o assentamento, o Conhecimento e o idioma. O motor não escolhe. Pode selecionar de novo.',
      },
    ],
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=237',
  }),
  f({
    id: 'feat-archaeologist-trap-finder',
    name: 'Localizador de Armadilhas',
    originalName: 'Trap Finder',
    level: 4,
    archetypeId: 'archetype-archaeologist',
    prereqId: DED.archaeologist.id,
    prereqName: DED.archaeologist.name,
    description:
      '+1 de circunstância em Percepção para achar armadilhas, CA contra ataques de armadilhas e salvaguardas contra armadilhas. Mesmo sem Buscar, recebe teste para achar armadilhas que normalmente exigem Buscar. Pode desarmar armadilhas de posto mestre em Furtividade; se for mestre, desarma as de posto lendário e os bônus sobem para +2.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Percepção, CA e salvaguardas contra armadilhas',
      },
      {
        kind: 'specialAbility',
        name: 'Sentir armadilhas',
        description:
          'Recebe teste para achar armadilhas mesmo sem Buscar. Desarma armadilhas um posto acima da sua Furtividade (mestre se treinado/perito; lendário se mestre).',
      },
    ],
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=237',
  }),
  f({
    id: 'feat-archaeologist-scholastic-identification',
    name: 'Identificação Escolástica',
    originalName: 'Scholastic Identification',
    level: 7,
    archetypeId: 'archetype-archaeologist',
    prereqId: DED.archaeologist.id,
    prereqName: DED.archaeologist.name,
    description:
      'Pode usar Sociedade para Decifrar Escrita de qualquer tipo e para Identificar Magia em item ou local com significado cultural.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sociedade para textos e magia cultural',
        description:
          'Sociedade substitui a perícia usual ao Decifrar Escrita e ao Identificar Magia de itens/locais culturais.',
      },
    ],
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=237',
  }),
  f({
    id: 'feat-archaeologist-luck',
    name: 'Sorte do Arqueólogo',
    originalName: "Archaeologist's Luck",
    level: 8,
    archetypeId: 'archetype-archaeologist',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED.archaeologist.id,
    prereqName: DED.archaeologist.name,
    description: 'Rerrole o teste falho contra a armadilha e use o novo resultado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sorte do Arqueólogo',
        actionType: 'free',
        description: '1/hora. Rerrola um teste falho contra uma armadilha.',
      },
    ],
    actionType: 'free',
    frequency: '1/hora',
    trigger: 'Você falha em um teste contra uma armadilha.',
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6250',
  }),
  f({
    id: 'feat-archaeologist-delay-trap',
    name: 'Atrasar Armadilha',
    originalName: 'Delay Trap',
    level: 10,
    archetypeId: 'archetype-archaeologist',
    prereqId: DED.archaeologist.id,
    prereqName: DED.archaeologist.name,
    description:
      'Tente emperrar a armadilha. Teste de Furtividade para Desarmar Dispositivo com resultados especiais: sucesso crítico impede ou atrasa até o início/fim do seu próximo turno; sucesso o mestre escolhe o pior; falha crítica deixa você desprevenido até o início do seu próximo turno.',
    actionType: 'reaction',
    trigger: 'Uma armadilha ao seu alcance é disparada.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 173,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4950',
  }),
  f({
    id: 'feat-archaeologist-greater-magical-scholastics',
    name: 'Escolástica Mágica Maior',
    originalName: 'Greater Magical Scholastics',
    level: 10,
    archetypeId: 'archetype-archaeologist',
    prereqId: 'feat-archaeologist-magical-scholastics',
    prereqName: 'Escolástica Mágica',
    description:
      'Pode conjurar augúrio, localizar e véu de privacidade como magias inatas ocultas, cada uma 1/dia. Véu de privacidade só em objeto e é automaticamente elevado à metade do seu nível (arredondado para cima).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magias inatas ocultas (1/dia)',
        description: 'Augúrio, localizar e véu de privacidade (só em objeto, elevado).',
      },
    ],
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=237',
  }),
]

const archerArchetypeFeats: Feat[] = [
  f({
    id: DED.archer.id,
    name: DED.archer.name,
    originalName: 'Archer Dedication',
    level: 2,
    archetypeId: 'archetype-archer',
    isDedication: true,
    description:
      'Familiaridade com armas dos grupos arco e besta: marciais contam como simples e avançadas como marciais para proficiência. Se for ao menos perito no arco ou besta que está usando, aplica a especialização crítica.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        groups: ['bow', 'crossbow'],
        martialAsSimple: true,
        advancedAsMartial: true,
      },
      {
        kind: 'specialAbility',
        name: 'Especialização crítica (arco/besta)',
        description:
          'Se for ao menos perito no arco ou besta usado, aplica o efeito de especialização crítica no acerto crítico.',
      },
    ],
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-assisting-shot',
    name: 'Tiro Auxiliar',
    originalName: 'Assisting Shot',
    level: 4,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description:
      'Faça um Golpe à distância. Se acertar, a próxima criatura além de você a atacar o mesmo alvo até o início do seu próximo turno ganha +1 de circunstância (+2 se o Golpe foi crítico).',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-crossbow-ace',
    name: 'Ás da Besta',
    originalName: 'Crossbow Ace',
    level: 4,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando uma besta com recarga 1 ou maior' }],
    description:
      'Crie uma Distração ou Abrigue-se e então Interaja para recarregar. Precisa cumprir os requisitos de Abrigar-se.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4860',
  }),
  f({
    id: 'feat-archer-point-blank-stance',
    name: 'Postura à Queima-Roupa',
    originalName: 'Point-Blank Stance',
    level: 4,
    archetypeId: 'archetype-archer',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description:
      'Com arma volley, ignora a penalidade do traço volley. Com arma à distância sem volley, +2 de circunstância no dano contra alvos no primeiro incremento de alcance.',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-quick-shot',
    name: 'Tiro Rápido',
    originalName: 'Quick Shot',
    level: 4,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description:
      'Interaja para sacar uma arma de arco ou besta carregada ou com recarga 0 e então Golpeie com ela.',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-crossbow-terror',
    name: 'Terror da Besta',
    originalName: 'Crossbow Terror',
    level: 6,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description:
      'Interaja para recarregar uma besta e então tente Intimidação para Desmoralizar. +2 de circunstância se acertou um Golpe com besta neste turno.',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-double-shot',
    name: 'Tiro Duplo',
    originalName: 'Double Shot',
    level: 6,
    archetypeId: 'archetype-archer',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando arma à distância com recarga 0' }],
    description:
      'Faça dois Golpes, cada um contra um alvo diferente, com −2. Ambos contam para a penalidade de ataques múltiplos, mas ela só aumenta depois dos dois.',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 143,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4788',
  }),
  f({
    id: 'feat-archer-parting-shot',
    name: 'Tiro de Partida',
    originalName: 'Parting Shot',
    level: 6,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    extraPrereq: [
      { kind: 'text', label: 'Empunhando arma à distância carregada ou com recarga 0' },
    ],
    description: 'Dê um Passo e então um Golpe à distância. O alvo fica desprevenido contra o ataque.',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 143,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4790',
  }),
  f({
    id: 'feat-archer-running-reload',
    name: 'Recarga em Movimento',
    originalName: 'Running Reload',
    level: 6,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description: 'Avance, dê um Passo ou Furtive-se e então Interaja para recarregar.',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-aim',
    name: 'Mira do Arqueiro',
    originalName: "Archer's Aim",
    level: 8,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description:
      'Golpe à distância com arco ou besta: +2 de circunstância no ataque e ignora oculto. Se o alvo estiver escondido, o teste plano cai de 11 para 5.',
    actionType: 'two',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-triple-shot',
    name: 'Tiro Triplo',
    originalName: 'Triple Shot',
    level: 8,
    archetypeId: 'archetype-archer',
    prereqId: 'feat-archer-double-shot',
    prereqName: 'Tiro Duplo',
    description:
      'No Tiro Duplo, os ataques podem ser no mesmo alvo. Pode gastar +1 ação para três Golpes (−4). Todos contam para a penalidade de ataques múltiplos, que só aumenta depois.',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-mobile-shot-stance',
    name: 'Postura de Tiro Móvel',
    originalName: 'Mobile Shot Stance',
    level: 10,
    archetypeId: 'archetype-archer',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description:
      'Golpes à distância não disparam Golpe Reativo nem reações a ataques à distância. Se tiver Golpe Reativo, pode usá-lo com arma à distância carregada contra criatura a até 1,5 m.',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-unobstructed-shot',
    name: 'Tiro Desimpedido',
    originalName: 'Unobstructed Shot',
    level: 10,
    archetypeId: 'archetype-archer',
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    description:
      'Tente Empurrar ou Derrubar uma criatura adjacente e então Golpeie à distância com arco ou besta. O Golpe usa a mesma penalidade de ataques múltiplos da manobra; a atividade conta como um ataque.',
    actionType: 'two',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=238',
  }),
  f({
    id: 'feat-archer-multishot-stance',
    name: 'Postura de Tiros Múltiplos',
    originalName: 'Multishot Stance',
    level: 18,
    archetypeId: 'archetype-archer',
    traits: ['Arquétipo', 'Postura'],
    prereqId: 'feat-archer-triple-shot',
    prereqName: 'Tiro Triplo',
    extraPrereq: [{ kind: 'text', label: 'Empunhando arma à distância com recarga 0' }],
    description:
      'Penalidade do Tiro Duplo cai para −1. Se você se mover, a postura acaba. Com Tiro Triplo, três Golpes ficam em −2.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 150,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4851',
  }),
  f({
    id: 'feat-archer-impossible-volley',
    name: 'Saraivada Impossível',
    originalName: 'Impossible Volley',
    level: 20,
    archetypeId: 'archetype-archer',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED.archer.id,
    prereqName: DED.archer.name,
    extraPrereq: [
      { kind: 'text', label: 'Empunhando arma à distância com volley e recarga 0' },
    ],
    description:
      'Um Golpe com −2 contra cada inimigo numa explosão de 3 m centrada no alcance volley ou além. Role o dano uma vez. Cada ataque conta para a penalidade de ataques múltiplos, que só aumenta depois de todos.',
    actionType: 'three',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 150,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4854',
  }),
]

const assassinArchetypeFeats: Feat[] = [
  f({
    id: DED.assassin.id,
    name: DED.assassin.name,
    originalName: 'Assassin Dedication',
    level: 2,
    archetypeId: 'archetype-assassin',
    isDedication: true,
    description:
      'Ganha Marcar para a Morte (3 ações, concentrar): designa uma criatura observada. +2 de circunstância em Percepção para Buscá-la e em Enganação para Fintar; ela tem −2 em Percepção para Buscar você. Contra a marca, Ataque Furtivo 1d4 de precisão (1d6 no 6º), sem aumentar os dados por nível. Se já tiver Ataque Furtivo, +1 de precisão contra a marca (+2 no 6º).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Marcar para a Morte',
        actionType: 'three',
        description:
          'Designa uma marca. Bônus contra ela e Ataque Furtivo reduzido (1d4 / 1d6 no 6º), ou +1/+2 se já tiver Ataque Furtivo.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Enganação e Furtividade' },
    ],
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=239',
  }),
  f({
    id: 'feat-assassin-expert-backstabber',
    name: 'Punhalada Experiente',
    originalName: 'Expert Backstabber',
    level: 4,
    archetypeId: 'archetype-assassin',
    prereqId: DED.assassin.id,
    prereqName: DED.assassin.name,
    description:
      'Ao Golpear um alvo desprevenido com arma backstabber, causa 2 de precisão extra em vez de 1 (4 se a arma for +3, em vez de 2).',
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=239',
  }),
  f({
    id: 'feat-assassin-poison-resistance',
    name: 'Resistência a Veneno',
    originalName: 'Poison Resistance',
    level: 4,
    archetypeId: 'archetype-assassin',
    prereqId: DED.assassin.id,
    prereqName: DED.assassin.name,
    description:
      'Resistência a veneno igual à metade do nível e +1 de status em salvaguardas contra venenos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência a veneno',
        description: 'Resistência a veneno = metade do nível; +1 de status em salvaguardas contra venenos.',
      },
    ],
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=239',
  }),
  f({
    id: 'feat-assassin-surprise-attack',
    name: 'Ataque Surpresa',
    originalName: 'Surprise Attack',
    level: 4,
    archetypeId: 'archetype-assassin',
    prereqId: DED.assassin.id,
    prereqName: DED.assassin.name,
    description:
      'No primeiro round, se rolar Enganação ou Furtividade para iniciativa, criaturas que ainda não agiram ficam desprevenidas contra você.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ataque Surpresa',
        description:
          'Iniciativa com Enganação ou Furtividade: inimigos que ainda não agiram ficam desprevenidos contra você no 1º round.',
      },
    ],
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=239',
  }),
  f({
    id: 'feat-assassin-poison-weapon',
    name: 'Arma Envenenada',
    originalName: 'Poison Weapon',
    level: 6,
    archetypeId: 'archetype-assassin',
    prereqId: DED.assassin.id,
    prereqName: DED.assassin.name,
    description:
      'Aplica veneno de contato ou ferimento na arma; com mão livre, pode Interagir para sacar o veneno nesta ação. Nas preparações, cria um número de venenos simples de ferimento igual ao nível (1d4 de veneno, sem salvaguarda; só você aplica; expiram na próxima preparação).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Venenos simples',
        actionType: 'one',
        description:
          'Nas preparações: venenos simples = seu nível (1d4 de veneno). Aplica com 1 ação.',
      },
    ],
    actionType: 'one',
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=239',
  }),
  f({
    id: 'feat-assassin-angel-of-death',
    name: 'Anjo da Morte',
    originalName: 'Angel of Death',
    level: 10,
    archetypeId: 'archetype-assassin',
    prereqId: DED.assassin.id,
    prereqName: DED.assassin.name,
    description:
      'Golpes contra a marca têm o traço morte. Se a marca morrer assim, tentativas de comunicar, reviver, transformar em morto-vivo ou perturbar o além falham a menos que o posto de contramágica seja maior que a metade do seu nível (arredondado para cima) ou venha de artefato/deidade.',
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=239',
  }),
  f({
    id: 'feat-assassin-improved-poison-weapon',
    name: 'Arma Envenenada Aprimorada',
    originalName: 'Improved Poison Weapon',
    level: 10,
    archetypeId: 'archetype-assassin',
    prereqId: 'feat-assassin-poison-weapon',
    prereqName: 'Arma Envenenada',
    description:
      'Veneno simples aplicado com Arma Envenenada causa 2d4. Não gasta o veneno num Golpe com falha crítica.',
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=239',
  }),
  f({
    id: 'feat-assassin-assassinate',
    name: 'Assassinar',
    originalName: 'Assassinate',
    level: 12,
    archetypeId: 'archetype-assassin',
    prereqId: DED.assassin.id,
    prereqName: DED.assassin.name,
    extraPrereq: [
      { kind: 'text', label: 'Marca designada e você está completamente despercebido por ela' },
    ],
    description:
      'Golpe contra a marca. Se acertar, +6d6 de precisão com salvaguarda básica de Fortitude contra a maior entre CD de classe e CD de magia. Falha crítica: morre se o nível dela não for maior que o seu. Imune à sua Assassinar por 1 dia.',
    actionType: 'two',
    sourcePage: 186,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6261',
  }),
]

export const archetypeFeatsGeneralRemaster: Feat[] = [
  ...archaeologistArchetypeFeats,
  ...archerArchetypeFeats,
  ...assassinArchetypeFeats,
]

