import { catalogItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const DM = "Divine Mysteries" as const

/**
 * DIVINE MYSTERIES ITEMS — Divine Mysteries.
 * Só Remaster. Sem conteúdo Legacy.
 */
export const DIVINE_MYSTERIES_ITEMS: ItemDefinition[] = [
  catalogItem({
    id: "worn-3593",
    aonId: 3593,
    name: "Máscara razmiri",
    originalName: "Razmiri Mask",
    category: "worn",
    description: "Máscara de ferro (versões mais potentes de sacerdotes razmiri poderosos podem ser de prata, ouro ou porcelana). Quem veste ganha +1 de item em Enganação para Mentir ou Fintar; só um personagem com o arquétipo Sacerdote Razmiri obtém os benefícios. Ativar — Invocar a Benevolência de Razmir (concentrar, manipular, oculto): 1 vez por minuto; toque concede a um alvo PV temporários iguais ao dobro do seu nível por 24 horas; se estava inconsciente, recupera a consciência e não a perde de novo por perda de PV enquanto esses temporários durarem.",
    page: 0,
    sourceBook: DM,
    level: 2,
    priceCp: null,
    bulk: '—',
    usage: "worn",
    subcategory: "Outros vestidos",
  }),
]
