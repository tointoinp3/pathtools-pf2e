/** Gerais Remaster: Dançarino de Balas, Vigia, Fenômeno da Pistola, Dupla de Atiradores, Atirador Inesperado. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import { SOURCE_GUNS_GEARS_ID, SOURCE_PLAYER_CORE_2_ID, SOURCE_PLAYER_CORE_ID } from './sources'

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

const DED_BD = { id: 'feat-bullet-dancer-dedication', name: 'Dedicação de Dançarino de Balas' }
const DED_OW = { id: 'feat-overwatch-dedication', name: 'Dedicação de Vigia' }
const DED_PP = { id: 'feat-pistol-phenom-dedication', name: 'Dedicação de Fenômeno da Pistola' }
const DED_SD = { id: 'feat-sniping-duo-dedication', name: 'Dedicação de Dupla de Atiradores' }
const DED_US = {
  id: 'feat-unexpected-sharpshooter-dedication',
  name: 'Dedicação de Atirador Inesperado',
}

const QI_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-bullet-dancer-qi',
  label: 'Magias de qi (Dançarino de Balas)',
  style: 'focusOnly',
  tradition: 'occult',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  classOriginalName: 'Monk',
  features: { focusPool: true },
}

const TRICK_SHOT_TEXT =
  'Golpe contra CA fácil do seu nível num objeto. Sucesso: Desalojar Objeto (até 2 Bulk, 3 m) ou Barril Explosivo (explosão 6 m, 6d6 + 1d6/2 níveis acima de 10º, Reflexos básico vs CD de classe). O MJ confirma se o efeito existe antes de você gastar as ações.'

const bulletDancerArchetypeFeats: Feat[] = [
  f({
    id: DED_BD.id,
    name: DED_BD.name,
    originalName: 'Bullet Dancer Dedication',
    level: 2,
    archetypeId: 'archetype-bullet-dancer',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'text', label: 'Perito em defesa sem armadura; treinado em ataque desarmado' },
    ],
    description:
      'Ganha Postura do Dançarino de Balas. Familiaridade com baionetas, coronhas reforçadas, armas de fogo marciais e armas combinadas marciais — trata como simples para proficiência e habilidades deste arquétipo. Acesso a armas combinadas incomuns com forma de arma de fogo. PFS: Alkenstar, Dongun Hold ou Shackles.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        weapons: ['Bayonet', 'Reinforced Stock'],
        groups: ['firearm'],
        martialAsSimple: true,
      },
      {
        kind: 'specialAbility',
        name: 'Postura do Dançarino de Balas',
        description:
          '1 ação, postura. Sem armadura, empunhando arma de fogo simples ou combinada simples. Só Golpes com baioneta, coronha reforçada e armas de fogo simples. Rajada de Golpes com essas armas. Feitos/habilidades de monge que pedem desarmado valem com baioneta e coronha (não um Golpe específico). Com arma de fogo simples, também até metade do 1º incremento.',
        actionType: 'one',
      },
    ],
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3235',
  }),
  f({
    id: 'feat-bullet-dancer-burn',
    name: 'Queimadura do Dançarino de Balas',
    originalName: 'Bullet Dancer Burn',
    level: 4,
    archetypeId: 'archetype-bullet-dancer',
    prereqId: DED_BD.id,
    prereqName: DED_BD.name,
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo com baioneta ou coronha reforçada' }],
    description:
      'Na postura: Golpe de baioneta/coronha bem-sucedido — o próximo Golpe à distância contra o mesmo alvo não dispara reações de ataque à distância. Golpe à distância bem-sucedido no alcance corpo a corpo — o próximo Golpe de coronha/baioneta causa +1 fogo e +1 fogo persistente por dado da arma. Perde se não usar até o fim do próximo turno.',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3236',
  }),
  f({
    id: 'feat-bullet-dancer-pistol-twirl',
    name: 'Giro de Pistola',
    originalName: 'Pistol Twirl',
    level: 4,
    archetypeId: 'archetype-bullet-dancer',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Enganação; arma à distância de 1 mão carregada' },
    ],
    description:
      'Finte no 1º incremento (não só adjacente). Sucesso: desprevenido contra seus Golpes corpo a corpo e à distância. Falha crítica: você fica desprevenido contra os dele (corpo a corpo e à distância).',
    actionType: 'one',
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3162',
  }),
  f({
    id: 'feat-bullet-dancer-qi-spells',
    name: 'Magias de Qi',
    originalName: 'Qi Spells',
    level: 4,
    archetypeId: 'archetype-bullet-dancer',
    prereqId: DED_BD.id,
    prereqName: DED_BD.name,
    description:
      'Ganha agitação interior, ímpeto de qi ou outra magia de qi de 1º posto de monge a que tenha acesso. Pode pegar de novo com outra magia. Você escolhe a magia; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: QI_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'bullet-dancer-qi-spell',
        options: [
          { id: 'inner-upheaval', label: 'Agitação interior' },
          { id: 'qi-rush', label: 'Ímpeto de qi' },
          { id: 'other', label: 'Outra magia de qi de 1º posto (nomeie com o MJ)' },
        ],
        hint: 'Magia de qi. O motor não escolhe.',
        abilityName: 'Magia de qi: {choice}',
        abilityDescription: 'Magia de foco de monge. Tradição oculta, Sabedoria.',
      },
    ],
    repeatable: true,
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 119,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5981',
  }),
  f({
    id: 'feat-bullet-dancer-black-powder-boost',
    name: 'Impulso de Pólvora',
    originalName: 'Black Powder Boost',
    level: 6,
    archetypeId: 'archetype-bullet-dancer',
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo carregada' }],
    description:
      '1 ação: Salte e dispare (+3 m de status). 2 ações: Salto em Altura ou Distância. Salto Rápido permite usar a versão de 2 ações com 1 ação.',
    actionType: 'one',
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3166',
  }),
  f({
    id: 'feat-bullet-dancer-black-powder-blaze',
    name: 'Labareda de Pólvora',
    originalName: 'Black Powder Blaze',
    level: 8,
    archetypeId: 'archetype-bullet-dancer',
    prereqId: 'feat-bullet-dancer-black-powder-boost',
    prereqName: 'Impulso de Pólvora',
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo carregada' }],
    description:
      'Desloque-se e use Impulso de Pólvora. Golpe corpo a corpo com a arma em qualquer ponto do impulso. Com Queimadura, o fogo extra vale nesse Golpe.',
    actionType: 'two',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3237',
  }),
  f({
    id: 'feat-bullet-dancer-snap-shot',
    name: 'Tiro Instantâneo',
    originalName: 'Snap Shot',
    level: 8,
    archetypeId: 'archetype-bullet-dancer',
    prereqId: DED_BD.id,
    prereqName: DED_BD.name,
    description:
      'Reação que pede Golpe corpo a corpo pode ser Golpe à distância em alvo adjacente. Alcance 1,5 m só para o gatilho. Outros requisitos da reação continuam.',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=117',
  }),
  f({
    id: 'feat-bullet-dancer-reload',
    name: 'Recarga do Dançarino de Balas',
    originalName: 'Bullet Dancer Reload',
    level: 10,
    archetypeId: 'archetype-bullet-dancer',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: 'feat-bullet-dancer-burn',
    prereqName: 'Queimadura do Dançarino de Balas',
    extraPrereq: [{ kind: 'text', label: 'Você está na Postura do Dançarino de Balas' }],
    description:
      'Golpeie com arma de fogo simples e então Interaja para recarregar a mesma. Sem mão livre.',
    actionType: 'one',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3238',
  }),
  f({
    id: 'feat-bullet-dancer-trick-shot',
    name: 'Tiro Truque',
    originalName: 'Trick Shot',
    level: 12,
    archetypeId: 'archetype-bullet-dancer',
    extraPrereq: [{ kind: 'text', label: 'Besta ou arma de fogo carregada' }],
    description: TRICK_SHOT_TEXT,
    actionType: 'two',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3188',
  }),
  f({
    id: 'feat-bullet-dancer-ranged-disarm',
    name: 'Desarmar à Distância',
    originalName: 'Ranged Disarm',
    level: 14,
    archetypeId: 'archetype-bullet-dancer',
    prereqId: 'feat-bullet-dancer-trick-shot',
    prereqName: 'Tiro Truque',
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo simples' }],
    description: 'Desarme com rolagem de ataque à distância da arma de fogo simples, não Atletismo vs Reflexos.',
    actionType: 'one',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3239',
  }),
  f({
    id: 'feat-bullet-dancer-ricochet-shot',
    name: 'Tiro de Ricochete',
    originalName: 'Ricochet Shot',
    level: 14,
    archetypeId: 'archetype-bullet-dancer',
    prereqId: DED_BD.id,
    prereqName: DED_BD.name,
    description:
      'Golpe com arma de fogo ou besta. Pode ricochetear numa superfície sólida no 1º incremento; cobertura do alvo a partir desse ponto.',
    actionType: 'one',
    sourcePage: 132,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=117',
  }),
  f({
    id: 'feat-bullet-dancer-showstopper',
    name: 'Número de Encerramento',
    originalName: 'Showstopper',
    level: 16,
    archetypeId: 'archetype-bullet-dancer',
    prereqId: 'feat-bullet-dancer-pistol-twirl',
    prereqName: 'Giro de Pistola',
    description:
      'Ao Fintar com Giro de Pistola, todos os inimigos no 1º incremento que você percebe e que o veem. Uma Enganação contra cada CD de Percepção.',
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=117',
  }),
  f({
    id: 'feat-bullet-dancer-two-weapon-fusillade',
    name: 'Fuzilaria de Duas Armas',
    originalName: 'Two-Weapon Fusillade',
    level: 16,
    archetypeId: 'archetype-bullet-dancer',
    traits: ['Arquétipo', 'Ímpeto'],
    extraPrereq: [
      { kind: 'text', label: 'Duas armas, uma em cada mão; ao menos uma arma de fogo ou besta carregada' },
    ],
    description: 'Golpeie duas vezes, uma com cada arma.',
    actionType: 'one',
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3203',
  }),
]

const overwatchArchetypeFeats: Feat[] = [
  f({
    id: DED_OW.id,
    name: DED_OW.name,
    originalName: 'Overwatch Dedication',
    level: 2,
    archetypeId: 'archetype-overwatch',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'text', label: 'Perito em Percepção' },
    ],
    description:
      'Aura campo de vigia 9 m (auditivo, visual). Ao rolar Percepção na iniciativa, você e aliados na aura ganham +2 de circunstância.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'iniciativa com Percepção (você e aliados no campo de vigia de 9 m)',
      },
      {
        kind: 'specialAbility',
        name: 'Campo de vigia (9 m)',
        description: 'Emanação 9 m. Avisos a aliados. +2 de circunstância na iniciativa com Percepção.',
      },
    ],
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3118',
  }),
  f({
    id: 'feat-overwatch-spyglass',
    name: 'Modificação de Luneta',
    originalName: 'Spyglass Modification',
    level: 4,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    description:
      'O campo de vigia dobra uma esquina. Não atravessa paredes, não dobra a segunda esquina, não dá linha de efeito para ataques.',
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=109',
  }),
  f({
    id: 'feat-overwatch-swift-intervention',
    name: 'Intervenção Rápida',
    originalName: 'Swift Intervention',
    level: 6,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    extraPrereq: [{ kind: 'text', label: 'Você empunha uma arma à distância' }],
    description:
      'Ataque à distância vs CD do teste disparador; o aliado usa o seu resultado. Penalidades de incremento valem. Precisa de linha de efeito.',
    actionType: 'reaction',
    trigger:
      'Um aliado no campo de vigia falha em Interromper Queda, Equilibrar-se, Agarrar Borda ou Manobrar em Voo.',
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3120',
  }),
  f({
    id: 'feat-overwatch-topple-giants',
    name: 'Derrubar Gigantes',
    originalName: 'Topple Giants',
    level: 8,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    description:
      'Aliado no campo falha em Desarmar, Empurrar ou Derrubar um oponente também no campo: +2 de circunstância no próximo Atletismo de outro aliado para a mesma manobra no mesmo alvo, até o próximo turno do alvo.',
    sourcePage: 50,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=109',
  }),
  f({
    id: 'feat-overwatch-wide',
    name: 'Vigia Amplo',
    originalName: 'Wide Overwatch',
    level: 10,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    extraPrereq: [{ kind: 'text', label: 'Mestre em Percepção' }],
    description: 'Campo de vigia 18 m (em vez de 9 m).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Campo de vigia (18 m)',
        description: 'Substitui o raio de 9 m da Dedicação.',
      },
    ],
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3122',
  }),
  f({
    id: 'feat-overwatch-forewarn',
    name: 'Prevenir',
    originalName: 'Forewarn',
    level: 12,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    extraPrereq: [{ kind: 'text', label: 'Mestre em Percepção' }],
    description:
      'O ataque usa sua CD de Percepção no lugar da CA do aliado. Condições que penalizam CA continuam para efeitos (ex.: ataque furtivo), mas o −2 de desprevenido não entra na rolagem.',
    actionType: 'reaction',
    frequency: '1 vez por minuto',
    trigger:
      'Um inimigo no campo de vigia ataca um aliado que também está no campo.',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3123',
  }),
  f({
    id: 'feat-overwatch-master-spotter',
    name: 'Observador Mestre',
    originalName: 'Master Spotter',
    level: 12,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    extraPrereq: [{ kind: 'text', label: 'Perito em Percepção' }],
    description: 'Percepção sobe para mestre. O motor aplica o posto.',
    effects: [{ kind: 'perceptionRank', rank: 'master' }],
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3124',
  }),
  f({
    id: 'feat-overwatch-control-tower',
    name: 'Torre de Controle',
    originalName: 'Control Tower',
    level: 14,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    extraPrereq: [{ kind: 'text', label: 'Mestre em Percepção' }],
    description:
      'Você e aliados no campo: +2 de circunstância em Buscar criaturas ocultas/não detectadas no campo. Sem teste plano contra oculto (concealed). Contra escondido (hidden), CD plana 5.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Buscar criaturas ocultas ou não detectadas no campo de vigia',
      },
    ],
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3125',
  }),
  f({
    id: 'feat-overwatch-converge',
    name: 'Convergir',
    originalName: 'Converge',
    level: 16,
    archetypeId: 'archetype-overwatch',
    prereqId: DED_OW.id,
    prereqName: DED_OW.name,
    extraPrereq: [{ kind: 'text', label: 'Mestre em Percepção' }],
    description:
      'O aliado pode Golpear corpo a corpo o alvo como reação. Não conta na penalidade de ataques múltiplos. Se acertar, some o dano ao seu Golpe à distância para resistências/fraquezas.',
    actionType: 'reaction',
    trigger:
      'Você acerta um Golpe à distância num oponente no campo de vigia que está no alcance de um aliado também no campo.',
    sourcePage: 51,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3126',
  }),
]

const pistolPhenomArchetypeFeats: Feat[] = [
  f({
    id: DED_PP.id,
    name: DED_PP.name,
    originalName: 'Pistol Phenom Dedication',
    level: 2,
    archetypeId: 'archetype-pistol-phenom',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'skillRank', skillId: 'performance', rank: 'trained' },
      {
        kind: 'text',
        label: 'Treinado em ao menos uma arma de fogo de 1 mão; treinado em Enganação e Performance',
      },
    ],
    description:
      'Ganha Giro de Pistola (vale como pré-requisito; não conta como feito extra do arquétipo para a restrição de Dedicação). Ao Fintar com arma de fogo de 1 mão, pode usar Performance no lugar de Enganação. PFS: Alkenstar, Dongun Hold ou Shackles.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Giro de Pistola',
        description:
          '1 ação. Finte no 1º incremento. Sucesso: desprevenido contra seus Golpes corpo a corpo e à distância. Falha crítica: você fica desprevenido contra os dele. Com arma de fogo de 1 mão, pode Fintar com Performance.',
        actionType: 'one',
      },
    ],
    sourcePage: 135,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3251',
  }),
  f({
    id: 'feat-pistol-phenom-gunpowder-gauntlet',
    name: 'Luva de Pólvora',
    originalName: 'Gunpowder Gauntlet',
    level: 4,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo de 1 mão carregada' }],
    description:
      'Performance vs Vontade de um alvo no 1º incremento. Crítico: −2 de status nos ataques contra outros até o início do seu próximo turno. Sucesso: −1.',
    actionType: 'one',
    sourcePage: 135,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3252',
  }),
  f({
    id: 'feat-pistol-phenom-sword-and-pistol',
    name: 'Espada e Pistola',
    originalName: 'Sword and Pistol',
    level: 4,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    description:
      'Golpe à distância de 1 mão bem-sucedido no alcance corpo a corpo: alvo desprevenido contra o próximo Golpe corpo a corpo de 1 mão. Golpe corpo a corpo de 1 mão bem-sucedido: o próximo Golpe à distância de 1 mão não dispara reações de ataque à distância. Perde se não usar até o fim do próximo turno.',
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3159',
  }),
  f({
    id: 'feat-pistol-phenom-dazzling-bullet',
    name: 'Bala Ofuscante',
    originalName: 'Dazzling Bullet',
    level: 6,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    description:
      'Performance vs Vontade e Golpe à distância com arma de fogo. Se o Golpe causar dano e a Performance for sucesso, ofuscado 1 rodada.',
    actionType: 'one',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=120',
  }),
  f({
    id: 'feat-pistol-phenom-hot-foot',
    name: 'Pé Quente',
    originalName: 'Hot Foot',
    level: 8,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo carregada' }],
    description:
      'Ataque vs Reflexos no 1º incremento. Crítico: sem reações, desprevenido, −2 de circunstância em Reflexos até o início do próximo turno. Sucesso: sem reações até o início do próximo turno.',
    actionType: 'one',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3254',
  }),
  f({
    id: 'feat-pistol-phenom-verve',
    name: 'Verve do Fenômeno',
    originalName: "Phenom's Verve",
    level: 10,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    description:
      'Sucesso crítico em Performance de Giro de Pistola ou feito deste arquétipo: +1 de status nos Golpes com armas de fogo de 1 mão e armas corpo a corpo de 1 mão até o fim do turno.',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=120',
  }),
  f({
    id: 'feat-pistol-phenom-reach-for-the-sky',
    name: 'Mãos ao Alto',
    originalName: 'Reach for the Sky',
    level: 12,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    description:
      'Dispare e Desmoralize cada inimigo a 9 m (um teste). Amedrontados levantam as mãos: perdem Escudo Erguido; sem reações/ações livres que usem as mãos até o início do próximo turno. Imune 1 minuto.',
    actionType: 'two',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=120',
  }),
  f({
    id: 'feat-pistol-phenom-trick-shot',
    name: 'Tiro Truque',
    originalName: 'Trick Shot',
    level: 12,
    archetypeId: 'archetype-pistol-phenom',
    extraPrereq: [{ kind: 'text', label: 'Besta ou arma de fogo carregada' }],
    description: TRICK_SHOT_TEXT,
    actionType: 'two',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3188',
  }),
  f({
    id: 'feat-pistol-phenom-whirling-knockdown',
    name: 'Derrubada Giratória',
    originalName: 'Whirling Knockdown',
    level: 14,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    extraPrereq: [
      { kind: 'text', label: 'Arma de fogo de 1 mão carregada e arma corpo a corpo de 1 mão' },
    ],
    description:
      'Golpe à distância no alcance da arma corpo a corpo, então Performance vs Reflexos (−2 na CD se o Golpe foi crítico). Crítico: prone + 2d6 concussão. Sucesso: prone. Falha crítica: você larga a arma corpo a corpo.',
    actionType: 'two',
    sourcePage: 136,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3257',
  }),
  f({
    id: 'feat-pistol-phenom-showstopper',
    name: 'Número de Encerramento',
    originalName: 'Showstopper',
    level: 16,
    archetypeId: 'archetype-pistol-phenom',
    prereqId: DED_PP.id,
    prereqName: DED_PP.name,
    description:
      'Ao Fintar com Giro de Pistola, todos os inimigos no 1º incremento que você percebe e que o veem. Uma Enganação contra cada CD de Percepção.',
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=120',
  }),
]

const snipingDuoArchetypeFeats: Feat[] = [
  f({
    id: DED_SD.id,
    name: DED_SD.name,
    originalName: 'Sniping Duo Dedication',
    level: 2,
    archetypeId: 'archetype-sniping-duo',
    isDedication: true,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained' },
      {
        kind: 'text',
        label: 'Treinado em ao menos uma arma dos grupos besta ou arma de fogo; treinado em Furtividade',
      },
    ],
    description:
      'Escolha um aliado disposto não-lacaio como observador (ele não gasta feitos). Benefícios só com os dois conscientes. Vocês não dão cobertura menor um ao outro. Golpe bem-sucedido: o outro ganha +1 de circunstância por dado da arma no dano do próximo Golpe contra o mesmo alvo até o fim do próximo turno. Trocar observador: 3 dias. Você nomeia o observador; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Observador (dupla)',
        description:
          'Você nomeia o aliado. Sem cobertura menor mútua. +1 de circunstância por dado no dano do parceiro após um Golpe.',
      },
    ],
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3258',
  }),
  f({
    id: 'feat-sniping-duo-assisting-shot',
    name: 'Tiro de Apoio',
    originalName: 'Assisting Shot',
    level: 4,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Golpe à distância. Se acertar, a próxima criatura além de você a atacar o mesmo alvo até o início do seu próximo turno ganha +1 de circunstância (+2 no crítico).',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4777',
  }),
  f({
    id: 'feat-sniping-duo-cover-fire',
    name: 'Fogo de Cobertura',
    originalName: 'Cover Fire',
    level: 4,
    archetypeId: 'archetype-sniping-duo',
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo ou besta carregada' }],
    description:
      '1/rodada. O alvo decide se agacha antes da rolagem. Se agachar: +2 CA (+4 com cobertura) contra este ataque e −2 de circunstância em Golpes à distância até o fim do próximo turno. Se não: +1 de circunstância no seu ataque.',
    actionType: 'one',
    frequency: '1 vez por rodada',
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3155',
  }),
  f({
    id: 'feat-sniping-duo-triangulate',
    name: 'Triangular',
    originalName: 'Triangulate',
    level: 4,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Se os dois veem o alvo: sem penalidade no 2º incremento. 3º = −3, depois −2 por incremento (−5, −7, −9).',
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=121',
  }),
  f({
    id: 'feat-sniping-duo-exploit-opening',
    name: 'Explorar Abertura',
    originalName: 'Exploit Opening',
    level: 6,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description: 'Golpe à distância com besta ou arma de fogo carregada, +2 de circunstância.',
    actionType: 'reaction',
    trigger:
      'Seu observador obtém sucesso crítico num Golpe contra uma criatura no 1º incremento da sua besta ou arma de fogo.',
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3260',
  }),
  f({
    id: 'feat-sniping-duo-targeted-redirection',
    name: 'Redirecionamento Mirado',
    originalName: 'Targeted Redirection',
    level: 6,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Se a próxima ação for Golpe à distância, use a posição do observador para cobertura e alcance. Ele precisa estar no 1º incremento e gastar uma reação.',
    actionType: 'one',
    sourcePage: 137,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=121',
  }),
  f({
    id: 'feat-sniping-duo-aim',
    name: 'Mira da Dupla',
    originalName: "Duo's Aim",
    level: 8,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Golpe à distância contra alvo no alcance corpo a corpo do observador ou no 1º incremento da arma à distância dele. +2 de circunstância; ignora ocultação. Sem penalidade de recuo se faltar Força/tripé.',
    actionType: 'two',
    sourcePage: 138,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=121',
  }),
  f({
    id: 'feat-sniping-duo-vantage-shot',
    name: 'Tiro de Vantagem',
    originalName: 'Vantage Shot',
    level: 8,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Golpe à distância bem-sucedido: o outro pode, como reação, Furtividade vs Percepção do alvo. Sucesso: alvo desprevenido contra o próximo ataque do parceiro até o fim do próximo turno dele.',
    sourcePage: 138,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=121',
  }),
  f({
    id: 'feat-sniping-duo-tag-team',
    name: 'Dupla Coordenada',
    originalName: 'Tag Team',
    level: 10,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Se o observador errou: você Golpeia à distância com −2. Se você errou: o observador pode Golpear (corpo a corpo ou à distância) como reação. Não conta na penalidade de ataques múltiplos.',
    actionType: 'reaction',
    trigger:
      'Você ou o observador erra um Golpe contra uma criatura no alcance corpo a corpo ou 1º incremento do outro.',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3264',
  }),
  f({
    id: 'feat-sniping-duo-deflecting-shot',
    name: 'Tiro Defletor',
    originalName: 'Deflecting Shot',
    level: 12,
    archetypeId: 'archetype-sniping-duo',
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo ou besta carregada' }],
    description:
      'O aliado ganha +2 de circunstância na CA contra o ataque. Você usa depois de ver o resultado.',
    actionType: 'reaction',
    trigger:
      'Um aliado no 1º incremento da sua arma de fogo ou besta é atingido por um ataque, e você vê o atacante.',
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3183',
  }),
  f({
    id: 'feat-sniping-duo-eagle-eyes',
    name: 'Olhos de Águia',
    originalName: 'Eagle Eyes',
    level: 12,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Enquanto se veem ou ouvem: nenhum dos dois fica desprevenido contra criaturas ocultas, não detectadas ou flanqueando de nível igual ou menor, nem contra ataque surpresa dessas criaturas. Ainda podem ajudar a flanquear.',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=121',
  }),
  f({
    id: 'feat-sniping-duo-redirecting-shot',
    name: 'Tiro Redirecionador',
    originalName: 'Redirecting Shot',
    level: 12,
    archetypeId: 'archetype-sniping-duo',
    traits: ['Arquétipo', 'Fortuna'],
    extraPrereq: [{ kind: 'text', label: 'Arma de fogo ou besta carregada' }],
    description:
      'Dispare e role 1d20; o aliado usa essa rolagem. Ignora bônus de cobertura menor ou padrão.',
    actionType: 'reaction',
    trigger:
      'Um aliado disposto erra um Golpe à distância com arma arremessada ou munição; você vê o alvo, que está no 1º incremento da sua arma.',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3187',
  }),
  f({
    id: 'feat-sniping-duo-concentrated-assault',
    name: 'Assalto Concentrado',
    originalName: 'Concentrated Assault',
    level: 14,
    archetypeId: 'archetype-sniping-duo',
    prereqId: DED_SD.id,
    prereqName: DED_SD.name,
    description:
      'Se os dois Preparam Golpe no mesmo oponente com o mesmo gatilho, resolvem juntos. Cada um pode usar a maior das duas rolagens (fortuna) com o próprio modificador. Se ambos acertarem, some o dano para resistências/fraquezas.',
    sourcePage: 139,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=121',
  }),
]

const unexpectedSharpshooterArchetypeFeats: Feat[] = [
  f({
    id: DED_US.id,
    name: DED_US.name,
    originalName: 'Unexpected Sharpshooter Dedication',
    level: 2,
    archetypeId: 'archetype-unexpected-sharpshooter',
    isDedication: true,
    rarity: 'uncommon',
    description:
      'Ganha Tiro Acidental. PFS: Alkenstar, Dongun Hold ou Shackles.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tiro Acidental',
        description:
          '2 ações, fortuna, 1/dia. Golpe à distância: role ataque e dano duas vezes, use os melhores. Ignora penalidades de circunstância no ataque e teste plano de oculto/escondido.',
        actionType: 'two',
      },
    ],
    sourcePage: 142,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=123',
  }),
  f({
    id: 'feat-unexpected-hit-the-dirt',
    name: 'Deita no Chão!',
    originalName: 'Hit the Dirt!',
    level: 4,
    archetypeId: 'archetype-unexpected-sharpshooter',
    extraPrereq: [{ kind: 'text', label: 'Uma criatura que você vê tenta um Golpe à distância contra você' }],
    description: 'Salte. +2 de circunstância na CA contra o ataque. Depois cai prone, acerte ou erre.',
    actionType: 'reaction',
    trigger: 'Uma criatura que você vê tenta um Golpe à distância contra você.',
    sourcePage: 111,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3157',
  }),
  f({
    id: 'feat-unexpected-lucky-escape',
    name: 'Fuga Sortuda',
    originalName: 'Lucky Escape',
    level: 4,
    archetypeId: 'archetype-unexpected-sharpshooter',
    traits: ['Arquétipo', 'Infortúnio'],
    prereqId: DED_US.id,
    prereqName: DED_US.name,
    description: 'O atacante rola duas vezes e usa o pior.',
    actionType: 'reaction',
    frequency: '1 vez por dia',
    trigger: 'Uma criatura escolhe você como alvo de um ataque, mesmo se você não perceber.',
    sourcePage: 142,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3273',
  }),
  f({
    id: 'feat-unexpected-risky-reload',
    name: 'Recarga Arriscada',
    originalName: 'Risky Reload',
    level: 4,
    archetypeId: 'archetype-unexpected-sharpshooter',
    traits: ['Arquétipo', 'Ímpeto'],
    extraPrereq: [{ kind: 'text', label: 'Você empunha uma arma de fogo' }],
    description: 'Interaja para recarregar e Golpeie com a mesma arma. Se o Golpe falhar, a arma falha (misfire).',
    actionType: 'one',
    sourcePage: 112,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3163',
  }),
  f({
    id: 'feat-unexpected-no-hard-feelings',
    name: 'Sem Mágoas',
    originalName: 'No Hard Feelings',
    level: 6,
    archetypeId: 'archetype-unexpected-sharpshooter',
    prereqId: DED_US.id,
    prereqName: DED_US.name,
    description: 'Pode adicionar o traço não letal às armas à distância, escolhendo antes de cada Golpe.',
    sourcePage: 142,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=123',
  }),
  f({
    id: 'feat-unexpected-close-one',
    name: 'Essa Foi por Pouco, Né?',
    originalName: 'That was a Close One, Huh?',
    level: 7,
    archetypeId: 'archetype-unexpected-sharpshooter',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_US.id,
    prereqName: DED_US.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'master' },
      { kind: 'text', label: 'Mestre em Enganação' },
    ],
    description:
      'Desmoralize o alvo do Tiro Acidental que acertou neste turno, ou quem errou você por Fuga Sortuda desde o último turno. Use Enganação no lugar de Intimidação.',
    actionType: 'one',
    frequency: '1 vez por rodada',
    allowedSlotKinds: ['skill'],
    sourcePage: 142,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3275',
  }),
  f({
    id: 'feat-unexpected-unbelievable-luck',
    name: 'Sorte Inacreditável',
    originalName: 'Unbelievable Luck',
    level: 8,
    archetypeId: 'archetype-unexpected-sharpshooter',
    prereqId: DED_US.id,
    prereqName: DED_US.name,
    description: 'Tiro Acidental 1/hora em vez de 1/dia.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tiro Acidental (1/hora)',
        description: 'Substitui a frequência de 1/dia da Dedicação.',
      },
    ],
    sourcePage: 142,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=123',
  }),
  f({
    id: 'feat-unexpected-meant-to',
    name: 'Foi de Propósito',
    originalName: 'I Meant to Do That',
    level: 10,
    archetypeId: 'archetype-unexpected-sharpshooter',
    prereqId: DED_US.id,
    prereqName: DED_US.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Enganação; o Golpe anterior à distância errou um inimigo a até 18 m' },
    ],
    description: 'Enganação para Empurrar, Derrubar ou Desarmar o alvo que você errou.',
    actionType: 'one',
    frequency: '1 vez por hora',
    sourcePage: 143,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3278',
  }),
  f({
    id: 'feat-unexpected-trick-shot',
    name: 'Tiro Truque',
    originalName: 'Trick Shot',
    level: 10,
    archetypeId: 'archetype-unexpected-sharpshooter',
    extraPrereq: [{ kind: 'text', label: 'Besta ou arma de fogo carregada' }],
    description: TRICK_SHOT_TEXT,
    actionType: 'two',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3188',
  }),
  f({
    id: 'feat-unexpected-unbelievable-escape',
    name: 'Fuga Inacreditável',
    originalName: 'Unbelievable Escape',
    level: 10,
    archetypeId: 'archetype-unexpected-sharpshooter',
    prereqId: 'feat-unexpected-lucky-escape',
    prereqName: 'Fuga Sortuda',
    description: 'Fuga Sortuda 1/hora em vez de 1/dia.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fuga Sortuda (1/hora)',
        description: 'Substitui a frequência de 1/dia.',
      },
    ],
    sourcePage: 143,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=123',
  }),
  f({
    id: 'feat-unexpected-chain-reaction',
    name: 'Reação em Cadeia',
    originalName: 'Chain Reaction',
    level: 12,
    archetypeId: 'archetype-unexpected-sharpshooter',
    prereqId: DED_US.id,
    prereqName: DED_US.name,
    description:
      'Golpe à distância; se acertar, outro a 9 m do anterior, e assim até errar. Sem repetir alvo. Só o primeiro sofre efeitos especiais da munição; o dano é o mesmo. O MJ pode mudar o tipo. Você pode parar a qualquer momento.',
    actionType: 'three',
    frequency: '1 vez a cada 10 minutos',
    sourcePage: 143,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3279',
  }),
]

export const archetypeFeatsGeneralRemaster11: Feat[] = [
  ...bulletDancerArchetypeFeats,
  ...overwatchArchetypeFeats,
  ...pistolPhenomArchetypeFeats,
  ...snipingDuoArchetypeFeats,
  ...unexpectedSharpshooterArchetypeFeats,
]
