import { useMemo, useState } from 'react'
import type { ProvenanceType, Rarity, Spell, SpellTradition } from '@/types'
import { isHomebrewSpell } from '@/types'
import { listLocalizedCatalogSpells } from '@/features/spells/localizeSpells'
import { SpellDetailPanel } from '@/features/spells/components/SpellFacts'
import {
  SPELL_ACTION_FILTER_OPTIONS,
  SPELL_KIND_TABS,
  SPELL_RANK_FILTER_OPTIONS,
  spellKind,
  spellKindLabel,
  spellMatchesQuery,
  spellRankLabel,
  type SpellKind,
} from '@/features/spells/spellUi'
import type { SpellCreateKind } from '@/features/spells/homebrewDefaults'
import { ActionCost, ActionIcon } from '@/components/ui/ActionIcon'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import {
  MultiFilter,
  MultiSelectDropdown,
  matchesSelected,
} from '@/components/ui/MultiFilter'
import {
  RARITY_FILTER_OPTIONS,
  TRADITION_FILTER_OPTIONS,
  TRADITION_LABELS,
} from '@/utils/labels'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { useBrowseSelection } from '@/features/tabs/useBrowseSelection'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'

type KindTab = SpellKind | 'all'

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

interface SpellBrowserProps {
  spells?: Spell[]
  mode?: 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onCreateHomebrew?: (kind: SpellCreateKind) => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function SpellBrowser({
  spells,
  mode = 'browse',
  previewId,
  onActiveChange,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: SpellBrowserProps) {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<KindTab>('all')
  const [ranks, setRanks] = useState<string[]>([])
  const [traditions, setTraditions] = useState<SpellTradition[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [actions, setActions] = useState<string[]>([])
  const [traits, setTraits] = useState<string[]>([])
  const [provenances, setProvenances] = useState<ProvenanceType[]>([])
  const { activeId: selectedId, rowProps } = useBrowseSelection(
    previewId,
    onActiveChange,
    { toggle: false },
  )
  const searchRef = useSlashSearch()

  const catalog = useMemo(
    () => spells ?? listLocalizedCatalogSpells(),
    [spells],
  )

  const createKind: SpellCreateKind =
    kind === 'cantrip' || kind === 'focus' ? kind : 'spell'

  const traitOptions = useMemo(() => {
    const counts = new Map<string, number>()
    for (const sp of catalog) {
      for (const trait of sp.traits) {
        counts.set(trait, (counts.get(trait) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], 'pt'))
      .map(([value, n]) => ({
        value,
        label: `${value} (${n})`,
      }))
  }, [catalog])

  const filtered = useMemo(() => {
    return catalog.filter((sp) => {
      if (kind !== 'all' && spellKind(sp) !== kind) return false
      if (!matchesSelected(String(sp.rank), ranks)) return false
      if (
        traditions.length > 0 &&
        !sp.traditions.some((t) => traditions.includes(t))
      ) {
        return false
      }
      if (!matchesSelected(sp.rarity, rarities)) return false
      if (actions.length > 0) {
        if (!sp.actionType || !actions.includes(sp.actionType)) return false
      }
      if (traits.length > 0 && !traits.some((t) => sp.traits.includes(t))) {
        return false
      }
      if (
        provenances.length > 0 &&
        !provenances.includes(isHomebrewSpell(sp) ? 'homebrew' : 'official')
      ) {
        return false
      }
      return spellMatchesQuery(sp, query)
    })
  }, [
    catalog,
    kind,
    ranks,
    traditions,
    rarities,
    actions,
    traits,
    provenances,
    query,
  ])

  const grouped = useMemo(() => {
    const map = new Map<number, Spell[]>()
    for (const sp of filtered) {
      const list = map.get(sp.rank) ?? []
      list.push(sp)
      map.set(sp.rank, list)
    }
    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([rank, list]) => ({
        rank,
        spells: list.sort((a, b) => a.name.localeCompare(b.name, 'pt')),
      }))
  }, [filtered])

  const selected =
    catalog.find((s) => s.id === selectedId) ?? filtered[0] ?? null
  const filtersOn =
    query.trim() !== '' ||
    kind !== 'all' ||
    ranks.length > 0 ||
    traditions.length > 0 ||
    rarities.length > 0 ||
    actions.length > 0 ||
    traits.length > 0 ||
    provenances.length > 0

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
              placeholder="Buscar nome, traço ou resumo… (/)"
            />
            {mode === 'manage' && onCreateHomebrew && (
              <Button
                size="sm"
                variant="accent"
                className="shrink-0"
                onClick={() => onCreateHomebrew(createKind)}
              >
                + Criar {spellKindLabel(createKind).toLowerCase()}
              </Button>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SPELL_KIND_TABS.map((tab) => (
              <TabButton
                key={tab.id}
                active={kind === tab.id}
                onClick={() => setKind(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
          <div className="mt-2 space-y-2">
            <MultiFilter
              label="Posto"
              options={SPELL_RANK_FILTER_OPTIONS}
              selected={ranks}
              onChange={setRanks}
              emptyLabel="Todos"
            />
            <MultiFilter
              label="Tradição"
              options={TRADITION_FILTER_OPTIONS}
              selected={traditions}
              onChange={setTraditions}
              emptyLabel="Todas"
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
                options={SPELL_ACTION_FILTER_OPTIONS.map((o) => ({
                  ...o,
                  icon: <ActionIcon type={o.value} />,
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
            <MultiSelectDropdown
              label="Traço"
              options={traitOptions}
              selected={traits}
              onChange={setTraits}
              emptyLabel="Todos"
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[11px] text-text-dim">
              {filtered.length} de {catalog.length} magias
            </p>
            {filtersOn && (
              <button
                type="button"
                className="text-[10px] text-text-dim hover:text-accent"
                onClick={() => {
                  setQuery('')
                  setKind('all')
                  setRanks([])
                  setTraditions([])
                  setRarities([])
                  setActions([])
                  setTraits([])
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
            <div key={group.rank}>
              <div className="sticky top-0 border-b border-border/40 bg-surface-2/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-text-dim backdrop-blur-sm">
                {spellRankLabel(group.rank)} · {group.spells.length}
              </div>
              <ul className="divide-y divide-border/50">
                {group.spells.map((sp) => {
                  const active = selected?.id === sp.id
                  return (
                    <li key={sp.id}>
                      <button
                        type="button"
                        {...rowProps(sp.id)}
                        className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-text">{sp.name}</span>
                          {sp.actionType ? (
                            <ActionCost type={sp.actionType} />
                          ) : null}
                          {sp.focus && (
                            <Badge tone="accent">Foco</Badge>
                          )}
                          {isHomebrewSpell(sp) && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                          {sp.rarity !== 'common' && (
                            <RarityBadge rarity={sp.rarity} />
                          )}
                        </span>
                        <span className="text-[11px] text-text-dim">
                          {sp.originalName}
                          {sp.traditions.length > 0
                            ? ` · ${sp.traditions
                                .map((t) => TRADITION_LABELS[t])
                                .join(', ')}`
                            : ''}
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
          mode === 'manage' && selected ? (
            <div className="flex flex-wrap gap-1.5">
              {onDuplicate && (
                <Button size="sm" onClick={() => onDuplicate(selected.id)}>
                  Duplicar como Homebrew
                </Button>
              )}
              {isHomebrewSpell(selected) && onEditHomebrew && (
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
      />
    </div>
  )
}
