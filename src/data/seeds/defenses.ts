import type { ConditionId } from '@/types'
import { DAMAGE_TYPE_IDS, DAMAGE_TYPE_LABELS } from '@/types'
import { EXTRA_IMMUNITY_KINDS } from '@/types/connections'
import {
  CONDITION_DEFINITIONS,
  getConditionDefinition,
} from '@/data/seeds/conditions'

export type DefenseKind = 'immunity' | 'resistance' | 'weakness'

export interface DefenseMechanic {
  kind: DefenseKind
  name: string
  originalName: string
  sourcePage: number
  summary: string
  description: string
}

export interface DefenseSubject {
  id: string
  name: string
  originalName?: string
  aliases: string[]
  /** Extra besides the mechanic. Empty = só a regra geral. */
  note?: string
  conditionId?: ConditionId
}

export interface DefenseCardModel {
  kind: DefenseKind
  title: string
  subtitle: string
  summary: string
  description: string
  sourcePage: number
  sourceLabel?: string
}

export const DEFENSE_KIND_LABELS: Record<DefenseKind, string> = {
  immunity: 'Imunidade',
  resistance: 'Resistência',
  weakness: 'Fraqueza',
}

export const DEFENSE_MECHANICS: Record<DefenseKind, DefenseMechanic> = {
  immunity: {
    kind: 'immunity',
    name: 'Imunidade',
    originalName: 'Immunity',
    sourcePage: 408,
    summary:
      'Ignora aquele dano, condição ou traço. Ainda pode ser alvo; o resto do efeito vale.',
    description:
      'Aplique imunidades primeiro, depois fraquezas, depois resistências (Player Core pg. 407–408).\n\nImunidade a um tipo de dano: você ignora todo aquele dano. Imunidade a uma condição ou tipo de efeito: você não é afetado por ela — ainda pode ser alvo, só não aplica aquela parte. Imunidade a um traço (morte, veneno, doença, fogo…) ignora efeitos com esse traço. Se o traço também for um tipo de dano (eletricidade, fogo), a imunidade cobre o dano e os efeitos.\n\nEfeitos mistos ainda podem acertar o que não está coberto: imune a efeitos de morte não ignora o dano de veneno nem Oculto de uma nuvem tóxica.\n\nAcertos críticos: em vez do dano dobrado, você toma o dano normal. Outros efeitos de crítico (especialização, mortal) em geral ainda valem.\n\nNão letais: imunidade a ataques não letais ignora todo o dano daquele ataque, qualquer que seja o tipo (típico de construtos). Dá para tirar o traço não letal do soco tomando a penalidade.\n\nImunidade temporária (ex.: a mesma magia por 1 minuto) impede novas aplicações daquele efeito; não encerra o que já está em você.',
  },
  resistance: {
    kind: 'resistance',
    name: 'Resistência',
    originalName: 'Resistance',
    sourcePage: 408,
    summary:
      'Cada vez que sofreria aquele dano, reduza pelo valor (mínimo 0). Várias ao mesmo tipo: use a maior.',
    description:
      'Aplique imunidades primeiro, depois fraquezas, depois resistências (Player Core pg. 407–408).\n\nCada vez que você sofreria aquele tipo de dano, reduza a quantia pelo valor da resistência, até no mínimo 0. Pode haver combinações (“contundente não mágico”) ou exceções (“físico, salvo prata”).\n\nO mesmo golpe pode sofrer fraqueza e resistência ao mesmo tempo (fraqueza a ferro frio e resistência a cortante, por exemplo). Um efeito pode disparar várias resistências, mas cada uma só uma vez. Se houver mais de uma resistência ao mesmo tipo, use só uma — em geral a maior.\n\nResistência a uma categoria (físico, magias, todo dano): se o golpe tiver vários tipos cobertos, você escolhe contra qual tipo aplicar. Resistência a todo dano vale em separado para cada tipo do golpe: 7 cortante + 4 fogo contra resistência 5 a todo dano vira 2 cortante e 0 fogo.',
  },
  weakness: {
    kind: 'weakness',
    name: 'Fraqueza',
    originalName: 'Weakness',
    sourcePage: 408,
    summary:
      'Aumente aquele dano pelo valor. Várias fraquezas no mesmo golpe podem somar; cada uma só uma vez.',
    description:
      'Aplique imunidades primeiro, depois fraquezas, depois resistências (Player Core pg. 407–408).\n\nSempre que você sofreria aquele tipo de dano, some o valor da fraqueza. Ex.: 2d6 de fogo com fraqueza 5 a fogo = 2d6+5 de fogo.\n\nUm golpe pode disparar várias fraquezas (ferro frio + fogo + cortante numa Machado flamejante), mas cada fraqueza só uma vez — fogo extra da magia não dobra a fraqueza a fogo.\n\nO MJ pode aplicar fraqueza mesmo sem dano listado (água, luz): você toma dano igual ao valor da fraqueza ao ser tocado ou afetado por aquilo.',
  },
}

const SUBJECTS: DefenseSubject[] = [
  {
    id: 'all',
    name: 'todo dano',
    originalName: 'all damage',
    aliases: ['all', 'todo dano', 'all damage', 'qualquer dano'],
    note: 'Vale em separado para cada tipo de dano do mesmo efeito. Num golpe misto, a resistência ou fraqueza a todo dano aplica-se a cada parcela.',
  },
  {
    id: 'physical',
    name: 'físico',
    originalName: 'physical',
    aliases: [
      'physical',
      'fisico',
      'físico',
      'dano fisico',
      'dano físico',
      'physical damage',
    ],
    note: 'Cobre contundente, perfurante e cortante. Se o golpe tiver mais de um desses, resistência a físico aplica-se a um tipo à sua escolha. Exceções (“salvo prata”, “salvo mágico”) vêm no efeito.',
  },
  {
    id: 'precision',
    name: 'precisão',
    originalName: 'precision',
    aliases: ['precision', 'precisao', 'precisão', 'dano de precisao', 'sneak'],
    note: 'Dano extra de precisão (ataque furtivo, certos feitos). Imunidade a precisão ignora só essa parcela, não o dano-base do golpe.',
  },
  {
    id: 'force',
    name: 'força',
    originalName: 'force',
    aliases: ['force', 'forca', 'força', 'dano de forca', 'dano de força'],
    note: 'Dano de força (muitas magias e criaturas incorpóreas). Imunidade cobre o dano e efeitos com o traço força.',
  },
  {
    id: 'disease',
    name: 'doença',
    originalName: 'disease',
    aliases: ['disease', 'doenca', 'doença', 'doencas', 'doenças'],
    note: 'Efeitos com o traço doença (aflições). Não impede dano que não tenha esse traço.',
  },
  {
    id: 'death',
    name: 'efeitos de morte',
    originalName: 'death effects',
    aliases: [
      'death',
      'death effects',
      'efeitos de morte',
      'efeito de morte',
      'morte',
    ],
    note: 'Efeitos com o traço morte. Partes do mesmo efeito sem esse traço ainda valem (dano de veneno, Oculto, etc.).',
  },
  {
    id: 'sleep',
    name: 'sono',
    originalName: 'sleep',
    aliases: ['sleep', 'sono', 'efeitos de sono'],
    note: 'Efeitos com o traço sono. Não é a mesma coisa que imunidade a inconsciente.',
  },
  {
    id: 'nonlethal',
    name: 'ataques não letais',
    originalName: 'nonlethal',
    aliases: [
      'nonlethal',
      'nao letais',
      'não letais',
      'ataques nao letais',
      'ataques não letais',
      'nao letal',
      'não letal',
    ],
    note: 'Você ignora todo o dano de ataques e efeitos com o traço não letal, qualquer que seja o tipo. Construtos típicos têm esta imunidade. Dá para Golpear sem o traço tomando a penalidade (Player Core, ataques não letais).',
  },
  {
    id: 'criticalHits',
    name: 'acertos críticos',
    originalName: 'critical hits',
    aliases: [
      'criticalhits',
      'critical hits',
      'acertos criticos',
      'acertos críticos',
      'acerto critico',
      'acerto crítico',
      'criticos',
      'críticos',
    ],
    note: 'Num Golpe crítico que causa dano, você toma o dano normal em vez do dobro. Outros efeitos de crítico (especialização da arma, traço mortal) em geral ainda acontecem.',
  },
  {
    id: 'emotion',
    name: 'emoção',
    originalName: 'emotion',
    aliases: ['emotion', 'emocao', 'emoção', 'efeitos de emocao', 'emotion effects'],
    note: 'Efeitos com o traço emoção (muitos medos e encantamentos).',
  },
  {
    id: 'inhaled',
    name: 'inalado',
    originalName: 'inhaled',
    aliases: ['inhaled', 'inalado', 'inalados'],
    note: 'Venenos e doenças com o traço inalado. Você não precisa prender a respiração contra esses.',
  },
  {
    id: 'magic',
    name: 'magia',
    originalName: 'magic',
    aliases: ['magic', 'magia', 'spells', 'magias'],
    note: 'Imunidade rara: em geral ignora magias e efeitos mágicos, salvo o que o MJ ou o texto disser. Resistência a magias reduz o dano de magias (você escolhe o tipo se houver vários).',
  },
  {
    id: 'healing',
    name: 'cura',
    originalName: 'healing',
    aliases: ['healing', 'cura', 'healing effects', 'efeitos de cura'],
    note: 'Efeitos com o traço cura (muitas magias de Vitalidade que restauram PV). Construtos e mortos-vivos costumam ser imunes: não recuperam PV por esses efeitos.',
  },
  {
    id: 'visual',
    name: 'visual',
    originalName: 'visual',
    aliases: ['visual', 'efeitos visuais', 'visual effects'],
    note: 'Efeitos com o traço visual (ilusões vistas, ofuscação, muitos feitiços que exigem ver).',
  },
  {
    id: 'holy',
    name: 'sagrado',
    originalName: 'holy',
    aliases: ['holy', 'sagrado', 'santificado', 'sanctified holy'],
    note: 'Efeitos e dano com o traço sagrado (santificação). Independente de vitalidade/vazio.',
  },
  {
    id: 'unholy',
    name: 'profano',
    originalName: 'unholy',
    aliases: ['unholy', 'profano', 'sanctified unholy'],
    note: 'Efeitos e dano com o traço profano (santificação). Independente de vitalidade/vazio.',
  },
  {
    id: 'swarmMind',
    name: 'mente de enxame',
    originalName: 'swarm mind',
    aliases: [
      'swarmmind',
      'swarm mind',
      'mente de enxame',
      'mente do enxame',
    ],
    note: 'O enxame ignora efeitos mentais que visam um número específico de criaturas. Ainda sofre efeitos mentais de área que afetam todas as criaturas no espaço.',
  },
  {
    id: 'curse',
    name: 'maldição',
    originalName: 'curse',
    aliases: ['curse', 'maldicao', 'maldição', 'curses'],
    note: 'Efeitos com o traço maldição.',
  },
  {
    id: 'scrying',
    name: 'adivinhação / scrying',
    originalName: 'scrying',
    aliases: ['scrying', 'adivinhacao', 'adivinhação'],
    note: 'Efeitos de adivinhação que espiam à distância (scrying).',
  },
  {
    id: 'detection',
    name: 'detecção',
    originalName: 'detection',
    aliases: ['detection', 'deteccao', 'detecção'],
    note: 'Efeitos de detecção (magias que revelam auras, alinhamento, etc.).',
  },
  {
    id: 'poison',
    name: 'veneno',
    originalName: 'poison',
    aliases: ['poison', 'veneno', 'venenos'],
    note: 'Dano de veneno e, na imunidade, também efeitos com o traço veneno (aflições). Resistência e fraqueza só mudam o dano.',
  },
  {
    id: 'bleed',
    name: 'sangramento',
    originalName: 'bleed',
    aliases: ['bleed', 'sangramento', 'sangue'],
    note: 'Dano de sangramento, em geral persistente. Construtos e mortos-vivos costumam ser imunes.',
  },
  {
    id: 'mental',
    name: 'mental',
    originalName: 'mental',
    aliases: ['mental', 'mentais', 'dano mental'],
    note: 'Dano mental e, na imunidade, efeitos com o traço mental.',
  },
  {
    id: 'spirit',
    name: 'espírito',
    originalName: 'spirit',
    aliases: ['spirit', 'espirito', 'espírito'],
    note: 'Dano de espírito (Remaster). Imunidade também cobre efeitos com o traço espírito.',
  },
  {
    id: 'vitality',
    name: 'vitalidade',
    originalName: 'vitality',
    aliases: ['vitality', 'vitalidade', 'positivo', 'positive'],
    note: 'Dano de vitalidade (energia da vida). Mortos-vivos costumam ter fraqueza; construtos, imunidade.',
  },
  {
    id: 'void',
    name: 'vazio',
    originalName: 'void',
    aliases: ['void', 'vazio', 'negativo', 'negative', 'negative energy'],
    note: 'Dano de vazio (energia da morte). Vivos costumam ser vulneráveis; mortos-vivos, imunes ou resistentes.',
  },
  {
    id: 'fire',
    name: 'fogo',
    originalName: 'fire',
    aliases: ['fire', 'fogo'],
    note: 'Dano de fogo (energia). Imunidade também ignora efeitos com o traço fogo; resistência e fraqueza só o dano.',
  },
  {
    id: 'cold',
    name: 'frio',
    originalName: 'cold',
    aliases: ['cold', 'frio'],
    note: 'Dano de frio (energia). Imunidade também ignora efeitos com o traço frio.',
  },
  {
    id: 'electricity',
    name: 'eletricidade',
    originalName: 'electricity',
    aliases: ['electricity', 'eletricidade', 'eletrico', 'elétrico', 'raio'],
    note: 'Dano de eletricidade. Imunidade cobre o dano e efeitos com o traço eletricidade.',
  },
  {
    id: 'acid',
    name: 'ácido',
    originalName: 'acid',
    aliases: ['acid', 'acido', 'ácido'],
    note: 'Dano de ácido. Imunidade cobre o dano e efeitos com o traço ácido.',
  },
  {
    id: 'sonic',
    name: 'sônico',
    originalName: 'sonic',
    aliases: ['sonic', 'sonico', 'sônico'],
    note: 'Dano sônico. Imunidade cobre o dano e efeitos com o traço sônico.',
  },
  {
    id: 'bludgeoning',
    name: 'contundente',
    originalName: 'bludgeoning',
    aliases: ['bludgeoning', 'contundente', 'impacto'],
    note: 'Dano físico de impacto (clavas, quedas). Parte da categoria físico.',
  },
  {
    id: 'piercing',
    name: 'perfurante',
    originalName: 'piercing',
    aliases: ['piercing', 'perfurante'],
    note: 'Dano físico perfurante (flechas, lanças). Parte da categoria físico.',
  },
  {
    id: 'slashing',
    name: 'cortante',
    originalName: 'slashing',
    aliases: ['slashing', 'cortante'],
    note: 'Dano físico cortante (espadas, machados). Parte da categoria físico.',
  },
]

function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function stripKindPrefix(raw: string): string {
  return raw
    .replace(/^(imunidade|imun\.?|immunity|resist[eê]ncia|res\.?|resistance|fraqueza|fraq\.?|weakness)\s+(a\s+|to\s+)?/i, '')
    .trim()
}

const BY_ID = new Map<string, DefenseSubject>()
const BY_ALIAS = new Map<string, string>()

function register(subject: DefenseSubject) {
  BY_ID.set(subject.id, subject)
  const keys = [subject.id, subject.name, subject.originalName, ...subject.aliases]
  for (const key of keys) {
    if (!key) continue
    const folded = fold(key)
    if (folded && !BY_ALIAS.has(folded)) BY_ALIAS.set(folded, subject.id)
  }
}

for (const subject of SUBJECTS) register(subject)

for (const id of DAMAGE_TYPE_IDS) {
  if (id === 'untyped') continue
  if (BY_ID.has(id)) continue
  const name = DAMAGE_TYPE_LABELS[id]
  register({
    id,
    name,
    originalName: id,
    aliases: [id, name],
  })
}

for (const def of CONDITION_DEFINITIONS) {
  if (BY_ID.has(def.id)) continue
  register({
    id: def.id,
    name: def.name,
    originalName: def.originalName,
    aliases: [def.id, def.name, def.originalName],
    conditionId: def.id,
    note: `Você não fica ${def.name.toLowerCase()}. O resto do efeito (dano, outras condições) ainda vale.`,
  })
}

for (const extra of EXTRA_IMMUNITY_KINDS) {
  const existing = BY_ID.get(extra.id)
  if (!existing) continue
  const folded = fold(extra.label)
  if (folded && !BY_ALIAS.has(folded)) BY_ALIAS.set(folded, extra.id)
}

export function getDefenseSubject(raw: string): DefenseSubject | undefined {
  const trimmed = raw.trim()
  if (!trimmed) return undefined
  if (trimmed.startsWith('custom:')) return undefined
  if (BY_ID.has(trimmed)) return BY_ID.get(trimmed)
  const stripped = stripKindPrefix(trimmed)
  for (const candidate of [trimmed, stripped]) {
    const id = BY_ALIAS.get(fold(candidate))
    if (id) return BY_ID.get(id)
  }
  return undefined
}

function kindPrefix(kind: DefenseKind): string {
  if (kind === 'immunity') return 'Imunidade a'
  if (kind === 'resistance') return 'Resistência a'
  return 'Fraqueza a'
}

function formatValue(kind: DefenseKind, value?: number): string {
  if (kind === 'immunity' || value == null) return ''
  return ` ${value}`
}

function subjectSummary(
  kind: DefenseKind,
  subject: DefenseSubject | undefined,
  label: string,
  value?: number,
): string {
  const shown = subject?.name ?? label
  const amount = value != null ? String(value) : 'o valor'
  if (kind === 'immunity') {
    if (subject?.conditionId) {
      return `Você não fica ${shown}. O resto do efeito ainda vale.`
    }
    if (subject?.id === 'criticalHits') {
      return 'Crítico causa dano normal, não o dobro. Outros efeitos de crítico em geral valem.'
    }
    if (subject?.id === 'nonlethal') {
      return 'Ignora todo o dano de ataques não letais, qualquer que seja o tipo.'
    }
    if (subject?.id === 'all') {
      return 'Você ignora todo dano.'
    }
    return `Você ignora dano, condição ou efeitos de ${shown}. Ainda pode ser alvo; o resto vale.`
  }
  if (kind === 'resistance') {
    return `Cada vez que sofreria dano de ${shown}, reduza esse dano em ${amount} (mínimo 0).`
  }
  return `Cada vez que sofreria dano de ${shown}, aumente esse dano em ${amount}.`
}

function conditionBlock(conditionId?: ConditionId): string {
  if (!conditionId) return ''
  const def = getConditionDefinition(conditionId)
  if (!def) return ''
  return `\n\n${def.name} (${def.originalName}): ${def.description}`
}

export function composeDefenseCard(input: {
  kind: DefenseKind
  type: string
  value?: number
  label?: string
  sourceLabel?: string
}): DefenseCardModel {
  const mechanic = DEFENSE_MECHANICS[input.kind]
  const custom =
    input.type === 'custom' || input.type.startsWith('custom:')
  const subject = custom ? undefined : getDefenseSubject(input.type)
  const typeName =
    input.label?.replace(/^(Imunidade|Resistência|Fraqueza) a\s+/i, '') ??
    subject?.name ??
    stripKindPrefix(input.type) ??
    input.type
  const title = custom
    ? (input.label ?? `Imunidade a ${typeName}`)
    : `${kindPrefix(input.kind)} ${typeName}${formatValue(input.kind, input.value)}`
  const subtitle = [
    mechanic.originalName,
    subject?.originalName && subject.originalName !== typeName
      ? subject.originalName
      : null,
    input.sourceLabel,
  ]
    .filter(Boolean)
    .join(' · ')

  const extra = [subject?.note, conditionBlock(subject?.conditionId)]
    .filter(Boolean)
    .join('')

  return {
    kind: input.kind,
    title,
    subtitle,
    summary: subjectSummary(input.kind, subject, typeName, input.value),
    description: extra
      ? `${mechanic.description}\n\n${extra.trim()}`
      : mechanic.description,
    sourcePage: mechanic.sourcePage,
    sourceLabel: input.sourceLabel,
  }
}

export function defenseKindFromTarget(
  target: string,
): DefenseKind | undefined {
  if (target === 'immunity' || target.startsWith('immunity.')) return 'immunity'
  if (target === 'resistance' || target.startsWith('resistance.')) {
    return 'resistance'
  }
  if (target === 'weakness' || target.startsWith('weakness.')) return 'weakness'
  return undefined
}

export function defenseTypeFromTarget(target: string): string {
  const dot = target.indexOf('.')
  if (dot < 0) return 'all'
  return target.slice(dot + 1)
}
