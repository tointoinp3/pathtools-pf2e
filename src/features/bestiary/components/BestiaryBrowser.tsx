import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Creature, CreaturePowerVariant, CreatureSize, Rarity } from '@/types'
import { applyCreatureVariant, creatureVariantLabel, creatureVariantQuery } from '@/engine/creatureVariant'
import { listCreatures } from '@/engine/bestiaryCatalog'
import { CreatureStatBlock } from '@/features/bestiary/components/CreatureStatBlock'
import { CreatureVariantToggle } from '@/features/bestiary/components/CreatureVariantToggle'
import { formatCreatureLevel } from '@/features/bestiary/formatCreature'
import { Button } from '@/components/ui/Button'
import { ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { isHomebrewCreature } from '@/types/creature'
import { HomebrewJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { BatchSelectBar } from '@/features/backup/BatchSelectBar'
import { exportHomebrewByIds } from '@/features/backup/homebrewBackup'
import {
  MultiFilter,
  MultiSelectDropdown,
  matchesSelected,
} from '@/components/ui/MultiFilter'
import { Panel, Tip } from '@/components/ui/Panel'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import {
  RARITY_FILTER_OPTIONS,
  SIZE_FILTER_OPTIONS,
  SIZE_LABELS,
} from '@/utils/labels'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { catalogRowPointerProps } from '@/features/tabs/tabPointer'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function creatureHaystack(creature: Creature): string {
  return [
    creature.name,
    creature.originalName,
    creature.summary,
    creature.description ?? '',
    ...creature.traits,
    ...creature.traits.map(localizeTraitLabel),
    `nivel ${creature.level}`,
    creature.source,
  ].join(' ')
}

export function BestiaryBrowser({
  selectedId,
  onSelect,
  variant = 'normal',
  onVariantChange,
  creatures: creaturesProp,
  mode = 'browse',
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: {
  selectedId?: string
  onSelect?: (id: string, event?: TabPointerEvent) => void
  variant?: CreaturePowerVariant
  onVariantChange?: (next: CreaturePowerVariant) => void
  creatures?: Creature[]
  mode?: 'browse' | 'manage'
  onCreateHomebrew?: () => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}) {
  const catalog = useMemo(
    () => (creaturesProp ?? listCreatures()).slice(),
    [creaturesProp],
  )
  const searchRef = useSlashSearch()
  const [query, setQuery] = useState('')
  const [localId, setLocalId] = useState<string | null>(null)
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [sizes, setSizes] = useState<CreatureSize[]>([])
  const [traits, setTraits] = useState<string[]>([])
  const [levels, setLevels] = useState<string[]>([])
  const [sources, setSources] = useState<string[]>([])
  const [provenances, setProvenances] = useState<Array<'official' | 'homebrew'>>(
    [],
  )
  const [selectedHomebrew, setSelectedHomebrew] = useState<Set<string>>(
    () => new Set(),
  )
  const [exportBusy, setExportBusy] = useState(false)

  const traitOptions = useMemo(() => {
    const map = new Map<string, string>()
    for (const creature of catalog) {
      for (const trait of creature.traits) {
        if (!map.has(trait)) map.set(trait, localizeTraitLabel(trait))
      }
    }
    return [...map.entries()]
      .sort((a, b) => a[1].localeCompare(b[1], 'pt-BR'))
      .map(([value, label]) => ({ value, label }))
  }, [catalog])

  const levelOptions = useMemo(() => {
    const unique = [...new Set(catalog.map((creature) => creature.level))].sort(
      (a, b) => a - b,
    )
    return unique.map((level) => ({
      value: String(level),
      label: formatCreatureLevel(level),
    }))
  }, [catalog])

  const sourceOptions = useMemo(() => {
    const unique = [
      ...new Set(
        catalog
          .map((creature) => creature.source)
          .filter((source): source is string => Boolean(source)),
      ),
    ]
    return unique
      .sort((a, b) => a.localeCompare(b, 'pt-BR'))
      .map((value) => ({ value, label: value }))
  }, [catalog])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return catalog.filter((creature) => {
      if (!matchesSelected(creature.rarity, rarities)) return false
      if (!matchesSelected(creature.size, sizes)) return false
      if (
        traits.length > 0 &&
        !creature.traits.some((trait) => traits.includes(trait))
      ) {
        return false
      }
      if (levels.length > 0 && !levels.includes(String(creature.level))) {
        return false
      }
      if (!matchesSelected(creature.source, sources)) return false
      if (provenances.length === 1) {
        const wantHomebrew = provenances[0] === 'homebrew'
        if (isHomebrewCreature(creature) !== wantHomebrew) return false
      }
      if (q && !normalize(creatureHaystack(creature)).includes(q)) return false
      return true
    })
  }, [catalog, query, rarities, sizes, traits, levels, sources, provenances])

  const grouped = useMemo(() => {
    const map = new Map<number, Creature[]>()
    for (const creature of filtered) {
      const list = map.get(creature.level) ?? []
      list.push(creature)
      map.set(creature.level, list)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [filtered])

  const selected =
    catalog.find((creature) => creature.id === selectedId) ??
    catalog.find((creature) => creature.id === localId) ??
    filtered[0] ??
    catalog[0] ??
    null

  const displayed = selected ? applyCreatureVariant(selected, variant) : null
  const sessionQuery = creatureVariantQuery(variant)
  const sessionHref = selected
    ? sessionQuery
      ? `/bestiario/${selected.id}/sessao?v=${sessionQuery}`
      : `/bestiario/${selected.id}/sessao`
    : null

  function handleSelect(id: string, event?: TabPointerEvent) {
    if (event && (event.button === 1 || event.ctrlKey || event.metaKey)) {
      onSelect?.(id, event)
      return
    }
    setLocalId(id)
    onSelect?.(id, event)
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl border border-border/90 bg-surface-1">
        <div className="border-b border-border/60 px-4 py-3">
          <div className="flex items-start gap-2">
            <Input
              ref={searchRef}
              className="flex-1"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar nome, traço, fonte… (/)"
              aria-label="Buscar criaturas"
            />
            {mode === 'manage' && onCreateHomebrew && (
              <Button
                size="sm"
                variant="accent"
                className="shrink-0"
                onClick={onCreateHomebrew}
              >
                + Criar criatura
              </Button>
            )}
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <MultiSelectDropdown
              label="Fonte"
              options={sourceOptions}
              selected={sources}
              onChange={setSources}
              emptyLabel="Todas"
            />
            <MultiSelectDropdown
              label="Traço"
              options={traitOptions}
              selected={traits}
              onChange={setTraits}
              emptyLabel="Todos"
            />
            <MultiSelectDropdown
              label="Nível"
              options={levelOptions}
              selected={levels}
              onChange={setLevels}
              emptyLabel="Todos"
            />
          </div>
          <div className="mt-2 space-y-2">
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
                label="Origem"
                options={[
                  { value: 'official', label: 'Oficial' },
                  { value: 'homebrew', label: 'Homebrew' },
                ]}
                selected={provenances}
                onChange={setProvenances}
                emptyLabel="Oficiais + Homebrew"
              />
            )}
          </div>
          <FilterCount
            className="mt-2"
            shown={filtered.length}
            total={catalog.length}
          />
          {mode === 'manage' && (
            <div className="mt-2 space-y-2">
              <HomebrewJsonButtons kind="creatures" />
              <BatchSelectBar
                selectedCount={selectedHomebrew.size}
                totalCount={filtered.filter(isHomebrewCreature).length}
                nounOne="criatura"
                nounMany="criaturas"
                onSelectAll={() =>
                  setSelectedHomebrew(
                    new Set(
                      filtered.filter(isHomebrewCreature).map((c) => c.id),
                    ),
                  )
                }
                onClear={() => setSelectedHomebrew(new Set())}
                exportBusy={exportBusy}
                onExport={() => {
                  setExportBusy(true)
                  void exportHomebrewByIds([...selectedHomebrew]).finally(() =>
                    setExportBusy(false),
                  )
                }}
              />
            </div>
          )}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {grouped.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-text-dim">
              Nenhuma criatura encontrada.
            </p>
          ) : (
            grouped.map(([level, list]) => (
              <div key={level}>
                <div className="sticky top-0 border-b border-border/40 bg-surface-2/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-text-dim backdrop-blur-sm">
                  Nível {formatCreatureLevel(level)} · {list.length}
                </div>
                <ul className="divide-y divide-border/50">
                  {list.map((creature) => {
                    const active = selected?.id === creature.id
                    return (
                      <li key={creature.id}>
                        <button
                          type="button"
                          {...catalogRowPointerProps((event) =>
                            handleSelect(creature.id, event),
                          )}
                          className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${
                            active
                              ? 'bg-accent/15 text-accent'
                              : 'hover:bg-surface-2'
                          }`}
                        >
                          <span className="flex flex-wrap items-center gap-2">
                            {mode === 'manage' && isHomebrewCreature(creature) && (
                              <input
                                type="checkbox"
                                className="accent-accent"
                                checked={selectedHomebrew.has(creature.id)}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  setSelectedHomebrew((prev) => {
                                    const next = new Set(prev)
                                    if (e.target.checked) next.add(creature.id)
                                    else next.delete(creature.id)
                                    return next
                                  })
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                            )}
                            <span className="font-medium text-text">
                              {creature.name}
                            </span>
                            {isHomebrewCreature(creature) && (
                              <ProvenanceBadge type="homebrew" />
                            )}
                            {creature.rarity !== 'common' && (
                              <RarityBadge rarity={creature.rarity} />
                            )}
                          </span>
                          <span className="text-[11px] text-text-dim">
                            {creature.originalName} ·{' '}
                            {SIZE_LABELS[creature.size]} · {creature.source}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto lg:max-w-[52%]">
        {displayed && selected ? (
          <Panel
            title={displayed.name}
            subtitle={`Criatura ${formatCreatureLevel(displayed.level)}${
              variant === 'normal'
                ? ''
                : ` · ${creatureVariantLabel(variant)}`
            }`}
            actions={
              <div className="flex flex-wrap items-center justify-end gap-2">
                {onVariantChange ? (
                  <CreatureVariantToggle
                    value={variant}
                    onChange={onVariantChange}
                  />
                ) : null}
                {sessionHref ? (
                  <Link to={sessionHref}>
                    <Button size="sm">Ficha de sessão</Button>
                  </Link>
                ) : null}
                {mode === 'manage' && onDuplicate && selected ? (
                  <Button size="sm" onClick={() => onDuplicate(selected.id)}>
                    Duplicar como Homebrew
                  </Button>
                ) : null}
                {mode === 'manage' &&
                selected &&
                isHomebrewCreature(selected) &&
                onEditHomebrew ? (
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() => onEditHomebrew(selected.id)}
                  >
                    Editar Homebrew
                  </Button>
                ) : null}
              </div>
            }
          >
            <CreatureStatBlock creature={displayed} />
          </Panel>
        ) : (
          <Tip>O catálogo ainda está vazio.</Tip>
        )}
      </div>
    </div>
  )
}
