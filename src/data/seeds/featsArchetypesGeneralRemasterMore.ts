/** Continuação dos gerais Remaster: Bastião, Senhor das Feras, Abençoado, Caçador de Recompensas, Cavalheiro, Celebridade, Dândi. */
import type { Feat } from '@/types/feat'
import {
  SOURCE_BATTLECRY_ID,
  SOURCE_HOWL_OF_THE_WILD_ID,
  SOURCE_PLAYER_CORE_2_ID,
  SOURCE_PLAYER_CORE_ID,
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
  sourcePage: number
  aonUrl: string
  sourceId?: string
  isDedication?: boolean
  allowedSlotKinds?: Feat['allowedSlotKinds']
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
    sourceId: opts.sourceId ?? SOURCE_PLAYER_CORE_2_ID,
    sourcePage: opts.sourcePage,
    aonUrl: opts.aonUrl,
  }
}

const BEAST_SPELL = {
  id: 'spellcasting-beastmaster-archetype',
  label: 'Magias de Senhor das Feras',
  style: 'focusOnly' as const,
  tradition: 'primal' as const,
  attributeId: 'charisma' as const,
  proficiencyRank: 'trained' as const,
  classOriginalName: 'Beastmaster',
  features: { focusPool: true },
}

const DED_BASTION = { id: 'feat-bastion-dedication', name: 'Dedicação de Bastião' }
const DED_BEAST = { id: 'feat-beastmaster-dedication', name: 'Dedicação de Senhor das Feras' }
const DED_BLESSED = { id: 'feat-blessed-one-dedication', name: 'Dedicação de Abençoado' }
const DED_BOUNTY = {
  id: 'feat-bounty-hunter-dedication',
  name: 'Dedicação de Caçador de Recompensas',
}
const DED_CAV = { id: 'feat-cavalier-dedication', name: 'Dedicação de Cavalheiro' }
const DED_CEL = { id: 'feat-celebrity-dedication', name: 'Dedicação de Celebridade' }
const DED_DANDY = { id: 'feat-dandy-dedication', name: 'Dedicação de Dândi' }

const bastionArchetypeFeats: Feat[] = [
  f({
    id: DED_BASTION.id,
    name: DED_BASTION.name,
    originalName: 'Bastion Dedication',
    level: 2,
    archetypeId: 'archetype-bastion',
    isDedication: true,
    description:
      'Você ganha o feito Escudo Reativo do guerreiro. Pré-requisito: Bloqueio com Escudo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Escudo Reativo',
        actionType: 'reaction',
        description:
          'Gatilho: um inimigo acerta você com um Golpe corpo a corpo. Você Levanta o Escudo, ganhando o bônus de circunstância na CA contra o ataque disparador (e depois, como normal).',
      },
    ],
    extraPrereq: [
      { kind: 'feat', featId: 'feat-shield-block-general', featName: 'Bloqueio com Escudo' },
      { kind: 'text', label: 'Bloqueio com Escudo' },
    ],
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-disarming-block',
    name: 'Bloqueio Desarmador',
    originalName: 'Disarming Block',
    level: 4,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    extraPrereq: [{ kind: 'text', label: 'Você acabou de usar Bloqueio com Escudo' }],
    description:
      'Tente Desarmar a criatura cuja arma você bloqueou, mesmo sem mão livre.',
    actionType: 'free',
    trigger: 'Você usa Bloqueio com Escudo contra um ataque com arma.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-nimble-shield-hand',
    name: 'Mão de Escudo Ágil',
    originalName: 'Nimble Shield Hand',
    level: 6,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    description:
      'A mão do escudo conta como livre para Interagir e pode segurar outro objeto (não uma arma). Não se aplica a escudo torre.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-shielded-stride',
    name: 'Avanço Encouraçado',
    originalName: 'Shielded Stride',
    level: 6,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    description:
      'Com o escudo erguido, Avance metade da Velocidade sem disparar reações ao movimento. Também vale para Voar ou Nadar se tiver esses deslocamentos.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-reflexive-shield',
    name: 'Escudo Reflexivo',
    originalName: 'Reflexive Shield',
    level: 8,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    description:
      'Ao Levantar o Escudo, o bônus de circunstância também vale para Reflexos. Dano de salvaguarda de Reflexos pode disparar Bloqueio com Escudo mesmo se não for físico.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-shield-warden',
    name: 'Guardião do Escudo',
    originalName: 'Shield Warden',
    level: 8,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    description:
      'Com o escudo erguido, use Bloqueio com Escudo quando um aliado adjacente for atacado; o escudo protege o aliado.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-destructive-block',
    name: 'Bloqueio Destrutivo',
    originalName: 'Destructive Block',
    level: 10,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    description:
      'Ao Bloquear com Escudo, pode reduzir o dano em você pelo dobro da Solidez; o escudo sofre o dobro do dano (antes da Solidez). Não funciona com escudo indestrutível.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-quick-shield-block',
    name: 'Bloqueio Rápido',
    originalName: 'Quick Shield Block',
    level: 10,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    description:
      'No início de cada turno, ganha uma reação extra só para Bloqueio com Escudo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Reação extra (Bloqueio com Escudo)',
        description: 'No início do turno, +1 reação somente para Bloqueio com Escudo.',
      },
    ],
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-mirror-shield',
    name: 'Escudo Espelhado',
    originalName: 'Mirror Shield',
    level: 12,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    extraPrereq: [{ kind: 'text', label: 'Escudo erguido' }],
    description:
      'Reflete a magia: ataque à distância com sua maior proficiência (ou ataque de magia se conjurar). Sucesso aplica o efeito de sucesso do ataque de magia do oponente contra ele (crítico se o seu ataque for crítico).',
    actionType: 'reaction',
    trigger:
      'Um oponente conjurando uma magia que tem você como alvo obtém falha crítica no ataque de magia contra sua CA.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 148,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4828',
  }),
  f({
    id: 'feat-bastion-shield-salvation',
    name: 'Salvação do Escudo',
    originalName: 'Shield Salvation',
    level: 12,
    archetypeId: 'archetype-bastion',
    prereqId: DED_BASTION.id,
    prereqName: DED_BASTION.name,
    description:
      'Se o escudo seria destruído no Bloqueio, permanece com 1 PV. Fica enfraquecido até você repará-lo nas preparações; não pode salvar o mesmo escudo de novo até lá.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
  f({
    id: 'feat-bastion-improved-reflexive-shield',
    name: 'Escudo Reflexivo Aprimorado',
    originalName: 'Improved Reflexive Shield',
    level: 18,
    archetypeId: 'archetype-bastion',
    prereqId: 'feat-bastion-reflexive-shield',
    prereqName: 'Escudo Reflexivo',
    description:
      'Ao usar Bloqueio com Escudo contra dano de Reflexos, aliados adjacentes que sofreriam dano da mesma salvaguarda também se beneficiam da redução.',
    sourcePage: 187,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=240',
  }),
]

const beastmasterArchetypeFeats: Feat[] = [
  f({
    id: DED_BEAST.id,
    name: DED_BEAST.name,
    originalName: 'Beastmaster Dedication',
    level: 2,
    archetypeId: 'archetype-beastmaster',
    isDedication: true,
    description:
      'Ganha um companheiro animal jovem. Pode ter um segundo companheiro (além do usual). Com mais de um, ganha Chamar Companheiro (1 minuto, troca o ativo). Magias de foco deste arquétipo são primevas (Carisma); ao ganhar a primeira, fica treinado em ataque e CD. Refoco: cuidar de um companheiro. Escolha o tipo do companheiro — o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro animal jovem',
        description:
          'Adicione o companheiro em Companheiros. Escolha o tipo. Com o segundo companheiro, ganha Chamar Companheiro.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Natureza' },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-additional-companion',
    name: 'Companheiro Adicional',
    originalName: 'Additional Companion',
    level: 4,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Outro companheiro animal jovem (lacaio) se junta a você. Máximo de 4 no total, de todas as fontes. Escolha o tipo — o motor não escolhe. Pode selecionar de novo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiro extra',
        description: 'Escolha outro tipo de companheiro jovem. Máximo 4 no total.',
      },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-animal-empathy',
    name: 'Empatia Animal',
    originalName: 'Animal Empathy',
    level: 4,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Pode usar Diplomacia para Causar Impressão em animais e fazer Pedidos muito simples.',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-initiate-warden',
    name: 'Guardião Iniciado',
    originalName: 'Initiate Warden',
    level: 4,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Escolha uma magia de guardião inicial (neste arquétipo: curar companheiro ou pele mágica, ou outra a que tenha acesso). Magias de guardião deste feito são magias de foco de senhor das feras. Pode selecionar de novo com outra magia. O motor não escolhe a magia.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: BEAST_SPELL },
      {
        kind: 'specialAbility',
        name: 'Magia de guardião inicial',
        description: 'Escolha curar companheiro, pele mágica ou outra inicial a que tenha acesso.',
      },
    ],
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4862',
  }),
  f({
    id: 'feat-beastmaster-mature-companion',
    name: 'Companheiro Maduro de Senhor das Feras',
    originalName: 'Mature Beastmaster Companion',
    level: 4,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Todos os seus companheiros animais ficam maduros. No encontro, mesmo sem Comandar um Animal, o ativo pode usar 1 ação no seu turno para Golpear ou Avançar (ou Cavar/Escalar/Voar/Nadar). Se o fizer, é tudo o que ele faz na rodada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Companheiros maduros',
        description: 'Avance o estágio dos companheiros para maduro na ficha. Independência de 1 ação.',
      },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-spirit-of-the-beast',
    name: 'Espírito da Fera',
    originalName: 'Spirit of the Beast',
    level: 4,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description: 'Ganha a magia de foco espírito da fera.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: BEAST_SPELL },
      {
        kind: 'specialAbility',
        name: 'Espírito da fera',
        description: 'Magia de foco: imbuir o companheiro com o aspecto de outro animal.',
      },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-advanced-warden',
    name: 'Guardião Avançado',
    originalName: 'Advanced Warden',
    level: 6,
    archetypeId: 'archetype-beastmaster',
    prereqId: 'feat-beastmaster-initiate-warden',
    prereqName: 'Guardião Iniciado',
    description:
      'Escolha uma magia de guardião avançada (ou outra a que tenha acesso). Pode selecionar de novo. O motor não escolhe.',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: BEAST_SPELL },
      {
        kind: 'specialAbility',
        name: 'Magia de guardião avançada',
        description: 'Escolha a magia avançada. O motor não escolhe.',
      },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-trance',
    name: 'Transe do Senhor das Feras',
    originalName: "Beastmaster's Trance",
    level: 6,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description: 'Ganha a magia de foco transe do senhor das feras (sentidos do companheiro).',
    effects: [
      { kind: 'focusPool', points: 1 },
      { kind: 'spellcasting', access: BEAST_SPELL },
      {
        kind: 'specialAbility',
        name: 'Transe do senhor das feras',
        description: 'Magia de foco: habita brevemente o corpo de um companheiro e compartilha os sentidos.',
      },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-bestial-protection',
    name: 'Proteção Bestial',
    originalName: 'Bestial Protection',
    level: 6,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Quando uma criatura adjacente ao companheiro e menor que ele o ataca, ela fica amedrontada 1.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-companions-cry',
    name: 'Grito do Companheiro',
    originalName: "Companion's Cry",
    level: 6,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Pode gastar 2 ações para Comandar um Animal; o companheiro usa uma ação extra.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-natures-precision',
    name: 'Precisão da Natureza',
    originalName: "Nature's Precision",
    level: 6,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Quando o companheiro Golpeia uma criatura desprevenida com ataque desarmado ágil ou finesse, +1d4 de precisão (2d4 se especializado). Soma com outra precisão.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-swift-guardian',
    name: 'Guardião Veloz',
    originalName: 'Swift Guardian',
    level: 6,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Usa Chamar Companheiro como ação livre. Com Liderar a Alcateia, troca um dos dois ativos.',
    actionType: 'free',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-tenacious-endurance',
    name: 'Resistência Tenaz',
    originalName: 'Tenacious Endurance',
    level: 6,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Quando um companheiro cai a 0 PV e não está ferido, pode permanecer com 1 PV e ficar ferido 1.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-incredible-companion',
    name: 'Companheiro Incrível de Senhor das Feras',
    originalName: 'Incredible Beastmaster Companion',
    level: 8,
    archetypeId: 'archetype-beastmaster',
    prereqId: 'feat-beastmaster-mature-companion',
    prereqName: 'Companheiro Maduro de Senhor das Feras',
    description:
      'Cada companheiro maduro vira ágil ou selvagem — você escolhe para cada um, inclusive os que amadurecerem depois. O motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ágil ou selvagem',
        description: 'Escolha ágil ou selvagem para cada companheiro. O motor não escolhe.',
      },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-pack-movement',
    name: 'Movimento da Alcateia',
    originalName: 'Pack Movement',
    level: 8,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Você e o companheiro Avançam. Se ambos terminarem ao alcance da mesma criatura, cada um faz um Golpe corpo a corpo. Pode Cavar/Escalar/Voar/Nadar se ambos tiverem o deslocamento.',
    actionType: 'two',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-bond',
    name: 'Vínculo do Senhor das Feras',
    originalName: 'Beastmaster Bond',
    level: 10,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Comunicação telepática com companheiros a até 30 m. Se for lendário em Natureza, em qualquer lugar do planeta.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-ferocious-charge',
    name: 'Investida Feroz',
    originalName: 'Ferocious Charge',
    level: 10,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [
      { kind: 'text', label: 'Companheiro com ataque desarmado de chifres, cabeça ou corno' },
    ],
    description:
      'O companheiro aprende Investida Feroz (2 ações): Avança até o dobro da Velocidade em linha reta e Golpeia com chifres/cabeça/corno. Se moveu 6 m, +1d8 (+2d8 se especializado).',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 66,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5428',
  }),
  f({
    id: 'feat-beastmaster-running-kick',
    name: 'Chute em Corrida',
    originalName: 'Running Kick',
    level: 10,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [
      { kind: 'text', label: 'Companheiro com ataque desarmado de pé, casco ou garra de ave' },
    ],
    description:
      'O companheiro aprende Chute em Corrida (2 ações): Avança até o dobro e Golpeia com pé/casco/garra em qualquer ponto. O movimento não dispara reações da criatura danificada.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5429',
  }),
  f({
    id: 'feat-beastmaster-sinking-jaws',
    name: 'Mandíbulas Cravadas',
    originalName: 'Sinking Jaws',
    level: 10,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [
      { kind: 'text', label: 'Companheiro com ataque desarmado de mandíbulas ou presas' },
    ],
    description:
      'O companheiro aprende Mandíbulas Cravadas (1 ação): o alvo agarrado/imobilizado pelas mandíbulas sofre perfuração igual ao nível do companheiro + modificador de Força.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5430',
  }),
  f({
    id: 'feat-beastmaster-sweeping-tail',
    name: 'Cauda Varredora',
    originalName: 'Sweeping Tail',
    level: 10,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [{ kind: 'text', label: 'Companheiro com ataque desarmado de cauda' }],
    description:
      'O companheiro aprende Cauda Varredora (2 ações): dois Golpes de cauda contra criaturas diferentes. Acerto empurra 1,5 m (3 m no crítico). Movimento forçado.',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5431',
  }),
  f({
    id: 'feat-beastmaster-vicious-rend',
    name: 'Rasgo Cruel',
    originalName: 'Vicious Rend',
    level: 10,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [
      { kind: 'text', label: 'Companheiro com ataque desarmado de garra, punho, pinça ou garra de ave' },
    ],
    description:
      'O companheiro aprende Rasgo Cruel (2 ações): dois Golpes no mesmo alvo. Se ambos acertarem, +1d6 de sangramento persistente (2d6 se especializado).',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5432',
  }),
  f({
    id: 'feat-beastmaster-call',
    name: 'Chamado do Senhor das Feras',
    originalName: "Beastmaster's Call",
    level: 12,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Projeção primal de um companheiro inativo a até 9 m concede o benefício de apoio e some no início do seu próximo turno (ou se sofrer dano).',
    actionType: 'one',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-billowing-wings',
    name: 'Asas Infladas',
    originalName: 'Billowing Wings',
    level: 12,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Companheiros com asas ganham ataque desarmado à distância lufada (1d4 concussão, 9 m, ar e propulsivo). Crítico empurra 1,5 m.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-side-by-side',
    name: 'Lado a Lado',
    originalName: 'Side by Side',
    level: 14,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Quando você e o companheiro estão adjacentes ao mesmo inimigo, ambos o flanqueiam, independentemente das posições.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-specialized-companion',
    name: 'Companheiro Especializado de Senhor das Feras',
    originalName: 'Specialized Beastmaster Companion',
    level: 14,
    archetypeId: 'archetype-beastmaster',
    prereqId: 'feat-beastmaster-incredible-companion',
    prereqName: 'Companheiro Incrível de Senhor das Feras',
    description:
      'Cada companheiro ágil/selvagem ganha uma especialização à escolha (você escolhe para cada um). Pode selecionar de novo; máximo 3 especializações cada. O motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Especialização de companheiro',
        description: 'Escolha a especialização de cada companheiro. O motor não escolhe.',
      },
    ],
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-lead-the-pack',
    name: 'Liderar a Alcateia',
    originalName: 'Lead the Pack',
    level: 16,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    extraPrereq: [{ kind: 'text', label: 'Você tem ao menos dois companheiros animais' }],
    description:
      'Até dois companheiros ativos. Sem Comandar, um deles (você escolhe) pode usar 1 ação para Avançar ou Golpear. Ao Comandar, um faz 2 ações ou cada um faz 1 (Avançar ou Golpear). Não comanda de novo até o próximo turno.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-heightened-instincts',
    name: 'Instintos Aguçados',
    originalName: 'Heightened Instincts',
    level: 18,
    archetypeId: 'archetype-beastmaster',
    prereqId: DED_BEAST.id,
    prereqName: DED_BEAST.name,
    description:
      'Quando um companheiro obtém sucesso em salvaguarda, vira sucesso crítico.',
    sourcePage: 188,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=241',
  }),
  f({
    id: 'feat-beastmaster-pack-takedown',
    name: 'Derrubada da Alcateia',
    originalName: 'Pack Takedown',
    level: 20,
    archetypeId: 'archetype-beastmaster',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: 'feat-beastmaster-lead-the-pack',
    prereqName: 'Liderar a Alcateia',
    extraPrereq: [{ kind: 'text', label: 'Dois companheiros ativos ameaçando a mesma criatura' }],
    description:
      'Você e os dois ativos fazem um Golpe corpo a corpo. O alvo fica desprevenido contra todos. Se mais de um acertar, some o dano e aplique resistências/fraquezas uma vez.',
    actionType: 'two',
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 67,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=5435',
  }),
]

const blessedOneArchetypeFeats: Feat[] = [
  f({
    id: DED_BLESSED.id,
    name: DED_BLESSED.name,
    originalName: 'Blessed One Dedication',
    level: 2,
    archetypeId: 'archetype-blessed-one',
    isDedication: true,
    description:
      'Ganha a magia de devoção imposição das mãos. Pode Refocar meditando. Magias de devoção deste arquétipo são divinas. Fica treinado em ataque e CD de magia (Carisma).',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'spellcasting',
        access: {
          id: 'spellcasting-blessed-one-archetype',
          label: 'Magias de Devoção (Abençoado)',
          style: 'focusOnly',
          tradition: 'divine',
          attributeId: 'charisma',
          proficiencyRank: 'trained',
          classOriginalName: 'Blessed One',
          features: { focusPool: true },
        },
      },
      {
        kind: 'grantedFocusSpell',
        originalName: 'Lay on Hands',
        label: 'Imposição das mãos',
      },
      {
        kind: 'specialAbility',
        name: 'Imposição das mãos',
        description: 'Magia de devoção divina. Refoco por meditação, com ou sem culto.',
      },
    ],
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
  f({
    id: 'feat-blessed-one-sacrifice',
    name: 'Sacrifício Abençoado',
    originalName: 'Blessed Sacrifice',
    level: 4,
    archetypeId: 'archetype-blessed-one',
    prereqId: DED_BLESSED.id,
    prereqName: DED_BLESSED.name,
    description: 'Ganha a magia de domínio sacrifício do protetor como magia de devoção.',
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'specialAbility',
        name: 'Sacrifício do protetor',
        description: 'Magia de devoção: sacrifício do protetor.',
      },
    ],
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
  f({
    id: 'feat-blessed-one-mercy',
    name: 'Misericórdia',
    originalName: 'Mercy',
    level: 6,
    archetypeId: 'archetype-blessed-one',
    prereqId: DED_BLESSED.id,
    prereqName: DED_BLESSED.name,
    description:
      'Pode conjurar imposição das mãos em criatura viva com 2 ações para tentar contramágica em uma condição. Ao pegar o feito, escolha um tipo: Corpo (cego, ofuscado, surdo, enfraquecido, enjoado); Graça (desajeitado, agarrado, paralisado); Mente (em fuga, amedrontado, estupefato). Pode selecionar até 3 vezes, cada uma com um tipo diferente. O motor não escolhe o tipo.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Tipo de misericórdia',
        description:
          'Escolha Corpo, Graça ou Mente. Imposição das mãos em 2 ações tenta remover uma condição da lista. O motor não escolhe.',
      },
    ],
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
  f({
    id: 'feat-blessed-one-spell',
    name: 'Magia Abençoada',
    originalName: 'Blessed Spell',
    level: 8,
    archetypeId: 'archetype-blessed-one',
    traits: ['Arquétipo', 'Concentrar', 'Forma de Magia'],
    prereqId: 'feat-blessed-one-mercy',
    prereqName: 'Misericórdia',
    extraPrereq: [{ kind: 'text', label: 'Capacidade de conjurar magias de espaços' }],
    description:
      '1/10 min. Se a próxima ação for Conjurar uma Magia de espaço em um único aliado, também tenta remover uma condição que sua Misericórdia poderia remover (incluindo Misericórdia Maior). Teste de contramágica pela CD e posto da magia.',
    actionType: 'one',
    frequency: '1/10 min',
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6279',
  }),
  f({
    id: 'feat-blessed-one-greater-mercy',
    name: 'Misericórdia Maior',
    originalName: 'Greater Mercy',
    level: 10,
    archetypeId: 'archetype-blessed-one',
    prereqId: 'feat-blessed-one-mercy',
    prereqName: 'Misericórdia',
    description:
      'Amplia as condições de cada tipo que você já tem: Corpo (drenado, lento; atordoado no 16º); Graça (imobilizado, restringido, lento; petrificado no 12º; atordoado no 16º); Mente (confuso, controlado, lento; condenado e atordoado no 16º).',
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
  f({
    id: 'feat-blessed-one-denial',
    name: 'Negação Abençoada',
    originalName: 'Blessed Denial',
    level: 12,
    archetypeId: 'archetype-blessed-one',
    prereqId: DED_BLESSED.id,
    prereqName: DED_BLESSED.name,
    extraPrereq: [{ kind: 'text', label: 'Misericórdia' }],
    description:
      'Reduz em 1 (mínimo 0) o valor de uma condição elegível que um aliado sofreria. Se houver várias, você escolhe qual.',
    actionType: 'reaction',
    trigger:
      'Um aliado a até 9 m ganharia uma condição que sua Misericórdia poderia remover.',
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
  f({
    id: 'feat-blessed-one-affliction-mercy',
    name: 'Misericórdia de Aflição',
    originalName: 'Affliction Mercy',
    level: 14,
    archetypeId: 'archetype-blessed-one',
    prereqId: 'feat-blessed-one-greater-mercy',
    prereqName: 'Misericórdia Maior',
    description:
      'Adiciona misericórdia de recuperação: contramágica em uma aflição (maldição, doença ou veneno) em vez de uma condição.',
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
  f({
    id: 'feat-blessed-one-rejuvenating-touch',
    name: 'Toque Rejuvenescedor',
    originalName: 'Rejuvenating Touch',
    level: 20,
    archetypeId: 'archetype-blessed-one',
    prereqId: DED_BLESSED.id,
    prereqName: DED_BLESSED.name,
    description:
      'Aliado que recupera PV com imposição das mãos ganha 10 PV temporários imediatamente e no início do turno por 10 rodadas (duram até o início do próximo turno dele). Termina se ficar inconsciente.',
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
  f({
    id: 'feat-blessed-one-ultimate-mercy',
    name: 'Misericórdia Suprema',
    originalName: 'Ultimate Mercy',
    level: 20,
    archetypeId: 'archetype-blessed-one',
    prereqId: 'feat-blessed-one-greater-mercy',
    prereqName: 'Misericórdia Maior',
    description:
      'Adiciona misericórdia suprema: alvo que morreu desde o seu último turno volta com 1 PV e ferido 1 (não funciona se morreu por desintegrar ou efeito de morte). Recebe os outros benefícios da imposição das mãos depois.',
    sourcePage: 190,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=242',
  }),
]

const bountyHunterArchetypeFeats: Feat[] = [
  f({
    id: DED_BOUNTY.id,
    name: DED_BOUNTY.name,
    originalName: 'Bounty Hunter Dedication',
    level: 2,
    archetypeId: 'archetype-bounty-hunter',
    isDedication: true,
    description:
      'Ganha Caçar Presa. Pode designar presa que observou, ouviu ou conheceu por cartaz/recompensa, inclusive ao Recolher Informações. +2 de circunstância para Recolher Informações sobre a presa já designada. Se já tiver Caçar Presa, também ganha Caçador de Monstros.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Caçar Presa',
        actionType: 'one',
        description:
          'Designa uma presa (vista, ouvida ou conhecida por cartaz). +2 para Recolher Informações sobre ela. Se já tinha Caçar Presa, ganha também Caçador de Monstros.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'survival', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Sobrevivência' },
    ],
    sourcePage: 191,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=243',
  }),
  f({
    id: 'feat-bounty-hunter-monster-hunter',
    name: 'Caçador de Monstros',
    originalName: 'Monster Hunter',
    level: 4,
    archetypeId: 'archetype-bounty-hunter',
    prereqId: DED_BOUNTY.id,
    prereqName: DED_BOUNTY.name,
    description:
      'Como parte de Caçar Presa, pode Recordar Conhecimento. Sucesso crítico: +1 de circunstância no próximo ataque seu e de aliados avisados contra essa presa (1/dia por criatura).',
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 157,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=4863',
  }),
  f({
    id: 'feat-bounty-hunter-posse',
    name: 'Escolta',
    originalName: 'Posse',
    level: 4,
    archetypeId: 'archetype-bounty-hunter',
    prereqId: DED_BOUNTY.id,
    prereqName: DED_BOUNTY.name,
    description:
      '1 minuto de instrução: até 5 criaturas dispostas ganham +1 de circunstância para Buscar, Rastrear e Recolher Informações sobre a presa. Vocês ganham +1 de circunstância na iniciativa contra ela. Dura até nova presa ou a morte dela.',
    sourcePage: 191,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=243',
  }),
  f({
    id: 'feat-bounty-hunter-tools-of-the-trade',
    name: 'Ferramentas do Ofício',
    originalName: 'Tools of the Trade',
    level: 4,
    archetypeId: 'archetype-bounty-hunter',
    prereqId: DED_BOUNTY.id,
    prereqName: DED_BOUNTY.name,
    description:
      'Familiaridade com bola, cassetete e chicote (marciais como simples). +1d4 de precisão em Golpes não letais com essas armas contra a presa desprevenida. Sem penalidade por Golpe não letal com arma sem o traço não letal.',
    effects: [
      {
        kind: 'weaponFamiliarity',
        weapons: ['bola', 'sap', 'whip'],
        martialAsSimple: true,
      },
      {
        kind: 'specialAbility',
        name: 'Captura não letal',
        description:
          '+1d4 de precisão em Golpes não letais com bola, cassetete ou chicote contra a presa desprevenida. Sem penalidade de não letal em arma sem o traço.',
      },
    ],
    sourcePage: 191,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=243',
  }),
  f({
    id: 'feat-bounty-hunter-keep-pace',
    name: 'Manter o Ritmo',
    originalName: 'Keep Pace',
    level: 6,
    archetypeId: 'archetype-bounty-hunter',
    prereqId: DED_BOUNTY.id,
    prereqName: DED_BOUNTY.name,
    description:
      'Avance até sua Velocidade, seguindo a presa e mantendo-a ao alcance até ela parar ou você gastar toda a Velocidade. Pode Cavar/Escalar/Voar/Nadar se tiver o deslocamento.',
    actionType: 'reaction',
    trigger: 'Sua presa está ao alcance e tenta se afastar.',
    sourcePage: 191,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6284',
  }),
  f({
    id: 'feat-bounty-hunter-opportunistic-grapple',
    name: 'Agarrão Oportunista',
    originalName: 'Opportunistic Grapple',
    level: 8,
    archetypeId: 'archetype-bounty-hunter',
    prereqId: DED_BOUNTY.id,
    prereqName: DED_BOUNTY.name,
    extraPrereq: [
      {
        kind: 'text',
        label: 'Presa ao alcance, uma mão livre, alvo no máximo um tamanho maior',
      },
    ],
    description: 'Tente um teste de Atletismo para Agarrar a presa.',
    actionType: 'reaction',
    trigger: 'Sua presa obtém falha crítica em um Golpe corpo a corpo contra você.',
    sourcePage: 191,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6285',
  }),
  f({
    id: 'feat-bounty-hunter-double-prey',
    name: 'Presa Dupla',
    originalName: 'Double Prey',
    level: 14,
    archetypeId: 'archetype-bounty-hunter',
    prereqId: DED_BOUNTY.id,
    prereqName: DED_BOUNTY.name,
    description: 'Ao usar Caçar Presa, pode escolher duas criaturas como presa.',
    sourcePage: 191,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=243',
  }),
]

const cavalierArchetypeFeats: Feat[] = [
  f({
    id: DED_CAV.id,
    name: DED_CAV.name,
    originalName: 'Cavalier Dedication',
    level: 2,
    archetypeId: 'archetype-cavalier',
    isDedication: true,
    description:
      'Ganha um companheiro animal jovem que serve de montaria (com a habilidade montaria, ou opções do juramento). Precisa ser ao menos um tamanho maior; se o animal começa Pequeno, pode começar Médio. Especial: se jurou uma causa, pode pegar uma segunda Dedicação ligada a ela sem os 2 feitos extras. Escolha o tipo da montaria — o motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Montaria jovem',
        description:
          'Adicione o companheiro em Companheiros (tipo com montaria, um tamanho maior). Escolha o tipo. O juramento, se houver, é sua escolha.',
      },
    ],
    extraPrereq: [
      { kind: 'text', label: 'Treinado em Natureza ou Sociedade' },
    ],
    sourcePage: 192,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-banner',
    name: 'Estandarte do Cavalheiro',
    originalName: "Cavalier's Banner",
    level: 4,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    extraPrereq: [{ kind: 'text', label: 'Você jurou uma causa' }],
    description:
      'Você e aliados numa emanação de 9 m da montaria ganham +1 de circunstância em Vontade e CDs contra medo. Se o estandarte for destruído ou removido, aliados a 9 m ficam amedrontados 1.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Estandarte',
        description:
          'Emanação de 9 m da montaria: +1 de circunstância em Vontade/CDs contra medo. Sem estandarte: aliados a 9 m ficam amedrontados 1.',
      },
    ],
    sourcePage: 192,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-charge',
    name: 'Investida do Cavalheiro',
    originalName: "Cavalier's Charge",
    level: 4,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'Comande a montaria a Avançar duas vezes. Em qualquer ponto, Golpeie um inimigo ao alcance ou no primeiro incremento. +1 de circunstância no ataque.',
    actionType: 'two',
    sourcePage: 192,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-cushion-landing',
    name: 'Amortecer Queda',
    originalName: 'Cushion Landing',
    level: 4,
    archetypeId: 'archetype-cavalier',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Natureza; a montaria alcança o ponto de queda com um Avanço' },
    ],
    description:
      'A montaria Avança até você. Você a Monta. Trate a queda como 4,5 m mais curta e não cai prone (ambos sofrem o dano restante).',
    actionType: 'reaction',
    trigger: 'Você cai de 4,5 m ou mais.',
    allowedSlotKinds: ['skill'],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7986',
  }),
  f({
    id: 'feat-cavalier-impressive-mount',
    name: 'Montaria Impressionante',
    originalName: 'Impressive Mount',
    level: 4,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'A montaria da Dedicação fica madura. Mesmo sem Comandar, pode usar 1 ação no seu turno para Avançar ou Golpear; se o fizer, é tudo na rodada.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Montaria madura',
        description: 'Avance o estágio da montaria para maduro na ficha. Independência de 1 ação.',
      },
    ],
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-mounting-leap',
    name: 'Salto à Sela',
    originalName: 'Mounting Leap',
    level: 4,
    archetypeId: 'archetype-cavalier',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'athletics', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Atletismo; a até 3 m de criatura disposta um tamanho maior' },
    ],
    description: 'Salte em direção à criatura e Monte-a.',
    actionType: 'one',
    allowedSlotKinds: ['skill'],
    sourceId: SOURCE_BATTLECRY_ID,
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7987',
  }),
  f({
    id: 'feat-cavalier-quick-mount',
    name: 'Montar Rápido',
    originalName: 'Quick Mount',
    level: 4,
    archetypeId: 'archetype-cavalier',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'nature', rank: 'expert' },
      { kind: 'text', label: 'Perito em Natureza; adjacente a criatura disposta um tamanho maior' },
    ],
    description: 'Monte a criatura e Comande um Animal com uma ordem à escolha.',
    actionType: 'one',
    allowedSlotKinds: ['skill'],
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6290',
  }),
  f({
    id: 'feat-cavalier-dashing-pickup',
    name: 'Recolha em Disparada',
    originalName: 'Dashing Pickup',
    level: 6,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'Comande a montaria a Avançar (1 ação), duas vezes (2) ou quatro vezes (3); em algum ponto ela passa adjacente e você a Monta.',
    actionType: 'one',
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-defend-mount',
    name: 'Defender a Montaria',
    originalName: 'Defend Mount',
    level: 6,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'Use sua defesa no lugar da montaria. Se o ataque acertar, você sofre os efeitos.',
    actionType: 'reaction',
    trigger: 'Um inimigo faz Golpe ou ataque de magia contra sua montaria enquanto você a cavalga.',
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6291',
  }),
  f({
    id: 'feat-cavalier-mounted-shield',
    name: 'Escudo Montado',
    originalName: 'Mounted Shield',
    level: 6,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'Ao Levantar o Escudo montado, você e a montaria ganham o bônus na CA. Bloqueio com Escudo pode proteger a montaria.',
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-vaulting-gallop',
    name: 'Galope em Salto',
    originalName: 'Vaulting Gallop',
    level: 6,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'Comande a montaria a Avançar duas vezes. Durante o movimento, ela pode Saltar obstáculos e criaturas até o tamanho dela. Esses saltos não disparam reações. Precisa terminar em chão sólido.',
    actionType: 'two',
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-incredible-mount',
    name: 'Montaria Incrível',
    originalName: 'Incredible Mount',
    level: 8,
    archetypeId: 'archetype-cavalier',
    prereqId: 'feat-cavalier-impressive-mount',
    prereqName: 'Montaria Impressionante',
    description:
      'A montaria da Dedicação vira ágil ou selvagem — você escolhe. O motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Montaria ágil ou selvagem',
        description: 'Escolha ágil ou selvagem. O motor não escolhe.',
      },
    ],
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-trampling-charge',
    name: 'Investida Pisoteante',
    originalName: 'Trampling Charge',
    level: 10,
    archetypeId: 'archetype-cavalier',
    traits: ['Arquétipo', 'Ímpeto'],
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    extraPrereq: [
      { kind: 'text', label: 'Montado em montaria com Golpe corpo a corpo de pernas (garra, casco etc.)' },
    ],
    description:
      'A montaria Avança até o dobro, atravessando espaços de inimigos até um tamanho menor. Causa o dano de um Golpe corpo a corpo com salvaguarda básica de Reflexos contra a CD de Atletismo da montaria. Falha crítica: desprevenido até o fim do seu próximo turno. Role o dano uma vez; cada criatura só uma vez.',
    actionType: 'three',
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6294',
  }),
  f({
    id: 'feat-cavalier-unseat',
    name: 'Derrubar do Sela',
    originalName: 'Unseat',
    level: 10,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    extraPrereq: [{ kind: 'text', label: 'Montado e empunhando arma de justas (jousting)' }],
    description:
      'Golpe corpo a corpo contra criatura montada. Se acertar, teste de Atletismo contra a CD de Fortitude: sucesso derruba do sela para um espaço adjacente; crítico também deixa prone.',
    actionType: 'one',
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6295',
  }),
  f({
    id: 'feat-cavalier-rearing-display',
    name: 'Exibição Empinada',
    originalName: 'Rearing Display',
    level: 12,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'Comande a montaria a empinar e Golpear corpo a corpo. Se acertar, tente Desmoralizar com +1 de circunstância (+2 se crítico).',
    actionType: 'one',
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-specialized-mount',
    name: 'Montaria Especializada',
    originalName: 'Specialized Mount',
    level: 14,
    archetypeId: 'archetype-cavalier',
    prereqId: 'feat-cavalier-incredible-mount',
    prereqName: 'Montaria Incrível',
    description:
      'A montaria ganha uma especialização à escolha. Pode selecionar até 3 vezes, cada uma com especialização diferente. O motor não escolhe.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Especialização da montaria',
        description: 'Escolha a especialização. O motor não escolhe.',
      },
    ],
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
  f({
    id: 'feat-cavalier-legendary-rider',
    name: 'Cavaleiro Lendário',
    originalName: 'Legendary Rider',
    level: 20,
    archetypeId: 'archetype-cavalier',
    prereqId: DED_CAV.id,
    prereqName: DED_CAV.name,
    description:
      'Enquanto cavalga a montaria, você fica apressado; a ação extra só serve para Comandar um Animal.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Apressado (montar)',
        description: 'Montado: apressado; a ação extra só para Comandar um Animal.',
      },
    ],
    sourcePage: 193,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=244',
  }),
]

const celebrityArchetypeFeats: Feat[] = [
  f({
    id: DED_CEL.id,
    name: DED_CEL.name,
    originalName: 'Celebrity Dedication',
    level: 2,
    archetypeId: 'archetype-celebrity',
    isDedication: true,
    description:
      'Ganha a reação Ofuscar. Ao Ganhar Renda, se a tarefa for de nível maior que o seu, +1 de circunstância no teste.',
    effects: [
      {
        kind: 'specialAbility',
        name: 'Ofuscar',
        actionType: 'reaction',
        description:
          'Gatilho: um inimigo tenta um teste de perícia e não obtém sucesso crítico. Você tenta o mesmo teste. Sucesso crítico: +1 de status em ataques, Percepção, salvaguardas e perícias até o fim do seu próximo turno. Sucesso: o mesmo, mas só se o inimigo falhou.',
      },
      {
        kind: 'circumstanceBonus',
        value: 1,
        appliesTo: 'Ganhar Renda (tarefa de nível maior que o seu)',
      },
    ],
    sourcePage: 194,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=245',
  }),
  f({
    id: 'feat-celebrity-never-tire',
    name: 'Nunca Cansar',
    originalName: 'Never Tire',
    level: 4,
    archetypeId: 'archetype-celebrity',
    prereqId: DED_CEL.id,
    prereqName: DED_CEL.name,
    extraPrereq: [
      { kind: 'text', label: 'Observado por ao menos três criaturas que não são inimigas' },
    ],
    description:
      'Atrasa fatigado por 1 minuto ou até deixar de ser observado por 3 não-inimigos. A duração de fatigado só começa depois do atraso. Não pode atrasar de novo quando o efeito acaba.',
    actionType: 'reaction',
    trigger: 'Você ganharia a condição fatigado.',
    sourcePage: 194,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6299',
  }),
  f({
    id: 'feat-celebrity-mesmerizing-gaze',
    name: 'Olhar Hipnotizante',
    originalName: 'Mesmerizing Gaze',
    level: 6,
    archetypeId: 'archetype-celebrity',
    prereqId: DED_CEL.id,
    prereqName: DED_CEL.name,
    description:
      'Uma criatura que você vê e que o vê faz Vontade contra a maior entre CD de classe e CD de magia ou fica fascinada até o fim do seu próximo turno. Sucesso ou fascinação quebrada por ação hostil: imune por 1 dia.',
    actionType: 'two',
    sourcePage: 194,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=245',
  }),
  f({
    id: 'feat-celebrity-command-attention',
    name: 'Comandar Atenção',
    originalName: 'Command Attention',
    level: 10,
    archetypeId: 'archetype-celebrity',
    prereqId: DED_CEL.id,
    prereqName: DED_CEL.name,
    description:
      'Até o fim do seu próximo turno, emanação de 9 m: criaturas nessa área melhoram em um grau salvaguardas contra efeitos visuais de outros. Fortuna. Inimigo que use efeito visual focado em uma criatura precisa passar em Vontade (maior CD) para mirar em alguém que não seja você. Aliados na aura podem Furtar-se mesmo sem cobertura.',
    actionType: 'one',
    sourcePage: 194,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=245',
  }),
]

const dandyArchetypeFeats: Feat[] = [
  f({
    id: DED_DANDY.id,
    name: DED_DANDY.name,
    originalName: 'Dandy Dedication',
    level: 2,
    archetypeId: 'archetype-dandy',
    isDedication: true,
    description:
      'Fica treinado em Enganação e Sociedade; se já era treinado, fica perito. Ganha a atividade de intervalo Influenciar Rumor (1 dia; Diplomacia; DC típica 15 vila / 20 vila grande / 30 cidade / 40 metrópole).',
    effects: [
      { kind: 'skillRank', skillId: 'deception', rank: 'trained', bumpIfAlready: true },
      { kind: 'skillRank', skillId: 'society', rank: 'trained', bumpIfAlready: true },
      {
        kind: 'specialAbility',
        name: 'Influenciar Rumor',
        description:
          'Intervalo, ao menos 1 dia. Teste de Diplomacia para moldar um rumor. DC típica 15/20/30/40 conforme o tamanho da comunidade.',
      },
    ],
    extraPrereq: [
      { kind: 'skillRank', skillId: 'diplomacy', rank: 'trained' },
      { kind: 'text', label: 'Treinado em Diplomacia' },
    ],
    sourcePage: 195,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=246',
  }),
  f({
    id: 'feat-dandy-distracting-flattery',
    name: 'Bajulação Distrativa',
    originalName: 'Distracting Flattery',
    level: 4,
    archetypeId: 'archetype-dandy',
    traits: ['Arquétipo', 'Perícia'],
    prereqId: DED_DANDY.id,
    prereqName: DED_DANDY.name,
    extraPrereq: [
      { kind: 'skillRank', skillId: 'deception', rank: 'expert' },
      { kind: 'text', label: 'Perito em Enganação' },
    ],
    description:
      'Teste de Enganação contra a CD de Vontade. Sucesso: a atitude do alvo não piora pelo gafe do aliado. Falha crítica: a atitude dele em relação a você piora um passo. Imune por 10 minutos.',
    actionType: 'reaction',
    trigger:
      'Você observa a atitude de um alvo em relação a você ou aliados piorar por comportamento de um aliado.',
    allowedSlotKinds: ['skill'],
    sourcePage: 195,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=6303',
  }),
  f({
    id: 'feat-dandy-gossip-lore',
    name: 'Conhecimento de Fofoca',
    originalName: 'Gossip Lore',
    level: 4,
    archetypeId: 'archetype-dandy',
    prereqId: DED_DANDY.id,
    prereqName: DED_DANDY.name,
    description:
      'Fica treinado em Conhecimento Fofoca, usado só para Recordar Conhecimento, mas em qualquer tópico. Falha nesse teste aplica Conhecimento Duvidoso. Se for lendário em Sociedade, fica perito em Fofoca (não sobe por outros meios).',
    effects: [
      { kind: 'lore', loreName: 'Fofoca', rank: 'trained' },
      {
        kind: 'specialAbility',
        name: 'Fofoca versátil',
        description:
          'Conhecimento Fofoca só para Recordar Conhecimento, qualquer tópico. Falha = Conhecimento Duvidoso. Lendário em Sociedade → perito em Fofoca.',
      },
    ],
    sourcePage: 195,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=246',
  }),
  f({
    id: 'feat-dandy-fabricated-connections',
    name: 'Conexões Fabricadas',
    originalName: 'Fabricated Connections',
    level: 7,
    archetypeId: 'archetype-dandy',
    prereqId: DED_DANDY.id,
    prereqName: DED_DANDY.name,
    description:
      'Pode rolar Enganação no lugar de outra perícia para Ganhar Renda, Causar Impressão, Pedir ou Subsistir. Causar Impressão/Pedir: 1/dia. Ganhar Renda/Subsistir: 1/semana.',
    sourcePage: 195,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=246',
  }),
  f({
    id: 'feat-dandy-party-crasher',
    name: 'Furão de Festa',
    originalName: 'Party Crasher',
    level: 7,
    archetypeId: 'archetype-dandy',
    prereqId: DED_DANDY.id,
    prereqName: DED_DANDY.name,
    description:
      'Gasta 1d4 horas para entrar em evento social exclusivo (coroação, gala etc.) sem teste, para você e aliados. Não vale para eventos secretos ou reuniões privadas sem staff.',
    sourcePage: 195,
    aonUrl: 'https://2e.aonprd.com/Archetypes.aspx?ID=246',
  }),
]

export const archetypeFeatsGeneralRemasterMore: Feat[] = [
  ...bastionArchetypeFeats,
  ...beastmasterArchetypeFeats,
  ...blessedOneArchetypeFeats,
  ...bountyHunterArchetypeFeats,
  ...cavalierArchetypeFeats,
  ...celebrityArchetypeFeats,
  ...dandyArchetypeFeats,
]

