import { useState } from 'react'
import type { ContentSource, ItemDefinition, Rarity } from '@/types'
import { ITEM_CATEGORY_LABELS, RARITIES } from '@/types'
import { RARITY_LABELS } from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select } from '@/components/ui/Field'
import { ActionRichTextarea } from '@/components/ui/ActionTypePicker'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import { EquipmentHomebrewGuide } from '@/features/equipment/components/EquipmentHomebrewGuide'
import { EquipmentCategoryFields } from '@/features/equipment/components/EquipmentCategoryFields'
import {
  bulkFromEditor,
  cpToGold,
  goldToCp,
  isArtifactItem,
  type EquipmentCreateKind,
} from '@/features/equipment/homebrewDefaults'
import type { BulkValue } from '@/types'

function splitList(value: string): string[] {
  return value
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter(Boolean)
}

interface EquipmentTypeEditorProps {
  initial: ItemDefinition
  createKind: EquipmentCreateKind
  initialSource?: ContentSource | null
  onSave: (payload: {
    item: ItemDefinition
    source: ContentSource
  }) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

export function EquipmentTypeEditor({
  initial,
  createKind,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: EquipmentTypeEditorProps) {
  const [draft, setDraft] = useState<ItemDefinition>(structuredClone(initial))
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [gold, setGold] = useState(cpToGold(initial.priceCp))

  const artifactMode = createKind === 'artifact' || isArtifactItem(draft)
  const isNew =
    initial.name.startsWith('Novo ') || initial.name.startsWith('Nova ')
  const titleKind = artifactMode
    ? 'artefato'
    : ITEM_CATEGORY_LABELS[draft.category].toLowerCase()

  const bulkUnit = draft.bulk.unit
  const bulkCount =
    draft.bulk.unit === 'negligible' ? 1 : draft.bulk.count

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome do item.')
      return
    }
    if (draft.category === 'weapon' && !draft.weapon) {
      setError('A arma precisa de dado, grupo e proficiência.')
      return
    }
    if (draft.category === 'armor' && !draft.armor) {
      setError('A armadura precisa de CA e categoria.')
      return
    }
    if (draft.category === 'rune' && (draft.rune?.appliesTo.length ?? 0) === 0) {
      setError('A runa precisa gravar em arma, armadura ou escudo.')
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
      const priceCp =
        artifactMode || gold.trim() === ''
          ? artifactMode
            ? null
            : goldToCp(Number(gold))
          : goldToCp(Number(gold.replace(',', '.')))
      const item: ItemDefinition = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        description: draft.description.trim(),
        source: source.name,
        provenance: { type: 'homebrew' },
        sourceId,
        aonUrl: undefined,
        priceCp: Number.isFinite(Number(gold.replace(',', '.')))
          ? priceCp
          : artifactMode
            ? null
            : draft.priceCp,
      }
      await onSave({ item, source })
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
          {isNew ? `Criar ${titleKind} homebrew` : `Editar ${titleKind} homebrew`}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`item-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                items: [
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

      <EquipmentHomebrewGuide
        kind={artifactMode ? 'artifact' : createKind}
        item={draft}
      />

      <Panel title="Identidade">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            />
          </Field>
          <Field label="Nome original (EN)">
            <Input
              value={draft.originalName}
              onChange={(e) =>
                setDraft({ ...draft, originalName: e.target.value })
              }
            />
          </Field>
          <Field label="Nível">
            <Input
              type="number"
              min={0}
              max={30}
              value={draft.level}
              onChange={(e) =>
                setDraft({ ...draft, level: Number(e.target.value) || 0 })
              }
            />
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
          <Field
            label="Preço (po)"
            hint={artifactMode ? 'Artefato não se vende' : 'Vazio = sem preço'}
          >
            <Input
              type="number"
              min={0}
              step="any"
              disabled={artifactMode}
              value={artifactMode ? '' : gold}
              onChange={(e) => setGold(e.target.value)}
            />
          </Field>
          <Field label="Carga">
            <div className="flex gap-2">
              <Select
                value={bulkUnit}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    bulk: bulkFromEditor(
                      e.target.value as BulkValue['unit'],
                      bulkCount,
                    ),
                  })
                }
              >
                <option value="negligible">Desprezível</option>
                <option value="light">Leve (L)</option>
                <option value="bulk">Inteiro</option>
              </Select>
              {bulkUnit !== 'negligible' && (
                <Input
                  type="number"
                  min={1}
                  className="w-20"
                  value={bulkCount}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      bulk: bulkFromEditor(
                        bulkUnit,
                        Number(e.target.value) || 1,
                      ),
                    })
                  }
                />
              )}
            </div>
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
        <Field
          label="Traços"
          hint="Separados por vírgula. Ex.: Agile, Finesse, Magical"
          className="mt-3"
        >
          <Input
            value={draft.traits.join(', ')}
            onChange={(e) =>
              setDraft({ ...draft, traits: splitList(e.target.value) })
            }
          />
        </Field>
        <Field
          label="Descrição / ativação"
          hint="Clique num ícone para o custo de ativação (1 ação, reação…)."
          className="mt-3"
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

      <EquipmentCategoryFields
        draft={draft}
        onChange={setDraft}
        artifactMode={artifactMode}
      />

      {onDelete && (
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir este item homebrew? Personagens que o têm no inventário ficam com a anotação órfã.',
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir item
          </Button>
        </div>
      )}
    </div>
  )
}
