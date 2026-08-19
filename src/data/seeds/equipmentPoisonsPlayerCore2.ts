import { alchemicalItem } from './equipmentFactory'
import type { AlchemicalPoisonStats, ItemDefinition } from '@/types/equipment'
import type { Rarity } from '@/types/core'

const EXPOSURE_PT = {
  injury: 'ferimento',
  ingested: 'ingerido',
  inhaled: 'inalado',
  contact: 'contato',
} as const

function poisonItem(opts: {
  aonId: number
  name: string
  originalName: string
  level: number
  priceGp: number
  page: number
  rarity?: Rarity
  traits?: string[]
  flavor: string
  poison: AlchemicalPoisonStats
}): ItemDefinition {
  const stages = opts.poison.stages
    .map((stage, index) => `Estágio ${index + 1}: ${stage.effect} (${stage.duration}).`)
    .join(' ')
  const onset = opts.poison.onset ? ` Início ${opts.poison.onset}.` : ''
  const max = opts.poison.maxDuration
    ? ` Duração máxima ${opts.poison.maxDuration}.`
    : ''
  const extra = opts.poison.extraNote ? ` ${opts.poison.extraNote}` : ''
  const virulent = opts.poison.virulent ? ' Virulento.' : ''
  return alchemicalItem({
    id: `alch-${opts.aonId}`,
    aonId: opts.aonId,
    name: opts.name,
    originalName: opts.originalName,
    level: opts.level,
    priceGp: opts.priceGp,
    page: opts.page,
    rarity: opts.rarity,
    traits: opts.traits,
    alchemical: { kind: 'poison', poison: opts.poison },
    description: `${opts.flavor} Veneno de ${EXPOSURE_PT[opts.poison.exposure]}.${virulent} Salvaguarda de Fortitude CD ${opts.poison.dc}.${onset}${max} ${stages}${extra}`,
  })
}

export const PLAYER_CORE_2_POISONS: ItemDefinition[] = [
  poisonItem({
    aonId: 3322,
    name: 'Arsênico',
    originalName: 'Arsenic',
    level: 1,
    priceGp: 3,
    page: 291,
    flavor: 'Composto de arsênico e outras substâncias.',
    poison: {
      exposure: 'ingested',
      dc: 18,
      onset: '10 minutos',
      maxDuration: '5 minutos',
      hands: '1',
      extraNote:
        'Você não pode reduzir enjoado enquanto estiver afetado.',
      stages: [
        { duration: '1 minuto', effect: '1d4 de dano de veneno e enjoado 1' },
        { duration: '1 minuto', effect: '1d6 de dano de veneno e enjoado 2' },
        { duration: '1 minuto', effect: '1d8 de dano de veneno e enjoado 3' },
      ],
    },
  }),
  poisonItem({
    aonId: 3323,
    name: 'Beladona',
    originalName: 'Belladonna',
    level: 2,
    priceGp: 5,
    page: 291,
    flavor: 'Tóxina comum extraída de uma planta parecida com o tomate.',
    poison: {
      exposure: 'ingested',
      dc: 19,
      onset: '10 minutos',
      maxDuration: '30 minutos',
      hands: '1',
      stages: [
        { duration: '10 minutos', effect: 'deslumbrado' },
        { duration: '10 minutos', effect: '1d6 de dano de veneno e enjoado 1' },
        {
          duration: '1 minuto',
          effect: '1d6 de dano de veneno, confuso e enjoado 1',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3324,
    name: 'Veneno de víbora-preta',
    originalName: 'Black Adder Venom',
    level: 2,
    priceGp: 6,
    page: 291,
    flavor: 'Veneno simples e eficaz para untar uma arma.',
    poison: {
      exposure: 'injury',
      dc: 18,
      maxDuration: '3 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '1d4 de dano de veneno' },
        { duration: '1 rodada', effect: '1d6 de dano de veneno' },
        { duration: '1 rodada', effect: '1d8 de dano de veneno' },
      ],
    },
  }),
  poisonItem({
    aonId: 3325,
    name: 'Extrato de lótus-negro',
    originalName: 'Black Lotus Extract',
    level: 19,
    priceGp: 6500,
    page: 291,
    flavor: 'Provoca hemorragia interna grave.',
    poison: {
      exposure: 'contact',
      dc: 42,
      onset: '1 minuto',
      maxDuration: '6 rodadas',
      virulent: true,
      hands: '1',
      stages: [
        { duration: '1 rodada', effect: '13d6 de dano de veneno e drenado 1' },
        { duration: '1 rodada', effect: '15d6 de dano de veneno e drenado 1' },
        { duration: '1 rodada', effect: '17d6 de dano de veneno e drenado 2' },
      ],
    },
  }),
  poisonItem({
    aonId: 3326,
    name: 'Resina de queima-praga',
    originalName: 'Blightburn Resin',
    level: 11,
    priceGp: 225,
    page: 291,
    flavor:
      'Seiva endurecida de árvores infectadas por fungos e expostas ao fogo.',
    poison: {
      exposure: 'contact',
      dc: 30,
      onset: '1 minuto',
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '6d6 de dano de veneno' },
        { duration: '1 rodada', effect: '7d6 de dano de veneno' },
        { duration: '1 rodada', effect: '9d6 de dano de veneno' },
      ],
    },
  }),
  poisonItem({
    aonId: 3327,
    name: 'Fumos de enxofre',
    originalName: 'Brimstone Fumes',
    level: 16,
    priceGp: 1500,
    page: 292,
    flavor: 'Fumos das forjas do Inferno drenam saúde e força.',
    poison: {
      exposure: 'inhaled',
      dc: 36,
      onset: '1 rodada',
      maxDuration: '6 rodadas',
      hands: '1',
      stages: [
        { duration: '1 rodada', effect: '7d8 de dano de veneno e enfraquecido 1' },
        { duration: '1 rodada', effect: '8d8 de dano de veneno e enfraquecido 2' },
        {
          duration: '1 rodada',
          effect: '10d8 de dano de veneno e enfraquecido 3',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3328,
    name: 'Veneno de verme das cavernas',
    originalName: 'Cave Worm Venom',
    level: 12,
    priceGp: 500,
    page: 292,
    flavor: 'Veneno de vermes enormes deixa a vítima enfraquecida.',
    poison: {
      exposure: 'injury',
      dc: 32,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '5d6 de dano de veneno e enfraquecido 2' },
        { duration: '1 rodada', effect: '6d6 de dano de veneno e enfraquecido 2' },
        { duration: '1 rodada', effect: '8d6 de dano de veneno e enfraquecido 2' },
      ],
    },
  }),
  poisonItem({
    aonId: 3329,
    name: 'Flagelo cerúleo',
    originalName: 'Cerulean Scourge',
    level: 16,
    priceGp: 1450,
    page: 292,
    flavor:
      'Os vasos da vítima brilham em azul antes de estourar com dor.',
    poison: {
      exposure: 'injury',
      dc: 37,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '10d6 de dano de veneno' },
        { duration: '1 rodada', effect: '12d6 de dano de veneno' },
        { duration: '1 rodada', effect: '14d6 de dano de veneno' },
      ],
    },
  }),
  poisonItem({
    aonId: 3330,
    name: 'Óleo de citilesh',
    originalName: 'Cytillesh Oil',
    level: 3,
    priceGp: 10,
    page: 292,
    flavor:
      'Destilado do fungo citilesh, sem o efeito de alterar memórias.',
    poison: {
      exposure: 'injury',
      dc: 19,
      maxDuration: '4 rodadas',
      hands: '1',
      stages: [
        { duration: '1 rodada', effect: '1d8 de dano de veneno' },
        { duration: '1 rodada', effect: '1d10 de dano de veneno' },
        { duration: '1 rodada', effect: '2d8 de dano de veneno' },
      ],
    },
  }),
  poisonItem({
    aonId: 3331,
    name: 'Pó de chapéu-da-morte',
    originalName: 'Deathcap Powder',
    level: 13,
    priceGp: 450,
    page: 292,
    flavor: 'Cogumelo seco, moído e tratado até virar um pó sem sabor.',
    poison: {
      exposure: 'ingested',
      dc: 33,
      onset: '10 minutos',
      maxDuration: '6 minutos',
      hands: '1',
      stages: [
        { duration: '1 minuto', effect: '7d8 de dano de veneno' },
        { duration: '1 minuto', effect: '9d6 de dano de veneno e enjoado 2' },
        { duration: '1 minuto', effect: '8d10 de dano de veneno e enjoado 3' },
      ],
    },
  }),
  poisonItem({
    aonId: 3332,
    name: 'Pó enervante',
    originalName: 'Enervating Powder',
    level: 9,
    priceGp: 110,
    page: 292,
    flavor: 'Mistura de esporos e ossos moídos com efeito paralisante.',
    poison: {
      exposure: 'ingested',
      dc: 28,
      onset: '10 minutos',
      maxDuration: '6 minutos',
      hands: '1',
      stages: [
        { duration: '1 minuto', effect: 'fatigado' },
        { duration: '1 minuto', effect: '5d6 de dano de veneno e fatigado' },
        {
          duration: '1 minuto',
          effect: '6d6 de dano de veneno, fatigado e paralisado',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3333,
    name: 'Néctar de flor-do-medo',
    originalName: 'Fearflower Nectar',
    level: 4,
    priceGp: 16,
    page: 292,
    flavor:
      'Néctar de uma flor do deserto que ataca o sistema nervoso e causa pânico.',
    poison: {
      exposure: 'injury',
      dc: 21,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '1d6 de dano de veneno e amedrontado 1' },
        { duration: '1 rodada', effect: '1d6 de dano de veneno e amedrontado 2' },
        { duration: '1 rodada', effect: '1d6 de dano de veneno e amedrontado 3' },
      ],
    },
  }),
  poisonItem({
    aonId: 3334,
    name: 'Veneno de centopeia gigante',
    originalName: 'Giant Centipede Venom',
    level: 1,
    priceGp: 4,
    page: 292,
    flavor: 'Provoca rigidez muscular e fadiga geral.',
    poison: {
      exposure: 'injury',
      dc: 17,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '1d4 de dano de veneno' },
        { duration: '1 rodada', effect: '1d4 de dano de veneno e fatigado' },
        {
          duration: '1 rodada',
          effect: '1d4 de dano de veneno, desajeitado 1 e fatigado',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3335,
    name: 'Veneno de escorpião gigante',
    originalName: 'Giant Scorpion Venom',
    level: 6,
    priceGp: 40,
    page: 292,
    flavor: 'Excruciante e um tanto debilitante.',
    poison: {
      exposure: 'injury',
      dc: 22,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '2d6 de dano de veneno e enfraquecido 1' },
        { duration: '1 rodada', effect: '2d8 de dano de veneno e enfraquecido 1' },
        {
          duration: '1 rodada',
          effect: '2d10 de dano de veneno e enfraquecido 2',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3336,
    name: 'Raiz-túmulo',
    originalName: 'Graveroot',
    level: 3,
    priceGp: 10,
    page: 293,
    flavor: 'Seiva branca opaca do arbusto raiz-túmulo turva a mente.',
    poison: {
      exposure: 'injury',
      dc: 19,
      maxDuration: '4 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '1d8 de dano de veneno' },
        { duration: '1 rodada', effect: '1d10 de dano de veneno e estupefato 1' },
        { duration: '1 rodada', effect: '2d6 de dano de veneno e estupefato 2' },
      ],
    },
  }),
  poisonItem({
    aonId: 3337,
    name: 'Cicuta',
    originalName: 'Hemlock',
    level: 17,
    priceGp: 2250,
    page: 293,
    flavor:
      'Tóxina concentrada que paralisa os músculos — inclusive o coração.',
    poison: {
      exposure: 'ingested',
      dc: 38,
      onset: '30 minutos',
      maxDuration: '60 minutos',
      hands: '1',
      stages: [
        {
          duration: '10 minutos',
          effect: '16d6 de dano de veneno e enfraquecido 2',
        },
        {
          duration: '10 minutos',
          effect: '17d6 de dano de veneno e enfraquecido 3',
        },
        {
          duration: '10 minutos',
          effect: '18d6 de dano de veneno e enfraquecido 4',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3338,
    name: 'Sono do rei',
    originalName: "King's Sleep",
    level: 18,
    priceGp: 4000,
    page: 293,
    flavor:
      'Veneno lento que pode parecer doença ou morte natural num alvo idoso.',
    poison: {
      exposure: 'ingested',
      dc: 41,
      onset: '1 dia',
      virulent: true,
      hands: '1',
      extraNote:
        'A condição drenado se acumula a cada falha e não pode ser removida enquanto o veneno durar.',
      stages: [
        { duration: '1 dia', effect: 'drenado 1' },
        { duration: '1 dia', effect: 'drenado 1' },
        { duration: '1 dia', effect: 'drenado 2' },
      ],
    },
  }),
  poisonItem({
    aonId: 3339,
    name: 'Perna-de-chumbo',
    originalName: 'Leadenleg',
    level: 4,
    priceGp: 15,
    page: 293,
    flavor: 'Tóxina sintética que entorpece as extremidades quase até paralisar.',
    poison: {
      exposure: 'injury',
      dc: 20,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        {
          duration: '1 rodada',
          effect: '1d10 de dano de veneno e −5 pés de status em todas as Velocidades',
        },
        {
          duration: '1 rodada',
          effect: '2d6 de dano de veneno e −10 pés de status em todas as Velocidades',
        },
        {
          duration: '1 rodada',
          effect: '2d6 de dano de veneno e −20 pés de status em todas as Velocidades',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3340,
    name: 'Veneno da letargia',
    originalName: 'Lethargy Poison',
    level: 2,
    priceGp: 7,
    page: 293,
    rarity: 'uncommon',
    traits: ['Incapacitation', 'Sleep'],
    flavor:
      'Usado em táticas de bater e correr por quem quer a vítima viva.',
    poison: {
      exposure: 'injury',
      dc: 18,
      maxDuration: '4 horas',
      hands: '2',
      extraNote:
        'Nova exposição não pede novos testes; só falhar contra a exposição em andamento avança o estágio.',
      stages: [
        { duration: '1 rodada', effect: 'lento 1' },
        { duration: '1 minuto', effect: 'lento 1' },
        {
          duration: '1 rodada',
          effect: 'inconsciente, sem teste de Percepção para acordar',
        },
        {
          duration: '1d4 horas',
          effect: 'inconsciente, sem teste de Percepção para acordar',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3341,
    name: 'Névoa da mente',
    originalName: 'Mindfog Mist',
    level: 15,
    priceGp: 1000,
    page: 293,
    flavor: 'Névoa rápida e poderosa contra a mente de conjuradores.',
    poison: {
      exposure: 'inhaled',
      dc: 35,
      onset: '1 rodada',
      maxDuration: '6 rodadas',
      hands: '1',
      stages: [
        { duration: '1 rodada', effect: 'estupefato 2' },
        { duration: '1 rodada', effect: 'confuso e estupefato 3' },
        { duration: '1 rodada', effect: 'confuso e estupefato 4' },
      ],
    },
  }),
  poisonItem({
    aonId: 3342,
    name: 'Sombra-nether',
    originalName: 'Nethershade',
    level: 10,
    priceGp: 160,
    page: 294,
    traits: ['Void'],
    flavor: 'Substância oleosa destilada do Netherworld.',
    poison: {
      exposure: 'injury',
      dc: 29,
      maxDuration: '6 rodadas',
      hands: '2',
      extraNote: 'A condição enfraquecido deste veneno dura 24 horas.',
      stages: [
        {
          duration: '1 rodada',
          effect: '2d6 de dano de vazio e 2d6 de dano de veneno',
        },
        {
          duration: '1 rodada',
          effect: '3d6 de dano de vazio, 2d6 de dano de veneno e enfraquecido 1',
        },
        {
          duration: '1 rodada',
          effect: '3d6 de dano de vazio, 3d6 de dano de veneno e enfraquecido 2',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3343,
    name: 'Resíduo de urtiga',
    originalName: 'Nettleweed Residue',
    level: 8,
    priceGp: 75,
    page: 294,
    flavor: 'Seiva concentrada de ervas urticantes.',
    poison: {
      exposure: 'contact',
      dc: 27,
      onset: '1 minuto',
      maxDuration: '6 minutos',
      hands: '2',
      stages: [
        { duration: '1 minuto', effect: '3d6 de dano de veneno' },
        { duration: '1 minuto', effect: '4d6 de dano de veneno' },
        { duration: '1 minuto', effect: '6d6 de dano de veneno' },
      ],
    },
  }),
  poisonItem({
    aonId: 3344,
    name: 'Vinho do sono',
    originalName: 'Slumber Wine',
    level: 12,
    priceGp: 325,
    page: 294,
    traits: ['Sleep'],
    flavor: 'Usado em intriga social, em que a ausência dói mais que o ferimento.',
    poison: {
      exposure: 'ingested',
      dc: 32,
      onset: '1 hora',
      maxDuration: '7 dias',
      hands: '1',
      extraNote:
        'Inconsciente por este veneno não acorda por nenhum meio enquanto durar, não precisa comer nem beber, e parece morto recente a menos que o examinador passe num teste de Medicina CD 40.',
      stages: [
        { duration: '1 dia', effect: 'inconsciente' },
        { duration: '2 dias', effect: 'inconsciente' },
        { duration: '3 dias', effect: 'inconsciente' },
      ],
    },
  }),
  poisonItem({
    aonId: 3345,
    name: 'Raiz-aranha',
    originalName: 'Spider Root',
    level: 9,
    priceGp: 110,
    page: 294,
    flavor: 'Pasta das raízes finas de uma trepadeira; deixa a vítima desajeitada.',
    poison: {
      exposure: 'contact',
      dc: 28,
      onset: '1 minuto',
      maxDuration: '6 minutos',
      hands: '2',
      stages: [
        { duration: '1 minuto', effect: '3d6 de dano de veneno e desajeitado 1' },
        { duration: '1 minuto', effect: '4d6 de dano de veneno e desajeitado 2' },
        { duration: '1 minuto', effect: '6d6 de dano de veneno e desajeitado 3' },
      ],
    },
  }),
  poisonItem({
    aonId: 3346,
    name: 'Veneno de aranha',
    originalName: 'Spider Venom',
    level: 5,
    priceGp: 25,
    page: 294,
    flavor: 'Erode as defesas do alvo.',
    poison: {
      exposure: 'injury',
      dc: 22,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '1d10 de dano de veneno e enjoado 1' },
        {
          duration: '1 rodada',
          effect: '1d12 de dano de veneno, desajeitado 1 e enjoado 2',
        },
        {
          duration: '1 rodada',
          effect: '2d6 de dano de veneno, desajeitado 2 e enjoado 3',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3347,
    name: 'Tóxina de raiz-emaranhada',
    originalName: 'Tangle Root Toxin',
    level: 7,
    priceGp: 55,
    page: 294,
    flavor: 'Usada para impedir rivais em competições, espionagem e rastreio.',
    poison: {
      exposure: 'contact',
      dc: 26,
      onset: '1 minuto',
      maxDuration: '6 minutos',
      hands: '2',
      stages: [
        {
          duration: '1 minuto',
          effect: 'desajeitado 1 e −10 pés de status em todas as Velocidades',
        },
        {
          duration: '1 minuto',
          effect: 'desajeitado 2 e −20 pés de status em todas as Velocidades',
        },
        {
          duration: '1 minuto',
          effect:
            'desajeitado 3, desprevenido e −30 pés de status em todas as Velocidades',
        },
      ],
    },
  }),
  poisonItem({
    aonId: 3348,
    name: 'Lágrimas da morte',
    originalName: 'Tears of Death',
    level: 20,
    priceGp: 12000,
    page: 294,
    flavor:
      'Entre os venenos alquímicos mais poderosos, destilado de cinco outros na proporção certa.',
    poison: {
      exposure: 'contact',
      dc: 44,
      onset: '1 minuto',
      maxDuration: '10 minutos',
      virulent: true,
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '20d6 de dano de veneno e paralisado' },
        { duration: '1 minuto', effect: '22d6 de dano de veneno e paralisado' },
        { duration: '1 minuto', effect: '24d6 de dano de veneno e paralisado' },
      ],
    },
  }),
  poisonItem({
    aonId: 3349,
    name: 'Acônito',
    originalName: 'Wolfsbane',
    level: 10,
    priceGp: 155,
    page: 294,
    flavor: 'Aparece no folclore pela ligação com licantropos.',
    poison: {
      exposure: 'ingested',
      dc: 30,
      onset: '10 minutos',
      maxDuration: '6 minutos',
      hands: '1',
      extraNote:
        'Se você tem a maldição de um licantropo e sobrevive ao estágio 3, a maldição é curada na hora.',
      stages: [
        { duration: '1 minuto', effect: '3d10 de dano de veneno' },
        { duration: '1 minuto', effect: '4d10 de dano de veneno' },
        { duration: '1 minuto', effect: '5d10 de dano de veneno' },
      ],
    },
  }),
  poisonItem({
    aonId: 3350,
    name: 'Veneno de wyvern',
    originalName: 'Wyvern Poison',
    level: 8,
    priceGp: 80,
    page: 294,
    flavor: 'Extraído, destilado e preservado do ferrão do wyvern.',
    poison: {
      exposure: 'injury',
      dc: 26,
      maxDuration: '6 rodadas',
      hands: '2',
      stages: [
        { duration: '1 rodada', effect: '3d6 de dano de veneno' },
        { duration: '1 rodada', effect: '3d8 de dano de veneno' },
        { duration: '1 rodada', effect: '3d10 de dano de veneno' },
      ],
    },
  }),
]
