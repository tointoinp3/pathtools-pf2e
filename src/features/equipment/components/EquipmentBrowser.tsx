import { useEffect, useMemo, useState, type MouseEvent as ReactMouseEvent } from 'react'
import type { ItemCategory, ItemDefinition, ProvenanceType, Rarity } from '@/types'
import {
  ITEM_CATEGORY_LABELS,
  WEAPON_GROUP_LABELS,
  ARMOR_GROUP_LABELS,
  DAMAGE_TYPE_LABELS,
  TALISMAN_HOST_LABELS,
  isHomebrewItem,
} from '@/types'
import {
  ITEM_BROWSER_TABS,
  listItemDefinitions,
} from '@/engine/equipmentCatalog'
import type { EquipmentCreateKind } from '@/features/equipment/homebrewDefaults'
import { getSpellById } from '@/engine/spellCatalog'
import { formatBulk, formatPriceCp, formatRuneSummary } from '@/engine/equipment'
import {
  getCombinationPartnerDefinition,
  isCombinationWeapon,
  combinationModeTitle,
} from '@/engine/combinationWeapons'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { RARITY_FILTER_OPTIONS, formatSpeedMeters } from '@/utils/labels'
import { Panel, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import { FilterCount } from '@/components/ui/FilterCount'
import { ItemDetailRules } from '@/features/equipment/components/ItemActivationBlocks'
import {
  SpellheartSpellCards,
  StaffSpellCards,
} from '@/features/equipment/components/ItemSpellCards'
import { SpellRulesCard } from '@/features/spells/components/SpellRulesCard'
import { GrantCatalogItemButton } from '@/features/equipment/components/GrantCatalogItemButton'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { catalogRowPointerProps } from '@/features/tabs/tabPointer'

type TabId = ItemCategory | 'all'
type PriceBand = 'lt1' | '1-10' | '10-50' | '50-100' | '100-500' | '500+'

const PRICE_BAND_OPTIONS: Array<{
  value: PriceBand
  label: string
  minGp: number
  maxGp: number | null
}> = [
  { value: 'lt1', label: 'até 1', minGp: 0, maxGp: 1 },
  { value: '1-10', label: '1–10', minGp: 1, maxGp: 10 },
  { value: '10-50', label: '10–50', minGp: 10, maxGp: 50 },
  { value: '50-100', label: '50–100', minGp: 50, maxGp: 100 },
  { value: '100-500', label: '100–500', minGp: 100, maxGp: 500 },
  { value: '500+', label: '500+', minGp: 500, maxGp: null },
]

/** 1 po = 100 pc. Itens sem preço entram como 0. */
function goldFromCp(priceCp: number | null | undefined): number {
  if (priceCp == null || priceCp < 0) return 0
  return priceCp / 100
}

function parseGoldInput(raw: string): number | null {
  const n = Number(raw.trim().replace(',', '.'))
  if (raw.trim() === '' || !Number.isFinite(n) || n < 0) return null
  return n
}

function matchesPriceBand(gp: number, band: PriceBand): boolean {
  const option = PRICE_BAND_OPTIONS.find((o) => o.value === band)
  if (!option) return true
  if (gp < option.minGp) return false
  if (option.maxGp == null) return true
  return gp <= option.maxGp
}

interface EquipmentBrowserProps {
  items?: ItemDefinition[]
  mode?: 'browse' | 'pick' | 'manage'
  selectedId?: string | null
  onActiveChange?: (
    id: string | null,
    event?: ReactMouseEvent<HTMLButtonElement>,
  ) => void
  onPick?: (item: ItemDefinition) => void
  onCreateHomebrew?: (kind: EquipmentCreateKind) => void
  onEditHomebrew?: (id: string) => void
  onDuplicate?: (id: string) => void
}

function sourceBook(source: string): string {
  return source.replace(/\s+pg\.\s*\d+.*$/i, '').trim()
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

function PriceChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2 py-1 text-[11px] font-medium transition-all ${
        selected
          ? 'border-accent/50 bg-accent/15 text-accent'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
      }`}
    >
      {selected && <span className="mr-1 text-accent">✓</span>}
      {children}
    </button>
  )
}

function PriceFilter({
  bands,
  onChangeBands,
  min,
  max,
  onChangeMin,
  onChangeMax,
}: {
  bands: PriceBand[]
  onChangeBands: (next: PriceBand[]) => void
  min: string
  max: string
  onChangeMin: (value: string) => void
  onChangeMax: (value: string) => void
}) {
  const customActive = min.trim() !== '' || max.trim() !== ''
  const allSelected = bands.length === 0 && !customActive

  function toggle(value: PriceBand) {
    if (bands.includes(value)) {
      onChangeBands(bands.filter((v) => v !== value))
    } else {
      onChangeBands([...bands, value])
    }
  }

  return (
    <div>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          Preço (po)
        </span>
        {!allSelected && (
          <button
            type="button"
            onClick={() => {
              onChangeBands([])
              onChangeMin('')
              onChangeMax('')
            }}
            className="text-[10px] text-text-dim hover:text-accent"
          >
            Limpar
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        <PriceChip selected={allSelected} onClick={() => {
          onChangeBands([])
          onChangeMin('')
          onChangeMax('')
        }}>
          Todos
        </PriceChip>
        {PRICE_BAND_OPTIONS.map((opt) => (
          <PriceChip
            key={opt.value}
            selected={!customActive && bands.includes(opt.value)}
            onClick={() => toggle(opt.value)}
          >
            {opt.label}
          </PriceChip>
        ))}
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] text-text-dim">De</span>
        <Input
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          placeholder="mín"
          value={min}
          onChange={(e) => onChangeMin(e.target.value)}
          className="w-20 px-2 py-1 text-[11px]"
          aria-label="Preço mínimo em po"
        />
        <span className="text-[10px] text-text-dim">até</span>
        <Input
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          placeholder="máx"
          value={max}
          onChange={(e) => onChangeMax(e.target.value)}
          className="w-20 px-2 py-1 text-[11px]"
          aria-label="Preço máximo em po"
        />
        <span className="text-[10px] text-text-dim">po</span>
      </div>
    </div>
  )
}

function itemMatchesOtherTab(item: ItemDefinition): boolean {
  const dedicated: ItemCategory[] = [
    'weapon',
    'armor',
    'shield',
    'rune',
    'staff',
    'wand',
    'worn',
    'apex',
    'material',
    'tattoo',
    'assistive',
    'held',
    'consumable',
    'alchemical',
    'adventuringGear',
    'ammunition',
    'snare',
    'grimoire',
    'spellheart',
  ]
  return !dedicated.includes(item.category)
}

function itemInBrowserTab(item: ItemDefinition, tab: TabId): boolean {
  if (tab === 'other') return itemMatchesOtherTab(item)
  if (tab === 'all') return true
  return item.category === tab
}

export function EquipmentBrowser({
  items: itemsProp,
  mode = 'browse',
  selectedId = null,
  onActiveChange,
  onPick,
  onCreateHomebrew,
  onEditHomebrew,
  onDuplicate,
}: EquipmentBrowserProps) {
  const [tab, setTab] = useState<TabId>('all')
  const [search, setSearch] = useState('')
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [provenances, setProvenances] = useState<ProvenanceType[]>([])
  const [priceBands, setPriceBands] = useState<PriceBand[]>([])
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [activeId, setActiveId] = useState<string | null>(selectedId ?? null)
  const searchRef = useSlashSearch()

  const catalog = itemsProp ?? listItemDefinitions()
  const q = search.trim().toLowerCase()
  const createKind: EquipmentCreateKind | null =
    tab === 'all' ? null : tab

  useEffect(() => {
    if (!selectedId) return
    setActiveId(selectedId)
    const item = catalog.find((entry) => entry.id === selectedId)
    if (item) setTab(item.category)
  }, [selectedId, catalog])

  const filtered = useMemo(() => {
    return catalog.filter((item) => {
      if (!itemInBrowserTab(item, tab)) return false
      if (!matchesSelected(item.rarity, rarities)) return false
      if (
        provenances.length > 0 &&
        !provenances.includes(
          isHomebrewItem(item) ? 'homebrew' : 'official',
        )
      ) {
        return false
      }
      const gp = goldFromCp(item.priceCp)
      const customMin = parseGoldInput(priceMin)
      const customMax = parseGoldInput(priceMax)
      if (customMin != null || customMax != null) {
        if (customMin != null && gp < customMin) return false
        if (customMax != null && gp > customMax) return false
      } else if (priceBands.length > 0) {
        if (!priceBands.some((band) => matchesPriceBand(gp, band))) return false
      }
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.originalName.toLowerCase().includes(q) ||
        item.traits.some((t) => {
          const raw = t.toLowerCase()
          const loc = localizeTraitLabel(t).toLowerCase()
          return raw.includes(q) || loc.includes(q)
        }) ||
        item.source.toLowerCase().includes(q) ||
        (item.subcategory?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [catalog, tab, rarities, provenances, priceBands, priceMin, priceMax, q])

  const active =
    catalog.find((item) => item.id === activeId) ??
    filtered.find((item) => item.id === activeId) ??
    null
  const tabTotal = useMemo(
    () => catalog.filter((item) => itemInBrowserTab(item, tab)).length,
    [catalog, tab],
  )

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1.5">
        {ITEM_BROWSER_TABS.map((t) => (
          <TabButton
            key={t.id}
            active={tab === t.id}
            onClick={() => {
              setTab(t.id)
              setActiveId(null)
              onActiveChange?.(null)
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
      <FilterCount shown={filtered.length} total={tabTotal} />

      <div className="flex flex-wrap gap-2">
        <Input
          ref={searchRef}
          className="min-w-[12rem] flex-1"
          placeholder="Buscar nome, traço, fonte… (/)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid shrink-0 gap-2 lg:grid-cols-2">
        <MultiFilter
          label="Raridade"
          options={RARITY_FILTER_OPTIONS}
          selected={rarities}
          onChange={setRarities}
          emptyLabel="Todas"
        />
        <PriceFilter
          bands={priceBands}
          onChangeBands={(next) => {
            setPriceBands(next)
            setPriceMin('')
            setPriceMax('')
          }}
          min={priceMin}
          max={priceMax}
          onChangeMin={(value) => {
            setPriceMin(value)
            if (value.trim()) setPriceBands([])
          }}
          onChangeMax={(value) => {
            setPriceMax(value)
            if (value.trim()) setPriceBands([])
          }}
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
      </div>

      {catalog.length === 0 ? (
        <Panel quiet>
          <p className="text-sm text-text-muted">
            O catálogo ainda não tem itens nesta categoria. Só entra conteúdo
            Remaster do Archives of Nethys.
          </p>
          <div className="mt-3">
            <Tip>
              Só conteúdo Remaster. Páginas com aviso Legacy no AoN ficam de fora.
            </Tip>
          </div>
        </Panel>
      ) : (
        <div className="grid min-h-0 flex-1 grid-rows-[minmax(10rem,1fr)_minmax(16rem,1fr)] gap-3 overflow-hidden lg:grid-cols-[minmax(18rem,24rem)_1fr] lg:grid-rows-1">
          <ul className="h-full min-h-0 space-y-1 overflow-y-auto rounded-xl border border-border/80 bg-surface-1 p-2">
            {filtered.length === 0 ? (
              <li className="px-2 py-6 text-center text-sm text-text-dim">
                Nenhum item neste filtro.
              </li>
            ) : (
              filtered.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    {...catalogRowPointerProps((event) => {
                      if (event.button === 1 || event.ctrlKey || event.metaKey) {
                        onActiveChange?.(item.id, event)
                        return
                      }
                      const next = active?.id === item.id ? null : item.id
                      setActiveId(next)
                      onActiveChange?.(next, event)
                    })}
                    className={`w-full rounded-lg border px-2.5 py-2 text-left text-sm transition-colors ${
                      active?.id === item.id
                        ? 'border-accent bg-accent/15 text-text'
                        : 'border-transparent text-text-muted hover:bg-surface-2 hover:text-text'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-medium">{item.name}</span>
                      {isHomebrewItem(item) && (
                        <ProvenanceBadge type="homebrew" />
                      )}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-text-dim">
                      {item.subcategory ?? ITEM_CATEGORY_LABELS[item.category]}
                      {isCombinationWeapon(item) ? ' · híbrida' : ''}
                      {' · '}
                      {formatPriceCp(item.priceCp)}
                    </span>
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="h-full min-h-0 overflow-y-auto">
            {active ? (
              <ItemDetail
                item={active}
                mode={mode}
                onPick={onPick}
                onDuplicate={onDuplicate}
                onEditHomebrew={onEditHomebrew}
              />
            ) : (
              <div className="flex h-full min-h-[8rem] items-center justify-center rounded-xl border border-dashed border-border/80 bg-surface-1/40 px-4">
                <p className="text-sm text-text-dim">Selecione um item.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function ItemDetail({
  item,
  mode,
  onPick,
  onDuplicate,
  onEditHomebrew,
}: {
  item: ItemDefinition
  mode: 'browse' | 'pick' | 'manage'
  onPick?: (item: ItemDefinition) => void
  onDuplicate?: (id: string) => void
  onEditHomebrew?: (id: string) => void
}) {
  return (
    <Panel>
      {mode === 'manage' && (
        <div className="flex flex-wrap gap-2 px-3 pt-3">
          {onDuplicate && (
            <Button onClick={() => onDuplicate(item.id)}>
              Duplicar como Homebrew
            </Button>
          )}
          {isHomebrewItem(item) && onEditHomebrew && (
            <Button variant="accent" onClick={() => onEditHomebrew(item.id)}>
              Editar Homebrew
            </Button>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-start justify-between gap-2 px-3 pt-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-text">
            {item.name}
          </h2>
          <p className="text-xs text-text-dim">{item.originalName}</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <RarityBadge rarity={item.rarity} />
          <Badge>Nv. {item.level}</Badge>
          <Badge>{ITEM_CATEGORY_LABELS[item.category]}</Badge>
          {isCombinationWeapon(item) ? <Badge>Híbrida</Badge> : null}
        </div>
      </div>

      {(mode === 'browse' || mode === 'manage') && (
        <div className="px-3 pt-3">
          <GrantCatalogItemButton item={item} />
        </div>
      )}

      <div className="space-y-3 px-3 py-3 text-sm">
        <p className="text-xs text-text-dim">
          {formatPriceCp(item.priceCp)} · Carga {formatBulk(item.bulk)}
          {item.subcategory ? ` · ${item.subcategory}` : ''}
          {item.source ? ` · ${sourceBook(item.source)}` : ''}
        </p>

        {item.traits.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.traits.map((t) => (
              <Badge key={t}>{localizeTraitLabel(t)}</Badge>
            ))}
          </div>
        )}

        <ItemDetailRules item={item} />

        {item.weapon && (
          <div className="space-y-1 text-text-muted">
            <p>
              {item.weapon.rangeType === 'melee' ? 'Corpo a corpo' : 'À distância'}{' '}
              · {item.weapon.damageDie}{' '}
              {DAMAGE_TYPE_LABELS[
                item.weapon.damageType as keyof typeof DAMAGE_TYPE_LABELS
              ] ?? item.weapon.damageType}{' '}
              · {WEAPON_GROUP_LABELS[item.weapon.group]}
              {item.weapon.hands
                ? ` · ${
                    item.weapon.hands === '1+'
                      ? '1+ mãos'
                      : item.weapon.hands === '2'
                        ? '2 mãos'
                        : '1 mão'
                  }`
                : ''}
              {item.weapon.range != null
                ? ` · alcance ${formatSpeedMeters(item.weapon.range)}`
                : ''}
              {item.weapon.reload != null
                ? ` · recarga ${item.weapon.reload}`
                : ''}
            </p>
            {isCombinationWeapon(item) ? (
              <CombinationCatalogHint item={item} />
            ) : null}
          </div>
        )}

        {item.armor && (
          <p className="text-text-muted">
            CA +{item.armor.acBonus}
            {item.armor.dexCap != null
              ? ` · teto de Des +${item.armor.dexCap}`
              : ''}
            {item.armor.group
              ? ` · ${ARMOR_GROUP_LABELS[item.armor.group]}`
              : ''}
            {item.armor.strength != null
              ? ` · Força ${item.armor.strength >= 0 ? '+' : ''}${item.armor.strength}`
              : ''}
            {item.armor.checkPenalty
              ? ` · teste ${item.armor.checkPenalty}`
              : ''}
            {item.armor.speedPenalty
              ? ` · desloc. ${formatSpeedMeters(item.armor.speedPenalty)}`
              : ''}
          </p>
        )}

        {item.shield && (
          <p className="text-text-muted">
            Erguer: +{item.shield.acBonus} CA · Solidez {item.shield.hardness} ·
            PV {item.shield.hp} / BT {item.shield.bt}
          </p>
        )}

        {item.rune && (
          <p className="text-text-muted">{formatRuneSummary(item)}</p>
        )}

        {item.staff && (
          <div className="space-y-2 text-text-muted">
            <p>
              Cajado mágico · também é arma (1d4 concussão, duas mãos 1d8).
              Prepare no dia: cargas = seu posto de magia mais alto.
            </p>
            <StaffSpellCards staff={item.staff} />
            {item.staff.wieldNote ? (
              <p className="text-xs">{polishRulesText(item.staff.wieldNote)}</p>
            ) : null}
          </div>
        )}

        {item.wand && (
          <div className="space-y-2 text-text-muted">
            <p>
              {item.wand.kind && item.wand.kind !== 'generic'
                ? 'Varinha especial'
                : 'Varinha de magia'}{' '}
              de {item.wand.spellRank}º posto. Uma vez por dia, mais sobrecarga.
              {item.wand.fixedSpellId
                ? ' A magia já vem gravada.'
                : ' Na ficha você escolhe qual magia está gravada.'}
              {item.wand.effectNote ? ` ${polishRulesText(item.wand.effectNote)}` : ''}
            </p>
            {item.wand.fixedSpellId ? (
              <SpellRulesCard spell={getSpellById(item.wand.fixedSpellId)} />
            ) : null}
          </div>
        )}

        {item.talisman && (
          <p className="text-text-muted">
            Talismã · afixe em {TALISMAN_HOST_LABELS[item.talisman.affixesTo]} ·
            ativação <RichText>{polishRulesText(item.talisman.activate)}</RichText>
            {item.talisman.trigger
              ? ` · gatilho: ${polishRulesText(item.talisman.trigger)}`
              : ''}
            {item.talisman.requirements
              ? ` · requisito: ${polishRulesText(item.talisman.requirements)}`
              : ''}
            . Consome ao ativar.
          </p>
        )}

        {item.scroll && (
          <p className="text-text-muted">
            Pergaminho mágico de {item.scroll.spellRank}º posto. Na ficha você
            escolhe a magia. Conjurar consome o pergaminho. Truques, magias de
            foco e rituais não servem.
          </p>
        )}

        {item.snare && (
          <p className="text-text-muted">
            Cilada · 1 minuto para armar num quadrado de {formatSpeedMeters(5)}
            {item.snare.save ? ` · ${item.snare.save}` : ''}. Consome ao armar.
          </p>
        )}

        {item.grimoire && (
          <p className="text-text-muted">
            Grimório · estude nas preparações (um por dia). Ativação:{' '}
            <RichText>{item.grimoire.activate}</RichText> · {item.grimoire.frequency}.
          </p>
        )}

        {item.spellheart && (
          <div className="space-y-2 text-text-muted">
            <p>
              Coração de magia · afixe em{' '}
              {TALISMAN_HOST_LABELS[item.spellheart.affixesTo]}. Não se consome.
            </p>
            {item.spellheart.armorBenefit ? (
              <p className="text-xs">Armadura: {item.spellheart.armorBenefit}</p>
            ) : null}
            {item.spellheart.weaponBenefit ? (
              <p className="text-xs">Arma: {item.spellheart.weaponBenefit}</p>
            ) : null}
            <SpellheartSpellCards stats={item.spellheart} />
          </div>
        )}

        {item.alchemical?.bomb && (
          <p className="text-text-muted">
            Bomba · arremesso {formatSpeedMeters(20)} · proficiência de bomba
            {item.alchemical.bomb.attackItemBonus
              ? ` · +${item.alchemical.bomb.attackItemBonus} item no ataque`
              : ''}
            {item.alchemical.bomb.splash
              ? ` · respingo ${item.alchemical.bomb.splash}`
              : ''}
          </p>
        )}

        {item.alchemical?.elixir && (
          <p className="text-text-muted">
            Elixir · <ActionCost type="one" /> para beber
            {item.alchemical.elixir.hpDice
              ? ` · restaura ${item.alchemical.elixir.hpDice}${
                  item.alchemical.elixir.hpFlat
                    ? `+${item.alchemical.elixir.hpFlat}`
                    : ''
                } PV`
              : ''}
            {item.alchemical.elixir.duration
              ? ` · dura ${item.alchemical.elixir.duration}`
              : ''}
          </p>
        )}

        {item.alchemical?.mutagen && (
          <div className="text-text-muted">
            <p>
              Mutagênico · polimorfia · <ActionCost type="one" /> para beber
            </p>
            <p className="mt-1 text-xs">
              Benefício: {item.alchemical.mutagen.benefit}
            </p>
            <p className="text-xs">
              Desvantagem: {item.alchemical.mutagen.drawback}
            </p>
            <p className="text-xs">Dura {item.alchemical.mutagen.duration}.</p>
          </div>
        )}

        {item.alchemical?.tool && (
          <p className="text-text-muted">
            Ferramenta alquímica
            {item.alchemical.tool.duration
              ? ` · dura ${item.alchemical.tool.duration}`
              : ''}
            {item.alchemical.tool.note
              ? ` · ${item.alchemical.tool.note}`
              : ''}
          </p>
        )}

        {item.alchemical?.poison && (
          <div className="text-text-muted">
            <p>
              Veneno de{' '}
              {item.alchemical.poison.exposure === 'injury'
                ? 'ferimento'
                : item.alchemical.poison.exposure === 'ingested'
                  ? 'ingestão'
                  : item.alchemical.poison.exposure === 'inhaled'
                    ? 'inalação'
                    : 'contato'}{' '}
              · Fortitude CD {item.alchemical.poison.dc}
              {item.alchemical.poison.virulent ? ' · virulento' : ''}
            </p>
            {item.alchemical.poison.stages.slice(0, 3).map((stage, index) => (
              <p key={`${stage.effect}-${index}`} className="text-xs">
                Estágio {index + 1}: {stage.effect}
              </p>
            ))}
          </div>
        )}

        {item.consumable && (
          <p className="text-text-muted">
            {item.consumable.kind === 'oil' ? 'Óleo' : 'Poção'}
            {item.consumable.hpDice
              ? ` · restaura ${item.consumable.hpDice}${
                  item.consumable.hpFlat ? `+${item.consumable.hpFlat}` : ''
                } PV`
              : ''}
            {item.consumable.duration
              ? ` · dura ${item.consumable.duration}`
              : ''}
            {item.consumable.note && !item.consumable.hpDice
              ? ` · ${item.consumable.note}`
              : ''}
          </p>
        )}

        {mode === 'pick' && onPick && (
          <Button size="sm" variant="accent" onClick={() => onPick(item)}>
            Adicionar à ficha
          </Button>
        )}
      </div>
    </Panel>
  )
}

function CombinationCatalogHint({ item }: { item: ItemDefinition }) {
  const partner = getCombinationPartnerDefinition(item)
  const partnerWeapon = partner?.weapon
  return (
    <p className="text-xs">
      Arma híbrida (Combinação): <ActionCost type="one" /> Interagir troca o
      modo. Basta adicionar uma vez — no Combate os dois Golpes aparecem juntos.
      {partnerWeapon
        ? ` Outro modo: ${combinationModeTitle(partnerWeapon.rangeType)} · ${partnerWeapon.damageDie} ${
            DAMAGE_TYPE_LABELS[
              partnerWeapon.damageType as keyof typeof DAMAGE_TYPE_LABELS
            ] ?? partnerWeapon.damageType
          } · ${WEAPON_GROUP_LABELS[partnerWeapon.group]}.`
        : ''}
    </p>
  )
}
