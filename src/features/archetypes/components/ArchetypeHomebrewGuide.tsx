import { Panel, Tip } from '@/components/ui/Panel'

/** Guia de design para arquétipos homebrew (PF2e Remaster). */
export function ArchetypeHomebrewGuide({ compact }: { compact?: boolean }) {
  return (
    <Panel
      title="Como inventar um arquétipo divertido"
      subtitle="Um caminho lateral — nunca uma segunda classe inteira"
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        <p>
          Arquétipo não é classe. Classe é o que você <em>é</em> por 20 níveis.
          Arquétipo é um desvio: 1 feito de Dedicação no 2º nível e depois
          técnicas que você compra com slots de classe. Se a fantasia precisa
          de PV, proficiências iniciais e tabela 1–20, isso é classe.
        </p>

        <details
          open={!compact}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2"
        >
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            1. Multiclasse vs. geral
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              <strong className="text-text">Multiclasse</strong> (Dedicação de
              Guerreiro, de Mago…): um gostinho da outra classe. Quem já é
              daquela classe não pega. A Dedicação dá treino básico (uma
              perícia, armas/armadura ou CD de classe) — nunca o recurso
              assinatura no mesmo poder (Golpe Reativo completo, Fúria
              completa, grimório de mago).
            </p>
            <p>
              <strong className="text-text">Geral</strong> (médico, pirata,
              cavalheiro): uma fantasia que não merece classe própria. A
              Dedicação é o “você entra nesse mundo”; os feitos seguintes são
              especializações.
            </p>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            2. O orçamento da Dedicação (2º nível)
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              A Dedicação ocupa um slot de classe. Ela deve ser um pouco mais
              fraca que um feito de classe de 2º da classe “de verdade”.
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>Treino em uma perícia (ou escolha entre duas).</li>
              <li>
                Treino em um pacote pequeno de armas <em>ou</em> armadura — não
                os dois no nível de um guerreiro.
              </li>
              <li>CD de classe daquele caminho, se for multiclasse.</li>
              <li>
                Um benefício memorável e modestinho — não a assinatura inteira.
              </li>
            </ul>
            <Tip>
              Depois da Dedicação, o jogador precisa de 2 feitos daquele
              arquétipo antes de pegar outra Dedicação. Isso é o freio do
              sistema: não empilhe 4 caminhos no 8º nível.
            </Tip>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            3. Feitos seguintes
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              Oficiais trazem 4–8 feitos depois da Dedicação, em níveis pares
              (4, 6, 8…). “Básico” no 4º é um feito de 1º–2º da classe original.
              “Avançado” no 6º abre feitos de 4º. Não copie o feito de 10º da
              classe para o arquétipo no 6º.
            </p>
            <p>
              Alguns arquétipos (ladino, investigador) também cabem em slot de
              perícia — só marque isso se o pacote for mesmo de perícia, não de
              combate.
            </p>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            4. Sinais de que passou do ponto
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
            <li>
              Dedicação que dá o recurso assinatura da classe (Fúria, Sneak
              Attack cheio, magia de 1º posto à vontade).
            </li>
            <li>Mais poder na Dedicação do que um feito de classe de 2º.</li>
            <li>
              Feito de 4º que rivaliza com o de 8º da classe original.
            </li>
            <li>
              Fantasia que é “a classe, só que sem PV” — isso já é multiclasse
              oficial, ou deveria ser classe homebrew.
            </li>
          </ul>
        </details>

        <p className="text-xs text-text-dim">
          Duplicar uma Dedicação oficial (Guerreiro, Mago, um arquétipo geral)
          e trocar o lore é o caminho mais seguro. Criar do zero: comece pela
          Dedicação fraca e um feito de 4º que dê vontade de continuar.
        </p>
      </div>
    </Panel>
  )
}
