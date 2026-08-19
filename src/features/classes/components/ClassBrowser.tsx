import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type {
  AttributeId,
  CharacterClass,
  ClassChoices,
  ClassFeature,
  ContentSource,
  Feat,
  GrantedFeat,
  Rarity,
  SkillId,
} from '@/types'
import { SKILL_IDS } from '@/types'
import {
  additionalClassSkillSlots,
  emptyClassChoices,
  getClassFeatLevels,
  getEffectiveKeyAttributes,
  getReservedClassSkills,
  getSelectedSubclass,
  getSelectedSecondarySubclass,
  resolveClassBenefits,
  sneakAttackDice,
  validateClassChoices,
  listActiveSpellPicks,
  pruneGrantedSpellPicks,
  collectGrantedClassSpells,
  collectClassGrantedFeatPicks,
  classFeatureIsFeatStub,
  findFeatInCatalog,
  hydrateGrantedFeat,
} from '@/engine'
import {
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  RARITY_FILTER_OPTIONS,
  SKILL_LABELS,
  formatSourceLabel,
} from '@/utils/labels'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, Tip, StatBox } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import { ChoiceDetailList } from '@/components/ui/ChoiceDetailList'
import { RelatedFeatsPanel } from '@/features/feats/components/RelatedFeatsPanel'
import { ActiveFeatCard } from '@/features/feats/components/ActiveFeatCard'
import { FeatChoicePicker } from '@/features/feats/components/FeatChoicePicker'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'
import { ClassTables } from '@/features/classes/components/ClassTables'
import { ClassCatalogsBlock } from '@/features/classes/components/ClassCatalogPicker'
import { pruneCatalogChoices } from '@/engine/classCatalog'
import { localizeSpellName } from '@/data/i18n/spellNamesPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { catalogRowPointerProps } from '@/features/tabs/tabPointer'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'
import {
  enrichChoiceOptions,
  choiceOptionsHaveText,
} from '@/features/characters/choiceDetails'

function ChoiceChip({
  selected,
  onClick,
  children,
  disabled,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`interactive-lift rounded-lg border px-2.5 py-1.5 text-xs transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
        selected
          ? 'border-accent bg-accent/20 text-accent shadow-[0_0_0_1px_rgba(212,168,75,0.25)]'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:bg-surface-4 hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

function grantedFeatView(
  grant: {
    featId?: string
    featName?: string
    originalName?: string
  },
  feats: Feat[],
) {
  const found = findFeatInCatalog(feats, {
    featId: grant.featId,
    originalName: grant.originalName,
    featName: grant.featName,
  })
  if (!found) return null
  return withLocalizedFeatName(found)
}

function featureBodyText(
  feature: ClassFeature,
  feats: Feat[],
  subclassSummary?: string,
): string {
  const grant = feature.effects?.find((e) => e.kind === 'grantedFeat')
  if (classFeatureIsFeatStub(feature)) {
    if (grant && grant.kind === 'grantedFeat') {
      const view = grantedFeatView(grant, feats)
      if (view?.description) return view.description
    }
    if (subclassSummary) return subclassSummary
  }
  return feature.description
}

interface ClassBrowserProps {
  classes: CharacterClass[]
  sources: ContentSource[]
  selectedId?: string | null
  initialChoices?: ClassChoices | null
  characterLevel?: number
  /** INT sem contribuições da classe (para slots de perícia ao vivo) */
  intelligenceModifier?: number
  /** Feitos do catálogo (filtrados por classe no browser) */
  feats?: Feat[]
  /** select = ficha; browse = compêndio (só consulta); manage = homebrew */
  mode?: 'select' | 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  /** Esconde esta classe (variante Classe dupla). */
  excludeClassId?: string | null
  confirmLabel?: string
  onConfirm?: (classId: string, choices: ClassChoices) => void
  onCreateHomebrew?: () => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

export function ClassBrowser({
  classes,
  sources,
  selectedId,
  initialChoices,
  characterLevel = 1,
  intelligenceModifier = 0,
  feats = [],
  mode = 'select',
  previewId,
  onActiveChange,
  excludeClassId = null,
  confirmLabel,
  onConfirm,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: ClassBrowserProps) {
  const [search, setSearch] = useState('')
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [kinds, setKinds] = useState<Array<'spellcaster' | 'martial'>>([])
  const [provenances, setProvenances] = useState<Array<'official' | 'homebrew'>>(
    [],
  )
  const [activeId, setActiveId] = useState<string | null>(
    previewId ?? selectedId ?? null,
  )
  const [choices, setChoices] = useState<ClassChoices>(
    initialChoices ?? emptyClassChoices(),
  )

  useEffect(() => {
    if (previewId !== undefined) {
      setActiveId(previewId)
      return
    }
    if (selectedId) {
      setActiveId(selectedId)
      setChoices(initialChoices ?? emptyClassChoices())
    }
  }, [previewId, selectedId, initialChoices])

  const sourceMap = useMemo(
    () => Object.fromEntries(sources.map((s) => [s.id, s])),
    [sources],
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return classes
      .filter((c) => {
        if (!matchesSelected(c.rarity, rarities)) return false
        const kind = c.spellcasting ? 'spellcaster' : 'martial'
        if (!matchesSelected(kind, kinds)) return false
        if (!matchesSelected(c.provenance.type, provenances)) return false
        if (excludeClassId && c.id === excludeClassId) return false
        if (!q) return true
        return (
          c.name.toLowerCase().includes(q) ||
          c.originalName.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  }, [classes, search, rarities, kinds, provenances, excludeClassId])

  const active = classes.find((c) => c.id === activeId) ?? null

  const liveInt = useMemo(() => {
    const preview = active
      ? resolveClassBenefits(active, choices, characterLevel)
      : null
    const fromClass =
      preview?.attributeContributions
        .filter((c) => c.target === 'attribute.intelligence')
        .reduce((sum, c) => sum + c.value, 0) ?? 0
    return intelligenceModifier + fromClass
  }, [active, choices, characterLevel, intelligenceModifier])

  const skillSlots = active
    ? additionalClassSkillSlots(liveInt, active, choices)
    : 0

  // Trim extra skills if INT drops or reserved set grows
  useEffect(() => {
    if (!active) return
    setChoices((prev) => {
      const reserved = getReservedClassSkills(active, prev)
      const filtered = prev.additionalSkills.filter((s) => !reserved.has(s))
      const next =
        filtered.length > skillSlots ? filtered.slice(0, skillSlots) : filtered
      if (
        next.length === prev.additionalSkills.length &&
        next.every((s, i) => s === prev.additionalSkills[i])
      ) {
        return prev
      }
      return { ...prev, additionalSkills: next }
    })
  }, [skillSlots, active, choices.subclassId, choices.subclassSkillChoice, choices.skillChoice])

  const issues = active
    ? validateClassChoices(active, choices, liveInt, characterLevel)
    : []
  const canConfirm = Boolean(active) && issues.length === 0

  const preview = active
    ? resolveClassBenefits(active, choices, characterLevel)
    : null

  const grantedFeatCards = useMemo(() => {
    if (!active || !preview) return [] as GrantedFeat[]
    return preview.feats.map((f) =>
      hydrateGrantedFeat(
        {
          id: f.id,
          featId: f.featId,
          featName: f.featName,
          originalName: f.originalName,
          featType: f.featType,
          sourceType: 'class',
          sourceId: active.id,
          sourceLabel: f.sourceLabel,
        },
        feats,
      ),
    )
  }, [active, preview, feats])

  const selectedSubclass = active
    ? getSelectedSubclass(active, choices)
    : null
  const selectedSecondarySubclass = active
    ? getSelectedSecondarySubclass(active, choices)
    : null
  const spellPicks = active ? listActiveSpellPicks(active, choices) : []
  const grantedSpellInfo = active
    ? collectGrantedClassSpells(active, choices, characterLevel)
    : null
  const featurePickBundle = active
    ? collectClassGrantedFeatPicks(
        active,
        characterLevel,
        choices,
        new Map(feats.map((feat) => [feat.id, feat])),
      )
    : { views: [], picks: [] }
  const featurePickViews = featurePickBundle.views.filter(
    (view) => view.kind !== 'feat',
  )
  const grantedClassFeatPicks = featurePickBundle.picks
  const keyOptions = active
    ? getEffectiveKeyAttributes(active, choices)
    : []
  const subclassAddsKeys = Boolean(
    active?.subclass?.options.some(
      (o) => (o.extraKeyAttributes?.length ?? 0) > 0,
    ),
  )
  const secondaryAddsKeys = Boolean(
    active?.secondarySubclass?.options.some(
      (o) => (o.extraKeyAttributes?.length ?? 0) > 0,
    ),
  )
  const waitingForKeySource =
    (subclassAddsKeys && !choices.subclassId) ||
    (secondaryAddsKeys && !choices.secondarySubclassId)
  const reservedSkills = active
    ? getReservedClassSkills(active, choices)
    : new Set<string>()

  function selectClass(id: string, event?: TabPointerEvent) {
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
    if (id !== selectedId) setChoices(emptyClassChoices())
    else setChoices(initialChoices ?? emptyClassChoices())
  }

  function setSubclass(subclassId: string) {
    setChoices((prev) => {
      const nextId = prev.subclassId === subclassId ? undefined : subclassId
      const next = {
        ...prev,
        subclassId: nextId,
        subclassSkillChoice: undefined,
        keyAttribute: undefined,
        additionalSkills: prev.additionalSkills,
      }
      if (!active) return next
      return pruneGrantedSpellPicks(
        active,
        pruneCatalogChoices(active, next, characterLevel),
      )
    })
  }

  function setSecondarySubclass(secondarySubclassId: string) {
    setChoices((prev) => ({
      ...prev,
      secondarySubclassId:
        prev.secondarySubclassId === secondarySubclassId
          ? undefined
          : secondarySubclassId,
      keyAttribute: undefined,
    }))
  }

  function setGrantedSpellPick(choiceId: string, value: string) {
    setChoices((prev) => {
      const current = prev.grantedSpellPicks ?? {}
      const nextValue = current[choiceId] === value ? undefined : value
      const grantedSpellPicks = { ...current }
      if (nextValue) grantedSpellPicks[choiceId] = nextValue
      else delete grantedSpellPicks[choiceId]
      return { ...prev, grantedSpellPicks }
    })
  }

  function setFeaturePick(choiceId: string, value: string) {
    setChoices((prev) => {
      const current = { ...(prev.featurePicks ?? {}) }
      if (!value) delete current[choiceId]
      else current[choiceId] = value
      return { ...prev, featurePicks: current }
    })
  }

  function setSubclassSkill(skill: SkillId) {
    setChoices((prev) => ({
      ...prev,
      subclassSkillChoice:
        prev.subclassSkillChoice === skill ? undefined : skill,
      additionalSkills: prev.additionalSkills.filter((s) => s !== skill),
    }))
  }

  function setKeyAttribute(attr: AttributeId) {
    setChoices((prev) => ({
      ...prev,
      keyAttribute: prev.keyAttribute === attr ? undefined : attr,
    }))
  }

  function toggleFreeBoost(attr: AttributeId) {
    setChoices((prev) => {
      const current = prev.creationFreeBoosts ?? []
      if (current.includes(attr)) {
        return {
          ...prev,
          creationFreeBoosts: current.filter((a) => a !== attr),
        }
      }
      if (current.length >= 4) return prev
      return { ...prev, creationFreeBoosts: [...current, attr] }
    })
  }

  function setSkillChoice(skill: SkillId) {
    setChoices((prev) => ({
      ...prev,
      skillChoice: prev.skillChoice === skill ? undefined : skill,
      additionalSkills: prev.additionalSkills.filter((s) => s !== skill),
    }))
  }

  function toggleAdditionalSkill(skill: SkillId) {
    setChoices((prev) => {
      if (reservedSkills.has(skill)) return prev
      const has = prev.additionalSkills.includes(skill)
      if (has) {
        return {
          ...prev,
          additionalSkills: prev.additionalSkills.filter((s) => s !== skill),
        }
      }
      if (prev.additionalSkills.length >= skillSlots) return prev
      return {
        ...prev,
        additionalSkills: [...prev.additionalSkills, skill],
      }
    })
  }

  function setWeaponGroup(id: string) {
    setChoices((prev) => ({
      ...prev,
      weaponGroup: prev.weaponGroup === id ? undefined : id,
    }))
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex w-full shrink-0 flex-col gap-2 lg:w-72">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-text">Classes</h2>
            <div className="text-[11px] text-text-dim">
              {filtered.length} de {classes.length}
            </div>
          </div>
          {mode === 'manage' && onCreateHomebrew && (
            <Button size="sm" variant="accent" onClick={onCreateHomebrew}>
              + Criar
            </Button>
          )}
        </div>
        <Input
          placeholder="Buscar classe…"
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
          label="Tipo"
          options={[
            { value: 'spellcaster', label: 'Com magia' },
            { value: 'martial', label: 'Sem magia própria' },
          ]}
          selected={kinds}
          onChange={setKinds}
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
        <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-surface-1">
          <ul className="divide-y divide-border">
            {filtered.map((c) => {
              const selected = c.id === activeId
              const applied = c.id === selectedId
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    {...catalogRowPointerProps((event) =>
                      selectClass(c.id, event),
                    )}
                    className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                      selected
                        ? 'bg-accent/15 text-accent'
                        : 'text-text-muted hover:bg-surface-2'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-text">
                        {c.name}
                      </span>
                      <span className="flex items-center gap-1">
                        {c.provenance.type === 'homebrew' && (
                          <ProvenanceBadge type="homebrew" />
                        )}
                        {applied && <Badge tone="accent">Na ficha</Badge>}
                      </span>
                    </span>
                    <span className="mt-0.5 text-[11px] text-text-dim">
                      {c.originalName} · PV {c.hitPointsPerLevel}/nível
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        {!active ? (
          <Panel title="Classe" subtitle="Escolha à esquerda">
            <p className="text-sm text-text-muted">
              {mode === 'manage'
                ? 'Selecione uma classe para consultar, duplicar ou editar. Homebrew não vem pronto — crie do zero ou copie uma oficial.'
                : 'A classe define PV por nível, atributo-chave, perícias, salvaguardas, percepção e recursos de progressão — diferente da ancestralidade (que dá PV uma vez, tamanho, velocidade e sentidos). Clique de novo no mesmo item para desmarcar.'}
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
              <RichText
                as="p"
                className="text-sm leading-relaxed text-text-muted"
              >
                {polishRulesText(active.lore.summary)}
              </RichText>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <StatBox
                  label="PV / nível"
                  value={String(active.hitPointsPerLevel)}
                  hint="Somados a cada nível + CON"
                />
                <StatBox
                  label="Percepção"
                  value={PROFICIENCY_LABELS[active.perceptionRank]}
                />
                <StatBox
                  label="Fort / Ref / Von"
                  value={`${PROFICIENCY_LABELS[active.saves.fortitude][0]}/${PROFICIENCY_LABELS[active.saves.reflex][0]}/${PROFICIENCY_LABELS[active.saves.will][0]}`}
                  hint={`${PROFICIENCY_LABELS[active.saves.fortitude]} / ${PROFICIENCY_LABELS[active.saves.reflex]} / ${PROFICIENCY_LABELS[active.saves.will]}`}
                />
                <StatBox
                  label="CD de classe"
                  value={PROFICIENCY_LABELS[active.classDcRank]}
                />
              </div>
              <div className="mt-3">
                <Tip>
                  <strong>Ancestralidade</strong> = quem você é (PV base uma vez,
                  velocidade, sentidos). <strong>Classe</strong> = o que você
                  treinou (PV por nível, salvaguardas, percepção, perícias de
                  combate). Fórmula: PV máx = ancestralidade + (classe + CON) ×
                  nível.
                </Tip>
              </div>
            </Panel>

            {(active.mechanicsGuide?.length || active.keyTerms?.length) && (
              <Panel
                title="Como funciona esta classe"
                subtitle="Mecânicas únicas, em linguagem de mesa"
              >
                {active.mechanicsGuide && active.mechanicsGuide.length > 0 && (
                  <ul className="space-y-2">
                    {active.mechanicsGuide.map((entry) => (
                      <li key={entry.title}>
                        <ExpandableCard
                          title={entry.title}
                          subtitle={
                            entry.originalName
                              ? entry.originalName
                              : undefined
                          }
                        >
                          <RichText as="p" className="leading-relaxed">
                            {polishRulesText(entry.body)}
                          </RichText>
                        </ExpandableCard>
                      </li>
                    ))}
                  </ul>
                )}
                {active.keyTerms && active.keyTerms.length > 0 && (
                  <div
                    className={
                      active.mechanicsGuide?.length ? 'mt-4 border-t border-border pt-3' : ''
                    }
                  >
                    <div className="mb-1.5 text-xs font-medium text-text">
                      Termos-chave
                    </div>
                    <ul className="space-y-2">
                      {active.keyTerms.map((t) => (
                        <li key={t.name}>
                          <ExpandableCard
                            title={t.name}
                            subtitle={t.originalName}
                          >
                            <RichText as="p">{polishRulesText(t.description)}</RichText>
                          </ExpandableCard>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Panel>
            )}

            {active.subclass && (
              <Panel
                title={active.subclass.label}
                subtitle={
                  active.subclass.required
                    ? 'Escolha obrigatória no 1º nível'
                    : 'Opcional'
                }
              >
                {active.subclass.description && (
                  <RichText as="p" className="mb-2 text-xs text-text-dim">
                    {polishRulesText(active.subclass.description)}
                  </RichText>
                )}
                <div className="space-y-2">
                  {active.subclass.options
                    .filter((o) => !o.isLegacy)
                    .map((opt) => {
                      const selected = choices.subclassId === opt.id
                      return (
                        <ExpandableCard
                          key={opt.id}
                          title={opt.name}
                          subtitle={opt.originalName}
                          selected={selected}
                          badges={opt.extraKeyAttributes?.map((a) => (
                            <Badge key={a} tone="accent">
                              +{ATTRIBUTE_LABELS[a]} chave
                            </Badge>
                          ))}
                          actions={
                            <button
                              type="button"
                              onClick={() => setSubclass(opt.id)}
                              className={`rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${
                                selected
                                  ? 'border-accent bg-accent/20 text-accent'
                                  : 'border-border bg-surface-3 text-text-muted hover:border-accent/50 hover:text-text'
                              }`}
                            >
                              {selected ? 'Selecionado' : 'Escolher'}
                            </button>
                          }
                        >
                          <RichText as="p" className="leading-relaxed">
                            {polishRulesText(opt.rulesSummary)}
                          </RichText>
                          {opt.grantedFeat
                            ? (() => {
                                const view = grantedFeatView(
                                  opt.grantedFeat,
                                  feats,
                                )
                                if (!view?.description) return null
                                return (
                                  <div className="mt-2 rounded-lg border border-border bg-surface-2 px-2.5 py-2">
                                    <div className="text-[11px] font-medium text-text">
                                      Feito:{' '}
                                      {view.name}
                                      {view.originalName &&
                                      view.originalName !== view.name
                                        ? ` · ${view.originalName}`
                                        : ''}
                                    </div>
                                    {view.trigger ? (
                                      <p className="text-[11px] text-text-dim">
                                        Gatilho: {polishRulesText(view.trigger)}
                                      </p>
                                    ) : null}
                                    <RichText
                                      as="p"
                                      className="mt-1 text-[11px] leading-relaxed"
                                    >
                                      {polishRulesText(view.description)}
                                    </RichText>
                                  </div>
                                )
                              })()
                            : null}
                        </ExpandableCard>
                      )
                    })}
                </div>
                {selectedSubclass?.skillChoiceOptions && (
                  <div className="mt-3">
                    <div className="mb-1.5 text-xs font-medium">
                      {selectedSubclass.skillChoiceLabel ??
                        'Perícia da especialização'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSubclass.skillChoiceOptions.map((skill) => (
                        <ChoiceChip
                          key={skill}
                          selected={choices.subclassSkillChoice === skill}
                          onClick={() => setSubclassSkill(skill)}
                        >
                          {SKILL_LABELS[skill]}
                        </ChoiceChip>
                      ))}
                    </div>
                  </div>
                )}
              </Panel>
            )}

            {(spellPicks.length > 0 ||
              (grantedSpellInfo?.pickOnes.length ?? 0) > 0) && (
              <Panel
                title="Magias da especialização"
                subtitle="Toque para ler o que a magia faz, depois escolha"
              >
                <div className="space-y-3">
                  {spellPicks.map((pick) => {
                    const details = enrichChoiceOptions(
                      pick.options.map((opt) => ({
                        id: opt.id,
                        name: localizeSpellName(opt.name),
                        originalName: opt.originalName ?? opt.name,
                      })),
                    )
                    return (
                      <div key={pick.id}>
                        <div className="mb-1.5 text-xs font-medium">
                          {pick.label}
                        </div>
                        {pick.description ? (
                          <RichText
                            as="p"
                            className="mb-1.5 text-[11px] text-text-dim"
                          >
                            {polishRulesText(pick.description)}
                          </RichText>
                        ) : null}
                        {choiceOptionsHaveText(details) ? (
                          <ChoiceDetailList
                            options={details}
                            selectedId={
                              (choices.grantedSpellPicks ?? {})[pick.id]
                            }
                            onSelect={(id) =>
                              setGrantedSpellPick(pick.id, id)
                            }
                          />
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {pick.options.map((opt) => (
                              <ChoiceChip
                                key={opt.id}
                                selected={
                                  (choices.grantedSpellPicks ?? {})[pick.id] ===
                                  opt.id
                                }
                                onClick={() =>
                                  setGrantedSpellPick(pick.id, opt.id)
                                }
                              >
                                {localizeSpellName(opt.name)}
                              </ChoiceChip>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {(grantedSpellInfo?.pickOnes ?? [])
                    .filter(
                      (pickOne) =>
                        !spellPicks.some((p) => p.id === pickOne.choiceId),
                    )
                    .map((pickOne) => {
                      const details = enrichChoiceOptions(
                        pickOne.options.map((name) => ({
                          id: name,
                          name: localizeSpellName(name),
                          originalName: name,
                        })),
                      )
                      return (
                        <div key={pickOne.choiceId}>
                          <div className="mb-1.5 text-xs font-medium">
                            {pickOne.label}
                          </div>
                          {choiceOptionsHaveText(details) ? (
                            <ChoiceDetailList
                              options={details}
                              selectedId={
                                (choices.grantedSpellPicks ?? {})[
                                  pickOne.choiceId
                                ]
                              }
                              onSelect={(id) =>
                                setGrantedSpellPick(pickOne.choiceId, id)
                              }
                            />
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {pickOne.options.map((name) => (
                                <ChoiceChip
                                  key={name}
                                  selected={
                                    (choices.grantedSpellPicks ?? {})[
                                      pickOne.choiceId
                                    ] === name
                                  }
                                  onClick={() =>
                                    setGrantedSpellPick(pickOne.choiceId, name)
                                  }
                                >
                                  {localizeSpellName(name)}
                                </ChoiceChip>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>
              </Panel>
            )}

            {(featurePickViews.length > 0 ||
              grantedClassFeatPicks.length > 0) && (
              <Panel
                title="Recursos da classe"
                subtitle="Toque para ler o que cada opção faz, depois escolha"
              >
                <div className="space-y-4">
                  {grantedClassFeatPicks.map((pick) => {
                    const choiceId = pick.key.startsWith('class:')
                      ? pick.key.slice('class:'.length)
                      : pick.key
                    return (
                      <FeatChoicePicker
                        key={pick.key}
                        pick={{
                          ...pick,
                          selectedFeatId:
                            (choices.featurePicks ?? {})[choiceId] ??
                            pick.selectedFeatId,
                        }}
                        onChange={(featId) =>
                          setFeaturePick(choiceId, featId)
                        }
                      />
                    )
                  })}
                  {featurePickViews.map((view) => {
                    const details = enrichChoiceOptions(
                      view.options.map((opt) => ({
                        id: opt.id,
                        name: opt.name,
                        description: opt.description,
                      })),
                      feats,
                    )
                    return (
                      <div key={view.choiceId}>
                        <div className="mb-1.5 text-xs font-medium">
                          {view.label}
                        </div>
                        {view.kind === 'save' ||
                        !choiceOptionsHaveText(details) ? (
                          <>
                            <RichText
                              as="p"
                              className="mb-1.5 text-[11px] text-text-dim"
                            >
                              {polishRulesText(view.hint ?? '')}
                            </RichText>
                            <div className="flex flex-wrap gap-1.5">
                              {view.options.map((opt) => (
                                <ChoiceChip
                                  key={opt.id}
                                  selected={view.selected === opt.id}
                                  onClick={() =>
                                    setFeaturePick(
                                      view.choiceId,
                                      view.selected === opt.id ? '' : opt.id,
                                    )
                                  }
                                >
                                  {opt.name}
                                </ChoiceChip>
                              ))}
                            </div>
                          </>
                        ) : (
                          <ChoiceDetailList
                            hint={view.hint}
                            options={details}
                            selectedId={
                              (choices.featurePicks ?? {})[view.choiceId] ??
                              view.selected
                            }
                            onSelect={(id) =>
                              setFeaturePick(
                                view.choiceId,
                                ((choices.featurePicks ?? {})[view.choiceId] ??
                                  view.selected) === id
                                  ? ''
                                  : id,
                              )
                            }
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </Panel>
            )}

            {active.secondarySubclass && (
              <Panel
                title={active.secondarySubclass.label}
                subtitle={
                  active.secondarySubclass.required
                    ? 'Escolha obrigatória no 1º nível'
                    : 'Opcional'
                }
              >
                {active.secondarySubclass.description && (
                  <RichText as="p" className="mb-2 text-xs text-text-dim">
                    {polishRulesText(active.secondarySubclass.description)}
                  </RichText>
                )}
                <div className="space-y-2">
                  {active.secondarySubclass.options
                    .filter((o) => !o.isLegacy)
                    .map((opt) => {
                      const selected = choices.secondarySubclassId === opt.id
                      return (
                        <ExpandableCard
                          key={opt.id}
                          title={opt.name}
                          subtitle={opt.originalName}
                          selected={selected}
                          badges={opt.extraKeyAttributes?.map((a) => (
                            <Badge key={a} tone="accent">
                              {ATTRIBUTE_LABELS[a]} chave
                            </Badge>
                          ))}
                          actions={
                            <button
                              type="button"
                              onClick={() => setSecondarySubclass(opt.id)}
                              className={`rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${
                                selected
                                  ? 'border-accent bg-accent/20 text-accent'
                                  : 'border-border bg-surface-3 text-text-muted hover:border-accent/50 hover:text-text'
                              }`}
                            >
                              {selected ? 'Selecionado' : 'Escolher'}
                            </button>
                          }
                        >
                          {opt.description ? (
                            <RichText as="p" className="leading-relaxed">
                              {polishRulesText(opt.description)}
                            </RichText>
                          ) : null}
                          <RichText as="p" className="leading-relaxed text-text-dim">
                            {polishRulesText(opt.rulesSummary)}
                          </RichText>
                          {opt.grantedFeat
                            ? (() => {
                                const view = grantedFeatView(
                                  opt.grantedFeat,
                                  feats,
                                )
                                if (!view?.description) return null
                                return (
                                  <div className="mt-2 rounded-lg border border-border bg-surface-2 px-2.5 py-2">
                                    <div className="text-[11px] font-medium text-text">
                                      Feito:{' '}
                                      {view.name}
                                      {view.originalName &&
                                      view.originalName !== view.name
                                        ? ` · ${view.originalName}`
                                        : ''}
                                    </div>
                                    {view.trigger ? (
                                      <p className="text-[11px] text-text-dim">
                                        Gatilho: {polishRulesText(view.trigger)}
                                      </p>
                                    ) : null}
                                    <RichText
                                      as="p"
                                      className="mt-1 text-[11px] leading-relaxed"
                                    >
                                      {polishRulesText(view.description)}
                                    </RichText>
                                  </div>
                                )
                              })()
                            : null}
                        </ExpandableCard>
                      )
                    })}
                </div>
                {selectedSecondarySubclass && (
                  <p className="mt-2 text-[11px] text-accent/90">
                    Selecionado: {selectedSecondarySubclass.name}
                  </p>
                )}
              </Panel>
            )}

            {active && (
              <ClassCatalogsBlock
                classDef={active}
                choices={choices}
                level={characterLevel}
                intelligenceModifier={liveInt}
                onChange={setChoices}
              />
            )}

            <Panel
              title="Atributo-chave"
              subtitle={
                selectedSecondarySubclass
                  ? `Opções com ${selectedSecondarySubclass.name}`
                  : selectedSubclass
                    ? `Opções com ${selectedSubclass.name}`
                    : 'Boost +1 da classe no 1º nível'
              }
            >
              {waitingForKeySource ? (
                <p className="text-xs text-text-dim">
                  {secondaryAddsKeys && !choices.secondarySubclassId
                    ? `Escolha: ${active?.secondarySubclass?.label} para definir o atributo-chave.`
                    : 'Escolha a especialização acima para liberar o atributo-chave.'}
                </p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {keyOptions.map((attr) => (
                    <ChoiceChip
                      key={attr}
                      selected={choices.keyAttribute === attr}
                      onClick={() => setKeyAttribute(attr)}
                    >
                      {ATTRIBUTE_LABELS[attr]}
                    </ChoiceChip>
                  ))}
                </div>
              )}
            </Panel>

            <Panel
              title="Boosts livres de criação"
              subtitle={`${(choices.creationFreeBoosts ?? []).length}/4 · atributos diferentes`}
            >
              <p className="mb-2 text-xs text-text-dim">
                No 1º nível você também recebe quatro boosts livres (qualquer
                atributo, sem repetir). São do personagem — a aba de classe é o
                lugar natural no fluxo PF2e.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(
                  Object.keys(ATTRIBUTE_LABELS) as AttributeId[]
                ).map((attr) => {
                  const selected = (choices.creationFreeBoosts ?? []).includes(
                    attr,
                  )
                  const full =
                    (choices.creationFreeBoosts ?? []).length >= 4 && !selected
                  return (
                    <ChoiceChip
                      key={attr}
                      selected={selected}
                      disabled={full}
                      onClick={() => toggleFreeBoost(attr)}
                    >
                      {ATTRIBUTE_LABELS[attr]}
                    </ChoiceChip>
                  )
                })}
              </div>
            </Panel>

            <Panel
              title="Perícias da classe"
              subtitle={`${skillSlots} adicionais (${active.skills.additionalBase}+INT ${liveInt >= 0 ? `+${liveInt}` : liveInt})`}
            >
              {(active.skills.fixed?.length ?? 0) > 0 && (
                <div className="mb-3">
                  <div className="mb-1.5 text-xs font-medium">Fixas da classe</div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.skills.fixed!.map((g) =>
                      g.skillId ? (
                        <Badge key={g.id} tone="info">
                          {SKILL_LABELS[g.skillId as SkillId]}
                        </Badge>
                      ) : null,
                    )}
                    {selectedSubclass?.skillGrants?.map((g) =>
                      g.skillId ? (
                        <Badge key={g.id} tone="accent">
                          {SKILL_LABELS[g.skillId as SkillId]} (
                          {selectedSubclass.name})
                        </Badge>
                      ) : null,
                    )}
                    {choices.subclassSkillChoice && (
                      <Badge tone="accent">
                        {SKILL_LABELS[choices.subclassSkillChoice]}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              {active.skills.choiceOptions &&
                !(
                  selectedSubclass &&
                  active.skills.choiceOptions.every((s) =>
                    selectedSubclass.skillGrants?.some((g) => g.skillId === s),
                  )
                ) && (
                <div className="mb-3">
                  <div className="mb-1.5 text-xs font-medium">
                    Treinado em (escolha uma)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.skills.choiceOptions.map((skill) => (
                      <ChoiceChip
                        key={skill}
                        selected={choices.skillChoice === skill}
                        onClick={() => setSkillChoice(skill)}
                      >
                        {SKILL_LABELS[skill]}
                      </ChoiceChip>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div className="mb-1.5 text-xs font-medium">
                  Perícias adicionais ({choices.additionalSkills.length}/
                  {skillSlots})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SKILL_IDS.map((skill) => (
                    <ChoiceChip
                      key={skill}
                      selected={choices.additionalSkills.includes(skill)}
                      disabled={
                        reservedSkills.has(skill) ||
                        (!choices.additionalSkills.includes(skill) &&
                          choices.additionalSkills.length >= skillSlots)
                      }
                      onClick={() => toggleAdditionalSkill(skill)}
                    >
                      {SKILL_LABELS[skill]}
                    </ChoiceChip>
                  ))}
                </div>
              </div>
            </Panel>

            {active.id === 'class-rogue' && (
              <Panel title="Ataque Furtivo" subtitle="Escala com o nível">
                <StatBox
                  label="Dados atuais"
                  value={`${sneakAttackDice(characterLevel)}d6`}
                  hint="1d6 no 1º; +1d6 no 5º, 11º e 17º"
                />
              </Panel>
            )}

            {characterLevel >= 5 && active.weaponGroupOptions && (
              <Panel
                title="Grupo de arma"
                subtitle="Maestria de Arma do Guerreiro (5º+)"
              >
                <div className="flex flex-wrap gap-1.5">
                  {active.weaponGroupOptions.map((g) => (
                    <ChoiceChip
                      key={g.id}
                      selected={choices.weaponGroup === g.id}
                      onClick={() => setWeaponGroup(g.id)}
                    >
                      {g.label}
                    </ChoiceChip>
                  ))}
                </div>
              </Panel>
            )}

            <Panel title="Proficiências iniciais">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="text-[10px] font-semibold uppercase text-text-dim">
                    Ataques
                  </div>
                  <ul className="mt-1 space-y-0.5 text-xs text-text-muted">
                    {(preview?.attackProficiencies ?? active.attacks).map(
                      (a) => (
                        <li
                          key={
                            'key' in a && a.key
                              ? a.key
                              : 'category' in a
                                ? a.category
                                : a.label
                          }
                        >
                          {a.label}:{' '}
                          <span className="text-text">
                            {PROFICIENCY_LABELS[a.rank]}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase text-text-dim">
                    Defesas
                  </div>
                  <ul className="mt-1 space-y-0.5 text-xs text-text-muted">
                    {(preview?.defenseProficiencies ?? active.defenses).map(
                      (d) => (
                        <li key={'key' in d ? d.key : d.category}>
                          {d.label}:{' '}
                          <span className="text-text">
                            {PROFICIENCY_LABELS[d.rank]}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </Panel>

            <ClassTables
              characterClass={active}
              characterLevel={characterLevel}
            />

            {grantedFeatCards.length > 0 && (
              <Panel title="Feitos concedidos">
                <div className="space-y-1.5">
                  {grantedFeatCards.map((feat) => (
                    <ActiveFeatCard key={feat.id} feat={feat} />
                  ))}
                </div>
              </Panel>
            )}

            <Panel
              title="Recursos ativos"
              subtitle={`Até o nível ${characterLevel}`}
            >
              <ul className="space-y-2">
                {(preview?.activeFeatures ?? [])
                  .filter((f) => !classFeatureIsFeatStub(f))
                  .map((f) => (
                      <li key={f.id}>
                        <ExpandableCard
                          title={f.name}
                          badges={
                            <>
                              <Badge>Nv. {f.level}</Badge>
                              {f.actionType && f.actionType !== 'passive' && (
                                <ActionCost type={f.actionType} />
                              )}
                            </>
                          }
                        >
                          {f.trigger && (
                            <p className="text-[11px] text-text-dim">
                              Gatilho: {polishRulesText(f.trigger)}
                            </p>
                          )}
                          {f.frequency && (
                            <p className="text-[11px] text-text-dim">
                              Frequência: {polishRulesText(f.frequency)}
                            </p>
                          )}
                          <RichText as="p">
                            {polishRulesText(
                              featureBodyText(
                                f,
                                feats,
                                selectedSubclass?.rulesSummary,
                              ),
                            )}
                          </RichText>
                        </ExpandableCard>
                      </li>
                    ))}
              </ul>
            </Panel>

            <details className="rounded-xl border border-border bg-surface-1 px-3 py-2">
              <summary className="cursor-pointer text-xs font-medium">
                Roleplay
              </summary>
              <div className="mt-3 space-y-3 text-xs text-text-muted">
                <div className="grid gap-2 md:grid-cols-2">
                  <p>
                    <strong className="text-text">Combate:</strong>{' '}
                    <RichText>{polishRulesText(active.lore.duringCombat)}</RichText>
                  </p>
                  <p>
                    <strong className="text-text">Social:</strong>{' '}
                    <RichText>{polishRulesText(active.lore.duringSocial)}</RichText>
                  </p>
                  <p>
                    <strong className="text-text">Exploração:</strong>{' '}
                    <RichText>{polishRulesText(active.lore.whileExploring)}</RichText>
                  </p>
                  <p>
                    <strong className="text-text">Intervalo:</strong>{' '}
                    <RichText>{polishRulesText(active.lore.inDowntime)}</RichText>
                  </p>
                </div>
                {active.aonUrl && (
                  <a
                    href={active.aonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    Fonte: Archives of Nethys
                  </a>
                )}
              </div>
            </details>

            <RelatedFeatsPanel
              title={`Feitos de ${active.name}`}
              characterLevel={characterLevel}
              classFeatFromLevel={getClassFeatLevels(active)[0]}
              feats={feats.filter(
                (f) => f.category === 'class' && f.classId === active.id,
              )}
              emptyHint="Ainda não há feitos desta classe no catálogo."
            />

            {mode === 'browse' || mode === 'manage' ? (
              <Tip>
                {mode === 'manage'
                  ? 'Crie do zero ou duplique uma oficial. Nada homebrew vem pronto — a lista começa só com o Remaster.'
                  : 'Compêndio — só consulta. Para aplicar à ficha, abra um personagem e use a aba Classe.'}
              </Tip>
            ) : (
              <>
                {issues.length > 0 && (
                  <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-xs text-danger">
                    {issues.map((i) => (
                      <div key={i.field + i.message}>{i.message}</div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pb-2">
                  <Button
                    variant="accent"
                    disabled={!canConfirm || !onConfirm}
                    onClick={() => {
                      if (!active || !onConfirm) return
                      onConfirm(active.id, choices)
                    }}
                  >
                    {confirmLabel
                      ? confirmLabel
                      : selectedId === active.id
                        ? 'Atualizar classe'
                        : 'Aplicar classe à ficha'}
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
