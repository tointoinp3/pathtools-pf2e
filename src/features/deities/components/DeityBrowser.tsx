import { useEffect, useMemo, useState } from 'react'
import type {
  AttributeId,
  Deity,
  DeityKind,
  ProvenanceType,
  Rarity,
  SkillId,
} from '@/types'
import { SKILL_IDS, isHomebrewDeity } from '@/types'
import { listDeities } from '@/engine/deityCatalog'
import { catalogDomains } from '@/data/seeds/domains'
import {
  DIVINE_FONT_LABELS,
  SANCTIFICATION_LABELS,
} from '@/engine/deity'
import {
  DEITY_KIND_LABELS,
  deitySearchHaystack,
  localizeDeityCategory,
  localizeDeityWeapon,
  localizeDomainName,
  withLocalizedDeity,
} from '@/features/deities/localizeDeities'
import { DeityFacts } from '@/features/deities/components/DeityFacts'
import {
  ATTRIBUTE_LABELS,
  RARITY_FILTER_OPTIONS,
  SKILL_LABELS,
} from '@/utils/labels'
import { ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import {
  MultiFilter,
  MultiSelectDropdown,
  matchesSelected,
} from '@/components/ui/MultiFilter'
import { Panel, Tip } from '@/components/ui/Panel'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { catalogRowPointerProps } from '@/features/tabs/tabPointer'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'

const KINDS: DeityKind[] = ['deity', 'pantheon', 'philosophy', 'covenant']
const FONT_FILTERS = ['heal', 'harm'] as const
const SANCT_FILTERS = ['holy', 'unholy', 'none'] as const
const ATTR_IDS = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const satisfies AttributeId[]

interface DeityBrowserProps {
  deities?: Deity[]
  mode?: 'select' | 'browse' | 'manage'
  selectedId?: string | null
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onConfirm?: (deityId: string) => void
  onClear?: () => void
  onCreateHomebrew?: (kind: DeityKind) => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function DeityBrowser({
  deities: deitiesProp,
  mode = 'browse',
  selectedId,
  previewId,
  onActiveChange,
  onConfirm,
  onClear,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: DeityBrowserProps) {
  const [query, setQuery] = useState('')
  const [kinds, setKinds] = useState<DeityKind[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [fonts, setFonts] = useState<string[]>([])
  const [sancts, setSancts] = useState<string[]>([])
  const [skills, setSkills] = useState<SkillId[]>([])
  const [attrs, setAttrs] = useState<AttributeId[]>([])
  const [domains, setDomains] = useState<string[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [provenances, setProvenances] = useState<ProvenanceType[]>([])
  const [activeId, setActiveId] = useState<string | null>(
    previewId ?? selectedId ?? null,
  )
  const searchRef = useSlashSearch()

  useEffect(() => {
    if (previewId !== undefined) setActiveId(previewId)
  }, [previewId])

  const catalog = useMemo(
    () => (deitiesProp ?? listDeities()).map(withLocalizedDeity),
    [deitiesProp],
  )

  const createKind: DeityKind =
    kinds.length === 1 ? kinds[0]! : 'deity'

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>()
    for (const d of catalog) {
      counts.set(d.category, (counts.get(d.category) ?? 0) + 1)
    }
    return [...counts.entries()]
      .sort((a, b) =>
        localizeDeityCategory(a[0]).localeCompare(
          localizeDeityCategory(b[0]),
          'pt',
        ),
      )
      .map(([value, n]) => ({
        value,
        label: `${localizeDeityCategory(value)} (${n})`,
      }))
  }, [catalog])

  const domainOptions = useMemo(
    () =>
      catalogDomains
        .slice()
        .sort((a, b) =>
          localizeDomainName(a.originalName).localeCompare(
            localizeDomainName(b.originalName),
            'pt',
          ),
        )
        .map((d) => ({
          value: d.originalName,
          label: localizeDomainName(d.originalName),
        })),
    [],
  )

  const skillOptions = useMemo(
    () =>
      SKILL_IDS.map((id) => ({
        value: id,
        label: SKILL_LABELS[id],
      })),
    [],
  )

  const attrOptions = ATTR_IDS.map((id) => ({
    value: id,
    label: ATTRIBUTE_LABELS[id],
  }))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalog.filter((d) => {
      if (!matchesSelected(d.kind, kinds)) return false
      if (!matchesSelected(d.category, categories)) return false
      if (!matchesSelected(d.rarity, rarities)) return false
      if (skills.length > 0 && (!d.skillId || !skills.includes(d.skillId))) {
        return false
      }
      if (attrs.length > 0 && !d.attributes.some((a) => attrs.includes(a))) {
        return false
      }
      if (domains.length > 0 && !d.domains.some((name) => domains.includes(name))) {
        return false
      }
      if (fonts.length > 0) {
        const offers = fonts.some((f) => d.font.includes(f as 'heal' | 'harm'))
        if (!offers) return false
      }
      if (sancts.length > 0) {
        const none = d.sanctification.length === 0
        const ok = sancts.some((s) =>
          s === 'none' ? none : d.sanctification.includes(s as 'holy' | 'unholy'),
        )
        if (!ok) return false
      }
      if (
        provenances.length > 0 &&
        !provenances.includes(isHomebrewDeity(d) ? 'homebrew' : 'official')
      ) {
        return false
      }
      if (q && !deitySearchHaystack(d).includes(q)) return false
      return true
    })
  }, [
    catalog,
    query,
    kinds,
    categories,
    rarities,
    skills,
    attrs,
    domains,
    fonts,
    sancts,
    provenances,
  ])

  const grouped = useMemo(() => {
    const map = new Map<string, Deity[]>()
    for (const d of filtered) {
      const list = map.get(d.category) ?? []
      list.push(d)
      map.set(d.category, list)
    }
    return [...map.entries()].sort((a, b) =>
      localizeDeityCategory(a[0]).localeCompare(localizeDeityCategory(b[0]), 'pt'),
    )
  }, [filtered])

  const selected =
    catalog.find((d) => d.id === activeId) ??
    catalog.find((d) => d.id === selectedId) ??
    filtered[0] ??
    null

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
              placeholder="Buscar nome, epíteto, domínio, arma, panteão… (/)"
            />
            {mode === 'manage' && onCreateHomebrew && (
              <Button
                size="sm"
                variant="accent"
                className="shrink-0"
                onClick={() => onCreateHomebrew(createKind)}
              >
                + Criar {DEITY_KIND_LABELS[createKind].toLowerCase()}
              </Button>
            )}
          </div>
          <div className="mt-2 space-y-2">
            <MultiFilter
              label="Tipo"
              options={KINDS.map((k) => ({
                value: k,
                label: DEITY_KIND_LABELS[k],
              }))}
              selected={kinds}
              onChange={setKinds}
              emptyLabel="Todos"
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <MultiSelectDropdown
                label="Categoria"
                options={categoryOptions}
                selected={categories}
                onChange={setCategories}
                emptyLabel="Todas"
              />
              <MultiSelectDropdown
                label="Domínio"
                options={domainOptions}
                selected={domains}
                onChange={setDomains}
                emptyLabel="Todos"
              />
              <MultiSelectDropdown
                label="Perícia"
                options={skillOptions}
                selected={skills}
                onChange={setSkills}
                emptyLabel="Qualquer"
              />
              <MultiSelectDropdown
                label="Atributo"
                options={attrOptions}
                selected={attrs}
                onChange={setAttrs}
                emptyLabel="Qualquer"
              />
            </div>
            <MultiFilter
              label="Fonte divina"
              options={FONT_FILTERS.map((f) => ({
                value: f,
                label: DIVINE_FONT_LABELS[f],
              }))}
              selected={fonts}
              onChange={setFonts}
              emptyLabel="Qualquer"
            />
            <MultiFilter
              label="Santificação"
              options={SANCT_FILTERS.map((s) => ({
                value: s,
                label: SANCTIFICATION_LABELS[s],
              }))}
              selected={sancts}
              onChange={setSancts}
              emptyLabel="Qualquer"
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
          <p className="mt-2 text-[11px] text-text-dim">
            {filtered.length} de {catalog.length} entradas
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {grouped.map(([category, list]) => (
            <div key={category}>
              <div className="sticky top-0 border-b border-border/40 bg-surface-2/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-text-dim backdrop-blur-sm">
                {localizeDeityCategory(category)} · {list.length}
              </div>
              <ul className="divide-y divide-border/50">
                {list.map((deity) => {
                  const active = selected?.id === deity.id
                  const current = selectedId === deity.id
                  return (
                    <li key={deity.id}>
                      <button
                        type="button"
                        {...catalogRowPointerProps((event) => {
                          if (
                            event.button === 1 ||
                            event.ctrlKey ||
                            event.metaKey
                          ) {
                            onActiveChange?.(deity.id, event)
                            return
                          }
                          setActiveId(deity.id)
                          onActiveChange?.(deity.id, event)
                        })}
                        className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${
                          active
                            ? 'bg-accent/15 text-accent'
                            : 'hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="font-medium text-text">
                            {deity.name}
                          </span>
                          {current && (
                            <span className="rounded-full border border-accent/40 bg-accent/15 px-1.5 py-0.5 text-[10px] text-accent">
                              Na ficha
                            </span>
                          )}
                          {isHomebrewDeity(deity) && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                          {deity.rarity !== 'common' && (
                            <RarityBadge rarity={deity.rarity} />
                          )}
                        </span>
                        <span className="text-[11px] text-text-dim">
                          {deity.epithet ? `${deity.epithet} · ` : ''}
                          {deity.favoredWeapons[0]
                            ? localizeDeityWeapon(deity.favoredWeapons[0])
                            : DEITY_KIND_LABELS[deity.kind]}
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
              Nenhuma divindade neste filtro.
            </p>
          )}
        </div>
      </div>

      <Panel
        title={selected ? selected.name : 'Divindade'}
        subtitle={selected?.epithet}
        className="flex min-h-0 w-full shrink-0 flex-col lg:w-[28rem]"
        actions={
          mode === 'select' && selected ? (
            <div className="flex gap-1.5">
              {selectedId === selected.id && onClear && (
                <Button size="sm" variant="danger" onClick={onClear}>
                  Remover
                </Button>
              )}
              <Button
                size="sm"
                variant="accent"
                disabled={!onConfirm}
                onClick={() => onConfirm?.(selected.id)}
              >
                {selectedId === selected.id ? 'Manter' : 'Escolher'}
              </Button>
            </div>
          ) : mode === 'manage' && selected ? (
            <div className="flex flex-wrap gap-1.5">
              {onDuplicate && (
                <Button size="sm" onClick={() => onDuplicate(selected.id)}>
                  Duplicar como Homebrew
                </Button>
              )}
              {isHomebrewDeity(selected) && onEditHomebrew && (
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
          <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
            {mode === 'browse' && (
              <div className="mb-3">
                <Tip>
                  Compêndio: só consulta. Para servir uma divindade, abra a aba
                  Divindade na ficha (clérigo e campeão precisam; qualquer
                  personagem pode venerar).
                </Tip>
              </div>
            )}
            <DeityFacts deity={selected} />
          </div>
        ) : (
          <p className="px-3 py-8 text-center text-sm text-text-dim">
            Escolha uma entrada à esquerda.
          </p>
        )}
      </Panel>
    </div>
  )
}
