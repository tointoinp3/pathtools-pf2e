import type { CombatAction } from '@/types/action'

/**
 * Ações básicas e especiais — Player Core (Remaster).
 * Referência: https://2e.aonprd.com/Actions.aspx
 * Textos em pt-BR para uso rápido na mesa.
 */
export const BASIC_ACTIONS: CombatAction[] = [
  {
    id: 'action-aid',
    name: 'Auxiliar',
    originalName: 'Aid',
    actionType: 'reaction',
    category: 'basic',
    traits: [],
    trigger:
      'Um aliado está prestes a usar uma ação que exige teste de perícia ou ataque.',
    requirements:
      'O aliado aceita sua ajuda e você se preparou para ajudar (geralmente com 1 ação no seu turno).',
    description:
      'Você tenta ajudar um aliado. Explique ao mestre como está ajudando; ele define se é possível e qual teste fazer (CD típica 15). Sucesso crítico: +2 de circunstância no teste do aliado (+3 se mestre, +4 se lendário). Sucesso: +1. Falha crítica: −1 de circunstância. Preparar ajuda longa ou repetida pode exigir mais ações ou CD maior.',
    source: 'Player Core pg. 416',
  },
  {
    id: 'action-crawl',
    name: 'Rastejar',
    originalName: 'Crawl',
    actionType: 'one',
    category: 'basic',
    traits: ['movimento'],
    requirements:
      'Você está caído e sua Velocidade é pelo menos 3 m.',
    description: 'Você se move 1,5 m rastejando e permanece caído.',
    source: 'Player Core pg. 416',
  },
  {
    id: 'action-delay',
    name: 'Adiar',
    originalName: 'Delay',
    actionType: 'free',
    category: 'basic',
    traits: [],
    trigger: 'Seu turno começa.',
    description:
      'Você espera o momento certo. O resto do turno não acontece agora: você sai da ordem de iniciativa e pode voltar como ação livre no fim do turno de qualquer criatura. Isso muda permanentemente sua iniciativa. Sem reações até voltar. Se adiar uma rodada inteira sem voltar, perde as ações daquele turno. Efeitos negativos do início/fim do turno ocorrem ao Adiar; benefícios que terminariam no seu turno também terminam.',
    source: 'Player Core pg. 416',
  },
  {
    id: 'action-drop-prone',
    name: 'Deitar-se',
    originalName: 'Drop Prone',
    actionType: 'one',
    category: 'basic',
    traits: ['movimento'],
    description: 'Você fica caído.',
    source: 'Player Core pg. 416',
  },
  {
    id: 'action-escape',
    name: 'Escapar',
    originalName: 'Escape',
    actionType: 'one',
    category: 'basic',
    traits: ['ataque'],
    description:
      'Tente se libertar de agarrado, imobilizado ou contido. Escolha a fonte da condição e faça um teste com o modificador de ataque desarmado contra a CD do efeito (Atletismo de quem agarra, Ladroagem se amarrado, CD de magia etc.). Pode usar Acrobacia ou Atletismo no lugar (ainda com o traço ataque). Sucesso crítico: livre + Avançar até 1,5 m. Sucesso: livre. Falha crítica: não escapa e não tenta de novo até o próximo turno.',
    source: 'Player Core pg. 416',
  },
  {
    id: 'action-interact',
    name: 'Interagir',
    originalName: 'Interact',
    actionType: 'one',
    category: 'basic',
    traits: ['manipulação'],
    description:
      'Usa a(s) mão(s) para manipular objeto ou terreno: pegar item, sacar arma, trocar item em mãos, abrir porta ou efeito similar. Em casos raros o mestre pode pedir um teste de perícia.',
    source: 'Player Core pg. 416',
  },
  {
    id: 'action-leap',
    name: 'Saltar',
    originalName: 'Leap',
    actionType: 'one',
    category: 'basic',
    traits: ['movimento'],
    description:
      'Salto curto. Horizontal: até 3 m se Velocidade ≥ 4,5 m, ou até 4,5 m se Velocidade ≥ 9 m (não pode se Velocidade < 4,5 m). Vertical: até ~90 cm para cima e 1,5 m na horizontal até uma superfície elevada. Distâncias maiores usam Atletismo (Salto Alto / Salto Longo).',
    source: 'Player Core pg. 417',
  },
  {
    id: 'action-ready',
    name: 'Preparar',
    originalName: 'Ready',
    actionType: 'two',
    category: 'basic',
    traits: ['concentração'],
    description:
      'Prepara uma ação ou ação livre (sem gatilho próprio) para fora do seu turno. Escolha a ação e um gatilho; seu turno termina. Se o gatilho ocorrer antes do próximo turno, usa a ação como reação (se ainda cumprir requisitos). Ataque preparado usa o MAP que você tinha ao Preparar.',
    source: 'Player Core pg. 417',
  },
  {
    id: 'action-release',
    name: 'Soltar',
    originalName: 'Release',
    actionType: 'free',
    category: 'basic',
    traits: ['manipulação'],
    description:
      'Solta algo na(s) mão(s): largar item, tirar uma mão da arma, soltar corda etc. Diferente da maioria das ações de manipulação, Soltar não dispara reações que reagem a manipulação (ex.: Golpe Reativo). Fora do turno, use Preparar.',
    source: 'Player Core pg. 417',
  },
  {
    id: 'action-seek',
    name: 'Procurar',
    originalName: 'Seek',
    actionType: 'one',
    category: 'basic',
    traits: ['concentração', 'segredo'],
    description:
      'Varre uma área em busca de criaturas, objetos, portas secretas ou perigos. O mestre define a área (quase sempre ≤ 9 m) e faz um teste secreto de Percepção contra CDs de Furtividade / detectar objetos. Sucesso crítico: criatura escondida ou indetectável vira observada; localiza objetos. Sucesso: indetectável vira escondida; escondida vira observada; pista do objeto.',
    source: 'Player Core pg. 417',
  },
  {
    id: 'action-sense-motive',
    name: 'Avaliar Motivações',
    originalName: 'Sense Motive',
    actionType: 'one',
    category: 'basic',
    traits: ['concentração', 'segredo'],
    description:
      'Avalia se o comportamento de uma criatura é anormal. O mestre faz Percepção secreta vs CD de Enganação, CD de magia mental ou similar. Em geral não pode tentar de novo na mesma criatura até a situação mudar. Sucesso crítico: intenções verdadeiras e ideia de magia mental. Sucesso: sabe se está normal, sem detalhes. Falha: acredita no que o enganador quer. Falha crítica: leitura falsa.',
    source: 'Player Core pg. 417',
  },
  {
    id: 'action-stand',
    name: 'Levantar-se',
    originalName: 'Stand',
    actionType: 'one',
    category: 'basic',
    traits: ['movimento'],
    description: 'Você se levanta e deixa de estar caído.',
    source: 'Player Core pg. 418',
  },
  {
    id: 'action-step',
    name: 'Passo',
    originalName: 'Step',
    actionType: 'one',
    category: 'basic',
    traits: ['movimento'],
    requirements: 'Sua Velocidade é pelo menos 3 m.',
    description:
      'Move 1,5 m com cuidado. Não dispara reações a movimento (ex.: Golpe Reativo). Não pode entrar em terreno difícil nem usar Velocidade que não seja a terrestre.',
    source: 'Player Core pg. 418',
  },
  {
    id: 'action-stride',
    name: 'Avançar',
    originalName: 'Stride',
    actionType: 'one',
    category: 'basic',
    traits: ['movimento'],
    description: 'Você se move até sua Velocidade.',
    source: 'Player Core pg. 418',
  },
  {
    id: 'action-strike',
    name: 'Golpear',
    originalName: 'Strike',
    actionType: 'one',
    category: 'basic',
    traits: ['ataque'],
    description:
      'Ataca com arma empunhada ou ataque desarmado contra uma criatura no alcance (corpo a corpo) ou alcance (à distância). Role o ataque e compare com a CA. Sucesso crítico: dano dobrado. Sucesso: dano normal. O dano usa o dado da arma/ataque + modificadores.',
    source: 'Player Core pg. 418',
  },
  {
    id: 'action-take-cover',
    name: 'Cobrir-se',
    originalName: 'Take Cover',
    actionType: 'one',
    category: 'basic',
    traits: [],
    requirements:
      'Você tem cobertura padrão, está perto de algo que permita cobrir-se, ou está caído.',
    description:
      'Aproveita melhor a cobertura. Cobertura padrão vira cobertura maior (+4 de circunstância a CA, Reflexos vs área e Furtividade para Esconder/Sorratear). Caso contrário ganha cobertura padrão (+2). Caído: cobertura maior vs ataques à distância. Dura até você sair do espaço, usar ação de ataque, ficar inconsciente ou encerrar como ação livre.',
    source: 'Player Core pg. 418',
  },

  // —— Specialty basic actions ——
  {
    id: 'action-activate-item',
    name: 'Ativar um Item',
    originalName: 'Activate an Item',
    actionType: 'variable',
    category: 'specialty',
    traits: [],
    requirements:
      'Item com traço investido só se estiver investido por você. Se precisar Interagir, empunhe ou toque com mão livre.',
    description:
      'Ativa o efeito do item conforme o bloco de estatísticas (número variável de ações, reação ou ação livre). Componentes comuns: comando (auditivo, concentração), visualizar (concentração), interagir (manipulação), conjurar magia. Ativações longas (minutos/horas) têm traço exploração.',
    source: 'Player Core',
  },
  {
    id: 'action-arrest-fall',
    name: 'Interromper uma Queda',
    originalName: 'Arrest a Fall',
    actionType: 'reaction',
    category: 'specialty',
    traits: [],
    trigger: 'Você está caindo.',
    requirements: 'Você tem Velocidade de voo.',
    description:
      'Faça um teste de Acrobacia ou salvaguarda de Reflexos (CD típica 15) para amenizar a queda. Sucesso: sem dano da queda.',
    source: 'Player Core pg. 418',
  },
  {
    id: 'action-avert-gaze',
    name: 'Desviar o Olhar',
    originalName: 'Avert Gaze',
    actionType: 'one',
    category: 'specialty',
    traits: [],
    description:
      'Desvia o olhar de perigos como o olhar de uma medusa. +2 de circunstância em salvaguardas contra habilidades visuais que exigem olhar a uma criatura/objeto. Permanece até o início do próximo turno.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-burrow',
    name: 'Escavar',
    originalName: 'Burrow',
    actionType: 'one',
    category: 'specialty',
    traits: ['movimento'],
    requirements: 'Você tem Velocidade de escavação.',
    description:
      'Cava por terra, areia ou material solto similar até sua Velocidade de escavação. Não atravessa rocha ou material mais denso salvo habilidade que permita.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-cast-spell',
    name: 'Conjurar uma Magia',
    originalName: 'Cast a Spell',
    actionType: 'variable',
    category: 'specialty',
    traits: [],
    description:
      'O custo em ações varia conforme o bloco da magia. Truques, magias de espaço e de foco usam o mesmo processo; gaste o espaço ou 1 Ponto de Foco conforme o caso. Qualquer magia conta como atividade Conjurar uma Magia.',
    source: 'Player Core pg. 299',
  },
  {
    id: 'action-dismiss',
    name: 'Dispensar',
    originalName: 'Dismiss',
    actionType: 'one',
    category: 'specialty',
    traits: ['concentração'],
    description:
      'Encerra um efeito que diga que você pode Dispensar. Em geral termina o efeito inteiro, salvo indicação em contrário.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-fly',
    name: 'Voar',
    originalName: 'Fly',
    actionType: 'one',
    category: 'specialty',
    traits: ['movimento'],
    requirements: 'Você tem Velocidade de voo.',
    description:
      'Move-se no ar até sua Velocidade de voo. Subir conta como terreno difícil. Descer em linha reta: 3 m por cada 1,5 m gastos. Ao pousar no chão, sem dano de queda. Pode Voar 0 m para pairar. Se estiver no ar no fim do turno e não usou Voar nesta rodada, você cai.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-grab-edge',
    name: 'Agarrar uma Borda',
    originalName: 'Grab an Edge',
    actionType: 'reaction',
    category: 'specialty',
    traits: ['manipulação'],
    trigger: 'Você cai de ou passa por uma borda ou apoio.',
    requirements: 'Mãos não amarradas atrás das costas nem de outro modo restringidas.',
    description:
      'Tenta agarrar a borda (Acrobacia ou Reflexos, em geral CD de Escalada). Sucesso crítico: agarra mesmo sem mão livre; trata a queda como 9 m mais curta. Sucesso: com mão livre, para a queda (trata como 6 m mais curta). Falha crítica: continua caindo; se já caiu ≥ 6 m, +10 de dano contundente a cada 6 m caídos.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-invest-item',
    name: 'Investir um Item',
    originalName: 'Invest an Item',
    actionType: 'variable',
    category: 'specialty',
    traits: [],
    description:
      'Itens mágicos com traço investido só concedem benefícios constantes após investidos (até 10 por dia). A investidura dura até remover o item; o item ainda conta no limite do dia. Reinicia nas preparações diárias.',
    source: 'GM Core pg. 219',
  },
  {
    id: 'action-mount',
    name: 'Montar',
    originalName: 'Mount',
    actionType: 'one',
    category: 'specialty',
    traits: ['movimento'],
    requirements:
      'Adjacente a uma criatura pelo menos um tamanho maior e disposta a ser montaria.',
    description:
      'Sobe na criatura e a monta. Se já estiver montado, pode desmontar para um espaço adjacente.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-point-out',
    name: 'Apontar',
    originalName: 'Point Out',
    actionType: 'one',
    category: 'specialty',
    traits: ['auditivo', 'manipulação', 'visual'],
    requirements:
      'Uma criatura está indetectável para um ou mais aliados, mas não para você.',
    description:
      'Indica a criatura a aliados que possam vê-lo e potencialmente detectá-la. Ela passa a escondida (não indetectável) para esses aliados. Se não ouvirem/entenderem, precisam passar em Percepção vs CD de Furtividade da criatura ou erram a localização.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-raise-shield',
    name: 'Erguer um Escudo',
    originalName: 'Raise a Shield',
    actionType: 'one',
    category: 'specialty',
    traits: [],
    requirements: 'Você está empunhando um escudo.',
    description:
      'Posiciona o escudo. Ganha o bônus de circunstância à CA listado no escudo. Permanece erguido até o início do próximo turno.',
    source: 'Player Core pg. 419',
  },
  {
    id: 'action-sustain',
    name: 'Sustentar',
    originalName: 'Sustain',
    actionType: 'one',
    category: 'specialty',
    traits: ['concentração'],
    description:
      'Escolha um efeito com duração sustentada ou benefício ao Sustentar. Se tiver duração sustentada, estende até o fim do próximo turno (sustentar mais de uma vez no mesmo turno não estende além). Sem limite listado: até 10 minutos. Pode haver benefício extra. Se a ação for interrompida, o efeito termina.',
    source: 'Player Core pg. 419',
  },
]
