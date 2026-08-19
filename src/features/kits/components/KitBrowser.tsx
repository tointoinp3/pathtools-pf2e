import { useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ItemDefinition } from '@/types'
import {
  ADVENTURER_PACK_CONTENTS,
  ADVENTURER_PACK_ORIGINAL_NAME,
  CLASS_KITS,
  type ClassKitDefinition,
  type ClassKitItem,
} from '@/data/seeds/classKits'
import {
  ADVENTURING_KITS,
  type AdventuringKitDefinition,
} from '@/data/seeds/adventuringKits'
import { findItemByOriginalName } from '@/engine/equipmentCatalog'
import { formatBulk, formatPriceCp } from '@/engine/equipment'
import { formatCoinsCp, STARTING_WEALTH_CP } from '@/engine/startingWealth'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { useSlashSearch } from '@/utils/useSlashSearch'

type KitTab = 'class' | 'gear'

const TABS: Array<{ id: KitTab; label: string }> = [
  { id: 'class', label: 'Pacotes de classe' },
  { id: 'gear', label: 'Kits de aventura' },
]

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-accent bg-accent/20 text-accent'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

function itemLabel(entry: ClassKitItem): {
  name: string
  def: ItemDefinition | null
} {
  const def = findItemByOriginalName(entry.originalName)
  return { name: def?.name ?? entry.originalName, def }
}

function groupOf(def: ItemDefinition | null): 'armor' | 'weapon' | 'gear' {
  if (!def) return 'gear'
  if (def.category === 'armor') return 'armor'
  if (def.category === 'weapon' || def.category === 'ammunition') return 'weapon'
  return 'gear'
}

const GROUP_LABEL: Record<'armor' | 'weapon' | 'gear', string> = {
  armor: 'Armadura',
  weapon: 'Armas',
  gear: 'Equipamento',
}

function KitLine({
  entry,
  nested,
}: {
  entry: ClassKitItem
  nested?: boolean
}) {
  const { name, def } = itemLabel(entry)
  const qty = entry.quantity && entry.quantity > 1 ? `${entry.quantity}× ` : ''
  return (
    <li
      className={`flex flex-wrap items-baseline justify-between gap-2 py-1 ${
        nested ? 'text-[11px] text-text-muted' : 'text-sm text-text'
      }`}
    >
      <span>
        {qty}
        {name}
        {def && def.name !== entry.originalName ? (
          <span className="ml-1 text-[10px] text-text-dim">
            {entry.originalName}
          </span>
        ) : null}
      </span>
      {def ? (
        <span className="shrink-0 text-[11px] tabular-nums text-text-dim">
          {formatPriceCp(def.priceCp)} · Carga {formatBulk(def.bulk)}
        </span>
      ) : (
        <span className="shrink-0 text-[10px] text-text-dim">fora do catálogo</span>
      )}
    </li>
  )
}

function ContentsList({ items }: { items: ClassKitItem[] }) {
  return (
    <ul className="divide-y divide-border/40">
      {items.map((entry, i) => {
        const isPack =
          entry.originalName.toLowerCase() ===
          ADVENTURER_PACK_ORIGINAL_NAME.toLowerCase()
        return (
          <li key={`${entry.originalName}-${i}`}>
            <KitLine entry={entry} />
            {isPack ? (
              <ul className="mb-1 ml-3 border-l border-border/50 pl-3">
                {ADVENTURER_PACK_CONTENTS.map((piece, j) => (
                  <KitLine
                    key={`${piece.originalName}-${j}`}
                    entry={piece}
                    nested
                  />
                ))}
                <li className="py-0.5 text-[10px] text-text-dim">
                  Carga 1 no pacote inteiro — as peças não somam extra.
                </li>
              </ul>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

function ClassKitDetail({
  kit,
  onAdd,
  forYourClass,
}: {
  kit: ClassKitDefinition
  onAdd?: (kit: ClassKitDefinition) => void
  forYourClass?: boolean
}) {
  const grouped = useMemo(() => {
    const buckets: Record<'armor' | 'weapon' | 'gear', ClassKitItem[]> = {
      armor: [],
      weapon: [],
      gear: [],
    }
    for (const entry of kit.items) {
      buckets[groupOf(findItemByOriginalName(entry.originalName))].push(entry)
    }
    return (['armor', 'weapon', 'gear'] as const).filter(
      (g) => buckets[g].length > 0,
    ).map((g) => ({ group: g, items: buckets[g] }))
  }, [kit])

  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-wide text-text">
          {kit.name}
        </h2>
        <p className="mt-0.5 text-xs text-text-dim">
          {kit.originalName} · {kit.sourceBook} pg. {kit.sourcePage}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Badge>{formatCoinsCp(kit.priceCp)}</Badge>
        <Badge>Sobra {formatCoinsCp(kit.leftoverCp)}</Badge>
        <Badge>{kit.bulkLabel}</Badge>
        {forYourClass ? <Badge tone="info">Da sua classe</Badge> : null}
        {kit.suggested ? <Badge>Sem pacote oficial</Badge> : null}
      </div>
      <p className="text-xs text-text-muted">
        No 1º nível você tem {formatCoinsCp(STARTING_WEALTH_CP)}. Este pacote
        gasta o preço e deixa a sobra em moedas.
      </p>
      {grouped.map(({ group, items }) => (
        <div key={group}>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            {GROUP_LABEL[group]}
          </div>
          <ContentsList items={items} />
        </div>
      ))}
      {kit.optionsHint ? (
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Opções (comprar com a sobra)
          </div>
          <p className="text-sm text-text-muted">{kit.optionsHint}</p>
        </div>
      ) : null}
      {onAdd ? (
        <Button className="w-full" variant="accent" onClick={() => onAdd(kit)}>
          Colocar tudo no inventário
        </Button>
      ) : null}
      {kit.aonUrl ? (
        <a
          href={kit.aonUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-xs text-accent hover:underline"
        >
          Ver no Archives of Nethys
        </a>
      ) : (
        <p className="text-xs text-text-dim">
          Kit montado para a classe — o AoN Remaster não publica pacote rápido
          oficial (só os 15 po).
        </p>
      )}
    </div>
  )
}

function GearKitDetail({
  kit,
  onAdd,
}: {
  kit: AdventuringKitDefinition
  onAdd?: (kit: AdventuringKitDefinition) => void
}) {
  const catalog = findItemByOriginalName(kit.originalName)
  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-display text-xl font-semibold tracking-wide text-text">
          {kit.name}
        </h2>
        <p className="mt-0.5 text-xs text-text-dim">
          {kit.originalName} · {kit.sourceBook} pg. {kit.sourcePage}
        </p>
      </div>
      {catalog ? (
        <div className="flex flex-wrap gap-1.5">
          <Badge>{formatPriceCp(catalog.priceCp)}</Badge>
          <Badge>Carga {formatBulk(catalog.bulk)}</Badge>
          {catalog.level > 0 ? <Badge>nv. {catalog.level}</Badge> : null}
        </div>
      ) : null}
      <p className="text-sm text-text-muted">{kit.summary}</p>
      {kit.contents.length > 0 ? (
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            O que vem dentro
          </div>
          <ContentsList items={kit.contents} />
        </div>
      ) : null}
      {kit.contentsNote ? (
        <p className="text-xs text-text-dim">{kit.contentsNote}</p>
      ) : null}
      {onAdd && catalog ? (
        <Button className="w-full" variant="accent" onClick={() => onAdd(kit)}>
          Colocar no inventário
        </Button>
      ) : null}
      {catalog ? (
        <Link
          to="/compendio/equipamento"
          className="inline-block text-xs text-accent hover:underline"
        >
          Abrir no catálogo de equipamento
        </Link>
      ) : null}
    </div>
  )
}

interface KitBrowserProps {
  /** Pré-seleciona o kit da classe (ex.: vindo da ficha). */
  initialClassId?: string | null
  /** Na ficha: botão para jogar o kit no inventário. */
  mode?: 'browse' | 'pick'
  onPickClassKit?: (kit: ClassKitDefinition) => void
  onPickGearKit?: (kit: AdventuringKitDefinition) => void
}

export function KitBrowser({
  initialClassId = null,
  mode = 'browse',
  onPickClassKit,
  onPickGearKit,
}: KitBrowserProps) {
  const [tab, setTab] = useState<KitTab>('class')
  const [query, setQuery] = useState('')
  const [selectedClassId, setSelectedClassId] = useState<string | null>(
    initialClassId && CLASS_KITS.some((k) => k.classId === initialClassId)
      ? CLASS_KITS.find((k) => k.classId === initialClassId)!.id
      : CLASS_KITS[0]?.id ?? null,
  )
  const [selectedGearId, setSelectedGearId] = useState<string | null>(
    ADVENTURING_KITS[0]?.id ?? null,
  )
  const searchRef = useSlashSearch()

  const classList = useMemo(() => {
    const q = query.trim().toLowerCase()
    const filtered = !q
      ? CLASS_KITS
      : CLASS_KITS.filter(
          (k) =>
            k.name.toLowerCase().includes(q) ||
            k.originalName.toLowerCase().includes(q) ||
            k.items.some((i) => i.originalName.toLowerCase().includes(q)),
        )
    if (!initialClassId) return filtered
    return [...filtered].sort((a, b) => {
      const aMine = a.classId === initialClassId ? 0 : 1
      const bMine = b.classId === initialClassId ? 0 : 1
      return aMine - bMine
    })
  }, [query, initialClassId])

  const gearList = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return ADVENTURING_KITS
    return ADVENTURING_KITS.filter(
      (k) =>
        k.name.toLowerCase().includes(q) ||
        k.originalName.toLowerCase().includes(q) ||
        k.summary.toLowerCase().includes(q),
    )
  }, [query])

  const selectedClass =
    CLASS_KITS.find((k) => k.id === selectedClassId) ?? classList[0] ?? null
  const selectedGear =
    ADVENTURING_KITS.find((k) => k.id === selectedGearId) ??
    gearList[0] ??
    null

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-hidden">
      <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(8rem,1fr)_minmax(16rem,45%)] gap-3 overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(20rem,28rem)] lg:grid-rows-[auto_minmax(0,1fr)]">
        <div className="rounded-2xl border border-border/90 bg-surface-1 px-4 py-3 lg:col-start-1 lg:row-start-1">
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar kit, classe ou item… (/)"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TABS.map((t) => (
              <TabButton
                key={t.id}
                active={tab === t.id}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </TabButton>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-text-dim">
            {tab === 'class'
              ? `${classList.length} de ${CLASS_KITS.length}`
              : `${gearList.length} de ${ADVENTURING_KITS.length}`}
            {mode === 'pick'
              ? ' · clique no nome para ver o conteúdo; Adicionar coloca tudo no inventário'
              : ' · clique no nome para ver o conteúdo'}
          </p>
        </div>

        <ul className="min-h-0 overflow-y-auto rounded-2xl border border-border/90 bg-surface-1 p-2 lg:col-start-1 lg:row-start-2">
          {tab === 'class'
            ? classList.map((kit) => {
                const active = kit.id === selectedClass?.id
                const forYourClass = Boolean(
                  initialClassId && kit.classId === initialClassId,
                )
                return (
                  <li key={kit.id}>
                    <div
                      className={`mb-1 flex items-stretch gap-1 rounded-lg border ${
                        active
                          ? 'border-accent bg-accent/15'
                          : 'border-transparent hover:border-border hover:bg-surface-2'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedClassId(kit.id)}
                        className="min-w-0 flex-1 px-3 py-2 text-left"
                      >
                        <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-text">
                          {kit.name}
                          {forYourClass ? (
                            <Badge className="!text-[9px]" tone="info">
                              Da sua classe
                            </Badge>
                          ) : null}
                        </div>
                        <div className="text-[11px] text-text-dim">
                          {formatCoinsCp(kit.priceCp)} · sobra{' '}
                          {formatCoinsCp(kit.leftoverCp)} · {kit.sourceBook}
                        </div>
                      </button>
                      {mode === 'pick' && onPickClassKit ? (
                        <button
                          type="button"
                          className="shrink-0 rounded-r-lg px-2.5 text-[11px] font-semibold text-accent hover:bg-accent/20"
                          onClick={() => onPickClassKit(kit)}
                        >
                          Adicionar
                        </button>
                      ) : null}
                    </div>
                  </li>
                )
              })
            : gearList.map((kit) => {
                const active = kit.id === selectedGear?.id
                const catalog = findItemByOriginalName(kit.originalName)
                return (
                  <li key={kit.id}>
                    <div
                      className={`mb-1 flex items-stretch gap-1 rounded-lg border ${
                        active
                          ? 'border-accent bg-accent/15'
                          : 'border-transparent hover:border-border hover:bg-surface-2'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedGearId(kit.id)}
                        className="min-w-0 flex-1 px-3 py-2 text-left"
                      >
                        <div className="text-sm font-medium text-text">
                          {kit.name}
                        </div>
                        <div className="text-[11px] text-text-dim">
                          {catalog
                            ? `${formatPriceCp(catalog.priceCp)} · Carga ${formatBulk(catalog.bulk)}`
                            : kit.sourceBook}
                        </div>
                      </button>
                      {mode === 'pick' && onPickGearKit && catalog ? (
                        <button
                          type="button"
                          className="shrink-0 rounded-r-lg px-2.5 text-[11px] font-semibold text-accent hover:bg-accent/20"
                          onClick={() => onPickGearKit(kit)}
                        >
                          Adicionar
                        </button>
                      ) : null}
                    </div>
                  </li>
                )
              })}
          {tab === 'class' && classList.length === 0 ? (
            <li className="px-3 py-6 text-center text-xs text-text-dim">
              Nenhum pacote neste filtro.
            </li>
          ) : null}
          {tab === 'gear' && gearList.length === 0 ? (
            <li className="px-3 py-6 text-center text-xs text-text-dim">
              Nenhum kit neste filtro.
            </li>
          ) : null}
        </ul>

        <div className="flex min-h-0 flex-col overflow-hidden lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Panel
            className="min-h-0 flex-1 overflow-y-auto"
            bodyClassName="px-4 py-3"
          >
            {tab === 'class' && selectedClass ? (
              <ClassKitDetail
                kit={selectedClass}
                forYourClass={
                  Boolean(
                    initialClassId && selectedClass.classId === initialClassId,
                  )
                }
                onAdd={mode === 'pick' ? onPickClassKit : undefined}
              />
            ) : tab === 'gear' && selectedGear ? (
              <GearKitDetail
                kit={selectedGear}
                onAdd={mode === 'pick' ? onPickGearKit : undefined}
              />
            ) : (
              <p className="text-sm text-text-dim">
                Clique num kit à esquerda para ver o que vem dentro.
              </p>
            )}
          </Panel>
          <div className="mt-2 shrink-0">
            {tab === 'class' ? (
              <Tip>
                {initialClassId
                  ? 'O selo “Da sua classe” marca só o pacote do seu personagem. Os outros são de outras classes.'
                  : 'Classes sem pacote oficial no AoN (Magus, cinético, pistolero…) têm um kit montado até 15 po, no espírito do Player Core.'}
              </Tip>
            ) : (
              <Tip>
                Kits vestidos (curandeiro, ladrão, artesão) são um item só: o
                livro descreve o conteúdo, mas você não compra as peças
                separadas.
              </Tip>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function KitContentsPreview({
  kit,
}: {
  kit: ClassKitDefinition
}): ReactNode {
  return (
    <ul className="mt-1 space-y-0.5 text-[11px] text-text-muted">
      {kit.items.map((entry, i) => {
        const { name } = itemLabel(entry)
        const qty = entry.quantity && entry.quantity > 1 ? `${entry.quantity}× ` : ''
        return (
          <li key={`${entry.originalName}-${i}`}>
            {qty}
            {name}
          </li>
        )
      })}
    </ul>
  )
}
