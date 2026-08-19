import type {
  Deity,
  DeityKind,
  DivineFont,
  Sanctification,
} from '@/types/deity'
import { createId, nowIso } from '@/utils/id'

export const DEITY_CREATE_KINDS: DeityKind[] = [
  'deity',
  'pantheon',
  'philosophy',
  'covenant',
]

export const DEITY_CREATE_QUERY: Record<DeityKind, string> = {
  deity: 'divindade',
  pantheon: 'panteao',
  philosophy: 'filosofia',
  covenant: 'pacto',
}

export const DEITY_KIND_DEFAULT_CATEGORY: Record<DeityKind, string> = {
  deity: 'Other Gods',
  pantheon: 'Pantheons',
  philosophy: 'Faiths & Philosophies',
  covenant: 'Covenants',
}

export function deityKindFromQuery(value: string | null): DeityKind | null {
  if (!value) return null
  if (value === '1' || value === 'divindade' || value === 'deity') return 'deity'
  if (value === 'panteao' || value === 'pantheon') return 'pantheon'
  if (value === 'filosofia' || value === 'philosophy') return 'philosophy'
  if (value === 'pacto' || value === 'covenant') return 'covenant'
  return null
}

const KIND_EMPTY_NAME: Record<DeityKind, string> = {
  deity: 'Nova divindade',
  pantheon: 'Novo panteão',
  philosophy: 'Nova filosofia',
  covenant: 'Novo pacto',
}

export function applyDeityKind(deity: Deity, kind: DeityKind): Deity {
  const previousDefault = DEITY_KIND_DEFAULT_CATEGORY[deity.kind]
  const category =
    !deity.category || deity.category === previousDefault
      ? DEITY_KIND_DEFAULT_CATEGORY[kind]
      : deity.category
  const nameIsPlaceholder = Object.values(KIND_EMPTY_NAME).includes(deity.name)
  return {
    ...deity,
    kind,
    category,
    name: nameIsPlaceholder ? KIND_EMPTY_NAME[kind] : deity.name,
  }
}

export function createEmptyHomebrewDeity(kind: DeityKind): Deity {
  const now = nowIso()
  const mechanical = kind !== 'philosophy'
  const base: Deity = {
    id: createId('deity'),
    name: KIND_EMPTY_NAME[kind],
    originalName: '',
    epithet: '',
    kind,
    category: DEITY_KIND_DEFAULT_CATEGORY[kind],
    rarity: 'common',
    provenance: { type: 'homebrew' },
    summary: '',
    areasOfConcern: [],
    edicts: [],
    anathema: [],
    attributes: mechanical ? ['wisdom', 'charisma'] : [],
    skillId: mechanical ? 'religion' : undefined,
    favoredWeapons: [],
    font: mechanical ? (['heal'] as DivineFont[]) : [],
    sanctification: mechanical ? (['holy'] as Sanctification[]) : [],
    sanctificationRequired: false,
    domains: mechanical ? ['Healing', 'Protection'] : [],
    primaryDomains: mechanical ? ['Healing', 'Protection'] : [],
    alternateDomains: [],
    clericSpells: [],
    pantheons: [],
    source: 'Homebrew',
    createdAt: now,
    updatedAt: now,
  }
  return base
}

export function splitList(value: string): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const part of value.split(/[,;]/)) {
    const trimmed = part.trim()
    if (!trimmed || seen.has(trimmed.toLowerCase())) continue
    seen.add(trimmed.toLowerCase())
    out.push(trimmed)
  }
  return out
}

export function splitLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
}

export function uniqueNames(names: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const name of names) {
    const key = name.trim().toLowerCase()
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(name.trim())
  }
  return out
}
