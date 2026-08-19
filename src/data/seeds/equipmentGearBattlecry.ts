import { catalogItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const BC = 'Battlecry!' as const

/**
 * BATTLECRY GEAR — Battlecry! (Remaster).
 * Só Remaster. Sem conteúdo Legacy.
 */
export const BATTLECRY_GEAR: ItemDefinition[] = [
  catalogItem({
    id: "artifact-3844",
    aonId: 3844,
    name: "Última resistência",
    originalName: "Final Stand",
    category: "other",
    description: "Rapieira +3 impactante maior. Empunhando-a, se dano o reduziria a 0 PV sem matar na hora, teste simples CD 11: no sucesso, não desmaia e fica com 1 PV. Pelo resto do encontro, não recupera PV de forma alguma (pode ser estabilizado se ficar morrendo). Se ainda consciente e não perceber inimigos próximos, cai a 0 PV e fica morrendo 1. Outras habilidades que o manteriam em 1 PV (como Ferocidade Orc) devem ser usadas antes. Destruição: se o portador se render com aliados ainda de pé, a CD do teste simples sobe permanentemente em 2; estilhaça quando a CD passar de 20.",
    page: 0,
    sourceBook: BC,
    level: 17,
    priceCp: null,
    bulk: 1,
    usage: "held",
    rarity: "unique",
    traits: ["Artifact","Divine","Magical"],
    subcategory: "Artefato",
  }),
  catalogItem({
    id: "artifact-3852",
    aonId: 3852,
    name: "Lamentação dos infiéis",
    originalName: "Lamentation of the Faithless",
    category: "other",
    description: "Espada grande +4 impactante máxima golpe rápido profana, aço negro que absorve luz. Desembainhada, contrapõe efeitos de luz num raio de 4,5 m (modificador +37). Quem na área tenta magia ou habilidade com traço luz precisa passar em teste simples CD 15, ou falha. Ao ferir criatura viva, o portador recupera 1d12 PV. Ativar — Eis e contemplai (manipular, profano, visual): 1 vez ao dia. Criaturas a 18 m que vejam a espada fazem Vontade CD 50. Traço profano: imune. Traço sagrado: –2 de status. Sucesso crítico: nada. Sucesso: lento 1 (soluços; sem reações enquanto lento). Falha: como sucesso e cego por 1 rodada. Falha crítica: como falha, cego por 1 minuto. Destruição: só se cravada no jardim isolado no cume da montanha do Céu por um infernal ressurgido e arrependido.",
    page: 0,
    sourceBook: BC,
    level: 25,
    priceCp: null,
    bulk: 2,
    usage: "held",
    rarity: "unique",
    traits: ["Artifact","Divine","Magical","Unholy"],
    subcategory: "Artefato",
  }),
  catalogItem({
    id: "gear-3987",
    aonId: 3987,
    name: "Bandoleira de repetidora",
    originalName: "Repeater bandolier",
    category: "adventuringGear",
    description: "Bandoleira de couro com até três carregadores de armas repetidoras em bolsos que abrem com um toque. Trocar o carregador de uma arma repetidora por um da bandoleira vestida reduz em 1 o número de ações Interagir. Só se usa uma bandoleira de repetidora por vez.",
    page: 0,
    sourceBook: BC,
    level: 0,
    priceCp: 100,
    bulk: '—',
    usage: "other",
    rarity: "uncommon",
  }),
  catalogItem({
    id: "gear-3988",
    aonId: 3988,
    name: "Sela de guerra",
    originalName: "War Saddle",
    category: "adventuringGear",
    description: "Cada sela de guerra é ajustada ao tipo de corpo da montaria, com correias que o prendem. Você permanece montado mesmo inconsciente até você ou outra pessoa Interagir para soltar as correias. Uma criatura ou efeito pode separá-lo rasgando as correias, mas a CD, rolagem de ataque ou teste de perícia deve superar 20.",
    page: 0,
    sourceBook: BC,
    level: 0,
    priceCp: 5000,
    bulk: 1,
    usage: "other",
    rarity: "uncommon",
  }),
]
