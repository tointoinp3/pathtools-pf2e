import { useMemo, useState } from 'react'
import type {
  AttributeId,
  ContentSource,
  Deity,
  DeityKind,
  DivineFont,
  Rarity,
  Sanctification,
  SkillId,
} from '@/types'
import { ATTRIBUTE_IDS, RARITIES, SKILL_IDS } from '@/types'
import { catalogDomains } from '@/data/seeds/domains'
import {
  DIVINE_FONT_LABELS,
  SANCTIFICATION_LABELS,
} from '@/engine/deity'
import { DeityHomebrewGuide } from '@/features/deities/components/DeityHomebrewGuide'
import {
  DEITY_CREATE_KINDS,
  applyDeityKind,
  splitLines,
  splitList,
  uniqueNames,
} from '@/features/deities/homebrewDefaults'
import {
  DEITY_KIND_LABELS,
  localizeDomainName,
} from '@/features/deities/localizeDeities'
import { ATTRIBUTE_LABELS, RARITY_LABELS, SKILL_LABELS } from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { FilterCount } from '@/components/ui/FilterCount'
import { createId } from '@/utils/id'

interface DeityEditorProps {
  initial: Deity
  createKind: DeityKind
  initialSource?: ContentSource | null
  onSave: (payload: { deity: Deity; source: ContentSource }) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-accent bg-accent/20 text-accent'
          : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
      }`}
    >
      {children}
    </button>
  )
}

type DomainSlot = 'off' | 'primary' | 'alternate'

function domainSlot(
  name: string,
  primary: string[],
  alternate: string[],
): DomainSlot {
  if (primary.some((n) => n.toLowerCase() === name.toLowerCase())) return 'primary'
  if (alternate.some((n) => n.toLowerCase() === name.toLowerCase())) {
    return 'alternate'
  }
  return 'off'
}

export function DeityEditor({
  initial,
  createKind,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: DeityEditorProps) {
  const [draft, setDraft] = useState<Deity>(() =>
    applyDeityKind(structuredClone(initial), createKind),
  )
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [domainQuery, setDomainQuery] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kind = draft.kind
  const isNew =
    initial.name.startsWith('Nova ') || initial.name.startsWith('Novo ')

  function patch(partial: Partial<Deity>) {
    setDraft({ ...draft, ...partial })
  }

  const domainList = useMemo(() => {
    const q = domainQuery.trim().toLowerCase()
    return catalogDomains
      .slice()
      .sort((a, b) =>
        localizeDomainName(a.originalName).localeCompare(
          localizeDomainName(b.originalName),
          'pt',
        ),
      )
      .filter((d) => {
        if (!q) return true
        return (
          d.name.toLowerCase().includes(q) ||
          d.originalName.toLowerCase().includes(q)
        )
      })
  }, [domainQuery])

  function cycleDomain(originalName: string) {
    const slot = domainSlot(
      originalName,
      draft.primaryDomains,
      draft.alternateDomains,
    )
    const without = (list: string[]) =>
      list.filter((n) => n.toLowerCase() !== originalName.toLowerCase())
    if (slot === 'off') {
      patch({
        primaryDomains: [...draft.primaryDomains, originalName],
        alternateDomains: without(draft.alternateDomains),
      })
      return
    }
    if (slot === 'primary') {
      patch({
        primaryDomains: without(draft.primaryDomains),
        alternateDomains: [...without(draft.alternateDomains), originalName],
      })
      return
    }
    patch({
      primaryDomains: without(draft.primaryDomains),
      alternateDomains: without(draft.alternateDomains),
    })
  }

  function toggleAttr(id: AttributeId) {
    const has = draft.attributes.includes(id)
    if (has) {
      patch({ attributes: draft.attributes.filter((a) => a !== id) })
      return
    }
    if (draft.attributes.length >= 2) {
      patch({ attributes: [draft.attributes[1]!, id] })
      return
    }
    patch({ attributes: [...draft.attributes, id] })
  }

  function toggleFont(font: DivineFont) {
    const has = draft.font.includes(font)
    patch({
      font: has ? draft.font.filter((f) => f !== font) : [...draft.font, font],
    })
  }

  function toggleSanct(value: Sanctification) {
    const has = draft.sanctification.includes(value)
    const next = has
      ? draft.sanctification.filter((s) => s !== value)
      : [...draft.sanctification, value]
    patch({
      sanctification: next,
      sanctificationRequired: next.length === 0 ? false : draft.sanctificationRequired,
    })
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome.')
      return
    }
    if (kind !== 'philosophy' && draft.primaryDomains.length === 0) {
      setError(
        'Marque ao menos um domínio primário (o Iniciado de Domínio usa isso). Filosofia pode ficar sem.',
      )
      return
    }
    if (draft.sanctificationRequired && draft.sanctification.length === 0) {
      setError('Santificação obrigatória precisa de sagrado, profano ou os dois.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const sourceId = draft.sourceId ?? createId('source')
      const source: ContentSource = {
        id: sourceId,
        name: sourceName.trim() || 'Homebrew pessoal',
        type: 'homebrew',
        author: author.trim() || undefined,
        createdAt: initialSource?.createdAt,
      }
      const name = draft.name.trim()
      const primaryDomains = uniqueNames(draft.primaryDomains)
      const alternateDomains = uniqueNames(draft.alternateDomains).filter(
        (n) => !primaryDomains.some((p) => p.toLowerCase() === n.toLowerCase()),
      )
      const deity: Deity = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        epithet: draft.epithet?.trim() || undefined,
        summary: draft.summary.trim(),
        primaryDomains,
        alternateDomains,
        domains: uniqueNames([...primaryDomains, ...alternateDomains]),
        source: source.name,
        provenance: { type: 'homebrew' },
        sourceId,
        aonUrl: undefined,
        sanctificationRequired:
          draft.sanctification.length === 0
            ? false
            : draft.sanctificationRequired,
      }
      await onSave({ deity, source })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">
          {isNew
            ? `Criar ${DEITY_KIND_LABELS[kind].toLowerCase()} homebrew`
            : `Editar ${DEITY_KIND_LABELS[kind].toLowerCase()} homebrew`}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`divindade-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                deities: [
                  {
                    ...draft,
                    provenance: { type: 'homebrew' },
                    sourceId: source.id,
                  },
                ],
                sources: [source],
              }
            }}
          />
          <Button onClick={onCancel}>Cancelar</Button>
          <Button
            variant="accent"
            disabled={saving}
            onClick={() => void handleSave()}
          >
            {saving ? 'Salvando…' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      <DeityHomebrewGuide kind={kind} />

      <Panel title="Tipo">
        <div className="flex flex-wrap gap-1.5">
          {DEITY_CREATE_KINDS.map((next) => (
            <Chip
              key={next}
              active={kind === next}
              onClick={() => setDraft(applyDeityKind(draft, next))}
            >
              {DEITY_KIND_LABELS[next]}
            </Chip>
          ))}
        </div>
      </Panel>

      <Panel title="Identidade">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={draft.name}
              onChange={(e) => patch({ name: e.target.value })}
            />
          </Field>
          <Field label="Nome original (EN)">
            <Input
              value={draft.originalName}
              onChange={(e) => patch({ originalName: e.target.value })}
            />
          </Field>
          <Field label="Epíteto" hint="Opcional — A Sempre-Mutante">
            <Input
              value={draft.epithet ?? ''}
              onChange={(e) => patch({ epithet: e.target.value })}
            />
          </Field>
          <Field label="Categoria" hint="Chave em inglês, como no AoN">
            <Input
              value={draft.category}
              onChange={(e) => patch({ category: e.target.value })}
            />
          </Field>
          <Field label="Fonte homebrew">
            <Input
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
            />
          </Field>
          <Field label="Autor" hint="Opcional">
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Field>
          <Field label="Raridade">
            <Select
              value={draft.rarity}
              onChange={(e) => patch({ rarity: e.target.value as Rarity })}
            >
              {RARITIES.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {RARITY_LABELS[rarity]}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <Field label="Resumo" className="mt-3">
          <Textarea
            rows={2}
            value={draft.summary}
            onChange={(e) => patch({ summary: e.target.value })}
          />
        </Field>
        <Field
          label="Áreas de interesse"
          className="mt-3"
          hint="Separadas por vírgula"
        >
          <Input
            value={draft.areasOfConcern.join(', ')}
            onChange={(e) => patch({ areasOfConcern: splitList(e.target.value) })}
          />
        </Field>
      </Panel>

      <Panel title="Editos e anátema">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Editos" hint="Uma linha por edito">
            <Textarea
              rows={5}
              value={draft.edicts.join('\n')}
              onChange={(e) => patch({ edicts: splitLines(e.target.value) })}
            />
          </Field>
          <Field label="Anátema" hint="Uma linha por anátema">
            <Textarea
              rows={5}
              value={draft.anathema.join('\n')}
              onChange={(e) => patch({ anathema: splitLines(e.target.value) })}
            />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Pacote mecânico"
        subtitle="Clérigo e campeão usam isto na ficha"
      >
        <Field label="Atributos divinos" hint="No máximo dois">
          <div className="flex flex-wrap gap-1.5">
            {ATTRIBUTE_IDS.map((id) => (
              <Chip
                key={id}
                active={draft.attributes.includes(id)}
                onClick={() => toggleAttr(id)}
              >
                {ATTRIBUTE_LABELS[id]}
              </Chip>
            ))}
          </div>
        </Field>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Perícia divina">
            <Select
              value={draft.skillId ?? ''}
              onChange={(e) =>
                patch({
                  skillId: e.target.value
                    ? (e.target.value as SkillId)
                    : undefined,
                })
              }
            >
              <option value="">Nenhuma</option>
              {SKILL_IDS.map((id) => (
                <option key={id} value={id}>
                  {SKILL_LABELS[id]}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="Arma favorita"
            hint="Nomes em inglês do AoN, separados por vírgula"
          >
            <Input
              value={draft.favoredWeapons.join(', ')}
              onChange={(e) =>
                patch({ favoredWeapons: splitList(e.target.value) })
              }
              placeholder="Warhammer, Longsword"
            />
          </Field>
        </div>
        <Field label="Fonte divina" className="mt-3">
          <div className="flex flex-wrap gap-1.5">
            {(['heal', 'harm'] as DivineFont[]).map((font) => (
              <Chip
                key={font}
                active={draft.font.includes(font)}
                onClick={() => toggleFont(font)}
              >
                {DIVINE_FONT_LABELS[font]}
              </Chip>
            ))}
          </div>
        </Field>
        <Field label="Santificação" className="mt-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {(['holy', 'unholy'] as Sanctification[]).map((value) => (
              <Chip
                key={value}
                active={draft.sanctification.includes(value)}
                onClick={() => toggleSanct(value)}
              >
                {SANCTIFICATION_LABELS[value]}
              </Chip>
            ))}
            {draft.sanctification.length > 0 && (
              <label className="ml-2 flex items-center gap-1.5 text-xs text-text-muted">
                <input
                  type="checkbox"
                  checked={draft.sanctificationRequired}
                  onChange={(e) =>
                    patch({ sanctificationRequired: e.target.checked })
                  }
                />
                Obrigatória
              </label>
            )}
          </div>
        </Field>
      </Panel>

      <Panel
        title="Domínios"
        subtitle="Clique: primário → alternativo → tira. Só oficiais liberam magia de foco."
      >
        <p className="text-[11px] text-text-dim">
          Primários: {draft.primaryDomains.length}
          {draft.primaryDomains.length
            ? ` (${draft.primaryDomains.map(localizeDomainName).join(', ')})`
            : ''}
          {' · '}
          Alternativos: {draft.alternateDomains.length}
        </p>
        <Input
          className="mt-2"
          value={domainQuery}
          onChange={(e) => setDomainQuery(e.target.value)}
          placeholder="Filtrar domínio…"
        />
        <FilterCount
          shown={domainList.length}
          total={catalogDomains.length}
          className="mt-1"
        />
        <div className="mt-2 max-h-56 overflow-y-auto rounded-lg border border-border/70 bg-surface-2/40 p-2">
          <div className="flex flex-wrap gap-1.5">
            {domainList.map((domain) => {
              const slot = domainSlot(
                domain.originalName,
                draft.primaryDomains,
                draft.alternateDomains,
              )
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => cycleDomain(domain.originalName)}
                  className={`rounded-lg border px-2 py-1 text-[11px] font-medium transition-colors ${
                    slot === 'primary'
                      ? 'border-accent bg-accent/20 text-accent'
                      : slot === 'alternate'
                        ? 'border-info/40 bg-info/10 text-info'
                        : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
                  }`}
                >
                  {localizeDomainName(domain.originalName)}
                  {slot === 'alternate' ? ' · alt' : ''}
                </button>
              )
            })}
          </div>
        </div>
      </Panel>

      <Panel title="Lista de clérigo e panteões">
        <Field
          label="Magias de clérigo"
          hint="Nomes originais em inglês, separados por vírgula (entram na lista divina)"
        >
          <Input
            value={draft.clericSpells.join(', ')}
            onChange={(e) => patch({ clericSpells: splitList(e.target.value) })}
            placeholder="Soothe, Fireball, Divine Wrath"
          />
        </Field>
        <Field
          label="Panteões"
          className="mt-3"
          hint="Nomes dos panteões aos quais esta fé pertence"
        >
          <Input
            value={draft.pantheons.join(', ')}
            onChange={(e) => patch({ pantheons: splitList(e.target.value) })}
          />
        </Field>
      </Panel>

      {onDelete && (
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir esta fé homebrew? Personagens que a servem ficam sem divindade.',
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir homebrew
          </Button>
        </div>
      )}
    </div>
  )
}
