import type {
  ActiveCondition,
  ActiveItemEffect,
  CharacterClassTrackers,
  CharacterSpellState,
  EquipmentItem,
  ResolvedCharacterSheet,
  ResolvedSpellcastingSource,
} from '@/types'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  formatModifier,
  formatSpeedBreakdownValue,
  formatSpeedMetersValue,
} from '@/utils/labels'
import { calculateProficiencyBonus, spellSourceStatLabel, sumConnectionBonus, traditionLabel } from '@/engine'
import { Button } from '@/components/ui/Button'
import { Panel, StatBox, StatStrip, Tip } from '@/components/ui/Panel'
import { BreakdownTooltip, Tooltip } from '@/components/ui/Tooltip'
import { getConditionDefinition } from '@/data/seeds/conditions'
import { DiceButton } from '@/components/dice/DiceButton'
import { CombatActionsPanel } from '@/features/characters/components/CombatActionsPanel'
import { CombatGearPanel } from '@/features/characters/components/CombatGearPanel'
import { CombatSpellsPanel } from '@/features/characters/components/CombatSpellsPanel'
import { CombatConditionsPanel } from '@/features/characters/components/CombatConditionsPanel'
import { DefensesPanel } from '@/features/defenses/components/DefensesPanel'
import { ClassSignaturePanel } from '@/features/characters/components/ClassSignaturePanel'
import { MythicPathPanel } from '@/features/mythic/components/MythicCallingRules'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'

function extraSpeedDetail(
  breakdown?: Array<{ label: string; value: number | string }>,
): string | undefined {
  const extra = (breakdown ?? []).filter(
    (b) =>
      b.label === 'Escalada' || b.label === 'Natação' || b.label === 'Voo',
  )
  if (extra.length === 0) return undefined
  return extra.map((b) => `${b.label} ${formatSpeedBreakdownValue(b.value)}`).join(' · ')
}

function CombatSourceStats({
  source,
  showLabel,
}: {
  source: ResolvedSpellcastingSource
  showLabel: boolean
}) {
  return (
    <div className={showLabel ? 'mt-2' : 'mt-1.5'}>
      {showLabel && (
        <div className="text-[11px] text-text-muted">
          {source.label}
          <span className="ml-1.5 text-text-dim">
            {spellSourceStatLabel(source)}
          </span>
        </div>
      )}
      <BreakdownTooltip
        className="mt-0.5 block"
        lines={[
          { label: 'Fonte', value: source.label },
          ...(source.proficiencyRank
            ? [
                {
                  label: `Proficiência (${PROFICIENCY_LABELS[source.proficiencyRank]})`,
                  value: formatModifier(source.proficiencyBonus ?? 0),
                },
              ]
            : []),
          ...(source.attributeId
            ? [
                {
                  label: ATTRIBUTE_LABELS[source.attributeId],
                  value: formatModifier(source.attributeModifier ?? 0),
                },
              ]
            : []),
          ...(source.spellAttackExtras ?? []).map((part) => ({
            label: part.label,
            value: formatModifier(part.value),
          })),
          ...(source.spellAttack != null
            ? [
                {
                  label: 'Total',
                  value: formatModifier(source.spellAttack),
                },
              ]
            : []),
        ]}
      >
        <div className="flex items-center justify-between gap-2 text-sm">
          <span>Ataque de magia</span>
          <div className="flex items-center gap-1">
            <span className="font-display text-base font-semibold tabular-nums">
              {source.spellAttack != null
                ? formatModifier(source.spellAttack)
                : '—'}
            </span>
            {source.spellAttack != null && (
              <DiceButton
                label={`Ataque de magia · ${source.label}`}
                modifier={source.spellAttack}
              />
            )}
          </div>
        </div>
      </BreakdownTooltip>
      <BreakdownTooltip
        className="mt-1 block"
        lines={[
          { label: 'Base', value: 10 },
          { label: 'Fonte', value: source.label },
          ...(source.proficiencyRank
            ? [
                {
                  label: `Proficiência (${PROFICIENCY_LABELS[source.proficiencyRank]})`,
                  value: formatModifier(source.proficiencyBonus ?? 0),
                },
              ]
            : []),
          ...(source.attributeId
            ? [
                {
                  label: ATTRIBUTE_LABELS[source.attributeId],
                  value: formatModifier(source.attributeModifier ?? 0),
                },
              ]
            : []),
          ...(source.spellDcExtras ?? []).map((part) => ({
            label: part.label,
            value: part.value,
          })),
          ...(source.spellDc != null
            ? [{ label: 'Total', value: source.spellDc }]
            : []),
        ]}
      >
        <div className="flex items-baseline justify-between gap-2 text-sm">
          <span>CD de magia</span>
          <span className="font-display text-lg font-semibold tabular-nums text-accent">
            {source.spellDc != null ? source.spellDc : '—'}
          </span>
        </div>
      </BreakdownTooltip>
      {source.proficiencyRank && (
        <div className="mt-0.5 text-[11px] text-text-dim">
          {PROFICIENCY_LABELS[source.proficiencyRank]}
          {source.attributeId
            ? ` · ${ATTRIBUTE_ABBREVIATIONS[source.attributeId]} ${formatModifier(source.attributeModifier ?? 0)}`
            : ''}
        </div>
      )}
    </div>
  )
}

function derivedLines(stat: {
  breakdown?: Array<{ label: string; value: number | string }>
  pendingReason?: string
}): Array<{ label: string; value: string | number }> {
  if (stat.breakdown && stat.breakdown.length > 0) {
    return stat.breakdown.map((b) => ({ label: b.label, value: b.value }))
  }
  if (stat.pendingReason) return [{ label: 'Fonte', value: stat.pendingReason }]
  return []
}

interface CombatPanelProps {
  sheet: ResolvedCharacterSheet
  onCurrentHpChange?: (currentHp: number) => void
  onHeroPointsChange?: (heroPoints: number) => void
  onMythicPointsChange?: (mythicPoints: number) => void
  onDismissActiveEffect?: (effectId: string) => void
  onSpendWeaponPoison?: (weaponId: string) => void
  onActivateTalisman?: (hostId: string) => void
  onChangeEquipment?: (items: EquipmentItem[]) => void
  onChangeActiveEffects?: (effects: ActiveItemEffect[]) => void
  onClassTrackersChange?: (classTrackers: CharacterClassTrackers) => void
  onActiveConditionsChange?: (conditions: ActiveCondition[]) => void
  onChangeSpellState?: (spellState: CharacterSpellState) => void
  /** Magias, foco, vínculo e cargas de itens. Não cura PV. */
  onDailyReset?: () => void
}

export function CombatPanel({
  sheet,
  onCurrentHpChange,
  onHeroPointsChange,
  onMythicPointsChange,
  onDismissActiveEffect,
  onSpendWeaponPoison,
  onActivateTalisman,
  onChangeEquipment,
  onChangeActiveEffects,
  onClassTrackersChange,
  onActiveConditionsChange,
  onChangeSpellState,
  onDailyReset,
}: CombatPanelProps) {
  const { character, attributes, derived, attackProficiencies, classDc, extraClassDcs, skills, spellcasting } =
    sheet
  const attrById = Object.fromEntries(
    attributes.map((a) => [a.id, a.modifier]),
  ) as Record<string, number>
  const skillById = Object.fromEntries(skills.map((s) => [s.id, s.modifier]))

  const maxHp = derived.hp.value
  const currentHp =
    maxHp == null
      ? null
      : character.currentHp == null
        ? maxHp
        : Math.min(maxHp, Math.max(0, character.currentHp))

  const mythicActive = Boolean(sheet.mythicActive)
  const heroMax = derived.heroPointsMax.value ?? 3
  const heroStart = derived.heroPointsStart.value ?? 1
  const mythicMax = derived.mythicPointsMax?.value ?? 3
  const mythicStart = derived.mythicPointsStart?.value ?? 3
  const pointsMax = mythicActive ? mythicMax : heroMax
  const pointsStart = mythicActive ? mythicStart : heroStart
  const pointsCurrent = Math.min(
    pointsMax,
    Math.max(
      0,
      mythicActive
        ? (character.mythicPoints ?? mythicStart)
        : (character.heroPoints ?? heroStart),
    ),
  )
  const onPointsChange = mythicActive
    ? onMythicPointsChange
    : onHeroPointsChange

  const pct =
    maxHp != null && currentHp != null
      ? Math.round((currentHp / Math.max(1, maxHp)) * 100)
      : 0
  const barColor =
    pct > 66 ? 'bg-success' : pct > 33 ? 'bg-accent' : 'bg-danger'

  function setHp(next: number) {
    if (maxHp == null) return
    onCurrentHpChange?.(Math.min(maxHp, Math.max(0, next)))
  }

  /**
   * Percepção e salvaguardas só existem com classe. Sem ela, mostrar o
   * modificador de atributo cru passaria um número errado como se fosse o
   * valor final — e o dado rolaria com ele.
   */
  const defenses = [
    { label: 'Perc', title: 'Percepção', stat: derived.perception },
    { label: 'Ini', title: 'Iniciativa', stat: derived.initiative },
    { label: 'Fort', title: 'Fortitude', stat: derived.fortitude },
    { label: 'Ref', title: 'Reflexos', stat: derived.reflex },
    { label: 'Von', title: 'Vontade', stat: derived.will },
  ] as const

  /**
   * Perícias úteis em combate. Percepção e saves ficam na faixa acima —
   * repetir aqui só duplicaria a mesma rolagem na mesma tela.
   */
  const combatSkillRolls: Array<{
    id: 'athletics' | 'acrobatics' | 'intimidation' | 'stealth' | 'deception' | 'medicine'
    label: string
    modifier: number
    hint: string
  }> = [
    {
      id: 'athletics',
      label: 'Atletismo',
      modifier: skillById.athletics ?? attrById.strength ?? 0,
      hint: 'Agarrar, Derrubar, Empurrar, Desarmar',
    },
    {
      id: 'acrobatics',
      label: 'Acrobacia',
      modifier: skillById.acrobatics ?? attrById.dexterity ?? 0,
      hint: 'Passar por Espaço Ameaçado, Equilibrar-se',
    },
    {
      id: 'intimidation',
      label: 'Intimidação',
      modifier: skillById.intimidation ?? attrById.charisma ?? 0,
      hint: 'Desmoralizar',
    },
    {
      id: 'stealth',
      label: 'Furtividade',
      modifier: skillById.stealth ?? attrById.dexterity ?? 0,
      hint: 'Esconder-se, Furtar-se',
    },
    {
      id: 'deception',
      label: 'Enganação',
      modifier: skillById.deception ?? attrById.charisma ?? 0,
      hint: 'Fintar, Criar Diversão',
    },
    {
      id: 'medicine',
      label: 'Medicina',
      modifier: skillById.medicine ?? attrById.wisdom ?? 0,
      hint: 'Tratar Ferimentos, Primeiros Socorros',
    },
  ]

  return (
    <div className="animate-fade-up space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-wide text-text">
            Combate
          </h2>
          <p className="mt-0.5 text-sm text-text-dim">
            PV, defesas, armas, magias e o que você usa no meio da luta.
          </p>
        </div>
        {onDailyReset ? (
          <Button
            size="sm"
            variant="accent"
            onClick={onDailyReset}
            title="Recarrega magias, foco, vínculo e cargas de itens. Não cura PV."
          >
            Preparações diárias
          </Button>
        ) : null}
      </div>

      <StatStrip className="min-h-[3.5rem]">
        <BreakdownTooltip
          className="flex min-w-0 flex-[2] flex-col justify-center"
          lines={(derived.hp.breakdown ?? []).map((b) => ({
            label: b.label,
            value: b.value,
          }))}
        >
          <div className="flex min-w-0 flex-col justify-center gap-1 px-3 py-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs font-semibold uppercase text-text-dim">
                PV{derived.hp.provisional ? '*' : ''}
              </span>
              {maxHp == null || currentHp == null ? (
                <span className="text-sm text-text-dim">—</span>
              ) : (
                <>
                  <span className="font-display text-2xl font-semibold tabular-nums leading-none">
                    {currentHp}
                  </span>
                  <span className="text-sm text-text-dim">/{maxHp}</span>
                  {derived.tempHp.value != null && derived.tempHp.value !== 0 ? (
                    <span className="text-[11px] font-medium text-info">
                      +{derived.tempHp.value} temp
                    </span>
                  ) : null}
                  {sheet.conditionEffects?.dying ? (
                    <Tooltip
                      content={
                        getConditionDefinition('dying')?.summary ??
                        'Inconsciente. Teste de recuperação no turno.'
                      }
                    >
                      <span className="rounded bg-danger/20 px-1 text-[10px] font-semibold text-danger">
                        Morrendo {sheet.conditionEffects.dying}
                      </span>
                    </Tooltip>
                  ) : null}
                  {sheet.conditionEffects?.wounded ? (
                    <Tooltip
                      content={
                        getConditionDefinition('wounded')?.summary ??
                        'Some o valor ao ganhar Morrendo.'
                      }
                    >
                      <span className="rounded bg-accent/20 px-1 text-[10px] font-semibold text-accent">
                        Ferido {sheet.conditionEffects.wounded}
                      </span>
                    </Tooltip>
                  ) : null}
                  {sheet.conditionEffects?.doomed ? (
                    <Tooltip
                      content={
                        getConditionDefinition('doomed')?.summary ??
                        'O máximo de Morrendo cai pelo valor.'
                      }
                    >
                      <span className="rounded bg-danger/15 px-1 text-[10px] font-medium text-danger">
                        Condenado {sheet.conditionEffects.doomed}
                      </span>
                    </Tooltip>
                  ) : null}
                </>
              )}
            </div>
            {maxHp != null && currentHp != null && (
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  className="h-7 w-7 rounded border border-border/80 text-sm hover:border-danger/50 hover:text-danger"
                  onClick={() => setHp(currentHp - 1)}
                >
                  −
                </button>
                <button
                  type="button"
                  className="h-7 w-7 rounded border border-border/80 text-sm hover:border-success/50 hover:text-success"
                  onClick={() => setHp(currentHp + 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="h-7 rounded border border-border/80 px-2 text-[10px] hover:border-accent/50 hover:text-accent"
                  onClick={() => setHp(maxHp)}
                >
                  Full
                </button>
              </div>
            )}
          </div>
          {maxHp != null && (
            <div className="h-2 overflow-hidden rounded-full bg-surface-3">
              <div
                className={`h-full rounded-full ${barColor}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </div>
        </BreakdownTooltip>

        <BreakdownTooltip
          className="flex min-w-0 flex-1"
          lines={[
            ...derivedLines(
              mythicActive
                ? (derived.mythicPointsMax ?? derived.heroPointsMax)
                : derived.heroPointsMax,
            ),
            { label: 'Início de sessão', value: pointsStart },
            ...((mythicActive
              ? derived.mythicPointsStart?.breakdown
              : derived.heroPointsStart.breakdown) ?? [])
              .filter((b) => b.label !== 'Base')
              .map((b) => ({ label: b.label, value: b.value })),
          ]}
        >
          <div className="flex w-full min-w-0 flex-col justify-center gap-1 px-3 py-2">
            <span className="text-xs font-semibold uppercase text-text-dim">
              {mythicActive ? 'Mítico' : 'Herói'}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-xl font-semibold tabular-nums leading-none">
                {pointsCurrent}
              </span>
              <span className="text-sm text-text-dim">/{pointsMax}</span>
            </div>
            {onPointsChange ? (
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  className="h-6 w-6 rounded border border-border/80 text-xs hover:border-danger/50 hover:text-danger"
                  onClick={() =>
                    onPointsChange(Math.max(0, pointsCurrent - 1))
                  }
                >
                  −
                </button>
                <button
                  type="button"
                  className="h-6 w-6 rounded border border-border/80 text-xs hover:border-success/50 hover:text-success"
                  onClick={() =>
                    onPointsChange(Math.min(pointsMax, pointsCurrent + 1))
                  }
                >
                  +
                </button>
                <button
                  type="button"
                  className="h-6 rounded border border-border/80 px-1.5 text-[9px] hover:border-accent/50 hover:text-accent"
                  title={`Começar sessão com ${pointsStart}`}
                  onClick={() => onPointsChange(pointsStart)}
                >
                  Sessão
                </button>
              </div>
            ) : null}
          </div>
        </BreakdownTooltip>

        <BreakdownTooltip
          className="flex min-w-0 flex-1"
          lines={derivedLines(derived.ac)}
          fallback={derived.ac.pendingReason ?? 'Classe de Armadura'}
        >
          <StatBox
            flush
            className="w-full"
            label={derived.ac.provisional ? 'CA*' : 'CA'}
            value={derived.ac.value ?? '—'}
            provisional={derived.ac.provisional}
          />
        </BreakdownTooltip>
        <BreakdownTooltip
          className="flex min-w-0 flex-1"
          lines={derivedLines(derived.speed)}
          fallback="Deslocamento da ancestralidade"
        >
          <StatBox
            flush
            className="w-full"
            label="Vel"
            value={
              derived.speed.value != null
                ? formatSpeedMetersValue(derived.speed.value)
                : '—'
            }
            detail={extraSpeedDetail(derived.speed.breakdown) ?? 'm'}
          />
        </BreakdownTooltip>
        {defenses.map(({ label, title, stat }) => (
          <BreakdownTooltip
            key={label}
            className="flex min-w-0 flex-1"
            lines={derivedLines(stat)}
            fallback={stat.value == null ? 'Escolha uma classe' : title}
          >
            <StatBox
              flush
              className="w-full"
              label={label}
              value={stat.value != null ? formatModifier(stat.value) : '—'}
              detail={stat.value == null ? 'sem classe' : undefined}
              provisional={stat.provisional}
              action={
                stat.value != null ? (
                  <DiceButton label={title} modifier={stat.value} />
                ) : undefined
              }
            />
          </BreakdownTooltip>
        ))}
      </StatStrip>

      {onActiveConditionsChange ? (
        <CombatConditionsPanel
          conditions={sheet.character.activeConditions ?? []}
          effects={sheet.conditionEffects}
          onChange={onActiveConditionsChange}
        />
      ) : null}

      <DefensesPanel
        immunities={sheet.immunities}
        resistances={sheet.resistances}
        weaknesses={sheet.weaknesses}
      />

      {sheet.activeItemEffects?.length > 0 && (
        <Panel compact>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Efeitos ativos
          </p>
          <ul className="mt-1.5 space-y-1.5">
            {sheet.activeItemEffects.map((effect) => (
              <li
                key={effect.id}
                className="rounded-lg border border-border/60 bg-surface-2/50 px-2.5 py-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text">
                      {effect.name}
                      {effect.duration ? (
                        <span className="ml-1 text-[11px] font-normal text-text-dim">
                          · {effect.duration}
                        </span>
                      ) : null}
                    </p>
                    {effect.benefit ? (
                      <p className="mt-0.5 text-[11px] text-text-muted">
                        {polishRulesText(effect.benefit)}
                      </p>
                    ) : null}
                    {effect.drawback ? (
                      <p className="text-[11px] text-text-dim">
                        {polishRulesText(effect.drawback)}
                      </p>
                    ) : null}
                    {effect.notes.map((note) => (
                      <p key={note} className="text-[11px] text-text-dim">
                        {polishRulesText(note)}
                      </p>
                    ))}
                  </div>
                  <div className="flex shrink-0 flex-col gap-1">
                    {effect.endActionLabel && onDismissActiveEffect ? (
                      <button
                        type="button"
                        className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] text-accent hover:bg-accent/20"
                        onClick={() => onDismissActiveEffect(effect.id)}
                      >
                        {effect.endActionLabel}
                      </button>
                    ) : null}
                    {onDismissActiveEffect ? (
                      <button
                        type="button"
                        className="rounded-md border border-border px-2 py-0.5 text-[10px] text-text-dim hover:border-danger/40 hover:text-danger"
                        onClick={() => onDismissActiveEffect(effect.id)}
                      >
                        Encerrar
                      </button>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <CombatGearPanel
        sheet={sheet}
        onChangeEquipment={onChangeEquipment}
        onChangeActiveEffects={onChangeActiveEffects}
        onSpendWeaponPoison={onSpendWeaponPoison}
        onActivateTalisman={onActivateTalisman}
      />

      <CombatSpellsPanel
        sheet={sheet}
        onChangeSpellState={onChangeSpellState}
      />

      <ClassSignaturePanel
        sheet={sheet}
        onClassTrackersChange={onClassTrackersChange}
      />

      <StatStrip>
        {attributes.map((attr) => {
          const lines = attr.contributions.map((c) => ({
            label: c.label,
            value: formatModifier(c.value),
          }))
          lines.push({ label: 'Total', value: formatModifier(attr.modifier) })
          return (
            <BreakdownTooltip
              key={attr.id}
              className="flex min-w-0 flex-1"
              lines={lines}
            >
              <div className="group flex w-full min-w-0 items-center justify-between gap-1 px-2.5 py-2 hover:bg-accent/8">
                <div>
                  <div className="text-xs font-semibold text-text-dim">
                    {ATTRIBUTE_ABBREVIATIONS[attr.id]}
                  </div>
                  <div className="text-xs text-text-dim">
                    {ATTRIBUTE_LABELS[attr.id]}
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="font-display text-xl font-semibold tabular-nums">
                    {formatModifier(attr.modifier)}
                  </span>
                  <DiceButton
                    label={ATTRIBUTE_LABELS[attr.id]}
                    modifier={attr.modifier}
                    breakdown={attr.contributions.map((c) => ({
                      label: c.label,
                      value: c.value,
                    }))}
                  />
                </div>
              </div>
            </BreakdownTooltip>
          )
        })}
      </StatStrip>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel quiet compact title="Perícias em combate">
          <ul className="divide-y divide-border/50">
            {combatSkillRolls.map((roll) => {
              const skill = skills.find((s) => s.id === roll.id)
              const lines: Array<{ label: string; value: string | number }> = []
              for (const source of skill?.rankSources ?? []) {
                lines.push({
                  label: source.label,
                  value: PROFICIENCY_LABELS[source.rank],
                })
              }
              for (const b of skill?.breakdown ?? []) {
                lines.push({ label: b.label, value: formatModifier(b.value) })
              }
              lines.push({ label: 'Total', value: formatModifier(roll.modifier) })
              return (
                <li key={roll.label}>
                  <BreakdownTooltip className="w-full" lines={lines}>
                    <div className="flex items-center justify-between gap-2 py-1.5">
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{roll.label}</div>
                        <div className="text-[10px] text-text-dim">{roll.hint}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-display text-base font-semibold tabular-nums">
                          {formatModifier(roll.modifier)}
                        </span>
                        <DiceButton
                          label={roll.label}
                          modifier={roll.modifier}
                          breakdown={skill?.breakdown}
                        />
                      </div>
                    </div>
                  </BreakdownTooltip>
                </li>
              )
            })}
          </ul>
        </Panel>

        <Panel quiet compact title="Proficiências de ataque">
          {attackProficiencies.length === 0 ? (
            <p className="text-xs text-text-dim">
              Escolha uma classe para ver armas e ataques.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {attackProficiencies.map((p) => (
                <li key={p.key}>
                  <BreakdownTooltip
                    className="w-full"
                    lines={[
                      { label: 'Fonte', value: p.sourceLabel },
                      {
                        label: 'Posto',
                        value: `${PROFICIENCY_LABELS[p.rank]} ${formatModifier(calculateProficiencyBonus(p.rank, character.level))}`,
                      },
                    ]}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span>{p.label}</span>
                      <span className="text-text-muted">
                        {PROFICIENCY_LABELS[p.rank]}
                      </span>
                    </div>
                  </BreakdownTooltip>
                </li>
              ))}
            </ul>
          )}
          {classDc && (
            <BreakdownTooltip
              className="mt-3 block border-t border-border/50 pt-2"
              lines={classDc.breakdown.map((b) => ({
                label: b.label,
                value: String(b.value),
              }))}
              fallback={classDc.pendingReason ?? classDc.label}
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="text-text-dim">{classDc.label}</span>
                  <span className="font-display text-lg font-semibold tabular-nums text-accent">
                    {classDc.value != null ? classDc.value : '—'}
                  </span>
                </div>
                <div className="mt-0.5 text-[11px] text-text-dim">
                  {PROFICIENCY_LABELS[classDc.rank]}
                  {classDc.keyAttributeId
                    ? ` · ${ATTRIBUTE_ABBREVIATIONS[classDc.keyAttributeId]} ${formatModifier(classDc.keyAttributeModifier ?? 0)}`
                    : ''}
                  {classDc.pending && classDc.pendingReason
                    ? ` — ${classDc.pendingReason}`
                    : ''}
                </div>
              </div>
            </BreakdownTooltip>
          )}
          {(extraClassDcs ?? []).map((dc) => (
            <BreakdownTooltip
              key={dc.label}
              className="mt-3 block border-t border-border/50 pt-2"
              lines={[
                { label: 'Base', value: 10 },
                {
                  label: `Proficiência (${PROFICIENCY_LABELS[dc.rank]})`,
                  value: calculateProficiencyBonus(dc.rank, character.level),
                },
                {
                  label: ATTRIBUTE_LABELS[dc.attributeId],
                  value: formatModifier(attrById[dc.attributeId] ?? 0),
                },
                { label: 'Fonte', value: 'Feito / arquétipo' },
                ...(dc.extras ?? []).map((part) => ({
                  label: part.label,
                  value: part.value,
                })),
                { label: 'Total', value: dc.value },
              ]}
            >
              <div>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="text-text-dim">{dc.label}</span>
                  <span className="font-display text-lg font-semibold tabular-nums text-accent">
                    {dc.value}
                  </span>
                </div>
                <div className="mt-0.5 text-[11px] text-text-dim">
                  {PROFICIENCY_LABELS[dc.rank]}
                  {` · ${ATTRIBUTE_ABBREVIATIONS[dc.attributeId]} ${formatModifier(attrById[dc.attributeId] ?? 0)}`}
                  {' — feito / arquétipo'}
                </div>
              </div>
            </BreakdownTooltip>
          ))}
          {spellcasting?.hasAccess && (
            <div className="mt-3 border-t border-border/50 pt-2">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                Conjuração
                {spellcasting.sources.length > 0
                  ? ` · ${[...new Set(spellcasting.sources.map((s) => traditionLabel(s.tradition)))].join(', ')}`
                  : ''}
              </div>
              {spellcasting.sources.map((source) => (
                <CombatSourceStats
                  key={source.id}
                  source={source}
                  showLabel={spellcasting.sources.length > 1}
                />
              ))}
            </div>
          )}
          <BreakdownTooltip
            className="mt-3 block text-[11px] text-text-dim"
            lines={[
              { label: 'Base', value: 5 },
              {
                label: 'Força',
                value: formatModifier(attrById.strength ?? 0),
              },
              ...(sheet.bulkLimit !== 5 + (attrById.strength ?? 0)
                ? sumConnectionBonus(sheet.connections, 'bulk.limit').parts.map(
                    (part) => ({
                      label: `Conexão: ${part.label}`,
                      value: part.value as string | number,
                    }),
                  )
                : []),
              { label: 'Limite', value: sheet.bulkLimit },
            ]}
          >
            <div>
            Carga:{' '}
            <strong className="text-text">
              {sheet.equipment.bulkUsed === 0
                ? '0'
                : Number.isInteger(sheet.equipment.bulkUsed)
                  ? sheet.equipment.bulkUsed
                  : sheet.equipment.bulkUsed.toFixed(1)}{' '}
              / {sheet.bulkLimit}
            </strong>{' '}
            Carga (5 + FOR
            {sheet.bulkLimit !== 5 + (attrById.strength ?? 0)
              ? ' + conexões'
              : ''}
            ).
            {sheet.equipment.investedCount > 0
              ? ` Investidos: ${sheet.equipment.investedCount}/${sheet.equipment.investmentLimit}.`
              : ''}
            </div>
          </BreakdownTooltip>
        </Panel>
      </div>

      <MythicPathPanel sheet={sheet} />

      <CombatActionsPanel sheet={sheet} />

      <Tip>
        Bônus de feitos/itens que a ficha ainda não calcula sozinha entram em{' '}
        <strong>Conexões</strong>: Golpes, dano, iniciativa, perícias, salvaguardas,
        CD, magias, foco, velocidades… Armadura e armas do catálogo já entram
        na CA e nos ataques.
      </Tip>
    </div>
  )
}
