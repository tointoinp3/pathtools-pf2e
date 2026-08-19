import { useEffect, useMemo, useRef, useState } from 'react'
import {
  buildLevelProgression,
  canIncreaseSkillRank,
  countPendingProgressionChoices,
  getClassFeatLevels,
  getSkillRankBeforeIncrease,
  nextProficiencyRank,
  skillIncreaseBlockReason,
  toggleAttributeInBoostSet,
  validateAttributeBoostSet,
  resolveAutomaticBonusProgression,
  type LevelProgressionView,
} from '@/engine'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select } from '@/components/ui/Field'
import type {
  AttributeId,
  Character,
  CharacterClass,
  Feat,
  GrantedFeat,
  LevelAttributeBoostLevel,
  ProficiencyRank,
  SkillId,
  SkillIncreaseEntry,
} from '@/types'
import { ATTRIBUTE_IDS, SKILL_IDS } from '@/types'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  SKILL_LABELS,
} from '@/utils/labels'
import { ActiveFeatCard } from '@/features/feats/components/ActiveFeatCard'

type LevelFilter = 'all' | 'pending' | 'choices'

interface ProgressionPanelProps {
  character: Character
  characterClass?: CharacterClass | null
  feats: Feat[]
  baseSkillRanks: Partial<Record<SkillId, ProficiencyRank>>
  onChangeLevel: (level: number) => void
  onChangeXp: (xp: number) => void
  onChangeLevelBoosts: (
    boosts: NonNullable<Character['levelAttributeBoosts']>,
  ) => void
  onChangeSkillIncreases: (increases: SkillIncreaseEntry[]) => void
  onChooseFeatSlot: (slotId: string) => void
  /** GM Core pág. 84 — slots extras só de arquétipo nos pares. */
  freeArchetype?: boolean
  mythicRules?: boolean
  ancestryParagon?: boolean
  secondClass?: CharacterClass | null
  gradualAbilityBoosts?: boolean
  automaticBonusProgression?: boolean
  onChangeGradualBoosts?: (
    boosts: NonNullable<Character['gradualAttributeBoosts']>,
  ) => void
  onChangeAbpSkills?: (skills: SkillId[]) => void
  onChangeAbpApex?: (attributeId: AttributeId | null) => void
  /** Abre este nível ao vir do checklist (aumentos de atributo/perícia). */
  initialFocusLevel?: number | null
}

export function ProgressionPanel({
  character,
  characterClass,
  feats,
  baseSkillRanks,
  onChangeLevel,
  onChangeXp,
  onChangeLevelBoosts,
  onChangeSkillIncreases,
  onChooseFeatSlot,
  freeArchetype = false,
  mythicRules = false,
  ancestryParagon = false,
  secondClass = null,
  gradualAbilityBoosts = false,
  automaticBonusProgression = false,
  onChangeGradualBoosts,
  onChangeAbpSkills,
  onChangeAbpApex,
  initialFocusLevel = null,
}: ProgressionPanelProps) {
  const [expanded, setExpanded] = useState<number | null>(character.level)
  const [filter, setFilter] = useState<LevelFilter>('all')
  const listRef = useRef<HTMLDivElement>(null)
  const levelRefs = useRef<Map<number, HTMLElement>>(new Map())

  const levels = useMemo(
    () =>
      buildLevelProgression(character, characterClass, {
        freeArchetype,
        mythicRules,
        mythicCallingId: character.mythicCallingId,
        ancestryParagon,
        secondClass,
        gradualAbilityBoosts,
      }),
    [
      character,
      characterClass,
      freeArchetype,
      mythicRules,
      ancestryParagon,
      secondClass,
      gradualAbilityBoosts,
    ],
  )

  const pendingTotal = useMemo(
    () =>
      countPendingProgressionChoices(character, characterClass, {
        freeArchetype,
        mythicRules,
        ancestryParagon,
        secondClass,
        gradualAbilityBoosts,
      }),
    [
      character,
      characterClass,
      freeArchetype,
      mythicRules,
      ancestryParagon,
      secondClass,
      gradualAbilityBoosts,
    ],
  )

  const featById = useMemo(
    () => Object.fromEntries(feats.map((f) => [f.id, f])),
    [feats],
  )

  const selectionBySlot = useMemo(
    () =>
      Object.fromEntries(
        (character.featSelections ?? []).map((s) => [s.slotId, s.featId]),
      ),
    [character.featSelections],
  )

  const filteredLevels = useMemo(() => {
    if (filter === 'pending') {
      return levels.filter((l) => l.status === 'pending')
    }
    if (filter === 'choices') {
      return levels.filter(
        (l) =>
          l.featSlots.length > 0 ||
          l.hasAttributeBoosts ||
          l.hasSkillIncrease,
      )
    }
    return levels
  }, [levels, filter])

  useEffect(() => {
    const target =
      initialFocusLevel != null && initialFocusLevel <= character.level
        ? initialFocusLevel
        : character.level
    setExpanded(target)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToLevel(target))
    })
  }, [character.level, initialFocusLevel])

  function setLevel(next: number) {
    const level = Math.max(1, Math.min(20, next))
    onChangeLevel(level)
    setExpanded(level)
    requestAnimationFrame(() => scrollToLevel(level))
  }

  function scrollToLevel(level: number) {
    const el = levelRefs.current.get(level)
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  function updateBoosts(
    boostLevel: LevelAttributeBoostLevel,
    attrs: AttributeId[],
  ) {
    if (character.level < boostLevel) return
    onChangeLevelBoosts({
      ...(character.levelAttributeBoosts ?? {}),
      [boostLevel]: attrs,
    })
  }

  function setSkillIncrease(level: number, skillId: SkillId | '') {
    if (character.level < level) return
    const rest = (character.skillIncreases ?? []).filter((s) => s.level !== level)
    if (!skillId) {
      onChangeSkillIncreases(rest)
      return
    }
    const from = getSkillRankBeforeIncrease(
      baseSkillRanks,
      rest,
      skillId,
      level,
    )
    if (!canIncreaseSkillRank(from, level)) return
    onChangeSkillIncreases(
      [...rest, { level, skillId }].sort((a, b) => a.level - b.level),
    )
  }

  const firstClassFeatLevel = useMemo(
    () =>
      characterClass ? (getClassFeatLevels(characterClass)[0] ?? null) : null,
    [characterClass],
  )

  const nextPending = levels.find((l) => l.status === 'pending')

  return (
    <div className="animate-fade-up space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-wide text-text">
            Progressão
          </h2>
          <p className="mt-0.5 max-w-xl text-sm text-text-dim">
            Tabela até o nv. 20. Feitos futuros podem ser reservados já.
            Mestre a partir do 7 · Lendário a partir do 15.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
            {pendingTotal > 0 && (
              <button
                type="button"
                onClick={() => {
                  if (!nextPending) return
                  setFilter('all')
                  setExpanded(nextPending.level)
                  scrollToLevel(nextPending.level)
                }}
                className="rounded-lg border border-accent/40 bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/25"
              >
                {pendingTotal} pendente{pendingTotal === 1 ? '' : 's'} · ir
              </button>
            )}
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setFilter('all')
                setExpanded(character.level)
                scrollToLevel(character.level)
              }}
            >
              Ir ao nv. {character.level}
            </Button>
          </div>
      </div>

      {automaticBonusProgression ? (
        <AbpPicker
          level={character.level}
          skills={character.abpSkillPotencies ?? []}
          apex={character.abpApexAttributeId ?? null}
          onChangeSkills={onChangeAbpSkills}
          onChangeApex={onChangeAbpApex}
        />
      ) : null}

      <section className="rounded-xl border border-border/90 bg-surface-1 px-4 py-3">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              Nível atual
            </div>
            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="secondary"
                disabled={character.level <= 1}
                onClick={() => setLevel(character.level - 1)}
              >
                −1
              </Button>
              <div className="min-w-[3.5rem] rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-center font-display text-lg font-semibold tabular-nums text-accent">
                {character.level}
              </div>
              <Button
                size="sm"
                variant="secondary"
                disabled={character.level >= 20}
                onClick={() => setLevel(character.level + 1)}
              >
                +1
              </Button>
            </div>
          </div>
          <Field label="XP" className="w-28">
            <Input
              type="number"
              min={0}
              value={character.xp}
              onChange={(e) =>
                onChangeXp(Math.max(0, Number(e.target.value) || 0))
              }
            />
          </Field>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                ['all', 'Todos'],
                ['choices', 'Com escolha'],
                ['pending', 'Pendentes'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                className={`rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
                  filter === id
                    ? 'border-accent bg-accent/20 text-accent'
                    : 'border-border bg-surface-2 text-text-muted hover:text-text'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {!characterClass && (
            <p className="text-xs text-text-muted">
              Escolha uma classe para ver feitos e aumentos corretos.
            </p>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {levels.map((row) => (
            <button
              key={row.level}
              type="button"
              title={statusTitle(row)}
              onClick={() => {
                setFilter('all')
                setExpanded(row.level)
                scrollToLevel(row.level)
              }}
              className={`h-7 min-w-7 rounded-md border px-1.5 text-[11px] font-semibold tabular-nums transition-all ${
                row.level === character.level
                  ? 'border-accent bg-accent/25 text-accent'
                  : row.status === 'pending'
                    ? 'border-accent/50 bg-accent/10 text-accent'
                    : row.locked
                      ? 'border-border/60 bg-surface-2/40 text-text-dim'
                      : 'border-border bg-surface-2 text-text-muted hover:border-border-strong hover:text-text'
              }`}
            >
              {row.level}
            </button>
          ))}
        </div>
      </section>

      <div ref={listRef} className="space-y-2">
        {filteredLevels.length === 0 && (
          <div className="rounded-xl border border-dashed border-border px-4 py-8 text-center text-sm text-text-dim">
            Nada neste filtro.
            {filter === 'pending' && pendingTotal === 0
              ? ' Todas as escolhas do nível atual estão feitas.'
              : null}
          </div>
        )}

        {filteredLevels.map((row) => {
          const isOpen = expanded === row.level
          const isCurrent = row.level === character.level

          return (
            <article
              key={row.level}
              ref={(el) => {
                if (el) levelRefs.current.set(row.level, el)
                else levelRefs.current.delete(row.level)
              }}
              className={`rounded-xl border transition-colors ${
                isCurrent
                  ? 'border-accent/45 bg-surface-1 shadow-[inset_0_0_0_1px_rgba(212,168,75,0.12)]'
                  : row.locked
                    ? 'border-border/55 bg-surface-1/55'
                    : row.status === 'pending'
                      ? 'border-accent/30 bg-surface-1'
                      : 'border-border/80 bg-surface-1'
              }`}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
                onClick={() => setExpanded(isOpen ? null : row.level)}
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-display text-sm font-semibold tabular-nums ${
                      isCurrent
                        ? 'border-accent/50 bg-accent/15 text-accent'
                        : row.locked
                          ? 'border-border/70 bg-surface-2 text-text-dim'
                          : 'border-border bg-surface-2 text-text'
                    }`}
                  >
                    {row.level}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-medium text-text">
                        Nível {row.level}
                      </span>
                      {isCurrent && (
                        <span className="rounded border border-accent/35 bg-accent/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
                          Atual
                        </span>
                      )}
                      {row.locked && (
                        <span className="rounded border border-border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-text-dim">
                          Bloqueado
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-text-dim">
                      {summarizeLevel(row)}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    row.status === 'pending'
                      ? 'border-accent/40 bg-accent/15 text-accent'
                      : row.status === 'complete'
                        ? 'border-success/40 bg-success/10 text-success'
                        : 'border-border text-text-dim'
                  }`}
                >
                  {row.status === 'locked'
                    ? 'Futuro'
                    : row.status === 'pending'
                      ? `Pendente${row.pendingCount ? ` · ${row.pendingCount}` : ''}`
                      : 'Completo'}
                </span>
              </button>

              {isOpen && (
                <div
                  className={`space-y-2.5 border-t border-border/60 px-3 py-3 ${
                    row.locked ? 'opacity-90' : ''
                  }`}
                >
                  {row.locked && (
                    <div className="rounded-lg border border-border/70 bg-surface-2/40 px-3 py-2 text-[11px] text-text-muted">
                      Preview do nv. {row.level} — ainda não vale na ficha
                      (hoje nv. {character.level}).
                      <button
                        type="button"
                        className="ml-2 text-accent hover:underline"
                        onClick={() => setLevel(row.level)}
                      >
                        Avançar para este nível
                      </button>
                    </div>
                  )}

                  {!row.locked &&
                    row.level === 1 &&
                    firstClassFeatLevel != null &&
                    firstClassFeatLevel > 1 && (
                      <div className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-[11px] text-text-muted">
                        {characterClass?.name ?? 'Esta classe'} não ganha feito de classe
                        no 1º nível (Player Core / AoN). Esse slot aparece
                        quando o personagem chegar no nv.{' '}
                        {firstClassFeatLevel}.
                      </div>
                    )}

                  {row.automaticFeatures.length > 0 && (
                    <div className="rounded-lg border border-border/60 bg-surface-2/30 px-3 py-2">
                      <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                        Recursos automáticos
                      </div>
                      <ul className="grid gap-0.5 text-sm text-text-muted sm:grid-cols-2">
                        {row.automaticFeatures.map((f) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {row.featSlots.map((slot) => {
                    const featId = selectionBySlot[slot.id]
                    const feat = featId ? featById[featId] : null
                    return (
                      <div
                        key={slot.id}
                        className="space-y-1.5 rounded-lg border border-border/70 bg-surface-2/50 px-3 py-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="min-w-0">
                            <div className="text-xs font-medium text-text">
                              {slot.label}
                            </div>
                            {!feat ? (
                              <div className="truncate text-[11px] text-text-dim">
                                {row.locked
                                  ? 'Disponível ao alcançar este nível'
                                  : 'Nenhum feito escolhido'}
                              </div>
                            ) : null}
                          </div>
                          {row.locked ? (
                            <span className="text-[11px] text-text-dim">
                              Ao alcançar este nível
                            </span>
                          ) : (
                            <Button
                              size="sm"
                              variant={feat ? 'secondary' : 'accent'}
                              onClick={() => onChooseFeatSlot(slot.id)}
                            >
                              {feat ? 'Trocar' : 'Escolher'}
                            </Button>
                          )}
                        </div>
                        {feat ? (
                          <ActiveFeatCard feat={featToGranted(feat, slot.label)} />
                        ) : null}
                      </div>
                    )
                  })}

                  {row.hasAttributeBoosts && (
                    <AttributeBoostPicker
                      boostLevel={row.level}
                      selected={row.attributeBoosts}
                      locked={row.locked}
                      needed={gradualAbilityBoosts ? 1 : 4}
                      onToggle={(attr) => {
                        if (gradualAbilityBoosts) {
                          const next = {
                            ...(character.gradualAttributeBoosts ?? {}),
                          }
                          next[row.level] =
                            next[row.level] === attr ? undefined : attr
                          onChangeGradualBoosts?.(next)
                          return
                        }
                        updateBoosts(
                          row.level as LevelAttributeBoostLevel,
                          toggleAttributeInBoostSet(row.attributeBoosts, attr),
                        )
                      }}
                    />
                  )}

                  {row.hasSkillIncrease && (
                    <SkillIncreasePicker
                      level={row.level}
                      selected={row.skillIncrease?.skillId}
                      baseSkillRanks={baseSkillRanks}
                      increases={character.skillIncreases ?? []}
                      locked={row.locked}
                      onChange={(skillId) =>
                        setSkillIncrease(row.level, skillId)
                      }
                    />
                  )}

                  {row.automaticFeatures.length === 0 &&
                    row.featSlots.length === 0 &&
                    !row.hasAttributeBoosts &&
                    !row.hasSkillIncrease && (
                      <p className="text-xs text-text-dim">
                        Sem escolhas extras neste nível
                        {characterClass ? '' : ' (defina a classe)'}.
                      </p>
                    )}
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

function featToGranted(feat: Feat, sourceLabel: string): GrantedFeat {
  return {
    id: feat.id,
    featId: feat.id,
    featName: feat.name,
    originalName: feat.originalName,
    featType: feat.category,
    description: feat.description,
    actionType: feat.actionType,
    traits: feat.traits,
    trigger: feat.trigger,
    frequency: feat.frequency,
    rarity: feat.rarity,
    aonUrl: feat.aonUrl,
    level: feat.level,
    sourceType: 'featSelection',
    sourceId: feat.id,
    sourceLabel,
  }
}

function statusTitle(row: LevelProgressionView): string {
  if (row.status === 'locked') return `Nv. ${row.level} — futuro`
  if (row.status === 'pending') {
    return `Nv. ${row.level} — ${row.pendingCount} pendente(s)`
  }
  return `Nv. ${row.level} — completo`
}

function summarizeLevel(row: LevelProgressionView): string {
  const parts = [
    ...row.automaticFeatures.slice(0, 2),
    ...row.featSlots.map((s) => s.label.split(' · ')[0]),
    row.hasAttributeBoosts ? 'Aumento de atributo' : null,
    row.hasSkillIncrease ? 'Aumento de perícia' : null,
  ].filter(Boolean)
  return parts.length > 0 ? parts.join(' · ') : 'Sem ganhos listados'
}

function AttributeBoostPicker({
  boostLevel,
  selected,
  locked,
  needed = 4,
  onToggle,
}: {
  boostLevel: number
  selected: AttributeId[]
  locked: boolean
  needed?: number
  onToggle: (attr: AttributeId) => void
}) {
  const validation =
    needed === 4
      ? validateAttributeBoostSet(selected)
      : {
          ok: selected.length === needed,
          message:
            selected.length === needed
              ? undefined
              : `Escolha ${needed} atributo.`,
        }

  return (
    <div className="rounded-lg border border-border/70 bg-surface-2/50 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-medium text-text">
          Boosts de atributo · nv. {boostLevel}
        </div>
        {locked && (
          <span className="text-[10px] uppercase tracking-wide text-text-dim">
            Bloqueado
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[11px] text-text-dim">
        {needed === 1
          ? '1 atributo neste nível (variante aumentos graduais). Não repita o mesmo atributo no bloco de quatro níveis.'
          : '4 atributos diferentes (+1 cada). A ficha (PV, CA, perícias…) escala sozinha.'}
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {ATTRIBUTE_IDS.map((attr) => {
          const on = selected.includes(attr)
          return (
            <button
              key={attr}
              type="button"
              disabled={locked}
              title={ATTRIBUTE_LABELS[attr]}
              onClick={() => onToggle(attr)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-45 ${
                on
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
              }`}
            >
              {ATTRIBUTE_ABBREVIATIONS[attr]}
            </button>
          )
        })}
      </div>
      {!locked && (
        <p
          className={`mt-1.5 text-[11px] ${
            validation.ok ? 'text-success' : 'text-text-dim'
          }`}
        >
          {validation.ok
            ? 'Conjunto completo'
            : `${selected.length}/4 · ${validation.message}`}
        </p>
      )}
    </div>
  )
}

function SkillIncreasePicker({
  level,
  selected,
  baseSkillRanks,
  increases,
  locked,
  onChange,
}: {
  level: number
  selected?: SkillId
  baseSkillRanks: Partial<Record<SkillId, ProficiencyRank>>
  increases: SkillIncreaseEntry[]
  locked: boolean
  onChange: (skillId: SkillId | '') => void
}) {
  const masterGate = level < 7
  const legendaryGate = level < 15

  const options = SKILL_IDS.map((skillId) => {
    const from = getSkillRankBeforeIncrease(
      baseSkillRanks,
      increases,
      skillId,
      level,
    )
    const ok = canIncreaseSkillRank(from, level)
    const next = nextProficiencyRank(from)
    const block = skillIncreaseBlockReason(from, level)
    return { skillId, from, next, ok, block }
  })

  const selectedMeta = selected
    ? options.find((o) => o.skillId === selected)
    : null

  return (
    <div className="rounded-lg border border-border/70 bg-surface-2/50 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-medium text-text">
          Aumento de perícia · nv. {level}
        </div>
        {locked && (
          <span className="text-[10px] uppercase tracking-wide text-text-dim">
            Bloqueado
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[11px] text-text-dim">
        Treina uma perícia nova ou sobe o grau.
        {masterGate
          ? ' Mestre só no nv. 7+.'
          : ' Mestre liberado neste nível.'}
        {legendaryGate
          ? ' Lendário só no nv. 15+.'
          : ' Lendário liberado neste nível.'}
      </p>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${
            masterGate
              ? 'border-border text-text-dim'
              : 'border-success/40 bg-success/10 text-success'
          }`}
        >
          Mestre {masterGate ? 'travado' : 'ok'}
        </span>
        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${
            legendaryGate
              ? 'border-border text-text-dim'
              : 'border-success/40 bg-success/10 text-success'
          }`}
        >
          Lendário {legendaryGate ? 'travado' : 'ok'}
        </span>
      </div>

      <div className="mt-2">
        <Select
          value={selected ?? ''}
          disabled={locked}
          onChange={(e) => onChange((e.target.value || '') as SkillId | '')}
        >
          <option value="">
            {locked ? 'Disponível ao alcançar este nível' : 'Escolher perícia…'}
          </option>
          {options.map(({ skillId, from, next, ok, block }) => (
            <option
              key={skillId}
              value={skillId}
              disabled={!ok && selected !== skillId}
            >
              {SKILL_LABELS[skillId]}
              {ok && next
                ? ` (${PROFICIENCY_LABELS[from]} → ${PROFICIENCY_LABELS[next]})`
                : ` (${PROFICIENCY_LABELS[from]}${block ? ` — ${block}` : ''})`}
            </option>
          ))}
        </Select>
      </div>

      {!locked && selectedMeta && (
        <p className="mt-1.5 text-[11px] text-text-muted">
          {selectedMeta.ok && selectedMeta.next
            ? `${SKILL_LABELS[selectedMeta.skillId]}: ${PROFICIENCY_LABELS[selectedMeta.from]} → ${PROFICIENCY_LABELS[selectedMeta.next]}`
            : selectedMeta.block}
        </p>
      )}
    </div>
  )
}

function AbpPicker({
  level,
  skills,
  apex,
  onChangeSkills,
  onChangeApex,
}: {
  level: number
  skills: SkillId[]
  apex: AttributeId | null
  onChangeSkills?: (skills: SkillId[]) => void
  onChangeApex?: (attributeId: AttributeId | null) => void
}) {
  const abp = resolveAutomaticBonusProgression(level)
  const slots = abp.skillPotencySlots

  function toggleSkill(skillId: SkillId) {
    if (!onChangeSkills) return
    const count = skills.filter((id) => id === skillId).length
    if (count >= 3) {
      onChangeSkills(skills.filter((id) => id !== skillId))
      return
    }
    if (skills.length >= slots) {
      const idx = skills.indexOf(skillId)
      if (idx >= 0) {
        const next = [...skills]
        next.splice(idx, 1)
        onChangeSkills(next)
      }
      return
    }
    onChangeSkills([...skills, skillId])
  }

  return (
    <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-accent">
        Progressão automática de bônus
      </div>
      <p className="mt-1 text-[11px] text-text-dim">
        Potência no lugar de runas fundamentais: ataque {abp.attackPotency},
        defesa {abp.defensePotency}, percepção {abp.perceptionPotency},
        salvaguardas {abp.savePotency}. Perícias: {skills.length}/{slots} (máx.
        +3 na mesma).
      </p>
      {slots > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SKILL_IDS.map((skillId) => {
            const n = skills.filter((id) => id === skillId).length
            return (
              <button
                key={skillId}
                type="button"
                onClick={() => toggleSkill(skillId)}
                className={`rounded-lg border px-2 py-1 text-[11px] ${
                  n > 0
                    ? 'border-accent bg-accent/20 text-accent'
                    : 'border-border bg-surface-3 text-text-muted'
                }`}
              >
                {SKILL_LABELS[skillId]}
                {n > 0 ? ` +${n}` : ''}
              </button>
            )
          })}
        </div>
      ) : (
        <p className="mt-1 text-[11px] text-text-dim">
          Primeiro slot de perícia no 5º nível.
        </p>
      )}
      {abp.apex ? (
        <div className="mt-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Ápice automático (17º)
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ATTRIBUTE_IDS.map((attr) => (
              <button
                key={attr}
                type="button"
                onClick={() =>
                  onChangeApex?.(apex === attr ? null : attr)
                }
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                  apex === attr
                    ? 'border-accent bg-accent/20 text-accent'
                    : 'border-border bg-surface-3 text-text-muted'
                }`}
              >
                {ATTRIBUTE_ABBREVIATIONS[attr]}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
