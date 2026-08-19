import type { AttributeId } from '@/types'
import type { Creature } from '@/types/creature'
import { applyCreatureLore } from './creatureLore'
import { SOURCE_MONSTER_CORE_ID } from './sources'
import { catalogCreaturesMonsterCoreBatch } from './creaturesMonsterCoreBatch'
import { catalogCreaturesMonsterCoreBatch2 } from './creaturesMonsterCoreBatch2'
import { catalogCreaturesMonsterCoreBatch3 } from './creaturesMonsterCoreBatch3'
import { catalogCreaturesMonsterCoreBatch4 } from './creaturesMonsterCoreBatch4'
import { catalogCreaturesMonsterCore2Batch } from './creaturesMonsterCore2Batch'
import { catalogCreaturesMonsterCore2Batch2 } from './creaturesMonsterCore2Batch2'
import { catalogCreaturesMonsterCore2Batch3 } from './creaturesMonsterCore2Batch3'
import { catalogCreaturesMonsterCore2Batch4 } from './creaturesMonsterCore2Batch4'
import { catalogCreaturesMonsterCore2Batch5 } from './creaturesMonsterCore2Batch5'
import { catalogCreaturesMonsterCore2Batch6 } from './creaturesMonsterCore2Batch6'
import { catalogCreaturesMonsterCore2Batch7 } from './creaturesMonsterCore2Batch7'
import { catalogCreaturesMonsterCore2Batch8 } from './creaturesMonsterCore2Batch8'
import { catalogCreaturesMonsterCore2Batch9 } from './creaturesMonsterCore2Batch9'
import { catalogCreaturesMonsterCoreBatch5 } from './creaturesMonsterCoreBatch5'
import { catalogCreaturesMonsterCoreBatch6 } from './creaturesMonsterCoreBatch6'
import { catalogCreaturesMonsterCoreBatch7 } from './creaturesMonsterCoreBatch7'
import { catalogCreaturesMonsterCoreBatch8 } from './creaturesMonsterCoreBatch8'
import { catalogCreaturesMonsterCoreBatch9 } from './creaturesMonsterCoreBatch9'
import { catalogCreaturesLostOmens } from './creaturesLostOmens'
import { catalogCreaturesBattlecry } from './creaturesBattlecry'
import { catalogCreaturesRageOfElements } from './creaturesRageOfElements'
import { catalogCreaturesHowlOfTheWild } from './creaturesHowlOfTheWild'
import { catalogCreaturesDraconicCodex } from './creaturesDraconicCodex'
import { catalogCreaturesSeasonOfGhosts } from './creaturesSeasonOfGhosts'
import { catalogCreaturesGatewalkers } from './creaturesGatewalkers'
import { catalogCreaturesSevenDooms } from './creaturesSevenDooms'
import { catalogCreaturesWardens } from './creaturesWardens'
import { catalogCreaturesCurtainCall } from './creaturesCurtainCall'
import { catalogCreaturesTriumphTusk } from './creaturesTriumphTusk'
import { catalogCreaturesSporeWar } from './creaturesSporeWar'
import { catalogCreaturesShadesOfBlood } from './creaturesShadesOfBlood'
import { catalogCreaturesMythSpeaker } from './creaturesMythSpeaker'
import { catalogCreaturesRevengeRunelords } from './creaturesRevengeRunelords'
import { catalogCreaturesHellbreakers } from './creaturesHellbreakers'
import { catalogCreaturesPreyForDeath } from './creaturesPreyForDeath'
import { catalogCreaturesClawsOfTheTyrant } from './creaturesClawsOfTheTyrant'
import { catalogCreaturesHellfireDispatches } from './creaturesHellfireDispatches'
import { catalogCreaturesTroublesInGrayce } from './creaturesTroublesInGrayce'
import { catalogCreaturesDawnOfTheFrogs } from './creaturesDawnOfTheFrogs'
import { catalogCreaturesHellsDestiny } from './creaturesHellsDestiny'
import { catalogCreaturesBastionOfBlasphemies } from './creaturesBastionOfBlasphemies'
import { catalogCreaturesNpcCore } from './creaturesNpcCore'

function attrs(
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,
): Record<AttributeId, number> {
  return { strength, dexterity, constitution, intelligence, wisdom, charisma }
}

const OFFICIAL = { type: 'official' as const }
const MONSTER_CORE = 'Monster Core'

/**
 * Fichas oficiais Remaster (Monster Core).
 * Stats conferidos no pack ORC / Archives of Nethys; textos de regra em pt-BR.
 */
export const catalogCreatures: Creature[] = applyCreatureLore([
  {
    id: 'creature-goblin-warrior',
    name: 'Guerreiro Goblin',
    originalName: 'Goblin Warrior',
    level: -1,
    rarity: 'common',
    size: 'small',
    traits: ['Goblin', 'Humanoid'],
    perception: 2,
    senses: [{ kind: 'darkvision' }],
    languages: ['Comum', 'Goblin'],
    skills: [
      { skillId: 'acrobatics', bonus: 5 },
      { skillId: 'athletics', bonus: 2 },
      { skillId: 'nature', bonus: 1 },
      { skillId: 'stealth', bonus: 5 },
    ],
    attributes: attrs(0, 3, 1, 0, -1, 1),
    items: [
      { name: 'Corta-cão', originalName: 'Dogslicer' },
      { name: 'Armadura de couro', originalName: 'Leather Armor' },
      { name: 'Arco curto (10 flechas)', originalName: 'Shortbow' },
    ],
    ac: 16,
    fortitude: 5,
    reflex: 7,
    will: 3,
    hp: 6,
    speeds: { land: 25 },
    attacks: [
      {
        id: 'goblin-warrior-dogslicer',
        name: 'Corta-cão',
        originalName: 'dogslicer',
        kind: 'melee',
        actionType: 'one',
        bonus: 7,
        map: [3, -1],
        damage: '1d6 cortante',
        traits: ['Agile', 'Backstabber', 'Finesse'],
      },
      {
        id: 'goblin-warrior-shortbow',
        name: 'Arco curto',
        originalName: 'shortbow',
        kind: 'ranged',
        actionType: 'one',
        bonus: 7,
        map: [2, -3],
        damage: '1d6 perfurante',
        traits: ['deadly d10', 'range increment 60 feet', 'reload 0'],
      },
    ],
    abilities: [
      {
        id: 'goblin-scuttle',
        name: 'Escapada Goblin',
        originalName: 'Goblin Scuttle',
        actionType: 'reaction',
        trigger:
          'Um aliado goblin termina uma ação de movimento adjacente ao guerreiro.',
        description: 'O guerreiro goblin Dá um Passo.',
      },
    ],
    summary:
      'Os combatentes da linha de frente das tribos goblins preferem lutar em grupo — sobretudo quando podem superar o inimigo em pelo menos três contra um.',
    recallKnowledge: [{ label: 'Humanoide (Sociedade)', dc: 13 }],
    sourceId: SOURCE_MONSTER_CORE_ID,
    source: MONSTER_CORE,
    sourcePage: 174,
    aonUrl: 'https://2e.aonprd.com/NPCs.aspx?ID=3024',
    provenance: OFFICIAL,
  },
  {
    id: 'creature-wolf',
    name: 'Lobo',
    originalName: 'Wolf',
    level: 1,
    rarity: 'common',
    size: 'medium',
    traits: ['Animal'],
    perception: 7,
    senses: [
      { kind: 'lowLightVision' },
      { kind: 'scent', range: 30, precise: false },
    ],
    languages: [],
    skills: [
      { skillId: 'acrobatics', bonus: 7 },
      { skillId: 'athletics', bonus: 6 },
      { skillId: 'stealth', bonus: 7 },
      { skillId: 'survival', bonus: 7 },
    ],
    attributes: attrs(2, 4, 1, -4, 2, -2),
    ac: 15,
    fortitude: 6,
    reflex: 9,
    will: 5,
    hp: 24,
    speeds: { land: 35 },
    attacks: [
      {
        id: 'wolf-jaws',
        name: 'Mandíbulas',
        originalName: 'jaws',
        kind: 'melee',
        actionType: 'one',
        bonus: 9,
        map: [4, -1],
        damage: '1d6+2 perfurante',
        traits: [],
        plus: ['Derrubar'],
      },
    ],
    abilities: [
      {
        id: 'wolf-knockdown',
        name: 'Derrubar',
        originalName: 'Knockdown',
        actionType: 'one',
        requirements:
          'A última ação da criatura foi um Golpe bem-sucedido que lista Derrubar na entrada de dano.',
        description:
          'A criatura tenta Derrubar o alvo. Esta tentativa não aplica nem conta para a penalidade de ataques múltiplos.',
      },
      {
        id: 'wolf-pack-attack',
        name: 'Ataque em Matilha',
        originalName: 'Pack Attack',
        actionType: 'passive',
        description:
          'Os Golpes do lobo causam 1d4 de dano extra a criaturas no alcance de pelo menos dois aliados do lobo.',
      },
    ],
    summary:
      'Lobos vivem e caçam em matilhas, em geral um casal, os filhotes e a ninhada anterior. Humanoides não são presa típica, mas fome, inverno ou mestres poderosos podem levá-los a atacar pessoas.',
    recallKnowledge: [{ label: 'Animal (Natureza)', dc: 15 }],
    sourceId: SOURCE_MONSTER_CORE_ID,
    source: MONSTER_CORE,
    sourcePage: 350,
    aonUrl: 'https://2e.aonprd.com/Monsters.aspx?ID=3241',
    provenance: OFFICIAL,
    familyIds: ['family-wolf'],
  },
  {
    id: 'creature-ogre-warrior',
    name: 'Guerreiro Ogro',
    originalName: 'Ogre Warrior',
    level: 3,
    rarity: 'common',
    size: 'large',
    traits: ['Giant', 'Humanoid'],
    perception: 5,
    senses: [{ kind: 'darkvision' }],
    languages: ['Jotun'],
    skills: [
      { skillId: 'athletics', bonus: 12 },
      { skillId: 'intimidation', bonus: 9 },
    ],
    attributes: attrs(5, -1, 4, -2, 0, -2),
    items: [
      { name: 'Armadura de peles', originalName: 'Hide Armor' },
      { name: 'Azagaias (6)', originalName: 'Javelin' },
      { name: 'Gancho ogro', originalName: 'Ogre Hook' },
    ],
    ac: 17,
    fortitude: 11,
    reflex: 6,
    will: 5,
    hp: 50,
    speeds: { land: 25 },
    attacks: [
      {
        id: 'ogre-warrior-hook',
        name: 'Gancho ogro',
        originalName: 'ogre hook',
        kind: 'melee',
        actionType: 'one',
        bonus: 12,
        map: [7, 2],
        damage: '1d10+7 perfurante',
        traits: ['deadly d10', 'reach 10 feet', 'Trip'],
      },
      {
        id: 'ogre-warrior-javelin',
        name: 'Azagaia',
        originalName: 'javelin',
        kind: 'ranged',
        actionType: 'one',
        bonus: 6,
        map: [1, -4],
        damage: '1d6+7 perfurante',
        traits: ['thrown 30 feet'],
      },
    ],
    abilities: [],
    summary:
      'Os ogros mais simples são blocos de músculo com olhos odientos e corpos deformados. Sempre ávidos por caos e assassinato, viram-se contra os próprios parentes quando falta gente menor para atormentar.',
    recallKnowledge: [{ label: 'Humanoide (Sociedade)', dc: 18 }],
    sourceId: SOURCE_MONSTER_CORE_ID,
    source: MONSTER_CORE,
    sourcePage: 250,
    aonUrl: 'https://2e.aonprd.com/Monsters.aspx?ID=3118',
    provenance: OFFICIAL,
    familyIds: ['family-ogre'],
  },
  ...catalogCreaturesMonsterCoreBatch,
  ...catalogCreaturesMonsterCoreBatch2,
  ...catalogCreaturesMonsterCoreBatch3,
  ...catalogCreaturesMonsterCoreBatch4,
  ...catalogCreaturesMonsterCoreBatch5,
  ...catalogCreaturesMonsterCoreBatch6,
  ...catalogCreaturesMonsterCoreBatch7,
  ...catalogCreaturesMonsterCoreBatch8,
  ...catalogCreaturesMonsterCoreBatch9,
  ...catalogCreaturesLostOmens,
  ...catalogCreaturesBattlecry,
  ...catalogCreaturesRageOfElements,
  ...catalogCreaturesHowlOfTheWild,
  ...catalogCreaturesDraconicCodex,
  ...catalogCreaturesSeasonOfGhosts,
  ...catalogCreaturesGatewalkers,
  ...catalogCreaturesSevenDooms,
  ...catalogCreaturesWardens,
  ...catalogCreaturesCurtainCall,
  ...catalogCreaturesTriumphTusk,
  ...catalogCreaturesSporeWar,
  ...catalogCreaturesShadesOfBlood,
  ...catalogCreaturesMythSpeaker,
  ...catalogCreaturesRevengeRunelords,
  ...catalogCreaturesHellbreakers,
  ...catalogCreaturesPreyForDeath,
  ...catalogCreaturesClawsOfTheTyrant,
  ...catalogCreaturesHellfireDispatches,
  ...catalogCreaturesTroublesInGrayce,
  ...catalogCreaturesDawnOfTheFrogs,
  ...catalogCreaturesHellsDestiny,
  ...catalogCreaturesBastionOfBlasphemies,
  ...catalogCreaturesNpcCore,
  ...catalogCreaturesMonsterCore2Batch,
  ...catalogCreaturesMonsterCore2Batch2,
  ...catalogCreaturesMonsterCore2Batch3,
  ...catalogCreaturesMonsterCore2Batch4,
  ...catalogCreaturesMonsterCore2Batch5,
  ...catalogCreaturesMonsterCore2Batch6,
  ...catalogCreaturesMonsterCore2Batch7,
  ...catalogCreaturesMonsterCore2Batch8,
  ...catalogCreaturesMonsterCore2Batch9,
])

export function getCatalogCreatureById(
  id: string | null | undefined,
): Creature | null {
  if (!id) return null
  return catalogCreatures.find((creature) => creature.id === id) ?? null
}
