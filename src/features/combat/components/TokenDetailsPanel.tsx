import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { CombatToken, LootTokenItem } from '@/types'
import type { LootHaul } from '@/types/loot'
import { Button } from '@/components/ui/Button'
import { Input, Label } from '@/components/ui/Field'
import {
  FACING_LABELS,
  applyDamage,
  applyHealing,
  oppositeFacing,
  rollInitiative,
  rotateFacing,
  tokenConditionEffects,
  tokenKind,
} from '@/engine/combat'
import { getCreatureById } from '@/engine/bestiaryCatalog'
import {
  applyCreatureVariant,
  creatureVariantQuery,
} from '@/engine/creatureVariant'
import { CONDITION_DEFINITIONS } from '@/data/seeds/conditions'
import { CreatureStatBlock } from '@/features/bestiary/components/CreatureStatBlock'
import { syncCharacterTokenPatch } from '@/features/combat/characterImport'
import { listHauls } from '@/features/loot/lootRepository'
import { useCombatStore } from '@/stores/combatStore'
import { createId } from '@/utils/id'
import { CharacterMiniStatBlock } from './CharacterMiniStatBlock'
import { TokenImageControl } from './TokenImageControl'

/** Condições comuns na mesa, para aplicar com um clique. */
const QUICK_CONDITIONS = [
  'Desprevenido',
  'Amedrontado 1',
  'Caído',
  'Agarrado',
  'Lentificado 1',
]

/** Campo numérico que só grava (e entra no Ctrl+Z) ao confirmar. */
function NumField({
  value,
  onCommit,
  min,
  max,
  className = '',
  ariaLabel,
}: {
  value: number
  onCommit: (next: number) => void
  min?: number
  max?: number
  className?: string
  ariaLabel?: string
}) {
  const [text, setText] = useState(String(value))
  useEffect(() => {
    setText(String(value))
  }, [value])

  function commit() {
    const parsed = Math.round(Number(text))
    if (!Number.isFinite(parsed)) {
      setText(String(value))
      return
    }
    const clamped = Math.min(
      max ?? Number.POSITIVE_INFINITY,
      Math.max(min ?? Number.NEGATIVE_INFINITY, parsed),
    )
    setText(String(clamped))
    if (clamped !== value) onCommit(clamped)
  }

  return (
    <Input
      type="number"
      aria-label={ariaLabel}
      className={className}
      value={text}
      min={min}
      max={max}
      onChange={(event) => setText(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') event.currentTarget.blur()
      }}
    />
  )
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
      {children}
    </h3>
  )
}

function formatGold(cp: number): string {
  return `${(cp / 100).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} po`
}

export function TokenDetailsPanel() {
  const session = useCombatStore((s) => s.current)
  const selectedTokenId = useCombatStore((s) => s.selectedTokenId)
  const updateToken = useCombatStore((s) => s.updateToken)
  const mutate = useCombatStore((s) => s.mutate)
  const preview = useCombatStore((s) => s.preview)
  const beginStroke = useCombatStore((s) => s.beginStroke)
  const endStroke = useCombatStore((s) => s.endStroke)
  const removeToken = useCombatStore((s) => s.removeToken)
  const duplicateToken = useCombatStore((s) => s.duplicateToken)
  const copySelected = useCombatStore((s) => s.copySelected)

  const [amountText, setAmountText] = useState('')
  const [conditionText, setConditionText] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemQty, setItemQty] = useState('1')
  const [hauls, setHauls] = useState<LootHaul[] | null>(null)
  const [showHauls, setShowHauls] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const token = session?.tokens.find((t) => t.id === selectedTokenId) ?? null
  const kind = token ? tokenKind(token) : null

  const creature = useMemo(() => {
    if (!token?.creatureId) return null
    const base = getCreatureById(token.creatureId)
    return base ? applyCreatureVariant(base, token.variant) : null
  }, [token?.creatureId, token?.variant])

  useEffect(() => {
    setAmountText('')
    setConditionText('')
    setItemName('')
    setItemQty('1')
    setShowHauls(false)
  }, [selectedTokenId])

  if (!session || !token) {
    return (
      <aside className="hidden w-72 shrink-0 border-l border-border bg-surface-1 p-4 xl:block">
        <p className="text-xs leading-relaxed text-text-dim">
          Clique em uma ficha do tabuleiro para ver PV, ações, tamanho,
          frente/costas, imagem e condições. Criaturas mostram a ficha completa
          do bestiário; baús mostram a lista de itens.
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-text-dim">
          Atalhos: arraste para mover · Ctrl+C/Ctrl+V copia e cola · Ctrl+Z
          desfaz · R gira a frente · Delete remove · setas movem · V/B/E/I
          trocam entre selecionar, pincel, borracha e conta-gotas · Ctrl+scroll
          dá zoom.
        </p>
      </aside>
    )
  }

  const info = tokenConditionEffects(token)

  function patchToken(patch: Partial<CombatToken>) {
    if (token) updateToken(token.id, patch)
  }

  async function handleSyncCharacter() {
    if (!token || syncing) return
    setSyncing(true)
    try {
      const patch = await syncCharacterTokenPatch(token)
      if (patch) updateToken(token.id, patch)
    } finally {
      setSyncing(false)
    }
  }

  function applyAmount(mode: 'damage' | 'heal') {
    const amount = Math.round(Number(amountText))
    if (!token || !Number.isFinite(amount) || amount <= 0) return
    mutate((s) => ({
      ...s,
      tokens: s.tokens.map((t) =>
        t.id === token.id
          ? mode === 'damage'
            ? applyDamage(t, amount)
            : applyHealing(t, amount)
          : t,
      ),
    }))
    setAmountText('')
  }

  function addCondition() {
    const name = conditionText.trim()
    if (!token || !name) return
    if (token.conditions.some((c) => c.toLowerCase() === name.toLowerCase())) {
      setConditionText('')
      return
    }
    patchToken({ conditions: [...token.conditions, name] })
    setConditionText('')
  }

  const lootItems = token.lootItems ?? []

  function addLootItem() {
    const name = itemName.trim()
    if (!token || !name) return
    const quantity = Math.max(1, Math.round(Number(itemQty)) || 1)
    patchToken({
      lootItems: [
        ...lootItems,
        { id: createId('loot-item'), name, quantity, taken: false },
      ],
    })
    setItemName('')
    setItemQty('1')
  }

  function patchLootItem(id: string, patch: Partial<LootTokenItem>) {
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
    if (!token) return
    const imported: LootTokenItem[] = haul.lines.map((line) => ({
      id: createId('loot-item'),
      name:
        line.kind === 'coins' && line.coinsCp != null
          ? `${line.name} (${formatGold(line.coinsCp)})`
          : line.name,
      quantity: Math.max(1, line.quantity),
      taken: false,
    }))
    patchToken({ lootItems: [...lootItems, ...imported] })
    setShowHauls(false)
  }

  const variantQuery = creatureVariantQuery(token.variant)
  const sheetHref =
    kind === 'creature' && token.creatureId
      ? `/bestiario/${token.creatureId}/sessao${variantQuery ? `?v=${variantQuery}` : ''}`
      : kind === 'character' && token.characterId
        ? `/personagens/${token.characterId}/sessao`
        : null

  const subtitle =
    kind === 'loot'
      ? `Baú · ${lootItems.length} ${lootItems.length === 1 ? 'item' : 'itens'}`
      : kind === 'character'
        ? `Jogador${token.level != null ? ` · Nível ${token.level}` : ''}${
            token.characterSummary?.className
              ? ` · ${token.characterSummary.className}`
              : ''
          }`
        : `${token.level != null ? `Nível ${token.level}` : 'Ficha avulsa'}${
            token.variant === 'elite'
              ? ' · Elite'
              : token.variant === 'weak'
                ? ' · Fraca'
                : ''
          }`

  return (
    <aside
      className={`flex shrink-0 flex-col overflow-y-auto border-l border-border bg-surface-1 p-3 ${
        (kind === 'creature' && creature) || kind === 'character'
          ? 'w-[30rem]'
          : 'w-72'
      }`}
    >
      {/* Nome */}
      <div>
        <Label>Nome</Label>
        <Input
          value={token.name}
          onFocus={beginStroke}
          onBlur={endStroke}
          onChange={(event) =>
            preview((s) => ({
              ...s,
              tokens: s.tokens.map((t) =>
                t.id === token.id ? { ...t, name: event.target.value } : t,
              ),
            }))
          }
        />
        <div className="mt-1 flex items-center justify-between text-[11px] text-text-dim">
          <span>{subtitle}</span>
          {sheetHref ? (
            <Link
              to={sheetHref}
              className="font-medium text-info hover:underline"
            >
              {kind === 'character' ? 'Ficha de sessão' : 'Abrir ficha'}
            </Link>
          ) : null}
        </div>
      </div>

      {/* Itens do baú */}
      {kind === 'loot' ? (
        <div className="mt-3 border-t border-border/60 pt-3">
          <SectionTitle>Itens</SectionTitle>
          {lootItems.length > 0 ? (
            <ul className="mb-2 space-y-1">
              {lootItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-1.5 py-1"
                >
                  <input
                    type="checkbox"
                    aria-label={`${item.name} pego`}
                    title="Marcar como pego"
                    checked={item.taken}
                    onChange={(event) =>
                      patchLootItem(item.id, { taken: event.target.checked })
                    }
                  />
                  <span
                    className={`min-w-0 flex-1 truncate text-xs ${
                      item.taken ? 'text-text-dim line-through' : 'text-text'
                    }`}
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  <input
                    type="number"
                    aria-label={`Quantidade de ${item.name}`}
                    className="field-control w-11 shrink-0 rounded-md border border-border bg-surface-1 px-1 py-0.5 text-center text-xs text-text outline-none"
                    value={item.quantity}
                    min={1}
                    onChange={(event) =>
                      patchLootItem(item.id, {
                        quantity: Math.max(
                          1,
                          Math.round(Number(event.target.value)) || 1,
                        ),
                      })
                    }
                  />
                  <button
                    type="button"
                    aria-label={`Remover ${item.name}`}
                    className="shrink-0 text-text-dim hover:text-danger"
                    onClick={() =>
                      patchToken({
                        lootItems: lootItems.filter((i) => i.id !== item.id),
                      })
                    }
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-2 text-[11px] text-text-dim">
              Baú vazio. Adicione itens abaixo ou importe um saque pronto.
            </p>
          )}

          <div className="flex gap-1.5">
            <Input
              aria-label="Nome do item"
              placeholder="Ex.: Poção de cura"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') addLootItem()
              }}
            />
            <Input
              type="number"
              aria-label="Quantidade"
              className="w-14 text-center"
              value={itemQty}
              min={1}
              onChange={(event) => setItemQty(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') addLootItem()
              }}
            />
            <Button size="sm" onClick={addLootItem}>
              +
            </Button>
          </div>

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
        </div>
      ) : null}

      {/* PV */}
      {kind !== 'loot' ? (
        <div className="mt-3 border-t border-border/60 pt-3">
          <SectionTitle>Pontos de vida</SectionTitle>
          <div className="flex items-center gap-1.5">
            <NumField
              ariaLabel="PV atual"
              className="text-center"
              value={token.currentHp}
              min={0}
              max={token.maxHp}
              onCommit={(next) =>
                patchToken({
                  currentHp: next,
                  defeated:
                    next === 0 ? true : next > 0 ? false : token.defeated,
                })
              }
            />
            <span className="text-sm text-text-dim">/</span>
            <NumField
              ariaLabel="PV máximo"
              className="text-center"
              value={token.maxHp}
              min={1}
              onCommit={(next) =>
                patchToken({
                  maxHp: next,
                  currentHp: Math.min(token.currentHp, next),
                })
              }
            />
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <Input
              type="number"
              aria-label="Quantidade de dano ou cura"
              placeholder="Qtd."
              className="w-16 text-center"
              value={amountText}
              min={0}
              onChange={(event) => setAmountText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applyAmount('damage')
              }}
            />
            <Button
              size="sm"
              variant="danger"
              className="flex-1"
              onClick={() => applyAmount('damage')}
            >
              Dano
            </Button>
            <Button
              size="sm"
              variant="accent"
              className="flex-1"
              onClick={() => applyAmount('heal')}
            >
              Cura
            </Button>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex-1">
              <Label>PV temp.</Label>
              <NumField
                ariaLabel="PV temporários"
                className="text-center"
                value={token.tempHp}
                min={0}
                onCommit={(next) => patchToken({ tempHp: next })}
              />
            </div>
            <div className="flex-1">
              <Label>CA</Label>
              <NumField
                ariaLabel="Classe de armadura"
                className="text-center"
                value={token.ac ?? 0}
                min={0}
                onCommit={(next) => patchToken({ ac: next })}
              />
              {info.acPenalty > 0 && token.ac != null ? (
                <p
                  className="mt-0.5 text-center text-[10px] font-medium text-info"
                  title="CA com as penalidades das condições aplicadas"
                >
                  Efetiva: {info.effectiveAc}
                </p>
              ) : null}
            </div>
          </div>
          <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs text-text-muted">
            <input
              type="checkbox"
              checked={token.defeated}
              onChange={(event) =>
                patchToken({ defeated: event.target.checked })
              }
            />
            Derrotada (sai da ordem de turnos)
          </label>
        </div>
      ) : null}

      {/* Ações */}
      {kind !== 'loot' ? (
        <div className="mt-3 border-t border-border/60 pt-3">
          <SectionTitle>Ações do turno</SectionTitle>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 3 + info.extraActions }, (_, i) => i).map(
              (i) => {
                const spent = i < token.actionsUsed
                return (
                  <button
                    key={i}
                    type="button"
                    title={
                      spent
                        ? 'Ação gasta (clique para devolver)'
                        : 'Gastar ação'
                    }
                    aria-pressed={spent}
                    className={`h-7 w-7 rounded-full border text-xs font-bold transition-colors ${
                      spent
                        ? 'border-border bg-surface-3 text-text-dim'
                        : i >= 3
                          ? 'border-info/60 bg-info/15 text-info'
                          : 'border-accent/60 bg-accent/20 text-accent'
                    }`}
                    onClick={() =>
                      patchToken({
                        actionsUsed: token.actionsUsed > i ? i : i + 1,
                      })
                    }
                  >
                    {i + 1}
                  </button>
                )
              },
            )}
            <button
              type="button"
              title="Reação"
              aria-pressed={token.reactionUsed}
              className={`ml-1 h-7 rounded-full border px-2.5 text-xs font-bold transition-colors ${
                token.reactionUsed
                  ? 'border-border bg-surface-3 text-text-dim line-through'
                  : 'border-info/60 bg-info/15 text-info'
              }`}
              onClick={() => patchToken({ reactionUsed: !token.reactionUsed })}
            >
              R
            </button>
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto"
              onClick={() => patchToken({ actionsUsed: 0, reactionUsed: false })}
            >
              Resetar
            </Button>
          </div>
          {info.actionLoss > 0 || info.extraActions > 0 ? (
            <p className="mt-1 text-[10px] font-medium text-info">
              Condições: começa o turno com {info.maxActions}{' '}
              {info.maxActions === 1 ? 'ação' : 'ações'}.
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Iniciativa */}
      {kind !== 'loot' ? (
        <div className="mt-3 border-t border-border/60 pt-3">
          <SectionTitle>Iniciativa</SectionTitle>
          <div className="flex items-center gap-1.5">
            <Input
              type="number"
              aria-label="Iniciativa"
              className="w-16 text-center"
              value={token.initiative ?? ''}
              placeholder="—"
              onChange={(event) => {
                const raw = event.target.value
                patchToken({
                  initiative:
                    raw.trim() === '' ? null : Math.round(Number(raw)),
                })
              }}
            />
            <Button
              size="sm"
              title={
                info.initiativePenalty > 0
                  ? `Bônus base ${token.initiativeBonus >= 0 ? '+' : ''}${token.initiativeBonus}, −${info.initiativePenalty} de condições`
                  : undefined
              }
              onClick={() =>
                patchToken({
                  initiative: rollInitiative(info.effectiveInitiativeBonus),
                })
              }
            >
              Rolar d20{info.effectiveInitiativeBonus >= 0 ? '+' : ''}
              {info.effectiveInitiativeBonus}
            </Button>
          </div>
        </div>
      ) : null}

      {/* Tamanho e frente */}
      <div className="mt-3 border-t border-border/60 pt-3">
        <SectionTitle>Tamanho no grid</SectionTitle>
        <div className="flex items-center gap-1.5">
          <NumField
            ariaLabel="Largura em células"
            className="w-14 text-center"
            value={token.w}
            min={1}
            max={session.gridCols}
            onCommit={(next) => patchToken({ w: next })}
          />
          <span className="text-xs text-text-dim">×</span>
          <NumField
            ariaLabel="Altura em células"
            className="w-14 text-center"
            value={token.h}
            min={1}
            max={session.gridRows}
            onCommit={(next) => patchToken({ h: next })}
          />
          <span className="text-[11px] text-text-dim">células</span>
        </div>
        {kind !== 'loot' ? (
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="text-[11px] leading-snug text-text-muted">
              <div>
                Frente:{' '}
                <span className="text-accent">
                  {FACING_LABELS[token.facing]}
                </span>
              </div>
              <div>
                Costas:{' '}
                <span className="text-danger">
                  {FACING_LABELS[oppositeFacing(token.facing)]}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              title="Gira a frente em sentido horário (tecla R)"
              onClick={() => patchToken({ facing: rotateFacing(token.facing) })}
            >
              Girar
            </Button>
          </div>
        ) : null}
      </div>

      {/* Imagem */}
      <div className="mt-3 border-t border-border/60 pt-3">
        <SectionTitle>Imagem</SectionTitle>
        <TokenImageControl token={token} />
      </div>

      {/* Condições */}
      {kind !== 'loot' ? (
        <div className="mt-3 border-t border-border/60 pt-3">
          <SectionTitle>Condições</SectionTitle>
          {token.conditions.length > 0 ? (
            <div className="mb-1.5 flex flex-wrap gap-1">
              {token.conditions.map((condition) => (
                <span
                  key={condition}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[11px] text-text"
                >
                  {condition}
                  <button
                    type="button"
                    aria-label={`Remover ${condition}`}
                    className="text-text-dim hover:text-danger"
                    onClick={() =>
                      patchToken({
                        conditions: token.conditions.filter(
                          (c) => c !== condition,
                        ),
                      })
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          ) : null}
          <div className="flex gap-1.5">
            <Input
              aria-label="Nova condição"
              placeholder="Ex.: Agarrado 1"
              list="combat-conditions-list"
              value={conditionText}
              onChange={(event) => setConditionText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') addCondition()
              }}
            />
            <Button size="sm" onClick={addCondition}>
              +
            </Button>
          </div>
          <datalist id="combat-conditions-list">
            {CONDITION_DEFINITIONS.map((definition) => (
              <option key={definition.id} value={definition.name} />
            ))}
          </datalist>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {QUICK_CONDITIONS.filter(
              (quick) =>
                !token.conditions.some(
                  (c) => c.toLowerCase() === quick.toLowerCase(),
                ),
            ).map((quick) => (
              <button
                key={quick}
                type="button"
                className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] text-text-dim transition-colors hover:border-info/60 hover:text-info"
                onClick={() =>
                  patchToken({ conditions: [...token.conditions, quick] })
                }
              >
                + {quick}
              </button>
            ))}
          </div>
          {info.lines.length > 0 ? (
            <div className="mt-2 rounded-lg border border-info/40 bg-info/10 px-2.5 py-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-info">
                Efeitos automáticos
              </p>
              <ul className="mt-1 space-y-0.5 text-[11px] leading-snug text-text-muted">
                {info.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {info.unknown.length > 0 ? (
            <p className="mt-1.5 text-[10px] leading-snug text-text-dim">
              Sem cálculo automático: {info.unknown.join(', ')}.
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Notas */}
      <div className="mt-3 border-t border-border/60 pt-3">
        <SectionTitle>Notas</SectionTitle>
        <textarea
          aria-label="Notas da ficha"
          className="field-control min-h-16 w-full resize-y rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-sm text-text placeholder:text-text-dim outline-none"
          placeholder={
            kind === 'loot'
              ? 'Ex.: trancado, chave com o capitão'
              : 'Ex.: guarda o portão norte'
          }
          value={token.notes}
          onFocus={beginStroke}
          onBlur={endStroke}
          onChange={(event) =>
            preview((s) => ({
              ...s,
              tokens: s.tokens.map((t) =>
                t.id === token.id ? { ...t, notes: event.target.value } : t,
              ),
            }))
          }
        />
      </div>

      {/* Ações da ficha */}
      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
        <Button size="sm" onClick={() => duplicateToken(token.id)}>
          Duplicar
        </Button>
        <Button size="sm" variant="ghost" title="Ctrl+C" onClick={copySelected}>
          Copiar
        </Button>
        <Button
          size="sm"
          variant="danger"
          className="ml-auto"
          title="Delete"
          onClick={() => removeToken(token.id)}
        >
          Remover
        </Button>
      </div>

      {/* Ficha completa do bestiário */}
      {kind === 'creature' && creature ? (
        <div className="mt-3 border-t border-border/60 pt-3">
          <SectionTitle>Ficha do bestiário</SectionTitle>
          <CreatureStatBlock creature={creature} />
        </div>
      ) : null}

      {/* Ficha resumida do jogador */}
      {kind === 'character' ? (
        <div className="mt-3 border-t border-border/60 pt-3">
          <div className="mb-1.5 flex items-center justify-between">
            <SectionTitle>Ficha do jogador</SectionTitle>
            <Button
              size="sm"
              variant="ghost"
              disabled={syncing}
              title="Recalcula nível, PV máximo, CA, salvaguardas, perícias e golpes a partir da ficha atual do personagem"
              onClick={() => void handleSyncCharacter()}
            >
              {syncing ? 'Sincronizando…' : '⟳ Sincronizar'}
            </Button>
          </div>
          {token.characterSummary ? (
            <CharacterMiniStatBlock token={token} />
          ) : (
            <p className="text-[11px] leading-relaxed text-text-dim">
              Este token foi importado antes da ficha resumida existir. Clique
              em “Sincronizar” para carregar atributos, perícias e golpes.
            </p>
          )}
        </div>
      ) : null}
    </aside>
  )
}
