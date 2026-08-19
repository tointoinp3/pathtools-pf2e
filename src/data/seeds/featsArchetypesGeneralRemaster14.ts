/** Gerais Remaster: Mago do Tempo, Duelista Psíquico, Nexo Vivo, Forjador de Alma, Deslocador de Magia. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import { SOURCE_DARK_ARCHIVES_ID, SOURCE_IMPOSSIBLE_MAGIC_ID } from './sources'

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
    sourceId: opts.sourceId ?? SOURCE_DARK_ARCHIVES_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_TIME = { id: 'feat-time-mage-dedication', name: 'Dedicação de Mago do Tempo' }
const DED_PSY = { id: 'feat-psychic-duelist-dedication', name: 'Dedicação de Duelista Psíquico' }
const DED_NEX = { id: 'feat-living-nexus-dedication', name: 'Dedicação de Nexo Vivo' }
const DED_SOUL = { id: 'feat-soulforger-dedication', name: 'Dedicação de Forjador de Alma' }
const DED_SHIFT = { id: 'feat-spellshifter-dedication', name: 'Dedicação de Deslocador de Magia' }

const TIME_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-time-mage-archetype',
  label: 'Magias de Mago do Tempo',
  style: 'focusOnly',
  tradition: 'arcane',
  traditionChoiceId: 'time-mage-tradition',
  traditionChoiceHint:
    'A mesma tradição das magias que qualificam a Dedicação. O motor não escolhe.',
  grantTraditionSkill: false,
  attributeId: 'intelligence',
  attributeChoiceId: 'time-mage-key-attr',
  attributeOptions: ['intelligence', 'wisdom', 'charisma'],
  attributeChoiceHint: 'O mesmo atributo-chave da conjuração que qualifica. O motor não escolhe.',
  proficiencyRank: 'trained',
  classOriginalName: 'Time Mage',
  features: { focusPool: true },
}

const timeMageArchetypeFeats: Feat[] = [
  f({
    id: DED_TIME.id,
    name: DED_TIME.name,
    originalName: 'Time Mage Dedication',
    level: 6,
    archetypeId: 'archetype-time-mage',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [{ kind: 'text', label: 'Recurso de classe de conjuração' }],
    description:
      'Ganha a magia de domínio atrasar consequência. Refoco: revisitar o passado e futuros possíveis. Se já tinha atrasar consequência por escolha de domínio, pode retreinar essa escolha. Também ganha sentido do tempo como truque inato à vontade. Foco e truque usam a mesma tradição das magias que qualificam. Você escolhe tradição e atributo-chave; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: TIME_SPELL },
      {
        kind: 'specialAbility',
        name: 'Atrasar consequência; sentido do tempo (truque inato)',
        description: 'Tradição e atributo iguais aos da conjuração que qualifica. O motor não escolhe.',
      },
    ],
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-chronocognizance',
    name: 'Cronocognizância',
    originalName: 'Chronocognizance',
    level: 7,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Sabe automaticamente se alguém que observa está lento ou acelerado. Sente anomalias temporais por perto. Se for lendário em Arcana, Natureza, Ocultismo ou Religião: observa o que acontece durante congelar o tempo, mas não age.',
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-secrets',
    name: 'Segredos do Cronomante',
    originalName: "Chronomancer's Secrets",
    level: 8,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Ganha estase (domínio) ou caminho da menor resistência (foco). Pode pegar de novo com a outra. Você escolhe; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: TIME_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'time-mage-secret-spell',
        options: [
          { id: 'stasis', label: 'Estase (domínio)' },
          { id: 'path-of-least-resistance', label: 'Caminho da menor resistência' },
        ],
        hint: 'Magia de foco. Na segunda vez, a outra. O motor não escolhe.',
        abilityName: 'Segredo: {choice}',
        abilityDescription: 'Magia de foco de mago do tempo.',
      },
    ],
    repeatable: true,
    sourcePage: 184,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-future-learning',
    name: 'Aprendizado de Magia Futura',
    originalName: 'Future Spell Learning',
    level: 8,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Adiciona à lista: contemplar a trama, lançar no tempo, acelerar, soltar a flecha do tempo, acelerar o tempo, lentidão e estagnar o tempo. Repositório: adiciona. Repertório: pode retreinar uma magia por uma destas. Você escolhe o retreino; o motor não escolhe.',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-what-could',
    name: 'O Que Poderia Ter Sido',
    originalName: 'What Could Have Been',
    level: 8,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Se a próxima ação for conjurar uma magia que invoca uma criatura, ela é uma versão sua de outra linha do tempo. +1 a +4 de status em perícias em que você é treinado/perito/mestre/lendário; −2 nas destreinadas.',
    actionType: 'free',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-into-future',
    name: 'Para o Futuro',
    originalName: 'Into the Future',
    level: 10,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Se a próxima ação for conjurar magia de 1 ou 2 ações, o efeito ocorre no início do seu próximo turno. Alvos e escolhas agora; linha de visão/efeito agora e depois. Reações à conjuração não atrasam.',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-read-disaster',
    name: 'Ler o Desastre',
    originalName: 'Read Disaster',
    level: 10,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      '10 minutos: efeitos de augúrio só sobre perigos (“bom” vira “nada”; “misto” vira “ruim”). Lendário em Religião: 1 minuto.',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-acceleration',
    name: 'Aceleração de Magia',
    originalName: 'Spell Acceleration',
    level: 12,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Ganha Conjuração Acelerada. Vale em truques e magias da classe que qualificou a Dedicação.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Conjuração Acelerada (mago do tempo)',
        description:
          'Se a próxima ação for conjurar um truque ou magia pelo menos 2 postos abaixo do espaço mais alto da classe que qualifica, −1 ação (mínimo 1).',
        actionType: 'free',
      },
    ],
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-plot',
    name: 'Traçar o Futuro',
    originalName: 'Plot the Future',
    level: 16,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      '10 minutos: escolha um objetivo/evento em 1 semana. O MJ diz se é muito/um pouco provável ou improvável e um conselho para tornar mais ou menos provável. Você escolhe o evento; o motor não escolhe.',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-purge',
    name: 'Expurgo de Momentos',
    originalName: 'Purge of Moments',
    level: 16,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Cinco rodadas passam só para você. Ninguém age. Efeitos em você correm (benéficos, negativos, aflições, dano persistente). Role salvaguardas e dano normalmente.',
    actionType: 'three',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-splitting',
    name: 'Magia que Parte a Linha do Tempo',
    originalName: 'Timeline-Splitting Spell',
    level: 18,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Conjure duas magias de 1 ou 2 ações (não a mesma em dois postos). Gaste os recursos das duas. Determine resultados imediatos e escolha qual se torna real. Você escolhe as magias; o motor não escolhe.',
    actionType: 'three',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
  f({
    id: 'feat-time-mage-echoing',
    name: 'Magia Ecoante',
    originalName: 'Echoing Spell',
    level: 20,
    archetypeId: 'archetype-time-mage',
    prereqId: DED_TIME.id,
    prereqName: DED_TIME.name,
    description:
      'Se a próxima ação for conjurar magia de 4º posto ou menor sem duração, pode conjurá-la de novo até o fim do próximo turno sem gastar espaço.',
    actionType: 'one',
    sourcePage: 185,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=348',
  }),
]

const psychicDuelistArchetypeFeats: Feat[] = [
  f({
    id: DED_PSY.id,
    name: DED_PSY.name,
    originalName: 'Psychic Duelist Dedication',
    level: 4,
    archetypeId: 'archetype-psychic-duelist',
    isDedication: true,
    rarity: 'rare',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'occultism', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ocultismo; você já participou de um duelo psíquico' },
    ],
    description:
      '+2 de circunstância na iniciativa de duelos psíquicos. A cada duelo, escolha Maça Mental ou Punho Psíquico (só naquele duelo). O motor não escolhe nem grava a escolha.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'iniciativa de duelo psíquico',
      },
      {
        kind: 'specialAbility',
        name: 'Maça Mental ou Punho Psíquico',
        description:
          'A cada duelo você escolhe: bônus de status em dano mental igual ao posto da magia; ou modificador padrão no dano de Golpe e CA cheia no lugar da CD de Vontade.',
      },
    ],
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=350',
  }),
  f({
    id: 'feat-psychic-duelist-spell-advantage',
    name: 'Vantagem de Magia no Duelo',
    originalName: 'Duel Spell Advantage',
    level: 6,
    archetypeId: 'archetype-psychic-duelist',
    prereqId: DED_PSY.id,
    prereqName: DED_PSY.name,
    description:
      'Ao iniciar um duelo psíquico, ganha uma terceira magia psíquica natural (não pode repetir). No 9º+, a lista inclui confusão, alucinação, sugestão, pulso sináptico, sinestesia e onda de desespero. Você escolhe as magias; o motor não escolhe.',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=350',
  }),
  f({
    id: 'feat-psychic-duelist-center',
    name: 'Centro Psíquico Supremo',
    originalName: 'Supreme Psychic Center',
    level: 8,
    archetypeId: 'archetype-psychic-duelist',
    prereqId: DED_PSY.id,
    prereqName: DED_PSY.name,
    description: 'Recentralize.',
    actionType: 'free',
    trigger: 'Seu turno num duelo psíquico começa.',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8502',
  }),
  f({
    id: 'feat-psychic-duelist-instigate',
    name: 'Instigar Duelo Psíquico',
    originalName: 'Instigate Psychic Duel',
    level: 12,
    archetypeId: 'archetype-psychic-duelist',
    prereqId: DED_PSY.id,
    prereqName: DED_PSY.name,
    description:
      'Alvo a 30 m: Vontade vs a maior CD (classe ou magia). Se entrar de vontade, use falha crítica. Sucesso crítico: nada. Sucesso: duelo até o fim do seu próximo turno. Falha: nova salvaguarda no fim de cada um dos seus turnos. Falha crítica: duelo até condição normal de fim.',
    actionType: 'three',
    sourcePage: 203,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=350',
  }),
]

const livingNexusArchetypeFeats: Feat[] = [
  f({
    id: DED_NEX.id,
    name: DED_NEX.name,
    originalName: 'Living Nexus Dedication',
    level: 2,
    archetypeId: 'archetype-living-nexus',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'text', label: 'Treinado em armas marciais; treinado em Arcana, Natureza, Ocultismo ou Religião' },
    ],
    description:
      'Absorver Magia (reação) e Lâmina Transbordante (1 ação). CD de nexo = a maior entre classe e magia. Transbordando: +1 de status em salvaguardas vs arcano/divino/mágico/oculto/primordial (+2 no 15º), até 1 minuto. Lâmina: Golpe corpo a corpo +1d4 força (2d4 no 10º, 3d4 no 18º) e deixa de transbordar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Absorver Magia; Lâmina Transbordante',
        description:
          'Reação: criatura a 9 m conjura ou usa ação arcana/divina/mágica/oculta/primordial; você transborda. 1 ação: Golpe + dano de força e encerra o transbordo.',
      },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 96,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-memory',
    name: 'Memória Inspirada',
    originalName: 'Inspired Memory',
    level: 3,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    description:
      '+1 de circunstância para Recordar Conhecimento sobre criaturas cuja magia você absorveu no último minuto, e para Aprender uma Magia absorvida na última semana.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo:
          'Recordar Conhecimento (magia absorvida no último minuto); Aprender uma Magia (absorvida na última semana)',
      },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 96,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-blast',
    name: 'Rajada de Éter',
    originalName: 'Aether Blast',
    level: 4,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    extraPrereq: [{ kind: 'text', label: 'Você está transbordando' }],
    description:
      'Alvo a 9 m: 1d12 força, Reflexos básico vs CD de nexo (+1d12 no 8º e a cada 4 níveis). Deixa de transbordar.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 96,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-taste',
    name: 'O Sabor da Magia',
    originalName: 'The Taste of Magic',
    level: 4,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    description:
      'Farol impreciso 9 m só para criaturas, itens e efeitos sob magia ou com traço arcano/divino/mágico/oculto/primordial. Pode Rastrear esses alvos com Arcana, Ocultismo, Natureza ou Religião no lugar de Sobrevivência.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Farol de magia (impreciso, 9 m)',
        description: 'Só detecta magia. Rastrear com perícia de tradição.',
      },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 96,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-flexible',
    name: 'Nexo Flexível',
    originalName: 'Flexible Nexus',
    level: 6,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    description:
      'Cada vez que uma habilidade deste arquétipo causar dano de força, você pode mudar para mental, espírito, vitalidade ou vazio. Você escolhe na hora; o motor não escolhe.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-harness',
    name: 'Aproveitar Magia Natural',
    originalName: 'Harness Natural Magic',
    level: 6,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    extraPrereq: [{ kind: 'text', label: 'Você não está transbordando' }],
    description: 'Fica transbordando como se tivesse Absorvido Magia.',
    actionType: 'free',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-surging',
    name: 'Pancada Torrencial',
    originalName: 'Surging Smash',
    level: 6,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    extraPrereq: [{ kind: 'text', label: 'Você está transbordando' }],
    description:
      'Golpe corpo a corpo. Cone 9 m de 3d6 força (Fortitude básico vs CD de nexo); o primeiro quadrado é o do alvo. Falha crítica: caído. +1d6 no 8º e a cada 2 níveis. Deixa de transbordar.',
    actionType: 'two',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-beam',
    name: 'Feixe de Éter',
    originalName: 'Aether Beam',
    level: 8,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    extraPrereq: [{ kind: 'text', label: 'Você está transbordando' }],
    description:
      'Linha 18 m: 6d6 força, Reflexos básico vs CD de nexo. Falha: empurrado 3 m (6 m na crítica). +2d6 no 10º e a cada 2 níveis. Deixa de transbordar.',
    actionType: 'two',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-healing',
    name: 'Nexo Curativo',
    originalName: 'Healing Nexus',
    level: 8,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    extraPrereq: [{ kind: 'text', label: 'Você está transbordando' }],
    description: 'Cura 30 PV (+5 no 10º e a cada 2 níveis). Deixa de transbordar.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=392',
  }),
  f({
    id: 'feat-living-nexus-null',
    name: 'Campo Nulo',
    originalName: 'Null Field',
    level: 10,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    extraPrereq: [{ kind: 'text', label: 'Transbordando; tomou dano de energia no último minuto' }],
    description:
      'Escolha um tipo de energia que tomou no último minuto. Resistência igual à metade do nível por 1 minuto. Você escolhe o tipo; o motor não escolhe.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9347',
  }),
  f({
    id: 'feat-living-nexus-steal',
    name: 'Roubar o Sopro da Magia',
    originalName: "Steal Magic's Breath",
    level: 12,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    extraPrereq: [{ kind: 'text', label: 'Você não está transbordando' }],
    description:
      'Fica transbordando. Reduz o dano da magia/habilidade em 6d6 para todos os alvos (+1d6 no 14º e a cada 2 níveis), antes de fraquezas/resistências. Se zerar, o efeito não atinge aquela criatura.',
    actionType: 'reaction',
    frequency: '1 vez por dia',
    trigger:
      'Você é alvo ou está na área de magia/habilidade danosa arcana, divina, mágica, oculta ou primordial.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9348',
  }),
  f({
    id: 'feat-living-nexus-quick',
    name: 'Absorção Rápida',
    originalName: 'Quick Absorption',
    level: 14,
    archetypeId: 'archetype-living-nexus',
    prereqId: DED_NEX.id,
    prereqName: DED_NEX.name,
    description: 'No início de cada turno, uma reação extra só para Absorver Magia.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9349',
  }),
]

const soulforgerArchetypeFeats: Feat[] = [
  f({
    id: DED_SOUL.id,
    name: DED_SOUL.name,
    originalName: 'Soulforger Dedication',
    level: 2,
    archetypeId: 'archetype-soulforger',
    isDedication: true,
    rarity: 'uncommon',
    description:
      'Vincule armadura, escudo ou arma como armamento forjado na alma. Escolha um caminho da alma (anátema agir contra) e um poder de essência. Manifestar Armamento (1 ação): empunha/veste até Dispensar. 1/dia, forma de essência por 1 minuto. Você escolhe tipo, caminho e poder; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'soulforger-armament',
        options: [
          { id: 'armor', label: 'Armadura' },
          { id: 'shield', label: 'Escudo' },
          { id: 'weapon', label: 'Arma' },
        ],
        hint: 'Tipo do armamento. Caminho da alma e poder de essência você nomeia. O motor não escolhe.',
        abilityName: 'Armamento: {choice}',
        abilityDescription:
          'Manifestar Armamento Forjado na Alma (1 ação). 1/dia forma de essência. Você nomeia o caminho da alma.',
      },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 98,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=393',
  }),
  f({
    id: 'feat-soulforger-flare',
    name: 'Labareda da Alma',
    originalName: 'Soul Flare',
    level: 4,
    archetypeId: 'archetype-soulforger',
    prereqId: DED_SOUL.id,
    prereqName: DED_SOUL.name,
    extraPrereq: [{ kind: 'text', label: 'Seu armamento está manifestado' }],
    description:
      '+1 de status no ataque (se errou) ou na CA (se foi atingido). Pode mudar o resultado. Se mudar erro em acerto ou acerto em erro: teste plano CD 5; falha Dispensa o armamento.',
    actionType: 'reaction',
    trigger:
      'Um ataque seu com arma forjada erra, ou um ataque acerta você com armadura forjada vestida ou escudo forjado erguido.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 98,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9351',
  }),
  f({
    id: 'feat-soulforger-rapid',
    name: 'Manifestação Rápida',
    originalName: 'Rapid Manifestation',
    level: 6,
    archetypeId: 'archetype-soulforger',
    prereqId: DED_SOUL.id,
    prereqName: DED_SOUL.name,
    description: 'Manifeste o Armamento Forjado na Alma.',
    actionType: 'free',
    trigger: 'Você rola iniciativa ou um perigo ataca você.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 98,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9352',
  }),
  f({
    id: 'feat-soulforger-arsenal',
    name: 'Arsenal da Alma',
    originalName: 'Soul Arsenal',
    level: 6,
    archetypeId: 'archetype-soulforger',
    prereqId: DED_SOUL.id,
    prereqName: DED_SOUL.name,
    description:
      'Escolha um armamento extra de tipo diferente e um poder de essência. Ao Manifestar, pode convocar qualquer número. Cada um manifesta essência 1/dia. Pode pegar de novo no 12º com o terceiro tipo. Você escolhe; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'soulforger-arsenal-armament',
        options: [
          { id: 'armor', label: 'Armadura' },
          { id: 'shield', label: 'Escudo' },
          { id: 'weapon', label: 'Arma' },
        ],
        hint: 'Tipo diferente do que você já tem. O motor não escolhe.',
        abilityName: 'Arsenal extra: {choice}',
        abilityDescription: 'Poder de essência à parte. Você nomeia.',
      },
    ],
    repeatable: true,
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 98,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=393',
  }),
  f({
    id: 'feat-soulforger-devastating',
    name: 'Manifestação Devastadora',
    originalName: 'Devastating Manifestation',
    level: 14,
    archetypeId: 'archetype-soulforger',
    prereqId: DED_SOUL.id,
    prereqName: DED_SOUL.name,
    extraPrereq: [{ kind: 'text', label: 'Pelo menos um armamento não está manifestado' }],
    description:
      'Manifeste. Arma: até dois Golpes em alvos diferentes, +1d6 espírito cada. Armadura ou escudo: resistência 5 a todo dano até o próximo turno. Os dois: ambos os efeitos.',
    actionType: 'two',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 98,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9354',
  }),
]

const spellshifterArchetypeFeats: Feat[] = [
  f({
    id: DED_SHIFT.id,
    name: DED_SHIFT.name,
    originalName: 'Spellshifter Dedication',
    level: 2,
    archetypeId: 'archetype-spellshifter',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'arcana', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Arcana' },
    ],
    description:
      'Conduíte (objeto de volume leve, uma mão; você nomeia). Deslocar Magia (1 ação) e o deslocamento Dividir o Fardo. Teste de Arcana vs a CD da magia. Você escolhe o conduíte; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Deslocar Magia; conduíte',
        description:
          'Você nomeia o conduíte. 10 minutos para sintonizar outro se perder. Dividir o Fardo: Sustentar como se fosse o conjurador.',
        actionType: 'one',
      },
    ],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 102,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=394',
  }),
  f({
    id: 'feat-spellshifter-analyze',
    name: 'Analisar Magia',
    originalName: 'Analyze Magic',
    level: 4,
    archetypeId: 'archetype-spellshifter',
    prereqId: DED_SHIFT.id,
    prereqName: DED_SHIFT.name,
    description: 'Deslocamento Analisar Magia: Identificar Magia (sucesso ou crítico conforme o teste).',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 102,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=394',
  }),
  f({
    id: 'feat-spellshifter-elemental',
    name: 'Substituição Elemental',
    originalName: 'Elemental Substitution',
    level: 4,
    archetypeId: 'archetype-spellshifter',
    prereqId: DED_SHIFT.id,
    prereqName: DED_SHIFT.name,
    description:
      'Deslocamento Substituição Elemental: muda ácido, frio, eletricidade, fogo ou sônico para outro desses. Você escolhe o tipo na hora; o motor não escolhe.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 103,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=394',
  }),
  f({
    id: 'feat-spellshifter-subtle',
    name: 'Deslocamento Sutil',
    originalName: 'Subtle Shift',
    level: 4,
    archetypeId: 'archetype-spellshifter',
    prereqId: DED_SHIFT.id,
    prereqName: DED_SHIFT.name,
    description:
      'Se o teste de Arcana superar a CD de Percepção do conjurador, ele não aprende o efeito do deslocamento. Crítico: nem percebe que você deslocou.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 103,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=394',
  }),
  f({
    id: 'feat-spellshifter-dismantle',
    name: 'Desmontar Magia',
    originalName: 'Dismantle Spell',
    level: 6,
    archetypeId: 'archetype-spellshifter',
    prereqId: DED_SHIFT.id,
    prereqName: DED_SHIFT.name,
    description:
      'Deslocamento Desmontar Magia. Crítico: contrapõe se o posto for no máximo 1 acima da metade do seu nível (para cima). Sucesso: suprime até o seu próximo turno.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 103,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=394',
  }),
  f({
    id: 'feat-spellshifter-reactive',
    name: 'Deslocamento Reativo',
    originalName: 'Reactive Spellshift',
    level: 6,
    archetypeId: 'archetype-spellshifter',
    prereqId: DED_SHIFT.id,
    prereqName: DED_SHIFT.name,
    extraPrereq: [{ kind: 'text', label: 'Você segura o conduíte' }],
    description:
      'Tente Deslocar a magia mesmo sem os outros requisitos. O conjurador pode deixar a magia ser interrompida. Imune à sua reação por 10 minutos.',
    actionType: 'reaction',
    trigger: 'Uma criatura a 9 m conjura uma magia.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 103,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=9360',
  }),
  f({
    id: 'feat-spellshifter-enhance',
    name: 'Aprimorar Magia',
    originalName: 'Enhance Spell',
    level: 8,
    archetypeId: 'archetype-spellshifter',
    prereqId: DED_SHIFT.id,
    prereqName: DED_SHIFT.name,
    description:
      'Aliado disposto a 9 m ganha Ocultar Magia, Magia Não Letal, Alcance de Magia ou Ampliar Magia no próximo turno, se conjurar como primeira ação. Você escolhe o feito na hora; o motor não escolhe.',
    actionType: 'one',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 103,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=394',
  }),
  f({
    id: 'feat-spellshifter-redirect',
    name: 'Redirecionar Magia',
    originalName: 'Redirect Spell',
    level: 12,
    archetypeId: 'archetype-spellshifter',
    prereqId: DED_SHIFT.id,
    prereqName: DED_SHIFT.name,
    description:
      'Deslocamento Redirecionar Magia: muda um alvo para outro válido a 9 m de você. CD vira sua CD de Arcana. Você escolhe o novo alvo; o motor não escolhe.',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    sourcePage: 103,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=394',
  }),
]

export const archetypeFeatsGeneralRemaster14: Feat[] = [
  ...timeMageArchetypeFeats,
  ...psychicDuelistArchetypeFeats,
  ...livingNexusArchetypeFeats,
  ...soulforgerArchetypeFeats,
  ...spellshifterArchetypeFeats,
]
