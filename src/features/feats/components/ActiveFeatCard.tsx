import type { GrantedFeat } from '@/types'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import {
  descriptionLooksEnglish,
  localizeTraitLabel,
} from '@/data/i18n/traitLabelsPt'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'

const FEAT_TYPE_LABELS: Record<string, string> = {
  ancestry: 'Ancestralidade',
  class: 'Classe',
  skill: 'Perícia',
  general: 'Geral',
  archetype: 'Arquétipo',
  heritage: 'Herança',
  background: 'Origem',
  other: 'Outro',
}

function stripMdLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

export function ActiveFeatCard({ feat }: { feat: GrantedFeat }) {
  const specialized = /\([^)]+\)/.test(feat.featName)
  const localized = withLocalizedFeatName({
    name: feat.featName,
    originalName: feat.originalName ?? feat.featName,
    description: feat.description ?? '',
    trigger: feat.trigger,
    frequency: feat.frequency,
    traits: feat.traits ?? [],
  })
  const typeLabel = feat.featType
    ? (FEAT_TYPE_LABELS[feat.featType] ?? feat.featType)
    : feat.sourceType === 'featSelection'
      ? 'Escolhido'
      : FEAT_TYPE_LABELS[feat.sourceType] ?? feat.sourceType
  const displayName = specialized ? feat.featName : localized.name
  const englishHint =
    localized.description && descriptionLooksEnglish(localized.description)

  return (
    <ExpandableCard
      title={displayName}
      subtitle={`${feat.sourceLabel}${
        feat.originalName && feat.originalName !== displayName
          ? ` · ${feat.originalName}`
          : ''
      }`}
      badges={
        <>
          <ActionCost type={feat.actionType} />
          {feat.level != null ? (
            <Badge className="!text-[9px]">nv. {feat.level}</Badge>
          ) : null}
          <Badge className="!text-[9px]">{typeLabel}</Badge>
          {feat.sourceType === 'featSelection' ? (
            <Badge tone="accent" className="!text-[9px]">
              Slot
            </Badge>
          ) : (
            <Badge tone="info" className="!text-[9px]">
              Automático
            </Badge>
          )}
        </>
      }
    >
      <div className="flex flex-wrap gap-1">
        {feat.rarity ? <RarityBadge rarity={feat.rarity} /> : null}
        {feat.actionType && feat.actionType !== 'passive' ? (
          <span className="inline-flex items-center rounded-md border border-border/70 bg-surface-2/60 px-1.5 py-0.5">
            <ActionCost type={feat.actionType} />
          </span>
        ) : null}
        {(localized.traits ?? []).map((trait) => (
          <Badge key={trait}>{localizeTraitLabel(trait)}</Badge>
        ))}
      </div>
      {localized.trigger ? (
        <p className="text-[11px] text-text-muted">
          <span className="font-semibold text-text">Gatilho: </span>
          {stripMdLinks(localized.trigger)}
        </p>
      ) : null}
      {localized.frequency ? (
        <p className="text-[11px] text-text-muted">
          <span className="font-semibold text-text">Frequência: </span>
          {stripMdLinks(localized.frequency)}
        </p>
      ) : null}
      {englishHint ? (
        <p className="text-[10px] text-accent/80">
          Descrição ainda no original em inglês (tradução em andamento).
        </p>
      ) : null}
      {localized.description ? (
        <RichText
          as="p"
          className="whitespace-pre-wrap leading-relaxed text-text-muted"
        >
          {localized.description}
        </RichText>
      ) : (
        <p className="italic text-text-dim">
          Texto deste feito ainda não está cadastrado.
        </p>
      )}
      {feat.aonUrl ? (
        <a
          href={feat.aonUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-[10px] text-accent hover:underline"
        >
          Archives of Nethys ↗
        </a>
      ) : null}
    </ExpandableCard>
  )
}
