import { useMemo, useState } from 'react'
import { POISON_EXPOSURE_LABELS } from '@/types'
import type {
  ActiveItemEffect,
  EquipmentItem,
  ResolvedSpellcastingSource,
} from '@/types'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Field'
import { RichText } from '@/components/ui/RichText'
import { formatSpeedMeters } from '@/utils/labels'
import { ItemActivationBlocks } from '@/features/equipment/components/ItemActivationBlocks'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import { getSpellById, listSpellsByRank } from '@/engine/spellCatalog'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import { SpellRulesCard } from '@/features/spells/components/SpellRulesCard'
import { SpellcastingSourcePicker } from '@/features/spells/components/SpellcastingSourcePicker'
import {
  SpellheartSpellCards,
  StaffSpellCards,
} from '@/features/equipment/components/ItemSpellCards'
import {
  nextSpellcastingSourceIdOnSpellChange,
  traditionLabel,
} from '@/engine/spellcasting'
import { listSpellheartSpells } from '@/engine/spellheartSpells'
import {
  breakWand,
  consumeItem,
  spendStaffCharge,
  spendWandCharge,
  wandOverchargeDc,
} from '@/engine/magicItems'
import {
  activateAlchemicalEffect,
  activateAffixedTalisman,
  affixSpellheart,
  affixTalisman,
  applyInjuryPoison,
  applyOilOfPotency,
  applySilverSalve,
  canAffixTalisman,
  canApplyInjuryPoison,
  canApplyOil,
  canApplySilverSalve,
  unfixSpellheart,
  unfixTalisman,
} from '@/engine/activeItems'
import { prepareGrimoire } from '@/engine/magicItems'
import { TALISMAN_HOST_LABELS } from '@/types/equipment'
import { useDiceStore } from '@/stores/diceStore'
import type { DiceSides } from '@/utils/dice'
import { createId } from '@/utils/id'

interface MagicItemControlsProps {
  item: EquipmentItem
  items: EquipmentItem[]
  highestSlotRank: number
  activeEffects: ActiveItemEffect[]
  spellcastingSources?: ResolvedSpellcastingSource[]
  onChange: (items: EquipmentItem[]) => void
  onChangeActiveEffects: (effects: ActiveItemEffect[]) => void
}

function replaceItem(
  items: EquipmentItem[],
  next: EquipmentItem | null,
  id: string,
): EquipmentItem[] {
  if (!next) return items.filter((it) => it.id !== id)
  return items.map((it) => (it.id === id ? next : it))
}

const DICE_SIDES: DiceSides[] = [4, 6, 8, 10, 12, 20, 100]

function rollHealDice(label: string, formula: string, flat = 0) {
  const match = formula.match(/^(\d+)d(\d+)$/)
  if (!match) return
  const count = Number(match[1])
  const sides = Number(match[2]) as DiceSides
  if (!DICE_SIDES.includes(sides)) return
  useDiceStore.getState().rollFree(sides, count, flat, label)
}

export function MagicItemControls({
  item,
  items,
  highestSlotRank,
  activeEffects,
  spellcastingSources = [],
  onChange,
  onChangeActiveEffects,
}: MagicItemControlsProps) {
  const definition = getItemDefinition(item.definitionId)
  const hasSpecial = Boolean(
    definition?.staff ||
      definition?.wand ||
      definition?.alchemical ||
      definition?.talisman ||
      definition?.scroll ||
      definition?.consumable ||
      definition?.snare ||
      definition?.grimoire ||
      definition?.spellheart ||
      definition?.wornMagic ||
      item.affixedTalismanId ||
      item.affixedSpellheartId,
  )
  if (!hasSpecial) return null
  const shared = {
    item,
    items,
    highestSlotRank,
    activeEffects,
    spellcastingSources,
    onChange,
    onChangeActiveEffects,
  }
  return (
    <>
      {definition?.staff ? <StaffControls {...shared} /> : null}
      {definition?.wand ? <WandControls {...shared} /> : null}
      {definition?.alchemical ? <AlchemicalControls {...shared} /> : null}
      {definition?.talisman ? <TalismanControls {...shared} /> : null}
      {definition?.scroll ? <ScrollControls {...shared} /> : null}
      {definition?.snare ? <SnareControls {...shared} /> : null}
      {definition?.grimoire ? <GrimoireControls {...shared} /> : null}
      {definition?.spellheart ? <SpellheartControls {...shared} /> : null}
      {definition?.wornMagic ? <WornMagicControls {...shared} /> : null}
      {definition?.consumable ? <ConsumableControls {...shared} /> : null}
      {item.affixedTalismanId ? <AffixedTalismanControls {...shared} /> : null}
      {item.affixedSpellheartId ? <AffixedSpellheartControls {...shared} /> : null}
    </>
  )
}

function WornMagicControls({ item }: MagicItemControlsProps) {
  const definition = getItemDefinition(item.definitionId)
  const magic = definition?.wornMagic
  if (!magic) return null
  const activations = magic.activations ?? []
  const lines = [
    activations.length ? null : magic.activate,
    magic.frequency && !activations.length ? `Frequência: ${magic.frequency}` : null,
    magic.note,
  ].filter(Boolean)
  if (activations.length === 0 && lines.length === 0) return null
  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        {definition?.category === 'tattoo' ? 'Tatuagem permanente' : 'Item permanente'}
      </p>
      {activations.length > 0 ? (
        <div className="mt-1">
          <ItemActivationBlocks activations={activations} />
        </div>
      ) : null}
      {lines.map((line) => (
        <p key={line} className="mt-1 text-[11px] leading-snug text-text-dim">
          <RichText>{line}</RichText>
        </p>
      ))}
    </div>
  )
}

function StaffControls({
  item,
  items,
  highestSlotRank,
  spellcastingSources = [],
  onChange,
}: MagicItemControlsProps) {
  const definition = getItemDefinition(item.definitionId)
  const staff = definition?.staff
  if (!staff) return null
  const charges = item.charges ?? 0
  const prepared = Boolean(item.preparedStaff)
  const staffSpells = staff.spellsByRank.flatMap((entry) =>
    entry.spellIds.map((id) => getSpellById(id)),
  )

  function setPrepared(checked: boolean) {
    onChange(
      items.map((it) => {
        const isStaff = Boolean(getItemDefinition(it.definitionId)?.staff)
        if (!isStaff) return it
        if (it.id === item.id) {
          return {
            ...it,
            preparedStaff: checked,
            charges: checked ? Math.max(0, highestSlotRank) : 0,
          }
        }
        return checked
          ? { ...it, preparedStaff: false, charges: 0 }
          : it
      }),
    )
  }

  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium text-text-muted">
          Cajado mágico
          <span className="ml-1 font-normal text-text-dim">
            · {charges} carga{charges === 1 ? '' : 's'}
            {prepared ? ` (preparado, máx. ${highestSlotRank})` : ''}
          </span>
        </p>
        <label className="flex items-center gap-1.5 text-[11px] text-text-muted">
          <input
            type="checkbox"
            checked={prepared}
            onChange={(e) => setPrepared(e.target.checked)}
          />
          Preparar hoje
        </label>
      </div>
      <div className="mt-1.5">
        <SpellcastingSourcePicker
          sources={spellcastingSources}
          value={item.spellcastingSourceId}
          spells={staffSpells}
          mismatchHint="Nenhuma magia deste cajado está na tradição desta fonte. Use Truque de Item Mágico ou escolha outra."
          onChange={(sourceId) =>
            onChange(
              replaceItem(
                items,
                { ...item, spellcastingSourceId: sourceId },
                item.id,
              ),
            )
          }
        />
      </div>
      {staff.wieldNote ? (
        <p className="mt-1 text-[11px] text-text-dim">{staff.wieldNote}</p>
      ) : null}
      {staff.healItemBonus ? (
        <p className="mt-1 text-[11px] text-text-dim">
          Curar restaura +{staff.healItemBonus} PV (bônus de item) quando
          conjurada com seus espaços ou com cargas deste cajado.
        </p>
      ) : null}
      <div className="mt-1.5">
        <StaffSpellCards
          staff={staff}
          actionsFor={({ rank }) => {
            const canCast = prepared && charges >= rank
            if (rank === 0) return null
            return (
              <Button
                size="sm"
                variant="accent"
                disabled={!canCast}
                title={
                  canCast
                    ? `Gastar ${rank} carga(s)`
                    : 'Sem cargas ou cajado não preparado'
                }
                onClick={() => {
                  const next = spendStaffCharge(item, rank)
                  if (next) onChange(replaceItem(items, next, item.id))
                }}
              >
                Gastar
              </Button>
            )
          }}
        />
      </div>
      <p className="mt-1.5 text-[10px] text-text-dim">
        Só quem tem ao menos uma dessas magias na lista pode preparar o cajado.
        Truques não gastam carga. Abra a magia para ler o efeito; Gastar desconta
        as cargas.
      </p>
    </div>
  )
}

function WandControls({
  item,
  items,
  spellcastingSources = [],
  onChange,
}: MagicItemControlsProps) {
  const definition = getItemDefinition(item.definitionId)
  const wand = definition?.wand
  const [open, setOpen] = useState(false)
  const spells = useMemo(() => {
    if (!wand) return []
    const seen = new Set<string>()
    return listSpellsByRank(wand.spellRank)
      .filter((spell) => spell.rarity === 'common')
      .filter((spell) => {
        if (seen.has(spell.id)) return false
        seen.add(spell.id)
        return true
      })
      .map(withLocalizedSpell)
  }, [wand])
  if (!wand) return null
  const rawSpell = getSpellById(item.wandSpellId)
  const spell = rawSpell ? withLocalizedSpell(rawSpell) : null
  const charges = item.charges ?? 0
  const overcharges = item.wandOvercharges ?? 0
  const dc = wandOverchargeDc(overcharges)

  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        {wand.kind && wand.kind !== 'generic' ? 'Varinha especial' : 'Varinha'}{' '}
        · {wand.spellRank}º posto
        {item.broken ? (
          <span className="ml-1 text-danger">destruída</span>
        ) : (
          <span className="ml-1 font-normal text-text-dim">
            · {charges >= 1 ? 'pronta (1/dia)' : 'já usada hoje'}
          </span>
        )}
      </p>
      {wand.effectNote ? (
        <p className="mt-1 text-[11px] text-text-dim">{wand.effectNote}</p>
      ) : null}
      {wand.extraCastActions ? (
        <p className="text-[11px] text-text-dim">
          Ativação: <RichText>{wand.extraCastActions}</RichText>.
        </p>
      ) : null}
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        {wand.fixedSpellId ? (
          <p className="text-[11px] text-text-muted">
            Magia: {spell?.name ?? 'saraivada de força'}
          </p>
        ) : (
        <Select
          className="min-w-[12rem] flex-1"
          value={item.wandSpellId ?? ''}
          onChange={(e) => {
            const wandSpellId = e.target.value || null
            const nextSpell = wandSpellId ? getSpellById(wandSpellId) : null
            onChange(
              replaceItem(
                items,
                {
                  ...item,
                  wandSpellId,
                  spellcastingSourceId: nextSpellcastingSourceIdOnSpellChange(
                    spellcastingSources,
                    item.spellcastingSourceId,
                    nextSpell,
                  ),
                },
                item.id,
              ),
            )
          }}
        >
          <option value="">Escolher magia…</option>
          {spells.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
              {s.traditions?.length
                ? ` · ${s.traditions.map(traditionLabel).join('/')}`
                : ''}
            </option>
          ))}
        </Select>
        )}
        <SpellcastingSourcePicker
          sources={spellcastingSources}
          value={item.spellcastingSourceId}
          spell={spell}
          onChange={(sourceId) =>
            onChange(
              replaceItem(
                items,
                { ...item, spellcastingSourceId: sourceId },
                item.id,
              ),
            )
          }
        />
        {!item.broken && (
          <Button
            size="sm"
            variant="accent"
            disabled={!item.wandSpellId}
            onClick={() => {
              const next = spendWandCharge(item)
              if (next) onChange(replaceItem(items, next, item.id))
            }}
          >
            {charges >= 1 ? 'Conjurar' : `Sobrecarregar (CD ${dc})`}
          </Button>
        )}
        {!item.broken && charges < 1 && (
          <Button
            size="sm"
            variant="danger"
            onClick={() => onChange(replaceItem(items, breakWand(item), item.id))}
          >
            Falhou — destruir
          </Button>
        )}
      </div>
      {spell ? (
        <div className="mt-1.5">
          <SpellRulesCard spell={spell} />
        </div>
      ) : (
        <p className="mt-1 text-[11px] text-text-dim">
          A magia fica gravada na varinha. Truques e magias de foco não servem.
        </p>
      )}
      {open ? (
        <p className="mt-1 text-[10px] text-text-dim">
          Sobrecarga: teste simples CD {dc}. Sucesso conjura de novo; falha
          destrói a varinha. Cada tentativa extra no mesmo dia sobe a CD em 5.
        </p>
      ) : (
        <button
          type="button"
          className="mt-1 text-[10px] text-text-dim underline-offset-2 hover:underline"
          onClick={() => setOpen(true)}
        >
          Como funciona a sobrecarga?
        </button>
      )}
    </div>
  )
}

function TalismanControls({
  item,
  items,
  onChange,
}: MagicItemControlsProps) {
  const [hostId, setHostId] = useState('')
  const [material, setMaterial] = useState('')
  const definition = getItemDefinition(item.definitionId)
  const talisman = definition?.talisman
  const hosts = useMemo(
    () =>
      items.filter((it) =>
        canAffixTalisman(getItemDefinition(it.definitionId), talisman),
      ),
    [items, talisman],
  )
  if (!definition || !talisman) return null
  const catalogItem = definition
  const materials = talisman.alloyMaterials ?? []

  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        Talismã
        <span className="ml-1 font-normal text-text-dim">
          · afixe em {TALISMAN_HOST_LABELS[talisman.affixesTo]} · {item.quantity}{' '}
          un.
        </span>
      </p>
      <p className="mt-1 text-[11px] text-text-dim">
        Ativação: <RichText>{talisman.activate}</RichText>
        {talisman.trigger ? ` · Gatilho: ${talisman.trigger}` : ''}
        {talisman.requirements ? ` · Requisito: ${talisman.requirements}` : ''}
      </p>
      <p className="text-[11px] text-text-dim">
        <RichText>{talisman.note}</RichText>
      </p>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <Select
          className="min-w-[10rem] flex-1"
          value={hostId}
          onChange={(e) => setHostId(e.target.value)}
        >
          <option value="">Escolher item…</option>
          {hosts.map((host) => (
            <option key={host.id} value={host.id}>
              {host.name}
              {host.affixedTalismanId ? ' (já tem talismã)' : ''}
            </option>
          ))}
        </Select>
        {materials.length > 0 ? (
          <Select
            className="min-w-[8rem]"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">Material…</option>
            {materials.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </Select>
        ) : null}
        <Button
          size="sm"
          variant="accent"
          disabled={!hostId || (materials.length > 0 && !material)}
          onClick={() =>
            onChange(
              affixTalisman(
                items,
                item,
                hostId,
                materials.length ? material : undefined,
              ),
            )
          }
        >
          Afixar (10 min)
        </Button>
      </div>
      {hosts.length === 0 ? (
        <p className="mt-1 text-[10px] text-text-dim">
          Nenhum item compatível na ficha
          {catalogItem.talisman?.maxWeaponLevel != null
            ? ` (nível ${catalogItem.talisman.maxWeaponLevel} ou menos)`
            : ''}
          .
        </p>
      ) : null}
    </div>
  )
}

function AffixedTalismanControls({
  item,
  items,
  activeEffects,
  onChange,
  onChangeActiveEffects,
}: MagicItemControlsProps) {
  const talismanDef = getItemDefinition(item.affixedTalismanId)
  const talisman = talismanDef?.talisman
  if (!talismanDef || !talisman) return null

  function activate() {
    const result = activateAffixedTalisman(
      items,
      activeEffects,
      item.id,
      createId('fx'),
    )
    onChange(result.items)
    onChangeActiveEffects(result.effects)
  }

  return (
    <div className="mt-2 rounded-lg border border-accent/30 bg-accent/5 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        Talismã afixado · {talismanDef.name}
        {item.affixedTalismanMaterial
          ? ` · ${item.affixedTalismanMaterial}`
          : ''}
      </p>
      <p className="mt-1 text-[11px] text-text-dim">
        Ativação: <RichText>{talisman.activate}</RichText>
        {talisman.trigger ? ` · Gatilho: ${talisman.trigger}` : ''}
      </p>
      <p className="text-[11px] text-text-dim">
        <RichText>{talisman.note}</RichText>
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <Button size="sm" variant="accent" onClick={activate}>
          Ativar (consome)
        </Button>
        <Button size="sm" onClick={() => onChange(unfixTalisman(items, item.id))}>
          Remover
        </Button>
      </div>
    </div>
  )
}

function ScrollControls({
  item,
  items,
  spellcastingSources = [],
  onChange,
}: MagicItemControlsProps) {
  const definition = getItemDefinition(item.definitionId)
  const scroll = definition?.scroll
  const spells = useMemo(() => {
    if (!scroll) return []
    const seen = new Set<string>()
    return listSpellsByRank(scroll.spellRank)
      .filter((spell) => spell.rarity === 'common')
      .filter((spell) => {
        if (seen.has(spell.id)) return false
        seen.add(spell.id)
        return true
      })
      .map(withLocalizedSpell)
  }, [scroll])
  if (!scroll) return null
  const rawSpell = getSpellById(item.scrollSpellId)
  const spell = rawSpell ? withLocalizedSpell(rawSpell) : null

  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        Pergaminho · {scroll.spellRank}º posto
        <span className="ml-1 font-normal text-text-dim">
          · {item.quantity} un.
        </span>
      </p>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <Select
          className="min-w-[12rem] flex-1"
          value={item.scrollSpellId ?? ''}
          onChange={(e) => {
            const scrollSpellId = e.target.value || null
            const nextSpell = scrollSpellId ? getSpellById(scrollSpellId) : null
            onChange(
              replaceItem(
                items,
                {
                  ...item,
                  scrollSpellId,
                  spellcastingSourceId: nextSpellcastingSourceIdOnSpellChange(
                    spellcastingSources,
                    item.spellcastingSourceId,
                    nextSpell,
                  ),
                },
                item.id,
              ),
            )
          }}
        >
          <option value="">Escolher magia…</option>
          {spells.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
              {s.traditions?.length
                ? ` · ${s.traditions.map(traditionLabel).join('/')}`
                : ''}
            </option>
          ))}
        </Select>
        <SpellcastingSourcePicker
          sources={spellcastingSources}
          value={item.spellcastingSourceId}
          spell={spell}
          onChange={(sourceId) =>
            onChange(
              replaceItem(
                items,
                { ...item, spellcastingSourceId: sourceId },
                item.id,
              ),
            )
          }
        />
        <Button
          size="sm"
          variant="accent"
          disabled={!item.scrollSpellId}
          onClick={() =>
            onChange(replaceItem(items, consumeItem(item), item.id))
          }
        >
          Conjurar (consome)
        </Button>
      </div>
      {spell ? (
        <div className="mt-1.5">
          <SpellRulesCard spell={spell} />
        </div>
      ) : (
        <p className="mt-1 text-[11px] text-text-dim">
          A magia precisa estar na sua lista. Use seu ataque de magia e sua CD.
          Truques, magias de foco e rituais não entram em pergaminho.
        </p>
      )}
    </div>
  )
}

function SnareControls({ item, items, onChange }: MagicItemControlsProps) {
  const definition = getItemDefinition(item.definitionId)
  const snare = definition?.snare
  if (!snare) return null
  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium text-text-muted">
          Cilada
          <span className="ml-1 font-normal text-text-dim">
            · {item.quantity} un.
          </span>
        </p>
        <Button
          size="sm"
          variant="accent"
          onClick={() =>
            onChange(replaceItem(items, consumeItem(item), item.id))
          }
        >
          Armar (1 min, consome)
        </Button>
      </div>
      {snare.save ? (
        <p className="mt-1 text-[11px] text-text-dim">{snare.save}</p>
      ) : null}
      <p className="text-[11px] text-text-dim">{snare.note}</p>
      {snare.craftRequirement ? (
        <p className="text-[10px] text-text-dim">
          Ofício: {snare.craftRequirement}
        </p>
      ) : null}
    </div>
  )
}

function GrimoireControls({ item, items, onChange }: MagicItemControlsProps) {
  const definition = getItemDefinition(item.definitionId)
  const grimoire = definition?.grimoire
  if (!grimoire) return null
  const prepared = Boolean(item.preparedGrimoire)
  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        Grimório
        {prepared ? (
          <span className="ml-1 text-accent">· estudado hoje</span>
        ) : (
          <span className="ml-1 font-normal text-text-dim">
            · ainda não estudado hoje
          </span>
        )}
      </p>
      <p className="mt-1 text-[11px] text-text-dim">
        Ativação: <RichText>{grimoire.activate}</RichText> · {grimoire.frequency}
      </p>
      <p className="text-[11px] text-text-dim">
        <RichText>{grimoire.note}</RichText>
      </p>
      <Button
        size="sm"
        variant="accent"
        className="mt-1.5"
        onClick={() => onChange(prepareGrimoire(items, item.id))}
      >
        Estudar nas preparações
      </Button>
    </div>
  )
}

function SpellheartControls({
  item,
  items,
  spellcastingSources = [],
  onChange,
}: MagicItemControlsProps) {
  const [hostId, setHostId] = useState('')
  const definition = getItemDefinition(item.definitionId)
  const spellheart = definition?.spellheart
  const hosts = useMemo(
    () =>
      items.filter((it) =>
        canAffixTalisman(getItemDefinition(it.definitionId), spellheart),
      ),
    [items, spellheart],
  )
  if (!definition || !spellheart) return null
  const heartSpells = listSpellheartSpells(spellheart)
  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        Coração de magia
        <span className="ml-1 font-normal text-text-dim">
          · afixe em {TALISMAN_HOST_LABELS[spellheart.affixesTo]}
        </span>
      </p>
      <p className="mt-1 text-[11px] text-text-dim">
        Armadura: {spellheart.armorBenefit}
      </p>
      <p className="text-[11px] text-text-dim">
        Arma: {spellheart.weaponBenefit}
      </p>
      <div className="mt-1.5">
        <SpellheartSpellCards stats={spellheart} />
      </div>
      <div className="mt-1.5">
        <SpellcastingSourcePicker
          sources={spellcastingSources}
          value={item.spellcastingSourceId}
          spells={heartSpells}
          mismatchHint="Nenhuma magia deste coração está na tradição desta fonte. Use Truque de Item Mágico ou escolha outra."
          onChange={(sourceId) =>
            onChange(
              replaceItem(
                items,
                { ...item, spellcastingSourceId: sourceId },
                item.id,
              ),
            )
          }
        />
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
        <Select
          className="min-w-[10rem] flex-1"
          value={hostId}
          onChange={(e) => setHostId(e.target.value)}
        >
          <option value="">Escolher item…</option>
          {hosts.map((host) => (
            <option key={host.id} value={host.id}>
              {host.name}
              {host.affixedTalismanId || host.affixedSpellheartId
                ? ' (já tem afixo)'
                : ''}
            </option>
          ))}
        </Select>
        <Button
          size="sm"
          variant="accent"
          disabled={!hostId}
          onClick={() => onChange(affixSpellheart(items, item, hostId))}
        >
          Afixar (10 min)
        </Button>
      </div>
    </div>
  )
}

function AffixedSpellheartControls({
  item,
  items,
  spellcastingSources = [],
  onChange,
}: MagicItemControlsProps) {
  const heartDef = getItemDefinition(item.affixedSpellheartId)
  const spellheart = heartDef?.spellheart
  if (!heartDef || !spellheart) return null
  const heartSpells = listSpellheartSpells(spellheart)
  return (
    <div className="mt-2 rounded-lg border border-accent/30 bg-accent/5 px-2.5 py-2">
      <p className="text-[11px] font-medium text-text-muted">
        Coração afixado · {heartDef.name}
      </p>
      <p className="mt-1 text-[11px] text-text-dim">
        Armadura: {spellheart.armorBenefit}
      </p>
      <p className="text-[11px] text-text-dim">
        Arma: {spellheart.weaponBenefit}
      </p>
      <div className="mt-1.5">
        <SpellheartSpellCards stats={spellheart} />
      </div>
      <div className="mt-1.5">
        <SpellcastingSourcePicker
          sources={spellcastingSources}
          value={item.spellcastingSourceId}
          spells={heartSpells}
          mismatchHint="Nenhuma magia deste coração está na tradição desta fonte. Use Truque de Item Mágico ou escolha outra."
          onChange={(sourceId) =>
            onChange(
              replaceItem(
                items,
                { ...item, spellcastingSourceId: sourceId },
                item.id,
              ),
            )
          }
        />
      </div>
      <Button
        size="sm"
        className="mt-1.5"
        onClick={() => onChange(unfixSpellheart(items, item.id))}
      >
        Remover
      </Button>
    </div>
  )
}

function AlchemicalControls({
  item,
  items,
  activeEffects,
  onChange,
  onChangeActiveEffects,
}: MagicItemControlsProps) {
  const [hostId, setHostId] = useState('')
  const injuryHosts = useMemo(
    () =>
      items.filter((it) =>
        canApplyInjuryPoison(getItemDefinition(it.definitionId)),
      ),
    [items],
  )
  const silverHosts = useMemo(
    () =>
      items.filter((it) =>
        canApplySilverSalve(getItemDefinition(it.definitionId)),
      ),
    [items],
  )
  const definition = getItemDefinition(item.definitionId)
  if (!definition || !definition.alchemical) return null
  const alchemical = definition.alchemical
  const elixir = alchemical.elixir
  const bomb = alchemical.bomb
  const mutagen = alchemical.mutagen
  const tool = alchemical.tool
  const poison = alchemical.poison
  const tracksEffect = Boolean(alchemical.effectFamily)
  const catalogItem = definition
  const isSilver = alchemical.effectFamily === 'silver-salve'

  function consume() {
    const nextItems = replaceItem(items, consumeItem(item), item.id)
    onChange(nextItems)
    if (tracksEffect && !isSilver) {
      onChangeActiveEffects(
        activateAlchemicalEffect(activeEffects, catalogItem, createId('fx')),
      )
    }
  }

  function applyPoison() {
    if (!hostId) return
    onChange(applyInjuryPoison(items, item, hostId))
  }

  function applySilver() {
    if (!hostId) return
    const result = applySilverSalve(
      items,
      activeEffects,
      item,
      hostId,
      createId('fx'),
    )
    onChange(result.items)
    onChangeActiveEffects(result.effects)
  }

  const drinkLabel =
    alchemical.kind === 'mutagen'
      ? 'Beber (ativar)'
      : alchemical.kind === 'elixir'
        ? 'Beber (consumir 1)'
        : alchemical.kind === 'tool'
          ? 'Ativar (consumir 1)'
          : alchemical.kind === 'poison'
            ? 'Gastar dose'
            : 'Consumir 1'

  const kindLabel =
    alchemical.kind === 'bomb'
      ? 'Bomba alquímica'
      : alchemical.kind === 'elixir'
        ? 'Elixir'
        : alchemical.kind === 'mutagen'
          ? 'Mutagênico'
          : alchemical.kind === 'tool'
            ? 'Ferramenta'
            : alchemical.kind === 'poison'
              ? 'Veneno'
              : 'Alquímico'

  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium text-text-muted">
          {kindLabel}
          <span className="ml-1 font-normal text-text-dim">
            · {item.quantity} un.
          </span>
        </p>
        {poison?.exposure === 'injury' ? null : isSilver ? null : (
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" onClick={consume}>
              {drinkLabel}
            </Button>
            {elixir?.hpDice ? (
              <Button
                size="sm"
                variant="accent"
                onClick={() =>
                  rollHealDice(
                    item.name || 'Elixir',
                    elixir.hpDice!,
                    elixir.hpFlat ?? 0,
                  )
                }
              >
                Rolar cura
              </Button>
            ) : null}
          </div>
        )}
      </div>
      {bomb ? (
        <p className="mt-1 text-[11px] text-text-dim">
          Arremesso {formatSpeedMeters(20)}, proficiência de bomba. Não soma Força. Aparece em
          Combate enquanto estiver equipada.
          {bomb.hitEffect ? ` ${bomb.hitEffect}` : ''}
        </p>
      ) : null}
      {mutagen ? (
        <div className="mt-1 space-y-0.5 text-[11px] text-text-dim">
          <p>
            <span className="font-medium text-text-muted">Benefício:</span>{' '}
            {mutagen.benefit}
          </p>
          <p>
            <span className="font-medium text-text-muted">Desvantagem:</span>{' '}
            {mutagen.drawback}
          </p>
          <p>Dura {mutagen.duration}. Aparece em Combate enquanto estiver ativo.</p>
        </div>
      ) : null}
      {elixir ? (
        <p className="mt-1 text-[11px] text-text-dim">
          {elixir.hpDice
            ? `Restaura ${elixir.hpDice}${elixir.hpFlat ? `+${elixir.hpFlat}` : ''} PV. Ajuste os PV na aba Combate.`
            : elixir.note}
          {elixir.note && elixir.hpDice ? ` ${elixir.note}` : ''}
          {elixir.duration ? ` Dura ${elixir.duration}.` : ''}
        </p>
      ) : null}
      {tool && !isSilver ? (
        <p className="mt-1 text-[11px] text-text-dim">
          {tool.note}
          {tool.duration ? ` Dura ${tool.duration}.` : ''}
        </p>
      ) : null}
      {poison ? (
        <div className="mt-1 space-y-1 text-[11px] text-text-dim">
          <p>
            {POISON_EXPOSURE_LABELS[poison.exposure]} · Fortitude CD {poison.dc}
            {poison.virulent ? ' · virulento' : ''}
            {poison.onset ? ` · início ${poison.onset}` : ''}
            {poison.maxDuration ? ` · máx. ${poison.maxDuration}` : ''}
          </p>
          <ul className="list-inside list-disc">
            {poison.stages.map((stage, index) => (
              <li key={`${stage.effect}-${index}`}>
                Estágio {index + 1}: {stage.effect} ({stage.duration})
              </li>
            ))}
          </ul>
          {poison.extraNote ? <p>{poison.extraNote}</p> : null}
          {poison.exposure === 'injury' ? (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <Select
                className="min-w-[10rem] flex-1"
                value={hostId}
                onChange={(e) => setHostId(e.target.value)}
              >
                <option value="">Arma perfurante ou cortante…</option>
                {injuryHosts.map((host) => (
                  <option key={host.id} value={host.id}>
                    {host.name}
                    {host.appliedPoisonId ? ' · já tem veneno' : ''}
                  </option>
                ))}
              </Select>
              <Button size="sm" variant="accent" disabled={!hostId} onClick={applyPoison}>
                Aplicar
              </Button>
            </div>
          ) : (
            <p>
              Gaste a dose ao usar (comida, contato ou nuvem). O mestre aplica a
              salvaguarda.
            </p>
          )}
        </div>
      ) : null}
      {isSilver ? (
        <div className="mt-1 space-y-1 text-[11px] text-text-dim">
          <p>{tool?.note}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            <Select
              className="min-w-[10rem] flex-1"
              value={hostId}
              onChange={(e) => setHostId(e.target.value)}
            >
              <option value="">Escolher arma…</option>
              {silverHosts.map((host) => (
                <option key={host.id} value={host.id}>
                  {host.name}
                </option>
              ))}
            </Select>
            <Button size="sm" variant="accent" disabled={!hostId} onClick={applySilver}>
              Aplicar
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ConsumableControls({
  item,
  items,
  activeEffects,
  onChange,
  onChangeActiveEffects,
}: MagicItemControlsProps) {
  const [hostId, setHostId] = useState('')
  const oilHosts = useMemo(
    () => items.filter((it) => canApplyOil(getItemDefinition(it.definitionId))),
    [items],
  )
  const definition = getItemDefinition(item.definitionId)
  if (!definition || !definition.consumable) return null
  const catalogItem = definition
  const consumable = definition.consumable
  const isPotencyOil = Boolean(consumable.oil)
  const isOil = consumable.kind === 'oil'

  function drink() {
    const nextItems = replaceItem(items, consumeItem(item), item.id)
    onChange(nextItems)
    if (consumable.effectFamily) {
      onChangeActiveEffects(
        activateAlchemicalEffect(activeEffects, catalogItem, createId('fx')),
      )
    }
  }

  function applyOil() {
    if (!hostId) return
    const result = applyOilOfPotency(
      items,
      activeEffects,
      item,
      hostId,
      createId('fx'),
    )
    onChange(result.items)
    onChangeActiveEffects(result.effects)
  }

  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium text-text-muted">
          {isOil ? 'Óleo' : 'Poção'}
          <span className="ml-1 font-normal text-text-dim">
            · {item.quantity} un.
          </span>
        </p>
        {!isPotencyOil ? (
          <div className="flex flex-wrap gap-1.5">
            <Button size="sm" onClick={drink}>
              {isOil ? 'Aplicar (consumir 1)' : 'Beber (consumir 1)'}
            </Button>
            {consumable.hpDice ? (
              <Button
                size="sm"
                variant="accent"
                onClick={() =>
                  rollHealDice(
                    item.name || (isOil ? 'Óleo' : 'Poção'),
                    consumable.hpDice!,
                    consumable.hpFlat ?? 0,
                  )
                }
              >
                Rolar cura
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
      {consumable.note ? (
        <p className="mt-1 text-[11px] text-text-dim">{consumable.note}</p>
      ) : null}
      {isPotencyOil ? (
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <Select
            className="min-w-[10rem] flex-1"
            value={hostId}
            onChange={(e) => setHostId(e.target.value)}
          >
            <option value="">Arma ou armadura…</option>
            {oilHosts.map((host) => (
              <option key={host.id} value={host.id}>
                {host.name}
              </option>
            ))}
          </Select>
          <Button size="sm" variant="accent" disabled={!hostId} onClick={applyOil}>
            Aplicar (1 min)
          </Button>
        </div>
      ) : null}
    </div>
  )
}
