import type { ReactNode } from 'react'
import type {
  CharacterSpellState,
  ResolvedCharacterSheet,
  ResolvedSpellcastingAccess,
  ResolvedSpellcastingSource,
  Spell,
  SpellRank,
} from '@/types'
import {
  accessForSource,
  commitSourceSpellState,
  mergedKnownSpellIds,
  primarySpellSourceId,
  refocus,
  resolveCastMode,
  resolveFocusMax,
  resolveGrantedSpellIds,
  restoreSpontaneousSlot,
  setSlotExpended,
  sourceAttackBreakdown,
  spendFocusPoint,
  spendSpontaneousSlot,
  spontaneousOptionsForRank,
  canHeightenFreely,
  signatureSet,
  filterSpellsForSource,
  spellSourcesWithCollection,
  traditionLabel,
  viewStateForSource,
} from '@/engine'
import { getSpellById, listSpells } from '@/engine/spellCatalog'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import { SpellFacts } from '@/features/spells/components/SpellFacts'
import { spellRankLabel } from '@/features/spells/spellUi'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { Panel } from '@/components/ui/Panel'
import { CombatSpellRolls } from '@/features/characters/components/CombatSpellRolls'

interface CombatSpellsPanelProps {
  sheet: ResolvedCharacterSheet
  onChangeSpellState?: (state: CharacterSpellState) => void
}

type ReadyKind = 'cantrip' | 'prepared' | 'spontaneous' | 'focus'

interface ReadySpellRow {
  key: string
  spell: Spell
  kind: ReadyKind
  castRank: number
  expended?: boolean
  slotId?: string
  badge?: string
}

function attackBreakdown(
  source: ResolvedSpellcastingSource | undefined,
): Array<{ label: string; value: number }> | undefined {
  if (!source) return undefined
  return sourceAttackBreakdown(source)
}

function sourceForFocusSpell(
  access: ResolvedSpellcastingAccess,
  spell: Spell,
): ResolvedSpellcastingSource | undefined {
  return (
    access.sources.find(
      (source) =>
        source.classOriginalName &&
        spell.traits.includes(source.classOriginalName),
    ) ?? access.sources[0]
  )
}

function spendSpontaneousAtRank(
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
  spell: Spell,
  level: number,
): CharacterSpellState | null {
  const ranks = Object.keys(access.slotsByRank ?? {})
    .map(Number)
    .filter((rank): rank is Exclude<SpellRank, 0> => rank >= 1 && rank <= 10)
    .sort((a, b) => a - b)
  for (const rank of ranks) {
    if (!canHeightenFreely(spell, rank, state, access, level)) continue
    const max = access.slotsByRank?.[rank] ?? 0
    const next = spendSpontaneousSlot(state, rank, max)
    if (next) return next
  }
  return null
}

function spontaneousLeftAt(
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
  spell: Spell,
  level: number,
): number {
  const ranks = Object.keys(access.slotsByRank ?? {})
    .map(Number)
    .filter((rank): rank is Exclude<SpellRank, 0> => rank >= 1 && rank <= 10)
  let left = 0
  for (const rank of ranks) {
    if (!canHeightenFreely(spell, rank, state, access, level)) continue
    const max = access.slotsByRank?.[rank] ?? 0
    const used = state?.spontaneousSlotsUsed?.[rank] ?? 0
    left += Math.max(0, max - used)
  }
  return left
}

export function CombatSpellsPanel({
  sheet,
  onChangeSpellState,
}: CombatSpellsPanelProps) {
  const access = sheet.spellcasting
  if (!access?.hasAccess) return null

  const state = sheet.character.spellState
  const primaryId = primarySpellSourceId(access)
  const collectionSources = spellSourcesWithCollection(access)
  const allSpells = listSpells()
  const focusMax = resolveFocusMax(state, access)
  const focusCurrent = state?.focusPointsCurrent ?? focusMax
  const grantedFocus = resolveGrantedSpellIds(access, allSpells)
  const knownFocus = mergedKnownSpellIds(state, grantedFocus)

  const focus: ReadySpellRow[] = []
  for (const id of knownFocus.focusIds) {
    const spell = getSpellById(id)
    if (!spell) continue
    focus.push({
      key: `focus-${id}`,
      spell,
      kind: 'focus',
      castRank: access.autoHeightenRank ?? spell.rank,
    })
  }

  const sourceBlocks = collectionSources.map((source) =>
    buildCombatSourceBlock(sheet, source, access, primaryId),
  )
  const hasAny =
    sourceBlocks.some(
      (block) => block.cantrips.length + block.rankedGroups.length > 0,
    ) || focus.length > 0

  return (
    <div className="space-y-3">
      <Panel quiet compact title="Magias" subtitle="Por classe e arquétipo">
        {!hasAny ? (
          <p className="text-sm text-text-dim">
            Nada pronto ainda. Prepare, aprenda ou marque magias de foco na aba
            Magias — elas aparecem aqui para conjurar sem sair do combate.
          </p>
        ) : (
          <div className="space-y-4">
            {sourceBlocks.map((block) => (
              <div key={block.source.id} className="space-y-3">
                {collectionSources.length > 1 && (
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                    {block.source.label}
                    <span className="ml-1.5 font-normal normal-case tracking-normal">
                      {traditionLabel(block.source.tradition)}
                    </span>
                  </p>
                )}
                {block.cantrips.length > 0 ? (
                  <SpellGroup title="Truques" hint="à vontade">
                    {block.cantrips.map((row) => (
                      <ReadySpellCard
                        key={row.key}
                        row={row}
                        sheet={sheet}
                        source={block.source}
                      />
                    ))}
                  </SpellGroup>
                ) : null}
                {block.rankedGroups.map((group) => (
                  <SpellGroup
                    key={`${block.source.id}-${group.rank}`}
                    title={group.label}
                    hint={
                      block.mode === 'spontaneous'
                        ? group.slotHint
                        : undefined
                    }
                  >
                    {group.rows.map((row) => (
                      <ReadySpellCard
                        key={row.key}
                        row={row}
                        sheet={sheet}
                        source={block.source}
                        hideRankBadge
                        onChangeSpellState={onChangeSpellState}
                        spontaneousLeft={
                          row.kind === 'spontaneous'
                            ? spontaneousLeftAt(
                                block.view,
                                block.slice,
                                row.spell,
                                sheet.character.level,
                              )
                            : undefined
                        }
                        usedSpontaneous={
                          block.view.spontaneousSlotsUsed?.[
                            row.spell.rank as Exclude<SpellRank, 0>
                          ] ?? 0
                        }
                        onTogglePrepared={
                          row.kind === 'prepared' && row.slotId
                            ? () =>
                                onChangeSpellState?.(
                                  commitSourceSpellState(
                                    state,
                                    block.source.id,
                                    setSlotExpended(
                                      block.view,
                                      row.slotId!,
                                      !row.expended,
                                    ),
                                    primaryId,
                                  ),
                                )
                            : undefined
                        }
                        onSpendSpontaneous={() => {
                          const nextView = spendSpontaneousAtRank(
                            block.view,
                            block.slice,
                            row.spell,
                            sheet.character.level,
                          )
                          if (nextView) {
                            onChangeSpellState?.(
                              commitSourceSpellState(
                                state,
                                block.source.id,
                                nextView,
                                primaryId,
                              ),
                            )
                          }
                        }}
                        onRestoreSpontaneous={() => {
                          const native = row.spell.rank as Exclude<SpellRank, 0>
                          onChangeSpellState?.(
                            commitSourceSpellState(
                              state,
                              block.source.id,
                              restoreSpontaneousSlot(block.view, native),
                              primaryId,
                            ),
                          )
                        }}
                      />
                    ))}
                  </SpellGroup>
                ))}
              </div>
            ))}
            {focus.length > 0 ? (
              <SpellGroup
                title="Foco"
                hint={`${focusCurrent}/${focusMax} PF`}
                actions={
                  onChangeSpellState ? (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="accent"
                        disabled={focusCurrent <= 0}
                        onClick={() => {
                          const next = spendFocusPoint(state)
                          if (next) onChangeSpellState(next)
                        }}
                      >
                        Gastar PF
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={focusCurrent >= focusMax}
                        onClick={() =>
                          onChangeSpellState(refocus(state, access))
                        }
                      >
                        Refocar
                      </Button>
                    </div>
                  ) : null
                }
              >
                {focus.map((row) => (
                  <ReadySpellCard
                    key={row.key}
                    row={row}
                    sheet={sheet}
                    source={sourceForFocusSpell(access, row.spell)}
                  />
                ))}
              </SpellGroup>
            ) : null}
          </div>
        )}
      </Panel>
    </div>
  )
}

function buildCombatSourceBlock(
  sheet: ResolvedCharacterSheet,
  source: ResolvedSpellcastingSource,
  access: ResolvedSpellcastingAccess,
  primaryId: string | undefined,
) {
  const slice = accessForSource(access, source)
  const view = viewStateForSource(
    sheet.character.spellState,
    source.id,
    primaryId,
  )
  const catalog = filterSpellsForSource(listSpells(), access, source)
  const granted = resolveGrantedSpellIds(slice, catalog)
  const known = mergedKnownSpellIds(view, granted)
  const mode = resolveCastMode(slice)
  const signatures = signatureSet(view)

  const cantrips: ReadySpellRow[] = []
  for (const id of known.cantripIds) {
    const spell = getSpellById(id)
    if (!spell || spell.focus || spell.rank !== 0) continue
    cantrips.push({
      key: `${source.id}-cantrip-${id}`,
      spell,
      kind: 'cantrip',
      castRank: access.autoHeightenRank ?? 0,
    })
  }

  const ranked: ReadySpellRow[] = []
  if (mode === 'prepared') {
    for (const slot of view.preparedSlots ?? []) {
      if (!slot.spellId) continue
      const spell = getSpellById(slot.spellId)
      if (!spell) continue
      ranked.push({
        key: `${source.id}-${slot.id}`,
        spell,
        kind: 'prepared',
        castRank: slot.rank,
        expended: slot.expended,
        slotId: slot.id,
        badge: slot.font ? 'fonte' : undefined,
      })
    }
  } else if (mode === 'spontaneous') {
    const repertoire = new Set(known.collectionIds)
    const seen = new Set<string>()
    const ranks = Object.keys(slice.slotsByRank ?? {})
      .map(Number)
      .sort((a, b) => a - b) as Exclude<SpellRank, 0>[]
    for (const rank of ranks) {
      for (const spell of spontaneousOptionsForRank(
        catalog,
        repertoire,
        rank,
        view,
        slice,
        sheet.character.level,
      )) {
        if (seen.has(spell.id)) continue
        seen.add(spell.id)
        ranked.push({
          key: `${source.id}-spontaneous-${spell.id}`,
          spell,
          kind: 'spontaneous',
          castRank: spell.rank,
          badge: signatures.has(spell.id) ? 'emblemática' : undefined,
        })
      }
    }
  }

  const rankedGroups = groupReadySpellsByRank(ranked).map((group) => {
    const rank = group.rank as Exclude<SpellRank, 0>
    const max = slice.slotsByRank?.[rank] ?? 0
    const used = view.spontaneousSlotsUsed?.[rank] ?? 0
    return {
      ...group,
      slotHint:
        mode === 'spontaneous' && max > 0
          ? `${max - used}/${max} espaços`
          : undefined,
    }
  })

  return { source, slice, view, mode, cantrips, rankedGroups }
}

function groupReadySpellsByRank(rows: ReadySpellRow[]): Array<{
  rank: number
  label: string
  rows: ReadySpellRow[]
}> {
  const byRank = new Map<number, ReadySpellRow[]>()
  for (const row of rows) {
    const list = byRank.get(row.castRank) ?? []
    list.push(row)
    byRank.set(row.castRank, list)
  }
  return [...byRank.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([rank, group]) => ({
      rank,
      label: rank <= 0 ? 'Truques' : `${rank}º posto`,
      rows: group,
    }))
}

function SpellGroup({
  title,
  hint,
  actions,
  children,
}: {
  title: string
  hint?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          {title}
          {hint ? (
            <span className="ml-1.5 font-normal normal-case tracking-normal">
              {hint}
            </span>
          ) : null}
        </p>
        {actions}
      </div>
      <ul className="space-y-2">{children}</ul>
    </div>
  )
}

function ReadySpellCard({
  row,
  sheet,
  source,
  onChangeSpellState,
  spontaneousLeft,
  usedSpontaneous,
  onTogglePrepared,
  onSpendSpontaneous,
  onRestoreSpontaneous,
  hideRankBadge,
}: {
  row: ReadySpellRow
  sheet: ResolvedCharacterSheet
  source?: ResolvedSpellcastingSource
  onChangeSpellState?: (state: CharacterSpellState) => void
  spontaneousLeft?: number
  usedSpontaneous?: number
  onTogglePrepared?: () => void
  onSpendSpontaneous?: () => void
  onRestoreSpontaneous?: () => void
  hideRankBadge?: boolean
}) {
  const stats = source ?? sheet.spellcasting?.sources[0]
  const display = withLocalizedSpell(row.spell)
  const expended = Boolean(row.expended)
  const rankHint =
    row.kind === 'cantrip' || row.kind === 'focus'
      ? `altura ${row.castRank}`
      : spellRankLabel(row.castRank)
  const showRank = !hideRankBadge || row.kind === 'cantrip' || row.kind === 'focus'

  return (
    <li>
      <ExpandableCard
        className={expended ? 'opacity-55' : ''}
        title={
          <span className="inline-flex items-center gap-1.5">
            {display.actionType ? (
              <ActionCost type={display.actionType} />
            ) : null}
            {display.name}
          </span>
        }
        subtitle={display.summary}
        badges={
          <>
            {showRank ? (
              <Badge className="!text-[9px]">{rankHint}</Badge>
            ) : null}
            {row.badge ? (
              <Badge className="!text-[9px]">{row.badge}</Badge>
            ) : null}
            {expended ? (
              <Badge className="!text-[9px]">gasta</Badge>
            ) : null}
          </>
        }
        toolbar={
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <CombatSpellRolls
              spell={row.spell}
              displayName={display.name}
              attackBonus={stats?.spellAttack}
              spellDc={stats?.spellDc}
              attackBreakdown={attackBreakdown(stats)}
            />
            {row.kind === 'prepared' && row.slotId && onTogglePrepared ? (
              <Button
                size="sm"
                variant={expended ? 'secondary' : 'accent'}
                onClick={onTogglePrepared}
              >
                {expended ? 'Devolver' : 'Gastar'}
              </Button>
            ) : null}
            {row.kind === 'spontaneous' && onChangeSpellState ? (
              <>
                <Button
                  size="sm"
                  variant="accent"
                  disabled={(spontaneousLeft ?? 0) <= 0}
                  title={
                    (spontaneousLeft ?? 0) <= 0
                      ? 'Sem espaços deste posto'
                      : 'Gasta um espaço (posto da magia ou mais alto, se emblemática)'
                  }
                  onClick={onSpendSpontaneous}
                >
                  Gastar
                </Button>
                {(usedSpontaneous ?? 0) > 0 && onRestoreSpontaneous ? (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={onRestoreSpontaneous}
                  >
                    Devolver
                  </Button>
                ) : null}
              </>
            ) : null}
          </div>
        }
      >
        <SpellFacts spell={display} />
      </ExpandableCard>
    </li>
  )
}
