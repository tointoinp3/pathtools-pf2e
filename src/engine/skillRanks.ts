import type {
  AncestryChoices,
  Heritage,
  PendingSkillChoice,
  ProficiencyRank,
  SkillId,
  SkillRankSource,
} from '@/types'
import { SKILL_IDS } from '@/types'
import { SKILL_LABELS } from '@/utils/labels'
import { maxProficiencyRank } from './proficiency'
import { isKnownSkillId } from './parseFeatEffects'

export interface SkillRankBook {
  ranks: Partial<Record<SkillId, ProficiencyRank>>
  sources: Partial<Record<SkillId, SkillRankSource[]>>
  pending: PendingSkillChoice[]
}

export function emptySkillRankBook(): SkillRankBook {
  return { ranks: {}, sources: {}, pending: [] }
}

export function addSkillRank(
  book: SkillRankBook,
  skillId: SkillId,
  rank: ProficiencyRank,
  label: string,
) {
  const current = book.ranks[skillId]
  book.ranks[skillId] = current ? maxProficiencyRank(current, rank) : rank
  const list = book.sources[skillId] ?? []
  list.push({ label, rank })
  book.sources[skillId] = list
}

function isTrained(book: SkillRankBook, skillId: SkillId): boolean {
  const rank = book.ranks[skillId]
  return rank != null && rank !== 'untrained'
}

function replacementOptions(book: SkillRankBook, original: SkillId): SkillId[] {
  const open = SKILL_IDS.filter((id) => id !== original && !isTrained(book, id))
  return open.length > 0 ? open : SKILL_IDS.filter((id) => id !== original)
}

/**
 * Heranças que treinam uma perícia “ou outra se já for treinada”.
 * Precisa rodar depois de classe e origem, para saber o que já veio.
 */
export function applyHeritageReplaceGrants(
  book: SkillRankBook,
  heritage: Heritage | null | undefined,
  choices: AncestryChoices,
  level: number,
) {
  if (!heritage) return
  for (const grant of heritage.skillGrants ?? []) {
    if (!grant.replaceIfTrained || !grant.skillId) continue
    if (!isKnownSkillId(grant.skillId)) continue
    let rank = grant.rank
    if (grant.expertAtLevel != null && level >= grant.expertAtLevel) {
      rank = maxProficiencyRank(rank, 'expert')
    }
    const original = grant.skillId
    const key = `skill-replace-${grant.id}`
    if (!isTrained(book, original)) {
      addSkillRank(book, original, rank, heritage.name)
      continue
    }
    const chosenRaw = choices.heritageChoices[key]
    const chosen =
      chosenRaw && isKnownSkillId(chosenRaw) ? chosenRaw : undefined
    if (chosen) {
      addSkillRank(book, chosen, rank, heritage.name)
      continue
    }
    book.pending.push({
      key,
      store: 'heritage',
      label: heritage.name,
      hint: `Já treinado em ${SKILL_LABELS[original]}. Escolha outra perícia.`,
      options: replacementOptions(book, original),
    })
  }
}

export function trainedSkillSet(
  ranks: Partial<Record<SkillId, ProficiencyRank>>,
): Set<SkillId> {
  const set = new Set<SkillId>()
  for (const [id, rank] of Object.entries(ranks) as Array<
    [SkillId, ProficiencyRank]
  >) {
    if (rank && rank !== 'untrained') set.add(id)
  }
  return set
}
