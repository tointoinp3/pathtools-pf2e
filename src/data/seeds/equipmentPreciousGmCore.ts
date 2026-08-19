import { catalogItem, po } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'
import type { Rarity } from '@/types/core'

function mat(opts: {
  id: string
  aonId: number
  name: string
  originalName: string
  description: string
  level: number
  priceGp: number
  page: number
  category: 'armor' | 'weapon' | 'shield' | 'material'
  subcategory: string
  rarity?: Rarity
  bulk?: number | 'L' | '—'
  traits?: string[]
  shield?: ItemDefinition['shield']
  armor?: ItemDefinition['armor']
}): ItemDefinition {
  return catalogItem({
    ...opts,
    usage:
      opts.category === 'armor'
        ? 'worn-armor'
        : opts.category === 'shield' || opts.category === 'weapon'
          ? 'held'
          : 'other',
    priceCp: po(opts.priceGp),
  })
}

/**
 * Armaduras, armas e escudos de material precioso — GM Core Remaster.
 * Preço-base (sem o extra por Carga, quando houver). Aplique sobre o item comum.
 */
export const GM_CORE_PRECIOUS: ItemDefinition[] = [
  ...adamantine(),
  ...coldIron(),
  ...dawnsilver(),
  ...duskwood(),
  ...orichalcum(),
  ...silver(),
  ...elvenChain(),
]

function adamantine(): ItemDefinition[] {
  const extra =
    'Negro brilhante, duríssimo. Arma: trata o objeto atingido como se tivesse metade da Dureza, salvo se a Dureza do objeto for maior que a da arma. Escudo: golpe de escudo conta como arma de adamantina.'
  return [
    mat({
      id: 'armor-2797-standard',
      aonId: 2797,
      name: 'Armadura de adamantina (grau padrão)',
      originalName: 'Adamantine Armor (Standard-Grade)',
      level: 12,
      priceGp: 1600,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description:
        extra +
        ' Preço 1.600 po + 160 po por Carga. Matéria-prima: 200 po + 20 po por Carga de adamantina. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'armor-2797-high',
      aonId: 2797,
      name: 'Armadura de adamantina (grau alto)',
      originalName: 'Adamantine Armor (High-Grade)',
      level: 19,
      priceGp: 32000,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description:
        extra +
        ' Preço 32.000 po + 3.200 po por Carga. Matéria-prima: 16.000 po + 1.600 po por Carga. Magia e runas de qualquer nível.',
    }),
    mat({
      id: 'weapon-2855-standard',
      aonId: 2855,
      name: 'Arma de adamantina (grau padrão)',
      originalName: 'Adamantine Weapon (Standard-Grade)',
      level: 11,
      priceGp: 1400,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description:
        extra + ' Preço 1.400 po + 140 po por Carga. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'weapon-2855-high',
      aonId: 2855,
      name: 'Arma de adamantina (grau alto)',
      originalName: 'Adamantine Weapon (High-Grade)',
      level: 16,
      priceGp: 13500,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description:
        extra + ' Preço 13.500 po + 1.350 po por Carga. Magia e runas de qualquer nível.',
    }),
    ...shieldPair(2812, 'adamantina', 'Adamantine', 8, {
      standard: { buckler: [400, 8, 32, 16], shield: [440, 10, 40, 20] },
      high: { buckler: [8000, 11, 44, 22], shield: [8800, 13, 52, 26] },
    }, extra),
  ]
}

function coldIron(): ItemDefinition[] {
  const extra =
    'Arma: dano extra contra fraqueza a ferro frio (demônios, fadas). Armadura: criatura com fraqueza a ferro frio que falha criticamente um ataque desarmado contra você fica enjoada 1; vestir a armadura deixa essa criatura enjoada 1. Escudo: golpe de escudo conta como ferro frio.'
  return [
    mat({
      id: 'armor-2798-low',
      aonId: 2798,
      name: 'Armadura de ferro frio (grau baixo)',
      originalName: 'Cold Iron Armor (Low-Grade)',
      level: 5,
      priceGp: 140,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      description: extra + ' Preço 140 po + 14 po por Carga. Magia e runas até 8º nível.',
    }),
    mat({
      id: 'armor-2798-standard',
      aonId: 2798,
      name: 'Armadura de ferro frio (grau padrão)',
      originalName: 'Cold Iron Armor (Standard-Grade)',
      level: 11,
      priceGp: 1200,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      description: extra + ' Preço 1.200 po + 120 po por Carga. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'armor-2798-high',
      aonId: 2798,
      name: 'Armadura de ferro frio (grau alto)',
      originalName: 'Cold Iron Armor (High-Grade)',
      level: 18,
      priceGp: 20000,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      description: extra + ' Preço 20.000 po + 2.000 po por Carga. Magia e runas de qualquer nível.',
    }),
    mat({
      id: 'weapon-2856-low',
      aonId: 2856,
      name: 'Arma de ferro frio (grau baixo)',
      originalName: 'Cold Iron Weapon (Low-Grade)',
      level: 2,
      priceGp: 40,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      description: extra + ' Preço 40 po + 4 po por Carga. Magia e runas até 8º nível.',
    }),
    mat({
      id: 'weapon-2856-standard',
      aonId: 2856,
      name: 'Arma de ferro frio (grau padrão)',
      originalName: 'Cold Iron Weapon (Standard-Grade)',
      level: 10,
      priceGp: 880,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      description: extra + ' Preço 880 po + 88 po por Carga. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'weapon-2856-high',
      aonId: 2856,
      name: 'Arma de ferro frio (grau alto)',
      originalName: 'Cold Iron Weapon (High-Grade)',
      level: 16,
      priceGp: 9000,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      description: extra + ' Preço 9.000 po + 900 po por Carga. Magia e runas de qualquer nível.',
    }),
    ...shieldPair(2813, 'ferro frio', 'Cold Iron', 2, {
      low: { buckler: [30, 3, 12, 6], shield: [34, 5, 20, 10] },
      standard: { buckler: [300, 5, 20, 10], shield: [340, 7, 28, 14] },
      high: { buckler: [5000, 8, 32, 16], shield: [5500, 10, 40, 20] },
    }, extra),
  ]
}

function dawnsilver(): ItemDefinition[] {
  const extra =
    'Carga −1 (1 vira L; L não muda). Armadura: Força exigida −1 e penalidade de Deslocamento −1,5 m. Arma/armadura contam como prata contra fraqueza a prata. Escudo: golpe de escudo conta como prata.'
  return [
    mat({
      id: 'armor-2799-standard',
      aonId: 2799,
      name: 'Armadura de prata da aurora (grau padrão)',
      originalName: 'Dawnsilver Armor (Standard-Grade)',
      level: 12,
      priceGp: 1600,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 1.600 po + 160 po por Carga (Carga original). Magia e runas até 15º nível.',
    }),
    mat({
      id: 'armor-2799-high',
      aonId: 2799,
      name: 'Armadura de prata da aurora (grau alto)',
      originalName: 'Dawnsilver Armor (High-Grade)',
      level: 19,
      priceGp: 32000,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 32.000 po + 3.200 po por Carga original. Magia e runas de qualquer nível.',
    }),
    mat({
      id: 'weapon-2857-standard',
      aonId: 2857,
      name: 'Arma de prata da aurora (grau padrão)',
      originalName: 'Dawnsilver Weapon (Standard-Grade)',
      level: 11,
      priceGp: 1400,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 1.400 po + 140 po por Carga original. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'weapon-2857-high',
      aonId: 2857,
      name: 'Arma de prata da aurora (grau alto)',
      originalName: 'Dawnsilver Weapon (High-Grade)',
      level: 16,
      priceGp: 13500,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 13.500 po + 1.350 po por Carga original. Magia e runas de qualquer nível.',
    }),
    ...shieldPair(2814, 'prata da aurora', 'Dawnsilver', 8, {
      standard: { buckler: [400, 3, 12, 6], shield: [440, 5, 20, 10] },
      high: { buckler: [8000, 6, 24, 12], shield: [8800, 8, 32, 16] },
    }, extra, { shieldBulk: 'L' }),
  ]
}

function duskwood(): ItemDefinition[] {
  const extra =
    'Carga −1 (1 vira L; L não muda). Armadura de madeira: Força exigida −1 e penalidade de Deslocamento −1,5 m.'
  return [
    mat({
      id: 'armor-2800-standard',
      aonId: 2800,
      name: 'Armadura de madeira do crepúsculo (grau padrão)',
      originalName: 'Duskwood Armor (Standard-Grade)',
      level: 12,
      priceGp: 1600,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 1.600 po + 160 po por Carga original. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'armor-2800-high',
      aonId: 2800,
      name: 'Armadura de madeira do crepúsculo (grau alto)',
      originalName: 'Duskwood Armor (High-Grade)',
      level: 19,
      priceGp: 32000,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 32.000 po + 3.200 po por Carga original. Magia e runas de qualquer nível.',
    }),
    mat({
      id: 'weapon-2858-standard',
      aonId: 2858,
      name: 'Arma de madeira do crepúsculo (grau padrão)',
      originalName: 'Duskwood Weapon (Standard-Grade)',
      level: 11,
      priceGp: 1400,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 1.400 po + 140 po por Carga original. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'weapon-2858-high',
      aonId: 2858,
      name: 'Arma de madeira do crepúsculo (grau alto)',
      originalName: 'Duskwood Weapon (High-Grade)',
      level: 16,
      priceGp: 13500,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      description: extra + ' Preço 13.500 po + 1.350 po por Carga original. Magia e runas de qualquer nível.',
    }),
    ...shieldPair(2815, 'madeira do crepúsculo', 'Duskwood', 8, {
      standard: { buckler: [400, 3, 12, 6], shield: [440, 5, 20, 10], tower: [560, 5, 20, 10] },
      high: { buckler: [8000, 6, 24, 12], shield: [8800, 8, 32, 16], tower: [11200, 8, 32, 16] },
    }, extra, { shieldBulk: 'L', towerBulk: 3 }),
  ]
}

function orichalcum(): ItemDefinition[] {
  const extra =
    'Só grau alto. Armadura: 4 runas de propriedade (em vez de 3) e +1 de circunstância em iniciativa. Arma: 4 runas de propriedade; gravar golpe rápido custa metade. Escudo: a primeira vez no dia em que seria destruído, fica com 1 PV e a condição quebrado.'
  return [
    mat({
      id: 'armor-2802-high',
      aonId: 2802,
      name: 'Armadura de oricalco (grau alto)',
      originalName: 'Orichalcum Armor (High-Grade)',
      level: 20,
      priceGp: 55000,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'rare',
      description: extra + ' Preço 55.000 po + 5.500 po por Carga.',
    }),
    mat({
      id: 'weapon-2859-high',
      aonId: 2859,
      name: 'Arma de oricalco (grau alto)',
      originalName: 'Orichalcum Weapon (High-Grade)',
      level: 18,
      priceGp: 22500,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      rarity: 'rare',
      description: extra + ' Preço 22.500 po + 2.250 po por Carga.',
    }),
    ...shieldPair(2816, 'oricalco', 'Orichalcum', 17, {
      high: { buckler: [12000, 14, 56, 28], shield: [13200, 16, 64, 32] },
    }, extra, { rarity: 'rare' }),
  ]
}

function silver(): ItemDefinition[] {
  const extra =
    'Arma: dano extra contra fraqueza a prata (lobisomens) e ignora certas resistências (diabos). Armadura: como ferro frio, mas contra fraqueza a prata. Escudo: golpe de escudo conta como prata. Grau baixo costuma ser só banho.'
  return [
    mat({
      id: 'armor-2803-low',
      aonId: 2803,
      name: 'Armadura de prata (grau baixo)',
      originalName: 'Silver Armor (Low-Grade)',
      level: 5,
      priceGp: 140,
      page: 229,
      category: 'armor',
      subcategory: 'Material precioso',
      description: extra + ' Preço 140 po + 14 po por Carga. Magia e runas até 8º nível.',
    }),
    mat({
      id: 'armor-2803-standard',
      aonId: 2803,
      name: 'Armadura de prata (grau padrão)',
      originalName: 'Silver Armor (Standard-Grade)',
      level: 11,
      priceGp: 1200,
      page: 229,
      category: 'armor',
      subcategory: 'Material precioso',
      description: extra + ' Preço 1.200 po + 120 po por Carga. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'armor-2803-high',
      aonId: 2803,
      name: 'Armadura de prata (grau alto)',
      originalName: 'Silver Armor (High-Grade)',
      level: 18,
      priceGp: 20000,
      page: 229,
      category: 'armor',
      subcategory: 'Material precioso',
      description: extra + ' Preço 20.000 po + 2.000 po por Carga. Magia e runas de qualquer nível.',
    }),
    mat({
      id: 'weapon-2860-low',
      aonId: 2860,
      name: 'Arma de prata (grau baixo)',
      originalName: 'Silver Weapon (Low-Grade)',
      level: 2,
      priceGp: 40,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      description: extra + ' Preço 40 po + 4 po por Carga. Magia e runas até 8º nível.',
    }),
    mat({
      id: 'weapon-2860-standard',
      aonId: 2860,
      name: 'Arma de prata (grau padrão)',
      originalName: 'Silver Weapon (Standard-Grade)',
      level: 10,
      priceGp: 880,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      description: extra + ' Preço 880 po + 88 po por Carga. Magia e runas até 15º nível.',
    }),
    mat({
      id: 'weapon-2860-high',
      aonId: 2860,
      name: 'Arma de prata (grau alto)',
      originalName: 'Silver Weapon (High-Grade)',
      level: 16,
      priceGp: 9000,
      page: 240,
      category: 'weapon',
      subcategory: 'Material precioso',
      description: extra + ' Preço 9.000 po + 900 po por Carga. Magia e runas de qualquer nível.',
    }),
    ...shieldPair(2817, 'prata', 'Silver', 2, {
      low: { buckler: [30, 1, 4, 2], shield: [34, 3, 12, 6] },
      standard: { buckler: [300, 3, 12, 6], shield: [340, 5, 20, 10] },
      high: { buckler: [5000, 6, 24, 12], shield: [5500, 8, 32, 16] },
    }, extra),
  ]
}

function elvenChain(): ItemDefinition[] {
  const armor = {
    category: 'light' as const,
    acBonus: 2,
    dexCap: 3,
    checkPenalty: 0,
    speedPenalty: 0,
    strength: 1,
    group: 'chain' as const,
  }
  const desc =
    'Camisa de malha de prata da aurora: brilha até na luz fraca. Sem penalidade de teste e sem o traço barulhenta (diferente de outras camisas de malha, mesmo de prata da aurora). Aceita runas como camisa de malha de prata da aurora. Carga L.'
  return [
    mat({
      id: 'armor-2801-standard',
      aonId: 2801,
      name: 'Malha élfica (grau padrão)',
      originalName: 'Elven Chain (Standard-Grade)',
      level: 13,
      priceGp: 2500,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      bulk: 'L',
      traits: ['Flexible'],
      armor,
      description: desc + ' Magia e runas até 15º nível.',
    }),
    mat({
      id: 'armor-2801-high',
      aonId: 2801,
      name: 'Malha élfica (grau alto)',
      originalName: 'Elven Chain (High-Grade)',
      level: 20,
      priceGp: 52000,
      page: 228,
      category: 'armor',
      subcategory: 'Material precioso',
      rarity: 'uncommon',
      bulk: 'L',
      traits: ['Flexible'],
      armor,
      description: desc + ' Magia e runas de qualquer nível.',
    }),
  ]
}

type ShieldGrade = {
  buckler: [number, number, number, number]
  shield: [number, number, number, number]
  tower?: [number, number, number, number]
}

function shieldPair(
  aonId: number,
  namePt: string,
  original: string,
  baseLevel: number,
  grades: Partial<Record<'low' | 'standard' | 'high', ShieldGrade>>,
  extra: string,
  opts?: { shieldBulk?: number | 'L'; towerBulk?: number; rarity?: Rarity },
): ItemDefinition[] {
  const gradeLabel = {
    low: ['grau baixo', 'Low-Grade'],
    standard: ['grau padrão', 'Standard-Grade'],
    high: ['grau alto', 'High-Grade'],
  } as const
  const out: ItemDefinition[] = []
  for (const [key, pack] of Object.entries(grades) as Array<[keyof typeof gradeLabel, ShieldGrade]>) {
    const [pt, en] = gradeLabel[key]
    const level = key === 'low' ? 2 : key === 'standard' ? Math.max(baseLevel, 8) : Math.max(baseLevel, 16)
    const mk = (
      kind: 'buckler' | 'shield' | 'tower',
      labelPt: string,
      labelEn: string,
      nums: [number, number, number, number],
      bulk: number | 'L',
      ac: number,
    ) => {
      const [price, hardness, hp, bt] = nums
      out.push(
        mat({
          id: `shield-${aonId}-${kind}-${key}`,
          aonId,
          name: `${labelPt} de ${namePt} (${pt})`,
          originalName: `${original} ${labelEn} (${en})`,
          level: key === 'high' && original === 'Orichalcum' ? 17 : level,
          priceGp: price,
          page: 233,
          category: 'shield',
          subcategory: 'Material precioso',
          rarity: opts?.rarity,
          bulk,
          shield: { acBonus: ac, speedPenalty: kind === 'tower' ? -5 : 0, hardness, hp, bt },
          description: `${extra} Dureza ${hardness}, PV ${hp}, RT ${bt}.`,
        }),
      )
    }
    mk('buckler', 'Broquel', 'Buckler', pack.buckler, 'L', 1)
    mk('shield', 'Escudo', 'Shield', pack.shield, opts?.shieldBulk ?? 1, 2)
    if (pack.tower) {
      mk('tower', 'Escudo torre', 'Tower Shield', pack.tower, opts?.towerBulk ?? 4, 2)
    }
  }
  return out
}
