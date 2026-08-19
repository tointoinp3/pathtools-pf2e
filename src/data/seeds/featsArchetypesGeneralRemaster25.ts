/** Gerais Remaster: Historiador Tatuado, Sombra Verduran, Spellshot, Senhor de Munições, Mago de Guerra. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import { CLASS_GUNSLINGER_ID, CLASS_INVENTOR_ID, CLASS_WIZARD_ID } from './ids'
import {
  SOURCE_BATTLECRY_ID,
  SOURCE_GUNS_GEARS_ID,
  SOURCE_PACTBREAKER_ID,
  SOURCE_RESURRECTION_FLOOD_ID,
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
    sourceId: opts.sourceId ?? SOURCE_GUNS_GEARS_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_TATTOO = {
  id: 'feat-tattooed-historian-dedication',
  name: 'Dedicação de Historiador Tatuado',
}
const DED_VERD = {
  id: 'feat-verduran-shadow-dedication',
  name: 'Dedicação de Sombra Verduran',
}
const DED_SPELLSHOT = {
  id: 'feat-spellshot-dedication',
  name: 'Dedicação de Spellshot',
}
const DED_MUN = {
  id: 'feat-munitions-master-dedication',
  name: 'Dedicação de Senhor de Munições',
}
const DED_WAR = {
  id: 'feat-war-mage-dedication',
  name: 'Dedicação de Mago de Guerra',
}

const SPELLSHOT_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-spellshot-archetype',
  label: 'Conjuração de Spellshot',
  style: 'prepared',
  tradition: 'arcane',
  attributeId: 'intelligence',
  proficiencyRank: 'trained',
  cantripsPerDay: 2,
  classOriginalName: 'Spellshot',
  features: { spellbook: true },
}

const TERRAIN_STALKER = [
  { id: 'rubble', label: 'Escombros' },
  { id: 'snow', label: 'Neve' },
  { id: 'underbrush', label: 'Matagal' },
]

const tattooedHistorianArchetypeFeats: Feat[] = [
  f({
    id: DED_TATTOO.id,
    name: DED_TATTOO.name,
    originalName: 'Tattooed Historian Dedication',
    level: 2,
    archetypeId: 'archetype-tattooed-historian',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'attribute', attributeId: 'constitution', min: 1 },
      {
        kind: 'text',
        label:
          'Constituição +1; treinado em Conhecimento de Belkzen, Conhecimento de Orc ou Conhecimento do Panteão Orc (ou, a critério do MJ, um Conhecimento relacionado)',
      },
    ],
    description:
      'Treinado em Diplomacia ou Performance; se já for treinado nas duas, treinado em uma perícia à sua escolha. Acesso a tatuagens mágicas incomuns com o traço orc. Ganha uma pele narrativa (storied skin) de graça (ou outra tatuagem mágica de 2º nível ou menor se já tiver pele narrativa). Só uma pele narrativa. A frequência de História Viva sobe em 1 uso por minuto a cada 3 feitos deste arquétipo. A cada 2 feitos deste arquétipo, pode investir uma tatuagem mágica que não conta no limite de itens investidos. Você escolhe a perícia e o Conhecimento que o qualifica; o motor não escolhe.',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'tattooed-historian-skill',
        rank: 'trained',
        skillOptions: ['diplomacy', 'performance'],
        replaceIfTrained: true,
        hint: 'Diplomacia ou Performance. Se já for treinado nas duas, escolha outra perícia. O motor não escolhe.',
      },
      {
        kind: 'textChoice',
        choiceId: 'tattooed-historian-lore',
        options: [
          { id: 'belkzen', label: 'Conhecimento de Belkzen' },
          { id: 'orc', label: 'Conhecimento de Orc' },
          { id: 'orc-pantheon', label: 'Conhecimento do Panteão Orc' },
          { id: 'related', label: 'Conhecimento relacionado (a critério do MJ)' },
        ],
        hint: 'Qual Conhecimento treinado o qualifica. O motor não escolhe.',
        abilityName: 'Conhecimento de historiador: {choice}',
        abilityDescription:
          'Pré-requisito. Não concede o posto; você já precisa ser treinado nesse Conhecimento.',
      },
      {
        kind: 'specialAbility',
        name: 'Pele narrativa',
        description:
          'Tatuagem de graça (ou outra de 2º ou menor se já tiver). Só uma pele narrativa. História Viva: +1 uso/minuto a cada 3 feitos deste arquétipo. A cada 2 feitos, uma tatuagem mágica investida extra (não conta no limite). Acesso a tatuagens mágicas incomuns com traço orc.',
      },
    ],
    sourceId: SOURCE_RESURRECTION_FLOOD_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7647',
  }),
  f({
    id: 'feat-tattooed-historian-agent-of-all-holds',
    name: 'Agente de Todos os Holds',
    originalName: 'Agent of All Holds',
    level: 2,
    archetypeId: 'archetype-tattooed-historian',
    rarity: 'uncommon',
    prereqId: DED_TATTOO.id,
    prereqName: DED_TATTOO.name,
    description:
      'Orcs de Belkzen reconhecem você como guardião de lendas. Falha crítica no teste vira falha. Se o teste foi contra criatura com traço orc, pode adicionar o traço fortuna e rolar de novo, tratando falha crítica como falha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Agente de todos os holds',
        actionType: 'reaction',
        description:
          'Falha crítica em Diplomacia, Intimidação ou Performance vira falha. Contra orc: fortuna, rerrolar; falha crítica ainda vira falha.',
      },
    ],
    actionType: 'reaction',
    trigger: 'Você obtém uma falha crítica em um teste de Diplomacia, Intimidação ou Performance.',
    sourceId: SOURCE_RESURRECTION_FLOOD_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7650',
  }),
  f({
    id: 'feat-tattooed-historian-inked-panoply',
    name: 'Panóplia Tatuada',
    originalName: 'Inked Panoply',
    level: 4,
    archetypeId: 'archetype-tattooed-historian',
    rarity: 'uncommon',
    prereqId: DED_TATTOO.id,
    prereqName: DED_TATTOO.name,
    description:
      'As tatuagens se animam e formam um escudeiro espectral. Gasta 1 uso da pele narrativa: +1 de circunstância na CA contra o ataque gatilho. Resistência a mental, espírito e vazio igual ao dobro do número de feitos de Historiador Tatuado contra esse ataque.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Panóplia tatuada',
        actionType: 'reaction',
        description:
          'Gasta 1 uso da pele narrativa. +1 de circunstância na CA contra o ataque. Resistência a mental, espírito e vazio = 2 × feitos deste arquétipo contra o ataque.',
      },
    ],
    actionType: 'reaction',
    trigger: 'Uma criatura escolhe você como alvo de um ataque e você pode ver o atacante.',
    sourceId: SOURCE_RESURRECTION_FLOOD_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7651',
  }),
  f({
    id: 'feat-tattooed-historian-infused-belkzen-might',
    name: 'Infuso com o Poder de Belkzen',
    originalName: "Infused with Belkzen's Might",
    level: 6,
    archetypeId: 'archetype-tattooed-historian',
    rarity: 'uncommon',
    prereqId: DED_TATTOO.id,
    prereqName: DED_TATTOO.name,
    description:
      'Gasta 1 uso de História Viva da pele narrativa. Até o fim do seu próximo turno, armas e ataques desarmados causam dano de espírito extra igual a 1 + metade do número de feitos de Historiador Tatuado.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Poder de Belkzen',
        actionType: 'two',
        description:
          'Gasta 1 uso de História Viva. Até o fim do próximo turno: +1 + metade dos feitos deste arquétipo de dano de espírito em armas e desarmados.',
      },
    ],
    actionType: 'two',
    sourceId: SOURCE_RESURRECTION_FLOOD_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7652',
  }),
  f({
    id: 'feat-tattooed-historian-inscribed-elders-deeds',
    name: 'Inscrito com Feitos dos Anciãos',
    originalName: "Inscribed with Elders' Deeds",
    level: 6,
    archetypeId: 'archetype-tattooed-historian',
    rarity: 'uncommon',
    prereqId: DED_TATTOO.id,
    prereqName: DED_TATTOO.name,
    description:
      'Nas preparações, reconfigura parte da pele narrativa para um herói orc: ganha um feito de ancestralidade de 1º com traço orc até as próximas preparações (não pode exigir traço fisiológico que você não tenha, a critério do MJ). É temporário: não serve de pré-requisito para opções permanentes. No 13º nível, pode ser um feito de ancestralidade de 5º com traço orc. Você escolhe o feito; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Feito orc temporário',
        description:
          'Nas preparações, um feito de ancestralidade orc de 1º (5º no 13º nível) até as próximas preparações. Temporário; não serve de pré-requisito. O jogador escolhe o feito.',
      },
    ],
    sourceId: SOURCE_RESURRECTION_FLOOD_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7653',
  }),
  f({
    id: 'feat-tattooed-historian-wrath-of-the-hold',
    name: 'Ira do Hold',
    originalName: 'Wrath of the Hold',
    level: 8,
    archetypeId: 'archetype-tattooed-historian',
    rarity: 'uncommon',
    prereqId: DED_TATTOO.id,
    prereqName: DED_TATTOO.name,
    description:
      'Gasta 1 uso de História Viva. Espíritos atacam inimigos num cone de 9 m: 4d6 de dano de espírito (salvaguarda básica de Vontade contra a maior entre CD de classe e CD de magia). +1d6 no 10º nível e a cada 2 níveis seguintes.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ira do hold',
        actionType: 'two',
        description:
          'Gasta 1 uso de História Viva. Cone 9 m: 4d6 espírito (+1d6 no 10º e a cada 2 níveis). Vontade básica contra a maior CD (classe ou magia).',
      },
    ],
    actionType: 'two',
    sourceId: SOURCE_RESURRECTION_FLOOD_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7654',
  }),
]

const verduranShadowArchetypeFeats: Feat[] = [
  f({
    id: DED_VERD.id,
    name: DED_VERD.name,
    originalName: 'Verduran Shadow Dedication',
    level: 2,
    archetypeId: 'archetype-verduran-shadow',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained' },
      { kind: 'skillRank', skillId: 'survival', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Furtividade e Sobrevivência' },
    ],
    description:
      'Perito em Sobrevivência. Pode substituir o posto de Sobrevivência pelo de Furtividade para pré-requisitos de feitos e benefícios extras de perito/mestre/lendário em Furtividade; se não cumprir o pré-requisito de Furtividade, só usa esses feitos em terreno de floresta. Em florestas, usa o modificador de Sobrevivência no lugar de Furtividade para Evitar Atenção, Esconder-se, Furtar-se ou iniciativa de Furtividade. Especial: não pegue outra Dedicação até dois feitos deste arquétipo. O motor aplica o posto de Sobrevivência.',
    effects: [
      { kind: 'skillRank', skillId: 'survival', rank: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Correntes primordiais',
        description:
          'Posto de Sobrevivência vale como Furtividade para pré-requisitos e benefícios de posto (só floresta se não for treinado o bastante em Furtividade). Em floresta: Sobrevivência no lugar de Furtividade para Evitar Atenção, Esconder-se, Furtar-se e iniciativa.',
      },
    ],
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7606',
  }),
  f({
    id: 'feat-verduran-shadow-canopy-predator',
    name: 'Predador da Copa',
    originalName: 'Canopy Predator',
    level: 4,
    archetypeId: 'archetype-verduran-shadow',
    rarity: 'uncommon',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    description:
      'Deslocamento de escalada de 4,5 m em árvores, cipós e folhagem. Sucesso em Atletismo para Escalar uma árvore ou Acrobacia para Equilibrar-se num galho vira sucesso crítico. Não fica desprevenido ao Escalar ou Equilibrar-se numa árvore.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Predador da copa',
        description:
          'Escalada 4,5 m em árvores/cipós/folhagem. Sucesso em Escalar árvore ou Equilibrar-se em galho vira crítico. Não desprevenido ao Escalar ou Equilibrar-se em árvore.',
      },
    ],
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7607',
  }),
  f({
    id: 'feat-verduran-shadow-underbrush-trailblazer',
    name: 'Desbravador do Matagal',
    originalName: 'Underbrush Trailblazer',
    level: 4,
    archetypeId: 'archetype-verduran-shadow',
    rarity: 'uncommon',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    description:
      'Ganha Espreitador do Terreno (matagal); se já tiver matagal, escolha outro tipo de terreno difícil. Se Evitar Atenção e aliados usarem Seguir o Especialista, estende o benefício a 1 aliado a até 3 m. Mestre em Furtividade: 2 aliados. Lendário: 4. Você escolhe o terreno; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'verduran-terrain-stalker',
        options: TERRAIN_STALKER,
        hint: 'O livro sugere matagal; se já tiver Espreitador (matagal), escolha outro. O motor não escolhe.',
        abilityName: 'Espreitador do Terreno ({choice})',
        abilityDescription:
          'Nesse terreno, enquanto não detectado por não-aliados, pode Furtar-se sem teste se mover no máximo 1,5 m e não passar a 3 m de um inimigo. Evitar Atenção + Seguir o Especialista: 1 aliado a 3 m (2 se mestre em Furtividade, 4 se lendário).',
      },
    ],
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7608',
  }),
  f({
    id: 'feat-verduran-shadow-fleeting-shadow',
    name: 'Sombra Fugaz',
    originalName: 'Fleeting Shadow',
    level: 6,
    archetypeId: 'archetype-verduran-shadow',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de batedor' }],
    description: 'Esconda-se e então Furtive-se duas vezes.',
    actionType: 'two',
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=261',
  }),
  f({
    id: 'feat-verduran-shadow-sneak-attacker',
    name: 'Atacante Furtivo',
    originalName: 'Sneak Attacker',
    level: 6,
    archetypeId: 'archetype-verduran-shadow',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de batedor/ladino' }],
    description:
      'Ganha Ataque Furtivo, mas causa 1d4 (1d6 no 6º nível). Os dados não aumentam com o nível além disso.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ataque Furtivo',
        description:
          '1d4 de precisão extra contra desprevenido ou flanqueado com arma ágil/acerto ou desarmado ágil (1d6 no 6º). Sem dados extras além disso.',
      },
    ],
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5094',
  }),
  f({
    id: 'feat-verduran-shadow-verduran-ambush',
    name: 'Emboscada Verduran',
    originalName: 'Verduran Ambush',
    level: 6,
    archetypeId: 'archetype-verduran-shadow',
    rarity: 'uncommon',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    description:
      'Prepare uma atividade de 2 ações: deve ser Morte do Alto ou uma atividade que exija estar escondido ou indetectado por todos os oponentes (como Salto do Batedor). Depois de usar a reação, não pode usar este feito por 10 minutos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Emboscada Verduran',
        actionType: 'three',
        description:
          'Prepare atividade de 2 ações (Morte do Alto ou atividade que exija escondido/indetectado). Após a reação: 10 minutos.',
      },
    ],
    actionType: 'three',
    frequency: 'depois da reação, 10 minutos',
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7609',
  }),
  f({
    id: 'feat-verduran-shadow-death-from-above',
    name: 'Morte do Alto',
    originalName: 'Death from Above',
    level: 8,
    archetypeId: 'archetype-verduran-shadow',
    rarity: 'uncommon',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    extraPrereq: [
      {
        kind: 'feat',
        featId: 'feat-verduran-shadow-canopy-predator',
        featName: 'Predador da Copa',
      },
      { kind: 'skillRank', skillId: 'athletics', rank: 'expert' },
      {
        kind: 'text',
        label:
          'Predador da Copa; perito em Atletismo; em pé, escalando ou equilibrando-se numa superfície ao menos 3 m acima do alvo',
      },
    ],
    description:
      'Teste de Atletismo para Saltar a um espaço adjacente ao alvo. Se aterrissar adjacente, compare o resultado à CD de Reflexos do alvo. Não causa dano de queda na criatura. O alvo fica imune à sua Morte do Alto por 1 minuto. Crítico: alvo cai e fica caído; reduz dano de queda em 2× nível; Golpe corpo a corpo com mortal d8 e +1d6 concussão (2d6 se mestre em Atletismo, 3d6 se lendário). Sucesso: alvo desprevenido até o início do seu próximo turno; reduz dano de queda no seu nível; Golpe corpo a corpo com mortal d8. Falha: pode Golpear. Falha crítica: você cai, tome ou não dano de queda.',
    actionType: 'two',
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7610',
  }),
  f({
    id: 'feat-verduran-shadow-scouts-pounce',
    name: 'Salto do Batedor',
    originalName: "Scout's Pounce",
    level: 10,
    archetypeId: 'archetype-verduran-shadow',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de batedor' },
      {
        kind: 'text',
        label:
          'Escondido ou indetectado por todos os oponentes, e a pelo menos 3 m de qualquer inimigo',
      },
    ],
    description:
      'Desloque-se até o Deslocamento e Golpeie duas vezes. Se estava escondido ou despercebido pelo alvo, ele fica desprevenido contra os dois ataques. Penalidade de ataque múltiplo normal.',
    actionType: 'two',
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6399',
  }),
  f({
    id: 'feat-verduran-shadow-sense-the-strike',
    name: 'Sentir o Golpe',
    originalName: 'Sense the Strike',
    level: 10,
    archetypeId: 'archetype-verduran-shadow',
    rarity: 'uncommon',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'survival', rank: 'master' },
      { kind: 'text', label: 'Mestre em Sobrevivência' },
    ],
    description:
      'O ataque gatilho mira sua CD de Sobrevivência em vez da CA. Evita penalidades na CA, mas não remove condições ou outros efeitos que as causem (ataque furtivo ainda causa dano extra se você estiver desprevenido, mesmo sem a −2 de circunstância).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sentir o golpe',
        actionType: 'reaction',
        description:
          'O ataque usa CD de Sobrevivência no lugar da CA. Penalidades de CA não se aplicam ao teste; condições (desprevenido etc.) continuam valendo para outros efeitos.',
      },
    ],
    actionType: 'reaction',
    trigger: 'Uma criatura escolhe você como alvo de um ataque e você pode ver o atacante.',
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 80,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7611',
  }),
  f({
    id: 'feat-verduran-shadow-camouflage',
    name: 'Camuflagem',
    originalName: 'Camouflage',
    level: 12,
    archetypeId: 'archetype-verduran-shadow',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de patrulheiro; mestre em Furtividade' },
    ],
    description:
      'Em terreno natural, pode Esconder-se e Furtar-se mesmo sem cobertura ou estar oculto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Camuflagem',
        description: 'Em terreno natural: Esconder-se e Furtar-se sem cobertura nem oculto.',
      },
    ],
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4887',
  }),
  f({
    id: 'feat-verduran-shadow-sneak-adept',
    name: 'Adepto da Furtividade',
    originalName: 'Sneak Adept',
    level: 12,
    archetypeId: 'archetype-verduran-shadow',
    prereqId: DED_VERD.id,
    prereqName: DED_VERD.name,
    extraPrereq: [
      { kind: 'text', label: 'Feito adicional de ladino; mestre em Furtividade' },
    ],
    description:
      'Falha em Furtar-se vira sucesso. Ainda pode obter falha crítica.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Adepto da furtividade',
        description: 'Falha em Furtar-se vira sucesso. Falha crítica continua falha crítica.',
      },
    ],
    sourceId: SOURCE_PACTBREAKER_ID,
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4964',
  }),
]

const spellshotArchetypeFeats: Feat[] = [
  f({
    id: DED_SPELLSHOT.id,
    name: DED_SPELLSHOT.name,
    originalName: 'Spellshot Dedication',
    level: 2,
    archetypeId: 'archetype-spellshot',
    isDedication: true,
    classId: CLASS_GUNSLINGER_ID,
    rarity: 'uncommon',
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_GUNSLINGER_ID },
      { kind: 'text', label: 'Caminho do Spellshot (way of the spellshot)' },
    ],
    description:
      'Conjura magias arcanas como mago: grimório com 4 truques arcanos comuns à sua escolha; Conjurar uma Magia; prepara 2 truques por dia. Treinado em ataque e CD de magia. Atributo-chave: Inteligência; tradição arcana. Treinado em Arcana; se já for, treinado em uma perícia à sua escolha. Conta como arquétipo de mago para os benefícios de Conjuração Básica de Mago. Especial: não pegue outra Dedicação além de Dedicação de Atirador de Arma-Besta até dois feitos de Spellshot ou Atirador de Arma-Besta. Você escolhe os truques e, se Arcana já for treinada, a outra perícia; o motor não escolhe. Tradição e atributo são arcanos e Inteligência (o livro não oferece escolha).',
    effects: [
      { kind: 'skillRank', skillId: 'arcana', rank: 'trained', replaceIfTrained: true },
      { kind: 'spellcasting', access: SPELLSHOT_SPELL },
      {
        kind: 'specialAbility',
        name: 'Grimório de Spellshot',
        description:
          '4 truques arcanos comuns no grimório; prepara 2 por dia. O jogador escolhe os truques.',
      },
    ],
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3267',
  }),
  f({
    id: 'feat-spellshot-basic-arcana',
    name: 'Arcana Básica',
    originalName: 'Basic Arcana',
    level: 4,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    prereqId: DED_SPELLSHOT.id,
    prereqName: DED_SPELLSHOT.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de mago' }],
    description:
      'Ganha um feito de mago de 1º ou 2º nível à sua escolha. Você escolhe o feito; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Feito de mago (1º ou 2º)',
        description: 'O jogador escolhe o feito de mago. O motor não escolhe.',
      },
    ],
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5108',
  }),
  f({
    id: 'feat-spellshot-basic-wizard-spellcasting',
    name: 'Conjuração Básica de Mago',
    originalName: 'Basic Wizard Spellcasting',
    level: 4,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    prereqId: DED_SPELLSHOT.id,
    prereqName: DED_SPELLSHOT.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de mago' }],
    description:
      'Ganha os benefícios de conjuração básica. Cada vez que ganhar um espaço de um posto novo deste arquétipo, adicione 2 magias comuns desse posto ao grimório. Você escolhe as magias; o motor não escolhe.',
    effects: [
      { kind: 'spellcastingTier', sourceId: SPELLSHOT_SPELL.id, tier: 'basic' },
      {
        kind: 'specialAbility',
        name: 'Magias do grimório',
        description:
          'A cada posto novo de espaço deste arquétipo, 2 magias comuns desse posto no grimório. O jogador escolhe.',
      },
    ],
    sourcePage: 140,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5109',
  }),
  f({
    id: 'feat-spellshot-spell-woven-shot',
    name: 'Tiro Tecelão de Magia',
    originalName: 'Spell-Woven Shot',
    level: 4,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    prereqId: DED_SPELLSHOT.id,
    prereqName: DED_SPELLSHOT.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Empunha uma arma de fogo ou besta mágica carregada',
      },
    ],
    description:
      'Ganha a atividade Tiro Tecelão de Magia (3 ações). Requisito: empunha arma de fogo ou besta mágica carregada. Conjure uma magia de 1 ou 2 ações que exija teste de ataque de magia; o efeito não ocorre na hora — imbuído na arma. Golpeie com essa arma. O teste resolve Golpe e magia. Conta como dois ataques; a penalidade de ataque múltiplo só aplica depois.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tiro Tecelão de Magia',
        actionType: 'three',
        description:
          'Conjure magia de 1–2 ações com ataque de magia na munição; Golpeie. Um teste resolve os dois. Dois ataques; penalidade só depois.',
      },
    ],
    actionType: 'three',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7437',
  }),
  f({
    id: 'feat-spellshot-advanced-arcana',
    name: 'Arcana Avançada',
    originalName: 'Advanced Arcana',
    level: 6,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    prereqId: 'feat-spellshot-basic-arcana',
    prereqName: 'Arcana Básica',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de mago' }],
    description:
      'Ganha um feito de mago. Para pré-requisitos, seu nível de mago é metade do nível do personagem. Especial: pode pegar de novo. Você escolhe o feito; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Feito de mago',
        description:
          'Nível de mago = metade do nível do personagem para pré-requisitos. O jogador escolhe o feito.',
      },
    ],
    repeatable: true,
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5110',
  }),
  f({
    id: 'feat-spellshot-fulminating-shot',
    name: 'Tiro Fulminante',
    originalName: 'Fulminating Shot',
    level: 6,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    traits: ['Arquétipo', 'Mágico'],
    prereqId: DED_SPELLSHOT.id,
    prereqName: DED_SPELLSHOT.name,
    description:
      'Escolha ácido, frio, eletricidade ou fogo. Se acertar o próximo teste de ataque com arma de fogo ou besta até o fim do turno, causa +1d6 desse tipo (2d6 no 12º, 3d6 no 18º). Você escolhe o tipo a cada uso; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tiro fulminante',
        actionType: 'one',
        description:
          'Ácido, frio, eletricidade ou fogo no próximo acerto de arma de fogo/besta neste turno: +1d6 (2d6 no 12º, 3d6 no 18º). O jogador escolhe o tipo.',
      },
    ],
    actionType: 'one',
    frequency: '1 vez por rodada',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3268',
  }),
  f({
    id: 'feat-spellshot-arcane-breadth',
    name: 'Amplitude Arcana',
    originalName: 'Arcane Breadth',
    level: 8,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    prereqId: 'feat-spellshot-basic-wizard-spellcasting',
    prereqName: 'Conjuração Básica de Mago',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de mago' }],
    description:
      'Aumenta em 1 os espaços de magia deste arquétipo em cada posto, exceto os dois postos mais altos.',
    effects: [{ kind: 'spellSlotBreadth', sourceId: SPELLSHOT_SPELL.id }],
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5111',
  }),
  f({
    id: 'feat-spellshot-call-gun',
    name: 'Chamar Arma',
    originalName: 'Call Gun',
    level: 8,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    traits: ['Arquétipo', 'Mágico', 'Teleporte'],
    prereqId: DED_SPELLSHOT.id,
    prereqName: DED_SPELLSHOT.name,
    description:
      'Nas preparações, escolha uma arma de fogo ou besta. Até as próximas preparações, Chamar Arma (1 ação, mágico): mão livre; a arma escolhida aparece na mão se estiver no mesmo plano. Você escolhe a arma; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Chamar Arma',
        actionType: 'one',
        description:
          'A arma escolhida nas preparações aparece na mão livre, se estiver no mesmo plano.',
      },
    ],
    actionType: 'one',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3269',
  }),
  f({
    id: 'feat-spellshot-expert-wizard-spellcasting',
    name: 'Conjuração Experiente de Mago',
    originalName: 'Expert Wizard Spellcasting',
    level: 12,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    prereqId: 'feat-spellshot-basic-wizard-spellcasting',
    prereqName: 'Conjuração Básica de Mago',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'arcana', rank: 'master' },
      { kind: 'text', label: 'Feito adicional de mago; mestre em Arcana' },
    ],
    description: 'Ganha os benefícios de conjuração perita.',
    effects: [{ kind: 'spellcastingTier', sourceId: SPELLSHOT_SPELL.id, tier: 'expert' }],
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5112',
  }),
  f({
    id: 'feat-spellshot-phase-bullet',
    name: 'Bala de Fase',
    originalName: 'Phase Bullet',
    level: 14,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    traits: ['Arquétipo', 'Mágico'],
    prereqId: DED_SPELLSHOT.id,
    prereqName: DED_SPELLSHOT.name,
    description:
      'Golpe de besta ou arma de fogo contra inimigo observado ou escondido (não indetectado). A munição atravessa barreiras e paredes não mágicas em linha reta; barreiras mágicas e efeitos de força param. Ignora cobertura, oculto, escondido e bônus de circunstância na CA de escudos. +4 de status para acertar criaturas com qualquer armadura. O dano não pode ser reduzido por Bloqueio com Escudo de escudo não mágico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Bala de fase',
        actionType: 'one',
        description:
          'Atravessa não-mágico. Ignora cobertura, oculto, escondido e bônus de escudo. +4 de status vs armadura. Sem Bloqueio com Escudo não mágico.',
      },
    ],
    actionType: 'one',
    frequency: '1 vez por dia',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3270',
  }),
  f({
    id: 'feat-spellshot-black-powder-embodiment',
    name: 'Encarnação da Pólvora Negra',
    originalName: 'Black Powder Embodiment',
    level: 18,
    archetypeId: 'archetype-spellshot',
    classId: CLASS_GUNSLINGER_ID,
    traits: ['Arquétipo', 'Teleporte'],
    prereqId: DED_SPELLSHOT.id,
    prereqName: DED_SPELLSHOT.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'arcana', rank: 'master' },
      {
        kind: 'text',
        label: 'Mestre em Arcana; empunha arma de fogo ou besta mágica carregada',
      },
    ],
    description:
      'Golpeie uma criatura com a arma exigida. Em um sucesso, se o alvo estava a até 36 m, você e seu equipamento se teleportam para um espaço livre à sua escolha a até 3 m do alvo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Encarnação da pólvora negra',
        actionType: 'two',
        description:
          'Golpeie. Sucesso e alvo a ≤ 36 m: teleporte você e o equipamento para um espaço livre a ≤ 3 m do alvo. Você escolhe o espaço.',
      },
    ],
    actionType: 'two',
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3271',
  }),
]

const munitionsMasterArchetypeFeats: Feat[] = [
  f({
    id: DED_MUN.id,
    name: DED_MUN.name,
    originalName: 'Munitions Master Dedication',
    level: 2,
    archetypeId: 'archetype-munitions-master',
    isDedication: true,
    classId: CLASS_INVENTOR_ID,
    rarity: 'uncommon',
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_INVENTOR_ID },
      { kind: 'text', label: 'Inovação de morteiro leve (light mortar)' },
    ],
    description:
      'Ganha Eficiência do Engenheiro (1 ação; 1 vez por turno; adjacente ao morteiro leve: Mire e então Carregue ou Dispare). O morteiro leve (inovação, 2 Bulk) é arma de cerco montada: Interagir para desdobrar; recolher é atividade de 2 ações (manipular). Mover Máquina de Cerco custa 1 ação desdobrado. Dano extra de dado no 5º e a cada 4 níveis. Disparo: Reflexos = CD de classe; área 3 m de explosão. CA = CD de inventor; Dureza 5 (10/15/20 nos 5º/10º/15º). PV 10 + (2 + INT) × nível; limiar quebrado metade. Reflexos e Fortitude treinados (perito 10º, mestre 15º) com INT. Overdrive e Impulso Ofensivo valem nos Disparos. Você escolhe a modificação inicial do morteiro; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Eficiência do Engenheiro',
        actionType: 'one',
        description:
          '1 vez por turno, adjacente ao morteiro: Mire e então Carregue ou Dispare.',
      },
      {
        kind: 'specialAbility',
        name: 'Morteiro leve',
        description:
          'Inovação de cerco 2 Bulk. Dureza 5/10/15/20 (1º/5º/10º/15º). PV 10+(2+INT)×nível. Reflexos/Fortitude com INT (perito 10º, mestre 15º). +1 dado de dano no 5º e a cada 4 níveis. Overdrive e Impulso Ofensivo nos Disparos. Modificação inicial à escolha do jogador.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 64,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7958',
  }),
  f({
    id: 'feat-munitions-master-focused-fire',
    name: 'Fogo Concentrado',
    originalName: 'Focused Fire',
    level: 4,
    archetypeId: 'archetype-munitions-master',
    classId: CLASS_INVENTOR_ID,
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_MUN.id,
    prereqName: DED_MUN.name,
    description:
      'Dispare o morteiro leve mirando um único quadrado. A explosão fica limitada a esse quadrado, mas causa um dado extra de dano.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fogo concentrado',
        actionType: 'one',
        description: 'Disparo num quadrado: área só aquele quadrado, +1 dado de dano.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7959',
  }),
  f({
    id: 'feat-munitions-master-wrapped-in-smoke',
    name: 'Envolto em Fumaça',
    originalName: 'Wrapped in Smoke',
    level: 4,
    archetypeId: 'archetype-munitions-master',
    classId: CLASS_INVENTOR_ID,
    prereqId: DED_MUN.id,
    prereqName: DED_MUN.name,
    description:
      'Nuvem de fumaça numa emanação de 1,5 m centrada na inovação, 1 minuto. Criaturas e objetos na fumaça ficam ocultos; quem está fora fica oculto para quem está dentro.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Envolto em fumaça',
        actionType: 'one',
        description:
          'Emanação 1,5 m na inovação, 1 minuto. Oculto dentro; quem está fora fica oculto para quem está dentro.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7960',
  }),
  f({
    id: 'feat-munitions-master-field-artillery',
    name: 'Artilharia de Campo',
    originalName: 'Field Artillery',
    level: 6,
    archetypeId: 'archetype-munitions-master',
    classId: CLASS_INVENTOR_ID,
    prereqId: DED_MUN.id,
    prereqName: DED_MUN.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'expert' },
      { kind: 'text', label: 'Feito adicional de artilheiro; perito em Ofício' },
    ],
    description:
      'Interaja com uma arma de cerco montada adjacente: o Deslocamento dela aumenta em 3 m por 1 rodada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Artilharia de campo',
        actionType: 'one',
        description: 'Arma de cerco montada adjacente: +3 m de Deslocamento por 1 rodada.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3226',
  }),
  f({
    id: 'feat-munitions-master-siege-celerity',
    name: 'Celeridade de Cerco',
    originalName: 'Siege Celerity',
    level: 6,
    archetypeId: 'archetype-munitions-master',
    classId: CLASS_INVENTOR_ID,
    traits: ['Arquétipo', 'Instável'],
    prereqId: DED_MUN.id,
    prereqName: DED_MUN.name,
    description:
      'Você fica acelerado neste turno. A ação extra só serve para Carregar ou Disparar o morteiro leve. Não ignora o limite de um Disparo por rodada. Instável: teste simples CD 15 (13 se lendário em Ofício) após o efeito.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Celeridade de cerco',
        actionType: 'free',
        description:
          'Acelerado neste turno; ação extra só para Carregar ou Disparar o morteiro. 1 Disparo por rodada. Instável.',
      },
    ],
    actionType: 'free',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7961',
  }),
  f({
    id: 'feat-munitions-master-recoiling-relocation',
    name: 'Relocação de Recuo',
    originalName: 'Recoiling Relocation',
    level: 8,
    archetypeId: 'archetype-munitions-master',
    classId: CLASS_INVENTOR_ID,
    traits: ['Arquétipo', 'Ímpeto', 'Instável'],
    prereqId: DED_MUN.id,
    prereqName: DED_MUN.name,
    extraPrereq: [{ kind: 'text', label: 'Adjacente ao morteiro leve' }],
    description:
      'Você e o morteiro leve se movem até o Deslocamento do morteiro na direção à sua escolha. Deve terminar adjacente à inovação. Instável.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Relocação de recuo',
        actionType: 'free',
        description:
          'Você e o morteiro se movem até o Deslocamento do morteiro. Termine adjacente. Instável.',
      },
    ],
    actionType: 'free',
    trigger: 'Você Dispara o morteiro leve.',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7962',
  }),
  f({
    id: 'feat-munitions-master-burrowing-shot',
    name: 'Tiro Enterrador',
    originalName: 'Burrowing Shot',
    level: 10,
    archetypeId: 'archetype-munitions-master',
    classId: CLASS_INVENTOR_ID,
    prereqId: DED_MUN.id,
    prereqName: DED_MUN.name,
    description:
      'Dispare o morteiro leve: metade do dano em criaturas na explosão, dobro do dano em objetos e estruturas.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tiro enterrador',
        actionType: 'one',
        description: 'Disparo: metade do dano em criaturas; dobro em objetos e estruturas.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7963',
  }),
  f({
    id: 'feat-munitions-master-master-siege-engineer',
    name: 'Mestre Engenheiro de Cerco',
    originalName: 'Master Siege Engineer',
    level: 16,
    archetypeId: 'archetype-munitions-master',
    classId: CLASS_INVENTOR_ID,
    prereqId: DED_MUN.id,
    prereqName: DED_MUN.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de artilheiro' }],
    description:
      'Permanentemente acelerado. A ação extra só serve para Mirar ou Disparar uma arma de cerco.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Acelerado (cerco)',
        description: 'Ação extra só para Mirar ou Disparar arma de cerco.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 65,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=329',
  }),
]

const warMageArchetypeFeats: Feat[] = [
  f({
    id: DED_WAR.id,
    name: DED_WAR.name,
    originalName: 'War Mage Dedication',
    level: 2,
    archetypeId: 'archetype-war-mage',
    isDedication: true,
    classId: CLASS_WIZARD_ID,
    rarity: 'uncommon',
    traits: ['Arquétipo', 'Dedicação', 'Classe'],
    extraPrereq: [
      { kind: 'class', classId: CLASS_WIZARD_ID },
      { kind: 'text', label: 'Escola Magia de Batalha (Mago de Guerra) no 1º nível' },
    ],
    description:
      'Arquétipo de classe de mago (escola Magia de Batalha). Treinado em armadura leve e média; no 11º, perito em leve, média e defesa sem armadura. Familiaridade com armas marciais (contam como simples). Bloqueio com Escudo. Magia de Guerra: 1 vez por rodada, no início do turno, ação livre para trocar uma magia memorizada por golpe certeiro (sure strike) no mesmo posto. Ao conjurar magia que não seja truque e cause dano em área, escolha um número de alvos igual ao modificador de Inteligência que falharam na salvaguarda: mova cada um até 3 m após o dano (não através de obstáculos; Médio = 1, Grande = 2, Enorme = 4; Gárgantua não). Conhecimento Adicional de Guerra (sobe em 3, 7 e 15; se já era treinado, também outro Conhecimento à sua escolha — nomeie na ficha). Sem vínculo arcano nem tese clássica. O motor aplica armadura, armas e Conhecimento de Guerra.',
    effects: [
      { kind: 'defenseRank', categories: ['light', 'medium'], rank: 'trained' },
      { kind: 'weaponFamiliarity', martialAsSimple: true },
      { kind: 'lore', loreName: 'Guerra', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional (Guerra)',
        description:
          'Sobe sozinho nos níveis 3, 7 e 15. Se já era treinado em Conhecimento de Guerra, também outro Conhecimento à sua escolha (nomeie; o motor não escolhe).',
      },
      {
        kind: 'specialAbility',
        name: 'Bloqueio com Escudo',
        description: 'Ganha o feito geral Bloqueio com Escudo.',
      },
      {
        kind: 'specialAbility',
        name: 'Magia de Guerra',
        actionType: 'free',
        description:
          '1 vez por rodada no início do turno: troque uma magia memorizada por golpe certeiro no mesmo posto. Refoco: estudar planos de guerra, mapas e relatórios de um conflito ativo.',
      },
      {
        kind: 'specialAbility',
        name: 'Perito em armadura (11º)',
        description: 'No 11º nível: perito em armadura leve, média e defesa sem armadura.',
      },
      {
        kind: 'specialAbility',
        name: 'Deslocar formação',
        description:
          'Magia não-truque com dano em área: mova até o modificador de INT alvos que falharam até 3 m. Médio 1, Grande 2, Enorme 4; Gárgantua não.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7976',
  }),
  f({
    id: 'feat-war-mage-mages-field-dressing',
    name: 'Curativo de Campo do Mago',
    originalName: "Mage's Field Dressing",
    level: 4,
    archetypeId: 'archetype-war-mage',
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    extraPrereq: [{ kind: 'text', label: 'Medicina de Batalha (Battle Medicine)' }],
    description:
      'Requisito: a ação anterior foi Conjurar uma Magia de um espaço de magia de classe, e a magia afetou um aliado a até 18 m. Use Medicina de Batalha nesse aliado. Não precisa empunhar ou vestir kit de curandeiro: conjura fios, ataduras ou similar de magia pura (Medicina de Batalha ganha o traço arcano).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Curativo de campo do mago',
        actionType: 'one',
        description:
          'Após conjurar magia de espaço de classe num aliado a ≤ 18 m: Medicina de Batalha nesse aliado, sem kit; traço arcano.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7977',
  }),
  f({
    id: 'feat-war-mage-shield-spell-reinforcement',
    name: 'Reforço da Magia Escudo',
    originalName: 'Shield Spell Reinforcement',
    level: 4,
    archetypeId: 'archetype-war-mage',
    traits: ['Arquétipo', 'Forma de Magia'],
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    extraPrereq: [
      { kind: 'text', label: 'Você pode conjurar o truque escudo; empunha um escudo' },
    ],
    description:
      'Se a próxima ação for conjurar o truque escudo, use o escudo como lócus: barreira mágica na forma de uma projeção de força do escudo. Pode conceder os benefícios a um aliado adjacente em vez de a você. Se o aliado sofreria dano de ataque físico sob o truque, você pode usar reação para Bloqueio com Escudo com a magia em nome dele.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Reforço da magia escudo',
        actionType: 'free',
        description:
          'Próxima ação: truque escudo via escudo físico. Pode proteger aliado adjacente; reação para Bloqueio com Escudo da magia por ele.',
      },
    ],
    actionType: 'free',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7978',
  }),
  f({
    id: 'feat-war-mage-siege-ritualist',
    name: 'Ritualista de Cerco',
    originalName: 'Siege Ritualist',
    level: 4,
    archetypeId: 'archetype-war-mage',
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    description:
      '+2 de circunstância em testes de Conhecimento de Guerra como conjurador de ritual. Aprende um ritual de cerco de 2º posto ou menor (precisa cumprir os pré-requisitos de conjurador primário). No 8º e a cada 4 níveis, outro ritual de cerco com posto máximo igual à metade do nível. Você escolhe os rituais; o motor não escolhe.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'testes de Conhecimento de Guerra como conjurador de ritual',
      },
      {
        kind: 'specialAbility',
        name: 'Rituais de cerco',
        description:
          'Um ritual de cerco ≤ 2º posto agora; outro no 8º e a cada 4 níveis (posto máx. metade do nível). O jogador escolhe os rituais.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7979',
  }),
  f({
    id: 'feat-war-mage-arcana-of-iron',
    name: 'Arcana de Ferro',
    originalName: 'Arcana of Iron',
    level: 6,
    archetypeId: 'archetype-war-mage',
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    extraPrereq: [{ kind: 'text', label: 'Golpes Enfeitiçados (Bespell Strikes)' }],
    description:
      'Treinado em armas avançadas. Se ganhar o recurso de classe perícia em armas, o posto em marciais e avançadas sobe para perito. O dano extra de Golpes Enfeitiçados sobe para 1d8.',
    effects: [
      { kind: 'attackRank', categories: ['advanced'], rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Arcana de ferro',
        description:
          'Se ganhar perícia em armas: perito em marciais e avançadas. Golpes Enfeitiçados: +1d8 em vez do extra normal.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7980',
  }),
  f({
    id: 'feat-war-mage-intimidating-spell',
    name: 'Magia Intimidante',
    originalName: 'Intimidating Spell',
    level: 6,
    archetypeId: 'archetype-war-mage',
    traits: ['Arquétipo', 'Concentração', 'Emoção', 'Mental', 'Forma de Magia'],
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    description:
      'Se a próxima ação for Conjurar uma Magia que cause dano em área, qualquer alvo que falhe na salvaguarda também fica amedrontado 1 (amedrontado 2 em falha crítica).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magia intimidante',
        actionType: 'one',
        description:
          'Próxima magia com dano em área: falha = amedrontado 1; falha crítica = amedrontado 2.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7981',
  }),
  f({
    id: 'feat-war-mage-shielding-formation',
    name: 'Formação Protetora',
    originalName: 'Shielding Formation',
    level: 8,
    archetypeId: 'archetype-war-mage',
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    description: 'Ganha a magia de foco formação protetora (shielding formation). Reserva de foco 1 se ainda não tiver.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Formação protetora',
        description: 'Magia de foco formação protetora (shielding formation).',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7982',
  }),
  f({
    id: 'feat-war-mage-spellshield',
    name: 'Escudo de Magia',
    originalName: 'Spellshield',
    level: 8,
    archetypeId: 'archetype-war-mage',
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    description:
      'Ganha vínculo arcano e a ação Drenar Item Vinculado. O item vinculado deve ser um escudo. Nas preparações, pode preparar uma magia a menos para infundi-la no escudo (posto ao menos 1 abaixo do espaço mais alto). Ao Drenar o Item Vinculado para Conjurar, essa magia é automaticamente elevada ao posto infundido, qualquer que fosse o posto original. Você escolhe a magia infundida; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Escudo vinculado',
        description:
          'Vínculo arcano num escudo. Nas preparações, 1 magia a menos (posto ≤ máximo−1) infundida. Drenar Item Vinculado eleva essa magia ao posto infundido. O jogador escolhe a magia.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7983',
  }),
  f({
    id: 'feat-war-mage-secrets-of-steel',
    name: 'Segredos do Aço',
    originalName: 'Secrets of Steel',
    level: 10,
    archetypeId: 'archetype-war-mage',
    prereqId: 'feat-war-mage-arcana-of-iron',
    prereqName: 'Arcana de Ferro',
    description:
      'Ao usar Golpes Enfeitiçados, ganha o efeito de especialização crítica da arma ou ataque desarmado escolhido. Acerto crítico com ataque modificado por Golpes Enfeitiçados: +1d8 do mesmo tipo do dano extra de Golpes Enfeitiçados; esse dano entra depois de todos os outros cálculos e não é multiplicado no crítico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Segredos do aço',
        description:
          'Golpes Enfeitiçados: especialização crítica da arma. Crítico: +1d8 do tipo extra, depois dos cálculos, sem multiplicar.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7984',
  }),
  f({
    id: 'feat-war-mage-battlefield-arcana',
    name: 'Arcana de Campo de Batalha',
    originalName: 'Battlefield Arcana',
    level: 12,
    archetypeId: 'archetype-war-mage',
    traits: ['Arquétipo', 'Concentração', 'Forma de Magia'],
    prereqId: DED_WAR.id,
    prereqName: DED_WAR.name,
    description:
      'Se a próxima ação for conjurar um truque da sua conjuração de classe, ou uma magia dessa conjuração ao menos 2 postos abaixo do espaço mais alto que você tem, essa magia não dispara reações que normalmente disparam por conjurar magia ou por ação com o traço manipular.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Arcana de campo de batalha',
        actionType: 'one',
        description:
          'Próximo truque de classe, ou magia de classe ≥ 2 postos abaixo do máximo: não dispara reações de conjuração/manipular.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 68,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7985',
  }),
]

export const archetypeFeatsGeneralRemaster25: Feat[] = [
  ...tattooedHistorianArchetypeFeats,
  ...verduranShadowArchetypeFeats,
  ...spellshotArchetypeFeats,
  ...munitionsMasterArchetypeFeats,
  ...warMageArchetypeFeats,
]
