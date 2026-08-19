import { Link } from 'react-router-dom'
import type { CreatureItemRef } from '@/types/creature'
import type { ItemDefinition } from '@/types/equipment'
import {
  ITEM_CATEGORY_LABELS,
  DAMAGE_TYPE_LABELS,
  WEAPON_GROUP_LABELS,
  ARMOR_GROUP_LABELS,
} from '@/types/equipment'
import { formatBulk, formatPriceCp } from '@/engine/equipment'
import { Tooltip } from '@/components/ui/Tooltip'
import { Badge } from '@/components/ui/Badge'
import { RichText } from '@/components/ui/RichText'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { formatSpeedMeters } from '@/utils/labels'
import { resolveCreatureItem } from '@/features/bestiary/resolveCreatureItem'

function previewLines(item: ItemDefinition): string[] {
  const lines = [
    `${ITEM_CATEGORY_LABELS[item.category]} · Nv. ${item.level} · ${formatPriceCp(item.priceCp)} · Carga ${formatBulk(item.bulk)}`,
  ]
  if (item.weapon) {
    const dtype =
      DAMAGE_TYPE_LABELS[
        item.weapon.damageType as keyof typeof DAMAGE_TYPE_LABELS
      ] ?? item.weapon.damageType
    const bits = [
      item.weapon.rangeType === 'melee' ? 'Corpo a corpo' : 'À distância',
      `${item.weapon.damageDie} ${dtype}`,
      WEAPON_GROUP_LABELS[item.weapon.group],
    ]
    if (item.weapon.range != null) {
      bits.push(`alcance ${formatSpeedMeters(item.weapon.range)}`)
    }
    lines.push(bits.join(' · '))
  }
  if (item.armor) {
    const bits = [`CA +${item.armor.acBonus}`]
    if (item.armor.dexCap != null) bits.push(`teto de Des +${item.armor.dexCap}`)
    if (item.armor.group) bits.push(ARMOR_GROUP_LABELS[item.armor.group])
    lines.push(bits.join(' · '))
  }
  return lines
}

function ItemPreview({ item }: { item: ItemDefinition }) {
  const summary = item.description.trim().slice(0, 220)
  const clipped = item.description.trim().length > 220

  return (
    <span className="block space-y-1.5 whitespace-normal text-left">
      <span className="block font-medium text-text">{item.name}</span>
      <span className="block text-[10px] text-text-dim">{item.originalName}</span>
      {previewLines(item).map((line) => (
        <span key={line} className="block text-text-muted">
          {line}
        </span>
      ))}
      {item.traits.length > 0 && (
        <span className="flex flex-wrap gap-0.5">
          {item.traits.slice(0, 6).map((trait) => (
            <Badge key={trait} className="!text-[9px]">
              {localizeTraitLabel(trait)}
            </Badge>
          ))}
        </span>
      )}
      {summary ? (
        <span className="block text-text-muted">
          <RichText>{clipped ? `${summary}…` : summary}</RichText>
        </span>
      ) : null}
      <span className="block text-[10px] text-accent">
        Clique para abrir no Compêndio
      </span>
    </span>
  )
}

export function CreatureItemLink({ item: ref }: { item: CreatureItemRef }) {
  const catalogItem = resolveCreatureItem(ref)

  if (!catalogItem) {
    return <span>{ref.name}</span>
  }

  return (
    <Tooltip
      className="cursor-pointer"
      tipClassName="max-w-80 whitespace-normal"
      content={<ItemPreview item={catalogItem} />}
    >
      <Link
        to={`/compendio/equipamento?id=${encodeURIComponent(catalogItem.id)}`}
        className="text-accent underline decoration-accent/50 underline-offset-2 hover:decoration-accent"
      >
        {ref.name}
      </Link>
    </Tooltip>
  )
}
