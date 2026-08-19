import { useState } from 'react'
import type {
  AttributeId,
  ContentSource,
  CreatureSize,
  Rarity,
  SkillId,
  SpellTradition,
} from '@/types'
import {
  ATTRIBUTE_IDS,
  RARITIES,
  SKILL_IDS,
} from '@/types'
import type {
  CompanionSpeeds,
  CompanionUnarmedAttack,
  EidolonAbility,
  HomebrewCompanionRecord,
  SpecificFamiliarGrantedAbility,
  SpecificFamiliarSpecialAbility,
} from '@/types/companion'
import {
  COMPANION_CATALOG_KIND_LABELS,
} from '@/types/companion'
import {
  ATTRIBUTE_LABELS,
  RARITY_LABELS,
  SIZE_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
} from '@/utils/labels'
import { FAMILIAR_ABILITY_DEFINITIONS } from '@/data/seeds/familiarAbilities'
import { Button } from '@/components/ui/Button'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { Field, Input, Select } from '@/components/ui/Field'
import { SenseLabelList } from '@/features/senses/components/SenseRulesCard'
import {
  ActionRichTextarea,
  ActionTypePicker,
} from '@/components/ui/ActionTypePicker'
import { Panel } from '@/components/ui/Panel'
import { createId } from '@/utils/id'
import { CompanionHomebrewGuide } from '@/features/companions/components/CompanionHomebrewGuide'
import {
  MANEUVER_ACTION_TYPES,
  YOUNG_DAMAGE_DICE,
  emptyCompanionAttack,
} from '@/features/companions/homebrewDefaults'

const SIZES = Object.keys(SIZE_LABELS) as CreatureSize[]
const TRADITIONS = Object.keys(TRADITION_LABELS) as SpellTradition[]

interface CompanionTypeEditorProps {
  initial: HomebrewCompanionRecord
  initialSource?: ContentSource | null
  onSave: (payload: {
    record: HomebrewCompanionRecord
    source: ContentSource
  }) => Promise<void>
  onCancel: () => void
  onDelete?: () => Promise<void>
}

function splitList(value: string): string[] {
  return value
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter(Boolean)
}

function asDie(value: string): CompanionUnarmedAttack['damageDie'] {
  return (YOUNG_DAMAGE_DICE.includes(
    value as (typeof YOUNG_DAMAGE_DICE)[number],
  )
    ? value
    : '1d8') as CompanionUnarmedAttack['damageDie']
}

export function CompanionTypeEditor({
  initial,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: CompanionTypeEditorProps) {
  const [draft, setDraft] = useState<HomebrewCompanionRecord>(
    structuredClone(initial),
  )
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const kind = draft.catalogKind
  const isNew =
    initial.name.startsWith('Novo ') || initial.name.startsWith('Nova ')

  function patch(partial: Partial<HomebrewCompanionRecord>) {
    setDraft({ ...draft, ...partial } as HomebrewCompanionRecord)
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome.')
      return
    }
    if (draft.catalogKind === 'animal') {
      if (draft.attacks.length < 1) {
        setError('O companheiro animal precisa de pelo menos um golpe.')
        return
      }
      if (draft.ancestryHitPoints < 4 || draft.ancestryHitPoints > 10) {
        setError('PV do tipo costuma ficar entre 4 e 10.')
        return
      }
    }
    if (draft.catalogKind === 'eidolon' && draft.sizeOptions.length === 0) {
      setError('Escolha ao menos um tamanho para o eidolon.')
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
      const record: HomebrewCompanionRecord = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        description: draft.description.trim(),
        source: source.name,
        provenance: { type: 'homebrew' },
        sourceId,
      }
      await onSave({ record, source })
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
            ? `Criar ${COMPANION_CATALOG_KIND_LABELS[kind].toLowerCase()} homebrew`
            : `Editar ${COMPANION_CATALOG_KIND_LABELS[kind].toLowerCase()} homebrew`}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`companheiro-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                companions: [
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

      <CompanionHomebrewGuide kind={kind} />

      <Panel title="Identidade" subtitle={COMPANION_CATALOG_KIND_LABELS[kind]}>
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
        <Field
          label="Descrição"
          hint="Clique num ícone se o texto citar custo de ação."
          className="mt-3"
        >
          <ActionRichTextarea
            rows={3}
            value={draft.description}
            onChange={(e) => patch({ description: e.target.value })}
          />
        </Field>
      </Panel>

      {draft.catalogKind === 'animal' && (
        <AnimalFields
          draft={draft}
          onChange={(next) => setDraft(next)}
        />
      )}
      {draft.catalogKind === 'eidolon' && (
        <EidolonFields
          draft={draft}
          onChange={(next) => setDraft(next)}
        />
      )}
      {draft.catalogKind === 'familiarForm' && (
        <FormFields draft={draft} onChange={(next) => setDraft(next)} />
      )}
      {draft.catalogKind === 'specificFamiliar' && (
        <SpecificFields
          draft={draft}
          onChange={(next) => setDraft(next)}
        />
      )}

      {onDelete && (
        <div className="flex justify-end">
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  'Excluir este tipo homebrew? Personagens que o usam ficam sem tipo até escolher outro.',
                )
              ) {
                void onDelete()
              }
            }}
          >
            Excluir
          </Button>
        </div>
      )}
    </div>
  )
}

type AnimalRecord = Extract<HomebrewCompanionRecord, { catalogKind: 'animal' }>
type EidolonRecord = Extract<HomebrewCompanionRecord, { catalogKind: 'eidolon' }>
type FormRecord = Extract<
  HomebrewCompanionRecord,
  { catalogKind: 'familiarForm' }
>
type SpecificRecord = Extract<
  HomebrewCompanionRecord,
  { catalogKind: 'specificFamiliar' }
>

function AnimalFields({
  draft,
  onChange,
}: {
  draft: AnimalRecord
  onChange: (next: AnimalRecord) => void
}) {
  return (
    <>
      <Panel title="Ficha jovem" subtitle="O motor avança o resto">
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Tamanho">
            <Select
              value={draft.size}
              onChange={(e) =>
                onChange({ ...draft, size: e.target.value as CreatureSize })
              }
            >
              {SIZES.map((s) => (
                <option key={s} value={s}>
                  {SIZE_LABELS[s]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="PV do tipo" hint="4–10">
            <Input
              type="number"
              min={4}
              max={10}
              value={draft.ancestryHitPoints}
              onChange={(e) =>
                onChange({
                  ...draft,
                  ancestryHitPoints: Number(e.target.value) || 6,
                })
              }
            />
          </Field>
          <Field label="Perícia extra">
            <Select
              value={draft.skill ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  skill: (e.target.value || null) as SkillId | null,
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
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {ATTRIBUTE_IDS.map((id) => (
            <Field key={id} label={ATTRIBUTE_LABELS[id]}>
              <Input
                type="number"
                min={-5}
                max={5}
                value={draft.attributes[id]}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    attributes: {
                      ...draft.attributes,
                      [id]: Number(e.target.value) || 0,
                    },
                  })
                }
              />
            </Field>
          ))}
        </div>
        <Field
          label="Traços"
          hint="Separados por vírgula. Ex.: animal, minion"
          className="mt-3"
        >
          <Input
            value={draft.traits.join(', ')}
            onChange={(e) =>
              onChange({ ...draft, traits: splitList(e.target.value) })
            }
          />
        </Field>
        <Field
          label="Sentidos"
          hint="Separados por vírgula"
          className="mt-3"
        >
          <Input
            value={draft.senses.join(', ')}
            onChange={(e) =>
              onChange({ ...draft, senses: splitList(e.target.value) })
            }
          />
        </Field>
        {draft.senses.length > 0 ? (
          <div className="mt-2">
            <SenseLabelList labels={draft.senses} />
          </div>
        ) : null}
        <SpeedFields
          speeds={draft.speeds}
          onChange={(speeds) => onChange({ ...draft, speeds })}
        />
        <div className="mt-3 flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={Boolean(draft.isMount)}
              onChange={(e) =>
                onChange({
                  ...draft,
                  isMount: e.target.checked || undefined,
                })
              }
            />
            Montaria
          </label>
          <Field label="Nível mínimo" hint="Vazio = 1º" className="w-32">
            <Input
              type="number"
              min={1}
              max={20}
              value={draft.minLevel ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  minLevel: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </Field>
        </div>
        <Field label="Especial" className="mt-3">
          <ActionRichTextarea
            rows={2}
            value={draft.special ?? ''}
            onChange={(e) =>
              onChange({ ...draft, special: e.target.value || undefined })
            }
          />
        </Field>
      </Panel>

      <Panel title="Golpes jovens">
        <div className="space-y-3">
          {draft.attacks.map((atk, index) => (
            <AttackFields
              key={atk.id}
              attack={atk}
              onChange={(next) => {
                const attacks = [...draft.attacks]
                attacks[index] = next
                onChange({ ...draft, attacks })
              }}
              onRemove={() =>
                onChange({
                  ...draft,
                  attacks: draft.attacks.filter((a) => a.id !== atk.id),
                })
              }
            />
          ))}
          <Button
            size="sm"
            onClick={() =>
              onChange({
                ...draft,
                attacks: [...draft.attacks, emptyCompanionAttack('atk')],
              })
            }
          >
            + Golpe
          </Button>
        </div>
      </Panel>

      <Panel title="Suporte e manobra">
        <Field label="Benefício de suporte">
          <ActionRichTextarea
            rows={3}
            value={draft.supportBenefit}
            onChange={(e) =>
              onChange({ ...draft, supportBenefit: e.target.value })
            }
          />
        </Field>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Manobra avançada">
            <Input
              value={draft.advancedManeuver.name}
              onChange={(e) =>
                onChange({
                  ...draft,
                  advancedManeuver: {
                    ...draft.advancedManeuver,
                    name: e.target.value,
                  },
                })
              }
            />
          </Field>
          <Field label="Nome original (EN)">
            <Input
              value={draft.advancedManeuver.originalName}
              onChange={(e) =>
                onChange({
                  ...draft,
                  advancedManeuver: {
                    ...draft.advancedManeuver,
                    originalName: e.target.value,
                  },
                })
              }
            />
          </Field>
          <Field label="Ações">
            <ActionTypePicker
              value={draft.advancedManeuver.actionType}
              includePassive={false}
              onChange={(type) =>
                onChange({
                  ...draft,
                  advancedManeuver: {
                    ...draft.advancedManeuver,
                    actionType: (type ??
                      'two') as (typeof MANEUVER_ACTION_TYPES)[number],
                  },
                })
              }
            />
          </Field>
          <Field label="Requisitos">
            <Input
              value={draft.advancedManeuver.requirements ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  advancedManeuver: {
                    ...draft.advancedManeuver,
                    requirements: e.target.value || undefined,
                  },
                })
              }
            />
          </Field>
        </div>
        <Field
          label="Texto da manobra"
          hint="Clique num ícone para colocar no texto."
          className="mt-3"
        >
          <ActionRichTextarea
            rows={3}
            value={draft.advancedManeuver.description}
            onChange={(e) =>
              onChange({
                ...draft,
                advancedManeuver: {
                  ...draft.advancedManeuver,
                  description: e.target.value,
                },
              })
            }
          />
        </Field>
      </Panel>
    </>
  )
}

function AttackFields({
  attack,
  onChange,
  onRemove,
}: {
  attack: CompanionUnarmedAttack
  onChange: (next: CompanionUnarmedAttack) => void
  onRemove: () => void
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-2/40 p-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome">
          <Input
            value={attack.name}
            onChange={(e) => onChange({ ...attack, name: e.target.value })}
          />
        </Field>
        <Field label="Nome original (EN)">
          <Input
            value={attack.originalName}
            onChange={(e) =>
              onChange({ ...attack, originalName: e.target.value })
            }
          />
        </Field>
        <Field label="Dado">
          <Select
            value={attack.damageDie}
            onChange={(e) =>
              onChange({ ...attack, damageDie: asDie(e.target.value) })
            }
          >
            {YOUNG_DAMAGE_DICE.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tipo de dano">
          <Input
            value={attack.damageType}
            onChange={(e) =>
              onChange({ ...attack, damageType: e.target.value })
            }
          />
        </Field>
        <Field label="Traços" hint="vírgula: ágil, finesse, alcance">
          <Input
            value={attack.traits.join(', ')}
            onChange={(e) =>
              onChange({ ...attack, traits: splitList(e.target.value) })
            }
          />
        </Field>
        <label className="mt-6 flex items-center gap-2 text-sm text-text-muted">
          <input
            type="checkbox"
            checked={Boolean(attack.finesse)}
            onChange={(e) =>
              onChange({ ...attack, finesse: e.target.checked || undefined })
            }
          />
          Finesse (usa DES se maior)
        </label>
      </div>
      <div className="mt-2 flex justify-end">
        <Button size="sm" variant="danger" onClick={onRemove}>
          Remover golpe
        </Button>
      </div>
    </div>
  )
}

function SpeedFields({
  speeds,
  onChange,
}: {
  speeds: CompanionSpeeds
  onChange: (next: CompanionSpeeds) => void
}) {
  const fields: Array<{ key: keyof CompanionSpeeds; label: string }> = [
    { key: 'land', label: 'Terrestre (pés)' },
    { key: 'climb', label: 'Escalada' },
    { key: 'fly', label: 'Voo' },
    { key: 'swim', label: 'Natação' },
    { key: 'burrow', label: 'Escavação' },
  ]
  return (
    <div className="mt-3 grid gap-3 sm:grid-cols-3">
      {fields.map(({ key, label }) => (
        <Field key={key} label={label}>
          <Input
            type="number"
            min={0}
            value={speeds[key] ?? ''}
            onChange={(e) => {
              const n = e.target.value ? Number(e.target.value) : undefined
              onChange({ ...speeds, [key]: n })
            }}
          />
        </Field>
      ))}
    </div>
  )
}

function EidolonFields({
  draft,
  onChange,
}: {
  draft: EidolonRecord
  onChange: (next: EidolonRecord) => void
}) {
  const attrs = draft.attributes ?? {
    constitution: 2,
    intelligence: -1,
    wisdom: 1,
    charisma: 0,
  }
  const eidolonAttrs: Array<
    keyof NonNullable<EidolonRecord['attributes']>
  > = ['constitution', 'intelligence', 'wisdom', 'charisma']

  function toggleSize(size: CreatureSize) {
    const has = draft.sizeOptions.includes(size)
    onChange({
      ...draft,
      sizeOptions: has
        ? draft.sizeOptions.filter((s) => s !== size)
        : [...draft.sizeOptions, size],
    })
  }

  function toggleSkill(skill: SkillId) {
    const has = draft.skills.includes(skill)
    onChange({
      ...draft,
      skills: has
        ? draft.skills.filter((s) => s !== skill)
        : [...draft.skills, skill],
    })
  }

  return (
    <>
      <Panel title="Tipo de eidolon">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Tradição" hint="Vazio = escolhida na ficha (Dragão)">
            <Select
              value={draft.tradition ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  tradition: (e.target.value || undefined) as
                    | SpellTradition
                    | undefined,
                })
              }
            >
              <option value="">Escolha na ficha</option>
              {TRADITIONS.map((t) => (
                <option key={t} value={t}>
                  {TRADITION_LABELS[t]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Plano natal">
            <Input
              value={draft.homePlane}
              onChange={(e) => onChange({ ...draft, homePlane: e.target.value })}
            />
          </Field>
          <Field label="Idioma">
            <Input
              value={draft.language}
              onChange={(e) => onChange({ ...draft, language: e.target.value })}
            />
          </Field>
          <Field label="Golpes sugeridos">
            <Input
              value={draft.suggestedAttacks}
              onChange={(e) =>
                onChange({ ...draft, suggestedAttacks: e.target.value })
              }
            />
          </Field>
        </div>
        <Field label="Traços" className="mt-3">
          <Input
            value={draft.traits.join(', ')}
            onChange={(e) =>
              onChange({ ...draft, traits: splitList(e.target.value) })
            }
          />
        </Field>
        <Field label="Sentidos" className="mt-3">
          <Input
            value={draft.senses.join(', ')}
            onChange={(e) =>
              onChange({ ...draft, senses: splitList(e.target.value) })
            }
          />
        </Field>
        {draft.senses.length > 0 ? (
          <div className="mt-2">
            <SenseLabelList labels={draft.senses} />
          </div>
        ) : null}
        <div className="mt-3">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
            Tamanhos
          </p>
          <div className="flex flex-wrap gap-3">
            {SIZES.map((s) => (
              <label
                key={s}
                className="flex items-center gap-2 text-sm text-text-muted"
              >
                <input
                  type="checkbox"
                  checked={draft.sizeOptions.includes(s)}
                  onChange={() => toggleSize(s)}
                />
                {SIZE_LABELS[s]}
              </label>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
            Perícias (em geral duas)
          </p>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {SKILL_IDS.map((id) => (
              <label
                key={id}
                className="flex items-center gap-2 text-xs text-text-muted"
              >
                <input
                  type="checkbox"
                  checked={draft.skills.includes(id)}
                  onChange={() => toggleSkill(id)}
                />
                {SKILL_LABELS[id]}
              </label>
            ))}
          </div>
        </div>
        <SpeedFields
          speeds={draft.speeds}
          onChange={(speeds) => onChange({ ...draft, speeds })}
        />
        {!draft.namedArrays && (
          <div className="mt-3 grid gap-3 sm:grid-cols-4">
            {eidolonAttrs.map((id) => (
              <Field key={id} label={ATTRIBUTE_LABELS[id as AttributeId]}>
                <Input
                  type="number"
                  min={-5}
                  max={5}
                  value={attrs[id]}
                  onChange={(e) =>
                    onChange({
                      ...draft,
                      attributes: {
                        ...attrs,
                        [id]: Number(e.target.value) || 0,
                      },
                    })
                  }
                />
              </Field>
            ))}
          </div>
        )}
        {draft.namedArrays && (
          <p className="mt-3 text-xs text-text-dim">
            Este eidolon usa arranjos nomeados (copiado de um oficial). Os
            números dos arranjos ficam iguais à cópia; edite o lore e os
            poderes.
          </p>
        )}
      </Panel>
      <Panel title="Poder inicial">
        <AbilityFields
          ability={draft.initialAbility}
          onChange={(initialAbility) => onChange({ ...draft, initialAbility })}
        />
      </Panel>
      <Panel title="Simbiose (7º)">
        <AbilityFields
          ability={draft.symbiosisAbility}
          onChange={(symbiosisAbility) =>
            onChange({ ...draft, symbiosisAbility })
          }
        />
      </Panel>
      <Panel title="Transcendência (17º)">
        <AbilityFields
          ability={draft.transcendenceAbility}
          onChange={(transcendenceAbility) =>
            onChange({ ...draft, transcendenceAbility })
          }
        />
      </Panel>
    </>
  )
}

function AbilityFields({
  ability,
  onChange,
}: {
  ability: EidolonAbility
  onChange: (next: EidolonAbility) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field label="Nome">
        <Input
          value={ability.name}
          onChange={(e) => onChange({ ...ability, name: e.target.value })}
        />
      </Field>
      <Field label="Nome original (EN)">
        <Input
          value={ability.originalName}
          onChange={(e) =>
            onChange({ ...ability, originalName: e.target.value })
          }
        />
      </Field>
      <Field label="Ações">
        <ActionTypePicker
          value={ability.actionType}
          includePassive={false}
          includeEmpty
          emptyLabel="Passiva"
          onChange={(type) =>
            onChange({
              ...ability,
              actionType: type as EidolonAbility['actionType'] | undefined,
            })
          }
        />
      </Field>
      <Field label="Descrição" className="sm:col-span-2">
        <ActionRichTextarea
          rows={3}
          value={ability.description}
          onChange={(e) =>
            onChange({ ...ability, description: e.target.value })
          }
        />
      </Field>
    </div>
  )
}

function FormFields({
  draft,
  onChange,
}: {
  draft: FormRecord
  onChange: (next: FormRecord) => void
}) {
  const abilities = [...FAMILIAR_ABILITY_DEFINITIONS].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  )

  function toggleInnate(id: string) {
    const has = draft.innateAbilityIds.includes(id)
    onChange({
      ...draft,
      innateAbilityIds: has
        ? draft.innateAbilityIds.filter((x) => x !== id)
        : [...draft.innateAbilityIds, id],
    })
  }

  return (
    <Panel title="Forma Tiny" subtitle="Só inatas — stats são as do familiar">
      <Field label="Traços">
        <Input
          value={(draft.traits ?? []).join(', ')}
          onChange={(e) =>
            onChange({ ...draft, traits: splitList(e.target.value) })
          }
        />
      </Field>
      <div className="mt-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
          Habilidades inatas ({draft.innateAbilityIds.length})
        </p>
        <div className="max-h-64 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
          {abilities.map((a) => (
            <label
              key={a.id}
              className="flex items-center gap-2 text-sm text-text-muted"
            >
              <input
                type="checkbox"
                checked={draft.innateAbilityIds.includes(a.id)}
                onChange={() => toggleInnate(a.id)}
              />
              <span>
                {a.name}
                <span className="ml-1 text-[11px] text-text-dim">
                  {a.originalName}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function SpecificFields({
  draft,
  onChange,
}: {
  draft: SpecificRecord
  onChange: (next: SpecificRecord) => void
}) {
  const abilities = [...FAMILIAR_ABILITY_DEFINITIONS].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  )

  function updateGranted(
    index: number,
    next: SpecificFamiliarGrantedAbility,
  ) {
    const grantedAbilities = [...draft.grantedAbilities]
    grantedAbilities[index] = next
    onChange({ ...draft, grantedAbilities })
  }

  function updateSpecial(
    index: number,
    next: SpecificFamiliarSpecialAbility,
  ) {
    const specialAbilities = [...draft.specialAbilities]
    specialAbilities[index] = next
    onChange({ ...draft, specialAbilities })
  }

  return (
    <>
      <Panel title="Pacote">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Raridade">
            <Select
              value={draft.rarity ?? 'common'}
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
          <Field label="Habilidades exigidas" hint="Em geral 4 ou 6">
            <Input
              type="number"
              min={2}
              max={8}
              value={draft.requiredAbilities}
              onChange={(e) =>
                onChange({
                  ...draft,
                  requiredAbilities: Number(e.target.value) || 4,
                })
              }
            />
          </Field>
        </div>
        <Field label="Traços" className="mt-3">
          <Input
            value={draft.traits.join(', ')}
            onChange={(e) =>
              onChange({ ...draft, traits: splitList(e.target.value) })
            }
          />
        </Field>
        <Field label="Acesso" className="mt-3">
          <Input
            value={draft.accessHint ?? ''}
            onChange={(e) =>
              onChange({ ...draft, accessHint: e.target.value || undefined })
            }
          />
        </Field>
      </Panel>

      <Panel title="Habilidades concedidas">
        <div className="space-y-3">
          {draft.grantedAbilities.map((g, index) => (
            <div
              key={`${g.abilityId ?? g.label}-${index}`}
              className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-2"
            >
              <Field label="Do catálogo">
                <Select
                  value={g.abilityId ?? ''}
                  onChange={(e) => {
                    const id = e.target.value || undefined
                    const found = abilities.find((a) => a.id === id)
                    updateGranted(index, {
                      ...g,
                      abilityId: id,
                      label: found?.name ?? g.label,
                    })
                  }}
                >
                  <option value="">Texto livre</option>
                  {abilities.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Rótulo">
                <Input
                  value={g.label}
                  onChange={(e) =>
                    updateGranted(index, { ...g, label: e.target.value })
                  }
                />
              </Field>
              <Field label="Nota" className="sm:col-span-2">
                <Input
                  value={g.note ?? ''}
                  onChange={(e) =>
                    updateGranted(index, {
                      ...g,
                      note: e.target.value || undefined,
                    })
                  }
                />
              </Field>
              <div className="sm:col-span-2 flex justify-end">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onChange({
                      ...draft,
                      grantedAbilities: draft.grantedAbilities.filter(
                        (_, i) => i !== index,
                      ),
                    })
                  }
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
          <Button
            size="sm"
            onClick={() =>
              onChange({
                ...draft,
                grantedAbilities: [
                  ...draft.grantedAbilities,
                  { label: 'Habilidade' },
                ],
              })
            }
          >
            + Concedida
          </Button>
        </div>
      </Panel>

      <Panel title="Poderes especiais">
        <div className="space-y-3">
          {draft.specialAbilities.map((s, index) => (
            <div
              key={`${s.originalName}-${index}`}
              className="space-y-3 rounded-lg border border-border p-3"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Nome">
                  <Input
                    value={s.name}
                    onChange={(e) =>
                      updateSpecial(index, { ...s, name: e.target.value })
                    }
                  />
                </Field>
                <Field label="Nome original (EN)">
                  <Input
                    value={s.originalName}
                    onChange={(e) =>
                      updateSpecial(index, {
                        ...s,
                        originalName: e.target.value,
                      })
                    }
                  />
                </Field>
                <Field label="Ações">
                  <ActionTypePicker
                    value={s.actionType}
                    includePassive={false}
                    includeEmpty
                    emptyLabel="Passiva"
                    onChange={(type) =>
                      updateSpecial(index, {
                        ...s,
                        actionType: type as
                          | SpecificFamiliarSpecialAbility['actionType']
                          | undefined,
                      })
                    }
                  />
                </Field>
              </div>
              <Field label="Descrição">
                <ActionRichTextarea
                  rows={3}
                  value={s.description}
                  onChange={(e) =>
                    updateSpecial(index, { ...s, description: e.target.value })
                  }
                />
              </Field>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() =>
                    onChange({
                      ...draft,
                      specialAbilities: draft.specialAbilities.filter(
                        (_, i) => i !== index,
                      ),
                    })
                  }
                >
                  Remover poder
                </Button>
              </div>
            </div>
          ))}
          <Button
            size="sm"
            onClick={() =>
              onChange({
                ...draft,
                specialAbilities: [
                  ...draft.specialAbilities,
                  {
                    name: 'Poder',
                    originalName: 'Ability',
                    description: '',
                  },
                ],
              })
            }
          >
            + Poder especial
          </Button>
        </div>
      </Panel>
    </>
  )
}
