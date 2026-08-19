import type { BackgroundDraft } from './backgroundFactory'
import {
  SOURCE_BASTION_PG_ID,
  SOURCE_CURTAIN_CALL_PG_ID,
  SOURCE_HELLS_DESTINY_PG_ID,
  SOURCE_MYTH_SPEAKERS_PG_ID,
  SOURCE_RIVAL_ACADEMIES_ID,
  SOURCE_RUNELORDS_PG_ID,
  SOURCE_SEASON_GHOSTS_PG_ID,
  SOURCE_SKY_KINGS_TOMB_PG_ID,
  SOURCE_SPORE_WAR_PG_ID,
  SOURCE_TRIUMPH_TUSK_PG_ID,
} from './sources'

const CC = SOURCE_CURTAIN_CALL_PG_ID
const BB = SOURCE_BASTION_PG_ID
const HD = SOURCE_HELLS_DESTINY_PG_ID
const MS = SOURCE_MYTH_SPEAKERS_PG_ID
const RL = SOURCE_RUNELORDS_PG_ID
const SK = SOURCE_SKY_KINGS_TOMB_PG_ID
const SW = SOURCE_SPORE_WAR_PG_ID
const TT = SOURCE_TRIUMPH_TUSK_PG_ID
const SOG = SOURCE_SEASON_GHOSTS_PG_ID
const RA = SOURCE_RIVAL_ACADEMIES_ID

/**
 * Origens Remaster que faltavam: Player's Guides de APs #201+ e Rival Academies.
 * Sem legado. Descrições compactas em pt-BR.
 */
export const draftsBatch6: BackgroundDraft[] = [
  // ——— Curtain Call PG ———
  {
    id: 'cc-always-chosen-last',
    name: 'Sempre o Último Escolhido',
    originalName: 'Always Chosen Last',
    sourceId: CC,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['intelligence', 'wisdom'],
    skill: 'society',
    lore: { type: 'fixed', id: 'games-lore', name: 'Conhecimento de Jogos' },
    feats: [{ name: 'Conhecimento de Rua', originalName: 'Streetwise' }],
    description:
      'Sempre o último no time, no emprego, no marco social. Aprendeu a observar quem o esquece — e a usar as regras do jogo. Se tiver o traço de persona Azarão, também treinado em Conhecimento de Patrulha.',
  },
  {
    id: 'cc-amateur-director',
    name: 'Diretor Amador',
    originalName: 'Amateur Director',
    sourceId: CC,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['wisdom', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'fixed', id: 'theater-lore', name: 'Conhecimento de Teatro' },
    feats: [{ name: 'Impressão em Grupo', originalName: 'Group Impression' }],
    description:
      'Cresceu no teatro e se sente à vontade organizando os outros — no palco ou fora. Nunca virou profissão, mas a prática ficou. Se tiver o traço Líder, também treinado em Conhecimento de Escrita.',
  },
  {
    id: 'cc-art-tutor',
    name: 'Tutor de Arte',
    originalName: 'Art Tutor',
    sourceId: CC,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'art-lore', name: 'Conhecimento de Arte' },
    feats: [{ name: 'Avaliação do Artesão', originalName: "Crafter's Appraisal" }],
    description:
      'Arte sempre esteve à mão; você ensina história e teoria a quem não teve esse luxo. Se tiver o traço Erudito, também treinado em Conhecimento Acadêmico.',
  },
  {
    id: 'cc-bully-or-baiter',
    name: 'Valentão ou Isca?',
    originalName: 'Bully or Baiter?',
    sourceId: CC,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['strength', 'charisma'],
    skill: 'intimidation',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Olhar Intimidante', originalName: 'Intimidating Glare' }],
    description:
      'Provoca, encurrala e testa limites — às vezes para proteger, às vezes porque gosta do caos. Se tiver o traço Valentão, também treinado em Conhecimento Gladiatorial.',
  },
  {
    id: 'cc-supportive-sponsor',
    name: 'Patrocinador Atencioso',
    originalName: 'Supportive Sponsor',
    sourceId: CC,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['constitution', 'wisdom'],
    skill: 'medicine',
    lore: { type: 'fixed', id: 'herbalism-lore', name: 'Conhecimento de Herbalismo' },
    feats: [{ name: 'Medicina de Combate', originalName: 'Battle Medicine' }],
    description:
      'Cuida de artistas e companheiros com chá, curativos e ouvido. Se tiver o traço Cuidador, também treinado em Conhecimento de Chá.',
  },
  {
    id: 'cc-town-troublemaker',
    name: 'Encrenqueiro da Cidade',
    originalName: 'Town Troublemaker',
    sourceId: CC,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['strength', 'dexterity'],
    skill: 'thievery',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Golpe Sujo', originalName: 'Dirty Trick' }],
    description:
      'Pequenos crimes, grandes histórias. A cidade já espera o próximo golpe. Se tiver o traço Trapaceiro, também treinado em Conhecimento de Guilda.',
  },
  {
    id: 'cc-sideshow-scion',
    name: 'Herdeiro do Sideshow',
    originalName: 'Sideshow Scion',
    sourceId: CC,
    sourcePage: 15,
    rarity: 'rare',
    boosts: ['constitution', 'intelligence'],
    skill: 'acrobatics',
    lore: { type: 'fixed', id: 'games-lore', name: 'Conhecimento de Jogos' },
    feats: [{ name: 'Performer Acrobático', originalName: 'Acrobatic Performer' }],
    description:
      'Circo, barraca e plateia. Você nasceu no espetáculo de beira de palco. Se tiver o traço Artista, também treinado em Conhecimento de Circo.',
  },
  {
    id: 'cc-wandering-libertine',
    name: 'Libertino Errante',
    originalName: 'Wandering Libertine',
    sourceId: CC,
    sourcePage: 15,
    rarity: 'rare',
    boosts: ['dexterity', 'charisma'],
    skill: 'deception',
    lore: { type: 'fixed', id: 'shelyn-lore', name: 'Conhecimento de Shelyn' },
    feats: [{ name: 'Mentiroso Encantador', originalName: 'Charming Liar' }],
    description:
      'Nunca ficou o bastante para ter um lar; deixa admiradores e despedidas. Se tiver o traço Flerte, também treinado em Conhecimento de Navegação.',
  },

  // ——— Bastion of Blasphemies PG ———
  {
    id: 'bb-art-collector',
    name: '“Colecionador” de Arte',
    originalName: 'Art "Collector"',
    sourceId: BB,
    sourcePage: 8,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'thievery',
    lore: { type: 'fixed', id: 'architecture-lore', name: 'Conhecimento de Arquitetura' },
    feats: [
      {
        name: 'Inspiração do dia',
        originalName: 'Daily Art Inspiration',
        featType: 'other',
        actionType: 'passive',
        description:
          'Ao preparar, escolha um objeto de arte que você carrega (vale ≥ 10 × nível po; não gemas/moedas/material cru). 24 h: +2 circunstância contra mental se for a primeira vez com essa peça; +1 se já usou.',
      },
    ],
    description:
      'Arte só vale de perto. Você “coleciona” — saque ou furto — e troca a peça quando a inspiração some. Florin contratou você por livros raros; Bastardhall promete tesouros esquecidos.',
  },
  {
    id: 'bb-blooded-by-the-dead',
    name: 'Marcado pelos Mortos',
    originalName: 'Blooded by the Dead',
    sourceId: BB,
    sourcePage: 9,
    rarity: 'rare',
    boosts: ['strength', 'wisdom'],
    skill: 'religion',
    lore: { type: 'fixed', id: 'vampire-lore', name: 'Conhecimento de Vampiros' },
    feats: [
      {
        name: 'Rotina contra vampiros',
        originalName: 'Bolster against Vampires',
        featType: 'other',
        actionType: 'passive',
        description:
          'Ao preparar, escolha 24 h: Fortalecer o sangue (resistência a sangramento persistente 2 e CD do teste plano –2); Fortalecer a fúria (+2 dano perfurante corpo a corpo contra vampiros ou bebedores de sangue); Fortalecer a mente (nível +2 contra incapacitação mental; +2 circunstância em Vontade contra dominar de vampiro).',
      },
    ],
    description:
      'Um vampiro bebeu do seu sangue e você sobreviveu por sorte ou resgate. Desde então estuda e caça os que bebem vivos — e é amigo de Florin Kindler.',
  },
  {
    id: 'bb-curse-marked',
    name: 'Marcado por Maldição',
    originalName: 'Curse-Marked',
    sourceId: BB,
    sourcePage: 9,
    rarity: 'rare',
    boosts: ['intelligence', 'wisdom'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'library-lore', name: 'Conhecimento de Biblioteca' },
    feats: [
      {
        name: 'Cicatriz de maldição',
        originalName: 'Curse Scar Tissue',
        featType: 'other',
        actionType: 'passive',
        description:
          'Se você não estiver amaldiçoado (exceto maldição de classe, como oráculo): +2 circunstância para contrapor maldições, resistir a elas e desativar perigo que cause maldição. Se estiver amaldiçoado: –2 nesses testes.',
      },
    ],
    description:
      'Já foi amaldiçoado e se livrou; a alma ficou com uma cicatriz. Bibliotecas e a maldição de Bastardhall cruzaram você com Florin.',
  },
  {
    id: 'bb-friend-of-a-friend',
    name: 'Amigo de um Amigo',
    originalName: 'Friend of a Friend',
    sourceId: BB,
    sourcePage: 10,
    rarity: 'rare',
    boosts: ['constitution', 'strength'],
    skill: 'athletics',
    lore: { type: 'custom', prompt: 'comida ou bebida' },
    feats: [
      {
        name: 'Corpo saudável',
        originalName: 'Healthy Regimen',
        featType: 'other',
        actionType: 'passive',
        description:
          '+2 circunstância em testes contra veneno e doença, e para contrapor veneno ou doença.',
      },
    ],
    description:
      'Saúde, cozinha e um prato certo na hora certa. Não conhecia Florin — conhecia os outros do grupo. A ceia do primeiro acampamento fechou o convite.',
  },
  {
    id: 'bb-once-possessed',
    name: 'Já Possuído',
    originalName: 'Once Possessed',
    sourceId: BB,
    sourcePage: 10,
    rarity: 'rare',
    boosts: ['charisma', 'constitution'],
    skill: 'intimidation',
    lore: {
      type: 'fixed',
      id: 'fiend-lore',
      name: 'Conhecimento de Fiendes',
    },
    feats: [
      {
        name: 'Cicatriz espiritual',
        originalName: 'Spiritual Scar',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1/dia',
        trigger: 'Você sofreria dano de espírito de um fiende',
        traits: ['concentrate'],
        description:
          '+2 circunstância em testes contra efeitos mentais de fiendes. Reação 1/dia: resistência a espírito igual ao dobro do nível + CAR contra o dano disparador. Se reduzir a 0, o fiende faz Vontade contra sua CD de classe ou fica lento 1 por 1 rodada.',
      },
    ],
    description:
      'Um fiende já controlou seu corpo. O Conhecimento de Fiendes vale contra qualquer fiende, não só uma família. Florin chamou você como especialista rumo a Bastardhall.',
  },
  {
    id: 'bb-trusted-rival',
    name: 'Rival de Confiança',
    originalName: 'Trusted Rival',
    sourceId: BB,
    sourcePage: 11,
    rarity: 'rare',
    boosts: ['charisma', 'dexterity'],
    skill: 'deception',
    lore: { type: 'fixed', id: 'games-lore', name: 'Conhecimento de Jogos' },
    feats: [
      {
        name: 'Pesquisar Bastardhall',
        originalName: 'Bastardhall Research',
        featType: 'other',
        actionType: 'passive',
        description:
          '+2 circunstância em testes do subsistema Pesquisar sobre Bastardhall. Ao preparar, escolha uma perícia: 24 h, trate-a como perito (mestre no 7º+) só para pesquisar tópicos de Bastardhall.',
      },
    ],
    description:
      'Vida de encrenqueiro por escolha, mas nunca trai o grupo. Rival acadêmico, profissional ou romântico de Florin — e embarcou para descobrir Bastardhall antes dela.',
  },

  // ——— Hell's Destiny PG ———
  {
    id: 'hd-anti-thrune-saboteur',
    name: 'Sabotador Anti-Thrune',
    originalName: 'Anti-Thrune Saboteur',
    sourceId: HD,
    sourcePage: 8,
    rarity: 'uncommon',
    boosts: ['dexterity', 'charisma'],
    skill: { type: 'multi', skills: ['deception', 'thievery'] },
    lore: { type: 'none' },
    feats: [{ name: 'Distração Prolongada', originalName: 'Lengthy Diversion' }],
    description:
      'A guerra é distração: você mina rivais, ajuda secessionistas ou sonha derrubar a Casa Thrune. Enganação e Ladroagem treinadas.',
  },
  {
    id: 'hd-archdevil-apostate',
    name: 'Apóstata do Arquidiabo',
    originalName: 'Archdevil Apostate',
    sourceId: HD,
    sourcePage: 8,
    rarity: 'uncommon',
    boosts: ['charisma', 'intelligence'],
    skill: 'religion',
    lore: { type: 'fixed', id: 'devil-lore', name: 'Conhecimento de Diabos' },
    feats: [{ name: 'Estudante do Cânone', originalName: 'Student of the Canon' }],
    description:
      'Serviu um arquidiabo ou a Igreja de Asmodeus e quebrou o pacto. Ainda conhece o inferno — agora do outro lado.',
  },
  {
    id: 'hd-defiant-noble',
    name: 'Nobre Desafiante',
    originalName: 'Defiant Noble',
    sourceId: HD,
    sourcePage: 8,
    rarity: 'uncommon',
    boosts: ['strength', 'charisma'],
    skill: 'society',
    lore: {
      type: 'choice',
      options: [
        { id: 'chelix-lore', name: 'Conhecimento de Cheliax' },
        { id: 'legal-lore', name: 'Conhecimento Legal' },
      ],
    },
    feats: [{ name: 'Etiqueta Cortês', originalName: 'Courtly Graces' }],
    description:
      'Cresceu na alta roda chelaxiana, louva Thrune em público e trama reforma (ou rebelião) em silêncio. A família vai denunciá-lo — e talvez torcer em segredo.',
  },
  {
    id: 'hd-embargo-survivor',
    name: 'Sobrevivente do Embargo',
    originalName: 'Embargo Survivor',
    sourceId: HD,
    sourcePage: 8,
    rarity: 'uncommon',
    boosts: ['constitution', 'wisdom'],
    skill: 'survival',
    lore: {
      type: 'choice',
      options: [
        { id: 'sailing-lore', name: 'Conhecimento de Navegação' },
        { id: 'warfare-lore', name: 'Conhecimento de Guerra' },
      ],
    },
    feats: [
      {
        name: 'Desafio obstinado',
        originalName: 'Scrappy Defiance',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1/dia',
        trigger: 'Seu turno começa e você comanda uma tropa',
        traits: ['mental'],
        description:
          'A tropa ganha PV temporários iguais ao dobro do seu nível (1 minuto). Se o tamanho dela seria reduzido por dano, teste plano CD 16; sucesso: o tamanho não cai nesse limiar até o fim do seu próximo turno.',
      },
    ],
    description:
      'O Arco de Aroden fechou Corentyn. Você aprendeu lei marcial, ração curta e a puxar civis desesperados.',
  },
  {
    id: 'hd-hell-hunted',
    name: 'Caçado pelo Inferno',
    originalName: 'Hell-Hunted',
    sourceId: HD,
    sourcePage: 9,
    rarity: 'uncommon',
    boosts: ['dexterity', 'constitution'],
    skill: 'stealth',
    lore: {
      type: 'choice',
      options: [
        { id: 'devil-lore', name: 'Conhecimento de Diabos' },
        { id: 'hellknight-lore', name: 'Conhecimento de Cavaleiros Infernais' },
      ],
    },
    feats: [{ name: 'Espreitador de Terreno', originalName: 'Terrain Stalker' }],
    description:
      'Diabos ou Cavaleiros Infernais querem sua cabeça. Você some, espera e volta quando o rastro esfria.',
  },
  {
    id: 'hd-scholar-of-battlefields',
    name: 'Erudito de Campos de Batalha',
    originalName: 'Scholar of Battlefields',
    sourceId: HD,
    sourcePage: 9,
    rarity: 'uncommon',
    boosts: ['strength', 'intelligence'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [
      {
        name: 'Assalto implacável',
        originalName: 'Relentless Assault',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1/dia',
        trigger:
          'Uma criatura teria sucesso ou sucesso crítico na salvaguarda contra a habilidade ofensiva de uma tropa que você comanda',
        traits: ['fortune'],
        description:
          'A criatura rerrola a salvaguarda e usa o pior resultado.',
      },
    ],
    description:
      'Estuda guerra no chão, não só em mapas. Cada combate é um texto a decifrar.',
  },

  // ——— Myth-Speakers PG ———
  {
    id: 'ms-beast-seeker',
    name: 'Caçador de Feras',
    originalName: 'Beast Seeker',
    sourceId: MS,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['strength', 'dexterity'],
    skill: { type: 'multi', skills: ['athletics', 'thievery'] },
    lore: {
      type: 'fixed',
      id: 'legendary-beast-lore',
      name: 'Conhecimento de Feras Lendárias',
    },
    feats: [
      { name: 'Lutador de Titãs', originalName: 'Titan Wrestler' },
      { name: 'Golpe Sujo', originalName: 'Dirty Trick' },
    ],
    description:
      'Rastros, armadilhas e o próximo monstro do mito. Iblydos ainda tem feras dignas de canção.',
  },
  {
    id: 'ms-child-of-the-polis',
    name: 'Filho da Pólis',
    originalName: 'Child of the Polis',
    sourceId: MS,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['constitution', 'wisdom'],
    skill: { type: 'multi', skills: ['diplomacy', 'society'] },
    lore: {
      type: 'custom',
      prompt: 'cidade-estado iblydana (Pol-Bailax ou Pol-Dhuraxilis, de preferência)',
    },
    feats: [
      { name: 'Caçador de Pechinchas', originalName: 'Bargain Hunter' },
      { name: 'Conhecimento de Rua', originalName: 'Streetwise' },
    ],
    description:
      'Praça, assembleia e fofoca da cidade-estado. Você conhece os atalhos civis tanto quanto os de rua.',
  },
  {
    id: 'ms-glory-hound',
    name: 'Cão da Glória',
    originalName: 'Glory Hound',
    sourceId: MS,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['strength', 'charisma'],
    skill: { type: 'multi', skills: ['intimidation', 'performance'] },
    lore: { type: 'fixed', id: 'games-lore', name: 'Conhecimento de Jogos' },
    feats: [
      { name: 'Olhar Intimidante', originalName: 'Intimidating Glare' },
      { name: 'Performance Impressionante', originalName: 'Impressive Performance' },
    ],
    description:
      'A plateia importa tanto quanto o golpe. Você quer o mito — e o aplauso.',
  },
  {
    id: 'ms-kartaji-epicurean',
    name: 'Epicurista Kartaji',
    originalName: 'Kartaji Epicurean',
    sourceId: MS,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['constitution', 'intelligence'],
    skill: { type: 'multi', skills: ['crafting', 'society'] },
    lore: { type: 'fixed', id: 'cooking-lore', name: 'Conhecimento de Culinária' },
    feats: [{ name: 'Conhecimento Adicional', originalName: 'Additional Lore' }],
    description:
      'Sabores de Kartaji, política à mesa e um paladar que vira diplomacia. O Conhecimento Adicional costuma ser de especiarias, vinho ou uma cidade portuária.',
  },
  {
    id: 'ms-obari-wanderer',
    name: 'Errante de Obari',
    originalName: 'Obari Wanderer',
    sourceId: MS,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['dexterity', 'wisdom'],
    skill: { type: 'multi', skills: ['acrobatics', 'survival'] },
    lore: { type: 'fixed', id: 'sailing-lore', name: 'Conhecimento de Navegação' },
    feats: [
      { name: 'Queda Felina', originalName: 'Cat Fall' },
      { name: 'Perícia no Terreno', originalName: 'Terrain Expertise' },
    ],
    description:
      'Convés, costa e o Mar de Obari. Pé firme no tombadilho e no penhasco.',
  },
  {
    id: 'ms-student-of-apotheosis',
    name: 'Estudante da Apoteose',
    originalName: 'Student of Apotheosis',
    sourceId: MS,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['intelligence', 'charisma'],
    skill: { type: 'choice', options: ['occultism', 'religion'] },
    lore: { type: 'fixed', id: 'hero-god-lore', name: 'Conhecimento de Herói-Deuses' },
    feats: [
      {
        name: 'Minha lenda precisa ser contada',
        originalName: 'My Legend Must Be Told',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1/dia',
        trigger: 'Seu valor de morrendo chegaria ao suficiente para matá-lo (em geral 4)',
        description:
          'Você estabiliza e aumenta condenado em 1. Ao ganhar um chamado mítico, troque por Eco Mítico (1/sessão): quando falharia ou falharia criticamente num ataque, teste ou salvaguarda com proficiência mítica, recupera 1 Ponto Mítico.',
      },
    ],
    description:
      'Lendas de herói-deuses não são só escola — são destino. Talvez o mito esteja falando de você.',
  },

  // ——— Revenge of the Runelords PG ———
  {
    id: 'rl-distant-traveler',
    name: 'Viajante Distante',
    originalName: 'Distant Traveler',
    sourceId: RL,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['constitution', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'fixed', id: 'mercantile-lore', name: 'Conhecimento Mercantil' },
    feats: [
      {
        name: 'Fôlego da estrada',
        originalName: 'Travel Invigoration',
        featType: 'other',
        actionType: 'passive',
        description:
          'Ao preparar depois de um dia em exploração viajando, ou após magia que o levou ≥ 150 km (ou a outro plano): +1 status em Vontade por 8 horas.',
      },
    ],
    description:
      'Veio de longe (Iblydos, Tian Xia…) com jeito novo para os problemas das Terras da Saga. Sorshen quer falar de comércio com sua terra natal.',
  },
  {
    id: 'rl-escaped-from-time',
    name: 'Fugido do Tempo',
    originalName: 'Escaped from Time',
    sourceId: RL,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'architecture-lore', name: 'Conhecimento de Arquitetura' },
    feats: [
      {
        name: 'Vislumbres de linhas do tempo',
        originalName: 'Timeline Flashes',
        featType: 'other',
        actionType: 'passive',
        description:
          'Pode rolar Ocultismo na iniciativa; quando o faz, +2 circunstância no teste.',
      },
    ],
    description:
      'Ficou preso no tempo (magia de runelord ou pior) e saiu. Quando se assusta, vislumbra linhas do tempo rivais — e usa isso nos reflexos.',
  },
  {
    id: 'rl-heroic-ancestry',
    name: 'Ancestralidade Heroica',
    originalName: 'Heroic Ancestry',
    sourceId: RL,
    sourcePage: 15,
    rarity: 'rare',
    boosts: ['strength', 'charisma'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'library-lore', name: 'Conhecimento de Biblioteca' },
    feats: [
      {
        name: 'Terreno comum',
        originalName: 'Common Ground',
        featType: 'other',
        actionType: 'passive',
        description:
          'Em encontro de Influência para Descobrir ou Influenciar, ou ao Causar impressão num PNJ, reduz a CD desses testes em 2.',
      },
    ],
    description:
      'Músculo e estudo nunca foram opostos para você. Encontrar um assunto em comum deixou rivais com inveja — e impressões mais fáceis.',
  },
  {
    id: 'rl-local-savior',
    name: 'Salvador Local',
    originalName: 'Local Savior',
    sourceId: RL,
    sourcePage: 15,
    rarity: 'rare',
    boosts: ['strength', 'wisdom'],
    skill: 'religion',
    lore: { type: 'fixed', id: 'art-lore', name: 'Conhecimento de Arte' },
    feats: [
      {
        name: 'Truque inato da vila',
        originalName: 'Hometown Divine Cantrip',
        featType: 'other',
        actionType: 'passive',
        description:
          'Uma divindade da sua vila concede um truque divino inato à vontade (posto = metade do nível, para cima). Combine a vila com o mestre. Exemplos: Ilsurian — escudo ou estabilizar; Osprey Cove — recado ou ler aura; Enseada de Roderic — protejo proibitivo ou orientação. Outras vilas (Sandpoint etc.) seguem o tema local.',
      },
    ],
    description:
      'Uma vila pequena ainda conta o dia em que você chegou. Religião e arte locais moldaram o mito — e o convite de Sorshen.',
  },
  {
    id: 'rl-runelord-researcher',
    name: 'Pesquisador de Runelords',
    originalName: 'Runelord Researcher',
    sourceId: RL,
    sourcePage: 16,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'arcana',
    lore: { type: 'fixed', id: 'academia-lore', name: 'Conhecimento Acadêmico' },
    feats: [
      {
        name: 'Foco thassiloniano',
        originalName: 'Thassilonian Focus',
        featType: 'other',
        actionType: 'passive',
        description:
          '+2 circunstância para Recordar Conhecimento sobre runelords ou Thassilon antigo; reconhece automaticamente nome e época de qualquer runelord (ou retrato fiel). Ao preparar, escolha uma escola por 8 h (+1 status nas salvaguardas listadas): Inveja — incapacitação (+2 se o inimigo for de nível maior); Gula — morte e vazio; Ganância — polimorfo, enfraquecido, desajeitado, petrificado; Luxúria — emoção; Orgulho — ilusão; Preguiça — paralisia, lento, atordoado, penalidade de deslocamento; Ira — um entre ácido, frio, eletricidade, fogo ou sônico.',
      },
    ],
    description:
      'Teses, ruínas e os sete pecados. Sorshen notou o trabalho.',
  },
  {
    id: 'rl-runelord-survivor',
    name: 'Sobrevivente de Runelord',
    originalName: 'Runelord Survivor',
    sourceId: RL,
    sourcePage: 16,
    rarity: 'rare',
    boosts: ['constitution', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [
      {
        name: 'Caçar runelord',
        originalName: 'Hunt Runelord',
        featType: 'other',
        actionType: 'one',
        frequency: '1/dia',
        traits: ['concentrate'],
        description:
          'Escolha uma escola thassiloniana (inveja, gula, ganância, luxúria, orgulho, preguiça ou ira). Até a próxima preparação: +2 circunstância em Percepção para Procurar e em Intimidação para Desmoralizar criaturas que sirvam esses ideais; Golpes causam +1d4 precisão contra elas se estiverem assustadas.',
      },
    ],
    description:
      'Karzoug, Krune ou Alaznist quase o apagou. Reconstruiu a vida no ermo e na arte da guerra. O convite de Sorshen pede emenda — ou vingança.',
  },

  // ——— Sky King's Tomb PG ———
  {
    id: 'sk-child-of-notoriety',
    name: 'Filho da Notoriedade',
    originalName: 'Child of Notoriety',
    sourceId: SK,
    sourcePage: 12,
    rarity: 'common',
    boosts: ['constitution', 'charisma'],
    skill: { type: 'choice', options: ['diplomacy', 'intimidation'] },
    lore: {
      type: 'choice',
      options: [
        { id: 'genealogy-lore', name: 'Conhecimento de Genealogia' },
        { id: 'underworld-lore', name: 'Conhecimento do Submundo' },
      ],
    },
    feats: [
      {
        name: 'Impressão em Grupo',
        originalName: 'Group Impression',
        requiresSkillId: 'diplomacy',
      },
      {
        name: 'Olhar Intimidante',
        originalName: 'Intimidating Glare',
        requiresSkillId: 'intimidation',
      },
    ],
    description:
      'Um ancestral cometeu atrocidade; a sombra ficou. Bondade: Diplomacia, Genealogia, Impressão em Grupo. Notoriedade: Intimidação, Submundo, Olhar Intimidante. Conexão: Valahask. Reputação –1.',
  },
  {
    id: 'sk-clan-associate',
    name: 'Associado do Clã',
    originalName: 'Clan Associate',
    sourceId: SK,
    sourcePage: 12,
    rarity: 'common',
    boosts: ['constitution', 'wisdom'],
    skill: 'society',
    lore: { type: 'fixed', id: 'highhelm-lore', name: 'Conhecimento de Highhelm' },
    feats: [{ name: 'Poliglota', originalName: 'Multilingual' }],
    description:
      'Nascido, contratado ou casado no Clã Tolorr. Trivialidades históricas e respeito em Highhelm — suas ações pesam no clã. Reputação +2.',
  },
  {
    id: 'sk-conservator',
    name: 'Conservador',
    originalName: 'Conservator',
    sourceId: SK,
    sourcePage: 12,
    rarity: 'common',
    boosts: ['dexterity', 'intelligence'],
    skill: { type: 'choice', options: ['crafting', 'thievery'] },
    lore: {
      type: 'choice',
      options: [
        { id: 'accounting-lore', name: 'Conhecimento de Contabilidade' },
        { id: 'underworld-lore', name: 'Conhecimento do Submundo' },
      ],
    },
    feats: [
      {
        name: 'Reparo Rápido',
        originalName: 'Quick Repair',
        requiresSkillId: 'crafting',
      },
      {
        name: 'Garantia (Ladroagem)',
        originalName: 'Assurance (Thievery)',
        requiresSkillId: 'thievery',
      },
    ],
    description:
      'Identifica, preserva e reconstrói relíquias. Ofício → Reparo Rápido; Ladroagem → Garantia (Ladroagem). Conexão: Ria. Reputação +1.',
  },
  {
    id: 'sk-dedicated-delver',
    name: 'Explorador Dedicado',
    originalName: 'Dedicated Delver',
    sourceId: SK,
    sourcePage: 12,
    rarity: 'common',
    boosts: ['strength', 'dexterity'],
    skill: { type: 'choice', options: ['athletics', 'survival'] },
    lore: { type: 'fixed', id: 'cave-lore', name: 'Conhecimento de Cavernas' },
    feats: [
      {
        name: 'Escalador de Combate',
        originalName: 'Combat Climber',
        requiresSkillId: 'athletics',
      },
      {
        name: 'Perícia no Terreno (subterrâneo)',
        originalName: 'Terrain Expertise (Underground)',
        requiresSkillId: 'survival',
      },
    ],
    description:
      'As Terras Sombrias não o assustam. Candidato ao programa de Arghan Tolorr. Conexão: Ria. Reputação 0.',
  },
  {
    id: 'sk-eclectic-scholar',
    name: 'Erudito Eclético',
    originalName: 'Eclectic Scholar',
    sourceId: SK,
    sourcePage: 13,
    rarity: 'common',
    boosts: ['intelligence', 'wisdom'],
    skill: 'occultism',
    lore: {
      type: 'fixed',
      id: 'dwarven-pantheon-lore',
      name: 'Conhecimento do Panteão Anão',
    },
    feats: [{ name: 'Identificação Rápida', originalName: 'Quick Identification' }],
    description:
      'Trivia esotérica e eventos sobrenaturais do passado. Rosha Coppervein abriu as portas de Tolorr. O Conhecimento cobre a fé de Torag e da família divina. Reputação 0.',
  },
  {
    id: 'sk-historical-reenactor',
    name: 'Reencenador Histórico',
    originalName: 'Historical Reeanactor',
    sourceId: SK,
    sourcePage: 13,
    rarity: 'common',
    boosts: ['strength', 'charisma'],
    skill: { type: 'choice', options: ['performance', 'society'] },
    lore: { type: 'fixed', id: 'dwarf-lore', name: 'Conhecimento Anão' },
    feats: [
      {
        name: 'Performance Impressionante',
        originalName: 'Impressive Performance',
        requiresSkillId: 'performance',
      },
      {
        name: 'Conhecimento Duvidoso',
        originalName: 'Dubious Knowledge',
        requiresSkillId: 'society',
      },
    ],
    description:
      'História viva: armadura de época, palco e alguns buracos preenchidos para o espetáculo. Tolorr patrocinou a visita. Conexão: Bulgra Veldollow. Reputação 0.',
  },

  // ——— Spore War PG ———
  {
    id: 'sw-blight-survivor',
    name: 'Sobrevivente da Praga',
    originalName: 'Blight Survivor',
    sourceId: SW,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['constitution', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'fungus-lore', name: 'Conhecimento de Fungos' },
    feats: [{ name: 'Medicina Natural', originalName: 'Natural Medicine' }],
    description:
      'A praga de Tanglebriar passou por você. Fungos, cicatrizes e o cheiro da floresta doente ainda guiam seus passos.',
  },
  {
    id: 'sw-demon-hunted',
    name: 'Caçado por Demônios',
    originalName: 'Demon Hunted',
    sourceId: SW,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['strength', 'charisma'],
    skill: 'intimidation',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Olhar Intimidante', originalName: 'Intimidating Glare' }],
    description:
      'Demônios já vieram atrás de você. Agora o olhar avisa: desta vez a caça muda de lado.',
  },
  {
    id: 'sw-fiendbreaking-pilgrim',
    name: 'Peregrino Quebra-fiendes',
    originalName: 'Fiendbreaking Pilgrim',
    sourceId: SW,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['strength', 'wisdom'],
    skill: 'religion',
    lore: { type: 'fixed', id: 'treerazer-lore', name: 'Conhecimento de Treerazer' },
    feats: [{ name: 'Identificação Rápida', originalName: 'Quick Identification' }],
    description:
      'Santuários, juramentos e o estudo de Treerazer. A peregrinação aponta para Kyonin.',
  },
  {
    id: 'sw-portal-scholar',
    name: 'Erudito de Portais',
    originalName: 'Portal Scholar',
    sourceId: SW,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'arcana',
    lore: { type: 'fixed', id: 'architecture-lore', name: 'Conhecimento de Arquitetura' },
    feats: [{ name: 'Sentido Arcano', originalName: 'Arcane Sense' }],
    description:
      'Portais, pedra rúnica e o desenho de um arco que não deveria existir. Arquitetura e arcana andam juntas.',
  },
  {
    id: 'sw-story-collector',
    name: 'Coletor de Histórias',
    originalName: 'Story Collector',
    sourceId: SW,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['intelligence', 'charisma'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'demon-lore', name: 'Conhecimento de Demônios' },
    feats: [{ name: 'Enganar Item Mágico', originalName: 'Trick Magic Item' }],
    description:
      'Contos de demônios, relíquias e o próximo capítulo. Você guarda o que os outros têm medo de repetir.',
  },
  {
    id: 'sw-student-of-archery',
    name: 'Estudante de Arco',
    originalName: 'Student of Archery',
    sourceId: SW,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['dexterity', 'constitution'],
    skill: 'stealth',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Espreitador de Terreno', originalName: 'Terrain Stalker' }],
    description:
      'A escola élfica de arco ensinou silêncio, distância e quando não soltar a flecha.',
  },

  // ——— Triumph of the Tusk PG ———
  {
    id: 'tt-badlands-scout',
    name: 'Batedor dos Ermos',
    originalName: 'Badlands Scout',
    sourceId: TT,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['constitution', 'wisdom'],
    skill: 'survival',
    lore: { type: 'fixed', id: 'badlands-lore', name: 'Conhecimento de Ermos' },
    feats: [{ name: 'Coletor', originalName: 'Forager' }],
    description:
      'Belkzen seco, pedra e o próximo poço. Você lê o ermo melhor que qualquer mapa.',
  },
  {
    id: 'tt-belkzen-anthropologist',
    name: 'Antropólogo de Belkzen',
    originalName: 'Belkzen Anthropologist',
    sourceId: TT,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'society',
    lore: {
      type: 'fixed',
      id: 'orc-pantheon-lore',
      name: 'Conhecimento do Panteão Orc',
    },
    description:
      'Estuda clãs, ritos e deuses orcs (atuais e passados) sem reduzir Belkzen a um campo de batalha. O Conhecimento do Panteão Orc é amplo.',
  },
  {
    id: 'tt-empty-hand-loyalist',
    name: 'Leal da Mão Vazia',
    originalName: 'Empty Hand Loyalist',
    sourceId: TT,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['strength', 'charisma'],
    skill: 'intimidation',
    lore: { type: 'fixed', id: 'belkzen-lore', name: 'Conhecimento de Belkzen' },
    feats: [{ name: 'Coerção Rápida', originalName: 'Quick Coercion' }],
    description:
      'A Mão Vazia é o futuro que você escolheu. Lealdade, voz alta e o mapa político de Belkzen.',
  },
  {
    id: 'tt-foreign-diplomat',
    name: 'Diplomata Estrangeiro',
    originalName: 'Foreign Diplomat',
    sourceId: TT,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['constitution', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'fixed', id: 'heraldry-lore', name: 'Conhecimento de Heráldica' },
    feats: [{ name: 'Impressão em Grupo', originalName: 'Group Impression' }],
    description:
      'Enviado de fora para falar com clãs. Brasões, protocolos e a paciência de quem não é orc.',
  },
  {
    id: 'tt-self-made',
    name: 'Feito por Si',
    originalName: 'Self-Made',
    sourceId: TT,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['strength', 'wisdom'],
    skill: 'athletics',
    lore: { type: 'custom', prompt: 'como você abriu o próprio caminho no mundo' },
    feats: [{ name: 'Carregador Robusto', originalName: 'Hefty Hauler' }],
    description:
      'Ninguém lhe deu o lugar. Você carregou o peso — literalmente — até caber na história.',
  },
  {
    id: 'tt-trade-representative',
    name: 'Representante Comercial',
    originalName: 'Trade Representative',
    sourceId: TT,
    sourcePage: 14,
    rarity: 'rare',
    boosts: ['dexterity', 'intelligence'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'mercantile-lore', name: 'Conhecimento Mercantil' },
    feats: [{ name: 'Reparo Rápido', originalName: 'Quick Repair' }],
    description:
      'Caravanas, contratos e a oficina no meio do trato. Belkzen compra e vende — você faz os dois.',
  },

  // ——— Season of Ghosts PG (3 que faltavam) ———
  {
    id: 'sog-outskirt-dweller',
    name: 'Morador da Periferia',
    originalName: 'Outskirt Dweller',
    sourceId: SOG,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['dexterity', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'hunting-lore', name: 'Conhecimento de Caça' },
    feats: [{ name: 'Perícia no Terreno', originalName: 'Terrain Expertise' }],
    description:
      'Longe do centro de Willowshore, perto da mata. Caça, trilha e o que a cidade prefere não ver.',
  },
  {
    id: 'sog-southbank-traditionalist',
    name: 'Tradicionalista de Southbank',
    originalName: 'Southbank Traditionalist',
    sourceId: SOG,
    sourcePage: 12,
    rarity: 'rare',
    boosts: ['constitution', 'charisma'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'farming-lore', name: 'Conhecimento de Agricultura' },
    feats: [{ name: 'Rede de Contatos', originalName: 'Hobnobber' }],
    description:
      'A margem sul preza o jeito antigo: colheita, oficina e conhecer todo mundo pelo nome.',
  },
  {
    id: 'sog-willowshore-urchin',
    name: 'Moleque de Willowshore',
    originalName: 'Willowshore Urchin',
    sourceId: SOG,
    sourcePage: 13,
    rarity: 'rare',
    boosts: ['strength', 'dexterity'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'engineering-lore', name: 'Conhecimento de Engenharia' },
    feats: [{ name: 'Mentiroso Encantador', originalName: 'Charming Liar' }],
    description:
      'Telhados, canais e a desculpa certa. Willowshore foi o playground — e o professor.',
  },

  // ——— Rival Academies ———
  {
    id: 'ra-academic-scion',
    name: 'Rebento Acadêmico',
    originalName: 'Academic Scion',
    sourceId: RA,
    sourcePage: 14,
    rarity: 'common',
    boosts: ['charisma', 'intelligence'],
    skill: 'arcana',
    lore: {
      type: 'custom',
      prompt: 'Academia ou a escola a que você pertence',
    },
    feats: [{ name: 'Sentido Arcano', originalName: 'Arcane Sense' }],
    description:
      'Nome, nota e a expectativa da escola. Arcana é o idioma da casa.',
  },
  {
    id: 'ra-convocation-scout',
    name: 'Batedor da Convocação',
    originalName: 'Convocation Scout',
    sourceId: RA,
    sourcePage: 14,
    rarity: 'common',
    boosts: ['wisdom', 'charisma'],
    skill: 'diplomacy',
    lore: {
      type: 'custom',
      prompt: 'Política ou a escola a que você pertence',
    },
    feats: [{ name: 'Impressão em Grupo', originalName: 'Group Impression' }],
    description:
      'Olhos na Convocação: quem fala com quem, e o que a escola precisa ouvir.',
  },
  {
    id: 'ra-ghostwriter',
    name: 'Ghostwriter',
    originalName: 'Ghostwriter',
    sourceId: RA,
    sourcePage: 15,
    rarity: 'common',
    boosts: ['dexterity', 'intelligence'],
    skill: 'society',
    lore: {
      type: 'custom',
      prompt: 'Escrita ou a escola a que você pertence',
    },
    feats: [
      { name: 'Profissional Experiente', originalName: 'Experienced Professional' },
    ],
    description:
      'A tese sai com outro nome. Você escreve, revisa e some antes dos créditos.',
  },
  {
    id: 'ra-library-dweller',
    name: 'Morador da Biblioteca',
    originalName: 'Library Dweller',
    sourceId: RA,
    sourcePage: 15,
    rarity: 'common',
    boosts: ['constitution', 'intelligence'],
    skill: 'occultism',
    lore: {
      type: 'custom',
      prompt: 'Biblioteca ou a escola a que você pertence',
    },
    feats: [{ name: 'Conhecimento Adicional', originalName: 'Additional Lore' }],
    description:
      'Mais tempo entre prateleiras do que em aula. Ocultismo e um segundo saber à escolha.',
  },
  {
    id: 'ra-party-scholar',
    name: 'Erudito da Festa',
    originalName: 'Party Scholar',
    sourceId: RA,
    sourcePage: 16,
    rarity: 'common',
    boosts: ['constitution', 'charisma'],
    skill: 'deception',
    lore: {
      type: 'custom',
      prompt: 'Álcool ou a escola a que você pertence',
    },
    feats: [{ name: 'Mentiroso Encantador', originalName: 'Charming Liar' }],
    description:
      'A verdadeira rede acadêmica é o salão. Um gole, um segredo, uma nota que “aparece”.',
  },
  {
    id: 'ra-respected-mentor',
    name: 'Mentor Respeitado',
    originalName: 'Respected Mentor',
    sourceId: RA,
    sourcePage: 16,
    rarity: 'common',
    boosts: ['wisdom', 'charisma'],
    skill: 'performance',
    lore: {
      type: 'custom',
      prompt: 'Academia ou a escola a que você pertence',
    },
    feats: [
      { name: 'Performance Fascinante', originalName: 'Fascinating Performance' },
    ],
    description:
      'Alunos ouvem quando você fala. A aula é palco — e a plateia aprende.',
  },
  {
    id: 'ra-school-medic',
    name: 'Médico da Escola',
    originalName: 'School Medic',
    sourceId: RA,
    sourcePage: 17,
    rarity: 'common',
    boosts: ['dexterity', 'wisdom'],
    skill: 'medicine',
    lore: {
      type: 'custom',
      prompt: 'Academia ou a escola a que você pertence',
    },
    feats: [{ name: 'Medicina de Combate', originalName: 'Battle Medicine' }],
    description:
      'Infirmary, duelo treinado e o aluno que “só queria testar a magia”. Você costura os dois.',
  },
  {
    id: 'ra-star-athlete',
    name: 'Atleta Estrela',
    originalName: 'Star Athlete',
    sourceId: RA,
    sourcePage: 17,
    rarity: 'common',
    boosts: ['strength', 'dexterity'],
    skill: 'athletics',
    lore: {
      type: 'custom',
      prompt: 'Jogos ou a escola a que você pertence',
    },
    feats: [
      {
        name: 'Garantia (Atletismo)',
        originalName: 'Assurance (Athletics)',
        featType: 'skill',
      },
    ],
    description:
      'A escola coloca o nome no cartaz. Campo, pista e a certeza de um 10 no Atletismo.',
  },
  {
    id: 'ra-working-student',
    name: 'Estudante que Trabalha',
    originalName: 'Working Student',
    sourceId: RA,
    sourcePage: 17,
    rarity: 'common',
    boosts: ['strength', 'intelligence'],
    skill: 'society',
    lore: {
      type: 'custom',
      prompt: 'Trabalho ou a escola a que você pertence',
    },
    feats: [{ name: 'Conhecimento de Rua', originalName: 'Streetwise' }],
    description:
      'A mensalidade sai do turno da noite. Sociedade, rua e o atalho entre o campus e o emprego.',
  },
]
