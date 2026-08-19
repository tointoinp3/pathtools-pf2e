import type { Background } from '@/types'
import {
  makeBackground,
  makeTripleFreeBoostBackground,
  type BackgroundDraft,
} from './backgroundFactory'
import {
  FERAL_CHILD_SENSES,
  GUIDANCE_INNATE,
  WARDING_SIGN,
} from './backgroundAbilityTexts'
import { draftsBatch2 } from './backgroundsBatch2'
import { draftsBatch3 } from './backgroundsBatch3'
import { draftsBatch4 } from './backgroundsBatch4'
import { draftsBatch5 } from './backgroundsBatch5'
import { draftsBatch6 } from './backgroundsBatch6'
import { SOURCE_PLAYER_CORE_2_ID, SOURCE_PLAYER_CORE_ID } from './sources'

const PC = SOURCE_PLAYER_CORE_ID
const PC2 = SOURCE_PLAYER_CORE_2_ID

/**
 * Lote 1: 60 origens (40 Player Core + 20 Player Core 2).
 * Mecânicas conforme Archives of Nethys; descrições parafraseadas em PT-BR.
 */
const draftsBatch1: BackgroundDraft[] = [
  // ——— Player Core (40) ———
  {
    id: 'pc-acolyte',
    name: 'Acólito',
    originalName: 'Acolyte',
    sourceId: PC,
    sourcePage: 84,
    boosts: ['intelligence', 'wisdom'],
    skill: 'religion',
    lore: { type: 'fixed', id: 'scribing-lore', name: 'Conhecimento de Escrita' },
    feats: [{ name: 'Estudante do Cânone', originalName: 'Student of the Canon' }],
    description:
      'Você dedicou parte da vida a um templo, santuário ou tradição religiosa. Aprendeu rituais, textos sagrados e a linguagem da fé.',
  },
  {
    id: 'pc-acrobat',
    name: 'Acrobata',
    originalName: 'Acrobat',
    sourceId: PC,
    sourcePage: 84,
    boosts: ['strength', 'dexterity'],
    skill: 'acrobatics',
    lore: { type: 'fixed', id: 'circus-lore', name: 'Conhecimento de Circo' },
    feats: [{ name: 'Equilíbrio Firme', originalName: 'Steady Balance' }],
    description:
      'Você ganhava a vida como acrobata em circos ou nas ruas. Agora aplica agilidade e equilíbrio quando o espetáculo já não basta.',
  },
  {
    id: 'pc-animal-whisperer',
    name: 'Encantador de Animais',
    originalName: 'Animal Whisperer',
    sourceId: PC,
    sourcePage: 84,
    boosts: ['wisdom', 'charisma'],
    skill: 'nature',
    lore: { type: 'custom', prompt: 'terreno habitado por animais de que você gosta' },
    feats: [{ name: 'Treinar Animal', originalName: 'Train Animal' }],
    description:
      'Você sempre se conectou aos animais e aprendeu a treiná-los. Em suas viagens, continua encontrando e conquistando criaturas pelo caminho.',
  },
  {
    id: 'pc-artisan',
    name: 'Artesão',
    originalName: 'Artisan',
    sourceId: PC,
    sourcePage: 84,
    boosts: ['strength', 'intelligence'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'guild-lore', name: 'Conhecimento de Guilda' },
    feats: [{ name: 'Ofício Especializado', originalName: 'Specialty Crafting' }],
    description:
      'Você aprendeu um ofício com mestres, guildas ou pela prática diária. Suas mãos transformam materiais brutos em obras úteis.',
  },
  {
    id: 'pc-artist',
    name: 'Artista',
    originalName: 'Artist',
    sourceId: PC,
    sourcePage: 84,
    boosts: ['dexterity', 'charisma'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'art-lore', name: 'Conhecimento de Arte' },
    feats: [{ name: 'Ofício Especializado', originalName: 'Specialty Crafting' }],
    description:
      'Sua arte é a grande paixão, seja qual for a forma. Aventurar-se pode trazer inspiração — ou apenas sustento até a fama chegar.',
  },
  {
    id: 'pc-bandit',
    name: 'Bandido',
    originalName: 'Bandit',
    sourceId: PC,
    sourcePage: 84,
    boosts: ['dexterity', 'charisma'],
    skill: 'intimidation',
    lore: { type: 'custom', prompt: 'terreno onde você atuava' },
    feats: [{ name: 'Coerção em Grupo', originalName: 'Group Coercion' }],
    description:
      'Você viveu de assaltos em estradas e acampamentos. Anos de emboscadas e sobrevivência no campo agora alimentam a vida aventureira.',
  },
  {
    id: 'pc-barkeep',
    name: 'Taberneiro',
    originalName: 'Barkeep',
    sourceId: PC,
    sourcePage: 84,
    boosts: ['constitution', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'fixed', id: 'alcohol-lore', name: 'Conhecimento de Álcool' },
    feats: [{ name: 'Rede de Contatos', originalName: 'Hobnobber' }],
    description:
      'Você trabalhou em um bar, carregando barris, polindo canecas e socializando com a clientela. Sabe beber, ouvir e abrir conversa.',
  },
  {
    id: 'pc-barrister',
    name: 'Advogado',
    originalName: 'Barrister',
    sourceId: PC,
    sourcePage: 85,
    boosts: ['intelligence', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'fixed', id: 'legal-lore', name: 'Conhecimento Jurídico' },
    feats: [{ name: 'Impressão em Grupo', originalName: 'Group Impression' }],
    description:
      'Manuais, mentores e o tribunal ensinaram-lhe o direito. Você acompanha leis locais e sabe montar acusação ou defesa.',
  },
  {
    id: 'pc-bounty-hunter',
    name: 'Caçador de Recompensas',
    originalName: 'Bounty Hunter',
    sourceId: PC,
    sourcePage: 85,
    boosts: ['strength', 'wisdom'],
    skill: 'survival',
    lore: { type: 'fixed', id: 'legal-lore', name: 'Conhecimento Jurídico' },
    feats: [{ name: 'Rastreador Experiente', originalName: 'Experienced Tracker' }],
    description:
      'Você ganhava caçando foragidos — por justiça ou por dinheiro. As técnicas de perseguição se transferem bem para a aventura.',
  },
  {
    id: 'pc-charlatan',
    name: 'Charlatão',
    originalName: 'Charlatan',
    sourceId: PC,
    sourcePage: 85,
    boosts: ['intelligence', 'charisma'],
    skill: 'deception',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Mentiroso Charmoso', originalName: 'Charming Liar' }],
    description:
      'Você viajava vendendo falsas promessas e identidades inventadas. Aventurar-se pode ser o próximo golpe — ou a máscara se tornando real.',
  },
  {
    id: 'pc-cook',
    name: 'Cozinheiro',
    originalName: 'Cook',
    sourceId: PC,
    sourcePage: 85,
    boosts: ['constitution', 'intelligence'],
    skill: 'survival',
    lore: { type: 'fixed', id: 'cooking-lore', name: 'Conhecimento de Culinária' },
    feats: [{ name: 'Temperado', originalName: 'Seasoned' }],
    description:
      'Você cresceu nas cozinhas de tavernas e refeitórios, tornando-se excepcional no ofício. Agora quer sair dos fundos e ver o mundo.',
  },
  {
    id: 'pc-criminal',
    name: 'Criminoso',
    originalName: 'Criminal',
    sourceId: PC,
    sourcePage: 85,
    boosts: ['dexterity', 'intelligence'],
    skill: 'stealth',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Contrabandista Experiente', originalName: 'Experienced Smuggler' }],
    description:
      'Você viveu no crime, sozinho ou em organização. Aventurar-se pode ser redenção, fuga da lei ou busca por um butim maior.',
  },
  {
    id: 'pc-cultist',
    name: 'Cultista',
    originalName: 'Cultist',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['intelligence', 'charisma'],
    skill: 'occultism',
    lore: { type: 'custom', prompt: 'conhecimento da divindade ou culto ao qual você pertenceu' },
    feats: [{ name: 'Instruído em Segredos', originalName: 'Schooled in Secrets' }],
    description:
      'Você foi (ou ainda é) membro de um culto, com ritos sagrados ou sombrios. A aventura pode servir à causa, aos mistérios ou à fuga.',
  },
  {
    id: 'pc-detective',
    name: 'Detetive',
    originalName: 'Detective',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['intelligence', 'wisdom'],
    skill: 'society',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Conhecimento de Rua', originalName: 'Streetwise' }],
    description:
      'Você investigou crimes como inspetor ou detetive particular. A aventura veio com o próximo mistério — ou com as consequências do último caso.',
  },
  {
    id: 'pc-emissary',
    name: 'Emissário',
    originalName: 'Emissary',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['intelligence', 'charisma'],
    skill: 'society',
    lore: { type: 'custom', prompt: 'cidade que você visitava com frequência' },
    feats: [{ name: 'Poliglota', originalName: 'Multilingual' }],
    description:
      'Como diplomata ou mensageiro, você viajou longe formando alianças e conversando com povos diversos. Comunicação era o seu ofício.',
  },
  {
    id: 'pc-entertainer',
    name: 'Animador',
    originalName: 'Entertainer',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['dexterity', 'charisma'],
    skill: 'performance',
    lore: { type: 'fixed', id: 'theater-lore', name: 'Conhecimento de Teatro' },
    feats: [{ name: 'Performance Fascinante', originalName: 'Fascinating Performance' }],
    description:
      'Por estudo ou prática obstinada, você aprendeu a entreter multidões — ator, dançarino, músico ou mágico de rua.',
  },
  {
    id: 'pc-farmhand',
    name: 'Lavrador',
    originalName: 'Farmhand',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['constitution', 'wisdom'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'farming-lore', name: 'Conhecimento de Agricultura' },
    feats: [{ name: 'Garantia (Atletismo)', originalName: 'Assurance (Athletics)' }],
    description:
      'Você cresceu no trabalho duro do campo: plantar, colher e enfrentar o clima. Seu corpo e resiliência foram forjados sob o sol e a terra.',
  },
  {
    id: 'pc-field-medic',
    name: 'Médico de Campo',
    originalName: 'Field Medic',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['constitution', 'wisdom'],
    skill: 'medicine',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Medicina de Combate', originalName: 'Battle Medicine' }],
    description:
      'No caos da batalha, você tratava feridos sob pressão. Também aprendeu logística de guerra enquanto salvava vidas no front.',
  },
  {
    id: 'pc-fortune-teller',
    name: 'Adivinho',
    originalName: 'Fortune Teller',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['intelligence', 'charisma'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'fortune-telling-lore', name: 'Conhecimento de Adivinhação' },
    feats: [{ name: 'Identificação de Peculiaridades', originalName: 'Oddity Identification' }],
    description:
      'Você aprendeu formas tradicionais de ler o destino. Mesmo um vislumbre liga você aos mistérios ocultos.',
  },
  {
    id: 'pc-gambler',
    name: 'Apostador',
    originalName: 'Gambler',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['dexterity', 'charisma'],
    skill: 'deception',
    lore: { type: 'fixed', id: 'games-lore', name: 'Conhecimento de Jogos' },
    feats: [{ name: 'Minta para Mim', originalName: 'Lie to Me' }],
    description:
      'A emoção da vitória o puxou para jogos de azar. A aventura pode ser um risco maior — ou a saída de uma espiral de dívidas.',
  },
  {
    id: 'pc-gladiator',
    name: 'Gladiador',
    originalName: 'Gladiator',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['strength', 'charisma'],
    skill: 'performance',
    lore: { type: 'fixed', id: 'gladiatorial-lore', name: 'Conhecimento Gladiatório' },
    feats: [{ name: 'Performance Impressionante', originalName: 'Impressive Performance' }],
    description:
      'A arena ensinou combate e espetáculo. Você partiu em busca de fama — e agora usa sangue e plateia na vida aventureira.',
  },
  {
    id: 'pc-guard',
    name: 'Guarda',
    originalName: 'Guard',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['strength', 'charisma'],
    skill: 'intimidation',
    lore: {
      type: 'choice',
      options: [
        { id: 'legal-lore', name: 'Conhecimento Jurídico' },
        { id: 'warfare-lore', name: 'Conhecimento de Guerra' },
      ],
    },
    feats: [{ name: 'Coerção Rápida', originalName: 'Quick Coercion' }],
    description:
      'Você serviu como guarda, sentinela ou agente da lei. Sabe impor presença e reconhecer quando a ordem está prestes a ruir.',
  },
  {
    id: 'pc-herbalist',
    name: 'Herbalista',
    originalName: 'Herbalist',
    sourceId: PC,
    sourcePage: 86,
    boosts: ['constitution', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'herbalism-lore', name: 'Conhecimento de Herbalismo' },
    feats: [{ name: 'Medicina Natural', originalName: 'Natural Medicine' }],
    description:
      'Como boticário treinado ou praticante rural, você conhece ervas curativas e sabe preparar remédios naturais.',
  },
  {
    id: 'pc-hermit',
    name: 'Eremita',
    originalName: 'Hermit',
    sourceId: PC,
    sourcePage: 87,
    boosts: ['constitution', 'intelligence'],
    skill: { type: 'choice', options: ['nature', 'occultism'] },
    lore: { type: 'custom', prompt: 'terreno onde você viveu em solidão' },
    feats: [{ name: 'Conhecimento Duvidoso', originalName: 'Dubious Knowledge' }],
    description:
      'Você viveu isolado em caverna, oásis remoto ou mansão afastada. A aventura é um retorno brusco ao convívio.',
  },
  {
    id: 'pc-hunter',
    name: 'Caçador',
    originalName: 'Hunter',
    sourceId: PC,
    sourcePage: 87,
    boosts: ['dexterity', 'wisdom'],
    skill: 'survival',
    lore: { type: 'fixed', id: 'tanning-lore', name: 'Conhecimento de Curtume' },
    feats: [{ name: 'Observar Vida Selvagem', originalName: 'Survey Wildlife' }],
    description:
      'Você caçava criaturas selvagens, aproveitando pele, carne e recursos. Essas práticas ainda sustentam a vida na estrada.',
  },
  {
    id: 'pc-laborer',
    name: 'Trabalhador Braçal',
    originalName: 'Laborer',
    sourceId: PC,
    sourcePage: 87,
    boosts: ['strength', 'constitution'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'labor-lore', name: 'Conhecimento de Trabalho' },
    feats: [{ name: 'Carregador Robusto', originalName: 'Hefty Hauler' }],
    description:
      'Você ganhou a vida com trabalho físico pesado — construção, carga ou serviços braçais. Aprendeu a carregar e a resistir.',
  },
  {
    id: 'pc-martial-disciple',
    name: 'Discípulo Marcial',
    originalName: 'Martial Disciple',
    sourceId: PC,
    sourcePage: 87,
    boosts: ['strength', 'dexterity'],
    skill: { type: 'choice', options: ['acrobatics', 'athletics'] },
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [
      {
        name: 'Queda Felina',
        originalName: 'Cat Fall',
        requiresSkillId: 'acrobatics',
      },
      {
        name: 'Salto Rápido',
        originalName: 'Quick Jump',
        requiresSkillId: 'athletics',
      },
    ],
    description:
      'Você se dedicou a treino intenso numa escola marcial, academia militar ou companhia mercenária.',
  },
  {
    id: 'pc-merchant',
    name: 'Mercador',
    originalName: 'Merchant',
    sourceId: PC,
    sourcePage: 87,
    boosts: ['intelligence', 'charisma'],
    skill: 'diplomacy',
    lore: { type: 'fixed', id: 'mercantile-lore', name: 'Conhecimento Mercantil' },
    feats: [{ name: 'Caçador de Pechinchas', originalName: 'Bargain Hunter' }],
    description:
      'Em loja, feira ou caravana, você trocava mercadorias por moeda. Um bom negócio ainda pode salvar sua vida.',
  },
  {
    id: 'pc-miner',
    name: 'Mineiro',
    originalName: 'Miner',
    sourceId: PC,
    sourcePage: 87,
    boosts: ['strength', 'wisdom'],
    skill: 'survival',
    lore: { type: 'fixed', id: 'mining-lore', name: 'Conhecimento de Mineração' },
    feats: [
      {
        name: 'Especialista em Terreno (Subterrâneo)',
        originalName: 'Terrain Expertise (underground)',
      },
    ],
    description:
      'Você extraiu minerais das profundezas em trabalho exaustivo. Se voltar ao underground, desta vez será armado de verdade.',
  },
  {
    id: 'pc-noble',
    name: 'Nobre',
    originalName: 'Noble',
    sourceId: PC,
    sourcePage: 87,
    boosts: ['intelligence', 'charisma'],
    skill: 'society',
    lore: {
      type: 'choice',
      options: [
        { id: 'genealogy-lore', name: 'Conhecimento de Genealogia' },
        { id: 'heraldry-lore', name: 'Conhecimento de Heráldica' },
      ],
    },
    feats: [{ name: 'Etiqueta Cortês', originalName: 'Courtly Graces' }],
    description:
      'Por trás do luxo aparente, a nobreza é obrigação e intriga. Você trocou sedas e cerimônia pela vida aventureira.',
  },
  {
    id: 'pc-nomad',
    name: 'Nômade',
    originalName: 'Nomad',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['constitution', 'wisdom'],
    skill: 'survival',
    lore: { type: 'custom', prompt: 'terreno por onde você viajava' },
    feats: [{ name: 'Garantia (Sobrevivência)', originalName: 'Assurance (Survival)' }],
    description:
      'Viajando longe, você aprendeu a sobreviver com poucos suprimentos. Como aventureiro, continua na estrada.',
  },
  {
    id: 'pc-prisoner',
    name: 'Prisioneiro',
    originalName: 'Prisoner',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['strength', 'constitution'],
    skill: 'stealth',
    lore: { type: 'fixed', id: 'underworld-lore', name: 'Conhecimento do Submundo' },
    feats: [{ name: 'Contrabandista Experiente', originalName: 'Experienced Smuggler' }],
    description:
      'Você esteve preso ou em cativeiro por parte da vida. Na aventura, aproveita ao máximo a liberdade reconquistada.',
  },
  {
    id: 'pc-raised-by-belief',
    name: 'Criado na Fé',
    originalName: 'Raised by Belief',
    sourceId: PC,
    sourcePage: 88,
    boosts: 'free',
    skill: {
      type: 'choice',
      options: [
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
      ],
    },
    lore: { type: 'custom', prompt: 'conhecimento ligado à sua divindade (o aspecto, domínio ou igreja que você serve)' },
    feats: [
      {
        name: 'Garantia',
        originalName: 'Assurance',
        appendChosenSkillName: true,
        skillGrantIdForName: 'skill',
      },
    ],
    description:
      'Sua criação foi marcada por fé ou filosofia. O boost restrito deve ser um atributo divino da sua divindade, a perícia treinada deve ser a perícia associada a ela, e o Conhecimento é o da divindade (ex.: Abadar). Escolha a divindade com o mestre e use a lista oficial dela.',
  },
  {
    id: 'pc-sailor',
    name: 'Marinheiro',
    originalName: 'Sailor',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['strength', 'dexterity'],
    skill: 'athletics',
    lore: { type: 'fixed', id: 'sailing-lore', name: 'Conhecimento de Navegação' },
    feats: [{ name: 'Saqueador Subaquático', originalName: 'Underwater Marauder' }],
    description:
      'O mar o chamou cedo: navio mercante, marinha ou pirataria. Você conhece o convés, as ondas e o perigo das águas.',
  },
  {
    id: 'pc-scholar',
    name: 'Erudito',
    originalName: 'Scholar',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['intelligence', 'wisdom'],
    skill: { type: 'choice', options: ['arcana', 'nature', 'occultism', 'religion'] },
    lore: { type: 'fixed', id: 'academia-lore', name: 'Conhecimento Acadêmico' },
    feats: [
      {
        name: 'Garantia',
        originalName: 'Assurance',
        appendChosenSkillName: true,
        skillGrantIdForName: 'skill',
      },
    ],
    description:
      'Você tem talento para aprender e se isolou nos livros. A curiosidade sobre o mundo real o tirou dos estudos para a aventura.',
  },
  {
    id: 'pc-scout',
    name: 'Batedor',
    originalName: 'Scout',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['dexterity', 'wisdom'],
    skill: 'survival',
    lore: { type: 'custom', prompt: 'terreno onde você fazia reconhecimento' },
    feats: [{ name: 'Coletor', originalName: 'Forager' }],
    description:
      'Você vivia no ermo, abrindo trilhas e guiando viajantes. Aventureiro por vagabondagem ou por serviço de reconhecimento.',
  },
  {
    id: 'pc-street-urchin',
    name: 'Moleque de Rua',
    originalName: 'Street Urchin',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['dexterity', 'constitution'],
    skill: 'thievery',
    lore: { type: 'custom', prompt: 'cidade onde você viveu nas ruas' },
    feats: [{ name: 'Batedor de Carteira', originalName: 'Pickpocket' }],
    description:
      'Você sobreviveu furtando bolsos numa grande cidade. Aventura, para você, é sobrevivência.',
  },
  {
    id: 'pc-teacher',
    name: 'Professor',
    originalName: 'Teacher',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['intelligence', 'wisdom'],
    skill: { type: 'choice', options: ['performance', 'society'] },
    lore: { type: 'fixed', id: 'academia-lore', name: 'Conhecimento Acadêmico' },
    feats: [{ name: 'Profissional Experiente', originalName: 'Experienced Professional' }],
    description:
      'Você ensina o mundo e suas maravilhas, mas nem tudo cabe em livros. Aventura-se para aprender na prática.',
  },
  {
    id: 'pc-tinker',
    name: 'Funileiro',
    originalName: 'Tinker',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['dexterity', 'intelligence'],
    skill: 'crafting',
    lore: { type: 'fixed', id: 'engineering-lore', name: 'Conhecimento de Engenharia' },
    feats: [{ name: 'Ofício Especializado', originalName: 'Specialty Crafting' }],
    description:
      'Pequenas invenções alimentam sua vontade de resolver problemas. Ninguém sabe se o próximo aparelho será genial — ou se vai explodir.',
  },
  {
    id: 'pc-warrior',
    name: 'Guerreiro',
    originalName: 'Warrior',
    sourceId: PC,
    sourcePage: 88,
    boosts: ['strength', 'constitution'],
    skill: 'intimidation',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Olhar Intimidante', originalName: 'Intimidating Glare' }],
    description:
      'Na juventude você lutou como mercenário, defensor de um povo ou soldado de milícia. Agora busca autonomia no combate.',
  },

  // ——— Player Core 2 (20) ———
  {
    id: 'pc2-astrologer',
    name: 'Astrólogo',
    originalName: 'Astrologer',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['intelligence', 'wisdom'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'astrology-lore', name: 'Conhecimento de Astrologia' },
    feats: [{ name: 'Identificação de Peculiaridades', originalName: 'Oddity Identification' }],
    description:
      'Você estuda as estrelas em busca de sinais e destinos. A aventura segue o caminho que o céu indicou.',
  },
  {
    id: 'pc2-barber',
    name: 'Barbeiro',
    originalName: 'Barber',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['dexterity', 'wisdom'],
    skill: 'medicine',
    lore: { type: 'fixed', id: 'surgery-lore', name: 'Conhecimento de Cirurgia' },
    feats: [{ name: 'Cirurgia Arriscada', originalName: 'Risky Surgery' }],
    description:
      'Corte de cabelo, odontologia e cirurgia: se exige mão firme e lâmina, você faz. A estrada testa essas habilidades.',
  },
  {
    id: 'pc2-bookkeeper',
    name: 'Contador',
    originalName: 'Bookkeeper',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['intelligence', 'wisdom'],
    skill: 'society',
    lore: { type: 'fixed', id: 'accounting-lore', name: 'Conhecimento Contábil' },
    feats: [{ name: 'Olho para Números', originalName: 'Eye for Numbers' }],
    description:
      'Você controlava despesas, folhas de pagamento e lucros. Aventura pode ser aprendizado — ou fuga das contas.',
  },
  {
    id: 'pc2-courier',
    name: 'Mensageiro',
    originalName: 'Courier',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['dexterity', 'intelligence'],
    skill: 'society',
    lore: { type: 'custom', prompt: 'cidade de origem' },
    feats: [{ name: 'Extrair Conteúdo', originalName: 'Glean Contents' }],
    description:
      'Na juventude você entregava mensagens por ruas lotadas. A teimosia em completar a entrega foi ótimo treino aventureiro.',
  },
  {
    id: 'pc2-driver',
    name: 'Condutor',
    originalName: 'Driver',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['strength', 'dexterity'],
    skill: 'acrobatics',
    lore: {
      type: 'choice',
      options: [
        { id: 'driving-lore', name: 'Conhecimento de Condução' },
        { id: 'piloting-lore', name: 'Conhecimento de Pilotagem' },
      ],
    },
    feats: [
      {
        name: 'Garantia',
        originalName: 'Assurance',
        appendChosenSkillName: true,
        skillGrantIdForName: 'lore',
      },
    ],
    description:
      'Você vive atrás dos controles de um veículo e enfrenta o que a estrada, o mar ou o céu jogarem.',
  },
  {
    id: 'pc2-insurgent',
    name: 'Insurgente',
    originalName: 'Insurgent',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['strength', 'wisdom'],
    skill: 'deception',
    lore: { type: 'fixed', id: 'warfare-lore', name: 'Conhecimento de Guerra' },
    feats: [{ name: 'Distração Prolongada', originalName: 'Lengthy Diversion' }],
    description:
      'Você foi revolucionário, lutando por um país novo ou melhor. Vitória, exílio ou desilusão o puseram no caminho da aventura.',
  },
  {
    id: 'pc2-outrider',
    name: 'Vanguardeiro',
    originalName: 'Outrider',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['constitution', 'wisdom'],
    skill: 'nature',
    lore: { type: 'fixed', id: 'plains-lore', name: 'Conhecimento de Planícies' },
    feats: [{ name: 'Cavaleiro Expresso', originalName: 'Express Rider' }],
    description:
      'Você galopava pelas pradarias como vanguarda de um povo ou exército. Ver tantas terras gerou sede de explorar de verdade.',
  },
  {
    id: 'pc2-pilgrim',
    name: 'Peregrino',
    originalName: 'Pilgrim',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['wisdom', 'charisma'],
    skill: 'religion',
    lore: { type: 'custom', prompt: 'conhecimento da divindade padroeira da sua peregrinação' },
    feats: [{ name: 'Símbolo do Peregrino', originalName: "Pilgrim's Token" }],
    description:
      'Na juventude você fez peregrinações a santuários e locais sagrados. A fé ainda o protege na estrada.',
  },
  {
    id: 'pc2-refugee',
    name: 'Refugiado',
    originalName: 'Refugee',
    sourceId: PC2,
    sourcePage: 50,
    boosts: ['constitution', 'wisdom'],
    skill: 'society',
    lore: { type: 'custom', prompt: 'assentamento de onde você veio' },
    feats: [{ name: 'Conhecimento de Rua', originalName: 'Streetwise' }],
    description:
      'Você veio de terras distantes, empurrado por guerra, peste ou busca de oportunidade. Forasteiro nesta terra, aventura-se para sobreviver.',
  },
  {
    id: 'pc2-root-worker',
    name: 'Curandeiro de Raízes',
    originalName: 'Root Worker',
    sourceId: PC2,
    sourcePage: 51,
    boosts: ['intelligence', 'wisdom'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'herbalism-lore', name: 'Conhecimento de Herbalismo' },
    feats: [{ name: 'Magia das Raízes', originalName: 'Root Magic' }],
    description:
      'Além de ervas, você aprendeu remédios rituais invocando espíritos da natureza. Viajar traz companhia e proteção.',
  },
  {
    id: 'pc2-saboteur',
    name: 'Sabotador',
    originalName: 'Saboteur',
    sourceId: PC2,
    sourcePage: 51,
    boosts: ['strength', 'dexterity'],
    skill: 'thievery',
    lore: { type: 'fixed', id: 'engineering-lore', name: 'Conhecimento de Engenharia' },
    feats: [{ name: 'Prestidigitação Ocultadora', originalName: 'Concealing Legerdemain' }],
    description:
      'Você tem jeito para destruir: vê pontos fracos em objetos e estruturas. Aventura para afiar o ofício.',
  },
  {
    id: 'pc2-scavenger',
    name: 'Catador',
    originalName: 'Scavenger',
    sourceId: PC2,
    sourcePage: 51,
    boosts: ['intelligence', 'wisdom'],
    skill: 'survival',
    lore: { type: 'custom', prompt: 'assentamento onde você catava' },
    feats: [{ name: 'Coletor', originalName: 'Forager' }],
    description:
      'Você vivia do que a sociedade descartava. Ainda olha para o chão por hábito.',
  },
  {
    id: 'pc2-servant',
    name: 'Serviçal',
    originalName: 'Servant',
    sourceId: PC2,
    sourcePage: 51,
    boosts: ['dexterity', 'charisma'],
    skill: 'society',
    lore: { type: 'fixed', id: 'labor-lore', name: 'Conhecimento de Trabalho' },
    feats: [{ name: 'Ler Lábios', originalName: 'Read Lips' }],
    description:
      'Você serviu nobres e ganhou sua confiança. Saiu em bons termos — ou carregando segredos — e agora usa essas habilidades na aventura.',
  },
  {
    id: 'pc2-squire',
    name: 'Escudeiro',
    originalName: 'Squire',
    sourceId: PC2,
    sourcePage: 51,
    boosts: ['strength', 'constitution'],
    skill: 'athletics',
    lore: {
      type: 'choice',
      options: [
        { id: 'heraldry-lore', name: 'Conhecimento de Heráldica' },
        { id: 'warfare-lore', name: 'Conhecimento de Guerra' },
      ],
    },
    feats: [{ name: 'Ajuda com Armadura', originalName: 'Armor Assist' }],
    description:
      'Você treinou aos pés de um cavaleiro, cuidando do equipamento e apoiando em torneios e batalhas.',
  },
  {
    id: 'pc2-tax-collector',
    name: 'Cobrador de Impostos',
    originalName: 'Tax Collector',
    sourceId: PC2,
    sourcePage: 51,
    boosts: ['strength', 'charisma'],
    skill: 'intimidation',
    lore: { type: 'custom', prompt: 'assentamento que o empregava' },
    feats: [{ name: 'Coerção Rápida', originalName: 'Quick Coercion' }],
    description:
      'Odiado porém necessário, você cobrava impostos com persuasão ou mão dura. A aventura pareceu o próximo passo lógico.',
  },
  {
    id: 'pc2-ward',
    name: 'Pupilo',
    originalName: 'Ward',
    sourceId: PC2,
    sourcePage: 51,
    boosts: ['constitution', 'charisma'],
    skill: 'performance',
    lore: { type: 'fixed', id: 'genealogy-lore', name: 'Conhecimento de Genealogia' },
    feats: [{ name: 'Performance Fascinante', originalName: 'Fascinating Performance' }],
    description:
      'Na juventude você foi pupilo de outra casa: alimentado e educado, mas nunca plenamente da família. Aventurar-se é chance de crescer livre.',
  },
  {
    id: 'pc2-amnesiac',
    name: 'Amnésico',
    originalName: 'Amnesiac',
    sourceId: PC2,
    sourcePage: 52,
    rarity: 'rare',
    boosts: null,
    freeBoost: false,
    extraFreeBoosts: 3,
    skill: { type: 'none' },
    lore: { type: 'none' },
    feats: [],
    description:
      'Você não lembra do próprio passado. Você recebe três boosts livres (um deles pode ser definido pelo mestre conforme a história). Sem perícia, conhecimento ou feito iniciais.',
  },
  {
    id: 'pc2-blessed',
    name: 'Abençoado',
    originalName: 'Blessed',
    sourceId: PC2,
    sourcePage: 52,
    rarity: 'rare',
    boosts: ['wisdom', 'charisma'],
    skill: { type: 'none' },
    lore: { type: 'custom', prompt: 'conhecimento da divindade que o abençoou (ex.: Shelyn), ou o que o mestre definir se você não souber quem é' },
    feats: [
      {
        name: 'Orientação (inato divino à vontade)',
        originalName: 'guidance (divine innate at will)',
        featType: 'other',
        actionType: 'one',
        description: GUIDANCE_INNATE,
      },
    ],
    description:
      'Uma divindade o abençoou, por motivo desconhecido e independentemente da sua fé atual. A bênção concede insight — você pode ou não saber quem o abençoou, e o custo pode aparecer depois. Você é treinado no Conhecimento da divindade que o abençoou (ex.: Conhecimento de Shelyn) se souber quem é; senão, o mestre escolhe o Conhecimento. Em vez de um feito de perícia comum, você lança Orientação como truque inato divino à vontade, ou recebe uma bênção similar definida pelo mestre.',
  },
  {
    id: 'pc2-cursed',
    name: 'Amaldiçoado',
    originalName: 'Cursed',
    sourceId: PC2,
    sourcePage: 52,
    rarity: 'rare',
    boosts: ['intelligence', 'charisma'],
    skill: 'occultism',
    lore: { type: 'fixed', id: 'curse-lore', name: 'Conhecimento de Maldições' },
    feats: [
      {
        name: 'Sinal de Proteção',
        originalName: 'Warding Sign',
        featType: 'other',
        actionType: 'reaction',
        frequency: '1 vez por minuto',
        trigger:
          'Você tenta uma salvaguarda contra um efeito mágico e ainda não rolou',
        traits: ['concentrate'],
        description: WARDING_SIGN,
      },
    ],
    description:
      'Você carrega uma maldição pessoal ou hereditária. Com esforço e estudo oculto, contorna o pior — mas o fardo ainda se manifesta. Uma vez por minuto, o Sinal de Proteção dá +2 (ou +3 contra maldição) na salvaguarda contra magia.',
  },
  {
    id: 'pc2-feral-child',
    name: 'Criança Selvagem',
    originalName: 'Feral Child',
    sourceId: PC2,
    sourcePage: 52,
    rarity: 'rare',
    boosts: ['strength', 'dexterity', 'constitution'],
    freeBoost: false,
    skill: { type: 'multi', skills: ['nature', 'survival'] },
    lore: { type: 'none' },
    feats: [
      { name: 'Coletor', originalName: 'Forager' },
      {
        name: 'Sentidos selvagens',
        originalName: 'low-light vision, imprecise scent',
        featType: 'other',
        description: FERAL_CHILD_SENSES,
      },
    ],
    description:
      'Você cresceu no ermo, perto de animais ou criado por eles. Escolha apenas um boost entre Força, Destreza ou Constituição. Treinado em Natureza e Sobrevivência; sem conhecimento. Ganha o feito Coletor, visão na penumbra (ou visão no escuro se já tiver penumbra) e faro impreciso de 9 m.',
  },
]

const drafts: BackgroundDraft[] = [
  ...draftsBatch1,
  ...draftsBatch2,
  ...draftsBatch3,
  ...draftsBatch4,
  ...draftsBatch5,
  ...draftsBatch6,
]

export const officialBackgrounds: Background[] = drafts.map((draft) => {
  if (draft.id === 'pc2-amnesiac' || draft.id === 'gng-discarded-duplicate') {
    return makeTripleFreeBoostBackground(draft)
  }

  if (draft.id === 'pc2-driver') {
    const bg = makeBackground(draft)
    bg.featGrants = [
      {
        id: 'feat',
        featName: 'Garantia (Conhecimento escolhido)',
        originalName: 'Assurance (chosen lore)',
        featType: 'skill',
      },
    ]
    return bg
  }

  return makeBackground(draft)
})

export const OFFICIAL_BACKGROUND_IDS = officialBackgrounds.map((b) => b.id)

if (officialBackgrounds.length !== 315) {
  throw new Error(
    `Esperado 315 origens oficiais, encontrado ${officialBackgrounds.length}`,
  )
}
