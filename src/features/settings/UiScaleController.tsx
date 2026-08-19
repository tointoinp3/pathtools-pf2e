import { useEffect, useRef, useState } from 'react'
import { useSettingsStore } from '@/stores/settingsStore'
import {
  UI_SCALE_DEFAULT,
  UI_SCALE_MAX,
  UI_SCALE_MIN,
  UI_SCALE_STEP,
  clampUiScale,
} from '@/types'

function applyScaleToDocument(scale: number) {
  const clamped = clampUiScale(scale)
  document.documentElement.style.setProperty(
    '--app-ui-scale',
    String(clamped),
  )
  document.documentElement.style.fontSize = `${16 * clamped}px`
  document.documentElement.dataset.uiScale = String(Math.round(clamped * 100))
}

/**
 * Aplica a escala tipográfica das configs e escuta Ctrl/⌘ + scroll
 * (quando habilitado) para ajustar ao vivo.
 */
export function UiScaleController() {
  const settings = useSettingsStore((s) => s.settings)
  const load = useSettingsStore((s) => s.load)
  const update = useSettingsStore((s) => s.update)
  const [hudScale, setHudScale] = useState<number | null>(null)
  const hideHudTimer = useRef<number | null>(null)
  const persistTimer = useRef<number | null>(null)
  const scaleRef = useRef(UI_SCALE_DEFAULT)

  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    const scale = settings?.uiScale ?? UI_SCALE_DEFAULT
    scaleRef.current = scale
    applyScaleToDocument(scale)
  }, [settings?.uiScale])

  useEffect(() => {
    const enabled = settings?.ctrlScrollZoomEnabled ?? true

    function showHud(next: number) {
      setHudScale(next)
      if (hideHudTimer.current != null) {
        window.clearTimeout(hideHudTimer.current)
      }
      hideHudTimer.current = window.setTimeout(() => {
        setHudScale(null)
        hideHudTimer.current = null
      }, 900)
    }

    function persist(next: number) {
      if (persistTimer.current != null) {
        window.clearTimeout(persistTimer.current)
      }
      persistTimer.current = window.setTimeout(() => {
        void update({ uiScale: next })
        persistTimer.current = null
      }, 280)
    }

    function onWheel(e: WheelEvent) {
      if (!enabled) return
      if (!e.ctrlKey && !e.metaKey) return
      e.preventDefault()

      const direction = e.deltaY > 0 ? -1 : 1
      const next = clampUiScale(scaleRef.current + direction * UI_SCALE_STEP)
      if (next === scaleRef.current) {
        showHud(next)
        return
      }
      scaleRef.current = next
      applyScaleToDocument(next)
      showHud(next)
      persist(next)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', onWheel)
      if (hideHudTimer.current != null) window.clearTimeout(hideHudTimer.current)
      if (persistTimer.current != null) window.clearTimeout(persistTimer.current)
    }
  }, [settings?.ctrlScrollZoomEnabled, update])

  if (hudScale == null) return null

  const pct = Math.round(hudScale * 100)
  const atMin = hudScale <= UI_SCALE_MIN + 0.001
  const atMax = hudScale >= UI_SCALE_MAX - 0.001

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 animate-fade-up rounded-full border border-border/80 bg-surface-1/95 px-4 py-2 text-sm font-semibold tabular-nums text-text shadow-[var(--shadow-panel)] backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      Texto {pct}%
      {atMin ? ' · mín.' : atMax ? ' · máx.' : ''}
    </div>
  )
}
