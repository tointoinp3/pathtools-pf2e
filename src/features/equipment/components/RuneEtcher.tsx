import { useMemo, useState } from 'react'
import type { EquipmentItem, ItemDefinition, Rarity } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { FilterCount } from '@/components/ui/FilterCount'
import { RARITY_FILTER_OPTIONS } from '@/utils/labels'
import {
  canEtchRune,
  etchRune,
  formatPriceCp,
  getItemDefinition,
  itemRuneHostKind,
  listCompatibleRunes,
  removeRune,
  resolveRunes,
} from '@/engine/equipment'
import { RuneRulesCard } from '@/features/equipment/components/RuneRulesCard'

interface RuneEtcherProps {
  item: EquipmentItem
  onChange: (next: EquipmentItem) => void
}

export function RuneEtcher({ item, onChange }: RuneEtcherProps) {
  const definition = getItemDefinition(item.definitionId)
  const hostKind = itemRuneHostKind(definition)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [rarities, setRarities] = useState<Rarity[]>([])
  const [kinds, setKinds] = useState<Array<'fundamental' | 'property'>>([])

  const runes = useMemo(() => resolveRunes(item.runeIds), [item.runeIds])
  const etched = useMemo(
    () =>
      (item.runeIds ?? [])
        .map((id) => getItemDefinition(id))
        .filter((def): def is ItemDefinition => Boolean(def?.rune)),
    [item.runeIds],
  )
  const temporary = useMemo(
    () =>
      (item.temporaryRuneIds ?? [])
        .map((id) => getItemDefinition(id))
        .filter((def): def is ItemDefinition => Boolean(def?.rune)),
    [item.temporaryRuneIds],
  )

  const catalog = useMemo(() => listCompatibleRunes(item), [item])
  const q = search.trim().toLowerCase()
  const filtered = useMemo(() => {
    return catalog.filter((def) => {
      const kind = def.rune?.kind
      if (kind && !matchesSelected(kind, kinds)) return false
      if (!matchesSelected(def.rarity, rarities)) return false
      if (!q) return true
      return (
        def.name.toLowerCase().includes(q) ||
        def.originalName.toLowerCase().includes(q) ||
        (def.description?.toLowerCase().includes(q) ?? false)
      )
    })
  }, [catalog, q, rarities, kinds])

  if (!hostKind || !definition) return null

  const fundamentals = filtered.filter((def) => def.rune?.kind === 'fundamental')
  const properties = filtered.filter((def) => def.rune?.kind === 'property')
  const needsInvestiture = hostKind === 'armor' && (item.runeIds?.length ?? 0) > 0
  const magicOff = needsInvestiture && !item.invested

  function applyEtch(runeId: string) {
    const result = etchRune(item, runeId)
    if (!result.ok) return
    onChange(result.item)
    setOpen(false)
    setSearch('')
  }

  return (
    <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/60 px-2.5 py-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-medium text-text-muted">
          Runas gravadas
          {hostKind === 'weapon' || hostKind === 'armor' ? (
            <span className="ml-1 font-normal text-text-dim">
              · propriedade {runes.propertyCount}/{runes.propertyLimit}
            </span>
          ) : null}
        </p>
        <Button size="sm" onClick={() => setOpen((value) => !value)}>
          {open ? 'Fechar' : 'Gravar runa'}
        </Button>
      </div>

      {etched.length === 0 ? (
        <p className="mt-1 text-[11px] text-text-dim">
          {definition.category === 'staff'
            ? 'Cajado mágico: só runas fundamentais (potência e impactante). Propriedade não grava.'
            : 'Nenhuma runa ainda. Grave potência antes das de propriedade. Clique na runa para ler o efeito.'}
        </p>
      ) : (
        <ul className="mt-1.5 space-y-1">
          {etched.map((def) => (
            <li key={def.id}>
              <RuneRulesCard
                definition={def}
                dormant={runes.dormantIds.includes(def.id)}
                actions={
                  <Button
                    size="sm"
                    variant="ghost"
                    aria-label={`Remover ${def.name}`}
                    onClick={() => onChange(removeRune(item, def.id))}
                  >
                    ×
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      )}

      {temporary.length > 0 ? (
        <ul className="mt-1.5 space-y-1">
          {temporary.map((def) => (
            <li key={`tmp-${def.id}`}>
              <RuneRulesCard definition={def} temporary />
            </li>
          ))}
        </ul>
      ) : null}

      {definition.category === 'staff' && etched.length > 0 ? (
        <p className="mt-1 text-[11px] text-text-dim">
          Cajado mágico: só runas fundamentais (potência e impactante).
        </p>
      ) : null}

      {runes.overLimit ? (
        <p className="mt-1.5 text-[11px] text-accent">
          Há runa de propriedade dormente: a potência atual não cobre todos os
          slots. Grave uma potência maior para ativá-la.
        </p>
      ) : null}

      {magicOff ? (
        <p className="mt-1.5 text-[11px] text-accent">
          Armadura com runas precisa estar investida para a magia valer (CA
          extra, resiliente, propriedades). O bônus mundano de CA continua.
        </p>
      ) : null}

      {open && (
        <div className="mt-2 space-y-2">
          <Input
            placeholder="Buscar runa…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterCount shown={filtered.length} total={catalog.length} />
          <MultiFilter
            label="Raridade"
            options={RARITY_FILTER_OPTIONS}
            selected={rarities}
            onChange={setRarities}
            emptyLabel="Todas"
          />
          <MultiFilter
            label="Tipo"
            options={[
              { value: 'fundamental', label: 'Fundamental' },
              { value: 'property', label: 'Propriedade' },
            ]}
            selected={kinds}
            onChange={setKinds}
            emptyLabel="Todas"
          />
          <RuneGroup
            title="Fundamentais"
            items={fundamentals}
            host={item}
            onPick={applyEtch}
          />
          <RuneGroup
            title="Propriedade"
            items={properties}
            host={item}
            onPick={applyEtch}
          />
          {filtered.length === 0 ? (
            <p className="text-[11px] text-text-dim">Nenhuma runa neste filtro.</p>
          ) : null}
        </div>
      )}
    </div>
  )
}

function RuneGroup({
  title,
  items,
  host,
  onPick,
}: {
  title: string
  items: ItemDefinition[]
  host: EquipmentItem
  onPick: (id: string) => void
}) {
  if (items.length === 0) return null
  return (
    <div>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
        {title}
      </p>
      <ul className="max-h-80 space-y-1 overflow-y-auto">
        {items.map((def) => {
          const check = canEtchRune(host, def.id)
          const already = (host.runeIds ?? []).includes(def.id)
          const sameFamily = (host.runeIds ?? []).some(
            (id) =>
              getItemDefinition(id)?.rune?.family === def.rune?.family &&
              id !== def.id,
          )
          const notes = [
            `Nv. ${def.level}`,
            formatPriceCp(def.priceCp),
            already ? 'já gravada' : null,
            sameFamily ? 'substitui a da mesma família' : null,
            !check.ok ? check.reason : null,
            check.ok && check.warning ? check.warning : null,
          ].filter(Boolean)
          return (
            <li key={def.id}>
              <RuneRulesCard
                definition={def}
                actions={
                  <Button
                    size="sm"
                    variant="accent"
                    disabled={!check.ok || already}
                    onClick={() => onPick(def.id)}
                  >
                    Gravar
                  </Button>
                }
              />
              {notes.length > 0 ? (
                <p className="mt-0.5 px-1 text-[10px] text-text-dim">
                  {notes.join(' · ')}
                </p>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
