import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type {
  CharacterClass,
  ClassCatalogDefinition,
  ClassCatalogOption,
  ClassChoices,
} from '@/types'
import { ITEM_DEFINITIONS } from '@/data/seeds/equipment'
import { getClassCatalogs } from '@/data/seeds/catalogs'
import {
  catalogPreparedSlotCount,
  catalogRepertoireIds,
  effectiveCatalogSlotCount,
  getCatalogPicks,
  getCatalogPrepared,
  toggleCatalogPick,
  hydrateCatalogPrepared,
  visibleCatalogOptions,
} from '@/engine/classCatalog'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { Panel, Tip } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'

function Chip({
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

function setList(
  choices: ClassChoices,
  key: 'catalogPicks' | 'catalogPrepared',
  catalogId: string,
  ids: string[],
): ClassChoices {
  return {
    ...choices,
    [key]: { ...(choices[key] ?? {}), [catalogId]: ids },
  }
}

function toggleId(list: string[], id: string, unique: boolean, max: number) {
  if (list.includes(id)) return list.filter((x) => x !== id)
  if (list.length >= max) return list
  void unique
  return [...list, id]
}

function WeaponPicker({
  value,
  onChange,
}: {
  value?: string
  onChange: (id: string) => void
}) {
  const [q, setQ] = useState('')
  const weapons = useMemo(() => {
    const query = q.trim().toLowerCase()
    return ITEM_DEFINITIONS.filter((item) => {
      if (item.category !== 'weapon' || !item.weapon) return false
      if (item.level > 0) return false
      const prof = item.weapon.proficiency
      if (prof !== 'simple' && prof !== 'martial' && prof !== 'advanced') {
        return false
      }
      if (!query) return true
      return (
        item.name.toLowerCase().includes(query) ||
        item.originalName.toLowerCase().includes(query)
      )
    }).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  }, [q])

  const weaponPool = useMemo(
    () =>
      ITEM_DEFINITIONS.filter((item) => {
        if (item.category !== 'weapon' || !item.weapon) return false
        if (item.level > 0) return false
        const prof = item.weapon.proficiency
        return prof === 'simple' || prof === 'martial' || prof === 'advanced'
      }).length,
    [],
  )

  const PROF: Record<string, string> = {
    simple: 'Simples',
    martial: 'Marcial',
    advanced: 'Avançada',
  }

  return (
    <div className="space-y-2">
      <Input
        placeholder="Buscar arma de 0º…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <FilterCount shown={weapons.length} total={weaponPool} />
      <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
        {weapons.map((item) => {
          const selected = value === item.id
          const prof = item.weapon?.proficiency ?? 'simple'
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`flex w-full items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-left text-xs ${
                selected
                  ? 'border-accent bg-accent/15 text-accent'
                  : 'border-border bg-surface-2 hover:border-border-strong'
              }`}
            >
              <span>
                <span className="font-medium text-text">{item.name}</span>
                <span className="ml-1.5 text-text-dim">{item.originalName}</span>
              </span>
              <span className="shrink-0 text-text-dim">
                {PROF[prof]} · {item.weapon?.damageDie}{' '}
                {item.weapon?.rangeType === 'ranged' ? 'à dist.' : 'c. a c.'}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepperButton({
  label,
  disabled,
  onClick,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface-3 text-xs font-medium text-text hover:border-accent/50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {label === 'Adicionar' ? '+' : '−'}
    </button>
  )
}

function OptionCard({
  option,
  catalog,
  selected,
  prepared,
  preparedCount = 0,
  primary,
  disabled,
  showPrepare,
  showPrimary,
  prepareFull,
  onToggle,
  onPrepare,
  onRemovePrepared,
  onPrimary,
}: {
  option: ClassCatalogOption
  catalog: ClassCatalogDefinition
  selected: boolean
  prepared?: boolean
  preparedCount?: number
  primary?: boolean
  disabled?: boolean
  showPrepare?: boolean
  showPrimary?: boolean
  prepareFull?: boolean
  onToggle: () => void
  onPrepare?: () => void
  onRemovePrepared?: () => void
  onPrimary?: () => void
}) {
  const catLabel = option.category
    ? catalog.categoryLabels?.[option.category] ?? option.category
    : null
  const prepareToolbar =
    (showPrepare && onPrepare) || (showPrimary && onPrimary) ? (
      <div className="flex flex-wrap items-center gap-1.5">
        {showPrepare && onPrepare ? (
          catalog.allowPreparedDuplicates ? (
            <div className="flex items-center gap-1">
              <StepperButton
                label="Remover"
                disabled={!preparedCount}
                onClick={() => onRemovePrepared?.()}
              />
              <span
                className={`min-w-[5.5rem] text-center text-[10px] font-medium ${
                  preparedCount > 0 ? 'text-accent' : 'text-text-muted'
                }`}
              >
                {preparedCount > 0
                  ? `Hoje ×${preparedCount}`
                  : 'Preparar hoje'}
              </span>
              <StepperButton
                label="Adicionar"
                disabled={prepareFull}
                onClick={onPrepare}
              />
            </div>
          ) : (
            <Chip
              selected={Boolean(prepared)}
              disabled={Boolean(prepareFull && !prepared)}
              onClick={onPrepare}
            >
              {prepared ? 'Preparada hoje' : 'Preparar hoje'}
            </Chip>
          )
        ) : null}
        {showPrimary && onPrimary ? (
          <Chip selected={Boolean(primary)} onClick={onPrimary}>
            {catalog.primaryPick?.label ?? 'Primária'}
          </Chip>
        ) : null}
      </div>
    ) : undefined
  return (
    <ExpandableCard
      selected={selected || preparedCount > 0}
      title={option.name}
      subtitle={[
        option.originalName,
        option.usage ? `Uso: ${option.usage}` : null,
      ]
        .filter(Boolean)
        .join(' · ')}
      badges={
        <>
          {catLabel && <Badge>{catLabel}</Badge>}
          {option.level != null && option.level > 1 && (
            <Badge>Nv. {option.level}</Badge>
          )}
          {option.actionType && option.actionType !== 'passive' && (
            <ActionCost type={option.actionType} />
          )}
          {option.traits?.map((t) => (
            <Badge key={t} className="!text-[9px]">
              {localizeTraitLabel(t)}
            </Badge>
          ))}
          {primary && <Badge tone="accent">Primária</Badge>}
          {preparedCount > 0 && !primary && (
            <Badge tone="info">
              {preparedCount > 1 ? `Preparada ×${preparedCount}` : 'Preparada'}
            </Badge>
          )}
        </>
      }
      actions={
        <button
          type="button"
          disabled={disabled && !selected}
          onClick={onToggle}
          className={`rounded-md border px-2 py-1 text-[10px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            selected
              ? 'border-accent bg-accent/20 text-accent'
              : 'border-border bg-surface-3 text-text-muted hover:border-accent/50 hover:text-text'
          }`}
        >
          {selected ? 'Selecionado' : 'Escolher'}
        </button>
      }
      toolbar={prepareToolbar}
    >
      <RichText as="p" className="leading-relaxed">
        {polishRulesText(option.rulesSummary)}
      </RichText>
      {option.sections && option.sections.length > 0 && (
        <ul className="space-y-1.5 border-t border-border/60 pt-2">
          {option.sections.map((s) => (
            <li key={s.label} className="leading-relaxed text-text-muted">
              <span className="font-medium text-text">{s.label}</span>
              {s.actionType && s.actionType !== 'passive' ? (
                <span className="ml-1 inline-flex align-middle">
                  <ActionCost type={s.actionType} />
                </span>
              ) : null}
              {': '}
              <RichText>{polishRulesText(s.body)}</RichText>
            </li>
          ))}
        </ul>
      )}
    </ExpandableCard>
  )
}

interface ClassCatalogPickerProps {
  catalog: ClassCatalogDefinition
  allCatalogs?: ClassCatalogDefinition[]
  choices: ClassChoices
  level: number
  intelligenceModifier?: number
  onChange: (next: ClassChoices) => void
}

export function ClassCatalogPicker({
  catalog,
  allCatalogs,
  choices,
  level,
  intelligenceModifier = 0,
  onChange,
}: ClassCatalogPickerProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string | 'all'>('all')

  const needed = effectiveCatalogSlotCount(
    catalog,
    choices,
    level,
    intelligenceModifier,
  )
  const preparedNeeded = catalogPreparedSlotCount(
    catalog,
    level,
    intelligenceModifier,
  )
  const catalogs = allCatalogs?.length ? allCatalogs : [catalog]
  const visible = visibleCatalogOptions(catalog, choices, level)
  const picks =
    catalog.kind === 'daily'
      ? getCatalogPrepared(choices, catalog.id)
      : getCatalogPicks(choices, catalog.id)
  const prepared = getCatalogPrepared(choices, catalog.id)
  const repertoire = catalogRepertoireIds(catalog, choices)
  const preparedFull = prepared.length >= preparedNeeded
  const primary = choices.catalogPrimary?.[catalog.id]

  const categories = useMemo(() => {
    const set = new Set<string>()
    for (const o of visible) {
      if (o.category) set.add(o.category)
    }
    return [...set]
  }, [visible])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return visible.filter((o) => {
      if (category !== 'all' && o.category !== category) return false
      if (!q) return true
      return (
        o.name.toLowerCase().includes(q) ||
        o.originalName.toLowerCase().includes(q) ||
        (o.rulesSummary ?? '').toLowerCase().includes(q)
      )
    })
  }, [visible, search, category])

  if (needed <= 0 && preparedNeeded <= 0 && !catalog.details?.length) {
    return catalog.emptyHint ? (
      <Panel title={catalog.label} subtitle={catalog.originalName}>
        <p className="text-xs text-text-dim">{polishRulesText(catalog.emptyHint)}</p>
      </Panel>
    ) : null
  }

  const detailsToShow = (catalog.details ?? []).filter((d) => {
    if (d.subclassIds?.length) {
      if (
        !choices.subclassId ||
        !d.subclassIds.includes(choices.subclassId)
      ) {
        return false
      }
    }
    if (d.showWhenOptionIds?.length) {
      const pool = [
        choices.subclassId,
        ...getCatalogPicks(choices, catalog.id),
        ...getCatalogPrepared(choices, catalog.id),
      ]
      if (!d.showWhenOptionIds.some((id) => pool.includes(id))) return false
    }
    return true
  })

  function patchDetails(id: string, value: string) {
    onChange({
      ...choices,
      catalogDetails: { ...(choices.catalogDetails ?? {}), [id]: value },
    })
  }

  function toggleMain(id: string) {
    onChange(
      toggleCatalogPick(
        catalog,
        catalogs,
        choices,
        id,
        level,
        intelligenceModifier,
      ),
    )
  }

  function togglePrepared(id: string) {
    if (catalog.preparedFromPicks && !repertoire.has(id)) return
    if (catalog.allowPreparedDuplicates) {
      if (prepared.length >= preparedNeeded) return
      onChange(setList(choices, 'catalogPrepared', catalog.id, [...prepared, id]))
      return
    }
    const next = toggleId(prepared, id, true, preparedNeeded)
    onChange(setList(choices, 'catalogPrepared', catalog.id, next))
  }

  function removePreparedOne(id: string) {
    const idx = prepared.lastIndexOf(id)
    if (idx < 0) return
    const next = [...prepared.slice(0, idx), ...prepared.slice(idx + 1)]
    onChange(setList(choices, 'catalogPrepared', catalog.id, next))
  }

  function setPrimary(id: string) {
    onChange({
      ...choices,
      catalogPrimary: { ...(choices.catalogPrimary ?? {}), [catalog.id]: id },
    })
  }

  const vialMax = 2 + Math.max(0, intelligenceModifier)
  const infusedMax = 4 + Math.max(0, intelligenceModifier)

  return (
    <Panel
      title={catalog.label}
      subtitle={
        catalog.kind === 'daily'
          ? `${picks.length}/${needed} sintonizadas`
          : `${picks.length}/${needed}${
              preparedNeeded > 0
                ? ` · ${prepared.length}/${preparedNeeded} preparadas`
                : ''
            }`
      }
    >
      <RichText as="p" className="mb-3 text-xs text-text-dim">
        {polishRulesText(catalog.description)}
      </RichText>

      {detailsToShow.map((detail) => (
        <div key={detail.id} className="mb-3">
          <div className="mb-1.5 text-xs font-medium text-text">{detail.label}</div>
          {detail.description && (
            <RichText as="p" className="mb-1.5 text-[11px] text-text-dim">
              {polishRulesText(detail.description)}
            </RichText>
          )}
          {detail.kind === 'choice' && (
            <div className="flex flex-wrap gap-1.5">
              {detail.options?.map((opt) => (
                <Chip
                  key={opt.id}
                  selected={choices.catalogDetails?.[detail.id] === opt.id}
                  onClick={() =>
                    patchDetails(
                      detail.id,
                      choices.catalogDetails?.[detail.id] === opt.id ? '' : opt.id,
                    )
                  }
                >
                  {opt.name}
                </Chip>
              ))}
            </div>
          )}
          {detail.kind === 'choice' &&
            detail.options?.find(
              (o) => o.id === choices.catalogDetails?.[detail.id],
            )?.rulesSummary && (
              <p className="mt-1.5 text-[11px] text-text-muted">
                {polishRulesText(
                  detail.options.find(
                    (o) => o.id === choices.catalogDetails?.[detail.id],
                  )?.rulesSummary ?? '',
                )}
              </p>
            )}
          {detail.kind === 'weapon' && (
            <WeaponPicker
              value={choices.catalogDetails?.[detail.id]}
              onChange={(id) => patchDetails(detail.id, id)}
            />
          )}
          {detail.kind === 'counter' && (
            <div className="flex items-center gap-2 text-xs">
              <Input
                type="number"
                min={0}
                max={
                  detail.counterKind === 'versatileVials' ? vialMax : infusedMax
                }
                className="w-20"
                value={choices.catalogDetails?.[detail.id] ?? ''}
                placeholder={String(
                  detail.counterKind === 'versatileVials' ? vialMax : infusedMax,
                )}
                onChange={(e) => patchDetails(detail.id, e.target.value)}
              />
              <span className="text-text-dim">
                máximo{' '}
                {detail.counterKind === 'versatileVials' ? vialMax : infusedMax}{' '}
                (2+INT / 4+INT)
              </span>
            </div>
          )}
        </div>
      ))}

      {needed > 0 && (
        <>
          {picks.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {picks.map((id) => {
                const opt = catalog.options.find((o) => o.id === id)
                if (!opt) return null
                return (
                  <Chip key={id} selected onClick={() => toggleMain(id)}>
                    {opt.name}
                    {id === primary ? ' · primária' : ''}
                  </Chip>
                )
              })}
            </div>
          )}

          {catalog.kind !== 'daily' && preparedNeeded > 0 && (
            <div
              className={`mb-3 rounded-lg border px-2.5 py-2 ${
                prepared.length !== preparedNeeded
                  ? 'border-danger/40 bg-danger/10'
                  : 'border-border/70 bg-surface-2/40'
              }`}
            >
              <div
                className={`mb-1 text-xs font-medium ${
                  prepared.length !== preparedNeeded
                    ? 'text-danger'
                    : 'text-text'
                }`}
              >
                {catalog.preparedLabel ?? 'Preparadas hoje'} ({prepared.length}/
                {preparedNeeded})
              </div>
              {catalog.preparedDescription && (
                <p className="mb-1.5 text-[11px] text-text-dim">
                  {polishRulesText(catalog.preparedDescription)}
                </p>
              )}
              {prepared.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(
                    prepared.reduce<Record<string, number>>((acc, id) => {
                      acc[id] = (acc[id] ?? 0) + 1
                      return acc
                    }, {}),
                  ).map(([id, count]) => {
                    const opt = catalog.options.find((o) => o.id === id)
                    if (!opt) return null
                    return (
                      <Chip
                        key={id}
                        selected
                        onClick={() => removePreparedOne(id)}
                      >
                        {opt.name}
                        {count > 1 ? ` ×${count}` : ''}
                      </Chip>
                    )
                  })}
                </div>
              )}
              {prepared.length !== preparedNeeded && (
                <p className="mt-1.5 text-[11px] text-text-muted">
                  {catalog.allowPreparedDuplicates
                    ? 'Escolher a fórmula já infunde uma dose. Use + / − no cartão para repetir a mesma até completar o dia.'
                    : 'Escolher já marca como preparada (até o limite). Use “Preparar hoje” para trocar quais ficam ativas.'}
                </p>
              )}
            </div>
          )}

          {catalog.primaryPick && catalog.kind === 'daily' && (
            <Tip>
              {catalog.primaryPick.description
                ? polishRulesText(catalog.primaryPick.description)
                : null}
            </Tip>
          )}

          <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Input
              placeholder={catalog.searchPlaceholder ?? 'Buscar…'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            />
            <FilterCount shown={filtered.length} total={visible.length} />
          </div>
          {categories.length > 1 && (
            <div className="mb-2 flex flex-wrap gap-1.5">
              <Chip
                selected={category === 'all'}
                onClick={() => setCategory('all')}
              >
                Todas
              </Chip>
              {categories.map((c) => (
                <Chip
                  key={c}
                  selected={category === c}
                  onClick={() => setCategory(c)}
                >
                  {catalog.categoryLabels?.[c] ?? c}
                </Chip>
              ))}
            </div>
          )}

          <div className="max-h-[28rem] space-y-2 overflow-y-auto pr-1">
            {filtered.map((opt) => {
              const isOn = picks.includes(opt.id)
              const inRepertoire = isOn || repertoire.has(opt.id)
              const full = !isOn && picks.length >= needed
              return (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  catalog={catalog}
                  selected={isOn}
                  prepared={prepared.includes(opt.id)}
                  preparedCount={
                    prepared.filter((id) => id === opt.id).length
                  }
                  primary={primary === opt.id}
                  disabled={full}
                  prepareFull={preparedFull}
                  showPrepare={
                    catalog.kind !== 'daily' &&
                    preparedNeeded > 0 &&
                    inRepertoire
                  }
                  showPrimary={
                    Boolean(catalog.primaryPick) &&
                    catalog.kind === 'daily' &&
                    isOn
                  }
                  onToggle={() => toggleMain(opt.id)}
                  onPrepare={() => togglePrepared(opt.id)}
                  onRemovePrepared={() => removePreparedOne(opt.id)}
                  onPrimary={() => setPrimary(opt.id)}
                />
              )
            })}
            {filtered.length === 0 && (
              <p className="text-xs text-text-dim">Nenhuma opção neste filtro.</p>
            )}
          </div>
        </>
      )}
    </Panel>
  )
}

export function ClassCatalogsBlock({
  classDef,
  choices,
  level,
  intelligenceModifier,
  onChange,
}: {
  classDef: CharacterClass
  choices: ClassChoices
  level: number
  intelligenceModifier?: number
  onChange: (next: ClassChoices) => void
}) {
  const catalogs = useMemo(() => getClassCatalogs(classDef), [classDef])
  const hydrated = useRef(false)

  useEffect(() => {
    if (hydrated.current || catalogs.length === 0) return
    const next = hydrateCatalogPrepared(
      catalogs,
      choices,
      level,
      intelligenceModifier ?? 0,
    )
    const hasPool = catalogs.some(
      (c) =>
        catalogRepertoireIds(c, choices).size > 0 ||
        getCatalogPrepared(choices, c.id).length > 0,
    )
    if (next) {
      hydrated.current = true
      onChange(next)
      return
    }
    if (hasPool) hydrated.current = true
  }, [catalogs, choices, level, intelligenceModifier, onChange])

  if (catalogs.length === 0) return null
  return (
    <>
      {catalogs.map((catalog) => (
        <ClassCatalogPicker
          key={catalog.id}
          catalog={catalog}
          allCatalogs={catalogs}
          choices={choices}
          level={level}
          intelligenceModifier={intelligenceModifier}
          onChange={onChange}
        />
      ))}
    </>
  )
}
