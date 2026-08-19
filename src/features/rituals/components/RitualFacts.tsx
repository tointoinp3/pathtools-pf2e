import type { ReactNode } from 'react'
import type { Ritual } from '@/types'
import { isHomebrewRitual } from '@/types'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { Panel, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'

export function RitualFacts({ ritual }: { ritual: Ritual }) {
  const rows: Array<[string, string]> = [
    ['Conjuração', ritual.castTime],
    ['Custo', ritual.cost],
    ['Teste principal', ritual.primaryCheck],
    ['Conjuradores secundários', ritual.secondaryCasters],
    ['Testes secundários', ritual.secondaryChecks],
    ['Duração', ritual.duration],
    ['Alcance', ritual.range],
    ['Alvo', ritual.target],
  ].filter((row): row is [string, string] => Boolean(row[1]))

  if (rows.length === 0) return null

  return (
    <dl className="mt-2 grid gap-x-4 gap-y-1.5 text-[12px] sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="min-w-0">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            {label}
          </dt>
          <dd className="text-text-muted">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function RitualBody({
  ritual,
  extra,
  tip,
}: {
  ritual: Ritual
  extra?: ReactNode
  tip?: string
}) {
  return (
    <div className="space-y-3 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge>Posto {ritual.rank}</Badge>
        {ritual.rarity !== 'common' && <RarityBadge rarity={ritual.rarity} />}
        {isHomebrewRitual(ritual) && <ProvenanceBadge type="homebrew" />}
      </div>
      <p className="text-[11px] text-text-dim">{ritual.originalName}</p>
      {ritual.traits.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {ritual.traits.map((trait) => (
            <Badge key={trait}>{localizeTraitLabel(trait)}</Badge>
          ))}
        </div>
      )}
      {ritual.source && (
        <p className="text-[11px] text-text-dim">{ritual.source}</p>
      )}
      <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-text">
        <RichText as="div">{ritual.description?.trim() || ritual.summary || ''}</RichText>
      </p>
      <RitualFacts ritual={ritual} />
      {extra}
      {ritual.aonUrl && (
        <a
          href={ritual.aonUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-[11px] text-accent hover:underline"
        >
          Archives of Nethys
        </a>
      )}
      {tip ? <Tip>{tip}</Tip> : (
        <Tip>
          Rituais não gastam espaços de magia. Qualquer personagem pode conhecê-los;
          o teste principal usa perícia.
        </Tip>
      )}
    </div>
  )
}

export function RitualDetailPanel({
  ritual,
  actions,
  extra,
  emptyLabel = 'Selecione um ritual na lista.',
}: {
  ritual: Ritual | null
  actions?: ReactNode
  extra?: ReactNode
  emptyLabel?: string
}) {
  return (
    <Panel
      title={ritual ? ritual.name : 'Ritual'}
      subtitle={ritual ? `Posto ${ritual.rank}` : undefined}
      className="flex min-h-0 w-full shrink-0 flex-col overflow-hidden lg:w-[26rem]"
      actions={actions}
    >
      {ritual ? (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <RitualBody ritual={ritual} extra={extra} />
        </div>
      ) : (
        <p className="px-1 py-6 text-center text-sm text-text-dim">
          {emptyLabel}
        </p>
      )}
    </Panel>
  )
}
