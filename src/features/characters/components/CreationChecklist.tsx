import { Panel } from '@/components/ui/Panel'
import { Button } from '@/components/ui/Button'
import type { CreationChecklist, CreationSectionId } from '@/engine/creationWizard'

export function CreationChecklistBanner({
  checklist,
  onJump,
}: {
  checklist: CreationChecklist
  onJump: (
    section: CreationSectionId,
    ancestryTab?: 'ancestry-main' | 'heritage',
    focusLevel?: number,
  ) => void
}) {
  if (checklist.complete) return null
  const pending = checklist.pendingRequired
  const next = pending[0]
  if (!next) return null

  return (
    <Panel
      compact
      className="mb-3 border-accent/40 bg-accent/5"
      title="Criação da ficha"
      subtitle={`${pending.length} passo${pending.length > 1 ? 's' : ''} obrigatório${pending.length > 1 ? 's' : ''} em aberto`}
      actions={
        <Button
          size="sm"
          variant="accent"
          onClick={() =>
            onJump(next.section, next.ancestryTab, next.focusLevel)
          }
        >
          Ir para: {next.label}
        </Button>
      }
    >
      <ol className="space-y-1 text-xs">
        {checklist.steps
          .filter((s) => s.required)
          .map((step) => (
            <li key={step.id}>
              <button
                type="button"
                onClick={() =>
                  onJump(step.section, step.ancestryTab, step.focusLevel)
                }
                className={`flex w-full items-start gap-2 rounded-md px-1.5 py-1 text-left hover:bg-surface-2 ${
                  step.done ? 'text-text-dim' : 'text-text'
                }`}
              >
                <span className="mt-0.5 w-4 shrink-0 text-center">
                  {step.done ? '✓' : '○'}
                </span>
                <span>
                  <span className="font-medium">{step.label}</span>
                  {step.detail ? (
                    <span className="ml-1 text-text-dim">— {step.detail}</span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}
      </ol>
    </Panel>
  )
}
