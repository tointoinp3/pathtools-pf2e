import { useMemo, useState, type ReactNode } from 'react'
import type { Ancestry, ContentSource, Feat, Heritage, Rarity } from '@/types'
import {
  additionalSpeedBreakdown,
  isVersatileHeritage,
  resolveResistanceValue,
} from '@/engine'
import { formatSourceLabel, RARITY_FILTER_OPTIONS } from '@/utils/labels'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, Tip, StatBox } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import { RelatedFeatsPanel } from '@/features/feats/components/RelatedFeatsPanel'
import { DefenseRulesCard } from '@/features/defenses/components/DefenseRulesCard'
import { SenseRulesCard } from '@/features/senses/components/SenseRulesCard'
import { useBrowseSelection } from '@/features/tabs/useBrowseSelection'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'

type FamilyId = 'homebrew' | 'mixed' | 'scion' | 'geniekin' | 'beast'

const FAMILIES: Array<{ id: FamilyId; label: string; hint: string }> = [
  { id: 'homebrew', label: 'Homebrew', hint: 'Criadas nesta mesa' },
  { id: 'mixed', label: 'Mestiçagem', hint: 'Aiuvarin, Dromaar, Hungerseed' },
  { id: 'scion', label: 'Ciontes', hint: 'Nephilim, dragonblood, changeling…' },
  { id: 'geniekin', label: 'Geniekin', hint: 'Ifrit, oread, ardande, talos…' },
  { id: 'beast', label: 'Fera', hint: 'Beastkin' },
]

function familyOf(heritage: Heritage): FamilyId {
  if (heritage.provenance.type === 'homebrew') return 'homebrew'
  if (heritage.traits?.includes('Geniekin')) return 'geniekin'
  if (
    heritage.id === 'heritage-beastkin' ||
    heritage.traits?.includes('Beastkin')
  ) {
    return 'beast'
  }
  if (
    heritage.id === 'heritage-aiuvarin' ||
    heritage.id === 'heritage-dromaar' ||
    heritage.id === 'heritage-hungerseed'
  ) {
    return 'mixed'
  }
  return 'scion'
}

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

interface VersatileHeritageBrowserProps {
  heritages: Heritage[]
  ancestries?: Ancestry[]
  sources: ContentSource[]
  feats?: Feat[]
  mode?: 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onCreateHomebrew?: () => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function VersatileHeritageBrowser({
  heritages,
  ancestries = [],
  sources,
  feats = [],
  mode = 'browse',
  previewId,
  onActiveChange,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: VersatileHeritageBrowserProps) {
  const [search, setSearch] = useState('')
  const [familyFilter, setFamilyFilter] = useState<FamilyId | 'all'>('all')
  const [rarities, setRarities] = useState<Rarity[]>([])
  const { activeId, rowProps } = useBrowseSelection(previewId, onActiveChange)

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )
  const ancestryById = useMemo(
    () => Object.fromEntries(ancestries.map((a) => [a.id, a])),
    [ancestries],
  )

  const catalog = useMemo(
    () =>
      heritages
        .filter((h) => isVersatileHeritage(h))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [heritages],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return catalog.filter((h) => {
      if (familyFilter !== 'all' && familyOf(h) !== familyFilter) return false
      if (!matchesSelected(h.rarity, rarities)) return false
      if (!q) return true
      return (
        h.name.toLowerCase().includes(q) ||
        h.originalName.toLowerCase().includes(q) ||
        h.rulesSummary.toLowerCase().includes(q) ||
        (h.traits ?? []).some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [catalog, familyFilter, rarities, search])

  const grouped = useMemo(() => {
    return FAMILIES.map((family) => ({
      ...family,
      items: filtered.filter((h) => familyOf(h) === family.id),
    })).filter((g) => g.items.length > 0)
  }, [filtered])

  const active = catalog.find((h) => h.id === activeId) ?? null

  const relatedFeats = useMemo(() => {
    if (!active) return []
    return feats.filter(
      (f) =>
        f.heritageId === active.id ||
        Boolean(
          f.heritageId && active.grantedHeritageIds?.includes(f.heritageId),
        ),
    )
  }, [active, feats])

  const grantedAncestryNames = (active?.grantedAncestryIds ?? [])
    .map((id) => ancestryById[id]?.name)
    .filter((n): n is string => Boolean(n))

  const extraSpeeds = additionalSpeedBreakdown(active?.additionalSpeeds)

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <aside className="flex w-full shrink-0 flex-col gap-2 lg:w-80">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-text">Heranças versáteis</h2>
            <div className="text-[11px] text-text-dim">
              {filtered.length} de {catalog.length}
            </div>
          </div>
          {mode === 'manage' && onCreateHomebrew && (
            <Button size="sm" variant="accent" onClick={onCreateHomebrew}>
              + Criar
            </Button>
          )}
        </div>
        <Input
          placeholder="Buscar herança versátil…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap gap-1">
          <ChoiceChip
            selected={familyFilter === 'all'}
            onClick={() => setFamilyFilter('all')}
          >
            Todas
          </ChoiceChip>
          {FAMILIES.map((family) => (
            <ChoiceChip
              key={family.id}
              selected={familyFilter === family.id}
              onClick={() => setFamilyFilter(family.id)}
            >
              {family.label}
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
        <Panel
          quiet
          compact
          title="Catálogo"
          actions={
            <span className="text-[10px] text-text-dim">
              {filtered.length}/{catalog.length}
            </span>
          }
        >
          {filtered.length === 0 ? (
            <p className="px-1 py-6 text-center text-xs text-text-dim">
              {catalog.length === 0
                ? 'Nenhuma herança versátil no catálogo ainda.'
                : 'Nada combina com a busca.'}
            </p>
          ) : (
            <ul className="max-h-[50vh] overflow-y-auto lg:max-h-[calc(100vh-16rem)]">
              {grouped.map((group) => (
                <li key={group.id}>
                  <div className="sticky top-0 z-10 bg-surface-1 px-1 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                    {group.label}
                    <span className="ml-1 font-normal normal-case tracking-normal">
                      · {group.hint}
                    </span>
                  </div>
                  <ul className="mb-2 space-y-1">
                    {group.items.map((h) => {
                      const selected = h.id === active?.id
                      return (
                        <li key={h.id}>
                          <button
                            type="button"
                            {...rowProps(h.id)}
                            className={`w-full rounded-lg border px-2.5 py-2 text-left transition-colors ${
                              selected
                                ? 'border-accent bg-accent/15'
                                : 'border-border/70 bg-surface-2/40 hover:border-border-strong'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="flex min-w-0 items-center gap-1.5">
                                <span className="truncate text-sm font-medium text-text">
                                  {h.name}
                                </span>
                                {h.provenance.type === 'homebrew' && (
                                  <ProvenanceBadge type="homebrew" />
                                )}
                              </span>
                              <RarityBadge rarity={h.rarity} />
                            </div>
                            <div className="mt-0.5 line-clamp-2 text-[10px] text-text-dim">
                              <RichText>{polishRulesText(h.rulesSummary)}</RichText>
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

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        {!active ? (
          <Panel title="Heranças versáteis" quiet>
            <p className="text-sm text-text-muted">
              Heranças versáteis encaixam em qualquer ancestralidade (salvo
              restrição no texto, como humanoide). Escolha uma à esquerda para
              ver lore, regras e feitos. Clique de novo no mesmo item para
              desmarcar.
            </p>
            <Tip>
              {mode === 'manage'
                ? 'Nada homebrew vem pronto. Crie uma herança versátil do zero ou duplique uma oficial (Aiuvarin, Nephilim, Beastkin…).'
                : 'Na ficha, a herança versátil aparece depois das heranças da ancestralidade. A aplicação fica no editor do personagem.'}
            </Tip>
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
                  <Badge tone="info">Versátil</Badge>
                  <RarityBadge rarity={active.rarity} />
                  <ProvenanceBadge type={active.provenance.type} />
                </div>
              }
            >
              <RichText
                as="p"
                className="text-sm leading-relaxed text-text-muted"
              >
                {polishRulesText(active.description)}
              </RichText>
              {(active.traits?.length ?? 0) > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {active.traits!.map((t) => (
                    <Badge key={t}>{localizeTraitLabel(t)}</Badge>
                  ))}
                </div>
              )}
              <div className="mt-3 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs text-text">
                <span className="font-semibold text-accent">Resumo:</span>{' '}
                <RichText>{polishRulesText(active.rulesSummary)}</RichText>
              </div>
              {active.aonUrl && (
                <p className="mt-2 text-[11px] text-text-dim">
                  Fonte:{' '}
                  <a
                    href={active.aonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    Archives of Nethys
                  </a>
                </p>
              )}
            </Panel>

            <Panel title="Como encaixa na ficha" subtitle="Regras de acesso">
              <ul className="space-y-1.5 text-sm text-text-muted">
                <li>
                  {active.requiredAncestryTraits?.length
                    ? `Só ancestralidades com o traço ${active.requiredAncestryTraits
                        .map((t) => localizeTraitLabel(t))
                        .join(', ')
                        .toLowerCase()}.`
                    : 'Qualquer ancestralidade pode pegar esta herança.'}
                </li>
                {grantedAncestryNames.length > 0 && (
                  <li>
                    Também libera feitos de {grantedAncestryNames.join(' e ')}.
                  </li>
                )}
                {active.grantedHeritageIds?.length ? (
                  <li>
                    Também libera os feitos geniekin compartilhados (olhos
                    elementais, armas de gênio).
                  </li>
                ) : null}
                <li>
                  Ao ganhar um feito de ancestralidade, pode escolher feitos
                  desta herança além dos da ancestralidade.
                </li>
              </ul>
            </Panel>

            {(active.senses?.length ||
              active.upgradeLowLightToDarkvision ||
              extraSpeeds.length > 0 ||
              (active.additionalLanguageOptions?.length ?? 0) > 0) && (
              <Panel title="Sentidos, deslocamento e idiomas">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {active.senses?.map((sense) => (
                    <div key={sense.id} className="col-span-2">
                      <SenseRulesCard
                        kind={sense.kind}
                        name={sense.name}
                        rangeFeet={sense.range}
                        description={sense.description}
                        sourceLabel={active.name}
                      />
                    </div>
                  ))}
                  {active.upgradeLowLightToDarkvision && (
                    <div className="col-span-2">
                      <SenseRulesCard
                        kind="darkvision"
                        name="Visão no escuro"
                        description="Se a ancestralidade já enxerga na penumbra, vira visão no escuro. Sem penumbra, concede visão na penumbra."
                        sourceLabel={active.name}
                      />
                    </div>
                  )}
                  {extraSpeeds.map((row) => (
                    <StatBox
                      key={row.label}
                      label={row.label}
                      value={row.value}
                    />
                  ))}
                  {(active.additionalLanguageOptions?.length ?? 0) > 0 && (
                    <StatBox
                      label="Idioma extra"
                      value={active.additionalLanguageOptions!.join(', ')}
                      hint="Entra nas opções da Inteligência."
                    />
                  )}
                </div>
              </Panel>
            )}

            {(active.resistances?.length ?? 0) > 0 && (
              <Panel
                title="Resistências"
                subtitle="Sobe sozinha com o nível · toque para ler a regra"
              >
                <ul className="space-y-1">
                  {active.resistances!.map((rule) => {
                    const at1 = resolveResistanceValue(rule, 1)
                    const at10 = resolveResistanceValue(rule, 10)
                    const at20 = resolveResistanceValue(rule, 20)
                    const value = resolveResistanceValue(rule, 1)
                    return (
                      <li key={rule.damageType}>
                        <DefenseRulesCard
                          kind="resistance"
                          type={rule.damageType}
                          value={rule.kind === 'halfLevelMin1' ? at1 : value}
                          label={rule.label}
                          sourceLabel={
                            rule.kind === 'halfLevelMin1'
                              ? `½ nível (mín. 1) · Nv. 1 → ${at1} · Nv. 10 → ${at10} · Nv. 20 → ${at20}`
                              : 'valor fixo da herança'
                          }
                        />
                      </li>
                    )
                  })}
                </ul>
              </Panel>
            )}

            {(active.choices?.length ?? 0) > 0 && (
              <Panel
                title="Escolhas da herança"
                subtitle={
                  active.choices!.every((c) => c.required === false)
                    ? 'Opcional na ficha'
                    : 'Obrigatórias na ficha'
                }
              >
                {active.choices!.map((rule) => (
                  <div key={rule.id} className="mb-3 last:mb-0">
                    <div className="mb-1.5 text-xs font-medium">
                      {rule.label}
                      {rule.required === false ? ' (opcional)' : ''}
                    </div>
                    {rule.hint ? (
                      <p className="mb-1.5 text-[11px] text-text-dim">
                        {rule.hint}
                      </p>
                    ) : null}
                    <div className="flex flex-wrap gap-1.5">
                      {rule.options.map((opt) => (
                        <span
                          key={opt.id}
                          className="rounded-lg border border-border bg-surface-3 px-2.5 py-1.5 text-xs text-text-muted"
                        >
                          {opt.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </Panel>
            )}

            {(active.specialAbilities?.length ?? 0) > 0 && (
              <Panel title="Habilidades concedidas">
                <ul className="space-y-2">
                  {active.specialAbilities!.map((a) => (
                    <li key={a.id}>
                      <ExpandableCard
                        title={a.name}
                        badges={
                          a.actionType && a.actionType !== 'passive' ? (
                            <ActionCost type={a.actionType} />
                          ) : undefined
                        }
                      >
                        {a.trigger && (
                          <p className="text-[11px] text-text-dim">
                            Gatilho: {polishRulesText(a.trigger)}
                          </p>
                        )}
                        {a.frequency && (
                          <p className="text-[11px] text-text-dim">
                            Frequência: {polishRulesText(a.frequency)}
                          </p>
                        )}
                        <RichText as="p">{polishRulesText(a.description)}</RichText>
                      </ExpandableCard>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}

            <RelatedFeatsPanel
              title="Feitos desta herança"
              subtitle={
                grantedAncestryNames.length
                  ? `Também pode pegar feitos de ${grantedAncestryNames.join(' e ')}`
                  : active.grantedHeritageIds?.length
                    ? 'Inclui feitos geniekin compartilhados'
                    : 'Além dos feitos da sua ancestralidade'
              }
              characterLevel={20}
              feats={relatedFeats}
              emptyHint="Ainda não há feitos específicos desta herança no catálogo."
            />

            <Tip>
              {mode === 'manage'
                ? 'Crie do zero ou duplique uma oficial. A herança versátil entra na ficha depois da ancestralidade, no editor do personagem.'
                : 'Só consulta. Para aplicar à ficha, abra um personagem, escolha a ancestralidade e depois a herança.'}
            </Tip>
          </div>
        )}
      </div>
    </div>
  )
}
