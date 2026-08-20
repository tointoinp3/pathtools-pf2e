import type {
  AttackProficiencyCategory,
  DefenseProficiencyCategory,
  Feat,
  FeatEffect,
  ProficiencyRank,
  SkillId,
} from '@/types'
import { SKILL_IDS } from '@/types'
import {
  parseCircumstanceBonusesFromText,
  parseWeaponFamiliarityFromText,
} from './training'
import { getArchetype } from './archetypes'

const SKILL_PATTERNS: Array<{ id: SkillId; re: RegExp }> = [
  { id: 'acrobatics', re: /\b(?:acrobatics|acrobacia)\b/i },
  { id: 'athletics', re: /\b(?:athletics|atletismo)\b/i },
  { id: 'intimidation', re: /\b(?:intimidation|intimidação|intimidacao)\b/i },
  { id: 'performance', re: /\b(?:performance)\b/i },
  { id: 'occultism', re: /\b(?:occultism|ocultismo)\b/i },
  { id: 'diplomacy', re: /\b(?:diplomacy|diplomacia)\b/i },
  { id: 'deception', re: /\b(?:deception|enganação|enganacao)\b/i },
  { id: 'thievery', re: /\b(?:thievery|ladroagem)\b/i },
  { id: 'survival', re: /\b(?:survival|sobrevivência|sobrevivencia)\b/i },
  { id: 'religion', re: /\b(?:religion|religião|religiao)\b/i },
  { id: 'medicine', re: /\b(?:medicine|medicina)\b/i },
  { id: 'crafting', re: /\b(?:crafting|ofício|oficio)\b/i },
  { id: 'stealth', re: /\b(?:stealth|furtividade)\b/i },
  { id: 'society', re: /\b(?:society|sociedade)\b/i },
  { id: 'arcana', re: /\b(?:arcana|arcanismo)\b/i },
  { id: 'nature', re: /\b(?:nature|natureza)\b/i },
]

const TRAIN_SENTENCE =
  /(?:you (?:gain the trained proficiency(?: rank)? in|become trained in|are trained in|were trained in)|you're trained in|fica(?:m)? treinado(?:a|s)? em|você fica treinado(?:a)? em|voc[eê] (?:é|e) treinado(?:a)? em)\s+([^.]+?)(?:\.|$)/gi

const EXPERT_SENTENCE =
  /(?:you become an expert in|you're an expert in|fica(?:m)? perito(?:a|s)? em|você fica perito(?:a)? em)\s+([^.]+?)(?:\.|$)/gi

const MASTER_SENTENCE =
  /(?:you become a master in|you're a master in|fica(?:m)? mestre(?:s)? em|você fica mestre em)\s+([^.]+?)(?:\.|$)/gi

const WEAPON_OR_SPELL =
  /^(?:with |with the |in all weapons|in modificador|em modificador|em ataque)/i

function extractSkillIds(text: string): SkillId[] {
  const found: SkillId[] = []
  for (const { id, re } of SKILL_PATTERNS) {
    if (re.test(text) && !found.includes(id)) found.push(id)
  }
  return found
}

function mentionsBump(description: string): boolean {
  return (
    /if you were already trained.{0,80}become an expert/i.test(description) ||
    /if already trained.{0,80}(?:you )?(?:instead )?become an expert/i.test(
      description,
    ) ||
    /se já (?:for|fosse|é|era) treinado.{0,80}fica perito/i.test(description)
  )
}

function mentionsReplace(description: string): boolean {
  if (mentionsBump(description) && !/skill of your choice|outra per[ií]cia/i.test(description)) {
    return false
  }
  return (
    /instead become trained in a skill of your choice/i.test(description) ||
    /if you (?:would automatically become|would automatically be|were already|are already|would be automatically) trained/i.test(
      description,
    ) ||
    /se já (?:for|fosse|é|era) treinado/i.test(description) ||
    /ou em outra perícia se já/i.test(description)
  )
}

function formatLoreName(name: string): string {
  const trimmed = name.trim()
  const m = trimmed.match(/^(.+?)\s+Lore$/i)
  if (m) return `Conhecimento ${m[1]}`
  return trimmed
}

function loreNameFromMatch(raw: string): string[] {
  const cleaned = raw
    .replace(/\.$/, '')
    .replace(/^either\s+/i, '')
    .trim()
  if (!cleaned) return []
  if (/\bor\b/i.test(cleaned)) {
    return cleaned
      .split(/\bor\b/i)
      .map((p) => p.trim())
      .filter(Boolean)
  }
  return [cleaned]
}

function skillGrant(
  skillId: SkillId,
  rank: ProficiencyRank,
  replaceIfTrained: boolean,
  bumpIfAlready: boolean,
): FeatEffect {
  return {
    kind: 'skillRank',
    skillId,
    rank,
    replaceIfTrained,
    bumpIfAlready: bumpIfAlready || undefined,
  }
}

function effectsFromSkillFragment(
  fragment: string,
  replaceIfTrained: boolean,
  choiceSeq: { n: number },
  rank: ProficiencyRank = 'trained',
  bumpIfAlready = false,
): FeatEffect[] {
  const text = fragment.trim()
  if (!text || WEAPON_OR_SPELL.test(text)) return []

  const choiceOf = text.match(/your choice of\s+(.+)/i)
  if (choiceOf) {
    const opts = extractSkillIds(choiceOf[1] ?? '')
    if (opts.length === 0) return []
    choiceSeq.n += 1
    return [
      {
        kind: 'skillRankChoice',
        choiceId: `choice-${choiceSeq.n}`,
        skillOptions: opts,
        rank,
        replaceIfTrained,
        bumpIfAlready: bumpIfAlready || undefined,
      },
    ]
  }

  const andEither = text.match(/^(.+?)\s+and either\s+(.+)/i)
  if (andEither) {
    const fixed = extractSkillIds(andEither[1] ?? '')
    const opts = extractSkillIds(andEither[2] ?? '')
    const effects: FeatEffect[] = fixed.map((skillId) =>
      skillGrant(skillId, rank, replaceIfTrained, bumpIfAlready),
    )
    if (opts.length > 0) {
      choiceSeq.n += 1
      effects.push({
        kind: 'skillRankChoice',
        choiceId: `either-${choiceSeq.n}`,
        skillOptions: opts,
        rank,
        replaceIfTrained,
        bumpIfAlready: bumpIfAlready || undefined,
      })
    }
    return effects
  }

  const either = text.match(
    /either\s+([^,]+?)\s+or\s+([^,]+?)(?:,?\s+and\s+(.+))?$/i,
  )
  if (either) {
    const opts = [
      ...extractSkillIds(either[1] ?? ''),
      ...extractSkillIds(either[2] ?? ''),
    ]
    const rest = either[3] ? extractSkillIds(either[3]) : []
    const effects: FeatEffect[] = []
    if (opts.length > 0) {
      choiceSeq.n += 1
      effects.push({
        kind: 'skillRankChoice',
        choiceId: `either-${choiceSeq.n}`,
        skillOptions: opts,
        rank,
        replaceIfTrained,
        bumpIfAlready: bumpIfAlready || undefined,
      })
    }
    for (const skillId of rest) {
      effects.push(skillGrant(skillId, rank, replaceIfTrained, bumpIfAlready))
    }
    return effects
  }

  const skills = extractSkillIds(text)
  const hasOr = /(?:\bou\b|\bor\b)/i.test(text)
  const hasAnd = /(?:\be\b|\band\b)/i.test(text)
  if (hasOr && !hasAnd && skills.length >= 2) {
    choiceSeq.n += 1
    return [
      {
        kind: 'skillRankChoice',
        choiceId: `choice-${choiceSeq.n}`,
        skillOptions: skills,
        rank,
        replaceIfTrained,
        bumpIfAlready: bumpIfAlready || undefined,
      },
    ]
  }

  return skills.map((skillId) =>
    skillGrant(skillId, rank, replaceIfTrained, bumpIfAlready),
  )
}

function rankFromWord(raw: string): ProficiencyRank | null {
  const t = raw.toLowerCase()
  if (t.startsWith('legend') || t.startsWith('lend')) return 'legendary'
  if (t.startsWith('master') || t.startsWith('mest')) return 'master'
  if (t.startsWith('expert') || t.startsWith('peri')) return 'expert'
  if (t.startsWith('train') || t.startsWith('trein')) return 'trained'
  return null
}

function parseSavePerceptionRanks(description: string): FeatEffect[] {
  const effects: FeatEffect[] = []
  const seen = new Set<string>()

  function addSave(save: 'fortitude' | 'reflex' | 'will', rank: ProficiencyRank) {
    const key = `save:${save}:${rank}`
    if (seen.has(key)) return
    seen.add(key)
    effects.push({ kind: 'saveRank', save, rank })
  }

  function addPerception(rank: ProficiencyRank) {
    const key = `perception:${rank}`
    if (seen.has(key)) return
    seen.add(key)
    effects.push({ kind: 'perceptionRank', rank })
  }

  const saveRe =
    /proficiency rank for (fortitude|reflex|will) saves? increases to (trained|expert|master|legendary)|profici[eê]ncia em salvaguardas? de (fortitude|reflexos?|vontade) sobe para (treinado|perito|mestre|lend[aá]rio)/gi
  let saveMatch: RegExpExecArray | null
  while ((saveMatch = saveRe.exec(description)) !== null) {
    const rawSave = (saveMatch[1] || saveMatch[3] || '').toLowerCase()
    const rank = rankFromWord(saveMatch[2] || saveMatch[4] || '')
    if (!rank) continue
    if (rawSave.startsWith('fort')) addSave('fortitude', rank)
    else if (rawSave.startsWith('reflex')) addSave('reflex', rank)
    else addSave('will', rank)
  }

  const perceptionRe =
    /proficiency rank for perception increases to (trained|expert|master|legendary)|percep[cç][aã]o sobe para (treinado|perito|mestre|lend[aá]rio)|fica (treinado|perito|mestre|lend[aá]rio) em percep[cç][aã]o/gi
  let percMatch: RegExpExecArray | null
  while ((percMatch = perceptionRe.exec(description)) !== null) {
    const rank = rankFromWord(percMatch[1] || percMatch[2] || percMatch[3] || '')
    if (rank) addPerception(rank)
  }

  return effects
}

/** Treino de armas/armaduras em feitos (ex.: Armadura de Sacerdote de Guerra). */
function parseAttackDefenseTraining(description: string): FeatEffect[] {
  const effects: FeatEffect[] = []
  const seen = new Set<string>()
  const cleaned = description.replace(
    /(?:familiarity with|familiaridade com|treat any of these|trata qualquer)[^.]+/gi,
    ' ',
  )

  function addAttack(
    rank: ProficiencyRank,
    categories: AttackProficiencyCategory[],
  ) {
    const key = `attack:${rank}:${categories.join(',')}`
    if (seen.has(key)) return
    seen.add(key)
    effects.push({ kind: 'attackRank', categories, rank })
  }

  function addDefense(
    rank: ProficiencyRank,
    categories: DefenseProficiencyCategory[],
  ) {
    const key = `defense:${rank}:${categories.join(',')}`
    if (seen.has(key)) return
    seen.add(key)
    effects.push({ kind: 'defenseRank', categories, rank })
  }

  const armorPatterns: Array<{
    re: RegExp
    cats: DefenseProficiencyCategory[]
  }> = [
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in light and medium armou?rs?/gi,
      cats: ['light', 'medium'],
    },
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in (?:all )?heavy armou?rs?/gi,
      cats: ['heavy'],
    },
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in medium armou?rs?/gi,
      cats: ['medium'],
    },
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in light armou?rs?/gi,
      cats: ['light'],
    },
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in unarmored defense/gi,
      cats: ['unarmored'],
    },
    {
      re: /(treinado|perito|mestre|lendário)\s+em armaduras? pesadas?/gi,
      cats: ['heavy'],
    },
    {
      re: /(treinado|perito|mestre|lendário)\s+em armaduras? médias?/gi,
      cats: ['medium'],
    },
    {
      re: /(treinado|perito|mestre|lendário)\s+em armaduras? leves?/gi,
      cats: ['light'],
    },
  ]

  const weaponPatterns: Array<{
    re: RegExp
    cats: AttackProficiencyCategory[]
  }> = [
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in martial weapons(?! as simple)/gi,
      cats: ['martial'],
    },
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in simple weapons/gi,
      cats: ['simple'],
    },
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in advanced weapons(?! as martial)/gi,
      cats: ['advanced'],
    },
    {
      re: /(trained|expert|master|legendary|treinado|perito|mestre|lendário)\s+(?:proficiency rank )?in unarmed (?:attacks|strikes)/gi,
      cats: ['unarmed'],
    },
    {
      re: /(treinado|perito|mestre|lendário)\s+em armas marciais/gi,
      cats: ['martial'],
    },
    {
      re: /(treinado|perito|mestre|lendário)\s+em armas simples/gi,
      cats: ['simple'],
    },
    {
      re: /(treinado|perito|mestre|lendário)\s+em armas avançadas/gi,
      cats: ['advanced'],
    },
  ]

  for (const { re, cats } of armorPatterns) {
    const clone = new RegExp(re.source, 'gi')
    let match: RegExpExecArray | null
    while ((match = clone.exec(cleaned)) !== null) {
      const rank = rankFromWord(match[1] ?? '')
      if (rank) addDefense(rank, cats)
    }
  }
  for (const { re, cats } of weaponPatterns) {
    const clone = new RegExp(re.source, 'gi')
    let match: RegExpExecArray | null
    while ((match = clone.exec(cleaned)) !== null) {
      const rank = rankFromWord(match[1] ?? '')
      if (rank) addAttack(rank, cats)
    }
  }

  return effects
}

/**
 * Lê a descrição do feito (EN do AoN ou PT) e extrai bônus que a ficha
 * consegue aplicar sozinha: PV, deslocamento, treino de perícia, armas,
 * armaduras, Ferro Desimpedido e Conhecimento extra.
 */
export function parseFeatDescriptionEffects(feat: Feat): FeatEffect[] {
  const description = feat.description ?? ''
  if (!description.trim()) return []

  const effects: FeatEffect[] = []

  if (
    /Increase your maximum Hit Points by your level/i.test(description) ||
    /Aumente seu máximo de PV pelo seu nível/i.test(description)
  ) {
    effects.push({ kind: 'hpPerLevel', value: 1 })
  }

  const replaceIfTrained = mentionsReplace(description)
  const bumpIfAlready = mentionsBump(description)
  const choiceSeq = { n: 0 }
  const skillSentencePasses: Array<{
    re: RegExp
    rank: ProficiencyRank
  }> = [
    { re: new RegExp(TRAIN_SENTENCE.source, 'gi'), rank: 'trained' },
    { re: new RegExp(EXPERT_SENTENCE.source, 'gi'), rank: 'expert' },
    { re: new RegExp(MASTER_SENTENCE.source, 'gi'), rank: 'master' },
  ]
  for (const { re, rank } of skillSentencePasses) {
    let match: RegExpExecArray | null
    while ((match = re.exec(description)) !== null) {
      effects.push(
        ...effectsFromSkillFragment(
          match[1] ?? '',
          replaceIfTrained,
          choiceSeq,
          rank,
          rank === 'trained' ? bumpIfAlready : false,
        ),
      )
    }
  }

  const rankUpRe =
    /(?:your )?proficiency rank in\s+([^.]{2,80}?)\s+increases to (trained|expert|master|legendary)|(?:a )?sua profici[eê]ncia em\s+([^.]{2,80}?)\s+sobe para (treinado|perito|mestre|lend[aá]rio)/gi
  let rankUp: RegExpExecArray | null
  while ((rankUp = rankUpRe.exec(description)) !== null) {
    const fragment = rankUp[1] || rankUp[3] || ''
    const rank = rankFromWord(rankUp[2] || rankUp[4] || '')
    if (!rank || WEAPON_OR_SPELL.test(fragment)) continue
    effects.push(
      ...effectsFromSkillFragment(fragment, false, choiceSeq, rank, false),
    )
  }

  effects.push(...parseSavePerceptionRanks(description))

  const loreRe =
    /Additional Lore(?: general)? feat for(?: either)? ([^.]+)/gi
  let loreMatch: RegExpExecArray | null
  while ((loreMatch = loreRe.exec(description)) !== null) {
    for (const name of loreNameFromMatch(loreMatch[1] ?? '')) {
      const loreName = formatLoreName(
        /lore$/i.test(name) ? name.trim() : `${name.trim()} Lore`,
      )
      effects.push({ kind: 'lore', loreName, rank: 'trained' })
    }
  }

  const ptLore = description.match(
    /Conhecimento Adicional[^.]{0,40}(?:para|de)\s+([^.]+)/i,
  )
  if (ptLore && !effects.some((e) => e.kind === 'lore')) {
    effects.push({
      kind: 'lore',
      loreName: ptLore[1]?.trim() ?? 'Lore',
      rank: 'trained',
    })
  }

  effects.push(...parseAttackDefenseTraining(description))

  const familiarity = parseWeaponFamiliarityFromText(description, feat.name)
  if (familiarity) {
    effects.push({
      kind: 'weaponFamiliarity',
      weapons: familiarity.weapons,
      traits: familiarity.traits,
      groups: familiarity.groups,
      martialAsSimple: familiarity.martialAsSimple,
      advancedAsMartial: familiarity.advancedAsMartial,
      critSpecAtLevel: familiarity.critSpecAtLevel,
      accessUncommonTrait: familiarity.accessUncommonTrait,
    })
  }

  for (const bonus of parseCircumstanceBonusesFromText(description, feat.name)) {
    effects.push({
      kind: 'circumstanceBonus',
      value: bonus.value,
      appliesTo: bonus.appliesTo,
    })
  }

  effects.push(...parsePassiveNumericEffects(description, feat))

  return effects
}

function metersToSpeedFeet(meters: number): number {
  return Math.round((meters * 10) / 3 / 5) * 5
}

function featIsCombatStance(feat: Feat): boolean {
  return (feat.traits ?? []).some((trait) =>
    /stance|postura/i.test(trait),
  )
}

function sentenceLooksCircumstantial(sentence: string): boolean {
  return (
    /eidolon|companion|familiar|animal companion|mount\b|minion|thrall|pet\b|construct companion/i.test(
      sentence,
    ) ||
    /while (?:you are |you're )?(?:raging|in \w[\w'-]* stance|you have panache)/i.test(
      sentence,
    ) ||
    /quando (?:você )?estiver (?:em fúria|em postura|com panache)/i.test(
      sentence,
    ) ||
    /\binstead\b/i.test(sentence) ||
    /\bem vez\b/i.test(sentence) ||
    /for 1 minute|for 1 round|until the start of your next turn|por 1 minuto|por 1 rodada/i.test(
      sentence,
    ) ||
    /during this|during these|during overland|this Stride|you Stride|Stride twice|Stride once|Stride with|Distanciar/i.test(
      sentence,
    )
  )
}

function parsePassiveNumericEffects(description: string, feat: Feat): FeatEffect[] {
  const effects: FeatEffect[] = []
  const ancestryStack =
    feat.category === 'ancestry' ||
    /isn't cumulative with any Speed increase from (?:your |other )?ancestry feats/i.test(
      description,
    ) ||
    /não é cumulativo com qualquer aumento de Deslocamento (?:de seus talentos|de outros talentos) de ancestralidade/i.test(
      description,
    )

  const skipSpeed = featIsCombatStance(feat)
  const sentences = description.split(/(?<=[.!?])\s+|\n+/)
  let speedFeet = 0
  let unarmoredOnly = false

  for (const raw of sentences) {
    const sentence = raw.trim()
    if (!sentence || sentenceLooksCircumstantial(sentence)) continue
    if (skipSpeed) continue

    const unarmored =
      /not wearing armou?r|não estiver (?:de |usando )?armadura|sem armadura|unarmored/i.test(
        sentence,
      )

    const feet =
      sentence.match(
        /(?:your |the )?Speed increases by (\d+)\s*feet/i,
      ) ??
      sentence.match(
        /increases your Speed by (\d+)\s*feet/i,
      ) ??
      sentence.match(
        /\+(\d+)\s*-?\s*(?:foot|feet)(?: of)?(?: status| circumstance)? bonus to (?:your )?Speeds?/i,
      ) ??
      sentence.match(
        /(?:status )?bonus of \+(\d+)\s*feet to (?:your )?Speeds?/i,
      ) ??
      sentence.match(
        /ganha \+(\d+)\s*pés de bônus de status nos? Deslocamentos?/i,
      ) ??
      sentence.match(
        /\+(\d+)\s*pés de bônus de status no Deslocamento/i,
      )

    if (feet) {
      const value = Number(feet[1])
      if (Number.isFinite(value) && value > 0) {
        speedFeet += value
        if (unarmored) unarmoredOnly = true
      }
      continue
    }

    const meters =
      sentence.match(
        /Deslocamento aumenta em ([\d]+(?:[.,]\d+)?)\s*m/i,
      ) ??
      sentence.match(
        /\+([\d]+(?:[.,]\d+)?)\s*m de (?:bônus de )?status (?:no|à|a) (?:Deslocamento|Velocidade)/i,
      ) ??
      sentence.match(
        /bônus de status no Deslocamento de \+([\d]+(?:[.,]\d+)?)\s*m/i,
      )

    if (meters) {
      const value = metersToSpeedFeet(
        Number((meters[1] ?? '').replace(',', '.')),
      )
      if (value > 0) {
        speedFeet += value
        if (unarmored) unarmoredOnly = true
      }
    }
  }

  if (speedFeet > 0) {
    effects.push({
      kind: 'speedBonus',
      value: speedFeet,
      unarmoredOnly: unarmoredOnly || undefined,
      stackGroup: ancestryStack ? 'ancestry' : undefined,
    })
  }

  if (
    /Ignore the reduction to your Speed from any armou?r/i.test(description) ||
    /Ignore a redução do seu Deslocamento de qualquer armadura/i.test(
      description,
    )
  ) {
    effects.push({ kind: 'ignoreArmorSpeedPenalty' })
  }

  if (
    /deduct 5 feet from the penalty/i.test(description) ||
    /subtraia 1,5 m da penalidade/i.test(description)
  ) {
    effects.push({ kind: 'reduceOtherSpeedPenalties', value: 5 })
  }

  const hpFlat =
    description.match(
      /Increase your maximum Hit Points by (\d+)(?!\s+your level)/i,
    ) ??
    description.match(
      /your maximum Hit Points increase by (\d+)(?!\s+your level)/i,
    ) ??
    description.match(/Aumente seu máximo de PV em (\d+)/i)
  if (hpFlat && !/by your level|pelo seu nível/i.test(hpFlat[0] ?? '')) {
    const value = Number(hpFlat[1])
    if (Number.isFinite(value) && value > 0) {
      effects.push({ kind: 'hpFlat', value })
    }
  }

  if (
    /die from the dying condition at dying 5/i.test(description) ||
    /dying condition has 5 levels instead of 4/i.test(description) ||
    /morre.{0,40}morrendo 5/i.test(description)
  ) {
    effects.push({ kind: 'dyingMax', value: 5 })
  }

  return effects
}

const BASIC_CLASS_FEAT =
  /1st-\s*or\s*2nd-level\s+.+\s+feat|(?:feito|talento) de\s+.{3,40}\s+de\s+1[ºo°] ou 2[ºo°]\s+n[ií]vel/i
const GRANTS_CLASS_FEAT =
  /you gain (?:a |one )?.{0,40}feat|voc[eê] ganha um (?:feito|talento) de/i
const ADVANCED_CLASS_FEAT =
  /half your character level|metade do (?:seu )?n[ií]vel|n[ií]vel de\s+.{3,40}\s*=\s*metade|n[ií]vel de\s+.{3,40}\s+[eé]\s+a metade/i

/** Manobra Básica / Avançada e equivalentes de multiclasse. */
export function inferMulticlassGrantedFeatChoice(
  feat: Feat,
): Extract<FeatEffect, { kind: 'grantedFeatChoice' }> | null {
  if (feat.category !== 'archetype' || !feat.archetypeId) return null
  if (/spellcasting/i.test(feat.originalName)) return null
  const classId = getArchetype(feat.archetypeId)?.multiclassClassId
  if (!classId) return null

  const text = feat.description
  if (/skill feat|feito de per[ií]cia|talento de per[ií]cia/i.test(text)) {
    return null
  }
  const isBasic = BASIC_CLASS_FEAT.test(text)
  const isAdvanced = GRANTS_CLASS_FEAT.test(text) && ADVANCED_CLASS_FEAT.test(text)
  if (!isBasic && !isAdvanced) return null

  const excludedTraits: string[] = []
  if (/wandering|errante/i.test(text)) {
    excludedTraits.push('wandering', 'Wandering', 'Errante')
  }

  return {
    kind: 'grantedFeatChoice',
    choiceId: 'feat',
    classId,
    category: 'class',
    maxLevel: isAdvanced && !isBasic ? 'halfCharacterLevel' : 2,
    excludedTraits: excludedTraits.length > 0 ? excludedTraits : undefined,
    hint: isAdvanced && !isBasic
      ? 'Escolha um feito dessa classe. Para os pré-requisitos, o nível de classe é a metade do seu nível.'
      : 'Escolha um feito de 1º ou 2º nível dessa classe.',
  }
}

function loreKey(name: string): string {
  return name.toLowerCase().replace(/\s*\(.*$/, '').trim()
}

function parsedEffectIsRedundant(
  parsed: FeatEffect,
  existing: FeatEffect[],
): boolean {
  if (parsed.kind === 'skillRank') {
    return existing.some(
      (effect) =>
        (effect.kind === 'skillRank' && effect.skillId === parsed.skillId) ||
        (effect.kind === 'skillRankChoice' &&
          (effect.skillOptions?.includes(parsed.skillId) ?? false)),
    )
  }
  if (parsed.kind === 'skillRankChoice') {
    return existing.some(
      (effect) =>
        effect.kind === 'skillRankChoice' ||
        (effect.kind === 'skillRank' &&
          parsed.skillOptions?.includes(effect.skillId)),
    )
  }
  if (parsed.kind === 'lore') {
    const key = loreKey(parsed.loreName)
    return existing.some(
      (effect) => effect.kind === 'lore' && loreKey(effect.loreName) === key,
    )
  }
  if (parsed.kind === 'saveRank') {
    return existing.some(
      (effect) => effect.kind === 'saveRank' && effect.save === parsed.save,
    )
  }
  return existing.some((effect) => effect.kind === parsed.kind)
}

function inferArchetypeSpellcastingTier(
  feat: Feat,
): Extract<FeatEffect, { kind: 'spellcastingTier' }> | null {
  if (feat.category !== 'archetype' || !feat.archetypeId) return null
  const blob = `${feat.originalName}\n${feat.name}\n${feat.description}`
  const original = feat.originalName
  let tier: 'basic' | 'expert' | 'master' | null = null
  if (
    /master spellcasting|conjura[cç][aã]o magistral/i.test(blob) &&
    !/basic|expert|b[aá]sica|experiente/i.test(original)
  ) {
    tier = 'master'
  } else if (
    /expert spellcasting|conjura[cç][aã]o experiente/i.test(blob) &&
    !/basic|b[aá]sica/i.test(original)
  ) {
    tier = 'expert'
  } else if (
    /basic spellcasting|conjura[cç][aã]o b[aá]sica|benef[ií]cios de conjura[cç][aã]o b[aá]sica/i.test(
      blob,
    )
  ) {
    tier = 'basic'
  }
  if (!tier) return null
  const slug = feat.archetypeId.replace(/^archetype-/, '')
  return {
    kind: 'spellcastingTier',
    sourceId: `spellcasting-${slug}-archetype`,
    tier,
  }
}

export function effectsForFeat(feat: Feat): FeatEffect[] {
  const explicit = feat.effects ?? []
  const parsed = parseFeatDescriptionEffects(feat)
  const base = [
    ...explicit,
    ...parsed.filter((effect) => !parsedEffectIsRedundant(effect, explicit)),
  ]
  const inferredFeat = inferMulticlassGrantedFeatChoice(feat)
  const withFeat =
    inferredFeat && !base.some((effect) => effect.kind === 'grantedFeatChoice')
      ? [...base, inferredFeat]
      : base
  const inferredSpell = inferArchetypeSpellcastingTier(feat)
  if (
    inferredSpell &&
    !withFeat.some((effect) => effect.kind === 'spellcastingTier')
  ) {
    return [...withFeat, inferredSpell]
  }
  return withFeat
}

export function isKnownSkillId(value: string): value is SkillId {
  return (SKILL_IDS as string[]).includes(value)
}
