import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { formatSpeedMeters } from '@/utils/labels'

const VERSATILE_DAMAGE: Record<string, string> = {
  b: 'concussão',
  p: 'perfurante',
  s: 'cortante',
}

function canon(raw: string): string {
  return raw
    .trim()
    .replace(/[_]+/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

function feetFrom(match: string | undefined): number | null {
  if (match == null || match === '') return null
  const n = Number(match)
  return Number.isFinite(n) ? n : null
}

/**
 * Glossário dos traços de arma / Golpe (Player Core Remaster).
 * Chaves em minúsculas, sem hífen.
 */
const TRAIT_GLOSSARY_PT: Record<string, string> = {
  agile:
    'A penalidade de ataques múltiplos no 2º ataque do turno é –4 (em vez de –5) e –8 no 3º e seguintes (em vez de –10).',
  finesse:
    'Você pode usar Destreza no ataque corpo a corpo, em vez de Força. O dano ainda usa Força.',
  sweep:
    'Ataques amplos. +1 de circunstância no ataque se você já tentou atacar outro alvo neste turno com esta arma.',
  forceful:
    'Ganha ímpeto. No 2º ataque do turno, bônus de circunstância no dano igual ao número de dados de dano da arma; nos seguintes, o dobro.',
  reach:
    'Arma longa: o Golpe atinge a até 3 m, não só o adjacente. Se o traço listar outro alcance, use esse.',
  backstabber:
    'Ao acertar uma criatura desprotegida, causa +1 de dano de precisão. Com especialização em arma, +2; com especialização maior, +3.',
  backswing:
    'Depois de errar um ataque com esta arma, você ganha +1 de circunstância no próximo ataque com ela neste turno.',
  trip:
    'Pode usar esta arma para Derrubar (Atletismo) mesmo sem mão livre. Usa o alcance da arma e o bônus de item dela no teste. Em falha crítica, pode soltar a arma para tratar como falha comum.',
  disarm:
    'Pode usar esta arma para Desarmar (Atletismo) mesmo sem mão livre. Usa o alcance da arma e o bônus de item dela no teste. Em falha crítica, pode soltar a arma para tratar como falha comum.',
  shove:
    'Pode usar esta arma para Empurrar (Atletismo) mesmo sem mão livre. Usa o alcance da arma e o bônus de item dela no teste.',
  grapple:
    'Pode usar esta arma para Agarrar (Atletismo) mesmo sem mão livre. Usa o alcance da arma e o bônus de item dela no teste.',
  thrown:
    'Pode arremessar esta arma como ataque à distância. Soma Força no dano, como no corpo a corpo. O incremento de alcance vem junto do traço.',
  propulsive:
    'Arma à distância que usa força do corpo: some metade do modificador de Força no dano (só se o modificador for positivo).',
  nonlethal:
    'Os ataques são não letais. Você pode causar dano letal, mas sofre –2 no ataque.',
  unarmed:
    'Não é uma arma, embora conte como arma corpo a corpo para várias regras. Não pode receber a maioria das runas de arma.',
  parry:
    'Pode usar a ação Erguer um Escudo com esta arma. Em geral concede +1 de circunstância na CA; algumas armas listam um bônus maior.',
  twin:
    'Se você já atacou neste turno com outra arma do mesmo tipo, some no dano um bônus de circunstância igual ao número de dados de dano da arma.',
  'free hand':
    'Não ocupa a mão: você ainda pode usar essa mão para outras coisas, inclusive outra arma de mão livre.',
  deadly:
    'Em acerto crítico, role um dado extra do tamanho listado (além de dobrar os dados da arma).',
  fatal:
    'Em acerto crítico, aumente os dados de dano da arma para o tamanho listado e role um dado extra desse tamanho.',
  versatile:
    'Pode causar outro tipo de dano. Escolha o tipo ao fazer o ataque.',
  'two hand':
    'Pode empunhar com as duas mãos para usar o dado de dano listado.',
  volley:
    'Menos eficaz de perto: –2 no ataque contra alvos dentro da distância listada.',
  jousting:
    'Boa para combate montado. Se você se moveu pelo menos 3 m no turno em que ataca, some o dado listado no dano.',
  reload:
    'Ações de Interagir para recarregar antes de atacar de novo. Recarregar 0: sacar munição faz parte do Golpe.',
  'range increment':
    'Incremento de alcance. Além do primeiro, cada incremento extra impõe –2 no ataque (no máximo 6 incrementos).',
  magical:
    'O ataque é mágico e ignora a resistência a ataques não mágicos.',
  holy:
    'Efeito sagrado. Causa dano extra a criaturas profanas e costuma ser ineficaz ou menos eficaz contra o que é sagrado.',
  unholy:
    'Efeito profano. Causa dano extra a criaturas sagradas e costuma ser ineficaz ou menos eficaz contra o que é profano.',
  occult:
    'O Golpe é de tradição oculta (para resistência, fraqueza e efeitos que se importam com tradição).',
  arcane:
    'O Golpe é de tradição arcana (para resistência, fraqueza e efeitos que se importam com tradição).',
  divine:
    'O Golpe é de tradição divina (para resistência, fraqueza e efeitos que se importam com tradição).',
  primal:
    'O Golpe é de tradição primeva (para resistência, fraqueza e efeitos que se importam com tradição).',
  acid: 'O Golpe causa dano de ácido (ou tem o traço ácido).',
  electricity: 'O Golpe causa dano de eletricidade (ou tem o traço eletricidade).',
  fire: 'O Golpe causa dano de fogo (ou tem o traço fogo).',
  cold: 'O Golpe causa dano de frio (ou tem o traço frio).',
  poison: 'O Golpe causa dano de veneno (ou tem o traço veneno).',
  sonic: 'O Golpe causa dano sônico (ou tem o traço sônico).',
  mental: 'O Golpe causa dano mental (ou tem o traço mental).',
  vitality: 'O Golpe causa dano de vitalidade (ou tem o traço vitalidade).',
  void: 'O Golpe causa dano do vazio (ou tem o traço vazio).',
  spirit: 'O Golpe causa dano de espírito (ou tem o traço espírito).',
  force: 'O Golpe causa dano de força (ou tem o traço força).',
  bleed: 'O Golpe causa dano de sangramento persistente (ou tem o traço sangramento).',
  concussive:
    'Esmaga tanto quanto fura: causa concussão ou perfurante — o que for pior para as resistências do alvo.',
  scatter:
    'Em acerto, criaturas a até a distância listada do alvo também sofrem dano de respingo.',
  kickback:
    'Recuo forte. Sem Força 14 (salvo se o item listar outro valor), –2 no ataque. Muitas vezes precisa apoiar a arma.',
  combination:
    'Tem modo corpo a corpo e modo à distância. Cada modo usa os traços daquela forma.',
  'critical fusion':
    'Em acerto crítico, aplica os efeitos críticos de ambos os modos da arma de combinação.',
  tethered:
    'Fica ligada a você por um cabo. Pode puxá-la de volta com uma ação de Interagir.',
  modular:
    'Pode mudar o tipo de dano (em geral concussão, perfurante ou cortante) com uma ação de Interagir.',
  razing:
    'Eficaz contra objetos, estruturas e veículos: ignora uma quantidade de Solidez igual ao número de dados de dano da arma.',
  concealable:
    'Fácil de esconder. +2 de circunstância em testes de Ladroagem para Ocultar o Objeto, e o Mestre não rola para outros perceberem a menos que procurem.',
  capacity:
    'Guarda várias cargas de munição; dispara até esvaziar, depois precisa recarregar o conjunto.',
  'fatal aim':
    'Se empunhada com duas mãos, o traço Fatal se aplica. Com uma mão, não.',
  'ranged trip':
    'Pode Derrubar à distância com esta arma, usando o incremento de alcance.',
  'attached to shield':
    'Acoplada a um escudo. Empunhar o escudo empunha a arma; soltar um solta o outro.',
  ammunition: 'É munição: precisa estar carregada numa arma compatível para ser disparada.',
  repeating:
    'Usa um pente. Dispara até o pente acabar; trocar o pente é Interagir (em geral Recarregar 1).',
  cobbled:
    'Improvisada ou mal-acabada. Em acerto crítico, a arma pode quebrar (o Mestre decide).',
}

function group(match: RegExpMatchArray, index: number): string {
  return match[index] ?? ''
}

function describePatternedTrait(key: string): string | null {
  let m = key.match(/^deadly (d?\d+)$/)
  if (m) {
    const rawDie = group(m, 1)
    const die = rawDie.startsWith('d') ? rawDie : `d${rawDie}`
    return `Em acerto crítico, role um ${die} extra de dano da arma (além de dobrar os dados normais).`
  }

  m = key.match(/^fatal (d?\d+)$/)
  if (m) {
    const rawDie = group(m, 1)
    const die = rawDie.startsWith('d') ? rawDie : `d${rawDie}`
    return `Em acerto crítico, os dados de dano da arma viram ${die} e você rola um ${die} extra.`
  }

  m = key.match(/^reach(?: (\d+)(?: feet| ft)?)?$/)
  if (m) {
    const feet = feetFrom(m[1])
    if (feet === 0) {
      return 'O Golpe tem alcance 0 m: só atinge criaturas no mesmo espaço.'
    }
    const dist = formatSpeedMeters(feet ?? 10)
    return `O Golpe atinge a até ${dist}, não só o adjacente.`
  }

  m = key.match(/^thrown(?: (\d+)(?: feet| ft)?)?$/)
  if (m) {
    const feet = feetFrom(m[1])
    const range =
      feet != null
        ? ` Incremento de alcance ${formatSpeedMeters(feet)}.`
        : ''
    return `Pode arremessar esta arma como ataque à distância. Soma Força no dano.${range}`
  }

  m = key.match(/^range increment (\d+)(?: feet| ft)?$/)
  if (m) {
    const dist = formatSpeedMeters(Number(group(m, 1)))
    return `Incremento de alcance ${dist}. Cada incremento além do primeiro impõe –2 no ataque (máximo 6 incrementos).`
  }

  m = key.match(/^reload (\d+)$/)
  if (m) {
    const n = Number(group(m, 1))
    if (n === 0) {
      return 'Recarregar 0: sacar a munição faz parte do Golpe; não gasta ação extra para o próximo disparo.'
    }
    return `Recarregar ${n}: gasta ${n} ação${n === 1 ? '' : 'ões'} de Interagir para recarregar antes de atacar de novo.`
  }

  m = key.match(/^versatile ([bps])$/)
  if (m) {
    const type = VERSATILE_DAMAGE[group(m, 1)] ?? 'alternativo'
    return `Pode causar dano de ${type} em vez do tipo normal. Escolha ao fazer o ataque.`
  }

  m = key.match(/^two hand (?:d)?(\d+)$/)
  if (m) {
    return `Pode empunhar com as duas mãos para causar d${group(m, 1)} de dano.`
  }

  m = key.match(/^volley (\d+)(?: feet| ft)?$/)
  if (m) {
    return `–2 no ataque contra alvos a ${formatSpeedMeters(Number(group(m, 1)))} ou menos.`
  }

  m = key.match(/^jousting (d?\d+)$/)
  if (m) {
    const rawDie = group(m, 1)
    const die = rawDie.startsWith('d') ? rawDie : `d${rawDie}`
    return `Se você se moveu pelo menos 3 m no turno em que ataca (em geral montado), some ${die} no dano.`
  }

  m = key.match(/^scatter (\d+)(?: feet| ft)?$/)
  if (m) {
    return `Em acerto, criaturas a até ${formatSpeedMeters(Number(group(m, 1)))} do alvo também sofrem dano de respingo.`
  }

  return null
}

/** Texto de regra do traço, ou `null` se ainda não houver glossário. */
export function describeTrait(raw: string): string | null {
  const key = canon(raw)
  if (!key) return null
  return describePatternedTrait(key) ?? TRAIT_GLOSSARY_PT[key] ?? null
}

/** Nome original (inglês) para o subtítulo do tooltip, se for diferente do rótulo. */
export function traitOriginalLabel(raw: string): string | null {
  const label = localizeTraitLabel(raw)
  const pretty = raw.trim().replace(/-/g, ' ')
  if (pretty.toLowerCase() === label.toLowerCase()) return null
  return pretty
}
