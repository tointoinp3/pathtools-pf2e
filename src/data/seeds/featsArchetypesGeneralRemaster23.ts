/** Gerais Remaster: Cirurgião de Lepidstadt, Acólito Dracônico, Cavaleiro de Drake, Assassino da Louva-a-deus Vermelha, Sábio Celeste Oatia. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  SOURCE_DRACONIC_CODEX_ID,
  SOURCE_GATEWALKERS_HARDCOVER_ID,
  SOURCE_PREY_FOR_DEATH_ID,
  SOURCE_RIVAL_ACADEMIES_ID,
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
    sourceId: opts.sourceId ?? SOURCE_RIVAL_ACADEMIES_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_LEP = {
  id: 'feat-lepidstadt-surgeon-dedication',
  name: 'Dedicação de Cirurgião de Lepidstadt',
}
const DED_DRA = {
  id: 'feat-draconic-acolyte-dedication',
  name: 'Dedicação de Acólito Dracônico',
}
const DED_RIDER = {
  id: 'feat-drake-rider-dedication',
  name: 'Dedicação de Cavaleiro de Drake',
}
const DED_MANTIS = {
  id: 'feat-red-mantis-assassin-dedication',
  name: 'Dedicação de Assassino da Louva-a-deus Vermelha',
}
const DED_OATIA = {
  id: 'feat-oatia-skysage-dedication',
  name: 'Dedicação de Sábio Celeste Oatia',
}

const MANTIS_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-red-mantis-assassin-archetype',
  label: 'Conjuração de Assassino da Louva-a-deus Vermelha',
  style: 'prepared',
  tradition: 'divine',
  attributeId: 'charisma',
  proficiencyRank: 'trained',
  cantripsPerDay: 2,
  classOriginalName: 'Red Mantis Assassin',
}

const OATIA_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-oatia-skysage-archetype',
  label: 'Conjuração de Sábio Celeste Oatia',
  style: 'spontaneous',
  tradition: 'occult',
  attributeId: 'intelligence',
  proficiencyRank: 'trained',
  cantripsPerDay: 2,
  classOriginalName: 'Oatia Skysage',
  features: { repertoire: true },
}

const lepidstadtSurgeonArchetypeFeats: Feat[] = [
  f({
    id: DED_LEP.id,
    name: DED_LEP.name,
    originalName: 'Lepidstadt Surgeon Dedication',
    level: 2,
    archetypeId: 'archetype-lepidstadt-surgeon',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'medicine', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Medicina; frequentou a Universidade de Lepidstadt' },
    ],
    description:
      'Perito em Medicina. Ao aplicar Primeiros Socorros com sucesso para estabilizar uma criatura morrendo que ainda não tem ferido, ela recupera 2d8 PV (mais 10 se você for mestre em Medicina, mais 10 se for lendário). Ao estancar sangramento com Primeiros Socorros, o alvo rola o teste simples duas vezes e fica com o melhor (fortuna).',
    effects: [
      { kind: 'skillRank', skillId: 'medicine', rank: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Cirurgião excepcional',
        description:
          'Estabilizar (sem ferido): 2d8 PV (mestre +10; lendário +10). Estancar sangramento: o alvo rola o teste simples duas vezes e fica com o melhor (fortuna).',
      },
    ],
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7472',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-in-lightning-life',
    name: 'No Relâmpago, Vida',
    originalName: 'In Lightning, Life',
    level: 4,
    archetypeId: 'archetype-lepidstadt-surgeon',
    traits: ['Arquétipo', 'Concentração', 'Eletricidade', 'Cura', 'Manipular'],
    prereqId: DED_LEP.id,
    prereqName: DED_LEP.name,
    description:
      'Bobina Stasiana miniatura no kit de curandeiro. Aliado disposto ou inconsciente no seu alcance ganha 2d4 PV temporários (1 minuto). +1d4 no 8º nível e a cada 4 níveis. Imune se tiver resistência ou imunidade a eletricidade. Quem recebeu esses PV temporários fica imune a esta habilidade por 24 horas.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'No Relâmpago, Vida',
        actionType: 'one',
        description:
          '2d4 PV temporários (1 min); +1d4 no 8º e a cada 4 níveis. Resistência/imunidade a eletricidade: imune. Quem recebeu: imune 24 h.',
      },
    ],
    actionType: 'one',
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7473',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-rise-my-creature',
    name: 'Erga-se, Minha Criatura!',
    originalName: 'Rise, My Creature!',
    level: 4,
    archetypeId: 'archetype-lepidstadt-surgeon',
    prereqId: DED_LEP.id,
    prereqName: DED_LEP.name,
    description:
      'Companheiro construto protótipo (cadáveres + químicos ou tecnologia Stasiana). Use Medicina no lugar de Ofício para Reparar ou reconstruir se destruído. Quando o construto toma dano de eletricidade, +1 de circunstância em Atletismo até o fim do próximo turno dele. Para você e quem tem treino semelhante, é óbvio que não é morto-vivo; os demais precisam de CD 15 em Ofício, Medicina ou Religião para Recordar Conhecimento e confirmar. Adicione o companheiro em Companheiros; nomeie-o — o motor não escolhe o nome.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro construto protótipo',
        description:
          'Adicione o construto em Companheiros. Medicina no lugar de Ofício para Reparar/reconstruir. Dano de eletricidade no construto: +1 de circunstância em Atletismo até o fim do próximo turno dele. CD 15 Ofício/Medicina/Religião para outros confirmarem que não é morto-vivo.',
      },
    ],
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7474',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-artery-map',
    name: 'Mapa de Artérias',
    originalName: 'Artery Map',
    level: 6,
    archetypeId: 'archetype-lepidstadt-surgeon',
    prereqId: DED_LEP.id,
    prereqName: DED_LEP.name,
    description:
      'Golpe em criatura desprevenida com arma do grupo faca: 1d6 de sangramento persistente (1d10 se você for lendário em Medicina).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mapa de artérias',
        description:
          'Golpe com faca em desprevenido: 1d6 sangramento persistente (1d10 se lendário em Medicina).',
      },
    ],
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7475',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-let-my-creature-live',
    name: 'Que Minha Criatura Viva!',
    originalName: 'Let my Creature Live!',
    level: 6,
    archetypeId: 'archetype-lepidstadt-surgeon',
    prereqId: 'feat-lepidstadt-surgeon-rise-my-creature',
    prereqName: 'Erga-se, Minha Criatura!',
    description:
      'O construto vira companheiro construto avançado. No encontro, mesmo sem Comandar um Lacaio, ele pode usar 1 ação no seu turno para Avançar ou Golpear.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Construto avançado',
        description:
          'Avance o estágio para avançado na ficha. Independência: 1 ação para Avançar ou Golpear sem Comandar.',
      },
    ],
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7476',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-no-no-i-created-you',
    name: 'Não! Não! Eu o Criei!',
    originalName: 'No! No! I Created You!',
    level: 6,
    archetypeId: 'archetype-lepidstadt-surgeon',
    traits: ['Arquétipo', 'Auditivo', 'Concentração'],
    prereqId: 'feat-lepidstadt-surgeon-rise-my-creature',
    prereqName: 'Erga-se, Minha Criatura!',
    extraPrereq: [{ kind: 'text', label: 'Companheiro construto; feito adicional de inventor (nível 6 neste arquétipo)' }],
    description:
      'Apela ao vínculo do construto com o criador. Tente contrapor o efeito que o deixou confuso ou controlado: modificador de Ofício no teste e metade do seu nível (arredondado para cima) no posto de contramágica.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Não! Não! Eu o Criei!',
        actionType: 'reaction',
        description:
          '1/minuto. Contrapor confuso/controlado no construto: Ofício; posto = metade do nível (para cima).',
      },
    ],
    actionType: 'reaction',
    trigger: 'Seu companheiro construto ficaria confuso ou controlado.',
    frequency: '1/minuto',
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3047',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-beautiful-knifework',
    name: 'Belíssima Lâmina',
    originalName: 'Beautiful Knifework',
    level: 7,
    archetypeId: 'archetype-lepidstadt-surgeon',
    traits: ['Arquétipo', 'Exploração', 'Manipular', 'Perícia'],
    prereqId: DED_LEP.id,
    prereqName: DED_LEP.name,
    description:
      'Cirurgia de 10 minutos para disfarçar aliado disposto ou seu construto (Personificar; kit de curandeiro no lugar de disfarce). CD para Perceber a farsa: sua CD de Medicina, salvo se a CD de Enganação do disfarçado for maior. Se o alvo interagir diretamente, +2 de circunstância em Enganação. Reverta com outra cirurgia de 10 minutos. O disfarçado pode encerrar como ação livre ao receber qualquer cura.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Belíssima lâmina',
        description:
          '10 min, kit de curandeiro. CD = Medicina (ou Enganação do alvo, se maior). Interação direta: +2 de circunstância em Enganação. Reverter: 10 min. Encerrar: ação livre ao ser curado.',
      },
    ],
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7477',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-behold-my-creation',
    name: 'Contemplem Minha Criação!',
    originalName: 'Behold My Creation!',
    level: 8,
    archetypeId: 'archetype-lepidstadt-surgeon',
    prereqId: 'feat-lepidstadt-surgeon-let-my-creature-live',
    prereqName: 'Que Minha Criatura Viva!',
    description: 'O construto vira companheiro construto incrível.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Construto incrível',
        description: 'Avance o estágio para incrível na ficha.',
      },
    ],
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7478',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-stasian-charge',
    name: 'Carga Stasiana',
    originalName: 'Stasian Charge',
    level: 8,
    archetypeId: 'archetype-lepidstadt-surgeon',
    prereqId: 'feat-lepidstadt-surgeon-in-lightning-life',
    prereqName: 'No Relâmpago, Vida',
    description:
      'Quem ganha PV temporários de No Relâmpago, Vida fica acelerado até o fim do próximo turno. A ação extra só serve para Avançar e Golpear.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Carga Stasiana',
        description:
          'PV temporários de No Relâmpago, Vida: acelerado até o fim do próximo turno (só Avançar e Golpear).',
      },
    ],
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7479',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-stand-back-im-a-doctor',
    name: 'Afastem-se, Sou Médico!',
    originalName: "Stand Back, I'm a Doctor!",
    level: 12,
    archetypeId: 'archetype-lepidstadt-surgeon',
    prereqId: DED_LEP.id,
    prereqName: DED_LEP.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'medicine', rank: 'master' },
      {
        kind: 'text',
        label:
          'Mestre em Medicina; empunhando kit de curandeiro (ou vestindo-o com uma mão livre); criatura morrendo no alcance',
      },
    ],
    description:
      'Teste de Medicina na criatura morrendo (CD típica padrão do nível do alvo) e choque potente. Sucesso: morrendo −1 (−2 no crítico); se cair a 0, recupera 2d8+10 PV, ferido não sobe e pode Levantar-se como ação livre. Cada criatura adjacente ao alvo (exceto você) toma 8d6 de eletricidade (Reflexos básico vs CD de classe ou de magia); em vez de salvar, pode Dar um Passo como ação livre e, se terminar não adjacente, não toma dano.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Afastem-se, sou médico!',
        actionType: 'two',
        description:
          'Medicina vs CD do nível do alvo. Sucesso: morrendo −1 (−2 crítico); a 0: 2d8+10 PV, sem ferido, Levantar-se livre. Adjacentes (exceto você): 8d6 eletricidade (Reflexos básico) ou Passo livre para sair.',
      },
    ],
    actionType: 'two',
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7480',
  }),
  f({
    id: 'feat-lepidstadt-surgeon-a-miracle-of-science',
    name: 'Um Milagre da Ciência!',
    originalName: 'A Miracle of Science!',
    level: 14,
    archetypeId: 'archetype-lepidstadt-surgeon',
    prereqId: 'feat-lepidstadt-surgeon-behold-my-creation',
    prereqName: 'Contemplem Minha Criação!',
    description: 'O construto vira companheiro construto paragão.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Construto paragão',
        description: 'Avance o estágio para paragão na ficha.',
      },
    ],
    sourcePage: 95,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7481',
  }),
]

const draconicAcolyteArchetypeFeats: Feat[] = [
  f({
    id: DED_DRA.id,
    name: DED_DRA.name,
    originalName: 'Draconic Acolyte Dedication',
    level: 2,
    archetypeId: 'archetype-draconic-acolyte',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'arcana', rank: 'trained' },
      {
        kind: 'text',
        label: 'Treinado em Arcana; treinado em Natureza, Ocultismo ou Religião',
      },
    ],
    description:
      'Escolha um benfeitor dracônico cuja tradição bata com a perícia treinada que usou para se qualificar (arcana = Arcana, primordial = Natureza, oculta = Ocultismo, divina = Religião). Não muda depois. Conhecimento Adicional de Dragão (sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à sua escolha — nomeie na ficha). Presente dracônico: item mágico do tamanho da palma, Bulk desprezível, nível igual ao seu, traço da tradição; escolha a aparência. Se perder o item, ele volta no início do seu próximo turno. Canalizar Essência Dracônica (1 ação, concentração) e Salvação Dracônica (reação, concentração, fortuna). Ações deste arquétipo ganham o traço da tradição do benfeitor. Você escolhe tradição, perícia e o tipo de dragão; o motor não escolhe.',
    effects: [
      { kind: 'lore', loreName: 'Dragão', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Dragão)',
        description:
          'Sobe sozinho nos níveis 3, 7 e 15. Se já era treinado em Conhecimento de Dragão, também outro Conhecimento à sua escolha (nomeie; o motor não escolhe).',
      },
      {
        kind: 'skillRankChoice',
        choiceId: 'draconic-acolyte-skill',
        rank: 'trained',
        skillOptions: ['nature', 'occultism', 'religion'],
        requireRank: 'trained',
        hint: 'Natureza, Ocultismo ou Religião já treinada (qualifica o benfeitor). O motor não escolhe.',
      },
      {
        kind: 'textChoice',
        choiceId: 'draconic-acolyte-tradition',
        options: [
          { id: 'arcane', label: 'Arcana (Arcana)' },
          { id: 'primal', label: 'Primordial (Natureza)' },
          { id: 'occult', label: 'Oculta (Ocultismo)' },
          { id: 'divine', label: 'Divina (Religião)' },
        ],
        hint: 'Tradição do benfeitor. Deve bater com a perícia usada. O motor não escolhe.',
        abilityName: 'Tradição do benfeitor: {choice}',
        abilityDescription:
          'Nomeie o tipo de dragão na ficha (não muda). Ações deste arquétipo ganham esse traço de tradição.',
      },
      {
        kind: 'specialAbility',
        name: 'Presente dracônico',
        description:
          'Item da palma, Bulk desprezível, nível = o seu, traço da tradição. Se perder, volta no início do seu próximo turno. Nomeie a aparência.',
      },
      {
        kind: 'specialAbility',
        name: 'Canalizar Essência Dracônica',
        actionType: 'one',
        description:
          'Concentração. Não pode já estar canalizando; empunhar ou vestir o presente. Dragão espectral Médio a 9 m (não é alvo; sem PV/salvaguardas/perícias; ocupa o mesmo espaço). No seu espaço: +1 de status em salvaguardas contra sono e paralisia. Dura até canalizar de novo, Dispensar, fim do encontro, inconsciente, ou o dragão a mais de 36 m.',
      },
      {
        kind: 'specialAbility',
        name: 'Salvação Dracônica',
        actionType: 'reaction',
        description:
          'Concentração, fortuna. Gatilho: falha crítica em salvaguarda com o traço da tradição do benfeitor. Requisito: dragão espectral no seu espaço. Melhora o resultado em um grau; Canalizar Essência Dracônica acaba.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8090',
  }),
  f({
    id: 'feat-draconic-acolyte-draconic-fury',
    name: 'Fúria Dracônica',
    originalName: 'Draconic Fury',
    level: 4,
    archetypeId: 'archetype-draconic-acolyte',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando ou vestindo o presente dracônico' }],
    description:
      'Garras espectrais: criaturas num cone de 4,5 m tomam 2d6 de corte (Reflexos básico vs a maior entre CD de classe e CD de magia). Falha crítica: 1d4 de sangramento persistente. Se estiver Canalizando Essência Dracônica, o espaço do dragão espectral pode ser a origem. No 8º nível e a cada 4 níveis: +1d6 no dano inicial e +1d4 no sangramento da falha crítica.',
    actionType: 'two',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8091',
  }),
  f({
    id: 'feat-draconic-acolyte-draconic-resilience',
    name: 'Resiliência Dracônica',
    originalName: 'Draconic Resilience',
    level: 4,
    archetypeId: 'archetype-draconic-acolyte',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando ou vestindo o presente dracônico' }],
    description:
      'Até o início do seu próximo turno: +1 de status na CA e resistência a concussão igual à metade do nível. Se estiver Canalizando Essência Dracônica, pode conceder isso a uma criatura disposta no espaço do dragão espectral, em vez de a você.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resiliência Dracônica',
        actionType: 'one',
        description:
          '+1 de status na CA e resistência a concussão = metade do nível até o início do próximo turno. Com essência: pode dar a um disposto no espaço do dragão.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8092',
  }),
  f({
    id: 'feat-draconic-acolyte-draconic-familiar',
    name: 'Familiar Dracônico',
    originalName: 'Draconic Familiar',
    level: 6,
    archetypeId: 'archetype-draconic-acolyte',
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    description:
      'Ganha um familiar. Quatro habilidades de familiar ou mestre por dia (em vez de duas); uma delas deve ser sempre a habilidade de familiar dragão. Ao Canalizar Essência Dracônica, também Comande o familiar como ação livre. Adicione o familiar em Companheiros.',
    effects: [
      { kind: 'familiarAbilitySlots', extra: 2 },
      {
        kind: 'specialAbility',
        name: 'Familiar dracônico',
        description:
          'Adicione o familiar em Companheiros. Uma das quatro habilidades do dia deve ser familiar dragão. Canalizar Essência: Comandar o familiar como ação livre.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8093',
  }),
  f({
    id: 'feat-draconic-acolyte-essence-overflow',
    name: 'Transbordamento de Essência',
    originalName: 'Essence Overflow',
    level: 6,
    archetypeId: 'archetype-draconic-acolyte',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    extraPrereq: [{ kind: 'text', label: 'Você está Canalizando Essência Dracônica' }],
    description:
      'Canalizar Essência Dracônica acaba. Criaturas (exceto você) numa emanação de 3 m do dragão espectral tomam 6d6 de dano (Reflexos básico vs a maior entre CD de classe e CD de magia). O tipo de dano é o do sopro do benfeitor (você não escolhe outro tipo). Depois não pode usar de novo por 1d4 rodadas. No 8º nível e a cada 2 níveis: +1d6.',
    actionType: 'two',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8094',
  }),
  f({
    id: 'feat-draconic-acolyte-benefactors-wings',
    name: 'Asas do Benfeitor',
    originalName: "Benefactor's Wings",
    level: 8,
    archetypeId: 'archetype-draconic-acolyte',
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando ou vestindo o presente dracônico' }],
    description:
      'Voe. Se não tiver Deslocamento de voo, ganha 6 m só neste movimento. Se o dragão espectral compartilha seu espaço, o voo é 9 m e o dragão se move com você. Se não estiver em chão sólido no fim, você cai.',
    actionType: 'one',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8095',
  }),
  f({
    id: 'feat-draconic-acolyte-reactive-resilience',
    name: 'Resiliência Reativa',
    originalName: 'Reactive Resilience',
    level: 8,
    archetypeId: 'archetype-draconic-acolyte',
    prereqId: 'feat-draconic-acolyte-draconic-resilience',
    prereqName: 'Resiliência Dracônica',
    extraPrereq: [{ kind: 'text', label: 'Você está Canalizando Essência Dracônica' }],
    description:
      'Resistência ao dano do gatilho igual ao seu nível. Canalizar Essência Dracônica acaba.',
    actionType: 'reaction',
    trigger: 'Você toma dano.',
    frequency: '1/dia',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8096',
  }),
  f({
    id: 'feat-draconic-acolyte-deepening-devotion',
    name: 'Devoção Aprofundada',
    originalName: 'Deepening Devotion',
    level: 10,
    archetypeId: 'archetype-draconic-acolyte',
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    description:
      'Com o dragão espectral no seu espaço, o bônus de status em salvaguardas contra sono e paralisia sobe para +2. Salvação Dracônica também vale se você teve sucesso ou falha (não só falha crítica).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Devoção aprofundada',
        description:
          'Dragão no seu espaço: +2 de status contra sono e paralisia. Salvação Dracônica: sucesso, falha ou falha crítica.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8097',
  }),
  f({
    id: 'feat-draconic-acolyte-reflexive-devotion',
    name: 'Devoção Reflexiva',
    originalName: 'Reflexive Devotion',
    level: 10,
    archetypeId: 'archetype-draconic-acolyte',
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    description: 'Você Canaliza Essência Dracônica.',
    actionType: 'free',
    trigger: 'Você rola iniciativa.',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8098',
  }),
  f({
    id: 'feat-draconic-acolyte-frightening-power',
    name: 'Poder Aterrador',
    originalName: 'Frightening Power',
    level: 12,
    archetypeId: 'archetype-draconic-acolyte',
    traits: ['Arquétipo', 'Aura', 'Emoção', 'Medo', 'Mental'],
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    description:
      'Cada inimigo numa emanação de 6 m faz Vontade vs a maior entre CD de classe e CD de magia. Se estiver Canalizando Essência Dracônica, o dragão espectral pode ser a origem. Quem tentar a salvaguarda fica imune ao seu Poder Aterrador por 24 horas. Crítico: nada. Sucesso: amedrontado 1. Falha: amedrontado 2. Falha crítica: amedrontado 4.',
    actionType: 'one',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8099',
  }),
  f({
    id: 'feat-draconic-acolyte-call-draconic-ally',
    name: 'Chamar Aliado Dracônico',
    originalName: 'Call Draconic Ally',
    level: 14,
    archetypeId: 'archetype-draconic-acolyte',
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    extraPrereq: [{ kind: 'text', label: 'Você está Canalizando Essência Dracônica' }],
    description:
      '1/dia, enquanto Canaliza Essência Dracônica, conjure invocar dragão como magia inata na tradição do benfeitor, elevada à metade do seu nível (arredondado para cima). A tradição é a que você já escolheu na Dedicação; o motor não escolhe o dragão invocado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Chamar aliado dracônico',
        description:
          '1/dia, canalizando essência: invocar dragão inato na tradição do benfeitor, elevado à metade do nível (para cima). Você escolhe o dragão da magia; o motor não escolhe.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8100',
  }),
  f({
    id: 'feat-draconic-acolyte-hidden-hoard',
    name: 'Tesouro Oculto',
    originalName: 'Hidden Hoard',
    level: 16,
    archetypeId: 'archetype-draconic-acolyte',
    prereqId: DED_DRA.id,
    prereqName: DED_DRA.name,
    description:
      'Espaço extradimensional de até 100 Bulk (como bolsa espaçosa, mas sem Bulk). Interaja com uma mão tocando o presente dracônico. Itens que caberiam na boca de uma bolsa entram normalmente. Item desatendido maior (até 10 Bulk): 1 minuto concentrado pressionando o presente; recuperar leva 1 minuto e o item surge no espaço desocupado mais próximo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tesouro oculto',
        description:
          'Até 100 Bulk, sem Bulk próprio. Uma mão no presente. Item até 10 Bulk: 1 min para guardar ou recuperar.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 219,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8101',
  }),
]

const drakeRiderArchetypeFeats: Feat[] = [
  f({
    id: DED_RIDER.id,
    name: DED_RIDER.name,
    originalName: 'Drake Rider Dedication',
    level: 2,
    archetypeId: 'archetype-drake-rider',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained' },
      { kind: 'attribute', attributeId: 'charisma', min: 1 },
      { kind: 'text', label: 'Treinado em Natureza; Carisma +1' },
    ],
    description:
      'Companheiro animal jovem: drake de montaria, dragonete de montaria ou outro companheiro com traço dragão a que tenha acesso. Comandos telepáticos a 30 m (ainda precisa Comandar um Animal, sem palavras nem gestos). Você escolhe o tipo e nomeia o drake; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'drake-rider-companion-type',
        options: [
          { id: 'riding-drake', label: 'Drake de montaria (jovem)' },
          { id: 'riding-dragonet', label: 'Dragonete de montaria (jovem)' },
          { id: 'other-dragon', label: 'Outro companheiro com traço dragão (nomeie)' },
        ],
        hint: 'Tipo do companheiro dragão. O motor não escolhe.',
        abilityName: 'Companheiro: {choice}',
        abilityDescription:
          'Adicione o companheiro jovem em Companheiros. Nomeie o drake. Comandos telepáticos a 30 m (ainda gasta Comandar um Animal).',
      },
      {
        kind: 'specialAbility',
        name: 'Vínculo telepático',
        description:
          'Comande o dragão a 30 m sem palavras nem gestos. Nomeie o drake na ficha.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8102',
  }),
  f({
    id: 'feat-drake-rider-mature-dragon-companion',
    name: 'Companheiro Dragão Maduro',
    originalName: 'Mature Dragon Companion',
    level: 4,
    archetypeId: 'archetype-drake-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'O dragão da Dedicação fica maduro. No encontro, mesmo sem Comandar um Animal, pode usar 1 ação no seu turno para Avançar ou Golpear (em qualquer momento em que você não esteja no meio de uma ação). Se o fizer, é tudo na rodada — você não pode Comandá-lo depois.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Dragão maduro',
        description:
          'Avance o estágio para maduro na ficha. Independência: 1 ação para Avançar ou Golpear sem Comandar.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8103',
  }),
  f({
    id: 'feat-drake-rider-winged-leap',
    name: 'Salto Alado',
    originalName: 'Winged Leap',
    level: 4,
    archetypeId: 'archetype-drake-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    extraPrereq: [{ kind: 'text', label: 'Companheiro dragão com a habilidade montaria' }],
    description:
      'O dragão ganha Salto Alado (1 ação, 1/rodada): Voa. Se não tiver Deslocamento de voo, ganha 7,5 m só neste movimento. Se não estiver em chão sólido no fim, cai.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Salto Alado',
        actionType: 'one',
        description:
          'O dragão Voa (1/rodada). Sem voo: 7,5 m só neste movimento. Sem chão sólido no fim: cai.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8104',
  }),
  f({
    id: 'feat-drake-rider-flair-rider-stance',
    name: 'Postura do Cavaleiro Acrobático',
    originalName: 'Flair Rider Stance',
    level: 6,
    archetypeId: 'archetype-drake-rider',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    description:
      'Montado nesta postura: a montaria sempre lhe dá cobertura menor e você não sofre a penalidade de −2 de circunstância em Reflexos por estar montado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Postura do Cavaleiro Acrobático',
        actionType: 'one',
        description:
          'Montado: cobertura menor da montaria; sem −2 de circunstância em Reflexos por montaria.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8105',
  }),
  f({
    id: 'feat-drake-rider-war-rider-stance',
    name: 'Postura do Cavaleiro de Guerra',
    originalName: 'War Rider Stance',
    level: 6,
    archetypeId: 'archetype-drake-rider',
    traits: ['Arquétipo', 'Aura', 'Postura'],
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    extraPrereq: [
      { kind: 'text', label: 'Perito em armas marciais; companheiro dragão com benefício de apoio que inclui dano' },
    ],
    description:
      'Nesta postura, o dragão tem aura em emanação de 1,5 m. Quem começa o turno na aura toma o dano do benefício de apoio do dragão (Reflexos básico vs CD de Atletismo da montaria).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Postura do Cavaleiro de Guerra',
        actionType: 'one',
        description:
          'Aura 1,5 m: dano do apoio do dragão (Reflexos básico vs CD de Atletismo da montaria) ao começar o turno na aura.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8106',
  }),
  f({
    id: 'feat-drake-rider-incredible-dragon-companion',
    name: 'Companheiro Dragão Incrível',
    originalName: 'Incredible Dragon Companion',
    level: 8,
    archetypeId: 'archetype-drake-rider',
    prereqId: 'feat-drake-rider-mature-dragon-companion',
    prereqName: 'Companheiro Dragão Maduro',
    description:
      'O dragão maduro vira companheiro ágil ou selvagem (capacidades extras do tipo). Você escolhe ágil ou selvagem; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'drake-rider-incredible-type',
        options: [
          { id: 'nimble', label: 'Ágil' },
          { id: 'savage', label: 'Selvagem' },
        ],
        hint: 'Ágil ou selvagem. O motor não escolhe.',
        abilityName: 'Companheiro incrível: {choice}',
        abilityDescription: 'Avance o estágio para incrível (ágil ou selvagem) na ficha.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8107',
  }),
  f({
    id: 'feat-drake-rider-wing-rider',
    name: 'Cavaleiro Alado',
    originalName: 'Wing Rider',
    level: 10,
    archetypeId: 'archetype-drake-rider',
    prereqId: DED_RIDER.id,
    prereqName: DED_RIDER.name,
    extraPrereq: [{ kind: 'text', label: 'Companheiro dragão' }],
    description: 'O companheiro dragão tem Deslocamento de voo de 7,5 m o tempo todo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo permanente do dragão',
        description: 'O companheiro dragão tem Deslocamento de voo 7,5 m o tempo todo. Anote na ficha do companheiro.',
      },
    ],
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8108',
  }),
  f({
    id: 'feat-drake-rider-death-dive',
    name: 'Mergulho da Morte',
    originalName: 'Death Dive',
    level: 12,
    archetypeId: 'archetype-drake-rider',
    prereqId: 'feat-drake-rider-flair-rider-stance',
    prereqName: 'Postura do Cavaleiro Acrobático',
    extraPrereq: [
      { kind: 'feat', featId: 'feat-drake-rider-wing-rider', featName: 'Cavaleiro Alado' },
      { kind: 'text', label: 'Montado no dragão e no ar' },
    ],
    description:
      'Comande a montaria a Voar duas vezes, terminando mais baixo do que começou o turno. Você e a montaria: +4 de circunstância na CA contra reações disparadas por este movimento. No fim, a montaria faz um Golpe corpo a corpo contra uma criatura no alcance. Acerto: alvo cai prone se for menor que a montaria; crítico: prone se for do mesmo tamanho ou menor.',
    actionType: 'three',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 220,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8109',
  }),
  f({
    id: 'feat-drake-rider-strafing-breath',
    name: 'Sopro em Rajada',
    originalName: 'Strafing Breath',
    level: 12,
    archetypeId: 'archetype-drake-rider',
    prereqId: 'feat-drake-rider-war-rider-stance',
    prereqName: 'Postura do Cavaleiro de Guerra',
    extraPrereq: [{ kind: 'text', label: 'Postura do Cavaleiro de Guerra ativa' }],
    description:
      'A montaria Avança três vezes (pode trocar qualquer Avanço por Voar se tiver voo). Durante o movimento, a aura da Postura do Cavaleiro de Guerra vira emanação de 3 m; quem estiver nela em qualquer ponto toma o dano (com a salvaguarda normal), no máximo uma vez.',
    actionType: 'three',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8110',
  }),
  f({
    id: 'feat-drake-rider-guided-hover',
    name: 'Pairar Guiado',
    originalName: 'Guided Hover',
    level: 14,
    archetypeId: 'archetype-drake-rider',
    prereqId: 'feat-drake-rider-wing-rider',
    prereqName: 'Cavaleiro Alado',
    extraPrereq: [
      { kind: 'text', label: 'Montaria dragão no ar e ela não usou Voar neste turno' },
    ],
    description: 'A montaria paira sem gastar Voar para permanecer no lugar.',
    actionType: 'reaction',
    trigger: 'Seu turno acaba.',
    sourceId: SOURCE_DRACONIC_CODEX_ID,
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8111',
  }),
]

const redMantisAssassinArchetypeFeats: Feat[] = [
  f({
    id: DED_MANTIS.id,
    name: DED_MANTIS.name,
    originalName: 'Red Mantis Assassin Dedication',
    level: 2,
    archetypeId: 'archetype-red-mantis-assassin',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Treinado em sabres dente-de-serra; devoto de Achaekek; membro dos assassinos da Louva-a-deus Vermelha; acesso: Ilha de Mediogalti',
      },
    ],
    description:
      'Treinado em Furtividade e Conhecimento de Assassino (perito se já for treinado). Quando sua proficiência em qualquer arma sobe para perito ou além, você também ganha esse posto com sabres dente-de-serra. Fica vinculado aos anátemas de Achaekek e pode receber a santificação dele. Você escolhe a santificação; o motor não escolhe.',
    effects: [
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained', bumpIfAlready: true },
      { kind: 'lore', loreName: 'Assassino', rank: 'trained', bumpIfAlready: true },
      {
        kind: 'weaponFamiliarity',
        weapons: ['Sawtooth Saber'],
        martialAsSimple: false,
      },
      {
        kind: 'specialAbility',
        name: 'Proficiência em sabre dente-de-serra',
        description:
          'Quando a proficiência em qualquer arma sobe para perito ou além, você também ganha esse posto com sabres dente-de-serra.',
      },
      {
        kind: 'specialAbility',
        name: 'Anátema de Achaekek',
        description: 'Você fica vinculado aos anátemas de Achaekek.',
      },
      {
        kind: 'textChoice',
        choiceId: 'red-mantis-sanctification',
        options: [
          { id: 'holy', label: 'Santificado sagrado' },
          { id: 'unholy', label: 'Santificado profano' },
          { id: 'none', label: 'Sem santificação' },
        ],
        hint: 'Santificação de Achaekek. O motor não escolhe.',
        abilityName: 'Santificação: {choice}',
        abilityDescription: 'Pode receber a santificação de Achaekek.',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6519',
  }),
  f({
    id: 'feat-red-mantis-assassin-twin-feint',
    name: 'Finta Gêmea',
    originalName: 'Twin Feint',
    level: 2,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de ladino; duas armas corpo a corpo, uma em cada mão' },
    ],
    description:
      'Um Golpe com cada arma corpo a corpo, ambos no mesmo alvo. O alvo fica automaticamente desprevenido contra o segundo ataque. Aplique a penalidade de ataque múltiplo normalmente.',
    actionType: 'two',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4921',
  }),
  f({
    id: 'feat-red-mantis-assassin-basic-red-mantis-magic',
    name: 'Magia Básica da Louva-a-deus Vermelha',
    originalName: 'Basic Red Mantis Magic',
    level: 4,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    description:
      'Conjurar uma Magia. Prepare dois truques comuns divinos por dia (ou outros divinos a que tenha acesso). Benefícios de conjuração básica. Treinado em ataque e CD de magia. Atributo-chave: Carisma; magias divinas deste arquétipo. Se ganhar reserva de foco de feitos deste arquétipo, Refoco: orar a Achaekek ou pesquisar o alvo da morte. Acesso à escola de magia da Louva-a-deus Vermelha (currículo além da lista divina; ao preparar, ficam divinas, como as magias de foco). Você escolhe os truques e as magias preparadas; o motor não escolhe.',
    effects: [
      { kind: 'spellcasting', access: MANTIS_SPELL },
      { kind: 'spellcastingTier', sourceId: MANTIS_SPELL.id, tier: 'basic' },
      {
        kind: 'specialAbility',
        name: 'Escola da Louva-a-deus Vermelha',
        description:
          'Pode preparar magias do currículo da escola (ficam divinas). Truques: você escolhe dois por dia. Refoco: orar a Achaekek ou pesquisar o alvo.',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6520',
  }),
  f({
    id: 'feat-red-mantis-assassin-quick-draw',
    name: 'Saque Rápido',
    originalName: 'Quick Draw',
    level: 4,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino/patrulheiro' }],
    description: 'Interaja para sacar uma arma e então Golpeie com ela.',
    actionType: 'one',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=271',
  }),
  f({
    id: 'feat-red-mantis-assassin-underhanded-assault',
    name: 'Assalto Traiçoeiro',
    originalName: 'Underhanded Assault',
    level: 4,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description:
      'Deslize até um inimigo adjacente a um aliado. Pode testar Furtividade contra esse inimigo mesmo se ele o observa, como se você estivesse oculto (−2 no teste). Sucesso: Golpe corpo a corpo contra ele no fim do Deslize.',
    actionType: 'two',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=271',
  }),
  f({
    id: 'feat-red-mantis-assassin-crimson-shroud',
    name: 'Manto Carmesim',
    originalName: 'Crimson Shroud',
    level: 6,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    description:
      'Véu de névoa vermelha por 1 minuto: cura acelerada igual à metade do nível. Interaja com o manto: +1 de circunstância na CA até o início do seu próximo turno. Se morrer com o manto ativo, pode fazer o corpo sumir em névoa (só o equipamento fica); escolha isso ao ativar. No 10º nível, 1/hora em vez de 1/dia.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Manto Carmesim',
        actionType: 'one',
        description:
          '1 min: cura acelerada = metade do nível. Interagir: +1 de circunstância na CA até o início do próximo turno. Ao morrer: corpo pode sumir (escolha na ativação). 10º+: 1/hora.',
      },
    ],
    actionType: 'one',
    frequency: '1/dia',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6521',
  }),
  f({
    id: 'feat-red-mantis-assassin-poison-weapon',
    name: 'Envenenar Arma',
    originalName: 'Poison Weapon',
    level: 6,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino; arma requerida' }],
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
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=271',
  }),
  f({
    id: 'feat-red-mantis-assassin-red-mantis-school-spell',
    name: 'Magia Escolar da Louva-a-deus Vermelha',
    originalName: 'Red Mantis School Spell',
    level: 6,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: 'feat-red-mantis-assassin-basic-red-mantis-magic',
    prereqName: 'Magia Básica da Louva-a-deus Vermelha',
    description:
      'Ganha a magia inicial da escola (terror debilitante). Reserva de foco 1 se ainda não tiver.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Terror debilitante',
        description: 'Magia de foco inicial da escola da Louva-a-deus Vermelha (divina).',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6522',
  }),
  f({
    id: 'feat-red-mantis-assassin-twin-distraction',
    name: 'Distração Gêmea',
    originalName: 'Twin Distraction',
    level: 6,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: 'feat-red-mantis-assassin-twin-feint',
    prereqName: 'Finta Gêmea',
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de ladino; duas armas corpo a corpo, uma em cada mão' },
    ],
    description:
      'Na Finta Gêmea, se os dois Golpes causarem dano, o alvo faz Vontade vs sua CD de classe ou fica estupefato 1 até o fim do seu próximo turno.',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4939',
  }),
  f({
    id: 'feat-red-mantis-assassin-achaekeks-grip',
    name: 'Garra de Achaekek',
    originalName: "Achaekek's Grip",
    level: 8,
    archetypeId: 'archetype-red-mantis-assassin',
    rarity: 'rare',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    description:
      'Sente se uma criatura que você matou no último ano voltou à vida, se estiverem no mesmo plano. Ganha a magia de foco garra de Achaekek. Reserva de foco 1 se ainda não tiver.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Garra de Achaekek',
        description:
          'Sente ressurreição de quem você matou no último ano (mesmo plano). Magia de foco garra de Achaekek.',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6523',
  }),
  f({
    id: 'feat-red-mantis-assassin-gang-up',
    name: 'Atacar em Bando',
    originalName: 'Gang Up',
    level: 8,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description:
      'Você flanqueia um inimigo se ele estiver no alcance seu e de um aliado — não precisam estar em lados opostos. O aliado também se beneficia, mas só se flanquear com você (não entre si). Os demais requisitos de flanquear continuam.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Atacar em bando',
        description:
          'Flanqueia se o inimigo estiver no alcance seu e de um aliado (não precisa lado oposto). O aliado só ganha se flanquear com você.',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4943',
  }),
  f({
    id: 'feat-red-mantis-assassin-mantis-form',
    name: 'Forma de Louva-a-deus',
    originalName: 'Mantis Form',
    level: 8,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: 'feat-red-mantis-assassin-basic-red-mantis-magic',
    prereqName: 'Magia Básica da Louva-a-deus Vermelha',
    description:
      'Ganha a magia de foco forma de louva-a-deus. Reserva de foco 1 se ainda não tiver.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Forma de louva-a-deus',
        description: 'Magia de foco forma de louva-a-deus (divina).',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6524',
  }),
  f({
    id: 'feat-red-mantis-assassin-advanced-school-spell',
    name: 'Magia Escolar Avançada',
    originalName: 'Advanced School Spell',
    level: 10,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: 'feat-red-mantis-assassin-red-mantis-school-spell',
    prereqName: 'Magia Escolar da Louva-a-deus Vermelha',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de mago (escola da Louva-a-deus Vermelha)' }],
    description:
      'Ganha a magia avançada da escola da Louva-a-deus Vermelha (manto da louva-a-deus). Reserva de foco 1 se ainda não tiver.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Manto da louva-a-deus',
        description: 'Magia de foco avançada da escola da Louva-a-deus Vermelha (divina).',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5036',
  }),
  f({
    id: 'feat-red-mantis-assassin-fading',
    name: 'Desvanecer',
    originalName: 'Fading',
    level: 10,
    archetypeId: 'archetype-red-mantis-assassin',
    traits: ['Arquétipo', 'Teleporte'],
    rarity: 'rare',
    prereqId: 'feat-red-mantis-assassin-crimson-shroud',
    prereqName: 'Manto Carmesim',
    extraPrereq: [{ kind: 'text', label: 'Manto Carmesim ativo' }],
    description:
      'O atacante faz um teste simples CD 11; falha: o ataque atravessa a imagem do seu corpo. Você volta no instante seguinte e o Manto Carmesim acaba.',
    actionType: 'reaction',
    trigger: 'Você é alvo de um Golpe de alguém que pode detectar.',
    frequency: '1 por Manto Carmesim',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6525',
  }),
  f({
    id: 'feat-red-mantis-assassin-opportune-backstab',
    name: 'Punhalada Oportuna',
    originalName: 'Opportune Backstab',
    level: 10,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description: 'Faça um Golpe contra a criatura do gatilho.',
    actionType: 'reaction',
    trigger: 'Uma criatura no seu alcance corpo a corpo é acertada por um ataque corpo a corpo de um aliado.',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 108,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4954',
  }),
  f({
    id: 'feat-red-mantis-assassin-expert-red-mantis-magic',
    name: 'Magia Perita da Louva-a-deus Vermelha',
    originalName: 'Expert Red Mantis Magic',
    level: 12,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: 'feat-red-mantis-assassin-basic-red-mantis-magic',
    prereqName: 'Magia Básica da Louva-a-deus Vermelha',
    extraPrereq: [{ kind: 'skillRank', skillId: 'religion', rank: 'master' }],
    description: 'Benefícios de conjuração perita deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: MANTIS_SPELL.id, tier: 'expert' }],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6526',
  }),
  f({
    id: 'feat-red-mantis-assassin-vernai-training',
    name: 'Treinamento Vernai',
    originalName: 'Vernai Training',
    level: 12,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: 'feat-red-mantis-assassin-basic-red-mantis-magic',
    prereqName: 'Magia Básica da Louva-a-deus Vermelha',
    description:
      'Para ressuscitar alguém que você matou, o conjurador precisa contrapor sua influência na morte (CD = a maior entre CD de classe e CD de magia). +1 espaço deste arquétipo em cada posto, exceto os dois mais altos. Nesses espaços extras, prepare só magias do currículo da escola da Louva-a-deus Vermelha. Você escolhe quais magias do currículo; o motor não escolhe.',
    effects: [
      { kind: 'spellSlotBreadth', sourceId: MANTIS_SPELL.id },
      {
        kind: 'specialAbility',
        name: 'Influência na morte',
        description:
          'Ressuscitar quem você matou exige contrapor vs a maior entre CD de classe e CD de magia. Espaços extras: só currículo da escola.',
      },
    ],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6527',
  }),
  f({
    id: 'feat-red-mantis-assassin-prayer-attack',
    name: 'Ataque de Oração',
    originalName: 'Prayer Attack',
    level: 14,
    archetypeId: 'archetype-red-mantis-assassin',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_MANTIS.id,
    prereqName: DED_MANTIS.name,
    extraPrereq: [{ kind: 'text', label: 'Sabre dente-de-serra em cada mão' }],
    description:
      'Tente Fintar um inimigo a 9 m. Sucesso: nos turnos seguintes, ao usar Ataque de Oração, o alvo fica automaticamente desprevenido contra seus Golpes corpo a corpo naquele turno (sem novo teste), enquanto você permanecer visível e a até 9 m. Contra outro alvo, Finte de novo. Ao usar Ataque de Oração, o próximo Golpe bem-sucedido com sabre dente-de-serra naquele turno causa 2d6 de sangramento persistente.',
    actionType: 'one',
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6528',
  }),
  f({
    id: 'feat-red-mantis-assassin-master-red-mantis-magic',
    name: 'Magia Mestra da Louva-a-deus Vermelha',
    originalName: 'Master Red Mantis Magic',
    level: 18,
    archetypeId: 'archetype-red-mantis-assassin',
    prereqId: 'feat-red-mantis-assassin-basic-red-mantis-magic',
    prereqName: 'Magia Básica da Louva-a-deus Vermelha',
    extraPrereq: [{ kind: 'skillRank', skillId: 'religion', rank: 'legendary' }],
    description: 'Benefícios de conjuração mestra deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: MANTIS_SPELL.id, tier: 'master' }],
    sourceId: SOURCE_PREY_FOR_DEATH_ID,
    sourcePage: 109,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6529',
  }),
]

const oatiaSkysageArchetypeFeats: Feat[] = [
  f({
    id: DED_OATIA.id,
    name: DED_OATIA.name,
    originalName: 'Oatia Skysage Dedication',
    level: 2,
    archetypeId: 'archetype-oatia-skysage',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'occultism', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ocultismo' },
    ],
    description:
      'Treinado em Conhecimento de Astronomia ou perito em Ocultismo (você escolhe). Conjuração espontânea oculta (Inteligência): repertório com dois truques à escolha entre detectar magia, orientação, conhecer o caminho e ler aura. Treinado em ataque e CD de magia oculta. Você escolhe o estudo e os truques; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-study',
        options: [
          {
            id: 'astronomy-lore',
            label: 'Treinado em Conhecimento de Astronomia',
            effects: [{ kind: 'lore', loreName: 'Astronomia', rank: 'trained' }],
          },
          {
            id: 'occultism-expert',
            label: 'Perito em Ocultismo',
            effects: [{ kind: 'skillRank', skillId: 'occultism', rank: 'expert' }],
          },
        ],
        hint: 'Astronomia ou perito em Ocultismo. O motor aplica o posto depois da escolha.',
        abilityName: 'Estudo celeste: {choice}',
        abilityDescription: 'Posto aplicado na ficha conforme a escolha.',
      },
      { kind: 'spellcasting', access: OATIA_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-cantrip-1',
        options: [
          { id: 'detect-magic', label: 'Detectar magia' },
          { id: 'guidance', label: 'Orientação' },
          { id: 'know-the-way', label: 'Conhecer o caminho' },
          { id: 'read-aura', label: 'Ler aura' },
        ],
        hint: 'Primeiro truque do repertório. O motor não escolhe.',
        abilityName: 'Truque 1: {choice}',
        abilityDescription: 'Truque oculto no repertório de Sábio Celeste Oatia.',
      },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-cantrip-2',
        options: [
          { id: 'detect-magic', label: 'Detectar magia' },
          { id: 'guidance', label: 'Orientação' },
          { id: 'know-the-way', label: 'Conhecer o caminho' },
          { id: 'read-aura', label: 'Ler aura' },
        ],
        hint: 'Segundo truque do repertório (diferente do primeiro). O motor não escolhe.',
        abilityName: 'Truque 2: {choice}',
        abilityDescription: 'Truque oculto no repertório de Sábio Celeste Oatia.',
      },
    ],
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8112',
  }),
  f({
    id: 'feat-oatia-skysage-basic-skysage-divination',
    name: 'Adivinhação Básica de Sábio Celeste',
    originalName: 'Basic Skysage Divination',
    level: 4,
    archetypeId: 'archetype-oatia-skysage',
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    description:
      'Benefícios de conjuração básica. Adicione ao repertório uma magia de 1º posto: leitura de objeto ou golpe certeiro. No 6º: augúrio ou ver o invisível (2º). No 8º: clariaudiência ou localizar (3º). Você escolhe cada magia; o motor não escolhe.',
    effects: [
      { kind: 'spellcastingTier', sourceId: OATIA_SPELL.id, tier: 'basic' },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-rank-1',
        options: [
          { id: 'object-reading', label: 'Leitura de objeto' },
          { id: 'sure-strike', label: 'Golpe certeiro' },
        ],
        hint: 'Magia de 1º posto. O motor não escolhe.',
        abilityName: 'Repertório 1º: {choice}',
        abilityDescription: 'Magia oculta de Sábio Celeste Oatia.',
      },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-rank-2',
        options: [
          { id: 'augury', label: 'Augúrio' },
          { id: 'see-the-unseen', label: 'Ver o invisível' },
        ],
        hint: 'No 6º nível: magia de 2º posto. O motor não escolhe.',
        abilityName: 'Repertório 2º (6º+): {choice}',
        abilityDescription: 'Disponível a partir do 6º nível.',
      },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-rank-3',
        options: [
          { id: 'clairaudience', label: 'Clariaudiência' },
          { id: 'locate', label: 'Localizar' },
        ],
        hint: 'No 8º nível: magia de 3º posto. O motor não escolhe.',
        abilityName: 'Repertório 3º (8º+): {choice}',
        abilityDescription: 'Disponível a partir do 8º nível.',
      },
    ],
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8113',
  }),
  f({
    id: 'feat-oatia-skysage-stargazers-eyes',
    name: 'Olhos do Astrônomo',
    originalName: "Stargazer's Eyes",
    level: 4,
    archetypeId: 'archetype-oatia-skysage',
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    description:
      'Sem visão na penumbra nem visão no escuro: ganha visão na penumbra. Se já tiver visão na penumbra: ganha visão no escuro. Especial: pode pegar de novo para subir visão na penumbra para visão no escuro.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Olhos do astrônomo',
        description:
          'Sem penumbra/escuro: visão na penumbra. Já tem penumbra: visão no escuro. Segunda vez: penumbra → escuro.',
      },
    ],
    repeatable: true,
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8114',
  }),
  f({
    id: 'feat-oatia-skysage-nights-glow',
    name: 'Brilho da Noite',
    originalName: "Night's Glow",
    level: 6,
    archetypeId: 'archetype-oatia-skysage',
    traits: ['Arquétipo', 'Oculto'],
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    description:
      'Magia de domínio raio lunar ou estrela do zênite, como magia de foco oculta. Reserva de foco 1 (Refoco: refletir ou olhar as estrelas). Especial: pode pegar de novo para ganhar a magia que faltou e +1 ponto de foco. Você escolhe a magia; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-nights-glow',
        options: [
          { id: 'moonbeam', label: 'Raio lunar' },
          { id: 'zenith-star', label: 'Estrela do zênite' },
        ],
        hint: 'Magia de foco. Na segunda vez, pegue a outra. O motor não escolhe.',
        abilityName: 'Foco: {choice}',
        abilityDescription: 'Magia de foco oculta de Sábio Celeste Oatia. Refoco: estrelas.',
      },
    ],
    repeatable: true,
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8115',
  }),
  f({
    id: 'feat-oatia-skysage-minor-omen',
    name: 'Presságio Menor',
    originalName: 'Minor Omen',
    level: 8,
    archetypeId: 'archetype-oatia-skysage',
    traits: ['Arquétipo', 'Fortuna', 'Oculto'],
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    extraPrereq: [{ kind: 'text', label: 'Você pode ver o céu noturno' }],
    description: 'Rerrole a salvaguarda falha e use o novo resultado.',
    actionType: 'reaction',
    trigger: 'Você falha numa salvaguarda de Reflexos.',
    frequency: '1/dia',
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8116',
  }),
  f({
    id: 'feat-oatia-skysage-scholars-hunch',
    name: 'Palpite do Erudito',
    originalName: "Scholar's Hunch",
    level: 8,
    archetypeId: 'archetype-oatia-skysage',
    traits: ['Arquétipo', 'Fortuna', 'Oculto'],
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    description: 'Rerrole o teste falho e use o novo resultado.',
    actionType: 'reaction',
    trigger: 'Você falha num teste de Conhecimento ou Ocultismo.',
    frequency: '1/hora',
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8117',
  }),
  f({
    id: 'feat-oatia-skysage-expert-skysage-divination',
    name: 'Adivinhação Perita de Sábio Celeste',
    originalName: 'Expert Skysage Divination',
    level: 10,
    archetypeId: 'archetype-oatia-skysage',
    prereqId: 'feat-oatia-skysage-basic-skysage-divination',
    prereqName: 'Adivinhação Básica de Sábio Celeste',
    description:
      'Benefícios de conjuração perita (perito em ataque e CD ocultos). Adicione ao repertório uma magia de 4º posto: clarividência ou ler presságios. No 12º: sondar a mente ou olho de reconhecimento (5º). No 14º: vidência ou visão verdadeira (6º). Você escolhe cada magia; o motor não escolhe.',
    effects: [
      { kind: 'spellcastingTier', sourceId: OATIA_SPELL.id, tier: 'expert' },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-rank-4',
        options: [
          { id: 'clairvoyance', label: 'Clarividência' },
          { id: 'read-omens', label: 'Ler presságios' },
        ],
        hint: 'Magia de 4º posto. O motor não escolhe.',
        abilityName: 'Repertório 4º: {choice}',
        abilityDescription: 'Magia oculta de Sábio Celeste Oatia.',
      },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-rank-5',
        options: [
          { id: 'mind-probe', label: 'Sondar a mente' },
          { id: 'scouting-eye', label: 'Olho de reconhecimento' },
        ],
        hint: 'No 12º nível: magia de 5º posto. O motor não escolhe.',
        abilityName: 'Repertório 5º (12º+): {choice}',
        abilityDescription: 'Disponível a partir do 12º nível.',
      },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-rank-6',
        options: [
          { id: 'scrying', label: 'Vidência' },
          { id: 'truesight', label: 'Visão verdadeira' },
        ],
        hint: 'No 14º nível: magia de 6º posto. O motor não escolhe.',
        abilityName: 'Repertório 6º (14º+): {choice}',
        abilityDescription: 'Disponível a partir do 14º nível.',
      },
    ],
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8119',
  }),
  f({
    id: 'feat-oatia-skysage-know-it-all',
    name: 'Sabe-Tudo',
    originalName: 'Know-It-All',
    level: 10,
    archetypeId: 'archetype-oatia-skysage',
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional (Sabe-Tudo)' }],
    description:
      'Sucesso em Recordar Conhecimento: informação ou contexto extra. Crítico: informação/contexto extra ou uma pergunta de acompanhamento (o MJ escolhe).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sabe-tudo',
        description:
          'Sucesso em Recordar Conhecimento: contexto extra. Crítico: contexto extra ou pergunta extra (MJ).',
      },
    ],
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=335',
  }),
  f({
    id: 'feat-oatia-skysage-starlit-spells',
    name: 'Magias Estelares',
    originalName: 'Starlit Spells',
    level: 10,
    archetypeId: 'archetype-oatia-skysage',
    traits: ['Arquétipo', 'Oculto'],
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    description:
      'Conjure luz reveladora e luz sagrada de 3º posto como magias inatas ocultas, cada uma 1/dia.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magias estelares',
        description: 'Inatas ocultas 1/dia cada: luz reveladora e luz sagrada (3º posto).',
      },
    ],
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 238,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8118',
  }),
  f({
    id: 'feat-oatia-skysage-nights-shine',
    name: 'Resplendor da Noite',
    originalName: "Night's Shine",
    level: 12,
    archetypeId: 'archetype-oatia-skysage',
    traits: ['Arquétipo', 'Oculto'],
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    extraPrereq: [{ kind: 'text', label: 'Reserva de foco (tipicamente Brilho da Noite)' }],
    description:
      'Magia de domínio asterismo ou toque da lua. +1 ponto de foco. Especial: pode pegar de novo para ganhar a magia que faltou e +1 ponto de foco. Você escolhe a magia; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-nights-shine',
        options: [
          { id: 'asterism', label: 'Asterismo' },
          { id: 'touch-of-the-moon', label: 'Toque da lua' },
        ],
        hint: 'Magia de foco. Na segunda vez, pegue a outra. O motor não escolhe.',
        abilityName: 'Foco avançado: {choice}',
        abilityDescription: 'Magia de foco oculta de Sábio Celeste Oatia.',
      },
    ],
    repeatable: true,
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 239,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8120',
  }),
  f({
    id: 'feat-oatia-skysage-nights-warning',
    name: 'Alerta da Noite',
    originalName: "Night's Warning",
    level: 14,
    archetypeId: 'archetype-oatia-skysage',
    traits: ['Arquétipo', 'Concentração', 'Oculto'],
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    extraPrereq: [{ kind: 'text', label: 'Você pode ver o céu noturno' }],
    description:
      'O Golpe do gatilho mira sua CD de Ocultismo em vez da CA. Penalidades na CA não se aplicam a essa CD, mas condições (ex.: desprevenido para ataque furtivo) continuam. Ocultismo já treinado na Dedicação; a CD usa seu posto atual.',
    actionType: 'reaction',
    trigger: 'Uma criatura faz um ataque contra você e você pode ver o atacante.',
    frequency: '1/hora',
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 239,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8121',
  }),
  f({
    id: 'feat-oatia-skysage-starlight-armor',
    name: 'Armadura de Luz Estelar',
    originalName: 'Starlight Armor',
    level: 14,
    archetypeId: 'archetype-oatia-skysage',
    traits: ['Arquétipo', 'Oculto'],
    prereqId: DED_OATIA.id,
    prereqName: DED_OATIA.name,
    description:
      'Resistência 7 a perfuração, concussão e corte (10 no 17º nível). Luz intensa 6 m (penumbra +6 m). Criatura adjacente que o ataca faz Vontade vs sua CD de magia no fim da ação: falha = ofuscado até o fim do próximo turno dela; imune temporária até o fim do próximo turno dela (luz e visual).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Armadura de luz estelar',
        actionType: 'three',
        description:
          '1/dia. Resistência 7 (10 no 17º) a corte/concussão/perfuração. Luz 6 m. Atacante adjacente: Vontade vs CD de magia ou ofuscado.',
      },
    ],
    actionType: 'three',
    frequency: '1/dia',
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 239,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8122',
  }),
  f({
    id: 'feat-oatia-skysage-master-skysage-divination',
    name: 'Adivinhação Mestra de Sábio Celeste',
    originalName: 'Master Skysage Divination',
    level: 16,
    archetypeId: 'archetype-oatia-skysage',
    prereqId: 'feat-oatia-skysage-expert-skysage-divination',
    prereqName: 'Adivinhação Perita de Sábio Celeste',
    description:
      'Benefícios de conjuração mestra (mestre em ataque e CD ocultos). Adicione ao repertório uma magia de 7º posto: retrocognição ou alvo verdadeiro. No 18º: localizar precisamente. No 20º: premonição. Você escolhe só a magia de 7º; localizar precisamente e premonição entram sozinhas.',
    effects: [
      { kind: 'spellcastingTier', sourceId: OATIA_SPELL.id, tier: 'master' },
      {
        kind: 'textChoice',
        choiceId: 'oatia-skysage-rank-7',
        options: [
          { id: 'retrocognition', label: 'Retrocognição' },
          { id: 'true-target', label: 'Alvo verdadeiro' },
        ],
        hint: 'Magia de 7º posto. O motor não escolhe.',
        abilityName: 'Repertório 7º: {choice}',
        abilityDescription: 'Magia oculta de Sábio Celeste Oatia.',
      },
      {
        kind: 'specialAbility',
        name: 'Repertório 8º e 9º',
        description:
          '18º nível: localizar precisamente (pinpoint) no repertório. 20º nível: premonição (foresight) no repertório.',
      },
    ],
    sourceId: SOURCE_GATEWALKERS_HARDCOVER_ID,
    sourcePage: 239,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8123',
  }),
]

export const archetypeFeatsGeneralRemaster23: Feat[] = [
  ...lepidstadtSurgeonArchetypeFeats,
  ...draconicAcolyteArchetypeFeats,
  ...drakeRiderArchetypeFeats,
  ...redMantisAssassinArchetypeFeats,
  ...oatiaSkysageArchetypeFeats,
]
