import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import {
  buildFolderTree,
  canMoveFolder,
  descendantFolderIds,
  filterNotes,
  folderPath,
  uniqueFolderName,
  uniqueTitle,
} from './noteTree.ts'
import type { WorldFolder, WorldNote } from '@/types/world'

function folder(
  id: string,
  name: string,
  parentId: string | null = null,
): WorldFolder {
  return {
    id,
    name,
    parentId,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }
}

function note(
  id: string,
  title: string,
  folderId: string | null = null,
  content = '',
): WorldNote {
  return {
    id,
    title,
    folderId,
    content,
    pinned: false,
    attachments: [],
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  }
}

describe('árvore de pastas', () => {
  const folders = [
    folder('lugares', 'Lugares'),
    folder('cidades', 'Cidades', 'lugares'),
    folder('npcs', 'NPCs'),
  ]
  const notes = [
    note('porto', 'Porto Escuro', 'cidades'),
    note('rei', 'Rei Alden', 'npcs'),
    note('solta', 'Rumor da taverna'),
  ]

  test('buildFolderTree aninha pastas e notas', () => {
    const tree = buildFolderTree(folders, notes)
    assert.equal(tree.length, 2)
    assert.equal(tree[0]?.folder.id, 'lugares')
    assert.equal(tree[0]?.children[0]?.folder.id, 'cidades')
    assert.equal(tree[0]?.children[0]?.notes[0]?.id, 'porto')
    assert.equal(tree[1]?.folder.id, 'npcs')
  })

  test('folderPath devolve a cadeia até a raiz', () => {
    const path = folderPath(folders, 'cidades')
    assert.deepEqual(
      path.map((f) => f.id),
      ['lugares', 'cidades'],
    )
  })

  test('canMoveFolder impede ciclo', () => {
    assert.equal(canMoveFolder(folders, 'lugares', 'cidades'), false)
    assert.equal(canMoveFolder(folders, 'cidades', 'npcs'), true)
    assert.equal(canMoveFolder(folders, 'cidades', null), true)
  })

  test('descendantFolderIds inclui a própria pasta', () => {
    assert.deepEqual(descendantFolderIds(folders, 'lugares'), [
      'lugares',
      'cidades',
    ])
  })
})

describe('nomes únicos e busca', () => {
  test('uniqueTitle acrescenta número quando o título já existe', () => {
    const notes = [note('a', 'Nova nota'), note('b', 'Nova nota 2')]
    assert.equal(uniqueTitle(notes, 'Nova nota'), 'Nova nota 3')
    assert.equal(uniqueTitle(notes, 'Reino'), 'Reino')
  })

  test('uniqueFolderName só compete com irmãs', () => {
    const folders = [
      folder('a', 'Cidades'),
      folder('b', 'Cidades', 'a'),
    ]
    assert.equal(uniqueFolderName(folders, null, 'Cidades'), 'Cidades 2')
    assert.equal(uniqueFolderName(folders, 'a', 'Cidades'), 'Cidades 2')
    assert.equal(uniqueFolderName(folders, null, 'Rios'), 'Rios')
  })

  test('filterNotes busca título e conteúdo sem acento', () => {
    const notes = [
      note('a', 'Fortaleza Ébano', null, 'sede do império'),
      note('b', 'Taverna', null, 'nada'),
    ]
    assert.deepEqual(
      filterNotes(notes, 'fortaleza imperio').map((n) => n.id),
      ['a'],
    )
  })
})
