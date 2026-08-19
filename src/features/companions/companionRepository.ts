import { db } from '@/db'
import type { ContentSource } from '@/types'
import type {
  CompanionCatalogKind,
  HomebrewCompanionRecord,
} from '@/types/companion'
import { createId, nowIso } from '@/utils/id'
import { saveContentSource } from '@/features/backgrounds/backgroundRepository'
import { getAnimalCompanionType as getOfficialAnimal } from '@/data/seeds/animalCompanions'
import { getEidolonType as getOfficialEidolon } from '@/data/seeds/eidolons'
import { getFamiliarForm as getOfficialForm } from '@/data/seeds/familiarForms'
import { getSpecificFamiliar as getOfficialSpecific } from '@/data/seeds/specificFamiliars'
import { setHomebrewCompanions } from '@/engine/companionRegistry'

async function refreshHomebrewRegistry(): Promise<void> {
  const rows = await db.companionTypes
    .filter((c) => c.provenance.type === 'homebrew')
    .toArray()
  setHomebrewCompanions(rows)
}

export async function listHomebrewCompanions(): Promise<
  HomebrewCompanionRecord[]
> {
  return db.companionTypes
    .filter((c) => c.provenance.type === 'homebrew')
    .toArray()
}

export async function getStoredCompanion(
  id: string,
): Promise<HomebrewCompanionRecord | undefined> {
  return db.companionTypes.get(id)
}

export async function saveCompanion(
  record: HomebrewCompanionRecord,
): Promise<HomebrewCompanionRecord> {
  if (record.provenance.type === 'official') {
    throw new Error('Tipos oficiais de companheiro não são gravados neste banco')
  }
  const updated: HomebrewCompanionRecord = {
    ...record,
    provenance: { type: 'homebrew' },
    updatedAt: nowIso(),
    createdAt: record.createdAt ?? nowIso(),
  }
  await db.companionTypes.put(updated)
  await refreshHomebrewRegistry()
  return updated
}

export async function deleteCompanion(id: string): Promise<void> {
  const record = await db.companionTypes.get(id)
  if (!record) return
  if (record.provenance.type === 'official') {
    throw new Error('Tipos oficiais de companheiro não podem ser excluídos')
  }
  await db.companionTypes.delete(id)
  await refreshHomebrewRegistry()
}

async function ensureHomebrewSource(label: string): Promise<string> {
  const now = nowIso()
  const sourceId = createId('source')
  const source: ContentSource = {
    id: sourceId,
    name: label,
    type: 'homebrew',
    createdAt: now,
    updatedAt: now,
  }
  await saveContentSource(source)
  return sourceId
}

function officialAsRecord(
  id: string,
): { kind: CompanionCatalogKind; definition: HomebrewCompanionRecord } | null {
  const animal = getOfficialAnimal(id)
  if (animal) {
    return {
      kind: 'animal',
      definition: {
        ...structuredClone(animal),
        catalogKind: 'animal',
        provenance: { type: 'homebrew' },
      },
    }
  }
  const eidolon = getOfficialEidolon(id)
  if (eidolon) {
    return {
      kind: 'eidolon',
      definition: {
        ...structuredClone(eidolon),
        catalogKind: 'eidolon',
        provenance: { type: 'homebrew' },
      },
    }
  }
  const form = getOfficialForm(id)
  if (form) {
    return {
      kind: 'familiarForm',
      definition: {
        ...structuredClone(form),
        catalogKind: 'familiarForm',
        provenance: { type: 'homebrew' },
      },
    }
  }
  const specific = getOfficialSpecific(id)
  if (specific) {
    return {
      kind: 'specificFamiliar',
      definition: {
        ...structuredClone(specific),
        catalogKind: 'specificFamiliar',
        provenance: { type: 'homebrew' },
      },
    }
  }
  return null
}

function remapIds(record: HomebrewCompanionRecord): HomebrewCompanionRecord {
  const now = nowIso()
  if (record.catalogKind === 'animal') {
    const newId = createId('companion')
    return {
      ...record,
      id: newId,
      attacks: record.attacks.map((atk) => ({
        ...atk,
        id: createId('atk'),
      })),
      createdAt: now,
      updatedAt: now,
    }
  }
  if (record.catalogKind === 'eidolon') {
    return {
      ...record,
      id: createId('eidolon'),
      namedArrays: record.namedArrays?.map((arr) => ({
        ...arr,
        id: createId('array'),
      })),
      aonUrl: undefined,
      createdAt: now,
      updatedAt: now,
    }
  }
  if (record.catalogKind === 'familiarForm') {
    return {
      ...record,
      id: createId('form'),
      createdAt: now,
      updatedAt: now,
    }
  }
  return {
    ...record,
    id: createId('specific'),
    createdAt: now,
    updatedAt: now,
  }
}

export async function duplicateCompanionAsHomebrew(
  sourceId: string,
): Promise<HomebrewCompanionRecord> {
  const stored = await db.companionTypes.get(sourceId)
  const source =
    stored ?? officialAsRecord(sourceId)?.definition ?? null
  if (!source) throw new Error('Companheiro não encontrado')

  const homebrewSourceId = await ensureHomebrewSource(
    `Homebrew baseado em ${source.name}`,
  )
  const copy = remapIds({
    ...structuredClone(source),
    name: `${source.name} (Homebrew)`,
    originalName: `${source.originalName} (Homebrew)`,
    provenance: { type: 'homebrew' },
    sourceId: homebrewSourceId,
    source: 'Homebrew',
  })

  await db.companionTypes.put(copy)
  await refreshHomebrewRegistry()
  return copy
}
