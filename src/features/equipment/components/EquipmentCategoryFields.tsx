import type {
  AlchemicalKind,
  ArmorGroupId,
  ArmorStats,
  ConsumableKind,
  DamageTypeId,
  ItemCategory,
  ItemDefinition,
  RuneAppliesTo,
  SkillId,
  WeaponGroupId,
  WeaponHands,
  WeaponStats,
} from '@/types'
import {
  ATTRIBUTE_IDS,
  ARMOR_GROUP_LABELS,
  DAMAGE_TYPE_IDS,
  DAMAGE_TYPE_LABELS,
  POISON_EXPOSURE_LABELS,
  SKILL_IDS,
  TALISMAN_HOST_LABELS,
  WEAPON_GROUP_LABELS,
} from '@/types'
import {
  ATTRIBUTE_LABELS,
  SKILL_LABELS,
} from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select } from '@/components/ui/Field'
import { ActionRichTextarea } from '@/components/ui/ActionTypePicker'
import { Panel } from '@/components/ui/Panel'
import {
  ALCHEMICAL_KIND_LABELS,
  ARMOR_PROFICIENCY_LABELS,
  ARTIFACT_CHASSIS,
  CONSUMABLE_SUBKIND_LABELS,
  DAMAGE_DICE,
  WEAPON_PROFICIENCY_LABELS,
  isArtifactItem,
  retargetArtifactChassis,
  setAlchemicalKind,
  setConsumableSubkind,
} from '@/features/equipment/homebrewDefaults'
import { ITEM_CATEGORY_LABELS } from '@/types'

const WEAPON_GROUPS = Object.keys(WEAPON_GROUP_LABELS) as WeaponGroupId[]
const ARMOR_GROUPS = Object.keys(ARMOR_GROUP_LABELS) as ArmorGroupId[]
const ARMOR_CATS = ['unarmored', 'light', 'medium', 'heavy'] as const
const RUNE_TARGETS: RuneAppliesTo[] = ['weapon', 'armor', 'shield']

function splitList(value: string): string[] {
  return value
    .split(/[,;]/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function EquipmentCategoryFields({
  draft,
  onChange,
  artifactMode,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
  artifactMode: boolean
}) {
  return (
    <>
      {artifactMode && (
        <Panel title="Chassi do artefato" subtitle="Como o herói carrega isso">
          <Field label="Forma">
            <Select
              value={draft.category}
              onChange={(e) =>
                onChange(
                  retargetArtifactChassis(
                    draft,
                    e.target.value as ItemCategory,
                  ),
                )
              }
            >
              {ARTIFACT_CHASSIS.map((c) => (
                <option key={c} value={c}>
                  {ITEM_CATEGORY_LABELS[c]}
                </option>
              ))}
            </Select>
          </Field>
          <p className="mt-2 text-xs text-text-dim">
            Trocar o chassi limpa os números da forma anterior e abre o
            formulário certo (espada ≠ manto ≠ runa).
          </p>
        </Panel>
      )}
      {draft.category === 'weapon' && (
        <WeaponFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'armor' && (
        <ArmorFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'shield' && (
        <ShieldFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'ammunition' && (
        <AmmoFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'rune' && (
        <RuneFields draft={draft} onChange={onChange} />
      )}
      {(draft.category === 'worn' ||
        draft.category === 'held' ||
        draft.category === 'apex' ||
        draft.category === 'tattoo' ||
        draft.category === 'assistive') && (
        <WornHeldFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'staff' && (
        <StaffFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'wand' && (
        <WandFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'consumable' && (
        <ConsumableFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'alchemical' && (
        <AlchemicalFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'snare' && (
        <SnareFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'grimoire' && (
        <GrimoireFields draft={draft} onChange={onChange} />
      )}
      {draft.category === 'spellheart' && (
        <SpellheartFields draft={draft} onChange={onChange} />
      )}
      {(draft.category === 'adventuringGear' ||
        draft.category === 'material' ||
        draft.category === 'other') &&
        !isArtifactItem(draft) && (
          <Panel title="Uso">
            <p className="text-sm text-text-muted">
              Esta categoria vive na descrição: preço, bulk e o que o item faz
              na mesa. Sem CA, sem dado de arma.
            </p>
          </Panel>
        )}
    </>
  )
}

function WeaponFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const w: WeaponStats = draft.weapon ?? {
    proficiency: 'martial',
    rangeType: 'melee',
    damageDie: '1d8',
    damageType: 'slashing',
    group: 'sword',
    hands: '1',
  }
  function patch(partial: Partial<WeaponStats>) {
    onChange({ ...draft, weapon: { ...w, ...partial } })
  }
  return (
    <Panel title="Arma" subtitle="Só a ficha de combate — magia vai em runa ou item específico">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Proficiência">
          <Select
            value={w.proficiency}
            onChange={(e) =>
              patch({
                proficiency: e.target.value as WeaponStats['proficiency'],
              })
            }
          >
            {Object.entries(WEAPON_PROFICIENCY_LABELS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Alcance">
          <Select
            value={w.rangeType}
            onChange={(e) =>
              patch({ rangeType: e.target.value as 'melee' | 'ranged' })
            }
          >
            <option value="melee">Corpo a corpo</option>
            <option value="ranged">À distância</option>
          </Select>
        </Field>
        <Field label="Dado">
          <Select
            value={w.damageDie}
            onChange={(e) => patch({ damageDie: e.target.value })}
          >
            {DAMAGE_DICE.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tipo de dano">
          <Select
            value={w.damageType}
            onChange={(e) => patch({ damageType: e.target.value })}
          >
            {DAMAGE_TYPE_IDS.map((id) => (
              <option key={id} value={id}>
                {DAMAGE_TYPE_LABELS[id]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Grupo">
          <Select
            value={w.group}
            onChange={(e) => patch({ group: e.target.value as WeaponGroupId })}
          >
            {WEAPON_GROUPS.map((g) => (
              <option key={g} value={g}>
                {WEAPON_GROUP_LABELS[g]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Mãos">
          <Select
            value={w.hands ?? '1'}
            onChange={(e) => patch({ hands: e.target.value as WeaponHands })}
          >
            <option value="1">1</option>
            <option value="1+">1+</option>
            <option value="2">2</option>
          </Select>
        </Field>
        {(w.rangeType === 'ranged' ||
          draft.traits.some((t) => t.toLowerCase().includes('thrown'))) && (
          <Field label="Incremento (pés)">
            <Input
              type="number"
              min={0}
              value={w.range ?? ''}
              onChange={(e) =>
                patch({
                  range: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </Field>
        )}
        {w.rangeType === 'ranged' && (
          <Field label="Recarga (ações)" hint="0 = não recarrega">
            <Input
              type="number"
              min={0}
              value={w.reload ?? ''}
              onChange={(e) =>
                patch({
                  reload: e.target.value ? Number(e.target.value) : undefined,
                })
              }
            />
          </Field>
        )}
      </div>
    </Panel>
  )
}

function ArmorFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const a: ArmorStats = draft.armor ?? {
    category: 'medium',
    acBonus: 3,
    dexCap: 2,
    checkPenalty: -2,
    speedPenalty: -5,
    strength: 2,
  }
  function patch(partial: Partial<ArmorStats>) {
    onChange({ ...draft, armor: { ...a, ...partial } })
  }
  return (
    <Panel title="Armadura" subtitle="CA, teto de Destreza e o preço em penalidade">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Categoria">
          <Select
            value={a.category}
            onChange={(e) =>
              patch({
                category: e.target.value as ArmorStats['category'],
              })
            }
          >
            {ARMOR_CATS.map((c) => (
              <option key={c} value={c}>
                {ARMOR_PROFICIENCY_LABELS[c]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Grupo">
          <Select
            value={a.group ?? ''}
            onChange={(e) =>
              patch({
                group: (e.target.value || undefined) as ArmorGroupId | undefined,
              })
            }
          >
            <option value="">Nenhum</option>
            {ARMOR_GROUPS.map((g) => (
              <option key={g} value={g}>
                {ARMOR_GROUP_LABELS[g]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Bônus de CA">
          <Input
            type="number"
            min={0}
            max={8}
            value={a.acBonus}
            onChange={(e) => patch({ acBonus: Number(e.target.value) || 0 })}
          />
        </Field>
        <Field label="Teto de DES" hint="Vazio = sem teto">
          <Input
            type="number"
            min={0}
            max={10}
            value={a.dexCap ?? ''}
            onChange={(e) =>
              patch({
                dexCap: e.target.value === '' ? null : Number(e.target.value),
              })
            }
          />
        </Field>
        <Field label="Penalidade de teste">
          <Input
            type="number"
            max={0}
            value={a.checkPenalty}
            onChange={(e) =>
              patch({ checkPenalty: Number(e.target.value) || 0 })
            }
          />
        </Field>
        <Field label="Penalidade de deslocamento (pés)">
          <Input
            type="number"
            max={0}
            step={5}
            value={a.speedPenalty}
            onChange={(e) =>
              patch({ speedPenalty: Number(e.target.value) || 0 })
            }
          />
        </Field>
        <Field label="Limiar de Força (modificador)" hint="Vazio = nenhum">
          <Input
            type="number"
            min={0}
            value={a.strength ?? ''}
            onChange={(e) =>
              patch({
                strength: e.target.value === '' ? null : Number(e.target.value),
              })
            }
          />
        </Field>
      </div>
    </Panel>
  )
}

function ShieldFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const s = draft.shield ?? {
    acBonus: 2,
    speedPenalty: 0,
    hardness: 5,
    hp: 20,
    bt: 10,
  }
  return (
    <Panel title="Escudo" subtitle="Erguer o Escudo — não é armadura">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Bônus ao erguer">
          <Input
            type="number"
            min={0}
            max={4}
            value={s.acBonus}
            onChange={(e) =>
              onChange({
                ...draft,
                shield: { ...s, acBonus: Number(e.target.value) || 0 },
              })
            }
          />
        </Field>
        <Field label="Penalidade de deslocamento">
          <Input
            type="number"
            max={0}
            value={s.speedPenalty}
            onChange={(e) =>
              onChange({
                ...draft,
                shield: { ...s, speedPenalty: Number(e.target.value) || 0 },
              })
            }
          />
        </Field>
        <Field label="Dureza">
          <Input
            type="number"
            min={0}
            value={s.hardness}
            onChange={(e) =>
              onChange({
                ...draft,
                shield: { ...s, hardness: Number(e.target.value) || 0 },
              })
            }
          />
        </Field>
        <Field label="PV">
          <Input
            type="number"
            min={1}
            value={s.hp}
            onChange={(e) =>
              onChange({
                ...draft,
                shield: { ...s, hp: Number(e.target.value) || 1 },
              })
            }
          />
        </Field>
        <Field label="Limiar de quebrado (BT)">
          <Input
            type="number"
            min={0}
            value={s.bt}
            onChange={(e) =>
              onChange({
                ...draft,
                shield: { ...s, bt: Number(e.target.value) || 0 },
              })
            }
          />
        </Field>
      </div>
    </Panel>
  )
}

function AmmoFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const groups = draft.ammunition?.weaponGroups ?? []
  function toggle(group: WeaponGroupId) {
    const has = groups.includes(group)
    onChange({
      ...draft,
      ammunition: {
        weaponGroups: has
          ? groups.filter((g) => g !== group)
          : [...groups, group],
      },
    })
  }
  return (
    <Panel title="Munição" subtitle="Quais armas disparam isso">
      <div className="flex flex-wrap gap-3">
        {WEAPON_GROUPS.map((g) => (
          <label
            key={g}
            className="flex items-center gap-2 text-sm text-text-muted"
          >
            <input
              type="checkbox"
              checked={groups.includes(g)}
              onChange={() => toggle(g)}
            />
            {WEAPON_GROUP_LABELS[g]}
          </label>
        ))}
      </div>
    </Panel>
  )
}

function RuneFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const r = draft.rune ?? {
    kind: 'property' as const,
    appliesTo: ['weapon'] as RuneAppliesTo[],
    family: 'custom',
    shortLabel: 'homebrew',
  }
  function patch(partial: Partial<typeof r>) {
    onChange({ ...draft, rune: { ...r, ...partial } })
  }
  function toggleTarget(target: RuneAppliesTo) {
    const has = r.appliesTo.includes(target)
    patch({
      appliesTo: has
        ? r.appliesTo.filter((t) => t !== target)
        : [...r.appliesTo, target],
    })
  }
  return (
    <Panel title="Runa" subtitle="Grava em arma, armadura ou escudo — não se empunha">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Tipo">
          <Select
            value={r.kind}
            onChange={(e) =>
              patch({ kind: e.target.value as 'fundamental' | 'property' })
            }
          >
            <option value="fundamental">Fundamental</option>
            <option value="property">Propriedade</option>
          </Select>
        </Field>
        <Field label="Família" hint="Só uma runa por família no item">
          <Input
            value={r.family}
            onChange={(e) => patch({ family: e.target.value })}
          />
        </Field>
        <Field label="Rótulo curto" hint="Ex.: +1, flamejante">
          <Input
            value={r.shortLabel}
            onChange={(e) => patch({ shortLabel: e.target.value })}
          />
        </Field>
        {r.kind === 'fundamental' && (
          <>
            <Field label="Potência (+1/+2/+3)">
              <Input
                type="number"
                min={0}
                max={3}
                value={r.potency ?? ''}
                onChange={(e) =>
                  patch({
                    potency: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </Field>
            <Field label="Dados de Impactante">
              <Input
                type="number"
                min={0}
                max={3}
                value={r.strikingDice ?? ''}
                onChange={(e) =>
                  patch({
                    strikingDice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </Field>
            <Field label="Bônus Resiliente">
              <Input
                type="number"
                min={0}
                max={3}
                value={r.resilientBonus ?? ''}
                onChange={(e) =>
                  patch({
                    resilientBonus: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
              />
            </Field>
          </>
        )}
        {r.kind === 'property' && (
          <Field label="Slots ocupados">
            <Input
              type="number"
              min={1}
              max={3}
              value={r.propertySlots ?? 1}
              onChange={(e) =>
                patch({ propertySlots: Number(e.target.value) || 1 })
              }
            />
          </Field>
        )}
      </div>
      <div className="mt-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
          Grava em
        </p>
        <div className="flex flex-wrap gap-3">
          {RUNE_TARGETS.map((t) => (
            <label
              key={t}
              className="flex items-center gap-2 text-sm text-text-muted"
            >
              <input
                type="checkbox"
                checked={r.appliesTo.includes(t)}
                onChange={() => toggleTarget(t)}
              />
              {t === 'weapon'
                ? 'Arma'
                : t === 'armor'
                  ? 'Armadura'
                  : 'Escudo'}
            </label>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function WornHeldFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const w = draft.wornMagic ?? {}
  const title =
    draft.category === 'apex'
      ? 'Ápice'
      : draft.category === 'held'
        ? 'Item segurado'
        : draft.category === 'tattoo'
          ? 'Tatuagem'
          : draft.category === 'assistive'
            ? 'Item assistivo'
            : 'Item vestido'
  return (
    <Panel
      title={title}
      subtitle={
        draft.category === 'apex'
          ? 'Um atributo +2 — só um ápice funciona por vez'
          : 'Bônus de item e ativação; vestidos pedem investimento'
      }
    >
      {(draft.category === 'worn' ||
        draft.category === 'apex' ||
        draft.category === 'tattoo') && (
        <label className="mb-3 flex items-center gap-2 text-sm text-text-muted">
          <input
            type="checkbox"
            checked={Boolean(draft.requiresInvestiture)}
            onChange={(e) =>
              onChange({
                ...draft,
                requiresInvestiture: e.target.checked || undefined,
              })
            }
          />
          Precisa investir (conta nos 10)
        </label>
      )}
      {draft.category === 'apex' && (
        <Field label="Atributo ápice" className="mb-3">
          <Select
            value={w.apexAttribute ?? 'strength'}
            onChange={(e) =>
              onChange({
                ...draft,
                wornMagic: {
                  ...w,
                  apexAttribute: e.target.value as (typeof ATTRIBUTE_IDS)[number],
                },
              })
            }
          >
            {ATTRIBUTE_IDS.map((id) => (
              <option key={id} value={id}>
                {ATTRIBUTE_LABELS[id]}
              </option>
            ))}
          </Select>
        </Field>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Bônus de perícia">
          <Select
            value={w.skillBonuses?.[0]?.skillId ?? ''}
            onChange={(e) => {
              const skillId = e.target.value as SkillId | ''
              onChange({
                ...draft,
                wornMagic: {
                  ...w,
                  skillBonuses: skillId
                    ? [
                        {
                          skillId,
                          value: w.skillBonuses?.[0]?.value ?? 1,
                        },
                      ]
                    : undefined,
                },
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
        {w.skillBonuses?.[0] && (
          <Field label="Valor do bônus">
            <Input
              type="number"
              min={1}
              max={3}
              value={w.skillBonuses[0]?.value ?? 1}
              onChange={(e) => {
                const skillId = w.skillBonuses?.[0]?.skillId
                if (!skillId) return
                onChange({
                  ...draft,
                  wornMagic: {
                    ...w,
                    skillBonuses: [
                      {
                        skillId,
                        value: Number(e.target.value) || 1,
                      },
                    ],
                  },
                })
              }}
            />
          </Field>
        )}
        <Field label="Bônus em salvaguardas">
          <Input
            type="number"
            min={0}
            max={3}
            value={w.saveBonus ?? ''}
            onChange={(e) =>
              onChange({
                ...draft,
                wornMagic: {
                  ...w,
                  saveBonus: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                },
              })
            }
          />
        </Field>
        <Field label="Bônus em Percepção">
          <Input
            type="number"
            min={0}
            max={3}
            value={w.perceptionBonus ?? ''}
            onChange={(e) =>
              onChange({
                ...draft,
                wornMagic: {
                  ...w,
                  perceptionBonus: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                },
              })
            }
          />
        </Field>
        <Field label="Bônus de deslocamento (pés)">
          <Input
            type="number"
            value={w.speedBonus ?? ''}
            onChange={(e) =>
              onChange({
                ...draft,
                wornMagic: {
                  ...w,
                  speedBonus: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                },
              })
            }
          />
        </Field>
      </div>
      <Field label="Ativação" className="mt-3">
        <ActionRichTextarea
          rows={2}
          value={w.activate ?? ''}
          onChange={(e) =>
            onChange({
              ...draft,
              wornMagic: { ...w, activate: e.target.value || undefined },
            })
          }
        />
      </Field>
      <Field label="Frequência" className="mt-3">
        <Input
          value={w.frequency ?? ''}
          onChange={(e) =>
            onChange({
              ...draft,
              wornMagic: { ...w, frequency: e.target.value || undefined },
            })
          }
        />
      </Field>
      <Field label="Nota / efeito passivo" className="mt-3">
        <ActionRichTextarea
          rows={3}
          value={w.note ?? ''}
          onChange={(e) =>
            onChange({
              ...draft,
              wornMagic: { ...w, note: e.target.value || undefined },
            })
          }
        />
      </Field>
    </Panel>
  )
}

function StaffFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const spells = draft.staff?.spellsByRank ?? []
  return (
    <Panel title="Cajado" subtitle="Magias por grau — tradição coerente">
      <div className="space-y-3">
        {spells.map((entry, index) => (
          <div
            key={entry.rank}
            className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-[5rem_1fr]"
          >
            <Field label="Grau">
              <Input
                type="number"
                min={1}
                max={10}
                value={entry.rank}
                onChange={(e) => {
                  const next = [...spells]
                  next[index] = {
                    ...entry,
                    rank: Number(e.target.value) || 1,
                  }
                  onChange({
                    ...draft,
                    staff: { ...draft.staff, spellsByRank: next },
                  })
                }}
              />
            </Field>
            <Field label="Magias (vírgula)">
              <Input
                value={entry.spellNames.join(', ')}
                onChange={(e) => {
                  const next = [...spells]
                  next[index] = {
                    ...entry,
                    spellNames: splitList(e.target.value),
                    spellIds: [],
                  }
                  onChange({
                    ...draft,
                    staff: { ...draft.staff, spellsByRank: next },
                  })
                }}
              />
            </Field>
          </div>
        ))}
        <Button
          size="sm"
          onClick={() =>
            onChange({
              ...draft,
              staff: {
                spellsByRank: [
                  ...spells,
                  {
                    rank: Math.min(10, (spells.at(-1)?.rank ?? 0) + 1),
                    spellIds: [],
                    spellNames: [],
                  },
                ],
              },
            })
          }
        >
          + Grau
        </Button>
      </div>
      <Field label="Nota ao empunhar" className="mt-3">
        <Input
          value={draft.staff?.wieldNote ?? ''}
          onChange={(e) =>
            onChange({
              ...draft,
              staff: {
                spellsByRank: spells,
                wieldNote: e.target.value || undefined,
              },
            })
          }
        />
      </Field>
    </Panel>
  )
}

function WandFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const w = draft.wand ?? { spellRank: 1 as const, kind: 'generic' as const }
  return (
    <Panel title="Varinha" subtitle="Uma magia, um grau, 1× por dia">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Grau da magia">
          <Input
            type="number"
            min={1}
            max={10}
            value={w.spellRank}
            onChange={(e) =>
              onChange({
                ...draft,
                wand: {
                  ...w,
                  spellRank: Math.min(
                    10,
                    Math.max(1, Number(e.target.value) || 1),
                  ) as Exclude<typeof w.spellRank, 0>,
                },
              })
            }
          />
        </Field>
        <Field label="Tipo">
          <Select
            value={w.kind ?? 'generic'}
            onChange={(e) =>
              onChange({
                ...draft,
                wand: { ...w, kind: e.target.value as NonNullable<typeof w.kind> },
              })
            }
          >
            <option value="generic">Genérica</option>
            <option value="continuation">Continuação</option>
            <option value="widening">Alargamento</option>
            <option value="shardstorm">Saraivada</option>
          </Select>
        </Field>
      </div>
      <Field label="Alteração / nota" className="mt-3">
        <ActionRichTextarea
          rows={2}
          value={w.effectNote ?? ''}
          onChange={(e) =>
            onChange({
              ...draft,
              wand: { ...w, effectNote: e.target.value || undefined },
            })
          }
        />
      </Field>
    </Panel>
  )
}

function consumableSubkind(
  item: ItemDefinition,
): ConsumableKind | 'scroll' | 'talisman' | 'other' {
  if (item.scroll) return 'scroll'
  if (item.talisman) return 'talisman'
  if (item.consumable?.kind) return item.consumable.kind
  return 'other'
}

function ConsumableFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const sub = consumableSubkind(draft)
  return (
    <>
      <Panel title="Tipo de consumível">
        <Field label="O que é">
          <Select
            value={sub}
            onChange={(e) =>
              onChange(
                setConsumableSubkind(
                  draft,
                  e.target.value as
                    | ConsumableKind
                    | 'scroll'
                    | 'talisman'
                    | 'other',
                ),
              )
            }
          >
            {Object.entries(CONSUMABLE_SUBKIND_LABELS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </Panel>
      {draft.consumable && (
        <Panel title="Poção / óleo">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Dados de PV">
              <Input
                value={draft.consumable.hpDice ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    consumable: {
                      ...draft.consumable!,
                      hpDice: e.target.value || undefined,
                    },
                  })
                }
              />
            </Field>
            <Field label="PV fixos">
              <Input
                type="number"
                value={draft.consumable.hpFlat ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    consumable: {
                      ...draft.consumable!,
                      hpFlat: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    },
                  })
                }
              />
            </Field>
            <Field label="Duração">
              <Input
                value={draft.consumable.duration ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    consumable: {
                      ...draft.consumable!,
                      duration: e.target.value || undefined,
                    },
                  })
                }
              />
            </Field>
          </div>
          <Field label="Efeito" className="mt-3">
            <ActionRichTextarea
              rows={3}
              value={draft.consumable.note ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  consumable: {
                    ...draft.consumable!,
                    note: e.target.value || undefined,
                  },
                })
              }
            />
          </Field>
        </Panel>
      )}
      {draft.scroll && (
        <Panel title="Pergaminho">
          <Field label="Grau da magia">
            <Input
              type="number"
              min={1}
              max={10}
              value={draft.scroll.spellRank}
              onChange={(e) =>
                onChange({
                  ...draft,
                  scroll: {
                    spellRank: Math.min(
                      10,
                      Math.max(1, Number(e.target.value) || 1),
                    ) as typeof draft.scroll.spellRank,
                  },
                })
              }
            />
          </Field>
        </Panel>
      )}
      {draft.talisman && (
        <Panel title="Talismã" subtitle="Afixa e dispara num gatilho">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Afixa em">
              <Select
                value={draft.talisman.affixesTo}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    talisman: {
                      ...draft.talisman!,
                      affixesTo: e.target
                        .value as typeof draft.talisman.affixesTo,
                    },
                  })
                }
              >
                {Object.entries(TALISMAN_HOST_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field
              label="Ativação"
              hint="Clique no ícone (1 ação, livre, reação…)."
            >
              <ActionRichTextarea
                rows={2}
                value={draft.talisman.activate}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    talisman: { ...draft.talisman!, activate: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Gatilho">
              <Input
                value={draft.talisman.trigger ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    talisman: {
                      ...draft.talisman!,
                      trigger: e.target.value || undefined,
                    },
                  })
                }
              />
            </Field>
          </div>
          <Field label="Efeito" className="mt-3">
            <ActionRichTextarea
              rows={3}
              value={draft.talisman.note}
              onChange={(e) =>
                onChange({
                  ...draft,
                  talisman: { ...draft.talisman!, note: e.target.value },
                })
              }
            />
          </Field>
        </Panel>
      )}
    </>
  )
}

function AlchemicalFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const kind: AlchemicalKind = draft.alchemical?.kind ?? 'elixir'
  const bomb = draft.alchemical?.bomb
  const elixir = draft.alchemical?.elixir
  const mutagen = draft.alchemical?.mutagen
  const poison = draft.alchemical?.poison
  const tool = draft.alchemical?.tool
  return (
    <>
      <Panel title="Tipo alquímico">
        <Field label="O que é">
          <Select
            value={kind}
            onChange={(e) =>
              onChange(setAlchemicalKind(draft, e.target.value as AlchemicalKind))
            }
          >
            {Object.entries(ALCHEMICAL_KIND_LABELS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
      </Panel>
      {kind === 'bomb' && bomb && (
        <Panel title="Bomba" subtitle="Ataque alquímico + respingo">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Dado">
              <Select
                value={bomb.damageDie ?? '1d8'}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'bomb',
                      bomb: { ...bomb, damageDie: e.target.value },
                    },
                  })
                }
              >
                {DAMAGE_DICE.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Tipo">
              <Select
                value={bomb.damageType}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'bomb',
                      bomb: { ...bomb, damageType: e.target.value },
                    },
                  })
                }
              >
                {DAMAGE_TYPE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {DAMAGE_TYPE_LABELS[id as DamageTypeId]}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Respingo">
              <Input
                type="number"
                min={0}
                value={bomb.splash ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'bomb',
                      bomb: {
                        ...bomb,
                        splash: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="Alcance (pés)">
              <Input
                type="number"
                value={bomb.range ?? 20}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'bomb',
                      bomb: { ...bomb, range: Number(e.target.value) || 20 },
                    },
                  })
                }
              />
            </Field>
            <Field label="Bônus de item no ataque">
              <Input
                type="number"
                min={0}
                max={3}
                value={bomb.attackItemBonus ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'bomb',
                      bomb: {
                        ...bomb,
                        attackItemBonus: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      },
                    },
                  })
                }
              />
            </Field>
          </div>
          <Field label="Efeito no acerto" className="mt-3">
            <Input
              value={bomb.hitEffect ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  alchemical: {
                    kind: 'bomb',
                    bomb: {
                      ...bomb,
                      hitEffect: e.target.value || undefined,
                    },
                  },
                })
              }
            />
          </Field>
        </Panel>
      )}
      {kind === 'elixir' && elixir && (
        <Panel title="Elixir">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Duração">
              <Input
                value={elixir.duration ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'elixir',
                      elixir: {
                        ...elixir,
                        duration: e.target.value || undefined,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="Dados de PV">
              <Input
                value={elixir.hpDice ?? ''}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'elixir',
                      elixir: {
                        ...elixir,
                        hpDice: e.target.value || undefined,
                      },
                    },
                  })
                }
              />
            </Field>
          </div>
          <Field label="Efeito" className="mt-3">
            <ActionRichTextarea
              rows={3}
              value={elixir.note ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  alchemical: {
                    kind: 'elixir',
                    elixir: { ...elixir, note: e.target.value || undefined },
                  },
                })
              }
            />
          </Field>
        </Panel>
      )}
      {kind === 'mutagen' && mutagen && (
        <Panel title="Mutagênico" subtitle="Benefício e desvantagem — os dois">
          <Field label="Duração">
            <Input
              value={mutagen.duration}
              onChange={(e) =>
                onChange({
                  ...draft,
                  alchemical: {
                    kind: 'mutagen',
                    effectFamily: 'mutagen',
                    mutagen: { ...mutagen, duration: e.target.value },
                  },
                })
              }
            />
          </Field>
          <Field label="Benefício" className="mt-3">
            <ActionRichTextarea
              rows={2}
              value={mutagen.benefit}
              onChange={(e) =>
                onChange({
                  ...draft,
                  alchemical: {
                    kind: 'mutagen',
                    effectFamily: 'mutagen',
                    mutagen: { ...mutagen, benefit: e.target.value },
                  },
                })
              }
            />
          </Field>
          <Field label="Desvantagem" className="mt-3">
            <ActionRichTextarea
              rows={2}
              value={mutagen.drawback}
              onChange={(e) =>
                onChange({
                  ...draft,
                  alchemical: {
                    kind: 'mutagen',
                    effectFamily: 'mutagen',
                    mutagen: { ...mutagen, drawback: e.target.value },
                  },
                })
              }
            />
          </Field>
        </Panel>
      )}
      {kind === 'poison' && poison && (
        <Panel title="Veneno" subtitle="CD, exposição e estágios">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Exposição">
              <Select
                value={poison.exposure}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'poison',
                      poison: {
                        ...poison,
                        exposure: e.target
                          .value as typeof poison.exposure,
                      },
                    },
                  })
                }
              >
                {Object.entries(POISON_EXPOSURE_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="CD">
              <Input
                type="number"
                min={10}
                value={poison.dc}
                onChange={(e) =>
                  onChange({
                    ...draft,
                    alchemical: {
                      kind: 'poison',
                      poison: { ...poison, dc: Number(e.target.value) || 15 },
                    },
                  })
                }
              />
            </Field>
          </div>
          {poison.stages.map((stage, index) => (
            <div key={index} className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label={`Estágio ${index + 1} — duração`}>
                <Input
                  value={stage.duration}
                  onChange={(e) => {
                    const stages = [...poison.stages]
                    stages[index] = { ...stage, duration: e.target.value }
                    onChange({
                      ...draft,
                      alchemical: {
                        kind: 'poison',
                        poison: { ...poison, stages },
                      },
                    })
                  }}
                />
              </Field>
              <Field label="Efeito">
                <Input
                  value={stage.effect}
                  onChange={(e) => {
                    const stages = [...poison.stages]
                    stages[index] = { ...stage, effect: e.target.value }
                    onChange({
                      ...draft,
                      alchemical: {
                        kind: 'poison',
                        poison: { ...poison, stages },
                      },
                    })
                  }}
                />
              </Field>
            </div>
          ))}
          <Button
            size="sm"
            className="mt-3"
            onClick={() =>
              onChange({
                ...draft,
                alchemical: {
                  kind: 'poison',
                  poison: {
                    ...poison,
                    stages: [
                      ...poison.stages,
                      { duration: '1 rodada', effect: '' },
                    ],
                  },
                },
              })
            }
          >
            + Estágio
          </Button>
        </Panel>
      )}
      {kind === 'tool' && tool && (
        <Panel title="Ferramenta alquímica">
          <Field label="Duração">
            <Input
              value={tool.duration ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  alchemical: {
                    kind: 'tool',
                    tool: { ...tool, duration: e.target.value || undefined },
                  },
                })
              }
            />
          </Field>
          <Field label="Efeito" className="mt-3">
            <ActionRichTextarea
              rows={3}
              value={tool.note}
              onChange={(e) =>
                onChange({
                  ...draft,
                  alchemical: {
                    kind: 'tool',
                    tool: { ...tool, note: e.target.value },
                  },
                })
              }
            />
          </Field>
        </Panel>
      )}
    </>
  )
}

function SnareFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const s = draft.snare ?? { note: '' }
  return (
    <Panel title="Cilada" subtitle="Armadilha de um uso num quadrado">
      <Field label="CD / salvaguarda">
        <Input
          value={s.save ?? ''}
          onChange={(e) =>
            onChange({
              ...draft,
              snare: { ...s, save: e.target.value || undefined },
            })
          }
        />
      </Field>
      <Field label="Efeito" className="mt-3">
        <ActionRichTextarea
          rows={3}
          value={s.note}
          onChange={(e) =>
            onChange({ ...draft, snare: { ...s, note: e.target.value } })
          }
        />
      </Field>
    </Panel>
  )
}

function GrimoireFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const g = draft.grimoire ?? {
    activate: '1 minuto',
    frequency: '1×/dia',
    note: '',
  }
  return (
    <Panel title="Grimório" subtitle="Um estudado por dia">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Ativação"
          hint="Clique no ícone, ou escreva 1 minuto / 10 minutos."
        >
          <ActionRichTextarea
            rows={2}
            value={g.activate}
            onChange={(e) =>
              onChange({
                ...draft,
                grimoire: { ...g, activate: e.target.value },
              })
            }
          />
        </Field>
        <Field label="Frequência">
          <Input
            value={g.frequency}
            onChange={(e) =>
              onChange({
                ...draft,
                grimoire: { ...g, frequency: e.target.value },
              })
            }
          />
        </Field>
      </div>
      <Field label="Efeito" className="mt-3">
        <ActionRichTextarea
          rows={3}
          value={g.note}
          onChange={(e) =>
            onChange({ ...draft, grimoire: { ...g, note: e.target.value } })
          }
        />
      </Field>
    </Panel>
  )
}

function SpellheartFields({
  draft,
  onChange,
}: {
  draft: ItemDefinition
  onChange: (next: ItemDefinition) => void
}) {
  const s = draft.spellheart ?? {
    affixesTo: 'weapon' as const,
    armorBenefit: '',
    weaponBenefit: '',
    cantrip: '',
  }
  return (
    <Panel
      title="Coração de magia"
      subtitle="Afixa: benefício diferente em arma e em armadura"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Afixa em">
          <Select
            value={s.affixesTo}
            onChange={(e) =>
              onChange({
                ...draft,
                spellheart: {
                  ...s,
                  affixesTo: e.target.value as typeof s.affixesTo,
                },
              })
            }
          >
            {Object.entries(TALISMAN_HOST_LABELS).map(([k, label]) => (
              <option key={k} value={k}>
                {label}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Truque">
          <Input
            value={s.cantrip}
            onChange={(e) =>
              onChange({
                ...draft,
                spellheart: { ...s, cantrip: e.target.value },
              })
            }
          />
        </Field>
      </div>
      <Field label="Em arma" className="mt-3">
        <ActionRichTextarea
          rows={2}
          value={s.weaponBenefit}
          onChange={(e) =>
            onChange({
              ...draft,
              spellheart: { ...s, weaponBenefit: e.target.value },
            })
          }
        />
      </Field>
      <Field label="Em armadura" className="mt-3">
        <ActionRichTextarea
          rows={2}
          value={s.armorBenefit}
          onChange={(e) =>
            onChange({
              ...draft,
              spellheart: { ...s, armorBenefit: e.target.value },
            })
          }
        />
      </Field>
      <Field label="Magias diárias (vírgula)" className="mt-3">
        <Input
          value={(s.dailySpells ?? []).join(', ')}
          onChange={(e) =>
            onChange({
              ...draft,
              spellheart: {
                ...s,
                dailySpells: splitList(e.target.value),
              },
            })
          }
        />
      </Field>
    </Panel>
  )
}
