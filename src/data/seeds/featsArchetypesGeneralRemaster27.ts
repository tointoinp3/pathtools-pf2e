/** Arquétipos de classe Remaster (War of Immortals): Vingador (ladino), Bloodrager (bárbaro), Vindicador (patrulheiro), Guerreiro da Lenda (guerreiro). Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  CLASS_BARBARIAN_ID,
  CLASS_FIGHTER_ID,
  CLASS_RANGER_ID,
  CLASS_ROGUE_ID,
} from './ids'
import {
  SOURCE_DARK_ARCHIVES_ID,
  SOURCE_PLAYER_CORE_ID,
  SOURCE_PLAYER_CORE_2_ID,
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
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'archetype',
    archetypeId: opts.archetypeId,
    isDedication: opts.isDedication,
    classId:
      opts.classId ??
      ({
        'archetype-avenger': CLASS_ROGUE_ID,
        'archetype-bloodrager': CLASS_BARBARIAN_ID,
        'archetype-vindicator': CLASS_RANGER_ID,
        'archetype-warrior-of-legend': CLASS_FIGHTER_ID,
      }[opts.archetypeId] ?? null),
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
    sourceId: opts.sourceId ?? SOURCE_WAR_OF_IMMORTALS_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_AVENGER = {
  id: 'feat-avenger-dedication',
  name: 'Dedicação de Vingador',
}
const DED_BLOOD = {
  id: 'feat-bloodrager-dedication',
  name: 'Dedicação de Bloodrager',
}
const DED_VIND = {
  id: 'feat-vindicator-dedication',
  name: 'Dedicação de Vindicador',
}
const DED_WARRIOR = {
  id: 'feat-warrior-of-legend-dedication',
  name: 'Dedicação de Guerreiro da Lenda',
}

const AVENGER_TWIN_PARRY = {
  id: 'feat-avenger-twin-parry',
  name: 'Aparar Gêmeo',
}
const AVENGER_TWIN_RIPOSTE = {
  id: 'feat-avenger-twin-riposte',
  name: 'Riposta Gêmea',
}
const BLOOD_RISING = {
  id: 'feat-bloodrager-rising-blood-magic',
  name: 'Magia de Sangue Nascente',
}
const BLOOD_SURGING = {
  id: 'feat-bloodrager-surging-blood-magic',
  name: 'Magia de Sangue Pulsante',
}
const VIND_DOMAIN = {
  id: 'feat-vindicator-domain-initiate',
  name: 'Iniciado de Domínio',
}
const WARRIOR_BOND = {
  id: 'feat-warrior-of-legend-hero-gods-bond',
  name: 'Vínculo do Herói-Deus',
}
const WARRIOR_SPEAR = {
  id: 'feat-warrior-of-legend-spear-of-doom',
  name: 'Lança da Perdição',
}

const BLOOD_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-bloodrager-archetype',
  label: 'Conjuração de Bloodrager',
  style: 'spontaneous',
  tradition: 'arcane',
  traditionChoiceId: 'bloodrager-tradition',
  traditionOptions: ['arcane', 'divine'],
  traditionChoiceHint:
    'Arcana ou divina. Pelo menos um truque precisa ter ataque de magia. O motor não escolhe a tradição nem os truques.',
  grantTraditionSkill: true,
  attributeId: 'charisma',
  proficiencyRank: 'trained',
  cantripsPerDay: 2,
  classOriginalName: 'Bloodrager',
  features: { repertoire: true },
}

const avengerArchetypeFeats: Feat[] = [
  f({
    id: DED_AVENGER.id,
    name: DED_AVENGER.name,
    originalName: 'Avenger Dedication',
    level: 2,
    archetypeId: 'archetype-avenger',
    isDedication: true,
    classId: CLASS_ROGUE_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_ROGUE_ID },
      { kind: 'text', label: 'Racket Vingador (Avenger) no 1º nível' },
    ],
    description:
      'Arquétipo de classe (ladino). No 1º: escolha uma divindade (o motor não escolhe) e o racket Vingador; não ganha Ataque Surpresa; ganha Caçar Presa. Treinado na arma predileta da divindade; quando a classe der perito ou mais em simples/marciais, a arma predileta sobe junto. Ataque sorrateiro vale com a arma predileta. Crítico com ela contra alvo desprevenido: especialização crítica. Treinado na perícia divina da divindade e em armadura média (outra perícia se já for treinado na divina). Pode escolher Força como atributo-chave. Perícia em armadura média quando ganhar perícia/maestria em leve. Você nomeia votos (silêncio, celibato ou outro); o motor não escolhe. Dedicação: +1 de status em salvaguardas contra magias divinas e efeitos de dano espírito. Religião para Coagir, Recolher Informações ou Rastrear em cidade com igreja da sua divindade.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Divindade e votos',
        description:
          'Você escolhe a divindade, a arma predileta e nomeia os votos. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Caçar Presa',
        actionType: 'one',
        description:
          'Designa uma presa caçada. Substitui Ataque Surpresa deste arquétipo de classe.',
      },
      {
        kind: 'specialAbility',
        name: 'Racket Vingador',
        description:
          'Treinado na arma predileta; ataque sorrateiro com ela; especialização crítica se crítico contra desprevenido. Treinado na perícia divina (outra perícia se já for). Pode usar Força como atributo-chave. Armadura média sobe com perícia/maestria em leve.',
      },
      { kind: 'defenseRank', categories: ['medium'], rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Fé implacável',
        description:
          '+1 de status em salvaguardas contra magias divinas e efeitos que causam dano espírito. Religião para Coagir, Recolher Informações ou Rastrear em cidade com igreja da sua divindade.',
      },
    ],
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7232',
  }),
  f({
    id: 'feat-avenger-twin-takedown',
    name: 'Abate Gêmeo',
    originalName: 'Twin Takedown',
    level: 4,
    archetypeId: 'archetype-avenger',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_AVENGER.id,
    prereqName: DED_AVENGER.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de patrulheiro' },
      {
        kind: 'text',
        label: 'Empunhando duas armas corpo a corpo, uma em cada mão',
      },
    ],
    description:
      'Dois Golpes contra a presa caçada, um com cada arma. Se ambos acertarem a mesma presa, some o dano para resistências e fraquezas. Penalidade de ataque múltiplo em cada Golpe.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4864',
  }),
  f({
    id: AVENGER_TWIN_PARRY.id,
    name: AVENGER_TWIN_PARRY.name,
    originalName: 'Twin Parry',
    level: 6,
    archetypeId: 'archetype-avenger',
    prereqId: DED_AVENGER.id,
    prereqName: DED_AVENGER.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de guerreiro/patrulheiro' },
      {
        kind: 'text',
        label: 'Empunhando duas armas corpo a corpo, uma em cada mão',
      },
    ],
    description:
      '+1 de circunstância na CA até o início do seu próximo turno, ou +2 se qualquer arma tiver o traço aparar. Perde o bônus se deixar de cumprir o requisito.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 144,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4796',
  }),
  f({
    id: 'feat-avenger-zealous-inevitability',
    name: 'Inevitabilidade Zeloza',
    originalName: 'Zealous Inevitability',
    level: 6,
    archetypeId: 'archetype-avenger',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_AVENGER.id,
    prereqName: DED_AVENGER.name,
    extraPrereq: [
      { kind: 'text', label: 'Empunhando a arma predileta da sua divindade' },
    ],
    description:
      'Golpeie com a arma predileta. Sucesso: o alvo fica condenado 1 ou aumenta condenado em 1 (a maioria das criaturas vivas morre em condenado 4). Condenados assim sofrem penalidade de status em salvaguardas contra magias divinas igual ao valor de condenado. Criatura que ficaria condenada 4 pode testar Vontade contra sua CD de classe para não aumentar; nesse caso a habilidade ganha o traço incapacitação.',
    actionType: 'one',
    sourcePage: 59,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7233',
  }),
  f({
    id: 'feat-avenger-silence-the-profane',
    name: 'Silenciar o Profano',
    originalName: 'Silence the Profane (Avenger)',
    level: 8,
    archetypeId: 'archetype-avenger',
    prereqId: DED_AVENGER.id,
    prereqName: DED_AVENGER.name,
    extraPrereq: [
      { kind: 'text', label: 'Empunhando a arma predileta da sua divindade' },
    ],
    description:
      'Golpeie o conjurador com a arma predileta. Sucesso: desprevenido até o fim do seu próximo turno. A magia é interrompida em crítico, ou em sucesso se o alvo for sua presa caçada e a magia for divina. Especial: se a arma predileta for à distância, o gatilho vale no primeiro incremento e o Golpe pode ser à distância.',
    actionType: 'reaction',
    trigger:
      'Uma criatura que você observa no alcance da arma predileta da sua divindade conjura uma magia.',
    sourcePage: 59,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7234',
  }),
  f({
    id: 'feat-avenger-shadow-of-death',
    name: 'Sombra da Morte',
    originalName: 'Shadow of Death',
    level: 10,
    archetypeId: 'archetype-avenger',
    prereqId: DED_AVENGER.id,
    prereqName: DED_AVENGER.name,
    description:
      'Golpes com a arma predileta contra criatura condenada ganham o traço morte: o alvo morre ao chegar a 0 PV. Morto assim: comunicar, reviver, transformar em morto-vivo ou perturbar o além falha, salvo se o posto de contramágica for maior que metade do seu nível (arredondado para cima) quando você o matou, ou se vier de artefato ou divindade.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sombra da morte',
        description:
          'Golpes com a arma predileta contra condenado têm traço morte. Após a morte, o além resiste a interferência (contramágica > metade do nível, artefato ou divindade).',
      },
    ],
    sourcePage: 59,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7235',
  }),
  f({
    id: 'feat-avenger-slay',
    name: 'Abater',
    originalName: 'Slay',
    level: 12,
    archetypeId: 'archetype-avenger',
    prereqId: DED_AVENGER.id,
    prereqName: DED_AVENGER.name,
    extraPrereq: [{ kind: 'text', label: 'O alvo está condenado 2 ou mais' }],
    description:
      'Golpeie o alvo. Se acertar, +4d6 de dano de precisão com Fortitude básica contra sua CD de classe. Falha crítica: o alvo morre (incapacitação). A criatura fica temporariamente imune ao seu Abater por 1 dia.',
    actionType: 'two',
    sourcePage: 59,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7236',
  }),
  f({
    id: AVENGER_TWIN_RIPOSTE.id,
    name: AVENGER_TWIN_RIPOSTE.name,
    originalName: 'Twin Riposte',
    level: 12,
    archetypeId: 'archetype-avenger',
    prereqId: AVENGER_TWIN_PARRY.id,
    prereqName: AVENGER_TWIN_PARRY.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de guerreiro/patrulheiro' },
      { kind: 'text', label: 'Você está se beneficiando de Aparar Gêmeo' },
    ],
    description: 'Faça um Golpe corpo a corpo ou Desarme contra o oponente disparador.',
    actionType: 'reaction',
    trigger: 'Uma criatura no seu alcance falha criticamente um Golpe contra você.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4831',
  }),
  f({
    id: 'feat-avenger-second-sting',
    name: 'Segunda Ferroada',
    originalName: 'Second Sting',
    level: 14,
    archetypeId: 'archetype-avenger',
    traits: ['Arquétipo', 'Pressão'],
    prereqId: DED_AVENGER.id,
    prereqName: DED_AVENGER.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de patrulheiro' },
      {
        kind: 'text',
        label: 'Empunhando duas armas corpo a corpo, uma em cada mão',
      },
    ],
    description:
      'Golpe corpo a corpo com uma das armas contra a presa caçada. Falha: causa o dano que a outra arma causaria num acerto, excluindo todos os dados de dano (runas, magias e habilidades também saem, não só os dados da arma).',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 162,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4895',
  }),
  f({
    id: 'feat-avenger-improved-twin-riposte',
    name: 'Riposta Gêmea Aprimorada',
    originalName: 'Improved Twin Riposte (Fighter)',
    level: 16,
    archetypeId: 'archetype-avenger',
    prereqId: AVENGER_TWIN_RIPOSTE.id,
    prereqName: AVENGER_TWIN_RIPOSTE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description:
      'Pode usar Riposta Gêmea mesmo sem Aparar Gêmeo (ainda precisa de duas armas corpo a corpo, uma em cada mão). No início de cada turno, ganha uma reação extra só para Riposta Gêmea.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Riposta gêmea aprimorada',
        description:
          'Riposta Gêmea sem Aparar Gêmeo (duas armas corpo a corpo). Reação extra no início do turno só para Riposta Gêmea.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4844',
  }),
]

const bloodragerArchetypeFeats: Feat[] = [
  f({
    id: DED_BLOOD.id,
    name: DED_BLOOD.name,
    originalName: 'Bloodrager Dedication',
    level: 2,
    archetypeId: 'archetype-bloodrager',
    isDedication: true,
    classId: CLASS_BARBARIAN_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_BARBARIAN_ID },
      { kind: 'text', label: 'Instinto Bloodrager no 1º nível' },
    ],
    description:
      'Arquétipo de classe (bárbaro). No 1º: instinto Bloodrager. Fúria de Sangue: ataques físicos na fúria causam sangramento persistente extra igual à metade do dano extra da Fúria; magias com ataque de magia na fúria recebem o dano extra da Fúria mesmo em falha. Especialização: dano extra da Fúria 2→4 (4→8 com especialização maior). Resistência na fúria: corte, sangramento persistente e o dano da criatura cujo sangue você colheu por último. Você nomeia a fonte do sangue (o motor não escolhe). Dedicação: repertório com dois truques (arcano ou divino; você escolhe a tradição e os truques; pelo menos um com ataque de magia). Treinado em ataque e CD de magia. Atributo-chave: Carisma. Magias do repertório ganham traço fúria enquanto você está em fúria. Ao Conjurar magia do repertório, fica drenado 1 (ou aumenta drenado); só reduz com Colher Sangue. Treinado em Arcana (arcano) ou Religião (divino); outra perícia se já for treinado. Ganha Colher Sangue.',
    effects: [
      { kind: 'spellcasting', access: BLOOD_SPELL },
      {
        kind: 'specialAbility',
        name: 'Fonte de sangue',
        description:
          'Você nomeia a origem do sangue que despertou o poder. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Fúria de Sangue',
        description:
          'Na fúria: sangramento persistente extra = metade do dano extra da Fúria nos ataques físicos. Magias com ataque de magia recebem o dano extra da Fúria mesmo em falha. Especialização: +2 vira +4 (ou +4 vira +8 com especialização maior). Resistência na fúria: corte, sangramento persistente e o dano da última criatura de Colher Sangue.',
      },
      {
        kind: 'specialAbility',
        name: 'Colher Sangue',
        actionType: 'one',
        description:
          'Requisito: sua última ação foi Golpe corpo a corpo perfurante ou cortante bem-sucedido contra criatura não imune a sangramento. Reduz drenado em 1, PV temporários = modificador de Constituição, +1 de circunstância em salvaguardas contra magias dessa criatura por 1 minuto (ou até Colher Sangue de outra).',
      },
      {
        kind: 'specialAbility',
        name: 'Repertório em fúria',
        description:
          'Magias do repertório ganham traço fúria na fúria. Conjurar do repertório: drenado 1 (ou +1). Só Colher Sangue reduz esse drenado. Você escolhe os dois truques; o motor não escolhe.',
      },
    ],
    sourcePage: 60,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7239',
  }),
  f({
    id: 'feat-bloodrager-blood-calls-blood',
    name: 'O Sangue Chama o Sangue',
    originalName: 'Blood Calls Blood',
    level: 4,
    archetypeId: 'archetype-bloodrager',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED_BLOOD.id,
    prereqName: DED_BLOOD.name,
    description:
      'Você termina de Conjurar a Magia e fica drenado 1 (ou aumenta drenado em 1).',
    actionType: 'reaction',
    trigger:
      'Você falha num teste simples para Conjurar uma Magia, ou a magia seria interrompida pela reação de outra criatura.',
    sourcePage: 60,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7240',
  }),
  f({
    id: BLOOD_RISING.id,
    name: BLOOD_RISING.name,
    originalName: 'Rising Blood Magic',
    level: 4,
    archetypeId: 'archetype-bloodrager',
    prereqId: DED_BLOOD.id,
    prereqName: DED_BLOOD.name,
    description:
      'Benefícios de conjuração básica. Cada vez que ganhar espaço de um posto novo deste arquétipo, adicione ao repertório uma magia comum da tradição e posto (você escolhe; o motor não escolhe). Além disso, ao Conjurar magia do repertório com drenado 1+, o dano extra da Fúria nessa magia aumenta em 1.',
    effects: [
      { kind: 'spellcastingTier', sourceId: BLOOD_SPELL.id, tier: 'basic' },
      {
        kind: 'specialAbility',
        name: 'Dano de fúria nas magias (drenado 1+)',
        description:
          'Ao Conjurar do repertório com drenado 1+, +1 no dano extra da Fúria dessa magia. Você escolhe cada magia nova do repertório.',
      },
    ],
    sourcePage: 60,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7241',
  }),
  f({
    id: 'feat-bloodrager-split-shot',
    name: 'Tiro Dividido',
    originalName: 'Split Shot',
    level: 4,
    archetypeId: 'archetype-bloodrager',
    traits: ['Arquétipo', 'Concentrar', 'Forma de Magia'],
    prereqId: DED_BLOOD.id,
    prereqName: DED_BLOOD.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de feiticeiro' }],
    description:
      'Se a próxima ação for Conjurar magia sem duração que exige jogada de ataque contra um único alvo, escolha um segundo alvo no alcance. Uma jogada de ataque contra a CA dos dois (conta como um ataque na penalidade). O segundo alvo sofre metade do dano e nenhum efeito além do dano inicial.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 154,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6098',
  }),
  f({
    id: 'feat-bloodrager-siphon-magic',
    name: 'Sifonar Magia',
    originalName: 'Siphon Magic',
    level: 6,
    archetypeId: 'archetype-bloodrager',
    traits: ['Arquétipo', 'Fúria'],
    prereqId: DED_BLOOD.id,
    prereqName: DED_BLOOD.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Sua última ação foi Colher Sangue de uma criatura que pode conjurar magias',
      },
    ],
    description:
      'Recupera um espaço de magia gasto de posto menor que o maior posto que você pode conjurar. Fica drenado 1 (ou aumenta drenado em 1). Não use em aliados ou oponentes derrotados (nota PFS).',
    actionType: 'one',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7242',
  }),
  f({
    id: 'feat-bloodrager-bespell-strikes',
    name: 'Golpes Enfeitiçados',
    originalName: 'Bespell Strikes',
    level: 8,
    archetypeId: 'archetype-bloodrager',
    prereqId: DED_BLOOD.id,
    prereqName: DED_BLOOD.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de oráculo/feiticeiro/mago' },
      {
        kind: 'text',
        label: 'Sua ação mais recente foi conjurar magia que não é truque',
      },
    ],
    description:
      'Até o fim do turno, uma arma empunhada ou um desarmado causa +1d6 de dano força e ganha o traço da tradição (divino / da linhagem / arcano, conforme a origem do feito; neste arquétipo, use a tradição que você escolheu). Se a magia causou outro tipo de dano, o Golpe usa esse tipo (você escolhe se houver vários).',
    actionType: 'free',
    frequency: '1 vez por turno',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 202,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5028',
  }),
  f({
    id: 'feat-bloodrager-spelldrinker',
    name: 'Bebedor de Magia',
    originalName: 'Spelldrinker',
    level: 8,
    archetypeId: 'archetype-bloodrager',
    prereqId: BLOOD_RISING.id,
    prereqName: BLOOD_RISING.name,
    extraPrereq: [{ kind: 'text', label: 'Sua última ação foi Colher Sangue' }],
    description:
      'Adiciona temporariamente uma magia de 3º posto ao repertório, conforme o traço da criatura cujo sangue você colheu (se houver vários, você escolhe um; o motor não escolhe): aberração — banquete vampírico; animal ou fera — convocar animal (as invocações aparecem como versões de outro mundo da criatura); celestial — luz sagrada; dragão — raio flamejante (o dano segue o sopro do dragão, se houver); fada — muralha de espinhos; carniçal (fiend) — escuridão gélida; gigante — escombros esmagadores; humanóide — crise de fé; monitor — perdição iminente. Se a magia não estiver na sua lista, conjure-a como se fosse da sua tradição. Sai do repertório em 24 horas, na próxima vez que usar Bebedor de Magia, ou nas próximas preparações. Especial: Magia de Sangue Pulsante → 4º posto; Magia de Sangue Exultante → 7º posto.',
    actionType: 'one',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7243',
  }),
  f({
    id: 'feat-bloodrager-hematocritical',
    name: 'Hematocrítico',
    originalName: 'Hematocritical',
    level: 10,
    archetypeId: 'archetype-bloodrager',
    traits: ['Arquétipo', 'Fortuna', 'Fúria'],
    prereqId: DED_BLOOD.id,
    prereqName: DED_BLOOD.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Sua última ação foi um Golpe que acertou criticamente uma criatura não imune a sangramento',
      },
    ],
    description:
      'Se a próxima ação for Conjurar magia com ataque de magia, role duas vezes e use o melhor (fortuna). Se for magia que exige salvaguarda da criatura danificada pelo Golpe disparador, ela rola duas vezes e usa o pior (infortúnio).',
    actionType: 'free',
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7244',
  }),
  f({
    id: 'feat-bloodrager-energy-ward',
    name: 'Proteção de Energia',
    originalName: 'Energy Ward',
    level: 12,
    archetypeId: 'archetype-bloodrager',
    prereqId: DED_BLOOD.id,
    prereqName: DED_BLOOD.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de feiticeiro' },
      {
        kind: 'text',
        label:
          'Sua ação mais recente foi conjurar magia que não é truque e causou dano de energia',
      },
    ],
    description:
      'Até o início do seu próximo turno, resistência a um tipo de energia (ácido, frio, eletricidade, fogo, força, sônico, vitalidade ou vazio) igual a 4 + o posto da magia. Você escolhe o tipo; o motor não escolhe.',
    actionType: 'free',
    frequency: '1 vez por turno',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 154,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6101',
  }),
  f({
    id: BLOOD_SURGING.id,
    name: BLOOD_SURGING.name,
    originalName: 'Surging Blood Magic',
    level: 12,
    archetypeId: 'archetype-bloodrager',
    prereqId: BLOOD_RISING.id,
    prereqName: BLOOD_RISING.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Mestre em Arcana ou Religião, conforme a tradição escolhida',
      },
    ],
    description:
      'Benefícios de conjuração perita. Ao Conjurar magia do repertório com drenado 2+, o dano extra da Fúria nessa magia aumenta em +2 adicionais (total +3 com Magia de Sangue Nascente).',
    effects: [
      { kind: 'spellcastingTier', sourceId: BLOOD_SPELL.id, tier: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Dano de fúria nas magias (drenado 2+)',
        description:
          'Ao Conjurar do repertório com drenado 2+, +2 extras no dano da Fúria da magia (total +3 com Nascente).',
      },
    ],
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7245',
  }),
  f({
    id: 'feat-bloodrager-exultant-blood-magic',
    name: 'Magia de Sangue Exultante',
    originalName: 'Exultant Blood Magic',
    level: 18,
    archetypeId: 'archetype-bloodrager',
    prereqId: BLOOD_SURGING.id,
    prereqName: BLOOD_SURGING.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Lendário em Arcana ou Religião, conforme a tradição escolhida',
      },
    ],
    description:
      'Benefícios de conjuração mestra. +1 espaço por posto dos feitos deste arquétipo. Ao Conjurar magia do repertório com drenado 2+, dobre o dano extra da Fúria dessa magia.',
    effects: [
      { kind: 'spellcastingTier', sourceId: BLOOD_SPELL.id, tier: 'master' },
      { kind: 'spellSlotBreadth', sourceId: BLOOD_SPELL.id },
      {
        kind: 'specialAbility',
        name: 'Dano de fúria dobrado (drenado 2+)',
        description:
          'Ao Conjurar do repertório com drenado 2+, dobre o dano extra da Fúria dessa magia.',
      },
    ],
    sourcePage: 61,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7246',
  }),
]

const vindicatorArchetypeFeats: Feat[] = [
  f({
    id: DED_VIND.id,
    name: DED_VIND.name,
    originalName: 'Vindicator Dedication',
    level: 2,
    archetypeId: 'archetype-vindicator',
    isDedication: true,
    classId: CLASS_RANGER_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_RANGER_ID },
      { kind: 'text', label: 'Gume Vindicação (Vindicator) no 1º nível' },
    ],
    description:
      'Arquétipo de classe (patrulheiro). No 1º: escolha uma divindade (o motor não escolhe) e ganhe a santificação permitida por ela (você aplica; o motor não escolhe). Treinado em Religião no lugar de Natureza. Treinado na arma predileta; se for simples ou desarmado com dado menor que d6, ganha Simplicidade Mortal; se for avançada, a proficiência iguala a das marciais. Deve escolher o gume Vindicação. Magias de guardião são divinas (atributo Sabedoria). Magias de domínio de Iniciado/Avançado contam como magias de guardião. Gume: +1 de status em ataques de magia contra a presa caçada; a presa sofre −1 de status em salvaguardas contra magias divinas que você conjura; magia de guardião marca do vindicador. No 5º, Jornada Sem Rastros: terreno urbano ou natural (você escolhe). No 17º, os bônus/penalidades do gume viram +2/−2. Dedicação: Religião para Coagir, Recolher Informações, Causar Impressão ou Pedir favor em cidade com igreja da sua divindade; +2 de circunstância se o alvo cultua a mesma divindade ou é sua presa caçada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Divindade e santificação',
        description:
          'Você escolhe a divindade e aplica a santificação que ela permite. O motor não escolhe.',
      },
      { kind: 'skillRank', skillId: 'religion', rank: 'trained', replaceIfTrained: true },
      {
        kind: 'specialAbility',
        name: 'Arma predileta',
        description:
          'Treinado na arma predileta. Simplicidade Mortal se simples/desarmado < d6. Avançada: proficiência igual à marcial. Você não escolhe a arma — ela vem da divindade que você escolheu.',
      },
      {
        kind: 'specialAbility',
        name: 'Gume Vindicação',
        description:
          '+1 de status em ataques de magia contra a presa caçada; ela sofre −1 de status em salvaguardas contra suas magias divinas. Magia de guardião marcas do vindicador. No 17º: +2 / −2.',
      },
      {
        kind: 'textChoice',
        choiceId: 'vindicator-trackless-terrain',
        options: [
          { id: 'urban', label: 'Urbano' },
          { id: 'natural', label: 'Natural' },
        ],
        hint: 'Jornada Sem Rastros (5º nível): urbano ou natural. O motor não escolhe.',
        abilityName: 'Jornada Sem Rastros ({choice})',
        abilityDescription:
          'No 5º nível, os benefícios de Jornada Sem Rastros valem neste tipo de terreno.',
      },
      {
        kind: 'specialAbility',
        name: 'Igreja cuida de você',
        description:
          'Religião para Coagir, Recolher Informações, Causar Impressão ou Pedir favor em cidade com igreja da sua divindade. +2 de circunstância se o alvo cultua a mesma divindade ou é sua presa caçada.',
      },
    ],
    sourcePage: 64,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7256',
  }),
  f({
    id: VIND_DOMAIN.id,
    name: VIND_DOMAIN.name,
    originalName: 'Domain Initiate',
    level: 1,
    archetypeId: 'archetype-vindicator',
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de clérigo' }],
    description:
      'Escolha um domínio da lista da sua divindade (o motor não escolhe). Ganha a magia de domínio inicial (foco). Começa com reserva de 1 Ponto de Foco; a reserva cabe 1 ponto por magia de foco, até 3. Recarrega nas preparações; Recentrar 10 minutos (oração ou serviço) recupera 1. Magias de foco se elevam à metade do nível (como truques). Para este arquétipo, magias de domínio são magias de guardião. Especial: repetível; cada vez um domínio diferente.',
    repeatable: true,
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Magia de domínio inicial',
        description:
          'Você escolhe o domínio da sua divindade. A magia inicial é magia de guardião (divina, Sabedoria). O motor não escolhe o domínio.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4644',
  }),
  f({
    id: 'feat-vindicator-instructive-strike',
    name: 'Golpe Instrutivo',
    originalName: 'Instructive Strike',
    level: 4,
    archetypeId: 'archetype-vindicator',
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de taumaturgo' }],
    description:
      'Golpeie. Acerto: teste imediato para Recordar Conhecimento sobre o alvo. Crítico: +2 de circunstância nesse teste.',
    actionType: 'one',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 44,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8364',
  }),
  f({
    id: 'feat-vindicator-ongoing-investigation',
    name: 'Investigação Contínua',
    originalName: 'Ongoing Investigation',
    level: 4,
    archetypeId: 'archetype-vindicator',
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
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
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5949',
  }),
  f({
    id: 'feat-vindicator-interrogate',
    name: 'Interrogar',
    originalName: 'Interrogate',
    level: 6,
    archetypeId: 'archetype-vindicator',
    traits: ['Arquétipo', 'Auditivo', 'Concentrar', 'Linguístico', 'Mental'],
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
    description:
      'Pergunte a uma criatura não aliada que você vê e com quem estava conversando. Intimidação contra a CD de Vontade; +2 de circunstância se for da mesma religião ou morto-vivo/licantropo fingindo ser da sua fé. Depois, imune por 1 hora. Crítico: deve responder diretamente (não precisa ser verdade); +4 de circunstância na sua CD de Percepção se Mentir. Sucesso: igual, mas +2. Falha: pode recusar e fica inamistoso se ainda não era inamistoso ou hostil. Falha crítica: recusa, fica hostil, e você não pode Interrogar o alvo por 24 horas.',
    actionType: 'one',
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7257',
  }),
  f({
    id: 'feat-vindicator-thorough-research',
    name: 'Pesquisa Minuciosa',
    originalName: 'Thorough Research',
    level: 6,
    archetypeId: 'archetype-vindicator',
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de investigador' }],
    description:
      'Sucesso em Recordar Conhecimento: informação ou contexto extra. Crítico: informação/contexto extra ou uma pergunta de seguimento (o mestre escolhe).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Pesquisa minuciosa',
        description:
          'Sucesso em Recordar Conhecimento: contexto extra. Crítico: contexto extra ou pergunta extra (mestre escolhe).',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5954',
  }),
  f({
    id: 'feat-vindicator-advanced-domain',
    name: 'Domínio Avançado',
    originalName: 'Advanced Domain',
    level: 8,
    archetypeId: 'archetype-vindicator',
    prereqId: VIND_DOMAIN.id,
    prereqName: VIND_DOMAIN.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de clérigo' }],
    description:
      'Ganha a magia de domínio avançada de um domínio para o qual já tem a inicial. É magia de guardião. Você escolhe o domínio; o motor não escolhe. Especial: repetível; cada vez uma magia avançada diferente.',
    repeatable: true,
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Magia de domínio avançada',
        description:
          'Você escolhe o domínio (já precisa da inicial). Magia de guardião. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 113,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4666',
  }),
  f({
    id: 'feat-vindicator-silence-the-profane',
    name: 'Silenciar o Profano',
    originalName: 'Silence the Profane (Vindicator)',
    level: 8,
    archetypeId: 'archetype-vindicator',
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
    extraPrereq: [
      { kind: 'text', label: 'Empunhando a arma predileta da sua divindade' },
    ],
    description:
      'Golpeie o conjurador com a arma predileta. Sucesso: desprevenido até o fim do seu próximo turno. A magia é interrompida em crítico, ou em sucesso se o alvo for sua presa caçada e a magia for divina. Especial: se a arma predileta for à distância, o gatilho vale no primeiro incremento e o Golpe pode ser à distância.',
    actionType: 'reaction',
    trigger:
      'Uma criatura que você observa no alcance da arma predileta da sua divindade conjura uma magia.',
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7258',
  }),
  f({
    id: 'feat-vindicator-judgement',
    name: 'Juízo do Vindicador',
    originalName: "Vindicator's Judgement",
    level: 10,
    archetypeId: 'archetype-vindicator',
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
    description:
      'Ganha a magia de foco juízo do vindicador, tornando os alvos magicamente suscetíveis aos seus ataques.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Juízo do vindicador',
        description:
          'Magia de foco que pronuncia juízo, deixando os alvos suscetíveis aos seus ataques.',
      },
    ],
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7259',
  }),
  f({
    id: 'feat-vindicator-call-the-hunt',
    name: 'Convocar a Caçada',
    originalName: 'Call The Hunt',
    level: 12,
    archetypeId: 'archetype-vindicator',
    prereqId: DED_VIND.id,
    prereqName: DED_VIND.name,
    description:
      'Até o início do seu próximo turno, se a presa caçada estiver no seu alcance e no de pelo menos um aliado, ela fica desprevenida contra todos os ataques corpo a corpo. Se você for santificado, os desarmados e Golpes de arma seus e dos aliados ganham os benefícios da sua santificação contra a presa caçada.',
    actionType: 'one',
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7260',
  }),
]

const warriorOfLegendArchetypeFeats: Feat[] = [
  f({
    id: DED_WARRIOR.id,
    name: DED_WARRIOR.name,
    originalName: 'Warrior Of Legend Dedication',
    level: 2,
    archetypeId: 'archetype-warrior-of-legend',
    isDedication: true,
    rarity: 'uncommon',
    classId: CLASS_FIGHTER_ID,
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_FIGHTER_ID },
      { kind: 'text', label: 'Caminho Guerreiro da Lenda (Warrior of Legend) no 1º nível' },
    ],
    description:
      'Arquétipo de classe (guerreiro), incomum. No 1º: não treinado em armadura pesada; perícia/maestria de armadura só melhoram leve, média e sem armadura. Não ganha Bloquear com Escudo. Treinado em Acrobacia e Atletismo. Escolha a fraqueza amaldiçoada (concussão, perfurante ou cortante; o motor não escolhe): fraqueza igual à metade do nível (mín. 1). Ganha Difícil de Matar; fica condenado 2 ao sofrer dano da fraqueza amaldiçoada (salvo se o condenado já for maior). Maestria e lenda de arma sobem lanças e armas de haste; não pode escolher outro grupo nessas características. Dedicação: sem armadura pesada nem escudo, lanças e armas de haste ganham aparar (ou o bônus de aparar vira +2 se já tiverem o traço). Dano extra igual ao valor de condenado com armas dos grupos lança e haste (mesmo tipo da arma).',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'warrior-of-legend-cursed-weakness',
        options: [
          { id: 'bludgeoning', label: 'Concussão' },
          { id: 'piercing', label: 'Perfurante' },
          { id: 'slashing', label: 'Cortante' },
        ],
        hint: 'Fraqueza amaldiçoada. O motor não escolhe.',
        abilityName: 'Fraqueza amaldiçoada: {choice}',
        abilityDescription:
          'Fraqueza a esse tipo igual à metade do nível (mín. 1). Ao sofrer esse dano, condenado 2 (salvo se o condenado já for maior).',
      },
      { kind: 'dyingMax', value: 5 },
      { kind: 'skillRank', skillId: 'acrobatics', rank: 'trained' },
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Bênção e perdição',
        description:
          'Sem armadura pesada nem Bloquear com Escudo. Maestria/lenda de arma: lanças e hastes (não outro grupo). Sem pesada nem escudo: lanças/hastes ganham aparar (ou +2 se já tiverem). Dano extra = valor de condenado com lança ou haste.',
      },
    ],
    sourcePage: 66,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7261',
  }),
  f({
    id: 'feat-warrior-of-legend-heroic-defiance',
    name: 'Desafio Heroico',
    originalName: 'Heroic Defiance',
    level: 4,
    archetypeId: 'archetype-warrior-of-legend',
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    description:
      'Ganha PV temporários iguais ao nível e +1 de status em todas as salvaguardas, ambos por 1 minuto.',
    actionType: 'reaction',
    trigger: 'Você ganha a condição condenado.',
    frequency: '1 vez a cada 10 minutos',
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7262',
  }),
  f({
    id: 'feat-warrior-of-legend-clear-the-way',
    name: 'Abrir Caminho',
    originalName: 'Clear the Way',
    level: 6,
    archetypeId: 'archetype-warrior-of-legend',
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de mauler' },
      { kind: 'text', label: 'Empunhando uma arma corpo a corpo com as duas mãos' },
    ],
    description:
      'Tente Empurrar até cinco criaturas adjacentes (teste separado cada uma; ignora mão livre). Depois Desloque-se até metade do Deslocamento sem disparar reações das que você Empurrar com sucesso. Cada tentativa conta na penalidade, que só sobe depois de todas.',
    actionType: 'two',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 207,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6369',
  }),
  f({
    id: WARRIOR_BOND.id,
    name: WARRIOR_BOND.name,
    originalName: "Hero-God's Bond",
    level: 6,
    archetypeId: 'archetype-warrior-of-legend',
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional (Myth-Speaker / Titanbane)' }],
    description:
      'Escolha um aliado como parceiro vinculado (o motor não escolhe). No mesmo plano, vocês compartilham o mesmo valor de condenado (o maior). Se o condenado do parceiro subir ou for definido, o seu sobe para igualar se estiver menor. Se um estiver morrendo, o outro sabe imediatamente, com distância e direção. Teste de recuperação: −2 na CD se o outro estiver no mesmo plano. Telepatia a 18 m. Troca o parceiro com 1 semana de descanso vinculando-se a outro aliado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Parceiro vinculado',
        description:
          'Você nomeia o aliado. Condenado compartilhado (maior valor), aviso de morrendo, −2 na CD de recuperação no mesmo plano, telepatia 18 m. 1 semana para trocar. O motor não escolhe o aliado.',
      },
    ],
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=286',
  }),
  f({
    id: 'feat-warrior-of-legend-martyrs-parry',
    name: 'Aparar do Mártir',
    originalName: "Martyr's Parry",
    level: 8,
    archetypeId: 'archetype-warrior-of-legend',
    rarity: 'rare',
    prereqId: WARRIOR_BOND.id,
    prereqName: WARRIOR_BOND.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional raro (Myth-Speaker / Titanbane)' },
      {
        kind: 'text',
        label:
          'Empunhando arma com traço aparar; o parceiro vinculado está no alcance de um Golpe corpo a corpo com essa arma',
      },
    ],
    description:
      'O parceiro vinculado ganha +2 de circunstância na CA. Se o ataque ainda acertar, você sofre o dano no lugar dele; o ataque ainda usa as defesas do parceiro para acerto/crítico.',
    actionType: 'reaction',
    trigger: 'Uma criatura ataca o seu parceiro vinculado.',
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=286',
  }),
  f({
    id: 'feat-warrior-of-legend-piercing-doom',
    name: 'Perfurar a Perdição',
    originalName: 'Piercing Doom',
    level: 8,
    archetypeId: 'archetype-warrior-of-legend',
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    extraPrereq: [{ kind: 'text', label: 'Você está condenado 2 ou mais' }],
    description:
      'Golpe corpo a corpo; sucesso: +1d10 de dano vazio e seu condenado cai em 1.',
    actionType: 'two',
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7263',
  }),
  f({
    id: 'feat-warrior-of-legend-griefs-fury',
    name: 'Fúria do Luto',
    originalName: "Grief's Fury",
    level: 10,
    archetypeId: 'archetype-warrior-of-legend',
    prereqId: WARRIOR_BOND.id,
    prereqName: WARRIOR_BOND.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional (Myth-Speaker / Titanbane)' }],
    description:
      'Aumente condenado em 1 (máx. condenado 3). +2 de status em ataques contra qualquer criatura que tenha atacado ou danificado o parceiro no último minuto. Se reduzir a 0 PV uma criatura que atacou ou danificou o parceiro, ganha PV temporários iguais ao dobro do nível dela. Dura até o parceiro deixar de estar inconsciente ou 1 minuto (o que for mais curto).',
    actionType: 'reaction',
    trigger: 'Seu parceiro vinculado fica inconsciente ou é reduzido a 0 PV.',
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=286',
  }),
  f({
    id: WARRIOR_SPEAR.id,
    name: WARRIOR_SPEAR.name,
    originalName: 'Spear of Doom',
    level: 10,
    archetypeId: 'archetype-warrior-of-legend',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Um inimigo acertou você no último round com o tipo da fraqueza amaldiçoada, e você está condenado 1 ou mais',
      },
    ],
    description:
      'Entra na postura lança da perdição. Enquanto o inimigo que disparou a fraqueza estiver no seu alcance, você pode Golpeá-lo como reação quando ele acertar ou acertar criticamente um ataque contra você. Ganha uma reação extra imediatamente e no início de cada turno seguinte, só para Golpe Reativo contra esse oponente ou o Golpe desta postura. Na postura, a fraqueza amaldiçoada é igual ao nível (não à metade).',
    actionType: 'one',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Postura Lança da Perdição',
        actionType: 'one',
        description:
          'Reação para Golpear o inimigo da fraqueza quando ele acerta você. Reação extra (Golpe Reativo ou este Golpe). Fraqueza amaldiçoada = nível.',
      },
    ],
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7264',
  }),
  f({
    id: 'feat-warrior-of-legend-know-thy-doom',
    name: 'Conhece tua Perdição',
    originalName: 'Know thy Doom',
    level: 12,
    archetypeId: 'archetype-warrior-of-legend',
    traits: ['Arquétipo', 'Fortuna'],
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    description:
      'Pode fazer um teste de recuperação usando o valor de morrendo antes de ele aumentar, rolando duas vezes e usando o melhor. Independente do resultado, reduz condenado em 1.',
    actionType: 'reaction',
    trigger: 'Você está condenado 1 ou mais e seu valor de morrendo aumentaria.',
    frequency: '1 vez por dia',
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7265',
  }),
  f({
    id: 'feat-warrior-of-legend-only-my-doom-may-claim-me',
    name: 'Só Minha Perdição Pode Me Levar',
    originalName: 'Only My Doom May Claim Me',
    level: 14,
    archetypeId: 'archetype-warrior-of-legend',
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    description:
      'Resistência igual à metade do nível contra ataques de arma e desarmados que causam um tipo de dano diferente da fraqueza amaldiçoada que você escolheu.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Só minha perdição pode me levar',
        description:
          'Resistência = metade do nível contra arma/desarmado que não seja o tipo da fraqueza amaldiçoada.',
      },
    ],
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7266',
  }),
  f({
    id: 'feat-warrior-of-legend-unbalancing-sweep',
    name: 'Varredura Desequilibrante',
    originalName: 'Unbalancing Sweep',
    level: 14,
    archetypeId: 'archetype-warrior-of-legend',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WARRIOR.id,
    prereqName: DED_WARRIOR.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de bárbaro/mauler' }],
    description:
      'Escolha até três inimigos no alcance e se vai Empurrar ou Derrubar todos. Teste de Atletismo separado contra cada um, mesma ação. Cada tentativa conta na penalidade, que só sobe depois de todas. Você escolhe Empurrar ou Derrubar; o motor não escolhe.',
    actionType: 'three',
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5861',
  }),
  f({
    id: 'feat-warrior-of-legend-razors-edge',
    name: 'Fio da Navalha',
    originalName: "Razor's Edge",
    level: 18,
    archetypeId: 'archetype-warrior-of-legend',
    prereqId: WARRIOR_SPEAR.id,
    prereqName: WARRIOR_SPEAR.name,
    description: 'Pode entrar na postura lança da perdição como ação livre.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fio da navalha',
        actionType: 'free',
        description: 'Entrar em Lança da Perdição como ação livre.',
      },
    ],
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7267',
  }),
]

export const archetypeFeatsGeneralRemaster27: Feat[] = [
  ...avengerArchetypeFeats,
  ...bloodragerArchetypeFeats,
  ...vindicatorArchetypeFeats,
  ...warriorOfLegendArchetypeFeats,
]
