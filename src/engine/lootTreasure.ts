/** Tabela 10-9 do GM Core (Remaster): tesouro do grupo de 4 por nível. */

export interface TreasureLevelRow {
  level: number
  totalGp: number
  permanent: Array<{ itemLevel: number; count: number }>
  consumables: Array<{ itemLevel: number; count: number }>
  currencyGp: number
  extraPcCurrencyGp: number
}

export const PARTY_TREASURE_BY_LEVEL: TreasureLevelRow[] = [
  {
    level: 1,
    totalGp: 175,
    permanent: [
      { itemLevel: 2, count: 2 },
      { itemLevel: 1, count: 2 },
    ],
    consumables: [
      { itemLevel: 2, count: 2 },
      { itemLevel: 1, count: 3 },
    ],
    currencyGp: 40,
    extraPcCurrencyGp: 10,
  },
  {
    level: 2,
    totalGp: 300,
    permanent: [
      { itemLevel: 3, count: 2 },
      { itemLevel: 2, count: 2 },
    ],
    consumables: [
      { itemLevel: 3, count: 2 },
      { itemLevel: 2, count: 2 },
      { itemLevel: 1, count: 2 },
    ],
    currencyGp: 70,
    extraPcCurrencyGp: 18,
  },
  {
    level: 3,
    totalGp: 500,
    permanent: [
      { itemLevel: 4, count: 2 },
      { itemLevel: 3, count: 2 },
    ],
    consumables: [
      { itemLevel: 4, count: 2 },
      { itemLevel: 3, count: 2 },
      { itemLevel: 2, count: 2 },
    ],
    currencyGp: 120,
    extraPcCurrencyGp: 30,
  },
  {
    level: 4,
    totalGp: 850,
    permanent: [
      { itemLevel: 5, count: 2 },
      { itemLevel: 4, count: 2 },
    ],
    consumables: [
      { itemLevel: 5, count: 2 },
      { itemLevel: 4, count: 2 },
      { itemLevel: 3, count: 2 },
    ],
    currencyGp: 200,
    extraPcCurrencyGp: 50,
  },
  {
    level: 5,
    totalGp: 1350,
    permanent: [
      { itemLevel: 6, count: 2 },
      { itemLevel: 5, count: 2 },
    ],
    consumables: [
      { itemLevel: 6, count: 2 },
      { itemLevel: 5, count: 2 },
      { itemLevel: 4, count: 2 },
    ],
    currencyGp: 320,
    extraPcCurrencyGp: 80,
  },
  {
    level: 6,
    totalGp: 2000,
    permanent: [
      { itemLevel: 7, count: 2 },
      { itemLevel: 6, count: 2 },
    ],
    consumables: [
      { itemLevel: 7, count: 2 },
      { itemLevel: 6, count: 2 },
      { itemLevel: 5, count: 2 },
    ],
    currencyGp: 500,
    extraPcCurrencyGp: 125,
  },
  {
    level: 7,
    totalGp: 2900,
    permanent: [
      { itemLevel: 8, count: 2 },
      { itemLevel: 7, count: 2 },
    ],
    consumables: [
      { itemLevel: 8, count: 2 },
      { itemLevel: 7, count: 2 },
      { itemLevel: 6, count: 2 },
    ],
    currencyGp: 720,
    extraPcCurrencyGp: 180,
  },
  {
    level: 8,
    totalGp: 4000,
    permanent: [
      { itemLevel: 9, count: 2 },
      { itemLevel: 8, count: 2 },
    ],
    consumables: [
      { itemLevel: 9, count: 2 },
      { itemLevel: 8, count: 2 },
      { itemLevel: 7, count: 2 },
    ],
    currencyGp: 1000,
    extraPcCurrencyGp: 250,
  },
  {
    level: 9,
    totalGp: 5700,
    permanent: [
      { itemLevel: 10, count: 2 },
      { itemLevel: 9, count: 2 },
    ],
    consumables: [
      { itemLevel: 10, count: 2 },
      { itemLevel: 9, count: 2 },
      { itemLevel: 8, count: 2 },
    ],
    currencyGp: 1400,
    extraPcCurrencyGp: 350,
  },
  {
    level: 10,
    totalGp: 8000,
    permanent: [
      { itemLevel: 11, count: 2 },
      { itemLevel: 10, count: 2 },
    ],
    consumables: [
      { itemLevel: 11, count: 2 },
      { itemLevel: 10, count: 2 },
      { itemLevel: 9, count: 2 },
    ],
    currencyGp: 2000,
    extraPcCurrencyGp: 500,
  },
  {
    level: 11,
    totalGp: 11500,
    permanent: [
      { itemLevel: 12, count: 2 },
      { itemLevel: 11, count: 2 },
    ],
    consumables: [
      { itemLevel: 12, count: 2 },
      { itemLevel: 11, count: 2 },
      { itemLevel: 10, count: 2 },
    ],
    currencyGp: 2800,
    extraPcCurrencyGp: 700,
  },
  {
    level: 12,
    totalGp: 16500,
    permanent: [
      { itemLevel: 13, count: 2 },
      { itemLevel: 12, count: 2 },
    ],
    consumables: [
      { itemLevel: 13, count: 2 },
      { itemLevel: 12, count: 2 },
      { itemLevel: 11, count: 2 },
    ],
    currencyGp: 4000,
    extraPcCurrencyGp: 1000,
  },
  {
    level: 13,
    totalGp: 25000,
    permanent: [
      { itemLevel: 14, count: 2 },
      { itemLevel: 13, count: 2 },
    ],
    consumables: [
      { itemLevel: 14, count: 2 },
      { itemLevel: 13, count: 2 },
      { itemLevel: 12, count: 2 },
    ],
    currencyGp: 6000,
    extraPcCurrencyGp: 1500,
  },
  {
    level: 14,
    totalGp: 36500,
    permanent: [
      { itemLevel: 15, count: 2 },
      { itemLevel: 14, count: 2 },
    ],
    consumables: [
      { itemLevel: 15, count: 2 },
      { itemLevel: 14, count: 2 },
      { itemLevel: 13, count: 2 },
    ],
    currencyGp: 9000,
    extraPcCurrencyGp: 2250,
  },
  {
    level: 15,
    totalGp: 54500,
    permanent: [
      { itemLevel: 16, count: 2 },
      { itemLevel: 15, count: 2 },
    ],
    consumables: [
      { itemLevel: 16, count: 2 },
      { itemLevel: 15, count: 2 },
      { itemLevel: 14, count: 2 },
    ],
    currencyGp: 13000,
    extraPcCurrencyGp: 3250,
  },
  {
    level: 16,
    totalGp: 82500,
    permanent: [
      { itemLevel: 17, count: 2 },
      { itemLevel: 16, count: 2 },
    ],
    consumables: [
      { itemLevel: 17, count: 2 },
      { itemLevel: 16, count: 2 },
      { itemLevel: 15, count: 2 },
    ],
    currencyGp: 20000,
    extraPcCurrencyGp: 5000,
  },
  {
    level: 17,
    totalGp: 128000,
    permanent: [
      { itemLevel: 18, count: 2 },
      { itemLevel: 17, count: 2 },
    ],
    consumables: [
      { itemLevel: 18, count: 2 },
      { itemLevel: 17, count: 2 },
      { itemLevel: 16, count: 2 },
    ],
    currencyGp: 30000,
    extraPcCurrencyGp: 7500,
  },
  {
    level: 18,
    totalGp: 208000,
    permanent: [
      { itemLevel: 19, count: 2 },
      { itemLevel: 18, count: 2 },
    ],
    consumables: [
      { itemLevel: 19, count: 2 },
      { itemLevel: 18, count: 2 },
      { itemLevel: 17, count: 2 },
    ],
    currencyGp: 48000,
    extraPcCurrencyGp: 12000,
  },
  {
    level: 19,
    totalGp: 355000,
    permanent: [
      { itemLevel: 20, count: 2 },
      { itemLevel: 19, count: 2 },
    ],
    consumables: [
      { itemLevel: 20, count: 2 },
      { itemLevel: 19, count: 2 },
      { itemLevel: 18, count: 2 },
    ],
    currencyGp: 80000,
    extraPcCurrencyGp: 20000,
  },
  {
    level: 20,
    totalGp: 490000,
    permanent: [{ itemLevel: 20, count: 4 }],
    consumables: [
      { itemLevel: 20, count: 4 },
      { itemLevel: 19, count: 2 },
    ],
    currencyGp: 140000,
    extraPcCurrencyGp: 35000,
  },
]

export function treasureRowForLevel(level: number): TreasureLevelRow {
  const clamped = Math.min(20, Math.max(1, Math.round(level)))
  const row = PARTY_TREASURE_BY_LEVEL.find((entry) => entry.level === clamped)
  if (row) return row
  const first = PARTY_TREASURE_BY_LEVEL[0]
  if (!first) {
    throw new Error('Tabela de tesouro vazia.')
  }
  return first
}
