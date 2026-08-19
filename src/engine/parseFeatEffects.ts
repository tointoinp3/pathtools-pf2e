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

const WEAPON_OR_SPELL =
  /^(?:with |with the |in all weapons|in modificador|em modificador|em ataque)/i

function extractSkillIds(text: string): SkillId[] {
  const found: SkillId[] = []
  for (const { id, re } of SKILL_PATTERNS) {
    if (re.test(text) && !found.includes(id)) found.push(id)
  }
  return found
}

function mentionsReplace(description: string): boolean {
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

function effectsFromSkillFragment(
  fragment: string,
  replaceIfTrained: boolean,
  choiceSeq: { n: number },
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
        rank: 'trained',
        replaceIfTrained,
      },
    ]
  }

  const andEither = text.match(/^(.+?)\s+and either\s+(.+)/i)
  if (andEither) {
    const fixed = extractSkillIds(andEither[1] ?? '')
    const opts = extractSkillIds(andEither[2] ?? '')
    const effects: FeatEffect[] = fixed.map((skillId) => ({
      kind: 'skillRank' as const,
      skillId,
      rank: 'trained' as const,
      replaceIfTrained,
    }))
    if (opts.length > 0) {
      choiceSeq.n += 1
      effects.push({
        kind: 'skillRankChoice',
        choiceId: `either-${choiceSeq.n}`,
        skillOptions: opts,
        rank: 'trained',
        replaceIfTrained,
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
        rank: 'trained',
        replaceIfTrained,
      })
    }
    for (const skillId of rest) {
      effects.push({
        kind: 'skillRank',
        skillId,
        rank: 'trained',
        replaceIfTrained,
      })
    }
    return effects
  }

  const skills = extractSkillIds(text)
  return skills.map((skillId) => ({
    kind: 'skillRank' as const,
    skillId,
    rank: 'trained' as const,
    replaceIfTrained,
  }))
}

function rankFromWord(raw: string): ProficiencyRank | null {
  const t = raw.toLowerCase()
  if (t.startsWith('legend') || t.startsWith('lend')) return 'legendary'
  if (t.startsWith('master') || t.startsWith('mest')) return 'master'
  if (t.startsWith('expert') || t.startsWith('peri')) return 'expert'
  if (t.startsWith('train') || t.startsWith('trein')) return 'trained'
  return null
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
  const choiceSeq = { n: 0 }
  const trainRe = new RegExp(TRAIN_SENTENCE.source, 'gi')
  let match: RegExpExecArray | null
  while ((match = trainRe.exec(description)) !== null) {
    const fragment = match[1] ?? ''
    effects.push(
      ...effectsFromSkillFragment(fragment, replaceIfTrained, choiceSeq),
    )
  }

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

export function effectsForFeat(feat: Feat): FeatEffect[] {
  const explicit = feat.effects ?? []
  const parsed = parseFeatDescriptionEffects(feat)
  const seenKinds = new Set(explicit.map((effect) => effect.kind))
  const base = [
    ...explicit,
    ...parsed.filter((effect) => !seenKinds.has(effect.kind)),
  ]
  const inferred = inferMulticlassGrantedFeatChoice(feat)
  if (inferred && !base.some((effect) => effect.kind === 'grantedFeatChoice')) {
    return [...base, inferred]
  }
  return base
}

export function isKnownSkillId(value: string): value is SkillId {
  return (SKILL_IDS as string[]).includes(value)
}
