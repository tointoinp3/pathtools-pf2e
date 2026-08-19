import { useState } from 'react'
import { Link } from 'react-router-dom'
import type {
  ActiveItemEffect,
  Character,
  EquipmentItem,
  ItemDefinition,
  ResolvedCharacterSheet,
  ResolvedInventoryItem,
} from '@/types'
import { ITEM_CATEGORY_LABELS, DAMAGE_TYPE_LABELS, WEAPON_GROUP_LABELS, ARMOR_GROUP_LABELS } from '@/types'
import { Panel, Tip } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Badge } from '@/components/ui/Badge'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { createId } from '@/utils/id'
import { formatSpeedMeters } from '@/utils/labels'
import {
  catalogItemCount,
  createInventoryItemFromDefinition,
  etchedRuneDefinitions,
  formatBulk,
  formatPriceCp,
  getCombinationPartnerDefinition,
  isCombinationWeapon,
  combinationModeTitle,
  resolveRunes,
} from '@/engine/equipment'
import {
  formatCoinsCp,
  getClassKit,
  leftoverPurchaseSuggestions,
  materializeAdventuringKitItems,
  materializeClassKitItems,
  STARTING_WEALTH_CP,
} from '@/engine/startingWealth'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import {
  KitBrowser,
  KitContentsPreview,
} from '@/features/kits/components/KitBrowser'
import type { ClassKitDefinition } from '@/data/seeds/classKits'
import type { AdventuringKitDefinition } from '@/data/seeds/adventuringKits'
import { EquipmentBrowser } from '@/features/equipment/components/EquipmentBrowser'
import { RuneEtcher } from '@/features/equipment/components/RuneEtcher'
import { MagicItemControls } from '@/features/equipment/components/MagicItemControls'
import { ItemDetailRules } from '@/features/equipment/components/ItemActivationBlocks'
import { RuneRulesCard } from '@/features/equipment/components/RuneRulesCard'
import { SpellheartSpellCards } from '@/features/equipment/components/ItemSpellCards'
import { refreshDailyMagicItems } from '@/engine/magicItems'
import { TraitTip } from '@/components/ui/TraitTip'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'

interface EquipmentPanelProps {
  items: EquipmentItem[]
  activeEffects: ActiveItemEffect[]
  sheet: ResolvedCharacterSheet
  coinsCp: number
  startingWealth: Character['startingWealth']
  classId: string | null
  onChange: (items: EquipmentItem[]) => void
  onChangeActiveEffects: (effects: ActiveItemEffect[]) => void
  onChangeCoins: (coinsCp: number) => void
  onApplyStartingWealth: (kind: 'coins' | 'kit') => void
}

export function EquipmentPanel({
  items,
  activeEffects,
  sheet,
  coinsCp,
  startingWealth,
  classId,
  onChange,
  onChangeActiveEffects,
  onChangeCoins,
  onApplyStartingWealth,
}: EquipmentPanelProps) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [kitPickerOpen, setKitPickerOpen] = useState(false)
  const [kitNotice, setKitNotice] = useState<string | null>(null)
  const resolved = sheet.equipment
  const catalogCount = catalogItemCount()
  const kit = getClassKit(classId)
  const wealthApplied = Boolean(startingWealth)

  function update(id: string, patch: Partial<EquipmentItem>) {
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)))
  }

  function remove(id: string) {
    onChange(items.filter((it) => it.id !== id))
  }

  function addFromCatalog(definition: ItemDefinition) {
    onChange([
      ...items,
      createInventoryItemFromDefinition(definition, createId('eq')),
    ])
  }

  function announceKitAdd(name: string, added: number, missing: string[]) {
    if (added === 0) {
      setKitNotice(
        `Não achei os itens de ${name} no catálogo${
          missing.length ? ` (${missing.join(', ')})` : ''
        }.`,
      )
      return
    }
    const missingNote = missing.length
      ? ` Faltou no catálogo: ${missing.join(', ')}.`
      : ''
    setKitNotice(
      `${name}: ${added} ${added === 1 ? 'item' : 'itens'} no inventário, já equipados.${missingNote}`,
    )
  }

  function addClassKit(kit: ClassKitDefinition) {
    if (!wealthApplied && kit.classId === classId) {
      onApplyStartingWealth('kit')
      announceKitAdd(kit.name, kit.items.length, [])
      setKitPickerOpen(false)
      return
    }
    const result = materializeClassKitItems(kit)
    onChange([...items, ...result.items])
    announceKitAdd(kit.name, result.items.length, result.missingItems)
    setKitPickerOpen(false)
  }

  function addGearKit(kit: AdventuringKitDefinition) {
    const result = materializeAdventuringKitItems(kit)
    onChange([...items, ...result.items])
    announceKitAdd(kit.name, result.items.length, result.missingItems)
    setKitPickerOpen(false)
  }

  const bulkUsedLabel =
    resolved.bulkUsed === 0
      ? '0'
      : Number.isInteger(resolved.bulkUsed)
        ? String(resolved.bulkUsed)
        : resolved.bulkUsed.toFixed(1)

  return (
    <div className="animate-fade-up space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-wide text-text">
            Equipamento
          </h2>
          <p className="mt-0.5 text-sm text-text-dim">
            Só o catálogo Remaster. Armas, armaduras, runas, cajados, varinhas e
            alquímicos entram com estatísticas.{' '}
            <Link
              to="/compendio/equipamento"
              className="text-accent hover:underline"
            >
              Abrir no compêndio
            </Link>
            {' · '}
            <Link to="/compendio/kits" className="text-accent hover:underline">
              Kits
            </Link>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="accent"
            onClick={() => {
              setPickerOpen((open) => !open)
              if (!pickerOpen) setKitPickerOpen(false)
            }}
          >
            {pickerOpen ? 'Fechar catálogo' : 'Adicionar item'}
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setKitPickerOpen((open) => !open)
              if (!kitPickerOpen) setPickerOpen(false)
            }}
          >
            {kitPickerOpen ? 'Fechar kits' : 'Adicionar kit'}
          </Button>
          <Button
            size="sm"
            onClick={() =>
              onChange(
                refreshDailyMagicItems(
                  items,
                  sheet.spellcasting?.highestSlotRank ?? 0,
                ),
              )
            }
          >
            Preparar o dia
          </Button>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-border/80 bg-surface-1 px-3 py-2 text-xs text-text-muted">
          Carga:{' '}
          <strong className="text-text">
            {bulkUsedLabel} / {resolved.bulkLimit}
          </strong>
          {resolved.encumbered ? (
            <span className="ml-1 text-accent"> · sobrecarregado</span>
          ) : null}
          {resolved.overloaded ? (
            <span className="ml-1 text-danger"> · acima do máximo</span>
          ) : null}
        </div>
        <div className="rounded-xl border border-border/80 bg-surface-1 px-3 py-2 text-xs text-text-muted">
          Investidos:{' '}
          <strong className="text-text">
            {resolved.investedCount} / {resolved.investmentLimit}
          </strong>
          {resolved.investedCount > resolved.investmentLimit ? (
            <span className="ml-1 text-danger"> · acima do limite</span>
          ) : null}
        </div>
        <div className="rounded-xl border border-border/80 bg-surface-1 px-3 py-2 text-xs text-text-muted">
          Na ficha:{' '}
          <strong className="text-text">{items.length}</strong> · catálogo{' '}
          {catalogCount}
        </div>
      </div>

      <Panel compact quiet title="Riqueza inicial">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[8rem]">
            <div className="text-[9px] font-semibold uppercase text-text-dim">
              Moedas
            </div>
            <div className="font-display text-lg font-semibold tabular-nums">
              {formatCoinsCp(coinsCp)}
            </div>
            <Input
              className="mt-1"
              type="number"
              min={0}
              value={Math.round(coinsCp / 100)}
              onChange={(e) =>
                onChangeCoins(Math.max(0, Number(e.target.value) || 0) * 100)
              }
              aria-label="Peças de ouro"
            />
            <p className="mt-0.5 text-[10px] text-text-dim">po (editar à mão)</p>
          </div>
          <div className="flex-1 text-xs text-text-muted">
            {wealthApplied ? (
              <p>
                Aplicado:{' '}
                <strong className="text-text">
                  {startingWealth?.kind === 'kit'
                    ? kit?.name ?? 'kit da classe'
                    : `15 po (${formatCoinsCp(STARTING_WEALTH_CP)})`}
                </strong>
                . Player Core: 15 po ou o pacote rápido da classe.
              </p>
            ) : (
              <p>
                No 1º nível você recebe <strong>15 po</strong> ou o kit da
                classe (Player Core pg. 267). Só uma vez por ficha.
              </p>
            )}
            {kit?.optionsHint ? (
              <p className="mt-1 text-text-dim">
                Opções do kit (comprar com a sobra): {kit.optionsHint}
              </p>
            ) : null}
            {kit ? (
              <div className="mt-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  {kit.name} · {kit.bulkLabel} · sobra{' '}
                  {formatCoinsCp(kit.leftoverCp)}
                </p>
                <KitContentsPreview kit={kit} />
                <Link
                  to={`/compendio/kits?classe=${kit.classId}`}
                  className="mt-1 inline-block text-[11px] text-accent hover:underline"
                >
                  Ver o pacote completo (e o que vem no de aventureiro)
                </Link>
              </div>
            ) : null}
          </div>
        </div>
        {!wealthApplied ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="accent"
              onClick={() => onApplyStartingWealth('coins')}
            >
              Receber 15 po
            </Button>
            <Button
              size="sm"
              disabled={!kit}
              onClick={() => onApplyStartingWealth('kit')}
            >
              {kit ? `Pegar ${kit.name}` : 'Sem kit desta classe'}
            </Button>
          </div>
        ) : null}
      </Panel>

      {kitNotice ? (
        <div className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-xs text-text">
          {kitNotice}
        </div>
      ) : null}

      {kitPickerOpen && (
        <Panel className="overflow-hidden">
          <p className="mb-2 text-xs text-text-dim">
            Clique no nome do kit para ver o conteúdo. O selo{' '}
            <strong className="text-text">Da sua classe</strong> aparece só no
            pacote da classe desta ficha. Adicionar coloca armadura, armas e
            pacote de uma vez, já equipados.
          </p>
          <div className="h-[min(52rem,calc(100vh-8rem))] min-h-[28rem] overflow-hidden">
            <KitBrowser
              mode="pick"
              initialClassId={classId}
              onPickClassKit={addClassKit}
              onPickGearKit={addGearKit}
            />
          </div>
        </Panel>
      )}

      {pickerOpen && (
        <Panel className="overflow-hidden">
          <p className="mb-2 text-xs text-text-dim">
            Clique num item da lista — a descrição e as estatísticas aparecem
            ao lado (ou embaixo). Depois use Adicionar à ficha. O catálogo fica
            aberto para pegar vários. Runas soltas só valem depois de gravadas.
          </p>
          <div className="h-[min(52rem,calc(100vh-8rem))] min-h-[28rem] overflow-hidden">
            <EquipmentBrowser mode="pick" onPick={addFromCatalog} />
          </div>
        </Panel>
      )}

      {items.length === 0 && !pickerOpen ? (
        <Panel quiet compact>
          <p className="text-sm text-text-dim">
            Inventário vazio. Tudo sai do catálogo oficial — homebrew fica para
            depois.
          </p>
          <Button
            className="mt-3"
            size="sm"
            variant="accent"
            onClick={() => setPickerOpen(true)}
          >
            Abrir catálogo
          </Button>
        </Panel>
      ) : items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item) => {
            const row = resolved.items.find((r) => r.item.id === item.id)
            return (
              <InventoryCard
                key={item.id}
                item={item}
                row={row}
                sheet={sheet}
                items={items}
                activeEffects={activeEffects}
                onUpdate={(patch) => update(item.id, patch)}
                onReplace={(next) =>
                  onChange(items.map((it) => (it.id === item.id ? next : it)))
                }
                onChange={onChange}
                onChangeActiveEffects={onChangeActiveEffects}
                onRemove={() => remove(item.id)}
              />
            )
          })}
        </ul>
      ) : null}

      {wealthApplied && coinsCp > 0 ? (
        <Panel
          title="Comprar com a sobra"
          subtitle={`${formatCoinsCp(coinsCp)} em moedas`}
          collapsible
          defaultOpen={false}
        >
          <p className="mb-2 text-xs text-text-dim">
            Sugestões baratas do catálogo (nv. 0–1) que cabem no ouro atual.
          </p>
          <ul className="space-y-1">
            {leftoverPurchaseSuggestions(
              coinsCp,
              new Set(
                items
                  .map((it) => it.definitionId)
                  .filter((id): id is string => Boolean(id)),
              ),
            ).map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-2">
                <span className="text-sm">
                  {item.name}
                  <span className="ml-1.5 text-[11px] text-text-dim">
                    {formatPriceCp(item.priceCp)}
                  </span>
                </span>
                <Button
                  size="sm"
                  disabled={(item.priceCp ?? 0) > coinsCp}
                  onClick={() => {
                    const price = item.priceCp ?? 0
                    if (price > coinsCp) return
                    const row = createInventoryItemFromDefinition(
                      item,
                      createId('eq'),
                    )
                    onChange([...items, row])
                    onChangeCoins(coinsCp - price)
                  }}
                >
                  Comprar
                </Button>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}

      <Tip>
        CA, penalidade de teste, carga, ataques e runas vêm do catálogo.
        Cajados e varinhas recarregam em Preparar o dia (aqui ou na aba Magias).
        Bombas, mutagênicos e elixires ativos entram em Combate. Armadura com
        runas precisa estar investida.
      </Tip>
    </div>
  )
}

function InventoryCard({
  item,
  row,
  sheet,
  items,
  activeEffects,
  onUpdate,
  onReplace,
  onChange,
  onChangeActiveEffects,
  onRemove,
}: {
  item: EquipmentItem
  row?: ResolvedInventoryItem
  sheet: ResolvedCharacterSheet
  items: EquipmentItem[]
  activeEffects: ActiveItemEffect[]
  onUpdate: (patch: Partial<EquipmentItem>) => void
  onReplace: (next: EquipmentItem) => void
  onChange: (items: EquipmentItem[]) => void
  onChangeActiveEffects: (effects: ActiveItemEffect[]) => void
  onRemove: () => void
}) {
  const definition = row?.definition ?? getItemDefinition(item.definitionId)
  const fromCatalog = Boolean(definition)
  const title = row?.displayName || definition?.name || item.name || 'Item'
  const categoryLabel = definition
    ? ITEM_CATEGORY_LABELS[definition.category]
    : null
  const alwaysInvested = definition?.category === 'tattoo'
  const showInvested =
    alwaysInvested ||
    Boolean(definition?.requiresInvestiture) ||
    Boolean(item.invested) ||
    definition?.category === 'armor' ||
    definition?.category === 'worn' ||
    definition?.category === 'apex'
  const showRaised = Boolean(
    item.slot === 'shield' || definition?.shield,
  )
  const resolved = sheet.equipment

  const stats: string[] = []
  if (definition?.weapon) {
    const partner = isCombinationWeapon(definition)
      ? getCombinationPartnerDefinition(definition)
      : null
    if (partner?.weapon) {
      stats.push(
        `${definition.weapon.damageDie} ${combinationModeTitle(definition.weapon.rangeType)}`,
      )
      stats.push(
        `${partner.weapon.damageDie} ${combinationModeTitle(partner.weapon.rangeType)}`,
      )
    } else {
      stats.push(definition.weapon.damageDie)
    }
  }
  if (resolved.armor?.item.id === item.id) {
    stats.push(`CA +${resolved.armor.itemBonus}`)
  } else if (definition?.armor) {
    stats.push(`CA +${definition.armor.acBonus}`)
  }
  if (resolved.shield?.item.id === item.id) {
    stats.push(`solidez ${resolved.shield.stats.hardness}`)
  } else if (definition?.shield) {
    stats.push(`solidez ${definition.shield.hardness}`)
  }
  if (item.affixedTalismanId) {
    stats.push(
      `talismã: ${getItemDefinition(item.affixedTalismanId)?.name ?? 'afixado'}`,
    )
  }
  if (item.affixedSpellheartId) {
    stats.push(
      `coração: ${getItemDefinition(item.affixedSpellheartId)?.name ?? 'afixado'}`,
    )
  }

  return (
    <li>
      <ExpandableCard
        title={title}
        badges={
          <>
            {categoryLabel ? (
              <Badge className="!text-[9px]">{categoryLabel}</Badge>
            ) : (
              <Badge className="!text-[9px]">Sem catálogo</Badge>
            )}
            {isCombinationWeapon(definition) ? (
              <Badge className="!text-[9px]">Híbrida</Badge>
            ) : null}
          </>
        }
        subtitle={
          fromCatalog ? (
            <>
              Carga {row ? formatBulk(row.bulk) : '—'}
              {definition?.priceCp != null
                ? ` · ${formatPriceCp(definition.priceCp)}`
                : ''}
              {definition?.originalName &&
              definition.originalName !== definition.name
                ? ` · ${definition.originalName}`
                : ''}
              {stats.length > 0 ? ` · ${stats.join(' · ')}` : ''}
              {' · clique para a descrição'}
            </>
          ) : (
            'Ficha antiga, sem ligação com o catálogo. Homebrew volta depois.'
          )
        }
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-border/80 bg-surface-2">
              <button
                type="button"
                className="px-2 py-1 text-xs text-text-muted hover:text-text"
                onClick={() =>
                  onUpdate({ quantity: Math.max(1, item.quantity - 1) })
                }
                aria-label="Diminuir quantidade"
              >
                −
              </button>
              <span className="min-w-6 px-1 text-center text-xs tabular-nums text-text">
                {item.quantity}
              </span>
              <button
                type="button"
                className="px-2 py-1 text-xs text-text-muted hover:text-text"
                onClick={() => onUpdate({ quantity: item.quantity + 1 })}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>
            <Button size="sm" variant="ghost" onClick={onRemove}>
              Remover
            </Button>
          </div>
        }
        toolbar={
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <label className="flex items-center gap-1.5">
                <input
                  type="checkbox"
                  checked={alwaysInvested || item.equipped !== false}
                  disabled={alwaysInvested}
                  onChange={(e) => onUpdate({ equipped: e.target.checked })}
                />
                Equipado
              </label>
              {showInvested && (
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={alwaysInvested || Boolean(item.invested)}
                    disabled={alwaysInvested}
                    onChange={(e) => onUpdate({ invested: e.target.checked })}
                  />
                  {alwaysInvested ? 'Investido (tatuagem)' : 'Investido'}
                </label>
              )}
              {showRaised && (
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={Boolean(item.raised)}
                    onChange={(e) => onUpdate({ raised: e.target.checked })}
                  />
                  Escudo erguido
                </label>
              )}
            </div>
            {fromCatalog ? (
              <RuneEtcher item={item} onChange={onReplace} />
            ) : null}
            {fromCatalog ? (
              <MagicItemControls
                item={item}
                items={items}
                highestSlotRank={sheet.spellcasting?.highestSlotRank ?? 0}
                activeEffects={activeEffects}
                spellcastingSources={sheet.spellcasting?.sources ?? []}
                onChange={onChange}
                onChangeActiveEffects={onChangeActiveEffects}
              />
            ) : null}
            <Input
              className="text-xs"
              value={item.notes ?? ''}
              placeholder="Nota (opcional)"
              onChange={(e) => onUpdate({ notes: e.target.value })}
            />
          </div>
        }
      >
        {definition ? (
          <InventoryItemDetails definition={definition} item={item} />
        ) : null}
      </ExpandableCard>
    </li>
  )
}

function InventoryItemDetails({
  definition,
  item,
}: {
  definition: ItemDefinition
  item: EquipmentItem
}) {
  const traits = definition.traits
  const weapon = definition.weapon
  const damageType = weapon
    ? DAMAGE_TYPE_LABELS[
        weapon.damageType as keyof typeof DAMAGE_TYPE_LABELS
      ] ?? weapon.damageType
    : null
  const runes = resolveRunes([
    ...(item.runeIds ?? []),
    ...(item.temporaryRuneIds ?? []),
  ])
  const etched = etchedRuneDefinitions(item)
  const talismanDef = item.affixedTalismanId
    ? getItemDefinition(item.affixedTalismanId)
    : null
  const heartDef = item.affixedSpellheartId
    ? getItemDefinition(item.affixedSpellheartId)
    : null

  return (
    <div className="space-y-2">
      {traits.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {traits.map((trait) => (
            <TraitTip key={trait} trait={trait}>
              <Badge className="!text-[9px]">{localizeTraitLabel(trait)}</Badge>
            </TraitTip>
          ))}
        </div>
      ) : null}
      {weapon ? (
        <p>
          {weapon.rangeType === 'ranged' ? 'À distância' : 'Corpo a corpo'}
          {' · '}
          {WEAPON_GROUP_LABELS[weapon.group]}
          {` · ${weapon.damageDie} ${damageType}`}
          {weapon.range != null ? ` · alcance ${formatSpeedMeters(weapon.range)}` : ''}
          {weapon.reload != null ? ` · recarga ${weapon.reload}` : ''}
        </p>
      ) : null}
      {definition.armor ? (
        <p>
          CA +{definition.armor.acBonus}
          {definition.armor.dexCap != null
            ? ` · teto de Des +${definition.armor.dexCap}`
            : ''}
          {definition.armor.group
            ? ` · ${ARMOR_GROUP_LABELS[definition.armor.group]}`
            : ''}
        </p>
      ) : null}
      <ItemDetailRules item={definition} />
      {etched.length > 0 ? (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Runas gravadas
          </p>
          {etched.map((def) => (
            <RuneRulesCard
              key={def.id}
              definition={def}
              dormant={runes.dormantIds.includes(def.id)}
              temporary={item.temporaryRuneIds?.includes(def.id)}
            />
          ))}
        </div>
      ) : null}
      {talismanDef ? (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Talismã afixado
          </p>
          <ExpandableCard compact title={talismanDef.name}>
            <ItemDetailRules item={talismanDef} />
          </ExpandableCard>
        </div>
      ) : null}
      {heartDef ? (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Coração de magia · {heartDef.name}
          </p>
          <ItemDetailRules item={heartDef} />
          {heartDef.spellheart ? (
            <SpellheartSpellCards stats={heartDef.spellheart} />
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
