import { useMemo, useState } from 'react'
import type {
  CharacterClassTrackers,
  CustomSkillEntry,
  PendingSkillChoice,
  ResolvedCharacterSheet,
  ResolvedCustomSkill,
  ResolvedSkill,
  SkillId,
  GrantedFeatPick,
} from '@/types'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  SAVE_LABELS,
  SIZE_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
  formatModifier,
  formatSpeedBreakdownValue,
  formatSpeedMetersValue,
} from '@/utils/labels'
import { Panel, StatBox, StatStrip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { BreakdownTooltip, Tooltip } from '@/components/ui/Tooltip'
import { Badge } from '@/components/ui/Badge'
import { ActionCost } from '@/components/ui/ActionIcon'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { DiceButton } from '@/components/dice/DiceButton'
import { Input, Select } from '@/components/ui/Field'
import { CustomSkillsEditor } from '@/features/characters/components/CustomSkillsEditor'
import {
  MythicPathPanel,
  isMythicAbilityId,
} from '@/features/mythic/components/MythicCallingRules'
import { CombatConditionsPanel } from '@/features/characters/components/CombatConditionsPanel'
import { ClassSignaturePanel } from '@/features/characters/components/ClassSignaturePanel'
import { DefensesPanel } from '@/features/defenses/components/DefensesPanel'
import { SensesPanel } from '@/features/senses/components/SensesPanel'
import { composeDefenseCard } from '@/data/seeds/defenses'
import { ActiveFeatCard } from '@/features/feats/components/ActiveFeatCard'
import { FeatChoicePicker } from '@/features/feats/components/FeatChoicePicker'
import { ChoiceDetailList } from '@/components/ui/ChoiceDetailList'
import {
  enrichChoiceOptions,
  choiceOptionsHaveText,
} from '@/features/characters/choiceDetails'
import { calculateProficiencyBonus } from '@/engine'
import { alwaysOnCircumstanceStat } from '@/engine/training'
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

interface CharacterSheetViewProps {
  sheet: ResolvedCharacterSheet
  onBackgroundClick?: () => void
  onAncestryClick?: () => void
  onHeritageClick?: () => void
  onClassClick?: () => void
  onDeityClick?: () => void
  onArchetypesClick?: () => void
  onFeatsClick?: () => void
  onCombatClick?: () => void
  onSpellsClick?: () => void
  onEquipmentClick?: () => void
  onCurrentHpChange?: (currentHp: number) => void
  onHeroPointsChange?: (heroPoints: number) => void
  onMythicClick?: () => void
  onMythicPointsChange?: (mythicPoints: number) => void
  onClassTrackersChange?: (classTrackers: CharacterClassTrackers) => void
  onCustomSkillsChange?: (skills: CustomSkillEntry[]) => void
  onSkillChoice?: (
    store: PendingSkillChoice['store'],
    key: string,
    value: string,
  ) => void
  showBreakdown?: boolean
}

function pendingOptionLabel(choice: PendingSkillChoice, id: string): string {
  if (choice.optionLabels?.[id]) return choice.optionLabels[id]
  if (choice.valueKind === 'save' || choice.valueKind === 'saveOrPerception') {
    if (id === 'perception') return 'Percepção'
    return SAVE_LABELS[id as keyof typeof SAVE_LABELS] ?? id
  }
  if (choice.valueKind === 'tradition') {
    return TRADITION_LABELS[id as keyof typeof TRADITION_LABELS] ?? id
  }
  if (choice.valueKind === 'attribute') {
    return ATTRIBUTE_LABELS[id as keyof typeof ATTRIBUTE_LABELS] ?? id
  }
  if (choice.valueKind === 'font') {
    return id === 'heal' ? 'Curar' : id === 'harm' ? 'Ferir' : id
  }
  if (choice.valueKind === 'sanctification') {
    if (id === 'holy') return 'Sagrado'
    if (id === 'unholy') return 'Profano'
    if (id === 'none') return 'Nenhum'
  }
  return SKILL_LABELS[id as SkillId] ?? id
}

function pendingChoicesTitle(choices: PendingSkillChoice[]): string {
  const kinds = new Set(choices.map((c) => c.valueKind ?? 'skill'))
  if (kinds.size === 1 && kinds.has('skill')) return 'Escolha de perícia'
  if (kinds.size === 1 && kinds.has('lore')) return 'Nomeie o Conhecimento'
  if (kinds.size === 1 && kinds.has('language')) return 'Escolha de idioma'
  if (kinds.size === 1 && kinds.has('ancestry')) return 'Ancestralidade adotada'
  if (kinds.size === 1 && kinds.has('save')) return 'Salvaguarda da classe'
  if (kinds.size === 1 && kinds.has('feat')) {
    if (choices.every((choice) => choice.store === 'class')) {
      return 'Feito concedido pela classe'
    }
    return 'Escolha de feito de arquétipo'
  }
  if (choices.every((choice) => choice.store === 'class')) {
    return 'Recursos da classe'
  }
  if (kinds.has('font') || kinds.has('sanctification') || kinds.has('domain')) {
    return 'Escolhas da divindade'
  }
  return 'Escolhas pendentes'
}

function pendingValue(stat: {
  value: number | null
  pending: boolean
}) {
  if (stat.pending || stat.value == null) return '—'
  return String(stat.value)
}

export function CharacterSheetView({
  sheet,
  onBackgroundClick,
  onAncestryClick,
  onHeritageClick,
  onClassClick,
  onDeityClick,
  onArchetypesClick,
  onFeatsClick,
  onCombatClick,
  onSpellsClick,
  onEquipmentClick,
  onCurrentHpChange,
  onHeroPointsChange,
  onMythicClick,
  onMythicPointsChange,
  onClassTrackersChange,
  onCustomSkillsChange,
  onSkillChoice,
  showBreakdown = true,
}: CharacterSheetViewProps) {
  const {
    character,
    attributes,
    skills,
    customSkills,
    lores,
    feats,
    pendingSkillChoices = [],
    archetypes: archetypeProgress,
    derived,
    senses,
    specialAbilities,
    resistances,
    weaknesses = [],
    immunities = [],
    languages,
    languageSlotBonus = 0,
    size,
    baseSize,
    sizeShift,
    sizeBreakdown,
    activeItemEffects = [],
  } = sheet
  const [skillFilter, setSkillFilter] = useState('')
  const [showUntrained, setShowUntrained] = useState(true)

  const tableAbilities = useMemo(() => {
    const featByName = new Map(
      feats.map((feat) => [
        feat.featName.trim().toLowerCase(),
        (feat.description ?? '').trim().toLowerCase(),
      ]),
    )
    return specialAbilities.filter((ability) => {
      if (ability.id.startsWith('catalog-')) return false
      if (sheet.mythicActive && isMythicAbilityId(ability.id)) return false
      const featText = featByName.get(ability.name.trim().toLowerCase())
      if (featText == null) return true
      const body = ability.description.trim().toLowerCase()
      if (!body) return false
      if (!featText) return true
      if (body === featText || featText.includes(body) || body.includes(featText)) {
        return false
      }
      return true
    })
  }, [feats, specialAbilities, sheet.mythicActive])

  const attrById = useMemo(
    () =>
      Object.fromEntries(attributes.map((a) => [a.id, a.modifier])) as Record<
        string,
        number
      >,
    [attributes],
  )

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

  const trainedSkillCount = useMemo(
    () =>
      skills.filter((s) => s.rank !== 'untrained').length +
      customSkills.filter((s) => s.rank !== 'untrained').length +
      lores.length,
    [skills, customSkills, lores],
  )

  const xpToLevel = 1000
  const xpProgress = Math.min(100, Math.round((character.xp / xpToLevel) * 100))

  const filteredSkills = useMemo(() => {
    const q = skillFilter.trim().toLowerCase()
    let list = skills
    if (!showUntrained) list = list.filter((s) => s.rank !== 'untrained')
    if (q) list = list.filter((s) => SKILL_LABELS[s.id].toLowerCase().includes(q))
    return [...list].sort((a, b) => {
      const rankOrder = {
        legendary: 0,
        master: 1,
        expert: 2,
        trained: 3,
        untrained: 4,
      } as const
      const diff = rankOrder[a.rank] - rankOrder[b.rank]
      if (diff !== 0) return diff
      return SKILL_LABELS[a.id].localeCompare(SKILL_LABELS[b.id], 'pt-BR')
    })
  }, [skills, skillFilter, showUntrained])

  const filteredCustom = useMemo(() => {
    const q = skillFilter.trim().toLowerCase()
    let list = customSkills
    if (!showUntrained) list = list.filter((s) => s.rank !== 'untrained')
    if (q) list = list.filter((s) => s.name.toLowerCase().includes(q))
    return [...list].sort(
      (a, b) =>
        a.name.localeCompare(b.name, 'pt-BR'),
    )
  }, [customSkills, skillFilter, showUntrained])

  const untrainedCount = skills.filter((s) => s.rank === 'untrained').length

  return (
    <div className="character-sheet-print space-y-2 animate-fade-up">
      {/* Header compacto */}
      <section className="rounded-xl border border-border/90 bg-surface-1 px-3 py-2.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="font-display text-xl font-semibold tracking-wide text-text">
            {character.name}
          </h2>
          {character.identity?.concept ? (
            <span className="text-sm text-text-muted">
              {character.identity.concept}
            </span>
          ) : null}
          <span className="rounded-full border border-accent/35 bg-accent/15 px-2 py-0.5 text-[11px] font-semibold text-accent">
            Nv. {character.level}
          </span>
          <span className="text-[11px] text-text-dim">
            {trainedSkillCount} treinada(s)
          </span>
          {languages.length > 0 && (
            <Tooltip
              content={`Idiomas: ${languages.join(', ')}${
                languageSlotBonus > 0
                  ? `\n+${languageSlotBonus} slot(s) extra(s) de conexões`
                  : ''
              }`}
            >
              <span className="text-[11px] text-text-dim">
                {languages.join(', ')}
              </span>
            </Tooltip>
          )}
          {immunities.map((immunity) => {
            const card = composeDefenseCard({
              kind: 'immunity',
              type: immunity.kind,
              label: immunity.label,
            })
            return (
              <BreakdownTooltip
                key={immunity.id}
                lines={[
                  { label: 'Efeito', value: card.summary },
                  ...immunity.sources.map((source) => ({
                    label: 'Fonte',
                    value: source.label,
                  })),
                ]}
              >
                <Badge tone="info" className="!text-[9px]">
                  {immunity.label}
                </Badge>
              </BreakdownTooltip>
            )
          })}
          {resistances.map((r) => {
            const card = composeDefenseCard({
              kind: 'resistance',
              type: r.damageType,
              value: r.value,
              label: r.label,
            })
            return (
              <BreakdownTooltip
                key={r.id}
                lines={[
                  { label: 'Efeito', value: card.summary },
                  { label: 'Fonte', value: r.sourceLabel },
                  ...r.breakdown.map((b) => ({
                    label: b.label,
                    value: b.value,
                  })),
                  { label: 'Total', value: r.value },
                ]}
              >
                <Badge tone="success" className="!text-[9px]">
                  {r.label} {r.value}
                </Badge>
              </BreakdownTooltip>
            )
          })}
          {weaknesses.map((r) => {
            const card = composeDefenseCard({
              kind: 'weakness',
              type: r.damageType,
              value: r.value,
              label: r.label,
            })
            return (
              <BreakdownTooltip
                key={r.id}
                lines={[
                  { label: 'Efeito', value: card.summary },
                  { label: 'Fonte', value: r.sourceLabel },
                  ...r.breakdown.map((b) => ({
                    label: b.label,
                    value: b.value,
                  })),
                  { label: 'Total', value: r.value },
                ]}
              >
                <Badge className="!text-[9px] border-danger/40 bg-danger/10 text-danger">
                  {r.label} {r.value}
                </Badge>
              </BreakdownTooltip>
            )
          })}
          <div className="ml-auto flex min-w-[8rem] items-center gap-2">
            <BreakdownTooltip
              lines={[
                ...(mythicActive
                  ? derivedLines(derived.mythicPointsMax ?? derived.heroPointsMax)
                  : derivedLines(derived.heroPointsMax)),
                {
                  label: 'Início de sessão',
                  value: pointsStart,
                },
                ...((mythicActive
                  ? derived.mythicPointsStart?.breakdown
                  : derived.heroPointsStart.breakdown) ?? [])
                  .filter((b) => b.label !== 'Base')
                  .map((b) => ({ label: b.label, value: b.value })),
              ]}
            >
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-[10px] text-text-dim">
                  {mythicActive ? 'Mítico' : 'Herói'}
                </span>
                <span className="font-display text-sm font-semibold tabular-nums text-text">
                  {pointsCurrent}/{pointsMax}
                </span>
                {onPointsChange ? (
                  <span className="flex items-center gap-0.5">
                    <button
                      type="button"
                      className="h-5 w-5 rounded border border-border/80 text-[10px] hover:border-danger/50 hover:text-danger"
                      onClick={() =>
                        onPointsChange(Math.max(0, pointsCurrent - 1))
                      }
                    >
                      −
                    </button>
                    <button
                      type="button"
                      className="h-5 w-5 rounded border border-border/80 text-[10px] hover:border-success/50 hover:text-success"
                      onClick={() =>
                        onPointsChange(Math.min(pointsMax, pointsCurrent + 1))
                      }
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="h-5 rounded border border-border/80 px-1 text-[9px] hover:border-accent/50 hover:text-accent"
                      title={`Começar sessão com ${pointsStart}`}
                      onClick={() => onPointsChange(pointsStart)}
                    >
                      Sessão
                    </button>
                  </span>
                ) : null}
              </div>
            </BreakdownTooltip>
            <span className="whitespace-nowrap text-[10px] text-text-dim">
              XP {character.xp}/{xpToLevel}
            </span>
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full bg-accent/80"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-stretch gap-2">
          <BreakdownTooltip
            className="block min-w-[9.5rem]"
            lines={
              sizeBreakdown.length > 0
                ? sizeBreakdown.map((p) => ({
                    label: p.label,
                    value: p.value > 0 ? `+${p.value}` : p.value,
                  }))
                : []
            }
            fallback="Tamanho da ancestralidade"
          >
          <div
            className={`rounded-lg border px-2.5 py-1.5 ${
              sizeShift !== 0
                ? 'border-accent/40 bg-accent/10'
                : 'border-border/70 bg-surface-2/50'
            }`}
          >
            <div className="text-xs font-semibold uppercase tracking-wide text-text-dim">
              Tamanho
            </div>
            {size ? (
              <>
                <div className="font-display text-base font-semibold leading-tight text-text">
                  {SIZE_LABELS[size]}
                </div>
                <div className="mt-0.5 text-[10px] text-text-dim">
                  {baseSize && sizeShift !== 0 ? (
                    <>
                      Base {SIZE_LABELS[baseSize]}
                      <span className="text-accent">
                        {' '}
                        ({sizeShift > 0 ? `+${sizeShift}` : sizeShift} cat.)
                      </span>
                    </>
                  ) : baseSize ? (
                    <>Da ancestralidade</>
                  ) : (
                    <>Efetivo</>
                  )}
                </div>
              </>
            ) : (
              <div className="text-sm text-text-dim">
                Escolha uma ancestralidade
              </div>
            )}
          </div>
          </BreakdownTooltip>

          <div className="flex min-w-0 flex-1 flex-wrap content-start gap-1">
            <PathPill
              label="Ancestralidade"
              value={sheet.ancestryName}
              empty="Escolher…"
              onClick={onAncestryClick}
            />
            <PathPill
              label="Herança"
              value={sheet.heritageName}
              empty={sheet.ancestryName ? 'Escolher…' : '—'}
              onClick={onHeritageClick}
            />
            <PathPill
              label="Origem"
              value={sheet.backgroundName}
              empty="Escolher…"
              onClick={onBackgroundClick}
            />
            <PathPill
              label="Classe"
              value={sheet.className}
              empty="Escolher…"
              onClick={onClassClick}
            />
            <PathPill
              label="Divindade"
              value={sheet.deityName}
              empty="Escolher…"
              onClick={onDeityClick}
            />
            {onMythicClick && (
              <PathPill
                label="Mítico"
                value={sheet.mythicCallingName}
                empty="Chamado…"
                onClick={onMythicClick}
              />
            )}
            <PathPill
              label="Arquétipos"
              value={
                archetypeProgress.length > 0
                  ? `${archetypeProgress.length} ativo${archetypeProgress.length === 1 ? '' : 's'}`
                  : undefined
              }
              empty="Dedicação…"
              onClick={onArchetypesClick}
            />
            <PathPill
              label="Feitos"
              value={
                feats.length > 0
                  ? `${feats.length} ativo${feats.length === 1 ? '' : 's'}`
                  : undefined
              }
              empty="Gerenciar…"
              onClick={onFeatsClick}
            />
            {onCombatClick && (
              <PathPill
                label="Combate"
                value="Mesa"
                empty="Abrir…"
                onClick={onCombatClick}
              />
            )}
            {onSpellsClick && (
              <PathPill
                label="Magias"
                value="Grimório"
                empty="Abrir…"
                onClick={onSpellsClick}
              />
            )}
            {onEquipmentClick && (
              <PathPill
                label="Equipamento"
                value="Inventário"
                empty="Abrir…"
                onClick={onEquipmentClick}
              />
            )}
          </div>
        </div>
      </section>

      {pendingSkillChoices.length > 0 && (
        <div className="rounded-xl border border-accent/40 bg-accent/8 px-3 py-2">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
            {pendingChoicesTitle(pendingSkillChoices)}
          </p>
          <div className="flex flex-col gap-2">
            {pendingSkillChoices.map((choice) => {
              if (choice.valueKind === 'feat') {
                const pick: GrantedFeatPick = {
                  key: choice.key,
                  parentFeatId: choice.key,
                  parentName: choice.label,
                  hint: choice.hint,
                  selectedFeatId: choice.selected,
                  options: choice.featOptions ?? [],
                }
                return (
                  <div key={`${choice.store}-${choice.key}`}>
                    <FeatChoicePicker
                      pick={pick}
                      compact
                      onChange={(featId) =>
                        onSkillChoice?.(choice.store, choice.key, featId)
                      }
                    />
                  </div>
                )
              }
              if (choice.options.length > 0) {
                const details = enrichChoiceOptions(
                  choice.options.map((id) => ({
                    id,
                    name: pendingOptionLabel(choice, id),
                    originalName: id,
                    description: choice.optionDescriptions?.[id],
                  })),
                )
                if (
                  choiceOptionsHaveText(details) ||
                  Boolean(choice.optionDescriptions)
                ) {
                  return (
                    <div
                      key={`${choice.store}-${choice.key}`}
                      className="space-y-1"
                    >
                      <p className="text-xs font-medium text-text">
                        {choice.label}
                      </p>
                      <ChoiceDetailList
                        hint={choice.hint}
                        options={details}
                        selectedId={choice.selected}
                        onSelect={(id) =>
                          onSkillChoice?.(choice.store, choice.key, id)
                        }
                      />
                    </div>
                  )
                }
              }
              return (
                <label
                  key={`${choice.store}-${choice.key}`}
                  className="flex min-w-0 flex-col gap-0.5 text-xs"
                >
                <span className="font-medium text-text">{choice.label}</span>
                <span className="text-[11px] text-text-dim">{choice.hint}</span>
                {choice.inputKind === 'text' && choice.options.length === 0 ? (
                  <Input
                    className="max-w-xs py-1 text-xs"
                    placeholder={choice.placeholder ?? 'Escrever…'}
                    defaultValue={choice.selected ?? ''}
                    onBlur={(e) => {
                      const value = e.target.value.trim()
                      if (value) onSkillChoice?.(choice.store, choice.key, value)
                    }}
                    onKeyDown={(e) => {
                      if (e.key !== 'Enter') return
                      const value = (e.target as HTMLInputElement).value.trim()
                      if (value) onSkillChoice?.(choice.store, choice.key, value)
                    }}
                  />
                ) : (
                  <>
                    <Select
                      className="max-w-xs py-1 text-xs"
                      value={choice.selected ?? ''}
                      onChange={(e) => {
                        const value = e.target.value
                        if (value) onSkillChoice?.(choice.store, choice.key, value)
                      }}
                    >
                      <option value="">Escolher…</option>
                      {choice.options.map((id) => (
                        <option key={id} value={id}>
                          {pendingOptionLabel(choice, id)}
                        </option>
                      ))}
                    </Select>
                    {choice.inputKind === 'text' && (
                      <Input
                        className="max-w-xs py-1 text-xs"
                        placeholder={choice.placeholder ?? 'Ou escreva outro…'}
                        onBlur={(e) => {
                          const value = e.target.value.trim()
                          if (value) onSkillChoice?.(choice.store, choice.key, value)
                        }}
                        onKeyDown={(e) => {
                          if (e.key !== 'Enter') return
                          const value = (e.target as HTMLInputElement).value.trim()
                          if (value)
                            onSkillChoice?.(choice.store, choice.key, value)
                        }}
                      />
                    )}
                  </>
                )}
              </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Combate — faixa contínua sem buracos */}
      <StatStrip className="min-h-[3.25rem]">
        <BreakdownTooltip
          className="flex min-w-0 flex-[1.8] items-stretch"
          lines={derivedLines(derived.hp)}
        >
          <div className="flex w-full min-w-0 items-stretch px-2.5 py-1.5">
            <HpTracker
              maxHp={maxHp}
              currentHp={currentHp}
              tempHp={derived.tempHp.value}
              provisional={derived.hp.provisional}
              pending={derived.hp.pending}
              pendingReason={derived.hp.pendingReason}
              breakdown={derived.hp.breakdown}
              onChange={onCurrentHpChange}
            />
          </div>
        </BreakdownTooltip>

        {(() => {
          const acLines = derivedLines(derived.ac)
          const box = (
            <StatBox
              className="w-full"
              flush
              label={derived.ac.provisional ? 'CA*' : 'CA'}
              value={pendingValue(derived.ac)}
              provisional={derived.ac.provisional}
              detail={
                derived.ac.provisional
                  ? `DES ${formatModifier(attrById.dexterity ?? 0)}`
                  : undefined
              }
            />
          )
          return acLines.length > 0 ? (
            <BreakdownTooltip className="flex min-w-0 flex-1" lines={acLines}>
              {box}
            </BreakdownTooltip>
          ) : (
            <Tooltip
              className="flex min-w-0 flex-1"
              content={derived.ac.pendingReason ?? 'CA'}
            >
              {box}
            </Tooltip>
          )
        })()}

        {sheet.classDc && (
          <BreakdownTooltip
            className="flex min-w-0 flex-1"
            lines={sheet.classDc.breakdown.map((b) => ({
              label: b.label,
              value: String(b.value),
            }))}
          >
            <StatBox
              className="w-full"
              flush
              label={sheet.classDc.pending ? 'CD*' : 'CD'}
              value={
                sheet.classDc.value != null ? String(sheet.classDc.value) : '—'
              }
              provisional={sheet.classDc.pending}
              hint={sheet.classDc.pendingReason ?? sheet.classDc.label}
              detail={
                sheet.classDc.keyAttributeId
                  ? `${ATTRIBUTE_ABBREVIATIONS[sheet.classDc.keyAttributeId]} · ${PROFICIENCY_LABELS[sheet.classDc.rank]}`
                  : PROFICIENCY_LABELS[sheet.classDc.rank]
              }
            />
          </BreakdownTooltip>
        )}

        <BreakdownTooltip
          className="flex min-w-0 flex-1"
          lines={derivedLines(derived.perception)}
        >
          <StatBox
            className="w-full"
            flush
            label={derived.perception.pending ? 'Perc*' : 'Perc'}
            value={formatModifier(
              derived.perception.value ?? attrById.wisdom ?? 0,
            )}
            provisional={derived.perception.pending}
            detail="SAB"
            action={
              <DiceButton
                label="Percepção"
                modifier={derived.perception.value ?? attrById.wisdom ?? 0}
              />
            }
          />
        </BreakdownTooltip>

        <BreakdownTooltip
          className="flex min-w-0 flex-1"
          lines={derivedLines(derived.initiative)}
        >
          <StatBox
            className="w-full"
            flush
            label={derived.initiative.pending ? 'Ini*' : 'Ini'}
            value={formatModifier(
              derived.initiative.value ??
                derived.perception.value ??
                attrById.wisdom ??
                0,
            )}
            provisional={derived.initiative.pending}
            detail="Perc"
            action={
              <DiceButton
                label="Iniciativa"
                modifier={
                  derived.initiative.value ??
                  derived.perception.value ??
                  attrById.wisdom ??
                  0
                }
              />
            }
          />
        </BreakdownTooltip>

        <BreakdownTooltip
          className="flex min-w-0 flex-1"
          lines={derivedLines(derived.speed)}
        >
          <StatBox
            className="w-full"
            flush
            label="Vel"
            value={
              derived.speed.value != null
                ? formatSpeedMetersValue(derived.speed.value)
                : '—'
            }
            pending={derived.speed.pending}
            detail={extraSpeedDetail(derived.speed.breakdown) ?? 'm'}
          />
        </BreakdownTooltip>

        {(
          [
            {
              key: 'fortitude' as const,
              short: 'Fort',
              attr: 'constitution' as const,
              abbr: 'CON',
            },
            {
              key: 'reflex' as const,
              short: 'Ref',
              attr: 'dexterity' as const,
              abbr: 'DES',
            },
            {
              key: 'will' as const,
              short: 'Von',
              attr: 'wisdom' as const,
              abbr: 'SAB',
            },
          ] as const
        ).map((save) => {
          const stat = derived[save.key]
          const attrMod = attrById[save.attr] ?? 0
          return (
            <BreakdownTooltip
              key={save.key}
              className="flex min-w-0 flex-1"
              lines={derivedLines(stat)}
            >
              <StatBox
                className="w-full"
                flush
                label={stat.pending ? `${save.short}*` : save.short}
                value={formatModifier(stat.value ?? attrMod)}
                provisional={stat.pending}
                detail={save.abbr}
                action={
                  <DiceButton
                    label={save.short}
                    modifier={stat.value ?? attrMod}
                  />
                }
              />
            </BreakdownTooltip>
          )
        })}
      </StatStrip>

      {activeItemEffects.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {activeItemEffects.map((effect) => (
            <span
              key={effect.id}
              className="rounded-full border border-accent/35 bg-accent/10 px-2 py-0.5 text-[10px] text-accent"
              title={[effect.benefit, effect.drawback, ...effect.notes]
                .filter(Boolean)
                .join(' ')}
            >
              {effect.name}
              {effect.duration ? ` · ${effect.duration}` : ''}
            </span>
          ))}
        </div>
      )}

      {/* Atributos — faixa contínua */}
      <StatStrip>
        {attributes.map((attr) => {
          const lines = attr.contributions.map((c) => ({
            label: c.label,
            value: formatModifier(c.value),
          }))
          lines.push({ label: 'Total', value: formatModifier(attr.modifier) })
          const cell = (
            <div className="group flex w-full min-w-0 items-center justify-between gap-1 px-2 py-1.5 transition-colors hover:bg-accent/8">
              <div className="min-w-0 text-left">
                <div className="text-xs font-semibold text-text-dim">
                  {ATTRIBUTE_ABBREVIATIONS[attr.id]}
                </div>
                <div className="truncate text-xs text-text-dim">
                  {ATTRIBUTE_LABELS[attr.id]}
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="font-display text-lg font-semibold tabular-nums leading-none">
                  {formatModifier(attr.modifier)}
                </span>
                <span className="opacity-35 group-hover:opacity-100">
                  <DiceButton
                    label={ATTRIBUTE_LABELS[attr.id]}
                    modifier={attr.modifier}
                    breakdown={attr.contributions.map((c) => ({
                      label: c.label,
                      value: c.value,
                    }))}
                  />
                </span>
              </div>
            </div>
          )
          return (
            <BreakdownTooltip
              key={attr.id}
              className="flex min-w-0 flex-1"
              lines={lines}
            >
              {cell}
            </BreakdownTooltip>
          )
        })}
      </StatStrip>

      <TrainingSection
        attacks={sheet.attackProficiencies}
        defenses={sheet.defenseProficiencies}
        familiarities={sheet.weaponFamiliarities ?? []}
        bonuses={sheet.circumstanceBonuses ?? []}
        level={sheet.character.level}
      />

      <ClassSignaturePanel
        sheet={sheet}
        onClassTrackersChange={onClassTrackersChange}
      />

      <MythicPathPanel sheet={sheet} />

      <CombatConditionsPanel
        conditions={character.activeConditions ?? []}
        effects={sheet.conditionEffects}
        readOnly
        readOnlyHint={
          onCombatClick ? (
            <button
              type="button"
              className="text-[11px] text-accent hover:underline"
              onClick={onCombatClick}
            >
              Abrir Combate para marcar ou tirar
            </button>
          ) : null
        }
      />

      <DefensesPanel
        immunities={immunities}
        resistances={resistances}
        weaknesses={weaknesses}
      />

      <SensesPanel senses={senses} />

      {/* Treinos compactos — sentidos longos ficam nos cards acima */}
      {sheet.attackProficiencies.length > 0 && (
        <section className="rounded-xl border border-border/90 bg-surface-1 px-3 py-2">
          <div className="flex flex-wrap items-start gap-x-4 gap-y-1.5 text-xs">
            {sheet.defenseProficiencies
              .filter((d) => d.key === 'unarmored' || d.key === 'allArmor')
              .slice(0, 2)
              .map((d) => (
                <Badge key={d.key}>
                  {d.label}: {PROFICIENCY_LABELS[d.rank]}
                </Badge>
              ))}
          </div>
        </section>
      )}

      {/* Perícias preenchem a largura; lore/feitos embutidos sem coluna vazia */}
      <Panel
        quiet
        compact
        title="Perícias"
        actions={
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setShowUntrained((v) => !v)}
              className={`rounded px-1.5 py-0.5 text-[10px] ${
                showUntrained
                  ? 'bg-accent/15 text-accent'
                  : 'text-text-dim hover:text-text'
              }`}
            >
              {showUntrained ? 'Todas' : `+${untrainedCount} destreinadas`}
            </button>
            <Input
              className="w-28 border-border/70 py-0.5 text-[11px]"
              placeholder="Filtrar…"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            />
            <span className="text-[10px] text-text-dim">
              {filteredSkills.length + filteredCustom.length} de{' '}
              {skills.length + customSkills.length}
            </span>
          </div>
        }
      >
        <div className="grid gap-3 lg:grid-cols-[1fr_13rem]">
          <ul className="grid gap-x-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredSkills.map((skill) => (
              <SkillRow
                key={skill.id}
                name={SKILL_LABELS[skill.id]}
                skill={skill}
                showBreakdown={showBreakdown}
              />
            ))}
            {filteredCustom.map((skill) => (
              <CustomSkillRow
                key={skill.id}
                skill={skill}
                showBreakdown={showBreakdown}
              />
            ))}
            {filteredSkills.length === 0 && filteredCustom.length === 0 && (
              <li className="col-span-full px-1 py-2 text-xs text-text-dim">
                Nenhuma perícia aqui.
              </li>
            )}
          </ul>

          <div className="space-y-2 border-t border-border/50 pt-2 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-dim">
                Conhecimentos
              </div>
              {lores.length === 0 ? (
                <p className="text-[11px] text-text-dim">Nenhum ainda.</p>
              ) : (
                <ul>
                  {lores.map((lore) => {
                    const lines = [
                      ...(lore.sourceLabel
                        ? [{ label: 'Fonte', value: lore.sourceLabel }]
                        : []),
                      ...lore.breakdown.map((b) => ({
                        label: b.label,
                        value: formatModifier(b.value),
                      })),
                      {
                        label: 'Total',
                        value: formatModifier(lore.modifier),
                      },
                    ]
                    return (
                      <li key={lore.id}>
                        <BreakdownTooltip className="w-full" lines={lines}>
                          <div className="skill-row flex items-center justify-between gap-1 rounded px-0.5 py-0.5 text-xs">
                            <span className="min-w-0 truncate font-medium">
                              {lore.name}
                            </span>
                            <span className="flex items-center">
                              <span className="tabular-nums font-semibold">
                                {formatModifier(lore.modifier)}
                              </span>
                              <DiceButton
                                label={lore.name}
                                modifier={lore.modifier}
                                breakdown={lore.breakdown}
                              />
                            </span>
                          </div>
                        </BreakdownTooltip>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
            <div>
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-dim">
                Feitos (resumo)
              </div>
              {feats.length === 0 ? (
                <p className="text-[11px] text-text-dim">Nenhum ainda.</p>
              ) : (
                <ul className="space-y-1">
                  {feats.slice(0, 4).map((feat) => (
                    <li key={feat.id} className="text-xs">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="font-medium text-text">
                          {feat.featName}
                        </span>
                        <ActionCost type={feat.actionType} />
                      </div>
                      <div className="text-[10px] text-text-dim">
                        {feat.sourceLabel}
                      </div>
                    </li>
                  ))}
                  {feats.length > 4 && (
                    <li className="text-[10px] text-text-dim">
                      +{feats.length - 4} mais abaixo…
                    </li>
                  )}
                </ul>
              )}
              {onFeatsClick && (
                <button
                  type="button"
                  onClick={onFeatsClick}
                  className="mt-1.5 text-[10px] text-accent hover:underline"
                >
                  Abrir aba Feitos
                </button>
              )}
            </div>
          </div>
        </div>

        {onCustomSkillsChange && (
          <CustomSkillsEditor
            compact
            skills={character.customSkills ?? []}
            onChange={onCustomSkillsChange}
          />
        )}
      </Panel>

      {/* Feitos e recursos — só leitura; seleção na aba Feitos */}
      <Panel
        quiet
        compact
        title="Feitos e recursos"
        subtitle="toque para ler o texto completo"
        actions={
          onFeatsClick ? (
            <button
              type="button"
              onClick={onFeatsClick}
              className="rounded px-1.5 py-0.5 text-[10px] text-accent hover:bg-accent/10"
            >
              Selecionar na aba Feitos →
            </button>
          ) : undefined
        }
      >
        {feats.length === 0 && tableAbilities.length === 0 ? (
          <p className="text-xs text-text-dim">
            Nenhum feito ou recurso ativo ainda.
            {onFeatsClick
              ? ' Use a aba Feitos (menu à esquerda) para escolher nos slots.'
              : ''}
          </p>
        ) : (
          <div className="space-y-3">
            {feats.length > 0 ? (
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Feitos
                </p>
                <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {feats.map((feat) => (
                    <li key={feat.id}>
                      <ActiveFeatCard feat={feat} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-xs text-text-dim">
                Nenhum feito ativo ainda.
                {onFeatsClick
                  ? ' Use a aba Feitos para escolher nos slots.'
                  : ''}
              </p>
            )}
            {tableAbilities.length > 0 ? (
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Recursos de classe, ancestralidade e origem
                </p>
                <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {tableAbilities.map((ability) => {
                    const action = abilityActionType(ability.actionType)
                    return (
                      <li key={ability.id}>
                        <ExpandableCard
                          title={ability.name}
                          subtitle={ability.sourceLabel}
                          badges={
                            <>
                              <ActionCost type={action} />
                              <Badge className="!text-[9px]">Recurso</Badge>
                            </>
                          }
                        >
                          <RichText
                            as="p"
                            className="whitespace-pre-wrap leading-relaxed text-text-muted"
                          >
                            {polishRulesText(ability.description)}
                          </RichText>
                        </ExpandableCard>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </Panel>
    </div>
  )
}

function PathPill({
  label,
  value,
  empty,
  onClick,
}: {
  label: string
  value?: string
  empty: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-border/70 bg-surface-2/60 px-2.5 py-1 text-left text-[11px] transition-colors hover:border-accent/45 hover:bg-accent/10"
    >
      <span className="text-text-dim">{label}</span>
      <span className={`truncate font-medium ${value ? 'text-accent' : 'text-text-dim'}`}>
        {value ?? empty}
      </span>
    </button>
  )
}

function HpTracker({
  maxHp,
  currentHp,
  tempHp,
  provisional,
  pending,
  pendingReason,
  breakdown: _breakdown,
  onChange,
}: {
  maxHp: number | null
  currentHp: number | null
  tempHp?: number | null
  provisional?: boolean
  pending?: boolean
  pendingReason?: string
  breakdown?: Array<{ label: string; value: number | string }>
  onChange?: (hp: number) => void
}) {
  if (pending || maxHp == null || currentHp == null) {
    return (
      <div className="flex h-full items-center py-0.5">
        <div>
          <div className="text-xs font-semibold uppercase text-text-dim">
            PV
          </div>
          <div className="text-xs text-text-dim">
            {pendingReason ?? 'Escolha ancestralidade'}
          </div>
        </div>
      </div>
    )
  }

  const max = maxHp
  const current = currentHp
  const pct = Math.round((current / Math.max(1, max)) * 100)
  const barColor =
    pct > 66 ? 'bg-success' : pct > 33 ? 'bg-accent' : 'bg-danger'

  function setHp(next: number) {
    onChange?.(Math.min(max, Math.max(0, next)))
  }

  return (
    <div className="flex h-full flex-col justify-center gap-1 py-0.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-semibold uppercase text-text-dim">
            PV{provisional ? '*' : ''}
          </span>
          <span className="font-display text-lg font-semibold tabular-nums leading-none">
            {current}
          </span>
          <span className="text-[11px] text-text-dim">/{max}</span>
          {tempHp != null && tempHp !== 0 ? (
            <span className="text-[10px] font-medium text-info">
              +{tempHp} temp
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className="h-6 w-6 rounded border border-border/80 text-xs hover:border-danger/50 hover:text-danger"
            onClick={() => setHp(current - 1)}
          >
            −
          </button>
          <button
            type="button"
            className="h-6 w-6 rounded border border-border/80 text-xs hover:border-success/50 hover:text-success"
            onClick={() => setHp(current + 1)}
          >
            +
          </button>
          <button
            type="button"
            className="h-6 rounded border border-border/80 px-1.5 text-[9px] hover:border-accent/50 hover:text-accent"
            onClick={() => setHp(max)}
          >
            Full
          </button>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function SkillRow({
  name,
  skill,
}: {
  name: string
  skill: ResolvedSkill
  showBreakdown: boolean
}) {
  const lines: Array<{ label: string; value: string | number }> = []
  for (const source of skill.rankSources ?? []) {
    lines.push({
      label: source.label,
      value: PROFICIENCY_LABELS[source.rank],
    })
  }
  lines.push(
    ...skill.breakdown.map((b) => ({
      label: b.label,
      value: formatModifier(b.value),
    })),
  )
  lines.push({ label: 'Total', value: formatModifier(skill.modifier) })
  const trained = skill.rank !== 'untrained'

  return (
    <li
      className={`skill-row ${trained ? '' : 'opacity-60'}`}
    >
      <BreakdownTooltip className="w-full" lines={lines}>
        <div className="flex items-center justify-between gap-1 rounded px-1 py-0.5 text-xs">
          <div className="min-w-0 truncate">
            <span className={trained ? 'font-medium text-text' : 'text-text-muted'}>
              {name}
            </span>
            <span className="ml-1 text-[9px] text-text-dim">
              {ATTRIBUTE_ABBREVIATIONS[skill.attributeId]}
              {trained ? ` · ${PROFICIENCY_LABELS[skill.rank]}` : ''}
            </span>
          </div>
          <div className="flex shrink-0 items-center">
            <span className="min-w-7 text-right tabular-nums font-semibold">
              {formatModifier(skill.modifier)}
            </span>
            <DiceButton
              label={name}
              modifier={skill.modifier}
              breakdown={skill.breakdown}
            />
          </div>
        </div>
      </BreakdownTooltip>
    </li>
  )
}

function CustomSkillRow({
  skill,
}: {
  skill: ResolvedCustomSkill
  showBreakdown: boolean
}) {
  const lines = skill.breakdown.map((b) => ({
    label: b.label,
    value: formatModifier(b.value),
  }))
  lines.push({ label: 'Total', value: formatModifier(skill.modifier) })

  return (
    <li className="skill-row">
      <BreakdownTooltip className="w-full" lines={lines}>
        <div className="flex items-center justify-between gap-1 rounded px-1 py-0.5 text-xs">
          <div className="min-w-0 truncate">
            <span className="font-medium">{skill.name}</span>
            <Badge tone="accent" className="ml-1 !text-[8px]">
              HB
            </Badge>
          </div>
          <div className="flex shrink-0 items-center">
            <span className="min-w-7 text-right tabular-nums font-semibold">
              {formatModifier(skill.modifier)}
            </span>
            <DiceButton
              label={skill.name}
              modifier={skill.modifier}
              breakdown={skill.breakdown}
            />
          </div>
        </div>
      </BreakdownTooltip>
    </li>
  )
}

function RankList({
  title,
  items,
}: {
  title: string
  items: Array<{ key: string; label: string; rank: string; source?: string }>
}) {
  if (items.length === 0) {
    return (
      <div>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-dim">
          {title}
        </div>
        <p className="text-xs text-text-dim">Ainda sem classe.</p>
      </div>
    )
  }
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-dim">
        {title}
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.key}>
            <BreakdownTooltip
              className="w-full"
              lines={[
                ...(item.source
                  ? [{ label: 'Fonte', value: item.source }]
                  : []),
                { label: 'Posto', value: item.rank },
              ]}
            >
              <div className="flex items-baseline justify-between gap-2 text-xs">
                <span className="min-w-0 truncate">{item.label}</span>
                <span className="shrink-0 text-right">
                  <span className="text-text-muted">{item.rank}</span>
                  {item.source ? (
                    <span className="block text-[10px] text-text-dim">
                      {item.source}
                    </span>
                  ) : null}
                </span>
              </div>
            </BreakdownTooltip>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TrainingSection({
  attacks,
  defenses,
  familiarities,
  bonuses,
  level,
}: {
  attacks: ResolvedCharacterSheet['attackProficiencies']
  defenses: ResolvedCharacterSheet['defenseProficiencies']
  familiarities: ResolvedCharacterSheet['weaponFamiliarities']
  bonuses: ResolvedCharacterSheet['circumstanceBonuses']
  level: number
}) {
  const hasAnything =
    attacks.length > 0 ||
    defenses.length > 0 ||
    familiarities.length > 0 ||
    bonuses.length > 0
  if (!hasAnything) return null

  function rankLine(rank: (typeof attacks)[number]['rank']) {
    const bonus = calculateProficiencyBonus(rank, level)
    return `${PROFICIENCY_LABELS[rank]} ${formatModifier(bonus)}`
  }

  return (
    <Panel quiet compact title="Treinamento">
      <p className="mb-2 text-[11px] text-text-dim">
        O que o personagem sabe usar. O número é o bônus de proficiência (entra
        no ataque ou na CA daquele tipo).
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <RankList
          title="Armas"
          items={attacks.map((p) => ({
            key: p.key,
            label: p.label,
            rank: rankLine(p.rank),
            source: p.sourceLabel,
          }))}
        />
        <RankList
          title="Armaduras"
          items={defenses.map((p) => ({
            key: p.key,
            label: p.label,
            rank: rankLine(p.rank),
            source: p.sourceLabel,
          }))}
        />
      </div>

      {familiarities.length > 0 && (
        <div className="mt-3 border-t border-border/50 pt-2">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-dim">
            Familiaridade com armas
          </div>
          <ul className="space-y-1.5">
            {familiarities.map((fam) => (
              <li key={fam.sourceLabel} className="text-xs">
                <div className="font-medium text-text">{fam.itemsLabel}</div>
                {fam.rulesLabel ? (
                  <div className="text-[11px] text-text-muted">
                    {fam.rulesLabel}
                    {fam.critSpecReady ? ' · especialização crítica ativa' : ''}
                  </div>
                ) : null}
                <div className="text-[10px] text-text-dim">{fam.sourceLabel}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {bonuses.length > 0 && (
        <div className="mt-3 border-t border-border/50 pt-2">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-text-dim">
            Bônus de circunstância
          </div>
          <ul className="space-y-1.5">
            {bonuses.map((bonus) => (
              <li
                key={`${bonus.sourceLabel}-${bonus.appliesTo}`}
                className="text-xs"
              >
                <div className="font-medium text-text">
                  +{bonus.value} {bonus.appliesTo}
                  {alwaysOnCircumstanceStat(bonus.appliesTo) === 'initiative'
                    ? ' · já na Iniciativa'
                    : ''}
                </div>
                <div className="text-[10px] text-text-dim">{bonus.sourceLabel}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Panel>
  )
}
