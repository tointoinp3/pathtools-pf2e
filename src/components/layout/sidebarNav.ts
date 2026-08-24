/** Compara o destino da sidebar com a URL atual, incluindo busca. */

function normalizePath(path: string): string {
  if (!path || path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

const EXACT_PATHS = new Set([
  '/saques',
  '/personagens',
  '/bestiario',
  '/bestiario/encontros',
  '/combate',
  '/combate/token',
])

export function navItemIsActive(
  to: string,
  location: { pathname: string; search: string },
): boolean {
  const target = new URL(to, 'http://sidebar.local')
  const currentPath = normalizePath(location.pathname)
  const targetPath = normalizePath(target.pathname)
  const currentQuery = new URLSearchParams(location.search)
  const targetQuery = target.searchParams
  const inEditor =
    currentQuery.has('criar') || currentQuery.has('edit')

  if (targetQuery.has('criar')) {
    return (
      currentPath === targetPath &&
      (currentQuery.has('criar') || currentQuery.has('edit'))
    )
  }

  if (targetQuery.has('edit')) {
    if (currentPath !== targetPath) return false
    return currentQuery.get('edit') === targetQuery.get('edit')
  }

  if (currentPath === targetPath) {
    return !inEditor
  }

  if (targetPath === '/mundo') {
    return currentPath.startsWith('/mundo/notas')
  }
  if (targetPath === '/mundo/mapas') {
    return currentPath.startsWith('/mundo/mapas/')
  }

  if (EXACT_PATHS.has(targetPath)) return false
  return currentPath.startsWith(`${targetPath}/`)
}
