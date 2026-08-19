import { useState } from 'react'
import type {
  AttributeId,
  Background,
  ContentSource,
  Rarity,
  SkillId,
} from '@/types'
import { ATTRIBUTE_IDS, RARITIES, SKILL_IDS } from '@/types'
import {
  ATTRIBUTE_LABELS,
  RARITY_LABELS,
  SKILL_LABELS,
} from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'

interface BackgroundEditorProps {
  initial: Background
  initialSource?: ContentSource | null
  onSave: (background: Background, source: ContentSource) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

export function BackgroundEditor({
  initial,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: BackgroundEditorProps) {
  const [draft, setDraft] = useState<Background>(structuredClone(initial))
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const restricted = draft.attributeBoosts.find((b) => b.id === 'restricted')
  const free = draft.attributeBoosts.find((b) => b.id === 'free')
  const skillGrant = draft.skillGrants[0]
  const loreGrant = draft.loreGrants[0]
  const featGrant = draft.featGrants[0]

  function toggleRestrictedAttribute(attr: AttributeId) {
    if (!restricted || restricted.option.kind !== 'specific') return
    const current = restricted.option.attributes
    const next = current.includes(attr)
      ? current.filter((a) => a !== attr)
      : [...current, attr]
    setDraft({
      ...draft,
      attributeBoosts: draft.attributeBoosts.map((b) =>
        b.id === 'restricted'
          ? { ...b, option: { kind: 'specific', attributes: next } }
          : b,
      ),
    })
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome da origem.')
      return
    }
    if (
      restricted?.option.kind === 'specific' &&
      restricted.option.attributes.length === 0
    ) {
      setError('Selecione ao menos um atributo no boost restrito.')
      return
    }
    if (!skillGrant?.skillId) {
      setError('Selecione uma perícia.')
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

      const toSave: Background = {
        ...draft,
        name: draft.name.trim(),
        provenance: { type: 'homebrew' },
        sourceId,
        loreGrants: loreGrant
          ? [loreGrant]
          : [
              {
                id: 'lore',
                rank: 'trained',
                loreId: 'custom-lore',
                loreName: 'Conhecimento Personalizado',
              },
            ],
      }

      await onSave(toSave, source)
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
          {initial.name === 'Nova Origem' ? 'Criar origem homebrew' : 'Editar origem homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`origem-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                backgrounds: [
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
          <Button variant="accent" disabled={saving} onClick={() => void handleSave()}>
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      <Panel title="Informações">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
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
          <Field label="Fonte">
            <Input
              value={sourceName}
              onChange={(e) => setSourceName(e.target.value)}
              placeholder="Ex.: Livro da Minha Campanha"
            />
          </Field>
          <Field label="Página">
            <Input
              type="number"
              min={1}
              value={draft.sourcePage ?? ''}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  sourcePage: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </Field>
          <Field label="Autor (opcional)" className="sm:col-span-2">
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Field>
          <Field label="Descrição" className="sm:col-span-2">
            <Textarea
              value={draft.description}
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
            />
          </Field>
        </div>
      </Panel>

      <Panel title="Boosts de Atributo">
        <div className="space-y-4">
          <div>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">
              Boost restrito — escolha as opções
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ATTRIBUTE_IDS.map((attr) => {
                const selected =
                  restricted?.option.kind === 'specific' &&
                  restricted.option.attributes.includes(attr)
                return (
                  <button
                    key={attr}
                    type="button"
                    title={
                      selected
                        ? 'Clique de novo para remover'
                        : 'Incluir neste boost restrito'
                    }
                    onClick={() => toggleRestrictedAttribute(attr)}
                    className={`interactive-lift rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
                      selected
                        ? 'border-accent bg-accent/20 text-accent'
                        : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
                    }`}
                  >
                    {ATTRIBUTE_LABELS[attr]}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text-muted">
            {free
              ? 'Boost livre: qualquer atributo (exceto o já escolhido no restrito).'
              : 'Sem boost livre configurado.'}
          </div>
        </div>
      </Panel>

      <Panel title="Perícia treinada">
        <Select
          value={skillGrant?.skillId ?? ''}
          onChange={(e) => {
            const skillId = e.target.value as SkillId
            setDraft({
              ...draft,
              skillGrants: [
                {
                  id: skillGrant?.id ?? 'skill',
                  rank: 'trained',
                  skillId,
                },
              ],
            })
          }}
        >
          {SKILL_IDS.map((id) => (
            <option key={id} value={id}>
              {SKILL_LABELS[id]}
            </option>
          ))}
        </Select>
      </Panel>

      <Panel title="Conhecimento">
        <LoreEditor
          loreGrant={loreGrant}
          onChange={(next) => setDraft({ ...draft, loreGrants: [next] })}
        />
      </Panel>

      <Panel title="Feito de Perícia">
        <Field label="Nome do feito">
          <Input
            value={featGrant?.featName ?? ''}
            onChange={(e) =>
              setDraft({
                ...draft,
                featGrants: [
                  {
                    id: featGrant?.id ?? 'feat',
                    featName: e.target.value,
                    featType: featGrant?.featType ?? 'skill',
                    originalName: featGrant?.originalName,
                    description: featGrant?.description,
                    actionType: featGrant?.actionType,
                  },
                ],
              })
            }
          />
        </Field>
        <Field label="Texto de regras (quando não for um feito do catálogo)">
          <Textarea
            rows={4}
            value={featGrant?.description ?? ''}
            onChange={(e) =>
              setDraft({
                ...draft,
                featGrants: [
                  {
                    id: featGrant?.id ?? 'feat',
                    featName: featGrant?.featName ?? '',
                    featType: featGrant?.featType ?? 'skill',
                    originalName: featGrant?.originalName,
                    actionType: featGrant?.actionType,
                    description: e.target.value || undefined,
                  },
                ],
              })
            }
          />
        </Field>
        <p className="mt-2 text-xs text-text-dim">
          Se o nome bater com um feito do compêndio, a ficha usa o texto oficial.
          Caso contrário, este campo aparece na origem e na ficha.
        </p>
      </Panel>

      {onDelete && (
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir esta origem homebrew? Personagens que a usam ficarão sem origem válida até escolher outra.',
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir origem
          </Button>
        </div>
      )}
    </div>
  )
}

function LoreEditor({
  loreGrant,
  onChange,
}: {
  loreGrant: Background['loreGrants'][number] | undefined
  onChange: (grant: Background['loreGrants'][number]) => void
}) {
  const mode = loreGrant?.loreOptions?.length
    ? 'choice'
    : loreGrant?.allowCustom
      ? 'custom'
      : 'fixed'

  return (
    <div className="space-y-3">
      <Field label="Tipo de Conhecimento">
        <Select
          value={mode}
          onChange={(e) => {
            const value = e.target.value
            if (value === 'fixed') {
              onChange({
                id: 'lore',
                rank: 'trained',
                loreId: 'custom-lore',
                loreName: 'Conhecimento Personalizado',
              })
            } else if (value === 'choice') {
              onChange({
                id: 'lore',
                rank: 'trained',
                loreOptions: [
                  { id: 'option-a', name: 'Conhecimento A' },
                  { id: 'option-b', name: 'Conhecimento B' },
                ],
              })
            } else {
              onChange({
                id: 'lore',
                rank: 'trained',
                allowCustom: true,
              })
            }
          }}
        >
          <option value="fixed">Conhecimento fixo</option>
          <option value="choice">Escolha entre vários</option>
          <option value="custom">Personalizado (jogador digita)</option>
        </Select>
      </Field>

      {mode === 'fixed' && (
        <Field label="Nome do Conhecimento">
          <Input
            value={loreGrant?.loreName ?? ''}
            onChange={(e) =>
              onChange({
                id: loreGrant?.id ?? 'lore',
                rank: 'trained',
                loreId:
                  loreGrant?.loreId ??
                  (e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '') ||
                    'custom-lore'),
                loreName: e.target.value,
              })
            }
          />
        </Field>
      )}

      {mode === 'choice' && loreGrant?.loreOptions && (
        <div className="space-y-2">
          {loreGrant.loreOptions.map((opt, index) => (
            <div key={opt.id} className="flex gap-2">
              <Input
                value={opt.name}
                onChange={(e) => {
                  const loreOptions = [...(loreGrant.loreOptions ?? [])]
                  const current = loreOptions[index]
                  if (!current) return
                  loreOptions[index] = {
                    ...current,
                    name: e.target.value,
                    id:
                      e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '') || current.id,
                  }
                  onChange({ ...loreGrant, loreOptions })
                }}
              />
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  const loreOptions = (loreGrant.loreOptions ?? []).filter(
                    (_, i) => i !== index,
                  )
                  onChange({ ...loreGrant, loreOptions })
                }}
              >
                Remover
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            onClick={() => {
              const loreOptions = [
                ...(loreGrant.loreOptions ?? []),
                {
                  id: createId('lore'),
                  name: 'Novo Conhecimento',
                },
              ]
              onChange({ ...loreGrant, loreOptions })
            }}
          >
            + Opção de Conhecimento
          </Button>
        </div>
      )}

      {mode === 'custom' && (
        <div className="space-y-2">
          <Field label="O que este Conhecimento deve ser">
            <Input
              value={loreGrant?.hint ?? ''}
              placeholder="Ex.: conhecimento da divindade que o abençoou"
              onChange={(e) =>
                onChange({
                  id: loreGrant?.id ?? 'lore',
                  rank: 'trained',
                  allowCustom: true,
                  hint: e.target.value || undefined,
                })
              }
            />
          </Field>
          <p className="text-sm text-text-muted">
            Na seleção da origem, o jogador verá esta instrução e poderá digitar o
            nome do Conhecimento.
          </p>
        </div>
      )}
    </div>
  )
}
