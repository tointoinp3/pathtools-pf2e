import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import type { ContentSource, Feat, FeatCategory } from '@/types'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import { FEAT_CATEGORY_LABELS } from '@/utils/labels'
import { FeatFields } from '@/features/feats/components/FeatFields'
import { FeatHomebrewGuide } from '@/features/feats/components/FeatHomebrewGuide'
import {
  FEAT_CREATE_CATEGORIES,
  applyFeatCategory,
} from '@/features/feats/homebrewFeat'
import { useAncestryStore } from '@/stores/ancestryStore'
import { useArchetypeStore } from '@/stores/archetypeStore'
import { useClassStore } from '@/stores/classStore'

const ALL_LEVELS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]

interface FeatEditorProps {
  initial: Feat
  initialSource?: ContentSource | null
  onSave: (payload: { feat: Feat; source: ContentSource }) => Promise<void>
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
  children: ReactNode
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

export function FeatEditor({
  initial,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: FeatEditorProps) {
  const [draft, setDraft] = useState<Feat>(() => structuredClone(initial))
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ancestries = useAncestryStore((s) => s.ancestries)
  const heritagesFor = useAncestryStore((s) => s.heritagesFor)
  const classes = useClassStore((s) => s.classes)
  const archetypes = useArchetypeStore((s) => s.archetypes)

  const isNew =
    initial.name === 'Novo feito' || initial.name === 'Dedicação'
  const heritages = draft.ancestryId ? heritagesFor(draft.ancestryId) : []

  const sortedAncestries = useMemo(
    () =>
      [...ancestries].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [ancestries],
  )
  const sortedClasses = useMemo(
    () => [...classes].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [classes],
  )
  const sortedArchetypes = useMemo(
    () =>
      [...archetypes].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')),
    [archetypes],
  )

  function setCategory(category: FeatCategory) {
    setDraft(applyFeatCategory(draft, category))
  }

  function toggleDedication(checked: boolean) {
    const traits = draft.traits.filter((t) => t !== 'Dedicação')
    setDraft({
      ...draft,
      isDedication: checked || undefined,
      traits: checked ? [...traits, 'Dedicação'] : traits,
      level: checked && draft.level < 2 ? 2 : draft.level,
    })
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome do feito.')
      return
    }
    if (draft.category === 'ancestry' && !draft.ancestryId) {
      setError(
        'Selecione a ancestralidade. Sem ela, o slot de ancestralidade da ficha não oferece o feito.',
      )
      return
    }
    if (draft.category === 'class' && !draft.classId) {
      setError(
        'Selecione a classe. Sem ela, o slot de classe da ficha não oferece o feito.',
      )
      return
    }
    if (draft.category === 'archetype' && !draft.archetypeId) {
      setError(
        'Selecione o arquétipo. Sem ele, a ficha não trata o feito como parte daquele arquétipo.',
      )
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
      let traits = draft.traits
      if (draft.category === 'skill' && !traits.includes('Perícia')) {
        traits = [...traits, 'Perícia']
      }
      if (draft.category === 'general' && !traits.includes('Geral')) {
        traits = [...traits, 'Geral']
      }
      const feat: Feat = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        traits,
        provenance: { type: 'homebrew' },
        sourceId,
        aonUrl: undefined,
      }
      await onSave({ feat, source })
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
          {isNew ? 'Criar feito homebrew' : 'Editar feito homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`feito-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                feats: [
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

      <FeatHomebrewGuide category={draft.category} />

      <Panel title="Prateleira" subtitle="O tipo de slot na ficha">
        <div className="flex flex-wrap gap-1.5">
          {FEAT_CREATE_CATEGORIES.map((category) => (
            <Chip
              key={category}
              active={draft.category === category}
              onClick={() => setCategory(category)}
            >
              {FEAT_CATEGORY_LABELS[category]}
            </Chip>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-text-dim">
          Ancestralidade, classe e arquétipo precisam do vínculo abaixo para
          aparecerem no slot certo. Geral, perícia e mítico valem sozinhos.
        </p>
      </Panel>

      <Panel title="Vínculo e fonte">
        <div className="grid gap-3 sm:grid-cols-2">
          {draft.category === 'ancestry' && (
            <Field label="Ancestralidade" hint="Oficial ou homebrew">
              <Select
                value={draft.ancestryId ?? ''}
                onChange={(e) => {
                  const ancestryId = e.target.value || null
                  const ancestry = sortedAncestries.find(
                    (a) => a.id === ancestryId,
                  )
                  const extraTrait = ancestry?.name.trim()
                  const withoutOld = draft.traits.filter((t) => {
                    const old = sortedAncestries.find(
                      (a) => a.id === draft.ancestryId,
                    )
                    return !old || t !== old.name
                  })
                  setDraft({
                    ...draft,
                    ancestryId,
                    heritageId: null,
                    traits:
                      extraTrait && !withoutOld.includes(extraTrait)
                        ? [...withoutOld, extraTrait]
                        : withoutOld,
                  })
                }}
              >
                <option value="">Selecione…</option>
                {sortedAncestries.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name.trim() || a.originalName}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          {draft.category === 'class' && (
            <Field label="Classe" hint="Oficial ou homebrew">
              <Select
                value={draft.classId ?? ''}
                onChange={(e) => {
                  const classId = e.target.value || null
                  const characterClass = sortedClasses.find(
                    (c) => c.id === classId,
                  )
                  const extraTrait = characterClass?.name.trim()
                  const withoutOld = draft.traits.filter((t) => {
                    const old = sortedClasses.find((c) => c.id === draft.classId)
                    return !old || t !== old.name
                  })
                  setDraft({
                    ...draft,
                    classId,
                    traits:
                      extraTrait && !withoutOld.includes(extraTrait)
                        ? [...withoutOld, extraTrait]
                        : withoutOld,
                  })
                }}
              >
                <option value="">Selecione…</option>
                {sortedClasses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name.trim() || c.originalName}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          {draft.category === 'archetype' && (
            <>
              <Field label="Arquétipo" hint="Oficial ou homebrew">
                <Select
                  value={draft.archetypeId ?? ''}
                  onChange={(e) => {
                    const archetypeId = e.target.value || null
                    setDraft({ ...draft, archetypeId })
                  }}
                >
                  <option value="">Selecione…</option>
                  {sortedArchetypes.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name.trim() || a.originalName}
                    </option>
                  ))}
                </Select>
              </Field>
              <label className="flex items-center gap-2 self-end pb-2 text-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={Boolean(draft.isDedication)}
                  onChange={(e) => toggleDedication(e.target.checked)}
                />
                Feito de Dedicação (porta de entrada)
              </label>
            </>
          )}
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
        </div>
      </Panel>

      <Panel title="Feito">
        <FeatFields
          draft={draft}
          onChange={setDraft}
          heritages={heritages}
          levelHints={ALL_LEVELS}
        />
      </Panel>

      {onDelete && (
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir este feito homebrew? Personagens que o escolheram ficam com o ID órfão.',
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
