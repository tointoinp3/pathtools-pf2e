/** Gerais Remaster: Atirador de Arma-Besta, Capitão, Sábio de Familiar, Cultivador, Sentinela Estelar. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import {
  SOURCE_BATTLECRY_ID,
  SOURCE_GUNS_GEARS_ID,
  SOURCE_TIAN_XIA_CG_ID,
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
    sourceId: opts.sourceId ?? SOURCE_TIAN_XIA_CG_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_BEAST = {
  id: 'feat-beast-gunner-dedication',
  name: 'Dedicação de Atirador de Arma-Besta',
}
const DED_CAPTAIN = { id: 'feat-captain-dedication', name: 'Dedicação de Capitão' }
const DED_SAGE = {
  id: 'feat-familiar-sage-dedication',
  name: 'Dedicação de Sábio de Familiar',
}
const DED_CULT = { id: 'feat-cultivator-dedication', name: 'Dedicação de Cultivador' }
const DED_STAR = {
  id: 'feat-starlit-sentinel-dedication',
  name: 'Dedicação de Sentinela Estelar',
}

const BEAST_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-beast-gunner-archetype',
  label: 'Conjuração de Atirador de Arma-Besta',
  style: 'spontaneous',
  tradition: 'arcane',
  traditionChoiceId: 'beast-gunner-tradition',
  traditionOptions: ['arcane', 'primal'],
  traditionChoiceHint: 'Arcana ou primordial. O truque precisa ter ataque de magia. O motor não escolhe.',
  grantTraditionSkill: false,
  attributeId: 'charisma',
  attributeChoiceId: 'beast-gunner-key-attr',
  attributeOptions: ['intelligence', 'charisma'],
  attributeChoiceHint: 'Inteligência ou Carisma. O motor não escolhe.',
  proficiencyRank: 'trained',
  cantripsPerDay: 1,
  classOriginalName: 'Beast Gunner',
  features: { repertoire: true },
}

const CULT_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-cultivator-archetype',
  label: 'Magias de foco de Cultivador',
  style: 'focusOnly',
  tradition: 'occult',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  classOriginalName: 'Cultivator',
  features: { focusPool: true },
}

const STAR_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-starlit-sentinel-archetype',
  label: 'Magias de foco de Sentinela Estelar',
  style: 'focusOnly',
  tradition: 'arcane',
  attributeId: 'charisma',
  proficiencyRank: 'trained',
  classOriginalName: 'Starlit Sentinel',
  features: { focusPool: true },
}

const beastGunnerArchetypeFeats: Feat[] = [
  f({
    id: DED_BEAST.id,
    name: DED_BEAST.name,
    originalName: 'Beast Gunner Dedication',
    level: 6,
    archetypeId: 'archetype-beast-gunner',
    isDedication: true,
    rarity: 'uncommon',
    traits: ['Arquétipo', 'Dedicação', 'Mágico'],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'arcana', rank: 'trained' },
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      {
        kind: 'text',
        label:
          'Treinado em Arcana e Ofício; perito em pelo menos um tipo de arma de fogo; possui uma arma-besta; abateu o tipo de criatura associado numa caçada justa',
      },
    ],
    description:
      'Trata todas as armas-besta como armas de fogo marciais (mesmo as avançadas). Troca a arma-besta vinculada nas preparações se já fez a caçada ritual da nova. Conjuração espontânea, repertório com 1 truque à sua escolha (arcana ou primordial; o truque precisa ter ataque de magia) e treino em ataque/CD. Atributo-chave: Inteligência ou Carisma. Se já conjura arcana ou primordial com espaços, ganha +1 truque dessa tradição (preparado extra ou no repertório). Você escolhe tradição, atributo e o truque; o motor não escolhe. Disparo Encantado (3 ações).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Armas-besta como marciais',
        description: 'Todas as armas-besta contam como armas de fogo marciais para proficiência.',
      },
      { kind: 'spellcasting', access: BEAST_SPELL },
      {
        kind: 'specialAbility',
        name: 'Disparo Encantado',
        actionType: 'three',
        description:
          'Requisito: empunha a arma-besta vinculada ou outra arma de fogo mágica. Conjure magia de 1–2 ações com ataque de magia; o efeito vai na munição. Golpeie com a arma-besta. O teste resolve Golpe e magia. Conta como dois ataques; a penalidade só aplica depois. Se também tiver Tiro Tecelão de Magia: 1 vez a cada 10 minutos, carregue e ative munição mágica como ação livre antes do Disparo Encantado.',
      },
    ],
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 130,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=116',
  }),
  f({
    id: 'feat-beast-gunner-basic-spellcasting',
    name: 'Conjuração Básica de Atirador de Arma-Besta',
    originalName: 'Basic Beast Gunner Spellcasting',
    level: 8,
    archetypeId: 'archetype-beast-gunner',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Ganha os benefícios de conjuração básica. Cada espaço de um posto novo deste arquétipo adiciona uma magia da tradição escolhida ao repertório (comum ou outra que você tenha acesso). Você escolhe as magias; o motor não escolhe.',
    effects: [{ kind: 'spellcastingTier', sourceId: BEAST_SPELL.id, tier: 'basic' }],
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 130,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=116',
  }),
  f({
    id: 'feat-beast-gunner-call-gun',
    name: 'Chamar Arma',
    originalName: 'Call Gun',
    level: 8,
    archetypeId: 'archetype-beast-gunner',
    traits: ['Arquétipo', 'Mágico', 'Teleporte'],
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Feito adicional (Tiro de Magia). Nas preparações, escolha uma arma de fogo ou besta. Até as próximas preparações, Chamar Arma (1 ação, mágico): mão livre; a arma escolhida aparece na mão se estiver no mesmo plano. Você escolhe a arma; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Chamar Arma',
        actionType: 'one',
        description: 'A arma escolhida nas preparações aparece na mão livre, se estiver no mesmo plano.',
      },
    ],
    actionType: 'one',
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 141,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3269',
  }),
  f({
    id: 'feat-beast-gunner-drain-vitality',
    name: 'Drenar Vitalidade',
    originalName: 'Drain Vitality',
    level: 10,
    archetypeId: 'archetype-beast-gunner',
    traits: ['Arquétipo', 'Mágico'],
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [{ kind: 'text', label: 'Você possui a arma-besta vinculada' }],
    description:
      'PV temporários iguais ao nível. Teste simples contra dano persistente (CD de assistência particularmente eficaz). A magia da arma-besta esgota: sem habilidades ativadas até o fim do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Drenar Vitalidade',
        actionType: 'one',
        description: 'PV temporários = nível. Teste simples contra persistente (assistência particularmente eficaz).',
      },
    ],
    actionType: 'one',
    frequency: '1 vez por minuto',
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 131,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3231',
  }),
  f({
    id: 'feat-beast-gunner-expert-spellcasting',
    name: 'Conjuração Perita de Atirador de Arma-Besta',
    originalName: 'Expert Beast Gunner Spellcasting',
    level: 12,
    archetypeId: 'archetype-beast-gunner',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Conjuração Básica de Atirador de Arma-Besta ou Conjuração Básica de Mago',
      },
    ],
    description: 'Ganha os benefícios de conjuração perita.',
    effects: [{ kind: 'spellcastingTier', sourceId: BEAST_SPELL.id, tier: 'expert' }],
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 131,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3232',
  }),
  f({
    id: 'feat-beast-gunner-controlled-bullet',
    name: 'Bala Controlada',
    originalName: 'Controlled Bullet',
    level: 16,
    archetypeId: 'archetype-beast-gunner',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Golpe de arma-besta contra criatura no primeiro incremento. Acerto: o projétil segue para outro alvo que você vê, a no máximo 1 incremento do anterior (ex.: 45 m com rifle de drake). Continue até errar. Não pode Golpear o mesmo alvo de novo nesta uso. Cada ataque conta na penalidade de ataque múltiplo, mas ela só aumenta depois de todos os ataques.',
    actionType: 'two',
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 131,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=116',
  }),
  f({
    id: 'feat-beast-gunner-master-spellcasting',
    name: 'Conjuração Mestra de Atirador de Arma-Besta',
    originalName: 'Master Beast Gunner Spellcasting',
    level: 18,
    archetypeId: 'archetype-beast-gunner',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Conjuração Perita de Atirador de Arma-Besta ou Conjuração Perita de Mago',
      },
    ],
    description: 'Ganha os benefícios de conjuração mestra.',
    effects: [{ kind: 'spellcastingTier', sourceId: BEAST_SPELL.id, tier: 'master' }],
    sourceId: SOURCE_GUNS_GEARS_ID,
    sourcePage: 131,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=3234',
  }),
]

const captainArchetypeFeats: Feat[] = [
  f({
    id: DED_CAPTAIN.id,
    name: DED_CAPTAIN.name,
    originalName: 'Captain Dedication',
    level: 2,
    archetypeId: 'archetype-captain',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      { kind: 'attribute', attributeId: 'charisma', min: 2 },
      {
        kind: 'text',
        label:
          'Carisma +2; você não tem companheiro animal, construto ou outro companheiro que funcione de modo semelhante',
      },
    ],
    description:
      'Treinado em Diplomacia ou Intimidação (se já for treinado nas duas, escolha outra perícia). Escolha Causar Impressão em Grupo ou Coagir em Grupo (ou outro feito de perícia de 1º se já tiver os dois). Ganha um seguidor novato (lacaio). Você nomeia o papel do seguidor; o motor não escolhe o tipo. Especial: com seguidor, nunca pegue feito ou recurso que dê companheiro animal (ou que impeça ter um).',
    effects: [
      {
        kind: 'skillRankChoice',
        choiceId: 'captain-skill',
        rank: 'trained',
        skillOptions: ['diplomacy', 'intimidation'],
        bumpIfAlready: true,
        hint: 'Diplomacia ou Intimidação; se já for treinado nas duas, escolha outra perícia (o motor não escolhe).',
      },
      {
        kind: 'textChoice',
        choiceId: 'captain-group-feat',
        options: [
          { id: 'group-impression', label: 'Causar Impressão em Grupo' },
          { id: 'group-coercion', label: 'Coagir em Grupo' },
          {
            id: 'other-skill-feat',
            label: 'Outro feito de perícia de 1º (se já tiver os dois)',
          },
        ],
        hint: 'Feito de perícia. O motor não escolhe.',
        abilityName: 'Feito de grupo: {choice}',
        abilityDescription: 'Causar Impressão em Grupo, Coagir em Grupo, ou outro feito de 1º se já tiver os dois.',
      },
      {
        kind: 'specialAbility',
        name: 'Seguidor novato (lacaio)',
        description:
          'Você nomeia o papel (batedor, guarda, médico etc.). O motor não escolhe o tipo de seguidor.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-additional-follower',
    name: 'Seguidor Adicional',
    originalName: 'Additional Follower',
    level: 4,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Mais um seguidor novato (lacaio). Máximo 4 seguidores no total. Só o seguidor ativo participa de combate/exploração. Ao ter 2 ou mais, ganha Chamar Seguidor (1 minuto) para trocar o ativo. Você nomeia o papel; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Seguidor novato extra',
        description: 'Máximo 4 no total. Você nomeia o papel. O motor não escolhe.',
      },
      {
        kind: 'specialAbility',
        name: 'Chamar Seguidor',
        description: '1 minuto. Troca o seguidor ativo por outro dos seus. Só com 2 ou mais seguidores.',
      },
    ],
    repeatable: true,
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-experienced-follower',
    name: 'Seguidor Experiente',
    originalName: 'Experienced Follower',
    level: 4,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Todos os seguidores passam a experientes. No encontro, mesmo sem Dirigir Seguidor, o ativo pode gastar 1 ação no seu turno para Avançar ou Golpear (em qualquer momento em que você não esteja no meio de uma ação). Se fizer isso, é a única ação dele na rodada — você não pode Dirigi-lo depois.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Seguidores experientes; Avançar/Golpear sem Dirigir',
        description: '1 ação de Avançar ou Golpear no seu turno sem Dirigir Seguidor. Se usar, não pode Dirigir depois.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-leader-of-all',
    name: 'Líder de Todos',
    originalName: 'Leader of All',
    level: 4,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Seguidores de qualquer ancestralidade comum (incomum/rara a critério do MJ). O seguidor ganha traços, tamanho, deslocamentos, idiomas e habilidades especiais da ancestralidade — não PV, aumentos/falhas de atributo, nem ações extras (Ativar Item, Conjurar). Você escolhe a ancestralidade; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Seguidores de qualquer ancestralidade comum',
        description: 'Você escolhe a ancestralidade. O motor não escolhe.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7997',
  }),
  f({
    id: 'feat-captain-cadre',
    name: 'Séquito',
    originalName: 'Cadre',
    level: 6,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Retentores leais (não são seguidores; não entram em perigo). Onde puderem ajudar: +1 de circunstância em Ofício, Criar Falsificação, Ganhar Renda e Subsistir (e outras de intervalo a critério do MJ). Retreinar: cada 5 dias conta como 1 semana.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Ofício, Criar Falsificação, Ganhar Renda e Subsistir',
      },
      {
        kind: 'specialAbility',
        name: 'Retreino acelerado',
        description: 'Cada 5 dias de retreino conta como 1 semana.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-tactical-guidance',
    name: 'Orientação Tática',
    originalName: 'Tactical Guidance',
    level: 6,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Pode gastar 2 ações para Dirigir Seguidor (em vez de 1). Se fizer isso, o seguidor ganha 1 ação extra.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Dirigir Seguidor (2 ações)',
        actionType: 'two',
        description: 'O seguidor ganha 1 ação extra.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-veteran-follower',
    name: 'Seguidor Veterano',
    originalName: 'Veteran Follower',
    level: 8,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description: 'Todos os seguidores passam a veteranos.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Seguidores veteranos',
        description: 'Todos os seus seguidores tornam-se veteranos.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-coordinated-tactics',
    name: 'Táticas Coordenadas',
    originalName: 'Coordinated Tactics',
    level: 12,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Quando você e o seguidor ativo estão adjacentes ao mesmo inimigo, ambos o flanqueiam, independentemente das posições reais.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Flanquear com o seguidor adjacente ao mesmo inimigo',
        description: 'Você e o seguidor ativo flanqueiam o mesmo alvo adjacente, sem importar a posição.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-exceptional-follower',
    name: 'Seguidor Excepcional',
    originalName: 'Exceptional Follower',
    level: 14,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description: 'Todos os seguidores passam a excepcionais.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Seguidores excepcionais',
        description: 'Todos os seus seguidores tornam-se excepcionais.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-legendary-leader',
    name: 'Líder Lendário',
    originalName: 'Legendary Leader',
    level: 15,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Na primeira tentativa de Coagir ou Causar Impressão numa criatura inteligente, o MJ rola teste simples secreto CD 11 (ajusta se você for mais ou menos conhecido). Sucesso: +2 de circunstância nesse teste. Pode Ganhar Renda com a perícia da Dedicação (Diplomacia ou Intimidação): +2 de circunstância (+3 se tiver Séquito).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Fama (teste simples CD 11)',
        description:
          'Se conhecido: +2 de circunstância em Coagir ou Causar Impressão. O MJ ajusta a CD. O motor não decide se o alvo já ouviu falar de você.',
      },
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Ganhar Renda (Diplomacia ou Intimidação da Dedicação; +3 se tiver Séquito)',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
  f({
    id: 'feat-captain-peerless-captain',
    name: 'Capitão Inigualável',
    originalName: 'Peerless Captain',
    level: 20,
    archetypeId: 'archetype-captain',
    prereqId: DED_CAPTAIN.id,
    prereqName: DED_CAPTAIN.name,
    description:
      'Com seguidor ativo no encontro, você fica acelerado. A ação extra só serve para Dirigir Seguidor.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Acelerado (só Dirigir Seguidor)',
        description: 'Com seguidor ativo no encontro. A ação extra só para Dirigir Seguidor.',
      },
    ],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=332',
  }),
]

const familiarSageArchetypeFeats: Feat[] = [
  f({
    id: DED_SAGE.id,
    name: DED_SAGE.name,
    originalName: 'Familiar Sage Dedication',
    level: 4,
    archetypeId: 'archetype-familiar-sage',
    isDedication: true,
    extraPrereq: [{ kind: 'text', label: 'Você tem um familiar e é capaz de conjurar magias' }],
    description:
      'Ganha Familiar Aprimorado (+2 habilidades de familiar). Pode pegar esta Dedicação antes de completar 3 feitos de Mestre de Familiar, e a Dedicação de Mestre de Familiar antes de completar 3 feitos deste arquétipo. Não pegue outra Dedicação até ter 2 feitos de Mestre de Familiar ou de Sábio de Familiar.',
    effects: [
      { kind: 'familiarAbilitySlots', extra: 2 },
      {
        kind: 'specialAbility',
        name: 'Pode pegar antes de completar 3 feitos de Mestre de Familiar',
        description:
          'Esta Dedicação e a de Mestre de Familiar não se bloqueiam mutuamente até 3 feitos. Outra Dedicação exige 2 feitos de um dos dois arquétipos.',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7095',
  }),
  f({
    id: 'feat-familiar-sage-familiars-resolve',
    name: 'Resolução do Familiar',
    originalName: "Familiar's Resolve",
    level: 6,
    archetypeId: 'archetype-familiar-sage',
    traits: ['Arquétipo', 'Forma de Magia'],
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    description:
      'Se a próxima ação for Conjurar uma Magia, você ou um aliado a 9 m ganha +2 de status em salvaguardas contra efeitos que causariam condenado ou amedrontado por 1 rodada. No 14º, o bônus é +3. Você escolhe o alvo; o motor não escolhe.',
    actionType: 'one',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7096',
  }),
  f({
    id: 'feat-familiar-sage-fulu-familiar',
    name: 'Familiar Fulu',
    originalName: 'Fulu Familiar',
    level: 6,
    archetypeId: 'archetype-familiar-sage',
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    description:
      'Criar Fulu do Familiar (2 ações, concentração, manipular): familiar a 9 m e uma mão livre. O familiar vira um fulu mágico de pelo menos 2 níveis abaixo do seu, sem custo nem teste de Ofício. Pode Afixar Talismã como parte desta atividade. Enquanto transformado, o familiar não concede benefícios. Dura até as próximas preparações ou até Ativar o fulu (o familiar reaparece adjacente). 1/dia; 2/dia no 12º; 3/dia no 18º. Você escolhe o fulu e onde afixar; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Criar Fulu do Familiar',
        actionType: 'two',
        description: '1/dia (2 no 12º, 3 no 18º). Fulu ≥ 2 níveis abaixo. Você escolhe o fulu.',
      },
    ],
    frequency: '1 vez por dia (2 no 12º, 3 no 18º)',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=279',
  }),
  f({
    id: 'feat-familiar-sage-tempest-clouds-speed',
    name: 'Velocidade da Nuvem da Tempestade',
    originalName: "Tempest Cloud's Speed",
    level: 6,
    archetypeId: 'archetype-familiar-sage',
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    description:
      'O familiar ganha Caminho da Tempestade (2 ações, ar, 1 vez a cada 10 minutos): +3 m de status no Deslocamento até o fim do seu turno. Avançar neste turno não dispara reações. Não precisa Avançar antes de Salto em Distância neste turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Caminho da Tempestade (habilidade de familiar)',
        actionType: 'two',
        description: '1 vez a cada 10 minutos. +3 m de status no Deslocamento; Avançar sem reações; Salto em Distância sem Avançar antes.',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=279',
  }),
  f({
    id: 'feat-familiar-sage-familiar-ritualist',
    name: 'Ritualista do Familiar',
    originalName: 'Familiar Ritualist',
    level: 8,
    archetypeId: 'archetype-familiar-sage',
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    extraPrereq: [{ kind: 'text', label: 'Capaz de conjurar um ritual' }],
    description:
      'Ao conjurar um ritual, o familiar pode ser conjurador secundário: cumpre requisitos e o teste secundário. Não substitui secundário que seja o alvo da magia.',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7099',
  }),
  f({
    id: 'feat-familiar-sage-golden-dragons-bounty',
    name: 'Dádiva do Dragão Dourado',
    originalName: "Golden Dragon's Bounty",
    level: 8,
    archetypeId: 'archetype-familiar-sage',
    traits: ['Arquétipo', 'Forma de Magia'],
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    description:
      'Se a próxima ação for Conjurar uma Magia que cause dano de concussão, perfurante ou cortante, esse dano conta como ferro frio, prata ou aço (você escolhe na hora) para fraquezas, resistências e similares. No 14º, adamantina entra na lista. A magia ganha o traço metal. O motor não escolhe o metal.',
    actionType: 'one',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=279',
  }),
  f({
    id: 'feat-familiar-sage-lightning-rings-intervention',
    name: 'Intervenção dos Anéis Relâmpago',
    originalName: "Lightning Rings' Intervention",
    level: 8,
    archetypeId: 'archetype-familiar-sage',
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    description:
      'O familiar ganha Agulhas Relâmpago (1 ação, eletricidade). Requisito: você conjurou magia com ar ou eletricidade neste turno. Emanação de 1,5 m: Fortitude vs CD de magia ou desajeitado 1 até o fim do próximo turno da criatura. Se estiver encharcada ou em água, também 1d4 de eletricidade persistente na falha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Agulhas Relâmpago (habilidade de familiar)',
        actionType: 'one',
        description:
          'Emanação 1,5 m. Fortitude vs CD de magia: desajeitado 1. Encharcado/água: +1d4 eletricidade persistente.',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=279',
  }),
  f({
    id: 'feat-familiar-sage-seal-of-the-golden-dragon',
    name: 'Selo do Dragão Dourado',
    originalName: 'Seal of the Golden Dragon',
    level: 10,
    archetypeId: 'archetype-familiar-sage',
    traits: ['Arquétipo', 'Mágico'],
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    extraPrereq: [
      { kind: 'text', label: 'O familiar tem a habilidade resistência e está adjacente a você' },
    ],
    description:
      'Você ganha os benefícios da resistência do familiar (incluindo melhorias como resistência maior) até o início do seu próximo turno. 1/dia, se a resistência for de outro tipo de dano, ela muda para o tipo apropriado. Se você já tiver resistência do mesmo tipo, use a maior.',
    actionType: 'reaction',
    trigger: 'Você sofreria dano de ácido, frio, eletricidade, fogo, veneno ou sônico.',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=279',
  }),
  f({
    id: 'feat-familiar-sage-lightning-rings-overcharge',
    name: 'Sobrecarga dos Anéis Relâmpago',
    originalName: "Lightning Rings' Overcharge",
    level: 12,
    archetypeId: 'archetype-familiar-sage',
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    description:
      'O familiar ganha Armilar Relâmpago (1 ação, eletricidade): voa em volta da arma ou mão de um aliado adjacente e vira anéis de relâmpago. Até o início do seu próximo turno, a arma ou desarmado causa +1d6 de eletricidade (+1d8 se você conjurou magia com ar ou eletricidade neste turno). O familiar permanece na forma de anéis: não pode ser alvo nem agir. Você escolhe o aliado e a arma; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Armilar Relâmpago (habilidade de familiar)',
        actionType: 'one',
        description: '+1d6 eletricidade na arma/desarmado do aliado (+1d8 se magia de ar/eletricidade neste turno).',
      },
    ],
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=279',
  }),
  f({
    id: 'feat-familiar-sage-vexing-tempest',
    name: 'Tempestade Importuna',
    originalName: 'Vexing Tempest',
    level: 12,
    archetypeId: 'archetype-familiar-sage',
    traits: ['Arquétipo', 'Forma de Magia'],
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    description:
      'Se a próxima ação for Conjurar uma Magia com traço ar, todas as criaturas numa emanção de 4,5 m do familiar fazem Reflexos vs CD de magia ou são empurradas 3 m para longe. Falha crítica: também caem no chão.',
    actionType: 'one',
    sourcePage: 116,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=279',
  }),
  f({
    id: 'feat-familiar-sage-phoenixs-flight',
    name: 'Voo da Fênix',
    originalName: "Phoenix's Flight",
    level: 16,
    archetypeId: 'archetype-familiar-sage',
    traits: ['Arquétipo', 'Fogo', 'Mágico', 'Polimorfia'],
    prereqId: DED_SAGE.id,
    prereqName: DED_SAGE.name,
    extraPrereq: [{ kind: 'text', label: 'Você está adjacente ao familiar ou no mesmo espaço' }],
    description:
      'Forma de monstruosidade como magia inata oculta 1/dia, só fênix; o familiar precisa estar adjacente e se funde à forma. Enquanto transformado, Conflagração Flamejante (3 ações, fogo, cura, luz, visual): encerra a forma; explosão de 3 m, 16d6 fogo (Fortitude básica vs CD de magia; falha crítica: cego 1 rodada) e 8d6 PV temporários. No 18º e no 20º: +2d6 fogo e +1d6 PV temporários.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Forma de monstruosidade (fênix, inata oculta 1/dia)',
        description: 'Só fênix. Familiar adjacente se funde à forma.',
      },
      {
        kind: 'specialAbility',
        name: 'Conflagração Flamejante',
        actionType: 'three',
        description:
          'Só na forma de fênix. Explosão 3 m: 16d6 fogo (Fortitude básica; falha crítica: cego 1 rodada). 8d6 PV temporários. +2d6 fogo e +1d6 PV temp. no 18º e no 20º.',
      },
    ],
    frequency: '1 vez por dia (forma de monstruosidade)',
    sourcePage: 117,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7105',
  }),
]

const cultivatorArchetypeFeats: Feat[] = [
  f({
    id: DED_CULT.id,
    name: DED_CULT.name,
    originalName: 'Cultivator Dedication',
    level: 2,
    archetypeId: 'archetype-cultivator',
    isDedication: true,
    rarity: 'rare',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'occultism', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ocultismo' },
    ],
    description:
      'Perito em Ocultismo. Magia de domínio adaptar-se como magia de foco (qi). Reserva de foco 1. Magias de foco ocultas; treino em ataque/CD; atributo-chave Sabedoria. Refoco: 10 minutos meditando para refinar essência em qi. Magias de cultivador contam como magias de qi para pré-requisitos e efeitos (ex.: Drenar Qi de jiang-shi).',
    effects: [
      { kind: 'skillRank', skillId: 'occultism', rank: 'expert' },
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: CULT_SPELL },
      {
        kind: 'specialAbility',
        name: 'Adaptar-se (magia de domínio / magia de qi)',
        description: 'Foco oculto; Sabedoria. Conta como magia de qi.',
      },
    ],
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-immortal-lightness',
    name: 'Leveza Imortal',
    originalName: 'Immortal Lightness',
    level: 4,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description: 'Ganha a magia de domínio ímpeto atlético como magia de foco (qi).',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: CULT_SPELL },
      {
        kind: 'specialAbility',
        name: 'Ímpeto atlético (magia de domínio / magia de qi)',
        description: 'Foco oculto; Sabedoria.',
      },
    ],
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-lotus-above-the-mud',
    name: 'Lótus Acima da Lama',
    originalName: 'Lotus Above the Mud',
    level: 6,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description:
      'Ao conjurar adaptar-se ou ímpeto atlético, ignore terreno difícil até o fim do seu próximo turno.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ignorar terreno difícil após adaptar-se ou ímpeto atlético',
        description: 'Até o fim do seu próximo turno.',
      },
    ],
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-three-clear-breaths',
    name: 'Três Respirações Claras',
    originalName: 'Three Clear Breaths',
    level: 6,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description:
      'Ganha Controle da Respiração, Difícil de Matar e Recuperação Rápida (precisa cumprir os pré-requisitos). Para cada um que já tiver, escolha Acuidade Perspicaz, Veloz ou Resistência. Você escolhe os substitutos; o motor não escolhe. Morrendo máximo 5 (Difícil de Matar).',
    effects: [
      { kind: 'dyingMax', value: 5 },
      {
        kind: 'specialAbility',
        name: 'Controle da Respiração, Difícil de Matar e Recuperação Rápida',
        description:
          'Se já tiver algum, substitua por Acuidade Perspicaz, Veloz ou Resistência. O jogador escolhe. Resistência: +1 PV por nível e −1 na CD de recuperação — só se for o substituto escolhido; o motor não aplica sozinho.',
      },
      {
        kind: 'textChoice',
        choiceId: 'cultivator-three-breaths-replace',
        options: [
          { id: 'none', label: 'Nenhum substituto (não tinha os três)' },
          { id: 'canny-acumen', label: 'Acuidade Perspicaz' },
          { id: 'fleet', label: 'Veloz' },
          { id: 'toughness', label: 'Resistência' },
          { id: 'canny-fleet', label: 'Acuidade Perspicaz e Veloz' },
          { id: 'canny-toughness', label: 'Acuidade Perspicaz e Resistência' },
          { id: 'fleet-toughness', label: 'Veloz e Resistência' },
          { id: 'all-three', label: 'Acuidade Perspicaz, Veloz e Resistência' },
        ],
        hint: 'Só substitui feitos que você já tinha. O motor não escolhe.',
        abilityName: 'Substitutos: {choice}',
        abilityDescription: 'Acuidade Perspicaz, Veloz e/ou Resistência no lugar dos feitos já possuídos.',
      },
    ],
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-wisteria-and-peony-reunion',
    name: 'Reunião de Glicínia e Peônia',
    originalName: 'Wisteria-and-Peony Reunion',
    level: 6,
    archetypeId: 'archetype-cultivator',
    traits: ['Arquétipo', 'Cura', 'Vitalidade'],
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description: 'Recupera PV iguais ao nível + o máximo de pontos de foco da sua reserva.',
    actionType: 'free',
    trigger: 'Você conjura uma magia de foco.',
    frequency: '1 vez por hora',
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7089',
  }),
  f({
    id: 'feat-cultivator-keen-eye',
    name: 'Olho Aguçado do Cultivador',
    originalName: "Cultivator's Keen Eye",
    level: 8,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description:
      'Sentido vital impreciso 9 m. No mesmo alcance, sente a presença de materiais preciosos (“materiais de cultivo”). Em rituais, pode substituir parte ou todo o custo por valor equivalente em materiais preciosos (não vale para itens específicos exigidos; o MJ decide se for dúbio).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sentido vital impreciso 9 m; sentir materiais preciosos',
        description: 'Materiais preciosos no mesmo alcance. Custo de ritual pode usar equivalentes, a critério do MJ.',
      },
    ],
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-ghost-path-epiphany',
    name: 'Epifania do Caminho Fantasma',
    originalName: 'Ghost-path Epiphany',
    level: 10,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description:
      'Santificação ímpia. Aprende chamar espírito e comungar, só para mortos-vivos ou entidades do Vazio ou do Submundo. Ao conjurar ritual, pode reduzir 1 conjurador secundário: você cumpre os requisitos e faz o teste secundário (não substitui secundário que seja o alvo).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Santificação ímpia; chamar espírito e comungar (mortos-vivos/Vazio/Submundo)',
        description:
          'Pode reduzir 1 secundário no ritual. Santificação ímpia: o jogador/MJ aplica; o motor não escolhe santificação.',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-three-pecks-of-dew',
    name: 'Três Porções de Orvalho',
    originalName: 'Three Pecks of Dew',
    level: 10,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description:
      'Santificação sagrada. Ao Subsistir, pode usar Ocultismo (a atividade ganha vitalidade). Ao Refocar, pode Tratar Feridas ao mesmo tempo: Ocultismo no teste, sem kit de curandeiro (vitalidade).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Santificação sagrada; Subsistir com Ocultismo; Refoco + Tratar Feridas',
        description:
          'Santificação sagrada: o jogador/MJ aplica; o motor não escolhe. Tratar Feridas no Refoco usa Ocultismo, sem kit.',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-bitter-scholars-promotion',
    name: 'Promoção do Erudito Amargo',
    originalName: "The Bitter Scholar's Promotion",
    level: 16,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description:
      'Para de envelhecer. Detectado como morto-vivo (sentido vital, sentido espiritual etc.), independentemente do estado real. Aprende rituais criar mortos-vivos para gashadokuro, jiang-shi e shui gui. Sucesso nesses rituais conta como crítico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Imortalidade (detectado como morto-vivo); criar mortos-vivos',
        description: 'Gashadokuro, jiang-shi, shui gui. Sucesso = crítico. O motor não escolhe o ritual.',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
  f({
    id: 'feat-cultivator-immortal-attains-the-summit',
    name: 'O Imortal Alcança o Cume',
    originalName: 'The Immortal Attains the Summit',
    level: 16,
    archetypeId: 'archetype-cultivator',
    prereqId: DED_CULT.id,
    prereqName: DED_CULT.name,
    description:
      'Para de envelhecer. Detectado como ser vivo (sentido vital, sentido espiritual etc.), independentemente do estado real. Aprende controlar o clima e crescimento vegetal. Pode usar Ocultismo no lugar de Natureza. Sucesso nesses rituais conta como crítico.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Imortalidade (detectado como vivo); controlar o clima e crescimento vegetal',
        description: 'Ocultismo no lugar de Natureza. Sucesso = crítico. O motor não escolhe o ritual.',
      },
    ],
    sourcePage: 115,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=278',
  }),
]

const starlitSentinelArchetypeFeats: Feat[] = [
  f({
    id: DED_STAR.id,
    name: DED_STAR.name,
    originalName: 'Starlit Sentinel Dedication',
    level: 2,
    archetypeId: 'archetype-starlit-sentinel',
    isDedication: true,
    rarity: 'rare',
    description:
      'Escolha uma constelação do zodíaco Tian. Ganha um selo de transformação (item mundano de 1 volume leve, traço arcano). Você nomeia o item; o motor não escolhe. Se perder o selo, 1 semana de intervalo em introspecção para um novo. Transformação Estelar (1 ação, arcano, 1/hora): 10 minutos de forma de sentinela (ou até transformar de novo). Identidade: Percepção vs CD de Enganação 20 + modificador de proficiência (como Personificar, sem teste seu ao interagir). Arma transformada: +1 de status no dano. Dardos de luz estelar: Golpe com o modificador corpo a corpo da arma, 1d4 força, alcance 18 m, afetados pelas runas, traços arcano e força.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'starlit-constellation',
        options: [
          { id: 'rat', label: 'Rato' },
          { id: 'ox', label: 'Boi' },
          { id: 'tiger', label: 'Tigre' },
          { id: 'rabbit', label: 'Coelho' },
          { id: 'dragon', label: 'Dragão' },
          { id: 'snake', label: 'Serpente' },
          { id: 'horse', label: 'Cavalo' },
          { id: 'goat', label: 'Cabra' },
          { id: 'monkey', label: 'Macaco' },
          { id: 'rooster', label: 'Galo' },
          { id: 'dog', label: 'Cão' },
          { id: 'pig', label: 'Porco' },
          { id: 'other', label: 'Outra (você nomeia)' },
        ],
        hint: 'Constelação do zodíaco Tian. Você também nomeia o item-selo. O motor não escolhe.',
        abilityName: 'Constelação: {choice}',
        abilityDescription: 'Selo de transformação. Você nomeia o item.',
      },
      {
        kind: 'specialAbility',
        name: 'Transformação Estelar',
        actionType: 'one',
        description:
          '1/hora. 10 minutos. +1 de status no dano da arma transformada. Dardos 1d4 força, 18 m. CD de Enganação 20 + proficiência para descobrir a identidade. Você nomeia o selo.',
      },
    ],
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=275',
  }),
  f({
    id: 'feat-starlit-sentinel-special-technique',
    name: 'Técnica Especial de Sentinela',
    originalName: 'Special Sentinel Technique',
    level: 4,
    archetypeId: 'archetype-starlit-sentinel',
    prereqId: DED_STAR.id,
    prereqName: DED_STAR.name,
    description:
      'Ganha poeira estelar luminosa (cura) ou luz estelar reluzente (ataque) como magia de foco, só na forma de sentinela. Você nomeia a técnica (incantação); o motor não escolhe o nome. Reserva de foco 1 se ainda não tiver. Refoco: 10 minutos fora da forma, refletindo os valores da constelação. Foco arcano; treino em ataque/CD; Carisma. Pode pegar de novo para ganhar a magia que faltou.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: STAR_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'starlit-sentinel-technique',
        options: [
          { id: 'luminous-stardust', label: 'Poeira estelar luminosa (cura)' },
          { id: 'shining-starlight', label: 'Luz estelar reluzente (ataque)' },
        ],
        hint: 'Só na forma de sentinela. Na segunda vez, a outra. Você nomeia a técnica. O motor não escolhe.',
        abilityName: 'Técnica: {choice}',
        abilityDescription: 'Magia de foco arcana. Você nomeia a incantação.',
      },
    ],
    repeatable: true,
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=275',
  }),
  f({
    id: 'feat-starlit-sentinel-majestic-proclamation',
    name: 'Proclamação Majestosa',
    originalName: 'Majestic Proclamation',
    level: 8,
    archetypeId: 'archetype-starlit-sentinel',
    prereqId: DED_STAR.id,
    prereqName: DED_STAR.name,
    extraPrereq: [{ kind: 'text', label: 'Você está na forma de sentinela' }],
    description:
      'Tente Desmoralizar todos os inimigos a 9 m. Desmoralizar perde auditivo e ganha visual. Além do efeito normal: sucesso ofusca 1 minuto; crítico também cega 1 rodada. Se a ação anterior foi Transformação Estelar, esta atividade custa 1 ação.',
    actionType: 'two',
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6741',
  }),
  f({
    id: 'feat-starlit-sentinel-blade-of-the-heart',
    name: 'Lâmina do Coração',
    originalName: 'Blade of the Heart',
    level: 10,
    archetypeId: 'archetype-starlit-sentinel',
    prereqId: DED_STAR.id,
    prereqName: DED_STAR.name,
    extraPrereq: [{ kind: 'text', label: 'Você está na forma de sentinela; aliado disposto adjacente' }],
    description:
      'A arma transformada atravessa o coração de um aliado disposto adjacente (sem dano) e ganha uma runa de propriedade: corrosiva, flamejante, gélida, chocante, trovejante ou vitalizante. Na primeira vez com aquele aliado, o MJ/jogador define a runa pela relação (ex.: gélida elegante para um mentor, trovejante para um parceiro de treino); depois, sempre a mesma. Dura enquanto estiver na forma e conta no limite de runas. No 16º, a versão maior. O motor nunca escolhe a runa nem o aliado.',
    actionType: 'one',
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=275',
  }),
  f({
    id: 'feat-starlit-sentinel-desperate-wish',
    name: 'Desejo Desesperado',
    originalName: 'Desperate Wish',
    level: 12,
    archetypeId: 'archetype-starlit-sentinel',
    prereqId: DED_STAR.id,
    prereqName: DED_STAR.name,
    extraPrereq: [{ kind: 'text', label: 'Você está na forma de sentinela' }],
    description:
      'Sopro de vida como magia inata arcana 1/dia, só na forma de sentinela. Ao conjurar, a forma acaba (a constelação se esgota temporariamente).',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Sopro de vida (inato arcano 1/dia, só na forma)',
        description: 'Ao conjurar, reverte da forma de sentinela.',
      },
    ],
    frequency: '1 vez por dia',
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=275',
  }),
  f({
    id: 'feat-starlit-sentinel-orbit',
    name: 'Órbita da Sentinela',
    originalName: "Sentinel's Orbit",
    level: 14,
    archetypeId: 'archetype-starlit-sentinel',
    prereqId: DED_STAR.id,
    prereqName: DED_STAR.name,
    extraPrereq: [{ kind: 'text', label: 'Você está na forma de sentinela' }],
    description:
      'Na forma de sentinela, Deslocamento de voo igual ao terrestre ou 6 m, o que for maior.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Voo na forma de sentinela',
        description: 'Deslocamento de voo = terrestre ou 6 m, o que for maior.',
      },
    ],
    sourcePage: 94,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=275',
  }),
]

export const archetypeFeatsGeneralRemaster16: Feat[] = [
  ...beastGunnerArchetypeFeats,
  ...captainArchetypeFeats,
  ...familiarSageArchetypeFeats,
  ...cultivatorArchetypeFeats,
  ...starlitSentinelArchetypeFeats,
]
