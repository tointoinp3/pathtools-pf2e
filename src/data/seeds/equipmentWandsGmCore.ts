import { wandItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'
import type { SpellRank } from '@/types/spell'

const WAND_BY_RANK: Array<{
  rank: Exclude<SpellRank, 0>
  level: number
  priceGp: number
}> = [
  { rank: 1, level: 3, priceGp: 60 },
  { rank: 2, level: 5, priceGp: 160 },
  { rank: 3, level: 7, priceGp: 360 },
  { rank: 4, level: 9, priceGp: 700 },
  { rank: 5, level: 11, priceGp: 1400 },
  { rank: 6, level: 13, priceGp: 3000 },
  { rank: 7, level: 15, priceGp: 6500 },
  { rank: 8, level: 17, priceGp: 15000 },
  { rank: 9, level: 19, priceGp: 40000 },
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
}

export const GM_CORE_WANDS: ItemDefinition[] = [
  ...WAND_BY_RANK.map((row) =>
    wandItem({
      id: `wand-3050-${row.rank}`,
      aonId: 3050,
      name: `Varinha mágica (${RANK_PT[row.rank]} posto)`,
      originalName: `Magic Wand (${row.rank}${ordinal(row.rank)}-rank Spell)`,
      level: row.level,
      priceGp: row.priceGp,
      page: 282,
      wand: { spellRank: row.rank, kind: 'generic' },
      description: `Bastão curto com uma magia de ${RANK_PT[row.rank]} posto. Na ficha, escolha a magia. Uma vez por dia você a conjura; depois disso pode sobrecarregar (teste simples CD 10, +5 a cada tentativa extra). Se falhar, a varinha é destruída. Truques, magias de foco e rituais não entram em varinha.`,
    }),
  ),
  ...continuationWands(),
  ...shardstormWands(),
  ...wideningWands(),
]

function ordinal(rank: number): string {
  if (rank === 1) return 'st'
  if (rank === 2) return 'nd'
  if (rank === 3) return 'rd'
  return 'th'
}

function continuationWands(): ItemDefinition[] {
  const rows: Array<{
    rank: Exclude<SpellRank, 0>
    level: number
    priceGp: number
  }> = [
    { rank: 1, level: 5, priceGp: 160 },
    { rank: 2, level: 7, priceGp: 360 },
    { rank: 3, level: 9, priceGp: 700 },
    { rank: 4, level: 11, priceGp: 1500 },
    { rank: 5, level: 13, priceGp: 3000 },
    { rank: 6, level: 15, priceGp: 6500 },
    { rank: 7, level: 17, priceGp: 15000 },
    { rank: 8, level: 19, priceGp: 40000 },
  ]
  return rows.map((row) =>
    wandItem({
      id: `wand-3051-${row.rank}`,
      aonId: 3051,
      name: `Varinha de continuação (${RANK_PT[row.rank]} posto)`,
      originalName: `Wand of Continuation (${row.rank}${ordinal(row.rank)}-rank Spell)`,
      level: row.level,
      priceGp: row.priceGp,
      page: 282,
      wand: {
        spellRank: row.rank,
        kind: 'continuation',
        extraCastActions: '1 ação a mais que a magia',
        effectNote:
          'A duração aumenta pela metade. Só magias de 1 ou 2 ações com duração de 10 minutos a 1 hora.',
      },
      description: `Brasas amarelas giram até a magia acabar. Conjura uma magia de ${RANK_PT[row.rank]} posto e aumenta a duração pela metade. Gasta 1 ação a mais (2 se a magia era 1, 3 se era 2). Uma vez por dia, mais sobrecarga. Escolha a magia na ficha.`,
    }),
  )
}

function shardstormWands(): ItemDefinition[] {
  const rows: Array<{
    rank: Exclude<SpellRank, 0>
    level: number
    priceGp: number
  }> = [
    { rank: 1, level: 5, priceGp: 160 },
    { rank: 3, level: 9, priceGp: 700 },
    { rank: 5, level: 13, priceGp: 3000 },
    { rank: 7, level: 17, priceGp: 15000 },
  ]
  return rows.map((row) =>
    wandItem({
      id: `wand-3052-${row.rank}`,
      aonId: 3052,
      name: `Varinha da saraivada (${RANK_PT[row.rank]} posto)`,
      originalName: `Wand of Shardstorm (${row.rank}${ordinal(row.rank)}-rank Spell)`,
      level: row.level,
      priceGp: row.priceGp,
      page: 283,
      traits: ['Force'],
      wand: {
        spellRank: row.rank,
        kind: 'shardstorm',
        fixedSpellId: 'spell-force-barrage',
        effectNote:
          'Conjura saraivada de força. No início de cada um dos seus turnos, solta mísseis extras como a versão de 1 ação, por 1 minuto ou até largar a varinha.',
      },
      description: `Cabeça de dragão e esfera de metal. Conjura saraivada de força de ${RANK_PT[row.rank]} posto. Depois, no início de cada um dos seus turnos, solta mísseis extras (versão de 1 ação). Dura 1 minuto, até você largar a varinha ou ativá-la de novo. Uma vez por dia, mais sobrecarga.`,
    }),
  )
}

function wideningWands(): ItemDefinition[] {
  const rows: Array<{
    rank: Exclude<SpellRank, 0>
    level: number
    priceGp: number
  }> = [
    { rank: 1, level: 4, priceGp: 100 },
    { rank: 2, level: 6, priceGp: 250 },
    { rank: 3, level: 8, priceGp: 500 },
    { rank: 4, level: 10, priceGp: 1000 },
    { rank: 5, level: 12, priceGp: 2000 },
    { rank: 6, level: 14, priceGp: 4500 },
    { rank: 7, level: 16, priceGp: 10000 },
    { rank: 8, level: 18, priceGp: 24000 },
    { rank: 9, level: 20, priceGp: 70000 },
  ]
  return rows.map((row) =>
    wandItem({
      id: `wand-3053-${row.rank}`,
      aonId: 3053,
      name: `Varinha de ampliar (${RANK_PT[row.rank]} posto)`,
      originalName: `Wand of Widening (${row.rank}${ordinal(row.rank)}-rank Spell)`,
      level: row.level,
      priceGp: row.priceGp,
      page: 283,
      wand: {
        spellRank: row.rank,
        kind: 'widening',
        extraCastActions: '1 ação a mais que a magia',
        effectNote:
          'Área maior: +5 pés no raio de explosão (mín. 10 pés); +5 pés em cone/linha de até 15 pés; +10 pés em cone/linha maior. Só magias de 1 ou 2 ações, sem duração, com área de explosão, cone ou linha.',
      },
      description: `Ponta bifurcada com peridoto. Conjura uma magia de ${RANK_PT[row.rank]} posto e amplia a área. Gasta 1 ação a mais. Uma vez por dia, mais sobrecarga. Escolha a magia na ficha.`,
    }),
  )
}
