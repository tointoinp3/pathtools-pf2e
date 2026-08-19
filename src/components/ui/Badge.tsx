import type { ReactNode } from 'react'
import type { Rarity } from '@/types'
import { RARITY_LABELS } from '@/utils/labels'

const rarityColors: Record<Rarity, string> = {
  common: 'text-rarity-common border-rarity-common/40 bg-rarity-common/5',
  uncommon: 'text-rarity-uncommon border-rarity-uncommon/40 bg-rarity-uncommon/5',
  rare: 'text-rarity-rare border-rarity-rare/40 bg-rarity-rare/5',
  unique: 'text-rarity-unique border-rarity-unique/40 bg-rarity-unique/5',
}

export function RarityBadge({ rarity }: { rarity: Rarity }) {
  return (
    <span
      className={`inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${rarityColors[rarity]}`}
    >
      {RARITY_LABELS[rarity]}
    </span>
  )
}

export function ProvenanceBadge({ type }: { type: 'official' | 'homebrew' }) {
  return (
    <span
      className={`inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        type === 'official'
          ? 'border-info/40 bg-info/10 text-info'
          : 'border-accent/40 bg-accent/10 text-accent'
      }`}
    >
      {type === 'official' ? 'Oficial' : 'Homebrew'}
    </span>
  )
}

export function Badge({
  children,
  className = '',
  tone = 'neutral',
}: {
  children: ReactNode
  className?: string
  tone?: 'neutral' | 'accent' | 'success' | 'info'
}) {
  const tones = {
    neutral: 'border-border bg-surface-3 text-text-muted',
    accent: 'border-accent/35 bg-accent/10 text-accent',
    success: 'border-success/35 bg-success/10 text-success',
    info: 'border-info/35 bg-info/10 text-info',
  }

  return (
    <span
      className={`inline-flex rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-colors ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
