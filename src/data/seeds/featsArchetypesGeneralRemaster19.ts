/** Gerais Remaster: Hellknight, Legionário Dourado, Falcão de Aço, Garra do Crepúsculo, Aspirante à Pedra Estelar. Sem Legacy. */
import type { Feat, FeatSpellcastingAccess } from '@/types/feat'
import { SOURCE_HELLFIRE_DISPATCHES_ID } from './sources'

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
  ignoresDedicationLockFromArchetypeIds?: string[]
}): Feat {
  return {
    id: opts.id,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    category: 'archetype',
    archetypeId: opts.archetypeId,
    isDedication: opts.isDedication,
    ignoresDedicationLock: opts.ignoresDedicationLock,
    ignoresDedicationLockFromArchetypeIds: opts.ignoresDedicationLockFromArchetypeIds,
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

const DED_HK = {
  id: 'feat-hellknight-dedication',
  name: 'Dedicação de Hellknight',
}
const DED_GL = {
  id: 'feat-golden-legionnaire-dedication',
  name: 'Dedicação de Legionário Dourado',
}
const DED_SF = {
  id: 'feat-steel-falcon-dedication',
  name: 'Dedicação de Falcão de Aço',
}
const DED_TT = {
  id: 'feat-twilight-talon-dedication',
  name: 'Dedicação de Garra do Crepúsculo',
}
const DED_SA = {
  id: 'feat-starstone-aspirant-dedication',
  name: 'Dedicação de Aspirante à Pedra Estelar',
}

const HELLKNIGHT_ORDERS = [
  { id: 'chain', label: 'Ordem da Corrente' },
  { id: 'gate', label: 'Ordem do Portão' },
  { id: 'godclaw', label: 'Ordem da Garra de Deus' },
  { id: 'nail', label: 'Ordem do Prego' },
  { id: 'pyre', label: 'Ordem da Pira' },
  { id: 'rack', label: 'Ordem do Cavalete' },
  { id: 'scourge', label: 'Ordem do Flagelo' },
]

const FAVORED_TERRAIN = [
  { id: 'aquatic', label: 'Aquático' },
  { id: 'arctic', label: 'Ártico' },
  { id: 'desert', label: 'Deserto' },
  { id: 'forest', label: 'Floresta' },
  { id: 'mountain', label: 'Montanha' },
  { id: 'plains', label: 'Planície' },
  { id: 'sky', label: 'Céu' },
  { id: 'swamp', label: 'Pântano' },
  { id: 'underground', label: 'Subterrâneo' },
]

const STEEL_FALCON_SPELL: FeatSpellcastingAccess = {
  id: 'spellcasting-steel-falcon-archetype',
  label: 'Magias de Devoção de Falcão de Aço',
  style: 'focusOnly',
  tradition: 'divine',
  attributeId: 'wisdom',
  proficiencyRank: 'trained',
  classOriginalName: 'Steel Falcon',
  features: { focusPool: true },
}

const hellknightArchetypeFeats: Feat[] = [
  f({
    id: DED_HK.id,
    name: DED_HK.name,
    originalName: 'Hellknight Dedication',
    level: 2,
    archetypeId: 'archetype-hellknight',
    isDedication: true,
    rarity: 'uncommon',
    extraPrereq: [
      {
        kind: 'text',
        label: 'Treinado por uma Ordem Hellknight; acesso: Cheliax Antigo',
      },
    ],
    description:
      'Armígero no caminho Hellknight. Resistência a dano mental igual a 1 + o número de feitos de classe deste arquétipo. Treinado em Intimidação (perito se já for treinado). Conhecimento Adicional de Inferno (sobe nos níveis 3, 7 e 15); se já era treinado, também outro Conhecimento à sua escolha. Escolha a ordem Hellknight; o motor não escolhe. Armas favorecidas: Corrente — mangual e corrente com espinhos; Portão — adaga; Garra de Deus — maça-estrela; Prego — alabarda e lança de justas; Pira — glaive; Cavalete — espada longa e chicote; Flagelo — maça, chicote e flagelo. Armadura icônica vem de Proteção do Armígero.',
    effects: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'trained', bumpIfAlready: true },
      { kind: 'lore', loreName: 'Inferno', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional de Inferno',
        description:
          'Sobe sozinho nos níveis 3, 7 e 15. Se já era treinado em Inferno, também fica treinado em outro Conhecimento à sua escolha (anote na ficha). O motor não escolhe o extra.',
      },
      {
        kind: 'specialAbility',
        name: 'Resistência mental Hellknight',
        description: 'Resistência a dano mental igual a 1 + o número de feitos de classe do arquétipo Hellknight.',
      },
      {
        kind: 'textChoice',
        choiceId: 'hellknight-order',
        options: HELLKNIGHT_ORDERS,
        hint: 'Ordem Hellknight. O motor não escolhe.',
        abilityName: 'Ordem Hellknight: {choice}',
        abilityDescription:
          'Armas favorecidas da ordem (Corrente: mangual e corrente com espinhos; Portão: adaga; Garra de Deus: maça-estrela; Prego: alabarda e lança de justas; Pira: glaive; Cavalete: espada longa e chicote; Flagelo: maça, chicote e flagelo). Benefícios menores/maiores vêm de Treinamento da Ordem.',
      },
    ],
    sourcePage: 24,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8812',
  }),
  f({
    id: 'feat-hellknight-ardent-armiger',
    name: 'Armígero Ardente',
    originalName: 'Ardent Armiger',
    level: 4,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    description:
      '+1 de circunstância em salvaguardas contra efeitos que infligem controlado ou amedrontado. Se um efeito mental o obrigar a violar os preceitos da ordem (MJ), ação livre ao receber a ordem: nova salvaguarda de Vontade, mesmo se o efeito impedir agir por vontade própria. Só uma vez por efeito. O resultado não pode ser pior que o original.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'salvaguardas vs controlado ou amedrontado',
      },
      {
        kind: 'specialAbility',
        name: 'Quebrar compulsão contra a ordem',
        description:
          'Ação livre ao receber ordem que viola os preceitos: nova Vontade, no máximo o resultado original. Uma vez por efeito.',
        actionType: 'free',
      },
    ],
    sourcePage: 24,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8813',
  }),
  f({
    id: 'feat-hellknight-armigers-protection',
    name: 'Proteção do Armígero',
    originalName: "Armiger's Protection",
    level: 4,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    description:
      'Treinado em armadura leve e couraça Hellknight (média). Se já era treinado em leve e média, treinado em meia-placa e placa Hellknight. Quando um recurso de classe conceder perito ou melhor em qualquer tipo de armadura (não defesa sem armadura), ganha o mesmo posto nessas armaduras Hellknight. Se tiver perito em defesa sem armadura e for 13º nível ou mais, também fica perito nessas armaduras. Recebe um traje não mágico do tipo em que ficou treinado.',
    effects: [
      { kind: 'defenseRank', categories: ['light'], rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Armadura Hellknight',
        description:
          'Treinado em couraça Hellknight. Se já era treinado em leve e média: meia-placa e placa Hellknight. Postos de armadura da classe também valem nesses tipos. Recebe um traje não mágico do tipo treinado.',
      },
    ],
    sourcePage: 24,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8814',
  }),
  f({
    id: 'feat-hellknight-diabolic-certitude',
    name: 'Certeza Diabólica',
    originalName: 'Diabolic Certitude',
    level: 4,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    description:
      'Teste para Recordar Conhecimento sobre um diabo que você observa. Falha crítica vira falha; sucesso vira sucesso crítico.',
    actionType: 'free',
    trigger: 'Seu turno começa e você pode observar um diabo.',
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8815',
  }),
  f({
    id: 'feat-hellknight-mortification',
    name: 'Mortificação',
    originalName: 'Mortification',
    level: 4,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    description:
      'Escolha concussão, perfurante ou cortante, conforme suas provações. Resistência a esse tipo igual ao número de feitos de classe do arquétipo Hellknight. Você escolhe o tipo; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'hellknight-mortification',
        options: [
          { id: 'bludgeoning', label: 'Concussão' },
          { id: 'piercing', label: 'Perfurante' },
          { id: 'slashing', label: 'Cortante' },
        ],
        hint: 'Tipo de dano das provações. O motor não escolhe.',
        abilityName: 'Resistência de mortificação: {choice}',
        abilityDescription:
          'Resistência igual ao número de feitos de classe do arquétipo Hellknight.',
      },
    ],
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8816',
  }),
  f({
    id: 'feat-hellknight-preferment',
    name: 'Preferimento de Hellknight',
    originalName: 'Hellknight Preferment',
    level: 6,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Passou no Teste Hellknight; treinado em placa Hellknight. Não pode ter Errante nem Preferimento de Signifer.',
      },
    ],
    description:
      'Hellknight de pleno direito. Perito em Intimidação (se já for perito, perito em outra perícia treinada à sua escolha). Especialização de couraça, meia-placa e placa Hellknight, com resistência 1 maior que o normal. +1 de circunstância em Intimidação com qualquer armadura Hellknight. Não pode pegar Errante nem Preferimento de Signifer. O motor não escolhe a perícia alternativa.',
    effects: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'expert' },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Intimidação enquanto usa armadura Hellknight',
      },
      {
        kind: 'specialAbility',
        name: 'Especialização de armadura Hellknight',
        description:
          'Efeitos de especialização de couraça, meia-placa e placa Hellknight; resistência 1 maior. Se já era perito em Intimidação, perito em outra perícia treinada à sua escolha (anote na ficha).',
      },
    ],
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8818',
  }),
  f({
    id: 'feat-hellknight-signifer-preferment',
    name: 'Preferimento de Signifer Hellknight',
    originalName: 'Hellknight Signifer Preferment',
    level: 6,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Passou no Teste Hellknight; treinado em couraça Hellknight; recurso de conjuração de classe. Não pode ter Errante nem Preferimento de Hellknight.',
      },
    ],
    description:
      'Signifer: máscara sem olhos (não obscurece sua visão). Com a máscara: +1 de circunstância em Enganação para Mentir, Intimidação para Coagir e CD de Enganação vs Intuir Motivação. Perito em Intimidação (se já for perito, outra perícia treinada à sua escolha) e perito em Arcanismo, Natureza, Ocultismo ou Religião. Você escolhe a perícia de tradição; o motor não escolhe. Não pode pegar Errante nem Preferimento de Hellknight.',
    effects: [
      { kind: 'skillRank', skillId: 'intimidation', rank: 'expert' },
      {
        kind: 'skillRankChoice',
        choiceId: 'hellknight-signifer-tradition-skill',
        rank: 'expert',
        skillOptions: ['arcana', 'nature', 'occultism', 'religion'],
        hint: 'Arcanismo, Natureza, Ocultismo ou Religião. O motor não escolhe.',
      },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo:
          'Enganação para Mentir, Intimidação para Coagir e CD de Enganação vs Intuir Motivação (máscara de signifer)',
      },
      {
        kind: 'specialAbility',
        name: 'Máscara de signifer',
        description:
          'Não obscurece sua visão; outros não veem seus olhos. Se já era perito em Intimidação, perito em outra perícia treinada à sua escolha (anote na ficha).',
      },
    ],
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8819',
  }),
  f({
    id: 'feat-hellknight-errant',
    name: 'Hellknight Errante',
    originalName: 'Hellknight-Errant',
    level: 6,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Recusou ou falhou no Teste Hellknight. Não pode ter Preferimento de Hellknight nem de Signifer.',
      },
    ],
    description:
      'Permanece armígero. A resistência mental da Dedicação passa a 5 + o número de feitos de classe deste arquétipo. Ganha Deslocamento Protetor: 1 ação; requisito aliado voluntário adjacente; move o aliado 1,5 m e pode Dar um Passo no espaço que ele deixou. Não pode pegar Preferimento de Hellknight nem de Signifer.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Resistência mental de errante',
        description:
          'Resistência a dano mental igual a 5 + o número de feitos de classe do arquétipo Hellknight (substitui a da Dedicação).',
      },
      {
        kind: 'specialAbility',
        name: 'Deslocamento Protetor',
        description:
          'Requisito: aliado voluntário adjacente. Mova o aliado 1,5 m em qualquer direção e pode Dar um Passo no espaço que ele deixou.',
        actionType: 'one',
      },
    ],
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8817',
  }),
  f({
    id: 'feat-hellknight-fearsome-brute',
    name: 'Bruto Temível',
    originalName: 'Fearsome Brute',
    level: 8,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description:
      'Bônus de circunstância no dano de Golpes contra criaturas amedrontadas igual ao dobro do valor de amedrontado (o triplo se for mestre em Intimidação).',
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4826',
  }),
  f({
    id: 'feat-hellknight-mobility',
    name: 'Mobilidade Hellknight',
    originalName: 'Hellknight Mobility',
    level: 8,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    description:
      'Com armadura pesada, se cumprir o requisito de Força, reduz a penalidade de movimento em 3 m em vez de 1,5 m (em geral a 0). Anão com Ferro Desimpedido: Deslocamento +1,5 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Movimento em armadura pesada',
        description:
          'Reduz a penalidade de movimento da pesada em 3 m se cumprir a Força. Anão com Ferro Desimpedido: Deslocamento +1,5 m.',
      },
    ],
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8820',
  }),
  f({
    id: 'feat-hellknight-masked-casting',
    name: 'Conjuração Mascarada',
    originalName: 'Masked Casting',
    level: 8,
    archetypeId: 'archetype-hellknight',
    prereqId: 'feat-hellknight-signifer-preferment',
    prereqName: 'Preferimento de Signifer Hellknight',
    extraPrereq: [{ kind: 'text', label: 'Usando a máscara de signifer' }],
    description:
      'Desvie o Olhar. Enquanto desvia o olhar assim, +2 de circunstância em salvaguardas e testes para descrer ilusões.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'salvaguardas e testes para descrer ilusões (Desvie o Olhar da máscara)',
      },
    ],
    actionType: 'free',
    trigger: 'Você começa a Conjurar uma Magia.',
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8821',
  }),
  f({
    id: 'feat-hellknight-order-training',
    name: 'Treinamento da Ordem',
    originalName: 'Order Training',
    level: 8,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    description:
      'Benefício menor da ordem escolhida na Dedicação. Corrente — Grilhões da Lei (2 ações, ímpeto): Golpe e, se causar dano, Agarrar; com mangual ou corrente com espinhos ignora mão livre e sucesso vira crítico. Portão — localize 1/dia (tradição à sua escolha; 5º posto no 14º se for do Portão). Garra de Deus — Iniciado de Domínio (dever, poder, perfeição ou proteção); PV temporários iguais ao dobro do posto da magia (1 rodada); símbolos de Abadar, Asmodeus, Iomedae, Irori ou Uirch. Prego — ignora terreno difícil de plantas, fungos ou chão irregular; sucesso em Recordar Conhecimento vs animal/fera/fungo/planta: +3 m de circunstância nos Deslocamentos no resto do turno. Pira — resistir à energia divino inato 2/dia só em você; resistência a fogo = o maior entre o da magia e o nível. Cavalete — sucesso vs ilusão, sonho ou descrer ilusão vira crítico; falha crítica vira falha. Flagelo — 1 ação: Golpe; se causar dano, aliados numa emanação de 6 m reduzem amedrontado em 1 (2 se o alvo era a fonte). O motor não escolhe ordem, tradição nem domínio.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Benefício menor da ordem',
        description:
          'Aplica o benefício menor da ordem escolhida na Dedicação (veja a descrição do feito). Escolhas da ordem (tradição, domínio) são suas; o motor não escolhe.',
      },
    ],
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8822',
  }),
  f({
    id: 'feat-hellknight-sense-iniquity',
    name: 'Sentir a Iniquidade',
    originalName: 'Sense Iniquity',
    level: 8,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    description:
      'Por 1 minuto: +2 de status na CD de Percepção contra Criar uma Distração, Fintar você ou Mentir para você. Ao Buscar criatura oculta ou ver através de Personificar, +2 de status no teste de Percepção.',
    actionType: 'one',
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8823',
  }),
  f({
    id: 'feat-hellknight-shatter-defenses',
    name: 'Despedaçar Defesas',
    originalName: 'Shatter Defenses',
    level: 8,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Pressão'],
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description:
      'Golpe corpo a corpo contra criatura amedrontada. Se acertar e causar dano, o alvo fica desprevenido até o amedrontado acabar. Se já estava desprevenido contra você, não pode reduzir amedrontado abaixo de 1 até o início do seu próximo turno.',
    actionType: 'one',
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4806',
  }),
  f({
    id: 'feat-hellknight-steady-spellcasting',
    name: 'Conjuração Firme',
    originalName: 'Steady Spellcasting',
    level: 8,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de conjurador' }],
    description:
      'Se uma reação for interromper sua ação de conjuração, teste simples CD 15. Sucesso: a ação não é interrompida.',
    sourcePage: 25,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4602',
  }),
  f({
    id: 'feat-hellknight-blade-of-law',
    name: 'Lâmina da Lei',
    originalName: 'Blade of Law',
    level: 10,
    archetypeId: 'archetype-hellknight',
    prereqId: 'feat-hellknight-preferment',
    prereqName: 'Preferimento de Hellknight',
    extraPrereq: [
      { kind: 'text', label: 'O alvo tentou uma ação hostil contra você desde o seu turno anterior' },
    ],
    description:
      'Golpe de arma ou desarmado contra o alvo. Conta como dois Golpes na penalidade de ataque múltiplo. +1 dado de dano da arma e 1d8 de espírito (2d8 no 18º nível).',
    actionType: 'two',
    sourcePage: 26,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8824',
  }),
  f({
    id: 'feat-hellknight-gaze-of-veracity',
    name: 'Olhar da Veracidade',
    originalName: 'Gaze of Veracity',
    level: 10,
    archetypeId: 'archetype-hellknight',
    prereqId: 'feat-hellknight-signifer-preferment',
    prereqName: 'Preferimento de Signifer Hellknight',
    description:
      'Aprende a magia de foco vislumbre da verdade, na mesma tradição do recurso de conjuração usado no Preferimento de Signifer. Reserva de foco 1 (ou +1, máximo 3). Refoco: estudar tomos de lei ou meditar na Medida e na Corrente. O motor não escolhe a tradição.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Vislumbre da verdade',
        description:
          'Magia de foco na tradição da sua conjuração de classe (a do Preferimento de Signifer). O motor não escolhe a tradição.',
      },
    ],
    sourcePage: 26,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8825',
  }),
  f({
    id: 'feat-hellknight-signifers-sight',
    name: 'Visão do Signifer',
    originalName: "Signifer's Sight",
    level: 10,
    archetypeId: 'archetype-hellknight',
    prereqId: 'feat-hellknight-signifer-preferment',
    prereqName: 'Preferimento de Signifer Hellknight',
    description:
      'Com a máscara de signifer: visão no escuro (visão no escuro maior se já tiver visão no escuro). Se estiver ofuscado e o alvo estiver oculto só por isso, a CD do teste simples cai de 5 para 3.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Visão da máscara de signifer',
        description:
          'Visão no escuro (maior se já tiver). Ofuscado: CD 3 em vez de 5 contra alvo oculto só por ofuscado.',
      },
    ],
    sourcePage: 26,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8826',
  }),
  f({
    id: 'feat-hellknight-advanced-order-training',
    name: 'Treinamento Avançado da Ordem',
    originalName: 'Advanced Order Training',
    level: 12,
    archetypeId: 'archetype-hellknight',
    prereqId: 'feat-hellknight-order-training',
    prereqName: 'Treinamento da Ordem',
    description:
      'Benefício maior da ordem da Dedicação. Corrente — Agarrar: falha crítica vira falha; o agarrado que falhar em Escapar sofre falha crítica, e sucesso crítico vira sucesso. Portão — convocar capeta 6º posto 1/dia (só diabos; tradição à sua escolha; sobe 1 posto no 14º e a cada 2 níveis). Garra de Deus — Bênção dos Cinco (3 ações, 1/dia): curar de 3 ações no posto igual a metade do nível − 1, até 5 criaturas imunes; ou reviver quem morreu na última rodada a 9 m (1 PV, condenado 1). Prego — sucesso em Recordar Conhecimento vs animal/fera/fungo/planta vira crítico; no crítico, a criatura fica amedrontada 1. Pira — 2 ações: Golpe corpo a corpo (conta como dois na penalidade); acerto: 1d6 espírito persistente e estupefato 1 até o persistente acabar. Cavalete — 2 ações: Golpe; acerto: só sussurro por 1 rodada (teste simples CD 5 para conjurar); crítico: não fala por 1 rodada e só sussurra por 1 minuto; imune 1 minuto. Flagelo — 3 ações, 1/dia: 1 minuto, vê através de até 1,5 m de pedra ou madeira (metal bloqueia). O motor não escolhe tradição.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Benefício maior da ordem',
        description:
          'Aplica o benefício maior da ordem escolhida na Dedicação (veja a descrição). O motor não escolhe.',
      },
    ],
    sourcePage: 26,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8827',
  }),
  f({
    id: 'feat-hellknight-conjure-hell',
    name: 'Conjurar o Inferno',
    originalName: 'Conjure Hell',
    level: 12,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Concentração', 'Divino', 'Fogo', 'Manipular', 'Espírito', 'Profano'],
    prereqId: 'feat-hellknight-signifer-preferment',
    prereqName: 'Preferimento de Signifer Hellknight',
    description:
      'Cada criatura numa explosão de 4,5 m a até 36 m sofre 9d6 de fogo (Fortitude básica vs CD de magia). Ignora resistência a fogo igual ao seu nível (não imunidade). Falha: 2d6 espírito persistente (4d6 na falha crítica). No 14º e a cada 2 níveis, +2d6 no fogo inicial.',
    actionType: 'two',
    sourcePage: 26,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8828',
  }),
  f({
    id: 'feat-hellknight-hells-armaments',
    name: 'Armamentos do Inferno',
    originalName: "Hell's Armaments",
    level: 12,
    archetypeId: 'archetype-hellknight',
    prereqId: 'feat-hellknight-preferment',
    prereqName: 'Preferimento de Hellknight',
    extraPrereq: [{ kind: 'text', label: 'Perito em ao menos uma arma favorecida da ordem' }],
    description:
      'Acerto crítico com arma favorecida da ordem: o alvo faz Fortitude vs CD de classe. Se tiver especialização crítica dessa arma, escolha entre ela e este efeito. Crítico: nada. Sucesso: −3 m de circunstância nos Deslocamentos até o fim do seu próximo turno. Falha: como sucesso e lentidão 1. Falha crítica: como sucesso e lentidão 2.',
    sourcePage: 27,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8829',
  }),
  f({
    id: 'feat-hellknight-order-cross-training',
    name: 'Treinamento Cruzado de Ordem',
    originalName: 'Order Cross-Training',
    level: 12,
    archetypeId: 'archetype-hellknight',
    prereqId: DED_HK.id,
    prereqName: DED_HK.name,
    extraPrereq: [{ kind: 'text', label: 'Em boa posição com a ordem cujo treino recebe' }],
    description:
      'Benefício menor de uma ordem Hellknight diferente da sua. Pode pegar várias vezes, cada uma com ordem diferente. Você escolhe a ordem; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'hellknight-cross-order',
        options: HELLKNIGHT_ORDERS,
        hint: 'Ordem diferente da sua. O motor não escolhe.',
        abilityName: 'Treinamento cruzado: {choice}',
        abilityDescription: 'Benefício menor dessa ordem (veja Treinamento da Ordem).',
      },
    ],
    repeatable: true,
    sourcePage: 27,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8830',
  }),
  f({
    id: 'feat-hellknight-march-of-law',
    name: 'Marcha da Lei',
    originalName: 'March of Law',
    level: 14,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Emoção', 'Medo', 'Mental', 'Visual'],
    prereqId: 'feat-hellknight-preferment',
    prereqName: 'Preferimento de Hellknight',
    extraPrereq: [
      { kind: 'text', label: 'O alvo tentou uma ação hostil contra você desde o seu turno anterior' },
    ],
    description:
      'Avance em direção ao alvo com +3 m de status nos Deslocamentos, ignorando terreno difícil. Se terminar adjacente, cada inimigo adjacente que viu o movimento fica amedrontado 2. Pode Cavar, Escalar, Voar ou Nadar no lugar de Avançar se tiver o deslocamento.',
    actionType: 'one',
    frequency: '1/rodada',
    sourcePage: 27,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8831',
  }),
  f({
    id: 'feat-hellknight-unfetter-sight',
    name: 'Visão Desimpedida',
    originalName: 'Unfetter Sight',
    level: 14,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Concentração'],
    prereqId: 'feat-hellknight-signifers-sight',
    prereqName: 'Visão do Signifer',
    extraPrereq: [{ kind: 'text', label: 'Usando a máscara de signifer' }],
    description:
      'Cada aliado numa emanação de 9 m ganha os benefícios de Visão do Signifer por 1 minuto, como se usasse máscara de signifer.',
    actionType: 'one',
    frequency: '1/hora',
    sourcePage: 27,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8832',
  }),
  f({
    id: 'feat-hellknight-branding-spell',
    name: 'Magia Marcante',
    originalName: 'Branding Spell',
    level: 16,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Concentração', 'Maldição', 'Forma de magia'],
    prereqId: 'feat-hellknight-signifer-preferment',
    prereqName: 'Preferimento de Signifer Hellknight',
    description:
      'Se a próxima ação for Conjurar uma Magia que não seja truque e cause dano de fogo, o alvo que falhar na salvaguarda recebe uma marca só você vê (1 semana). Enquanto marcado e no mesmo plano, você sabe direção geral, distância aproximada, direção do movimento e condições. Só uma marca por vez.',
    actionType: 'free',
    sourcePage: 27,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8834',
  }),
  f({
    id: 'feat-hellknight-infernal-interference',
    name: 'Interferência Infernal',
    originalName: 'Infernal Interference',
    level: 16,
    archetypeId: 'archetype-hellknight',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: 'feat-hellknight-preferment',
    prereqName: 'Preferimento de Hellknight',
    extraPrereq: [{ kind: 'text', label: 'Empunhando arma favorecida da ordem' }],
    description:
      'Golpeie o inimigo duas vezes com a arma exigida. Se qualquer Golpe acertar: estupefato 1 e sem reações até o início do seu próximo turno. Se os dois acertarem: estupefato 3.',
    actionType: 'two',
    sourcePage: 27,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8833',
  }),
]

const goldenLegionnaireArchetypeFeats: Feat[] = [
  f({
    id: DED_GL.id,
    name: DED_GL.name,
    originalName: 'Golden Legionnaire Dedication',
    level: 4,
    archetypeId: 'archetype-golden-legionnaire',
    isDedication: true,
    rarity: 'uncommon',
    ignoresDedicationLockFromArchetypeIds: ['archetype-eagle-knight'],
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Treinado em armadura pesada; acesso: convite de Cavaleiro Águia ou Conselho do Povo. Pode pegar sem dois feitos extras de Cavaleiro Águia.',
      },
    ],
    description:
      'Ao Levantar um Escudo, o bônus de circunstância do escudo também vale na CD de Fortitude contra Agarrar, Reposicionar ou Empurrar. Conhecimento Adicional de Guerra (sobe nos níveis 3, 7 e 15); se já era treinado, também outro Conhecimento à sua escolha. Pode pegar esta Dedicação mesmo sem dois feitos extras de Cavaleiro Águia. O motor não escolhe o Conhecimento extra.',
    effects: [
      { kind: 'lore', loreName: 'Guerra', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional de Guerra',
        description:
          'Sobe sozinho nos níveis 3, 7 e 15. Se já era treinado em Guerra, também fica treinado em outro Conhecimento à sua escolha (anote na ficha).',
      },
      {
        kind: 'specialAbility',
        name: 'Muralha de metal',
        description:
          'Ao Levantar um Escudo, o bônus de circunstância do escudo também vale na CD de Fortitude contra Agarrar, Reposicionar ou Empurrar.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8835',
  }),
  f({
    id: 'feat-golden-legionnaire-armor-specialist',
    name: 'Especialista em Armadura',
    originalName: 'Armor Specialist',
    level: 6,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de sentinela' }],
    description: 'Ganha os efeitos de especialização de armadura para todas as armaduras em que for proficiente.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Especialização de armadura',
        description: 'Efeitos de especialização para todas as armaduras em que for proficiente.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=373',
  }),
  f({
    id: 'feat-golden-legionnaire-commitment-to-protection',
    name: 'Compromisso com a Proteção',
    originalName: 'Commitment to Protection',
    level: 6,
    archetypeId: 'archetype-golden-legionnaire',
    traits: ['Arquétipo', 'Auditivo', 'Mental', 'Perícia'],
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    description:
      'Teste de Conhecimento de Guerra contra a CD difícil do nível de uma criatura ou perigo que você vê. Um aliado a 9 m: sucesso crítico +2 de circunstância na CA contra o próximo ataque do alvo; sucesso +1; falha crítica −1. Lendário em Guerra: falha ou falha crítica vira sucesso.',
    actionType: 'one',
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8836',
  }),
  f({
    id: 'feat-golden-legionnaire-legions-aim',
    name: 'Mira da Legião',
    originalName: "Legion's Aim",
    level: 6,
    archetypeId: 'archetype-golden-legionnaire',
    rarity: 'uncommon',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    description:
      'Familiaridade com armas de fogo marciais e bombas alquímicas: trata como simples para proficiência. Ignora a penalidade de ataques à distância no segundo incremento com bombas alquímicas. Acesso a armas de fogo e bombas alquímicas incomuns.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        groups: ['firearm'],
        traits: ['bomb'],
        martialAsSimple: true,
        accessUncommonTrait: 'firearm',
      },
      {
        kind: 'specialAbility',
        name: 'Bombas alquímicas e acesso incomum',
        description:
          'Bombas alquímicas como armas simples. Ignora a penalidade no 2º incremento com bombas. Acesso a armas de fogo e bombas alquímicas incomuns.',
      },
    ],
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8837',
  }),
  f({
    id: 'feat-golden-legionnaire-polished-distraction',
    name: 'Distração Polida',
    originalName: 'Polished Distraction',
    level: 6,
    archetypeId: 'archetype-golden-legionnaire',
    traits: ['Arquétipo', 'Incapacitação', 'Luz', 'Visual'],
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    description:
      'Criaturas numa emanação de 1,5 m que possam vê-lo fazem Fortitude vs CD de classe. Imunes 24 horas depois do teste. Crítico: nada. Sucesso: ofuscado 1 rodada. Falha: cego 1 rodada e ofuscado 2. Falha crítica: cego 2 rodadas e ofuscado 1 minuto.',
    actionType: 'two',
    sourcePage: 32,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8838',
  }),
  f({
    id: 'feat-golden-legionnaire-armed-and-armored',
    name: 'Armado e Encouraçado',
    originalName: 'Armed and Armored',
    level: 8,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    extraPrereq: [{ kind: 'text', label: 'Treinado em armas de fogo marciais' }],
    description: 'Pode Interagir para recarregar uma arma usando a mão que empunha o escudo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Recarregar com o escudo',
        description: 'Interaja para recarregar usando a mão do escudo.',
      },
    ],
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8839',
  }),
  f({
    id: 'feat-golden-legionnaire-commitment-to-valor',
    name: 'Compromisso com o Valor',
    originalName: 'Commitment to Valor',
    level: 8,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    description:
      'Em vez de ficar em fuga, fica estupefato 1 pelo tempo em que estaria em fuga. Se estiver amedrontado, reduza o valor em 1.',
    actionType: 'reaction',
    trigger: 'Você ganharia a condição em fuga.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8840',
  }),
  f({
    id: 'feat-golden-legionnaire-reactive-strike',
    name: 'Golpe Reativo',
    originalName: 'Reactive Strike',
    level: 8,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro/campeão' }],
    description:
      'Golpe corpo a corpo contra a criatura disparadora. Acerto crítico e o gatilho era manipular: interrompe a ação. Este Golpe não conta na penalidade de ataque múltiplo e ela não se aplica a ele.',
    actionType: 'reaction',
    trigger:
      'Uma criatura no seu alcance usa ação de manipular ou de movimento, faz um ataque à distância ou sai de um quadrado durante um movimento.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5832',
  }),
  f({
    id: 'feat-golden-legionnaire-reflexive-shield',
    name: 'Escudo Reflexivo',
    originalName: 'Reflexive Shield',
    level: 8,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description:
      'Ao Levantar o Escudo, o bônus de circunstância também vale para Reflexos. Dano de salvaguarda de Reflexos pode disparar Bloqueio com Escudo mesmo se não for físico.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4803',
  }),
  f({
    id: 'feat-golden-legionnaire-shield-warden',
    name: 'Guardião do Escudo',
    originalName: 'Shield Warden',
    level: 8,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    extraPrereq: [{ kind: 'text', label: 'Bloqueio com Escudo; feito adicional de guerreiro/campeão' }],
    description:
      'Com o escudo erguido, use Bloqueio com Escudo quando um aliado adjacente for atacado; o escudo protege o aliado.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4807',
  }),
  f({
    id: 'feat-golden-legionnaire-crack-retort',
    name: 'Réplica Estalada',
    originalName: 'Crack Retort',
    level: 10,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: 'feat-golden-legionnaire-reactive-strike',
    prereqName: 'Golpe Reativo',
    extraPrereq: [{ kind: 'text', label: 'Treinado em armas de fogo marciais' }],
    description:
      'Pode usar Golpe Reativo com uma arma de fogo carregada que esteja empunhando. A criatura disparadora precisa estar a 1,5 m.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Golpe Reativo com arma de fogo',
        description: 'Arma de fogo carregada; disparador a 1,5 m.',
      },
    ],
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8841',
  }),
  f({
    id: 'feat-golden-legionnaire-hell-lancer-shot',
    name: 'Tiro do Lanceiro Infernal',
    originalName: 'Hell-Lancer Shot',
    level: 10,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    extraPrereq: [{ kind: 'text', label: 'Treinado em armas de fogo marciais' }],
    description:
      'Golpe à distância com arma de fogo contra um capeta, ignorando oculto e cobertura menor. Se acertar, bônus de circunstância no dano igual ao dobro do número de dados de dano da arma. Conta como dois ataques na penalidade de ataque múltiplo.',
    actionType: 'two',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8842',
  }),
  f({
    id: 'feat-golden-legionnaire-lasting-protection',
    name: 'Proteção Duradoura',
    originalName: 'Lasting Protection',
    level: 10,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: 'feat-golden-legionnaire-commitment-to-protection',
    prereqName: 'Compromisso com a Proteção',
    description:
      'Os efeitos de Compromisso com a Proteção no aliado valem contra todos os ataques da criatura ou perigo até o início do seu próximo turno.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8843',
  }),
  f({
    id: 'feat-golden-legionnaire-commitment-to-vigilance',
    name: 'Compromisso com a Vigilância',
    originalName: 'Commitment to Vigilance',
    level: 14,
    archetypeId: 'archetype-golden-legionnaire',
    traits: ['Arquétipo', 'Postura'],
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    description: 'Nesta postura, todos os espaços no seu alcance corpo a corpo são terreno difícil para inimigos.',
    actionType: 'one',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8844',
  }),
  f({
    id: 'feat-golden-legionnaire-watch-your-back',
    name: 'Cuidado com as Costas',
    originalName: 'Watch Your Back',
    level: 14,
    archetypeId: 'archetype-golden-legionnaire',
    traits: ['Arquétipo', 'Auditivo', 'Linguístico', 'Mental'],
    prereqId: DED_GL.id,
    prereqName: DED_GL.name,
    description:
      'Escolha um aliado a 18 m. Até o início do seu próximo turno, ele não fica desprevenido por flanquear.',
    actionType: 'one',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8845',
  }),
  f({
    id: 'feat-golden-legionnaire-officers-protection',
    name: 'Proteção do Oficial',
    originalName: "Officer's Protection",
    level: 16,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: 'feat-golden-legionnaire-commitment-to-protection',
    prereqName: 'Compromisso com a Proteção',
    description:
      'Compromisso com a Proteção pode afetar todos os aliados a 9 m. Com Proteção Duradoura, os efeitos em todos valem até o início do seu próximo turno.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8846',
  }),
  f({
    id: 'feat-golden-legionnaire-improved-reflexive-shield',
    name: 'Escudo Reflexivo Aprimorado',
    originalName: 'Improved Reflexive Shield',
    level: 18,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: 'feat-golden-legionnaire-reflexive-shield',
    prereqName: 'Escudo Reflexivo',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de guerreiro' }],
    description:
      'Ao usar Bloqueio com Escudo contra dano de Reflexos, aliados adjacentes que sofreriam dano da mesma salvaguarda também se beneficiam da redução.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4849',
  }),
  f({
    id: 'feat-golden-legionnaire-no-need-to-fear',
    name: 'Não Há Motivo para Temer',
    originalName: 'No Need to Fear',
    level: 18,
    archetypeId: 'archetype-golden-legionnaire',
    traits: ['Arquétipo', 'Auditivo', 'Linguístico', 'Mental'],
    prereqId: 'feat-golden-legionnaire-commitment-to-valor',
    prereqName: 'Compromisso com o Valor',
    description:
      'Tente contrapor o efeito disparador com Conhecimento de Guerra, usando metade do nível (arredondado para cima) como posto de contraposição.',
    actionType: 'reaction',
    trigger: 'Você ou um aliado a 18 m tenta salvaguarda contra um efeito de medo.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8847',
  }),
  f({
    id: 'feat-golden-legionnaire-shield-of-grace',
    name: 'Escudo da Graça',
    originalName: 'Shield of Grace',
    level: 18,
    archetypeId: 'archetype-golden-legionnaire',
    prereqId: 'feat-golden-legionnaire-shield-warden',
    prereqName: 'Guardião do Escudo',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de campeão' }],
    description:
      'Ao usar Bloqueio com Escudo para impedir dano a um aliado, pode dividir igualmente o dano restante (depois do Bloqueio) entre o aliado e você.',
    sourcePage: 33,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5926',
  }),
]

const steelFalconArchetypeFeats: Feat[] = [
  f({
    id: DED_SF.id,
    name: DED_SF.name,
    originalName: 'Steel Falcon Dedication',
    level: 4,
    archetypeId: 'archetype-steel-falcon',
    isDedication: true,
    rarity: 'uncommon',
    ignoresDedicationLockFromArchetypeIds: ['archetype-eagle-knight'],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'diplomacy', rank: 'expert' },
      {
        kind: 'text',
        label:
          'Perito em Diplomacia; acesso: convite de Cavaleiro Águia ou Conselho do Povo. Pode pegar sem dois feitos extras de Cavaleiro Águia.',
      },
    ],
    description:
      'Ganha Avaliar (1 ação, concentração): designe uma criatura não-sem-mente que possa ver e ouvir como foco. +2 de circunstância em Percepção para Intuir Motivação do foco e na CD de Percepção se o foco Mentir ou Fintar contra você. +2 de circunstância em Enganação, Diplomacia e Intimidação contra o foco. Só um foco por vez; dura até as próximas preparações. Pode pegar esta Dedicação mesmo sem dois feitos extras de Cavaleiro Águia.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Avaliar',
        description:
          '1 ação, concentração. Designe uma criatura não-sem-mente que possa ver e ouvir. +2 de circunstância em Percepção para Intuir Motivação do foco e na CD de Percepção se o foco Mentir ou Fintar contra você; +2 em Enganação, Diplomacia e Intimidação contra o foco. Só um foco por vez; dura até as próximas preparações.',
        actionType: 'one',
      },
    ],
    sourcePage: 34,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8848',
  }),
  f({
    id: 'feat-steel-falcon-denounce-tyranny',
    name: 'Denunciar a Tirania',
    originalName: 'Denounce Tyranny',
    level: 6,
    archetypeId: 'archetype-steel-falcon',
    traits: ['Arquétipo', 'Auditivo', 'Linguístico', 'Mental'],
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    extraPrereq: [
      {
        kind: 'text',
        label:
          'Você viu uma criatura ferir um aliado, ferir um não combatente ou cometer um ato flagrantemente maligno na última rodada',
      },
    ],
    description:
      'Teste de Diplomacia contra as CDs de Vontade de até 3 aliados da criatura disparadora a 9 m. Sucesso: o alvo recusa tratar a criatura como aliada por 1 rodada (2 no crítico). Graus independentes. Mestre: até 5 alvos. Lendário: até 10.',
    actionType: 'two',
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8849',
  }),
  f({
    id: 'feat-steel-falcon-favored-terrain',
    name: 'Terreno Favorecido',
    originalName: 'Favored Terrain',
    level: 6,
    archetypeId: 'archetype-steel-falcon',
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de patrulheiro' }],
    description:
      'Escolha aquático, ártico, deserto, floresta, montanha, planície, céu, pântano ou subterrâneo. Lá, ignore terreno difícil não mágico. Com jornada desimpedida, ganha o segundo benefício do patrulheiro naquele terreno. Você escolhe o terreno; o motor não escolhe.',
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'steel-falcon-terrain',
        options: FAVORED_TERRAIN,
        hint: 'Terreno favorecido. O motor não escolhe.',
        abilityName: 'Terreno favorecido: {choice}',
        abilityDescription: 'Ignore terreno difícil não mágico nesse terreno. Com jornada desimpedida, o segundo benefício do patrulheiro.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4866',
  }),
  f({
    id: 'feat-steel-falcon-gray-corsair-training',
    name: 'Treinamento de Corsário Cinzento',
    originalName: 'Gray Corsair Training',
    level: 6,
    archetypeId: 'archetype-steel-falcon',
    rarity: 'uncommon',
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    description:
      'Ganha Dedicação de Pirata mesmo sem dois feitos extras de Falcão de Aço ou Cavaleiro Águia. Pode selecionar feitos do arquétipo Pirata como se fossem feitos de Falcão de Aço.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Dedicação de Pirata (Corsário Cinzento)',
        description:
          'Ganha Dedicação de Pirata sem os dois feitos extras. Feitos de Pirata contam como feitos de Falcão de Aço. Escolha a Dedicação de Pirata na ficha; o motor não escolhe os feitos.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8850',
  }),
  f({
    id: 'feat-steel-falcon-libertys-promise',
    name: 'Promessa da Liberdade',
    originalName: "Liberty's Promise",
    level: 6,
    archetypeId: 'archetype-steel-falcon',
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    description:
      'Ganha Iniciado de Domínio de clérigo, mas deve escolher liberdade, verdade ou zelo. Conjura a magia inicial como magia de foco divina. Refoco: contemplar ou espalhar a Regra Comum. Símbolo divino vira uma águia com espada nas garras. Pode pegar de novo com outro domínio. Você escolhe o domínio; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: STEEL_FALCON_SPELL },
      {
        kind: 'textChoice',
        choiceId: 'steel-falcon-domain',
        options: [
          { id: 'freedom', label: 'Liberdade' },
          { id: 'truth', label: 'Verdade' },
          { id: 'zeal', label: 'Zelo' },
        ],
        hint: 'Domínio. Na 2ª vez, outro. O motor não escolhe.',
        abilityName: 'Domínio: {choice}',
        abilityDescription:
          'Magia inicial de domínio como magia de foco divina (Sabedoria). Símbolo: águia com espada.',
      },
    ],
    repeatable: true,
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8851',
  }),
  f({
    id: 'feat-steel-falcon-evangelize',
    name: 'Evangelizar',
    originalName: 'Evangelize',
    level: 7,
    archetypeId: 'archetype-steel-falcon',
    traits: ['Arquétipo', 'Auditivo', 'Linguístico', 'Mental', 'Perícia'],
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'diplomacy', rank: 'master' },
      { kind: 'text', label: 'Mestre em Diplomacia; seguidor de religião ou filosofia (Regra Comum)' },
    ],
    description:
      'Teste de Diplomacia vs CD de Vontade de um alvo que o ouça e entenda o idioma. Imune a Evangelizar quanto à sua fé/filosofia por 1 dia. Quem já concorda não é afetado. Crítico: estupefato 2 por 1 rodada. Sucesso: estupefato 1 por 1 rodada. Falha: nada.',
    actionType: 'one',
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6478',
  }),
  f({
    id: 'feat-steel-falcon-salt-kissed',
    name: 'Beijo do Sal',
    originalName: 'Salt Kissed',
    level: 8,
    archetypeId: 'archetype-steel-falcon',
    prereqId: 'feat-steel-falcon-gray-corsair-training',
    prereqName: 'Treinamento de Corsário Cinzento',
    description:
      'Bolha de ar e respirar na água como magias inatas divinas de 4º posto 1/dia cada. Adiciona o domínio água às opções de Promessa da Liberdade.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magias inatas marinhas',
        description:
          'Bolha de ar e respirar na água (divinas inatas de 4º posto) 1/dia cada. Domínio água fica disponível em Promessa da Liberdade.',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8852',
  }),
  f({
    id: 'feat-steel-falcon-uncanny-prediction',
    name: 'Predição Inquietante',
    originalName: 'Uncanny Prediction',
    level: 8,
    archetypeId: 'archetype-steel-falcon',
    traits: ['Arquétipo', 'Auditivo', 'Emoção', 'Incapacitação', 'Linguístico', 'Mental'],
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    description:
      'Se o foco de Avaliar estiver a 9 m, ele faz Vontade contra a maior entre CD de classe e CD de magia ou fica atordoado 1 (atordoado 2 na falha crítica). Depois, imune à sua Predição Inquietante por 1 hora.',
    actionType: 'two',
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8853',
  }),
  f({
    id: 'feat-steel-falcon-eye-for-smugglers',
    name: 'Olho para Contrabandistas',
    originalName: 'Eye for Smugglers',
    level: 10,
    archetypeId: 'archetype-steel-falcon',
    prereqId: 'feat-steel-falcon-gray-corsair-training',
    prereqName: 'Treinamento de Corsário Cinzento',
    description:
      '+2 de circunstância em Percepção para achar painéis ocultos, portas ou escotilhas secretas, objetos ocultos e similares (MJ). Se não estiver Buscando nem em Busca, o MJ rola um teste secreto quando você passa a 3 m desses objetos.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'Percepção para painéis ocultos, portas secretas e objetos ocultos',
      },
    ],
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8854',
  }),
  f({
    id: 'feat-steel-falcon-terrain-master',
    name: 'Mestre do Terreno',
    originalName: 'Terrain Master',
    level: 10,
    archetypeId: 'archetype-steel-falcon',
    prereqId: 'feat-steel-falcon-favored-terrain',
    prereqName: 'Terreno Favorecido',
    extraPrereq: [
      { kind: 'skillRank', skillId: 'survival', rank: 'master' },
      { kind: 'text', label: 'Mestre em Sobrevivência; feito adicional de patrulheiro' },
    ],
    description:
      'Passe 1 hora praticando no terreno atual para torná-lo seu terreno favorecido temporário. Se passar um dia inteiro fora dele, volta ao terreno original de Terreno Favorecido.',
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4885',
  }),
  f({
    id: 'feat-steel-falcon-libertys-devotion',
    name: 'Devoção da Liberdade',
    originalName: "Liberty's Devotion",
    level: 12,
    archetypeId: 'archetype-steel-falcon',
    prereqId: 'feat-steel-falcon-libertys-promise',
    prereqName: 'Promessa da Liberdade',
    description:
      'Ganha uma magia avançada de um domínio que você selecionou com Promessa da Liberdade. +1 ponto de foco. Pode pegar de novo, cada vez outra magia avançada de um desses domínios. Você escolhe a magia; o motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Magia avançada de domínio',
        description:
          'Escolher magia avançada de um domínio de Promessa da Liberdade. O motor não escolhe.',
      },
    ],
    repeatable: true,
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8855',
  }),
  f({
    id: 'feat-steel-falcon-perplex',
    name: 'Desconcertar',
    originalName: 'Perplex',
    level: 14,
    archetypeId: 'archetype-steel-falcon',
    traits: ['Arquétipo', 'Auditivo', 'Emoção', 'Linguístico', 'Mental'],
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    description:
      'Alvo a 9 m que possa ouvi-lo: Diplomacia vs CD de Vontade. Imune 24 horas. Crítico: estupefato 3 e confuso 1 rodada. Sucesso: estupefato 1 por 1 rodada. Falha: nada.',
    actionType: 'two',
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8856',
  }),
  f({
    id: 'feat-steel-falcon-frightening-indignation',
    name: 'Indignação Aterradora',
    originalName: 'Frightening Indignation',
    level: 16,
    archetypeId: 'archetype-steel-falcon',
    traits: ['Arquétipo', 'Aura', 'Divino', 'Emoção', 'Medo', 'Mental'],
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    description:
      'Aura 1 minuto. Inimigo que terminar o turno numa emanação de 4,5 m faz Vontade contra a maior entre CD de classe e CD de magia. Crítico: nada e imune 1 minuto. Sucesso: amedrontado 1. Falha: amedrontado 2 e não pode reduzir abaixo de 1 na aura. Falha crítica: amedrontado 3 (mesmo piso).',
    actionType: 'one',
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8857',
  }),
  f({
    id: 'feat-steel-falcon-sense-the-unseen',
    name: 'Sentir o Invisível',
    originalName: 'Sense the Unseen',
    level: 16,
    archetypeId: 'archetype-steel-falcon',
    prereqId: DED_SF.id,
    prereqName: DED_SF.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino/investigador/patrulheiro' }],
    description:
      'Mesmo tendo falhado no teste disparador, sente automaticamente criaturas não detectadas na área em que Busca; ficam apenas ocultas.',
    actionType: 'reaction',
    trigger: 'Você falha num teste de Percepção para Buscar.',
    sourcePage: 35,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4898',
  }),
]

const twilightTalonArchetypeFeats: Feat[] = [
  f({
    id: DED_TT.id,
    name: DED_TT.name,
    originalName: 'Twilight Talon Dedication',
    level: 4,
    archetypeId: 'archetype-twilight-talon',
    isDedication: true,
    rarity: 'uncommon',
    ignoresDedicationLockFromArchetypeIds: ['archetype-eagle-knight'],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'expert' },
      {
        kind: 'text',
        label:
          'Perito em Enganação; acesso: convite das Garras do Crepúsculo. Pode pegar sem dois feitos extras de Cavaleiro Águia.',
      },
    ],
    description:
      'Conhecimento Adicional de Espionagem (sobe nos níveis 3, 7 e 15); se já era treinado, também outro Conhecimento à sua escolha. Nas preparações diárias, estude um campo e fique treinado em um Conhecimento à sua escolha até as próximas preparações (temporário: não serve de pré-requisito). Mestre em Espionagem: perito no escolhido; lendário: mestre. Pode pegar esta Dedicação mesmo sem dois feitos extras de Cavaleiro Águia. O motor não escolhe o Conhecimento extra nem o diário.',
    effects: [
      { kind: 'lore', loreName: 'Espionagem', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Conhecimento Adicional de Espionagem',
        description:
          'Sobe sozinho nos níveis 3, 7 e 15. Se já era treinado em Espionagem, também fica treinado em outro Conhecimento à sua escolha (anote na ficha).',
      },
      {
        kind: 'specialAbility',
        name: 'Conhecimento temporário diário',
        description:
          'Nas preparações, escolha um Conhecimento: treinado até as próximas preparações (perito se for mestre em Espionagem; mestre se for lendário). Temporário: não serve de pré-requisito. Você escolhe cada dia; o motor não escolhe.',
      },
    ],
    sourcePage: 36,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8858',
  }),
  f({
    id: 'feat-twilight-talon-make-do',
    name: 'Dar um Jeito',
    originalName: 'Make Do',
    level: 6,
    archetypeId: 'archetype-twilight-talon',
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    extraPrereq: [{ kind: 'text', label: 'Empunhando ferramenta ou arma quebrada' }],
    description:
      'Por 1 minuto, ignore a condição quebrada da ferramenta ou arma empunhada. Não pode usar Dar um Jeito de novo nesse item por 24 horas.',
    actionType: 'one',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8860',
  }),
  f({
    id: 'feat-twilight-talon-plant-evidence',
    name: 'Plantar Evidência',
    originalName: 'Plant Evidence',
    level: 6,
    archetypeId: 'archetype-twilight-talon',
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    extraPrereq: [{ kind: 'text', label: 'Punguista; feito adicional de ladino' }],
    description:
      'Coloque um item de Carga leve ou desprezível que esteja empunhando numa pessoa sem ela notar: Prestidigitação vs CD de Percepção. Com o estilo rufião, ação livre ao Empurrar com sucesso.',
    actionType: 'one',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4918',
  }),
  f({
    id: 'feat-twilight-talon-sabotage',
    name: 'Sabotar',
    originalName: 'Sabotage',
    level: 6,
    archetypeId: 'archetype-twilight-talon',
    traits: ['Arquétipo', 'Incapacitação'],
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de ladino' }],
    description:
      'Item com partes móveis que uma criatura no alcance empunha ou carrega. Prestidigitação vs CD de Reflexos. O dano não pode reduzir o item abaixo do Limiar de Quebra. Crítico: dano igual a 4× o bônus de proficiência de Prestidigitação. Sucesso: 2×. Falha crítica: imune 1 dia.',
    actionType: 'one',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4936',
  }),
  f({
    id: 'feat-twilight-talon-talons-mark',
    name: 'Marca da Garra',
    originalName: "Talon's Mark",
    level: 6,
    archetypeId: 'archetype-twilight-talon',
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem uma tatuagem mágica ou mundana' }],
    description:
      'Escolha uma tatuagem. Se não era item mágico, vira item 6º nível com os traços investido, oculto e tatuagem. Ativar — Torcer o Desenho (1 ação, concentração, ilusão, oculto): muda a forma da tatuagem para outra de tamanho parecido; pode Dispensar. Ativar — Adotar Persona (3 ações, concentração, ilusão, oculto, 1/dia): disfarce ilusório e ventriloquia de 2º posto em você por 10 minutos. Você escolhe a tatuagem; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tatuagem da Garra',
        description:
          'Tatuagem escolhida (nível 6 se mundana). Torcer o Desenho (1 ação) e Adotar Persona (3 ações, 1/dia: disfarce ilusório e ventriloquia de 2º posto, 10 minutos).',
      },
    ],
    sourcePage: 36,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8859',
  }),
  f({
    id: 'feat-twilight-talon-fabricated-credentials',
    name: 'Credenciais Fabricadas',
    originalName: 'Fabricated Credentials',
    level: 7,
    archetypeId: 'archetype-twilight-talon',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    description:
      'Criar uma Falsificação com Enganação (não Sociedade) em 10 minutos (1 minuto se for lendário em Enganação). O MJ rola Percepção ou Sociedade secreta sempre que você encontra uma falsificação, mesmo sem examinar de perto.',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8861',
  }),
  f({
    id: 'feat-twilight-talon-deceptive-deduction',
    name: 'Dedução Enganosa',
    originalName: 'Deceptive Deduction',
    level: 8,
    archetypeId: 'archetype-twilight-talon',
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    description:
      'Você fica sabendo qual perícia a criatura usou para Recordar Conhecimento e se ela é treinada. Se for, pode usar Enganação para Recordar Conhecimento como se fosse essa perícia por 1 minuto.',
    actionType: 'reaction',
    trigger: 'Uma criatura que você pode ver usa Recordar Conhecimento.',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8862',
  }),
  f({
    id: 'feat-twilight-talon-hidden-intentions',
    name: 'Intenções Ocultas',
    originalName: 'Hidden Intentions',
    level: 10,
    archetypeId: 'archetype-twilight-talon',
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    description:
      'Ganha os feitos de perícia Linguagem Dupla e Segredos Escorregadios. Na primeira rodada, se rolar Enganação na iniciativa, criaturas que ainda não agiram ficam desprevenidas contra você.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Linguagem Dupla e Segredos Escorregadios',
        description:
          'Ganha esses feitos de perícia. 1ª rodada com Enganação na iniciativa: quem ainda não agiu fica desprevenido contra você.',
      },
    ],
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8863',
  }),
  f({
    id: 'feat-twilight-talon-inked-cache',
    name: 'Esconderijo Tatuado',
    originalName: 'Inked Cache',
    level: 10,
    archetypeId: 'archetype-twilight-talon',
    prereqId: 'feat-twilight-talon-talons-mark',
    prereqName: 'Marca da Garra',
    description:
      'A tatuagem sobe para nível 10 (se já não for maior) e ganha as habilidades de um cinto de recuperação maior. Ao ativar Guardar Item, pode testar Enganação contra as CDs de Percepção de quem o observa; sucesso: a criatura não nota.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Cinto de recuperação maior (tatuagem)',
        description: 'Nível 10+. Guardar Item pode passar despercebido com Enganação vs Percepção.',
      },
    ],
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8864',
  }),
  f({
    id: 'feat-twilight-talon-predictive-purchase',
    name: 'Compra Preditiva',
    originalName: 'Predictive Purchase',
    level: 10,
    archetypeId: 'archetype-twilight-talon',
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de investigador' }],
    description:
      'Ganha Planejador Previdente e Consumível Previdente. Com Planejador Previdente, pode sacar o item como atividade de 2 ações (tirar a mochila e sacar) em vez de 1 minuto.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Planejador Previdente e Consumível Previdente',
        description: 'Sacar como 2 ações (mochila) em vez de 1 minuto.',
      },
    ],
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5953',
  }),
  f({
    id: 'feat-twilight-talon-feign-innocence',
    name: 'Fingir Inocência',
    originalName: 'Feign Innocence',
    level: 12,
    archetypeId: 'archetype-twilight-talon',
    traits: ['Arquétipo', 'Auditivo', 'Concentração', 'Linguístico', 'Mental'],
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    description:
      'Inimigo a 18 m: Enganação vs CD de Vontade. Imune 1 hora. Ação hostil contra ele nesta rodada: o resultado não pode ser melhor que falha. Crítico: aliados até o fim do próximo turno ou até ação hostil; para agir hostilmente contra você, Vontade vs CD de Enganação ou perde a ação. Sucesso: até o fim do seu turno. Falha crítica: você fica desprevenido contra o alvo até o início do seu próximo turno.',
    actionType: 'one',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8865',
  }),
  f({
    id: 'feat-twilight-talon-instant-credentials',
    name: 'Credenciais Instantâneas',
    originalName: 'Instant Credentials',
    level: 14,
    archetypeId: 'archetype-twilight-talon',
    prereqId: 'feat-twilight-talon-talons-mark',
    prereqName: 'Marca da Garra',
    extraPrereq: [{ kind: 'text', label: 'Página em branco' }],
    description:
      'Criar uma Falsificação como ação única (concentração, oculto). Dura 1 minuto; nesse tempo não usa as outras habilidades da Marca da Garra. Pode Dispensar (a página volta em branco).',
    actionType: 'one',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8866',
  }),
  f({
    id: 'feat-twilight-talon-blank-slate',
    name: 'Lousa em Branco',
    originalName: 'Blank Slate',
    level: 18,
    archetypeId: 'archetype-twilight-talon',
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'legendary' },
      { kind: 'text', label: 'Lendário em Enganação; feito adicional de ladino' },
    ],
    description:
      'Efeitos de detecção, revelação e vidência passam por você, seus itens e auras, sem detectar nada, salvo se o efeito tiver posto de contraposição 10 ou maior.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Imune a detecção menor que posto 10',
        description: 'Detecção, revelação e vidência ignoram você salvo contraposição 10+.',
      },
    ],
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4979',
  }),
  f({
    id: 'feat-twilight-talon-burn-identity',
    name: 'Queimar Identidade',
    originalName: 'Burn Identity',
    level: 18,
    archetypeId: 'archetype-twilight-talon',
    traits: ['Arquétipo', 'Concentração', 'Oculto', 'Teleporte'],
    prereqId: DED_TT.id,
    prereqName: DED_TT.name,
    description:
      'Transporte até 1,5 km (como translocar de 5º posto). Quem o viu nas últimas 24 horas faz Vontade contra a maior entre CD de classe e CD de magia ou esquece sua aparência (como reescrever memória de 6º posto). Pode isentar criaturas. Como atividade de 10 minutos: em vez de translocar, teleporta você e até 4 alvos tocados (voluntários ou objetos do tamanho de uma criatura) até a fronteira mais próxima de Andoran, além dos outros efeitos.',
    actionType: 'two',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8867',
  }),
  f({
    id: 'feat-twilight-talon-implausible-purchase',
    name: 'Compra Implausível',
    originalName: 'Implausible Purchase',
    level: 18,
    archetypeId: 'archetype-twilight-talon',
    prereqId: 'feat-twilight-talon-predictive-purchase',
    prereqName: 'Compra Preditiva',
    extraPrereq: [{ kind: 'text', label: 'Feito adicional de investigador' }],
    description:
      'Pode usar Planejador Previdente mesmo depois de já ter usado após comprar bens, como ação única (Interaja para sacar). 5 vezes por dia, pode sacar um consumível comum de até 6 níveis abaixo do seu.',
    sourcePage: 37,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5971',
  }),
]

const starstoneAspirantArchetypeFeats: Feat[] = [
  f({
    id: DED_SA.id,
    name: DED_SA.name,
    originalName: 'Starstone Aspirant Dedication',
    level: 2,
    archetypeId: 'archetype-starstone-aspirant',
    isDedication: true,
    rarity: 'uncommon',
    description:
      'Nas preparações diárias, escolha uma perícia em que esteja destreinado. Pode tentar ações que exigem treino nessa perícia e ganha +1 de circunstância nos testes até as próximas preparações (+2 no 8º nível, +3 no 15º). Você escolhe a perícia cada dia; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Perícia destreinada do dia',
        description:
          'Nas preparações, escolha uma perícia destreinada: ações de treino e +1 de circunstância (+2 no 8º, +3 no 15º) até as próximas preparações. Você escolhe cada dia; o motor não escolhe.',
      },
    ],
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8877',
  }),
  f({
    id: 'feat-starstone-aspirant-for-the-fallen',
    name: 'Pelos Caídos!',
    originalName: 'For the Fallen!',
    level: 4,
    archetypeId: 'archetype-starstone-aspirant',
    traits: ['Arquétipo', 'Ímpeto', 'Pressão'],
    prereqId: DED_SA.id,
    prereqName: DED_SA.name,
    description: 'Dê um Passo e então Golpeie.',
    actionType: 'one',
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8878',
  }),
  f({
    id: 'feat-starstone-aspirant-minor-deific-power',
    name: 'Poder Deífico Menor',
    originalName: 'Minor Deific Power',
    level: 4,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: DED_SA.id,
    prereqName: DED_SA.name,
    description:
      'Escolha um truque divino comum e uma magia divina comum de 1º posto. O truque como inata divina à vontade; a de 1º posto como inata divina 1/dia. Você escolhe as magias; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magias inatas menores',
        description: 'Escolher magias: 1 truque divino comum à vontade e 1 magia divina comum de 1º posto 1/dia. O motor não escolhe.',
      },
    ],
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8879',
  }),
  f({
    id: 'feat-starstone-aspirant-norgorbers-secret',
    name: 'Segredo de Norgorber',
    originalName: "Norgorber's Secret",
    level: 4,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: DED_SA.id,
    prereqName: DED_SA.name,
    description:
      'Resistência mental igual à metade do nível. +2 de circunstância em salvaguardas contra efeitos que tentam ler sua mente ou discernir sua localização.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'salvaguardas vs leitura da mente ou discernir localização',
      },
      {
        kind: 'specialAbility',
        name: 'Resistência mental (metade do nível)',
        description: 'Resistência a dano mental igual à metade do seu nível.',
      },
    ],
    sourcePage: 48,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8880',
  }),
  f({
    id: 'feat-starstone-aspirant-caydens-freedom',
    name: 'Liberdade de Cayden',
    originalName: "Cayden's Freedom",
    level: 6,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: DED_SA.id,
    prereqName: DED_SA.name,
    description:
      '+2 de circunstância na CD de Fortitude contra Agarrar ou Engolir Inteiro. Ganha Libertar-se: 1 ação; tente Escapar rolando duas vezes e use o melhor resultado.',
    effects: [
      {
        kind: 'circumstanceBonus',
        value: 2,
        appliesTo: 'CD de Fortitude vs Agarrar ou Engolir Inteiro',
      },
      {
        kind: 'specialAbility',
        name: 'Libertar-se',
        description: 'Tente Escapar rolando duas vezes e use o melhor.',
        actionType: 'one',
      },
    ],
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8881',
  }),
  f({
    id: 'feat-starstone-aspirant-iomedaes-valor',
    name: 'Valor de Iomedae',
    originalName: "Iomedae's Valor",
    level: 6,
    archetypeId: 'archetype-starstone-aspirant',
    traits: ['Arquétipo', 'Divino'],
    prereqId: DED_SA.id,
    prereqName: DED_SA.name,
    description:
      'Evita desmaio e permanece com 1 PV. Ganha PV temporários iguais ao nível (1 minuto) e +1 de status na CA por 1 rodada.',
    actionType: 'reaction',
    frequency: '1/dia',
    trigger: 'Você seria reduzido a 0 PV, mas não morto imediatamente.',
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8882',
  }),
  f({
    id: 'feat-starstone-aspirant-advanced-deific-power',
    name: 'Poder Deífico Avançado',
    originalName: 'Advanced Deific Power',
    level: 8,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: 'feat-starstone-aspirant-minor-deific-power',
    prereqName: 'Poder Deífico Menor',
    description:
      'Escolha duas magias divinas comuns, uma de 2º posto e uma de 3º. Cada uma como inata divina 1/dia. Você escolhe as magias; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magias inatas avançadas',
        description: 'Escolher magias: 1 divina comum de 2º posto e 1 de 3º posto, cada uma 1/dia. O motor não escolhe.',
      },
    ],
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8883',
  }),
  f({
    id: 'feat-starstone-aspirant-arodens-innovation',
    name: 'Inovação de Aroden',
    originalName: "Aroden's Innovation",
    level: 8,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: DED_SA.id,
    prereqName: DED_SA.name,
    description:
      'Nas preparações diárias, escolha um feito geral de 3º nível ou menor. Se cumprir os pré-requisitos, ganha os benefícios até as próximas preparações. Você escolhe o feito cada dia; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Feito geral do dia',
        description:
          'Nas preparações, escolha um feito geral de 3º nível ou menor cujos pré-requisitos você cumpra. Dura até as próximas preparações. O motor não escolhe.',
      },
    ],
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8884',
  }),
  f({
    id: 'feat-starstone-aspirant-gather-disciples',
    name: 'Reunir Discípulos',
    originalName: 'Gather Disciples',
    level: 10,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: DED_SA.id,
    prereqName: DED_SA.name,
    description:
      '1 semana de descanso num povoado para estabelecer um grupo de discípulos (sempre prestativos). Pode Pedir com Religião (pedidos viáveis para esse tipo de gente, MJ). Crítico: conselho ou pequeno segredo (+2 de circunstância no primeiro teste de perícia ao agir no favor, você ou um aliado). Falha crítica: a atitude não piora. Até 3 grupos (5 se for lendário em Religião); o mais antigo se dissolve se exceder.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Grupos de discípulos',
        description:
          'Até 3 grupos (5 se lendário em Religião), sempre prestativos. Pedir com Religião. Crítico: +2 de circunstância no primeiro teste ao agir no favor.',
      },
    ],
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8885',
  }),
  f({
    id: 'feat-starstone-aspirant-greater-deific-power',
    name: 'Poder Deífico Superior',
    originalName: 'Greater Deific Power',
    level: 12,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: 'feat-starstone-aspirant-advanced-deific-power',
    prereqName: 'Poder Deífico Avançado',
    description:
      'Escolha duas magias divinas comuns, uma de 4º posto e uma de 5º. Cada uma como inata divina 1/dia. Você escolhe as magias; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magias inatas superiores',
        description: 'Escolher magias: 1 divina comum de 4º posto e 1 de 5º posto, cada uma 1/dia. O motor não escolhe.',
      },
    ],
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8886',
  }),
  f({
    id: 'feat-starstone-aspirant-major-deific-power',
    name: 'Poder Deífico Supremo',
    originalName: 'Major Deific Power',
    level: 18,
    archetypeId: 'archetype-starstone-aspirant',
    prereqId: 'feat-starstone-aspirant-greater-deific-power',
    prereqName: 'Poder Deífico Superior',
    description:
      'Escolha três magias divinas comuns, uma de 6º, uma de 7º e uma de 8º posto. Cada uma como inata divina 1/dia. Você escolhe as magias; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Magias inatas supremas',
        description:
          'Escolher magias: 1 divina comum de 6º, 1 de 7º e 1 de 8º posto, cada uma 1/dia. O motor não escolhe.',
      },
    ],
    sourcePage: 49,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=8887',
  }),
]

export const archetypeFeatsGeneralRemaster19: Feat[] = [
  ...hellknightArchetypeFeats,
  ...goldenLegionnaireArchetypeFeats,
  ...steelFalconArchetypeFeats,
  ...twilightTalonArchetypeFeats,
  ...starstoneAspirantArchetypeFeats,
]
