import type { AttributeId, CreatureSize, ProficiencyRank, Rarity, SkillId } from '@/types'

export const ATTRIBUTE_LABELS: Record<AttributeId, string> = {
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
}

export const ATTRIBUTE_ABBREVIATIONS: Record<AttributeId, string> = {
  strength: 'FOR',
  dexterity: 'DES',
  constitution: 'CON',
  intelligence: 'INT',
  wisdom: 'SAB',
  charisma: 'CAR',
}

export const PROFICIENCY_LABELS: Record<ProficiencyRank, string> = {
  untrained: 'Destreinado',
  trained: 'Treinado',
  expert: 'Especialista',
  master: 'Mestre',
  legendary: 'Lendário',
}

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'Comum',
  uncommon: 'Incomum',
  rare: 'Rara',
  unique: 'Única',
}

export const RARITY_FILTER_OPTIONS: Array<{ value: Rarity; label: string }> = (
  Object.keys(RARITY_LABELS) as Rarity[]
).map((r) => ({ value: r, label: RARITY_LABELS[r] }))

export const SIZE_LABELS: Record<CreatureSize, string> = {
  tiny: 'Minúsculo',
  small: 'Pequeno',
  medium: 'Médio',
  large: 'Grande',
  huge: 'Enorme',
  gargantuan: 'Imenso',
}

export const SIZE_FILTER_OPTIONS: Array<{
  value: CreatureSize
  label: string
}> = (Object.keys(SIZE_LABELS) as CreatureSize[]).map((s) => ({
  value: s,
  label: SIZE_LABELS[s],
}))

export const SAVE_LABELS: Record<'fortitude' | 'reflex' | 'will', string> = {
  fortitude: 'Fortitude',
  reflex: 'Reflexos',
  will: 'Vontade',
}

export const TRADITION_LABELS: Record<
  'arcane' | 'divine' | 'occult' | 'primal',
  string
> = {
  arcane: 'Arcana',
  divine: 'Divina',
  occult: 'Oculta',
  primal: 'Primeva',
}

export const TRADITION_FILTER_OPTIONS: Array<{
  value: 'arcane' | 'divine' | 'occult' | 'primal'
  label: string
}> = (Object.keys(TRADITION_LABELS) as Array<
  'arcane' | 'divine' | 'occult' | 'primal'
>).map((t) => ({ value: t, label: TRADITION_LABELS[t] }))

export const FEAT_CATEGORY_LABELS: Record<string, string> = {
  ancestry: 'Ancestralidade',
  class: 'Classe',
  skill: 'Perícia',
  general: 'Geral',
  archetype: 'Arquétipo',
  mythic: 'Mítico',
  heritage: 'Herança',
  background: 'Origem',
  other: 'Outro',
}

export const SKILL_LABELS: Record<SkillId, string> = {
  acrobatics: 'Acrobacia',
  arcana: 'Arcanismo',
  athletics: 'Atletismo',
  crafting: 'Ofício',
  deception: 'Enganação',
  diplomacy: 'Diplomacia',
  intimidation: 'Intimidação',
  medicine: 'Medicina',
  nature: 'Natureza',
  occultism: 'Ocultismo',
  performance: 'Atuação',
  religion: 'Religião',
  society: 'Sociedade',
  stealth: 'Furtividade',
  survival: 'Sobrevivência',
  thievery: 'Ladroagem',
}

export function formatModifier(value: number): string {
  if (value > 0) return `+${value}`
  return String(value)
}

/** Parte numérica do deslocamento em metros (valores internos continuam em pés). */
export function formatSpeedMetersValue(feet: number): string {
  const meters = feet * 0.3
  const negative = meters < 0
  const abs = Math.abs(meters)
  const pretty = Number.isInteger(abs)
    ? String(abs)
    : String(Math.round(abs * 10) / 10).replace('.', ',')
  return negative ? `−${pretty}` : pretty
}

/** Converte deslocamento interno (pés) para o rótulo em metros da UI. */
export function formatSpeedMeters(feet: number): string {
  return `${formatSpeedMetersValue(feet)} m`
}

/** Deslocamentos de companheiro (valores internos em pés) para a UI. */
export function formatCompanionSpeeds(speeds: {
  land?: number | null
  fly?: number | null
  climb?: number | null
  burrow?: number | null
  swim?: number | null
}): string {
  const parts: string[] = []
  if (speeds.land != null) parts.push(formatSpeedMeters(speeds.land))
  if (speeds.fly != null) parts.push(`voo ${formatSpeedMeters(speeds.fly)}`)
  if (speeds.climb != null)
    parts.push(`escalada ${formatSpeedMeters(speeds.climb)}`)
  if (speeds.burrow != null)
    parts.push(`escavação ${formatSpeedMeters(speeds.burrow)}`)
  if (speeds.swim != null)
    parts.push(`natação ${formatSpeedMeters(speeds.swim)}`)
  return parts.join(' · ') || '—'
}

/** Formata um valor de breakdown de velocidade (número em pés ou texto “N pés”). */
export function formatSpeedBreakdownValue(value: number | string): string {
  if (typeof value === 'number') return formatSpeedMeters(value)
  const feet = String(value).match(/^(-?\d+)\s*pés$/)
  if (feet) return formatSpeedMeters(Number(feet[1]))
  return String(value)
}

export function formatSourceLabel(
  sourceName: string | undefined,
  page?: number | null,
): string {
  if (!sourceName) return 'Fonte desconhecida'
  if (page != null) return `${sourceName}, pág. ${page}`
  return sourceName
}
