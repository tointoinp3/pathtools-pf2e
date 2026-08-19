import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  SOURCE_PLAYER_CORE_2_ID,
  SOURCE_TIAN_XIA_CG_ID,
} from './sources'

export const ANCESTRY_KOBOLD_ID = 'ancestry-kobold'

export const HERITAGE_CAVERNSTALKER_KOBOLD_ID = 'heritage-cavernstalker-kobold'
export const HERITAGE_DRAGONSCALED_KOBOLD_ID = 'heritage-dragonscaled-kobold'
export const HERITAGE_ELEMENTHEART_KOBOLD_ID = 'heritage-elementheart-kobold'
export const HERITAGE_HEAVENSCRIBE_KOBOLD_ID = 'heritage-heavenscribe-kobold'
export const HERITAGE_MIGHTYFALL_KOBOLD_ID = 'heritage-mightyfall-kobold'
export const HERITAGE_SPELLHORN_KOBOLD_ID = 'heritage-spellhorn-kobold'
export const HERITAGE_STRONGJAW_KOBOLD_ID = 'heritage-strongjaw-kobold'
export const HERITAGE_TUNNELFLOOD_KOBOLD_ID = 'heritage-tunnelflood-kobold'
export const HERITAGE_VENOMTAIL_KOBOLD_ID = 'heritage-venomtail-kobold'

/** Kobold — Player Core 2 (Remaster), Archives of Nethys ID 80 */
export const koboldAncestry: Ancestry = {
  id: ANCESTRY_KOBOLD_ID,
  name: 'Kobold',
  originalName: 'Kobold',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 20,
  hitPoints: 6,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'kobold-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'kobold-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'kobold-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['constitution'],
  languages: {
    automatic: ['Comum', 'Sakvroth'],
    additionalOptions: [
      'Aklo',
      'Diabólico',
      'Dracônico',
      'Anão',
      'Empíreo',
      'Feérico',
      'Gnomo',
      'Petran',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'kobold-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [],
  traits: ['Kobold', 'Humanoide'],
  lore: {
    summary:
      'Kobolds são humanoides reptilianos pequenos cujas características refletem o poder que escolhem seguir. Cada kobold entende instintivamente a importância do poder, e muitos veneram quem o possui — dragões antigos, demônios cruéis, feéricos imperiosos ou até artefatos ancestrais. Buscam essas alianças por pragmatismo e porque ovos incubados perto de tais focos de poder adquirem traços físicos (e às vezes habilidades) semelhantes aos do benfeitor da toca.',
    youMight: [
      'Servir a um dragão ou outro benfeitor poderoso, ou projetar armadilhas e defesas engenhosas para sua toca.',
      'Analisar o terreno em busca de emboscadas, rotas de fuga e vantagens táticas a cada momento.',
    ],
    othersProbably: [
      'Subestimam você por ser pequeno ou temem sua astúcia e disposição para emboscadas.',
      'Apreciam sua engenhosidade e capacidade de improvisar defesas — quando não estão invadindo seu território.',
    ],
    physicalDescription:
      'Kobolds são baixos (cerca de 90 cm), humanoides reptilianos de corpo esguio, cauda longa e chifres robustos. Suas feições muitas vezes refletem a natureza do benfeitor da toca — asas dracônicas vestigiais, cristais brilhantes ou outras marcas distintivas. A pele é coberta de escamas pequenas. Amadurecem rápido, alcançando a idade adulta por volta dos 12 anos e vivendo cerca de 60 anos; alguns raros vivem mais ao aproveitar o poder de um benfeitor mágico.',
    society:
      'Kobolds têm uma cautela inata que os mantém vivos. São secretivos ou subservientes perto de criaturas poderosas para evitar virar vítimas — mas essa subserviência some quando garantem um benfeitor formidável ou uma fonte sobrenatural de poder. Suas sociedades adotam leis e normas inspiradas na personalidade desse benfeitor. São infames por perceber um “navio afundando”: quando a fonte de poder falha ou parece condenada, o moral da toca desmorona rapidamente. Tocas (tocas) são redes de túneis e câmaras onde vivem em grupos organizados.',
    beliefs:
      'Quase todos os kobolds respeitam hierarquias e regras, confiando nas estratégias sociais ancestrais para sobreviver. A religião organizada é natural para a maioria; costumam ser atraídos por divindades ligadas ao benfeitor — Asmodeus se o patrono for um diabo, ou divindades dracônicas como Apsu e Dahak se for um dragão. Também se inclinam a cultos com criaturas mágicas poderosas como figuras centrais.',
    popularEdicts: [
      'Encontrar seu lugar em qualquer estrutura de poder',
      'Orgulhar-se da força dos aliados',
      'Vencer com astúcia',
    ],
    popularAnathema: [
      'Enfrentar uma ameaça sozinho',
      'Jogar a cautela ao vento',
    ],
    sampleNames: [
      'Alka',
      'Azrnak',
      'Draahzin',
      'Enga',
      'Fazgyn',
      'Fazij',
      'Jekkajak',
      'Kib',
      'Kirrok',
      'Mirkol',
      'Tarka',
      'Urkak',
      'Varshez',
      'Vroklan',
      'Zekstikah',
      'Zgaz',
    ],
  },
  heritageIds: [
    HERITAGE_CAVERNSTALKER_KOBOLD_ID,
    HERITAGE_DRAGONSCALED_KOBOLD_ID,
    HERITAGE_ELEMENTHEART_KOBOLD_ID,
    HERITAGE_HEAVENSCRIBE_KOBOLD_ID,
    HERITAGE_MIGHTYFALL_KOBOLD_ID,
    HERITAGE_SPELLHORN_KOBOLD_ID,
    HERITAGE_STRONGJAW_KOBOLD_ID,
    HERITAGE_TUNNELFLOOD_KOBOLD_ID,
    HERITAGE_VENOMTAIL_KOBOLD_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=80',
}

export const koboldHeritages: Heritage[] = [
  {
    id: HERITAGE_CAVERNSTALKER_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Rastreador de Cavernas',
    originalName: 'Cavernstalker Kobold',
    description:
      'Você nasceu numa toca de túneis estreitos também habitada por um ser de energia primal da terra, o que o tornou ágil e flexível. Ao Escalar paredes de rocha, estalactites e outras formações naturais de pedra, move-se com metade do Deslocamento em um sucesso e com o Deslocamento total em um sucesso crítico (e com o Deslocamento total em um sucesso se tiver Escalar Rápido). Isso não se aplica se estiver usando um deslocamento de escalada. Se obtiver sucesso em um teste de Acrobacia para Apertar-se, o resultado vira sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 21,
    rulesSummary:
      'Escalar pedra: ½ desloc. (sucesso) ou desloc. total (crítico); sucesso→crítico em Apertar-se.',
  },
  {
    id: HERITAGE_DRAGONSCALED_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Escamas de Dragão',
    originalName: 'Dragonscaled Kobold',
    description:
      'Graças à associação da sua toca com um dragão, suas escamas são mais resistentes que as de outros kobolds. Você recebe 10 PV da ancestralidade em vez de 6. Também recebe +1 de bônus de circunstância a salvaguardas contra sopro de dragão, efeitos com o traço sono e efeitos que o deixariam paralisado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 21,
    rulesSummary:
      '10 PV (em vez de 6); +1 salvaguardas vs sopro de dragão, sono e paralisia.',
    hitPointsOverride: 10,
    specialAbilities: [
      {
        id: 'dragonscaled-ancestry-hp',
        name: 'Vitalidade Escamada',
        originalName: 'Dragonscaled Hit Points',
        actionType: 'passive',
        description:
          'Você recebe 10 PV da ancestralidade em vez de 6. Também recebe +1 de bônus de circunstância a salvaguardas contra sopro de dragão, efeitos com o traço sono e efeitos que o deixariam paralisado.',
      },
    ],
  },
  {
    id: HERITAGE_ELEMENTHEART_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Coração Elemental',
    originalName: 'Elementheart Kobold',
    description:
      'Ao nascer, você se imprimiu fortemente numa criatura ligada a um dos Planos Elementais — como um elemental ou gênio. Escolha ar, terra, fogo, metal, água ou madeira como benfeitor elemental. Você recebe resistência igual à metade do seu nível (mínimo 1) ao tipo de dano associado: frio (ar), eletricidade (terra), fogo (fogo), sônico (metal), ácido (água) ou veneno (madeira).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 21,
    rulesSummary:
      'Escolha elemento: resistência = metade do nível (mín. 1) a frio/eletricidade/fogo/sônico/ácido/veneno.',
    choices: [
      {
        id: 'elementheart-element',
        label: 'Benfeitor elemental',
        options: [
          {
            id: 'air',
            label: 'Ar (resistência a frio)',
            originalLabel: 'Air (cold)',
          },
          {
            id: 'earth',
            label: 'Terra (resistência a eletricidade)',
            originalLabel: 'Earth (electricity)',
          },
          {
            id: 'fire',
            label: 'Fogo (resistência a fogo)',
            originalLabel: 'Fire (fire)',
          },
          {
            id: 'metal',
            label: 'Metal (resistência a sônico)',
            originalLabel: 'Metal (sonic)',
          },
          {
            id: 'water',
            label: 'Água (resistência a ácido)',
            originalLabel: 'Water (acid)',
          },
          {
            id: 'wood',
            label: 'Madeira (resistência a veneno)',
            originalLabel: 'Wood (poison)',
          },
        ],
      },
    ],
  },
  {
    id: HERITAGE_HEAVENSCRIBE_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Escrivão Celestial',
    originalName: 'Heavenscribe Kobold',
    description:
      'Sua conexão com dragões imperiais sábios e celestiais fez outros buscarem seu conselho. Você pode falar Dracônico. Sempre que obtiver falha crítica em um teste de Diplomacia para Causar Boa Impressão ou Fazer Pedidos, o resultado vira falha.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 40,
    rulesSummary:
      'Fala Dracônico; falha crítica→falha em Causar Boa Impressão / Fazer Pedidos.',
    specialAbilities: [
      {
        id: 'heavenscribe-draconic',
        name: 'Conselho Celestial',
        originalName: 'Heavenscribe Counsel',
        actionType: 'passive',
        description:
          'Você pode falar o idioma Dracônico. Sempre que obtiver falha crítica em um teste de Diplomacia para Causar Boa Impressão ou Fazer Pedidos, o resultado vira falha.',
      },
    ],
  },
  {
    id: HERITAGE_MIGHTYFALL_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Queda Poderosa',
    originalName: 'Mightyfall Kobold',
    description:
      'A proximidade de um kaiju poderoso fez você crescer forte e resistente. Você recebe 10 PV da ancestralidade em vez de 6. Opcionalmente, em vez dos boosts e falhas normais da ancestralidade kobold, você pode escolher receber boost de Força, boost de Carisma e falha em Inteligência.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 40,
    rulesSummary:
      '10 PV (em vez de 6); opcional: boost For/Car e falha Int (em vez dos boosts kobold padrão).',
    hitPointsOverride: 10,
    specialAbilities: [
      {
        id: 'mightyfall-ancestry-hp',
        name: 'Vitalidade do Kaiju',
        originalName: 'Mightyfall Hit Points',
        actionType: 'passive',
        description:
          'Você recebe 10 PV da ancestralidade em vez de 6. Opcionalmente, em vez dos boosts e falhas normais da ancestralidade kobold, você pode escolher boost de Força, boost de Carisma e falha em Inteligência.',
      },
    ],
  },
  {
    id: HERITAGE_SPELLHORN_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Chifre Mágico',
    originalName: 'Spellhorn Kobold',
    description:
      'Desde que chocou perto de uma fonte poderosa de magia, um traço dela corre pelas suas veias. Escolha um truque comum da lista arcana. Você pode conjurá-lo como magia arcana inata à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Você é treinado em modificador de ataque mágico e CD de magia, e sua habilidade de conjuração é Carisma.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 21,
    rulesSummary:
      '1 truque arcano comum inato à vontade; conjuração treinada (Carisma).',
    choices: [
      {
        id: 'spellhorn-cantrip',
        label: 'Truque arcano inato',
        options: [
          {
            id: 'detect-magic',
            label: 'Detectar Magia',
            originalLabel: 'Detect Magic',
          },
          { id: 'shield', label: 'Escudo', originalLabel: 'Shield' },
          {
            id: 'telekinetic-hand',
            label: 'Mão Telecinética',
            originalLabel: 'Telekinetic Hand',
          },
          { id: 'light', label: 'Luz', originalLabel: 'Light' },
          { id: 'other', label: 'Outro (anotar nas notas)' },
        ],
      },
    ],
    specialAbilities: [
      {
        id: 'spellhorn-innate-cantrip',
        name: 'Truque Arcano Inato',
        originalName: 'Arcane Innate Cantrip',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura o truque arcano escolhido como magia inata à vontade, elevado à metade do seu nível (arredondado para cima). Conjuração treinada com Carisma.',
      },
    ],
  },
  {
    id: HERITAGE_STRONGJAW_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Mandíbula Forte',
    originalName: 'Strongjaw Kobold',
    description:
      'Sua toca é conhecida por mandíbulas poderosas e dentes afiados — seja para se defender de predadores naturais ou por reverência a uma fera poderosa. Você ganha um ataque desarmado de mandíbulas que causa 1d6 de dano perfurante. Suas mandíbulas estão no grupo briga e têm os traços finura e desarmado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 21,
    rulesSummary:
      'Mandíbulas desarmadas 1d6 perfurante (briga, finura, desarmado).',
    specialAbilities: [
      {
        id: 'strongjaw-jaws',
        name: 'Mandíbulas',
        originalName: 'Jaws',
        actionType: 'passive',
        description:
          'Ataque desarmado de mandíbulas: 1d6 perfurante, grupo briga, traços finura e desarmado.',
      },
    ],
  },
  {
    id: HERITAGE_TUNNELFLOOD_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Inundação de Túnel',
    originalName: 'Tunnelflood Kobold',
    description:
      'Você cresceu numa toca cruzada por passagens subaquáticas, naturais ou escavadas, e foi influenciado por uma entidade aquática poderosa ou ser de água primal. Você ganha deslocamento de natação de 4,5 metros (15 pés).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 21,
    rulesSummary: 'Deslocamento de natação 4,5 m (15 pés).',
    specialAbilities: [
      {
        id: 'tunnelflood-swim',
        name: 'Natação de Túnel',
        originalName: 'Swim Speed',
        actionType: 'passive',
        description: 'Deslocamento de natação de 4,5 metros.',
      },
    ],
  },
  {
    id: HERITAGE_VENOMTAIL_KOBOLD_ID,
    ancestryId: ANCESTRY_KOBOLD_ID,
    name: 'Kobold Cauda Venenosa',
    originalName: 'Venomtail Kobold',
    description:
      'Graças à proximidade de uma criatura venenosa na sua toca, você nasceu com um esporão vestigial na cauda que secreta veneno mortal. Você ganha a ação Toxina da Cauda. Toxina da Cauda [1 ação] (manipular) Frequência uma vez por dia; Requisitos: você empunha uma arma perfurante ou cortante; Efeito: aplica o veneno da cauda a uma arma perfurante ou cortante. Se seu próximo Ataque com essa arma antes do fim do seu próximo turno acertar e causar dano, você causa dano de veneno persistente igual ao seu nível no alvo.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_2_ID,
    sourcePage: 21,
    rulesSummary:
      'Toxina da Cauda 1×/dia: veneno em arma P/S; próximo acerto causa veneno persistente = nível.',
    specialAbilities: [
      {
        id: 'venomtail-tail-toxin',
        name: 'Toxina da Cauda',
        originalName: 'Tail Toxin',
        actionType: 'one',
        frequency: '1 por dia',
        description:
          'Aplica veneno a arma perfurante ou cortante; no próximo acerto que cause dano, inflige veneno persistente igual ao seu nível.',
      },
    ],
  },
]
