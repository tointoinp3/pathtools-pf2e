import { consumableItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const HEALING_GRADES = [
  {
    key: 'minor',
    name: 'mínima',
    original: 'Minor',
    level: 1,
    priceGp: 4,
    hpDice: '1d8',
    hpFlat: 0,
  },
  {
    key: 'lesser',
    name: 'menor',
    original: 'Lesser',
    level: 3,
    priceGp: 12,
    hpDice: '2d8',
    hpFlat: 5,
  },
  {
    key: 'moderate',
    name: 'moderada',
    original: 'Moderate',
    level: 6,
    priceGp: 50,
    hpDice: '3d8',
    hpFlat: 10,
  },
  {
    key: 'greater',
    name: 'maior',
    original: 'Greater',
    level: 12,
    priceGp: 400,
    hpDice: '6d8',
    hpFlat: 20,
  },
  {
    key: 'major',
    name: 'máxima',
    original: 'Major',
    level: 18,
    priceGp: 5000,
    hpDice: '8d8',
    hpFlat: 30,
  },
] as const

const ENERGY_BREATH = [
  { key: 'lesser', name: 'menor', original: 'Lesser', level: 7, priceGp: 70, damage: '4d6', dc: 23 },
  { key: 'moderate', name: 'moderada', original: 'Moderate', level: 12, priceGp: 400, damage: '6d6', dc: 29 },
  { key: 'greater', name: 'maior', original: 'Greater', level: 17, priceGp: 3000, damage: '10d6', dc: 37 },
] as const

const FLYING = [
  { key: 'standard', name: '', original: '', level: 8, priceGp: 100, duration: '1 minuto' },
  { key: 'greater', name: ' maior', original: ' (Greater)', level: 15, priceGp: 1000, duration: '1 hora' },
] as const

const RESISTANCE = [
  { key: 'lesser', name: 'menor', original: 'Lesser', level: 6, priceGp: 45, resist: 5 },
  { key: 'moderate', name: 'moderada', original: 'Moderate', level: 10, priceGp: 180, resist: 10 },
  { key: 'greater', name: 'maior', original: 'Greater', level: 14, priceGp: 850, resist: 15 },
] as const

const SWIMMING = [
  { key: 'standard', name: '', original: '', level: 6, priceGp: 50, duration: '10 minutos' },
  { key: 'greater', name: ' maior', original: ' (Greater)', level: 11, priceGp: 250, duration: '1 hora' },
] as const

export const GM_CORE_POTIONS: ItemDefinition[] = [
  ...HEALING_GRADES.map((grade) => {
    const flat = grade.hpFlat ? `+${grade.hpFlat}` : ''
    return consumableItem({
      id: `potion-2943-${grade.key}`,
      aonId: 2943,
      name: `Poção de cura ${grade.name}`,
      originalName: `Healing Potion (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 259,
      traits: ['Healing'],
      consumable: {
        kind: 'potion',
        hpDice: grade.hpDice,
        hpFlat: grade.hpFlat || undefined,
        note: `Restaura ${grade.hpDice}${flat} PV. Ajuste os PV na aba Combate.`,
      },
      description: `Líquido vermelho-rubi que formiga enquanto os ferimentos fecham. Restaura ${grade.hpDice}${flat} PV.`,
    })
  }),
  consumableItem({
    id: 'potion-3403',
    aonId: 3403,
    name: 'Poção de fuga de emergência',
    originalName: 'Potion of Emergency Escape',
    level: 1,
    priceGp: 3,
    page: 304,
    sourceBook: 'Player Core 2',
    consumable: {
      kind: 'potion',
      effectFamily: 'emergency-escape',
      duration: '1 minuto',
      speedBonus: 40,
      note: 'Você fica em fuga de todas as criaturas hostis de que está ciente e ganha +40 pés de status em todas as Velocidades enquanto a fuga durar. Você Avança na hora.',
    },
    description:
      'A rolha estala fácil em apuros. Ao beber, por 1 minuto você fica em fuga de todas as criaturas hostis de que está ciente e ganha +40 pés de status em todas as Velocidades enquanto a fuga durar. Você Avança na hora.',
  }),
  ...ENERGY_BREATH.map((grade) =>
    consumableItem({
      id: `potion-2941-${grade.key}`,
      aonId: 2941,
      name: `Poção de sopro de energia ${grade.name}`,
      originalName: `Energy Breath Potion (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 259,
      consumable: {
        kind: 'potion',
        effectFamily: 'energy-breath',
        duration: '1 hora',
        note: `Por 1 hora você ganha Sopro de energia (1 ação): ${grade.damage} na área, CD ${grade.dc}. Ácido ou eletricidade: linha de 30 pés (Reflexos). Frio ou fogo: cone de 15 pés (Reflexos). Sônico: cone de 15 pés (Fortitude). Depois, 1d4 rodadas até usar de novo. Escolha o tipo ao beber.`,
      },
      description: `Destilada de magias perigosas. Por 1 hora você ganha Sopro de energia (1 ação): cada criatura na área toma ${grade.damage} (salvaguarda básica CD ${grade.dc}). Ácido ou eletricidade — linha de 30 pés (Reflexos); frio ou fogo — cone de 15 pés (Reflexos); sônico — cone de 15 pés (Fortitude). Depois de soprar, espere 1d4 rodadas. A poção ganha o traço do tipo escolhido.`,
    }),
  ),
  consumableItem({
    id: 'potion-2942',
    aonId: 2942,
    name: 'Poção de gecko',
    originalName: 'Gecko Potion',
    level: 1,
    priceGp: 3,
    page: 259,
    consumable: {
      kind: 'potion',
      effectFamily: 'gecko',
      duration: '5 minutos',
      note: '+1 de item em Escalar e Palmear um Objeto, e na CD de Reflexos contra Desarmar.',
    },
    description:
      'Líquido marrom-areia com grãos suspensos. Por 5 minutos os dedos criam pelos microscópicos: +1 de bônus de item em Escalar e Palmear um Objeto, e na sua CD de Reflexos contra tentativas de Desarmar.',
  }),
  consumableItem({
    id: 'potion-2944',
    aonId: 2944,
    name: 'Poção de invisibilidade',
    originalName: 'Invisibility Potion',
    level: 4,
    priceGp: 20,
    page: 259,
    rarity: 'uncommon',
    traits: ['Uncommon', 'Illusion'],
    consumable: {
      kind: 'potion',
      effectFamily: 'invisibility',
      duration: 'invisibilidade de 2º posto',
      note: 'Efeito da magia invisibilidade de 2º posto.',
    },
    description:
      'Incolor e estranhamente leve. Ao beber, você ganha os efeitos da magia invisibilidade de 2º posto.',
  }),
  consumableItem({
    id: 'potion-2945',
    aonId: 2945,
    name: 'Poção de carvalho',
    originalName: 'Oak Potion',
    level: 4,
    priceGp: 15,
    page: 259,
    traits: ['Plant', 'Primal', 'Wood'],
    consumable: {
      kind: 'potion',
      effectFamily: 'oak',
      duration: '10 minutos',
      note: 'Efeito da magia resiliência de carvalho de 2º posto por 10 minutos.',
    },
    description:
      'Gole amargo. A pele engrossa como casca: efeitos da magia resiliência de carvalho de 2º posto por 10 minutos.',
  }),
  consumableItem({
    id: 'potion-2946',
    aonId: 2946,
    name: 'Panaceia',
    originalName: 'Panacea',
    level: 13,
    priceGp: 450,
    page: 259,
    rarity: 'uncommon',
    traits: ['Uncommon', 'Healing'],
    consumable: {
      kind: 'potion',
      note: 'Tenta contrapor todas as maldições e doenças, e cegueira ou surdez de magia. Posto 7, modificador +20.',
    },
    description:
      'A cor muda conforme quem olha. Ao beber, tenta contrapor todas as maldições e doenças que o afetam, e as condições cego e surdo vindas de magias. Posto de contraposição 7 e modificador +20 no teste.',
  }),
  ...FLYING.map((grade) =>
    consumableItem({
      id: `potion-2948${grade.key === 'standard' ? '' : `-${grade.key}`}`,
      aonId: 2948,
      name: `Poção de voo${grade.name}`,
      originalName: `Potion of Flying${grade.original}`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 259,
      consumable: {
        kind: 'potion',
        effectFamily: 'flying',
        duration: grade.duration,
        speedBonus: 40,
        note: `Deslocamento de voo de 40 pés por ${grade.duration}.`,
      },
      description: `Mistura efervescente. Ao beber, você ganha deslocamento de voo de 40 pés por ${grade.duration}.`,
    }),
  ),
  consumableItem({
    id: 'potion-2949',
    aonId: 2949,
    name: 'Poção de salto',
    originalName: 'Potion of Leaping',
    level: 5,
    priceGp: 21,
    page: 259,
    consumable: {
      kind: 'potion',
      effectFamily: 'leaping',
      duration: '1 minuto',
      note: 'Por 1 minuto, cada vez que você Salta ganha o efeito da magia salto de 1º posto.',
    },
    description:
      'Poção com gás. Por 1 minuto, sempre que você Salta ganha o efeito da magia salto de 1º posto.',
  }),
  consumableItem({
    id: 'potion-2950',
    aonId: 2950,
    name: 'Poção de rapidez',
    originalName: 'Potion of Quickness',
    level: 8,
    priceGp: 90,
    page: 259,
    consumable: {
      kind: 'potion',
      effectFamily: 'quickness',
      duration: '1 minuto',
      note: 'Efeitos de acelerar por 1 minuto.',
    },
    description:
      'Poção prateada. Ao beber, você ganha os efeitos da magia acelerar por 1 minuto.',
  }),
  ...RESISTANCE.map((grade) =>
    consumableItem({
      id: `potion-2951-${grade.key}`,
      aonId: 2951,
      name: `Poção de resistência ${grade.name}`,
      originalName: `Potion of Resistance (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 260,
      consumable: {
        kind: 'potion',
        effectFamily: 'resistance',
        duration: '1 hora',
        note: `Resistência ${grade.resist} a um tipo (ácido, frio, eletricidade, fogo ou sônico) por 1 hora. O tipo é o da poção.`,
      },
      description: `Poção densa e fortificante. Por 1 hora, resistência ${grade.resist} a ácido, frio, eletricidade, fogo ou sônico — cada frasco é feito para um tipo.`,
    }),
  ),
  consumableItem({
    id: 'potion-2952',
    aonId: 2952,
    name: 'Poção de memórias partilhadas',
    originalName: 'Potion of Shared Memories',
    level: 1,
    priceGp: 4,
    page: 260,
    traits: ['Mental'],
    consumable: {
      kind: 'potion',
      note: '1 minuto concentrado grava uma memória de cerca de 1 minuto. Quem bebe a revê com clareza. Quem não quiser pode recusar.',
    },
    description:
      'Transfere uma lembrança. Segure o frasco e concentre-se 1 minuto numa memória de um evento, lugar ou pessoa (cerca de 1 minuto de duração). O líquido ganha cor e gosto doce. Quem bebe revê a memória como se tivesse vivido; depois lembra com a mesma facilidade. Quem não quiser pode recusar a absorção.',
  }),
  ...SWIMMING.map((grade) =>
    consumableItem({
      id: `potion-2953${grade.key === 'standard' ? '' : `-${grade.key}`}`,
      aonId: 2953,
      name: `Poção de natação${grade.name}`,
      originalName: `Potion of Swimming${grade.original}`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 261,
      consumable: {
        kind: 'potion',
        effectFamily: 'swimming',
        duration: grade.duration,
        note: `Deslocamento de natação igual ao terrestre por ${grade.duration}.`,
      },
      description: `Gosto de água salgada, areia no fundo. Ao beber, deslocamento de natação igual ao seu deslocamento terrestre por ${grade.duration}.`,
    }),
  ),
  consumableItem({
    id: 'potion-2954',
    aonId: 2954,
    name: 'Poção de fala verdadeira',
    originalName: 'Potion of Truespeech',
    level: 12,
    priceGp: 320,
    page: 261,
    rarity: 'uncommon',
    traits: ['Uncommon'],
    consumable: {
      kind: 'potion',
      effectFamily: 'truespeech',
      duration: '4 horas',
      note: 'Fala e entende todos os idiomas por 4 horas. Não lê a forma escrita.',
    },
    description:
      'Poção azeda. Por 4 horas você fala e entende todos os idiomas. Não permite ler esses idiomas por escrito.',
  }),
  consumableItem({
    id: 'potion-2955',
    aonId: 2955,
    name: 'Poção de indetectabilidade',
    originalName: 'Potion of Undetectability',
    level: 18,
    priceGp: 4400,
    page: 261,
    consumable: {
      kind: 'potion',
      effectFamily: 'undetectability',
      duration: '10 minutos',
      note: 'Como mente oculta (sem o bônus contra efeitos mentais) e invisibilidade de 4º posto (protege contra ver o invisível de 8º posto ou menos; CD 36 contra visão verdadeira). 10 minutos.',
    },
    description:
      'Líquido preto-fosco. Por 10 minutos você fica indetectável a efeitos de detecção (como mente oculta, sem o bônus contra efeitos mentais) e ganha invisibilidade de 4º posto, que protege contra ver o invisível de 8º posto ou menos e tem CD 36 contra visão verdadeira.',
  }),
  consumableItem({
    id: 'potion-2956',
    aonId: 2956,
    name: 'Poção de respirar na água',
    originalName: 'Potion of Water Breathing',
    level: 3,
    priceGp: 11,
    page: 261,
    consumable: {
      kind: 'potion',
      effectFamily: 'water-breathing',
      duration: '1 hora',
      note: 'Efeito da magia respirar na água de 2º posto por 1 hora.',
    },
    description:
      'Cinza-leitosa, cheiro e gosto de detrito do mar. Ao beber, efeitos da magia respirar na água de 2º posto por 1 hora.',
  }),
  consumableItem({
    id: 'potion-2957',
    aonId: 2957,
    name: 'Soro de mudança de sexo',
    originalName: 'Serum of Sex Shift',
    level: 7,
    priceGp: 60,
    page: 261,
    consumable: {
      kind: 'potion',
      note: 'Muda na hora as características sexuais à sua escolha. Instantâneo; não pode ser contraposto. Sem efeito se estiver grávida ou se a ancestralidade não tiver diferenciação sexual.',
    },
    description:
      'Ao beber, o corpo assume na hora um conjunto de características sexuais à sua escolha. Você controla os detalhes no geral, mas mantém forte semelhança de família. A magia é instantânea e não pode ser contraposta. A anatomia nova é tão saudável quanto a anterior. Beber de novo permite voltar à forma original ou escolher outras características. Sem efeito se você estiver grávida ou for de uma ancestralidade sem diferenciação sexual.',
  }),
  consumableItem({
    id: 'potion-2958',
    aonId: 2958,
    name: 'Poção de encolhimento',
    originalName: 'Shrinking Potion',
    level: 4,
    priceGp: 15,
    page: 261,
    consumable: {
      kind: 'potion',
      effectFamily: 'shrinking',
      duration: '10 minutos',
      note: 'Início de 1 minuto, depois efeitos de encolher em você e no equipamento por 10 minutos.',
    },
    description:
      'Gosto de fungo. Após 1 minuto de início, você e o equipamento ficam menores (magia encolher) por 10 minutos.',
  }),
  consumableItem({
    id: 'potion-2958-greater',
    aonId: 2958,
    name: 'Poção de encolhimento maior',
    originalName: 'Shrinking Potion (Greater)',
    level: 8,
    priceGp: 90,
    page: 261,
    consumable: {
      kind: 'potion',
      effectFamily: 'shrinking',
      duration: '1 hora',
      note: 'Sem início. Encolher de 4º posto por 1 hora, e +2 de item em Furtividade enquanto estiver pequeno.',
    },
    description:
      'Sem início. Efeitos da magia encolher de 4º posto por 1 hora, e +2 de bônus de item em Furtividade enquanto estiver encolhido.',
  }),
  consumableItem({
    id: 'potion-2959',
    aonId: 2959,
    name: 'Poção de escudo temporal',
    originalName: 'Time Shield Potion',
    level: 13,
    priceGp: 600,
    page: 261,
    consumable: {
      kind: 'potion',
      note: 'Você some do tempo por 2d4 rodadas: não age, não é alvo, imune a tudo. Durações sobre você pausam. Ao voltar, se o espaço estiver ocupado você é empurrado para o livre mais perto.',
    },
    description:
      'Roxa, amarga, parece tremer. Por 2d4 rodadas você fica congelado no tempo: não age, não pode ser alvo, fica imune a todos os efeitos e some do espaço. Durações que já o afetavam pausam. Quando acaba, você volta ao fluxo e ao espaço antigo; se estiver ocupado, vai para o livre mais perto. Efeitos retomam como se o tempo não tivesse passado. Se uma área foi criada enquanto você estava fora, você a toma ao voltar.',
  }),
  consumableItem({
    id: 'potion-2960',
    aonId: 2960,
    name: 'Poção de visão verdadeira',
    originalName: 'Truesight Potion',
    level: 16,
    priceGp: 1500,
    page: 261,
    consumable: {
      kind: 'potion',
      effectFamily: 'truesight',
      duration: 'visão verdadeira de 7º posto',
      note: 'Efeitos da magia visão verdadeira de 7º posto, modificador de contraposição +25.',
    },
    description:
      'Clara e refrescante. Ao beber, efeitos da magia visão verdadeira de 7º posto com modificador de contraposição +25.',
  }),
  consumableItem({
    id: 'potion-2961',
    aonId: 2961,
    name: 'Poção da verdade',
    originalName: 'Truth Potion',
    level: 6,
    priceGp: 46,
    page: 261,
    rarity: 'uncommon',
    traits: ['Uncommon', 'Mental'],
    consumable: {
      kind: 'potion',
      effectFamily: 'truth',
      duration: '10 minutos',
      note: 'Vontade CD 19 (pode falhar de propósito). Sucesso: nada. Falha: não pode mentir de propósito. Falha crítica: se perguntarem, nova Vontade CD 19 ou responde a verdade.',
    },
    description:
      'Adstringente. Por 10 minutos você não pode mentir de propósito e pode ser forçado a falar a verdade. Ao beber, teste de Vontade CD 19 (pode falhar ou falhar criticamente de propósito). Sucesso: a poção não pega. Falha: ao falar, precisa dizer a verdade. Falha crítica: como falha, e se alguém perguntar você testa Vontade CD 19 de novo; se falhar, responde a verdade se puder. Sucesso nessa segunda deixa você imune à mesma pergunta pelo resto da duração.',
  }),
]
