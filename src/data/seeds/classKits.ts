import {
  CLASS_ALCHEMIST_ID,
  CLASS_ANIMIST_ID,
  CLASS_BARBARIAN_ID,
  CLASS_BARD_ID,
  CLASS_CHAMPION_ID,
  CLASS_CLERIC_ID,
  CLASS_COMMANDER_ID,
  CLASS_DRUID_ID,
  CLASS_EXEMPLAR_ID,
  CLASS_FIGHTER_ID,
  CLASS_GUARDIAN_ID,
  CLASS_GUNSLINGER_ID,
  CLASS_INVENTOR_ID,
  CLASS_INVESTIGATOR_ID,
  CLASS_KINETICIST_ID,
  CLASS_MAGUS_ID,
  CLASS_MONK_ID,
  CLASS_NECROMANCER_ID,
  CLASS_ORACLE_ID,
  CLASS_PSYCHIC_ID,
  CLASS_RANGER_ID,
  CLASS_ROGUE_ID,
  CLASS_RUNESMITH_ID,
  CLASS_SORCERER_ID,
  CLASS_SUMMONER_ID,
  CLASS_SWASHBUCKLER_ID,
  CLASS_THAUMATURGE_ID,
  CLASS_WITCH_ID,
  CLASS_WIZARD_ID,
} from './ids'

/** 15 po em peças de cobre (Player Core pg. 267). */
export const STARTING_WEALTH_CP = 1500

export interface ClassKitItem {
  originalName: string
  quantity?: number
}

export interface ClassKitDefinition {
  id: string
  classId: string
  name: string
  originalName: string
  /** Custo do kit em pc (AoN). Sobra = 15 po − custo. */
  priceCp: number
  leftoverCp: number
  /** Carga do pacote no AoN, ex.: "3 Carga, 7 leve". */
  bulkLabel: string
  items: ClassKitItem[]
  /** Opções pagas com a sobra — só texto na UI. */
  optionsHint?: string
  sourceBook: string
  sourcePage: number
  aonUrl: string
  /** Kit sugerido (não há pacote oficial no AoN Remaster). */
  suggested?: boolean
}

/** Conteúdo do Pacote de aventureiro (Player Core pg. 268 / AoN). */
export const ADVENTURER_PACK_CONTENTS: ClassKitItem[] = [
  { originalName: 'Backpack' },
  { originalName: 'Bedroll' },
  { originalName: 'Chalk', quantity: 10 },
  { originalName: 'Flint and Steel' },
  { originalName: 'Rope' },
  { originalName: 'Rations', quantity: 2 },
  { originalName: 'Soap' },
  { originalName: 'Torch', quantity: 5 },
  { originalName: 'Waterskin' },
]

export const ADVENTURER_PACK_ORIGINAL_NAME = "Adventurer's Pack"

/** Classes Remaster sem pacote rápido oficial no Player Core / Player Core 2. */
export const CLASSES_WITHOUT_REMASTER_KIT: Array<{
  classId: string
  name: string
  book: string
}> = [
  { classId: CLASS_MAGUS_ID, name: 'Magus', book: 'Impossible Magic' },
  { classId: CLASS_SUMMONER_ID, name: 'Invocador', book: 'Impossible Magic' },
  { classId: CLASS_NECROMANCER_ID, name: 'Necromante', book: 'Impossible Magic' },
  { classId: CLASS_RUNESMITH_ID, name: 'Forjador de Runas', book: 'Impossible Magic' },
  { classId: CLASS_PSYCHIC_ID, name: 'Psíquico', book: 'Dark Archives Remastered' },
  { classId: CLASS_THAUMATURGE_ID, name: 'Taumaturgo', book: 'Dark Archives Remastered' },
  { classId: CLASS_KINETICIST_ID, name: 'Cinético', book: 'Rage of Elements' },
  { classId: CLASS_GUNSLINGER_ID, name: 'Pistolero', book: 'Guns & Gears Remastered' },
  { classId: CLASS_INVENTOR_ID, name: 'Inventor', book: 'Guns & Gears Remastered' },
  { classId: CLASS_ANIMIST_ID, name: 'Animista', book: 'War of Immortals' },
  { classId: CLASS_EXEMPLAR_ID, name: 'Exemplar', book: 'War of Immortals' },
  { classId: CLASS_COMMANDER_ID, name: 'Comandante', book: 'Battlecry!' },
  { classId: CLASS_GUARDIAN_ID, name: 'Guardião', book: 'Battlecry!' },
]

function kit(
  classId: string,
  originalName: string,
  name: string,
  priceCp: number,
  bulkLabel: string,
  items: ClassKitItem[],
  optionsHint: string | undefined,
  page: number,
  aonId: number,
  sourceBook: string,
  suggested?: boolean,
): ClassKitDefinition {
  return {
    id: `kit-${classId.replace(/^class-/, '')}`,
    classId,
    name,
    originalName,
    priceCp,
    leftoverCp: Math.max(0, STARTING_WEALTH_CP - priceCp),
    bulkLabel,
    items,
    optionsHint,
    sourceBook,
    sourcePage: page,
    aonUrl: aonId
      ? `https://2e.aonprd.com/ClassKits.aspx?ID=${aonId}`
      : '',
    suggested,
  }
}

function suggestedKit(
  classId: string,
  originalName: string,
  name: string,
  priceCp: number,
  bulkLabel: string,
  items: ClassKitItem[],
  optionsHint: string | undefined,
  sourceBook: string,
): ClassKitDefinition {
  return kit(
    classId,
    originalName,
    name,
    priceCp,
    bulkLabel,
    items,
    optionsHint,
    0,
    0,
    sourceBook,
    true,
  )
}

/**
 * Pacotes rápidos Remaster (Player Core + Player Core 2).
 * Outras classes só têm a opção de 15 po no AoN.
 */
export const CLASS_KITS: ClassKitDefinition[] = [
  kit(
    CLASS_BARD_ID,
    'Bard Kit',
    'Kit de bardo',
    752,
    '4 Carga, 4 leve',
    [
      { originalName: 'Studded Leather Armor' },
      { originalName: 'Sling' },
      { originalName: 'Sling Bullets', quantity: 20 },
      { originalName: 'Rapier' },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
      { originalName: 'Musical Instrument (Handheld)' },
    ],
    undefined,
    268,
    17,
    'Player Core',
  ),
  kit(
    CLASS_CLERIC_ID,
    'Cleric Kit',
    'Kit de clérigo',
    170,
    '1 Carga, 2 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: "Adventurer's Pack" },
      { originalName: 'Religious Symbol (Wooden)' },
    ],
    'Arma predileta da divindade; cota de malha (6 po); kit de curandeiro (5 po).',
    268,
    18,
    'Player Core',
  ),
  kit(
    CLASS_DRUID_ID,
    'Druid Kit',
    'Kit de druida',
    400,
    '4 Carga, 4 leve',
    [
      { originalName: 'Hide Armor' },
      { originalName: 'Javelin', quantity: 4 },
      { originalName: 'Spear' },
      { originalName: "Adventurer's Pack" },
      { originalName: 'Primal Symbol' },
    ],
    'Kit de curandeiro (5 po).',
    268,
    19,
    'Player Core',
  ),
  kit(
    CLASS_FIGHTER_ID,
    'Fighter Kit',
    'Kit de guerreiro',
    580,
    '2 Carga, 2 leve',
    [
      { originalName: 'Scale Mail' },
      { originalName: 'Dagger' },
      { originalName: 'Grappling Hook' },
      { originalName: "Adventurer's Pack" },
    ],
    'Montante (2 po); arco longo com 20 flechas (6 po 2 pp); ou espada longa e escudo de aço (3 po).',
    268,
    20,
    'Player Core',
  ),
  kit(
    CLASS_RANGER_ID,
    'Ranger Kit',
    'Kit de patrulheiro',
    370,
    '2 Carga, 1 leve',
    [
      { originalName: 'Leather Armor' },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Arco longo com 20 flechas (6 po 2 pp); espada longa e escudo de aço (3 po); ou 2 espadas curtas (1 po 8 pp).',
    268,
    21,
    'Player Core',
  ),
  kit(
    CLASS_ROGUE_ID,
    'Rogue Kit',
    'Kit de ladino',
    620,
    '4 Carga, 1 leve',
    [
      { originalName: 'Leather Armor' },
      { originalName: 'Rapier' },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Kit de ladrão (3 po).',
    268,
    22,
    'Player Core',
  ),
  kit(
    CLASS_WITCH_ID,
    'Witch Kit',
    'Kit de bruxa',
    182,
    '2 Carga, 5 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: 'Sickle' },
      { originalName: 'Sling' },
      { originalName: 'Sling Bullets', quantity: 20 },
      { originalName: 'Staff' },
      { originalName: "Adventurer's Pack" },
    ],
    'Panelas (1 po); kit de curandeiro (5 po).',
    268,
    23,
    'Player Core',
  ),
  kit(
    CLASS_WIZARD_ID,
    'Wizard Kit',
    'Kit de mago',
    260,
    '2 Carga, 2 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: 'Staff' },
      { originalName: 'Writing Set' },
      { originalName: "Adventurer's Pack" },
    ],
    'Besta com 20 virotes (3 po 2 pp).',
    268,
    24,
    'Player Core',
  ),
  kit(
    CLASS_ALCHEMIST_ID,
    'Alchemist Kit',
    'Kit de alquimista',
    832,
    '3 Carga, 7 leve',
    [
      { originalName: 'Studded Leather Armor' },
      { originalName: 'Sling' },
      { originalName: 'Sling Bullets', quantity: 20 },
      { originalName: 'Dagger' },
      { originalName: 'Caltrops', quantity: 2 },
      { originalName: "Alchemist's Toolkit" },
      { originalName: "Adventurer's Pack" },
    ],
    'Kit de reparo (2 po).',
    277,
    25,
    'Player Core 2',
  ),
  kit(
    CLASS_BARBARIAN_ID,
    'Barbarian Kit',
    'Kit de bárbaro',
    400,
    '3 Carga, 5 leve',
    [
      { originalName: 'Hide Armor' },
      { originalName: 'Javelin', quantity: 4 },
      { originalName: 'Grappling Hook' },
      { originalName: "Adventurer's Pack" },
    ],
    'Machado grande (2 po); clava grande (1 po); montante (2 po); ou machado de batalha e escudo de aço (3 po).',
    277,
    26,
    'Player Core 2',
  ),
  kit(
    CLASS_CHAMPION_ID,
    'Champion Kit',
    'Kit de campeão',
    870,
    '3 Carga, 7 leve',
    [
      { originalName: 'Chain Mail' },
      { originalName: 'Javelin', quantity: 4 },
      { originalName: 'Dagger' },
      { originalName: 'Grappling Hook' },
      { originalName: 'Crowbar' },
      { originalName: "Adventurer's Pack" },
    ],
    'Escudo de aço (2 po); arma predileta da divindade.',
    277,
    27,
    'Player Core 2',
  ),
  kit(
    CLASS_INVESTIGATOR_ID,
    'Investigator Kit',
    'Kit de investigador',
    920,
    '3 Carga, 5 leve',
    [
      { originalName: 'Studded Leather Armor' },
      { originalName: 'Shortsword' },
      { originalName: 'Sap' },
      { originalName: 'Crossbow' },
      { originalName: 'Bolts', quantity: 20 },
      { originalName: 'Crowbar' },
      { originalName: "Adventurer's Pack" },
    ],
    'Kit de alquimista (3 po); algemas simples (3 po); estojo de escrita (1 po).',
    277,
    28,
    'Player Core 2',
  ),
  kit(
    CLASS_MONK_ID,
    'Monk Kit',
    'Kit de monge',
    530,
    '3 Carga, 3 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: 'Dart', quantity: 10 },
      { originalName: 'Grappling Hook' },
      { originalName: 'Climbing Kit' },
      { originalName: "Adventurer's Pack" },
      { originalName: 'Smoke Ball (Lesser)' },
    ],
    'Cajado (0 po); lança longa (5 pp).',
    277,
    29,
    'Player Core 2',
  ),
  kit(
    CLASS_ORACLE_ID,
    'Oracle Kit',
    'Kit de oráculo',
    552,
    '3 Carga, 3 leve',
    [
      { originalName: 'Studded Leather Armor' },
      { originalName: 'Sling' },
      { originalName: 'Sling Bullets', quantity: 20 },
      { originalName: 'Mace' },
      { originalName: "Adventurer's Pack" },
    ],
    'Escudo de aço (2 po); kit de curandeiro (5 po).',
    277,
    30,
    'Player Core 2',
  ),
  kit(
    CLASS_SORCERER_ID,
    'Sorcerer Kit',
    'Kit de feiticeiro',
    242,
    '1 Carga, 7 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: 'Sling' },
      { originalName: 'Sling Bullets', quantity: 20 },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Estrepes (2 conjuntos).',
    277,
    31,
    'Player Core 2',
  ),
  kit(
    CLASS_SWASHBUCKLER_ID,
    'Swashbuckler Kit',
    'Kit de espadachim',
    870,
    '3 Carga, 3 leve',
    [
      { originalName: 'Leather Armor' },
      { originalName: 'Hand Crossbow' },
      { originalName: 'Bolts', quantity: 20 },
      { originalName: 'Rapier' },
      { originalName: "Adventurer's Pack" },
    ],
    'Broquel (1 po); capa de duelo (5 pp); roupa fina (2 po); gancho (1 pp); adaga main-gauche (5 pp).',
    277,
    32,
    'Player Core 2',
  ),
  suggestedKit(
    CLASS_MAGUS_ID,
    'Magus Kit (Suggested)',
    'Kit de magus',
    570,
    '3 Carga, 2 leve',
    [
      { originalName: 'Studded Leather Armor' },
      { originalName: 'Longsword' },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Escudo de aço (2 po); livro de fórmulas em branco (1 po); besta com 20 virotes (3 po 2 pp).',
    'Impossible Magic',
  ),
  suggestedKit(
    CLASS_SUMMONER_ID,
    'Summoner Kit (Suggested)',
    'Kit de invocador',
    180,
    '1 Carga, 3 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: 'Staff' },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Kit de curandeiro (5 po); estrepes (2 conjuntos).',
    'Impossible Magic',
  ),
  suggestedKit(
    CLASS_NECROMANCER_ID,
    'Necromancer Kit (Suggested)',
    'Kit de necromante',
    280,
    '2 Carga, 2 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: 'Staff' },
      { originalName: 'Dagger' },
      { originalName: 'Writing Set' },
      { originalName: "Adventurer's Pack" },
    ],
    'Símbolo religioso de madeira (1 pp); livro de fórmulas em branco (1 po).',
    'Impossible Magic',
  ),
  suggestedKit(
    CLASS_RUNESMITH_ID,
    'Runesmith Kit (Suggested)',
    'Kit de forjador de runas',
    770,
    '4 Carga, 2 leve',
    [
      { originalName: 'Leather Armor' },
      { originalName: "Artisan's Toolkit" },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Kit de reparos (2 po); martelo (1 pp).',
    'Impossible Magic',
  ),
  suggestedKit(
    CLASS_PSYCHIC_ID,
    'Psychic Kit (Suggested)',
    'Kit de psíquico',
    182,
    '1 Carga, 7 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: 'Sling' },
      { originalName: 'Sling Bullets', quantity: 20 },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Estrepes (2 conjuntos); estojo de escrita (1 po).',
    'Dark Archives Remastered',
  ),
  suggestedKit(
    CLASS_THAUMATURGE_ID,
    'Thaumaturge Kit (Suggested)',
    'Kit de taumaturgo',
    560,
    '3 Carga, 3 leve',
    [
      { originalName: 'Studded Leather Armor' },
      { originalName: 'Shortsword' },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Implementos vêm da classe. Kit de curandeiro (5 po); lanterna (1 pp).',
    'Dark Archives Remastered',
  ),
  suggestedKit(
    CLASS_KINETICIST_ID,
    'Kineticist Kit (Suggested)',
    'Kit de cinético',
    352,
    '2 Carga, 7 leve',
    [
      { originalName: 'Leather Armor' },
      { originalName: 'Sling' },
      { originalName: 'Sling Bullets', quantity: 20 },
      { originalName: "Adventurer's Pack" },
    ],
    'Cota de malha (6 po) se quiser mais proteção; kit de curandeiro (5 po).',
    'Rage of Elements',
  ),
  suggestedKit(
    CLASS_GUNSLINGER_ID,
    'Gunslinger Kit (Suggested)',
    'Kit de pistolero',
    790,
    '3 Carga, 2 leve',
    [
      { originalName: 'Leather Armor' },
      { originalName: 'Flintlock Pistol' },
      { originalName: 'Black Powder (Dose or Round)', quantity: 20 },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Mosquete de pederneira (5 po) no lugar da pistola; mais pólvora; kit de reparos (2 po).',
    'Guns & Gears Remastered',
  ),
  suggestedKit(
    CLASS_INVENTOR_ID,
    'Inventor Kit (Suggested)',
    'Kit de inventor',
    770,
    '4 Carga, 2 leve',
    [
      { originalName: 'Leather Armor' },
      { originalName: "Artisan's Toolkit" },
      { originalName: 'Dagger' },
      { originalName: "Adventurer's Pack" },
    ],
    'Kit de reparos (2 po); inovações e engenhocas vêm da classe.',
    'Guns & Gears Remastered',
  ),
  suggestedKit(
    CLASS_ANIMIST_ID,
    'Animist Kit (Suggested)',
    'Kit de animista',
    170,
    '1 Carga, 2 leve',
    [
      { originalName: "Explorer's Clothing" },
      { originalName: "Adventurer's Pack" },
      { originalName: 'Religious Symbol (Wooden)' },
    ],
    'Cajado; kit de curandeiro (5 po); cota de malha (6 po).',
    'War of Immortals',
  ),
  suggestedKit(
    CLASS_EXEMPLAR_ID,
    'Exemplar Kit (Suggested)',
    'Kit de exemplar',
    850,
    '3 Carga, 2 leve',
    [
      { originalName: 'Scale Mail' },
      { originalName: 'Longsword' },
      { originalName: 'Steel Shield' },
      { originalName: "Adventurer's Pack" },
    ],
    'Ícones vêm da classe. Montante (2 po); arco curto com 20 flechas (3 po 2 pp).',
    'War of Immortals',
  ),
  suggestedKit(
    CLASS_COMMANDER_ID,
    'Commander Kit (Suggested)',
    'Kit de comandante',
    850,
    '3 Carga, 2 leve',
    [
      { originalName: 'Scale Mail' },
      { originalName: 'Longsword' },
      { originalName: 'Steel Shield' },
      { originalName: "Adventurer's Pack" },
    ],
    'Estandarte vem da classe. Cota de malha (6 po); kit de curandeiro (5 po).',
    'Battlecry!',
  ),
  suggestedKit(
    CLASS_GUARDIAN_ID,
    'Guardian Kit (Suggested)',
    'Kit de guardião',
    850,
    '3 Carga, 2 leve',
    [
      { originalName: 'Scale Mail' },
      { originalName: 'Longsword' },
      { originalName: 'Steel Shield' },
      { originalName: "Adventurer's Pack" },
    ],
    'Cota de malha (6 po); kit de curandeiro (5 po).',
    'Battlecry!',
  ),
]

export const CLASS_KITS_BY_CLASS_ID = Object.fromEntries(
  CLASS_KITS.map((k) => [k.classId, k]),
) as Record<string, ClassKitDefinition>

export function getClassKit(classId: string | null | undefined): ClassKitDefinition | null {
  if (!classId) return null
  return CLASS_KITS_BY_CLASS_ID[classId] ?? null
}
