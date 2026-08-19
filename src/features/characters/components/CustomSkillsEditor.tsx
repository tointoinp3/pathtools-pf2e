import { useState } from 'react'
import type { AttributeId, CustomSkillEntry, ProficiencyRank } from '@/types'
import { ATTRIBUTE_IDS, PROFICIENCY_RANKS } from '@/types'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  PROFICIENCY_LABELS,
} from '@/utils/labels'
import { createId } from '@/utils/id'
import { Button } from '@/components/ui/Button'
import { Field, Input, Select } from '@/components/ui/Field'
import { Panel } from '@/components/ui/Panel'

interface CustomSkillsEditorProps {
  skills: CustomSkillEntry[]
  onChange: (skills: CustomSkillEntry[]) => void
  /** Versão enxuta para ficar sob o painel de Perícias */
  compact?: boolean
}

export function CustomSkillsEditor({
  skills,
  onChange,
  compact = false,
}: CustomSkillsEditorProps) {
  const [name, setName] = useState('')
  const [attributeId, setAttributeId] = useState<AttributeId>('intelligence')
  const [rank, setRank] = useState<ProficiencyRank>('trained')
  const [open, setOpen] = useState(skills.length > 0)

  function addSkill() {
    const trimmed = name.trim()
    if (!trimmed) return
    onChange([
      ...skills,
      {
        id: createId('cskill'),
        name: trimmed,
        attributeId,
        rank,
      },
    ])
    setName('')
    setRank('trained')
    setOpen(true)
  }

  function updateSkill(id: string, patch: Partial<CustomSkillEntry>) {
    onChange(skills.map((s) => (s.id === id ? { ...s, ...patch } : s)))
  }

  function removeSkill(id: string) {
    onChange(skills.filter((s) => s.id !== id))
  }

  if (compact) {
    return (
      <div className="mt-2 rounded-lg border border-border/60 bg-surface-2/30 px-2 py-1.5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-2 text-left"
        >
          <span className="text-[9px] font-semibold uppercase tracking-wide text-text-dim">
            Perícias homebrew
            {skills.length > 0 ? (
              <span className="ml-1.5 normal-case tracking-normal text-accent">
                ({skills.length})
              </span>
            ) : null}
          </span>
          <span className="text-[10px] text-text-dim">{open ? '▾' : '▸'}</span>
        </button>

        {open && (
          <div className="mt-1.5 space-y-1.5">
            <div className="flex flex-wrap items-end gap-1.5">
              <Input
                className="min-w-[8rem] flex-1 border-border/70 py-0.5 text-[11px]"
                value={name}
                placeholder="Nome (ex.: Pilotagem)"
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') addSkill()
                }}
              />
              <Select
                className="w-auto border-border/70 py-0.5 text-[11px]"
                value={attributeId}
                onChange={(e) => setAttributeId(e.target.value as AttributeId)}
                aria-label="Atributo"
              >
                {ATTRIBUTE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {ATTRIBUTE_ABBREVIATIONS[id]}
                  </option>
                ))}
              </Select>
              <Select
                className="w-auto border-border/70 py-0.5 text-[11px]"
                value={rank}
                onChange={(e) => setRank(e.target.value as ProficiencyRank)}
                aria-label="Proficiência"
              >
                {PROFICIENCY_RANKS.map((r) => (
                  <option key={r} value={r}>
                    {PROFICIENCY_LABELS[r]}
                  </option>
                ))}
              </Select>
              <Button
                size="sm"
                variant="accent"
                onClick={addSkill}
                disabled={!name.trim()}
              >
                +
              </Button>
            </div>

            {skills.length === 0 ? (
              <p className="text-[10px] text-text-dim">
                Nenhuma ainda — só aparece na ficha depois de adicionar.
              </p>
            ) : (
              <ul className="space-y-1">
                {skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="flex flex-wrap items-center gap-1"
                  >
                    <Input
                      className="min-w-[6rem] flex-1 border-border/70 py-0.5 text-[11px]"
                      value={skill.name}
                      onChange={(e) =>
                        updateSkill(skill.id, { name: e.target.value })
                      }
                    />
                    <Select
                      className="w-auto border-border/70 py-0.5 text-[11px]"
                      value={skill.attributeId}
                      onChange={(e) =>
                        updateSkill(skill.id, {
                          attributeId: e.target.value as AttributeId,
                        })
                      }
                    >
                      {ATTRIBUTE_IDS.map((id) => (
                        <option key={id} value={id}>
                          {ATTRIBUTE_ABBREVIATIONS[id]}
                        </option>
                      ))}
                    </Select>
                    <Select
                      className="w-auto border-border/70 py-0.5 text-[11px]"
                      value={skill.rank}
                      onChange={(e) =>
                        updateSkill(skill.id, {
                          rank: e.target.value as ProficiencyRank,
                        })
                      }
                    >
                      {PROFICIENCY_RANKS.map((r) => (
                        <option key={r} value={r}>
                          {PROFICIENCY_LABELS[r]}
                        </option>
                      ))}
                    </Select>
                    <button
                      type="button"
                      className="px-1 text-[10px] text-danger/80 hover:text-danger"
                      onClick={() => removeSkill(skill.id)}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Panel
      title="Perícias Homebrew"
      subtitle="Crie perícias fora da lista oficial — útil para campanhas custom"
    >
      <div className="mt-1 grid gap-2 sm:grid-cols-[1.4fr_1fr_1fr_auto]">
        <Field label="Nome">
          <Input
            value={name}
            placeholder="Ex.: Pilotagem, Alquimia Esotérica…"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addSkill()
            }}
          />
        </Field>
        <Field label="Atributo">
          <Select
            value={attributeId}
            onChange={(e) => setAttributeId(e.target.value as AttributeId)}
          >
            {ATTRIBUTE_IDS.map((id) => (
              <option key={id} value={id}>
                {ATTRIBUTE_LABELS[id]} ({ATTRIBUTE_ABBREVIATIONS[id]})
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Proficiência">
          <Select
            value={rank}
            onChange={(e) => setRank(e.target.value as ProficiencyRank)}
          >
            {PROFICIENCY_RANKS.map((r) => (
              <option key={r} value={r}>
                {PROFICIENCY_LABELS[r]}
              </option>
            ))}
          </Select>
        </Field>
        <div className="flex items-end">
          <Button variant="accent" onClick={addSkill} disabled={!name.trim()}>
            Adicionar
          </Button>
        </div>
      </div>

      {skills.length === 0 ? (
        <p className="mt-3 text-sm text-text-dim">
          Nenhuma perícia custom ainda. Adicione uma acima para aparecer na ficha.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="flex flex-wrap items-center gap-2 px-3 py-2"
            >
              <Input
                className="min-w-[10rem] flex-1"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              />
              <Select
                className="w-auto"
                value={skill.attributeId}
                onChange={(e) =>
                  updateSkill(skill.id, {
                    attributeId: e.target.value as AttributeId,
                  })
                }
              >
                {ATTRIBUTE_IDS.map((id) => (
                  <option key={id} value={id}>
                    {ATTRIBUTE_ABBREVIATIONS[id]}
                  </option>
                ))}
              </Select>
              <Select
                className="w-auto"
                value={skill.rank}
                onChange={(e) =>
                  updateSkill(skill.id, {
                    rank: e.target.value as ProficiencyRank,
                  })
                }
              >
                {PROFICIENCY_RANKS.map((r) => (
                  <option key={r} value={r}>
                    {PROFICIENCY_LABELS[r]}
                  </option>
                ))}
              </Select>
              <Button
                size="sm"
                variant="danger"
                onClick={() => removeSkill(skill.id)}
              >
                Remover
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  )
}
