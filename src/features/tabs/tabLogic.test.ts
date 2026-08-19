import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import {
  closeOtherTabs,
  closeTab,
  closeTabsToTheRight,
  closeUnpinnedTabs,
  duplicateTab,
  emptyTabSession,
  hrefWithQueryId,
  moveTab,
  normalizeHref,
  openNewTab,
  reopenClosedTab,
  syncFromLocation,
  tabOpenIntent,
  togglePinTab,
  type TabSession,
} from './tabLogic.ts'

function session(
  tabs: Array<{ id: string; href: string; title?: string; pinned?: boolean }>,
  activeId: string,
): TabSession {
  return {
    activeId,
    closed: [],
    tabs: tabs.map((tab) => ({
      id: tab.id,
      href: normalizeHref(tab.href),
      title: tab.title ?? tab.id,
      pinned: tab.pinned ?? false,
      reloadToken: 0,
    })),
  }
}

describe('tabLogic', () => {
  test('normaliza href sem barra final e com busca', () => {
    assert.equal(normalizeHref('/compendio/equipamento/?id=sword'), '/compendio/equipamento?id=sword')
    assert.equal(hrefWithQueryId('/compendio/arquetipos', 'bard'), '/compendio/arquetipos?id=bard')
    assert.equal(hrefWithQueryId('/compendio/arquetipos?id=old', null), '/compendio/arquetipos')
  })

  test('Ctrl/Cmd abre em segundo plano; Shift+Ctrl na frente; meio também', () => {
    assert.equal(tabOpenIntent({ button: 0, ctrlKey: true, metaKey: false, shiftKey: false }), 'background')
    assert.equal(tabOpenIntent({ button: 0, ctrlKey: true, metaKey: false, shiftKey: true }), 'foreground')
    assert.equal(tabOpenIntent({ button: 1, ctrlKey: false, metaKey: false, shiftKey: false }), 'background')
    assert.equal(tabOpenIntent({ button: 0, ctrlKey: false, metaKey: false, shiftKey: false }), 'current')
  })

  test('navegação atualiza a aba ativa; URL já aberta só foca', () => {
    const start = session(
      [
        { id: 'a', href: '/personagens', title: 'Personagens' },
        { id: 'b', href: '/compendio/equipamento?id=x', title: 'X' },
      ],
      'a',
    )
    const focused = syncFromLocation(start, '/compendio/equipamento?id=x', 'X')
    assert.equal(focused.activeId, 'b')
    assert.equal(focused.tabs.length, 2)

    const updated = syncFromLocation(start, '/saques', 'Saques')
    assert.equal(updated.activeId, 'a')
    assert.equal(updated.tabs[0]?.href, '/saques')
    assert.equal(updated.tabs[0]?.title, 'Saques')
  })

  test('aba fixada não troca de endereço: abre outra', () => {
    const start = session(
      [{ id: 'pin', href: '/compendio/equipamento?id=x', title: 'X', pinned: true }],
      'pin',
    )
    const next = syncFromLocation(start, '/compendio/arquetipos?id=z', 'Z')
    assert.equal(next.tabs.length, 2)
    assert.equal(next.tabs[0]?.href, '/compendio/equipamento?id=x')
    assert.equal(next.tabs[1]?.href, '/compendio/arquetipos?id=z')
    assert.equal(next.activeId, next.tabs[1]?.id)
  })

  test('duplicar, fechar, reabrir e fechar as outras', () => {
    let current = session(
      [
        { id: 'a', href: '/personagens' },
        { id: 'b', href: '/saques/1', title: 'Saque' },
      ],
      'b',
    )
    current = duplicateTab(current, 'b')
    assert.equal(current.tabs.length, 3)
    assert.equal(current.tabs[2]?.href, '/saques/1')
    assert.notEqual(current.activeId, 'b')

    const dupId = current.activeId
    current = closeTab(current, dupId, '/personagens', 'Personagens')
    assert.equal(current.tabs.length, 2)
    assert.equal(current.closed[0]?.href, '/saques/1')

    current = reopenClosedTab(current)
    assert.equal(current.tabs.length, 3)

    current = closeOtherTabs(current, current.activeId)
    assert.equal(current.tabs.length, 1)
  })

  test('fechar à direita, não fixadas e a última reabre o início', () => {
    let current = session(
      [
        { id: 'a', href: '/personagens', pinned: true },
        { id: 'b', href: '/saques' },
        { id: 'c', href: '/bestiario' },
      ],
      'a',
    )
    current = closeTabsToTheRight(current, 'a')
    assert.equal(current.tabs.map((tab) => tab.id).join(','), 'a')

    current = session(
      [
        { id: 'a', href: '/personagens', pinned: true },
        { id: 'b', href: '/saques' },
      ],
      'b',
    )
    current = closeUnpinnedTabs(current, '/personagens', 'Personagens')
    assert.equal(current.tabs.length, 1)
    assert.equal(current.tabs[0]?.id, 'a')

    current = closeTab(current, 'a', '/personagens', 'Personagens')
    assert.equal(current.tabs.length, 1)
    assert.equal(current.tabs[0]?.href, '/personagens')
    assert.notEqual(current.tabs[0]?.id, 'a')
  })

  test('fixar agrupa à esquerda; arrastar só entre o mesmo grupo', () => {
    let current = session(
      [
        { id: 'a', href: '/personagens' },
        { id: 'b', href: '/saques' },
        { id: 'c', href: '/bestiario' },
      ],
      'b',
    )
    current = togglePinTab(current, 'c')
    assert.equal(current.tabs[0]?.id, 'c')
    assert.equal(current.tabs[0]?.pinned, true)

    const skipped = moveTab(current, 'c', 'b')
    assert.equal(skipped, current)

    current = session(
      [
        { id: 'a', href: '/personagens' },
        { id: 'b', href: '/saques' },
        { id: 'c', href: '/bestiario' },
      ],
      'a',
    )
    current = moveTab(current, 'a', 'c')
    assert.equal(current.tabs.map((tab) => tab.id).join(','), 'b,a,c')
  })

  test('nova aba entra à direita da ativa', () => {
    const start = emptyTabSession('/personagens', 'Personagens')
    const next = openNewTab(start, '/saques', 'Saques')
    assert.equal(next.tabs.length, 2)
    assert.equal(next.tabs[1]?.href, '/saques')
    assert.equal(next.activeId, next.tabs[1]?.id)
  })
})
