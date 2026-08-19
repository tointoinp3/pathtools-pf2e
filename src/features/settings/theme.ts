import {
  DEFAULT_THEME,
  isThemePreference,
  type ThemePreference,
} from '@/types'

export const THEME_STORAGE_KEY = 'sp-theme-preference'

export type ResolvedTheme = 'dark' | 'light'

export function readStoredThemePreference(): ThemePreference {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (isThemePreference(raw)) return raw
  } catch {
    /* private mode / blocked storage */
  }
  return DEFAULT_THEME
}

export function persistThemePreference(theme: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

export function resolveTheme(theme: ThemePreference): ResolvedTheme {
  if (theme === 'light' || theme === 'dark') return theme
  if (typeof window === 'undefined') return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

const THEME_COLOR: Record<ResolvedTheme, string> = {
  dark: '#0a0c10',
  light: '#f3eee4',
}

/** Aplica o tema resolvido no <html> (cores, color-scheme, theme-color). */
export function applyResolvedTheme(resolved: ResolvedTheme): void {
  const root = document.documentElement
  root.dataset.theme = resolved
  root.style.colorScheme = resolved
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_COLOR[resolved])
}

export function applyThemePreference(theme: ThemePreference): ResolvedTheme {
  persistThemePreference(theme)
  const resolved = resolveTheme(theme)
  applyResolvedTheme(resolved)
  return resolved
}
