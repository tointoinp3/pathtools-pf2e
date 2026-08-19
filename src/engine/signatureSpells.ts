import type {
  CharacterSpellState,
  ResolvedSpellcastingAccess,
  Spell,
  SpellRank,
} from '@/types'

function withState(
  state: CharacterSpellState | undefined,
): CharacterSpellState {
  return {
    collectionSpellIds: [],
    cantripIds: [],
    focusSpellIds: [],
    ritualIds: [],
    preparedSlots: [],
    spontaneousSlotsUsed: {},
    focusPointsCurrent: 0,
    bondedItemAvailable: true,
    signatureSpellIds: [],
    notes: '',
    ...state,
  }
}

const SIGNATURE_LEVEL = 3

export function signatureFeatureActive(
  access: Pick<
    ResolvedSpellcastingAccess,
    'hasSignatureSpells' | 'features'
  >,
  level: number,
): boolean {
  if (level < SIGNATURE_LEVEL) return false
  return Boolean(access.hasSignatureSpells || access.features.signatureSpells)
}

export function signatureRanks(
  access: Pick<ResolvedSpellcastingAccess, 'slotsByRank'>,
): Exclude<SpellRank, 0>[] {
  return (Object.keys(access.slotsByRank ?? {}) as string[])
    .map(Number)
    .filter((rank): rank is Exclude<SpellRank, 0> => rank >= 1 && rank <= 10)
    .sort((a, b) => a - b)
}

export function extraSignatureBudget(
  access: Pick<
    ResolvedSpellcastingAccess,
    'extraSignatureSpells' | 'extraSignatureMaxRank'
  >,
): { count: number; maxRank: number } {
  return {
    count: access.extraSignatureSpells ?? 0,
    maxRank: access.extraSignatureMaxRank ?? 3,
  }
}

export function signatureSet(
  state: CharacterSpellState | undefined,
): Set<string> {
  return new Set(state?.signatureSpellIds ?? [])
}

export function canHeightenFreely(
  spell: Pick<Spell, 'id' | 'rank' | 'focus'>,
  slotRank: number,
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
  level: number,
): boolean {
  if (spell.focus || spell.rank <= 0) return false
  if (spell.rank === slotRank) return true
  if (spell.rank > slotRank) return false
  if (!signatureFeatureActive(access, level)) return spell.rank === slotRank
  return signatureSet(state).has(spell.id)
}

export function spontaneousOptionsForRank(
  catalog: Spell[],
  repertoire: Set<string>,
  slotRank: number,
  state: CharacterSpellState | undefined,
  access: ResolvedSpellcastingAccess,
  level: number,
): Spell[] {
  const signatures = signatureSet(state)
  const active = signatureFeatureActive(access, level)
  return catalog.filter((sp) => {
    if (sp.focus || sp.rank <= 0 || !repertoire.has(sp.id)) return false
    if (sp.rank === slotRank) return true
    if (sp.rank > slotRank) return false
    return active && signatures.has(sp.id)
  })
}

export interface SignaturePending {
  rank: number
  needed: number
  have: number
}

/** 1 emblemática por posto que você conjura, se o repertório tiver magia daquele posto. */
export function pendingSignaturePicks(
  access: ResolvedSpellcastingAccess,
  state: CharacterSpellState | undefined,
  catalog: Spell[],
  repertoireIds: string[],
  level: number,
): SignaturePending[] {
  if (!signatureFeatureActive(access, level)) return []
  const known = new Set(repertoireIds)
  const byRank = new Map<number, string[]>()
  for (const spell of catalog) {
    if (spell.focus || spell.rank <= 0 || !known.has(spell.id)) continue
    const list = byRank.get(spell.rank) ?? []
    list.push(spell.id)
    byRank.set(spell.rank, list)
  }
  const marked = [...signatureSet(state)]
  const markedByRank = new Map<number, string[]>()
  for (const id of marked) {
    const spell = catalog.find((s) => s.id === id)
    if (!spell || spell.rank <= 0) continue
    const list = markedByRank.get(spell.rank) ?? []
    list.push(id)
    markedByRank.set(spell.rank, list)
  }

  const pending: SignaturePending[] = []
  for (const rank of signatureRanks(access)) {
    const available = byRank.get(rank)?.length ?? 0
    if (available <= 0) continue
    const have = markedByRank.get(rank)?.length ?? 0
    if (have < 1) pending.push({ rank, needed: 1, have })
  }

  const extra = extraSignatureBudget(access)
  if (extra.count > 0) {
    const extrasUsed = marked.filter((id) => {
      const spell = catalog.find((s) => s.id === id)
      if (!spell || spell.rank <= 0 || spell.rank > extra.maxRank) return false
      const ofRank = markedByRank.get(spell.rank) ?? []
      const index = ofRank.indexOf(id)
      return index >= 1 || !signatureRanks(access).includes(spell.rank as Exclude<SpellRank, 0>)
    }).length
    if (extrasUsed < extra.count) {
      pending.push({
        rank: extra.maxRank,
        needed: extra.count,
        have: extrasUsed,
      })
    }
  }
  return pending
}

export function toggleSignatureSpell(
  state: CharacterSpellState | undefined,
  spell: Pick<Spell, 'id' | 'rank' | 'focus'>,
  access: ResolvedSpellcastingAccess,
  catalog: Spell[],
  repertoireIds: string[],
  level: number,
): CharacterSpellState {
  const base = withState(state)
  const current = [...(base.signatureSpellIds ?? [])]
  if (spell.focus || spell.rank <= 0) return base
  if (!signatureFeatureActive(access, level)) return base
  if (!repertoireIds.includes(spell.id)) return base

  if (current.includes(spell.id)) {
    return {
      ...base,
      signatureSpellIds: current.filter((id) => id !== spell.id),
    }
  }

  const extra = extraSignatureBudget(access)
  const ranks = signatureRanks(access)
  const sameRank = current.filter((id) => {
    const other = catalog.find((s) => s.id === id)
    return other?.rank === spell.rank
  })

  const isRankSlot = ranks.includes(spell.rank as Exclude<SpellRank, 0>)
  if (isRankSlot && sameRank.length === 0) {
    return { ...base, signatureSpellIds: [...current, spell.id] }
  }

  if (spell.rank <= extra.maxRank) {
    const extras = current.filter((id) => {
      const other = catalog.find((s) => s.id === id)
      if (!other || other.rank <= 0 || other.rank > extra.maxRank) return false
      const ofRank = current.filter((cid) => {
        const s = catalog.find((x) => x.id === cid)
        return s?.rank === other.rank
      })
      const index = ofRank.indexOf(id)
      return index >= 1 || !ranks.includes(other.rank as Exclude<SpellRank, 0>)
    })
    if (extras.length < extra.count) {
      return { ...base, signatureSpellIds: [...current, spell.id] }
    }
  }

  if (isRankSlot && sameRank.length > 0) {
    const replace = sameRank[0]
    return {
      ...base,
      signatureSpellIds: [...current.filter((id) => id !== replace), spell.id],
    }
  }

  return base
}
