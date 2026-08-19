import { alchemicalItem } from './equipmentFactory'
import type { AlchemicalBombStats, ItemDefinition } from '@/types/equipment'
import type { DamageTypeId } from '@/types/equipment'

const BOMB_GRADES = [
  { key: 'lesser', name: 'menor', original: 'Lesser', level: 1, priceGp: 3, bonus: 0 },
  { key: 'moderate', name: 'moderada', original: 'Moderate', level: 3, priceGp: 10, bonus: 1 },
  { key: 'greater', name: 'maior', original: 'Greater', level: 11, priceGp: 250, bonus: 2 },
  { key: 'major', name: 'máxima', original: 'Major', level: 17, priceGp: 2500, bonus: 3 },
] as const

function bombSet(opts: {
  aonId: number
  name: string
  originalName: string
  page: number
  traits: string[]
  typePt: string
  damageType: DamageTypeId | string
  die: string
  splash: boolean
  persistentTrait?: string
  hitEffect?: string
  extraDesc: string
  persistentFlat?: boolean
}): ItemDefinition[] {
  return BOMB_GRADES.map((grade, index) => {
    const diceCount = index + 1
    const splashVal = opts.splash ? diceCount : undefined
    const bomb: AlchemicalBombStats = {
      damageDie: `${diceCount}${opts.die}`,
      damageType: opts.damageType,
      splash: splashVal,
      splashType: opts.damageType,
      attackItemBonus: grade.bonus || undefined,
      range: 20,
      hitEffect: opts.hitEffect,
      persistentFlat: opts.persistentFlat ? diceCount : undefined,
    }
    const bonusTxt =
      grade.bonus > 0 ? ` +${grade.bonus} de bônus de item no ataque.` : ''
    return alchemicalItem({
      id: `alch-${opts.aonId}-${grade.key}`,
      aonId: opts.aonId,
      name: `${opts.name} ${grade.name}`,
      originalName: `${opts.originalName} (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: opts.page,
      traits: opts.traits,
      alchemical: { kind: 'bomb', bomb },
      description: `${opts.extraDesc} Causa ${diceCount}${opts.die} de ${opts.typePt}${
        splashVal ? ` e ${splashVal} de respingo de ${opts.typePt}` : ''
      }.${opts.persistentFlat ? ` +${diceCount} de dano persistente de ${opts.typePt}.` : ''}${bonusTxt} Arremesso 20 pés; não soma Força. Consumível.`,
    })
  })
}

export const PLAYER_CORE_2_ALCHEMICALS: ItemDefinition[] = [
  ...bombSet({
    aonId: 3286,
    name: 'Frasco de ácido',
    originalName: 'Acid Flask',
    page: 283,
    traits: ['Acid'],
    typePt: 'ácido',
    damageType: 'acid',
    die: 'd6',
    splash: true,
    persistentFlat: true,
    extraDesc:
      'O frasco em si causa 1 de ácido; o restante é persistente e respingo. Corrói o alvo e quem está ao lado.',
  }).map((item, index) => {
    const dice = index + 1
    const bomb = {
      damageDie: '1',
      damageType: 'acid' as const,
      persistentDice: `${dice}d6`,
      splash: dice,
      splashType: 'acid' as const,
      attackItemBonus: BOMB_GRADES[index]!.bonus || undefined,
      range: 20,
    }
    return {
      ...item,
      weapon: item.weapon
        ? { ...item.weapon, damageDie: '1', damageType: 'acid' }
        : undefined,
      alchemical: { kind: 'bomb' as const, bomb },
      description: `Frasco corrosivo. Causa 1 de ácido, ${dice}d6 persistente de ácido e ${dice} de respingo de ácido.${
        BOMB_GRADES[index]!.bonus
          ? ` +${BOMB_GRADES[index]!.bonus} de bônus de item no ataque.`
          : ''
      } Arremesso 20 pés; não soma Força.`,
    }
  }),
  ...bombSet({
    aonId: 3287,
    name: 'Fogo alquímico',
    originalName: "Alchemist's Fire",
    page: 283,
    traits: ['Fire'],
    typePt: 'fogo',
    damageType: 'fire',
    die: 'd8',
    splash: true,
    persistentFlat: true,
    extraDesc: 'Líquidos voláteis que inflamam no ar.',
  }),
  ...bombSet({
    aonId: 3288,
    name: 'Pedra explosiva',
    originalName: 'Blasting Stone',
    page: 283,
    traits: ['Sonic'],
    typePt: 'sônico',
    damageType: 'sonic',
    die: 'd4',
    splash: true,
    hitEffect: 'Quem estiver a 3 m faz Fortitude ou fica surdo até o fim do próximo turno.',
    extraDesc:
      'Seixo que estoura com estrondo. Criaturas a 3 metros precisam passar em Fortitude ou ficam surdas até o fim do próximo turno (CD 17/20/28/36 conforme o grau).',
  }),
  ...bombSet({
    aonId: 3290,
    name: 'Relâmpago engarrafado',
    originalName: 'Bottled Lightning',
    page: 284,
    traits: ['Electricity'],
    typePt: 'eletricidade',
    damageType: 'electricity',
    die: 'd6',
    splash: true,
    hitEffect: 'O alvo fica desprevenido até o início do seu próximo turno.',
    extraDesc: 'Reagentes que soltam um estalo elétrico. No acerto, o alvo fica desprevenido.',
  }),
  ...bombSet({
    aonId: 3293,
    name: 'Frasco gélido',
    originalName: 'Frost Vial',
    page: 285,
    traits: ['Cold'],
    typePt: 'frio',
    damageType: 'cold',
    die: 'd6',
    splash: true,
    hitEffect: 'Penalidade de status no deslocamento até o fim do próximo turno do alvo.',
    extraDesc:
      'Absorve calor ao contato com o ar. No acerto, o alvo fica mais lento até o fim do próximo turno.',
  }),
  ...bombSet({
    aonId: 3294,
    name: 'Carga fantasma',
    originalName: 'Ghost Charge',
    page: 285,
    traits: ['Vitality'],
    typePt: 'vitalidade',
    damageType: 'vitality',
    die: 'd8',
    splash: true,
    hitEffect: 'Mortos-vivos que tomarem o dano ficam enfraquecidos até o início do seu próximo turno.',
    extraDesc:
      'Sais que drenam mortos-vivos, inclusive incorpóreos. Vitalidade só fere quem tem cura de vazio.',
  }),
  ...BOMB_GRADES.map((grade, index) => {
    const penalty = index === 0 ? 10 : index === 3 ? 20 : 15
    const escapeDc = [17, 19, 28, 37][index]!
    return alchemicalItem({
      id: `alch-3295-${grade.key}`,
      aonId: 3295,
      name: `Bomba de cola ${grade.name}`,
      originalName: `Glue Bomb (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 285,
      alchemical: {
        kind: 'bomb',
        bomb: {
          damageDie: '0',
          damageType: 'untyped',
          attackItemBonus: grade.bonus || undefined,
          range: 20,
          hitEffect: `Penalidade de status de –${penalty} pés no deslocamento por 1 minuto (Escapar CD ${escapeDc}).`,
        },
      },
      description: `Explosivo pegajoso, sem dano. No acerto, –${penalty} pés de deslocamento por 1 minuto (Escapar CD ${escapeDc} ou 3 ações de manipular). No crítico, imobiliza por 1 rodada se estiver no chão.${
        grade.bonus ? ` +${grade.bonus} de bônus de item no ataque.` : ''
      } Não funciona debaixo d'água.`,
    })
  }),
  ...BOMB_GRADES.map((grade, index) => {
    const dice = index + 1
    return alchemicalItem({
      id: `alch-3289-${grade.key}`,
      aonId: 3289,
      name: `Bomba de praga ${grade.name}`,
      originalName: `Blight Bomb (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 283,
      traits: ['Poison'],
      alchemical: {
        kind: 'bomb',
        bomb: {
          damageDie: `${dice}d4`,
          damageType: 'poison',
          persistentDice: `${dice}d4`,
          splash: dice,
          splashType: 'poison',
          attackItemBonus: grade.bonus || undefined,
          range: 20,
        },
      },
      description: `Químicos tóxicos que apodrecem a carne. Causa ${dice}d4 de veneno, ${dice}d4 persistente de veneno e ${dice} de respingo de veneno.${
        grade.bonus ? ` +${grade.bonus} de bônus de item no ataque.` : ''
      } Arremesso 20 pés; não soma Força.`,
    })
  }),
  ...BOMB_GRADES.map((grade, index) => {
    const dice = index + 1
    return alchemicalItem({
      id: `alch-3292-${grade.key}`,
      aonId: 3292,
      name: `Ampola do pavor ${grade.name}`,
      originalName: `Dread Ampoule (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 285,
      traits: ['Emotion', 'Fear', 'Mental', 'Poison'],
      alchemical: {
        kind: 'bomb',
        bomb: {
          damageDie: `${dice}d6`,
          damageType: 'mental',
          splash: dice,
          splashType: 'mental',
          attackItemBonus: grade.bonus || undefined,
          range: 20,
          hitEffect: 'O alvo fica amedrontado 1, ou amedrontado 2 no crítico.',
        },
      },
      description: `Gás roxo turvo que atrapalha o cérebro. Causa ${dice}d6 mental e ${dice} de respingo mental. No acerto, o alvo fica amedrontado 1 (amedrontado 2 no crítico).${
        grade.bonus ? ` +${grade.bonus} de bônus de item no ataque.` : ''
      } Arremesso 20 pés; não soma Força.`,
    })
  }),
  ...[
    { key: 'moderate', name: 'moderados', original: 'Moderate', level: 4, priceGp: 16, bonus: 1, dice: 2, splash: 4 },
    { key: 'greater', name: 'maiores', original: 'Greater', level: 12, priceGp: 350, bonus: 2, dice: 3, splash: 5 },
    { key: 'major', name: 'máximos', original: 'Major', level: 18, priceGp: 4000, bonus: 3, dice: 4, splash: 6 },
  ].map((grade) =>
    alchemicalItem({
      id: `alch-3291-${grade.key}`,
      aonId: 3291,
      name: `Estilhaços de cristal ${grade.name}`,
      originalName: `Crystal Shards (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 284,
      traits: ['Earth'],
      alchemical: {
        kind: 'bomb',
        bomb: {
          damageDie: `${grade.dice}d4`,
          damageType: 'piercing',
          splash: grade.splash,
          splashType: 'piercing',
          attackItemBonus: grade.bonus,
          range: 20,
        },
      },
      description: `Gás marrom-vermelho pressurizado com cristais. +${grade.bonus} de bônus de item no ataque. Causa ${grade.dice}d4 perfurante e ${grade.splash} de respingo perfurante. Arremesso 20 pés; não soma Força.`,
    }),
  ),
  alchemicalItem({
    id: 'alch-3300-lesser',
    aonId: 3300,
    name: 'Cerveja do bravo menor',
    originalName: "Bravo's Brew (Lesser)",
    level: 2,
    priceGp: 7,
    page: 286,
    alchemical: {
      kind: 'elixir',
      effectFamily: 'bravo',
      elixir: {
        duration: '1 hora',
        willBonus: 1,
        willVsFear: 2,
        note: '+1 em Vontade, ou +2 contra medo.',
      },
    },
    description:
      'Cerveja espumante. Por 1 hora, +1 de bônus de item em Vontade, ou +2 contra efeitos de medo.',
  }),
  alchemicalItem({
    id: 'alch-3300-moderate',
    aonId: 3300,
    name: 'Cerveja do bravo moderada',
    originalName: "Bravo's Brew (Moderate)",
    level: 10,
    priceGp: 150,
    page: 286,
    alchemical: {
      kind: 'elixir',
      effectFamily: 'bravo',
      elixir: {
        duration: '1 hora',
        willBonus: 2,
        willVsFear: 3,
        note: '+2 em Vontade, ou +3 contra medo.',
      },
    },
    description:
      'Por 1 hora, +2 de bônus de item em Vontade, ou +3 contra medo.',
  }),
  alchemicalItem({
    id: 'alch-3300-greater',
    aonId: 3300,
    name: 'Cerveja do bravo maior',
    originalName: "Bravo's Brew (Greater)",
    level: 15,
    priceGp: 700,
    page: 286,
    alchemical: {
      kind: 'elixir',
      effectFamily: 'bravo',
      elixir: {
        duration: '1 hora',
        willBonus: 3,
        willVsFear: 4,
        note: '+3 em Vontade, ou +4 contra medo. Sucesso contra medo vira crítico.',
      },
    },
    description:
      'Por 1 hora, +3 de bônus de item em Vontade, ou +4 contra medo. Sucesso em salvaguarda contra medo vira sucesso crítico.',
  }),
  alchemicalItem({
    id: 'alch-3306-lesser',
    aonId: 3306,
    name: 'Elixir olho de águia menor',
    originalName: 'Eagle-Eye Elixir (Lesser)',
    level: 1,
    priceGp: 4,
    page: 287,
    alchemical: {
      kind: 'elixir',
      effectFamily: 'eagle-eye',
      elixir: {
        duration: '1 hora',
        perceptionBonus: 1,
        note: '+1 em Percepção, ou +2 para achar portas secretas e armadilhas.',
      },
    },
    description:
      'Por 1 hora, +1 de bônus de item em Percepção, ou +2 para achar portas secretas e armadilhas.',
  }),
  alchemicalItem({
    id: 'alch-3306-moderate',
    aonId: 3306,
    name: 'Elixir olho de águia moderado',
    originalName: 'Eagle-Eye Elixir (Moderate)',
    level: 5,
    priceGp: 27,
    page: 287,
    alchemical: {
      kind: 'elixir',
      effectFamily: 'eagle-eye',
      elixir: {
        duration: '1 hora',
        perceptionBonus: 2,
        note: '+2 em Percepção, ou +3 para achar portas secretas e armadilhas.',
      },
    },
    description:
      'Por 1 hora, +2 de bônus de item em Percepção, ou +3 para achar portas secretas e armadilhas.',
  }),
  alchemicalItem({
    id: 'alch-3306-greater',
    aonId: 3306,
    name: 'Elixir olho de águia maior',
    originalName: 'Eagle-Eye Elixir (Greater)',
    level: 10,
    priceGp: 200,
    page: 287,
    alchemical: {
      kind: 'elixir',
      effectFamily: 'eagle-eye',
      elixir: {
        duration: '1 hora',
        perceptionBonus: 3,
        note: '+3 em Percepção, ou +4 para achar portas secretas e armadilhas.',
      },
    },
    description:
      'Por 1 hora, +3 de bônus de item em Percepção, ou +4 para achar portas secretas e armadilhas.',
  }),
  alchemicalItem({
    id: 'alch-3306-major',
    aonId: 3306,
    name: 'Elixir olho de águia máximo',
    originalName: 'Eagle-Eye Elixir (Major)',
    level: 16,
    priceGp: 2000,
    page: 287,
    alchemical: {
      kind: 'elixir',
      effectFamily: 'eagle-eye',
      elixir: {
        duration: '1 hora',
        perceptionBonus: 3,
        note: '+3 em Percepção, ou +4 para achar portas e armadilhas. O mestre rola em segredo se você passar a 3 m de uma.',
      },
    },
    description:
      'Como o maior, e o mestre rola em segredo sempre que você passa a 3 metros de uma porta secreta ou armadilha.',
  }),
  ...supportElixirs(),
  ...elixirOfLife(),
  ...remainingElixirs(),
]

function elixirOfLife(): ItemDefinition[] {
  const grades: Array<{
    key: string
    name: string
    original: string
    level: number
    priceGp: number
    hpDice: string
    hpFlat?: number
    saveBonus: number
  }> = [
    { key: 'minor', name: 'mínimo', original: 'Minor', level: 1, priceGp: 3, hpDice: '1d6', saveBonus: 1 },
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 5, priceGp: 30, hpDice: '3d6', hpFlat: 6, saveBonus: 1 },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 9, priceGp: 150, hpDice: '5d6', hpFlat: 12, saveBonus: 2 },
    { key: 'greater', name: 'maior', original: 'Greater', level: 13, priceGp: 600, hpDice: '7d6', hpFlat: 18, saveBonus: 2 },
    { key: 'major', name: 'máximo', original: 'Major', level: 15, priceGp: 1300, hpDice: '8d6', hpFlat: 21, saveBonus: 3 },
    { key: 'true', name: 'verdadeiro', original: 'True', level: 19, priceGp: 8000, hpDice: '10d6', hpFlat: 27, saveBonus: 4 },
  ]
  return grades.map((grade) => {
    const heal = grade.hpFlat
      ? `${grade.hpDice}+${grade.hpFlat}`
      : grade.hpDice
    return alchemicalItem({
      id: `alch-3308-${grade.key}`,
      aonId: 3308,
      name: `Elixir da vida ${grade.name}`,
      originalName: `Elixir of Life (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 288,
      traits: ['Healing'],
      alchemical: {
        kind: 'elixir',
        effectFamily: 'elixir-of-life',
        elixir: {
          hpDice: grade.hpDice,
          hpFlat: grade.hpFlat,
          duration: '10 minutos',
          fortVsPoison: grade.saveBonus,
          fortVsDisease: grade.saveBonus,
          note: `+${grade.saveBonus} de bônus de item em salvaguardas contra doença e veneno.`,
        },
      },
      description: `Acelera a cura natural. Restaura ${heal} PV e dá +${grade.saveBonus} de bônus de item em salvaguardas contra doença e veneno por 10 minutos. Uma ação de manipular para beber.`,
    })
  })
}

function supportElixirs(): ItemDefinition[] {
  const antidote = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 1, priceGp: 3, bonus: 2 },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 6, priceGp: 35, bonus: 3 },
    { key: 'greater', name: 'maior', original: 'Greater', level: 10, priceGp: 160, bonus: 4 },
    { key: 'major', name: 'máximo', original: 'Major', level: 14, priceGp: 675, bonus: 4, extra: true },
  ] as const
  const cheetah = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 1, priceGp: 3, speed: 5, duration: '1 minuto' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 5, priceGp: 25, speed: 10, duration: '10 minutos' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 9, priceGp: 110, speed: 10, duration: '1 hora' },
  ] as const
  const mistform = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 4, priceGp: 18, duration: '3 rodadas' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 6, priceGp: 56, duration: '1 minuto' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 10, priceGp: 180, duration: '5 minutos' },
  ] as const

  return [
    ...antidote.map((grade) =>
      alchemicalItem({
        id: `alch-3296-${grade.key}`,
        aonId: 3296,
        name: `Antídoto ${grade.name}`,
        originalName: `Antidote (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 286,
        traits: ['Healing'],
        alchemical: {
          kind: 'elixir',
          effectFamily: 'antidote',
          elixir: {
            duration: '6 horas',
            fortVsPoison: grade.bonus,
            note:
              'extra' in grade && grade.extra
                ? `+${grade.bonus} em Fortitude contra veneno por 6 horas. Ao beber, pode testar contra um veneno de 14º nível ou menor; sucesso neutraliza.`
                : `+${grade.bonus} de bônus de item em Fortitude contra veneno por 6 horas.`,
          },
        },
        description:
          'extra' in grade && grade.extra
            ? `Protege contra toxinas. +${grade.bonus} em Fortitude contra veneno por 6 horas. Ao beber, pode testar contra um veneno de 14º nível ou menor; sucesso neutraliza.`
            : `Protege contra toxinas. +${grade.bonus} de bônus de item em Fortitude contra veneno por 6 horas.`,
      }),
    ),
    ...antidote.map((grade) =>
      alchemicalItem({
        id: `alch-3297-${grade.key}`,
        aonId: 3297,
        name: `Antipraga ${grade.name}`,
        originalName: `Antiplague (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 286,
        traits: ['Healing'],
        alchemical: {
          kind: 'elixir',
          effectFamily: 'antiplague',
          elixir: {
            duration: '24 horas',
            fortVsDisease: grade.bonus,
            note:
              'extra' in grade && grade.extra
                ? `+${grade.bonus} em Fortitude contra doença por 24 horas (vale no teste diário). Ao beber, pode testar contra uma doença de 14º nível ou menor; sucesso cura.`
                : `+${grade.bonus} de bônus de item em Fortitude contra doença por 24 horas, inclusive no teste diário.`,
          },
        },
        description:
          'extra' in grade && grade.extra
            ? `Fortifica contra doenças. +${grade.bonus} em Fortitude contra doença por 24 horas. Ao beber, pode testar contra uma doença de 14º nível ou menor; sucesso cura.`
            : `Fortifica contra doenças. +${grade.bonus} de bônus de item em Fortitude contra doença por 24 horas, inclusive no teste diário de progressão.`,
      }),
    ),
    ...cheetah.map((grade) =>
      alchemicalItem({
        id: `alch-3302-${grade.key}`,
        aonId: 3302,
        name: `Elixir da chita ${grade.name}`,
        originalName: `Cheetah's Elixir (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 286,
        alchemical: {
          kind: 'elixir',
          effectFamily: 'cheetah',
          elixir: {
            duration: grade.duration,
            speedBonus: grade.speed,
            note: `+${grade.speed} pés de deslocamento (bônus de status) por ${grade.duration}.`,
          },
        },
        description: `Enzimas aceleram as pernas. +${grade.speed} pés de deslocamento (bônus de status) por ${grade.duration}.`,
      }),
    ),
    alchemicalItem({
      id: 'alch-3301',
      aonId: 3301,
      name: 'Elixir olho de gato',
      originalName: "Cat's Eye Elixir",
      level: 2,
      priceGp: 7,
      page: 286,
      alchemical: {
        kind: 'elixir',
        effectFamily: 'cats-eye',
        elixir: {
          duration: '1 minuto',
          note: 'Contra criaturas a até 9 metros: teste simples para oculto cai para 5, e você não precisa testar contra ocultado.',
        },
      },
      description:
        'A visão fica aguda. Por 1 minuto, contra criaturas a até 9 metros, o teste simples para acertar oculto cai para 5 e você não precisa testar para acertar ocultado.',
    }),
    ...mistform.map((grade) =>
      alchemicalItem({
        id: `alch-3310-${grade.key}`,
        aonId: 3310,
        name: `Elixir forma de névoa ${grade.name}`,
        originalName: `Mistform Elixir (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 288,
        traits: ['Illusion', 'Visual'],
        alchemical: {
          kind: 'elixir',
          effectFamily: 'mistform',
          elixir: {
            duration: grade.duration,
            note: `Você fica ocultado por ${grade.duration}. Se a posição ainda for óbvia, não serve para Esconder-se nem Furtar-se.`,
          },
        },
        description: `Névoa sai da pele. Você fica ocultado por ${grade.duration}. Se a posição ainda for óbvia, não serve para Esconder-se nem Furtar-se.`,
      }),
    ),
    alchemicalItem({
      id: 'alch-3360-lesser',
      aonId: 3360,
      name: 'Bola de fumaça menor',
      originalName: 'Smoke Ball (Lesser)',
      level: 1,
      priceGp: 3,
      page: 296,
      alchemical: {
        kind: 'tool',
        effectFamily: 'smoke',
        tool: {
          duration: '1 minuto',
          note: 'Explosão de 5 pés: todos na área ficam ocultados, e os de fora ficam ocultados para eles. Dura 1 minuto ou até vento forte.',
        },
      },
      description:
        'Um giro cria uma nuvem opaca. Explosão de 5 pés centrada num canto do seu espaço. Todos na área ficam ocultados, e os de fora ficam ocultados para eles. Dura 1 minuto ou até vento forte. Duas mãos.',
    }),
    alchemicalItem({
      id: 'alch-3360-greater',
      aonId: 3360,
      name: 'Bola de fumaça maior',
      originalName: 'Smoke Ball (Greater)',
      level: 7,
      priceGp: 53,
      page: 296,
      alchemical: {
        kind: 'tool',
        effectFamily: 'smoke',
        tool: {
          duration: '1 minuto',
          note: 'Explosão de 20 pés: todos na área ficam ocultados, e os de fora ficam ocultados para eles. Dura 1 minuto ou até vento forte.',
        },
      },
      description:
        'Como a menor, com explosão de 20 pés. Dura 1 minuto ou até vento forte. Duas mãos.',
    }),
  ]
}

function remainingElixirs(): ItemDefinition[] {
  const counteract = [
    { key: 'minor', name: 'mínimo', original: 'Minor', level: 2, priceGp: 5, rank: '1º', mod: 6 },
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 4, priceGp: 15, rank: '2º', mod: 8 },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 8, priceGp: 75, rank: '4º', mod: 14 },
    { key: 'greater', name: 'maior', original: 'Greater', level: 12, priceGp: 325, rank: '6º', mod: 19 },
    { key: 'major', name: 'máximo', original: 'Major', level: 18, priceGp: 3250, rank: '9º', mod: 28 },
  ] as const
  const darkvision = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 2, priceGp: 6, duration: '10 minutos' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 4, priceGp: 11, duration: '1 hora' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 8, priceGp: 90, duration: '24 horas' },
  ] as const
  const cooling = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 4, priceGp: 15, note: 'Protegido contra calor severo por 24 horas.' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 12, priceGp: 320, note: 'Protegido contra calor severo e extremo por 24 horas.' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 16, priceGp: 1400, note: 'Protegido contra calor severo, extremo e incrível por 24 horas.' },
  ] as const
  const witchwarg = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 4, priceGp: 15, note: 'Protegido contra frio severo por 24 horas.' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 12, priceGp: 320, note: 'Protegido contra frio severo e extremo por 24 horas.' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 16, priceGp: 1400, note: 'Protegido contra frio severo, extremo e incrível por 24 horas.' },
  ] as const
  const seaTouch = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 5, priceGp: 22, duration: '10 minutos', extra: '' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 12, priceGp: 300, duration: '1 hora', extra: ' Você respira debaixo d\'água.' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 15, priceGp: 920, duration: '24 horas', extra: ' Você respira debaixo d\'água.' },
  ] as const
  const gender = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 1, priceGp: 1, note: 'Tomar toda semana; as mudanças levam um ano ou mais.' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 3, priceGp: 8, note: 'Tomar uma vez por mês; as mudanças levam um ano.' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 6, priceGp: 35, note: 'Tomar uma vez; as mudanças levam 6 meses.' },
  ] as const

  return [
    alchemicalItem({
      id: 'alch-3298-lesser',
      aonId: 3298,
      name: 'Elixir olho do bombardeiro menor',
      originalName: "Bomber's Eye Elixir (Lesser)",
      level: 4,
      priceGp: 14,
      page: 286,
      alchemical: {
        kind: 'elixir',
        effectFamily: 'bombers-eye',
        elixir: {
          duration: '5 minutos',
          note: 'Por 5 minutos, Golpes com bomba alquímica reduzem em 1 o bônus de circunstância de CA que o alvo ganha de cobertura.',
        },
      },
      description:
        'Esta tintura deixa você cravar os inimigos. Por 5 minutos, seus Golpes com bomba alquímica reduzem em 1 o bônus de circunstância de CA que os alvos ganham de cobertura.',
    }),
    alchemicalItem({
      id: 'alch-3298-greater',
      aonId: 3298,
      name: 'Elixir olho do bombardeiro maior',
      originalName: "Bomber's Eye Elixir (Greater)",
      level: 14,
      priceGp: 700,
      page: 286,
      alchemical: {
        kind: 'elixir',
        effectFamily: 'bombers-eye',
        elixir: {
          duration: '5 minutos',
          note: 'Por 5 minutos, Golpes com bomba alquímica reduzem em 2 o bônus de circunstância de CA que o alvo ganha de cobertura.',
        },
      },
      description:
        'Como o menor, mas reduz o bônus de cobertura em 2.',
    }),
    ...counteract.map((grade) =>
      alchemicalItem({
        id: `alch-3299-${grade.key}`,
        aonId: 3299,
        name: `Catarse engarrafada ${grade.name}`,
        originalName: `Bottled Catharsis (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 286,
        traits: ['Healing', 'Emotion'],
        alchemical: {
          kind: 'elixir',
          elixir: {
            note: `Tenta contrapor cada efeito com o traço emoção. Posto ${grade.rank}, modificador +${grade.mod}.`,
          },
        },
        description: `Libera uma onda de emoções e reinicia o estado mental. Ao beber, tenta contrapor cada efeito com o traço emoção. Posto ${grade.rank} e modificador +${grade.mod}.`,
      }),
    ),
    alchemicalItem({
      id: 'alch-3303-lesser',
      aonId: 3303,
      name: 'Elixir de compreensão menor',
      originalName: 'Comprehension Elixir (Lesser)',
      level: 2,
      priceGp: 7,
      page: 287,
      traits: ['Mental'],
      alchemical: {
        kind: 'elixir',
        effectFamily: 'comprehension',
        elixir: {
          duration: '1 minuto',
          note: 'Por 1 minuto você entende qualquer texto que ler, se for idioma (não códigos).',
        },
      },
      description:
        'Gole amargo. Por 1 minuto você entende qualquer palavra escrita que ler, desde que seja um idioma — não decifra códigos nem cifras.',
    }),
    alchemicalItem({
      id: 'alch-3303-greater',
      aonId: 3303,
      name: 'Elixir de compreensão maior',
      originalName: 'Comprehension Elixir (Greater)',
      level: 7,
      priceGp: 54,
      page: 287,
      traits: ['Mental'],
      alchemical: {
        kind: 'elixir',
        effectFamily: 'comprehension',
        elixir: {
          duration: '10 minutos',
          note: 'Por 10 minutos você entende qualquer texto que ler, se for idioma (não códigos).',
        },
      },
      description:
        'Como o menor, por 10 minutos.',
    }),
    ...cooling.map((grade) =>
      alchemicalItem({
        id: `alch-3304-${grade.key}`,
        aonId: 3304,
        name: `Elixir refrescante ${grade.name}`,
        originalName: `Cooling Elixir (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 287,
        alchemical: {
          kind: 'elixir',
          effectFamily: 'cooling',
          elixir: { duration: '24 horas', note: grade.note },
        },
        description: `Feito para ambientes extremos. ${grade.note}`,
      }),
    ),
    ...darkvision.map((grade) =>
      alchemicalItem({
        id: `alch-3305-${grade.key}`,
        aonId: 3305,
        name: `Elixir de visão no escuro ${grade.name}`,
        originalName: `Darkvision Elixir (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 287,
        alchemical: {
          kind: 'elixir',
          effectFamily: 'darkvision',
          elixir: {
            duration: grade.duration,
            note: `Visão no escuro por ${grade.duration}.`,
          },
        },
        description: `A vista afia na escuridão. Você ganha visão no escuro por ${grade.duration}.`,
      }),
    ),
    ...gender.map((grade) =>
      alchemicalItem({
        id: `alch-3307-${grade.key}`,
        aonId: 3307,
        name: `Elixir de transição de gênero ${grade.name}`,
        originalName: `Elixir of Gender Transformation (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 287,
        alchemical: {
          kind: 'elixir',
          elixir: { note: grade.note },
        },
        description: `Líquido claro e amargo. Cada fórmula muda características sexuais secundárias de um jeito (por exemplo, uma reduz pelos faciais e a voz). ${grade.note}`,
      }),
    ),
    alchemicalItem({
      id: 'alch-3309',
      aonId: 3309,
      name: 'Elixir de rejuvenescimento',
      originalName: 'Elixir of Rejuvenation',
      level: 20,
      priceGp: 0,
      page: 288,
      rarity: 'uncommon',
      traits: ['Uncommon', 'Healing'],
      alchemical: {
        kind: 'elixir',
        elixir: {
          note: 'PV no máximo e remove aflições de 20º nível ou menos. Ou, num morto há até 1 semana: revive com 1 PV, sem recursos diários. Exige pedra filosofal e elixir da vida verdadeiro.',
        },
      },
      description:
        'Restaura saúde plena e limpa toxinas. Ao beber, você vai ao máximo de PV e perde todas as aflições de 20º nível ou menos. Em vez disso, pode administrar a uma criatura morta há 1 semana ou menos: ela volta à vida na hora com 1 PV, sem espaços de magia, pontos de foco nem outros recursos diários. Criar exige pedra filosofal e elixir da vida verdadeiro.',
    }),
    ...seaTouch.map((grade) =>
      alchemicalItem({
        id: `alch-3311-${grade.key}`,
        aonId: 3311,
        name: `Elixir toque do mar ${grade.name}`,
        originalName: `Sea Touch Elixir (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 288,
        traits: ['Polymorph'],
        alchemical: {
          kind: 'elixir',
          effectFamily: 'sea-touch',
          elixir: {
            duration: grade.duration,
            note: `Membranas entre os dedos: deslocamento de natação 20 pés por ${grade.duration}.${grade.extra}`,
          },
        },
        description: `Mistura salgada. A pele das mãos e pés muda: deslocamento de natação de 20 pés por ${grade.duration}.${grade.extra}`,
      }),
    ),
    alchemicalItem({
      id: 'alch-3312',
      aonId: 3312,
      name: 'Elixir punho de pedra',
      originalName: 'Stone Fist Elixir',
      level: 4,
      priceGp: 13,
      page: 288,
      traits: ['Morph'],
      alchemical: {
        kind: 'elixir',
        effectFamily: 'stone-fist',
        elixir: {
          duration: '1 hora',
          note: 'Por 1 hora os punhos causam 1d6 contundente e perdem o traço não-letal.',
        },
      },
      description:
        'Os punhos ficam duros como pedra. Por 1 hora seus punhos causam 1d6 de dano contundente e perdem o traço não-letal.',
    }),
    ...counteract.map((grade) =>
      alchemicalItem({
        id: `alch-3313-${grade.key}`,
        aonId: 3313,
        name: `Soro de surto ${grade.name}`,
        originalName: `Surging Serum (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 288,
        traits: ['Healing'],
        alchemical: {
          kind: 'elixir',
          elixir: {
            note: `Tenta contrapor cada efeito que impõe desajeitado ou enfraquecido. Posto ${grade.rank}, modificador +${grade.mod}.`,
          },
        },
        description: `Choques involuntários devolvem o controle muscular. Ao beber, tenta contrapor cada efeito que impõe as condições desajeitado ou enfraquecido. Posto ${grade.rank} e modificador +${grade.mod}.`,
      }),
    ),
    ...witchwarg.map((grade) =>
      alchemicalItem({
        id: `alch-3314-${grade.key}`,
        aonId: 3314,
        name: `Elixir de witchwarg ${grade.name}`,
        originalName: `Witchwarg Elixir (${grade.original})`,
        level: grade.level,
        priceGp: grade.priceGp,
        page: 288,
        alchemical: {
          kind: 'elixir',
          effectFamily: 'witchwarg',
          elixir: { duration: '24 horas', note: grade.note },
        },
        description: `Aquece o centro e melhora a circulação. ${grade.note}`,
      }),
    ),
  ]
}
