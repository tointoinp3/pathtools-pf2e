import { useState } from 'react'
import type { CreatureAttack } from '@/types/creature'
import { ActionCost } from '@/components/ui/ActionIcon'
import { CombatRollChip } from '@/features/characters/components/CombatRollChip'
import { TraitTipList } from '@/components/ui/TraitTip'
import { formatModifier } from '@/utils/labels'
import { parseDamageExpression } from '@/utils/dice'
import {
  formatDamageHint,
  rollCreatureCheck,
  rollCreatureDamage,
} from '@/features/bestiary/creatureRolls'

const MAP_LABELS = ['1º', '2º', '3º'] as const

export function CreatureAttackRow({
  attack,
  creatureName,
  alwaysOpen = false,
}: {
  attack: CreatureAttack
  creatureName: string
  alwaysOpen?: boolean
}) {
  const [open, setOpen] = useState(alwaysOpen)
  const bonuses = [attack.bonus, attack.map[0], attack.map[1]]
  const canDamage = Boolean(parseDamageExpression(attack.damage))
  const expanded = alwaysOpen || open

  return (
    <li className="rounded-lg border border-border/70 bg-surface-2/40 print:break-inside-avoid">
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => {
          if (!alwaysOpen) setOpen((value) => !value)
        }}
        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm hover:bg-accent/8"
      >
        <span className="w-3 shrink-0 text-[10px] text-text-dim" aria-hidden>
          {alwaysOpen ? '' : expanded ? '▾' : '▸'}
        </span>
        <span className="font-medium text-text">
          {attack.kind === 'melee' ? 'Corpo a corpo' : 'À distância'}
        </span>
        <ActionCost type={attack.actionType} />
        <span className="font-medium text-text">{attack.name}</span>
      </button>
      {expanded && (
        <div className="space-y-2 border-t border-border/50 px-2.5 py-2">
          {attack.traits.length > 0 && (
            <p className="text-[12px] text-text-muted">
              <TraitTipList traits={attack.traits} />
            </p>
          )}
          {attack.plus && attack.plus.length > 0 && (
            <p className="text-[12px] text-text-dim">
              Mais {attack.plus.join(', ')}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-1.5">
            {bonuses.map((bonus, index) => {
              const mapLabel = MAP_LABELS[index] ?? `${index + 1}º`
              return (
                <CombatRollChip
                  key={mapLabel}
                  label={mapLabel}
                  hint={formatModifier(bonus)}
                  title={`1d20 ${formatModifier(bonus)} · ${attack.name} (${mapLabel})`}
                  onClick={() =>
                    rollCreatureCheck(
                      creatureName,
                      `${attack.name} (${mapLabel})`,
                      bonus,
                    )
                  }
                />
              )
            })}
            <CombatRollChip
              label="Dano"
              hint={formatDamageHint(attack.damage)}
              title={attack.damage}
              disabled={!canDamage}
              onClick={() =>
                rollCreatureDamage(
                  creatureName,
                  `Dano · ${attack.name}`,
                  attack.damage,
                )
              }
            />
          </div>
        </div>
      )}
    </li>
  )
}
