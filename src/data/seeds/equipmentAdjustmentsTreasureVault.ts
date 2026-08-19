import { catalogItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const TV = 'Treasure Vault (Remastered)' as const

/**
 * TREASURE VAULT ADJUSTMENTS — Treasure Vault (Remastered).
 * Só Remaster (AoN source 191). Sem conteúdo Legacy.
 */
export const TREASURE_VAULT_ADJUSTMENTS: ItemDefinition[] = [
  catalogItem({
    id: "adjustment-1824",
    aonId: 1824,
    name: "Travas de armadura",
    originalName: "Armor Latches",
    category: "adventuringGear",
    description: "A armadura se tira com facilidade e ganha o traço ruidoso (não pode receber o ajuste se já o tiver). Despir é uma atividade de 3 ações (manipular). Não altera o tempo para vestir.",
    page: 11,
    sourceBook: TV,
    level: 1,
    priceCp: 400,
    bulk: '—',
    usage: "other",
    traits: ["Adjustment"],
  }),
  catalogItem({
    id: "adjustment-1825",
    aonId: 1825,
    name: "Armazenamento",
    originalName: "Storage",
    category: "adventuringGear",
    description: "Cintos, fivelas e bolsos para ferramentas. Enquanto usa a armadura, pode carregar até 3 Volume de ferramentas (em vez de 2). A armadura ganha o traço ruidoso; se já o tiver, a penalidade em Furtividade aumenta em 1.",
    page: 11,
    sourceBook: TV,
    level: 0,
    priceCp: 100,
    bulk: 'L',
    usage: "other",
    traits: ["Adjustment"],
  }),
  catalogItem({
    id: "adjustment-1826",
    aonId: 1826,
    name: "Arnês de arma",
    originalName: "Weapon Harness",
    category: "adventuringGear",
    description: "Arnês flexível em cada braçal para uma arma corpo a corpo de Volume leve ou menor. Prender ou soltar: Interagir (outra criatura pode fazê-lo se você permitir ou não puder agir). Precisa soltar do suporte antes de Soltar ou guardar de vez. +1 de circunstância na CD de Reflexos contra Desarmar essa arma. Se cair, fica pendurada no braçal; recupera no tempo normal de sacar. Não pode arremessar nem usar habilidades que a afastem de você.",
    page: 11,
    sourceBook: TV,
    level: 1,
    priceCp: 600,
    bulk: 'L',
    usage: "other",
    rarity: "uncommon",
    traits: ["Adjustment"],
  }),
]
