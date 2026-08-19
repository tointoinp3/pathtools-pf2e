import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  Ancestry,
  AncestryChoices,
  ContentSource,
  Feat,
  GrantedFeat,
  Heritage,
  HeritageChoiceRule,
  Rarity,
} from '@/types'
import {
  emptyAncestryChoices,
  formatSpeedSummary,
  hydrateGrantedFeat,
  isPlaceholderFeatLookup,
  isVersatileHeritage,
  partitionHeritagesForAncestry,
  resolveAncestryBenefits,
  resolveResistanceValue,
  validateAncestryChoices,
} from '@/engine'
import { formatSourceLabel, RARITY_FILTER_OPTIONS } from '@/utils/labels'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, Tip, StatBox } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { ChoiceDetailList } from '@/components/ui/ChoiceDetailList'
import { ActionCost } from '@/components/ui/ActionIcon'
import { RelatedFeatsPanel } from '@/features/feats/components/RelatedFeatsPanel'
import { DefenseRulesCard } from '@/features/defenses/components/DefenseRulesCard'
import { SenseRulesCard } from '@/features/senses/components/SenseRulesCard'
import { ActiveFeatCard } from '@/features/feats/components/ActiveFeatCard'
import {
  enrichChoiceOptions,
  choiceOptionsHaveText,
} from '@/features/characters/choiceDetails'

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

function HeritageChoiceRuleBlock({
  rule,
  selectedId,
  feats,
  onSelect,
}: {
  rule: HeritageChoiceRule
  selectedId?: string
  feats: Feat[]
  onSelect: (optionId: string) => void
}) {
  const details = enrichChoiceOptions(
    rule.options.map((opt) => ({
      id: opt.id,
      name: opt.label,
      originalName: opt.originalLabel,
      description: opt.description,
    })),
    feats,
  )
  const rich = choiceOptionsHaveText(details)
  return (
    <div className="mb-3 last:mb-0">
      <div className="mb-1.5 text-xs font-medium">
        {rule.label}
        {rule.required === false ? ' (opcional)' : ''}
      </div>
      {rich ? (
        <ChoiceDetailList
          hint={rule.hint}
          options={details}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ) : (
        <>
          {rule.hint ? (
            <p className="mb-1.5 text-[11px] text-text-dim">{rule.hint}</p>
          ) : null}
          <div className="flex flex-wrap gap-1.5">
            {rule.options.map((opt) => (
              <ChoiceChip
                key={opt.id}
                selected={selectedId === opt.id}
                onClick={() => onSelect(opt.id)}
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

function HeritageListItem({
  heritage,
  selected,
  applied,
  onSelect,
}: {
  heritage: Heritage
  selected: boolean
  applied: boolean
  onSelect: () => void
}) {
  const versatile = isVersatileHeritage(heritage)
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
          selected
            ? 'bg-accent/15 text-accent'
            : 'text-text-muted hover:bg-surface-2'
        }`}
      >
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-text">{heritage.name}</span>
          <span className="flex flex-wrap justify-end gap-1">
            {heritage.provenance.type === 'homebrew' && (
              <ProvenanceBadge type="homebrew" />
            )}
            {versatile && <Badge tone="info">Versátil</Badge>}
            {applied && <Badge tone="accent">Na ficha</Badge>}
          </span>
        </span>
        <span className="mt-0.5 line-clamp-2 text-[11px] text-text-dim">
          <RichText>{polishRulesText(heritage.rulesSummary)}</RichText>
        </span>
      </button>
    </li>
  )
}

interface HeritagePickerProps {
  ancestry: Ancestry | null
  heritages: Heritage[]
  sources: ContentSource[]
  selectedHeritageId?: string | null
  ancestryChoices?: AncestryChoices | null
  characterLevel: number
  feats?: Feat[]
  onConfirm: (heritageId: string, choices: AncestryChoices) => void
  onClear?: () => void
  onBackToAncestry?: () => void
}

export function HeritagePicker({
  ancestry,
  heritages,
  sources,
  selectedHeritageId,
  ancestryChoices,
  characterLevel,
  feats = [],
  onConfirm,
  onClear,
  onBackToAncestry,
}: HeritagePickerProps) {
  const [search, setSearch] = useState('')
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [kinds, setKinds] = useState<Array<'specific' | 'versatile'>>([])
  const [activeId, setActiveId] = useState<string | null>(
    selectedHeritageId ?? null,
  )
  const [choices, setChoices] = useState<AncestryChoices>(
    ancestryChoices ?? emptyAncestryChoices(),
  )

  useEffect(() => {
    setChoices(ancestryChoices ?? emptyAncestryChoices())
  }, [ancestryChoices])

  useEffect(() => {
    if (selectedHeritageId) setActiveId(selectedHeritageId)
  }, [selectedHeritageId])

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )

  const { specific, versatile } = useMemo(() => {
    if (!ancestry) return { specific: [] as Heritage[], versatile: [] as Heritage[] }
    const partitioned = partitionHeritagesForAncestry(
      heritages,
      ancestry.id,
      search,
      ancestry.traits,
    )
    const keep = (h: Heritage, kind: 'specific' | 'versatile') =>
      matchesSelected(h.rarity, rarities) && matchesSelected(kind, kinds)
    return {
      specific: partitioned.specific.filter((h) => keep(h, 'specific')),
      versatile: partitioned.versatile.filter((h) => keep(h, 'versatile')),
    }
  }, [ancestry, heritages, search, rarities, kinds])

  const list = useMemo(
    () => [...specific, ...versatile],
    [specific, versatile],
  )

  const active = list.find((h) => h.id === activeId) ?? null

  const issues = ancestry && active
    ? validateAncestryChoices(ancestry, choices, active)
    : []
  const choiceIssues = issues.filter((i) => i.field.startsWith('heritageChoices'))
  const canConfirm = Boolean(ancestry && active && choiceIssues.length === 0)

  const preview = ancestry && active
    ? resolveAncestryBenefits(ancestry, choices, active, characterLevel)
    : null

  const grantedFeatCards = useMemo(() => {
    if (!active || !preview) return [] as GrantedFeat[]
    return preview.feats
      .filter(
        (f) =>
          Boolean(f.featId) ||
          !isPlaceholderFeatLookup({
            originalName: f.originalName,
            featName: f.featName,
          }),
      )
      .map((f) =>
        hydrateGrantedFeat(
          {
            id: f.id,
            featId: f.featId,
            featName: f.featName,
            originalName: f.originalName,
            featType: f.featType,
            description: f.description,
            actionType: f.actionType as GrantedFeat['actionType'],
            frequency: f.frequency,
            trigger: f.trigger,
            traits: f.traits,
            sourceType: 'heritage',
            sourceId: active.id,
            sourceLabel: f.sourceLabel,
          },
          feats,
        ),
      )
  }, [active, preview, feats])

  const pendingFeatChoice = Boolean(
    active &&
      (active.featGrants ?? []).some((g) =>
        isPlaceholderFeatLookup({
          originalName: g.originalName,
          featName: g.featName,
        }),
      ) &&
      grantedFeatCards.length === 0,
  )

  function setHeritageChoice(ruleId: string, optionId: string) {
    setChoices((prev) => {
      const current = prev.heritageChoices[ruleId]
      const next = { ...prev.heritageChoices }
      if (current === optionId) delete next[ruleId]
      else next[ruleId] = optionId
      return { ...prev, heritageChoices: next }
    })
  }

  if (!ancestry) {
    return (
      <div className="mx-auto max-w-lg animate-fade-up">
        <Panel title="Herança" subtitle="Precisa de uma ancestralidade primeiro">
            <p className="text-sm text-text-muted">
              A herança é uma especialização da ancestralidade (ex.: Anão da
              Forja) ou uma herança versátil (ex.: Aiuvarin, Dromaar). Sem
              ancestralidade na ficha, não há herança para escolher.
            </p>
          <Tip>
            Fluxo: escolha o <strong>Anão</strong> (ou outra ancestralidade) →
            volte aqui e refine com uma herança compatível.
          </Tip>
          {onBackToAncestry && (
            <Button className="mt-4" variant="accent" onClick={onBackToAncestry}>
              ← Escolher ancestralidade
            </Button>
          )}
        </Panel>
      </div>
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex w-full shrink-0 flex-col gap-2 lg:w-80">
        <div className="rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-xs text-text-muted">
          Ancestralidade:{' '}
          <strong className="text-accent">{ancestry.name}</strong>
          {selectedHeritageId && (
            <span className="mt-0.5 block text-text-dim">
              Herança na ficha já aplicada — pode trocar abaixo.
            </span>
          )}
        </div>
        <Input
          placeholder="Buscar herança…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterCount shown={list.length} total={heritages.length} />
        <MultiFilter
          label="Raridade"
          options={RARITY_FILTER_OPTIONS}
          selected={rarities}
          onChange={setRarities}
          emptyLabel="Todas"
        />
        <MultiFilter
          label="Tipo"
          options={[
            { value: 'specific', label: 'Da ancestralidade' },
            { value: 'versatile', label: 'Versátil' },
          ]}
          selected={kinds}
          onChange={setKinds}
          emptyLabel="Todas"
        />
        <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-surface-1">
          <ul className="divide-y divide-border">
            {specific.length > 0 && (
              <li className="sticky top-0 z-10 bg-surface-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                Da ancestralidade
              </li>
            )}
            {specific.map((h) => (
              <HeritageListItem
                key={h.id}
                heritage={h}
                selected={h.id === activeId}
                applied={h.id === selectedHeritageId}
                onSelect={() =>
                  setActiveId((id) => (id === h.id ? null : h.id))
                }
              />
            ))}
            {versatile.length > 0 && (
              <li className="sticky top-0 z-10 bg-surface-2 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                Heranças versáteis
              </li>
            )}
            {versatile.map((h) => (
              <HeritageListItem
                key={h.id}
                heritage={h}
                selected={h.id === activeId}
                applied={h.id === selectedHeritageId}
                onSelect={() =>
                  setActiveId((id) => (id === h.id ? null : h.id))
                }
              />
            ))}
            {list.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-text-dim">
                Nenhuma herança neste filtro.
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        {!active ? (
          <Panel title="Herança" subtitle="Escolha à esquerda">
            <p className="text-sm text-text-muted">
              Selecione uma herança da ancestralidade ou uma herança versátil.
              Clique de novo no mesmo item para desmarcar.
            </p>
          </Panel>
        ) : (
          <div className="space-y-3">
            <Panel
              title={active.name}
              subtitle={`${active.originalName} · ${formatSourceLabel(
                sourceMap[active.sourceId ?? '']?.name,
                active.sourcePage,
              )}`}
              actions={
                <div className="flex flex-wrap gap-1.5">
                  {isVersatileHeritage(active) && (
                    <Badge tone="info">Versátil</Badge>
                  )}
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
              {preview && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <StatBox
                    label="Velocidade"
                    value={formatSpeedSummary(
                      preview.speed,
                      preview.additionalSpeeds,
                    )}
                  />
                  <StatBox
                    label="PV ancestralidade"
                    value={String(preview.hitPointsFromAncestry)}
                  />
                </div>
              )}
            </Panel>

            {(active.senses?.length || active.upgradeLowLightToDarkvision) && (
              <Panel
                title="Sentidos"
                subtitle="Player Core pg. 433 · toque para ler"
              >
                <ul className="space-y-1">
                  {active.upgradeLowLightToDarkvision ? (
                    <li>
                      <SenseRulesCard
                        kind="darkvision"
                        name="Visão no escuro"
                        description="Se a ancestralidade já tem visão na penumbra, esta herança troca por visão no escuro. Sem penumbra, concede visão na penumbra."
                        sourceLabel={active.name}
                      />
                    </li>
                  ) : (
                    (active.senses ?? []).map((sense) => (
                      <li key={sense.id}>
                        <SenseRulesCard
                          kind={sense.kind}
                          name={sense.name}
                          rangeFeet={sense.range}
                          description={sense.description}
                          sourceLabel={active.name}
                        />
                      </li>
                    ))
                  )}
                </ul>
              </Panel>
            )}

            {(active.choices?.length ?? 0) > 0 && (
              <Panel
                title="Escolhas da herança"
                subtitle={
                  active.choices!.every((c) => c.required === false)
                    ? 'Opcional'
                    : 'Obrigatórias'
                }
              >
                {active.choices!.map((rule) => (
                  <HeritageChoiceRuleBlock
                    key={rule.id}
                    rule={rule}
                    selectedId={choices.heritageChoices[rule.id]}
                    feats={feats}
                    onSelect={(id) => setHeritageChoice(rule.id, id)}
                  />
                ))}
                {pendingFeatChoice ? (
                  <Tip>
                    Escolha o feito acima — o texto completo aparece nesta
                    tela e na ficha.
                  </Tip>
                ) : null}
              </Panel>
            )}

            {(active.resistances?.length ?? 0) > 0 && (
              <Panel
                title="Resistências (cálculo automático)"
                subtitle={`Nível ${characterLevel} · toque para ler a regra`}
              >
                <ul className="space-y-1">
                  {active.resistances!.map((rule) => {
                    const value = resolveResistanceValue(rule, characterLevel)
                    return (
                      <li key={rule.damageType}>
                        <DefenseRulesCard
                          kind="resistance"
                          type={rule.damageType}
                          value={value}
                          label={rule.label}
                          sourceLabel={
                            rule.kind === 'halfLevelMin1'
                              ? `⌊${characterLevel} / 2⌋ (mín. 1) = ${value} · sobe com o nível`
                              : `valor fixo · herança`
                          }
                        />
                      </li>
                    )
                  })}
                </ul>
                <Tip>
                  Ao subir de nível na ficha, essas resistências sobem sozinhas.
                </Tip>
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

            {grantedFeatCards.length > 0 && (
              <Panel title="Feitos concedidos">
                <div className="space-y-1.5">
                  {grantedFeatCards.map((feat) => (
                    <ActiveFeatCard key={feat.id} feat={feat} />
                  ))}
                </div>
              </Panel>
            )}

            <RelatedFeatsPanel
              title="Feitos desta herança"
              subtitle={
                isVersatileHeritage(active)
                  ? active.grantedAncestryIds?.length
                    ? 'Também pode pegar feitos da ancestralidade ligada'
                    : active.grantedHeritageIds?.length
                      ? 'Inclui feitos geniekin compartilhados'
                      : 'Além dos feitos da sua ancestralidade'
                  : undefined
              }
              characterLevel={characterLevel}
              feats={feats.filter(
                (f) =>
                  f.heritageId === active.id ||
                  Boolean(
                    f.heritageId &&
                      active.grantedHeritageIds?.includes(f.heritageId),
                  ),
              )}
              emptyHint="Ainda não há feitos específicos desta herança no catálogo."
            />

            {choiceIssues.length > 0 && (
              <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
                {choiceIssues.map((i) => (
                  <div key={i.field}>{i.message}</div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pb-2">
              <Button
                variant="accent"
                disabled={!canConfirm}
                onClick={() => {
                  if (!active) return
                  onConfirm(active.id, choices)
                }}
              >
                {selectedHeritageId === active.id
                  ? 'Atualizar herança'
                  : 'Aplicar herança'}
              </Button>
              {onBackToAncestry && (
                <Button variant="secondary" onClick={onBackToAncestry}>
                  ← Ancestralidade
                </Button>
              )}
              {selectedHeritageId && onClear && (
                <Button variant="danger" onClick={onClear}>
                  Remover herança
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
