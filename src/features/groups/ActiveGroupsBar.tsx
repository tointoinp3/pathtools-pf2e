import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { useGroupStore } from '@/stores/groupStore'

export function ActiveGroupsBar({
  className = '',
}: {
  className?: string
}) {
  const groups = useGroupStore((s) => s.groups)
  const activeGroupIds = useGroupStore((s) => s.activeGroupIds)
  const loading = useGroupStore((s) => s.loading)
  const loadAll = useGroupStore((s) => s.loadAll)
  const toggleActive = useGroupStore((s) => s.toggleActive)
  const clearActive = useGroupStore((s) => s.clearActive)

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  if (loading && groups.length === 0) return null
  if (groups.length === 0) return null

  const filtering = activeGroupIds.length > 0

  return (
    <div
      className={`rounded-xl border border-border bg-surface-1 px-3 py-2.5 ${className}`}
    >
      <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-dim">
          Grupos ativos
        </div>
        {filtering ? (
          <Button size="sm" variant="ghost" onClick={clearActive}>
            Mostrar todas as fichas
          </Button>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {groups.map((group) => {
          const on = activeGroupIds.includes(group.id)
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => toggleActive(group.id)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                on
                  ? 'border-accent bg-accent/20 text-accent'
                  : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
              }`}
              aria-pressed={on}
            >
              {group.name}
            </button>
          )
        })}
      </div>
      <p className="mt-1.5 text-[11px] text-text-dim">
        {filtering
          ? 'Saque e inventário da mesa só listam fichas desses grupos (e o baú da mesa).'
          : 'Nenhum grupo ativo: todas as fichas aparecem nos menus.'}
      </p>
    </div>
  )
}
