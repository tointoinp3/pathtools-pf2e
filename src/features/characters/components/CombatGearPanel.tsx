import { useState } from 'react'
import type {
  ActiveItemEffect,
  AttackProficiencyCategory,
  EquipmentItem,
  ItemDefinition,
  ResolvedCharacterSheet,
  ResolvedInventoryItem,
  ResolvedSpellcastingSource,
  ResolvedWeaponAttack,
} from '@/types'
import {
  DAMAGE_TYPE_LABELS,
  ITEM_CATEGORY_LABELS,
  WEAPON_GROUP_LABELS,
} from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import { getSpellById } from '@/engine/spellCatalog'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import {
  activateAlchemicalEffect,
  consumeItem,
  etchedRuneDefinitions,
  listCompatibleAmmo,
  listSpellheartSpells,
  pickLoadedAmmo,
  replaceInventoryItem,
  resolveItemSpellcastingSourceForSpells,
  resolveSpellheartCastStats,
  sourceAttackBreakdown,
  spendStaffCharge,
  spendWandCharge,
  spendWeaponShot,
  weaponShotKind,
  combinationBaseName,
  combinationModeTitle,
  resolvedWeaponAttackKey,
  mapFlagsFromSheet,
  resolveMapProfile,
  traitsForMap,
  type MapFlags,
} from '@/engine'
import { createId } from '@/utils/id'
import { formatModifier, PROFICIENCY_LABELS, formatSpeedMeters } from '@/utils/labels'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { TraitTip } from '@/components/ui/TraitTip'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { parseDiceFormula } from '@/utils/dice'
import { useDiceStore } from '@/stores/diceStore'
import {
  CombatRollChip,
  MapAttackChips,
  rollParsedFormula,
} from '@/features/characters/components/CombatRollChip'
import { CombatSpellRolls } from '@/features/characters/components/CombatSpellRolls'
import { resolveWandSpellId } from '@/features/characters/combatSpellStats'
import { SpellcastingSourcePicker } from '@/features/spells/components/SpellcastingSourcePicker'
import { ActionCost } from '@/components/ui/ActionIcon'
import { ItemDetailRules } from '@/features/equipment/components/ItemActivationBlocks'
import { RuneRulesCard } from '@/features/equipment/components/RuneRulesCard'
import {
  SpellheartSpellCards,
  StaffSpellCards,
} from '@/features/equipment/components/ItemSpellCards'
import { SpellRulesCard } from '@/features/spells/components/SpellRulesCard'

interface CombatGearPanelProps {
  sheet: ResolvedCharacterSheet
  onChangeEquipment?: (items: EquipmentItem[]) => void
  onChangeActiveEffects?: (effects: ActiveItemEffect[]) => void
  onSpendWeaponPoison?: (weaponId: string) => void
  onActivateTalisman?: (hostId: string) => void
}

type KitGroup = 'consumable' | 'alchemical' | 'ammo' | 'magic' | 'snare'

const KIT_GROUP_LABELS: Record<KitGroup, string> = {
  consumable: 'Consumíveis',
  alchemical: 'Alquímicos',
  ammo: 'Munição',
  magic: 'Magia na mão',
  snare: 'Ciladas',
}

const KIT_GROUP_ORDER: KitGroup[] = [
  'consumable',
  'alchemical',
  'ammo',
  'magic',
  'snare',
]

function kitGroup(definition: ItemDefinition): KitGroup | null {
  if (definition.scroll || definition.wand || definition.staff) return 'magic'
  if (definition.snare || definition.category === 'snare') return 'snare'
  if (definition.category === 'ammunition') return 'ammo'
  if (definition.consumable || definition.category === 'consumable') {
    return 'consumable'
  }
  if (definition.alchemical || definition.category === 'alchemical') {
    return 'alchemical'
  }
  return null
}

const RollChip = CombatRollChip
const rollParsed = rollParsedFormula

export function CombatGearPanel({
  sheet,
  onChangeEquipment,
  onChangeActiveEffects,
  onSpendWeaponPoison,
  onActivateTalisman,
}: CombatGearPanelProps) {
  const items = sheet.character.equipment ?? []
  const weapons = sheet.equipment.weapons
  const shield = sheet.equipment.shield
  const weaponIds = new Set(weapons.map((w) => w.item.id))

  const kitRows = sheet.equipment.items.filter((row) => {
    if ((row.item.quantity ?? 1) < 1) return false
    if (weaponIds.has(row.item.id)) return false
    if (!row.definition) return false
    return kitGroup(row.definition) != null
  })

  const kitByGroup = KIT_GROUP_ORDER.map((group) => ({
    group,
    rows: kitRows.filter((row) => kitGroup(row.definition!) === group),
  })).filter((entry) => entry.rows.length > 0)

  const wornTalismans = [
    sheet.equipment.armor?.item,
    sheet.equipment.shield?.item,
    ...weapons.map((w) => w.item),
  ].filter(
    (it, index, all): it is NonNullable<typeof it> =>
      Boolean(it?.affixedTalismanId) &&
      all.findIndex((other) => other?.id === it?.id) === index,
  )

  const armorSpellheartHost =
    sheet.equipment.armor?.item?.affixedSpellheartId
      ? sheet.equipment.armor.item
      : null
  const shieldSpellheartHost =
    shield?.item.affixedSpellheartId &&
    !weapons.some((w) => w.item.id === shield.item.id)
      ? shield.item
      : null
  const spellcastingSources = sheet.spellcasting?.sources ?? []
  const mapFlags = mapFlagsFromSheet(sheet)

  const hasAnything =
    weapons.length > 0 ||
    Boolean(shield) ||
    kitByGroup.length > 0 ||
    wornTalismans.length > 0 ||
    Boolean(armorSpellheartHost)

  function patchItems(next: EquipmentItem[]) {
    onChangeEquipment?.(next)
  }

  function consume(item: EquipmentItem) {
    patchItems(replaceInventoryItem(items, consumeItem(item), item.id))
  }

  function drink(item: EquipmentItem, definition: ItemDefinition) {
    const hpDice =
      definition.consumable?.hpDice ?? definition.alchemical?.elixir?.hpDice
    const hpFlat =
      definition.consumable?.hpFlat ?? definition.alchemical?.elixir?.hpFlat ?? 0
    if (hpDice) rollParsed(item.name || 'Cura', hpDice, hpFlat)
    consume(item)
    const tracks =
      definition.consumable?.effectFamily ??
      definition.alchemical?.effectFamily ??
      definition.alchemical?.kind === 'mutagen'
    if (tracks && onChangeActiveEffects) {
      onChangeActiveEffects(
        activateAlchemicalEffect(
          sheet.character.activeItemEffects ?? [],
          definition,
          createId('fx'),
        ),
      )
    }
  }

  if (!hasAnything) {
    return (
      <Panel quiet compact>
        <p className="text-sm text-text-dim">
          Sem arma equipada, o golpe desarmado (Punho) aparece aqui. Poções,
          elixires, mutagênicos, munição, pergaminhos, varinhas e ciladas
          também entram nesta aba — o resto fica só em Equipamento.
        </p>
      </Panel>
    )
  }

  return (
    <div className="space-y-3">
      {weapons.length > 0 && (
        <Panel quiet compact title="Armas">
          <ul className="space-y-2">
            {groupCombatWeapons(weapons).map((group) =>
              group.kind === 'combination' ? (
                <CombinationWeaponRow
                  key={`combo:${group.modes
                    .map((mode) =>
                      resolvedWeaponAttackKey(mode.item.id, mode.definition.id),
                    )
                    .join('|')}`}
                  modes={group.modes}
                  items={items}
                  mapFlags={mapFlags}
                  spellcastingSources={spellcastingSources}
                  onChangeEquipment={onChangeEquipment}
                  onSpendPoison={onSpendWeaponPoison}
                  onActivateTalisman={onActivateTalisman}
                />
              ) : (
                <WeaponCombatRow
                  key={resolvedWeaponAttackKey(
                    group.weapon.item.id,
                    group.weapon.definition.id,
                  )}
                  weapon={group.weapon}
                  items={items}
                  mapFlags={mapFlags}
                  spellcastingSources={spellcastingSources}
                  onChangeEquipment={onChangeEquipment}
                  onSpendPoison={onSpendWeaponPoison}
                  onActivateTalisman={onActivateTalisman}
                />
              ),
            )}
          </ul>
        </Panel>
      )}

      {shield && (
        <Panel quiet compact title="Escudo">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-medium text-text">
                {shield.item.name}
              </p>
              <p className="text-[11px] text-text-dim">
                Erguer: +{shield.stats.acBonus} CA · solidez {shield.stats.hardness}
                {shield.raised ? ' · erguido agora' : ''}
              </p>
            </div>
            {onChangeEquipment ? (
              <Button
                size="sm"
                variant={shield.raised ? 'accent' : 'secondary'}
                onClick={() =>
                  patchItems(
                    items.map((it) =>
                      it.id === shield.item.id
                        ? { ...it, raised: !it.raised }
                        : it,
                    ),
                  )
                }
              >
                {shield.raised ? 'Abaixar' : 'Erguer escudo'}
              </Button>
            ) : null}
          </div>
          {shieldSpellheartHost ? (
            <AffixedSpellheartCombat
              host={shieldSpellheartHost}
              sources={spellcastingSources}
              onChangeSource={
                onChangeEquipment
                  ? (sourceId) => {
                      patchItems(
                        items.map((it) =>
                          it.id === shieldSpellheartHost.id
                            ? { ...it, spellcastingSourceId: sourceId }
                            : it,
                        ),
                      )
                    }
                  : undefined
              }
            />
          ) : null}
        </Panel>
      )}

      {armorSpellheartHost ? (
        <Panel quiet compact title="Coração na armadura">
          <p className="text-sm font-medium text-text">
            {armorSpellheartHost.name}
          </p>
          <AffixedSpellheartCombat
            host={armorSpellheartHost}
            sources={spellcastingSources}
            onChangeSource={
              onChangeEquipment
                ? (sourceId) => {
                    patchItems(
                      items.map((it) =>
                        it.id === armorSpellheartHost.id
                          ? { ...it, spellcastingSourceId: sourceId }
                          : it,
                      ),
                    )
                  }
                : undefined
            }
          />
        </Panel>
      ) : null}

      {kitByGroup.map(({ group, rows }) => (
        <Panel key={group} quiet compact title={KIT_GROUP_LABELS[group]}>
          <ul className="space-y-2">
            {rows.map((row) => (
              <KitItemRow
                key={row.item.id}
                row={row}
                canAct={Boolean(onChangeEquipment)}
                spellcastingSources={spellcastingSources}
                onChangeSource={
                  onChangeEquipment
                    ? (sourceId) => {
                        patchItems(
                          items.map((it) =>
                            it.id === row.item.id
                              ? { ...it, spellcastingSourceId: sourceId }
                              : it,
                          ),
                        )
                      }
                    : undefined
                }
                onDrink={() => drink(row.item, row.definition!)}
                onConsume={() => consume(row.item)}
                onSpendWand={() => {
                  const next = spendWandCharge(row.item)
                  if (next) {
                    patchItems(replaceInventoryItem(items, next, row.item.id))
                  }
                }}
                onSpendStaff={(rank) => {
                  const next = spendStaffCharge(row.item, rank)
                  if (next) {
                    patchItems(replaceInventoryItem(items, next, row.item.id))
                  }
                }}
                onSetQuantity={(quantity) => {
                  if (quantity < 1) {
                    patchItems(items.filter((it) => it.id !== row.item.id))
                    return
                  }
                  patchItems(
                    items.map((it) =>
                      it.id === row.item.id ? { ...it, quantity } : it,
                    ),
                  )
                }}
              />
            ))}
          </ul>
        </Panel>
      ))}

      {wornTalismans.length > 0 && onActivateTalisman ? (
        <Panel quiet compact title="Talismãs afixados">
          <ul className="space-y-1.5">
            {wornTalismans.map((host) => {
              const talisman = getItemDefinition(host.affixedTalismanId)
              return (
                <li
                  key={host.id}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="min-w-0">
                    <span className="font-medium">
                      {talisman?.name ?? 'Talismã'}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-text-dim">
                      em {host.name}
                    </span>
                  </span>
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() => onActivateTalisman(host.id)}
                  >
                    Ativar
                  </Button>
                </li>
              )
            })}
          </ul>
        </Panel>
      ) : null}
    </div>
  )
}

function AffixedSpellheartCombat({
  host,
  sources,
  onChangeSource,
}: {
  host: EquipmentItem
  sources: ResolvedSpellcastingSource[]
  onChangeSource?: (sourceId: string) => void
}) {
  const heartDef = getItemDefinition(host.affixedSpellheartId)
  const stats = heartDef?.spellheart
  if (!heartDef || !stats) return null
  const spells = listSpellheartSpells(stats)
  const resolvedSource = resolveItemSpellcastingSourceForSpells(
    sources,
    host.spellcastingSourceId,
    spells,
  )
  const cast = resolveSpellheartCastStats(resolvedSource, stats)
  const attackBreakdown = cast.usedSourceAttack && resolvedSource
    ? sourceAttackBreakdown(resolvedSource)
    : cast.spellAttack != null
      ? [{ label: 'Item', value: cast.spellAttack }]
      : undefined

  return (
    <div className="mt-1.5 space-y-1.5 border-t border-border/50 pt-2">
      <p className="text-[11px] font-medium text-accent">
        Coração: {heartDef.name}
      </p>
      {onChangeSource ? (
        <SpellcastingSourcePicker
          sources={sources}
          value={host.spellcastingSourceId}
          spells={spells}
          mismatchHint="Nenhuma magia deste coração está na tradição desta fonte. Use Truque de Item Mágico ou escolha outra."
          onChange={onChangeSource}
        />
      ) : null}
      <SpellheartSpellCards
        stats={stats}
        toolbarFor={(entry) =>
          entry.spell ? (
            <CombatSpellRolls
              spell={entry.spell}
              displayName={withLocalizedSpell(entry.spell).name}
              attackBonus={cast.spellAttack}
              spellDc={cast.spellDc}
              attackBreakdown={attackBreakdown}
            />
          ) : null
        }
      />
    </div>
  )
}

const WEAPON_PROF_LABELS: Record<AttackProficiencyCategory, string> = {
  unarmed: 'Desarmada',
  simple: 'Simples',
  martial: 'Marcial',
  advanced: 'Avançada',
  bomb: 'Bomba',
  simpleFirearm: 'Arma de fogo simples',
  martialFirearm: 'Arma de fogo marcial',
  advancedFirearm: 'Arma de fogo avançada',
}

function groupCombatWeapons(weapons: ResolvedWeaponAttack[]): Array<
  | { kind: 'single'; weapon: ResolvedWeaponAttack }
  | { kind: 'combination'; modes: ResolvedWeaponAttack[] }
> {
  const used = new Set<string>()
  const groups: Array<
    | { kind: 'single'; weapon: ResolvedWeaponAttack }
    | { kind: 'combination'; modes: ResolvedWeaponAttack[] }
  > = []
  for (const weapon of weapons) {
    const key = resolvedWeaponAttackKey(
      weapon.item.id,
      weapon.definition.id,
    )
    if (used.has(key)) continue
    if (weapon.combinationMode) {
      const modes = weapons.filter(
        (other) =>
          other.item.id === weapon.item.id && Boolean(other.combinationMode),
      )
      if (modes.length > 1) {
        for (const mode of modes) {
          used.add(
            resolvedWeaponAttackKey(mode.item.id, mode.definition.id),
          )
        }
        groups.push({
          kind: 'combination',
          modes: [...modes].sort((a, b) => {
            if (a.stats.rangeType === b.stats.rangeType) return 0
            return a.stats.rangeType === 'melee' ? -1 : 1
          }),
        })
        continue
      }
    }
    used.add(key)
    groups.push({ kind: 'single', weapon })
  }
  return groups
}

function combinationModeSummary(weapon: ResolvedWeaponAttack): string {
  const damageType =
    DAMAGE_TYPE_LABELS[weapon.stats.damageType as keyof typeof DAMAGE_TYPE_LABELS] ??
    weapon.stats.damageType
  const parts = [
    combinationModeTitle(weapon.stats.rangeType),
    weapon.damageSummary || `${weapon.stats.damageDie} ${damageType}`,
    WEAPON_GROUP_LABELS[weapon.stats.group],
  ]
  if (weapon.stats.range != null) parts.push(`alcance ${formatSpeedMeters(weapon.stats.range)}`)
  if (weapon.stats.reload != null) parts.push(`recarga ${weapon.stats.reload}`)
  return parts.join(' · ')
}

function UntrainedWeaponNotice({
  category,
}: {
  category: AttackProficiencyCategory
}) {
  const [minimized, setMinimized] = useState(false)
  const kind = WEAPON_PROF_LABELS[category].toLowerCase()
  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent hover:bg-accent/18"
        title="Mostrar aviso"
      >
        Sem treino
      </button>
    )
  }
  return (
    <div className="flex items-start justify-between gap-2 rounded-lg border border-accent/40 bg-accent/10 px-2 py-1.5">
      <p className="text-[11px] leading-snug text-accent">
        Sem treino em arma {kind}. O ataque usa destreinado (proficiência +0) —
        ainda pode atacar.
      </p>
      <button
        type="button"
        onClick={() => setMinimized(true)}
        className="shrink-0 text-[10px] font-medium text-accent/80 hover:text-accent hover:underline"
      >
        Minimizar
      </button>
    </div>
  )
}

function WeaponCombatDetails({
  weapon,
  mapFlags,
}: {
  weapon: ResolvedWeaponAttack
  mapFlags?: MapFlags
}) {
  const def = weapon.definition
  const stats = weapon.stats
  const traits = [...new Set([...def.traits, ...weapon.runes.grantedTraits])]
  const map = resolveMapProfile(traits, mapFlags)
  const hands =
    stats.hands === '2'
      ? '2 mãos'
      : stats.hands === '1+'
        ? '1+ mãos'
        : stats.hands
          ? '1 mão'
          : null
  const damageType =
    DAMAGE_TYPE_LABELS[stats.damageType as keyof typeof DAMAGE_TYPE_LABELS] ??
    stats.damageType
  const etched = etchedRuneDefinitions(weapon.item)

  return (
    <div className="space-y-1.5">
      {traits.length > 0 ? (
        <div className="flex flex-wrap gap-1">
          {traits.map((trait) => (
            <TraitTip key={trait} trait={trait}>
              <Badge className="!text-[9px]">{localizeTraitLabel(trait)}</Badge>
            </TraitTip>
          ))}
        </div>
      ) : null}
      <p>
        {stats.rangeType === 'ranged' ? 'À distância' : 'Corpo a corpo'}
        {' · '}
        {WEAPON_GROUP_LABELS[stats.group]}
        {' · '}
        {WEAPON_PROF_LABELS[stats.proficiency]}
        {hands ? ` · ${hands}` : ''}
        {` · ${stats.damageDie} ${damageType}`}
        {stats.range != null ? ` · alcance ${formatSpeedMeters(stats.range)}` : ''}
        {stats.reload != null ? ` · recarga ${stats.reload}` : ''}
      </p>
      {weapon.proficiencyRank ? (
        <p>
          Proficiência:{' '}
          {PROFICIENCY_LABELS[weapon.proficiencyRank]}
        </p>
      ) : null}
      <p>
        Ataque múltiplo: 2º {formatModifier(map.second)} · 3º{' '}
        {formatModifier(map.third)}
        {map.agile ? ' (ágil)' : ''}
      </p>
      {etched.length > 0 ? (
        <div className="space-y-1">
          {etched.map((def) => (
            <RuneRulesCard
              key={def.id}
              definition={def}
              dormant={weapon.runes.dormantIds.includes(def.id)}
              temporary={weapon.item.temporaryRuneIds?.includes(def.id)}
            />
          ))}
        </div>
      ) : weapon.runes.labels.length > 0 ? (
        <p>Runas: {weapon.runes.labels.join(', ')}</p>
      ) : null}
      {weapon.kitExtraDamage && weapon.kitExtraDamage.length > 0 ? (
        <p>
          Extra:{' '}
          {weapon.kitExtraDamage
            .map((extra) => {
              const type =
                DAMAGE_TYPE_LABELS[
                  extra.damageType as keyof typeof DAMAGE_TYPE_LABELS
                ] ?? extra.damageType
              return `${extra.label} ${extra.amount} ${type}${
                extra.persistent ? ' persistente' : ''
              }`
            })
            .join(', ')}
        </p>
      ) : null}
      {weapon.breakdown.length > 0 ? (
        <dl className="space-y-0.5">
          {weapon.breakdown.map((part) => (
            <div
              key={part.label}
              className="grid grid-cols-[8rem_1fr] gap-x-2"
            >
              <dt className="text-text-dim">{part.label}</dt>
              <dd className="tabular-nums text-text">
                {typeof part.value === 'number'
                  ? formatModifier(part.value)
                  : part.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {def.description ? (
        <div className="whitespace-pre-wrap text-text">
          <RichText as="div">{polishRulesText(def.description)}</RichText>
        </div>
      ) : null}
      {weapon.item.notes ? (
        <p className="italic text-text-dim">{weapon.item.notes}</p>
      ) : null}
      {weapon.item.affixedTalismanId ? (
        <AffixedTalismanRules definitionId={weapon.item.affixedTalismanId} />
      ) : null}
    </div>
  )
}

function AffixedTalismanRules({ definitionId }: { definitionId: string }) {
  const def = getItemDefinition(definitionId)
  if (!def) return null
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
        Talismã · {def.name}
      </p>
      <ItemDetailRules item={def} />
    </div>
  )
}

function WeaponCombatRow({
  weapon,
  items,
  mapFlags,
  spellcastingSources,
  onChangeEquipment,
  onSpendPoison,
  onActivateTalisman,
}: {
  weapon: ResolvedWeaponAttack
  items: EquipmentItem[]
  mapFlags: MapFlags
  spellcastingSources: ResolvedSpellcastingSource[]
  onChangeEquipment?: (items: EquipmentItem[]) => void
  onSpendPoison?: (weaponId: string) => void
  onActivateTalisman?: (hostId: string) => void
}) {
  return (
    <li>
      <ExpandableCard
        title={weapon.displayName}
        subtitle={`${weapon.damageSummary}${
          weapon.stats.rangeType === 'ranged'
            ? ' · à distância'
            : ' · corpo a corpo'
        }`}
        toolbar={
          <WeaponStrikeToolbar
            weapon={weapon}
            items={items}
            mapFlags={mapFlags}
            onChangeEquipment={onChangeEquipment}
            onSpendPoison={onSpendPoison}
            onActivateTalisman={onActivateTalisman}
          />
        }
      >
        <WeaponCombatDetails weapon={weapon} mapFlags={mapFlags} />
      </ExpandableCard>
      {weapon.item.affixedSpellheartId ? (
        <AffixedSpellheartCombat
          host={weapon.item}
          sources={spellcastingSources}
          onChangeSource={
            onChangeEquipment
              ? (sourceId) => {
                  onChangeEquipment(
                    items.map((it) =>
                      it.id === weapon.item.id
                        ? { ...it, spellcastingSourceId: sourceId }
                        : it,
                    ),
                  )
                }
              : undefined
          }
        />
      ) : null}
    </li>
  )
}

function CombinationWeaponRow({
  modes,
  items,
  mapFlags,
  spellcastingSources,
  onChangeEquipment,
  onSpendPoison,
  onActivateTalisman,
}: {
  modes: ResolvedWeaponAttack[]
  items: EquipmentItem[]
  mapFlags: MapFlags
  spellcastingSources: ResolvedSpellcastingSource[]
  onChangeEquipment?: (items: EquipmentItem[]) => void
  onSpendPoison?: (weaponId: string) => void
  onActivateTalisman?: (hostId: string) => void
}) {
  const first = modes[0]
  if (!first) return null
  const title = combinationBaseName(first.displayName) || first.displayName

  return (
    <li>
      <ExpandableCard
        title={title}
        badges={<Badge className="!text-[9px]">Híbrida</Badge>}
        subtitle={
          <span className="inline-flex flex-wrap items-center gap-1">
            <ActionCost type="one" />
            Interagir para mudar o modo · os dois Golpes abaixo
          </span>
        }
        toolbar={
          <div className="space-y-2">
            {modes.map((weapon) => (
              <div
                key={resolvedWeaponAttackKey(
                  weapon.item.id,
                  weapon.definition.id,
                )}
                className="rounded-md border border-border/70 bg-surface-1/60 px-2 py-1.5"
              >
                <p className="mb-1 text-[11px] font-medium text-text">
                  {combinationModeSummary(weapon)}
                </p>
                <WeaponStrikeToolbar
                  weapon={weapon}
                  items={items}
                  mapFlags={mapFlags}
                  onChangeEquipment={onChangeEquipment}
                  hideItemExtras
                />
              </div>
            ))}
            <WeaponItemExtras
              weapon={first}
              onSpendPoison={onSpendPoison}
              onActivateTalisman={onActivateTalisman}
            />
          </div>
        }
      >
        <p className="text-[11px] text-text-dim">
          Arma Combination: a mesma peça física tem dois modos (runas, veneno e
          talismã valem nos dois). Trocar a configuração gasta 1 Interagir.
        </p>
        {modes.map((weapon, index) => (
          <div
            key={resolvedWeaponAttackKey(
              weapon.item.id,
              weapon.definition.id,
            )}
            className={`space-y-1 ${
              index === 0 ? '' : 'border-t border-border/50 pt-2'
            }`}
          >
            <p className="text-[11px] font-medium text-text">
              Modo {combinationModeTitle(weapon.stats.rangeType)}
            </p>
            <WeaponCombatDetails weapon={weapon} mapFlags={mapFlags} />
          </div>
        ))}
      </ExpandableCard>
      {first.item.affixedSpellheartId ? (
        <AffixedSpellheartCombat
          host={first.item}
          sources={spellcastingSources}
          onChangeSource={
            onChangeEquipment
              ? (sourceId) => {
                  onChangeEquipment(
                    items.map((it) =>
                      it.id === first.item.id
                        ? { ...it, spellcastingSourceId: sourceId }
                        : it,
                    ),
                  )
                }
              : undefined
          }
        />
      ) : null}
    </li>
  )
}

function WeaponItemExtras({
  weapon,
  onSpendPoison,
  onActivateTalisman,
}: {
  weapon: ResolvedWeaponAttack
  onSpendPoison?: (weaponId: string) => void
  onActivateTalisman?: (hostId: string) => void
}) {
  if (!weapon.item.appliedPoisonId && !weapon.item.affixedTalismanId) {
    return null
  }
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {weapon.item.appliedPoisonId && onSpendPoison ? (
        <button
          type="button"
          className="rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent hover:bg-accent/20"
          onClick={() => onSpendPoison(weapon.item.id)}
        >
          Veneno atingiu — gastar
        </button>
      ) : null}
      {weapon.item.affixedTalismanId && onActivateTalisman ? (
        <button
          type="button"
          className="rounded-md border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent hover:bg-accent/20"
          onClick={() => onActivateTalisman(weapon.item.id)}
        >
          Ativar{' '}
          {getItemDefinition(weapon.item.affixedTalismanId)?.name ?? 'talismã'}
        </button>
      ) : null}
    </div>
  )
}

function WeaponStrikeToolbar({
  weapon,
  items,
  mapFlags,
  onChangeEquipment,
  onSpendPoison,
  onActivateTalisman,
  hideItemExtras = false,
}: {
  weapon: ResolvedWeaponAttack
  items: EquipmentItem[]
  mapFlags: MapFlags
  onChangeEquipment?: (items: EquipmentItem[]) => void
  onSpendPoison?: (weaponId: string) => void
  onActivateTalisman?: (hostId: string) => void
  hideItemExtras?: boolean
}) {
  const parsed = parseDiceFormula(weapon.damageDice)
  const damageHint = parsed
    ? `${weapon.damageDice}${
        weapon.damageModifier
          ? formatModifier(weapon.damageModifier)
          : ''
      }`
    : undefined
  const extras = weapon.runes.extraDamage.filter(
    (part) => part.when !== 'crit' && !part.persistent,
  )
  const shotKind = weaponShotKind(weapon.definition)
  const ammoGroup = weapon.stats.group
  const ammoStacks =
    shotKind === 'ammo' ? listCompatibleAmmo(items, ammoGroup) : []
  const loaded =
    shotKind === 'ammo'
      ? pickLoadedAmmo(items, weapon.item, ammoGroup)
      : shotKind === 'self'
        ? weapon.item
        : null
  const remaining = loaded?.quantity ?? 0
  const outOfAmmo = shotKind != null && remaining < 1
  const attackBreakdown = weapon.breakdown.filter(
    (b): b is { label: string; value: number } => typeof b.value === 'number',
  )
  const untrained = weapon.proficiencyRank === 'untrained'
  const mapProfile = resolveMapProfile(traitsForMap(weapon), mapFlags)

  function rollDamage() {
    if (!parsed) return
    useDiceStore
      .getState()
      .rollFree(
        parsed.sides,
        parsed.count,
        weapon.damageModifier,
        `Dano · ${weapon.displayName}`,
      )
    for (const extra of extras) {
      const extraParsed = parseDiceFormula(extra.dice)
      if (!extraParsed) continue
      const type =
        DAMAGE_TYPE_LABELS[extra.damageType as keyof typeof DAMAGE_TYPE_LABELS] ??
        extra.damageType
      useDiceStore
        .getState()
        .rollFree(
          extraParsed.sides,
          extraParsed.count,
          0,
          `${type} · ${weapon.displayName}`,
        )
    }
    for (const extra of weapon.kitExtraDamage ?? []) {
      const type =
        DAMAGE_TYPE_LABELS[extra.damageType as keyof typeof DAMAGE_TYPE_LABELS] ??
        (extra.damageType === 'untyped' ? extra.label : extra.damageType)
      const persist = extra.persistent ? ' persistente' : ''
      useDiceStore
        .getState()
        .rollFree(6, 0, extra.amount, `${type}${persist} · ${weapon.displayName}`)
    }
  }

  function spendShot(): boolean {
    if (shotKind == null || !onChangeEquipment) return true
    const result = spendWeaponShot(items, weapon.item.id)
    if (!result.ok) return false
    onChangeEquipment(result.items)
    return true
  }

  return (
    <div className="space-y-1.5">
      {untrained ? (
        <UntrainedWeaponNotice category={weapon.stats.proficiency} />
      ) : null}
      <div className="flex flex-wrap items-center gap-1.5">
        <MapAttackChips
          name={weapon.displayName}
          baseBonus={weapon.attackBonus}
          profile={mapProfile}
          breakdown={attackBreakdown}
          disabled={weapon.attackBonus == null || outOfAmmo}
          disabledTitle={
            outOfAmmo
              ? shotKind === 'self'
                ? 'Acabou.'
                : 'Sem munição.'
              : weapon.attackPendingReason
          }
          onBeforeRoll={spendShot}
        />
        <RollChip
          label="Dano"
          hint={damageHint}
          disabled={!parsed}
          onClick={rollDamage}
        />
      </div>
      {shotKind === 'ammo' ? (
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          {ammoStacks.length > 1 && onChangeEquipment ? (
            <Select
              className="w-auto min-w-[10rem] py-1 text-[11px]"
              value={loaded?.id ?? ''}
              onChange={(e) =>
                onChangeEquipment(
                  items.map((it) =>
                    it.id === weapon.item.id
                      ? { ...it, loadedAmmoItemId: e.target.value || null }
                      : it,
                  ),
                )
              }
            >
              {ammoStacks.map((stack) => (
                <option key={stack.id} value={stack.id}>
                  {stack.name} ×{stack.quantity}
                </option>
              ))}
            </Select>
          ) : (
            <span className={outOfAmmo ? 'text-danger' : 'text-text-dim'}>
              {loaded
                ? `${loaded.name}: ${remaining}`
                : 'Sem munição no inventário'}
            </span>
          )}
        </div>
      ) : null}
      {shotKind === 'self' ? (
        <p
          className={`text-[11px] ${
            outOfAmmo ? 'text-danger' : 'text-text-dim'
          }`}
        >
          {remaining} un. · gasta 1 no ataque
        </p>
      ) : null}
      {hideItemExtras ? null : (
        <WeaponItemExtras
          weapon={weapon}
          onSpendPoison={onSpendPoison}
          onActivateTalisman={onActivateTalisman}
        />
      )}
    </div>
  )
}

function KitItemRow({
  row,
  canAct,
  spellcastingSources,
  onChangeSource,
  onDrink,
  onConsume,
  onSpendWand,
  onSpendStaff,
  onSetQuantity,
}: {
  row: ResolvedInventoryItem
  canAct: boolean
  spellcastingSources: ResolvedSpellcastingSource[]
  onChangeSource?: (sourceId: string) => void
  onDrink: () => void
  onConsume: () => void
  onSpendWand?: () => void
  onSpendStaff?: (rank: number) => void
  onSetQuantity?: (quantity: number) => void
}) {
  const item = row.item
  const def = row.definition!
  const qty = item.quantity ?? 1
  const category = ITEM_CATEGORY_LABELS[def.category]
  const scrollSpell = item.scrollSpellId
    ? getSpellById(item.scrollSpellId)
    : null
  const scrollName = scrollSpell ? withLocalizedSpell(scrollSpell).name : null
  const wandSpellId = resolveWandSpellId(item, def.wand)
  const wandSpell = wandSpellId ? getSpellById(wandSpellId) : null
  const wandName = wandSpell ? withLocalizedSpell(wandSpell).name : null

  const isDrink =
    Boolean(def.consumable && def.consumable.kind !== 'oil') ||
    def.alchemical?.kind === 'elixir' ||
    def.alchemical?.kind === 'mutagen'
  const isActivateTool = def.alchemical?.kind === 'tool'
  const isScroll = Boolean(def.scroll)
  const isSnare = Boolean(def.snare)
  const isAmmo = def.category === 'ammunition'
  const isWand = Boolean(def.wand)
  const isStaff = Boolean(def.staff)
  const isBomb = Boolean(def.alchemical?.bomb)
  const isOil = def.consumable?.kind === 'oil'
  const isPoison = def.alchemical?.kind === 'poison'

  const detail = kitDetail(def, item, scrollName ?? wandName)
  const kitSpell = scrollSpell ?? wandSpell
  const kitSpellName = scrollName ?? wandName
  const staffSpells = isStaff && def.staff
    ? def.staff.spellsByRank.flatMap((entry) =>
        entry.spellIds.map((id) => getSpellById(id)),
      )
    : []
  const resolvedSource = resolveItemSpellcastingSourceForSpells(
    spellcastingSources,
    item.spellcastingSourceId,
    isStaff ? staffSpells : kitSpell ? [kitSpell] : [],
  )
  const spellAttack = resolvedSource?.spellAttack
  const spellDc = resolvedSource?.spellDc
  const attackBreakdown = resolvedSource
    ? sourceAttackBreakdown(resolvedSource)
    : undefined
  const sourcePicker =
    (isScroll || isWand || isStaff) && onChangeSource ? (
      <SpellcastingSourcePicker
        sources={spellcastingSources}
        value={item.spellcastingSourceId}
        spell={kitSpell}
        spells={isStaff ? staffSpells : undefined}
        mismatchHint={
          isStaff
            ? 'Nenhuma magia deste cajado está na tradição desta fonte. Use Truque de Item Mágico ou escolha outra.'
            : undefined
        }
        onChange={onChangeSource}
      />
    ) : null

  return (
    <li className="rounded-lg border border-border/60 bg-surface-2/30 px-2.5 py-2">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-medium text-text">{item.name}</span>
            <Badge className="!text-[9px]">×{qty}</Badge>
            <Badge className="!text-[9px]">{category}</Badge>
          </div>
          {detail ? (
            <p className="mt-0.5 text-[11px] text-text-dim">
              {polishRulesText(detail)}
            </p>
          ) : null}
        </div>
        {canAct && isAmmo && onSetQuantity ? (
          <div className="flex items-center rounded-lg border border-border/80 bg-surface-2">
            <button
              type="button"
              className="px-2 py-1 text-xs text-text-muted hover:text-text"
              onClick={() => onSetQuantity(qty - 1)}
              aria-label="Gastar 1"
            >
              −
            </button>
            <span className="min-w-6 px-1 text-center text-xs tabular-nums text-text">
              {qty}
            </span>
            <button
              type="button"
              className="px-2 py-1 text-xs text-text-muted hover:text-text"
              onClick={() => onSetQuantity(qty + 1)}
              aria-label="Adicionar 1"
            >
              +
            </button>
          </div>
        ) : canAct && isScroll ? (
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {kitSpell && kitSpellName ? (
              <CombatSpellRolls
                spell={kitSpell}
                displayName={kitSpellName}
                attackBonus={spellAttack}
                spellDc={spellDc}
                attackBreakdown={attackBreakdown}
              />
            ) : null}
            <Button
              size="sm"
              variant="accent"
              disabled={!item.scrollSpellId}
              onClick={onConsume}
            >
              Conjurar
            </Button>
          </div>
        ) : canAct && isWand ? (
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            {kitSpell && kitSpellName ? (
              <CombatSpellRolls
                spell={kitSpell}
                displayName={kitSpellName}
                attackBonus={spellAttack}
                spellDc={spellDc}
                attackBreakdown={attackBreakdown}
              />
            ) : null}
            <Button
              size="sm"
              variant="accent"
              disabled={item.broken || (item.charges ?? 0) < 1 || !wandSpellId}
              title={
                item.broken
                  ? 'Varinha destruída'
                  : (item.charges ?? 0) < 1
                    ? 'Sem carga — sobrecarga fica em Equipamento'
                    : 'Gasta a carga diária'
              }
              onClick={onSpendWand}
            >
              Conjurar
            </Button>
          </div>
        ) : canAct && !isAmmo && !isStaff && !isBomb && !isOil && !isPoison ? (
          <div className="flex flex-wrap gap-1.5">
            {isDrink ? (
              <Button size="sm" variant="accent" onClick={onDrink}>
                Beber
              </Button>
            ) : isActivateTool ? (
              <Button size="sm" variant="accent" onClick={onDrink}>
                Ativar
              </Button>
            ) : isSnare ? (
              <Button size="sm" variant="accent" onClick={onConsume}>
                Armar
              </Button>
            ) : null}
          </div>
        ) : isBomb ? (
          <p className="text-[10px] text-text-dim">Equipe para atacar</p>
        ) : isOil || isPoison ? (
          <p className="text-[10px] text-text-dim">Aplique em Equipamento</p>
        ) : null}
      </div>
      {(isScroll || isWand) && sourcePicker ? (
        <div className="mt-1.5">{sourcePicker}</div>
      ) : null}
      {(isScroll || isWand) && kitSpell ? (
        <div className="mt-1.5">
          <SpellRulesCard spell={kitSpell} />
        </div>
      ) : null}
      {def.description && !isStaff ? (
        <div className="mt-1.5">
          <ExpandableCard compact title="O que faz">
            <ItemDetailRules item={def} />
          </ExpandableCard>
        </div>
      ) : null}
      {isStaff && def.staff ? (
        <>
          {sourcePicker ? (
            <div className="mt-1.5">{sourcePicker}</div>
          ) : null}
          <div className="mt-2 space-y-1.5 border-t border-border/50 pt-2">
            <StaffSpellCards
              staff={def.staff}
              actionsFor={({ rank }) =>
                canAct && rank > 0 ? (
                  <Button
                    size="sm"
                    variant="accent"
                    disabled={
                      !item.preparedStaff || (item.charges ?? 0) < rank
                    }
                    onClick={() => onSpendStaff?.(rank)}
                  >
                    Gastar
                  </Button>
                ) : null
              }
              toolbarFor={({ spell, label }) =>
                spell ? (
                  <CombatSpellRolls
                    spell={spell}
                    displayName={label}
                    attackBonus={spellAttack}
                    spellDc={spellDc}
                    attackBreakdown={attackBreakdown}
                  />
                ) : null
              }
            />
          </div>
        </>
      ) : null}
    </li>
  )
}

function kitDetail(
  def: ItemDefinition,
  item: EquipmentItem,
  spellName: string | null,
): string | null {
  if (def.consumable?.hpDice) {
    return `Restaura ${def.consumable.hpDice}${
      def.consumable.hpFlat ? `+${def.consumable.hpFlat}` : ''
    } PV`
  }
  if (def.consumable?.note) return def.consumable.note
  if (def.alchemical?.elixir?.hpDice) {
    const elixir = def.alchemical.elixir
    return `Restaura ${elixir.hpDice}${elixir.hpFlat ? `+${elixir.hpFlat}` : ''} PV`
  }
  if (def.alchemical?.mutagen) {
    return `${def.alchemical.mutagen.benefit} · ${def.alchemical.mutagen.duration}`
  }
  if (def.alchemical?.tool?.note) return def.alchemical.tool.note
  if (def.alchemical?.poison) {
    return `Fortitude CD ${def.alchemical.poison.dc}`
  }
  if (def.alchemical?.bomb) {
    return 'Bomba · equipe para aparecer em Armas'
  }
  if (def.scroll) {
    return spellName
      ? `${spellName} · ${def.scroll.spellRank}º posto`
      : `Pergaminho de ${def.scroll.spellRank}º · escolha a magia em Equipamento`
  }
  if (def.wand) {
    return spellName
      ? `${spellName} · ${item.charges ?? 0} carga(s)`
      : `Varinha · ${item.charges ?? 0} carga(s)`
  }
  if (def.staff) {
    return `Cajado · ${item.charges ?? 0} carga(s)${
      item.preparedStaff ? ' · preparado' : ''
    }`
  }
  if (def.snare?.note) return def.snare.note
  return def.subcategory ?? null
}
