/** Autômato — Guns & Gears (Remastered) + Impossible Magic. Gerado do AoN. */
import type { Feat } from '@/types/feat'
import { SOURCE_GUNS_GEARS_ID, SOURCE_IMPOSSIBLE_MAGIC_ID } from './sources'
import {
  ANCESTRY_AUTOMATON_ID,
  HERITAGE_DEFENSIVE_AUTOMATON_ID,
  HERITAGE_HUNTER_AUTOMATON_ID,
  HERITAGE_MAGE_AUTOMATON_ID,
  HERITAGE_NEWLY_MINTED_AUTOMATON_ID,
  HERITAGE_SHARPSHOOTER_AUTOMATON_ID,
  HERITAGE_WARRIOR_AUTOMATON_ID,
} from './ancestriesAutomaton'

export const automatonFeatsRemaster: Feat[] = [
  {
    id: 'feat-automaton-automaton-armament',
    name: "Armamento de Autômato",
    originalName: "Automaton Armament",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You've been provided a body part designed for combat. You gain either a claw or pincer unarmed attack. The claw deals 1d4 slashing damage, is in the brawling group, and has the agile, finesse, and unarmed traits. The pincer deals 1d6 piercing damage, is in the brawling group, and has the grapple and unarmed traits.

 Your body can be reconfigured; you can select this feat at any level, and you can retrain into or out of this feat or change the type of attack you gain.

**Enhancement** Your attacking part is reinforced. Increase the damage die of the unarmed attack you gain from this feat by one step (from 1d4 to 1d6, or from 1d6 to 1d8).`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3090",
  },
  {
    id: 'feat-automaton-arcane-communication',
    name: "Comunicação Arcana",
    originalName: "Arcane Communication",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You can deliver silent messages. You gain touch telepathy, allowing you to communicate silently and mentally with any creature you're touching, as long as you share a language.

**Enhancement** You can send your messages even further. Your telepathy gains a range of 10 feet, but you still have to share a language with your target.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3091",
  },
  {
    id: 'feat-automaton-arcane-eye',
    name: "Olho Arcano",
    originalName: "Arcane Eye",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your eye has been magically enhanced to pierce darkness. You gain darkvision.

**Enhancement** Your eye can see invisible creatures in brief spurts. You can cast _see invisibility_ as an arcane innate spell once per hour.`,
    prerequisites: [{ kind: 'text', label: "low-light vision" }],
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3092",
  },
  {
    id: 'feat-automaton-automaton-lore',
    name: "Conhecimento de Autômato",
    originalName: "Automaton Lore",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You have come to better understand the process that made your body and the magic that powers it. You gain the trained proficiency rank in Arcana and Crafting. If you would automatically become trained in one of those skills (from your background or class, for example), you instead become trained in a skill of your choice. You also gain the Additional Lore feat for Automaton Lore.

**Enhancement** Increase your proficiency rank in your choice of either Arcana or Crafting to expert.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3093",
  },
  {
    id: 'feat-automaton-energy-beam',
    name: "Raio de Energia",
    originalName: "Energy Beam",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You can channel your core's power through the magical gem that serves as your eye. You gain an energy beam ranged unarmed attack that deals 1d4 fire damage. The energy beam has a range increment of 20 feet. On a critical hit, the target takes persistent fire damage equal to the number of weapon damage dice. Your eye beam does not add critical specialization effects.

**Enhancement** You channel greater power. Increase the damage die of your energy beam by one step, from 1d4 to 1d6.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3094",
  },
  {
    id: 'feat-automaton-reinforced-chassis',
    name: "Chassi Reforçado",
    originalName: "Reinforced Chassis",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your body is designed to be particularly resilient. Your chassis is made from reinforced armor plating that grants a +3 item bonus to AC with a Dexterity cap of +1. If you are at least 5th level, the item bonus increases to +4 and at 10th level it increases to +5. You can never wear other armor or remove your chassis; however, you still don’t become fatigued from sleeping. Finally, you can etch armor runes onto your chassis. Your chassis is medium armor in the plate group for abilities and for etching runes.

**Enhancement** Your chassis becomes difficult to overcome. You gain the Chassis Deflection reaction.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3095",
  },
  {
    id: 'feat-automaton-arcane-safeguards',
    name: "Salvaguardas Arcanas",
    originalName: "Arcane Safeguards",
    level: 5,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `The magic powering you makes it difficult for outside magic to affect you. You gain the Resist Magic reaction.

**Enhancement** Your safeguards improve. When you Resist Magic, you gain a number of temporary Hit Points equal to the spell level of the triggering effect.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3096",
  },
  {
    id: 'feat-automaton-integrated-armament',
    name: "Armamento Integrado",
    originalName: "Integrated Armament",
    level: 5,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your mechanical body houses a weapon or shield that you can quickly draw and stow, leaving you prepared for combat at all times.

 You can use a 1-minute activity, which has the manipulate trait, to integrate a single, one-handed weapon or shield into one of your arms. You can draw or stow this item as an Interact action. Creatures don't automatically see this integrated item when it's stowed and must actively Seek in order to find it. They take a –2 circumstance penalty to any checks to do so. While you are wielding the item, it can't be Disarmed and you can't drop or Release it; you must Interact to store the weapon and free that hand. A creature determined to retrieve the item can do so, but it requires either 1 minute to remove it or extreme violence to your arm—such as physically removing portions of the limb. You can only have one integrated armament at a time, though you can use the 1-minute activity to replace the item or swap the arm in which it's stored.

**Enhancement** Your body has more space for integration. You can now either integrate two one-handed weapons, a one-handed weapon and a shield, or a single two-handed weapon which is split across both arms. You can use a single Interact action to draw or store both integrated armaments. When you draw a single weapon, you can choose to hold it with either one hand or both hands.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3097",
  },
  {
    id: 'feat-automaton-magical-resistance',
    name: "Resistência Mágica",
    originalName: "Magical Resistance",
    level: 5,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your animating magic provides some defense. Choose one of the following energy damage types: cold, electricity, or sonic. You gain resistance 5 to that damage type.

**Enhancement** You tap deeper into your animating magic, and your resistances improve. Choose one of the following benefits: you gain resistance 5 to the remaining two damage types from the above list, or your chosen resistance increases to a value equal to 1 + half your level.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3098",
  },
  {
    id: 'feat-automaton-arcane-camouflage',
    name: "Camuflagem Arcana",
    originalName: "Arcane Camouflage",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    heritageId: HERITAGE_HUNTER_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You have developed magical techniques to aid you with stalking your prey. You can cast _blur_ and _invisibility_ each once per day as 2nd-level arcane innate spells.

**Enhancement** Your camouflage is more potent. Your _blur_ spell now lasts 10 minutes and when you cast _invisibility_, you can choose to gain the effects of the 4th-level version of the spell. In addition, you can now cast _blur_ and _invisibility_ each twice per day.`,
    prerequisites: [{ kind: 'text', label: "Hunter Automaton heritage" }],
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3099",
  },
  {
    id: 'feat-automaton-arcane-propulsion',
    name: "Propulsão Arcana",
    originalName: "Arcane Propulsion",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato","Arcane"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You redirect energy from your core to ports on your back or feet, allowing you to fly for a short time. You can maintain this redirected energy for 5 minutes. You gain a fly Speed equal to your Speed while redirecting the energy.

**Enhancement** You can maintain your flight for longer. You can redirect your energy at all times, allowing you to fly whenever you want, rather than just once per day for 5 minutes.`,
    actionType: 'two',
    frequency: "once per day",
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3100",
  },
  {
    id: 'feat-automaton-arcane-slam',
    name: "Pancada Arcana",
    originalName: "Arcane Slam",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    heritageId: HERITAGE_WARRIOR_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You channel magical power from your core into your arm, empowering your attack as you attempt to slam your foe into the ground. Attempt an Athletics check against the foe's Fortitude DC. You take a –2 circumstance penalty to your check if the target is one size larger than you and a –4 circumstance penalty if it's larger than that. You gain a +2 circumstance bonus to your check if the target is one size smaller than you and a +4 circumstance bonus if it's smaller than that.

**Critical Success** You slam the foe down and the magical energy overwhelms it. The creature is knocked prone, becomes dazzled for 1 round, and takes damage equal to 2d6 plus your Strength modifier. The foe is no longer grabbed or restrained by you.
**Success** You slam the foe down. The creature is knocked prone and takes damage equal to your Strength modifier. The foe is no longer grabbed or restrained by you.
**Failure** You are unable to slam the creature, but your hold on the creature remains.
**Critical Failure** The creature breaks free and is no longer grabbed or restrained by you.

**Enhancement** Your arms better channel your core's power. You no longer take penalties for attempting to slam larger foes. Your foe takes damage equal to 2d6 plus your Strength modifier on a success (or double that on a critical success).`,
    prerequisites: [{ kind: 'text', label: "Warrior Automaton heritage" }],
    actionType: 'two',
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3101",
  },
  {
    id: 'feat-automaton-core-attunement',
    name: "Sintonização do Núcleo",
    originalName: "Core Attunement",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    heritageId: HERITAGE_MAGE_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your core allows you to draw more power from it. Select one 1st-rank arcane spell and one 2nd-rank or lower arcane spell, to which you have access. You can cast your chosen spells as arcane innate spells each once per day.

**Enhancement** Your attunement grows stronger. Select one 5th-level or lower arcane spell and one 6th-level or lower arcane spell, to which you have access. You can cast them as arcane innate spells each once per day, in addition to the original spells.`,
    prerequisites: [{ kind: 'text', label: "Mage Automaton heritage" }],
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3102",
  },
  {
    id: 'feat-automaton-lesser-augmentation',
    name: "Aumento Menor",
    originalName: "Lesser Augmentation",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You've focused on enhancing yourself and have received an improvement to one of your existing abilities. You gain the enhancement benefits of one of your 1st- or 5th-level automaton ancestry feats.

 You are also capable of reconfiguring your augmentations to meet your needs. You can spend one week of downtime to change the enhancement you gain with this feat.

**Enhancement** You gain the enhancement benefits of another 1st- or 5th-level automaton ancestry feat. Also, your reconfigurations take less time. You only need to spend 1 day of downtime to change any of your enhancements. If you have multiple enhancements, changing each one requires a separate day.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3103",
  },
  {
    id: 'feat-automaton-rain-of-bolts',
    name: "Chuva de Dardos",
    originalName: "Rain of Bolts",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    heritageId: HERITAGE_SHARPSHOOTER_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Throughout the day, your body produces powerful projectiles within your chassis. You fire them all at once in either a 30-foot cone or a 10-foot emanation. Foes in the area take 6d6 piercing damage with a basic Reflex save against the higher of your class DC or spell DC. This increases to 7d6 at 12th level, 8d6 at 15th level, and 9d6 at 18th level.

**Enhancement** The projectiles regenerate quicker, they are much more powerful, and you can refine the metallic content to harm certain creatures. You can use Rain of Bolts once per hour instead of once per day. The damage increases to 12d6 and each time you use the action, you can choose adamantine, cold iron, or silver. The damage from Rain of Bolts is treated as the metal you chose. At 20th level, the damage increases to 13d6.`,
    prerequisites: [{ kind: 'text', label: "Sharpshooter Automaton heritage" }],
    actionType: 'two',
    frequency: "once per day",
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3104",
  },
  {
    id: 'feat-automaton-arcane-locomotion',
    name: "Locomoção Arcana",
    originalName: "Arcane Locomotion",
    level: 13,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You've modified your body to allow you to augment your movement. You gain either a climb Speed of 20 feet or a swim Speed of 20 feet, your choice.

**Enhancement** Your body allows for even further forms of movement. You can either select the option from this feat you haven't chosen yet (climb Speed or swim Speed), or you can increase your land Speed by 5 feet and increase the Speed you chose from this feat increase to be equal to your adjusted land Speed.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3105",
  },
  {
    id: 'feat-automaton-astral-blink',
    name: "Lampejo Astral",
    originalName: "Astral Blink",
    level: 13,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You've attuned your core to allow you to phase in and out of the Astral Plane, allowing you to teleport periodically. You can cast _dimension door_ once per hour as a 4th-level innate arcane spell.

**Enhancement** Your attunement allows you to teleport in a series of quick jumps rather than in one big leap. You can expend your hourly use of _dimension door_ as a free action when you begin your turn. If you do, your Strides are augmented until the end of your turn, allowing you to instantly teleport to any point you could reach with your Speed instead of traversing normally to the location. While augmented, your Strides gain the conjuration and teleportation traits. Your augmented Strides don't trigger reactions that can be triggered by move actions or upon leaving or entering a square, unless those reactions trigger on teleportation.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3106",
  },
  {
    id: 'feat-automaton-core-rejuvenation',
    name: "Rejuvenescimento do Núcleo",
    originalName: "Core Rejuvenation",
    level: 13,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your soul taps into your core's power to push against the grasp of death and allow you to recover consciousness. You're restored to 1 Hit Point, lose the dying and unconscious conditions, and can act normally on this turn. You gain or increase the wounded condition as normal when losing the dying condition in this way.

**Enhancement** Your soul can draw even more power from your core, granting you additional benefits. When you use Core Rejuvenation, you also gain a number of temporary Hit Points equal to three times your level. These Hit Points remain for 1 minute.`,
    actionType: 'free',
    trigger: "You have the dying condition and are about to attempt a recovery check.",
    frequency: "once per day",
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3107",
  },
  {
    id: 'feat-automaton-enlarged-chassis',
    name: "Chassi Ampliado",
    originalName: "Enlarged Chassis",
    level: 13,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You've empowered your core to support a larger body, granting you size and additional reach. You gain the effects of _enlarge_ constantly.

**Enhancement** Your core's empowerment has stabilized, allowing for greater support. You are no longer clumsy due to the effects of _enlarge_.`,
    prerequisites: [{ kind: 'text', label: "Medium or Small size" }],
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3108",
  },
  {
    id: 'feat-automaton-axial-recall',
    name: "Recolhimento Axial",
    originalName: "Axial Recall",
    level: 17,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato","Uncommon"],
    rarity: "uncommon",
    provenance: { type: 'official' },
    description: `You have reconfigured the magical resonance of your core to attune to the planar energies of Axis. You can cast _interplanar teleport_ twice per week as an arcane innate spell that can only target yourself; you can travel only to Axis or the Universe, and your body serves as the focus component.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3109",
  },
  {
    id: 'feat-automaton-core-cannon',
    name: "Canhão do Núcleo",
    originalName: "Core Cannon",
    level: 17,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato","Arcane","Concentrate","Polymorph","Transmutation"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your body transforms into a powerful magical cannon. While immobile as a cannon, you can fire blasts of energy directly from your core, devastating your foes. You become immobilized until you use an Interact action to revert back to your standard form. While in your cannon form, the only actions you can use are to Strike with an energy blast unarmed attack or to Interact to revert back to your standard form. You can remain in your cannon form for up to 1 minute or until you take the action to revert back to your standard form, whichever comes first.

 Energy blasts are a special ranged unarmed attack. You can only make energy blast Strikes while you're in your cannon form. Your energy blasts deal 3d8 fire damage and 3d6 force damage, which increases to 4d8 fire damage and 3d6 force damage at level 20. You gain the item bonus to attack rolls with your energy blasts from the highest _potency_ rune on any _handwraps of mighty blows_ you are wearing or any weapon you are wielding, but striking and property runes have no effect on your energy blasts. Energy blasts have a range increment of 120 feet. On a critical hit with an energy blast, the target takes 10 persistent fire damage. Your energy blast doesn't add critical specialization effects. If it matters for an effect dependent on weapon damage dice, an energy blast's number of weapon damage dice is three, or four at level 20.`,
    actionType: 'two',
    frequency: "once per day",
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3110",
  },
  {
    id: 'feat-automaton-greater-augmentation',
    name: "Aumento Maior",
    originalName: "Greater Augmentation",
    level: 17,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You've greatly improved your abilities and your core can support further augmentations. You gain the enhancement benefits of one of your 1st-, 5th-, 9th-, or 13th-level automaton ancestry feats.

 You are also capable of reconfiguring your augmentations to meet your needs. You can spend one week of downtime to change the enhancement you gain with this feat.`,
    sourceId: SOURCE_GUNS_GEARS_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=3111",
  },
  {
    id: 'feat-automaton-expressive-face',
    name: "Rosto Expressivo",
    originalName: "Expressive Face",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your face is constructed to move organically and show your emotions, making you more relatable to organic creatures. You become trained in Diplomacy. If you are already trained in Diplomacy, you instead become trained in a skill of your choice. Additionally, you gain the Glad-Hand skill feat, even if you do not meet its prerequisites.

**Enhancement** You are particularly skilled at pouring your heart out to others. You gain the Plaintive Plea action.

**Plaintive Plea**  (fortune) **Frequency** once per day; **Effect** You make an emotional appeal to convince someone during a diplomatic encounter. If your next activity is to attempt a Diplomacy check to Make an Impression or Request, or to attempt to influence a creature during an influence encounter, you can roll twice and take the better result.`,
    frequency: "once per day; **Effect** You make an emotional appeal to convince someone during a diplomatic encounter. If your next activity is to attempt a Diplomacy check to Make an Impression or Request, or to attempt to influence a creature during an influence encounter, you can roll twice and take the better result.",
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9396",
  },
  {
    id: 'feat-automaton-messenger',
    name: "Mensageiro",
    originalName: "Messenger",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You were built with a special ability to relay private messages to your fellow automatons, but you can luckily use it with anyone you would like. You gain _message_ as an innate arcane cantrip.

**Enhancement** You can target up to five creatures at once when you cast _message_.`,
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9397",
  },
  {
    id: 'feat-automaton-powerful-tail',
    name: "Cauda Poderosa",
    originalName: "Powerful Tail",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You resemble an animal or a type of humanoid who has a tail. You gain a tail unarmed attack that deals 1d6 bludgeoning damage. This tail is in the brawling group.

**Enhancement** Your tail is not only powerful but also flexible. You gain a climb Speed of 10 feet, and you reduce the number of free hands required to Climb or Trip by one.`,
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9398",
  },
  {
    id: 'feat-automaton-undead-hunter',
    name: "Caçador de Mortos-vivos",
    originalName: "Undead Hunter",
    level: 1,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    heritageId: HERITAGE_NEWLY_MINTED_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You were created by a Nexian mage specifically for the purpose of fighting undead, and you are infused with vitality magic. You gain _vitality lash_ as an innate divine cantrip.

**Enhancement** You can infuse your attacks with vitality. You can cast _infuse vitality_ as a 3rd-rank arcane innate spell once per day, targeting only yourself.`,
    prerequisites: [{ kind: 'text', label: "newly minted automaton heritage" }],
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9399",
  },
  {
    id: 'feat-automaton-hardened-chassis',
    name: "Chassi Endurecido",
    originalName: "Hardened Chassis",
    level: 5,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Your exterior is so tough that only the strongest of weapons can fully damage it. Choose one type of damage among bludgeoning, piercing, or slashing damage. You gain resistance 3 to that type of damage. This resistance does not apply if the weapon or attack is adamantine.

**Enhancement** Your chassis gets even tougher. Choose one of the following benefits: you gain resistance 3 to all physical damage, or your chosen resistance increases to a value equal to half your level (minimum 3). This resistance is still bypassed by adamantine.`,
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9400",
  },
  {
    id: 'feat-automaton-infiltration-automation',
    name: "Autômato de Infiltração",
    originalName: "Infiltration Automation",
    level: 5,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You have quiet, well-oiled joints, and you move around as silently as a shadow, though you sometimes use a magical boost. You gain a +2 circumstance bonus to Stealth checks against hearing-based Perception checks. You can cast _silence_ once per day on yourself as a 2nd-rank arcane innate spell.

**Enhancement** You can cast _silence_ twice per day on yourself, and you can choose whether to cast it as a 2nd- or 4th-rank spell.`,
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9401",
  },
  {
    id: 'feat-automaton-inscribed-blast',
    name: "Rajada Inscrita",
    originalName: "Inscribed Blast",
    level: 5,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato","Concentrate"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `Some of the patterning on your exterior covering is not just decorative but is instead a set of runes. The triggering creature or object takes 2d4 force damage and your inscribed runes fade. You re-inscribe your runes each day during your daily preparations.

At 10th level and every 5 levels thereafter, the damage increases by 1d4.

**Enhancement** You can re-inscribe your runes with 10 minutes of work as an exploration activity.`,
    actionType: 'reaction',
    trigger: "A creature or object adjacent to you damages you.",
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9402",
  },
  {
    id: 'feat-automaton-resilient-chassis',
    name: "Chassi Resiliente",
    originalName: "Resilient Chassis",
    level: 5,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    heritageId: HERITAGE_DEFENSIVE_AUTOMATON_ID,
    traits: ["Autômato","Concentrate"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You are tough enough to draw on your own internal stores of energy when you get injured. You gain 4 temporary Hit Points that last for 1 round.

At 8th level and every 4 levels thereafter, the temporary Hit Points increase by 4.

**Enhancement** Resilient Chassis’s frequency becomes once per 10 minutes.`,
    prerequisites: [{ kind: 'text', label: "defensive automaton heritage" }],
    actionType: 'reaction',
    trigger: "You would take damage.",
    frequency: "once per day",
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9403",
  },
  {
    id: 'feat-automaton-bodily-disintegration',
    name: "Desintegração Corporal",
    originalName: "Bodily Disintegration",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato","Concentrate","Manipulate"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You have such complete control of your component atoms that you can momentarily separate them far enough apart for you to pass through solid material. You focus on your physical body and will the parts of it to disassemble momentarily. You Stride. You can pass through creatures and tiny cracks during this movement. You cannot pass through solid walls or magical boundaries such as a _wall of force_. If you haven’t completely passed through a creature or object by the end of your movement, you take 4d6 bludgeoning damage and are shunted to the nearest spot that you can occupy.

**Enhancement** When you use Bodily Disintegration, you can move through solid walls and delay fully reassembling your body, causing you to become concealed until the start of your next turn.`,
    actionType: 'two',
    frequency: "once per hour",
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9404",
  },
  {
    id: 'feat-automaton-overburn',
    name: "Sobrecarga",
    originalName: "Overburn",
    level: 9,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You engage your core, giving yourself more energy and speed for a fight. You gain _haste_ as an innate arcane 3rd-rank spell that you can cast once per day. You can target only yourself with this spell.

**Enhancement** You instead can cast _haste_ as a 7th-rank innate arcane spell once per day. You must be one of the targets of the spell.`,
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9405",
  },
  {
    id: 'feat-automaton-purge-system',
    name: "Purgar Sistema",
    originalName: "Purge System",
    level: 13,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `You can sense the influence of harmful toxins in your body, and you heat and cool various parts of your body to expel them. Choose one poison that is affecting you. Reduce the stage of that poison by one.

**Enhancement** When you use Purge System, you instead reduce the stage of the poison by two.`,
    actionType: 'three',
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9406",
  },
  {
    id: 'feat-automaton-system-override',
    name: "Sobrepor Sistema",
    originalName: "System Override",
    level: 17,
    category: 'ancestry',
    ancestryId: ANCESTRY_AUTOMATON_ID,
    traits: ["Autômato"],
    rarity: "common",
    provenance: { type: 'official' },
    description: `When someone takes control of your consciousness or your body, you innately resist their domination with everything you have. At the beginning of your turn, if you have the controlled condition, you must attempt a DC 11 flat check. On a success, you ignore the controlled condition for 1 round.`,
    sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
    aonUrl: "https://2e.aonprd.com/Feats.aspx?ID=9407",
  },
]
