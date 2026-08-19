import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import type {
  Archetype,
  ArchetypeProgress,
  AttributeId,
  Feat,
  FeatSelection,
  Heritage,
  ProficiencyRank,
  SkillId,
} from '@/types'
import { ARCHETYPE_GROUP_LABELS, ARCHETYPE_KIND_LABELS } from '@/types'
import {
  evaluateFeatAvailability,
  evaluateFeatPrerequisiteChecks,
  extraAncestryIdsFromFeatChoices,
  extraAncestryIdsFromHeritage,
  extraHeritageIdsFromHeritage,
  isVersatileHeritage,
  listArchetypes,
} from '@/engine'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { PrerequisiteChecks } from '@/features/feats/components/PrerequisiteChecks'
import { FeatExpandRow } from '@/features/feats/components/FeatExpandRow'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'

interface ArchetypePanelProps {
  progress: ArchetypeProgress[]
  feats: Feat[]
  character: {
    level: number
    ancestryId?: string | null
    heritageId?: string | null
    classId?: string | null
    featChoices?: Record<string, string>
    featSelections?: FeatSelection[]
    mythicCallingId?: string | null
  }
  heritage?: Heritage | null
  skillRanks?: Partial<Record<SkillId, ProficiencyRank>>
  attributeModifiers?: Partial<Record<AttributeId, number>>
  className?: string
  onGoToFeats?: () => void
  freeArchetype?: boolean
  ignoreDedicationLock?: boolean
  mythicRules?: boolean
}

export function ArchetypePanel({
  progress,
  feats,
  character,
  heritage = null,
  skillRanks,
  attributeModifiers,
  className = '',
  onGoToFeats,
  freeArchetype = false,
  ignoreDedicationLock = false,
  mythicRules = false,
}: ArchetypePanelProps) {
  const catalog = listArchetypes()
  const [query, setQuery] = useState('')
  const [onlyOnSheet, setOnlyOnSheet] = useState(false)
  const searchRef = useSlashSearch()
  const progressById = new Map(
    progress
      .filter((p) => p.archetypeId)
      .map((p) => [p.archetypeId as string, p]),
  )
  const featsById = useMemo(
    () => new Map(feats.map((feat) => [feat.id, feat])),
    [feats],
  )
  const selectedFeatIds = (character.featSelections ?? []).map((s) => s.featId)
  const activeHeritage =
    heritage && heritage.id === character.heritageId ? heritage : null
  const availCtx = useMemo(
    () => ({
      level: character.level,
      ancestryId: character.ancestryId,
      heritageId: character.heritageId,
      extraAncestryIds: [
        ...extraAncestryIdsFromHeritage(activeHeritage),
        ...extraAncestryIdsFromFeatChoices(character.featChoices),
      ],
      extraHeritageIds: extraHeritageIdsFromHeritage(activeHeritage),
      hasVersatileHeritage: isVersatileHeritage(activeHeritage),
      classId: character.classId,
      selectedFeatIds,
      skillRanks,
      attributeModifiers,
      featsById,
      ignoreDedicationLock,
      mythicRulesEnabled: mythicRules,
      mythicCallingId: character.mythicCallingId,
    }),
    [
      character.level,
      character.ancestryId,
      character.heritageId,
      character.classId,
      character.featChoices,
      character.mythicCallingId,
      selectedFeatIds,
      skillRanks,
      attributeModifiers,
      featsById,
      activeHeritage,
      ignoreDedicationLock,
      mythicRules,
    ],
  )
  const q = query.trim().toLowerCase()
  const visible = catalog.filter((a) => {
    if (onlyOnSheet && !progressById.has(a.id)) return false
    if (!q) return true
    return (
      a.name.toLowerCase().includes(q) ||
      a.originalName.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    )
  })
  const multiclass = visible.filter((a) => a.kind === 'multiclass')
  const other = visible.filter((a) => a.kind !== 'multiclass')

  return (
    <div className={`animate-fade-up space-y-3 ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-wide text-text">
            Arquétipos
          </h2>
          <p className="mt-0.5 text-sm text-text-dim">
            Dedicação entra pelos slots de classe
            {freeArchetype ? ' (e pelos slots extras de Arquétipos grátis)' : ''}
            .{' '}
            <Link to="/compendio/arquetipos" className="text-accent hover:underline">
              Abrir no compêndio
            </Link>
          </p>
        </div>
        {onGoToFeats && (
          <Button size="sm" variant="secondary" onClick={onGoToFeats}>
            Ir aos feitos
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Input
          ref={searchRef}
          className="min-w-[12rem] flex-1"
          placeholder="Buscar arquétipo… (/)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          size="sm"
          variant={onlyOnSheet ? 'accent' : 'secondary'}
          onClick={() => setOnlyOnSheet((v) => !v)}
        >
          Só na ficha
        </Button>
        <span className="text-[11px] text-text-dim">
          {visible.length} de {catalog.length}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-surface-1 px-3 py-2 text-sm">
        <span className="text-text-muted">
          {freeArchetype
            ? 'Com Arquétipos grátis, cada nível par ganha um slot extra só de arquétipo, além dos slots de classe.'
            : 'Arquétipos entram pelos slots de classe (feito de Dedicação). Não há slot separado.'}
        </span>
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
        <RuleCard
          title="Dedicação"
          body={
            freeArchetype
              ? 'É o primeiro feito do arquétipo. Cabe no slot de classe ou no slot de Arquétipo grátis (nv. 2+).'
              : 'É o primeiro feito do arquétipo. Ocupa um slot de classe (nv. 2+ na maioria das classes).'
          }
        />
        <RuleCard
          title="Dois feitos"
          body={
            ignoreDedicationLock
              ? 'O bloqueio de 2 feitos entre Dedicações está desligado nesta mesa (opção da regra variante).'
              : 'Depois da Dedicação, pegue 2 feitos daquele arquétipo antes de outra Dedicação.'
          }
        />
        <RuleCard
          title="Multiclasse"
          body="Não dá para pegar a Dedicação da sua própria classe. O motor já bloqueia isso."
        />
      </div>

      {catalog.length === 0 ? (
        <Panel title="Nenhum arquétipo ainda" quiet>
          <Tip>
            O catálogo oficial ainda está vazio — a estrutura já está pronta.
          </Tip>
        </Panel>
      ) : visible.length === 0 ? (
        <Panel quiet>
          <p className="text-sm text-text-dim">
            Nenhum arquétipo neste filtro.
          </p>
        </Panel>
      ) : (
        <>
          <CatalogGroup
            title={ARCHETYPE_GROUP_LABELS.multiclass}
            items={multiclass}
            progressById={progressById}
            featsById={featsById}
            availCtx={availCtx}
            onGoToFeats={onGoToFeats}
            ignoreDedicationLock={ignoreDedicationLock}
          />
          <CatalogGroup
            title={ARCHETYPE_GROUP_LABELS.other}
            items={other}
            progressById={progressById}
            featsById={featsById}
            availCtx={availCtx}
            onGoToFeats={onGoToFeats}
            ignoreDedicationLock={ignoreDedicationLock}
          />
        </>
      )}
    </div>
  )
}

function CatalogGroup({
  title,
  items,
  progressById,
  featsById,
  availCtx,
  onGoToFeats,
  ignoreDedicationLock = false,
}: {
  title: string
  items: Archetype[]
  progressById: Map<string, ArchetypeProgress>
  featsById: Map<string, Feat>
  availCtx: Parameters<typeof evaluateFeatAvailability>[1]
  onGoToFeats?: () => void
  ignoreDedicationLock?: boolean
}) {
  if (items.length === 0) return null
  return (
    <div className="space-y-2">
      <h2 className="px-0.5 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
        {title}
      </h2>
      <ul className="grid gap-2 lg:grid-cols-2">
        {items.map((arch) => {
          const entry = progressById.get(arch.id)
          const dedication = featsById.get(arch.dedicationFeatId)
          const availability = dedication
            ? evaluateFeatAvailability(dedication, availCtx)
            : null
          const checks = dedication
            ? evaluateFeatPrerequisiteChecks(dedication, availCtx)
            : []
          const missing = checks
            .filter((check) => check.met === false)
            .map((check) => check.label)
          const available = availability?.available ?? true
          const extraReasons = (availability?.reasons ?? []).filter(
            (reason) =>
              !missing.some(
                (label) => reason === label || reason.includes(label),
              ),
          )
          return (
            <li key={arch.id}>
              <ExpandableCard
                title={arch.name}
                subtitle={
                  entry
                    ? ARCHETYPE_KIND_LABELS[arch.kind]
                    : missing.length > 0
                      ? `${ARCHETYPE_KIND_LABELS[arch.kind]} · ${
                          missing.length === 1 &&
                          /^(Pegue|Este feito|Requer|Escolha|Feito de)/i.test(
                            missing[0],
                          )
                            ? missing[0]
                            : `falta ${missing.join(', ')}`
                        }`
                      : ARCHETYPE_KIND_LABELS[arch.kind]
                }
                badges={
                  entry ? (
                    entry.incomplete && !ignoreDedicationLock ? (
                      <Badge tone="accent">Em andamento</Badge>
                    ) : (
                      <Badge tone="success">Livre para outra Dedicação</Badge>
                    )
                  ) : available ? (
                    <Badge tone="success">Disponível</Badge>
                  ) : (
                    <Badge className="border-danger/35 bg-danger/10 text-danger">
                      Indisponível
                    </Badge>
                  )
                }
                lazyBody={() => (
                  <ArchetypeCardBody
                    arch={arch}
                    entry={entry}
                    dedication={dedication}
                    checks={checks}
                    extraReasons={extraReasons}
                    featsById={featsById}
                    onGoToFeats={onGoToFeats}
                    ignoreDedicationLock={ignoreDedicationLock}
                  />
                )}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ArchetypeCardBody({
  arch,
  entry,
  dedication,
  checks,
  extraReasons,
  featsById,
  onGoToFeats,
  ignoreDedicationLock,
}: {
  arch: Archetype
  entry?: ArchetypeProgress
  dedication?: Feat
  checks: ReturnType<typeof evaluateFeatPrerequisiteChecks>
  extraReasons: string[]
  featsById: Map<string, Feat>
  onGoToFeats?: () => void
  ignoreDedicationLock: boolean
}) {
  const extraFeats = (() => {
    const fromIds = arch.featIds
      .map((id) => featsById.get(id))
      .filter((f): f is Feat => Boolean(f))
    const fromLink = [...featsById.values()].filter(
      (f) =>
        f.archetypeId === arch.id &&
        f.id !== arch.dedicationFeatId &&
        !f.isDedication,
    )
    const map = new Map<string, Feat>()
    for (const f of [...fromIds, ...fromLink]) map.set(f.id, f)
    return [...map.values()].sort(
      (a, b) => a.level - b.level || a.name.localeCompare(b.name, 'pt-BR'),
    )
  })()

  return (
    <>
      <RichText as="p" className="leading-relaxed text-text-muted">
        {polishRulesText(arch.description)}
      </RichText>
      {checks.length > 0 ? (
        <div>
          <p className="mb-1 text-[11px] font-semibold text-text">
            Pré-requisitos da Dedicação
          </p>
          <PrerequisiteChecks checks={checks} compact />
        </div>
      ) : null}
      {extraReasons.length > 0 ? (
        <p className="text-[11px] text-danger">{extraReasons.join(' ')}</p>
      ) : null}
      {dedication ? (
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-text">Dedicação</p>
          <ArchetypeFeatRow feat={dedication} catalog={featsById} />
        </div>
      ) : (
        <p className="text-[11px] text-text-dim">
          Feito de Dedicação ainda não ligado no catálogo.
        </p>
      )}
      {extraFeats.length > 0 ? (
        <div className="space-y-1">
          <p className="text-[11px] font-semibold text-text">
            Feitos do arquétipo
          </p>
          {extraFeats.map((feat) => (
            <ArchetypeFeatRow
              key={feat.id}
              feat={feat}
              catalog={featsById}
            />
          ))}
        </div>
      ) : null}
      {entry ? (
        <>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
            <div
              className="h-full rounded-full bg-accent"
              style={{
                width: `${Math.min(
                  100,
                  (entry.otherFeatCount /
                    Math.max(1, entry.requiredBeforeNext)) *
                    100,
                )}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-text-dim">
            {entry.otherFeatCount}/{entry.requiredBeforeNext} feitos além da
            Dedicação
            {entry.incomplete && !ignoreDedicationLock
              ? ' — ainda não pode pegar outra Dedicação.'
              : '.'}
          </p>
        </>
      ) : (
        <p className="text-[11px] text-text-dim">
          {arch.featIds.length + 1} feitos no pacote · comece pela Dedicação no
          slot de classe.
          {onGoToFeats ? (
            <>
              {' '}
              <button
                type="button"
                className="text-accent hover:underline"
                onClick={onGoToFeats}
              >
                Escolher nos feitos
              </button>
            </>
          ) : null}
        </p>
      )}
    </>
  )
}

function ArchetypeFeatRow({
  feat,
  catalog,
}: {
  feat: Feat
  catalog: Map<string, Feat>
}) {
  const [open, setOpen] = useState(false)
  return (
    <FeatExpandRow
      feat={feat}
      open={open}
      onToggle={() => setOpen((value) => !value)}
      featCatalog={catalog}
    />
  )
}

function RuleCard({ title, body }: { title: string; body: string }) {
  return (
    <ExpandableCard compact title={title}>
      <p className="leading-relaxed text-text-muted">{body}</p>
    </ExpandableCard>
  )
}
