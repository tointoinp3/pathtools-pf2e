import { materialItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

function hardnessLine(
  thin: string,
  item: string,
  structure: string,
): string {
  return `Dureza/PV/RT — fino: ${thin}; objeto: ${item}; estrutura: ${structure}.`
}

/**
 * Materiais preciosos — GM Core Remaster pg. 252–254.
 * Pedaço / lingote (ou ramo / tábua) e objeto por Carga, para Fabricar.
 * Armas, armaduras e escudos de material ficam nas respectivas categorias.
 */
export const GM_CORE_MATERIALS: ItemDefinition[] = [
  materialItem({
    id: 'material-2915-chunk',
    aonId: 2915,
    name: 'Adamantina (pedaço)',
    originalName: 'Adamantine Chunk',
    level: 8,
    priceGp: 500,
    page: 253,
    bulk: 'L',
    rarity: 'uncommon',
    subcategory: 'Adamantina',
    description:
      'Metal negro brilhante, extraído de rochas caídas do céu. Um dos mais duros conhecidos; segura fio afiadíssimo. ' +
      hardnessLine('padrão 10/40/20, alto 13/52/26', 'padrão 14/56/28, alto 17/68/34', 'padrão 28/112/56, alto 34/136/68'),
  }),
  materialItem({
    id: 'material-2915-ingot',
    aonId: 2915,
    name: 'Adamantina (lingote)',
    originalName: 'Adamantine Ingot',
    level: 8,
    priceGp: 5000,
    page: 253,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Adamantina',
    description:
      'Lingote de adamantina para Fabricar. Só mestre fabrica grau padrão; lendário, grau alto. Nível do ofício ≥ nível do material.',
  }),
  materialItem({
    id: 'material-2915-object-standard',
    aonId: 2915,
    name: 'Objeto de adamantina (grau padrão)',
    originalName: 'Adamantine Object (Standard-Grade)',
    level: 8,
    priceGp: 350,
    page: 253,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Adamantina',
    description:
      'Objeto simples não mágico de adamantina. Preço por Carga (itens mais leves que 1 Carga usam o preço de 1 Carga). Grau padrão: magia e runas até 15º nível.',
  }),
  materialItem({
    id: 'material-2915-object-high',
    aonId: 2915,
    name: 'Objeto de adamantina (grau alto)',
    originalName: 'Adamantine Object (High-Grade)',
    level: 16,
    priceGp: 6000,
    page: 253,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Adamantina',
    description:
      'Objeto simples não mágico de adamantina pura. Preço por Carga. Grau alto: magia e runas de qualquer nível.',
  }),

  materialItem({
    id: 'material-2916-chunk',
    aonId: 2916,
    name: 'Ferro frio (pedaço)',
    originalName: 'Cold Iron Chunk',
    level: 2,
    priceGp: 10,
    page: 253,
    bulk: 'L',
    subcategory: 'Ferro frio',
    description:
      'Ferro extraído de veios especialmente puros e forjado com pouco ou nenhum calor. Armas de ferro frio são letais contra demônios e fadas. ' +
      hardnessLine(
        'baixo 5/20/10, padrão 7/28/14, alto 10/40/20',
        'baixo 9/36/18, padrão 11/44/22, alto 14/56/28',
        'baixo 18/72/36, padrão 22/88/44, alto 28/112/56',
      ),
  }),
  materialItem({
    id: 'material-2916-ingot',
    aonId: 2916,
    name: 'Ferro frio (lingote)',
    originalName: 'Cold Iron Ingot',
    level: 2,
    priceGp: 100,
    page: 253,
    bulk: 1,
    subcategory: 'Ferro frio',
    description:
      'Lingote de ferro frio para Fabricar. Grau alto é especialmente difícil de trabalhar.',
  }),
  materialItem({
    id: 'material-2916-object-low',
    aonId: 2916,
    name: 'Objeto de ferro frio (grau baixo)',
    originalName: 'Cold Iron Object (Low-Grade)',
    level: 2,
    priceGp: 20,
    page: 253,
    bulk: 1,
    subcategory: 'Ferro frio',
    description:
      'Objeto simples não mágico. Preço por Carga. Grau baixo: magia e runas até 8º nível. Exige ofício especialista.',
  }),
  materialItem({
    id: 'material-2916-object-standard',
    aonId: 2916,
    name: 'Objeto de ferro frio (grau padrão)',
    originalName: 'Cold Iron Object (Standard-Grade)',
    level: 7,
    priceGp: 250,
    page: 253,
    bulk: 1,
    subcategory: 'Ferro frio',
    description:
      'Objeto simples não mágico. Preço por Carga. Grau padrão: magia e runas até 15º nível.',
  }),
  materialItem({
    id: 'material-2916-object-high',
    aonId: 2916,
    name: 'Objeto de ferro frio (grau alto)',
    originalName: 'Cold Iron Object (High-Grade)',
    level: 15,
    priceGp: 4500,
    page: 253,
    bulk: 1,
    subcategory: 'Ferro frio',
    description:
      'Objeto simples não mágico de ferro frio puro. Preço por Carga. Grau alto: magia e runas de qualquer nível.',
  }),

  materialItem({
    id: 'material-2917-chunk',
    aonId: 2917,
    name: 'Prata da aurora (pedaço)',
    originalName: 'Dawnsilver Chunk',
    level: 8,
    priceGp: 500,
    page: 253,
    bulk: 'L',
    rarity: 'uncommon',
    subcategory: 'Prata da aurora',
    description:
      'Leve, durável e eficaz contra diabos e criaturas lupinas. Brilho de prata, tom um pouco mais claro. Armas e armaduras contam como prata contra fraqueza a prata. Item de metal: Carga −1 (1 Carga vira L; L não muda). O preço usa a Carga original. ' +
      hardnessLine('padrão 5/20/10, alto 8/32/16', 'padrão 9/36/18, alto 12/48/24', 'padrão 18/72/36, alto 24/96/48'),
  }),
  materialItem({
    id: 'material-2917-ingot',
    aonId: 2917,
    name: 'Prata da aurora (lingote)',
    originalName: 'Dawnsilver Ingot',
    level: 8,
    priceGp: 5000,
    page: 253,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Prata da aurora',
    description: 'Lingote de prata da aurora (dawnsilver) para Fabricar.',
  }),
  materialItem({
    id: 'material-2917-object-standard',
    aonId: 2917,
    name: 'Objeto de prata da aurora (grau padrão)',
    originalName: 'Dawnsilver Object (Standard-Grade)',
    level: 8,
    priceGp: 350,
    page: 253,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Prata da aurora',
    description:
      'Objeto simples não mágico. Preço por Carga da forma original (não da Carga reduzida). Grau padrão: magia e runas até 15º nível.',
  }),
  materialItem({
    id: 'material-2917-object-high',
    aonId: 2917,
    name: 'Objeto de prata da aurora (grau alto)',
    originalName: 'Dawnsilver Object (High-Grade)',
    level: 16,
    priceGp: 6000,
    page: 254,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Prata da aurora',
    description:
      'Objeto simples não mágico de prata da aurora pura. Preço por Carga original. Grau alto: magia e runas de qualquer nível.',
  }),

  materialItem({
    id: 'material-2918-branch',
    aonId: 2918,
    name: 'Madeira do crepúsculo (ramo)',
    originalName: 'Duskwood Branch',
    level: 8,
    priceGp: 500,
    page: 254,
    bulk: 'L',
    rarity: 'uncommon',
    subcategory: 'Madeira do crepúsculo',
    description:
      'Madeira muito leve de florestas antigas do centro-sul de Avistão; negra como ébano com tom púrpura. Carga do item −1 (1 Carga vira L; L não muda). O preço usa a Carga original. ' +
      hardnessLine('padrão 5/20/10, alto 8/32/16', 'padrão 7/28/14, alto 10/40/20', 'padrão 14/56/28, alto 20/80/40'),
  }),
  materialItem({
    id: 'material-2918-lumber',
    aonId: 2918,
    name: 'Madeira do crepúsculo (tábua)',
    originalName: 'Duskwood Lumber',
    level: 8,
    priceGp: 5000,
    page: 254,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Madeira do crepúsculo',
    description: 'Tábua de madeira do crepúsculo (duskwood) para Fabricar.',
  }),
  materialItem({
    id: 'material-2918-object-standard',
    aonId: 2918,
    name: 'Objeto de madeira do crepúsculo (grau padrão)',
    originalName: 'Duskwood Object (Standard-Grade)',
    level: 8,
    priceGp: 350,
    page: 254,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Madeira do crepúsculo',
    description:
      'Objeto simples não mágico. Preço por Carga original. Grau padrão: magia e runas até 15º nível.',
  }),
  materialItem({
    id: 'material-2918-object-high',
    aonId: 2918,
    name: 'Objeto de madeira do crepúsculo (grau alto)',
    originalName: 'Duskwood Object (High-Grade)',
    level: 16,
    priceGp: 6000,
    page: 254,
    bulk: 1,
    rarity: 'uncommon',
    subcategory: 'Madeira do crepúsculo',
    description:
      'Objeto simples não mágico de madeira do crepúsculo pura. Preço por Carga original. Grau alto: magia e runas de qualquer nível.',
  }),

  materialItem({
    id: 'material-2919-chunk',
    aonId: 2919,
    name: 'Oricalco (pedaço)',
    originalName: 'Orichalcum Chunk',
    level: 17,
    priceGp: 1000,
    page: 254,
    bulk: 'L',
    rarity: 'rare',
    subcategory: 'Oricalco',
    description:
      'O mais raro e valioso dos metais celestes. Cobre fosco, propriedades temporais. Menos rígido que adamantina, mas o tempo o protege: dureza e PV maiores. Se sofrer dano e não for destruído, se repara por completo em 24 horas. Só existe em grau alto. ' +
      hardnessLine('alto 16/64/32', 'alto 18/72/36', 'alto 35/140/70'),
  }),
  materialItem({
    id: 'material-2919-ingot',
    aonId: 2919,
    name: 'Oricalco (lingote)',
    originalName: 'Orichalcum Ingot',
    level: 17,
    priceGp: 10000,
    page: 254,
    bulk: 1,
    rarity: 'rare',
    subcategory: 'Oricalco',
    description: 'Lingote de oricalco para Fabricar. Exige ofício lendário e nível 17+.',
  }),
  materialItem({
    id: 'material-2919-object-high',
    aonId: 2919,
    name: 'Objeto de oricalco (grau alto)',
    originalName: 'Orichalcum Object (High-Grade)',
    level: 17,
    priceGp: 10000,
    page: 254,
    bulk: 1,
    rarity: 'rare',
    subcategory: 'Oricalco',
    description:
      'Objeto simples não mágico. Preço por Carga. Só grau alto: magia e runas de qualquer nível.',
  }),

  materialItem({
    id: 'material-2920-chunk',
    aonId: 2920,
    name: 'Prata (pedaço)',
    originalName: 'Silver Chunk',
    level: 2,
    priceGp: 10,
    page: 254,
    bulk: 'L',
    subcategory: 'Prata',
    description:
      'Armas de prata ferem diabos, lobisomens e criaturas semelhantes. Menos durável que aço; grau baixo costuma ser só banhado a prata. ' +
      hardnessLine(
        'baixo 3/12/6, padrão 5/20/10, alto 8/32/16',
        'baixo 5/20/10, padrão 7/28/14, alto 10/40/20',
        'baixo 10/40/20, padrão 14/56/28, alto 20/80/40',
      ),
  }),
  materialItem({
    id: 'material-2920-ingot',
    aonId: 2920,
    name: 'Prata (lingote)',
    originalName: 'Silver Ingot',
    level: 2,
    priceGp: 100,
    page: 254,
    bulk: 1,
    subcategory: 'Prata',
    description: 'Lingote de prata para Fabricar.',
  }),
  materialItem({
    id: 'material-2920-object-low',
    aonId: 2920,
    name: 'Objeto de prata (grau baixo)',
    originalName: 'Silver Object (Low-Grade)',
    level: 2,
    priceGp: 20,
    page: 254,
    bulk: 1,
    subcategory: 'Prata',
    description:
      'Objeto simples não mágico, em geral banhado. Preço por Carga. Grau baixo: magia e runas até 8º nível.',
  }),
  materialItem({
    id: 'material-2920-object-standard',
    aonId: 2920,
    name: 'Objeto de prata (grau padrão)',
    originalName: 'Silver Object (Standard-Grade)',
    level: 7,
    priceGp: 250,
    page: 254,
    bulk: 1,
    subcategory: 'Prata',
    description:
      'Objeto simples não mágico. Preço por Carga. Grau padrão: magia e runas até 15º nível.',
  }),
  materialItem({
    id: 'material-2920-object-high',
    aonId: 2920,
    name: 'Objeto de prata (grau alto)',
    originalName: 'Silver Object (High-Grade)',
    level: 15,
    priceGp: 4500,
    page: 254,
    bulk: 1,
    subcategory: 'Prata',
    description:
      'Objeto simples não mágico de prata pura. Preço por Carga. Grau alto: magia e runas de qualquer nível.',
  }),
]

/** Osso e pedra — Treasure Vault (Remastered) pg. 169. */
export const TREASURE_VAULT_MATERIALS: ItemDefinition[] = [
  materialItem({
    id: 'material-2358-specimen',
    aonId: 2358,
    name: 'Espécime de osso',
    originalName: 'Bone Specimen',
    level: 0,
    priceGp: 0.1,
    page: 169,
    bulk: 1,
    subcategory: 'Osso',
    sourceBook: 'Treasure Vault (Remastered)',
    description:
      'Osso tratado (também quitina, chifre, marfim, coral, concha). Substitui madeira ou metal em arma, armadura e escudo. Dureza/PV/RT — fino 4/16/8; objeto 6/24/12; estrutura 12/48/24. Preço 1 pp o espécime.',
  }),
  materialItem({
    id: 'material-2358-object',
    aonId: 2358,
    name: 'Objeto de osso',
    originalName: 'Bone Object',
    level: 0,
    priceGp: 0.1,
    page: 169,
    bulk: 1,
    subcategory: 'Osso',
    sourceBook: 'Treasure Vault (Remastered)',
    description: 'Objeto simples de osso. Preço 1 pp por Carga.',
  }),
  materialItem({
    id: 'material-2359-low',
    aonId: 2359,
    name: 'Objeto de pedra (grau baixo)',
    originalName: 'Stone Object (Low-Grade)',
    level: 0,
    priceGp: 0.1,
    page: 169,
    bulk: 1,
    subcategory: 'Pedra',
    sourceBook: 'Treasure Vault (Remastered)',
    description:
      'Sílex, basalto, cristal, obsidiana ou gema. Substitui a superfície de golpe de arma corpo a corpo sem peças móveis, e munição. Em armadura, substitui metal de malha e composta; placas só se o texto disser que é de pedra. Dureza/PV/RT — fino 4/16/8; objeto 7/24/12; estrutura 14/48/24. Preço 1 pp por Carga.',
  }),
]
