/** Nome visível na UI, título da aba e avisos. */
export const APP_NAME = 'Pathtools 2e'

/** Identificador em arquivos, package e User-Agent. */
export const APP_SLUG = 'pathtools-2e' as const

/** Instalador Windows na página de versões do GitHub. */
export const WINDOWS_RELEASES_URL =
  'https://github.com/tointoinp3/pathtools-pf2e/releases/latest'

export function isDesktopApp(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
}
