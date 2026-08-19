import { useState } from 'react'
import type {
  Ancestry,
  ContentSource,
  CreatureSize,
  Heritage,
  Rarity,
  SenseKind,
  SkillId,
  SpecialAbilityDefinition,
} from '@/types'
import { RARITIES, SKILL_IDS } from '@/types'
import {
  RARITY_LABELS,
  SIZE_LABELS,
  SKILL_LABELS,
  formatSpeedMeters,
} from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import {
  ActionRichTextarea,
  ActionTypePicker,
} from '@/components/ui/ActionTypePicker'
import {
  DARKVISION_SENSE,
  LOW_LIGHT_SENSE,
  PLAYABLE_SIZES,
  createEmptyHomebrewHeritage,
  emptySpecialAbility,
} from '@/features/ancestries/homebrewDefaults'
import { AncestryHomebrewGuide } from '@/features/ancestries/components/AncestryHomebrewGuide'
import { SenseRulesCard } from '@/features/senses/components/SenseRulesCard'

export function HeritageFields({
  draft,
  onChange,
  ancestries,
  lockTarget,
}: {
  draft: Heritage
  onChange: (next: Heritage) => void
  ancestries: Ancestry[]
  /** Quando true, não deixa trocar específica/versátil. */
  lockTarget?: boolean
}) {
  const senseKind: SenseKind | 'none' | 'upgrade' = draft.upgradeLowLightToDarkvision
    ? 'upgrade'
    : draft.senses?.[0]?.kind === 'darkvision'
      ? 'darkvision'
      : draft.senses?.[0]?.kind === 'lowLightVision'
        ? 'lowLightVision'
        : 'none'

  function setSense(kind: SenseKind | 'none' | 'upgrade') {
    if (kind === 'none') {
      onChange({
        ...draft,
        senses: [],
        upgradeLowLightToDarkvision: false,
      })
      return
    }
    if (kind === 'upgrade') {
      onChange({
        ...draft,
        senses: [{ ...LOW_LIGHT_SENSE, id: createId('sense') }],
        upgradeLowLightToDarkvision: true,
      })
      return
    }
    const sense =
      kind === 'darkvision'
        ? { ...DARKVISION_SENSE, id: createId('sense') }
        : { ...LOW_LIGHT_SENSE, id: createId('sense') }
    onChange({
      ...draft,
      senses: [sense],
      upgradeLowLightToDarkvision: false,
    })
  }

  const skillId = draft.skillGrants?.[0]?.skillId ?? ''

  return (
    <div className="space-y-3">
      {!lockTarget && (
        <Panel title="Onde esta herança encaixa">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Tipo"
              hint="Específica = um povo. Versátil = qualquer ancestralidade (tipo Aiuvarin)."
            >
              <Select
                value={draft.isVersatile ? 'versatile' : 'specific'}
                onChange={(e) => {
                  const versatile = e.target.value === 'versatile'
                  onChange({
                    ...draft,
                    isVersatile: versatile,
                    ancestryId: versatile ? null : (draft.ancestryId ?? ancestries[0]?.id ?? null),
                  })
                }}
              >
                <option value="specific">Desta ancestralidade</option>
                <option value="versatile">Versátil (qualquer povo)</option>
              </Select>
            </Field>
            {!draft.isVersatile && (
              <Field label="Ancestralidade">
                <Select
                  value={draft.ancestryId ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...draft,
                      ancestryId: e.target.value || null,
                      isVersatile: false,
                    })
                  }
                >
                  <option value="">Escolha…</option>
                  {ancestries.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                      {a.provenance.type === 'homebrew' ? ' (homebrew)' : ''}
                    </option>
                  ))}
                </Select>
              </Field>
            )}
          </div>
        </Panel>
      )}

      <Panel title="Texto">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={draft.name}
              onChange={(e) => onChange({ ...draft, name: e.target.value })}
            />
          </Field>
          <Field label="Nome original (inglês)" hint="ID interno da mesa / livros.">
            <Input
              value={draft.originalName}
              onChange={(e) =>
                onChange({ ...draft, originalName: e.target.value })
              }
            />
          </Field>
          <Field label="Raridade">
            <Select
              value={draft.rarity}
              onChange={(e) =>
                onChange({ ...draft, rarity: e.target.value as Rarity })
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
            label="Resumo na ficha"
            hint="Uma linha. Ex.: Treinado em Ofício; +1 para Recobrar."
          >
            <Input
              value={draft.rulesSummary}
              onChange={(e) =>
                onChange({ ...draft, rulesSummary: e.target.value })
              }
            />
          </Field>
          <Field
            label="Descrição"
            hint="Clique num ícone se a herança conceder uma ação."
            className="sm:col-span-2"
          >
            <ActionRichTextarea
              value={draft.description}
              onChange={(e) =>
                onChange({ ...draft, description: e.target.value })
              }
            />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Pacote mecânico"
        subtitle="Pegue no máximo duas coisas desta lista"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Sentido">
            <Select
              value={senseKind}
              onChange={(e) =>
                setSense(e.target.value as SenseKind | 'none' | 'upgrade')
              }
            >
              <option value="none">Nenhum extra</option>
              <option value="lowLightVision">Visão na penumbra</option>
              <option value="darkvision">Visão no escuro</option>
              <option value="upgrade">
                Penumbra → escuro se o povo já vê na penumbra
              </option>
            </Select>
          </Field>
          {senseKind !== 'none' ? (
            <div className="sm:col-span-2">
              <SenseRulesCard
                kind={
                  senseKind === 'upgrade' || senseKind === 'darkvision'
                    ? 'darkvision'
                    : 'lowLightVision'
                }
                name={
                  senseKind === 'lowLightVision'
                    ? 'Visão na penumbra'
                    : 'Visão no escuro'
                }
                description={
                  senseKind === 'upgrade'
                    ? 'Se a ancestralidade já tem visão na penumbra, esta herança troca por visão no escuro. Sem penumbra, concede visão na penumbra.'
                    : undefined
                }
              />
            </div>
          ) : null}
          <Field label="Perícia treinada" hint="Vazio = não treina nada.">
            <Select
              value={skillId}
              onChange={(e) => {
                const id = e.target.value as SkillId | ''
                onChange({
                  ...draft,
                  skillGrants: id
                    ? [
                        {
                          id: 'heritage-skill',
                          rank: 'trained',
                          skillId: id,
                          replaceIfTrained: true,
                        },
                      ]
                    : undefined,
                })
              }}
            >
              <option value="">Nenhuma</option>
              {SKILL_IDS.map((id) => (
                <option key={id} value={id}>
                  {SKILL_LABELS[id]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="PV da ancestralidade" hint="Ex.: goblin inquebrável = 10.">
            <Input
              type="number"
              min={6}
              max={12}
              value={draft.hitPointsOverride ?? ''}
              placeholder="manter"
              onChange={(e) =>
                onChange({
                  ...draft,
                  hitPointsOverride: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </Field>
          <Field label="Tamanho">
            <Select
              value={draft.sizeOverride ?? ''}
              onChange={(e) => {
                const value = e.target.value
                onChange({
                  ...draft,
                  sizeOverride: PLAYABLE_SIZES.includes(value as CreatureSize)
                    ? (value as CreatureSize)
                    : undefined,
                })
              }}
            >
              <option value="">Manter o da ancestralidade</option>
              {PLAYABLE_SIZES.map((s) => (
                <option key={s} value={s}>
                  {SIZE_LABELS[s]}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="Deslocamento terrestre"
            hint="Deixe vazio para manter o da ancestralidade. 25 = 7,5 m."
          >
            <Input
              type="number"
              min={5}
              max={40}
              step={5}
              value={draft.speedOverride ?? ''}
              placeholder="manter"
              onChange={(e) =>
                onChange({
                  ...draft,
                  speedOverride: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </Field>
          <Field
            label="Bônus de deslocamento"
            hint={`Soma em pés no terrestre. 5 = ${formatSpeedMeters(5)}.`}
          >
            <Input
              type="number"
              min={0}
              max={20}
              step={5}
              value={draft.speedBonus ?? ''}
              placeholder="0"
              onChange={(e) =>
                onChange({
                  ...draft,
                  speedBonus: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
            />
          </Field>
          <Field
            label="Escalar / nadar / voar"
            hint={`0 = não tem. 20 = ${formatSpeedMeters(20)}.`}
          >
            <div className="grid grid-cols-3 gap-1.5">
              {(['climb', 'swim', 'fly'] as const).map((kind) => (
                <Input
                  key={kind}
                  type="number"
                  min={0}
                  max={40}
                  step={5}
                  placeholder={
                    kind === 'climb'
                      ? 'escalar'
                      : kind === 'swim'
                        ? 'nadar'
                        : 'voar'
                  }
                  value={draft.additionalSpeeds?.[kind] ?? ''}
                  onChange={(e) => {
                    const n = e.target.value ? Number(e.target.value) : 0
                    const additionalSpeeds = {
                      ...(draft.additionalSpeeds ?? {}),
                    }
                    if (!n) delete additionalSpeeds[kind]
                    else additionalSpeeds[kind] = n
                    onChange({
                      ...draft,
                      additionalSpeeds:
                        Object.keys(additionalSpeeds).length > 0
                          ? additionalSpeeds
                          : undefined,
                    })
                  }}
                />
              ))}
            </div>
          </Field>
        </div>
      </Panel>

      <Panel title="Habilidades" subtitle="No máximo uma ou duas frases cada">
        <AbilityList
          abilities={draft.specialAbilities ?? []}
          onChange={(specialAbilities) =>
            onChange({ ...draft, specialAbilities })
          }
        />
      </Panel>
    </div>
  )
}

export function AbilityList({
  abilities,
  onChange,
}: {
  abilities: SpecialAbilityDefinition[]
  onChange: (next: SpecialAbilityDefinition[]) => void
}) {
  return (
    <div className="space-y-2">
      {abilities.map((ab, index) => (
        <div
          key={ab.id}
          className="space-y-2 rounded-lg border border-border bg-surface-2 p-2.5"
        >
          <div className="flex flex-wrap items-start gap-2">
            <Input
              className="min-w-[12rem] flex-1"
              placeholder="Nome"
              value={ab.name}
              onChange={(e) => {
                const next = [...abilities]
                const cur = next[index]
                if (!cur) return
                next[index] = { ...cur, name: e.target.value }
                onChange(next)
              }}
            />
            <Button
              size="sm"
              variant="danger"
              onClick={() => onChange(abilities.filter((_, i) => i !== index))}
            >
              Remover
            </Button>
          </div>
          <ActionTypePicker
            value={ab.actionType ?? 'passive'}
            includePassive
            onChange={(type) => {
              const next = [...abilities]
              const cur = next[index]
              if (!cur) return
              next[index] = {
                ...cur,
                actionType: (type ?? 'passive') as SpecialAbilityDefinition['actionType'],
              }
              onChange(next)
            }}
          />
          <ActionRichTextarea
            placeholder="O que faz. Clique num ícone para colocar no texto."
            value={ab.description}
            onChange={(e) => {
              const next = [...abilities]
              const cur = next[index]
              if (!cur) return
              next[index] = { ...cur, description: e.target.value }
              onChange(next)
            }}
          />
        </div>
      ))}
      <Button
        size="sm"
        onClick={() => onChange([...abilities, emptySpecialAbility()])}
      >
        + Habilidade
      </Button>
    </div>
  )
}

interface HeritageEditorProps {
  initial: Heritage
  ancestries: Ancestry[]
  initialSource?: ContentSource | null
  /** Trava específica vs versátil (ex.: tela de heranças versáteis). */
  lockTarget?: boolean
  onSave: (heritage: Heritage, source: ContentSource) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

export function HeritageEditor({
  initial,
  ancestries,
  initialSource,
  lockTarget,
  onSave,
  onCancel,
  onDelete,
}: HeritageEditorProps) {
  const [draft, setDraft] = useState<Heritage>(structuredClone(initial))
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome da herança.')
      return
    }
    if (!draft.isVersatile && !draft.ancestryId) {
      setError('Escolha a ancestralidade desta herança, ou marque como versátil.')
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
      const toSave: Heritage = {
        ...draft,
        name: draft.name.trim(),
        originalName: draft.originalName.trim() || draft.name.trim(),
        rulesSummary: draft.rulesSummary.trim() || draft.description.trim(),
        provenance: { type: 'homebrew' },
        sourceId,
        ancestryId: draft.isVersatile ? null : draft.ancestryId,
      }
      await onSave(toSave, source)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const isNew =
    initial.name === 'Nova Herança' ||
    initial.name === 'Nova Herança Versátil'

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">
          {isNew ? 'Criar herança homebrew' : 'Editar herança homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`heranca-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                heritages: [
                  {
                    ...draft,
                    provenance: { type: 'homebrew' },
                    sourceId: source.id,
                    ancestryId: draft.isVersatile ? null : draft.ancestryId,
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

      <AncestryHomebrewGuide compact />

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

      <HeritageFields
        draft={draft}
        onChange={setDraft}
        ancestries={ancestries}
        lockTarget={lockTarget}
      />

      {onDelete && (
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir esta herança homebrew? Personagens que a usam ficarão sem herança até escolher outra.',
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir herança
          </Button>
        </div>
      )}
    </div>
  )
}

export { createEmptyHomebrewHeritage }
