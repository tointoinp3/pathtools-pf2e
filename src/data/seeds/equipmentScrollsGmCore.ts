import { scrollItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'
import type { SpellRank } from '@/types/spell'

const SCROLL_BY_RANK: Array<{
  rank: Exclude<SpellRank, 0>
  level: number
  priceGp: number
}> = [
  { rank: 1, level: 1, priceGp: 4 },
  { rank: 2, level: 3, priceGp: 12 },
  { rank: 3, level: 5, priceGp: 30 },
  { rank: 4, level: 7, priceGp: 70 },
  { rank: 5, level: 9, priceGp: 150 },
  { rank: 6, level: 11, priceGp: 300 },
  { rank: 7, level: 13, priceGp: 600 },
  { rank: 8, level: 15, priceGp: 1300 },
  { rank: 9, level: 17, priceGp: 3000 },
  { rank: 10, level: 19, priceGp: 8000 },
]

const RANK_PT: Record<number, string> = {
  1: '1º',
  2: '2º',
  3: '3º',
  4: '4º',
  5: '5º',
  6: '6º',
  7: '7º',
  8: '8º',
  9: '9º',
  10: '10º',
}

function ordinal(rank: number): string {
  if (rank === 1) return 'st'
  if (rank === 2) return 'nd'
  if (rank === 3) return 'rd'
  return 'th'
}

export const GM_CORE_SCROLLS: ItemDefinition[] = SCROLL_BY_RANK.map((row) =>
  scrollItem({
    id: `scroll-2962-${row.rank}`,
    aonId: 2962,
    name: `Pergaminho mágico (${RANK_PT[row.rank]} posto)`,
    originalName: `Magic Scroll (${row.rank}${ordinal(row.rank)}-rank Spell)`,
    level: row.level,
    priceGp: row.priceGp,
    page: 262,
    scroll: { spellRank: row.rank },
    description: `Rolo de papel ou pergaminho com uma magia de ${RANK_PT[row.rank]} posto. Na ficha, escolha a magia. Segure numa mão e Conjure a Magia nesse posto; o pergaminho se destrói. A magia precisa estar na sua lista. Use seu ataque de magia e sua CD. Truques, magias de foco e rituais não entram em pergaminho.`,
  }),
)
