import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  grantCatalogItemToHolder,
  holderKey,
  type HolderRef,
} from '@/engine/partyTransfer'
import { formatCoinsCp } from '@/engine/startingWealth'
import {
  useSelectableCharacters,
  useSelectableStashes,
} from '@/features/groups/useSelectableCharacters'
import { GiveTargetPicker } from '@/features/loot/components/GiveTargetPicker'
import {
  readLastLootHolder,
  writeLastLootHolder,
} from '@/engine/lootDelivery'
import { useCharacterStore } from '@/stores/characterStore'
import { useGroupStore } from '@/stores/groupStore'
import { useStashStore } from '@/stores/stashStore'
import type { ItemDefinition } from '@/types'

export function GrantCatalogItemButton({ item }: { item: ItemDefinition }) {
  const loadCharacters = useCharacterStore((s) => s.loadAll)
  const loadGroups = useGroupStore((s) => s.loadAll)
  const loadStashes = useStashStore((s) => s.loadAll)
  const characters = useSelectableCharacters()
  const stashes = useSelectableStashes()

  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(
    null,
  )
  const [recentKey, setRecentKey] = useState<string | null>(() => {
    const last = readLastLootHolder()
    return last ? holderKey(last) : null
  })

  useEffect(() => {
    void loadCharacters()
    void loadGroups()
    void loadStashes()
  }, [loadCharacters, loadGroups, loadStashes])

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

  async function openPicker() {
    setNotice(null)
    await Promise.all([loadCharacters(), loadGroups(), loadStashes()])
    setOpen(true)
  }

  async function grant(to: HolderRef) {
    setBusy(true)
    setNotice(null)
    try {
      const result = await grantCatalogItemToHolder({
        to,
        definition: item,
      })
      writeLastLootHolder(to)
      const key = holderKey(to)
      setRecentKey(key)
      setNotice({ ok: true, text: `Pronto: ${result.summary}` })
      setOpen(false)
    } catch (error) {
      setNotice({
        ok: false,
        text:
          error instanceof Error
            ? error.message
            : 'Não deu para adicionar o item.',
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-1.5">
      <Button
        size="sm"
        variant="accent"
        disabled={busy}
        onClick={() => void openPicker()}
      >
        Adicionar à ficha
      </Button>
      {notice ? (
        <p
          className={`text-xs ${notice.ok ? 'text-accent' : 'text-danger'}`}
        >
          {notice.text}
        </p>
      ) : (
        <p className="text-[11px] text-text-dim">
          Entra no inventário desequipado, numa ficha ou baú dos grupos ativos.
        </p>
      )}
      {open ? (
        options.length === 0 ? (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-4 sm:items-center"
            role="presentation"
            onClick={() => {
              if (!busy) setOpen(false)
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="grant-empty-title"
              className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface-1 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
              onClick={(event) => event.stopPropagation()}
            >
              <h2
                id="grant-empty-title"
                className="font-display text-lg font-semibold tracking-wide text-accent"
              >
                Adicionar à ficha
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                Nenhuma ficha ou baú nos grupos ativos. Crie uma ficha em
                Personagem ou ative um grupo.
              </p>
              <div className="mt-3 flex justify-end">
                <Button size="sm" onClick={() => setOpen(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <GiveTargetPicker
            title="Adicionar à ficha"
            fromLabel={item.name}
            options={options}
            recentKey={recentKey}
            busy={busy}
            onPick={(to) => void grant(to)}
            onClose={() => {
              if (!busy) setOpen(false)
            }}
          />
        )
      ) : null}
    </div>
  )
}
