import type { ArmorClassInput, ArmorClassResult } from '@/types'
import { formatModifier } from '@/utils/labels'

/**
 * CA = 10 + Dex (limitada pelo Dex Cap da armadura) + proficiência + item + outros − penalidades
 * Sem classe/equipamento, retorna CA provisória apenas com o que existe.
 */
export function calculateArmorClass(input: ArmorClassInput): ArmorClassResult {
  const base = input.base ?? 10
  const dexCap = input.dexCap ?? null
  const dex =
    dexCap == null ? input.dexModifier : Math.min(input.dexModifier, dexCap)
  const proficiency = input.proficiencyBonus ?? null
  const item = input.itemBonus ?? 0
  const bonuses = input.bonuses ?? 0
  const penalties = input.penalties ?? 0

  const missing: string[] = []
  if (proficiency == null) {
    missing.push('Proficiência em armadura (classe)')
  }
  if (input.dexCap == null && input.itemBonus == null) {
    missing.push('Equipamento / armadura')
  }

  const hasProficiency = proficiency != null
  const provisional = !hasProficiency

  const total =
    base + dex + (proficiency ?? 0) + item + bonuses - Math.abs(penalties)

  const breakdown: ArmorClassResult['breakdown'] = [
    { label: 'Base', value: base },
    { label: 'Destreza', value: formatModifier(dex) },
  ]

  if (proficiency != null) {
    breakdown.push({ label: 'Proficiência', value: formatModifier(proficiency) })
  } else {
    breakdown.push({ label: 'Proficiência', value: 'Pendente' })
  }

  if (item !== 0) {
    breakdown.push({ label: 'Item', value: formatModifier(item) })
  }
  if (bonuses !== 0) {
    breakdown.push({ label: 'Outros bônus', value: formatModifier(bonuses) })
  }
  if (penalties !== 0) {
    breakdown.push({ label: 'Penalidades', value: formatModifier(-Math.abs(penalties)) })
  }

  return {
    total,
    provisional,
    components: {
      base,
      dex,
      proficiency,
      item,
      bonuses,
      penalties: Math.abs(penalties),
    },
    missing,
    breakdown,
  }
}
