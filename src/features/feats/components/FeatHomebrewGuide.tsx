import { Panel, Tip } from '@/components/ui/Panel'
import type { FeatCategory } from '@/types'
import { FEAT_CATEGORY_LABELS } from '@/utils/labels'

export function FeatHomebrewGuide({
  compact,
  category,
}: {
  compact?: boolean
  category: FeatCategory
}) {
  return (
    <Panel
      title="Como inventar um feito divertido"
      subtitle={FEAT_CATEGORY_LABELS[category] ?? 'Feito'}
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        <p>
          Feito é uma escolha, não uma habilidade automática. Compare com um
          oficial do mesmo tipo e nível: o efeito deve caber naquela prateleira,
          não na seguinte. Duplicar um feito do livro e trocar o lore é o jeito
          mais seguro de ficar no orçamento do Remaster.
        </p>
        <p className="text-xs text-text-dim">
          Custo de ação: clique no ícone (1 ação, 2 ações, reação, livre). O
          mesmo símbolo aparece na ficha e no compêndio. Na descrição, clique
          de novo para inserir o ícone no meio do texto.
        </p>
        <details
          open={!compact}
          className="rounded-lg border border-border bg-surface-2 px-3 py-2"
        >
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
            Orçamento desta prateleira
          </summary>
          <div className="mt-2 space-y-2 text-xs">
            {category === 'skill' && <SkillGuide />}
            {category === 'general' && <GeneralGuide />}
            {category === 'ancestry' && <AncestryGuide />}
            {category === 'class' && <ClassGuide />}
            {category === 'archetype' && <ArchetypeGuide />}
            {category === 'mythic' && <MythicGuide />}
            {category === 'other' && <OtherGuide />}
            <Tip>
              Não invente um tipo novo de slot. A ficha só oferece
              ancestralidade, classe, perícia, geral, arquétipo e mítico.
            </Tip>
          </div>
        </details>
      </div>
    </Panel>
  )
}

function SkillGuide() {
  return (
    <ul className="list-disc space-y-1 pl-4">
      <li>
        Marque o traço <strong>Perícia</strong> (e em geral também{' '}
        <strong>Geral</strong>). Sem Perícia, o slot de perícia da ficha não
        oferece o feito.
      </li>
      <li>
        Pré-requisito típico: treinado (ou especialista) na perícia. Níveis
        pares a partir do 1º ou 2º.
      </li>
      <li>
        Orçamento: um truque de perícia — nova ação, atalho, ou +1 circunstância.
        Não é um feito de classe disfarçado.
      </li>
    </ul>
  )
}

function GeneralGuide() {
  return (
    <ul className="list-disc space-y-1 pl-4">
      <li>
        Traço <strong>Geral</strong>. Encaixa no slot geral (e, se também tiver
        Perícia, no de perícia).
      </li>
      <li>
        Utilidade ampla: idiomas, sentidos leves, exploração. Sem dano de
        combate de feito de classe.
      </li>
    </ul>
  )
}

function AncestryGuide() {
  return (
    <ul className="list-disc space-y-1 pl-4">
      <li>
        Vincule o povo. Sem ancestralidade, o slot de ancestralidade da ficha
        não mostra o feito.
      </li>
      <li>Oficiais saem no 1º, 5º, 9º, 13º e 17º.</li>
      <li>Inclua o nome do povo nos traços (Humano, Elfo…).</li>
    </ul>
  )
}

function ClassGuide() {
  return (
    <ul className="list-disc space-y-1 pl-4">
      <li>
        Vincule a classe. Sem classe, o slot de classe não oferece o feito.
      </li>
      <li>
        Marciais: 1º e níveis pares. Conjuradores: pares a partir do 2º.
        Inclua o nome da classe nos traços.
      </li>
    </ul>
  )
}

function ArchetypeGuide() {
  return (
    <ul className="list-disc space-y-1 pl-4">
      <li>
        Vincule o arquétipo. A Dedicação (nível 2, traço Dedicação) é a porta
        de entrada; o resto vem depois.
      </li>
      <li>
        Traço <strong>Arquétipo</strong>. Sem o vínculo, a ficha não trata o
        feito como parte daquele arquétipo.
      </li>
    </ul>
  )
}

function MythicGuide() {
  return (
    <ul className="list-disc space-y-1 pl-4">
      <li>
        Traço <strong>Mítico</strong>. Só mesas com regras míticas oferecem
        esses slots.
      </li>
      <li>Compare com um feito mítico oficial do mesmo nível.</li>
    </ul>
  )
}

function OtherGuide() {
  return (
    <ul className="list-disc space-y-1 pl-4">
      <li>
        Use só se o feito não encaixa nas prateleiras oficiais. A ficha pode
        não oferecer um slot para ele — prefira Geral, Perícia ou Classe.
      </li>
    </ul>
  )
}
