import type {
  AttackProficiencyCategory,
  AttributeId,
  CharacterClass,
  ClassFeature,
  ClassLevelRow,
  DefenseProficiencyCategory,
  ProficiencyRank,
  SpellTradition,
  SpellcastingDefinition,
} from '@/types'
import { createId, nowIso } from '@/utils/id'
import {
  limitedCasterSlotTable,
  standardCantrips,
  standardPreparedSlotTable,
  standardSpontaneousSlotTable,
} from '@/data/seeds/fullCasterSlots'

export type ClassFeatCadence = 'martial' | 'caster'
export type SkillFeatCadence = 'even' | 'all'
export type HomebrewSpellMode =
  | 'none'
  | 'focusOnly'
  | 'prepared'
  | 'spontaneous'
  | 'limited'

export const ATTACK_CAT_LABELS: Record<AttackProficiencyCategory, string> = {
  unarmed: 'Ataques desarmados',
  simple: 'Armas simples',
  martial: 'Armas marciais',
  advanced: 'Armas avançadas',
  bomb: 'Bombas',
  simpleFirearm: 'Armas de fogo simples',
  martialFirearm: 'Armas de fogo marciais',
  advancedFirearm: 'Armas de fogo avançadas',
}

export const DEFENSE_CAT_LABELS: Record<DefenseProficiencyCategory, string> = {
  unarmored: 'Defesa sem armadura',
  light: 'Armadura leve',
  medium: 'Armadura média',
  heavy: 'Armadura pesada',
  allArmor: 'Todas as armaduras',
}

export const PLAYABLE_ATTACK_CATS: AttackProficiencyCategory[] = [
  'unarmed',
  'simple',
  'martial',
  'advanced',
]

export const PLAYABLE_DEFENSE_CATS: DefenseProficiencyCategory[] = [
  'unarmored',
  'light',
  'medium',
  'heavy',
  'allArmor',
]

export const STARTING_RANKS: ProficiencyRank[] = [
  'trained',
  'expert',
  'master',
]

export function defaultClassFeatLevelsFor(
  cadence: ClassFeatCadence,
  maxLevel = 20,
): number[] {
  if (cadence === 'caster') {
    const levels: number[] = []
    for (let L = 2; L <= maxLevel; L += 2) levels.push(L)
    return levels
  }
  const levels = [1]
  for (let L = 2; L <= maxLevel; L += 2) levels.push(L)
  return levels
}

export function detectFeatCadence(characterClass: CharacterClass): ClassFeatCadence {
  const levels = characterClass.classFeatLevels
  if (levels && !levels.includes(1) && levels[0] === 2) return 'caster'
  const tableHasLevel1 = characterClass.levelTable.some(
    (row) =>
      row.level === 1 &&
      row.features.some((f) => {
        const t = f.toLowerCase()
        return t.startsWith('feito de ') && !t.includes('perícia') && !t.includes('geral') && !t.includes('ancestralidade')
      }),
  )
  if (characterClass.levelTable.length && !tableHasLevel1) return 'caster'
  return 'martial'
}

export function detectSkillFeatCadence(
  characterClass: CharacterClass,
): SkillFeatCadence {
  const skillRows = characterClass.levelTable.filter((row) =>
    row.features.some((f) => f.toLowerCase().includes('feito de perícia')),
  )
  if (skillRows.length >= 15) return 'all'
  return 'even'
}

export function detectSpellMode(
  characterClass: CharacterClass,
): HomebrewSpellMode {
  const sc = characterClass.spellcasting
  if (!sc) return 'none'
  if (sc.style === 'focusOnly') return 'focusOnly'
  if (sc.style === 'spontaneous') return 'spontaneous'
  if (sc.features?.limitedSlots) return 'limited'
  return 'prepared'
}

export function buildHomebrewLevelTable(opts: {
  className: string
  featCadence: ClassFeatCadence
  skillFeatCadence: SkillFeatCadence
  features: ClassFeature[]
}): ClassLevelRow[] {
  const classFeatLabel = `Feito de ${opts.className.trim() || 'classe'}`
  const classFeatLevels = new Set(defaultClassFeatLevelsFor(opts.featCadence))
  const skillFeatAll = opts.skillFeatCadence === 'all'
  const general = new Set([3, 7, 11, 15, 19])
  const ancestry = new Set([5, 9, 13, 17])
  const attrs = new Set([5, 10, 15, 20])
  const skillInc = new Set([3, 5, 7, 9, 11, 13, 15, 17, 19])

  const customByLevel = new Map<number, string[]>()
  for (const feature of opts.features) {
    const list = customByLevel.get(feature.level) ?? []
    list.push(feature.name.trim() || 'Recurso')
    customByLevel.set(feature.level, list)
  }

  const rows: ClassLevelRow[] = []
  for (let level = 1; level <= 20; level += 1) {
    const features: string[] = []
    if (level === 1) {
      features.push(
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
      )
    }
    features.push(...(customByLevel.get(level) ?? []))
    if (classFeatLevels.has(level)) features.push(classFeatLabel)
    if (skillFeatAll || (level % 2 === 0 && level >= 2)) {
      if (skillFeatAll || level >= 2) features.push('Feito de perícia')
    }
    if (general.has(level)) features.push('Feito geral')
    if (ancestry.has(level)) features.push('Feito de ancestralidade')
    if (attrs.has(level)) features.push('Aumentos de atributo')
    if (skillInc.has(level)) features.push('Aumento de perícia')
    rows.push({ level, features })
  }
  return rows
}

export function emptyClassFeature(level = 1): ClassFeature {
  return {
    id: createId('feature'),
    name: level === 1 ? 'Recurso de 1º nível' : `Recurso de ${level}º nível`,
    level,
    description: '',
    actionType: 'passive',
  }
}

export function emptyClassLore(): CharacterClass['lore'] {
  return {
    summary: '',
    duringCombat: '',
    duringSocial: '',
    whileExploring: '',
    inDowntime: '',
    youMight: [],
    othersProbably: [],
  }
}

export function spellcastingForMode(opts: {
  classId: string
  className: string
  mode: HomebrewSpellMode
  tradition: SpellTradition
  attributeId: AttributeId
}): SpellcastingDefinition | undefined {
  const { classId, className, mode, tradition, attributeId } = opts
  if (mode === 'none') return undefined
  const base = {
    id: `${classId}-spellcasting`,
    kind: 'class' as const,
    tradition,
    attributeOptions: [attributeId],
    proficiencyRank: 'trained' as const,
  }
  if (mode === 'focusOnly') {
    return {
      ...base,
      label: `Magias de ${className || 'classe'}`,
      style: 'focusOnly',
      features: { focusPool: true },
      styleHint:
        'Só magias de foco: sem espaços. Gasta Pontos de Foco e recarrega ao Refocar.',
    }
  }
  if (mode === 'prepared') {
    return {
      ...base,
      label: `Conjuração de ${className || 'classe'}`,
      style: 'prepared',
      slotsByCharacterLevel: standardPreparedSlotTable(),
      cantripsByCharacterLevel: standardCantrips(5),
      features: { spellbook: true },
      styleHint:
        'Conjurador completo preparado (tabela de mago/clérigo): prepara magias do grimório ou da lista a cada dia.',
    }
  }
  if (mode === 'spontaneous') {
    return {
      ...base,
      label: `Conjuração de ${className || 'classe'}`,
      style: 'spontaneous',
      slotsByCharacterLevel: standardSpontaneousSlotTable(),
      cantripsByCharacterLevel: standardCantrips(5),
      features: { repertoire: true },
      styleHint:
        'Conjurador completo espontâneo (tabela de feiticeiro): repertório fixo, escolhe a magia na hora.',
    }
  }
  return {
    ...base,
    label: `Conjuração de ${className || 'classe'}`,
    style: 'prepared',
    slotsByCharacterLevel: limitedCasterSlotTable(),
    cantripsByCharacterLevel: standardCantrips(4),
    features: { spellbook: true, limitedSlots: true },
    styleHint:
      'Conjurador limitado (tabela de magus/invocador): poucos espaços, postos baixos permanecem.',
  }
}

export function createEmptyHomebrewClass(): CharacterClass {
  const now = nowIso()
  const id = createId('class')
  const name = 'Nova Classe'
  const features = [emptyClassFeature(1)]
  const featCadence: ClassFeatCadence = 'martial'
  return {
    id,
    name,
    originalName: 'Nova Classe',
    rarity: 'common',
    provenance: { type: 'homebrew' },
    hitPointsPerLevel: 8,
    keyAttributeOptions: ['strength', 'dexterity'],
    perceptionRank: 'trained',
    saves: {
      fortitude: 'expert',
      reflex: 'trained',
      will: 'expert',
    },
    skills: {
      additionalBase: 3,
      additionalFromIntelligence: true,
    },
    attacks: [
      { category: 'simple', rank: 'trained', label: ATTACK_CAT_LABELS.simple },
      { category: 'unarmed', rank: 'trained', label: ATTACK_CAT_LABELS.unarmed },
    ],
    defenses: [
      { category: 'light', rank: 'trained', label: DEFENSE_CAT_LABELS.light },
      {
        category: 'unarmored',
        rank: 'trained',
        label: DEFENSE_CAT_LABELS.unarmored,
      },
    ],
    classDcRank: 'trained',
    features,
    classFeatLevels: defaultClassFeatLevelsFor(featCadence),
    levelTable: buildHomebrewLevelTable({
      className: name,
      featCadence,
      skillFeatCadence: 'even',
      features,
    }),
    lore: emptyClassLore(),
    createdAt: now,
    updatedAt: now,
  }
}
