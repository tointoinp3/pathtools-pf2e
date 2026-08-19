import { create } from 'zustand'
import { db } from '@/db'
import {
  DEFAULT_DICE_TOAST_DURATION_SECONDS,
  DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS,
  DEFAULT_THEME,
  UI_SCALE_DEFAULT,
  clampSourceTooltipDelaySeconds,
  clampUiScale,
  isThemePreference,
  type AppSettings,
  type ThemePreference,
} from '@/types'
import { persistThemePreference, THEME_STORAGE_KEY } from '@/features/settings/theme'

function peekStoredTheme(): ThemePreference | null {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    return isThemePreference(raw) ? raw : null
  } catch {
    return null
  }
}

function normalizeSettings(settings: AppSettings): AppSettings {
  return {
    ...settings,
    theme: isThemePreference(settings.theme)
      ? settings.theme
      : DEFAULT_THEME,
    sourceTooltipDelaySeconds: clampSourceTooltipDelaySeconds(
      typeof settings.sourceTooltipDelaySeconds === 'number'
        ? settings.sourceTooltipDelaySeconds
        : DEFAULT_SOURCE_TOOLTIP_DELAY_SECONDS,
    ),
    diceToastDurationSeconds:
      typeof settings.diceToastDurationSeconds === 'number'
        ? Math.max(0, settings.diceToastDurationSeconds)
        : DEFAULT_DICE_TOAST_DURATION_SECONDS,
    uiScale: clampUiScale(
      typeof settings.uiScale === 'number'
        ? settings.uiScale
        : UI_SCALE_DEFAULT,
    ),
    ctrlScrollZoomEnabled:
      typeof settings.ctrlScrollZoomEnabled === 'boolean'
        ? settings.ctrlScrollZoomEnabled
        : true,
    freeArchetypeEnabled:
      typeof settings.freeArchetypeEnabled === 'boolean'
        ? settings.freeArchetypeEnabled
        : false,
    freeArchetypeIgnoreDedicationLock:
      typeof settings.freeArchetypeIgnoreDedicationLock === 'boolean'
        ? settings.freeArchetypeIgnoreDedicationLock
        : false,
    mythicRulesEnabled:
      typeof settings.mythicRulesEnabled === 'boolean'
        ? settings.mythicRulesEnabled
        : false,
    ancestryParagonEnabled:
      typeof settings.ancestryParagonEnabled === 'boolean'
        ? settings.ancestryParagonEnabled
        : false,
    dualClassEnabled:
      typeof settings.dualClassEnabled === 'boolean'
        ? settings.dualClassEnabled
        : false,
    gradualAbilityBoostsEnabled:
      typeof settings.gradualAbilityBoostsEnabled === 'boolean'
        ? settings.gradualAbilityBoostsEnabled
        : false,
    automaticBonusProgressionEnabled:
      typeof settings.automaticBonusProgressionEnabled === 'boolean'
        ? settings.automaticBonusProgressionEnabled
        : false,
    proficiencyWithoutLevelEnabled:
      typeof settings.proficiencyWithoutLevelEnabled === 'boolean'
        ? settings.proficiencyWithoutLevelEnabled
        : false,
  }
}

interface SettingsStoreState {
  settings: AppSettings | null
  load: () => Promise<void>
  update: (patch: Partial<AppSettings>) => Promise<void>
}

export const useSettingsStore = create<SettingsStoreState>((set, get) => ({
  settings: null,

  load: async () => {
    const raw = (await db.settings.get('app')) ?? null
    if (!raw) {
      set({ settings: null })
      return
    }
    const settings = normalizeSettings(raw)
    const next =
      peekStoredTheme() == null && raw.theme === 'dark'
        ? { ...settings, theme: DEFAULT_THEME }
        : settings
    const needsWrite =
      next.theme !== raw.theme ||
      settings.diceToastDurationSeconds !== raw.diceToastDurationSeconds ||
      settings.sourceTooltipDelaySeconds !== raw.sourceTooltipDelaySeconds ||
      settings.uiScale !== raw.uiScale ||
      settings.ctrlScrollZoomEnabled !== raw.ctrlScrollZoomEnabled ||
      settings.freeArchetypeEnabled !== raw.freeArchetypeEnabled ||
      settings.freeArchetypeIgnoreDedicationLock !==
        raw.freeArchetypeIgnoreDedicationLock ||
      settings.mythicRulesEnabled !== raw.mythicRulesEnabled ||
      settings.ancestryParagonEnabled !== raw.ancestryParagonEnabled ||
      settings.dualClassEnabled !== raw.dualClassEnabled ||
      settings.gradualAbilityBoostsEnabled !==
        raw.gradualAbilityBoostsEnabled ||
      settings.automaticBonusProgressionEnabled !==
        raw.automaticBonusProgressionEnabled ||
      settings.proficiencyWithoutLevelEnabled !==
        raw.proficiencyWithoutLevelEnabled ||
      raw.uiScale == null ||
      raw.sourceTooltipDelaySeconds == null ||
      raw.ctrlScrollZoomEnabled == null ||
      raw.freeArchetypeEnabled == null ||
      raw.freeArchetypeIgnoreDedicationLock == null ||
      raw.mythicRulesEnabled == null ||
      raw.ancestryParagonEnabled == null ||
      raw.dualClassEnabled == null ||
      raw.gradualAbilityBoostsEnabled == null ||
      raw.automaticBonusProgressionEnabled == null ||
      raw.proficiencyWithoutLevelEnabled == null
    if (needsWrite) {
      await db.settings.put(next)
    }
    persistThemePreference(next.theme)
    set({ settings: next })
  },

  update: async (patch) => {
    const current = get().settings
    if (!current) return
    const next = normalizeSettings({ ...current, ...patch })
    await db.settings.put(next)
    persistThemePreference(next.theme)
    set({ settings: next })
  },
}))
