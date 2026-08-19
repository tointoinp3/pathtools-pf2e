import type { ReactNode } from 'react'
import type { Creature } from '@/types/creature'
import { isHomebrewCreature } from '@/types/creature'
import { ATTRIBUTE_IDS } from '@/types'
import { Badge, ProvenanceBadge, RarityBadge } from '@/components/ui/Badge'
import { DiceButton } from '@/components/dice/DiceButton'
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
import { formatCreatureSense } from '@/features/bestiary/formatCreature'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import {
  ATTRIBUTE_ABBREVIATIONS,
  ATTRIBUTE_LABELS,
  SIZE_LABELS,
  SKILL_LABELS,
  TRADITION_LABELS,
  formatCompanionSpeeds,
  formatModifier,
  formatSourceLabel,
} from '@/utils/labels'

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-surface-3 px-2 py-0.5 text-[11px] text-text-muted">
      {children}
    </span>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
      {children}
    </h3>
  )
}

export function CreatureStatBlock({ creature }: { creature: Creature }) {
  const senseLine = creature.senses.map(formatCreatureSense).join('; ')
  const languageLine =
    creature.languages.length > 0 ? creature.languages.join(', ') : '—'

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] text-text-dim">{creature.originalName}</p>
        {creature.aonUrl ? (
          <a
            href={creature.aonUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-accent hover:underline"
          >
            Archives of Nethys
          </a>
        ) : (
          <span className="text-[11px] text-text-dim">Homebrew</span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone="info">{SIZE_LABELS[creature.size]}</Badge>
        {creature.traits.map((trait) => (
          <Badge key={trait}>{localizeTraitLabel(trait)}</Badge>
        ))}
        {creature.rarity !== 'common' && (
          <RarityBadge rarity={creature.rarity} />
        )}
        {isHomebrewCreature(creature) ? (
          <ProvenanceBadge type="homebrew" />
        ) : (
          <ProvenanceBadge type="official" />
        )}
        <span className="text-[11px] text-text-dim">
          {formatSourceLabel(creature.source, creature.sourcePage)}
        </span>
      </div>

      <CreatureDescription key={creature.id} creature={creature} />

      {creature.recallKnowledge && creature.recallKnowledge.length > 0 && (
        <p className="text-[11px] text-text-dim">
          Recordar Conhecimento:{' '}
          {creature.recallKnowledge
            .map((entry) => `${entry.label} CD ${entry.dc}`)
            .join(' · ')}
        </p>
      )}

      <Panel quiet compact title="Identidade">
        <div className="space-y-2 text-sm">
          <p className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-text">Percepção</span>
            <CombatRollChip
              label={formatModifier(creature.perception)}
              title={`Percepção · ${creature.name}`}
              onClick={() =>
                rollCreatureCheck(
                  creature.name,
                  'Percepção',
                  creature.perception,
                )
              }
            />
            {senseLine ? (
              <span className="text-text-muted">; {senseLine}</span>
            ) : null}
          </p>
          {creature.senses.length > 0 ? (
            <CreatureSensesBlock senses={creature.senses} />
          ) : null}
          <p>
            <span className="font-semibold text-text">Idiomas</span>{' '}
            {languageLine}
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-text">Perícias</span>
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
          </div>
          {creature.items && creature.items.length > 0 && (
            <p>
              <span className="font-semibold text-text">Itens</span>{' '}
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

      <StatStrip>
        {ATTRIBUTE_IDS.map((id) => (
          <StatBox
            key={id}
            flush
            label={ATTRIBUTE_ABBREVIATIONS[id]}
            value={formatModifier(creature.attributes[id])}
            action={
              <DiceButton
                label={`${ATTRIBUTE_LABELS[id]} · ${creature.name}`}
                modifier={creature.attributes[id]}
              />
            }
          />
        ))}
      </StatStrip>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <StatBox label="CA" value={creature.ac} />
        <StatBox
          label="Fort"
          value={formatModifier(creature.fortitude)}
          action={
            <DiceButton
              label={`Fortitude · ${creature.name}`}
              modifier={creature.fortitude}
            />
          }
        />
        <StatBox
          label="Ref"
          value={formatModifier(creature.reflex)}
          action={
            <DiceButton
              label={`Reflexos · ${creature.name}`}
              modifier={creature.reflex}
            />
          }
        />
        <StatBox
          label="Von"
          value={formatModifier(creature.will)}
          action={
            <DiceButton
              label={`Vontade · ${creature.name}`}
              modifier={creature.will}
            />
          }
        />
        <StatBox
          label="PV"
          value={creature.hp}
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {(creature.immunities?.length ||
        creature.weaknesses?.length ||
        creature.resistances?.length) && (
        <CreatureDefensesBlock
          immunities={creature.immunities}
          weaknesses={creature.weaknesses}
          resistances={creature.resistances}
        />
      )}

      {creature.abilities
        .filter((ability) => ability.actionType === 'reaction')
        .map((ability) => (
          <CreatureAbilityBlock
            key={ability.id}
            ability={ability}
            creatureName={creature.name}
          />
        ))}

      <div>
        <SectionLabel>Ofensiva</SectionLabel>
        <p className="mb-2 text-sm">
          <span className="font-semibold text-text">Deslocamento</span>{' '}
          {formatCompanionSpeeds(creature.speeds)}
        </p>
        <ul key={creature.id} className="space-y-1.5">
          {creature.attacks.map((attack) => (
            <CreatureAttackRow
              key={attack.id}
              attack={attack}
              creatureName={creature.name}
            />
          ))}
        </ul>
      </div>

      {creature.spellcasting && (
        <SpellcastingBlock
          creatureName={creature.name}
          spellcasting={creature.spellcasting}
        />
      )}

      {creature.abilities.filter((ability) => ability.actionType !== 'reaction')
        .length > 0 && (
        <div>
          <SectionLabel>Habilidades</SectionLabel>
          <div className="space-y-2">
            {creature.abilities
              .filter((ability) => ability.actionType !== 'reaction')
              .map((ability) => (
                <CreatureAbilityBlock
                  key={ability.id}
                  ability={ability}
                  creatureName={creature.name}
                />
              ))}
          </div>
        </div>
      )}

      <CreatureFamilyLore key={`${creature.id}-family`} creature={creature} />
      <CreatureLoreSections key={`${creature.id}-sidebars`} creature={creature} />
    </div>
  )
}

function SpellcastingBlock({
  creatureName,
  spellcasting,
}: {
  creatureName: string
  spellcasting: NonNullable<Creature['spellcasting']>
}) {
  return (
    <div>
      <SectionLabel>Magias</SectionLabel>
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <Chip>{TRADITION_LABELS[spellcasting.tradition]}</Chip>
        {spellcasting.kind ? (
          <Chip>
            {spellcasting.kind === 'innate'
              ? 'Inata'
              : spellcasting.kind === 'prepared'
                ? 'Preparada'
                : spellcasting.kind === 'spontaneous'
                  ? 'Espontânea'
                  : 'Foco'}
          </Chip>
        ) : null}
        <span className="rounded-lg border border-border/70 bg-surface-2/60 px-2 py-1 text-[11px] tabular-nums text-text-muted">
          CD {spellcasting.dc}
        </span>
        {spellcasting.attack != null && (
          <CombatRollChip
            label="Ataque"
            hint={formatModifier(spellcasting.attack)}
            title={`Ataque de magia · ${creatureName}`}
            onClick={() =>
              rollCreatureCheck(
                creatureName,
                'Ataque de magia',
                spellcasting.attack ?? 0,
              )
            }
          />
        )}
      </div>
      <CreatureSpellList
        spells={spellcasting.spells}
        creatureName={creatureName}
      />
    </div>
  )
}
