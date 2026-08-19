import type { CreatureFamily } from '@/types/creature'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: partial.source ?? 'Hellfire Dispatches', ...partial }
}

/**
 * Famílias AoN Monster Families de Prey for Death e Hellfire Dispatches.
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 */
export const catalogCreatureFamiliesStandaloneFive: CreatureFamily[] = [
  fam({
    id: 'family-servitors-of-gorum',
    name: 'Servidores de Gorum',
    originalName: 'Servitors of Gorum',
    trait: null,
    source: 'Prey for Death',
    sourcePage: 114,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=510',
    intro: `Todas as divindades mantêm agentes favorecidos para executar sua vontade entre os mortais. Arautos estão entre os mais conhecidos desses agentes — entidades únicas que servem como porta-voz e mensageiro da divindade e muitas vezes são enviados em resposta a um conjurador mortal que pede auxílio na forma de um ritual de _servo planar_. Mas o arauto de uma divindade não é o único agente autorizado a andar entre os fiéis ou a abater inimigos da fé. Os chamados servidores são únicos, poderosos e estão entre os aderentes mais devotos da divindade.

Servidores são bastante poderosos, mas não são verdadeiramente imortais. Qualquer servidor do divino pode ser morto em batalha ou por desventura. Em alguns casos, o corpo de um servidor morto desaparece e é substituído por um tesouro poderoso. Em outros, o próprio corpo simplesmente desaba no chão como um cadáver. Servidores podem ser restaurados à vida ao capricho de uma divindade, mas em muitos casos a divindade não concede essa ressurreição imediatamente e pode simplesmente buscar criar ou elevar um servidor inteiramente diferente. Se o impensável acontecer e a própria divindade perecer, seus servidores existentes não morrem, mas ficam imediatamente cientes de que o criador deixou de existir. Alguns mitos falam de servidores que então ascendiam em poder e substituíam o criador como semideus ou até como divindade, enquanto em outras histórias um servidor desesperado pode procurar um novo deus ou deusa a quem se devotar.

Embora os servidores sejam todos criaturas únicas, na maioria dos casos foram outrora adoradores mortais — humanoides ou não — que particularmente agradaram sua divindade. Os poderes e habilidades resultantes concedidos ao servidor variam enormemente, mas é quase inédito um servidor de qualquer divindade ser menos poderoso que o 15º nível, ou ao menos alguns níveis acima do que possuía na vida anterior. Embora não haja limites para o número de servidores que uma divindade possa manter, a maioria dos deuses tradicionalmente não guarda mais que três.

No caso de Gorum, seus três servidores mais conhecidos são compostos de um demônio, um dragão e um elemental, criaturas que encarnam o caos da batalha ou o espírito bruto da forja. Em cada caso, a visão de mundo e a filosofia desses servidores únicos coincidem de perto com as do Senhor de Ferro, deixando-os párias ou até excluídos entre os de sua espécie. Ainda assim, para Mãos Sangrentas, Presa-Santa e Marca-têmpera, não há maior conforto na vida do que o serviço ao deus da guerra.`,
    sections: [],
  }),
  fam({
    id: 'family-arch-of-aroden-troops',
    name: 'Tropas do Arco de Aroden',
    originalName: 'Arch of Aroden Troops',
    trait: null,
    source: 'Hellfire Dispatches',
    sourcePage: 58,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=684',
    intro: `Como passagem comercial importante para dentro e fora do Mar Interior, o estreito é ferozmente disputado neste período de conflito.`,
    sections: [
      {
        id: 'militaries-at-the-arch-of-aroden',
        title: 'Militares no Arco de Aroden',
        body: 'A maioria das tropas ativas na frente do Arco de Aroden está estacionada nas cidades de Khari e Corentyn, de cada lado do estreito de Hespereth. As forças rahadoumi que lutam para libertar Khari do controle chelaxiano incluem vários regimentos da Legião Pura, estrategicamente destacados para enfraquecer o inimigo ao privá-lo do auxílio divino de seus patronos infernais. Os destacamentos da Ordem da Corrente enviados da próxima Cidadela Gheradesca para auxiliar na defesa de Corentyn empregam com regularidade as unidades de captura de elite da ordem para neutralizar e prender oficiais-chave inimigos e outros alvos de alto valor. Enquanto isso, gangues de piratas dos Grilhões injetam caos no conflito em curso ao atacar depósitos de suprimentos chelaxianos ao longo da costa e depois recuar para o mar antes que o apoio militar chegue para expulsá-los.',
      },
      {
        id: 'troops-at-the-arch',
        title: 'Tropas no Arco',
        body: 'Além das tropas listadas aqui, outras que podem surgir como inimigas ou aliadas em escaramuças incluem:\nBando-de-bico, esquadrão da guarda da cidade, esquadra de conscritos, brigada de cavalaria dos Cavaleiros Infernais, bando mercenário.',
      },
    ],
  }),
  fam({
    id: 'family-aspodean-wall-troops',
    name: 'Tropas da Muralha Aspodeana',
    originalName: 'Aspodean Wall Troops',
    trait: null,
    source: 'Hellfire Dispatches',
    sourcePage: 70,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=685',
    intro: `Tropas na Muralha Aspodeana podem ser encontradas protegendo ou minando a estrutura divisória, conforme sua lealdade.`,
    sections: [
      {
        id: 'other-troops-at-the-wall',
        title: 'Outras Tropas na Muralha',
        body: 'Além das tropas listadas aqui, outras que podem surgir como inimigas ou aliadas em escaramuças incluem:\nEsquadra de conscritos, cavalaria pesada, brigada de cavalaria dos Cavaleiros Infernais, infantaria de linha, formação de falange.',
      },
      {
        id: 'war-torn-fields',
        title: 'Campos Devastados pela Guerra',
        body: 'Como a maior frente da guerra e o local de algumas de suas maiores batalhas, os campos rasgados por trincheiras diante da Muralha Aspodeana foram devastados por escaramuças entre tropas de todos os tipos. É aqui que a infantaria andorena enfrenta regularmente onda após onda de legiões vordine chelaxianas e turbas de orts, supervisionadas por oficiais mortais protegidos por séquitos de guarda de honra infernalizada, e esquadrões de sapeadores de Brastlewark de ambos os lados do conflito buscam derrubar a muralha ou defendê-la contra incursões inimigas, ao mesmo tempo em que lançam missões estratégicas contra as armas de cerco dos inimigos sempre que a oportunidade surge.',
      },
    ],
  }),
  fam({
    id: 'family-fangwood-troops',
    name: 'Tropas de Fangwood',
    originalName: 'Fangwood Troops',
    trait: null,
    source: 'Hellfire Dispatches',
    sourcePage: 82,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=686',
    intro: `Embora Nirmathas e Molthune se choquem há décadas, as presenças de Coração da Coragem, arauto de Milani, e de Szuriel, a Cavaleira da Guerra, levaram a ainda mais combates dentro de suas fronteiras.`,
    sections: [
      {
        id: 'troops-at-the-fangwood-front',
        title: 'Tropas na Frente de Fangwood',
        body: 'A maioria dos conflitos entre Nirmathas e Molthune ocorre relativamente perto da fronteira entre as duas nações, enquanto insurgentes nirmathi lutam para recuar o exército molthuni. Devido à falta de um exército tradicionalmente organizado em Nirmathas, suas tropas mais comuns são esquadrões de conscritos (NPC Core 89) cujos esforços são reforçados pelas táticas de atacar e recuar de bandos de sentinelas de Fangwood operando das profundezas da floresta, enquanto a presença militar oprakana, focada principalmente em enfraquecer o flanco sudoeste do exército molthuni, consiste de batalhões hobgoblins tradicionais e batalhões tempestade de fogo em medida aproximadamente igual. Embora em menor número e operando em geral longe da própria frente, as brigadas de cavalaria da devastação de Szuriel ainda assim pairam grandes na mente de qualquer nirmathi que testemunhe um de seus rampages ou a ruína deixada para trás.',
      },
      {
        id: 'troops-in-fangwood',
        title: 'Tropas em Fangwood',
        body: 'Além das tropas listadas aqui, outras que podem surgir como inimigas ou aliadas em escaramuças incluem:\nGangue de bandidos, esquadra de conscritos, turba iludida, batalhão anão, infantaria de linha, batedores da floresta.',
      },
    ],
  }),
  fam({
    id: 'family-troops-in-isger',
    name: 'Tropas em Isger',
    originalName: 'Troops in Isger',
    trait: null,
    source: 'Hellfire Dispatches',
    sourcePage: 106,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=687',
    intro: `Forças de dentro e de fora lutam pelo futuro desta pequena nação.`,
    sections: [
      {
        id: 'troops-in-isger',
        title: 'Tropas em Isger',
        body: 'Além das tropas listadas aqui, outras que podem surgir como inimigas ou aliadas em escaramuças incluem:\nGangue de bandidos, esquadra de conscritos, turba iludida, multidão fantasmal, gangue pega-pega goblin, brigada de cavalaria dos Cavaleiros Infernais, batalhão hobgoblin, tropa de cambaleantes.',
      },
    ],
  }),
  fam({
    id: 'family-troops-in-nidal',
    name: 'Tropas em Nidal',
    originalName: 'Troops in Nidal',
    trait: null,
    source: 'Hellfire Dispatches',
    sourcePage: 118,
    aonUrl: 'https://2e.aonprd.com/MonsterFamilies.aspx?ID=688',
    intro: `Embora Cheliax e Nidal sejam aliados há séculos, os dois estão sobrecarregados demais para auxiliar um ao outro em seus respectivos conflitos. O governo nidalese em particular começou a lutar contra ameaças internas que resistem à influência nacional de Zon-Kuthon e de seus sacerdotes.`,
    sections: [],
  }),
]
