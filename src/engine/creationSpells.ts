import type {
  Character,
  CharacterClass,
  ResolvedSpellcastingAccess,
} from '@/types'
import {
  accessForSource,
  preparesFromTraditionList,
  syncPreparedSlots,
  usesPreparedSlots,
  usesSpellbookCollection,
} from './spellcasting'
import {
  CLASS_BARD_ID,
  CLASS_MAGUS_ID,
  CLASS_NECROMANCER_ID,
  CLASS_ORACLE_ID,
  CLASS_PSYCHIC_ID,
  CLASS_SORCERER_ID,
  CLASS_SUMMONER_ID,
  CLASS_WITCH_ID,
  CLASS_WIZARD_ID,
} from '@/data/seeds/ids'

export interface InitialSpellGap {
  id: string
  label: string
  detail: string
}

const SPELLBOOK_START: Partial<
  Record<string, { cantrips: number; ranked: number }>
> = {
  [CLASS_WIZARD_ID]: { cantrips: 10, ranked: 5 },
  [CLASS_WITCH_ID]: { cantrips: 10, ranked: 5 },
  [CLASS_MAGUS_ID]: { cantrips: 4, ranked: 2 },
  [CLASS_NECROMANCER_ID]: { cantrips: 8, ranked: 4 },
}

function uniqueCount(ids: string[] | undefined): number {
  return new Set(ids ?? []).size
}

function repertoireRankedKnown(
  classId: string | null | undefined,
  rank1Slots: number,
): number {
  if (classId === CLASS_SUMMONER_ID) return Math.max(1, rank1Slots)
  if (classId === CLASS_PSYCHIC_ID) return Math.max(1, rank1Slots)
  if (
    classId === CLASS_SORCERER_ID ||
    classId === CLASS_ORACLE_ID ||
    classId === CLASS_BARD_ID
  ) {
    return Math.max(2, rank1Slots)
  }
  return Math.max(1, rank1Slots)
}

/**
 * O que falta para a conjuração do 1º nível (e a preparação do dia) ficar
 * jogável. Focus-only (campeão, monge) não entra.
 */
export function initialSpellGaps(
  character: Character,
  characterClass: CharacterClass | null,
  access: ResolvedSpellcastingAccess | null | undefined,
): InitialSpellGap[] {
  if (!characterClass || !access?.hasAccess) return []
  if (access.primaryStyle === 'focusOnly') return []

  const classSource =
    access.sources.find((s) => s.kind === 'class') ?? access.sources[0]
  const classAccess = classSource
    ? accessForSource(access, classSource)
    : access

  const prepared = usesPreparedSlots(classAccess)
  const book = usesSpellbookCollection(classAccess)
  const fromList = preparesFromTraditionList(classAccess)
  const repertoire =
    Boolean(classAccess.features.repertoire) && !book && !fromList
  if (!prepared && !book && !fromList && !repertoire) return []

  const state = character.spellState
  const cantripsKnown = uniqueCount(state?.cantripIds)
  const rankedKnown = uniqueCount(state?.collectionSpellIds)
  const cantripsPerDay =
    classSource?.cantripsPerDay ?? classAccess.cantripsPerDay ?? 0
  const rank1Slots =
    classSource?.slotsByRank?.[1] ?? classAccess.slotsByRank?.[1] ?? 0
  const gaps: InitialSpellGap[] = []

  if (book) {
    const start = SPELLBOOK_START[characterClass.id] ?? {
      cantrips: Math.max(4, cantripsPerDay),
      ranked: Math.max(2, rank1Slots),
    }
    let rankedNeed = start.ranked
    if (
      characterClass.id === CLASS_WIZARD_ID &&
      character.classChoices?.subclassId === 'school-unified-theory'
    ) {
      rankedNeed += 1
    }
    const collectionLabel = classAccess.features.familiar
      ? 'familiar'
      : 'grimório'
    const cantripNeed = Math.max(cantripsPerDay, 1)
    if (cantripsKnown < cantripNeed) {
      gaps.push({
        id: 'spells-book-cantrips',
        label: `Truques no ${collectionLabel}`,
        detail: `${cantripsKnown}/${cantripNeed} truques (prepare o dia na aba Magias)`,
      })
    }
    if (rankedKnown < rankedNeed) {
      gaps.push({
        id: 'spells-book-ranked',
        label: `Magias no ${collectionLabel}`,
        detail: `${rankedKnown}/${rankedNeed} magias de 1º posto`,
      })
    }
  }

  if (repertoire) {
    const cantripNeed = cantripsPerDay
    const rankedNeed = repertoireRankedKnown(characterClass.id, rank1Slots)
    if (cantripNeed > 0 && cantripsKnown < cantripNeed) {
      gaps.push({
        id: 'spells-repertoire-cantrips',
        label: 'Truques do repertório',
        detail: `${cantripsKnown}/${cantripNeed} truques`,
      })
    }
    if (rankedNeed > 0 && rankedKnown < rankedNeed) {
      gaps.push({
        id: 'spells-repertoire-ranked',
        label: 'Magias do repertório',
        detail: `${rankedKnown}/${rankedNeed} magias de 1º posto`,
      })
    }
  }

  if (prepared && (fromList || book)) {
    if (fromList && cantripsPerDay > 0 && cantripsKnown < cantripsPerDay) {
      gaps.push({
        id: 'spells-prepared-cantrips',
        label: 'Truques preparados',
        detail: `${cantripsKnown}/${cantripsPerDay} truques do dia`,
      })
    }
    const slots = syncPreparedSlots(state, classAccess)
    const empty = slots.filter((s) => !s.font && s.rank > 0 && !s.spellId)
    if (empty.length > 0) {
      gaps.push({
        id: 'spells-prepared-slots',
        label: 'Espaços preparados',
        detail: `${empty.length} espaço${empty.length > 1 ? 's' : ''} de magia vazio${empty.length > 1 ? 's' : ''} hoje`,
      })
    }
  }

  return gaps
}
