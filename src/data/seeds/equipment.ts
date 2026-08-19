import type {
  EquipmentSlot,
  ItemCategory,
  ItemDefinition,
} from '@/types/equipment'
import { PLAYER_CORE_WEAPONS } from './equipmentWeaponsPlayerCore'
import { PLAYER_CORE_ARMOR, PLAYER_CORE_SHIELDS } from './equipmentArmorPlayerCore'
import { PLAYER_CORE_GEAR } from './equipmentGearPlayerCore'
import { GM_CORE_RUNES } from './equipmentRunesGmCore'
import { GM_CORE_STAVES } from './equipmentStavesGmCore'
import { GM_CORE_WANDS } from './equipmentWandsGmCore'
import { PLAYER_CORE_2_ALCHEMICALS } from './equipmentAlchemicalsPlayerCore2'
import { PLAYER_CORE_2_MUTAGENS } from './equipmentMutagensPlayerCore2'
import { PLAYER_CORE_2_POISONS } from './equipmentPoisonsPlayerCore2'
import { PLAYER_CORE_2_TOOLS } from './equipmentToolsPlayerCore2'
import { GM_CORE_POTIONS } from './equipmentPotionsGmCore'
import { GM_CORE_OILS } from './equipmentOilsGmCore'
import { GM_CORE_SCROLLS } from './equipmentScrollsGmCore'
import { GM_CORE_APEX } from './equipmentApexGmCore'
import { GM_CORE_HELD } from './equipmentHeldGmCore'
import { GM_CORE_WORN } from './equipmentWornGmCore'
import { PLAYER_CORE_2_WORN } from './equipmentWornPlayerCore2'
import { RAGE_OF_ELEMENTS_WORN } from './equipmentWornRageOfElements'
import {
  GM_CORE_TALISMANS,
  PLAYER_CORE_2_TALISMANS,
} from './equipmentTalismansRemaster'
import { PLAYER_CORE_2_SNARES } from './equipmentSnaresPlayerCore2'
import { IMPOSSIBLE_MAGIC_GRIMOIRES } from './equipmentGrimoiresImpossibleMagic'
import { REMASTER_SPELLHEARTS } from './equipmentSpellheartsRemaster'
import { IMPOSSIBLE_MAGIC_RUNES } from './equipmentRunesImpossibleMagic'
import { IMPOSSIBLE_MAGIC_ARMOR } from './equipmentArmorImpossibleMagic'
import { IMPOSSIBLE_MAGIC_WEAPONS } from './equipmentWeaponsImpossibleMagic'
import { IMPOSSIBLE_MAGIC_STAVES } from './equipmentStavesImpossibleMagic'
import { IMPOSSIBLE_MAGIC_CONSUMABLES } from './equipmentConsumablesImpossibleMagic'
import { IMPOSSIBLE_MAGIC_WORN } from './equipmentWornImpossibleMagic'
import { IMPOSSIBLE_MAGIC_HELD } from './equipmentHeldImpossibleMagic'
import { IMPOSSIBLE_MAGIC_SPELLHEARTS_EXTRA } from './equipmentSpellheartsImpossibleMagic'
import { BATTLECRY_ARMOR } from './equipmentArmorBattlecry'
import { BATTLECRY_WEAPONS } from './equipmentWeaponsBattlecry'
import { BATTLECRY_BASE_WEAPONS } from './equipmentWeaponsBaseBattlecry'
import { BATTLECRY_CONSUMABLES } from './equipmentConsumablesBattlecry'
import { BATTLECRY_BANNERS } from './equipmentBannersBattlecry'
import { BATTLECRY_HELD } from './equipmentHeldBattlecry'
import { BATTLECRY_WORN } from './equipmentWornBattlecry'
import { BATTLECRY_GEAR } from './equipmentGearBattlecry'
import { GUNS_GEARS_CONSUMABLES } from './equipmentConsumablesGunsGears'
import { GUNS_GEARS_ALCHEMICALS } from './equipmentAlchemicalsGunsGears'
import { GUNS_GEARS_SNARES } from './equipmentSnaresGunsGears'
import { GUNS_GEARS_WEAPONS } from './equipmentWeaponsGunsGears'
import { GUNS_GEARS_CUSTOMIZATIONS } from './equipmentCustomizationsGunsGears'
import { GUNS_GEARS_GEAR } from './equipmentGearGunsGears'
import { RAGE_OF_ELEMENTS_ARMOR } from './equipmentArmorRageOfElements'
import { RAGE_OF_ELEMENTS_WEAPONS } from './equipmentWeaponsRageOfElements'
import { RAGE_OF_ELEMENTS_MAGIC } from './equipmentMagicRageOfElements'
import { RAGE_OF_ELEMENTS_CONSUMABLES } from './equipmentConsumablesRageOfElements'
import { RAGE_OF_ELEMENTS_HELD } from './equipmentHeldRageOfElements'
import { HOWL_OF_THE_WILD_GRAFTS } from './equipmentGraftsHowlOfTheWild'
import { HOWL_OF_THE_WILD_ARMOR } from './equipmentArmorHowlOfTheWild'
import { HOWL_OF_THE_WILD_WEAPONS } from './equipmentWeaponsHowlOfTheWild'
import { HOWL_OF_THE_WILD_ALCHEMICALS } from './equipmentAlchemicalsHowlOfTheWild'
import { HOWL_OF_THE_WILD_CONSUMABLES } from './equipmentConsumablesHowlOfTheWild'
import { HOWL_OF_THE_WILD_GEAR } from './equipmentGearHowlOfTheWild'
import { PLAYER_CORE_2_MATERIALS } from './equipmentMaterialsPlayerCore2'
import { PLAYER_CORE_2_ARMOR } from './equipmentArmorPlayerCore2'
import { PLAYER_CORE_2_CONSUMABLES } from './equipmentConsumablesPlayerCore2'
import { PLAYER_CORE_2_MAGIC } from './equipmentMagicPlayerCore2'
import { PLAYER_CORE_2_WEAPONS } from './equipmentWeaponsPlayerCore2'
import { GUNS_GEARS_BASE_WEAPONS } from './equipmentWeaponsGunsGearsBase'
import { RIVAL_ACADEMIES_ITEMS } from './equipmentRivalAcademies'
import { TIAN_XIA_ITEMS } from './equipmentTianXia'
import { TIAN_XIA_WEAPONS } from './equipmentWeaponsTianXia'
import { DARK_ARCHIVES_ITEMS } from './equipmentDarkArchives'
import { HIGH_SEAS_ITEMS } from './equipmentHighSeas'
import { SHINING_KINGDOMS_ITEMS } from './equipmentShiningKingdoms'
import { WAR_OF_IMMORTALS_ITEMS } from './equipmentWarOfImmortals'
import { WAR_OF_IMMORTALS_WEAPONS } from './equipmentWeaponsWarOfImmortals'
import { WAR_OF_IMMORTALS_ARMOR } from './equipmentArmorWarOfImmortals'
import { DRACONIC_CODEX_ITEMS } from './equipmentDraconicCodex'
import { SEVERED_AT_THE_ROOT_ITEMS } from './equipmentSeveredAtTheRoot'
import { SEASON_OF_GHOSTS_ITEMS } from './equipmentSeasonOfGhosts'
import { GATEWALKERS_ITEMS } from './equipmentGatewalkers'
import { NPC_CORE_ITEMS } from './equipmentNpcCore'
import { PREY_FOR_DEATH_ITEMS } from './equipmentPreyForDeath'
import { DIVINE_MYSTERIES_ITEMS } from './equipmentDivineMysteries'
import { PFS_GUIDE_ITEMS } from './equipmentPfsGuide'
import { CLAWS_OF_THE_TYRANT_ITEMS } from './equipmentClawsOfTheTyrant'
import { MYTHIC_AP_ITEMS } from './equipmentMythicAps'
import { AP_201_ITEMS } from './equipmentAp201'
import { AP_203_ITEMS } from './equipmentAp203'
import { AP_204_ITEMS } from './equipmentAp204'
import { AP_205_ITEMS } from './equipmentAp205'
import { AP_206_ITEMS } from './equipmentAp206'
import { AP_207_ITEMS } from './equipmentAp207'
import { AP_208_ITEMS } from './equipmentAp208'
import { AP_209_ITEMS } from './equipmentAp209'
import { AP_210_ITEMS } from './equipmentAp210'
import { AP_211_ITEMS } from './equipmentAp211'
import { AP_212_ITEMS } from './equipmentAp212'
import { AP_213_ITEMS } from './equipmentAp213'
import { AP_214_ITEMS } from './equipmentAp214'
import { AP_215_ITEMS } from './equipmentAp215'
import { AP_216_ITEMS } from './equipmentAp216'
import { AP_217_ITEMS } from './equipmentAp217'
import { AP_218_ITEMS } from './equipmentAp218'
import { AP_219_ITEMS } from './equipmentAp219'
import { AP_220_ITEMS } from './equipmentAp220'
import { AP_222_ITEMS } from './equipmentAp222'
import { AP_223_ITEMS } from './equipmentAp223'
import { AP_224_ITEMS } from './equipmentAp224'
import { HELLFIRE_DISPATCHES_ITEMS } from './equipmentHellfireDispatches'
import { TROUBLES_IN_GRAYCE_ITEMS } from './equipmentTroublesInGrayce'
import { BEGINNER_BOX_ITEMS } from './equipmentBeginnerBox'
import { MONSTER_CORE_ITEMS } from './equipmentMonsterCore'
import { GM_CORE_MATERIALS, TREASURE_VAULT_MATERIALS } from './equipmentMaterialsGmCore'
import { REMASTER_ASSISTIVE } from './equipmentAssistiveRemaster'
import { GM_CORE_PRECIOUS } from './equipmentPreciousGmCore'
import { GM_CORE_SPECIFIC } from './equipmentSpecificGmCore'
import { GM_CORE_ARTIFACTS } from './equipmentArtifactsGmCore'
import { GM_CORE_CONSUMABLES_EXTRA } from './equipmentConsumablesGmCoreExtra'
import { TREASURE_VAULT_TATTOOS } from './equipmentTattoosTreasureVault'
import { TREASURE_VAULT_ASSISTIVE } from './equipmentAssistiveTreasureVault'
import { TREASURE_VAULT_ADJUSTMENTS } from './equipmentAdjustmentsTreasureVault'
import { TREASURE_VAULT_RUNES } from './equipmentRunesTreasureVault'
import { TREASURE_VAULT_ARMOR } from './equipmentArmorTreasureVault'
import { TREASURE_VAULT_BASE_ARMOR } from './equipmentArmorBaseTreasureVault'
import { TREASURE_VAULT_BASE_WEAPONS } from './equipmentWeaponsBaseTreasureVault'
import { TREASURE_VAULT_SHIELDS } from './equipmentShieldsTreasureVault'
import { TREASURE_VAULT_WEAPONS } from './equipmentWeaponsTreasureVault'
import { TREASURE_VAULT_ALCHEMICALS } from './equipmentAlchemicalsTreasureVault'
import { TREASURE_VAULT_CONSUMABLES } from './equipmentConsumablesTreasureVault'
import { TREASURE_VAULT_WORN } from './equipmentWornTreasureVault'
import { TREASURE_VAULT_HELD } from './equipmentHeldTreasureVault'
import { TREASURE_VAULT_STAVES } from './equipmentStavesTreasureVault'
import { TREASURE_VAULT_WANDS } from './equipmentWandsTreasureVault'
import { TREASURE_VAULT_GRIMOIRES } from './equipmentGrimoiresTreasureVault'
import { TREASURE_VAULT_SPELLHEARTS } from './equipmentSpellheartsTreasureVault'
import { TREASURE_VAULT_ARTIFACTS } from './equipmentArtifactsTreasureVault'
import { TREASURE_VAULT_CURSED } from './equipmentCursedTreasureVault'
import { TREASURE_VAULT_INTELLIGENT } from './equipmentIntelligentTreasureVault'
import { TREASURE_VAULT_RELICS } from './equipmentRelicsTreasureVault'
import { TREASURE_VAULT_BOONS } from './equipmentBoonsTreasureVault'
import { applyWornItemText } from './wornActivationsGenerated'
import { polishItemDefinition } from '@/data/i18n/polishItemText'

/**
 * Catálogo oficial de equipamentos — Pathfinder 2e Remaster (AoN).
 *
 * Só Remaster. Pule páginas com aviso Legacy no Archives of Nethys.
 *
 * Lote atual: Player Core (armas incluindo as 12 incomuns, armaduras,
 * escudos, aventura, assistivos), GM Core (runas, cajados, varinhas, poções,
 * óleos, pergaminhos, talismãs, vestidos, segurados, ápice, materiais,
 * itens de material precioso, mágicos específicos, munição, artefatos),
 * Player Core 2 (bombas, elixires, mutagênicos, venenos, ferramentas,
 * talismãs extras, ciladas, vestidos, materiais, armaduras, escudos,
 * armas de ancestralidade, consumíveis mágicos, cajados e varinhas), Howl of the Wild (cadeiras
 * aquáticas), Treasure Vault Remastered (ajustes, runas, armaduras,
 * escudos, armas, alquímicos, consumíveis, vestidos, segurados, cajados,
 * varinhas, grimórios, corações de magia, artefatos, amaldiçoados,
 * inteligentes, relíquias, dádivas, tatuagens, assistivos e materiais
 * de osso/pedra), Impossible Magic (grimórios, corações de magia, runas,
 * armas, armaduras, escudos, cajados, consumíveis, tatuagens, vestidos,
 * ápice e segurados), Battlecry! (armaduras, escudos, armas, consumíveis,
 * estandartes, vestidos, ápice, segurados, aventura e artefatos), Guns &
 * Gears (Remastered) (engenhocas, munição, ciladas, armas-fera, miras,
 * coldres, relógios, assistivos e armas de fogo/bestas de repetição), Rage of Elements (corações de magia,
 * vestidos, armaduras, escudos, armas, cajados, runas, consumíveis,
 * incensários, figuras de proa e pedras éon), Rival Academies, Tian Xia
 * Character Guide, Dark Archives (Remastered), High Seas, Shining Kingdoms,
 * War of Immortals, Draconic Codex, Pathfinder #202: Severed at the Root,
 * Pathfinder #203 Shepherd of Decay, Pathfinder #208: Hoof, Cinder, and Storm,
 * Pathfinder #224: Bastion of Blasphemies, itens míticos das APs #217–#220,
 * armaduras e armas-base do Treasure Vault e do Battlecry!, assistivos do
 * Player Core, Hellfire Dispatches, Troubles in Grayce, Caixa Básica /
 * Secrets of the Unlit Star e itens do Monster Core.
 */
export const ITEM_DEFINITIONS: ItemDefinition[] = [
  ...PLAYER_CORE_WEAPONS,
  ...PLAYER_CORE_ARMOR,
  ...PLAYER_CORE_SHIELDS,
  ...PLAYER_CORE_GEAR,
  ...GM_CORE_RUNES,
  ...GM_CORE_STAVES,
  ...GM_CORE_WANDS,
  ...GM_CORE_POTIONS,
  ...GM_CORE_OILS,
  ...GM_CORE_SCROLLS,
  ...GM_CORE_TALISMANS,
  ...GM_CORE_APEX,
  ...GM_CORE_HELD,
  ...GM_CORE_WORN,
  ...GM_CORE_MATERIALS,
  ...TREASURE_VAULT_MATERIALS,
  ...GM_CORE_PRECIOUS,
  ...GM_CORE_SPECIFIC,
  ...GM_CORE_ARTIFACTS,
  ...GM_CORE_CONSUMABLES_EXTRA,
  ...REMASTER_ASSISTIVE,
  ...TREASURE_VAULT_ASSISTIVE,
  ...TREASURE_VAULT_TATTOOS,
  ...TREASURE_VAULT_ADJUSTMENTS,
  ...TREASURE_VAULT_RUNES,
  ...TREASURE_VAULT_ARMOR,
  ...TREASURE_VAULT_BASE_ARMOR,
  ...TREASURE_VAULT_BASE_WEAPONS,
  ...TREASURE_VAULT_SHIELDS,
  ...TREASURE_VAULT_WEAPONS,
  ...TREASURE_VAULT_ALCHEMICALS,
  ...TREASURE_VAULT_CONSUMABLES,
  ...TREASURE_VAULT_WORN,
  ...TREASURE_VAULT_HELD,
  ...TREASURE_VAULT_STAVES,
  ...TREASURE_VAULT_WANDS,
  ...TREASURE_VAULT_GRIMOIRES,
  ...TREASURE_VAULT_SPELLHEARTS,
  ...TREASURE_VAULT_ARTIFACTS,
  ...TREASURE_VAULT_CURSED,
  ...TREASURE_VAULT_INTELLIGENT,
  ...TREASURE_VAULT_RELICS,
  ...TREASURE_VAULT_BOONS,
  ...PLAYER_CORE_2_WORN,
  ...RAGE_OF_ELEMENTS_WORN,
  ...PLAYER_CORE_2_TALISMANS,
  ...PLAYER_CORE_2_ALCHEMICALS,
  ...PLAYER_CORE_2_MUTAGENS,
  ...PLAYER_CORE_2_POISONS,
  ...PLAYER_CORE_2_TOOLS,
  ...PLAYER_CORE_2_SNARES,
  ...IMPOSSIBLE_MAGIC_GRIMOIRES,
  ...REMASTER_SPELLHEARTS,
  ...IMPOSSIBLE_MAGIC_RUNES,
  ...IMPOSSIBLE_MAGIC_ARMOR,
  ...IMPOSSIBLE_MAGIC_WEAPONS,
  ...IMPOSSIBLE_MAGIC_STAVES,
  ...IMPOSSIBLE_MAGIC_CONSUMABLES,
  ...IMPOSSIBLE_MAGIC_WORN,
  ...IMPOSSIBLE_MAGIC_HELD,
  ...IMPOSSIBLE_MAGIC_SPELLHEARTS_EXTRA,
  ...BATTLECRY_ARMOR,
  ...BATTLECRY_WEAPONS,
  ...BATTLECRY_BASE_WEAPONS,
  ...BATTLECRY_CONSUMABLES,
  ...BATTLECRY_BANNERS,
  ...BATTLECRY_HELD,
  ...BATTLECRY_WORN,
  ...BATTLECRY_GEAR,
  ...GUNS_GEARS_CONSUMABLES,
  ...GUNS_GEARS_ALCHEMICALS,
  ...GUNS_GEARS_SNARES,
  ...GUNS_GEARS_WEAPONS,
  ...GUNS_GEARS_CUSTOMIZATIONS,
  ...GUNS_GEARS_GEAR,
  ...RAGE_OF_ELEMENTS_ARMOR,
  ...RAGE_OF_ELEMENTS_WEAPONS,
  ...RAGE_OF_ELEMENTS_MAGIC,
  ...RAGE_OF_ELEMENTS_CONSUMABLES,
  ...RAGE_OF_ELEMENTS_HELD,
  ...HOWL_OF_THE_WILD_GRAFTS,
  ...HOWL_OF_THE_WILD_ARMOR,
  ...HOWL_OF_THE_WILD_WEAPONS,
  ...HOWL_OF_THE_WILD_ALCHEMICALS,
  ...HOWL_OF_THE_WILD_CONSUMABLES,
  ...HOWL_OF_THE_WILD_GEAR,
  ...PLAYER_CORE_2_MATERIALS,
  ...PLAYER_CORE_2_ARMOR,
  ...PLAYER_CORE_2_CONSUMABLES,
  ...PLAYER_CORE_2_MAGIC,
  ...PLAYER_CORE_2_WEAPONS,
  ...GUNS_GEARS_BASE_WEAPONS,
  ...RIVAL_ACADEMIES_ITEMS,
  ...TIAN_XIA_ITEMS,
  ...TIAN_XIA_WEAPONS,
  ...DARK_ARCHIVES_ITEMS,
  ...HIGH_SEAS_ITEMS,
  ...SHINING_KINGDOMS_ITEMS,
  ...WAR_OF_IMMORTALS_ITEMS,
  ...WAR_OF_IMMORTALS_WEAPONS,
  ...WAR_OF_IMMORTALS_ARMOR,
  ...DRACONIC_CODEX_ITEMS,
  ...SEVERED_AT_THE_ROOT_ITEMS,
  ...SEASON_OF_GHOSTS_ITEMS,
  ...GATEWALKERS_ITEMS,
  ...NPC_CORE_ITEMS,
  ...PREY_FOR_DEATH_ITEMS,
  ...DIVINE_MYSTERIES_ITEMS,
  ...PFS_GUIDE_ITEMS,
  ...CLAWS_OF_THE_TYRANT_ITEMS,
  ...MYTHIC_AP_ITEMS,
  ...AP_201_ITEMS,
  ...AP_203_ITEMS,
  ...AP_204_ITEMS,
  ...AP_205_ITEMS,
  ...AP_206_ITEMS,
  ...AP_207_ITEMS,
  ...AP_208_ITEMS,
  ...AP_209_ITEMS,
  ...AP_210_ITEMS,
  ...AP_211_ITEMS,
  ...AP_212_ITEMS,
  ...AP_213_ITEMS,
  ...AP_214_ITEMS,
  ...AP_215_ITEMS,
  ...AP_216_ITEMS,
  ...AP_217_ITEMS,
  ...AP_218_ITEMS,
  ...AP_219_ITEMS,
  ...AP_220_ITEMS,
  ...AP_222_ITEMS,
  ...AP_223_ITEMS,
  ...AP_224_ITEMS,
  ...HELLFIRE_DISPATCHES_ITEMS,
  ...TROUBLES_IN_GRAYCE_ITEMS,
  ...BEGINNER_BOX_ITEMS,
  ...MONSTER_CORE_ITEMS,
].map((item) => polishItemDefinition(applyWornItemText(item)))

export const ITEM_DEFINITIONS_BY_ID = Object.fromEntries(
  ITEM_DEFINITIONS.map((item) => [item.id, item]),
) as Record<string, ItemDefinition>

export function listItemDefinitions(): ItemDefinition[] {
  return [...ITEM_DEFINITIONS].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export function getItemDefinition(
  id: string | null | undefined,
): ItemDefinition | null {
  if (!id) return null
  return ITEM_DEFINITIONS_BY_ID[id] ?? null
}

export function findItemByOriginalName(
  originalName: string | null | undefined,
): ItemDefinition | null {
  if (!originalName) return null
  const want = originalName.trim().toLowerCase()
  return (
    ITEM_DEFINITIONS.find((item) => item.originalName.toLowerCase() === want) ??
    null
  )
}

export function listItemDefinitionsByCategory(
  category: ItemCategory,
): ItemDefinition[] {
  return listItemDefinitions().filter((item) => item.category === category)
}

export function catalogItemCount(): number {
  return ITEM_DEFINITIONS.length
}

/** Slot da ficha a partir da categoria do AoN. */
export function slotFromCategory(category: ItemCategory): EquipmentSlot {
  switch (category) {
    case 'weapon':
      return 'weapon'
    case 'armor':
      return 'armor'
    case 'shield':
      return 'shield'
    case 'worn':
    case 'apex':
    case 'tattoo':
    case 'assistive':
      return 'worn'
    case 'held':
    case 'staff':
    case 'wand':
    case 'grimoire':
      return 'held'
    case 'consumable':
    case 'alchemical':
    case 'ammunition':
    case 'snare':
      return 'consumable'
    case 'rune':
    case 'spellheart':
    case 'material':
      return 'magic'
    default:
      return 'other'
  }
}

export const ITEM_BROWSER_TABS: Array<{
  id: ItemCategory | 'all'
  label: string
}> = [
  { id: 'all', label: 'Tudo' },
  { id: 'weapon', label: 'Armas' },
  { id: 'ammunition', label: 'Munição' },
  { id: 'armor', label: 'Armaduras' },
  { id: 'shield', label: 'Escudos' },
  { id: 'rune', label: 'Runas' },
  { id: 'staff', label: 'Cajados' },
  { id: 'wand', label: 'Varinhas' },
  { id: 'worn', label: 'Vestidos' },
  { id: 'apex', label: 'Ápice' },
  { id: 'material', label: 'Materiais' },
  { id: 'assistive', label: 'Assistivos' },
  { id: 'tattoo', label: 'Tatuagens' },
  { id: 'held', label: 'Segurados' },
  { id: 'consumable', label: 'Consumíveis' },
  { id: 'alchemical', label: 'Alquímicos' },
  { id: 'snare', label: 'Ciladas' },
  { id: 'grimoire', label: 'Grimórios' },
  { id: 'spellheart', label: 'Corações' },
  { id: 'adventuringGear', label: 'Aventura' },
  { id: 'other', label: 'Outros' },
]
