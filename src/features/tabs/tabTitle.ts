import { getArchetype } from '@/engine/archetypes'
import { getItemDefinition } from '@/engine/equipmentCatalog'
import { getSpellById } from '@/engine/spellCatalog'
import { getCreatureById } from '@/engine/bestiaryCatalog'
import { catalogGuides } from '@/data/seeds/guides'
import { DEFAULT_HOME_HREF, normalizeHref } from '@/features/tabs/tabLogic'
import type { WorkspaceMode } from '@/stores/workspaceStore'

const EXACT_TITLES: Record<string, string> = {
  '/personagens': 'Personagens',
  '/personagens/novo': 'Novo personagem',
  '/compendio/ancestralidades': 'Ancestralidades',
  '/compendio/herancas-versateis': 'Heranças versáteis',
  '/compendio/classes': 'Classes',
  '/compendio/origens': 'Origens',
  '/compendio/feitos': 'Feitos',
  '/compendio/arquetipos': 'Arquétipos',
  '/compendio/companheiros': 'Companheiros',
  '/compendio/equipamento': 'Equipamento',
  '/compendio/kits': 'Kits',
  '/compendio/magias': 'Magias',
  '/compendio/rituais': 'Rituais',
  '/compendio/divindades': 'Divindades',
  '/compendio/guias': 'Guias',
  '/compendio/homebrew': 'Homebrew',
  '/configuracoes': 'Configurações',
  '/saques': 'Saques',
  '/saques/novo': 'Novo saque',
  '/saques/mesa': 'Inventário da mesa',
  '/bestiario': 'Bestiário',
  '/bestiario/encontros': 'Encontros',
  '/bestiario/encontros/novo': 'Novo encontro',
  '/em-breve/combate': 'Combate',
  '/em-breve/mundo': 'Mundo',
}

const QUERY_CATALOG_TITLES: Record<string, (id: string) => string | null> = {
  '/compendio/equipamento': (id) => getItemDefinition(id)?.name ?? null,
  '/compendio/arquetipos': (id) => getArchetype(id)?.name ?? null,
  '/compendio/magias': (id) => getSpellById(id)?.name ?? null,
  '/compendio/guias': (id) =>
    catalogGuides.find((guide) => guide.id === id)?.name ?? null,
}

export function homeHrefForMode(mode: WorkspaceMode): string {
  if (mode === 'loot') return '/saques'
  if (mode === 'bestiary') return '/bestiario'
  return DEFAULT_HOME_HREF
}

export function homeTitleForMode(mode: WorkspaceMode): string {
  if (mode === 'loot') return 'Saques'
  if (mode === 'bestiary') return 'Bestiário'
  return 'Personagens'
}

function parseHref(href: string): {
  pathname: string
  id: string | null
  criar: string | null
  edit: string | null
} {
  const normalized = normalizeHref(href)
  const url = new URL(normalized, 'http://app.local')
  return {
    pathname: url.pathname,
    id: url.searchParams.get('id'),
    criar: url.searchParams.get('criar'),
    edit: url.searchParams.get('edit'),
  }
}

function pathMatch(
  pathname: string,
  pattern: RegExp,
): string | null {
  const match = pathname.match(pattern)
  return match?.[1] ?? null
}

export function titleFromHref(href: string): string {
  const { pathname, id, criar, edit } = parseHref(href)

  if (pathname === '/bestiario' && criar) return 'Criar criatura'
  if (pathname === '/bestiario' && edit) {
    return getCreatureById(edit)?.name ?? 'Editar criatura'
  }

  if (id) {
    const lookup = QUERY_CATALOG_TITLES[pathname]
    const name = lookup?.(id)
    if (name) return name
  }

  const characterId = pathMatch(pathname, /^\/personagens\/([^/]+)$/)
  if (characterId) return 'Personagem'
  if (pathMatch(pathname, /^\/personagens\/([^/]+)\/sessao$/)) {
    return 'Ficha de sessão'
  }

  const lootId = pathMatch(pathname, /^\/saques\/([^/]+)$/)
  if (lootId && lootId !== 'novo' && lootId !== 'mesa') return 'Saque'

  if (pathname === '/bestiario/encontros/novo') return 'Novo encontro'
  const encounterId = pathMatch(pathname, /^\/bestiario\/encontros\/([^/]+)$/)
  if (encounterId) return 'Encontro'

  const creatureSession = pathMatch(pathname, /^\/bestiario\/([^/]+)\/sessao$/)
  if (creatureSession) return 'Ficha de sessão'
  const creatureId = pathMatch(pathname, /^\/bestiario\/([^/]+)$/)
  if (creatureId && creatureId !== 'encontros') return 'Criatura'

  if (id) {
    const section = EXACT_TITLES[pathname]
    if (section) return section
  }

  return EXACT_TITLES[pathname] ?? 'Aba'
}
