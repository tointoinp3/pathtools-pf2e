import type {
  Ancestry,
  Background,
  Character,
  CharacterClass,
  Feat,
  Heritage,
  PendingSkillChoice,
  ResolvedCharacterSheet,
} from '@/types'
import { emptyAncestryChoices, validateAncestryChoices } from './ancestry'
import { validateBackgroundChoices } from './background'
import { emptyClassChoices, validateClassChoices } from './class'
import { classRequiresDeity } from './deity'
import { collectGrantedClassSpells } from './grantedSpells'
import { getFeatSlots } from './feats'
import { getClassKit } from '@/data/seeds/classKits'
import { initialSpellGaps } from './creationSpells'
import { companionCreationGaps } from './creationCompanions'
import {
  ATTRIBUTE_BOOST_LEVELS,
  getSkillIncreaseLevels,
  incompleteAttributeBoostLevels,
  incompleteSkillIncreaseLevels,
} from './progression'
import { unfinishedPriorDedications } from './archetypes'

export type CreationSectionId =
  | 'ancestry'
  | 'background'
  | 'class'
  | 'deity'
  | 'mythic'
  | 'progression'
  | 'feats'
  | 'spells'
  | 'equipment'
  | 'companions'
  | 'identity'

export interface CreationStep {
  id: string
  section: CreationSectionId
  ancestryTab?: 'ancestry-main' | 'heritage'
  /** Nível da Progressão para abrir (aumentos de atributo/perícia). */
  focusLevel?: number
  label: string
  detail?: string
  required: boolean
  done: boolean
}

export interface CreationChecklist {
  steps: CreationStep[]
  pendingRequired: CreationStep[]
  complete: boolean
}

export function buildCreationChecklist(input: {
  character: Character
  ancestry: Ancestry | null
  heritage: Heritage | null
  background: Background | null
  characterClass: CharacterClass | null
  secondClass?: CharacterClass | null
  sheet: ResolvedCharacterSheet | null
  feats: Feat[]
  freeArchetype?: boolean
  mythicRules?: boolean
  /** GM Core: com Arquétipos grátis, o grupo pode ignorar os 2 feitos extras. */
  ignoreDedicationLock?: boolean
  dualClass?: boolean
  ancestryParagon?: boolean
  gradualAbilityBoosts?: boolean
}): CreationChecklist {
  const {
    character,
    ancestry,
    heritage,
    background,
    characterClass,
    sheet,
    feats,
    freeArchetype,
    mythicRules,
    ignoreDedicationLock,
    dualClass,
    ancestryParagon,
  } = input
  const steps: CreationStep[] = []

  steps.push({
    id: 'concept',
    section: 'identity',
    label: 'Conceito',
    required: false,
    done: Boolean(character.identity?.concept?.trim()),
    detail: character.identity?.concept?.trim() || 'Opcional — quem é essa pessoa?',
  })

  steps.push({
    id: 'ancestry',
    section: 'ancestry',
    ancestryTab: 'ancestry-main',
    label: 'Ancestralidade',
    required: true,
    done: Boolean(character.ancestryId && ancestry),
    detail: ancestry?.name,
  })

  const needsHeritage = Boolean(ancestry && ancestry.heritageIds.length > 0)
  steps.push({
    id: 'heritage',
    section: 'ancestry',
    ancestryTab: 'heritage',
    label: 'Herança',
    required: needsHeritage,
    done: !needsHeritage || Boolean(character.heritageId && heritage),
    detail: heritage?.name,
  })

  if (ancestry) {
    const ancestryIssues = validateAncestryChoices(
      ancestry,
      character.ancestryChoices ?? emptyAncestryChoices(),
      heritage,
    )
    steps.push({
      id: 'ancestry-picks',
      section: 'ancestry',
      ancestryTab: 'ancestry-main',
      label: 'Escolhas da ancestralidade',
      required: true,
      done: ancestryIssues.length === 0,
      detail:
        ancestryIssues.length > 0
          ? ancestryIssues.map((i) => i.message).join(' · ')
          : undefined,
    })
  }

  steps.push({
    id: 'background',
    section: 'background',
    label: 'Origem',
    required: true,
    done: Boolean(character.backgroundId && background),
    detail: background?.name,
  })

  if (background) {
    const bgIssues = validateBackgroundChoices(
      background,
      character.backgroundChoices ?? {
        attributeBoosts: {},
        skillChoices: {},
        loreChoices: {},
        featChoices: {},
      },
    )
    steps.push({
      id: 'background-picks',
      section: 'background',
      label: 'Escolhas da origem',
      required: true,
      done: bgIssues.length === 0,
      detail:
        bgIssues.length > 0 ? bgIssues.map((i) => i.message).join(' · ') : undefined,
    })
  }

  steps.push({
    id: 'class',
    section: 'class',
    label: 'Classe',
    required: true,
    done: Boolean(character.classId && characterClass),
    detail: characterClass?.name,
  })

  if (characterClass) {
    const classIssues = validateClassChoices(
      characterClass,
      character.classChoices ?? emptyClassChoices(),
      sheet?.attributes.find((a) => a.id === 'intelligence')?.modifier,
      character.level,
      character.featChoices,
    )
    steps.push({
      id: 'class-picks',
      section: 'class',
      label: 'Escolhas da classe',
      required: true,
      done: classIssues.length === 0,
      detail:
        classIssues.length > 0
          ? classIssues.map((i) => i.message).join(' · ')
          : undefined,
    })
  }

  if (dualClass) {
    steps.push({
      id: 'second-class',
      section: 'class',
      label: '2ª classe',
      required: true,
      done: Boolean(character.secondClassId),
      detail: 'Variante Classe dupla: escolha a outra classe.',
    })
  }

  const needsDeity = classRequiresDeity(character.classId)
  if (needsDeity) {
    steps.push({
      id: 'deity',
      section: 'deity',
      label: 'Divindade',
      required: true,
      done: Boolean(character.deityId),
    })
    const deityPending = (sheet?.pendingSkillChoices ?? []).filter(
      (choice) =>
        choice.store === 'deity' &&
        (choice.key === 'font' ||
          choice.key === 'sanctification' ||
          choice.key === 'domain'),
    )
    for (const choice of deityPending) {
      steps.push({
        id: `deity-${choice.key}`,
        section: 'deity',
        label: choice.label,
        required: true,
        done: false,
        detail: choice.hint,
      })
    }
  }

  if (mythicRules) {
    steps.push({
      id: 'mythic-calling',
      section: 'mythic',
      label: 'Chamado mítico',
      required: true,
      done: Boolean(character.mythicCallingId),
      detail: 'Você escolhe; o motor não escolhe.',
    })
  }

  steps.push({
    id: 'wealth',
    section: 'equipment',
    label: 'Riqueza inicial',
    required: true,
    done: Boolean(character.startingWealth),
    detail: character.startingWealth
      ? character.startingWealth.kind === 'kit'
        ? 'Kit da classe'
        : '15 po'
      : getClassKit(character.classId)
        ? '15 po ou kit da classe'
        : '15 po',
  })

  if (characterClass && character.level >= 1) {
    const slots = getFeatSlots(character, characterClass, {
      freeArchetype,
      mythicRules,
      mythicCallingId: character.mythicCallingId,
      ancestryParagon,
      secondClass: input.secondClass,
      selections: character.featSelections,
      feats,
    })
    const filled = new Set((character.featSelections ?? []).map((s) => s.slotId))
    const emptyEarned = slots.filter((s) => s.earned !== false && !filled.has(s.id))
    steps.push({
      id: 'feats',
      section: 'feats',
      label: 'Feitos do nível',
      required: emptyEarned.length > 0,
      done: emptyEarned.length === 0,
      detail:
        emptyEarned.length > 0
          ? `${emptyEarned.length} slot${emptyEarned.length > 1 ? 's' : ''} vazio${emptyEarned.length > 1 ? 's' : ''}`
          : undefined,
    })
    const pendingChildFeats = (sheet?.pendingSkillChoices ?? []).filter(
      (choice) => choice.valueKind === 'feat' && choice.store === 'feat',
    )
    if (pendingChildFeats.length > 0) {
      steps.push({
        id: 'archetype-child-feats',
        section: 'feats',
        label: 'Feito concedido',
        required: true,
        done: false,
        detail: pendingChildFeats.map((choice) => choice.label).join(' · '),
      })
    }

    const featsById = new Map(feats.map((feat) => [feat.id, feat]))
    const selectedFeats = (character.featSelections ?? [])
      .map((sel) => featsById.get(sel.featId))
      .filter((feat): feat is Feat => Boolean(feat))
    const featGainedAtLevel = new Map<string, number>()
    const slotById = new Map(slots.map((slot) => [slot.id, slot]))
    for (const sel of character.featSelections ?? []) {
      const slot = slotById.get(sel.slotId)
      if (slot) featGainedAtLevel.set(sel.featId, slot.gainedAtLevel)
    }
    const unfinishedDedications = unfinishedPriorDedications(selectedFeats, {
      ignoreDedicationLock,
      featGainedAtLevel,
    })
    if (unfinishedDedications.length > 0) {
      steps.push({
        id: 'dedication-lock',
        section: 'feats',
        label: 'Feitos entre Dedicações',
        required: true,
        done: false,
        detail: unfinishedDedications
          .map(
            (entry) =>
              `${entry.name}: ${entry.otherFeatCount}/${entry.requiredBeforeNext} extras`,
          )
          .join(' · '),
      })
    }
  }

  if (characterClass) {
    const earnedBoostLevels = ATTRIBUTE_BOOST_LEVELS.filter(
      (level) => level <= character.level,
    )
    if (earnedBoostLevels.length > 0) {
      const boostGaps = incompleteAttributeBoostLevels(character)
      steps.push({
        id: 'attribute-boosts',
        section: 'progression',
        focusLevel: boostGaps[0] ?? earnedBoostLevels[earnedBoostLevels.length - 1],
        label: 'Aumentos de atributo',
        required: true,
        done: boostGaps.length === 0,
        detail:
          boostGaps.length > 0
            ? `4 atributos diferentes em ${formatLevelList(boostGaps)}`
            : formatLevelList(earnedBoostLevels),
      })
    }

    const earnedSkillLevels = [
      ...new Set(
        getSkillIncreaseLevels(characterClass).filter(
          (level) => level <= character.level,
        ),
      ),
    ]
    if (earnedSkillLevels.length > 0) {
      const skillGaps = incompleteSkillIncreaseLevels(character, characterClass)
      steps.push({
        id: 'skill-increases',
        section: 'progression',
        focusLevel: skillGaps[0] ?? earnedSkillLevels[earnedSkillLevels.length - 1],
        label: 'Aumentos de perícia',
        required: true,
        done: skillGaps.length === 0,
        detail:
          skillGaps.length > 0
            ? `${skillGaps.length} em aberto (${formatLevelList(skillGaps)})`
            : `${earnedSkillLevels.length} preenchido${earnedSkillLevels.length > 1 ? 's' : ''}`,
      })
    }
  }

  if (characterClass && sheet?.spellcasting) {
    const granted = collectGrantedClassSpells(
      characterClass,
      character.classChoices ?? emptyClassChoices(),
      character.level,
    )
    if (granted.pending.length > 0) {
      steps.push({
        id: 'granted-spells',
        section: 'class',
        label: 'Magias da especialização',
        required: true,
        done: false,
        detail: granted.pending.map((p) => p.label).join(' · '),
      })
    }
    for (const gap of initialSpellGaps(
      character,
      characterClass,
      sheet.spellcasting,
    )) {
      steps.push({
        id: gap.id,
        section: 'spells',
        label: gap.label,
        required: true,
        done: false,
        detail: gap.detail,
      })
    }
    if (
      sheet.spellcasting.hasSignatureSpells &&
      character.level >= 3
    ) {
      const marked = character.spellState?.signatureSpellIds?.length ?? 0
      const known = character.spellState?.collectionSpellIds?.length ?? 0
      if (known > 0 && marked === 0) {
        steps.push({
          id: 'signature',
          section: 'spells',
          label: 'Magias emblemáticas',
          required: true,
          done: false,
          detail: 'Marque uma magia emblemática por posto a partir do 3º nível',
        })
      }
    }
  }

  for (const gap of companionCreationGaps(character, characterClass)) {
    steps.push({
      id: gap.id,
      section: 'companions',
      label: gap.label,
      required: true,
      done: false,
      detail: gap.detail,
    })
  }

  for (const choice of leftoverPendingChoices(sheet?.pendingSkillChoices)) {
    steps.push({
      id: `pending-${choice.store}-${choice.key}`,
      section: sectionForPendingStore(choice.store),
      ancestryTab: choice.store === 'heritage' ? 'heritage' : undefined,
      label: choice.label,
      required: true,
      done: false,
      detail: choice.hint,
    })
  }

  const pendingRequired = steps.filter((s) => s.required && !s.done)
  return {
    steps,
    pendingRequired,
    complete: pendingRequired.length === 0,
  }
}

export function firstIncompleteSection(
  checklist: CreationChecklist,
): CreationStep | null {
  return checklist.pendingRequired[0] ?? null
}

function formatLevelList(levels: number[]): string {
  if (levels.length === 0) return ''
  if (levels.length <= 6) return levels.map((level) => `nv. ${level}`).join(', ')
  const first = levels[0]
  const last = levels[levels.length - 1]
  return `nv. ${first}–${last} (${levels.length})`
}

function leftoverPendingChoices(
  pending: PendingSkillChoice[] | undefined,
): PendingSkillChoice[] {
  return (pending ?? []).filter((choice) => {
    if (
      choice.store === 'deity' &&
      (choice.key === 'font' ||
        choice.key === 'sanctification' ||
        choice.key === 'domain')
    ) {
      return false
    }
    if (choice.valueKind === 'feat' && choice.store === 'feat') return false
    if (choice.store === 'class') return false
    return true
  })
}

function sectionForPendingStore(
  store: PendingSkillChoice['store'],
): CreationSectionId {
  if (store === 'deity') return 'deity'
  if (store === 'heritage') return 'ancestry'
  if (store === 'class') return 'class'
  return 'feats'
}
