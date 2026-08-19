import { useMemo, useState } from 'react'
import type {
  Ancestry,
  AttributeId,
  ContentSource,
  CreatureSize,
  Feat,
  Heritage,
  Rarity,
  SenseKind,
} from '@/types'
import { ATTRIBUTE_IDS, RARITIES } from '@/types'
import {
  ATTRIBUTE_LABELS,
  RARITY_LABELS,
  SIZE_LABELS,
  formatSpeedMeters,
} from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import {
  DARKVISION_SENSE,
  LOW_LIGHT_SENSE,
  PLAYABLE_SIZES,
  boostsForModel,
  createEmptyHomebrewHeritage,
  detectBoostModel,
  type AncestryBoostModel,
} from '@/features/ancestries/homebrewDefaults'
import { SenseRulesCard } from '@/features/senses/components/SenseRulesCard'
import { AncestryHomebrewGuide } from '@/features/ancestries/components/AncestryHomebrewGuide'
import {
  AbilityList,
  HeritageFields,
} from '@/features/ancestries/components/HeritageEditor'
import { FeatListEditor } from '@/features/feats/components/FeatFields'
import { emptyHomebrewFeat } from '@/features/feats/homebrewFeat'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'

interface AncestryEditorProps {
  initial: Ancestry
  initialHeritages: Heritage[]
  initialFeats?: Feat[]
  initialSource?: ContentSource | null
  onSave: (payload: {
    ancestry: Ancestry
    heritages: Heritage[]
    feats: Feat[]
    removedHeritageIds: string[]
    removedFeatIds: string[]
    source: ContentSource
  }) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

export function AncestryEditor({
  initial,
  initialHeritages,
  initialFeats = [],
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: AncestryEditorProps) {
  const [draft, setDraft] = useState<Ancestry>(structuredClone(initial))
  const [heritages, setHeritages] = useState<Heritage[]>(
    structuredClone(initialHeritages),
  )
  const [feats, setFeats] = useState<Feat[]>(structuredClone(initialFeats))
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [openHeritageId, setOpenHeritageId] = useState<string | null>(null)

  const boostModel = detectBoostModel(draft)
  const specificAttrs = draft.attributeBoosts
    .filter((r) => r.option.kind === 'specific')
    .flatMap((r) => (r.option.kind === 'specific' ? r.option.attributes : []))
  const flaw = draft.attributeFlaws[0] ?? ''

  const senseKind: SenseKind | 'none' =
    draft.senses[0]?.kind === 'darkvision'
      ? 'darkvision'
      : draft.senses[0]?.kind === 'lowLightVision'
        ? 'lowLightVision'
        : 'none'

  const sizeChoice = Boolean(
    draft.extraChoices?.some((c) => c.kind === 'size'),
  )

  const originalHeritageIds = useMemo(
    () => new Set(initialHeritages.map((h) => h.id)),
    [initialHeritages],
  )
  const originalFeatIds = useMemo(
    () => new Set(initialFeats.map((f) => f.id)),
    [initialFeats],
  )

  function applyBoostModel(
    model: AncestryBoostModel,
    attrs = specificAttrs,
    nextFlaw: AttributeId | '' = flaw,
  ) {
    const { attributeBoosts, attributeFlaws } = boostsForModel(
      model,
      attrs.length ? attrs : ['strength', 'wisdom'],
      nextFlaw || null,
    )
    setDraft({
      ...draft,
      attributeBoosts: attributeBoosts.map((b) => {
        if (b.option.kind !== 'specific') return b
        const attr = b.option.attributes[0]
        return {
          ...b,
          label: attr ? `Boost de ${ATTRIBUTE_LABELS[attr]}` : b.label,
        }
      }),
      attributeFlaws,
    })
  }

  function setSpecificAttr(index: number, attr: AttributeId) {
    const next = [...specificAttrs]
    next[index] = attr
    applyBoostModel(boostModel, next, flaw)
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome da ancestralidade.')
      return
    }
    if (draft.hitPoints < 6 || draft.hitPoints > 12) {
      setError('PV da ancestralidade costuma ficar entre 6 e 10 (máx. 12).')
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
      const savedHeritages = heritages.map((h) => ({
        ...h,
        ancestryId: draft.id,
        isVersatile: false,
        provenance: { type: 'homebrew' as const },
        sourceId,
        name: h.name.trim() || 'Herança',
        originalName: h.originalName.trim() || h.name.trim() || 'Heritage',
        rulesSummary: h.rulesSummary.trim() || h.description.trim(),
      }))
      const ancestry: Ancestry = {
        ...draft,
        name: draft.name.trim(),
        originalName: draft.originalName.trim() || draft.name.trim(),
        provenance: { type: 'homebrew' },
        sourceId,
        heritageIds: savedHeritages.map((h) => h.id),
        traits: draft.traits.map((t) => t.trim()).filter(Boolean),
      }
      const removedHeritageIds = [...originalHeritageIds].filter(
        (id) => !savedHeritages.some((h) => h.id === id),
      )
      const savedFeats = feats.map((f) => ({
        ...f,
        name: f.name.trim() || 'Feito',
        originalName: f.originalName.trim() || f.name.trim() || 'Feat',
        category: 'ancestry' as const,
        ancestryId: draft.id,
        classId: null,
        provenance: { type: 'homebrew' as const },
        sourceId,
        traits: f.traits.length ? f.traits : [draft.name.trim()],
        heritageId:
          f.heritageId && savedHeritages.some((h) => h.id === f.heritageId)
            ? f.heritageId
            : null,
      }))
      const removedFeatIds = [...originalFeatIds].filter(
        (id) => !savedFeats.some((f) => f.id === id),
      )
      await onSave({
        ancestry,
        heritages: savedHeritages,
        feats: savedFeats,
        removedHeritageIds,
        removedFeatIds,
        source,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const isNew = initial.name === 'Nova Ancestralidade'

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">
          {isNew
            ? 'Criar ancestralidade homebrew'
            : 'Editar ancestralidade homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`ancestralidade-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                ancestries: [
                  {
                    ...draft,
                    provenance: { type: 'homebrew' },
                    sourceId: source.id,
                  },
                ],
                heritages: heritages.map((h) => ({
                  ...h,
                  provenance: { type: 'homebrew' as const },
                  sourceId: source.id,
                  ancestryId: draft.id,
                })),
                feats: feats.map((f) => ({
                  ...f,
                  provenance: { type: 'homebrew' as const },
                  sourceId: source.id,
                  ancestryId: draft.id,
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

      <AncestryHomebrewGuide compact={false} />

      <Panel title="Identidade">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
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
            label="Traços"
            hint="Separe por vírgula. Humanoide quase sempre entra."
          >
            <Input
              value={draft.traits.join(', ')}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  traits: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
          <Field label="Fonte">
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

      <Panel title="Corpo" subtitle="PV 8 / Médio / 7,5 m é o “humano médio”">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="PV da ancestralidade">
            <Select
              value={String(draft.hitPoints)}
              onChange={(e) =>
                setDraft({ ...draft, hitPoints: Number(e.target.value) })
              }
            >
              {[6, 8, 10].map((n) => (
                <option key={n} value={n}>
                  {n}
                  {n === 6 ? ' · frágil' : n === 10 ? ' · durão' : ' · padrão'}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Tamanho">
            <Select
              value={draft.size}
              onChange={(e) =>
                setDraft({ ...draft, size: e.target.value as CreatureSize })
              }
            >
              {PLAYABLE_SIZES.map((s) => (
                <option key={s} value={s}>
                  {SIZE_LABELS[s]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Deslocamento">
            <Select
              value={String(draft.speed)}
              onChange={(e) =>
                setDraft({ ...draft, speed: Number(e.target.value) })
              }
            >
              {[20, 25, 30].map((n) => (
                <option key={n} value={n}>
                  {formatSpeedMeters(n)}
                  {n === 20 ? ' · lento' : n === 30 ? ' · rápido' : ' · padrão'}
                </option>
              ))}
            </Select>
          </Field>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-text-muted">
          <input
            type="checkbox"
            checked={sizeChoice}
            onChange={(e) => {
              if (e.target.checked) {
                setDraft({
                  ...draft,
                  extraChoices: [
                    {
                      id: 'ancestry-size',
                      label: 'Tamanho',
                      kind: 'size',
                      required: true,
                      sizeOptions: ['small', 'medium'],
                      hint: 'Pequeno ou Médio — você escolhe na criação.',
                    },
                  ],
                })
              } else {
                setDraft({
                  ...draft,
                  extraChoices: (draft.extraChoices ?? []).filter(
                    (c) => c.kind !== 'size',
                  ),
                })
              }
            }}
          />
          O jogador escolhe Pequeno ou Médio na criação
        </label>
      </Panel>

      <Panel title="Atributos">
        <Field
          label="Modelo"
          hint="Clássico = anão/elfo. Flexível = autômato. Versátil = humano."
        >
          <Select
            value={boostModel}
            onChange={(e) =>
              applyBoostModel(e.target.value as AncestryBoostModel)
            }
          >
            <option value="classic">Clássico — 2 fixos + livre + falha</option>
            <option value="flexible">Flexível — 1 fixo + livre, sem falha</option>
            <option value="versatile">Versátil — 2 livres, sem falha</option>
          </Select>
        </Field>
        {boostModel !== 'versatile' && (
          <div className="mt-3 flex flex-wrap gap-3">
            {(boostModel === 'classic' ? [0, 1] : [0]).map((i) => (
              <Field key={i} label={i === 0 ? 'Boost fixo' : 'Segundo boost fixo'}>
                <Select
                  value={specificAttrs[i] ?? 'strength'}
                  onChange={(e) =>
                    setSpecificAttr(i, e.target.value as AttributeId)
                  }
                >
                  {ATTRIBUTE_IDS.map((id) => (
                    <option key={id} value={id}>
                      {ATTRIBUTE_LABELS[id]}
                    </option>
                  ))}
                </Select>
              </Field>
            ))}
            {boostModel === 'classic' && (
              <Field label="Falha">
                <Select
                  value={flaw}
                  onChange={(e) =>
                    applyBoostModel(
                      'classic',
                      specificAttrs,
                      e.target.value as AttributeId | '',
                    )
                  }
                >
                  <option value="">Nenhuma</option>
                  {ATTRIBUTE_IDS.map((id) => (
                    <option key={id} value={id}>
                      {ATTRIBUTE_LABELS[id]}
                    </option>
                  ))}
                </Select>
              </Field>
            )}
          </div>
        )}
      </Panel>

      <Panel title="Sentidos e idiomas">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Visão">
            <Select
              value={senseKind}
              onChange={(e) => {
                const v = e.target.value as SenseKind | 'none'
                if (v === 'none') {
                  setDraft({ ...draft, senses: [] })
                  return
                }
                const sense =
                  v === 'darkvision'
                    ? { ...DARKVISION_SENSE, id: createId('sense') }
                    : { ...LOW_LIGHT_SENSE, id: createId('sense') }
                setDraft({ ...draft, senses: [sense] })
              }}
            >
              <option value="none">Nenhuma especial</option>
              <option value="lowLightVision">Visão na penumbra</option>
              <option value="darkvision">Visão no escuro</option>
            </Select>
          </Field>
          {senseKind !== 'none' ? (
            <div className="sm:col-span-2">
              <SenseRulesCard
                kind={senseKind}
                name={
                  senseKind === 'darkvision'
                    ? 'Visão no escuro'
                    : 'Visão na penumbra'
                }
              />
            </div>
          ) : (
            <div className="sm:col-span-2">
              <SenseRulesCard kind="vision" name="Visão normal" />
            </div>
          )}
          <Field
            label="Idiomas automáticos"
            hint="Separe por vírgula. Comum quase sempre entra."
          >
            <Input
              value={draft.languages.automatic.join(', ')}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  languages: {
                    ...draft.languages,
                    automatic: splitList(e.target.value),
                  },
                })
              }
            />
          </Field>
          <Field
            label="Idiomas extras (pela Inteligência)"
            className="sm:col-span-2"
          >
            <Input
              value={draft.languages.additionalOptions.join(', ')}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  languages: {
                    ...draft.languages,
                    additionalOptions: splitList(e.target.value),
                    additionalFromIntelligence: true,
                  },
                })
              }
            />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Habilidade do povo"
        subtitle="Uma coisa memorável — não um feito de classe"
      >
        <AbilityList
          abilities={draft.specialAbilities}
          onChange={(specialAbilities) =>
            setDraft({ ...draft, specialAbilities })
          }
        />
      </Panel>

      <Panel title="Lore" subtitle="O que o jogador sente ao ler a raça">
        <div className="space-y-3">
          <Field label="Resumo">
            <Textarea
              value={draft.lore.summary}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, summary: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Você talvez…" hint="Uma ideia por linha.">
            <Textarea
              value={draft.lore.youMight.join('\n')}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: {
                    ...draft.lore,
                    youMight: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean),
                  },
                })
              }
            />
          </Field>
          <Field label="Outros provavelmente…">
            <Textarea
              value={draft.lore.othersProbably.join('\n')}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: {
                    ...draft.lore,
                    othersProbably: e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  },
                })
              }
            />
          </Field>
          <Field label="Aparência">
            <Textarea
              value={draft.lore.physicalDescription}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, physicalDescription: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Sociedade">
            <Textarea
              value={draft.lore.society}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, society: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Crenças">
            <Textarea
              value={draft.lore.beliefs}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, beliefs: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Nomes de exemplo" hint="Separe por vírgula.">
            <Input
              value={draft.lore.sampleNames.join(', ')}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: {
                    ...draft.lore,
                    sampleNames: splitList(e.target.value),
                  },
                })
              }
            />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Heranças deste povo"
        subtitle="4–6 é o ritmo oficial; zero também vale — você adiciona depois"
      >
        <div className="space-y-2">
          {heritages.map((h) => (
            <div key={h.id} className="rounded-xl border border-border bg-surface-2">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm"
                onClick={() =>
                  setOpenHeritageId(openHeritageId === h.id ? null : h.id)
                }
              >
                <span className="font-medium text-text">
                  {h.name.trim() || 'Herança sem nome'}
                </span>
                <span className="text-[11px] text-text-dim">
                  {openHeritageId === h.id ? 'recolher' : 'editar'}
                </span>
              </button>
              {openHeritageId === h.id && (
                <div className="space-y-2 border-t border-border p-3">
                  <HeritageFields
                    draft={h}
                    lockTarget
                    ancestries={[]}
                    onChange={(next) =>
                      setHeritages(
                        heritages.map((x) => (x.id === h.id ? next : x)),
                      )
                    }
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        setHeritages(heritages.filter((x) => x.id !== h.id))
                      }
                    >
                      Remover herança
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <Button
            size="sm"
            onClick={() => {
              const h = createEmptyHomebrewHeritage(draft.id)
              setHeritages([...heritages, h])
              setOpenHeritageId(h.id)
            }}
          >
            + Herança deste povo
          </Button>
        </div>
      </Panel>

      <Panel
        title="Feitos desta ancestralidade"
        subtitle="O pacote que o jogador escolhe nos níveis 1, 5, 9, 13 e 17 — como anão, elfo, goblin"
      >
        <FeatListEditor
          feats={feats}
          onChange={setFeats}
          heritages={heritages}
          onAdd={() =>
            setFeats([
              ...feats,
              emptyHomebrewFeat({
                category: 'ancestry',
                ancestryId: draft.id,
                trait: draft.name.trim() || 'Ancestralidade',
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
                  'Excluir esta ancestralidade e as heranças homebrew dela? Personagens que a usam ficarão sem ancestralidade até escolher outra.',
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir ancestralidade
          </Button>
        </div>
      )}
    </div>
  )
}

function splitList(raw: string): string[] {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
