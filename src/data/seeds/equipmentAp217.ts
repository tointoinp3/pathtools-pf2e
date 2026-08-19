import { catalogItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const AP217 = "Pathfinder #217: Death Sails a Wine-Dark Sea" as const

/**
 * AP 217 ITEMS — Pathfinder #217: Death Sails a Wine-Dark Sea.
 * Só Remaster. Sem conteúdo Legacy.
 */
export const AP_217_ITEMS: ItemDefinition[] = [
  catalogItem({
    id: "weapon-3994",
    aonId: 3994,
    name: "Clava de cabeça de hidra",
    originalName: "Hydra Head Club",
    category: "weapon",
    description: "Coluna e crânio de hidra morta, limpos por ave de carniça e feitos em clava +1 impactante; além dos traços normais, tem modular P (as mandíbulas se abrem) e a cabeça ainda treme. Regenera 1 PV por minuto, salvo se destruída por completo. Ativar — Estalo reativo (ataque) 1 vez ao dia; gatilho: você tenta um Golpe como Reação; o Golpe causa +1d6 de dano; se errar, a ativação não conta na frequência. Fabricação: crânio e coluna de hidra.",
    page: 0,
    sourceBook: AP217,
    level: 6,
    priceCp: 22500,
    bulk: 1,
    usage: "held",
    rarity: "rare",
    traits: ["Magical"],
    subcategory: "Arma mágica específica",
  }),
  catalogItem({
    id: "weapon-3995",
    aonId: 3995,
    name: "Último presente do protetor",
    originalName: "Protector's Final Gift",
    category: "weapon",
    description: "Ferrão de abelha gigante protetora da colmeia, usado como florete +1 impactante (em geral com guarda). Ativar — Ferroada da apiprofecia (manipular) 1 vez ao dia: o ferrão secreta veneno que cobre a lâmina e afeta a próxima criatura atingida com sucesso no próximo minuto. Veneno da apiprofecia: Vontade CD 20; duração máxima 4 rodadas; estágio 1: 2d6 mental e ofuscado.",
    page: 0,
    sourceBook: AP217,
    level: 5,
    priceCp: 15000,
    bulk: 1,
    usage: "held",
    rarity: "rare",
    traits: ["Magical","Poison"],
    subcategory: "Arma mágica específica",
  }),
]
