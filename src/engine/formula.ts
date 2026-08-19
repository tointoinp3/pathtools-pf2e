/**
 * Avaliador seguro de fórmulas simples para Conexões.
 * Aceita: números, + - * / ( ), e variáveis (FOR, CON, NIVEL…).
 * Sem eval / Function.
 */

export type FormulaVars = Record<string, number>

const VAR_ALIASES: Record<string, string> = {
  FOR: 'strength',
  STR: 'strength',
  STRENGTH: 'strength',
  FORCA: 'strength',
  FORÇA: 'strength',
  DES: 'dexterity',
  DEX: 'dexterity',
  DESTREZA: 'dexterity',
  CON: 'constitution',
  CONSTITUTION: 'constitution',
  CONSTITUICAO: 'constitution',
  CONSTITUIÇÃO: 'constitution',
  INT: 'intelligence',
  INTELLIGENCE: 'intelligence',
  INTELIGENCIA: 'intelligence',
  INTELIGÊNCIA: 'intelligence',
  SAB: 'wisdom',
  WIS: 'wisdom',
  WISDOM: 'wisdom',
  SABEDORIA: 'wisdom',
  CAR: 'charisma',
  CHA: 'charisma',
  CHARISMA: 'charisma',
  CARISMA: 'charisma',
  NIVEL: 'level',
  NÍVEL: 'level',
  LEVEL: 'level',
  NV: 'level',
}

type Token =
  | { kind: 'num'; value: number }
  | { kind: 'var'; name: string }
  | { kind: 'op'; value: '+' | '-' | '*' | '/' }
  | { kind: 'paren'; value: '(' | ')' }

function tokenize(input: string): { ok: true; tokens: Token[] } | { ok: false; error: string } {
  const tokens: Token[] = []
  let i = 0
  const s = input.trim()
  if (!s) return { ok: false, error: 'Fórmula vazia.' }

  while (i < s.length) {
    const ch = s[i]!
    if (/\s/.test(ch)) {
      i++
      continue
    }
    if ('+-*/()'.includes(ch)) {
      tokens.push(
        ch === '(' || ch === ')'
          ? { kind: 'paren', value: ch }
          : { kind: 'op', value: ch as '+' | '-' | '*' | '/' },
      )
      i++
      continue
    }
    if (/[0-9.]/.test(ch)) {
      let j = i + 1
      while (j < s.length && /[0-9.]/.test(s[j]!)) j++
      const raw = s.slice(i, j)
      const value = Number(raw)
      if (!Number.isFinite(value)) {
        return { ok: false, error: `Número inválido: ${raw}` }
      }
      tokens.push({ kind: 'num', value })
      i = j
      continue
    }
    if (/[A-Za-zÀ-ÿ_]/.test(ch)) {
      let j = i + 1
      while (j < s.length && /[A-Za-zÀ-ÿ0-9_]/.test(s[j]!)) j++
      tokens.push({ kind: 'var', name: s.slice(i, j) })
      i = j
      continue
    }
    return { ok: false, error: `Caractere inválido: “${ch}”` }
  }
  return { ok: true, tokens }
}

class Parser {
  private i = 0
  private tokens: Token[]
  private vars: FormulaVars

  constructor(tokens: Token[], vars: FormulaVars) {
    this.tokens = tokens
    this.vars = vars
  }

  parse(): number {
    const value = this.parseExpr()
    if (this.i < this.tokens.length) {
      throw new Error('Fórmula incompleta ou sobrando tokens.')
    }
    return value
  }

  private peek(): Token | undefined {
    return this.tokens[this.i]
  }

  private next(): Token {
    const t = this.tokens[this.i++]
    if (!t) throw new Error('Fórmula incompleta.')
    return t
  }

  private parseExpr(): number {
    let left = this.parseTerm()
    while (true) {
      const t = this.peek()
      if (!t || t.kind !== 'op' || (t.value !== '+' && t.value !== '-')) break
      this.next()
      const right = this.parseTerm()
      left = t.value === '+' ? left + right : left - right
    }
    return left
  }

  private parseTerm(): number {
    let left = this.parseUnary()
    while (true) {
      const t = this.peek()
      if (!t || t.kind !== 'op' || (t.value !== '*' && t.value !== '/')) break
      this.next()
      const right = this.parseUnary()
      if (t.value === '/') {
        if (right === 0) throw new Error('Divisão por zero.')
        left = left / right
      } else {
        left = left * right
      }
    }
    return left
  }

  private parseUnary(): number {
    const t = this.peek()
    if (t?.kind === 'op' && (t.value === '+' || t.value === '-')) {
      this.next()
      const v = this.parseUnary()
      return t.value === '-' ? -v : v
    }
    return this.parsePrimary()
  }

  private parsePrimary(): number {
    const t = this.next()
    if (t.kind === 'num') return t.value
    if (t.kind === 'var') {
      const key = VAR_ALIASES[t.name.toUpperCase()] ?? t.name.toLowerCase()
      if (!(key in this.vars)) {
        throw new Error(
          `Variável desconhecida: ${t.name}. Use FOR, DES, CON, INT, SAB, CAR, NIVEL.`,
        )
      }
      return this.vars[key]!
    }
    if (t.kind === 'paren' && t.value === '(') {
      const v = this.parseExpr()
      const close = this.next()
      if (close.kind !== 'paren' || close.value !== ')') {
        throw new Error('Falta “)” na fórmula.')
      }
      return v
    }
    throw new Error('Expressão inválida.')
  }
}

export function evaluateFormula(
  formula: string,
  vars: FormulaVars,
): { ok: true; value: number } | { ok: false; error: string } {
  const tokenized = tokenize(formula)
  if (!tokenized.ok) return tokenized
  try {
    const value = new Parser(tokenized.tokens, vars).parse()
    if (!Number.isFinite(value)) {
      return { ok: false, error: 'Resultado inválido.' }
    }
    // Mantém inteiros limpos; senão 2 casas
    const rounded = Number.isInteger(value)
      ? value
      : Math.round(value * 100) / 100
    return { ok: true, value: rounded }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : 'Erro na fórmula.',
    }
  }
}

/** Variáveis padrão a partir de mods de atributo + nível */
export function buildFormulaVars(
  attrMods: Partial<Record<string, number>>,
  level: number,
): FormulaVars {
  return {
    strength: attrMods.strength ?? 0,
    dexterity: attrMods.dexterity ?? 0,
    constitution: attrMods.constitution ?? 0,
    intelligence: attrMods.intelligence ?? 0,
    wisdom: attrMods.wisdom ?? 0,
    charisma: attrMods.charisma ?? 0,
    level,
  }
}
