import {
  useRef,
  type ChangeEvent,
  type TextareaHTMLAttributes,
} from 'react'
import {
  ActionIcon,
  ACTION_ICON_TYPES,
  ACTION_INSERT_COMBOS,
  ACTION_INSERT_TOKENS,
  ACTION_LABELS_PT,
  insertActionToken,
  type Pf2ActionType,
} from '@/components/ui/ActionIcon'
import { Textarea } from '@/components/ui/Field'
import { RichText } from '@/components/ui/RichText'

const PICKER_TYPES: Pf2ActionType[] = ['passive', ...ACTION_ICON_TYPES]

function chipClass(active: boolean): string {
  return `inline-flex h-8 min-w-8 items-center justify-center rounded-lg border px-1.5 transition-colors ${
    active
      ? 'border-accent bg-accent/20 text-accent'
      : 'border-border bg-surface-3 text-text-muted hover:border-border-strong hover:text-text'
  }`
}

/** Seletor visual do custo (ícones oficiais), para o campo ao lado do nome. */
export function ActionTypePicker({
  value,
  onChange,
  includePassive = true,
  includeEmpty = false,
  emptyLabel = 'Especial',
}: {
  value?: Pf2ActionType | '' | null
  onChange: (next: Pf2ActionType | undefined) => void
  includePassive?: boolean
  includeEmpty?: boolean
  emptyLabel?: string
}) {
  const current = value || undefined
  const types = includePassive
    ? PICKER_TYPES
    : ACTION_ICON_TYPES

  return (
    <div className="flex flex-wrap items-center gap-1">
      {includeEmpty && (
        <button
          type="button"
          title={emptyLabel}
          aria-pressed={!current}
          className={`${chipClass(!current)} px-2 text-[10px] font-medium`}
          onClick={() => onChange(undefined)}
        >
          {emptyLabel}
        </button>
      )}
      {types.map((type) => {
        const active = current === type
        const label =
          type === 'passive' ? 'Passiva' : ACTION_LABELS_PT[type]
        return (
          <button
            key={type}
            type="button"
            title={label}
            aria-label={label}
            aria-pressed={active}
            className={chipClass(active)}
            onClick={() => onChange(type)}
          >
            {type === 'passive' ? (
              <span className="px-1 text-[10px] font-medium">Passiva</span>
            ) : (
              <ActionIcon type={type} />
            )}
          </button>
        )
      })}
    </div>
  )
}

function InsertBar({
  onInsert,
}: {
  onInsert: (token: string) => void
}) {
  return (
    <div className="mb-1 flex flex-wrap items-center gap-1">
      <span className="mr-0.5 text-[10px] font-medium uppercase tracking-wide text-text-dim">
        Ícones
      </span>
      {ACTION_ICON_TYPES.map((type) => (
        <button
          key={type}
          type="button"
          title={`Inserir ${ACTION_LABELS_PT[type]}`}
          aria-label={`Inserir ${ACTION_LABELS_PT[type]}`}
          className={chipClass(false)}
          onClick={() => onInsert(ACTION_INSERT_TOKENS[type])}
        >
          <ActionIcon type={type} />
        </button>
      ))}
      {ACTION_INSERT_COMBOS.map((combo) => (
        <button
          key={combo.token}
          type="button"
          title={`Inserir ${combo.title}`}
          aria-label={`Inserir ${combo.title}`}
          className={`${chipClass(false)} gap-0.5 px-1`}
          onClick={() => onInsert(combo.token)}
        >
          {combo.types.map((type) => (
            <ActionIcon key={type} type={type} />
          ))}
        </button>
      ))}
    </div>
  )
}

/**
 * Textarea de homebrew: barra com os ícones oficiais + prévia.
 * Clique insere `[2 ações]` etc.; o RichText da ficha troca pelo símbolo.
 */
export function ActionRichTextarea({
  value,
  onChange,
  preview = true,
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { preview?: boolean }) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const text = String(value ?? '')

  function insert(token: string) {
    const el = ref.current
    const start = el?.selectionStart ?? text.length
    const end = el?.selectionEnd ?? text.length
    const { next, caret } = insertActionToken(text, token, start, end)
    onChange?.({
      target: { value: next },
    } as ChangeEvent<HTMLTextAreaElement>)
    requestAnimationFrame(() => {
      const node = ref.current
      if (!node) return
      node.focus()
      node.setSelectionRange(caret, caret)
    })
  }

  return (
    <div className={className}>
      <InsertBar onInsert={insert} />
      <Textarea ref={ref} {...props} value={value} onChange={onChange} />
      {preview && text.trim() ? (
        <div className="mt-1.5 rounded-lg border border-border/70 bg-surface-1 px-2.5 py-1.5 text-sm leading-relaxed text-text-muted">
          <RichText as="div">{text}</RichText>
        </div>
      ) : null}
    </div>
  )
}
