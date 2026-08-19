import { useMemo, useState } from 'react'
import { ATTRIBUTE_IDS } from '@/types'
import type { CreatureSize, ProvenanceType, Rarity } from '@/types'
import {
  FAMILIAR_ABILITY_KIND_LABELS,
  isHomebrewCompanion,
  type CompanionCatalogKind,
  type FamiliarAbilityKind,
  type CompanionSpeeds,
  type AnimalCompanionTypeDefinition,
  type EidolonTypeDefinition,
  type FamiliarFormDefinition,
  type SpecificFamiliarDefinition,
} from '@/types/companion'
import {
  listAnimalCompanionTypes,
  listEidolonTypes,
  listSpecificFamiliars,
  listFamiliarForms,
} from '@/engine/companionCatalog'
import { FAMILIAR_ABILITY_DEFINITIONS } from '@/data/seeds/familiarAbilities'
import {
  CONSTRUCT_COMPANION_DEFAULT_SENSES,
  CONSTRUCT_COMPANION_IMMUNITIES,
  CONSTRUCT_COMPANION_SOURCE,
  CONSTRUCT_MODIFICATIONS,
  getConstructModification,
} from '@/data/seeds/constructCompanions'
import {
  CONSTRUCT_MODIFICATION_TIER_LABELS,
  type ConstructModificationTier,
} from '@/types/companion'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, StatBox, StatStrip, Tip } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { DataTable } from '@/components/ui/DataTable'
import { RichText } from '@/components/ui/RichText'
import {
  ATTRIBUTE_ABBREVIATIONS,
  RARITY_FILTER_OPTIONS,
  SIZE_FILTER_OPTIONS,
  SIZE_LABELS,
  SKILL_LABELS,
  formatModifier,
  formatCompanionSpeeds,
  formatSpeedMeters,
  TRADITION_LABELS,
} from '@/utils/labels'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { useBrowseSelection } from '@/features/tabs/useBrowseSelection'
import type { TabPointerEvent } from '@/features/tabs/tabPointer'
import { FilterCount } from '@/components/ui/FilterCount'
import { TraitTipList } from '@/components/ui/TraitTip'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import {
  SpecificGrantedAbilityCards,
  SpecificSpecialAbilityCards,
} from '@/features/companions/components/CompanionRulesCard'
import { ImmunityLabelList } from '@/features/defenses/components/DefensesPanel'
import { SenseLabelList } from '@/features/senses/components/SenseRulesCard'

type TabId = 'animals' | 'eidolons' | 'forms' | 'specific' | 'abilities' | 'constructs'

const TAB_KIND: Partial<Record<TabId, CompanionCatalogKind>> = {
  animals: 'animal',
  eidolons: 'eidolon',
  forms: 'familiarForm',
  specific: 'specificFamiliar',
}

interface CompanionBrowserProps {
  animals?: AnimalCompanionTypeDefinition[]
  eidolons?: EidolonTypeDefinition[]
  forms?: FamiliarFormDefinition[]
  specifics?: SpecificFamiliarDefinition[]
  mode?: 'browse' | 'manage'
  previewId?: string | null
  onActiveChange?: (id: string | null, event?: TabPointerEvent) => void
  onCreateHomebrew?: (kind: CompanionCatalogKind) => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'animals', label: 'Companheiros animais' },
  { id: 'eidolons', label: 'Eidolons' },
  { id: 'forms', label: 'Formas de familiar' },
  { id: 'specific', label: 'Familiares específicos' },
  { id: 'abilities', label: 'Habilidades' },
  { id: 'constructs', label: 'Construtos' },
]

const CHASSIS_ID = 'construct-chassis'

const ABILITY_KIND_FILTERS: Array<FamiliarAbilityKind | 'all'> = [
  'all',
  'familiar',
  'pet',
  'master',
]

function sourceBook(source: string): string {
  return source.replace(/\s+pg\.\s*\d+.*$/i, '').trim()
}

function formatSpeeds(speeds: CompanionSpeeds): string {
  return formatCompanionSpeeds(speeds)
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

export function CompanionBrowser({
  animals: animalsProp,
  eidolons: eidolonsProp,
  forms: formsProp,
  specifics: specificsProp,
  mode = 'browse',
  previewId,
  onActiveChange,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: CompanionBrowserProps) {
  const [tab, setTab] = useState<TabId>('animals')
  const [search, setSearch] = useState('')
  const [book, setBook] = useState('all')
  const [abilityKind, setAbilityKind] = useState<FamiliarAbilityKind | 'all'>(
    'all',
  )
  const [modTier, setModTier] = useState<ConstructModificationTier | 'all'>(
    'all',
  )
  const [sizes, setSizes] = useState<CreatureSize[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [provenances, setProvenances] = useState<ProvenanceType[]>([])
  const { activeId, rowProps, setLocalId } = useBrowseSelection(
    previewId,
    onActiveChange,
  )
  const searchRef = useSlashSearch()

  const animals = animalsProp ?? listAnimalCompanionTypes()
  const eidolons = eidolonsProp ?? listEidolonTypes()
  const specifics = specificsProp ?? listSpecificFamiliars()
  const forms = formsProp ?? listFamiliarForms()
  const abilities = useMemo(
    () =>
      [...FAMILIAR_ABILITY_DEFINITIONS].sort((a, b) =>
        a.name.localeCompare(b.name, 'pt-BR'),
      ),
    [],
  )

  const animalBooks = useMemo(() => {
    const set = new Set(animals.map((a) => sourceBook(a.source)))
    return [...set].sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [animals])

  const q = search.trim().toLowerCase()

  const filteredAnimals = useMemo(() => {
    return animals.filter((a) => {
      if (book !== 'all' && sourceBook(a.source) !== book) return false
      if (!matchesSelected(a.size, sizes)) return false
      if (
        provenances.length > 0 &&
        !provenances.includes(
          isHomebrewCompanion(a) ? 'homebrew' : 'official',
        )
      ) {
        return false
      }
      if (!q) return true
      return (
        a.name.toLowerCase().includes(q) ||
        a.originalName.toLowerCase().includes(q) ||
        a.traits.some((t) => t.toLowerCase().includes(q)) ||
        a.source.toLowerCase().includes(q)
      )
    })
  }, [animals, book, sizes, provenances, q])

  const filteredEidolons = useMemo(() => {
    return eidolons.filter((e) => {
      if (
        sizes.length > 0 &&
        !e.sizeOptions.some((s) => sizes.includes(s))
      ) {
        return false
      }
      if (
        provenances.length > 0 &&
        !provenances.includes(
          isHomebrewCompanion(e) ? 'homebrew' : 'official',
        )
      ) {
        return false
      }
      if (!q) return true
      return (
        e.name.toLowerCase().includes(q) ||
        e.originalName.toLowerCase().includes(q) ||
        e.source.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
      )
    })
  }, [eidolons, sizes, provenances, q])

  const filteredSpecifics = useMemo(() => {
    return specifics.filter((f) => {
      if (!matchesSelected(f.rarity ?? 'common', rarities)) return false
      if (
        provenances.length > 0 &&
        !provenances.includes(
          isHomebrewCompanion(f) ? 'homebrew' : 'official',
        )
      ) {
        return false
      }
      if (!q) return true
      return (
        f.name.toLowerCase().includes(q) ||
        f.originalName.toLowerCase().includes(q) ||
        f.traits.some((t) => t.toLowerCase().includes(q)) ||
        f.source.toLowerCase().includes(q)
      )
    })
  }, [specifics, rarities, provenances, q])

  const filteredForms = useMemo(() => {
    return forms.filter((f) => {
      if (
        provenances.length > 0 &&
        !provenances.includes(
          isHomebrewCompanion(f) ? 'homebrew' : 'official',
        )
      ) {
        return false
      }
      if (!q) return true
      return (
        f.name.toLowerCase().includes(q) ||
        f.originalName.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        (f.traits?.some((t) => t.toLowerCase().includes(q)) ?? false)
      )
    })
  }, [forms, provenances, q])

  const filteredAbilities = useMemo(() => {
    return abilities.filter((a) => {
      if (abilityKind !== 'all' && a.kind !== abilityKind) return false
      if (!q) return true
      return (
        a.name.toLowerCase().includes(q) ||
        a.originalName.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      )
    })
  }, [abilities, abilityKind, q])

  const chassisMatches =
    !q ||
    'construto'.includes(q) ||
    'construct'.includes(q) ||
    'protótipo'.includes(q) ||
    'prototype'.includes(q) ||
    'inventor'.includes(q) ||
    'guns'.includes(q)

  const filteredMods = useMemo(() => {
    return CONSTRUCT_MODIFICATIONS.filter((m) => {
      if (modTier !== 'all' && m.tier !== modTier) return false
      if (!q) return true
      return (
        m.name.toLowerCase().includes(q) ||
        m.originalName.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q)
      )
    })
  }, [modTier, q])

  const listIds =
    tab === 'animals'
      ? filteredAnimals.map((a) => a.id)
      : tab === 'eidolons'
        ? filteredEidolons.map((e) => e.id)
        : tab === 'forms'
          ? filteredForms.map((f) => f.id)
        : tab === 'specific'
        ? filteredSpecifics.map((f) => f.id)
        : tab === 'constructs'
          ? [
              ...(modTier === 'all' && chassisMatches ? [CHASSIS_ID] : []),
              ...filteredMods.map((m) => m.id),
            ]
          : filteredAbilities.map((a) => a.id)

  const selectedId =
    activeId && listIds.includes(activeId) ? activeId : null

  const tabShown = listIds.length
  const tabTotal =
    tab === 'animals'
      ? animals.length
      : tab === 'eidolons'
        ? eidolons.length
        : tab === 'forms'
          ? forms.length
        : tab === 'specific'
          ? specifics.length
          : tab === 'constructs'
            ? CONSTRUCT_MODIFICATIONS.length + 1
            : abilities.length

  const activeAnimal =
    tab === 'animals'
      ? (animals.find((a) => a.id === selectedId) ?? null)
      : null
  const activeEidolon =
    tab === 'eidolons'
      ? (eidolons.find((e) => e.id === selectedId) ?? null)
      : null
  const activeForm =
    tab === 'forms'
      ? (forms.find((f) => f.id === selectedId) ?? null)
      : null
  const activeSpecific =
    tab === 'specific'
      ? (specifics.find((f) => f.id === selectedId) ?? null)
      : null
  const activeAbility =
    tab === 'abilities'
      ? (abilities.find((a) => a.id === selectedId) ?? null)
      : null
  const activeChassis = tab === 'constructs' && selectedId === CHASSIS_ID
  const activeMod =
    tab === 'constructs' && selectedId && selectedId !== CHASSIS_ID
      ? (CONSTRUCT_MODIFICATIONS.find((m) => m.id === selectedId) ?? null)
      : null

  const createKind = TAB_KIND[tab]

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {TABS.map((t) => (
          <TabButton
            key={t.id}
            active={tab === t.id}
            onClick={() => {
              setTab(t.id)
              setLocalId(null)
              onActiveChange?.(null)
              setSearch('')
              setBook('all')
              setAbilityKind('all')
              setModTier('all')
              setSizes([])
              setRarities([])
            }}
          >
            {t.label}
          </TabButton>
        ))}
        {mode === 'manage' && createKind && onCreateHomebrew && (
          <Button
            size="sm"
            variant="accent"
            className="ml-auto"
            onClick={() => onCreateHomebrew(createKind)}
          >
            + Criar
          </Button>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 lg:flex-row">
        <div className="flex w-full min-h-0 flex-1 flex-col gap-2 lg:w-80 lg:flex-none lg:shrink-0">
          <Input
            ref={searchRef}
            placeholder={
              tab === 'animals'
                ? 'Buscar companheiro… (/)'
                : tab === 'eidolons'
                  ? 'Buscar eidolon… (/)'
                  : tab === 'forms'
                    ? 'Buscar forma de familiar… (/)'
                  : tab === 'specific'
                  ? 'Buscar familiar específico… (/)'
                  : tab === 'constructs'
                    ? 'Buscar construto / modificação… (/)'
                    : 'Buscar habilidade… (/)'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterCount shown={tabShown} total={tabTotal} />
          {(tab === 'animals' || tab === 'eidolons') && (
            <MultiFilter
              label="Tamanho"
              options={SIZE_FILTER_OPTIONS}
              selected={sizes}
              onChange={setSizes}
              emptyLabel="Todos"
            />
          )}
          {tab === 'specific' && (
            <MultiFilter
              label="Raridade"
              options={RARITY_FILTER_OPTIONS}
              selected={rarities}
              onChange={setRarities}
              emptyLabel="Todas"
            />
          )}
          {mode === 'manage' && createKind && (
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
          {tab === 'animals' && (
            <Select value={book} onChange={(e) => setBook(e.target.value)}>
              <option value="all">Todos os livros</option>
              {animalBooks.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          )}
          {tab === 'abilities' && (
            <div className="flex flex-wrap gap-1">
              {ABILITY_KIND_FILTERS.map((k) => (
                <TabButton
                  key={k}
                  active={abilityKind === k}
                  onClick={() => setAbilityKind(k)}
                >
                  {k === 'all' ? 'Todas' : FAMILIAR_ABILITY_KIND_LABELS[k]}
                </TabButton>
              ))}
            </div>
          )}
          {tab === 'constructs' && (
            <div className="flex flex-wrap gap-1">
              {(
                [
                  'all',
                  'initial',
                  'breakthrough',
                  'revolutionary',
                ] as const
              ).map((k) => (
                <TabButton
                  key={k}
                  active={modTier === k}
                  onClick={() => setModTier(k)}
                >
                  {k === 'all'
                    ? 'Todas'
                    : CONSTRUCT_MODIFICATION_TIER_LABELS[k]}
                </TabButton>
              ))}
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-y-auto rounded-xl border border-border bg-surface-1">
            <ul className="divide-y divide-border">
              {tab === 'animals' &&
                filteredAnimals.map((a) => {
                  const selected = a.id === selectedId
                  return (
                    <li key={a.id}>
                      <button
                        type="button"
                        {...rowProps(a.id)}
                        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-muted hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text">
                            {a.name}
                          </span>
                          {isHomebrewCompanion(a) && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                        </span>
                        <span className="mt-0.5 text-[11px] text-text-dim">
                          {a.originalName} · {SIZE_LABELS[a.size]} ·{' '}
                          {sourceBook(a.source)}
                        </span>
                      </button>
                    </li>
                  )
                })}
              {tab === 'eidolons' &&
                filteredEidolons.map((e) => {
                  const selected = e.id === selectedId
                  return (
                    <li key={e.id}>
                      <button
                        type="button"
                        {...rowProps(e.id)}
                        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-muted hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text">
                            {e.name}
                          </span>
                          {isHomebrewCompanion(e) && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                        </span>
                        <span className="mt-0.5 text-[11px] text-text-dim">
                          {e.originalName} · {sourceBook(e.source)}
                        </span>
                      </button>
                    </li>
                  )
                })}
              {tab === 'forms' &&
                filteredForms.map((f) => {
                  const selected = f.id === selectedId
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        {...rowProps(f.id)}
                        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-muted hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text">
                            {f.name}
                          </span>
                          {isHomebrewCompanion(f) && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                        </span>
                        <span className="mt-0.5 text-[11px] text-text-dim">
                          {f.originalName}
                          {f.innateAbilityIds.length
                            ? ` · ${f.innateAbilityIds.length} inata${f.innateAbilityIds.length > 1 ? 's' : ''}`
                            : ' · sem inatas'}
                        </span>
                      </button>
                    </li>
                  )
                })}
              {tab === 'specific' &&
                filteredSpecifics.map((f) => {
                  const selected = f.id === selectedId
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        {...rowProps(f.id)}
                        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-muted hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text">
                            {f.name}
                          </span>
                          {isHomebrewCompanion(f) && (
                            <ProvenanceBadge type="homebrew" />
                          )}
                        </span>
                        <span className="mt-0.5 text-[11px] text-text-dim">
                          {f.originalName} · {f.requiredAbilities} habilidades
                          · {sourceBook(f.source)}
                        </span>
                      </button>
                    </li>
                  )
                })}
              {tab === 'abilities' &&
                filteredAbilities.map((a) => {
                  const selected = a.id === selectedId
                  return (
                    <li key={a.id}>
                      <button
                        type="button"
                        {...rowProps(a.id)}
                        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-muted hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text">
                            {a.name}
                          </span>
                          <Badge className="!text-[9px]">
                            {FAMILIAR_ABILITY_KIND_LABELS[a.kind]}
                          </Badge>
                        </span>
                        <span className="mt-0.5 text-[11px] text-text-dim">
                          {a.originalName} · {sourceBook(a.source)}
                        </span>
                      </button>
                    </li>
                  )
                })}
              {tab === 'constructs' &&
                listIds.includes(CHASSIS_ID) && (
                  <li>
                    <button
                      type="button"
                      {...rowProps(CHASSIS_ID)}
                      className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                        selectedId === CHASSIS_ID
                          ? 'bg-accent/15 text-accent'
                          : 'text-text-muted hover:bg-surface-2'
                      }`}
                    >
                      <span className="text-sm font-medium text-text">
                        Chassi protótipo
                      </span>
                      <span className="mt-0.5 text-[11px] text-text-dim">
                        Companheiro construto protótipo · Guns & Gears
                      </span>
                    </button>
                  </li>
                )}
              {tab === 'constructs' &&
                filteredMods.map((m) => {
                  const selected = m.id === selectedId
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        {...rowProps(m.id)}
                        className={`flex w-full flex-col px-3 py-2.5 text-left transition-colors ${
                          selected
                            ? 'bg-accent/15 text-accent'
                            : 'text-text-muted hover:bg-surface-2'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text">
                            {m.name}
                          </span>
                          <Badge className="!text-[9px]">
                            {CONSTRUCT_MODIFICATION_TIER_LABELS[m.tier]}
                          </Badge>
                        </span>
                        <span className="mt-0.5 text-[11px] text-text-dim">
                          {m.originalName}
                        </span>
                      </button>
                    </li>
                  )
                })}
              {listIds.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-text-dim">
                  Nada encontrado.
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto">
          {tab === 'animals' && activeAnimal && (
            <>
              <ManageBar
                mode={mode}
                homebrew={isHomebrewCompanion(activeAnimal)}
                id={activeAnimal.id}
                onDuplicate={onDuplicate}
                onEditHomebrew={onEditHomebrew}
              />
            <Panel
              title={activeAnimal.name}
              subtitle={activeAnimal.originalName}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge tone="info">{SIZE_LABELS[activeAnimal.size]}</Badge>
                  {activeAnimal.isMount && <Badge>Montaria</Badge>}
                  {activeAnimal.minLevel != null && (
                    <Badge>Avançado · nv. {activeAnimal.minLevel}+</Badge>
                  )}
                  <Badge>{activeAnimal.source}</Badge>
                  {activeAnimal.traits.map((t) => (
                    <Badge key={t} className="!text-[9px]">
                      {localizeTraitLabel(t)}
                    </Badge>
                  ))}
                </div>
                <RichText as="p" className="text-sm text-text-muted">
                  {polishRulesText(activeAnimal.description)}
                </RichText>
                {activeAnimal.special && (
                  <p className="text-xs text-text-dim">
                    {polishRulesText(activeAnimal.special)}
                  </p>
                )}
                <Tip>
                  Ficha jovem. Na ficha do personagem, PV = PV do tipo + (6 +
                  CON) × nível do mestre; CA, ataques e avanço são calculados
                  automaticamente.
                </Tip>
                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Avanço do companheiro
                  </h3>
                  <DataTable
                    compact
                    caption="Estágios vêm de feitos (Companheiro Maduro, Ágil/Feroz, Especializado), não do nível sozinho. PV = PV do tipo + (6 + CON) × nível do mestre."
                    columns={[
                      { key: 'stage', label: 'Estágio' },
                      { key: 'attrs', label: 'Atributos' },
                      { key: 'size', label: 'Tamanho' },
                      { key: 'dice', label: 'Dados', align: 'center' },
                      { key: 'extra', label: 'Extra', align: 'center' },
                    ]}
                    rows={[
                      {
                        key: 'young',
                        highlighted: true,
                        cells: [
                          'Jovem',
                          'Ficha base',
                          'Base',
                          '1',
                          '—',
                        ],
                      },
                      {
                        key: 'mature',
                        cells: [
                          'Maduro',
                          '+1 For/Des/Con/Sab',
                          '+1 se Miúdo–Médio',
                          '2',
                          '—',
                        ],
                      },
                      {
                        key: 'nimble',
                        cells: [
                          'Ágil',
                          'Maduro + Des+2, For/Con/Sab+1',
                          'Como maduro',
                          '2',
                          '+2',
                        ],
                      },
                      {
                        key: 'savage',
                        cells: [
                          'Feroz',
                          'Maduro + For+2, Des/Con/Sab+1',
                          '+1 extra se Miúdo–Médio',
                          '2',
                          '+3',
                        ],
                      },
                      {
                        key: 'specialized',
                        cells: [
                          'Especializado',
                          'Caminho + Int+2, Des+1 + especialização',
                          'Conforme o caminho',
                          '3',
                          '+4 ágil / +6 feroz',
                        ],
                      },
                    ]}
                  />
                </div>
                <StatStrip>
                  {ATTRIBUTE_IDS.map((id) => (
                    <StatBox
                      key={id}
                      flush
                      label={ATTRIBUTE_ABBREVIATIONS[id]}
                      value={formatModifier(activeAnimal.attributes[id])}
                    />
                  ))}
                </StatStrip>
                <div className="grid gap-2 sm:grid-cols-3">
                  <StatBox
                    label="PV do tipo"
                    value={activeAnimal.ancestryHitPoints}
                  />
                  <StatBox
                    label="Perícia"
                    value={
                      activeAnimal.skill
                        ? SKILL_LABELS[activeAnimal.skill]
                        : '—'
                    }
                  />
                  <StatBox
                    label="Velocidade"
                    value={formatSpeeds(activeAnimal.speeds)}
                  />
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Sentidos
                  </h3>
                  <SenseLabelList labels={activeAnimal.senses} />
                </div>
                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Ataques (jovem)
                  </h3>
                  <ul className="space-y-1">
                    {activeAnimal.attacks.map((atk) => (
                      <li
                        key={atk.id}
                        className="rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-1.5 text-sm"
                      >
                        <span className="font-medium text-text">{atk.name}</span>
                        <span className="text-text-dim">
                          {' '}
                          {atk.damageDie} {atk.damageType}
                          {atk.traits.length > 0 ? (
                            <>
                              {' · '}
                              <TraitTipList traits={atk.traits} />
                            </>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Benefício de suporte
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {polishRulesText(activeAnimal.supportBenefit)}
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Manobra avançada
                    <ActionCost
                      type={activeAnimal.advancedManeuver.actionType}
                    />
                  </h3>
                  <p className="text-sm font-medium text-text">
                    {activeAnimal.advancedManeuver.name}
                    <span className="ml-1.5 text-xs font-normal text-text-dim">
                      {activeAnimal.advancedManeuver.originalName}
                    </span>
                  </p>
                  {activeAnimal.advancedManeuver.requirements && (
                    <p className="mt-0.5 text-xs text-text-dim">
                      {polishRulesText(activeAnimal.advancedManeuver.requirements)}
                    </p>
                  )}
                  <RichText
                    as="p"
                    className="mt-1 text-sm leading-relaxed text-text-muted"
                  >
                    {polishRulesText(activeAnimal.advancedManeuver.description)}
                  </RichText>
                </div>
              </div>
            </Panel>
            </>
          )}

          {tab === 'eidolons' && activeEidolon && (
            <>
              <ManageBar
                mode={mode}
                homebrew={isHomebrewCompanion(activeEidolon)}
                id={activeEidolon.id}
                onDuplicate={onDuplicate}
                onEditHomebrew={onEditHomebrew}
              />
            <Panel
              title={activeEidolon.name}
              subtitle={activeEidolon.originalName}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge>{activeEidolon.source}</Badge>
                  {activeEidolon.tradition && (
                    <Badge tone="info">{TRADITION_LABELS[activeEidolon.tradition]}</Badge>
                  )}
                  {activeEidolon.traits.map((t) => (
                    <Badge key={t} className="!text-[9px]">
                      {localizeTraitLabel(t)}
                    </Badge>
                  ))}
                </div>
                <RichText
                  as="p"
                  className="text-sm leading-relaxed text-text-muted"
                >
                  {polishRulesText(activeEidolon.description)}
                </RichText>
                <p className="text-xs text-text-dim">
                  Plano: {activeEidolon.homePlane} · Idioma:{' '}
                  {activeEidolon.language} · Ataques sugeridos:{' '}
                  {activeEidolon.suggestedAttacks}
                </p>
                {activeEidolon.senses.length > 0 ? (
                  <div>
                    <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                      Sentidos
                    </h3>
                    <SenseLabelList labels={activeEidolon.senses} />
                  </div>
                ) : null}
                <div>
                  <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Inicial
                  </h3>
                  <p className="text-sm font-medium text-text">
                    {activeEidolon.initialAbility.name}
                  </p>
                  <RichText
                    as="p"
                    className="mt-1 text-sm leading-relaxed text-text-muted"
                  >
                    {polishRulesText(activeEidolon.initialAbility.description)}
                  </RichText>
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Simbiose (7º)
                  </h3>
                  <p className="text-sm font-medium text-text">
                    {activeEidolon.symbiosisAbility.name}
                  </p>
                  <RichText
                    as="p"
                    className="mt-1 text-sm leading-relaxed text-text-muted"
                  >
                    {polishRulesText(activeEidolon.symbiosisAbility.description)}
                  </RichText>
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Transcendência (17º)
                  </h3>
                  <p className="text-sm font-medium text-text">
                    {activeEidolon.transcendenceAbility.name}
                  </p>
                  <RichText
                    as="p"
                    className="mt-1 text-sm leading-relaxed text-text-muted"
                  >
                    {polishRulesText(activeEidolon.transcendenceAbility.description)}
                  </RichText>
                </div>
              </div>
            </Panel>
            </>
          )}

          {tab === 'forms' && activeForm && (
            <>
              <ManageBar
                mode={mode}
                homebrew={isHomebrewCompanion(activeForm)}
                id={activeForm.id}
                onDuplicate={onDuplicate}
                onEditHomebrew={onEditHomebrew}
              />
            <Panel title={activeForm.name} subtitle={activeForm.originalName}>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge>{activeForm.source}</Badge>
                  {activeForm.traits?.map((t) => (
                    <Badge key={t} className="!text-[9px]">
                      {localizeTraitLabel(t)}
                    </Badge>
                  ))}
                </div>
                <RichText
                  as="p"
                  className="text-sm leading-relaxed text-text-muted"
                >
                  {polishRulesText(activeForm.description)}
                </RichText>
                <Tip>
                  Familiar genérico: stats iguais para todas as formas. As
                  inatas abaixo entram nos slots da ficha e não trocam nas
                  preparações. Familiares específicos continuam na aba ao lado.
                </Tip>
                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Habilidades inatas
                  </h3>
                  {activeForm.innateAbilityIds.length === 0 ? (
                    <p className="text-sm text-text-dim">
                      Nenhuma travada — você escolhe tudo na ficha.
                    </p>
                  ) : (
                    <ul className="space-y-1.5">
                      {activeForm.innateAbilityIds.map((id) => {
                        const def = FAMILIAR_ABILITY_DEFINITIONS.find(
                          (a) => a.id === id,
                        )
                        return (
                          <li key={id}>
                            <ExpandableCard
                              compact
                              title={def?.name ?? id}
                              badges={
                                def ? (
                                  <Badge className="!text-[9px]">
                                    {FAMILIAR_ABILITY_KIND_LABELS[def.kind]}
                                  </Badge>
                                ) : undefined
                              }
                            >
                              {def ? (
                                <RichText as="p">{polishRulesText(def.description)}</RichText>
                              ) : null}
                            </ExpandableCard>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </Panel>
            </>
          )}

          {tab === 'specific' && activeSpecific && (
            <>
              <ManageBar
                mode={mode}
                homebrew={isHomebrewCompanion(activeSpecific)}
                id={activeSpecific.id}
                onDuplicate={onDuplicate}
                onEditHomebrew={onEditHomebrew}
              />
            <Panel
              title={activeSpecific.name}
              subtitle={activeSpecific.originalName}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeSpecific.rarity && (
                    <RarityBadge rarity={activeSpecific.rarity} />
                  )}
                  <Badge tone="info">
                    {activeSpecific.requiredAbilities} habilidades
                  </Badge>
                  <Badge>{activeSpecific.source}</Badge>
                  {activeSpecific.traits.map((t) => (
                    <Badge key={t} className="!text-[9px]">
                      {localizeTraitLabel(t)}
                    </Badge>
                  ))}
                </div>
                <RichText as="p" className="text-sm text-text-muted">
                  {polishRulesText(activeSpecific.description)}
                </RichText>
                {activeSpecific.accessHint && (
                  <p className="text-xs text-text-dim">
                    {activeSpecific.accessHint}
                  </p>
                )}
                <Tip>
                  Familiar específico: o número de habilidades já vem preenchido
                  pelas concedidas abaixo. Na ficha, o familiar ainda é montado
                  por habilidades avulsas — isto é só consulta.
                </Tip>
                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Habilidades concedidas
                  </h3>
                  <SpecificGrantedAbilityCards
                    granted={activeSpecific.grantedAbilities}
                  />
                </div>
                {activeSpecific.specialAbilities.length > 0 ? (
                  <div className="space-y-2">
                    <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                      Poderes do tipo
                    </h3>
                    <SpecificSpecialAbilityCards
                      abilities={activeSpecific.specialAbilities}
                    />
                  </div>
                ) : null}
              </div>
            </Panel>
            </>
          )}

          {tab === 'abilities' && activeAbility && (
            <Panel
              title={activeAbility.name}
              subtitle={activeAbility.originalName}
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge tone="accent">
                    {FAMILIAR_ABILITY_KIND_LABELS[activeAbility.kind]}
                  </Badge>
                  {activeAbility.minLevel != null && (
                    <Badge>nv. {activeAbility.minLevel}+</Badge>
                  )}
                  {activeAbility.repeatable && <Badge>Repetível</Badge>}
                  {activeAbility.changesCreatureTrait && (
                    <Badge>Troca traço</Badge>
                  )}
                  <Badge>{activeAbility.source}</Badge>
                </div>
                <RichText
                  as="p"
                  className="text-sm leading-relaxed text-text-muted"
                >
                  {polishRulesText(activeAbility.description)}
                </RichText>
                {activeAbility.prerequisiteHint && (
                  <p className="text-xs text-text-dim">
                    Pré-requisito: {activeAbility.prerequisiteHint}
                  </p>
                )}
                <Tip>
                  Mascote usa só habilidades de mascote. Familiar escolhe familiar +
                  mestre (2 slots por dia, + extras). Não dá para ter familiar e
                  mascote ao mesmo tempo.
                </Tip>
              </div>
            </Panel>
          )}

          {tab === 'constructs' && activeChassis && (
            <Panel
              title="Chassi protótipo"
              subtitle="Companheiro construto protótipo"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge tone="info">Pequeno ou Médio</Badge>
                  <Badge>construto · lacaio</Badge>
                  <Badge>{CONSTRUCT_COMPANION_SOURCE}</Badge>
                </div>
                <Tip>
                  Guns &amp; Gears (Remastered) não tem companheiros animais
                  nomeados. O Inventor monta um construto customizável. Clockwork
                  Familiar (Grand Bazaar) é pré-Remaster e não entra. Não combina com
                  companheiro animal; familiar ainda pode coexistir. PV = 10 +
                  (6 + CON) × nível.
                </Tip>
                <StatStrip>
                  <StatBox flush label="FOR" value="+3" />
                  <StatBox flush label="DES" value="+3" />
                  <StatBox flush label="CON" value="+2" />
                  <StatBox flush label="INT" value="−4" />
                  <StatBox flush label="SAB" value="+1" />
                  <StatBox flush label="CAR" value="+0" />
                </StatStrip>
                <div className="grid gap-2 sm:grid-cols-3">
                  <StatBox label="PV base" value={10} />
                  <StatBox label="Velocidade" value={formatSpeedMeters(25)} />
                  <StatBox label="Treinado" value="desarmado, CA, salv., Perc, Acr, Atl" />
                </div>
                <div>
                  <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Ataques
                  </h3>
                  <ul className="space-y-1 text-sm text-text-muted">
                    <li>Golpe 1d8 contundente</li>
                    <li>Golpe ágil 1d6 cortante ou perfurante (ágil, sutileza)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Sentidos
                  </h3>
                  <SenseLabelList labels={CONSTRUCT_COMPANION_DEFAULT_SENSES} />
                </div>
                <div>
                  <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
                    Imunidades
                  </h3>
                  <ImmunityLabelList labels={CONSTRUCT_COMPANION_IMMUNITIES} />
                </div>
                <p className="text-sm leading-relaxed text-text-muted">
                  Avanço: protótipo → avançado → incrível → paragão (feitos de
                  Inventor). Uma modificação inicial no 1º, avanço no 7º,
                  revolucionária no 15º.
                </p>
              </div>
            </Panel>
          )}

          {tab === 'constructs' && activeMod && (
            <Panel title={activeMod.name} subtitle={activeMod.originalName}>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge tone="accent">
                    {CONSTRUCT_MODIFICATION_TIER_LABELS[activeMod.tier]}
                  </Badge>
                  {activeMod.minLevel != null && (
                    <Badge>nv. {activeMod.minLevel}+</Badge>
                  )}
                  <Badge>{activeMod.source}</Badge>
                </div>
                <RichText
                  as="p"
                  className="text-sm leading-relaxed text-text-muted"
                >
                  {polishRulesText(activeMod.description)}
                </RichText>
                {activeMod.prerequisiteModificationId && (
                  <p className="text-xs text-text-dim">
                    Exige:{' '}
                    {getConstructModification(
                      activeMod.prerequisiteModificationId,
                    )?.name ?? activeMod.prerequisiteModificationId}
                  </p>
                )}
                <Tip>
                  Só consulta. Na ficha do personagem, escolha as modificações
                  no painel do companheiro construto — o motor aplica
                  velocidade, sentidos, PV e ataques.
                </Tip>
              </div>
            </Panel>
          )}

          {!selectedId && (
            <Panel title="Compêndio" subtitle="Escolha à esquerda">
              <p className="text-sm text-text-muted">
                Selecione um item para ver a ficha. Nada daqui é aplicado à ficha
                do personagem.
              </p>
              {mode === 'manage' && (
                <Tip>
                  Nada homebrew vem pronto. Crie um tipo na aba atual ou
                  duplique um oficial (Lobo, Aberração, Corvo…). Construto e
                  habilidades de familiar continuam só consulta.
                </Tip>
              )}
            </Panel>
          )}
        </div>
      </div>
    </div>
  )
}

function ManageBar({
  mode,
  homebrew,
  id,
  onDuplicate,
  onEditHomebrew,
}: {
  mode: 'browse' | 'manage'
  homebrew: boolean
  id: string
  onDuplicate?: (id: string) => void
  onEditHomebrew?: (id: string) => void
}) {
  if (mode !== 'manage') return null
  return (
    <div className="mb-3 flex flex-wrap gap-2">
      {onDuplicate && (
        <Button onClick={() => onDuplicate(id)}>Duplicar como Homebrew</Button>
      )}
      {homebrew && onEditHomebrew && (
        <Button variant="accent" onClick={() => onEditHomebrew(id)}>
          Editar Homebrew
        </Button>
      )}
    </div>
  )
}
