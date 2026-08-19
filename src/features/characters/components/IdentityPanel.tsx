import type { CharacterIdentity, CharacterPfsInfo } from '@/types'
import { Field, Input } from '@/components/ui/Field'
import { Panel, Tip } from '@/components/ui/Panel'

interface IdentityPanelProps {
  identity: CharacterIdentity | undefined
  pfs: CharacterPfsInfo | undefined
  onChangeIdentity: (identity: CharacterIdentity) => void
  onChangePfs: (pfs: CharacterPfsInfo) => void
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string
  onChange: (value: string) => void
  rows?: number
}) {
  return (
    <textarea
      className="w-full rounded-lg border border-border bg-surface-2 px-2.5 py-1.5 text-sm text-text"
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function IdentityPanel({
  identity,
  pfs,
  onChangeIdentity,
  onChangePfs,
}: IdentityPanelProps) {
  const current: CharacterIdentity = identity ?? {}
  const currentPfs: CharacterPfsInfo = pfs ?? {}

  function patchIdentity(patch: Partial<CharacterIdentity>) {
    onChangeIdentity({ ...current, ...patch })
  }

  function patchPfs(patch: Partial<CharacterPfsInfo>) {
    onChangePfs({ ...currentPfs, ...patch })
  }

  return (
    <div className="animate-fade-up space-y-3">
      <div>
        <h2 className="font-display text-lg font-semibold tracking-wide text-text">
          Identidade
        </h2>
        <p className="mt-0.5 max-w-xl text-sm text-text-dim">
          Passo 1 do Player Core (conceito) e detalhes finais: idade, aparência,
          personalidade. Nada disso muda números da ficha.
        </p>
      </div>

      <Tip>
        Conceito é a frase curta (“clérigo anão que caça mortos-vivos”). O
        resto é para impressão, Pathfinder Society e o mural de notas.
      </Tip>

      <Panel title="Conceito">
        <Field
          label="Quem é essa pessoa?"
          hint="Uma linha. O assistente de criação trata isto como opcional."
        >
          <Input
            value={current.concept ?? ''}
            onChange={(e) => patchIdentity({ concept: e.target.value })}
            placeholder="Ex.: magus dragonete que cobra favores em tesouro"
          />
        </Field>
      </Panel>

      <Panel title="Detalhes finais">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Idade">
            <Input
              value={current.age ?? ''}
              onChange={(e) => patchIdentity({ age: e.target.value })}
            />
          </Field>
          <Field label="Gênero">
            <Input
              value={current.gender ?? ''}
              onChange={(e) => patchIdentity({ gender: e.target.value })}
            />
          </Field>
          <Field label="Altura">
            <Input
              value={current.height ?? ''}
              onChange={(e) => patchIdentity({ height: e.target.value })}
            />
          </Field>
          <Field label="Peso">
            <Input
              value={current.weight ?? ''}
              onChange={(e) => patchIdentity({ weight: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-3 space-y-3">
          <Field label="Aparência">
            <TextArea
              value={current.appearance ?? ''}
              onChange={(appearance) => patchIdentity({ appearance })}
            />
          </Field>
          <Field label="Personalidade">
            <TextArea
              value={current.personality ?? ''}
              onChange={(personality) => patchIdentity({ personality })}
            />
          </Field>
          <Field label="Crenças">
            <TextArea
              value={current.beliefs ?? ''}
              onChange={(beliefs) => patchIdentity({ beliefs })}
            />
          </Field>
        </div>
      </Panel>

      <Panel
        title="Pathfinder Society"
        subtitle="Opcional — número do jogador e da ficha"
      >
        <div className="grid gap-3 sm:grid-cols-3">
          <Field label="Nº do jogador">
            <Input
              value={currentPfs.playerNumber ?? ''}
              onChange={(e) => patchPfs({ playerNumber: e.target.value })}
              placeholder="123456-2001"
            />
          </Field>
          <Field label="Nº da ficha">
            <Input
              value={currentPfs.characterNumber ?? ''}
              onChange={(e) => patchPfs({ characterNumber: e.target.value })}
            />
          </Field>
          <Field label="Facção">
            <Input
              value={currentPfs.faction ?? ''}
              onChange={(e) => patchPfs({ faction: e.target.value })}
            />
          </Field>
        </div>
      </Panel>
    </div>
  )
}
