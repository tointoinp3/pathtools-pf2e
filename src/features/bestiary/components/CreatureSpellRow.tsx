import { useState } from 'react'
import type { CreatureSpell } from '@/types/creature'
import { ActionCost } from '@/components/ui/ActionIcon'
import { CombatRollChip } from '@/features/characters/components/CombatRollChip'
import { RichText } from '@/components/ui/RichText'
import { TraitTipList } from '@/components/ui/TraitTip'
import { formatModifier } from '@/utils/labels'
import { formatDamageHint, rollCreatureCheck, rollCreatureDamage } from '@/features/bestiary/creatureRolls'
import { resolveCreatureSpell } from '@/engine/creatureSpells'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import { withLocalizedRitual } from '@/features/rituals/localizeRituals'

function Fact({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <p className="text-[12px] leading-snug text-text-muted">
      <span className="font-semibold text-text">{label}</span> {value}
    </p>
  )
}

function rankLabel(rank: number): string {
  return rank === 0 ? 'Truque' : `${rank}º posto`
}

export function CreatureSpellRow({
  spell,
  creatureName,
  alwaysOpen = false,
  hideRank = false,
}: {
  spell: CreatureSpell
  creatureName: string
  alwaysOpen?: boolean
  hideRank?: boolean
}) {
  const [open, setOpen] = useState(alwaysOpen)
  const expanded = alwaysOpen || open
  const resolved = resolveCreatureSpell(spell)
  const catalog = resolved.spell ? withLocalizedSpell(resolved.spell) : null
  const ritual = resolved.ritual ? withLocalizedRitual(resolved.ritual) : null
  const actionType = spell.actionType ?? catalog?.actionType
  const traits = catalog?.traits ?? ritual?.traits ?? []
  const body =
    catalog?.description?.trim() ||
    catalog?.summary?.trim() ||
    ritual?.description?.trim() ||
    ritual?.summary?.trim() ||
    ''

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
        <span className="min-w-0 flex-1 font-medium text-text">{spell.name}</span>
        {actionType ? <ActionCost type={actionType} /> : null}
        {hideRank ? null : (
          <span className="shrink-0 text-[11px] text-text-dim">
            {rankLabel(spell.rank)}
          </span>
        )}
        {ritual ? (
          <span className="text-[11px] text-text-dim">Ritual</span>
        ) : null}
      </button>
      <div
        className={
          expanded
            ? 'space-y-1.5 border-t border-border/50 px-2.5 py-2'
            : 'hidden space-y-1.5 border-t border-border/50 px-2.5 py-2 print:block'
        }
      >
        {traits.length > 0 && (
          <p className="text-[12px] text-text-muted">
            <TraitTipList traits={traits} />
          </p>
        )}
        {resolved.note && !/\(.*\)/.test(spell.name) ? (
          <p className="text-[12px] text-text-dim">{resolved.note}</p>
        ) : null}
        {catalog ? (
          <>
            <Fact label="Requisitos" value={catalog.requirements} />
            <Fact label="Gatilho" value={catalog.trigger} />
            <Fact label="Alcance" value={catalog.range} />
            <Fact label="Área" value={catalog.area} />
            <Fact label="Alvos" value={catalog.targets} />
            <Fact label="Defesa" value={catalog.defense} />
            <Fact label="Duração" value={catalog.duration} />
          </>
        ) : null}
        {ritual ? (
          <>
            <Fact label="Conjuração" value={ritual.castTime} />
            <Fact label="Custo" value={ritual.cost} />
            <Fact label="Teste principal" value={ritual.primaryCheck} />
            <Fact label="Conjuradores secundários" value={ritual.secondaryCasters} />
            <Fact label="Testes secundários" value={ritual.secondaryChecks} />
            <Fact label="Alcance" value={ritual.range} />
            <Fact label="Alvo" value={ritual.target} />
            <Fact label="Duração" value={ritual.duration} />
          </>
        ) : null}
        {catalog && catalog.rank !== spell.rank ? (
          <p className="text-[12px] text-text-dim">
            Nesta ficha: {rankLabel(spell.rank)}
            {catalog.rank === 0 ? ' (truque)' : ` (posto base ${catalog.rank})`}.
          </p>
        ) : null}
        {body ? (
          <RichText
            as="div"
            className="whitespace-pre-line text-[13px] leading-relaxed text-text-muted"
          >
            {body}
          </RichText>
        ) : (
          <p className="text-[12px] text-text-dim">
            Texto desta magia ainda não está no catálogo.
          </p>
        )}
        {(spell.attack != null || spell.dc != null || spell.damage) && (
          <div className="flex flex-wrap items-center gap-1.5 print-hidden">
            {spell.attack != null && (
              <CombatRollChip
                label="Ataque"
                hint={formatModifier(spell.attack)}
                onClick={() =>
                  rollCreatureCheck(creatureName, spell.name, spell.attack ?? 0)
                }
              />
            )}
            {spell.dc != null && (
              <span className="rounded-lg border border-border/70 bg-surface-2/60 px-2 py-1 text-[11px] tabular-nums text-text-muted">
                CD {spell.dc}
              </span>
            )}
            {spell.damage && (
              <CombatRollChip
                label="Dano"
                hint={formatDamageHint(spell.damage)}
                onClick={() =>
                  rollCreatureDamage(creatureName, spell.name, spell.damage ?? '')
                }
              />
            )}
          </div>
        )}
      </div>
    </li>
  )
}
