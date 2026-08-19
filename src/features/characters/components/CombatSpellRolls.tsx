import type { Spell } from '@/types'
import { formatModifier } from '@/utils/labels'
import { useDiceStore } from '@/stores/diceStore'
import { inferSpellCombat } from '@/features/characters/combatSpellStats'
import {
  CombatRollChip,
  rollParsedFormula,
} from '@/features/characters/components/CombatRollChip'

export function CombatSpellRolls({
  spell,
  displayName,
  attackBonus,
  spellDc,
  attackBreakdown,
}: {
  spell: Spell
  displayName: string
  attackBonus: number | null | undefined
  spellDc: number | null | undefined
  attackBreakdown?: Array<{ label: string; value: number }>
}) {
  const hints = inferSpellCombat(spell)

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {hints.isAttack ? (
        <CombatRollChip
          label="Ataque"
          hint={
            attackBonus != null ? formatModifier(attackBonus) : '—'
          }
          disabled={attackBonus == null}
          title="Ataque de magia desta magia"
          onClick={() => {
            if (attackBonus == null) return
            useDiceStore
              .getState()
              .rollCheck(`Ataque · ${displayName}`, attackBonus, attackBreakdown)
          }}
        />
      ) : null}
      {hints.damageFormula ? (
        <CombatRollChip
          label="Dano"
          hint={hints.damageFormula}
          title={`Dano listado na magia (${hints.damageFormula})`}
          onClick={() =>
            rollParsedFormula(`Dano · ${displayName}`, hints.damageFormula!)
          }
        />
      ) : null}
      {hints.saveLabel && spellDc != null ? (
        <span
          className="rounded-lg border border-border/70 bg-surface-2/60 px-2 py-1 text-[11px] tabular-nums text-text-muted"
          title="O alvo faz o teste contra esta CD"
        >
          CD {spellDc} {hints.saveLabel}
        </span>
      ) : null}
    </div>
  )
}
