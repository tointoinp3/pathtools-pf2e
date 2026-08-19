import { useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { getCreatureById } from '@/engine/bestiaryCatalog'
import {
  applyCreatureVariant,
  creatureVariantQuery,
  parseCreatureVariant,
} from '@/engine/creatureVariant'
import { CreatureSessionSheetView } from '@/features/bestiary/components/CreatureSessionSheetView'
import { CreatureVariantToggle } from '@/features/bestiary/components/CreatureVariantToggle'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useDocumentTitle } from '@/utils/useDocumentTitle'
import type { CreaturePowerVariant } from '@/types/creature'

export function CreatureSessionSheetPage() {
  const { id } = useParams<{ id: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const loadEquipment = useEquipmentStore((s) => s.loadAll)
  const variant = parseCreatureVariant(searchParams.get('v'))
  const base = getCreatureById(id)
  const creature = base ? applyCreatureVariant(base, variant) : null

  useEffect(() => {
    void loadEquipment()
  }, [loadEquipment])

  useDocumentTitle(
    creature ? `Sessão · ${creature.name}` : 'Ficha de sessão',
  )

  function setVariant(next: CreaturePowerVariant) {
    const query = creatureVariantQuery(next)
    if (query) setSearchParams({ v: query }, { replace: true })
    else setSearchParams({}, { replace: true })
  }

  if (!creature || !base) {
    return (
      <div className="p-5 text-sm text-text-muted">
        Criatura não encontrada.{' '}
        <Link to="/bestiario" className="text-accent hover:underline">
          Voltar ao bestiário
        </Link>
      </div>
    )
  }

  const catalogHref = creatureVariantQuery(variant)
    ? `/bestiario/${base.id}?v=${creatureVariantQuery(variant)}`
    : `/bestiario/${base.id}`

  return (
    <div className="mx-auto max-w-6xl p-4 print:max-w-none print:p-0">
      <header className="print-hidden mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border bg-surface-1 px-1 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to={catalogHref}
            className="rounded-lg px-2 py-1 text-xs text-text-dim transition-colors hover:bg-surface-3 hover:text-text"
          >
            ← Bestiário
          </Link>
          <div className="h-4 w-px bg-border" />
          <div className="min-w-0">
            <h1 className="truncate font-display text-sm font-semibold tracking-wide text-accent">
              Ficha de sessão
            </h1>
            <p className="truncate text-[11px] text-text-dim">
              Mesa e PDF — Elite e Fraca no mesmo papel
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CreatureVariantToggle value={variant} onChange={setVariant} />
          <Link to={catalogHref}>
            <Button size="sm" variant="secondary">
              Abrir ficha
            </Button>
          </Link>
          <Button size="sm" variant="accent" onClick={() => window.print()}>
            Imprimir / PDF
          </Button>
        </div>
      </header>
      <CreatureSessionSheetView creature={creature} variant={variant} />
    </div>
  )
}
