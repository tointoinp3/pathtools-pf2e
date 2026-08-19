import type { AttributeId, SkillId } from './core'
import { DAMAGE_TYPE_IDS, DAMAGE_TYPE_LABELS } from './equipment'

/** Alvo que uma conexão pode modificar */
export type ConnectionTarget =
  | `attribute.${AttributeId}`
  | `skill.${string}`
  | 'hp.max'
  | 'ac'
  | 'perception'
  | 'speed'
  | 'save.fortitude'
  | 'save.reflex'
  | 'save.will'
  | 'bulk.limit'
  /** Categorias de tamanho PF2e: +1 = uma categoria maior, −1 = menor */
  | 'size'
  | 'classDc'
  | 'spell.attack'
  | 'spell.dc'
  | 'focus.pool'
  | 'initiative'
  | 'save'
  | 'skill'
  | 'lore'
  | `lore.${string}`
  | 'attack'
  | 'attack.melee'
  | 'attack.ranged'
  | 'attack.unarmed'
  | 'damage'
  | 'damage.melee'
  | 'damage.ranged'
  | 'damage.unarmed'
  | 'speed.all'
  | 'speed.climb'
  | 'speed.swim'
  | 'speed.fly'
  | 'investment.limit'
  | 'familiar.abilities'
  | 'familiar.hp'
  | 'familiar.ac'
  | 'companion.hp'
  | 'companion.ac'
  | 'companion.attack'
  | 'companion.damage'
  | 'hp.temp'
  | 'dying.max'
  | 'spell.cantrips'
  | 'spell.slots'
  | 'shield.ac'
  | 'shield.hardness'
  | 'resistance'
  | 'resistance.physical'
  | `resistance.${string}`
  | 'weakness'
  | 'weakness.physical'
  | `weakness.${string}`
  | 'heroPoints.max'
  | 'heroPoints.start'
  | 'language.slots'
  | 'immunity'
  | 'immunity.physical'
  | `immunity.${string}`

export type ConnectionMode = 'flat' | 'formula'

export type ConnectionSourceKind =
  | 'feat'
  | 'item'
  | 'heritage'
  | 'class'
  | 'background'
  | 'ancestry'
  | 'manual'
  | 'other'

/**
 * Ligação manual entre uma fonte (feito, item, etc.) e um efeito numérico.
 * Serve para efeitos oficiais/homebrew que o motor ainda não calcula sozinho.
 */
export interface CharacterConnection {
  id: string
  /** Nome curto do efeito (ex.: “+3 PV do feito X”) */
  name: string
  /** Rótulo da fonte (ex.: nome do feito) */
  sourceLabel: string
  sourceKind: ConnectionSourceKind
  /** ID opcional da fonte (feito/item) quando existir */
  sourceId?: string
  target: ConnectionTarget
  mode: ConnectionMode
  /** Usado quando mode === 'flat' */
  flatValue?: number
  /**
   * Usado quando mode === 'formula'.
   * Exemplos: `CON * 2`, `NIVEL + 1`, `(FOR + DES) / 2`
   */
  formula?: string
  enabled: boolean
  notes?: string
}

export interface ResolvedConnection {
  id: string
  name: string
  sourceLabel: string
  sourceKind: ConnectionSourceKind
  target: ConnectionTarget
  mode: ConnectionMode
  enabled: boolean
  /** Valor já resolvido (ou null se erro/desligada) */
  resolvedValue: number | null
  error?: string
  notes?: string
}

const SKILL_CONNECTION_TARGETS: Array<{ id: SkillId; label: string }> = [
  { id: 'acrobatics', label: 'Acrobacia' },
  { id: 'arcana', label: 'Arcanismo' },
  { id: 'athletics', label: 'Atletismo' },
  { id: 'crafting', label: 'Ofício' },
  { id: 'deception', label: 'Enganação' },
  { id: 'diplomacy', label: 'Diplomacia' },
  { id: 'intimidation', label: 'Intimidação' },
  { id: 'medicine', label: 'Medicina' },
  { id: 'nature', label: 'Natureza' },
  { id: 'occultism', label: 'Ocultismo' },
  { id: 'performance', label: 'Performance' },
  { id: 'religion', label: 'Religião' },
  { id: 'society', label: 'Sociedade' },
  { id: 'stealth', label: 'Furtividade' },
  { id: 'survival', label: 'Sobrevivência' },
  { id: 'thievery', label: 'Prestidigitação' },
]

/** Condições e efeitos que não são tipo de dano no catálogo. */
export const EXTRA_IMMUNITY_KINDS: Array<{ id: string; label: string }> = [
  { id: 'precision', label: 'precisão' },
  { id: 'force', label: 'força' },
  { id: 'disease', label: 'doença' },
  { id: 'death', label: 'efeitos de morte' },
  { id: 'paralyzed', label: 'paralisia' },
  { id: 'sleep', label: 'sono' },
  { id: 'nonlethal', label: 'ataques não letais' },
  { id: 'criticalHits', label: 'acertos críticos' },
  { id: 'frightened', label: 'amedrontado' },
  { id: 'emotion', label: 'emoção' },
  { id: 'grabbed', label: 'agarrado' },
  { id: 'restrained', label: 'contido' },
  { id: 'drained', label: 'drenado' },
  { id: 'sickened', label: 'enjoado' },
  { id: 'inhaled', label: 'inalado' },
  { id: 'magic', label: 'magia' },
]

export const CONNECTION_TARGET_OPTIONS: Array<{
  value: ConnectionTarget
  label: string
  group: string
}> = [
  { value: 'hp.max', label: 'PV máximo', group: 'Combate' },
  { value: 'ac', label: 'CA', group: 'Combate' },
  { value: 'perception', label: 'Percepção', group: 'Combate' },
  { value: 'speed', label: 'Velocidade', group: 'Combate' },
  {
    value: 'size',
    label: 'Tamanho (+/− categorias)',
    group: 'Combate',
  },
  { value: 'save.fortitude', label: 'Fortitude', group: 'Combate' },
  { value: 'save.reflex', label: 'Reflexos', group: 'Combate' },
  { value: 'save.will', label: 'Vontade', group: 'Combate' },
  { value: 'classDc', label: 'CD de classe', group: 'Combate' },
  { value: 'initiative', label: 'Iniciativa', group: 'Combate' },
  { value: 'attack', label: 'Golpes (todos)', group: 'Ataque' },
  { value: 'attack.melee', label: 'Golpes corpo a corpo', group: 'Ataque' },
  { value: 'attack.ranged', label: 'Golpes à distância', group: 'Ataque' },
  { value: 'attack.unarmed', label: 'Golpes desarmados', group: 'Ataque' },
  { value: 'damage', label: 'Dano (todos os Golpes)', group: 'Ataque' },
  { value: 'damage.melee', label: 'Dano corpo a corpo', group: 'Ataque' },
  { value: 'damage.ranged', label: 'Dano à distância', group: 'Ataque' },
  { value: 'damage.unarmed', label: 'Dano desarmado', group: 'Ataque' },
  { value: 'spell.attack', label: 'Ataque de magia', group: 'Magia' },
  { value: 'spell.dc', label: 'CD de magia', group: 'Magia' },
  { value: 'focus.pool', label: 'Pontos de foco', group: 'Magia' },
  { value: 'save', label: 'Todas as salvaguardas', group: 'Combate' },
  { value: 'skill', label: 'Todas as perícias', group: 'Perícias' },
  { value: 'lore', label: 'Todos os Conhecimentos', group: 'Perícias' },
  { value: 'speed.all', label: 'Todas as velocidades', group: 'Combate' },
  { value: 'speed.climb', label: 'Velocidade de escalada', group: 'Combate' },
  { value: 'speed.swim', label: 'Velocidade de natação', group: 'Combate' },
  { value: 'speed.fly', label: 'Velocidade de voo', group: 'Combate' },
  { value: 'bulk.limit', label: 'Limite de carga (Bulk)', group: 'Equipamento' },
  {
    value: 'investment.limit',
    label: 'Limite de itens investidos',
    group: 'Equipamento',
  },
  {
    value: 'familiar.abilities',
    label: 'Habilidades de familiar',
    group: 'Companheiros',
  },
  { value: 'familiar.hp', label: 'PV do familiar', group: 'Companheiros' },
  { value: 'familiar.ac', label: 'CA do familiar', group: 'Companheiros' },
  {
    value: 'companion.hp',
    label: 'PV do companheiro',
    group: 'Companheiros',
  },
  {
    value: 'companion.ac',
    label: 'CA do companheiro',
    group: 'Companheiros',
  },
  {
    value: 'companion.attack',
    label: 'Golpes do companheiro',
    group: 'Companheiros',
  },
  {
    value: 'companion.damage',
    label: 'Dano do companheiro',
    group: 'Companheiros',
  },
  { value: 'hp.temp', label: 'PV temporários', group: 'Combate' },
  { value: 'dying.max', label: 'Morrendo (máximo)', group: 'Combate' },
  {
    value: 'heroPoints.max',
    label: 'Pontos de herói (máximo)',
    group: 'Combate',
  },
  {
    value: 'heroPoints.start',
    label: 'Pontos de herói (início de sessão)',
    group: 'Combate',
  },
  {
    value: 'language.slots',
    label: 'Idiomas adicionais (slots)',
    group: 'Perícias',
  },
  { value: 'spell.cantrips', label: 'Truques por dia', group: 'Magia' },
  {
    value: 'spell.slots',
    label: 'Espaço de magia (posto mais alto)',
    group: 'Magia',
  },
  { value: 'shield.ac', label: 'CA do escudo (erguido)', group: 'Combate' },
  { value: 'shield.hardness', label: 'Solidez do escudo', group: 'Combate' },
  {
    value: 'resistance',
    label: 'Resistência a todo dano',
    group: 'Resistências',
  },
  {
    value: 'resistance.physical',
    label: 'Resistência a físico',
    group: 'Resistências',
  },
  ...DAMAGE_TYPE_IDS.filter((id) => id !== 'untyped').map((id) => ({
    value: `resistance.${id}` as ConnectionTarget,
    label: `Resistência a ${DAMAGE_TYPE_LABELS[id]}`,
    group: 'Resistências',
  })),
  {
    value: 'weakness',
    label: 'Fraqueza a todo dano',
    group: 'Fraquezas',
  },
  {
    value: 'weakness.physical',
    label: 'Fraqueza a físico',
    group: 'Fraquezas',
  },
  ...DAMAGE_TYPE_IDS.filter((id) => id !== 'untyped').map((id) => ({
    value: `weakness.${id}` as ConnectionTarget,
    label: `Fraqueza a ${DAMAGE_TYPE_LABELS[id]}`,
    group: 'Fraquezas',
  })),
  {
    value: 'immunity',
    label: 'Imunidade a todo dano',
    group: 'Imunidades',
  },
  {
    value: 'immunity.physical',
    label: 'Imunidade a físico',
    group: 'Imunidades',
  },
  ...DAMAGE_TYPE_IDS.filter((id) => id !== 'untyped').map((id) => ({
    value: `immunity.${id}` as ConnectionTarget,
    label: `Imunidade a ${DAMAGE_TYPE_LABELS[id]}`,
    group: 'Imunidades',
  })),
  ...EXTRA_IMMUNITY_KINDS.map((kind) => ({
    value: `immunity.${kind.id}` as ConnectionTarget,
    label: `Imunidade a ${kind.label}`,
    group: 'Imunidades',
  })),
  {
    value: 'immunity.custom',
    label: 'Imunidade (texto livre)',
    group: 'Imunidades',
  },
  { value: 'attribute.strength', label: 'Força', group: 'Atributos' },
  { value: 'attribute.dexterity', label: 'Destreza', group: 'Atributos' },
  { value: 'attribute.constitution', label: 'Constituição', group: 'Atributos' },
  { value: 'attribute.intelligence', label: 'Inteligência', group: 'Atributos' },
  { value: 'attribute.wisdom', label: 'Sabedoria', group: 'Atributos' },
  { value: 'attribute.charisma', label: 'Carisma', group: 'Atributos' },
  ...SKILL_CONNECTION_TARGETS.map((skill) => ({
    value: `skill.${skill.id}` as ConnectionTarget,
    label: skill.label,
    group: 'Perícias',
  })),
]

export function connectionTargetLabel(target: ConnectionTarget): string {
  return (
    CONNECTION_TARGET_OPTIONS.find((opt) => opt.value === target)?.label ??
    target
  )
}

export function isImmunityTarget(target: string): boolean {
  return target === 'immunity' || target.startsWith('immunity.')
}

export function isResistanceTarget(target: string): boolean {
  return target === 'resistance' || target.startsWith('resistance.')
}

export function isWeaknessTarget(target: string): boolean {
  return target === 'weakness' || target.startsWith('weakness.')
}

export function isDefenseTarget(target: string): boolean {
  return (
    isImmunityTarget(target) ||
    isResistanceTarget(target) ||
    isWeaknessTarget(target)
  )
}

export function immunityKindFromTarget(target: string): string {
  if (target === 'immunity') return 'all'
  if (target.startsWith('immunity.')) return target.slice('immunity.'.length)
  return target
}

export function immunityDisplayLabel(
  kind: string,
  customName?: string,
): string {
  if (kind === 'custom' || kind.startsWith('custom:')) {
    const raw = customName?.trim()
    if (!raw) return 'Imunidade (texto livre)'
    if (/^imun/i.test(raw)) return raw
    return `Imunidade a ${raw}`
  }
  if (kind === 'all') return 'Imunidade a todo dano'
  if (kind === 'physical') return 'Imunidade a físico'
  const fromDamage =
    DAMAGE_TYPE_LABELS[kind as keyof typeof DAMAGE_TYPE_LABELS]
  const extra = EXTRA_IMMUNITY_KINDS.find((entry) => entry.id === kind)?.label
  return `Imunidade a ${fromDamage ?? extra ?? kind}`
}

export const CONNECTION_SOURCE_KIND_LABELS: Record<
  ConnectionSourceKind,
  string
> = {
  feat: 'Feito',
  item: 'Item',
  heritage: 'Herança',
  class: 'Classe',
  background: 'Origem',
  ancestry: 'Ancestralidade',
  manual: 'Manual',
  other: 'Outro',
}
