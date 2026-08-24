import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import type { ClassCatalogDefinition, ClassChoices } from '@/types/class'
import { officialClasses } from '@/data/seeds/classes.ts'
import { getClassCatalogs } from '@/data/seeds/catalogs/index.ts'
import {
  catalogPreparedSlotCount,
  catalogRepertoireIds,
  effectiveCatalogSlotCount,
  getCatalogPrepared,
  toggleCatalogPick,
  validateClassCatalogs,
  visibleCatalogOptions,
} from './classCatalog.ts'
import { emptyClassChoices } from './class.ts'

function pickIds(
  catalog: ClassCatalogDefinition,
  choices: ClassChoices,
  level: number,
  intMod: number,
): string[] {
  const visible = visibleCatalogOptions(catalog, choices, level)
  const needed = effectiveCatalogSlotCount(catalog, choices, level, intMod)
  if (needed <= 0) return []
  const selected: string[] = []
  const take = (pred: (id: string, category?: string) => boolean, max = needed) => {
    for (const option of visible) {
      if (selected.length >= max) break
      if (selected.includes(option.id)) continue
      if (!pred(option.id, option.category)) continue
      selected.push(option.id)
    }
  }
  if (catalog.pickMode === 'perCategory' && catalog.picksPerCategory) {
    for (const row of catalog.picksPerCategory) {
      if (level < row.minLevel) continue
      let n = 0
      for (const option of visible) {
        if (n >= row.count) break
        if (option.category !== row.category) continue
        if (selected.includes(option.id)) continue
        selected.push(option.id)
        n += 1
      }
    }
    return selected
  }
  const minCat = catalog.constraints?.find((c) => c.kind === 'minCategory')
  if (minCat?.category) {
    take((_, category) => category === minCat.category)
  }
  take(() => true)
  return selected.slice(0, needed)
}

function hiddenDualListIssues(
  classDef: (typeof officialClasses)[number],
  choices: ClassChoices,
  level: number,
  intMod: number,
) {
  return validateClassCatalogs(classDef, choices, level, intMod).filter(
    (issue) =>
      issue.field.startsWith('catalogPrimary:') ||
      /\(0 selecionadas\)/.test(issue.message),
  )
}

describe('catálogos oficiais: Escolher preenche o que trava o progresso', () => {
  const levels = [1, 5, 7]
  for (const classDef of officialClasses) {
    const catalogs = getClassCatalogs(classDef)
    if (catalogs.length === 0) continue

    for (const level of levels) {
      test(`${classDef.name} nv. ${level}: repertório preenchido não deixa 0 no dia/primária`, () => {
        let choices = emptyClassChoices()
        if (classDef.subclass?.options[0]) {
          choices = {
            ...choices,
            subclassId: classDef.subclass.options[0].id,
          }
        }
        for (const catalog of catalogs) {
          for (const id of pickIds(catalog, choices, level, 3)) {
            choices = toggleCatalogPick(
              catalog,
              catalogs,
              choices,
              id,
              level,
              3,
            )
          }
        }
        const stuck = hiddenDualListIssues(classDef, choices, level, 3)
        assert.equal(
          stuck.length,
          0,
          stuck.map((issue) => issue.message).join('; '),
        )
        for (const catalog of catalogs) {
          const preparedNeeded = catalogPreparedSlotCount(catalog, level, 3)
          if (preparedNeeded <= 0) continue
          const pool = catalogRepertoireIds(catalog, choices).size
          if (pool === 0) continue
          const prepared = getCatalogPrepared(choices, catalog.id).length
          assert.ok(
            prepared > 0,
            `${catalog.label}: repertório ${pool} mas o dia ficou 0`,
          )
          assert.ok(
            prepared <= preparedNeeded,
            `${catalog.label}: ${prepared} no dia, máximo ${preparedNeeded}`,
          )
        }
      })
    }
  }
})
