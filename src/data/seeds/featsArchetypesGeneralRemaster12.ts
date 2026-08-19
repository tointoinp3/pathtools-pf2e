/** Gerais Remaster: Mecânico de Veículos, Dínamo Sterling, Anfitrião Ostilli, Guardião de Enxame, Alter Ego. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  SOURCE_DARK_ARCHIVES_ID,
  SOURCE_GUNS_GEARS_ID,
  SOURCE_HOWL_OF_THE_WILD_ID,
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
  allowedSlotKinds?: Feat['allowedSlotKinds']
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
    allowedSlotKinds: opts.allowedSlotKinds,
    repeatable: opts.repeatable,
    sourceId: opts.sourceId ?? SOURCE_GUNS_GEARS_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_VM = {
  id: 'feat-vehicle-mechanic-dedication',
  name: 'Dedicação de Mecânico de Veículos',
}
const DED_DY = { id: 'feat-sterling-dynamo-dedication', name: 'Dedicação de Dínamo Sterling' }
const DED_OS = { id: 'feat-ostilli-host-dedication', name: 'Dedicação de Anfitrião Ostilli' }
const DED_SW = { id: 'feat-swarmkeeper-dedication', name: 'Dedicação de Guardião de Enxame' }
const DED_AE = { id: 'feat-alter-ego-dedication', name: 'Dedicação de Alter Ego' }

const ALTER_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-alter-ego-archetype',
  label: 'Magias inatas de Alter Ego',
  style: 'spontaneous',
  tradition: 'occult',
  attributeId: 'charisma',
  proficiencyRank: 'trained',
  cantripsPerDay: 1,
  classOriginalName: 'Alter Ego',
  features: { repertoire: true },
}

const vehicleMechanicArchetypeFeats: Feat[] = [
  f({
    id: DED_VM.id,
    name: DED_VM.name,
    originalName: 'Vehicle Mechanic Dedication',
    level: 2,
    archetypeId: 'archetype-vehicle-mechanic',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'attribute', attributeId: 'intelligence', min: 2 },
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Inteligência +2; treinado em Ofício' },
    ],
    description:
      'Fica perito em Ofício. Escolha um veículo seu (ou do grupo) como veículo de assinatura (1 semana de descanso para trocar). Pilotos ganham +1 de circunstância nos testes de pilotagem (+2 se você for mestre em Ofício). Você nomeia o veículo; o motor não escolhe.',
    effects: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Veículo de assinatura',
        description:
          'Você nomeia o veículo. +1 de circunstância na pilotagem (+2 se mestre em Ofício).',
      },
    ],
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3147',
  }),
  f({
    id: 'feat-vehicle-mechanic-engine-bay',
    name: 'Baía de Motores',
    originalName: 'Engine Bay',
    level: 4,
    archetypeId: 'archetype-vehicle-mechanic',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_VM.id,
    prereqName: DED_VM.name,
    extraPrereq: [{ kind: 'skillRank', skillId: 'crafting', rank: 'expert' }],
    description:
      'Ganha Reparo Rápido. Se já tiver, escolha outro feito de perícia de 1º nível que cumpra. Ao Reparar um veículo com sucesso, +10 PV (+20 no crítico). Você escolhe o feito substituto; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Reparo Rápido (ou outro feito de 1º)',
        description:
          'Se já tem Reparo Rápido, escolha outro feito de perícia de 1º. +10/+20 PV ao Reparar veículo.',
      },
    ],
    allowedSlotKinds: ['skill'],
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=113',
  }),
  f({
    id: 'feat-vehicle-mechanic-patch-job',
    name: 'Remendo de Emergência',
    originalName: 'Patch Job',
    level: 4,
    archetypeId: 'archetype-vehicle-mechanic',
    prereqId: DED_VM.id,
    prereqName: DED_VM.name,
    description:
      'Ganha Reparo Improvisado. Ao usá-lo, pode testar Ofício na CD de Reparar; sucesso: o objeto funciona normal até tomar dano (não como tosco).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Reparo Improvisado',
        description: 'Como o feito geral. Ofício na CD de Reparar para não ficar tosco até tomar dano.',
      },
    ],
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=113',
  }),
  f({
    id: 'feat-vehicle-mechanic-superior-propulsion',
    name: 'Propulsão Superior',
    originalName: 'Superior Propulsion',
    level: 6,
    archetypeId: 'archetype-vehicle-mechanic',
    prereqId: DED_VM.id,
    prereqName: DED_VM.name,
    description:
      'Ao Dirigir com 2 ou 3 ações e sucesso: efeito extra conforme a propulsão (alquímica, mecanismo, mágica, puxada, remada, vapor, vento). Se houver várias, o piloto escolhe.',
    sourcePage: 56,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=113',
  }),
  f({
    id: 'feat-vehicle-mechanic-efficient-controls',
    name: 'Controles Eficientes',
    originalName: 'Efficient Controls',
    level: 7,
    archetypeId: 'archetype-vehicle-mechanic',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_VM.id,
    prereqName: DED_VM.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'master' },
      { kind: 'text', label: 'Mestre em Ofício' },
    ],
    description:
      'Tripulação necessária do veículo de assinatura cai 25% (não reduz o piloto).',
    allowedSlotKinds: ['skill'],
    sourcePage: 57,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=113',
  }),
  f({
    id: 'feat-vehicle-mechanic-impervious',
    name: 'Veículo Impérvio',
    originalName: 'Impervious Vehicle',
    level: 8,
    archetypeId: 'archetype-vehicle-mechanic',
    prereqId: DED_VM.id,
    prereqName: DED_VM.name,
    description:
      'Veículo de assinatura: +1 de circunstância na CA e Fortitude; +PV iguais a 2 × seu nível.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Veículo impérvio',
        description: '+1 CA e Fortitude no veículo de assinatura; +2 × nível em PV do veículo.',
      },
    ],
    sourcePage: 57,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=113',
  }),
  f({
    id: 'feat-vehicle-mechanic-miraculous-flight',
    name: 'Voo Milagroso',
    originalName: 'Miraculous Flight',
    level: 18,
    archetypeId: 'archetype-vehicle-mechanic',
    prereqId: DED_VM.id,
    prereqName: DED_VM.name,
    description:
      'O veículo ganha propulsão mágica e Deslocamento de voo igual ao mais rápido que já tiver. Se já voava, curva de 90° com metade do comprimento usual.',
    sourcePage: 57,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=113',
  }),
]

const sterlingDynamoArchetypeFeats: Feat[] = [
  f({
    id: DED_DY.id,
    name: DED_DY.name,
    originalName: 'Sterling Dynamo Dedication',
    level: 2,
    archetypeId: 'archetype-sterling-dynamo',
    isDedication: true,
    rarity: 'uncommon',
    description:
      'Prótese dínamo (substitui/aumenta um membro; não passa de 2 mãos). Ataque desarmado de dínamo (grupo pancada, prata). Você escolhe: motor de força (1d6 concussão, empurrar) ou percussor (1d4 concussão, ágil e acuidade); automático (sem mão livre) ou manual (mão livre; dado +1 tamanho; braço é sempre manual). 1 minuto de corda = 24 h. Desabilitar reduz 1 h (2 h no crítico). Sem tempo: prótese comum, sem Golpe de dínamo nem feitos do arquétipo. O motor não escolhe o tipo.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'sterling-dynamo-type',
        options: [
          { id: 'power-auto', label: 'Motor de força automático (1d6, empurrar, sem mão livre)' },
          { id: 'power-manual', label: 'Motor de força manual (1d8, empurrar, mão livre)' },
          { id: 'striker-auto', label: 'Percussor automático (1d4, ágil e acuidade, sem mão livre)' },
          { id: 'striker-manual', label: 'Percussor manual (1d6, ágil e acuidade, mão livre)' },
        ],
        hint: 'Configuração do dínamo. O motor não escolhe.',
        abilityName: 'Dínamo Sterling ({choice})',
        abilityDescription:
          'Ataque desarmado de prata, grupo pancada. 1 minuto de corda = 24 h de operação.',
      },
    ],
    sourcePage: 52,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=110',
  }),
  f({
    id: 'feat-sterling-dynamo-modular',
    name: 'Dínamo Modular',
    originalName: 'Modular Dynamo',
    level: 4,
    archetypeId: 'archetype-sterling-dynamo',
    prereqId: DED_DY.id,
    prereqName: DED_DY.name,
    description:
      'O Golpe ganha modular. Escolha uma configuração extra: motor de força, percussor, foice rotativa (1d6 corte, derrubar) ou farpas (1d6 perfuração, agarrar). Manual também pode bastão extensível (1d4 concussão, acuidade, alcance). Interagir troca entre a da Dedicação e as deste feito. Pode pegar de novo. Você escolhe; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Configuração modular extra',
        description: 'Você escolhe uma configuração e adiciona à lista do traço modular.',
      },
    ],
    repeatable: true,
    sourcePage: 52,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=110',
  }),
  f({
    id: 'feat-sterling-dynamo-piston-punch',
    name: 'Soco de Pistão',
    originalName: 'Piston Punch',
    level: 6,
    archetypeId: 'archetype-sterling-dynamo',
    prereqId: DED_DY.id,
    prereqName: DED_DY.name,
    description:
      'Um Golpe de dínamo concussão ou perfuração contra até 2 inimigos em linha (o segundo adjacente ao primeiro, para longe de você). Um dano. Conta como 2 ataques. −1 h de operação.',
    actionType: 'two',
    sourcePage: 53,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=110',
  }),
  f({
    id: 'feat-sterling-dynamo-stasian-smash',
    name: 'Pancada Stasiana',
    originalName: 'Stasian Smash',
    level: 8,
    archetypeId: 'archetype-sterling-dynamo',
    rarity: 'uncommon',
    prereqId: DED_DY.id,
    prereqName: DED_DY.name,
    extraPrereq: [{ kind: 'text', label: 'Acesso: você é de Ustalav' }],
    description:
      'Golpe de dínamo. Sucesso: +1d12 eletricidade no alvo e 1d4 eletricidade em até 2 inimigos a 3 m. Falha crítica: você toma 1d12 eletricidade. Conta como 2 ataques. No 18º: 2d12 / 2d4. −1 h de operação.',
    actionType: 'two',
    sourcePage: 53,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3130',
  }),
  f({
    id: 'feat-sterling-dynamo-beast-howl',
    name: 'Uivo do Dínamo Bestial',
    originalName: 'Beast Dynamo Howl',
    level: 10,
    archetypeId: 'archetype-sterling-dynamo',
    rarity: 'uncommon',
    prereqId: DED_DY.id,
    prereqName: DED_DY.name,
    extraPrereq: [{ kind: 'text', label: 'Acesso: você é de Arcádia' }],
    description:
      'Desmoralize cada inimigo a 9 m (sem penalidade de idioma), então Golpe de dínamo. −1 h de operação.',
    actionType: 'two',
    sourcePage: 53,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3131',
  }),
  f({
    id: 'feat-sterling-dynamo-golem',
    name: 'Dínamo de Golem',
    originalName: 'Golem Dynamo',
    level: 12,
    archetypeId: 'archetype-sterling-dynamo',
    rarity: 'uncommon',
    prereqId: DED_DY.id,
    prereqName: DED_DY.name,
    extraPrereq: [{ kind: 'text', label: 'Acesso: autômato ou Império de Jistka' }],
    description: '+1 de status em salvaguardas contra magia. Golpes de dínamo são mágicos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Componentes de golem',
        description: '+1 de status em salvaguardas contra magia. Golpes de dínamo mágicos.',
      },
    ],
    sourcePage: 53,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3132',
  }),
  f({
    id: 'feat-sterling-dynamo-soaring',
    name: 'Dínamo Planador',
    originalName: 'Soaring Dynamo',
    level: 18,
    archetypeId: 'archetype-sterling-dynamo',
    prereqId: DED_DY.id,
    prereqName: DED_DY.name,
    description:
      'Deslocamento de voo igual ao seu Deslocamento. Cada minuto de voo (a partir da 1ª ação Voar no minuto) reduz 1 h de operação.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo do dínamo',
        description: 'Deslocamento de voo = Deslocamento. 1 minuto de voo = −1 h de operação.',
      },
    ],
    sourcePage: 53,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=110',
  }),
]

const ostilliHostArchetypeFeats: Feat[] = [
  f({
    id: DED_OS.id,
    name: DED_OS.name,
    originalName: 'Ostilli Host Dedication',
    level: 2,
    archetypeId: 'archetype-ostilli-host',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'text', label: 'Treinado em Arcana ou Natureza' },
    ],
    description:
      'Treinado em Conhecimento de Ostilli (perito se já for treinado). Enxerto Minúsculo visível (Natureza, Percepção ou Conhecimento Surki vs sua Enganação se coberto). Precisa estar visível para as ações. Repelir Magia Ambiente (1 ação, concentração: +1 de circunstância na CA e salvaguardas contra o próximo ataque/truque/magia mágico até o início do próximo turno; +2 no 12º). Cuspir Magia Ambiente (1 ação, 1/rodada, 9 m: 1d6 perfuração, Reflexos básico vs a maior CD; +1d6 no 6º e a cada 4 níveis).',
    effects: [
      { kind: 'lore', loreName: 'Ostilli', rank: 'trained', bumpIfAlready: true },
      {
        kind: 'specialAbility',
        name: 'Ostilli (enxerto)',
        description:
          'Se já era treinado em Ostilli, fica perito. Repelir Magia Ambiente e Cuspir Magia Ambiente. Precisa estar visível.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5451',
  }),
  f({
    id: 'feat-ostilli-soothing-pulse',
    name: 'Pulso Suavizante',
    originalName: 'Soothing Pulse',
    level: 4,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Administrar Magia Ambiente (2 ações, cura, 1/hora): recupera 2d4 PV e teste plano CD 10 contra sangramento persistente. +2d4 no 8º e a cada 4 níveis.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-tactile-feedback',
    name: 'Retorno Tátil de Magia',
    originalName: 'Tactile Magic Feedback',
    level: 4,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Sentido impreciso magisentido 18 m (só conjuradores, inclusive inatos). +2 de circunstância para Recordar Conhecimento sobre criaturas detectadas assim.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Recordar Conhecimento sobre criaturas no magisentido',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-versatile-mutation',
    name: 'Mutação Versátil',
    originalName: 'Versatile Mutation',
    level: 4,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Cuspir pode ser concussão ou corte. No 8º, escolha ácido, frio, eletricidade, fogo ou sônico; o Cuspir pode usar esse tipo e ganha o traço. Você escolhe a energia no 8º; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'ostilli-energy',
        options: [
          { id: 'acid', label: 'Ácido' },
          { id: 'cold', label: 'Frio' },
          { id: 'electricity', label: 'Eletricidade' },
          { id: 'fire', label: 'Fogo' },
          { id: 'sonic', label: 'Sônico' },
        ],
        hint: 'Energia extra do Cuspir a partir do 8º nível. Até lá, ignore ou deixe em branco.',
        abilityName: 'Cuspir Magia Ambiente ({choice})',
        abilityDescription: 'Além de B/P/C, pode causar esse tipo de energia (8º+).',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-cloaking-pulse',
    name: 'Pulso de Camuflagem',
    originalName: 'Cloaking Pulse',
    level: 6,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Drapear Magia Ambiente (1 ação, ilusão, 1/rodada): oculto até o fim do turno. Se Golpear, o alvo fica desprevenido contra esse ataque e você fica observado.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-deflecting-pulse',
    name: 'Pulso Defletor',
    originalName: 'Deflecting Pulse',
    level: 6,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Afastar Magia Ambiente (1 ação, concentração): escolha ácido, frio, eletricidade, fogo ou sônico; resistência igual à metade do nível até o início do próximo turno. Você escolhe o tipo a cada uso.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-propulsive',
    name: 'Mutação Propulsiva',
    originalName: 'Propulsive Mutation',
    level: 6,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description: 'Cuspir Magia Ambiente: alcance 18 m.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-chaining',
    name: 'Mutação Encadeada',
    originalName: 'Chaining Mutation',
    level: 8,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'A primeira vez por rodada que um alvo toma dano do Cuspir, um segundo a 6 m também é afetado.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-deadly',
    name: 'Mutação Mortal',
    originalName: 'Deadly Mutation',
    level: 8,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Dados do Cuspir viram d8. Falha crítica: 1d6 sangramento persistente (ou da energia, se usou Mutação Versátil).',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-spell-swallow',
    name: 'Engolir Magia',
    originalName: 'Spell Swallow',
    level: 10,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Devorar Magia Ambiente (reação, 1/dia): contrapor a magia com Arcana ou Natureza, posto = metade do nível.',
    actionType: 'reaction',
    frequency: '1 vez por dia',
    trigger: 'Uma criatura Conjura uma Magia com você como único alvo.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5460',
  }),
  f({
    id: 'feat-ostilli-spraying',
    name: 'Mutação em Spray',
    originalName: 'Spraying Mutation',
    level: 10,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description: 'Cuspir pode afetar todas as criaturas num cone de 4,5 m.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
  f({
    id: 'feat-ostilli-cellular',
    name: 'Reconstrução Celular',
    originalName: 'Cellular Reconstruction',
    level: 12,
    archetypeId: 'archetype-ostilli-host',
    prereqId: DED_OS.id,
    prereqName: DED_OS.name,
    description:
      'Recupera PV iguais ao nível. Por 2 rodadas, no início do turno, recupera metade do nível. Na primeira dessas recuperações, reduz ferido em 1.',
    actionType: 'reaction',
    trigger: 'Você está prestes a morrer.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 71,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=222',
  }),
]

const swarmkeeperArchetypeFeats: Feat[] = [
  f({
    id: DED_SW.id,
    name: DED_SW.name,
    originalName: 'Swarmkeeper Dedication',
    level: 2,
    archetypeId: 'archetype-swarmkeeper',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Natureza' },
    ],
    description:
      'Enxame no corpo. Sem companheiro animal (conta como um se a habilidade permitir vários). Imune ao próprio enxame; nas preparações, unte até 5 dispostos. Enxame Grande, 4,5 m de deslocamento e escalada; ocupa o mesmo espaço. Usa suas defesas; imune a agarrado, prone, restringido e efeitos mentais de alvos limitados. Resistência física = nível; fraqueza a área/salpico = nível. Dano no enxame vai para você (uma vez se os dois estiverem na área). Enxame Adiante (2 ações) e Morder e Picar (1 ação: 1d4 perfuração, Reflexos básico vs a maior CD; +1d4 no 4º e a cada 2 níveis).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Enxame simbiótico',
        description:
          'Enxame Adiante e Morder e Picar. Imune ao próprio enxame. Conta como companheiro se a regra permitir vários.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 72,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5463',
  }),
  f({
    id: 'feat-swarmkeeper-aphet-flash',
    name: 'Clarão Aphet',
    originalName: 'Aphet Flash',
    level: 4,
    archetypeId: 'archetype-swarmkeeper',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    extraPrereq: [{ kind: 'text', label: 'Seu enxame está fora do corpo' }],
    description:
      'Cada criatura no espaço: Fortitude vs a maior CD ou ofuscado 1 rodada (2 no crítico). O enxame brilha como tocha até voltar.',
    actionType: 'one',
    frequency: '1 vez por rodada',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 72,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5464',
  }),
  f({
    id: 'feat-swarmkeeper-pyre-ant',
    name: 'Picada de Formiga da Pira',
    originalName: 'Pyre Ant Sting',
    level: 4,
    archetypeId: 'archetype-swarmkeeper',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    extraPrereq: [{ kind: 'text', label: 'Seu enxame está fora do corpo' }],
    description:
      'Cada criatura no espaço: Fortitude vs a maior CD ou 1d6 veneno persistente (crítico: também enfraquecido 1 enquanto persistir). +1d6 no 8º e a cada 4 níveis.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5465',
  }),
  f({
    id: 'feat-swarmkeeper-weavers-web',
    name: 'Teia da Tecelã',
    originalName: "Weaver's Web",
    level: 4,
    archetypeId: 'archetype-swarmkeeper',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    extraPrereq: [{ kind: 'text', label: 'Seu enxame está fora do corpo' }],
    description:
      'Ao terminar o turno, o espaço fica com teias 1 minuto (terreno difícil). Quem termina o turno: Reflexos ou imobilizado até Escapar. CDs = a maior entre classe e magia. O enxame é imune.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5466',
  }),
  f({
    id: 'feat-swarmkeeper-distracting-bites',
    name: 'Picadas Distrativas',
    originalName: 'Distracting Bites',
    level: 6,
    archetypeId: 'archetype-swarmkeeper',
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    description:
      'Quem tomou dano de Morder e Picar fica desprevenido contra o primeiro Golpe seu no mesmo turno.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=223',
  }),
  f({
    id: 'feat-swarmkeeper-mobile',
    name: 'Enxame Móvel',
    originalName: 'Mobile Swarm',
    level: 6,
    archetypeId: 'archetype-swarmkeeper',
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    description: 'Deslocamento e escalada do enxame 6 m; ganha natação 6 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Enxame mais rápido',
        description: 'Terra e escalada 6 m; natação 6 m.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5468',
  }),
  f({
    id: 'feat-swarmkeeper-carried',
    name: 'Levado pelo Enxame',
    originalName: 'Carried with the Swarm',
    level: 8,
    archetypeId: 'archetype-swarmkeeper',
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    description:
      'Se o enxame compartilha seu espaço e Anda, pode levá-lo. Movimento voluntário (dispara reações). Se Voar e você não tem voo, você cai no fim.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=223',
  }),
  f({
    id: 'feat-swarmkeeper-sportlebore',
    name: 'Sufoco Sportlebore',
    originalName: 'Sportlebore Choke',
    level: 8,
    archetypeId: 'archetype-swarmkeeper',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    extraPrereq: [{ kind: 'text', label: 'Seu enxame está fora do corpo' }],
    description:
      '4d4 perfuração, Fortitude vs a maior CD. +1d4 no 10º e a cada 2 níveis. Imune 1 hora. Crítico: nada. Sucesso: metade e enjoado 1. Falha: dano cheio e enjoado 1. Falha crítica: dobro e enjoado 2.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5470',
  }),
  f({
    id: 'feat-swarmkeeper-veil',
    name: 'Véu de Insetos',
    originalName: 'Veil of Bugs',
    level: 10,
    archetypeId: 'archetype-swarmkeeper',
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    description: 'Você e aliados ganham cobertura menor no espaço do enxame.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=223',
  }),
  f({
    id: 'feat-swarmkeeper-death-cicadas',
    name: 'Cigarras da Morte Zumbindo',
    originalName: 'Buzzing Death Cicadas',
    level: 12,
    archetypeId: 'archetype-swarmkeeper',
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    description:
      'O enxame ganha voo 6 m. Zumbido da Morte (1 ação, auditivo, ímpeto, mental): 6d4 mental, Vontade vs a maior CD. Falha: dano cheio, amedrontado 1, −2 de circunstância em Percepção auditiva. Falha crítica: dobro, amedrontado 2, ensurdecido até o início do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo do enxame (6 m)',
        description: 'E Zumbido da Morte (1 ação).',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=223',
  }),
  f({
    id: 'feat-swarmkeeper-expanded',
    name: 'Enxame Expandido',
    originalName: 'Expanded Swarm',
    level: 14,
    archetypeId: 'archetype-swarmkeeper',
    prereqId: DED_SW.id,
    prereqName: DED_SW.name,
    description: 'Ao usar Enxame Adiante, pode ser Enorme em vez de Grande. Você escolhe a cada uso.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=223',
  }),
]

const alterEgoArchetypeFeats: Feat[] = [
  f({
    id: DED_AE.id,
    name: DED_AE.name,
    originalName: 'Alter Ego Dedication',
    level: 2,
    archetypeId: 'archetype-alter-ego',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Enganação e Furtividade' },
    ],
    description:
      'Fica perito em Enganação. Assumir um Papel: 1 hora estudando um papel (não um indivíduo) nos últimos 3 dias. Personificar com +1 de circunstância. Escolha um Conhecimento do papel: +1 de circunstância; se não treinado, usa o nível como bônus de proficiência. Dura 24 h, novo estudo ou você encerrar. Sem feitos Legacy de Firebrands. Você escolhe o papel e o Conhecimento; o motor não escolhe.',
    effects: [
      { kind: 'skillRank', skillId: 'deception', rank: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Assumir um Papel',
        description:
          'Personificar um papel estudado. +1 de circunstância. Um Conhecimento do papel com +1 (nível se não treinado). Você nomeia o papel.',
      },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 126,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
  f({
    id: 'feat-alter-ego-change-of-face',
    name: 'Troca de Rosto',
    originalName: 'Change of Face',
    level: 4,
    archetypeId: 'archetype-alter-ego',
    prereqId: DED_AE.id,
    prereqName: DED_AE.name,
    description:
      'Ao Personificar, não precisa de kit: ilusões/transformações temporárias. A atividade ganha o traço oculto.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 126,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
  f({
    id: 'feat-alter-ego-fake-it',
    name: 'Finja até Conseguir',
    originalName: 'Fake It Till You Make it',
    level: 4,
    archetypeId: 'archetype-alter-ego',
    prereqId: DED_AE.id,
    prereqName: DED_AE.name,
    description:
      'Ao Assumir um Papel, escolha duas perícias ligadas ao papel. Se não treinado, usa o nível; +1 de circunstância enquanto no papel. Você e o MJ escolhem as perícias; o motor não escolhe.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 126,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
  f({
    id: 'feat-alter-ego-in-plain-sight',
    name: 'À Vista de Todos',
    originalName: 'In Plain Sight',
    level: 4,
    archetypeId: 'archetype-alter-ego',
    prereqId: DED_AE.id,
    prereqName: DED_AE.name,
    description:
      'Enquanto Assumiu um Papel, pode usar Enganação no lugar de Furtividade para Evitar Ser Notado onde o papel não seria estranho.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 126,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
  f({
    id: 'feat-alter-ego-sound-mirror',
    name: 'Espelho Sonoro',
    originalName: 'Sound Mirror',
    level: 6,
    archetypeId: 'archetype-alter-ego',
    prereqId: DED_AE.id,
    prereqName: DED_AE.name,
    description:
      'Silêncio (2º posto) em você e ventriloquia (1º) 1/dia cada, inatos ocultos. Truque figura inato oculto. Treinado em ataque e CD de magia (Carisma). O motor aplica o treino.',
    effects: [
      { kind: 'spellcasting', access: ALTER_SPELL },
      {
        kind: 'specialAbility',
        name: 'Silêncio, ventriloquia e figura',
        description: 'Inatos ocultos. Silêncio 2º e ventriloquia 1º, 1/dia cada. Figura à vontade.',
      },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
  f({
    id: 'feat-alter-ego-muscle-mimicry',
    name: 'Mímica Muscular',
    originalName: 'Muscle Mimicry',
    level: 7,
    archetypeId: 'archetype-alter-ego',
    prereqId: DED_AE.id,
    prereqName: DED_AE.name,
    description:
      'A próxima vez que fizer a mesma ação: +1 de circunstância em Atletismo (+2 se o inimigo foi crítico). Perde se não usar até o fim do próximo turno.',
    actionType: 'reaction',
    trigger: 'Um inimigo obtém sucesso numa manobra de Atletismo que você pode ver.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
  f({
    id: 'feat-alter-ego-swap-reflections',
    name: 'Trocar Reflexos',
    originalName: 'Swap Reflections',
    level: 8,
    archetypeId: 'archetype-alter-ego',
    prereqId: DED_AE.id,
    prereqName: DED_AE.name,
    description:
      'Inimigo a 36 m, ambos adjacentes a superfícies reflexivas, você vê o reflexo dele. Vontade vs a maior CD. Crítico: nada. Sucesso: ele escolhe trocar ou você adjacente. Falha: você escolhe. Falha crítica: troca e ele fica preso no reflexo 1 minuto (1 ação/turno para novo teste).',
    actionType: 'two',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
  f({
    id: 'feat-alter-ego-borrow-memories',
    name: 'Emprestar Memórias',
    originalName: 'Borrow Memories',
    level: 14,
    archetypeId: 'archetype-alter-ego',
    prereqId: DED_AE.id,
    prereqName: DED_AE.name,
    description:
      'Sonda mental 1/dia, inata oculta, vs a maior CD. Se lançar em alvo que está estudando para Assumir o Papel e ele falhar, pode atrasar até Assumir; então Sustentar até 10 vezes (uma pergunta cada) sem alcance. Dura até 10 perguntas ou sair do papel.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sonda mental (1/dia)',
        description: 'Inata oculta. Pode atrasar até Assumir o Papel do alvo.',
      },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 127,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=344',
  }),
]

export const archetypeFeatsGeneralRemaster12: Feat[] = [
  ...vehicleMechanicArchetypeFeats,
  ...sterlingDynamoArchetypeFeats,
  ...ostilliHostArchetypeFeats,
  ...swarmkeeperArchetypeFeats,
  ...alterEgoArchetypeFeats,
]
