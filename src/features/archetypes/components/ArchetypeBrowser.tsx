import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Archetype, ContentSource, Feat, Rarity } from '@/types'
import {
  ARCHETYPE_GROUP_LABELS,
  ARCHETYPE_KIND_LABELS,
  archetypeUiGroup,
} from '@/types'
import { sortArchetypes } from '@/engine'
import { formatSourceLabel, RARITY_FILTER_OPTIONS } from '@/utils/labels'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { FeatExpandRow } from '@/features/feats/components/FeatExpandRow'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { useBrowseSelection } from '@/features/tabs/useBrowseSelection'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'

const GROUP_FILTERS: Array<'all' | 'multiclass' | 'other'> = [
  'all',
  'multiclass',
  'other',
]

function ChoiceChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
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

interface ArchetypeBrowserProps {
  archetypes: Archetype[]
  feats?: Feat[]
  sources?: ContentSource[]
  mode?: 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onCreateHomebrew?: () => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function ArchetypeBrowser({
  archetypes,
  feats = [],
  sources = [],
  mode = 'browse',
  previewId,
  onActiveChange,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: ArchetypeBrowserProps) {
  const [search, setSearch] = useState('')
  const [kindFilter, setKindFilter] = useState<'all' | 'multiclass' | 'other'>(
    'all',
  )
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [provenances, setProvenances] = useState<Array<'official' | 'homebrew'>>(
    [],
  )
  const { activeId, rowProps } = useBrowseSelection(previewId, onActiveChange)
  const [openFeatId, setOpenFeatId] = useState<string | null>(null)

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )
  const featsById = useMemo(
    () => new Map(feats.map((f) => [f.id, f])),
    [feats],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return sortArchetypes(
      archetypes.filter((a) => {
        if (kindFilter !== 'all' && archetypeUiGroup(a.kind) !== kindFilter) {
          return false
        }
        if (!matchesSelected(a.rarity, rarities)) return false
        if (!matchesSelected(a.provenance.type, provenances)) return false
        if (!q) return true
        return (
          a.name.toLowerCase().includes(q) ||
          a.originalName.toLowerCase().includes(q) ||
          a.traits.some((t) => t.toLowerCase().includes(q))
        )
      }),
    )
  }, [archetypes, kindFilter, rarities, provenances, search])

  const grouped = useMemo(() => {
    const multiclass = filtered.filter((a) => a.kind === 'multiclass')
    const other = filtered.filter((a) => a.kind !== 'multiclass')
    return [
      { id: 'multiclass' as const, items: multiclass },
      { id: 'other' as const, items: other },
    ].filter((g) => g.items.length > 0)
  }, [filtered])

  const active = archetypes.find((a) => a.id === activeId) ?? null

  const dedication = active
    ? featsById.get(active.dedicationFeatId)
    : undefined
  const extraFeats = active
    ? (() => {
        const fromIds = active.featIds
          .map((id) => featsById.get(id))
          .filter((f): f is Feat => Boolean(f))
        const fromLink = feats.filter(
          (f) =>
            f.archetypeId === active.id &&
            f.id !== active.dedicationFeatId &&
            !f.isDedication,
        )
        const map = new Map<string, Feat>()
        for (const f of [...fromIds, ...fromLink]) map.set(f.id, f)
        return [...map.values()].sort(
          (a, b) =>
            a.level - b.level || a.name.localeCompare(b.name, 'pt-BR'),
        )
      })()
    : []

  useEffect(() => {
    setOpenFeatId(active?.dedicationFeatId ?? null)
  }, [active?.id, active?.dedicationFeatId])

  function toggleFeat(featId: string) {
    setOpenFeatId((id) => (id === featId ? null : featId))
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col gap-2 lg:w-72">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-text">Arquétipos</h2>
            <div className="text-[11px] text-text-dim">
              {filtered.length} de {archetypes.length}
            </div>
          </div>
          {mode === 'manage' && onCreateHomebrew && (
            <Button size="sm" variant="accent" onClick={onCreateHomebrew}>
              + Criar
            </Button>
          )}
        </div>
        <Input
          placeholder="Buscar arquétipos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-1">
          {GROUP_FILTERS.map((kind) => (
            <ChoiceChip
              key={kind}
              selected={kindFilter === kind}
              onClick={() => setKindFilter(kind)}
            >
              {kind === 'all' ? 'Todos' : ARCHETYPE_GROUP_LABELS[kind]}
            </ChoiceChip>
          ))}
        </div>
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
        <Panel
          quiet
          compact
          title="Catálogo"
          actions={
            <span className="text-[10px] text-text-dim">
              {filtered.length}/{archetypes.length}
            </span>
          }
        >
          {filtered.length === 0 ? (
            <p className="px-1 py-6 text-center text-xs text-text-dim">
              {archetypes.length === 0
                ? 'Nenhum arquétipo cadastrado ainda.'
                : 'Nada combina com a busca.'}
            </p>
          ) : (
            <ul className="max-h-[50vh] space-y-3 overflow-y-auto lg:max-h-[calc(100vh-16rem)]">
              {grouped.map((group) => (
                <li key={group.id}>
                  <div className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-wide text-accent">
                    {ARCHETYPE_GROUP_LABELS[group.id]}
                  </div>
                  <ul className="space-y-1">
                    {group.items.map((arch) => {
                      const selected = arch.id === active?.id
                      return (
                        <li key={arch.id}>
                          <button
                            type="button"
                            {...rowProps(arch.id)}
                            className={`w-full rounded-lg border px-2.5 py-2 text-left transition-colors ${
                              selected
                                ? 'border-accent bg-accent/15'
                                : 'border-border/70 bg-surface-2/40 hover:border-border-strong'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-sm font-medium text-text">
                                {arch.name}
                              </div>
                              {arch.provenance.type === 'homebrew' && (
                                <ProvenanceBadge type="homebrew" />
                              )}
                            </div>
                            <div className="mt-0.5 text-[10px] text-text-dim">
                              {ARCHETYPE_KIND_LABELS[arch.kind]}
                              {arch.originalName &&
                              arch.originalName !== arch.name
                                ? ` · ${arch.originalName}`
                                : ''}
                            </div>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </aside>

      <div className="min-h-0 min-w-0 flex-1">
        {!active ? (
          <Panel title="Arquétipos" quiet>
            <p className="text-sm text-text-muted">
              Arquétipos são pacotes de feitos com uma Dedicação na entrada.
              Na ficha, a Dedicação e os feitos seguintes ocupam{' '}
              <strong className="text-text">slots de classe</strong> — não há
              um slot extra.
            </p>
            {mode === 'manage' && (
              <Tip>
                Nada homebrew vem pronto. Crie do zero ou duplique uma Dedicação
                oficial (Guerreiro, Mago, um arquétipo geral).
              </Tip>
            )}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Tip>
                Depois da Dedicação, pegue 2 feitos daquele arquétipo antes de
                outra Dedicação (salvo exceções no próprio feito).
              </Tip>
              <Tip>
                Multiclasse: você não pega a Dedicação da classe que já é.
                Alguns feitos também cabem em slot de perícia.
              </Tip>
            </div>
            {archetypes.length === 0 && (
              <p className="mt-3 text-xs text-text-dim">
                O catálogo oficial ainda está vazio. Quando um arquétipo for
                adicionado, aparece aqui com Dedicação, feitos e fonte Remaster.
              </p>
            )}
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
            subtitle={ARCHETYPE_KIND_LABELS[active.kind]}
          >
            <div className="space-y-3 text-sm">
              <div className="flex flex-wrap gap-1">
                <RarityBadge rarity={active.rarity} />
                <ProvenanceBadge type={active.provenance.type} />
                <Badge>{ARCHETYPE_KIND_LABELS[active.kind]}</Badge>
                {active.allowsSkillFeatSlots && (
                  <Badge>Também em slot de perícia</Badge>
                )}
              </div>
              {active.originalName && active.originalName !== active.name && (
                <p className="text-[11px] text-text-dim">{active.originalName}</p>
              )}
              {active.sourceId && (
                <p className="text-[11px] text-text-dim">
                  {formatSourceLabel(
                    sourceMap[active.sourceId]?.name,
                    active.sourcePage,
                  )}
                </p>
              )}
              <RichText
                as="p"
                className="whitespace-pre-wrap text-[13px] leading-relaxed text-text-muted"
              >
                {polishRulesText(active.description)}
              </RichText>
              <div>
                <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  Dedicação
                </h3>
                {dedication ? (
                  <ul className="space-y-1">
                    <li>
                    <FeatExpandRow
                      feat={dedication}
                      open={openFeatId === dedication.id}
                      onToggle={() => toggleFeat(dedication.id)}
                      featCatalog={feats}
                    />
                    </li>
                  </ul>
                ) : (
                  <p className="text-xs text-text-dim">
                    Feito ainda não ligado no catálogo de feitos.
                  </p>
                )}
              </div>
              <div>
                <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-accent">
                  Feitos do arquétipo
                </h3>
                {extraFeats.length === 0 ? (
                  <p className="text-xs text-text-dim">
                    {active.featIds.length === 0
                      ? 'Nenhum feito extra listado.'
                      : `${active.featIds.length} feito(s) ainda não encontrados no catálogo.`}
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {extraFeats.map((feat) => (
                      <li key={feat.id}>
                        <FeatExpandRow
                          feat={feat}
                          open={openFeatId === feat.id}
                          onToggle={() => toggleFeat(feat.id)}
                          featCatalog={feats}
                        />
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-2 text-[10px] text-text-dim">
                  {mode === 'manage'
                    ? 'Crie do zero ou duplique uma oficial. Na ficha, a Dedicação entra num slot de classe.'
                    : 'Consulta apenas — a escolha fica na aba Feitos da ficha (slot de classe).'}
                </p>
              </div>
            </div>
          </Panel>
          </div>
        )}
      </div>
    </div>
  )
}
