import type { Archetype, ArchetypeProgress, Feat, FeatCategory } from '@/types'
import { DEFAULT_FEATS_BEFORE_NEXT_DEDICATION } from '@/types'
import {
  getOfficialArchetype,
  getOfficialArchetypeByDedicationFeatId,
  listOfficialArchetypes,
} from '@/data/seeds/archetypes'
import { localizeFeatName } from '@/data/i18n/featNamesPt'
import { getHomebrewArchetypes } from './archetypeRegistry'
import { hasMythicTrait, isGeneralMythicFeat } from './mythic'

export { setHomebrewArchetypes } from './archetypeRegistry'

export function listArchetypes(): Archetype[] {
  return sortArchetypes([
    ...listOfficialArchetypes(),
    ...getHomebrewArchetypes(),
  ])
}

export function getArchetype(id: string): Archetype | undefined {
  return (
    getOfficialArchetype(id) ??
    getHomebrewArchetypes().find((a) => a.id === id)
  )
}

/** Multiclasse primeiro; dentro do grupo, ordem alfabética em pt-BR. */
export function sortArchetypes<T extends { kind: string; name: string }>(
  list: T[],
): T[] {
  return [...list].sort((a, b) => {
    const ag = a.kind === 'multiclass' ? 0 : 1
    const bg = b.kind === 'multiclass' ? 0 : 1
    if (ag !== bg) return ag - bg
    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

export function sortArchetypeProgress(
  list: ArchetypeProgress[],
): ArchetypeProgress[] {
  return [...list].sort((a, b) => {
    const ag = a.kind === 'multiclass' ? 0 : 1
    const bg = b.kind === 'multiclass' ? 0 : 1
    if (ag !== bg) return ag - bg
    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

function traitIsDedication(trait: string): boolean {
  const t = trait.trim().toLowerCase()
  return t === 'dedication' || t === 'dedicação'
}

function traitIsArchetype(trait: string): boolean {
  const t = trait.trim().toLowerCase()
  return t === 'archetype' || t === 'arquétipo'
}

/** Feito de Dedicação (traço, flag ou registro do arquétipo). */
export function isDedicationFeat(
  feat: Feat,
  archetypes: Archetype[] = listArchetypes(),
): boolean {
  if (feat.isDedication) return true
  if (feat.traits.some(traitIsDedication)) return true
  return archetypes.some((a) => a.dedicationFeatId === feat.id)
}

/** Feito de arquétipo (categoria, traço, Dedicação ou ligação). */
export function isArchetypeFeat(
  feat: Feat,
  archetypes: Archetype[] = listArchetypes(),
): boolean {
  if (feat.category === 'archetype') return true
  if (feat.archetypeId) return true
  if (feat.traits.some(traitIsArchetype) || feat.traits.some(traitIsDedication)) {
    return true
  }
  return isDedicationFeat(feat, archetypes)
}

export function findArchetypeForFeat(
  feat: Feat,
  archetypes: Archetype[] = listArchetypes(),
): Archetype | undefined {
  if (feat.archetypeId) {
    const byId = archetypes.find((a) => a.id === feat.archetypeId)
    if (byId) return byId
  }
  const byDedication = archetypes.find((a) => a.dedicationFeatId === feat.id)
  if (byDedication) return byDedication
  return archetypes.find((a) => a.featIds.includes(feat.id))
}

export function resolveArchetypeId(
  feat: Feat,
  archetypes: Archetype[] = listArchetypes(),
): string | null {
  return findArchetypeForFeat(feat, archetypes)?.id ?? feat.archetypeId ?? null
}

/**
 * PF2e: feitos de arquétipo (incluindo Dedicação) ocupam slot de classe.
 * Slot de arquétipo grátis (regra variante) só aceita feito de arquétipo.
 * Alguns também cabem em perícia (`allowedSlotKinds` ou `allowsSkillFeatSlots`).
 * Slot geral continua aceitando feito de perícia.
 */
export function featFitsSlot(
  feat: Feat,
  slotKind: FeatCategory,
  archetypes: Archetype[] = listArchetypes(),
): boolean {
  if (slotKind === 'mythic') {
    return isGeneralMythicFeat(feat) || hasMythicTrait(feat)
  }
  if (slotKind === 'archetype') {
    return isArchetypeFeat(feat, archetypes)
  }
  if (feat.category === slotKind) return true
  if (slotKind === 'general' && feat.category === 'skill') return true
  if (feat.allowedSlotKinds?.includes(slotKind)) return true

  if (!isArchetypeFeat(feat, archetypes)) return false
  if (slotKind === 'class') return true
  const arch = findArchetypeForFeat(feat, archetypes)
  if (arch?.allowsSkillFeatSlots && slotKind === 'skill') return true
  return false
}

/** Filtro da UI: no chip “Classe”, feitos de arquétipo também aparecem. */
export function featMatchesCategoryFilter(
  feat: Feat,
  filter: FeatCategory | 'all',
  archetypes: Archetype[] = listArchetypes(),
): boolean {
  if (filter === 'all') return true
  if (filter === 'class') {
    return feat.category === 'class' || isArchetypeFeat(feat, archetypes)
  }
  if (filter === 'archetype') {
    return isArchetypeFeat(feat, archetypes)
  }
  if (filter === 'mythic') {
    return isGeneralMythicFeat(feat) || hasMythicTrait(feat)
  }
  if (filter === 'general') {
    return feat.category === 'general' || feat.category === 'skill'
  }
  return feat.category === filter
}

function requiredBeforeNext(archetype: Archetype | undefined): number {
  return (
    archetype?.featsRequiredBeforeNextDedication ??
    DEFAULT_FEATS_BEFORE_NEXT_DEDICATION
  )
}

function featBelongsToArchetype(
  feat: Feat,
  archetype: Archetype,
): boolean {
  if (feat.archetypeId === archetype.id) return true
  if (archetype.dedicationFeatId === feat.id) return true
  return archetype.featIds.includes(feat.id)
}

/**
 * Agrupa Dedicações (e feitos ligados) já escolhidos.
 * Dedicações órfãs (ainda sem registro no catálogo) entram com `archetypeId: null`.
 */
export function resolveArchetypeProgress(
  selectedFeats: Feat[],
  archetypes: Archetype[] = listArchetypes(),
): ArchetypeProgress[] {
  const dedicationFeats = selectedFeats.filter((f) =>
    isDedicationFeat(f, archetypes),
  )
  if (dedicationFeats.length === 0) return []

  const seen = new Set<string>()
  const result: ArchetypeProgress[] = []

  for (const dedication of dedicationFeats) {
    const arch = findArchetypeForFeat(dedication, archetypes)
    const key = arch?.id ?? `dedication:${dedication.id}`
    if (seen.has(key)) continue
    seen.add(key)

    const members = arch
      ? selectedFeats.filter((f) => featBelongsToArchetype(f, arch))
      : selectedFeats.filter((f) => {
          if (f.id === dedication.id) return true
          if (dedication.archetypeId && f.archetypeId === dedication.archetypeId) {
            return true
          }
          return false
        })

    const otherFeatCount = members.filter(
      (f) => f.id !== dedication.id && !isDedicationFeat(f, archetypes),
    ).length
    const required = requiredBeforeNext(arch)
    const incomplete = otherFeatCount < required

    result.push({
      archetypeId: arch?.id ?? dedication.archetypeId ?? null,
      name: arch?.name ?? dedication.name,
      originalName: arch?.originalName ?? dedication.originalName,
      kind: arch?.kind,
      dedicationFeatId: dedication.id,
      dedicationFeatName: localizeFeatName(
        dedication.name,
        dedication.originalName,
      ),
      otherFeatCount,
      requiredBeforeNext: required,
      featIds: members.map((f) => f.id),
      canTakeAnotherDedication: !incomplete,
      incomplete,
    })
  }

  return sortArchetypeProgress(result)
}

/**
 * Dedicações já na ficha que quebram a regra dos 2 feitos extras:
 * todas as Dedicações anteriores à mais recente precisam estar completas.
 * Uma Dedicação sozinha (ainda sem os extras) é legal.
 */
export function unfinishedPriorDedications(
  selectedFeats: Feat[],
  options?: {
    ignoreDedicationLock?: boolean
    /** Nível do slot em que cada feito foi escolhido. */
    featGainedAtLevel?: ReadonlyMap<string, number>
  },
): ArchetypeProgress[] {
  if (options?.ignoreDedicationLock) return []
  const progress = resolveArchetypeProgress(selectedFeats)
  if (progress.length < 2) return []

  const levelOf = (featId: string | null) =>
    featId && options?.featGainedAtLevel
      ? (options.featGainedAtLevel.get(featId) ?? 99)
      : 99

  const ordered = [...progress].sort(
    (a, b) =>
      levelOf(a.dedicationFeatId) - levelOf(b.dedicationFeatId) ||
      a.name.localeCompare(b.name, 'pt-BR'),
  )
  return ordered.slice(0, -1).filter((entry) => entry.incomplete)
}

/**
 * Bloqueia uma *nova* Dedicação enquanto algum arquétipo atual ainda não
 * tem os feitos extras. Trocar a Dedicação do slot atual (ela fora de
 * `selectedFeats`) não dispara o bloqueio — é retreino.
 * Algumas Dedicações oficiais só pulam o bloqueio de um arquétipo específico.
 */
export function featIgnoresDedicationLockFor(
  candidate: Feat,
  incompleteArchetypeId: string | null,
): boolean {
  if (candidate.ignoresDedicationLock) return true
  if (
    incompleteArchetypeId &&
    candidate.ignoresDedicationLockFromArchetypeIds?.includes(incompleteArchetypeId)
  ) {
    return true
  }
  return false
}

export function dedicationLockReason(
  candidate: Feat,
  selectedFeats: Feat[],
  archetypes: Archetype[] = listArchetypes(),
  ignoreDedicationLock = false,
): string | null {
  if (ignoreDedicationLock) return null
  if (!isDedicationFeat(candidate, archetypes)) return null

  const progress = resolveArchetypeProgress(selectedFeats, archetypes)
  const incomplete = progress.find((p) => p.incomplete)
  if (!incomplete) return null
  if (featIgnoresDedicationLockFor(candidate, incomplete.archetypeId)) {
    return null
  }

  const remaining = incomplete.requiredBeforeNext - incomplete.otherFeatCount
  const label = incomplete.name
  return `Pegue mais ${remaining} feito${remaining === 1 ? '' : 's'} de ${label} antes de outra Dedicação.`
}

/** Multiclasse: não pega a Dedicação da própria classe. */
export function multiclassDedicationReason(
  candidate: Feat,
  classId: string | null | undefined,
  archetypes: Archetype[] = listArchetypes(),
): string | null {
  if (!classId) return null
  if (!isDedicationFeat(candidate, archetypes)) return null

  const arch = findArchetypeForFeat(candidate, archetypes)
  const blocked =
    candidate.blockedClassId ?? arch?.multiclassClassId ?? null
  if (blocked && blocked === classId) {
    return 'Você não pode pegar a Dedicação da sua própria classe.'
  }
  return null
}

export function getArchetypeByDedicationFeatId(
  featId: string,
): Archetype | undefined {
  return (
    getOfficialArchetypeByDedicationFeatId(featId) ??
    getHomebrewArchetypes().find((a) => a.dedicationFeatId === featId)
  )
}
