import { useMemo, useState, type ReactNode } from 'react'
import type { Feat, Rarity } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { Input } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { RARITY_FILTER_OPTIONS } from '@/utils/labels'
import { FeatExpandRow } from '@/features/feats/components/FeatExpandRow'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'

/** Painel de consulta: feitos relacionados a uma ancestralidade ou classe. */
export function RelatedFeatsPanel({
  feats,
  title,
  subtitle,
  characterLevel,
  classFeatFromLevel,
  emptyHint,
}: {
  feats: Feat[]
  title: string
  subtitle?: string
  characterLevel: number
  /** Primeiro nível com slot de feito de classe (mago = 2). */
  classFeatFromLevel?: number
  emptyHint?: string
}) {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState<number | 'all' | 'unlocked'>(
    'unlocked',
  )
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [openId, setOpenId] = useState<string | null>(null)

  const localizedFeats = useMemo(
    () => feats.map((f) => withLocalizedFeatName(f, feats)),
    [feats],
  )

  const levels = useMemo(() => {
    const set = new Set(localizedFeats.map((f) => f.level))
    return [...set].sort((a, b) => a - b)
  }, [localizedFeats])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return localizedFeats
      .filter((f) => {
        if (levelFilter === 'unlocked' && f.level > characterLevel) return false
        if (typeof levelFilter === 'number' && f.level !== levelFilter) {
          return false
        }
        if (!matchesSelected(f.rarity, rarities)) return false
        if (!q) return true
        return (
          f.name.toLowerCase().includes(q) ||
          f.originalName.toLowerCase().includes(q) ||
          f.traits.some((t) => t.toLowerCase().includes(q))
        )
      })
      .sort((a, b) => {
        if (a.level !== b.level) return a.level - b.level
        return a.name.localeCompare(b.name, 'pt-BR')
      })
  }, [localizedFeats, search, levelFilter, rarities, characterLevel])

  const unlockedCount = localizedFeats.filter(
    (f) => f.level <= characterLevel,
  ).length

  return (
    <Panel
      quiet
      compact
      title={title}
      subtitle={
        subtitle ??
        `${unlockedCount}/${feats.length} até nv. ${characterLevel}`
      }
    >
      {feats.length === 0 ? (
        <p className="text-xs text-text-dim">
          {emptyHint ?? 'Nenhum feito no catálogo para esta escolha ainda.'}
        </p>
      ) : (
        <div className="space-y-2">
          <Input
            className="py-1 text-xs"
            placeholder="Filtrar feitos…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterCount shown={filtered.length} total={localizedFeats.length} />
          <div className="flex flex-wrap gap-1">
            <FilterChip
              selected={levelFilter === 'unlocked'}
              onClick={() => setLevelFilter('unlocked')}
            >
              Até nv. {characterLevel}
            </FilterChip>
            <FilterChip
              selected={levelFilter === 'all'}
              onClick={() => setLevelFilter('all')}
            >
              Todos
            </FilterChip>
            {levels.map((lv) => (
              <FilterChip
                key={lv}
                selected={levelFilter === lv}
                onClick={() => setLevelFilter(lv)}
              >
                Nv. {lv}
              </FilterChip>
            ))}
          </div>
          <MultiFilter
            label="Raridade"
            options={RARITY_FILTER_OPTIONS}
            selected={rarities}
            onChange={setRarities}
            emptyLabel="Todas"
          />

          <ul className="max-h-64 space-y-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="py-2 text-center text-[11px] text-text-dim">
                Nenhum feito neste filtro.
              </li>
            ) : (
              filtered.map((feat) => {
                const tooHigh = feat.level > characterLevel
                const waitingForClassSlot =
                  feat.category === 'class' &&
                  classFeatFromLevel != null &&
                  characterLevel < classFeatFromLevel
                const locked = tooHigh || waitingForClassSlot
                const open = openId === feat.id
                return (
                  <li key={feat.id}>
                    <FeatExpandRow
                      feat={feat}
                      open={open}
                      locked={locked}
                      onToggle={() =>
                        setOpenId((id) => (id === feat.id ? null : feat.id))
                      }
                      featCatalog={feats}
                      extraBadges={
                        <>
                          {waitingForClassSlot && !tooHigh && (
                            <Badge className="!text-[9px]">
                              slot nv. {classFeatFromLevel}
                            </Badge>
                          )}
                          {tooHigh && (
                            <Badge className="!text-[9px]">depois</Badge>
                          )}
                        </>
                      }
                      footer={
                        <>
                          {waitingForClassSlot && !tooHigh && (
                            <p className="text-[10px] text-text-dim">
                              {`Esta classe só ganha feito de classe no nv. ${classFeatFromLevel}. Feitos de 1º nível entram nesse slot (aba Feitos ou Progressão).`}
                            </p>
                          )}
                          {tooHigh && (
                            <p className="text-[10px] text-text-dim">
                              Disponível a partir do nível {feat.level}.
                            </p>
                          )}
                        </>
                      }
                    />
                  </li>
                )
              })
            )}
          </ul>
          <p className="text-[10px] text-text-dim">
            Consulta apenas — a escolha fica na aba Feitos
            {classFeatFromLevel && classFeatFromLevel > 1
              ? ` (slot de classe a partir do nv. ${classFeatFromLevel})`
              : ''}
            .
          </p>
        </div>
      )}
    </Panel>
  )
}

function FilterChip({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-2 py-0.5 text-[10px] transition-colors ${
        selected
          ? 'border-accent bg-accent/20 text-accent'
          : 'border-border/70 text-text-dim hover:border-border-strong hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}
