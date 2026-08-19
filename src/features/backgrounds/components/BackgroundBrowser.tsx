import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type {
  AttributeId,
  Background,
  BackgroundChoices,
  ContentSource,
  Feat,
  FeatGrantRule,
  ProficiencyRank,
  Rarity,
  SkillId,
} from '@/types'
import {
  describeBoostRule,
  describeLoreGrant,
  describeSkillGrant,
  featGrantIsChoice,
  buildBackgroundFeatPick,
  findFeatInCatalog,
  getAvailableAttributesForBoost,
  validateBackgroundChoices,
} from '@/engine'
import {
  ATTRIBUTE_LABELS,
  RARITY_LABELS,
  SKILL_LABELS,
  formatSourceLabel,
} from '@/utils/labels'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { MultiSelectDropdown } from '@/components/ui/MultiFilter'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Panel, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { FeatChoicePicker } from '@/features/feats/components/FeatChoicePicker'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'
import { useFeatStore } from '@/stores/featStore'

type ProvenanceType = 'official' | 'homebrew'
type SortMode = 'name' | 'rarity'

const FILTER_STORAGE_KEY = 'pf2e-bg-filters-v1'
const RARITY_OPTIONS = (Object.keys(RARITY_LABELS) as Rarity[]).map((r) => ({
  value: r,
  label: RARITY_LABELS[r],
}))
const PROVENANCE_OPTIONS: Array<{ value: ProvenanceType; label: string }> = [
  { value: 'official', label: 'Oficiais' },
  { value: 'homebrew', label: 'Homebrew' },
]

function loadStoredFilters(): {
  rarities: Rarity[]
  provenances: ProvenanceType[]
  sortMode: SortMode
} {
  try {
    const raw = sessionStorage.getItem(FILTER_STORAGE_KEY)
    if (!raw) return { rarities: [], provenances: [], sortMode: 'name' }
    const parsed = JSON.parse(raw) as {
      rarities?: Rarity[]
      provenances?: ProvenanceType[]
      sortMode?: SortMode
    }
    return {
      rarities: parsed.rarities ?? [],
      provenances: parsed.provenances ?? [],
      sortMode: parsed.sortMode ?? 'name',
    }
  } catch {
    return { rarities: [], provenances: [], sortMode: 'name' }
  }
}

function emptyChoices(): BackgroundChoices {
  return {
    attributeBoosts: {},
    skillChoices: {},
    loreChoices: {},
    customLoreNames: {},
    featChoices: {},
  }
}

function countChoiceProgress(
  background: Background,
  choices: BackgroundChoices,
): { done: number; total: number } {
  let done = 0
  let total = 0

  for (const rule of background.attributeBoosts) {
    total += 1
    if (choices.attributeBoosts[rule.id]) done += 1
  }

  for (const grant of background.skillGrants) {
    if (grant.skillOptions && grant.skillOptions.length > 0) {
      total += 1
      if (choices.skillChoices[grant.id]) done += 1
    }
  }

  for (const grant of background.loreGrants) {
    if (grant.loreOptions && grant.loreOptions.length > 0) {
      total += 1
      if (choices.loreChoices[grant.id]) done += 1
    } else if (grant.allowCustom && !grant.loreId) {
      total += 1
      const name =
        choices.customLoreNames?.[grant.id] ?? choices.loreChoices[grant.id]
      if (name?.trim()) done += 1
    }
  }

  for (const grant of background.featGrants) {
    if (!featGrantIsChoice(grant)) continue
    total += 1
    if (choices.featChoices?.[grant.id]?.trim()) done += 1
  }

  return { done, total }
}

function grantRulesView(grant: FeatGrantRule, catalog: Feat[]) {
  const found = findFeatInCatalog(catalog, {
    featId: grant.featId,
    originalName: grant.originalName,
    featName: grant.featName,
  })
  const localized = withLocalizedFeatName({
    name: grant.featName,
    originalName: grant.originalName ?? found?.originalName ?? grant.featName,
    description: grant.description || found?.description || '',
    trigger: grant.trigger ?? found?.trigger,
    frequency: grant.frequency ?? found?.frequency,
    traits: grant.traits?.length ? grant.traits : found?.traits ?? [],
  })
  return {
    ...localized,
    actionType: grant.actionType ?? found?.actionType,
    aonUrl: found?.aonUrl,
  }
}

function ChoiceChip({
  selected,
  onClick,
  children,
  title,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  title?: string
}) {
  return (
    <button
      type="button"
      title={title ?? (selected ? 'Clique de novo para desmarcar' : undefined)}
      onClick={onClick}
      className={`interactive-lift rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
        selected
          ? 'border-accent bg-accent/20 text-accent shadow-[0_0_0_1px_rgba(212,168,75,0.25)]'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:bg-surface-4 hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

interface BackgroundBrowserProps {
  backgrounds: Background[]
  sources: ContentSource[]
  selectedId?: string | null
  initialChoices?: BackgroundChoices | null
  onConfirm?: (backgroundId: string, choices: BackgroundChoices) => void
  onDuplicate?: (id: string) => void
  onEditHomebrew?: (id: string) => void
  onCreateHomebrew?: () => void
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  mode?: 'select' | 'manage'
  characterLevel?: number
  skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
}

export function BackgroundBrowser({
  backgrounds,
  sources,
  selectedId,
  initialChoices,
  onConfirm,
  onDuplicate,
  onEditHomebrew,
  onCreateHomebrew,
  previewId,
  onActiveChange,
  mode = 'select',
  characterLevel = 1,
  skillRanks,
}: BackgroundBrowserProps) {
  const stored = useMemo(() => loadStoredFilters(), [])
  const [search, setSearch] = useState('')
  const [rarities, setRarities] = useState<Rarity[]>(stored.rarities)
  const [provenances, setProvenances] = useState<ProvenanceType[]>(
    stored.provenances,
  )
  const [sortMode, setSortMode] = useState<SortMode>(stored.sortMode)
  const [activeId, setActiveId] = useState<string | null>(
    previewId ?? selectedId ?? null,
  )
  const [choices, setChoices] = useState<BackgroundChoices>(
    initialChoices ?? emptyChoices(),
  )
  const searchRef = useRef<HTMLInputElement>(null)
  const feats = useFeatStore((s) => s.feats)
  const loadFeats = useFeatStore((s) => s.loadAll)

  useEffect(() => {
    if (feats.length === 0) void loadFeats()
  }, [feats.length, loadFeats])

  useEffect(() => {
    if (previewId !== undefined) {
      setActiveId(previewId)
      return
    }
    if (selectedId) {
      setActiveId(selectedId)
      setChoices(initialChoices ?? emptyChoices())
    }
  }, [previewId, selectedId, initialChoices])

  useEffect(() => {
    sessionStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify({ rarities, provenances, sortMode }),
    )
  }, [rarities, provenances, sortMode])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === '/' || (e.key === 'f' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = backgrounds.filter((b) => {
      if (rarities.length > 0 && !rarities.includes(b.rarity)) return false
      if (
        provenances.length > 0 &&
        !provenances.includes(b.provenance.type)
      )
        return false
      if (!q) return true
      return (
        b.name.toLowerCase().includes(q) ||
        b.originalName?.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q)
      )
    })

    list = [...list].sort((a, b) => {
      // Origem atual sempre no topo
      if (selectedId) {
        if (a.id === selectedId && b.id !== selectedId) return -1
        if (b.id === selectedId && a.id !== selectedId) return 1
      }
      if (sortMode === 'rarity') {
        const order: Rarity[] = ['common', 'uncommon', 'rare', 'unique']
        const diff = order.indexOf(a.rarity) - order.indexOf(b.rarity)
        if (diff !== 0) return diff
      }
      return a.name.localeCompare(b.name, 'pt-BR')
    })

    return list
  }, [backgrounds, search, rarities, provenances, sortMode, selectedId])

  const active = backgrounds.find((b) => b.id === activeId) ?? null
  const hasActiveFilters =
    search.trim() !== '' ||
    rarities.length > 0 ||
    provenances.length > 0 ||
    sortMode !== 'name'

  function selectBackground(id: string, event?: TabPointerEvent) {
    if (event && (event.button === 1 || event.ctrlKey || event.metaKey)) {
      onActiveChange?.(id, event)
      return
    }
    if (activeId === id) {
      setActiveId(null)
      onActiveChange?.(null, event)
      return
    }
    setActiveId(id)
    onActiveChange?.(id, event)
    if (id !== selectedId) {
      setChoices(emptyChoices())
    } else {
      setChoices(initialChoices ?? emptyChoices())
    }
  }

  function clearFilters() {
    setSearch('')
    setRarities([])
    setProvenances([])
    setSortMode('name')
  }

  const issues = active ? validateBackgroundChoices(active, choices) : []

  function tryConfirmActive() {
    if (!active || !onConfirm || issues.length > 0) return
    onConfirm(active.id, choices)
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex w-full flex-col gap-2 lg:w-80 lg:shrink-0">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-text">Origens</h2>
            <div className="text-[11px] text-text-dim">
              {filtered.length} de {backgrounds.length}
              {rarities.length > 0 || provenances.length > 0
                ? ' · filtro ativo'
                : ''}
            </div>
          </div>
          {onCreateHomebrew && (
            <Button size="sm" variant="accent" onClick={onCreateHomebrew}>
              + Criar origem
            </Button>
          )}
        </div>

        <div className="relative">
          <Input
            ref={searchRef}
            placeholder="Buscar origens…  ( / )"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setSearch('')
            }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-1.5 text-xs text-text-dim hover:bg-surface-3 hover:text-text"
              title="Limpar busca (Esc)"
            >
              ✕
            </button>
          )}
        </div>

        <MultiSelectDropdown
          label="Raridade"
          emptyLabel="Todas as raridades"
          options={RARITY_OPTIONS}
          selected={rarities}
          onChange={setRarities}
        />
        <MultiSelectDropdown
          label="Fonte"
          emptyLabel="Oficiais + Homebrew"
          options={PROVENANCE_OPTIONS}
          selected={provenances}
          onChange={setProvenances}
        />

        <div className="flex items-center gap-2">
          <Select
            className="flex-1"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
          >
            <option value="name">Ordenar por nome</option>
            <option value="rarity">Ordenar por raridade</option>
          </Select>
          {hasActiveFilters && (
            <Button size="sm" variant="ghost" onClick={clearFilters}>
              Limpar
            </Button>
          )}
        </div>

        {(rarities.length > 0 || provenances.length > 0) && (
          <div className="flex flex-wrap gap-1">
            {rarities.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRarities(rarities.filter((x) => x !== r))}
                className="rounded-md border border-accent/35 bg-accent/10 px-2 py-0.5 text-[10px] text-accent hover:bg-accent/20"
                title="Remover filtro"
              >
                {RARITY_LABELS[r]} ✕
              </button>
            ))}
            {provenances.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() =>
                  setProvenances(provenances.filter((x) => x !== p))
                }
                className="rounded-md border border-info/35 bg-info/10 px-2 py-0.5 text-[10px] text-info hover:bg-info/20"
                title="Remover filtro"
              >
                {p === 'official' ? 'Oficiais' : 'Homebrew'} ✕
              </button>
            ))}
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-surface-1">
          {filtered.length === 0 ? (
            <div className="space-y-2 p-4 text-center">
              <p className="text-sm text-text-dim">Nenhuma origem encontrada.</p>
              {hasActiveFilters && (
                <Button size="sm" variant="secondary" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              )}
            </div>
          ) : (
            <ul>
              {filtered.map((b) => {
                const source = b.sourceId ? sourceMap[b.sourceId] : undefined
                const isActive = b.id === activeId
                const isApplied = b.id === selectedId
                return (
                  <li key={b.id}>
                    <button
                      type="button"
                      title={
                        mode === 'select'
                          ? 'Clique para ver · duplo clique confirma (se completo)'
                          : undefined
                      }
                      onClick={(event) => selectBackground(b.id, event)}
                      onAuxClick={(event) => selectBackground(b.id, event)}
                      onMouseDown={(event) => {
                        if (event.button === 1) event.preventDefault()
                      }}
                      onDoubleClick={() => {
                        if (mode !== 'select' || !onConfirm) return
                        if (b.id !== activeId) {
                          selectBackground(b.id)
                          return
                        }
                        tryConfirmActive()
                      }}
                      className={`flex w-full flex-col gap-1 border-b border-border px-3 py-2.5 text-left transition-all ${
                        isActive
                          ? 'bg-accent/10 shadow-[inset_3px_0_0_0_var(--color-accent)]'
                          : 'hover:bg-surface-2'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-medium ${isActive ? 'text-accent' : 'text-text'}`}
                        >
                          {b.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {isApplied && (
                            <span className="rounded border border-success/40 bg-success/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-success">
                              Atual
                            </span>
                          )}
                          <RarityBadge rarity={b.rarity} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ProvenanceBadge type={b.provenance.type} />
                        <span className="truncate text-[11px] text-text-dim">
                          {formatSourceLabel(source?.name, b.sourcePage)}
                        </span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        {!active ? (
          <Panel>
            <p className="text-sm text-text-dim">
              Selecione uma origem para ver os detalhes. Clique de novo no mesmo
              item para desmarcar.
            </p>
          </Panel>
        ) : (
          <BackgroundDetailPanel
            background={active}
            source={active.sourceId ? sourceMap[active.sourceId] : undefined}
            choices={choices}
            issues={issues}
            mode={mode}
            onChoicesChange={setChoices}
            onConfirm={
              onConfirm
                ? () => {
                    if (issues.length === 0) onConfirm(active.id, choices)
                  }
                : undefined
            }
            onDuplicate={onDuplicate ? () => onDuplicate(active.id) : undefined}
            onEditHomebrew={
              onEditHomebrew && active.provenance.type === 'homebrew'
                ? () => onEditHomebrew(active.id)
                : undefined
            }
            onClearChoices={() => setChoices(emptyChoices())}
            characterLevel={characterLevel}
            skillRanks={skillRanks}
            feats={feats}
          />
        )}
      </div>
    </div>
  )
}

function BackgroundDetailPanel({
  background,
  source,
  choices,
  issues,
  mode,
  onChoicesChange,
  onConfirm,
  onDuplicate,
  onEditHomebrew,
  onClearChoices,
  characterLevel = 1,
  skillRanks,
  feats,
}: {
  background: Background
  source?: ContentSource
  choices: BackgroundChoices
  issues: Array<{ field: string; message: string }>
  mode: 'select' | 'manage'
  onChoicesChange: (choices: BackgroundChoices) => void
  onConfirm?: () => void
  onDuplicate?: () => void
  onEditHomebrew?: () => void
  onClearChoices: () => void
  characterLevel?: number
  skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
  feats: Feat[]
}) {
  const progress = countChoiceProgress(background, choices)
  const hasAnyChoice =
    Object.keys(choices.attributeBoosts).length > 0 ||
    Object.keys(choices.skillChoices).length > 0 ||
    Object.keys(choices.loreChoices).length > 0 ||
    Object.values(choices.customLoreNames ?? {}).some((v) => v?.trim()) ||
    Object.values(choices.featChoices ?? {}).some((v) => v?.trim())

  /** Toggle: clicar de novo desmarca. Também limpa conflitos de atributo duplicado. */
  function toggleBoost(ruleId: string, attribute: AttributeId) {
    const current = choices.attributeBoosts[ruleId]
    const nextBoosts: BackgroundChoices['attributeBoosts'] = {
      ...choices.attributeBoosts,
    }

    if (current === attribute) {
      delete nextBoosts[ruleId]
    } else {
      nextBoosts[ruleId] = attribute
      // Se outro boost já usa esse atributo, libera automaticamente
      for (const [otherId, otherAttr] of Object.entries(nextBoosts)) {
        if (otherId !== ruleId && otherAttr === attribute) {
          delete nextBoosts[otherId]
        }
      }
    }

    onChoicesChange({
      ...choices,
      attributeBoosts: nextBoosts,
    })
  }

  function toggleLore(ruleId: string, loreId: string) {
    const current = choices.loreChoices[ruleId]
    const next = { ...choices.loreChoices }
    if (current === loreId) {
      delete next[ruleId]
    } else {
      next[ruleId] = loreId
    }
    onChoicesChange({ ...choices, loreChoices: next })
  }

  function setSkill(ruleId: string, skillId: string) {
    const next = { ...choices.skillChoices }
    if (!skillId) {
      delete next[ruleId]
    } else {
      next[ruleId] = skillId
    }
    onChoicesChange({ ...choices, skillChoices: next })
  }

  function setFeatChoice(grantId: string, featId: string) {
    const next = { ...(choices.featChoices ?? {}) }
    if (!featId) {
      delete next[grantId]
    } else {
      next[grantId] = featId
    }
    onChoicesChange({ ...choices, featChoices: next })
  }

  return (
    <Panel
      title={background.name}
      subtitle={
        mode === 'select' && progress.total > 0
          ? `Escolhas: ${progress.done}/${progress.total}`
          : undefined
      }
      actions={
        <div className="flex flex-wrap gap-1">
          <ProvenanceBadge type={background.provenance.type} />
          <RarityBadge rarity={background.rarity} />
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Fonte
          </div>
          <div className="text-sm text-text-muted">
            {formatSourceLabel(
              source?.name ??
                (background.provenance.type === 'homebrew'
                  ? 'Homebrew pessoal'
                  : undefined),
              background.sourcePage,
            )}
          </div>
          {background.originalName && (
            <div className="mt-1 text-[11px] text-text-dim">
              Original: {background.originalName}
            </div>
          )}
        </div>

        <RichText
          as="p"
          className="text-sm leading-relaxed text-text-muted"
        >
          {background.description}
        </RichText>

        {mode === 'select' && progress.total > 0 && (
          <div className="space-y-2">
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{
                  width: `${progress.total === 0 ? 0 : (progress.done / progress.total) * 100}%`,
                }}
              />
            </div>
            <Tip>
              Clique de novo em uma opção já marcada para <strong>desmarcar</strong>.
              Em boosts, o mesmo atributo não pode ser escolhido duas vezes — o
              app libera o conflito sozinho.
            </Tip>
          </div>
        )}

        <section>
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-text-dim">
              Boosts de Atributo
            </h3>
            {mode === 'select' && hasAnyChoice && (
              <button
                type="button"
                onClick={onClearChoices}
                className="text-[11px] text-text-dim transition-colors hover:text-danger"
              >
                Limpar escolhas
              </button>
            )}
          </div>
          <div className="space-y-3">
            {background.attributeBoosts.map((rule) => {
              if (mode === 'manage') {
                return (
                  <div
                    key={rule.id}
                    className="rounded-xl border border-border bg-surface-2 p-2.5 text-sm text-text-muted"
                  >
                    <span className="font-medium text-text">{rule.label}:</span>{' '}
                    {describeBoostRule(rule)}
                  </div>
                )
              }

              const available = getAvailableAttributesForBoost(
                background,
                rule.id,
                choices,
              )
              const selected = choices.attributeBoosts[rule.id]
              return (
                <div
                  key={rule.id}
                  className="rounded-xl border border-border bg-surface-2 p-3"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-medium">
                      {rule.label}:{' '}
                      <span className="font-normal text-text-muted">
                        {describeBoostRule(rule)}
                      </span>
                    </div>
                    {selected ? (
                      <span className="text-[11px] text-accent">
                        {ATTRIBUTE_LABELS[selected]} · clique de novo para tirar
                      </span>
                    ) : (
                      <span className="text-[11px] text-text-dim">
                        Nenhuma escolha
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {available.map((attr) => (
                      <ChoiceChip
                        key={attr}
                        selected={selected === attr}
                        onClick={() => toggleBoost(rule.id, attr)}
                      >
                        {ATTRIBUTE_LABELS[attr]}
                      </ChoiceChip>
                    ))}
                    {/* Mostra a seleção atual mesmo se ficou inválida temporariamente */}
                    {selected && !available.includes(selected) && (
                      <ChoiceChip
                        selected
                        onClick={() => toggleBoost(rule.id, selected)}
                        title="Esta escolha conflita — clique para desmarcar"
                      >
                        {ATTRIBUTE_LABELS[selected]} (conflito)
                      </ChoiceChip>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-dim">
            Perícia
          </h3>
          {background.skillGrants.length === 0 ? (
            <div className="text-sm text-text-dim">Nenhuma perícia concedida.</div>
          ) : (
            background.skillGrants.map((grant) => (
              <div key={grant.id} className="text-sm text-text-muted">
                {mode === 'select' &&
                grant.skillOptions &&
                grant.skillOptions.length > 0 ? (
                  <Select
                    value={choices.skillChoices[grant.id] ?? ''}
                    onChange={(e) => setSkill(grant.id, e.target.value)}
                  >
                    <option value="">Escolher perícia…</option>
                    {grant.skillOptions.map((id) => (
                      <option key={id} value={id}>
                        {SKILL_LABELS[id as keyof typeof SKILL_LABELS] ?? id}
                      </option>
                    ))}
                  </Select>
                ) : (
                  <div>{describeSkillGrant(grant)}</div>
                )}
              </div>
            ))
          )}
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-dim">
            Conhecimento
          </h3>
          {background.loreGrants.length === 0 ? (
            <div className="text-sm text-text-dim">
              Nenhum conhecimento concedido.
            </div>
          ) : (
            background.loreGrants.map((grant) => (
              <div key={grant.id} className="space-y-2 text-sm text-text-muted">
                {mode === 'select' &&
                grant.loreOptions &&
                grant.loreOptions.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {grant.loreOptions.map((opt) => (
                      <ChoiceChip
                        key={opt.id}
                        selected={choices.loreChoices[grant.id] === opt.id}
                        onClick={() => toggleLore(grant.id, opt.id)}
                      >
                        {opt.name}
                      </ChoiceChip>
                    ))}
                  </div>
                ) : mode === 'select' && grant.allowCustom ? (
                  <div className="space-y-1.5">
                    {grant.hint ? (
                      <p className="text-xs leading-relaxed text-text-muted">
                        {grant.hint.charAt(0).toUpperCase() + grant.hint.slice(1)}
                        {grant.hint.endsWith('.') ? '' : '.'}
                      </p>
                    ) : null}
                    <div className="relative">
                      <Input
                        placeholder="Nome do Conhecimento…"
                        value={choices.customLoreNames?.[grant.id] ?? ''}
                        onChange={(e) =>
                          onChoicesChange({
                            ...choices,
                            loreChoices: {
                              ...choices.loreChoices,
                              [grant.id]: e.target.value,
                            },
                            customLoreNames: {
                              ...choices.customLoreNames,
                              [grant.id]: e.target.value,
                            },
                          })
                        }
                      />
                      {(choices.customLoreNames?.[grant.id] ?? '').length > 0 && (
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-text-dim hover:text-text"
                          title="Limpar"
                          onClick={() =>
                            onChoicesChange({
                              ...choices,
                              loreChoices: (() => {
                                const next = { ...choices.loreChoices }
                                delete next[grant.id]
                                return next
                              })(),
                              customLoreNames: {
                                ...choices.customLoreNames,
                                [grant.id]: '',
                              },
                            })
                          }
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    {grant.allowCustom && mode === 'manage'
                      ? grant.hint
                        ? `Conhecimento personalizado: ${grant.hint}`
                        : 'Conhecimento personalizado (jogador escolhe o nome)'
                      : describeLoreGrant(grant)}
                  </div>
                )}
              </div>
            ))
          )}
        </section>

        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-dim">
            {background.featGrants.length > 0 &&
            background.featGrants.every(
              (grant) => grant.featType && grant.featType !== 'skill',
            )
              ? 'Recurso concedido'
              : background.featGrants.some(
                    (grant) => grant.featType && grant.featType !== 'skill',
                  )
                ? 'Feito ou recurso'
                : 'Feito de Perícia'}
          </h3>
          {background.featGrants.length === 0 ? (
            <div className="text-sm text-text-dim">Nenhum feito concedido.</div>
          ) : (
            background.featGrants.map((grant) => {
              const pick = buildBackgroundFeatPick(grant, choices, feats, {
                level: characterLevel,
                skillRanks,
              })
              if (pick) {
                return (
                  <div key={grant.id} className="space-y-1.5">
                    <FeatChoicePicker
                      pick={pick}
                      compact
                      onChange={(featId) => setFeatChoice(grant.id, featId)}
                    />
                  </div>
                )
              }
              const view = grantRulesView(grant, feats)
              return (
              <div key={grant.id} className="space-y-1.5 text-sm text-text-muted">
                <div className="flex flex-wrap items-center gap-2 font-medium text-text">
                  <ActionCost type={view.actionType} />
                  <span>
                    {view.name}
                    {grant.requiresSkillId
                      ? ` (se escolher ${SKILL_LABELS[grant.requiresSkillId as keyof typeof SKILL_LABELS] ?? grant.requiresSkillId})`
                      : ''}
                  </span>
                </div>
                {view.originalName && view.originalName !== view.name ? (
                  <p className="text-[11px] text-text-dim">{view.originalName}</p>
                ) : null}
                {view.traits.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {view.traits.map((trait) => (
                      <Badge key={trait} className="!text-[9px]">
                        {localizeTraitLabel(trait)}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                {view.frequency ? (
                  <p className="text-xs text-text-muted">
                    <span className="font-semibold text-text">Frequência: </span>
                    {view.frequency}
                  </p>
                ) : null}
                {view.trigger ? (
                  <p className="text-xs text-text-muted">
                    <span className="font-semibold text-text">Gatilho: </span>
                    {view.trigger}
                  </p>
                ) : null}
                {view.description ? (
                  <RichText
                    as="p"
                    className="whitespace-pre-wrap text-xs leading-relaxed text-text-muted"
                  >
                    {view.description}
                  </RichText>
                ) : (
                  <p className="text-xs italic text-text-dim">
                    Texto deste feito ainda não está cadastrado.
                  </p>
                )}
                {view.aonUrl ? (
                  <a
                    href={view.aonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-[10px] text-accent hover:underline"
                  >
                    Archives of Nethys ↗
                  </a>
                ) : null}
              </div>
              )
            })
          )}
        </section>

        {issues.length > 0 && mode === 'select' && (
          <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
            <div className="mb-1 font-semibold">Ainda falta:</div>
            <ul className="list-disc space-y-1 pl-4">
              {issues.map((issue) => (
                <li key={`${issue.field}-${issue.message}`}>{issue.message}</li>
              ))}
            </ul>
          </div>
        )}

        {issues.length === 0 && mode === 'select' && progress.total > 0 && (
          <div className="rounded-xl border border-success/35 bg-success/10 px-3 py-2 text-xs text-success">
            Todas as escolhas desta origem estão prontas.
          </div>
        )}

        <div className="flex flex-wrap gap-2 border-t border-border pt-3">
          {mode === 'select' && onConfirm && (
            <Button
              variant="accent"
              disabled={issues.length > 0}
              onClick={onConfirm}
              title={
                issues.length > 0
                  ? 'Complete as escolhas antes de confirmar'
                  : 'Aplicar esta origem ao personagem'
              }
            >
              Escolher origem
            </Button>
          )}
          {mode === 'select' && hasAnyChoice && (
            <Button variant="ghost" onClick={onClearChoices}>
              Limpar escolhas
            </Button>
          )}
          {background.provenance.type === 'official' && onDuplicate && (
            <Button onClick={onDuplicate}>Duplicar como Homebrew</Button>
          )}
          {onEditHomebrew && (
            <Button onClick={onEditHomebrew}>Editar Homebrew</Button>
          )}
        </div>
      </div>
    </Panel>
  )
}
