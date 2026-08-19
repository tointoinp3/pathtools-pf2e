import { wornItem } from './equipmentFactory'
import type { ItemDefinition, WornMagicStats } from '@/types/equipment'

const PC2 = 'Player Core 2'

function w(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page?: number
  bulk?: number | 'L' | '—'
  traits?: string[]
  rarity?: ItemDefinition['rarity']
  wornMagic?: WornMagicStats
}): ItemDefinition {
  return wornItem({ ...opts, page: opts.page ?? 310, sourceBook: PC2 })
}

/** Itens vestidos — Player Core 2 pg. 310. Sem a reimpressão legado dos óculos (AoN 408). */
export const PLAYER_CORE_2_WORN: ItemDefinition[] = [
  ...alchemistGoggles(),
  ...berserkerCloak(),
  w({
    id: 'worn-3433',
    aonId: 3433,
    name: 'Anel do salto de fogo',
    originalName: 'Fire-Jump Ring',
    level: 10,
    priceGp: 940,
    rarity: 'uncommon',
    traits: ['Fire', 'Uncommon'],
    wornMagic: {
      skillBonuses: [{ skillId: 'athletics', value: 2 }],
      slot: 'anel',
      activate:
        'Salto de fogo (concentrar, manipular, teleportação) 1 vez ao dia: avance (ou Cavar/Voar) para um fogo que o caiba, some sem dano, sinta fogos a até 100 pés e saia de um deles ou adjacente.',
      frequency: '1 vez ao dia',
    },
    description:
      'Anel negro com rubis que soltam fumaça. +2 de item em Atletismo. Ativação 1 vez ao dia: entra num fogo e sai de outro a até 100 pés.',
  }),
  ...guiseOfTheSmirkingDevil(),
  ...helmOfZeal(),
  ...prognosticVeil(),
  ...ringOfManiacalDevices(),
  ...sanguinePendant(),
  ...sashOfProwess(),
]

function alchemistGoggles(): ItemDefinition[] {
  const grades = [
    { id: 'worn-3431', name: 'Óculos de alquimista', original: 'Alchemist Goggles', level: 4, priceGp: 100, bonus: 1 },
    { id: 'worn-3431-greater', name: 'Óculos de alquimista maiores', original: 'Alchemist Goggles (Greater)', level: 11, priceGp: 1400, bonus: 2 },
    { id: 'worn-3431-major', name: 'Óculos de alquimista maiores ainda', original: 'Alchemist Goggles (Major)', level: 17, priceGp: 15000, bonus: 3 },
  ]
  return grades.map((grade) =>
    w({
      id: grade.id,
      aonId: 3431,
      name: grade.name,
      originalName: grade.original,
      level: grade.level,
      priceGp: grade.priceGp,
      wornMagic: {
        skillBonuses: [{ skillId: 'crafting', value: grade.bonus }],
        slot: 'óculos',
        note: `+${grade.bonus} de item em Fabricação para criar itens alquímicos. Com bombas alquímicas, ignore cobertura menor. Falha (não crítica) no Golpe: +${grade.bonus} de item no dano de respingo no alvo.`,
      },
      description:
        `Óculos de latão com lentes pesadas. +${grade.bonus} de item em Fabricação alquímica. Bombas ignoram cobertura menor; em falha, +${grade.bonus} no respingo.`,
    }),
  )
}

function berserkerCloak(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3432',
      aonId: 3432,
      name: 'Manto do bárbaro',
      originalName: "Berserker's Cloak",
      level: 12,
      priceGp: 2000,
      bulk: 1,
      traits: ['Primal'],
      wornMagic: {
        slot: 'manto',
        note: 'Se tiver Fúria, enquanto furioso cresce mandíbulas 1d10 perfurante e garras 1d6 cortante ágeis (briga), com potência +1 e impactante. Instinto animal com fúria bestial: em vez disso, seus desarmados do instinto ganham potência +2 e impactante maior.',
      },
      description:
        'Pele de urso com cabeça e dentes. Em fúria, mandíbulas e garras mágicas (ou runas melhores se for instinto animal com fúria bestial).',
    }),
    w({
      id: 'worn-3432-greater',
      aonId: 3432,
      name: 'Manto do bárbaro maior',
      originalName: "Berserker's Cloak (Greater)",
      level: 19,
      priceGp: 40000,
      bulk: 1,
      traits: ['Primal'],
      wornMagic: {
        slot: 'manto',
        note: 'Mandíbulas e garras com potência +2 e impactante maior. Instinto animal com fúria bestial: potência +3 e impactante máximo.',
      },
      description:
        'Pele de urso. Em fúria, desarmados com potência +2 e impactante maior (ou +3 e impactante máximo no instinto animal com fúria bestial).',
    }),
  ]
}

function guiseOfTheSmirkingDevil(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3434',
      aonId: 3434,
      name: 'Máscara do diabo sorridente',
      originalName: 'Guise of the Smirking Devil',
      level: 9,
      priceGp: 700,
      traits: ['Auditory', 'Void'],
      wornMagic: {
        skillBonuses: [{ skillId: 'intimidation', value: 2 }],
        slot: 'máscara',
        activate:
          'Uivo hediondo (concentrar, manipular) 1 vez ao dia: 6d10 de dano de vazio em emanação de 20 pés (Fortitude básica CD 25).',
        frequency: '1 vez ao dia',
      },
      description:
        'Meia-máscara azul-gelo com sorriso de prata. +2 de item em Intimidação. Ativação 1 vez ao dia: uivo de 6d10 de vazio (CD 25).',
    }),
    w({
      id: 'worn-3434-greater',
      aonId: 3434,
      name: 'Máscara do diabo sorridente maior',
      originalName: 'Guise of the Smirking Devil (Greater)',
      level: 19,
      priceGp: 35000,
      traits: ['Auditory', 'Void'],
      wornMagic: {
        skillBonuses: [{ skillId: 'intimidation', value: 3 }],
        slot: 'máscara',
        activate:
          'Uivo hediondo (concentrar, manipular) 1 vez ao dia: lança lamentos dos condenados (CD 41) em criaturas vivas na área.',
        frequency: '1 vez ao dia',
      },
      description:
        '+3 de item em Intimidação. Ativação 1 vez ao dia: lamentos dos condenados (CD 41).',
    }),
  ]
}

function helmOfZeal(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3435',
      aonId: 3435,
      name: 'Elmo do zelo',
      originalName: 'Helm of Zeal',
      level: 11,
      priceGp: 1250,
      bulk: 'L',
      traits: ['Divine', 'Focused'],
      wornMagic: {
        slot: 'elmo',
        activate:
          'Rally à causa (concentrar) 1 vez ao dia: 1 ponto de foco só para magia de devoção, perdido no fim do turno. Fervor divino (concentrar) 1 vez ao dia, ao usar a reação de campeão: ganha outra reação só para essa reação, até o início do próximo turno.',
        frequency: '1 vez ao dia',
        note: '+2 de item na perícia divina da deidade do elmo. Fabricação: campeão dessa deidade.',
      },
      description:
        'Elmo com símbolos de uma deidade. +2 na perícia divina dela. 1 ponto de foco de devoção 1 vez ao dia; reação extra de campeão 1 vez ao dia.',
    }),
    w({
      id: 'worn-3435-greater',
      aonId: 3435,
      name: 'Elmo do zelo maior',
      originalName: 'Helm of Zeal (Greater)',
      level: 18,
      priceGp: 21000,
      bulk: 'L',
      traits: ['Divine', 'Focused'],
      wornMagic: {
        slot: 'elmo',
        activate:
          'Rally à causa 1 vez ao dia: 1 ponto de foco de devoção. Fervor divino 1 vez por hora, ao usar a reação de campeão.',
        frequency: 'rally 1/dia · fervor 1/hora',
        note: '+3 de item na perícia divina da deidade. Fabricação: campeão dessa deidade.',
      },
      description:
        '+3 na perícia divina da deidade. Ponto de foco de devoção 1 vez ao dia; reação extra de campeão 1 vez por hora.',
    }),
  ]
}

function prognosticVeil(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3436',
      aonId: 3436,
      name: 'Véu prognóstico',
      originalName: 'Prognostic Veil',
      level: 10,
      priceGp: 1000,
      traits: ['Divine', 'Focused'],
      wornMagic: {
        skillBonuses: [{ skillId: 'religion', value: 2 }],
        slot: 'máscara',
        activate:
          'Lembrar o futuro (concentrar) 1 vez ao dia: 1 ponto de foco só para magia de revelação, perdido no fim do turno. Torcer os fios (concentrar) 1 vez ao dia, aliado a 30 pés vai rolar salvaguarda, se você estiver ligado à maldição: o aliado ganha bônus de status igual ao valor de ligado à maldição.',
        frequency: '1 vez ao dia',
        note: 'Fabricação: oráculo.',
      },
      description:
        'Véu roxo com símbolos divinatórios. +2 de item em Religião. Ponto de foco de revelação 1 vez ao dia; torcer o destino numa salvaguarda se estiver ligado à maldição.',
    }),
    w({
      id: 'worn-3436-greater',
      aonId: 3436,
      name: 'Véu prognóstico maior',
      originalName: 'Prognostic Veil (Greater)',
      level: 18,
      priceGp: 21000,
      traits: ['Divine', 'Focused'],
      wornMagic: {
        skillBonuses: [{ skillId: 'religion', value: 3 }],
        slot: 'máscara',
        activate:
          'Lembrar o futuro 1 vez ao dia: 1 ponto de foco de revelação. Torcer os fios 1 vez ao dia também em jogada de golpe ou salvaguarda.',
        frequency: '1 vez ao dia',
        note: 'Fabricação: oráculo.',
      },
      description:
        '+3 de item em Religião. Ponto de foco de revelação 1 vez ao dia; torcer o destino em golpe ou salvaguarda.',
    }),
  ]
}

function ringOfManiacalDevices(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3437',
      aonId: 3437,
      name: 'Anel dos dispositivos maníacos',
      originalName: 'Ring of Maniacal Devices',
      level: 11,
      priceGp: 1175,
      wornMagic: {
        slot: 'anel',
        activate:
          'Armadilha de bola de fogo, 10 minutos (manipular) 1 vez ao dia: efeitos de runa-armadilha com bola de fogo. Só uma runa ativa por vez; some se perder o investimento.',
        frequency: '1 vez ao dia',
        note: 'Interagir: puxa um kit de ladrão do anel. +2 de item em Prestidigitação para Desarmar dispositivo e Abrir fechadura, e em Fabricação para criar/reparar ciladas e armadilhas.',
      },
      description:
        'Anel de latão. Kit de ladrão no anel; +2 para desarmar, abrir fechadura e fabricar ciladas. Ativação 1 vez ao dia: runa-armadilha com bola de fogo.',
    }),
    w({
      id: 'worn-3437-greater',
      aonId: 3437,
      name: 'Anel dos dispositivos maníacos maior',
      originalName: 'Ring of Maniacal Devices (Greater)',
      level: 18,
      priceGp: 21000,
      wornMagic: {
        slot: 'anel',
        activate:
          '10 minutos (manipular) 1 vez ao dia: runa-armadilha com nevasca uivante ou bola de fogo de 7º posto.',
        frequency: '1 vez ao dia',
        note: 'Kit de ladrão no anel. +3 de item em Prestidigitação para Desarmar/Abrir fechadura e em Fabricação de ciladas e armadilhas.',
      },
      description:
        '+3 para desarmar, abrir fechadura e fabricar ciladas. Ativação 1 vez ao dia: runa-armadilha com nevasca uivante ou bola de fogo de 7º posto.',
    }),
  ]
}

function sanguinePendant(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3438',
      aonId: 3438,
      name: 'Pingente sanguíneo',
      originalName: 'Sanguine Pendant',
      level: 10,
      priceGp: 1000,
      traits: ['Focused'],
      wornMagic: {
        slot: 'pingente',
        activate:
          'Chamado do sangue (concentrar) 1 vez ao dia: 1 ponto de foco só para magia de linhagem, perdido no fim do turno.',
        frequency: '1 vez ao dia',
        note: '+2 de item nas duas perícias da linhagem. Só feiticeiro dessa linhagem investe. Ganha o traço da tradição da linhagem. Fabricação: feiticeiro da linhagem.',
      },
      description:
        'Cristal com uma gota de sangue. +2 nas perícias da linhagem. 1 ponto de foco de linhagem 1 vez ao dia. Só a linhagem associada investe.',
    }),
    w({
      id: 'worn-3438-greater',
      aonId: 3438,
      name: 'Pingente sanguíneo maior',
      originalName: 'Sanguine Pendant (Greater)',
      level: 17,
      priceGp: 13000,
      traits: ['Focused'],
      wornMagic: {
        slot: 'pingente',
        activate:
          'Chamado do sangue (concentrar) 1 vez ao dia: 1 ponto de foco só para magia de linhagem, perdido no fim do turno.',
        frequency: '1 vez ao dia',
        note: '+3 de item nas duas perícias da linhagem. Só feiticeiro dessa linhagem investe. Fabricação: feiticeiro da linhagem.',
      },
      description:
        '+3 nas perícias da linhagem. 1 ponto de foco de linhagem 1 vez ao dia.',
    }),
  ]
}

function sashOfProwess(): ItemDefinition[] {
  return [
    w({
      id: 'worn-3439',
      aonId: 3439,
      name: 'Faixa da perícia',
      originalName: 'Sash of Prowess',
      level: 10,
      priceGp: 1000,
      traits: ['Focused'],
      wornMagic: {
        skillBonuses: [
          { skillId: 'acrobatics', value: 2 },
          { skillId: 'athletics', value: 2 },
        ],
        slot: 'faixa',
        activate:
          'Maestria sem esforço (concentrar) 1 vez ao dia, ao ter sucesso em Acrobacia ou Atletismo: vira crítico. Reservas de força interior (concentrar) 1 vez ao dia: 1 ponto de foco só para magia de qi, perdido no fim do turno.',
        frequency: '1 vez ao dia',
        note: 'Fabricação: monge que lança magias de qi.',
      },
      description:
        'Faixa na cintura ou no peito. +2 de item em Acrobacia e Atletismo. 1 vez ao dia, sucesso vira crítico; 1 ponto de foco de qi 1 vez ao dia.',
    }),
    w({
      id: 'worn-3439-greater',
      aonId: 3439,
      name: 'Faixa da perícia maior',
      originalName: 'Sash of Prowess (Greater)',
      level: 17,
      priceGp: 13000,
      traits: ['Focused'],
      wornMagic: {
        skillBonuses: [
          { skillId: 'acrobatics', value: 3 },
          { skillId: 'athletics', value: 3 },
        ],
        slot: 'faixa',
        activate:
          'Maestria sem esforço 1 vez ao dia: sucesso em Acrobacia ou Atletismo vira crítico. Reservas de força interior 1 vez ao dia: 1 ponto de foco de qi.',
        frequency: '1 vez ao dia',
        note: 'Fabricação: monge que lança magias de qi.',
      },
      description:
        '+3 de item em Acrobacia e Atletismo. Sucesso vira crítico 1 vez ao dia; ponto de foco de qi 1 vez ao dia.',
    }),
  ]
}
