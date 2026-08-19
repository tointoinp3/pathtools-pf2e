import type { ReactNode } from 'react'
import type { Spell } from '@/types'
import { isHomebrewSpell } from '@/types'
import { TRADITION_LABELS } from '@/utils/labels'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { spellKind, spellKindLabel, spellRankLabel } from '@/features/spells/spellUi'

function SpellStat({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="grid grid-cols-[7.5rem_1fr] gap-x-2 text-[12px] leading-snug">
      <dt className="text-text-dim">{label}</dt>
      <dd className="text-text">
        <RichText>{value}</RichText>
      </dd>
    </div>
  )
}

export function SpellFacts({
  spell,
  tip,
}: {
  spell: Spell
  tip?: string
}) {
  const kind = spellKind(spell)
  const body = spell.description?.trim() || spell.summary?.trim() || ''

  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone={kind === 'focus' ? 'accent' : 'neutral'}>
          {spellKindLabel(kind)}
        </Badge>
        <Badge>{spellRankLabel(spell.rank)}</Badge>
        {spell.rarity !== 'common' && <RarityBadge rarity={spell.rarity} />}
        {isHomebrewSpell(spell) && <ProvenanceBadge type="homebrew" />}
        {spell.actionType ? <ActionCost type={spell.actionType} /> : null}
      </div>

      <p className="text-[11px] text-text-dim">{spell.originalName}</p>

      {spell.traditions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {spell.traditions.map((t) => (
            <Badge key={t} tone="info">
              {TRADITION_LABELS[t]}
            </Badge>
          ))}
        </div>
      )}

      {spell.traits.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {spell.traits.map((trait) => (
            <Badge key={trait}>{localizeTraitLabel(trait)}</Badge>
          ))}
        </div>
      )}

      {([
        spell.requirements,
        spell.trigger,
        spell.range,
        spell.area,
        spell.targets,
        spell.defense,
        spell.duration,
      ].some(Boolean)) && (
        <dl className="space-y-1 rounded-lg border border-border/60 bg-surface-2/40 px-2.5 py-2">
          <SpellStat label="Requisitos" value={spell.requirements} />
          <SpellStat label="Gatilho" value={spell.trigger} />
          <SpellStat label="Alcance" value={spell.range} />
          <SpellStat label="Área" value={spell.area} />
          <SpellStat label="Alvos" value={spell.targets} />
          <SpellStat label="Defesa" value={spell.defense} />
          <SpellStat label="Duração" value={spell.duration} />
        </dl>
      )}

      {body ? (
        <div className="whitespace-pre-wrap text-[13px] leading-relaxed text-text">
          <RichText as="div">{body}</RichText>
        </div>
      ) : null}

      {spell.aonUrl && (
        <a
          href={spell.aonUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-[11px] text-accent hover:underline"
        >
          Archives of Nethys
        </a>
      )}

      {tip ? <p className="text-[11px] text-text-dim">{tip}</p> : null}
    </div>
  )
}

export function SpellDetailPanel({
  spell,
  actions,
  emptyLabel = 'Selecione uma magia na lista.',
  tip,
}: {
  spell: Spell | null
  actions?: ReactNode
  emptyLabel?: string
  tip?: string
}) {
  return (
    <Panel
      title={spell ? spell.name : 'Magia'}
      subtitle={spell ? spellRankLabel(spell.rank) : undefined}
      className="flex h-full min-h-0 w-full shrink-0 flex-col lg:w-[26rem] lg:flex-none"
      bodyClassName="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      actions={actions}
    >
      {spell ? (
        <SpellFacts spell={spell} tip={tip} />
      ) : (
        <p className="px-1 py-6 text-center text-sm text-text-dim">{emptyLabel}</p>
      )}
    </Panel>
  )
}
