import { type ReactNode } from 'react'
import type {
  AlchemistSignatureKit,
  CatalogSignatureItem,
  CharacterClassTrackers,
  ClassSignatureKit,
  CommanderSignatureKit,
  ExemplarSignatureKit,
  InventorOverdriveState,
  InventorSignatureKit,
  KineticistBlastOption,
  KineticistImpulseEntry,
  ResolvedCharacterSheet,
  ThaumaturgeSignatureKit,
} from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ActionCost, ActionIcon, type Pf2ActionType } from '@/components/ui/ActionIcon'
import { DiceIcon } from '@/components/dice/DiceButton'
import { Panel } from '@/components/ui/Panel'
import { ExpandableCard } from '@/components/ui/ExpandableCard'
import { RichText } from '@/components/ui/RichText'
import { localizeSpellName } from '@/data/i18n/spellNamesPt'
import { TraitTipList } from '@/components/ui/TraitTip'
import { localizeTraitLabel } from '@/data/i18n/traitLabelsPt'
import { polishRulesText } from '@/data/i18n/featDescriptionsPt'
import { classSignatureIsEmpty } from '@/engine/classSignatures'
import { craftingCheckBonus } from '@/engine/catalogKit'
import { calculateProficiencyBonus } from '@/engine'
import { useDiceStore } from '@/stores/diceStore'
import { formatModifier, PROFICIENCY_LABELS, formatSpeedMeters } from '@/utils/labels'
import type { DiceSides } from '@/utils/dice'

interface ClassSignaturePanelProps {
  sheet: ResolvedCharacterSheet
  onClassTrackersChange?: (classTrackers: CharacterClassTrackers) => void
}

const ROLE_LABEL: Record<CatalogSignatureItem['role'], string> = {
  pick: 'Aprendido',
  prepared: 'Preparado',
  primary: 'Primário',
}

const TIER_LABEL = {
  initial: 'Inicial',
  symbiosis: 'Simbiose (7º)',
  transcendence: 'Transcendência (17º)',
} as const

function isActionType(t: string | undefined): t is Exclude<Pf2ActionType, 'passive'> {
  return t === 'one' || t === 'two' || t === 'three' || t === 'free' || t === 'reaction'
}

function dieSides(die: string): DiceSides | null {
  const n = Number(die.replace(/^d/i, ''))
  if (n === 4 || n === 6 || n === 8 || n === 10 || n === 12 || n === 20) {
    return n
  }
  return null
}

function RollChip({
  label,
  hint,
  title,
  disabled,
  onClick,
}: {
  label: ReactNode
  hint?: string
  title?: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      onClick={onClick}
      className="inline-flex items-center gap-1 rounded-lg border border-accent/40 bg-accent/10 px-2 py-1 text-[11px] font-medium text-accent transition-colors hover:bg-accent/20 disabled:pointer-events-none disabled:opacity-40"
    >
      <DiceIcon className="h-3.5 w-3.5" />
      {label}
      {hint ? (
        <span className="tabular-nums text-accent/85">{hint}</span>
      ) : null}
    </button>
  )
}

function TrackerButtons({
  value,
  min,
  max,
  onChange,
}: {
  value: number
  min: number
  max: number
  onChange: (next: number) => void
}) {
  return (
    <div className="inline-flex items-center gap-1">
      <Button
        size="sm"
        variant="ghost"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </Button>
      <span className="min-w-[2.2rem] text-center font-display text-lg tabular-nums text-text">
        {value}
      </span>
      <Button
        size="sm"
        variant="ghost"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </Button>
    </div>
  )
}

function MagusBlock({
  kit,
  trackers,
  patch,
}: {
  kit: NonNullable<ClassSignatureKit['magus']>
  trackers: CharacterClassTrackers
  patch: (next: CharacterClassTrackers) => void
}) {
  const rollCheck = useDiceStore((s) => s.rollCheck)
  const attackReady = kit.spellAttack != null

  return (
    <Panel
      quiet
      compact
      title="Golpe Mágico"
      subtitle={kit.doubleSpellstrike ? 'Duas cargas' : undefined}
      actions={
        <TrackerButtons
          value={kit.charged}
          min={0}
          max={kit.maxCharges}
          onChange={(magusSpellstrikeCharges) =>
            patch({ ...trackers, magusSpellstrikeCharges })
          }
        />
      }
    >
      <RichText as="p" className="text-xs leading-relaxed text-text-muted">
        {`2 ações: canalize uma magia de ataque num Golpe da aba Armas. O Golpe substitui o teste de ataque da magia — se o Golpe acerta, a magia também acerta. Gasta a magia e uma carga. ${kit.rechargeNote}`}
      </RichText>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <RollChip
          label="Ataque de magia"
          hint={
            attackReady ? formatModifier(kit.spellAttack ?? 0) : undefined
          }
          disabled={!attackReady}
          title="Só se conjurar a magia sozinha, sem Golpe Mágico"
          onClick={() => {
            if (kit.spellAttack == null) return
            rollCheck('Ataque de magia', kit.spellAttack)
          }}
        />
        <Button
          size="sm"
          variant="secondary"
          disabled={kit.charged < 1}
          onClick={() =>
            patch({
              ...trackers,
              magusSpellstrikeCharges: Math.max(0, kit.charged - 1),
            })
          }
        >
          Gastar carga
        </Button>
        <Button
          size="sm"
          variant="accent"
          disabled={kit.charged >= kit.maxCharges}
          onClick={() =>
            patch({
              ...trackers,
              magusSpellstrikeCharges: Math.min(
                kit.maxCharges,
                kit.charged + 1,
              ),
            })
          }
        >
          Recarregar
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={kit.charged >= kit.maxCharges}
          onClick={() =>
            patch({
              ...trackers,
              magusSpellstrikeCharges: Math.min(
                kit.maxCharges,
                kit.charged + 1,
              ),
            })
          }
        >
          Confluxo
        </Button>
      </div>
      {kit.preparedAttackSpells.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {kit.preparedAttackSpells.map((spell) => (
            <Badge key={`${spell.originalName ?? spell.name}-${spell.rank}`}>
              {spell.originalName
                ? localizeSpellName(spell.originalName)
                : spell.name}
              {spell.rank > 0 ? ` · ${spell.rank}º` : ' · truque'}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-text-dim">
          Prepare um truque ou magia com o traço Ataque na aba Magias para
          aparecer aqui.
        </p>
      )}
    </Panel>
  )
}

function BlastRow({ blast }: { blast: KineticistBlastOption }) {
  const rollCheck = useDiceStore((s) => s.rollCheck)
  const rollFree = useDiceStore((s) => s.rollFree)
  const sides = dieSides(blast.die)
  const rangeLabel =
    blast.rangeType === 'melee'
      ? 'corpo a corpo'
      : formatSpeedMeters(blast.rangeFeet)
  const types = blast.damageTypeLabels.join(' ou ')
  const oneActionBonus = blast.meleeDamageBonus
  const twoActionBonus = blast.meleeDamageBonus + blast.twoActionBonus

  return (
    <li className="rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-2">
      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <span className="text-sm font-medium text-text">
          Explosão · {blast.elementName}
        </span>
        <Badge className="!text-[9px]">{rangeLabel}</Badge>
        <span className="text-[11px] text-text-dim">
          {blast.dice}
          {blast.die} {types}
        </span>
      </div>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <RollChip
          label="Ataque"
          hint={
            blast.attackBonus != null
              ? formatModifier(blast.attackBonus)
              : undefined
          }
          disabled={blast.attackBonus == null}
          onClick={() => {
            if (blast.attackBonus == null) return
            rollCheck(
              `Explosão ${blast.elementName} (${rangeLabel})`,
              blast.attackBonus,
            )
          }}
        />
        <RollChip
          label={<ActionIcon type="one" />}
          hint={`${blast.dice}${blast.die}${
            oneActionBonus ? formatModifier(oneActionBonus) : ''
          }`}
          disabled={!sides}
          title="Dano de 1 ação (corpo a corpo soma FOR)"
          onClick={() => {
            if (!sides) return
            rollFree(
              sides,
              blast.dice,
              oneActionBonus,
              `Explosão ${blast.elementName} 1 ação`,
            )
          }}
        />
        <RollChip
          label={<ActionIcon type="two" />}
          hint={`${blast.dice}${blast.die}${
            twoActionBonus ? formatModifier(twoActionBonus) : ''
          }`}
          disabled={!sides}
          title="Dano de 2 ações (+CON de status)"
          onClick={() => {
            if (!sides) return
            rollFree(
              sides,
              blast.dice,
              twoActionBonus,
              `Explosão ${blast.elementName} 2 ações`,
            )
          }}
        />
      </div>
    </li>
  )
}

function ImpulseCard({
  impulse,
  auraActive,
  onOverflow,
}: {
  impulse: KineticistImpulseEntry
  auraActive: boolean
  onOverflow?: () => void
}) {
  return (
    <li>
      <ExpandableCard
        title={impulse.name}
        badges={
          <>
            {isActionType(impulse.actionType) ? (
              <ActionCost type={impulse.actionType} />
            ) : null}
            {impulse.overflow ? (
              <Badge tone="accent">Transbordamento</Badge>
            ) : null}
            {!auraActive ? (
              <Badge className="!text-[9px]">Precisa da aura</Badge>
            ) : null}
            {impulse.traits
              .filter((t) => t.toLowerCase() !== 'impulse')
              .map((t) => (
                <Badge key={t} className="!text-[9px]">
                  {localizeTraitLabel(t)}
                </Badge>
              ))}
          </>
        }
      >
        {impulse.description ? (
          <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
            {polishRulesText(impulse.description)}
          </RichText>
        ) : null}
        {impulse.overflow && auraActive && onOverflow ? (
          <Button size="sm" variant="ghost" onClick={onOverflow}>
            Usar transbordamento (desliga aura)
          </Button>
        ) : null}
      </ExpandableCard>
    </li>
  )
}

function KineticistBlock({
  kit,
  trackers,
  patch,
}: {
  kit: NonNullable<ClassSignatureKit['kineticist']>
  trackers: CharacterClassTrackers
  patch: (next: CharacterClassTrackers) => void
}) {
  return (
    <Panel
      quiet
      compact
      title="Cinético"
      subtitle={kit.elements.join(' · ') || 'Escolha o portão'}
      actions={
        <Button
          size="sm"
          variant={kit.auraActive ? 'accent' : 'secondary'}
          onClick={() =>
            patch({ ...trackers, kineticAuraActive: !kit.auraActive })
          }
        >
          {kit.auraActive ? 'Aura ligada' : 'Canalizar aura'}
        </Button>
      }
    >
      {!kit.auraActive ? (
        <RichText as="p" className="mb-2 text-xs text-text-dim">
          Sem aura cinética você não lança impulsos novos. Canalizar Elementos
          (1 ação) liga a emanação de 3 m — e pode incluir uma Explosão de 1
          ação.
        </RichText>
      ) : null}
      {kit.impulseAttack != null ? (
        <p className="mb-2 text-[11px] text-text-dim">
          Ataque de impulso {formatModifier(kit.impulseAttack)}
          {kit.classDc != null ? ` · CD ${kit.classDc}` : ''}
        </p>
      ) : null}
      {kit.blasts.length > 0 ? (
        <ul className="space-y-2">
          {kit.blasts.map((blast) => (
            <BlastRow key={blast.id} blast={blast} />
          ))}
        </ul>
      ) : (
        <p className="text-xs text-text-dim">
          Escolha o Portão Cinético na classe para ver a Explosão Elemental
          como golpe.
        </p>
      )}
      {kit.impulses.length > 0 ? (
        <div className="mt-3">
          <h3 className="mb-1.5 font-display text-[10px] font-semibold uppercase tracking-[0.14em] text-accent/85">
            Impulsos
          </h3>
          <ul className="space-y-2">
            {kit.impulses.map((impulse) => (
              <ImpulseCard
                key={impulse.id}
                impulse={impulse}
                auraActive={kit.auraActive}
                onOverflow={() =>
                  patch({ ...trackers, kineticAuraActive: false })
                }
              />
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-text-dim">
          Feitos de impulso (traço Impulso) aparecem neste painel.
        </p>
      )}
    </Panel>
  )
}

function NecromancerBlock({
  kit,
  trackers,
  patch,
}: {
  kit: NonNullable<ClassSignatureKit['necromancer']>
  trackers: CharacterClassTrackers
  patch: (next: CharacterClassTrackers) => void
}) {
  const rollCheck = useDiceStore((s) => s.rollCheck)
  const rollFree = useDiceStore((s) => s.rollFree)
  const createAmount = kit.extraOnCreate ? 2 : 1
  const canStrike = kit.count > 0 && kit.spellAttack != null

  return (
    <Panel
      quiet
      compact
      title="Servos"
      subtitle={[kit.methodLabel, kit.fascinationLabel]
        .filter(Boolean)
        .join(' · ')}
      actions={
        <TrackerButtons
          value={kit.count}
          min={0}
          max={99}
          onChange={(necromancerThralls) =>
            patch({ ...trackers, necromancerThralls })
          }
        />
      }
    >
      <RichText as="p" className="text-xs leading-relaxed text-text-muted">
        {`1 PV cada · ${formatSpeedMeters(kit.speedFeet)} · 1 minuto. Imunes a sangramento, morte, doença, mental e veneno. Comandar um Servo (1 ação) faz um deles agir.${
          kit.extraOnCreate
            ? ' Titereiro: ao criar, entra +1 servo extra.'
            : ''
        }`}
      </RichText>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant="accent"
          onClick={() =>
            patch({
              ...trackers,
              necromancerThralls: kit.count + createAmount,
            })
          }
        >
          Criar {createAmount > 1 ? `${createAmount} servos` : 'servo'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          disabled={kit.count < 1}
          onClick={() =>
            patch({
              ...trackers,
              necromancerThralls: Math.max(0, kit.count - 1),
            })
          }
        >
          Destruir 1
        </Button>
        <RollChip
          label="Golpe do servo"
          hint={
            kit.spellAttack != null
              ? formatModifier(kit.spellAttack)
              : undefined
          }
          disabled={!canStrike}
          title={
            kit.count < 1
              ? 'Nenhum servo no campo'
              : 'Ataque de magia; 1d6 +1d6 no 5º e a cada 4 níveis'
          }
          onClick={() => {
            if (kit.spellAttack == null) return
            rollCheck('Golpe do servo', kit.spellAttack)
          }}
        />
        <RollChip
          label="Dano"
          hint={`${kit.strikeDice}d6`}
          disabled={kit.count < 1}
          onClick={() =>
            rollFree(6, kit.strikeDice, 0, 'Golpe do servo')
          }
        />
      </div>
    </Panel>
  )
}

function CatalogCard({
  item,
  onToggle,
}: {
  item: CatalogSignatureItem
  onToggle?: (key: string, next: boolean) => void
}) {
  return (
    <li>
      <ExpandableCard
        title={item.name}
        subtitle={item.catalogLabel}
        badges={
          <>
            {isActionType(item.actionType) ? (
              <ActionCost type={item.actionType} />
            ) : null}
            <Badge className="!text-[9px]">{ROLE_LABEL[item.role]}</Badge>
            {item.activeEffects && item.activeEffects.length > 0 ? (
              <Badge tone="success">Na ficha</Badge>
            ) : null}
          </>
        }
      >
        {item.activeEffects && item.activeEffects.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {item.activeEffects.map((fx) => (
              <Badge key={`${fx.label}-${fx.value}`} tone="accent">
                {fx.label}: {fx.value}
              </Badge>
            ))}
          </div>
        ) : null}
        {item.toggleKey && onToggle ? (
          <Button
            size="sm"
            variant={item.toggled ? 'accent' : 'secondary'}
            onClick={() => onToggle(item.toggleKey!, !item.toggled)}
          >
            {item.toggled ? 'Gravada em você' : 'Marcar como gravada'}
          </Button>
        ) : null}
        {item.rulesSummary ? (
          <RichText as="p" className="leading-relaxed">
            {polishRulesText(item.rulesSummary)}
          </RichText>
        ) : null}
        {item.description ? (
          <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
            {polishRulesText(item.description)}
          </RichText>
        ) : null}
        {item.sections.map((section) => (
          <div key={section.label}>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-accent/85">
              {section.label}
              {isActionType(section.actionType) ? (
                <ActionCost type={section.actionType} />
              ) : null}
            </div>
            <RichText as="p" className="whitespace-pre-wrap leading-relaxed">
              {polishRulesText(section.body)}
            </RichText>
          </div>
        ))}
      </ExpandableCard>
    </li>
  )
}

const OVERDRIVE_LABEL: Record<InventorOverdriveState, string> = {
  off: 'Desligada',
  success: 'Sucesso',
  critical: 'Crítico',
  fail: 'Falha',
}

function InventorBlock({
  kit,
  sheet,
  trackers,
  patch,
}: {
  kit: InventorSignatureKit
  sheet: ResolvedCharacterSheet
  trackers: CharacterClassTrackers
  patch: (next: CharacterClassTrackers) => void
}) {
  const rollCheck = useDiceStore((s) => s.rollCheck)
  const crafting = sheet.skills.find((s) => s.id === 'crafting')
  const intMod =
    sheet.attributes.find((a) => a.id === 'intelligence')?.modifier ?? 0
  const bonus =
    crafting?.modifier ??
    craftingCheckBonus(kit.craftingRank, sheet.character.level, intMod)

  return (
    <Panel
      quiet
      compact
      title="Sobrecarga"
      subtitle={`${PROFICIENCY_LABELS[kit.craftingRank]} · CD ${kit.overdriveDc}`}
    >
      <RichText as="p" className="text-xs leading-relaxed text-text-muted">
        {`1 ação, 1×/rodada: Artesanato vs CD ${kit.overdriveDc}. Sucesso: +metade de INT (+${kit.damageBonus || '…'} agora se ligado). Crítico: +INT. Falha: +1 de fogo. Os bônus entram nos Golpes e nas mods da inovação.`}
      </RichText>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {(Object.keys(OVERDRIVE_LABEL) as InventorOverdriveState[]).map(
          (state) => (
            <Button
              key={state}
              size="sm"
              variant={kit.overdrive === state ? 'accent' : 'secondary'}
              onClick={() =>
                patch({ ...trackers, inventorOverdrive: state })
              }
            >
              {OVERDRIVE_LABEL[state]}
            </Button>
          ),
        )}
        <RollChip
          label="Artesanato"
          hint={formatModifier(bonus)}
          onClick={() => rollCheck(kit.checkLabel, bonus)}
        />
      </div>
      {kit.damageBonus !== 0 ? (
        <p className="mt-1.5 text-[11px] text-accent">
          Golpes: +{kit.damageBonus} de dano enquanto a Sobrecarga durar.
        </p>
      ) : null}
    </Panel>
  )
}

function ExemplarBlock({
  kit,
  trackers,
  patch,
}: {
  kit: ExemplarSignatureKit
  trackers: CharacterClassTrackers
  patch: (next: CharacterClassTrackers) => void
}) {
  return (
    <Panel quiet compact title="Faísca divina" subtitle="Deslocar Imanência">
      <p className="text-xs leading-relaxed text-text-muted">
        A faísca empoderar 1 ícone por vez. Imanência (dano, CA, deslocamento…)
        entra na ficha no ícone escolhido. Transcendência continua no cartão.
      </p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {kit.ikons.map((ikon) => (
          <Button
            key={ikon.id}
            size="sm"
            variant={ikon.empowered ? 'accent' : 'secondary'}
            onClick={() =>
              patch({ ...trackers, exemplarSparkIkonId: ikon.id })
            }
          >
            {ikon.name}
          </Button>
        ))}
      </div>
    </Panel>
  )
}

function ThaumaturgeBlock({
  kit,
  sheet,
  trackers,
  patch,
}: {
  kit: ThaumaturgeSignatureKit
  sheet: ResolvedCharacterSheet
  trackers: CharacterClassTrackers
  patch: (next: CharacterClassTrackers) => void
}) {
  const rollCheck = useDiceStore((s) => s.rollCheck)
  const cha =
    sheet.attributes.find((a) => a.id === 'charisma')?.modifier ?? 0
  const level = sheet.character.level
  const loreRank =
    level >= 15
      ? 'legendary'
      : level >= 7
        ? 'master'
        : level >= 3
          ? 'expert'
          : 'trained'
  const loreMod = calculateProficiencyBonus(loreRank, level) + cha

  return (
    <Panel
      quiet
      compact
      title="Explorar Vulnerabilidade"
      subtitle={`CD ${kit.exploitDc} · antítese ${kit.antithesis}`}
    >
      <RichText as="p" className="text-xs leading-relaxed text-text-muted">
        {`1 ação: Conhecimento Esotérico vs CD ${kit.exploitDc}. Ligado: seus Golpes somam a antítese pessoal (+${kit.antithesis}). Empoderamento do implemento: +2 por dado se empunha o implemento.`}
      </RichText>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <Button
          size="sm"
          variant={kit.exploitActive ? 'accent' : 'secondary'}
          onClick={() =>
            patch({
              ...trackers,
              thaumaturgeExploit: !kit.exploitActive,
            })
          }
        >
          {kit.exploitActive ? 'EV ligada' : 'Ligar EV'}
        </Button>
        <Button
          size="sm"
          variant={kit.implementInHand ? 'accent' : 'secondary'}
          onClick={() =>
            patch({
              ...trackers,
              thaumaturgeImplementInHand: !kit.implementInHand,
            })
          }
        >
          {kit.implementInHand ? 'Implemento na mão' : 'Sem implemento'}
        </Button>
        <RollChip
          label="Conhecimento Esotérico"
          hint={formatModifier(loreMod)}
          onClick={() => rollCheck('Explorar Vulnerabilidade', loreMod)}
        />
      </div>
    </Panel>
  )
}

function AlchemistBlock({
  kit,
  trackers,
  patch,
}: {
  kit: AlchemistSignatureKit
  trackers: CharacterClassTrackers
  patch: (next: CharacterClassTrackers) => void
}) {
  return (
    <Panel
      quiet
      compact
      title="Frascos versáteis"
      subtitle={`máx. ${kit.vialsMax} (2+INT)`}
      actions={
        <TrackerButtons
          value={kit.vials}
          min={0}
          max={kit.vialsMax}
          onChange={(alchemistVials) => patch({ ...trackers, alchemistVials })}
        />
      }
    >
      <p className="text-xs leading-relaxed text-text-muted">
        Bomba improvisada ou combustível de Alquimia Rápida. Abaixo do máximo,
        10 min de exploração recuperam 2 (3 a partir do 9º).
      </p>
    </Panel>
  )
}

function CommanderBlock({ kit }: { kit: CommanderSignatureKit }) {
  return (
    <Panel quiet compact title="Esquadrão" subtitle={`${kit.squadSize} aliados`}>
      <p className="text-xs leading-relaxed text-text-muted">
        2 + INT aliados no esquadrão (você conta sem ocupar vaga). Táticas
        preparadas estão no kit abaixo.
      </p>
    </Panel>
  )
}

function EidolonBlock({
  kit,
}: {
  kit: NonNullable<ClassSignatureKit['eidolon']>
}) {
  const rollCheck = useDiceStore((s) => s.rollCheck)
  return (
    <Panel
      quiet
      compact
      title="Eidolon"
      subtitle={`${kit.typeName} · CA ${kit.ac}`}
    >
      <p className="text-sm font-medium text-text">{kit.name}</p>
      <ul className="mt-2 space-y-1.5">
        {kit.attacks.map((atk) => (
          <li
            key={atk.id}
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-border/70 bg-surface-2/40 px-2.5 py-1.5"
          >
            <span className="text-sm text-text">{atk.name}</span>
            <RollChip
              label="Ataque"
              hint={formatModifier(atk.attackModifier)}
              onClick={() => rollCheck(atk.name, atk.attackModifier)}
            />
            <span className="text-[11px] text-text-dim">
              {atk.damageLabel} {atk.damageType}
            </span>
            {atk.traits.length > 0 ? (
              <span className="text-[10px] text-text-dim">
                <TraitTipList traits={atk.traits} />
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <ul className="mt-2 space-y-1.5">
        {kit.abilities.map((ability) => (
          <li
            key={`${ability.tier}-${ability.name}`}
            className={`rounded-lg border px-2.5 py-1.5 ${
              ability.unlocked
                ? 'border-border/70 bg-surface-2/40'
                : 'border-border/40 bg-surface-2/20 opacity-60'
            }`}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-medium text-text">
                {ability.name}
              </span>
              {isActionType(ability.actionType) ? (
                <ActionCost type={ability.actionType} />
              ) : null}
              <Badge className="!text-[9px]">{TIER_LABEL[ability.tier]}</Badge>
              {!ability.unlocked ? (
                <Badge className="!text-[9px]">Bloqueado</Badge>
              ) : null}
            </div>
            <RichText
              as="p"
              className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-text-muted"
            >
              {polishRulesText(ability.description)}
            </RichText>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

export function ClassSignaturePanel({
  sheet,
  onClassTrackersChange,
}: ClassSignaturePanelProps) {
  const kit = sheet.classSignature
  if (!kit || classSignatureIsEmpty(kit)) return null

  const trackers = sheet.character.classTrackers ?? {}
  function patch(next: CharacterClassTrackers) {
    onClassTrackersChange?.(next)
  }

  return (
    <div className="space-y-3">
      {kit.magus ? (
        <MagusBlock kit={kit.magus} trackers={trackers} patch={patch} />
      ) : null}
      {kit.kineticist ? (
        <KineticistBlock
          kit={kit.kineticist}
          trackers={trackers}
          patch={patch}
        />
      ) : null}
      {kit.necromancer ? (
        <NecromancerBlock
          kit={kit.necromancer}
          trackers={trackers}
          patch={patch}
        />
      ) : null}
      {kit.inventor ? (
        <InventorBlock
          kit={kit.inventor}
          sheet={sheet}
          trackers={trackers}
          patch={patch}
        />
      ) : null}
      {kit.exemplar ? (
        <ExemplarBlock
          kit={kit.exemplar}
          trackers={trackers}
          patch={patch}
        />
      ) : null}
      {kit.thaumaturge ? (
        <ThaumaturgeBlock
          kit={kit.thaumaturge}
          sheet={sheet}
          trackers={trackers}
          patch={patch}
        />
      ) : null}
      {kit.alchemist ? (
        <AlchemistBlock
          kit={kit.alchemist}
          trackers={trackers}
          patch={patch}
        />
      ) : null}
      {kit.commander ? <CommanderBlock kit={kit.commander} /> : null}
      {kit.catalog.length > 0 ? (
        <Panel quiet compact title="Kit de classe">
          <ul className="space-y-2">
            {kit.catalog.map((item) => (
              <CatalogCard
                key={item.id}
                item={item}
                onToggle={(key, next) =>
                  patch({
                    ...trackers,
                    kitToggles: { ...trackers.kitToggles, [key]: next },
                  })
                }
              />
            ))}
          </ul>
        </Panel>
      ) : null}
      {kit.eidolon ? <EidolonBlock kit={kit.eidolon} /> : null}
    </div>
  )
}
