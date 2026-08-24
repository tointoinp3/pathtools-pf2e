export type { AttributeId, ProficiencyRank, Rarity, Provenance, ProvenanceType, ContentSource, ContentSourceType, SkillId } from './core'
export { ATTRIBUTE_IDS, PROFICIENCY_RANKS, RARITIES, SKILL_IDS, SKILL_ATTRIBUTES } from './core'
export type { BonusType, ModifierSourceType, ModifierTarget, ModifierContribution, ResolvedModifier, ArmorClassInput, ArmorClassResult } from './modifiers'
export type { AttributeBoostOption, AttributeBoostRule, SkillGrantRule, LoreGrantRule, FeatGrantRule, FeatGrantOption, Background, BackgroundChoices } from './background'
export type {
  CreatureSize,
  SenseKind,
  SenseDefinition,
  SpecialAbilityDefinition,
  ResistanceRule,
  HeritageChoiceOption,
  HeritageChoiceRule,
  AncestryExtraChoiceKind,
  AncestryExtraChoiceRule,
  Heritage,
  AncestryLanguages,
  AncestryLore,
  Ancestry,
  AncestryChoices,
  ResolvedResistance,
  ResolvedImmunity,
} from './ancestry'
export type {
  AttackProficiencyCategory,
  DefenseProficiencyCategory,
  AttackProficiencyRule,
  DefenseProficiencyRule,
  ClassFeatureEffect,
  ClassFeature,
  ClassLevelRow,
  OfficialTableColumn,
  OfficialTable,
  ClassLore,
  ClassKeyTerm,
  ClassMechanicsGuideEntry,
  ClassSubclassOption,
  ClassSubclassGroup,
  ClassSkillRules,
  CharacterClass,
  ClassChoices,
  ClassCatalogKind,
  ClassCatalogSlotRule,
  ClassCatalogSection,
  ClassCatalogOption,
  ClassCatalogConstraint,
  ClassCatalogDetailField,
  ClassCatalogDefinition,
  ResolvedClassProficiency,
  ResolvedSaveStat,
  GrantedSpellSlot,
  GrantedClassSpell,
  ClassSpellPick,
  ClassSpellPickOption,
} from './class'
export type { PortraitRecord, PortraitTransform, PortraitFrameSize, LoreEntry, CustomSkillEntry, GrantedFeat, CharacterStickyNote, StickyNoteColor, LevelAttributeBoostLevel, SkillIncreaseEntry, Character, CharacterIdentity, CharacterPfsInfo, CharacterClassTrackers, ResolvedAttribute, SkillRankSource, PendingFeatChoiceKind, PendingSkillChoice, GrantedFeatPick, GrantedFeatPickOption, ResolvedSkill, ResolvedCustomSkill, ResolvedLore, DerivedStat, ResolvedClassDc, ResolvedCharacterSheet } from './character'
export type {
  LootHaul,
  LootLine,
  LootKind,
  LootLineKind,
  LootItemRole,
  EncounterThreat,
} from './loot'
export type {
  CombatThreat,
  EncounterLine,
  EncounterPlan,
  EncounterShape,
} from './encounter'
export type {
  CombatMapBackdrop,
  CombatSession,
  CombatToken,
  CombatTokenAbility,
  CombatTokenCharacterSummary,
  CombatTokenKind,
  CombatTokenSpell,
  CombatTokenStrike,
  LootTokenItem,
  TokenFacing,
  TokenImageRecord,
} from './combat'
export { tokenImageId } from './combat'
export type { CharacterGroup, SharedStash } from './group'
export { MESA_STASH_ID, MESA_STASH_NAME } from './group'
export type {
  ConditionId,
  ConditionGroup,
  PersistentDamageState,
  ActiveCondition,
  ConditionDefinition,
  ConditionPenaltySlice,
  ResolvedConditionEffects,
} from './condition'
export type { MythicCalling } from './mythic'
export { MYTHIC_POINTS_MAX, MYTHIC_POINTS_START } from './mythic'
export { DEFAULT_PORTRAIT_TRANSFORM, HERO_POINTS_MAX_BASE, HERO_POINTS_START_BASE } from './character'
export type {
  MagusSignatureKit,
  KineticistBlastOption,
  KineticistImpulseEntry,
  KineticistSignatureKit,
  NecromancerSignatureKit,
  CatalogSignatureItem,
  InventorSignatureKit,
  ExemplarSignatureKit,
  ThaumaturgeSignatureKit,
  RunesmithSignatureKit,
  AlchemistSignatureKit,
  CommanderSignatureKit,
  EidolonSignatureAbility,
  EidolonSignatureKit,
  ClassSignatureKit,
} from './classSignature'
export type {
  CatalogEffectWhen,
  CatalogTableEffect,
  InventorOverdriveState,
  CatalogWeaponExtra,
  CatalogActiveEffect,
} from './catalogEffects'
export type {
  ConnectionTarget,
  ConnectionMode,
  ConnectionSourceKind,
  CharacterConnection,
  ResolvedConnection,
} from './connections'
export {
  CONNECTION_TARGET_OPTIONS,
  CONNECTION_SOURCE_KIND_LABELS,
  connectionTargetLabel,
  isImmunityTarget,
  isResistanceTarget,
  isWeaknessTarget,
  isDefenseTarget,
  immunityKindFromTarget,
  immunityDisplayLabel,
} from './connections'
export type {
  ItemCategory,
  EquipmentSlot,
  BulkValue,
  WeaponHands,
  WeaponGroupId,
  ArmorGroupId,
  DamageTypeId,
  ItemUsage,
  RuneKind,
  RuneAppliesTo,
  RuneUsageRestriction,
  RuneExtraDamage,
  RuneReinforcing,
  WeaponStats,
  ArmorStats,
  ShieldStats,
  RuneStats,
  StaffSpellEntry,
  StaffStats,
  WandKind,
  WandStats,
  AlchemicalKind,
  AlchemicalEffectFamily,
  AlchemicalBombStats,
  AlchemicalElixirStats,
  AlchemicalUnarmedGrant,
  AlchemicalMutagenStats,
  AlchemicalToolStats,
  AlchemicalPoisonStats,
  PoisonExposure,
  ConsumableKind,
  ConsumableStats,
  OilPotencyStats,
  TalismanHost,
  TalismanStats,
  ScrollStats,
  SnareStats,
  GrimoireStats,
  SpellheartStats,
  AmmunitionStats,
  AlchemicalStats,
  ActiveItemEffect,
  ResolvedActiveItemEffect,
  ItemActivation,
  WornMagicActivation,
  WornMagicStats,
  ItemDefinition,
  EquipmentItem,
  ResolvedRunes,
  ResolvedInventoryItem,
  ResolvedWornArmor,
  ResolvedWieldedShield,
  ResolvedWeaponAttack,
  ResolvedEquipment,
} from './equipment'
export {
  EQUIPMENT_SLOT_LABELS,
  EQUIPMENT_SLOTS,
  ITEM_CATEGORY_LABELS,
  POISON_EXPOSURE_LABELS,
  TALISMAN_HOST_LABELS,
  WEAPON_GROUP_LABELS,
  ARMOR_GROUP_LABELS,
  DAMAGE_TYPE_LABELS,
  DAMAGE_TYPE_IDS,
  DEFAULT_INVESTMENT_LIMIT,
  BULK_LIMIT_BASE,
  BULK_MAXIMUM_BASE,
  LIGHT_BULK_PER_BULK,
  isHomebrewItem,
} from './equipment'
export type {
  CombatAction,
  CombatActionCost,
  CombatActionCategory,
  ActionGroup,
} from './action'
export {
  ACTION_GROUP_ORDER,
  ACTION_GROUP_LABELS,
  ACTION_GROUPS_HIDDEN_BY_DEFAULT,
} from './action'
export type {
  CompanionKind,
  AnimalCompanionStage,
  AnimalCompanionSpecialization,
  ConstructCompanionStage,
  ConstructModificationTier,
  FamiliarAbilityKind,
  FamiliarAbilityDefinition,
  FamiliarAbilitySelection,
  FamiliarFormDefinition,
  CompanionUnarmedAttack,
  CompanionSpeeds,
  AnimalCompanionTypeDefinition,
  AnimalCompanionState,
  FamiliarOrPetState,
  ConstructModificationDefinition,
  ConstructCompanionState,
  EidolonKeyAttribute,
  EidolonPrimaryAttackId,
  EidolonAbility,
  EidolonNamedArray,
  EidolonTypeDefinition,
  EidolonState,
  CharacterCompanions,
  SpecificFamiliarGrantedAbility,
  SpecificFamiliarSpecialAbility,
  SpecificFamiliarDefinition,
  CompanionCatalogKind,
  HomebrewCompanionRecord,
} from './companion'
export {
  ANIMAL_COMPANION_STAGE_LABELS,
  ANIMAL_SPECIALIZATION_LABELS,
  COMPANION_KIND_LABELS,
  COMPANION_CATALOG_KIND_LABELS,
  isHomebrewCompanion,
  CONSTRUCT_COMPANION_STAGE_LABELS,
  CONSTRUCT_MODIFICATION_TIER_LABELS,
  FAMILIAR_ABILITY_KIND_LABELS,
  FAMILIAR_HP_PER_LEVEL,
  TOUGH_HP_PER_LEVEL,
  DEFAULT_FAMILIAR_ABILITY_SLOTS,
} from './companion'
export type {
  FeatCategory,
  FeatPrerequisite,
  Feat,
  FeatEffect,
  FeatSpellcastingAccess,
  FeatSlot,
  FeatSelection,
  FeatAvailability,
  FeatPrerequisiteCheck,
} from './feat'
export type {
  ArchetypeKind,
  ArchetypeUiGroup,
  Archetype,
  ArchetypeProgress,
} from './archetype'
export {
  ARCHETYPE_KIND_LABELS,
  ARCHETYPE_GROUP_LABELS,
  archetypeUiGroup,
  DEFAULT_FEATS_BEFORE_NEXT_DEDICATION,
} from './archetype'
export type {
  SpellTradition,
  SpellcastingStyle,
  SpellcastingSourceKind,
  SpellRank,
  Spell,
  SpellcastingFeatures,
  SpellcastingDefinition,
  PreparedSpellSlot,
  SourceSpellState,
  CharacterSpellState,
  ResolvedSpellcastingSource,
  ResolvedSpellcastingAccess,
  ClassFocusTrait,
} from './spell'
export {
  SPELL_TRADITIONS,
  CLASS_FOCUS_TRAITS,
  isHomebrewSpell,
} from './spell'
export type { Ritual, RitualRank } from './ritual'
export { isHomebrewRitual } from './ritual'
export type {
  DivineFont,
  Sanctification,
  DeityKind,
  Deity,
  DivineDomain,
  DeityChoices,
} from './deity'
export { emptyDeityChoices, isHomebrewDeity } from './deity'
export type {
  Creature,
  CreatureAbility,
  CreatureActionCost,
  CreatureAttack,
  CreatureFamily,
  CreatureFamilySection,
  CreatureItemRef,
  CreaturePowerVariant,
  CreatureRecallKnowledge,
  CreatureSense,
  CreatureSkillBonus,
  CreatureSpell,
  CreatureSpellcasting,
} from './creature'
export { isHomebrewCreature } from './creature'
export type {
  CountryLabelStyle,
  MapCamera,
  MapLegendEntry,
  MapMarker,
  MapVertex,
  MarkerShape,
  NoteAttachment,
  NoteAttachmentKind,
  WorldAssetKind,
  WorldAssetRecord,
  MapPath,
  MapPathPoint,
  MapPathStyle,
  WorldCountry,
  WorldFolder,
  WorldMap,
  WorldNote,
} from './world'
export {
  MAP_PATH_STYLES,
  MAP_PATH_STYLE_LABELS,
  MARKER_SHAPES,
  MARKER_SHAPE_LABELS,
  NOTE_ATTACHMENT_KINDS,
  NOTE_ATTACHMENT_KIND_LABELS,
} from './world'

export type ThemePreference = 'system' | 'dark' | 'light'

export const THEME_PREFERENCES: ThemePreference[] = [
  'system',
  'dark',
  'light',
]

export const THEME_PREFERENCE_LABELS: Record<ThemePreference, string> = {
  system: 'Sistema',
  dark: 'Escuro',
  light: 'Claro',
}

export const DEFAULT_THEME: ThemePreference = 'system'

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === 'system' || value === 'dark' || value === 'light'
}

export interface AppSettings {
  id: 'app'
  /** Aparência: segue o sistema, ou força escuro / claro. */
  theme: ThemePreference
  language: 'pt-BR'
  showModifierBreakdown: boolean
  /**
   * Segundos até aparecer de onde veio o número (PV, CA, atributos…).
   * `0` = instantâneo. Só vale com `showModifierBreakdown`.
   */
  sourceTooltipDelaySeconds: number
  /**
   * Segundos até o toast de rolagem sumir sozinho.
   * `0` = só some ao clicar no X.
   */
  diceToastDurationSeconds: number
  /**
   * Escala tipográfica da interface (1 = 100%).
   * Afeta letras, números e componentes em rem.
   */
  uiScale: number
  /** Se true, Ctrl + scroll (ou ⌘ + scroll) ajusta a escala. */
  ctrlScrollZoomEnabled: boolean
  /**
   * Regra variante Arquétipos grátis (GM Core pág. 84).
   * Feito extra no 2º nível e em todos os pares, só para feitos de arquétipo.
   */
  freeArchetypeEnabled: boolean
  /**
   * Opcional da mesma regra: ignora o bloqueio de 2 feitos antes da
   * próxima Dedicação (o GM Core sugere isso se o grupo compartilha
   * um arquétipo ou uma lista limitada).
   */
  freeArchetypeIgnoreDedicationLock: boolean
  /**
   * Regras míticas (War of Immortals). Chamado, Pontos Míticos no lugar
   * de pontos de herói, feitos míticos nos pares e destino no 12º.
   */
  mythicRulesEnabled: boolean
  /** GM Core: 2 feitos de ancestralidade no 1º e mais um em cada ímpar. */
  ancestryParagonEnabled: boolean
  /** GM Core: duas classes, feitos e recursos das duas. */
  dualClassEnabled: boolean
  /** GM Core: 1 aumento de atributo nos níveis 2–5, 7–10, 12–15, 17–20. */
  gradualAbilityBoostsEnabled: boolean
  /** GM Core pág. 83: bônus de potência no lugar de runas fundamentais. */
  automaticBonusProgressionEnabled: boolean
  /** GM Core pág. 85: proficiência sem somar o nível. */
  proficiencyWithoutLevelEnabled: boolean
  seedVersion: number
  /**
   * Quantidade de registros gravados no último seed bem-sucedido.
   * Serve para detectar um banco incompleto sem varrer registro a registro.
   */
  seedCounts?: Partial<Record<SeededTable, number>>
}

/** Tabelas alimentadas pelo seed de conteúdo oficial */
export type SeededTable =
  | 'contentSources'
  | 'backgrounds'
  | 'ancestries'
  | 'heritages'
  | 'classes'
  | 'feats'

export const DEFAULT_DICE_TOAST_DURATION_SECONDS = 30

/** Espera do tooltip de fontes (0 = instantâneo, padrão 3s, máx. 10s). */
export const DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS = 3
export const SOURCE_TOOLTIP_DELAY_MIN = 0
export const SOURCE_TOOLTIP_DELAY_MAX = 10

export function clampSourceTooltipDelaySeconds(value: number): number {
  if (!Number.isFinite(value)) return DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS
  return Math.min(
    SOURCE_TOOLTIP_DELAY_MAX,
    Math.max(SOURCE_TOOLTIP_DELAY_MIN, Math.round(value)),
  )
}

/** Escala mínima / máxima / passo da interface */
export const UI_SCALE_MIN = 0.8
export const UI_SCALE_MAX = 1.4
export const UI_SCALE_STEP = 0.05
export const UI_SCALE_DEFAULT = 1

export function clampUiScale(value: number): number {
  if (!Number.isFinite(value)) return UI_SCALE_DEFAULT
  const stepped =
    Math.round(value / UI_SCALE_STEP) * UI_SCALE_STEP
  return Math.min(
    UI_SCALE_MAX,
    Math.max(UI_SCALE_MIN, Math.round(stepped * 100) / 100),
  )
}
