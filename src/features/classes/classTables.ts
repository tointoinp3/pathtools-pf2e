import type { CharacterClass, OfficialTable } from '@/types/class'
import type { SpellcastingDefinition } from '@/types/spell'
import {
  getAncestryFeatLevels,
  getClassFeatLevels,
  getGeneralFeatLevels,
  getSkillFeatLevels,
} from '@/engine/feats'
import {
  ATTRIBUTE_BOOST_LEVELS,
  getSkillIncreaseLevels,
} from '@/engine/progression'

const RANK_HEADERS = [
  '1º',
  '2º',
  '3º',
  '4º',
  '5º',
  '6º',
  '7º',
  '8º',
  '9º',
  '10º',
] as const

const DEFAULT_SKILL_INCREASE_LEVELS = [3, 5, 7, 9, 11, 13, 15, 17, 19]

function usedSpellRanks(def: SpellcastingDefinition): number[] {
  const ranks: number[] = []
  for (let rank = 1; rank <= 10; rank += 1) {
    const hasNumber = def.slotsByCharacterLevel?.some(
      (row) => (row[rank] ?? 0) > 0,
    )
    const hasLabel = def.slotLabelsByCharacterLevel?.some((row) =>
      Boolean(row[rank]),
    )
    if (hasNumber || hasLabel) ranks.push(rank)
  }
  return ranks
}

function slotCell(
  def: SpellcastingDefinition,
  levelIndex: number,
  rank: number,
): string {
  const label = def.slotLabelsByCharacterLevel?.[levelIndex]?.[rank]
  if (label) return label
  const n = def.slotsByCharacterLevel?.[levelIndex]?.[rank] ?? 0
  return n > 0 ? String(n) : ''
}

function cantripCell(def: SpellcastingDefinition, levelIndex: number): string {
  const label = def.cantripLabelsByCharacterLevel?.[levelIndex]
  if (label) return label
  const n = def.cantripsByCharacterLevel?.[levelIndex]
  return n != null && n > 0 ? String(n) : ''
}

export function buildSpellSlotTable(
  def: SpellcastingDefinition | undefined,
): OfficialTable | null {
  if (!def?.slotsByCharacterLevel?.length) return null
  const ranks = usedSpellRanks(def)
  if (ranks.length === 0) return null

  const showCantrips = Boolean(def.cantripsByCharacterLevel?.length)
  const columns: OfficialTable['columns'] = [
    { key: 'level', label: 'Nv.', align: 'center' },
  ]
  if (showCantrips) {
    columns.push({ key: 'cantrips', label: 'Truques', align: 'center' })
  }
  for (const rank of ranks) {
    columns.push({
      key: `r${rank}`,
      label: RANK_HEADERS[rank - 1] ?? `${rank}º`,
      align: 'center',
    })
  }

  const rows = def.slotsByCharacterLevel.map((_, index) => {
    const level = index + 1
    const cells = [String(level)]
    if (showCantrips) cells.push(cantripCell(def, index))
    for (const rank of ranks) cells.push(slotCell(def, index, rank))
    return { key: `lv-${level}`, cells, level }
  })

  return {
    id: `${def.id}-slots`,
    title: 'Espaços de magia',
    subtitle: def.label,
    caption: def.slotTableCaption,
    columns,
    rows,
  }
}

function hasLevel(levels: number[], level: number): boolean {
  return levels.includes(level)
}

export function buildAdvancementTable(
  characterClass: CharacterClass,
): OfficialTable {
  const ancestry = getAncestryFeatLevels()
  const classFeats = getClassFeatLevels(characterClass)
  const skillFeats = getSkillFeatLevels(characterClass)
  const general = getGeneralFeatLevels(characterClass)
  let skillInc = getSkillIncreaseLevels(characterClass)
  if (skillInc.length === 0) skillInc = DEFAULT_SKILL_INCREASE_LEVELS
  const attributes = new Set<number>(ATTRIBUTE_BOOST_LEVELS)
  for (const row of characterClass.levelTable) {
    if (
      row.features.some((f) =>
        f.toLowerCase().includes('aumentos de atributo'),
      )
    ) {
      attributes.add(row.level)
    }
  }

  const mark = (on: boolean) => (on ? '●' : '')

  return {
    id: `${characterClass.id}-advancement`,
    title: 'Avanço',
    subtitle: 'Feitos e aumentos até o 20º',
    caption:
      '● = você ganha aquele recurso neste nível. Feito de ancestralidade é o padrão de todas as classes (1, 5, 9, 13, 17). O 1º também inclui os aumentos de ancestralidade, origem e atributo-chave.',
    columns: [
      { key: 'level', label: 'Nv.', align: 'center' },
      { key: 'ancestry', label: 'Ancestralidade', align: 'center' },
      { key: 'class', label: 'Classe', align: 'center' },
      { key: 'skillFeat', label: 'Perícia', align: 'center' },
      { key: 'general', label: 'Geral', align: 'center' },
      { key: 'skillInc', label: 'Aum. perícia', align: 'center' },
      { key: 'attr', label: 'Atributo', align: 'center' },
    ],
    rows: Array.from({ length: 20 }, (_, i) => {
      const level = i + 1
      return {
        key: `adv-${level}`,
        level,
        cells: [
          String(level),
          mark(hasLevel(ancestry, level)),
          mark(hasLevel(classFeats, level)),
          mark(hasLevel(skillFeats, level)),
          mark(hasLevel(general, level)),
          mark(hasLevel(skillInc, level)),
          mark(attributes.has(level)),
        ],
      }
    }),
  }
}

/** Destaca a linha do nível atual; em tabelas de faixa, a última faixa alcançada. */
export function rowIsHighlighted(
  table: OfficialTable,
  row: OfficialTable['rows'][number],
  characterLevel: number,
): boolean {
  if (row.level === characterLevel) return true
  const leveled = table.rows.filter((r) => r.level != null)
  if (leveled.length === 0) return false
  if (leveled.some((r) => r.level === characterLevel)) {
    return row.level === characterLevel
  }
  const active = [...leveled]
    .reverse()
    .find((r) => (r.level ?? 0) <= characterLevel)
  return active?.key === row.key
}
