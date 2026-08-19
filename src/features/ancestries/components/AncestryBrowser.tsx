import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  Ancestry,
  AncestryChoices,
  AttributeId,
  ContentSource,
  CreatureSize,
  Feat,
  Heritage,
  Rarity,
} from '@/types'
import {
  additionalLanguageOptionsFor,
  additionalLanguageSlots,
  emptyAncestryChoices,
  formatSpeedSummary,
  getAvailableAttributesForAncestryBoost,
  getRequiredFreeBoostRules,
  isAutoAttributeBoost,
  isHeritageCompatibleWithAncestry,
  isVersatileHeritage,
  resolveAncestryBenefits,
  validateAncestryChoices,
} from '@/engine'
import {
  ATTRIBUTE_LABELS,
  RARITY_FILTER_OPTIONS,
  RARITY_LABELS,
  SIZE_FILTER_OPTIONS,
  SIZE_LABELS,
  formatSourceLabel,
  formatSpeedMeters,
} from '@/utils/labels'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, Tip, StatBox } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { ChoiceDetailList } from '@/components/ui/ChoiceDetailList'
import { RelatedFeatsPanel } from '@/features/feats/components/RelatedFeatsPanel'
import { SenseRulesCard } from '@/features/senses/components/SenseRulesCard'
import {
  enrichChoiceOptions,
  choiceOptionsHaveText,
} from '@/features/characters/choiceDetails'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { catalogRowPointerProps } from '@/features/tabs/tabPointer'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'
import type { AncestryExtraChoiceRule } from '@/types'
import {
  getCatalogCreature,
  isCreatureCatalogReady,
  listCatalogCreatures,
} from '@/data/creatureCatalog'

function ancestryHpLabel(ancestry: Ancestry): string {
  const bySize = ancestry.hitPointsBySize
  if (!bySize) return String(ancestry.hitPoints)
  const vals = Object.values(bySize).filter((n): n is number => n != null)
  if (vals.length === 0) return String(ancestry.hitPoints)
  const min = Math.min(...vals)
  const max = Math.max(...vals)
  return min === max ? String(min) : `${min}–${max}`
}

function ExtraChoicesPanel({
  ancestry,
  choices,
  feats,
  onSelect,
  onCustom,
  onSelectCreature,
}: {
  ancestry: Ancestry
  choices: AncestryChoices
  feats: Feat[]
  onSelect: (ruleId: string, optionId: string) => void
  onCustom: (ruleId: string, value: string) => void
  onSelectCreature: (rule: AncestryExtraChoiceRule, creatureId: string) => void
}) {
  const rules = ancestry.extraChoices ?? []
  if (rules.length === 0) return null

  return (
    <Panel
      title="Escolhas da ancestralidade"
      subtitle="Obrigatórias para fechar a ficha"
    >
      <div className="space-y-4">
        {rules.map((rule) => {
          const selected = choices.extraChoices?.[rule.id]
          if (rule.kind === 'size') {
            return (
              <div key={rule.id}>
                <div className="mb-1.5 text-xs font-medium text-text">
                  {rule.label}{' '}
                  <span className="text-text-dim">(obrigatório)</span>
                </div>
                {rule.hint && (
                  <p className="mb-2 text-[11px] text-text-dim">{rule.hint}</p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {(rule.sizeOptions ?? []).map((size) => (
                    <ChoiceChip
                      key={size}
                      selected={selected === size}
                      onClick={() => onSelect(rule.id, size)}
                    >
                      {SIZE_LABELS[size as CreatureSize]}
                      {ancestry.hitPointsBySize?.[size] != null
                        ? ` · ${ancestry.hitPointsBySize[size]} PV`
                        : ''}
                    </ChoiceChip>
                  ))}
                </div>
              </div>
            )
          }

          if (rule.kind === 'options') {
            const details = enrichChoiceOptions(
              (rule.options ?? []).map((opt) => ({
                id: opt.id,
                name: opt.label,
                originalName: opt.originalLabel,
                description: opt.description,
              })),
              feats,
            )
            return (
              <div key={rule.id}>
                <div className="mb-1.5 text-xs font-medium text-text">
                  {rule.label}{' '}
                  <span className="text-text-dim">(obrigatório)</span>
                </div>
                {choiceOptionsHaveText(details) ? (
                  <ChoiceDetailList
                    hint={rule.hint}
                    options={details}
                    selectedId={selected}
                    onSelect={(id) => onSelect(rule.id, id)}
                  />
                ) : (
                  <>
                    {rule.hint && (
                      <p className="mb-2 text-[11px] text-text-dim">
                        {rule.hint}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5">
                      {(rule.options ?? []).map((opt) => (
                        <ChoiceChip
                          key={opt.id}
                          selected={selected === opt.id}
                          onClick={() => onSelect(rule.id, opt.id)}
                        >
                          {opt.label}
                        </ChoiceChip>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )
          }

          if (rule.kind === 'creatureCatalog' && rule.catalog) {
            return (
              <CreatureCatalogChoice
                key={rule.id}
                rule={rule}
                selected={selected}
                customLabel={choices.customLabels?.[rule.id] ?? ''}
                onSelectCreature={onSelectCreature}
                onCustom={onCustom}
              />
            )
          }

          return null
        })}
      </div>
    </Panel>
  )
}

function CreatureCatalogChoice({
  rule,
  selected,
  customLabel,
  onSelectCreature,
  onCustom,
}: {
  rule: AncestryExtraChoiceRule
  selected?: string
  customLabel: string
  onSelectCreature: (rule: AncestryExtraChoiceRule, creatureId: string) => void
  onCustom: (ruleId: string, value: string) => void
}) {
  const catalog = rule.catalog!
  const ready = isCreatureCatalogReady(catalog.id)
  const creatures = ready
    ? listCatalogCreatures(catalog.id, catalog.kinds)
    : []
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return creatures
    return creatures.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.originalName.toLowerCase().includes(q),
    )
  }, [creatures, query])
  const allowCustom = catalog.allowCustomUntilCatalogReady !== false

  return (
    <div>
      <div className="mb-1.5 text-xs font-medium text-text">
        {rule.label} <span className="text-text-dim">(obrigatório)</span>
      </div>
      {rule.hint && (
        <p className="mb-2 text-[11px] text-text-dim">{rule.hint}</p>
      )}
      {ready ? (
        <>
          {creatures.length > 8 && (
            <>
              <Input
                className="mb-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar na lista…"
              />
              <FilterCount
                shown={filtered.length}
                total={creatures.length}
                className="mb-2"
              />
            </>
          )}
          <div className="mb-2 flex max-h-40 flex-wrap gap-1.5 overflow-y-auto">
            {filtered.map((c) => (
              <ChoiceChip
                key={c.id}
                selected={selected === c.id}
                onClick={() => onSelectCreature(rule, c.id)}
                title={c.originalName}
              >
                {c.name}
                {c.size ? ` · ${SIZE_LABELS[c.size]}` : ''}
              </ChoiceChip>
            ))}
            {filtered.length === 0 && (
              <p className="text-[11px] text-text-dim">
                Nenhum animal neste filtro.
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="mb-2 text-[11px] text-text-dim">
          A lista de criaturas ainda não entrou no app. Anote o animal; depois
          você poderá escolher da lista.
        </p>
      )}
      {allowCustom && (
        <Input
          value={customLabel}
          onChange={(e) => onCustom(rule.id, e.target.value)}
          placeholder={
            catalog.customPlaceholder ??
            (ready ? 'Outro (não está na lista)…' : 'Nome do animal…')
          }
        />
      )}
    </div>
  )
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

interface AncestryBrowserProps {
  ancestries: Ancestry[]
  heritages: Heritage[]
  sources: ContentSource[]
  selectedId?: string | null
  selectedHeritageId?: string | null
  initialChoices?: AncestryChoices | null
  characterLevel?: number
  /**
   * Modificador de Inteligência da ficha SEM contribuições de ancestralidade.
   * O browser soma os boosts da prévia para liberar idiomas ao vivo.
   */
  intelligenceModifier?: number
  /** Slots extras de idioma (conexões, feitos manuais). */
  extraLanguageSlots?: number
  /** Feitos do catálogo (filtrados por ancestralidade no browser) */
  feats?: Feat[]
  /** select = ficha; browse = compêndio (só consulta); manage = homebrew */
  mode?: 'select' | 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onConfirm?: (
    ancestryId: string,
    choices: AncestryChoices,
    options?: { clearHeritage?: boolean },
  ) => void
  onOpenHeritage?: () => void
  onCreateHomebrew?: () => void
  onCreateHeritage?: (ancestryId?: string) => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
  onEditHeritage?: (id: string) => void
  onDuplicateHeritage?: (id: string) => void
}

export function AncestryBrowser({
  ancestries,
  heritages,
  sources,
  selectedId,
  selectedHeritageId,
  initialChoices,
  characterLevel = 1,
  intelligenceModifier = 0,
  extraLanguageSlots = 0,
  feats = [],
  mode = 'select',
  previewId,
  onActiveChange,
  onConfirm,
  onOpenHeritage,
  onCreateHomebrew,
  onCreateHeritage,
  onEditHomebrew,
  onDuplicate,
  onEditHeritage,
  onDuplicateHeritage,
}: AncestryBrowserProps) {
  const [search, setSearch] = useState('')
  const [customLang, setCustomLang] = useState('')
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [sizes, setSizes] = useState<CreatureSize[]>([])
  const [provenances, setProvenances] = useState<Array<'official' | 'homebrew'>>(
    [],
  )
  const [activeId, setActiveId] = useState<string | null>(
    previewId ?? selectedId ?? null,
  )
  const [choices, setChoices] = useState<AncestryChoices>(
    initialChoices ?? emptyAncestryChoices(),
  )

  useEffect(() => {
    if (previewId !== undefined) {
      setActiveId(previewId)
      return
    }
    if (selectedId) {
      setActiveId(selectedId)
      setChoices(initialChoices ?? emptyAncestryChoices())
    }
  }, [previewId, selectedId, initialChoices])

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return ancestries
      .filter((a) => {
        if (!matchesSelected(a.rarity, rarities)) return false
        if (!matchesSelected(a.size, sizes)) return false
        if (!matchesSelected(a.provenance.type, provenances)) return false
        if (!q) return true
        return (
          a.name.toLowerCase().includes(q) ||
          a.originalName.toLowerCase().includes(q) ||
          a.traits.some(
            (t) =>
              t.toLowerCase().includes(q) ||
              localizeTraitLabel(t).toLowerCase().includes(q),
          )
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  }, [ancestries, search, rarities, sizes, provenances])

  const active = ancestries.find((a) => a.id === activeId) ?? null
  const heritageCount = active
    ? heritages.filter((h) => h.ancestryId === active.id).length
    : 0
  const specificHeritages = active
    ? heritages
        .filter((h) => h.ancestryId === active.id)
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    : []
  const versatileCount = heritages.filter((h) => isVersatileHeritage(h)).length
  const currentHeritage = selectedHeritageId
    ? heritages.find((h) => h.id === selectedHeritageId)
    : null
  const compatibleHeritage =
    active &&
    currentHeritage &&
    isHeritageCompatibleWithAncestry(
      currentHeritage,
      active.id,
      active.traits,
    )
      ? currentHeritage
      : null

  const preview = useMemo(() => {
    if (!active) return null
    return resolveAncestryBenefits(
      active,
      choices,
      compatibleHeritage,
      characterLevel,
    )
  }, [active, choices, compatibleHeritage, characterLevel])

  /** INT ao vivo = ficha sem ancestralidade + boosts da prévia */
  const liveIntelligence = useMemo(() => {
    const fromPreview =
      preview?.attributeContributions
        .filter((c) => c.target === 'attribute.intelligence')
        .reduce((sum, c) => sum + c.value, 0) ?? 0
    return intelligenceModifier + fromPreview
  }, [intelligenceModifier, preview])

  const freeBoostRules = active
    ? getRequiredFreeBoostRules(active, choices)
    : []
  const langSlots = active
    ? additionalLanguageSlots(liveIntelligence, active, extraLanguageSlots)
    : 0
  const languageOptions = active
    ? additionalLanguageOptionsFor(active, compatibleHeritage)
    : []

  const issues = active
    ? validateAncestryChoices(
        active,
        choices,
        compatibleHeritage,
        liveIntelligence,
        extraLanguageSlots,
      ).filter((i) => !i.field.startsWith('heritageChoices'))
    : []
  const canConfirm = Boolean(active) && issues.length === 0

  function selectAncestry(id: string, event?: TabPointerEvent) {
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
      setChoices(emptyAncestryChoices())
    } else {
      setChoices(initialChoices ?? emptyAncestryChoices())
    }
  }

  function setFreeBoost(ruleId: string, attr: AttributeId) {
    setChoices((prev) => {
      const current = prev.attributeBoosts[ruleId]
      const nextBoosts = { ...prev.attributeBoosts }
      if (current === attr) {
        delete nextBoosts[ruleId]
      } else {
        nextBoosts[ruleId] = attr
      }
      return { ...prev, attributeBoosts: nextBoosts }
    })
  }

  function toggleLanguage(lang: string) {
    setChoices((prev) => {
      const has = prev.additionalLanguages.includes(lang)
      if (has) {
        return {
          ...prev,
          additionalLanguages: prev.additionalLanguages.filter((l) => l !== lang),
        }
      }
      if (prev.additionalLanguages.length >= langSlots) return prev
      return {
        ...prev,
        additionalLanguages: [...prev.additionalLanguages, lang],
      }
    })
  }

  function setExtraChoice(ruleId: string, optionId: string) {
    setChoices((prev) => {
      const extra = { ...(prev.extraChoices ?? {}) }
      if (extra[ruleId] === optionId) {
        delete extra[ruleId]
      } else {
        extra[ruleId] = optionId
      }
      return { ...prev, extraChoices: extra }
    })
  }

  function setCustomLabel(ruleId: string, value: string) {
    setChoices((prev) => {
      const extra = { ...(prev.extraChoices ?? {}), [ruleId]: 'custom' }
      const labels = { ...(prev.customLabels ?? {}), [ruleId]: value }
      return { ...prev, extraChoices: extra, customLabels: labels }
    })
  }

  function setCatalogCreature(
    rule: AncestryExtraChoiceRule,
    creatureId: string,
  ) {
    setChoices((prev) => {
      const extra = { ...(prev.extraChoices ?? {}) }
      const labels = { ...(prev.customLabels ?? {}) }
      if (extra[rule.id] === creatureId) {
        delete extra[rule.id]
        return { ...prev, extraChoices: extra }
      }
      extra[rule.id] = creatureId
      delete labels[rule.id]
      const entry = rule.catalog
        ? getCatalogCreature(rule.catalog.id, creatureId)
        : undefined
      const sizeRule = active?.extraChoices?.find((r) => r.kind === 'size')
      if (
        entry?.size &&
        sizeRule &&
        (sizeRule.sizeOptions ?? []).includes(entry.size)
      ) {
        extra[sizeRule.id] = entry.size
      }
      return { ...prev, extraChoices: extra, customLabels: labels }
    })
  }

  const changingAncestry = Boolean(selectedId && active && active.id !== selectedId)
  const keepVersatileHeritage =
    changingAncestry &&
    Boolean(
      currentHeritage &&
        isVersatileHeritage(currentHeritage) &&
        currentHeritage.id === selectedHeritageId &&
        active &&
        isHeritageCompatibleWithAncestry(
          currentHeritage,
          active.id,
          active.traits,
        ),
    )

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex w-full shrink-0 flex-col gap-2 lg:w-72">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-text">Ancestralidades</h2>
            <div className="text-[11px] text-text-dim">
              {filtered.length} de {ancestries.length}
            </div>
          </div>
          {mode === 'manage' && onCreateHomebrew && (
            <Button size="sm" variant="accent" onClick={onCreateHomebrew}>
              + Criar
            </Button>
          )}
        </div>
        {mode === 'manage' && onCreateHeritage && (
          <Button size="sm" onClick={() => onCreateHeritage()}>
            + Herança (oficial ou homebrew)
          </Button>
        )}
        <Input
          placeholder="Buscar ancestralidade… (/)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MultiFilter
          label="Raridade"
          options={RARITY_FILTER_OPTIONS}
          selected={rarities}
          onChange={setRarities}
          emptyLabel="Todas"
        />
        <MultiFilter
          label="Tamanho"
          options={SIZE_FILTER_OPTIONS}
          selected={sizes}
          onChange={setSizes}
          emptyLabel="Todos"
        />
        {mode === 'manage' && (
          <MultiFilter
            label="Fonte"
            options={[
              { value: 'official', label: 'Oficial' },
              { value: 'homebrew', label: 'Homebrew' },
            ]}
            selected={provenances}
            onChange={setProvenances}
            emptyLabel="Oficiais + Homebrew"
          />
        )}
        <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-surface-1">
          <ul className="divide-y divide-border">
            {filtered.map((a) => {
              const selected = a.id === activeId
              const applied = a.id === selectedId
              return (
                <li key={a.id}>
                  <button
                    type="button"
                    {...catalogRowPointerProps((event) =>
                      selectAncestry(a.id, event),
                    )}
                    className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                      selected
                        ? 'bg-accent/15 text-accent'
                        : 'hover:bg-surface-2 text-text-muted'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-text">
                        {a.name}
                      </span>
                      <span className="flex items-center gap-1">
                        {a.provenance.type === 'homebrew' && (
                          <ProvenanceBadge type="homebrew" />
                        )}
                        {applied && (
                          <Badge tone="accent">Na ficha</Badge>
                        )}
                      </span>
                    </span>
                    <span className="mt-0.5 text-[11px] text-text-dim">
                      {a.originalName} · PV {ancestryHpLabel(a)} ·{' '}
                      {formatSpeedMeters(a.speed)}
                    </span>
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-text-dim">
                Nenhuma ancestralidade encontrada.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        {!active ? (
          <Panel title="Ancestralidade" subtitle="Escolha à esquerda">
            <p className="text-sm text-text-muted">
              {mode === 'manage'
                ? 'Selecione um povo para consultar, duplicar ou editar. Homebrew não vem pronto — crie do zero ou copie uma oficial.'
                : 'Selecione uma ancestralidade para ver mecânicas, lore e aplicar na ficha. Clique de novo no mesmo item para desmarcar.'}
            </p>
          </Panel>
        ) : (
          <div className="space-y-3">
            {mode === 'manage' && (
              <div className="flex flex-wrap gap-2">
                {onDuplicate && (
                  <Button onClick={() => onDuplicate(active.id)}>
                    Duplicar como Homebrew
                  </Button>
                )}
                {active.provenance.type === 'homebrew' && onEditHomebrew && (
                  <Button
                    variant="accent"
                    onClick={() => onEditHomebrew(active.id)}
                  >
                    Editar Homebrew
                  </Button>
                )}
              </div>
            )}
            <Panel
              title={active.name}
              subtitle={`${active.originalName} · ${formatSourceLabel(
                sourceMap[active.sourceId ?? '']?.name,
                active.sourcePage,
              )}`}
              actions={
                <div className="flex flex-wrap gap-1.5">
                  <RarityBadge rarity={active.rarity} />
                  <ProvenanceBadge type={active.provenance.type} />
                </div>
              }
            >
              <div className="mb-3 flex flex-wrap gap-1.5">
                {active.traits.map((t) => (
                  <Badge key={t}>{localizeTraitLabel(t)}</Badge>
                ))}
              </div>

              <RichText
                as="p"
                className="text-sm leading-relaxed text-text-muted"
              >
                {active.lore.summary}
              </RichText>

              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <StatBox
                  label="PV base"
                  value={ancestryHpLabel(active)}
                  hint={
                    active.hitPointsBySize
                      ? 'Varia com o tamanho escolhido abaixo'
                      : undefined
                  }
                />
                <StatBox label="Tamanho" value={SIZE_LABELS[active.size]} />
                <StatBox label="Velocidade" value={formatSpeedMeters(active.speed)} />
                <StatBox
                  label="Heranças"
                  value={String(heritageCount)}
                  hint={
                    versatileCount > 0
                      ? `${heritageCount} desta ancestralidade · ${versatileCount} versátil(is) na aba Herança`
                      : 'Heranças específicas desta ancestralidade'
                  }
                />
              </div>

              <div className="mt-3">
                <Tip>
                  Em PF2e, os <strong>PV da ancestralidade entram uma vez</strong>.
                  A cada nível você soma PV da classe + Constituição. Ex.: anão
                  (10) no nível 2 com CON +2 e sem classe ainda = 10 + (2×2) ={' '}
                  <strong>14 PV provisórios</strong> (faltam os PV da classe).
                </Tip>
              </div>
            </Panel>

            {mode === 'manage' && (
              <Panel
                title="Heranças deste povo"
                subtitle="Oficiais e as que você criou para este ancestral"
              >
                {specificHeritages.length === 0 ? (
                  <p className="text-sm text-text-muted">
                    Nenhuma herança específica ainda. Você pode criar uma ou
                    usar só as versáteis na outra aba do compêndio.
                  </p>
                ) : (
                  <ul className="space-y-1.5">
                    {specificHeritages.map((h) => (
                      <li
                        key={h.id}
                        className="flex items-center justify-between gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-2"
                      >
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5">
                            <span className="truncate text-sm font-medium text-text">
                              {h.name}
                            </span>
                            {h.provenance.type === 'homebrew' && (
                              <ProvenanceBadge type="homebrew" />
                            )}
                          </span>
                          {h.rulesSummary && (
                            <span className="mt-0.5 line-clamp-1 text-[11px] text-text-dim">
                              {h.rulesSummary}
                            </span>
                          )}
                        </span>
                        <span className="flex shrink-0 flex-wrap justify-end gap-1">
                          {onDuplicateHeritage && (
                            <Button
                              size="sm"
                              onClick={() => onDuplicateHeritage(h.id)}
                            >
                              Duplicar
                            </Button>
                          )}
                          {h.provenance.type === 'homebrew' && onEditHeritage && (
                            <Button
                              size="sm"
                              variant="accent"
                              onClick={() => onEditHeritage(h.id)}
                            >
                              Editar
                            </Button>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {onCreateHeritage && (
                  <div className="mt-2">
                    <Button
                      size="sm"
                      onClick={() => onCreateHeritage(active.id)}
                    >
                      + Herança para este povo
                    </Button>
                  </div>
                )}
              </Panel>
            )}

            <Panel title="Atributos" subtitle="Boosts e falhas da ancestralidade">
              <div className="space-y-3">
                {active.attributeFlaws.length > 0 ||
                active.attributeBoosts.some((r) => r.option.kind === 'specific') ? (
                  <label className="flex items-start gap-2 rounded-lg border border-border bg-surface-2/60 px-3 py-2 text-sm">
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-[var(--color-accent)]"
                      checked={Boolean(choices.useFlexibleBoosts)}
                      onChange={() =>
                        setChoices((prev) => ({
                          ...prev,
                          useFlexibleBoosts: !prev.useFlexibleBoosts,
                          attributeBoosts: {},
                        }))
                      }
                    />
                    <span>
                      <span className="font-medium">Dois aumentos livres</span>
                      <span className="mt-0.5 block text-[11px] text-text-dim">
                        Player Core: no lugar dos aumentos fixos (e da falha),
                        você escolhe dois atributos diferentes.
                      </span>
                    </span>
                  </label>
                ) : null}
                {!choices.useFlexibleBoosts ? (
                  <div>
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                      Boosts automáticos
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {active.attributeBoosts
                        .filter(isAutoAttributeBoost)
                        .map((rule) => (
                          <Badge key={rule.id} tone="success">
                            +1{' '}
                            {ATTRIBUTE_LABELS[
                              (rule.option.kind === 'specific'
                                ? rule.option.attributes[0]
                                : undefined) ?? 'strength'
                            ]}
                          </Badge>
                        ))}
                      {active.attributeFlaws.map((flaw) => (
                        <Badge key={flaw} tone="neutral">
                          −1 {ATTRIBUTE_LABELS[flaw]} (falha)
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-text-dim">
                    Falha da ancestralidade não se aplica neste modo.
                  </p>
                )}

                {freeBoostRules.map((rule) => {
                  const options = getAvailableAttributesForAncestryBoost(
                    active,
                    choices,
                    rule.id,
                  )
                  const selected = choices.attributeBoosts[rule.id]
                  const lockedAttrs = active.attributeBoosts
                    .filter(isAutoAttributeBoost)
                    .flatMap((r) =>
                      r.option.kind === 'specific' ? r.option.attributes : [],
                    )
                    .map((a) => ATTRIBUTE_LABELS[a])
                  const flawAttrs = active.attributeFlaws.map(
                    (a) => ATTRIBUTE_LABELS[a],
                  )
                  return (
                    <div key={rule.id}>
                      <div className="mb-1.5 text-xs font-medium text-text">
                        {rule.label}{' '}
                        <span className="text-text-dim">(obrigatório)</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {options.map((attr) => (
                          <ChoiceChip
                            key={attr}
                            selected={selected === attr}
                            onClick={() => setFreeBoost(rule.id, attr)}
                          >
                            {ATTRIBUTE_LABELS[attr]}
                          </ChoiceChip>
                        ))}
                      </div>
                      <p className="mt-1.5 text-[11px] text-text-dim">
                        Não pode repetir{' '}
                        {lockedAttrs.length > 0
                          ? lockedAttrs.join(' ou ')
                          : 'atributos já aumentados'}{' '}
                        neste passo
                        {flawAttrs.length > 0
                          ? ` — mas pode colocar o boost livre em ${flawAttrs.join(' ou ')} para anular a falha`
                          : ''}
                        .
                      </p>
                    </div>
                  )
                })}
              </div>
            </Panel>

            {(active.extraChoices?.length ?? 0) > 0 && (
              <ExtraChoicesPanel
                ancestry={active}
                choices={choices}
                feats={feats}
                onSelect={setExtraChoice}
                onCustom={setCustomLabel}
                onSelectCreature={setCatalogCreature}
              />
            )}

            <Panel
              title="Idiomas"
              subtitle={
                langSlots > 0
                  ? `Automáticos + ${langSlots} adicional(is) · INT ${
                      liveIntelligence >= 0
                        ? `+${liveIntelligence}`
                        : liveIntelligence
                    }${
                      extraLanguageSlots > 0
                        ? ` · ${extraLanguageSlots} de conexões`
                        : ''
                    } · ${choices.additionalLanguages.length}/${langSlots}`
                  : extraLanguageSlots > 0
                    ? 'Slots extras nas Conexões — escolha abaixo'
                    : 'Automáticos (INT 0 ou negativa = sem idiomas extras)'
              }
            >
              <div className="mb-2 flex flex-wrap gap-1.5">
                {active.languages.automatic.map((lang) => (
                  <Badge key={lang} tone="info">
                    {lang}
                  </Badge>
                ))}
              </div>
              {langSlots > 0 ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {languageOptions.map((lang) => (
                      <ChoiceChip
                        key={lang}
                        selected={choices.additionalLanguages.includes(lang)}
                        onClick={() => toggleLanguage(lang)}
                      >
                        {lang}
                      </ChoiceChip>
                    ))}
                    {choices.additionalLanguages
                      .filter((lang) => !languageOptions.includes(lang))
                      .map((lang) => (
                        <ChoiceChip
                          key={lang}
                          selected
                          onClick={() => toggleLanguage(lang)}
                        >
                          {lang}
                        </ChoiceChip>
                      ))}
                  </div>
                  {choices.additionalLanguages.length < langSlots ? (
                    <form
                      className="flex max-w-sm gap-1.5"
                      onSubmit={(e) => {
                        e.preventDefault()
                        const lang = customLang.trim()
                        if (!lang) return
                        toggleLanguage(lang)
                        setCustomLang('')
                      }}
                    >
                      <Input
                        value={customLang}
                        placeholder="Outro idioma…"
                        onChange={(e) => setCustomLang(e.target.value)}
                      />
                      <Button size="sm" type="submit" variant="secondary">
                        Adicionar
                      </Button>
                    </form>
                  ) : null}
                </div>
              ) : (
                <p className="text-xs text-text-dim">
                  Aumente a Inteligência (boost livre ou origem) ou ligue um
                  slot extra em Conexões para idiomas adicionais.
                </p>
              )}
            </Panel>

            <Panel title="Sentidos e habilidades" subtitle="toque no sentido para ler a regra">
              <ul className="space-y-1.5">
                {active.senses.length === 0 ? (
                  <li>
                    <SenseRulesCard kind="vision" name="Visão normal" />
                  </li>
                ) : (
                  active.senses.map((s) => (
                    <li key={s.id}>
                      <SenseRulesCard
                        kind={s.kind}
                        name={s.name}
                        rangeFeet={s.range}
                        description={s.description}
                        sourceLabel={s.originalName}
                      />
                    </li>
                  ))
                )}
                {active.specialAbilities.map((a) => (
                  <li
                    key={a.id}
                    className="rounded-lg border border-border bg-surface-2 px-3 py-2"
                  >
                    <div className="text-sm font-medium text-text">{a.name}</div>
                    <RichText as="p" className="mt-0.5 text-xs text-text-muted">
                      {polishRulesText(a.description)}
                    </RichText>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Lore" subtitle="Para interpretar o personagem">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                    Você provavelmente…
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-text-muted">
                    {active.lore.youMight.map((t) => (
                      <RichText as="li" key={t}>
                        {t}
                      </RichText>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                    Outros provavelmente…
                  </div>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-text-muted">
                    {active.lore.othersProbably.map((t) => (
                      <RichText as="li" key={t}>
                        {t}
                      </RichText>
                    ))}
                  </ul>
                </div>
              </div>
              <details className="mt-3 rounded-lg border border-border bg-surface-2 px-3 py-2">
                <summary className="cursor-pointer text-xs font-medium text-text">
                  Descrição física, sociedade e crenças
                </summary>
                <div className="mt-2 space-y-2 text-xs leading-relaxed text-text-muted">
                  <RichText as="p">{active.lore.physicalDescription}</RichText>
                  <RichText as="p">{active.lore.society}</RichText>
                  <RichText as="p">{active.lore.beliefs}</RichText>
                  {active.lore.popularEdicts && (
                    <p>
                      <strong className="text-text">Éditos populares:</strong>{' '}
                      {active.lore.popularEdicts.join('; ')}
                    </p>
                  )}
                  {active.lore.popularAnathema && (
                    <p>
                      <strong className="text-text">Anátemas populares:</strong>{' '}
                      {active.lore.popularAnathema.join('; ')}
                    </p>
                  )}
                  <p>
                    <strong className="text-text">Nomes de exemplo:</strong>{' '}
                    {active.lore.sampleNames.join(', ')}
                  </p>
                </div>
              </details>
            </Panel>

            {preview && (
              <Panel
                title="Prévia na ficha"
                subtitle={`Nível ${characterLevel} · PV completo recalcula na ficha com CON`}
              >
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <StatBox
                    label="PV ancestralidade"
                    value={String(preview.hitPointsFromAncestry)}
                    hint="Somados uma vez. CON × nível entra na ficha automaticamente."
                  />
                  <StatBox
                    label="Velocidade"
                    value={formatSpeedSummary(
                      preview.speed,
                      preview.additionalSpeeds,
                    )}
                  />
                  <StatBox
                    label="Tamanho"
                    value={SIZE_LABELS[preview.size]}
                  />
                  <StatBox
                    label="Idiomas"
                    value={String(preview.languages.length)}
                  />
                </div>
                <p className="mt-2 text-[11px] text-text-dim">
                  Raridade: {RARITY_LABELS[active.rarity]}. Fonte:{' '}
                  {active.aonUrl ? (
                    <a
                      href={active.aonUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:underline"
                    >
                      Archives of Nethys
                    </a>
                  ) : (
                    '—'
                  )}
                </p>
              </Panel>
            )}

            <RelatedFeatsPanel
              title="Feitos de ancestralidade"
              characterLevel={characterLevel}
              feats={feats.filter(
                (f) => f.category === 'ancestry' && f.ancestryId === active.id,
              )}
              emptyHint="Ainda não há feitos desta ancestralidade no catálogo."
            />

            {mode === 'browse' || mode === 'manage' ? (
              <Tip>
                {mode === 'manage'
                  ? 'Crie do zero, duplique uma oficial, ou acrescente uma herança a um povo que já existe. Nada homebrew vem pronto — a lista começa só com o Remaster.'
                  : 'Compêndio — só consulta. Para aplicar à ficha, abra um personagem e use a aba Ancestralidade.'}
              </Tip>
            ) : (
              <>
                {issues.length > 0 && (
                  <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
                    {issues.map((i) => (
                      <div key={i.field}>{i.message}</div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-2 pb-2">
                  <Button
                    variant="accent"
                    disabled={!canConfirm || !onConfirm}
                    onClick={() => {
                      if (!active || !onConfirm) return
                      onConfirm(active.id, choices, {
                        clearHeritage: changingAncestry && !keepVersatileHeritage,
                      })
                    }}
                  >
                    {selectedId === active.id
                      ? 'Atualizar ancestralidade'
                      : 'Aplicar à ficha'}
                  </Button>
                  {onOpenHeritage && (
                    <Button variant="secondary" onClick={onOpenHeritage}>
                      Escolher herança →
                    </Button>
                  )}
                  {changingAncestry && !keepVersatileHeritage && (
                    <span className="text-[11px] text-text-dim">
                      Trocar de ancestralidade remove a herança atual.
                    </span>
                  )}
                  {keepVersatileHeritage && (
                    <span className="text-[11px] text-text-dim">
                      A herança versátil permanece ao trocar de ancestralidade.
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
