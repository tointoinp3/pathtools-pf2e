import type {
  Character,
  CombatToken,
  CombatTokenAbility,
  CombatTokenCharacterSummary,
  CombatTokenSpell,
  CombatTokenStrike,
  ResolvedCharacterSheet,
} from '@/types'
import { resolveCharacterSheet } from '@/engine'
import { characterToken, type CharacterTokenInput } from '@/engine/combat'
import {
  mapFlagsFromSheet,
  resolveMapProfile,
  traitsForMap,
} from '@/engine/multipleAttackPenalty'
import { getCharacter } from '@/features/characters/characterRepository'
import { collectSessionSpells } from '@/features/characters/components/SessionSheetView'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useClassStore } from '@/stores/classStore'
import { useFeatStore } from '@/stores/featStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { SKILL_LABELS, TRADITION_LABELS } from '@/utils/labels'

/** Carrega os catálogos que a resolução de ficha precisa. */
export async function loadCharacterCatalogs(): Promise<void> {
  await Promise.all([
    useBackgroundStore.getState().loadAll(),
    useAncestryStore.getState().loadAll(),
    useClassStore.getState().loadAll(),
    useFeatStore.getState().loadAll(),
    useSettingsStore.getState().load(),
  ])
}

/** Resolve a ficha completa com os catálogos já carregados. */
export function resolveSheetFor(character: Character): ResolvedCharacterSheet {
  const backgrounds = useBackgroundStore.getState()
  const ancestries = useAncestryStore.getState()
  const classes = useClassStore.getState()
  const feats = useFeatStore.getState().feats
  const settings = useSettingsStore.getState().settings
  return resolveCharacterSheet({
    character,
    background: character.backgroundId
      ? (backgrounds.getById(character.backgroundId) ?? null)
      : null,
    ancestry: character.ancestryId
      ? (ancestries.getAncestryById(character.ancestryId) ?? null)
      : null,
    heritage: character.heritageId
      ? (ancestries.getHeritageById(character.heritageId) ?? null)
      : null,
    characterClass: character.classId
      ? (classes.getById(character.classId) ?? null)
      : null,
    secondClass: settings?.dualClassEnabled
      ? character.secondClassId
        ? (classes.getById(character.secondClassId) ?? null)
        : null
      : null,
    sources: backgrounds.sources,
    feats,
    freeArchetype: settings?.freeArchetypeEnabled === true,
    mythicRules: settings?.mythicRulesEnabled === true,
    ancestryParagon: settings?.ancestryParagonEnabled === true,
    dualClass: settings?.dualClassEnabled === true,
    gradualAbilityBoosts: settings?.gradualAbilityBoostsEnabled === true,
    automaticBonusProgression:
      settings?.automaticBonusProgressionEnabled === true,
    proficiencyWithoutLevel: settings?.proficiencyWithoutLevelEnabled === true,
  })
}

/** Fotografa da ficha tudo que o statblock do token mostra. */
export function characterSummaryFromSheet(
  sheet: ResolvedCharacterSheet,
): CombatTokenCharacterSummary {
  const skills: Array<{ name: string; modifier: number }> = [
    ...sheet.skills
      .filter((skill) => skill.rank !== 'untrained')
      .map((skill) => ({
        name: SKILL_LABELS[skill.id] ?? skill.id,
        modifier: skill.modifier,
      })),
    ...sheet.customSkills
      .filter((skill) => skill.rank !== 'untrained')
      .map((skill) => ({ name: skill.name, modifier: skill.modifier })),
    ...sheet.lores.map((lore) => ({
      name: `Conhecimento: ${lore.name}`,
      modifier: lore.modifier,
    })),
  ].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))

  // Golpes com o MAP embutido (−5/−10; ágil −4/−8; Graça Ágil −3/−6)
  const mapFlags = mapFlagsFromSheet(sheet)
  const strikes: CombatTokenStrike[] = sheet.equipment.weapons.map((weapon) => {
    const traits = traitsForMap(weapon)
    const profile = resolveMapProfile(traits, mapFlags)
    return {
      label: weapon.displayName,
      bonus: weapon.attackBonus,
      damage: weapon.damageSummary,
      traits,
      mapPenalties: [profile.second, profile.third],
      damageDice: weapon.damageDice,
      damageModifier: weapon.damageModifier,
    }
  })

  // Magias: só ids/rótulos; nome, custo e texto vêm do catálogo na hora.
  const spells: CombatTokenSpell[] = sheet.spellcasting?.hasAccess
    ? collectSessionSpells(sheet.character, sheet.spellcasting).map(
        (entry) => ({
          id: entry.spell?.id ?? entry.label,
          label: entry.label,
          kind: entry.kind,
          rank: entry.rankNum,
          expended: entry.expended,
        }),
      )
    : []

  // Ações e habilidades: habilidades especiais + feitos com custo de ação.
  const abilities: CombatTokenAbility[] = [
    ...sheet.specialAbilities.map((ability) => ({
      name: ability.name,
      actionType: ability.actionType,
      description: ability.description,
      sourceLabel: ability.sourceLabel,
    })),
    ...sheet.feats
      .filter((feat) => feat.actionType && feat.actionType !== 'passive')
      .map((feat) => ({
        name: feat.featName,
        actionType: feat.actionType,
        traits: feat.traits,
        trigger: feat.trigger,
        frequency: feat.frequency,
        description: feat.description,
        sourceLabel: feat.sourceLabel,
      })),
  ]

  return {
    className: sheet.className ?? null,
    ancestryName: sheet.ancestryName ?? null,
    attributes: Object.fromEntries(
      sheet.attributes.map((attribute) => [attribute.id, attribute.modifier]),
    ),
    fortitude: sheet.derived.fortitude.value,
    reflex: sheet.derived.reflex.value,
    will: sheet.derived.will.value,
    speed: sheet.derived.speed.value,
    classDc: sheet.classDc?.value ?? null,
    spellAttack: sheet.spellcasting?.spellAttack ?? null,
    spellDc: sheet.spellcasting?.spellDc ?? null,
    spellTraditions: sheet.spellcasting?.sources.map(
      (source) => TRADITION_LABELS[source.tradition] ?? source.tradition,
    ),
    skills,
    strikes,
    spells,
    abilities,
    senses: sheet.senses.map((sense) => sense.name),
    languages: sheet.languages,
  }
}

/** Monta o token de jogador a partir do personagem (ficha resolvida). */
export function buildCharacterToken(
  character: Character,
  name: string,
  position: { x: number; y: number },
): CombatToken {
  const sheet = resolveSheetFor(character)
  const input: CharacterTokenInput = {
    characterId: character.id,
    name,
    level: character.level ?? null,
    maxHp: sheet.derived.hp.value,
    currentHp: character.currentHp ?? null,
    ac: sheet.derived.ac.value,
    perception:
      sheet.derived.initiative.value ?? sheet.derived.perception.value,
    summary: characterSummaryFromSheet(sheet),
  }
  return characterToken(input, position)
}

/**
 * Recalcula os números do token a partir da ficha atual do personagem
 * (nível, PV máximo, CA, salvaguardas…). O PV atual do combate é mantido,
 * apenas limitado ao novo máximo.
 */
export async function syncCharacterTokenPatch(
  token: CombatToken,
): Promise<Partial<CombatToken> | null> {
  if (!token.characterId) return null
  await loadCharacterCatalogs()
  const character = await getCharacter(token.characterId)
  if (!character) return null
  const sheet = resolveSheetFor(character)
  const maxHp = Math.max(1, sheet.derived.hp.value ?? token.maxHp)
  return {
    level: character.level ?? token.level,
    maxHp,
    currentHp: Math.min(token.currentHp, maxHp),
    ac: sheet.derived.ac.value,
    initiativeBonus:
      sheet.derived.initiative.value ??
      sheet.derived.perception.value ??
      token.initiativeBonus,
    characterSummary: characterSummaryFromSheet(sheet),
  }
}
