/** Multiclasses Remaster restantes (Impossible Magic, Dark Archives, G&G, RoE, Battlecry!, War of Immortals). */
import type { Feat } from '@/types/feat'
import {
  CLASS_MAGUS_ID,
  CLASS_PSYCHIC_ID,
  CLASS_SUMMONER_ID,
  CLASS_THAUMATURGE_ID,
} from './ids'
import { SOURCE_DARK_ARCHIVES_ID, SOURCE_IMPOSSIBLE_MAGIC_ID } from './sources'

function pickFeat(
  opts: {
    id: string
    name: string
    originalName: string
    level: number
    archetypeId: string
    prereqId: string
    prereqName: string
    description: string
    sourceId: string
    sourcePage: number
    aonUrl: string
    extraPrereq?: Feat['prerequisites']
  },
): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'archetype',
    archetypeId: opts.archetypeId,
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: opts.description,
    prerequisites: [
      { kind: 'feat', featId: opts.prereqId, featName: opts.prereqName },
      ...(opts.extraPrereq ?? []),
    ],
    sourceId: opts.sourceId,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const magusArchetypeFeats: Feat[] = [
  {
    id: 'feat-magus-dedication',
    name: 'Dedicação de Magus',
    originalName: 'Magus Dedication',
    level: 2,
    category: 'archetype',
    archetypeId: 'archetype-magus',
    isDedication: true,
    blockedClassId: CLASS_MAGUS_ID,
    traits: ['Arquétipo', 'Dedicação', 'Multiclasse'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você conjura como um magus, ganhando um grimório com quatro truques arcanos comuns à escolha. Ganha a atividade Conjurar uma Magia. Prepara dois truques por dia do grimório. Fica treinado em ataque e CD de magia. O atributo-chave é Inteligência, e as magias são arcanas de magus. Fica treinado em Arcanismo; se já era treinado, fica treinado em outra perícia à escolha.',
    effects: [
      { kind: 'skillRank', skillId: 'arcana', rank: 'trained', replaceIfTrained: true },
      {
        kind: 'spellcasting',
        access: {
          id: 'spellcasting-magus-archetype',
          label: 'Conjuração de Magus (arquétipo)',
          style: 'prepared',
          tradition: 'arcane',
          attributeId: 'intelligence',
          proficiencyRank: 'trained',
          cantripsPerDay: 2,
          classOriginalName: 'Magus',
          features: { spellbook: true },
        },
      },
    ],
    prerequisites: [
      { kind: 'attribute', attributeId: 'intelligence', min: 2 },
      { kind: 'text', label: 'Força +2 ou Destreza +2; Inteligência +2' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  },
  {
    id: 'feat-magus-basic-spellcasting',
    name: 'Conjuração Básica de Magus',
    originalName: 'Basic Magus Spellcasting',
    level: 4,
    category: 'archetype',
    archetypeId: 'archetype-magus',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você ganha os benefícios de conjuração básica. Cada vez que ganha um espaço de um posto novo, adicione duas magias comuns daquele posto ou menor ao grimório.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-magus-archetype', tier: 'basic' },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-magus-dedication', featName: 'Dedicação de Magus' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  },
  pickFeat({
    id: 'feat-magus-basic-martial-magic',
    name: 'Magia Marcial Básica',
    originalName: 'Basic Martial Magic',
    level: 4,
    archetypeId: 'archetype-magus',
    prereqId: 'feat-magus-dedication',
    prereqName: 'Dedicação de Magus',
    description: 'Você ganha um feito de magus de 1º ou 2º nível à escolha.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  }),
  {
    id: 'feat-magus-hybrid-study-spell',
    name: 'Magia de Estudo Híbrido',
    originalName: 'Hybrid Study Spell',
    level: 4,
    category: 'archetype',
    archetypeId: 'archetype-magus',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você ganha a magia de confluência de um estudo híbrido à escolha. Se ainda não tiver reserva de foco, ganha 1 PF. Pode Refocar estudando o grimório e fazendo um regime físico. Não ganha os outros benefícios do estudo.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Estudo híbrido',
        description:
          'Escolha um estudo híbrido de magus. Você ganha só a magia de confluência inicial — o motor não escolhe o estudo.',
      },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-magus-dedication', featName: 'Dedicação de Magus' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  },
  {
    id: 'feat-magus-spellstriker',
    name: 'Golpe Mágico',
    originalName: 'Spellstriker',
    level: 4,
    category: 'archetype',
    archetypeId: 'archetype-magus',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você ganha a atividade Golpe Mágico do magus. Só pode recarregá-la com uma atividade de 1 minuto. Essa restrição vale mesmo se ganhar outra habilidade que recarregue Golpe Mágico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Golpe Mágico',
        actionType: 'two',
        description:
          'Canalize uma magia de ataque no Golpe. Recarga: atividade de 1 minuto (mesmo que outras habilidades recarreguem mais rápido).',
      },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-magus-dedication', featName: 'Dedicação de Magus' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  },
  pickFeat({
    id: 'feat-magus-advanced-martial-magic',
    name: 'Magia Marcial Avançada',
    originalName: 'Advanced Martial Magic',
    level: 6,
    archetypeId: 'archetype-magus',
    prereqId: 'feat-magus-basic-martial-magic',
    prereqName: 'Magia Marcial Básica',
    description:
      'Você ganha um feito de magus. Para os pré-requisitos, seu nível de magus é a metade do nível do personagem.\n\n**Especial** Pode selecionar mais de uma vez.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  }),
  {
    id: 'feat-magus-expert-spellcasting',
    name: 'Conjuração Experiente de Magus',
    originalName: 'Expert Magus Spellcasting',
    level: 12,
    category: 'archetype',
    archetypeId: 'archetype-magus',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: 'Você ganha os benefícios de conjuração experiente.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-magus-archetype', tier: 'expert' },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-magus-basic-spellcasting', featName: 'Conjuração Básica de Magus' },
      { kind: 'skillRank', skillId: 'arcana', rank: 'master' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  },
  {
    id: 'feat-magus-master-spellcasting',
    name: 'Conjuração Mestra de Magus',
    originalName: 'Master Magus Spellcasting',
    level: 18,
    category: 'archetype',
    archetypeId: 'archetype-magus',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: 'Você ganha os benefícios de conjuração mestra.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-magus-archetype', tier: 'master' },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-magus-expert-spellcasting', featName: 'Conjuração Experiente de Magus' },
      { kind: 'skillRank', skillId: 'arcana', rank: 'legendary' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 88,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=386',
  },
]

const summonerArchetypeFeats: Feat[] = [
  {
    id: 'feat-summoner-dedication',
    name: 'Dedicação de Invocador',
    originalName: 'Summoner Dedication',
    level: 2,
    category: 'archetype',
    archetypeId: 'archetype-summoner',
    isDedication: true,
    blockedClassId: CLASS_SUMMONER_ID,
    traits: ['Arquétipo', 'Dedicação', 'Multiclasse'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você formou um vínculo com um eidolon. Ganha um eidolon e a atividade Manifestar Eidolon. Não ganha nem usa ações em tandem. Só você ou o eidolon faz atividade de exploração por vez. O eidolon fica treinado em ataques desarmados e defesa sem armadura, e compartilha Percepção, salvaguardas e perícias. Escolha um tipo de eidolon. Fica treinado nas perícias listadas; em cada uma já treinada, fica treinado em outra à escolha. Atributos iniciais do eidolon são reduzidos (+3 e +2 em vez de +4 e +2).',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'eidolon-skill-1',
        rank: 'trained',
        replaceIfTrained: true,
        hint: 'Primeira perícia do seu eidolon. Se já for treinado, escolha outra.',
      },
      {
        kind: 'skillRankChoice',
        choiceId: 'eidolon-skill-2',
        rank: 'trained',
        replaceIfTrained: true,
        hint: 'Segunda perícia do seu eidolon. Se já for treinado, escolha outra.',
      },
      {
        kind: 'specialAbility',
        name: 'Manifestar Eidolon',
        actionType: 'three',
        description:
          'Você manifesta ou dispensa o eidolon. Adicione o eidolon em Companheiros. Escolha o tipo — o motor não escolhe. Sem ações em tandem neste arquétipo.',
      },
    ],
    prerequisites: [
      { kind: 'attribute', attributeId: 'charisma', min: 2 },
      { kind: 'text', label: 'Carisma +2' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=389',
  },
  {
    id: 'feat-summoner-basic-spellcasting',
    name: 'Conjuração Básica de Invocador',
    originalName: 'Basic Summoner Spellcasting',
    level: 4,
    category: 'archetype',
    archetypeId: 'archetype-summoner',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você ganha os benefícios de conjuração básica e a atividade Conjurar uma Magia. O atributo-chave é Carisma, e as magias são da tradição do eidolon. Fica treinado em ataque e CD. Ganha repertório e dois truques.',
    effects: [
      {
        kind: 'spellcasting',
        access: {
          id: 'spellcasting-summoner-archetype',
          label: 'Conjuração de Invocador (arquétipo)',
          style: 'spontaneous',
          tradition: 'arcane',
          traditionChoiceId: 'eidolon-tradition',
          grantTraditionSkill: false,
          traditionChoiceHint:
            'Escolha a tradição do seu eidolon. A conjuração só entra depois desta escolha.',
          attributeId: 'charisma',
          proficiencyRank: 'trained',
          cantripsPerDay: 2,
          classOriginalName: 'Summoner',
          features: { repertoire: true },
        },
      },
      { kind: 'spellcastingTier', sourceId: 'spellcasting-summoner-archetype', tier: 'basic' },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-summoner-dedication', featName: 'Dedicação de Invocador' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=389',
  },
  pickFeat({
    id: 'feat-summoner-basic-synergy',
    name: 'Sinergia Básica',
    originalName: 'Basic Synergy',
    level: 4,
    archetypeId: 'archetype-summoner',
    prereqId: 'feat-summoner-dedication',
    prereqName: 'Dedicação de Invocador',
    description: 'Você ganha um feito de invocador de 1º ou 2º nível à escolha.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=389',
  }),
  {
    id: 'feat-summoner-initial-eidolon-ability',
    name: 'Habilidade Inicial do Eidolon',
    originalName: 'Initial Eidolon Ability',
    level: 4,
    category: 'archetype',
    archetypeId: 'archetype-summoner',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Seu vínculo se fortalece. O eidolon ganha a habilidade inicial do tipo escolhido.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Habilidade inicial do eidolon',
        description:
          'O eidolon ganha a habilidade inicial do tipo que você escolheu (você escolhe o tipo; o motor não escolhe a habilidade).',
      },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-summoner-dedication', featName: 'Dedicação de Invocador' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=389',
  },
  pickFeat({
    id: 'feat-summoner-advanced-synergy',
    name: 'Sinergia Avançada',
    originalName: 'Advanced Synergy',
    level: 6,
    archetypeId: 'archetype-summoner',
    prereqId: 'feat-summoner-basic-synergy',
    prereqName: 'Sinergia Básica',
    description:
      'Você ganha um feito de invocador. Nível de invocador = metade do nível.\n\n**Especial** Pode selecionar mais de uma vez.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=389',
  }),
  {
    id: 'feat-summoner-expert-combat-eidolon',
    name: 'Eidolon Combatente Experiente',
    originalName: 'Expert Combat Eidolon',
    level: 12,
    category: 'archetype',
    archetypeId: 'archetype-summoner',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'O eidolon fica perito em ataques desarmados. Se você for perito em defesa sem armadura, ele também fica. Se você tiver especialização em armas, o eidolon também ganha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Eidolon perito',
        description:
          'O eidolon fica perito em ataques desarmados (e defesa sem armadura / especialização em armas se você já tiver). Aplique no companheiro eidolon.',
      },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-summoner-dedication', featName: 'Dedicação de Invocador' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=389',
  },
  {
    id: 'feat-summoner-expert-spellcasting',
    name: 'Conjuração Experiente de Invocador',
    originalName: 'Expert Summoner Spellcasting',
    level: 12,
    category: 'archetype',
    archetypeId: 'archetype-summoner',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: 'Você ganha os benefícios de conjuração experiente.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-summoner-archetype', tier: 'expert' },
    ],
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-summoner-basic-spellcasting',
        featName: 'Conjuração Básica de Invocador',
      },
      { kind: 'text', label: 'Mestre na perícia da tradição do eidolon' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9313',
  },
  {
    id: 'feat-summoner-master-spellcasting',
    name: 'Conjuração Mestra de Invocador',
    originalName: 'Master Summoner Spellcasting',
    level: 18,
    category: 'archetype',
    archetypeId: 'archetype-summoner',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: 'Você ganha os benefícios de conjuração mestra.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-summoner-archetype', tier: 'master' },
    ],
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-summoner-expert-spellcasting',
        featName: 'Conjuração Experiente de Invocador',
      },
      { kind: 'text', label: 'Lendário na perícia da tradição do eidolon' },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 91,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9314',
  },
]

const psychicArchetypeFeats: Feat[] = [
  {
    id: 'feat-psychic-dedication',
    name: 'Dedicação de Psíquico',
    originalName: 'Psychic Dedication',
    level: 2,
    category: 'archetype',
    archetypeId: 'archetype-psychic',
    isDedication: true,
    blockedClassId: CLASS_PSYCHIC_ID,
    traits: ['Arquétipo', 'Dedicação', 'Multiclasse'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Algo desperta na sua mente. Fica treinado em Ocultismo; se já era, fica treinado em outra perícia à escolha. Conjura como um psíquico. Escolha uma mente consciente. Ganha repertório com um truque psi padrão à escolha dessa mente. Fica treinado em ataque e CD. O atributo-chave é o que você usou para se qualificar (Inteligência ou Carisma).',
    effects: [
      { kind: 'skillRank', skillId: 'occultism', rank: 'trained', replaceIfTrained: true },
      {
        kind: 'spellcasting',
        access: {
          id: 'spellcasting-psychic-archetype',
          label: 'Conjuração de Psíquico (arquétipo)',
          style: 'spontaneous',
          tradition: 'occult',
          attributeId: 'intelligence',
          attributeChoiceId: 'key-attr',
          attributeOptions: ['intelligence', 'charisma'],
          attributeChoiceHint:
            'Escolha Inteligência ou Carisma (o atributo com que você se qualificou). A conjuração só entra depois.',
          proficiencyRank: 'trained',
          cantripsPerDay: 1,
          classOriginalName: 'Psychic',
          features: { repertoire: true },
        },
      },
      {
        kind: 'specialAbility',
        name: 'Mente consciente',
        description:
          'Escolha uma mente consciente e um truque psi padrão dela. Você ganha os benefícios desse truque psi, não o resto da mente. O motor não escolhe.',
      },
    ],
    prerequisites: [
      { kind: 'text', label: 'Inteligência +2 ou Carisma +2' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=342',
  },
  {
    id: 'feat-psychic-basic-spellcasting',
    name: 'Conjuração Básica de Psíquico',
    originalName: 'Basic Psychic Spellcasting',
    level: 4,
    category: 'archetype',
    archetypeId: 'archetype-psychic',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você ganha os benefícios de conjuração básica. Ao ganhar espaço de posto novo, adicione ao repertório uma magia oculta comum, concedida pela mente consciente, ou outra que tenha aprendido.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-psychic-archetype', tier: 'basic' },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-psychic-dedication', featName: 'Dedicação de Psíquico' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=342',
  },
  pickFeat({
    id: 'feat-psychic-basic-thoughtform',
    name: 'Forma de Pensamento Básica',
    originalName: 'Basic Thoughtform',
    level: 4,
    archetypeId: 'archetype-psychic',
    prereqId: 'feat-psychic-dedication',
    prereqName: 'Dedicação de Psíquico',
    description: 'Você ganha um feito de psíquico de 1º ou 2º nível à escolha.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=342',
  }),
  pickFeat({
    id: 'feat-psychic-advanced-thoughtform',
    name: 'Forma de Pensamento Avançada',
    originalName: 'Advanced Thoughtform',
    level: 6,
    archetypeId: 'archetype-psychic',
    prereqId: 'feat-psychic-basic-thoughtform',
    prereqName: 'Forma de Pensamento Básica',
    description:
      'Você ganha um feito de psíquico. Nível de psíquico = metade do nível.\n\n**Especial** Pode selecionar mais de uma vez.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=342',
  }),
  {
    id: 'feat-psychic-psi-development',
    name: 'Desenvolvimento Psi',
    originalName: 'Psi Development',
    level: 6,
    category: 'archetype',
    archetypeId: 'archetype-psychic',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você encontra uma nova forma mental. Ganha outro truque psi da mente consciente (o padrão que não pegou ou o truque de superfície único). Pode amplificar truques psi. Se não tiver, ganha 1 PF.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Segundo truque psi',
        description:
          'Escolha o outro truque psi padrão da mente ou o truque de superfície único. Você escolhe; o motor não escolhe.',
      },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-psychic-dedication', featName: 'Dedicação de Psíquico' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=342',
  },
  {
    id: 'feat-psychic-expert-spellcasting',
    name: 'Conjuração Experiente de Psíquico',
    originalName: 'Expert Psychic Spellcasting',
    level: 12,
    category: 'archetype',
    archetypeId: 'archetype-psychic',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: 'Você ganha os benefícios de conjuração experiente.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-psychic-archetype', tier: 'expert' },
    ],
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-psychic-basic-spellcasting',
        featName: 'Conjuração Básica de Psíquico',
      },
      { kind: 'skillRank', skillId: 'occultism', rank: 'master' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=342',
  },
  {
    id: 'feat-psychic-master-spellcasting',
    name: 'Conjuração Mestra de Psíquico',
    originalName: 'Master Psychic Spellcasting',
    level: 18,
    category: 'archetype',
    archetypeId: 'archetype-psychic',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: 'Você ganha os benefícios de conjuração mestra.',
    effects: [
      { kind: 'spellcastingTier', sourceId: 'spellcasting-psychic-archetype', tier: 'master' },
    ],
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-psychic-expert-spellcasting',
        featName: 'Conjuração Experiente de Psíquico',
      },
      { kind: 'skillRank', skillId: 'occultism', rank: 'legendary' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=342',
  },
]

const thaumaturgeArchetypeFeats: Feat[] = [
  {
    id: 'feat-thaumaturge-dedication',
    name: 'Dedicação de Taumaturgo',
    originalName: 'Thaumaturge Dedication',
    level: 2,
    category: 'archetype',
    archetypeId: 'archetype-thaumaturge',
    isDedication: true,
    blockedClassId: CLASS_THAUMATURGE_ID,
    traits: ['Arquétipo', 'Dedicação', 'Multiclasse'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você descobre taumaturgia básica. Fica treinado na CD de taumaturgo. Escolha um implemento: pode usá-lo para Entrever Vulnerabilidade, mas não ganha os benefícios do implemento. Ganha esotérica. Fica treinado em Arcanismo, Natureza, Ocultismo ou Religião à escolha; se já era treinado nessas, fica treinado em outra à escolha.',
    effects: [
      {
        kind: 'classDc',
        rank: 'trained',
        label: 'CD de Taumaturgo',
        attributeId: 'charisma',
      },
      {
        kind: 'skillRankChoice',
        choiceId: 'tradition-skill',
        rank: 'trained',
        skillOptions: ['arcana', 'nature', 'occultism', 'religion'],
        replaceIfTrained: true,
        hint: 'Arcanismo, Natureza, Ocultismo ou Religião. Se já for treinado nas quatro, escolha outra.',
      },
      {
        kind: 'specialAbility',
        name: 'Entrever Vulnerabilidade',
        actionType: 'one',
        description:
          'Frequência 1/rodada. Requer implemento. Escolha uma criatura que possa ver. Até Entrever de novo, o alvo tem fraqueza 2 contra seus Golpes desarmados e com arma. Escolha o implemento — o motor não escolhe.',
      },
    ],
    prerequisites: [
      { kind: 'attribute', attributeId: 'charisma', min: 2 },
      { kind: 'text', label: 'Carisma +2' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=343',
  },
  pickFeat({
    id: 'feat-thaumaturge-basic-thaumaturgy',
    name: 'Taumaturgia Básica',
    originalName: 'Basic Thaumaturgy',
    level: 4,
    archetypeId: 'archetype-thaumaturge',
    prereqId: 'feat-thaumaturge-dedication',
    prereqName: 'Dedicação de Taumaturgo',
    description: 'Você ganha um feito de taumaturgo de 1º ou 2º nível à escolha.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=343',
  }),
  pickFeat({
    id: 'feat-thaumaturge-advanced-thaumaturgy',
    name: 'Taumaturgia Avançada',
    originalName: 'Advanced Thaumaturgy',
    level: 6,
    archetypeId: 'archetype-thaumaturge',
    prereqId: 'feat-thaumaturge-basic-thaumaturgy',
    prereqName: 'Taumaturgia Básica',
    description:
      'Você ganha um feito de taumaturgo. Nível de taumaturgo = metade do nível.\n\n**Especial** Pode selecionar mais de uma vez.',
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=343',
  }),
  {
    id: 'feat-thaumaturge-implement-initiate',
    name: 'Iniciação de Implemento',
    originalName: 'Implement Initiate',
    level: 6,
    category: 'archetype',
    archetypeId: 'archetype-thaumaturge',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Você ganha o benefício inicial do implemento. Se o benefício afetar o alvo de Explorar Vulnerabilidade, para você afeta o alvo de Entrever Vulnerabilidade.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Benefício inicial do implemento',
        description:
          'Ganha o benefício de iniciação do implemento que você escolheu na Dedicação.',
      },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-thaumaturge-dedication', featName: 'Dedicação de Taumaturgo' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=343',
  },
  {
    id: 'feat-thaumaturge-magical-knowledge',
    name: 'Conhecimento Mágico',
    originalName: 'Magical Knowledge',
    level: 8,
    category: 'archetype',
    archetypeId: 'archetype-thaumaturge',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description:
      'Aumente uma de Arcanismo, Natureza, Ocultismo ou Religião de perito para mestre e outra de treinado para perito. Ganha um feito de perícia associado a cada uma.',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'to-master',
        rank: 'master',
        requireRank: 'expert',
        skillOptions: ['arcana', 'nature', 'occultism', 'religion'],
        hint: 'Escolha uma dessas perícias em que você já é perito. Ela sobe para mestre.',
      },
      {
        kind: 'skillRankChoice',
        choiceId: 'to-expert',
        rank: 'expert',
        requireRank: 'trained',
        skillOptions: ['arcana', 'nature', 'occultism', 'religion'],
        hint: 'Escolha outra dessas perícias em que você já é treinado. Ela sobe para perito.',
      },
      {
        kind: 'specialAbility',
        name: 'Feitos de perícia',
        description:
          'Ganha um feito de perícia para cada perícia que escolheu (você escolhe os feitos).',
      },
    ],
    prerequisites: [
      { kind: 'feat', featId: 'feat-thaumaturge-dedication', featName: 'Dedicação de Taumaturgo' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=343',
  },
  {
    id: 'feat-thaumaturge-resolute',
    name: 'Resoluto',
    originalName: 'Resolute',
    level: 12,
    category: 'archetype',
    archetypeId: 'archetype-thaumaturge',
    traits: ['Arquétipo'],
    rarity: 'common',
    provenance: { type: 'official' },
    description: 'Sua proficiência em Vontade aumenta para mestre.',
    effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    prerequisites: [
      { kind: 'feat', featId: 'feat-thaumaturge-dedication', featName: 'Dedicação de Taumaturgo' },
    ],
    sourceId: SOURCE_DARK_ARCHIVES_ID,
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=343',
  },
]

export const archetypeFeatsMulticlassRemaster2: Feat[] = [
  ...magusArchetypeFeats,
  ...summonerArchetypeFeats,
  ...psychicArchetypeFeats,
  ...thaumaturgeArchetypeFeats,
]
