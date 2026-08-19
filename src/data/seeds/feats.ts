/**
 * Catálogo oficial de feitos.
 * Ancestralidades, classes, arquétipos, gerais e perícia — só Remaster.
 */
import type { Feat } from '@/types/feat'
import { ancestryFeatsRemaster } from './featsAncestriesRemaster'
import { automatonFeatsRemaster } from './featsAutomatonRemaster'
import { jotunbornFeatsRemaster } from './featsJotunbornRemaster'
import { dragonetFeatsRemaster } from './featsDragonetRemaster'
import { versatileFeatsRemaster } from './featsVersatileRemaster'
import { fighterFeatsRemaster } from './featsFighterRemaster'
import { rogueFeatsRemaster } from './featsRogueRemaster'
import { barbarianFeatsRemaster } from './featsBarbarianRemaster'
import { wizardFeatsRemaster } from './featsWizardRemaster'
import { clericFeatsRemaster } from './featsClericRemaster'
import { bardFeatsRemaster } from './featsBardRemaster'
import { witchFeatsRemaster } from './featsWitchRemaster'
import { rangerFeatsRemaster } from './featsRangerRemaster'
import { druidFeatsRemaster } from './featsDruidRemaster'
import { championFeatsRemaster } from './featsChampionRemaster'
import { monkFeatsRemaster } from './featsMonkRemaster'
import { sorcererFeatsRemaster } from './featsSorcererRemaster'
import { alchemistFeatsRemaster } from './featsAlchemistRemaster'
import { oracleFeatsRemaster } from './featsOracleRemaster'
import { summonerFeatsRemaster } from './featsSummonerRemaster'
import { psychicFeatsRemaster } from './featsPsychicRemaster'
import { thaumaturgeFeatsRemaster } from './featsThaumaturgeRemaster'
import { swashbucklerFeatsRemaster } from './featsSwashbucklerRemaster'
import { investigatorFeatsRemaster } from './featsInvestigatorRemaster'
import { kineticistFeatsRemaster } from './featsKineticistRemaster'
import { gunslingerFeatsRemaster } from './featsGunslingerRemaster'
import { inventorFeatsRemaster } from './featsInventorRemaster'
import { commanderFeatsRemaster } from './featsCommanderRemaster'
import { guardianFeatsRemaster } from './featsGuardianRemaster'
import { animistFeatsRemaster } from './featsAnimistRemaster'
import { exemplarFeatsRemaster } from './featsExemplarRemaster'
import { necromancerFeatsRemaster } from './featsNecromancerRemaster'
import { runesmithFeatsRemaster } from './featsRunesmithRemaster'
import { magusFeatsRemaster } from './featsMagusRemaster'
import { archetypeFeatsMulticlassRemaster } from './featsArchetypesMulticlassRemaster'
import { archetypeFeatsMulticlassRemaster2 } from './featsArchetypesMulticlassRemaster2'
import { archetypeFeatsMulticlassRemaster3 } from './featsArchetypesMulticlassRemaster3'
import { archetypeFeatsOtherRemaster } from './featsArchetypesOtherRemaster'
import { archetypeFeatsGeneralRemaster } from './featsArchetypesGeneralRemaster'
import { archetypeFeatsGeneralRemasterMore } from './featsArchetypesGeneralRemasterMore'
import { archetypeFeatsGeneralRemaster3 } from './featsArchetypesGeneralRemaster3'
import { archetypeFeatsGeneralRemaster4 } from './featsArchetypesGeneralRemaster4'
import { archetypeFeatsGeneralRemaster5 } from './featsArchetypesGeneralRemaster5'
import { archetypeFeatsGeneralRemaster6 } from './featsArchetypesGeneralRemaster6'
import { archetypeFeatsGeneralRemaster7 } from './featsArchetypesGeneralRemaster7'
import { archetypeFeatsGeneralRemaster8 } from './featsArchetypesGeneralRemaster8'
import { archetypeFeatsGeneralRemaster9 } from './featsArchetypesGeneralRemaster9'
import { archetypeFeatsGeneralRemaster10 } from './featsArchetypesGeneralRemaster10'
import { archetypeFeatsGeneralRemaster11 } from './featsArchetypesGeneralRemaster11'
import { archetypeFeatsGeneralRemaster12 } from './featsArchetypesGeneralRemaster12'
import { archetypeFeatsGeneralRemaster13 } from './featsArchetypesGeneralRemaster13'
import { archetypeFeatsGeneralRemaster14 } from './featsArchetypesGeneralRemaster14'
import { archetypeFeatsGeneralRemaster15 } from './featsArchetypesGeneralRemaster15'
import { archetypeFeatsGeneralRemaster16 } from './featsArchetypesGeneralRemaster16'
import { archetypeFeatsGeneralRemaster17 } from './featsArchetypesGeneralRemaster17'
import { archetypeFeatsGeneralRemaster18 } from './featsArchetypesGeneralRemaster18'
import { archetypeFeatsGeneralRemaster19 } from './featsArchetypesGeneralRemaster19'
import { archetypeFeatsGeneralRemaster20 } from './featsArchetypesGeneralRemaster20'
import { archetypeFeatsGeneralRemaster21 } from './featsArchetypesGeneralRemaster21'
import { archetypeFeatsGeneralRemaster22 } from './featsArchetypesGeneralRemaster22'
import { archetypeFeatsGeneralRemaster23 } from './featsArchetypesGeneralRemaster23'
import { archetypeFeatsGeneralRemaster24 } from './featsArchetypesGeneralRemaster24'
import { archetypeFeatsGeneralRemaster25 } from './featsArchetypesGeneralRemaster25'
import { archetypeFeatsGeneralRemaster26 } from './featsArchetypesGeneralRemaster26'
import { archetypeFeatsGeneralRemaster27 } from './featsArchetypesGeneralRemaster27'
import { archetypeFeatsMythicRemaster } from './featsArchetypesMythicRemaster'
import { archetypeFeatsMythicRemaster2 } from './featsArchetypesMythicRemaster2'
import { archetypeFeatsMythicRemaster3 } from './featsArchetypesMythicRemaster3'
import { archetypeFeatsMythicRemaster4 } from './featsArchetypesMythicRemaster4'
import { archetypeFeatsMythicRemaster5 } from './featsArchetypesMythicRemaster5'
import { generalAndSkillFeatsRemaster } from './featsGeneralSkillRemaster'
import { mythicGeneralFeatsRemaster } from './featsMythicGeneralRemaster'
import { featsSeveredAtTheRoot } from './featsSeveredAtTheRoot'
import { featsStageFright } from './featsStageFright'
import { featsWhispersDirt } from './featsWhispersDirt'
import { featsAcropolisPyre, featsGatewalkersDeviant } from './featsAcropolisGatewalkers'

export const officialFeats: Feat[] = [
  ...ancestryFeatsRemaster,
  ...automatonFeatsRemaster,
  ...jotunbornFeatsRemaster,
  ...dragonetFeatsRemaster,
  ...versatileFeatsRemaster,
  ...fighterFeatsRemaster,
  ...rogueFeatsRemaster,
  ...barbarianFeatsRemaster,
  ...wizardFeatsRemaster,
  ...clericFeatsRemaster,
  ...bardFeatsRemaster,
  ...witchFeatsRemaster,
  ...rangerFeatsRemaster,
  ...druidFeatsRemaster,
  ...championFeatsRemaster,
  ...monkFeatsRemaster,
  ...sorcererFeatsRemaster,
  ...alchemistFeatsRemaster,
  ...oracleFeatsRemaster,
  ...summonerFeatsRemaster,
  ...psychicFeatsRemaster,
  ...thaumaturgeFeatsRemaster,
  ...swashbucklerFeatsRemaster,
  ...investigatorFeatsRemaster,
  ...kineticistFeatsRemaster,
  ...gunslingerFeatsRemaster,
  ...inventorFeatsRemaster,
  ...commanderFeatsRemaster,
  ...guardianFeatsRemaster,
  ...animistFeatsRemaster,
  ...exemplarFeatsRemaster,
  ...necromancerFeatsRemaster,
  ...runesmithFeatsRemaster,
  ...magusFeatsRemaster,
  ...archetypeFeatsMulticlassRemaster,
  ...archetypeFeatsMulticlassRemaster2,
  ...archetypeFeatsMulticlassRemaster3,
  ...archetypeFeatsOtherRemaster,
  ...archetypeFeatsGeneralRemaster,
  ...archetypeFeatsGeneralRemasterMore,
  ...archetypeFeatsGeneralRemaster3,
  ...archetypeFeatsGeneralRemaster4,
  ...archetypeFeatsGeneralRemaster5,
  ...archetypeFeatsGeneralRemaster6,
  ...archetypeFeatsGeneralRemaster7,
  ...archetypeFeatsGeneralRemaster8,
  ...archetypeFeatsGeneralRemaster9,
  ...archetypeFeatsGeneralRemaster10,
  ...archetypeFeatsGeneralRemaster11,
  ...archetypeFeatsGeneralRemaster12,
  ...archetypeFeatsGeneralRemaster13,
  ...archetypeFeatsGeneralRemaster14,
  ...archetypeFeatsGeneralRemaster15,
  ...archetypeFeatsGeneralRemaster16,
  ...archetypeFeatsGeneralRemaster17,
  ...archetypeFeatsGeneralRemaster18,
  ...archetypeFeatsGeneralRemaster19,
  ...archetypeFeatsGeneralRemaster20,
  ...archetypeFeatsGeneralRemaster21,
  ...archetypeFeatsGeneralRemaster22,
  ...archetypeFeatsGeneralRemaster23,
  ...archetypeFeatsGeneralRemaster24,
  ...archetypeFeatsGeneralRemaster25,
  ...archetypeFeatsGeneralRemaster26,
  ...archetypeFeatsGeneralRemaster27,
  ...archetypeFeatsMythicRemaster,
  ...archetypeFeatsMythicRemaster2,
  ...archetypeFeatsMythicRemaster3,
  ...archetypeFeatsMythicRemaster4,
  ...archetypeFeatsMythicRemaster5,
  ...generalAndSkillFeatsRemaster,
  ...mythicGeneralFeatsRemaster,
  ...featsSeveredAtTheRoot,
  ...featsStageFright,
  ...featsWhispersDirt,
  ...featsAcropolisPyre,
  ...featsGatewalkersDeviant,
]
