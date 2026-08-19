import type { Feat, FeatEffect, Heritage, Rarity, SkillId } from '@/types'
import { RARITIES, SKILL_IDS } from '@/types'
import {
  RARITY_LABELS,
  SKILL_LABELS,
} from '@/utils/labels'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select, Textarea } from '@/components/ui/Field'
import { ActionCost } from '@/components/ui/ActionIcon'
import {
  ActionRichTextarea,
  ActionTypePicker,
} from '@/components/ui/ActionTypePicker'

const ANCESTRY_FEAT_LEVELS = [1, 5, 9, 13, 17]
const CLASS_FEAT_LEVELS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

type EffectKind = 'skillRank' | 'hpFlat' | 'language' | 'speedBonus' | 'specialAbility'

function effectKind(effect: FeatEffect): EffectKind | 'other' {
  if (
    effect.kind === 'skillRank' ||
    effect.kind === 'hpFlat' ||
    effect.kind === 'language' ||
    effect.kind === 'speedBonus' ||
    effect.kind === 'specialAbility'
  ) {
    return effect.kind
  }
  return 'other'
}

function newEffect(kind: EffectKind): FeatEffect {
  if (kind === 'skillRank') {
    return {
      kind: 'skillRank',
      skillId: 'athletics',
      rank: 'trained',
      replaceIfTrained: true,
    }
  }
  if (kind === 'hpFlat') return { kind: 'hpFlat', value: 1 }
  if (kind === 'language') return { kind: 'language', name: '' }
  if (kind === 'speedBonus') return { kind: 'speedBonus', value: 5 }
  return {
    kind: 'specialAbility',
    name: '',
    description: '',
    actionType: 'passive',
  }
}

export function FeatFields({
  draft,
  onChange,
  heritages = [],
  levelHints,
}: {
  draft: Feat
  onChange: (next: Feat) => void
  /** Heranças desta ancestralidade — o feito pode ser só de uma delas. */
  heritages?: Heritage[]
  levelHints?: number[]
}) {
  const levels = levelHints ?? (
    draft.category === 'ancestry' ? ANCESTRY_FEAT_LEVELS : CLASS_FEAT_LEVELS
  )
  const prereqText = (draft.prerequisites ?? [])
    .filter((p) => p.kind === 'text')
    .map((p) => (p.kind === 'text' ? p.label : ''))
    .join('\n')
  const effects = draft.effects ?? []

  function setEffects(next: FeatEffect[]) {
    onChange({ ...draft, effects: next.length ? next : undefined })
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Nome">
          <Input
            value={draft.name}
            onChange={(e) => onChange({ ...draft, name: e.target.value })}
          />
        </Field>
        <Field label="Nome original (inglês)">
          <Input
            value={draft.originalName}
            onChange={(e) =>
              onChange({ ...draft, originalName: e.target.value })
            }
          />
        </Field>
        <Field
          label="Nível"
          hint={
            draft.category === 'ancestry'
              ? 'Oficiais saem no 1, 5, 9, 13 e 17.'
              : 'Marciais: 1º e pares. Conjuradores: pares a partir do 2.'
          }
        >
          <Select
            value={String(draft.level)}
            onChange={(e) =>
              onChange({ ...draft, level: Number(e.target.value) })
            }
          >
            {Array.from(new Set([...levels, draft.level]))
              .sort((a, b) => a - b)
              .map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
          </Select>
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
          label="Custo de ação"
          hint="O ícone aparece ao lado do nome, como nos feitos oficiais."
        >
          <ActionTypePicker
            value={draft.actionType ?? 'passive'}
            includePassive
            onChange={(type) =>
              onChange({
                ...draft,
                actionType: !type || type === 'passive' ? undefined : type,
              })
            }
          />
        </Field>
        {heritages.length > 0 && (
          <Field
            label="Só desta herança?"
            hint="Vazio = qualquer herança deste povo."
          >
            <Select
              value={draft.heritageId ?? ''}
              onChange={(e) =>
                onChange({
                  ...draft,
                  heritageId: e.target.value || null,
                })
              }
            >
              <option value="">Todas as heranças</option>
              {heritages.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name.trim() || 'Herança sem nome'}
                </option>
              ))}
            </Select>
          </Field>
        )}
        <Field label="Traços" hint="Separe por vírgula. Inclua o nome do povo/classe.">
          <Input
            value={draft.traits.join(', ')}
            onChange={(e) =>
              onChange({
                ...draft,
                traits: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </Field>
        <Field label="Frequência" hint="Ex.: 1 vez por dia">
          <Input
            value={draft.frequency ?? ''}
            onChange={(e) =>
              onChange({ ...draft, frequency: e.target.value || undefined })
            }
          />
        </Field>
        {(draft.actionType === 'reaction' || draft.actionType === 'free') && (
          <Field label="Gatilho">
            <Input
              value={draft.trigger ?? ''}
              onChange={(e) =>
                onChange({ ...draft, trigger: e.target.value || undefined })
              }
            />
          </Field>
        )}
      </div>

      <Field
        label="Descrição"
        hint="Clique num ícone para colocar no texto. **negrito** também vale."
      >
        <ActionRichTextarea
          rows={5}
          value={draft.description}
          onChange={(e) => onChange({ ...draft, description: e.target.value })}
        />
      </Field>

      <Field
        label="Pré-requisitos"
        hint="Um por linha. Ex.: visão na penumbra; feito X."
      >
        <Textarea
          rows={2}
          value={prereqText}
          onChange={(e) => {
            const labels = e.target.value
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean)
            onChange({
              ...draft,
              prerequisites: labels.map((label) => ({
                kind: 'text' as const,
                label,
              })),
            })
          }}
        />
      </Field>

      <label className="flex items-center gap-2 text-sm text-text-muted">
        <input
          type="checkbox"
          checked={Boolean(draft.repeatable)}
          onChange={(e) =>
            onChange({ ...draft, repeatable: e.target.checked || undefined })
          }
        />
        Pode ser pego mais de uma vez
      </label>

      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wide text-text-dim">
          Efeitos automáticos na ficha
        </div>
        <p className="text-[11px] text-text-dim">
          Opcional. A maioria dos feitos oficiais é só texto. Use isto quando o
          feito treina uma perícia, dá PV, idioma ou deslocamento de verdade.
        </p>
        {effects.map((effect, index) => {
          const kind = effectKind(effect)
          return (
            <div
              key={`${effect.kind}-${index}`}
              className="grid gap-2 rounded-lg border border-border bg-surface-1 p-2 sm:grid-cols-[8rem_1fr_auto]"
            >
              <Select
                value={kind === 'other' ? 'specialAbility' : kind}
                onChange={(e) => {
                  const next = [...effects]
                  next[index] = newEffect(e.target.value as EffectKind)
                  setEffects(next)
                }}
              >
                <option value="skillRank">Perícia treinada</option>
                <option value="hpFlat">PV extra</option>
                <option value="language">Idioma</option>
                <option value="speedBonus">Deslocamento</option>
                <option value="specialAbility">Habilidade extra</option>
              </Select>
              <div>
                {effect.kind === 'skillRank' && (
                  <Select
                    value={effect.skillId}
                    onChange={(e) => {
                      const next = [...effects]
                      next[index] = {
                        ...effect,
                        skillId: e.target.value as SkillId,
                      }
                      setEffects(next)
                    }}
                  >
                    {SKILL_IDS.map((id) => (
                      <option key={id} value={id}>
                        {SKILL_LABELS[id]}
                      </option>
                    ))}
                  </Select>
                )}
                {effect.kind === 'hpFlat' && (
                  <Input
                    type="number"
                    min={1}
                    max={12}
                    value={effect.value}
                    onChange={(e) => {
                      const next = [...effects]
                      next[index] = {
                        ...effect,
                        value: Number(e.target.value) || 1,
                      }
                      setEffects(next)
                    }}
                  />
                )}
                {effect.kind === 'language' && (
                  <Input
                    placeholder="Nome do idioma"
                    value={effect.name}
                    onChange={(e) => {
                      const next = [...effects]
                      next[index] = { ...effect, name: e.target.value }
                      setEffects(next)
                    }}
                  />
                )}
                {effect.kind === 'speedBonus' && (
                  <Input
                    type="number"
                    min={5}
                    step={5}
                    value={effect.value}
                    onChange={(e) => {
                      const next = [...effects]
                      next[index] = {
                        ...effect,
                        value: Number(e.target.value) || 5,
                      }
                      setEffects(next)
                    }}
                  />
                )}
                {effect.kind === 'specialAbility' && (
                  <div className="space-y-2">
                    <Input
                      placeholder="Nome da habilidade"
                      value={effect.name}
                      onChange={(e) => {
                        const next = [...effects]
                        next[index] = { ...effect, name: e.target.value }
                        setEffects(next)
                      }}
                    />
                    <ActionTypePicker
                      value={effect.actionType ?? 'passive'}
                      includePassive
                      onChange={(type) => {
                        const next = [...effects]
                        next[index] = {
                          ...effect,
                          actionType:
                            !type || type === 'passive' ? 'passive' : type,
                        }
                        setEffects(next)
                      }}
                    />
                    <ActionRichTextarea
                      rows={3}
                      placeholder="O que a habilidade faz"
                      value={effect.description}
                      onChange={(e) => {
                        const next = [...effects]
                        next[index] = {
                          ...effect,
                          description: e.target.value,
                        }
                        setEffects(next)
                      }}
                    />
                  </div>
                )}
                {kind === 'other' && (
                  <p className="text-[11px] text-text-dim">
                    Efeito avançado (mantido da cópia oficial).
                  </p>
                )}
              </div>
              <Button
                size="sm"
                variant="danger"
                onClick={() => setEffects(effects.filter((_, i) => i !== index))}
              >
                Remover
              </Button>
            </div>
          )
        })}
        <Button
          size="sm"
          onClick={() => setEffects([...effects, newEffect('skillRank')])}
        >
          + Efeito automático
        </Button>
      </div>
    </div>
  )
}

export function FeatListEditor({
  feats,
  onChange,
  heritages,
  onAdd,
  levelHints,
}: {
  feats: Feat[]
  onChange: (next: Feat[]) => void
  heritages?: Heritage[]
  onAdd: () => void
  levelHints?: number[]
}) {
  return (
    <div className="space-y-2">
      {feats.length === 0 && (
        <p className="text-sm text-text-muted">
          Nenhum feito ainda. Oficiais trazem um pacote no 1º nível e depois
          nos marcos (5, 9, 13, 17 para raça; pares para classe).
        </p>
      )}
      {feats.map((feat) => (
        <FeatCard
          key={feat.id}
          feat={feat}
          heritages={heritages}
          levelHints={levelHints}
          onChange={(next) =>
            onChange(feats.map((f) => (f.id === next.id ? next : f)))
          }
          onRemove={() => onChange(feats.filter((f) => f.id !== feat.id))}
        />
      ))}
      <Button size="sm" onClick={onAdd}>
        + Feito
      </Button>
    </div>
  )
}

function FeatCard({
  feat,
  heritages,
  levelHints,
  onChange,
  onRemove,
}: {
  feat: Feat
  heritages?: Heritage[]
  levelHints?: number[]
  onChange: (next: Feat) => void
  onRemove: () => void
}) {
  return (
    <details className="rounded-xl border border-border bg-surface-2">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-sm">
        <span className="flex items-center gap-2 font-medium text-text">
          {feat.name.trim() || 'Feito sem nome'}
          <ActionCost type={feat.actionType} />
          <span className="text-[11px] font-normal text-text-dim">
            nv. {feat.level}
            {feat.heritageId
              ? ` · ${heritages?.find((h) => h.id === feat.heritageId)?.name ?? 'herança'}`
              : ''}
          </span>
        </span>
        <span className="text-[11px] text-text-dim">editar</span>
      </summary>
      <div className="space-y-2 border-t border-border p-3">
        <FeatFields
          draft={feat}
          onChange={onChange}
          heritages={heritages}
          levelHints={levelHints}
        />
        <div className="flex justify-end">
          <Button size="sm" variant="danger" onClick={onRemove}>
            Remover feito
          </Button>
        </div>
      </div>
    </details>
  )
}
