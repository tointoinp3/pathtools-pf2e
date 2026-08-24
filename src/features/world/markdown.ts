/**
 * Markdown leve das notas do mundo, com [[links duplos]] estilo Obsidian.
 * Parser próprio (sem dependências), puro e testável em Node.
 *
 * Blocos: títulos, listas, tarefas, citações, código, régua.
 * Inline: negrito, itálico, riscado, código, links e wikilinks.
 */

import type { WorldNote } from '@/types/world'

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'bold'; text: string }
  | { type: 'italic'; text: string }
  | { type: 'strike'; text: string }
  | { type: 'code'; text: string }
  | { type: 'link'; text: string; href: string }
  | { type: 'wikilink'; target: string; alias: string | null }

export interface ListItem {
  inline: InlineToken[]
  /** `null` = item comum; boolean = tarefa (- [ ] / - [x]). */
  checked: boolean | null
}

export type MarkdownBlock =
  | { type: 'heading'; level: 1 | 2 | 3 | 4; inline: InlineToken[] }
  | { type: 'paragraph'; inline: InlineToken[] }
  | { type: 'list'; ordered: boolean; items: ListItem[] }
  | { type: 'quote'; lines: InlineToken[][] }
  | { type: 'code'; text: string }
  | { type: 'hr' }
  | { type: 'table'; headers: InlineToken[][]; rows: InlineToken[][][] }

const INLINE_PATTERN =
  /(`[^`\n]+`)|(\[\[[^[\]\n]+\]\])|(\[[^\]\n]+\]\([^)\s]+\))|(\*\*[^*\n]+\*\*)|(~~[^~\n]+~~)|(\*[^*\n]+\*)|(_[^_\n]+_)/

export function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = []
  let rest = text
  while (rest.length > 0) {
    const match = INLINE_PATTERN.exec(rest)
    if (!match || match.index === undefined) {
      tokens.push({ type: 'text', text: rest })
      break
    }
    if (match.index > 0) {
      tokens.push({ type: 'text', text: rest.slice(0, match.index) })
    }
    const raw = match[0]
    if (raw.startsWith('`')) {
      tokens.push({ type: 'code', text: raw.slice(1, -1) })
    } else if (raw.startsWith('[[')) {
      const inner = raw.slice(2, -2)
      const pipe = inner.indexOf('|')
      if (pipe >= 0) {
        tokens.push({
          type: 'wikilink',
          target: inner.slice(0, pipe).trim(),
          alias: inner.slice(pipe + 1).trim() || null,
        })
      } else {
        tokens.push({ type: 'wikilink', target: inner.trim(), alias: null })
      }
    } else if (raw.startsWith('[')) {
      const close = raw.indexOf('](')
      tokens.push({
        type: 'link',
        text: raw.slice(1, close),
        href: raw.slice(close + 2, -1),
      })
    } else if (raw.startsWith('**')) {
      tokens.push({ type: 'bold', text: raw.slice(2, -2) })
    } else if (raw.startsWith('~~')) {
      tokens.push({ type: 'strike', text: raw.slice(2, -2) })
    } else {
      tokens.push({ type: 'italic', text: raw.slice(1, -1) })
    }
    rest = rest.slice(match.index + raw.length)
  }
  return tokens
}

const HEADING_PATTERN = /^(#{1,4})\s+(.*)$/
const UNORDERED_PATTERN = /^[-*]\s+(.*)$/
const ORDERED_PATTERN = /^\d+[.)]\s+(.*)$/
const TASK_PATTERN = /^\[([ xX])\]\s+(.*)$/
const HR_PATTERN = /^(-{3,}|\*{3,}|_{3,})\s*$/
export function isMarkdownTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.includes('|', 1)
}

export function splitTableCells(line: string): string[] {
  let text = line.trim()
  if (text.startsWith('|')) text = text.slice(1)
  if (text.endsWith('|')) text = text.slice(0, -1)
  return text.split('|').map((cell) => cell.trim())
}

export function isMarkdownTableSep(line: string): boolean {
  const cells = splitTableCells(line)
  if (cells.length === 0) return false
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell))
}

/** Cola de planilha (tab) → tabela markdown. */
export function tsvToMarkdownTable(text: string): string | null {
  const lines = text.replace(/\r/g, '').split('\n').filter((line) => line.length > 0)
  if (lines.length === 0) return null
  const hasTab = lines.some((line) => line.includes('\t'))
  if (!hasTab) return null
  const rows = lines.map((line) => line.split('\t'))
  const width = Math.max(1, ...rows.map((row) => row.length))
  const pad = (row: string[]) =>
    Array.from({ length: width }, (_, i) => (row[i] ?? '').trim() || ' ')
  const format = (row: string[]) => `| ${row.join(' | ')} |`
  const header = pad(rows[0] ?? [])
  const sep = header.map(() => '---')
  const body = rows.slice(1).map(pad)
  return [format(header), format(sep), ...body.map(format)].join('\n')
}

export const SAMPLE_MARKDOWN_TABLE = `| Região | Capital | Tom |
| --- | --- | --- |
| Norte | Gelara | Frio |
| Sul | Porto Escuro | Úmido |`

export function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.replace(/\r\n?/g, '\n').split('\n')
  const blocks: MarkdownBlock[] = []
  let paragraph: string[] = []
  let quote: string[] = []
  let list: { ordered: boolean; items: ListItem[] } | null = null
  let table: string[] | null = null
  let code: string[] | null = null

  function flushParagraph() {
    if (paragraph.length === 0) return
    blocks.push({
      type: 'paragraph',
      inline: parseInline(paragraph.join(' ')),
    })
    paragraph = []
  }
  function flushQuote() {
    if (quote.length === 0) return
    blocks.push({ type: 'quote', lines: quote.map(parseInline) })
    quote = []
  }
  function flushList() {
    if (!list) return
    blocks.push({ type: 'list', ordered: list.ordered, items: list.items })
    list = null
  }
  function flushTable() {
    if (!table || table.length === 0) {
      table = null
      return
    }
    const data = table
      .filter((line) => !isMarkdownTableSep(line))
      .map((line) => splitTableCells(line).map(parseInline))
    table = null
    if (data.length === 0) return
    const headers = data[0] ?? []
    blocks.push({ type: 'table', headers, rows: data.slice(1) })
  }
  function flushAll() {
    flushParagraph()
    flushQuote()
    flushList()
    flushTable()
  }

  for (const rawLine of lines) {
    if (code !== null) {
      if (rawLine.trim().startsWith('```')) {
        blocks.push({ type: 'code', text: code.join('\n') })
        code = null
      } else {
        code.push(rawLine)
      }
      continue
    }
    const line = rawLine.trimEnd()
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      flushAll()
      code = []
      continue
    }
    if (trimmed.length === 0) {
      flushAll()
      continue
    }
    if (isMarkdownTableRow(trimmed) || (table && isMarkdownTableSep(trimmed))) {
      flushParagraph()
      flushQuote()
      flushList()
      if (!table) table = []
      table.push(trimmed)
      continue
    }
    if (table) flushTable()
    if (HR_PATTERN.test(trimmed)) {
      flushAll()
      blocks.push({ type: 'hr' })
      continue
    }
    const heading = HEADING_PATTERN.exec(trimmed)
    if (heading) {
      flushAll()
      blocks.push({
        type: 'heading',
        level: Math.min(4, heading[1]!.length) as 1 | 2 | 3 | 4,
        inline: parseInline(heading[2] ?? ''),
      })
      continue
    }
    if (trimmed.startsWith('>')) {
      flushParagraph()
      flushList()
      quote.push(trimmed.replace(/^>\s?/, ''))
      continue
    }
    const unordered = UNORDERED_PATTERN.exec(trimmed)
    const ordered = unordered ? null : ORDERED_PATTERN.exec(trimmed)
    if (unordered || ordered) {
      flushParagraph()
      flushQuote()
      const isOrdered = Boolean(ordered)
      if (!list || list.ordered !== isOrdered) {
        flushList()
        list = { ordered: isOrdered, items: [] }
      }
      const body = (unordered?.[1] ?? ordered?.[1] ?? '').trim()
      const task = unordered ? TASK_PATTERN.exec(body) : null
      if (task) {
        list.items.push({
          inline: parseInline(task[2] ?? ''),
          checked: task[1] !== ' ',
        })
      } else {
        list.items.push({ inline: parseInline(body), checked: null })
      }
      continue
    }
    flushQuote()
    flushList()
    paragraph.push(trimmed)
  }
  if (code !== null) blocks.push({ type: 'code', text: code.join('\n') })
  flushAll()
  return blocks
}

/** Alvos de todos os [[links]] do texto (sem repetir, na ordem). */
export function extractWikiLinks(content: string): string[] {
  const targets: string[] = []
  const seen = new Set<string>()
  const pattern = /\[\[([^[\]\n]+)\]\]/g
  let match = pattern.exec(content)
  while (match) {
    const inner = match[1] ?? ''
    const pipe = inner.indexOf('|')
    const target = (pipe >= 0 ? inner.slice(0, pipe) : inner).trim()
    const key = normalizeTitleKey(target)
    if (target && !seen.has(key)) {
      seen.add(key)
      targets.push(target)
    }
    match = pattern.exec(content)
  }
  return targets
}

/** Chave de comparação de títulos: sem acentos, minúscula, sem espaços extras. */
export function normalizeTitleKey(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** Resolve um alvo de [[link]] para a nota de mesmo título (sem acentos). */
export function findNoteByTitle(
  notes: readonly WorldNote[],
  target: string,
): WorldNote | null {
  const key = normalizeTitleKey(target)
  if (!key) return null
  return notes.find((note) => normalizeTitleKey(note.title) === key) ?? null
}

/** Notas que possuem um [[link]] apontando para `note` (backlinks). */
export function backlinksTo(
  notes: readonly WorldNote[],
  note: WorldNote,
): WorldNote[] {
  const key = normalizeTitleKey(note.title)
  if (!key) return []
  return notes.filter((candidate) => {
    if (candidate.id === note.id) return false
    return extractWikiLinks(candidate.content).some(
      (target) => normalizeTitleKey(target) === key,
    )
  })
}

/** Alterna a n-ésima tarefa (`- [ ]` ⇄ `- [x]`) do texto. */
export function toggleTaskAt(content: string, taskIndex: number): string {
  const pattern = /^([-*]\s+\[)([ xX])(\]\s)/gm
  let index = -1
  return content.replace(pattern, (full, before: string, state: string, after: string) => {
    index += 1
    if (index !== taskIndex) return full
    return `${before}${state === ' ' ? 'x' : ' '}${after}`
  })
}

/** Se o cursor está no meio de um `[[wikilink` ainda aberto, devolve a busca. */
export function wikiQueryAt(
  content: string,
  cursor: number,
): { start: number; query: string } | null {
  const before = content.slice(0, cursor)
  const open = before.lastIndexOf('[[')
  if (open < 0) return null
  const afterOpen = before.slice(open + 2)
  if (afterOpen.includes(']]') || afterOpen.includes('\n')) return null
  return { start: open, query: afterOpen }
}

export function insertWikiLink(
  content: string,
  start: number,
  cursor: number,
  title: string,
): { content: string; cursor: number } {
  const link = `[[${title}]]`
  const next = content.slice(0, start) + link + content.slice(cursor)
  return { content: next, cursor: start + link.length }
}

export interface SlashCommand {
  id: string
  label: string
  hint: string
  insert: string
  /** Offset do cursor dentro do insert. Padrão: no fim. */
  caret?: number
}

export const SLASH_COMMANDS: SlashCommand[] = [
  { id: 'h2', label: 'Título', hint: '##', insert: '## ', caret: 3 },
  { id: 'ul', label: 'Lista', hint: '-', insert: '- ' },
  { id: 'task', label: 'Tarefa', hint: '[ ]', insert: '- [ ] ' },
  {
    id: 'table',
    label: 'Tabela',
    hint: '|',
    insert: `${SAMPLE_MARKDOWN_TABLE}\n`,
  },
  { id: 'quote', label: 'Citação', hint: '>', insert: '> ' },
  { id: 'code', label: 'Código', hint: '```', insert: '```\n\n```', caret: 4 },
  { id: 'hr', label: 'Régua', hint: '---', insert: '---\n' },
  { id: 'wiki', label: 'Link de nota', hint: '[[', insert: '[[]]', caret: 2 },
]

/** `/comando` no começo da linha atual, ainda sem espaço final de “já escolhi”. */
export function slashQueryAt(
  content: string,
  cursor: number,
): { start: number; query: string } | null {
  const before = content.slice(0, cursor)
  const lineStart = before.lastIndexOf('\n') + 1
  const line = before.slice(lineStart)
  if (!line.startsWith('/')) return null
  const query = line.slice(1)
  if (query.includes(']') || query.startsWith('[')) return null
  return { start: lineStart, query }
}

export function filterSlashCommands(query: string): SlashCommand[] {
  const q = query.trim().toLowerCase()
  if (!q) return SLASH_COMMANDS
  return SLASH_COMMANDS.filter((command) => {
    const hay = `${command.id} ${command.label} ${command.hint}`.toLowerCase()
    return hay.includes(q)
  })
}

export function applySlashCommand(
  content: string,
  start: number,
  cursor: number,
  command: SlashCommand,
): { content: string; cursor: number } {
  const next = content.slice(0, start) + command.insert + content.slice(cursor)
  const caret = start + (command.caret ?? command.insert.length)
  return { content: next, cursor: caret }
}

export function wrapSelection(
  content: string,
  start: number,
  end: number,
  left: string,
  right: string = left,
): { content: string; cursor: number } {
  const from = Math.min(start, end)
  const to = Math.max(start, end)
  const selected = content.slice(from, to)
  if (
    selected.startsWith(left) &&
    selected.endsWith(right) &&
    selected.length >= left.length + right.length
  ) {
    const inner = selected.slice(left.length, selected.length - right.length)
    const next = content.slice(0, from) + inner + content.slice(to)
    return { content: next, cursor: from + inner.length }
  }
  const next = content.slice(0, from) + left + selected + right + content.slice(to)
  return { content: next, cursor: from + left.length + selected.length }
}

function lineBounds(content: string, cursor: number): { start: number; end: number } {
  const start = content.lastIndexOf('\n', cursor - 1) + 1
  const nl = content.indexOf('\n', cursor)
  return { start, end: nl < 0 ? content.length : nl }
}

/** Enter em lista/tarefa/citação continua o bloco; item vazio sai dele. */
export function continueMarkdownBlock(
  content: string,
  cursor: number,
): { content: string; cursor: number } | null {
  const { start, end } = lineBounds(content, cursor)
  const line = content.slice(start, end)
  const task = /^(\s*)[-*]\s+\[([ xX])\]\s*(.*)$/.exec(line)
  if (task) {
    const indent = task[1] ?? ''
    const body = (task[3] ?? '').trim()
    if (!body) {
      const next = content.slice(0, start) + content.slice(end)
      return { content: next, cursor: start }
    }
    const insert = `\n${indent}- [ ] `
    const next = content.slice(0, end) + insert + content.slice(end)
    return { content: next, cursor: end + insert.length }
  }
  const ul = /^(\s*)[-*]\s+(.*)$/.exec(line)
  if (ul) {
    const indent = ul[1] ?? ''
    const body = (ul[2] ?? '').trim()
    if (!body) {
      const next = content.slice(0, start) + content.slice(end)
      return { content: next, cursor: start }
    }
    const insert = `\n${indent}- `
    const next = content.slice(0, end) + insert + content.slice(end)
    return { content: next, cursor: end + insert.length }
  }
  const ol = /^(\s*)(\d+)([.)])\s+(.*)$/.exec(line)
  if (ol) {
    const indent = ol[1] ?? ''
    const n = Number(ol[2])
    const mark = ol[3] ?? '.'
    const body = (ol[4] ?? '').trim()
    if (!body) {
      const next = content.slice(0, start) + content.slice(end)
      return { content: next, cursor: start }
    }
    const insert = `\n${indent}${n + 1}${mark} `
    const next = content.slice(0, end) + insert + content.slice(end)
    return { content: next, cursor: end + insert.length }
  }
  const quote = /^(>\s?)(.*)$/.exec(line)
  if (quote) {
    const body = (quote[2] ?? '').trim()
    if (!body) {
      const next = content.slice(0, start) + content.slice(end)
      return { content: next, cursor: start }
    }
    const insert = `\n> `
    const next = content.slice(0, end) + insert + content.slice(end)
    return { content: next, cursor: end + insert.length }
  }
  return null
}

export function indentMarkdownLine(
  content: string,
  cursor: number,
  direction: 1 | -1,
): { content: string; cursor: number } | null {
  const { start } = lineBounds(content, cursor)
  if (direction === 1) {
    const next = `${content.slice(0, start)}  ${content.slice(start)}`
    return { content: next, cursor: cursor + 2 }
  }
  if (content.slice(start, start + 2) === '  ') {
    const next = content.slice(0, start) + content.slice(start + 2)
    return { content: next, cursor: Math.max(start, cursor - 2) }
  }
  if (content[start] === '\t') {
    const next = content.slice(0, start) + content.slice(start + 1)
    return { content: next, cursor: Math.max(start, cursor - 1) }
  }
  return null
}

export function extractHeadings(
  content: string,
): { level: number; text: string; offset: number }[] {
  const headings: { level: number; text: string; offset: number }[] = []
  const lines = content.split('\n')
  let offset = 0
  for (const line of lines) {
    const match = /^(#{1,4})\s+(.*)$/.exec(line)
    if (match) {
      headings.push({
        level: match[1]!.length,
        text: (match[2] ?? '').trim(),
        offset,
      })
    }
    offset += line.length + 1
  }
  return headings
}

export interface SourceTable {
  start: number
  end: number
  headers: string[]
  rows: string[][]
}

export function serializeMarkdownTable(
  headers: string[],
  rows: string[][],
): string {
  const width = Math.max(
    1,
    headers.length,
    ...rows.map((row) => row.length),
  )
  const pad = (cells: string[]) =>
    Array.from({ length: width }, (_, i) => {
      const raw = (cells[i] ?? '').replace(/\n/g, ' ').trim()
      return raw.length > 0 ? raw : ' '
    })
  const line = (cells: string[]) => `| ${pad(cells).join(' | ')} |`
  const sep = `| ${Array.from({ length: width }, () => '---').join(' | ')} |`
  return [line(headers), sep, ...rows.map(line)].join('\n')
}

export function findSourceTables(content: string): SourceTable[] {
  const text = content.replace(/\r\n?/g, '\n')
  const lines = text.split('\n')
  const lineStarts: number[] = []
  let pos = 0
  for (const line of lines) {
    lineStarts.push(pos)
    pos += line.length + 1
  }
  const tables: SourceTable[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i] ?? ''
    if (!isMarkdownTableRow(line)) {
      i += 1
      continue
    }
    const first = i
    const chunk: string[] = []
    while (i < lines.length) {
      const current = lines[i] ?? ''
      if (
        !isMarkdownTableRow(current) &&
        !(chunk.length > 0 && isMarkdownTableSep(current))
      ) {
        break
      }
      chunk.push(current)
      i += 1
    }
    const last = i - 1
    const data = chunk
      .filter((row) => !isMarkdownTableSep(row))
      .map(splitTableCells)
    if (data.length === 0) continue
    tables.push({
      start: lineStarts[first] ?? 0,
      end: (lineStarts[last] ?? 0) + (lines[last]?.length ?? 0),
      headers: data[0] ?? [],
      rows: data.slice(1),
    })
  }
  return tables
}

export function replaceSourceTable(
  content: string,
  table: SourceTable,
  headers: string[],
  rows: string[][],
): string {
  const body = serializeMarkdownTable(headers, rows)
  return content.slice(0, table.start) + body + content.slice(table.end)
}

export function setSourceTableCell(
  table: SourceTable,
  row: number,
  col: number,
  value: string,
): { headers: string[]; rows: string[][] } {
  if (row < 0) {
    const headers = [...table.headers]
    while (headers.length <= col) headers.push('')
    headers[col] = value
    const rows = table.rows.map((entry) => {
      const next = [...entry]
      while (next.length < headers.length) next.push('')
      return next
    })
    return { headers, rows }
  }
  const rows = table.rows.map((entry) => [...entry])
  while (rows.length <= row) {
    rows.push(Array.from({ length: Math.max(1, table.headers.length) }, () => ''))
  }
  const target = rows[row] ?? []
  while (target.length <= col) target.push('')
  target[col] = value
  rows[row] = target
  const headers = [...table.headers]
  while (headers.length <= col) headers.push('')
  return { headers, rows }
}

export function addSourceTableRow(table: SourceTable): {
  headers: string[]
  rows: string[][]
} {
  const width = Math.max(1, table.headers.length)
  return {
    headers: [...table.headers],
    rows: [...table.rows, Array.from({ length: width }, () => '')],
  }
}

export function addSourceTableColumn(table: SourceTable): {
  headers: string[]
  rows: string[][]
} {
  return {
    headers: [...table.headers, ''],
    rows: table.rows.map((row) => [...row, '']),
  }
}

export function removeSourceTableRow(
  table: SourceTable,
  row: number,
): { headers: string[]; rows: string[][] } | null {
  if (table.rows.length <= 1) return null
  return {
    headers: [...table.headers],
    rows: table.rows.filter((_, index) => index !== row),
  }
}

export function insertSourceTableColumnAt(
  table: SourceTable,
  afterCol: number,
): { headers: string[]; rows: string[][] } {
  const at = Math.max(0, afterCol + 1)
  const headers = [...table.headers]
  while (headers.length < at) headers.push('')
  headers.splice(at, 0, '')
  const rows = table.rows.map((row) => {
    const next = [...row]
    while (next.length < at) next.push('')
    next.splice(at, 0, '')
    return next
  })
  return { headers, rows }
}

export function insertSourceTableRowAt(
  table: SourceTable,
  afterRow: number,
): { headers: string[]; rows: string[][] } {
  const width = Math.max(1, table.headers.length)
  const at = Math.max(0, afterRow + 1)
  const rows = [...table.rows]
  rows.splice(at, 0, Array.from({ length: width }, () => ''))
  return { headers: [...table.headers], rows }
}

export function serializeInline(tokens: readonly InlineToken[]): string {
  return tokens
    .map((token) => {
      if (token.type === 'text') return token.text
      if (token.type === 'bold') return `**${token.text}**`
      if (token.type === 'italic') return `*${token.text}*`
      if (token.type === 'strike') return `~~${token.text}~~`
      if (token.type === 'code') return `\`${token.text}\``
      if (token.type === 'link') return `[${token.text}](${token.href})`
      if (token.alias) return `[[${token.target}|${token.alias}]]`
      return `[[${token.target}]]`
    })
    .join('')
}

export type LiveBlock =
  | { id: string; type: 'heading'; level: 1 | 2 | 3 | 4; text: string }
  | { id: string; type: 'paragraph'; text: string }
  | {
      id: string
      type: 'list'
      ordered: boolean
      items: { id: string; text: string; checked: boolean | null }[]
    }
  | { id: string; type: 'quote'; text: string }
  | { id: string; type: 'code'; text: string }
  | { id: string; type: 'hr' }
  | { id: string; type: 'table'; headers: string[]; rows: string[][] }

let liveSeq = 0
export function nextLiveId(prefix = 'blk'): string {
  liveSeq += 1
  return `${prefix}-${liveSeq}`
}

export function contentToLiveBlocks(content: string): LiveBlock[] {
  const tables = findSourceTables(content)
  let tableIndex = 0
  const blocks: LiveBlock[] = []
  for (const block of parseMarkdown(content)) {
    if (block.type === 'heading') {
      blocks.push({
        id: nextLiveId(),
        type: 'heading',
        level: block.level,
        text: serializeInline(block.inline),
      })
    } else if (block.type === 'paragraph') {
      blocks.push({
        id: nextLiveId(),
        type: 'paragraph',
        text: serializeInline(block.inline),
      })
    } else if (block.type === 'list') {
      blocks.push({
        id: nextLiveId(),
        type: 'list',
        ordered: block.ordered,
        items: block.items.map((item) => ({
          id: nextLiveId('li'),
          text: serializeInline(item.inline),
          checked: item.checked,
        })),
      })
    } else if (block.type === 'quote') {
      blocks.push({
        id: nextLiveId(),
        type: 'quote',
        text: block.lines.map(serializeInline).join('\n'),
      })
    } else if (block.type === 'code') {
      blocks.push({ id: nextLiveId(), type: 'code', text: block.text })
    } else if (block.type === 'hr') {
      blocks.push({ id: nextLiveId(), type: 'hr' })
    } else {
      const src = tables[tableIndex]
      tableIndex += 1
      blocks.push({
        id: nextLiveId(),
        type: 'table',
        headers: src?.headers.length ? [...src.headers] : [''],
        rows:
          src && src.rows.length > 0
            ? src.rows.map((row) => [...row])
            : [['']],
      })
    }
  }
  if (blocks.length === 0) {
    blocks.push({ id: nextLiveId(), type: 'paragraph', text: '' })
  }
  return blocks
}

export function liveBlocksToContent(blocks: readonly LiveBlock[]): string {
  const parts: string[] = []
  for (const block of blocks) {
    if (block.type === 'heading') {
      parts.push(`${'#'.repeat(block.level)} ${block.text}`.trimEnd())
    } else if (block.type === 'paragraph') {
      if (block.text.trim().length > 0) parts.push(block.text)
    } else if (block.type === 'list') {
      const lines = block.items.map((item, index) => {
        if (item.checked === null) {
          return block.ordered ? `${index + 1}. ${item.text}` : `- ${item.text}`
        }
        return `- [${item.checked ? 'x' : ' '}] ${item.text}`
      })
      parts.push(lines.join('\n'))
    } else if (block.type === 'quote') {
      const lines = (block.text.length > 0 ? block.text : '').split('\n')
      parts.push(lines.map((line) => `> ${line}`).join('\n'))
    } else if (block.type === 'code') {
      parts.push(`\`\`\`\n${block.text}\n\`\`\``)
    } else if (block.type === 'hr') {
      parts.push('---')
    } else {
      parts.push(
        serializeMarkdownTable(
          block.headers,
          block.rows.length > 0 ? block.rows : [['']],
        ),
      )
    }
  }
  return parts.join('\n\n')
}

export type ParagraphShortcut =
  | { type: 'heading'; level: 1 | 2 | 3 | 4; text: string }
  | { type: 'list'; ordered: boolean; checked: boolean | null; text: string }
  | { type: 'quote'; text: string }
  | { type: 'hr' }
  | { type: 'code' }

/** Atalhos de linha vazia / prefixo, iguais ao Obsidian. */
export function paragraphShortcut(text: string): ParagraphShortcut | null {
  const value = text.replace(/\u00a0/g, ' ')
  if (/^#{1,4}\s/.test(value)) {
    const match = /^(#{1,4})\s([\s\S]*)$/.exec(value)
    if (!match) return null
    return {
      type: 'heading',
      level: Math.min(4, match[1]!.length) as 1 | 2 | 3 | 4,
      text: match[2] ?? '',
    }
  }
  if (/^---\s*$/.test(value.trim())) return { type: 'hr' }
  if (/^```\s*$/.test(value.trim())) return { type: 'code' }
  if (/^>\s?/.test(value)) {
    return { type: 'quote', text: value.replace(/^>\s?/, '') }
  }
  if (/^[-*]\s\[x\]\s/i.test(value)) {
    return {
      type: 'list',
      ordered: false,
      checked: true,
      text: value.replace(/^[-*]\s\[x\]\s/i, ''),
    }
  }
  if (/^[-*]\s\[\s?\]\s/.test(value)) {
    return {
      type: 'list',
      ordered: false,
      checked: false,
      text: value.replace(/^[-*]\s\[\s?\]\s/, ''),
    }
  }
  if (/^[-*]\s/.test(value)) {
    return {
      type: 'list',
      ordered: false,
      checked: null,
      text: value.replace(/^[-*]\s/, ''),
    }
  }
  if (/^\d+[.)]\s/.test(value)) {
    return {
      type: 'list',
      ordered: true,
      checked: null,
      text: value.replace(/^\d+[.)]\s/, ''),
    }
  }
  return null
}

export function emptyTableBlock(): Extract<LiveBlock, { type: 'table' }> {
  return {
    id: nextLiveId(),
    type: 'table',
    headers: ['', ''],
    rows: [
      ['', ''],
      ['', ''],
    ],
  }
}
