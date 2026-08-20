import type { ReactNode } from 'react'
import type { MythicCalling } from '@/types/mythic'
import type { ResolvedCharacterSheet } from '@/types'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { Panel } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { ActionCost, isPf2ActionType } from '@/components/ui/ActionIcon'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { resolveMythicCalling } from '@/engine/mythic'

function polish(value: string): string {
  return polishRulesText(value.trim())
}

export function MythicCallingFacts({ calling }: { calling: MythicCalling }) {
  return (
    <div className="space-y-3 text-sm">
      <p className="text-text-muted">{polish(calling.summary)}</p>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          Gastar ponto
        </div>
        <RichText className="mt-1">{polish(calling.mythicSpend)}</RichText>
      </div>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          Recuperar ponto
        </div>
        <RichText className="mt-1">{polish(calling.mythicRegain)}</RichText>
      </div>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          Editais
        </div>
        <ul className="mt-1 list-disc space-y-1 pl-4 text-text-muted">
          {calling.edicts.map((item) => (
            <li key={item}>{polish(item)}</li>
          ))}
        </ul>
      </div>
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-text-dim">
          Anátema
        </div>
        <ul className="mt-1 list-disc space-y-1 pl-4 text-text-muted">
          {calling.anathema.map((item) => (
            <li key={item}>{polish(item)}</li>
          ))}
        </ul>
      </div>
      {calling.aonUrl ? (
        <a
          href={calling.aonUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-[11px] text-accent hover:underline"
        >
          Archives of Nethys
        </a>
      ) : null}
    </div>
  )
}

export function MythicCallingCard({
  calling,
  compact = true,
  defaultOpen = false,
  selected = false,
  actions,
}: {
  calling: MythicCalling
  compact?: boolean
  defaultOpen?: boolean
  selected?: boolean
  actions?: ReactNode
}) {
  return (
    <ExpandableCard
      compact={compact}
      defaultOpen={defaultOpen}
      selected={selected}
      title={calling.name}
      subtitle={calling.originalName}
      badges={
        <>
          <Badge className="!text-[9px]">Mítico</Badge>
          <RarityBadge rarity={calling.rarity} />
        </>
      }
      actions={actions}
    >
      <MythicCallingFacts calling={calling} />
    </ExpandableCard>
  )
}

function isMythicPassiveAbility(id: string, actionType?: string): boolean {
  if (!id.startsWith('mythic-')) return false
  if (id.includes('mythic-calling-')) return false
  return actionType === 'passive' || !actionType
}

/** Chamado + regras passivas (recuperar pontos, anátema, morte mítica). */
export function MythicPathPanel({
  sheet,
  title = 'Caminho mítico',
  subtitle = 'gasto, recuperação e anátema',
}: {
  sheet: ResolvedCharacterSheet
  title?: string
  subtitle?: string
}) {
  if (!sheet.mythicActive) return null
  const calling = resolveMythicCalling(sheet.character.mythicCallingId)
  const passives = sheet.specialAbilities.filter((ability) =>
    isMythicPassiveAbility(ability.id, ability.actionType),
  )
  if (!calling && passives.length === 0) return null

  return (
    <Panel compact title={title} subtitle={subtitle}>
      <div className="space-y-1.5">
        {calling ? <MythicCallingCard calling={calling} /> : null}
        {passives.map((ability) => (
          <ExpandableCard
            key={ability.id}
            compact
            title={ability.name}
            subtitle={ability.sourceLabel}
            badges={
              isPf2ActionType(ability.actionType) &&
              ability.actionType !== 'passive' ? (
                <ActionCost type={ability.actionType} />
              ) : (
                <Badge className="!text-[9px]">Passivo</Badge>
              )
            }
          >
            <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
              {polish(ability.description)}
            </RichText>
          </ExpandableCard>
        ))}
      </div>
    </Panel>
  )
}

export function isMythicAbilityId(id: string): boolean {
  return id.startsWith('mythic-')
}
