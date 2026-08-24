import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  backlinksTo,
  extractWikiLinks,
  findNoteByTitle,
  normalizeTitleKey,
  parseInline,
  parseMarkdown,
  slashQueryAt,
  filterSlashCommands,
  applySlashCommand,
  wrapSelection,
  continueMarkdownBlock,
  indentMarkdownLine,
  extractHeadings,
  toggleTaskAt,
  tsvToMarkdownTable,
  wikiQueryAt,
  findSourceTables,
  addSourceTableRow,
  addSourceTableColumn,
  replaceSourceTable,
  setSourceTableCell,
  serializeInline,
  contentToLiveBlocks,
  liveBlocksToContent,
  paragraphShortcut,
  insertSourceTableColumnAt,
} from './markdown.ts'
import type { WorldNote } from '@/types/world'

function note(id: string, title: string, content = ''): WorldNote {
  return {
    id,
    title,
    folderId: null,
    content,
    pinned: false,
    attachments: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }
}

describe('parseInline', () => {
  test('negrito, itálico, riscado e código', () => {
    const tokens = parseInline('a **b** *c* ~~d~~ `e`')
    assert.deepEqual(
      tokens.map((token) => token.type),
      ['text', 'bold', 'text', 'italic', 'text', 'strike', 'text', 'code'],
    )
  })

  test('wikilink simples e com apelido', () => {
    const tokens = parseInline('vá até [[Porto Escuro]] falar com [[Mereth|a mercadora]]')
    const links = tokens.filter((token) => token.type === 'wikilink')
    assert.equal(links.length, 2)
    assert.deepEqual(links[0], {
      type: 'wikilink',
      target: 'Porto Escuro',
      alias: null,
    })
    assert.deepEqual(links[1], {
      type: 'wikilink',
      target: 'Mereth',
      alias: 'a mercadora',
    })
  })

  test('link markdown comum', () => {
    const tokens = parseInline('[AoN](https://2e.aonprd.com)')
    assert.deepEqual(tokens[0], {
      type: 'link',
      text: 'AoN',
      href: 'https://2e.aonprd.com',
    })
  })
})

describe('parseMarkdown', () => {
  test('títulos, parágrafos e régua', () => {
    const blocks = parseMarkdown('# Reino\n\nTexto.\n\n---\n\n## História')
    assert.deepEqual(
      blocks.map((block) => block.type),
      ['heading', 'paragraph', 'hr', 'heading'],
    )
    const first = blocks[0]
    assert.ok(first?.type === 'heading' && first.level === 1)
  })

  test('listas com tarefas', () => {
    const blocks = parseMarkdown('- [ ] visitar a capital\n- [x] falar com o rei\n- nota comum')
    const list = blocks[0]
    assert.ok(list?.type === 'list')
    assert.equal(list.items.length, 3)
    assert.equal(list.items[0]?.checked, false)
    assert.equal(list.items[1]?.checked, true)
    assert.equal(list.items[2]?.checked, null)
  })

  test('lista ordenada separada da não ordenada', () => {
    const blocks = parseMarkdown('1. primeiro\n2. segundo\n- solto')
    assert.equal(blocks.length, 2)
    assert.ok(blocks[0]?.type === 'list' && blocks[0].ordered)
    assert.ok(blocks[1]?.type === 'list' && !blocks[1].ordered)
  })

  test('citação e bloco de código', () => {
    const blocks = parseMarkdown('> lema da guilda\n\n```\nmapa secreto\n```')
    assert.equal(blocks[0]?.type, 'quote')
    const code = blocks[1]
    assert.ok(code?.type === 'code')
    assert.equal(code.text, 'mapa secreto')
  })

  test('linhas consecutivas viram um só parágrafo', () => {
    const blocks = parseMarkdown('linha um\nlinha dois')
    assert.equal(blocks.length, 1)
    assert.equal(blocks[0]?.type, 'paragraph')
  })

  test('tabela pipe vira block table', () => {
    const blocks = parseMarkdown(
      '| Região | Capital |\n| --- | --- |\n| Norte | Gelara |\n| Sul | [[Porto Escuro]] |',
    )
    assert.equal(blocks[0]?.type, 'table')
    if (blocks[0]?.type !== 'table') return
    assert.equal(blocks[0].headers.length, 2)
    assert.equal(blocks[0].rows.length, 2)
    const lastCell = blocks[0].rows[1]?.[1]?.[0]
    assert.equal(lastCell?.type, 'wikilink')
  })
})

describe('tsvToMarkdownTable', () => {
  test('converte colagem de planilha', () => {
    const md = tsvToMarkdownTable('A\tB\n1\t2')
    assert.equal(md, '| A | B |\n| --- | --- |\n| 1 | 2 |')
  })
})

describe('wikilinks', () => {
  test('extractWikiLinks sem repetidos, respeitando apelidos', () => {
    const targets = extractWikiLinks(
      'Veja [[Porto Escuro]] e [[porto escuro|a cidade]] perto de [[Floresta Umbral]].',
    )
    assert.deepEqual(targets, ['Porto Escuro', 'Floresta Umbral'])
  })

  test('normalizeTitleKey ignora acentos e espaços extras', () => {
    assert.equal(normalizeTitleKey('  Fortaleza   Ébano '), 'fortaleza ebano')
  })

  test('findNoteByTitle resolve sem diferenciar acento/caixa', () => {
    const notes = [note('n1', 'Fortaleza Ébano'), note('n2', 'Outra')]
    assert.equal(findNoteByTitle(notes, 'fortaleza ebano')?.id, 'n1')
    assert.equal(findNoteByTitle(notes, 'inexistente'), null)
  })

  test('backlinksTo encontra quem aponta para a nota', () => {
    const alvo = note('alvo', 'Covil do Necromante')
    const liga = note('liga', 'Floresta', 'perigo: [[covil do necromante|o covil]]')
    const nao = note('nao', 'Taverna', 'nada a ver')
    assert.deepEqual(
      backlinksTo([alvo, liga, nao], alvo).map((n) => n.id),
      ['liga'],
    )
  })
})

describe('toggleTaskAt', () => {
  test('alterna somente a tarefa pedida', () => {
    const content = '- [ ] a\ntexto\n- [x] b\n- [ ] c'
    const toggled = toggleTaskAt(content, 1)
    assert.equal(toggled, '- [ ] a\ntexto\n- [ ] b\n- [ ] c')
    const again = toggleTaskAt(toggled, 2)
    assert.equal(again, '- [ ] a\ntexto\n- [ ] b\n- [x] c')
  })
})

describe('wikiQueryAt', () => {
  test('detecta wikilink aberto no cursor', () => {
    const found = wikiQueryAt('veja [[Por', 10)
    assert.deepEqual(found, { start: 5, query: 'Por' })
  })

  test('ignora wikilink já fechado', () => {
    assert.equal(wikiQueryAt('veja [[Porto]] agora', 20), null)
  })
})

describe('atalhos de edição', () => {
  test('slashQueryAt lê /no começo da linha', () => {
    assert.deepEqual(slashQueryAt('/tab', 4), { start: 0, query: 'tab' })
    assert.equal(slashQueryAt('texto /nao', 10), null)
  })

  test('filterSlashCommands acha tabela', () => {
    const hits = filterSlashCommands('tab')
    assert.ok(hits.some((command) => command.id === 'table'))
  })

  test('applySlashCommand troca o /por o insert', () => {
    const next = applySlashCommand('/t', 0, 2, {
      id: 'ul',
      label: 'Lista',
      hint: '-',
      insert: '- ',
    })
    assert.equal(next.content, '- ')
    assert.equal(next.cursor, 2)
  })

  test('wrapSelection envolve e desembrulha', () => {
    const wrapped = wrapSelection('ab', 0, 2, '**')
    assert.equal(wrapped.content, '**ab**')
    const undone = wrapSelection(wrapped.content, 0, wrapped.content.length, '**')
    assert.equal(undone.content, 'ab')
  })

  test('continueMarkdownBlock segue tarefa e sai se vazia', () => {
    const cont = continueMarkdownBlock('- [ ] ir', 9)
    assert.ok(cont)
    assert.equal(cont.content, '- [ ] ir\n- [ ] ')
    const exit = continueMarkdownBlock('- [ ] ', 6)
    assert.ok(exit)
    assert.equal(exit.content, '')
  })

  test('indentMarkdownLine recua dois espaços', () => {
    const inned = indentMarkdownLine('- a', 3, 1)
    assert.equal(inned?.content, '  - a')
    const out = indentMarkdownLine(inned!.content, 5, -1)
    assert.equal(out?.content, '- a')
  })

  test('extractHeadings lista títulos', () => {
    const heads = extractHeadings('# Reino\ntexto\n## História')
    assert.equal(heads.length, 2)
    assert.equal(heads[0]?.level, 1)
    assert.equal(heads[1]?.text, 'História')
  })
})

describe('tabelas editáveis', () => {
  const src = 'Antes\n| A | B |\n| --- | --- |\n| 1 | 2 |\nDepois'

  test('findSourceTables lê cabeçalho e linhas', () => {
    const tables = findSourceTables(src)
    assert.equal(tables.length, 1)
    assert.deepEqual(tables[0]?.headers, ['A', 'B'])
    assert.deepEqual(tables[0]?.rows, [['1', '2']])
  })

  test('acrescentar linha e coluna cresce a tabela', () => {
    const table = findSourceTables(src)[0]!
    const withRow = addSourceTableRow(table)
    assert.equal(withRow.rows.length, 2)
    const withCol = addSourceTableColumn({ ...table, ...withRow })
    assert.equal(withCol.headers.length, 3)
    const next = replaceSourceTable(src, table, withCol.headers, withCol.rows)
    assert.match(next, /Antes/)
    assert.match(next, /Depois/)
    assert.equal(findSourceTables(next)[0]?.headers.length, 3)
  })

  test('setSourceTableCell edita cabeçalho e célula', () => {
    const table = findSourceTables(src)[0]!
    const header = setSourceTableCell(table, -1, 0, 'Nome')
    const cell = setSourceTableCell(
      { ...table, ...header },
      0,
      1,
      'dois',
    )
    const next = replaceSourceTable(src, table, cell.headers, cell.rows)
    const parsed = findSourceTables(next)[0]
    assert.equal(parsed?.headers[0], 'Nome')
    assert.equal(parsed?.rows[0]?.[1], 'dois')
  })

  test('insertSourceTableColumnAt entra à direita da coluna', () => {
    const table = findSourceTables(src)[0]!
    const next = insertSourceTableColumnAt(table, 0)
    assert.equal(next.headers[1], '')
    assert.equal(next.headers[0], 'A')
    assert.equal(next.headers[2], 'B')
  })
})

describe('editor visual (live blocks)', () => {
  test('serializeInline reconstitui markdown', () => {
    assert.equal(
      serializeInline(parseInline('vá a [[Porto|a cidade]] com **força**')),
      'vá a [[Porto|a cidade]] com **força**',
    )
  })

  test('ida e volta de nota com tabela, título e lista', () => {
    const src = `# Reino

- [ ] visitar
- [x] falar

| A | B |
| --- | --- |
| 1 | 2 |`
    const blocks = contentToLiveBlocks(src)
    assert.equal(blocks[0]?.type, 'heading')
    assert.equal(blocks[1]?.type, 'list')
    assert.equal(blocks[2]?.type, 'table')
    const back = liveBlocksToContent(blocks)
    const again = contentToLiveBlocks(back)
    assert.equal(again[0]?.type, 'heading')
    assert.equal(again[2]?.type, 'table')
    if (again[2]?.type === 'table') {
      assert.deepEqual(again[2].headers, ['A', 'B'])
      assert.deepEqual(again[2].rows, [['1', '2']])
    }
  })

  test('paragraphShortcut reconhece prefixos do Obsidian', () => {
    assert.deepEqual(paragraphShortcut('## Olá'), {
      type: 'heading',
      level: 2,
      text: 'Olá',
    })
    assert.equal(paragraphShortcut('- [ ] x')?.type, 'list')
    assert.equal(paragraphShortcut('---')?.type, 'hr')
  })
})
