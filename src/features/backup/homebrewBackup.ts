import { db, refreshHomebrewRegistries } from '@/db'
import type {
  Ancestry,
  Archetype,
  Background,
  CharacterClass,
  ContentSource,
  Creature,
  Deity,
  Feat,
  Heritage,
  HomebrewCompanionRecord,
  ItemDefinition,
  Ritual,
  Spell,
} from '@/types'
import { createId, nowIso } from '@/utils/id'
import {
  dateStamp,
  downloadJson,
  fileSlug,
  jsonFormatOf,
  pickJsonFiles,
} from '@/utils/jsonFile'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useArchetypeStore } from '@/stores/archetypeStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import { useClassStore } from '@/stores/classStore'
import { useCompanionStore } from '@/stores/companionStore'
import { useDeityStore } from '@/stores/deityStore'
import { useCreatureStore } from '@/stores/creatureStore'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useFeatStore } from '@/stores/featStore'
import { useRitualStore } from '@/stores/ritualStore'
import { useSpellStore } from '@/stores/spellStore'
import { APP_SLUG } from '@/brand'
import {
  HOMEBREW_FORMAT,
  isCharacterFileFormat,
  isCharactersFileFormat,
  isHomebrewFileFormat,
  invalidBackupJsonMessage,
} from '@/features/backup/formats'

export { HOMEBREW_FORMAT }
export const HOMEBREW_BACKUP_VERSION = 1

export type HomebrewKind =
  | 'all'
  | 'classes'
  | 'ancestries'
  | 'heritages'
  | 'versatileHeritages'
  | 'backgrounds'
  | 'archetypes'
  | 'companions'
  | 'items'
  | 'spells'
  | 'rituals'
  | 'deities'
  | 'creatures'
  | 'feats'

export interface HomebrewPack {
  format: typeof HOMEBREW_FORMAT
  version: number
  exportedAt: string
  classes: CharacterClass[]
  ancestries: Ancestry[]
  heritages: Heritage[]
  backgrounds: Background[]
  archetypes: Archetype[]
  feats: Feat[]
  items: ItemDefinition[]
  spells: Spell[]
  rituals: Ritual[]
  companions: HomebrewCompanionRecord[]
  deities: Deity[]
  creatures: Creature[]
  sources: ContentSource[]
}

export type HomebrewSlice = Partial<
  Omit<HomebrewPack, 'format' | 'version' | 'exportedAt'>
>

export interface HomebrewImportCounts {
  created: number
  updated: number
  skippedOfficial: number
}

export interface HomebrewImportResult {
  classes: HomebrewImportCounts
  ancestries: HomebrewImportCounts
  heritages: HomebrewImportCounts
  backgrounds: HomebrewImportCounts
  archetypes: HomebrewImportCounts
  feats: HomebrewImportCounts
  items: HomebrewImportCounts
  spells: HomebrewImportCounts
  rituals: HomebrewImportCounts
  companions: HomebrewImportCounts
  deities: HomebrewImportCounts
  creatures: HomebrewImportCounts
  sources: HomebrewImportCounts
}

const EMPTY_COUNTS: HomebrewImportCounts = {
  created: 0,
  updated: 0,
  skippedOfficial: 0,
}

const KIND_FILENAMES: Record<HomebrewKind, string> = {
  all: `homebrew-${APP_SLUG}`,
  classes: 'homebrew-classes',
  ancestries: 'homebrew-ancestralidades',
  heritages: 'homebrew-herancas',
  versatileHeritages: 'homebrew-herancas-versateis',
  backgrounds: 'homebrew-origens',
  archetypes: 'homebrew-arquetipos',
  companions: 'homebrew-companheiros',
  items: 'homebrew-equipamento',
  spells: 'homebrew-magias',
  rituals: 'homebrew-rituais',
  deities: 'homebrew-divindades',
  creatures: 'homebrew-criaturas',
  feats: 'homebrew-feitos',
}

function isHomebrew(item: { provenance?: { type?: string }; type?: string }): boolean {
  if ('provenance' in item && item.provenance) {
    return item.provenance.type === 'homebrew'
  }
  if ('type' in item) return item.type === 'homebrew'
  return false
}

function isOfficialRecord(item: {
  provenance?: { type?: string }
  type?: string
}): boolean {
  if (item.provenance?.type === 'official') return true
  if (!('provenance' in item) && item.type === 'official') return true
  return false
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function emptyCounts(): HomebrewImportCounts {
  return { ...EMPTY_COUNTS }
}

export function emptyHomebrewPack(): HomebrewPack {
  return {
    format: HOMEBREW_FORMAT,
    version: HOMEBREW_BACKUP_VERSION,
    exportedAt: nowIso(),
    classes: [],
    ancestries: [],
    heritages: [],
    backgrounds: [],
    archetypes: [],
    feats: [],
    items: [],
    spells: [],
    rituals: [],
    companions: [],
    deities: [],
    creatures: [],
    sources: [],
  }
}

export function wrapHomebrewPack(slice: HomebrewSlice): HomebrewPack {
  const pack = emptyHomebrewPack()
  return {
    ...pack,
    classes: slice.classes ?? [],
    ancestries: slice.ancestries ?? [],
    heritages: slice.heritages ?? [],
    backgrounds: slice.backgrounds ?? [],
    archetypes: slice.archetypes ?? [],
    feats: slice.feats ?? [],
    items: slice.items ?? [],
    spells: slice.spells ?? [],
    rituals: slice.rituals ?? [],
    companions: slice.companions ?? [],
    deities: slice.deities ?? [],
    creatures: slice.creatures ?? [],
    sources: slice.sources ?? [],
  }
}

function mergeById<T extends { id: string }>(lists: T[][]): T[] {
  const map = new Map<string, T>()
  for (const list of lists) {
    for (const item of list) {
      if (item?.id) map.set(item.id, item)
    }
  }
  return [...map.values()]
}

export function mergeHomebrewPacks(packs: HomebrewPack[]): HomebrewPack {
  return wrapHomebrewPack({
    classes: mergeById(packs.map((p) => p.classes)),
    ancestries: mergeById(packs.map((p) => p.ancestries)),
    heritages: mergeById(packs.map((p) => p.heritages)),
    backgrounds: mergeById(packs.map((p) => p.backgrounds)),
    archetypes: mergeById(packs.map((p) => p.archetypes)),
    feats: mergeById(packs.map((p) => p.feats)),
    items: mergeById(packs.map((p) => p.items)),
    spells: mergeById(packs.map((p) => p.spells)),
    rituals: mergeById(packs.map((p) => p.rituals)),
    companions: mergeById(packs.map((p) => p.companions)),
    deities: mergeById(packs.map((p) => p.deities)),
    creatures: mergeById(packs.map((p) => p.creatures)),
    sources: mergeById(packs.map((p) => p.sources)),
  })
}

/** Mantém o que foi marcado e o pacote óbvio do pai (heranças/feitos da classe…). */
export function filterHomebrewPackByIds(
  pack: HomebrewPack,
  selectedIds: Iterable<string>,
): HomebrewPack {
  const selected = new Set(selectedIds)
  const ancestries = pack.ancestries.filter((a) => selected.has(a.id))
  const ancestryIds = new Set(ancestries.map((a) => a.id))
  const classes = pack.classes.filter((c) => selected.has(c.id))
  const classIds = new Set(classes.map((c) => c.id))
  const archetypes = pack.archetypes.filter((a) => selected.has(a.id))
  const archetypeIds = new Set(archetypes.map((a) => a.id))
  const heritages = pack.heritages.filter(
    (h) =>
      selected.has(h.id) ||
      Boolean(h.ancestryId && ancestryIds.has(h.ancestryId)),
  )
  const heritageIds = new Set(heritages.map((h) => h.id))
  const feats = pack.feats.filter(
    (f) =>
      selected.has(f.id) ||
      Boolean(f.classId && classIds.has(f.classId)) ||
      Boolean(f.ancestryId && ancestryIds.has(f.ancestryId)) ||
      Boolean(f.heritageId && heritageIds.has(f.heritageId)) ||
      Boolean(f.archetypeId && archetypeIds.has(f.archetypeId)),
  )
  const filtered = wrapHomebrewPack({
    classes,
    ancestries,
    heritages,
    backgrounds: pack.backgrounds.filter((b) => selected.has(b.id)),
    archetypes,
    feats,
    items: pack.items.filter((item) => selected.has(item.id)),
    spells: pack.spells.filter((s) => selected.has(s.id)),
    rituals: pack.rituals.filter((r) => selected.has(r.id)),
    companions: pack.companions.filter((c) => selected.has(c.id)),
    deities: pack.deities.filter((d) => selected.has(d.id)),
    creatures: pack.creatures.filter((c) => selected.has(c.id)),
    sources: pack.sources,
  })
  const sourceIds = collectSourceIds([
    ...filtered.classes,
    ...filtered.ancestries,
    ...filtered.heritages,
    ...filtered.backgrounds,
    ...filtered.archetypes,
    ...filtered.feats,
    ...filtered.items,
    ...filtered.spells,
    ...filtered.rituals,
    ...filtered.companions,
    ...filtered.deities,
    ...filtered.creatures,
  ])
  filtered.sources = pack.sources.filter((s) => sourceIds.includes(s.id))
  return filtered
}

export function packItemCount(pack: HomebrewPack): number {
  return (
    pack.classes.length +
    pack.ancestries.length +
    pack.heritages.length +
    pack.backgrounds.length +
    pack.archetypes.length +
    pack.feats.length +
    pack.items.length +
    pack.spells.length +
    pack.rituals.length +
    pack.companions.length +
    pack.deities.length +
    pack.creatures.length +
    pack.sources.length
  )
}

export function homebrewSourceFromEditor(
  sourceId: string | null | undefined,
  sourceName: string,
  author: string,
  createdAt?: string,
): ContentSource {
  return {
    id: sourceId ?? createId('source'),
    name: sourceName.trim() || 'Homebrew pessoal',
    type: 'homebrew',
    author: author.trim() || undefined,
    createdAt,
  }
}

export function downloadHomebrewSlice(filenameStem: string, slice: HomebrewSlice): void {
  downloadJson(`${fileSlug(filenameStem)}-${dateStamp()}.json`, wrapHomebrewPack(slice))
}

function collectSourceIds(items: Array<{ sourceId?: string | null }>): string[] {
  const ids = new Set<string>()
  for (const item of items) {
    if (item.sourceId) ids.add(item.sourceId)
  }
  return [...ids]
}

async function sourcesFor(ids: string[]): Promise<ContentSource[]> {
  if (ids.length === 0) return []
  const rows = await db.contentSources.bulkGet(ids)
  return rows.filter((s): s is ContentSource => s != null && s.type === 'homebrew')
}

function relatedFeats(
  feats: Feat[],
  predicate: (feat: Feat) => boolean,
): Feat[] {
  return feats.filter((f) => isHomebrew(f) && predicate(f))
}

export async function collectHomebrewPack(kind: HomebrewKind = 'all'): Promise<HomebrewPack> {
  const [
    classes,
    ancestries,
    heritages,
    backgrounds,
    archetypes,
    feats,
    items,
    spells,
    rituals,
    companions,
    deities,
    creatures,
  ] = await Promise.all([
    db.classes.filter((c) => c.provenance.type === 'homebrew').toArray(),
    db.ancestries.filter((a) => a.provenance.type === 'homebrew').toArray(),
    db.heritages.filter((h) => h.provenance.type === 'homebrew').toArray(),
    db.backgrounds.filter((b) => b.provenance.type === 'homebrew').toArray(),
    db.archetypes.filter((a) => a.provenance.type === 'homebrew').toArray(),
    db.feats.filter((f) => f.provenance.type === 'homebrew').toArray(),
    db.itemDefinitions
      .filter((item) => item.provenance?.type === 'homebrew')
      .toArray(),
    db.spells.filter((s) => s.provenance.type === 'homebrew').toArray(),
    db.rituals.filter((r) => r.provenance.type === 'homebrew').toArray(),
    db.companionTypes.filter((c) => c.provenance.type === 'homebrew').toArray(),
    db.deities.filter((d) => d.provenance.type === 'homebrew').toArray(),
    db.creatures.filter((c) => c.provenance.type === 'homebrew').toArray(),
  ])

  const specificHeritages = heritages.filter((h) => !h.isVersatile && h.ancestryId)
  const versatileHeritages = heritages.filter((h) => h.isVersatile || !h.ancestryId)

  const pack = emptyHomebrewPack()

  if (kind === 'all' || kind === 'classes') {
    pack.classes = classes
    const classIds = new Set(classes.map((c) => c.id))
    pack.feats.push(...relatedFeats(feats, (f) => Boolean(f.classId && classIds.has(f.classId))))
  }

  if (kind === 'all' || kind === 'ancestries') {
    pack.ancestries = ancestries
    const ancestryIds = new Set(ancestries.map((a) => a.id))
    const heritageSlice =
      kind === 'all' ? specificHeritages : specificHeritages
    pack.heritages.push(...heritageSlice)
    const heritageIds = new Set(heritageSlice.map((h) => h.id))
    pack.feats.push(
      ...relatedFeats(
        feats,
        (f) =>
          Boolean(f.ancestryId && ancestryIds.has(f.ancestryId)) ||
          Boolean(f.heritageId && heritageIds.has(f.heritageId)),
      ),
    )
  }

  if (kind === 'heritages') {
    pack.heritages = specificHeritages
    const heritageIds = new Set(specificHeritages.map((h) => h.id))
    pack.feats.push(
      ...relatedFeats(feats, (f) => Boolean(f.heritageId && heritageIds.has(f.heritageId))),
    )
  }

  if (kind === 'all' || kind === 'versatileHeritages') {
    if (kind === 'versatileHeritages') pack.heritages = versatileHeritages
    else pack.heritages.push(...versatileHeritages.filter((h) => !pack.heritages.some((x) => x.id === h.id)))
    const heritageIds = new Set(versatileHeritages.map((h) => h.id))
    pack.feats.push(
      ...relatedFeats(
        feats,
        (f) =>
          Boolean(f.heritageId && heritageIds.has(f.heritageId)) &&
          !pack.feats.some((x) => x.id === f.id),
      ),
    )
  }

  if (kind === 'all' || kind === 'backgrounds') pack.backgrounds = backgrounds

  if (kind === 'all' || kind === 'archetypes') {
    pack.archetypes = archetypes
    const archetypeIds = new Set(archetypes.map((a) => a.id))
    pack.feats.push(
      ...relatedFeats(
        feats,
        (f) =>
          Boolean(f.archetypeId && archetypeIds.has(f.archetypeId)) &&
          !pack.feats.some((x) => x.id === f.id),
      ),
    )
  }

  if (kind === 'all' || kind === 'companions') pack.companions = companions
  if (kind === 'all' || kind === 'items') pack.items = items
  if (kind === 'all' || kind === 'spells') pack.spells = spells
  if (kind === 'all' || kind === 'rituals') pack.rituals = rituals
  if (kind === 'all' || kind === 'deities') pack.deities = deities
  if (kind === 'all' || kind === 'creatures') pack.creatures = creatures

  if (kind === 'all' || kind === 'feats') {
    pack.feats = feats
  } else {
    const seen = new Set<string>()
    pack.feats = pack.feats.filter((f) => {
      if (seen.has(f.id)) return false
      seen.add(f.id)
      return true
    })
  }

  const sourceIds = collectSourceIds([
    ...pack.classes,
    ...pack.ancestries,
    ...pack.heritages,
    ...pack.backgrounds,
    ...pack.archetypes,
    ...pack.feats,
    ...pack.items,
    ...pack.spells,
    ...pack.rituals,
    ...pack.companions,
    ...pack.deities,
    ...pack.creatures,
  ])
  pack.sources = await sourcesFor(sourceIds)
  pack.exportedAt = nowIso()
  return pack
}

export async function exportHomebrewKindToFile(kind: HomebrewKind = 'all'): Promise<boolean> {
  const pack = await collectHomebrewPack(kind)
  if (packItemCount(pack) === 0) {
    window.alert('Não há homebrew deste tipo para exportar.')
    return false
  }
  downloadJson(`${KIND_FILENAMES[kind]}-${dateStamp()}.json`, pack)
  return true
}

export async function exportHomebrewByIds(ids: string[]): Promise<boolean> {
  if (ids.length === 0) {
    window.alert('Selecione pelo menos um homebrew.')
    return false
  }
  const pack = filterHomebrewPackByIds(await collectHomebrewPack('all'), ids)
  if (packItemCount(pack) === 0) {
    window.alert('Nada para exportar com essa seleção.')
    return false
  }
  downloadJson(`homebrew-lote-${ids.length}-${dateStamp()}.json`, pack)
  return true
}

function parseHomebrewPack(data: unknown): HomebrewPack {
  if (typeof data !== 'object' || data === null) {
    throw new Error(invalidBackupJsonMessage())
  }
  const raw = data as Record<string, unknown>
  if (isCharacterFileFormat(raw.format) || isCharactersFileFormat(raw.format)) {
    throw new Error(
      'Este arquivo é de personagens. Importe-o na página Meus Personagens.',
    )
  }
  if (!isHomebrewFileFormat(raw.format)) {
    throw new Error(invalidBackupJsonMessage('homebrew'))
  }
  return wrapHomebrewPack({
    classes: asArray<CharacterClass>(raw.classes),
    ancestries: asArray<Ancestry>(raw.ancestries),
    heritages: asArray<Heritage>(raw.heritages),
    backgrounds: asArray<Background>(raw.backgrounds),
    archetypes: asArray<Archetype>(raw.archetypes),
    feats: asArray<Feat>(raw.feats),
    items: asArray<ItemDefinition>(raw.items),
    spells: asArray<Spell>(raw.spells),
    rituals: asArray<Ritual>(raw.rituals),
    companions: asArray<HomebrewCompanionRecord>(raw.companions),
    deities: asArray<Deity>(raw.deities),
    creatures: asArray<Creature>(raw.creatures),
    sources: asArray<ContentSource>(raw.sources),
  })
}

function stampHomebrew<T extends { provenance?: { type?: string }; sourceId?: string | null }>(
  item: T,
  sourceId?: string,
): T {
  return {
    ...item,
    provenance: { type: 'homebrew' as const },
    sourceId: sourceId ?? item.sourceId,
  }
}

async function upsertHomebrewTable<T extends { id: string; provenance?: { type?: string } }>(
  get: (id: string) => Promise<T | undefined>,
  put: (item: T) => Promise<unknown>,
  items: T[],
  stamp: (item: T) => T,
): Promise<HomebrewImportCounts> {
  const counts = emptyCounts()
  const toPut: T[] = []
  for (const item of items) {
    if (!item?.id) continue
    if (isOfficialRecord(item)) {
      counts.skippedOfficial += 1
      continue
    }
    const existing = await get(item.id)
    if (existing && isOfficialRecord(existing)) {
      counts.skippedOfficial += 1
      continue
    }
    toPut.push(stamp(item))
    if (existing) counts.updated += 1
    else counts.created += 1
  }
  if (toPut.length > 0) {
    for (const item of toPut) {
      await put(item)
    }
  }
  return counts
}

export async function importHomebrewPack(data: unknown): Promise<HomebrewImportResult> {
  return applyHomebrewPack(parseHomebrewPack(data))
}

export async function importHomebrewFromFiles(
  datas: unknown[],
): Promise<{ result: HomebrewImportResult; skippedOther: number; fileCount: number }> {
  const packs: HomebrewPack[] = []
  let skippedOther = 0
  for (const data of datas) {
    const format = jsonFormatOf(data)
    if (isCharacterFileFormat(format) || isCharactersFileFormat(format)) {
      skippedOther += 1
      continue
    }
    packs.push(parseHomebrewPack(data))
  }
  if (packs.length === 0) {
    if (skippedOther > 0) {
      throw new Error(
        'Estes arquivos são de personagens. Importe-os na página Meus Personagens.',
      )
    }
    throw new Error('Nenhum JSON de homebrew neste lote.')
  }
  return {
    result: await applyHomebrewPack(mergeHomebrewPacks(packs)),
    skippedOther,
    fileCount: packs.length,
  }
}

async function applyHomebrewPack(pack: HomebrewPack): Promise<HomebrewImportResult> {
  if (packItemCount(pack) === 0) {
    throw new Error('Este arquivo não contém homebrew.')
  }

  const result: HomebrewImportResult = {
    classes: emptyCounts(),
    ancestries: emptyCounts(),
    heritages: emptyCounts(),
    backgrounds: emptyCounts(),
    archetypes: emptyCounts(),
    feats: emptyCounts(),
    items: emptyCounts(),
    spells: emptyCounts(),
    rituals: emptyCounts(),
    companions: emptyCounts(),
    deities: emptyCounts(),
    creatures: emptyCounts(),
    sources: emptyCounts(),
  }

  await db.transaction(
    'rw',
    [
      db.classes,
      db.ancestries,
      db.heritages,
      db.backgrounds,
      db.archetypes,
      db.feats,
      db.itemDefinitions,
      db.spells,
      db.rituals,
      db.companionTypes,
      db.deities,
      db.creatures,
      db.contentSources,
    ],
    async () => {
      result.sources = await upsertHomebrewTable(
        (id) => db.contentSources.get(id),
        (item) => db.contentSources.put(item),
        pack.sources,
        (item) => ({ ...item, type: 'homebrew' as const }),
      )
      result.classes = await upsertHomebrewTable(
        (id) => db.classes.get(id),
        (item) => db.classes.put(item),
        pack.classes,
        (item) => stampHomebrew(item),
      )
      result.ancestries = await upsertHomebrewTable(
        (id) => db.ancestries.get(id),
        (item) => db.ancestries.put(item),
        pack.ancestries,
        (item) => stampHomebrew(item),
      )
      result.heritages = await upsertHomebrewTable(
        (id) => db.heritages.get(id),
        (item) => db.heritages.put(item),
        pack.heritages,
        (item) => stampHomebrew(item),
      )
      result.backgrounds = await upsertHomebrewTable(
        (id) => db.backgrounds.get(id),
        (item) => db.backgrounds.put(item),
        pack.backgrounds,
        (item) => stampHomebrew(item),
      )
      result.archetypes = await upsertHomebrewTable(
        (id) => db.archetypes.get(id),
        (item) => db.archetypes.put(item),
        pack.archetypes,
        (item) => stampHomebrew(item),
      )
      result.feats = await upsertHomebrewTable(
        (id) => db.feats.get(id),
        (item) => db.feats.put(item),
        pack.feats,
        (item) => stampHomebrew(item),
      )
      result.items = await upsertHomebrewTable(
        (id) => db.itemDefinitions.get(id),
        (item) => db.itemDefinitions.put(item),
        pack.items,
        (item) => stampHomebrew(item),
      )
      result.spells = await upsertHomebrewTable(
        (id) => db.spells.get(id),
        (item) => db.spells.put(item),
        pack.spells,
        (item) => stampHomebrew(item),
      )
      result.rituals = await upsertHomebrewTable(
        (id) => db.rituals.get(id),
        (item) => db.rituals.put(item),
        pack.rituals,
        (item) => stampHomebrew(item),
      )
      result.companions = await upsertHomebrewTable(
        (id) => db.companionTypes.get(id),
        (item) => db.companionTypes.put(item),
        pack.companions,
        (item) => stampHomebrew(item),
      )
      result.deities = await upsertHomebrewTable(
        (id) => db.deities.get(id),
        (item) => db.deities.put(item),
        pack.deities,
        (item) => stampHomebrew(item),
      )
      result.creatures = await upsertHomebrewTable(
        (id) => db.creatures.get(id),
        (item) => db.creatures.put(item),
        pack.creatures,
        (item) => stampHomebrew(item),
      )
    },
  )

  await reloadAfterHomebrewImport()
  return result
}

export async function reloadAfterHomebrewImport(): Promise<void> {
  await refreshHomebrewRegistries()
  await Promise.all([
    useAncestryStore.getState().loadAll(),
    useBackgroundStore.getState().loadAll(),
    useClassStore.getState().loadAll(),
    useFeatStore.getState().loadAll(),
    useArchetypeStore.getState().loadAll(),
    useCompanionStore.getState().loadAll(),
    useEquipmentStore.getState().loadAll(),
    useSpellStore.getState().loadAll(),
    useRitualStore.getState().loadAll(),
    useDeityStore.getState().loadAll(),
    useCreatureStore.getState().loadAll(),
  ])
}

const LABEL_ROWS: Array<{ key: keyof HomebrewImportResult; one: string; many: string }> = [
  { key: 'classes', one: 'classe', many: 'classes' },
  { key: 'ancestries', one: 'ancestralidade', many: 'ancestralidades' },
  { key: 'heritages', one: 'herança', many: 'heranças' },
  { key: 'backgrounds', one: 'origem', many: 'origens' },
  { key: 'archetypes', one: 'arquétipo', many: 'arquétipos' },
  { key: 'feats', one: 'feito', many: 'feitos' },
  { key: 'items', one: 'item', many: 'itens' },
  { key: 'spells', one: 'magia', many: 'magias' },
  { key: 'rituals', one: 'ritual', many: 'rituais' },
  { key: 'companions', one: 'companheiro', many: 'companheiros' },
  { key: 'deities', one: 'divindade', many: 'divindades' },
  { key: 'creatures', one: 'criatura', many: 'criaturas' },
  { key: 'sources', one: 'fonte', many: 'fontes' },
]

export function formatHomebrewImportSummary(result: HomebrewImportResult): string {
  const parts: string[] = []
  let skipped = 0
  for (const row of LABEL_ROWS) {
    const counts = result[row.key]
    const total = counts.created + counts.updated
    skipped += counts.skippedOfficial
    if (total === 0) continue
    const label = total === 1 ? row.one : row.many
    const extra =
      counts.updated > 0 ? ` (${counts.updated} atualizado${counts.updated === 1 ? '' : 's'})` : ''
    parts.push(`${total} ${label}${extra}`)
  }
  if (parts.length === 0) {
    if (skipped > 0) {
      return `Nada importado. ${skipped} registro${skipped === 1 ? '' : 's'} oficial${skipped === 1 ? '' : 'is'} ignorado${skipped === 1 ? '' : 's'} (o conteúdo do livro não é sobrescrito).`
    }
    return 'Nenhum homebrew neste arquivo.'
  }
  const skipNote =
    skipped > 0
      ? ` ${skipped} oficial${skipped === 1 ? '' : 'is'} ignorado${skipped === 1 ? '' : 's'}.`
      : ''
  return `Importado: ${parts.join(', ')}.${skipNote}`
}

export async function runHomebrewImport(): Promise<void> {
  const files = await pickJsonFiles()
  if (files == null || files.length === 0) return
  const { result, skippedOther, fileCount } = await importHomebrewFromFiles(files)
  const extra =
    files.length > 1
      ? ` ${fileCount} arquivo${fileCount === 1 ? '' : 's'} de homebrew.`
      : ''
  const skip =
    skippedOther > 0
      ? ` ${skippedOther} arquivo${skippedOther === 1 ? '' : 's'} de personagem ignorado${skippedOther === 1 ? '' : 's'}.`
      : ''
  window.alert(`${formatHomebrewImportSummary(result)}${extra}${skip}`)
}

export async function runHomebrewExport(kind: HomebrewKind = 'all'): Promise<void> {
  await exportHomebrewKindToFile(kind)
}
