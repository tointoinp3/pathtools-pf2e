import type { CharacterClass } from '@/types/class'
import {
  SOURCE_DIVINE_MYSTERIES_ID,
  SOURCE_PLAYER_CORE_2_ID,
} from './sources'
import { oracleSpellcasting } from './oracleSpellcasting'
import { CLASS_ORACLE_ID } from './ids'

export { CLASS_ORACLE_ID }

const ORACLE_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Oráculo — Player Core 2 (Remaster), AoN Classes ID 61 */
export const oracleClass: CharacterClass = {
  id: CLASS_ORACLE_ID,
  name: 'Oráculo',
  originalName: 'Oracle',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 128,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['charisma'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'oracle-religion', rank: 'trained', skillId: 'religion' }],
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'light', rank: 'trained', label: 'Armadura leve' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  classFeatLevels: ORACLE_CLASS_FEAT_LEVELS,
  spellcasting: oracleSpellcasting,
  subclass: {
    id: 'oracle-mystery',
    label: 'Mistério',
    description:
      'A fonte do seu poder divino — não um deus só, e sim um conceito. Define magias no repertório, magia de revelação (foco), perícia, feito vinculado do 1º e os efeitos da maldição. Mistérios Remaster: Player Core 2 + Divine Mysteries. Fonte: Player Core 2, pág. 134.',
    required: true,
    options: [
      {
        id: 'mystery-ancestors',
        name: 'Ancestrais',
        originalName: 'Ancestors',
        tradition: 'divine',
        description:
          'Vozes de gerações falam com você. Aprende com os sussurros — e os mortos mexem na sua vida mundana.',
        rulesSummary:
          'Perícia: Sociedade. Feito: Sussurros de Fraqueza. Revelação inicial: Toque Ancestral. Magias: Orientação, Mau Presságio, Portador Fantasma, Potencial Onírico. Domínios: Morte, Dever, Família, Alma. Maldição — Interferência Ancestral: desajeitado = valor de maldição vinculada (espíritos disputam o corpo).',
        skillGrants: [
          { id: 'mystery-society', rank: 'trained', skillId: 'society' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 135,
      },
      {
        id: 'mystery-battle',
        name: 'Batalha',
        originalName: 'Battle',
        tradition: 'divine',
        description:
          'Forças marciais enchem você de vigor e tática: glória, necessidade ou o inevitável da guerra.',
        rulesSummary:
          'Perícia: Atletismo. Feito: Advertência Oracular. Revelação: Transe da Arma. Magias: Escudo, Golpe Certeiro, Manobra Telecinética, Tempestade de Armas. Domínios: Destruição, Poder, Proteção, Zelo. Maldição — Guerreiro Mortal: fraqueza 2 a dano de magia (sobe no 3); −1 de status em saves vs magias (sobe no 4).',
        skillGrants: [
          { id: 'mystery-athletics', rank: 'trained', skillId: 'athletics' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 135,
      },
      {
        id: 'mystery-bones',
        name: 'Ossos',
        originalName: 'Bones',
        tradition: 'divine',
        description:
          'Morte e morte-viva em toda a complexidade macabra — um toque da cova, mesmo vivo.',
        rulesSummary:
          'Perícia: Medicina. Feito: Inclinar a Balança. Revelação: Sifão da Alma. Magias: Distorção do Vazio, Tentáculos Sombrios, Vitalidade Falsa, Arma Fantasma. Domínios: Morte, Decomposição, Morte-Viva, Vigília. Maldição — Morte Viva: fraqueza 2 a vitalidade e vazio (sobe); pode ser alvo dos dois; −1 Fortitude (sobe no 4).',
        skillGrants: [
          { id: 'mystery-medicine', rank: 'trained', skillId: 'medicine' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 135,
      },
      {
        id: 'mystery-cosmos',
        name: 'Cosmos',
        originalName: 'Cosmos',
        tradition: 'divine',
        description:
          'Astros grandes e pequenos puxam você: bênção estelar ou o vazio entre as estrelas.',
        rulesSummary:
          'Perícia: Natureza. Feito: Advertência Oracular. Revelação: Spray de Estrelas. Magias: Luz, Cores Vertiginosas, Escuridão, Frenesi Lunar. Domínios: Escuridão, Lua, Estrela, Nada. Maldição — Chamado do Céu: enfraquecido = valor vinculado; penalidade de status em saves/CDs contra movimento forçado igual ao valor.',
        skillGrants: [
          { id: 'mystery-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 136,
      },
      {
        id: 'mystery-flames',
        name: 'Chamas',
        originalName: 'Flames',
        tradition: 'divine',
        description:
          'O fogo no centro do mundo, do sol e da civilização — você dança com ele.',
        rulesSummary:
          'Perícia: Acrobacia. Feito: Predizer Dano. Revelação: Aura Incendiária. Magias: Ignição, Respirar Fogo, Dardo Flamejante, Bola de Fogo. Domínios: Poeira, Fogo, Estrela, Sol. Maldição — Chamas Devoradoras: fogo persistente = valor vinculado; imunidade/resistência a fogo suprimidas. Apaga ao começar Refocus ou cair inconsciente.',
        skillGrants: [
          { id: 'mystery-acrobatics', rank: 'trained', skillId: 'acrobatics' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 136,
      },
      {
        id: 'mystery-life',
        name: 'Vida',
        originalName: 'Life',
        tradition: 'divine',
        description:
          'O fluxo da força vital é palpável. Você pode santificá-lo — ou miná-lo.',
        rulesSummary:
          'Perícia: Medicina. Feito: Inclinar a Balança. Revelação: Elo de Vida. Magias: Açoite de Vitalidade, Acalmar, Vitalidade Falsa, Crescimentos Macabros. Domínios: Morte, Cura, Dor, Alma. Maldição — Vida Transbordante: efeitos mágicos que restauram seus PV sofrem penalidade de status = nível × valor vinculado (mín. 1).',
        skillGrants: [
          { id: 'mystery-medicine', rank: 'trained', skillId: 'medicine' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 137,
      },
      {
        id: 'mystery-lore',
        name: 'Saber',
        originalName: 'Lore',
        tradition: 'divine',
        description:
          'Conhecimento chega sozinho. Poder, ou a chave dos mistérios do multiverso.',
        rulesSummary:
          'Perícias: Ocultismo + 1 Conhecimento (Lore) à escolha. Feito: Sussurros de Fraqueza. Revelação: Dreno Cerebral. Magias: Ler Aura, Elo Mental, Hipercognição, Esqueça. Domínios: Conhecimento, Magia, Segredo, Verdade. Maldição — Saber Torrencial: penalidade de status em Percepção e Vontade = valor vinculado. No 4: não fala/comunica; ainda lança magias, mas fica estupefato 1.',
        skillGrants: [
          { id: 'mystery-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 137,
      },
      {
        id: 'mystery-tempest',
        name: 'Tempestade',
        originalName: 'Tempest',
        tradition: 'divine',
        description:
          'Vento e onda no peito: tempestades naturais, Planos do Ar e da Água, ou deuses da tormenta.',
        rulesSummary:
          'Perícia: Natureza. Feito: Predizer Dano. Revelação: Toque da Tempestade. Magias: Arco Elétrico, Trovão, Torrente Hidráulica, Relâmpago em Cadeia. Domínios: Ar, Frio, Relâmpago, Água. Maldição — Ventos Contrários: fraqueza 2 a eletricidade (sobe); tratado como se vestisse metal vs magias elétricas; −2 em ataques à distância no 2; −3 m de deslocamento no 4.',
        skillGrants: [
          { id: 'mystery-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 137,
      },
      {
        id: 'mystery-ash',
        name: 'Cinzas',
        originalName: 'Ash',
        tradition: 'divine',
        description:
          'Tudo é passageiro até virar cinza. O fogo é ferramenta; a pureza final é o que resta.',
        rulesSummary:
          'Perícia: Ocultismo. Feito: Sussurros de Fraqueza. Revelação: Vento de Cinzas. Magias: Ignição, Respirar Fogo, Névoa, Desintegrar. Domínios: Destruição, Poeira, Fogo, Nada. Maldição — Cinzas Rastejantes: fraqueza 2 a fogo (sobe a 5+nível no 3); imunidade/resistência a fogo suprimidas; −2 em ataques à distância no 2; −3 m de deslocamento no 4.',
        skillGrants: [
          { id: 'mystery-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 284,
      },
      {
        id: 'mystery-blight',
        name: 'Praga',
        originalName: 'Blight',
        tradition: 'divine',
        description:
          'Decadência é ciclo: o velho cede ao novo. Doença, veneno e podridão são ferramentas.',
        rulesSummary:
          'Perícia: Natureza. Feito: Sussurros de Fraqueza. Revelação: Cancro Ulceroso. Magias: Explosão Cáustica, Vapores Nóxios, Infestação Fúngica, Nuvem Tóxica. Domínios: Morte, Decomposição, Desorientação, Praga. Maldição — Podridão Inevitável: fraqueza 2 a ácido e veneno (sobe); −1 em saves vs doença/veneno e em quem o Trata (sobe no 4).',
        skillGrants: [
          { id: 'mystery-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 285,
      },
      {
        id: 'mystery-time',
        name: 'Tempo',
        originalName: 'Time',
        tradition: 'divine',
        description:
          'Milissegundos acumulados te tiram do próprio tempo — bênção de imortalidade, ou vida escorrendo.',
        rulesSummary:
          'Perícia: Ocultismo. Feito: Advertência Oracular. Revelação: Distorção Temporal. Magias: Sentido do Tempo, Déjà Vu, Bolso Temporal, Farol Temporal. Domínios: Mudança, Destino, Nada, Tempo. Maldição — Momentos Turbulentos: penalidade de status à CA vs ataques de reação/ação livre e a saves vs fatigado/lentificado = valor vinculado.',
        skillGrants: [
          { id: 'mystery-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 286,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Maldição vinculada',
      originalName: 'Cursebound',
      description:
        'Habilidades com este traço apertam a maldição oracular em troca de poder. Ao usar: fica vinculado 1, ou o valor sobe 1. Não usa se não tiver maldição ou se já estiver no máximo (2 no início; 3 no 11º; 4 no 17º). Não dá para mitigar os prejuízos com magia. Efeitos de habilidades vinculadas acabam ao Refocar e remover a condição. Defesas usam ataque/CD de magia, salvo indicação.',
    },
    {
      name: 'Condição maldição vinculada',
      originalName: 'Cursebound condition',
      description:
        'Só afeta quem tem maldição oracular e sempre tem um valor. Cada mistério lista os efeitos cumulativos. Só sai com Refocus (reduz 1 e recupera 1 PF). Magias como Purificar Aflição não tocam nisso.',
    },
    {
      name: 'Fortuna / Infortúnio',
      originalName: 'Fortune / Misfortune',
      description:
        'Alteram dados. No máximo 1 fortuna e 1 infortúnio no mesmo teste. Duas fortunas: escolha uma. Dois infortúnios: o mestre aplica o pior. Fortuna + infortúnio se cancelam.',
    },
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações que alteram a próxima magia. Use imediatamente antes de Conjurar; qualquer outra ação no meio desperdiça o benefício. Efeitos extras fazem parte da magia.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Mistério, não um deus',
      originalName: 'Mystery',
      body: 'Você não reza para um único deus: canaliza um conceito (batalha, chamas, tempo…). Isso coloca magias no repertório, dá uma magia de revelação (foco) e o feito vinculado do 1º. A tradição é sempre divina; Carisma manda no ataque e na CD.',
    },
    {
      title: 'Espontâneo + repertório',
      originalName: 'Spell Repertoire',
      body: 'No 1º: 3 magias de 1º + 5 truques à escolha, mais as do mistério. 3 espaços de 1º. Cada espaço novo adiciona magia daquele posto. Ao subir de nível pode trocar 1 magia (incluindo truque). A aba Magias trata isso como repertório espontâneo.',
    },
    {
      title: 'Poder tem preço: maldição vinculada',
      originalName: 'Cursebound',
      body: 'Feitos vinculados (o do mistério e outros) são mais fortes que o nível — e cada uso sobe a maldição. Máximo 2 no começo, 3 no 11º, 4 no 17º. Os efeitos são só negativos e cumulativos. Refocus (10 min, presságios do seu mistério) reduz 1 e devolve 1 PF. Anote o valor nas notas da ficha.',
    },
    {
      title: 'Revelações são foco',
      originalName: 'Revelation Spells',
      body: 'A magia inicial do mistério é foco (1 PF). Altura = metade do nível. Reserva máxima = nº de magias de foco (até 3). Feitos (Revelação Avançada/Maior, Domínio) acrescentam mais. Use a aba Foco.',
    },
    {
      title: 'Magias emblemáticas (3º)',
      originalName: 'Signature Spells',
      body: '1 emblemática por posto. Eleva livremente sem aprender versões altas. Trocar exige retreino (ou a troca normal de repertório).',
    },
    {
      title: 'Acesso Divino (11º)',
      originalName: 'Divine Access',
      body: 'Escolha 1 divindade do catálogo (aba Divindade) que conceda um domínio do seu mistério. Até 3 magias de clérigo dela entram na lista e no repertório quando você puder lançá-las. O motor não escolhe a divindade nem as magias por você.',
    },
    {
      title: 'Papel no grupo',
      body: 'Conjurador de Carisma, 8 PV, armadura leve. Cura, controle ou dano conforme o mistério. Feitos de classe a partir do 2º. Itens mágicos são o “plano B” mais seguro que a maldição.',
    },
  ],
  lore: {
    summary:
      'Seu canal divino ignora oração e servidão: você colhe verdades sagradas em conceitos vastos — o chão comum entre deuses, ou um atalho perigoso até o poder cru. Explora um mistério e lança milagres, mas o preço é uma maldição que aperta quanto mais você puxa.',
    duringCombat:
      'Equilibra milagres com a maldição que sobe. Magias ajudam aliados e devastam inimigos; alguns mistérios te empurram para o corpo a corpo.',
    duringSocial:
      'Insights do mistério. Pode usar a maldição para intimidar — ou escondê-la para se misturar.',
    whileExploring:
      'Recentra-se para afrouxar o conflito metafísico da maldição. Sente forças sobrenaturais; às vezes espreita o futuro.',
    inDowntime:
      'Estuda o mistério e as nascentes divinas. Conviver com quem se interessa pelo tema alivia a maldição. Pode ligar-se a uma religião — ou fundar a sua.',
    youMight: [
      'Ver o poder oracular como bênção, maldição, ou os dois.',
      'Ir ao limite do que o corpo aguenta para um grande ato de magia.',
      'Depender de itens mágicos como poço mais seguro e previsível.',
    ],
    othersProbably: [
      'Não percebem que a magia é divina e acham que você manda poderes estranhos — talvez malignos.',
      'Assumem que você cometeu uma transgressão terrível para os deuses te amaldiçoarem.',
      'Admiram sua determinação e o que você sacrifica para fazer milagres.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Conjuração de oráculo',
        'Repertório de magias',
        'Mistério',
      ],
    },
    { level: 2, features: ['Feito de oráculo', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º posto',
        'Feito geral',
        'Magias emblemáticas',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de oráculo', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de oráculo', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Conjurador especialista',
        'Feito geral',
        'Resolução misteriosa',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de oráculo', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Fortitude mágica',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de oráculo', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Acesso divino',
        'Feito geral',
        'Maldição maior',
        'Sentidos oraculares',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    { level: 12, features: ['Feito de oráculo', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Expertise em armadura leve',
        'Reflexos da premonição',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de oráculo', 'Feito de perícia'] },
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
    { level: 16, features: ['Feito de oráculo', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Maldição extrema',
        'Resolução misteriosa maior',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de oráculo', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Conjurador lendário',
        'Clareza oracular',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de oráculo', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'oracle-spellcasting',
      name: 'Conjuração de Oráculo',
      originalName: 'Oracle Spellcasting',
      level: 1,
      description:
        'Conjurador espontâneo da tradição divina. Ataque de magia e CD usam Carisma. Lança magias do repertório com espaços; truques à vontade.',
    },
    {
      id: 'oracle-spell-repertoire',
      name: 'Repertório de Magias',
      originalName: 'Spell Repertoire',
      level: 1,
      description:
        'No 1º: 3 magias de 1º + 5 truques à escolha (lista divina), mais as do mistério. A cada espaço novo, adiciona magia do mesmo posto. Ao subir de nível pode trocar 1 magia (pode ser truque).',
    },
    {
      id: 'oracle-mystery',
      name: 'Mistério',
      originalName: 'Mystery',
      level: 1,
      description:
        'Escolha um mistério. Concede magias no repertório, magia de revelação, perícia, feito vinculado de 1º e os efeitos da maldição oracular.',
    },
    {
      id: 'oracle-signature-spells',
      name: 'Magias Emblemáticas',
      originalName: 'Signature Spells',
      level: 3,
      description:
        'Para cada posto que você tem, escolha 1 magia emblemática. Pode elevá-la livremente sem aprender versões altas.',
    },
    {
      id: 'oracle-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description: 'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'oracle-mysterious-resolve',
      name: 'Resolução Misteriosa',
      originalName: 'Mysterious Resolve',
      level: 7,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'oracle-magical-fortitude',
      name: 'Fortitude Mágica',
      originalName: 'Magical Fortitude',
      level: 9,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'oracle-divine-access',
      name: 'Acesso Divino',
      originalName: 'Divine Access',
      level: 11,
      description:
        'Escolha 1 divindade que conceda um domínio do seu mistério. Até 3 magias de clérigo dela entram na sua lista e no repertório quando você puder lançá-las daquele posto.',
    },
    {
      id: 'oracle-major-curse',
      name: 'Maldição Maior',
      originalName: 'Major Curse',
      level: 11,
      description:
        'O valor máximo de maldição vinculada sobe de 2 para 3.',
    },
    {
      id: 'oracle-oracular-senses',
      name: 'Sentidos Oraculares',
      originalName: 'Oracular Senses',
      level: 11,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'oracle-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 11,
      description: 'Armas simples e ataques desarmados sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'oracle-light-armor-expertise',
      name: 'Expertise em Armadura Leve',
      originalName: 'Light Armor Expertise',
      level: 13,
      description:
        'Armadura leve e defesa sem armadura sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'oracle-premonitions-reflexes',
      name: 'Reflexos da Premonição',
      originalName: "Premonition's Reflexes",
      level: 13,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'oracle-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'oracle-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'oracle-extreme-curse',
      name: 'Maldição Extrema',
      originalName: 'Extreme Curse',
      level: 17,
      description:
        'O valor máximo de maldição vinculada sobe de 3 para 4.',
    },
    {
      id: 'oracle-greater-mysterious-resolve',
      name: 'Resolução Misteriosa Maior',
      originalName: 'Greater Mysterious Resolve',
      level: 17,
      description:
        'Vontade sobe para lendário. Sucesso vira crítico; falha crítica vira falha; falha contra efeito com dano causa metade.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'legendary' }],
    },
    {
      id: 'oracle-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
    {
      id: 'oracle-oracular-clarity',
      name: 'Clareza Oracular',
      originalName: 'Oracular Clarity',
      level: 19,
      description:
        'Adicione 2 magias comuns de 10º posto da lista divina ao repertório e ganhe 1 espaço de 10º (regras especiais: não ganha mais espaços de 10º ao subir, nem usa com habilidades que dão espaços extras). O feito Providência Oracular pode dar um segundo espaço.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=61',
}
