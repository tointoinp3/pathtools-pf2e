import type {
  Character,
  CharacterClass,
  Deity,
  DeityChoices,
  DivineDomain,
  DivineFont,
  Feat,
  PendingSkillChoice,
  Sanctification,
  SkillId,
  Spell,
} from '@/types'
import { emptyDeityChoices } from '@/types/deity'
import {
  CLASS_CHAMPION_ID,
  CLASS_CLERIC_ID,
} from '@/data/seeds/ids'
import { getDeityById } from './deityCatalog'
import { getDomainById, getDomainByOriginalName } from '@/data/seeds/domains'
import { localizeDeityWeapon, localizeDomainName } from '@/data/i18n/deityLabelsPt'
import { localizeSpellName } from '@/data/i18n/spellNamesPt'
import { ATTRIBUTE_LABELS, SKILL_LABELS } from '@/utils/labels'
import { catalogSpells } from '@/data/seeds/spells'
import { getHomebrewSpells } from './spellRegistry'
import { findSpellByOriginalName } from './grantedSpells'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'

export const DIVINE_FONT_LABELS: Record<DivineFont, string> = {
  heal: 'Curar',
  harm: 'Ferir',
}

export const SANCTIFICATION_LABELS: Record<Sanctification | 'none', string> = {
  holy: 'Sagrado',
  unholy: 'Profano',
  none: 'Nenhum',
}

const SPELL_ACTION_LABELS: Record<string, string> = {
  free: 'livre',
  reaction: 'reação',
  one: '1 ação',
  two: '2 ações',
  three: '3 ações',
}

export interface SpellRulesView {
  name: string
  meta: string
  body: string
  actionType?: Spell['actionType']
  found: boolean
}

function spellsForDeity(catalog?: Spell[]): Spell[] {
  return catalog ?? [...catalogSpells, ...getHomebrewSpells()]
}

/** Magia do catálogo já traduzida, para domínio, fonte e lista de clérigo. */
export function spellViewForRules(
  originalName: string,
  catalog?: Spell[],
): SpellRulesView {
  const spell = findSpellByOriginalName(spellsForDeity(catalog), originalName)
  const fallback = localizeSpellName(originalName)
  if (!spell) {
    return {
      name: fallback,
      meta: '',
      body: 'Texto desta magia ainda não está no catálogo.',
      found: false,
    }
  }
  const view = withLocalizedSpell(spell)
  const meta: string[] = []
  if (view.focus) meta.push('Magia de foco')
  if (view.rank === 0) meta.push('Truque')
  else if (view.rank != null) meta.push(`${view.rank}º posto`)
  if (view.actionType) {
    meta.push(SPELL_ACTION_LABELS[view.actionType] ?? view.actionType)
  }
  if (view.range) meta.push(`Alcance ${view.range}`)
  if (view.targets) meta.push(`Alvos: ${view.targets}`)
  if (view.area) meta.push(`Área: ${view.area}`)
  if (view.defense) meta.push(`Defesa: ${view.defense}`)
  if (view.duration) meta.push(`Duração: ${view.duration}`)
  const extras: string[] = []
  if (view.trigger) extras.push(`Gatilho: ${view.trigger}`)
  if (view.requirements) extras.push(`Requisitos: ${view.requirements}`)
  const body = [
    ...extras,
    (view.description || view.summary || '').trim(),
  ]
    .filter(Boolean)
    .join('\n\n')
  return {
    name: view.name,
    meta: meta.join(' · '),
    body: body || fallback,
    actionType: view.actionType,
    found: true,
  }
}

export function spellRulesBlurb(
  originalName: string,
  options?: { includeName?: boolean; catalog?: Spell[] },
): string {
  const view = spellViewForRules(originalName, options?.catalog)
  const parts: string[] = []
  if (options?.includeName !== false) parts.push(view.name)
  if (view.meta) parts.push(view.meta)
  if (view.body) parts.push(view.body)
  return parts.join('\n')
}

export function domainRulesBlurb(
  domain: DivineDomain,
  catalog?: Spell[],
): string {
  const parts = [
    `Magia inicial — ${localizeSpellName(domain.initialSpell)}\n${spellRulesBlurb(domain.initialSpell, { includeName: false, catalog })}`,
  ]
  if (domain.advancedSpell) {
    parts.push(
      `Magia avançada (feito Domínio Avançado) — ${localizeSpellName(domain.advancedSpell)}\n${spellRulesBlurb(domain.advancedSpell, { includeName: false, catalog })}`,
    )
  }
  return parts.join('\n\n')
}

export function fontChoiceDescription(
  font: DivineFont,
  options?: { clericSlots?: boolean; catalog?: Spell[] },
): string {
  const slots =
    options?.clericSlots === false
      ? 'Fonte da divindade. Clérigos ganham espaços extras desta magia; campeões não.'
      : 'Espaços extras no posto mais alto de magia de clérigo, só para esta magia: 4 no 1º nível, 5 no 5º, 6 no 15º. Escolha permanente.'
  const spellName = font === 'heal' ? 'Heal' : 'Harm'
  return `${slots}\n\n${spellRulesBlurb(spellName, { catalog: options?.catalog })}`
}

export const SANCTIFICATION_CHOICE_DESCRIPTIONS: Record<
  Sanctification | 'none',
  string
> = {
  holy: 'Você ganha o traço sagrado. Magias e ações santificadas ganham o traço sagrado.',
  unholy:
    'Você ganha o traço profano. Magias e ações santificadas ganham o traço profano.',
  none: 'Você permanece sem o traço sagrado ou profano. Magias santificadas não ganham nenhum dos dois.',
}

const DOMAIN_INITIATE_FEAT_IDS = new Set([
  'feat-cleric-domain-initiate',
  'feat-cleric-expanded-domain-initiate',
  'feat-champion-deitys-domain',
])

export function classUsesDeityMechanics(
  classId?: string | null,
): boolean {
  return classId === CLASS_CLERIC_ID || classId === CLASS_CHAMPION_ID
}

export function classRequiresDeity(classId?: string | null): boolean {
  return classUsesDeityMechanics(classId)
}

/** Espaços extras da Fonte Divina (clérigo): 4 / 5 / 6. */
export function divineFontSlotCount(level: number): number {
  if (level >= 15) return 6
  if (level >= 5) return 5
  return 4
}

export interface ResolvedDeityBenefits {
  deity: Deity | null
  choices: DeityChoices
  /** Perícia divina — só clérigo/campeão. */
  skillId?: SkillId
  resolvedFont?: DivineFont
  resolvedSanctification?: Sanctification | 'none'
  extraSpellOriginalNames: string[]
  grantedFocusSpellOriginalNames: string[]
  fontSlotCount: number
  specialAbilities: Array<{
    id: string
    name: string
    description: string
    sourceLabel: string
    actionType?: string
  }>
  pendingChoices: PendingSkillChoice[]
}

function selectedFeatIds(character: Character): Set<string> {
  return new Set(
    (character.featSelections ?? [])
      .map((s) => s.featId)
      .filter((id): id is string => Boolean(id)),
  )
}

function needsDomainChoice(
  character: Character,
  characterClass?: CharacterClass | null,
): boolean {
  if (character.classChoices?.subclassId === 'doctrine-cloistered') return true
  const feats = selectedFeatIds(character)
  for (const id of DOMAIN_INITIATE_FEAT_IDS) {
    if (feats.has(id)) return true
  }
  void characterClass
  return false
}

function fontResolved(deity: Deity, choices: DeityChoices): DivineFont | undefined {
  if (deity.font.length === 1) return deity.font[0]
  if (deity.font.length > 1 && choices.font && deity.font.includes(choices.font)) {
    return choices.font
  }
  return undefined
}

function sanctificationResolved(
  deity: Deity,
  choices: DeityChoices,
): Sanctification | 'none' | undefined {
  if (deity.sanctification.length === 0) return 'none'
  if (deity.sanctificationRequired && deity.sanctification.length === 1) {
    return deity.sanctification[0]
  }
  if (choices.sanctification === 'none' && !deity.sanctificationRequired) {
    return 'none'
  }
  if (
    choices.sanctification &&
    choices.sanctification !== 'none' &&
    deity.sanctification.includes(choices.sanctification)
  ) {
    return choices.sanctification
  }
  return undefined
}

export function resolveDeityBenefits(
  character: Character,
  characterClass?: CharacterClass | null,
  _featCatalog: Feat[] = [],
): ResolvedDeityBenefits {
  const deity = getDeityById(character.deityId)
  const choices = character.deityChoices ?? emptyDeityChoices()
  const empty: ResolvedDeityBenefits = {
    deity,
    choices,
    extraSpellOriginalNames: [],
    grantedFocusSpellOriginalNames: [],
    fontSlotCount: 0,
    specialAbilities: [],
    pendingChoices: [],
  }
  if (!deity) return empty

  const mechanical = classUsesDeityMechanics(character.classId)
  const isCleric = character.classId === CLASS_CLERIC_ID
  const pending: PendingSkillChoice[] = []
  const specialAbilities: ResolvedDeityBenefits['specialAbilities'] = []
  const sourceLabel = deity.name

  const resolvedFont = fontResolved(deity, choices)
  const resolvedSanctification = sanctificationResolved(deity, choices)

  const spellCatalog = spellsForDeity()

  if (mechanical && deity.font.length > 1 && !resolvedFont) {
    const optionDescriptions: Record<string, string> = {}
    for (const font of deity.font) {
      optionDescriptions[font] = fontChoiceDescription(font, {
        clericSlots: isCleric,
        catalog: spellCatalog,
      })
    }
    pending.push({
      key: 'font',
      store: 'deity',
      label: 'Fonte divina',
      hint: 'Escolha permanente: espaços extras só para Curar ou só para Ferir.',
      options: deity.font,
      selected: choices.font,
      valueKind: 'font',
      optionLabels: DIVINE_FONT_LABELS,
      optionDescriptions,
    })
  }

  if (mechanical && deity.sanctification.length > 0 && !resolvedSanctification) {
    const options: string[] = [...deity.sanctification]
    const labels: Record<string, string> = { ...SANCTIFICATION_LABELS }
    const optionDescriptions: Record<string, string> = {}
    for (const sanct of deity.sanctification) {
      optionDescriptions[sanct] = SANCTIFICATION_CHOICE_DESCRIPTIONS[sanct]
    }
    if (!deity.sanctificationRequired) {
      options.push('none')
      optionDescriptions.none = SANCTIFICATION_CHOICE_DESCRIPTIONS.none
    }
    pending.push({
      key: 'sanctification',
      store: 'deity',
      label: 'Santificação',
      hint: deity.sanctificationRequired
        ? 'Sua divindade exige uma santificação.'
        : 'Pode santificar-se ou permanecer sem o traço.',
      options,
      selected: choices.sanctification,
      valueKind: 'sanctification',
      optionLabels: labels,
      optionDescriptions,
    })
  }

  const domainOptions = deity.primaryDomains.length
    ? deity.primaryDomains
    : deity.domains
  const selectedDomain: DivineDomain | null = choices.domainId
    ? getDomainById(choices.domainId)
    : null
  const domainMatchesDeity =
    selectedDomain != null &&
    deity.domains.some(
      (name) => name.toLowerCase() === selectedDomain.originalName.toLowerCase(),
    )

  if (mechanical && needsDomainChoice(character, characterClass) && !domainMatchesDeity) {
    const optionLabels: Record<string, string> = {}
    const options: string[] = []
    for (const name of domainOptions) {
      const domain = getDomainByOriginalName(name)
      if (!domain) continue
      options.push(domain.id)
      optionLabels[domain.id] = localizeDomainName(domain.originalName)
    }
    if (options.length > 0) {
      const optionDescriptions: Record<string, string> = {}
      for (const id of options) {
        const domain = getDomainById(id)
        if (!domain) continue
        optionDescriptions[id] = domainRulesBlurb(domain, spellCatalog)
      }
      pending.push({
        key: 'domain',
        store: 'deity',
        label: 'Domínio',
        hint: 'Iniciado de Domínio: escolha um domínio da sua divindade. O motor não escolhe por você.',
        options,
        selected: choices.domainId,
        valueKind: 'domain',
        optionLabels,
        optionDescriptions,
      })
    }
  }

  if (deity.edicts.length > 0) {
    specialAbilities.push({
      id: `deity-edicts-${deity.id}`,
      name: 'Editos',
      description: deity.edicts.join('; '),
      sourceLabel,
      actionType: 'passive',
    })
  }
  if (deity.anathema.length > 0) {
    specialAbilities.push({
      id: `deity-anathema-${deity.id}`,
      name: 'Anátema',
      description: deity.anathema.join('; '),
      sourceLabel,
      actionType: 'passive',
    })
  }

  if (deity.favoredWeapons.length > 0) {
    const weapons = deity.favoredWeapons.map(localizeDeityWeapon).join(', ')
    specialAbilities.push({
      id: `deity-weapon-${deity.id}`,
      name: 'Arma favorita',
      description: mechanical
        ? `${weapons}. Treinado (e acesso, se incomum). Clérigo e campeão usam esta arma como deífica.`
        : weapons,
      sourceLabel,
      actionType: 'passive',
    })
  }

  if (mechanical && resolvedSanctification && resolvedSanctification !== 'none') {
    specialAbilities.push({
      id: `deity-sanctification-${deity.id}`,
      name: SANCTIFICATION_LABELS[resolvedSanctification],
      description: SANCTIFICATION_CHOICE_DESCRIPTIONS[resolvedSanctification],
      sourceLabel,
      actionType: 'passive',
    })
  } else if (
    mechanical &&
    resolvedSanctification === 'none' &&
    deity.sanctification.length > 0
  ) {
    specialAbilities.push({
      id: `deity-sanctification-${deity.id}`,
      name: 'Sem santificação',
      description: SANCTIFICATION_CHOICE_DESCRIPTIONS.none,
      sourceLabel,
      actionType: 'passive',
    })
  }

  if (mechanical && resolvedFont) {
    const slotLine = isCleric
      ? `Neste nível: ${divineFontSlotCount(character.level)} espaços extras no posto mais alto, só para ${DIVINE_FONT_LABELS[resolvedFont]}.`
      : undefined
    specialAbilities.push({
      id: `deity-font-${deity.id}`,
      name: `Fonte divina (${DIVINE_FONT_LABELS[resolvedFont]})`,
      description: [slotLine, fontChoiceDescription(resolvedFont, {
        clericSlots: isCleric,
        catalog: spellCatalog,
      })]
        .filter(Boolean)
        .join('\n\n'),
      sourceLabel,
      actionType: 'passive',
    })
  }

  if (deity.attributes.length > 0) {
    specialAbilities.push({
      id: `deity-attributes-${deity.id}`,
      name: 'Atributos divinos',
      description: deity.attributes.map((id) => ATTRIBUTE_LABELS[id]).join(' ou '),
      sourceLabel,
      actionType: 'passive',
    })
  }

  const grantedFocus: string[] = []
  if (domainMatchesDeity && selectedDomain) {
    grantedFocus.push(selectedDomain.initialSpell)
    const initialView = spellViewForRules(
      selectedDomain.initialSpell,
      spellCatalog,
    )
    specialAbilities.push({
      id: `deity-domain-${selectedDomain.id}`,
      name: `Domínio: ${localizeDomainName(selectedDomain.originalName)}`,
      description: domainRulesBlurb(selectedDomain, spellCatalog),
      sourceLabel,
      actionType: initialView.actionType ?? 'passive',
    })
  }

  return {
    deity,
    choices,
    skillId: mechanical ? deity.skillId : undefined,
    resolvedFont: mechanical ? resolvedFont : undefined,
    resolvedSanctification: mechanical ? resolvedSanctification : undefined,
    extraSpellOriginalNames: isCleric ? deity.clericSpells : [],
    grantedFocusSpellOriginalNames: grantedFocus,
    fontSlotCount:
      isCleric && resolvedFont ? divineFontSlotCount(character.level) : 0,
    specialAbilities,
    pendingChoices: pending,
  }
}

export function deitySkillLabel(skillId?: SkillId): string | undefined {
  if (!skillId) return undefined
  return SKILL_LABELS[skillId]
}
