import type { ResolvedCharacterSheet } from '@/types'
import { formatModifier } from '@/utils/labels'
import { parseDiceFormula } from '@/utils/dice'
import { useDiceStore } from '@/stores/diceStore'
import {
  spellSourceStatLabel,
  sourceAttackBreakdown,
  mapFlagsFromSheet,
  resolveMapProfile,
} from '@/engine'
import {
  CombatRollChip,
  MapAttackChips,
  rollParsedFormula,
} from '@/features/characters/components/CombatRollChip'
import {
  bestWeaponAttack,
  inferActionCombat,
  skillLabel,
} from '@/features/characters/combatActionStats'

export function CombatActionRolls({
  sheet,
  displayName,
  traits,
  description,
  actionId,
}: {
  sheet: ResolvedCharacterSheet
  displayName: string
  traits?: string[]
  description?: string
  actionId?: string
}) {
  const hints = inferActionCombat({ traits, description, actionId })
  const weapon = hints.attackKind === 'weapon' || hints.useWeaponDamage
    ? bestWeaponAttack(sheet)
    : null
  const classDc = sheet.classDc?.value ?? null
  const spellSources = sheet.spellcasting?.sources ?? []
  const spellDc = sheet.spellcasting?.spellDc ?? null
  const impulseAttack =
    classDc != null ? classDc - 10 : null
  const manySpell = spellSources.length > 1
  const dc = hints.useSpellDc ? spellDc : (spellDc ?? classDc)
  const dcSource = hints.useSpellDc
    ? 'CD de magia'
    : spellDc != null && !classDc
      ? 'CD de magia'
      : 'CD de classe'

  const skillChips = hints.skillIds.map((id) => {
    const skill = sheet.skills.find((s) => s.id === id)
    const modifier = skill?.modifier
    return (
      <CombatRollChip
        key={id}
        label={skillLabel(id)}
        hint={modifier != null ? formatModifier(modifier) : '—'}
        disabled={modifier == null}
        title={`${skillLabel(id)} · ${displayName}`}
        onClick={() => {
          if (modifier == null) return
          useDiceStore.getState().rollCheck(
            `${skillLabel(id)} · ${displayName}`,
            modifier,
            skill?.breakdown,
          )
        }}
      />
    )
  })

  const perception = sheet.derived.perception
  const perceptionChip = hints.perception ? (
    <CombatRollChip
      label="Percepção"
      hint={
        perception.value != null ? formatModifier(perception.value) : '—'
      }
      disabled={perception.value == null}
      title={`Percepção · ${displayName}`}
      onClick={() => {
        if (perception.value == null) return
        useDiceStore.getState().rollCheck(
          `Percepção · ${displayName}`,
          perception.value,
          perception.breakdown?.filter(
            (b): b is { label: string; value: number } =>
              typeof b.value === 'number',
          ),
        )
      }}
    />
  ) : null

  const attackChip =
    hints.attackKind === 'weapon' ? (
      <MapAttackChips
        name={displayName}
        baseBonus={weapon?.bonus ?? null}
        profile={resolveMapProfile(
          weapon?.traits ?? [],
          mapFlagsFromSheet(sheet),
        )}
        breakdown={weapon?.breakdown ?? []}
        disabled={weapon?.bonus == null}
        disabledTitle={
          weapon
            ? `Golpe com ${weapon.name}`
            : 'Equipe uma arma para atacar daqui'
        }
      />
    ) : hints.attackKind === 'spell' ? (
      <>
        {spellSources
          .filter((source) => source.spellAttack != null)
          .map((source) => (
            <CombatRollChip
              key={source.id}
              label={manySpell ? `Ataque ${spellSourceStatLabel(source)}` : 'Ataque'}
              hint={formatModifier(source.spellAttack ?? 0)}
              title={`Ataque de magia · ${source.label}`}
              onClick={() => {
                if (source.spellAttack == null) return
                useDiceStore.getState().rollCheck(
                  `Ataque · ${displayName} · ${source.label}`,
                  source.spellAttack,
                  sourceAttackBreakdown(source),
                )
              }}
            />
          ))}
      </>
    ) : hints.attackKind === 'impulse' ? (
      <CombatRollChip
        label="Ataque"
        hint={
          impulseAttack != null ? formatModifier(impulseAttack) : '—'
        }
        disabled={impulseAttack == null}
        title="Ataque de impulso (CD de classe − 10)"
        onClick={() => {
          if (impulseAttack == null) return
          useDiceStore
            .getState()
            .rollCheck(`Ataque · ${displayName}`, impulseAttack)
        }}
      />
    ) : null

  const damageFromText = hints.damageFormula
  const weaponParsed = hints.useWeaponDamage
    ? parseDiceFormula(weapon?.damageDice)
    : null
  const damageChip = damageFromText ? (
    <CombatRollChip
      label="Dano"
      hint={damageFromText}
      onClick={() =>
        rollParsedFormula(`Dano · ${displayName}`, damageFromText)
      }
    />
  ) : weaponParsed && weapon ? (
    <CombatRollChip
      label="Dano"
      hint={`${weapon.damageDice}${
        weapon.damageModifier ? formatModifier(weapon.damageModifier) : ''
      }`}
      title={weapon.name}
      onClick={() =>
        useDiceStore
          .getState()
          .rollFree(
            weaponParsed.sides,
            weaponParsed.count,
            weapon.damageModifier,
            `Dano · ${displayName}`,
          )
      }
    />
  ) : null

  const dcChip =
    hints.saveLabel && hints.useSpellDc && spellSources.length > 0 ? (
      <>
        {spellSources
          .filter((source) => source.spellDc != null)
          .map((source) => (
            <span
              key={source.id}
              className="rounded-lg border border-border/70 bg-surface-2/60 px-2 py-1 text-[11px] tabular-nums text-text-muted"
              title={source.label}
            >
              CD {source.spellDc} {hints.saveLabel}
              {manySpell ? ` · ${spellSourceStatLabel(source)}` : ''}
            </span>
          ))}
      </>
    ) : hints.saveLabel && dc != null ? (
      <span
        className="rounded-lg border border-border/70 bg-surface-2/60 px-2 py-1 text-[11px] tabular-nums text-text-muted"
        title={dcSource}
      >
        CD {dc} {hints.saveLabel}
      </span>
    ) : null

  if (
    skillChips.length === 0 &&
    !perceptionChip &&
    !attackChip &&
    !damageChip &&
    !dcChip
  ) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {attackChip}
      {damageChip}
      {skillChips}
      {perceptionChip}
      {dcChip}
    </div>
  )
}
