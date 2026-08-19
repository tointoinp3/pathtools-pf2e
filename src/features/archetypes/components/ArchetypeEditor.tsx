import { useMemo, useState } from 'react'
import type {
  Archetype,
  ArchetypeKind,
  CharacterClass,
  ContentSource,
  Feat,
  Rarity,
} from '@/types'
import { RARITIES } from '@/types'
import { RARITY_LABELS } from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select } from '@/components/ui/Field'
import { ActionRichTextarea } from '@/components/ui/ActionTypePicker'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import { FeatFields, FeatListEditor } from '@/features/feats/components/FeatFields'
import { emptyHomebrewFeat } from '@/features/feats/homebrewFeat'
import { ArchetypeHomebrewGuide } from '@/features/archetypes/components/ArchetypeHomebrewGuide'
import {
  ARCHETYPE_EXTRA_FEAT_LEVELS,
  dedicationTraits,
  extraFeatTraits,
} from '@/features/archetypes/homebrewDefaults'

interface ArchetypeEditorProps {
  initial: Archetype
  initialDedication: Feat
  initialExtraFeats: Feat[]
  classes: CharacterClass[]
  initialSource?: ContentSource | null
  onSave: (payload: {
    archetype: Archetype
    feats: Feat[]
    removedFeatIds: string[]
    source: ContentSource
  }) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

export function ArchetypeEditor({
  initial,
  initialDedication,
  initialExtraFeats,
  classes,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: ArchetypeEditorProps) {
  const [draft, setDraft] = useState<Archetype>(structuredClone(initial))
  const [dedication, setDedication] = useState<Feat>(
    structuredClone(initialDedication),
  )
  const [extraFeats, setExtraFeats] = useState<Feat[]>(
    structuredClone(initialExtraFeats),
  )
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const originalFeatIds = useMemo(
    () =>
      new Set([
        initialDedication.id,
        ...initialExtraFeats.map((f) => f.id),
      ]),
    [initialDedication.id, initialExtraFeats],
  )

  function applyKind(kind: ArchetypeKind) {
    const traits =
      kind === 'multiclass' ? ['Arquétipo', 'Multiclasse'] : ['Arquétipo']
    setDraft({
      ...draft,
      kind,
      traits,
      multiclassClassId: kind === 'multiclass' ? draft.multiclassClassId : null,
    })
    setDedication({
      ...dedication,
      traits: dedicationTraits(kind),
      blockedClassId:
        kind === 'multiclass' ? (draft.multiclassClassId ?? null) : null,
    })
    setExtraFeats(
      extraFeats.map((f) => ({
        ...f,
        traits: f.traits.includes('Arquétipo') ? extraFeatTraits(kind) : f.traits,
      })),
    )
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome do arquétipo.')
      return
    }
    if (!dedication.name.trim()) {
      setError('A Dedicação precisa de um nome.')
      return
    }
    if (draft.kind === 'multiclass' && !draft.multiclassClassId) {
      setError('Multiclasse: escolha a classe correspondente.')
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
      const savedDedication: Feat = {
        ...dedication,
        name: dedication.name.trim(),
        originalName:
          dedication.originalName.trim() || `Dedication (${name})`,
        category: 'archetype',
        archetypeId: draft.id,
        isDedication: true,
        blockedClassId:
          draft.kind === 'multiclass' ? (draft.multiclassClassId ?? null) : null,
        provenance: { type: 'homebrew' },
        sourceId,
        traits: dedication.traits.length
          ? dedication.traits
          : dedicationTraits(draft.kind),
      }
      const savedExtras = extraFeats.map((f) => {
        const hasDedicationPrereq = (f.prerequisites ?? []).some(
          (p) =>
            (p.kind === 'feat' && p.featId === savedDedication.id) ||
            (p.kind === 'text' && p.label.toLowerCase().includes('dedicação')),
        )
        return {
          ...f,
          name: f.name.trim() || 'Feito',
          originalName: f.originalName.trim() || f.name.trim() || 'Feat',
          category: 'archetype' as const,
          archetypeId: draft.id,
          isDedication: undefined,
          classId: null,
          ancestryId: null,
          heritageId: null,
          provenance: { type: 'homebrew' as const },
          sourceId,
          traits: f.traits.length ? f.traits : extraFeatTraits(draft.kind),
          prerequisites: hasDedicationPrereq
            ? f.prerequisites
            : [
                ...(f.prerequisites ?? []),
                {
                  kind: 'feat' as const,
                  featId: savedDedication.id,
                  featName: savedDedication.name,
                },
              ],
        }
      })
      const allFeats = [savedDedication, ...savedExtras]
      const archetype: Archetype = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        provenance: { type: 'homebrew' },
        sourceId,
        dedicationFeatId: savedDedication.id,
        featIds: savedExtras.map((f) => f.id),
        traits: draft.traits.length
          ? draft.traits
          : draft.kind === 'multiclass'
            ? ['Arquétipo', 'Multiclasse']
            : ['Arquétipo'],
        multiclassClassId:
          draft.kind === 'multiclass' ? draft.multiclassClassId : null,
      }
      const removedFeatIds = [...originalFeatIds].filter(
        (id) => !allFeats.some((f) => f.id === id),
      )
      await onSave({
        archetype,
        feats: allFeats,
        removedFeatIds,
        source,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const isNew = initial.name === 'Novo Arquétipo'

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">
          {isNew ? 'Criar arquétipo homebrew' : 'Editar arquétipo homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`arquetipo-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                archetypes: [
                  {
                    ...draft,
                    provenance: { type: 'homebrew' },
                    sourceId: source.id,
                  },
                ],
                feats: [dedication, ...extraFeats].map((f) => ({
                  ...f,
                  provenance: { type: 'homebrew' as const },
                  sourceId: source.id,
                  archetypeId: draft.id,
                })),
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

      <ArchetypeHomebrewGuide compact={false} />

      <Panel title="Fonte">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome da fonte">
            <Input
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="Ex.: Campanha da mesa"
            />
          </Field>
          <Field label="Autor (opcional)">
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Field>
        </div>
      </Panel>

      <Panel title="Identidade">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={draft.name}
              onChange={(e) => {
                const name = e.target.value
                setDraft({ ...draft, name })
                if (
                  dedication.name === 'Dedicação' ||
                  dedication.name.startsWith('Dedicação de ')
                ) {
                  setDedication({
                    ...dedication,
                    name: name.trim()
                      ? `Dedicação de ${name.trim()}`
                      : 'Dedicação',
                  })
                }
              }}
            />
          </Field>
          <Field label="Nome original (inglês)">
            <Input
              value={draft.originalName}
              onChange={(e) =>
                setDraft({ ...draft, originalName: e.target.value })
              }
            />
          </Field>
          <Field label="Tipo">
            <Select
              value={draft.kind === 'class' ? 'general' : draft.kind}
              onChange={(e) => applyKind(e.target.value as ArchetypeKind)}
            >
              <option value="general">Geral (fantasia própria)</option>
              <option value="multiclass">Multiclasse (gostinho de uma classe)</option>
            </Select>
          </Field>
          <Field label="Raridade">
            <Select
              value={draft.rarity}
              onChange={(e) =>
                setDraft({ ...draft, rarity: e.target.value as Rarity })
              }
            >
              {RARITIES.map((r) => (
                <option key={r} value={r}>
                  {RARITY_LABELS[r]}
                </option>
              ))}
            </Select>
          </Field>
          {draft.kind === 'multiclass' && (
            <Field
              label="Classe correspondente"
              hint="Quem já é desta classe não pega a Dedicação."
            >
              <Select
                value={draft.multiclassClassId ?? ''}
                onChange={(e) => {
                  const classId = e.target.value || null
                  setDraft({ ...draft, multiclassClassId: classId })
                  setDedication({
                    ...dedication,
                    blockedClassId: classId,
                  })
                }}
              >
                <option value="">Escolha…</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.provenance.type === 'homebrew' ? ' (homebrew)' : ''}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          <Field
            label="Feitos antes da próxima Dedicação"
            hint="Padrão do Player Core: 2."
          >
            <Input
              type="number"
              min={0}
              max={6}
              value={draft.featsRequiredBeforeNextDedication ?? 2}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  featsRequiredBeforeNextDedication:
                    Number(e.target.value) || 0,
                })
              }
            />
          </Field>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-text-muted">
          <input
            type="checkbox"
            checked={Boolean(draft.allowsSkillFeatSlots)}
            onChange={(e) =>
              setDraft({
                ...draft,
                allowsSkillFeatSlots: e.target.checked || undefined,
              })
            }
          />
          Feitos também cabem em slot de perícia
        </label>
        <Field
          label="Descrição"
          hint="Clique num ícone para colocar no texto, se o arquétipo conceder uma ação."
        >
          <ActionRichTextarea
            rows={5}
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
          />
        </Field>
      </Panel>

      <Panel
        title="Dedicação (2º nível)"
        subtitle="A porta de entrada — ocupa um slot de classe"
      >
        <FeatFields
          draft={dedication}
          onChange={setDedication}
          levelHints={[2, 4]}
        />
      </Panel>

      <Panel
        title="Feitos do arquétipo"
        subtitle="Depois da Dedicação — níveis pares, um pouco atrás da classe original"
      >
        <FeatListEditor
          feats={extraFeats}
          onChange={setExtraFeats}
          levelHints={ARCHETYPE_EXTRA_FEAT_LEVELS}
          onAdd={() =>
            setExtraFeats([
              ...extraFeats,
              emptyHomebrewFeat({
                category: 'archetype',
                archetypeId: draft.id,
                level: 4,
                traits: extraFeatTraits(draft.kind),
              }),
            ])
          }
        />
      </Panel>

      {onDelete && (
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir este arquétipo e os feitos homebrew dele? Personagens que já pegaram a Dedicação ficam com o feito órfão até trocar.'
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir arquétipo
          </Button>
        </div>
      )}
    </div>
  )
}
