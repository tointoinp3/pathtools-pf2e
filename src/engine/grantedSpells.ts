import type {
  CharacterClass,
  CharacterSpellState,
  ClassChoices,
  ClassSpellPick,
  GrantedClassSpell,
  ResolvedSpellcastingAccess,
  Spell,
} from '@/types'

function getSelectedSubclass(
  classDef: CharacterClass,
  choices: ClassChoices,
) {
  if (!classDef.subclass || !choices.subclassId) return null
  return (
    classDef.subclass.options.find((o) => o.id === choices.subclassId) ?? null
  )
}

function getSelectedSecondarySubclass(
  classDef: CharacterClass,
  choices: ClassChoices,
) {
  if (!classDef.secondarySubclass || !choices.secondarySubclassId) return null
  return (
    classDef.secondarySubclass.options.find(
      (o) => o.id === choices.secondarySubclassId,
    ) ?? null
  )
}

export interface ResolvedGrantedClassSpells {
  cantripOriginalNames: string[]
  collectionOriginalNames: string[]
  focusOriginalNames: string[]
  extraOriginalNames: string[]
  labels: Record<string, string>
  pending: Array<{
    choiceId: string
    label: string
    options: string[]
  }>
  pickOnes: Array<{
    choiceId: string
    label: string
    options: string[]
  }>
}

export function normalizeSpellName(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
}

/** Nível em que um conjurador completo ganha aquele posto. */
export function characterLevelForSpellRank(rank: number): number {
  if (rank <= 1) return 1
  return rank * 2 - 1
}

function gatherGrants(
  classDef: CharacterClass,
  choices: ClassChoices,
): { grants: GrantedClassSpell[]; picks: ClassSpellPick[] } {
  const grants: GrantedClassSpell[] = [...(classDef.grantedSpells ?? [])]
  const picks: ClassSpellPick[] = [...(classDef.spellPicks ?? [])]
  const subclass = getSelectedSubclass(classDef, choices)
  if (subclass) {
    grants.push(...(subclass.grantedSpells ?? []))
    picks.push(...(subclass.spellPicks ?? []))
  }
  const secondary = getSelectedSecondarySubclass(classDef, choices)
  if (secondary) {
    grants.push(...(secondary.grantedSpells ?? []))
    picks.push(...(secondary.spellPicks ?? []))
  }
  return { grants, picks }
}

export function listActiveSpellPicks(
  classDef: CharacterClass | null | undefined,
  choices: ClassChoices | null | undefined,
): ClassSpellPick[] {
  if (!classDef) return []
  return gatherGrants(classDef, choices ?? { additionalSkills: [] }).picks
}

export function collectGrantedClassSpells(
  classDef: CharacterClass | null | undefined,
  choices: ClassChoices | null | undefined,
  level: number,
): ResolvedGrantedClassSpells {
  const empty: ResolvedGrantedClassSpells = {
    cantripOriginalNames: [],
    collectionOriginalNames: [],
    focusOriginalNames: [],
    extraOriginalNames: [],
    labels: {},
    pending: [],
    pickOnes: [],
  }
  if (!classDef) return empty

  const resolvedChoices = choices ?? { additionalSkills: [] }
  const { grants, picks } = gatherGrants(classDef, resolvedChoices)
  const pickValues = resolvedChoices.grantedSpellPicks ?? {}
  const cantrips: string[] = []
  const collection: string[] = []
  const focus: string[] = []
  const labels: Record<string, string> = {}
  const pending: ResolvedGrantedClassSpells['pending'] = []
  const pickOnes: ResolvedGrantedClassSpells['pickOnes'] = []
  const pendingSeen = new Set<string>()
  const pickOneSeen = new Set<string>()

  for (const pick of picks) {
    if (pickValues[pick.id]) continue
    if (pendingSeen.has(pick.id)) continue
    pendingSeen.add(pick.id)
    pending.push({
      choiceId: pick.id,
      label: pick.label,
      options: pick.options.map((o) => o.name),
    })
  }

  for (const grant of grants) {
    if ((grant.minLevel ?? 1) > level) continue
    if (grant.whenPick) {
      if (pickValues[grant.whenPick.choiceId] !== grant.whenPick.optionId) {
        continue
      }
    }
    if (grant.whenSkill) {
      if (resolvedChoices.subclassSkillChoice !== grant.whenSkill) continue
    }

    const label = grant.sourceLabel ?? 'Classe'
    let name: string | undefined

    if (grant.pickOneOriginalNames?.length) {
      const choiceId = grant.choiceId
      if (!choiceId) continue
      if (!pickOneSeen.has(choiceId)) {
        pickOneSeen.add(choiceId)
        pickOnes.push({
          choiceId,
          label: grant.sourceLabel ?? 'Escolha uma magia',
          options: grant.pickOneOriginalNames,
        })
      }
      const picked = pickValues[choiceId]
      if (!picked) {
        if (!pendingSeen.has(choiceId)) {
          pendingSeen.add(choiceId)
          pending.push({
            choiceId,
            label: grant.sourceLabel ?? 'Escolha uma magia',
            options: grant.pickOneOriginalNames,
          })
        }
        continue
      }
      const match = grant.pickOneOriginalNames.find(
        (n) => normalizeSpellName(n) === normalizeSpellName(picked),
      )
      name = match ?? picked
    } else {
      name = grant.originalName
    }

    if (!name) continue
    const key = normalizeSpellName(name)
    labels[key] = label
    if (grant.slot === 'cantrip') cantrips.push(name)
    else if (grant.slot === 'focus') focus.push(name)
    else collection.push(name)
  }

  const extra = [...new Set([...cantrips, ...collection, ...focus])]
  return {
    cantripOriginalNames: [...new Set(cantrips)],
    collectionOriginalNames: [...new Set(collection)],
    focusOriginalNames: [...new Set(focus)],
    extraOriginalNames: extra,
    labels,
    pending,
    pickOnes,
  }
}

export function pruneGrantedSpellPicks(
  classDef: CharacterClass,
  choices: ClassChoices,
): ClassChoices {
  const { grants, picks } = gatherGrants(classDef, choices)
  const allowed = new Set<string>()
  for (const pick of picks) allowed.add(pick.id)
  for (const grant of grants) {
    if (grant.choiceId) allowed.add(grant.choiceId)
    if (grant.whenPick) allowed.add(grant.whenPick.choiceId)
  }
  const current = choices.grantedSpellPicks ?? {}
  const next: Record<string, string> = {}
  for (const [id, value] of Object.entries(current)) {
    if (allowed.has(id)) next[id] = value
  }
  return { ...choices, grantedSpellPicks: next }
}

export function findSpellByOriginalName(
  catalog: Spell[],
  originalName: string,
): Spell | undefined {
  const key = normalizeSpellName(originalName)
  return catalog.find((s) => normalizeSpellName(s.originalName) === key)
}

export interface GrantedSpellIds {
  cantripIds: string[]
  collectionIds: string[]
  focusIds: string[]
  labelsById: Record<string, string>
}

export function resolveGrantedSpellIds(
  access: Pick<
    ResolvedSpellcastingAccess,
    | 'grantedCantripOriginalNames'
    | 'grantedCollectionOriginalNames'
    | 'grantedFocusSpellOriginalNames'
    | 'grantedSpellLabels'
  >,
  catalog: Spell[],
): GrantedSpellIds {
  const labelsById: Record<string, string> = {}
  const mapNames = (names: string[] | undefined, into: string[]) => {
    for (const name of names ?? []) {
      const spell = findSpellByOriginalName(catalog, name)
      if (!spell) continue
      into.push(spell.id)
      const label = access.grantedSpellLabels?.[normalizeSpellName(name)]
      if (label) labelsById[spell.id] = label
    }
  }
  const cantripIds: string[] = []
  const collectionIds: string[] = []
  const focusIds: string[] = []
  mapNames(access.grantedCantripOriginalNames, cantripIds)
  mapNames(access.grantedCollectionOriginalNames, collectionIds)
  mapNames(access.grantedFocusSpellOriginalNames, focusIds)
  return { cantripIds, collectionIds, focusIds, labelsById }
}

/** Truques/repertório conhecidos: estado + o que a classe entrega. */
export function mergedKnownSpellIds(
  state: CharacterSpellState | undefined,
  granted: GrantedSpellIds,
): {
  cantripIds: string[]
  collectionIds: string[]
  focusIds: string[]
} {
  return {
    cantripIds: [
      ...new Set([...(state?.cantripIds ?? []), ...granted.cantripIds]),
    ],
    collectionIds: [
      ...new Set([
        ...(state?.collectionSpellIds ?? []),
        ...granted.collectionIds,
      ]),
    ],
    focusIds: [
      ...new Set([...(state?.focusSpellIds ?? []), ...granted.focusIds]),
    ],
  }
}
