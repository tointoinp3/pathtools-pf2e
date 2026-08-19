/**
 * Vite `base`: `/` no dev e no .exe futuro; `/pathtools-pf2e/` no GitHub Pages.
 * React Router e os hrefs internos usam caminhos sem esse prefixo.
 */

export function appBasePath(): string {
  const base = import.meta.env.BASE_URL || '/'
  if (base === '/') return ''
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export function routerBasename(): string | undefined {
  const base = appBasePath()
  return base.length > 0 ? base : undefined
}

export function stripAppBase(pathname: string): string {
  const base = appBasePath()
  if (!base) return pathname || '/'
  if (pathname === base) return '/'
  if (pathname.startsWith(`${base}/`)) return pathname.slice(base.length)
  return pathname
}

export function absoluteAppUrl(href: string): string {
  const path = href.startsWith('/') ? href : `/${href}`
  return `${window.location.origin}${appBasePath()}${path}`
}
