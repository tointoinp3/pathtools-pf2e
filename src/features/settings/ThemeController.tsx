import { useEffect } from 'react'
import { useSettingsStore } from '@/stores/settingsStore'
import {
  applyThemePreference,
  readStoredThemePreference,
} from '@/features/settings/theme'

/**
 * Mantém o tema da tela alinhado às configs e ao sistema operacional.
 * O script em index.html já pinta o primeiro frame (evita flash).
 */
export function ThemeController() {
  const settings = useSettingsStore((s) => s.settings)
  const load = useSettingsStore((s) => s.load)
  const preference = settings?.theme ?? readStoredThemePreference()

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    applyThemePreference(preference)
    if (preference !== 'system') return undefined

    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => applyThemePreference('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [preference])

  return null
}

export function useThemePreference() {
  const settings = useSettingsStore((s) => s.settings)
  const update = useSettingsStore((s) => s.update)
  const theme = settings?.theme ?? readStoredThemePreference()

  function setTheme(next: typeof theme) {
    applyThemePreference(next)
    void update({ theme: next })
  }

  return { theme, setTheme, ready: settings != null }
}
