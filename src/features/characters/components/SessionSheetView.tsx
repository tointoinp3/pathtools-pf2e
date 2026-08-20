import type {
  ActiveCondition,
  AttributeId,
  Character,
  ResolvedCharacterSheet,
  ResolvedSpellcastingAccess,
  Spell,
} from '@/types'
import { ATTRIBUTE_IDS, DAMAGE_TYPE_LABELS, type DamageTypeId } from '@/types'
import {
  ANIMAL_SPECIALIZATION_LABELS,
  COMPANION_KIND_LABELS,
  CONSTRUCT_COMPANION_STAGE_LABELS,
} from '@/types/companion'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Badge } from '@/components/ui/Badge'
import { DiceButton } from '@/components/dice/DiceButton'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { Panel, StatBox, StatStrip, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { TraitTipList } from '@/components/ui/TraitTip'
import { CharacterPortraitThumb } from '@/features/characters/components/CharacterPortraitThumb'
import { ActiveFeatCard } from '@/features/feats/components/ActiveFeatCard'
import { MythicPathPanel, isMythicAbilityId } from '@/features/mythic/components/MythicCallingRules'
import { CombatConditionsPanel } from '@/features/characters/components/CombatConditionsPanel'
import {
  DefensesPanel,
  ImmunityLabelList,
} from '@/features/defenses/components/DefensesPanel'
import { SensesPanel } from '@/features/senses/components/SensesPanel'
import { SenseLabelList } from '@/features/senses/components/SenseRulesCard'
import { getConditionDefinition } from '@/data/seeds/conditions'
import {
  ANIMAL_COMPANION_STAGE_RULES,
  ANIMAL_SPECIALIZATION_RULES,
  CONSTRUCT_COMPANION_STAGE_RULES,
} from '@/data/seeds/companionAdvancement'
import {
  CompanionRulesCard,
  SpecificSpecialAbilityCards,
} from '@/features/companions/components/CompanionRulesCard'
import { getConstructModification } from '@/data/seeds/constructCompanions'
import {
  getSpellById,
  primarySpellSourceId,
  resolveFocusMax,
  viewStateForSource,
  formatCoinsCp,
  getFamiliarForm,
  getSpecificFamiliar,
  resolveCompanions,
  type ResolvedFamiliarOrPet,
} from '@/engine'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import {
  stickyNoteSnippet,
  stickyNoteTitle,
  sortStickyNotes,
} from '@/features/characters/stickyNotes'
import { useCompanionStore } from '@/stores/companionStore'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  SIZE_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
  formatModifier,
  formatSpeedBreakdownValue,
  formatSpeedMeters,
} from '@/utils/labels'

const RANK_SHORT = {
  untrained: 'D',
  trained: 'T',
  expert: 'E',
  master: 'M',
  legendary: 'L',
} as const

function extraSpeedDetail(
  breakdown?: Array<{ label: string; value: number | string }>,
): string | undefined {
  const extra = (breakdown ?? []).filter(
    (b) =>
      b.label === 'Escalada' || b.label === 'Natação' || b.label === 'Voo',
  )
  if (extra.length === 0) return undefined
  return extra
    .map((b) => `${b.label} ${formatSpeedBreakdownValue(b.value)}`)
    .join(' · ')
}

function abilityActionType(
  type: string | undefined,
): 'one' | 'two' | 'three' | 'free' | 'reaction' | undefined {
  if (
    type === 'one' ||
    type === 'two' ||
    type === 'three' ||
    type === 'free' ||
    type === 'reaction'
  ) {
    return type
  }
  return undefined
}

function PaperBlank({ width = '3.5rem' }: { width?: string }) {
  return (
    <span
      aria-hidden
      className="mb-px inline-block h-3 border-b border-current print:border-neutral-700"
      style={{ minWidth: width }}
    />
  )
}

function tickMarks(count: number): string {
  return '○'.repeat(Math.min(12, Math.max(0, Math.floor(count))))
}

function hpLine(
  current: number | null | undefined,
  max: number | null | undefined,
): string {
  if (max == null) return '—'
  const now = current == null ? max : Math.min(max, Math.max(0, current))
  return `${now}/${max}`
}

function statNum(value: number | null | undefined, pending?: boolean): string {
  if (pending || value == null) return '—'
  return String(value)
}

function Pips({
  label,
  value,
  max,
  onChange,
}: {
  label: string
  value: number
  max: number
  onChange?: (next: number) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
        {label}
      </span>
      <span className="font-display text-sm font-semibold tabular-nums">
        {value}/{max}
      </span>
      {onChange && max > 0 ? (
        <span className="print-hidden flex gap-0.5">
          {Array.from({ length: max }, (_, i) => {
            const n = i + 1
            const on = n <= value
            return (
              <button
                key={n}
                type="button"
                aria-label={`${label} ${n}`}
                onClick={() => onChange(value === n ? n - 1 : n)}
                className={`h-5 w-5 rounded-full border transition-colors ${
                  on
                    ? 'border-accent bg-accent'
                    : 'border-border bg-surface-3 hover:border-accent/50'
                }`}
              />
            )
          })}
        </span>
      ) : null}
    </div>
  )
}

interface SessionSheetViewProps {
  sheet: ResolvedCharacterSheet
  onCurrentHpChange?: (currentHp: number) => void
  onHeroPointsChange?: (heroPoints: number) => void
  onMythicPointsChange?: (mythicPoints: number) => void
  onFocusPointsChange?: (focusPointsCurrent: number) => void
  onActiveConditionsChange?: (conditions: ActiveCondition[]) => void
}

export function SessionSheetView({
  sheet,
  onCurrentHpChange,
  onHeroPointsChange,
  onMythicPointsChange,
  onFocusPointsChange,
  onActiveConditionsChange,
}: SessionSheetViewProps) {
  const {
    character,
    attributes,
    skills,
    customSkills,
    lores,
    feats,
    senses,
    specialAbilities,
    languages,
    size,
    derived,
    classDc,
    spellcasting,
    equipment,
    resistances,
    weaknesses = [],
    immunities = [],
  } = sheet

  const maxHp = derived.hp.value
  const currentHp =
    maxHp == null
      ? null
      : character.currentHp == null
        ? maxHp
        : Math.min(maxHp, Math.max(0, character.currentHp))

  const mythicActive = Boolean(sheet.mythicActive)
  const pointsMax = mythicActive
    ? (derived.mythicPointsMax?.value ?? 3)
    : (derived.heroPointsMax.value ?? 3)
  const pointsStart = mythicActive
    ? (derived.mythicPointsStart?.value ?? 3)
    : (derived.heroPointsStart.value ?? 1)
  const pointsCurrent = Math.min(
    pointsMax,
    Math.max(
      0,
      mythicActive
        ? (character.mythicPoints ?? pointsStart)
        : (character.heroPoints ?? pointsStart),
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

  const trainedSkills = [
    ...skills
      .filter((s) => s.rank !== 'untrained')
      .map((s) => ({
        key: s.id,
        label: SKILL_LABELS[s.id],
        rank: s.rank,
        modifier: s.modifier,
        breakdown: s.breakdown,
      })),
    ...customSkills
      .filter((s) => s.rank !== 'untrained')
      .map((s) => ({
        key: s.id,
        label: s.name,
        rank: s.rank,
        modifier: s.modifier,
        breakdown: s.breakdown,
      })),
  ].sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))

  const untrainedSkills = skills
    .filter((s) => s.rank === 'untrained')
    .map((s) => ({
      key: s.id,
      label: SKILL_LABELS[s.id],
      modifier: s.modifier,
      breakdown: s.breakdown,
    }))

  const speedHint = extraSpeedDetail(derived.speed.breakdown)
  const slots = spellcasting?.slotsByRank
  const inventory = equipment.items.filter((row) => {
    const id = row.item.id
    if (equipment.armor?.item.id === id) return false
    if (equipment.shield?.item.id === id) return false
    if (equipment.weapons.some((w) => w.item.id === id)) return false
    return true
  })

  const focusMax = spellcasting?.hasAccess
    ? resolveFocusMax(character.spellState, spellcasting)
    : 0
  const focusCurrent = Math.min(
    focusMax,
    Math.max(0, character.spellState?.focusPointsCurrent ?? focusMax),
  )

  const conditionLabels: Array<{ id: string; label: string }> = []
  const seenCondition = new Set<string>()
  for (const entry of character.activeConditions ?? []) {
    const def = getConditionDefinition(entry.conditionId)
    if (!def) continue
    let label = def.name
    if (entry.conditionId === 'persistentDamage') {
      const amount = entry.persistent?.amount?.trim()
      const type = entry.persistent?.damageType
      const typeLabel = type
        ? DAMAGE_TYPE_LABELS[type as DamageTypeId]
        : undefined
      label = ['Dano persistente', amount, typeLabel].filter(Boolean).join(' ')
    } else if (def.valued && entry.value != null) {
      label = `${def.name} ${entry.value}`
    }
    if (entry.conditionId !== 'persistentDamage' && seenCondition.has(def.id)) {
      continue
    }
    if (entry.conditionId !== 'persistentDamage') seenCondition.add(def.id)
    conditionLabels.push({ id: entry.id, label })
  }
  const dying = sheet.conditionEffects?.dying ?? 0
  const wounded = sheet.conditionEffects?.wounded ?? 0
  const doomed = sheet.conditionEffects?.doomed ?? 0
  if (dying && !seenCondition.has('dying')) {
    conditionLabels.push({ id: 'dying', label: `Morrendo ${dying}` })
  }
  if (wounded && !seenCondition.has('wounded')) {
    conditionLabels.push({ id: 'wounded', label: `Ferido ${wounded}` })
  }
  if (doomed && !seenCondition.has('doomed')) {
    conditionLabels.push({ id: 'doomed', label: `Condenado ${doomed}` })
  }

  const notes = sortStickyNotes(character.stickyNotes ?? [])
  const hasCompanions = Boolean(
    character.companions?.animalCompanion ||
      character.companions?.familiarOrPet ||
      character.companions?.constructCompanion ||
      character.companions?.eidolon,
  )

  const nav = [
    { id: 'combate', label: 'Combate' },
    ...(mythicActive ? [{ id: 'mitico', label: 'Mítico' }] : []),
    { id: 'pericias', label: 'Perícias' },
    { id: 'ataques', label: 'Ataques' },
    ...(spellcasting?.hasAccess ? [{ id: 'magia', label: 'Magia' }] : []),
    { id: 'feitos', label: 'Feitos' },
    { id: 'kit', label: 'Kit' },
    ...(hasCompanions ? [{ id: 'companheiros', label: 'Companheiros' }] : []),
    ...(notes.length > 0 ? [{ id: 'anotacoes', label: 'Notas' }] : []),
  ]

  function setHp(next: number) {
    if (maxHp == null) return
    onCurrentHpChange?.(Math.min(maxHp, Math.max(0, next)))
  }

  const defenses = [
    { label: 'Perc', title: 'Percepção', stat: derived.perception },
    { label: 'Fort', title: 'Fortitude', stat: derived.fortitude },
    { label: 'Ref', title: 'Reflexos', stat: derived.reflex },
    { label: 'Von', title: 'Vontade', stat: derived.will },
  ] as const

  return (
    <div className="session-sheet space-y-3 text-text print:space-y-2.5 print:text-black">
      <header className="flex flex-wrap items-end justify-between gap-2 border-b border-accent/40 pb-2 print:border-black">
        <div className="flex min-w-0 items-start gap-3">
          <CharacterPortraitThumb
            portraitId={character.portraitId}
            name={character.name}
            className="h-[4.5rem] w-14 print:h-16 print:w-12"
          />
          <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-wide print:text-xl">
            {character.name}
          </h1>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <Badge tone="accent">Nv. {character.level}</Badge>
            {sheet.ancestryName ? <Badge>{sheet.ancestryName}</Badge> : null}
            {sheet.heritageName ? <Badge>{sheet.heritageName}</Badge> : null}
            {sheet.className ? <Badge>{sheet.className}</Badge> : null}
            {sheet.backgroundName ? (
              <Badge>{sheet.backgroundName}</Badge>
            ) : null}
            {sheet.mythicCallingName ? (
              <Badge tone="accent">{sheet.mythicCallingName}</Badge>
            ) : null}
            {character.playerName ? (
              <Badge>{character.playerName}</Badge>
            ) : null}
          </div>
          </div>
        </div>
        <div className="text-right text-[11px] text-text-dim print:text-neutral-600">
          {size ? SIZE_LABELS[size] : null}
          {derived.speed.value != null ? (
            <div>
              Desloc. {formatSpeedMeters(derived.speed.value)}
              {speedHint ? ` · ${speedHint}` : ''}
            </div>
          ) : null}
          {character.coinsCp ? (
            <div>{formatCoinsCp(character.coinsCp)}</div>
          ) : null}
          {derived.initiative.value != null ? (
            <div className="mt-1 inline-flex items-center justify-end gap-1">
              Ini. {formatModifier(derived.initiative.value)}
              <span className="print-hidden">
                <DiceButton
                  label="Iniciativa"
                  modifier={derived.initiative.value}
                />
              </span>
            </div>
          ) : null}
        </div>
      </header>

      <nav className="print-hidden sticky top-0 z-20 -mx-1 flex flex-wrap gap-1 bg-surface-0/90 px-1 py-2 backdrop-blur">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-md border border-border/70 bg-surface-2/70 px-2 py-1 text-[11px] text-text-muted hover:border-accent/40 hover:text-text"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div id="combate" className="scroll-mt-16">
        <Panel
          compact
          title="Combate"
          subtitle="PV e pontos salvam nesta ficha"
          className="print:break-inside-avoid"
        >
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] font-semibold uppercase text-text-dim">
                    PV
                  </span>
                  {maxHp == null || currentHp == null ? (
                    <span className="text-sm text-text-dim">—</span>
                  ) : (
                    <>
                      <span className="font-display text-2xl font-semibold tabular-nums leading-none">
                        {currentHp}
                      </span>
                      <span className="text-sm text-text-dim">/{maxHp}</span>
                      {derived.tempHp.value ? (
                        <span className="text-[11px] font-medium text-info">
                          +{derived.tempHp.value} temp
                        </span>
                      ) : null}
                    </>
                  )}
                </div>
                {maxHp != null && currentHp != null && onCurrentHpChange ? (
                  <div className="print-hidden flex items-center gap-0.5">
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
                      Cheio
                    </button>
                  </div>
                ) : null}
              </div>
              {maxHp != null ? (
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-3 print:hidden">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              ) : null}
              <div className="mt-2">
                <Pips
                  label={mythicActive ? 'Mítico' : 'Herói'}
                  value={pointsCurrent}
                  max={pointsMax}
                  onChange={onPointsChange}
                />
              </div>
              {focusMax > 0 ? (
                <div className="mt-1.5">
                  <Pips
                    label="Foco"
                    value={focusCurrent}
                    max={focusMax}
                    onChange={onFocusPointsChange}
                  />
                </div>
              ) : null}
              {conditionLabels.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-1">
                  {conditionLabels.map((row) => (
                    <Badge key={row.id} tone="accent">
                      {row.label}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
            <StatStrip className="min-h-[3.25rem]">
              <StatBox
                flush
                label="CA"
                value={statNum(derived.ac.value, derived.ac.pending)}
              />
              {defenses.map((row) => {
                const pending = row.stat.pending || row.stat.value == null
                return (
                  <StatBox
                    key={row.label}
                    flush
                    label={row.label}
                    value={
                      pending ? '—' : formatModifier(row.stat.value as number)
                    }
                    pending={pending}
                    action={
                      pending ? null : (
                        <span className="print-hidden">
                          <DiceButton
                            label={row.title}
                            modifier={row.stat.value as number}
                          />
                        </span>
                      )
                    }
                  />
                )
              })}
            </StatStrip>
          </div>
          {classDc ? (
            <p className="mt-2 text-[11px] text-text-dim">
              CD da classe{' '}
              {classDc.pending || classDc.value == null ? '—' : classDc.value}
              {spellcasting?.hasAccess
                ? ` · Magia ${spellcasting.sources
                    .map((source) => {
                      const attack =
                        source.spellAttack != null
                          ? formatModifier(source.spellAttack)
                          : '—'
                      const dc =
                        source.spellDc != null ? String(source.spellDc) : '—'
                      return `${TRADITION_LABELS[source.tradition]} CD ${dc} / ${attack}`
                    })
                    .join(' · ')}`
                : ''}
            </p>
          ) : null}
          <div className="mt-2 hidden print:block text-[10px] text-neutral-600">
            <p className="flex flex-wrap items-end gap-x-3 gap-y-1">
              {maxHp != null ? <span>PV máx. {maxHp}</span> : null}
              <span className="inline-flex items-end gap-1">
                atuais
                <PaperBlank width="4.5rem" />
              </span>
              <span className="inline-flex items-end gap-1">
                temp
                <PaperBlank width="2.2rem" />
              </span>
              <span>Morrendo ____</span>
              <span>Ferido ____</span>
              <span>Condenado ____</span>
            </p>
          </div>
        </Panel>
        <div className="mt-3">
          <CombatConditionsPanel
            conditions={character.activeConditions ?? []}
            effects={sheet.conditionEffects}
            onChange={onActiveConditionsChange}
          />
        </div>
        <div className="mt-3">
          <DefensesPanel
            immunities={immunities}
            resistances={resistances}
            weaknesses={weaknesses}
          />
        </div>
      </div>

      <Panel compact title="Atributos" className="print:break-inside-avoid">
        <div className="grid grid-cols-3 gap-1 sm:grid-cols-6 print:grid-cols-6">
          {attributes.map((attr) => (
            <div
              key={attr.id}
              className="rounded-lg border border-border/60 px-2 py-1.5 text-center print:rounded-none print:border-neutral-400"
            >
              <div className="text-[9px] font-semibold uppercase text-text-dim print:text-neutral-600">
                {ATTRIBUTE_ABBREVIATIONS[attr.id]}
              </div>
              <div className="font-display text-base font-semibold tabular-nums">
                {formatModifier(attr.modifier)}
              </div>
              <div className="sr-only">{ATTRIBUTE_LABELS[attr.id]}</div>
            </div>
          ))}
        </div>
      </Panel>

      <div id="pericias" className="scroll-mt-16">
        <Panel
          compact
          title="Perícias"
          subtitle={`${trainedSkills.length} treinadas`}
          className="print:break-inside-avoid"
        >
          {trainedSkills.length === 0 && lores.length === 0 ? (
            <p className="text-[11px] text-text-dim">
              Nenhuma perícia treinada ainda.
            </p>
          ) : (
            <ul className="grid gap-x-4 gap-y-0.5 text-[12px] sm:grid-cols-2">
              {trainedSkills.map((s) => (
                <li
                  key={s.key}
                  className="flex items-center justify-between gap-2"
                >
                  <span>
                    {s.label}{' '}
                    <span className="text-text-dim">{RANK_SHORT[s.rank]}</span>
                  </span>
                  <span className="flex items-center">
                    <span className="tabular-nums font-semibold">
                      {formatModifier(s.modifier)}
                    </span>
                    <span className="print-hidden">
                      <DiceButton
                        label={s.label}
                        modifier={s.modifier}
                        breakdown={s.breakdown}
                      />
                    </span>
                  </span>
                </li>
              ))}
              {lores.map((lore) => (
                <li
                  key={lore.id}
                  className="flex items-center justify-between gap-2"
                >
                  <span>
                    Conh. {lore.name}{' '}
                    <span className="text-text-dim">
                      {RANK_SHORT[lore.rank]}
                    </span>
                  </span>
                  <span className="flex items-center">
                    <span className="tabular-nums font-semibold">
                      {formatModifier(lore.modifier)}
                    </span>
                    <span className="print-hidden">
                      <DiceButton
                        label={lore.name}
                        modifier={lore.modifier}
                        breakdown={lore.breakdown}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {untrainedSkills.length > 0 ? (
            <div className="print-hidden mt-2">
              <Panel
                quiet
                compact
                collapsible
                defaultOpen={false}
                title="Não treinadas"
                subtitle="modificador cru"
              >
                <ul className="grid gap-x-4 text-[11px] sm:grid-cols-2">
                  {untrainedSkills.map((s) => (
                    <li
                      key={s.key}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-text-muted">{s.label}</span>
                      <span className="flex items-center">
                        <span className="tabular-nums">
                          {formatModifier(s.modifier)}
                        </span>
                        <DiceButton
                          label={s.label}
                          modifier={s.modifier}
                          breakdown={s.breakdown}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </div>
          ) : null}
        </Panel>
      </div>

      <div id="ataques" className="scroll-mt-16">
        <Panel
          compact
          title="Ataques e defesa"
          className="print:break-inside-avoid"
        >
          {equipment.weapons.length === 0 ? (
            <p className="text-[11px] text-text-dim">Nenhuma arma equipada.</p>
          ) : (
            <ul className="space-y-1.5 text-[12px]">
              {equipment.weapons.map((w) => {
                const pending = w.attackPending || w.attackBonus == null
                return (
                  <li
                    key={`${w.item.id}:${w.definition.id}`}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border/50 bg-surface-2/40 px-2 py-1.5"
                  >
                    <span>
                      <span className="font-medium">{w.displayName}</span>
                      {' · '}
                      {w.damageSummary}
                      {w.combinationMode
                        ? w.combinationMode === 'ranged'
                          ? ' · à distância'
                          : ' · corpo a corpo'
                        : ''}
                      {w.proficiencyRank
                        ? ` · ${PROFICIENCY_LABELS[w.proficiencyRank]}`
                        : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="tabular-nums font-semibold">
                        {pending
                          ? '—'
                          : formatModifier(w.attackBonus as number)}
                      </span>
                      {!pending ? (
                        <span className="print-hidden">
                          <DiceButton
                            label={w.displayName}
                            modifier={w.attackBonus as number}
                          />
                        </span>
                      ) : null}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
          {equipment.armor ? (
            <p className="mt-2 text-[11px]">
              Armadura:{' '}
              {equipment.armor.item.name ?? equipment.armor.definition.name}
              {equipment.armor.itemBonus
                ? ` (+${equipment.armor.itemBonus} item)`
                : ''}
            </p>
          ) : null}
          {equipment.shield ? (
            <p className="text-[11px]">
              Escudo:{' '}
              {equipment.shield.item.name ?? equipment.shield.definition.name}
              {equipment.shieldAcBonus
                ? ` (+${equipment.shieldAcBonus} CA)`
                : ''}
              {` · solidez ${equipment.shield.stats.hardness}`}
              {` · PV ${equipment.shield.stats.hp} (BT ${equipment.shield.stats.bt})`}
              <span className="ml-2 hidden print:inline-flex items-end gap-1 text-neutral-600">
                atuais
                <PaperBlank width="2.8rem" />
              </span>
            </p>
          ) : null}
        </Panel>
      </div>

      {mythicActive ? (
        <div id="mitico" className="scroll-mt-16">
          <MythicPathPanel
            sheet={sheet}
            subtitle="toque para ler gasto, recuperação e anátema"
          />
        </div>
      ) : null}

      {spellcasting?.hasAccess ? (
        <div id="magia" className="scroll-mt-16">
          <SessionMagic
            sheet={sheet}
            spellcasting={spellcasting}
            slots={slots}
            focusCurrent={focusCurrent}
            focusMax={focusMax}
          />
        </div>
      ) : null}

      <div id="feitos" className="scroll-mt-16 space-y-3">
        <Panel
          compact
          title="Feitos"
          subtitle="toque para ler"
          className="print:break-inside-avoid"
        >
          {feats.length === 0 ? (
            <p className="text-[11px] text-text-dim">
              Nenhum feito selecionado.
            </p>
          ) : (
            <div className="space-y-1.5">
              {feats.map((feat) => (
                <ActiveFeatCard key={feat.id} feat={feat} />
              ))}
            </div>
          )}
        </Panel>
        {specialAbilities.filter((ability) => !isMythicAbilityId(ability.id))
          .length > 0 ? (
          <Panel
            compact
            title="Habilidades"
            className="print:break-inside-avoid"
          >
            <div className="space-y-1.5">
              {specialAbilities
                .filter((ability) => !isMythicAbilityId(ability.id))
                .map((ability) => (
                <ExpandableCard
                  key={ability.id}
                  title={ability.name}
                  badges={
                    <ActionCost type={abilityActionType(ability.actionType)} />
                  }
                >
                  {ability.description ? (
                    <RichText>{polishRulesText(ability.description)}</RichText>
                  ) : (
                    <span className="text-text-dim">Sem texto.</span>
                  )}
                </ExpandableCard>
              ))}
            </div>
          </Panel>
        ) : null}
      </div>

      <div id="kit" className="scroll-mt-16">
        <div className="grid gap-3 md:grid-cols-2 print:grid-cols-2">
          <Panel compact title="Sentidos e idiomas">
            <SensesPanel senses={senses} bare />
            {languages.length > 0 ? (
              <p className="mt-2 text-[12px]">{languages.join(', ')}</p>
            ) : null}
          </Panel>
          <Panel compact title="Equipamento">
            {inventory.length === 0 &&
            equipment.weapons.length === 0 &&
            !equipment.armor ? (
              <p className="text-[11px] text-text-dim">Inventário vazio.</p>
            ) : (
              <ul className="flex flex-wrap gap-1">
                {inventory.map((row) => (
                  <li key={row.item.id}>
                    <Badge>
                      {row.item.quantity && row.item.quantity > 1
                        ? `${row.displayName} ×${row.item.quantity}`
                        : row.displayName}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-[10px] text-text-dim">
              Carga {equipment.bulkUsed}/{equipment.bulkLimit}
              {equipment.encumbered ? ' · sobrecarregado' : ''}
            </p>
          </Panel>
        </div>
      </div>

      <SessionCompanions sheet={sheet} />

      {notes.length > 0 ? (
        <div id="anotacoes" className="scroll-mt-16">
          <Panel
            compact
            collapsible
            title="Anotações"
            subtitle={`${notes.length}`}
            className="print:break-inside-avoid"
          >
            <div className="space-y-2">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-lg border border-border/60 bg-surface-2/40 px-2.5 py-2"
                >
                  <div className="text-xs font-semibold text-text">
                    {stickyNoteTitle(note)}
                    {note.pinned ? (
                      <span className="ml-1.5 text-[10px] font-normal text-accent">
                        fixada
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 whitespace-pre-wrap text-[11px] text-text-muted">
                    {note.body.trim() || stickyNoteSnippet(note)}
                  </p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      ) : null}

      <div className="print-hidden">
        <Tip>
          Os botões de dado usam a bandeja da mesa. PV, herói/mítico e foco
          salvam no personagem. Para imprimir, use o botão no topo — os
          controles somem no PDF.
        </Tip>
      </div>
    </div>
  )
}

function SessionMagic({
  sheet,
  spellcasting,
  slots,
  focusCurrent,
  focusMax,
}: {
  sheet: ResolvedCharacterSheet
  spellcasting: ResolvedSpellcastingAccess
  slots?: ResolvedSpellcastingAccess['slotsByRank']
  focusCurrent: number
  focusMax: number
}) {
  const entries = collectSessionSpells(sheet.character, spellcasting)

  return (
    <Panel
      compact
      title="Magia"
      subtitle={spellcasting.sources
        .map((s) => TRADITION_LABELS[s.tradition])
        .join(' · ')}
      className="print:break-inside-avoid"
    >
      <p className="text-[11px] text-text-dim">
        {spellcasting.cantripsPerDay
          ? `Truques ${spellcasting.cantripsPerDay}`
          : ''}
        {spellcasting.autoHeightenRank
          ? `${spellcasting.cantripsPerDay ? ' · ' : ''}altura auto. ${spellcasting.autoHeightenRank}º`
          : ''}
        {focusMax ? ` · foco ${focusCurrent}/${focusMax}` : ''}
      </p>
      {slots ? (
        <ul className="mt-1.5 space-y-0.5 text-[11px] print:text-[10px]">
          {Object.entries(slots)
            .filter(([, n]) => typeof n === 'number' && n > 0)
            .map(([rank, n]) => (
              <li key={rank} className="flex flex-wrap items-baseline gap-2">
                <span className="w-8 shrink-0 tabular-nums">{rank}º</span>
                <span className="tracking-[0.2em]">{tickMarks(Number(n))}</span>
              </li>
            ))}
        </ul>
      ) : null}
      {entries.length > 0 ? (
        <div className="mt-2 space-y-3">
          {groupSessionSpells(entries).map((group) => (
            <div key={group.label}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.entries.map((entry) => (
                  <ExpandableCard
                    key={entry.key}
                    compact
                    title={entry.label}
                    subtitle={`${entry.kind}${
                      entry.expended ? ' · gasta' : ''
                    }`}
                    badges={
                      <>
                        {entry.spell ? (
                          <ActionCost type={entry.spell.actionType} />
                        ) : null}
                        {entry.expended ? (
                          <Badge className="!text-[9px]">gasta</Badge>
                        ) : null}
                      </>
                    }
                  >
                    {entry.spell?.summary || entry.spell?.description ? (
                      <RichText>
                        {entry.spell.summary || entry.spell.description}
                      </RichText>
                    ) : (
                      <span className="text-text-dim">Sem texto no catálogo.</span>
                    )}
                  </ExpandableCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-text-dim">
          Nenhuma magia preparada ou no repertório ainda — monte na aba Magias.
        </p>
      )}
    </Panel>
  )
}

type SessionSpellKind = 'Preparada' | 'Truque' | 'Repertório' | 'Foco' | 'Ritual'

export interface SessionSpellEntry {
  key: string
  label: string
  kind: SessionSpellKind
  rankNum: number
  expended?: boolean
  spell: Spell | null
}

function sessionSpellGroupLabel(entry: SessionSpellEntry): string {
  if (entry.kind === 'Foco') return 'Foco'
  if (entry.kind === 'Ritual') return 'Rituais'
  if (entry.kind === 'Truque' || entry.rankNum <= 0) return 'Truques'
  return `${entry.rankNum}º posto`
}

function groupSessionSpells(
  entries: SessionSpellEntry[],
): Array<{ label: string; sort: number; entries: SessionSpellEntry[] }> {
  const byLabel = new Map<
    string,
    { label: string; sort: number; entries: SessionSpellEntry[] }
  >()
  for (const entry of entries) {
    const label = sessionSpellGroupLabel(entry)
    const sort =
      entry.kind === 'Foco' ? 100 : entry.kind === 'Ritual' ? 101 : entry.rankNum
    const group = byLabel.get(label) ?? { label, sort, entries: [] }
    group.entries.push(entry)
    byLabel.set(label, group)
  }
  return [...byLabel.values()].sort((a, b) => a.sort - b.sort)
}

/** Magias da sessão (preparadas, truques, repertório, foco, rituais). */
export function collectSessionSpells(
  character: Character,
  access: ResolvedSpellcastingAccess,
): SessionSpellEntry[] {
  const state = character.spellState
  const primaryId = primarySpellSourceId(access)
  const items: SessionSpellEntry[] = []
  const seen = new Set<string>()

  function pushSpell(
    key: string,
    kind: SessionSpellEntry['kind'],
    id: string | null | undefined,
    rankNum: number,
    expended?: boolean,
  ) {
    if (!id || seen.has(key)) return
    seen.add(key)
    const raw = getSpellById(id)
    const spell = raw ? withLocalizedSpell(raw) : null
    items.push({
      key,
      label: spell?.name ?? id,
      kind,
      rankNum: spell?.rank ?? rankNum,
      expended,
      spell,
    })
  }

  const sources = access.sources.length ? access.sources : [null]
  for (const source of sources) {
    const view = source
      ? viewStateForSource(state, source.id, primaryId)
      : state
    if (!view) continue
    for (const slot of view.preparedSlots ?? []) {
      pushSpell(
        `p-${source?.id ?? 'main'}-${slot.id}`,
        'Preparada',
        slot.spellId,
        slot.rank,
        slot.expended,
      )
    }
    for (const id of view.cantripIds ?? []) {
      pushSpell(`c-${source?.id ?? 'main'}-${id}`, 'Truque', id, 0)
    }
    if (source?.style === 'spontaneous') {
      for (const id of view.collectionSpellIds ?? []) {
        pushSpell(`r-${source.id}-${id}`, 'Repertório', id, 1)
      }
    }
  }

  for (const id of state?.focusSpellIds ?? []) {
    pushSpell(`f-${id}`, 'Foco', id, 100)
  }
  for (const id of state?.ritualIds ?? []) {
    pushSpell(`rit-${id}`, 'Ritual', id, 101)
  }

  return items
}

function CompanionPaperTrack({
  maxHp,
  shared,
}: {
  maxHp?: number | null
  shared?: boolean
}) {
  if (shared) {
    return (
      <p className="mt-1 hidden text-[10px] text-neutral-600 print:block">
        PV compartilhados — anote no personagem
      </p>
    )
  }

  return (
    <p className="mt-1 hidden flex-wrap items-end gap-x-3 gap-y-1 text-[10px] text-neutral-600 print:flex">
      {maxHp != null ? <span>PV máx. {maxHp}</span> : null}
      <span className="inline-flex items-end gap-1">
        atuais
        <PaperBlank width="4.5rem" />
      </span>
      <span>Morrendo ____</span>
      <span>Ferido ____</span>
    </p>
  )
}

function CompanionAttacks({
  attacks,
}: {
  attacks: Array<{
    id: string
    name: string
    traits: string[]
    attackModifier: number
    damageLabel: string
    damageType: string
  }>
}) {
  if (attacks.length === 0) return null
  return (
    <ul className="mt-1 space-y-0.5 text-[11px] print:text-[10px]">
      {attacks.map((atk) => (
        <li key={atk.id} className="flex flex-wrap items-center gap-1">
          <span className="font-medium">{atk.name}</span>
          {' · '}
          {formatModifier(atk.attackModifier)}
          {' · '}
          {atk.damageLabel} {atk.damageType}
          {atk.traits.length > 0 ? (
            <span className="text-text-dim print:text-neutral-600">
              {' '}
              (<TraitTipList traits={atk.traits} />)
            </span>
          ) : null}
          <span className="print-hidden">
            <DiceButton label={atk.name} modifier={atk.attackModifier} />
          </span>
        </li>
      ))}
    </ul>
  )
}

function CompanionAttrs({
  attributes,
}: {
  attributes: Record<AttributeId, number>
}) {
  return (
    <p className="mt-1 text-[10px] text-text-dim print:text-neutral-600">
      {ATTRIBUTE_IDS.map((id) => (
        <span key={id} className="mr-2">
          {ATTRIBUTE_ABBREVIATIONS[id]} {formatModifier(attributes[id])}
        </span>
      ))}
    </p>
  )
}

function SessionCompanions({ sheet }: { sheet: ResolvedCharacterSheet }) {
  useCompanionStore((s) => s.homebrew)
  const resolved = resolveCompanions(sheet.character.companions, sheet)
  const animal = resolved.animalCompanion
  const familiar = resolved.familiarOrPet
  const construct = resolved.constructCompanion
  const eidolon = resolved.eidolon
  if (!animal && !familiar && !construct && !eidolon) return null

  return (
    <div id="companheiros" className="scroll-mt-16">
      <Panel compact title="Companheiros" className="print:break-inside-avoid">
        <div className="space-y-2.5">
          {animal ? (
            <div className="break-inside-avoid rounded-lg border border-border/70 px-2.5 py-2 print:rounded-none print:border-neutral-400">
              <p className="text-[11px] font-semibold print:text-[10px]">
                {animal.state.name || 'Companheiro'}
                <span className="font-normal text-text-dim print:text-neutral-600">
                  {' · '}
                  {COMPANION_KIND_LABELS.animalCompanion}
                  {animal.stats?.type.name
                    ? ` · ${animal.stats.type.name}`
                    : animal.state.typeLabel
                      ? ` · ${animal.state.typeLabel}`
                      : ''}
                  {` · ${animal.stageLabel}`}
                  {animal.specializationLabel
                    ? ` · ${animal.specializationLabel}`
                    : ''}
                  {animal.stats ? ` · ${animal.stats.sizeLabel}` : ''}
                </span>
              </p>
              <CompanionPaperTrack maxHp={animal.maxHp} />
              {animal.catalogPending || !animal.stats ? (
                <p className="mt-0.5 text-[11px] text-text-dim">
                  Tipo ainda não escolhido — números na ficha completa.
                </p>
              ) : (
                <>
                  <p className="mt-0.5 text-[11px] print:text-[10px]">
                    PV {hpLine(animal.currentHp, animal.maxHp)}
                    {' · '}CA {animal.stats.ac}
                    {' · '}Perc {formatModifier(animal.stats.perception)}
                    {' · '}Fort {formatModifier(animal.stats.fortitude)}
                    {' · '}Ref {formatModifier(animal.stats.reflex)}
                    {' · '}Von {formatModifier(animal.stats.will)}
                    {' · '}
                    {animal.stats.speedLabel}
                  </p>
                  <CompanionAttrs attributes={animal.stats.attributes} />
                  <CompanionAttacks attacks={animal.stats.attacks} />
                  {animal.stats.skillLabel &&
                  animal.stats.skillModifier != null ? (
                    <p className="mt-0.5 text-[10px] text-text-dim print:text-neutral-600">
                      {animal.stats.skillLabel}{' '}
                      {formatModifier(animal.stats.skillModifier)}
                    </p>
                  ) : null}
                  {animal.stats.senses.length > 0 ? (
                    <div className="mt-1">
                      <SenseLabelList labels={animal.stats.senses} />
                    </div>
                  ) : null}
                  {animal.stats.supportBenefit ? (
                    <div className="mt-1">
                      <CompanionRulesCard
                        title="Apoiar"
                        description={animal.stats.supportBenefit}
                      />
                    </div>
                  ) : null}
                  {animal.stats.advancedManeuver ? (
                    <div className="mt-1">
                      <CompanionRulesCard
                        title={animal.stats.advancedManeuver.name}
                        badges={
                          <ActionCost
                            type={animal.stats.advancedManeuver.actionType}
                          />
                        }
                        description={[
                          animal.stats.advancedManeuver.requirements
                            ? `Requisitos: ${animal.stats.advancedManeuver.requirements}`
                            : '',
                          animal.stats.advancedManeuver.description,
                        ]
                          .filter(Boolean)
                          .join('\n\n')}
                      />
                    </div>
                  ) : null}
                  <div className="mt-1">
                    <CompanionRulesCard
                      title={animal.stageLabel}
                      description={
                        ANIMAL_COMPANION_STAGE_RULES[animal.state.stage]
                      }
                    />
                  </div>
                  {animal.state.specialization ? (
                    <div className="mt-1">
                      <CompanionRulesCard
                        title={
                          animal.specializationLabel ??
                          ANIMAL_SPECIALIZATION_LABELS[
                            animal.state.specialization
                          ]
                        }
                        description={
                          ANIMAL_SPECIALIZATION_RULES[
                            animal.state.specialization
                          ]
                        }
                      />
                    </div>
                  ) : null}
                </>
              )}
            </div>
          ) : null}

          {construct ? (
            <div className="break-inside-avoid rounded-lg border border-border/70 px-2.5 py-2 print:rounded-none print:border-neutral-400">
              <p className="text-[11px] font-semibold print:text-[10px]">
                {construct.state.name || 'Construto'}
                <span className="font-normal text-text-dim print:text-neutral-600">
                  {' · '}
                  {COMPANION_KIND_LABELS.constructCompanion}
                  {` · ${construct.stageLabel}`}
                  {` · ${construct.stats.sizeLabel}`}
                </span>
              </p>
              <CompanionPaperTrack maxHp={construct.maxHp} />
              <p className="mt-0.5 text-[11px] print:text-[10px]">
                PV {hpLine(construct.currentHp, construct.maxHp)}
                {' · '}CA {construct.stats.ac}
                {' · '}Perc {formatModifier(construct.stats.perception)}
                {' · '}Fort {formatModifier(construct.stats.fortitude)}
                {' · '}Ref {formatModifier(construct.stats.reflex)}
                {' · '}Von {formatModifier(construct.stats.will)}
                {' · '}
                {construct.stats.speedLabel}
              </p>
              <CompanionAttrs attributes={construct.stats.attributes} />
              <CompanionAttacks attacks={construct.stats.attacks} />
              {construct.stats.skills.length > 0 ? (
                <p className="mt-0.5 text-[10px] text-text-dim print:text-neutral-600">
                  {construct.stats.skills
                    .map((s) => `${s.label} ${formatModifier(s.modifier)}`)
                    .join(', ')}
                </p>
              ) : null}
              {construct.stats.senses.length > 0 ? (
                <div className="mt-1">
                  <SenseLabelList labels={construct.stats.senses} />
                </div>
              ) : null}
              {construct.stats.immunities.length > 0 ? (
                <div className="mt-1">
                  <ImmunityLabelList labels={construct.stats.immunities} />
                </div>
              ) : null}
              <div className="mt-1">
                <CompanionRulesCard
                  title={
                    construct.stageLabel ||
                    CONSTRUCT_COMPANION_STAGE_LABELS[construct.state.stage]
                  }
                  description={
                    CONSTRUCT_COMPANION_STAGE_RULES[construct.state.stage]
                  }
                />
              </div>
              <ConstructSessionMods state={construct.state} />
            </div>
          ) : null}

          {eidolon ? (
            <div className="break-inside-avoid rounded-lg border border-border/70 px-2.5 py-2 print:rounded-none print:border-neutral-400">
              <p className="text-[11px] font-semibold print:text-[10px]">
                {eidolon.state.name || 'Eidolon'}
                <span className="font-normal text-text-dim print:text-neutral-600">
                  {' · '}
                  {COMPANION_KIND_LABELS.eidolon}
                  {eidolon.stats?.type.name
                    ? ` · ${eidolon.stats.type.name}`
                    : eidolon.state.typeLabel
                      ? ` · ${eidolon.state.typeLabel}`
                      : ''}
                  {eidolon.stats ? ` · ${eidolon.stats.sizeLabel}` : ''}
                </span>
              </p>
              <CompanionPaperTrack shared />
              {eidolon.catalogPending || !eidolon.stats ? (
                <p className="mt-0.5 text-[11px] text-text-dim">
                  Tipo ainda não escolhido — números na ficha completa.
                </p>
              ) : (
                <>
                  <p className="mt-0.5 text-[11px] print:text-[10px]">
                    PV compartilhados {hpLine(eidolon.currentHp, eidolon.maxHp)}
                    {' · '}CA {eidolon.stats.ac}
                    {' · '}Perc {formatModifier(eidolon.stats.perception)}
                    {' · '}Fort {formatModifier(eidolon.stats.fortitude)}
                    {' · '}Ref {formatModifier(eidolon.stats.reflex)}
                    {' · '}Von {formatModifier(eidolon.stats.will)}
                    {' · '}
                    {eidolon.stats.speedLabel}
                  </p>
                  <CompanionAttrs attributes={eidolon.stats.attributes} />
                  <CompanionAttacks attacks={eidolon.stats.attacks} />
                  {eidolon.stats.skills.length > 0 ? (
                    <p className="mt-0.5 text-[10px] text-text-dim print:text-neutral-600">
                      {eidolon.stats.skills
                        .map(
                          (s) => `${s.label} ${formatModifier(s.modifier)}`,
                        )
                        .join(', ')}
                    </p>
                  ) : null}
                  {eidolon.stats.senses.length > 0 ? (
                    <div className="mt-1">
                      <SenseLabelList labels={eidolon.stats.senses} />
                    </div>
                  ) : null}
                  <div className="mt-1 space-y-1">
                    <CompanionRulesCard
                      title={eidolon.stats.type.initialAbility.name}
                      subtitle="Inicial"
                      badges={
                        eidolon.stats.type.initialAbility.actionType ? (
                          <ActionCost
                            type={eidolon.stats.type.initialAbility.actionType}
                          />
                        ) : undefined
                      }
                      description={
                        eidolon.stats.type.initialAbility.description
                      }
                    />
                    <CompanionRulesCard
                      title={eidolon.stats.type.symbiosisAbility.name}
                      subtitle="7º · Simbiose"
                      badges={
                        eidolon.stats.type.symbiosisAbility.actionType ? (
                          <ActionCost
                            type={
                              eidolon.stats.type.symbiosisAbility.actionType
                            }
                          />
                        ) : undefined
                      }
                      description={
                        eidolon.stats.type.symbiosisAbility.description
                      }
                    />
                    <CompanionRulesCard
                      title={eidolon.stats.type.transcendenceAbility.name}
                      subtitle="17º · Transcendência"
                      badges={
                        eidolon.stats.type.transcendenceAbility.actionType ? (
                          <ActionCost
                            type={
                              eidolon.stats.type.transcendenceAbility.actionType
                            }
                          />
                        ) : undefined
                      }
                      description={
                        eidolon.stats.type.transcendenceAbility.description
                      }
                    />
                  </div>
                </>
              )}
            </div>
          ) : null}

          {familiar ? <FamiliarSessionBlock familiar={familiar} /> : null}
        </div>
      </Panel>
    </div>
  )
}

function ConstructSessionMods({
  state,
}: {
  state: {
    initialModificationId?: string | null
    breakthroughModificationId?: string | null
    revolutionaryModificationId?: string | null
  }
}) {
  const mods = [
    state.initialModificationId,
    state.breakthroughModificationId,
    state.revolutionaryModificationId,
  ]
    .map((id) => (id ? getConstructModification(id) : null))
    .filter((mod): mod is NonNullable<typeof mod> => Boolean(mod))
  if (mods.length === 0) return null
  return (
    <ul className="mt-1 space-y-1">
      {mods.map((mod) => (
        <li key={mod.id}>
          <CompanionRulesCard
            title={mod.name}
            subtitle={mod.originalName}
            description={mod.description}
          />
        </li>
      ))}
    </ul>
  )
}

function FamiliarSessionBlock({
  familiar,
}: {
  familiar: ResolvedFamiliarOrPet
}) {
  const specific = getSpecificFamiliar(familiar.state.typeId)
  const form = getFamiliarForm(familiar.state.typeId)
  const formName =
    specific?.name ??
    (form && form.id !== 'form-custom' ? form.name : null) ??
    familiar.state.formLabel

  return (
    <div className="break-inside-avoid rounded-lg border border-border/70 px-2.5 py-2 print:rounded-none print:border-neutral-400">
      <p className="text-[11px] font-semibold print:text-[10px]">
        {familiar.state.name || COMPANION_KIND_LABELS[familiar.state.kind]}
        <span className="font-normal text-text-dim print:text-neutral-600">
          {' · '}
          {COMPANION_KIND_LABELS[familiar.state.kind]}
          {formName ? ` · ${formName}` : ''}
        </span>
      </p>
      <CompanionPaperTrack maxHp={familiar.maxHp} />
      <p className="mt-0.5 text-[11px] print:text-[10px]">
        PV {hpLine(familiar.currentHp, familiar.maxHp)}
        {' · '}CA {familiar.ac ?? '—'}
        {' · '}Perc/Acr/Fur{' '}
        {familiar.skillModifier != null
          ? formatModifier(familiar.skillModifier)
          : '—'}
        {' · '}habilidades {familiar.abilitiesUsed}/{familiar.abilitySlots}
      </p>
      {familiar.abilities.length > 0 ? (
        <ul className="mt-1 space-y-1">
          {familiar.abilities.map((entry, index) => (
            <li key={`${entry.selection.abilityId}-${index}`}>
              <CompanionRulesCard
                title={
                  entry.definition?.name ?? entry.selection.abilityId
                }
                subtitle={
                  entry.selection.optionNote ||
                  (entry.selection.innate ? 'Inata' : undefined)
                }
                description={
                  entry.definition?.description ||
                  'Texto desta habilidade ainda não está no catálogo.'
                }
              />
            </li>
          ))}
        </ul>
      ) : null}
      {specific && specific.specialAbilities.length > 0 ? (
        <div className="mt-1">
          <SpecificSpecialAbilityCards abilities={specific.specialAbilities} />
        </div>
      ) : null}
    </div>
  )
}
