import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  applyDailyPreparations,
  accessForSource,
  commitSourceSpellState,
  filterSpellsForAccess,
  filterSpellsForSource,
  knownTraditionsFromAccess,
  learnableSpellRanks,
  learnSpell,
  hydratePreparedSlotsFromKnown,
  spellRankIsLearnable,
  prepareIntoSlot,
  primarySpellSourceId,
  pruneSpellStateForAccess,
  refocus,
  resolveCastMode,
  resolveFocusMax,
  resolveSpellcastingAccess,
  setSlotExpended,
  spellcastingStyleLabel,
  spellSourcesWithCollection,
  spendFocusPoint,
  syncPreparedSlots,
  traditionLabel,
  unlearnSpell,
  spendBondedItem,
  spendSpontaneousSlot,
  restoreSpontaneousSlot,
  toggleCantripPrepared,
  usesPreparedSlots,
  usesSpellbookCollection,
  preparesFromTraditionList,
  spellCollectionLabel,
  spellSourceStatLabel,
  resolveGrantedSpellIds,
  mergedKnownSpellIds,
  signatureFeatureActive,
  signatureSet,
  spontaneousOptionsForRank,
  pendingSignaturePicks,
  toggleSignatureSpell,
  viewStateForSource,
} from '@/engine'
import { listSpells } from '@/engine/spellCatalog'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import { SpellDetailPanel, SpellFacts } from '@/features/spells/components/SpellFacts'
import { SpellPicker } from '@/features/spells/components/SpellPicker'
import {
  SPELL_RANK_FILTER_OPTIONS,
  spellMatchesQuery,
  spellRankLabel,
} from '@/features/spells/spellUi'
import { RitualsBoard } from '@/features/rituals/components/RitualsBoard'
import { ClassTables } from '@/features/classes/components/ClassTables'
import { CLASS_MONK_ID } from '@/data/seeds/ids'
import { DiceButton } from '@/components/dice/DiceButton'
import { Button } from '@/components/ui/Button'
import { Panel, StatBox, StatStrip, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { Input, Textarea } from '@/components/ui/Field'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { ActionCost } from '@/components/ui/ActionIcon'
import type {
  AttributeId,
  Character,
  CharacterClass,
  CharacterSpellState,
  ClassChoices,
  PreparedSpellSlot,
  Rarity,
  ResolvedSkill,
  ResolvedSpellcastingAccess,
  ResolvedSpellcastingSource,
  Spell,
  SpellRank,
  SpellTradition,
} from '@/types'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  RARITY_FILTER_OPTIONS,
  TRADITION_FILTER_OPTIONS,
  TRADITION_LABELS,
  formatModifier,
} from '@/utils/labels'
import { BreakdownTooltip } from '@/components/ui/Tooltip'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { FilterCount } from '@/components/ui/FilterCount'

type SpellsTab = 'day' | 'collection' | 'focus' | 'rituals' | 'help'

interface SpellsPanelProps {
  character: Character
  characterClass?: CharacterClass | null
  attrMap: Partial<Record<AttributeId, number>>
  /** Acesso já resolvido na ficha (feitos e arquétipos inclusos). */
  spellcasting?: ResolvedSpellcastingAccess
  onChangeSpellState: (spellState: CharacterSpellState) => void
  onChangeClassChoices?: (classChoices: ClassChoices) => void
  /** Recarrega varinhas e cargas do cajado preparado (itens da ficha). */
  onRefreshMagicItems?: () => void
  /** Perícias resolvidas — dados do teste principal de ritual. */
  skills?: ResolvedSkill[]
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-accent bg-accent/20 text-accent'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

function SourceHeading({ source }: { source: ResolvedSpellcastingSource }) {
  const attack =
    source.spellAttack != null ? formatModifier(source.spellAttack) : '—'
  const dc = source.spellDc != null ? String(source.spellDc) : '—'
  return (
    <div>
      <div className="text-sm font-medium text-text">{source.label}</div>
      <p className="text-[11px] text-text-dim">
        {traditionLabel(source.tradition)} ·{' '}
        {spellcastingStyleLabel(source.style)} ·{' '}
        {spellCollectionLabel({
          primaryStyle: source.style,
          features: source.features,
        })}
        {source.attributeId
          ? ` · ${ATTRIBUTE_ABBREVIATIONS[source.attributeId]}`
          : ''}
        {` · ataque ${attack} · CD ${dc}`}
      </p>
    </div>
  )
}

function sourceHighestRank(
  source: ResolvedSpellcastingSource,
): number | undefined {
  const max = Math.max(
    0,
    ...Object.keys(source.slotsByRank ?? {}).map(Number),
  )
  return max > 0 ? max : undefined
}

function SourceStatStrip({
  source,
  showLabel,
}: {
  source: ResolvedSpellcastingSource
  showLabel: boolean
}) {
  const highest = sourceHighestRank(source)
  const focusOnly = source.style === 'focusOnly'

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="text-[11px] font-medium text-text-muted">
          {source.label}
          <span className="ml-1.5 font-normal text-text-dim">
            {spellSourceStatLabel(source)}
          </span>
        </div>
      )}
      <StatStrip className="min-h-[3.5rem]">
        <BreakdownTooltip
          className="flex min-w-0 flex-1"
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
              ? [{ label: 'Total', value: formatModifier(source.spellAttack) }]
              : []),
          ]}
        >
          <StatBox
            flush
            className="w-full"
            label="Ataque"
            value={
              source.spellAttack != null
                ? formatModifier(source.spellAttack)
                : '—'
            }
            detail={
              source.attributeId
                ? ATTRIBUTE_ABBREVIATIONS[source.attributeId]
                : undefined
            }
            action={
              source.spellAttack != null ? (
                <DiceButton
                  label={`Ataque de magia · ${source.label}`}
                  modifier={source.spellAttack}
                />
              ) : undefined
            }
          />
        </BreakdownTooltip>
        <BreakdownTooltip
          className="flex min-w-0 flex-1"
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
          <StatBox
            flush
            className="w-full"
            label="CD"
            value={source.spellDc != null ? String(source.spellDc) : '—'}
            detail={
              source.proficiencyRank
                ? PROFICIENCY_LABELS[source.proficiencyRank]
                : undefined
            }
          />
        </BreakdownTooltip>
        <StatBox
          flush
          className="min-w-0 flex-1"
          label="Truques"
          value={
            focusOnly
              ? '—'
              : source.cantripsPerDay != null
                ? String(source.cantripsPerDay)
                : '—'
          }
          detail={focusOnly ? 'Só foco' : 'à vontade no dia'}
        />
        <StatBox
          flush
          className="min-w-0 flex-1"
          label="Maior posto"
          value={focusOnly ? 'Foco' : highest != null ? String(highest) : '—'}
          detail={
            source.features.curriculumBonusSlot
              ? 'inclui currículo'
              : focusOnly
                ? 'sem espaços'
                : undefined
          }
        />
      </StatStrip>
    </div>
  )
}

export function SpellsPanel({
  character,
  characterClass,
  attrMap,
  spellcasting,
  onChangeSpellState,
  onChangeClassChoices,
  onRefreshMagicItems,
  skills,
}: SpellsPanelProps) {
  const [tab, setTab] = useState<SpellsTab | null>(null)
  const [collectionSourceId, setCollectionSourceId] = useState<string | null>(
    null,
  )

  const access = useMemo(
    () =>
      spellcasting ??
      resolveSpellcastingAccess(character, characterClass, attrMap),
    [spellcasting, character, characterClass, attrMap],
  )

  const allSpells = useMemo(() => listSpells(), [])
  const collectionSources = useMemo(
    () => spellSourcesWithCollection(access),
    [access],
  )
  const primaryId = primarySpellSourceId(access)
  const activeCollectionSource =
    collectionSources.find((s) => s.id === collectionSourceId) ??
    collectionSources[0]

  const catalog = useMemo(
    () =>
      filterSpellsForAccess(allSpells, access)
        .map(withLocalizedSpell)
        .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'pt')),
    [access, allSpells],
  )

  const focusOnly = access.hasAccess && collectionSources.length === 0
  const showDayAndCollection = access.hasAccess && collectionSources.length > 0
  const defaultTab: SpellsTab = !access.hasAccess
    ? 'rituals'
    : focusOnly
      ? 'focus'
      : 'day'
  const activeTab = tab ?? defaultTab

  useEffect(() => {
    if (!access.hasAccess && tab != null && tab !== 'rituals' && tab !== 'help') {
      setTab('rituals')
      return
    }
    if (focusOnly && (tab === 'day' || tab === 'collection')) {
      setTab('focus')
    }
  }, [access.hasAccess, focusOnly, tab])

  useEffect(() => {
    if (
      collectionSourceId &&
      !collectionSources.some((s) => s.id === collectionSourceId)
    ) {
      setCollectionSourceId(null)
    }
  }, [collectionSourceId, collectionSources])

  useEffect(() => {
    const pruned = pruneSpellStateForAccess(
      character.spellState,
      access,
      allSpells,
    )
    if (pruned && pruned !== character.spellState) {
      onChangeSpellState(pruned)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- catálogo muda com tradição/arquétipo
  }, [access, allSpells])

  useEffect(() => {
    if (!access.hasAccess) return
    let next = character.spellState
    let changed = false
    for (const source of collectionSources) {
      const slice = accessForSource(access, source)
      if (!usesPreparedSlots(slice)) continue
      const view = viewStateForSource(next, source.id, primaryId)
      const synced = syncPreparedSlots(view, slice)
      const prev = view.preparedSlots ?? []
      const structureChanged = !(
        synced.length === prev.length &&
        synced.every(
          (s, i) =>
            s.id === prev[i]?.id &&
            s.rank === prev[i]?.rank &&
            s.spellId === prev[i]?.spellId &&
            s.expended === prev[i]?.expended,
        )
      )
      let nextView = { ...view, preparedSlots: synced }
      const hydrated = hydratePreparedSlotsFromKnown(
        nextView,
        slice,
        allSpells,
      )
      if (hydrated) {
        nextView = hydrated
        changed = true
      } else if (structureChanged) {
        changed = true
      } else {
        continue
      }
      next = commitSourceSpellState(
        next,
        source.id,
        nextView,
        primaryId,
      )
    }
    if (changed && next) onChangeSpellState(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- só quando muda nível/classe/slots
  }, [
    character.level,
    character.classId,
    character.classChoices?.subclassId,
    access.hasAccess,
    collectionSources.map((s) => s.id).join('|'),
  ])

  function patch(next: CharacterSpellState) {
    onChangeSpellState(next)
  }

  const collectionLabel =
    collectionSources.length > 1
      ? 'Coleções'
      : activeCollectionSource
        ? spellCollectionLabel(accessForSource(access, activeCollectionSource))
        : spellCollectionLabel(access)
  const src = access.sources[0]
  const knownTraditions = knownTraditionsFromAccess(access)
  const showMonkTradition =
    characterClass?.id === CLASS_MONK_ID && Boolean(onChangeClassChoices)
  const monkTradition = (src?.tradition ?? 'occult') as SpellTradition

  const tabs = (
    [
      ...(showDayAndCollection
        ? ([['day', 'Dia / espaços'], ['collection', collectionLabel]] as const)
        : []),
      ...(access.features.focusPool ? ([['focus', 'Foco']] as const) : []),
      ['rituals', 'Rituais'] as const,
      ['help', 'Como funciona'] as const,
    ] as const
  )

  return (
    <div className="animate-fade-up space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-wide text-text">
            Magias
          </h2>
          <p className="mt-0.5 max-w-2xl text-sm text-text-dim">
            A aba se adapta à classe: preparado, espontâneo, limitado ou só
            foco.{' '}
            <Link
              to="/compendio/magias"
              className="text-accent hover:underline"
            >
              Abrir no compêndio
            </Link>
          </p>
        </div>
        {access.hasAccess && (
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="accent"
              onClick={() => {
                patch(applyDailyPreparations(character.spellState, access))
                onRefreshMagicItems?.()
              }}
            >
              Preparações diárias
            </Button>
            {access.features.bondedItem && (
              <Button
                size="sm"
                variant={
                  character.spellState?.bondedItemAvailable !== false
                    ? 'secondary'
                    : 'ghost'
                }
                disabled={character.spellState?.bondedItemAvailable === false}
                onClick={() => {
                  const next = spendBondedItem(character.spellState)
                  if (next) patch(next)
                }}
                title="Drenar Item Vinculado — reergue uma magia preparada 1×/dia"
              >
                {character.spellState?.bondedItemAvailable !== false
                  ? 'Usar vínculo'
                  : 'Vínculo usado'}
              </Button>
            )}
          </div>
        )}
      </div>

      {access.hasAccess ? (
        <SpellcastingSummary
          access={access}
          knownTraditions={knownTraditions}
          characterLevel={character.level}
          showMonkTradition={showMonkTradition}
          monkTradition={monkTradition}
          onChangeSpellTradition={
            onChangeClassChoices
              ? (tradition) =>
                  onChangeClassChoices({
                    additionalSkills:
                      character.classChoices?.additionalSkills ?? [],
                    ...character.classChoices,
                    spellTradition: tradition,
                  })
              : undefined
          }
        />
      ) : (
        <Panel quiet compact>
          <p className="text-sm text-text-dim">
            {access.lockedReason ??
              'Esta ficha não conjura magias — rituais continuam disponíveis para qualquer personagem.'}
          </p>
        </Panel>
      )}

      <div className="flex flex-wrap gap-1.5">
        {tabs.map(([id, label]) => (
          <TabButton
            key={id}
            active={activeTab === id}
            onClick={() => setTab(id)}
          >
            {label}
          </TabButton>
        ))}
      </div>

      <div className="min-h-[20rem]">
        {activeTab === 'day' && (
          <div className="space-y-6">
            {collectionSources.map((source) => {
              const slice = accessForSource(access, source)
              const view = viewStateForSource(
                character.spellState,
                source.id,
                primaryId,
              )
              const sourceCatalog = filterSpellsForSource(
                allSpells,
                access,
                source,
              )
                .map(withLocalizedSpell)
                .sort(
                  (a, b) =>
                    a.rank - b.rank || a.name.localeCompare(b.name, 'pt'),
                )
              const sourceById = Object.fromEntries(
                sourceCatalog.map((s) => [s.id, s]),
              )
              return (
                <section key={source.id} className="space-y-2">
                  {collectionSources.length > 1 && (
                    <SourceHeading source={source} />
                  )}
                  <DayBoard
                    access={slice}
                    state={view}
                    spellById={sourceById}
                    catalog={sourceCatalog}
                    level={character.level}
                    onChange={(next) =>
                      patch(
                        commitSourceSpellState(
                          character.spellState,
                          source.id,
                          next,
                          primaryId,
                        ),
                      )
                    }
                  />
                </section>
              )
            })}
          </div>
        )}
        {activeTab === 'collection' && activeCollectionSource && (
          <div className="space-y-3">
            {collectionSources.length > 1 && (
              <div className="flex flex-wrap gap-1.5">
                {collectionSources.map((source) => (
                  <TabButton
                    key={source.id}
                    active={source.id === activeCollectionSource.id}
                    onClick={() => setCollectionSourceId(source.id)}
                  >
                    {source.label}
                  </TabButton>
                ))}
              </div>
            )}
            {collectionSources.length > 1 && (
              <SourceHeading source={activeCollectionSource} />
            )}
            <CollectionBoard
              access={accessForSource(access, activeCollectionSource)}
              state={viewStateForSource(
                character.spellState,
                activeCollectionSource.id,
                primaryId,
              )}
              catalog={filterSpellsForSource(
                allSpells,
                access,
                activeCollectionSource,
              )
                .map(withLocalizedSpell)
                .sort(
                  (a, b) =>
                    a.rank - b.rank || a.name.localeCompare(b.name, 'pt'),
                )}
              level={character.level}
              onChange={(next) =>
                patch(
                  commitSourceSpellState(
                    character.spellState,
                    activeCollectionSource.id,
                    next,
                    primaryId,
                  ),
                )
              }
            />
          </div>
        )}
        {activeTab === 'focus' && access.features.focusPool && (
          <FocusBoard
            access={access}
            state={character.spellState}
            catalog={catalog}
            onChange={patch}
          />
        )}
        {activeTab === 'rituals' && (
          <RitualsBoard
            state={character.spellState}
            onChange={patch}
            skills={skills}
          />
        )}
        {activeTab === 'help' && (
          <HelpBoard
            access={access}
            characterClass={characterClass}
            characterLevel={character.level}
          />
        )}
      </div>

      <Panel title="Notas" compact>
        <Textarea
          className="min-h-14"
          placeholder="Lembretes de preparo, magias a aprender, pendências…"
          value={character.spellState?.notes ?? ''}
          onChange={(e) =>
            patch({ ...character.spellState, notes: e.target.value })
          }
        />
      </Panel>
    </div>
  )
}

function SpellcastingSummary({
  access,
  knownTraditions,
  characterLevel,
  showMonkTradition,
  monkTradition,
  onChangeSpellTradition,
}: {
  access: ResolvedSpellcastingAccess
  knownTraditions: SpellTradition[]
  characterLevel: number
  showMonkTradition: boolean
  monkTradition: SpellTradition
  onChangeSpellTradition?: (tradition: SpellTradition) => void
}) {
  const src = access.sources[0]
  const traditionText =
    knownTraditions.length > 0
      ? knownTraditions.map(traditionLabel).join(', ')
      : src
        ? traditionLabel(src.tradition)
        : ''
  const many = access.sources.length > 1

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-medium text-text">
            {many ? 'Conjuração' : src?.label}
          </div>
          <div className="text-[11px] text-text-dim">
            {traditionText}
            {!many && src ? ` · ${spellcastingStyleLabel(src.style)}` : ''} ·
            nv. {characterLevel}
            {access.autoHeightenRank
              ? ` · altura automática posto ${access.autoHeightenRank}`
              : ''}
          </div>
        </div>
        {showMonkTradition && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-text-dim">Tradição do qi:</span>
            {(['occult', 'divine'] as const).map((t) => (
              <Button
                key={t}
                size="sm"
                variant={monkTradition === t ? 'accent' : 'secondary'}
                onClick={() => onChangeSpellTradition?.(t)}
              >
                {traditionLabel(t)}
              </Button>
            ))}
          </div>
        )}
      </div>

      {access.styleHint && <Tip>{access.styleHint}</Tip>}

      <div className="space-y-3">
        {access.sources.map((source) => (
          <SourceStatStrip
            key={source.id}
            source={source}
            showLabel={many}
          />
        ))}
      </div>
    </div>
  )
}

function DayBoard({
  access,
  state,
  spellById,
  catalog,
  level,
  onChange,
}: {
  access: ResolvedSpellcastingAccess
  state?: CharacterSpellState
  spellById: Record<string, Spell>
  catalog: Spell[]
  level: number
  onChange: (s: CharacterSpellState) => void
}) {
  const castMode = resolveCastMode(access)
  const isBounded = access.primaryStyle === 'bounded'
  const fromTradition = preparesFromTraditionList(access)
  const granted = resolveGrantedSpellIds(access, catalog)
  const collection = new Set([
    ...(state?.collectionSpellIds ?? []),
    ...(state?.cantripIds ?? []),
    ...granted.cantripIds,
    ...granted.collectionIds,
  ])
  const [peekId, setPeekId] = useState<string | null>(null)

  if (castMode === 'focusOnly') {
    return (
      <Panel quiet>
        <p className="text-sm text-text-dim">
          Esta fonte é só foco — use a aba Foco. Sem espaços de magia.
        </p>
      </Panel>
    )
  }

  if (castMode === 'spontaneous') {
    return (
      <div className="space-y-3">
        {access.features.limitedSlots && <LimitedCasterTip prepared={false} />}
        <SpontaneousDayBoard
          access={access}
          state={state}
          catalog={catalog}
          level={level}
          onChange={onChange}
        />
      </div>
    )
  }

  const slots = syncPreparedSlots(state, access)
  const cantrips = catalog.filter((s) => s.rank === 0 && !s.focus)
  const ranked = catalog.filter((s) => s.rank > 0 && !s.focus)
  const maxCantrips = access.cantripsPerDay ?? 0
  const preparedCantrips = state?.cantripIds ?? []
  const peekSpell = peekId
    ? (spellById[peekId] ?? cantrips.find((s) => s.id === peekId) ?? null)
    : null

  const ranks = Object.keys(access.slotsByRank ?? {})
    .map(Number)
    .sort((a, b) => a - b) as Exclude<SpellRank, 0>[]

  return (
    <div className="space-y-3">
      {access.features.limitedSlots && <LimitedCasterTip prepared />}
      {isBounded && <BoundedWaveTip />}
      <Panel title="Truques do dia" compact>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] text-text-dim">
            Prepare até {maxCantrips}. Clique no nome para ler o efeito. Depois
            disso, conjura à vontade até a próxima preparação.
            {fromTradition
              ? ' Clérigo/druida: escolha direto da lista da tradição.'
              : ''}
          </p>
          <span className="text-[11px] tabular-nums text-text-muted">
            {preparedCantrips.length}/{maxCantrips}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {cantrips.map((sp) => {
            const on = preparedCantrips.includes(sp.id)
            const inBook = fromTradition || collection.has(sp.id) || on
            return (
              <SpellChip
                key={sp.id}
                spell={sp}
                selected={on}
                inspected={peekId === sp.id}
                muted={!inBook && !on}
                title={
                  inBook
                    ? 'Clique para ler o efeito'
                    : 'Aprenda no grimório/familiar primeiro (aba Coleção). Clique para ler mesmo assim.'
                }
                onClick={() => {
                  setPeekId((id) => (id === sp.id ? null : sp.id))
                  if (inBook && !on) {
                    onChange(toggleCantripPrepared(state, sp.id, maxCantrips))
                  }
                }}
                onClearPrepared={
                  on
                    ? () =>
                        onChange(
                          toggleCantripPrepared(state, sp.id, maxCantrips),
                        )
                    : undefined
                }
              />
            )
          })}
          {cantrips.length === 0 && (
            <span className="text-xs text-text-dim">
              Nenhum truque nesta tradição ainda.
            </span>
          )}
        </div>
        <SpellPeek
          spell={peekSpell}
          action={
            peekSpell && preparedCantrips.includes(peekSpell.id) ? (
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  onChange(
                    toggleCantripPrepared(state, peekSpell.id, maxCantrips),
                  )
                }
              >
                Tirar da preparação
              </Button>
            ) : null
          }
        />
      </Panel>

      {ranks.map((rank) => {
        const rankSlots = slots.filter((s) => s.rank === rank)
        const options = ranked.filter(
          (sp) =>
            sp.rank <= rank &&
            (fromTradition ||
              collection.has(sp.id) ||
              rankSlots.some((s) => s.spellId === sp.id)),
        )
        return (
          <RankSlotGroup
            key={rank}
            rank={rank}
            slots={rankSlots}
            options={options}
            spellById={spellById}
            fontKind={access.fontKind}
            onPrepare={(slotId, spellId) =>
              onChange(prepareIntoSlot(state, slotId, spellId))
            }
            onExpend={(slotId, expended) =>
              onChange(setSlotExpended(state, slotId, expended))
            }
          />
        )
      })}

      {ranks.length === 0 && (
        <Panel quiet>
          <p className="py-4 text-center text-sm text-text-dim">
            Nenhum espaço neste nível.
          </p>
        </Panel>
      )}
    </div>
  )
}

function SpellPeek({
  spell,
  action,
}: {
  spell: Spell | null
  action?: ReactNode
}) {
  if (!spell) return null
  return (
    <div className="mt-2 rounded-lg border border-accent/30 bg-accent/5 px-2.5 py-2">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <p className="text-sm font-medium text-text">{spell.name}</p>
        {action}
      </div>
      <SpellFacts spell={spell} />
    </div>
  )
}

function SpellChip({
  spell,
  selected,
  inspected,
  muted,
  onClick,
  onClearPrepared,
  title,
  badge,
}: {
  spell: Spell
  selected?: boolean
  inspected?: boolean
  muted?: boolean
  onClick?: () => void
  onClearPrepared?: () => void
  title?: string
  badge?: string
}) {
  const className = `inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs ${
    inspected
      ? 'border-accent bg-accent/25 text-accent ring-1 ring-accent/40'
      : selected
        ? 'border-accent bg-accent/20 text-accent'
        : 'border-border bg-surface-3 text-text-muted'
  } ${muted ? 'opacity-40' : ''}`
  const inner = (
    <>
      {spell.actionType ? <ActionCost type={spell.actionType} /> : null}
      <span>{spell.name}</span>
      {badge ? (
        <span className="text-[10px] text-text-dim">{badge}</span>
      ) : null}
    </>
  )
  if (!onClick) {
    return (
      <span className={className} title={title}>
        {inner}
      </span>
    )
  }
  return (
    <span className="inline-flex items-center">
      <button
        type="button"
        title={title}
        onClick={onClick}
        className={`${className} transition-all hover:border-border-strong hover:text-text ${
          onClearPrepared ? 'rounded-r-none' : ''
        }`}
      >
        {inner}
      </button>
      {onClearPrepared ? (
        <button
          type="button"
          title="Tirar da preparação"
          aria-label={`Tirar ${spell.name} da preparação`}
          onClick={onClearPrepared}
          className="rounded-r-lg border border-l-0 border-accent bg-accent/20 px-1.5 py-1.5 text-[11px] text-accent hover:bg-accent/30"
        >
          ×
        </button>
      ) : null}
    </span>
  )
}

function LimitedCasterTip({ prepared }: { prepared: boolean }) {
  return (
    <Tip>
      <strong className="text-text">Conjuração limitada</strong>: no máximo 2
      espaços por posto. Ao subir de nível, os postos baixos permanecem.
      {prepared
        ? ' Prepare do grimório nos espaços do dia.'
        : ' Gaste os espaços do repertório na hora.'}
    </Tip>
  )
}

function BoundedWaveTip() {
  return (
    <Tip>
      <strong className="text-text">Onda (legado)</strong>: poucos espaços só
      nos postos mais altos. Ao subir de nível, espaços baixos somem e a onda
      sobe. Magias do grimório/repertório continuam válidas elevadas nos
      espaços altos.
    </Tip>
  )
}

function RankSlotGroup({
  rank,
  slots,
  options,
  spellById,
  fontKind,
  onPrepare,
  onExpend,
}: {
  rank: number
  slots: PreparedSpellSlot[]
  options: Spell[]
  spellById: Record<string, Spell>
  fontKind?: 'heal' | 'harm'
  onPrepare: (slotId: string, spellId: string | null) => void
  onExpend: (slotId: string, expended: boolean) => void
}) {
  const [peekSlotId, setPeekSlotId] = useState<string | null>(null)
  return (
    <Panel
      title={`Posto ${rank}`}
      subtitle={`${slots.length} espaço${slots.length === 1 ? '' : 's'}`}
      compact
    >
      <ul className="space-y-1.5">
        {slots.map((slot) => {
          const spell = slot.spellId ? spellById[slot.spellId] ?? null : null
          const open = peekSlotId === slot.id
          const slotOptions = slot.font
            ? options.filter((sp) => {
                if (fontKind === 'heal') return sp.originalName === 'Heal'
                if (fontKind === 'harm') return sp.originalName === 'Harm'
                return (
                  sp.originalName === 'Heal' || sp.originalName === 'Harm'
                )
              })
            : options
          return (
            <li
              key={slot.id}
              className={`rounded-lg border px-2.5 py-2 ${
                slot.expended
                  ? 'border-border/50 bg-surface-2/30'
                  : 'border-border/70 bg-surface-2/50'
              }`}
            >
              <div
                className={`flex flex-wrap items-center gap-2 ${
                  slot.expended ? 'opacity-70' : ''
                }`}
              >
                <SpellPicker
                  spells={slotOptions}
                  value={slot.spellId}
                  heightenRank={rank}
                  onChange={(id) => {
                    onPrepare(slot.id, id)
                    if (id) setPeekSlotId(slot.id)
                  }}
                  onNameClick={
                    spell
                      ? () =>
                          setPeekSlotId((id) =>
                            id === slot.id ? null : slot.id,
                          )
                      : undefined
                  }
                />
                {slot.font && (
                  <Badge tone="accent">Fonte</Badge>
                )}
                {spell?.summary && !open ? (
                  <button
                    type="button"
                    className="hidden min-w-0 flex-1 truncate text-left text-[11px] text-text-dim hover:text-text sm:inline"
                    onClick={() =>
                      setPeekSlotId((id) => (id === slot.id ? null : slot.id))
                    }
                  >
                    <RichText>{spell.summary}</RichText>
                  </button>
                ) : null}
                <Button
                  size="sm"
                  variant={slot.expended ? 'secondary' : 'accent'}
                  disabled={!slot.spellId}
                  onClick={() => onExpend(slot.id, !slot.expended)}
                >
                  {slot.expended ? 'Restaurar' : 'Conjurar'}
                </Button>
              </div>
              {open ? <SpellPeek spell={spell} /> : null}
            </li>
          )
        })}
      </ul>
    </Panel>
  )
}

function SpontaneousDayBoard({
  access,
  state,
  catalog,
  level,
  onChange,
}: {
  access: ResolvedSpellcastingAccess
  state?: CharacterSpellState
  catalog: Spell[]
  level: number
  onChange: (s: CharacterSpellState) => void
}) {
  const granted = resolveGrantedSpellIds(access, catalog)
  const known = mergedKnownSpellIds(state, granted)
  const repertoire = new Set(known.collectionIds)
  const signatures = signatureSet(state)
  const knownCantrips = catalog.filter(
    (sp) => sp.rank === 0 && !sp.focus && known.cantripIds.includes(sp.id),
  )
  const ranks = Object.keys(access.slotsByRank ?? {})
    .map(Number)
    .sort((a, b) => a - b) as Exclude<SpellRank, 0>[]
  const pending = pendingSignaturePicks(
    access,
    state,
    catalog,
    known.collectionIds,
    level,
  )
  const [peekId, setPeekId] = useState<string | null>(null)
  const peekSpell =
    peekId != null ? catalog.find((sp) => sp.id === peekId) ?? null : null

  return (
    <div className="space-y-3">
      <Tip>
        Espontâneo: o repertório define o que você sabe. Ao conjurar, gasta um
        espaço do posto — a magia é escolhida na hora.
        {signatureFeatureActive(access, level)
          ? ' Emblemáticas elevam em qualquer espaço ≥ o posto; as outras só no posto em que você as conhece.'
          : ''}
      </Tip>
      {pending.length > 0 && (
        <p className="rounded-xl border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-text">
          Falta marcar emblemática:{' '}
          {pending
            .map((p) =>
              p.rank <= 3 && p.needed > 1
                ? `${p.needed - p.have} extra(s) até posto ${p.rank}`
                : `posto ${p.rank}`,
            )
            .join(', ')}
          . Faça isso na aba do repertório.
        </p>
      )}
      <Panel title="Truques" subtitle="à vontade" compact>
        {knownCantrips.length > 0 ? (
          <>
            <div className="flex flex-wrap gap-1.5">
              {knownCantrips.map((sp) => (
                <SpellChip
                  key={sp.id}
                  spell={sp}
                  selected
                  inspected={peekId === sp.id}
                  title="Clique para ler o efeito"
                  onClick={() =>
                    setPeekId((id) => (id === sp.id ? null : sp.id))
                  }
                />
              ))}
            </div>
            {peekSpell && knownCantrips.some((s) => s.id === peekSpell.id) ? (
              <SpellPeek spell={peekSpell} />
            ) : null}
          </>
        ) : (
          <p className="text-[11px] text-text-dim">
            Nenhum no repertório — adicione na aba da coleção.
          </p>
        )}
      </Panel>
      {ranks.length === 0 && (
        <Panel quiet>
          <p className="py-4 text-center text-sm text-text-dim">
            Nenhum espaço neste nível.
          </p>
        </Panel>
      )}
      {ranks.map((rank) => {
        const max = access.slotsByRank?.[rank] ?? 0
        const used = state?.spontaneousSlotsUsed?.[rank] ?? 0
        const left = max - used
        const options = spontaneousOptionsForRank(
          catalog,
          repertoire,
          rank,
          state,
          access,
          level,
        )
        return (
          <Panel
            key={rank}
            title={`Posto ${rank}`}
            subtitle={`${left}/${max} restantes`}
            compact
            actions={
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="accent"
                  disabled={left <= 0 || options.length === 0}
                  onClick={() => {
                    const next = spendSpontaneousSlot(state, rank, max)
                    if (next) onChange(next)
                  }}
                >
                  Gastar espaço
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={used <= 0}
                  onClick={() => onChange(restoreSpontaneousSlot(state, rank))}
                >
                  Devolver
                </Button>
              </div>
            }
          >
            {options.length > 0 ? (
              <>
                <div className="flex flex-wrap gap-1.5">
                  {options.map((o) => (
                    <SpellChip
                      key={o.id}
                      spell={o}
                      inspected={peekId === o.id}
                      title="Clique para ler o efeito"
                      badge={
                        signatures.has(o.id) && o.rank < rank
                          ? 'emblemática'
                          : undefined
                      }
                      onClick={() =>
                        setPeekId((id) => (id === o.id ? null : o.id))
                      }
                    />
                  ))}
                </div>
                {peekSpell && options.some((o) => o.id === peekSpell.id) ? (
                  <SpellPeek spell={peekSpell} />
                ) : null}
              </>
            ) : (
              <p className="text-[11px] text-text-dim">
                Nenhuma magia neste espaço — adicione na aba Repertório.
              </p>
            )}
          </Panel>
        )
      })}
    </div>
  )
}

function CollectionBoard({
  access,
  state,
  catalog,
  level,
  onChange,
}: {
  access: ResolvedSpellcastingAccess
  state?: CharacterSpellState
  catalog: Spell[]
  level: number
  onChange: (s: CharacterSpellState) => void
}) {
  const isBook = usesSpellbookCollection(access)
  const fromTradition = preparesFromTraditionList(access)
  const granted = resolveGrantedSpellIds(access, catalog)
  const merged = mergedKnownSpellIds(state, granted)
  const known = new Set([
    ...merged.collectionIds,
    ...merged.cantripIds,
    ...merged.focusIds,
  ])
  const locked = new Set([...granted.cantripIds, ...granted.collectionIds])
  const signatures = signatureSet(state)
  const showSignature = signatureFeatureActive(access, level)
  const pendingSignatures = pendingSignaturePicks(
    access,
    state,
    catalog,
    merged.collectionIds,
    level,
  )
  const [query, setQuery] = useState('')
  const [ranks, setRanks] = useState<string[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [traditions, setTraditions] = useState<SpellTradition[]>([])
  const [onlyKnown, setOnlyKnown] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const searchRef = useSlashSearch()
  const knownTraditions = knownTraditionsFromAccess(access)
  const traditionFilterOptions = TRADITION_FILTER_OPTIONS.filter((opt) =>
    knownTraditions.includes(opt.value),
  )
  const learnableRankSet = useMemo(
    () => new Set(learnableSpellRanks(access)),
    [access],
  )
  const rankFilterOptions = SPELL_RANK_FILTER_OPTIONS.filter((opt) =>
    learnableRankSet.has(Number(opt.value)),
  )

  useEffect(() => {
    setTraditions((prev) => {
      const next = prev.filter((t) => knownTraditions.includes(t))
      if (
        next.length === prev.length &&
        next.every((t, i) => t === prev[i])
      ) {
        return prev
      }
      return next
    })
  }, [knownTraditions])

  useEffect(() => {
    setRanks((prev) => {
      const next = prev.filter((r) => learnableRankSet.has(Number(r)))
      if (next.length === prev.length && next.every((r, i) => r === prev[i])) {
        return prev
      }
      return next
    })
  }, [learnableRankSet])

  const title = spellCollectionLabel(access)
  const traditionNames = knownTraditions.map(traditionLabel).join(', ')
  const traditionCatalogNote = traditionNames
    ? `Catálogo: só magias das tradições que você conhece (${traditionNames}).`
    : 'Catálogo: nenhuma tradição ainda — escolha a tradição da classe ou do arquétipo.'
  const styleNote = `${
    fromTradition
      ? 'Você prepara da lista inteira da tradição.'
      : access.features.limitedSlots
        ? isBook
          ? 'Conjuração limitada + grimório: aprenda aqui; prepare nos espaços do dia (os postos baixos permanecem).'
          : 'Conjuração limitada + repertório: conhece estas magias e gasta os espaços espontaneamente.'
        : access.primaryStyle === 'bounded'
          ? isBook
            ? 'Onda + grimório: aprenda aqui; prepare só nos poucos espaços altos do dia.'
            : 'Onda + repertório: conhece estas magias e gasta os espaços altos espontaneamente.'
          : isBook
            ? access.features.familiar
              ? 'O familiar guarda as magias. Aprenda aqui; depois prepare nos espaços do dia.'
              : 'Aprenda magias aqui; depois prepare nos espaços do dia.'
            : 'Magias conhecidas do repertório.'
  } ${traditionCatalogNote}`
  const signatureNote = showSignature
    ? ' No 3º+, marque 1 emblemática por posto (eleva em qualquer espaço).'
    : ''
  const slotRankNote =
    learnableRankSet.size > 0
      ? ' Só magias dos postos para os quais você tem espaços (e truques, se a classe der).'
      : ''

  const listed = catalog.filter((s) => {
    if (s.focus) return false
    if (learnableRankSet.has(s.rank)) return true
    return known.has(s.id)
  })
  const filtered = listed.filter((s) => {
    if (onlyKnown && !known.has(s.id)) return false
    if (!matchesSelected(String(s.rank), ranks)) return false
    if (!matchesSelected(s.rarity, rarities)) return false
    if (
      traditions.length > 0 &&
      !s.traditions.some((t) => traditions.includes(t))
    ) {
      return false
    }
    return spellMatchesQuery(s, query)
  })
  const grouped = [...new Set(filtered.map((s) => s.rank))]
    .sort((a, b) => a - b)
    .map((rank) => ({
      rank,
      spells: filtered
        .filter((s) => s.rank === rank)
        .sort((a, b) => {
          const ar = locked.has(a.id) ? 0 : known.has(a.id) ? 1 : 2
          const br = locked.has(b.id) ? 0 : known.has(b.id) ? 1 : 2
          if (ar !== br) return ar - br
          return a.name.localeCompare(b.name, 'pt')
        }),
    }))

  const selected =
    listed.find((s) => s.id === selectedId) ?? filtered[0] ?? null
  const selectedOwned = selected ? known.has(selected.id) : false
  const selectedGranted = selected ? granted.labelsById[selected.id] : undefined
  const selectedLearnable = selected
    ? spellRankIsLearnable(selected.rank, access)
    : false

  return (
    <div className="flex h-[min(44rem,calc(100vh-14rem))] min-h-[24rem] flex-col gap-3 lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border border-border/90 bg-surface-1">
        <div className="border-b border-border/60 px-4 py-3">
          <div className="text-sm font-medium text-text">{title}</div>
          <p className="text-[11px] text-text-dim">
            {styleNote}
            {slotRankNote}
            {signatureNote}
          </p>
          {pendingSignatures.length > 0 && (
            <p className="mt-1.5 text-[11px] text-accent">
              Falta emblemática:{' '}
              {pendingSignatures
                .map((p) =>
                  p.needed > 1
                    ? `${p.needed - p.have} extra(s) (posto ≤ ${p.rank})`
                    : `posto ${p.rank}`,
                )
                .join(', ')}
            </p>
          )}
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar pelo nome… (/)"
            className="mt-2"
          />
          <div className="mt-2 space-y-2">
            <MultiFilter
              label="Posto"
              options={rankFilterOptions}
              selected={ranks}
              onChange={setRanks}
              emptyLabel="Todos os seus"
            />
            <MultiFilter
              label="Raridade"
              options={RARITY_FILTER_OPTIONS}
              selected={rarities}
              onChange={setRarities}
              emptyLabel="Todas"
            />
            {traditionFilterOptions.length > 1 && (
              <MultiFilter
                label="Tradição"
                options={traditionFilterOptions}
                selected={traditions}
                onChange={setTraditions}
                emptyLabel="Todas as suas"
              />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <Button
              size="sm"
              variant={onlyKnown ? 'accent' : 'secondary'}
              onClick={() => setOnlyKnown((v) => !v)}
            >
              Só conhecidas
            </Button>
            <span className="text-[11px] text-text-dim">
              {filtered.length} de {listed.length}
            </span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {grouped.map((group) => (
            <div key={group.rank}>
              <div className="sticky top-0 border-b border-border/40 bg-surface-2/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-text-dim backdrop-blur-sm">
                {spellRankLabel(group.rank)} · {group.spells.length}
              </div>
              <ul className="divide-y divide-border/50">
                {group.spells.map((spell) => {
                  const owned = known.has(spell.id)
                  const active = selected?.id === spell.id
                  return (
                    <li key={spell.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(spell.id)}
                        className={`flex w-full items-start justify-between gap-2 px-4 py-2.5 text-left transition-colors ${
                          active
                            ? 'bg-accent/15'
                            : 'hover:bg-surface-2'
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-text">
                              {spell.name}
                            </span>
                            {spell.actionType ? (
                              <ActionCost type={spell.actionType} />
                            ) : null}
                            {signatures.has(spell.id) && (
                              <Badge tone="accent">Emblemática</Badge>
                            )}
                            {owned && (
                              <Badge tone="success">Na ficha</Badge>
                            )}
                            {spell.rarity !== 'common' && (
                              <RarityBadge rarity={spell.rarity} />
                            )}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-text-dim">
                            {spell.originalName}
                            {spell.traditions.length > 0
                              ? ` · ${spell.traditions
                                  .map((t) => TRADITION_LABELS[t])
                                  .join(', ')}`
                              : ''}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-text-dim">
              Nenhuma magia neste filtro.
            </p>
          )}
        </div>
      </div>

      <SpellDetailPanel
        spell={selected}
        actions={
          selected && !fromTradition ? (
            <div className="flex flex-col items-end gap-1">
              <Button
                size="sm"
                variant={selectedOwned ? 'secondary' : 'accent'}
                disabled={
                  locked.has(selected.id) ||
                  (!selectedOwned && !selectedLearnable)
                }
                title={
                  selectedGranted
                    ? `Concedida: ${selectedGranted}`
                    : !selectedOwned && !selectedLearnable
                      ? 'Sem espaço deste posto ainda.'
                      : undefined
                }
                onClick={() =>
                  onChange(
                    selectedOwned
                      ? unlearnSpell(state, selected.id)
                      : learnSpell(state, selected, access),
                  )
                }
              >
                {selectedGranted
                  ? selectedGranted
                  : selectedOwned
                    ? 'Remover'
                    : isBook
                      ? 'Aprender'
                      : 'Adicionar'}
              </Button>
              {showSignature && selectedOwned && selected.rank > 0 && (
                <Button
                  size="sm"
                  variant={
                    signatures.has(selected.id) ? 'accent' : 'secondary'
                  }
                  onClick={() =>
                    onChange(
                      toggleSignatureSpell(
                        state,
                        selected,
                        access,
                        catalog,
                        merged.collectionIds,
                        level,
                      ),
                    )
                  }
                >
                  {signatures.has(selected.id)
                    ? 'Emblemática'
                    : 'Marcar emblemática'}
                </Button>
              )}
            </div>
          ) : selected && fromTradition ? (
            <Badge>Na lista</Badge>
          ) : undefined
        }
      />
    </div>
  )
}

function FocusBoard({
  access,
  state,
  catalog,
  onChange,
}: {
  access: ResolvedSpellcastingAccess
  state?: CharacterSpellState
  catalog: Spell[]
  onChange: (s: CharacterSpellState) => void
}) {
  const [query, setQuery] = useState('')
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [ranks, setRanks] = useState<string[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const searchRef = useSlashSearch()
  const focusSpells = catalog.filter((s) => s.focus)
  const granted = resolveGrantedSpellIds(access, catalog)
  const grantedFocusIds = new Set(granted.focusIds)
  const known = new Set([
    ...(state?.focusSpellIds ?? []),
    ...grantedFocusIds,
  ])
  const max = resolveFocusMax(state, access)
  const current = state?.focusPointsCurrent ?? max
  const pct = max > 0 ? Math.round((current / max) * 100) : 0
  const filtered = focusSpells
    .filter((s) => {
      if (!matchesSelected(s.rarity, rarities)) return false
      if (!matchesSelected(String(s.rank), ranks)) return false
      return spellMatchesQuery(s, query)
    })
    .sort((a, b) => {
      const ak = known.has(a.id) ? 0 : 1
      const bk = known.has(b.id) ? 0 : 1
      if (ak !== bk) return ak - bk
      if (a.rank !== b.rank) return a.rank - b.rank
      return a.name.localeCompare(b.name, 'pt')
    })
  const selected =
    focusSpells.find((s) => s.id === selectedId) ?? filtered[0] ?? null
  const selectedOwned = selected ? known.has(selected.id) : false
  const rankOptions = [...new Set(focusSpells.map((s) => s.rank))]
    .sort((a, b) => a - b)
    .map((rank) => ({
      value: String(rank),
      label: spellRankLabel(rank),
    }))

  return (
    <div className="space-y-3">
      <Panel compact>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-sm font-medium text-text">
              Pontos de Foco · {current}/{max}
            </div>
            <p className="text-[11px] text-text-dim">
              Máx. 3. Preparações diárias enchem a reserva; Refocar (10 min)
              recupera 1. Altura automática posto {access.autoHeightenRank}.
              {access.focusPoolExtras && access.focusPoolExtras.length > 0
                ? ` ${access.focusPoolExtras.map((part) => part.label).join(', ')}.`
                : ''}
            </p>
          </div>
          <div className="flex gap-1.5">
            <Button
              size="sm"
              variant="accent"
              disabled={current <= 0}
              onClick={() => {
                const next = spendFocusPoint(state)
                if (next) onChange(next)
              }}
            >
              Gastar 1 PF
            </Button>
            <Button
              size="sm"
              variant="secondary"
              disabled={current >= max}
              onClick={() => onChange(refocus(state, access))}
            >
              Refocar
            </Button>
          </div>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-3">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Panel>

      <div className="flex h-[min(36rem,calc(100vh-18rem))] min-h-[20rem] flex-col gap-3 lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border border-border/90 bg-surface-1">
          <div className="border-b border-border/60 px-4 py-3">
            <div className="text-sm font-medium text-text">Magias de foco</div>
            <p className="text-[11px] text-text-dim">
              Lista da sua classe (Remaster). Aprenda as que o personagem
              realmente tem (domínio, escola, ordem, musa…).
            </p>
            <Input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar pelo nome… (/)"
              className="mt-2"
            />
            <FilterCount
              shown={filtered.length}
              total={focusSpells.length}
              className="mt-2"
            />
            <div className="mt-2 space-y-2">
              <MultiFilter
                label="Posto"
                options={rankOptions}
                selected={ranks}
                onChange={setRanks}
                emptyLabel="Todos"
              />
              <MultiFilter
                label="Raridade"
                options={RARITY_FILTER_OPTIONS}
                selected={rarities}
                onChange={setRarities}
                emptyLabel="Todas"
              />
            </div>
          </div>
          <ul className="min-h-0 flex-1 divide-y divide-border/50 overflow-y-auto">
            {filtered.map((spell) => {
              const owned = known.has(spell.id)
              const active = selected?.id === spell.id
              return (
                <li key={spell.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(spell.id)}
                    className={`flex w-full items-start justify-between gap-2 px-4 py-2.5 text-left transition-colors ${
                      active ? 'bg-accent/15' : 'hover:bg-surface-2'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2 font-medium text-text">
                        {spell.name}
                        {spell.actionType ? (
                          <ActionCost type={spell.actionType} />
                        ) : null}
                        {owned && <Badge tone="success">Na ficha</Badge>}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-text-dim">
                        {spellRankLabel(spell.rank)} · {spell.originalName}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-text-dim">
                {focusSpells.length === 0
                  ? 'Esta classe ainda não tem magias de foco no catálogo.'
                  : 'Nenhuma magia neste filtro.'}
              </li>
            )}
          </ul>
        </div>

        <SpellDetailPanel
          spell={selected}
          actions={
            selected ? (
              <Button
                size="sm"
                variant={selectedOwned ? 'secondary' : 'accent'}
                disabled={grantedFocusIds.has(selected.id)}
                title={
                  grantedFocusIds.has(selected.id)
                    ? `Concedida: ${granted.labelsById[selected.id] ?? 'classe'}`
                    : undefined
                }
                onClick={() =>
                  onChange(
                    selectedOwned
                      ? unlearnSpell(state, selected.id)
                      : learnSpell(state, selected, access),
                  )
                }
              >
                {grantedFocusIds.has(selected.id)
                  ? (granted.labelsById[selected.id] ?? 'Classe')
                  : selectedOwned
                    ? 'Esquecer'
                    : 'Aprender'}
              </Button>
            ) : undefined
          }
        />
      </div>
    </div>
  )
}

function HelpBoard({
  access,
  characterClass,
  characterLevel,
}: {
  access: ResolvedSpellcastingAccess
  characterClass?: CharacterClass | null
  characterLevel: number
}) {
  const style = access.primaryStyle
  const castMode = resolveCastMode(access)

  return (
    <div className="space-y-3">
      {characterClass ? (
        <ClassTables
          characterClass={characterClass}
          characterLevel={characterLevel}
          slotsOnly
        />
      ) : null}
    <Panel title="Como funciona">
      <div className="space-y-3 text-sm text-text-muted">
        <p>
          Regras base (Player Core, Player Core 2, Impossible Magic, Dark
          Archives Remastered / Archives of Nethys), adaptadas para esta ficha:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-[13px]">
          <li>
            <strong className="text-text">Tradições</strong>: cada classe e
            cada arquétipo tem a própria lista (grimório, repertório ou lista da
            tradição), só com magias da tradição daquela fonte. Magus não
            prepara divina no livro; Dedicação de Clérigo não aprende arcana.
            Trocar patrono/linhagem ou perder um arquétipo tira magias que não
            combinam mais.
          </li>
          <li>
            <strong className="text-text">Preparado</strong> (mago, bruxa,
            clérigo, druida, magus): nas preparações diárias você preenche os
            espaços. Mago/bruxa/magus aprendem no grimório ou no familiar;
            clérigo/druida preparam direto da lista da tradição. Espaço gasto ao
            conjurar; truques ilimitados depois de preparados.
          </li>
          <li>
            <strong className="text-text">Espontâneo</strong> (bardo,
            feiticeiro, oráculo, invocador, psíquico): repertório fixo; escolhe
            a magia na hora e gasta o espaço. A linhagem do feiticeiro define a
            tradição; o oráculo é sempre divino; o invocador segue o eidolon; o
            psíquico é oculto (mente consciente/subconsciente, poucos espaços,
            truques psi com amps que gastam PF).
          </li>
          <li>
            <strong className="text-text">Limitada</strong> (magus, invocador,
            psíquico Remaster): no máximo 2 espaços por posto; os baixos
            permanecem ao subir de nível. Magus prepara do grimório; invocador e
            psíquico gastam do repertório.
          </li>
          <li>
            <strong className="text-text">Só foco</strong> (campeão, monge com
            qi): sem espaços. Só magias de foco e Pontos de Foco. O monge escolhe
            tradição divina ou oculta nesta aba.
          </li>
          <li>
            <strong className="text-text">Foco</strong>: reserva separada (máx. 3
            PF). Não usa espaços. Refocar recupera 1. Altura = metade do nível.
            O psíquico e o necromante começam com 2 PF.
          </li>
          <li>
            <strong className="text-text">Rituais</strong>: não usam tradição nem
            espaços. Qualquer personagem pode conhecê-los. O teste principal é de
            perícia (Arcanismo, Natureza, Ocultismo, Religião…). Tempo longo
            (horas ou dias), custo em materiais e, em muitos casos, conjuradores
            secundários. Marque os conhecidos nesta aba; o texto completo fica no
            livro.
          </li>
          <li>
            <strong className="text-text">Ataque / CD</strong>: proficiência +
            atributo de conjuração (+10 na CD). Campeão usa Carisma; monge,
            Sabedoria; magus, Inteligência — mesmo que o atributo-chave da classe
            seja outro.
          </li>
          {access.features.familiar && (
            <li>
              <strong className="text-text">Familiar (Bruxa)</strong>: guarda as
              magias no lugar do grimório. Aprenda na aba Familiar; prepare no
              dia.
            </li>
          )}
          {access.features.traditionList && (
            <li>
              <strong className="text-text">Lista da tradição</strong>: você
              prepara qualquer magia da tradição (não precisa “aprender” antes).
            </li>
          )}
          {access.classOriginalName === 'Necromancer' && (
            <li>
              <strong className="text-text">Necromante (réquiem)</strong>:
              grimório interno oculto, Inteligência, máx. 2 espaços por posto.
              <em> Ferir</em> entra como oculta. Magias de túmulo ficam na aba
              Foco (reserva 2). Truques Criar Servo e Investida de Servo não
              gastam PF.
            </li>
          )}
          {access.classOriginalName === 'Animist' && (
            <li>
              <strong className="text-text">Animista (dois motores)</strong>: o
              número da aba soma preparado da lista divina + espontâneo das
              aparições. Não misture os espaços. Magias de aparição são todas
              signature. Vaso = foco da primária.
            </li>
          )}
          {access.features.curriculumBonusSlot && (
            <li>
              <strong className="text-text">Currículo (Mago Remaster)</strong>:
              +1 espaço por posto (exceto Teoria Mágica Unificada).
            </li>
          )}
          {access.features.bondedItem && (
            <li>
              <strong className="text-text">Vínculo arcano</strong>: 1×/dia
              reergue uma magia preparada (Drenar Item Vinculado).
            </li>
          )}
        </ul>
        {style && (
          <p className="rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-[13px] text-text">
            Seu personagem agora: <strong>{spellcastingStyleLabel(style)}</strong>
            {style === 'bounded'
              ? ` · gasta espaços como ${castMode === 'spontaneous' ? 'espontâneo' : 'preparado'}`
              : ''}
            {access.styleHint ? ` — ${access.styleHint}` : ''}
          </p>
        )}
        <Tip>
          Catálogo da ficha: cada fonte (classe ou arquétipo) só mostra magias
          da tradição dela, mais magias de foco Remaster da classe, e rituais
          (postos 1–10). Sem legado. O painel da magia traz o efeito completo
          (incluindo altura). A lista continua com o resumo curto.
        </Tip>
      </div>
    </Panel>
    </div>
  )
}
