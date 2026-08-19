import type { Feat } from '@/types'
import { localizeFeatName, looksEnglishTitle } from '@/data/i18n/featNamesPt'
import { applyCatalogTokens } from '@/data/i18n/catalogTokensPt'
import {
  localizeFeatDescription,
  localizeFeatRulesText,
} from '@/data/i18n/featDescriptionsPt'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { enrichFeatDescription } from '@/engine/featDisplay'

/** Aplica nome, descrição, traços e pré-requisitos pt-BR para a UI. */
export function withLocalizedFeatName<
  T extends Pick<Feat, 'name' | 'originalName' | 'traits'> & {
    description?: string
    trigger?: string
    frequency?: string
    prerequisites?: Feat['prerequisites']
    effects?: Feat['effects']
  },
>(feat: T, catalog?: Feat[] | Map<string, Feat>): T {
  const name = localizeFeatName(feat.name, feat.originalName)
  const localizedBody =
    typeof feat.description === 'string'
      ? localizeFeatDescription(feat.description, feat.originalName, feat.name)
      : feat.description
  const description =
    typeof localizedBody === 'string'
      ? enrichFeatDescription(
          { description: localizedBody, effects: feat.effects },
          catalog,
        )
      : localizedBody
  const trigger =
    typeof feat.trigger === 'string'
      ? localizeFeatRulesText(feat.trigger, 'trigger', feat.originalName)
      : feat.trigger
  const frequency =
    typeof feat.frequency === 'string'
      ? localizeFeatRulesText(feat.frequency, 'frequency', feat.originalName)
      : feat.frequency
  const traits = feat.traits?.map(localizeTraitLabel) ?? feat.traits
  const prerequisites = feat.prerequisites?.map((pre) => {
    if (pre.kind === 'feat') {
      return {
        ...pre,
        featName: localizeFeatName(pre.featName ?? pre.featId, pre.featName),
      }
    }
    if (pre.kind === 'text') {
      return { ...pre, label: localizePrerequisiteLabel(pre.label) }
    }
    return pre
  })
  return { ...feat, name, description, trigger, frequency, traits, prerequisites }
}

const PREREQ_LABELS_PT: Record<string, string> = {
  'a familiar': 'um familiar',
  'divine or occult patron': 'patrono divino ou oculto',
  'arcane or primal patron': 'patrono arcano ou primal',
  "patron's gift": 'dom do patrono',
  'enigma muse': 'musa enigma',
  'maestro muse': 'musa maestro',
  'warrior muse': 'musa guerreira',
  'polymath muse': 'musa polímata',
  'zoophonia muse': 'musa zoofonia',
  '[Bard] enigma muse': '[Bardo] musa enigma',
  'Expert in Occultism': 'Especialista em Ocultismo',
  'Master in Occultism': 'Mestre em Ocultismo',
  'Legendary in Occultism': 'Lendário em Ocultismo',
  'zoophonia muse, mature animal companion':
    'musa zoofonia, companheiro animal maduro',
  '_Courageous Anthem_': '_Hino Corajoso_',
  'Trained in Nature or Trained in Survival':
    'Treinado em Natureza ou Treinado em Sobrevivência',
  'magnum opus': 'magnum opus',
  'harmful font': 'fonte nociva',
  'healing font': 'fonte de cura',
  'harmful font or healing font': 'fonte nociva ou fonte de cura',
  'warpriest doctrine': 'doutrina sacerdote de guerra',
  'holy or unholy trait': 'traço sagrado ou profano',
  holy: 'sagrado',
  unholy: 'profano',
  'Shield Block': 'Bloqueio com Escudo',
  'miraculous spell': 'magia milagrosa',
  'Trained in Arcana': 'Treinado em Arcanismo',
  'arcane bond': 'vínculo arcano',
  'arcane school': 'escola arcana',
  'Expert in Deception': 'Especialista em Enganação',
  'Quick Recognition': 'Reconhecimento Rápido',
  "archwizard's spellcraft": 'magia do arquimago',
  'dragon instinct': 'instinto de dragão',
  'elemental instinct': 'instinto elemental',
  'animal instinct': 'instinto animal',
  'fury instinct': 'instinto de fúria',
  'spirit instinct': 'instinto de espírito',
  'Giant instinct': 'instinto de gigante',
  'superstition instinct': 'instinto de superstição',
  'animal instinct or untamed order': 'instinto animal ou ordem indomada',
  'Trained in Athletics': 'Treinado em Atletismo',
  'Expert in Athletics': 'Especialista em Atletismo',
  'Master in Athletics': 'Mestre em Atletismo',
  'Acute Scent or scent': 'Faro Aguçado ou faro',
  'Acute Scent or Scent': 'Faro Aguçado ou Faro',
  'low-light vision or scent': 'visão na penumbra ou faro',
  'Trained in Medicine or Tian Xia Lore':
    'Treinado em Medicina ou Conhecimento de Tian Xia',
  'Trained in Deception': 'Treinado em Enganação',
  'Trained in Intimidation': 'Treinado em Intimidação',
  'Trained in Stealth': 'Treinado em Furtividade',
  'Expert in Stealth': 'Especialista em Furtividade',
  'Master in Stealth': 'Mestre em Furtividade',
  'master in Perception': 'mestre em Percepção',
  'ruffian racket': 'especialidade rufião',
  'mastermind racket': 'especialidade mente-mestra',
  'scoundrel racket': 'especialidade canalha',
  'thief racket': 'especialidade ladrão',
  Pickpocket: 'Batedor de Carteira',
  'sneak attack': 'ataque furtivo',
  'sneak attack 2d6': 'ataque furtivo 2d6',
  Spellstrike: 'Golpe Mágico',
  'inexorable iron hybrid study': 'estudo híbrido ferro inexorável',
  'aloof firmament hybrid study': 'estudo híbrido firmamento distante',
  'laughing shadow hybrid study': 'estudo híbrido sombra risonha',
  'sparkling targe hybrid study': 'estudo híbrido escudo cintilante',
  'starlit span hybrid study': 'estudo híbrido arco estrelado',
  'twisting tree hybrid study': 'estudo híbrido árvore retorcida',
  'twofold tine hybrid study': 'estudo híbrido dente duplo',
  'volatile spark hybrid study': 'estudo híbrido faísca volátil',
  'Your Spellstrike is charged, and you have at least one spell prepared in a spell slot.':
    'Seu Golpe Mágico está carregado, e você tem ao menos uma magia preparada num espaço.',
  'Debilitating Strike': 'Golpe Debilitante',
  'flurry of blows': 'rajada de golpes',
  'expert strikes': 'golpes especialistas',
  '_Inner Upheaval_': '_Agitação Interior_',
  '[Druid] animal order': '[Druida] ordem animal',
  '[Druid] leaf order': '[Druida] ordem da folha',
  '[Druid] storm order': '[Druida] ordem da tempestade',
  '[Druid] untamed order': '[Druida] ordem indomada',
  'animal order': 'ordem animal',
  'leaf order': 'ordem da folha',
  'storm order': 'ordem da tempestade',
  'untamed order': 'ordem indomada',
  'justice cause': 'causa da justiça',
  'grandeur cause': 'causa da grandeza',
  'liberation cause': 'causa da libertação',
  'redemption cause': 'causa da redenção',
  'obedience cause': 'causa da obediência',
  'desecration cause': 'causa da desecração',
  'iniquity cause': 'causa da iniquidade',
  "champion's aura": 'aura de campeão',
  "champion's reaction": 'reação de campeão',
  'holy or unholy': 'sagrado ou profano',
  'aberrant bloodline': 'linhagem aberrante',
  'angelic bloodline': 'linhagem angélica',
  'demonic bloodline': 'linhagem demoníaca',
  'diabolic bloodline': 'linhagem diabólica',
  'draconic bloodline': 'linhagem dracônica',
  'elemental bloodline': 'linhagem elemental',
  'fey bloodline': 'linhagem feérica',
  'hag bloodline': 'linhagem de hag',
  'imperial bloodline': 'linhagem imperial',
  'undead bloodline': 'linhagem morta-viva',
  bloodline: 'linhagem',
  'trained in at least one skill': 'treinado em pelo menos uma perícia',
  'Intelligence +1': 'Inteligência +1',
  'Constitution +2': 'Constituição +2',
  'Charisma +3': 'Carisma +3',
  'Expert in Perception': 'especialista em Percepção',
  'Legendary in Perception': 'lendário em Percepção',
  'Five-breath Vanguard Dedication': 'Dedicação de Vanguarda das Cinco Respirações',
  'Heavenscribe Kobold heritage': 'herança Kobold Escrivão Celestial',
  'trained in martial weapons': 'treinado em armas marciais',
  'Warfare Lore': 'Conhecimento de Guerra',
  "follower of a specific religion or philosophy":
    'seguidor de uma religião ou filosofia específica',
  'you follow a deity with “holy” or “unholy” sanctification':
    'você segue uma divindade com santificação sagrada ou profana',
  'Expert in Religion; you follow a deity with “holy” or “unholy” sanctification':
    'Especialista em Religião; você segue uma divindade com santificação sagrada ou profana',
  aquatic: 'aquático',
  "You don't have a swim Speed.": 'Você não tem Deslocamento de natação.',
  'You have a swim Speed.': 'Você tem Deslocamento de natação.',
  'You have a versatile heritage.': 'Você tem uma herança versátil.',
  'versatile heritage': 'herança versátil',
  'awakened mind': 'mente despertada',
  'Tiny size': 'tamanho minúsculo',
  'You have a free hand.': 'Você tem uma mão livre.',
  'claw unarmed attack': 'ataque desarmado de garra',
  'fangs unarmed attack': 'ataque desarmado de presas',
  'worshipper of Torag or Angradd': 'adorador de Torag ou Angradd',
  'at least 100 years old': 'pelo menos 100 anos de idade',
  'at least one innate spell gained from an elf ancestry feat':
    'pelo menos uma magia inata ganha de um feito de ancestralidade élfica',
  'focus pool, at least one innate spell from a gnome heritage or ancestry feat that shares a tradition with at least one of your focus spells':
    'reserva de foco, e pelo menos uma magia inata de uma herança ou feito de ancestralidade gnomo que compartilhe a tradição com ao menos uma das suas magias de foco',
  'at least one arcane or occult innate spell gained from a gnome heritage or gnome ancestry feat':
    'pelo menos uma magia inata arcana ou oculta ganha de uma herança ou feito de ancestralidade gnomo',
  'at least one primal innate spell': 'pelo menos uma magia inata primal',
  'Kijimuna Gnome heritage or at least one primal innate spell from a gnome heritage or feat':
    'herança Gnomo Kijimuna ou pelo menos uma magia inata primal de uma herança ou feito gnomo',
  'animal companion': 'companheiro animal',
  'spellcasting class feature': 'característica de classe de conjuração',
  'can cast 3rd-level spells': 'pode lançar magias de 3º nível',
  'Bonded Animal, animal companion, or Pet':
    'Animal Vinculado, companheiro animal ou Mascote',
  'You are not immune to diseases or poisons':
    'Você não é imune a doenças ou venenos',
  'Yaksha heritage with an edict that requires you to confront a certain type of creature.':
    'herança Yaksha com um édito que exige confrontar um certo tipo de criatura.',
  'low-light vision': 'visão na penumbra',
  darkvision: 'visão no escuro',
  'focus pool': 'reserva de foco',
  'Angelkin, Lawbringer, Musetouched, or or another lineage feat associated with celestials':
    'Parente de Anjo, Arauto da Lei, Tocado pela Musa ou outro feito de linhagem associado a celestiais',
  'Angelkin, Lawbringer, Musetouched, or another lineage feat associated with celestials':
    'Parente de Anjo, Arauto da Lei, Tocado pela Musa ou outro feito de linhagem associado a celestiais',
  'Grimspawn, Pitborn, or Hellspawn, or another lineage feat associated with fiends':
    'Cria Sombria, Nascido do Abismo ou Cria do Inferno, ou outro feito de linhagem associado a infernais',
  'Grimspawn, Pitborn, or Hellspawn, or another lineage feat associated with fiends or the Maelstrom':
    'Cria Sombria, Nascido do Abismo ou Cria do Inferno, ou outro feito de linhagem associado a infernais ou ao Maelstrom',
  'any nephilim lineage feat': 'qualquer feito de linhagem nephilim',
  'Arcane Dragonblood, Divine Dragonblood, Occult Dragonblood, or Primal Dragonblood':
    'Dragonblood Arcano, Dragonblood Divino, Dragonblood Oculto ou Dragonblood Primal',
  'ability to cast _humanoid form_ or _illusory disguise_':
    'habilidade de lançar _forma humanoide_ ou _disfarce ilusório_',
  'ability to cast at least one polymorph spell':
    'habilidade de lançar pelo menos uma magia de polimorfia',
  'You speak Muan.': 'Você fala Muan.',
  'the ability to cast a divine or primal spell':
    'a habilidade de lançar uma magia divina ou primal',
  'Caminho do Spellshot (way of the spellshot)': 'Caminho do Tiro Arcano',
  'Membro da Liga Hellbreakers (acesso)':
    'Membro da Liga dos Quebra-Inferno (acesso)',
  'Treinado por uma Ordem Hellknight; acesso: Cheliax Antigo':
    'Treinado por uma Ordem dos Cavaleiros Infernais; acesso: Cheliax Antigo',
  'Membro dos Wylderhearts; acesso: você é de Kyonin':
    'Membro dos Corações Selvagens; acesso: você é de Kyonin',
  'ou Dedicação de Blackjacket': 'ou Dedicação de Casaca Negra',
}

/** Nomes de herança que aparecem em pré-requisitos de texto (originalName → nome na UI). */
const HERITAGE_PHRASE_PT: Array<[string, string]> = (
  [
    ['Chrysanthemum Leshy', 'Leshy Crisântemo'],
    ['Peachchild Leshy', 'Leshy Filho-do-Pêssego'],
    ['Budding Speaker Centaur', 'Centauro Orador Nascente'],
    ['Carcharodon Merfolk', 'Povo-marinho Carcharodon'],
    ['Heavenscribe Kobold', 'Kobold Escrivão Celestial'],
    ['Dragonscaled Kobold', 'Kobold Escamas de Dragão'],
    ['Mightyfall Kobold', 'Kobold Queda Poderosa'],
    ['Spellhorn Kobold', 'Kobold Chifre Mágico'],
    ['Bakuwa Lizardfolk', 'Iruxi Bakuwa'],
    ['Makari Lizardfolk', 'Iruxi Makari'],
    ['Ghost Bull Minotaur', 'Minotauro Touro Fantasma'],
    ['Slabsoul Minotaur', 'Minotauro Alma de Laje'],
    ['Ironhoof Centaur', 'Centauro Casco de Ferro'],
    ['Mottle-Coat Centaur', 'Centauro Pelagem Manchada'],
    ['Climbing Animal', 'Animal Escalador'],
    ['Swimming Animal', 'Animal Nadador'],
    ['Running Animal', 'Animal Corredor'],
    ['Flying Animal', 'Animal Voador'],
    ['Cecaelia Merfolk', 'Povo-marinho Cecaelia'],
    ['Abyssal Merfolk', 'Povo-marinho Abissal'],
    ['Born of Vegetation', 'Nascido de Vegetação'],
    ['Born of Celestial', 'Nascido de Celestial'],
    ['Born of Elements', 'Nascido de Elementos'],
    ['Born of Animal', 'Nascido de Animal'],
    ['Born of Item', 'Nascido de Objeto'],
    ['Sweetbreath Kholo', 'Kholo de Hálito Doce'],
    ['Half Moon Sarangay', 'Sarangay da Meia-Lua'],
    ['New Moon Sarangay', 'Sarangay da Lua Nova'],
    ['Snaptongue Tripkee', 'Tripkee Língua Estala'],
    ['Windweb Tripkee', 'Tripkee Teia de Vento'],
    ['Kijimuna Gnome', 'Gnomo Kijimuna'],
    ['Dokkaebi Goblin', 'Goblin Dokkaebi'],
    ['Aquatic Elf', 'Elfo Aquático'],
    ['Skyborn Tengu', 'Tengu Nascido do Céu'],
    ['Witch Kholo', 'Kholo Bruxo'],
    ['Leaf Leshy', 'Leshy Folha'],
    ['Dog Kholo', 'Kholo Cão'],
  ] as Array<[string, string]>
).sort((a, b) => b[0].length - a[0].length)

const PREREQ_FEAT_PHRASES = [
  'Speaker in Training',
  'Snare Crafting',
  'Bonded Animal',
  'Cat Fall',
  'Wall Jump',
  'Shield Block',
].sort((a, b) => b.length - a.length)

const RANK_EN_PT: Record<string, string> = {
  trained: 'Treinado',
  expert: 'Especialista',
  master: 'Mestre',
  legendary: 'Lendário',
}

const SKILL_EN_PT: Record<string, string> = {
  acrobatics: 'Acrobacia',
  arcana: 'Arcanismo',
  athletics: 'Atletismo',
  crafting: 'Ofício',
  deception: 'Enganação',
  diplomacy: 'Diplomacia',
  intimidation: 'Intimidação',
  medicine: 'Medicina',
  nature: 'Natureza',
  occultism: 'Ocultismo',
  performance: 'Performance',
  religion: 'Religião',
  society: 'Sociedade',
  stealth: 'Furtividade',
  survival: 'Sobrevivência',
  thievery: 'Ladroagem',
  perception: 'Percepção',
  lore: 'Conhecimento',
}

const LORE_EN_PT: Record<string, string> = {
  'warfare lore': 'Conhecimento de Guerra',
  'herbalism lore': 'Conhecimento de Herbalismo',
  'tian xia lore': 'Conhecimento de Tian Xia',
  'alcohol lore': 'Conhecimento de Álcool',
  'cooking lore': 'Conhecimento de Culinária',
}

function translateSkillOrLore(raw: string): string {
  const trimmed = raw.trim()
  const lower = trimmed.toLowerCase()
  if (SKILL_EN_PT[lower]) return SKILL_EN_PT[lower]
  if (LORE_EN_PT[lower]) return LORE_EN_PT[lower]
  const lore = trimmed.match(/^(.+?)\s+lore$/i)
  if (lore) return `Conhecimento de ${lore[1]}`
  const featMapped = localizeFeatName(trimmed)
  if (featMapped !== trimmed) return featMapped
  return trimmed
}

export function localizePrerequisiteLabel(label: string): string {
  if (PREREQ_LABELS_PT[label]) return PREREQ_LABELS_PT[label]
  if (label.includes(';')) {
    return label
      .split(';')
      .map((part) => localizePrerequisiteLabel(part.trim()))
      .join('; ')
  }
  const featMapped = localizeFeatName(label)
  if (featMapped !== label) return featMapped

  let out = label.replace(
    /\b(Trained|Expert|Master|Legendary) in ([A-Za-z][A-Za-z'’ -]*?)(?=,|;| or | and |$)/gi,
    (_all, rank: string, skill: string) =>
      `${RANK_EN_PT[rank.toLowerCase()] ?? rank} em ${translateSkillOrLore(skill)}`,
  )
  out = out.replace(/\b([A-Za-z][A-Za-z'’ -]*?)\s+Lore\b/g, (_all, topic: string) =>
    translateSkillOrLore(`${topic} Lore`),
  )
  for (const [en, pt] of HERITAGE_PHRASE_PT) {
    if (out.includes(en)) out = out.split(en).join(pt)
  }
  for (const featName of PREREQ_FEAT_PHRASES) {
    const localized = localizeFeatName(featName)
    if (localized !== featName && out.includes(featName)) {
      out = out.split(featName).join(localized)
    }
  }
  out = out.replace(/\bthe ability to cast a divine or primal spell\b/gi,
    'a habilidade de lançar uma magia divina ou primal')
  out = out.replace(/\banimal companion\b/gi, 'companheiro animal')
  out = out.replace(/\bfocus pool\b/gi, 'reserva de foco')
  out = out.replace(/\blow-light vision\b/gi, 'visão na penumbra')
  out = out.replace(/\bdarkvision\b/gi, 'visão no escuro')
  out = out.replace(/\baquatic\b/gi, 'aquático')
  out = out.replace(/\bheritage\b/gi, 'herança')
  out = out.replace(/\btrained in martial weapons\b/gi, 'treinado em armas marciais')
  out = out.replace(/\b or \b/g, ' ou ')
  out = out.replace(/\b and \b/g, ' e ')
  out = out.replace(/\bPet\b/g, 'Mascote')
  return applyCatalogTokens(out)
}

function canonicalOriginalName(name: string): string {
  const lower = name.toLowerCase()
  const legacy: Record<string, string> = {
    'power attack': 'vicious swing',
    'attack of opportunity': 'reactive strike',
  }
  return legacy[lower] ?? lower
}

/**
 * Remove duplicatas oficiais (mesmo originalName + classe/ancestralidade + nível).
 * Prefere o registro cujo nome já está em português / id remaster.
 */
export function dedupeOfficialFeats(feats: Feat[]): Feat[] {
  const result: Feat[] = []
  const officialIndex = new Map<string, number>()

  for (const raw of feats) {
    const feat = withLocalizedFeatName(raw)
    if (feat.provenance?.type !== 'official') {
      result.push(feat)
      continue
    }

    const key = [
      feat.category,
      feat.classId ?? '',
      feat.ancestryId ?? '',
      feat.heritageId ?? '',
      feat.archetypeId ?? '',
      canonicalOriginalName(feat.originalName || feat.name),
      String(feat.level),
    ].join('|')

    const existingAt = officialIndex.get(key)
    if (existingAt == null) {
      officialIndex.set(key, result.length)
      result.push(feat)
    } else {
      const existing = result[existingAt]!
      if (scoreFeat(feat) > scoreFeat(existing)) {
        result[existingAt] = feat
      }
    }
  }

  return result
}

function scoreFeat(feat: Feat): number {
  let score = 0
  if (feat.name !== feat.originalName) score += 5
  if (!looksEnglishTitle(feat.name)) score += 3
  if (
    feat.id.includes('-fighter-') ||
    feat.id.includes('-rogue-') ||
    feat.id.includes('-barbarian-')
  ) {
    score += 2
  }
  if (feat.description && !/^[A-Z][a-z]+ you /i.test(feat.description)) {
    score += 1
  }
  return score
}
