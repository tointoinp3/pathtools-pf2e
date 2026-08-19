import { Panel, Tip } from '@/components/ui/Panel'
import {
  areaDamage,
  CREATURE_ROAD_MAPS,
  safeItemLevel,
  typicalExtremeCount,
  typicalSpellRank,
  type CreatureRoadMapId,
} from '@/engine/creatureBuilding'
import { formatCreatureLevel } from '@/features/bestiary/formatCreature'

/** Guia de design (GM Core pg. 112 / AoN Building Creatures). */
export function CreatureBuildingGuide({
  level,
  compact,
  activeRoadMap,
}: {
  level: number
  compact?: boolean
  activeRoadMap?: CreatureRoadMapId | null
}) {
  const extremes = typicalExtremeCount(level)
  const areaUnlimited = areaDamage(level, 'unlimited')
  const areaLimited = areaDamage(level, 'limited')
  const rank = typicalSpellRank(level)

  return (
    <Panel
      title="Como montar a ficha"
      subtitle={`GM Core · criatura ${formatCreatureLevel(level)}`}
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        <p>
          Números vêm de <strong className="text-text">tabelas</strong>, não da
          soma de personagem. Extremo / Alto / Moderado / Baixo / Terrível
          descrevem o papel. Clique nas faixas ao lado de cada campo — o valor
          entra sozinho.
        </p>

        <details
          open={!compact}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2"
        >
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            Empurre e puxe
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong className="text-text">Extremo</strong> é classe mundial.
                Compense com Baixo ou Terrível em outro lugar.
              </li>
              <li>
                Neste nível, o livro espera{' '}
                <strong className="text-text">
                  {extremes.min === extremes.max
                    ? extremes.min
                    : `${extremes.min}–${extremes.max}`}{' '}
                  extremo{extremes.max === 1 ? '' : 's'}
                </strong>
                {level < 11 ? ' (opcional; zero também vale).' : '.'}
              </li>
              <li>
                Não empilhe extremos ligados (ataque extremo + dano extremo no
                mesmo Golpe). Troque: ataque alto + dano extremo, ou o inverso.
              </li>
              <li>
                Quase toda criatura de combate tem CA alta ou moderada, e pelo
                menos um ponto fraco óbvio.
              </li>
            </ul>
            <Tip>
              Voar + ataque à distância costuma aparecer no 7º (quando o grupo
              ganha voo). Invisibilidade à vontade, por volta do 6º–8º.
            </Tip>
          </div>
        </details>

        <details
          open={!compact}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2"
        >
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            Economia de ações
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong className="text-text">1 ação</strong> — Golpe, passo,
                bônus. O ícone aparece ao lado do nome, igual à ficha oficial.
              </li>
              <li>
                <strong className="text-text">2 ações</strong> — define o turno
                (sopro, magia, investida).
              </li>
              <li>
                <strong className="text-text">3 ações</strong> com parcimônia
                (Atropelar). Chefe lento nunca usa a habilidade “legal”.
              </li>
              <li>
                Reação precisa de telégrafo visível (escudo erguido, cristal
                zunindo). Dano de reação ≈ Golpe moderado.
              </li>
              <li>
                Ação livre sem gatilho é rara e quase nunca é Golpe ou
                movimento.
              </li>
            </ul>
            <p>
              Dano em área (2 ações): à vontade {areaUnlimited.expr} (média{' '}
              {areaUnlimited.avg}); limitado {areaLimited.expr} (média{' '}
              {areaLimited.avg}).
            </p>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            Magia, itens e PV
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                Conjurador dedicado: posto até {rank}º (metade do nível, para
                cima). CD alta; no 15º+ a CD extrema vira o padrão.
              </li>
              <li>
                Inata pode passar do posto “de classe”, mas só uma magia
                temática e sem matar o grupo de uma vez.
              </li>
              <li>
                Item permanente seguro neste nível:{' '}
                <strong className="text-text">nível {safeItemLevel(level)}</strong>
                . Vários mais baixos ok; tesouro de chefe é exceção planejada.
              </li>
              <li>
                Regeneração ≈ 1–1,5 Golpes altos por rodada. PV extra +
                fraqueza = zumbi; resistência com exceção = esqueleto.
              </li>
            </ul>
          </div>
        </details>

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-text-dim">
            Mapas-base
          </p>
          <ul className="space-y-1 text-xs">
            {CREATURE_ROAD_MAPS.map((map) => (
              <li
                key={map.id}
                className={
                  activeRoadMap === map.id
                    ? 'rounded-md bg-accent/10 px-2 py-1 text-text'
                    : ''
                }
              >
                <strong className="text-text">{map.name}.</strong> {map.summary}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  )
}
