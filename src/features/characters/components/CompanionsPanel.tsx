import { useMemo, useState } from 'react'
import type { AttributeId, ResolvedCharacterSheet, SkillId } from '@/types'
import type {
  AnimalCompanionSpecialization,
  AnimalCompanionStage,
  CharacterCompanions,
  ConstructCompanionStage,
  ConstructCompanionState,
  EidolonKeyAttribute,
  EidolonPrimaryAttackId,
  EidolonState,
  FamiliarAbilitySelection,
  FamiliarOrPetState,
  ConstructModificationDefinition,
} from '@/types/companion'
import {
  ANIMAL_COMPANION_STAGE_LABELS,
  ANIMAL_SPECIALIZATION_LABELS,
  COMPANION_KIND_LABELS,
  CONSTRUCT_COMPANION_STAGE_LABELS,
  FAMILIAR_ABILITY_KIND_LABELS,
} from '@/types/companion'
import {
  canAddAnimalCompanion,
  canAddConstructCompanion,
  canAddEidolon,
  canAddFamiliarOrPet,
  createEmptyAnimalCompanion,
  createEmptyConstructCompanion,
  createEmptyEidolon,
  createEmptyFamiliar,
  createEmptyPet,
  emptyCompanions,
  getFamiliarAbilitySlots,
  listAnimalCompanionTypes,
  listConstructModifications,
  listEidolonTypes,
  listFamiliarAbilityDefinitions,
  listFamiliarForms,
  applyFamiliarForm,
  applySpecificFamiliar,
  getFamiliarForm,
  listSpecificFamiliars,
  getSpecificFamiliar,
  nextAnimalCompanionStages,
  nextConstructCompanionStages,
  resolveCompanions,
} from '@/engine/companions'
import { EIDOLON_PRIMARY_ATTACKS } from '@/engine/eidolon'
import { eidolonTypeIdFromSubclass } from '@/data/seeds/eidolons'
import { CONSTRUCT_MIRACLE_GEARS_SKILLS } from '@/engine/constructCompanion'
import {
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
  SKILL_LABELS,
  SIZE_LABELS,
  TRADITION_LABELS,
  formatModifier,
  formatSpeedMeters,
} from '@/utils/labels'
import { ATTRIBUTE_IDS } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { ActionCost } from '@/components/ui/ActionIcon'
import { DiceButton } from '@/components/dice/DiceButton'
import { Link } from 'react-router-dom'
import { TraitTipList } from '@/components/ui/TraitTip'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import {
  ANIMAL_COMPANION_STAGE_RULES,
  ANIMAL_SPECIALIZATION_RULES,
  CONSTRUCT_COMPANION_STAGE_RULES,
} from '@/data/seeds/companionAdvancement'
import {
  CompanionRulesCard,
  SpecificGrantedAbilityCards,
  SpecificSpecialAbilityCards,
} from '@/features/companions/components/CompanionRulesCard'
import { ImmunityLabelList } from '@/features/defenses/components/DefensesPanel'
import { SenseLabelList } from '@/features/senses/components/SenseRulesCard'

interface CompanionsPanelProps {
  sheet: ResolvedCharacterSheet
  companions: CharacterCompanions | null | undefined
  onChange: (companions: CharacterCompanions) => void
}

function ensureState(
  companions: CharacterCompanions | null | undefined,
): CharacterCompanions {
  return companions ?? emptyCompanions()
}

export function CompanionsPanel({
  sheet,
  companions,
  onChange,
}: CompanionsPanelProps) {
  const state = ensureState(companions)
  const resolved = useMemo(
    () => resolveCompanions(state, sheet),
    [state, sheet],
  )

  function patch(next: CharacterCompanions) {
    onChange(next)
  }

  return (
    <div className="animate-fade-up space-y-3">
      <div>
        <h2 className="font-display text-lg font-semibold tracking-wide text-text">
          Familiares / Companheiros
        </h2>
        <p className="mt-0.5 text-sm text-text-dim">
          Companheiro animal ou construto, mais familiar ou pet.{' '}
          <Link
            to="/compendio/companheiros"
            className="text-accent hover:underline"
          >
            Abrir no compêndio
          </Link>
        </p>
      </div>

      <div className="rounded-xl border border-border/80 bg-surface-1 px-3 py-2 text-xs text-text-muted">
        {resolved.coexistenceNote}
      </div>

      {resolved.issues.length > 0 && (
        <Panel quiet compact title="Avisos de regras">
          <ul className="space-y-1 text-xs text-accent">
            {resolved.issues.map((issue, i) => (
              <li key={`${issue.field}-${i}`}>• {issue.message}</li>
            ))}
          </ul>
        </Panel>
      )}

      <div className="flex flex-wrap gap-2">
        {canAddAnimalCompanion(state) && (
          <Button
            size="sm"
            variant="accent"
            onClick={() =>
              patch({
                ...state,
                animalCompanion: createEmptyAnimalCompanion(),
              })
            }
          >
            + Companheiro animal
          </Button>
        )}
        {canAddConstructCompanion(state) && (
          <Button
            size="sm"
            variant="accent"
            onClick={() =>
              patch({
                ...state,
                constructCompanion: createEmptyConstructCompanion(),
              })
            }
          >
            + Companheiro construto
          </Button>
        )}
        {canAddEidolon(state) && (
          <Button
            size="sm"
            variant="accent"
            onClick={() => {
              const typeId = eidolonTypeIdFromSubclass(
                sheet.character.classChoices?.subclassId,
              )
              const t = listEidolonTypes().find((x) => x.id === typeId)
              patch({
                ...state,
                eidolon: createEmptyEidolon({
                  typeId,
                  typeLabel: t?.name ?? '',
                  size: t?.sizeOptions[0] ?? 'medium',
                }),
              })
            }}
          >
            + Eidolon
          </Button>
        )}
        {canAddFamiliarOrPet(state) && (
          <>
            <Button
              size="sm"
              variant="accent"
              onClick={() =>
                patch({
                  ...state,
                  familiarOrPet: createEmptyFamiliar(),
                })
              }
            >
              + Familiar
            </Button>
            <Button
              size="sm"
              onClick={() =>
                patch({
                  ...state,
                  familiarOrPet: createEmptyPet(),
                })
              }
            >
              + {COMPANION_KIND_LABELS.pet}
            </Button>
          </>
        )}
      </div>

      {!state.animalCompanion &&
        !state.familiarOrPet &&
        !state.constructCompanion &&
        !state.eidolon && (
        <Panel quiet compact>
          <p className="text-sm text-text-dim">
            Nenhum companheiro ainda. Adicione um{' '}
            <strong className="text-text">companheiro animal</strong>, um{' '}
            <strong className="text-text">construto</strong> (Inventor), um{' '}
            <strong className="text-text">eidolon</strong> (Invocador) e/ou um{' '}
            <strong className="text-text">familiar</strong> (ou pet). Animal e
            construto não combinam.
          </p>
        </Panel>
      )}

      {state.familiarOrPet && (
        <FamiliarOrPetEditor
          value={state.familiarOrPet}
          resolved={resolved.familiarOrPet}
          featSlotBonus={sheet.familiarAbilitySlotBonus ?? 0}
          onChange={(familiarOrPet) => patch({ ...state, familiarOrPet })}
          onRemove={() => patch({ ...state, familiarOrPet: null })}
        />
      )}

      {state.animalCompanion && (
        <AnimalCompanionEditor
          value={state.animalCompanion}
          resolved={resolved.animalCompanion}
          onChange={(animalCompanion) => patch({ ...state, animalCompanion })}
          onRemove={() => patch({ ...state, animalCompanion: null })}
        />
      )}

      {state.constructCompanion && (
        <ConstructCompanionEditor
          value={state.constructCompanion}
          resolved={resolved.constructCompanion}
          onChange={(constructCompanion) =>
            patch({ ...state, constructCompanion })
          }
          onRemove={() => patch({ ...state, constructCompanion: null })}
        />
      )}

      {state.eidolon && (
        <EidolonEditor
          value={state.eidolon}
          resolved={resolved.eidolon}
          onChange={(eidolon) => patch({ ...state, eidolon })}
          onRemove={() => patch({ ...state, eidolon: null })}
        />
      )}

      <Panel quiet compact title="Na mesa (lembrete)">
        <ul className="space-y-1.5 text-xs text-text-muted">
          <li className="flex flex-wrap items-center gap-1.5">
            <ActionCost type="one" />
            <span>
              <strong className="text-text">Comandar Animal / familiar:</strong>{' '}
              o lacaio ganha 2 ações no seu turno (sem teste de Natureza no
              companheiro animal).
            </span>
          </li>
          <li className="flex flex-wrap items-center gap-1.5">
            <ActionCost type="two" />
            <span>
              <strong className="text-text">Inovação construto:</strong> Comandar
              dá 3 ações ao construto.
            </span>
          </li>
          <li className="flex flex-wrap items-center gap-1.5">
            <ActionCost type="one" />
            <span>
              <strong className="text-text">Apoiar:</strong> benefício
              do tipo do companheiro; só ações de movimento básicas no resto do
              turno.
            </span>
          </li>
          <li>
            Familiar: CA e salvaguardas iguais às suas (antes de bônus de
            circunstância/status). Percepção / Acrobacia / Furtividade usam o
            melhor entre 3+nível e atributo de conjuração+nível.
          </li>
          <li>
            Substituir familiar/companheiro morto: 1 semana de downtime, sem
            custo.
          </li>
        </ul>
      </Panel>

      <Tip>
        Fontes:{' '}
        <a
          className="text-accent hover:underline"
          href="https://2e.aonprd.com/Rules.aspx?ID=2112"
          target="_blank"
          rel="noreferrer"
        >
          Companheiros (AoN)
        </a>
        {' · '}
        <a
          className="text-accent hover:underline"
          href="https://2e.aonprd.com/Familiars.aspx"
          target="_blank"
          rel="noreferrer"
        >
          Familiares
        </a>
        {' · '}
        <a
          className="text-accent hover:underline"
          href="https://2e.aonprd.com/Rules.aspx?ID=1600"
          target="_blank"
          rel="noreferrer"
        >
          Companheiros construto
        </a>
        . Slots extras de familiar (tese rara etc.) só se o feito ainda não
        entrar sozinho.
      </Tip>
    </div>
  )
}

function FamiliarOrPetEditor({
  value,
  resolved,
  featSlotBonus = 0,
  onChange,
  onRemove,
}: {
  value: FamiliarOrPetState
  resolved: ReturnType<typeof resolveCompanions>['familiarOrPet']
  featSlotBonus?: number
  onChange: (next: FamiliarOrPetState) => void
  onRemove: () => void
}) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const slots = (resolved?.abilitySlots ?? getFamiliarAbilitySlots(value))
  const forms = useMemo(() => listFamiliarForms(), [])
  const specifics = useMemo(() => listSpecificFamiliars(), [])
  const selectedForm = getFamiliarForm(value.typeId)
  const selectedSpecific = getSpecificFamiliar(value.typeId)
  const defs = useMemo(
    () =>
      listFamiliarAbilityDefinitions({
        forPet: value.kind === 'pet',
        includeMaster: value.kind === 'familiar',
      }),
    [value.kind],
  )

  const maxHp = resolved?.maxHp ?? null
  const currentHp =
    maxHp == null
      ? null
      : value.currentHp == null
        ? maxHp
        : Math.min(maxHp, Math.max(0, value.currentHp))

  function setHp(next: number) {
    if (maxHp == null) return
    onChange({ ...value, currentHp: Math.min(maxHp, Math.max(0, next)) })
  }

  function addAbility(abilityId: string) {
    const def = defs.find((d) => d.id === abilityId)
    if (!def) return
    if (
      !def.repeatable &&
      value.selectedAbilities.some((s) => s.abilityId === abilityId)
    ) {
      return
    }
    if (value.selectedAbilities.length >= slots) return
    onChange({
      ...value,
      selectedAbilities: [...value.selectedAbilities, { abilityId }],
    })
  }

  function updateAbility(
    index: number,
    patch: Partial<FamiliarAbilitySelection>,
  ) {
    onChange({
      ...value,
      selectedAbilities: value.selectedAbilities.map((s, i) =>
        i === index ? { ...s, ...patch } : s,
      ),
    })
  }

  function removeAbility(index: number) {
    if (value.selectedAbilities[index]?.innate) return
    onChange({
      ...value,
      selectedAbilities: value.selectedAbilities.filter((_, i) => i !== index),
    })
  }

  function selectForm(formId: string) {
    onChange(applyFamiliarForm(value, formId || null))
  }

  function selectSpecific(specificId: string) {
    onChange(applySpecificFamiliar(value, specificId || null))
  }

  const pct =
    maxHp != null && currentHp != null
      ? Math.round((currentHp / Math.max(1, maxHp)) * 100)
      : 0

  return (
    <Panel
      quiet
      compact
      title={COMPANION_KIND_LABELS[value.kind]}
      subtitle={
        value.kind === 'familiar'
          ? 'habilidades nas preparações diárias'
          : 'duas habilidades fixas do feito Mascote'
      }
      actions={
        <Button size="sm" variant="ghost" onClick={onRemove}>
          Remover
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              placeholder="Ex.: Sombra"
            />
          </Field>
          <Field label="Forma / espécie">
            <Select
              value={selectedSpecific ? '' : (value.typeId ?? '')}
              onChange={(e) => selectForm(e.target.value)}
            >
              <option value="">Escolher forma…</option>
              {forms.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                  {f.innateAbilityIds.length
                    ? ` · ${f.innateAbilityIds.length} inata${f.innateAbilityIds.length > 1 ? 's' : ''}`
                    : ''}
                  {` · ${f.originalName}`}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {value.kind === 'familiar' ? (
          <Field label="Familiar específico (opcional)">
            <Select
              value={selectedSpecific?.id ?? ''}
              onChange={(e) => selectSpecific(e.target.value)}
            >
              <option value="">Nenhum — forma comum</option>
              {specifics.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} · {s.requiredAbilities} habilidades · {s.originalName}
                </option>
              ))}
            </Select>
          </Field>
        ) : null}

        {(value.typeId === 'form-custom' ||
          (!value.typeId && (value.formLabel ?? '') !== '')) && (
          <Field label="Descrever forma">
            <Input
              value={value.formLabel ?? ''}
              onChange={(e) =>
                onChange({ ...value, formLabel: e.target.value })
              }
              placeholder="Ex.: corvo branco, gato de três olhos…"
            />
          </Field>
        )}

        {selectedSpecific ? (
          <div className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-text">{selectedSpecific.name}</span>
              <Badge className="!text-[9px]">{selectedSpecific.source}</Badge>
              {selectedSpecific.rarity ? (
                <Badge className="!text-[9px]">{selectedSpecific.rarity}</Badge>
              ) : null}
            </div>
            <RichText as="p" className="mt-1 text-text-muted">
              {selectedSpecific.description}
            </RichText>
            <p className="mt-1 text-text-dim">
              Exige {selectedSpecific.requiredAbilities} habilidades (as
              concedidas entram como inatas).
            </p>
            <div className="mt-2 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                Habilidades concedidas
              </p>
              <SpecificGrantedAbilityCards
                granted={selectedSpecific.grantedAbilities}
              />
              {selectedSpecific.specialAbilities.length > 0 ? (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                    Poderes do tipo
                  </p>
                  <SpecificSpecialAbilityCards
                    abilities={selectedSpecific.specialAbilities}
                  />
                </>
              ) : null}
            </div>
          </div>
        ) : selectedForm && selectedForm.id !== 'form-custom' ? (
          <div className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-text">{selectedForm.name}</span>
              <Badge className="!text-[9px]">{selectedForm.source}</Badge>
            </div>
            <RichText as="p" className="mt-1 text-text-muted">
              {selectedForm.description}
            </RichText>
            <p className="mt-1 text-text-dim">
              Habilidades inatas entram nos slots e não trocam nas preparações.
              {value.kind === 'pet'
                ? ' No mascote, só entram as do feito Pet (Fala e Planta ficam de fora).'
                : ''}
            </p>
          </div>
        ) : !value.typeId ? (
          <div className="rounded-lg border border-dashed border-border/80 px-3 py-2 text-xs text-text-dim">
            Escolha uma forma Tiny do catálogo (corvo, gato, coruja…). Stats
            são sempre as de familiar; a forma só trava as habilidades inatas.
          </div>
        ) : null}

        <div className="grid gap-2 sm:grid-cols-3">
          <div className="rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-2">
            <div className="text-[9px] font-semibold uppercase text-text-dim">
              PV
            </div>
            {maxHp == null || currentHp == null ? (
              <div className="text-sm text-text-dim">—</div>
            ) : (
              <>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-xl font-semibold tabular-nums">
                    {currentHp}
                  </span>
                  <span className="text-xs text-text-dim">/{maxHp}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3">
                  <div
                    className="h-full rounded-full bg-success"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-1 flex gap-0.5">
                  <button
                    type="button"
                    className="h-6 w-6 rounded border border-border text-xs"
                    onClick={() => setHp(currentHp - 1)}
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="h-6 w-6 rounded border border-border text-xs"
                    onClick={() => setHp(currentHp + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="h-6 rounded border border-border px-1.5 text-[10px]"
                    onClick={() => setHp(maxHp)}
                  >
                    Full
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-2">
            <div className="text-[9px] font-semibold uppercase text-text-dim">
              CA (espelho)
            </div>
            <div className="font-display text-xl font-semibold tabular-nums">
              {resolved?.ac ?? '—'}
            </div>
            <div className="text-[10px] text-text-dim">
              Antes de circ./status seus
            </div>
          </div>
          <div className="rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-2">
            <div className="text-[9px] font-semibold uppercase text-text-dim">
              Perc / Acr / Fur
            </div>
            <div className="font-display text-xl font-semibold tabular-nums">
              {resolved?.skillModifier != null
                ? formatModifier(resolved.skillModifier)
                : '—'}
            </div>
            <div className="text-[10px] text-text-dim">Provisório</div>
          </div>
        </div>

        {value.kind === 'familiar' && (
          <div className="grid gap-2 sm:grid-cols-2">
            <Field
              label="Atributo de conjuração"
              hint="Para Percepção / Acrobacia / Furtividade do familiar"
            >
              <Select
                value={value.spellcastingAttributeId ?? ''}
                onChange={(e) =>
                  onChange({
                    ...value,
                    spellcastingAttributeId: (e.target.value ||
                      null) as AttributeId | null,
                  })
                }
              >
                <option value="">Só 3 + nível</option>
                {ATTRIBUTE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {ATTRIBUTE_LABELS[id]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Slots extras"
              hint={
                featSlotBonus > 0
                  ? `Feitos já somam +${featSlotBonus}. Deixe 0 a menos que tenha outra fonte.`
                  : 'Feitos como Familiar Aprimorado já entram sozinhos. Só preencha outra fonte.'
              }
            >
              <Input
                type="number"
                min={0}
                max={10}
                value={value.extraAbilitySlots ?? 0}
                onChange={(e) =>
                  onChange({
                    ...value,
                    extraAbilitySlots: Math.max(
                      0,
                      Number.parseInt(e.target.value, 10) || 0,
                    ),
                  })
                }
              />
            </Field>
          </div>
        )}

        {value.kind === 'pet' && (
          <Field label="Slots extras" hint="Raro — deixe 0 no mascote padrão">
            <Input
              type="number"
              min={0}
              max={4}
              value={value.extraAbilitySlots ?? 0}
              onChange={(e) =>
                onChange({
                  ...value,
                  extraAbilitySlots: Math.max(
                    0,
                    Number.parseInt(e.target.value, 10) || 0,
                  ),
                })
              }
            />
          </Field>
        )}

        <div>
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
              Habilidades{' '}
              <span className="font-normal text-text-dim">
                ({value.selectedAbilities.length}/{slots})
              </span>
            </div>
            <Button
              size="sm"
              variant="secondary"
              disabled={value.selectedAbilities.length >= slots}
              onClick={() => setPickerOpen((v) => !v)}
            >
              {pickerOpen ? 'Fechar lista' : '+ Habilidade'}
            </Button>
          </div>

          {value.selectedAbilities.length === 0 ? (
            <p className="text-xs text-text-dim">
              Nenhuma selecionada. Familiar: escolha a cada dia nas preparações.
              Mascote: duas fixas.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {value.selectedAbilities.map((sel, index) => {
                const def = resolved?.abilities[index]?.definition
                return (
                  <li key={`${sel.abilityId}-${index}`}>
                    <ExpandableCard
                      title={def?.name ?? sel.abilityId}
                      badges={
                        <>
                          {def && (
                            <Badge className="!text-[9px]">
                              {FAMILIAR_ABILITY_KIND_LABELS[def.kind]}
                            </Badge>
                          )}
                          {sel.innate && (
                            <Badge tone="accent" className="!text-[9px]">
                              Inata
                            </Badge>
                          )}
                        </>
                      }
                    >
                      {def && (
                        <RichText as="p" className="text-[11px]">
                          {def.description}
                        </RichText>
                      )}
                      {(def?.repeatable || def?.prerequisiteHint) && (
                        <Input
                          value={sel.optionNote ?? ''}
                          placeholder={
                            def.repeatable
                              ? 'Ex.: perícia Arcana'
                              : 'Nota / escolha'
                          }
                          onChange={(e) =>
                            updateAbility(index, {
                              optionNote: e.target.value,
                            })
                          }
                        />
                      )}
                      {!(
                        sel.innate &&
                        (selectedSpecific ||
                          (selectedForm && selectedForm.id !== 'form-custom'))
                      ) && (
                        <label className="flex items-center gap-1.5 text-[11px] text-text-dim">
                          <input
                            type="checkbox"
                            checked={!!sel.innate}
                            onChange={(e) =>
                              updateAbility(index, {
                                innate: e.target.checked,
                              })
                            }
                          />
                          Inata da forma (não troca nas preparações)
                        </label>
                      )}
                      <div className="flex justify-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          disabled={!!sel.innate}
                          onClick={() => removeAbility(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    </ExpandableCard>
                  </li>
                )
              })}
            </ul>
          )}

          {pickerOpen && (
            <div className="mt-2 max-h-64 overflow-y-auto rounded-lg border border-border bg-surface-2 p-2">
              <ul className="space-y-1">
                {defs.map((def) => {
                  const already =
                    !def.repeatable &&
                    value.selectedAbilities.some(
                      (s) => s.abilityId === def.id,
                    )
                  const locked =
                    already || value.selectedAbilities.length >= slots
                  return (
                    <li key={def.id}>
                      <ExpandableCard
                        compact
                        title={def.name}
                        badges={
                          <Badge className="!text-[9px]">
                            {FAMILIAR_ABILITY_KIND_LABELS[def.kind]}
                          </Badge>
                        }
                        actions={
                          <button
                            type="button"
                            disabled={locked}
                            onClick={() => {
                              addAbility(def.id)
                              if (
                                value.selectedAbilities.length + 1 >=
                                slots
                              ) {
                                setPickerOpen(false)
                              }
                            }}
                            className="rounded-md border border-border bg-surface-3 px-2 py-1 text-[10px] font-medium text-text-muted hover:border-accent/50 hover:text-text disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Adicionar
                          </button>
                        }
                      >
                        <RichText as="p">{def.description}</RichText>
                      </ExpandableCard>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        <Field label="Notas">
          <Textarea
            value={value.notes ?? ''}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            placeholder="Empatia a 1 milha, magias que miram o familiar…"
            className="min-h-16"
          />
        </Field>
      </div>
    </Panel>
  )
}

function AnimalCompanionEditor({
  value,
  resolved,
  onChange,
  onRemove,
}: {
  value: NonNullable<CharacterCompanions['animalCompanion']>
  resolved: ReturnType<typeof resolveCompanions>['animalCompanion']
  onChange: (
    next: NonNullable<CharacterCompanions['animalCompanion']>,
  ) => void
  onRemove: () => void
}) {
  const nextStages = nextAnimalCompanionStages(value.stage)
  const catalog = listAnimalCompanionTypes()
  const stats = resolved?.stats ?? null
  const maxHp = resolved?.maxHp ?? null
  const currentHp = resolved?.currentHp ?? null
  const pct =
    maxHp != null && currentHp != null
      ? Math.round((currentHp / Math.max(1, maxHp)) * 100)
      : 0

  function setHp(next: number) {
    if (maxHp == null) return
    onChange({ ...value, currentHp: Math.min(maxHp, Math.max(0, next)) })
  }

  function selectType(typeId: string) {
    const t = catalog.find((c) => c.id === typeId)
    onChange({
      ...value,
      typeId: typeId || null,
      typeLabel: t?.name ?? '',
      isMount: t?.isMount ?? false,
      currentHp: null,
    })
  }

  return (
    <Panel
      quiet
      compact
      title="Companheiro animal"
      subtitle={
        <>
          lacaio · Comandar Animal → <ActionCost type="two" />
        </>
      }
      actions={
        <Button size="sm" variant="ghost" onClick={onRemove}>
          Remover
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              placeholder="Ex.: Thorn"
            />
          </Field>
          <Field label="Tipo (catálogo)">
            <Select
              value={value.typeId ?? ''}
              onChange={(e) => selectType(e.target.value)}
            >
              <option value="">Escolher tipo…</option>
              {catalog.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                  {t.minLevel ? ` (nv. ${t.minLevel}+)` : ''}
                  {` · ${t.originalName}`}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {!value.typeId ? (
          <div className="rounded-lg border border-dashed border-border/80 px-3 py-2 text-xs text-text-dim">
            Escolha um tipo do catálogo Remaster (Player Core, Howl of the
            Wild, Rage of Elements, Tian Xia, High Seas, Treasure Vault,
            Shining Kingdoms). Guns &amp; Gears entra como companheiro
            construto, não como animal. PV, CA, ataques e avanço são
            calculados automaticamente.
          </div>
        ) : stats ? (
          <div className="space-y-2 rounded-lg border border-accent/30 bg-accent/5 p-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-semibold text-text">
                {stats.type.name}
              </span>
              <Badge tone="info" className="!text-[9px]">
                {stats.sizeLabel}
              </Badge>
              <Badge className="!text-[9px]">{stats.type.source}</Badge>
            </div>
            <RichText as="p" className="text-[11px] text-text-muted">
              {stats.type.description}
            </RichText>
            {stats.type.special && (
              <p className="text-[11px] text-text-dim">{stats.type.special}</p>
            )}
            {stats.type.minLevel != null && (
              <Badge className="!text-[9px]">
                Avançado · nv. {stats.type.minLevel}+
              </Badge>
            )}

            <div className="grid gap-2 sm:grid-cols-4">
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  PV
                </div>
                {maxHp == null || currentHp == null ? (
                  <div className="text-sm text-text-dim">—</div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-lg font-semibold tabular-nums">
                        {currentHp}
                      </span>
                      <span className="text-[11px] text-text-dim">
                        /{maxHp}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3">
                      <div
                        className="h-full rounded-full bg-success"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-1 flex gap-0.5">
                      <button
                        type="button"
                        className="h-6 w-6 rounded border border-border text-xs"
                        onClick={() => setHp(currentHp - 1)}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        className="h-6 w-6 rounded border border-border text-xs"
                        onClick={() => setHp(currentHp + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="h-6 rounded border border-border px-1.5 text-[10px]"
                        onClick={() => setHp(maxHp)}
                      >
                        Full
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  CA
                </div>
                <div className="font-display text-lg font-semibold tabular-nums">
                  {stats.ac}
                </div>
              </div>
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  Perc
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="font-display text-lg font-semibold tabular-nums">
                    {formatModifier(stats.perception)}
                  </span>
                  <DiceButton
                    label={`${value.name} Percepção`}
                    modifier={stats.perception}
                  />
                </div>
              </div>
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  Vel
                </div>
                <div className="text-sm font-medium leading-tight">
                  {stats.speedLabel}
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  ['Fort', stats.fortitude],
                  ['Ref', stats.reflex],
                  ['Von', stats.will],
                ] as const
              ).map(([label, mod]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-md border border-border/50 px-2 py-1 text-sm"
                >
                  <span className="text-text-dim">{label}</span>
                  <span className="flex items-center gap-0.5 font-semibold tabular-nums">
                    {formatModifier(mod)}
                    <DiceButton
                      label={`${value.name} ${label}`}
                      modifier={mod}
                    />
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted">
              {(
                Object.keys(stats.attributes) as Array<
                  keyof typeof stats.attributes
                >
              ).map((id) => (
                <span key={id}>
                  {ATTRIBUTE_LABELS[id].slice(0, 3)}{' '}
                  <strong className="text-text">
                    {formatModifier(stats.attributes[id])}
                  </strong>
                </span>
              ))}
            </div>

            {stats.senses.length > 0 ? (
              <div className="mt-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Sentidos
                </p>
                <SenseLabelList labels={stats.senses} />
              </div>
            ) : null}
            {stats.skillLabel && stats.skillModifier != null ? (
              <div className="text-[11px] text-text-dim">
                {stats.skillLabel} {formatModifier(stats.skillModifier)}
              </div>
            ) : null}

            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase text-text-dim">
                Ataques
              </div>
              <ul className="space-y-1">
                {stats.attacks.map((atk) => (
                  <li
                    key={atk.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/50 px-2 py-1.5 text-sm"
                  >
                    <div>
                      <span className="font-medium">{atk.name}</span>
                      {atk.traits.length > 0 && (
                        <span className="ml-1.5 text-[10px] text-text-dim">
                          (<TraitTipList traits={atk.traits} />)
                        </span>
                      )}
                      <div className="text-[11px] text-text-muted">
                        {atk.damageLabel} {atk.damageType}
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="font-display font-semibold tabular-nums">
                        {formatModifier(atk.attackModifier)}
                      </span>
                      <DiceButton
                        label={`${value.name} ${atk.name}`}
                        modifier={atk.attackModifier}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-[11px] leading-relaxed text-text-muted">
              <strong className="text-text">Apoiar:</strong>{' '}
              {polishRulesText(stats.supportBenefit)}
            </div>

            {stats.advancedManeuver && (
              <div className="rounded-md border border-border/60 px-2 py-1.5 text-[11px] text-text-muted">
                <div className="flex flex-wrap items-center gap-1.5">
                  <strong className="text-text">
                    {stats.advancedManeuver.name}
                  </strong>
                  <ActionCost type={stats.advancedManeuver.actionType} />
                </div>
                {stats.advancedManeuver.requirements && (
                  <div className="mt-0.5">
                    Requisitos: {polishRulesText(stats.advancedManeuver.requirements)}
                  </div>
                )}
                <div className="mt-0.5">
                  <RichText>{polishRulesText(stats.advancedManeuver.description)}</RichText>
                </div>
              </div>
            )}

            {stats.notes.length > 0 && (
              <ul className="text-[10px] text-text-dim">
                {stats.notes.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <p className="text-xs text-accent">
            Tipo “{value.typeId}” não encontrado no catálogo.
          </p>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Estágio">
            <Select
              value={value.stage}
              onChange={(e) => {
                const stage = e.target.value as AnimalCompanionStage
                onChange({
                  ...value,
                  stage,
                  specialization:
                    stage === 'specialized' ? value.specialization : null,
                })
              }}
            >
              {(
                Object.keys(
                  ANIMAL_COMPANION_STAGE_LABELS,
                ) as AnimalCompanionStage[]
              ).map((stage) => (
                <option key={stage} value={stage}>
                  {ANIMAL_COMPANION_STAGE_LABELS[stage]}
                </option>
              ))}
            </Select>
            <div className="mt-1">
              <CompanionRulesCard
                title={ANIMAL_COMPANION_STAGE_LABELS[value.stage]}
                description={ANIMAL_COMPANION_STAGE_RULES[value.stage]}
              />
            </div>
          </Field>
          <Field
            label="Especialização"
            hint={
              value.stage !== 'specialized'
                ? 'Só no estágio Especializado'
                : undefined
            }
          >
            <Select
              disabled={value.stage !== 'specialized'}
              value={value.specialization ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  specialization: (e.target.value ||
                    null) as AnimalCompanionSpecialization | null,
                })
              }
            >
              <option value="">—</option>
              {(
                Object.keys(
                  ANIMAL_SPECIALIZATION_LABELS,
                ) as AnimalCompanionSpecialization[]
              ).map((spec) => (
                <option key={spec} value={spec}>
                  {ANIMAL_SPECIALIZATION_LABELS[spec]}
                </option>
              ))}
            </Select>
            {value.stage === 'specialized' && value.specialization ? (
              <div className="mt-1">
                <CompanionRulesCard
                  title={ANIMAL_SPECIALIZATION_LABELS[value.specialization]}
                  description={
                    ANIMAL_SPECIALIZATION_RULES[value.specialization]
                  }
                />
              </div>
            ) : null}
            {value.stage === 'specialized' ? (
              <details className="mt-1">
                <summary className="cursor-pointer text-[10px] text-text-dim">
                  Ler especializações
                </summary>
                <ul className="mt-1 max-h-56 space-y-1 overflow-y-auto">
                  {(
                    Object.keys(
                      ANIMAL_SPECIALIZATION_LABELS,
                    ) as AnimalCompanionSpecialization[]
                  ).map((spec) => (
                    <li key={spec}>
                      <CompanionRulesCard
                        title={ANIMAL_SPECIALIZATION_LABELS[spec]}
                        description={ANIMAL_SPECIALIZATION_RULES[spec]}
                        actions={
                          <Button
                            size="sm"
                            variant="accent"
                            disabled={value.specialization === spec}
                            onClick={() =>
                              onChange({ ...value, specialization: spec })
                            }
                          >
                            {value.specialization === spec
                              ? 'Atual'
                              : 'Escolher'}
                          </Button>
                        }
                      />
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}
          </Field>
        </div>

        {nextStages.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-text-dim">
            Avanço típico a partir daqui:
            {nextStages.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded border border-border px-2 py-0.5 text-text-muted hover:border-accent/40 hover:text-accent"
                onClick={() =>
                  onChange({
                    ...value,
                    stage: s,
                    specialization:
                      s === 'specialized' ? value.specialization : null,
                  })
                }
              >
                → {ANIMAL_COMPANION_STAGE_LABELS[s]}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 text-xs">
          <label className="flex items-center gap-1.5 text-text-muted">
            <input
              type="checkbox"
              checked={!!value.isMount}
              onChange={(e) =>
                onChange({ ...value, isMount: e.target.checked })
              }
            />
            Montaria especial (ignora limites de cavaleiro)
          </label>
          {resolved?.stageLabel && (
            <Badge tone="info" className="!text-[9px]">
              {resolved.stageLabel}
              {resolved.specializationLabel
                ? ` · ${resolved.specializationLabel}`
                : ''}
            </Badge>
          )}
        </div>

        <Field label="Notas">
          <Textarea
            value={value.notes ?? ''}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            placeholder="Aparência, vínculo, etc."
            className="min-h-16"
          />
        </Field>
      </div>
    </Panel>
  )
}

function ConstructCompanionEditor({
  value,
  resolved,
  onChange,
  onRemove,
}: {
  value: ConstructCompanionState
  resolved: ReturnType<typeof resolveCompanions>['constructCompanion']
  onChange: (next: ConstructCompanionState) => void
  onRemove: () => void
}) {
  const stats = resolved?.stats ?? null
  const maxHp = resolved?.maxHp ?? null
  const currentHp = resolved?.currentHp ?? null
  const pct =
    maxHp != null && currentHp != null
      ? Math.round((currentHp / Math.max(1, maxHp)) * 100)
      : 0
  const nextStages = nextConstructCompanionStages(value.stage)
  const initials = listConstructModifications('initial')
  const breakthroughs = listConstructModifications('breakthrough')
  const revolutionaries = listConstructModifications('revolutionary')
  const increased =
    value.initialModificationId === 'construct-mod-increased-size'
  const sizeOptions: Array<'small' | 'medium' | 'large'> =
    value.stage === 'prototype' && !increased
      ? ['small', 'medium']
      : ['small', 'medium', 'large']
  const hasProjectile =
    value.initialModificationId === 'construct-mod-projectile-launcher'
  const hasTurret =
    value.breakthroughModificationId === 'construct-mod-turret-configuration'
  const hasMiracle =
    value.revolutionaryModificationId === 'construct-mod-miracle-gears'

  function setHp(next: number) {
    if (maxHp == null) return
    onChange({ ...value, currentHp: Math.min(maxHp, Math.max(0, next)) })
  }

  function setInitial(id: string) {
    const next: ConstructCompanionState = {
      ...value,
      initialModificationId: id || null,
      currentHp: null,
    }
    if (id === 'construct-mod-increased-size') next.size = 'large'
    else if (
      value.stage === 'prototype' &&
      value.size === 'large' &&
      id !== 'construct-mod-increased-size'
    ) {
      next.size = 'medium'
    }
    if (id !== 'construct-mod-projectile-launcher') {
      next.breakthroughModificationId =
        next.breakthroughModificationId === 'construct-mod-turret-configuration'
          ? null
          : next.breakthroughModificationId
      next.turretMode = false
    }
    if (id !== 'construct-mod-wonder-gears') {
      if (
        next.breakthroughModificationId === 'construct-mod-marvelous-gears'
      ) {
        next.breakthroughModificationId = null
      }
      if (next.revolutionaryModificationId === 'construct-mod-miracle-gears') {
        next.revolutionaryModificationId = null
        next.miracleGearsSkillIds = null
      }
    }
    onChange(next)
  }

  return (
    <Panel
      quiet
      compact
      title="Companheiro construto"
      subtitle="inovação · Guns & Gears (Remastered)"
      actions={
        <Button size="sm" variant="ghost" onClick={onRemove}>
          Remover
        </Button>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              placeholder="Ex.: Ferrugem"
            />
          </Field>
          <Field label="Estágio">
            <Select
              value={value.stage}
              onChange={(e) =>
                onChange({
                  ...value,
                  stage: e.target.value as ConstructCompanionStage,
                  currentHp: null,
                })
              }
            >
              {(
                Object.keys(
                  CONSTRUCT_COMPANION_STAGE_LABELS,
                ) as ConstructCompanionStage[]
              ).map((stage) => (
                <option key={stage} value={stage}>
                  {CONSTRUCT_COMPANION_STAGE_LABELS[stage]}
                </option>
              ))}
            </Select>
            <div className="mt-1">
              <CompanionRulesCard
                title={CONSTRUCT_COMPANION_STAGE_LABELS[value.stage]}
                description={CONSTRUCT_COMPANION_STAGE_RULES[value.stage]}
              />
            </div>
          </Field>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <Field label="Tamanho">
            <Select
              value={value.size}
              onChange={(e) =>
                onChange({
                  ...value,
                  size: e.target.value as ConstructCompanionState['size'],
                })
              }
            >
              {sizeOptions.map((s) => (
                <option key={s} value={s}>
                  {SIZE_LABELS[s]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Golpe ágil">
            <Select
              value={value.agileDamageType}
              onChange={(e) =>
                onChange({
                  ...value,
                  agileDamageType: e.target.value as
                    | 'cortante'
                    | 'perfurante',
                })
              }
            >
              <option value="cortante">1d6 cortante</option>
              <option value="perfurante">1d6 perfurante</option>
            </Select>
          </Field>
          {hasProjectile ? (
            <Field label="Lançador">
              <Select
                value={value.projectileDamageType ?? 'perfurante'}
                onChange={(e) =>
                  onChange({
                    ...value,
                    projectileDamageType: e.target.value as
                      | 'contundente'
                      | 'perfurante',
                  })
                }
              >
                <option value="contundente">contundente</option>
                <option value="perfurante">perfurante</option>
              </Select>
            </Field>
          ) : (
            <div />
          )}
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <ConstructModPicker
            label="Modificação inicial"
            options={initials}
            value={value.initialModificationId ?? ''}
            onChange={setInitial}
          />
          <ConstructModPicker
            label="Avanço (7º)"
            options={breakthroughs}
            value={value.breakthroughModificationId ?? ''}
            onChange={(id) => {
              const next = id || null
              onChange({
                ...value,
                breakthroughModificationId: next,
                turretMode:
                  next === 'construct-mod-turret-configuration'
                    ? value.turretMode
                    : false,
                revolutionaryModificationId:
                  next !== 'construct-mod-marvelous-gears' &&
                  value.revolutionaryModificationId ===
                    'construct-mod-miracle-gears'
                    ? null
                    : value.revolutionaryModificationId,
                currentHp: null,
              })
            }}
          />
          <ConstructModPicker
            label="Revolucionária (15º)"
            options={revolutionaries}
            value={value.revolutionaryModificationId ?? ''}
            onChange={(id) => {
              const next = id || null
              onChange({
                ...value,
                revolutionaryModificationId: next,
                miracleGearsSkillIds:
                  next === 'construct-mod-miracle-gears'
                    ? value.miracleGearsSkillIds
                    : null,
                currentHp: null,
              })
            }}
          />
        </div>

        {hasTurret && (
          <label className="flex items-center gap-1.5 text-xs text-text-muted">
            <input
              type="checkbox"
              checked={!!value.turretMode}
              onChange={(e) =>
                onChange({ ...value, turretMode: e.target.checked })
              }
            />
            Forma de torre (imóvel · d6 · {formatSpeedMeters(60)})
          </label>
        )}

        {hasMiracle && (
          <div className="grid gap-2 sm:grid-cols-2">
            {([0, 1] as const).map((i) => (
              <Field key={i} label={`Perícia lendária ${i + 1}`}>
                <Select
                  value={value.miracleGearsSkillIds?.[i] ?? ''}
                  onChange={(e) => {
                    const next: [SkillId, SkillId] = [
                      value.miracleGearsSkillIds?.[0] ?? 'arcana',
                      value.miracleGearsSkillIds?.[1] ?? 'diplomacy',
                    ]
                    next[i] = e.target.value as SkillId
                    onChange({ ...value, miracleGearsSkillIds: next })
                  }}
                >
                  <option value="">Escolher…</option>
                  {CONSTRUCT_MIRACLE_GEARS_SKILLS.map((id) => (
                    <option key={id} value={id}>
                      {SKILL_LABELS[id]}
                    </option>
                  ))}
                </Select>
              </Field>
            ))}
          </div>
        )}

        {stats && (
          <div className="space-y-2 rounded-lg border border-accent/30 bg-accent/5 p-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-semibold text-text">
                {value.name || 'Construto'}
              </span>
              <Badge tone="info" className="!text-[9px]">
                {stats.sizeLabel}
              </Badge>
              <Badge className="!text-[9px]">
                {resolved?.stageLabel}
              </Badge>
              <Badge className="!text-[9px]">
                Guns & Gears (Remastered)
              </Badge>
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  PV
                </div>
                {maxHp == null || currentHp == null ? (
                  <div className="text-sm text-text-dim">—</div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-lg font-semibold tabular-nums">
                        {currentHp}
                      </span>
                      <span className="text-[11px] text-text-dim">
                        /{maxHp}
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-3">
                      <div
                        className="h-full rounded-full bg-success"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="mt-1 flex gap-0.5">
                      <button
                        type="button"
                        className="h-6 w-6 rounded border border-border text-xs"
                        onClick={() => setHp(currentHp - 1)}
                      >
                        −
                      </button>
                      <button
                        type="button"
                        className="h-6 w-6 rounded border border-border text-xs"
                        onClick={() => setHp(currentHp + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="h-6 rounded border border-border px-1.5 text-[10px]"
                        onClick={() => setHp(maxHp)}
                      >
                        Full
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  CA
                </div>
                <div className="font-display text-lg font-semibold tabular-nums">
                  {stats.ac}
                </div>
              </div>
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  Perc
                </div>
                <div className="flex items-center gap-0.5">
                  <span className="font-display text-lg font-semibold tabular-nums">
                    {formatModifier(stats.perception)}
                  </span>
                  <DiceButton
                    label={`${value.name} Percepção`}
                    modifier={stats.perception}
                  />
                </div>
              </div>
              <div className="rounded-md border border-border/60 bg-surface-2/50 px-2 py-1.5">
                <div className="text-[9px] font-semibold uppercase text-text-dim">
                  Vel
                </div>
                <div className="text-sm font-medium leading-tight">
                  {stats.speedLabel}
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {(
                [
                  ['Fort', stats.fortitude],
                  ['Ref', stats.reflex],
                  ['Von', stats.will],
                ] as const
              ).map(([label, mod]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-md border border-border/50 px-2 py-1 text-sm"
                >
                  <span className="text-text-dim">{label}</span>
                  <span className="flex items-center gap-0.5 font-semibold tabular-nums">
                    {formatModifier(mod)}
                    <DiceButton
                      label={`${value.name} ${label}`}
                      modifier={mod}
                    />
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted">
              {(
                Object.keys(stats.attributes) as Array<
                  keyof typeof stats.attributes
                >
              ).map((id) => (
                <span key={id}>
                  {ATTRIBUTE_LABELS[id].slice(0, 3)}{' '}
                  <strong className="text-text">
                    {formatModifier(stats.attributes[id])}
                  </strong>
                </span>
              ))}
            </div>

            {stats.senses.length > 0 ? (
              <div className="mt-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Sentidos
                </p>
                <SenseLabelList labels={stats.senses} />
              </div>
            ) : null}
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-muted">
              {stats.skills.map((sk) => (
                <span key={sk.id}>
                  {sk.label} {PROFICIENCY_LABELS[sk.rank].slice(0, 3)}{' '}
                  <strong className="text-text">
                    {formatModifier(sk.modifier)}
                  </strong>
                </span>
              ))}
            </div>

            <div>
              <div className="mb-1 text-[10px] font-semibold uppercase text-text-dim">
                Ataques
              </div>
              <ul className="space-y-1">
                {stats.attacks.map((atk) => (
                  <li
                    key={atk.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/50 px-2 py-1.5 text-sm"
                  >
                    <div>
                      <span className="font-medium">{atk.name}</span>
                      {atk.traits.length > 0 && (
                        <span className="ml-1.5 text-[10px] text-text-dim">
                          (<TraitTipList traits={atk.traits} />)
                        </span>
                      )}
                      <div className="text-[11px] text-text-muted">
                        {atk.damageLabel} {atk.damageType}
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <span className="font-display font-semibold tabular-nums">
                        {formatModifier(atk.attackModifier)}
                      </span>
                      <DiceButton
                        label={`${value.name} ${atk.name}`}
                        modifier={atk.attackModifier}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {stats.immunities.length > 0 ? (
              <div className="mt-1">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Imunidades
                </p>
                <ImmunityLabelList labels={stats.immunities} />
              </div>
            ) : null}

            {stats.notes.length > 0 && (
              <ul className="text-[10px] text-text-dim">
                {stats.notes.map((n) => (
                  <li key={n}>• {n}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {nextStages.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-text-dim">
            Avanço típico a partir daqui:
            {nextStages.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded border border-border px-2 py-0.5 text-text-muted hover:border-accent/40 hover:text-accent"
                onClick={() =>
                  onChange({ ...value, stage: s, currentHp: null })
                }
              >
                → {CONSTRUCT_COMPANION_STAGE_LABELS[s]}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 text-xs">
          <label className="flex items-center gap-1.5 text-text-muted">
            <input
              type="checkbox"
              checked={!!value.isMount}
              onChange={(e) =>
                onChange({ ...value, isMount: e.target.checked })
              }
            />
            Montaria (regras de companheiro construto de montaria)
          </label>
        </div>

        <Field label="Notas">
          <Textarea
            value={value.notes ?? ''}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            placeholder="Aparência, runa, idioma das Engrenagens Milagre…"
            className="min-h-16"
          />
        </Field>
      </div>
    </Panel>
  )
}

function EidolonEditor({
  value,
  resolved,
  onChange,
  onRemove,
}: {
  value: EidolonState
  resolved: ReturnType<typeof resolveCompanions>['eidolon']
  onChange: (next: EidolonState) => void
  onRemove: () => void
}) {
  const catalog = listEidolonTypes()
  const type = catalog.find((t) => t.id === value.typeId) ?? null
  const stats = resolved?.stats ?? null
  const usesNamed = Boolean(type?.namedArrays?.length)
  const maxHp = resolved?.maxHp ?? null
  const currentHp = resolved?.currentHp ?? null

  function selectType(typeId: string) {
    const t = catalog.find((c) => c.id === typeId)
    onChange({
      ...value,
      typeId: typeId || null,
      typeLabel: t?.name ?? '',
      size: t?.sizeOptions[0] ?? 'medium',
      arrayId: t?.namedArrays?.[0]?.id ?? null,
    })
  }

  return (
    <Panel
      quiet
      compact
      title={COMPANION_KIND_LABELS.eidolon}
      actions={
        <Button size="sm" variant="ghost" onClick={onRemove}>
          Remover
        </Button>
      }
    >
      <div className="space-y-3">
        <Tip>
          PV compartilhados com você — a barra de vida da ficha vale para os
          dois. Ações e PAM também. Manifestar:{' '}
          <ActionCost type="three" /> (1 no 19º).
        </Tip>

        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Nome">
            <Input
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
            />
          </Field>
          <Field label="Tipo">
            <Select
              value={value.typeId ?? ''}
              onChange={(e) => selectType(e.target.value)}
            >
              <option value="">Escolher…</option>
              {catalog.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        {type && (
          <p className="text-xs text-text-dim">
            <RichText>{polishRulesText(type.description)}</RichText> Tradição:{' '}
            {type.tradition
              ? TRADITION_LABELS[type.tradition]
              : 'escolha no dragão (perícia da tradição).'}{' '}
            {type.source}
          </p>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          {usesNamed ? (
            <Field label="Arranjo">
              <Select
                value={value.arrayId ?? ''}
                onChange={(e) =>
                  onChange({ ...value, arrayId: e.target.value || null })
                }
              >
                {(type?.namedArrays ?? []).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </Select>
            </Field>
          ) : (
            <Field label="Atributo-chave">
              <Select
                value={value.keyAttribute}
                onChange={(e) =>
                  onChange({
                    ...value,
                    keyAttribute: e.target.value as EidolonKeyAttribute,
                  })
                }
              >
                <option value="strength">Força (+4 For, +2 Des, CA +2)</option>
                <option value="dexterity">
                  Destreza (+4 Des, +2 For, CA +1)
                </option>
              </Select>
            </Field>
          )}
          <Field label="Tamanho">
            <Select
              value={value.size}
              onChange={(e) =>
                onChange({
                  ...value,
                  size: e.target.value as EidolonState['size'],
                })
              }
            >
              {(type?.sizeOptions ?? ['medium']).map((s) => (
                <option key={s} value={s}>
                  {SIZE_LABELS[s]}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Golpe primário">
            <Select
              value={value.primaryAttack}
              onChange={(e) =>
                onChange({
                  ...value,
                  primaryAttack: e.target.value as EidolonPrimaryAttackId,
                })
              }
            >
              {(
                Object.entries(EIDOLON_PRIMARY_ATTACKS) as Array<
                  [EidolonPrimaryAttackId, { label: string }]
                >
              ).map(([id, meta]) => (
                <option key={id} value={id}>
                  {meta.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Forma do primário">
            <Input
              value={value.primaryFormLabel}
              onChange={(e) =>
                onChange({ ...value, primaryFormLabel: e.target.value })
              }
              placeholder="Garras, asas, lâmina de essência…"
            />
          </Field>
          <Field label="Forma do secundário (1d6 ágil)">
            <Input
              value={value.secondaryFormLabel}
              onChange={(e) =>
                onChange({ ...value, secondaryFormLabel: e.target.value })
              }
              placeholder="Cauda, asa, tentáculo…"
            />
          </Field>
          <label className="flex items-center gap-2 pt-6 text-sm text-text">
            <input
              type="checkbox"
              checked={value.manifested !== false}
              onChange={(e) =>
                onChange({ ...value, manifested: e.target.checked })
              }
            />
            Manifestado
          </label>
        </div>

        {stats && (
          <div className="space-y-2 rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2">
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge>CA {stats.ac}</Badge>
              <Badge>
                Percepção {formatModifier(stats.perception)} (
                {PROFICIENCY_LABELS[stats.perceptionRank]})
              </Badge>
              <Badge>
                Fort {formatModifier(stats.fortitude)} · Ref{' '}
                {formatModifier(stats.reflex)} · Von{' '}
                {formatModifier(stats.will)}
              </Badge>
              <Badge>{stats.speedLabel}</Badge>
              {maxHp != null && (
                <Badge>
                  PV compartilhados {currentHp ?? '—'}/{maxHp}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-text-dim">
              {(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const).map(
                (id) => (
                  <span key={id}>
                    {ATTRIBUTE_LABELS[id].slice(0, 3)}{' '}
                    {formatModifier(stats.attributes[id])}
                  </span>
                ),
              )}
            </div>
            {stats.senses.length > 0 ? (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-dim">
                  Sentidos
                </p>
                <SenseLabelList labels={stats.senses} />
              </div>
            ) : null}
            <ul className="space-y-1 text-sm">
              {stats.attacks.map((atk) => (
                <li key={atk.id} className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-text">{atk.name}</span>
                  <DiceButton
                    modifier={atk.attackModifier}
                    label={formatModifier(atk.attackModifier)}
                  />
                  <span className="text-text-dim">
                    {atk.damageLabel} {atk.damageType}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    <TraitTipList traits={atk.traits} />
                  </span>
                </li>
              ))}
            </ul>
            {type && (
              <div className="space-y-1">
                <CompanionRulesCard
                  title={type.initialAbility.name}
                  subtitle="Inicial"
                  badges={
                    type.initialAbility.actionType ? (
                      <ActionCost type={type.initialAbility.actionType} />
                    ) : undefined
                  }
                  description={type.initialAbility.description}
                />
                <CompanionRulesCard
                  title={type.symbiosisAbility.name}
                  subtitle="7º · Simbiose"
                  badges={
                    type.symbiosisAbility.actionType ? (
                      <ActionCost type={type.symbiosisAbility.actionType} />
                    ) : undefined
                  }
                  description={type.symbiosisAbility.description}
                />
                <CompanionRulesCard
                  title={type.transcendenceAbility.name}
                  subtitle="17º · Transcendência"
                  badges={
                    type.transcendenceAbility.actionType ? (
                      <ActionCost type={type.transcendenceAbility.actionType} />
                    ) : undefined
                  }
                  description={type.transcendenceAbility.description}
                />
              </div>
            )}
          </div>
        )}

        <Field label="Notas">
          <Textarea
            value={value.notes ?? ''}
            onChange={(e) => onChange({ ...value, notes: e.target.value })}
            placeholder="Aparência, pecado do demônio, núcleo elemental, sopro do dragão…"
            className="min-h-16"
          />
        </Field>
      </div>
    </Panel>
  )
}

function ConstructModPicker({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: ConstructModificationDefinition[]
  value: string
  onChange: (id: string) => void
}) {
  const selected = options.find((mod) => mod.id === value)
  return (
    <Field label={label}>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {options.map((mod) => (
          <option key={mod.id} value={mod.id}>
            {mod.name}
          </option>
        ))}
      </Select>
      {selected ? (
        <div className="mt-1">
          <CompanionRulesCard
            title={selected.name}
            subtitle={selected.originalName}
            description={selected.description}
          />
        </div>
      ) : null}
      <details className="mt-1">
        <summary className="cursor-pointer text-[10px] text-text-dim">
          Ler opções
        </summary>
        <ul className="mt-1 max-h-56 space-y-1 overflow-y-auto">
          {options.map((mod) => (
            <li key={mod.id}>
              <CompanionRulesCard
                title={mod.name}
                subtitle={mod.originalName}
                description={mod.description}
                actions={
                  <Button
                    size="sm"
                    variant="accent"
                    disabled={mod.id === value}
                    onClick={() => onChange(mod.id)}
                  >
                    {mod.id === value ? 'Atual' : 'Escolher'}
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      </details>
    </Field>
  )
}

