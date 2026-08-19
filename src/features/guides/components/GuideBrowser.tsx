import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { catalogGuides } from '@/data/seeds/guides'
import {
  GUIDE_CATEGORY_LABELS,
  type Guide,
  type GuideCategory,
} from '@/features/guides/guideTypes'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { MultiFilter, matchesSelected } from '@/components/ui/MultiFilter'
import { Panel, Tip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { useSlashSearch } from '@/utils/useSlashSearch'
import { catalogRowPointerProps } from '@/features/tabs/tabPointer'
import { useCatalogPreview } from '@/features/tabs/useCatalogPreview'

const CATEGORY_OPTIONS = (
  ['creation', 'feats', 'progression', 'spells', 'rules'] as GuideCategory[]
)
  .filter((id) => catalogGuides.some((g) => g.category === id))
  .map((value) => ({
    value,
    label: GUIDE_CATEGORY_LABELS[value],
  }))

export function GuideBrowser({
  expanded,
  onExpandedChange,
}: {
  expanded: boolean
  onExpandedChange: (next: boolean) => void
}) {
  const { previewId: selectedId, onActiveChange } = useCatalogPreview()
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState<GuideCategory[]>([])
  const searchRef = useSlashSearch()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalogGuides.filter((g) => {
      if (!matchesSelected(g.category, categories)) return false
      if (!q) return true
      return (
        g.name.toLowerCase().includes(q) ||
        g.originalName.toLowerCase().includes(q) ||
        g.summary.toLowerCase().includes(q) ||
        g.sections.some(
          (s) =>
            s.heading.toLowerCase().includes(q) ||
            s.body.toLowerCase().includes(q),
        )
      )
    })
  }, [query, categories])

  const selected =
    catalogGuides.find((g) => g.id === selectedId) ?? filtered[0] ?? null

  function selectGuide(id: string, event?: Parameters<typeof onActiveChange>[1]) {
    onActiveChange(id, event)
  }

  const article = (
    <Panel
      title={selected ? selected.name : 'Guia'}
      subtitle={selected?.originalName}
      className={`flex min-h-0 flex-col overflow-hidden ${
        expanded
          ? 'h-full w-full'
          : 'min-h-0 w-full flex-1 lg:w-[32rem] lg:flex-none'
      }`}
      bodyClassName="min-h-0 flex-1 overflow-y-auto overscroll-contain"
      actions={
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onExpandedChange(!expanded)}
        >
          {expanded ? 'Minimizar' : 'Expandir'}
        </Button>
      }
    >
      {selected ? (
        <GuideArticle
          guide={selected}
          onOpenRelated={(id) => selectGuide(id)}
        />
      ) : (
        <p className="px-1 py-6 text-center text-sm text-text-dim">
          Selecione um guia na lista.
        </p>
      )}
    </Panel>
  )

  if (expanded) {
    return <div className="flex h-full min-h-0 flex-col">{article}</div>
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 lg:flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/90 bg-surface-1">
        <div className="shrink-0 border-b border-border/60 px-4 py-3">
          <Input
            ref={searchRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar guia… (/)"
          />
          {CATEGORY_OPTIONS.length > 1 && (
            <div className="mt-2">
              <MultiFilter
                label="Tipo"
                options={CATEGORY_OPTIONS}
                selected={categories}
                onChange={setCategories}
                emptyLabel="Todos"
              />
            </div>
          )}
          <p className="mt-2 text-[11px] text-text-dim">
            {filtered.length} de {catalogGuides.length} guias
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <ul className="divide-y divide-border/50">
            {filtered.map((guide) => {
              const active = selected?.id === guide.id
              return (
                <li key={guide.id}>
                  <button
                    type="button"
                    {...catalogRowPointerProps((event) =>
                      selectGuide(guide.id, event),
                    )}
                    className={`flex w-full flex-col items-start gap-0.5 px-4 py-2.5 text-left transition-colors ${
                      active
                        ? 'bg-accent/15 text-accent'
                        : 'hover:bg-surface-2'
                    }`}
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-text">{guide.name}</span>
                      <Badge className="!text-[9px]">
                        {GUIDE_CATEGORY_LABELS[guide.category]}
                      </Badge>
                    </span>
                    <span className="text-[11px] text-text-dim">
                      {guide.originalName} · {guide.summary}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-text-dim">
              Nenhum guia neste filtro.
            </p>
          )}
        </div>
      </div>

      {article}
    </div>
  )
}

function GuideArticle({
  guide,
  onOpenRelated,
}: {
  guide: Guide
  onOpenRelated: (id: string) => void
}) {
  const related = (guide.relatedGuides ?? [])
    .map((id) => catalogGuides.find((g) => g.id === id))
    .filter((g): g is Guide => Boolean(g))

  return (
    <div className="space-y-4 text-sm">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge>{GUIDE_CATEGORY_LABELS[guide.category]}</Badge>
        <span className="text-[11px] text-text-dim">{guide.source}</span>
      </div>
      <p className="text-text-muted">{guide.summary}</p>

      {guide.sections.map((section) => (
        <section key={section.heading}>
          <h3 className="mb-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-accent/90">
            {section.heading}
          </h3>
          <RichText
            as="div"
            className="whitespace-pre-wrap text-xs leading-relaxed text-text-muted"
          >
            {section.body}
          </RichText>
        </section>
      ))}

      {guide.relatedLinks && guide.relatedLinks.length > 0 && (
        <div>
          <h3 className="mb-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-accent/90">
            Neste app
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {guide.relatedLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="inline-flex rounded-lg border border-border bg-surface-2 px-2 py-1 text-[11px] text-text-muted hover:border-accent/40 hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <div>
          <h3 className="mb-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-accent/90">
            Outros guias
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {related.map((g) => (
              <li key={g.id}>
                <button
                  type="button"
                  onClick={() => onOpenRelated(g.id)}
                  className="inline-flex rounded-lg border border-border bg-surface-2 px-2 py-1 text-[11px] text-text-muted hover:border-accent/40 hover:text-accent"
                >
                  {g.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href={guide.aonUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block text-[11px] text-accent hover:underline"
      >
        Archives of Nethys
      </a>
      <Tip>
        Resumo para a mesa, em português. O texto legal completo continua no
        Player Core e no Archives of Nethys — só Remaster.
      </Tip>
    </div>
  )
}
