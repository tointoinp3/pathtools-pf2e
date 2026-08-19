import { useMemo, useState } from 'react'
import type {
  ContentSource,
  Feat,
  FeatCategory,
  ProvenanceType,
  Rarity,
} from '@/types'
import {
  descriptionLooksEnglish,
  localizeTraitLabel,
} from '@/data/i18n/traitLabelsPt'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'
import { cleanFeatMarkdownText } from '@/data/i18n/featDescriptionsPt'
import { formatFeatPrerequisite } from '@/features/feats/components/FeatExpandRow'
import { ActionCost, ActionIcon, type Pf2ActionType } from '@/components/ui/ActionIcon'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import {
  MultiFilter,
  MultiSelectDropdown,
  matchesSelected,
} from '@/components/ui/MultiFilter'
import { Panel } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import {
  FEAT_CATEGORY_LABELS,
  RARITY_FILTER_OPTIONS,
  formatSourceLabel,
} from '@/utils/labels'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { useBrowseSelection } from '@/features/tabs/useBrowseSelection'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'

type CategoryTab = FeatCategory | 'all'

const CATEGORY_TABS: Array<{ id: CategoryTab; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'ancestry', label: 'Ancestralidade' },
  { id: 'class', label: 'Classe' },
  { id: 'archetype', label: 'Arquétipo' },
  { id: 'skill', label: 'Perícia' },
  { id: 'general', label: 'Geral' },
  { id: 'mythic', label: 'Mítico' },
  { id: 'other', label: 'Outro' },
]

const FEAT_LEVEL_OPTIONS = Array.from({ length: 20 }, (_, i) => {
  const level = String(i + 1)
  return { value: level, label: level }
})

const ACTION_FILTER_OPTIONS: Array<{
  value: Pf2ActionType
  label: string
}> = [
  { value: 'passive', label: 'Passiva' },
  { value: 'free', label: 'Livre' },
  { value: 'reaction', label: 'Reação' },
  { value: 'one', label: '1 ação' },
  { value: 'two', label: '2 ações' },
  { value: 'three', label: '3 ações' },
]

export interface FeatCatalogParentRef {
  id: string
  name: string
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

function featMatchesQuery(feat: Feat, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  if (feat.name.toLowerCase().includes(q)) return true
  if (feat.originalName.toLowerCase().includes(q)) return true
  if (feat.description.toLowerCase().includes(q)) return true
  return feat.traits.some(
    (trait) =>
      trait.toLowerCase().includes(q) ||
      localizeTraitLabel(trait).toLowerCase().includes(q),
  )
}

function parentIdOf(feat: Feat): string | null {
  return feat.classId ?? feat.ancestryId ?? feat.archetypeId ?? null
}

interface FeatCatalogBrowserProps {
  feats: Feat[]
  sources: ContentSource[]
  parents?: {
    ancestries: FeatCatalogParentRef[]
    classes: FeatCatalogParentRef[]
    archetypes: FeatCatalogParentRef[]
  }
  mode?: 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onCreateHomebrew?: (category: FeatCategory) => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function FeatCatalogBrowser({
  feats,
  sources,
  parents,
  mode = 'browse',
  previewId,
  onActiveChange,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: FeatCatalogBrowserProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryTab>('all')
  const [levels, setLevels] = useState<string[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [actions, setActions] = useState<Pf2ActionType[]>([])
  const [traits, setTraits] = useState<string[]>([])
  const [parentIds, setParentIds] = useState<string[]>([])
  const [provenances, setProvenances] = useState<ProvenanceType[]>([])
  const { activeId: selectedId, rowProps } = useBrowseSelection(
    previewId,
    onActiveChange,
    { toggle: false },
  )
  const searchRef = useSlashSearch()

  const catalog = useMemo(() => {
    const byId = new Map(feats.map((feat) => [feat.id, feat]))
    return feats.map((feat) => withLocalizedFeatName(feat, byId))
  }, [feats])

  const parentNameById = useMemo(() => {
    const map = new Map<string, string>()
    for (const item of parents?.ancestries ?? []) map.set(item.id, item.name)
    for (const item of parents?.classes ?? []) map.set(item.id, item.name)
    for (const item of parents?.archetypes ?? []) map.set(item.id, item.name)
    return map
  }, [parents])

  const parentOptions = useMemo(() => {
    const seen = new Set<string>()
    const options: Array<{ value: string; label: string }> = []
    for (const feat of catalog) {
      const id = parentIdOf(feat)
      if (!id || seen.has(id)) continue
      seen.add(id)
      options.push({
        value: id,
        label: parentNameById.get(id) ?? id,
      })
    }
    return options.sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
  }, [catalog, parentNameById])

  const traitOptions = useMemo(() => {
    const counts = new Map<string, number>()
    for (const feat of catalog) {
      for (const trait of feat.traits) {
        counts.set(trait, (counts.get(trait) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], 'pt'))
      .map(([value, n]) => ({
        value,
        label: `${localizeTraitLabel(value)} (${n})`,
      }))
  }, [catalog])

  const filtered = useMemo(() => {
    return catalog.filter((feat) => {
      if (category !== 'all' && feat.category !== category) return false
      if (!matchesSelected(String(feat.level), levels)) return false
      if (!matchesSelected(feat.rarity, rarities)) return false
      if (actions.length > 0) {
        const action = feat.actionType ?? 'passive'
        if (!actions.includes(action)) return false
      }
      if (traits.length > 0 && !traits.some((t) => feat.traits.includes(t))) {
        return false
      }
      if (parentIds.length > 0) {
        const id = parentIdOf(feat)
        if (!id || !parentIds.includes(id)) return false
      }
      if (
        provenances.length > 0 &&
        !provenances.includes(feat.provenance.type)
      ) {
        return false
      }
      return featMatchesQuery(feat, query)
    })
  }, [
    catalog,
    category,
    levels,
    rarities,
    actions,
    traits,
    parentIds,
    provenances,
    query,
  ])

  const grouped = useMemo(() => {
    const map = new Map<number, Feat[]>()
    for (const feat of filtered) {
      const list = map.get(feat.level) ?? []
      list.push(feat)
      map.set(feat.level, list)
    }
    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([level, list]) => ({
        level,
        feats: list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
      }))
  }, [filtered])

  const selected =
    catalog.find((f) => f.id === selectedId) ?? filtered[0] ?? null
  const filtersOn =
    query.trim() !== '' ||
    category !== 'all' ||
    levels.length > 0 ||
    rarities.length > 0 ||
    actions.length > 0 ||
    traits.length > 0 ||
    parentIds.length > 0 ||
    provenances.length > 0

  const createCategory: FeatCategory =
    category === 'all' ? 'general' : category
  const createLabel = FEAT_CATEGORY_LABELS[createCategory]?.toLowerCase() ?? 'feito'

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl border border-border/90 bg-surface-1">
        <div className="border-b border-border/60 px-4 py-3">
          <div className="flex items-start gap-2">
            <Input
              ref={searchRef}
              className="flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nome, traço ou texto… (/)"
            />
            {mode === 'manage' && onCreateHomebrew && (
              <Button
                size="sm"
                variant="accent"
                className="shrink-0"
                onClick={() => onCreateHomebrew(createCategory)}
              >
                + {category === 'all' ? 'Criar feito' : `Criar feito ${createLabel}`}
              </Button>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {CATEGORY_TABS.map((tab) => (
              <TabButton
                key={tab.id}
                active={category === tab.id}
                onClick={() => setCategory(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
          <div className="mt-2 space-y-2">
            <MultiFilter
              label="Nível"
              options={FEAT_LEVEL_OPTIONS}
              selected={levels}
              onChange={setLevels}
              emptyLabel="Todos"
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <MultiFilter
                label="Raridade"
                options={RARITY_FILTER_OPTIONS}
                selected={rarities}
                onChange={setRarities}
                emptyLabel="Todas"
              />
              <MultiFilter
                label="Ações"
                options={ACTION_FILTER_OPTIONS.map((o) => ({
                  ...o,
                  icon:
                    o.value === 'passive' ? undefined : (
                      <ActionIcon type={o.value} />
                    ),
                }))}
                selected={actions}
                onChange={setActions}
                emptyLabel="Qualquer"
              />
            </div>
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
            <div className="grid gap-2 sm:grid-cols-2">
              <MultiSelectDropdown
                label="Traço"
                options={traitOptions}
                selected={traits}
                onChange={setTraits}
                emptyLabel="Todos"
              />
              {parentOptions.length > 0 && (
                <MultiSelectDropdown
                  label="Povo / classe / arquétipo"
                  options={parentOptions}
                  selected={parentIds}
                  onChange={setParentIds}
                  emptyLabel="Todos"
                />
              )}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[11px] text-text-dim">
              {filtered.length} de {catalog.length} feitos
            </p>
            {filtersOn && (
              <button
                type="button"
                className="text-[10px] text-text-dim hover:text-accent"
                onClick={() => {
                  setQuery('')
                  setCategory('all')
                  setLevels([])
                  setRarities([])
                  setActions([])
                  setTraits([])
                  setParentIds([])
                  setProvenances([])
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {grouped.map((group) => (
            <div key={group.level}>
              <div className="sticky top-0 border-b border-border/40 bg-surface-2/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-text-dim backdrop-blur-sm">
                Nível {group.level} · {group.feats.length}
              </div>
              <ul className="divide-y divide-border/50">
                {group.feats.map((feat) => {
                  const active = selected?.id === feat.id
                  const parentName = parentNameById.get(parentIdOf(feat) ?? '')
                  return (
                    <li key={feat.id}>
                      <button
                        type="button"
                        {...rowProps(feat.id)}
                        className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-text">
                            {feat.name}
                          </span>
                          {feat.actionType && feat.actionType !== 'passive' ? (
                            <ActionCost type={feat.actionType} />
                          ) : null}
                          {feat.provenance.type === 'homebrew' && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                          {feat.rarity !== 'common' && (
                            <RarityBadge rarity={feat.rarity} />
                          )}
                          {feat.isDedication && <Badge>Dedicação</Badge>}
                        </span>
                        <span className="text-[11px] text-text-dim">
                          {feat.originalName !== feat.name
                            ? feat.originalName
                            : ''}
                          {feat.originalName !== feat.name ? ' · ' : ''}
                          {FEAT_CATEGORY_LABELS[feat.category] ?? feat.category}
                          {parentName ? ` · ${parentName}` : ''}
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
              Nenhum feito neste filtro.
            </p>
          )}
        </div>
      </div>

      <Panel
        title={selected ? selected.name : 'Feito'}
        subtitle={
          selected
            ? `nv. ${selected.level} · ${FEAT_CATEGORY_LABELS[selected.category] ?? selected.category}`
            : undefined
        }
        className="flex min-h-0 w-full shrink-0 flex-col overflow-hidden lg:w-[26rem]"
        actions={
          mode === 'manage' && selected ? (
            <div className="flex flex-wrap gap-1.5">
              {onDuplicate && (
                <Button size="sm" onClick={() => onDuplicate(selected.id)}>
                  Duplicar como Homebrew
                </Button>
              )}
              {selected.provenance.type === 'homebrew' && onEditHomebrew && (
                <Button
                  size="sm"
                  variant="accent"
                  onClick={() => onEditHomebrew(selected.id)}
                >
                  Editar Homebrew
                </Button>
              )}
            </div>
          ) : undefined
        }
      >
        {selected ? (
          <div className="min-h-0 flex-1 overflow-y-auto">
            <FeatCatalogDetail
              feat={selected}
              sourceName={
                selected.sourceId
                  ? sourceMap[selected.sourceId]?.name
                  : undefined
              }
              parentName={parentNameById.get(parentIdOf(selected) ?? '')}
            />
          </div>
        ) : (
          <p className="px-1 py-6 text-center text-sm text-text-dim">
            Selecione um feito na lista.
          </p>
        )}
      </Panel>
    </div>
  )
}

function FeatCatalogDetail({
  feat,
  sourceName,
  parentName,
}: {
  feat: Feat
  sourceName?: string
  parentName?: string
}) {
  const prereqs = (feat.prerequisites ?? [])
    .filter(
      (pre) =>
        !(
          pre.kind === 'text' &&
          /^(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s*\+?-?\d+$/i.test(
            pre.label.trim(),
          )
        ),
    )
    .map(formatFeatPrerequisite)
    .filter(Boolean)
  const uniquePrereqs = [...new Set(prereqs)]

  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap gap-1">
        <RarityBadge rarity={feat.rarity} />
        <ProvenanceBadge type={feat.provenance.type} />
        <Badge>nv. {feat.level}</Badge>
        <Badge>{FEAT_CATEGORY_LABELS[feat.category] ?? feat.category}</Badge>
        {feat.isDedication && <Badge>Dedicação</Badge>}
        {feat.actionType && feat.actionType !== 'passive' && (
          <span className="inline-flex items-center rounded-md border border-border/70 bg-surface-2/60 px-1.5 py-0.5">
            <ActionCost type={feat.actionType} />
          </span>
        )}
        {feat.traits.map((t) => (
          <Badge key={t}>{localizeTraitLabel(t)}</Badge>
        ))}
      </div>
      <p className="text-[11px] text-text-dim">
        {feat.originalName && feat.originalName !== feat.name
          ? feat.originalName
          : null}
        {parentName
          ? `${feat.originalName && feat.originalName !== feat.name ? ' · ' : ''}${parentName}`
          : ''}
        {sourceName
          ? `${
              (feat.originalName && feat.originalName !== feat.name) || parentName
                ? ' · '
                : ''
            }${formatSourceLabel(sourceName, feat.sourcePage)}`
          : ''}
      </p>
      {descriptionLooksEnglish(feat.description) && (
        <p className="text-[10px] text-accent/80">
          Descrição ainda no original em inglês (tradução em andamento).
        </p>
      )}
      {uniquePrereqs.length > 0 && (
        <p className="text-[11px] text-text-dim">
          <span className="font-semibold text-text">Pré-requisitos:</span>{' '}
          {uniquePrereqs.join('; ')}
        </p>
      )}
      {feat.trigger && (
        <p className="text-[11px] text-text-muted">
          <span className="font-semibold text-text">Gatilho: </span>
          {cleanFeatMarkdownText(feat.trigger)}
        </p>
      )}
      {feat.frequency && (
        <p className="text-[11px] text-text-muted">
          <span className="font-semibold text-text">Frequência: </span>
          {cleanFeatMarkdownText(feat.frequency)}
        </p>
      )}
      <RichText
        as="p"
        className="whitespace-pre-wrap text-xs leading-relaxed text-text-muted"
      >
        {feat.description}
      </RichText>
    </div>
  )
}