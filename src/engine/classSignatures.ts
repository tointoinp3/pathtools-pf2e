import type {
  Character,
  CharacterClass,
  ClassChoices,
  ClassSignatureKit,
  GrantedFeat,
  ResolvedClassDc,
  ResolvedSpellcastingAccess,
} from '@/types'
import type { CatalogKitResolved } from './catalogKit'
import {
  CLASS_KINETICIST_ID,
  CLASS_MAGUS_ID,
  CLASS_NECROMANCER_ID,
} from '@/data/seeds/ids'
import { getSpellById } from '@/engine/spellCatalog'
import { getEidolonType } from '@/data/seeds/eidolons'
import { selectedCatalogOptions } from './classCatalog'
import {
  emptyClassChoices,
  getSelectedSecondarySubclass,
  getSelectedSubclass,
} from './class'
import { resolveEidolonStats } from './eidolon'

function sourceSpellAttack(
  spellcasting: ResolvedSpellcastingAccess | undefined,
  classOriginalName: string,
): number | null {
  const source = spellcasting?.sources.find(
    (entry) => entry.classOriginalName === classOriginalName,
  )
  return source?.spellAttack ?? spellcasting?.spellAttack ?? null
}

const BLAST_TABLE: Record<
  string,
  {
    name: string
    die: string
    types: string[]
    rangeFeet: number
  }
> = {
  air: {
    name: 'Ar',
    die: 'd6',
    types: ['eletricidade', 'cortante'],
    rangeFeet: 60,
  },
  earth: {
    name: 'Terra',
    die: 'd8',
    types: ['contundente', 'perfurante'],
    rangeFeet: 30,
  },
  fire: {
    name: 'Fogo',
    die: 'd6',
    types: ['fogo'],
    rangeFeet: 60,
  },
  metal: {
    name: 'Metal',
    die: 'd8',
    types: ['perfurante', 'cortante'],
    rangeFeet: 30,
  },
  water: {
    name: 'Água',
    die: 'd8',
    types: ['contundente', 'frio'],
    rangeFeet: 30,
  },
  wood: {
    name: 'Madeira',
    die: 'd8',
    types: ['contundente', 'vitalidade'],
    rangeFeet: 30,
  },
}

function scalingDice(level: number): number {
  let dice = 1
  for (const threshold of [5, 9, 13, 17]) {
    if (level >= threshold) dice += 1
  }
  return dice
}

function kineticElementsFromGate(subclassId?: string | null): string[] {
  if (!subclassId) return []
  if (subclassId.startsWith('gate-single-')) {
    return [subclassId.slice('gate-single-'.length)]
  }
  if (subclassId.startsWith('gate-dual-')) {
    return subclassId.slice('gate-dual-'.length).split('-').filter(Boolean)
  }
  return []
}

function isImpulseFeat(feat: GrantedFeat): boolean {
  return (feat.traits ?? []).some((t) => t.toLowerCase() === 'impulse')
}

function hasOverflow(feat: GrantedFeat): boolean {
  return (feat.traits ?? []).some((t) => t.toLowerCase() === 'overflow')
}

function attackBonusFromDc(classDc: ResolvedClassDc | null | undefined): number | null {
  if (classDc?.value == null) return null
  return classDc.value - 10
}

export function resolveClassSignature(args: {
  character: Character
  characterClass?: CharacterClass | null
  classDc?: ResolvedClassDc | null
  spellcasting?: ResolvedSpellcastingAccess
  feats: GrantedFeat[]
  attrMap: Partial<Record<string, number>>
  catalogKit?: CatalogKitResolved
}): ClassSignatureKit {
  const {
    character,
    characterClass,
    classDc,
    spellcasting,
    feats,
    attrMap,
    catalogKit,
  } = args
  const choices: ClassChoices = character.classChoices ?? emptyClassChoices()
  const level = character.level
  const trackers = character.classTrackers ?? {}
  const kit: ClassSignatureKit = { catalog: [] }

  const isMagus =
    characterClass?.id === CLASS_MAGUS_ID ||
    feats.some((f) => f.featId === 'feat-magus-spellstriker')
  if (isMagus) {
    const maxCharges = level >= 19 ? 2 : 1
    const charged =
      trackers.magusSpellstrikeCharges == null
        ? maxCharges
        : Math.min(maxCharges, Math.max(0, trackers.magusSpellstrikeCharges))
    const preparedAttackSpells: Array<{
      name: string
      originalName?: string
      rank: number
    }> = []
    const seen = new Set<string>()
    const spellIds = [
      ...(character.spellState?.cantripIds ?? []),
      ...(character.spellState?.preparedSlots ?? [])
        .map((slot) => slot.spellId)
        .filter((id): id is string => Boolean(id)),
    ]
    for (const spellId of spellIds) {
      if (seen.has(spellId)) continue
      const spell = getSpellById(spellId)
      if (!spell) continue
      const attack = spell.traits.some((t) => t.toLowerCase() === 'attack')
      if (!attack) continue
      seen.add(spellId)
      preparedAttackSpells.push({
        name: spell.name,
        originalName: spell.originalName,
        rank: spell.rank,
      })
    }
    const archetypeOnly = characterClass?.id !== CLASS_MAGUS_ID
    kit.magus = {
      charged,
      maxCharges,
      spellAttack: sourceSpellAttack(spellcasting, 'Magus'),
      rechargeNote: archetypeOnly
        ? 'Recarrega com 1 minuto de atividade (Dedicação).'
        : '1 ação para recarregar. Magias de confluxo recarregam ao conjurar.',
      doubleSpellstrike: level >= 19,
      preparedAttackSpells,
    }
  }

  if (characterClass?.id === CLASS_KINETICIST_ID) {
    const subclass = getSelectedSubclass(characterClass, choices)
    const elements = kineticElementsFromGate(subclass?.id)
    const dice = scalingDice(level)
    const impulseAttack = attackBonusFromDc(classDc)
    const str = attrMap.strength ?? 0
    const con = attrMap.constitution ?? 0
    const blasts = elements.flatMap((elementId) => {
      const row = BLAST_TABLE[elementId]
      if (!row) return []
      return [
        {
          id: `${elementId}-melee`,
          elementId,
          elementName: row.name,
          rangeType: 'melee' as const,
          rangeFeet: 5,
          dice,
          die: row.die,
          damageTypeLabels: row.types,
          attackBonus: impulseAttack,
          meleeDamageBonus: str,
          twoActionBonus: con,
        },
        {
          id: `${elementId}-ranged`,
          elementId,
          elementName: row.name,
          rangeType: 'ranged' as const,
          rangeFeet: row.rangeFeet,
          dice,
          die: row.die,
          damageTypeLabels: row.types,
          attackBonus: impulseAttack,
          meleeDamageBonus: 0,
          twoActionBonus: con,
        },
      ]
    })
    kit.kineticist = {
      auraActive: Boolean(trackers.kineticAuraActive),
      elements: elements.map((id) => BLAST_TABLE[id]?.name ?? id),
      impulseAttack,
      classDc: classDc?.value ?? null,
      blasts,
      impulses: feats.filter(isImpulseFeat).map((feat) => ({
        id: feat.id,
        name: feat.featName,
        actionType: feat.actionType,
        traits: feat.traits ?? [],
        description: feat.description ?? '',
        overflow: hasOverflow(feat),
      })),
    }
  }

  if (characterClass?.id === CLASS_NECROMANCER_ID) {
    const method = getSelectedSubclass(characterClass, choices)
    const fascination = getSelectedSecondarySubclass(characterClass, choices)
    const bone = fascination?.id === 'fascination-bone'
    kit.necromancer = {
      count: Math.max(0, trackers.necromancerThralls ?? 0),
      strikeDice: scalingDice(level),
      spellAttack: sourceSpellAttack(spellcasting, 'Necromancer'),
      speedFeet: bone ? 20 : 15,
      methodLabel: method?.name,
      fascinationLabel: fascination?.name,
      extraOnCreate: method?.id === 'method-puppeteer',
    }
  }

  if (characterClass) {
    for (const { catalog, option, role } of selectedCatalogOptions(
      characterClass,
      choices,
      level,
    )) {
      const etchedKey = option.id.startsWith('rune-')
        ? `etched:${option.id}`
        : undefined
      kit.catalog.push({
        id: `${catalog.id}-${option.id}-${role}`,
        optionId: option.id,
        name: option.name,
        catalogLabel: catalog.label,
        role,
        actionType: option.actionType,
        rulesSummary: option.rulesSummary,
        description: option.description,
        sections: option.sections ?? [],
        activeEffects: catalogKit?.activeByOptionId[option.id],
        toggleKey: etchedKey,
        toggled: etchedKey
          ? Boolean(trackers.kitToggles?.[etchedKey])
          : undefined,
      })
    }
  }

  if (catalogKit?.inventor) kit.inventor = catalogKit.inventor
  if (catalogKit?.exemplar) kit.exemplar = catalogKit.exemplar
  if (catalogKit?.thaumaturge) kit.thaumaturge = catalogKit.thaumaturge
  if (catalogKit?.runesmith) kit.runesmith = catalogKit.runesmith
  if (catalogKit?.alchemist) kit.alchemist = catalogKit.alchemist
  if (catalogKit?.commander) kit.commander = catalogKit.commander

  const eidolonState = character.companions?.eidolon
  if (eidolonState) {
    const type = eidolonState.typeId
      ? getEidolonType(eidolonState.typeId)
      : null
    const stats = resolveEidolonStats(eidolonState, level)
    if (type && stats) {
      kit.eidolon = {
        name: eidolonState.name || type.name,
        typeName: type.name,
        ac: stats.ac,
        attacks: stats.attacks.map((atk) => ({
          id: atk.id,
          name: atk.name,
          attackModifier: atk.attackModifier,
          damageLabel: atk.damageLabel,
          damageType: atk.damageType,
          traits: atk.traits,
        })),
        abilities: [
          {
            name: type.initialAbility.name,
            description: type.initialAbility.description,
            actionType: type.initialAbility.actionType,
            tier: 'initial',
            unlocked: true,
          },
          {
            name: type.symbiosisAbility.name,
            description: type.symbiosisAbility.description,
            actionType: type.symbiosisAbility.actionType,
            tier: 'symbiosis',
            unlocked: level >= 7,
          },
          {
            name: type.transcendenceAbility.name,
            description: type.transcendenceAbility.description,
            actionType: type.transcendenceAbility.actionType,
            tier: 'transcendence',
            unlocked: level >= 17,
          },
        ],
      }
    }
  }

  return kit
}

export function classSignatureIsEmpty(kit: ClassSignatureKit): boolean {
  return (
    !kit.magus &&
    !kit.kineticist &&
    !kit.necromancer &&
    !kit.inventor &&
    !kit.exemplar &&
    !kit.thaumaturge &&
    !kit.runesmith &&
    !kit.alchemist &&
    !kit.commander &&
    kit.catalog.length === 0 &&
    !kit.eidolon
  )
}
