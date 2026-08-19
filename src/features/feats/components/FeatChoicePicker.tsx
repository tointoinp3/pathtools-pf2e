import { useMemo, useState } from 'react'
import type { GrantedFeatPick, GrantedFeatPickOption } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import {
  descriptionLooksEnglish,
  localizeTraitLabel,
} from '@/data/i18n/traitLabelsPt'
import { withLocalizedFeatName } from '@/features/feats/localizeFeats'

function stripMdLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

function localizeOption(option: GrantedFeatPickOption): GrantedFeatPickOption {
  const localized = withLocalizedFeatName({
    name: option.name,
    originalName: option.originalName ?? option.name,
    description: option.description,
    traits: option.traits,
  })
  return { ...option, ...localized }
}

function OptionDetail({
  option,
  selected,
  onChoose,
}: {
  option: GrantedFeatPickOption
  selected: boolean
  onChoose: () => void
}) {
  const view = localizeOption(option)
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {view.actionType && view.actionType !== 'passive' ? (
          <span className="inline-flex items-center rounded-md border border-border/70 bg-surface-2/60 px-1.5 py-0.5">
            <ActionCost type={view.actionType} />
          </span>
        ) : null}
        <Badge className="!text-[9px]">nv. {view.level}</Badge>
        {view.traits.map((trait) => (
          <Badge key={trait}>{localizeTraitLabel(trait)}</Badge>
        ))}
      </div>
      {view.originalName && view.originalName !== view.name ? (
        <p className="text-[11px] text-text-dim">{view.originalName}</p>
      ) : null}
      {descriptionLooksEnglish(view.description) ? (
        <p className="text-[10px] text-accent/80">
          Descrição ainda no original em inglês (tradução em andamento).
        </p>
      ) : null}
      <RichText
        as="p"
        className="whitespace-pre-wrap text-[11px] leading-relaxed text-text-muted"
      >
        {stripMdLinks(view.description)}
      </RichText>
      {option.available ? (
        <Button
          className="w-full"
          variant={selected ? 'secondary' : 'accent'}
          onClick={onChoose}
        >
          {selected ? 'Já escolhido' : 'Escolher este feito'}
        </Button>
      ) : (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-2.5 py-2 text-[11px] text-danger">
          {option.reasons.join(' ') || 'Ainda não cumpre os pré-requisitos.'}
        </p>
      )}
    </div>
  )
}

function OptionRow({
  option,
  selected,
  open,
  onToggle,
  onChoose,
  expandInline,
}: {
  option: GrantedFeatPickOption
  selected: boolean
  open: boolean
  onToggle: () => void
  onChoose: () => void
  expandInline: boolean
}) {
  const view = localizeOption(option)
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        onDoubleClick={() => {
          if (option.available) onChoose()
        }}
        className={`flex w-full items-start justify-between gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors ${
          selected
            ? 'border-accent/60 bg-accent/12'
            : open
              ? 'border-accent/40 bg-accent/8'
              : option.available
                ? 'border-transparent hover:border-border hover:bg-surface-2'
                : 'border-transparent opacity-50'
        }`}
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-xs font-medium text-text">{view.name}</span>
            <ActionCost type={view.actionType} />
            <Badge className="!text-[9px]">nv. {view.level}</Badge>
            {selected ? (
              <Badge tone="accent" className="!text-[9px]">
                Escolhido
              </Badge>
            ) : null}
          </div>
          {view.originalName && view.originalName !== view.name ? (
            <div className="truncate text-[10px] text-text-dim">
              {view.originalName}
            </div>
          ) : null}
          {!option.available && option.reasons[0] ? (
            <div className="text-[10px] text-text-dim">{option.reasons[0]}</div>
          ) : null}
        </div>
        {expandInline ? (
          <span className="text-[10px] text-text-dim">{open ? '▾' : '▸'}</span>
        ) : null}
      </button>
      {expandInline && open ? (
        <div className="mt-1 rounded-lg border border-border/50 bg-surface-1 px-2.5 py-2">
          <OptionDetail
            option={option}
            selected={selected}
            onChoose={onChoose}
          />
        </div>
      ) : null}
    </li>
  )
}

export function FeatChoicePicker({
  pick,
  compact = false,
  layout = 'stacked',
  onChange,
}: {
  pick: GrantedFeatPick
  compact?: boolean
  layout?: 'stacked' | 'split'
  onChange: (featId: string) => void
}) {
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(
    pick.selectedFeatId ?? null,
  )

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const list = needle
      ? pick.options.filter((option) => {
          const view = localizeOption(option)
          return (
            view.name.toLowerCase().includes(needle) ||
            (view.originalName ?? '').toLowerCase().includes(needle) ||
            view.traits.some((trait) =>
              localizeTraitLabel(trait).toLowerCase().includes(needle),
            )
          )
        })
      : pick.options
    const available = list.filter((option) => option.available)
    const locked = list.filter((option) => !option.available)
    return { available, locked }
  }, [pick.options, query])

  const selected = pick.options.find(
    (option) => option.id === pick.selectedFeatId,
  )
  const preview =
    pick.options.find((option) => option.id === openId) ??
    selected ??
    filtered.available[0] ??
    filtered.locked[0] ??
    null

  const rows = (
    <ul
      className={`space-y-1 overflow-y-auto pr-0.5 ${
        layout === 'split'
          ? 'min-h-0 flex-1'
          : compact
            ? 'max-h-56'
            : 'max-h-72'
      }`}
    >
      {filtered.available.map((option) => (
        <OptionRow
          key={option.id}
          option={option}
          selected={option.id === pick.selectedFeatId}
          open={preview?.id === option.id}
          expandInline={layout === 'stacked'}
          onToggle={() => setOpenId(option.id)}
          onChoose={() => onChange(option.id)}
        />
      ))}
      {filtered.locked.length > 0 ? (
        <li className="pt-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          Ainda bloqueados
        </li>
      ) : null}
      {filtered.locked.slice(0, query.trim() ? 40 : 12).map((option) => (
        <OptionRow
          key={option.id}
          option={option}
          selected={option.id === pick.selectedFeatId}
          open={preview?.id === option.id}
          expandInline={layout === 'stacked'}
          onToggle={() => setOpenId(option.id)}
          onChoose={() => onChange(option.id)}
        />
      ))}
      {filtered.available.length === 0 && filtered.locked.length === 0 ? (
        <li className="px-1 py-2 text-center text-[11px] text-text-dim">
          Nenhum feito neste filtro.
        </li>
      ) : null}
    </ul>
  )

  const heading = (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <div className="min-w-0">
        <p className="text-xs font-medium text-text">{pick.parentName}</p>
        <p className="text-[11px] text-text-dim">{pick.hint}</p>
      </div>
      {pick.selectedFeatId ? (
        <Button size="sm" variant="ghost" onClick={() => onChange('')}>
          Limpar
        </Button>
      ) : null}
    </div>
  )

  if (layout === 'split') {
    return (
      <div className="flex h-full min-h-0 flex-1 flex-col gap-3 lg:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-xl border border-border/80 bg-surface-1">
          <div className="border-b border-border/50 px-3 py-2.5">
            {heading}
            {selected ? (
              <p className="mt-1.5 text-[11px] text-accent">
                Atual: <strong>{localizeOption(selected).name}</strong>
              </p>
            ) : (
              <p className="mt-1.5 text-[11px] text-accent/90">
                Ainda sem feito escolhido — clique para ver, duplo clique para
                confirmar.
              </p>
            )}
            <Input
              className="mt-2 py-1 text-xs"
              placeholder="Buscar nesta lista…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <p className="mt-1.5 text-[10px] text-text-dim">
              {filtered.available.length} disponíveis
              {filtered.locked.length > 0
                ? ` · ${filtered.locked.length} bloqueados`
                : ''}
            </p>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden p-2">{rows}</div>
        </div>
        <Panel
          quiet
          compact
          className="flex max-h-full w-full shrink-0 flex-col overflow-hidden lg:w-[22rem]"
          title={preview ? localizeOption(preview).name : 'Detalhe'}
          bodyClassName="min-h-0 flex-1 overflow-y-auto"
        >
          {preview ? (
            <OptionDetail
              option={preview}
              selected={preview.id === pick.selectedFeatId}
              onChoose={() => onChange(preview.id)}
            />
          ) : (
            <p className="text-xs text-text-dim">Selecione um feito.</p>
          )}
        </Panel>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      {heading}
      {selected ? (
        <p className="text-[11px] text-accent">
          Atual:{' '}
          <strong>{localizeOption(selected).name}</strong>
          {selected.level != null ? ` (nv. ${selected.level})` : ''}
        </p>
      ) : (
        <p className="text-[11px] text-accent/90">Ainda sem feito escolhido.</p>
      )}
      <Input
        className="max-w-md py-1 text-xs"
        placeholder="Buscar feito concedido…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="text-[10px] text-text-dim">
        {filtered.available.length + filtered.locked.length} de{' '}
        {pick.options.length}
      </p>
      {rows}
    </div>
  )
}
