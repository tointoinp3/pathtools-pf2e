import type { CreatureSense } from '@/types/creature'
import type { SenseKind } from '@/types/ancestry'
import { formatModifier, formatSpeedMeters } from '@/utils/labels'

export const SENSE_LABELS: Record<SenseKind, string> = {
  darkvision: 'visão no escuro',
  lowLightVision: 'visão na penumbra',
  scent: 'faro',
  tremorsense: 'sentido sísmico',
  other: 'sentido',
}

export function formatCreatureLevel(level: number): string {
  return level < 0 ? `−${Math.abs(level)}` : String(level)
}

export function formatCreatureSense(sense: CreatureSense): string {
  let label = sense.name?.trim() || SENSE_LABELS[sense.kind]
  if (sense.precise === false) label += ' (impreciso)'
  if (sense.range != null) label += ` ${formatSpeedMeters(sense.range)}`
  return label
}

export function formatMapPair(map: [number, number]): string {
  return `[${formatModifier(map[0])}/${formatModifier(map[1])}]`
}
