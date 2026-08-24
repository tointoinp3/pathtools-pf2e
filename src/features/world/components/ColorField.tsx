import { COUNTRY_COLOR_PRESETS } from '@/features/world/markerShapes'

const HEX6 = /^#([0-9a-fA-F]{6})$/

export function normalizeHex(value: string, fallback = '#c45c4a'): string {
  const trimmed = value.trim()
  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`
  return HEX6.test(withHash) ? withHash.toLowerCase() : fallback
}

const LAST_COUNTRY_COLOR_KEY = 'sp-world-country-color'

export function readLastCountryColor(): string {
  try {
    const stored = localStorage.getItem(LAST_COUNTRY_COLOR_KEY)
    if (stored && HEX6.test(stored)) return stored.toLowerCase()
  } catch {
    /* ignore */
  }
  return COUNTRY_COLOR_PRESETS[0] ?? '#c45c4a'
}

export function writeLastCountryColor(hex: string) {
  const next = normalizeHex(hex)
  try {
    localStorage.setItem(LAST_COUNTRY_COLOR_KEY, next)
  } catch {
    /* ignore */
  }
}

export function ColorField({
  value,
  onChange,
  presets,
  label = 'Cor',
}: {
  value: string
  onChange: (hex: string) => void
  presets?: readonly string[]
  label?: string
}) {
  const safe = normalizeHex(value)
  return (
    <label className="block text-xs text-text-dim">
      {label}
      <div className="mt-1 flex items-center gap-2">
        <input
          type="color"
          value={safe}
          aria-label={label}
          onChange={(event) => onChange(event.target.value)}
          className="h-8 w-14 cursor-pointer rounded border border-border bg-transparent p-0"
        />
        <input
          value={value}
          spellCheck={false}
          aria-label={`${label} em hexadecimal`}
          onChange={(event) => {
            const raw = event.target.value
            onChange(raw.startsWith('#') ? raw : `#${raw}`)
          }}
          className="field-control min-w-0 flex-1 rounded-lg border border-border bg-surface-2 px-2 py-1 font-mono text-xs"
        />
      </div>
      {presets && presets.length > 0 && (
        <div className="mt-1.5 flex flex-wrap gap-1">
          {presets.map((hex) => (
            <button
              key={hex}
              type="button"
              title={hex}
              className={`h-5 w-5 rounded-full border transition-transform hover:scale-110 ${
                normalizeHex(value) === hex ? 'border-white' : 'border-black/30'
              }`}
              style={{ background: hex }}
              onClick={() => onChange(hex)}
            />
          ))}
        </div>
      )}
    </label>
  )
}
