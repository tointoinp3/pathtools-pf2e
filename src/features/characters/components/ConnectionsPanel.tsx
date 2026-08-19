import { useMemo, useState } from 'react'
import type {
  CharacterConnection,
  ConnectionMode,
  ConnectionSourceKind,
  ConnectionTarget,
  GrantedFeat,
  ResolvedCharacterSheet,
} from '@/types'
import {
  CONNECTION_SOURCE_KIND_LABELS,
  CONNECTION_TARGET_OPTIONS,
  connectionTargetLabel,
  isImmunityTarget,
  isDefenseTarget,
} from '@/types'
import {
  defenseKindFromTarget,
  defenseTypeFromTarget,
} from '@/data/seeds/defenses'
import { DefenseRulesCard } from '@/features/defenses/components/DefenseRulesCard'
import { DefensesPanel } from '@/features/defenses/components/DefensesPanel'
import { evaluateFormula, buildFormulaVars, summarizeActiveConnections } from '@/engine'
import { Badge } from '@/components/ui/Badge'
import { Panel, Tip } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { FilterCount } from '@/components/ui/FilterCount'
import { createId } from '@/utils/id'
import { formatModifier } from '@/utils/labels'

interface ConnectionsPanelProps {
  sheet: ResolvedCharacterSheet
  connections: CharacterConnection[]
  onChange: (connections: CharacterConnection[]) => void
}

interface ConnectionPreset {
  id: string
  label: string
  hint: string
  patch: Partial<CharacterConnection>
}

const PRESETS: ConnectionPreset[] = [
  {
    id: 'hp-flat',
    label: '+PV',
    hint: '+1 PV máximo',
    patch: {
      name: 'PV extra',
      target: 'hp.max',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'hp-level',
    label: 'PV × nível',
    hint: 'NIVEL em PV',
    patch: {
      name: 'PV por nível',
      target: 'hp.max',
      mode: 'formula',
      formula: 'NIVEL',
    },
  },
  {
    id: 'hp-con',
    label: 'PV × CON',
    hint: 'CON em PV',
    patch: {
      name: 'PV da Constituição',
      target: 'hp.max',
      mode: 'formula',
      formula: 'CON',
    },
  },
  {
    id: 'ac',
    label: '+CA',
    hint: '+1 CA',
    patch: { name: 'CA extra', target: 'ac', mode: 'flat', flatValue: 1 },
  },
  {
    id: 'speed',
    label: '+Velocidade',
    hint: '+1,5 m',
    patch: {
      name: 'Velocidade extra',
      target: 'speed',
      mode: 'flat',
      flatValue: 5,
    },
  },
  {
    id: 'fort',
    label: '+Fortitude',
    hint: '+1 Fortitude',
    patch: {
      name: 'Fortitude extra',
      target: 'save.fortitude',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'skill',
    label: '+Perícia',
    hint: '+1 Diplomacia',
    patch: {
      name: 'Bônus de perícia',
      target: 'skill.diplomacy',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'size-up',
    label: 'Tamanho +1',
    hint: 'Uma categoria maior',
    patch: {
      name: 'Aumento de tamanho',
      target: 'size',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'attack',
    label: '+Golpe',
    hint: '+1 em todos os Golpes',
    patch: {
      name: 'Bônus de Golpe',
      target: 'attack',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'damage',
    label: '+Dano',
    hint: '+1 de dano nos Golpes',
    patch: {
      name: 'Dano extra',
      target: 'damage',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'init',
    label: '+Iniciativa',
    hint: '+2 iniciativa (bônus que a ficha ainda não soma sozinha)',
    patch: {
      name: 'Iniciativa extra',
      target: 'initiative',
      mode: 'flat',
      flatValue: 2,
    },
  },
  {
    id: 'saves',
    label: '+Salvaguardas',
    hint: '+1 em Fortitude, Reflexos e Vontade',
    patch: {
      name: 'Bônus em salvaguardas',
      target: 'save',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'focus',
    label: '+Foco',
    hint: '+1 ponto de foco',
    patch: {
      name: 'Ponto de foco extra',
      target: 'focus.pool',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'resist-fire',
    label: 'Res. fogo',
    hint: 'Resistência 5 a fogo',
    patch: {
      name: 'Resistência a fogo',
      target: 'resistance.fire',
      mode: 'flat',
      flatValue: 5,
    },
  },
  {
    id: 'resist-phys',
    label: 'Res. físico',
    hint: 'Resistência 2 a físico',
    patch: {
      name: 'Resistência a físico',
      target: 'resistance.physical',
      mode: 'flat',
      flatValue: 2,
    },
  },
  {
    id: 'weak-fire',
    label: 'Fraq. fogo',
    hint: 'Fraqueza 5 a fogo',
    patch: {
      name: 'Fraqueza a fogo',
      target: 'weakness.fire',
      mode: 'flat',
      flatValue: 5,
    },
  },
  {
    id: 'weak-phys',
    label: 'Fraq. físico',
    hint: 'Fraqueza 5 a físico',
    patch: {
      name: 'Fraqueza a físico',
      target: 'weakness.physical',
      mode: 'flat',
      flatValue: 5,
    },
  },
  {
    id: 'temp-hp',
    label: '+PV temp',
    hint: 'PV temporários = nível',
    patch: {
      name: 'PV temporários',
      target: 'hp.temp',
      mode: 'formula',
      formula: 'NIVEL',
    },
  },
  {
    id: 'cantrip',
    label: '+Truque',
    hint: '+1 truque por dia',
    patch: {
      name: 'Truque extra',
      target: 'spell.cantrips',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'slot',
    label: '+Espaço',
    hint: '+1 espaço no posto mais alto',
    patch: {
      name: 'Espaço de magia extra',
      target: 'spell.slots',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'comp-hp',
    label: '+PV companheiro',
    hint: '+PV no animal/construto',
    patch: {
      name: 'PV do companheiro',
      target: 'companion.hp',
      mode: 'flat',
      flatValue: 10,
    },
  },
  {
    id: 'lang-slot',
    label: '+Idioma',
    hint: '+1 idioma adicional (slot extra)',
    patch: {
      name: 'Idioma extra',
      target: 'language.slots',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'hero-max',
    label: '+Herói máx',
    hint: '+1 ponto de herói no máximo (3 → 4)',
    patch: {
      name: 'Pontos de herói extras',
      target: 'heroPoints.max',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'hero-start',
    label: '+Herói início',
    hint: '+1 ponto de herói no início da sessão',
    patch: {
      name: 'Início de sessão extra',
      target: 'heroPoints.start',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'imm-fire',
    label: 'Imun. fogo',
    hint: 'Imunidade a fogo (selo na ficha)',
    patch: {
      name: 'Imunidade a fogo',
      target: 'immunity.fire',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'imm-poison',
    label: 'Imun. veneno',
    hint: 'Imunidade a veneno',
    patch: {
      name: 'Imunidade a veneno',
      target: 'immunity.poison',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'imm-disease',
    label: 'Imun. doença',
    hint: 'Imunidade a doença',
    patch: {
      name: 'Imunidade a doença',
      target: 'immunity.disease',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'imm-death',
    label: 'Imun. morte',
    hint: 'Imunidade a efeitos de morte',
    patch: {
      name: 'Imunidade a efeitos de morte',
      target: 'immunity.death',
      mode: 'flat',
      flatValue: 1,
    },
  },
  {
    id: 'imm-custom',
    label: 'Imun. livre',
    hint: 'Imunidade com texto livre (edite o nome)',
    patch: {
      name: 'medo',
      target: 'immunity.custom',
      mode: 'flat',
      flatValue: 1,
    },
  },
]

type StatusFilter = 'all' | 'active' | 'inactive'

function emptyConnection(): CharacterConnection {
  return {
    id: createId('conn'),
    name: 'Nova conexão',
    sourceLabel: '',
    sourceKind: 'manual',
    target: 'hp.max',
    mode: 'flat',
    flatValue: 1,
    formula: 'CON * 1',
    enabled: true,
    notes: '',
  }
}

function targetLabelForSheet(
  target: ConnectionTarget,
  sheet: ResolvedCharacterSheet,
): string {
  const custom = sheet.customSkills.find((skill) => target === `skill.${skill.id}`)
  if (custom) return custom.name
  const lore = sheet.lores.find((entry) => target === `lore.${entry.id}`)
  if (lore) return lore.name
  return connectionTargetLabel(target)
}

export function ConnectionsPanel({
  sheet,
  connections,
  onChange,
}: ConnectionsPanelProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () =>
      connections.length <= 2
        ? new Set(connections.map((c) => c.id))
        : new Set(),
  )
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [sourcePick, setSourcePick] = useState('')
  const [showFormulaHelp, setShowFormulaHelp] = useState(false)

  const attrVars = useMemo(() => {
    const mods = Object.fromEntries(
      sheet.attributes.map((a) => [a.id, a.modifier]),
    )
    return buildFormulaVars(mods, sheet.character.level)
  }, [sheet.attributes, sheet.character.level])

  const resolvedById = useMemo(
    () => Object.fromEntries(sheet.connections.map((c) => [c.id, c])),
    [sheet.connections],
  )

  const summary = useMemo(
    () => summarizeActiveConnections(sheet.connections),
    [sheet.connections],
  )

  const groupedTargets = useMemo(() => {
    const options = [...CONNECTION_TARGET_OPTIONS]
    for (const skill of sheet.customSkills) {
      options.push({
        value: `skill.${skill.id}` as ConnectionTarget,
        label: skill.name,
        group: 'Perícias personalizadas',
      })
    }
    for (const lore of sheet.lores) {
      options.push({
        value: `lore.${lore.id}` as ConnectionTarget,
        label: lore.name,
        group: 'Conhecimentos',
      })
    }
    const groups = new Map<string, typeof options>()
    for (const opt of options) {
      const list = groups.get(opt.group) ?? []
      list.push(opt)
      groups.set(opt.group, list)
    }
    return [...groups.entries()]
  }, [sheet.customSkills, sheet.lores])

  const sheetSources = useMemo(() => {
    const feats: Array<{
      key: string
      kind: ConnectionSourceKind
      id: string
      label: string
    }> = sheet.feats.map((feat) => ({
      key: `feat:${feat.featId ?? feat.id}`,
      kind: 'feat',
      id: feat.featId ?? feat.id,
      label: feat.featName,
    }))
    const items = sheet.equipment.items.map((entry) => ({
      key: `item:${entry.item.id}`,
      kind: 'item' as const,
      id: entry.item.id,
      label: entry.displayName,
    }))
    const identity: Array<{
      key: string
      kind: ConnectionSourceKind
      id: string
      label: string
    }> = []
    if (sheet.ancestryName) {
      identity.push({
        key: 'ancestry',
        kind: 'ancestry',
        id: 'ancestry',
        label: sheet.ancestryName,
      })
    }
    if (sheet.heritageName) {
      identity.push({
        key: 'heritage',
        kind: 'heritage',
        id: 'heritage',
        label: sheet.heritageName,
      })
    }
    if (sheet.className) {
      identity.push({
        key: 'class',
        kind: 'class',
        id: 'class',
        label: sheet.className,
      })
    }
    if (sheet.backgroundName) {
      identity.push({
        key: 'background',
        kind: 'background',
        id: 'background',
        label: sheet.backgroundName,
      })
    }
    return { feats, items, identity }
  }, [
    sheet.feats,
    sheet.equipment.items,
    sheet.ancestryName,
    sheet.heritageName,
    sheet.className,
    sheet.backgroundName,
  ])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return connections.filter((conn) => {
      if (statusFilter === 'active' && !conn.enabled) return false
      if (statusFilter === 'inactive' && conn.enabled) return false
      if (!q) return true
      const hay = [
        conn.name,
        conn.sourceLabel,
        conn.notes ?? '',
        targetLabelForSheet(conn.target, sheet),
        CONNECTION_SOURCE_KIND_LABELS[conn.sourceKind],
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [connections, query, statusFilter, sheet])

  const activeCount = connections.filter((c) => c.enabled).length

  function update(id: string, patch: Partial<CharacterConnection>) {
    onChange(connections.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  function remove(id: string) {
    onChange(connections.filter((c) => c.id !== id))
    setExpandedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function expand(id: string) {
    setExpandedIds((prev) => new Set(prev).add(id))
  }

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function addConnection(patch?: Partial<CharacterConnection>) {
    const next = { ...emptyConnection(), ...patch, id: createId('conn') }
    onChange([...connections, next])
    expand(next.id)
  }

  function addFromFeat(feat: GrantedFeat) {
    addConnection({
      sourceId: feat.featId ?? feat.id,
      sourceLabel: feat.featName,
      sourceKind: 'feat',
      name: feat.featName,
    })
  }

  function addFromPickedSource(key: string) {
    if (!key) return
    const all = [
      ...sheetSources.feats,
      ...sheetSources.items,
      ...sheetSources.identity,
    ]
    const source = all.find((entry) => entry.key === key)
    if (!source) return
    addConnection({
      sourceId: source.id,
      sourceLabel: source.label,
      sourceKind: source.kind,
      name: source.label,
    })
    setSourcePick('')
  }

  function duplicate(id: string) {
    const src = connections.find((c) => c.id === id)
    if (!src) return
    addConnection({
      ...src,
      name: src.name.endsWith('(cópia)') ? src.name : `${src.name} (cópia)`,
    })
  }

  function applyPreset(preset: ConnectionPreset) {
    addConnection(preset.patch)
  }

  return (
    <div className="animate-fade-up space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-wide text-text">
            Conexões
          </h2>
          <p className="mt-0.5 max-w-2xl text-sm text-text-dim">
            Ponte manual para bônus que a ficha ainda não calcula sozinha.
            Escolha a fonte (feito, item…), o alvo (PV, CA, Golpe, resistência, imunidade…) e um valor
            fixo ou uma fórmula. Imunidade não usa número: ligue a conexão e o selo aparece na ficha.
          </p>
        </div>
        <Button size="sm" variant="accent" onClick={() => addConnection()}>
          + Conexão
        </Button>
      </div>

      {(summary.length > 0 ||
        (sheet.immunities?.length ?? 0) > 0 ||
        (sheet.resistances?.length ?? 0) > 0 ||
        (sheet.weaknesses?.length ?? 0) > 0) ? (
        <Panel quiet compact title="Na ficha agora" subtitle={`${activeCount} ativas`}>
          <DefensesPanel
            immunities={sheet.immunities}
            resistances={sheet.resistances}
            weaknesses={sheet.weaknesses}
            bare
          />
          {summary.filter((row) => !isDefenseTarget(row.target)).length > 0 ? (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {summary
              .filter((row) => !isDefenseTarget(row.target))
              .map((row) => (
              <span
                key={row.target}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[11px] text-accent"
                title={`${row.count} conexão${row.count === 1 ? '' : 'ões'}`}
              >
                <span className="text-text">{targetLabelForSheet(row.target, sheet)}</span>
                <strong>{formatModifier(row.total)}</strong>
              </span>
            ))}
          </div>
          ) : null}
        </Panel>
      ) : null}

      <Panel quiet compact title="Atalhos">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.filter(
            (preset) =>
              !preset.patch.target || !isDefenseTarget(preset.patch.target),
          ).map((preset) => (
            <button
              key={preset.id}
              type="button"
              title={preset.hint}
              className="rounded-full border border-border/80 bg-surface-2/60 px-2.5 py-1 text-[11px] hover:border-accent/50 hover:text-accent"
              onClick={() => applyPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Imunidade, resistência e fraqueza
          </p>
          <ul className="max-h-72 space-y-1 overflow-y-auto">
            {PRESETS.filter(
              (preset) =>
                Boolean(preset.patch.target) &&
                isDefenseTarget(preset.patch.target as string),
            ).map((preset) => {
              const target = preset.patch.target as string
              const kind = defenseKindFromTarget(target)
              if (!kind) return null
              return (
                <li key={preset.id}>
                  <DefenseRulesCard
                    kind={kind}
                    type={defenseTypeFromTarget(target)}
                    value={
                      kind === 'immunity'
                        ? undefined
                        : preset.patch.flatValue
                    }
                    actions={
                      <button
                        type="button"
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-accent hover:bg-accent/15"
                        onClick={() => applyPreset(preset)}
                      >
                        Adicionar
                      </button>
                    }
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-[1fr_auto]">
          <Field label="Vincular fonte da ficha">
            <Select
              value={sourcePick}
              onChange={(e) => addFromPickedSource(e.target.value)}
            >
              <option value="">Feito, item, classe…</option>
              {sheetSources.feats.length > 0 && (
                <optgroup label="Feitos">
                  {sheetSources.feats.map((feat) => (
                    <option key={feat.key} value={feat.key}>
                      {feat.label}
                    </option>
                  ))}
                </optgroup>
              )}
              {sheetSources.items.length > 0 && (
                <optgroup label="Itens">
                  {sheetSources.items.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              )}
              {sheetSources.identity.length > 0 && (
                <optgroup label="Ficha">
                  {sheetSources.identity.map((entry) => (
                    <option key={entry.key} value={entry.key}>
                      {CONNECTION_SOURCE_KIND_LABELS[entry.kind]} · {entry.label}
                    </option>
                  ))}
                </optgroup>
              )}
            </Select>
          </Field>
          {sheet.feats.length > 0 && sheet.feats.length <= 8 ? (
            <div className="flex flex-wrap items-end gap-1 pb-0.5">
              {sheet.feats.slice(0, 6).map((feat) => (
                <button
                  key={feat.id}
                  type="button"
                  className="rounded-full border border-border/70 bg-surface-2/40 px-2 py-1 text-[10px] hover:border-accent/50 hover:text-accent"
                  onClick={() => addFromFeat(feat)}
                  title="Criar conexão com este feito"
                >
                  + {feat.featName}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Panel>

      {connections.length > 0 ? (
        <div className="flex flex-wrap items-end gap-2">
          <Field label="Buscar" className="min-w-[12rem] flex-1">
            <Input
              value={query}
              placeholder="Nome, fonte, alvo…"
              onChange={(e) => setQuery(e.target.value)}
            />
          </Field>
          <FilterCount
            shown={filtered.length}
            total={connections.length}
            className="pb-0.5"
          />
          <div className="flex gap-1 pb-0.5">
            {(
              [
                ['all', 'Todas'],
                ['active', 'Ativas'],
                ['inactive', 'Desligadas'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`rounded-full border px-2.5 py-1 text-[11px] ${
                  statusFilter === id
                    ? 'border-accent/50 bg-accent/15 text-accent'
                    : 'border-border/70 bg-surface-2/40 text-text-dim hover:text-text'
                }`}
                onClick={() => setStatusFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {connections.length === 0 ? (
        <Panel quiet compact>
          <p className="text-sm text-text-dim">
            Nenhuma conexão ainda. Use um atalho acima ou crie a sua: feito
            “X” dá +3 PV → fonte = feito, alvo = PV máximo, valor = 3.
          </p>
        </Panel>
      ) : filtered.length === 0 ? (
        <Panel quiet compact>
          <p className="text-sm text-text-dim">
            Nenhuma conexão corresponde à busca ou ao filtro.
          </p>
        </Panel>
      ) : (
        <ul className="space-y-2">
          {filtered.map((conn) => {
            const resolved = resolvedById[conn.id]
            const expanded = expandedIds.has(conn.id)
            const formulaLive =
              conn.mode === 'formula' && conn.formula?.trim()
                ? evaluateFormula(conn.formula, attrVars)
                : null
            const knownTargets = new Set(
              groupedTargets.flatMap(([, opts]) => opts.map((o) => o.value)),
            )

            return (
              <li
                key={conn.id}
                className={`rounded-xl border bg-surface-1 ${
                  conn.enabled
                    ? 'border-border/80'
                    : 'border-border/40 opacity-70'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 px-3 py-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={conn.enabled}
                      onChange={(e) =>
                        update(conn.id, { enabled: e.target.checked })
                      }
                    />
                    <span className="font-medium">{conn.name || 'Sem nome'}</span>
                  </label>
                  <Badge>{targetLabelForSheet(conn.target, sheet)}</Badge>
                  {conn.sourceLabel ? (
                    <span className="text-[11px] text-text-dim">
                      {CONNECTION_SOURCE_KIND_LABELS[conn.sourceKind]} ·{' '}
                      {conn.sourceLabel}
                    </span>
                  ) : (
                    <span className="text-[11px] text-text-muted">
                      {CONNECTION_SOURCE_KIND_LABELS[conn.sourceKind]}
                    </span>
                  )}
                  <div className="ml-auto flex items-center gap-1.5">
                    {isImmunityTarget(conn.target) && conn.enabled ? (
                      <span className="rounded bg-info/15 px-2 py-0.5 text-xs font-semibold text-info">
                        Imune
                      </span>
                    ) : resolved?.resolvedValue != null ? (
                      <span className="rounded bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">
                        {conn.target === 'size'
                          ? `${formatModifier(resolved.resolvedValue)} cat.`
                          : formatModifier(resolved.resolvedValue)}
                      </span>
                    ) : resolved?.error ? (
                      <span className="text-[11px] text-danger">
                        {resolved.error}
                      </span>
                    ) : !conn.enabled ? (
                      <span className="text-[11px] text-text-muted">Off</span>
                    ) : null}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleExpanded(conn.id)}
                    >
                      {expanded ? 'Recolher' : 'Editar'}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => duplicate(conn.id)}
                    >
                      Duplicar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => remove(conn.id)}
                    >
                      Remover
                    </Button>
                  </div>
                </div>

                {expanded ? (
                  <div className="space-y-2 border-t border-border/50 px-3 py-3">
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                      <Field
                        label={
                          conn.target === 'immunity.custom'
                            ? 'Texto da imunidade'
                            : 'Nome do efeito'
                        }
                        hint={
                          conn.target === 'immunity.custom'
                            ? 'Ex.: medo, petrificação, olho mágico'
                            : undefined
                        }
                      >
                        <Input
                          value={conn.name}
                          onChange={(e) =>
                            update(conn.id, { name: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Fonte (feito / item…)">
                        <Input
                          value={conn.sourceLabel}
                          placeholder="Ex.: Impressão em Grupo"
                          onChange={(e) =>
                            update(conn.id, { sourceLabel: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Tipo da fonte">
                        <Select
                          value={conn.sourceKind}
                          onChange={(e) =>
                            update(conn.id, {
                              sourceKind: e.target.value as ConnectionSourceKind,
                            })
                          }
                        >
                          {(
                            Object.keys(
                              CONNECTION_SOURCE_KIND_LABELS,
                            ) as ConnectionSourceKind[]
                          ).map((kind) => (
                            <option key={kind} value={kind}>
                              {CONNECTION_SOURCE_KIND_LABELS[kind]}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="Alvo">
                        <Select
                          value={conn.target}
                          onChange={(e) => {
                            const target = e.target.value as ConnectionTarget
                            update(conn.id, {
                              target,
                              ...(isImmunityTarget(target)
                                ? { mode: 'flat' as ConnectionMode, flatValue: 1 }
                                : {}),
                            })
                          }}
                        >
                          {!knownTargets.has(conn.target) ? (
                            <option value={conn.target}>
                              {targetLabelForSheet(conn.target, sheet)}
                            </option>
                          ) : null}
                          {groupedTargets.map(([group, opts]) => (
                            <optgroup key={group} label={group}>
                              {opts.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </Select>
                      </Field>
                    </div>

                    {isDefenseTarget(conn.target) ? (
                      <DefenseRulesCard
                        kind={defenseKindFromTarget(conn.target)!}
                        type={
                          conn.target === 'immunity.custom'
                            ? 'custom'
                            : defenseTypeFromTarget(conn.target)
                        }
                        value={
                          isImmunityTarget(conn.target)
                            ? undefined
                            : (resolved?.resolvedValue ?? conn.flatValue)
                        }
                        label={
                          conn.target === 'immunity.custom'
                            ? conn.name
                            : undefined
                        }
                      />
                    ) : null}

                    {isImmunityTarget(conn.target) ? (
                      <p className="text-[11px] text-text-dim">
                        Imunidade não usa número. Enquanto a conexão estiver
                        ligada, o selo aparece na ficha
                        {conn.target === 'immunity.custom'
                          ? ' com o texto do nome.'
                          : '.'}
                      </p>
                    ) : (
                      <>
                    <div className="grid gap-2 sm:grid-cols-[8rem_1fr]">
                      <Field label="Modo">
                        <Select
                          value={conn.mode}
                          onChange={(e) =>
                            update(conn.id, {
                              mode: e.target.value as ConnectionMode,
                            })
                          }
                        >
                          <option value="flat">Fixo (+N)</option>
                          <option value="formula">Fórmula</option>
                        </Select>
                      </Field>

                      {conn.mode === 'flat' ? (
                        <Field
                          label="Valor"
                          hint={
                            conn.target === 'size'
                              ? '+1 = uma categoria maior (ex.: Médio→Grande); −1 = menor'
                              : undefined
                          }
                        >
                          <Input
                            type="number"
                            value={conn.flatValue ?? 0}
                            onChange={(e) =>
                              update(conn.id, {
                                flatValue: Number(e.target.value) || 0,
                              })
                            }
                          />
                        </Field>
                      ) : (
                        <Field
                          label="Fórmula"
                          hint={
                            conn.target === 'size'
                              ? 'Resultado em categorias (+/−). Ex.: 1 ou -1'
                              : formulaLive?.ok
                                ? `Resultado agora: ${formatModifier(formulaLive.value)}`
                                : formulaLive && !formulaLive.ok
                                  ? formulaLive.error
                                  : 'Use FOR, DES, CON, INT, SAB, CAR, NIVEL'
                          }
                        >
                          <Input
                            value={conn.formula ?? ''}
                            placeholder="CON * 2"
                            onChange={(e) =>
                              update(conn.id, { formula: e.target.value })
                            }
                          />
                        </Field>
                      )}
                    </div>

                    {conn.mode === 'formula' ? (
                      <p className="text-[10px] text-text-dim">
                        Mods atuais: FOR {attrVars.strength}, DES{' '}
                        {attrVars.dexterity}, CON {attrVars.constitution}, INT{' '}
                        {attrVars.intelligence}, SAB {attrVars.wisdom}, CAR{' '}
                        {attrVars.charisma}, NIVEL {attrVars.level}
                      </p>
                    ) : null}
                      </>
                    )}

                    <Field label="Notas">
                      <Textarea
                        className="min-h-14"
                        value={conn.notes ?? ''}
                        placeholder="Referência do livro, por que existe…"
                        onChange={(e) =>
                          update(conn.id, { notes: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                ) : null}
              </li>
            )
          })}
        </ul>
      )}

      <div>
        <button
          type="button"
          className="text-[11px] text-text-muted underline-offset-2 hover:text-accent hover:underline"
          onClick={() => setShowFormulaHelp((v) => !v)}
        >
          {showFormulaHelp ? 'Ocultar ajuda de fórmulas' : 'Como usar fórmulas'}
        </button>
        {showFormulaHelp ? (
          <Tip>
            Variáveis: <strong className="text-text">FOR DES CON INT SAB CAR NIVEL</strong>
            {' · '}
            Operadores: <code>+ − * / ( )</code>
            {' · '}
            Ex.: <code className="text-accent/90">CON * 2</code>,{' '}
            <code className="text-accent/90">NIVEL + 1</code>. O resultado entra
            no número da ficha e aparece no tooltip de 3s da estatística.
          </Tip>
        ) : null}
      </div>
    </div>
  )
}
