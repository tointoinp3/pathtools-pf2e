import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { learnRitual, unlearnRitual } from '@/engine'
import { listRituals } from '@/engine/ritualCatalog'
import { withLocalizedRitual } from '@/features/rituals/localizeRituals'
import { RitualDetailPanel } from '@/features/rituals/components/RitualFacts'
import { DiceButton } from '@/components/dice/DiceButton'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import type {
  CharacterSpellState,
  Rarity,
  ResolvedSkill,
  Ritual,
  SkillId,
} from '@/types'
import {
  RARITY_FILTER_OPTIONS,
  SKILL_LABELS,
  formatModifier,
} from '@/utils/labels'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { useSlashSearch } from '@/utils/useSlashSearch'

const RANK_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => ({
  value: String(rank),
  label: String(rank),
}))

interface RitualsBoardProps {
  state?: CharacterSpellState
  onChange: (s: CharacterSpellState) => void
  skills?: ResolvedSkill[]
}

export function RitualsBoard({ state, onChange, skills }: RitualsBoardProps) {
  const [query, setQuery] = useState('')
  const [ranks, setRanks] = useState<string[]>([])
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [skillIds, setSkillIds] = useState<SkillId[]>([])
  const [onlyKnown, setOnlyKnown] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const searchRef = useSlashSearch()

  const catalog = useMemo(
    () =>
      listRituals()
        .map(withLocalizedRitual)
        .sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name, 'pt')),
    [],
  )

  const known = new Set(state?.ritualIds ?? [])
  const skillById = useMemo(
    () => Object.fromEntries((skills ?? []).map((s) => [s.id, s])),
    [skills],
  )

  const skillOptions = useMemo(() => {
    const ids = new Set<SkillId>()
    for (const r of catalog) {
      for (const id of r.primaryCheckSkills ?? []) ids.add(id)
    }
    return [...ids]
      .sort((a, b) => SKILL_LABELS[a].localeCompare(SKILL_LABELS[b], 'pt'))
      .map((id) => ({ value: id, label: SKILL_LABELS[id] }))
  }, [catalog])

  const q = query.trim().toLowerCase()
  const filtered = catalog.filter((r) => {
    if (onlyKnown && !known.has(r.id)) return false
    if (!matchesSelected(String(r.rank), ranks)) return false
    if (!matchesSelected(r.rarity, rarities)) return false
    if (
      skillIds.length > 0 &&
      !(r.primaryCheckSkills ?? []).some((id) => skillIds.includes(id))
    ) {
      return false
    }
    if (!q) return true
    return (
      r.name.toLowerCase().includes(q) ||
      r.originalName.toLowerCase().includes(q) ||
      (r.primaryCheck ?? '').toLowerCase().includes(q)
    )
  })

  const grouped = [...new Set(filtered.map((r) => r.rank))]
    .sort((a, b) => a - b)
    .map((rank) => ({
      rank,
      rituals: filtered.filter((r) => r.rank === rank),
    }))

  const selected =
    catalog.find((r) => r.id === selectedId) ?? filtered[0] ?? null
  const selectedOwned = selected ? known.has(selected.id) : false
  const filtersOn =
    query.trim() !== '' ||
    ranks.length > 0 ||
    rarities.length > 0 ||
    skillIds.length > 0 ||
    onlyKnown

  return (
    <div className="flex h-[min(44rem,calc(100vh-14rem))] min-h-[24rem] flex-col gap-3 lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border border-border/90 bg-surface-1">
        <div className="border-b border-border/60 px-4 py-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="text-sm font-medium text-text">Rituais</div>
              <p className="text-[11px] text-text-dim">
                Qualquer personagem pode conhecê-los. Não usam espaços:{' '}
                {known.size} marcado{known.size === 1 ? '' : 's'} nesta ficha.{' '}
                <Link
                  to="/compendio/rituais"
                  className="text-accent hover:underline"
                >
                  Abrir no compêndio
                </Link>
              </p>
            </div>
            {filtersOn && (
              <button
                type="button"
                className="text-[10px] text-text-dim hover:text-accent"
                onClick={() => {
                  setQuery('')
                  setRanks([])
                  setRarities([])
                  setSkillIds([])
                  setOnlyKnown(false)
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar nome ou perícia… (/)"
            className="mt-2"
          />
          <div className="mt-2 space-y-2">
            <MultiFilter
              label="Posto"
              options={RANK_OPTIONS}
              selected={ranks}
              onChange={setRanks}
              emptyLabel="Todos"
            />
            <MultiFilter
              label="Raridade"
              options={RARITY_FILTER_OPTIONS}
              selected={rarities}
              onChange={setRarities}
              emptyLabel="Todas"
            />
            {skillOptions.length > 0 && (
              <MultiFilter
                label="Perícia"
                options={skillOptions}
                selected={skillIds}
                onChange={setSkillIds}
                emptyLabel="Qualquer"
              />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <Button
              size="sm"
              variant={onlyKnown ? 'accent' : 'secondary'}
              onClick={() => setOnlyKnown((v) => !v)}
            >
              Só conhecidos
            </Button>
            <span className="text-[11px] text-text-dim">
              {filtered.length} de {catalog.length}
            </span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {grouped.map((group) => (
            <div key={group.rank}>
              <div className="sticky top-0 border-b border-border/40 bg-surface-2/90 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-text-dim backdrop-blur-sm">
                Posto {group.rank} · {group.rituals.length}
              </div>
              <ul className="divide-y divide-border/50">
                {group.rituals.map((ritual) => {
                  const owned = known.has(ritual.id)
                  const active = selected?.id === ritual.id
                  return (
                    <li key={ritual.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(ritual.id)}
                        className={`flex w-full items-start justify-between gap-2 px-4 py-2.5 text-left transition-colors ${
                          active ? 'bg-accent/15' : 'hover:bg-surface-2'
                        }`}
                      >
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-text">
                              {ritual.name}
                            </span>
                            {owned && <Badge tone="success">Na ficha</Badge>}
                            {ritual.rarity !== 'common' && (
                              <RarityBadge rarity={ritual.rarity} />
                            )}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-text-dim">
                            {ritual.originalName}
                            {ritual.primaryCheck
                              ? ` · ${ritual.primaryCheck}`
                              : ''}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-text-dim">
              {onlyKnown
                ? 'Nenhum ritual marcado nesta ficha.'
                : 'Nenhum ritual neste filtro.'}
            </p>
          )}
        </div>
      </div>

      <RitualDetailPanel
        ritual={selected}
        actions={
          selected ? (
            <Button
              size="sm"
              variant={selectedOwned ? 'accent' : 'secondary'}
              onClick={() =>
                onChange(
                  selectedOwned
                    ? unlearnRitual(state, selected.id)
                    : learnRitual(state, selected.id),
                )
              }
            >
              {selectedOwned ? 'Conhecido' : 'Aprender'}
            </Button>
          ) : undefined
        }
        extra={
          selected ? (
            <RitualSkillRolls ritual={selected} skillById={skillById} />
          ) : undefined
        }
      />
    </div>
  )
}

function RitualSkillRolls({
  ritual,
  skillById,
}: {
  ritual: Ritual
  skillById: Partial<Record<SkillId, ResolvedSkill>>
}) {
  const checkSkills = ritual.primaryCheckSkills ?? []
  if (checkSkills.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {checkSkills.map((skillId) => {
        const skill = skillById[skillId]
        if (!skill) {
          return (
            <span
              key={skillId}
              className="rounded-md border border-border/70 px-2 py-0.5 text-[11px] text-text-dim"
            >
              {SKILL_LABELS[skillId]}
            </span>
          )
        }
        return (
          <span
            key={skillId}
            className="inline-flex items-center gap-1 rounded-md border border-border/70 bg-surface-2/50 px-1.5 py-0.5 text-[11px] text-text-muted"
          >
            {SKILL_LABELS[skillId]} {formatModifier(skill.modifier)}
            <DiceButton
              label={`Ritual · ${SKILL_LABELS[skillId]}`}
              modifier={skill.modifier}
              breakdown={skill.breakdown}
              size="sm"
            />
          </span>
        )
      })}
    </div>
  )
}
