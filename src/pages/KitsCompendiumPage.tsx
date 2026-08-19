import { useSearchParams } from 'react-router-dom'
import { KitBrowser } from '@/features/kits/components/KitBrowser'

export function KitsCompendiumPage() {
  const [searchParams] = useSearchParams()
  const classId = searchParams.get('classe')

  return (
    <div className="flex h-full min-h-0 flex-col p-5 animate-fade-up">
      <div className="mb-3">
        <h1 className="font-display text-2xl font-semibold tracking-wide text-accent">
          Compêndio — Kits
        </h1>
        <p className="mt-1 text-sm text-text-muted">
          Pacotes rápidos de classe (Player Core e Player Core 2) e o que vem
          dentro de cada kit de aventura. Fontes: Archives of Nethys, só
          Remaster — sem o Core Rulebook legado.
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <KitBrowser initialClassId={classId} />
      </div>
    </div>
  )
}
