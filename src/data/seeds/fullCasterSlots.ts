/**
 * Tabela padrão de espaços de conjurador completo preparado
 * (mago / clérigo / druida / bruxa — Player Core).
 * Índice 0 = nv.1. Cada entrada: [ignored, r1…r10].
 */
export function standardPreparedSlotTable(): number[][] {
  const byLevel: Array<Partial<Record<number, number>>> = [
    /* 1 */ { 1: 2 },
    /* 2 */ { 1: 3 },
    /* 3 */ { 1: 3, 2: 2 },
    /* 4 */ { 1: 3, 2: 3 },
    /* 5 */ { 1: 3, 2: 3, 3: 2 },
    /* 6 */ { 1: 3, 2: 3, 3: 3 },
    /* 7 */ { 1: 3, 2: 3, 3: 3, 4: 2 },
    /* 8 */ { 1: 3, 2: 3, 3: 3, 4: 3 },
    /* 9 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 2 },
    /*10 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3 },
    /*11 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2 },
    /*12 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3 },
    /*13 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 2 },
    /*14 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3 },
    /*15 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 2 },
    /*16 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3 },
    /*17 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 2 },
    /*18 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3 },
    /*19 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 1 },
    /*20 */ { 1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 1 },
  ]

  return byLevel.map(rowToSlotArray)
}

export function standardCantrips(count = 5): number[] {
  return Array.from({ length: 20 }, () => count)
}

function rowToSlotArray(
  row: Partial<Record<number, number>>,
): number[] {
  const slots = Array.from({ length: 11 }, () => 0)
  for (const [rank, n] of Object.entries(row)) {
    slots[Number(rank)] = n ?? 0
  }
  return slots
}

/**
 * Conjurador limitado Remaster (Magus, Invocador, Psíquico — AoN).
 * No máximo 2 espaços por posto; o posto novo entra com 1 e vira 2 no
 * nível seguinte. Os postos baixos **permanecem** (não é a “onda” do
 * Magus legado de Secrets of Magic).
 */
export function limitedCasterSlotTable(options?: {
  /** Nível em que surge 1 espaço de 10º (ex.: psíquico 19). Sem isso, sem 10º. */
  tenthRankFromLevel?: number
}): number[][] {
  const tenthFrom = options?.tenthRankFromLevel
  const rows: number[][] = []
  for (let level = 1; level <= 20; level += 1) {
    const slots = Array.from({ length: 11 }, () => 0)
    const highest = Math.min(9, Math.ceil(level / 2))
    for (let rank = 1; rank <= highest; rank += 1) {
      const firstLevel = rank * 2 - 1
      slots[rank] = level === firstLevel ? 1 : 2
    }
    if (tenthFrom != null && level >= tenthFrom) {
      slots[10] = 1
    }
    rows.push(slots)
  }
  return rows
}

/**
 * Tabela de espaços de conjurador completo espontâneo
 * (feiticeiro / oráculo — 3 no 1º, depois 4).
 */
export function standardSpontaneousSlotTable(): number[][] {
  const byLevel: Array<Partial<Record<number, number>>> = [
    /* 1 */ { 1: 3 },
    /* 2 */ { 1: 4 },
    /* 3 */ { 1: 4, 2: 3 },
    /* 4 */ { 1: 4, 2: 4 },
    /* 5 */ { 1: 4, 2: 4, 3: 3 },
    /* 6 */ { 1: 4, 2: 4, 3: 4 },
    /* 7 */ { 1: 4, 2: 4, 3: 4, 4: 3 },
    /* 8 */ { 1: 4, 2: 4, 3: 4, 4: 4 },
    /* 9 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 3 },
    /*10 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4 },
    /*11 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 3 },
    /*12 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4 },
    /*13 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 3 },
    /*14 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4 },
    /*15 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 3 },
    /*16 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4 },
    /*17 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 3 },
    /*18 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4 },
    /*19 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 1 },
    /*20 */ { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 1 },
  ]

  return byLevel.map(rowToSlotArray)
}

function parsePair(cell: string): number {
  const clean = cell.replace('*', '').trim()
  if (clean === '—' || clean === '') return 0
  const parts = clean.split('+').map((n) => Number.parseInt(n, 10) || 0)
  return parts.reduce((sum, n) => sum + n, 0)
}

/**
 * Animista (War of Immortals): preparado da lista divina + espontâneo
 * das aparições. Células no livro são “A+S”.
 */
const ANIMIST_LABEL_ROWS: Array<{
  cantrips: string
  ranks: Partial<Record<number, string>>
}> = [
  { cantrips: '2+2', ranks: { 1: '1+1' } },
  { cantrips: '2+2', ranks: { 1: '2+1' } },
  { cantrips: '2+2', ranks: { 1: '2+1', 2: '1+1' } },
  { cantrips: '2+2', ranks: { 1: '2+1', 2: '2+1' } },
  { cantrips: '2+2', ranks: { 1: '2+1', 2: '2+1', 3: '1+1' } },
  { cantrips: '2+2', ranks: { 1: '2+1', 2: '2+1', 3: '2+1' } },
  { cantrips: '2+3', ranks: { 1: '2+1', 2: '2+1', 3: '2+1', 4: '1+1' } },
  { cantrips: '2+3', ranks: { 1: '2+1', 2: '2+1', 3: '2+1', 4: '2+1' } },
  { cantrips: '2+3', ranks: { 1: '2+1', 2: '2+1', 3: '2+1', 4: '2+1', 5: '1+1' } },
  { cantrips: '2+3', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+1', 5: '2+1' } },
  { cantrips: '2+3', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+1', 6: '1+1' } },
  { cantrips: '2+3', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+1', 6: '2+1' } },
  { cantrips: '2+3', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+1', 7: '1+1' } },
  { cantrips: '2+3', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+1', 7: '2+1' } },
  { cantrips: '2+4', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+2', 7: '2+1', 8: '1+1' } },
  { cantrips: '2+4', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+2', 7: '2+1', 8: '2+1' } },
  { cantrips: '2+4', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+2', 7: '2+2', 8: '2+1', 9: '1+1' } },
  { cantrips: '2+4', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+2', 7: '2+2', 8: '2+1', 9: '2+1' } },
  { cantrips: '2+4', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+2', 7: '2+2', 8: '2+2', 9: '2+1', 10: '0+1*' } },
  { cantrips: '2+4', ranks: { 1: '2+2', 2: '2+2', 3: '2+2', 4: '2+2', 5: '2+2', 6: '2+2', 7: '2+2', 8: '2+2', 9: '2+1', 10: '0+1*' } },
]

export function animistSlotTable(): {
  slots: number[][]
  labels: string[][]
  cantripLabels: string[]
  cantrips: number[]
} {
  const slots: number[][] = []
  const labels: string[][] = []
  const cantripLabels: string[] = []
  const cantrips: number[] = []
  for (const row of ANIMIST_LABEL_ROWS) {
    const slotRow = Array.from({ length: 11 }, () => 0)
    const labelRow = Array.from({ length: 11 }, () => '')
    for (const [rank, cell] of Object.entries(row.ranks)) {
      if (cell === undefined) continue
      const r = Number(rank)
      if (!Number.isInteger(r) || r < 0 || r >= slotRow.length) continue
      slotRow[r] = parsePair(cell)
      labelRow[r] = cell
    }
    slots.push(slotRow)
    labels.push(labelRow)
    cantripLabels.push(row.cantrips)
    cantrips.push(parsePair(row.cantrips))
  }
  return { slots, labels, cantripLabels, cantrips }
}
