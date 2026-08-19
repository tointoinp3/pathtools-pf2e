import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import type {
  CharacterClass,
  ContentSource,
  Feat,
  FeatCategory,
  FeatSelection,
  Heritage,
  ProficiencyRank,
  Rarity,
  SkillId,
  AttributeId,
  GrantedFeatPick,
} from '@/types'
import {
  evaluateFeatAvailability,
  evaluateFeatPrerequisiteChecks,
  extraAncestryIdsFromFeatChoices,
  extraAncestryIdsFromHeritage,
  extraHeritageIdsFromHeritage,
  featMatchesCategoryFilter,
  findArchetypeForFeat,
  getClassFeatLevels,
  getFeatSlots,
  isArchetypeFeat,
  isVersatileHeritage,
} from '@/engine'
import { formatSourceLabel, RARITY_FILTER_OPTIONS } from '@/utils/labels'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { MultiSelectDropdown, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import {
  ActionCost,
  ACTION_LABELS_PT,
  type Pf2ActionType,
} from '@/components/ui/ActionIcon'
import {
  descriptionLooksEnglish,
  localizeTraitLabel,
} from '@/data/i18n/traitLabelsPt'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'
import { cleanFeatMarkdownText } from '@/data/i18n/featDescriptionsPt'
import { FeatChoicePicker } from '@/features/feats/components/FeatChoicePicker'
import { PrerequisiteChecks } from '@/features/feats/components/PrerequisiteChecks'
import { useSlashSearch } from '@/utils/useSlashSearch'

const CATEGORY_LABELS: Record<FeatCategory, string> = {
  ancestry: 'Ancestralidade',
  class: 'Classe',
  skill: 'Perícia',
  general: 'Geral',
  archetype: 'Arquétipo',
  mythic: 'Mítico',
  other: 'Outro',
}

const ACTION_FILTER_OPTIONS: Array<{ value: Pf2ActionType; label: string }> = [
  { value: 'passive', label: ACTION_LABELS_PT.passive },
  { value: 'free', label: ACTION_LABELS_PT.free },
  { value: 'reaction', label: ACTION_LABELS_PT.reaction },
  { value: 'one', label: ACTION_LABELS_PT.one },
  { value: 'two', label: ACTION_LABELS_PT.two },
  { value: 'three', label: ACTION_LABELS_PT.three },
]

function featPickerGroup(feat: Feat): 0 | 1 | 2 {
  if (isArchetypeFeat(feat)) return 1
  if (feat.category === 'class') return 0
  return 2
}

function ChoiceChip({
  selected,
  onClick,
  children,
  disabled,
  title,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  disabled?: boolean
  title?: string
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={onClick}
      className={`interactive-lift rounded-lg border px-2.5 py-1.5 text-xs transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? 'border-accent bg-accent/20 text-accent shadow-[0_0_0_1px_rgba(212,168,75,0.25)]'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:bg-surface-4 hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

function FeatPickerGroupHeader({ children }: { children: ReactNode }) {
  return (
    <li className="sticky top-0 z-[1] bg-surface-1 px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
      {children}
    </li>
  )
}

type CatalogEntry = {
  feat: Feat
  available: boolean
  reasons: string[]
  checks: ReturnType<typeof evaluateFeatPrerequisiteChecks>
}

function slotKindHint(
  kind: FeatCategory,
  gainedAtLevel: number,
  ignoreDedicationLock: boolean,
): string | null {
  if (kind === 'class') {
    return ignoreDedicationLock
      ? 'Arquétipo e Dedicação também cabem neste slot. O bloqueio entre Dedicações está desligado.'
      : 'Arquétipo e Dedicação também cabem neste slot de classe.'
  }
  if (kind === 'general') return 'Cabem feitos gerais e de perícia.'
  if (kind === 'skill') return 'Só feitos com o traço Perícia.'
  if (kind === 'archetype') {
    return 'Slot de Arquétipos grátis: só feitos de arquétipo.'
  }
  if (kind === 'mythic') {
    if (gainedAtLevel === 12) return 'Só a Dedicação de um destino mítico.'
    if (gainedAtLevel < 12) return 'Feitos míticos gerais (níveis pares).'
    return 'Feitos do seu destino ou míticos que você ainda não pegou.'
  }
  return null
}

function FeatPickerRow({
  feat,
  available,
  reasons,
  isPicked,
  isPreview,
  onPreview,
  onAssign,
}: {
  feat: Feat
  available: boolean
  reasons: string[]
  isPicked: boolean
  isPreview: boolean
  onPreview: () => void
  onAssign: () => void
}) {
  return (
    <li data-feat-id={feat.id}>
      <button
        type="button"
        onClick={onPreview}
        onDoubleClick={() => {
          if (available) onAssign()
        }}
        className={`flex w-full items-start gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors ${
          isPreview
            ? 'border-accent/70 bg-accent/12'
            : available
              ? 'border-transparent hover:border-border hover:bg-surface-2'
              : 'border-transparent opacity-45'
        }`}
      >
        <span
          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
            isPicked ? 'bg-success' : isPreview ? 'bg-accent' : 'bg-transparent'
          }`}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-medium text-text">{feat.name}</span>
            <ActionCost type={feat.actionType} />
            <Badge className="!text-[9px]">nv. {feat.level}</Badge>
            {isPicked && <Badge tone="success">Neste slot</Badge>}
          </div>
          <div className="text-[10px] text-text-dim">
            {feat.originalName && feat.originalName !== feat.name
              ? feat.originalName
              : null}
            {!available && reasons[0]
              ? `${feat.originalName && feat.originalName !== feat.name ? ' · ' : ''}${reasons[0]}`
              : ''}
          </div>
        </div>
      </button>
    </li>
  )
}

interface FeatBrowserProps {
  feats: Feat[]
  sources: ContentSource[]
  character: {
    level: number
    ancestryId?: string | null
    heritageId?: string | null
    classId?: string | null
    featChoices?: Record<string, string>
    featSelections?: FeatSelection[]
    mythicCallingId?: string | null
  }
  characterClass?: CharacterClass | null
  heritage?: Heritage | null
  ancestryName?: string | null
  classLabel?: string | null
  selections: FeatSelection[]
  onChange: (selections: FeatSelection[]) => void
  initialSlotId?: string | null
  freeArchetype?: boolean
  ignoreDedicationLock?: boolean
  mythicRules?: boolean
  ancestryParagon?: boolean
  secondClass?: CharacterClass | null
  skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
  attributeModifiers?: Partial<Record<AttributeId, number>>
  grantedFeatPicks?: GrantedFeatPick[]
  onFeatChoice?: (key: string, featId: string) => void
}

type PickerPane =
  | { type: 'slot'; id: string }
  | { type: 'granted'; key: string }

export function FeatBrowser({
  feats,
  sources,
  character,
  characterClass,
  heritage,
  ancestryName,
  classLabel,
  selections,
  onChange,
  initialSlotId = null,
  freeArchetype = false,
  ignoreDedicationLock = false,
  mythicRules = false,
  ancestryParagon = false,
  secondClass = null,
  skillRanks,
  attributeModifiers,
  grantedFeatPicks = [],
  onFeatChoice,
}: FeatBrowserProps) {
  const [search, setSearch] = useState('')
  const [onlyAvailable, setOnlyAvailable] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<FeatCategory | 'all'>(
    'all',
  )
  const [levelFilters, setLevelFilters] = useState<string[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [actions, setActions] = useState<Pf2ActionType[]>([])
  const [maxLevelOnly, setMaxLevelOnly] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [pane, setPane] = useState<PickerPane | null>(null)
  const [previewFeatId, setPreviewFeatId] = useState<string | null>(null)
  const [advanceNote, setAdvanceNote] = useState<string | null>(null)
  const searchRef = useSlashSearch()
  const listRef = useRef<HTMLUListElement>(null)
  const prevSlotRef = useRef<string | null>(null)
  const lastInitialSlotRef = useRef<string | null>(null)

  const slots = useMemo(() => {
    return getFeatSlots(character, characterClass, {
      freeArchetype,
      mythicRules,
      mythicCallingId: character.mythicCallingId,
      ancestryParagon,
      secondClass,
      selections,
      feats,
    })
  }, [
    character,
    characterClass,
    freeArchetype,
    mythicRules,
    ancestryParagon,
    secondClass,
    selections,
    feats,
  ])

  const firstClassFeatLevel = useMemo(() => {
    if (!characterClass) return null
    return getClassFeatLevels(characterClass)[0] ?? null
  }, [characterClass])

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )

  const selectionBySlot = useMemo(
    () => Object.fromEntries(selections.map((s) => [s.slotId, s.featId])),
    [selections],
  )

  const selectedFeatIds = useMemo(
    () => selections.map((s) => s.featId),
    [selections],
  )

  const featsById = useMemo(
    () => new Map(feats.map((f) => [f.id, f])),
    [feats],
  )

  const earnedSlots = useMemo(
    () => slots.filter((slot) => slot.earned !== false),
    [slots],
  )
  const emptySlots = useMemo(
    () => earnedSlots.filter((slot) => !selectionBySlot[slot.id]),
    [earnedSlots, selectionBySlot],
  )
  const pendingGranted = useMemo(
    () => grantedFeatPicks.filter((pick) => !pick.selectedFeatId),
    [grantedFeatPicks],
  )

  const activeSlot =
    pane?.type === 'slot'
      ? (slots.find((s) => s.id === pane.id) ?? null)
      : null
  const activeGranted =
    pane?.type === 'granted'
      ? (grantedFeatPicks.find((p) => p.key === pane.key) ?? null)
      : null

  useEffect(() => {
    if (initialSlotId && initialSlotId !== lastInitialSlotRef.current) {
      lastInitialSlotRef.current = initialSlotId
      if (slots.some((s) => s.id === initialSlotId)) {
        setPane({ type: 'slot', id: initialSlotId })
      }
    }
  }, [initialSlotId, slots])

  useEffect(() => {
    setPane((current) => {
      if (slots.length === 0 && grantedFeatPicks.length === 0) return null
      if (
        current?.type === 'slot' &&
        slots.some((s) => s.id === current.id)
      ) {
        return current
      }
      if (
        current?.type === 'granted' &&
        grantedFeatPicks.some((p) => p.key === current.key)
      ) {
        return current
      }
      const empty = slots.find(
        (s) => s.earned !== false && !selectionBySlot[s.id],
      )
      if (empty) return { type: 'slot', id: empty.id }
      const pending = grantedFeatPicks.find((p) => !p.selectedFeatId)
      if (pending) return { type: 'granted', key: pending.key }
      if (slots[0]) return { type: 'slot', id: slots[0].id }
      if (grantedFeatPicks[0]) {
        return { type: 'granted', key: grantedFeatPicks[0].key }
      }
      return null
    })
  }, [slots, grantedFeatPicks, selectionBySlot])

  useEffect(() => {
    if (!activeSlot) return
    const slotChanged = prevSlotRef.current !== activeSlot.id
    prevSlotRef.current = activeSlot.id
    if (!slotChanged) return
    setCategoryFilter(activeSlot.kind)
    setLevelFilters([])
    setRarities([])
    setActions([])
    setSearch('')
    setShowFilters(false)
    setMaxLevelOnly(true)
    const equipped = selectionBySlot[activeSlot.id]
    setPreviewFeatId(equipped ?? null)
    listRef.current?.scrollTo({ top: 0 })
  }, [activeSlot, selectionBySlot])

  const catalog = useMemo(() => {
    if (!activeSlot) return [] as CatalogEntry[]
    const q = search.trim().toLowerCase()
    const otherSelected = selectedFeatIds.filter(
      (id) => selectionBySlot[activeSlot.id] !== id,
    )
    const activeHeritage =
      heritage && heritage.id === character.heritageId ? heritage : null
    const extraAncestryIds = [
      ...extraAncestryIdsFromHeritage(activeHeritage),
      ...extraAncestryIdsFromFeatChoices(character.featChoices),
    ]
    const extraHeritageIds = extraHeritageIdsFromHeritage(activeHeritage)
    const hasVersatileHeritage = isVersatileHeritage(activeHeritage)
    const levelNeedles = levelFilters.map(Number)

    return feats
      .reduce<CatalogEntry[]>((acc, raw) => {
        const feat = withLocalizedFeatName(raw, feats)
        if (!featMatchesCategoryFilter(feat, categoryFilter)) return acc
        if (feat.level > character.level) return acc
        if (levelNeedles.length > 0 && !levelNeedles.includes(feat.level)) {
          return acc
        }
        if (!matchesSelected(feat.rarity, rarities)) return acc
        if (
          actions.length > 0 &&
          !actions.includes(feat.actionType ?? 'passive')
        ) {
          return acc
        }
        if (maxLevelOnly && feat.level > activeSlot.gainedAtLevel) return acc
        if (activeSlot.requiredTraits?.length) {
          const needed = activeSlot.requiredTraits.map((t) => t.toLowerCase())
          const traits = (feat.traits ?? []).map((t) => t.toLowerCase())
          if (!needed.every((n) => traits.includes(n))) return acc
        }
        if (q) {
          const hit =
            feat.name.toLowerCase().includes(q) ||
            feat.originalName.toLowerCase().includes(q) ||
            feat.traits.some((t) => t.toLowerCase().includes(q))
          if (!hit) return acc
        }

        const ctx = {
          level: character.level,
          ancestryId: character.ancestryId,
          heritageId: character.heritageId,
          extraAncestryIds,
          extraHeritageIds,
          hasVersatileHeritage,
          classId: character.classId,
          selectedFeatIds: otherSelected,
          skillRanks,
          attributeModifiers,
          featsById,
          ignoreDedicationLock,
          mythicRulesEnabled: mythicRules,
          mythicCallingId: character.mythicCallingId,
        }
        const availability = evaluateFeatAvailability(feat, {
          ...ctx,
          slotKind: activeSlot.kind,
          slotLevel: activeSlot.gainedAtLevel,
          requiredTraits: activeSlot.requiredTraits,
        })
        if (onlyAvailable && !availability.available) return acc
        acc.push({
          feat,
          available: availability.available,
          reasons: availability.reasons,
          checks: evaluateFeatPrerequisiteChecks(feat, ctx),
        })
        return acc
      }, [])
      .sort((a, b) => {
        const ga = featPickerGroup(a.feat)
        const gb = featPickerGroup(b.feat)
        if (ga !== gb) return ga - gb
        if (a.available !== b.available) return a.available ? -1 : 1
        if (ga === 1) {
          const aMulti =
            findArchetypeForFeat(a.feat)?.kind === 'multiclass' ? 0 : 1
          const bMulti =
            findArchetypeForFeat(b.feat)?.kind === 'multiclass' ? 0 : 1
          if (aMulti !== bMulti) return aMulti - bMulti
        }
        if (a.feat.level !== b.feat.level) return a.feat.level - b.feat.level
        return a.feat.name.localeCompare(b.feat.name, 'pt-BR')
      })
  }, [
    feats,
    search,
    onlyAvailable,
    categoryFilter,
    levelFilters,
    rarities,
    actions,
    maxLevelOnly,
    featsById,
    character,
    heritage,
    activeSlot,
    selectedFeatIds,
    selectionBySlot,
    ignoreDedicationLock,
    mythicRules,
    skillRanks,
    attributeModifiers,
  ])

  const previewEntry = useMemo(() => {
    if (previewFeatId) {
      const hit = catalog.find((c) => c.feat.id === previewFeatId)
      if (hit) return hit
    }
    return catalog.find((c) => c.available) ?? catalog[0] ?? null
  }, [catalog, previewFeatId])

  const preview = previewEntry?.feat ?? null

  useEffect(() => {
    if (preview && preview.id !== previewFeatId) {
      setPreviewFeatId(preview.id)
    }
    if (!preview && previewFeatId) {
      setPreviewFeatId(null)
    }
  }, [preview, previewFeatId])

  useEffect(() => {
    if (!previewFeatId || !listRef.current) return
    const el = listRef.current.querySelector(
      `[data-feat-id="${previewFeatId}"]`,
    )
    el?.scrollIntoView({ block: 'nearest' })
  }, [previewFeatId])

  const previewAvailability = previewEntry
    ? { available: previewEntry.available, reasons: previewEntry.reasons }
    : null

  const extraFiltersActive =
    rarities.length > 0 ||
    levelFilters.length > 0 ||
    actions.length > 0 ||
    categoryFilter === 'all' ||
    (activeSlot != null && categoryFilter !== activeSlot.kind) ||
    !maxLevelOnly

  const filledCount = selections.filter((s) =>
    slots.some((slot) => slot.id === s.slotId),
  ).length

  const slotsByKind = useMemo(() => {
    const order: FeatCategory[] = [
      'ancestry',
      'class',
      'skill',
      'general',
      'archetype',
      'mythic',
      'other',
    ]
    const map = new Map<FeatCategory, typeof slots>()
    for (const slot of slots) {
      const list = map.get(slot.kind) ?? []
      list.push(slot)
      map.set(slot.kind, list)
    }
    return order
      .filter((k) => map.has(k))
      .map((k) => ({ kind: k, slots: map.get(k)! }))
  }, [slots])

  const levelOptions = useMemo(() => {
    const max = activeSlot
      ? Math.max(activeSlot.gainedAtLevel, character.level)
      : character.level
    return Array.from({ length: max }, (_, i) => {
      const level = String(i + 1)
      return { value: level, label: `nv. ${level}` }
    })
  }, [activeSlot, character.level])

  function assignFeat(featId: string) {
    if (!activeSlot) return
    const next = selections.filter((s) => s.slotId !== activeSlot.id)
    next.push({ slotId: activeSlot.id, featId })
    onChange(next)
    const remaining = emptySlots.filter((s) => s.id !== activeSlot.id)
    const nextEmpty = remaining[0]
    const featName = featsById.get(featId)?.name ?? 'Feito'
    if (nextEmpty) {
      setAdvanceNote(`${featName} no slot. Seguindo para o próximo vazio.`)
      setPane({ type: 'slot', id: nextEmpty.id })
    } else if (pendingGranted[0] && onFeatChoice) {
      setAdvanceNote(`${featName} no slot. Ainda falta um bônus da classe.`)
      setPane({ type: 'granted', key: pendingGranted[0].key })
    } else {
      setAdvanceNote(`${featName} no slot. Todos os espaços estão preenchidos.`)
    }
  }

  function clearSlot(slotId: string) {
    const featId = selections.find((s) => s.slotId === slotId)?.featId
    const feat = featId ? feats.find((f) => f.id === featId) : undefined
    if (feat?.cannotRetrain) {
      window.alert(`${feat.name} não pode ser retreinado (regra do feito).`)
      return
    }
    const ok = window.confirm(
      feat
        ? `Retreinar ${feat.name}? Player Core: 1 semana de intervalo (feito de perícia) ou 1 mês (outros). O slot fica vazio.`
        : 'Limpar este slot?',
    )
    if (!ok) return
    onChange(selections.filter((s) => s.slotId !== slotId))
    setPane({ type: 'slot', id: slotId })
    setAdvanceNote(null)
  }

  function resetFilters() {
    setSearch('')
    setRarities([])
    setLevelFilters([])
    setActions([])
    setOnlyAvailable(true)
    setMaxLevelOnly(true)
    setCategoryFilter(activeSlot?.kind ?? 'all')
  }

  function movePreview(delta: number) {
    if (catalog.length === 0) return
    const ids = catalog.map((c) => c.feat.id)
    const current = previewFeatId ? ids.indexOf(previewFeatId) : 0
    const next = Math.min(Math.max(current + delta, 0), ids.length - 1)
    setPreviewFeatId(ids[next] ?? null)
  }

  function onListKey(e: KeyboardEvent<HTMLUListElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      movePreview(1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      movePreview(-1)
    } else if (e.key === 'Enter' && preview && previewAvailability?.available) {
      e.preventDefault()
      assignFeat(preview.id)
    }
  }

  function goNextEmpty() {
    const rest = emptySlots.filter(
      (s) => pane?.type !== 'slot' || s.id !== pane.id,
    )
    const empty = rest[0]
    if (empty) {
      setPane({ type: 'slot', id: empty.id })
      return
    }
    const grantedRest = pendingGranted.filter(
      (p) => pane?.type !== 'granted' || p.key !== pane.key,
    )
    const granted = grantedRest[0] ?? pendingGranted[0]
    if (granted) {
      setPane({ type: 'granted', key: granted.key })
    }
  }

  if (!character.ancestryId && !character.classId) {
    return (
      <Panel title="Feitos" quiet>
        <Tip>
          Escolha ancestralidade e/ou classe primeiro. Os slots de feito (e o
          que fica disponível) dependem dessas escolhas — anão não pega feito de
          elfo, guerreiro não pega feito de ladino.
        </Tip>
      </Panel>
    )
  }

  if (slots.length === 0 && grantedFeatPicks.length === 0) {
    return (
      <Panel title="Feitos" quiet>
        <Tip>
          Ainda não há slots. Feitos de ancestralidade: nv. 1, 5, 9, 13 e 17.
          Feitos de classe seguem a tabela da classe (mago/clérigo/bardo a
          partir do 2º; guerreiro/ladino já no 1º).
          {freeArchetype
            ? ' Com Arquétipos grátis, os pares também ganham um slot só de arquétipo.'
            : ''}
        </Tip>
      </Panel>
    )
  }

  const pickedInSlot = Boolean(
    activeSlot && preview && selectionBySlot[activeSlot.id] === preview.id,
  )

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col lg:h-full lg:w-72">
        <Panel
          quiet
          compact
          className="flex max-h-[42vh] min-h-0 flex-col lg:max-h-none lg:h-full"
          bodyClassName="min-h-0 flex-1 overflow-y-auto"
          title="Seus espaços"
          actions={
            <span className="tabular-nums text-[10px] text-text-dim">
              {filledCount}/{earnedSlots.length || slots.length}
            </span>
          }
        >
          <p className="mb-2 text-[11px] text-text-dim">
            {[
              ancestryName,
              classLabel,
              freeArchetype ? 'Arquétipos grátis' : null,
            ]
              .filter(Boolean)
              .join(' · ') || 'Sem caminho definido'}
          </p>
          {pendingGranted.length > 0 || emptySlots.length > 0 ? (
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              {emptySlots.length > 0 ? (
                <Badge tone="accent">{emptySlots.length} vazio(s)</Badge>
              ) : (
                <Badge tone="success">Slots ok</Badge>
              )}
              {pendingGranted.length > 0 ? (
                <Badge tone="accent">
                  {pendingGranted.length} bônus pendente(s)
                </Badge>
              ) : null}
              {emptySlots.length + pendingGranted.length > 0 ? (
                <button
                  type="button"
                  className="text-[10px] text-accent hover:underline"
                  onClick={goNextEmpty}
                >
                  Ir ao próximo
                </button>
              ) : null}
            </div>
          ) : null}

          {grantedFeatPicks.length > 0 && onFeatChoice ? (
            <div className="mb-3">
              <div className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-wide text-text-dim">
                Feitos concedidos
              </div>
              <ul className="space-y-1">
                {grantedFeatPicks.map((pick) => {
                  const selected = pick.options.find(
                    (o) => o.id === pick.selectedFeatId,
                  )
                  const active = pane?.type === 'granted' && pane.key === pick.key
                  return (
                    <li key={pick.key}>
                      <button
                        type="button"
                        onClick={() =>
                          setPane({ type: 'granted', key: pick.key })
                        }
                        className={`w-full rounded-lg border px-2.5 py-2 text-left transition-colors ${
                          active
                            ? 'border-accent bg-accent/15'
                            : selected
                              ? 'border-border/70 bg-surface-2/40 hover:border-border-strong'
                              : 'border-dashed border-accent/50 bg-accent/5 hover:border-accent'
                        }`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                          {pick.parentName}
                        </div>
                        <div
                          className={`mt-0.5 text-xs font-medium ${
                            selected ? 'text-text' : 'text-accent'
                          }`}
                        >
                          {selected
                            ? withLocalizedFeatName({
                                name: selected.name,
                                originalName:
                                  selected.originalName ?? selected.name,
                                traits: selected.traits,
                              }).name
                            : 'Escolher…'}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}

          <ul className="space-y-2">
            {slotsByKind.map((group) => (
              <li key={group.kind}>
                <div className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-wide text-text-dim">
                  {CATEGORY_LABELS[group.kind]}
                </div>
                <ul className="space-y-1">
                  {group.slots.map((slot) => {
                    const featId = selectionBySlot[slot.id]
                    const feat = featId
                      ? feats.find((f) => f.id === featId)
                      : null
                    const selected =
                      pane?.type === 'slot' && pane.id === slot.id
                    const unearned = slot.earned === false
                    return (
                      <li key={slot.id}>
                        <div
                          className={`rounded-lg border ${
                            selected
                              ? 'border-accent bg-accent/15'
                              : feat
                                ? 'border-border/70 bg-surface-2/40'
                                : 'border-dashed border-border hover:border-accent/60'
                          } ${unearned ? 'opacity-50' : ''}`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setPane({ type: 'slot', id: slot.id })
                            }
                            className="w-full px-2.5 py-2 text-left"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                                  {slot.label}
                                </div>
                                <div
                                  className={`mt-0.5 text-xs font-medium ${
                                    feat ? 'text-text' : 'text-text-dim'
                                  }`}
                                >
                                  {feat?.name ?? 'Vazio — escolher…'}
                                </div>
                                {feat && isArchetypeFeat(feat) && (
                                  <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent/80">
                                    Arquétipo
                                  </div>
                                )}
                              </div>
                              <span
                                className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${
                                  feat ? 'bg-success' : 'border border-text-dim'
                                }`}
                                aria-hidden
                              />
                            </div>
                          </button>
                          {feat ? (
                            <button
                              type="button"
                              className="w-full border-t border-border/40 px-2.5 py-1 text-left text-[10px] text-danger/80 hover:text-danger"
                              onClick={() => clearSlot(slot.id)}
                            >
                              Retreinar
                            </button>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </Panel>
      </aside>

      {activeGranted && onFeatChoice ? (
        <FeatChoicePicker
          pick={activeGranted}
          layout="split"
          onChange={(featId) => {
            onFeatChoice(activeGranted.key, featId)
            if (!featId) return
            const nextEmpty = emptySlots[0]
            if (nextEmpty) {
              setAdvanceNote(
                'Bônus escolhido. Seguindo para o próximo slot vazio.',
              )
              setPane({ type: 'slot', id: nextEmpty.id })
            }
          }}
        />
      ) : (
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
          {advanceNote ? (
            <div className="flex items-center justify-between gap-2 rounded-lg border border-accent/35 bg-accent/10 px-3 py-1.5 text-[11px] text-accent">
              <span>{advanceNote}</span>
              <button
                type="button"
                className="shrink-0 text-text-dim hover:text-text"
                onClick={() => setAdvanceNote(null)}
              >
                Fechar
              </button>
            </div>
          ) : null}

          <div className="rounded-xl border border-border/80 bg-surface-1 px-3 py-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Escolhendo para
                </p>
                <p className="text-sm font-medium text-text">
                  {activeSlot?.label ?? 'Nenhum slot'}
                </p>
                {activeSlot ? (
                  <p className="mt-0.5 text-[11px] text-text-dim">
                    {slotKindHint(
                      activeSlot.kind,
                      activeSlot.gainedAtLevel,
                      ignoreDedicationLock,
                    ) ??
                      `Só feitos até o nv. ${activeSlot.gainedAtLevel} deste espaço.`}
                    {firstClassFeatLevel &&
                    firstClassFeatLevel > 1 &&
                    character.level < firstClassFeatLevel
                      ? ` ${classLabel ?? 'Esta classe'} só ganha feito de classe no nv. ${firstClassFeatLevel}.`
                      : ''}
                  </p>
                ) : null}
              </div>
              <ChoiceChip
                selected={onlyAvailable}
                onClick={() => setOnlyAvailable((v) => !v)}
                title="Liga e desliga os feitos que não cabem neste personagem"
              >
                {onlyAvailable ? 'Só os que cabem' : 'Incluir bloqueados'}
              </ChoiceChip>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Input
                ref={searchRef}
                className="min-w-[12rem] flex-1"
                placeholder="Buscar pelo nome… (/)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault()
                    listRef.current?.focus()
                    if (!previewFeatId && catalog[0]) {
                      setPreviewFeatId(catalog[0].feat.id)
                    }
                  }
                }}
              />
              <span className="text-[11px] text-text-dim">
                {onlyAvailable
                  ? `${catalog.length} ${catalog.length === 1 ? 'feito cabe' : 'feitos cabem'}`
                  : `${catalog.length} na lista`}
              </span>
              <button
                type="button"
                className={`text-[11px] ${
                  showFilters || extraFiltersActive
                    ? 'text-accent'
                    : 'text-text-dim hover:text-accent'
                }`}
                onClick={() => setShowFilters((v) => !v)}
              >
                {showFilters ? 'Menos filtros' : 'Mais filtros'}
                {extraFiltersActive && !showFilters ? ' ·' : ''}
              </button>
              {(search.trim() !== '' || extraFiltersActive || !onlyAvailable) && (
                <button
                  type="button"
                  className="text-[10px] text-text-dim hover:text-accent"
                  onClick={resetFilters}
                >
                  Limpar
                </button>
              )}
            </div>

            {showFilters ? (
              <div className="mt-2 space-y-2 border-t border-border/50 pt-2">
                <div className="flex flex-wrap gap-1">
                  <ChoiceChip
                    selected={
                      activeSlot != null && categoryFilter === activeSlot.kind
                    }
                    onClick={() =>
                      setCategoryFilter(activeSlot?.kind ?? 'all')
                    }
                  >
                    Do slot
                    {activeSlot
                      ? ` (${CATEGORY_LABELS[activeSlot.kind]})`
                      : ''}
                  </ChoiceChip>
                  <ChoiceChip
                    selected={categoryFilter === 'all'}
                    onClick={() => setCategoryFilter('all')}
                  >
                    Todas as categorias
                  </ChoiceChip>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <MultiSelectDropdown
                    label="Raridade"
                    options={RARITY_FILTER_OPTIONS}
                    selected={rarities}
                    onChange={setRarities}
                    emptyLabel="Todas"
                  />
                  <MultiSelectDropdown
                    label="Ação"
                    options={ACTION_FILTER_OPTIONS}
                    selected={actions}
                    onChange={setActions}
                    emptyLabel="Qualquer"
                  />
                  <MultiSelectDropdown
                    label="Nível"
                    options={levelOptions}
                    selected={levelFilters}
                    onChange={setLevelFilters}
                    emptyLabel="Qualquer"
                  />
                </div>
                <ChoiceChip
                  selected={!maxLevelOnly}
                  onClick={() => setMaxLevelOnly((v) => !v)}
                  title="Por padrão só aparecem feitos até o nível deste slot"
                >
                  Incluir feitos acima do nv. do slot
                </ChoiceChip>
              </div>
            ) : null}
          </div>

          <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,22rem)]">
            <ul
              ref={listRef}
              tabIndex={0}
              onKeyDown={onListKey}
              className="min-h-0 space-y-0.5 overflow-y-auto rounded-xl border border-border/80 bg-surface-1 p-2 outline-none focus:border-accent/40"
            >
              {catalog.length === 0 ? (
                <li className="px-2 py-8 text-center text-xs text-text-dim">
                  Nenhum feito neste filtro.
                  {onlyAvailable ? (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="text-accent hover:underline"
                        onClick={() => setOnlyAvailable(false)}
                      >
                        Incluir bloqueados
                      </button>
                    </>
                  ) : (
                    <>
                      {' '}
                      <button
                        type="button"
                        className="text-accent hover:underline"
                        onClick={resetFilters}
                      >
                        Limpar filtros
                      </button>
                    </>
                  )}
                </li>
              ) : (
                (() => {
                  const classEntries = catalog.filter(
                    (c) => featPickerGroup(c.feat) === 0,
                  )
                  const archetypeEntries = catalog.filter(
                    (c) => featPickerGroup(c.feat) === 1,
                  )
                  const otherEntries = catalog.filter(
                    (c) => featPickerGroup(c.feat) === 2,
                  )
                  const splitClassAndArchetype =
                    classEntries.length > 0 && archetypeEntries.length > 0
                  const row = (entry: CatalogEntry) => (
                    <FeatPickerRow
                      key={entry.feat.id}
                      feat={entry.feat}
                      available={entry.available}
                      reasons={entry.reasons}
                      isPicked={Boolean(
                        activeSlot &&
                          selectionBySlot[activeSlot.id] === entry.feat.id,
                      )}
                      isPreview={preview?.id === entry.feat.id}
                      onPreview={() => setPreviewFeatId(entry.feat.id)}
                      onAssign={() => assignFeat(entry.feat.id)}
                    />
                  )
                  if (!splitClassAndArchetype) return catalog.map(row)
                  return (
                    <>
                      <FeatPickerGroupHeader>
                        Feitos de classe
                      </FeatPickerGroupHeader>
                      {classEntries.map(row)}
                      <FeatPickerGroupHeader>
                        Feitos de arquétipo
                      </FeatPickerGroupHeader>
                      {archetypeEntries.map(row)}
                      {otherEntries.length > 0 ? (
                        <>
                          <FeatPickerGroupHeader>Outros</FeatPickerGroupHeader>
                          {otherEntries.map(row)}
                        </>
                      ) : null}
                    </>
                  )
                })()
              )}
            </ul>

            <Panel
              quiet
              compact
              className="flex min-h-0 flex-col overflow-hidden"
              bodyClassName="min-h-0 flex-1 overflow-y-auto"
              title={preview?.name ?? 'Detalhe'}
            >
              {!preview ? (
                <p className="text-xs text-text-dim">
                  Clique num feito à esquerda para ler o texto e colocá-lo no
                  slot.
                </p>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex flex-wrap gap-1">
                    <RarityBadge rarity={preview.rarity} />
                    <ProvenanceBadge type={preview.provenance.type} />
                    <Badge>nv. {preview.level}</Badge>
                    <Badge>{CATEGORY_LABELS[preview.category]}</Badge>
                    {preview.actionType && preview.actionType !== 'passive' && (
                      <span className="inline-flex items-center rounded-md border border-border/70 bg-surface-2/60 px-1.5 py-0.5">
                        <ActionCost type={preview.actionType} />
                      </span>
                    )}
                    {preview.traits.map((t) => (
                      <Badge key={t}>{localizeTraitLabel(t)}</Badge>
                    ))}
                  </div>
                  <p className="text-[11px] text-text-dim">
                    {preview.originalName &&
                    preview.originalName !== preview.name
                      ? preview.originalName
                      : null}
                    {preview.sourceId
                      ? `${preview.originalName && preview.originalName !== preview.name ? ' · ' : ''}${formatSourceLabel(
                          sourceMap[preview.sourceId]?.name,
                          preview.sourcePage,
                        )}`
                      : ''}
                  </p>
                  {previewAvailability && !previewAvailability.available && (
                    <div className="rounded-lg border border-danger/30 bg-danger/10 px-2.5 py-2 text-[11px] text-danger">
                      Não cabe agora: {previewAvailability.reasons.join(' ')}
                    </div>
                  )}
                  {previewAvailability?.available && (
                    <div className="rounded-lg border border-success/30 bg-success/10 px-2.5 py-1.5 text-[11px] text-success">
                      {pickedInSlot
                        ? 'Já está neste slot.'
                        : `Cabe em “${activeSlot?.label ?? 'este slot'}”.`}
                    </div>
                  )}
                  {descriptionLooksEnglish(preview.description) && (
                    <p className="text-[10px] text-accent/80">
                      Descrição ainda no original em inglês (tradução em
                      andamento).
                    </p>
                  )}
                  {previewEntry && previewEntry.checks.length > 0 && (
                    <div>
                      <p className="mb-1 text-[11px] font-semibold text-text">
                        Pré-requisitos
                      </p>
                      <PrerequisiteChecks
                        checks={previewEntry.checks}
                        compact
                      />
                    </div>
                  )}
                  <RichText
                    as="p"
                    className="whitespace-pre-wrap text-xs leading-relaxed text-text-muted"
                  >
                    {preview.description}
                  </RichText>
                  {preview.trigger && (
                    <p className="text-[11px] text-text-dim">
                      <span className="font-semibold text-text">Gatilho:</span>{' '}
                      {cleanFeatMarkdownText(preview.trigger)}
                    </p>
                  )}
                  {preview.frequency && (
                    <p className="text-[11px] text-text-dim">
                      <span className="font-semibold text-text">
                        Frequência:
                      </span>{' '}
                      {cleanFeatMarkdownText(preview.frequency)}
                    </p>
                  )}
                  {activeSlot && previewAvailability?.available ? (
                    <Button
                      className="w-full"
                      variant={pickedInSlot ? 'secondary' : 'accent'}
                      onClick={() => assignFeat(preview.id)}
                    >
                      {pickedInSlot
                        ? 'Já neste slot'
                        : `Usar em “${activeSlot.label}”`}
                    </Button>
                  ) : null}
                  <p className="text-[10px] text-text-dim">
                    Clique para ler · duplo clique ou Enter para colocar no
                    slot · ↑↓ na lista.
                  </p>
                </div>
              )}
            </Panel>
          </div>
        </div>
      )}
    </div>
  )
}
