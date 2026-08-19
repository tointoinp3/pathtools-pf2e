import type {
  CharacterClass,
  ClassSpellPick,
  GrantedClassSpell,
  SkillId,
} from '@/types'
import { CLASS_BARD_ID, CLASS_CHAMPION_ID, CLASS_WITCH_ID } from './ids'

function rankLevel(rank: number): number {
  if (rank <= 1) return 1
  return rank * 2 - 1
}

function focus(
  originalName: string,
  sourceLabel: string,
  minLevel = 1,
): GrantedClassSpell {
  return { originalName, slot: 'focus', sourceLabel, minLevel }
}

function cantrip(
  originalName: string,
  sourceLabel: string,
  minLevel = 1,
): GrantedClassSpell {
  return { originalName, slot: 'cantrip', sourceLabel, minLevel }
}

function known(
  originalName: string,
  rank: number,
  sourceLabel: string,
  minLevel?: number,
): GrantedClassSpell {
  return {
    originalName,
    slot: rank === 0 ? 'cantrip' : 'collection',
    sourceLabel,
    minLevel: minLevel ?? rankLevel(rank),
  }
}

function list(
  sourceLabel: string,
  entries: Array<[string, number]>,
): GrantedClassSpell[] {
  return entries.map(([name, rank]) => known(name, rank, sourceLabel))
}

function whenPick(
  choiceId: string,
  optionId: string,
  originalName: string,
  rank: number,
  sourceLabel: string,
): GrantedClassSpell {
  return {
    ...known(originalName, rank, sourceLabel),
    whenPick: { choiceId, optionId },
  }
}

function whenSkill(
  skill: SkillId,
  originalName: string,
  rank: number,
  sourceLabel: string,
): GrantedClassSpell {
  return { ...known(originalName, rank, sourceLabel), whenSkill: skill }
}

interface GrantBundle {
  grantedSpells?: GrantedClassSpell[]
  spellPicks?: ClassSpellPick[]
}

const CURRICULO = 'Currículo'
const LINHAGEM = 'Linhagem'
const MUSA = 'Musa'
const ORDEM = 'Ordem'
const MISTERIO = 'Mistério'
const MENTE = 'Mente consciente'
const CONFLUXO = 'Confluxo'
const ESTUDO = 'Magia estudiosa'
const LICAO = 'Lição'
const HEX = 'Truque hex'
const COMPOSICAO = 'Composição'

const BY_CLASS: Record<string, GrantBundle> = {
  [CLASS_BARD_ID]: {
    grantedSpells: [
      focus('Counter Performance', COMPOSICAO),
      cantrip('Courageous Anthem', COMPOSICAO),
    ],
  },
  [CLASS_WITCH_ID]: {
    grantedSpells: [
      {
        choiceId: 'witch-familiar-hex',
        pickOneOriginalNames: ["Patron's Puppet", 'Phase Familiar'],
        slot: 'focus',
        sourceLabel: 'Hex do familiar',
      },
    ],
  },
  [CLASS_CHAMPION_ID]: {
    grantedSpells: [
      {
        choiceId: 'champion-devotion-focus',
        pickOneOriginalNames: [
          'Shields of the Spirit',
          'Lay on Hands',
          'Touch of the Void',
        ],
        slot: 'focus',
        sourceLabel: 'Magia de devoção',
      },
    ],
  },
}

const BY_OPTION: Record<string, GrantBundle> = {
  'school-ars-grammatica': {
    grantedSpells: [
      focus('Protective Wards', 'Escola'),
      ...list(CURRICULO, [
        ['Message', 0], ['Sigil', 0],
        ['Command', 1], ['Disguise Magic', 1], ['Runic Body', 1], ['Runic Weapon', 1],
        ['Dispel Magic', 2], ['Translate', 2],
        ['Enthrall', 3], ['Veil of Privacy', 3],
        ['Dispelling Globe', 4], ['Suggestion', 4],
        ['Sending', 5], ['Truespeech', 5],
        ['Repulsion', 6], ['Spellwrack', 6],
        ['Contingency', 7], ['Planar Seal', 7],
        ['Quandary', 8], ['Unrelenting Observation', 8],
        ['Detonate Magic', 9],
      ]),
    ],
  },
  'school-battle-magic': {
    grantedSpells: [
      focus('Force Bolt', 'Escola'),
      ...list(CURRICULO, [
        ['Shield', 0], ['Telekinetic Projectile', 0],
        ['Breathe Fire', 1], ['Force Barrage', 1], ['Mystic Armor', 1],
        ['Mist', 2], ['Resist Energy', 2],
        ['Earthbind', 3], ['Fireball', 3],
        ['Wall of Fire', 4], ['Weapon Storm', 4],
        ['Howling Blizzard', 5], ['Impaling Spike', 5],
        ['Chain Lightning', 6], ['Disintegrate', 6],
        ['Energy Aegis', 7], ['True Target', 7],
        ['Arctic Rift', 8], ['Desiccate', 8],
        ['Falling Stars', 9],
      ]),
    ],
  },
  'school-civic-wizardry': {
    grantedSpells: [
      focus('Earthworks', 'Escola'),
      ...list(CURRICULO, [
        ['Prestidigitation', 0], ['Read Aura', 0],
        ['Hydraulic Push', 1], ['Pummeling Rubble', 1], ['Summon Construct', 1],
        ['Revealing Light', 2], ['Water Walk', 2],
        ['Cozy Cabin', 3], ['Safe Passage', 3],
        ['Creation', 4], ['Unfettered Movement', 4],
        ['Control Water', 5], ['Wall of Stone', 5],
        ['Disintegrate', 6], ['Wall of Force', 6],
        ['Planar Palace', 7], ['Retrocognition', 7],
        ['Earthquake', 8], ['Pinpoint', 8],
        ['Foresight', 9],
      ]),
    ],
  },
  'school-boundary': {
    grantedSpells: [
      focus('Fortify Summoning', 'Escola'),
      ...list(CURRICULO, [
        ['Telekinetic Hand', 0], ['Void Warp', 0],
        ['Grim Tendrils', 1], ['Phantasmal Minion', 1], ['Summon Undead', 1],
        ['Darkness', 2], ['See the Unseen', 2],
        ['Bind Undead', 3], ['Ghostly Weapon', 3],
        ['Flicker', 4], ['Translocate', 4],
        ['Banishment', 5], ['Invoke Spirits', 5],
        ['Teleport', 6], ['Vampiric Exsanguination', 6],
        ['Eclipse Burst', 7], ['Interplanar Teleport', 7],
        ['Quandary', 8], ['Unrelenting Observation', 8],
        ['Massacre', 9],
      ]),
    ],
  },
  'school-mentalism': {
    grantedSpells: [
      focus('Charming Push', 'Escola'),
      ...list(CURRICULO, [
        ['Daze', 0], ['Figment', 0],
        ['Dizzying Colors', 1], ['Sleep', 1], ['Sure Strike', 1],
        ['Illusory Creature', 2], ['Stupefy', 2],
        ['Dream Message', 3], ['Mind Reading', 3],
        ['Nightmare', 4], ['Vision of Death', 4],
        ['Hallucination', 5], ['Illusory Scene', 5],
        ['Never Mind', 6], ['Phantasmal Calamity', 6],
        ['Project Image', 7], ['Warp Mind', 7],
        ['Disappearance', 8], ['Uncontrollable Dance', 8],
        ['Phantasmagoria', 9],
      ]),
    ],
  },
  'school-protean-form': {
    grantedSpells: [
      focus('Scramble Body', 'Escola'),
      ...list(CURRICULO, [
        ['Gouging Claw', 0], ['Tangle Vine', 0],
        ['Jump', 1], ['Pest Form', 1], ['Spider Sting', 1],
        ['Enlarge', 2], ['Humanoid Form', 2],
        ['Feet to Fins', 3], ['Vampiric Feast', 3],
        ['Mountain Resilience', 4], ['Vapor Form', 4],
        ['Elemental Form', 5], ['Toxic Cloud', 5],
        ['Cursed Metamorphosis', 6], ['Petrify', 6],
        ['Duplicate Foe', 7], ['Fiery Body', 7],
        ['Desiccate', 8], ['Monstrosity Form', 8],
        ['Metamorphosis', 9],
      ]),
    ],
  },
  'school-unified-theory': {
    grantedSpells: [focus("Hand of the Apprentice", 'Escola')],
  },

  'patron-faiths-flamekeeper': {
    grantedSpells: [cantrip('Stoke the Heart', HEX), known('Command', 1, LICAO)],
  },
  'patron-inscribed-one': {
    grantedSpells: [cantrip('Discern Secrets', HEX), known('Runic Weapon', 1, LICAO)],
  },
  'patron-resentment': {
    grantedSpells: [cantrip('Evil Eye', HEX), known('Enfeeble', 1, LICAO)],
  },
  'patron-silence-in-snow': {
    grantedSpells: [cantrip('Clinging Ice', HEX), known('Gust of Wind', 1, LICAO)],
  },
  'patron-spinner-of-threads': {
    grantedSpells: [cantrip('Nudge Fate', HEX), known('Sure Strike', 1, LICAO)],
  },
  'patron-starless-shadow': {
    grantedSpells: [cantrip('Shroud of Night', HEX), known('Fear', 1, LICAO)],
  },
  'patron-wilding-steward': {
    grantedSpells: [
      cantrip('Wilding Word', HEX),
      {
        choiceId: 'patron-wilding-lesson',
        pickOneOriginalNames: ['Summon Animal', 'Summon Plant or Fungus'],
        slot: 'collection',
        sourceLabel: LICAO,
      },
    ],
  },
  'patron-devourer-of-decay': {
    grantedSpells: [cantrip("Scrounger's Glee", HEX), known('Enfeeble', 1, LICAO)],
  },
  'patron-ripple-in-the-deep': {
    grantedSpells: [
      cantrip('Sting of the Sea', HEX),
      {
        choiceId: 'patron-ripple-lesson',
        pickOneOriginalNames: ['Dizzying Colors', 'Grease'],
        slot: 'collection',
        sourceLabel: LICAO,
      },
    ],
  },
  'patron-whisper-of-wings': {
    grantedSpells: [cantrip('Murmuration', HEX), known('Gentle Landing', 1, LICAO)],
  },
  'patron-choir-politic': {
    grantedSpells: [cantrip('Share Vision', HEX), known('Share Lore', 1, LICAO)],
  },
  'patron-paradox-of-opposites': {
    grantedSpells: [cantrip('Trade Death for Life', HEX), known('Sleep', 1, LICAO)],
  },
  'patron-baba-yaga': {
    grantedSpells: [cantrip('Spirit Object', HEX), known('Chilling Spray', 1, LICAO)],
  },
  'patron-mosquito-witch': {
    grantedSpells: [cantrip('Buzzing Bites', HEX), known('Pest Form', 1, LICAO)],
  },
  'patron-unseen-broker': {
    grantedSpells: [cantrip('Pact Broker', HEX), known('Command', 1, LICAO)],
  },

  'muse-enigma': { grantedSpells: [known('Sure Strike', 1, MUSA)] },
  'muse-maestro': { grantedSpells: [known('Calm', 1, MUSA)] },
  'muse-polymath': { grantedSpells: [known('Phantasmal Minion', 1, MUSA)] },
  'muse-warrior': { grantedSpells: [known('Fear', 1, MUSA)] },
  'muse-zoophonia': { grantedSpells: [known('Summon Animal', 1, MUSA)] },

  'order-animal': { grantedSpells: [focus('Heal Animal', ORDEM)] },
  'order-leaf': { grantedSpells: [focus('Cornucopia', ORDEM)] },
  'order-cultivation': { grantedSpells: [focus('Cornucopia', ORDEM)] },
  'order-spore': { grantedSpells: [focus('Mushroom Patch', ORDEM)] },
  'order-storm': { grantedSpells: [focus('Tempest Surge', ORDEM)] },
  'order-untamed': { grantedSpells: [focus('Untamed Shift', ORDEM)] },

  'bloodline-aberrant': {
    grantedSpells: [
      focus('Tentacular Limbs', LINHAGEM),
      ...list(LINHAGEM, [
        ['Daze', 0], ['Phantom Pain', 1], ['Stupefy', 2], ['Vampiric Feast', 3],
        ['Confusion', 4], ['Slither', 5], ['Never Mind', 6], ['Warp Mind', 7],
        ['Uncontrollable Dance', 8], ['Unfathomable Song', 9],
      ]),
    ],
  },
  'bloodline-angelic': {
    grantedSpells: [
      focus('Angelic Halo', LINHAGEM),
      ...list(LINHAGEM, [
        ['Light', 0], ['Heal', 1], ['Spiritual Armament', 2], ['Holy Light', 3],
        ['Divine Wrath', 4], ['Divine Immolation', 5], ['Blessed Boundary', 6],
        ['Divine Decree', 7], ['Moment of Renewal', 8], ['Foresight', 9],
      ]),
    ],
  },
  'bloodline-demonic': {
    grantedSpells: [
      focus("Glutton's Jaws", LINHAGEM),
      ...list(LINHAGEM, [
        ['Caustic Blast', 0], ['Fear', 1], ['Enlarge', 2], ['Slow', 3],
        ['Divine Wrath', 4], ['Blister', 5], ['Disintegrate', 6],
        ['Divine Decree', 7], ['Canticle of Everlasting Grief', 8], ['Implosion', 9],
      ]),
    ],
  },
  'bloodline-diabolic': {
    grantedSpells: [
      focus('Diabolic Edict', LINHAGEM),
      ...list(LINHAGEM, [
        ['Ignition', 0], ['Charm', 1], ['Floating Flame', 2], ['Enthrall', 3],
        ['Suggestion', 4], ['Wave of Despair', 5], ['Truesight', 6],
        ['Divine Decree', 7], ['Divine Inspiration', 8], ['Falling Stars', 9],
      ]),
    ],
  },
  'bloodline-draconic': {
    grantedSpells: [
      focus('Flurry of Claws', LINHAGEM),
      ...list(LINHAGEM, [
        ['Shield', 0], ['Fear', 1], ['Haste', 3], ['Fly', 4],
        ['Dragon Form', 6], ['Mask of Terror', 7], ['Overwhelming Presence', 9],
      ]),
      whenSkill('arcana', 'Blazing Bolt', 2, LINHAGEM),
      whenSkill('arcana', 'Subconscious Suggestion', 5, LINHAGEM),
      whenSkill('arcana', 'Quandary', 8, LINHAGEM),
      whenSkill('religion', 'Augury', 2, LINHAGEM),
      whenSkill('religion', 'Divine Immolation', 5, LINHAGEM),
      whenSkill('religion', 'Divine Inspiration', 8, LINHAGEM),
      whenSkill('occultism', 'Blood Vendetta', 2, LINHAGEM),
      whenSkill('occultism', 'Slither', 5, LINHAGEM),
      whenSkill('occultism', 'Unrelenting Observation', 8, LINHAGEM),
      whenSkill('nature', 'Shatter', 2, LINHAGEM),
      whenSkill('nature', 'Howling Blizzard', 5, LINHAGEM),
      whenSkill('nature', 'Earthquake', 8, LINHAGEM),
    ],
  },
  'bloodline-elemental': {
    spellPicks: [
      {
        id: 'elemental-influence',
        label: 'Influência elemental',
        description:
          'O elemento que impregnou seu sangue. Define truque, magias de 1º/3º/6º e o tipo de dano da magia de sangue.',
        options: [
          { id: 'air', name: 'Ar' },
          { id: 'earth', name: 'Terra' },
          { id: 'fire', name: 'Fogo' },
          { id: 'metal', name: 'Metal' },
          { id: 'water', name: 'Água' },
          { id: 'wood', name: 'Madeira' },
        ],
      },
    ],
    grantedSpells: [
      focus('Elemental Toss', LINHAGEM),
      known('Resist Energy', 2, LINHAGEM),
      known('Unfettered Movement', 4, LINHAGEM),
      known('Elemental Form', 5, LINHAGEM),
      known('Energy Aegis', 7, LINHAGEM),
      known('Earthquake', 8, LINHAGEM),
      known('Wrathful Storm', 9, LINHAGEM),
      whenPick('elemental-influence', 'air', 'Gale Blast', 0, LINHAGEM),
      whenPick('elemental-influence', 'air', 'Tailwind', 1, LINHAGEM),
      whenPick('elemental-influence', 'air', 'Wall of Wind', 3, LINHAGEM),
      whenPick('elemental-influence', 'air', 'Chain Lightning', 6, LINHAGEM),
      whenPick('elemental-influence', 'earth', 'Scatter Scree', 0, LINHAGEM),
      whenPick('elemental-influence', 'earth', 'Pummeling Rubble', 1, LINHAGEM),
      whenPick('elemental-influence', 'earth', 'Earthbind', 3, LINHAGEM),
      whenPick('elemental-influence', 'earth', 'Petrify', 6, LINHAGEM),
      whenPick('elemental-influence', 'fire', 'Ignition', 0, LINHAGEM),
      whenPick('elemental-influence', 'fire', 'Breathe Fire', 1, LINHAGEM),
      whenPick('elemental-influence', 'fire', 'Fireball', 3, LINHAGEM),
      whenPick('elemental-influence', 'fire', 'Tree of Seasons', 6, LINHAGEM),
      whenPick('elemental-influence', 'metal', 'Electric Arc', 0, LINHAGEM),
      whenPick('elemental-influence', 'metal', 'Thunderstrike', 1, LINHAGEM),
      whenPick('elemental-influence', 'metal', 'Lightning Bolt', 3, LINHAGEM),
      whenPick('elemental-influence', 'metal', 'Chain Lightning', 6, LINHAGEM),
      whenPick('elemental-influence', 'water', 'Frostbite', 0, LINHAGEM),
      whenPick('elemental-influence', 'water', 'Hydraulic Push', 1, LINHAGEM),
      whenPick('elemental-influence', 'water', 'Aqueous Orb', 3, LINHAGEM),
      whenPick('elemental-influence', 'water', 'Scintillating Safeguard', 6, LINHAGEM),
      whenPick('elemental-influence', 'wood', 'Tangle Vine', 0, LINHAGEM),
      whenPick('elemental-influence', 'wood', 'Cleanse Cuisine', 1, LINHAGEM),
      whenPick('elemental-influence', 'wood', 'Wall of Thorns', 3, LINHAGEM),
      whenPick('elemental-influence', 'wood', 'Tangling Creepers', 6, LINHAGEM),
    ],
  },
  'bloodline-fey': {
    grantedSpells: [
      focus('Faerie Dust', LINHAGEM),
      ...list(LINHAGEM, [
        ['Figment', 0], ['Charm', 1], ['Laughing Fit', 2], ['Enthrall', 3],
        ['Suggestion', 4], ['Hallucination', 5], ['Mislead', 6],
        ['Visions of Danger', 7], ['Uncontrollable Dance', 8], ['Metamorphosis', 9],
      ]),
    ],
  },
  'bloodline-hag': {
    grantedSpells: [
      focus('Jealous Hex', LINHAGEM),
      ...list(LINHAGEM, [
        ['Daze', 0], ['Illusory Disguise', 1], ['Stupefy', 2], ['Blindness', 3],
        ["Outcast's Curse", 4], ["Mariner's Curse", 5], ['Cursed Metamorphosis', 6],
        ['Warp Mind', 7], ['Quandary', 8], ['Phantasmagoria', 9],
      ]),
    ],
  },
  'bloodline-imperial': {
    grantedSpells: [
      focus('Ancestral Memories', LINHAGEM),
      ...list(LINHAGEM, [
        ['Detect Magic', 0], ['Force Barrage', 1], ['Dispel Magic', 2], ['Haste', 3],
        ['Translocate', 4], ['Scouting Eye', 5], ['Disintegrate', 6],
        ['Retrocognition', 7], ['Quandary', 8], ['Implosion', 9],
      ]),
    ],
  },
  'bloodline-undead': {
    grantedSpells: [
      focus("Undeath's Blessing", LINHAGEM),
      ...list(LINHAGEM, [
        ['Void Warp', 0], ['Harm', 1], ['See the Unseen', 2], ['Bind Undead', 3],
        ['Talking Corpse', 4], ['Invoke Spirits', 5], ['Vampiric Exsanguination', 6],
        ['Execute', 7], ['Canticle of Everlasting Grief', 8], ['Wails of the Damned', 9],
      ]),
    ],
  },

  'mystery-ancestors': {
    grantedSpells: [
      focus('Ancestral Touch', MISTERIO),
      ...list(MISTERIO, [
        ['Guidance', 0], ['Ill Omen', 1], ['Ghostly Carrier', 2], ['Dreaming Potential', 5],
      ]),
    ],
  },
  'mystery-battle': {
    grantedSpells: [
      focus('Weapon Trance', MISTERIO),
      ...list(MISTERIO, [
        ['Shield', 0], ['Sure Strike', 1], ['Telekinetic Maneuver', 2], ['Weapon Storm', 4],
      ]),
    ],
  },
  'mystery-bones': {
    grantedSpells: [
      focus('Soul Siphon', MISTERIO),
      ...list(MISTERIO, [
        ['Void Warp', 0], ['Grim Tendrils', 1], ['False Vitality', 2], ['Ghostly Weapon', 3],
      ]),
    ],
  },
  'mystery-cosmos': {
    grantedSpells: [
      focus('Spray of Stars', MISTERIO),
      ...list(MISTERIO, [
        ['Light', 0], ['Dizzying Colors', 1], ['Darkness', 2], ['Moon Frenzy', 5],
      ]),
    ],
  },
  'mystery-flames': {
    grantedSpells: [
      focus('Incendiary Aura', MISTERIO),
      ...list(MISTERIO, [
        ['Ignition', 0], ['Breathe Fire', 1], ['Blazing Bolt', 2], ['Fireball', 3],
      ]),
    ],
  },
  'mystery-life': {
    grantedSpells: [
      focus('Life Link', MISTERIO),
      ...list(MISTERIO, [
        ['Vitality Lash', 0], ['Soothe', 1], ['False Vitality', 2], ['Grisly Growths', 5],
      ]),
    ],
  },
  'mystery-lore': {
    grantedSpells: [
      focus('Brain Drain', MISTERIO),
      ...list(MISTERIO, [
        ['Read Aura', 0], ['Mindlink', 1], ['Hypercognition', 3], ['Never Mind', 6],
      ]),
    ],
  },
  'mystery-tempest': {
    grantedSpells: [
      focus('Tempest Touch', MISTERIO),
      ...list(MISTERIO, [
        ['Electric Arc', 0], ['Thunderstrike', 1], ['Hydraulic Torrent', 4], ['Chain Lightning', 6],
      ]),
    ],
  },
  'mystery-ash': {
    grantedSpells: [
      focus('Ashen Wind', MISTERIO),
      ...list(MISTERIO, [
        ['Ignition', 0], ['Breathe Fire', 1], ['Mist', 2], ['Disintegrate', 6],
      ]),
    ],
  },
  'mystery-blight': {
    grantedSpells: [
      focus('Ulcerous Canker', MISTERIO),
      ...list(MISTERIO, [
        ['Caustic Blast', 0], ['Noxious Vapors', 1], ['Fungal Infestation', 2], ['Toxic Cloud', 5],
      ]),
    ],
  },
  'mystery-time': {
    grantedSpells: [
      focus('Temporal Distortion', MISTERIO),
      ...list(MISTERIO, [
        ['Time Sense', 0], ['Déjà Vu', 1], ['Time Pocket', 3], ['Time Beacon', 7],
      ]),
    ],
  },

  'conscious-distant-grasp': {
    grantedSpells: [
      cantrip('Telekinetic Hand', MENTE),
      cantrip('Telekinetic Projectile', MENTE),
      cantrip('Telekinetic Rend', MENTE),
      cantrip('Vector Screen', MENTE, 6),
      cantrip('Dancing Blade', MENTE, 10),
      ...list(MENTE, [
        ['Kinetic Ram', 1], ['Telekinetic Maneuver', 2], ['Gravity Well', 3],
        ['Fly', 4], ['Telekinetic Haul', 5], ["Poltergeist's Fury", 6],
        ['Telekinetic Bombardment', 7], ['Falling Sky', 8], ['Implosion', 9],
      ]),
    ],
  },
  'conscious-infinite-eye': {
    grantedSpells: [
      cantrip('Detect Magic', MENTE),
      cantrip('Guidance', MENTE),
      cantrip('Glimpse Weakness', MENTE),
      cantrip('Omnidirectional Scan', MENTE, 6),
      cantrip('Foresee the Path', MENTE, 10),
      ...list(MENTE, [
        ['Sure Strike', 1], ['Augury', 2], ['Locate', 3], ['Clairvoyance', 4],
        ['Scouting Eye', 5], ['Truesight', 6], ['True Target', 7],
        ['Unrelenting Observation', 8], ['Foresight', 9],
      ]),
    ],
  },
  'conscious-oscillating-wave': {
    grantedSpells: [
      cantrip('Frostbite', MENTE),
      cantrip('Ignition', MENTE),
      cantrip('Thermal Stasis', MENTE),
      cantrip('Entropic Wheel', MENTE, 6),
      cantrip('Redistribute Potential', MENTE, 10),
      ...list(MENTE, [
        ['Breathe Fire', 1], ['Blazing Bolt', 2], ['Fireball', 3], ['Ice Storm', 4],
        ['Howling Blizzard', 5], ['Frozen Fog', 6], ['Volcanic Eruption', 7],
        ['Arctic Rift', 8], ['Falling Stars', 9],
      ]),
    ],
  },
  'conscious-silent-whisper': {
    grantedSpells: [
      cantrip('Daze', MENTE),
      cantrip('Message', MENTE),
      cantrip('Forbidden Thought', MENTE),
      cantrip('Shatter Mind', MENTE, 6),
      cantrip('Contagious Idea', MENTE, 10),
      ...list(MENTE, [
        ['Mindlink', 1], ['Stupefy', 2], ['Heroism', 3], ['Telepathy', 4],
        ['Synaptic Pulse', 5], ['Sending', 5], ['Visions of Danger', 7],
        ['Uncontrollable Dance', 8], ['Telepathic Demand', 9],
      ]),
    ],
  },
  'conscious-tangible-dream': {
    grantedSpells: [
      cantrip('Figment', MENTE),
      cantrip('Shield', MENTE),
      cantrip('Imaginary Weapon', MENTE),
      cantrip('Astral Rain', MENTE, 6),
      cantrip('Hologram Cage', MENTE, 10),
      ...list(MENTE, [
        ['Dizzying Colors', 1], ['Invisibility', 2], ['Sea of Thought', 3],
        ['Containment', 4], ['Etheric Shards', 5], ['Scintillating Safeguard', 6],
        ['Project Image', 7], ['Confusing Colors', 8], ['Resplendent Mansion', 9],
      ]),
    ],
  },
  'conscious-unbound-step': {
    grantedSpells: [
      cantrip('Phase Bolt', MENTE),
      cantrip('Warp Step', MENTE),
      cantrip('Distortion Lens', MENTE),
      cantrip('Ghostly Shift', MENTE, 6),
      cantrip('Tesseract Tunnel', MENTE, 10),
      ...list(MENTE, [
        ['Thoughtful Gift', 1], ['Enlarge', 2], ['Rally Point', 3],
        ['Translocate', 4], ['Strange Geometry', 5], ['Collective Transposition', 6],
        ['Momentary Recovery', 7], ['Quandary', 8], ['Bilocation', 9],
      ]),
    ],
  },

  'hybrid-inexorable-iron': {
    grantedSpells: [
      focus('Thunderous Strike', CONFLUXO),
      known('Enlarge', 2, ESTUDO, 7),
      known('Earthbind', 3, ESTUDO, 11),
      known('Planar Tether', 4, ESTUDO, 13),
    ],
  },
  'hybrid-sparkling-targe': {
    grantedSpells: [
      focus('Shielding Strike', CONFLUXO),
      known('Resist Energy', 2, ESTUDO, 7),
      known('Warding Aggression', 4, ESTUDO, 11),
      known('Mountain Resilience', 4, ESTUDO, 13),
    ],
  },
  'hybrid-starlit-span': {
    grantedSpells: [
      focus('Shooting Star', CONFLUXO),
      known('Telekinetic Maneuver', 2, ESTUDO, 7),
      known('Wall of Wind', 3, ESTUDO, 11),
      known('Unfettered Movement', 4, ESTUDO, 13),
    ],
  },
  'hybrid-laughing-shadow': {
    grantedSpells: [
      focus('Dimensional Assault', CONFLUXO),
      known('Blur', 2, ESTUDO, 7),
      known('Ghostly Weapon', 3, ESTUDO, 11),
      known('Translocate', 4, ESTUDO, 13),
    ],
  },
  'hybrid-twisting-tree': {
    grantedSpells: [
      focus('Spinning Staff', CONFLUXO),
      known('Oaken Resilience', 2, ESTUDO, 7),
      known('Slow', 3, ESTUDO, 11),
      known('Flicker', 4, ESTUDO, 13),
    ],
  },
  'hybrid-twofold-tine': {
    grantedSpells: [
      focus('Force Fling', CONFLUXO),
      known('Blur', 2, ESTUDO, 7),
      known('Gravity Well', 3, ESTUDO, 11),
      known('Unfettered Movement', 4, ESTUDO, 13),
    ],
  },
  'hybrid-volatile-spark': {
    grantedSpells: [
      focus('Booming Blast', CONFLUXO),
      known('Entangling Flora', 2, ESTUDO, 7),
      known('Earthbind', 3, ESTUDO, 11),
      known('Seal Fate', 4, ESTUDO, 13),
    ],
  },
}

export function attachGrantedSpells(classDef: CharacterClass): CharacterClass {
  const classBundle = BY_CLASS[classDef.id]
  const attachGroup = (
    group: CharacterClass['subclass'],
  ): CharacterClass['subclass'] => {
    if (!group) return group
    return {
      ...group,
      options: group.options.map((opt) => {
        const bundle = BY_OPTION[opt.id]
        if (!bundle) return opt
        return {
          ...opt,
          grantedSpells: bundle.grantedSpells ?? opt.grantedSpells,
          spellPicks: bundle.spellPicks ?? opt.spellPicks,
        }
      }),
    }
  }
  return {
    ...classDef,
    grantedSpells: classBundle?.grantedSpells ?? classDef.grantedSpells,
    spellPicks: classBundle?.spellPicks ?? classDef.spellPicks,
    subclass: attachGroup(classDef.subclass),
    secondarySubclass: attachGroup(classDef.secondarySubclass),
  }
}
