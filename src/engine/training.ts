import type { AttackProficiencyCategory, WeaponGroupId } from '@/types'
import { listItemDefinitions } from '@/engine/equipmentCatalog'
import { maxProficiencyRank } from './proficiency'
import type { ProficiencyRank } from '@/types'

export interface WeaponFamiliarityGrant {
  sourceLabel: string
  /** Nomes originais (EN) para casar com o catálogo */
  weapons: string[]
  /** Traços de ancestralidade (ex.: dwarf, elf) */
  traits: string[]
  groups: WeaponGroupId[]
  martialAsSimple: boolean
  advancedAsMartial: boolean
  critSpecAtLevel?: number
  accessUncommonTrait?: string
}

export interface CircumstanceBonusGrant {
  sourceLabel: string
  value: number
  appliesTo: string
}

/**
 * Bônus de circunstância permanente que a ficha pode somar num número.
 * O resto (Recordar Conhecimento de X, dissipar teleporte…) fica só como lembrete.
 */
export function alwaysOnCircumstanceStat(
  appliesTo: string,
): 'initiative' | null {
  const text = appliesTo.toLowerCase()
  if (/\b(quando|when|if |se )\b/.test(text)) return null
  if (/\b(iniciativa|initiative)\b/.test(text)) return 'initiative'
  return null
}

export function sumAlwaysOnCircumstance(
  bonuses: CircumstanceBonusGrant[],
  stat: 'initiative',
): Array<{ label: string; value: number }> {
  return bonuses
    .filter((bonus) => alwaysOnCircumstanceStat(bonus.appliesTo) === stat)
    .map((bonus) => ({
      label: bonus.sourceLabel,
      value: bonus.value,
    }))
}

const TRAIT_FROM_TEXT: Array<{ re: RegExp; trait: string }> = [
  { re: /\b(?:dwarf|anã[oa]s?)\b/i, trait: 'dwarf' },
  { re: /\b(?:elf|elves|élfic[oa]|elfo)\b/i, trait: 'elf' },
  { re: /\b(?:gnome|gnomo)\b/i, trait: 'gnome' },
  { re: /\b(?:goblin)\b/i, trait: 'goblin' },
  { re: /\b(?:halfling)\b/i, trait: 'halfling' },
  { re: /\b(?:orc)\b/i, trait: 'orc' },
  { re: /\b(?:catfolk|povo-felino|povo felino)\b/i, trait: 'catfolk' },
  { re: /\b(?:kobold)\b/i, trait: 'kobold' },
  { re: /\b(?:hobgoblin)\b/i, trait: 'hobgoblin' },
  { re: /\b(?:kholo)\b/i, trait: 'kholo' },
  { re: /\b(?:tengu)\b/i, trait: 'tengu' },
  { re: /\b(?:tripkee)\b/i, trait: 'tripkee' },
  { re: /\b(?:leshy)\b/i, trait: 'leshy' },
  { re: /\b(?:ratfolk)\b/i, trait: 'ratfolk' },
  { re: /\b(?:lizardfolk)\b/i, trait: 'lizardfolk' },
  { re: /\b(?:athamaru)\b/i, trait: 'athamaru' },
  { re: /\b(?:merfolk|tritão|tritao)\b/i, trait: 'merfolk' },
  { re: /\b(?:minotaur|minotauro)\b/i, trait: 'minotaur' },
  { re: /\b(?:surki)\b/i, trait: 'surki' },
  { re: /\b(?:geniekin|gênio|genio)\b/i, trait: 'geniekin' },
  { re: /\b(?:monk|monge)\b/i, trait: 'monk' },
]

const TRAIT_LABELS: Record<string, string> = {
  dwarf: 'anão',
  elf: 'elfo',
  gnome: 'gnomo',
  goblin: 'goblin',
  halfling: 'halfling',
  orc: 'orc',
  catfolk: 'povo-felino',
  kobold: 'kobold',
  hobgoblin: 'hobgoblin',
  kholo: 'kholo',
  tengu: 'tengu',
  tripkee: 'tripkee',
  leshy: 'leshy',
  ratfolk: 'ratfolk',
  lizardfolk: 'lizardfolk',
  athamaru: 'athamaru',
  merfolk: 'tritão',
  minotaur: 'minotauro',
  surki: 'surki',
  geniekin: 'geniekin',
  monk: 'monge',
}

const GROUP_FROM_TEXT: Array<{ re: RegExp; group: WeaponGroupId }> = [
  { re: /\bbombs?\b/i, group: 'bomb' },
  { re: /\bfirearms?\b|\barmas de fogo\b/i, group: 'firearm' },
  { re: /\bcrossbows?\b|\bbestas?\b/i, group: 'crossbow' },
]

function normalizeName(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '')
    .replace(/s$/, '')
}

function traitInList(traits: string[], wanted: string): boolean {
  const key = wanted.toLowerCase()
  return traits.some((trait) => {
    const lower = trait.toLowerCase()
    return lower === key || lower.startsWith(`${key} `) || lower.startsWith(`${key}-`)
  })
}

let cachedWeapons:
  | Array<{ originalName: string; name: string; normEn: string; normPt: string }>
  | null = null

export function invalidateWeaponNameIndex(): void {
  cachedWeapons = null
}

function weaponNameIndex() {
  if (cachedWeapons) return cachedWeapons
  cachedWeapons = listItemDefinitions()
    .filter((item) => item.weapon)
    .map((item) => ({
      originalName: item.originalName,
      name: item.name,
      normEn: normalizeName(item.originalName),
      normPt: normalizeName(item.name),
    }))
    .sort((a, b) => b.normEn.length - a.normEn.length)
  return cachedWeapons
}

function extractNamedWeapons(haystack: string): string[] {
  const lower = haystack.toLowerCase()
  const found: string[] = []
  const seen = new Set<string>()
  for (const weapon of weaponNameIndex()) {
    const en = weapon.originalName.toLowerCase()
    const pt = weapon.name.toLowerCase()
    const enRe = new RegExp(
      `\\b${en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?\\b`,
      'i',
    )
    const ptRe = new RegExp(
      `\\b${pt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?\\b`,
      'i',
    )
    if (enRe.test(lower) || ptRe.test(lower)) {
      if (seen.has(weapon.normEn)) continue
      seen.add(weapon.normEn)
      found.push(weapon.originalName)
    }
  }
  return found
}

function extractTraits(text: string): string[] {
  const traits: string[] = []
  const hasTraitWord =
    /trait|traço|traco|característica|caracteristica/i.test(text)
  for (const { re, trait } of TRAIT_FROM_TEXT) {
    if (!re.test(text)) continue
    const hasNamedWeapons = new RegExp(`\\b${trait}\\s+weapons\\b`, 'i').test(
      text,
    )
    if (hasTraitWord || hasNamedWeapons) {
      if (!traits.includes(trait)) traits.push(trait)
    }
  }
  return traits
}

function extractGroups(text: string): WeaponGroupId[] {
  const groups: WeaponGroupId[] = []
  for (const { re, group } of GROUP_FROM_TEXT) {
    if (re.test(text) && !groups.includes(group)) groups.push(group)
  }
  return groups
}

function familiarityHaystack(description: string): string {
  const chunks: string[] = []
  const patterns = [
    /familiarity with[^.]+/gi,
    /familiaridade com[^.]+/gi,
    /trained with[^.]+/gi,
    /treinado(?:a)? com[^.]+/gi,
    /for the purposes? of proficiency[^.]+/gi,
    /para fins de proficiência[^.]+/gi,
    /uncommon weapons with the \w+ trait/gi,
    /simple and martial \w+ weapons/gi,
  ]
  for (const re of patterns) {
    const matches = description.match(re)
    if (matches) chunks.push(...matches)
  }
  return chunks.length > 0 ? chunks.join(' · ') : description
}

export function parseWeaponFamiliarityFromText(
  description: string,
  sourceLabel: string,
): WeaponFamiliarityGrant | null {
  const looksLike =
    /familiarity with|familiaridade com|for the purposes? of proficiency|para fins de proficiência|martial weapons as simple|marciais como armas simples|marciais como simples/i.test(
      description,
    ) ||
    /(?:are|is|become|fica|é) trained with /i.test(description) ||
    /trained in simple and martial \w+ weapons/i.test(description) ||
    /uncommon weapons with the \w+ trait/i.test(description)
  if (!looksLike) return null

  const haystack = familiarityHaystack(description)
  const martialAsSimple =
    /martial (?:weapons|firearms) as simple|marciais como armas simples|marciais como simples|treat(?:s)?.{0,60}as simple/i.test(
      description,
    )
  const advancedAsMartial =
    /advanced (?:weapons|firearms) as martial|avançadas como armas marciais|avançada como arma marcial/i.test(
      description,
    )
  const critSpecAtLevel = /critical specialization|especialização crítica/i.test(
    description,
  )
    ? 5
    : undefined

  const accessMatch =
    description.match(/uncommon weapons with the (\w+) trait/i) ??
    description.match(/armas incomuns com (?:o traço |a característica )?(\w+)/i)

  const grant: WeaponFamiliarityGrant = {
    sourceLabel,
    weapons: extractNamedWeapons(haystack),
    traits: extractTraits(haystack),
    groups: extractGroups(haystack),
    martialAsSimple: martialAsSimple || /trained with /i.test(description),
    advancedAsMartial,
    critSpecAtLevel,
    accessUncommonTrait: accessMatch?.[1]?.toLowerCase(),
  }

  if (
    grant.weapons.length === 0 &&
    grant.traits.length === 0 &&
    grant.groups.length === 0
  ) {
    return null
  }
  if (!grant.martialAsSimple && !grant.advancedAsMartial) {
    grant.martialAsSimple = true
  }
  return grant
}

function looksSituational(text: string): boolean {
  return /triggering|until the start|this Strike|this (?:action|check)|neste turno|até o início|do ataque que disparou/i.test(
    text,
  )
}

export function parseCircumstanceBonusesFromText(
  description: string,
  sourceLabel: string,
): CircumstanceBonusGrant[] {
  const out: CircumstanceBonusGrant[] = []
  const patterns = [
    /(?:gain|gains|have|has|receive|receives)\s+a\s+\+(\d+)\s+circumstance bonus to ([^.]+)/gi,
    /\+(\d+)\s+de bônus de circunstância a(?:os|o|s)?\s+([^.]+)/gi,
    /recebe\s+\+(\d+)\s+de bônus de circunstância a(?:os|o|s)?\s+([^.]+)/gi,
  ]
  for (const re of patterns) {
    let match: RegExpExecArray | null
    const clone = new RegExp(re.source, 'gi')
    while ((match = clone.exec(description)) !== null) {
      const value = Number(match[1])
      const appliesTo = (match[2] ?? '').trim().replace(/\.$/, '')
      if (!value || !appliesTo || looksSituational(appliesTo)) continue
      out.push({ sourceLabel, value, appliesTo })
    }
  }
  return out
}

export function weaponMatchesFamiliarity(
  weapon: {
    originalName: string
    name: string
    traits: string[]
    group?: string
  },
  grant: WeaponFamiliarityGrant,
): boolean {
  if (grant.groups.length > 0 && weapon.group) {
    if (grant.groups.includes(weapon.group as WeaponGroupId)) return true
  }
  for (const trait of grant.traits) {
    if (traitInList(weapon.traits, trait)) return true
  }
  const en = normalizeName(weapon.originalName)
  const pt = normalizeName(weapon.name)
  return grant.weapons.some((name) => {
    const key = normalizeName(name)
    return key === en || key === pt
  })
}

export function shiftAttackCategory(
  category: AttackProficiencyCategory,
  grant: Pick<WeaponFamiliarityGrant, 'martialAsSimple' | 'advancedAsMartial'>,
): AttackProficiencyCategory {
  if (category === 'advanced' && grant.advancedAsMartial) return 'martial'
  if (category === 'martial' && grant.martialAsSimple) return 'simple'
  if (category === 'advancedFirearm' && grant.advancedAsMartial) {
    return 'martialFirearm'
  }
  if (category === 'martialFirearm' && grant.martialAsSimple) {
    return 'simpleFirearm'
  }
  if (category === 'bomb' && grant.martialAsSimple) return 'simple'
  return category
}

export function bestFamiliarityShift(
  category: AttackProficiencyCategory,
  grants: WeaponFamiliarityGrant[],
  weapon: {
    originalName: string
    name: string
    traits: string[]
    group?: string
  },
): { category: AttackProficiencyCategory; grant: WeaponFamiliarityGrant | null } {
  let best = category
  let used: WeaponFamiliarityGrant | null = null
  const order: AttackProficiencyCategory[] = [
    'simple',
    'simpleFirearm',
    'martial',
    'martialFirearm',
    'advanced',
    'advancedFirearm',
    'unarmed',
    'bomb',
  ]
  const score = (cat: AttackProficiencyCategory) => {
    const i = order.indexOf(cat)
    return i === -1 ? 99 : i
  }
  for (const grant of grants) {
    if (!weaponMatchesFamiliarity(weapon, grant)) continue
    const shifted = shiftAttackCategory(category, grant)
    if (score(shifted) < score(best)) {
      best = shifted
      used = grant
    }
  }
  return { category: best, grant: used }
}

export function pickBetterRank(
  a: ProficiencyRank | null,
  b: ProficiencyRank | null,
): ProficiencyRank | null {
  if (!a) return b
  if (!b) return a
  return maxProficiencyRank(a, b)
}

export function formatFamiliaritySummary(grant: WeaponFamiliarityGrant): string {
  const parts: string[] = []
  for (const trait of grant.traits) {
    parts.push(`armas ${TRAIT_LABELS[trait] ?? trait}`)
  }
  for (const group of grant.groups) {
    if (group === 'bomb') parts.push('bombas')
    else if (group === 'firearm') parts.push('armas de fogo')
    else if (group === 'crossbow') parts.push('bestas')
    else parts.push(group)
  }
  const catalog = weaponNameIndex()
  for (const name of grant.weapons) {
    const hit = catalog.find((w) => normalizeName(w.originalName) === normalizeName(name))
    parts.push(hit?.name ?? name)
  }
  const unique = [...new Set(parts)]
  return unique.join(', ')
}

export function formatFamiliarityRules(grant: WeaponFamiliarityGrant): string {
  const bits: string[] = []
  if (grant.martialAsSimple) bits.push('marciais contam como simples')
  if (grant.advancedAsMartial) bits.push('avançadas contam como marciais')
  if (grant.critSpecAtLevel) {
    bits.push(`a partir do ${grant.critSpecAtLevel}º nível: especialização crítica`)
  }
  if (grant.accessUncommonTrait) {
    const label = TRAIT_LABELS[grant.accessUncommonTrait] ?? grant.accessUncommonTrait
    bits.push(`acesso a armas incomuns ${label}`)
  }
  return bits.join(' · ')
}
