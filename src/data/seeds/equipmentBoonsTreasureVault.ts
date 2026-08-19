import { catalogItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const TV = 'Treasure Vault (Remastered)' as const

/**
 * TREASURE VAULT BOONS — Treasure Vault (Remastered).
 * Só Remaster (AoN source 191). Sem conteúdo Legacy.
 */
export const TREASURE_VAULT_BOONS: ItemDefinition[] = [
  catalogItem({
    id: "boon-2370",
    aonId: 2370,
    name: "Semente ancestral",
    originalName: "Elder Seed",
    category: "other",
    description: "Semente enorme, perfeita e madura de árvore cara aos druidas da região; a vida vegetal cresce rápido ao redor. Quem toca entende o poder. Engolir inteira concede o efeito; passar na salvaguarda contra a bênção faz regurgitar a semente.",
    page: 187,
    sourceBook: TV,
    level: 11,
    priceCp: null,
    bulk: 'L',
    usage: "held",
    rarity: "rare",
    traits: ["Consumable","Primal"],
  }),
  catalogItem({
    id: "boon-2371",
    aonId: 2371,
    name: "Anel de sangue do coração",
    originalName: "Heartblood Ring",
    category: "other",
    description: "Sangue do coração lacrado no compartimento oculto de um anel de ouro: gosto de cobre inconfundível e textura espessa. O aroma estimula de forma agradável.",
    page: 187,
    sourceBook: TV,
    level: 15,
    priceCp: null,
    bulk: 'L',
    usage: "worn",
    rarity: "rare",
    traits: ["Consumable","Magical"],
  }),
  catalogItem({
    id: "boon-2372",
    aonId: 2372,
    name: "Cinza da fênix",
    originalName: "Phoenix Cinder",
    category: "other",
    description: "Cristal incandescente, cor de fogo moribundo, calor e paz. Um trinado baixo sugere usar o fogo para limpar e proteger. Oferece o poder a quem toca; é preciso aceitar de vontade própria para ganhar os efeitos da bênção.",
    page: 188,
    sourceBook: TV,
    level: 16,
    priceCp: null,
    bulk: '—',
    usage: "other",
    rarity: "rare",
    traits: ["Consumable","Fire","Primal"],
  }),
  catalogItem({
    id: "boon-2373",
    aonId: 2373,
    name: "Fragmento do vazio",
    originalName: "Void Fragment",
    category: "other",
    description: "Fragmento cristalino de cores em redemoinho, como estrelas e treva, flutuando e puxando com gravidade fria. Ao toque, some e deixa a pele com cor gangrenosa. Se o aceitante passar na salvaguarda inicial, o fragmento reaparece em algum lugar do mesmo planeta.",
    page: 189,
    sourceBook: TV,
    level: 13,
    priceCp: null,
    bulk: '—',
    usage: "other",
    rarity: "rare",
    traits: ["Consumable","Occult"],
  }),
]
