import { useMemo, useState, type ReactNode } from 'react'
import type { ResolvedCharacterSheet } from '@/types'
import type { CombatAction, CombatActionCost } from '@/types/action'
import { BASIC_ACTIONS } from '@/data/seeds/basicActions'
import {
  ActionCost,
  ActionIcon,
  type Pf2ActionType,
} from '@/components/ui/ActionIcon'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { FilterCount } from '@/components/ui/FilterCount'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { MultiFilter } from '@/components/ui/MultiFilter'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { CombatActionRolls } from '@/features/characters/components/CombatActionRolls'
import { FEAT_CATEGORY_LABELS } from '@/utils/labels'

type CostFilter = Exclude<CombatActionCost, never>

const COST_FILTER_OPTIONS: Array<{ value: CostFilter; label: string }> = [
  { value: 'one', label: '1 ação' },
  { value: 'two', label: '2 ações' },
  { value: 'three', label: '3 ações' },
  { value: 'free', label: 'Livre' },
  { value: 'reaction', label: 'Reação' },
  { value: 'variable', label: 'Variável' },
]

const COST_ORDER: Record<CombatActionCost, number> = {
  free: 0,
  reaction: 1,
  one: 2,
  two: 3,
  three: 4,
  variable: 5,
}

function isActionCost(
  t: string | undefined | null,
): t is Exclude<Pf2ActionType, 'passive'> {
  return t === 'one' || t === 'two' || t === 'three' || t === 'free' || t === 'reaction'
}

function matchesQuery(haystack: string, query: string): boolean {
  if (!query) return true
  return haystack.toLowerCase().includes(query)
}

function matchesCostFilter(
  cost: CombatActionCost | undefined,
  selected: CostFilter[],
): boolean {
  if (selected.length === 0) return true
  if (!cost) return false
  return selected.includes(cost)
}

interface CharacterActionItem {
  id: string
  name: string
  originalName?: string
  actionType: Exclude<Pf2ActionType, 'passive'>
  sourceLabel: string
  description?: string
  kind: 'feat' | 'ability'
  badge?: string
  traits?: string[]
}

function collectCharacterActions(
  sheet: ResolvedCharacterSheet,
): CharacterActionItem[] {
  const byKey = new Map<string, CharacterActionItem>()

  for (const feat of sheet.feats) {
    if (!isActionCost(feat.actionType)) continue
    const key = feat.featId ?? `feat:${feat.id}`
    if (byKey.has(key)) continue
    byKey.set(key, {
      id: key,
      name: feat.featName,
      originalName: feat.originalName,
      actionType: feat.actionType,
      sourceLabel: feat.sourceLabel,
      description: feat.description,
      kind: 'feat',
      badge: feat.featType,
      traits: feat.traits,
    })
  }

  for (const ability of sheet.specialAbilities) {
    if (!isActionCost(ability.actionType)) continue
    const key = `ability:${ability.id}`
    if (byKey.has(key)) continue
    byKey.set(key, {
      id: key,
      name: ability.name,
      actionType: ability.actionType,
      sourceLabel: ability.sourceLabel,
      description: ability.description,
      kind: 'ability',
      badge: 'Habilidade',
    })
  }

  return [...byKey.values()].sort((a, b) => {
    const byCost = COST_ORDER[a.actionType] - COST_ORDER[b.actionType]
    if (byCost !== 0) return byCost
    return a.name.localeCompare(b.name, 'pt-BR')
  })
}

function CostFilterChips({
  selected,
  onChange,
}: {
  selected: CostFilter[]
  onChange: (next: CostFilter[]) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {COST_FILTER_OPTIONS.map((opt) => {
        const on = selected.includes(opt.value)
        return (
          <button
            key={opt.value}
            type="button"
            title={
              on
                ? `Remover filtro ${opt.label}`
                : `Mostrar só ${opt.label}`
            }
            onClick={() => {
              if (on) onChange(selected.filter((v) => v !== opt.value))
              else onChange([...selected, opt.value])
            }}
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[11px] font-medium transition-all ${
              on
                ? 'border-accent/50 bg-accent/15 text-accent'
                : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
            }`}
          >
            {opt.value !== 'variable' ? (
              <ActionIcon type={opt.value} className="!h-[0.95em]" />
            ) : (
              <span className="text-[10px] opacity-70">~</span>
            )}
            {opt.value === 'variable' ? opt.label : (
              <span className="sr-only">{opt.label}</span>
            )}
          </button>
        )
      })}
      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="rounded-lg px-2 py-1 text-[11px] text-text-dim hover:text-accent"
        >
          Limpar
        </button>
      )}
    </div>
  )
}

function featTypeLabel(type?: string): string | undefined {
  if (!type) return undefined
  return FEAT_CATEGORY_LABELS[type] ?? type
}

function formatActionSource(source: string): string {
  return source.replace(/\bpg\.\s*/gi, 'pág. ')
}

function ActionCardShell({
  title,
  actionType,
  meta,
  badges,
  toolbar,
  children,
  highlight,
}: {
  title: ReactNode
  actionType?: CombatActionCost
  meta?: string
  badges?: ReactNode
  toolbar?: ReactNode
  children?: ReactNode
  highlight?: boolean
}) {
  const iconType =
    actionType && actionType !== 'variable'
      ? (actionType as Pf2ActionType)
      : undefined

  return (
    <li>
      <ExpandableCard
        selected={highlight}
        title={title}
        subtitle={meta}
        toolbar={toolbar}
        badges={
          <>
            {iconType ? (
              <ActionCost type={iconType} />
            ) : actionType === 'variable' ? (
              <Badge className="!text-[9px]">Custo variável</Badge>
            ) : null}
            {badges}
          </>
        }
      >
        {children}
      </ExpandableCard>
    </li>
  )
}

function CharacterActionCard({
  item,
  sheet,
}: {
  item: CharacterActionItem
  sheet: ResolvedCharacterSheet
}) {
  const typeBadge = item.kind === 'feat' ? featTypeLabel(item.badge) : undefined
  return (
    <ActionCardShell
      highlight
      title={item.name}
      actionType={item.actionType}
      meta={[item.kind === 'feat' ? 'Feito' : 'Habilidade', item.sourceLabel]
        .filter(Boolean)
        .join(' · ')}
      badges={
        typeBadge ? (
          <Badge className="!text-[9px]">{typeBadge}</Badge>
        ) : undefined
      }
      toolbar={
        <CombatActionRolls
          sheet={sheet}
          displayName={item.name}
          traits={item.traits}
          description={item.description}
        />
      }
    >
      {item.description ? (
        <RichText as="p" className="whitespace-pre-wrap">
          {polishRulesText(item.description)}
        </RichText>
      ) : (
        <p className="italic text-text-dim">Sem texto longo neste resumo.</p>
      )}
    </ActionCardShell>
  )
}

function BasicActionCard({
  action,
  sheet,
}: {
  action: CombatAction
  sheet: ResolvedCharacterSheet
}) {
  return (
    <ActionCardShell
      title={action.name}
      actionType={action.actionType}
      meta={`${action.category === 'basic' ? 'Ação básica' : 'Ação especial'} · ${formatActionSource(action.source)}`}
      badges={
        <>
          {action.traits.map((t) => (
            <Badge key={t} className="!text-[9px]">
              {localizeTraitLabel(t)}
            </Badge>
          ))}
        </>
      }
      toolbar={
        <CombatActionRolls
          sheet={sheet}
          displayName={action.name}
          traits={action.traits}
          description={action.description}
          actionId={action.id}
        />
      }
    >
      {action.trigger && (
        <p>
          <span className="font-medium text-text">Gatilho:</span> {polishRulesText(action.trigger)}
        </p>
      )}
      {action.requirements && (
        <p>
          <span className="font-medium text-text">Requisitos:</span>{' '}
          {polishRulesText(action.requirements)}
        </p>
      )}
      <RichText as="p" className="whitespace-pre-wrap">
        {polishRulesText(action.description)}
      </RichText>
    </ActionCardShell>
  )
}

interface CombatActionsPanelProps {
  sheet: ResolvedCharacterSheet
}

export function CombatActionsPanel({ sheet }: CombatActionsPanelProps) {
  const [query, setQuery] = useState('')
  const [costFilters, setCostFilters] = useState<CostFilter[]>([])
  const [scope, setScope] = useState<Array<'mine' | 'basic' | 'specialty'>>([])

  const q = query.trim().toLowerCase()

  const characterActions = useMemo(
    () => collectCharacterActions(sheet),
    [sheet],
  )

  const filteredMine = useMemo(() => {
    if (scope.length > 0 && !scope.includes('mine')) return []
    return characterActions.filter((item) => {
      if (!matchesCostFilter(item.actionType, costFilters)) return false
      return matchesQuery(
        [item.name, item.originalName, item.sourceLabel, item.description]
          .filter(Boolean)
          .join(' '),
        q,
      )
    })
  }, [characterActions, costFilters, q, scope])

  const filteredBasic = useMemo(() => {
    if (scope.length > 0 && !scope.includes('basic')) return []
    return BASIC_ACTIONS.filter((a) => a.category === 'basic')
      .filter((a) => matchesCostFilter(a.actionType, costFilters))
      .filter((a) =>
        matchesQuery(
          [
            a.name,
            a.originalName,
            a.description,
            a.trigger,
            a.requirements,
            ...a.traits,
          ]
            .filter(Boolean)
            .join(' '),
          q,
        ),
      )
      .sort((a, b) => COST_ORDER[a.actionType] - COST_ORDER[b.actionType] || a.name.localeCompare(b.name, 'pt-BR'))
  }, [costFilters, q, scope])

  const filteredSpecialty = useMemo(() => {
    if (scope.length > 0 && !scope.includes('specialty')) return []
    return BASIC_ACTIONS.filter((a) => a.category === 'specialty')
      .filter((a) => matchesCostFilter(a.actionType, costFilters))
      .filter((a) =>
        matchesQuery(
          [
            a.name,
            a.originalName,
            a.description,
            a.trigger,
            a.requirements,
            ...a.traits,
          ]
            .filter(Boolean)
            .join(' '),
          q,
        ),
      )
      .sort((a, b) => COST_ORDER[a.actionType] - COST_ORDER[b.actionType] || a.name.localeCompare(b.name, 'pt-BR'))
  }, [costFilters, q, scope])

  const total =
    filteredMine.length + filteredBasic.length + filteredSpecialty.length

  return (
    <Panel
      quiet
      compact
      title="Ações"
      subtitle="feitos no topo · básicas e especiais abaixo"
    >
      <div className="space-y-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar ação, feito, gatilho…"
          aria-label="Buscar ações"
        />
        <FilterCount
          shown={total}
          total={characterActions.length + BASIC_ACTIONS.length}
        />

        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Custo
          </div>
          <CostFilterChips selected={costFilters} onChange={setCostFilters} />
        </div>

        <MultiFilter
          label="Origem"
          emptyLabel="Todas"
          options={[
            { value: 'mine', label: 'Seus feitos / habilidades' },
            { value: 'basic', label: 'Ações básicas' },
            { value: 'specialty', label: 'Ações especiais' },
          ]}
          selected={scope}
          onChange={setScope}
        />

        <p className="text-[11px] text-text-dim">
          {total === 0
            ? 'Nada com esses filtros.'
            : `${total} ação${total === 1 ? '' : 'ões'} · referência Player Core / AoN`}
        </p>

        {filteredMine.length > 0 && (
          <section>
            <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
              Seus feitos e habilidades
              <span className="ml-1.5 font-normal text-text-dim">
                ({filteredMine.length})
              </span>
            </h3>
            <ul className="grid items-start gap-2 sm:grid-cols-2">
              {filteredMine.map((item) => (
                <CharacterActionCard key={item.id} item={item} sheet={sheet} />
              ))}
            </ul>
          </section>
        )}

        {filteredMine.length === 0 &&
          characterActions.length === 0 &&
          (scope.length === 0 || scope.includes('mine')) &&
          !q &&
          costFilters.length === 0 && (
            <p className="rounded-lg border border-dashed border-border/80 px-3 py-2 text-xs text-text-dim">
              Feitos com{' '}
              <span className="inline-flex items-center gap-0.5 align-middle">
                <ActionIcon type="one" />
                <ActionIcon type="two" />
                <ActionIcon type="three" />
                <ActionIcon type="free" />
                <ActionIcon type="reaction" />
              </span>{' '}
              aparecem aqui no topo assim que você os escolher na aba Feitos.
            </p>
          )}

        {filteredBasic.length > 0 && (
          <section>
            <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              Ações básicas
              <span className="ml-1.5 font-normal text-text-dim">
                ({filteredBasic.length})
              </span>
            </h3>
            <ul className="grid items-start gap-2 sm:grid-cols-2">
              {filteredBasic.map((action) => (
                <BasicActionCard key={action.id} action={action} sheet={sheet} />
              ))}
            </ul>
          </section>
        )}

        {filteredSpecialty.length > 0 && (
          <section>
            <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              Ações especiais
              <span className="ml-1.5 font-normal text-text-dim">
                ({filteredSpecialty.length})
              </span>
            </h3>
            <ul className="grid items-start gap-2 sm:grid-cols-2">
              {filteredSpecialty.map((action) => (
                <BasicActionCard key={action.id} action={action} sheet={sheet} />
              ))}
            </ul>
          </section>
        )}
      </div>
    </Panel>
  )
}
