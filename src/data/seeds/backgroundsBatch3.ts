import type { BackgroundDraft } from './backgroundFactory'
import {
  AUGURY_WEEKLY,
  BESTIAL_CLARITY,
  CONTRACT_NEGOTIATOR,
  ENLIGHTENMENT_IN_ADVERSITY,
  FATED_RIVAL,
  FINAL_SPITE,
  HOST_SPIRIT,
  ILL_OMEN_DAILY,
  INDOMITABLE_ACT,
  KAIJU_TROPHY,
  LETTER_WRITER_LANGUAGE,
  NAME_DROP,
  NOCTURNAL_NAVIGATOR,
  RECLAIM_DESTINY,
  SIGN_INNATE_SPELL,
  STELLAR_MISFORTUNE,
  TIDE_WATCHER,
  VITALITY_LASH_INNATE,
  VITALITY_LASH_INNATE_INT,
  WARDED_BY_KAMI,
} from './backgroundAbilityTexts'
import {
  SOURCE_BOOK_OF_THE_DEAD_ID,
  SOURCE_FIREBRANDS_ID,
  SOURCE_GATEWALKERS_PG_ID,
  SOURCE_HIGHHELM_ID,
  SOURCE_KNIGHTS_LASTWALL_ID,
  SOURCE_TIAN_XIA_CG_ID,
  SOURCE_TRAVEL_GUIDE_ID,
  SOURCE_WARDENS_WILDWOOD_PG_ID,
} from './sources'

const GW = SOURCE_GATEWALKERS_PG_ID
const TX = SOURCE_TIAN_XIA_CG_ID
const TG = SOURCE_TRAVEL_GUIDE_ID
const HH = SOURCE_HIGHHELM_ID
const FB = SOURCE_FIREBRANDS_ID
const KOL = SOURCE_KNIGHTS_LASTWALL_ID
const BOTD = SOURCE_BOOK_OF_THE_DEAD_ID
const WOW = SOURCE_WARDENS_WILDWOOD_PG_ID

const ALL_SKILLS = [
  'acrobatics',
  'arcana',
  'athletics',
  'crafting',
  'deception',
  'diplomacy',
  'intimidation',
  'medicine',
  'nature',
  'occultism',
  'performance',
  'religion',
  'society',
  'stealth',
  'survival',
  'thievery',
] as const

/**
 * +60 origens (Gatewalkers restantes, Tian Xia, Travel Guide, Highhelm,
 * Firebrands, Knights of Lastwall, Book of the Dead, Wardens of Wildwood).
 */
export const draftsBatch3: BackgroundDraft[] = [
  // ——— Gatewalkers PG (2 restantes) ———
  {
    id: 'gw-wanderlust',
    name: 'Espírito Errante',
    originalName: 'Wanderlust',
    sourceId: GW,
    sourcePage: 8,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'stabling-lore', name: 'Conhecimento de Estabulagem' },
    feats: [{ name: 'Cavaleiro Expresso', originalName: 'Express Rider' }],
    description:
      'Você viajou o mundo em busca de emoção e, no Momento Ausente, atravessou um portal. Desde então manifesta poderes desviantes.',
  },
  {
    id: 'gw-wishes-for-riches',
    name: 'Desejos de Riqueza',
    originalName: 'Wishes for Riches',
    sourceId: GW,
    sourcePage: 8,
    rarity: 'rare',
    boosts: ['dexterity', 'charisma'],
    skill: 'thievery',
    lore: { type: 'fixed', id: 'games-lore', name: 'Conhecimento de Jogos' },
    feats: [{ name: 'Furto Sutil', originalName: 'Subtle Theft' }],
    description:
      'No Momento Ausente você viu riquezas além do portal e atravessou em busca de fortuna. Voltou com poderes desviantes, não com ouro.',
  },

  // ——— Tian Xia Character Guide ———
  {
    id: 'txcg-acupuncturist',
    name: 'Acupunturista',
    originalName: 'Acupuncturist',
    sourceId: TX,
    sourcePage: 10,
    rarity: 'uncommon',
    boosts: ['dexterity', 'wisdom'],
    skill: 'medicine',
    lore: { type: 'fixed', id: 'acupuncture-lore', name: 'Conhecimento de Acupuntura' },
    feats: [{ name: 'Medicina de Combate', originalName: 'Battle Medicine' }],
    description:
      'Você domina agulhas e pontos de pressão para tratar o corpo. Sua precisão médica o torna valioso em viagens perigosas.',
  },
  {
    id: 'txcg-bachuan-revolutionary',
    name: 'Revolucionário de Bachuan',
    originalName: 'Bachuan Revolutionary',
    sourceId: TX,
    sourcePage: 10,
    rarity: 'uncommon',
    boosts: ['strength', 'wisdom'],
    skill: 'society',
    lore: { type: 'fixed', id: 'legal-lore', name: 'Conhecimento Jurídico' },
    feats: [{ name: 'Linguagem de Sinais', originalName: 'Sign Language' }],
    description:
      'Você lutou pela causa revolucionária em Bachuan, aprendendo a organizar e comunicar-se sob vigilância.',
  },
  {
    id: 'txcg-gossip',
    name: 'Fofoqueiro',
    originalName: 'Gossip',
    sourceId: TX,
    sourcePage: 10,
    boosts: ['intelligence', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'custom', prompt: 'qualquer conhecimento' },
    feats: [{ name: 'Rede de Contatos', originalName: 'Hobnobber' }],
    description:
      'Você vive de rumores e conversas — sempre sabe quem falou o quê. Sua rede social abre portas (e cria inimigos).',
  },
  {
    id: 'txcg-jeweler',
    name: 'Joalheiro',
    originalName: 'Jeweler',
    sourceId: TX,
    sourcePage: 10,
    boosts: ['intelligence', 'wisdom'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'gem-lore', name: 'Conhecimento de Gemas' },
    feats: [{ name: 'Avaliação do Artesão', originalName: "Crafter's Appraisal" }],
    description:
      'Você avalia e trabalha pedras preciosas com olhar treinado. Mercados e cortes valorizam seu julgamento.',
  },
  {
    id: 'txcg-ocean-diver',
    name: 'Mergulhador Oceânico',
    originalName: 'Ocean Diver',
    sourceId: TX,
    sourcePage: 10,
    rarity: 'uncommon',
    boosts: ['constitution', 'wisdom'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'ocean-lore', name: 'Conhecimento do Oceano' },
    feats: [{ name: 'Saqueador Subaquático', originalName: 'Underwater Marauder' }],
    description:
      'Você mergulha nas costas de Tian Xia em busca de alimento e pérolas, conhecendo os perigos do mar.',
  },
  {
    id: 'txcg-remittance-agent',
    name: 'Agente de Remessas',
    originalName: 'Remittance Agent',
    sourceId: TX,
    sourcePage: 10,
    boosts: ['constitution', 'intelligence'],
    skill: 'society',
    lore: {
      type: 'choice',
      options: [
        { id: 'labor-lore', name: 'Conhecimento de Trabalho' },
        { id: 'mercenary-lore', name: 'Conhecimento de Mercenários' },
      ],
    },
    feats: [{ name: 'Profissional Experiente', originalName: 'Experienced Professional' }],
    description:
      'Você transporta dinheiro e bens para famílias distantes, conhecendo rotas, taxas e confiança no comércio.',
  },
  {
    id: 'txcg-runaway-noble',
    name: 'Nobre Fugitivo',
    originalName: 'Runaway Noble',
    sourceId: TX,
    sourcePage: 10,
    rarity: 'uncommon',
    boosts: ['intelligence', 'charisma'],
    skill: 'diplomacy',
    lore: {
      type: 'choice',
      options: [
        { id: 'genealogy-lore', name: 'Conhecimento de Genealogia' },
        { id: 'heraldry-lore', name: 'Conhecimento de Heráldica' },
      ],
    },
    feats: [{ name: 'Gracejo', originalName: 'Bon Mot' }],
    description:
      'Você abandonou a corte e o protocolo da nobreza. Ainda sabe falar com elegância — agora longe do palácio.',
  },
  {
    id: 'txcg-silk-farmer',
    name: 'Criador de Seda',
    originalName: 'Silk Farmer',
    sourceId: TX,
    sourcePage: 11,
    rarity: 'uncommon',
    boosts: ['intelligence', 'wisdom'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'sericulture-lore', name: 'Conhecimento de Sericultura' },
    feats: [{ name: 'Ofício Especializado', originalName: 'Specialty Crafting' }],
    description:
      'Você cria bichos-da-seda e produz fios preciosos. A paciência do ofício moldou sua vida até a aventura.',
  },
  {
    id: 'txcg-streetfood-vendor',
    name: 'Vendedor de Comida de Rua',
    originalName: 'Streetfood Vendor',
    sourceId: TX,
    sourcePage: 11,
    boosts: ['strength', 'dexterity'],
    skill: { type: 'choice', options: ['crafting', 'society'] },
    lore: { type: 'fixed', id: 'cooking-lore', name: 'Conhecimento de Culinária' },
    feats: [{ name: 'Temperado', originalName: 'Seasoned' }],
    description:
      'Você vende refeições de um carrinho portátil pelas ruas. Aventureiros famintos são seus melhores clientes.',
  },
  {
    id: 'txcg-tiffin-box-deliverer',
    name: 'Entregador de Marmitas',
    originalName: 'Tiffin Box Deliverer',
    sourceId: TX,
    sourcePage: 11,
    rarity: 'uncommon',
    boosts: ['dexterity', 'intelligence'],
    skill: 'society',
    lore: { type: 'fixed', id: 'labor-lore', name: 'Conhecimento de Trabalho' },
    feats: [{ name: 'Conhecimento de Rua', originalName: 'Streetwise' }],
    description:
      'Você corre pelas cidades levando marmitas quentes. Conhece atalhos, horários e o pulso das ruas.',
  },
  {
    id: 'txcg-traveling-gourmand',
    name: 'Gastrônomo Viajante',
    originalName: 'Traveling Gourmand',
    sourceId: TX,
    sourcePage: 11,
    rarity: 'uncommon',
    boosts: ['dexterity', 'intelligence'],
    skill: 'survival',
    lore: { type: 'fixed', id: 'cooking-lore', name: 'Conhecimento de Culinária' },
    feats: [{ name: 'Coletor', originalName: 'Forager' }],
    description:
      'Você viaja em busca de sabores raros e ingredientes selvagens. Cada estrada é uma nova refeição.',
  },
  {
    id: 'txcg-weaver',
    name: 'Tecelão',
    originalName: 'Weaver',
    sourceId: TX,
    sourcePage: 11,
    boosts: ['dexterity', 'wisdom'],
    skill: 'crafting',
    lore: {
      type: 'choice',
      options: [
        { id: 'basket-weaving-lore', name: 'Conhecimento de Cestaria' },
        { id: 'tapestry-lore', name: 'Conhecimento de Tapeçaria' },
        { id: 'textile-lore', name: 'Conhecimento de Têxteis' },
      ],
    },
    feats: [{ name: 'Ofício Especializado', originalName: 'Specialty Crafting' }],
    description:
      'Você tece tecidos e padrões complexos com mãos firmes. A disciplina do tear acompanha a aventura.',
  },
  {
    id: 'txcg-banished-celestial',
    name: 'Celestial Banido',
    originalName: 'Banished Celestial',
    sourceId: TX,
    sourcePage: 12,
    rarity: 'rare',
    boosts: 'free',
    skill: { type: 'choice', options: [...ALL_SKILLS] },
    lore: { type: 'custom', prompt: 'qualquer conhecimento' },
    feats: [
      {
        name: 'Iluminação na Adversidade',
        originalName: 'Enlightenment in Adversity',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1 vez ao dia',
        trigger:
          'Você falha criticamente em um teste de uma perícia que ganhou desta origem',
        description: ENLIGHTENMENT_IN_ADVERSITY,
      },
    ],
    description:
      'Você foi algo sobrenatural forçado a forma mortal. 1 vez ao dia, se falhar criticamente na perícia ou no Conhecimento desta origem, a próxima tentativa da mesma perícia em 1 minuto rola duas vezes e usa o melhor.',
  },
  {
    id: 'txcg-eagle-hunter',
    name: 'Caçador de Águias',
    originalName: 'Eagle Hunter',
    sourceId: TX,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['strength', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'hunting-lore', name: 'Conhecimento de Caça' },
    feats: [
      { name: 'Animal de Estimação', originalName: 'Pet' },
      { name: 'Treinar Animal', originalName: 'Train Animal' },
    ],
    description:
      'Desde jovem você caça com uma águia companheira, no estilo nômade de Hongal. A parceria guia suas aventuras.',
  },
  {
    id: 'txcg-fated-rival',
    name: 'Rival do Destino',
    originalName: 'Fated Rival',
    sourceId: TX,
    sourcePage: 12,
    rarity: 'rare',
    boosts: 'free',
    skill: { type: 'none' },
    lore: {
      type: 'custom',
      prompt: 'primeiro conhecimento ligado ao rival',
    },
    extraLores: [
      {
        type: 'custom',
        prompt: 'segundo conhecimento ligado ao rival',
      },
    ],
    feats: [
      { name: 'Difícil de Matar', originalName: 'Diehard' },
      {
        name: 'Vínculo do rival',
        originalName: 'rival bond',
        featType: 'other',
        description: FATED_RIVAL,
      },
    ],
    description:
      'Você está ligado a um rival pelo destino. Longe dele: Difícil de Matar e +1 contra condenado. Perto dele: perde isso, mas +1 em ataque e dano. Um dos boosts livres é do mestre.',
  },
  {
    id: 'txcg-favored',
    name: 'Favorito',
    originalName: 'Favored',
    sourceId: TX,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['intelligence', 'charisma'],
    skill: { type: 'choice', options: ['diplomacy', 'performance', 'society'] },
    lore: { type: 'custom', prompt: 'qualquer conhecimento' },
    feats: [
      {
        name: 'Invocar Nome',
        originalName: 'Name Drop',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1 vez ao dia',
        trigger:
          'Você falha ou falha criticamente em um teste de Enganação, Diplomacia, Intimidação ou Sociedade',
        traits: ['auditory', 'fortune'],
        description: NAME_DROP,
      },
    ],
    description:
      'Artista ou companhia da elite, você ganhou o olho de um patrono poderoso. Uma vez ao dia, Invocar Nome rerrola um teste social falho — mas você deve usar o segundo resultado.',
  },
  {
    id: 'txcg-warded-by-kami',
    name: 'Protegido por Kami',
    originalName: 'Warded by Kami',
    sourceId: TX,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['intelligence', 'wisdom'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'spirit-lore', name: 'Conhecimento de Espíritos' },
    feats: [
      {
        name: 'Fundir-se ao amparo',
        originalName: 'merge with ward',
        featType: 'other',
        actionType: 'one',
        frequency: '1 vez ao dia',
        description: WARDED_BY_KAMI,
      },
    ],
    description:
      'Você viveu entre kami na Floresta dos Espíritos e está ligado a um amparo (animal, planta, objeto ou local). 1 vez ao dia, Interagir para fundir-se a ele e recuperar PV iguais ao seu nível (traço cura).',
  },
  {
    id: 'txcg-kaiju-stalker',
    name: 'Caçador de Kaiju',
    originalName: 'Kaiju Stalker',
    sourceId: TX,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['strength', 'dexterity'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'kaiju-lore', name: 'Conhecimento de Kaiju' },
    feats: [
      {
        name: 'Feito de Atletismo',
        originalName: 'Athletics skill feat',
        featType: 'skill',
        chooseSkillFeat: 'athletics',
        chooseHint:
          'Escolha um feito de perícia de Atletismo cujos pré-requisitos você cumpra. Esta origem já o deixa treinado em Atletismo.',
      },
      {
        name: 'Troféu de kaiju',
        originalName: 'kaiju trophy',
        featType: 'other',
        description: KAIJU_TROPHY,
      },
    ],
    description:
      'Você caça monstros colossais nas terras perigosas de Tian Xia. Ganha um feito de Atletismo à escolha e +1 de circunstância para Recapitular Conhecimento de Kaiju se tiver um item da criatura à vista.',
  },
  {
    id: 'txcg-professional-letter-writer',
    name: 'Escrevente Profissional',
    originalName: 'Professional Letter Writer',
    sourceId: TX,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['intelligence', 'charisma'],
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'scribing-lore', name: 'Conhecimento de Escrita' },
    feats: [
      {
        name: 'Feito de perícia',
        originalName: 'Specialty Crafting or Multilingual',
        featType: 'skill',
        chooseHint: 'Escolha Ofício Especializado ou Poliglota.',
        featOptions: [
          {
            id: 'specialty-crafting',
            featId: 'feat-specialty-crafting',
            featName: 'Ofício Especializado',
            originalName: 'Specialty Crafting',
          },
          {
            id: 'multilingual',
            featId: 'feat-multilingual',
            featName: 'Poliglota',
            originalName: 'Multilingual',
          },
        ],
      },
      {
        name: 'Idioma do dia',
        originalName: 'daily language',
        featType: 'other',
        description: LETTER_WRITER_LANGUAGE,
      },
    ],
    description:
      'Você escreve e lê cartas para quem não pode fazê-lo. Escolha Ofício Especializado ou Poliglota. Nas preparações diárias, conhece um idioma extra que pode trocar no dia seguinte.',
  },
  {
    id: 'txcg-zodiac-bound',
    name: 'Ligado ao Zodíaco',
    originalName: 'Zodiac Bound',
    sourceId: TX,
    sourcePage: 13,
    rarity: 'rare',
    boosts: 'free',
    freeBoost: false,
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'astrology-lore', name: 'Conhecimento de Astrologia' },
    feats: [
      {
        name: 'Magia inata do zodíaco',
        originalName: 'zodiac innate spell',
        featType: 'other',
        description: SIGN_INNATE_SPELL,
      },
    ],
    description:
      'Você nasceu sob uma constelação poderosa do zodíaco dos Impérios Dragão. O signo (tabela do Tian Xia Character Guide) define o reforço de atributo e uma magia inata divina — combine o signo com o mestre.',
  },

  // ——— Travel Guide ———
  {
    id: 'tg-astrological-augur',
    name: 'Áugure Astrológico',
    originalName: 'Astrological Augur',
    sourceId: TG,
    sourcePage: 122,
    rarity: 'rare',
    boosts: ['wisdom', 'charisma'],
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'astrology-lore', name: 'Conhecimento de Astrologia' },
    feats: [
      {
        name: 'Augúrio (inato divino, 1/semana)',
        originalName: 'augury (divine innate, once per week)',
        featType: 'other',
        description: AUGURY_WEEKLY,
      },
    ],
    description:
      'Você aprendeu que as estrelas abrem poder místico e visões do futuro. Uma vez por semana, lança Augúrio como magia inata divina para perguntar se um curso de ação trará boa, má, mista ou nenhuma fortuna.',
  },
  {
    id: 'tg-doomcaller',
    name: 'Arauto do Destino',
    originalName: 'Doomcaller',
    sourceId: TG,
    sourcePage: 122,
    rarity: 'rare',
    boosts: ['intelligence', 'wisdom'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'star-lore', name: 'Conhecimento das Estrelas' },
    feats: [
      {
        name: 'Infortúnio Estelar',
        originalName: 'Stellar Misfortune',
        featType: 'other',
        actionType: 'free',
        frequency: '1 vez ao dia',
        trigger:
          'Uma criatura que você possa ver está prestes a tentar uma salvaguarda, rolagem de ataque ou teste de perícia',
        traits: ['divination', 'misfortune', 'occult'],
        description: STELLAR_MISFORTUNE,
      },
    ],
    description:
      'Nas estrelas você vê o fim de todas as coisas e alerta os outros. Uma vez ao dia, sob o céu estrelado, Infortúnio Estelar força o alvo a rolar duas vezes e usar o pior resultado.',
  },
  {
    id: 'tg-eclipseborn',
    name: 'Nascido no Eclipse',
    originalName: 'Eclipseborn',
    sourceId: TG,
    sourcePage: 122,
    rarity: 'rare',
    boosts: ['constitution', 'charisma'],
    skill: { type: 'none' },
    lore: {
      type: 'custom',
      prompt: 'conhecimento ligado ao desastre do seu nascimento (o cataclismo que coincidiu com o eclipse)',
    },
    feats: [
      {
        name: 'Mau Presságio (inato ocultista, 1/dia)',
        originalName: 'ill omen (occult innate, once per day)',
        featType: 'other',
        actionType: 'two',
        frequency: '1 vez ao dia',
        description: ILL_OMEN_DAILY,
      },
    ],
    description:
      'Você nasceu no instante de um eclipse, coincidindo com uma catástrofe. Uma vez ao dia, lança Mau Presságio como magia inata ocultista. O Conhecimento deve ser ligado ao desastre do seu nascimento.',
  },
  {
    id: 'tg-nocturnal-navigator',
    name: 'Navegador Noturno',
    originalName: 'Nocturnal Navigator',
    sourceId: TG,
    sourcePage: 122,
    rarity: 'rare',
    boosts: ['dexterity', 'wisdom'],
    skill: 'survival',
    lore: { type: 'none' },
    feats: [
      {
        name: 'Orientação pelas estrelas',
        originalName: 'star-guided orienteering',
        featType: 'other',
        description: NOCTURNAL_NAVIGATOR,
      },
    ],
    description:
      'As estrelas falam segredos que o guiam. Quando as identifica com clareza, sucesso em Sentir Direção (ou orientação) vira crítico, e falha crítica vira falha.',
  },
  {
    id: 'tg-sign-bound',
    name: 'Ligado ao Signo',
    originalName: 'Sign Bound',
    sourceId: TG,
    sourcePage: 122,
    rarity: 'rare',
    boosts: 'free',
    freeBoost: false,
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'astrology-lore', name: 'Conhecimento de Astrologia' },
    feats: [
      {
        name: 'Magia inata do signo',
        originalName: 'sign innate spell',
        featType: 'other',
        description: SIGN_INNATE_SPELL,
      },
    ],
    description:
      'Você nasceu sob uma constelação marcante da Caravana Cósmica. O signo (tabela do Travel Guide) define o reforço de atributo e uma magia inata oculta — combine o signo com o mestre.',
  },
  {
    id: 'tg-starless-one',
    name: 'Sem Estrelas',
    originalName: 'Starless One',
    sourceId: TG,
    sourcePage: 123,
    rarity: 'rare',
    boosts: ['wisdom', 'charisma'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'astrology-lore', name: 'Conhecimento de Astrologia' },
    feats: [
      {
        name: 'Reclamar Destino',
        originalName: 'Reclaim Destiny',
        featType: 'other',
        actionType: 'free',
        frequency: '1 vez ao dia',
        trigger:
          'Você está prestes a tentar um teste afetado por fortuna ou infortúnio',
        description: RECLAIM_DESTINY,
      },
    ],
    description:
      'Você nasceu numa noite sem estrelas e rejeita influências externas sobre sua sorte. 1 vez ao dia, ação livre: ignore fortuna ou infortúnio num teste e role normalmente.',
  },
  {
    id: 'tg-sun-dancer',
    name: 'Dançarino do Sol',
    originalName: 'Sun Dancer',
    sourceId: TG,
    sourcePage: 123,
    rarity: 'rare',
    boosts: ['dexterity', 'charisma'],
    skill: 'performance',
    lore: { type: 'none' },
    feats: [{ name: 'Performance Fascinante', originalName: 'Fascinating Performance' }],
    description:
      'Você celebra o sol com dança e performance solar. Sua arte hipnotiza tanto quanto aquece o espírito.',
  },
  {
    id: 'tg-tide-watcher',
    name: 'Vigia das Marés',
    originalName: 'Tide Watcher',
    sourceId: TG,
    sourcePage: 123,
    rarity: 'rare',
    boosts: ['intelligence', 'charisma'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'ocean-lore', name: 'Conhecimento do Oceano' },
    feats: [
      {
        name: 'Ler as marés',
        originalName: 'read the tides',
        featType: 'other',
        description: TIDE_WATCHER,
      },
    ],
    description:
      'Você lê as fases da lua para prever marés e tempestades. À noite, sob a lua, +1 de circunstância em Sobrevivência para prever o tempo (+2 perto do oceano).',
  },

  // ——— Highhelm ———
  {
    id: 'hh-fightbreaker',
    name: 'Pacificador',
    originalName: 'Fightbreaker',
    sourceId: HH,
    sourcePage: 86,
    boosts: ['wisdom', 'charisma'],
    skill: 'diplomacy',
    lore: {
      type: 'custom',
      prompt: 'cidade ou assentamento onde se tornou Pacificador',
    },
    feats: [{ name: 'Impressão em Grupo', originalName: 'Group Impression' }],
    description:
      'Você sente tensões crescentes e acalma nervos à beira da violência. A aventura testa sua arte de evitar conflitos.',
  },
  {
    id: 'hh-highborn-snoop',
    name: 'Espião Aristocrata',
    originalName: 'Highborn Snoop',
    sourceId: HH,
    sourcePage: 58,
    boosts: ['dexterity', 'intelligence'],
    skill: 'society',
    lore: { type: 'fixed', id: 'guild-lore', name: 'Conhecimento de Guilda' },
    feats: [{ name: 'Etiqueta Cortês', originalName: 'Courtly Graces' }],
    description:
      'Nas cortes de Highhelm você aprendeu a observar fofocas e intrigas da elite anã. Etiqueta e discrição são suas armas.',
  },
  {
    id: 'hh-union-representative',
    name: 'Representante Sindical',
    originalName: 'Union Representative',
    sourceId: HH,
    sourcePage: 72,
    boosts: ['intelligence', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'fixed', id: 'legal-lore', name: 'Conhecimento Jurídico' },
    feats: [
      {
        name: 'Negociador de Contratos',
        originalName: 'Contract Negotiator',
        description: CONTRACT_NEGOTIATOR,
      },
    ],
    description:
      'Você negociava contratos e direitos para trabalhadores das profundezas. Em acordos, usa Conhecimento Jurídico no lugar de Diplomacia para impressionar ou pedir.',
  },

  // ——— Firebrands ———
  {
    id: 'fb-beast-blessed',
    name: 'Abençoado pela Besta',
    originalName: 'Beast Blessed',
    sourceId: FB,
    sourcePage: 75,
    rarity: 'rare',
    boosts: ['dexterity', 'wisdom'],
    skill: 'survival',
    lore: { type: 'none' },
    feats: [
      {
        name: 'Clareza Bestial',
        originalName: 'Bestial Clarity',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1 vez ao dia',
        trigger:
          'Você falha numa salvaguarda contra um efeito de encantamento',
        traits: ['fortune'],
        description: BESTIAL_CLARITY,
      },
    ],
    description:
      'Você libertou uma besta mágica e recebeu uma bênção de liberdade. Traços bestiais cosméticos marcam seu corpo. Uma vez ao dia, Clareza Bestial rerrola uma salvaguarda falha contra encantamento, com +2.',
  },
  {
    id: 'fb-dauntless',
    name: 'Destemido',
    originalName: 'Dauntless',
    sourceId: FB,
    sourcePage: 75,
    rarity: 'rare',
    boosts: ['wisdom', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'none' },
    feats: [
      {
        name: 'Ato Indomável',
        originalName: 'Indomitable Act',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1 vez ao dia',
        trigger: 'Você está prestes a tentar um teste',
        traits: ['fortune'],
        description: INDOMITABLE_ACT,
      },
    ],
    description:
      'Você enfrentou cada medo na infância e agora usa o próprio pavor como combustível. Uma vez ao dia, se estiver amedrontado, Ato Indomável rola o teste duas vezes e usa o melhor resultado.',
  },
  {
    id: 'fb-firebrand-follower',
    name: 'Seguidor dos Firebrands',
    originalName: 'Firebrand Follower',
    sourceId: FB,
    sourcePage: 75,
    boosts: ['strength', 'charisma'],
    skill: { type: 'choice', options: ['athletics', 'performance'] },
    lore: { type: 'fixed', id: 'firebrand-lore', name: 'Conhecimento dos Firebrands' },
    feats: [
      {
        name: 'Garantia',
        originalName: 'Assurance',
        appendChosenSkillName: true,
        skillGrantIdForName: 'skill',
      },
    ],
    description:
      'Firebrands o libertaram de uma situação sem esperança. Você aspira a juntar-se a eles e treina com Garantia.',
  },
  {
    id: 'fb-free-spirit',
    name: 'Espírito Livre',
    originalName: 'Free Spirit',
    sourceId: FB,
    sourcePage: 75,
    boosts: ['wisdom', 'charisma'],
    skill: 'survival',
    lore: {
      type: 'custom',
      prompt: 'assentamento ou terreno por onde viajou',
    },
    feats: [{ name: 'Coletor', originalName: 'Forager' }],
    description:
      'Você rejeita correntes e vive pela liberdade dos Firebrands. A natureza fornece o que precisa.',
  },
  {
    id: 'fb-runner',
    name: 'Mensageiro',
    originalName: 'Runner',
    sourceId: FB,
    sourcePage: 75,
    boosts: ['strength', 'intelligence'],
    skill: 'athletics',
    lore: { type: 'custom', prompt: 'cidade onde foi mensageiro' },
    feats: [{ name: 'Salto Rápido', originalName: 'Quick Jump' }],
    description:
      'Você corre com mensagens e esperança para os Firebrands. Velocidade e salto ágil mantêm você à frente.',
  },
  {
    id: 'fb-thrill-seeker',
    name: 'Buscador de Emoção',
    originalName: 'Thrill-Seeker',
    sourceId: FB,
    sourcePage: 75,
    boosts: ['strength', 'constitution'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'engineering-lore', name: 'Conhecimento de Engenharia' },
    feats: [{ name: 'Escalador de Combate', originalName: 'Combat Climber' }],
    description:
      'Você busca adrenalina e risco constante. Escaladas perigosas alimentam seu espírito rebelde.',
  },
  {
    id: 'fb-unremarkable',
    name: 'Discreto',
    originalName: 'Unremarkable',
    sourceId: FB,
    sourcePage: 75,
    boosts: ['wisdom', 'charisma'],
    skill: 'deception',
    lore: { type: 'fixed', id: 'acting-lore', name: 'Conhecimento de Interpretação' },
    feats: [{ name: 'Distração Prolongada', originalName: 'Lengthy Diversion' }],
    description:
      'Você passa despercebido na multidão — útil para rebeliões Firebrand. Distrações cobrem a fuga dos aliados.',
  },

  // ——— Knights of Lastwall ———
  {
    id: 'kol-once-bitten',
    name: 'Uma Vez Mordido',
    originalName: 'Once Bitten',
    sourceId: KOL,
    sourcePage: 73,
    boosts: ['dexterity', 'wisdom'],
    skill: 'medicine',
    lore: { type: 'fixed', id: 'undead-lore', name: 'Conhecimento de Mortos-vivos' },
    feats: [{ name: 'Medicina de Combate', originalName: 'Battle Medicine' }],
    description:
      'Você sobreviveu a um ataque de mortos-vivos e aprendeu a tratar feridas sob pressão.',
  },
  {
    id: 'kol-ozem-experience',
    name: 'Experiência de Ozem',
    originalName: 'Ozem Experience',
    sourceId: KOL,
    sourcePage: 73,
    boosts: ['strength', 'intelligence'],
    skill: 'society',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Etiqueta Cortês', originalName: 'Courtly Graces' }],
    description:
      'Você conheceu a ordem e a tradição dos Cavaleiros de Ozem. Etiqueta e estratégia de guerra ainda guiam seus passos.',
  },
  {
    id: 'kol-pillar',
    name: 'Pilar',
    originalName: 'Pillar',
    sourceId: KOL,
    sourcePage: 73,
    boosts: ['intelligence', 'wisdom'],
    skill: { type: 'choice', options: ['medicine', 'society', 'survival'] },
    lore: { type: 'fixed', id: 'labor-lore', name: 'Conhecimento de Trabalho' },
    feats: [{ name: 'Conhecimento Adicional', originalName: 'Additional Lore' }],
    description:
      'Você é um apoio estável para os Cavaleiros de Lastwall — cura, conhecimento e constância em tempos sombrios.',
  },
  {
    id: 'kol-reclaimed',
    name: 'Reclamado',
    originalName: 'Reclaimed',
    sourceId: KOL,
    sourcePage: 73,
    boosts: ['constitution', 'charisma'],
    skill: 'intimidation',
    lore: {
      type: 'fixed',
      id: 'crimson-reclaimers-lore',
      name: 'Conhecimento dos Recuperadores Carmesins',
    },
    feats: [{ name: 'Coerção em Grupo', originalName: 'Group Coercion' }],
    description:
      'Você foi recuperado das garras da mortandade ou da opressão e agora inspira em nome da nova cruzada.',
  },
  {
    id: 'kol-reclaimed-investigator',
    name: 'Investigador Reclamado',
    originalName: 'Reclaimed Investigator',
    sourceId: KOL,
    sourcePage: 73,
    boosts: ['intelligence', 'wisdom'],
    skill: 'occultism',
    lore: {
      type: 'fixed',
      id: 'crimson-reclaimers-lore',
      name: 'Conhecimento dos Recuperadores Carmesins',
    },
    feats: [
      { name: 'Identificação de Peculiaridades', originalName: 'Oddity Identification' },
    ],
    description:
      'Você investiga o oculto e o macabro para os Cavaleiros. Identificar o estranho é o primeiro passo.',
  },
  {
    id: 'kol-sentinel-reflectance',
    name: 'Reflexo da Sentinela',
    originalName: 'Sentinel Reflectance',
    sourceId: KOL,
    sourcePage: 73,
    boosts: ['strength', 'charisma'],
    skill: 'diplomacy',
    lore: {
      type: 'fixed',
      id: 'shining-sentinels-lore',
      name: 'Conhecimento das Sentinelas Reluzentes',
    },
    feats: [{ name: 'Sem Motivo para Alarme', originalName: 'No Cause for Alarm' }],
    description:
      'Você espelha o ideal das Sentinelas — presença calma que reduz o pânico e mantém a moral alta.',
  },
  {
    id: 'kol-relentless-dedication',
    name: 'Dedicação Implacável',
    originalName: 'Relentless Dedication',
    sourceId: KOL,
    sourcePage: 73,
    rarity: 'rare',
    boosts: ['strength', 'constitution'],
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Acuidade Perspicaz', originalName: 'Canny Acumen' }],
    description:
      'Recrutadores rejeitaram você antes, mas a perseverança abriu as portas. Sua determinação supera o que o desqualificava.',
  },
  {
    id: 'kol-tyrant-witness',
    name: 'Testemunha do Tirano',
    originalName: 'Tyrant Witness',
    sourceId: KOL,
    sourcePage: 73,
    rarity: 'rare',
    boosts: ['dexterity', 'wisdom'],
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'undead-lore', name: 'Conhecimento de Mortos-vivos' },
    feats: [
      {
        name: 'Açoite de Vitalidade (inato divino à vontade)',
        originalName: 'vitality lash (divine innate at will)',
        featType: 'other',
        actionType: 'two',
        description: VITALITY_LASH_INNATE,
      },
    ],
    description:
      'Você viu Tar-Baphon emergir e sobreviveu ao horror em Lastwall. Lança Açoite de Vitalidade (o truque Remaster equivalente a Disruptir Morto-vivo) como truque inato divino à vontade.',
  },

  // ——— Book of the Dead ———
  {
    id: 'botd-curandero',
    name: 'Curandeiro',
    originalName: 'Curandero',
    sourceId: BOTD,
    sourcePage: 16,
    boosts: ['constitution', 'wisdom'],
    skill: 'medicine',
    lore: { type: 'fixed', id: 'herbalism-lore', name: 'Conhecimento de Herbalismo' },
    feats: [{ name: 'Inoculação', originalName: 'Inoculation' }],
    description:
      'Você trata males com remédios tradicionais e resiliência. Inocular aliados contra doenças é parte do ofício.',
  },
  {
    id: 'botd-grave-robber',
    name: 'Rouba-tumbas',
    originalName: 'Grave Robber',
    sourceId: BOTD,
    sourcePage: 16,
    boosts: ['strength', 'dexterity'],
    skill: 'stealth',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Contrabandista Experiente', originalName: 'Experienced Smuggler' }],
    description:
      'Você saqueou túmulos e aprendeu a mover o proibido sem ser visto. A morte é um negócio — e um risco.',
  },
  {
    id: 'botd-haunted-citizen',
    name: 'Cidadão Assombrado',
    originalName: 'Haunted Citizen',
    sourceId: BOTD,
    sourcePage: 16,
    boosts: ['wisdom', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'custom', prompt: 'assentamento natal' },
    feats: [{ name: 'Sem Motivo para Alarme', originalName: 'No Cause for Alarm' }],
    description:
      'Espíritos e sobressaltos fazem parte da sua rotina urbana. Você acalma outros mesmo quando o sobrenatural se manifesta.',
  },
  {
    id: 'botd-necromancers-apprentice',
    name: 'Aprendiz de Necromante',
    originalName: "Necromancer's Apprentice",
    sourceId: BOTD,
    sourcePage: 16,
    boosts: ['constitution', 'intelligence'],
    skill: 'arcana',
    lore: { type: 'fixed', id: 'necromancy-lore', name: 'Conhecimento de Necromancia' },
    feats: [{ name: 'Identificação Rápida', originalName: 'Quick Identification' }],
    description:
      'Você estudou sob um necromante e aprendeu a identificar magias rapidamente. O conhecimento dos mortos ainda o acompanha.',
  },
  {
    id: 'botd-night-watch',
    name: 'Vigia Noturno',
    originalName: 'Night Watch',
    sourceId: BOTD,
    sourcePage: 16,
    boosts: ['strength', 'charisma'],
    skill: 'intimidation',
    lore: {
      type: 'choice',
      options: [
        { id: 'legal-lore', name: 'Conhecimento Jurídico' },
        { id: 'home-settlement-lore', name: 'Conhecimento do assentamento natal' },
      ],
    },
    feats: [{ name: 'Coerção Rápida', originalName: 'Quick Coercion' }],
    description:
      'Você patrulhou noites perigosas contra ameaças sombrias. Coagir rápido mantém a ordem quando o medo se espalha.',
  },
  {
    id: 'botd-pyre-tender',
    name: 'Cuidador da Pira',
    originalName: 'Pyre Tender',
    sourceId: BOTD,
    sourcePage: 16,
    boosts: ['dexterity', 'intelligence'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'funeral-lore', name: 'Conhecimento Funerário' },
    feats: [{ name: 'Criação Alquímica', originalName: 'Alchemical Crafting' }],
    description:
      'Você prepara piras e ritos funerários, conhecendo químicos e combustíveis. O fogo libera o que a morte prende.',
  },
  {
    id: 'botd-scion-of-slayers',
    name: 'Herdeiro de Caçadores',
    originalName: 'Scion of Slayers',
    sourceId: BOTD,
    sourcePage: 16,
    rarity: 'rare',
    boosts: ['strength', 'intelligence'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'undead-lore', name: 'Conhecimento de Mortos-vivos' },
    feats: [
      {
        name: 'Açoite de Vitalidade (inato divino, Inteligência)',
        originalName: 'vitality lash (divine innate, Intelligence)',
        featType: 'other',
        actionType: 'two',
        description: VITALITY_LASH_INNATE_INT,
      },
    ],
    description:
      'Sua linhagem caça mortos-vivos há gerações. Lança Açoite de Vitalidade (o truque Remaster equivalente a Disruptir Morto-vivo) como truque inato divino à vontade, usando Inteligência como atributo-chave.',
  },
  {
    id: 'botd-tomb-born',
    name: 'Nascido na Tumba',
    originalName: 'Tomb Born',
    sourceId: BOTD,
    sourcePage: 17,
    rarity: 'rare',
    boosts: ['dexterity', 'constitution'],
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'undead-lore', name: 'Conhecimento de Mortos-vivos' },
    feats: [
      {
        name: 'Último Rancor',
        originalName: 'Tomb Born dying strike',
        featType: 'other',
        description: FINAL_SPITE,
      },
    ],
    description:
      'Você foi concebido em local maculado pela morte. Quando cai a 0 PV, ainda desfere um Golpe antes de cair inconsciente.',
  },
  {
    id: 'botd-willing-host',
    name: 'Anfitrião Voluntário',
    originalName: 'Willing Host',
    sourceId: BOTD,
    sourcePage: 17,
    rarity: 'rare',
    boosts: ['wisdom', 'charisma'],
    skill: { type: 'none' },
    lore: { type: 'fixed', id: 'spirit-lore', name: 'Conhecimento de Espíritos' },
    feats: [
      {
        name: 'Acolher Espírito',
        originalName: 'Host Spirit',
        featType: 'other',
        frequency: '1 vez ao dia',
        description: HOST_SPIRIT,
      },
    ],
    description:
      'Você negocia com espíritos que só você percebe. 1 vez ao dia, numa exploração, tenta um teste de perícia mesmo sem ser treinado; depois deve um favor menor ao espírito em 24 horas ou fica fatigado.',
  },

  // ——— Wardens of Wildwood PG ———
  {
    id: 'wow-fey-friend',
    name: 'Amigo dos Fey',
    originalName: 'Fey Friend',
    sourceId: WOW,
    sourcePage: 7,
    rarity: 'uncommon',
    boosts: ['dexterity', 'charisma'],
    skill: 'deception',
    lore: { type: 'fixed', id: 'fey-lore', name: 'Conhecimento de Fey' },
    feats: [{ name: 'Mentiroso Charmoso', originalName: 'Charming Liar' }],
    description:
      'Você convive com fey da Floresta Verduran e aprendeu a mentir com charme. A amizade feérica abre caminhos — e armadilhas.',
  },
  {
    id: 'wow-green-faith-pilgrim',
    name: 'Peregrino da Fé Verde',
    originalName: 'Green Faith Pilgrim',
    sourceId: WOW,
    sourcePage: 7,
    rarity: 'uncommon',
    boosts: ['constitution', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'green-faith-lore', name: 'Conhecimento da Fé Verde' },
    feats: [{ name: 'Medicina Natural', originalName: 'Natural Medicine' }],
    description:
      'Você peregrinou pela Fé Verde entre as árvores. Remédios naturais e respeito ao equilíbrio guiam sua jornada.',
  },
  {
    id: 'wow-moot-guard',
    name: 'Guarda do Concílio',
    originalName: 'Moot Guard',
    sourceId: WOW,
    sourcePage: 7,
    rarity: 'uncommon',
    boosts: ['strength', 'constitution'],
    skill: 'intimidation',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Olhar Intimidante', originalName: 'Intimidating Glare' }],
    description:
      'Você guardou assembleias e conciliábulos na floresta. Um olhar intimidante basta para manter a ordem no moot.',
  },
]

if (draftsBatch3.length !== 60) {
  throw new Error(
    `Esperado 60 origens no lote 3, encontrado ${draftsBatch3.length}`,
  )
}
