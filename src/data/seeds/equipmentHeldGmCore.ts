import { heldItem } from './equipmentFactory'
import type { ItemDefinition } from '@/types/equipment'

const MINIATURE_LORE =
  'Miniatura de madeira ou estanho com uma runa na base. Ativar (1 ação, manipular) transforma-a no objeto descrito — só uma vez, na maioria dos casos de forma permanente.'

export const GM_CORE_HELD: ItemDefinition[] = [
  heldItem({
    id: 'held-3002-campfire',
    aonId: 3002,
    name: 'Miniatura maravilhosa (fogueira)',
    originalName: 'Marvelous Miniature (Campfire)',
    level: 1,
    priceGp: 1,
    page: 268,
    traits: ['Consumable', 'Expandable'],
    wornMagic: {
      activate: '1 ação (manipular): vira uma fogueira acesa por 8 horas, sem precisar cuidar.',
      note: 'Consumida ao ativar.',
    },
    description: `${MINIATURE_LORE} Vira uma fogueira acesa que dura 8 horas e pode ser apagada como qualquer fogueira.`,
  }),
  heldItem({
    id: 'held-3002-ladder',
    aonId: 3002,
    name: 'Miniatura maravilhosa (escada)',
    originalName: 'Marvelous Miniature (Ladder)',
    level: 1,
    priceGp: 3,
    page: 268,
    traits: ['Consumable', 'Expandable'],
    wornMagic: {
      activate: '1 ação (manipular): vira uma escada de madeira de 20 pés, permanente.',
      note: 'Consumida ao ativar.',
    },
    description: `${MINIATURE_LORE} Vira uma escada de madeira de 20 pés, de forma permanente.`,
  }),
  heldItem({
    id: 'held-3002-horse',
    aonId: 3002,
    name: 'Miniatura maravilhosa (cavalo)',
    originalName: 'Marvelous Miniature (Horse)',
    level: 4,
    priceGp: 13,
    page: 268,
    traits: ['Consumable', 'Expandable'],
    wornMagic: {
      activate: '1 ação (manipular): vira um cavalo de montaria que segue ordens básicas, não ataca nem usa reações, e não precisa comer.',
      note: 'Consumida ao ativar.',
    },
    description: `${MINIATURE_LORE} Vira um cavalo de montaria que segue ordens básicas, não ataca nem usa reações e não precisa comer.`,
  }),
  heldItem({
    id: 'held-3017',
    aonId: 3017,
    name: 'Ar em garrafa',
    originalName: 'Bottled Air',
    level: 7,
    priceGp: 320,
    page: 273,
    bulk: 'L',
    traits: ['Air'],
    wornMagic: {
      activate:
        'Desarrolhe (Interagir) e Inalar (1 ação, manipular): respira ar fresco mesmo em ambiente sem ar ou tóxico. O ar não vaza da boca da garrafa.',
    },
    description:
      'Garrafa de vidro com rolha e ar fresco sem fim. Precisa desarrolhar antes de ativar. Cada inalação permite respirar mesmo sem ar ou em ambiente tóxico.',
  }),
  heldItem({
    id: 'held-3018',
    aonId: 3018,
    name: 'Bolsa de nuvem',
    originalName: 'Cloud Pouch',
    level: 6,
    priceGp: 225,
    page: 273,
    bulk: 1,
    traits: ['Water'],
    wornMagic: {
      activate:
        'Dispersar (2 ações, manipular): 1 vez por hora. Pó vira nuvem num raio de 20 pés a até 10 pés, como névoa. Pode Sustentar para a nuvem Voar 20 pés. Dura 1 minuto; pode Dispensar.',
      frequency: '1 vez por hora',
    },
    description:
      'Sacola com pó prateado sedoso. Ao espalhar, forma uma nuvem de névoa que você pode mover sustentando a ativação.',
  }),
  ...crystalBalls(),
  ...eternalEruptions(),
  heldItem({
    id: 'held-3021',
    aonId: 3021,
    name: 'Cristal de luz eterna',
    originalName: 'Everlight Crystal',
    level: 1,
    priceGp: 15,
    page: 273,
    bulk: 'L',
    traits: ['Light'],
    wornMagic: {
      note: 'Luz brilhante permanente num raio de 20 pés e luz fraca nos 20 pés seguintes. Sem calor, sem oxigênio; dá para cobrir o cristal.',
    },
    description:
      'Pedra ou gema que emite luz mágica constante: brilhante em 20 pés e fraca nos 20 seguintes. Não precisa de oxigênio, não esquenta e não apaga — só cobre.',
  }),
  heldItem({
    id: 'held-3022',
    aonId: 3022,
    name: 'Yurt do explorador',
    originalName: "Explorer's Yurt",
    level: 9,
    priceGp: 880,
    page: 273,
    bulk: 1,
    traits: ['Structure'],
    wornMagic: {
      activate:
        'Desenrolar (10 minutos, manipular): 1 vez ao dia. Vira uma yurt com fogueira, 10 colchonetes, utensílios e comida básica para você e até 9 criaturas Médias. Luz e fogo de dentro não iluminam o lado de fora.',
      frequency: '1 vez ao dia',
    },
    description:
      'Tenda enrolada, sempre um pouco suja. Ao ativar, vira uma yurt espaçosa que abriga e alimenta até 10 criaturas Médias sem teste de Sobrevivência para Subsistir.',
  }),
  heldItem({
    id: 'held-3023',
    aonId: 3023,
    name: 'Vassoura voadora',
    originalName: 'Flying Broomstick',
    level: 12,
    priceGp: 1900,
    page: 274,
    bulk: 1,
    wornMagic: {
      activate:
        'Decolar (2 ações, concentrar e manipular): nomeie um destino no mesmo plano; a vassoura voa a 40 pés. Sem duas mãos no cabo, ela parte sozinha. Se você não souber bem o destino, a vassoura pode se perder.',
      note: 'Pode montar com uma mão: voo de 20 pés, mais um passageiro. −10 pés se carregar mais de 20 de Carga; cai se passar de 30.',
    },
    description:
      'Vassoura que flutua até guardada. Você monta guiando com uma mão (voo 20 pés, mais um passageiro). Sobrecarga reduz o deslocamento; acima de 30 de Carga ela cai. Ativação: voo acelerado rumo a um destino.',
  }),
  heldItem({
    id: 'held-3024',
    aonId: 3024,
    name: 'Trompa de exorcismo',
    originalName: 'Horn of Exorcism',
    level: 11,
    priceGp: 1250,
    page: 274,
    bulk: 'L',
    traits: ['Auditory'],
    wornMagic: {
      activate:
        'Abalar os mortos (1 ação, auditivo, manipular): 1 vez por hora. Intimidação para Desmoralizar contra mortos-vivos e criaturas profanas num raio de 30 pés, inclusive irracionais, sem penalidade de idioma. Sementes sagradas (2 ações, manipular): 1 vez ao dia. Você e aliados no raio de 30 pés ganham o traço fantasma nas armas e golpes desarmados por 1 minuto.',
      frequency: '1 vez por hora / 1 vez ao dia',
    },
    description:
      'Trompa de chifre, madeira ou marfim. Assusta espíritos e mortos-vivos, e pode espalhar sementes sagradas que tornam golpes eficazes contra incorpóreos.',
  }),
  heldItem({
    id: 'held-3025',
    aonId: 3025,
    name: 'Pião do capeta',
    originalName: 'Madcap Top',
    level: 10,
    priceGp: 459,
    page: 274,
    bulk: 'L',
    rarity: 'rare',
    wornMagic: {
      activate:
        'Girar o pião (2 ações, concentrar e manipular): escolha uma criatura a até 60 pés e role 1d20 na tabela do item. Magias do pião usam CD 27 e modificador de golpe de magia +17; alcance mínimo 60 pés. Se o efeito cair em você, você não recebe teste de resistência.',
    },
    description:
      'Pião de 20 faces em cores gritantes. Ao girar, gera um efeito mágico aleatório contra o alvo escolhido (tabela no GM Core). Raro e imprevisível.',
  }),
  ...maestroInstruments(),
  heldItem({
    id: 'held-3027',
    aonId: 3027,
    name: 'Remédios maravilhosos',
    originalName: 'Marvelous Medicines',
    level: 12,
    priceGp: 1800,
    page: 276,
    bulk: 1,
    wornMagic: {
      skillBonuses: [{ skillId: 'medicine', value: 2 }],
      note: 'Ao Tratar veneno ou doença, antes do teste os remédios tentam contrapor (posto 5, modificador +21). Efeito de cura. Não dá para tratar a mesma aflição no mesmo paciente de novo.',
    },
    description:
      'Kit de curandeiro com ataduras e ervas impecáveis. +2 de bônus de item em Medicina. Ao Tratar veneno ou doença, tenta contrapor (posto 5, +21) uma vez por aflição e paciente.',
  }),
  heldItem({
    id: 'held-3027-greater',
    aonId: 3027,
    name: 'Remédios maravilhosos maiores',
    originalName: 'Marvelous Medicines (Greater)',
    level: 18,
    priceGp: 19000,
    page: 276,
    bulk: 1,
    wornMagic: {
      skillBonuses: [{ skillId: 'medicine', value: 3 }],
      note: 'Contrapor posto 8, modificador +30.',
    },
    description:
      'Versão maior: +3 de bônus de item em Medicina. Ao Tratar veneno ou doença, contrapõe com posto 8 e modificador +30.',
  }),
  heldItem({
    id: 'held-3028',
    aonId: 3028,
    name: 'Palco de bolso',
    originalName: 'Pocket Stage',
    level: 5,
    priceGp: 138,
    page: 276,
    bulk: 'L',
    traits: ['Structure'],
    wornMagic: {
      activate:
        'Brincar com bonecos (1 minuto, concentrar e manipular): o teatro cresce num palco de 20 por 15 pés, com cenário ilusório e até 6 figurinos. Cenário some se sair a mais de 20 pés do palco.',
    },
    description:
      'Miniatura de teatro com bolso de cenário e bonecos de papel. Ao ativar, vira um palco mágico (estrutura) com decoração ilusória e figurinos físicos com ilusão.',
  }),
  heldItem({
    id: 'held-3029',
    aonId: 3029,
    name: 'Tomo das possibilidades',
    originalName: 'Possibility Tome',
    level: 18,
    priceGp: 22000,
    page: 276,
    bulk: 2,
    wornMagic: {
      activate:
        'Folhear (10 minutos, concentrar e manipular): escolha Arcanismo, Ofício, Medicina, Natureza, Ocultismo, Religião, Sociedade ou um Lore. As páginas enchem (só você vê). Antes de Recordar conhecimento nessa perícia, Interagir com o livro dá +3 de bônus de item naquele teste.',
    },
    description:
      'Tomo pesado de prata e cobre com pedras semipreciosas. Folhear por 10 minutos enche as páginas com o tema escolhido e concede +3 de bônus de item ao Recordar conhecimento naquela perícia enquanto as páginas estiverem cheias.',
  }),
  heldItem({
    id: 'held-3030',
    aonId: 3030,
    name: 'Chave-esqueleto',
    originalName: 'Skeleton Key',
    level: 5,
    priceGp: 125,
    page: 276,
    wornMagic: {
      skillBonuses: [{ skillId: 'thievery', value: 1 }],
      activate:
        'Afrouxar fechadura (ação livre, manipular): 1 vez ao dia. Conjura abrir fechadura na fechadura que você está tentando arrombar.',
      frequency: '1 vez ao dia',
      note: 'Substitui um kit de ladrão para Arrombar. Se quebrar por falha crítica, vira um kit comum até ser consertada.',
    },
    description:
      'Chave macabra com caveira. Serve de kit de ladrão para Arrombar, com +1 de bônus de item em Prestidigitação. 1 vez ao dia, conjura abrir fechadura. Se quebrar no crítico, perde os benefícios até conserto.',
  }),
  heldItem({
    id: 'held-3030-greater',
    aonId: 3030,
    name: 'Chave-esqueleto maior',
    originalName: 'Skeleton Key (Greater)',
    level: 11,
    priceGp: 1250,
    page: 276,
    wornMagic: {
      skillBonuses: [{ skillId: 'thievery', value: 2 }],
      activate:
        'Afrouxar fechadura (ação livre, manipular): 1 vez por hora. Conjura abrir fechadura.',
      frequency: '1 vez por hora',
    },
    description:
      'Versão maior: +2 de bônus de item em Prestidigitação para Arrombar, e a ativação de abrir fechadura é 1 vez por hora.',
  }),
  heldItem({
    id: 'held-3031',
    aonId: 3031,
    name: 'Ardósias de cartas distantes',
    originalName: 'Slates of Distant Letters',
    level: 13,
    priceGp: 2450,
    page: 276,
    bulk: 'L',
    wornMagic: {
      activate:
        'Enviar mensagem (2 ações, manipular): 1 vez por hora por ardósia. Escreva até 25 palavras; o texto aparece na par no mesmo plano. Apagar uma apaga as duas.',
      frequency: '1 vez por hora',
      note: 'O preço é do par. Se uma quebrar, a outra vira cacos sem magia.',
    },
    description:
      'Par de ardósias iguais. Escrever em uma copia o texto na outra, no mesmo plano. O preço é do par; se uma quebrar, a outra se desfaz.',
  }),
  ...spaciousPouches(),
  ...thuribles(),
  heldItem({
    id: 'held-3034',
    aonId: 3034,
    name: 'Qualquer-ferramenta do viajante',
    originalName: "Traveler's Any-Tool",
    level: 6,
    priceGp: 200,
    page: 277,
    bulk: 1,
    wornMagic: {
      activate:
        'Bater (2 ações, concentrar e manipular): imagine uma ferramenta simples (em geral da lista de equipamento do Player Core). A haste vira cabo e as pontas de aço viram pá, martelo etc. Interagir devolve a forma de bastão.',
    },
    description:
      'Bastão de cinza com pontas de aço. Ao ativar, vira a ferramenta simples que você imaginar — nada complexo demais.',
  }),
  heldItem({
    id: 'held-3116',
    aonId: 3116,
    name: 'Caldeirão andante',
    originalName: 'Walking Cauldron',
    level: 1,
    priceGp: 12,
    page: 297,
    bulk: 4,
    wornMagic: {
      activate:
        'Comandar (1 ação, auditivo e concentrar): siga-me ou fique parado. Ao seguir, tenta ficar a 30 pés; movimento impreciso demais para combate. Carrega até 2 de Carga de ingredientes; se sobrecarregado, para até 10 minutos depois de aliviar.',
      note: 'Deslocamento terrestre 25 pés. Serve de ferramenta para Ofício de poções, óleos e outros líquidos.',
    },
    description:
      'Caldeirão de ferro com pés de corvo. Anda a 25 pés quando comandado e serve para fabricar poções e óleos. Carrega até 2 de Carga de ingredientes.',
  }),
]

function crystalBalls(): ItemDefinition[] {
  const grades = [
    {
      key: 'quartz',
      name: 'quartzo claro',
      original: 'Clear Quartz',
      level: 14,
      priceGp: 3800,
      extra: 'Vidência CD 33.',
    },
    {
      key: 'selenite',
      name: 'selenita',
      original: 'Selenite',
      level: 15,
      priceGp: 7000,
      extra: 'Vidência CD 36 e efeitos de ver o invisível no alvo.',
    },
    {
      key: 'moonstone',
      name: 'pedra da lua',
      original: 'Moonstone',
      level: 16,
      priceGp: 7500,
      extra: 'Vidência CD 37 e leitura da mente no alvo (mesma CD).',
    },
    {
      key: 'peridot',
      name: 'peridoto',
      original: 'Peridot',
      level: 17,
      priceGp: 12500,
      extra: 'Vidência CD 39 e telepatia para falar com o alvo.',
    },
    {
      key: 'obsidian',
      name: 'obsidiana',
      original: 'Obsidian',
      level: 19,
      priceGp: 32000,
      extra: 'Vidência CD 41 e visão verdadeira no que você observa.',
    },
  ] as const
  return grades.map((grade) =>
    heldItem({
      id: `held-3019-${grade.key}`,
      aonId: 3019,
      name: `Bola de cristal (${grade.name})`,
      originalName: `Crystal Ball (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 273,
      bulk: 'L',
      rarity: 'uncommon',
      traits: ['Scrying'],
      wornMagic: {
        activate:
          'Clarividência (1 minuto, concentrar e manipular): 1 vez por hora. Vidência (10 minutos): 2 vezes ao dia. Imagens e sons da magia de vidência aparecem na esfera.',
        frequency: '1 vez por hora / 2 vezes ao dia',
        note: grade.extra,
      },
      description: `Esfera polida que mostra o que magias de vidência revelam. ${grade.extra} Ao conjurar vidência por outros meios enquanto segura a bola, pode retransmitir o que vê e ouve.`,
    }),
  )
}

function eternalEruptions(): ItemDefinition[] {
  const grades = [
    { key: '', name: '', original: '', level: 5, priceGp: 160 },
    { key: '-blackpeak', name: ' de Blackpeak', original: ' of Blackpeak', level: 7, priceGp: 360 },
    { key: '-pale-mountain', name: ' da Montanha Pálida', original: ' of Pale Mountain', level: 9, priceGp: 700 },
    { key: '-mhar-massif', name: ' de Mhar Massif', original: ' of Mhar Massif', level: 11, priceGp: 1400 },
    { key: '-droskar', name: ' da Cratera de Droskar', original: " of Droskar's Crag", level: 13, priceGp: 3000 },
    { key: '-ka', name: ' de Ka', original: ' of Ka', level: 15, priceGp: 6500 },
    { key: '-sakalayo', name: ' de Sakalayo', original: ' of Sakalayo', level: 17, priceGp: 15000 },
    { key: '-barrowsiege', name: ' de Barrowsiege', original: ' of Barrowsiege', level: 19, priceGp: 40000 },
  ] as const
  return grades.map((grade) =>
    heldItem({
      id: `held-3020${grade.key}`,
      aonId: 3020,
      name: `Erupção eterna${grade.name}`,
      originalName: `Eternal Eruption${grade.original}`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 273,
      bulk: 'L',
      traits: ['Fire'],
      wornMagic: {
        activate:
          'Bomba de lava (2 ações, concentrar e manipular): arremessa com o efeito da lava congelada do mesmo nível. Depois de 2d4 horas, a erupção se reforma num recipiente em você.',
      },
      description:
        'Parece lava congelada, mas um padrão de runas vermelhas se repete. Ao arremessar, tem o efeito da lava congelada do mesmo nível e se recompõe após 2d4 horas.',
    }),
  )
}

function maestroInstruments(): ItemDefinition[] {
  const grades = [
    { key: 'lesser', name: 'menor', original: 'Lesser', level: 3, priceGp: 60, bonus: 1, charm: 'encantar CD 17' },
    { key: 'moderate', name: 'moderado', original: 'Moderate', level: 10, priceGp: 900, bonus: 2, charm: 'encantar de 4º posto (CD 27)' },
    { key: 'greater', name: 'maior', original: 'Greater', level: 18, priceGp: 19000, bonus: 3, charm: 'encantar de 8º posto (CD 38)' },
  ] as const
  return grades.map((grade) =>
    heldItem({
      id: `held-3026-${grade.key}`,
      aonId: 3026,
      name: `Instrumento do maestro ${grade.name}`,
      originalName: `Maestro's Instrument (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 275,
      bulk: 1,
      wornMagic: {
        skillBonuses: [{ skillId: 'performance', value: grade.bonus }],
        activate: `Apresentação cativante (2 ações, manipular): 1 vez ao dia. O instrumento conjura ${grade.charm}.`,
        frequency: '1 vez ao dia',
      },
      description: `Pode ter a forma de qualquer instrumento de mão. +${grade.bonus} de bônus de item em Performance ao tocar. 1 vez ao dia, conjura ${grade.charm}.`,
    }),
  )
}

function spaciousPouches(): ItemDefinition[] {
  const grades = [
    { key: 'i', name: 'tipo I', original: 'Type I', level: 4, priceGp: 75, bulkCap: 25 },
    { key: 'ii', name: 'tipo II', original: 'Type II', level: 7, priceGp: 300, bulkCap: 50 },
    { key: 'iii', name: 'tipo III', original: 'Type III', level: 11, priceGp: 1200, bulkCap: 100 },
    { key: 'iv', name: 'tipo IV', original: 'Type IV', level: 13, priceGp: 2400, bulkCap: 150 },
  ] as const
  return grades.map((grade) =>
    heldItem({
      id: `held-3032-${grade.key}`,
      aonId: 3032,
      name: `Bolsa espaçosa (${grade.name})`,
      originalName: `Spacious Pouch (${grade.original})`,
      level: grade.level,
      priceGp: grade.priceGp,
      page: 276,
      bulk: 1,
      traits: ['Extradimensional'],
      wornMagic: {
        extraBulkCapacity: grade.bulkCap,
        note: `Espaço extradimensional de ${grade.bulkCap} de Carga. A Carga de dentro não muda a Carga da bolsa. Objeto precisa caber na boca. Se sobrecarregar ou quebrar, os itens se perdem para sempre. Criatura viva tem ar por 10 minutos (Escapar CD 13).`,
      },
      description: `Bolsa de pano com espaço mágico de ${grade.bulkCap} de Carga. Interagir para guardar ou tirar, como um saco. Se virar do avesso, os itens caem ilesos. Item dentro não dá benefício até ser retirado e não é detectado por magia que só vê o mesmo plano.`,
    }),
  )
}

function thuribles(): ItemDefinition[] {
  return [
    heldItem({
      id: 'held-3033-lesser',
      aonId: 3033,
      name: 'Turíbulo da revelação menor',
      originalName: 'Thurible of Revelation (Lesser)',
      level: 3,
      priceGp: 55,
      page: 277,
      bulk: 1,
      traits: ['Divine'],
      wornMagic: {
        activate:
          'Queimar incenso (2 ações, manipular): gasta incenso de pelo menos 5 po. Queima 1 hora. Enquanto segura o turíbulo, +1 de bônus de item em Religião, e falha crítica ao Decifrar escrita religiosa vira falha.',
      },
      description:
        'Incensário de latão numa corrente, em geral com texto empiriano. Ao queimar incenso (5 po), por 1 hora concede +1 em Religião enquanto você o segura.',
    }),
    heldItem({
      id: 'held-3033-moderate',
      aonId: 3033,
      name: 'Turíbulo da revelação moderado',
      originalName: 'Thurible of Revelation (Moderate)',
      level: 10,
      priceGp: 900,
      page: 277,
      bulk: 1,
      traits: ['Divine'],
      wornMagic: {
        activate:
          'Como o menor, com +2 em Religião. 1 vez ao dia, ao ativar, pode olhar pela fumaça (Interagir) para ganhar ver o invisível por 1 rodada.',
        frequency: '1 vez ao dia (revelação extra)',
      },
      description:
        'Versão moderada: +2 de bônus de item em Religião. 1 vez ao dia, olhar pela fumaça concede ver o invisível por 1 rodada.',
    }),
    heldItem({
      id: 'held-3033-greater',
      aonId: 3033,
      name: 'Turíbulo da revelação maior',
      originalName: 'Thurible of Revelation (Greater)',
      level: 18,
      priceGp: 19000,
      page: 277,
      bulk: 1,
      traits: ['Divine'],
      wornMagic: {
        activate:
          'Como o moderado, com +3 em Religião. Olhar pela fumaça também concede visão verdadeira.',
        frequency: '1 vez ao dia (revelação extra)',
      },
      description:
        'Versão maior: +3 de bônus de item em Religião. A revelação extra diária também concede visão verdadeira ao olhar pela fumaça.',
    }),
  ]
}
