/** Gerais Remaster: Guarda Ulfen, Wylderheart, Estilhaço da Finalidade, Cronista da Fogueira, Ator Kitharodiano. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import { SOURCE_RIVAL_ACADEMIES_ID, SOURCE_SHINING_KINGDOMS_ID } from './sources'

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

const DED_ULFEN = {
  id: 'feat-ulfen-guard-dedication',
  name: 'Dedicação da Guarda Ulfen',
}
const DED_WYLD = {
  id: 'feat-wylderheart-dedication',
  name: 'Dedicação de Wylderheart',
}
const DED_SPLINTER = {
  id: 'feat-splinter-finality-dedication',
  name: 'Dedicação do Estilhaço da Finalidade',
}
const DED_CAMP = {
  id: 'feat-campfire-chronicler-dedication',
  name: 'Dedicação de Cronista da Fogueira',
}
const DED_KITH = {
  id: 'feat-kitharodian-actor-dedication',
  name: 'Dedicação de Ator Kitharodiano',
}

const WYLDERHEART_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-wylderheart-archetype',
  label: 'Conjuração de Wylderheart',
  style: 'focusOnly',
  tradition: 'primal',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  classOriginalName: 'Wylderheart',
  features: { focusPool: true },
}

const CAMPFIRE_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-campfire-chronicler-archetype',
  label: 'Conjuração de Cronista da Fogueira',
  style: 'focusOnly',
  tradition: 'divine',
  attributeId: 'charisma',
  proficiencyRank: 'trained',
  classOriginalName: 'Campfire Chronicler',
  features: { focusPool: true },
}

const REACTIVE_STRIKE = {
  kind: 'specialAbility' as const,
  name: 'Golpe Reativo',
  actionType: 'reaction' as const,
  description:
    'Gatilho: uma criatura no seu alcance usa manipular ou movimento, faz um ataque à distância, ou sai de um quadrado durante um movimento. Golpe corpo a corpo contra a criatura. Crítico + gatilho de manipular: interrompe a ação. Este Golpe não conta para a penalidade de ataque múltiplo, e a penalidade não se aplica a ele.',
}

const NIMBLE_OR_SAVAGE = {
  kind: 'textChoice' as const,
  options: [
    { id: 'nimble', label: 'Ágil' },
    { id: 'savage', label: 'Selvagem' },
  ],
  hint: 'Ágil ou selvagem. O motor não escolhe.',
  abilityName: 'Companheiro {choice}',
  abilityDescription: 'O companheiro ganha as capacidades do tipo escolhido.',
}

const COMPANION_SPECS = [
  { id: 'ambusher', label: 'Emboscador' },
  { id: 'bully', label: 'Valentão' },
  { id: 'daredevil', label: 'Destemido' },
  { id: 'racer', label: 'Corredor' },
  { id: 'tracker', label: 'Rastreador' },
  { id: 'wrecker', label: 'Destruidor' },
]

const ulfenGuardArchetypeFeats: Feat[] = [
  f({
    id: DED_ULFEN.id,
    name: DED_ULFEN.name,
    originalName: 'Ulfen Guard Dedication',
    level: 2,
    archetypeId: 'archetype-ulfen-guard',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'skillRank', skillId: 'intimidation', rank: 'trained' },
      {
        kind: 'text',
        label: 'Membro da Guarda Ulfen; treinado em Atletismo e Intimidação; acesso: ao menos um dos pais é ulfen',
      },
    ],
    description:
      'Conhecimento Adicional de Guerra (sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à sua escolha — nomeie na ficha). Ganha Designar Aliado. Anátema: abandonar o aliado designado ou deixar que morra quando puder impedir; se violar, perde Designar Aliado e feitos que o usam até 1 dia de descanso reafirmando a dedicação. Designar Aliado (1 ação): escolha um aliado que possa ver (você nomeia; o motor não escolhe). Por 1 minuto, enquanto ele estiver adjacente e você consciente, ele ganha +2 de circunstância na CA e em Reflexos. Só um aliado designado por vez; um novo substitui o anterior.',
    effects: [
      { kind: 'lore', loreName: 'Guerra', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Guerra)',
        description:
          'Guerra sobe sozinha nos níveis 3, 7 e 15. Se já era treinado em Guerra, também fica treinado em outro Conhecimento à sua escolha (nomeie na ficha; o motor não escolhe).',
      },
      {
        kind: 'specialAbility',
        name: 'Designar Aliado',
        actionType: 'one',
        description:
          'Nomeie o aliado na ficha. 1 minuto; adjacente e você consciente: +2 de circunstância na CA e Reflexos dele. Um por vez. O motor não escolhe o aliado.',
      },
    ],
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7735',
  }),
  f({
    id: 'feat-ulfen-guard-defenders-grit',
    name: 'Determinação do Defensor',
    originalName: "Defender's Grit",
    level: 4,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    description:
      'Ganha o feito geral Difícil de Matar (morrendo máximo 5). Se começar o turno adjacente ao aliado designado, ganha PV temporários iguais à metade do nível até o início do seu próximo turno.',
    effects: [
      { kind: 'dyingMax', value: 5 },
      {
        kind: 'specialAbility',
        name: 'PV temporários ao lado do aliado',
        description:
          'Início do turno adjacente ao aliado designado: PV temporários = metade do nível até o início do próximo turno.',
      },
    ],
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7736',
  }),
  f({
    id: 'feat-ulfen-guard-guards-fury',
    name: 'Fúria da Guarda',
    originalName: "Guard's Fury",
    level: 4,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    extraPrereq: [{ kind: 'text', label: 'Você ainda não pode usar a ação Fúria' }],
    description:
      'Pode usar a ação Fúria. Enquanto em fúria, −1 na CA. Se estiver adjacente ao aliado designado enquanto em fúria, o dano adicional da Fúria sobe de 2 para 4.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fúria da Guarda Ulfen',
        description:
          'Ação Fúria. Em fúria: −1 na CA. Adjacente ao aliado designado: dano extra da Fúria 4 em vez de 2.',
      },
    ],
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7737',
  }),
  f({
    id: 'feat-ulfen-guard-reactive-striker',
    name: 'Atacante Reativo',
    originalName: 'Reactive Striker',
    level: 4,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description: 'Ganha a reação Golpe Reativo.',
    effects: [REACTIVE_STRIKE],
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=320',
  }),
  f({
    id: 'feat-ulfen-guard-guarded-mind',
    name: 'Mente Guardada',
    originalName: 'Guarded Mind',
    level: 6,
    archetypeId: 'archetype-ulfen-guard',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    description:
      'Rerrole a salvaguarda disparadora com +2 de circunstância; use o novo resultado, mesmo se for pior. Pensamentos do anátema reforçam a mente.',
    actionType: 'free',
    frequency: '1/10 minutos',
    trigger: 'Você falha numa salvaguarda contra um efeito com o traço mental.',
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7738',
  }),
  f({
    id: 'feat-ulfen-guard-wounded-party',
    name: 'Grupo Ferido',
    originalName: 'Wounded Party',
    level: 6,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    extraPrereq: [{ kind: 'text', label: 'Você é capaz de entrar em Fúria' }],
    description: 'Dano a você ou aos aliados desperta a fúria. Você entra em Fúria.',
    actionType: 'reaction',
    trigger: 'Você ou seu aliado designado sofre dano, e você é capaz de entrar em Fúria.',
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7739',
  }),
  f({
    id: 'feat-ulfen-guard-guardians-deflection',
    name: 'Desvio do Guardião (Guerreiro)',
    originalName: "Guardian's Deflection (Fighter)",
    level: 8,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Feito adicional de guerreiro; empunhando uma única arma corpo a corpo de uma mão e nada na outra',
      },
    ],
    description:
      'Desvia o ataque contra o aliado com a arma: +2 de circunstância na CA dele contra o ataque disparador. Isso transforma crítico em acerto ou acerto em erro.',
    actionType: 'reaction',
    trigger:
      'Um aliado no seu alcance corpo a corpo é acertado por um ataque, você vê o atacante, e +2 de circunstância na CA transformaria o crítico em acerto ou o acerto em erro.',
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4802',
  }),
  f({
    id: 'feat-ulfen-guard-shield-warden',
    name: 'Guardião do Escudo',
    originalName: 'Shield Warden',
    level: 8,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    extraPrereq: [
      { kind: 'text', label: 'Bloqueio com Escudo; feito adicional de guerreiro/campeão' },
    ],
    description:
      'Com o escudo erguido, use Bloqueio com Escudo quando um aliado adjacente for atacado; o escudo protege o aliado em vez de você.',
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4807',
  }),
  f({
    id: 'feat-ulfen-guard-tight-follower',
    name: 'Seguidor Próximo',
    originalName: 'Tight Follower',
    level: 8,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    description:
      'Avance até o Deslocamento em direção ao aliado designado. O movimento deve terminar a até 3 m dele.',
    actionType: 'reaction',
    trigger: 'Seu aliado designado se move e termina esse movimento a mais de 3 m de você.',
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7740',
  }),
  f({
    id: 'feat-ulfen-guard-protective-strike',
    name: 'Golpe Protetor',
    originalName: 'Protective Strike',
    level: 10,
    archetypeId: 'archetype-ulfen-guard',
    prereqId: DED_ULFEN.id,
    prereqName: DED_ULFEN.name,
    description:
      'Golpe corpo a corpo contra a criatura disparadora. Em sucesso crítico, interrompe a ação disparadora.',
    actionType: 'reaction',
    trigger:
      'Uma criatura se move para adjacente ao seu aliado designado ou tenta um Golpe corpo a corpo contra ele.',
    sourcePage: 172,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7741',
  }),
]

const wylderheartArchetypeFeats: Feat[] = [
  f({
    id: DED_WYLD.id,
    name: DED_WYLD.name,
    originalName: 'Wylderheart Dedication',
    level: 2,
    archetypeId: 'archetype-wylderheart',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'text', label: 'Membro dos Wylderhearts; acesso: você é de Kyonin' },
    ],
    description:
      'Conhecimento Adicional de Demônio (sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à sua escolha — nomeie na ficha). +1 de circunstância na iniciativa em encontros contra carniçais (fiends); empate com a iniciativa de um carniçal: você age primeiro. Feitos deste arquétipo concedem magias de foco primordiais (Sabedoria). Ao ganhar a primeira magia de foco Wylderheart, fica treinado em ataque e CD de magia. Refoco: celebrar a vida ou passar tempo na natureza. Arco no estilo de Ketephys, espada de cavaleiro ou magia primordial são escolhas suas; o motor não escolhe divindade nem estilo.',
    effects: [
      { kind: 'lore', loreName: 'Demônio', rank: 'trained' },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'iniciativa em encontros contra carniçais (fiends)',
      },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Demônio)',
        description:
          'Demônio sobe sozinho nos níveis 3, 7 e 15. Se já era treinado, também outro Conhecimento à sua escolha (nomeie; o motor não escolhe). Empate de iniciativa com carniçal: você age primeiro.',
      },
    ],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7714',
  }),
  f({
    id: 'feat-wylderheart-demon-hunting-companion',
    name: 'Companheiro Caçador de Demônios',
    originalName: 'Demon-Hunting Companion',
    level: 4,
    archetypeId: 'archetype-wylderheart',
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    description:
      'Ganha um companheiro animal jovem treinado contra demônios. Escolha qualquer companheiro animal comum (você escolhe o tipo; o motor não escolhe). Ele ganha faro como sentido impreciso de 9 m só para cheirar carniçais. Se já tiver faro, +2 de circunstância em Percepção ao usar faro contra carniçais.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro animal jovem caçador de demônios',
        description:
          'Adicione o companheiro em Companheiros. Você escolhe o tipo comum. Faro 9 m só contra carniçais (ou +2 em Percepção com faro se já tinha).',
      },
    ],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7715',
  }),
  f({
    id: 'feat-wylderheart-wyldsinger',
    name: 'Cantor das Selvas',
    originalName: 'Wyldsinger',
    level: 4,
    archetypeId: 'archetype-wylderheart',
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    description:
      'Aprende a magia de foco lamento ameaçador (menacing lament) ou hino valente (valiant anthem). Se ainda não tiver, ganha reserva de foco (1 ponto). Magias Wylderheart são primordiais; treinado em ataque e CD (Sabedoria). Especial: pode pegar este feito uma segunda vez, ganhando a magia que não ganhou na primeira. Você escolhe a magia; o motor não escolhe.',
    repeatable: true,
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: WYLDERHEART_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'wylderheart-wyldsinger-spell',
        options: [
          { id: 'menacing-lament', label: 'Lamento ameaçador (menacing lament)' },
          { id: 'valiant-anthem', label: 'Hino valente (valiant anthem)' },
        ],
        hint: 'Na 2ª vez, a magia que faltou. O motor não escolhe.',
        abilityName: 'Foco: {choice}',
        abilityDescription: 'Magia de foco primordial Wylderheart (Sabedoria).',
      },
    ],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7716',
  }),
  f({
    id: 'feat-wylderheart-barreling-charge',
    name: 'Investida Atrapalhadora',
    originalName: 'Barreling Charge',
    level: 6,
    archetypeId: 'archetype-wylderheart',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo; feito adicional de bárbaro/guerreiro' },
    ],
    description:
      'Avance tentando atravessar espaços inimigos. Teste de Atletismo contra a CD de Fortitude de cada criatura cujo espaço tentar entrar: sucesso atravessa; falha encerra o movimento antes. Depois pode Golpear, independentemente de como o Avançar terminou. Pode Cavar, Escalar, Voar ou Nadar no lugar de Avançar se tiver esse deslocamento.',
    actionType: 'two',
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4787',
  }),
  f({
    id: 'feat-wylderheart-blessed-sentinel',
    name: 'Sentinela Abençoada',
    originalName: 'Blessed Sentinel',
    level: 6,
    archetypeId: 'archetype-wylderheart',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    description:
      'Infunde uma arma com a bênção de Ketephys e ataca. Faça um Golpe. Este Golpe ganha o traço sagrado e causa +1d4 de espírito, ou +2d4 contra carniçais. Conta como dois ataques para a penalidade de ataque múltiplo. A bênção é a de Ketephys neste feito; o motor não troca a divindade.',
    actionType: 'two',
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7717',
  }),
  f({
    id: 'feat-wylderheart-mature-animal-companion',
    name: 'Companheiro Animal Maduro',
    originalName: 'Mature Animal Companion (Ranger)',
    level: 6,
    archetypeId: 'archetype-wylderheart',
    prereqId: 'feat-wylderheart-demon-hunting-companion',
    prereqName: 'Companheiro Caçador de Demônios',
    extraPrereq: [{ kind: 'text', label: 'Companheiro animal; feito adicional de patrulheiro' }],
    description:
      'O companheiro fica maduro. Independência: no encontro, mesmo sem Comandar um Animal, pode usar 1 ação no seu turno para Golpear ou Avançar (ou Cavar/Escalar/Voar/Nadar). Se o fizer, é tudo o que faz na rodada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro maduro',
        description: 'Avance o estágio para maduro na ficha. Independência de 1 ação.',
      },
    ],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4879',
  }),
  f({
    id: 'feat-wylderheart-primal-guardian',
    name: 'Guardião Primordial',
    originalName: 'Primal Guardian',
    level: 8,
    archetypeId: 'archetype-wylderheart',
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    description:
      'Aprende a magia de foco bainha elemental (elemental sheath) ou uivo cruel (vicious howl). Se for a primeira magia de foco Wylderheart, ganha reserva de foco e treino em ataque/CD primordiais (Sabedoria). Especial: pode pegar uma segunda vez, ganhando a magia que faltou. Você escolhe; o motor não escolhe.',
    repeatable: true,
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: WYLDERHEART_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'wylderheart-primal-guardian-spell',
        options: [
          { id: 'elemental-sheath', label: 'Bainha elemental (elemental sheath)' },
          { id: 'vicious-howl', label: 'Uivo cruel (vicious howl)' },
        ],
        hint: 'Na 2ª vez, a magia que faltou. O motor não escolhe.',
        abilityName: 'Foco: {choice}',
        abilityDescription: 'Magia de foco primordial Wylderheart (Sabedoria).',
      },
    ],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7718',
  }),
  f({
    id: 'feat-wylderheart-incredible-companion',
    name: 'Companheiro Incrível',
    originalName: 'Incredible Companion (Ranger)',
    level: 10,
    archetypeId: 'archetype-wylderheart',
    prereqId: 'feat-wylderheart-mature-animal-companion',
    prereqName: 'Companheiro Animal Maduro',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de patrulheiro' }],
    description: 'O companheiro vira ágil ou selvagem. Você escolhe; o motor não escolhe.',
    effects: [{ ...NIMBLE_OR_SAVAGE, choiceId: 'wylderheart-companion-incredible' }],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4888',
  }),
  f({
    id: 'feat-wylderheart-wild-dance',
    name: 'Dança Selvagem',
    originalName: 'Wild Dance',
    level: 12,
    archetypeId: 'archetype-wylderheart',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    description:
      'Avance até o Deslocamento. Criatura que tentar uma reação disparada por este movimento faz salvaguarda de Vontade contra sua CD de classe ou de magia (a maior). Crítico: sem efeito. Sucesso: fascinada até o fim do seu próximo turno. Falha: fascinada até o fim do seu próximo turno; se a reação exigir teste de ataque, +2 de circunstância na sua CA contra esse ataque. Falha crítica: fascinada até o fim do seu próximo turno e perde a reação.',
    actionType: 'one',
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7719',
  }),
  f({
    id: 'feat-wylderheart-fiend-slayer',
    name: 'Matador de Carniçais',
    originalName: 'Fiend Slayer',
    level: 16,
    archetypeId: 'archetype-wylderheart',
    traits: ['Arquétipo', 'Morte', 'Vazio'],
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    extraPrereq: [{ kind: 'text', label: 'Sua ação anterior foi um Golpe que acertou um carniçal' }],
    description:
      'O carniçal que você acabou de acertar sofre 80 de dano de vazio com salvaguarda básica de Fortitude contra sua CD de classe ou de magia (a maior). Falha crítica: também atordoado 1. Independentemente do resultado, fica imune a Matador de Carniçais por 24 horas.',
    actionType: 'one',
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7720',
  }),
  f({
    id: 'feat-wylderheart-specialized-companion',
    name: 'Companheiro Especializado',
    originalName: 'Specialized Companion (Ranger)',
    level: 16,
    archetypeId: 'archetype-wylderheart',
    prereqId: 'feat-wylderheart-incredible-companion',
    prereqName: 'Companheiro Incrível',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de patrulheiro' }],
    description:
      'O companheiro ganha uma especialização à sua escolha. Pode selecionar até 3 vezes; cada vez uma especialização diferente. O motor não escolhe.',
    repeatable: true,
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'wylderheart-companion-spec',
        options: COMPANION_SPECS,
        hint: 'Cada vez uma especialização diferente (até 3). O motor não escolhe.',
        abilityName: 'Especialização: {choice}',
        abilityDescription: 'O companheiro ganha essa especialização.',
      },
    ],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4905',
  }),
  f({
    id: 'feat-wylderheart-whirlwind-strike',
    name: 'Golpe Redemoinho',
    originalName: 'Whirlwind Strike',
    level: 16,
    archetypeId: 'archetype-wylderheart',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro/bárbaro' }],
    description:
      'Golpe corpo a corpo contra cada inimigo no seu alcance corpo a corpo. Cada ataque conta para a penalidade de ataque múltiplo, mas você só aumenta a penalidade depois de todos os ataques.',
    actionType: 'three',
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4847',
  }),
  f({
    id: 'feat-wylderheart-sacred-weapon',
    name: 'Arma Sagrada',
    originalName: 'Sacred Weapon',
    level: 18,
    archetypeId: 'archetype-wylderheart',
    prereqId: DED_WYLD.id,
    prereqName: DED_WYLD.name,
    description:
      'Sempre que acertar um crítico em um carniçal, o ataque causa um dado extra de dano da arma, e o carniçal fica enfraquecido 2 e desajeitado 2 até o início do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Arma sagrada contra carniçais',
        description:
          'Crítico contra carniçal: +1 dado de dano da arma; alvo enfraquecido 2 e desajeitado 2 até o início do seu próximo turno.',
      },
    ],
    sourcePage: 146,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7721',
  }),
]

const splinterFinalityArchetypeFeats: Feat[] = [
  f({
    id: DED_SPLINTER.id,
    name: DED_SPLINTER.name,
    originalName: 'Splinter of Finality Dedication',
    level: 2,
    archetypeId: 'archetype-splinter-finality',
    isDedication: true,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Possuir e investir um estilhaço da finalidade (artefato cravado no pescoço)',
      },
    ],
    description:
      'Arquétipo de item: cravar o estilhaço no pescoço ancora a alma e concede a Dedicação. Não há tipo a escolher. −1 de status em salvaguardas contra efeitos que causariam desajeitado, drenado ou enfraquecido (−2 no 10º nível). Resistência a espírito igual ao nível. +2 de status em salvaguardas contra espíritos ou assombrações e contra efeitos que causariam confuso, controlado, condenado ou estupefato. A adaga espectral vem no feito Adaga Espectral.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Estilhaço da finalidade (artefato)',
        description:
          'Resistência a espírito = nível. +2 de status contra espíritos/assombrações e contra confuso, controlado, condenado ou estupefato. −1 de status (−2 no 10º) contra desajeitado, drenado ou enfraquecido. Sem escolha de tipo.',
      },
    ],
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=317',
  }),
  f({
    id: 'feat-splinter-finality-spectral-dagger',
    name: 'Adaga Espectral',
    originalName: 'Spectral Dagger',
    level: 2,
    archetypeId: 'archetype-splinter-finality',
    traits: ['Arquétipo', 'Manipular'],
    prereqId: DED_SPLINTER.id,
    prereqName: DED_SPLINTER.name,
    extraPrereq: [
      { kind: 'text', label: 'Uma mão livre e você ainda não empunha a adaga espectral' },
    ],
    description:
      'Ao tocar o estilhaço no pescoço, conjura na mão uma adaga espectral (+1 toque fantasma). Cada Golpe bem-sucedido causa +1 de espírito (+1d6 no crítico). Se sair da mão, desaparece (precisa de 1 ação para conjurar de novo); se for por Golpe à distância arremessado, resolve o ataque antes. Pode transferir runas para ela meditando 1 dia (atividade de descanso).',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Adaga espectral',
        actionType: 'one',
        description:
          '+1 toque fantasma. +1 espírito no acerto (+1d6 no crítico). Some se sair da mão. Runas: 1 dia de meditação.',
      },
    ],
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7704',
  }),
  f({
    id: 'feat-splinter-finality-dread-blade',
    name: 'Lâmina Pavorosa',
    originalName: 'Dread Blade',
    level: 4,
    archetypeId: 'archetype-splinter-finality',
    prereqId: DED_SPLINTER.id,
    prereqName: DED_SPLINTER.name,
    description:
      'Ao acertar e danificar com a adaga espectral um inimigo amedrontado, ele não pode reduzir amedrontado abaixo de 1 até o fim do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Frio da sepultura',
        description:
          'Adaga espectral contra amedrontado: o alvo não reduz amedrontado abaixo de 1 até o fim do seu próximo turno.',
      },
    ],
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7705',
  }),
  f({
    id: 'feat-splinter-finality-soul-bleed',
    name: 'Sangramento da Alma',
    originalName: 'Soul Bleed',
    level: 6,
    archetypeId: 'archetype-splinter-finality',
    prereqId: DED_SPLINTER.id,
    prereqName: DED_SPLINTER.name,
    description:
      'Crítico com a adaga espectral: 1d6 de dano persistente de espírito. Se o alvo ainda não sofria dano persistente de espírito nesse crítico, você ganha PV temporários iguais ao dano de espírito desse ataque até o início do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sangramento da alma',
        description:
          'Crítico com a adaga: 1d6 persistente de espírito. Se o persistente era novo, PV temporários = espírito do ataque até o início do próximo turno.',
      },
    ],
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7706',
  }),
  f({
    id: 'feat-splinter-finality-soul-well',
    name: 'Poço de Almas',
    originalName: 'Soul Well',
    level: 8,
    archetypeId: 'archetype-splinter-finality',
    traits: ['Arquétipo', 'Concentração', 'Manipular', 'Ocultismo'],
    prereqId: DED_SPLINTER.id,
    prereqName: DED_SPLINTER.name,
    description:
      'Por 1 minuto, mortos-vivos incorpóreos tratam todos os quadrados a 9 m de você como terreno difícil, e criaturas vivas nessa área morrem em morrendo 5 (não 4). Se o valor de morrendo de uma criatura viva aumentar dentro do poço, sua adaga espectral causa +1 dado de dano da arma até o fim do seu próximo turno. O morrendo 5 vale para as vítimas na área, não para você.',
    actionType: 'two',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Poço de almas',
        actionType: 'two',
        description:
          '1 minuto, 9 m: incorpóreos em terreno difícil; vivos morrem em morrendo 5. Morrendo de vivo sobe na área: +1 dado na adaga até o fim do seu próximo turno.',
      },
    ],
    sourcePage: 124,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7707',
  }),
  f({
    id: 'feat-splinter-finality-lethal-edge',
    name: 'Gume Letal',
    originalName: 'Lethal Edge',
    level: 10,
    archetypeId: 'archetype-splinter-finality',
    prereqId: 'feat-splinter-finality-spectral-dagger',
    prereqName: 'Adaga Espectral',
    description:
      'Aplique um dos efeitos até o fim do seu próximo turno: o alvo não pode usar reações; ou o alvo fica enfraquecido 1. Você escolhe a cada uso; o motor não escolhe.',
    actionType: 'free',
    trigger:
      'Seu Golpe com a adaga espectral acerta uma criatura amedrontada e causa dano de espírito.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Gume letal',
        actionType: 'free',
        description:
          'A cada uso, escolha: sem reações ou enfraquecido 1, até o fim do seu próximo turno. O motor não escolhe.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7708',
  }),
  f({
    id: 'feat-splinter-finality-hungry-blade',
    name: 'Lâmina Faminta',
    originalName: 'Hungry Blade',
    level: 12,
    archetypeId: 'archetype-splinter-finality',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: 'feat-splinter-finality-spectral-dagger',
    prereqName: 'Adaga Espectral',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Sua ação anterior foi um Golpe com a adaga espectral que causou dano de espírito',
      },
    ],
    description:
      'A adaga espectral ganha os efeitos de uma runa aguçada só contra o alvo do Golpe exigido. Dura 10 minutos ou até esse alvo morrer, o que ocorrer primeiro.',
    actionType: 'one',
    frequency: '1/dia',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Lâmina faminta (aguçada)',
        actionType: 'one',
        description:
          '1/dia. Runa aguçada só contra o alvo do Golpe exigido, 10 minutos ou até ele morrer.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7709',
  }),
  f({
    id: 'feat-splinter-finality-vengeful-remnant',
    name: 'Remanescente Vingativo',
    originalName: 'Vengful Remnant',
    level: 14,
    archetypeId: 'archetype-splinter-finality',
    traits: ['Arquétipo', 'Concentração', 'Manipular', 'Ocultismo'],
    prereqId: DED_SPLINTER.id,
    prereqName: DED_SPLINTER.name,
    description:
      'Até o início do seu próximo turno, resistência 10 a todo dano exceto força, toque fantasma, espírito e vitalidade (dobrada se a fonte for não mágica). Se matar um inimigo significativo não imune a espírito com a adaga espectral enquanto o efeito durar, a duração se estende até o fim do seu próximo turno.',
    actionType: 'two',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Farrapos de almas',
        actionType: 'two',
        description:
          'Resistência 10 (exceto força, toque fantasma, espírito, vitalidade); dobrada se não mágico. Matar inimigo significativo com a adaga: estende até o fim do próximo turno.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7710',
  }),
  f({
    id: 'feat-splinter-finality-instrument-of-death',
    name: 'Instrumento da Morte',
    originalName: 'Instrument of Death',
    level: 16,
    archetypeId: 'archetype-splinter-finality',
    prereqId: 'feat-splinter-finality-lethal-edge',
    prereqName: 'Gume Letal',
    description:
      'Sempre que obtiver sucesso crítico num ataque contra um inimigo e usar Gume Letal, acrescente à lista: o alvo fica amaldiçoado e não se beneficia de bônus de circunstância ou de status (efeito de maldição); ou o alvo ganha fraqueza 10 a espírito. Você escolhe entre todos os efeitos do Gume Letal; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Gume Letal aprimorado',
        description:
          'Opções extras no crítico + Gume Letal: maldição (sem bônus de circunstância/status) ou fraqueza 10 a espírito. Você escolhe.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7711',
  }),
  f({
    id: 'feat-splinter-finality-guillotine-blade',
    name: 'Lâmina Guilhotina',
    originalName: 'Guillotine Blade',
    level: 18,
    archetypeId: 'archetype-splinter-finality',
    traits: ['Arquétipo', 'Concentração', 'Ocultismo'],
    prereqId: 'feat-splinter-finality-spectral-dagger',
    prereqName: 'Adaga Espectral',
    description:
      'Por 1 minuto, a adaga espectral ganha os benefícios de uma runa vorpal. Ao usar Snicker-Snack com ela, a CD de Fortitude é 37, sua CD de classe ou sua CD de magia, a maior.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Lâmina guilhotina (vorpal)',
        actionType: 'one',
        description:
          '1 minuto: runa vorpal na adaga espectral. Snicker-Snack: CD de Fortitude 37, CD de classe ou CD de magia (a maior).',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7712',
  }),
  f({
    id: 'feat-splinter-finality-soul-oubliette',
    name: 'Masmorra da Alma',
    originalName: 'Soul Oubliette',
    level: 20,
    archetypeId: 'archetype-splinter-finality',
    traits: ['Arquétipo', 'Concentração', 'Ocultismo', 'Profano'],
    prereqId: 'feat-splinter-finality-spectral-dagger',
    prereqName: 'Adaga Espectral',
    extraPrereq: [{ kind: 'text', label: 'O estilhaço da finalidade não contém uma alma presa' }],
    description:
      'Arranca a alma da vítima e a prende no estilhaço, com os efeitos de prender alma (seize soul). Só uma alma por vez; pode libertá-la como ação livre. Se não libertar, escapa em 24 horas. Se tocar o estilhaço a uma lâmina final intacta com uma alma presa, a alma passa para a lâmina e fica presa indefinidamente. Enquanto houver alma presa, você ganha cura acelerada 15.',
    actionType: 'reaction',
    trigger: 'Você reduz uma criatura a 0 PV com um ataque da adaga espectral.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Alma presa (cura acelerada 15)',
        actionType: 'reaction',
        description:
          'Prender alma no estilhaço (1 por vez; livre para soltar; 24 h ou lâmina final). Com alma presa: cura acelerada 15.',
      },
    ],
    sourcePage: 125,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7713',
  }),
]

const campfireChroniclerArchetypeFeats: Feat[] = [
  f({
    id: DED_CAMP.id,
    name: DED_CAMP.name,
    originalName: 'Campfire Chronicler Dedication',
    level: 2,
    archetypeId: 'archetype-campfire-chronicler',
    isDedication: true,
    rarity: 'uncommon',
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Treinado em Religião e Sobrevivência; se já for treinado em alguma delas, fica treinado numa perícia à sua escolha no lugar (o motor não escolhe). Ganha Oferecer História (1 ação; auditivo, concentração, divino, linguístico, mental): compartilhe uma história de viagem com uma criatura a 9 m (você nomeia a história e o viajante; o motor não escolhe). Você ganha +1 de status na CA e em Vontade até o fim do seu próximo turno. No turno seguinte, a criatura pode gastar 1 ação (mesmos traços) para responder com a própria história e ganhar o mesmo benefício até o fim do turno seguinte.',
    effects: [
      { kind: 'skillRank', skillId: 'religion', rank: 'trained', replaceIfTrained: true },
      { kind: 'skillRank', skillId: 'survival', rank: 'trained', replaceIfTrained: true },
      {
        kind: 'specialAbility',
        name: 'Oferecer História',
        actionType: 'one',
        description:
          'Nomeie a história e o viajante. +1 de status na CA e Vontade até o fim do próximo turno. O ouvinte pode responder no turno dele para o mesmo bônus. O motor não escolhe histórias.',
      },
    ],
    sourcePage: 34,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7438',
  }),
  f({
    id: 'feat-campfire-chronicler-listeners-boon',
    name: 'Dádiva do Ouvinte',
    originalName: "Listener's Boon",
    level: 4,
    archetypeId: 'archetype-campfire-chronicler',
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Ganha Iniciado no Domínio no domínio de fogo, conhecimento, proteção ou viagem (você escolhe; o motor não escolhe). Refoco: 10 minutos contando histórias de viagem ou ouvindo as de outros. Treinado em ataque e CD de magia (divino; Carisma), perito no 11º nível. Especial: pode selecionar várias vezes, cada vez um domínio diferente e sua magia de domínio.',
    repeatable: true,
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: CAMPFIRE_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'campfire-chronicler-domain',
        options: [
          { id: 'fire', label: 'Fogo' },
          { id: 'knowledge', label: 'Conhecimento' },
          { id: 'protection', label: 'Proteção' },
          { id: 'travel', label: 'Viagem' },
        ],
        hint: 'Domínio de Isthralei. Cada vez um diferente. O motor não escolhe.',
        abilityName: 'Domínio: {choice}',
        abilityDescription: 'Magia de domínio inicial (foco divino, Carisma). Perito em ataque/CD no 11º nível.',
      },
      {
        kind: 'specialAbility',
        name: 'Conjuração de domínio (perito no 11º)',
        description:
          'Treinado em ataque e CD de magia; perito no 11º nível. Refoco contando ou ouvindo histórias.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7440',
  }),
  f({
    id: 'feat-campfire-chronicler-raging-stories',
    name: 'Histórias Furiosas',
    originalName: 'Raging Stories',
    level: 4,
    archetypeId: 'archetype-campfire-chronicler',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Ao Oferecer História sobre chances selvagens e lutar contra todas as odds, pode envolver-se em chama espectral no lugar dos benefícios normais. A ação ganha o traço fogo. Seus Golpes corpo a corpo na duração causam +2 de fogo (+4 se mestre em Religião, +6 se lendário). A criatura com quem compartilhou a história pode escolher este benefício mesmo se você não escolheu. Você decide o tema da história; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Chama espectral (Oferecer História)',
        description:
          'No lugar do bônus normal: +2 fogo nos Golpes corpo a corpo (+4 mestre em Religião, +6 lendário). O ouvinte pode escolher este benefício.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7441',
  }),
  f({
    id: 'feat-campfire-chronicler-dead-tell-tales',
    name: 'Os Mortos Contam Histórias',
    originalName: 'The Dead Tell Tales',
    level: 4,
    archetypeId: 'archetype-campfire-chronicler',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Resistência igual ao nível a dano de espírito e vazio causado por assombração, espírito ou morto-vivo incorpóreo. Na primeira vez que sofrer dano de uma assombração ou espírito, aprende a história geral da origem (tipo de tragédia, o que o espírito representa).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência a espírito e vazio (assombrações)',
        description:
          'Resistência = nível a espírito e vazio de assombração, espírito ou morto-vivo incorpóreo. Primeiro dano: história geral da origem.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7439',
  }),
  f({
    id: 'feat-campfire-chronicler-cozy-campfire',
    name: 'Fogueira Aconchegante',
    originalName: 'Cozy Campfire',
    level: 6,
    archetypeId: 'archetype-campfire-chronicler',
    traits: ['Arquétipo', 'Consagração', 'Divino', 'Exploração', 'Fogo'],
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      '1 hora: fogueira num quadrado desocupado, sussurrando histórias de quem encontrou (você nomeia; o motor não escolhe). Luz plena 9 m (penumbra +9 m). Não apaga nem cresce por meios mundanos; apaga nas próximas preparações diárias ou ao usar de novo. A primeira vez por rodada que uma criatura na luz plena usa ação com traço ataque, faz Vontade contra sua CD de classe ou de magia (a maior; maldição divina). Você percebe a tentativa. Crítico: a criatura percebe e pode interromper; se não, a fogueira apaga. Sucesso: percebe e pode interromper; se não, imune 24 h. Falha: −2 de status no ataque da ação e nos demais até o início do próximo turno dela. Falha crítica: ação interrompida e −2 de status nos ataques até o início do próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fogueira aconchegante',
        description:
          '1 hora. Luz 9 m. Maldição divina na 1ª ação de ataque por rodada na luz plena. Você nomeia as histórias sussurradas.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7442',
  }),
  f({
    id: 'feat-campfire-chronicler-illuminating-stories',
    name: 'Histórias Iluminadoras',
    originalName: 'Illuminating Stories',
    level: 6,
    archetypeId: 'archetype-campfire-chronicler',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Ao Oferecer História sobre qualquer tema, pode escolher iluminação no lugar dos benefícios normais. +1 de status em Recolher Informações na duração ( +2 se mestre em Religião, +3 se lendário) e pode Recolher Informações sobre o tema da história como ação livre. O ouvinte pode escolher este benefício mesmo se você não escolheu. Você escolhe o tema; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Iluminação (Oferecer História)',
        description:
          'No lugar do bônus normal: +1 de status em Recolher Informações (+2 mestre / +3 lendário em Religião) e Recolher Informações do tema como ação livre.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7443',
  }),
  f({
    id: 'feat-campfire-chronicler-advanced-domain',
    name: 'Domínio Avançado',
    originalName: 'Advanced Domain',
    level: 8,
    archetypeId: 'archetype-campfire-chronicler',
    prereqId: 'feat-campfire-chronicler-listeners-boon',
    prereqName: 'Dádiva do Ouvinte',
    extraPrereq: [
      { kind: 'text', label: 'Magia de domínio inicial; feito adicional de clérigo' },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Ganha a magia de domínio avançada de um dos seus domínios para o qual já tem magia inicial. Especial: pode selecionar várias vezes; cada vez uma magia avançada diferente. Você escolhe o domínio; o motor não escolhe.',
    repeatable: true,
    effects: [
      { kind: 'spellcasting', access: CAMPFIRE_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'campfire-chronicler-advanced-domain',
        options: [
          { id: 'fire', label: 'Fogo (avançado)' },
          { id: 'knowledge', label: 'Conhecimento (avançado)' },
          { id: 'protection', label: 'Proteção (avançado)' },
          { id: 'travel', label: 'Viagem (avançado)' },
        ],
        hint: 'Domínio do qual você já tem a magia inicial. Cada vez um diferente. O motor não escolhe.',
        abilityName: 'Domínio avançado: {choice}',
        abilityDescription: 'Magia de domínio avançada desse domínio (foco divino).',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4666',
  }),
  f({
    id: 'feat-campfire-chronicler-flickering-stories',
    name: 'Histórias Cintilantes',
    originalName: 'Flickering Stories',
    level: 8,
    archetypeId: 'archetype-campfire-chronicler',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Ao Oferecer História, pode ficar oculto por sombras móveis na duração no lugar dos benefícios normais. A ação ganha o traço sombra. Não pode usar essa ocultação para Furtar-se (a localização continua óbvia). O ouvinte pode escolher este benefício mesmo se você não escolheu.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sombras (Oferecer História)',
        description:
          'No lugar do bônus normal: oculto por sombras na duração (sem Furtar-se). Traço sombra.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7444',
  }),
  f({
    id: 'feat-campfire-chronicler-tales-of-the-road',
    name: 'Contos da Estrada',
    originalName: 'Tales of the Road',
    level: 10,
    archetypeId: 'archetype-campfire-chronicler',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Ao Recolher Informações sobre uma cidade que já visitou, +2 de circunstância e pode usar um Conhecimento associado (como Nerosyan) com o nível como bônus de proficiência mesmo destreinado. Você nomeia a cidade e o Conhecimento; o motor não escolhe.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Recolher Informações sobre uma cidade que você já visitou',
      },
      {
        kind: 'specialAbility',
        name: 'Conhecimento da cidade visitada',
        description:
          'Use o Conhecimento associado (nomeie a cidade) com o nível como proficiência mesmo destreinado. O motor não escolhe a cidade.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7445',
  }),
  f({
    id: 'feat-campfire-chronicler-stories-of-home',
    name: 'Histórias de Lar',
    originalName: 'Stories of Home',
    level: 14,
    archetypeId: 'archetype-campfire-chronicler',
    traits: ['Arquétipo', 'Auditivo', 'Divino', 'Exploração', 'Cura', 'Linguístico', 'Mental'],
    prereqId: DED_CAMP.id,
    prereqName: DED_CAMP.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      '10 minutos compartilhando a alegria de regressos com aliados a 9 m. Você e esses aliados recuperam PV iguais ao modificador de Constituição (mínimo 1) vezes o nível e se recuperam de condenado, drenado e fatigado como se tivessem uma noite completa de descanso (sem os demais benefícios de uma noite de descanso).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Histórias de lar',
        description:
          '10 min, aliados a 9 m: PV = mod. Constituição (mín. 1) × nível; remove condenado, drenado e fatigado como noite de descanso.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7446',
  }),
]

const kitharodianActorArchetypeFeats: Feat[] = [
  f({
    id: DED_KITH.id,
    name: DED_KITH.name,
    originalName: 'Kitharodian Actor Dedication',
    level: 2,
    archetypeId: 'archetype-kitharodian-actor',
    isDedication: true,
    rarity: 'rare',
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'performance', rank: 'trained' },
      {
        kind: 'text',
        label: 'Treinado em Performance; acesso: você é de Taldor ou frequentou a Academia Kitharodiana',
      },
    ],
    description:
      'Treinado em Sociedade e em Conhecimento de Teatro; se já for treinado em algum, fica perito nesse. Ao testar Enganação ou Performance para interpretar uma figura famosa, +2 de circunstância (+3 no 10º nível, +4 no 17º). Não ganha o bônus ao Personificar alguém cuja morte é de conhecimento comum (o MJ decide). Você nomeia a figura e o papel; o motor nunca escolhe o papel.',
    effects: [
      { kind: 'skillRank', skillId: 'society', rank: 'trained', bumpIfAlready: true },
      { kind: 'lore', loreName: 'Teatro', rank: 'trained', bumpIfAlready: true },
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo:
          'Enganação ou Performance para interpretar figura famosa (+3 no 10º, +4 no 17º; não vale se a morte for de conhecimento comum)',
      },
      {
        kind: 'specialAbility',
        name: 'Papel / impressão',
        description:
          'Nomeie na ficha a figura famosa que está interpretando. O motor não escolhe o papel.',
      },
    ],
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7456',
  }),
  f({
    id: 'feat-kitharodian-actor-animal-actor',
    name: 'Ator Animal',
    originalName: 'Animal Actor',
    level: 4,
    archetypeId: 'archetype-kitharodian-actor',
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Treinado em Natureza e num Conhecimento de um tipo de animal comum no palco (Canino, Ursino, Primata ou outro que você nomeie); se já for treinado em algum, fica perito nesse. +2 de circunstância em Comandar um Animal e em Recolher Informações sobre criaturas com o traço animal. Pode usar o Conhecimento animal escolhido para Comandar um Animal daquele tipo. O motor não escolhe o animal.',
    effects: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained', bumpIfAlready: true },
      {
        kind: 'loreChoice',
        choiceId: 'kitharodian-animal-lore',
        rank: 'trained',
        hint: 'Conhecimento de um tipo de animal de palco (Canino, Ursino, Primata…). Se já treinado, vira perito — anote. O motor não escolhe.',
      },
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Comandar um Animal e Recolher Informações sobre criaturas com o traço animal',
      },
      {
        kind: 'specialAbility',
        name: 'Comandar com Conhecimento animal',
        description:
          'Use o Conhecimento escolhido para Comandar um Animal daquele tipo. Se já era treinado nesse Conhecimento, fique perito (anote).',
      },
    ],
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7457',
  }),
  f({
    id: 'feat-kitharodian-actor-heavens-step-offense',
    name: 'Ofensiva do Passo Celestial',
    originalName: "Heaven's Step Offense",
    level: 4,
    archetypeId: 'archetype-kitharodian-actor',
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Lições de palco no estilo da misericórdia de Grão-Príncipe Gennaris III. O Golpe passa a ser não letal, e você pode Avançar até metade do Deslocamento em linha reta rumo a outro inimigo. Esse movimento não provoca reações de inimigos, salvo se forem imunes a efeitos mentais.',
    actionType: 'reaction',
    trigger: 'Seu Golpe corpo a corpo reduz uma criatura a 0 PV.',
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7458',
  }),
  f({
    id: 'feat-kitharodian-actor-clean-take',
    name: 'Tomada Limpa',
    originalName: 'Clean Take',
    level: 6,
    archetypeId: 'archetype-kitharodian-actor',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Rerrole o teste disparador e use o segundo resultado. Horas de ensaio tornam a interpretação adaptável.',
    actionType: 'reaction',
    trigger:
      'Você falha, mas não criticamente, num teste de Enganação ou Performance para interpretar uma figura famosa.',
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7459',
  }),
  f({
    id: 'feat-kitharodian-actor-monumental-maestro',
    name: 'Maestro Monumental',
    originalName: 'Monumental Maestro',
    level: 8,
    archetypeId: 'archetype-kitharodian-actor',
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Estudo das composições de Andreas Romung (hinos da Cruzada Rutilante em Ecos da Glória). +2 de circunstância em Performance para Apresentar-se com instrumento musical ou canto. Se obtiver sucesso, as CDs de Diplomacia subsequentes contra qualquer criatura que observou a apresentação caem em 2 pelas próximas 24 horas.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Performance para Apresentar-se com instrumento musical ou canto',
      },
      {
        kind: 'specialAbility',
        name: 'Ecos da Glória',
        description:
          'Sucesso na apresentação: −2 nas CDs de Diplomacia contra quem observou, 24 horas.',
      },
    ],
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7460',
  }),
  f({
    id: 'feat-kitharodian-actor-stunt-performer-stance',
    name: 'Postura de Dublê',
    originalName: 'Stunt Performer Stance',
    level: 10,
    archetypeId: 'archetype-kitharodian-actor',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    extraPrereq: [{ kind: 'text', label: 'Você está sem armadura' }],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Postura inspirada em Kemen Kayton (Mosteiro das Sete Formas de Zimar). Enquanto nela, +2 de circunstância em Reflexos e em testes de perícia para Escapar, e resistência 2 a todo dano físico.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Postura de dublê',
        actionType: 'one',
        description:
          'Sem armadura. Na postura: +2 de circunstância em Reflexos e para Escapar; resistência 2 a dano físico.',
      },
    ],
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7461',
  }),
  f({
    id: 'feat-kitharodian-actor-bleak-humorist',
    name: 'Humorista Sombrio',
    originalName: 'Bleak Humorist',
    level: 12,
    archetypeId: 'archetype-kitharodian-actor',
    traits: ['Arquétipo', 'Emoção', 'Linguístico', 'Mental'],
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Murmura uma piada sombria (Beldam I) à criatura que o derrubou. Ela faz Vontade contra sua CD de classe. Crítico: sem efeito. Sucesso: distraída por risos, sem reações até o início do seu próximo turno. Falha: ri sem controle; sem reações até o início do seu próximo turno e lentidão 1. Falha crítica: como falha, e cai imediatamente.',
    actionType: 'reaction',
    frequency: '1/dia',
    trigger:
      'Você é reduzido a 0 PV por uma criatura a 9 m, mas não é morto imediatamente.',
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7463',
  }),
  f({
    id: 'feat-kitharodian-actor-sympathetic-portrayal',
    name: 'Interpretação Compassiva',
    originalName: 'Sympathetic Portrayal',
    level: 12,
    archetypeId: 'archetype-kitharodian-actor',
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Sempre que obtiver sucesso em Enganação ou Performance para interpretar uma figura famosa, escolha uma criatura a 18 m que observou (você escolhe quem; o motor não escolhe). Se não for hostil, a atitude melhora em dois passos (três no crítico). Se for hostil, fica estupefata 2 por 1 minuto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Interpretação compassiva',
        description:
          'Sucesso ao interpretar figura famosa: escolha um observador a 18 m. Não hostil: +2 passos de atitude (+3 no crítico). Hostil: estupefato 2 por 1 minuto.',
      },
    ],
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7462',
  }),
  f({
    id: 'feat-kitharodian-actor-of-lions-and-wyrms',
    name: 'De Leões e Dragões',
    originalName: 'Of Lions and Wyrms',
    level: 14,
    archetypeId: 'archetype-kitharodian-actor',
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Papel de Taldaris contra o Grogrisant e Verksaris. +2 de circunstância em salvaguardas contra efeitos de bestas e dragões.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'salvaguardas contra efeitos de bestas e dragões',
      },
    ],
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7464',
  }),
  f({
    id: 'feat-kitharodian-actor-ruthless-orator',
    name: 'Orador Impiedoso',
    originalName: 'Ruthless Orator',
    level: 16,
    archetypeId: 'archetype-kitharodian-actor',
    traits: ['Arquétipo', 'Auditivo', 'Emoção', 'Linguístico', 'Mental'],
    prereqId: DED_KITH.id,
    prereqName: DED_KITH.name,
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    description:
      'Teste de Performance (CD difícil do seu nível) para um monólogo no estilo de Daronlyr XII. Sucesso: criaturas hostis a 6 m sofrem −2 de circunstância em testes de ataque e de ataque de magia contra você até o início do seu próximo turno, e aliados a 6 m ficam acelerados até o início do seu próximo turno (a ação extra só para Golpear ou Avançar).',
    actionType: 'two',
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7465',
  }),
]

export const archetypeFeatsGeneralRemaster22: Feat[] = [
  ...ulfenGuardArchetypeFeats,
  ...wylderheartArchetypeFeats,
  ...splinterFinalityArchetypeFeats,
  ...campfireChroniclerArchetypeFeats,
  ...kitharodianActorArchetypeFeats,
]
