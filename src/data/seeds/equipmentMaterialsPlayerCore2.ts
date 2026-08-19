import { catalogItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const PC2 = "Player Core 2" as const

/**
 * PLAYER CORE 2 MATERIALS — Player Core 2.
 * Só Remaster. Sem conteúdo Legacy.
 */
export const PLAYER_CORE_2_MATERIALS: ItemDefinition[] = [
  catalogItem({
    id: "material-3268",
    aonId: 3268,
    name: "Couro de dragão",
    originalName: "Dragonhide",
    category: "material",
    description: "Couro e escamas de dragão para Fabricar itens de couro ou pele — e também armaduras de placas, sem metal. Imune a um tipo de dano conforme a tradição do dragão (arcana força, divina espírito, oculta mental, primordial veneno). Dureza/PV/RT — fino: padrão 4/16/8, alto 8/32/16; objeto: padrão 7/28/14, alto 11/44/22.",
    page: 0,
    sourceBook: PC2,
    level: 8,
    priceCp: 35000,
    bulk: 'L',
    usage: "other",
    rarity: "uncommon",
    traits: ["Precious"],
    subcategory: "Material precioso",
  }),
  catalogItem({
    id: "material-3268-standard",
    aonId: 3268,
    name: "Objeto de couro de dragão (grau padrão)",
    originalName: "Dragonhide Object (Standard-Grade)",
    category: "material",
    description: "Objeto simples não mágico de couro de dragão. Preço por Carga. Grau padrão: magia e runas até 15º nível. Imune a um tipo de dano da tradição do dragão. Fabricação: couro de dragão no valor de pelo menos 200 po + 20 por Carga.",
    page: 0,
    sourceBook: PC2,
    level: 8,
    priceCp: 35000,
    bulk: 'L',
    usage: "other",
    rarity: "uncommon",
    traits: ["Precious"],
    subcategory: "Material precioso",
  }),
  catalogItem({
    id: "material-3268-high",
    aonId: 3268,
    name: "Objeto de couro de dragão (grau alto)",
    originalName: "Dragonhide Object (High-Grade)",
    category: "material",
    description: "Objeto simples não mágico de couro de dragão puro. Preço por Carga. Grau alto: magia e runas de qualquer nível. Imune a um tipo de dano da tradição do dragão. Fabricação: couro de dragão no valor de pelo menos 16.000 po + 1.600 por Carga.",
    page: 0,
    sourceBook: PC2,
    level: 16,
    priceCp: 600000,
    bulk: 'L',
    usage: "other",
    rarity: "uncommon",
    traits: ["Precious"],
    subcategory: "Material precioso",
  }),
]
