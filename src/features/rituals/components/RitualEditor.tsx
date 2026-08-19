import { useState } from 'react'
import type { ContentSource, Rarity, Ritual, SkillId } from '@/types'
import { RARITIES, SKILL_IDS } from '@/types'
import { RARITY_LABELS, SKILL_LABELS } from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import { RitualHomebrewGuide } from '@/features/rituals/components/RitualHomebrewGuide'
import {
  RITUAL_RANKS,
  splitTraitList,
} from '@/features/rituals/homebrewDefaults'
import type { RitualRank } from '@/types/ritual'

interface RitualEditorProps {
  initial: Ritual
  initialSource?: ContentSource | null
  onSave: (payload: {
    ritual: Ritual
    source: ContentSource
  }) => Promise<void>
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

function toggleSkill(list: SkillId[] | undefined, id: SkillId): SkillId[] {
  const current = list ?? []
  return current.includes(id)
    ? current.filter((skill) => skill !== id)
    : [...current, id]
}

export function RitualEditor({
  initial,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: RitualEditorProps) {
  const [draft, setDraft] = useState<Ritual>(structuredClone(initial))
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isNew = initial.name.startsWith('Novo ')

  function patch(partial: Partial<Ritual>) {
    setDraft({ ...draft, ...partial })
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome.')
      return
    }
    if (!(draft.primaryCheckSkills ?? []).length) {
      setError('Marque ao menos uma perícia no teste principal.')
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
      const traits = splitTraitList(draft.traits.join(', '))
      if (!traits.includes('Ritual')) traits.unshift('Ritual')
      const ritual: Ritual = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        description: (draft.description || draft.summary || '').trim(),
        summary: (draft.summary || draft.description || '').trim(),
        traits,
        source: source.name,
        provenance: { type: 'homebrew' },
        sourceId,
        aonUrl: undefined,
      }
      await onSave({ ritual, source })
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
          {isNew ? 'Criar ritual homebrew' : 'Editar ritual homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`ritual-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                rituals: [
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

      <RitualHomebrewGuide />

      <Panel title="Identidade" subtitle="Não usa tradição nem espaços de magia">
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

      <Panel title="Conjuração">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Posto">
            <Select
              value={String(draft.rank)}
              onChange={(e) =>
                patch({ rank: Number(e.target.value) as RitualRank })
              }
            >
              {RITUAL_RANKS.map((rank) => (
                <option key={rank} value={rank}>
                  Posto {rank}
                </option>
              ))}
            </Select>
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
          <Field label="Tempo de conjuração">
            <Input
              value={draft.castTime ?? ''}
              onChange={(e) => patch({ castTime: e.target.value })}
              placeholder="1 dia"
            />
          </Field>
          <Field label="Custo" hint="Ingredientes em PO × posto">
            <Input
              value={draft.cost ?? ''}
              onChange={(e) => patch({ cost: e.target.value })}
            />
          </Field>
          <Field label="Duração">
            <Input
              value={draft.duration ?? ''}
              onChange={(e) => patch({ duration: e.target.value })}
            />
          </Field>
          <Field label="Alcance">
            <Input
              value={draft.range ?? ''}
              onChange={(e) => patch({ range: e.target.value })}
            />
          </Field>
          <Field label="Alvo" className="sm:col-span-2">
            <Input
              value={draft.target ?? ''}
              onChange={(e) => patch({ target: e.target.value })}
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Testes de perícia">
        <Field label="Teste principal" hint="Texto livre, como no livro.">
          <Input
            value={draft.primaryCheck ?? ''}
            onChange={(e) => patch({ primaryCheck: e.target.value })}
            placeholder="Arcanismo (especialista)"
          />
        </Field>
        <Field label="Perícias do teste principal" className="mt-3">
          <div className="flex flex-wrap gap-1.5">
            {SKILL_IDS.map((id) => (
              <Chip
                key={id}
                active={(draft.primaryCheckSkills ?? []).includes(id)}
                onClick={() =>
                  patch({
                    primaryCheckSkills: toggleSkill(
                      draft.primaryCheckSkills,
                      id,
                    ),
                  })
                }
              >
                {SKILL_LABELS[id]}
              </Chip>
            ))}
          </div>
        </Field>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Conjuradores secundários">
            <Input
              value={draft.secondaryCasters ?? ''}
              onChange={(e) => patch({ secondaryCasters: e.target.value })}
              placeholder="0, 1, 2…"
            />
          </Field>
          <Field label="Testes secundários">
            <Input
              value={draft.secondaryChecks ?? ''}
              onChange={(e) => patch({ secondaryChecks: e.target.value })}
              placeholder="Ofício, Diplomacia"
            />
          </Field>
        </div>
        <Field label="Perícias secundárias" className="mt-3">
          <div className="flex flex-wrap gap-1.5">
            {SKILL_IDS.map((id) => (
              <Chip
                key={`sec-${id}`}
                active={(draft.secondaryCheckSkills ?? []).includes(id)}
                onClick={() =>
                  patch({
                    secondaryCheckSkills: toggleSkill(
                      draft.secondaryCheckSkills,
                      id,
                    ),
                  })
                }
              >
                {SKILL_LABELS[id]}
              </Chip>
            ))}
          </div>
        </Field>
      </Panel>

      <Panel title="Texto">
        <Field
          label="Traços"
          hint="Separados por vírgula. O traço Ritual entra sozinho."
        >
          <Input
            value={draft.traits.join(', ')}
            onChange={(e) => patch({ traits: splitTraitList(e.target.value) })}
          />
        </Field>
        <Field label="Resumo" className="mt-3">
          <Textarea
            rows={2}
            value={draft.summary ?? ''}
            onChange={(e) => patch({ summary: e.target.value })}
          />
        </Field>
        <Field label="Descrição" className="mt-3">
          <Textarea
            rows={12}
            value={draft.description}
            onChange={(e) => patch({ description: e.target.value })}
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
                  'Excluir este ritual homebrew? Personagens que o conhecem ficam com o ID órfão.',
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
