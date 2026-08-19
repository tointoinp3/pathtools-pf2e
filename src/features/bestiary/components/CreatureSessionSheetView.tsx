import type { Creature } from '@/types/creature'
import { ATTRIBUTE_IDS } from '@/types'
import { Badge, RarityBadge } from '@/components/ui/Badge'
import { Panel, StatBox, StatStrip } from '@/components/ui/Panel'
import { CombatRollChip } from '@/features/characters/components/CombatRollChip'
import { CreatureAttackRow } from '@/features/bestiary/components/CreatureAttackRow'
import { CreatureAbilityBlock } from '@/features/bestiary/components/CreatureAbilityBlock'
import { CreatureSpellList } from '@/features/bestiary/components/CreatureSpellList'
import { CreatureDescription } from '@/features/bestiary/components/CreatureDescription'
import { CreatureFamilyLore } from '@/features/bestiary/components/CreatureFamilyLore'
import { CreatureLoreSections } from '@/features/bestiary/components/CreatureLoreSections'
import { CreatureItemLink } from '@/features/bestiary/components/CreatureItemLink'
import { CreatureDefensesBlock } from '@/features/defenses/components/DefensesPanel'
import { CreatureSensesBlock } from '@/features/senses/components/SensesPanel'
import { rollCreatureCheck } from '@/features/bestiary/creatureRolls'
import { formatCreatureLevel, formatCreatureSense } from '@/features/bestiary/formatCreature'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import {
  ATTRIBUTE_ABBREVIATIONS,
  SIZE_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
  formatCompanionSpeeds,
  formatModifier,
  formatSourceLabel,
} from '@/utils/labels'
import { creatureVariantLabel } from '@/engine/creatureVariant'
import type { CreaturePowerVariant } from '@/types/creature'

export function CreatureSessionSheetView({
  creature,
  variant,
}: {
  creature: Creature
  variant: CreaturePowerVariant
}) {
  const senseLine = creature.senses.map(formatCreatureSense).join('; ')
  const languageLine =
    creature.languages.length > 0 ? creature.languages.join(', ') : '—'
  const variantTag = variant === 'normal' ? null : creatureVariantLabel(variant)

  return (
    <div className="creature-session-sheet space-y-3 text-text print:space-y-2 print:text-black">
      <header className="flex flex-wrap items-end justify-between gap-2 border-b border-accent/40 pb-2 print:border-black">
        <div>
          <p className="text-[10px] uppercase tracking-[0.16em] text-text-dim print:text-neutral-600">
            Ficha de sessão · Bestiário
            {variantTag ? ` · ${variantTag}` : ''}
          </p>
          <h1 className="font-display text-2xl font-semibold tracking-wide print:text-xl">
            {creature.name}
          </h1>
          <p className="text-[11px] text-text-dim print:text-neutral-600">
            {creature.originalName} · Criatura {formatCreatureLevel(creature.level)}{' '}
            · {SIZE_LABELS[creature.size]}
          </p>
        </div>
        <div className="text-right text-[11px] text-text-dim print:text-neutral-600">
          <p>{formatSourceLabel(creature.source, creature.sourcePage)}</p>
          <p className="mt-1 hidden print:block">Iniciativa ______</p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-1 print:gap-0.5">
        {variantTag ? <Badge tone="info">{variantTag}</Badge> : null}
        <Badge tone="info">{SIZE_LABELS[creature.size]}</Badge>
        {creature.traits.map((trait) => (
          <Badge key={trait}>{localizeTraitLabel(trait)}</Badge>
        ))}
        {creature.rarity !== 'common' && <RarityBadge rarity={creature.rarity} />}
      </div>

      <CreatureDescription key={creature.id} creature={creature} compact />

      {creature.recallKnowledge && creature.recallKnowledge.length > 0 && (
        <p className="text-[11px] text-text-dim print:text-neutral-700">
          Recordar Conhecimento:{' '}
          {creature.recallKnowledge
            .map((entry) => `${entry.label} CD ${entry.dc}`)
            .join(' · ')}
        </p>
      )}

      <Panel compact title="Identidade" className="print:break-inside-avoid">
        <div className="space-y-1.5 text-[13px] print:text-[11px]">
          <p>
            <span className="font-semibold">Percepção</span>{' '}
            <CombatRollChip
              label={formatModifier(creature.perception)}
              title={`Percepção · ${creature.name}`}
              onClick={() =>
                rollCreatureCheck(creature.name, 'Percepção', creature.perception)
              }
            />
            {senseLine ? (
              <span className="text-text-muted print:text-neutral-700">
                {' '}
                ; {senseLine}
              </span>
            ) : null}
          </p>
          {creature.senses.length > 0 ? (
            <div className="print:break-inside-avoid">
              <CreatureSensesBlock senses={creature.senses} />
            </div>
          ) : null}
          <p>
            <span className="font-semibold">Idiomas</span> {languageLine}
          </p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold">Perícias</span>
            {creature.skills.length === 0 ? (
              <span className="text-text-dim">—</span>
            ) : (
              creature.skills.map((entry) => (
                <CombatRollChip
                  key={entry.skillId}
                  label={SKILL_LABELS[entry.skillId]}
                  hint={formatModifier(entry.bonus)}
                  title={`${SKILL_LABELS[entry.skillId]} · ${creature.name}`}
                  onClick={() =>
                    rollCreatureCheck(
                      creature.name,
                      SKILL_LABELS[entry.skillId],
                      entry.bonus,
                    )
                  }
                />
              ))
            )}
          </p>
          {creature.items && creature.items.length > 0 && (
            <p>
              <span className="font-semibold">Itens</span>{' '}
              {creature.items.map((item, index) => (
                <span key={`${item.name}-${index}`}>
                  {index > 0 ? ', ' : null}
                  <CreatureItemLink item={item} />
                </span>
              ))}
            </p>
          )}
        </div>
      </Panel>

      <Panel compact title="Atributos" className="print:break-inside-avoid">
        <StatStrip>
          {ATTRIBUTE_IDS.map((id) => (
            <StatBox
              key={id}
              flush
              label={ATTRIBUTE_ABBREVIATIONS[id]}
              value={formatModifier(creature.attributes[id])}
            />
          ))}
        </StatStrip>
      </Panel>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 print:grid-cols-5">
        <StatBox label="CA" value={creature.ac} />
        <StatBox label="Fort" value={formatModifier(creature.fortitude)} />
        <StatBox label="Ref" value={formatModifier(creature.reflex)} />
        <StatBox label="Von" value={formatModifier(creature.will)} />
        <StatBox
          label="PV"
          value={creature.hp}
          className="col-span-2 sm:col-span-1"
        />
      </div>
      <p className="hidden text-[11px] text-neutral-600 print:block">
        PV atuais ______ / {creature.hp}
        {'   '}
        Iniciativa ______
      </p>

      {(creature.immunities?.length ||
        creature.weaknesses?.length ||
        creature.resistances?.length) && (
        <div className="print:break-inside-avoid">
          <CreatureDefensesBlock
            immunities={creature.immunities}
            weaknesses={creature.weaknesses}
            resistances={creature.resistances}
          />
        </div>
      )}

      <Panel compact title="Ofensiva" className="print:break-inside-avoid">
        <p className="mb-2 text-[13px] print:text-[11px]">
          <span className="font-semibold">Deslocamento</span>{' '}
          {formatCompanionSpeeds(creature.speeds)}
        </p>
        <ul className="space-y-1.5">
          {creature.attacks.map((attack) => (
            <CreatureAttackRow
              key={attack.id}
              attack={attack}
              creatureName={creature.name}
              alwaysOpen
            />
          ))}
        </ul>
      </Panel>

      {creature.spellcasting && (
        <Panel compact title="Magias" className="print:break-inside-avoid">
          <p className="mb-2 text-[12px] text-text-muted print:text-[11px] print:text-neutral-700">
            {TRADITION_LABELS[creature.spellcasting.tradition]} · CD{' '}
            {creature.spellcasting.dc}
            {creature.spellcasting.attack != null
              ? ` · ataque ${formatModifier(creature.spellcasting.attack)}`
              : ''}
          </p>
          <CreatureSpellList
            spells={creature.spellcasting.spells}
            creatureName={creature.name}
          />
        </Panel>
      )}

      {creature.abilities.length > 0 && (
        <Panel compact title="Habilidades" className="print:break-inside-avoid">
          <div className="space-y-2">
            {creature.abilities.map((ability) => (
              <CreatureAbilityBlock
                key={ability.id}
                ability={ability}
                creatureName={creature.name}
                compact
              />
            ))}
          </div>
        </Panel>
      )}

      <CreatureFamilyLore key={`${creature.id}-family`} creature={creature} />
      <CreatureLoreSections key={`${creature.id}-sidebars`} creature={creature} />
    </div>
  )
}
