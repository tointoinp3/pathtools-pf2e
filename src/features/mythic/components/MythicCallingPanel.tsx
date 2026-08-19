import { useMemo, useState } from 'react'
import { officialMythicCallings } from '@/data/seeds/mythicCallings'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { FilterCount } from '@/components/ui/FilterCount'
import {
  MythicCallingCard,
  MythicCallingFacts,
} from '@/features/mythic/components/MythicCallingRules'

export function MythicCallingPanel({
  selectedId,
  onSelect,
  onClear,
}: {
  selectedId?: string | null
  onSelect: (callingId: string) => void
  onClear: () => void
}) {
  const [query, setQuery] = useState('')
  const searchRef = useSlashSearch()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return officialMythicCallings
    return officialMythicCallings.filter((calling) => {
      const haystack = [
        calling.name,
        calling.originalName,
        calling.summary,
        calling.mythicSpend,
        calling.mythicRegain,
        ...calling.edicts,
        ...calling.anathema,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  const selected =
    officialMythicCallings.find((calling) => calling.id === selectedId) ?? null

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <Tip>
          O chamado é o propósito do seu poder mítico. Você escolhe; o motor
          não escolhe. Clique no nome para ler gasto, recuperação, editais e
          anátema. Editais devolvem 1 Ponto Mítico; anátema zera os pontos da
          sessão (não é permanente).
        </Tip>
        <Input
          ref={searchRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar chamado…"
        />
        <FilterCount
          shown={filtered.length}
          total={officialMythicCallings.length}
        />
        <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
          {filtered.map((calling) => (
            <li key={calling.id}>
              <MythicCallingCard
                calling={calling}
                selected={calling.id === selectedId}
                actions={
                  <Button
                    size="sm"
                    variant={
                      calling.id === selectedId ? 'secondary' : 'accent'
                    }
                    onClick={() => onSelect(calling.id)}
                  >
                    {calling.id === selectedId ? 'Atual' : 'Escolher'}
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      </div>
      <Panel
        title={selected ? selected.name : 'Chamado mítico'}
        subtitle={selected?.originalName}
        className="flex min-h-0 w-full flex-col lg:w-[28rem] lg:flex-none"
        bodyClassName="min-h-0 flex-1 overflow-y-auto"
        actions={
          selected ? (
            <Button size="sm" variant="danger" onClick={onClear}>
              Remover
            </Button>
          ) : null
        }
      >
        {selected ? (
          <div className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-1">
              <Badge>Mítico</Badge>
              <RarityBadge rarity={selected.rarity} />
            </div>
            <MythicCallingFacts calling={selected} />
          </div>
        ) : (
          <p className="text-sm text-text-muted">
            Escolha um chamado na lista. Sem chamado, a ficha ainda não ganha
            Pontos Míticos nem os feitos extras dos níveis pares.
          </p>
        )}
      </Panel>
    </div>
  )
}
