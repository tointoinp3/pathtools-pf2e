import {
  ADVENTURER_PACK_CONTENTS,
  ADVENTURER_PACK_ORIGINAL_NAME,
  type ClassKitItem,
} from './classKits'

export interface AdventuringKitDefinition {
  id: string
  name: string
  originalName: string
  /** Texto curto do que o kit faz. */
  summary: string
  contents: ClassKitItem[]
  /** Se o livro lista peças, mas o item no catálogo já cobre o conjunto. */
  contentsNote?: string
  sourceBook: string
  sourcePage: number
}

/**
 * Kits de aventura Remaster cujo livro lista o que vai dentro
 * (Player Core pg. 287–292). Qualidade (elite, extremo, etc.) fica no catálogo.
 */
export const ADVENTURING_KITS: AdventuringKitDefinition[] = [
  {
    id: 'adv-kit-adventurers-pack',
    name: 'Pacote de aventureiro',
    originalName: ADVENTURER_PACK_ORIGINAL_NAME,
    summary:
      'O conjunto que entra em todo pacote rápido de classe. Carga 1 no total — não some a carga de cada peça.',
    contents: ADVENTURER_PACK_CONTENTS,
    sourceBook: 'Player Core',
    sourcePage: 287,
  },
  {
    id: 'adv-kit-climbing',
    name: 'Kit de escalada',
    originalName: 'Climbing Kit',
    summary: 'Equipamento para Escalar com as ferramentas certas.',
    contents: [
      { originalName: 'Rope' },
      { originalName: 'Grappling Hook' },
      { originalName: 'Hammer' },
      { originalName: 'Piton', quantity: 12 },
    ],
    contentsNote:
      'Também traz polias e um par de crampons (o catálogo não vende essas peças soltas). 15 m de corda.',
    sourceBook: 'Player Core',
    sourcePage: 287,
  },
  {
    id: 'adv-kit-climbing-extreme',
    name: 'Kit de escalada (extremo)',
    originalName: 'Climbing Kit (Extreme)',
    summary: 'Mesmo conteúdo, qualidade melhor: +1 de item em Atletismo para Escalar.',
    contents: [
      { originalName: 'Rope' },
      { originalName: 'Grappling Hook' },
      { originalName: 'Hammer' },
      { originalName: 'Piton', quantity: 12 },
    ],
    contentsNote: 'Nv. 3. Polias e crampons inclusos, como no kit comum.',
    sourceBook: 'Player Core',
    sourcePage: 287,
  },
  {
    id: 'adv-kit-alchemist',
    name: 'Kit de alquimista',
    originalName: "Alchemist's Toolkit",
    summary:
      'Frascos e reagentes portáteis para tarefas alquímicas simples. Vestido, saca na mesma ação.',
    contents: [],
    contentsNote:
      'O livro não lista peças soltas — é um conjunto vestido. Laboratório de alquimista é outro item (intervalo, Fabricar).',
    sourceBook: 'Player Core',
    sourcePage: 287,
  },
  {
    id: 'adv-kit-artisan',
    name: 'Kit de artesão',
    originalName: "Artisan's Toolkit",
    summary: 'Precisa deste kit para criar itens com Ofício. Cada ofício pede um conjunto diferente.',
    contents: [],
    contentsNote:
      'Ferreiro não é marceneiro: o kit corresponde a um ofício. Versão de prata (nv. 3) dá +1 de item.',
    sourceBook: 'Player Core',
    sourcePage: 287,
  },
  {
    id: 'adv-kit-healer',
    name: 'Kit de curandeiro',
    originalName: "Healer's Toolkit",
    summary:
      'Necessário para Medicina: Primeiros Socorros, Tratar Doença, Tratar Veneno ou Tratar Ferimentos.',
    contents: [],
    contentsNote: 'Ataduras, ervas e agulhas. Versão ampliada (nv. 3) dá +1 de item nesses testes.',
    sourceBook: 'Player Core',
    sourcePage: 288,
  },
  {
    id: 'adv-kit-detective',
    name: 'Kit de detetive',
    originalName: "Detective's Kit",
    summary: 'Nv. 3. +1 de item em Investigar ou para recolher pistas.',
    contents: [],
    contentsNote:
      'Bolsa com frascos vazios, pinça, panos de linho, paquímetro de latão e corda marcada.',
    sourceBook: 'Player Core',
    sourcePage: 288,
  },
  {
    id: 'adv-kit-disguise',
    name: 'Kit de disfarce',
    originalName: 'Disguise Kit',
    summary: 'Em geral é preciso para Personificar. Vestido, saca na mesma ação.',
    contents: [],
    contentsNote:
      'Caixa com cosméticos, pelos postiços, cola e perucas simples. Cosméticos de reposição e versão elite (nv. 3, +1 de item) existem no catálogo.',
    sourceBook: 'Player Core',
    sourcePage: 288,
  },
  {
    id: 'adv-kit-repair',
    name: 'Kit de reparos',
    originalName: 'Repair Toolkit',
    summary: 'Permite Reparar itens com Ofício na estrada. Vestido, saca na mesma ação.',
    contents: [],
    contentsNote:
      'Bigorna portátil, tenazes, ferramentas de madeira, pedra de amolar e óleos. Versão soberba (nv. 3) dá +1 de item.',
    sourceBook: 'Player Core',
    sourcePage: 290,
  },
  {
    id: 'adv-kit-thieves',
    name: 'Kit de ladrão',
    originalName: "Thieves' Toolkit",
    summary:
      'Necessário para Abrir Fechaduras ou Desabilitar Dispositivos (de certos tipos) com Ladroagem.',
    contents: [],
    contentsNote:
      'Se quebrar, troque as gazuas por gazuas de reposição — não precisa da ação Reparar. Versão infiltrador (nv. 3) dá +1 de item.',
    sourceBook: 'Player Core',
    sourcePage: 292,
  },
]

export function getAdventuringKitById(
  id: string | null | undefined,
): AdventuringKitDefinition | null {
  if (!id) return null
  return ADVENTURING_KITS.find((k) => k.id === id) ?? null
}
