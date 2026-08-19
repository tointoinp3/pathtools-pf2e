import { alchemicalItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

export const PLAYER_CORE_2_TOOLS: ItemDefinition[] = [
  alchemicalItem({
    id: 'alch-3355',
    aonId: 3355,
    name: 'Bastão luminescente',
    originalName: 'Glow Rod',
    level: 1,
    priceGp: 3,
    page: 295,
    alchemical: {
      kind: 'tool',
      effectFamily: 'glow-rod',
      tool: {
        duration: '6 horas',
        note: 'Luz intensa num raio de 20 pés e luz fraca nos 40 pés seguintes.',
      },
    },
    description:
      'Bastão de cerca de 1 pé com ponta dourada. Ao bater numa superfície dura, brilha por 6 horas: luz intensa num raio de 20 pés e luz fraca nos 40 pés seguintes.',
  }),
  alchemicalItem({
    id: 'alch-3356',
    aonId: 3356,
    name: 'Palito de fósforo',
    originalName: 'Matchstick',
    level: 1,
    priceGp: 0.2,
    page: 295,
    bulk: '—',
    alchemical: {
      kind: 'tool',
      tool: {
        duration: '1 rodada',
        note: 'Acender e tocar um objeto inflamável faz parte da mesma ação de Interagir. Permanece aceso 1 rodada.',
      },
    },
    description:
      'Palito minúsculo com substância alquímica numa ponta. Acende ao riscar numa superfície áspera, bem mais rápido que pederneira. Você pode acender e tocar um objeto inflamável na mesma ação de Interagir. Permanece aceso 1 rodada e então se consome.',
  }),
  alchemicalItem({
    id: 'alch-3358',
    aonId: 3358,
    name: 'Unguento de prata',
    originalName: 'Silver Salve',
    level: 2,
    priceGp: 6,
    page: 296,
    alchemical: {
      kind: 'tool',
      effectFamily: 'silver-salve',
      tool: {
        duration: '1 hora',
        note: 'A arma (ou 10 munições) conta como prata no lugar do material precioso normal para dano físico.',
      },
    },
    description:
      'Pasta prateada para uma arma corpo a corpo ou à distância, ou 10 munições. O frasco inteiro se gasta de uma vez. Por 1 hora, a arma ou munição conta como prata no lugar do material precioso normal (como ferro frio) para qualquer dano físico.',
  }),
  alchemicalItem({
    id: 'alch-3359',
    aonId: 3359,
    name: 'Pomada de costura da pele',
    originalName: 'Skinstitch Salve',
    level: 7,
    priceGp: 55,
    page: 296,
    traits: ['Healing'],
    alchemical: {
      kind: 'tool',
      tool: {
        note: 'Administrar costura (1 ação): Primeiros Socorros sem ferramentas de curandeiro, com +2 de item em Medicina ou usando +13 da pomada. Costurar feridas (ação livre, ao Tratar Ferimentos ou Medicina de Batalha): +2 de item; sucesso vira sucesso crítico.',
      },
    },
    description:
      'Pomada grudenta que fecha feridas e acelera a cura natural. Administrar costura (1 ação, manipular): você faz Primeiros Socorros sem ferramentas de curandeiro e pode ganhar +2 de bônus de item no teste de Medicina ou usar o modificador +13 da pomada. Costurar feridas (ação livre, manipular; gatilho: você Trata Ferimentos ou usa Medicina de Batalha): +2 de bônus de item no teste; se o resultado for sucesso, vira sucesso crítico.',
  }),
  ...[
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 5, priceGp: 21, rank: '3º', mod: 9 },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 12, priceGp: 325, rank: '6º', mod: 19 },
    { key: 'greater', name: 'maior', original: 'Greater', level: 18, priceGp: 3250, rank: '9º', mod: 28 },
  ].map((grade) =>
    alchemicalItem({
      id: `alch-3351-${grade.key}`,
      aonId: 3351,
      name: `Solvente absoluto ${grade.name}`,
      originalName: `Absolute Solvent (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 295,
      alchemical: {
        kind: 'tool',
        tool: {
          note: `Dissolve adesivos (inclusive adesivo eterno). Contraposição posto ${grade.rank}, modificador +${grade.mod}.`,
        },
      },
      description: `Feito para dissolver adesivo eterno, quebra quase qualquer cola. Contraposição posto ${grade.rank} e modificador +${grade.mod}.`,
    }),
  ),
  alchemicalItem({
    id: 'alch-3352',
    aonId: 3352,
    name: 'Adesivo eterno',
    originalName: 'Everlasting Adhesive',
    level: 7,
    priceGp: 55,
    page: 295,
    alchemical: {
      kind: 'tool',
      tool: {
        note: '1 minuto para unir duas superfícies (até 1 pé quadrado). Separar: Atletismo CD 50. Em criatura só se ela quiser; a pele sai com esfoliação.',
      },
    },
    description:
      'Cola âmbar quase inseparável. Um frasco cobre até 1 pé quadrado e precisa ser usado de uma vez. Se a ativação (1 minuto) for interrompida, a cola se perde. Depois de unir, só Atletismo CD 50 separa — o objeto costuma quebrar antes. Em criatura só funciona se ela quiser; o vínculo some ao esfoliar a pele.',
  }),
  alchemicalItem({
    id: 'alch-3353',
    aonId: 3353,
    name: 'Corante forense',
    originalName: 'Forensic Dye',
    level: 1,
    priceGp: 3,
    page: 295,
    alchemical: {
      kind: 'tool',
      tool: {
        note: 'Ative misturando um pouco de outro material (sangue, lama). Por 10 minutos, 1 minuto para pintar um objeto de volume 1 ou um quadrado de 5 pés. Fica azul-brilhante só onde o material bate certo.',
      },
    },
    description:
      'Líquido incolor. Ative misturando um pouco de outro químico ou material (sangue, lama): reage, fica marrom-avermelhado e volta a ficar claro. Por até 10 minutos, gaste 1 minuto para pincelar um objeto de até 1 de volume ou um quadrado de 5 pés no chão. O corante fica azul-brilhante só no contato com uma correspondência exata do material, e transparente no resto.',
  }),
  alchemicalItem({
    id: 'alch-3354',
    aonId: 3354,
    name: 'Tinta fantasma',
    originalName: 'Ghost Ink',
    level: 1,
    priceGp: 3,
    page: 295,
    alchemical: {
      kind: 'tool',
      tool: {
        note: 'Seca em 1 minuto e some. Brilha vermelho no calor (ou na luz que a fórmula escolher). Percepção CD 25 para notar; sucesso crítico permite Decifrar Escrita. Um frasco = uma página.',
      },
    },
    description:
      'Tinta azul-pálida que seca em 1 minuto e fica invisível. Brilha vermelho no calor (tocha ou chama). O brilho dura só enquanto houver calor. Quem formula pode trocar o gatilho para luz do sol, estrelas, luz mágica ou luz sem calor de efeito alquímico (como bastão luminescente). Sem brilhar, Percepção CD 25 ao examinar de perto detecta a tinta; sucesso crítico permite Sociedade para Decifrar Escrita. Um frasco escreve uma página.',
  }),
  alchemicalItem({
    id: 'alch-3357',
    aonId: 3357,
    name: 'Pedra filosofal',
    originalName: "Philosopher's Stone",
    level: 20,
    priceGp: 0,
    page: 295,
    rarity: 'uncommon',
    traits: ['Uncommon'],
    bulk: 2,
    alchemical: {
      kind: 'tool',
      tool: {
        note: 'Só com o feito Criar pedra filosofal, uma vez por mês nas preparações. Forçar Abertura CD 35 revela o mercúrio. Lendário em Ofício + Criação Alquímica: vira elixir de rejuvenescimento (1 ação num elixir da vida verdadeiro infundido) ou, até 1 mês de intervalo, ferro→prata ou chumbo→ouro (tarefa de 20º nível, 500 po/dia no sucesso, 750 no crítico).',
      },
    },
    description:
      'Pedra fuliginosa comum à vista. Quem tem o feito Criar pedra filosofal ganha a fórmula e cria uma por mês nas preparações (alquimia avançada); dura 1 mês ou até criar outra. Forçar Abertura CD 35 quebra e revela o mercúrio raro. Com Ofício lendário e Criação Alquímica: (1) 1 ação de Interagir aplica o mercúrio a um elixir da vida verdadeiro infundido e o vira elixir de rejuvenescimento infundido na hora; ou (2) até 1 mês de intervalo aplica em ferro para prata ou chumbo para ouro — trate como tarefa de 20º nível para Ganhar Renda com Ofício, 500 po do metal por dia no sucesso ou 750 no crítico. Duas mãos.',
  }),
  alchemicalItem({
    id: 'alch-3361',
    aonId: 3361,
    name: 'Óleo de cobra',
    originalName: 'Snake Oil',
    level: 1,
    priceGp: 2,
    page: 296,
    alchemical: {
      kind: 'tool',
      tool: {
        note: 'Num ferimento ou sintoma visível: some por 1 hora (os efeitos continuam). Percepção CD 17 com Buscar específico denuncia a farsa. Duas mãos.',
      },
    },
    description:
      'Passe num ferimento ou sintoma visível (feridas de doença, mancha de veneno). Por 1 hora o sintoma some e a criatura não sente o mal — mas todos os efeitos continuam. Alguém denuncia a farsa com Percepção CD 17, só se usar Buscar para examinar o efeito. Duas mãos.',
  }),
  alchemicalItem({
    id: 'alch-3362',
    aonId: 3362,
    name: 'Sais atemporais',
    originalName: 'Timeless Salts',
    level: 4,
    priceGp: 14,
    page: 296,
    alchemical: {
      kind: 'tool',
      tool: {
        duration: '1 semana',
        note: 'Num objeto de até 10 pés cúbicos e 40 de volume: não apodrece por 1 semana. Em cadáver, estende o prazo de magias de reviver e de cadáver falante. 1 ação de Interagir dispersa os sais.',
      },
    },
    description:
      'Salpique num único objeto de até 10 pés cúbicos e no máximo 40 de volume: ele não apodrece por 1 semana, e efeitos que exigem o item fresco não contam esse tempo. Num cadáver, estende o prazo para magia devolver a vida e a espera antes de cadáver falante de novo. Impede pragas comuns (larvas, traças). Qualquer um gasta 1 ação de Interagir para espalhar os sais de um objeto sem dono e encerrar o efeito.',
  }),
]
