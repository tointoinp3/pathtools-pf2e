import {
  DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS,
  type Ancestry,
  type AppSettings,
  type Archetype,
  type Background,
  type Character,
  type CharacterClass,
  type ContentSource,
  type Feat,
  type Heritage,
  type HomebrewCompanionRecord,
  type ItemDefinition,
  type PortraitRecord,
  type Ritual,
  type Spell,
  type Deity,
  type Creature,
  type LootHaul,
  type EncounterPlan,
  type CombatSession,
  type TokenImageRecord,
  type CharacterGroup,
  type SharedStash,
  type SeededTable,
  type WorldNote,
  type WorldFolder,
  type WorldMap,
  type WorldAssetRecord,
} from '@/types'
import Dexie, { type EntityTable } from 'dexie'
import { nowIso } from '@/utils/id'

/** Bump when official seed content must be refreshed/upserted */
export const CURRENT_SEED_VERSION = 148

export class PathfinderDB extends Dexie {
  characters!: EntityTable<Character, 'id'>
  portraits!: EntityTable<PortraitRecord, 'id'>
  backgrounds!: EntityTable<Background, 'id'>
  ancestries!: EntityTable<Ancestry, 'id'>
  heritages!: EntityTable<Heritage, 'id'>
  classes!: EntityTable<CharacterClass, 'id'>
  feats!: EntityTable<Feat, 'id'>
  archetypes!: EntityTable<Archetype, 'id'>
  companionTypes!: EntityTable<HomebrewCompanionRecord, 'id'>
  itemDefinitions!: EntityTable<ItemDefinition, 'id'>
  spells!: EntityTable<Spell, 'id'>
  rituals!: EntityTable<Ritual, 'id'>
  deities!: EntityTable<Deity, 'id'>
  creatures!: EntityTable<Creature, 'id'>
  contentSources!: EntityTable<ContentSource, 'id'>
  settings!: EntityTable<AppSettings, 'id'>
  lootHauls!: EntityTable<LootHaul, 'id'>
  encounters!: EntityTable<EncounterPlan, 'id'>
  combatSessions!: EntityTable<CombatSession, 'id'>
  tokenImages!: EntityTable<TokenImageRecord, 'id'>
  characterGroups!: EntityTable<CharacterGroup, 'id'>
  sharedStashes!: EntityTable<SharedStash, 'id'>
  worldNotes!: EntityTable<WorldNote, 'id'>
  worldFolders!: EntityTable<WorldFolder, 'id'>
  worldMaps!: EntityTable<WorldMap, 'id'>
  worldAssets!: EntityTable<WorldAssetRecord, 'id'>

  constructor() {
    super('pf2e-super-app')

    this.version(1).stores({
      characters: 'id, name, updatedAt, backgroundId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(2).stores({
      characters: 'id, name, updatedAt, backgroundId, ancestryId, heritageId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(3).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(4).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(5).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(6).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(7).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(8).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      spells: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      rituals: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(9).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      spells: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      rituals: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      deities: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
    })

    this.version(10).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      spells: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      rituals: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      deities: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
      lootHauls: 'id, name, updatedAt, partyLevel',
    })

    this.version(11).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId, groupId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      spells: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      rituals: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      deities: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
      lootHauls: 'id, name, updatedAt, partyLevel',
      characterGroups: 'id, name, updatedAt',
      sharedStashes: 'id, name, groupId, updatedAt',
    })

    this.version(12).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId, groupId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      spells: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      rituals: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      deities: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
      lootHauls: 'id, name, updatedAt, partyLevel',
      encounters: 'id, name, updatedAt, partyLevel',
      characterGroups: 'id, name, updatedAt',
      sharedStashes: 'id, name, groupId, updatedAt',
    })

    this.version(13).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId, groupId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      spells: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      rituals: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      deities: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      creatures: 'id, name, level, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
      lootHauls: 'id, name, updatedAt, partyLevel',
      encounters: 'id, name, updatedAt, partyLevel',
      characterGroups: 'id, name, updatedAt',
      sharedStashes: 'id, name, groupId, updatedAt',
    })

    this.version(14).stores({
      characters:
        'id, name, updatedAt, backgroundId, ancestryId, heritageId, classId, groupId',
      portraits: 'id, characterId, updatedAt',
      backgrounds: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      ancestries: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      heritages:
        'id, name, ancestryId, rarity, provenance.type, sourceId, updatedAt',
      classes: 'id, name, rarity, provenance.type, sourceId, updatedAt',
      feats:
        'id, name, level, category, ancestryId, classId, heritageId, archetypeId, rarity, provenance.type, sourceId, updatedAt',
      archetypes: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      companionTypes:
        'id, catalogKind, name, provenance.type, sourceId, updatedAt',
      itemDefinitions:
        'id, category, name, rarity, provenance.type, sourceId, updatedAt',
      spells: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      rituals: 'id, name, rank, rarity, provenance.type, sourceId, updatedAt',
      deities: 'id, name, kind, rarity, provenance.type, sourceId, updatedAt',
      creatures: 'id, name, level, rarity, provenance.type, sourceId, updatedAt',
      contentSources: 'id, name, type',
      settings: 'id',
      lootHauls: 'id, name, updatedAt, partyLevel',
      encounters: 'id, name, updatedAt, partyLevel',
      combatSessions: 'id, name, updatedAt',
      tokenImages: 'id, scope, ownerId',
      characterGroups: 'id, name, updatedAt',
      sharedStashes: 'id, name, groupId, updatedAt',
    })

    this.version(15).stores({
      worldNotes: 'id, title, folderId, pinned, updatedAt',
      worldFolders: 'id, name, parentId, updatedAt',
      worldMaps: 'id, name, updatedAt',
      worldAssets: 'id, kind, name, updatedAt',
    })
  }
}

export const db = new PathfinderDB()

async function ensureSettings(): Promise<AppSettings> {
  const existing = await db.settings.get('app')
  if (existing) return existing

  const settings: AppSettings = {
    id: 'app',
    theme: 'system',
    language: 'pt-BR',
    showModifierBreakdown: true,
    sourceTooltipDelaySeconds: DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS,
    diceToastDurationSeconds: 30,
    uiScale: 1,
    ctrlScrollZoomEnabled: true,
    freeArchetypeEnabled: false,
    freeArchetypeIgnoreDedicationLock: false,
    mythicRulesEnabled: false,
    ancestryParagonEnabled: false,
    dualClassEnabled: false,
    gradualAbilityBoostsEnabled: false,
    automaticBonusProgressionEnabled: false,
    proficiencyWithoutLevelEnabled: false,
    seedVersion: 0,
  }
  await db.settings.put(settings)
  return settings
}

const SEEDED_TABLES: SeededTable[] = [
  'contentSources',
  'backgrounds',
  'ancestries',
  'heritages',
  'classes',
  'feats',
]

/** Contagem por tabela — barata, ao contrário de varrer registro a registro */
async function countSeededTables(): Promise<Record<SeededTable, number>> {
  const [contentSources, backgrounds, ancestries, heritages, classes, feats] =
    await Promise.all([
      db.contentSources.count(),
      db.backgrounds.count(),
      db.ancestries.count(),
      db.heritages.count(),
      db.classes.count(),
      db.feats.count(),
    ])
  return { contentSources, backgrounds, ancestries, heritages, classes, feats }
}

/**
 * O banco já tem tudo o que o seed atual grava?
 *
 * Compara com `>=` porque homebrew soma linhas às mesmas tabelas: o total real
 * pode passar do que o seed escreveu, mas nunca deve ficar abaixo.
 */
function seedIsSatisfied(
  settings: AppSettings,
  counts: Record<SeededTable, number>,
): boolean {
  if (settings.seedVersion !== CURRENT_SEED_VERSION) return false
  const expected = settings.seedCounts
  if (!expected) return false
  return SEEDED_TABLES.every((table) => counts[table] >= (expected[table] ?? 0))
}

/**
 * Carrega os módulos de conteúdo sob demanda.
 *
 * São ~900 KB de dados que só interessam na primeira carga ou quando o
 * `CURRENT_SEED_VERSION` sobe. Mantê-los fora do bundle inicial faz o app
 * abrir sem baixar o compêndio inteiro — e é o mesmo mecanismo que servirá
 * para pacotes de idioma no futuro.
 */
async function loadSeedContent() {
  const [ancestries, backgrounds, classes, feats, sources, localize] =
    await Promise.all([
      import('@/data/seeds/ancestries'),
      import('@/data/seeds/backgrounds'),
      import('@/data/seeds/classes'),
      import('@/data/seeds/feats'),
      import('@/data/seeds/sources'),
      import('@/features/feats/localizeFeats'),
    ])
  return {
    officialAncestries: ancestries.officialAncestries,
    officialHeritages: ancestries.officialHeritages,
    officialBackgrounds: backgrounds.officialBackgrounds,
    officialClasses: classes.officialClasses,
    officialFeats: feats.officialFeats,
    officialSources: sources.officialSources,
    withLocalizedFeatName: localize.withLocalizedFeatName,
  }
}

/**
 * Seed idempotente.
 * - Sai cedo quando a versão e as contagens já batem (caso comum).
 * - Conteúdo oficial ausente é inserido.
 * - Quando CURRENT_SEED_VERSION sobe, registros oficiais do seed são atualizados (upsert),
 *   sem tocar em homebrew.
 */
export async function seedOfficialContent(): Promise<void> {
  const settings = await ensureSettings()
  const counts = await countSeededTables()
  if (seedIsSatisfied(settings, counts)) return

  const shouldRefreshOfficial = settings.seedVersion < CURRENT_SEED_VERSION
  const now = nowIso()

  // Fora da transação de propósito: um await não-Dexie a encerraria.
  const {
    officialAncestries,
    officialHeritages,
    officialBackgrounds,
    officialClasses,
    officialFeats,
    officialSources,
    withLocalizedFeatName,
  } = await loadSeedContent()

  await db.transaction(
    'rw',
    [
      db.contentSources,
      db.backgrounds,
      db.ancestries,
      db.heritages,
      db.classes,
      db.feats,
      db.settings,
    ],
    async () => {
      for (const source of officialSources) {
        const exists = await db.contentSources.get(source.id)
        if (!exists) {
          await db.contentSources.add(source)
        } else if (shouldRefreshOfficial) {
          await db.contentSources.put({ ...exists, ...source })
        }
      }

      for (const background of officialBackgrounds) {
        const exists = await db.backgrounds.get(background.id)
        if (!exists) {
          await db.backgrounds.add({
            ...background,
            createdAt: now,
            updatedAt: now,
          })
        } else if (
          shouldRefreshOfficial &&
          exists.provenance.type === 'official'
        ) {
          await db.backgrounds.put({
            ...background,
            createdAt: exists.createdAt ?? now,
            updatedAt: now,
          })
        }
      }

      for (const ancestry of officialAncestries) {
        const exists = await db.ancestries.get(ancestry.id)
        if (!exists) {
          await db.ancestries.add({
            ...ancestry,
            createdAt: now,
            updatedAt: now,
          })
        } else if (
          shouldRefreshOfficial &&
          exists.provenance.type === 'official'
        ) {
          await db.ancestries.put({
            ...ancestry,
            createdAt: exists.createdAt ?? now,
            updatedAt: now,
          })
        }
      }

      for (const heritage of officialHeritages) {
        const exists = await db.heritages.get(heritage.id)
        if (!exists) {
          await db.heritages.add({
            ...heritage,
            createdAt: now,
            updatedAt: now,
          })
        } else if (
          shouldRefreshOfficial &&
          exists.provenance.type === 'official'
        ) {
          await db.heritages.put({
            ...heritage,
            createdAt: exists.createdAt ?? now,
            updatedAt: now,
          })
        }
      }

      if (shouldRefreshOfficial) {
        const keepHeritageIds = new Set(officialHeritages.map((h) => h.id))
        const staleHeritages = await db.heritages
          .filter(
            (h) =>
              h.provenance.type === 'official' && !keepHeritageIds.has(h.id),
          )
          .toArray()
        for (const stale of staleHeritages) {
          await db.heritages.delete(stale.id)
        }
      }

      for (const characterClass of officialClasses) {
        const exists = await db.classes.get(characterClass.id)
        if (!exists) {
          await db.classes.add({
            ...characterClass,
            createdAt: now,
            updatedAt: now,
          })
        } else if (
          shouldRefreshOfficial &&
          exists.provenance.type === 'official'
        ) {
          await db.classes.put({
            ...characterClass,
            createdAt: exists.createdAt ?? now,
            updatedAt: now,
          })
        }
      }

      for (const feat of officialFeats) {
        const localized = withLocalizedFeatName(feat)
        const exists = await db.feats.get(localized.id)
        if (!exists) {
          await db.feats.add({
            ...localized,
            createdAt: now,
            updatedAt: now,
          })
        } else if (
          shouldRefreshOfficial &&
          exists.provenance.type === 'official'
        ) {
          await db.feats.put({
            ...localized,
            createdAt: exists.createdAt ?? now,
            updatedAt: now,
          })
        }
      }

      if (shouldRefreshOfficial) {
        const keepFeatIds = new Set(officialFeats.map((f) => f.id))
        const staleFeats = await db.feats
          .filter(
            (f) => f.provenance.type === 'official' && !keepFeatIds.has(f.id),
          )
          .toArray()
        for (const stale of staleFeats) {
          await db.feats.delete(stale.id)
        }
      }

      /**
       * Registra o que o seed gravou. É isso que permite pular todo o
       * trabalho acima nas próximas inicializações.
       */
      await db.settings.update('app', {
        seedVersion: CURRENT_SEED_VERSION,
        seedCounts: {
          contentSources: officialSources.length,
          backgrounds: officialBackgrounds.length,
          ancestries: officialAncestries.length,
          heritages: officialHeritages.length,
          classes: officialClasses.length,
          feats: officialFeats.length,
        },
      })
    },
  )
}

/** Recarrega os registros homebrew usados pelo motor (após importar JSON). */
export async function refreshHomebrewRegistries(): Promise<void> {
  const { setHomebrewArchetypes } = await import('@/engine/archetypeRegistry')
  const homebrewArchetypes = await db.archetypes
    .filter((a) => a.provenance.type === 'homebrew')
    .toArray()
  setHomebrewArchetypes(homebrewArchetypes)
  const { setHomebrewCompanions } = await import('@/engine/companionRegistry')
  const homebrewCompanions = await db.companionTypes
    .filter((c) => c.provenance.type === 'homebrew')
    .toArray()
  setHomebrewCompanions(homebrewCompanions)
  const { setHomebrewItems } = await import('@/engine/equipmentRegistry')
  const homebrewItems = await db.itemDefinitions
    .filter((item) => item.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewItems(homebrewItems)
  const { setHomebrewSpells } = await import('@/engine/spellRegistry')
  const homebrewSpells = await db.spells
    .filter((spell) => spell.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewSpells(homebrewSpells)
  const { setHomebrewRituals } = await import('@/engine/ritualRegistry')
  const homebrewRituals = await db.rituals
    .filter((ritual) => ritual.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewRituals(homebrewRituals)
  const { setHomebrewDeities } = await import('@/engine/deityRegistry')
  const homebrewDeities = await db.deities
    .filter((deity) => deity.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewDeities(homebrewDeities)
  const { setHomebrewCreatures } = await import('@/engine/creatureRegistry')
  const homebrewCreatures = await db.creatures
    .filter((creature) => creature.provenance?.type === 'homebrew')
    .toArray()
  setHomebrewCreatures(homebrewCreatures)
}

export async function initializeDatabase(): Promise<void> {
  await db.open()
  await seedOfficialContent()
  await refreshHomebrewRegistries()
}
