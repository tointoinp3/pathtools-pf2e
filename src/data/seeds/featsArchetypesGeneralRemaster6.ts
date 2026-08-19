/** Gerais Remaster: Sentinela, Armadilheiro, Talismaneiro, Vigilante, Improvisador de Armas. Sem Legacy. */
import type { Feat } from '@/types/feat'
import { SOURCE_PLAYER_CORE_2_ID, SOURCE_PLAYER_CORE_ID } from './sources'

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
    rarity: 'common',
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
    sourceId: opts.sourceId ?? SOURCE_PLAYER_CORE_2_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const DED_SEN = { id: 'feat-sentinel-dedication', name: 'Dedicação de Sentinela' }
const DED_SNA = { id: 'feat-snarecrafter-dedication', name: 'Dedicação de Armadilheiro' }
const DED_TAL = { id: 'feat-talisman-dabbler-dedication', name: 'Dedicação de Talismaneiro' }
const DED_VIG = { id: 'feat-vigilante-dedication', name: 'Dedicação de Vigilante' }
const DED_WIM = {
  id: 'feat-weapon-improviser-dedication',
  name: 'Dedicação de Improvisador de Armas',
}

const sentinelArchetypeFeats: Feat[] = [
  f({
    id: DED_SEN.id,
    name: DED_SEN.name,
    originalName: 'Sentinel Dedication',
    level: 2,
    archetypeId: 'archetype-sentinel',
    isDedication: true,
    description:
      'Fica treinado em armadura leve e média. Se já era treinado nas duas, também fica treinado em pesada. Quando um recurso de classe conceder perito ou melhor em qualquer tipo de armadura (não defesa sem armadura), você também ganha esse posto nas armaduras deste feito. Se tiver perito em defesa sem armadura e for 13º+, também fica perito nas armaduras deste feito.',
    effects: [
      { kind: 'defenseRank', categories: ['light', 'medium'], rank: 'trained' },
      {
        kind: 'defenseRankIfAlready',
        check: ['light', 'medium'],
        then: { categories: ['heavy'], rank: 'trained' },
      },
      {
        kind: 'specialAbility',
        name: 'Armadura acompanhada',
        description:
          'Perito+ de classe em armadura também vale para as armaduras desta Dedicação. Perito sem armadura no 13º+: perito nessas armaduras.',
      },
    ],
    sourcePage: 215,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=264',
  }),
  f({
    id: 'feat-sentinel-steel-skin',
    name: 'Pele de Aço',
    originalName: 'Steel Skin',
    level: 4,
    archetypeId: 'archetype-sentinel',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'survival', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Sobrevivência' },
    ],
    description: 'Não fica fatigado se dormir vestindo armadura.',
    allowedSlotKinds: ['skill'],
    sourcePage: 215,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6410',
  }),
  f({
    id: 'feat-sentinel-armor-specialist',
    name: 'Especialista em Armadura',
    originalName: 'Armor Specialist',
    level: 6,
    archetypeId: 'archetype-sentinel',
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'Ganha os efeitos de especialização de armadura para todas as armaduras em que for proficiente.',
    sourcePage: 215,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=264',
  }),
  f({
    id: 'feat-sentinel-armored-rebuff',
    name: 'Rechaço Encouraçado',
    originalName: 'Armored Rebuff',
    level: 8,
    archetypeId: 'archetype-sentinel',
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    extraPrereq: [{ kind: 'text', label: 'Vestindo armadura média ou mais pesada' }],
    description:
      'Tente Empurrar o inimigo disparador, mesmo sem mão livre. Sucesso: não pode Deslocar-se para segui-lo.',
    actionType: 'reaction',
    trigger:
      'Um inimigo adjacente falha criticamente um Golpe corpo a corpo (arma ou desarmado) contra você.',
    sourcePage: 215,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6412',
  }),
  f({
    id: 'feat-sentinel-mighty-bulwark',
    name: 'Baluarte Poderoso',
    originalName: 'Mighty Bulwark',
    level: 10,
    archetypeId: 'archetype-sentinel',
    prereqId: DED_SEN.id,
    prereqName: DED_SEN.name,
    description:
      'O bônus do traço baluarte da armadura sobe de +3 para +4 e vale em todos os testes de Reflexos, não só os que causam dano.',
    sourcePage: 215,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=264',
  }),
]

const snarecrafterArchetypeFeats: Feat[] = [
  f({
    id: DED_SNA.id,
    name: DED_SNA.name,
    originalName: 'Snarecrafter Dedication',
    level: 2,
    archetypeId: 'archetype-snarecrafter',
    isDedication: true,
    description:
      'Ganha Criação de Armadilhas. A CD de salvaguarda da armadilha usa a maior entre sua CD de classe e a CD da armadilha. Armadilha de 1 minuto: 3 ações Interagir. Nas preparações, prepare 4 armadilhas do livro para implantação rápida (6 se mestre em Ofício, 8 se lendário), sem custo. Ao subir Ofício para perito, mestre ou lendário, adicione 3 fórmulas de armadilha de seu nível ou menor. Patrulheiro: pode usar Sobrevivência no lugar de Ofício em tudo deste arquétipo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Criação de Armadilhas',
        description:
          'Ganha o feito Criação de Armadilhas (4 fórmulas comuns de 1º). 4 armadilhas rápidas por dia (6 mestre / 8 lendário). CD = maior entre CD de classe e da armadilha.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ofício (patrulheiro pode usar Sobrevivência)' },
    ],
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-brastlewark-snare-engineering',
    name: 'Engenharia de Armadilhas de Brastlewark',
    originalName: 'Brastlewark Snare Engineering',
    level: 4,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Aprende as fórmulas de Armadilha de Ilusão de Fosso e Manto de Sombras, ou duas armadilhas mágicas incomuns de seu nível ou menor às quais tem acesso (você escolhe). Armadilha mágica: CD de save usa sua CD de magia se for maior. Ao criar armadilha não mágica, pode dar o traço mágico: se causar dano, + dano de força igual ao nível da armadilha.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Armadilhas mágicas',
        description:
          'Escolha Ilusão de Fosso + Manto de Sombras, ou duas armadilhas mágicas incomuns. O motor não escolhe.',
      },
    ],
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-surprise-snare',
    name: 'Armadilha Surpresa',
    originalName: 'Surprise Snare',
    level: 4,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Instale uma armadilha preparada num espaço ocupado por um inimigo (armadilha de 1 minuto ou menos). Ela dispara automaticamente.',
    actionType: 'three',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-barricade-snare',
    name: 'Armadilha-Barricada',
    originalName: 'Barricade Snare',
    level: 6,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Ao preparar armadilhas rápidas, algumas podem ser barricadas (custam 2). A barricada é visível; a armadilha escondida usa CD +2 de circunstância. 1,5 m de altura, cobertura padrão, Escalar CD 12, CA 10, Dureza 5, 20 PV, imune a crítico e precisão. Dispara ao Escalar ou ao ser atacada com sucesso por adjacente. Mesmo com Armadilha Surpresa, só em quadrado vazio.',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-remote-trigger',
    name: 'Gatilho Remoto',
    originalName: 'Remote Trigger',
    level: 6,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Pode Golpear uma armadilha para dispará-la. Se você a criou, acerta automaticamente. Se outro criou, Golpe à distância contra a CD de Ofício; só dispara se acertar.',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-remote-detonation',
    name: 'Detonação Remota',
    originalName: 'Remote Detonation',
    level: 8,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Escolha uma armadilha mágica sua a até 36 m. Ela é destruída; criaturas numa emanação de 1,5 m sofrem 1d6 de força por nível da armadilha, Reflexos básico contra a maior entre CD de classe e CD de magia. Se for larga ou gigante, escolha um quadrado como centro.',
    actionType: 'one',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-broad-snare',
    name: 'Armadilha Larga',
    originalName: 'Broad Snare',
    level: 10,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Ao preparar rápidas, algumas podem ser largas: linha de 6 m a partir do quadrado (custam 2). Dispara de qualquer parte da área; efeitos na área inteira.',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-giant-snare',
    name: 'Armadilha Gigante',
    originalName: 'Giant Snare',
    level: 10,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Ao preparar rápidas, algumas podem ser gigantes: 3 m × 3 m (custam 2). Dispara de qualquer parte da área; efeitos na área inteira.',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-lightning-snares',
    name: 'Armadilhas Relâmpago',
    originalName: 'Lightning Snares',
    level: 12,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'master' },
      { kind: 'text', label: 'Mestre em Ofício' },
    ],
    description:
      'Armadilha que normalmente leva 1 minuto: 1 ação Interagir em vez de 3.',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6418',
  }),
  f({
    id: 'feat-snarecrafter-plentiful-snares',
    name: 'Armadilhas Abundantes',
    originalName: 'Plentiful Snares',
    level: 12,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description: 'Dobra o número de armadilhas preparadas da Dedicação.',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
  f({
    id: 'feat-snarecrafter-domino-effect',
    name: 'Efeito Dominó',
    originalName: 'Domino Effect',
    level: 14,
    archetypeId: 'archetype-snarecrafter',
    prereqId: DED_SNA.id,
    prereqName: DED_SNA.name,
    description:
      'Uma criatura à sua escolha a até 4,5 m da criatura disparadora é afetada pela mesma armadilha como se também a tivesse disparado. Você escolhe o alvo.',
    actionType: 'reaction',
    trigger: 'Uma criatura dispara uma armadilha que você criou.',
    sourcePage: 216,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=265',
  }),
]

const talismanDabblerArchetypeFeats: Feat[] = [
  f({
    id: DED_TAL.id,
    name: DED_TAL.name,
    originalName: 'Talisman Dabbler Dedication',
    level: 2,
    archetypeId: 'archetype-talisman-dabbler',
    isDedication: true,
    description:
      'Pode fabricar talismãs e conhece as fórmulas de todos os talismãs comuns de seu nível ou menor (sem livro). Nas preparações, crie dois talismãs temporários de nível no máximo metade do seu (precisa conhecer a fórmula). Perdem a magia na próxima preparação. CD de save: a maior entre CD de classe, CD de magia e CD do talismã. Ao Afixar um Talismã, pode afixar ou remover até quatro no intervalo de 10 minutos. Você escolhe quais talismãs criar.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Talismãs temporários',
        description:
          '2 talismãs temporários por dia (nível ≤ metade do seu). Afixar/remover até 4 em 10 minutos. Você escolhe os tipos.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'crafting', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Ofício' },
    ],
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=266',
  }),
  f({
    id: 'feat-talisman-dabbler-quick-fix',
    name: 'Conserto Rápido',
    originalName: 'Quick Fix',
    level: 4,
    archetypeId: 'archetype-talisman-dabbler',
    prereqId: DED_TAL.id,
    prereqName: DED_TAL.name,
    description:
      'Ganha Afixação Rápida mesmo sem os pré-requisitos. Com ela, afixa ou remove até quatro talismãs em 1 minuto. No 12º, ganha Afixar um Talismã como atividade de 3 ações, independente do posto em Ofício.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Afixação Rápida',
        description:
          'Ganha o feito Afixação Rápida: até 4 talismãs em 1 minuto. No 12º, Afixar como 3 ações.',
      },
    ],
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=266',
  }),
  f({
    id: 'feat-talisman-dabbler-deeper-dabbler',
    name: 'Diletantismo Mais Fundo',
    originalName: 'Deeper Dabbler',
    level: 8,
    archetypeId: 'archetype-talisman-dabbler',
    prereqId: DED_TAL.id,
    prereqName: DED_TAL.name,
    description:
      'Crie dois talismãs a mais nas preparações. Especial: pode pegar de novo no 14º ou mais. Você decide se pega de novo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Mais talismãs',
        description: '+2 talismãs temporários por dia (+4 se pegar este feito de novo no 14º+).',
      },
    ],
    repeatable: true,
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=266',
  }),
  f({
    id: 'feat-talisman-dabbler-talismanic-sage',
    name: 'Sábio Talismânico',
    originalName: 'Talismanic Sage',
    level: 14,
    archetypeId: 'archetype-talisman-dabbler',
    prereqId: DED_TAL.id,
    prereqName: DED_TAL.name,
    description:
      'Ao Afixar um Talismã, pode tratar um item para ter dois talismãs ativos ao mesmo tempo. O tratamento acaba se você tratar um item novo.',
    sourcePage: 217,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=266',
  }),
]

const vigilanteArchetypeFeats: Feat[] = [
  f({
    id: DED_VIG.id,
    name: DED_VIG.name,
    originalName: 'Vigilante Dedication',
    level: 2,
    archetypeId: 'archetype-vigilante',
    isDedication: true,
    description:
      'Duas identidades (social e vigilante), cada uma com nome próprio. Para descobrir a outra, o outro usa Buscar (Percepção contra sua CD de Enganação); a CD é 20 + modificador de proficiência. Trocar de identidade: 1 minuto, fora da vista. Feitos de classe e de vigilante ligados à identidade vigilante podem expô-lo se usados na social. Identidade exposta: perde o benefício de disfarce até 1 semana de intervalo para criar nova identidade social. Você nomeia as duas identidades; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Duas identidades',
        description:
          'Identidade social e vigilante. CD para descobrir: 20 + proficiência de Enganação. Troca em 1 minuto. Nomeie as duas.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Enganação' },
    ],
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-hidden-magic',
    name: 'Magia Oculta',
    originalName: 'Hidden Magic',
    level: 4,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    description:
      'Nas preparações, ajuste itens mágicos para parecerem não mágicos até a próxima preparação. Detectar magia ou Ler aura: Percepção contra sua CD de Enganação para ver através.',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-minion-guise',
    name: 'Disfarce de Lacaio',
    originalName: 'Minion Guise',
    level: 4,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    description:
      'Na identidade social, também dá identidade social a um companheiro animal, familiar, mascote ou lacaio de classe/feito. Comandar habilidades incomuns nessa identidade pode expor o vigilante.',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-quick-draw',
    name: 'Saque Rápido',
    originalName: 'Quick Draw',
    level: 4,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    description: 'Interaja para sacar uma arma e então Golpeie com ela.',
    actionType: 'one',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-safe-house',
    name: 'Esconderijo',
    originalName: 'Safe House',
    level: 4,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    description:
      'Espaço seguro de dois cubos de 3 m, num local a que você tem acesso. Protege contra detecção mágica (véu de privacidade; CD de anulação = Enganação, posto = metade do nível). Montar ou mudar: 1 semana de intervalo. Tamanho: 4 cubos se perito em Enganação, 8 mestre, 16 lendário.',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-social-purview',
    name: 'Âmbito Social',
    originalName: 'Social Purview',
    level: 4,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    description:
      'Escolha um arquétipo cujos pré-requisitos você cumpra. Ganha a Dedicação dele e pode pegar feitos desse arquétipo mesmo sem ter dois feitos de vigilante. Esses feitos fazem parte da identidade social — usá-los nela não expõe o vigilante; usá-los na identidade vigilante pode expor. Você escolhe o arquétipo; o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Arquétipo da identidade social',
        description:
          'Escolha outro arquétipo e pegue a Dedicação dele como parte da identidade social. Anote a escolha na ficha.',
      },
    ],
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-startling-appearance',
    name: 'Aparição Assustadora',
    originalName: 'Startling Appearance',
    level: 6,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    description:
      'Golpe contra o alvo (desprevenido, como o normal se não o observava). Se acertar, ele permanece desprevenido pelo resto do seu turno e fica amedrontado 1 (2 no crítico).',
    actionType: 'one',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-quick-change',
    name: 'Troca Rápida',
    originalName: 'Quick Change',
    level: 7,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'expert' },
      { kind: 'text', label: 'Perito em Enganação' },
    ],
    description:
      'Trocar de identidade vira atividade de 3 ações. Se for lendário em Enganação, 1 ação.',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-subjective-truth',
    name: 'Verdade Subjetiva',
    originalName: 'Subjective Truth',
    level: 7,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'expert' },
      { kind: 'text', label: 'Perito em Enganação' },
    ],
    description:
      'Enquanto o que você diz for verdade do ponto de vista da identidade atual, engana efeitos que revelam mentiras (ex.: anel da verdade).',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-many-guises',
    name: 'Muitos Disfarces',
    originalName: 'Many Guises',
    level: 8,
    archetypeId: 'archetype-vigilante',
    prereqId: DED_VIG.id,
    prereqName: DED_VIG.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'master' },
      { kind: 'text', label: 'Mestre em Enganação' },
    ],
    description:
      'Ao trocar de identidade, pode virar alguém mundano genérico da sua ancestralidade, de qualquer gênero e ofício comum. Magias e habilidades detectam essa identidade, salvo anulação contra a mesma CD de Enganação da Dedicação. Usar habilidades de classe ou Dedicação encerra o disfarce.',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-frightening-appearance',
    name: 'Aparição Aterradora',
    originalName: 'Frightening Appearance',
    level: 12,
    archetypeId: 'archetype-vigilante',
    prereqId: 'feat-vigilante-startling-appearance',
    prereqName: 'Aparição Assustadora',
    description:
      'Ao usar Aparição Assustadora, também tente Desmoralizar cada inimigo numa emanação de 3 m que não o tinha notado antes do Golpe.',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
  f({
    id: 'feat-vigilante-stunning-appearance',
    name: 'Aparição Estonteante',
    originalName: 'Stunning Appearance',
    level: 16,
    archetypeId: 'archetype-vigilante',
    prereqId: 'feat-vigilante-startling-appearance',
    prereqName: 'Aparição Assustadora',
    description:
      'Ao usar Aparição Assustadora e acertar um inimigo de seu nível ou menor, ele também fica atordoado 1 (2 no crítico).',
    sourcePage: 218,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=267',
  }),
]

const weaponImproviserArchetypeFeats: Feat[] = [
  f({
    id: DED_WIM.id,
    name: DED_WIM.name,
    originalName: 'Weapon Improviser Dedication',
    level: 2,
    archetypeId: 'archetype-weapon-improviser',
    isDedication: true,
    description:
      'Não sofre a penalidade de −2 em ataques com armas improvisadas. Armas improvisadas têm dado mínimo 1d6, ou 1d4 se forem ágeis.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Armas improvisadas',
        description: 'Sem −2. Dado mínimo 1d6 (1d4 se ágil).',
      },
    ],
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=269',
  }),
  f({
    id: 'feat-weapon-improviser-improvised-pummel',
    name: 'Pancada Improvisada',
    originalName: 'Improvised Pummel',
    level: 4,
    archetypeId: 'archetype-weapon-improviser',
    prereqId: DED_WIM.id,
    prereqName: DED_WIM.name,
    description:
      'Golpe com arma improvisada: +1 de item no ataque e pode causar dois dados em vez do normal. Crítico: a arma quebra depois dos efeitos (salvo Dureza > seu nível, artefato, amaldiçoado etc. — aí o crítico vira acerto normal). Pode recusar o benefício para não arriscar. No 12º, +2 de item; no 16º, três dados. Mãos de golpes poderosos: use o bônus/dados delas se for melhor; runas de propriedade se os dados delas forem usados.',
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=269',
  }),
  f({
    id: 'feat-weapon-improviser-surprise-strike',
    name: 'Golpe Surpresa',
    originalName: 'Surprise Strike',
    level: 6,
    archetypeId: 'archetype-weapon-improviser',
    prereqId: DED_WIM.id,
    prereqName: DED_WIM.name,
    description:
      'Golpe com arma improvisada contra criatura que ainda não viu você Golpear com improvisada (ou ignora essa habilidade): ela fica desprevenida contra esse Golpe.',
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=269',
  }),
  f({
    id: 'feat-weapon-improviser-improvised-critical',
    name: 'Crítico Improvisado',
    originalName: 'Improvised Critical',
    level: 8,
    archetypeId: 'archetype-weapon-improviser',
    prereqId: DED_WIM.id,
    prereqName: DED_WIM.name,
    description:
      'Aplica especialização crítica em armas improvisadas. O MJ escolhe o efeito mais adequado ao objeto.',
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=269',
  }),
  f({
    id: 'feat-weapon-improviser-makeshift-strike',
    name: 'Golpe de Ocasião',
    originalName: 'Makeshift Strike',
    level: 8,
    archetypeId: 'archetype-weapon-improviser',
    prereqId: DED_WIM.id,
    prereqName: DED_WIM.name,
    description:
      'Interaja para pegar um objeto sem dono no alcance que sirva de arma improvisada e então Golpeie com ele.',
    actionType: 'one',
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=269',
  }),
  f({
    id: 'feat-weapon-improviser-shattering-strike',
    name: 'Golpe Estilhaçante',
    originalName: 'Shattering Strike',
    level: 10,
    archetypeId: 'archetype-weapon-improviser',
    prereqId: 'feat-weapon-improviser-improvised-pummel',
    prereqName: 'Pancada Improvisada',
    description:
      'A arma improvisada se destrói por completo e causa +3d6 de perfuração no alvo da Pancada Improvisada. Esse dano extra não dobra no crítico.',
    actionType: 'reaction',
    trigger:
      'Uma arma improvisada que você empunha quebra por sucesso crítico em Pancada Improvisada.',
    sourcePage: 221,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6445',
  }),
]

export const archetypeFeatsGeneralRemaster6: Feat[] = [
  ...sentinelArchetypeFeats,
  ...snarecrafterArchetypeFeats,
  ...talismanDabblerArchetypeFeats,
  ...vigilanteArchetypeFeats,
  ...weaponImproviserArchetypeFeats,
]
