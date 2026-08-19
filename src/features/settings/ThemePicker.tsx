import { Button } from '@/components/ui/Button'
import { useThemePreference } from '@/features/settings/ThemeController'
import {
  THEME_PREFERENCE_LABELS,
  THEME_PREFERENCES,
  type ThemePreference,
} from '@/types'

const HINTS: Record<ThemePreference, string> = {
  system: 'Igual ao Windows / celular',
  dark: 'Mesa à noite',
  light: 'Papel / dia',
}

export function ThemePicker({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, ready } = useThemePreference()

  return (
    <div
      className={
        compact
          ? 'flex gap-1'
          : 'flex flex-wrap gap-1.5'
      }
      role="group"
      aria-label="Tema da interface"
    >
      {THEME_PREFERENCES.map((option) => (
        <Button
          key={option}
          size="sm"
          variant={theme === option ? 'accent' : 'secondary'}
          className={compact ? 'flex-1 !px-1.5' : ''}
          disabled={!ready && option !== theme}
          title={HINTS[option]}
          onClick={() => setTheme(option)}
        >
          {THEME_PREFERENCE_LABELS[option]}
        </Button>
      ))}
    </div>
  )
}
