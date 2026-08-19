import { Panel, Tip } from '@/components/ui/Panel'
import type { CompanionCatalogKind } from '@/types/companion'
import { COMPANION_CATALOG_KIND_LABELS } from '@/types/companion'

/** Guia de design para companheiros homebrew (PF2e Remaster). */
export function CompanionHomebrewGuide({
  compact,
  kind,
}: {
  compact?: boolean
  kind: CompanionCatalogKind
}) {
  return (
    <Panel
      title="Como inventar um companheiro divertido"
      subtitle={COMPANION_CATALOG_KIND_LABELS[kind]}
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        {kind === 'animal' && <AnimalGuide compact={compact} />}
        {kind === 'eidolon' && <EidolonGuide compact={compact} />}
        {kind === 'familiarForm' && <FormGuide compact={compact} />}
        {kind === 'specificFamiliar' && <SpecificGuide compact={compact} />}
      </div>
    </Panel>
  )
}

function AnimalGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Você preenche só a <strong className="text-text">ficha jovem</strong>.
        Maduro, Ágil, Feroz e Especializado o motor aplica sozinho quando o
        mestre pega os feitos. Não invente números de CA, bônus de ataque ou
        PV maduros — isso sai da ficha jovem + nível.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          1. Orçamento jovem
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <strong className="text-text">PV do tipo:</strong> 4 (frágil), 6
              (padrão), 8 (tanque), 10 (raro). Na ficha:{' '}
              <em>PV do tipo + (6 + CON) × nível do mestre</em>.
            </li>
            <li>
              Atributos típicos: um pico 3, o outro físico 1–2, CON 2, INT −4,
              SAB 1–2, CAR 0. Não dê INT 0 num animal — isso é pessoa.
            </li>
            <li>Uma perícia extra (Intimidação, Furtividade ou Sobrevivência).</li>
            <li>
              Velocidade terrestre 25 ou 40 (montaria rápida). Escalada/natação
              iguais à terrestre; voo é tesouro — 1d6 ou 1d4 no golpe.
            </li>
          </ul>
        </div>
      </details>
      <details className="rounded-lg border border-border bg-surface-2 px-3 py-2">
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          2. Ataques e suporte
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <p>
            1 golpe forte (1d8) <em>ou</em> 1d8 + 1d4 ágil. Finesse se for
            Destreza. Traços de arma (derrubar, agarrar) no lugar de dano extra.
          </p>
          <p>
            <strong className="text-text">Benefício de suporte</strong> é o
            presente de 1 ação do mestre: sangramento, amedrontado 1, passo
            extra — algo que o jogador sente na rodada, não um segundo
            personagem.
          </p>
          <p>
            <strong className="text-text">Manobra avançada</strong> (feito
            posterior): 1–2 ações, 1× por minuto ou com restrição clara. Não
            copie um feito de classe de 6º.
          </p>
          <Tip>
            Duplicar Lobo ou Urso e trocar o lore é o jeito mais seguro de
            ficar no orçamento do Remaster.
          </Tip>
        </div>
      </details>
    </>
  )
}

function EidolonGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Eidolon não tem PV próprios — divide a vida com o invocador. Você
        define tradição, tamanhos, CON/INT/SAB/CAR e três poderes. Força e
        Destreza vêm do atributo-chave na ficha.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Os três poderes
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <strong className="text-text">Inicial:</strong> a assinatura de
              1º nível (sopro, tentáculo, aura curta).
            </li>
            <li>
              <strong className="text-text">Simbiose (7º):</strong> o duo fica
              mais perigoso junto — não um segundo conjurador.
            </li>
            <li>
              <strong className="text-text">Transcendência (17º):</strong> o
              momento de chefão, 1× por dia ou por minuto.
            </li>
          </ul>
          <Tip>
            Duas perícias, um idioma, um plano natal. Se precisar de arranjos
            nomeados (Elemental), duplique o oficial.
          </Tip>
        </div>
      </details>
    </>
  )
}

function FormGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Forma de familiar é só a <strong className="text-text">casca</strong>:
        Minúscula, aparência e 0–2 habilidades inatas. Stats são sempre as do
        familiar — a forma não muda PV nem CA.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Inatas
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <p>
            Corvo = Voador. Gato = Escalador + Faro. Peixe = Anfíbio. Cada
            inata ocupa um dos 2 slots diários e não pode ser trocada nas
            preparações.
          </p>
          <Tip>
            Não dê 3 inatas sem custo: o jogador fica sem slot livre. Duas já
            é um familiar “temático demais”.
          </Tip>
        </div>
      </details>
    </>
  )
}

function SpecificGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Familiar específico é um pacote: exige mais slots (em geral 4 ou 6),
        concede habilidades fixas e 1–3 poderes únicos. Não muda as stats
        base do familiar.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <p>
            Se exige 4 habilidades, conceda ~3–4 do catálogo + 1 poder especial.
            Se exige 6, pode ter 5 concedidas + um poder mais forte (1× por
            hora, área pequena, salvaguarda).
          </p>
          <Tip>
            O poder extra deve ter freio (frequência, área, CD de classe ou
            magia). Sem freio vira uma classe minúscula.
          </Tip>
        </div>
      </details>
    </>
  )
}
