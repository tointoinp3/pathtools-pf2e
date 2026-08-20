import type { CreatureSize } from '@/types/ancestry'
import type {
  CombatSession,
  CombatToken,
  CombatTokenCharacterSummary,
  CombatTokenKind,
  TokenFacing,
} from '@/types/combat'
import type {
  ActiveCondition,
  ConditionId,
  ResolvedConditionEffects,
} from '@/types/condition'
import type { Creature, CreaturePowerVariant } from '@/types/creature'
import { CONDITION_DEFINITIONS } from '@/data/seeds/conditions'
import { conditionSlicesTotal, resolveConditionEffects } from './conditions'
import { createId } from '@/utils/id'

/** Combates antigos não têm `kind`: criatura quando há `creatureId`. */
export function tokenKind(
  token: Pick<CombatToken, 'kind' | 'creatureId'>,
): CombatTokenKind {
  if (token.kind) return token.kind
  return token.creatureId ? 'creature' : 'custom'
}

/** Baús ficam no mapa, mas não entram na ordem de turnos. */
export function actsInInitiative(
  token: Pick<CombatToken, 'kind' | 'creatureId'>,
): boolean {
  return tokenKind(token) !== 'loot'
}

// ---------------------------------------------------------------------------
// Condições: texto livre da ficha → efeitos calculados (Player Core)
// ---------------------------------------------------------------------------

function normalizeConditionName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

let conditionNameIndex: Map<string, ConditionId> | null = null

function conditionIdByName(name: string): ConditionId | null {
  if (!conditionNameIndex) {
    conditionNameIndex = new Map()
    for (const def of CONDITION_DEFINITIONS) {
      conditionNameIndex.set(normalizeConditionName(def.name), def.id)
      conditionNameIndex.set(normalizeConditionName(def.originalName), def.id)
    }
  }
  return conditionNameIndex.get(name) ?? null
}

/** "Amedrontado 2" → { label: "Amedrontado", value: 2 }. */
function splitConditionText(raw: string): { label: string; value?: number } {
  const match = raw.trim().match(/^(.*?)\s*(\d+)?$/)
  const label = (match?.[1] ?? raw).trim()
  const value = match?.[2] ? Number(match[2]) : undefined
  return { label, value }
}

/**
 * Converte as condições em texto da ficha para instâncias reconhecidas.
 * Texto que não bate com nenhuma condição oficial vai para `unknown`
 * (sem efeito automático, mas continua visível na ficha).
 */
export function parseTokenConditions(conditions: string[]): {
  instances: ActiveCondition[]
  unknown: string[]
} {
  const instances: ActiveCondition[] = []
  const unknown: string[] = []
  conditions.forEach((raw, index) => {
    const { label, value } = splitConditionText(raw)
    const id = conditionIdByName(normalizeConditionName(label))
    if (!id) {
      unknown.push(raw)
      return
    }
    instances.push({ id: `token-cond-${index}`, conditionId: id, value })
  })
  return { instances, unknown }
}

export interface TokenConditionInfo {
  effects: ResolvedConditionEffects
  unknown: string[]
  acPenalty: number
  effectiveAc: number | null
  /** Ações perdidas no início do turno (Lento/Atordoado). */
  actionLoss: number
  /** Ação extra do Acelerado. */
  extraActions: number
  /** Total de ações no turno (3 − perdas + extra). */
  maxActions: number
  hpMaxPenalty: number
  effectiveMaxHp: number
  initiativePenalty: number
  effectiveInitiativeBonus: number
  savePenalties: { fortitude: number; reflex: number; will: number }
  /** Resumo legível dos efeitos calculados. */
  lines: string[]
}

/** Efeitos automáticos das condições da ficha (quando reconhecidas). */
export function tokenConditionEffects(
  token: Pick<
    CombatToken,
    'conditions' | 'level' | 'ac' | 'maxHp' | 'initiativeBonus'
  >,
): TokenConditionInfo {
  const { instances, unknown } = parseTokenConditions(token.conditions)
  const effects = resolveConditionEffects(
    instances,
    Math.max(1, token.level ?? 1),
  )
  const acPenalty = conditionSlicesTotal(effects.ac)
  const actionLoss = Math.min(3, Math.max(effects.slowed, effects.stunned))
  const extraActions = effects.quickened ? 1 : 0
  const maxActions = Math.max(0, 3 - actionLoss + extraActions)
  const initiativePenalty = conditionSlicesTotal(effects.perception)
  const hpMaxPenalty = Math.min(
    effects.hpMaxPenalty,
    Math.max(0, token.maxHp - 1),
  )
  const savePenalties = {
    fortitude: conditionSlicesTotal(effects.fortitude),
    reflex: conditionSlicesTotal(effects.reflex),
    will: conditionSlicesTotal(effects.will),
  }

  const lines: string[] = []
  if (acPenalty > 0) {
    const parts = effects.ac
      .map((slice) => `−${slice.amount} ${slice.label}`)
      .join(', ')
    lines.push(
      token.ac != null
        ? `CA efetiva ${token.ac - acPenalty} (${parts})`
        : `CA ${parts}`,
    )
  }
  if (actionLoss > 0 || extraActions > 0) {
    lines.push(`Começa o turno com ${maxActions} de 3 ações`)
  }
  if (initiativePenalty > 0) {
    lines.push(`Percepção e iniciativa −${initiativePenalty}`)
  }
  const savePartsList = [
    savePenalties.fortitude > 0 ? `Fort −${savePenalties.fortitude}` : null,
    savePenalties.reflex > 0 ? `Ref −${savePenalties.reflex}` : null,
    savePenalties.will > 0 ? `Von −${savePenalties.will}` : null,
  ].filter(Boolean)
  if (savePartsList.length > 0) {
    lines.push(`Salvaguardas: ${savePartsList.join(' · ')}`)
  }
  lines.push(...effects.notes)

  return {
    effects,
    unknown,
    acPenalty,
    effectiveAc: token.ac != null ? token.ac - acPenalty : null,
    actionLoss,
    extraActions,
    maxActions,
    hpMaxPenalty,
    effectiveMaxHp: Math.max(1, token.maxHp - hpMaxPenalty),
    initiativePenalty,
    effectiveInitiativeBonus: token.initiativeBonus - initiativePenalty,
    savePenalties,
    lines,
  }
}

/** Regra do Amedrontado: cai 1 no fim do turno da própria ficha. */
export function decrementFrightened(conditions: string[]): string[] {
  const definition = CONDITION_DEFINITIONS.find(
    (def) => def.id === 'frightened',
  )
  if (!definition) return conditions
  let changed = false
  const next: string[] = []
  for (const raw of conditions) {
    const { label, value } = splitConditionText(raw)
    if (conditionIdByName(normalizeConditionName(label)) !== 'frightened') {
      next.push(raw)
      continue
    }
    changed = true
    const current = value ?? 1
    if (current > 1) next.push(`${definition.name} ${current - 1}`)
  }
  return changed ? next : conditions
}

/** Células ocupadas por tamanho (1 célula = 5 pés, GM Core). */
export function footprintForSize(size: CreatureSize): { w: number; h: number } {
  switch (size) {
    case 'large':
      return { w: 2, h: 2 }
    case 'huge':
      return { w: 3, h: 3 }
    case 'gargantuan':
      return { w: 4, h: 4 }
    default:
      return { w: 1, h: 1 }
  }
}

const FACING_ORDER: TokenFacing[] = ['up', 'right', 'down', 'left']

export function rotateFacing(facing: TokenFacing, steps = 1): TokenFacing {
  const index = FACING_ORDER.indexOf(facing)
  return FACING_ORDER[(((index + steps) % 4) + 4) % 4] ?? 'up'
}

export function oppositeFacing(facing: TokenFacing): TokenFacing {
  return rotateFacing(facing, 2)
}

export const FACING_LABELS: Record<TokenFacing, string> = {
  up: 'Norte (cima)',
  right: 'Leste (direita)',
  down: 'Sul (baixo)',
  left: 'Oeste (esquerda)',
}

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export function rectsOverlap(a: Rect, b: Rect): boolean {
  return (
    a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h
  )
}

/** Mantém a ficha dentro do tabuleiro, encolhendo se ela for maior que ele. */
export function clampRectToGrid(rect: Rect, cols: number, rows: number): Rect {
  const w = Math.max(1, Math.min(rect.w, cols))
  const h = Math.max(1, Math.min(rect.h, rows))
  const x = Math.max(0, Math.min(rect.x, cols - w))
  const y = Math.max(0, Math.min(rect.y, rows - h))
  return { x, y, w, h }
}

/**
 * Primeira célula livre onde um retângulo `w × h` cabe sem sobrepor
 * outras fichas. Se o tabuleiro estiver cheio, devolve o canto superior
 * esquerdo — sobrepor é melhor do que sumir com a ficha.
 */
export function findFreeSpot(
  tokens: Pick<CombatToken, 'x' | 'y' | 'w' | 'h'>[],
  cols: number,
  rows: number,
  w: number,
  h: number,
): { x: number; y: number } {
  const clamped = clampRectToGrid({ x: 0, y: 0, w, h }, cols, rows)
  for (let y = 0; y <= rows - clamped.h; y++) {
    for (let x = 0; x <= cols - clamped.w; x++) {
      const candidate = { x, y, w: clamped.w, h: clamped.h }
      if (!tokens.some((token) => rectsOverlap(candidate, token))) {
        return { x, y }
      }
    }
  }
  return { x: 0, y: 0 }
}

/**
 * Nome livre para a próxima ficha: "Zumbi", depois "Zumbi 2", "Zumbi 3"…
 * Também reconhece nomes já numerados ("Zumbi 2" vira "Zumbi 3").
 */
export function nextTokenName(baseName: string, existing: string[]): string {
  const base = baseName.replace(/\s+\d+$/, '').trim() || baseName
  const taken = new Set(existing)
  if (!taken.has(base)) return base
  for (let n = 2; ; n++) {
    const candidate = `${base} ${n}`
    if (!taken.has(candidate)) return candidate
  }
}

/** Ordem de iniciativa: maior primeiro; sem valor vai para o fim. */
export function initiativeOrder(tokens: CombatToken[]): CombatToken[] {
  return [...tokens].sort((a, b) => {
    if (a.initiative == null && b.initiative == null) {
      return a.name.localeCompare(b.name, 'pt-BR')
    }
    if (a.initiative == null) return 1
    if (b.initiative == null) return -1
    if (b.initiative !== a.initiative) return b.initiative - a.initiative
    if (b.initiativeBonus !== a.initiativeBonus) {
      return b.initiativeBonus - a.initiativeBonus
    }
    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

/**
 * Passa o turno para a próxima ficha viva na ordem de iniciativa.
 * Ao voltar para o topo, a rodada avança. A ficha que começa o turno
 * recupera ações e reação (Lento/Atordoado já descontam); a que termina
 * o turno reduz Amedrontado em 1 (regra do Player Core).
 */
export function advanceTurn(session: CombatSession): CombatSession {
  const order = initiativeOrder(session.tokens).filter(
    (token) => !token.defeated && actsInInitiative(token),
  )
  if (order.length === 0) return session

  const currentIndex = order.findIndex(
    (token) => token.id === session.turnTokenId,
  )
  const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % order.length
  const wrapped = currentIndex >= 0 && nextIndex === 0
  const next = order[nextIndex]
  if (!next) return session

  const previousId = session.turnTokenId

  return {
    ...session,
    round: wrapped ? session.round + 1 : Math.max(1, session.round),
    turnTokenId: next.id,
    tokens: session.tokens.map((token) => {
      let updated = token
      if (previousId && token.id === previousId) {
        const conditions = decrementFrightened(updated.conditions)
        if (conditions !== updated.conditions) {
          updated = { ...updated, conditions }
        }
      }
      if (token.id === next.id) {
        updated = {
          ...updated,
          actionsUsed: tokenConditionEffects(updated).actionLoss,
          reactionUsed: false,
        }
      }
      return updated
    }),
  }
}

/** Bônus de iniciativa já com as penalidades das condições. */
export function effectiveInitiativeBonus(token: CombatToken): number {
  return tokenConditionEffects(token).effectiveInitiativeBonus
}

/** Rola d20 + bônus efetivo para os combatentes (baús ficam de fora). */
export function rollAllInitiatives(
  session: CombatSession,
  options?: { onlyMissing?: boolean },
): CombatSession {
  const onlyMissing = options?.onlyMissing === true
  return {
    ...session,
    tokens: session.tokens.map((token) => {
      if (!actsInInitiative(token) || token.defeated) return token
      if (onlyMissing && token.initiative != null) return token
      return {
        ...token,
        initiative: rollInitiative(effectiveInitiativeBonus(token)),
      }
    }),
  }
}

/** Rola iniciativa de quem falta e já entra na ordem (primeiro turno). */
export function startCombat(session: CombatSession): CombatSession {
  return advanceTurn({
    ...rollAllInitiatives(session, { onlyMissing: true }),
    round: 1,
    turnTokenId: null,
  })
}

/** Para o combate: volta para antes da rodada 1, mantendo as iniciativas. */
export function stopCombat(session: CombatSession): CombatSession {
  return {
    ...session,
    round: 1,
    turnTokenId: null,
    tokens: session.tokens.map((token) => ({
      ...token,
      actionsUsed: 0,
      reactionUsed: false,
    })),
  }
}

/** Recomeça da rodada 1 com as mesmas iniciativas. */
export function restartCombat(session: CombatSession): CombatSession {
  return advanceTurn(stopCombat(session))
}

/** Dano consome PV temporários antes dos PV; 0 PV marca como derrotada. */
export function applyDamage(token: CombatToken, amount: number): CombatToken {
  if (amount <= 0) return token
  const absorbed = Math.min(token.tempHp, amount)
  const remaining = amount - absorbed
  const currentHp = Math.max(0, token.currentHp - remaining)
  return {
    ...token,
    tempHp: token.tempHp - absorbed,
    currentHp,
    defeated: currentHp === 0 ? true : token.defeated,
  }
}

/** Cura limitada ao PV máximo; sair de 0 remove o estado de derrotada. */
export function applyHealing(token: CombatToken, amount: number): CombatToken {
  if (amount <= 0) return token
  const currentHp = Math.min(token.maxHp, token.currentHp + amount)
  return {
    ...token,
    currentHp,
    defeated: token.currentHp === 0 && currentHp > 0 ? false : token.defeated,
  }
}

export type HpTone = 'ok' | 'hurt' | 'critical' | 'down'

export function hpTone(current: number, max: number): HpTone {
  if (current <= 0) return 'down'
  if (max <= 0) return 'ok'
  const fraction = current / max
  if (fraction > 0.5) return 'ok'
  if (fraction > 0.25) return 'hurt'
  return 'critical'
}

export function rollInitiative(bonus: number): number {
  return Math.floor(Math.random() * 20) + 1 + bonus
}

/**
 * Encerra o combate: volta à rodada 1, limpa turno e iniciativas e
 * devolve ações — pronto para rerrolar do zero.
 */
export function endCombatReset(session: CombatSession): CombatSession {
  return {
    ...session,
    round: 1,
    turnTokenId: null,
    tokens: session.tokens.map((token) => ({
      ...token,
      initiative: null,
      actionsUsed: 0,
      reactionUsed: false,
    })),
  }
}

/** Chave da célula pintada no mapa. */
export function paintKey(x: number, y: number): string {
  return `${x},${y}`
}

export function parsePaintKey(key: string): { x: number; y: number } | null {
  const [rawX, rawY] = key.split(',')
  const x = Number(rawX)
  const y = Number(rawY)
  if (!Number.isInteger(x) || !Number.isInteger(y)) return null
  return { x, y }
}

/** "rgba(212, 168, 75, 0.4)" → { hex: "#d4a84b", alpha: 0.4 } (conta-gotas). */
export function parseRgba(
  color: string,
): { hex: string; alpha: number } | null {
  const match = color
    .trim()
    .match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/i)
  if (!match) return null
  const r = Number(match[1])
  const g = Number(match[2])
  const b = Number(match[3])
  if ([r, g, b].some((v) => !Number.isFinite(v) || v > 255)) return null
  const alpha =
    match[4] != null ? Math.min(1, Math.max(0, Number(match[4]))) : 1
  const hex = `#${[r, g, b]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')}`
  return { hex, alpha }
}

/** "#d4a84b" + 0.4 → "rgba(212, 168, 75, 0.4)". */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const num = Number.parseInt(full, 16)
  const safeAlpha = Math.min(1, Math.max(0, alpha))
  if (full.length !== 6 || !Number.isFinite(num)) {
    return `rgba(212, 168, 75, ${safeAlpha})`
  }
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`
}

/**
 * Ficha de combate a partir de uma criatura do bestiário.
 * Passe a criatura já com Elite/Fraca aplicada (`applyCreatureVariant`).
 */
export function tokenFromCreature(
  creature: Creature,
  variant: CreaturePowerVariant,
  sourceCreatureId: string,
  position: { x: number; y: number },
  name: string,
): CombatToken {
  const footprint = footprintForSize(creature.size)
  return {
    id: createId('combat-token'),
    kind: 'creature',
    creatureId: sourceCreatureId,
    name,
    variant,
    level: creature.level,
    x: position.x,
    y: position.y,
    w: footprint.w,
    h: footprint.h,
    facing: 'down',
    maxHp: creature.hp,
    currentHp: creature.hp,
    tempHp: 0,
    ac: creature.ac,
    initiativeBonus: creature.perception,
    initiative: null,
    actionsUsed: 0,
    reactionUsed: false,
    conditions: [],
    notes: '',
    defeated: false,
  }
}

/** Ficha avulsa (aliado improvisado, marcador de cena). */
export function customToken(
  name: string,
  position: { x: number; y: number },
): CombatToken {
  return {
    id: createId('combat-token'),
    kind: 'custom',
    creatureId: null,
    name,
    variant: 'normal',
    level: null,
    x: position.x,
    y: position.y,
    w: 1,
    h: 1,
    facing: 'down',
    maxHp: 20,
    currentHp: 20,
    tempHp: 0,
    ac: null,
    initiativeBonus: 0,
    initiative: null,
    actionsUsed: 0,
    reactionUsed: false,
    conditions: [],
    notes: '',
    defeated: false,
  }
}

/** Baú/saque colocado no mapa: guarda itens, não entra na iniciativa. */
export function lootToken(
  name: string,
  position: { x: number; y: number },
): CombatToken {
  return {
    ...customToken(name, position),
    kind: 'loot',
    lootItems: [],
    maxHp: 0,
    currentHp: 0,
  }
}

export interface CharacterTokenInput {
  characterId: string
  name: string
  level: number | null
  maxHp: number | null
  currentHp: number | null
  ac: number | null
  perception: number | null
  summary: CombatTokenCharacterSummary | null
}

/** Ficha de jogador no grid, com os números congelados na importação. */
export function characterToken(
  input: CharacterTokenInput,
  position: { x: number; y: number },
): CombatToken {
  const maxHp = Math.max(1, input.maxHp ?? 20)
  const currentHp = Math.min(maxHp, Math.max(0, input.currentHp ?? maxHp))
  return {
    ...customToken(input.name, position),
    kind: 'character',
    characterId: input.characterId,
    characterSummary: input.summary,
    level: input.level,
    maxHp,
    currentHp,
    ac: input.ac,
    initiativeBonus: input.perception ?? 0,
    defeated: currentHp === 0,
  }
}

/** Cópia independente de uma ficha (Ctrl+C / Ctrl+V, duplicar). */
export function cloneToken(
  token: CombatToken,
  position: { x: number; y: number },
  name: string,
): CombatToken {
  return {
    ...token,
    conditions: [...token.conditions],
    lootItems: token.lootItems?.map((item) => ({ ...item })),
    id: createId('combat-token'),
    name,
    x: position.x,
    y: position.y,
  }
}
