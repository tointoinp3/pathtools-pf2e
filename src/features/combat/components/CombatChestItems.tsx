import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import {
  ITEM_CATEGORY_LABELS,
  type CombatToken,
  type ItemDefinition,
  type LootHaul,
  type LootTokenItem,
} from '@/types'
import { formatPriceCp } from '@/engine/equipment'
import { formatCoinsCp } from '@/engine/startingWealth'
import {
  deliverLootToHolder,
  readLastLootHolder,
} from '@/engine/lootDelivery'
import {
  holderKey,
  type HolderRef,
} from '@/engine/partyTransfer'
import {
  addOrStackCombatLoot,
  canDeliverCombatLootItem,
  combatLootItemFromCatalog,
  combatLootItemFromHaulLine,
  combatLootItemToLine,
} from '@/engine/combatLoot'
import { listHauls } from '@/features/loot/lootRepository'
import { GiveTargetPicker } from '@/features/loot/components/GiveTargetPicker'
import {
  useSelectableCharacters,
  useSelectableStashes,
} from '@/features/groups/useSelectableCharacters'
import { useCharacterStore } from '@/stores/characterStore'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useGroupStore } from '@/stores/groupStore'
import { useStashStore } from '@/stores/stashStore'

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
      {children}
    </h3>
  )
}

function itemLabel(item: LootTokenItem): string {
  if ((item.coinsCp ?? 0) > 0) {
    return `${item.name} (${formatCoinsCp(item.coinsCp ?? 0)})`
  }
  return item.quantity > 1 ? `${item.name} ×${item.quantity}` : item.name
}

export function CombatChestItems({
  token,
  patchToken,
}: {
  token: CombatToken
  patchToken: (patch: Partial<CombatToken>) => void
}) {
  const lootItems = token.lootItems ?? []
  const catalog = useEquipmentStore((s) => s.items)
  const loadEquipment = useEquipmentStore((s) => s.loadAll)
  const loadCharacters = useCharacterStore((s) => s.loadAll)
  const loadGroups = useGroupStore((s) => s.loadAll)
  const loadStashes = useStashStore((s) => s.loadAll)
  const characters = useSelectableCharacters()
  const stashes = useSelectableStashes()

  const [query, setQuery] = useState('')
  const [qty, setQty] = useState('1')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [givingIds, setGivingIds] = useState<string[] | null>(null)
  const [hauls, setHauls] = useState<LootHaul[] | null>(null)
  const [showHauls, setShowHauls] = useState(false)
  const [recentKey, setRecentKey] = useState<string | null>(() => {
    const last = readLastLootHolder()
    return last ? holderKey(last) : null
  })

  useEffect(() => {
    void loadEquipment()
    void loadCharacters()
    void loadGroups()
    void loadStashes()
  }, [loadEquipment, loadCharacters, loadGroups, loadStashes])

  const matches = useMemo(() => {
    const q = normalize(query.trim())
    if (q.length < 2) return []
    return catalog
      .filter(
        (item) =>
          normalize(item.name).includes(q) ||
          normalize(item.originalName).includes(q),
      )
      .slice(0, 12)
  }, [catalog, query])

  const options = useMemo(
    () => [
      ...stashes.map((stash) => ({
        ref: { kind: 'stash' as const, id: stash.id },
        name: stash.name,
        subtitle: `Baú compartilhado · ${formatCoinsCp(stash.coinsCp ?? 0)}`,
      })),
      ...characters.map((character) => ({
        ref: { kind: 'character' as const, id: character.id },
        name: character.name,
        subtitle: [
          `Nv. ${character.level}`,
          character.playerName || null,
        ]
          .filter(Boolean)
          .join(' · '),
        portraitId: character.portraitId,
      })),
    ],
    [characters, stashes],
  )

  const pendingGive = givingIds
    ? lootItems.filter((item) => givingIds.includes(item.id))
    : []
  const deliverable = lootItems.filter(canDeliverCombatLootItem)

  function addFromCatalog(definition: ItemDefinition) {
    const quantity = Math.max(1, Math.round(Number(qty)) || 1)
    patchToken({
      lootItems: addOrStackCombatLoot(
        lootItems,
        combatLootItemFromCatalog(definition, quantity),
      ),
    })
    setQuery('')
    setQty('1')
    setFeedback(`${definition.name} no baú.`)
  }

  function patchItem(id: string, patch: Partial<LootTokenItem>) {
    patchToken({
      lootItems: lootItems.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    })
  }

  async function toggleHauls() {
    if (!showHauls && hauls === null) {
      setHauls(await listHauls())
    }
    setShowHauls((v) => !v)
  }

  function importHaul(haul: LootHaul) {
    let next = lootItems
    for (const line of haul.lines) {
      next = addOrStackCombatLoot(next, combatLootItemFromHaulLine(line))
    }
    patchToken({ lootItems: next })
    setShowHauls(false)
    setFeedback(`Saque “${haul.name}” no baú.`)
  }

  async function giveTo(to: HolderRef, ids: string[]) {
    const chosen = lootItems.filter((item) => ids.includes(item.id))
    const sendable = chosen.filter(canDeliverCombatLootItem)
    if (sendable.length === 0) {
      setFeedback('Nada para enviar: escolha itens do catálogo.')
      setGivingIds(null)
      return
    }
    setBusy(true)
    setFeedback(null)
    try {
      const result = await deliverLootToHolder(
        to,
        sendable.map(combatLootItemToLine),
        token.name,
      )
      const missing = new Set(result.missingNames)
      const deliveredIds = new Set(
        sendable
          .filter(
            (item) =>
              (item.coinsCp ?? 0) > 0 || !missing.has(item.name),
          )
          .map((item) => item.id),
      )
      patchToken({
        lootItems: lootItems.map((item) =>
          deliveredIds.has(item.id) ? { ...item, taken: true } : item,
        ),
      })
      setRecentKey(holderKey(to))
      setGivingIds(null)
      const bits: string[] = []
      if (result.itemCount > 0) {
        bits.push(
          `${result.itemCount} ${result.itemCount === 1 ? 'item' : 'itens'}`,
        )
      }
      if (result.coinsCp > 0) bits.push(formatCoinsCp(result.coinsCp))
      const sent = bits.length > 0 ? bits.join(' + ') : 'conteúdo'
      const warn =
        result.missingNames.length > 0
          ? ` (${result.missingNames.length} sem ficha no catálogo)`
          : ''
      setFeedback(`${sent} → ${result.holderName}${warn}`)
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : 'Não deu para enviar.',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-3 border-t border-border/60 pt-3">
      <SectionTitle>Itens</SectionTitle>
      {lootItems.length > 0 ? (
        <ul className="mb-2 space-y-1">
          {lootItems.map((item) => {
            const canGive = canDeliverCombatLootItem({ ...item, taken: false })
            return (
              <li
                key={item.id}
                className="rounded-md border border-border bg-surface-2 px-1.5 py-1"
              >
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    aria-label={`${item.name} pego`}
                    title="Marcar como pego"
                    checked={item.taken}
                    onChange={(event) =>
                      patchItem(item.id, { taken: event.target.checked })
                    }
                  />
                  <span
                    className={`min-w-0 flex-1 truncate text-xs ${
                      item.taken ? 'text-text-dim line-through' : 'text-text'
                    }`}
                    title={item.name}
                  >
                    {itemLabel(item)}
                  </span>
                  {(item.coinsCp ?? 0) === 0 ? (
                    <input
                      type="number"
                      aria-label={`Quantidade de ${item.name}`}
                      className="field-control w-11 shrink-0 rounded-md border border-border bg-surface-1 px-1 py-0.5 text-center text-xs text-text outline-none"
                      value={item.quantity}
                      min={1}
                      onChange={(event) =>
                        patchItem(item.id, {
                          quantity: Math.max(
                            1,
                            Math.round(Number(event.target.value)) || 1,
                          ),
                        })
                      }
                    />
                  ) : null}
                  <button
                    type="button"
                    aria-label={`Remover ${item.name}`}
                    className="shrink-0 text-text-dim hover:text-danger"
                    onClick={() =>
                      patchToken({
                        lootItems: lootItems.filter((row) => row.id !== item.id),
                      })
                    }
                  >
                    ✕
                  </button>
                </div>
                {canGive && !item.taken ? (
                  <button
                    type="button"
                    disabled={busy}
                    className="mt-1 w-full rounded-md px-1 py-0.5 text-left text-[10px] font-medium text-accent hover:bg-accent/10 disabled:opacity-50"
                    onClick={() => setGivingIds([item.id])}
                  >
                    Enviar para ficha ou baú da party…
                  </button>
                ) : !item.taken && !canGive ? (
                  <p className="mt-1 text-[10px] text-text-dim">
                    Sem ficha no catálogo — não dá para enviar.
                  </p>
                ) : null}
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="mb-2 text-[11px] text-text-dim">
          Baú vazio. Busque um item do catálogo (espada, escudo, poção…) ou
          importe um saque pronto.
        </p>
      )}

      {deliverable.length > 1 ? (
        <Button
          size="sm"
          variant="accent"
          className="mb-2 w-full"
          disabled={busy}
          onClick={() => setGivingIds(deliverable.map((item) => item.id))}
        >
          Enviar {deliverable.length} itens…
        </Button>
      ) : null}

      <label
        htmlFor="combat-chest-item-search"
        className="mb-1 block text-[10px] font-medium tracking-wide text-text-muted uppercase"
      >
        Adicionar do catálogo
      </label>
      <div className="flex gap-1.5">
        <Input
          id="combat-chest-item-search"
          type="search"
          autoComplete="off"
          aria-label="Buscar item do catálogo"
          placeholder="Espada, escudo, poção…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && matches[0]) {
              event.preventDefault()
              addFromCatalog(matches[0])
            }
          }}
        />
        <Input
          type="number"
          aria-label="Quantidade"
          className="w-14 text-center"
          value={qty}
          min={1}
          onChange={(event) => setQty(event.target.value)}
        />
      </div>
      {query.trim().length > 0 && query.trim().length < 2 ? (
        <p className="mt-1 text-[11px] text-text-dim">
          Digite ao menos 2 letras.
        </p>
      ) : null}
      {matches.length > 0 ? (
        <ul className="mt-1.5 max-h-48 overflow-y-auto rounded-lg border border-border/70 bg-surface-2/50">
          {matches.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 px-2.5 py-1.5 text-left text-xs hover:bg-accent/10"
                onClick={() => addFromCatalog(item)}
              >
                <span className="min-w-0">
                  <span className="block truncate font-medium text-text">
                    {item.name}
                  </span>
                  <span className="text-text-dim">
                    nv. {item.level} · {ITEM_CATEGORY_LABELS[item.category]}
                  </span>
                </span>
                <span className="shrink-0 text-text-dim">
                  {formatPriceCp(item.priceCp)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : query.trim().length >= 2 ? (
        <p className="mt-1 text-[11px] text-text-dim">
          Nenhum item para “{query.trim()}”.
        </p>
      ) : null}

      <Button
        size="sm"
        variant="ghost"
        className="mt-1.5 w-full"
        onClick={() => void toggleHauls()}
      >
        {showHauls ? 'Fechar saques' : 'Importar de um saque…'}
      </Button>
      {showHauls ? (
        hauls && hauls.length > 0 ? (
          <ul className="mt-1.5 max-h-44 space-y-1 overflow-y-auto">
            {hauls.map((haul) => (
              <li key={haul.id}>
                <button
                  type="button"
                  className="w-full rounded-md border border-border bg-surface-2 px-2 py-1.5 text-left hover:border-info/60"
                  onClick={() => importHaul(haul)}
                >
                  <span className="block truncate text-xs font-medium text-text">
                    {haul.name}
                  </span>
                  <span className="text-[10px] text-text-dim">
                    {haul.lines.length}{' '}
                    {haul.lines.length === 1 ? 'linha' : 'linhas'} · nível{' '}
                    {haul.partyLevel}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-1.5 text-[11px] text-text-dim">
            Nenhum saque salvo. Crie um no Gerador de Saque.
          </p>
        )
      ) : null}

      {feedback ? (
        <p className="mt-1.5 text-[11px] text-success">{feedback}</p>
      ) : null}

      {givingIds ? (
        options.length === 0 ? (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
            role="presentation"
            onClick={() => {
              if (!busy) setGivingIds(null)
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="chest-give-empty-title"
              className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface-1 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
              onClick={(event) => event.stopPropagation()}
            >
              <h2
                id="chest-give-empty-title"
                className="font-display text-lg font-semibold tracking-wide text-accent"
              >
                Enviar do baú
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Nenhuma ficha ou baú nos grupos ativos. Crie uma ficha em
                Personagem ou ative um grupo.
              </p>
              <div className="mt-3 flex justify-end">
                <Button size="sm" onClick={() => setGivingIds(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <GiveTargetPicker
            title="Enviar do baú"
            fromLabel={
              pendingGive.length === 1
                ? itemLabel(pendingGive[0]!)
                : `${pendingGive.length} itens de ${token.name}`
            }
            options={options}
            recentKey={recentKey}
            busy={busy}
            onPick={(to) => void giveTo(to, givingIds)}
            onClose={() => {
              if (!busy) setGivingIds(null)
            }}
          />
        )
      ) : null}
    </div>
  )
}
