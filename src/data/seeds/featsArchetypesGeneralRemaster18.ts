/** Gerais Remaster: Involucionista Rivethun, Senhor dos Cavalos Nidalese, Corsário Submarino, Guardião da Rosa, Homem-fera. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  SOURCE_DIVINE_MYSTERIES_ID,
  SOURCE_HELLFIRE_DISPATCHES_ID,
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
    sourceId: opts.sourceId ?? SOURCE_HELLFIRE_DISPATCHES_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_RIV = {
  id: 'feat-rivethun-involutionist-dedication',
  name: 'Dedicação de Involucionista Rivethun',
}
const DED_HORSE = {
  id: 'feat-nidalese-horselord-dedication',
  name: 'Dedicação de Senhor dos Cavalos Nidalese',
}
const DED_SEA = {
  id: 'feat-undersea-privateer-dedication',
  name: 'Dedicação de Corsário Submarino',
}
const DED_ROSE = {
  id: 'feat-rose-warden-dedication',
  name: 'Dedicação de Guardião da Rosa',
}
const DED_WERE = {
  id: 'feat-werecreature-dedication',
  name: 'Dedicação de Homem-fera',
}

const RIVETHUN_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-rivethun-involutionist-archetype',
  label: 'Conjuração de Involucionista Rivethun',
  style: 'spontaneous',
  tradition: 'divine',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  cantripsPerDay: 2,
  classOriginalName: 'Rivethun Involutionist',
  features: { repertoire: true },
}

const ROSE_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-rose-warden-archetype',
  label: 'Magias de Devoção de Guardião da Rosa',
  style: 'focusOnly',
  tradition: 'divine',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  classOriginalName: 'Rose Warden',
  features: { focusPool: true },
}

const NIMBLE_OR_SAVAGE = {
  kind: 'textChoice' as const,
  options: [
    { id: 'nimble', label: 'Ágil' },
    { id: 'savage', label: 'Selvagem' },
  ],
  hint: 'Ágil ou selvagem. O motor não escolhe.',
  abilityName: 'Companheiro {choice}',
  abilityDescription: 'O companheiro ganha as capacidades do tipo escolhido.',
}

const COMPANION_SPECS = [
  { id: 'ambusher', label: 'Emboscador' },
  { id: 'bully', label: 'Valentão' },
  { id: 'daredevil', label: 'Destemido' },
  { id: 'racer', label: 'Corredor' },
  { id: 'tracker', label: 'Rastreador' },
  { id: 'wrecker', label: 'Destruidor' },
]

const rivethunInvolutionistArchetypeFeats: Feat[] = [
  f({
    id: DED_RIV.id,
    name: DED_RIV.name,
    originalName: 'Rivethun Involutionist Dedication',
    level: 2,
    archetypeId: 'archetype-rivethun-involutionist',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained' },
      { kind: 'skillRank', skillId: 'religion', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Natureza e Religião; acesso de seguidor de Rivethun' },
    ],
    description:
      'Perito em Natureza e Religião. Conjura magias (Conjurar uma Magia). Repertório com dois truques comuns da lista divina (ou outros divinos que tenha aprendido). Treinado em ataque e CD de magia. Atributo-chave: Sabedoria. Você escolhe os dois truques; o motor não escolhe.',
    effects: [
      { kind: 'skillRank', skillId: 'nature', rank: 'expert' },
      { kind: 'skillRank', skillId: 'religion', rank: 'expert' },
      { kind: 'spellcasting', access: RIVETHUN_SPELL },
      {
        kind: 'specialAbility',
        name: 'Dois truques divinos no repertório',
        description: 'Você escolhe os dois truques. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7588',
  }),
  f({
    id: 'feat-rivethun-involutionist-basic-spellcasting',
    name: 'Conjuração Básica de Rivethun',
    originalName: 'Basic Rivethun Spellcasting',
    level: 4,
    archetypeId: 'archetype-rivethun-involutionist',
    prereqId: DED_RIV.id,
    prereqName: DED_RIV.name,
    description:
      'Benefícios de conjuração básica. Sempre que ganhar espaço de um posto novo deste arquétipo, adicione ao repertório uma magia divina comum daquele posto, outra que tenha aprendido ou qualquer divina a que tenha acesso. Você escolhe cada magia; o motor não escolhe.',
    effects: [{ kind: 'spellcastingTier', sourceId: RIVETHUN_SPELL.id, tier: 'basic' }],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=310',
  }),
  f({
    id: 'feat-rivethun-involutionist-spirit-companion',
    name: 'Companheiro Espiritual',
    originalName: 'Spirit Companion',
    level: 4,
    archetypeId: 'archetype-rivethun-involutionist',
    prereqId: DED_RIV.id,
    prereqName: DED_RIV.name,
    description:
      'Companheiro animal jovem abençoado pelos espíritos. Se já tiver companheiro, o atual fica abençoado. Regras usuais de companheiro. Sustentar (companheiro a 18 m): o dano dos Golpes dele vira espírito até o início do seu próximo turno. Você escolhe o tipo do companheiro; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro animal jovem abençoado',
        description:
          'Adicione o companheiro em Companheiros (ou abençoe o atual). Você escolhe o tipo. Sustentar: dano dos Golpes vira espírito.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=310',
  }),
  f({
    id: 'feat-rivethun-involutionist-mature-animal-companion',
    name: 'Companheiro Animal Maduro',
    originalName: 'Mature Animal Companion (Druid)',
    level: 6,
    archetypeId: 'archetype-rivethun-involutionist',
    prereqId: 'feat-rivethun-involutionist-spirit-companion',
    prereqName: 'Companheiro Espiritual',
    extraPrereq: [{ kind: 'text', label: 'Companheiro animal' }],
    description:
      'O companheiro fica maduro. Independência: no encontro, mesmo sem Comandar um Animal, pode usar 1 ação no seu turno para Golpear ou Avançar (ou Cavar/Escalar/Voar/Nadar). Se o fizer, é tudo o que faz na rodada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro maduro',
        description: 'Avance o estágio para maduro na ficha. Independência de 1 ação.',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=310',
  }),
  f({
    id: 'feat-rivethun-involutionist-incredible-companion',
    name: 'Companheiro Incrível',
    originalName: 'Incredible Companion (Druid)',
    level: 8,
    archetypeId: 'archetype-rivethun-involutionist',
    prereqId: 'feat-rivethun-involutionist-mature-animal-companion',
    prereqName: 'Companheiro Animal Maduro',
    description:
      'O companheiro vira ágil ou selvagem. Você escolhe; o motor não escolhe.',
    effects: [
      {
        ...NIMBLE_OR_SAVAGE,
        choiceId: 'rivethun-companion-incredible',
      },
    ],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=310',
  }),
  f({
    id: 'feat-rivethun-involutionist-expert-spellcasting',
    name: 'Conjuração Perita de Rivethun',
    originalName: 'Expert Rivethun Spellcasting',
    level: 12,
    archetypeId: 'archetype-rivethun-involutionist',
    prereqId: 'feat-rivethun-involutionist-basic-spellcasting',
    prereqName: 'Conjuração Básica de Rivethun',
    description: 'Benefícios de conjuração perita deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: RIVETHUN_SPELL.id, tier: 'expert' }],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=310',
  }),
  f({
    id: 'feat-rivethun-involutionist-specialized-spirit-companion',
    name: 'Companheiro Espiritual Especializado',
    originalName: 'Specialized Spirit Companion',
    level: 14,
    archetypeId: 'archetype-rivethun-involutionist',
    prereqId: 'feat-rivethun-involutionist-incredible-companion',
    prereqName: 'Companheiro Incrível',
    description:
      'O companheiro ganha a especialização espírito-abençoado: Golpes com os efeitos da runa toque fantasma. Se já tiver espírito-abençoado, ganha outra especialização à sua escolha. Pode selecionar até 3 vezes; a primeira deve ser espírito-abençoado. O motor não escolhe as seguintes.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'rivethun-spirit-spec',
        options: [
          { id: 'spirit-blessed', label: 'Espírito-abençoado (obrigatória na 1ª vez; toque fantasma)' },
          ...COMPANION_SPECS,
        ],
        hint: 'Na 1ª vez, espírito-abençoado. Depois, outra. O motor não escolhe.',
        abilityName: 'Especialização: {choice}',
        abilityDescription: 'O companheiro ganha essa especialização.',
      },
    ],
    repeatable: true,
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=310',
  }),
  f({
    id: 'feat-rivethun-involutionist-master-spellcasting',
    name: 'Conjuração Mestra de Rivethun',
    originalName: 'Master Rivethun Spellcasting',
    level: 18,
    archetypeId: 'archetype-rivethun-involutionist',
    prereqId: 'feat-rivethun-involutionist-expert-spellcasting',
    prereqName: 'Conjuração Perita de Rivethun',
    description: 'Benefícios de conjuração mestra deste arquétipo.',
    effects: [{ kind: 'spellcastingTier', sourceId: RIVETHUN_SPELL.id, tier: 'master' }],
    sourceId: SOURCE_DIVINE_MYSTERIES_ID,
    sourcePage: 295,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=310',
  }),
]

const nidaleseHorselordArchetypeFeats: Feat[] = [
  f({
    id: DED_HORSE.id,
    name: DED_HORSE.name,
    originalName: 'Nidalese Horselord Dedication',
    level: 2,
    archetypeId: 'archetype-nidalese-horselord',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained' },
      {
        kind: 'text',
        label:
          'Treinado em Natureza; companheiro animal cavalo. Com Dedicação de Cavalheiro, pode pegar mesmo sem dois feitos de cavalheiro.',
      },
    ],
    description:
      'Você e o cavalo ganham visão no escuro e +1 de status em salvaguardas contra escuridão ou sombra. Deslocamento do cavalo +1,5 m. Éditos: opor-se à Corte Umbral quando possível; confortar quem sofre na escuridão. Anátema: maltratar o cavalo; cultuar Zon-Kuthon ou aliar-se em permanência a quem o cultua. Especial: com Dedicação de Cavalheiro, pode pegar esta Dedicação mesmo sem dois feitos de cavalheiro.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Vínculo nidalese',
        description:
          'Você e o cavalo: visão no escuro; +1 de status vs escuridão/sombra. Cavalo: Deslocamento +1,5 m. Éditos e anátema contra a Corte Umbral e Zon-Kuthon.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-face-your-fears',
    name: 'Enfrente Seus Medos',
    originalName: 'Face Your Fears',
    level: 4,
    archetypeId: 'archetype-nidalese-horselord',
    traits: ['Arquétipo', 'Emoção', 'Mental'],
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'Reduza amedrontado em 1. Se isso zerar, deixa de estar amedrontado e ganha +1 de circunstância contra efeitos de medo por 1 minuto.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'salvaguardas vs medo por 1 minuto, se Enfrente Seus Medos zerar amedrontado',
      },
    ],
    actionType: 'one',
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8938',
  }),
  f({
    id: 'feat-nidalese-horselord-favored-terrain',
    name: 'Terreno Favorecido',
    originalName: 'Favored Terrain',
    level: 4,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'Escolha um terreno: aquático, ártico, deserto, floresta, montanha, planície, céu, pântano ou subterrâneo. Lá, ignore terreno difícil não mágico. Com jornada desimpedida, ganha o segundo benefício do patrulheiro naquele terreno. Você escolhe o terreno; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'nidalese-horselord-terrain',
        options: [
          { id: 'aquatic', label: 'Aquático' },
          { id: 'arctic', label: 'Ártico' },
          { id: 'desert', label: 'Deserto' },
          { id: 'forest', label: 'Floresta' },
          { id: 'mountain', label: 'Montanha' },
          { id: 'plains', label: 'Planície' },
          { id: 'sky', label: 'Céu' },
          { id: 'swamp', label: 'Pântano' },
          { id: 'underground', label: 'Subterrâneo' },
        ],
        hint: 'Terreno favorecido. O motor não escolhe.',
        abilityName: 'Terreno favorecido: {choice}',
        abilityDescription: 'Ignore terreno difícil não mágico nesse terreno.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-repel-darkness',
    name: 'Repelir a Escuridão',
    originalName: 'Repel Darkness',
    level: 4,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'Por 1 minuto, suprime escuridão mágica de posto ≤ metade do seu nível (arredondado para cima) numa emanação de 3 m. Não gera luz: restaura a iluminação natural. Pode Dispensar. Se o cavalo for ao menos maduro e estiver a 30 m, a aura pode emanar dele.',
    actionType: 'two',
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-fear-no-pain',
    name: 'Não Tema a Dor!',
    originalName: 'Fear No Pain!',
    level: 6,
    archetypeId: 'archetype-nidalese-horselord',
    traits: ['Arquétipo', 'Auditivo', 'Fortuna', 'Linguístico'],
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'O aliado disparador pode rerrolar a salvaguarda falha com +2 de circunstância.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'rerrolagem da salvaguarda do aliado (Não Tema a Dor!)',
      },
    ],
    actionType: 'reaction',
    trigger: 'Um aliado a 9 m falha numa salvaguarda contra efeito mental.',
    frequency: '1 vez por hora',
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8940',
  }),
  f({
    id: 'feat-nidalese-horselord-mature-animal-companion',
    name: 'Companheiro Animal Maduro',
    originalName: 'Mature Animal Companion (Druid)',
    level: 6,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    extraPrereq: [{ kind: 'text', label: 'Companheiro animal cavalo' }],
    description:
      'O cavalo fica maduro. Independência: no encontro, mesmo sem Comandar um Animal, pode usar 1 ação no seu turno para Golpear ou Avançar. Se o fizer, é tudo o que faz na rodada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro maduro',
        description: 'Avance o estágio do cavalo para maduro na ficha. Independência de 1 ação.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-swift-support',
    name: 'Apoio Veloz',
    originalName: 'Swift Support',
    level: 6,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'Quando comanda o cavalo a usar Apoiar, ele ganha +1,5 m de circunstância no Deslocamento até o início do seu próximo turno.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 5,
        appliesTo: 'Deslocamento do cavalo (pés) até o início do próximo turno, ao Apoiar',
      },
    ],
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-dismounting-strike',
    name: 'Golpe ao Desmontar',
    originalName: 'Dismounting Strike',
    level: 8,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Montado no cavalo; a ação anterior foi Comandar um Animal para ele Avançar ao menos uma vez',
      },
    ],
    description:
      'Desmonte (Montar) para qualquer espaço a 3 m da montaria se o cavalo moveu ao menos 4,5 m. Então Golpeie corpo a corpo. Conta como dois ataques na penalidade de ataque múltiplo. Acerto: +1 dado de dano da arma (+2 dados no 14º).',
    actionType: 'one',
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8942',
  }),
  f({
    id: 'feat-nidalese-horselord-swallow-pain',
    name: 'Engolir a Dor',
    originalName: 'Swallow Pain',
    level: 8,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description: 'Você e a montaria ganham resistência a mental igual à metade do seu nível.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência a mental (metade do nível)',
        description: 'Você e a montaria. Igual à metade do nível.',
      },
    ],
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-horselords-bond',
    name: 'Vínculo do Senhor dos Cavalos',
    originalName: "Horselord's Bond",
    level: 10,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'Você e o cavalo ganham visão no escuro maior. Quando o cavalo obtém sucesso em salvaguarda contra confuso, controlado ou fascinado, vira sucesso crítico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Visão no escuro maior; salvaguardas do cavalo',
        description:
          'Você e o cavalo. Sucesso do cavalo vs confuso/controlado/fascinado = sucesso crítico.',
      },
    ],
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-incredible-companion',
    name: 'Companheiro Incrível',
    originalName: 'Incredible Companion (Druid)',
    level: 10,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: 'feat-nidalese-horselord-mature-animal-companion',
    prereqName: 'Companheiro Animal Maduro',
    description:
      'O cavalo vira ágil ou selvagem. Você escolhe; o motor não escolhe.',
    effects: [
      {
        ...NIMBLE_OR_SAVAGE,
        choiceId: 'nidalese-horselord-incredible',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-penetrating-shot',
    name: 'Tiro Penetrante',
    originalName: 'Penetrating Shot',
    level: 12,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando arma à distância; feito adicional de patrulheiro' }],
    description:
      'Feito adicional de patrulheiro. Escolha um alvo que dê cobertura menor à sua presa caçada. Um único Golpe à distância contra o escolhido e a presa; ignora a cobertura menor que o escolhido dá à presa. Role o dano uma vez e aplique a cada um que acertar. Conta como dois ataques na penalidade de ataque múltiplo.',
    actionType: 'two',
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4891',
  }),
  f({
    id: 'feat-nidalese-horselord-shadowpiercing-charge',
    name: 'Investida Perfura-Sombras',
    originalName: 'Shadowpiercing Charge',
    level: 12,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    extraPrereq: [{ kind: 'text', label: 'Montado no cavalo e empunhando arma corpo a corpo' }],
    description:
      'Comande o Animal: a montaria Avança até o dobro do Deslocamento. Até dois Golpes corpo a corpo contra inimigos no alcance em qualquer ponto do movimento. Ambos contam na penalidade de ataque múltiplo, mas ela só sobe depois dos dois. Cada Golpe que acertar criatura em luz fraca ou escuridão causa +3d6 do mesmo tipo (4d6 no 15º, 5d6 no 18º).',
    actionType: 'three',
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8945',
  }),
  f({
    id: 'feat-nidalese-horselord-defy-chains',
    name: 'Desafiar as Correntes',
    originalName: 'Defy Chains',
    level: 14,
    archetypeId: 'archetype-nidalese-horselord',
    traits: ['Arquétipo', 'Oculto', 'Santificado'],
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'Você toma +4d6 de dano e causa 4d6 de espírito ao demônio disparador (5d6 no 18º). Se o demônio tiver aura e você estiver nela, Intimidação para contrapor a aura (posto = metade do nível, para cima); sucesso suprime até o fim do próximo turno do demônio.',
    actionType: 'reaction',
    trigger: 'Um demônio a 4,5 m causa dano a você com um Golpe.',
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8946',
  }),
  f({
    id: 'feat-nidalese-horselord-gallop-across-shadow',
    name: 'Galopar pela Sombra',
    originalName: 'Gallop Across Shadow',
    level: 16,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    description:
      'Ao mover-se por escuridão, o cavalo trata espaços vazios como chão sólido (cruzar vãos ou subir/descer no máximo a 45°). Se não estiver em chão real e a área virar luz fraca ou mais clara, o cavalo cai.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Escuridão como chão sólido',
        description: 'O cavalo trata escuridão como terreno sólido. Cai se a área clarear.',
      },
    ],
    sourcePage: 121,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
  f({
    id: 'feat-nidalese-horselord-sense-the-unseen',
    name: 'Sentir o Invisível',
    originalName: 'Sense the Unseen',
    level: 16,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: DED_HORSE.id,
    prereqName: DED_HORSE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de patrulheiro' }],
    description:
      'Feito adicional de patrulheiro. Mesmo tendo falhado no teste disparador, sente automaticamente criaturas não detectadas na área em que Busca; ficam apenas ocultas.',
    actionType: 'reaction',
    trigger: 'Você falha num teste de Percepção para Buscar.',
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4898',
  }),
  f({
    id: 'feat-nidalese-horselord-specialized-companion',
    name: 'Companheiro Especializado',
    originalName: 'Specialized Companion (Druid)',
    level: 16,
    archetypeId: 'archetype-nidalese-horselord',
    prereqId: 'feat-nidalese-horselord-incredible-companion',
    prereqName: 'Companheiro Incrível',
    description:
      'O companheiro ganha uma especialização à sua escolha. Pode selecionar até 3 vezes; cada vez, uma especialização diferente. O motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'nidalese-horselord-spec',
        options: COMPANION_SPECS,
        hint: 'Especialização do companheiro. Até 3, todas diferentes. O motor não escolhe.',
        abilityName: 'Especialização: {choice}',
        abilityDescription: 'O cavalo ganha essa especialização.',
      },
    ],
    repeatable: true,
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=381',
  }),
]

const underseaPrivateerArchetypeFeats: Feat[] = [
  f({
    id: DED_SEA.id,
    name: DED_SEA.name,
    originalName: 'Undersea Privateer Dedication',
    level: 2,
    archetypeId: 'archetype-undersea-privateer',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo' },
    ],
    description:
      'Perito em Atletismo. Ganha o feito de perícia Saqueador Subaquático. Se for ao menos perito na arma ao lutar na água ou debaixo d’água, aplica a especialização crítica dela no crítico.',
    effects: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'expert' },
      {
        kind: 'specialAbility',
        name: 'Saqueador Subaquático',
        description:
          'Não fica desprevenido na água; sem as penalidades usuais de arma corpo a corpo de concussão ou corte na água. Crítico: especialização crítica se for perito na arma, debaixo d’água.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-anchor-stance',
    name: 'Postura de Âncora',
    originalName: 'Anchor Stance',
    level: 4,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Postura. +2 de circunstância na CD de Fortitude ou Reflexos contra Reposicionar ou Empurrar, e em salvaguardas contra efeitos que forcem movimento. Se um efeito forçaria 3 m ou mais, teste simples CD 11: sucesso = move só 1,5 m. Não precisa Nadar a cada turno para não afundar nem seguir a corrente.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'CD de Fortitude/Reflexos vs Reposicionar ou Empurrar (Postura de Âncora)',
      },
    ],
    actionType: 'one',
    sourcePage: 96,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-fast-swimmer',
    name: 'Nadador Rápido',
    originalName: 'Fast Swimmer',
    level: 4,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem Deslocamento de natação' }],
    description: 'Deslocamento de natação +1,5 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Natação +1,5 m',
        description: 'Não é bônus de Deslocamento terrestre. Some +1,5 m ao Deslocamento de natação.',
      },
    ],
    sourcePage: 96,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8917',
  }),
  f({
    id: 'feat-undersea-privateer-trained-swimmer',
    name: 'Nadador Treinado',
    originalName: 'Trained Swimmer',
    level: 4,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Ganha Deslocamento de natação de 4,5 m. Se já tiver Deslocamento de natação permanente, nadar para cima ou para baixo não é terreno difícil.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Natação 4,5 m (ou subir/descer sem terreno difícil)',
        description:
          'Se já nadava, subir/descer deixa de ser terreno difícil. Não é bônus de Deslocamento terrestre.',
      },
    ],
    sourcePage: 96,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-float-free',
    name: 'Flutuar Livre',
    originalName: 'Float Free',
    level: 6,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    extraPrereq: [{ kind: 'text', label: 'Você está debaixo d’água' }],
    description:
      'Mova 1,5 m ou até metade do Deslocamento de natação na vertical. Esse movimento não dispara reações normalmente disparadas por movimento.',
    actionType: 'one',
    frequency: '1 vez por rodada',
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8919',
  }),
  f({
    id: 'feat-undersea-privateer-slippery-as-an-eel',
    name: 'Escorregadio como Enguia',
    originalName: 'Slippery as an Eel',
    level: 6,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Debaixo d’água, +2 de circunstância em Acrobacia para Escapar, Espremer-se e Rolar Através.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Acrobacia para Escapar, Espremer-se e Rolar Através (debaixo d’água)',
      },
    ],
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-stealthy-as-an-octopus',
    name: 'Furtivo como Polvo',
    originalName: 'Stealthy as an Octopus',
    level: 6,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Se estiver separado de uma criatura por 6 m ou mais de água, a turbulência dá cobertura suficiente para Esconder-se dela.',
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-boarding-party',
    name: 'Equipe de Abordagem',
    originalName: 'Boarding Party',
    level: 8,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Pode Escalar veículo marítimo com uma mão ocupada. Com as duas mãos livres, +2 de circunstância em Atletismo. Não fica desprevenido ao Equilibrar-se ou Escalar em qualquer parte de um veículo marítimo.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Atletismo para Escalar veículo marítimo com as duas mãos livres',
      },
    ],
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-riptide',
    name: 'Correnteza',
    originalName: 'Riptide',
    level: 8,
    archetypeId: 'archetype-undersea-privateer',
    traits: ['Arquétipo', 'Ataque', 'Manipular'],
    prereqId: 'feat-undersea-privateer-anchor-stance',
    prereqName: 'Postura de Âncora',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Em Postura de Âncora; o alvo está a 1,5 m da borda de um veículo aquático ou já na água',
      },
    ],
    description:
      'Atletismo vs CD de Fortitude de uma criatura a 6 m. Se for voluntária, o grau de sucesso sobe um passo. Sucesso crítico: puxa 3 m. Sucesso: puxa 1,5 m. Falha crítica: você fica desprevenido até o início do próximo turno.',
    actionType: 'one',
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8923',
  }),
  f({
    id: 'feat-undersea-privateer-ships-shadow',
    name: 'Sombra do Navio',
    originalName: "Ship's Shadow",
    level: 10,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Na água a 6 m de um veículo marítimo, ou ao escalá-lo, pode Furtar-se com Deslocamento total.',
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-propelled-leap',
    name: 'Salto Impulsionado',
    originalName: 'Propelled Leap',
    level: 12,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Nade rumo à superfície até o dobro do Deslocamento de natação, depois Atletismo CD 30 para sair da água. Sem nadar ao menos 3 m, falha automática. Perto de estrutura ou objeto e com uma mão livre, pode Agarrar a Borda. Se não agarrar, não toma dano de queda ao voltar à água, mas submerge à altura do Salto. Sucesso crítico: Salto 4,5 m vertical e 1,5 m horizontal. Sucesso: 3 m e 1,5 m. Falha: 1,5 m e 1,5 m. Falha crítica: desprevenido até o início do próximo turno.',
    actionType: 'two',
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-shroud-of-the-seas',
    name: 'Manto dos Mares',
    originalName: 'Shroud of the Seas',
    level: 12,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Totalmente debaixo d’água, fica oculto a oponentes fora da água, e escondido daqueles fora da água a mais de 3 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Camuflagem submersa',
        description: 'Oculto a quem está fora da água; escondido se estiver a mais de 3 m.',
      },
    ],
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
  f({
    id: 'feat-undersea-privateer-sailfish-strike',
    name: 'Golpe de Peixe-vela',
    originalName: 'Sailfish Strike',
    level: 14,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: 'feat-undersea-privateer-propelled-leap',
    prereqName: 'Salto Impulsionado',
    extraPrereq: [{ kind: 'text', label: 'Salto Impulsionado' }],
    description:
      'No topo do Salto Impulsionado, Golpeie corpo a corpo ou à distância em vez de Agarrar a Borda. O Golpe ganha +4 de circunstância no dano. Depois, acerte ou erre, cai de volta na água.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 4,
        appliesTo: 'dano do Golpe no topo do Salto Impulsionado',
      },
    ],
    actionType: 'reaction',
    trigger: 'Você chega ao topo do Salto Impulsionado.',
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8927',
  }),
  f({
    id: 'feat-undersea-privateer-tidal-wave',
    name: 'Onda de Maré',
    originalName: 'Tidal Wave',
    level: 16,
    archetypeId: 'archetype-undersea-privateer',
    prereqId: DED_SEA.id,
    prereqName: DED_SEA.name,
    description:
      'Mova até o Deslocamento e faça dois Golpes em qualquer ponto do movimento. Se qualquer Golpe reduzir um alvo a 0 PV, fica acelerado por 1 rodada; a ação extra só para Avançar ou Nadar.',
    actionType: 'three',
    sourcePage: 97,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=379',
  }),
]

const roseWardenArchetypeFeats: Feat[] = [
  f({
    id: DED_ROSE.id,
    name: DED_ROSE.name,
    originalName: 'Rose Warden Dedication',
    level: 2,
    archetypeId: 'archetype-rose-warden',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'stealth', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Furtividade; cultua Milani' },
    ],
    description:
      'Treinado em Enganação. Se já era treinado em Enganação, fica perito em Enganação ou Furtividade (você escolhe; o motor não escolhe). Crítico para Mentir a uma figura de autoridade: +1 de circunstância na CD de Fortitude e em salvaguardas contra confuso, controlado, agarrado, imobilizado ou restringido por aquela autoridade por 24 h. Adiciona éditos e anátema de Milani; violá-los perde os benefícios do arquétipo até ritual de expiação.',
    effects: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      {
        kind: 'skillRankChoice',
        choiceId: 'rose-warden-expert',
        rank: 'expert',
        skillOptions: ['deception', 'stealth'],
        requireRank: 'trained',
        hint: 'Só se já era treinado em Enganação. Escolha Enganação ou Furtividade para perito. O motor não escolhe.',
      },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo:
          'CD de Fortitude e salvaguardas vs confuso/controlado/agarrado/imobilizado/restringido pela autoridade a quem Mentiu no crítico (24 h)',
      },
      {
        kind: 'specialAbility',
        name: 'Éditos e anátema de Milani',
        description:
          'Se já era treinado em Enganação, fique perito em Enganação ou Furtividade (você escolhe). Violar éditos/anátema perde os benefícios até expiação.',
      },
    ],
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=378',
  }),
  f({
    id: 'feat-rose-warden-blessed-thorn-strike',
    name: 'Golpe do Espinho Abençoado',
    originalName: 'Blessed Thorn Strike',
    level: 4,
    archetypeId: 'archetype-rose-warden',
    traits: ['Arquétipo', 'Divino', 'Ímpeto', 'Santificado'],
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    extraPrereq: [
      { kind: 'text', label: 'Você viu um inimigo ferir um aliado com Golpe ou magia na rodada anterior' },
    ],
    description:
      'Golpeie o inimigo disparador. Se acertar e causar dano, Fortitude vs a maior entre CD de classe e CD de magia: falha = enfraquecido 1 (enfraquecido 2 na falha crítica).',
    actionType: 'one',
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8907',
  }),
  f({
    id: 'feat-rose-warden-holy-bloom',
    name: 'Floração Sagrada',
    originalName: 'Holy Bloom',
    level: 4,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    description:
      'Santificação sagrada. Escolha o domínio liberdade ou zelo e ganhe a magia inicial desse domínio. Se não tiver, ganha reserva de 1 ponto de foco. Refoco: orar a Milani ou planejar uma revolta justa. Treinado em ataque e CD de magia; atributo Sabedoria. Pode pegar de novo para o outro domínio. Você escolhe o domínio; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: ROSE_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'rose-warden-domain',
        options: [
          { id: 'freedom', label: 'Liberdade (passada desimpedida)' },
          { id: 'zeal', label: 'Zelo (surto de arma)' },
        ],
        hint: 'Domínio. Na 2ª vez, o outro. O motor não escolhe.',
        abilityName: 'Domínio: {choice}',
        abilityDescription: 'Magia inicial de domínio como magia de devoção divina (Sabedoria).',
      },
      {
        kind: 'specialAbility',
        name: 'Santificação sagrada',
        description: 'Você ganha santificação sagrada (holy).',
      },
    ],
    repeatable: true,
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=378',
  }),
  f({
    id: 'feat-rose-warden-quick-draw',
    name: 'Saque Rápido',
    originalName: 'Quick Draw',
    level: 4,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino/patrulheiro' }],
    description: 'Interaja para sacar uma arma e então Golpeie com ela.',
    actionType: 'one',
    sourcePage: 84,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=378',
  }),
  f({
    id: 'feat-rose-warden-reactive-pursuit',
    name: 'Perseguição Reativa',
    originalName: 'Reactive Pursuit',
    level: 6,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description:
      'Feito adicional de ladino. Avance, mas termine adjacente ao inimigo disparador. Esse movimento não dispara reações dele. Pode Cavar, Escalar, Voar ou Nadar no lugar de Avançar se tiver o deslocamento.',
    actionType: 'reaction',
    trigger:
      'Um inimigo adjacente se afasta, e você alcança ao menos um espaço adjacente a ele com Avançar.',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4935',
  }),
  f({
    id: 'feat-rose-warden-unbalancing-appearance',
    name: 'Aparição Desequilibrante',
    originalName: 'Unbalancing Appearance',
    level: 6,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Uma criatura no seu alcance está desprevenida contra você, e você está despercebido por ela',
      },
    ],
    description:
      'Golpeie corpo a corpo. Se acertar, o alvo permanece desprevenido pelo resto do seu turno e fica desajeitado 1 (desajeitado 2 no crítico) até o início do seu próximo turno.',
    actionType: 'one',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8909',
  }),
  f({
    id: 'feat-rose-warden-unfettering-strike',
    name: 'Golpe Libertador',
    originalName: 'Unfettering Strike',
    level: 6,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    extraPrereq: [{ kind: 'text', label: 'Uma criatura no seu alcance tem um aliado agarrado ou restringido' }],
    description:
      'Golpeie corpo a corpo. Se acertar e causar dano, o aliado tenta Escapar como ação livre. Crítico: o aliado ganha +2 de circunstância na tentativa.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Escapar do aliado se o Golpe Libertador for crítico',
      },
    ],
    actionType: 'one',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8910',
  }),
  f({
    id: 'feat-rose-warden-liberated-mind',
    name: 'Mente Liberta',
    originalName: 'Liberated Mind',
    level: 8,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    description:
      'Rerrole a salvaguarda disparadora, usando o novo resultado. Se o efeito causaria confuso ou controlado, +2 de status na rerrolagem.',
    actionType: 'reaction',
    trigger: 'Você falha numa salvaguarda contra efeito mental.',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8911',
  }),
  f({
    id: 'feat-rose-warden-light-step',
    name: 'Passo Leve',
    originalName: 'Light Step',
    level: 8,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description: 'Feito adicional de ladino. Ao Avançar ou Dar um Passo, ignore terreno difícil.',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4944',
  }),
  f({
    id: 'feat-rose-warden-wall-of-roses',
    name: 'Muro de Rosas',
    originalName: 'Wall of Roses',
    level: 8,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    description:
      'Muro de espinhos inato divino de 4º posto 1/dia. O muro é imune a fogo; o dano perfurante dos espinhos conta como prata contra resistências. Seguidores de Milani não tratam os espaços como terreno difícil e não tomam dano ao entrar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Muro de espinhos inato (4º, 1/dia)',
        description: 'Divino. Imune a fogo; espinhos de prata. Seguidores de Milani atravessam sem dano.',
      },
    ],
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=378',
  }),
  f({
    id: 'feat-rose-warden-holy-flower',
    name: 'Flor Sagrada',
    originalName: 'Holy Flower',
    level: 10,
    archetypeId: 'archetype-rose-warden',
    prereqId: 'feat-rose-warden-holy-bloom',
    prereqName: 'Floração Sagrada',
    extraPrereq: [{ kind: 'text', label: 'Floração Sagrada; repetível se pegou Floração Sagrada duas vezes' }],
    description:
      'Ganha a magia avançada do domínio escolhido em Floração Sagrada. Se pegou Floração Sagrada duas vezes, pode pegar este feito de novo para o outro domínio. O motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: ROSE_SPELL },
      {
        kind: 'specialAbility',
        name: 'Magia avançada de domínio',
        description: 'Do domínio de Floração Sagrada. Na 2ª vez, o outro domínio.',
      },
    ],
    repeatable: true,
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=378',
  }),
  f({
    id: 'feat-rose-warden-rise-up',
    name: 'Levantem-se!',
    originalName: 'Rise Up!',
    level: 12,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    description:
      'Você e dois aliados a 18 m que o ouçam e compreendam podem Levantar-se como ação livre sem disparar reações. Todos os alvos ganham Deslocamento de voo igual ao Deslocamento ou 6 m (o que for maior) por 1 minuto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo (1 minuto)',
        description: 'Você e até 2 aliados: voo = Deslocamento ou 6 m. Levantar-se livre sem reações.',
      },
    ],
    actionType: 'two',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=378',
  }),
  f({
    id: 'feat-rose-warden-spring-from-the-shadows',
    name: 'Saltar das Sombras',
    originalName: 'Spring from the Shadows',
    level: 14,
    archetypeId: 'archetype-rose-warden',
    prereqId: DED_ROSE.id,
    prereqName: DED_ROSE.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description:
      'Avance até o Deslocamento, termine adjacente a um inimigo de quem está escondido ou não detectado, e Golpeie (ainda escondido/não detectado até depois do Golpe). Vale com Cavar/Escalar/Voar/Nadar.',
    actionType: 'one',
    sourcePage: 85,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=378',
  }),
]

const werecreatureArchetypeFeats: Feat[] = [
  f({
    id: DED_WERE.id,
    name: DED_WERE.name,
    originalName: 'Werecreature Dedication',
    level: 2,
    archetypeId: 'archetype-werecreature',
    isDedication: true,
    rarity: 'rare',
    extraPrereq: [
      { kind: 'text', label: 'Nascido verdadeiro homem-fera ou afligido pela maldição do homem-fera' },
    ],
    description:
      'Traços besta e homem-fera. Escolha o tipo (uma vez; não muda). Ganha Resistência (Toughness) e fraqueza a prata igual à metade do nível. Mudar Forma (1 ação, concentração, polimorfia, primordial): forma híbrida ou animal. Equipamento se transforma; na forma animal não usa armas, escudos, itens empunhados nem ações de manipular. Deslocamento, ataques desarmados (grupo briga) e habilidades conforme o tipo. Dispensar volta à forma humanóide; a 0 PV volta automaticamente. Na lua cheia, assume híbrido automaticamente e não pode ativar/dispensar até o nascer do sol. Bestial: ataques desarmados da forma híbrida de bestial valem na híbrida de homem-fera. Você escolhe o tipo; o motor não escolhe.',
    effects: [
      { kind: 'hpPerLevel', value: 1 },
      {
        kind: 'textChoice',
        choiceId: 'werecreature-type',
        options: [
          {
            id: 'werebat',
            label:
              'Morcego — Desl. 3 m, voo 4,5 m; Presas 1d8 perfurante. Ao Voar, deve começar e terminar em superfície sólida ou cai.',
          },
          {
            id: 'werebear',
            label: 'Urso — Desl. 7,5 m; Mandíbulas 1d8 perfurante; Garra 1d6 corte (ágil).',
          },
          {
            id: 'wereboar',
            label: 'Javali — Desl. 9 m; Presa 1d8 corte (varredura).',
          },
          {
            id: 'werecrocodile',
            label:
              'Crocodilo — Desl. 7,5 m, natação 4,5 m; Mandíbulas 1d8 perfurante (agarrar). Prender a respiração 2 h na forma animal ou híbrida.',
          },
          {
            id: 'weremoose',
            label: 'Alce — Desl. 7,5 m; Galhada 1d8 perfurante (empurrar).',
          },
          {
            id: 'wererat',
            label:
              'Rato — Desl. 7,5 m; Mandíbulas 1d6 perfurante (acuidade); Garra 1d4 corte (ágil, acuidade). Forma animal Pequena.',
          },
          {
            id: 'wereshark',
            label:
              'Tubarão — Desl. 4,5 m, natação 7,5 m; Mandíbulas 1d8 perfurante (agarrar). Híbrido: anfíbio. Animal: perde Desl. terrestre, natação 10,5 m, traço aquático.',
          },
          {
            id: 'weretiger',
            label: 'Tigre — Desl. 7,5 m; Mandíbulas 1d8 perfurante; Garra 1d6 corte (ágil).',
          },
          {
            id: 'werewolf',
            label: 'Lobo — Desl. 9 m; Mandíbulas 1d8 perfurante (derrubar).',
          },
        ],
        hint: 'Tipo de homem-fera. Uma vez escolhido, não muda. O motor não escolhe.',
        abilityName: 'Tipo: {choice}',
        abilityDescription:
          'Velocidade, ataques e traços conforme a tabela do tipo. Fraqueza a prata = metade do nível. Mudar Forma 1 ação.',
      },
      {
        kind: 'specialAbility',
        name: 'Mudar Forma; fraqueza a prata; lua cheia',
        description:
          '1 ação. Formas híbrida e animal. Fraqueza a prata = metade do nível. Lua cheia: híbrido automático até o nascer do sol. Resistência: +1 PV por nível e −1 na CD de recuperação.',
        actionType: 'one',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5486',
  }),
  f({
    id: 'feat-werecreature-animal-fleetness',
    name: 'Agilidade Animal',
    originalName: 'Animal Fleetness',
    level: 4,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description: 'Na forma animal, os Deslocamentos concedidos por essa forma aumentam em 3 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Deslocamentos da forma animal +3 m',
        description: 'Só na forma animal. Não é bônus de Deslocamento terrestre genérico.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-beastkin-resilience',
    name: 'Resiliência de Bestial',
    originalName: 'Beastkin Resilience',
    level: 4,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description: 'Você não ganha mais a fraqueza a prata da Dedicação de Homem-fera.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sem fraqueza a prata da Dedicação',
        description: 'Remove a fraqueza a prata concedida pela Dedicação de Homem-fera.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-feral-senses',
    name: 'Sentidos Ferais',
    originalName: 'Feral Senses',
    level: 4,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description:
      'Na forma híbrida ou animal, visão na penumbra e faro impreciso com alcance de 9 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Visão na penumbra e faro 9 m',
        description: 'Só nas formas híbrida e animal. Faro impreciso.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-antler-rush',
    name: 'Investida de Galhada',
    originalName: 'Antler Rush',
    level: 6,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Tipo homem-alce (weremoose); forma de alce ou híbrida' }],
    description:
      'Avance duas vezes. Se terminar o movimento no alcance da galhada de um inimigo, pode Desarmar, Empurrar ou Golpear com a galhada.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 76,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5490',
  }),
  f({
    id: 'feat-werecreature-bear-hug',
    name: 'Abraço de Urso',
    originalName: 'Bear Hug (Werecreature)',
    level: 6,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Tipo homem-urso (werebear); forma de urso ou híbrida; a ação anterior foi um Golpe de garra bem-sucedido',
      },
    ],
    description:
      'Outro Golpe de garra contra o mesmo alvo. Se acertar, o alvo fica agarrado até o fim do seu próximo turno, a menos que você se mova ou ele Escape.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5491',
  }),
  f({
    id: 'feat-werecreature-death-roll',
    name: 'Rolagem da Morte',
    originalName: 'Death Roll',
    level: 6,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [
      { kind: 'text', label: 'Tipo homem-crocodilo (werecrocodile); forma de crocodilo ou híbrida; criatura agarrada' },
    ],
    description:
      'Golpe de mandíbulas contra a criatura agarrada, com +2 de circunstância se estiver lutando na água. Acerto: derruba. Erro: ela escapa do agarrão.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Golpe de mandíbulas da Rolagem da Morte na água',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5492',
  }),
  f({
    id: 'feat-werecreature-echolocation',
    name: 'Ecolocalização',
    originalName: 'Echolocation',
    level: 6,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Tipo homem-morcego (werebat)' }],
    description:
      'Ao Buscar, pode usar audição como sentido preciso com alcance de 12 m até o início do próximo turno. Também vale ao Procurar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Audição precisa 12 m (ao Buscar)',
        description: 'Até o início do próximo turno. Também ao Procurar.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-fearful-symmetry',
    name: 'Simetria Temível',
    originalName: 'Fearful Symmetry',
    level: 6,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Emoção', 'Medo', 'Mental', 'Visual'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Tipo homem-tigre (weretiger); forma híbrida ou de tigre; a ação anterior foi um crítico com ataque desarmado',
      },
    ],
    description:
      'Inimigos a 9 m da criatura que você acertou no crítico fazem Vontade vs CD de classe. Falha: amedrontado 1 e fascinado por você por 1 rodada. Suas ações hostis não encerram o fascínio; as dos aliados encerram. Imune por 1 hora, independentemente do resultado.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5494',
  }),
  f({
    id: 'feat-werecreature-feeding-frenzy',
    name: 'Frenesi Alimentar',
    originalName: 'Feeding Frenzy',
    level: 6,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Tipo homem-tubarão (wereshark)' }],
    description:
      'Crítico com Golpe de mandíbulas da Dedicação: 1d4 de sangramento persistente e +1 de circunstância em Golpes de mandíbulas contra o alvo até o fim do turno. Se tiver faro, ele vira preciso com o dobro do alcance para localizar criaturas com sangramento persistente.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Golpes de mandíbulas contra o alvo do crítico (até o fim do turno)',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-pack-attack',
    name: 'Ataque de Alcateia',
    originalName: 'Pack Attack',
    level: 6,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Tipo homem-lobo (werewolf)' }],
    description:
      'Seus Golpes causam +1d4 de precisão contra criaturas no alcance de ao menos dois dos seus aliados.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 77,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-plague-rat',
    name: 'Rato da Peste',
    originalName: 'Plague Rat',
    level: 6,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Tipo homem-rato (wererat); forma híbrida ou de rato' }],
    description:
      'Ao acertar e causar dano com Golpe de mandíbulas na forma híbrida ou de rato, o alvo fica amaldiçoado até o início do seu próximo turno. Sempre que recuperar PV nesse período, Fortitude vs a maior entre CD de classe e CD de magia. Sucesso: recupera normalmente. Falha: metade. Falha crítica: nenhum PV.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-rushing-boar',
    name: 'Javali Impetuoso',
    originalName: 'Rushing Boar',
    level: 6,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Concentração', 'Emoção', 'Mental'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Tipo homem-javali (wereboar); forma de javali ou híbrida' }],
    description: 'Avance em linha reta rumo à criatura disparadora.',
    actionType: 'reaction',
    trigger: 'Um ataque de uma criatura que não está adjacente a você causa dano a você.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5498',
  }),
  f({
    id: 'feat-werecreature-cornered-animal',
    name: 'Animal Encurralado',
    originalName: 'Cornered Animal',
    level: 8,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Forma animal ou híbrida; você está flanqueado' }],
    description:
      'Dois Golpes desarmados contra duas criaturas diferentes que o flanqueiam. −2 se o ataque não for ágil. Ambos contam na penalidade de ataque múltiplo, mas ela só sobe depois dos dois.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5499',
  }),
  f({
    id: 'feat-werecreature-feral-mending',
    name: 'Cicatrização Feral',
    originalName: 'Feral Mending',
    level: 8,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Cura', 'Primordial'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [
      { kind: 'text', label: 'Você não foi afligido pela maldição do homem-fera; a ação anterior foi Mudar Forma' },
    ],
    description: 'Recupera 1d6 PV para cada 2 níveis que tiver (mínimo 1d6).',
    actionType: 'one',
    frequency: '1 vez por hora',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5500',
  }),
  f({
    id: 'feat-werecreature-terrifying-transformation',
    name: 'Transformação Aterradora',
    originalName: 'Terrifying Transformation',
    level: 8,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Visual'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Você foi afligido pela maldição do homem-fera' }],
    description:
      'Intimidação para Desmoralizar cada inimigo a 9 m. Este Desmoralizar perde o traço auditivo e ganha visual; sem penalidade se a criatura não entender o idioma. Imune por 1 minuto, independentemente do resultado.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5501',
  }),
  f({
    id: 'feat-werecreature-you-dont-smell-right',
    name: 'Você Não Cheira Certo',
    originalName: "You Don't Smell Right",
    level: 8,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description:
      'Faro impreciso 9 m, ou +9 m se já tiver faro. Quando uma criatura transformada ou Impersonando passa no alcance do faro, o MJ rola Percepção secreta para você perceber que está transformada, mesmo sem Buscar. Ao Buscar ativamente uma criatura no alcance do faro, +2 de circunstância em Percepção para determinar se está disfarçada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Faro 9 m (ou +9 m)',
        description: 'Impreciso. Detecta transformação/Impersonar. +2 de circunstância ao Buscar disfarce.',
      },
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Percepção ao Buscar se a criatura está disfarçada (no alcance do faro)',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-dire-growth',
    name: 'Crescimento Hediondo',
    originalName: 'Dire Growth',
    level: 10,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Primordial'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'Sua forma animal não é Pequena' }],
    description:
      'Se ainda não estiver na forma animal da Dedicação, Mude Forma para ela. Enquanto permanecer na forma animal, tem os efeitos de ampliar.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5503',
  }),
  f({
    id: 'feat-werecreature-feral-lunge',
    name: 'Investida Feral',
    originalName: 'Feral Lunge',
    level: 10,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'A forma animal concede ataque desarmado de presas ou mandíbulas; forma híbrida ou animal',
      },
    ],
    description:
      'Avance até 3 m e Golpeie com mandíbulas no fim. Se começou escondido, permanece escondido até depois deste Golpe. Com voo ou natação, pode Voar ou Nadar até 3 m no lugar de Avançar.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 78,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5504',
  }),
  f({
    id: 'feat-werecreature-feral-scramble',
    name: 'Escalada Feral',
    originalName: 'Feral Scramble',
    level: 10,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [
      { kind: 'text', label: 'A forma animal concede ataque desarmado de garra; forma híbrida ou animal' },
    ],
    description:
      'Escale até o Deslocamento terrestre e Golpeie com garra em qualquer ponto. Depois, Atletismo vs CD de Escalar da superfície. Sucesso: mantém a posição. Falha: escorrega 18 m ou até o chão, sem dano de queda.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5505',
  }),
  f({
    id: 'feat-werecreature-feral-toss',
    name: 'Arremesso Feral',
    originalName: 'Feral Toss',
    level: 10,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'A forma animal concede ataque desarmado de galhada, chifre ou presa; forma híbrida ou animal',
      },
    ],
    description:
      'Golpeie com galhada, chifre ou presa. Se acertar e causar dano a criatura do seu tamanho ou menor, empurre-a 1,5 m (3 m no crítico). Movimento forçado.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5506',
  }),
  f({
    id: 'feat-werecreature-touch-of-lunacy',
    name: 'Toque da Lunacia',
    originalName: 'Touch of Lunacy',
    level: 10,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description:
      'Crítico com ataque desarmado deste arquétipo: Fortitude vs a maior entre CD de classe e CD de magia, ou desajeitado 2 até o início do seu próximo turno. Falha crítica: também desajeitado 1 por 1 minuto.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-pouncing-transformation',
    name: 'Transformação Predatória',
    originalName: 'Pouncing Transformation',
    level: 12,
    archetypeId: 'archetype-werecreature',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'A forma animal tem apenas Deslocamento terrestre' }],
    description:
      'Mude Forma ou Dispense a mudança e então Avance. Qualquer criatura adjacente no fim do movimento fica desprevenida até o fim do seu turno e depois imune por 1 hora.',
    actionType: 'one',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5508',
  }),
  f({
    id: 'feat-werecreature-shared-tide',
    name: 'Maré Compartilhada',
    originalName: 'Shared Tide',
    level: 12,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'A forma animal tem Deslocamento de natação' }],
    description:
      'Nade até o dobro da distância normal. Qualquer aliado a 9 m por quem você passar durante o movimento ganha o seu Deslocamento de natação até o início do seu próximo turno.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5509',
  }),
  f({
    id: 'feat-werecreature-undying-beast',
    name: 'Fera Imortal',
    originalName: 'Undying Beast',
    level: 12,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description:
      'Quando é reduzido a 0 PV por dano que não seja de prata e não morre imediatamente por efeito de morte ou valor alto de morrendo, estabiliza em seguida. Ganha ferido normalmente.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Estabilizar se cair a 0 PV por dano não-prata',
        description: 'Não vale se morrer na hora. Ferido como de costume.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-wings-of-the-moon',
    name: 'Asas da Lua',
    originalName: 'Wings of the Moon',
    level: 12,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    extraPrereq: [{ kind: 'text', label: 'A forma animal tem Deslocamento de voo' }],
    description:
      'Pode permanecer no ar com Voar normalmente usando o Deslocamento de voo da forma animal, inclusive longas distâncias sem pausas.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo normal da forma animal',
        description: 'Ignora a restrição de começar e terminar em superfície sólida.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5511',
  }),
  f({
    id: 'feat-werecreature-rapid-hybridization',
    name: 'Hibridização Rápida',
    originalName: 'Rapid Hybridization',
    level: 14,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description: 'Use Mudar Forma para entrar na forma híbrida.',
    actionType: 'free',
    trigger: 'Você rola iniciativa.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5513',
  }),
  f({
    id: 'feat-werecreature-scarred-hide',
    name: 'Pele Cicatrizada',
    originalName: 'Scarred Hide',
    level: 14,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description:
      'Na forma híbrida ou animal, resistência a corte não-prata igual à metade do nível.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência a corte não-prata (metade do nível)',
        description: 'Só nas formas híbrida e animal.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
  f({
    id: 'feat-werecreature-force-of-nature',
    name: 'Força da Natureza',
    originalName: 'Force of Nature',
    level: 16,
    archetypeId: 'archetype-werecreature',
    prereqId: DED_WERE.id,
    prereqName: DED_WERE.name,
    description:
      'Na forma híbrida ou animal, cura acelerada 5. Dano de arma de prata desativa a cura acelerada até o fim do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cura acelerada 5 (híbrida/animal)',
        description: 'Prata desativa até o fim do próximo turno.',
      },
    ],
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 79,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=225',
  }),
]

export const archetypeFeatsGeneralRemaster18: Feat[] = [
  ...rivethunInvolutionistArchetypeFeats,
  ...nidaleseHorselordArchetypeFeats,
  ...underseaPrivateerArchetypeFeats,
  ...roseWardenArchetypeFeats,
  ...werecreatureArchetypeFeats,
]
