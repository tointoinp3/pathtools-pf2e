import { useMemo, useState } from 'react'
import type {
  ContentSource,
  Creature,
  CreatureAbility,
  CreatureActionCost,
  CreatureAttack,
  CreatureSense,
  CreatureSize,
  CreatureSkillBonus,
  CreatureSpell,
  Rarity,
  SkillId,
} from '@/types'
import { ATTRIBUTE_IDS, RARITIES, SKILL_IDS } from '@/types'
import type { SenseKind } from '@/types/ancestry'
import type { Pf2ActionType } from '@/components/ui/ActionIcon'
import { ActionCost } from '@/components/ui/ActionIcon'
import {
  ActionRichTextarea,
  ActionTypePicker,
} from '@/components/ui/ActionTypePicker'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'
import { EditorJsonButtons } from '@/features/backup/JsonExchangeButtons'
import { homebrewSourceFromEditor } from '@/features/backup/homebrewBackup'
import { CreatureStatBlock } from '@/features/bestiary/components/CreatureStatBlock'
import { CreatureBuildingGuide } from '@/features/bestiary/components/CreatureBuildingGuide'
import {
  emptyAbility,
  emptyStrike,
  splitList,
} from '@/features/bestiary/homebrewDefaults'
import { SENSE_LABELS } from '@/features/bestiary/formatCreature'
import {
  applyRoadMapToCreature,
  armorClass,
  attributeModifier,
  bandLabelForValue,
  classifyArmorClass,
  classifyAttribute,
  classifyCheck,
  classifyHitPoints,
  classifySkill,
  classifySpellDc,
  classifyStrikeBonus,
  CREATURE_ROAD_MAPS,
  extremeStrengthAllowed,
  hitPointsRange,
  mapFromBonus,
  perceptionBonus,
  resistanceValue,
  saveBonus,
  skillBonus,
  spellDc,
  STAT_BAND_LABELS,
  strikeBonus,
  strikeDamage,
  TYPE_TRAIT_HINTS,
  typicalSpellRank,
  type CreatureRoadMapId,
  type CreatureStatBand,
  safeItemLevel,
} from '@/engine/creatureBuilding'
import { listSpells } from '@/engine/spellCatalog'
import { dcByLevel } from '@/engine/creatureVariant'
import {
  ATTRIBUTE_LABELS,
  RARITY_LABELS,
  SIZE_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
  formatModifier,
} from '@/utils/labels'
import { createId } from '@/utils/id'

const SIZES: CreatureSize[] = [
  'tiny',
  'small',
  'medium',
  'large',
  'huge',
  'gargantuan',
]

const SENSE_KINDS: SenseKind[] = [
  'darkvision',
  'lowLightVision',
  'scent',
  'tremorsense',
  'other',
]

const COMMON_TRAITS = [
  'Aberration',
  'Animal',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Fungus',
  'Giant',
  'Humanoid',
  'Monitor',
  'Ooze',
  'Plant',
  'Undead',
  'Mindless',
  'Amphibious',
  'Aquatic',
  'Incorporeal',
  'Swarm',
]

const CHECK_BANDS: CreatureStatBand[] = [
  'extreme',
  'high',
  'moderate',
  'low',
  'terrible',
]
const AC_BANDS: CreatureStatBand[] = ['extreme', 'high', 'moderate', 'low']
const HP_BANDS: CreatureStatBand[] = ['high', 'moderate', 'low']
const SPELL_BANDS: CreatureStatBand[] = ['extreme', 'high', 'moderate']
const ATTR_BANDS: CreatureStatBand[] = [
  'extreme',
  'high',
  'moderate',
  'low',
  'terrible',
]
const STRIKE_BANDS: CreatureStatBand[] = ['extreme', 'high', 'moderate', 'low']
const SKILL_BANDS: CreatureStatBand[] = ['extreme', 'high', 'moderate', 'low']

const TRADITIONS = ['arcane', 'divine', 'occult', 'primal'] as const
const SPELL_KINDS = ['innate', 'prepared', 'spontaneous', 'focus'] as const
const SPELL_KIND_LABELS: Record<(typeof SPELL_KINDS)[number], string> = {
  innate: 'Inata',
  prepared: 'Preparada',
  spontaneous: 'Espontânea',
  focus: 'Foco',
}

interface CreatureEditorProps {
  initial: Creature
  initialSource?: ContentSource | null
  onSave: (payload: { creature: Creature; source: ContentSource }) => Promise<void>
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

function BandChips({
  bands,
  current,
  valueOf,
  onPick,
}: {
  bands: CreatureStatBand[]
  current: CreatureStatBand | 'custom'
  valueOf: (band: CreatureStatBand) => number | string | null
  onPick: (band: CreatureStatBand, value: number) => void
}) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {bands.map((band) => {
        const raw = valueOf(band)
        if (raw == null) return null
        const n = typeof raw === 'number' ? raw : Number.parseInt(String(raw), 10)
        if (!Number.isFinite(n)) return null
        const active = current === band
        return (
          <button
            key={band}
            type="button"
            title={`${STAT_BAND_LABELS[band]} = ${raw}`}
            className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
              active
                ? 'border-accent bg-accent/20 text-accent'
                : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
            }`}
            onClick={() => onPick(band, n)}
          >
            {STAT_BAND_LABELS[band]} {typeof raw === 'number' ? formatModifier(raw) : raw}
          </button>
        )
      })}
      <span className="text-[10px] text-text-dim">
        agora: {bandLabelForValue(current)}
      </span>
    </div>
  )
}

function asActionCost(
  type: Pf2ActionType | undefined,
  fallback: CreatureActionCost,
): CreatureActionCost {
  if (type === 'one' || type === 'two' || type === 'three' || type === 'free' || type === 'reaction') {
    return type
  }
  return fallback
}

export function CreatureEditor({
  initial,
  initialSource,
  onSave,
  onCancel,
  onDelete,
}: CreatureEditorProps) {
  const [draft, setDraft] = useState<Creature>(initial)
  const [roadMapId, setRoadMapId] = useState<CreatureRoadMapId | null>('soldier')
  const [sourceName, setSourceName] = useState(
    initialSource?.name ?? initial.source ?? 'Homebrew pessoal',
  )
  const [author, setAuthor] = useState(initialSource?.author ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [spellQuery, setSpellQuery] = useState('')
  const [traitDraft, setTraitDraft] = useState('')

  const isNew = initial.name === 'Nova criatura'
  const level = draft.level

  function patch(partial: Partial<Creature>) {
    setDraft((prev) => ({ ...prev, ...partial }))
  }

  function applyMap(id: CreatureRoadMapId) {
    const map = CREATURE_ROAD_MAPS.find((m) => m.id === id)
    if (!map) return
    if (roadMapId === id) {
      setRoadMapId(null)
      return
    }
    setRoadMapId(id)
    setDraft((prev) => applyRoadMapToCreature(prev, map))
  }

  function setLevel(nextLevel: number) {
    const map = CREATURE_ROAD_MAPS.find((m) => m.id === roadMapId)
    setDraft((prev) => {
      const base = { ...prev, level: nextLevel }
      const scaled = map ? applyRoadMapToCreature(base, map) : base
      return {
        ...scaled,
        recallKnowledge: (prev.recallKnowledge ?? []).map((row) => ({
          ...row,
          dc: row.dc === dcByLevel(prev.level) ? dcByLevel(nextLevel) : row.dc,
        })),
      }
    })
  }

  const catalogSpells = useMemo(() => {
    const q = spellQuery.trim().toLowerCase()
    const list = listSpells()
    if (!q) return list.slice(0, 12)
    return list
      .filter(
        (spell) =>
          spell.name.toLowerCase().includes(q) ||
          spell.originalName.toLowerCase().includes(q),
      )
      .slice(0, 20)
  }, [spellQuery])

  function toggleTrait(trait: string) {
    const has = draft.traits.some((t) => t.toLowerCase() === trait.toLowerCase())
    patch({
      traits: has
        ? draft.traits.filter((t) => t.toLowerCase() !== trait.toLowerCase())
        : [...draft.traits, trait],
    })
  }

  function addCustomTrait() {
    const name = traitDraft.trim()
    if (!name) return
    if (!draft.traits.some((t) => t.toLowerCase() === name.toLowerCase())) {
      patch({ traits: [...draft.traits, name] })
    }
    setTraitDraft('')
  }

  async function handleSave() {
    if (!draft.name.trim()) {
      setError('Informe o nome.')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const sourceId = draft.sourceId || createId('source')
      const source: ContentSource = {
        id: sourceId,
        name: sourceName.trim() || 'Homebrew pessoal',
        type: 'homebrew',
        author: author.trim() || undefined,
        createdAt: initialSource?.createdAt,
      }
      const name = draft.name.trim()
      const creature: Creature = {
        ...draft,
        name,
        originalName: draft.originalName.trim() || name,
        source: source.name,
        provenance: { type: 'homebrew' },
        sourceId,
        aonUrl: draft.aonUrl?.trim() ?? '',
        attacks: draft.attacks.map((attack) => ({
          ...attack,
          actionType: attack.actionType || 'one',
          map: attack.map,
        })),
        abilities: draft.abilities.filter((ability) => ability.name.trim()),
        spellcasting:
          draft.spellcasting && draft.spellcasting.spells.length > 0
            ? draft.spellcasting
            : draft.spellcasting?.dc
              ? { ...draft.spellcasting, spells: draft.spellcasting.spells }
              : undefined,
      }
      await onSave({ creature, source })
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const traitHints = draft.traits
    .map((t) => TYPE_TRAIT_HINTS[t])
    .filter(Boolean)

  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold">
          {isNew ? 'Criar criatura homebrew' : 'Editar criatura homebrew'}
        </h1>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <EditorJsonButtons
            filenameStem={`criatura-${draft.name.trim() || 'homebrew'}`}
            getSlice={() => {
              const source = homebrewSourceFromEditor(
                draft.sourceId,
                sourceName,
                author,
                initialSource?.createdAt,
              )
              return {
                creatures: [
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
        <div className="mb-3 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)]">
          <div className="space-y-3">
            <Panel title="Mapa-base" subtitle="Preenche CA, PV, Golpe e o resto pelas tabelas">
              <div className="flex flex-wrap gap-1.5">
                {CREATURE_ROAD_MAPS.map((map) => (
                  <Chip
                    key={map.id}
                    active={roadMapId === map.id}
                    onClick={() => applyMap(map.id)}
                  >
                    {map.name}
                  </Chip>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-text-dim">
                Clique de novo no mapa ativo para soltar (os números ficam). Mudou o
                nível com um mapa marcado: os números acompanham a tabela.
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
                <Field
                  label="Nível"
                  hint="Combate, não “nível social”. Tabelas vão de −1 a 24."
                >
                  <Input
                    type="number"
                    min={-1}
                    max={24}
                    value={draft.level}
                    onChange={(e) => setLevel(Number(e.target.value) || 0)}
                  />
                </Field>
                <Field label="Tamanho">
                  <Select
                    value={draft.size}
                    onChange={(e) =>
                      patch({ size: e.target.value as CreatureSize })
                    }
                  >
                    {SIZES.map((size) => (
                      <option key={size} value={size}>
                        {SIZE_LABELS[size]}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Raridade">
                  <Select
                    value={draft.rarity}
                    onChange={(e) =>
                      patch({ rarity: e.target.value as Rarity })
                    }
                  >
                    {RARITIES.map((rarity) => (
                      <option key={rarity} value={rarity}>
                        {RARITY_LABELS[rarity]}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field
                  label="Fonte homebrew"
                  hint="Aparece na lista do bestiário"
                >
                  <Input
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Autor" className="mt-3">
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Opcional"
                />
              </Field>
              <Field
                label="Traços"
                className="mt-3"
                hint="O tipo (Humanoide, Dragão…) entra na linha da ficha."
              >
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_TRAITS.map((trait) => (
                    <Chip
                      key={trait}
                      active={draft.traits.some(
                        (t) => t.toLowerCase() === trait.toLowerCase(),
                      )}
                      onClick={() => toggleTrait(trait)}
                    >
                      {trait}
                    </Chip>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input
                    value={traitDraft}
                    onChange={(e) => setTraitDraft(e.target.value)}
                    placeholder="Outro traço…"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addCustomTrait()
                      }
                    }}
                  />
                  <Button size="sm" onClick={addCustomTrait}>
                    Adicionar
                  </Button>
                </div>
                {traitHints.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] text-text-dim">
                    {traitHints.map((hint) => (
                      <li key={hint}>{hint}</li>
                    ))}
                  </ul>
                )}
              </Field>
            </Panel>

            <Panel
              title="Atributos"
              subtitle="Alto no especial; o resto moderado ou baixo. Terrível = −5."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {ATTRIBUTE_IDS.map((id) => {
                  const value = draft.attributes[id]
                  return (
                    <Field key={id} label={ATTRIBUTE_LABELS[id]}>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          patch({
                            attributes: {
                              ...draft.attributes,
                              [id]: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                      <div className="mt-1">
                        <BandChips
                          bands={ATTR_BANDS}
                          current={classifyAttribute(level, value)}
                          valueOf={(band) => {
                            if (
                              band === 'extreme' &&
                              id === 'strength' &&
                              !extremeStrengthAllowed(level, draft.size)
                            ) {
                              return attributeModifier(level, band)
                            }
                            return attributeModifier(level, band)
                          }}
                          onPick={(_band, n) =>
                            patch({
                              attributes: { ...draft.attributes, [id]: n },
                            })
                          }
                        />
                      </div>
                    </Field>
                  )
                })}
              </div>
              {!extremeStrengthAllowed(level, draft.size) && (
                <Tip>
                  Força extrema por tamanho só em Grande+ até o 5º, Enorme+ até
                  o 9º, Imenso até o 15º. Depois disso, tamanho sozinho não
                  justifica extremo.
                </Tip>
              )}
            </Panel>

            <Panel title="Percepção, sentidos e idiomas">
              <Field
                label="Percepção"
                hint={`${formatModifier(draft.perception)} neste nível = ${bandLabelForValue(classifyCheck(level, draft.perception))}`}
              >
                <Input
                  type="number"
                  value={draft.perception}
                  onChange={(e) =>
                    patch({ perception: Number(e.target.value) || 0 })
                  }
                />
                <div className="mt-1">
                  <BandChips
                    bands={CHECK_BANDS}
                    current={classifyCheck(level, draft.perception)}
                    valueOf={(band) => perceptionBonus(level, band)}
                    onPick={(_b, n) => patch({ perception: n })}
                  />
                </div>
              </Field>
              <div className="mt-3 space-y-2">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Sentidos
                </p>
                {draft.senses.map((sense, i) => (
                  <div
                    key={`${sense.kind}-${i}`}
                    className="grid gap-2 sm:grid-cols-[8rem_1fr_6rem_auto] sm:items-end"
                  >
                    <Select
                      value={sense.kind}
                      onChange={(e) => {
                        const next = [...draft.senses]
                        next[i] = {
                          ...sense,
                          kind: e.target.value as SenseKind,
                        }
                        patch({ senses: next })
                      }}
                    >
                      {SENSE_KINDS.map((kind) => (
                        <option key={kind} value={kind}>
                          {SENSE_LABELS[kind]}
                        </option>
                      ))}
                    </Select>
                    <Input
                      placeholder="Nome extra (ex.: faro de pecado)"
                      value={sense.name ?? ''}
                      onChange={(e) => {
                        const next = [...draft.senses]
                        next[i] = { ...sense, name: e.target.value }
                        patch({ senses: next })
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="pés"
                      value={sense.range ?? ''}
                      onChange={(e) => {
                        const next = [...draft.senses]
                        const range = e.target.value
                          ? Number(e.target.value)
                          : undefined
                        next[i] = { ...sense, range }
                        patch({ senses: next })
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() =>
                        patch({
                          senses: draft.senses.filter((_, j) => j !== i),
                        })
                      }
                    >
                      Remover
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  onClick={() =>
                    patch({
                      senses: [
                        ...draft.senses,
                        { kind: 'darkvision' } satisfies CreatureSense,
                      ],
                    })
                  }
                >
                  + Sentido
                </Button>
              </div>
              <Field label="Idiomas" className="mt-3" hint="Separados por vírgula. Animal: vazio.">
                <Input
                  value={draft.languages.join(', ')}
                  onChange={(e) => patch({ languages: splitList(e.target.value) })}
                />
              </Field>
            </Panel>

            <Panel title="Perícias" subtitle="No máximo umas três altas; extremo só se for classe mundial.">
              {draft.skills.map((row, i) => (
                <div
                  key={`${row.skillId}-${i}`}
                  className="mb-3 rounded-lg border border-border/70 p-2"
                >
                  <div className="grid gap-2 sm:grid-cols-[1fr_6rem_auto]">
                    <Select
                      value={row.skillId}
                      onChange={(e) => {
                        const next = [...draft.skills]
                        next[i] = {
                          ...row,
                          skillId: e.target.value as SkillId,
                        }
                        patch({ skills: next })
                      }}
                    >
                      {SKILL_IDS.map((id) => (
                        <option key={id} value={id}>
                          {SKILL_LABELS[id]}
                        </option>
                      ))}
                    </Select>
                    <Input
                      type="number"
                      value={row.bonus}
                      onChange={(e) => {
                        const next = [...draft.skills]
                        next[i] = {
                          ...row,
                          bonus: Number(e.target.value) || 0,
                        }
                        patch({ skills: next })
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() =>
                        patch({
                          skills: draft.skills.filter((_, j) => j !== i),
                        })
                      }
                    >
                      Remover
                    </Button>
                  </div>
                  <div className="mt-1">
                    <BandChips
                      bands={SKILL_BANDS}
                      current={classifySkill(level, row.bonus)}
                      valueOf={(band) => skillBonus(level, band)}
                      onPick={(_b, n) => {
                        const next = [...draft.skills]
                        next[i] = { ...row, bonus: n }
                        patch({ skills: next })
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                size="sm"
                onClick={() =>
                  patch({
                    skills: [
                      ...draft.skills,
                      {
                        skillId: 'athletics',
                        bonus: skillBonus(level, 'high'),
                      } satisfies CreatureSkillBonus,
                    ],
                  })
                }
              >
                + Perícia
              </Button>
            </Panel>

            <Panel title="Defesas">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="CA"
                  hint={`Sem Terrível. Extrema pede PV ou salvaguardas menores.`}
                >
                  <Input
                    type="number"
                    value={draft.ac}
                    onChange={(e) => patch({ ac: Number(e.target.value) || 0 })}
                  />
                  <div className="mt-1">
                    <BandChips
                      bands={AC_BANDS}
                      current={classifyArmorClass(level, draft.ac)}
                      valueOf={(band) => armorClass(level, band)}
                      onPick={(_b, n) => patch({ ac: n })}
                    />
                  </div>
                </Field>
                <Field label="PV" hint="Moderado é o padrão. Conjurador: baixo. Bruto: alto.">
                  <Input
                    type="number"
                    value={draft.hp}
                    onChange={(e) => patch({ hp: Number(e.target.value) || 0 })}
                  />
                  <div className="mt-1">
                    <BandChips
                      bands={HP_BANDS}
                      current={classifyHitPoints(level, draft.hp)}
                      valueOf={(band) => {
                        if (band === 'extreme' || band === 'terrible') return null
                        const r = hitPointsRange(level, band)
                        return r.max
                      }}
                      onPick={(_b, n) => patch({ hp: n })}
                    />
                  </div>
                </Field>
                {(
                  [
                    ['fortitude', 'Fortitude'],
                    ['reflex', 'Reflexos'],
                    ['will', 'Vontade'],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key} label={label}>
                    <Input
                      type="number"
                      value={draft[key]}
                      onChange={(e) =>
                        patch({ [key]: Number(e.target.value) || 0 })
                      }
                    />
                    <div className="mt-1">
                      <BandChips
                        bands={CHECK_BANDS}
                        current={classifyCheck(level, draft[key])}
                        valueOf={(band) => saveBonus(level, band)}
                        onPick={(_b, n) => patch({ [key]: n })}
                      />
                    </div>
                  </Field>
                ))}
              </div>
              <Field
                label="Imunidades"
                className="mt-3"
                hint="Separadas por vírgula. Reserve para substância ou biologia (fogo elemental, mental mindless)."
              >
                <Input
                  value={(draft.immunities ?? []).join(', ')}
                  onChange={(e) =>
                    patch({ immunities: splitList(e.target.value) })
                  }
                />
              </Field>
              <p className="mt-3 text-[11px] text-text-dim">
                Resistência/fraqueza neste nível: {resistanceValue(level, 'min')}–
                {resistanceValue(level, 'max')}. Larga e comum = piso; estreita =
                teto. No máximo uma fraqueza.
              </p>
              <ResistList
                label="Fraquezas"
                rows={draft.weaknesses ?? []}
                onChange={(weaknesses) => patch({ weaknesses })}
              />
              <ResistList
                label="Resistências"
                rows={draft.resistances ?? []}
                onChange={(resistances) => patch({ resistances })}
              />
            </Panel>

            <Panel title="Deslocamento" subtitle="Humanoide: 25 pés (7,5 m). Voo de combate à distância: ~7º nível.">
              <div className="grid gap-3 sm:grid-cols-3">
                {(
                  [
                    ['land', 'Terrestre'],
                    ['fly', 'Voo'],
                    ['climb', 'Escalar'],
                    ['swim', 'Nadar'],
                    ['burrow', 'Escavar'],
                  ] as const
                ).map(([key, label]) => (
                  <Field key={key} label={`${label} (pés)`}>
                    <Input
                      type="number"
                      value={draft.speeds[key] ?? ''}
                      onChange={(e) =>
                        patch({
                          speeds: {
                            ...draft.speeds,
                            [key]: e.target.value
                              ? Number(e.target.value)
                              : undefined,
                          },
                        })
                      }
                    />
                  </Field>
                ))}
              </div>
            </Panel>

            <Panel
              title="Golpes"
              subtitle="O ícone de ações fica ao lado do nome, como no Monster Core."
            >
              {draft.attacks.map((attack, i) => (
                <AttackEditor
                  key={attack.id}
                  attack={attack}
                  level={level}
                  onChange={(next) => {
                    const attacks = [...draft.attacks]
                    attacks[i] = next
                    patch({ attacks })
                  }}
                  onRemove={() =>
                    patch({
                      attacks: draft.attacks.filter((_, j) => j !== i),
                    })
                  }
                />
              ))}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() =>
                    patch({
                      attacks: [...draft.attacks, emptyStrike(level)],
                    })
                  }
                >
                  + Golpe corpo a corpo
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const strike = emptyStrike(level)
                    patch({
                      attacks: [
                        ...draft.attacks,
                        {
                          ...strike,
                          id: createId('strike'),
                          name: 'Arco',
                          originalName: 'Bow',
                          kind: 'ranged',
                          damage: strike.damage.replace(
                            /perfurante|cortante|contundente/i,
                            'perfurante',
                          ),
                        },
                      ],
                    })
                  }}
                >
                  + Golpe à distância
                </Button>
              </div>
            </Panel>

            <Panel title="Magias" subtitle="CD única para inata, preparada e espontânea.">
              <div className="mb-2 flex flex-wrap gap-1.5">
                <Chip
                  active={!draft.spellcasting}
                  onClick={() => patch({ spellcasting: undefined })}
                >
                  Sem magia
                </Chip>
                <Chip
                  active={Boolean(draft.spellcasting)}
                  onClick={() =>
                    patch({
                      spellcasting: draft.spellcasting ?? {
                        tradition: 'arcane',
                        kind: 'innate',
                        dc: spellDc(level, 'high')?.dc ?? 17,
                        attack: spellDc(level, 'high')?.attack ?? 9,
                        spells: [],
                      },
                    })
                  }
                >
                  Tem magia
                </Chip>
              </div>
              {draft.spellcasting && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Tradição">
                      <Select
                        value={draft.spellcasting.tradition}
                        onChange={(e) =>
                          patch({
                            spellcasting: {
                              ...draft.spellcasting!,
                              tradition: e.target
                                .value as (typeof TRADITIONS)[number],
                            },
                          })
                        }
                      >
                        {TRADITIONS.map((t) => (
                          <option key={t} value={t}>
                            {TRADITION_LABELS[t]}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Como lança">
                      <Select
                        value={draft.spellcasting.kind ?? 'innate'}
                        onChange={(e) =>
                          patch({
                            spellcasting: {
                              ...draft.spellcasting!,
                              kind: e.target.value as (typeof SPELL_KINDS)[number],
                            },
                          })
                        }
                      >
                        {SPELL_KINDS.map((k) => (
                          <option key={k} value={k}>
                            {SPELL_KIND_LABELS[k]}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field
                      label="CD"
                      hint={`Posto típico de lista: ${typicalSpellRank(level)}º`}
                    >
                      <Input
                        type="number"
                        value={draft.spellcasting.dc}
                        onChange={(e) =>
                          patch({
                            spellcasting: {
                              ...draft.spellcasting!,
                              dc: Number(e.target.value) || 0,
                            },
                          })
                        }
                      />
                      <div className="mt-1">
                        <BandChips
                          bands={SPELL_BANDS}
                          current={classifySpellDc(level, draft.spellcasting.dc)}
                          valueOf={(band) => spellDc(level, band)?.dc ?? null}
                          onPick={(_b, n) => {
                            const row = SPELL_BANDS.map((band) => ({
                              band,
                              row: spellDc(level, band),
                            })).find((x) => x.row?.dc === n)
                            patch({
                              spellcasting: {
                                ...draft.spellcasting!,
                                dc: n,
                                attack: row?.row?.attack ?? draft.spellcasting!.attack,
                              },
                            })
                          }}
                        />
                      </div>
                    </Field>
                    <Field label="Ataque de magia">
                      <Input
                        type="number"
                        value={draft.spellcasting.attack ?? ''}
                        onChange={(e) =>
                          patch({
                            spellcasting: {
                              ...draft.spellcasting!,
                              attack: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            },
                          })
                        }
                      />
                    </Field>
                  </div>
                  <Field
                    label="Buscar no catálogo"
                    className="mt-3"
                    hint="Clique para copiar nome, posto e custo de ação."
                  >
                    <Input
                      value={spellQuery}
                      onChange={(e) => setSpellQuery(e.target.value)}
                      placeholder="Bola de fogo, Fear…"
                    />
                    {spellQuery.trim() && (
                      <div className="mt-1 max-h-40 overflow-y-auto rounded-lg border border-border/70">
                        {catalogSpells.map((spell) => (
                          <button
                            key={spell.id}
                            type="button"
                            className="flex w-full items-center gap-2 px-2 py-1.5 text-left text-xs hover:bg-accent/10"
                            onClick={() => {
                              const entry: CreatureSpell = {
                                id: createId('cspell'),
                                name: spell.name,
                                originalName: spell.originalName,
                                rank: spell.rank,
                                actionType: asActionCost(
                                  spell.actionType,
                                  'two',
                                ),
                              }
                              patch({
                                spellcasting: {
                                  ...draft.spellcasting!,
                                  spells: [
                                    ...draft.spellcasting!.spells,
                                    entry,
                                  ],
                                },
                              })
                              setSpellQuery('')
                            }}
                          >
                            {spell.actionType ? (
                              <ActionCost type={spell.actionType} />
                            ) : null}
                            <span className="font-medium">{spell.name}</span>
                            <span className="text-text-dim">
                              {spell.originalName} · posto {spell.rank}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </Field>
                  {draft.spellcasting.spells.map((spell, i) => (
                    <SpellEditorRow
                      key={spell.id}
                      spell={spell}
                      onChange={(next) => {
                        const spells = [...draft.spellcasting!.spells]
                        spells[i] = next
                        patch({
                          spellcasting: { ...draft.spellcasting!, spells },
                        })
                      }}
                      onRemove={() =>
                        patch({
                          spellcasting: {
                            ...draft.spellcasting!,
                            spells: draft.spellcasting!.spells.filter(
                              (_, j) => j !== i,
                            ),
                          },
                        })
                      }
                    />
                  ))}
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() =>
                      patch({
                        spellcasting: {
                          ...draft.spellcasting!,
                          spells: [
                            ...draft.spellcasting!.spells,
                            {
                              id: createId('cspell'),
                              name: '',
                              originalName: '',
                              rank: typicalSpellRank(level),
                              actionType: 'two',
                            },
                          ],
                        },
                      })
                    }
                  >
                    + Magia livre
                  </Button>
                </>
              )}
            </Panel>

            <Panel
              title="Habilidades"
              subtitle="Escolha o custo: o ícone entra ao lado do nome. Na descrição, clique nos ícones para inserir o símbolo no texto."
            >
              {draft.abilities.map((ability, i) => (
                <AbilityEditor
                  key={ability.id}
                  ability={ability}
                  onChange={(next) => {
                    const abilities = [...draft.abilities]
                    abilities[i] = next
                    patch({ abilities })
                  }}
                  onRemove={() =>
                    patch({
                      abilities: draft.abilities.filter((_, j) => j !== i),
                    })
                  }
                />
              ))}
              <Button
                size="sm"
                onClick={() =>
                  patch({ abilities: [...draft.abilities, emptyAbility()] })
                }
              >
                + Habilidade
              </Button>
            </Panel>

            <Panel title="Itens e lore">
              <Field
                label="Itens"
                hint={`Um item permanente até o nível ${safeItemLevel(level)} (Tabela 2–4). Um por linha.`}
              >
                <Textarea
                  value={(draft.items ?? [])
                    .map((item) =>
                      item.originalName
                        ? `${item.name} | ${item.originalName}`
                        : item.name,
                    )
                    .join('\n')}
                  onChange={(e) =>
                    patch({
                      items: e.target.value
                        .split('\n')
                        .map((line) => line.trim())
                        .filter(Boolean)
                        .map((line) => {
                          const [name, originalName] = line
                            .split('|')
                            .map((p) => p.trim())
                          return { name: name ?? line, originalName }
                        }),
                    })
                  }
                  placeholder="Corta-cão | Dogslicer"
                />
              </Field>
              <Field label="Resumo (lista)" className="mt-3">
                <Textarea
                  value={draft.summary}
                  onChange={(e) => patch({ summary: e.target.value })}
                />
              </Field>
              <Field label="Descrição / lore" className="mt-3">
                <ActionRichTextarea
                  value={draft.description ?? ''}
                  onChange={(e) =>
                    patch({ description: e.target.value })
                  }
                />
              </Field>
              <Field
                label="Recordar conhecimento"
                className="mt-3"
                hint={`CD típica deste nível: ${dcByLevel(level)}`}
              >
                <Input
                  value={(draft.recallKnowledge ?? [])
                    .map((row) => `${row.label} ${row.dc}`)
                    .join('; ')}
                  onChange={(e) => {
                    const rows = e.target.value
                      .split(';')
                      .map((part) => part.trim())
                      .filter(Boolean)
                      .map((part) => {
                        const match = part.match(/^(.*?)(\d+)\s*$/)
                        return {
                          label: (match?.[1] ?? part).trim(),
                          dc: match ? Number(match[2]) : dcByLevel(level),
                        }
                      })
                    patch({ recallKnowledge: rows })
                  }}
                  placeholder="Humanoide (Sociedade) 15"
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
                        'Excluir esta criatura homebrew? Encontros que a usam ficam sem a ficha.',
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

          <div className="space-y-3 xl:sticky xl:top-0 xl:self-start">
            <CreatureBuildingGuide
              level={level}
              compact
              activeRoadMap={roadMapId}
            />
            <Panel title="Prévia da ficha" subtitle="Ícones de ação iguais aos oficiais">
              <CreatureStatBlock creature={draft} />
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResistList({
  label,
  rows,
  onChange,
}: {
  label: string
  rows: Array<{ type: string; value: number }>
  onChange: (next: Array<{ type: string; value: number }>) => void
}) {
  return (
    <div className="mt-2">
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </p>
      {rows.map((row, i) => (
        <div key={`${row.type}-${i}`} className="mb-1 flex gap-2">
          <Input
            placeholder="fogo, cortante…"
            value={row.type}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...row, type: e.target.value }
              onChange(next)
            }}
          />
          <Input
            type="number"
            className="w-20"
            value={row.value}
            onChange={(e) => {
              const next = [...rows]
              next[i] = { ...row, value: Number(e.target.value) || 0 }
              onChange(next)
            }}
          />
          <Button
            size="sm"
            onClick={() => onChange(rows.filter((_, j) => j !== i))}
          >
            ×
          </Button>
        </div>
      ))}
      <Button
        size="sm"
        onClick={() => onChange([...rows, { type: '', value: 5 }])}
      >
        + {label.slice(0, -1)}
      </Button>
    </div>
  )
}

function AttackEditor({
  attack,
  level,
  onChange,
  onRemove,
}: {
  attack: CreatureAttack
  level: number
  onChange: (next: CreatureAttack) => void
  onRemove: () => void
}) {
  const agile = attack.traits.some((t) => t.toLowerCase() === 'agile')
  const strikeBand = classifyStrikeBonus(level, attack.bonus)
  const dmg = strikeDamage(
    level,
    strikeBand === 'custom' || strikeBand === 'terrible' ? 'high' : strikeBand,
  )

  return (
    <div className="mb-3 rounded-xl border border-border/80 bg-surface-2/40 p-3">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <ActionCost type={attack.actionType} />
        <span className="text-sm font-medium">{attack.name || 'Golpe'}</span>
        <span className="text-[11px] text-text-dim">
          {attack.kind === 'melee' ? 'Corpo a corpo' : 'À distância'}
        </span>
      </div>
      <Field
        label="Custo de ação"
        hint="O mesmo ícone da ficha oficial, ao lado do nome."
      >
        <ActionTypePicker
          value={attack.actionType}
          includePassive={false}
          onChange={(type) =>
            onChange({ ...attack, actionType: asActionCost(type, 'one') })
          }
        />
      </Field>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <Field label="Nome">
          <Input
            value={attack.name}
            onChange={(e) => onChange({ ...attack, name: e.target.value })}
          />
        </Field>
        <Field label="Nome original">
          <Input
            value={attack.originalName}
            onChange={(e) =>
              onChange({ ...attack, originalName: e.target.value })
            }
          />
        </Field>
        <Field label="Tipo">
          <Select
            value={attack.kind}
            onChange={(e) =>
              onChange({
                ...attack,
                kind: e.target.value as 'melee' | 'ranged',
              })
            }
          >
            <option value="melee">Corpo a corpo</option>
            <option value="ranged">À distância</option>
          </Select>
        </Field>
        <Field label="Bônus">
          <Input
            type="number"
            value={attack.bonus}
            onChange={(e) => {
              const bonus = Number(e.target.value) || 0
              onChange({
                ...attack,
                bonus,
                map: mapFromBonus(bonus, agile),
              })
            }}
          />
          <div className="mt-1">
            <BandChips
              bands={STRIKE_BANDS}
              current={classifyStrikeBonus(level, attack.bonus)}
              valueOf={(band) => strikeBonus(level, band)}
              onPick={(_b, n) =>
                onChange({
                  ...attack,
                  bonus: n,
                  map: mapFromBonus(n, agile),
                })
              }
            />
          </div>
        </Field>
        <Field label="MAP 2º / 3º">
          <div className="flex gap-2">
            <Input
              type="number"
              value={attack.map[0]}
              onChange={(e) =>
                onChange({
                  ...attack,
                  map: [Number(e.target.value) || 0, attack.map[1]],
                })
              }
            />
            <Input
              type="number"
              value={attack.map[1]}
              onChange={(e) =>
                onChange({
                  ...attack,
                  map: [attack.map[0], Number(e.target.value) || 0],
                })
              }
            />
          </div>
        </Field>
        <Field
          label="Dano"
          hint={dmg ? `Sugestão da faixa do bônus: ${dmg.expr} (média ${dmg.avg})` : undefined}
        >
          <Input
            value={attack.damage}
            onChange={(e) => onChange({ ...attack, damage: e.target.value })}
          />
          <div className="mt-1 flex flex-wrap gap-1">
            {STRIKE_BANDS.map((band) => {
              const row = strikeDamage(level, band)
              if (!row) return null
              return (
                <button
                  key={band}
                  type="button"
                  className="rounded-md border border-border bg-surface-3 px-1.5 py-0.5 text-[10px] text-text-muted hover:border-accent hover:text-accent"
                  onClick={() =>
                    onChange({
                      ...attack,
                      damage: `${row.expr} ${attack.damage.replace(/^[\dd+\s-]+/i, '').trim() || 'perfurante'}`.trim(),
                    })
                  }
                >
                  {STAT_BAND_LABELS[band]} {row.expr}
                </button>
              )
            })}
          </div>
        </Field>
      </div>
      <Field label="Traços do golpe" className="mt-2" hint="Agile recalcula MAP (−4/−8).">
        <Input
          value={attack.traits.join(', ')}
          onChange={(e) => {
            const traits = splitList(e.target.value)
            const nextAgile = traits.some((t) => t.toLowerCase() === 'agile')
            onChange({
              ...attack,
              traits,
              map: mapFromBonus(attack.bonus, nextAgile),
            })
          }}
        />
      </Field>
      <Field label="Mais (Grab, Knockdown…)" className="mt-2">
        <Input
          value={(attack.plus ?? []).join(', ')}
          onChange={(e) =>
            onChange({ ...attack, plus: splitList(e.target.value) })
          }
        />
      </Field>
      <Button size="sm" className="mt-2" onClick={onRemove}>
        Remover golpe
      </Button>
    </div>
  )
}

function SpellEditorRow({
  spell,
  onChange,
  onRemove,
}: {
  spell: CreatureSpell
  onChange: (next: CreatureSpell) => void
  onRemove: () => void
}) {
  return (
    <div className="mt-2 rounded-lg border border-border/70 p-2">
      <div className="mb-2 flex items-center gap-2">
        {spell.actionType ? <ActionCost type={spell.actionType} /> : null}
        <span className="text-sm font-medium">{spell.name || 'Magia'}</span>
      </div>
      <Field label="Custo de ação">
        <ActionTypePicker
          value={spell.actionType}
          includePassive={false}
          includeEmpty
          emptyLabel="Especial"
          onChange={(type) =>
            onChange({
              ...spell,
              actionType: type
                ? asActionCost(type, 'two')
                : undefined,
            })
          }
        />
      </Field>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <Field label="Nome">
          <Input
            value={spell.name}
            onChange={(e) => onChange({ ...spell, name: e.target.value })}
          />
        </Field>
        <Field label="Original (EN)">
          <Input
            value={spell.originalName}
            onChange={(e) =>
              onChange({ ...spell, originalName: e.target.value })
            }
          />
        </Field>
        <Field label="Posto">
          <Input
            type="number"
            min={0}
            max={10}
            value={spell.rank}
            onChange={(e) =>
              onChange({ ...spell, rank: Number(e.target.value) || 0 })
            }
          />
        </Field>
      </div>
      <Button size="sm" className="mt-2" onClick={onRemove}>
        Remover magia
      </Button>
    </div>
  )
}

function AbilityEditor({
  ability,
  onChange,
  onRemove,
}: {
  ability: CreatureAbility
  onChange: (next: CreatureAbility) => void
  onRemove: () => void
}) {
  return (
    <div className="mb-3 rounded-xl border border-border/80 bg-surface-2/40 p-3">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <ActionCost type={ability.actionType} />
        <span className="text-sm font-medium">
          {ability.name || 'Habilidade'}
        </span>
      </div>
      <Field
        label="Custo de ação"
        hint="Passiva não mostra ícone. 1/2/3, livre e reação usam o símbolo oficial."
      >
        <ActionTypePicker
          value={ability.actionType ?? 'passive'}
          includePassive
          onChange={(type) =>
            onChange({
              ...ability,
              actionType: type ?? 'passive',
            })
          }
        />
      </Field>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <Field label="Nome">
          <Input
            value={ability.name}
            onChange={(e) => onChange({ ...ability, name: e.target.value })}
          />
        </Field>
        <Field label="Original (EN)">
          <Input
            value={ability.originalName ?? ''}
            onChange={(e) =>
              onChange({ ...ability, originalName: e.target.value })
            }
          />
        </Field>
      </div>
      {(ability.actionType === 'reaction' || ability.actionType === 'free') && (
        <Field label="Gatilho" className="mt-2">
          <Input
            value={ability.trigger ?? ''}
            onChange={(e) => onChange({ ...ability, trigger: e.target.value })}
          />
        </Field>
      )}
      <Field label="Frequência" className="mt-2">
        <Input
          value={ability.frequency ?? ''}
          onChange={(e) => onChange({ ...ability, frequency: e.target.value })}
        />
      </Field>
      <Field label="Requisitos" className="mt-2">
        <Input
          value={ability.requirements ?? ''}
          onChange={(e) =>
            onChange({ ...ability, requirements: e.target.value })
          }
        />
      </Field>
      <Field label="Descrição" className="mt-2">
        <ActionRichTextarea
          value={ability.description}
          onChange={(e) =>
            onChange({ ...ability, description: e.target.value })
          }
        />
      </Field>
      <Button size="sm" className="mt-2" onClick={onRemove}>
        Remover habilidade
      </Button>
    </div>
  )
}
