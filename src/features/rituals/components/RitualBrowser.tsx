import { useMemo, useState } from 'react'
import type { ProvenanceType, Rarity, Ritual, SkillId } from '@/types'
import { isHomebrewRitual } from '@/types'
import { listLocalizedCatalogRituals } from '@/features/rituals/localizeRituals'
import { RitualDetailPanel } from '@/features/rituals/components/RitualFacts'
import { ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import {
  MultiFilter,
  MultiSelectDropdown,
  matchesSelected,
} from '@/components/ui/MultiFilter'
import { RARITY_FILTER_OPTIONS, SKILL_LABELS } from '@/utils/labels'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { useBrowseSelection } from '@/features/tabs/useBrowseSelection'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'

const RANK_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => ({
  value: String(rank),
  label: String(rank),
}))

interface RitualBrowserProps {
  rituals?: Ritual[]
  mode?: 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onCreateHomebrew?: () => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function RitualBrowser({
  rituals,
  mode = 'browse',
  previewId,
  onActiveChange,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: RitualBrowserProps) {
  const [query, setQuery] = useState('')
  const [ranks, setRanks] = useState<string[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [skillIds, setSkillIds] = useState<SkillId[]>([])
  const [traits, setTraits] = useState<string[]>([])
  const [provenances, setProvenances] = useState<ProvenanceType[]>([])
  const { activeId: selectedId, rowProps } = useBrowseSelection(
    previewId,
    onActiveChange,
    { toggle: false },
  )
  const searchRef = useSlashSearch()

  const catalog = useMemo(
    () =>
      (rituals ?? listLocalizedCatalogRituals()).sort(
        (a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'pt'),
      ),
    [rituals],
  )

  const skillOptions = useMemo(() => {
    const ids = new Set<SkillId>()
    for (const r of catalog) {
      for (const id of r.primaryCheckSkills ?? []) ids.add(id)
    }
    return [...ids]
      .sort((a, b) => SKILL_LABELS[a].localeCompare(SKILL_LABELS[b], 'pt'))
      .map((id) => ({ value: id, label: SKILL_LABELS[id] }))
  }, [catalog])

  const traitOptions = useMemo(() => {
    const counts = new Map<string, number>()
    for (const r of catalog) {
      for (const trait of r.traits) {
        counts.set(trait, (counts.get(trait) ?? 0) + 1)
      }
    }
    return [...counts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0], 'pt'))
      .map(([value, n]) => ({ value, label: `${value} (${n})` }))
  }, [catalog])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalog.filter((r) => {
      if (!matchesSelected(String(r.rank), ranks)) return false
      if (!matchesSelected(r.rarity, rarities)) return false
      if (
        skillIds.length > 0 &&
        !(r.primaryCheckSkills ?? []).some((id) => skillIds.includes(id))
      ) {
        return false
      }
      if (traits.length > 0 && !traits.some((t) => r.traits.includes(t))) {
        return false
      }
      if (
        provenances.length > 0 &&
        !provenances.includes(isHomebrewRitual(r) ? 'homebrew' : 'official')
      ) {
        return false
      }
      if (!q) return true
      return (
        r.name.toLowerCase().includes(q) ||
        r.originalName.toLowerCase().includes(q) ||
        (r.primaryCheck ?? '').toLowerCase().includes(q) ||
        (r.source ?? '').toLowerCase().includes(q)
      )
    })
  }, [catalog, query, ranks, rarities, skillIds, traits, provenances])

  const grouped = useMemo(() => {
    const map = new Map<number, Ritual[]>()
    for (const r of filtered) {
      const list = map.get(r.rank) ?? []
      list.push(r)
      map.set(r.rank, list)
    }
    return [...map.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([rank, list]) => ({ rank, rituals: list }))
  }, [filtered])

  const selected =
    catalog.find((r) => r.id === selectedId) ?? filtered[0] ?? null
  const filtersOn =
    query.trim() !== '' ||
    ranks.length > 0 ||
    rarities.length > 0 ||
    skillIds.length > 0 ||
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
              placeholder="Buscar nome, perícia ou fonte… (/)"
            />
            {mode === 'manage' && onCreateHomebrew && (
              <Button
                size="sm"
                variant="accent"
                className="shrink-0"
                onClick={onCreateHomebrew}
              >
                + Criar ritual
              </Button>
            )}
          </div>
          <div className="mt-2 space-y-2">
            <MultiFilter
              label="Posto"
              options={RANK_OPTIONS}
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
            {skillOptions.length > 0 && (
              <MultiFilter
                label="Perícia"
                options={skillOptions}
                selected={skillIds}
                onChange={setSkillIds}
                emptyLabel="Qualquer"
              />
            )}
            {traitOptions.length > 0 && (
              <MultiSelectDropdown
                label="Traço"
                options={traitOptions}
                selected={traits}
                onChange={setTraits}
                emptyLabel="Todos"
              />
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[11px] text-text-dim">
              {filtered.length} de {catalog.length} rituais
            </p>
            {filtersOn && (
              <button
                type="button"
                className="text-[10px] text-text-dim hover:text-accent"
                onClick={() => {
                  setQuery('')
                  setRanks([])
                  setRarities([])
                  setSkillIds([])
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
                Posto {group.rank} · {group.rituals.length}
              </div>
              <ul className="divide-y divide-border/50">
                {group.rituals.map((ritual) => {
                  const active = selected?.id === ritual.id
                  return (
                    <li key={ritual.id}>
                      <button
                        type="button"
                        {...rowProps(ritual.id)}
                        className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-text">
                            {ritual.name}
                          </span>
                          {isHomebrewRitual(ritual) && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                          {ritual.rarity !== 'common' && (
                            <RarityBadge rarity={ritual.rarity} />
                          )}
                        </span>
                        <span className="text-[11px] text-text-dim">
                          {ritual.originalName}
                          {ritual.primaryCheck
                            ? ` · ${ritual.primaryCheck}`
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
              Nenhum ritual neste filtro.
            </p>
          )}
        </div>
      </div>

      <RitualDetailPanel
        ritual={selected}
        actions={
          mode === 'manage' && selected ? (
            <div className="flex flex-wrap gap-1.5">
              {onDuplicate && (
                <Button size="sm" onClick={() => onDuplicate(selected.id)}>
                  Duplicar como Homebrew
                </Button>
              )}
              {isHomebrewRitual(selected) && onEditHomebrew && (
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
