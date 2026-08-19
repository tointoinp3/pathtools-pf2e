import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { CharacterPortraitThumb } from '@/features/characters/components/CharacterPortraitThumb'
import { holderKey, type HolderRef } from '@/engine/partyTransfer'

export interface GiveTargetOption {
  ref: HolderRef
  name: string
  subtitle: string
  portraitId?: string | null
}

export function GiveTargetPicker({
  title,
  fromLabel,
  options,
  recentKey,
  busy,
  onPick,
  onClose,
}: {
  title: string
  fromLabel: string
  options: GiveTargetOption[]
  recentKey?: string | null
  busy?: boolean
  onPick: (to: HolderRef) => void
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && !busy) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [busy, onClose])

  const ordered = [...options].sort((a, b) => {
    if (!recentKey) return 0
    const ak = holderKey(a.ref) === recentKey ? 0 : 1
    const bk = holderKey(b.ref) === recentKey ? 0 : 1
    return ak - bk
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
      role="presentation"
      onClick={() => {
        if (!busy) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="give-target-title"
        className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="border-b border-border/70 px-4 py-3">
          <p className="text-[11px] text-text-dim">De {fromLabel}</p>
          <h2
            id="give-target-title"
            className="font-display text-lg font-semibold tracking-wide text-accent"
          >
            {title}
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Para quem vai?
          </p>
        </div>
        <ul className="max-h-[min(22rem,60vh)] overflow-y-auto p-2">
          {ordered.map((option) => {
            const key = holderKey(option.ref)
            const recent = recentKey === key
            return (
              <li key={key}>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onPick(option.ref)}
                  className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-surface-3 disabled:opacity-50"
                >
                  {option.ref.kind === 'character' ? (
                    option.portraitId ? (
                      <CharacterPortraitThumb
                        portraitId={option.portraitId}
                        name={option.name}
                        className="h-11 w-9"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-11 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 font-display text-sm text-accent/80"
                      >
                        {option.name.trim().slice(0, 1).toUpperCase() || '?'}
                      </span>
                    )
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-11 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 font-display text-lg text-accent/70"
                    >
                      ▣
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-text">
                      {option.name}
                    </span>
                    <span className="block truncate text-[11px] text-text-dim">
                      {option.ref.kind === 'stash' ? 'Baú · ' : ''}
                      {option.subtitle}
                    </span>
                  </span>
                  {recent ? (
                    <span className="shrink-0 rounded-md border border-accent/35 bg-accent/10 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                      recente
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="flex justify-end border-t border-border/70 px-3 py-2.5">
          <Button size="sm" disabled={busy} onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
