import { Panel, Tip } from '@/components/ui/Panel'
import { ITEM_CATEGORY_LABELS, type ItemCategory } from '@/types'
import type { EquipmentCreateKind } from '@/features/equipment/homebrewDefaults'
import { isArtifactItem } from '@/features/equipment/homebrewDefaults'
import type { ItemDefinition } from '@/types'

function kindLabel(kind: EquipmentCreateKind, item?: ItemDefinition): string {
  if (kind === 'artifact' || (item && isArtifactItem(item))) return 'Artefato'
  return ITEM_CATEGORY_LABELS[kind]
}

/** Guia de design por categoria de equipamento (PF2e Remaster). */
export function EquipmentHomebrewGuide({
  compact,
  kind,
  item,
}: {
  compact?: boolean
  kind: EquipmentCreateKind
  item?: ItemDefinition
}) {
  const artifact = kind === 'artifact' || (item != null && isArtifactItem(item))
  const category = artifact ? item?.category ?? 'held' : (kind as ItemCategory)

  return (
    <Panel
      title="Como inventar um item divertido"
      subtitle={kindLabel(kind, item)}
    >
      <div className="space-y-3 text-sm leading-relaxed text-text-muted">
        {artifact ? (
          <ArtifactGuide compact={compact} />
        ) : (
          <CategoryGuide category={category} compact={compact} />
        )}
        <Tip>
          Ativação: clique nos ícones oficiais (1 ação, reação, livre) na
          descrição — o mesmo símbolo do catálogo aparece na ficha.
        </Tip>
      </div>
    </Panel>
  )
}

function ArtifactGuide({ compact }: { compact?: boolean }) {
  return (
    <>
      <p>
        Artefato não é “uma arma mais forte”. É uma peça de história com preço
        inexistente, raridade única e nível 16–25. O poder mora no texto de
        ativação — o chassi (espada, espelho, runa, manto) só diz{' '}
        <em>como</em> o herói carrega isso.
      </p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento de artefato
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            <li>Sem preço. Ninguém vende o Espelho de Sorshen no bazar.</li>
            <li>
              1–3 ativações memoráveis, com freio claro (1×/dia, CD alta, custo
              de ação).
            </li>
            <li>
              O chassi usa o orçamento normal daquela categoria (espada = 1d8
              marcial, não 4d12).
            </li>
          </ul>
          <Tip>
            Duplicar um artefato oficial e trocar o lore é o jeito mais seguro.
          </Tip>
        </div>
      </details>
    </>
  )
}

function CategoryGuide({
  category,
  compact,
}: {
  category: ItemCategory
  compact?: boolean
}) {
  const body = guideBody(category)
  return (
    <>
      <p>{body.lead}</p>
      <details
        open={!compact}
        className="rounded-lg border border-border bg-surface-2 px-3 py-2"
      >
        <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-accent">
          Orçamento desta categoria
        </summary>
        <div className="mt-2 space-y-2 text-xs">
          <ul className="list-disc space-y-1 pl-4">
            {body.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {body.tip && <Tip>{body.tip}</Tip>}
        </div>
      </details>
    </>
  )
}

function guideBody(category: ItemCategory): {
  lead: string
  bullets: string[]
  tip?: string
} {
  switch (category) {
    case 'weapon':
      return {
        lead: 'Arma é número na mesa: dado, grupo, mãos e traços. Não cole um poder de item mágico aqui — isso é arma específica (vestido/segurado) ou runa.',
        bullets: [
          'Simples 1d4–1d6, marcial 1d6–1d8, avançada 1d8–1d12 com traço pesado ou dois.',
          'Dois traços bons (ágil+finesse) pedem dado menor. Fatal/morteira já é o “tempero”.',
          'À distância: alcance (a ficha mostra metros) e recarga. Arco não é clava com número maior.',
        ],
        tip: 'Duplicar Adaga ou Espada longa e só trocar o nome quase sempre fica no ponto.',
      }
    case 'armor':
      return {
        lead: 'Armadura é CA, teto de Destreza e o preço que você paga em penalidade. Roupas de explorador (0 CA, teto 5) não são “armadura zero” — usam proficiência de sem armadura.',
        bullets: [
          'Leve: +1/+2 CA, teto 3–4, penalidade 0/−1.',
          'Média: +3/+4, teto 1–2, −2 teste, −1,5 m.',
          'Pesada: +5/+6, teto 0–1, −3 teste, −3 m, limiar de Força 3–4.',
        ],
        tip: 'Não invente +4 CA em armadura leve. Isso quebra o guerreiro de placas.',
      }
    case 'shield':
      return {
        lead: 'Escudo só existe para Erguer o Escudo: +1 ou +2 de circunstância, dureza, PV e limiar de quebrado.',
        bullets: [
          'Broquel +1, escudo de aço +2, torre +2 com penalidade de deslocamento.',
          'Dureza ~3–15, PV ~6–120. BT costuma ser metade dos PV.',
        ],
      }
    case 'rune':
      return {
        lead: 'Runa não é um item que se empunha — grava em arma, armadura ou escudo. Fundamental é potência/impacto/resiliente; propriedade é o tempero (flamejante, kinslayer).',
        bullets: [
          'Fundamentais: família weapon-potency / striking / armor-potency / resilient.',
          'Propriedade ocupa 1 slot (potência 1 = 1 slot, +2 = 2, +3 = 3).',
          'Dano extra típico: 1d6 no acerto, persistente no crítico. Não some +2d12 em runa de 8º.',
        ],
      }
    case 'worn':
      return {
        lead: 'Item vestido mágico pede investimento (máx. 10). O bônus é de item, não de circunstância — não acumula com outro item na mesma estatística.',
        bullets: [
          'Nv. 3: +1 numa perícia. Nv. 10: +2. Nv. 17: +3.',
          'Resistência a energia escala com o nível (5 / 10 / 15).',
          'Uma ativação boa vale mais que três números escondidos.',
        ],
      }
    case 'held':
      return {
        lead: 'Item segurado ocupa a mão. Varinha e cajado têm categorias próprias — aqui é a bola de cristal, o orbe, o estandarte.',
        bullets: [
          'Diga se precisa de 1 ou 2 mãos no texto.',
          'Ativação com ação e frequência. Sem frequência vira classe minúscula.',
        ],
      }
    case 'apex':
      return {
        lead: 'Ápice sobe um atributo em +2 (item) e só um ápice funciona por vez. Nível típico 17. Não é um anel de proteção disfarçado.',
        bullets: [
          'Escolha UM atributo.',
          'Pode ter um benefício menor extra (percepção, uma perícia) — não um segundo +2.',
        ],
      }
    case 'staff':
      return {
        lead: 'Cajado é uma lista de magias por grau, carregada na preparação. O conjurador gasta espaços ou cargas.',
        bullets: [
          'Grau 1: 1–2 magias. Cada grau acima acrescenta 1 magia daquele grau.',
          'Tradição coerente (primal no cajado da selva, não mísseis mágicos).',
        ],
      }
    case 'wand':
      return {
        lead: 'Varinha = uma magia, um grau, 1×/dia (com sobrecarga arriscada). Não é um cajado de bolso.',
        bullets: [
          'Preço e nível seguem o grau da magia (varinha de 1º ~ nv. 3).',
          'Varinha especial (continuação, alargamento) altera a magia, não troca o grau.',
        ],
      }
    case 'consumable':
      return {
        lead: 'Poção, óleo, pergaminho e talismã são gastos ao usar. O poder precisa caber numa ação e desaparecer.',
        bullets: [
          'Poção de cura: 1d8 / 2d8+5 / 3d8+10… não invente 20d8 no 1º nível.',
          'Talismã afixa em arma ou armadura e dispara num gatilho.',
          'Pergaminho só guarda o grau — a magia é escolhida na ficha.',
        ],
      }
    case 'alchemical':
      return {
        lead: 'Alquímico não é magia. Bomba ataca; elixir bebe; mutagênico tem benefício E desvantagem; veneno tem CD e estágios.',
        bullets: [
          'Bomba: 1d8 + respingo 1 no menor; o item bonus de ataque escala (1/2/3).',
          'Mutagênico sem desvantagem não é mutagênico.',
          'Veneno: CD ~ 15 + 2×nível, 2–3 estágios, duração curta.',
        ],
      }
    case 'spellheart':
      return {
        lead: 'Coração de magia afixa em arma ou armadura e dá um truque + um benefício passivo diferente em cada hospedeiro.',
        bullets: [
          'Arma: dano extra ou traço. Armadura: resistência ou deslocamento.',
          'Magias diárias de 1º–3º, não uma lista de mago.',
        ],
      }
    case 'grimoire':
      return {
        lead: 'Grimório é um livro estudado (um por dia) com uma ativação de 1 minuto e um efeito de preparação.',
        bullets: [
          'Frequência 1×/dia. Efeito ajuda a conjurar, não substitui a classe.',
        ],
      }
    case 'snare':
      return {
        lead: 'Cilada é armadilha de 1 minuto de fabricação, uma vez, num quadrado.',
        bullets: [
          'CD de classe ou de Ofício. Área pequena. Não é uma bola de fogo permanente.',
        ],
      }
    case 'ammunition':
      return {
        lead: 'Munição só diz quais grupos de arma a usam. Dano fica na arma.',
        bullets: ['Arco, besta, funda, arma de fogo. Carga L por feixe.'],
      }
    case 'adventuringGear':
      return {
        lead: 'Corda, lampião, kit de ladrão. Preço baixo, carga honesta, sem bônus de item.',
        bullets: [
          'Se precisa investir ou dá +1 em perícia, isso já é item vestido mágico.',
        ],
      }
    case 'material':
      return {
        lead: 'Material precioso (prata, frioferro) é componente de preço, não um item vestido.',
        bullets: ['Descreva o que o material faz em arma/armadura no texto.'],
      }
    default:
      return {
        lead: 'Item fora das categorias clássicas: descreva o uso e não invente CA ou dado de arma se não for arma/armadura.',
        bullets: ['Nível e raridade honestos. Preço vazio só para artefato ou recompensa de trama.'],
      }
  }
}
