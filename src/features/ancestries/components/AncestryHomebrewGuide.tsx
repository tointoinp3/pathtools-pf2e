import { Panel, Tip } from '@/components/ui/Panel'

/** Guia de design para ancestralidades e heranças homebrew (PF2e Remaster). */
export function AncestryHomebrewGuide({ compact }: { compact?: boolean }) {
  return (
    <Panel
      title="Como inventar uma ancestralidade divertida"
      subtitle="O mesmo “orçamento” das raças oficiais — identidade primeiro, número depois"
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        <p>
          Uma ancestralidade no Pathfinder 2e não é uma classe. Classe diz o que
          você <em>faz</em> na mesa (bater, conjurar, comandar). Ancestralidade
          diz <em>quem você é</em> — o corpo, o povo, o jeito de enxergar o
          mundo. O pacote mecânico é pequeno de propósito: o personagem ainda
          vai ganhar origem, classe e feitos.
        </p>

        <details open={!compact} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            1. Comece pela fantasia, não pela ficha
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              Antes de PV e boosts, escreva uma frase: “são gente-rio que
              negociam com a maré” ou “construtos que acordaram no meio de uma
              guerra e não lembram o motivo”. Se a frase for genérica (“são
              fortes e gostam de honra”), a raça vai parecer um anão de outro
              nome.
            </p>
            <p>
              Olhe as oficiais: anão é teimoso, lento, vê no escuro e trata o
              clã como ferro. Elfo é rápido, frágil, vê na penumbra e vive
              tempo demais. Goblin é caótico, pequeno, fogo e dentes. Humano é
              o curinga — menos poder fixo, mais escolha. Cada uma tem um
              <strong className="text-text"> gancho de mesa</strong> (um objeto,
              um tabu, um sentido, um jeito de se mover).
            </p>
            <p>
              Preencha “Você talvez…” e “Outros provavelmente…” — isso ensina o
              jogador a interpretar sem um manual de cultura de 20 páginas.
            </p>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            2. O orçamento (para ficar no mesmo nível das oficiais)
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              Pense num bolo de três fatias. Se uma fatia cresce, outra
              encolhe.
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong className="text-text">PV:</strong> 6 (ágil/frágil), 8
                (padrão), 10 (duro). Quase ninguém passa de 10.
              </li>
              <li>
                <strong className="text-text">Deslocamento:</strong> 6 m (20 pés)
                se for pequeno, robusto ou aquático; 7,5 m (25) é o padrão; 9 m
                (30) é raro e costuma vir com PV 6 ou outra conta.
              </li>
              <li>
                <strong className="text-text">Boosts:</strong> o clássico é{' '}
                <em>dois atributos fixos + um livre + uma falha</em>. Flexível
                (um fixo + um livre, sem falha) é o “autômato”. Dois livres sem
                falha é o “humano” — pague com menos poder automático (sem
                visão no escuro, sem ataque racial forte).
              </li>
              <li>
                <strong className="text-text">Sentidos:</strong> nada, visão na
                penumbra, ou visão no escuro. Visão no escuro já é um presente
                grande; não empilhe com Grande + 10 PV + deslocamento 9 m.
              </li>
              <li>
                <strong className="text-text">Tamanho:</strong> Pequeno ou Médio
                na maioria. Grande muda alcance, espaço e a vida na masmorra —
                use raro, e cobre com falha ou PV/deslocamento menores.
              </li>
            </ul>
            <Tip>
              Uma habilidade ancestral típica é <em>uma</em> coisa memorável:
              um ataque desarmado modestinho, um truque inato, ignorar um tipo
              de terreno, um item cultural. Não é um feito de 8º nível.
            </Tip>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            3. Heranças: o tempero, não o prato
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              A ancestralidade é o povo. A herança é o “de qual bairro você
              veio”. Oficiais trazem 4–6 heranças, cada uma um pacote{' '}
              <em>pequeno</em>: um sentido melhor, um deslocamento extra, uma
              perícia, +2 PV, um truque, um ataque diferente.
            </p>
            <p>
              Boa regra: a herança não deve ser melhor que pegar um feito de 1º
              nível. Se duas heranças juntas (via versátil + específica) ficam
              absurdas, você passou do ponto — versátil já é um atalho forte
              (Aiuvarin, Nephilim, Beastkin).
            </p>
            <ul className="list-disc space-y-1 pl-4">
              <li>
                <strong className="text-text">Específica:</strong> só desta
                ancestralidade (Anão da Forja, Elfo da Selva).
              </li>
              <li>
                <strong className="text-text">Versátil:</strong> encaixa em
                quase qualquer corpo (meio-elfo, cionte, geniekin). Use quando
                a história é “sangue misturado / bênção / maldição”, não quando
                é “mais um subtipo do mesmo povo”.
              </li>
            </ul>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            4. Feitos da raça (sem isso a ficha fica manca)
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              Oficiais trazem um pacote de feitos de ancestralidade: vários no
              1º nível (familiaridade com arma, conhecimento do povo, um truque
              cultural) e depois marcos no 5, 9, 13 e 17. Sem feitos, a raça
              “acaba” no 1º nível — o jogador não tem o que escolher quando a
              ficha pede feito de ancestralidade.
            </p>
            <p>
              Um feito de 1º é do tamanho de um feito de perícia. Um de 9º
              pode ser mais cinematográfico. Não coloque voo permanente ou
              magia de 2º posto no 1º nível. Alguns feitos são só de uma
              herança (marque isso no editor).
            </p>
          </div>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            5. Sinais de que passou do ponto
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs">
            <li>10 PV + visão no escuro + deslocamento 9 m + sem falha.</li>
            <li>Tamanho Grande e ainda um ataque desarmado de 1d8 com ágil.</li>
            <li>
              Três habilidades ancestrais “sempre ligadas” (resistência, voo,
              truque à vontade).
            </li>
            <li>
              Herança que dá feito de classe, magia de 2º posto, ou voo no 1º
              nível sem custo.
            </li>
            <li>
              Fantasia que só existe para “ser o melhor guerreiro” — isso é
              trabalho da classe.
            </li>
          </ul>
        </details>

        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            6. Como as classes oficiais pensam nisso
          </summary>
          <p className="mt-2 text-xs">
            Guerreiro, mago e bardo são fantasias de <em>papel</em>. A raça é
            o cenário onde esse papel mora. Um goblin mago é engraçado porque o
            goblin traz fogo, dentes e pânico — não porque o goblin também
            conjura melhor. Deixe a classe brilhar; a ancestralidade só
            colora o palco. Se você perceber que está copiando um instinto de
            bárbaro ou uma escola de mago para dentro da raça, pare e devolva
            isso para a classe (ou para um feito de 1º que o jogador escolhe).
          </p>
        </details>

        <p className="text-xs text-text-dim">
          Duplicar uma oficial e trocar o lore é o caminho mais seguro. Criar
          do zero é mais divertido — use o orçamento acima como balança, não
          como prisão. Habilidade ou feito com custo: clique no ícone de 1
          ação / reação / livre — o mesmo do conteúdo oficial.
        </p>
      </div>
    </Panel>
  )
}
