import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { Panel, Tip } from '@/components/ui/Panel'
import { formatPriceCp } from '@/engine/equipment'
import {
  coinsToCp,
  holderKey,
  isStackableItem,
  itemCatalog,
  partyCoinsCp,
  partyItemCount,
  transferCoins,
  transferItem,
  type CoinUnit,
  type HolderRef,
} from '@/engine/partyTransfer'
import { formatCoinsCp } from '@/engine/startingWealth'
import { ActiveGroupsBar } from '@/features/groups/ActiveGroupsBar'
import {
  useSelectableCharacters,
  useSelectableStashes,
} from '@/features/groups/useSelectableCharacters'
import { GiveTargetPicker } from '@/features/loot/components/GiveTargetPicker'
import { ITEM_CATEGORY_LABELS, type EquipmentItem } from '@/types'
import { useCharacterStore } from '@/stores/characterStore'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useGroupStore } from '@/stores/groupStore'
import { useStashStore } from '@/stores/stashStore'

const UNIT_LABEL: Record<CoinUnit, string> = {
  gp: 'po',
  sp: 'pp',
  cp: 'pc',
}

const LAST_DEST_KEY = 'sp-loot-last-transfer-dest'

function readLastDest(): string | null {
  try {
    return localStorage.getItem(LAST_DEST_KEY)
  } catch {
    return null
  }
}

function writeLastDest(id: string) {
  try {
    localStorage.setItem(LAST_DEST_KEY, id)
  } catch {
    /* ignore */
  }
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

interface HolderView {
  ref: HolderRef
  name: string
  subtitle: string
  coinsCp: number
  equipment: EquipmentItem[]
  portraitId?: string | null
  href?: string
}

type PendingGive =
  | {
      kind: 'item'
      from: HolderRef
      itemId: string
      label: string
      quantity: number
    }
  | {
      kind: 'gold'
      from: HolderRef
      coinsCp: number
      label: string
    }

export function PartyInventoryPage() {
  const allCharacters = useCharacterStore((s) => s.characters)
  const loadingChars = useCharacterStore((s) => s.loading)
  const loadCharacters = useCharacterStore((s) => s.loadAll)
  const loadEquipment = useEquipmentStore((s) => s.loadAll)
  const loadGroups = useGroupStore((s) => s.loadAll)
  const loadStashes = useStashStore((s) => s.loadAll)
  const characters = useSelectableCharacters()
  const stashes = useSelectableStashes()

  const [query, setQuery] = useState('')
  const [qtyByItem, setQtyByItem] = useState<Record<string, number>>({})
  const [goldBySource, setGoldBySource] = useState<Record<string, string>>({})
  const [unitBySource, setUnitBySource] = useState<Record<string, CoinUnit>>({})
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [pending, setPending] = useState<PendingGive | null>(null)
  const [recentDest, setRecentDest] = useState<string | null>(() => readLastDest())
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(
    null,
  )

  useEffect(() => {
    void loadCharacters()
    void loadEquipment()
    void loadGroups()
    void loadStashes()
  }, [loadCharacters, loadEquipment, loadGroups, loadStashes])

  const holders: HolderView[] = useMemo(() => {
    const fromChars: HolderView[] = characters.map((character) => ({
      ref: { kind: 'character', id: character.id },
      name: character.name,
      subtitle: [
        `Nv. ${character.level}`,
        character.playerName || null,
        formatCoinsCp(character.coinsCp ?? 0),
      ]
        .filter(Boolean)
        .join(' · '),
      coinsCp: character.coinsCp ?? 0,
      equipment: character.equipment ?? [],
      portraitId: character.portraitId,
      href: `/personagens/${character.id}`,
    }))
    const fromStash: HolderView[] = stashes.map((stash) => ({
      ref: { kind: 'stash', id: stash.id },
      name: stash.name,
      subtitle: `Baú compartilhado · ${formatCoinsCp(stash.coinsCp ?? 0)}`,
      coinsCp: stash.coinsCp ?? 0,
      equipment: stash.equipment ?? [],
    }))
    return [...fromStash, ...fromChars]
  }, [characters, stashes])

  const q = normalize(query.trim())

  const visible = useMemo(() => {
    if (!q) return holders
    return holders.filter((holder) => {
      if (normalize(holder.name).includes(q)) return true
      return holder.equipment.some((item) => normalize(item.name).includes(q))
    })
  }, [holders, q])

  const totalCoins = partyCoinsCp(characters, stashes)
  const totalItems = partyItemCount(characters, stashes)

  function others(source: HolderRef) {
    return holders.filter(
      (holder) =>
        holder.ref.kind !== source.kind || holder.ref.id !== source.id,
    )
  }

  function qtyFor(itemId: string, max: number) {
    const drafted = qtyByItem[itemId]
    if (drafted == null) return max
    return Math.min(max, Math.max(1, drafted))
  }

  async function runTransfer(key: string, work: () => Promise<string>) {
    setBusyKey(key)
    setFeedback(null)
    try {
      const text = await work()
      setFeedback({ ok: true, text })
    } catch (error) {
      setFeedback({
        ok: false,
        text:
          error instanceof Error ? error.message : 'Não deu para transferir.',
      })
    } finally {
      setBusyKey(null)
    }
  }

  function rememberDest(to: HolderRef) {
    const key = holderKey(to)
    writeLastDest(key)
    setRecentDest(key)
  }

  function holderName(ref: HolderRef): string {
    return (
      holders.find(
        (holder) => holder.ref.kind === ref.kind && holder.ref.id === ref.id,
      )?.name ?? 'inventário'
    )
  }

  function askGiveItem(from: HolderRef, item: EquipmentItem, max: number) {
    const quantity = qtyFor(item.id, max)
    setPending({
      kind: 'item',
      from,
      itemId: item.id,
      quantity,
      label:
        quantity > 1 ? `Passar ${item.name} ×${quantity}` : `Passar ${item.name}`,
    })
  }

  function askGiveGold(from: HolderRef, all = false) {
    const fromKey = holderKey(from)
    const source = holders.find(
      (holder) => holder.ref.kind === from.kind && holder.ref.id === from.id,
    )
    const unit = unitBySource[fromKey] ?? 'gp'
    const coinsCp = all
      ? source?.coinsCp ?? 0
      : coinsToCp(
          Number((goldBySource[fromKey] ?? '').replace(',', '.')),
          unit,
        )
    if (coinsCp <= 0) return
    setPending({
      kind: 'gold',
      from,
      coinsCp,
      label: all
        ? `Passar ${formatCoinsCp(coinsCp)} (tudo)`
        : `Passar ${formatCoinsCp(coinsCp)}`,
    })
  }

  async function confirmGive(to: HolderRef) {
    if (!pending || busyKey) return
    rememberDest(to)
    const current = pending
    if (current.kind === 'item') {
      await runTransfer(`item:${current.itemId}`, async () => {
        const result = await transferItem({
          from: current.from,
          to,
          itemId: current.itemId,
          quantity: current.quantity,
        })
        setQtyByItem((prev) => {
          const next = { ...prev }
          delete next[current.itemId]
          return next
        })
        return result.summary
      })
    } else {
      const fromKey = holderKey(current.from)
      await runTransfer(`gold:${fromKey}`, async () => {
        const result = await transferCoins({
          from: current.from,
          to,
          coinsCp: current.coinsCp,
        })
        setGoldBySource((prev) => ({ ...prev, [fromKey]: '' }))
        return `${formatCoinsCp(current.coinsCp)}: ${result.summary}`
      })
    }
    setPending(null)
  }

  const canTransfer = holders.length >= 2
  const loading = loadingChars && allCharacters.length === 0

  return (
    <div className="mx-auto max-w-6xl animate-fade-up space-y-3 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Link
            to="/saques"
            className="text-[11px] text-text-dim hover:text-accent"
          >
            ← Meus saques
          </Link>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-wide text-accent">
            Inventário da mesa
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            O que cada ficha e o baú compartilhado carregam — passe item ou
            ouro entre eles sem abrir a ficha.
          </p>
        </div>
        {holders.length > 0 && (
          <div className="text-right text-sm text-text-muted">
            <div>
              {characters.length} ficha{characters.length === 1 ? '' : 's'}
              {stashes.length > 0
                ? ` · ${stashes.length} baú${stashes.length === 1 ? '' : 's'}`
                : ''}
            </div>
            <div className="text-xs text-text-dim">
              {totalItems} item(ns) · {formatCoinsCp(totalCoins)} no grupo
            </div>
          </div>
        )}
      </div>

      <ActiveGroupsBar />

      <Tip>
        Aperte <strong>Passar</strong> no item ou no ouro e escolha para quem
        vai. Poções e munição aceitam quantidade. O item chega desequipado. O{' '}
        <strong>baú</strong> guarda o que a mesa ainda não repartiu.
      </Tip>

      {loading ? (
        <p className="text-sm text-text-dim">Carregando inventário…</p>
      ) : !canTransfer ? (
        <div className="rounded-xl border border-dashed border-border bg-surface-1/80 px-6 py-10 text-center">
          <p className="text-sm text-text-muted">
            Precisa de pelo menos duas fichas, ou uma ficha e o baú, para
            passar item ou ouro.
          </p>
          <Link to="/personagens/novo" className="mt-4 inline-flex">
            <Button variant="accent">Criar personagem</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="search"
              className="max-w-md flex-1"
              placeholder="Buscar personagem, baú ou item…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Buscar no inventário da mesa"
            />
            <FilterCount shown={visible.length} total={holders.length} />
          </div>

          {feedback ? (
            <p
              className={`text-sm ${feedback.ok ? 'text-accent' : 'text-danger'}`}
            >
              {feedback.text}
            </p>
          ) : null}

          {visible.length === 0 ? (
            <p className="text-sm text-text-dim">
              Nada para “{query}”.{' '}
              <button
                type="button"
                className="text-accent hover:underline"
                onClick={() => setQuery('')}
              >
                Limpar busca
              </button>
            </p>
          ) : (
            <div className="grid gap-3 lg:grid-cols-2">
              {visible.map((holder) => {
                const sourceKey = holderKey(holder.ref)
                const unit = unitBySource[sourceKey] ?? 'gp'
                const coins = holder.coinsCp
                const gear = holder.equipment
                const shownGear = q
                  ? gear.filter(
                      (item) =>
                        normalize(item.name).includes(q) ||
                        normalize(holder.name).includes(q),
                    )
                  : gear
                const goldAmount = coinsToCp(
                  Number(
                    (goldBySource[sourceKey] ?? '').replace(',', '.'),
                  ),
                  unit,
                )

                return (
                  <Panel
                    key={sourceKey}
                    compact
                    title={holder.name}
                    subtitle={holder.subtitle}
                    actions={
                      holder.href ? (
                        <Link
                          to={holder.href}
                          className="text-[11px] text-accent hover:underline"
                        >
                          Ficha
                        </Link>
                      ) : (
                        <span className="text-[11px] text-text-dim">Baú</span>
                      )
                    }
                  >
                    <div className="space-y-3">
                      <div className="rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-2">
                        <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                          Ouro
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Input
                            className="w-24"
                            inputMode="decimal"
                            placeholder="0"
                            value={goldBySource[sourceKey] ?? ''}
                            onChange={(e) =>
                              setGoldBySource((prev) => ({
                                ...prev,
                                [sourceKey]: e.target.value,
                              }))
                            }
                            aria-label={`Quantia de ${holder.name}`}
                          />
                          <div className="flex gap-1">
                            {(Object.keys(UNIT_LABEL) as CoinUnit[]).map(
                              (option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className={`rounded-md border px-2 py-1 text-[11px] ${
                                    unit === option
                                      ? 'border-accent bg-accent/20 text-accent'
                                      : 'border-border text-text-muted hover:text-text'
                                  }`}
                                  onClick={() =>
                                    setUnitBySource((prev) => ({
                                      ...prev,
                                      [sourceKey]: option,
                                    }))
                                  }
                                >
                                  {UNIT_LABEL[option]}
                                </button>
                              ),
                            )}
                          </div>
                          <Button
                            size="sm"
                            disabled={
                              busyKey != null || coins <= 0 || goldAmount <= 0
                            }
                            onClick={() => askGiveGold(holder.ref)}
                          >
                            Passar
                          </Button>
                          <Button
                            size="sm"
                            disabled={busyKey != null || coins <= 0}
                            onClick={() => askGiveGold(holder.ref, true)}
                          >
                            Tudo
                          </Button>
                        </div>
                      </div>

                      {shownGear.length === 0 ? (
                        <p className="text-xs text-text-dim">
                          {gear.length === 0
                            ? 'Inventário vazio.'
                            : 'Nenhum item neste filtro.'}
                        </p>
                      ) : (
                        <ul className="divide-y divide-border/50">
                          {shownGear.map((item) => {
                            const max = Math.max(1, item.quantity ?? 1)
                            const qty = qtyFor(item.id, max)
                            const def = itemCatalog(item)
                            const stackable = isStackableItem(item)
                            return (
                              <li
                                key={item.id}
                                className="flex flex-wrap items-center gap-2 py-2"
                              >
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-text">
                                    {item.name}
                                    {max > 1 ? ` ×${max}` : ''}
                                  </div>
                                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-text-dim">
                                    {def ? (
                                      <span>
                                        {ITEM_CATEGORY_LABELS[def.category]}
                                      </span>
                                    ) : (
                                      <span>
                                        {holder.ref.kind === 'stash'
                                          ? 'Item do baú'
                                          : 'Item da ficha'}
                                      </span>
                                    )}
                                    {item.equipped ? (
                                      <Badge>Equipado</Badge>
                                    ) : null}
                                    {def?.priceCp ? (
                                      <span>
                                        {formatPriceCp(
                                          (def.priceCp ?? 0) * max,
                                        )}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                                {stackable || max > 1 ? (
                                  <Input
                                    className="w-16"
                                    type="number"
                                    min={1}
                                    max={max}
                                    value={qty}
                                    onChange={(e) =>
                                      setQtyByItem((prev) => ({
                                        ...prev,
                                        [item.id]: Math.min(
                                          max,
                                          Math.max(
                                            1,
                                            Number(e.target.value) || 1,
                                          ),
                                        ),
                                      }))
                                    }
                                    aria-label={`Quantidade de ${item.name}`}
                                  />
                                ) : null}
                                <Button
                                  size="sm"
                                  variant="accent"
                                  disabled={busyKey != null}
                                  onClick={() =>
                                    askGiveItem(holder.ref, item, max)
                                  }
                                >
                                  {busyKey === `item:${item.id}`
                                    ? '…'
                                    : 'Passar'}
                                </Button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  </Panel>
                )
              })}
            </div>
          )}
        </>
      )}

      {pending ? (
        <GiveTargetPicker
          title={pending.label}
          fromLabel={holderName(pending.from)}
          options={others(pending.from)}
          recentKey={recentDest}
          busy={busyKey != null}
          onPick={(to) => void confirmGive(to)}
          onClose={() => {
            if (busyKey == null) setPending(null)
          }}
        />
      ) : null}
    </div>
  )
}
