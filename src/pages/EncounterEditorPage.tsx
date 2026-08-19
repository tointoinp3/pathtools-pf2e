import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { MultiFilter } from '@/components/ui/MultiFilter'
import { Panel, Tip } from '@/components/ui/Panel'
import {
  listCreatureFamilies,
} from '@/engine/bestiaryCatalog'
import {
  COMBAT_THREATS,
  ENCOUNTER_SHAPES,
  combatThreatLabel,
  encounterAsPlainText,
  creatureEncounterXp,
  encounterLinesXp,
  encounterShapeLabel,
  encounterXpBudget,
  generateEncounterLines,
  lineFromCreature,
  refreshEncounterLines,
  rerollEncounterLine,
  resolveEncounterShape,
} from '@/engine/encounterGenerator'
import { creatureVariantQuery } from '@/engine/creatureVariant'
import { formatCreatureLevel } from '@/features/bestiary/formatCreature'
import { TraitIncludeFilter } from '@/features/encounters/TraitIncludeFilter'
import { clearPendingEncounterCreate } from '@/features/encounters/encounterRepository'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { useEncounterStore } from '@/stores/encounterStore'
import { useCreatureStore } from '@/stores/creatureStore'
import type { CreaturePowerVariant, EncounterLine, EncounterShape, Rarity } from '@/types'
import { RARITY_FILTER_OPTIONS, RARITY_LABELS } from '@/utils/labels'
import { useDocumentTitle } from '@/utils/useDocumentTitle'

const VARIANT_OPTIONS: Array<{ id: CreaturePowerVariant; label: string }> = [
  { id: 'normal', label: 'Normal' },
  { id: 'elite', label: 'Elite' },
  { id: 'weak', label: 'Fraca' },
]

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

function variantSearch(line: EncounterLine): string {
  const query = creatureVariantQuery(line.variant)
  return query ? `?v=${query}` : ''
}

function sheetHref(line: EncounterLine): string {
  return `/bestiario/${line.creatureId}${variantSearch(line)}`
}

function sessionHref(line: EncounterLine): string {
  return `/bestiario/${line.creatureId}/sessao${variantSearch(line)}`
}

export function EncounterEditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { current, loading, loadOne, updateCurrent } = useEncounterStore()
  const { creatures: catalog, loadAll: loadCreatures } = useCreatureStore()
  const families = useMemo(() => listCreatureFamilies(), [])
  const traitOptions = useMemo(() => {
    const map = new Map<string, string>()
    for (const creature of catalog) {
      for (const trait of creature.traits) {
        if (!map.has(trait)) map.set(trait, localizeTraitLabel(trait))
      }
    }
    return [...map.entries()]
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label, 'pt-BR'))
  }, [catalog])
  const [copyState, setCopyState] = useState<'idle' | 'ok' | 'fail'>('idle')
  const [resultQuery, setResultQuery] = useState('')
  const [addQuery, setAddQuery] = useState('')
  const [addQty, setAddQty] = useState(1)

  useEffect(() => {
    void loadCreatures()
  }, [loadCreatures])

  useEffect(() => {
    clearPendingEncounterCreate()
  }, [])

  useEffect(() => {
    if (!id) return
    void loadOne(id).then((encounter) => {
      if (!encounter) navigate('/bestiario/encontros', { replace: true })
    })
  }, [id, loadOne, navigate])

  const encounter = current?.id === id ? current : null
  useDocumentTitle(encounter?.name)
  const shape: EncounterShape = resolveEncounterShape(encounter?.shape)

  const budget = encounter
    ? encounterXpBudget(encounter.threat, encounter.partySize)
    : 0
  const used = encounter ? encounterLinesXp(encounter.lines) : 0
  const remaining = budget - used
  const overBudget = used > budget

  const visibleLines = useMemo(() => {
    if (!encounter) return []
    const q = normalize(resultQuery.trim())
    if (!q) return encounter.lines
    return encounter.lines.filter((line) =>
      normalize(`${line.name} ${line.originalName} ${line.themeLabel ?? ''}`).includes(
        q,
      ),
    )
  }, [encounter, resultQuery])

  const catalogMatches = useMemo(() => {
    const q = normalize(addQuery.trim())
    if (q.length < 2) return []
    return catalog
      .filter(
        (creature) =>
          normalize(creature.name).includes(q) ||
          normalize(creature.originalName).includes(q),
      )
      .slice(0, 12)
  }, [addQuery, catalog])

  async function patch(partial: Partial<NonNullable<typeof encounter>>) {
    if (!encounter) return
    await updateCurrent(partial)
  }

  async function patchPartyLevel(partyLevel: number) {
    if (!encounter) return
    await updateCurrent({
      partyLevel,
      lines: refreshEncounterLines(encounter.lines, partyLevel),
    })
  }

  async function sortear() {
    if (!encounter) return
    const traits = encounter.traits === undefined ? null : encounter.traits
    if (traits && traits.length === 0) {
      window.alert(
        'Nenhum traço marcado. Aperte Selecionar tudo ou marque os traços que devem entrar no sorteio.',
      )
      return
    }
    if (
      encounter.lines.length > 0 &&
      !window.confirm(
        'Sortear de novo substitui as criaturas atuais. Continuar?',
      )
    ) {
      return
    }
    const result = generateEncounterLines(
      {
        partyLevel: encounter.partyLevel,
        partySize: encounter.partySize,
        threat: encounter.threat,
        shape,
        prioritizeSameType: encounter.prioritizeSameType,
        rarities: encounter.rarities,
        traits,
        includeHomebrew: encounter.includeHomebrew,
        includeUnique: encounter.includeUnique,
      },
      catalog,
      families,
    )
    await updateCurrent({
      lines: result.lines,
      themeKey: result.themeKey,
      themeLabel: result.themeLabel,
      shape,
    })
  }

  async function reroll(line: EncounterLine) {
    if (!encounter) return
    const next = rerollEncounterLine(
      line,
      {
        partyLevel: encounter.partyLevel,
        partySize: encounter.partySize,
        threat: encounter.threat,
        shape,
        prioritizeSameType: encounter.prioritizeSameType,
        rarities: encounter.rarities,
        traits: encounter.traits === undefined ? null : encounter.traits,
        includeHomebrew: encounter.includeHomebrew,
        includeUnique: encounter.includeUnique,
        themeKey: encounter.themeKey,
      },
      catalog,
      families,
      encounter.lines,
    )
    await updateCurrent({
      lines: encounter.lines.map((entry) =>
        entry.id === line.id ? next : entry,
      ),
    })
  }

  async function bumpQuantity(line: EncounterLine, delta: number) {
    if (!encounter) return
    await setQuantity(line, line.quantity + delta)
  }

  async function setQuantity(line: EncounterLine, raw: number) {
    if (!encounter) return
    const quantity = Math.min(99, Math.max(1, Math.round(raw) || 1))
    await updateCurrent({
      lines: encounter.lines.map((entry) =>
        entry.id === line.id ? { ...entry, quantity } : entry,
      ),
    })
  }

  async function setVariant(line: EncounterLine, variant: CreaturePowerVariant) {
    if (!encounter) return
    const [refreshed] = refreshEncounterLines(
      [{ ...line, variant }],
      encounter.partyLevel,
    )
    if (!refreshed) return
    await updateCurrent({
      lines: encounter.lines.map((entry) =>
        entry.id === line.id ? refreshed : entry,
      ),
    })
  }

  async function removeLine(lineId: string) {
    if (!encounter) return
    await updateCurrent({
      lines: encounter.lines.filter((line) => line.id !== lineId),
    })
  }

  async function addCreature(creatureId: string, quantity = addQty) {
    if (!encounter) return
    const creature = catalog.find((entry) => entry.id === creatureId)
    if (!creature) return
    const qty = Math.min(99, Math.max(1, Math.round(quantity) || 1))
    const existing = encounter.lines.find(
      (line) => line.creatureId === creature.id && line.variant === 'normal',
    )
    if (existing) {
      await setQuantity(existing, existing.quantity + qty)
    } else {
      const line = lineFromCreature(creature, encounter.partyLevel, families)
      line.quantity = qty
      await updateCurrent({
        lines: [...encounter.lines, line],
      })
    }
    setAddQuery('')
  }

  async function copyList() {
    if (!encounter) return
    try {
      await navigator.clipboard.writeText(encounterAsPlainText(encounter))
      setCopyState('ok')
    } catch {
      setCopyState('fail')
    }
    window.setTimeout(() => setCopyState('idle'), 1600)
  }

  if (loading && !encounter) {
    return (
      <div className="p-5 text-sm text-text-muted">Carregando encontro…</div>
    )
  }

  if (!encounter) {
    return null
  }

  const creatureCount = encounter.lines.reduce(
    (sum, line) => sum + line.quantity,
    0,
  )
  const usedRatio = budget > 0 ? Math.min(1, used / budget) : 0

  return (
    <div className="mx-auto max-w-5xl animate-fade-up space-y-3 p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to="/bestiario/encontros"
            className="text-[11px] text-text-dim hover:text-accent"
          >
            ← Meus encontros
          </Link>
          <span className="mx-1.5 text-[11px] text-text-dim">·</span>
          <Link
            to="/bestiario"
            className="text-[11px] text-text-dim hover:text-accent"
          >
            Catálogo
          </Link>
          <Input
            className="mt-2 font-display text-xl font-semibold tracking-wide"
            value={encounter.name}
            onChange={(e) => void patch({ name: e.target.value })}
            aria-label="Nome do encontro"
          />
          <p className="mt-1 text-sm text-text-muted">
            Sorteie pelo orçamento de XP ou monte o combate à mão, ficha por
            ficha.
            {encounter.prioritizeSameType && encounter.themeLabel
              ? ` Tipo: ${encounter.themeLabel}.`
              : ''}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="accent" onClick={() => void sortear()}>
            {encounter.lines.length === 0
              ? 'Sortear encontro'
              : 'Sortear de novo'}
          </Button>
          <Button
            onClick={() => void copyList()}
            disabled={encounter.lines.length === 0}
          >
            {copyState === 'ok'
              ? 'Copiado'
              : copyState === 'fail'
                ? 'Não deu'
                : 'Copiar lista'}
          </Button>
        </div>
      </div>

      <Tip>
        O orçamento de XP segue o GM Core (e o Foundry): 40/60/80/120/160 para
        4 personagens, com ajuste por cabeça a mais ou a menos. Sorteie um
        combate ou busque a ficha e a quantidade na lista abaixo — dá para
        misturar os dois.
      </Tip>

      <Panel
        title="Como gerar"
        subtitle="Nível, chefe ou horda, e se o combate fica do mesmo tipo"
        collapsible
        defaultOpen={encounter.lines.length === 0}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nível do grupo">
            <Select
              value={String(encounter.partyLevel)}
              onChange={(e) => void patchPartyLevel(Number(e.target.value))}
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
              value={String(encounter.partySize)}
              onChange={(e) =>
                void patch({ partySize: Number(e.target.value) })
              }
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((size) => (
                <option key={size} value={size}>
                  {size} personagem{size === 1 ? '' : 'ns'}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="mt-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Importância
          </div>
          <div className="flex flex-wrap gap-1.5">
            {COMBAT_THREATS.map((threat) => (
              <Chip
                key={threat}
                selected={encounter.threat === threat}
                onClick={() => void patch({ threat })}
              >
                {combatThreatLabel(threat)}
              </Chip>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-text-dim">
            Orçamento: {budget} XP para {encounter.partySize} personagem
            {encounter.partySize === 1 ? '' : 'ns'} em um combate{' '}
            {combatThreatLabel(encounter.threat)}.
          </p>
        </div>

        <div className="mt-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Estilo
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ENCOUNTER_SHAPES.map((option) => (
              <Chip
                key={option}
                selected={shape === option}
                onClick={() => void patch({ shape: option })}
              >
                {option === 'boss'
                  ? 'Chefe'
                  : option === 'balanced'
                    ? 'Equilíbrio'
                    : 'Horda'}
              </Chip>
            ))}
          </div>
          <p className="mt-1.5 text-[11px] text-text-dim">
            {shape === 'boss'
              ? 'Poucos inimigos fortes. Em nível baixo costuma ser 1; em nível alto, 2 ou 3.'
              : shape === 'balanced'
                ? 'Mistura um ou dois fortes com tropa mais fraca, no orçamento de XP do grupo. É o padrão; dá para mudar para só chefe ou só horda.'
                : 'Muitos inimigos médios ou fracos, com quantidade sorteada (ex.: 2× a mesma ficha + 1× outra). Nível alto traz mais corpos.'}
          </p>
        </div>

        <div className="mt-3">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Composição
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip
              selected={encounter.prioritizeSameType}
              onClick={() =>
                void patch({
                  prioritizeSameType: !encounter.prioritizeSameType,
                  themeKey: null,
                  themeLabel: null,
                })
              }
            >
              Priorizar o mesmo tipo
            </Chip>
            <Chip
              selected={encounter.includeUnique}
              onClick={() =>
                void patch({ includeUnique: !encounter.includeUnique })
              }
            >
              Incluir únicas
            </Chip>
            <Chip
              selected={encounter.includeHomebrew}
              onClick={() =>
                void patch({ includeHomebrew: !encounter.includeHomebrew })
              }
            >
              Incluir homebrew
            </Chip>
          </div>
          <p className="mt-1.5 text-[11px] text-text-dim">
            {encounter.prioritizeSameType
              ? 'Ligado: o sorteio puxa a mesma família. Pode repetir a ficha (2× monitor) ou misturar parentes (monitor + infernal). Desligue antes de sortear se quiser tipos diferentes.'
              : 'Desligado: o sorteio mistura qualquer ficha que caiba no orçamento de XP.'}
          </p>
        </div>

        <div className="mt-4 max-w-md">
          <MultiFilter
            label="Raridade"
            options={RARITY_FILTER_OPTIONS}
            selected={encounter.rarities}
            onChange={(rarities: Rarity[]) => void patch({ rarities })}
            emptyLabel="Todas"
          />
        </div>

        <div className="mt-4">
          <TraitIncludeFilter
            options={traitOptions}
            selected={encounter.traits === undefined ? null : encounter.traits}
            onChange={(traits) => void patch({ traits })}
          />
        </div>
      </Panel>

      <Panel
        title="Resultado"
        subtitle={
          encounter.lines.length === 0
            ? 'Ainda vazio — sorteie ou acrescente fichas à mão'
            : `${creatureCount} criatura${creatureCount === 1 ? '' : 's'} · ${encounterShapeLabel(shape)} · ${used}/${budget} XP`
        }
      >
        <div className="space-y-3">
          <div>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2 text-[11px] text-text-dim">
              <span>
                {used} de {budget} XP
                {encounter.lines.length === 0
                  ? ' · acrescente fichas ou sorteie'
                  : overBudget
                    ? ' · acima do orçamento'
                    : remaining > 0
                      ? ` · restam ${remaining}`
                      : ' · orçamento cheio'}
              </span>
              {encounter.themeLabel ? (
                <span>Tipo: {encounter.themeLabel}</span>
              ) : null}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div
                className={`h-full rounded-full ${
                  overBudget ? 'bg-danger' : 'bg-accent'
                }`}
                style={{ width: `${Math.min(100, usedRatio * 100)}%` }}
              />
            </div>
          </div>

          {encounter.lines.length === 0 ? (
            <p className="text-sm text-text-dim">
              Nada na lista ainda. Use Sortear encontro ou busque uma ficha
              abaixo e escolha quantas copiar para o combate.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  type="search"
                  className="min-w-[10rem] flex-1"
                  placeholder="Buscar no encontro…"
                  value={resultQuery}
                  onChange={(e) => setResultQuery(e.target.value)}
                  aria-label="Buscar no encontro"
                />
                <FilterCount
                  shown={visibleLines.length}
                  total={encounter.lines.length}
                />
              </div>

              {visibleLines.length === 0 ? (
                <p className="text-sm text-text-dim">
                  Nada neste filtro.{' '}
                  <button
                    type="button"
                    className="text-accent hover:underline"
                    onClick={() => setResultQuery('')}
                  >
                    Mostrar tudo
                  </button>
                </p>
              ) : (
                <ul className="divide-y divide-border/50">
                  {visibleLines.map((line) => (
                    <li key={line.id} className="py-2.5">
                      <div className="flex flex-wrap items-start gap-2">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-text">
                            {line.name}
                            {line.quantity > 1 ? ` ×${line.quantity}` : ''}
                          </div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px] text-text-dim">
                            <span>Nv. {formatCreatureLevel(line.level)}</span>
                            <span>
                              {line.xpEach * line.quantity} XP
                              {line.quantity > 1
                                ? ` (${line.xpEach} cada)`
                                : ''}
                            </span>
                            <RarityBadge rarity={line.rarity} />
                            {line.themeLabel ? (
                              <Badge>{line.themeLabel}</Badge>
                            ) : null}
                            {line.xpEach === 0 ? (
                              <span className="text-danger">
                                fora da faixa de XP
                              </span>
                            ) : null}
                          </div>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {VARIANT_OPTIONS.map((option) => (
                              <Chip
                                key={option.id}
                                selected={line.variant === option.id}
                                onClick={() => void setVariant(line, option.id)}
                              >
                                {option.label}
                              </Chip>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-1">
                          <Button
                            size="sm"
                            onClick={() => void bumpQuantity(line, -1)}
                            disabled={line.quantity <= 1}
                          >
                            −
                          </Button>
                          <Input
                            type="number"
                            min={1}
                            max={99}
                            className="w-14 text-center"
                            value={line.quantity}
                            onChange={(e) =>
                              void setQuantity(line, Number(e.target.value))
                            }
                            aria-label={`Quantidade de ${line.name}`}
                          />
                          <Button
                            size="sm"
                            onClick={() => void bumpQuantity(line, 1)}
                            disabled={line.quantity >= 99}
                          >
                            +
                          </Button>
                          <Button size="sm" onClick={() => void reroll(line)}>
                            Trocar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => navigate(sheetHref(line))}
                          >
                            Ficha
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => navigate(sessionHref(line))}
                          >
                            Sessão
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
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          <div className="border-t border-border/50 pt-3">
            <div className="grid gap-3 sm:grid-cols-[1fr_7rem]">
              <Field
                label="Acrescentar ficha do catálogo"
                hint="Busque pelo nome e clique para colocar no encontro, com a quantidade ao lado."
              >
                <Input
                  value={addQuery}
                  onChange={(e) => setAddQuery(e.target.value)}
                  placeholder="Ex.: goblin, ogro, lobo…"
                  aria-label="Buscar ficha para acrescentar"
                />
              </Field>
              <Field label="Quantidade">
                <Input
                  type="number"
                  min={1}
                  max={99}
                  value={addQty}
                  onChange={(e) =>
                    setAddQty(
                      Math.min(99, Math.max(1, Number(e.target.value) || 1)),
                    )
                  }
                  aria-label="Quantidade a acrescentar"
                />
              </Field>
            </div>
            {addQuery.trim().length === 1 ? (
              <p className="mt-1.5 text-[11px] text-text-dim">
                Digite mais um caractere para ver o catálogo.
              </p>
            ) : null}
            {catalogMatches.length > 0 && (
              <ul className="mt-1.5 max-h-56 overflow-y-auto rounded-lg border border-border/70 bg-surface-2/50">
                {catalogMatches.map((creature) => {
                  const xp = creatureEncounterXp(
                    creature.level,
                    encounter.partyLevel,
                  )
                  return (
                    <li key={creature.id}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between gap-2 px-2.5 py-1.5 text-left text-xs hover:bg-accent/10"
                        onClick={() => void addCreature(creature.id)}
                      >
                        <span>
                          <span className="font-medium text-text">
                            {creature.name}
                          </span>
                          <span className="ml-1.5 text-text-dim">
                            nv. {formatCreatureLevel(creature.level)}
                            {xp > 0 ? ` · ${xp} XP` : ' · fora da faixa'}
                            {addQty > 1 ? ` · colocar ×${addQty}` : ''}
                          </span>
                        </span>
                        <span className="text-text-dim">
                          {RARITY_LABELS[creature.rarity]}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </Panel>

      <Panel title="Notas da mesa" collapsible defaultOpen={false}>
        <Textarea
          value={encounter.notes}
          onChange={(e) => void patch({ notes: e.target.value })}
          placeholder="Onde acontece, o que a mesa já viu, tesouro combinado…"
        />
      </Panel>
    </div>
  )
}
