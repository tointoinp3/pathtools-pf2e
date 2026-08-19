import { useState } from 'react'
import type { Creature } from '@/types/creature'
import { ActionCost } from '@/components/ui/ActionIcon'
import { CombatRollChip } from '@/features/characters/components/CombatRollChip'
import { RichText } from '@/components/ui/RichText'
import { findDamageExpressions } from '@/utils/dice'
import { formatDamageHint, rollCreatureDamage } from '@/features/bestiary/creatureRolls'

/**
 * Habilidade da ficha: texto completo aberto por padrão,
 * com opção de minimizar.
 */
export function CreatureAbilityBlock({
  ability,
  creatureName,
  compact = false,
}: {
  ability: Creature['abilities'][number]
  creatureName: string
  compact?: boolean
}) {
  const [expanded, setExpanded] = useState(true)
  const dice = findDamageExpressions(ability.description)
  const textClass = compact
    ? 'text-[12px] leading-relaxed text-text-muted print:text-[10px] print:text-neutral-800'
    : 'text-[13px] leading-relaxed text-text-muted'

  return (
    <div
      className="rounded-lg border border-border/70 bg-surface-2/30 px-2.5 py-2 print:break-inside-avoid"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-wrap items-center gap-1.5">
          <span className={`font-medium text-text ${compact ? 'text-[13px] print:text-[11px]' : ''}`}>
            {ability.name}
          </span>
          <ActionCost type={ability.actionType} />
          {ability.originalName ? (
            <span className="text-[11px] text-text-dim print:text-neutral-600">
              {ability.originalName}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="print-hidden shrink-0 rounded-md px-2 py-0.5 text-[11px] text-text-dim transition-colors hover:bg-surface-3 hover:text-text"
          aria-expanded={expanded}
        >
          {expanded ? 'Minimizar' : 'Mostrar completa'}
        </button>
      </div>

      <div className={expanded ? 'mt-1' : 'mt-1 hidden print:block'}>
        {ability.frequency ? (
          <p className={`mt-1 ${textClass}`}>
            <span className="font-semibold text-text print:text-black">Frequência</span>{' '}
            {ability.frequency}
          </p>
        ) : null}
        {ability.trigger ? (
          <p className={`mt-1 ${textClass}`}>
            <span className="font-semibold text-text print:text-black">Gatilho</span>{' '}
            {ability.trigger}
          </p>
        ) : null}
        {ability.requirements ? (
          <p className={`mt-1 ${textClass}`}>
            <span className="font-semibold text-text print:text-black">Requisitos</span>{' '}
            {ability.requirements}
          </p>
        ) : null}
        <RichText as="p" className={`mt-1 whitespace-pre-line ${textClass}`}>
          {ability.description}
        </RichText>
        {dice.length > 0 && (
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 print-hidden">
            {dice.map((entry) => (
              <CombatRollChip
                key={entry.raw}
                label={formatDamageHint(entry.raw)}
                title={`${ability.name} · ${entry.raw}`}
                onClick={() =>
                  rollCreatureDamage(creatureName, ability.name, entry.raw)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
