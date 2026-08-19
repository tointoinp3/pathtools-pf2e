import type { CreatureSize } from '@/types/ancestry'

/**
 * Entrada genérica do catálogo de criaturas.
 * Animal Despertado usa `awakened-animal`. Outros catálogos entram aqui
 * quando o compêndio precisar.
 */
export interface CreatureCatalogEntry {
  id: string
  name: string
  originalName: string
  size?: CreatureSize
  /** Ex.: animal, beast — usado para filtrar o Animal Despertado. */
  kinds: string[]
}

export const AWAKENED_ANIMAL_CATALOG_ID = 'awakened-animal'

/**
 * Catálogos nomeados. Animal Despertado usa `awakened-animal`.
 *
 * Lista Remaster (Monster Core, Monster Core 2, Howl of the Wild) de
 * animais Tiny–Large, sem enxames, mais formas comuns que o jogador
 * costuma anotar. O campo custom da ancestralidade continua liberado.
 */
export const CREATURE_CATALOGS: Record<string, CreatureCatalogEntry[]> = {
  [AWAKENED_ANIMAL_CATALOG_ID]: [
    { id: "animal-apothecary-bee", name: "Abelha Boticária", originalName: "Apothecary Bee", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-jellyfish", name: "Água-viva Gigante", originalName: "Giant Jellyfish", size: "large", kinds: ['animal'] },
    { id: "animal-eagle", name: "Águia", originalName: "Eagle", size: "small", kinds: ['animal'] },
    { id: "animal-moose", name: "Alce", originalName: "Moose", size: "large", kinds: ['animal'] },
    { id: "animal-almiraj", name: "Almiraj", originalName: "Almiraj", size: "small", kinds: ['animal'] },
    { id: "animal-amphisbaena", name: "Anfisbena", originalName: "Amphisbaena", size: "medium", kinds: ['animal'] },
    { id: "animal-ankhrav", name: "Ankhrav", originalName: "Ankhrav", size: "large", kinds: ['animal'] },
    { id: "animal-spider", name: "Aranha", originalName: "Spider", size: "tiny", kinds: ['animal'] },
    { id: "animal-hunting-spider", name: "Aranha Caçadora", originalName: "Hunting Spider", size: "medium", kinds: ['animal'] },
    { id: "animal-dream-spider", name: "Aranha dos Sonhos", originalName: "Dream Spider", size: "small", kinds: ['animal'] },
    { id: "animal-terror-bird", name: "Ave do Terror", originalName: "Terror Bird", size: "large", kinds: ['animal'] },
    { id: "animal-giant-cockroach", name: "Barata Gigante", originalName: "Giant Cockroach", size: "small", kinds: ['animal'] },
    { id: "animal-flash-beetle", name: "Besouro-relâmpago", originalName: "Flash Beetle", size: "small", kinds: ['animal'] },
    { id: "animal-giant-stag-beetle", name: "Besouro-veado Gigante", originalName: "Giant Stag Beetle", size: "large", kinds: ['animal'] },
    { id: "animal-bison", name: "Bisão", originalName: "Bison", size: "large", kinds: ['animal'] },
    { id: "animal-giant-coppermouth", name: "Boca-de-cobre Gigante", originalName: "Giant Coppermouth", size: "medium", kinds: ['animal'] },
    { id: "animal-goat", name: "Cabra", originalName: "Goat", size: "small", kinds: ['animal'] },
    { id: "animal-stony-goat", name: "Cabra Pétrea", originalName: "Stony Goat", size: "small", kinds: ['animal'] },
    { id: "animal-giant-chameleon", name: "Camaleão Gigante", originalName: "Giant Chameleon", size: "large", kinds: ['animal'] },
    { id: "animal-camel", name: "Camelo", originalName: "Camel", size: "large", kinds: ['animal'] },
    { id: "animal-mouse", name: "Camundongo", originalName: "Mouse", size: "tiny", kinds: ['animal'] },
    { id: "animal-dog", name: "Cão", originalName: "Dog", size: "small", kinds: ['animal'] },
    { id: "animal-guard-dog", name: "Cão de Guarda", originalName: "Guard Dog", size: "small", kinds: ['animal'] },
    { id: "animal-riding-dog", name: "Cão de Montaria", originalName: "Riding Dog", size: "medium", kinds: ['animal'] },
    { id: "animal-goblin-dog", name: "Cão Goblin", originalName: "Goblin Dog", size: "medium", kinds: ['animal'] },
    { id: "animal-crab", name: "Caranguejo", originalName: "Crab", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-crab", name: "Caranguejo Gigante", originalName: "Giant Crab", size: "medium", kinds: ['animal'] },
    { id: "animal-horse", name: "Cavalo", originalName: "Horse", size: "large", kinds: ['animal'] },
    { id: "animal-war-horse", name: "Cavalo de Guerra", originalName: "War Horse", size: "large", kinds: ['animal'] },
    { id: "animal-riding-horse", name: "Cavalo de Montaria", originalName: "Riding Horse", size: "large", kinds: ['animal'] },
    { id: "animal-giant-centipede", name: "Centopeia Gigante", originalName: "Giant Centipede", size: "medium", kinds: ['animal'] },
    { id: "animal-deer", name: "Cervo", originalName: "Deer", size: "medium", kinds: ['animal'] },
    { id: "animal-crying-cicada", name: "Cigarra Chorona", originalName: "Crying Cicada", size: "small", kinds: ['animal'] },
    { id: "animal-swan", name: "Cisne", originalName: "Swan", size: "medium", kinds: ['animal'] },
    { id: "animal-snake", name: "Cobra", originalName: "Snake", size: "small", kinds: ['animal'] },
    { id: "animal-emperor-cobra", name: "Cobra-imperador", originalName: "Emperor Cobra", size: "large", kinds: ['animal'] },
    { id: "animal-sea-snake", name: "Cobra-marinha", originalName: "Sea Snake", size: "small", kinds: ['animal'] },
    { id: "animal-rabbit", name: "Coelho", originalName: "Rabbit", size: "tiny", kinds: ['animal'] },
    { id: "animal-compsognathus", name: "Compsognato", originalName: "Compsognathus", size: "tiny", kinds: ['animal'] },
    { id: "animal-owl", name: "Coruja", originalName: "Owl", size: "small", kinds: ['animal'] },
    { id: "animal-raven", name: "Corvo", originalName: "Raven", size: "tiny", kinds: ['animal'] },
    { id: "animal-trained-raven", name: "Corvo Treinado", originalName: "Trained Raven", size: "tiny", kinds: ['animal'] },
    { id: "animal-crocodile", name: "Crocodilo", originalName: "Crocodile", size: "large", kinds: ['animal'] },
    { id: "animal-daeodon", name: "Daeodonte", originalName: "Daeodon", size: "large", kinds: ['animal'] },
    { id: "animal-deinonychus", name: "Deinonico", originalName: "Deinonychus", size: "medium", kinds: ['animal'] },
    { id: "animal-giant-fangtooth", name: "Dente-de-sabre Gigante", originalName: "Giant Fangtooth", size: "medium", kinds: ['animal'] },
    { id: "animal-weasel", name: "Doninha", originalName: "Weasel", size: "tiny", kinds: ['animal'] },
    { id: "animal-electric-eel", name: "Enguia Elétrica", originalName: "Electric Eel", size: "small", kinds: ['animal'] },
    { id: "animal-scorpion", name: "Escorpião", originalName: "Scorpion", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-scorpion", name: "Escorpião Gigante", originalName: "Giant Scorpion", size: "large", kinds: ['animal'] },
    { id: "animal-smilodon", name: "Esmilodonte", originalName: "Smilodon", size: "large", kinds: ['animal'] },
    { id: "animal-squirrel", name: "Esquilo", originalName: "Squirrel", size: "tiny", kinds: ['animal'] },
    { id: "animal-taldan-cave-squirrel", name: "Esquilo-das-cavernas Taldano", originalName: "Taldan Cave Squirrel", size: "medium", kinds: ['animal'] },
    { id: "animal-flynkett", name: "Flynkett", originalName: "Flynkett", size: "small", kinds: ['animal'] },
    { id: "animal-harbor-seal", name: "Foca-comum", originalName: "Harbor Seal", size: "medium", kinds: ['animal'] },
    { id: "animal-leopard-seal", name: "Foca-leopardo", originalName: "Leopard Seal", size: "large", kinds: ['animal'] },
    { id: "animal-giant-ant", name: "Formiga Gigante", originalName: "Giant Ant", size: "medium", kinds: ['animal'] },
    { id: "animal-chicken", name: "Galinha", originalName: "Chicken", size: "tiny", kinds: ['animal'] },
    { id: "animal-skunk", name: "Gambá", originalName: "Skunk", size: "small", kinds: ['animal'] },
    { id: "animal-giant-opossum", name: "Gambá Gigante", originalName: "Giant Opossum", size: "large", kinds: ['animal'] },
    { id: "animal-goose", name: "Ganso", originalName: "Goose", size: "small", kinds: ['animal'] },
    { id: "animal-cat", name: "Gato", originalName: "Cat", size: "tiny", kinds: ['animal'] },
    { id: "animal-hawk", name: "Gavião", originalName: "Hawk", size: "small", kinds: ['animal'] },
    { id: "animal-giant-gecko", name: "Gecko Gigante", originalName: "Giant Gecko", size: "medium", kinds: ['animal'] },
    { id: "animal-magnetic-gecko", name: "Gecko Magnético", originalName: "Magnetic Gecko", size: "small", kinds: ['animal'] },
    { id: "animal-bottlenose-dolphin", name: "Golfinho-nariz-de-garrafa", originalName: "Bottlenose Dolphin", size: "medium", kinds: ['animal'] },
    { id: "animal-gorilla", name: "Gorila", originalName: "Gorilla", size: "large", kinds: ['animal'] },
    { id: "animal-crow", name: "Gralha", originalName: "Crow", size: "tiny", kinds: ['animal'] },
    { id: "animal-griffon", name: "Grifo", originalName: "Griffon", size: "large", kinds: ['animal'] },
    { id: "animal-raccoon", name: "Guaxinim", originalName: "Raccoon", size: "small", kinds: ['animal'] },
    { id: "animal-hexmoth", name: "Hexmariposa", originalName: "Hexmoth", size: "small", kinds: ['animal'] },
    { id: "animal-hexworm", name: "Hexverme", originalName: "Hexworm", size: "tiny", kinds: ['animal'] },
    { id: "animal-hyena", name: "Hiena", originalName: "Hyena", size: "medium", kinds: ['animal'] },
    { id: "animal-hyaenodon", name: "Hienodonte", originalName: "Hyaenodon", size: "large", kinds: ['animal'] },
    { id: "animal-hippocampus", name: "Hipocampo", originalName: "Hippocampus", size: "large", kinds: ['animal'] },
    { id: "animal-hippogriff", name: "Hipogrifo", originalName: "Hippogriff", size: "large", kinds: ['animal'] },
    { id: "animal-hippopotamus", name: "Hipopótamo", originalName: "Hippopotamus", size: "large", kinds: ['animal'] },
    { id: "animal-holdfast", name: "Holdfast", originalName: "Holdfast", size: "small", kinds: ['animal'] },
    { id: "animal-boar", name: "Javali", originalName: "Boar", size: "medium", kinds: ['animal'] },
    { id: "animal-krooth", name: "Krooth", originalName: "Krooth", size: "large", kinds: ['animal'] },
    { id: "animal-lizard", name: "Lagarto", originalName: "Lizard", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-frilled-lizard", name: "Lagarto-de-babado Gigante", originalName: "Giant Frilled Lizard", size: "large", kinds: ['animal'] },
    { id: "animal-giant-monitor-lizard", name: "Lagarto-monitor Gigante", originalName: "Giant Monitor Lizard", size: "medium", kinds: ['animal'] },
    { id: "animal-giant-maggot", name: "Larva Gigante", originalName: "Giant Maggot", size: "medium", kinds: ['animal'] },
    { id: "animal-lion", name: "Leão", originalName: "Lion", size: "large", kinds: ['animal'] },
    { id: "animal-leopard", name: "Leopardo", originalName: "Leopard", size: "medium", kinds: ['animal'] },
    { id: "animal-giant-dragonfly", name: "Libélula Gigante", originalName: "Giant Dragonfly", size: "medium", kinds: ['animal'] },
    { id: "animal-wolf", name: "Lobo", originalName: "Wolf", size: "medium", kinds: ['animal'] },
    { id: "animal-dire-wolf", name: "Lobo Atroz", originalName: "Dire Wolf", size: "large", kinds: ['animal'] },
    { id: "animal-otter", name: "Lontra", originalName: "Otter", size: "small", kinds: ['animal'] },
    { id: "animal-giant-mantis", name: "Louva-a-deus Gigante", originalName: "Giant Mantis", size: "large", kinds: ['animal'] },
    { id: "animal-monkey", name: "Macaco", originalName: "Monkey", size: "small", kinds: ['animal'] },
    { id: "animal-mjolgat", name: "Mjolgat", originalName: "Mjolgat", size: "small", kinds: ['animal'] },
    { id: "animal-bat", name: "Morcego", originalName: "Bat", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-bat", name: "Morcego Gigante", originalName: "Giant Bat", size: "large", kinds: ['animal'] },
    { id: "animal-giant-moray-eel", name: "Moreia Gigante", originalName: "Giant Moray Eel", size: "large", kinds: ['animal'] },
    { id: "animal-giant-fly", name: "Mosca Gigante", originalName: "Giant Fly", size: "medium", kinds: ['animal'] },
    { id: "animal-giant-mosquito", name: "Mosquito Gigante", originalName: "Giant Mosquito", size: "medium", kinds: ['animal'] },
    { id: "animal-giant-dragonfly-nymph", name: "Ninfa de Libélula Gigante", originalName: "Giant Dragonfly Nymph", size: "small", kinds: ['animal'] },
    { id: "animal-hedgehog", name: "Ouriço", originalName: "Hedgehog", size: "tiny", kinds: ['animal'] },
    { id: "animal-sheep", name: "Ovelha", originalName: "Sheep", size: "small", kinds: ['animal'] },
    { id: "animal-parrot", name: "Papagaio", originalName: "Parrot", size: "tiny", kinds: ['animal'] },
    { id: "animal-pachycephalosaurus", name: "Paquicefalossauro", originalName: "Pachycephalosaurus", size: "large", kinds: ['animal'] },
    { id: "animal-duck", name: "Pato", originalName: "Duck", size: "small", kinds: ['animal'] },
    { id: "animal-swordfish", name: "Peixe-espada", originalName: "Swordfish", size: "large", kinds: ['animal'] },
    { id: "animal-stonefish", name: "Peixe-pedra", originalName: "Stonefish", size: "tiny", kinds: ['animal'] },
    { id: "animal-terror-shrike", name: "Picanço do Terror", originalName: "Terror Shrike", size: "large", kinds: ['animal'] },
    { id: "animal-python", name: "Píton", originalName: "Python", size: "medium", kinds: ['animal'] },
    { id: "animal-platecarpus", name: "Platecarpo", originalName: "Platecarpus", size: "large", kinds: ['animal'] },
    { id: "animal-pigeon", name: "Pombo", originalName: "Pigeon", size: "tiny", kinds: ['animal'] },
    { id: "animal-war-pony", name: "Pônei de Guerra", originalName: "War Pony", size: "medium", kinds: ['animal'] },
    { id: "animal-riding-pony", name: "Pônei de Montaria", originalName: "Riding Pony", size: "medium", kinds: ['animal'] },
    { id: "animal-pig", name: "Porco", originalName: "Pig", size: "small", kinds: ['animal'] },
    { id: "animal-protoceratops", name: "Protoceratops", originalName: "Protoceratops", size: "medium", kinds: ['animal'] },
    { id: "animal-pteranodon", name: "Pteranodonte", originalName: "Pteranodon", size: "large", kinds: ['animal'] },
    { id: "animal-frog", name: "Rã", originalName: "Frog", size: "tiny", kinds: ['animal'] },
    { id: "animal-fox", name: "Raposa", originalName: "Fox", size: "small", kinds: ['animal'] },
    { id: "animal-rat", name: "Rato", originalName: "Rat", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-rat", name: "Rato Gigante", originalName: "Giant Rat", size: "small", kinds: ['animal'] },
    { id: "animal-rhinoceros", name: "Rinoceronte", originalName: "Rhinoceros", size: "large", kinds: ['animal'] },
    { id: "animal-woolly-rhinoceros", name: "Rinoceronte-lanoso", originalName: "Woolly Rhinoceros", size: "large", kinds: ['animal'] },
    { id: "animal-giant-leech", name: "Sanguessuga Gigante", originalName: "Giant Leech", size: "medium", kinds: ['animal'] },
    { id: "animal-toad", name: "Sapo", originalName: "Toad", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-frog", name: "Sapo Gigante", originalName: "Giant Frog", size: "medium", kinds: ['animal'] },
    { id: "animal-sporeback-frog", name: "Sapo-de-esporos", originalName: "Sporeback Frog", size: "large", kinds: ['animal'] },
    { id: "animal-spear-frog", name: "Sapo-lança", originalName: "Spear Frog", size: "tiny", kinds: ['animal'] },
    { id: "animal-scroungefeather", name: "Scroungefeather", originalName: "Scroungefeather", size: "small", kinds: ['animal'] },
    { id: "animal-slurk", name: "Slurk", originalName: "Slurk", size: "medium", kinds: ['animal'] },
    { id: "animal-giant-tarantula", name: "Tarântula Gigante", originalName: "Giant Tarantula", size: "large", kinds: ['animal'] },
    { id: "animal-turtle", name: "Tartaruga", originalName: "Turtle", size: "small", kinds: ['animal'] },
    { id: "animal-lightning-turtle", name: "Tartaruga-relâmpago", originalName: "Lightning Turtle", size: "large", kinds: ['animal'] },
    { id: "animal-badger", name: "Texugo", originalName: "Badger", size: "small", kinds: ['animal'] },
    { id: "animal-giant-badger", name: "Texugo Gigante", originalName: "Giant Badger", size: "medium", kinds: ['animal'] },
    { id: "animal-tiger", name: "Tigre", originalName: "Tiger", size: "large", kinds: ['animal'] },
    { id: "animal-hardhead-mole", name: "Toupeira Cabeça-dura", originalName: "Hardhead Mole", size: "small", kinds: ['animal'] },
    { id: "animal-trilobite", name: "Trilobita", originalName: "Trilobite", size: "tiny", kinds: ['animal'] },
    { id: "animal-troodon", name: "Troodonte", originalName: "Troodon", size: "medium", kinds: ['animal'] },
    { id: "animal-great-white-shark", name: "Tubarão-branco", originalName: "Great White Shark", size: "large", kinds: ['animal'] },
    { id: "animal-goblin-shark", name: "Tubarão-duende", originalName: "Goblin Shark", size: "large", kinds: ['animal'] },
    { id: "animal-bear", name: "Urso", originalName: "Bear", size: "large", kinds: ['animal'] },
    { id: "animal-cave-bear", name: "Urso das Cavernas", originalName: "Cave Bear", size: "large", kinds: ['animal'] },
    { id: "animal-grizzly-bear", name: "Urso-pardo", originalName: "Grizzly Bear", size: "large", kinds: ['animal'] },
    { id: "animal-velociraptor", name: "Velociraptor", originalName: "Velociraptor", size: "small", kinds: ['animal'] },
    { id: "animal-giant-wasp", name: "Vespa Gigante", originalName: "Giant Wasp", size: "large", kinds: ['animal'] },
    { id: "animal-viper", name: "Víbora", originalName: "Viper", size: "tiny", kinds: ['animal'] },
    { id: "animal-giant-viper", name: "Víbora Gigante", originalName: "Giant Viper", size: "medium", kinds: ['animal'] },
  ],
}

export function listCatalogCreatures(
  catalogId: string,
  kinds?: string[],
): CreatureCatalogEntry[] {
  const all = CREATURE_CATALOGS[catalogId] ?? []
  if (!kinds || kinds.length === 0) return all
  return all.filter((c) => kinds.some((k) => c.kinds.includes(k)))
}

export function getCatalogCreature(
  catalogId: string,
  id: string,
): CreatureCatalogEntry | undefined {
  return (CREATURE_CATALOGS[catalogId] ?? []).find((c) => c.id === id)
}

export function isCreatureCatalogReady(catalogId: string): boolean {
  return (CREATURE_CATALOGS[catalogId]?.length ?? 0) > 0
}
