import { consumableItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const OIL_GRADES = [
  {
    key: 'standard',
    name: '',
    original: '',
    level: 2,
    priceGp: 7,
    weaponRuneIds: ['rune-2830-1', 'rune-2829'],
    armorRuneIds: ['rune-2785-1', 'rune-2786'],
    weaponLabel: '+1 impactante',
    armorLabel: '+1 resiliente',
  },
  {
    key: 'greater',
    name: ' maior',
    original: ' (Greater)',
    level: 12,
    priceGp: 400,
    weaponRuneIds: ['rune-2830-2', 'rune-2829-greater'],
    armorRuneIds: ['rune-2785-2', 'rune-2786-greater'],
    weaponLabel: '+2 impactante maior',
    armorLabel: '+2 resiliente maior',
  },
  {
    key: 'major',
    name: ' máxima',
    original: ' (Major)',
    level: 19,
    priceGp: 8000,
    weaponRuneIds: ['rune-2830-3', 'rune-2829-major'],
    armorRuneIds: ['rune-2785-3', 'rune-2786-major'],
    weaponLabel: '+3 impactante máxima',
    armorLabel: '+3 resiliente máxima',
  },
] as const

const UNLIFE_GRADES = [
  { key: 'minor', name: 'mínimo', original: 'Minor', level: 1, priceGp: 4, hpDice: '1d8', hpFlat: 0 },
  { key: 'lesser', name: 'menor', original: 'Lesser', level: 3, priceGp: 12, hpDice: '2d8', hpFlat: 5 },
  { key: 'moderate', name: 'moderado', original: 'Moderate', level: 6, priceGp: 50, hpDice: '3d8', hpFlat: 10 },
  { key: 'greater', name: 'maior', original: 'Greater', level: 12, priceGp: 400, hpDice: '6d8', hpFlat: 20 },
  { key: 'major', name: 'máximo', original: 'Major', level: 18, priceGp: 5000, hpDice: '8d8', hpFlat: 30 },
] as const

export const GM_CORE_OILS: ItemDefinition[] = [
  ...OIL_GRADES.map((grade) =>
    consumableItem({
      id: `oil-2936${grade.key === 'standard' ? '' : `-${grade.key}`}`,
      aonId: 2936,
      name: `Óleo de potência${grade.name}`,
      originalName: `Oil of Potency${grade.original}`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 257,
      consumable: {
        kind: 'oil',
        effectFamily: 'oil-potency',
        duration: '1 minuto',
        note: `A arma fica ${grade.weaponLabel} ou a armadura fica ${grade.armorLabel} por 1 minuto.`,
        oil: {
          duration: '1 minuto',
          weaponRuneIds: [...grade.weaponRuneIds],
          armorRuneIds: [...grade.armorRuneIds],
        },
      },
      description: `Óleo viscoso. Ao aplicar numa arma ou armadura, o item fica magicamente potente por 1 minuto: arma ${grade.weaponLabel}, ou armadura ${grade.armorLabel}. Bônus de item do mesmo tipo não se acumulam — vale o maior.`,
    }),
  ),
  consumableItem({
    id: 'oil-2930',
    aonId: 2930,
    name: 'Óleo antimagia',
    originalName: 'Antimagic Oil',
    level: 20,
    priceGp: 13000,
    page: 257,
    rarity: 'rare',
    traits: ['Rare'],
    consumable: {
      kind: 'oil',
      effectFamily: 'antimagic-oil',
      duration: '1 minuto',
      note: 'Na armadura: o usuário fica imune a magias, efeitos de itens mágicos e efeitos com o traço mágico por 1 minuto. Não afeta a magia da armadura nem runas fundamentais das armas que o atacam. Fontes de 20º nível ou mais ainda funcionam.',
    },
    description:
      'Energia que repele quase toda magia. Ao aplicar na armadura, quem a veste fica imune a magias, efeitos de itens mágicos (os seus e os dos outros) e efeitos com o traço mágico por 1 minuto. Não afeta a magia da própria armadura nem as runas fundamentais das armas que o atingem. Efeitos mágicos de fonte de 20º nível ou mais (como uma divindade) ainda pegam.',
  }),
  consumableItem({
    id: 'oil-2931',
    aonId: 2931,
    name: 'Néctar de purificação',
    originalName: 'Nectar of Purification',
    level: 1,
    priceGp: 3,
    page: 257,
    consumable: {
      kind: 'oil',
      note: 'Ao derramar em comida ou bebida, conjura limpar iguaria de 1º posto. Evapora e não muda gosto nem textura.',
    },
    description:
      'Líquido cintilante, às vezes guardado como vinagre. Ao derramar em comida ou bebida, conjura a magia limpar iguaria de 1º posto. Evapora na hora e não altera gosto nem textura.',
  }),
  consumableItem({
    id: 'oil-2932',
    aonId: 2932,
    name: 'Óleo de ofuscação',
    originalName: 'Obfuscation Oil',
    level: 15,
    priceGp: 1200,
    page: 257,
    consumable: {
      kind: 'oil',
      note: 'Num item de volume 3 ou menos: indetectável a magias de detecção, revelação e vidência de 8º posto ou menos. Permanente até ácido remover (1 minuto se volume 1 ou menos).',
    },
    description:
      'Gel azul-cinza. Espalhe num único item de volume 3 ou menos: fica indetectável a magias de detecção, revelação e vidência de 8º posto ou menos (como localizar). O óleo é permanente, mas ácido remove — em geral 1 minuto se o volume for 1 ou menos, ou tantos minutos quanto o volume.',
  }),
  consumableItem({
    id: 'oil-2933',
    aonId: 2933,
    name: 'Óleo de animação',
    originalName: 'Oil of Animation',
    level: 12,
    priceGp: 330,
    page: 257,
    rarity: 'uncommon',
    traits: ['Uncommon'],
    consumable: {
      kind: 'oil',
      note: 'Na arma corpo a corpo: benefícios da runa animada até falhar no teste simples e a arma cair.',
    },
    description:
      'Óleo bronze. Esfregue numa arma corpo a corpo: ela ganha os benefícios da runa animada. Quando você falha no teste simples e a arma cai, o efeito acaba.',
  }),
  consumableItem({
    id: 'oil-2934',
    aonId: 2934,
    name: 'Óleo de gume aguçado',
    originalName: 'Oil of Keen Edges',
    level: 11,
    priceGp: 250,
    page: 257,
    rarity: 'uncommon',
    traits: ['Uncommon'],
    consumable: {
      kind: 'oil',
      effectFamily: 'keen-oil',
      duration: '1 minuto',
      note: 'Na arma corpo a corpo perfurante ou cortante: benefícios da runa aguçada por 1 minuto.',
    },
    description:
      'Pomada prateada. Na arma corpo a corpo que causa dano perfurante ou cortante, o gume fica mais perigoso por 1 minuto: benefícios da runa aguçada.',
  }),
  consumableItem({
    id: 'oil-2935',
    aonId: 2935,
    name: 'Óleo de conserto',
    originalName: 'Oil of Mending',
    level: 3,
    priceGp: 9,
    page: 257,
    consumable: {
      kind: 'oil',
      note: 'Ao aplicar num item, conjura consertar de 2º posto para repará-lo.',
    },
    description:
      'Inúmeros fios translúcidos giram no frasco. Ao aplicar num item, conjura a magia consertar de 2º posto para repará-lo. Duas mãos.',
  }),
  consumableItem({
    id: 'oil-2937',
    aonId: 2937,
    name: 'Óleo de repulsão',
    originalName: 'Oil of Repulsion',
    level: 11,
    priceGp: 175,
    page: 258,
    consumable: {
      kind: 'oil',
      effectFamily: 'repulsion-oil',
      duration: '1 minuto',
      note: 'Na armadura, por 1 minuto: quem acertar você com Golpe corpo a corpo faz Fortitude CD 28. Falha: empurrado até 10 pés. Falha crítica: também fica caído.',
    },
    description:
      'Limalha de ferro magnética nas pontas do frasco. Por 1 minuto após aplicar na armadura, qualquer criatura que acertar você com um Golpe corpo a corpo faz Fortitude CD 28. Sucesso: nada. Falha: empurrada até 10 pés para longe (o mestre define a direção). Falha crítica: como falha, e também fica caída.',
  }),
  ...UNLIFE_GRADES.map((grade) => {
    const flat = grade.hpFlat ? `+${grade.hpFlat}` : ''
    return consumableItem({
      id: `oil-2938-${grade.key}`,
      aonId: 2938,
      name: `Óleo de não-vida ${grade.name}`,
      originalName: `Oil of Unlife (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 258,
      traits: ['Void'],
      consumable: {
        kind: 'oil',
        hpDice: grade.hpDice,
        hpFlat: grade.hpFlat || undefined,
        note: `Num morto-vivo, restaura ${grade.hpDice}${flat} PV.`,
      },
      description: `Líquido preto e fino, frio até o osso. Ao despejar num morto-vivo, repara o corpo ou o espírito: restaura ${grade.hpDice}${flat} PV.`,
    })
  }),
  consumableItem({
    id: 'oil-2939',
    aonId: 2939,
    name: 'Óleo de ausência de peso',
    originalName: 'Oil of Weightlessness',
    level: 2,
    priceGp: 6,
    page: 258,
    consumable: {
      kind: 'oil',
      effectFamily: 'weightless-oil',
      duration: '1 hora',
      note: 'Num item de volume 1 ou menos: volume desprezível por 1 hora.',
    },
    description:
      'Óleo cintilante. Espalhe num item de volume 1 ou menos: o volume vira desprezível por 1 hora.',
  }),
  consumableItem({
    id: 'oil-2939-greater',
    aonId: 2939,
    name: 'Óleo de ausência de peso maior',
    originalName: 'Oil of Weightlessness (Greater)',
    level: 6,
    priceGp: 36,
    page: 258,
    consumable: {
      kind: 'oil',
      effectFamily: 'weightless-oil',
      duration: '8 horas',
      note: 'Num item de volume 2 ou menos: volume desprezível por 8 horas.',
    },
    description:
      'Afeta item de volume 2 ou menos e dura 8 horas.',
  }),
  consumableItem({
    id: 'oil-3401',
    aonId: 3401,
    name: 'Linimento traiçoeiro',
    originalName: 'Tricky Liniment',
    level: 5,
    priceGp: 25,
    page: 304,
    sourceBook: 'Player Core 2',
    consumable: {
      kind: 'oil',
      effectFamily: 'tricky-liniment',
      duration: '8 horas',
      note: 'Na armadura: +2 de item em Acrobacia para Escapar ou se Espremer por 8 horas.',
    },
    description:
      'Graxa esverdeada e persistente. Ao aplicar na armadura, por 8 horas quem a veste ganha +2 de bônus de item em Acrobacia para Escapar ou se Espremer. Duas mãos.',
  }),
]
