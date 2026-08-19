import type { Spell, SpellRank, SpellTradition } from '@/types/spell'
import { CLASS_FOCUS_TRAITS, type ClassFocusTrait } from '@/types/spell'
import type { SpellKind } from '@/features/spells/spellUi'
import { createId, nowIso } from '@/utils/id'

export type SpellCreateKind = SpellKind

export const SPELL_CREATE_QUERY: Record<SpellCreateKind, string> = {
  cantrip: 'truque',
  spell: 'magia',
  focus: 'foco',
}

export function spellKindFromQuery(
  value: string | null,
): SpellCreateKind | null {
  if (!value) return null
  if (value === '1' || value === 'magia' || value === 'spell') return 'spell'
  if (value === 'truque' || value === 'cantrip') return 'cantrip'
  if (value === 'foco' || value === 'focus') return 'focus'
  return null
}

export const SPELL_ACTION_TYPES = [
  'one',
  'two',
  'three',
  'free',
  'reaction',
] as const

export const SPELL_ACTION_LABELS: Record<
  (typeof SPELL_ACTION_TYPES)[number],
  string
> = {
  one: '1 ação',
  two: '2 ações',
  three: '3 ações',
  free: 'Livre',
  reaction: 'Reação',
}

export const FOCUS_CLASS_OPTIONS: Array<{
  trait: ClassFocusTrait
  label: string
}> = [
  { trait: 'Alchemist', label: 'Alquimista' },
  { trait: 'Animist', label: 'Animista' },
  { trait: 'Barbarian', label: 'Bárbaro' },
  { trait: 'Bard', label: 'Bardo' },
  { trait: 'Champion', label: 'Campeão' },
  { trait: 'Cleric', label: 'Clérigo' },
  { trait: 'Commander', label: 'Comandante' },
  { trait: 'Druid', label: 'Druida' },
  { trait: 'Exemplar', label: 'Exemplar' },
  { trait: 'Fighter', label: 'Guerreiro' },
  { trait: 'Guardian', label: 'Guardião' },
  { trait: 'Gunslinger', label: 'Pistoleiro' },
  { trait: 'Inventor', label: 'Inventor' },
  { trait: 'Investigator', label: 'Investigador' },
  { trait: 'Kineticist', label: 'Cineticista' },
  { trait: 'Magus', label: 'Magus' },
  { trait: 'Monk', label: 'Monge' },
  { trait: 'Necromancer', label: 'Necromante' },
  { trait: 'Oracle', label: 'Oráculo' },
  { trait: 'Psychic', label: 'Psíquico' },
  { trait: 'Ranger', label: 'Patrulheiro' },
  { trait: 'Rogue', label: 'Ladino' },
  { trait: 'Runesmith', label: 'Forjador de runas' },
  { trait: 'Sorcerer', label: 'Feiticeiro' },
  { trait: 'Summoner', label: 'Invocador' },
  { trait: 'Swashbuckler', label: 'Espadachim' },
  { trait: 'Thaumaturge', label: 'Taumaturgo' },
  { trait: 'Witch', label: 'Bruxa' },
  { trait: 'Wizard', label: 'Mago' },
]

function withoutKindTraits(traits: string[]): string[] {
  return traits.filter(
    (trait) =>
      trait !== 'Cantrip' &&
      trait !== 'Focus' &&
      trait !== 'Ritual' &&
      !CLASS_FOCUS_TRAITS.includes(trait as ClassFocusTrait),
  )
}

export function applySpellKind(spell: Spell, kind: SpellCreateKind): Spell {
  const extras = withoutKindTraits(spell.traits)
  if (kind === 'cantrip') {
    return {
      ...spell,
      rank: 0,
      focus: false,
      traits: uniqueTraits(['Cantrip', ...extras]),
    }
  }
  if (kind === 'focus') {
    const classTrait = CLASS_FOCUS_TRAITS.find((trait) =>
      spell.traits.includes(trait),
    )
    const rank = (spell.rank === 0 ? 1 : spell.rank) as SpellRank
    return {
      ...spell,
      rank,
      focus: true,
      traits: uniqueTraits([
        'Focus',
        ...(classTrait ? [classTrait] : []),
        ...extras,
      ]),
    }
  }
  const rank = (spell.rank === 0 ? 1 : spell.rank) as SpellRank
  return {
    ...spell,
    rank,
    focus: false,
    traits: uniqueTraits(extras),
  }
}

function uniqueTraits(traits: string[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const trait of traits) {
    const trimmed = trait.trim()
    if (!trimmed || seen.has(trimmed)) continue
    seen.add(trimmed)
    out.push(trimmed)
  }
  return out
}

export function createEmptyHomebrewSpell(kind: SpellCreateKind): Spell {
  const now = nowIso()
  const names: Record<SpellCreateKind, string> = {
    cantrip: 'Novo truque',
    spell: 'Nova magia',
    focus: 'Nova magia de foco',
  }
  const traditions: SpellTradition[] = kind === 'focus' ? [] : ['arcane']
  const base: Spell = {
    id: createId('spell'),
    name: names[kind],
    originalName: '',
    rank: kind === 'cantrip' ? 0 : 1,
    traditions,
    traits: ['Concentrate', 'Manipulate'],
    rarity: 'common',
    provenance: { type: 'homebrew' },
    description: '',
    summary: '',
    actionType: 'two',
    source: 'Homebrew',
    createdAt: now,
    updatedAt: now,
  }
  return applySpellKind(base, kind)
}

export function splitTraitList(value: string): string[] {
  return uniqueTraits(
    value
      .split(/[,;]/)
      .map((part) => part.trim())
      .filter(Boolean),
  )
}
