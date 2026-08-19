import { catalogItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

function ammo(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  traits?: string[]
}): ItemDefinition {
  return catalogItem({
    ...opts,
    category: 'ammunition',
    subcategory: 'Munição mágica',
    traits: ['Consumable', 'Magical', ...(opts.traits ?? [])],
    usage: 'other',
  })
}

function extra(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  bulk?: number | 'L' | '—'
  traits?: string[]
  rarity?: ItemDefinition['rarity']
  subcategory?: string
}): ItemDefinition {
  return catalogItem({
    ...opts,
    category: 'consumable',
    subcategory: opts.subcategory ?? 'Outro consumível',
    traits: ['Consumable', ...(opts.traits ?? [])],
    usage: 'held',
    bulk: opts.bulk ?? 'L',
  })
}

/**
 * Munição mágica e consumíveis avulsos do GM Core que ainda não estavam no catálogo.
 */
export const GM_CORE_CONSUMABLES_EXTRA: ItemDefinition[] = [
  ammo({
    id: 'ammo-2921',
    aonId: 2921,
    name: 'Tiro-farol',
    originalName: 'Beacon Shot',
    level: 3,
    priceGp: 10,
    page: 255,
    description:
      'Flecha ou virote. Ativar (manipular). Ao acertar, crava-se e solta fagulhas por 1 minuto: invisível vira só oculto; suprime oculto. Remover: Interagir + Atletismo CD 20.',
  }),
  ammo({
    id: 'ammo-2922',
    aonId: 2922,
    name: 'Virote de escalada',
    originalName: 'Climbing Bolt',
    level: 4,
    priceGp: 15,
    page: 255,
    description:
      'Virote com barbante. Ao cravar em superfície sólida, vira corda de 15 m presa. Soltar: Interagir + Atletismo CD 20.',
  }),
  ammo({
    id: 'ammo-2923',
    aonId: 2923,
    name: 'Munição explosiva',
    originalName: 'Explosive Ammunition',
    level: 9,
    priceGp: 130,
    page: 255,
    traits: ['Fire'],
    description:
      'Qualquer munição. Ativar (manipular). Ao acertar, explosão de 3 m: 6d6 fogo (Reflexos básico CD 25), inclusive o alvo.',
  }),
  ammo({
    id: 'ammo-2923-greater',
    aonId: 2923,
    name: 'Munição explosiva maior',
    originalName: 'Explosive Ammunition (Greater)',
    level: 13,
    priceGp: 520,
    page: 255,
    traits: ['Fire'],
    description: 'Como a explosiva, mas 10d6 fogo e CD 30.',
  }),
  ammo({
    id: 'ammo-2924',
    aonId: 2924,
    name: 'Munição fantasma',
    originalName: 'Ghost Ammunition',
    level: 14,
    priceGp: 900,
    page: 255,
    description:
      'Qualquer munição, fria ao toque. Benefício de toque fantasma; atravessa obstáculos que não bloqueiem incorpóreos. Ignora cobertura; oculto/escondido ainda exigem teste simples. Depois some em névoa e volta à aljava em 1d4 noites.',
  }),
  ammo({
    id: 'ammo-2925',
    aonId: 2925,
    name: 'Munição perfurante',
    originalName: 'Penetrating Ammunition',
    level: 12,
    priceGp: 400,
    page: 255,
    description:
      'Flecha ou virote. Ativar (manipular). O Golpe vira linha de 18 m: uma rolagem contra cada CA. Ignora até 10 de resistência; atravessa paredes de até 30 cm e Dureza 10. Quem sofre dano também 1d6 sangramento persistente. Natural 20 só melhora o grau contra o primeiro alvo.',
  }),
  ammo({
    id: 'ammo-2926',
    aonId: 2926,
    name: 'Munição reluzente',
    originalName: 'Shining Ammunition',
    level: 1,
    priceGp: 3,
    page: 256,
    traits: ['Light'],
    description:
      'Qualquer munição. Ao disparar, luz intensa em 6 m (tênue +6 m) por 10 minutos. Se acertar, gruda e o alvo emite a mesma luz. Interagir para remover; a munição continua brilhando.',
  }),
  ...spellstrikeAmmo(),
  ammo({
    id: 'ammo-2928',
    aonId: 2928,
    name: 'Bala de pedra',
    originalName: 'Stone Bullet',
    level: 15,
    priceGp: 1300,
    page: 256,
    description:
      'Bala de funda. Ativar (manipular). Quem é atingido sofre petrificar de 6º posto (CD 34).',
  }),
  ammo({
    id: 'ammo-2929',
    aonId: 2929,
    name: 'Flecha-videira',
    originalName: 'Vine Arrow',
    level: 3,
    priceGp: 10,
    page: 256,
    description:
      'Flecha. Ativar (concentrar). Ao acertar, videiras: −3 m de circunstância nos Deslocamentos por 2d4 rodadas, ou até Escapar CD 19. Crítico: também imobilizado até Escapar.',
  }),

  extra({
    id: 'consumable-2940',
    aonId: 2940,
    name: 'Unguento antiparalisia',
    originalName: 'Salve of Antiparalysis',
    level: 6,
    priceGp: 40,
    page: 258,
    traits: ['Healing', 'Magical', 'Oil'],
    subcategory: 'Óleo',
    description:
      'Ativar (manipular). Ungir criatura: contrapõe paralisia (posto 3, +22).',
  }),
  extra({
    id: 'consumable-2940-greater',
    aonId: 2940,
    name: 'Unguento antiparalisia maior',
    originalName: 'Salve of Antiparalysis (Greater)',
    level: 12,
    priceGp: 325,
    page: 258,
    traits: ['Healing', 'Magical', 'Oil'],
    subcategory: 'Óleo',
    description:
      'Como o unguento, mas também despetrifica. Contra paralisia: posto 6, +31.',
  }),
  extra({
    id: 'consumable-2999',
    aonId: 2999,
    name: 'Vela da verdade',
    originalName: 'Candle of Truth',
    level: 8,
    priceGp: 75,
    page: 268,
    rarity: 'uncommon',
    traits: ['Magical', 'Mental'],
    description:
      'Ativar (manipular): acender. Criaturas a 3 m: −4 de status para Mentir. Ao entrar na área, Vontade CD 26 ou não consegue mentir deliberadamente enquanto a vela queima (10 minutos; não apaga).',
  }),
  ...frozenLava(),
  extra({
    id: 'consumable-3001',
    aonId: 3001,
    name: 'Água benta',
    originalName: 'Holy Water',
    level: 1,
    priceGp: 3,
    page: 268,
    traits: ['Divine', 'Holy', 'Splash'],
    description:
      'Ativar: Golpear (arremesso simples, incremento 6 m). 1d6 espírito + 1 espírito de respingo, só contra criaturas com o traço profano.',
  }),
  extra({
    id: 'consumable-3003',
    aonId: 3003,
    name: 'Pedra rúnica',
    originalName: 'Runestone',
    level: 1,
    priceGp: 3,
    page: 269,
    traits: ['Magical'],
    description:
      'Pedra preparada para uma runa. Ao transferir a runa para outro objeto, a pedra racha e se destrói. Preço da pedra vazia; com runa, some o preço da runa.',
  }),
  extra({
    id: 'consumable-3004',
    aonId: 3004,
    name: 'Bulbo espiritual',
    originalName: 'Spirit Bulb',
    level: 10,
    priceGp: 200,
    page: 269,
    rarity: 'uncommon',
    traits: ['Magical', 'Plant'],
    description:
      'Ativar (concentrar e manipular): comer conjura forma vegetal de 5º posto em você; plantar no chão conjura convocar planta ou fungo de 5º posto (Sustentar para manter).',
  }),
  extra({
    id: 'consumable-3004-greater',
    aonId: 3004,
    name: 'Bulbo espiritual maior',
    originalName: 'Spirit Bulb (Greater)',
    level: 12,
    priceGp: 300,
    page: 269,
    rarity: 'uncommon',
    traits: ['Magical', 'Plant'],
    description: 'Como o bulbo, mas as magias são de 6º posto.',
  }),
  extra({
    id: 'consumable-3004-major',
    aonId: 3004,
    name: 'Bulbo espiritual máximo',
    originalName: 'Spirit Bulb (Major)',
    level: 14,
    priceGp: 500,
    page: 269,
    rarity: 'uncommon',
    traits: ['Magical', 'Plant'],
    description: 'Como o bulbo, mas as magias são de 7º posto.',
  }),
  extra({
    id: 'consumable-3005',
    aonId: 3005,
    name: 'Tridente-relâmpago',
    originalName: 'Trident of Lightning',
    level: 9,
    priceGp: 110,
    page: 269,
    bulk: 'L',
    traits: ['Electricity', 'Magical'],
    description:
      'Parece tridente comum. Sem ativar, erra o arremesso. Ativar (concentrar e manipular): arremessa e vira raio de 4º posto (5d12 eletricidade, Reflexos básico CD 25) saindo do seu espaço.',
  }),
  extra({
    id: 'consumable-3006',
    aonId: 3006,
    name: 'Água profana',
    originalName: 'Unholy Water',
    level: 1,
    priceGp: 3,
    page: 269,
    traits: ['Divine', 'Unholy', 'Splash'],
    description:
      'Como água benta, mas 1d6 espírito + 1 respingo só contra criaturas com o traço sagrado.',
  }),
]

function spellstrikeAmmo(): ItemDefinition[] {
  const types = [
    { n: 1, roman: 'I', level: 3, price: 12, rank: 1 },
    { n: 2, roman: 'II', level: 5, price: 30, rank: 2 },
    { n: 3, roman: 'III', level: 7, price: 70, rank: 3 },
    { n: 4, roman: 'IV', level: 9, price: 150, rank: 4 },
    { n: 5, roman: 'V', level: 11, price: 300, rank: 5 },
    { n: 6, roman: 'VI', level: 13, price: 600, rank: 6 },
    { n: 7, roman: 'VII', level: 15, price: 1200, rank: 7 },
    { n: 8, roman: 'VIII', level: 17, price: 2400, rank: 8 },
    { n: 9, roman: 'IX', level: 19, price: 4800, rank: 9 },
  ]
  return types.map((t) =>
    ammo({
      id: `ammo-2927-${t.n}`,
      aonId: 2927,
      name: `Munição de golpe mágico (tipo ${t.roman})`,
      originalName: `Spellstrike Ammunition (Type ${t.roman})`,
      level: t.level,
      priceGp: t.price,
      page: 256,
      description: `Qualquer munição. Ativar: Conjurar magia nela (1 ou 2 ações, alvo criatura, posto máximo ${t.rank}º). Quem é atingido vira o alvo da magia (só ele). Ataque de magia usa o resultado do disparo; salvaguarda contra seu CD de magia.`,
    }),
  )
}

function frozenLava(): ItemDefinition[] {
  const grades = [
    { key: '', name: 'Lava congelada', original: 'Frozen Lava', level: 5, price: 30, dice: '5d6', dc: 21 },
    { key: '-blackpeak', name: 'Lava congelada do Pico Negro', original: 'Frozen Lava of Blackpeak', level: 7, price: 70, dice: '7d6', dc: 25 },
    { key: '-pale', name: 'Lava congelada da Montanha Pálida', original: 'Frozen Lava of Pale Mountain', level: 9, price: 150, dice: '9d6', dc: 27 },
    { key: '-mhar', name: 'Lava congelada do Mhar Massif', original: 'Frozen Lava of Mhar Massif', level: 11, price: 300, dice: '11d6', dc: 30 },
    { key: '-droskar', name: 'Lava congelada do Rochedo de Droskar', original: "Frozen Lava of Droskar's Crag", level: 13, price: 600, dice: '13d6', dc: 32 },
    { key: '-ka', name: 'Lava congelada de Ka', original: 'Frozen Lava of Ka', level: 15, price: 1300, dice: '15d6', dc: 36 },
    { key: '-sakalayo', name: 'Lava congelada de Sakalayo', original: 'Frozen Lava of Sakalayo', level: 17, price: 3000, dice: '17d6', dc: 39 },
    { key: '-barrowsiege', name: 'Lava congelada de Barrowsiege', original: 'Frozen Lava of Barrowsiege', level: 19, price: 8000, dice: '19d6', dc: 43 },
  ]
  return grades.map((g) =>
    extra({
      id: `consumable-3000${g.key}`,
      aonId: 3000,
      name: g.name,
      originalName: g.original,
      level: g.level,
      priceGp: g.price,
      page: 268,
      bulk: '—',
      traits: ['Fire', 'Magical'],
      description:
        'Conta de tempo solidificado com lava. Ativar (manipular) e arremessar (Interagir) até 21 m: bola de fogo ' +
        `${g.dice} (CD ${g.dc}). Se ninguém arremessar até o início do seu próximo turno, estoura como fogo de artifício inofensivo.`,
    }),
  )
}
