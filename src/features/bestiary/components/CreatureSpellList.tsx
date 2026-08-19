import type { CreatureSpell } from '@/types/creature'
import { groupCreatureSpellsByRank } from '@/engine/creatureSpells'
import { CreatureSpellRow } from '@/features/bestiary/components/CreatureSpellRow'

export function CreatureSpellList({
  spells,
  creatureName,
  alwaysOpen = false,
}: {
  spells: CreatureSpell[]
  creatureName: string
  alwaysOpen?: boolean
}) {
  const groups = groupCreatureSpellsByRank(spells)

  return (
    <div className="space-y-3">
      {groups.map((group) => (
        <div key={group.rank}>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
            {group.label}
          </p>
          <ul className="space-y-1.5">
            {group.spells.map((spell) => (
              <CreatureSpellRow
                key={spell.id}
                spell={spell}
                creatureName={creatureName}
                alwaysOpen={alwaysOpen}
                hideRank
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
