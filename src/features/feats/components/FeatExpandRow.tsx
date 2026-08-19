import type { ReactNode } from 'react'
import type { Feat, FeatPrerequisite, FeatPrerequisiteCheck } from '@/types'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import {
  descriptionLooksEnglish,
  localizeTraitLabel,
} from '@/data/i18n/traitLabelsPt'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'
import { PrerequisiteChecks } from '@/features/feats/components/PrerequisiteChecks'
import { ATTRIBUTE_LABELS, PROFICIENCY_LABELS, SKILL_LABELS } from '@/utils/labels'

function stripMdLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

export function formatFeatPrerequisite(pre: FeatPrerequisite): string {
  switch (pre.kind) {
    case 'level':
      return `nível ${pre.min}+`
    case 'feat':
      return pre.featName ?? 'feito'
    case 'ancestry':
      return 'ancestralidade específica'
    case 'class':
      return 'classe específica'
    case 'heritage':
      return 'herança específica'
    case 'archetype':
      return 'Dedicação deste arquétipo'
    case 'attribute':
      return `${ATTRIBUTE_LABELS[pre.attributeId]} ${
        pre.min >= 0 ? `+${pre.min}` : pre.min
      }`
    case 'skillRank':
      return `${PROFICIENCY_LABELS[pre.rank]} em ${SKILL_LABELS[pre.skillId]}`
    case 'text':
      return pre.label
    default:
      return ''
  }
}

export function FeatExpandRow({
  feat,
  open,
  onToggle,
  locked,
  extraBadges,
  footer,
  prerequisiteChecks,
  featCatalog,
}: {
  feat: Feat
  open: boolean
  onToggle: () => void
  locked?: boolean
  extraBadges?: ReactNode
  footer?: ReactNode
  prerequisiteChecks?: FeatPrerequisiteCheck[]
  featCatalog?: Feat[] | Map<string, Feat>
}) {
  const localized = withLocalizedFeatName(feat, featCatalog)
  const prereqs = (localized.prerequisites ?? [])
    .filter(
      (pre) =>
        !(
          pre.kind === 'text' &&
          /^(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s*\+?-?\d+$/i.test(
            pre.label.trim(),
          )
        ),
    )
    .map(formatFeatPrerequisite)
    .filter(Boolean)
  const uniquePrereqs = [...new Set(prereqs)]

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-start justify-between gap-2 rounded-lg border px-2 py-1.5 text-left transition-colors ${
          open
            ? 'border-accent/50 bg-accent/10'
            : 'border-border/60 bg-surface-2/40 hover:border-border-strong'
        } ${locked ? 'opacity-55' : ''}`}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs font-medium text-text">
              {localized.name}
            </span>
            <ActionCost type={localized.actionType} />
            <Badge className="!text-[9px]">nv. {localized.level}</Badge>
            {extraBadges}
          </div>
          {localized.originalName &&
            localized.originalName !== localized.name && (
              <div className="truncate text-[10px] text-text-dim">
                {localized.originalName}
              </div>
            )}
        </div>
        <span className="text-[10px] text-text-dim">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="mt-1 space-y-1.5 rounded-lg border border-border/50 bg-surface-1 px-2.5 py-2">
          <div className="flex flex-wrap gap-1">
            <RarityBadge rarity={localized.rarity} />
            {localized.actionType && localized.actionType !== 'passive' && (
              <span className="inline-flex items-center rounded-md border border-border/70 bg-surface-2/60 px-1.5 py-0.5">
                <ActionCost type={localized.actionType} />
              </span>
            )}
            {localized.traits.map((t) => (
              <Badge key={t}>{localizeTraitLabel(t)}</Badge>
            ))}
          </div>
          {prerequisiteChecks && prerequisiteChecks.length > 0 ? (
            <div>
              <p className="mb-1 text-[10px] font-semibold text-text">
                Pré-requisitos
              </p>
              <PrerequisiteChecks checks={prerequisiteChecks} compact />
            </div>
          ) : uniquePrereqs.length > 0 ? (
            <p className="text-[10px] text-text-dim">
              Pré-requisitos: {uniquePrereqs.join('; ')}
            </p>
          ) : null}
          {localized.trigger && (
            <p className="text-[11px] text-text-muted">
              <span className="font-semibold text-text">Gatilho: </span>
              {stripMdLinks(localized.trigger)}
            </p>
          )}
          {localized.frequency && (
            <p className="text-[11px] text-text-muted">
              <span className="font-semibold text-text">Frequência: </span>
              {stripMdLinks(localized.frequency)}
            </p>
          )}
          {descriptionLooksEnglish(localized.description) && (
            <p className="text-[10px] text-accent/80">
              Descrição ainda no original em inglês (tradução em andamento).
            </p>
          )}
          <RichText
            as="p"
            className="whitespace-pre-wrap text-[11px] leading-relaxed text-text-muted"
          >
            {localized.description}
          </RichText>
          {footer}
        </div>
      )}
    </div>
  )
}
