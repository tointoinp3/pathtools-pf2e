/** Chave canônica: minúsculas, hífen vira espaço. */
export function canonTraitKey(raw: string): string {
  return raw
    .trim()
    .replace(/[_]+/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

export function stripTraitDiacritics(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '')
}

const PHRASE_ALIASES: Array<[string, string]> = [
  ['incremento de distancia', 'range increment'],
  ['incremento de alcance', 'range increment'],
  ['derrubar a distancia', 'ranged trip'],
  ['duas maos', 'two hand'],
  ['mao livre', 'free hand'],
  ['fusao critica', 'critical fusion'],
  ['mira fatal', 'fatal aim'],
  ['acoplado a escudo', 'attached to shield'],
  ['nao letal', 'nonlethal'],
  ['mal acabada', 'cobbled'],
]

/** Primeira palavra (PT, sem acento) → chave inglesa do glossário. */
const TOKEN_ALIASES: Record<string, string> = {
  mortal: 'deadly',
  agil: 'agile',
  acuidade: 'finesse',
  sutileza: 'finesse',
  varredura: 'sweep',
  alcance: 'reach',
  desarmar: 'disarm',
  desarme: 'disarm',
  derrubar: 'trip',
  empurrar: 'shove',
  agarrar: 'grapple',
  arremesso: 'thrown',
  propulsivo: 'propulsive',
  propulsao: 'propulsive',
  desarmado: 'unarmed',
  aparar: 'parry',
  gemeo: 'twin',
  punhalada: 'backstabber',
  apunhalador: 'backstabber',
  recuperacao: 'backswing',
  recarga: 'reload',
  recarregar: 'reload',
  sagrado: 'holy',
  profano: 'unholy',
  oculto: 'occult',
  arcano: 'arcane',
  divino: 'divine',
  primevo: 'primal',
  acido: 'acid',
  eletricidade: 'electricity',
  fogo: 'fire',
  frio: 'cold',
  veneno: 'poison',
  sonico: 'sonic',
  vitalidade: 'vitality',
  vazio: 'void',
  espirito: 'spirit',
  forca: 'force',
  sangramento: 'bleed',
  espalhamento: 'scatter',
  recuo: 'kickback',
  combinacao: 'combination',
  amarrado: 'tethered',
  arrasador: 'razing',
  ocultavel: 'concealable',
  capacidade: 'capacity',
  municao: 'ammunition',
  repetidor: 'repeating',
  vigoroso: 'forceful',
  impetuoso: 'forceful',
  rajada: 'volley',
  saraivada: 'volley',
  justa: 'jousting',
  magico: 'magical',
  incremento: 'range increment',
  respingo: 'splash',
  versatil: 'versatile',
  fatal: 'fatal',
}

/**
 * Normaliza o traço para a chave inglesa do glossário.
 * Aceita seeds em inglês (`deadly d10`) e em português (`mortal d10`, `alcance 3 m`).
 */
export function toEnglishTraitKey(raw: string): string {
  const folded = stripTraitDiacritics(canonTraitKey(raw))
  if (!folded) return ''

  for (const [pt, en] of PHRASE_ALIASES) {
    if (folded === pt || folded.startsWith(`${pt} `)) {
      return `${en}${folded.slice(pt.length)}`
    }
  }

  const space = folded.indexOf(' ')
  const first = space === -1 ? folded : folded.slice(0, space)
  const rest = space === -1 ? '' : folded.slice(space)
  const mapped = TOKEN_ALIASES[first]
  if (mapped) return `${mapped}${rest}`
  return folded
}

/** Distância já em metros no seed (`3 m`, `4,5 m`). */
export function formatListedMeters(raw: string): string {
  return `${raw.replace('.', ',')} m`
}
