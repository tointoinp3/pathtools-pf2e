import { useMemo, useState, type ReactNode } from 'react'
import type {
  ActiveCondition,
  ConditionDefinition,
  ConditionGroup,
  ConditionId,
  DamageTypeId,
  ResolvedConditionEffects,
} from '@/types'
import { DAMAGE_TYPE_IDS, DAMAGE_TYPE_LABELS } from '@/types'
import {
  CONDITION_DEFINITIONS,
  CONDITION_GROUP_LABELS,
  QUICK_CONDITION_IDS,
  getConditionDefinition,
} from '@/data/seeds/conditions'
import { removeCondition, upsertCondition } from '@/engine'
import { Input, Select } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { FilterCount } from '@/components/ui/FilterCount'
import { ConditionRulesCard } from '@/features/conditions/components/ConditionRulesCard'
import { createId } from '@/utils/id'

const GROUP_ORDER: ConditionGroup[] = [
  'penalty',
  'death',
  'actions',
  'senses',
  'control',
  'attitude',
  'other',
]

function actionsThisTurn(effects: ResolvedConditionEffects): string {
  const extra = effects.quickened ? 1 : 0
  const available = Math.max(0, 3 + extra - effects.slowed)
  if (effects.stunned > 0 && effects.stunned >= available) {
    return 'Atordoado — sem ações neste turno'
  }
  if (effects.dying > 0) return 'Morrendo — inconsciente, sem ações'
  const bits = [`${available} ação${available === 1 ? '' : 'ões'}`]
  if (effects.slowed) bits.push(`lentificado ${effects.slowed}`)
  if (effects.quickened) bits.push('acelerado +1')
  if (effects.stunned) bits.push(`atordoado ${effects.stunned}`)
  return bits.join(' · ')
}

function matchesQuery(def: ConditionDefinition, needle: string): boolean {
  if (!needle) return true
  return (
    def.name.toLowerCase().includes(needle) ||
    def.originalName.toLowerCase().includes(needle) ||
    def.summary.toLowerCase().includes(needle) ||
    def.description.toLowerCase().includes(needle)
  )
}

function persistentSubtitle(entry: ActiveCondition): string | undefined {
  const amount = entry.persistent?.amount?.trim()
  const type = entry.persistent?.damageType
  if (!amount && !type) return undefined
  const typeLabel = type ? DAMAGE_TYPE_LABELS[type as DamageTypeId] : undefined
  return [amount, typeLabel].filter(Boolean).join(' ')
}

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number
  min: number
  max: number
  onChange: (next: number) => void
}) {
  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <button
        type="button"
        className="h-6 w-6 rounded border border-border/80 text-xs hover:border-danger/50 hover:text-danger"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span className="w-4 text-center font-display text-sm tabular-nums">
        {value}
      </span>
      <button
        type="button"
        className="h-6 w-6 rounded border border-border/80 text-xs hover:border-success/50 hover:text-success"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  )
}

function ActiveRow({
  entry,
  readOnly,
  onChange,
  onRemove,
}: {
  entry: ActiveCondition
  readOnly: boolean
  onChange: (next: ActiveCondition) => void
  onRemove: () => void
}) {
  const def = getConditionDefinition(entry.conditionId)
  if (!def) return null
  const valued = def.valued
  const persistent = entry.conditionId === 'persistentDamage'

  return (
    <li>
      <ConditionRulesCard
        definition={def}
        value={entry.value}
        subtitle={persistent ? persistentSubtitle(entry) : undefined}
        selected
        actions={
          readOnly ? undefined : (
            <div className="flex items-center gap-1">
              {valued ? (
                <Stepper
                  value={entry.value ?? 1}
                  min={def.minValue ?? 1}
                  max={def.maxValue ?? 4}
                  onChange={(value) => onChange({ ...entry, value })}
                />
              ) : null}
              <button
                type="button"
                className="shrink-0 rounded px-1.5 py-0.5 text-[10px] text-text-dim hover:bg-danger/15 hover:text-danger"
                onClick={onRemove}
              >
                Tirar
              </button>
            </div>
          )
        }
        toolbar={
          persistent ? (
            readOnly ? (
              persistentSubtitle(entry) ? (
                <p className="text-[11px] text-text-muted">
                  {persistentSubtitle(entry)} · no fim do turno, teste plano CD
                  15 (10 com ajuda)
                </p>
              ) : null
            ) : (
              <div className="flex flex-wrap items-center gap-1.5">
                <Input
                  className="w-20 py-0.5 text-xs"
                  value={entry.persistent?.amount ?? ''}
                  placeholder="1d6"
                  onChange={(e) =>
                    onChange({
                      ...entry,
                      persistent: {
                        amount: e.target.value,
                        damageType: entry.persistent?.damageType ?? 'bleed',
                      },
                    })
                  }
                />
                <Select
                  className="w-36 py-0.5 text-xs"
                  value={entry.persistent?.damageType ?? 'bleed'}
                  onChange={(e) =>
                    onChange({
                      ...entry,
                      persistent: {
                        amount: entry.persistent?.amount ?? '1d6',
                        damageType: e.target.value,
                      },
                    })
                  }
                >
                  {DAMAGE_TYPE_IDS.filter((id) => id !== 'untyped').map(
                    (id) => (
                      <option key={id} value={id}>
                        {DAMAGE_TYPE_LABELS[id as DamageTypeId]}
                      </option>
                    ),
                  )}
                </Select>
              </div>
            )
          ) : undefined
        }
      />
    </li>
  )
}

interface CombatConditionsPanelProps {
  conditions: ActiveCondition[]
  effects?: ResolvedConditionEffects
  onChange?: (next: ActiveCondition[]) => void
  readOnly?: boolean
  readOnlyHint?: ReactNode
}

export function CombatConditionsPanel({
  conditions,
  effects,
  onChange,
  readOnly = false,
  readOnlyHint,
}: CombatConditionsPanelProps) {
  const [showAll, setShowAll] = useState(false)
  const [query, setQuery] = useState('')
  const editable = Boolean(onChange) && !readOnly

  const activeIds = useMemo(
    () => new Set(conditions.map((entry) => entry.conditionId)),
    [conditions],
  )

  const catalog = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const source =
      showAll || needle
        ? CONDITION_DEFINITIONS
        : CONDITION_DEFINITIONS.filter((def) =>
            QUICK_CONDITION_IDS.includes(def.id),
          )
    return source.filter((def) => matchesQuery(def, needle))
  }, [query, showAll])

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    items: catalog.filter((def) => def.group === group),
  })).filter((row) => row.items.length > 0)

  const impliedDefs = (effects?.impliedIds ?? [])
    .filter((id) => !activeIds.has(id))
    .map((id) => getConditionDefinition(id))
    .filter((def): def is ConditionDefinition => def != null)

  function add(id: ConditionId) {
    onChange?.(upsertCondition(conditions, id, () => createId('cond')))
  }

  function patch(instanceId: string, next: ActiveCondition) {
    onChange?.(
      conditions.map((entry) => (entry.id === instanceId ? next : entry)),
    )
  }

  if (readOnly && conditions.length === 0 && impliedDefs.length === 0) {
    return null
  }

  return (
    <Panel
      quiet
      compact
      title="Condições"
      subtitle="Player Core · toque no nome para ler · penalidades já entram na CA, salvaguardas e ataques"
    >
      <div className="space-y-2">
        {effects && (effects.notes.length > 0 || conditions.length > 0) ? (
          <Tip>{actionsThisTurn(effects)}</Tip>
        ) : (
          <p className="text-[11px] text-text-dim">
            Marque o que está em você agora. Amedrontado, enjoado, desajeitado e
            similares já mudam os números desta aba e da ficha.
          </p>
        )}

        {readOnlyHint ? <div>{readOnlyHint}</div> : null}

        {conditions.length > 0 ? (
          <ul className="space-y-1.5">
            {conditions.map((entry) => (
              <ActiveRow
                key={entry.id}
                entry={entry}
                readOnly={!editable}
                onChange={(next) => patch(entry.id, next)}
                onRemove={() =>
                  onChange?.(removeCondition(conditions, entry.id))
                }
              />
            ))}
          </ul>
        ) : null}

        {impliedDefs.length > 0 ? (
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              Também (implícitas)
            </p>
            <ul className="space-y-1">
              {impliedDefs.map((def) => (
                <li key={def.id}>
                  <ConditionRulesCard definition={def} implied />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {editable ? (
          <div className="print:hidden space-y-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <Input
                className="min-w-[8rem] flex-1 py-1 text-xs"
                placeholder="Buscar condição…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className={`rounded-lg border px-2 py-1 text-[11px] ${
                  showAll
                    ? 'border-accent/50 bg-accent/15 text-accent'
                    : 'border-border/70 text-text-muted hover:text-text'
                }`}
              >
                {showAll ? 'Catálogo completo' : 'Mais usadas'}
              </button>
              <FilterCount
                shown={catalog.length}
                total={
                  showAll || query.trim()
                    ? CONDITION_DEFINITIONS.length
                    : QUICK_CONDITION_IDS.length
                }
              />
            </div>

            <div className="max-h-96 space-y-2 overflow-y-auto pr-0.5">
              {grouped.map(({ group, items }) => (
                <div key={group}>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                    {CONDITION_GROUP_LABELS[group]}
                  </p>
                  <ul className="space-y-1">
                    {items.map((def) => {
                      const on =
                        activeIds.has(def.id) && def.id !== 'persistentDamage'
                      const canStack = def.id === 'persistentDamage' || def.valued
                      return (
                        <li key={def.id}>
                          <ConditionRulesCard
                            definition={def}
                            selected={on}
                            actions={
                              on && !canStack ? (
                                <span className="text-[10px] font-medium text-accent">
                                  Ativa
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-accent hover:bg-accent/15"
                                  onClick={() => add(def.id)}
                                >
                                  {on && def.valued ? '+1' : 'Adicionar'}
                                </button>
                              )
                            }
                          />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {effects?.notes.length ? (
          <ul className="space-y-0.5 text-[11px] text-text-dim">
            {effects.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Panel>
  )
}
