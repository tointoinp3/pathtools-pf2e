/** Arquétipos de CLASSE Remaster: Arauto de Batalha, Detetive Palatino, Runelord, Senescal. Sem Legacy. */
import type { Feat } from '@/types/feat'
import {
  CLASS_CLERIC_ID,
  CLASS_INVESTIGATOR_ID,
  CLASS_WITCH_ID,
  CLASS_WIZARD_ID,
} from './ids'
import {
  SOURCE_DIVINE_MYSTERIES_ID,
  SOURCE_PLAYER_CORE_ID,
  SOURCE_RIVAL_ACADEMIES_ID,
  SOURCE_TREASURE_VAULT_ID,
  SOURCE_WAR_OF_IMMORTALS_ID,
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
  classId?: string | null
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
    classId: opts.classId,
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
    allowedSlotKinds: opts.allowedSlotKinds,
    sourceId: opts.sourceId ?? SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_HARB = {
  id: 'feat-battle-harbinger-dedication',
  name: 'Dedicação de Arauto de Batalha',
}
const TANDEM_ONSLAUGHT = {
  id: 'feat-battle-harbinger-tandem-onslaught',
  name: 'Investida em Tandem',
}
const HARB_ARMAMENT = {
  id: 'feat-battle-harbinger-harbingers-armament',
  name: 'Armamento do Arauto',
}

const DED_PAL = {
  id: 'feat-palatine-detective-dedication',
  name: 'Dedicação de Detetive Palatino',
}
const ESOTERIC_CAST = {
  id: 'feat-palatine-detective-esoteric-spellcasting',
  name: 'Conjuração Esotérica',
}

const DED_RUNE = {
  id: 'feat-runelord-dedication',
  name: 'Dedicação de Runelord',
}
const EMBED_AEON = {
  id: 'feat-runelord-embed-aeon-stone',
  name: 'Embutir Pedra Eon',
}

const DED_SEN = {
  id: 'feat-seneschal-dedication',
  name: 'Dedicação de Senescal',
}

const battleHarbingerArchetypeFeats: Feat[] = [
  f({
    id: DED_HARB.id,
    name: DED_HARB.name,
    originalName: 'Battle Harbinger Dedication',
    level: 2,
    archetypeId: 'archetype-battle-harbinger',
    isDedication: true,
    classId: CLASS_CLERIC_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_CLERIC_ID },
      { kind: 'text', label: 'Crença de batalha (battle creed)' },
    ],
    description:
      'Arquétipo de classe de clérigo. Substitui doutrina por crença de batalha. Treinado em Atletismo ou Acrobacia (outra perícia se já for treinado nas duas). Ganha Resistência (Toughness); se já tiver, outro feito geral à escolha. Não ganha Fé Resoluta nem Magia Milagrosa. Conjuração reduzida (tabela: no máx. 2 espaços do posto mais alto e 2 do posto imediatamente abaixo). Fonte de batalha no lugar de curar/ferir: +4 espaços do posto mais alto só para maldição (bane) ou bênção (bless) (5 no 5º, 6 no 15º); auras de batalha usam CD de classe. Crença inicial: treinado em armadura leve e média e armas marciais; perito em Fortitude; Simplicidade Mortal se a arma favorecida for simples ou desarmada. 13º (Defesa Divina): perito em leve e média. 5º: perito na arma favorecida, marciais, simples e desarmados; especialização crítica com a arma favorecida; CD de classe perita. 9º: Golpe Reativo. 11º: perito em ataque e CD de magia. 13º: mestre na arma favorecida e em Fortitude; sucesso em Fortitude vira crítico. 15º: mestre em CD de classe e Vontade. 19º: mestre em leve, média e defesa sem armadura; CD de classe lendária. Você escolhe perícia, feito geral substituto, domínio da divindade e se prepara bane ou bless; o motor não escolhe.',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'battle-harbinger-skill',
        rank: 'trained',
        skillOptions: ['athletics', 'acrobatics'],
        replaceIfTrained: true,
        hint: 'Atletismo ou Acrobacia. Se já for treinado nas duas, outra perícia. O motor não escolhe.',
      },
      { kind: 'defenseRank', categories: ['light', 'medium'], rank: 'trained' },
      { kind: 'attackRank', categories: ['martial'], rank: 'trained' },
      { kind: 'saveRank', save: 'fortitude', rank: 'expert' },
      { kind: 'hpPerLevel', value: 1 },
      {
        kind: 'specialAbility',
        name: 'Resistência (Toughness)',
        description:
          '+1 PV por nível e −1 na CD de recuperação. Se já tiver Resistência, escolha outro feito geral; o motor não escolhe nem aplica o substituto.',
      },
      {
        kind: 'specialAbility',
        name: 'Conjuração reduzida',
        description:
          'Não ganha Fé Resoluta nem Magia Milagrosa. 1º: 5 truques e 1 magia de 1º. Depois: no máximo 2 espaços do posto mais alto e, se conjurar 2º+, 2 do posto imediatamente abaixo (tabela de Arauto de Batalha). Qualifica-se para efeitos que exigem magias de posto inferior mesmo sem espaços daquele posto.',
      },
      {
        kind: 'specialAbility',
        name: 'Fonte de batalha (auras)',
        description:
          'No lugar de curar/ferir: +4 espaços do posto mais alto só para maldição (bane) ou bênção (bless) (+5 no 5º, +6 no 15º). Auras de batalha (esses espaços ou os normais) usam CD de classe, não CD de magia. Você escolhe bane ou bless a cada preparo; o motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Crença de batalha (progressão)',
        description:
          'Sem doutrina. Simplicidade Mortal só se a arma favorecida for simples ou desarmada (você confirma; o motor não escolhe). 5º: perito na arma favorecida, marciais, simples e desarmados; especialização crítica com a favorecida; CD de classe perita. 9º: Golpe Reativo. 11º: perito em ataque e CD de magia. 13º: mestre na favorecida e em Fortitude; sucesso em Fortitude = crítico; perito em leve e média (com Defesa Divina). 15º: mestre em CD de classe e Vontade. 19º: mestre em leve, média e defesa sem armadura; CD de classe lendária.',
      },
    ],
    sourcePage: 272,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7505',
  }),
  f({
    id: 'feat-battle-harbinger-vicious-swing',
    name: 'Balanço Cruel',
    originalName: 'Vicious Swing',
    level: 2,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description:
      'Golpe corpo a corpo que conta como dois ataques na penalidade de ataque múltiplo. Se acertar, +1 dado de dano da arma (+2 no 10º, +3 no 18º).',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4775',
  }),
  f({
    id: 'feat-battle-harbinger-aura-enhancement',
    name: 'Aprimoramento de Aura',
    originalName: 'Aura Enhancement',
    level: 4,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Adiciona bênção (benediction) e maldição (malediction) aos espaços extras da fonte divina. Essas magias também são auras de batalha. Você escolhe o que preparar; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fonte de batalha ampliada',
        description:
          'Espaços extras da fonte: bane, bless, benediction ou malediction. Todas contam como auras de batalha.',
      },
    ],
    sourcePage: 273,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7506',
  }),
  f({
    id: 'feat-battle-harbinger-intimidating-strike',
    name: 'Golpe Intimidante',
    originalName: 'Intimidating Strike',
    level: 4,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    traits: ['Arquétipo', 'Emoção', 'Medo', 'Mental'],
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro/bárbaro' }],
    description:
      'Golpe corpo a corpo. Se acertar e causar dano, o alvo fica amedrontado 1 (amedrontado 2 no crítico).',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 144,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4782',
  }),
  f({
    id: TANDEM_ONSLAUGHT.id,
    name: TANDEM_ONSLAUGHT.name,
    originalName: 'Tandem Onslaught',
    level: 4,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Na primeira vez a cada rodada que acertar e causar dano a um inimigo com Golpe de arma ou desarmado, Sustenta automaticamente uma aura de batalha ativa (incluindo efeitos extras de Sustentar). Você escolhe qual aura se tiver mais de uma; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Investida em Tandem',
        description:
          '1×/rodada, ao acertar e causar dano com Golpe de arma/desarmado: Sustenta uma aura de batalha ativa. Você escolhe a aura.',
      },
    ],
    sourcePage: 273,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7507',
  }),
  f({
    id: 'feat-battle-harbinger-bespell-strikes',
    name: 'Golpes Enfeitiçados',
    originalName: 'Bespell Strikes',
    level: 6,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de oráculo/feiticeiro/mago' },
      { kind: 'text', label: 'Requisito: a ação mais recente foi conjurar magia que não seja truque' },
    ],
    description:
      'Canaliza a magia numa arma empunhada ou num ataque desarmado. Até o fim do turno, o Golpe causa +1d6 de força e ganha o traço divino. Se a magia causou outro tipo de dano, use esse tipo (você escolhe se houver vários).',
    actionType: 'free',
    frequency: '1 por turno',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Golpes Enfeitiçados',
        actionType: 'free',
        description:
          '1/turno após magia que não seja truque. +1d6 força (ou o tipo da magia) e traço divino até o fim do turno.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 202,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5028',
  }),
  f({
    id: 'feat-battle-harbinger-exigent-aura',
    name: 'Aura Exigente',
    originalName: 'Exigent Aura',
    level: 6,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Auras de batalha afetam criaturas sem mente. Elas ganham +4 de circunstância em salvaguardas contra a aura.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Aura Exigente',
        description:
          'Auras de batalha afetam sem mente; +4 de circunstância nas salvaguardas delas contra a aura.',
      },
    ],
    sourcePage: 274,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7508',
  }),
  f({
    id: 'feat-battle-harbinger-harbingers-protection',
    name: 'Proteção do Arauto',
    originalName: "Harbinger's Protection",
    level: 6,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Treinado em armadura pesada. Quando ganhar perito ou melhor em qualquer tipo de armadura, ganha o mesmo posto em pesada.',
    effects: [
      { kind: 'defenseRank', categories: ['heavy'], rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Armadura pesada acompanhada',
        description:
          'Perito+ em qualquer tipo de armadura também vale para pesada (13º perito com a crença; 19º mestre).',
      },
    ],
    sourcePage: 274,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7509',
  }),
  f({
    id: 'feat-battle-harbinger-creed-magic',
    name: 'Magia da Crença',
    originalName: 'Creed Magic',
    level: 8,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Dois espaços especiais de 2º posto para preparar resistir à energia, ver o invisível, golpe certeiro e respirar na água como magias divinas. 10º: espaços de 3º e adiciona pressa e heroísmo. 14º: espaços de 4º e adiciona voar e movimento irrestrito. Você escolhe o que preparar; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Espaços de magia da crença',
        description:
          '2 espaços (2º; 3º no 10º; 4º no 14º). Lista: resist energy, see the unseen, sure strike, water breathing; +haste e heroism no 10º; +fly e unfettered movement no 14º.',
      },
    ],
    sourcePage: 274,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7510',
  }),
  f({
    id: HARB_ARMAMENT.id,
    name: HARB_ARMAMENT.name,
    originalName: "Harbinger's Armament",
    level: 8,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Nas preparações, escolha uma arma ou envoltórios de golpes poderosos. Enquanto estiver em suas mãos, ganha o efeito de uma runa de propriedade: temível, toque fantasma, retornante, mutante ou vitalizante. Não conta no limite de runas. Dura 24 h ou até o próximo preparo. Você escolhe arma e runa a cada dia; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Armamento do Arauto',
        description:
          '1 arma ou envoltórios: runa extra (fearsome, ghost touch, returning, shifting ou vitalizing) até o próximo preparo. Não conta no limite. Você escolhe arma e runa.',
      },
    ],
    sourcePage: 274,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7511',
  }),
  f({
    id: 'feat-battle-harbinger-empowered-onslaught',
    name: 'Investida Potencializada',
    originalName: 'Empowered Onslaught',
    level: 12,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: TANDEM_ONSLAUGHT.id,
    prereqName: TANDEM_ONSLAUGHT.name,
    description:
      'Escolha uma aura de batalha ativa; o bônus ou penalidade de status dela aumenta em 1 (máximo 4) pelo resto da duração. Você escolhe a aura; o motor não escolhe.',
    actionType: 'reaction',
    frequency: '1 por rodada',
    trigger: 'Você acerta criticamente e Sustenta uma aura de batalha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Investida Potencializada',
        actionType: 'reaction',
        description:
          '1/rodada. Aura ativa: +1 no bônus/penalidade de status (máx. 4) até o fim da duração. Você escolhe a aura.',
      },
    ],
    sourcePage: 275,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7512',
  }),
  f({
    id: 'feat-battle-harbinger-tandem-auras',
    name: 'Auras em Tandem',
    originalName: 'Tandem Auras',
    level: 12,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Ao Sustentar uma aura de batalha, também pode Sustentar outra aura de batalha ativa diferente. Você escolhe qual; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Auras em Tandem',
        description: 'Ao Sustentar uma aura de batalha, pode Sustentar outra ativa.',
      },
    ],
    sourcePage: 275,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7513',
  }),
  f({
    id: 'feat-battle-harbinger-aura-expertise',
    name: 'Perícia em Aura',
    originalName: 'Aura Expertise',
    level: 16,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Ganha imediatamente os efeitos de Sustentar em uma de suas auras de batalha. Você escolhe qual; o motor não escolhe.',
    actionType: 'free',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Perícia em Aura',
        actionType: 'free',
        description: 'Ação livre: efeitos de Sustentar em uma aura de batalha à escolha.',
      },
    ],
    sourcePage: 275,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7514',
  }),
  f({
    id: 'feat-battle-harbinger-greater-armament',
    name: 'Armamento Maior',
    originalName: 'Greater Armament',
    level: 16,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: HARB_ARMAMENT.id,
    prereqName: HARB_ARMAMENT.name,
    description:
      'Adiciona brilhante, corrosiva, flamejante, gélida, sagrada, chocante, trovejante e profana à lista de runas de propriedade do Armamento do Arauto. Você escolhe a runa a cada preparo; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Runas extras do armamento',
        description:
          'Também: brilliant, corrosive, flaming, frost, holy, shock, thundering, unholy.',
      },
    ],
    sourcePage: 275,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7515',
  }),
  f({
    id: 'feat-battle-harbinger-live-the-creed',
    name: 'Viver a Crença',
    originalName: 'Live the Creed',
    level: 20,
    archetypeId: 'archetype-battle-harbinger',
    classId: CLASS_CLERIC_ID,
    prereqId: DED_HARB.id,
    prereqName: DED_HARB.name,
    description:
      'Conjura uma aura de batalha usando um dos espaços da fonte divina. Você escolhe qual aura e qual espaço; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 275,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7516',
  }),
]

const palatineDetectiveArchetypeFeats: Feat[] = [
  f({
    id: DED_PAL.id,
    name: DED_PAL.name,
    originalName: 'Palatine Detective Dedication',
    level: 2,
    archetypeId: 'archetype-palatine-detective',
    isDedication: true,
    classId: CLASS_INVESTIGATOR_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    rarity: 'uncommon',
    extraPrereq: [{ kind: 'class', classId: CLASS_INVESTIGATOR_ID }],
    description:
      'Arquétipo de classe de investigador (Ordem Esotérica do Olho Palatino). Metodologia esotérica no lugar das outras: treinado em Ocultismo ou Religião; Identificação Rápida; um truque comum divino e um oculto como inatos à vontade; treinado em ataque e CD de magia (Inteligência). Amuleto (corrente de prata, escaravelho dourado, mão ressequida ou outro que você descreve): +1 de status em salvaguardas contra efeitos mentais enquanto o usar. Égide Mística [reação] (concentração, mágico): gatilho — criatura sobre a qual você Recordou Conhecimento com sucesso causaria dano a você; requisito — mão livre; resistência a todo dano igual a 2 + metade do nível (arredondado para cima) contra o efeito disparador. Você escolhe perícia, truques e a forma do amuleto; o motor não escolhe.',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'palatine-methodology-skill',
        rank: 'trained',
        skillOptions: ['occultism', 'religion'],
        replaceIfTrained: true,
        hint: 'Ocultismo ou Religião da metodologia esotérica. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Metodologia esotérica',
        description:
          'No lugar de outra metodologia. Identificação Rápida. Um truque comum da lista divina e um da oculta, inatos à vontade — você nomeia os dois. Treinado em ataque e CD de magia; atributo Inteligência.',
      },
      {
        kind: 'specialAbility',
        name: 'Amuleto palatino',
        description:
          'Enquanto usar o amuleto (você descreve a forma): +1 de status em salvaguardas contra efeitos mentais.',
      },
      {
        kind: 'specialAbility',
        name: 'Égide Mística',
        actionType: 'reaction',
        description:
          'Gatilho: criatura sobre a qual você Recordou Conhecimento com sucesso causaria dano a você. Mão livre. Resistência a todo dano = 2 + metade do nível (para cima) contra o efeito disparador.',
      },
    ],
    sourcePage: 288,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7557',
  }),
  f({
    id: ESOTERIC_CAST.id,
    name: ESOTERIC_CAST.name,
    originalName: 'Esoteric Spellcasting',
    level: 4,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    prereqId: DED_PAL.id,
    prereqName: DED_PAL.name,
    repeatable: true,
    description:
      'Escolha uma magia de 1º posto oculta ou divina; 1/dia como inata. 6º: magia de 2º da mesma tradição. 8º: magia de 3º da mesma tradição. Especial: pode pegar uma segunda vez, escolhendo magias da outra tradição. Você escolhe tradição e magias; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'palatine-esoteric-tradition',
        options: [
          { id: 'divine', label: 'Divina' },
          { id: 'occult', label: 'Oculta' },
        ],
        hint: 'Tradição das magias inatas deste feito. Na segunda vez, a outra. O motor não escolhe.',
        abilityName: 'Conjuração esotérica: {choice}',
        abilityDescription:
          '1/dia: magia de 1º (você nomeia); 2º no 6º; 3º no 8º. Todas da tradição escolhida.',
      },
    ],
    sourcePage: 288,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7558',
  }),
  f({
    id: 'feat-palatine-detective-text-decoder',
    name: 'Decifrador de Textos',
    originalName: 'Text Decoder',
    level: 4,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    prereqId: DED_PAL.id,
    prereqName: DED_PAL.name,
    description:
      'Pode usar Ocultismo ou Religião para Decifrar Escrita, qualquer assunto. Ignora restrição de idioma ao Decifrar Escrita. Falha crítica ao Decifrar Escrita vira falha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Decifrador de Textos',
        description:
          'Ocultismo ou Religião para Decifrar Escrita (qualquer assunto). Ignora idioma. Falha crítica → falha.',
      },
    ],
    sourcePage: 288,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7559',
  }),
  f({
    id: 'feat-palatine-detective-palatine-enchantment',
    name: 'Encantamento Palatino',
    originalName: 'Palatine Enchantment',
    level: 6,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    prereqId: DED_PAL.id,
    prereqName: DED_PAL.name,
    description:
      'Ao Elaborar Estratagema contra criatura sobre a qual poderia Recordar Conhecimento com Ocultismo ou Religião, o Golpe seguinte trata a arma como se tivesse runa toque fantasma ou vitalizante. Você escolhe a runa na hora; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Encantamento Palatino',
        description:
          'Após Elaborar Estratagema (Ocultismo/Religião): Golpe com ghost touch ou vitalizing (você escolhe).',
      },
    ],
    sourcePage: 289,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7561',
  }),
  f({
    id: 'feat-palatine-detective-challenge-insight',
    name: 'Desafiar a Compreensão',
    originalName: 'Challenge Insight',
    level: 8,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    traits: ['Arquétipo', 'Auditivo'],
    prereqId: DED_PAL.id,
    prereqName: DED_PAL.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Requisito: o conjurador disparador precisa ouvir e entender você',
      },
    ],
    description:
      'Teste de contramedida contra a magia disparadora. Posto de contramedida: metade do nível (para cima). Modificador: Ocultismo se a magia for oculta, Religião se for divina. Sucesso: o conjurador fica estupefato 1 até o fim do próximo turno dele.',
    actionType: 'reaction',
    frequency: '1 por dia',
    trigger: 'Uma criatura que você vê Conjura uma Magia da tradição divina ou oculta.',
    sourcePage: 289,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7562',
  }),
  f({
    id: 'feat-palatine-detective-palatine-strike',
    name: 'Golpe Palatino',
    originalName: 'Palatine Strike',
    level: 8,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    prereqId: DED_PAL.id,
    prereqName: DED_PAL.name,
    description:
      'Ao causar dano de precisão com golpe estratégico a uma criatura sobre a qual usou Ocultismo ou Religião para Recordar Conhecimento com sucesso, +2d6 de dano de precisão extra nesse golpe estratégico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Golpe Palatino',
        description:
          '+2d6 de precisão no golpe estratégico contra alvo sobre o qual Recordeu Conhecimento com Ocultismo ou Religião.',
      },
    ],
    sourcePage: 289,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7563',
  }),
  f({
    id: 'feat-palatine-detective-cursebreaker',
    name: 'Quebra-maldição',
    originalName: 'Cursebreaker',
    level: 10,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    prereqId: DED_PAL.id,
    prereqName: DED_PAL.name,
    description:
      '10 minutos de ritos em criatura disposta no alcance. Contramedida contra uma maldição: posto metade do nível (para cima); modificador Ocultismo ou Religião. +1 de circunstância se a vítima ou quem lançou a maldição for o alvo da investigação ativa (Perseguir uma Pista). Se a maldição vier de item ou fonte externa, sucesso permite que o alvo se livre do item amaldiçoado, mas não remove a maldição do item. Você escolhe Ocultismo ou Religião; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Quebra-maldição',
        description:
          '10 min. Contramedida (metade do nível; Ocultismo ou Religião). +1 se for o caso ativo. Item amaldiçoado: sucesso liberta a criatura, não o item.',
      },
    ],
    sourcePage: 289,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7564',
  }),
  f({
    id: 'feat-palatine-detective-open-the-blazing-eye',
    name: 'Abrir o Olho Flamejante',
    originalName: 'Open the Blazing Eye',
    level: 10,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    prereqId: DED_PAL.id,
    prereqName: DED_PAL.name,
    description:
      'Chama sem luz na testa. Por 1 minuto, benefícios de ver o invisível. Golpes nesse período contra criatura sobre a qual poderia Recordar Conhecimento com Ocultismo ou Religião ignoram penalidades de circunstância no ataque e testes simples por alvo oculto ou escondido.',
    actionType: 'two',
    frequency: '1 por dia',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Abrir o Olho Flamejante',
        actionType: 'two',
        description:
          '1/dia, 1 min: ver o invisível. Golpes vs alvos de Ocultismo/Religião ignoram penalidade de circunstância e teste simples de oculto/escondido.',
      },
    ],
    sourcePage: 289,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7565',
  }),
  f({
    id: 'feat-palatine-detective-greater-esoteric-spellcasting',
    name: 'Conjuração Esotérica Maior',
    originalName: 'Greater Esoteric Spellcasting',
    level: 12,
    archetypeId: 'archetype-palatine-detective',
    classId: CLASS_INVESTIGATOR_ID,
    prereqId: ESOTERIC_CAST.id,
    prereqName: ESOTERIC_CAST.name,
    repeatable: true,
    description:
      'Perito em ataque e CD de magia. Escolha uma tradição da qual já conjure inatas por Conjuração Esotérica: magia de 4º inata 1/dia; 5º no 12º; 6º no 14º (mesma tradição). Especial: pode pegar uma segunda vez, outra tradição elegível. Você escolhe tradição e magias; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Perito em magia palatina',
        description: 'Perito em ataque e CD de magia.',
      },
      {
        kind: 'textChoice',
        choiceId: 'palatine-greater-esoteric-tradition',
        options: [
          { id: 'divine', label: 'Divina' },
          { id: 'occult', label: 'Oculta' },
        ],
        hint: 'Tradição já liberada por Conjuração Esotérica. O motor não escolhe.',
        abilityName: 'Inatas maiores: {choice}',
        abilityDescription:
          '1/dia: magia de 4º (você nomeia); 5º no 12º; 6º no 14º. Na segunda vez, a outra tradição.',
      },
    ],
    sourcePage: 289,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7566',
  }),
]

const runelordArchetypeFeats: Feat[] = [
  f({
    id: DED_RUNE.id,
    name: DED_RUNE.name,
    originalName: 'Runelord Dedication',
    level: 2,
    archetypeId: 'archetype-runelord',
    isDedication: true,
    classId: CLASS_WIZARD_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    rarity: 'rare',
    extraPrereq: [
      { kind: 'class', classId: CLASS_WIZARD_ID },
      { kind: 'text', label: 'Escola de magia rúnica Thassiloniana (runelord)' },
    ],
    description:
      'Arquétipo de classe de mago. Treinado em armas de haste e lanças marciais (sobe com simples). Idioma tasseloniano. Runa pessoal no lugar de tese; vínculo arcano deve ser haste ou lança (funciona como cajado só você prepara, com magias do pecado até o posto mais alto, incluindo truques; runa pessoal não conta no limite). Pode fundir outro cajado no vínculo nas preparações. Escola obrigatória: Magia Rúnica Thassiloniana. Conjura currículo/escola traçando runas (sem falar). Recentrar: contemplar ou indulgir no pecado; ao Recentrar, pode trocar uma magia preparada por uma de currículo ou pecado do mesmo posto. Anátema do pecado: perde benefícios da runa pessoal e CD 15 simples ou perde currículo/escola até ritual de expiação (Arcana nas duas checagens). Currículo do próprio pecado nunca viola anátema. 8º: Magia Escolar Avançada (poço rúnico pessoal) de bônus. Você DEVE escolher o pecado/runa; o motor não escolhe.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        groups: ['polearm', 'spear'],
        martialAsSimple: true,
      },
      { kind: 'language', name: 'Tasseloniano' },
      {
        kind: 'textChoice',
        choiceId: 'runelord-sin',
        options: [
          {
            id: 'envy',
            label:
              'Inveja (Olho Cortante) — anátema: magia que cause dano com elementos ou vazio; inicial: cutting eye',
          },
          {
            id: 'gluttony',
            label:
              'Gula (Tudo-Abrangente) — anátema: proteger outros ou manipular mentes; inicial: all-encompassing hunger',
          },
          {
            id: 'greed',
            label:
              'Ganância (Brilho Precioso) — anátema: afetar mente ou percepção em vez da realidade física; inicial: precious gleam',
          },
          {
            id: 'lust',
            label:
              'Luxúria (Gancho do Coração) — anátema: interferir em formas físicas ou invocar o vazio; inicial: heart’s hook',
          },
          {
            id: 'pride',
            label:
              'Orgulho (Cetro Crescente) — anátema: mudar ou criar coisas físicas em vez de aparências; inicial: crescent scepter',
          },
          {
            id: 'sloth',
            label:
              'Preguiça (Reclinado) — anátema: manipular aparências ou dano direto com elementos; inicial: reclined apport',
          },
          {
            id: 'wrath',
            label:
              'Ira (Olhar Vingativo) — anátema: proteger ou criar; inicial: vengeful glare',
          },
        ],
        hint: 'Escolha o pecado/runa. O motor nunca escolhe.',
        abilityName: 'Pecado runelord: {choice}',
        abilityDescription:
          'Currículo e magia escolar inicial do pecado entram na escola Thassiloniana. Anátema conforme o pecado. Vínculo: haste ou lança (você escolhe a arma). Pedras eon: benefícios via Embutir Pedra Eon (você escolhe as pedras).',
      },
      {
        kind: 'specialAbility',
        name: 'Escola de magia rúnica Thassiloniana',
        description:
          'Currículo comum: detect magic, sigil; 1º mystic armor, runic body, runic weapon, sure strike; 2º darkvision, see the unseen; 3º clairaudience, veil of privacy; 4º clairvoyance, fly; 5º mind probe, sending; 6º scrying, truesight; 7º contingency, spell riposte; 8º unrelenting observation, hidden mind; 9º foresight. Avançada (8º): personal runewell. Magias marcadas fora da lista arcana ainda são arcanas.',
      },
      {
        kind: 'specialAbility',
        name: 'Runa pessoal e vínculo',
        description:
          'Sem tese. Runa na arma vinculada (haste ou lança; você escolhe). Cajado só você prepara, com magias do pecado até o posto mais alto. Pode fundir outro cajado no preparo. Conjuração de currículo/escola sem componente verbal (traça runas). Recentrar no pecado: pode trocar 1 magia preparada por currículo/pecado do mesmo posto.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7482',
  }),
  f({
    id: EMBED_AEON.id,
    name: EMBED_AEON.name,
    originalName: 'Embed Aeon Stone',
    level: 2,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    traits: ['Arquétipo', 'Perícia', 'Intervalo'],
    prereqId: DED_RUNE.id,
    prereqName: DED_RUNE.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Artesanato' },
    ],
    allowedSlotKinds: ['skill'],
    description:
      '1 dia sintonizando e embutindo uma pedra eon na pele: benefícios como se orbitasse, mais difícil de notar ou roubar. Precisa estar investida. Remoção segura: 1 dia. Sem este feito: Medicina CD 30 e 1 dia, ou arrancar de um cadáver. Você escolhe qual pedra embutir; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Embutir Pedra Eon',
        description:
          '1 dia para embutir ou remover. Benefícios da pedra investida como se orbitasse. Você escolhe a pedra.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7483',
  }),
  f({
    id: 'feat-runelord-tattoo-artist',
    name: 'Tatuador',
    originalName: 'Tattoo Artist',
    level: 2,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_RUNE.id,
    prereqName: DED_RUNE.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Artesanato; feito adicional' },
    ],
    allowedSlotKinds: ['skill'],
    description:
      'Pode fabricar tatuagens, inclusive mágicas. Fórmulas de quatro tatuagens mágicas comuns de 2º nível ou menos (você escolhe quais; o motor não escolhe). +1 de circunstância em Artesanato para fabricar tatuagens (+2 se mestre, e mais quatro fórmulas comuns de 7º ou menos).',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Artesanato para fabricar tatuagens (+2 se mestre)',
      },
      {
        kind: 'specialAbility',
        name: 'Fórmulas de tatuagem',
        description:
          '4 tatuagens mágicas comuns ≤ 2º (você nomeia). Mestre: +4 comuns ≤ 7º. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_TREASURE_VAULT_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=2962',
  }),
  f({
    id: 'feat-runelord-aeon-resonance',
    name: 'Ressonância Eon',
    originalName: 'Aeon Resonance',
    level: 4,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    prereqId: EMBED_AEON.id,
    prereqName: EMBED_AEON.name,
    repeatable: true,
    description:
      'Ganha o poder de ressonância de uma pedra eon embutida como se estivesse num wayfinder. Várias pedras embutidas: só uma ressonância por vez, escolhida nas preparações. Especial: no 8º pode pegar de novo — até quatro pedras investidas. Você escolhe a(s) pedra(s); o motor não escolhe. Não acumula ressonância extra com wayfinder.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ressonância Eon',
        description:
          '1 pedra embutida (até 4 se pegar de novo no 8º+). Escolha nas preparações. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7484',
  }),
  f({
    id: 'feat-runelord-rod-of-rule',
    name: 'Cetro de Domínio',
    originalName: 'Rod of Rule',
    level: 6,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    prereqId: DED_RUNE.id,
    prereqName: DED_RUNE.name,
    description:
      'Especialização crítica com a arma do vínculo arcano. Ao acertar criticamente com ela, o alvo sofre −2 de circunstância em salvaguardas contra suas magias de currículo ou pecado até o fim do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cetro de Domínio',
        description:
          'Especialização crítica na arma vinculada. Crítico: −2 de circunstância nas salvaguardas do alvo contra currículo/pecado até o fim do seu próximo turno.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=303',
  }),
  f({
    id: 'feat-runelord-sinbladed-spell',
    name: 'Magia da Lâmina do Pecado',
    originalName: 'Sinbladed Spell',
    level: 6,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    prereqId: DED_RUNE.id,
    prereqName: DED_RUNE.name,
    description:
      'Se a próxima magia for de pecado ou currículo (não truque) contra um único alvo, e você acertar o ataque ou o alvo falhar na salvaguarda, surge um ferimento na forma da runa pessoal: sangramento persistente igual ao posto da magia, além dos efeitos normais.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magia da Lâmina do Pecado',
        actionType: 'one',
        description:
          'Metamagia. Magia de pecado/currículo (não truque), um alvo: sangramento persistente = posto da magia se o ataque acertar ou a salvaguarda falhar.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=303',
  }),
  f({
    id: 'feat-runelord-sin-reservoir',
    name: 'Reservatório do Pecado',
    originalName: 'Sin Reservoir',
    level: 8,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    prereqId: DED_RUNE.id,
    prereqName: DED_RUNE.name,
    description:
      'Nas preparações, ao indulgir ou meditar no pecado, ganha um espaço extra de qualquer posto até dois abaixo do mais alto de mago. Só pode preparar uma magia de currículo nesse espaço. Você escolhe o posto e a magia; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Reservatório do Pecado',
        description:
          '+1 espaço (posto ≤ mais alto − 2), só currículo. Você escolhe posto e magia.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=303',
  }),
  f({
    id: 'feat-runelord-sin-counterspell',
    name: 'Contramedida do Pecado',
    originalName: 'Sin Counterspell',
    level: 10,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    prereqId: DED_RUNE.id,
    prereqName: DED_RUNE.name,
    description:
      'Pode usar Contramedida com qualquer magia de currículo (não só a mesma magia) se a magia do oponente violaria a anátema do seu pecado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Contramedida do Pecado',
        description:
          'Contramedida com qualquer currículo se a magia do oponente violar a anátema do seu pecado.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=303',
  }),
  f({
    id: 'feat-runelord-orichalcum-bond',
    name: 'Vínculo de Oricalco',
    originalName: 'Orichalcum Bond',
    level: 18,
    archetypeId: 'archetype-runelord',
    classId: CLASS_WIZARD_ID,
    prereqId: DED_RUNE.id,
    prereqName: DED_RUNE.name,
    description:
      'Ao colocar a runa pessoal na arma nas preparações, escolha uma runa de propriedade de arma de nível até o seu (comum ou a que você tenha acesso). Ela é adicionada até o próximo preparo e conta no limite normalmente. Você escolhe a runa; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Vínculo de Oricalco',
        description:
          'Nas preparações: 1 runa de propriedade (nível ≤ o seu, comum ou com acesso) na arma vinculada. Conta no limite. Você escolhe a runa.',
      },
    ],
    sourceId: SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=303',
  }),
]

const seneschalArchetypeFeats: Feat[] = [
  f({
    id: DED_SEN.id,
    name: DED_SEN.name,
    originalName: 'Seneschal Witch Dedication',
    level: 2,
    archetypeId: 'archetype-seneschal',
    isDedication: true,
    classId: CLASS_WITCH_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    rarity: 'rare',
    extraPrereq: [
      { kind: 'class', classId: CLASS_WITCH_ID },
      { kind: 'text', label: 'Senescal (patrono silencioso)' },
    ],
    description:
      'Arquétipo de classe de bruxa cujo patrono silenciou. No lugar da lição do patrono: truque hex manifestar vontade e o familiar aprende uma magia comum de 1º da sua lista (você escolhe). Ganha Carga da Bruxa, mas não pode escolher o familiar nem criatura com traço lacaio. Ao conjurar ou Sustentar manifestar vontade, se a carga estiver a 9 m, pode centrar a emanação nela. Você escolhe a magia do familiar e a carga; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Manifestar vontade (hex truque)',
        description:
          'Substitui a lição do patrono. Truque hex (sem ponto de foco; 1 hex por turno). Emanação; Sustentar. Sem patrono, a manifestação segue a tradição que você ainda canaliza — você descreve; o motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Magia do familiar (1º comum)',
        description:
          'O familiar aprende uma magia comum de 1º da sua lista. Você nomeia; o motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Carga da Bruxa (senescal)',
        description:
          'Como o feito Carga da Bruxa: nas preparações, uma criatura disposta (não familiar/lacaio). Sempre sabe direção, distância e condições. Magias de toque a 9 m na carga. Ao conjurar/Sustentar manifestar vontade, pode centrar a emanação na carga a 9 m. Você escolhe a carga.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 62,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7247',
  }),
  f({
    id: 'feat-seneschal-patrons-glamour',
    name: 'Glamour do Patrono',
    originalName: "Patron's Glamour",
    level: 4,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Disfarce ilusório como inata da tradição do patrono ausente, elevada automaticamente ao posto dos truques de bruxa, só para se disfarçar como a representação humanóide do patrono. Magias de detecção de posto inferior revelam informações do patrono, não as suas. A tradição é a do patrono antigo; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Glamour do Patrono',
        description:
          'Illusory disguise inata (tradição do patrono ausente), só forma humanóide do patrono. Detecção de posto menor lê o patrono, não você.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 62,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7248',
  }),
  f({
    id: 'feat-seneschal-seneschal-spell',
    name: 'Magia de Senescal',
    originalName: 'Seneschal Spell',
    level: 4,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Se a próxima ação for Conjurar uma Magia e a carga estiver a 9 m, a magia pode originar-se da carga. Ela pode usar a reação para completar a incantação: a magia ganha o traço sutil para você (não para ela), pois a manifestação aparece só em volta da carga.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magia de Senescal',
        actionType: 'one',
        description:
          'Metamagia. Magia origina-se da carga a 9 m. Reação da carga: traço sutil para você.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 62,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7249',
  }),
  f({
    id: 'feat-seneschal-multifaceted-will',
    name: 'Vontade Multifacetada',
    originalName: 'Multifaceted Will',
    level: 6,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Ao conjurar ou Sustentar manifestar vontade, pode escolher a manifestação de qualquer tradição. Enquanto a magia estiver ativa, você e aliados na área ganham +1 de status em salvaguardas contra magias com aquele traço de tradição. Você escolhe a tradição a cada uso; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Vontade Multifacetada',
        description:
          'Ao conjurar/Sustentar manifestar vontade: qualquer tradição. +1 de status nas salvaguardas contra magias dessa tradição na área. Você escolhe a tradição.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 63,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7250',
  }),
  f({
    id: 'feat-seneschal-spiritual-secret',
    name: 'Segredo Espiritual',
    originalName: 'Spiritual Secret',
    level: 6,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Se a próxima ação for conjurar truque ou magia de bruxa que cause dano, o dano vira espírito. Perde traços do tipo de dano (fogo, mental etc.) e ganha santificado e espírito.',
    actionType: 'free',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Segredo Espiritual',
        actionType: 'free',
        description:
          'Próximo truque/magia de bruxa com dano: dano de espírito; traços santificado e espírito no lugar dos de tipo de dano.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 63,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7251',
  }),
  f({
    id: 'feat-seneschal-watcher-on-the-wall',
    name: 'Vigia no Muro',
    originalName: 'Watcher on the Wall',
    level: 8,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Grava um símbolo numa superfície adjacente. Enquanto estiver no mesmo plano, vê e ouve como se estivesse no símbolo. Dura até gravar outro ou a superfície ser destruída. Você escolhe a superfície; o motor não escolhe.',
    actionType: 'two',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Vigia no Muro',
        actionType: 'two',
        description:
          'Símbolo em superfície adjacente: visão e audição dali no mesmo plano. Um símbolo por vez.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 63,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7252',
  }),
  f({
    id: 'feat-seneschal-martyr',
    name: 'Mártir',
    originalName: 'Martyr',
    level: 10,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Se a próxima ação for conjurar ferir ou curar para restaurar PV a um único aliado, você perde 1d8 PV por posto da magia (não reduzível) e o aliado recupera o mesmo. Você escolhe o aliado; o motor não escolhe.',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mártir',
        actionType: 'one',
        description:
          'Metamagia. Harm/heal de cura em um aliado: você perde 1d8 PV/posto (sem mitigação); o aliado recupera o mesmo.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 63,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7254',
  }),
  f({
    id: 'feat-seneschal-patrons-whisper',
    name: 'Sussurro do Patrono',
    originalName: "Patron's Whisper",
    level: 10,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    traits: ['Arquétipo', 'Auditivo'],
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Mensagem como truque inato da tradição do patrono ausente. Pode enviar a uma criatura que já tenha sido sua carga, qualquer alcance. Se Mentir na mensagem, o alvo sofre −2 de circunstância na CD de Percepção e em Sentir Motivação para revelar a mentira.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sussurro do Patrono',
        description:
          'Message inato (tradição do patrono). Alcance ilimitado se já foi carga. Mentira: −2 na CD de Percepção e em Sentir Motivação.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 63,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7253',
  }),
  f({
    id: 'feat-seneschal-unstable-patronage',
    name: 'Patronato Instável',
    originalName: 'Unstable Patronage',
    level: 14,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Nas preparações, escolha uma magia que o familiar conheça e uma de suas cargas. Uma vez antes do próximo preparo, essa criatura pode conjurá-la como inata; posto no máximo igual ao seu mais alto − 2. Você escolhe magia e carga; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Patronato Instável',
        description:
          '1 magia do familiar (posto ≤ seu máximo − 2) para 1 carga, 1/dia como inata. Você escolhe magia e carga.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 63,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=284',
  }),
  f({
    id: 'feat-seneschal-premonition-of-clarity',
    name: 'Premonição de Clareza',
    originalName: 'Premonition of Clarity',
    level: 16,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de clérigo' }],
    description:
      'Rerrola a salvaguarda disparadora com +2 de circunstância. Deve usar o segundo resultado, mesmo se pior.',
    actionType: 'reaction',
    frequency: '1 por hora',
    trigger: 'Você falha numa salvaguarda contra um efeito mental.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 120,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4691',
  }),
  f({
    id: 'feat-seneschal-inviolable',
    name: 'Inviolável',
    originalName: 'Inviolable',
    level: 18,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de clérigo' }],
    description:
      'Criaturas que o acertam com um ataque sofrem 3d6 de dano de espírito. Se você tiver o traço sagrado ou profano, pode aplicá-lo a esse dano. Você escolhe se aplica o traço; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Inviolável',
        description:
          'Quem o acerta com ataque: 3d6 espírito. Pode aplicar sagrado/profano se você tiver o traço.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4701',
  }),
  f({
    id: 'feat-seneschal-patron-reborn',
    name: 'Patrono Renascido',
    originalName: 'Patron Reborn',
    level: 20,
    archetypeId: 'archetype-seneschal',
    classId: CLASS_WITCH_ID,
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Visão no escuro, visão verdadeira constante e visão para planos transitivos que se sobrepõem ao seu. Pode ser patrono de outras bruxas: escolha um tipo de patrono (ex.: O Ressentimento, Sombra sem Estrelas). Bruxa aliada que você observa com esse patrono conta como carga e ganha os benefícios de Carga da Bruxa mesmo sem ser escolhida no preparo. Aprende o ritual desejo e pode ensiná-lo às cargas. 1/mês, quando uma carga realiza desejo, você pode rolar o teste no lugar dela. Você escolhe o tipo de patrono; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sentidos de patrono',
        description:
          'Visão no escuro, visão verdadeira constante, visão em planos transitivos sobrepostos.',
      },
      {
        kind: 'specialAbility',
        name: 'Patrono de bruxas',
        description:
          'Nomeie o tipo de patrono que você representa. Aliada com esse patrono = carga (benefícios de Carga da Bruxa). Ritual desejo; 1/mês pode rolar o teste no lugar da carga. O motor não escolhe o patrono.',
      },
    ],
    sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: 63,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=284',
  }),
]

export const archetypeFeatsGeneralRemaster26: Feat[] = [
  ...battleHarbingerArchetypeFeats,
  ...palatineDetectiveArchetypeFeats,
  ...runelordArchetypeFeats,
  ...seneschalArchetypeFeats,
]
