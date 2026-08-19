import { Panel, Tip } from '@/components/ui/Panel'
import type { DeityKind } from '@/types/deity'
import { DEITY_KIND_LABELS } from '@/features/deities/localizeDeities'

/** Guia de design para o catálogo divino homebrew (PF2e Remaster). */
export function DeityHomebrewGuide({
  compact,
  kind,
}: {
  compact?: boolean
  kind: DeityKind
}) {
  return (
    <Panel
      title="Como inventar uma fé divertida"
      subtitle={DEITY_KIND_LABELS[kind]}
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        {kind === 'deity' && <GodGuide compact={compact} />}
        {kind === 'pantheon' && <PantheonGuide compact={compact} />}
        {kind === 'philosophy' && <PhilosophyGuide compact={compact} />}
        {kind === 'covenant' && <CovenantGuide compact={compact} />}
      </div>
    </Panel>
  )
}

function GodGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Uma divindade é um pacote para o clérigo e o campeão: perícia, arma,
        fonte, santificação e quatro domínios. O lore (editos e anátema) é o
        que o jogador sente na mesa — o resto é orçamento Remaster.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento de deus
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <strong className="text-text">2 atributos</strong> (os do clérigo
              na criação, se a mesa usar).
            </li>
            <li>
              1 perícia divina, 1 arma favorita (nome em inglês do AoN, como
              Warhammer).
            </li>
            <li>
              Fonte: só Curar, só Ferir, ou as duas (o jogador escolhe).
            </li>
            <li>
              Santificação: sagrado, profano, os dois, ou nenhuma. “Obrigatória”
              só se a fé não aceita neutros.
            </li>
            <li>
              <strong className="text-text">4 domínios primários</strong> + 0–4
              alternativos. Use os oficiais — o Iniciado de Domínio puxa a magia
              de foco dali.
            </li>
            <li>
              3 magias de clérigo (nomes originais em inglês), uma por faixa
              típica 1 / 3–4 / 5–6.
            </li>
          </ul>
          <Tip>
            Duplicar Abadar ou Sarenrae e trocar o lore é o jeito mais seguro.
          </Tip>
        </div>
      </details>
    </>
  )
}

function PantheonGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Panteão não é “vários deuses na mesma ficha”. É <em>um</em> pacote
        mecânico que o clérigo serve no lugar de um deus único — o grupo de
        deuses é a história.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento de panteão
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <p>
            Mesmo orçamento de uma divindade: 4 domínios, fonte, santificação,
            perícia e arma. Não some os poderes de todos os membros — isso
            estoura o clérigo.
          </p>
          <Tip>
            Os membros vão no texto. O campo “Panteões” nas fichas de deuses
            oficiais aponta para cá pelo nome.
          </Tip>
        </div>
      </details>
    </>
  )
}

function PhilosophyGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Filosofia é fé sem pessoa divina. Ateísmo oficial não tem fonte nem
        domínio. Se quiser um clérigo de uma doutrina, preencha o pacote igual
        ao de uma divindade — senão deixe vazio de propósito.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Com ou sem mecânica
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              Sem pacote: editos/anátema (ou “nenhum”) e um resumo. Qualquer
              personagem pode venerar.
            </li>
            <li>
              Com pacote: 4 domínios, fonte e arma, como um deus. Aí o clérigo
              funciona.
            </li>
          </ul>
          <Tip>
            Não misture: filosofia vazia + 8 domínios “porque é legal” quebra o
            Iniciado de Domínio.
          </Tip>
        </div>
      </details>
    </>
  )
}

function CovenantGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Pacto é um acordo com espíritos, natureza ou um coletivo — não um deus
        sentado num trono. Na ficha, o clérigo trata igual: perícia, arma,
        fonte e domínios.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento de pacto
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <p>
            Mesmo teto de uma divindade menor. Editos e anátema devem falar do
            acordo (crescer, proteger, não explorar) — não de um panteão inteiro.
          </p>
          <Tip>
            Duplicar um pacto oficial de Divine Mysteries e trocar o bioma é o
            caminho mais seguro.
          </Tip>
        </div>
      </details>
    </>
  )
}
