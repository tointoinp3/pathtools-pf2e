import { useState } from 'react'
import type { Creature } from '@/types/creature'
import { RichText } from '@/components/ui/RichText'

/**
 * Lore da criatura no topo da ficha: texto completo aberto por padrão,
 * com opção de minimizar para o resumo de uma frase.
 */
export function CreatureDescription({
  creature,
  compact = false,
}: {
  creature: Creature
  compact?: boolean
}) {
  const full = creature.description?.trim() ?? ''
  const summary = creature.summary?.trim() ?? ''
  const hasFull = full.length > 0
  const [expanded, setExpanded] = useState(hasFull)

  if (!hasFull && !summary) return null

  const showFull = hasFull && expanded
  const text = showFull ? full : summary || full

  return (
    <div className="space-y-1.5">
      {hasFull ? (
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
            Descrição
          </p>
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            className="print-hidden shrink-0 rounded-md px-2 py-0.5 text-[11px] text-text-dim transition-colors hover:bg-surface-3 hover:text-text"
            aria-expanded={expanded}
          >
            {expanded ? 'Minimizar' : 'Mostrar completa'}
          </button>
        </div>
      ) : null}
      <RichText
        as="p"
        className={`whitespace-pre-line leading-relaxed text-text-muted ${
          compact ? 'text-[12px] print:text-[11px] print:text-neutral-800' : 'text-sm'
        }`}
      >
        {text}
      </RichText>
    </div>
  )
}
