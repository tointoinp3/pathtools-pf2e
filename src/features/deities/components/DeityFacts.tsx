import { useMemo, type ReactNode } from 'react'
import type { Deity } from '@/types/deity'
import { isHomebrewDeity } from '@/types/deity'
import { getDomainByOriginalName } from '@/data/seeds/domains'
import {
  DIVINE_FONT_LABELS,
  SANCTIFICATION_LABELS,
  SANCTIFICATION_CHOICE_DESCRIPTIONS,
  domainRulesBlurb,
  fontChoiceDescription,
  spellViewForRules,
} from '@/engine/deity'
import { catalogSpells } from '@/data/seeds/spells'
import { getHomebrewSpells } from '@/engine/spellRegistry'
import {
  DEITY_KIND_LABELS,
  localizeDeityCategory,
  localizeDeityWeapon,
  localizeDomainName,
} from '@/features/deities/localizeDeities'
import { localizeSpellName } from '@/data/i18n/spellNamesPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { ATTRIBUTE_LABELS, SKILL_LABELS } from '@/utils/labels'
import { ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { ActionCost } from '@/components/ui/ActionIcon'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import type { Spell } from '@/types'

function Chip({
  children,
  tone = 'muted',
}: {
  children: ReactNode
  tone?: 'muted' | 'gold' | 'rose' | 'sage'
}) {
  const cls =
    tone === 'gold'
      ? 'border-accent/40 bg-accent/10 text-accent'
      : tone === 'rose'
        ? 'border-rose-400/35 bg-rose-500/10 text-rose-200'
        : tone === 'sage'
          ? 'border-emerald-400/35 bg-emerald-500/10 text-emerald-200'
          : 'border-border bg-surface-3 text-text-muted'
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] ${cls}`}
    >
      {children}
    </span>
  )
}

function RulesCard({
  title,
  subtitle,
  actionType,
  children,
}: {
  title: string
  subtitle?: string
  actionType?: Spell['actionType']
  children: string
}) {
  return (
    <ExpandableCard
      compact
      title={title}
      subtitle={subtitle}
      badges={
        actionType ? <ActionCost type={actionType} /> : undefined
      }
    >
      <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
        {polishRulesText(children)}
      </RichText>
    </ExpandableCard>
  )
}

export function DeityFacts({ deity }: { deity: Deity }) {
  const catalog = useMemo(
    () => [...catalogSpells, ...getHomebrewSpells()],
    [],
  )

  const fontLabel =
    deity.font.length === 0
      ? '—'
      : deity.font.length === 2
        ? 'Curar ou Ferir'
        : DIVINE_FONT_LABELS[deity.font[0] ?? 'heal']

  const sanctLabel =
    deity.sanctification.length === 0
      ? 'Nenhuma'
      : deity.sanctificationRequired
        ? deity.sanctification.map((s) => SANCTIFICATION_LABELS[s]).join(' ou ')
        : `Pode escolher ${deity.sanctification.map((s) => SANCTIFICATION_LABELS[s]).join(' ou ')}`

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Chip tone="gold">{DEITY_KIND_LABELS[deity.kind]}</Chip>
        <Chip>{localizeDeityCategory(deity.category)}</Chip>
        {deity.rarity !== 'common' && <RarityBadge rarity={deity.rarity} />}
        {isHomebrewDeity(deity) && <ProvenanceBadge type="homebrew" />}
        <span className="text-[11px] text-text-dim">{deity.source}</span>
      </div>

      {deity.areasOfConcern.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {deity.areasOfConcern.map((area) => (
            <Chip key={area}>{area}</Chip>
          ))}
        </div>
      )}

      <p className="text-sm text-text-muted">
        <RichText>{deity.summary}</RichText>
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/8 px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-300/90">
            Editos
          </p>
          {deity.edicts.length > 0 ? (
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] text-text">
              {deity.edicts.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-[12px] text-text-dim">Nenhum listado.</p>
          )}
        </div>
        <div className="rounded-xl border border-rose-400/25 bg-rose-500/8 px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-rose-300/90">
            Anátema
          </p>
          {deity.anathema.length > 0 ? (
            <ul className="mt-1 list-disc space-y-0.5 pl-4 text-[12px] text-text">
              {deity.anathema.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 text-[12px] text-text-dim">Nenhum listado.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[12px] sm:grid-cols-3">
        <Fact
          label="Atributos divinos"
          value={
            deity.attributes.length
              ? deity.attributes.map((id) => ATTRIBUTE_LABELS[id]).join(' ou ')
              : '—'
          }
        />
        <Fact
          label="Perícia divina"
          value={deity.skillId ? SKILL_LABELS[deity.skillId] : '—'}
        />
        <Fact label="Fonte divina" value={fontLabel} />
        <Fact label="Santificação" value={sanctLabel} />
        <Fact
          label="Arma favorita"
          value={
            deity.favoredWeapons.length
              ? deity.favoredWeapons.map(localizeDeityWeapon).join(', ')
              : '—'
          }
        />
        <Fact
          label="Panteões"
          value={deity.pantheons.length ? deity.pantheons.join(', ') : '—'}
        />
      </div>

      {deity.font.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Fonte divina
          </p>
          <p className="text-[12px] text-text-muted">
            Só clérigo ganha os espaços extras. Abra o card para ver o que a
            magia faz.
          </p>
          {deity.font.map((font) => {
            const original = font === 'heal' ? 'Heal' : 'Harm'
            const view = spellViewForRules(original, catalog)
            return (
              <RulesCard
                key={font}
                title={DIVINE_FONT_LABELS[font]}
                subtitle={view.meta || undefined}
                actionType={view.actionType}
              >
                {fontChoiceDescription(font, { catalog })}
              </RulesCard>
            )
          })}
        </div>
      )}

      {deity.sanctification.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Santificação
          </p>
          {deity.sanctification.map((sanct) => (
            <RulesCard key={sanct} title={SANCTIFICATION_LABELS[sanct]}>
              {SANCTIFICATION_CHOICE_DESCRIPTIONS[sanct]}
            </RulesCard>
          ))}
          {!deity.sanctificationRequired && (
            <RulesCard title={SANCTIFICATION_LABELS.none}>
              {SANCTIFICATION_CHOICE_DESCRIPTIONS.none}
            </RulesCard>
          )}
        </div>
      )}

      {(deity.primaryDomains.length > 0 || deity.alternateDomains.length > 0) && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Domínios
          </p>
          <p className="text-[12px] text-text-muted">
            Iniciado de Domínio concede a magia inicial. A avançada vem do feito
            Domínio Avançado.
          </p>
          {deity.primaryDomains.map((name) => (
            <DomainRulesCard
              key={name}
              name={name}
              catalog={catalog}
            />
          ))}
          {deity.alternateDomains.map((name) => (
            <DomainRulesCard
              key={`alt-${name}`}
              name={name}
              catalog={catalog}
              alternate
            />
          ))}
        </div>
      )}

      {deity.clericSpells.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
            Magias de clérigo
          </p>
          <p className="text-[12px] text-text-muted">
            Entram na lista divina mesmo que sejam de outra tradição.
          </p>
          {deity.clericSpells.map((name) => {
            const view = spellViewForRules(name, catalog)
            return (
              <RulesCard
                key={name}
                title={view.name}
                subtitle={view.meta || undefined}
                actionType={view.actionType}
              >
                {view.body}
              </RulesCard>
            )
          })}
        </div>
      )}

      {deity.aonUrl && (
        <a
          href={deity.aonUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-[11px] text-accent hover:underline"
        >
          Archives of Nethys
        </a>
      )}
    </div>
  )
}

function DomainRulesCard({
  name,
  catalog,
  alternate,
}: {
  name: string
  catalog: Spell[]
  alternate?: boolean
}) {
  const domain = getDomainByOriginalName(name)
  const title = `${localizeDomainName(name)}${alternate ? ' (alt.)' : ''}`
  if (!domain) {
    return <RulesCard title={title}>{name}</RulesCard>
  }
  const initial = spellViewForRules(domain.initialSpell, catalog)
  const advancedLabel = domain.advancedSpell
    ? ` · Avançada: ${localizeSpellName(domain.advancedSpell)}`
    : ''
  return (
    <RulesCard
      title={title}
      subtitle={`Inicial: ${localizeSpellName(domain.initialSpell)}${advancedLabel}`}
      actionType={initial.actionType}
    >
      {domainRulesBlurb(domain, catalog)}
    </RulesCard>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-surface-2/60 px-2.5 py-2">
      <p className="text-[10px] uppercase tracking-wide text-text-dim">{label}</p>
      <p className="mt-0.5 font-medium text-text">{value}</p>
    </div>
  )
}
