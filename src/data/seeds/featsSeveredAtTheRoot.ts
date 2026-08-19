import type { Feat } from '@/types/feat'
import { CLASS_DRUID_ID, CLASS_KINETICIST_ID } from './ids'
import { ANCESTRY_LESHY_ID } from './ancestriesLeshy'
import { HERITAGE_ARDANDE_ID } from './heritagesGeniekin'
import { SOURCE_SEVERED_AT_THE_ROOT_ID } from './sources'

const SRC = SOURCE_SEVERED_AT_THE_ROOT_ID
const PLANT_TRAITS = ['Ardande', 'Conrasu', 'Ghoran', 'Leshy'] as const

function plantFeat(
  feat: Omit<
    Feat,
    'category' | 'rarity' | 'provenance' | 'sourceId' | 'ancestryId' | 'traits'
  > & { traits?: string[] },
): Feat {
  return {
    category: 'ancestry',
    ancestryId: ANCESTRY_LESHY_ID,
    altHeritageIds: [HERITAGE_ARDANDE_ID],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SRC,
    ...feat,
    traits: [...PLANT_TRAITS, ...(feat.traits ?? []), 'Uncommon'].filter(
      (t, i, arr) => arr.indexOf(t) === i,
    ),
  }
}

/**
 * Feitos Remaster de Pathfinder #202: Severed at the Root.
 * Leshy/ardande, ordens druídicas, cinético (madeira) e desvios Blight Soul / Verdant Core.
 */
export const featsSeveredAtTheRoot: Feat[] = [
  plantFeat({
    id: 'feat-leshy-caustic-nectar',
    name: 'Néctar Cáustico',
    originalName: 'Caustic Nectar',
    level: 1,
    description:
      'Glândulas na garganta produzem néctar ácido que você cospe. Ataque desarmado à distância (incremento 6 m) que causa 1d4 ácido. Acerto crítico: também enjoado 1. Sem especialização crítica. Você é imune ao próprio néctar. Especial: ganha o traço da sua ancestralidade.',
    prerequisites: [{ kind: 'text', label: 'traço ardande, planta ou madeira' }],
    sourcePage: 69,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7612',
  }),
  {
    id: 'feat-ardande-unbowed-unbroken',
    name: 'Inabalável, Indomável',
    originalName: 'Unbowed, Unbroken',
    level: 1,
    category: 'ancestry',
    heritageId: HERITAGE_ARDANDE_ID,
    traits: ['Ardande', 'Lineage', 'Uncommon'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    description:
      'Sua madeira elemental se mostra como resiliência. Ganha a reação Resiliência Inabalável: quando for fazer salvaguarda contra veneno, doença ou efeito mental (ainda não rolou), +1 de circunstância. Se o resultado for sucesso crítico, flores brotam e você ganha PV temporários iguais ao seu nível por 1 minuto.',
    actionType: 'reaction',
    trigger:
      'Você tenta uma salvaguarda contra veneno, doença ou efeito mental, e ainda não rolou.',
    sourceId: SRC,
    sourcePage: 69,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7613',
  },
  plantFeat({
    id: 'feat-leshy-wilderness-born',
    name: 'Nascido no Ermo',
    originalName: 'Wilderness Born',
    level: 1,
    description:
      '+1 de circunstância para Esconder-se e Furtar-se em terreno natural, e para Orientar-se em terreno natural. Em terreno natural, você sempre conta como Encobrindo Rastros, mesmo se escolher outra atividade de exploração.',
    prerequisites: [{ kind: 'text', label: 'ardande ou planta' }],
    sourcePage: 69,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7614',
  }),
  plantFeat({
    id: 'feat-leshy-quick-root',
    name: 'Raiz Rápida',
    originalName: 'Quick Root',
    level: 5,
    description:
      'Raízes cravam no chão. Se uma força o mover, você se move só metade da distância (mínimo 1,5 m). Se seria derrubado, resolva o efeito e então Fique de Pé.',
    prerequisites: [{ kind: 'text', label: 'ardande ou planta' }],
    actionType: 'reaction',
    trigger:
      'Uma criatura Empurra ou Derruba você com sucesso, ou você falha numa salvaguarda que o moveria ou derrubaria.',
    sourcePage: 69,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7615',
  }),
  plantFeat({
    id: 'feat-leshy-grow-tool',
    name: 'Cultivar Ferramenta',
    originalName: 'Grow Tool',
    level: 9,
    traits: ['Plant', 'Primal'],
    description:
      'Flores, cipós e madeira brotam do seu corpo numa ferramenta simples comum de nível 0, sem peças intrincadas nem texto (pé-de-cabra, corda, pá). Não replica kit nem arma. Dura 1 minuto ou até você criar outra; depois vira adubo.',
    prerequisites: [{ kind: 'text', label: 'ardande ou planta' }],
    actionType: 'three',
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7616',
  }),
  plantFeat({
    id: 'feat-leshy-pollinate',
    name: 'Polinizar',
    originalName: 'Pollinate',
    level: 9,
    description:
      'Uma nuvem densa de pólen o oculta. Você fica oculto até o início do seu próximo turno.',
    prerequisites: [{ kind: 'text', label: 'ardande ou planta' }],
    actionType: 'reaction',
    trigger: 'Você sofre dano de contusão.',
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7617',
  }),
  plantFeat({
    id: 'feat-leshy-one-with-the-wild',
    name: 'Um com o Selvagem',
    originalName: 'One with the Wild',
    level: 13,
    description:
      'Em terreno natural, você pode Esconder-se e Furtar-se mesmo sem cobertura nem estar oculto.',
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-leshy-wilderness-born',
        featName: 'Wilderness Born',
      },
    ],
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7618',
  }),
  plantFeat({
    id: 'feat-leshy-unfettered-growth',
    name: 'Crescimento Liberto',
    originalName: 'Unfettered Growth',
    level: 13,
    description:
      'Escolha um benefício permanente: Aumentar de 2º posto como magia primal inata 2 vezes ao dia (só em você, duração 30 minutos); ou Aumentar de 4º posto 1 vez ao dia (só em você). Você escolhe; o motor não escolhe.',
    prerequisites: [{ kind: 'text', label: 'ardande ou planta' }],
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'unfettered-growth',
        options: [
          { id: 'enlarge-2nd', label: 'Aumentar 2º, 2/dia (30 min)' },
          { id: 'enlarge-4th', label: 'Aumentar 4º, 1/dia' },
        ],
        hint: 'A escolha é permanente.',
        abilityName: 'Crescimento liberto ({choice})',
        abilityDescription:
          'Magia inata primal Aumentar, só em você, conforme a opção marcada.',
      },
    ],
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7619',
  }),
  plantFeat({
    id: 'feat-leshy-irresistible-bloom',
    name: 'Florescimento Irresistível',
    originalName: 'Irresistible Bloom',
    level: 17,
    traits: ['Emotion', 'Incapacitation', 'Mental', 'Olfactory', 'Visual'],
    description:
      '1/dia. Flores e aroma: todas as criaturas numa emanação de 9 m fazem Vontade (CD de classe ou de magia, a maior). Falha: fascinado por você e gasta ao menos 1 ação no próximo turno se aproximando. Falha crítica: agir de forma hostil permite nova salvaguarda em vez de encerrar. Dura até o início do seu próximo turno; pode Sustentar (máx. 1 minuto).',
    prerequisites: [{ kind: 'text', label: 'ardande ou planta' }],
    actionType: 'one',
    frequency: '1 vez ao dia',
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7620',
  }),
  plantFeat({
    id: 'feat-leshy-potent-nectar',
    name: 'Néctar Potente',
    originalName: 'Potent Nectar',
    level: 17,
    description:
      'Escolha um benefício permanente: néctar grudento (+1d4 ácido persistente, não multiplica no crítico) ou néctar em alta velocidade (+1d4 ácido de respingo, não multiplica no crítico). Você escolhe; o motor não escolhe.',
    prerequisites: [
      {
        kind: 'feat',
        featId: 'feat-leshy-caustic-nectar',
        featName: 'Caustic Nectar',
      },
    ],
    effects: [
      {
        kind: 'textChoice',
        choiceId: 'potent-nectar',
        options: [
          { id: 'sticky', label: '+1d4 ácido persistente' },
          { id: 'splash', label: '+1d4 ácido de respingo' },
        ],
        hint: 'A escolha é permanente.',
        abilityName: 'Néctar potente ({choice})',
        abilityDescription: 'Aplica-se ao ataque desarmado de néctar.',
      },
    ],
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7621',
  }),
  {
    id: 'feat-druid-fungal-exhalation',
    name: 'Exalação Fúngica',
    originalName: 'Fungal Exhalation',
    level: 6,
    category: 'class',
    classId: CLASS_DRUID_ID,
    traits: ['Druida', 'Focus', 'Uncommon'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    description:
      'Você ganha a magia de ordem Exalação Fúngica e +1 Ponto de Foco na reserva.',
    prerequisites: [{ kind: 'text', label: 'ordem dos Esporos' }],
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'grantedFocusSpell',
        originalName: 'Fungal Exhalation',
        label: 'Ordem',
      },
      {
        kind: 'specialAbility',
        name: 'Exalação Fúngica',
        description: 'Magia de ordem (foco) Exalação Fúngica.',
      },
    ],
    sourceId: SRC,
    sourcePage: 72,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7622',
  },
  {
    id: 'feat-druid-hedge-prison',
    name: 'Prisão de Sebe',
    originalName: 'Hedge Prison',
    level: 6,
    category: 'class',
    classId: CLASS_DRUID_ID,
    traits: ['Druida', 'Focus', 'Uncommon'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    description:
      'Você ganha a magia de ordem Prisão de Sebe e +1 Ponto de Foco na reserva.',
    prerequisites: [{ kind: 'text', label: 'ordem do Cultivo' }],
    effects: [
      { kind: 'focusPool', points: 1 },
      {
        kind: 'grantedFocusSpell',
        originalName: 'Hedge Prison',
        label: 'Ordem',
      },
      {
        kind: 'specialAbility',
        name: 'Prisão de Sebe',
        description: 'Magia de ordem (foco) Prisão de Sebe.',
      },
    ],
    sourceId: SRC,
    sourcePage: 72,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7623',
  },
  {
    id: 'feat-kineticist-born-to-the-trees',
    name: 'Nascido nas Árvores',
    originalName: 'Born to the Trees',
    level: 4,
    category: 'class',
    classId: CLASS_KINETICIST_ID,
    traits: ['Cinético', 'Impulse', 'Morph', 'Primal', 'Uncommon', 'Wood'],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    description:
      'Alvo disposto a 9 m, 10 minutos: deslocamento de escalada igual ao Deslocamento, +1 de circunstância em Acrobacia para Equilibrar-se e Atletismo para Salto Longo/Alto. Saltos: +1,5 m horizontal e +60 cm vertical. Usar de novo encerra o anterior. Nível 6º: até 5 alvos.',
    sourceId: SRC,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7624',
  },
  {
    id: 'feat-kineticist-thousand-lashes-weeping-willow',
    name: 'Os Mil Açoites do Salgueiro-Chorão',
    originalName: 'The Thousand Lashes of the Weeping Willow',
    level: 18,
    category: 'class',
    classId: CLASS_KINETICIST_ID,
    traits: [
      'Cinético',
      'Impulse',
      'Overflow',
      'Plant',
      'Primal',
      'Uncommon',
      'Wood',
    ],
    rarity: 'uncommon',
    provenance: { type: 'official' },
    actionType: 'two',
    description:
      'Tronco de 3 m de diâmetro num espaço livre a até 150 m. Galhos açoitam inimigos numa emanação de 9 m: 10d8 cortante (Reflexos básico). Falha: lento 1 enquanto o salgueiro durar (choro). Não atinge você nem aliados. Dura até o fim do seu próximo turno; Sustentar até 1 minuto. A primeira Sustentação no turno: 4d8 cortante de novo. Usar de novo encerra o anterior. Nível 20º: 14d8 inicial e 5d8 ao Sustentar.',
    sourceId: SRC,
    sourcePage: 73,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7625',
  },
  {
    id: 'feat-deviant-release-spores',
    name: 'Liberar Esporos',
    originalName: 'Release Spores',
    level: 2,
    category: 'class',
    traits: ['Desviante', 'Fungus', 'Magical', 'Poison', 'Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Alma da Praga (Blight Soul). Explosão de 6 m a até 30 m: esporos por 1 rodada por nível. Criaturas dentro ficam ocultas; quem está fora fica oculto para quem está dentro. Você enxerga através. Pode Dispensar.\n\nRecuo — Podridão fúngica: leve = dano igual ao nível; moderado = isso + enjoado 2; grave = dano 2× nível + enjoado 4 (não reduz abaixo de 1 por 1 hora).',
    actionType: 'two',
    sourceId: SRC,
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7626',
  },
  {
    id: 'feat-deviant-rotten-slurry',
    name: 'Lama Podre',
    originalName: 'Rotten Slurry',
    level: 2,
    category: 'class',
    traits: ['Attack', 'Desviante', 'Magical', 'Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Alma da Praga. Ataque à distância contra criatura a 9 m. Acerto: 1d4 contusão por cada 2 níveis (dobro no crítico). Quem sofre dano fica enjoado 1 (enjoado 2 no crítico).',
    actionType: 'one',
    sourceId: SRC,
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7627',
  },
  {
    id: 'feat-deviant-irradiate',
    name: 'Irradiar',
    originalName: 'Irradiate',
    level: 6,
    category: 'class',
    traits: ['Desviante', 'Magical', 'Poison', 'Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Alma da Praga. Emanação de 4,5 m: Fortitude ou enjoado 1. Falha crítica: também fatigado por 1 minuto. Você é imune. O valor de enjoado sobe 1 a cada 5 níveis além do 6º.',
    actionType: 'two',
    sourceId: SRC,
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7628',
  },
  {
    id: 'feat-deviant-unleash-the-blight',
    name: 'Liberar a Praga',
    originalName: 'Unleash the Blight',
    level: 10,
    category: 'class',
    traits: ['Desviante', 'Magical', 'Rare', 'Void'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Alma da Praga. Criaturas vivas numa emanação de 18 m sofrem 1d6 vazio por cada 2 níveis (Fortitude básico).',
    actionType: 'two',
    sourceId: SRC,
    sourcePage: 74,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7629',
  },
  {
    id: 'feat-deviant-sprout-fruit',
    name: 'Brotamento de Fruto',
    originalName: 'Sprout Fruit',
    level: 2,
    category: 'class',
    traits: ['Desviante', 'Healing', 'Magical', 'Plant', 'Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Núcleo Verdejante (Verdant Core). Um fruto maduro brota. Outra criatura gasta 3 ações (1 Interagir para colher + 2 para comer) e cura 1d4 PV por cada 2 níveis seus.\n\nDespertar: dados d4→d6. Despertar: +1 fruto a cada 5 níveis além do 2º; quem come pode reduzir 1 condição em 1.\n\nRecuo — Dreno vital: leve = drenado 1 até gastar 3 ações seguidas descansando; moderado = drenado 2 e fatigado por 20 min (10 min ao sol); grave = drenado 3 até 2 h de soneca (1 h ao sol; fatigado até uma noite de sono).',
    actionType: 'one',
    sourceId: SRC,
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7630',
  },
  {
    id: 'feat-deviant-vine-lash',
    name: 'Chicote de Cipó',
    originalName: 'Vine Lash',
    level: 2,
    category: 'class',
    traits: ['Attack', 'Desviante', 'Magical', 'Plant', 'Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Núcleo Verdejante. Exige mão livre. Cipó como chicote: ataque corpo a corpo a 9 m. Acerto: 1d6 cortante por cada 2 níveis (dobro no crítico).\n\nDespertar: acerto também agarra (CD = CD de classe ou de magia). Despertar: atividade de 2 ações, cone de 9 m, Reflexos básico (sem o bônus de item da armadura nesse uso).',
    actionType: 'one',
    sourceId: SRC,
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7631',
  },
  {
    id: 'feat-deviant-defensive-growth',
    name: 'Crescimento Defensivo',
    originalName: 'Defensive Growth',
    level: 6,
    category: 'class',
    traits: ['Desviante', 'Magical', 'Plant', 'Rare', 'Wood'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Núcleo Verdejante. Um escudo de flores e galhos brota; você Levanta o Escudo contra o ataque. Se sofreria dano, usa Bloqueio com Escudo na hora. É um escudo de madeira; permanece um número de rodadas igual ao seu nível ou até ser destruído.',
    actionType: 'reaction',
    trigger: 'Você é alvo de um ataque físico.',
    sourceId: SRC,
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7632',
  },
  {
    id: 'feat-deviant-disperse-into-petals',
    name: 'Dispersar em Pétalas',
    originalName: 'Disperse into Petals',
    level: 10,
    category: 'class',
    traits: ['Desviante', 'Magical', 'Plant', 'Polymorph', 'Rare'],
    rarity: 'rare',
    provenance: { type: 'official' },
    description:
      'Desvio Núcleo Verdejante. Você vira nuvem visível de pétalas: amorfo, perde bônus de item da CA e efeitos da armadura, usa proficiência sem armadura. Resistência a dano físico igual à metade do nível; imune a precisão. Não conjura, não ativa itens, nem usa ações de ataque ou manipular. Voo 3 m. Até 1 minuto; pode Dispensar.',
    actionType: 'two',
    sourceId: SRC,
    sourcePage: 75,
    aonUrl: 'https://2e.aonprd.com/Feats.aspx?ID=7633',
  },
]
