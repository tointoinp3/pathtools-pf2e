import type { CharacterClass } from '@/types/class'
import {
  SOURCE_DARK_ARCHIVES_ID,
  SOURCE_DIVINE_MYSTERIES_ID,
  SOURCE_HOWL_OF_THE_WILD_ID,
  SOURCE_PLAYER_CORE_ID,
  SOURCE_WAR_OF_IMMORTALS_ID,
} from './sources'
import { CLASS_WITCH_ID } from './ids'
import { witchSpellcasting } from './witchSpellcasting'

export { CLASS_WITCH_ID }

const WITCH_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Bruxa Remaster — patrono no 1º; feitos de classe a partir do 2 */
export const witchClass: CharacterClass = {
  id: CLASS_WITCH_ID,
  name: 'Bruxa',
  originalName: 'Witch',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 178,
  hitPointsPerLevel: 6,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  classFeatLevels: WITCH_CLASS_FEAT_LEVELS,
  spellcasting: witchSpellcasting,
  subclass: {
    id: 'witch-patron',
    label: 'Patrono',
    description:
      'Entidade misteriosa que concede tradição mágica, perícia, lição inicial (truque hex + magia no familiar) e habilidade única do familiar. Fonte: Player Core, pág. 183 (+ livros Remaster).',
    required: true,
    options: [
      {
        id: 'patron-faiths-flamekeeper',
        name: 'Guardião da Chama da Fé',
        originalName: "Faith's Flamekeeper",
        tradition: 'divine',
        description:
          'Presença reconfortante quando sua vontade quase apagou — anjo/aeon secreto (ou algo mais sinistro).',
        rulesSummary:
          'Tradição divina · Religião. Truque hex: Inflamar o Coração. Familiar aprende Comando. Familiar do Espírito Restaurado: ao lançar/sustentar hex, aliado a 4,5 m do familiar ganha PV temporários = 2 + metade do nível (até seu próximo turno).',
        skillGrants: [
          { id: 'patron-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 184,
      },
      {
        id: 'patron-inscribed-one',
        name: 'O Inscrito',
        originalName: 'The Inscribed One',
        tradition: 'arcane',
        description:
          'Palavras e glifos dançam na pele do patrono — arquimago poderoso ou artefato abandonado em busca de sucessor.',
        rulesSummary:
          'Tradição arcana · Arcana. Hex: Distinguir Segredos. Familiar aprende Arma Rúnica. Familiar da Escrita Fluida: ao lançar/sustentar hex, o familiar flanqueia (alcance 1,5 m, efeito visual) até seu próximo turno.',
        skillGrants: [
          { id: 'patron-arcana', rank: 'trained', skillId: 'arcana' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 184,
      },
      {
        id: 'patron-resentment',
        name: 'O Ressentimento',
        originalName: 'The Resentment',
        tradition: 'occult',
        description:
          'Desejo de derrubar o poderoso — hag expulsada, quase-divindade ou demônio menor. Ferramentas: maldições, hexes e você.',
        rulesSummary:
          'Tradição oculta · Ocultismo. Truque hex: Olho Maligno. Familiar aprende Enfraquecer. Familiar da Miséria Contínua: ao lançar/sustentar hex, pode amaldiçoar criatura a 4,5 m e prolongar 1 condição negativa em 1 rodada (1× por caso; efeito de maldição).',
        skillGrants: [
          { id: 'patron-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 184,
      },
      {
        id: 'patron-silence-in-snow',
        name: 'Silêncio na Neve',
        originalName: 'Silence in Snow',
        tradition: 'primal',
        description:
          'Frio amargo: solstício de inverno ou pico congelado. Bruxa do inverno, yai de gelo ou espírito do frio.',
        rulesSummary:
          'Tradição primal · Natureza. Truque hex: Gelo Aderente. Familiar aprende Rajada de Vento. Familiar da Geada Congelante: ao lançar/sustentar hex, gelo em explosão de 1,5 m no familiar (terreno difícil até seu próximo turno).',
        skillGrants: [
          { id: 'patron-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 185,
      },
      {
        id: 'patron-spinner-of-threads',
        name: 'Tecelão de Fios',
        originalName: 'Spinner of Threads',
        tradition: 'occult',
        description:
          'Encontro em memória do futuro ou presságio do passado — norn, arauto de Pharasma/Alseta/Grandmother Spider, ou a mesma entidade em vários pontos do tempo.',
        rulesSummary:
          'Tradição oculta · Ocultismo. Truque hex: Cutucar o Destino. Familiar aprende Golpe Certeiro. Familiar da Sorte Equilibrada: ao lançar/sustentar hex, criatura a 4,5 m ganha +1 ou –1 de status na CA até seu próximo turno.',
        skillGrants: [
          { id: 'patron-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 185,
      },
      {
        id: 'patron-starless-shadow',
        name: 'Sombra Sem Estrelas',
        originalName: 'Starless Shadow',
        tradition: 'occult',
        description:
          'Hora das bruxas, corpo paralisado pelo sono — criatura do Mundo Inferior ou espírito do crepúsculo; olhos de luar.',
        rulesSummary:
          'Tradição oculta · Ocultismo. Truque hex: Manto da Noite. Familiar aprende Medo. Familiar da Noite à Espreita: ao lançar/sustentar hex, se o familiar estiver adjacente a inimigo ao qual está oculto/escondido/indetectável, o inimigo fica assustado 1.',
        skillGrants: [
          { id: 'patron-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 185,
      },
      {
        id: 'patron-wilding-steward',
        name: 'Guardião Selvagem',
        originalName: 'Wilding Steward',
        tradition: 'primal',
        description:
          'Graça e ferocidade da natureza — rainha dryad, besta primordial; a natureza é sua para defender.',
        rulesSummary:
          'Tradição primal · Natureza. Truque hex: Palavra Selvagem. Familiar aprende Invocar Animal ou Invocar Planta/Fungo (escolha). Familiar dos Sentidos Aguçados: ao lançar/sustentar hex, o familiar ganha faro, tremorcepção ou ondasense impreciso (18 m) e pode Apontar como ação livre.',
        skillGrants: [
          { id: 'patron-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 185,
      },
      {
        id: 'patron-devourer-of-decay',
        name: 'Devorador da Decomposição',
        originalName: 'Devourer of Decay',
        tradition: 'primal',
        description:
          'Aparece no fim da vida — decadência que alimenta vida nova (arbóreo, fungo, psicopompo).',
        rulesSummary:
          'Tradição primal · Natureza. Truque hex: Alegria do Catador. Familiar aprende Enfraquecer. Familiar do Poder Parasita: ao lançar/sustentar hex, criatura a 4,5 m com menos da metade dos PV faz Fortitude contra sua CD de magia ou fica enjoada 1.',
        skillGrants: [
          { id: 'patron-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
        sourcePage: 61,
      },
      {
        id: 'patron-ripple-in-the-deep',
        name: 'Ondulação no Abismo',
        originalName: 'Ripple in the Deep',
        tradition: 'primal',
        description:
          'Sombra imensa sob as ondas — kraken ou leviatã das profundezas.',
        rulesSummary:
          'Tradição primal · Natureza. Truque hex: Ferrão do Mar. Familiar aprende Cores Vertiginosas ou Graxa. Familiar das Marés Esmagadoras: ao lançar/sustentar hex, pode empurrar 1,5 m uma criatura a 3 m do familiar.',
        skillGrants: [
          { id: 'patron-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
        sourcePage: 61,
      },
      {
        id: 'patron-whisper-of-wings',
        name: 'Sussurro de Asas',
        originalName: 'Whisper of Wings',
        tradition: 'primal',
        description:
          'Asas e ventos — emplumadas, de libélula, mecânicas ou sulfurosas.',
        rulesSummary:
          'Tradição primal · Natureza. Truque hex: Murmuração. Familiar aprende Queda Gentil. Familiar do Voo Ágil: ao lançar/sustentar hex, o familiar pode Voar até 4,5 m (não provoca reações).',
        skillGrants: [
          { id: 'patron-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
        sourcePage: 62,
      },
      {
        id: 'patron-choir-politic',
        name: 'Coro Político',
        originalName: 'Choir Politic',
        tradition: 'divine',
        description:
          'Coro de vozes em uma — comunidade unida por causa comum.',
        rulesSummary:
          'Tradição divina · Sociedade. Truque hex: Compartilhar Visão. Familiar aprende Compartilhar Lore. Familiar do Auxílio Fortalecedor: ao lançar/sustentar hex, se o familiar estiver adjacente a aliado, esse aliado ganha +2 de status no próximo teste de perícia (não ataque) até seu próximo turno.',
        skillGrants: [
          { id: 'patron-society', rank: 'trained', skillId: 'society' },
        ],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 296,
      },
      {
        id: 'patron-paradox-of-opposites',
        name: 'Paradoxo dos Opostos',
        originalName: 'Paradox of Opposites',
        tradition: 'divine',
        description:
          'Vida e morte, luz e sombra — o patrono anda na linha entre dualidades.',
        rulesSummary:
          'Tradição divina · Religião. Truque hex: Trocar Morte por Vida. Familiar aprende Sono. Familiar da Dupla Perplexidade: ao lançar/sustentar hex, criatura a 6 m fica estupefata 1 até seu próximo turno (efeito visual).',
        skillGrants: [
          { id: 'patron-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 297,
      },
      {
        id: 'patron-baba-yaga',
        name: 'Baba Yaga (Raro)',
        originalName: 'Baba Yaga',
        tradition: 'occult',
        description:
          'A Rainha das Bruxas — tarefa quase impossível, respeito conquistado; familiar-objeto é possível.',
        rulesSummary:
          'Tradição oculta · Ocultismo. Truque hex: Objeto Espiritual. Familiar aprende Spray Gelado. Familiar da Nevasca Obscurecedora: ao lançar/sustentar hex, neve em explosão de 1,5 m no familiar; inimigos que entrem ficam ofuscados até seu próximo turno.',
        skillGrants: [
          { id: 'patron-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 298,
      },
      {
        id: 'patron-mosquito-witch',
        name: 'Bruxa Mosquito (Raro)',
        originalName: 'Mosquito Witch',
        tradition: 'primal',
        description:
          'Visões, enxames e mordidas — afinidade inquietante com insetos.',
        rulesSummary:
          'Tradição primal · Natureza. Truque hex: Picadas Zumbidas. Familiar aprende Forma de Praga. Familiar do Coração do Enxame: ao lançar/sustentar hex, insetos concedem ocultação a você ou a um aliado no mesmo espaço do familiar até seu próximo turno.',
        skillGrants: [
          { id: 'patron-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 299,
      },
      {
        id: 'patron-unseen-broker',
        name: 'O Corretor Invisível',
        originalName: 'The Unseen Broker',
        tradition: 'occult',
        description:
          'Você media barganhas entre o patrono e o mundo — deus, ser planar ou entidade alienígena.',
        rulesSummary:
          'Tradição oculta · Ocultismo. Truque hex: Corretor de Pactos. Familiar aprende Comando. Familiar da Negociação Tentadora: ao lançar/sustentar hex, 1 inimigo a 3 m do familiar fica desprevenido até seu próximo turno.',
        skillGrants: [
          { id: 'patron-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 159,
      },
      {
        id: 'patron-seneschal',
        name: 'Patrono Silencioso (Senescal)',
        originalName: 'Seneschal (Silent Patron)',
        description:
          'Arquétipo de classe: o patrono calou. Você ainda canaliza o poder pelo familiar. Pegue Dedicação de Senescal no 2º nível. Nomeie o patrono perdido e escolha a perícia da tradição.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º. No lugar da lição do patrono: truque hex Manifestar Vontade; o familiar aprende uma magia comum de 1º da sua lista — você escolhe. Tradição e perícia: Arcana, Natureza, Ocultismo, Religião ou Sociedade (conforme o patrono perdido) — você escolhe. O motor não escolhe patrono, tradição, perícia nem a magia do familiar.',
        skillChoiceOptions: ['arcana', 'nature', 'occultism', 'religion', 'society'],
        skillChoiceLabel: 'Perícia da tradição do patrono perdido',
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 62,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Hex',
      originalName: 'Hex',
      description:
        'Magia moldada pela atenção direta do patrono. Só 1 magia com o traço hex por turno — a segunda falha automaticamente (o familiar costuma sibilar). Hexes de foco gastam Ponto de Foco; truques hex não.',
    },
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações de moldagem alteram a próxima magia. Use imediatamente antes de Conjurar a Magia; qualquer outra ação no meio desperdiça o benefício.',
    },
    {
      name: 'Lição',
      originalName: 'Lesson',
      description:
        'Pacote do patrono: 1 hex + 1 magia que o familiar aprende (mesmo fora da lista da tradição). A lição inicial vem do patrono; outras vêm de feitos (Lição Básica / Maior / Suprema).',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Patrono = tradição + identidade',
      originalName: 'Patron',
      body: 'No 1º nível escolha o patrono: lista de magias (arcana/divina/oculta/primal), 1 perícia treinada, lição inicial (truque hex + magia no familiar) e habilidade única do familiar que dispara ao lançar ou sustentar hex (1× por rodada).',
    },
    {
      title: 'Familiar = grimório vivo',
      originalName: 'Familiar',
      body: 'Mais poderoso que o familiar comum: +2 habilidades (1 fixa do patrono + 1 escolhida diária), e +1 habilidade nos níveis 6, 12 e 18. Você prepara magias comungando com ele. Começa sabendo 10 truques + 5 magias de 1º + a da lição. A cada nível o patrono ensina 2 magias novas. Se morrer, o patrono substitui na próxima preparação (mesmo repertório).',
    },
    {
      title: 'Conjuração preparada (tradição do patrono)',
      originalName: 'Witch Spellcasting',
      body: 'Preparada como mago, mas o “livro” é o familiar. Ataque de magia e CD usam Inteligência. No 1º: 2 magias de 1º + 5 truques preparados. No 19º: Dom do Patrono dá 1 espaço especial de 10º.',
    },
    {
      title: 'Hex o tempo todo',
      originalName: 'Hexes',
      body: 'Escolha Marionete do Patrono ou Fasear Familiar (foco). O truque hex do patrono é à vontade. Lições e feitos adicionam mais hexes. Regra de ouro: 1 hex por turno. Reconcentração = 10 min comungando com o familiar.',
    },
    {
      title: 'Habilidade do familiar do patrono',
      body: 'Sempre selecionada. Efeito passivo 1× por rodada quando você lança ou sustenta hex — gelo, medo, flanqueamento, PV temporários, etc. Posicione o familiar: o alcance costuma ser curto.',
    },
    {
      title: 'Feitos e lições',
      body: 'Feitos de classe nos pares a partir do 2. Lição Básica/Maior/Suprema expandem o kit de hexes. Poucos PV (6+CON), sem armadura — o poder está em controle, hexes e no familiar.',
    },
  ],
  lore: {
    summary:
      'Você comanda magia poderosa não por estudo ou fé cega, mas como vaso de um patrono misterioso — divindade encoberta, fey poderoso, espírito antigo. Pelo familiar, recebe magias versáteis e hexes; nunca tem certeza se isso serve ao plano maior do patrono.',
    duringCombat:
      'As magias hex atrapalham inimigos e ajudam aliados; magias fortes controlam o campo, curam ou ferem. Familiar, poções e itens entram no jogo.',
    duringSocial:
      'Conhecimento amplo (inclusive mágico); às vezes charme ou engano com magia do patrono.',
    whileExploring:
      'Alerta a armadilhas e tesouros mágicos; magias e o familiar resolvem obstáculos.',
    inDowntime:
      'Prepara poções, fabrica itens, caça magias para o familiar, investiga o patrono — e busca outras bruxas.',
    youMight: [
      'Querer entender o patrono, o familiar e por que você foi escolhido.',
      'Buscar pergaminhos e grimórios além do que o patrono oferece.',
      'Ver o familiar como aliado, amigo ou estorvo necessário.',
    ],
    othersProbably: [
      'Desconfiam da origem da sua magia e temem traição ou um poder foul.',
      'Valorizam sua ajuda mágica — direta ou atrapalhando inimigos.',
      'Evitam ofendê-lo, com medo de um hex malicioso.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Patrono',
        'Familiar',
        'Conjuração de bruxa',
        'Magias Hex',
      ],
    },
    { level: 2, features: ['Feito de perícia', 'Feito de bruxa'] },
    {
      level: 3,
      features: ['Magias de 2º posto', 'Feito geral', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de perícia', 'Feito de bruxa'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Fortitude mágica',
        'Aumento de perícia',
      ],
    },
    {
      level: 6,
      features: ['Habilidade de familiar', 'Feito de perícia', 'Feito de bruxa'],
    },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Conjurador especialista',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de perícia', 'Feito de bruxa'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Reflexos especialista',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de bruxa'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Feito geral',
        'Percepção especialista',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    {
      level: 12,
      features: ['Habilidade de familiar', 'Feito de perícia', 'Feito de bruxa'],
    },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Robes defensivas',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de perícia', 'Feito de bruxa'] },
    {
      level: 15,
      features: [
        'Magias de 8º posto',
        'Aumentos de atributo',
        'Feito geral',
        'Conjurador mestre',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de perícia', 'Feito de bruxa'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Vontade do Pupilo',
      ],
    },
    {
      level: 18,
      features: ['Habilidade de familiar', 'Feito de perícia', 'Feito de bruxa'],
    },
    {
      level: 19,
      features: [
        'Feito geral',
        'Conjurador lendário',
        'Dom do Patrono',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de bruxa'],
    },
  ],
  features: [
    {
      id: 'witch-patron',
      name: 'Patrono',
      originalName: 'Patron',
      level: 1,
      description:
        'Escolha um patrono. Define tradição mágica, perícia, lição inicial e habilidade única do familiar.',
    },
    {
      id: 'witch-familiar',
      name: 'Familiar',
      originalName: 'Familiar',
      level: 1,
      description:
        'Familiar potenciado: +2 habilidades (1 do patrono sempre + 1 diária). Repositório das suas magias. Extra nos níveis 6, 12 e 18. Se morrer, o patrono substitui na próxima preparação.',
    },
    {
      id: 'witch-spellcasting',
      name: 'Conjuração de Bruxa',
      originalName: 'Witch Spellcasting',
      level: 1,
      description:
        'Conjurador preparado da tradição do patrono. Ataque de magia e CD usam Inteligência. Prepare magias que o familiar conhece.',
    },
    {
      id: 'witch-hexes',
      name: 'Magias Hex',
      originalName: 'Hex Spells',
      level: 1,
      description:
        'Escolha Marionete do Patrono ou Fasear Familiar. Ganha o truque hex do patrono. Só 1 hex por turno. Reserva de foco 1; Reconcentração comungando com o familiar.',
    },
    {
      id: 'witch-magical-fortitude',
      name: 'Fortitude Mágica',
      originalName: 'Magical Fortitude',
      level: 5,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'witch-familiar-ability-6',
      name: 'Habilidade de Familiar',
      originalName: 'Familiar Ability',
      level: 6,
      description: 'O familiar ganha +1 habilidade permanente.',
    },
    {
      id: 'witch-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description: 'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'witch-reflex-expertise',
      name: 'Reflexos Especialista',
      originalName: 'Reflex Expertise',
      level: 9,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'witch-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 11,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'witch-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 11,
      description:
        'Armas simples e ataques desarmados sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'witch-familiar-ability-12',
      name: 'Habilidade de Familiar',
      originalName: 'Familiar Ability',
      level: 12,
      description: 'O familiar ganha +1 habilidade permanente.',
    },
    {
      id: 'witch-defensive-robes',
      name: 'Robes Defensivas',
      originalName: 'Defensive Robes',
      level: 13,
      description: 'Defesa sem armadura sobe para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'witch-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'witch-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'witch-will-of-the-pupil',
      name: 'Vontade do Pupilo',
      originalName: 'Will of the Pupil',
      level: 17,
      description:
        'Vontade sobe para mestre. Sucesso em salvaguarda de Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'witch-familiar-ability-18',
      name: 'Habilidade de Familiar',
      originalName: 'Familiar Ability',
      level: 18,
      description: 'O familiar ganha +1 habilidade permanente.',
    },
    {
      id: 'witch-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
    {
      id: 'witch-patrons-gift',
      name: 'Dom do Patrono',
      originalName: "Patron's Gift",
      level: 19,
      description:
        'Ganha 1 espaço de 10º posto (regras especiais). O feito Verdade do Patrono pode dar um segundo.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=38',
}
