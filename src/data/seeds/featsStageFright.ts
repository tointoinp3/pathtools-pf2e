import type { Feat } from '@/types/feat'
import { SOURCE_STAGE_FRIGHT_ID } from './sources'

const SRC = SOURCE_STAGE_FRIGHT_ID

const ARCH = {
  acrobat: {
    archetypeId: 'archetype-acrobat',
    dedId: 'feat-acrobat-dedication',
    dedName: 'Dedicação de Acrobata',
    slug: 'acrobat',
  },
  celebrity: {
    archetypeId: 'archetype-celebrity',
    dedId: 'feat-celebrity-dedication',
    dedName: 'Dedicação de Celebridade',
    slug: 'celebrity',
  },
  dandy: {
    archetypeId: 'archetype-dandy',
    dedId: 'feat-dandy-dedication',
    dedName: 'Dedicação de Dândi',
    slug: 'dandy',
  },
  gladiator: {
    archetypeId: 'archetype-gladiator',
    dedId: 'feat-gladiator-dedication',
    dedName: 'Dedicação de Gladiador',
    slug: 'gladiator',
  },
} as const

type ArchKey = keyof typeof ARCH

function f(opts: {
  slug: string
  name: string
  originalName: string
  level: number
  arches: ArchKey[]
  description: string
  extraPrereq?: Feat['prerequisites']
  effects?: Feat['effects']
  traits?: string[]
  actionType?: Feat['actionType']
  trigger?: string
  frequency?: string
  sourcePage: number
  aonUrl: string
  allowedSlotKinds?: Feat['allowedSlotKinds']
}): Feat[] {
  return opts.arches.map((key) => {
    const arch = ARCH[key]
    return {
      id: `feat-${arch.slug}-${opts.slug}`,
      name: opts.name,
      originalName: opts.originalName,
      level: opts.level,
      category: 'archetype' as const,
      archetypeId: arch.archetypeId,
      traits: opts.traits ?? ['Arquétipo', 'Incomum'],
      rarity: 'uncommon' as const,
      provenance: { type: 'official' as const },
      description: opts.description,
      effects: opts.effects,
      prerequisites: [
        { kind: 'feat' as const, featId: arch.dedId, featName: arch.dedName },
        ...(opts.extraPrereq ?? []),
      ],
      actionType: opts.actionType,
      trigger: opts.trigger,
      frequency: opts.frequency,
      allowedSlotKinds: opts.allowedSlotKinds,
      sourceId: SRC,
      sourcePage: opts.sourcePage,
      aonUrl: opts.aonUrl,
    }
  })
}

/**
 * Feitos de palco Remaster de Pathfinder #204 Stage Fright.
 * `archetypeId` é singular — uma cópia por arquétipo listado no AoN.
 */
export const featsStageFright: Feat[] = [
  ...f({
    slug: 'gladiators-roar',
    name: 'Rugido do Gladiador',
    originalName: "Gladiator's Roar",
    level: 12,
    arches: ['gladiator'],
    extraPrereq: [{ kind: 'skillRank', skillId: 'intimidation', rank: 'master' }],
    traits: ['Arquétipo', 'Emoção', 'Medo', 'Mental', 'Sônico', 'Incomum'],
    actionType: 'two',
    frequency: '1/dia',
    sourcePage: 81,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7634',
    description:
      'O rugido se ouve ao dobro da distância. Criaturas num cone de 4,5 m sofrem 6d10 sônico e Fortitude contra a CD de classe ou de magia (a maior). Se o Rugido disparar Jogar para a Plateia, +2 status no teste de Atuação.\n\n**Sucesso crítico** Sem efeito.\n\n**Sucesso** Metade do dano e assustado 1.\n\n**Falha** Dano total e assustado 2.\n\n**Falha crítica** Dano dobrado, assustado 3 e atordoado 1.',
  }),
  ...f({
    slug: 'operatic-adventurer',
    name: 'Aventureiro Operístico',
    originalName: 'Operatic Adventurer',
    level: 12,
    arches: ['acrobat', 'celebrity', 'dandy', 'gladiator'],
    traits: ['Arquétipo', 'Perícia', 'Incomum'],
    allowedSlotKinds: ['skill'],
    effects: [
      { kind: 'skillRank', skillId: 'performance', rank: 'master' },
      { kind: 'skillRank', skillId: 'performance', rank: 'legendary', minLevel: 15 },
      {
        kind: 'lore',
        loreName: 'Theater Lore',
        rank: 'expert',
        bumpIfAlready: true,
      },
    ],
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7635',
    description:
      'Atuação sobe a mestre (lendário no 15º). Conhecimento de Teatro sobe a perito (mestre se já era perito). No palco, arena ou foco de uma plateia: +3 circunstância na iniciativa se rolar Acrobacia, Intimidação ou Atuação.',
  }),
  ...f({
    slug: 'perfect-pitch',
    name: 'Afinação Perfeita',
    originalName: 'Perfect Pitch',
    level: 12,
    arches: ['celebrity', 'dandy'],
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7636',
    description:
      'Pode usar Atuação para Aprender uma Magia ou Identificar Magia em magias e efeitos musicais. Ganha Projeção Afinação Perfeita (auditivo, forma de magia): se a próxima ação neste turno for Conjurar ou criar efeito auditivo com alcance, esse alcance aumenta em 9 m.',
  }),
  ...f({
    slug: 'primadonna',
    name: 'Prima-dona',
    originalName: 'Primadonna',
    level: 12,
    arches: ['celebrity'],
    extraPrereq: [{ kind: 'skillRank', skillId: 'performance', rank: 'master' }],
    traits: ['Arquétipo', 'Auditivo', 'Incomum', 'Visual'],
    actionType: 'one',
    frequency: '1/hora',
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7638',
    description:
      'Teste de Atuação contra a CD de Vontade de inimigos a 9 m que possam vê-lo ou ouvi-lo. Sucesso: eles se concentram em você (+1 circunstância para acertá-lo) e ficam desprevenidos contra todas as outras criaturas. Sucesso crítico: dura 3 rodadas.',
  }),
  ...f({
    slug: 'virtuosic-dancer',
    name: 'Dançarino Virtuoso',
    originalName: 'Virtuosic Dancer',
    level: 12,
    arches: ['acrobat'],
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7639',
    description:
      'Ao Atuar com dança, atuação ou ópera: +1 circunstância (+2 se lendário em Acrobacia). Ganha Esquiva Dançante (movimento): quando um Golpe o acerta na primeira rodada, +3 circunstância na CA contra esse Golpe para determinar o resultado real.',
  }),
  ...f({
    slug: 'costume-change',
    name: 'Troca de Figurino',
    originalName: 'Costume Change',
    level: 14,
    arches: ['acrobat', 'celebrity', 'dandy', 'gladiator'],
    extraPrereq: [
      { kind: 'feat', featId: 'feat-quick-disguise', featName: 'Disfarce Rápido' },
      { kind: 'skillRank', skillId: 'performance', rank: 'master' },
    ],
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7640',
    description:
      'Tirar qualquer armadura: atividade Interagir de 3 ações. Vestir leve: 2 rodadas; média ou pesada: 1 minuto. Ganha Investidura Improvisada (1 minuto, 1/10 min): remove a investidura de um item (não conta no limite diário) e investe outro no lugar.',
  }),
  ...f({
    slug: 'fit-for-the-role',
    name: 'Feito para o Papel',
    originalName: 'Fit for the Role',
    level: 14,
    arches: ['acrobat', 'dandy'],
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7641',
    description:
      'Conjura _disfarce ilusório_ como magia inata oculta de 7º posto 1/dia, em você e companheiros.',
  }),
  ...f({
    slug: 'its-not-over',
    name: 'Ainda Não Acabou',
    originalName: "It's Not Over",
    level: 14,
    arches: ['celebrity', 'gladiator'],
    actionType: 'reaction',
    frequency: '1/dia',
    trigger: 'Você é reduzido a 0 PV',
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7642',
    description:
      'Em vez de ganhar morrendo e cair inconsciente, recupera PV iguais a 10 + nível + modificador de Constituição.',
  }),
  ...f({
    slug: 'tempo-shift',
    name: 'Mudança de Tempo',
    originalName: 'Tempo Shift',
    level: 16,
    arches: ['acrobat', 'gladiator'],
    extraPrereq: [{ kind: 'skillRank', skillId: 'acrobatics', rank: 'legendary' }],
    actionType: 'reaction',
    frequency: '1/hora',
    trigger: 'Você Adia',
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7643',
    description:
      'Quando volta à iniciativa após Adiar, todos os inimigos ficam desprevenidos contra você até o início do seu próximo turno, e você fica acelerado nesta rodada (a ação extra só para Avançar ou Golpear).',
  }),
  ...f({
    slug: 'fight-choreography',
    name: 'Coreografia de Luta',
    originalName: 'Fight Choreography',
    level: 18,
    arches: ['acrobat', 'gladiator'],
    extraPrereq: [{ kind: 'text', label: 'mestre em Conhecimento de Teatro' }],
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7644',
    description:
      'Pode Ajudar um teste de Acrobacia ou Atletismo de um aliado com Conhecimento de Teatro. Ganha Coreografia Rápida (auditivo, linguístico): quando um aliado a 9 m ficaria agarrado, imobilizado, desprevenido, caído ou restringido, ele evita o efeito por completo.',
  }),
  ...f({
    slug: 'tragic-lament',
    name: 'Lamento Trágico',
    originalName: 'Tragic Lament',
    level: 18,
    arches: ['celebrity', 'dandy'],
    extraPrereq: [{ kind: 'skillRank', skillId: 'performance', rank: 'legendary' }],
    traits: ['Arquétipo', 'Auditivo', 'Emoção', 'Linguístico', 'Mental', 'Incomum'],
    actionType: 'reaction',
    frequency: '1/10 min',
    trigger:
      'Uma criatura de que você está ciente obtém sucesso crítico num Golpe que lhe causaria dano',
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7645',
    description:
      'O Golpe causa dano normal em vez de crítico (outros efeitos de crítico ainda ocorrem). O atacante faz Vontade contra sua CD de classe ou fica lento 1 por 1 rodada.',
  }),
  ...f({
    slug: 'more-real-than-real',
    name: 'Mais Real que o Real',
    originalName: 'More Real than Real',
    level: 20,
    arches: ['acrobat', 'celebrity', 'dandy', 'gladiator'],
    sourcePage: 83,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7646',
    description:
      'Conjura _verdade fabricada_ 1/dia como magia inata oculta.',
  }),
]
