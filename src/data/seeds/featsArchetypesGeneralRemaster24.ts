/** Gerais Remaster: Orador do Crepúsculo, Herdeiros de Domora, Hellbreaker, Herdeiro Chelaxiano, Sanguimante. Sem Legacy. */
import type { Feat } from '@/types/feat'
import {
  SOURCE_GATEWALKERS_HARDCOVER_ID,
  SOURCE_HELLBREAKERS_ID,
  SOURCE_HELLS_DESTINY_ID,
  SOURCE_THIRST_FOR_BLOOD_ID,
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
  ignoresDedicationLockFromArchetypeIds?: string[]
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
    ignoresDedicationLockFromArchetypeIds: opts.ignoresDedicationLockFromArchetypeIds,
    sourceId: opts.sourceId ?? SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_TWILIGHT = {
  id: 'feat-twilight-speaker-dedication',
  name: 'Dedicação de Orador do Crepúsculo',
}
const SMILE = {
  id: 'feat-twilight-speaker-disarming-smile',
  name: 'Sorriso Desarmante',
}
const DED_DOMORA = {
  id: 'feat-scions-of-domora-dedication',
  name: 'Dedicação de Herdeiros de Domora',
}
const SPIRIT_STRIKE = {
  id: 'feat-scions-of-domora-spiritual-strike',
  name: 'Golpe Espiritual',
}
const DED_HELL = {
  id: 'feat-hellbreaker-dedication',
  name: 'Dedicação de Hellbreaker',
}
const DEVIL_KNOW = {
  id: 'feat-hellbreaker-devil-you-know',
  name: 'O Diabo que Você Conhece',
}
const DEFY_HELL = {
  id: 'feat-hellbreaker-defy-hell',
  name: 'Desafiar o Inferno',
}
const DED_CHELAX = {
  id: 'feat-chelaxian-scion-dedication',
  name: 'Dedicação de Herdeiro Chelaxiano',
}
const DED_SANGU = {
  id: 'feat-sanguimancer-dedication',
  name: 'Dedicação de Sanguimante',
}

const twilightSpeakerArchetypeFeats: Feat[] = [
  f({
    id: DED_TWILIGHT.id,
    name: DED_TWILIGHT.name,
    originalName: 'Twilight Speaker Dedication',
    level: 2,
    archetypeId: 'archetype-twilight-speaker',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'society', rank: 'trained' },
      { kind: 'text', label: 'Elfo Ilverani; treinado em Sociedade' },
    ],
    description:
      'Perito em Sociedade; mestre no 7º; lendário no 15º. Pode usar Sociedade no lugar de Diplomacia para Causar Impressão em humanoides inteligentes não élficos. O motor aplica os postos.',
    effects: [
      { kind: 'skillRank', skillId: 'society', rank: 'expert' },
      { kind: 'skillRank', skillId: 'society', rank: 'master', minLevel: 7 },
      { kind: 'skillRank', skillId: 'society', rank: 'legendary', minLevel: 15 },
      {
        kind: 'specialAbility',
        name: 'Sociedade no lugar de Diplomacia',
        description:
          'Use Sociedade no lugar de Diplomacia para Causar Impressão em humanoides inteligentes sem o traço elfo.',
      },
    ],
    sourcePage: 242,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8132',
  }),
  f({
    id: 'feat-twilight-speaker-empathetic-envoy',
    name: 'Enviado Empático',
    originalName: 'Empathetic Envoy',
    level: 4,
    archetypeId: 'archetype-twilight-speaker',
    prereqId: DED_TWILIGHT.id,
    prereqName: DED_TWILIGHT.name,
    description:
      'Se a atitude de uma criatura em relação a você cair no decorrer de uma interação social (ex.: amistosa → indiferente, indiferente → hostil-menor), a impressão volta ao nível inicial 1 hora após o fim da interação. Sem efeito se a criatura ficar hostil.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Primeira impressão recuperável',
        description:
          'Queda de atitude na interação social volta ao ponto de partida 1 h depois. Não vale se ficar hostil.',
      },
    ],
    sourcePage: 242,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8133',
  }),
  f({
    id: 'feat-twilight-speaker-betraying-shank',
    name: 'Punhal da Traição',
    originalName: 'Betraying Shank',
    level: 6,
    archetypeId: 'archetype-twilight-speaker',
    prereqId: DED_TWILIGHT.id,
    prereqName: DED_TWILIGHT.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Requisito: no alcance corpo a corpo do alvo, e ele não está em combate com você',
      },
    ],
    description:
      'Saca uma arma ágil ou de acuidade embainhada/oculta e faz um Golpe corpo a corpo. O alvo fica desprevenido contra esse Golpe. Em seguida, role Enganação para iniciativa.',
    actionType: 'one',
    sourcePage: 243,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8135',
  }),
  f({
    id: SMILE.id,
    name: SMILE.name,
    originalName: 'Disarming Smile',
    level: 6,
    archetypeId: 'archetype-twilight-speaker',
    traits: ['Arquétipo', 'Concentração', 'Emoção', 'Mental', 'Visual'],
    prereqId: DED_TWILIGHT.id,
    prereqName: DED_TWILIGHT.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Requisito: você percebe o atacante; ele é humanoide inteligente; você ainda não tentou feri-lo',
      },
    ],
    description:
      'Teste de Diplomacia contra a CD de Vontade do atacante. Depois de usar, todas as criaturas que viram ficam temporariamente imunes ao seu Sorriso Desarmante por 24 h. Crítico: o ataque falha e o alvo não pode agir de forma hostil contra você até o início do próximo turno dele (ou até você/aliados agirem de forma hostil contra ele/aliados). No seu próximo turno pode falar para sustentar (sucesso: até o início do seu próximo turno, máx. 1 min; fala posterior ganha traços auditivo e linguístico). Sucesso: o ataque falha, mas ele ainda pode atacar. Falha: o ataque não é afetado.',
    actionType: 'reaction',
    trigger: 'Você é alvo de um ataque corpo a corpo e o atacante ainda não rolou.',
    sourcePage: 242,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8134',
  }),
  f({
    id: 'feat-twilight-speaker-ilverani-purist',
    name: 'Purista Ilverani',
    originalName: 'Ilverani Purist',
    level: 8,
    archetypeId: 'archetype-twilight-speaker',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_TWILIGHT.id,
    prereqName: DED_TWILIGHT.name,
    description:
      'Ao Sentir o Motivo de um humanoide não élfico, falha crítica vira falha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Olho para sutileza',
        description:
          'Sentir o Motivo em humanoide sem traço elfo: falha crítica conta como falha.',
      },
    ],
    sourcePage: 243,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8136',
  }),
  f({
    id: 'feat-twilight-speaker-world-wise-vigilance',
    name: 'Vigilância Cosmopolita',
    originalName: 'World-Wise Vigilance',
    level: 8,
    archetypeId: 'archetype-twilight-speaker',
    prereqId: DED_TWILIGHT.id,
    prereqName: DED_TWILIGHT.name,
    description:
      'Ao rolar iniciativa com Percepção, se nenhum inimigo tiver o traço elfo, você pode rolar Sociedade no lugar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Iniciativa com Sociedade',
        description:
          'Iniciativa de Percepção: se nenhum inimigo for elfo, pode usar Sociedade. Você escolhe na hora.',
      },
    ],
    sourcePage: 243,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8137',
  }),
  f({
    id: 'feat-twilight-speaker-emphatic-emissary',
    name: 'Emissário Enfático',
    originalName: 'Emphatic Emissary',
    level: 10,
    archetypeId: 'archetype-twilight-speaker',
    prereqId: SMILE.id,
    prereqName: SMILE.name,
    description:
      '+2 de circunstância na iniciativa. No primeiro turno do combate, pode usar Sorriso Desarmante contra todo humanoide inteligente hostil que possa vê-lo e ainda não tenha agido. Se sustentar, sustenta só em uma criatura, como o normal.',
    actionType: 'reaction',
    trigger: 'Você rola iniciativa.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Iniciativa (ao usar Emissário Enfático)',
      },
    ],
    sourcePage: 243,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8138',
  }),
]

const scionsOfDomoraArchetypeFeats: Feat[] = [
  f({
    id: DED_DOMORA.id,
    name: DED_DOMORA.name,
    originalName: 'Scion of Domora Dedication',
    level: 4,
    archetypeId: 'archetype-scions-of-domora',
    isDedication: true,
    ignoresDedicationLockFromArchetypeIds: ['archetype-familiar-master'],
    rarity: 'rare',
    extraPrereq: [
      {
        kind: 'feat',
        featId: 'feat-familiar-master-dedication',
        featName: 'Dedicação de Mestre de Familiar',
      },
      {
        kind: 'text',
        label:
          'Dedicação de Mestre de Familiar; um guia espiritual amigo usou Vínculo com Mortal (Bond to Mortal) em você',
      },
    ],
    description:
      'O familiar assume a forma de familiar específico guia espiritual (3 habilidades exigidas: independente, vínculo vital e fala). +10 PV no familiar. Ataque desarmado de mandíbulas ou garras (você escolhe; o motor não escolhe). Você nomeia o guia. Especial: pode pegar esta Dedicação mesmo sem dois feitos de Mestre de Familiar; não pega outra Dedicação até dois feitos de Herdeiros de Domora ou Mestre de Familiar.',
    effects: [
      { kind: 'familiarAbilitySlots', extra: 1 },
      {
        kind: 'textChoice',
        choiceId: 'scions-domora-guide-attack',
        options: [
          { id: 'jaws', label: 'Mandíbulas (1d6 perfurante, grupo pancada)' },
          { id: 'claws', label: 'Garras (1d4 cortante, ágil, grupo pancada)' },
        ],
        hint: 'Ataque desarmado do guia espiritual. O motor não escolhe.',
        abilityName: 'Guia espiritual: {choice}',
        abilityDescription:
          'Usa o bônus de ataque corpo a corpo normal. Indique o familiar em Companheiros.',
      },
      {
        kind: 'specialAbility',
        name: 'Guia espiritual (familiar específico)',
        description:
          'Você nomeia o guia; o motor não escolhe o nome. Habilidades concedidas: independente, vínculo vital e fala. +10 PV. 1/dia, se um ataque reduzir o familiar a 0 PV: ele fica com 1 PV e incorpóreo até o fim do seu próximo turno.',
      },
    ],
    sourcePage: 240,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8124',
  }),
  f({
    id: 'feat-scions-of-domora-guided-skill',
    name: 'Perícia Guiada',
    originalName: 'Guided Skill',
    level: 6,
    archetypeId: 'archetype-scions-of-domora',
    prereqId: DED_DOMORA.id,
    prereqName: DED_DOMORA.name,
    description:
      'Pede ajuda ao guia. Pelos próximos 10 minutos, +2 de status em Acrobacia, Ocultismo, Furtividade ou Sobrevivência.',
    actionType: 'one',
    frequency: '1/dia',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Perícia guiada',
        description:
          '1/dia, 10 min: +2 de status em Acrobacia, Ocultismo, Furtividade e Sobrevivência.',
      },
    ],
    sourcePage: 241,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8126',
  }),
  f({
    id: SPIRIT_STRIKE.id,
    name: SPIRIT_STRIKE.name,
    originalName: 'Spiritual Strike',
    level: 6,
    archetypeId: 'archetype-scions-of-domora',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_DOMORA.id,
    prereqName: DED_DOMORA.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Requisito: arma com ao menos uma runa fundamental; familiar adjacente ou no seu espaço',
      },
    ],
    description:
      'Golpe com arma que tenha runa fundamental. Conta como dois ataques na penalidade de ataque múltiplo. Efeitos da runa toque fantasma e +2d6 de dano de força (3d6 se a arma tiver runa de golpe maior).',
    actionType: 'two',
    sourcePage: 240,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8125',
  }),
  f({
    id: 'feat-scions-of-domora-guardians-embrace',
    name: 'Abraço do Guardião',
    originalName: "Guardian's Embrace",
    level: 8,
    archetypeId: 'archetype-scions-of-domora',
    prereqId: DED_DOMORA.id,
    prereqName: DED_DOMORA.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Requisito: adjacente ao guia espiritual ou ele compartilha o seu espaço',
      },
    ],
    description:
      'O guia se dissolve num manto invisível. +2 de status na CA contra ataques físicos até o início do seu próximo turno. Se for atingido por ataque físico nesse período, pode gastar uma reação para resistência 10 a dano físico daquele ataque; isso encerra o bônus de CA e você não pode usar Abraço do Guardião por 10 minutos. Enquanto ativo, o guia não pode ser alvo, não é afetado por áreas e não age; reaparece adjacente quando o efeito acaba.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Abraço do guardião',
        description:
          '+2 de status na CA vs ataques físicos até o início do próximo turno. Reação se for atingido: resistência 10 àquele dano físico (encerra o bônus; 10 min de recarga).',
      },
    ],
    sourcePage: 241,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8127',
  }),
  f({
    id: 'feat-scions-of-domora-invigorating-breath',
    name: 'Sopro Revigorante',
    originalName: 'Invigorating Breath',
    level: 10,
    archetypeId: 'archetype-scions-of-domora',
    prereqId: DED_DOMORA.id,
    prereqName: DED_DOMORA.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Requisito: adjacente ao guia espiritual ou ele compartilha o seu espaço',
      },
    ],
    description:
      'O guia exala sopro adocicado. 20 PV temporários por 10 minutos (30 no 15º nível).',
    actionType: 'one',
    frequency: '1/hora',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sopro revigorante',
        description: '1/hora: 20 PV temporários por 10 min (30 no 15º).',
      },
    ],
    sourcePage: 241,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8128',
  }),
  f({
    id: 'feat-scions-of-domora-spiritual-flurry',
    name: 'Rajada Espiritual',
    originalName: 'Spiritual Flurry',
    level: 10,
    archetypeId: 'archetype-scions-of-domora',
    prereqId: SPIRIT_STRIKE.id,
    prereqName: SPIRIT_STRIKE.name,
    extraPrereq: [
      { kind: 'feat', featId: DED_DOMORA.id, featName: DED_DOMORA.name },
    ],
    description:
      'Ao usar Golpe Espiritual, alvos atingidos ficam desprevenidos até o fim do seu turno atual. O dano de força extra aumenta em 2d6.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Rajada espiritual',
        description:
          'Golpe Espiritual: acertos ficam desprevenidos até o fim do turno atual. +2d6 de força extra.',
      },
    ],
    sourcePage: 241,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8129',
  }),
  f({
    id: 'feat-scions-of-domora-spiritual-aid',
    name: 'Auxílio Espiritual',
    originalName: 'Spiritual Aid',
    level: 12,
    archetypeId: 'archetype-scions-of-domora',
    prereqId: DED_DOMORA.id,
    prereqName: DED_DOMORA.name,
    description:
      'Ganha a reação Auxílio Espiritual. Gatilho: falha em Reflexos ou Vontade. Efeito: rerrola a salvaguarda; usa o segundo resultado mesmo se pior. Sucesso vira crítico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Auxílio Espiritual',
        actionType: 'reaction',
        description:
          'Gatilho: falha em Reflexos ou Vontade. Rerrola; fica com o segundo resultado. Sucesso → crítico.',
      },
    ],
    sourcePage: 241,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8130',
  }),
  f({
    id: 'feat-scions-of-domora-spirit-guide-form',
    name: 'Forma de Guia Espiritual',
    originalName: 'Spirit Guide Form',
    level: 14,
    archetypeId: 'archetype-scions-of-domora',
    traits: ['Arquétipo', 'Polimorfia'],
    prereqId: DED_DOMORA.id,
    prereqName: DED_DOMORA.name,
    description:
      'Funde-se ao guia por 1 minuto (pode encerrar como ação livre). Não usa outras ações deste arquétipo enquanto durar. Incorpóreo. Resistência 10 a todo dano (exceto força, toque fantasma ou espírito; resistência dobrada vs não mágico). Visão no escuro. Só pode Golpear com o desarmado do guia (garras ou mandíbulas, o que você escolheu): treinado; modificador +29 ou o seu desarmado, o que for maior. Garras (ágil, traidor, acuidade) 3d6+5 cortante +1d6 força. Mandíbulas (vigorosa) 3d10+5 perfurante +1d6 força.',
    actionType: 'two',
    frequency: '1/dia',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Forma de guia espiritual',
        description:
          '1/dia, 1 min: incorpóreo; resistência 10 (exceto força/toque fantasma/espírito; dobrada vs não mágico); visão no escuro; só o desarmado do guia (+29 ou o seu, o maior). O tipo de ataque é o escolhido na Dedicação.',
      },
    ],
    sourcePage: 241,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8131',
  }),
]

const hellbreakerArchetypeFeats: Feat[] = [
  f({
    id: DED_HELL.id,
    name: DED_HELL.name,
    originalName: 'Hellbreaker Dedication',
    level: 2,
    archetypeId: 'archetype-hellbreaker',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [{ kind: 'text', label: 'Membro da Liga Hellbreakers (acesso)' }],
    description:
      'Conhecimento Adicional de Diabo e de Cavaleiro Infernal (cada um sobe em 3, 7 e 15). Se já era treinado em um ou ambos, também fica treinado em outro Conhecimento à escolha (nomeie na ficha; o motor não escolhe). Ao rolar iniciativa, pode Recobrar Conhecimento como ação livre sobre um inimigo visível com Diabo, Cavaleiro Infernal ou Sociedade, se a perícia se aplicar (o MJ decide).',
    effects: [
      { kind: 'lore', loreName: 'Diabo', rank: 'trained' },
      { kind: 'lore', loreName: 'Cavaleiro Infernal', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Diabo e Cavaleiro Infernal)',
        description:
          'Cada um sobe sozinho nos níveis 3, 7 e 15. Se já era treinado em um ou ambos, também outro Conhecimento à escolha (você nomeia; o motor não escolhe).',
      },
      {
        kind: 'specialAbility',
        name: 'Recobrar Conhecimento na iniciativa',
        description:
          'Ao rolar iniciativa: ação livre para Recobrar Conhecimento sobre um inimigo visível com Diabo, Cavaleiro Infernal ou Sociedade, se couber.',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8534',
  }),
  f({
    id: 'feat-hellbreaker-combat-assessment',
    name: 'Avaliação de Combate',
    originalName: 'Combat Assessment',
    level: 2,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro/comandante (nível 2 neste arquétipo)' }],
    description:
      'Golpe corpo a corpo. Acerto: Recobrar Conhecimento imediatamente sobre o alvo. Crítico: +2 de circunstância nesse teste. O alvo fica temporariamente imune à Avaliação de Combate por 1 dia.',
    actionType: 'one',
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4768',
  }),
  f({
    id: 'feat-hellbreaker-lightning-swap',
    name: 'Troca Relâmpago',
    originalName: 'Lightning Swap',
    level: 2,
    archetypeId: 'archetype-hellbreaker',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro (nível 2 neste arquétipo)' }],
    description:
      'Interage para guardar qualquer número de itens das mãos e então sacar até duas armas, ou um escudo e uma arma.',
    actionType: 'one',
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4783',
  }),
  f({
    id: DEVIL_KNOW.id,
    name: DEVIL_KNOW.name,
    originalName: 'Devil you Know',
    level: 4,
    archetypeId: 'archetype-hellbreaker',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    description:
      'Se souber que luta contra diabos ou Cavaleiros Infernais no início do encontro, pode rolar o Conhecimento respectivo na iniciativa. Recobrar Conhecimento com sucesso usando Diabo ou Cavaleiro Infernal: +1 de circunstância no próximo teste de perícia contra essa criatura até o fim do seu próximo turno (+2 se for mestre na perícia usada).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'O diabo que você conhece',
        description:
          'Iniciativa com o Conhecimento certo contra diabos/Cavaleiros Infernais. RK com sucesso: +1 de circunstância no próximo teste de perícia contra o alvo até o fim do próximo turno (+2 se mestre).',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8535',
  }),
  f({
    id: 'feat-hellbreaker-resolve',
    name: 'Resolução de Hellbreaker',
    originalName: "Hellbreaker's Resolve",
    level: 4,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    description:
      'PV temporários iguais ao nível por 1 minuto. Enquanto os tiver, +1 de status em salvaguardas de Vontade.',
    actionType: 'one',
    frequency: '1/hora',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resolução de Hellbreaker',
        description:
          '1/hora: PV temporários = nível (1 min). Enquanto durarem: +1 de status em Vontade.',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8536',
  }),
  f({
    id: 'feat-hellbreaker-high-alert',
    name: 'Alerta Máximo',
    originalName: 'High Alert',
    level: 6,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    description:
      'Escolha um aliado visível a 9 m. Até o início do seu próximo turno, ele ganha +1 de circunstância na CA e em Reflexos contra diabos e criaturas aliadas do governo chelaxiano (o MJ decide). A ação ganha traço visual, auditivo ou ambos, conforme o alerta. Você escolhe o aliado na hora; o motor não escolhe.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Alerta máximo',
        description:
          'Aliado visível a 9 m: +1 de circunstância na CA e Reflexos vs diabos e aliados do governo chelaxiano até o início do seu próximo turno.',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8537',
  }),
  f({
    id: 'feat-hellbreaker-opportune-trickster',
    name: 'Trapaceiro Oportuno',
    originalName: 'Opportune Trickster',
    level: 6,
    archetypeId: 'archetype-hellbreaker',
    traits: ['Arquétipo', 'Mental'],
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      {
        kind: 'text',
        label: 'Treinado em Enganação; requisito: adjacente ao aliado e à criatura',
      },
    ],
    description:
      'Teste de Enganação contra a CD de Percepção do alvo do Golpe do aliado. Independente do resultado, o alvo fica imune ao seu Trapaceiro Oportuno por 10 minutos. Crítico: desprevenido (inclusive contra o Golpe disparador) até o fim do turno do aliado. Sucesso: desprevenido só contra o Golpe disparador. Falha crítica: você cai no chão. Especial: com o feito Truque Sujo, pode testar Furto no lugar (a ação perde o traço mental). Você escolhe Enganação ou Furto; o motor não escolhe.',
    actionType: 'reaction',
    trigger: 'Um aliado adjacente faz um Golpe corpo a corpo contra uma criatura.',
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8538',
  }),
  f({
    id: 'feat-hellbreaker-hells-bane',
    name: 'Flagelo do Inferno',
    originalName: "Hell's Bane",
    level: 8,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DEVIL_KNOW.id,
    prereqName: DEVIL_KNOW.name,
    description:
      'Crítico em Recobrar Conhecimento sobre um diabo ou Cavaleiro Infernal: +4 de status no dano contra essa criatura por 1 minuto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Flagelo do Inferno',
        description:
          'Crítico em RK sobre diabo ou Cavaleiro Infernal: +4 de status no dano contra ele por 1 min.',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8539',
  }),
  f({
    id: 'feat-hellbreaker-rend-armor',
    name: 'Rasgar Armadura',
    originalName: 'Rend Armor',
    level: 8,
    archetypeId: 'archetype-hellbreaker',
    traits: ['Arquétipo', 'Manipular'],
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Requisito: sua última ação foi um Golpe crítico que causou dano de concussão ou perfurante',
      },
    ],
    description:
      'A criatura sofre −2 de circunstância na CA até gastar 10 minutos reparando a armadura. Também pode Interagir para ajustar a armadura, o que remove a penalidade por 1 minuto.',
    actionType: 'one',
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8540',
  }),
  f({
    id: 'feat-hellbreaker-battle-scars',
    name: 'Cicatrizes de Batalha',
    originalName: 'Battle Scars',
    level: 10,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    description:
      'Resistência a dano de concussão e cortante de diabos e criaturas aliadas do governo chelaxiano (o MJ decide) igual à metade do seu nível.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cicatrizes de batalha',
        description:
          'Resistência a concussão e cortante (diabos e aliados do governo chelaxiano) = metade do nível.',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8541',
  }),
  f({
    id: 'feat-hellbreaker-blind-fight',
    name: 'Combate às Cegas',
    originalName: 'Blind-Fight',
    level: 10,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Mestre em Percepção; feito adicional de guerreiro/investigador/patrulheiro/ladino (nível 10 neste arquétipo)',
      },
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
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4809',
  }),
  f({
    id: DEFY_HELL.id,
    name: DEFY_HELL.name,
    originalName: 'Defy Hell',
    level: 10,
    archetypeId: 'archetype-hellbreaker',
    traits: ['Arquétipo', 'Divino', 'Postura'],
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    description:
      'Postura: +2 de status em salvaguardas contra efeitos mentais e pode fazer Golpes de Hellbreaker. Golpe de Hellbreaker [duas ações] (sagrado): Golpe com arma ou desarmado; conta como dois ataques na penalidade; acerto +2d8 de dano de espírito (3d8 no 18º nível).',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Desafiar o Inferno',
        actionType: 'one',
        description:
          'Postura: +2 de status em salvaguardas mentais. Libera Golpe de Hellbreaker.',
      },
      {
        kind: 'specialAbility',
        name: 'Golpe de Hellbreaker',
        actionType: 'two',
        description:
          'Sagrado. Conta como dois ataques. Acerto: +2d8 espírito (3d8 no 18º).',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8542',
  }),
  f({
    id: 'feat-hellbreaker-felling-strike',
    name: 'Golpe Derrubador',
    originalName: 'Felling Strike',
    level: 10,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro (nível 10 neste arquétipo)' }],
    description:
      'Faça um Golpe. Se acertar e causar dano a um alvo voando, ele cai até 36 m. A queda é gradual: se atingir o chão, não sofre dano da queda. Crítico: o alvo não pode Voar, Saltar, levitar ou deixar o chão até o fim do seu próximo turno.',
    actionType: 'two',
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4812',
  }),
  f({
    id: 'feat-hellbreaker-return-to-the-pit',
    name: 'De Volta ao Fosso!',
    originalName: 'Return to the Pit!',
    level: 12,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DED_HELL.id,
    prereqName: DED_HELL.name,
    description:
      'Banimento 1/dia como magia inata divina. Ao pegar o feito, cria um símbolo pessoal da Liga Hellbreakers anátema a diabos. Se empunhar o símbolo numa mão e gastar a ação extra ao conjurar banimento num diabo, não precisa pagar o custo extra para impor −2 de circunstância na salvaguarda dele.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'De volta ao fosso',
        description:
          'Banimento 1/dia (inata divina). Símbolo da Liga: ação extra contra diabo sem o custo extra do −2 na salvaguarda.',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8543',
  }),
  f({
    id: 'feat-hellbreaker-thorn-in-hells-side',
    name: 'Espinho no Lado do Inferno',
    originalName: "Thorn in Hell's Side",
    level: 12,
    archetypeId: 'archetype-hellbreaker',
    prereqId: DEFY_HELL.id,
    prereqName: DEFY_HELL.name,
    description:
      'Crítico num Golpe de Hellbreaker: o alvo faz Fortitude contra a maior entre CD de classe e CD de magia, ou fica atordoado 1 (atordoado 2 na falha crítica). O efeito tem o traço incapacitação.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Espinho no lado do Inferno',
        description:
          'Crítico no Golpe de Hellbreaker: Fortitude vs a maior CD (classe ou magia) ou atordoado 1 (2 na falha crítica). Incapacitação.',
      },
    ],
    sourceId: SOURCE_HELLBREAKERS_ID,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8544',
  }),
]

const chelaxianScionArchetypeFeats: Feat[] = [
  f({
    id: DED_CHELAX.id,
    name: DED_CHELAX.name,
    originalName: 'Chelaxian Scion Dedication',
    level: 2,
    archetypeId: 'archetype-chelaxian-scion',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Aristocrata ou criado honrado de uma casa nobre chelaxiana (acesso)',
      },
    ],
    description:
      'Você escolhe a casa nobre (o motor não escolhe). Conhecimento Adicional: Cheliax, Diabo, Inferno ou Conhecimento da sua casa (você nomeia; sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à escolha — nomeie; o motor não escolhe). +1 de circunstância em Enganação, Diplomacia, Intimidação e na CD de Vontade contra cidadãos chelaxianos e diabos. Cada casa libera feitos extras que contam como feitos deste arquétipo (níveis podem diferir do original); você não os recebe automaticamente — escolha-os depois, conforme a casa.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'chelaxian-house',
        options: [
          { id: 'charthagnion', label: 'Casa Charthagnion' },
          { id: 'elliendo', label: 'Casa Elliendo' },
          { id: 'henderthane', label: 'Casa Henderthane' },
          { id: 'jeggare', label: 'Casa Jeggare' },
          { id: 'leroung', label: 'Casa Leroung' },
          { id: 'narikopolus', label: 'Casa Narikopolus' },
          { id: 'sarini', label: 'Casa Sarini' },
          { id: 'thrune', label: 'Casa Thrune' },
        ],
        hint: 'Casa nobre chelaxiana. O motor não escolhe.',
        abilityName: 'Casa: {choice}',
        abilityDescription:
          'Feitos extras da casa (contam como feitos deste arquétipo; níveis podem diferir): Charthagnion — 4º Previsível!; 8º Conhecimento é Poder; 12º Raciocinar Rápido; 12º Observador Mestre; 14º Sentir o Invisível. Elliendo — 4º Avaliação de Combate, Esconderijo Seguro; 8º Compra Preditiva. Henderthane — 4º Golpe Exato; 6º Atacante Reativo; 10º Golpe Certo. Jeggare — 4º Aparar de Duelo; 8º Riposte de Duelo; 12º Dança de Duelo, Riposte de Duelo Aprimorado. Leroung — 4º Investigação Contínua, Conhecimento é Poder; 6º Pesquisa Minuciosa; 10º Estratagema Inspirado. Narikopolus — 4º Postura à Queima-Roupa, Disparo Duplo; 8º Disparo Triplo; 12º Disparo Debilitante. Sarini — 4º Explorar Erro; 6º Performance Antêmica; 8º Canto Fúnebre da Perdição; 12º Casa de Paredes Imaginárias. Thrune — 4º Atacante Pavoroso, Você é o Próximo; 8º Interrogar; 16º Brecha Cognitiva. O motor não escolhe a casa nem os feitos extras.',
      },
      {
        kind: 'loreChoice',
        choiceId: 'chelaxian-scion-lore',
        rank: 'trained',
        increaseAtLevels: [3, 7, 15],
        hint: 'Cheliax, Diabo, Inferno ou Conhecimento da sua casa. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (casa)',
        description:
          'O Conhecimento escolhido sobe em 3, 7 e 15. Se já era treinado nele, também outro Conhecimento à escolha (você nomeia; o motor não escolhe). Não aparece um segundo seletor automático.',
      },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo:
          'Enganação, Diplomacia, Intimidação e CD de Vontade contra cidadãos chelaxianos e diabos',
      },
    ],
    sourceId: SOURCE_HELLS_DESTINY_ID,
    sourcePage: 222,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8971',
  }),
  f({
    id: 'feat-chelaxian-scion-aristocratic-arms',
    name: 'Armas Aristocráticas',
    originalName: 'Aristocratic Arms',
    level: 4,
    archetypeId: 'archetype-chelaxian-scion',
    prereqId: DED_CHELAX.id,
    prereqName: DED_CHELAX.name,
    description:
      'Familiaridade com uma arma marcial à escolha; ou duas simples/marciais da lista da casa; ou uma avançada da lista da casa. Marciais contam como simples e avançadas como marciais para proficiência. Perito na arma escolhida: especialização crítica nela. Listas: Charthagnion — desarme ou aparar; Elliendo — pancada e facas; Henderthane — martelos e picaretas; Jeggare — espadas de uma mão; Leroung — clavas e escudos; Narikopolus — arcos; Sarini — manguais; Thrune — clavas e bestas. Você escolhe as armas; o motor não escolhe. Também ganha Pela Minha Casa! [ação livre] 1/minuto: declara a casa (auditivo) ou exibe o brasão (visual); até o início do seu próximo turno, Golpes com arma e magias causam +1 de dano a quem viu (+2 se perito em Cheliax, Genealogia, Heráldica, Performance ou Guerra; +3 mestre; +4 lendário).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Familiaridade das armas da casa',
        description:
          'Você escolhe 1 marcial qualquer, ou 2 simples/marciais da lista da casa, ou 1 avançada da lista. Marcial como simples; avançada como marcial. Perito: especialização crítica. O motor não escolhe as armas.',
      },
      {
        kind: 'specialAbility',
        name: 'Pela Minha Casa!',
        actionType: 'free',
        description:
          '1/minuto. Até o início do próximo turno: +1 de dano em Golpes com arma e magias contra quem viu (+2 perito / +3 mestre / +4 lendário em Cheliax, Genealogia, Heráldica, Performance ou Guerra).',
      },
    ],
    sourceId: SOURCE_HELLS_DESTINY_ID,
    sourcePage: 222,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8973',
  }),
  f({
    id: 'feat-chelaxian-scion-patronize-the-arts',
    name: 'Patrocinar as Artes',
    originalName: 'Patronize the Arts',
    level: 4,
    archetypeId: 'archetype-chelaxian-scion',
    prereqId: DED_CHELAX.id,
    prereqName: DED_CHELAX.name,
    description:
      'Elogia o aliado e concede um dos benefícios (você escolhe na hora; o motor não escolhe). O aliado fica imune por 1 dia. Ímpeto: como reação, o aliado pode Fintar, Interagir com objeto próximo, Saltar, Recarregar ou Dar um Passo. Persistência: 1 minuto, PV temporários iguais à metade do seu nível + modificador de Carisma. Validação: se o aliado tiver a característica panache, ganha panache.',
    actionType: 'reaction',
    trigger: 'Um aliado a 9 m obtém um crítico em um ataque ou teste de perícia.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Patrocinar as artes',
        description:
          'Escolha Ímpeto, Persistência ou Validação. O aliado fica imune por 1 dia. O motor não escolhe o benefício.',
      },
    ],
    sourceId: SOURCE_HELLS_DESTINY_ID,
    sourcePage: 223,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8975',
  }),
  f({
    id: 'feat-chelaxian-scion-stoic-as-hell',
    name: 'Estoico como o Inferno',
    originalName: 'Stoic as Hell',
    level: 6,
    archetypeId: 'archetype-chelaxian-scion',
    prereqId: DED_CHELAX.id,
    prereqName: DED_CHELAX.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Intimidação; perito em Vontade' },
    ],
    description:
      '+2 de circunstância na salvaguarda disparadora ou na CD de Vontade contra o efeito. Se passar criticamente (ou a fonte falhar criticamente no teste, ex.: Desmoralizar), ganha PV temporários iguais à metade do nível até o fim do próximo turno da fonte. Se o efeito veio de uma criatura, pode Desmoralizá-la uma vez como ação livre no seu próximo turno; se ela estava imune ao seu Desmoralizar, perde essa imunidade.',
    actionType: 'reaction',
    frequency: '1/minuto',
    trigger:
      'Você é alvo de um efeito de emoção ou de um efeito que concederia a condição controlado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Estoico como o Inferno',
        description:
          '1/minuto: +2 de circunstância na salvaguarda/CD de Vontade vs emoção ou controlado. Crítico: PV temporários = metade do nível. Pode Desmoralizar a fonte (quebra imunidade temporária).',
      },
    ],
    sourceId: SOURCE_HELLS_DESTINY_ID,
    sourcePage: 223,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8976',
  }),
]

const sanguimancerArchetypeFeats: Feat[] = [
  f({
    id: DED_SANGU.id,
    name: DED_SANGU.name,
    originalName: 'Sanguimancer Dedication',
    level: 2,
    archetypeId: 'archetype-sanguimancer',
    isDedication: true,
    rarity: 'rare',
    description:
      'Ganha PV de sanguimancia (PV temporários especiais): podem ser gastos em feitos deste arquétipo; máximo igual ao dobro do nível. Após 8 h de descanso, ganha PV de sanguimancia iguais ao nível (duram 8 h). Tratar Ferimentos com sucesso também concede 1 PV de sanguimancia a cada 10 PV recuperados (mín. 1). Especial: feitos de Sanguimante têm o traço da sua tradição de conjuração; se não tiver uma, escolha divina ou oculta (o motor não escolhe). Não concede magias nem espaços — você escolhe magias só se outra fonte as der.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'sanguimancer-tradition',
        options: [
          { id: 'existing', label: 'Usar minha tradição de conjuração existente' },
          { id: 'divine', label: 'Divina (se ainda não conjura)' },
          { id: 'occult', label: 'Oculta (se ainda não conjura)' },
        ],
        hint: 'Traço dos feitos de Sanguimante. O motor não escolhe.',
        abilityName: 'Tradição sanguimante: {choice}',
        abilityDescription: 'Feitos deste arquétipo ganham o traço da tradição escolhida.',
      },
      {
        kind: 'specialAbility',
        name: 'PV de sanguimancia',
        description:
          'PV temporários especiais. Máx. = 2× nível. Após 8 h de descanso: ganha PV iguais ao nível (8 h). Tratar Ferimentos: +1 a cada 10 PV curados (mín. 1). Gaste-os em feitos de Sanguimante.',
      },
    ],
    sourceId: SOURCE_THIRST_FOR_BLOOD_ID,
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7764',
  }),
  f({
    id: 'feat-sanguimancer-blood-shield',
    name: 'Escudo de Sangue',
    originalName: 'Blood Shield',
    level: 4,
    archetypeId: 'archetype-sanguimancer',
    prereqId: DED_SANGU.id,
    prereqName: DED_SANGU.name,
    extraPrereq: [{ kind: 'text', label: 'Custo: 1 ou mais PV de sanguimancia' }],
    description:
      '+1 de circunstância na CA até o início do seu próximo turno (+2 se gastar 10 ou mais PV de sanguimancia). Enquanto o bônus durar, pode usar Bloquear com Escudo com o escudo de sangue. Dureza = 4 × PV de sanguimancia gastos. Após Bloquear com Escudo, o escudo se dissipa e o bônus de CA acaba cedo.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Escudo de sangue',
        description:
          'Gaste PV de sanguimancia: +1 CA (+2 se gastar 10+). Bloquear com Escudo: Dureza 4× o gasto. Depois o escudo some.',
      },
    ],
    sourceId: SOURCE_THIRST_FOR_BLOOD_ID,
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7765',
  }),
  f({
    id: 'feat-sanguimancer-exsanguinate',
    name: 'Exsanguinar',
    originalName: 'Exsanguinate',
    level: 6,
    archetypeId: 'archetype-sanguimancer',
    prereqId: DED_SANGU.id,
    prereqName: DED_SANGU.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Requisito: na última ação, causou dano perfurante ou cortante (Golpe) a uma criatura a 3 m que não seja imune a sangramento; acerto no ataque ou falha na salvaguarda dela',
      },
    ],
    description:
      'O sangue do inimigo pulveriza em você. Ganha PV de sanguimancia iguais à metade do nível, só até o fim do seu próximo turno. Só funciona contra inimigos ativos, capazes de agir e não imobilizados.',
    actionType: 'one',
    sourceId: SOURCE_THIRST_FOR_BLOOD_ID,
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7766',
  }),
  f({
    id: 'feat-sanguimancer-transfusion',
    name: 'Transfusão',
    originalName: 'Transfusion',
    level: 8,
    archetypeId: 'archetype-sanguimancer',
    traits: ['Arquétipo', 'Concentração', 'Manipular'],
    prereqId: DED_SANGU.id,
    prereqName: DED_SANGU.name,
    extraPrereq: [{ kind: 'text', label: 'Custo: 5 ou mais PV de sanguimancia' }],
    description:
      'Toca uma criatura disposta (ou a si) e concede cura acelerada 1 por 5 rodadas. Pode gastar +5 PV de sanguimancia para aumentar a cura acelerada em 1, até o máximo de 8. Você escolhe o alvo e quanto gastar; o motor não escolhe.',
    actionType: 'two',
    sourceId: SOURCE_THIRST_FOR_BLOOD_ID,
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7767',
  }),
  f({
    id: 'feat-sanguimancer-venipuncture',
    name: 'Punção',
    originalName: 'Venipuncture',
    level: 10,
    archetypeId: 'archetype-sanguimancer',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_SANGU.id,
    prereqName: DED_SANGU.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Custo: todos os PV de sanguimancia restantes (mínimo 3)',
      },
    ],
    description:
      'Centenas de agulhas de sangue explodem numa emanação de 9 m. Dano perfurante igual ao dobro dos PV de sanguimancia gastos (máx. 80). Salvaguarda básica de Reflexos; CD = a maior entre CD de classe e CD de magia.',
    actionType: 'two',
    sourceId: SOURCE_THIRST_FOR_BLOOD_ID,
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7768',
  }),
]

export const archetypeFeatsGeneralRemaster24: Feat[] = [
  ...twilightSpeakerArchetypeFeats,
  ...scionsOfDomoraArchetypeFeats,
  ...hellbreakerArchetypeFeats,
  ...chelaxianScionArchetypeFeats,
  ...sanguimancerArchetypeFeats,
]
