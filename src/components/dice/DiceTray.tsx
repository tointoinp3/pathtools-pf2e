import { useEffect, useState } from 'react'
import { useDiceStore, type DiceHistoryEntry } from '@/stores/diceStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { DEFAULT_DICE_TOAST_DURATION_SECONDS } from '@/types'
import { formatModifier } from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { DiceIcon } from './DiceButton'

const DICE_OPTIONS = [4, 6, 8, 10, 12, 20, 100] as const

function RollCard({ entry }: { entry: DiceHistoryEntry }) {
  if (entry.kind === 'check') {
    const tone = entry.isNat20
      ? 'border-crit/50 bg-crit/10'
      : entry.isNat1
        ? 'border-fumble/50 bg-fumble/10'
        : 'border-border bg-surface-2'

    return (
      <div className={`rounded-lg border px-3 py-2 ${tone}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-text">
              {entry.label}
            </div>
            <div className="mt-0.5 text-[11px] text-text-dim">
              {entry.formula}
              {entry.isNat20 && ' · Natural 20'}
              {entry.isNat1 && ' · Natural 1'}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-xl font-semibold tabular-nums text-accent">
              {formatModifier(entry.total)}
            </div>
            <div className="text-[11px] text-text-dim">
              [{entry.natural}] {formatModifier(entry.modifier)}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-surface-2 px-3 py-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-sm font-semibold">{entry.label}</div>
          <div className="mt-0.5 text-[11px] text-text-dim">
            {entry.rolls.join(' + ')}
            {entry.modifier !== 0 ? ` ${formatModifier(entry.modifier)}` : ''}
          </div>
        </div>
        <div className="font-display text-xl font-semibold tabular-nums text-accent">
          {entry.total}
        </div>
      </div>
    </div>
  )
}

export function DiceTray() {
  const {
    trayOpen,
    toggleTray,
    setTrayOpen,
    rollFree,
    history,
    clearHistory,
    lastRoll,
  } = useDiceStore()
  const [count, setCount] = useState(1)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setTrayOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setTrayOpen])

  return (
    <div className="print-hidden">
      <button
        type="button"
        onClick={toggleTray}
        className="interactive-lift fixed bottom-4 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-surface-2 text-accent shadow-[var(--shadow-panel)] hover:bg-accent/15"
        title="Abrir bandeja de dados"
        aria-label="Abrir bandeja de dados"
      >
        <DiceIcon className="h-5 w-5" />
      </button>

      {trayOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-[min(22rem,calc(100vw-2rem))] animate-fade-up overflow-hidden rounded-xl border border-border bg-surface-1 shadow-[var(--shadow-panel)]">
          <header className="flex items-center justify-between border-b border-border px-3 py-2">
            <div>
              <div className="font-display text-sm font-semibold tracking-wide text-accent">
                Dados
              </div>
              <div className="text-[11px] text-text-dim">
                Role livremente ou use o ícone ao lado das perícias
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={() => setTrayOpen(false)}>
              Fechar
            </Button>
          </header>

          <div className="space-y-3 p-3">
            <div className="flex items-center gap-2">
              <label className="text-xs text-text-muted">Qtd</label>
              <input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) =>
                  setCount(Math.min(20, Math.max(1, Number(e.target.value) || 1)))
                }
                className="w-14 rounded-md border border-border bg-surface-2 px-2 py-1 text-sm outline-none focus:border-accent/50"
              />
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {DICE_OPTIONS.map((sides) => (
                <button
                  key={sides}
                  type="button"
                  onClick={() => rollFree(sides, count)}
                  className="interactive-lift rounded-md border border-border bg-surface-2 px-2 py-2 text-sm font-semibold text-text hover:border-accent/50 hover:text-accent"
                >
                  d{sides}
                </button>
              ))}
            </div>

            {lastRoll && (
              <div className="animate-dice-pop">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Última rolagem
                </div>
                <RollCard entry={lastRoll} />
              </div>
            )}

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Histórico
                </div>
                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-[11px] text-text-dim hover:text-danger"
                  >
                    Limpar
                  </button>
                )}
              </div>
              {history.length === 0 ? (
                <p className="text-xs text-text-dim">
                  Nenhuma rolagem ainda. Clique no dado de uma perícia ou escolha um dado acima.
                </p>
              ) : (
                <ul className="max-h-48 space-y-1.5 overflow-y-auto pr-1">
                  {history.slice(0, 12).map((entry) => (
                    <li key={entry.id}>
                      <RollCard entry={entry} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function DiceToast() {
  const lastRoll = useDiceStore((s) => s.lastRoll)
  const dismissLast = useDiceStore((s) => s.dismissLast)
  const durationSeconds = useSettingsStore(
    (s) =>
      s.settings?.diceToastDurationSeconds ??
      DEFAULT_DICE_TOAST_DURATION_SECONDS,
  )

  useEffect(() => {
    if (!lastRoll) return
    // 0 = permanece até fechar no X
    if (durationSeconds <= 0) return
    const timer = setTimeout(() => {
      dismissLast()
    }, durationSeconds * 1000)
    return () => clearTimeout(timer)
  }, [lastRoll, durationSeconds, dismissLast])

  if (!lastRoll) return null

  const isCheck = lastRoll.kind === 'check'
  const big =
    isCheck
      ? formatModifier(lastRoll.total)
      : String(lastRoll.total)
  const tone =
    isCheck && lastRoll.isNat20
      ? 'border-crit/50'
      : isCheck && lastRoll.isNat1
        ? 'border-fumble/50 animate-shake-soft'
        : 'border-accent/40'

  return (
    <div className="print-hidden pointer-events-none fixed left-1/2 top-4 z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 animate-fade-up">
      <div
        className={`pointer-events-auto rounded-xl border ${tone} bg-surface-1/95 px-4 py-3 shadow-[var(--shadow-panel)] backdrop-blur-sm`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{lastRoll.label}</div>
            <div className="mt-0.5 text-xs text-text-muted">
              {isCheck
                ? `${lastRoll.formula} → d20 [${lastRoll.natural}]`
                : `${lastRoll.formula} → [${lastRoll.rolls.join(', ')}]`}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-display text-2xl font-bold tabular-nums text-accent animate-dice-pop">
              {big}
            </div>
            <button
              type="button"
              onClick={dismissLast}
              className="rounded-md px-1.5 py-0.5 text-xs text-text-dim hover:bg-surface-3 hover:text-text"
              title="Fechar resultado"
              aria-label="Fechar resultado"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
