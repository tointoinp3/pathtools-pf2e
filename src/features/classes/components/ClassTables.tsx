import type { ReactNode } from 'react'
import type { CharacterClass, OfficialTable } from '@/types/class'
import type { SpellcastingDefinition } from '@/types/spell'
import { DataTable } from '@/components/ui/DataTable'
import { Panel, Tip } from '@/components/ui/Panel'
import {
  buildAdvancementTable,
  buildSpellSlotTable,
  rowIsHighlighted,
} from '@/features/classes/classTables'

function FeatureChips({ features }: { features: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {features.map((feature, i) => (
        <span
          key={`${feature}-${i}`}
          className="rounded-md border border-border/70 bg-surface-2 px-1.5 py-0.5 text-[11px] leading-snug text-text-muted"
        >
          {feature}
        </span>
      ))}
    </div>
  )
}

function OfficialDataTable({
  table,
  characterLevel,
  compact,
  renderCell,
}: {
  table: OfficialTable
  characterLevel: number
  compact?: boolean
  renderCell?: (cell: string, columnIndex: number, rowKey: string) => ReactNode
}) {
  return (
    <DataTable
      compact={compact}
      caption={table.caption}
      columns={table.columns}
      rows={table.rows.map((row) => ({
        key: row.key,
        highlighted: rowIsHighlighted(table, row, characterLevel),
        cells: row.cells.map((cell, i) =>
          renderCell ? renderCell(cell, i, row.key) : cell,
        ),
      }))}
    />
  )
}

export function SpellSlotTable({
  spellcasting,
  characterLevel,
}: {
  spellcasting: SpellcastingDefinition
  characterLevel: number
}) {
  const table = buildSpellSlotTable(spellcasting)
  if (!table) {
    if (spellcasting.style === 'focusOnly') {
      return (
        <Panel title="Espaços de magia" subtitle={spellcasting.label}>
          <Tip>
            Esta classe não usa espaços de magia — só magias de foco (aba
            Magias). Recarrega nas preparações ou com 10 min de Refocar.
          </Tip>
        </Panel>
      )
    }
    return null
  }

  return (
    <Panel title={table.title} subtitle={table.subtitle}>
      <OfficialDataTable
        table={table}
        characterLevel={characterLevel}
        compact
      />
    </Panel>
  )
}

export function ClassTables({
  characterClass,
  characterLevel,
  slotsOnly,
}: {
  characterClass: CharacterClass
  characterLevel: number
  /** Só a tabela de espaços (aba Magias / ajuda). */
  slotsOnly?: boolean
}) {
  const spellcasting = characterClass.spellcasting
  const advancement = buildAdvancementTable(characterClass)
  const extras = characterClass.extraTables ?? []

  if (slotsOnly) {
    if (!spellcasting) return null
    return (
      <SpellSlotTable
        spellcasting={spellcasting}
        characterLevel={characterLevel}
      />
    )
  }

  return (
    <div className="space-y-3">
      {spellcasting ? (
        <SpellSlotTable
          spellcasting={spellcasting}
          characterLevel={characterLevel}
        />
      ) : null}

      <Panel
        title="Recursos por nível"
        subtitle="Tabela da classe · linha dourada = seu nível"
      >
        <DataTable
          compact
          columns={[
            { key: 'level', label: 'Nv.', align: 'center' },
            { key: 'features', label: 'Recursos' },
          ]}
          rows={characterClass.levelTable.map((row) => ({
            key: `feat-${row.level}`,
            highlighted: row.level === characterLevel,
            cells: [String(row.level), <FeatureChips features={row.features} />],
          }))}
        />
      </Panel>

      <Panel title={advancement.title} subtitle={advancement.subtitle}>
        <OfficialDataTable
          table={advancement}
          characterLevel={characterLevel}
          compact
        />
      </Panel>

      {extras.map((table) => (
        <Panel key={table.id} title={table.title} subtitle={table.subtitle}>
          <OfficialDataTable table={table} characterLevel={characterLevel} />
        </Panel>
      ))}
    </div>
  )
}
