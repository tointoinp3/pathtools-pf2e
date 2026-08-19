import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { MultiFilter } from '@/components/ui/MultiFilter'
import { Panel, Tip } from '@/components/ui/Panel'
import { formatPriceCp } from '@/engine/equipment'
import {
  generateLootLines,
  haulAsPlainText,
  haulTotalCp,
  isConsumableDefinition,
  rerollLootLine,
  threatLabel,
} from '@/engine/lootGenerator'
import {
  deliverLootToHolder,
  isLootLineClaimed,
  markLinesClaimed,
  readLastLootHolder,
  unclaimLine,
} from '@/engine/lootDelivery'
import { formatCoinsCp } from '@/engine/startingWealth'
import { ActiveGroupsBar } from '@/features/groups/ActiveGroupsBar'
import {
  useSelectableCharacters,
  useSelectableStashes,
} from '@/features/groups/useSelectableCharacters'
import { holderKey, parseHolderKey } from '@/engine/partyTransfer'
import {
  ITEM_CATEGORY_LABELS,
  type EncounterThreat,
  type ItemCategory,
  type ItemDefinition,
  type LootKind,
  type LootLine,
  type Rarity,
} from '@/types'
import { useCharacterStore } from '@/stores/characterStore'
import { useEquipmentStore } from '@/stores/equipmentStore'
import { useGroupStore } from '@/stores/groupStore'
import { useLootStore } from '@/stores/lootStore'
import { useStashStore } from '@/stores/stashStore'
import { RARITY_FILTER_OPTIONS } from '@/utils/labels'
import { useDocumentTitle } from '@/utils/useDocumentTitle'
import { clearPendingLootCreate } from '@/features/loot/lootRepository'
import { createId } from '@/utils/id'

const KIND_OPTIONS: Array<{ id: LootKind; label: string; hint: string }> = [
  {
    id: 'encounter',
    label: 'Encontro',
    hint: 'Uma fatia do tesouro do nível, boa para um combate ou um baú.',
  },
  {
    id: 'level',
    label: 'Tesouro do nível',
    hint: 'Tabela do GM Core para o grupo inteiro subir de nível.',
  },
  {
    id: 'custom',
    label: 'Livre',
    hint: 'Você escolhe quantos itens; o app sorteia no catálogo.',
  },
]

const THREAT_OPTIONS: EncounterThreat[] = [
  'low',
  'moderate',
  'severe',
  'extreme',
]

const CATEGORY_FILTER_OPTIONS = (
  Object.keys(ITEM_CATEGORY_LABELS) as ItemCategory[]
).map((value) => ({ value, label: ITEM_CATEGORY_LABELS[value] }))

type SortMode = 'default' | 'name' | 'value' | 'level'

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        selected
          ? 'border-accent bg-accent/20 text-accent'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function lineFromCatalog(item: ItemDefinition): LootLine {
  return {
    id: createId('loot-line'),
    kind: 'item',
    role: isConsumableDefinition(item) ? 'consumable' : 'permanent',
    definitionId: item.id,
    name: item.name,
    originalName: item.originalName,
    quantity: 1,
    slotLevel: item.level,
    level: item.level,
    category: item.category,
    rarity: item.rarity,
    priceCp: item.priceCp ?? null,
  }
}

export function LootEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { current, loading, loadOne, updateCurrent } = useLootStore()
  const items = useEquipmentStore((s) => s.items)
  const loadEquipment = useEquipmentStore((s) => s.loadAll)
  const characters = useSelectableCharacters()
  const stashes = useSelectableStashes()
  const loadCharacters = useCharacterStore((s) => s.loadAll)
  const loadStashes = useStashStore((s) => s.loadAll)
  const loadGroups = useGroupStore((s) => s.loadAll)
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [openLineId, setOpenLineId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set())
  const [targetId, setTargetId] = useState('')
  const [removeAfterGive, setRemoveAfterGive] = useState(false)
  const [hideClaimed, setHideClaimed] = useState(false)
  const [resultQuery, setResultQuery] = useState('')
  const [sortMode, setSortMode] = useState<SortMode>('default')
  const [addQuery, setAddQuery] = useState('')
  const [giving, setGiving] = useState(false)
  const [feedback, setFeedback] = useState<{
    ok: boolean
    text: string
    characterId?: string
  } | null>(null)

  useEffect(() => {
    clearPendingLootCreate()
    void loadEquipment()
    void loadCharacters()
    void loadGroups()
    void loadStashes()
  }, [loadEquipment, loadCharacters, loadGroups, loadStashes])

  useEffect(() => {
    if (!id) return
    void loadOne(id).then((haul) => {
      if (!haul) navigate('/saques', { replace: true })
    })
  }, [id, loadOne, navigate])

  const holderOptions = useMemo(() => {
    const stashOpts = stashes.map((stash) => ({
      key: holderKey({ kind: 'stash', id: stash.id }),
      label: `Baú · ${stash.name}`,
    }))
    const charOpts = characters.map((character) => ({
      key: holderKey({ kind: 'character', id: character.id }),
      label: `${character.name} · nv. ${character.level}`,
    }))
    return [...stashOpts, ...charOpts]
  }, [characters, stashes])

  useEffect(() => {
    if (holderOptions.length === 0) return
    if (targetId && holderOptions.some((opt) => opt.key === targetId)) return
    const last = readLastLootHolder()
    const lastKey = last ? holderKey(last) : ''
    const match = holderOptions.some((opt) => opt.key === lastKey)
      ? lastKey
      : (holderOptions[0]?.key ?? '')
    if (match) setTargetId(match)
  }, [holderOptions, targetId])

  const haul = current?.id === id ? current : null
  useDocumentTitle(haul?.name)
  const totalCp = useMemo(
    () => (haul ? haulTotalCp(haul.lines) : 0),
    [haul],
  )
  const itemLines = haul?.lines.filter((line) => line.kind === 'item') ?? []

  const visibleLines = useMemo(() => {
    if (!haul) return []
    const q = normalize(resultQuery.trim())
    let next = haul.lines.filter((line) => {
      if (hideClaimed && isLootLineClaimed(line)) return false
      if (!q) return true
      return normalize(
        `${line.name} ${line.originalName ?? ''} ${line.claimedByName ?? ''}`,
      ).includes(q)
    })
    if (sortMode === 'name') {
      next = [...next].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    } else if (sortMode === 'value') {
      next = [...next].sort(
        (a, b) =>
          (b.kind === 'coins' ? (b.coinsCp ?? 0) : (b.priceCp ?? 0) * b.quantity) -
          (a.kind === 'coins' ? (a.coinsCp ?? 0) : (a.priceCp ?? 0) * a.quantity),
      )
    } else if (sortMode === 'level') {
      next = [...next].sort((a, b) => (b.level ?? -1) - (a.level ?? -1))
    }
    return next
  }, [haul, hideClaimed, resultQuery, sortMode])

  const catalogMatches = useMemo(() => {
    const q = normalize(addQuery.trim())
    if (q.length < 2) return []
    return items
      .filter(
        (item) =>
          normalize(item.name).includes(q) ||
          normalize(item.originalName).includes(q),
      )
      .slice(0, 8)
  }, [addQuery, items])

  const selectedLines =
    haul?.lines.filter((line) => selectedIds.has(line.id)) ?? []

  async function patch(partial: Partial<NonNullable<typeof haul>>) {
    if (!haul) return
    await updateCurrent(partial)
  }

  async function sortear() {
    if (!haul) return
    const claimed = haul.lines.filter(isLootLineClaimed).length
    if (
      claimed > 0 &&
      !window.confirm(
        `Este baú tem ${claimed} peça(s) já entregue(s). Sortear de novo apaga isso. Continuar?`,
      )
    ) {
      return
    }
    await loadEquipment()
    const catalog = useEquipmentStore.getState().items
    const lines = generateLootLines(catalog, haul)
    setSelectedIds(new Set())
    setFeedback(null)
    await updateCurrent({ lines })
  }

  async function reroll(line: LootLine) {
    if (!haul) return
    if (
      isLootLineClaimed(line) &&
      !window.confirm(
        `“${line.name}” já foi para ${line.claimedByName}. Trocar mesmo assim?`,
      )
    ) {
      return
    }
    await loadEquipment()
    const catalog = useEquipmentStore.getState().items
    const nextLine = rerollLootLine(catalog, haul, line)
    await updateCurrent({
      lines: haul.lines.map((entry) =>
        entry.id === line.id ? unclaimLine(nextLine) : entry,
      ),
    })
  }

  async function removeLine(lineId: string) {
    if (!haul) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.delete(lineId)
      return next
    })
    await updateCurrent({
      lines: haul.lines.filter((line) => line.id !== lineId),
    })
  }

  async function bumpQuantity(line: LootLine, delta: number) {
    if (!haul || line.kind !== 'item') return
    const quantity = Math.max(1, line.quantity + delta)
    await updateCurrent({
      lines: haul.lines.map((entry) =>
        entry.id === line.id ? { ...entry, quantity } : entry,
      ),
    })
  }

  async function copyList() {
    if (!haul) return
    try {
      await navigator.clipboard.writeText(haulAsPlainText(haul))
      setCopyState('ok')
    } catch {
      setCopyState('fail')
    }
    window.setTimeout(() => setCopyState('idle'), 1600)
  }

  function toggleSelected(lineId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(lineId)) next.delete(lineId)
      else next.add(lineId)
      return next
    })
  }

  function selectVisibleUnclaimed() {
    setSelectedIds(
      new Set(
        visibleLines.filter((line) => !isLootLineClaimed(line)).map((line) => line.id),
      ),
    )
  }

  async function addCatalogItem(item: ItemDefinition) {
    if (!haul) return
    const line = lineFromCatalog(item)
    await updateCurrent({ lines: [...haul.lines, line] })
    setSelectedIds((prev) => new Set(prev).add(line.id))
    setAddQuery('')
  }

  async function giveSelected() {
    if (!haul || selectedLines.length === 0 || !targetId) return
    const already = selectedLines.filter(isLootLineClaimed)
    if (
      already.length > 0 &&
      !window.confirm(
        `${already.length} peça(s) já tinham dono. Enviar de novo para o inventário?`,
      )
    ) {
      return
    }
    setGiving(true)
    setFeedback(null)
    try {
      const holder = parseHolderKey(targetId)
      if (!holder) throw new Error('Escolha um destino.')
      const result = await deliverLootToHolder(
        holder,
        selectedLines,
        haul.name,
      )
      const nextLines = markLinesClaimed(
        haul.lines,
        selectedIds,
        {
          id: holder.id,
          name: result.holderName,
        },
        removeAfterGive,
      )
      await updateCurrent({ lines: nextLines })
      setSelectedIds(new Set())
      const bits: string[] = []
      if (result.itemCount > 0) {
        bits.push(
          `${result.itemCount} ${result.itemCount === 1 ? 'item' : 'itens'}`,
        )
      }
      if (result.coinsCp > 0) {
        bits.push(formatCoinsCp(result.coinsCp))
      }
      const missing = result.missingNames.length
        ? ` Faltou no catálogo: ${result.missingNames.join(', ')}.`
        : ''
      setFeedback({
        ok: true,
        characterId: result.characterId,
        text: `${bits.join(' e ') || 'Nada'} para ${result.holderName}.${missing}`,
      })
    } catch (error) {
      setFeedback({
        ok: false,
        text:
          error instanceof Error
            ? error.message
            : 'Não deu para enviar ao inventário.',
      })
    } finally {
      setGiving(false)
    }
  }

  async function releaseLine(line: LootLine) {
    if (!haul) return
    await updateCurrent({
      lines: haul.lines.map((entry) =>
        entry.id === line.id ? unclaimLine(entry) : entry,
      ),
    })
  }

  if (loading && !haul) {
    return <div className="p-5 text-sm text-text-muted">Carregando saque…</div>
  }

  if (!haul) {
    return null
  }

  const claimed = haul.lines.filter(isLootLineClaimed).length

  return (
    <div className="mx-auto max-w-5xl animate-fade-up space-y-3 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to="/saques"
            className="text-[11px] text-text-dim hover:text-accent"
          >
            ← Meus saques
          </Link>
          <span className="mx-1.5 text-[11px] text-text-dim">·</span>
          <Link
            to="/saques/mesa"
            className="text-[11px] text-text-dim hover:text-accent"
          >
            Inventário da mesa
          </Link>
          <Input
            className="mt-2 font-display text-xl font-semibold tracking-wide"
            value={haul.name}
            onChange={(e) => void patch({ name: e.target.value })}
            aria-label="Nome do saque"
          />
          <p className="mt-1 text-sm text-text-muted">
            Sorteio com os equipamentos oficiais e homebrew já cadastrados.
            {claimed > 0
              ? ` ${claimed} de ${haul.lines.length} já foram entregues.`
              : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="accent" onClick={() => void sortear()}>
            {haul.lines.length === 0 ? 'Sortear saque' : 'Sortear de novo'}
          </Button>
          <Button
            onClick={() => void copyList()}
            disabled={haul.lines.length === 0}
          >
            {copyState === 'ok'
              ? 'Copiado'
              : copyState === 'fail'
                ? 'Não deu'
                : 'Copiar lista'}
          </Button>
        </div>
      </div>

      <ActiveGroupsBar />

      <Tip>
        Marque as peças e mande para uma ficha ou para o baú compartilhado —
        entram desequipadas, com uma nota do saque. Consumíveis iguais
        empilham. Tesouro do nível segue o GM Core; encontro é uma fatia.
      </Tip>

      <Panel
        title="Como gerar"
        subtitle="Nível, tamanho do grupo e o que entra no baú"
        collapsible
        defaultOpen={haul.lines.length === 0}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nível do grupo">
            <Select
              value={String(haul.partyLevel)}
              onChange={(e) =>
                void patch({ partyLevel: Number(e.target.value) })
              }
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => (
                <option key={level} value={level}>
                  Nível {level}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Personagens">
            <Select
              value={String(haul.partySize)}
              onChange={(e) =>
                void patch({ partySize: Number(e.target.value) })
              }
            >
              {Array.from({ length: 7 }, (_, i) => i + 2).map((size) => (
                <option key={size} value={size}>
                  {size} personagens
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="mt-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Tipo
          </div>
          <div className="flex flex-wrap gap-1.5">
            {KIND_OPTIONS.map((option) => (
              <Chip
                key={option.id}
                selected={haul.kind === option.id}
                onClick={() => void patch({ kind: option.id })}
              >
                {option.label}
              </Chip>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-text-dim">
            {KIND_OPTIONS.find((option) => option.id === haul.kind)?.hint}
          </p>
        </div>

        {haul.kind === 'encounter' && (
          <div className="mt-3">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
              Importância do encontro
            </div>
            <div className="flex flex-wrap gap-1.5">
              {THREAT_OPTIONS.map((threat) => (
                <Chip
                  key={threat}
                  selected={haul.encounterThreat === threat}
                  onClick={() => void patch({ encounterThreat: threat })}
                >
                  {threatLabel(threat)}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {haul.kind === 'custom' && (
          <div className="mt-3 max-w-xs">
            <Field
              label="Quantos itens"
              hint="O sorteio mistura permanentes e consumíveis."
            >
              <Input
                type="number"
                min={1}
                max={30}
                value={haul.customItemCount}
                onChange={(e) =>
                  void patch({
                    customItemCount: Math.min(
                      30,
                      Math.max(1, Number(e.target.value) || 1),
                    ),
                  })
                }
              />
            </Field>
          </div>
        )}

        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <MultiFilter
            label="Categoria"
            options={CATEGORY_FILTER_OPTIONS}
            selected={haul.categories}
            onChange={(categories) => void patch({ categories })}
            emptyLabel="Todas"
          />
          <MultiFilter
            label="Raridade"
            options={RARITY_FILTER_OPTIONS}
            selected={haul.rarities}
            onChange={(rarities: Rarity[]) => void patch({ rarities })}
            emptyLabel="Todas"
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Chip
            selected={haul.includeCoins}
            onClick={() => void patch({ includeCoins: !haul.includeCoins })}
          >
            Incluir moedas
          </Chip>
          <Chip
            selected={haul.includeHomebrew}
            onClick={() =>
              void patch({ includeHomebrew: !haul.includeHomebrew })
            }
          >
            Incluir homebrew
          </Chip>
        </div>
      </Panel>

      <Panel
        title="Resultado"
        subtitle={
          haul.lines.length === 0
            ? 'Ainda vazio — aperte Sortear saque'
            : `${itemLines.length} item(ns)${
                totalCp > 0 ? ` · ${formatPriceCp(totalCp)}` : ''
              }`
        }
      >
        {haul.lines.length === 0 ? (
          <p className="text-sm text-text-dim">
            Nada sorteado ainda. O gerador só usa itens que já existem no
            equipamento.
          </p>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Input
                type="search"
                className="min-w-[10rem] flex-1"
                placeholder="Buscar no saque…"
                value={resultQuery}
                onChange={(e) => setResultQuery(e.target.value)}
                aria-label="Buscar no saque"
              />
              <Select
                className="w-40"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                aria-label="Ordenar saque"
              >
                <option value="default">Ordem do sorteio</option>
                <option value="name">Nome</option>
                <option value="value">Valor</option>
                <option value="level">Nível</option>
              </Select>
              <Chip
                selected={hideClaimed}
                onClick={() => setHideClaimed((v) => !v)}
              >
                Ocultar entregues
              </Chip>
              <FilterCount
                shown={visibleLines.length}
                total={haul.lines.length}
              />
            </div>

            <div className="rounded-xl border border-border bg-surface-2/40 px-3 py-2.5">
              <div className="flex flex-wrap items-end gap-2">
                <Field label="Enviar para" className="min-w-[12rem] flex-1">
                  {holderOptions.length === 0 ? (
                    <p className="text-xs text-text-dim">
                      Nenhum destino ainda.{' '}
                      <Link to="/personagens/novo" className="text-accent hover:underline">
                        Criar personagem
                      </Link>
                    </p>
                  ) : (
                    <Select
                      value={targetId}
                      onChange={(e) => setTargetId(e.target.value)}
                    >
                      {holderOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}
                </Field>
                <Button
                  size="sm"
                  onClick={selectVisibleUnclaimed}
                  disabled={visibleLines.every(isLootLineClaimed)}
                >
                  Selecionar restantes
                </Button>
                <Button
                  size="sm"
                  onClick={() => setSelectedIds(new Set())}
                  disabled={selectedIds.size === 0}
                >
                  Limpar
                </Button>
                <Button
                  size="sm"
                  variant="accent"
                  disabled={
                    giving || selectedIds.size === 0 || !targetId || holderOptions.length === 0
                  }
                  onClick={() => void giveSelected()}
                >
                  {giving
                    ? 'Enviando…'
                    : selectedIds.size === 0
                      ? 'Adicionar ao inventário'
                      : `Adicionar ${selectedIds.size} ao inventário`}
                </Button>
              </div>
              <label className="mt-2 flex items-center gap-2 text-[11px] text-text-dim">
                <input
                  type="checkbox"
                  className="accent-[var(--color-accent)]"
                  checked={removeAfterGive}
                  onChange={(e) => setRemoveAfterGive(e.target.checked)}
                />
                Tirar do baú depois de enviar
              </label>
              {feedback ? (
                <p
                  className={`mt-2 text-xs ${
                    feedback.ok ? 'text-accent' : 'text-danger'
                  }`}
                >
                  {feedback.text}{' '}
                  {feedback.ok && feedback.characterId ? (
                    <Link
                      to={`/personagens/${feedback.characterId}`}
                      className="underline hover:no-underline"
                    >
                      Abrir ficha
                    </Link>
                  ) : null}
                </p>
              ) : (
                <p className="mt-2 text-[11px] text-text-dim">
                  {selectedIds.size === 0
                    ? 'Marque uma ou mais peças (itens e moedas).'
                    : `${selectedIds.size} selecionado(s). Entram no inventário, sem equipar.`}
                </p>
              )}
            </div>

            {visibleLines.length === 0 ? (
              <p className="text-sm text-text-dim">
                Nada neste filtro.{' '}
                <button
                  type="button"
                  className="text-accent hover:underline"
                  onClick={() => {
                    setResultQuery('')
                    setHideClaimed(false)
                  }}
                >
                  Mostrar tudo
                </button>
              </p>
            ) : (
              <ul className="divide-y divide-border/50">
                {visibleLines.map((line) => {
                  const open = openLineId === line.id
                  const claimedLine = isLootLineClaimed(line)
                  const item = line.definitionId
                    ? items.find((entry) => entry.id === line.definitionId)
                    : undefined
                  return (
                    <li
                      key={line.id}
                      className={`py-2.5 ${claimedLine ? 'opacity-70' : ''}`}
                    >
                      <div className="flex flex-wrap items-start gap-2">
                        <label className="mt-1 shrink-0">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-[var(--color-accent)]"
                            checked={selectedIds.has(line.id)}
                            onChange={() => toggleSelected(line.id)}
                            aria-label={`Selecionar ${line.name}`}
                          />
                        </label>
                        <button
                          type="button"
                          className="min-w-0 flex-1 text-left"
                          onClick={() =>
                            setOpenLineId((currentId) =>
                              currentId === line.id ? null : line.id,
                            )
                          }
                        >
                          <div className="font-medium text-text">
                            {line.name}
                            {line.kind === 'item' && line.quantity > 1
                              ? ` ×${line.quantity}`
                              : ''}
                          </div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-text-dim">
                            {line.kind === 'coins' ? (
                              <span>{formatPriceCp(line.coinsCp)}</span>
                            ) : (
                              <>
                                {line.level != null ? (
                                  <span>Nv. {line.level}</span>
                                ) : null}
                                {line.category ? (
                                  <span>
                                    {ITEM_CATEGORY_LABELS[line.category]}
                                  </span>
                                ) : null}
                                {line.rarity ? (
                                  <RarityBadge rarity={line.rarity} />
                                ) : null}
                                {line.role === 'consumable' ? (
                                  <Badge>Consumível</Badge>
                                ) : null}
                                <span>
                                  {formatPriceCp(
                                    (line.priceCp ?? 0) * line.quantity,
                                  )}
                                </span>
                              </>
                            )}
                            {claimedLine ? (
                              <Badge tone="accent">
                                {line.claimedByName ?? 'Entregue'}
                              </Badge>
                            ) : null}
                          </div>
                        </button>
                        <div className="flex flex-wrap gap-1">
                          {line.kind === 'item' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => void bumpQuantity(line, -1)}
                              >
                                −
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => void bumpQuantity(line, 1)}
                              >
                                +
                              </Button>
                            </>
                          )}
                          {claimedLine ? (
                            <Button
                              size="sm"
                              onClick={() => void releaseLine(line)}
                            >
                              Liberar
                            </Button>
                          ) : null}
                          <Button size="sm" onClick={() => void reroll(line)}>
                            Trocar
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => void removeLine(line.id)}
                          >
                            Tirar
                          </Button>
                        </div>
                      </div>
                      {open && item?.description ? (
                        <p className="mt-2 ml-6 whitespace-pre-line text-[12px] leading-relaxed text-text-muted">
                          {item.description}
                        </p>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            )}

            <div className="border-t border-border/50 pt-3">
              <Field
                label="Acrescentar item do catálogo"
                hint="Busque pelo nome e clique para colocar no baú."
              >
                <Input
                  value={addQuery}
                  onChange={(e) => setAddQuery(e.target.value)}
                  placeholder="Ex.: poção, espada, runa…"
                />
              </Field>
              {catalogMatches.length > 0 && (
                <ul className="mt-1.5 max-h-48 overflow-y-auto rounded-lg border border-border/70 bg-surface-2/50">
                  {catalogMatches.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 px-2.5 py-1.5 text-left text-xs hover:bg-accent/10"
                        onClick={() => void addCatalogItem(item)}
                      >
                        <span>
                          <span className="font-medium text-text">{item.name}</span>
                          <span className="ml-1.5 text-text-dim">
                            nv. {item.level} · {ITEM_CATEGORY_LABELS[item.category]}
                          </span>
                        </span>
                        <span className="text-text-dim">
                          {formatPriceCp(item.priceCp)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Panel>

      <Panel title="Notas da mesa" collapsible defaultOpen={false}>
        <Textarea
          value={haul.notes}
          onChange={(e) => void patch({ notes: e.target.value })}
          placeholder="Onde estava o baú, quem guarda, o que a mesa já pegou…"
        />
      </Panel>
    </div>
  )
}
