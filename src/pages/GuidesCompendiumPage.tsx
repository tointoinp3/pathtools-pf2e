import { useState } from 'react'
import { catalogGuides } from '@/data/seeds/guides'
import { GuideBrowser } from '@/features/guides/components/GuideBrowser'

export function GuidesCompendiumPage() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`flex h-full min-h-0 flex-col animate-fade-up ${
        expanded ? 'p-3' : 'p-5'
      }`}
    >
      {!expanded && (
        <div className="mb-3 shrink-0">
          <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
            Compêndio — Guias
          </h1>
          <p className="mt-1 text-sm text-text-muted">
          {catalogGuides.length} guias Remaster para a mesa. Fonte: Player
          Core, GM Core e War of Immortals no Archives of Nethys.
          </p>
        </div>
      )}
      <div className="min-h-0 flex-1 overflow-hidden">
        <GuideBrowser expanded={expanded} onExpandedChange={setExpanded} />
      </div>
    </div>
  )
}
