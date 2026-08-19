import { Panel, Tip } from '@/components/ui/Panel'

/** Guia de design para classes homebrew (PF2e Remaster). */
export function ClassHomebrewGuide({ compact }: { compact?: boolean }) {
  return (
    <Panel
      title="Como inventar uma classe divertida"
      subtitle="O mesmo ritmo das oficiais — um gancho de mesa, um orçamento, feitos que crescem"
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        <p>
          Classe diz o que você <em>faz</em> na mesa. Ancestralidade diz quem
          você é. Se a fantasia cabe num feito de 1º ou numa origem, ainda não
          é classe — classe precisa de 20 níveis de conversa com a mesa.
        </p>

        <details
          open={!compact}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2"
        >
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            1. Uma frase de fantasia
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              Guerreiro: “eu controlo o espaço e puno quem baixa a guarda.”
              Ladino: “eu acerto onde dói e saio vivo.” Mago: “eu preparei o
              dia inteiro para este momento.” Se a sua frase for “eu bato
              mais forte”, você está copiando o bárbaro.
            </p>
            <p>
              A especialização (instinto, racket, escola, causa) é o tempero
              de 1º nível — 4 a 8 opções, cada uma um jeito de jogar o mesmo
              papel. Sem especialização também vale (o guerreiro quase não
              tem: o “sabor” vem dos feitos e do grupo de arma).
            </p>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            2. O orçamento (PV, proficiência, magia)
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong className="text-text">PV por nível:</strong> 6
                (conjurador frágil), 8 (padrão), 10 (linha de frente), 12 só
                se abrir mão de quase tudo (o guardião paga com magia zero e
                foco em defender).
              </li>
              <li>
                <strong className="text-text">Atributo-chave:</strong> um ou
                dois. Três já é “humano versátil” demais para uma classe.
              </li>
              <li>
                <strong className="text-text">Salvaguardas:</strong> uma
                especialista e duas treinadas, ou duas especialistas se o PV
                for 8 e a magia for fraca. Três especialistas no 1º é
                guerreiro — e o guerreiro não conjura.
              </li>
              <li>
                <strong className="text-text">Armas / armadura:</strong>{' '}
                marciais + todas as armaduras = guerreiro/campeão. Simples +
                sem armadura = mago. Não empilhe marcial especialista, armadura
                pesada e conjuração completa.
              </li>
              <li>
                <strong className="text-text">Perícias extras:</strong> 2+INT
                (conjurador), 3+INT (padrão), 4+INT (perito social). Ladino
                ganha feito de perícia <em>todo</em> nível — isso já é o
                orçamento dele.
              </li>
            </ul>
            <Tip>
              Conjuração completa (tabela de mago/feiticeiro) pede PV 6–8 e
              armas fracas. Conjuração limitada (magus) convive com 8–10 PV e
              armas marciais. Só foco (campeão/monge) é um tempero, não um
              conjurador.
            </Tip>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            3. Recursos vs feitos
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              O recurso de 1º nível é a assinatura (Golpe Reativo, Ataque
              Furtivo, Fúria). Depois disso, a classe cresce em marcos ímpares
              (3, 7, 11, 15, 19) e os feitos preenchem os pares.
            </p>
            <p>
              Marcial: feito de classe no 1º e em todos os pares. Conjurador:
              feitos só nos pares a partir do 2º — o 1º já está cheio de magia.
            </p>
            <p>
              Um feito de 1º–2º é uma técnica. Um feito de 10º pode ser um
              “quase recurso”. Não coloque voo permanente, imunidade ou magia
              de 3º posto num feito de 1º.
            </p>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            4. Sinais de que passou do ponto
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
            <li>10 PV + conjuração completa + armas marciais especialista.</li>
            <li>Três salvaguardas especialista no 1º nível e ainda magia.</li>
            <li>
              Recurso de 1º que já resolve o combate sozinho (dano extra todo
              turno + reação letal + deslocamento de voo).
            </li>
            <li>
              Especialização que dá mais poder que a classe base — o sabor
              muda o <em>como</em>, não o volume.
            </li>
            <li>
              Fantasia que é só “o guerreiro, mas com magia de mago” — isso já
              é magus, ou um arquétipo.
            </li>
          </ul>
        </details>

        <p className="text-xs text-text-dim">
          Duplicar uma oficial e trocar o lore é o caminho mais seguro. Criar
          do zero: comece marcial sem magia, acerte a assinatura de 1º nível,
          e só então decida se precisa de espaços de magia.
        </p>
      </div>
    </Panel>
  )
}
