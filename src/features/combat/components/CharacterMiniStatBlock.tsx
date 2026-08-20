import { useState, type ReactNode } from 'react'
import type {
  CombatTokenAbility,
  CombatTokenSpell,
  CombatTokenStrike,
} from '@/types'
import type { CombatToken } from '@/types/combat'
import { ATTRIBUTE_IDS } from '@/types'
import { ActionCost } from '@/components/ui/ActionIcon'
import { Badge } from '@/components/ui/Badge'
import { DiceButton } from '@/components/dice/DiceButton'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { Panel, StatBox, StatStrip } from '@/components/ui/Panel'
import { RichText } from '@/components/ui/RichText'
import { TraitTipList } from '@/components/ui/TraitTip'
import { getSpellById } from '@/engine'
import { tokenConditionEffects } from '@/engine/combat'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import {
  formatDamageHint,
  rollCreatureCheck,
  rollCreatureDamage,
} from '@/features/bestiary/creatureRolls'
import { CombatRollChip } from '@/features/characters/components/CombatRollChip'
import { withLocalizedSpell } from '@/features/spells/localizeSpells'
import { parseDamageExpression } from '@/utils/dice'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  formatModifier,
  formatSpeedMeters,
} from '@/utils/labels'

const MAP_LABELS = ['1º', '2º', '3º'] as const

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
      {children}
    </h3>
  )
}

function abilityActionType(
  type: string | undefined,
): 'one' | 'two' | 'three' | 'free' | 'reaction' | undefined {
  if (
    type === 'one' ||
    type === 'two' ||
    type === 'three' ||
    type === 'free' ||
    type === 'reaction'
  ) {
    return type
  }
  return undefined
}

/**
 * Ficha resumida do jogador no combate, no mesmo formato do statblock de
 * criatura: percepção, perícias, atributos, defesas, golpes com MAP,
 * magias e habilidades. Os números vêm congelados da importação
 * (botão “Sincronizar” atualiza).
 */
export function CharacterMiniStatBlock({ token }: { token: CombatToken }) {
  const summary = token.characterSummary
  const info = tokenConditionEffects(token)
  const effInitiative = info.effectiveInitiativeBonus

  const identityLine = [summary?.ancestryName, summary?.className]
    .filter(Boolean)
    .join(' · ')

  const abilities = summary?.abilities ?? []
  const reactions = abilities.filter(
    (ability) => abilityActionType(ability.actionType) === 'reaction',
  )
  const otherAbilities = abilities.filter(
    (ability) => abilityActionType(ability.actionType) !== 'reaction',
  )

  return (
    <div className="space-y-3">
      <Panel quiet compact title="Identidade">
        <div className="space-y-2 text-sm">
          {identityLine ? (
            <p className="text-[11px] text-text-dim">
              {identityLine}
              {token.level != null ? ` · Nível ${token.level}` : ''}
            </p>
          ) : null}
          <p className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-text">Percepção</span>
            <CombatRollChip
              label={formatModifier(effInitiative)}
              hint={
                effInitiative !== token.initiativeBonus
                  ? `base ${formatModifier(token.initiativeBonus)}`
                  : undefined
              }
              title={`Percepção/iniciativa · ${token.name}`}
              onClick={() =>
                rollCreatureCheck(token.name, 'Percepção', effInitiative)
              }
            />
            {summary?.senses && summary.senses.length > 0 ? (
              <span className="text-text-muted">
                ; {summary.senses.join(', ')}
              </span>
            ) : null}
          </p>
          {summary?.languages && summary.languages.length > 0 ? (
            <p>
              <span className="font-semibold text-text">Idiomas</span>{' '}
              {summary.languages.join(', ')}
            </p>
          ) : null}
          {summary?.skills && summary.skills.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-text">Perícias</span>
              {summary.skills.map((skill) => (
                <CombatRollChip
                  key={skill.name}
                  label={skill.name}
                  hint={formatModifier(skill.modifier)}
                  title={`${skill.name} · ${token.name}`}
                  onClick={() =>
                    rollCreatureCheck(token.name, skill.name, skill.modifier)
                  }
                />
              ))}
            </div>
          ) : null}
        </div>
      </Panel>

      {summary?.attributes ? (
        <StatStrip>
          {ATTRIBUTE_IDS.map((id) => {
            const modifier = summary.attributes?.[id]
            return (
              <StatBox
                key={id}
                flush
                label={ATTRIBUTE_ABBREVIATIONS[id]}
                value={modifier != null ? formatModifier(modifier) : '—'}
                action={
                  modifier != null ? (
                    <DiceButton
                      label={`${ATTRIBUTE_LABELS[id]} · ${token.name}`}
                      modifier={modifier}
                    />
                  ) : undefined
                }
              />
            )
          })}
        </StatStrip>
      ) : null}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <StatBox
          label="CA"
          value={info.effectiveAc ?? token.ac ?? '—'}
          hint={
            info.acPenalty > 0 && token.ac != null
              ? `base ${token.ac}`
              : undefined
          }
        />
        <SaveBox
          label="Fort"
          rollLabel="Fortitude"
          tokenName={token.name}
          base={summary?.fortitude ?? null}
          penalty={info.savePenalties.fortitude}
        />
        <SaveBox
          label="Ref"
          rollLabel="Reflexos"
          tokenName={token.name}
          base={summary?.reflex ?? null}
          penalty={info.savePenalties.reflex}
        />
        <SaveBox
          label="Von"
          rollLabel="Vontade"
          tokenName={token.name}
          base={summary?.will ?? null}
          penalty={info.savePenalties.will}
        />
        <StatBox
          label="PV"
          value={`${token.currentHp}/${info.effectiveMaxHp}`}
          hint={
            info.hpMaxPenalty > 0 ? `máx. base ${token.maxHp}` : undefined
          }
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {summary?.classDc != null ? (
        <div className="flex flex-wrap items-center gap-1.5 text-sm">
          <span className="rounded-full border border-border bg-surface-3 px-2 py-0.5 text-[11px] text-text-muted">
            CD de classe {summary.classDc}
          </span>
        </div>
      ) : null}

      {reactions.map((ability) => (
        <AbilityCard key={ability.name} ability={ability} />
      ))}

      <div>
        <SectionLabel>Ofensiva</SectionLabel>
        <p className="mb-2 text-sm">
          <span className="font-semibold text-text">Deslocamento</span>{' '}
          {summary?.speed != null ? formatSpeedMeters(summary.speed) : '—'}
        </p>
        {summary?.strikes && summary.strikes.length > 0 ? (
          <ul className="space-y-1.5">
            {summary.strikes.map((strike, index) => (
              <StrikeRow
                key={`${strike.label}-${index}`}
                strike={strike}
                tokenName={token.name}
              />
            ))}
          </ul>
        ) : (
          <p className="text-[11px] text-text-dim">
            Nenhuma arma no inventário da ficha.
          </p>
        )}
      </div>

      {summary &&
      (summary.spells?.length ||
        summary.spellDc != null ||
        summary.spellAttack != null) ? (
        <SpellsBlock summary={summary} tokenName={token.name} />
      ) : null}

      {otherAbilities.length > 0 ? (
        <div>
          <SectionLabel>Habilidades</SectionLabel>
          <div className="space-y-1.5">
            {otherAbilities.map((ability) => (
              <AbilityCard key={ability.name} ability={ability} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

/** Golpe com 1º/2º/3º ataque (MAP) e dano roláveis, como nas criaturas. */
function StrikeRow({
  strike,
  tokenName,
}: {
  strike: CombatTokenStrike
  tokenName: string
}) {
  const [open, setOpen] = useState(false)
  const penalties = strike.mapPenalties ?? [-5, -10]
  const bonuses: Array<number | null> =
    strike.bonus != null
      ? [strike.bonus, strike.bonus + penalties[0], strike.bonus + penalties[1]]
      : [null, null, null]
  const damageExpression =
    strike.damageDice && strike.damageDice.trim() !== ''
      ? `${strike.damageDice}${
          strike.damageModifier
            ? formatModifier(strike.damageModifier)
            : ''
        }`
      : strike.damage
  const canDamage = Boolean(parseDamageExpression(damageExpression))

  return (
    <li className="rounded-lg border border-border/70 bg-surface-2/40">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-sm hover:bg-accent/8"
      >
        <span className="w-3 shrink-0 text-[10px] text-text-dim" aria-hidden>
          {open ? '▾' : '▸'}
        </span>
        <ActionCost type="one" />
        <span className="font-medium text-text">{strike.label}</span>
        {strike.bonus != null ? (
          <span className="ml-auto text-[11px] text-text-dim">
            {formatModifier(strike.bonus)}
          </span>
        ) : null}
      </button>
      {open ? (
        <div className="space-y-2 border-t border-border/50 px-2.5 py-2">
          {strike.traits && strike.traits.length > 0 ? (
            <p className="text-[12px] text-text-muted">
              <TraitTipList traits={strike.traits} />
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-1.5">
            {bonuses.map((bonus, index) => {
              const mapLabel = MAP_LABELS[index] ?? `${index + 1}º`
              return (
                <CombatRollChip
                  key={mapLabel}
                  label={mapLabel}
                  hint={bonus != null ? formatModifier(bonus) : '—'}
                  disabled={bonus == null}
                  title={
                    bonus != null
                      ? `1d20 ${formatModifier(bonus)} · ${strike.label} (${mapLabel} ataque)`
                      : 'Bônus de ataque pendente na ficha (falta classe/proficiência)'
                  }
                  onClick={() => {
                    if (bonus == null) return
                    rollCreatureCheck(
                      tokenName,
                      `${strike.label} (${mapLabel})`,
                      bonus,
                    )
                  }}
                />
              )
            })}
            <CombatRollChip
              label="Dano"
              hint={
                canDamage ? formatDamageHint(damageExpression) : strike.damage
              }
              title={strike.damage}
              disabled={!canDamage}
              onClick={() =>
                rollCreatureDamage(
                  tokenName,
                  `Dano · ${strike.label}`,
                  damageExpression,
                )
              }
            />
          </div>
          {strike.damage ? (
            <p className="text-[12px] text-text-muted">{strike.damage}</p>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}

/** Magias no formato do statblock de criatura (tradição, CD, lista por posto). */
function SpellsBlock({
  summary,
  tokenName,
}: {
  summary: NonNullable<CombatToken['characterSummary']>
  tokenName: string
}) {
  const groups = groupSpells(summary.spells ?? [])
  return (
    <div>
      <SectionLabel>Magias</SectionLabel>
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        {(summary.spellTraditions ?? []).map((tradition) => (
          <Badge key={tradition} tone="info">
            {tradition}
          </Badge>
        ))}
        {summary.spellDc != null ? <Badge>CD {summary.spellDc}</Badge> : null}
        {summary.spellAttack != null ? (
          <CombatRollChip
            label="Ataque"
            hint={formatModifier(summary.spellAttack)}
            title={`Ataque de magia · ${tokenName}`}
            onClick={() =>
              rollCreatureCheck(
                tokenName,
                'Ataque de magia',
                summary.spellAttack ?? 0,
              )
            }
          />
        ) : null}
      </div>
      {groups.length > 0 ? (
        <div className="space-y-3">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-dim">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.entries.map((entry) => (
                  <SpellCard key={`${entry.kind}-${entry.id}`} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-text-dim">
          Nenhuma magia preparada ou no repertório — monte na ficha do
          personagem e sincronize.
        </p>
      )}
    </div>
  )
}

function SpellCard({ entry }: { entry: CombatTokenSpell }) {
  const raw = getSpellById(entry.id)
  const spell = raw ? withLocalizedSpell(raw) : null
  return (
    <ExpandableCard
      compact
      title={spell?.name ?? entry.label}
      subtitle={`${entry.kind}${entry.expended ? ' · gasta' : ''}`}
      badges={
        <>
          {spell ? <ActionCost type={spell.actionType} /> : null}
          {entry.expended ? <Badge className="!text-[9px]">gasta</Badge> : null}
        </>
      }
    >
      {spell?.summary || spell?.description ? (
        <RichText>{spell.summary || spell.description}</RichText>
      ) : (
        <span className="text-text-dim">Sem texto no catálogo.</span>
      )}
    </ExpandableCard>
  )
}

function spellGroupLabel(entry: CombatTokenSpell): string {
  if (entry.kind === 'Foco') return 'Foco'
  if (entry.kind === 'Ritual') return 'Rituais'
  if (entry.kind === 'Truque' || entry.rank <= 0) return 'Truques'
  return `${entry.rank}º posto`
}

function groupSpells(
  entries: CombatTokenSpell[],
): Array<{ label: string; sort: number; entries: CombatTokenSpell[] }> {
  const byLabel = new Map<
    string,
    { label: string; sort: number; entries: CombatTokenSpell[] }
  >()
  for (const entry of entries) {
    const label = spellGroupLabel(entry)
    const sort =
      entry.kind === 'Foco' ? 100 : entry.kind === 'Ritual' ? 101 : entry.rank
    const group = byLabel.get(label) ?? { label, sort, entries: [] }
    group.entries.push(entry)
    byLabel.set(label, group)
  }
  return [...byLabel.values()].sort((a, b) => a.sort - b.sort)
}

/** Ação/reação/habilidade com custo, gatilho e texto, como nas criaturas. */
function AbilityCard({ ability }: { ability: CombatTokenAbility }) {
  return (
    <ExpandableCard
      compact
      title={ability.name}
      subtitle={ability.sourceLabel}
      badges={<ActionCost type={abilityActionType(ability.actionType)} />}
    >
      <div className="space-y-1.5">
        {ability.traits && ability.traits.length > 0 ? (
          <p className="text-[12px] text-text-muted">
            <TraitTipList traits={ability.traits} />
          </p>
        ) : null}
        {ability.trigger ? (
          <p className="text-[12px]">
            <span className="font-semibold text-text">Gatilho</span>{' '}
            {ability.trigger}
          </p>
        ) : null}
        {ability.frequency ? (
          <p className="text-[12px]">
            <span className="font-semibold text-text">Frequência</span>{' '}
            {ability.frequency}
          </p>
        ) : null}
        {ability.description ? (
          <RichText>{polishRulesText(ability.description)}</RichText>
        ) : (
          <span className="text-text-dim">Sem texto.</span>
        )}
      </div>
    </ExpandableCard>
  )
}

function SaveBox({
  label,
  rollLabel,
  tokenName,
  base,
  penalty,
}: {
  label: string
  rollLabel: string
  tokenName: string
  base: number | null
  penalty: number
}) {
  if (base == null) return <StatBox label={label} value="—" />
  const effective = base - penalty
  return (
    <StatBox
      label={label}
      value={formatModifier(effective)}
      hint={penalty > 0 ? `base ${formatModifier(base)}` : undefined}
      action={
        <DiceButton
          label={`${rollLabel} · ${tokenName}`}
          modifier={effective}
        />
      }
    />
  )
}
