import { assistiveItem, po, pp } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const BACKSTORY =
  ' Se o personagem tem a deficiência desde o nascimento ou há muito tempo, o item básico entra de graça na criação e não conta no dinheiro inicial (nem tem valor de venda).'

/**
 * Itens assistivos Remaster — Player Core pg. 293 (bengala, lentes, muleta,
 * audição, prótese, cadeiras) e Howl of the Wild pg. 113.
 * Sem Grand Bazaar / Guns & Gears legado.
 */
export const REMASTER_ASSISTIVE: ItemDefinition[] = [
  assistiveItem({
    id: 'assistive-2772',
    aonId: 2772,
    name: "Bengala",
    originalName: "Cane",
    page: 293,
    priceCp: pp(5),
    bulk: 'L',
    usage: 'held',
    subcategory: 'Mobilidade',
    description:
      "Haste reta com cabo curvo, 60 a 90 cm, ajustável. Ajuda no equilíbrio e tira um pouco de peso da perna oposta." +
      BACKSTORY,
  }),
  assistiveItem({
    id: 'assistive-2773',
    aonId: 2773,
    name: "Lentes corretivas",
    originalName: "Corrective Lenses",
    page: 293,
    priceCp: pp(5),
    bulk: 'L',
    usage: 'worn',
    subcategory: 'Visão',
    description:
      "Óculos ou lentes que corrigem a visão. Colocar ou tirar é Interagir. Quem tem a deficiência de longa data recebe o item básico de graça na criação." +
      BACKSTORY,
  }),
  assistiveItem({
    id: 'assistive-2774',
    aonId: 2774,
    name: "Muleta",
    originalName: "Crutch",
    page: 293,
    priceCp: pp(5),
    bulk: 'L',
    usage: 'held',
    subcategory: 'Mobilidade',
    description:
      "Apoio sob o braço ou antebraço para quem não carrega peso numa perna. Ajusta ao corpo." +
      BACKSTORY,
  }),
  assistiveItem({
    id: 'assistive-2775',
    aonId: 2775,
    name: 'Aparelho auditivo',
    originalName: 'Hearing Aid',
    page: 293,
    priceCp: pp(5),
    bulk: '—',
    usage: 'worn',
    subcategory: 'Audição',
    description:
      'Usado no ouvido: madeira, metal ou peças de mecanismo. A forma ajuda quem tem perda auditiva; use um ou dois, conforme a perda. Colocar ou tirar é uma ação de Interagir.' +
      BACKSTORY,
  }),
  assistiveItem({
    id: 'assistive-2775-magical',
    aonId: 2775,
    name: 'Aparelho auditivo (mágico)',
    originalName: 'Hearing Aid (Magical)',
    page: 293,
    priceCp: po(5),
    bulk: '—',
    usage: 'worn',
    traits: ['Magical'],
    subcategory: 'Audição',
    description:
      'Gancho atrás da orelha e receptor no canal. Detecta ondas sonoras e, com magia, as transfere para o ouvido. Use um ou dois. Ligar ou desligar é uma ação de Interagir.',
  }),
  assistiveItem({
    id: 'assistive-2776',
    aonId: 2776,
    name: 'Prótese',
    originalName: 'Prosthesis',
    page: 293,
    priceCp: pp(5),
    bulk: '—',
    usage: 'worn',
    subcategory: 'Prótese',
    description:
      'Substitui parte do corpo ausente ou danificada (pés, olhos, mãos, membros ou outra). Mesmo a prótese básica cobre a função completa da parte. Cintas ou braceletes a prendem; colocar ou tirar é uma ação de Interagir.' +
      BACKSTORY,
  }),
  assistiveItem({
    id: 'assistive-2777',
    aonId: 2777,
    name: 'Cadeira de rodas',
    originalName: 'Wheelchair',
    page: 293,
    priceCp: pp(5),
    bulk: 2,
    usage: 'other',
    subcategory: 'Mobilidade',
    description:
      'Cadeira comum, boa no dia a dia, não pensada para esforço pesado. Tamanhos para qualquer corpo. Enquanto a usa, você Anda na sua Velocidade normal, impulsionando pelos aros (mesmo com algo nas mãos, se puder movê-las). A cadeira é extensão de você: magia que muda sua forma também muda a cadeira. Carga da cadeira não conta no limite enquanto você está nela. Se tombar, Levantar-se a endireita; um aliado pode Interagir para você Levantar-se como ação livre. Cintos ajustáveis: Interagir para soltar.' +
      BACKSTORY,
  }),
  assistiveItem({
    id: 'assistive-2777-travelers',
    aonId: 2777,
    name: 'Cadeira de viajante',
    originalName: "Traveler's Chair",
    page: 293,
    priceCp: po(5),
    bulk: 3,
    usage: 'other',
    subcategory: 'Mobilidade',
    description:
      'Feita para aventura: conforto e apoio, mecanismos de madeira, relógio ou similar. Sobe e desce escadas sem dificuldade extra (subir escada ainda é terreno difícil, como para qualquer um) e atravessa terreno comum de aventura (escadas, chão irregular) sem penalidade adicional. Demais regras da cadeira de rodas se aplicam.' +
      BACKSTORY,
  }),
  assistiveItem({
    id: 'assistive-2777-storage',
    aonId: 2777,
    name: 'Compartimento de cadeira',
    originalName: 'Chair Storage',
    page: 293,
    priceCp: po(1),
    bulk: '—',
    usage: 'other',
    subcategory: 'Mobilidade',
    description:
      'Acessório para qualquer cadeira de rodas. As primeiras 2 Cargas guardadas na cadeira não contam no limite (como mochila). Se usar compartimento e mochila ao mesmo tempo, só 2 Cargas no total ficam de fora, como com várias mochilas.',
  }),
  assistiveItem({
    id: 'assistive-2777-supramarine',
    aonId: 2777,
    name: 'Cadeira supramarina',
    originalName: 'Supramarine Chair',
    page: 113,
    priceCp: pp(5),
    bulk: 2,
    usage: 'other',
    subcategory: 'Mobilidade',
    sourceBook: 'Howl of the Wild',
    description:
      'Banheira ou tanque sobre rodas, cheio d’água, criado por tritões para povo aquático em terra. Funciona como cadeira de rodas. Sua Velocidade terrestre sobe para 6 m (20 pés) ou sua Velocidade de natação, o que for menor.',
  }),
  assistiveItem({
    id: 'assistive-2777-land-delver',
    aonId: 2777,
    name: 'Cadeira de terra adentro',
    originalName: "Land-Delver's Chair",
    page: 113,
    priceCp: po(5),
    bulk: 2,
    usage: 'other',
    subcategory: 'Mobilidade',
    sourceBook: 'Howl of the Wild',
    description:
      'Versão reforçada da cadeira supramarina: funciona como cadeira de viajante. Sua Velocidade terrestre sobe para 6 m (20 pés) ou sua Velocidade de natação, o que for menor.',
  }),
]
