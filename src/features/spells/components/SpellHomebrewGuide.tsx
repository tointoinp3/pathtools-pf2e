import { Panel, Tip } from '@/components/ui/Panel'
import type { SpellCreateKind } from '@/features/spells/homebrewDefaults'
import { spellKindLabel } from '@/features/spells/spellUi'

/** Guia de design para magias homebrew (PF2e Remaster). Sem ritual. */
export function SpellHomebrewGuide({
  compact,
  kind,
}: {
  compact?: boolean
  kind: SpellCreateKind
}) {
  return (
    <Panel
      title="Como inventar uma magia divertida"
      subtitle={spellKindLabel(kind)}
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        {kind === 'cantrip' && <CantripGuide compact={compact} />}
        {kind === 'spell' && <RankedGuide compact={compact} />}
        {kind === 'focus' && <FocusGuide compact={compact} />}
        <Tip>
          Custo: clique no ícone (1 ação, 2 ações, reação…). Magia variável (1
          a 3): deixe Especial e coloque os três ícones no texto.
        </Tip>
      </div>
    </Panel>
  )
}

function CantripGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Truque é magia de posto 0: sempre à mão, altura automática com o nível,
        sem gastar espaço. O orçamento é o de um efeito de 1º–2º no máximo —
        não é Bola de Fogo de graça.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento de truque
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              Dano típico: 1d4 ou 1d6, +1 dado a cada 2 postos de altura (como
              Raio Gélido / Agulha Telecinética).
            </li>
            <li>
              Controle ou utilidade: uma condição leve (ofuscado, -1, 1 round)
              ou uma ferramenta de exploração. Sem nocaute, sem parede, sem
              voo permanente.
            </li>
            <li>
              Marque as tradições. Sem tradição, a ficha não oferece o truque
              para o conjurador.
            </li>
          </ul>
          <Tip>
            Duplicar um truque oficial e trocar o lore é o jeito mais seguro de
            ficar no orçamento do Remaster.
          </Tip>
        </div>
      </details>
    </>
  )
}

function RankedGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Magia de posto 1–10 usa espaço (ou repertório). Compare com uma magia
        oficial do mesmo posto: o efeito deve caber naquela faixa, não no
        posto seguinte.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento por posto
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <strong className="text-text">1–2:</strong> um inimigo, dano
              baixo/médio, condição curta, ou utilidade de cena.
            </li>
            <li>
              <strong className="text-text">3–5:</strong> área pequena, dois
              alvos, ou um efeito de combate que decide o round — não a luta.
            </li>
            <li>
              <strong className="text-text">6–8:</strong> virada tática (voo,
              parede, reanimar). Ainda tem custo de ação e CD.
            </li>
            <li>
              <strong className="text-text">9–10:</strong> momento de chefão.
              Um por dia, não um botão de “eu ganho”.
            </li>
          </ul>
          <p>
            Isto <strong className="text-text">não é ritual</strong>. Magia de
            combate usa 1–3 ações (ou reação) e tradição. Ritual é outra ficha:
            horas, perícia e custo em PO.
          </p>
          <Tip>
            Altura mora no texto (“para cada posto acima…”). A ficha já eleva
            o espaço; você só descreve o que cresce.
          </Tip>
        </div>
      </details>
    </>
  )
}

function FocusGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Magia de foco gasta Ponto de Foco, não espaço. Recarrega com Refocar.
        O poder costuma ser o de uma magia de 1º–3º — a graça é repetir, não
        explodir o encontro.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Classe e recarga
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              Escolha o traço da classe (Mago, Clérigo…) para a ficha filtrar.
              Sem traço, qualquer personagem com pool de foco vê a magia.
            </li>
            <li>
              1–2 ações, efeito claro, 1 PF. Não copie um feito de 10º nem uma
              magia de 6º.
            </li>
            <li>
              Tradição é opcional no foco de classe — o filtro usa o traço, não
              a lista de tradição.
            </li>
          </ul>
          <Tip>
            Duplicar um foco oficial da classe e trocar o sabor é o caminho
            mais seguro.
          </Tip>
        </div>
      </details>
    </>
  )
}
