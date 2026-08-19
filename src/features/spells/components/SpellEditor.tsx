import { useState } from 'react'
import type {
  ContentSource,
  Rarity,
  Spell,
  SpellRank,
  SpellTradition,
} from '@/types'
import {
  CLASS_FOCUS_TRAITS,
  RARITIES,
  SPELL_TRADITIONS,
  type ClassFocusTrait,
} from '@/types'
import { RARITY_LABELS, TRADITION_LABELS } from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select } from '@/components/ui/Field'
import {
  ActionRichTextarea,
  ActionTypePicker,
} from '@/components/ui/ActionTypePicker'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import { SpellHomebrewGuide } from '@/features/spells/components/SpellHomebrewGuide'
import {
  FOCUS_CLASS_OPTIONS,
  applySpellKind,
  splitTraitList,
  type SpellCreateKind,
} from '@/features/spells/homebrewDefaults'
import { spellKind, spellKindLabel, SPELL_KIND_TABS } from '@/features/spells/spellUi'

interface SpellEditorProps {
  initial: Spell
  createKind: SpellCreateKind
  initialSource?: ContentSource | null
  onSave: (payload: { spell: Spell; source: ContentSource }) => Promise<void>
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

export function SpellEditor({
  initial,
  createKind,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: SpellEditorProps) {
  const [draft, setDraft] = useState<Spell>(() =>
    applySpellKind(structuredClone(initial), createKind),
  )
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kind = spellKind(draft)
  const isNew =
    initial.name.startsWith('Novo ') || initial.name.startsWith('Nova ')
  const classTrait =
    CLASS_FOCUS_TRAITS.find((trait) => draft.traits.includes(trait)) ?? ''

  function patch(partial: Partial<Spell>) {
    setDraft({ ...draft, ...partial })
  }

  function setKind(next: SpellCreateKind) {
    setDraft(applySpellKind(draft, next))
  }

  function toggleTradition(tradition: SpellTradition) {
    const has = draft.traditions.includes(tradition)
    patch({
      traditions: has
        ? draft.traditions.filter((t) => t !== tradition)
        : [...draft.traditions, tradition],
    })
  }

  function setFocusClass(trait: ClassFocusTrait | '') {
    const rest = draft.traits.filter(
      (t) => !CLASS_FOCUS_TRAITS.includes(t as ClassFocusTrait),
    )
    patch({
      traits: trait ? [...rest, trait] : rest,
    })
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome.')
      return
    }
    if (kind !== 'focus' && draft.traditions.length === 0) {
      setError('Escolha ao menos uma tradição. Sem ela, a ficha não oferece a magia.')
      return
    }
    if (kind === 'cantrip' && draft.rank !== 0) {
      setError('Truque fica no posto 0.')
      return
    }
    if (kind !== 'cantrip' && draft.rank < 1) {
      setError('Magia e foco usam posto 1–10.')
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
      const spell: Spell = {
        ...applySpellKind(
          {
            ...draft,
            name,
            originalName: draft.originalName.trim() || name,
            description: (draft.description || draft.summary || '').trim(),
            summary: (draft.summary || draft.description || '').trim(),
            source: source.name,
            provenance: { type: 'homebrew' },
            sourceId,
            aonUrl: undefined,
          },
          kind,
        ),
      }
      await onSave({ spell, source })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const ranks: SpellRank[] =
    kind === 'cantrip' ? [0] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">
          {isNew
            ? `Criar ${spellKindLabel(kind).toLowerCase()} homebrew`
            : `Editar ${spellKindLabel(kind).toLowerCase()} homebrew`}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`magia-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                spells: [
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

      <SpellHomebrewGuide kind={kind} />

      <Panel title="Tipo" subtitle="Magia de combate — não é ritual">
        <div className="flex flex-wrap gap-1.5">
          {SPELL_KIND_TABS.filter((tab) => tab.id !== 'all').map((tab) => (
            <Chip
              key={tab.id}
              active={kind === tab.id}
              onClick={() => setKind(tab.id as SpellCreateKind)}
            >
              {tab.label}
            </Chip>
          ))}
        </div>
        <p className="mt-2 text-[11px] text-text-dim">
          Ritual (horas, perícia, custo em PO) fica no Compêndio → Rituais.
        </p>
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

      <Panel title="Regras">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Posto">
            <Select
              value={String(draft.rank)}
              disabled={kind === 'cantrip'}
              onChange={(e) =>
                patch({ rank: Number(e.target.value) as SpellRank })
              }
            >
              {ranks.map((rank) => (
                <option key={rank} value={rank}>
                  {rank === 0 ? 'Truque (0)' : `Posto ${rank}`}
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
          <Field
            label="Custo de ação"
            hint="O ícone aparece ao lado do nome. Variável: Especial e coloque 1/2/3 no texto."
          >
            <ActionTypePicker
              value={draft.actionType}
              includePassive={false}
              includeEmpty
              emptyLabel="Especial"
              onChange={(type) =>
                patch({
                  actionType: type as Spell['actionType'] | undefined,
                })
              }
            />
          </Field>
          {kind === 'focus' && (
            <Field
              label="Traço de classe"
              hint="Filtra na ficha. Vazio = qualquer um com pontos de foco."
            >
              <Select
                value={classTrait}
                onChange={(e) =>
                  setFocusClass((e.target.value || '') as ClassFocusTrait | '')
                }
              >
                <option value="">Nenhuma (pool de foco genérico)</option>
                {FOCUS_CLASS_OPTIONS.map((option) => (
                  <option key={option.trait} value={option.trait}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </Field>
          )}
        </div>

        <Field
          label="Tradições"
          className="mt-3"
          hint={
            kind === 'focus'
              ? 'Opcional no foco — o filtro da ficha usa o traço de classe.'
              : 'Sem tradição, a magia não aparece para o conjurador.'
          }
        >
          <div className="flex flex-wrap gap-1.5">
            {SPELL_TRADITIONS.map((tradition) => (
              <Chip
                key={tradition}
                active={draft.traditions.includes(tradition)}
                onClick={() => toggleTradition(tradition)}
              >
                {TRADITION_LABELS[tradition]}
              </Chip>
            ))}
          </div>
        </Field>

        <Field
          label="Traços"
          className="mt-3"
          hint="Separados por vírgula. Em inglês, como no AoN (Attack, Manipulate, Fire…)."
        >
          <Input
            value={draft.traits.join(', ')}
            onChange={(e) => patch({ traits: splitTraitList(e.target.value) })}
          />
        </Field>
      </Panel>

      <Panel title="Texto">
        <Field
          label="Resumo"
          hint="Uma frase para a lista. O texto completo vai no campo Descrição."
        >
          <ActionRichTextarea
            rows={2}
            value={draft.summary ?? ''}
            onChange={(e) => patch({ summary: e.target.value })}
          />
        </Field>
        <Field
          label="Descrição"
          className="mt-3"
          hint="Efeito completo: o que a magia faz, graus de sucesso e altura."
        >
          <ActionRichTextarea
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
                  'Excluir esta magia homebrew? Personagens que a conhecem ficam com o ID órfão.',
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
