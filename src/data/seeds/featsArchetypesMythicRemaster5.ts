/** Destinos míticos Remaster (Pathfinder #219: Lord of the Trinity Star): Runelord Vingador, Herdeiro Heroico, Dilacerado pelo Tempo, Guerreiro da Lasca de Guerra. Sem Legacy. */
import type { Feat } from '@/types/feat'
import { SOURCE_TRINITY_STAR_ID } from './sources'

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
  classId?: string | null
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'archetype',
    archetypeId: opts.archetypeId,
    isDedication: opts.isDedication,
    classId: opts.classId ?? null,
    traits:
      opts.traits ??
      (opts.isDedication ? ['Arquétipo', 'Dedicação', 'Mítico'] : ['Arquétipo', 'Mítico']),
    rarity: opts.rarity ?? 'rare',
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
    sourceId: opts.sourceId ?? SOURCE_TRINITY_STAR_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_AVENGING = {
  id: 'feat-avenging-runelord-dedication',
  name: 'Dedicação de Runelord Vingador',
}
const EXPAND_RUNE = {
  id: 'feat-avenging-runelord-expanded-runelord-magic',
  name: 'Magia de Runelord Expandida',
}
const DED_SCION = {
  id: 'feat-heroic-scion-dedication',
  name: 'Dedicação de Herdeiro Heroico',
}
const DED_TIME = {
  id: 'feat-timewracked-dedication',
  name: 'Dedicação de Dilacerado pelo Tempo',
}
const TEMPORAL_FURY = {
  id: 'feat-timewracked-temporal-fury',
  name: 'Fúria Temporal',
}
const DED_WARSHARD = {
  id: 'feat-warshard-warrior-dedication',
  name: 'Dedicação de Guerreiro da Lasca de Guerra',
}

const avengingRunelordArchetypeFeats: Feat[] = [
  f({
    id: DED_AVENGING.id,
    name: DED_AVENGING.name,
    originalName: 'Avenging Runelord Dedication',
    level: 12,
    archetypeId: 'archetype-avenging-runelord',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Escolha um pecado: inveja, gula, ganância, preguiça ou ira (não luxúria nem orgulho; o motor não escolhe). Treinado em Arcana (outra perícia se já for treinado). 14º: perito em Arcana. 16º: mestre em Arcana. Familiaridade com armas comuns dos grupos haste e lança (marciais contam como simples; avançadas como marciais; sobe com simples). Idioma tasseloniano. 1/dia, uma magia inata arcana elevada à metade do nível (arredondada para cima); ataque e CD com proficiência mítica. Escolha: visão no escuro, armadura mística, corpo rúnico, arma rúnica, ver o invisível, mensagem, visão verdadeira, ou qualquer magia de 6º posto ou menor da lista de pecado da Escola de Magia Rúnica Thassiloniana. Resposta do Runelord (reação; disparo: uma criatura causa dano a você com magia): gaste um Ponto Mítico; o disparador toma 6d8 de força (Vontade básica contra a maior CD com proficiência mítica); +1d8 no 14º e a cada 2 níveis. Pecado, magia inata e perícia substituta são escolhas suas; o motor não escolhe.',
    effects: [
      {
        kind: 'skillRank',
        skillId: 'arcana',
        rank: 'trained',
        replaceIfTrained: true,
      },
      { kind: 'skillRank', skillId: 'arcana', rank: 'expert', minLevel: 14 },
      { kind: 'skillRank', skillId: 'arcana', rank: 'master', minLevel: 16 },
      {
        kind: 'weaponFamiliarity',
        groups: ['polearm', 'spear'],
        martialAsSimple: true,
        advancedAsMartial: true,
      },
      { kind: 'language', name: 'Tasseloniano' },
      {
        kind: 'textChoice',
        choiceId: 'avenging-runelord-sin',
        options: [
          { id: 'envy', label: 'Inveja' },
          { id: 'gluttony', label: 'Gula' },
          { id: 'greed', label: 'Ganância' },
          { id: 'sloth', label: 'Preguiça' },
          { id: 'wrath', label: 'Ira' },
        ],
        hint: 'Pecado do runelord cuja alma o influencia. Sem luxúria nem orgulho. O motor não escolhe.',
        abilityName: 'Pecado vingador: {choice}',
        abilityDescription:
          'Magias de pecado vêm da Escola de Magia Rúnica Thassiloniana (Rival Academies). Não precisa ser o mesmo pecado de um arquétipo runelord.',
      },
      {
        kind: 'textChoice',
        choiceId: 'avenging-runelord-innate',
        options: [
          { id: 'darkvision', label: 'Visão no escuro (darkvision)' },
          { id: 'mystic-armor', label: 'Armadura mística (mystic armor)' },
          { id: 'runic-body', label: 'Corpo rúnico (runic body)' },
          { id: 'runic-weapon', label: 'Arma rúnica (runic weapon)' },
          { id: 'see-the-unseen', label: 'Ver o invisível (see the unseen)' },
          { id: 'sending', label: 'Mensagem (sending)' },
          { id: 'truesight', label: 'Visão verdadeira (truesight)' },
          { id: 'sin-spell', label: 'Magia de pecado de 6º posto ou menor' },
        ],
        hint: 'Inata arcana 1/dia, elevada à metade do nível. Se pecar, nomeie a magia na ficha. O motor não escolhe.',
        abilityName: 'Inata 1/dia: {choice}',
        abilityDescription:
          'Arcana, proficiência mítica no ataque e na CD. Se escolheu magia de pecado, você nomeia qual.',
      },
      {
        kind: 'specialAbility',
        name: 'Resposta do Runelord',
        actionType: 'reaction',
        description:
          'Disparo: criatura causa dano a você com magia. Ponto Mítico: 6d8 de força (Vontade básica, maior CD, proficiência mítica). +1d8 no 14º e a cada 2 níveis.',
      },
    ],
    sourcePage: 72,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8139',
  }),
  f({
    id: EXPAND_RUNE.id,
    name: EXPAND_RUNE.name,
    originalName: 'Expanded Runelord Magic',
    level: 14,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Mais uma inata arcana 1/dia, elevada à metade do nível, proficiência mítica. Escolha na lista da Dedicação, mais contingência (contingency), riposta de magia (spell riposte) ou qualquer magia de 7º posto da escola do pecado. Você escolhe a magia; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'avenging-runelord-expanded-innate',
        options: [
          { id: 'darkvision', label: 'Visão no escuro' },
          { id: 'mystic-armor', label: 'Armadura mística' },
          { id: 'runic-body', label: 'Corpo rúnico' },
          { id: 'runic-weapon', label: 'Arma rúnica' },
          { id: 'see-the-unseen', label: 'Ver o invisível' },
          { id: 'sending', label: 'Mensagem' },
          { id: 'truesight', label: 'Visão verdadeira' },
          { id: 'contingency', label: 'Contingência (contingency)' },
          { id: 'spell-riposte', label: 'Riposta de magia (spell riposte)' },
          { id: 'sin-7', label: 'Magia de pecado de 7º posto' },
        ],
        hint: 'Segunda inata. O motor não escolhe. Se pecar, nomeie a magia.',
        abilityName: 'Inata extra 1/dia: {choice}',
        abilityDescription: 'Arcana, elevada à metade do nível, proficiência mítica.',
      },
    ],
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8140',
  }),
  f({
    id: 'feat-avenging-runelord-reliable-magic',
    name: 'Magia Confiável',
    originalName: 'Reliable Magic',
    level: 14,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Ao sobrecarregar uma varinha, −4 na CD do teste plano para não destruí-la (ainda fica quebrada no sucesso). Ao Conjurar de um pergaminho, pode gastar um Ponto Mítico como ação livre: a magia usa proficiência mítica. Depois, teste plano CD 11: sucesso = o pergaminho não é destruído e brilha como vela por 10 minutos; pode conjurar de novo dele sem aprimorar (este feito incluso) e então se destrói; se não usar em 10 minutos, destrói-se.',
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8141',
  }),
  f({
    id: 'feat-avenging-runelord-shining-runes',
    name: 'Runas Brilhantes',
    originalName: 'Shining Runes',
    level: 14,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Ao Conjurar uma Magia que exija mais de 1 ação, as runas thassilonianas ofuscam: você fica oculto de inimigos até o início do seu próximo turno. +2 na CD para identificar suas magias enquanto as conjura.',
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8142',
  }),
  f({
    id: 'feat-avenging-runelord-willing-runes',
    name: 'Runas Solícitas',
    originalName: 'Willing Runes',
    level: 14,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      '+2 de status em Decifrar Escrita, Identificar Magia, Aprender uma Magia, Pesquisa ou Recobrar Conhecimento que envolva leitura. +2 de status em salvaguardas e CA contra perigos de leitura (ex. ritual armadilha rúnica); +4 se você disparou o perigo ao ler. Se preparar magias de grimório, ganha Tirar das Páginas (3 ações, 1/dia; requisito: empunhar o grimório): gaste um Ponto Mítico e Conjure direto do livro uma magia de 1 ou 2 ações, elevada à metade do nível, proficiência mítica.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Decifrar Escrita, Identificar Magia, Aprender uma Magia, Pesquisa e Recobrar Conhecimento com leitura',
      },
      {
        kind: 'specialAbility',
        name: 'Tirar das Páginas',
        actionType: 'three',
        description:
          '1/dia, grimório na mão. Ponto Mítico: conjura magia de 1–2 ações do livro, elevada à metade do nível, proficiência mítica. Só se você preparar de grimório.',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8143',
  }),
  f({
    id: 'feat-avenging-runelord-writhing-runelord-weapon',
    name: 'Arma de Runelord Contorcida',
    originalName: 'Writhing Runelord Weapon',
    level: 14,
    archetypeId: 'archetype-avenging-runelord',
    traits: ['Arquétipo', 'Mítico', 'Arcano', 'Ímpeto'],
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhar uma haste ou lança' }],
    description:
      'Gaste um Ponto Mítico. A arma ganha o traço alcance até o fim do turno, se ainda não tiver. Anda e Golpeia duas vezes, em qualquer ordem. O movimento do Andar não provoca reações. Golpes com proficiência mítica e especialização crítica da arma. Penalidade de ataque múltiplo normal, mas o alvo do segundo Golpe fica desprevenido contra ele. Você escolhe a ordem e os alvos; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8144',
  }),
  f({
    id: 'feat-avenging-runelord-autonomous-arms',
    name: 'Braços Autônomos',
    originalName: 'Autonomous Arms',
    level: 16,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Nas preparações, escolha uma haste ou lança que você possua (o motor não escolhe). Fica infundida: reconhece você e nega os benefícios a outro portador enquanto você viver. Ganha os efeitos da runa de propriedade animada, sem contar no máximo de runas. Chamar à Mão (1 ação): a arma teleporta para o seu alcance no mesmo plano (20º: de qualquer lugar). Se uma criatura mítica de nível maior que o seu a empunhar, gaste um Ponto Mítico ou a ação falha (você sabe o motivo, não quem a tem).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Arma autônoma',
        description:
          'Você escolhe a haste/lança nas preparações. Runa animada extra. Chamar à Mão (1 ação). O motor não escolhe a arma.',
      },
    ],
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8145',
  }),
  f({
    id: 'feat-avenging-runelord-subjugation',
    name: 'Subjugação',
    originalName: 'Subjugation',
    level: 16,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Gaste um Ponto Mítico. Criatura que você perceba a 9 m faz Vontade contra a maior CD; gigantes −2 de status. Depois, imune por 24 h quando a Subjugação terminar. Crítico: nada. Sucesso: lento 1; você aprende habilidades e fraquezas como crítico em Recobrar Conhecimento. Falha: como sucesso, e você controla a criatura até o fim do próximo turno dela. Falha crítica: controla por 1 minuto. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8146',
  }),
  f({
    id: 'feat-avenging-runelord-vindictive-thoughts',
    name: 'Pensamentos Vingativos',
    originalName: 'Vindictive Thoughts',
    level: 16,
    archetypeId: 'archetype-avenging-runelord',
    traits: ['Arquétipo', 'Mítico', 'Arcano', 'Mental'],
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Antes da salvaguarda, gaste um Ponto Mítico: role com proficiência mítica. Qualquer resultado salvo falha crítica: o conjurador toma 10d6 mental (Vontade básica contra a maior CD com proficiência mítica). 18º: 11d6. 20º: 12d6.',
    actionType: 'reaction',
    trigger: 'Você faz uma salvaguarda contra uma magia.',
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8147',
  }),
  f({
    id: 'feat-avenging-runelord-advanced-runelord-magic',
    name: 'Magia de Runelord Avançada',
    originalName: 'Advanced Runelord Magic',
    level: 18,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: EXPAND_RUNE.id,
    prereqName: EXPAND_RUNE.name,
    description:
      'Mais uma inata arcana 1/dia, elevada à metade do nível, proficiência mítica. Escolha nas opções de Magia de Runelord Expandida, mais presciência (foresight), observação implacável (unrelenting observation) ou qualquer magia da escola do pecado. Você escolhe a magia; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'avenging-runelord-advanced-innate',
        options: [
          { id: 'from-expanded', label: 'Opção da Magia de Runelord Expandida' },
          { id: 'foresight', label: 'Presciência (foresight)' },
          { id: 'unrelenting-observation', label: 'Observação implacável (unrelenting observation)' },
          { id: 'any-sin', label: 'Qualquer magia da escola do pecado' },
        ],
        hint: 'Terceira inata. O motor não escolhe. Nomeie a magia na ficha.',
        abilityName: 'Inata avançada 1/dia: {choice}',
        abilityDescription: 'Arcana, elevada à metade do nível, proficiência mítica.',
      },
    ],
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8148',
  }),
  f({
    id: 'feat-avenging-runelord-apocalyptic-visions',
    name: 'Visões Apocalípticas',
    originalName: 'Apocalyptic Visions',
    level: 18,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Gaste um Ponto Mítico e escolha até 10 criaturas a 18 m que você perceba (o motor não escolhe). Vontade contra a maior CD com proficiência mítica. Crítico: nada. Sucesso: lento 1 por 1 rodada. Falha: lento 1 e estupefato 1 por 1 minuto. Falha crítica: lento 2 e estupefato 2 por 1 minuto, e sofre pesadelo (nightmare) no próximo descanso; se falhar ou falhar criticamente nesse efeito, repete a cada tentativa de dormir até sucesso ou 6 dias. Não precisa do nome nem permanecer no mesmo planeta.',
    actionType: 'two',
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8149',
  }),
  f({
    id: 'feat-avenging-runelord-craft-runewell',
    name: 'Criar Poço Rúnico',
    originalName: 'Craft Runewell',
    level: 20,
    archetypeId: 'archetype-avenging-runelord',
    prereqId: DED_AVENGING.id,
    prereqName: DED_AVENGING.name,
    description:
      'Aprende o ritual criar plano demiplano (create demiplane). O poço rúnico exige o ritual elevado a 10º: cria também um foco de ânima (objeto imóvel cuja aparência você desenha; o motor não escolhe) no local da conjuração. Só um poço por vez, até ser destruído. No mesmo plano do foco ou dentro do poço, condenado para em 3. Para destruir foco ou poço, um adversário precisa reduzi-lo a 0 PV e condenado 3 e então reduzir o foco a 0 PV com magia arcana (ou agente sob magia arcana) de uma escola oposta ao pecado. Foco: Dureza = 2 × nível, PV iguais aos seus, cura acelerada = 2 × mod. de Inteligência. Enquanto um povoado considerável com esse pecado prevalecer a até 160 km (MJ decide) e você estiver no mesmo plano, não envelhece e é imune a efeitos que roubem capacidades mentais (ex. never mind, confuso, estupefato). Outros só entram no poço com chave planar que você criou e entregou, ou adjacentes ao foco. Saída: Interagir, aparecem adjacentes ao foco. Entrar no Poço Rúnico (10 min, concentrar, manipular, teleportação): você e até 6 criaturas dispostas que você toque vão ao poço, qualquer distância.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Poço rúnico e foco de ânima',
        description:
          'Você desenha o foco e cria chaves planares. O motor não escolhe aparência, local nem quem recebe chave.',
      },
    ],
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8150',
  }),
]

const heroicScionArchetypeFeats: Feat[] = [
  f({
    id: DED_SCION.id,
    name: DED_SCION.name,
    originalName: 'Heroic Scion Dedication',
    level: 12,
    archetypeId: 'archetype-heroic-scion',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Combine com o MJ a vida anterior (PC/NPC morto) e o nêmesis (indivíduo, grupo ou organização). Você sente quando o nêmesis está ativo e quando foi derrotado de vez. +2 de circunstância em Percepção para Procurar ou Sentir Motivação quando aliado ou servo do nêmesis tenta Mentir, escapar à sua atenção ou Personificar. −1 na CD de testes de recuperação. Escolha uma perícia que não seja Conhecimento, conforme o herói reencarnado (o MJ pode sugerir lista; o motor não escolhe): ao usá-la, pode gastar um Ponto Mítico para testar com proficiência mítica. Ganha Conhecimento Adicional de Encarnação (recordar façanhas passadas; sobe em 3, 7 e 15; se já era treinado, outro Conhecimento à escolha — nomeie; o motor não escolhe). Clarão de Memória (ação livre): gaste um Ponto Mítico e teste Conhecimento de Encarnação com proficiência mítica no lugar de qualquer outro Conhecimento (exceto Encarnação).',
    effects: [
      {
        kind: 'lore',
        loreName: 'Encarnação',
        rank: 'trained',
      },
      {
        kind: 'skillSelect',
        choiceId: 'heroic-scion-theme-skill',
        hint: 'Uma perícia que não seja Conhecimento, conforme o herói reencarnado. O motor não escolhe.',
        abilityName: 'Perícia do herói: {skill}',
        abilityDescription:
          'Ao usar uma ação com essa perícia, pode gastar um Ponto Mítico para testar com proficiência mítica.',
      },
      {
        kind: 'specialAbility',
        name: 'Nêmesis e vida anterior',
        description:
          'Você e o MJ nomeiam o herói anterior e o nêmesis. +2 de circunstância em Procurar/Sentir Motivação contra mentira, furtividade ou personificação de aliados do nêmesis. −1 na CD de recuperação. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Clarão de Memória',
        actionType: 'free',
        description:
          'Ponto Mítico: Conhecimento de Encarnação com proficiência mítica no lugar de outro Conhecimento (exceto Encarnação).',
      },
    ],
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8151',
  }),
  f({
    id: 'feat-heroic-scion-avoid-fates-gaze',
    name: 'Evitar o Olhar do Destino',
    originalName: "Avoid Fate's Gaze",
    level: 14,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Salvaguardas contra efeitos de vidência usam proficiência mítica. Vidências que observam você sem salvaguarda (ex. clarividência, clariaudiência) tratam você como oculto e ativamente tentando Esconder-se ou Furtar-se, a menos que também sejam míticas.',
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8152',
  }),
  f({
    id: 'feat-heroic-scion-ive-been-here-before',
    name: 'Eu Já Estive Aqui',
    originalName: "I've Been Here Before",
    level: 14,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Nas preparações numa região que você nunca visitou (cidade, região geográfica ou plano demiplano pequeno; não masmorra nem estrutura de encontro), escolha Evitar Atenção, Defender, Investigar, Explorar ou Procurar. Faz essa atividade de exploração em deslocamento total (não metade) e testes de perícia dela com proficiência mítica, até entrar numa nova região (MJ). Você escolhe a atividade a cada região nova; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Já estive aqui',
        description:
          'Nas preparações em região nova, escolha a atividade de exploração. O motor não escolhe.',
      },
    ],
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8153',
  }),
  f({
    id: 'feat-heroic-scion-internal-dialogue',
    name: 'Diálogo Interno',
    originalName: 'Internal Dialogue',
    level: 14,
    archetypeId: 'archetype-heroic-scion',
    traits: ['Arquétipo', 'Mítico', 'Destino'],
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Role um teste de Conhecimento de Encarnação e use esse resultado no lugar da falha da perícia.',
    actionType: 'reaction',
    trigger: 'Você falha num teste de perícia.',
    frequency: '1 vez a cada 10 minutos',
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8154',
  }),
  f({
    id: 'feat-heroic-scion-my-reputation-precedes-me',
    name: 'Minha Reputação Me Precede',
    originalName: 'My Reputation Precedes Me',
    level: 14,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      '+2 de circunstância em Diplomacia para Recolher Informações ou Causar Impressão e em Intimidação para Coagir (+3 no 18º). Ponto Mítico nesse teste: proficiência mítica.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Diplomacia (Recolher Informações, Causar Impressão) e Intimidação (Coagir); +3 no 18º',
      },
    ],
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8155',
  }),
  f({
    id: 'feat-heroic-scion-reincarnated-companion',
    name: 'Companheiro Reencarnado',
    originalName: 'Reincarnated Companion',
    level: 14,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Se tiver companheiro animal, ele ganha uma especialização à sua escolha. Se tiver familiar, ganha duas habilidades de familiar extras. Se o companheiro fadado morrer, substitua sem custo nas preparações. Você escolhe especialização ou habilidades; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro fadado',
        description:
          'Especialização de companheiro animal ou +2 habilidades de familiar, à sua escolha — nunca os dois automaticamente. Substituição grátis nas preparações se morrer. O motor não escolhe.',
      },
    ],
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8156',
  }),
  f({
    id: 'feat-heroic-scion-to-thine-own-self',
    name: 'Sê Fiel a Ti Mesmo',
    originalName: 'To Thine Own Self',
    level: 14,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Tente contra-atacar o efeito disparador usando o modificador de Conhecimento de Encarnação e posto de contra-ataque igual à metade do seu nível.',
    actionType: 'reaction',
    trigger:
      'Você falha numa salvaguarda contra um efeito que alteraria sua memória ou o deixaria controlado por outra criatura.',
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8157',
  }),
  f({
    id: 'feat-heroic-scion-daunting-spell',
    name: 'Magia Intimidante',
    originalName: 'Daunting Spell',
    level: 16,
    archetypeId: 'archetype-heroic-scion',
    traits: ['Arquétipo', 'Mítico', 'Emoção', 'Medo', 'Mental', 'Forma de Magia'],
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Se a próxima ação for Conjurar uma Magia com salvaguarda, a magia ganha emoção, medo e mental, além dos efeitos abaixo. Se o alvo for o nêmesis ou aliado dele, ataque e CD com proficiência mítica (todos os alvos precisam ser nêmesis/aliados para isso). Crítico: nada deste feito. Sucesso: assustado 1. Falha: assustado 2 e estupefato 1 enquanto assustado; se a magia tiver duração, não reduz assustado abaixo de 1 até ela acabar. Falha crítica: assustado 3 e estupefato 2.',
    actionType: 'one',
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8158',
  }),
  f({
    id: 'feat-heroic-scion-let-death-be-my-weapon',
    name: 'Que a Morte Seja Minha Arma',
    originalName: 'Let Death Be My Weapon',
    level: 16,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Enquanto tiver condenado, morrendo ou ferido, ganha o maior desses valores como bônus de status no dano de Golpes de arma corpo a corpo ou à distância. Partilhar as Promessas da Morte (ação livre; disparo: seu turno começa; requisito: você está ganhando esse bônus): gaste um Ponto Mítico; o bônus de status no dano dobra por 1 minuto e não sobe nem desce se as condições mudarem.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Partilhar as Promessas da Morte',
        actionType: 'free',
        description:
          'Disparo: turno começa e você tem o bônus deste feito. Ponto Mítico: dobro do bônus por 1 minuto, fixo.',
      },
    ],
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8159',
  }),
  f({
    id: 'feat-heroic-scion-momentary-respite',
    name: 'Alívio Momentâneo',
    originalName: 'Momentary Respite',
    level: 16,
    archetypeId: 'archetype-heroic-scion',
    traits: ['Arquétipo', 'Mítico', 'Cura'],
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Gaste um Ponto Mítico. Recupera 8d8 PV e remove qualquer dano persistente. Até o fim do seu próximo turno, imune a dano persistente (ainda sofre outros efeitos do ataque/magia que também aplicariam persistente).',
    actionType: 'free',
    trigger: 'Você perde PV de dano persistente.',
    frequency: '1 vez por dia',
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8160',
  }),
  f({
    id: 'feat-heroic-scion-vigorous-victor',
    name: 'Vitorioso Vigoroso',
    originalName: 'Vigorous Victor',
    level: 16,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      '+2 de circunstância em salvaguardas contra drenado, enfraquecido, fatigado, enjoado ou lento (+3 no 18º). Pode gastar um Ponto Mítico nessa salvaguarda para usar proficiência mítica.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Salvaguardas contra drenado, enfraquecido, fatigado, enjoado ou lento; +3 no 18º',
      },
    ],
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8161',
  }),
  f({
    id: 'feat-heroic-scion-on-my-best-day',
    name: 'No Meu Melhor Dia',
    originalName: 'On My Best Day',
    level: 18,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Conhecimento de Encarnação contra CD muito difícil do seu nível. Crítico: +3 de status na CA e resistência a dano físico igual ao nível até o fim do próximo turno; pode Sustentar até 1 minuto. Sucesso: +2 e resistência = metade do nível. Falha: +1 de status na CA até o fim do próximo turno. Falha crítica: +1 de status na CA só contra o próximo ataque até o fim do próximo turno.',
    actionType: 'one',
    frequency: '1 vez por hora',
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8162',
  }),
  f({
    id: 'feat-heroic-scion-telling-blow',
    name: 'Golpe Decisivo',
    originalName: 'Telling Blow',
    level: 18,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Gaste um Ponto Mítico. Golpeie com proficiência mítica. Se acertar, +1 dado de dano da arma. Depois de ver o resultado, pode gastar Pontos Míticos extras: +1 dado por ponto (+2 dados por ponto se o alvo for o nêmesis ou aliado dele). Se não restar nenhum Ponto Mítico, fica fatigado.',
    actionType: 'one',
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8163',
  }),
  f({
    id: 'feat-heroic-scion-to-me',
    name: 'A Mim!',
    originalName: 'To Me!',
    level: 18,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      'Gaste um Ponto Mítico. Anda e faça um Golpe corpo a corpo. Ao fim do turno, aliados a 9 m que possam vê-lo e ouvi-lo podem Andar na sua direção como ação livre (desvio de obstáculos ok; se Andarem, precisam terminar ao menos 1,5 m mais perto). Reações disparadas por esse movimento: você ou o aliado usa proficiência mítica na CA ou salvaguarda. Aliado no alcance corpo a corpo do alvo do seu Golpe pode Golpear esse inimigo como reação em vez de Andar. Golpes deste feito contra o nêmesis (seus ou dos aliados) usam proficiência mítica. Aliados escolhem se movem ou Golpeiam; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8164',
  }),
  f({
    id: 'feat-heroic-scion-eternal-hero',
    name: 'Herói Eterno',
    originalName: 'Eternal Hero',
    level: 20,
    archetypeId: 'archetype-heroic-scion',
    prereqId: DED_SCION.id,
    prereqName: DED_SCION.name,
    description:
      '−1 extra na CD de recuperação (cumulativo com a Dedicação). Condenado não sobe a 4 ou mais. A primeira vez por dia que cairia a 0 PV ou seria morto por magia, permanece em 1 PV e imune a todo dano até o fim do próximo turno. Se morrer, pode gastar um Ponto Mítico como ação livre para reencarnar na hora num corpo novo (mesmas estatísticas, salvo possível mudança de ancestralidade e feitos de ancestralidade) a 4,5 m. Cada reencarnação extra custa +1 Ponto; após a terceira, não volta assim (máx. 3 Pontos Míticos). Você escolhe ancestralidade se mudar; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Herói eterno',
        description:
          '−1 extra na CD de recuperação. Condenado máximo 3. 1ª queda a 0 PV/morte mágica do dia: 1 PV e imune a dano até o fim do próximo turno. Reencarnação: 1/2/3 Pontos Míticos.',
      },
    ],
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8165',
  }),
]

const timewrackedArchetypeFeats: Feat[] = [
  f({
    id: DED_TIME.id,
    name: DED_TIME.name,
    originalName: 'Timewracked Dedication',
    level: 12,
    archetypeId: 'archetype-timewracked',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      '+1,5 m em cada modo de deslocamento que você tiver. Pode gastar um Ponto Mítico para rolar iniciativa com proficiência mítica. Empate de iniciativa com oponente: você escolhe agir primeiro. Desvio pelo Tempo (reação; disparo: você faria Reflexos contra efeito de área): teleporte até 3 m; se sair da área, não precisa do teste; fica desprevenido por 1 rodada.',
    effects: [
      { kind: 'speedBonus', value: 5 },
      {
        kind: 'specialAbility',
        name: 'Deslocamento temporal',
        description:
          '+1,5 m em cada modo de deslocamento (o bônus de ficha cobre o terrestre; aplique o mesmo aos demais modos que você tiver).',
      },
      {
        kind: 'specialAbility',
        name: 'Desvio pelo Tempo',
        actionType: 'reaction',
        description:
          'Disparo: Reflexos contra área. Teleporte 3 m; fora da área = sem teste. Desprevenido 1 rodada.',
      },
    ],
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8166',
  }),
  f({
    id: 'feat-timewracked-be-right-back',
    name: 'Já Volto',
    originalName: 'Be Right Back',
    level: 14,
    archetypeId: 'archetype-timewracked',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Você pisca, ajusta o equipamento e reaparece com um item comum de nível ≤ o seu, Bulk baixo o bastante para não deixá-lo sobrecarregado, pago com moeda que você carrega (preço normal). Pode estar vestido, empunhado (mãos livres) e já Investido se tiver o traço, se você não estiver no limite. Você escolhe o item; o motor não escolhe.',
    actionType: 'three',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8167',
  }),
  f({
    id: 'feat-timewracked-live-off-borrowed-time',
    name: 'Viver de Tempo Emprestado',
    originalName: 'Live Off Borrowed Time',
    level: 14,
    archetypeId: 'archetype-timewracked',
    traits: ['Arquétipo', 'Mítico', 'Oculto'],
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Fica acelerado 1 rodada; a ação extra é qualquer ação básica ou especial básica de 1 ação, disponível imediatamente neste turno. No fim do turno, fica lento 1 e imune a acelerado até o fim do próximo turno.',
    actionType: 'free',
    trigger: 'Seu turno começa.',
    frequency: '1 vez por minuto',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8168',
  }),
  f({
    id: 'feat-timewracked-now-you-see-me',
    name: 'Agora Você Me Vê',
    originalName: 'Now You See Me',
    level: 14,
    archetypeId: 'archetype-timewracked',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Ande até seu Deslocamento. Não provoca reações; você fica oculto até o fim do turno; todas as criaturas ficam desprevenidas contra você até o fim do turno. Pode Cavar, Escalar, Voar ou Nadar no lugar se tiver o deslocamento.',
    actionType: 'one',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8169',
  }),
  f({
    id: 'feat-timewracked-second-sight',
    name: 'Segunda Visão',
    originalName: 'Second Sight',
    level: 14,
    archetypeId: 'archetype-timewracked',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Gaste um Ponto Mítico e Recobre Conhecimento com proficiência mítica sobre uma criatura que você vê (você escolhe; o motor não escolhe). Crítico: você aprende todas as ações que ela fará no próximo turno (ou na 1ª rodada se o combate não começou); elas ficam travadas (a ordem pode mudar se a situação permitir; ação impossível é perdida; mudança drástica = MJ). Sucesso: +1 informação como se tivesse crítico no Recobrar Conhecimento.',
    actionType: 'one',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8170',
  }),
  f({
    id: TEMPORAL_FURY.id,
    name: TEMPORAL_FURY.name,
    originalName: 'Temporal Fury',
    level: 14,
    archetypeId: 'archetype-timewracked',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Gaste um Ponto Mítico. Golpeie, depois Dê um Passo de até 3 m (barreiras e terreno difícil valem; o movimento é físico, só parece teleporte). Depois outro Golpe. Penalidade de ataque múltiplo nos dois; o segundo usa proficiência mítica e o alvo está desprevenido. Você escolhe os alvos; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8171',
  }),
  f({
    id: 'feat-timewracked-bolstered-recovery',
    name: 'Recuperação Fortalecida',
    originalName: 'Bolstered Recovery',
    level: 16,
    archetypeId: 'archetype-timewracked',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'No descanso completo, dobre os PV recuperados e a redução de valores de condição. Recuperação Instantânea (1 ação, 1/dia): gaste um Ponto Mítico; recupera PV iguais ao mod. de Constituição (mín. 1) × nível e remove fatigado. Contra aflição recorrente (veneno, doença), salvaguarda com proficiência mítica só para reduzir o estágio (não aumenta estágio nem muda duração máxima).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Recuperação instantânea',
        actionType: 'one',
        description:
          '1/dia. Ponto Mítico: PV = mod. Constituição (mín. 1) × nível; remove fatigado. Aflição: salvaguarda mítica só para reduzir estágio.',
      },
    ],
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8172',
  }),
  f({
    id: 'feat-timewracked-echoing-fury',
    name: 'Fúria Ecoante',
    originalName: 'Echoing Fury',
    level: 16,
    archetypeId: 'archetype-timewracked',
    prereqId: TEMPORAL_FURY.id,
    prereqName: TEMPORAL_FURY.name,
    description:
      'Em Fúria Temporal, o Passo pode ser até 4,5 m. Se o segundo Golpe for na mesma criatura, +1 dado de dano da arma; se os dois acertarem, some o dano para resistências e fraquezas.',
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8173',
  }),
  f({
    id: 'feat-timewracked-preserve-the-moment',
    name: 'Preservar o Momento',
    originalName: 'Preserve the Moment',
    level: 16,
    archetypeId: 'archetype-timewracked',
    traits: ['Arquétipo', 'Mítico', 'Oculto'],
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Anote as ações do turno que acabou (exceto esta reação) e os resultados dos dados que você rolou (não testes causados por outros ou pelo ambiente). Ganha Restaurar o Momento (reação, 1 vez nas próximas 24 h; disparo: seu turno começa): gaste um Ponto Mítico e refaça as mesmas ações na mesma ordem com os mesmos dados, aplicando modificadores atuais com proficiência mítica. Detalhes podem mudar (outro alvo, outro caminho), mas o tipo de movimento e de arma precisam ser os mesmos. Se não puder cumprir a próxima ação, o turno acaba e você fica atordoado 1. Conjurar vale, mas outra magia = atordoado 1 (posto diferente ok).',
    actionType: 'reaction',
    trigger: 'Seu turno termina.',
    frequency: '1 vez por dia',
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8174',
  }),
  f({
    id: 'feat-timewracked-fracture-time-flow',
    name: 'Fraturar o Fluxo do Tempo',
    originalName: 'Fracture Time Flow',
    level: 18,
    archetypeId: 'archetype-timewracked',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Sempre que obtiver sucesso crítico num Golpe, o alvo faz Vontade contra a maior entre CD de classe e CD de magia. Crítico: nada. Sucesso: lento 1 por 1 rodada. Falha: lento 2 por 1 rodada. Falha crítica: atordoado 3, depois lento 2 por 1 rodada.',
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8175',
  }),
  f({
    id: 'feat-timewracked-not-this-time',
    name: 'Desta Vez Não',
    originalName: 'Not This Time',
    level: 18,
    archetypeId: 'archetype-timewracked',
    traits: ['Arquétipo', 'Mítico', 'Oculto'],
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Gaste um Ponto Mítico. A criatura faz Vontade contra a maior CD com proficiência mítica. Crítico: o efeito o atinge normalmente. Sucesso: +2 de circunstância na CA ou na salvaguarda. Falha: +2 na CA e crítico contra você vira acerto; ou +2 na salvaguarda e falha crítica vira falha. Falha crítica: o alvo falha e as ações gastas se perdem.',
    actionType: 'reaction',
    trigger:
      'Uma criatura escolhe você como alvo de magia ou habilidade de alvo único contra a qual você se defende com salvaguarda ou CA.',
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8176',
  }),
  f({
    id: 'feat-timewracked-timelessness',
    name: 'Intemporalidade',
    originalName: 'Timelessness',
    level: 20,
    archetypeId: 'archetype-timewracked',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Enquanto estiver dilacerado pelo tempo, não envelhece e não morre de causas naturais. Imune a magias e efeitos hostis de tempo ou envelhecimento e à condição lento (exceto o lento deste destino). −1 na CD de recuperação. Teste plano para encerrar dano persistente: role duas vezes e escolha (fortuna). Sempre que um inimigo de que você está ciente a 18 m ficar acelerado, você fica acelerado 1 rodada com as mesmas ações extras que a habilidade dele concede.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Intemporalidade',
        description:
          'Sem envelhecimento nem morte natural. Imune a tempo/envelhecimento hostis e a lento (exceto deste destino). −1 na CD de recuperação. Persistente: dois testes, você escolhe (fortuna). Inimigo acelerado a 18 m: você também, mesmas ações.',
      },
    ],
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8177',
  }),
]

const warshardWarriorArchetypeFeats: Feat[] = [
  f({
    id: DED_WARSHARD.id,
    name: DED_WARSHARD.name,
    originalName: 'Warshard Warrior Dedication',
    level: 12,
    archetypeId: 'archetype-warshard-warrior',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Chamado mítico (mythic calling)' }],
    description:
      'Nas preparações, escolha uma arma que você possua em que seja ao menos perito: ela vira sua arma de lasca de guerra até a próxima escolha. Pode ser mundana, com runas, de material especial ou arma mágica específica, mas não inteligente nem artefato. Só uma por vez. Você nomeia e descreve a arma; o motor nunca escolhe. Ganha Golpe Mítico, mas só com essa arma. Golpe com ela em proficiência mítica dobra o dano extra de especialização em arma. Conserto: trate Ofício como lendário para PV restaurados; falha crítica vira falha. Chamar Arma da Lasca (1 ação; requisito: não a empunhar e ter mãos livres): teleporta para a mão no mesmo planeta (15º: mesmo plano; 18º: qualquer distância). Se estiver com criatura mítica de nível maior ou em área sem teleportação, teste plano CD 16 para ainda vir.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Arma de lasca de guerra',
        description:
          'Você nomeia, descreve e escolhe a arma nas preparações (perito ou melhor; não inteligente/artefato). Traço mítico. O motor não escolhe nem aplica uma arma sozinho.',
      },
      {
        kind: 'specialAbility',
        name: 'Golpe Mítico (só a lasca)',
        description:
          'Como o feito Golpe Mítico, restrito à arma de lasca. Especialização em arma dobrada em Golpes míticos com ela.',
      },
      {
        kind: 'specialAbility',
        name: 'Chamar Arma da Lasca',
        actionType: 'one',
        description:
          'Teleporta a arma à mão. Planeta → plano (15º) → qualquer distância (18º). CD 16 se mítico de nível maior ou antimagia de teleporte.',
      },
    ],
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8178',
  }),
  f({
    id: 'feat-warshard-warrior-athletes-ally',
    name: 'Aliado do Atleta',
    originalName: "Athlete's Ally",
    level: 14,
    archetypeId: 'archetype-warshard-warrior',
    traits: ['Arquétipo', 'Mítico', 'Mágico'],
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhar a arma de lasca de guerra' }],
    description:
      'Gaste um Ponto Mítico. Por 1 minuto, Atletismo para Desarmar, Agarrar, Reposicionar, Empurrar ou Derrubar com a arma de lasca usa proficiência mítica. Não concede traços extras à arma; as manobras possíveis continuam limitadas pelos traços dela. Você escolhe a manobra; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8179',
  }),
  f({
    id: 'feat-warshard-warrior-lightless-sight',
    name: 'Visão sem Luz',
    originalName: 'Lightless Sight',
    level: 14,
    archetypeId: 'archetype-warshard-warrior',
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    description:
      'Visão no escuro enquanto empunhar a arma de lasca (visão no escuro maior se já tiver). Visão da Arma (1 ação): percebe como se olhasse da arma, em todas as direções (não pode ser flanqueado). Falha se a arma estiver noutro plano e você não a empunhar. Ponto Mítico: salvaguardas visuais com proficiência mítica enquanto observa pela arma. Até 1 minuto ou abrir os olhos (ação livre).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Visão da arma',
        actionType: 'one',
        description:
          'Observar da arma, todas as direções, sem flanco, até 1 min. Ponto Mítico: salvaguardas visuais míticas.',
      },
    ],
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8180',
  }),
  f({
    id: 'feat-warshard-warrior-steadfast-grip',
    name: 'Punho Firme',
    originalName: 'Steadfast Grip',
    level: 14,
    archetypeId: 'archetype-warshard-warrior',
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    description:
      'CDs contra Desarmar, Roubar ou tirar a arma de lasca de você usam proficiência mítica. Enquanto for sua arma de lasca, Dureza + metade do nível e PV + o seu nível.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Punho firme',
        description:
          'CD mítica contra remover a arma. Dureza + metade do nível; PV + nível, só enquanto for a lasca.',
      },
    ],
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8181',
  }),
  f({
    id: 'feat-warshard-warrior-transmute-weapon',
    name: 'Transmutar Arma',
    originalName: 'Transmute Weapon',
    level: 14,
    archetypeId: 'archetype-warshard-warrior',
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    description:
      'Nas preparações, ao escolher a arma de lasca, pode transmutar o material para um material precioso (adamantina, prata da alvorada, ferro frio etc.) de nível ≤ o seu. Grau padrão só se a arma for no mínimo 9º; alto grau só se for no mínimo 15º. Você escolhe o material e o grau; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Material da lasca',
        description:
          'Você nomeia o material precioso e o grau nas preparações. O motor não escolhe.',
      },
    ],
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8182',
  }),
  f({
    id: 'feat-warshard-warrior-warshard-rune',
    name: 'Runa da Lasca de Guerra',
    originalName: 'Warshard Rune',
    level: 14,
    archetypeId: 'archetype-warshard-warrior',
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    description:
      'Nas preparações, escolha uma runa de propriedade de arma comum de nível ≤ o seu. Aplica-se à lasca sem contar no máximo de runas. Se já houver runa do mesmo tipo, só a de maior nível vale. Só funciona enquanto você empunhar a lasca e tiver ao menos 1 Ponto Mítico não gasto; senão dorme. Você escolhe a runa; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Runa extra da lasca',
        description:
          'Você escolhe a runa comum nas preparações. Requer 1 Ponto Mítico não gasto para funcionar. O motor não escolhe.',
      },
    ],
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8183',
  }),
  f({
    id: 'feat-warshard-warrior-divide-and-conquer',
    name: 'Dividir e Conquistar',
    originalName: 'Divide and Conquer',
    level: 16,
    archetypeId: 'archetype-warshard-warrior',
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhar arma de lasca corpo a corpo' }],
    description:
      'Gaste 1 Ponto Mítico. Dê um Passo a um espaço de onde ameace ao menos dois oponentes com a lasca. Dois Golpes com proficiência mítica, cada um contra alvo diferente. Se ambos acertarem, efeito extra conforme o dano: concussão = desprevenidos até o início do seu próximo turno; perfurante = 1d8 de sangramento persistente; corte = enjoado 2. Os dois contam na penalidade, que só sobe depois. Sem um desses três tipos, não pode usar. Dois tipos diferentes nos alvos = sem efeito extra. Você escolhe os alvos; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8184',
  }),
  f({
    id: 'feat-warshard-warrior-indomitable-shot',
    name: 'Tiro Indomável',
    originalName: 'Indomitable Shot',
    level: 16,
    archetypeId: 'archetype-warshard-warrior',
    traits: ['Arquétipo', 'Mítico', 'Ataque'],
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhar arma de lasca à distância' }],
    description:
      'Gaste 1 Ponto Mítico e dispare um tiro: dano da arma em todas as criaturas numa linha até o alcance máximo ou até objeto sólido com mais de 1,5 m de espessura ou Dureza > 20. Reflexos básico contra a maior CD com proficiência mítica. +2 de circunstância cumulativo na salvaguarda por incremento de alcance além do primeiro. Conta como dois ataques na penalidade.',
    actionType: 'two',
    sourcePage: 86,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8185',
  }),
  f({
    id: 'feat-warshard-warrior-prescient-parry',
    name: 'Aparar Presciente',
    originalName: 'Prescient Parry',
    level: 16,
    archetypeId: 'archetype-warshard-warrior',
    traits: ['Arquétipo', 'Mítico', 'Manipular'],
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhar a arma de lasca de guerra' }],
    description:
      'Gaste um Ponto Mítico. CA deste ataque com proficiência mítica, mais o bônus de item da arma. Se o ataque errar e o alvo estiver no seu alcance (ou no primeiro incremento, se a lasca for à distância), pode Golpear o atacante com a lasca.',
    actionType: 'reaction',
    trigger: 'Você é alvo de um Golpe corpo a corpo ou à distância com uma arma.',
    sourcePage: 87,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8186',
  }),
  f({
    id: 'feat-warshard-warrior-final-shot-knows-the-way',
    name: 'O Tiro Final Conhece o Caminho',
    originalName: 'Final Shot Knows the Way',
    level: 18,
    archetypeId: 'archetype-warshard-warrior',
    traits: ['Arquétipo', 'Mítico', 'Pressão'],
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Empunhar arma de lasca à distância e ter Golpeado com ela neste turno',
      },
    ],
    description:
      'Gaste um Ponto Mítico. Anda duas vezes; em qualquer ponto, Golpe à distância com proficiência mítica contra o mesmo inimigo já atacado neste turno. Ignora cobertura, ocultação e penalidades de incremento. Se acertar, o alvo fica desprevenido até o fim do seu próximo turno.',
    actionType: 'two',
    sourcePage: 87,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8187',
  }),
  f({
    id: 'feat-warshard-warrior-throw-and-catch',
    name: 'Arremessar e Pegar',
    originalName: 'Throw and Catch',
    level: 18,
    archetypeId: 'archetype-warshard-warrior',
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhar arma de lasca corpo a corpo' }],
    description:
      'Gaste um Ponto Mítico. A arma ganha arremesso com incremento de 12 m (ou +12 m se já tiver). Golpe à distância com proficiência mítica; aplique o modificador de Força completo no dano, como corpo a corpo. Depois a arma volta à mão e você pode Golpear corpo a corpo (proficiência normal, não mítica) contra um alvo ao alcance. Os dois contam na penalidade, que só sobe depois. Você escolhe os alvos; o motor não escolhe.',
    actionType: 'two',
    sourcePage: 87,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8188',
  }),
  f({
    id: 'feat-warshard-warrior-i-am-the-weapon',
    name: 'Eu Sou a Arma',
    originalName: 'I Am the Weapon',
    level: 20,
    archetypeId: 'archetype-warshard-warrior',
    prereqId: DED_WARSHARD.id,
    prereqName: DED_WARSHARD.name,
    description:
      'Se você morreria empunhando a lasca, desaparece e ela cai. Reaparece adjacente quando uma criatura senciente a pega: aliado próximo = 1 PV; estranho = PV máximos. Pode atrasar o retorno até 24 h. Se ninguém pegar em 1 semana, a alma segue o Rio das Almas (outros meios de reviver valem). Ao recobrar a consciência, Chamar Arma da Lasca como ação livre. Alternativa se ninguém pegar em 1 semana: fundir-se à arma como item inteligente (Percepção, sentidos, comunicação, idiomas, atributos e Vontade seus; perícias de INT/SAB/CAR). Sem Pontos Míticos, mas a arma continua mítica. Ataca com o modificador que tinha em vida; dano usa a Força do portador. Transmitir Sabedoria Marcial (2 ações; concentrar, mítico, predição; 1/10 min): o portador Golpeia com proficiência mítica, ignorando penalidades de circunstância e teste plano de oculto/escondido. Destruído nessa forma: Rio das Almas; precisa designar nova lasca se voltar. Você escolhe atrasar, fundir-se ou não; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Eu sou a arma',
        description:
          'Morte com a lasca: some e volte quando a pegarem (1 PV aliado / cheio estranho), ou funda-se após 1 semana. Transmitir Sabedoria Marcial 1/10 min. O motor não escolhe o destino.',
      },
    ],
    sourcePage: 87,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8189',
  }),
]

export const archetypeFeatsMythicRemaster5: Feat[] = [
  ...avengingRunelordArchetypeFeats,
  ...heroicScionArchetypeFeats,
  ...timewrackedArchetypeFeats,
  ...warshardWarriorArchetypeFeats,
]
