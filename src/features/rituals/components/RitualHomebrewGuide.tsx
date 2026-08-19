import { Panel, Tip } from '@/components/ui/Panel'

/** Guia de design para rituais homebrew (PF2e Remaster). Sem magia de combate. */
export function RitualHomebrewGuide({ compact }: { compact?: boolean }) {
  return (
    <Panel title="Como inventar um ritual divertido" subtitle="Ritual">
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        <p>
          Ritual <strong className="text-text">não é magia</strong>. Não tem
          tradição, não gasta espaço, não cabe em 3 ações. É uma cena de
          exploração: horas ou dias, teste de perícia, custo em PO e, às
          vezes, conjuradores secundários.
        </p>
        <details
          open={!compact}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2"
        >
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            1. Tempo, custo e CD
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <ul className="list-disc space-y-1 pl-4">
              <li>
                Tempo típico: 1 hora (simples) ou 1 dia (padrão). Postos altos
                podem pedir 1 semana.
              </li>
              <li>
                Custo: ingredientes raros, em geral dezenas de PO × posto.
                Sem custo, vira truque disfarçado.
              </li>
              <li>
                Teste principal: Arcanismo, Natureza, Ocultismo ou Religião.
                Treinado nos postos 1–2, especialista 3–5, mestre 6–7,
                lendário 8–10.
              </li>
            </ul>
          </div>
        </details>
        <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            2. Secundários e o que o ritual faz
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            <p>
              Conjuradores secundários (0–3) fazem testes de apoio
              (Performance, Ofício, Diplomacia…). O efeito deve mudar a
              história — viagem planar, vínculo, maldição, informação — não
              causar 8d10 numa criatura no combate.
            </p>
            <Tip>
              Qualquer personagem pode conhecer um ritual. A ficha só marca
              “conhecido”; o teste usa a perícia, não o ataque de magia.
            </Tip>
          </div>
        </details>
      </div>
    </Panel>
  )
}
