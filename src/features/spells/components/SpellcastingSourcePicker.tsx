import type { ResolvedSpellcastingSource, Spell } from '@/types'
import { Select } from '@/components/ui/Field'
import {
  resolveItemSpellcastingSourceForSpells,
  sourceMatchesSpellTradition,
  spellSourceCastLabel,
} from '@/engine/spellcasting'

type SpellHint = Pick<Spell, 'traditions'> | null | undefined

export function SpellcastingSourcePicker({
  sources,
  value,
  spell,
  spells,
  onChange,
  mismatchHint,
}: {
  sources: ResolvedSpellcastingSource[]
  value?: string | null
  spell?: SpellHint
  spells?: SpellHint[]
  onChange: (sourceId: string) => void
  mismatchHint?: string
}) {
  if (sources.length < 2) return null
  const hintSpells = spells?.length ? spells : spell ? [spell] : []
  const resolved = resolveItemSpellcastingSourceForSpells(
    sources,
    value,
    hintSpells,
  )
  const mismatch =
    hintSpells.some((entry) => Boolean(entry?.traditions?.length)) &&
    resolved != null &&
    hintSpells.every(
      (entry) =>
        !entry?.traditions?.length ||
        !sourceMatchesSpellTradition(resolved, entry),
    )

  return (
    <div className="min-w-[12rem] flex-1">
      <label className="block">
        <span className="mb-0.5 block text-[10px] text-text-dim">
          Conjurar com
        </span>
        <Select
          className="w-full text-[12px]"
          value={resolved?.id ?? ''}
          onChange={(e) => onChange(e.target.value)}
          aria-label="Fonte de conjuração"
        >
          {sources.map((source) => (
            <option key={source.id} value={source.id}>
              {spellSourceCastLabel(source)}
            </option>
          ))}
        </Select>
      </label>
      {mismatch ? (
        <p className="mt-0.5 text-[10px] text-text-dim">
          {mismatchHint ??
            'Esta magia não está na tradição desta fonte. Use Truque de Item Mágico ou escolha outra.'}
        </p>
      ) : null}
    </div>
  )
}
