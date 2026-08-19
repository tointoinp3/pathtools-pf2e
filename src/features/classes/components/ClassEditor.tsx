import { useMemo, useState } from 'react'
import type {
  AttackProficiencyCategory,
  AttributeId,
  CharacterClass,
  ClassFeature,
  ClassSubclassOption,
  ContentSource,
  DefenseProficiencyCategory,
  Feat,
  ProficiencyRank,
  Rarity,
  SkillId,
  SpellTradition,
} from '@/types'
import {
  ATTRIBUTE_IDS,
  PROFICIENCY_RANKS,
  RARITIES,
  SKILL_IDS,
} from '@/types'
import {
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  RARITY_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
} from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'
import { ActionCost } from '@/components/ui/ActionIcon'
import {
  ActionRichTextarea,
  ActionTypePicker,
} from '@/components/ui/ActionTypePicker'
import { createId } from '@/utils/id'
import { FeatListEditor } from '@/features/feats/components/FeatFields'
import { emptyHomebrewFeat } from '@/features/feats/homebrewFeat'
import { ClassHomebrewGuide } from '@/features/classes/components/ClassHomebrewGuide'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import {
  ATTACK_CAT_LABELS,
  DEFENSE_CAT_LABELS,
  PLAYABLE_ATTACK_CATS,
  PLAYABLE_DEFENSE_CATS,
  STARTING_RANKS,
  buildHomebrewLevelTable,
  defaultClassFeatLevelsFor,
  detectFeatCadence,
  detectSkillFeatCadence,
  detectSpellMode,
  emptyClassFeature,
  spellcastingForMode,
  type ClassFeatCadence,
  type HomebrewSpellMode,
  type SkillFeatCadence,
} from '@/features/classes/homebrewDefaults'

interface ClassEditorProps {
  initial: CharacterClass
  initialFeats: Feat[]
  initialSource?: ContentSource | null
  onSave: (payload: {
    characterClass: CharacterClass
    feats: Feat[]
    removedFeatIds: string[]
    source: ContentSource
  }) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

export function ClassEditor({
  initial,
  initialFeats,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: ClassEditorProps) {
  const [draft, setDraft] = useState<CharacterClass>(structuredClone(initial))
  const [feats, setFeats] = useState<Feat[]>(structuredClone(initialFeats))
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [featCadence, setFeatCadence] = useState<ClassFeatCadence>(
    detectFeatCadence(initial),
  )
  const [skillFeatCadence, setSkillFeatCadence] = useState<SkillFeatCadence>(
    detectSkillFeatCadence(initial),
  )
  const [spellMode, setSpellMode] = useState<HomebrewSpellMode>(
    detectSpellMode(initial),
  )
  const [spellTradition, setSpellTradition] = useState<SpellTradition>(
    initial.spellcasting?.tradition ?? 'arcane',
  )
  const [spellAttribute, setSpellAttribute] = useState<AttributeId>(
    initial.spellcasting?.attributeOptions[0] ?? 'intelligence',
  )

  const originalFeatIds = useMemo(
    () => new Set(initialFeats.map((f) => f.id)),
    [initialFeats],
  )

  const hasSubclass = Boolean(draft.subclass)

  function rankOfAttack(cat: AttackProficiencyCategory): ProficiencyRank | '' {
    return draft.attacks.find((a) => a.category === cat)?.rank ?? ''
  }

  function rankOfDefense(cat: DefenseProficiencyCategory): ProficiencyRank | '' {
    return draft.defenses.find((d) => d.category === cat)?.rank ?? ''
  }

  function setAttack(cat: AttackProficiencyCategory, rank: ProficiencyRank | '') {
    const rest = draft.attacks.filter((a) => a.category !== cat)
    setDraft({
      ...draft,
      attacks: rank
        ? [...rest, { category: cat, rank, label: ATTACK_CAT_LABELS[cat] }]
        : rest,
    })
  }

  function setDefense(
    cat: DefenseProficiencyCategory,
    rank: ProficiencyRank | '',
  ) {
    const rest = draft.defenses.filter((d) => d.category !== cat)
    setDraft({
      ...draft,
      defenses: rank
        ? [...rest, { category: cat, rank, label: DEFENSE_CAT_LABELS[cat] }]
        : rest,
    })
  }

  function toggleKeyAttribute(attr: AttributeId) {
    const has = draft.keyAttributeOptions.includes(attr)
    const next = has
      ? draft.keyAttributeOptions.filter((a) => a !== attr)
      : [...draft.keyAttributeOptions, attr]
    setDraft({ ...draft, keyAttributeOptions: next })
  }

  function toggleFixedSkill(skill: SkillId) {
    const current = draft.skills.fixed ?? []
    const has = current.some((s) => s.skillId === skill)
    setDraft({
      ...draft,
      skills: {
        ...draft.skills,
        fixed: has
          ? current.filter((s) => s.skillId !== skill)
          : [
              ...current,
              {
                id: createId('skill'),
                rank: 'trained',
                skillId: skill,
              },
            ],
      },
    })
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome da classe.')
      return
    }
    if (draft.keyAttributeOptions.length === 0) {
      setError('Escolha ao menos um atributo-chave.')
      return
    }
    if (draft.hitPointsPerLevel < 6 || draft.hitPointsPerLevel > 12) {
      setError('PV por nível costuma ficar entre 6 e 10 (máx. 12).')
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
      const features = draft.features.map((f) => ({
        ...f,
        name: f.name.trim() || 'Recurso',
      }))
      const characterClass: CharacterClass = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        provenance: { type: 'homebrew' },
        sourceId,
        features,
        classFeatLevels: defaultClassFeatLevelsFor(featCadence),
        levelTable: buildHomebrewLevelTable({
          className: name,
          featCadence,
          skillFeatCadence,
          features,
        }),
        spellcasting: spellcastingForMode({
          classId: draft.id,
          className: name,
          mode: spellMode,
          tradition: spellTradition,
          attributeId: spellAttribute,
        }),
        subclass: draft.subclass
          ? {
              ...draft.subclass,
              options: draft.subclass.options.map((o) => ({
                ...o,
                name: o.name.trim() || 'Especialização',
                originalName: o.originalName.trim() || o.name.trim() || 'Opção',
              })),
            }
          : undefined,
      }
      const savedFeats = feats.map((f) => ({
        ...f,
        name: f.name.trim() || 'Feito',
        originalName: f.originalName.trim() || f.name.trim() || 'Feito',
        category: 'class' as const,
        classId: draft.id,
        ancestryId: null,
        heritageId: null,
        provenance: { type: 'homebrew' as const },
        sourceId,
        traits: f.traits.length ? f.traits : [name],
      }))
      const removedFeatIds = [...originalFeatIds].filter(
        (id) => !savedFeats.some((f) => f.id === id),
      )
      await onSave({
        characterClass,
        feats: savedFeats,
        removedFeatIds,
        source,
      })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const isNew = initial.name === 'Nova Classe'
  const startingRanks = STARTING_RANKS.filter((r) =>
    PROFICIENCY_RANKS.includes(r),
  )

  return (
    <div className="mx-auto max-w-3xl space-y-3 p-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">
          {isNew ? 'Criar classe homebrew' : 'Editar classe homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`classe-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                classes: [
                  {
                    ...draft,
                    provenance: { type: 'homebrew' },
                    sourceId: source.id,
                  },
                ],
                feats: feats.map((f) => ({
                  ...f,
                  provenance: { type: 'homebrew' as const },
                  sourceId: source.id,
                  classId: draft.id,
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

      <ClassHomebrewGuide compact={false} />

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
          <Field label="PV por nível" hint="6 frágil · 8 padrão · 10 durão">
            <Input
              type="number"
              min={6}
              max={12}
              value={draft.hitPointsPerLevel}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  hitPointsPerLevel: Number(e.target.value) || 8,
                })
              }
            />
          </Field>
        </div>
        <Field
          label="Atributo-chave"
          hint="O jogador escolhe um destes no 1º nível (+1)."
        >
          <div className="flex flex-wrap gap-1.5">
            {ATTRIBUTE_IDS.map((attr) => {
              const on = draft.keyAttributeOptions.includes(attr)
              return (
                <button
                  key={attr}
                  type="button"
                  onClick={() => toggleKeyAttribute(attr)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs ${
                    on
                      ? 'border-accent bg-accent/20 text-accent'
                      : 'border-border bg-surface-3 text-text-muted'
                  }`}
                >
                  {ATTRIBUTE_LABELS[attr]}
                </button>
              )
            })}
          </div>
        </Field>
      </Panel>

      <Panel title="Proficiências iniciais">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Percepção">
            <Select
              value={draft.perceptionRank}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  perceptionRank: e.target.value as ProficiencyRank,
                })
              }
            >
              {startingRanks.map((r) => (
                <option key={r} value={r}>
                  {PROFICIENCY_LABELS[r]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="CD de classe">
            <Select
              value={draft.classDcRank}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  classDcRank: e.target.value as ProficiencyRank,
                })
              }
            >
              {startingRanks.map((r) => (
                <option key={r} value={r}>
                  {PROFICIENCY_LABELS[r]}
                </option>
              ))}
            </Select>
          </Field>
          {(['fortitude', 'reflex', 'will'] as const).map((save) => (
            <Field
              key={save}
              label={
                save === 'fortitude'
                  ? 'Fortitude'
                  : save === 'reflex'
                    ? 'Reflexos'
                    : 'Vontade'
              }
            >
              <Select
                value={draft.saves[save]}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    saves: {
                      ...draft.saves,
                      [save]: e.target.value as ProficiencyRank,
                    },
                  })
                }
              >
                {startingRanks.map((r) => (
                  <option key={r} value={r}>
                    {PROFICIENCY_LABELS[r]}
                  </option>
                ))}
              </Select>
            </Field>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <div className="mb-1.5 text-xs font-medium text-text">Ataques</div>
            {PLAYABLE_ATTACK_CATS.map((cat) => (
              <Field key={cat} label={ATTACK_CAT_LABELS[cat]}>
                <Select
                  value={rankOfAttack(cat)}
                  onChange={(e) =>
                    setAttack(cat, (e.target.value || '') as ProficiencyRank | '')
                  }
                >
                  <option value="">Sem treino</option>
                  {startingRanks.map((r) => (
                    <option key={r} value={r}>
                      {PROFICIENCY_LABELS[r]}
                    </option>
                  ))}
                </Select>
              </Field>
            ))}
          </div>
          <div>
            <div className="mb-1.5 text-xs font-medium text-text">Defesas</div>
            {PLAYABLE_DEFENSE_CATS.map((cat) => (
              <Field key={cat} label={DEFENSE_CAT_LABELS[cat]}>
                <Select
                  value={rankOfDefense(cat)}
                  onChange={(e) =>
                    setDefense(
                      cat,
                      (e.target.value || '') as ProficiencyRank | '',
                    )
                  }
                >
                  <option value="">Sem treino</option>
                  {startingRanks.map((r) => (
                    <option key={r} value={r}>
                      {PROFICIENCY_LABELS[r]}
                    </option>
                  ))}
                </Select>
              </Field>
            ))}
          </div>
        </div>
      </Panel>

      <Panel title="Perícias">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Perícias extras"
            hint="Além das fixas. O motor soma INT se marcado."
          >
            <Input
              type="number"
              min={0}
              max={8}
              value={draft.skills.additionalBase}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  skills: {
                    ...draft.skills,
                    additionalBase: Number(e.target.value) || 0,
                  },
                })
              }
            />
          </Field>
          <label className="mt-6 flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={draft.skills.additionalFromIntelligence}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  skills: {
                    ...draft.skills,
                    additionalFromIntelligence: e.target.checked,
                  },
                })
              }
            />
            Somar modificador de Inteligência
          </label>
        </div>
        <Field label="Perícias sempre treinadas" hint="Ex.: Arcanismo do mago.">
          <div className="flex flex-wrap gap-1.5">
            {SKILL_IDS.map((id) => {
              const on = (draft.skills.fixed ?? []).some((s) => s.skillId === id)
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => toggleFixedSkill(id)}
                  className={`rounded-lg border px-2.5 py-1.5 text-xs ${
                    on
                      ? 'border-accent bg-accent/20 text-accent'
                      : 'border-border bg-surface-3 text-text-muted'
                  }`}
                >
                  {SKILL_LABELS[id]}
                </button>
              )
            })}
          </div>
        </Field>
      </Panel>

      <Panel title="Progressão">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Feitos de classe"
            hint="Marcial = 1º + pares. Conjurador = pares a partir do 2º."
          >
            <Select
              value={featCadence}
              onChange={(e) =>
                setFeatCadence(e.target.value as ClassFeatCadence)
              }
            >
              <option value="martial">Marcial (1º e pares)</option>
              <option value="caster">Conjurador (pares desde o 2º)</option>
            </Select>
          </Field>
          <Field
            label="Feitos de perícia"
            hint="Padrão = níveis pares. Ladino = todos os níveis."
          >
            <Select
              value={skillFeatCadence}
              onChange={(e) =>
                setSkillFeatCadence(e.target.value as SkillFeatCadence)
              }
            >
              <option value="even">Pares (padrão)</option>
              <option value="all">Todos os níveis</option>
            </Select>
          </Field>
        </div>
        <p className="mt-2 text-[11px] text-text-dim">
          A tabela de 1–20 é montada sozinha: feitos de ancestralidade nos
          ímpares 5–17, gerais em 3/7/11/15/19, aumentos de atributo em
          5/10/15/20, mais os recursos que você listar abaixo.
        </p>
      </Panel>

      <Panel
        title="Recursos da classe"
        subtitle="A assinatura de 1º nível e o que destranca depois"
      >
        <div className="space-y-2">
          {draft.features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onChange={(next) => {
                const features = [...draft.features]
                features[index] = next
                setDraft({ ...draft, features })
              }}
              onRemove={() =>
                setDraft({
                  ...draft,
                  features: draft.features.filter((f) => f.id !== feature.id),
                })
              }
            />
          ))}
          <Button
            size="sm"
            onClick={() =>
              setDraft({
                ...draft,
                features: [...draft.features, emptyClassFeature(1)],
              })
            }
          >
            + Recurso
          </Button>
        </div>
      </Panel>

      <Panel title="Conjuração" subtitle="Opcional — a maioria das classes não tem">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tipo">
            <Select
              value={spellMode}
              onChange={(e) =>
                setSpellMode(e.target.value as HomebrewSpellMode)
              }
            >
              <option value="none">Sem magia própria</option>
              <option value="focusOnly">Só magias de foco</option>
              <option value="limited">Conjurador limitado (magus)</option>
              <option value="prepared">Completo preparado (mago)</option>
              <option value="spontaneous">Completo espontâneo (feiticeiro)</option>
            </Select>
          </Field>
          {spellMode !== 'none' && (
            <>
              <Field label="Tradição">
                <Select
                  value={spellTradition}
                  onChange={(e) =>
                    setSpellTradition(e.target.value as SpellTradition)
                  }
                >
                  {(Object.keys(TRADITION_LABELS) as SpellTradition[]).map(
                    (t) => (
                      <option key={t} value={t}>
                        {TRADITION_LABELS[t]}
                      </option>
                    ),
                  )}
                </Select>
              </Field>
              <Field label="Atributo de conjuração">
                <Select
                  value={spellAttribute}
                  onChange={(e) =>
                    setSpellAttribute(e.target.value as AttributeId)
                  }
                >
                  {ATTRIBUTE_IDS.map((a) => (
                    <option key={a} value={a}>
                      {ATTRIBUTE_LABELS[a]}
                    </option>
                  ))}
                </Select>
              </Field>
            </>
          )}
        </div>
      </Panel>

      <Panel
        title="Especialização"
        subtitle="Instinto, racket, escola, causa… 4–8 opções é o ritmo oficial"
      >
        <label className="mb-3 flex items-center gap-2 text-sm text-text-muted">
          <input
            type="checkbox"
            checked={hasSubclass}
            onChange={(e) => {
              if (!e.target.checked) {
                setDraft({ ...draft, subclass: undefined })
                return
              }
              setDraft({
                ...draft,
                subclass: {
                  id: createId('subclass'),
                  label: 'Especialização',
                  description: '',
                  required: true,
                  options: [emptySubclassOption()],
                },
              })
            }}
          />
          Esta classe tem especialização no 1º nível
        </label>
        {draft.subclass && (
          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nome do grupo" hint="Ex.: Instinto, Racket, Escola">
                <Input
                  value={draft.subclass.label}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      subclass: { ...draft.subclass!, label: e.target.value },
                    })
                  }
                />
              </Field>
              <label className="mt-6 flex items-center gap-2 text-sm text-text-muted">
                <input
                  type="checkbox"
                  checked={draft.subclass.required}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      subclass: {
                        ...draft.subclass!,
                        required: e.target.checked,
                      },
                    })
                  }
                />
                Obrigatória
              </label>
            </div>
            <Field label="Texto de ajuda">
              <Textarea
                rows={2}
                value={draft.subclass.description ?? ''}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    subclass: {
                      ...draft.subclass!,
                      description: e.target.value,
                    },
                  })
                }
              />
            </Field>
            {draft.subclass.options.map((option, index) => (
              <div
                key={option.id}
                className="space-y-2 rounded-xl border border-border bg-surface-2 p-3"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Nome">
                    <Input
                      value={option.name}
                      onChange={(e) => updateSubclassOption(index, {
                        ...option,
                        name: e.target.value,
                      })}
                    />
                  </Field>
                  <Field label="Nome original">
                    <Input
                      value={option.originalName}
                      onChange={(e) => updateSubclassOption(index, {
                        ...option,
                        originalName: e.target.value,
                      })}
                    />
                  </Field>
                </div>
                <Field label="Descrição">
                  <Textarea
                    rows={3}
                    value={option.description}
                    onChange={(e) => updateSubclassOption(index, {
                      ...option,
                      description: e.target.value,
                    })}
                  />
                </Field>
                <Field label="Resumo de regras">
                  <Textarea
                    rows={2}
                    value={option.rulesSummary}
                    onChange={(e) => updateSubclassOption(index, {
                      ...option,
                      rulesSummary: e.target.value,
                    })}
                  />
                </Field>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        subclass: {
                          ...draft.subclass!,
                          options: draft.subclass!.options.filter(
                            (_, i) => i !== index,
                          ),
                        },
                      })
                    }
                  >
                    Remover opção
                  </Button>
                </div>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() =>
                setDraft({
                  ...draft,
                  subclass: {
                    ...draft.subclass!,
                    options: [
                      ...draft.subclass!.options,
                      emptySubclassOption(),
                    ],
                  },
                })
              }
            >
              + Opção de especialização
            </Button>
          </div>
        )}
      </Panel>

      <Panel title="Lore" subtitle="Como a classe se comporta na mesa">
        <div className="space-y-3">
          <Field label="Resumo">
            <Textarea
              rows={3}
              value={draft.lore.summary}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, summary: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Em combate">
            <Textarea
              rows={2}
              value={draft.lore.duringCombat}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, duringCombat: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Em cenas sociais">
            <Textarea
              rows={2}
              value={draft.lore.duringSocial}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, duringSocial: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Explorando">
            <Textarea
              rows={2}
              value={draft.lore.whileExploring}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, whileExploring: e.target.value },
                })
              }
            />
          </Field>
          <Field label="No intervalo">
            <Textarea
              rows={2}
              value={draft.lore.inDowntime}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: { ...draft.lore, inDowntime: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Você talvez…" hint="Um por linha.">
            <Textarea
              rows={3}
              value={draft.lore.youMight.join('\n')}
              onChange={(e) =>
                setDraft({
                  ...draft,
                  lore: {
                    ...draft.lore,
                    youMight: e.target.value
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  },
                })
              }
            />
          </Field>
          <Field label="Outros provavelmente…" hint="Um por linha.">
            <Textarea
              rows={3}
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
        </div>
      </Panel>

      <Panel
        title="Feitos desta classe"
        subtitle="O pacote que o jogador escolhe nos níveis de feito de classe"
      >
        <FeatListEditor
          feats={feats}
          onChange={setFeats}
          levelHints={defaultClassFeatLevelsFor(featCadence)}
          onAdd={() =>
            setFeats([
              ...feats,
              emptyHomebrewFeat({
                category: 'class',
                classId: draft.id,
                trait: draft.name.trim() || 'Classe',
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
                  'Excluir esta classe e os feitos homebrew dela? Personagens que a usam ficarão sem classe até escolher outra.',
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir classe
          </Button>
        </div>
      )}
    </div>
  )

  function updateSubclassOption(index: number, option: ClassSubclassOption) {
    if (!draft.subclass) return
    const options = [...draft.subclass.options]
    options[index] = option
    setDraft({ ...draft, subclass: { ...draft.subclass, options } })
  }
}

function emptySubclassOption(): ClassSubclassOption {
  return {
    id: createId('option'),
    name: 'Nova especialização',
    originalName: 'Nova especialização',
    description: '',
    rulesSummary: '',
  }
}

function FeatureCard({
  feature,
  onChange,
  onRemove,
}: {
  feature: ClassFeature
  onChange: (next: ClassFeature) => void
  onRemove: () => void
}) {
  return (
    <details className="rounded-xl border border-border bg-surface-2" open>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-sm">
        <span className="flex items-center gap-2 font-medium text-text">
          {feature.name.trim() || 'Recurso sem nome'}
          <ActionCost type={feature.actionType} />
          <span className="text-[11px] font-normal text-text-dim">
            nv. {feature.level}
          </span>
        </span>
        <span className="text-[11px] text-text-dim">editar</span>
      </summary>
      <div className="space-y-2 border-t border-border p-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={feature.name}
              onChange={(e) => onChange({ ...feature, name: e.target.value })}
            />
          </Field>
          <Field label="Nível">
            <Select
              value={String(feature.level)}
              onChange={(e) =>
                onChange({ ...feature, level: Number(e.target.value) })
              }
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            label="Custo de ação"
            hint="O ícone aparece ao lado do nome, como nos recursos oficiais."
          >
            <ActionTypePicker
              value={feature.actionType ?? 'passive'}
              includePassive
              onChange={(type) =>
                onChange({
                  ...feature,
                  actionType: type ?? 'passive',
                })
              }
            />
          </Field>
          {(feature.actionType === 'reaction' ||
            feature.actionType === 'free') && (
            <Field label="Gatilho">
              <Input
                value={feature.trigger ?? ''}
                onChange={(e) =>
                  onChange({ ...feature, trigger: e.target.value || undefined })
                }
              />
            </Field>
          )}
        </div>
        <Field
          label="Descrição"
          hint="Clique num ícone para colocar no texto."
        >
          <ActionRichTextarea
            rows={4}
            value={feature.description}
            onChange={(e) =>
              onChange({ ...feature, description: e.target.value })
            }
          />
        </Field>
        <div className="flex justify-end">
          <Button size="sm" variant="danger" onClick={onRemove}>
            Remover recurso
          </Button>
        </div>
      </div>
    </details>
  )
}
