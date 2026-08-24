import type {
  CharacterClass,
  ClassCatalogDefinition,
  ClassCatalogOption,
  ClassChoices,
  SkillId,
} from '@/types'
import type { ClassValidationIssue } from './class'
import { getClassCatalogs } from '@/data/seeds/catalogs'
import { getItemDefinition } from '@/engine/equipmentCatalog'

export function catalogSlotCount(
  catalog: ClassCatalogDefinition,
  level: number,
  intelligenceModifier = 0,
): number {
  if (catalog.pickMode === 'perCategory' && catalog.picksPerCategory) {
    return catalog.picksPerCategory
      .filter((row) => level >= row.minLevel)
      .reduce((sum, row) => sum + row.count, 0)
  }
  const row = highestSlot(catalog.slotsByLevel, level)
  let n = row?.count ?? 0
  if (catalog.addIntelligence) n += Math.max(0, intelligenceModifier)
  return n
}

export function catalogPreparedSlotCount(
  catalog: ClassCatalogDefinition,
  level: number,
  intelligenceModifier = 0,
): number {
  if (!catalog.preparedSlotsByLevel?.length) return 0
  const row = highestSlot(catalog.preparedSlotsByLevel, level)
  let n = row?.count ?? 0
  if (catalog.preparedAddIntelligence) n += Math.max(0, intelligenceModifier)
  return n
}

function highestSlot(
  rules: Array<{ minLevel: number; count: number }> | undefined,
  level: number,
) {
  if (!rules?.length) return null
  return (
    [...rules]
      .filter((r) => r.minLevel <= level)
      .sort((a, b) => b.minLevel - a.minLevel)[0] ?? null
  )
}

export function visibleCatalogOptions(
  catalog: ClassCatalogDefinition,
  choices: ClassChoices,
  level: number,
): ClassCatalogOption[] {
  const subclassId = choices.subclassId
  return catalog.options.filter((opt) => {
    if (opt.level != null && opt.level > level) return false
    if (catalog.filterBySubclass && opt.subclassIds?.length) {
      if (!subclassId || !opt.subclassIds.includes(subclassId)) return false
    }
    const catLevel = opt.category
      ? catalog.categoryMinLevel?.[opt.category]
      : undefined
    if (catLevel != null && level < catLevel) return false
    if (
      catalog.constraints?.some((c) => c.kind === 'excludeSubclassId') &&
      subclassId &&
      opt.id === subclassId
    ) {
      return false
    }
    return true
  })
}

export function getCatalogPicks(
  choices: ClassChoices,
  catalogId: string,
): string[] {
  return choices.catalogPicks?.[catalogId] ?? []
}

export function getCatalogPrepared(
  choices: ClassChoices,
  catalogId: string,
): string[] {
  return choices.catalogPrepared?.[catalogId] ?? []
}

function patchCatalogList(
  choices: ClassChoices,
  key: 'catalogPicks' | 'catalogPrepared',
  catalogId: string,
  ids: string[],
): ClassChoices {
  return {
    ...choices,
    [key]: { ...(choices[key] ?? {}), [catalogId]: ids },
  }
}

export function toggleCappedList(
  list: string[],
  id: string,
  max: number,
): string[] {
  if (list.includes(id)) return list.filter((x) => x !== id)
  if (list.length >= max) return list
  return [...list, id]
}

/** Fórmulas/táticas do catálogo + as de `preparedFromCatalogIds` (ex.: campo do alquimista). */
export function catalogRepertoireIds(
  catalog: ClassCatalogDefinition,
  choices: ClassChoices,
  pickOverride?: string[],
): Set<string> {
  const ids = new Set(pickOverride ?? getCatalogPicks(choices, catalog.id))
  for (const otherId of catalog.preparedFromCatalogIds ?? []) {
    for (const id of getCatalogPicks(choices, otherId)) ids.add(id)
  }
  return ids
}

/**
 * Liga/desliga uma opção do repertório e, se houver vaga, já marca como
 * preparada/infundida no dia — inclusive quando a opção veio de outro
 * catálogo (fórmulas do campo → itens infundidos).
 */
export function toggleCatalogPick(
  catalog: ClassCatalogDefinition,
  allCatalogs: ClassCatalogDefinition[],
  choices: ClassChoices,
  optionId: string,
  level: number,
  intelligenceModifier = 0,
): ClassChoices {
  if (catalog.kind === 'daily') {
    const needed = effectiveCatalogSlotCount(
      catalog,
      choices,
      level,
      intelligenceModifier,
    )
    const attuned = getCatalogPrepared(choices, catalog.id)
    const nextAttuned = toggleCappedList(attuned, optionId, needed)
    if (nextAttuned === attuned) return choices
    let next = patchCatalogList(
      choices,
      'catalogPrepared',
      catalog.id,
      nextAttuned,
    )
    if (catalog.primaryPick) {
      const primary = next.catalogPrimary?.[catalog.id]
      if (!primary || !nextAttuned.includes(primary)) {
        const fallback = nextAttuned[0]
        if (fallback) {
          next = {
            ...next,
            catalogPrimary: {
              ...(next.catalogPrimary ?? {}),
              [catalog.id]: fallback,
            },
          }
        } else {
          const rest = { ...(next.catalogPrimary ?? {}) }
          delete rest[catalog.id]
          next = { ...next, catalogPrimary: rest }
        }
      }
    }
    return next
  }

  const needed = effectiveCatalogSlotCount(
    catalog,
    choices,
    level,
    intelligenceModifier,
  )
  const picks = getCatalogPicks(choices, catalog.id)
  const nextPicks = toggleCappedList(picks, optionId, needed)
  if (nextPicks === picks) return choices

  const added = !picks.includes(optionId) && nextPicks.includes(optionId)
  let next = patchCatalogList(choices, 'catalogPicks', catalog.id, nextPicks)

  for (const target of allCatalogs) {
    const preparedNeeded = catalogPreparedSlotCount(
      target,
      level,
      intelligenceModifier,
    )
    if (preparedNeeded <= 0) continue
    const feedsTarget =
      target.id === catalog.id ||
      (target.preparedFromCatalogIds ?? []).includes(catalog.id)
    if (!feedsTarget) continue

    let prepared = getCatalogPrepared(next, target.id)
    const pool = catalogRepertoireIds(target, next)
    if (target.preparedFromPicks) {
      prepared = prepared.filter((id) => pool.has(id))
    }
    if (added && prepared.length < preparedNeeded) {
      if (target.allowPreparedDuplicates || !prepared.includes(optionId)) {
        prepared = [...prepared, optionId]
      }
    } else if (
      !added &&
      target.allowPreparedDuplicates &&
      pool.has(optionId)
    ) {
      const idx = prepared.lastIndexOf(optionId)
      if (idx >= 0) {
        prepared = [...prepared.slice(0, idx), ...prepared.slice(idx + 1)]
      }
    }
    next = patchCatalogList(next, 'catalogPrepared', target.id, prepared)
  }

  return next
}

/** Se o livro já tem fórmulas mas o dia está vazio, preenche com uma dose de cada.
 *  Aparição sintonizada sem primária ganha a primeira como primária. */
export function hydrateCatalogPrepared(
  catalogs: ClassCatalogDefinition[],
  choices: ClassChoices,
  level: number,
  intelligenceModifier = 0,
): ClassChoices | null {
  let next = choices
  let changed = false
  for (const catalog of catalogs) {
    const preparedNeeded = catalogPreparedSlotCount(
      catalog,
      level,
      intelligenceModifier,
    )
    if (preparedNeeded > 0) {
      const prepared = getCatalogPrepared(next, catalog.id)
      if (prepared.length === 0) {
        const pool = [...catalogRepertoireIds(catalog, next)]
        if (pool.length > 0) {
          next = patchCatalogList(
            next,
            'catalogPrepared',
            catalog.id,
            pool.slice(0, preparedNeeded),
          )
          changed = true
        }
      }
    }
    if (catalog.primaryPick) {
      const attuned = getCatalogPrepared(next, catalog.id)
      const primary = next.catalogPrimary?.[catalog.id]
      if (attuned.length > 0 && (!primary || !attuned.includes(primary))) {
        next = {
          ...next,
          catalogPrimary: {
            ...(next.catalogPrimary ?? {}),
            [catalog.id]: attuned[0],
          },
        }
        changed = true
      }
    }
  }
  return changed ? next : null
}

export function optionById(
  catalog: ClassCatalogDefinition,
  id: string,
): ClassCatalogOption | undefined {
  return catalog.options.find((o) => o.id === id)
}

function isAdvancedInnovationWeapon(choices: ClassChoices): boolean {
  const weaponId = choices.catalogDetails?.weaponId
  if (!weaponId) return false
  const item = getItemDefinition(weaponId)
  return item?.weapon?.proficiency === 'advanced'
}

export function effectiveCatalogSlotCount(
  catalog: ClassCatalogDefinition,
  choices: ClassChoices,
  level: number,
  intelligenceModifier = 0,
): number {
  let n = catalogSlotCount(catalog, level, intelligenceModifier)
  if (
    catalog.constraints?.some((c) => c.kind === 'advancedWeaponSkipsInitial') &&
    isAdvancedInnovationWeapon(choices) &&
    level < 7
  ) {
    return 0
  }
  if (
    catalog.constraints?.some((c) => c.kind === 'advancedWeaponSkipsInitial') &&
    isAdvancedInnovationWeapon(choices) &&
    catalog.pickMode === 'perCategory'
  ) {
    const initial = catalog.picksPerCategory?.find(
      (r) => r.category === 'initial' && level >= r.minLevel,
    )
    if (initial) n -= initial.count
  }
  return Math.max(0, n)
}

export function validateClassCatalogs(
  classDef: CharacterClass,
  choices: ClassChoices,
  level: number,
  intelligenceModifier = 0,
): ClassValidationIssue[] {
  const issues: ClassValidationIssue[] = []
  const catalogs = getClassCatalogs(classDef)

  for (const catalog of catalogs) {
    if (catalog.constraints?.some((c) => c.kind === 'requireSubclass')) {
      if (!choices.subclassId) {
        issues.push({
          field: `catalog:${catalog.id}`,
          message: `Escolha a especialização antes de: ${catalog.label}`,
        })
        continue
      }
    }

    for (const detail of catalog.details ?? []) {
      if (detail.subclassIds?.length) {
        if (
          !choices.subclassId ||
          !detail.subclassIds.includes(choices.subclassId)
        ) {
          continue
        }
      }
      if (!detail.required) continue
      if (detail.kind === 'counter') continue
      const value = choices.catalogDetails?.[detail.id]
      if (!value) {
        issues.push({
          field: `catalogDetail:${detail.id}`,
          message: `Escolha: ${detail.label}`,
        })
      }
    }

    const visible = visibleCatalogOptions(catalog, choices, level)
    const visibleIds = new Set(visible.map((o) => o.id))
    const needed = effectiveCatalogSlotCount(
      catalog,
      choices,
      level,
      intelligenceModifier,
    )

    if (needed <= 0 && catalog.kind === 'daily') {
      // still validate prepared if any
    }

    const picks =
      catalog.kind === 'daily'
        ? getCatalogPrepared(choices, catalog.id)
        : getCatalogPicks(choices, catalog.id)

    if (catalog.kind === 'daily') {
      const attunedNeeded = needed
      const attuned = getCatalogPrepared(choices, catalog.id)
      const uniqueAttuned = catalog.unique ? [...new Set(attuned)] : attuned
      if (uniqueAttuned.length !== attunedNeeded) {
        issues.push({
          field: `catalog:${catalog.id}`,
          message: `${catalog.label}: escolha ${attunedNeeded} (${uniqueAttuned.length} selecionadas)`,
        })
      }
      for (const id of attuned) {
        if (!visibleIds.has(id)) {
          issues.push({
            field: `catalog:${catalog.id}`,
            message: `${catalog.label}: opção inválida neste nível`,
          })
          break
        }
      }
      if (catalog.primaryPick && attunedNeeded > 0) {
        const primary = choices.catalogPrimary?.[catalog.id]
        if (!primary || !attuned.includes(primary)) {
          issues.push({
            field: `catalogPrimary:${catalog.id}`,
            message: catalog.primaryPick.label,
          })
        }
      }
      continue
    }

    const uniquePicks = catalog.unique ? [...new Set(picks)] : picks
    if (needed > 0 && uniquePicks.length !== needed) {
      issues.push({
        field: `catalog:${catalog.id}`,
        message: `${catalog.label}: escolha ${needed} (${uniquePicks.length} selecionadas)`,
      })
    }

    for (const id of picks) {
      if (!visibleIds.has(id)) {
        issues.push({
          field: `catalog:${catalog.id}`,
          message: `${catalog.label}: opção inválida neste nível ou especialização`,
        })
        break
      }
    }

    if (catalog.unique && new Set(picks).size !== picks.length) {
      issues.push({
        field: `catalog:${catalog.id}`,
        message: `${catalog.label}: não repita a mesma opção`,
      })
    }

    for (const constraint of catalog.constraints ?? []) {
      if (constraint.kind === 'minCategory' && constraint.category) {
        const n = picks.filter(
          (id) => optionById(catalog, id)?.category === constraint.category,
        ).length
        if (needed > 0 && uniquePicks.length === needed && n < (constraint.count ?? 1)) {
          issues.push({
            field: `catalog:${catalog.id}`,
            message: constraint.message,
          })
        }
      }
      if (constraint.kind === 'excludeSubclassId' && choices.subclassId) {
        if (picks.includes(choices.subclassId)) {
          issues.push({
            field: `catalog:${catalog.id}`,
            message: constraint.message,
          })
        }
      }
    }

    if (catalog.pickMode === 'perCategory' && catalog.picksPerCategory) {
      for (const row of catalog.picksPerCategory) {
        if (level < row.minLevel) continue
        if (
          row.category === 'initial' &&
          catalog.constraints?.some((c) => c.kind === 'advancedWeaponSkipsInitial') &&
          isAdvancedInnovationWeapon(choices)
        ) {
          continue
        }
        const n = picks.filter(
          (id) => optionById(catalog, id)?.category === row.category,
        ).length
        const label =
          catalog.categoryLabels?.[row.category] ?? row.category
        if (n !== row.count) {
          issues.push({
            field: `catalog:${catalog.id}:${row.category}`,
            message: `${catalog.label}: ${row.count}× ${label} (há ${n})`,
          })
        }
      }
    }

    const preparedNeeded = catalogPreparedSlotCount(
      catalog,
      level,
      intelligenceModifier,
    )
    if (preparedNeeded > 0) {
      const prepared = getCatalogPrepared(choices, catalog.id)
      const poolIds = catalogRepertoireIds(catalog, choices)
      const uniquePrepared = catalog.allowPreparedDuplicates
        ? prepared
        : [...new Set(prepared)]
      if (uniquePrepared.length !== preparedNeeded) {
        issues.push({
          field: `catalogPrepared:${catalog.id}`,
          message: `${catalog.preparedLabel ?? 'Preparar'}: escolha ${preparedNeeded} (${uniquePrepared.length} selecionadas)`,
        })
      }
      if (catalog.preparedFromPicks) {
        for (const id of prepared) {
          if (!poolIds.has(id)) {
            issues.push({
              field: `catalogPrepared:${catalog.id}`,
              message: `${catalog.preparedLabel ?? 'Preparar'}: só vale o que está no repertório`,
            })
            break
          }
        }
      }
    }
  }

  return issues
}

export function pruneCatalogChoices(
  classDef: CharacterClass,
  choices: ClassChoices,
  level: number,
): ClassChoices {
  const catalogs = getClassCatalogs(classDef)
  const catalogPicks = { ...(choices.catalogPicks ?? {}) }
  const catalogPrepared = { ...(choices.catalogPrepared ?? {}) }
  const catalogPrimary = { ...(choices.catalogPrimary ?? {}) }
  const catalogDetails = { ...(choices.catalogDetails ?? {}) }

  for (const catalog of catalogs) {
    const visible = new Set(
      visibleCatalogOptions(catalog, choices, level).map((o) => o.id),
    )
    const picks = catalogPicks[catalog.id]
    if (picks) {
      catalogPicks[catalog.id] = picks.filter((id) => visible.has(id))
    }
    const preparedList = catalogPrepared[catalog.id]
    if (preparedList) {
      catalogPrepared[catalog.id] = preparedList.filter((id) =>
        visible.has(id),
      )
    }
    const primary = catalogPrimary[catalog.id]
    if (primary && !catalogPrepared[catalog.id]?.includes(primary)) {
      delete catalogPrimary[catalog.id]
    }
    for (const detail of catalog.details ?? []) {
      if (
        detail.subclassIds?.length &&
        (!choices.subclassId ||
          !detail.subclassIds.includes(choices.subclassId))
      ) {
        delete catalogDetails[detail.id]
      }
    }
  }

  return {
    ...choices,
    catalogPicks,
    catalogPrepared,
    catalogPrimary,
    catalogDetails,
  }
}

export function selectedCatalogOptions(
  classDef: CharacterClass,
  choices: ClassChoices,
  level: number,
): Array<{
  catalog: ClassCatalogDefinition
  option: ClassCatalogOption
  role: 'pick' | 'prepared' | 'primary'
}> {
  const out: Array<{
    catalog: ClassCatalogDefinition
    option: ClassCatalogOption
    role: 'pick' | 'prepared' | 'primary'
  }> = []
  for (const catalog of getClassCatalogs(classDef)) {
    const ids =
      catalog.kind === 'daily'
        ? getCatalogPrepared(choices, catalog.id)
        : getCatalogPicks(choices, catalog.id)
    const primary = choices.catalogPrimary?.[catalog.id]
    for (const id of ids) {
      const option = optionById(catalog, id)
      if (!option) continue
      out.push({
        catalog,
        option,
        role: id === primary ? 'primary' : catalog.kind === 'daily' ? 'prepared' : 'pick',
      })
    }
  }
  void level
  return out
}

export function catalogGrantedSkills(
  classDef: CharacterClass,
  choices: ClassChoices,
): SkillId[] {
  const skills: SkillId[] = []
  for (const { option } of selectedCatalogOptions(classDef, choices, 20)) {
    if (option.skillId) skills.push(option.skillId)
  }
  return skills
}

export function catalogGrantedLores(
  classDef: CharacterClass,
  choices: ClassChoices,
  level: number,
): Array<{ id: string; name: string; rank: 'trained' | 'expert' | 'master' }> {
  const lores: Array<{
    id: string
    name: string
    rank: 'trained' | 'expert' | 'master'
  }> = []
  for (const { option } of selectedCatalogOptions(classDef, choices, level)) {
    for (const name of option.loreNames ?? []) {
      let rank: 'trained' | 'expert' | 'master' = 'trained'
      if (option.loreMasterAtLevel != null && level >= option.loreMasterAtLevel) {
        rank = 'master'
      } else if (
        option.loreExpertAtLevel != null &&
        level >= option.loreExpertAtLevel
      ) {
        rank = 'expert'
      }
      lores.push({
        id: `catalog-lore-${option.id}-${name}`,
        name,
        rank,
      })
    }
  }
  return lores
}
