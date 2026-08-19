import type { CharacterClass } from '@/types/class'
import {
  SOURCE_PLAYER_CORE_2_ID,
  SOURCE_RAGE_OF_ELEMENTS_ID,
  SOURCE_SEVERED_AT_THE_ROOT_ID,
  SOURCE_WAR_OF_IMMORTALS_ID,
} from './sources'
import { CLASS_BARBARIAN_ID } from './ids'

export { CLASS_BARBARIAN_ID }

function animal(
  id: string,
  name: string,
  originalName: string,
  attacks: string,
) {
  return {
    id,
    name,
    originalName,
    description: `Enquanto enfurecido, ataques desarmados do grupo briga (não pode usar armas).\n\n${attacks}`,
  }
}

const ANIMAL_INSTINCT_OPTIONS = [
  animal(
    'ape',
    'Macaco',
    'Ape',
    'Punho: 1d10 concussão (agarrar, desarmado).',
  ),
  animal(
    'bear',
    'Urso',
    'Bear',
    'Mandíbulas: 1d10 perfurante (desarmado).\nGarra: 1d6 cortante (ágil, desarmado).',
  ),
  animal(
    'bull',
    'Touro',
    'Bull',
    'Chifre: 1d10 perfurante (empurrar, desarmado).',
  ),
  animal(
    'cat',
    'Felino',
    'Cat',
    'Mandíbulas: 1d10 perfurante (desarmado).\nGarra: 1d6 cortante (ágil, desarmado).',
  ),
  animal(
    'deer',
    'Cervo',
    'Deer',
    'Galhada: 1d10 perfurante (agarrar, desarmado).',
  ),
  animal(
    'frog',
    'Sapo',
    'Frog',
    'Mandíbulas: 1d10 concussão (desarmado).\nLíngua: 1d4 concussão (ágil, desarmado).',
  ),
  animal(
    'shark',
    'Tubarão',
    'Shark',
    'Mandíbulas: 1d10 perfurante (agarrar, desarmado).',
  ),
  animal(
    'snake',
    'Serpente',
    'Snake',
    'Presas: 1d10 perfurante (agarrar, desarmado).',
  ),
  animal(
    'wolf',
    'Lobo',
    'Wolf',
    'Mandíbulas: 1d10 perfurante (derrubar, desarmado).',
  ),
  animal(
    'ankylosaurus',
    'Anquilossauro',
    'Ankylosaurus',
    'Cauda: 1d10 concussão (raze, desarmado).',
  ),
  animal(
    'ant',
    'Formiga',
    'Ant',
    'Mandíbulas: 1d10 perfurante (agarrar, desarmado).',
  ),
  animal(
    'bat',
    'Morcego',
    'Bat',
    'Presas: 1d10 perfurante (desarmado).\nAsas: 1d4 perfurante (aparar, desarmado).',
  ),
  animal(
    'bird',
    'Ave',
    'Bird',
    'Bico: 1d10 perfurante (desarmado).\nGarra: 1d6 cortante (ágil, desarmado).',
  ),
  animal(
    'brontosaurus',
    'Brontossauro',
    'Brontosaurus',
    'Cauda: 1d10 concussão (derrubar, desarmado).',
  ),
  animal(
    'crab',
    'Caranguejo',
    'Crab',
    'Pinça grande: 1d10 concussão (raze, desarmado).\nPinça: 1d4 cortante (aparar, desarmado).',
  ),
  animal(
    'crocodile',
    'Crocodilo',
    'Crocodile',
    'Mandíbulas: 1d10 perfurante (desarmado).\nCauda: 1d6 concussão (ágil, desarmado).',
  ),
  animal(
    'orca',
    'Orca',
    'Orca',
    'Mandíbulas: 1d8 perfurante (impetuoso, desarmado).',
  ),
  animal(
    'scorpion',
    'Escorpião',
    'Scorpion',
    'Aguilhão: 1d6 perfurante (alcance, desarmado, venenoso).\nPinça: 1d4 cortante (aparar, desarmado).',
  ),
  animal(
    'seal',
    'Foca',
    'Seal',
    'Mandíbulas: 1d10 perfurante (agarrar, desarmado).',
  ),
  animal(
    'spider',
    'Aranha',
    'Spider',
    'Presas: 1d8 perfurante (agarrar, desarmado, venenoso).\nTeia: sem dano; incremento de 4,5 m. Acerto: −3 m de penalidade de circunstância às Velocidades por 1 rodada. Segundo acerto enquanto a penalidade vale: imobilizado até Escapar contra sua CD de classe.',
  ),
  animal(
    'tyrannosaurus',
    'Tiranossauro',
    'Tyrannosaurus',
    'Mandíbulas: 1d8 perfurante (mortal d12, desarmado).\nCauda: 1d6 concussão (ágil, desarmado).',
  ),
  animal(
    'wasp',
    'Vespa',
    'Wasp',
    'Aguilhão: 1d4 perfurante (traidor, mortal d8, desarmado, venenoso).',
  ),
]

function dragon(
  id: string,
  name: string,
  originalName: string,
  tradition: string,
  breath: string,
) {
  return {
    id,
    name,
    originalName,
    description: `Tradição ${tradition}. Sopro: ${breath}. Na Fúria Dracônica o dano extra pode mudar para este tipo e Enfurecer-se ganha o traço da tradição.`,
  }
}

const DRAGON_INSTINCT_OPTIONS = [
  dragon('adamantine', 'Adamantina', 'Adamantine', 'primal', 'concussão'),
  dragon('conspirator', 'Conspirador', 'Conspirator', 'oculta', 'veneno'),
  dragon('diabolic', 'Diabólico', 'Diabolic', 'divina', 'fogo'),
  dragon('empyreal', 'Empíreo', 'Empyreal', 'divina', 'espírito'),
  dragon('fortune', 'Fortuna', 'Fortune', 'arcana', 'força'),
  dragon('horned', 'Chifrudo', 'Horned', 'primal', 'veneno'),
  dragon('mirage', 'Miragem', 'Mirage', 'arcana', 'mental'),
  dragon('omen', 'Presságio', 'Omen', 'oculta', 'mental'),
]

function elemental(
  id: string,
  name: string,
  originalName: string,
  trait: string,
  damage: string,
) {
  return {
    id,
    name,
    originalName,
    description: `Traço ${trait}. Dano da Fúria Elemental: ${damage}. Em fúria: oculto contra ataques à distância (não serve para Furtar-se/Esconder-se); dano extra 2→4 deste tipo; impulsos de cinético do mesmo elemento podem ser usados mesmo com concentrate. 7º: 4→6 (maior: 6→12). 9º: resiste a dano de criaturas/matéria do seu elemento e a efeitos com o traço ${trait}.`,
  }
}

const ELEMENTAL_INSTINCT_OPTIONS = [
  elemental('air-electricity', 'Ar (eletricidade)', 'Air (electricity)', 'ar', 'eletricidade'),
  elemental('air-slashing', 'Ar (corte)', 'Air (slashing)', 'ar', 'corte'),
  elemental('earth-bludgeoning', 'Terra (contusão)', 'Earth (bludgeoning)', 'terra', 'contusão'),
  elemental('earth-piercing', 'Terra (perfuração)', 'Earth (piercing)', 'terra', 'perfuração'),
  elemental('fire', 'Fogo', 'Fire', 'fogo', 'fogo'),
  elemental('metal-piercing', 'Metal (perfuração)', 'Metal (piercing)', 'metal', 'perfuração'),
  elemental('metal-slashing', 'Metal (corte)', 'Metal (slashing)', 'metal', 'corte'),
  elemental('water-bludgeoning', 'Água (contusão)', 'Water (bludgeoning)', 'água', 'contusão'),
  elemental('water-cold', 'Água (frio)', 'Water (cold)', 'água', 'frio'),
  elemental('wood-bludgeoning', 'Madeira (contusão)', 'Wood (bludgeoning)', 'madeira', 'contusão'),
  elemental('wood-piercing', 'Madeira (perfuração)', 'Wood (piercing)', 'madeira', 'perfuração'),
]

/** Feitos de bárbaro de 1º sem pré-requisito de outro instinto. */
const FURY_BONUS_FEAT_IDS = [
  'feat-barbarian-acute-vision',
  'feat-barbarian-adrenaline-rush',
  'feat-barbarian-moment-of-clarity',
  'feat-barbarian-raging-intimidation',
  'feat-barbarian-raging-thrower',
  'feat-barbarian-sudden-charge',
]

export const barbarianClass: CharacterClass = {
  id: CLASS_BARBARIAN_ID,
  name: 'Bárbaro',
  originalName: 'Barbarian',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 70,
  hitPointsPerLevel: 12,
  keyAttributeOptions: ['strength'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'barbarian-athletics', rank: 'trained', skillId: 'athletics' }],
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'martial', rank: 'trained', label: 'Armas marciais' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'light', rank: 'trained', label: 'Armadura leve' },
    { category: 'medium', rank: 'trained', label: 'Armadura média' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  subclass: {
    id: 'barbarian-instinct',
    label: 'Instinto',
    description:
      'Sua fúria vem de um instinto dominante — tradição, espírito ou algo dentro de você. O instinto concede uma habilidade, aumenta o dano/resistências em níveis altos e libera feitos ligados a ele. Fonte: Player Core 2, pág. 74 (AoN Instincts Remaster).',
    required: true,
    options: [
      {
        id: 'instinct-animal',
        name: 'Instinto Animal',
        originalName: 'Animal Instinct',
        description:
          'A fúria de um predador selvagem preenche você ao Enfurecer-se, concedendo ataques desarmados ferozes. Culturas que reverenciam animais violentos (como macacos ou ursos) geram bárbaros deste instinto — ou você luta contra um lado animalístico, ou descende de um licantropo.',
        rulesSummary:
          'Habilidade — Fúria Bestial: enquanto enfurecido, ganha o(s) ataque(s) desarmado(s) do animal escolhido (tabela de Instintos Animais), mas não pode usar armas. Ataques no grupo briga. A ação Enfurecer-se ganha os traços morph e primal. Especialização (7º): aumenta o dado do ataque animal em 1 passo e o dano extra da Fúria de 2 para 5 nesses ataques (maior especialização: 5→12). Resistência em Fúria (9º): resiste a perfuração e corte. Escolha o animal na aba Classe (o motor não escolhe).',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 74,
      },
      {
        id: 'instinct-dragon',
        name: 'Instinto Dracônico',
        originalName: 'Dragon Instinct',
        description:
          'Você invoca a fúria de um dragão poderoso. Talvez sua cultura revere a majestade dracônica, ou você ganhou insights bebendo/banho em sangue de dragão, ou viu um wyrm destruir sua vila. Escolha um tipo de dragão (Monster Core; o mestre pode permitir outros).',
        rulesSummary:
          'Habilidade — Fúria Dracônica: ao enfurecer-se, pode aumentar o dano extra da Fúria de 2 para 4 e mudar o tipo para o do sopro do seu dragão (em vez do tipo da arma). Se fizer isso, Enfurecer-se ganha o traço da tradição do dragão e do tipo de dano quando aplicável. Especialização (7º): com fúria dracônica, dano extra 4→8 (maior: 8→16). Resistência em Fúria (9º): resiste a perfuração e ao tipo de dano do sopro. Escolha o tipo de dragão na aba Classe (o motor não escolhe).',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 74,
      },
      {
        id: 'instinct-fury',
        name: 'Instinto de Fúria',
        originalName: 'Fury Instinct',
        description:
          'Sua fúria vem de um poço profundo e puramente pessoal. Você a usa como quiser — sem anátema de instinto específico.',
        rulesSummary:
          'Habilidade — Frenesi Imparável: aumenta o dano extra da Fúria de 2 para 3. Você ganha um feito de bárbaro de 1º nível bônus (aba Classe; não gasta o slot de feito). Especialização (7º): dano extra 3→7 (maior especialização: →13). Resistência em Fúria (9º): resiste a dano físico de armas, mas não a dano físico de outras fontes (ex.: ataques desarmados).',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 75,
      },
      {
        id: 'instinct-giant',
        name: 'Instinto de Gigante',
        originalName: 'Giant Instinct',
        description:
          'Sua fúria lhe dá o poder bruto e o tamanho de um gigante. Isso não significa reverenciar gigantes — pode zombar deles ou aspirar a matá-los. Ou você simplesmente parece um gigante aos outros pela força ou ego.',
        rulesSummary:
          'Habilidade — Destruidor Titânico: se for Pequeno ou Médio, pode usar arma feita para criatura Grande (senão, uma categoria maior que você). Começa com uma dessas armas comum (preço ≤ 9 po sem o ajuste de tamanho). Empunhando arma maior em combate: dano extra da Fúria 2→6, mas fica desajeitado 1 (não pode remover/ignorar enquanto empunha a arma). Especialização (7º): com arma maior, dano extra 6→10 (maior: 10→18). Resistência em Fúria (9º): resiste a contusão e a frio, eletricidade ou fogo — escolha na aba Classe ao ganhar a resistência.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 75,
      },
      {
        id: 'instinct-spirit',
        name: 'Instinto Espiritual',
        originalName: 'Spirit Instinct',
        description:
          'Seja sensível a espíritos, cultue ancestrais/aparições, ou seja assombrado pelo espectro de alguém, sua fúria toma a forma de uma possessão espiritual.',
        rulesSummary:
          'Habilidade — Fúria Espiritual: ao enfurecer-se, pode aumentar o dano extra de 2 para 3 e mudar o tipo para spirit (escolha a cada Fúria). Se escolher spirit, a arma/ataque desarmado ganha efeitos da runa ghost touch, e Enfurecer-se ganha traços divine e spirit. Especialização (7º): com fúria espiritual, dano extra 3→7 (maior: →13). Resistência em Fúria (9º): resiste a void e a dano de ataques/habilidades de mortos-vivos (qualquer tipo).',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 75,
      },
      {
        id: 'instinct-superstition',
        name: 'Instinto de Superstição',
        originalName: 'Superstition Instinct',
        description:
          'Uma desconfiança profunda da magia o impulsiona a rejeitar e contrapor o nonsense metafísico dos conjuradores. Excelente caçador de magos, lento para confiar em praticantes das artes mágicas.',
        rulesSummary:
          'Habilidade — Resiliência Supersticiosa: é anátema aprender/lançar magias ou usar item ativável para lançar magia (violar: perde habilidades do instinto e feitos que o exigem até 1 dia recentrando; mantém o resto de bárbaro). Em fúria: +2 de status em salvaguardas contra magia; dano da Fúria 2→3 (ou 4 vs criaturas que você viu lançar magia na última hora); ao Enfurecer-se, recupera PV igual aos PV temporários ganhos (1×/10 min); se aceitar efeito mágico de bom grado, fica assustado 1 (não pode reduzir abaixo de 1 enquanto afetado). Especialização (7º): dano 3→7 / 8 vs conjuradores vistos (maior: 13 / 16). Resistência em Fúria (9º): escolha duas tradições associadas na aba Classe (arcana+oculta, arcana+primal, divina+oculta ou divina+primal); a resistência se aplica a dano de magias dessas tradições.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 75,
      },
      {
        id: 'instinct-elemental',
        name: 'Instinto Elemental',
        originalName: 'Elemental Instinct',
        description:
          'Você canaliza forças elementais, ligado a um único elemento e seu plano. Talvez ancestrais fossem conjuradores elementais, ou um lorde elemental o abençoou. Escolha o elemento (e o tipo de dano, se houver mais de um) na aba Classe.',
        rulesSummary:
          'Anátema: desrespeitar criatura elemental (defender-se não conta) e devastar de propósito o plano do seu elemento. Habilidade — Fúria Elemental: em fúria, oculto contra ataques à distância (não para Furtar-se/Esconder-se); dano extra 2→4 do tipo escolhido; impulsos de cinético do mesmo elemento podem ser usados mesmo com concentrate. Especialização (7º): 4→6 (maior: 6→12). Resistência em Fúria (9º): dano de criaturas/matéria do seu elemento (qualquer tipo) e de ataques, magias e habilidades com o traço do elemento.',
        sourceId: SOURCE_RAGE_OF_ELEMENTS_ID,
        sourcePage: 54,
      },
      {
        id: 'instinct-decay',
        name: 'Instinto de Decadência',
        originalName: 'Decay Instinct',
        description:
          'Sua fúria está ligada à decomposição e ao crescimento que ela permite. Talvez tenha mexido com relíquias de Ghorus, sido exposto à Praga de Ayrzul ou ao Tanglebriar, ou abençoado pelo homem-verde Zibik. Ao enfurecer-se, você apodrece — mofo e fungos; as cicatrizes avançam um pouco a cada fúria.',
        rulesSummary:
          'Anátema: impedir a decomposição de criaturas ou plantas mortas, e destruir ou interferir no crescimento de mofos/fungos em ambiente natural (defender-se de criaturas/perigos fúngicos e colher fungos só para alimento não conta). Habilidade — Fúria Putrefata: ao Enfurecer-se, pode aumentar o dano extra de 2 para 6 e mudar o tipo para veneno. Se fizer isso, Enfurecer-se ganha traços primal e veneno, e você sofre 1 de dano no fim de cada um dos seus turnos (não reduzível). A escolha é só no início da fúria. Especialização (7º): 6→10 e o dano em você 1→5 (maior: 10→18 e 5→10). Resistência em Fúria (9º): veneno e dano de ataques/habilidades de criaturas com o traço fungus (qualquer tipo).',
        sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
        sourcePage: 70,
      },
      {
        id: 'instinct-ligneous',
        name: 'Instinto Lenhoso',
        originalName: 'Ligneous Instinct',
        description:
          'Sua fúria vem do crescimento estável do mundo natural — flores, hortas e a imponência das árvores. Pode descender de druidas ou dríades, ter sido exposto a magia primal poderosa ou transformado pelo ressurgimento do Plano da Madeira. Ao enfurecer-se, placas de casca cobrem a pele.',
        rulesSummary:
          'Anátema: devastar a natureza e matar plantas sem necessidade (defender-se de criaturas/perigos vegetais não conta). Habilidade — Fúria de Madeira: em fúria, pode aumentar o dano extra de 2 para 6; se fizer isso, Velocidade −3 m (não superável, mas compensável por bônus de velocidade). Especialização (7º): 6→10 (maior: 10→18). Resistência em Fúria (9º): perfuração e corte, mas fraqueza a fogo igual a 3 + CON.',
        sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
        sourcePage: 71,
      },
      {
        id: 'instinct-bloodrager',
        name: 'Instinto Bloodrager',
        originalName: 'Bloodrager Instinct',
        description:
          'Arquétipo de classe: o sangue mágico que você bebeu despertou poder e sede. Pegue Dedicação de Bloodrager no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º. Perícias: Atletismo, Medicina e 2+INT. Fúria de Sangue: em fúria, Golpes causam sangramento persistente extra igual à metade do dano extra da Fúria; magias com ataque de magia também recebem o dano extra da Fúria (mesmo na falha). Especialização (7º): dano extra da Fúria 2→4 (maior: 4→8). Resistência em Fúria (9º): corte, sangramento persistente e o dano da criatura cujo sangue você colheu por último. A conjuração (truques, tradição arcana ou divina, Carisma) vem da Dedicação — você escolhe.',
        additionalSkillBaseOverride: 2,
        skillGrants: [
          { id: 'bloodrager-medicine', rank: 'trained', skillId: 'medicine' },
        ],
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 60,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Apogeu',
      originalName: 'Flourish',
      description:
        'Ações com o traço flourish exigem esforço demais para uso frequente. Você só pode usar 1 ação com o traço flourish por rodada.',
    },
    {
      name: 'Fúria',
      originalName: 'Rage',
      description:
        'Você precisa estar enfurecido para usar habilidades com o traço rage, e elas terminam automaticamente quando você para de enfurecer-se.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Enfurecer-se',
      originalName: 'Rage',
      body: 'Ação que liga o modo de combate: PV temporários, dano extra e restrições (não conjura, etc.). Habilidades com traço rage só funcionam enfurecido e caem quando a fúria acaba. Gerencie duração e quando “desligar”.',
    },
    {
      title: 'Instinto',
      originalName: 'Instinct',
      body: 'No 1º nível escolha o instinto (Animal, Dragão, Fúria, Gigante, Espírito, Superstição, Elemental, Decadência, Lenhoso…). Ele altera o dano da fúria, concede habilidade especial, define anátemas e, nos níveis altos, especialização e resistências. Feitos de bárbaro muitas vezes exigem um instinto.',
    },
    {
      title: 'Tanque ofensivo',
      body: 'Mais PV da lista (12+CON), armadura média, mas CA e reflexos não são de tanque “puro”. Sua defesa é matar rápido e aguentar com PV + resistências da fúria.',
    },
    {
      title: 'Temperamento e anátema',
      body: 'Alguns instintos proíbem magia ou comportamentos. Violar pode desligar poderes do instinto até você se recentrar — leia o anátema antes de aceitar efeitos mágicos benéficos (especialmente Superstição).',
    },
  ],
  lore: {
    summary:
      'A fúria o consome em batalha. Você se deleita em semear o caos e usar armas poderosas para abrir caminho pelos inimigos, confiando em durabilidade impressionante sem técnicas complicadas ou treinamento rígido. Suas fúrias vêm de um instinto feroz — animal, espírito ou parte de você. Para muitos bárbaros, força bruta é um martelo e todo problema parece prego; outros contêm a tempestade e só a liberam quando importa.',
    duringCombat:
      'Você convoca a fúria e corre para a linha de frente. Ofensa é sua melhor defesa — precisa derrubar inimigos antes que explorem suas defesas relativamente baixas.',
    duringSocial:
      'Usa intimidação para obter o que precisa, sobretudo quando persuasão mais suave não resolve.',
    whileExploring:
      'Fica atento ao perigo, pronto para investir de cabeça. Escala a parede difícil e joga corda para os outros; entra nas correntes arriscadas. Se algo precisa ser quebrado, você está a postos.',
    inDowntime:
      'Pode ir a uma taverna festejar, construir a lenda temível de seus feitos, ou recrutar seguidores e tornar-se um senhor da guerra.',
    youMight: [
      'Ter um poço profundo de raiva, ódio ou frustração.',
      'Preferir abordagem direta a uma que exija paciência e tediosidade.',
      'Manter um regime intenso de condicionamento físico.',
    ],
    othersProbably: [
      'Contam com sua coragem e força, e confiam que você se vira na luta.',
      'Veem você como incivilizado ou um rude inadequado à alta sociedade.',
      'Acreditam que você é leal a amigos e aliados e nunca desiste até o fim da luta.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Enfurecer-se',
        'Temperamento Explosivo',
        'Instinto',
        'Feito de bárbaro',
      ],
    },
    { level: 2, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Passos Furiosos', 'Feito geral', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Brutalidade',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Feito geral',
        'Juggernaut',
        'Aumento de perícia',
        'Especialização em Arma',
      ],
    },
    { level: 8, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Resistência em Fúria',
        'Expertise em Reflexos',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de bárbaro', 'Feito de perícia'],
    },
    {
      level: 11,
      features: ['Feito geral', 'Fúria Poderosa', 'Aumento de perícia'],
    },
    { level: 12, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Juggernaut Maior',
        'Expertise em Armadura Média',
        'Aumento de perícia',
        'Maestria em Arma',
      ],
    },
    { level: 14, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Especialização Maior em Arma',
        'Vontade Indomável',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Maestria em Percepção',
        'Fúria Revitalizante',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de bárbaro', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Maestria em Armadura',
        'Devastador',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de bárbaro', 'Feito de perícia'],
    },
  ],
  extraTables: [
    {
      id: 'barbarian-rage-damage',
      title: 'Dano extra da Fúria',
      subtitle: 'Player Core 2',
      caption:
        'Valores da habilidade do instinto (não o +2 base de Enfurecer-se). Animal: só nos ataques desarmados do animal. Dragão/espírito/elemental: se você optar pelo tipo especial. Decadência: Fúria Putrefata (e dano em você 1 / 5 / 10). Lenhoso: Fúria de Madeira (−3 m). Gigante: empunhando a arma maior. Superstição: 4 / 8 / 16 contra quem você viu conjurar na última hora.',
      columns: [
        { key: 'instinct', label: 'Instinto' },
        { key: 'l1', label: '1º', align: 'center' },
        { key: 'l7', label: '7º', align: 'center' },
        { key: 'l15', label: '15º', align: 'center' },
      ],
      rows: [
        { key: 'rage-animal', cells: ['Animal (ataques do animal)', '2', '5', '12'] },
        { key: 'rage-dragon', cells: ['Dracônico (fúria dracônica)', '4', '8', '16'] },
        { key: 'rage-elemental', cells: ['Elemental (fúria elemental)', '4', '6', '12'] },
        { key: 'rage-decay', cells: ['Decadência (fúria putrefata)', '6', '10', '18'] },
        { key: 'rage-ligneous', cells: ['Lenhoso (fúria de madeira)', '6', '10', '18'] },
        { key: 'rage-fury', cells: ['Fúria', '3', '7', '13'] },
        { key: 'rage-giant', cells: ['Gigante (arma maior)', '6', '10', '18'] },
        { key: 'rage-spirit', cells: ['Espiritual (fúria espiritual)', '3', '7', '13'] },
        { key: 'rage-superstition', cells: ['Superstição', '3', '7', '13'] },
      ],
    },
    {
      id: 'barbarian-animal-instincts',
      title: 'Instintos Animais',
      subtitle: 'Player Core 2',
      caption:
        'Enquanto enfurecido, você ganha o(s) ataque(s) do animal escolhido (grupo briga) e não pode usar armas. No 7º o dado sobe 1 passo. Traços em português: ágil, agarrar, empurrar, derrubar, desarmado.',
      columns: [
        { key: 'animal', label: 'Animal' },
        { key: 'attack', label: 'Ataque' },
        { key: 'damage', label: 'Dano', align: 'center' },
        { key: 'traits', label: 'Traços' },
      ],
      rows: [
        { key: 'ape', cells: ['Macaco', 'Punho', '1d10 concussão', 'agarrar, desarmado'] },
        { key: 'bear-jaws', cells: ['Urso', 'Mandíbulas', '1d10 perfurante', 'desarmado'] },
        { key: 'bear-claw', cells: ['Urso', 'Garra', '1d6 cortante', 'ágil, desarmado'] },
        { key: 'bull', cells: ['Touro', 'Chifre', '1d10 perfurante', 'empurrar, desarmado'] },
        { key: 'cat-jaws', cells: ['Felino', 'Mandíbulas', '1d10 perfurante', 'desarmado'] },
        { key: 'cat-claw', cells: ['Felino', 'Garra', '1d6 cortante', 'ágil, desarmado'] },
        { key: 'deer', cells: ['Cervo', 'Galhada', '1d10 perfurante', 'agarrar, desarmado'] },
        { key: 'frog-jaws', cells: ['Sapo', 'Mandíbulas', '1d10 concussão', 'desarmado'] },
        { key: 'frog-tongue', cells: ['Sapo', 'Língua', '1d4 concussão', 'ágil, desarmado'] },
        { key: 'shark', cells: ['Tubarão', 'Mandíbulas', '1d10 perfurante', 'agarrar, desarmado'] },
        { key: 'snake', cells: ['Serpente', 'Presas', '1d10 perfurante', 'agarrar, desarmado'] },
        { key: 'wolf', cells: ['Lobo', 'Mandíbulas', '1d10 perfurante', 'derrubar, desarmado'] },
      ],
    },
    {
      id: 'barbarian-animal-instincts-howl',
      title: 'Instintos Animais (Howl of the Wild)',
      subtitle: 'Howl of the Wild',
      caption:
        'Opções extras de animal. Teia da aranha: sem dano; segundo acerto com a penalidade de velocidade imobiliza até Escapar contra a CD de classe.',
      columns: [
        { key: 'animal', label: 'Animal' },
        { key: 'attack', label: 'Ataque' },
        { key: 'damage', label: 'Dano', align: 'center' },
        { key: 'traits', label: 'Traços' },
      ],
      rows: [
        { key: 'ankylosaurus', cells: ['Anquilossauro', 'Cauda', '1d10 concussão', 'raze, desarmado'] },
        { key: 'ant', cells: ['Formiga', 'Mandíbulas', '1d10 perfurante', 'agarrar, desarmado'] },
        { key: 'bat-fangs', cells: ['Morcego', 'Presas', '1d10 perfurante', 'desarmado'] },
        { key: 'bat-wings', cells: ['Morcego', 'Asas', '1d4 perfurante', 'aparar, desarmado'] },
        { key: 'bird-beak', cells: ['Ave', 'Bico', '1d10 perfurante', 'desarmado'] },
        { key: 'bird-talon', cells: ['Ave', 'Garra', '1d6 cortante', 'ágil, desarmado'] },
        { key: 'brontosaurus', cells: ['Brontossauro', 'Cauda', '1d10 concussão', 'derrubar, desarmado'] },
        { key: 'crab-big', cells: ['Caranguejo', 'Pinça grande', '1d10 concussão', 'raze, desarmado'] },
        { key: 'crab-claw', cells: ['Caranguejo', 'Pinça', '1d4 cortante', 'aparar, desarmado'] },
        { key: 'crocodile-jaws', cells: ['Crocodilo', 'Mandíbulas', '1d10 perfurante', 'desarmado'] },
        { key: 'crocodile-tail', cells: ['Crocodilo', 'Cauda', '1d6 concussão', 'ágil, desarmado'] },
        { key: 'orca', cells: ['Orca', 'Mandíbulas', '1d8 perfurante', 'impetuoso, desarmado'] },
        { key: 'scorpion-stinger', cells: ['Escorpião', 'Aguilhão', '1d6 perfurante', 'alcance, desarmado, venenoso'] },
        { key: 'scorpion-pincer', cells: ['Escorpião', 'Pinça', '1d4 cortante', 'aparar, desarmado'] },
        { key: 'seal', cells: ['Foca', 'Mandíbulas', '1d10 perfurante', 'agarrar, desarmado'] },
        { key: 'spider-fangs', cells: ['Aranha', 'Presas', '1d8 perfurante', 'agarrar, desarmado, venenoso'] },
        { key: 'spider-web', cells: ['Aranha', 'Teia', 'especial', 'incremento 4,5 m'] },
        { key: 'tyrannosaurus-jaws', cells: ['Tiranossauro', 'Mandíbulas', '1d8 perfurante', 'mortal d12, desarmado'] },
        { key: 'tyrannosaurus-tail', cells: ['Tiranossauro', 'Cauda', '1d6 concussão', 'ágil, desarmado'] },
        { key: 'wasp', cells: ['Vespa', 'Aguilhão', '1d4 perfurante', 'traidor, mortal d8, desarmado, venenoso'] },
      ],
    },
    {
      id: 'barbarian-dragon-instincts',
      title: 'Instintos Dracônicos',
      subtitle: 'Player Core 2 / Monster Core',
      caption:
        'Escolha o tipo ao pegar o instinto. A fúria dracônica pode mudar o dano extra para o tipo do sopro e ganha o traço da tradição. O mestre pode permitir outros dragões.',
      columns: [
        { key: 'dragon', label: 'Dragão' },
        { key: 'tradition', label: 'Tradição', align: 'center' },
        { key: 'breath', label: 'Sopro' },
      ],
      rows: [
        { key: 'adamantine', cells: ['Adamantina', 'Primal', 'Concussão'] },
        { key: 'conspirator', cells: ['Conspirador', 'Oculta', 'Veneno'] },
        { key: 'diabolic', cells: ['Diabólico', 'Divina', 'Fogo'] },
        { key: 'empyreal', cells: ['Empíreo', 'Divina', 'Espírito'] },
        { key: 'fortune', cells: ['Fortuna', 'Arcana', 'Força'] },
        { key: 'horned', cells: ['Chifrudo', 'Primal', 'Veneno'] },
        { key: 'mirage', cells: ['Miragem', 'Arcana', 'Mental'] },
        { key: 'omen', cells: ['Presságio', 'Oculta', 'Mental'] },
      ],
    },
    {
      id: 'barbarian-elemental-instincts',
      title: 'Instintos Elementais',
      subtitle: 'Rage of Elements',
      caption:
        'Se o elemento tiver dois tipos de dano, escolha um ao pegar o instinto. A Fúria Elemental usa esse tipo.',
      columns: [
        { key: 'element', label: 'Elemento' },
        { key: 'trait', label: 'Traço', align: 'center' },
        { key: 'damage', label: 'Dano' },
      ],
      rows: [
        { key: 'air', cells: ['Ar', 'Ar', 'Eletricidade ou corte'] },
        { key: 'earth', cells: ['Terra', 'Terra', 'Contusão ou perfuração'] },
        { key: 'fire', cells: ['Fogo', 'Fogo', 'Fogo'] },
        { key: 'metal', cells: ['Metal', 'Metal', 'Perfuração ou corte'] },
        { key: 'water', cells: ['Água', 'Água', 'Contusão ou frio'] },
        { key: 'wood', cells: ['Madeira', 'Madeira', 'Contusão ou perfuração'] },
      ],
    },
  ],
  features: [
    {
      id: 'barbarian-rage',
      name: 'Enfurecer-se',
      originalName: 'Rage',
      level: 1,
      actionType: 'one',
      description:
        'Você acessa a fúria interior e começa a enfurecer-se. Ganha PV temporários iguais ao seu nível + modificador de Constituição. Enquanto enfurecido: +2 de dano em Golpes corpo a corpo (metade se a arma/ataque desarmado for ágil); não pode usar ações com o traço concentrate a menos que também tenham o traço rage (pode Buscar). A fúria dura 1 minuto, até você ficar inconsciente ou o encontro acabar (o que vier primeiro). Não pode parar voluntariamente. Ao parar, perde PV temporários restantes da Fúria e não pode ganhar PV temporários de Enfurecer-se de novo por 1 minuto.',
    },
    {
      id: 'barbarian-quick-tempered',
      name: 'Temperamento Explosivo',
      originalName: 'Quick-Tempered',
      level: 1,
      actionType: 'free',
      trigger: 'Você rola iniciativa.',
      description:
        'Requisitos: você não está sobrecarregado nem vestindo armadura pesada. Contanto que possa mover-se livremente, sua fúria é instintiva e instantânea. Você Enfurece-se.',
    },
    {
      id: 'barbarian-instinct',
      name: 'Instinto',
      originalName: 'Instinct',
      level: 1,
      description:
        'Sua fúria emerge de um instinto dominante. Ele concede uma habilidade, exige evitar certos comportamentos (quando aplicável), aumenta dano e resistências em níveis altos, e permite feitos ligados ao instinto.',
      effects: [
        {
          kind: 'featureChoice',
          choiceId: 'animal-instinct',
          label: 'Animal do instinto',
          whenSubclassIds: ['instinct-animal'],
          hint: 'Player Core 2 e Enquanto enfurecido; grupo briga. O motor não escolhe.',
          options: ANIMAL_INSTINCT_OPTIONS,
        },
        {
          kind: 'featureChoice',
          choiceId: 'dragon-instinct',
          label: 'Tipo de dragão',
          whenSubclassIds: ['instinct-dragon'],
          hint: 'Tradição e sopro entram na Fúria Dracônica. O motor não escolhe.',
          options: DRAGON_INSTINCT_OPTIONS,
        },
        {
          kind: 'featureChoice',
          choiceId: 'elemental-instinct',
          label: 'Elemento do instinto',
          whenSubclassIds: ['instinct-elemental'],
          hint: 'Se houver dois tipos de dano, escolha um. O motor não escolhe.',
          options: ELEMENTAL_INSTINCT_OPTIONS,
        },
        {
          kind: 'grantedFeatChoice',
          choiceId: 'fury-bonus-feat',
          label: 'Feito bônus da fúria',
          whenSubclassIds: ['instinct-fury'],
          hint: 'Feito de bárbaro de 1º extra — não gasta o slot. O motor não escolhe.',
          featIds: FURY_BONUS_FEAT_IDS,
        },
      ],
    },
    {
      id: 'barbarian-feat-1',
      name: 'Feito de Bárbaro',
      originalName: 'Barbarian Feat',
      level: 1,
      description:
        'No 1º nível e em cada nível par, você ganha um feito de classe de bárbaro.',
    },
    {
      id: 'barbarian-furious-footfalls',
      name: 'Passos Furiosos',
      originalName: 'Furious Footfalls',
      level: 3,
      description:
        'O impulso de lutar o empurra para frente. Você ganha +1,5 m de bônus de status à Velocidade. Este bônus sobe para +3 m enquanto estiver enfurecido.',
    },
    {
      id: 'barbarian-brutality',
      name: 'Brutalidade',
      originalName: 'Brutality',
      level: 5,
      description:
        'Sua fúria torna as armas letais. Proficiência em armas simples, marciais e ataques desarmados sobe para especialista. Enquanto enfurecido, tem os benefícios de especialização crítica para armas corpo a corpo e ataques desarmados.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'barbarian-juggernaut',
      name: 'Juggernaut',
      originalName: 'Juggernaut',
      level: 7,
      description:
        'Seu corpo está acostumado a privações físicas. Proficiência em Fortitude sobe para mestre. Em sucesso em salvaguarda de Fortitude, vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'barbarian-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        'Você causa +2 de dano com armas e ataques desarmados em que for especialista (+3 mestre, +4 lendário). Também ganha a habilidade de especialização do seu instinto.',
    },
    {
      id: 'barbarian-raging-resistance',
      name: 'Resistência em Fúria',
      originalName: 'Raging Resistance',
      level: 9,
      description:
        'Enquanto enfurecido, você ganha resistência igual a 3 + modificador de Constituição a tipos de dano baseados no seu instinto.',
      effects: [
        {
          kind: 'featureChoice',
          choiceId: 'giant-raging-resistance',
          label: 'Resistência do gigante',
          whenSubclassIds: ['instinct-giant'],
          hint: 'Contusão + o tipo escolhido, só em fúria. O motor não escolhe.',
          options: [
            {
              id: 'cold',
              name: 'Frio',
              originalName: 'Cold',
              description:
                'Em fúria: resistência 3 + CON a contusão e a frio.',
            },
            {
              id: 'electricity',
              name: 'Eletricidade',
              originalName: 'Electricity',
              description:
                'Em fúria: resistência 3 + CON a contusão e a eletricidade.',
            },
            {
              id: 'fire',
              name: 'Fogo',
              originalName: 'Fire',
              description:
                'Em fúria: resistência 3 + CON a contusão e a fogo.',
            },
          ],
        },
        {
          kind: 'featureChoice',
          choiceId: 'superstition-raging-resistance',
          label: 'Tradições da superstição',
          whenSubclassIds: ['instinct-superstition'],
          hint: 'A resistência vale contra magias dessas duas tradições. O motor não escolhe.',
          options: [
            {
              id: 'arcane-occult',
              name: 'Arcana e Oculta',
              originalName: 'Arcane and Occult',
              description:
                'Em fúria: resistência 3 + CON a dano de magias arcanas ou ocultas, qualquer tipo.',
            },
            {
              id: 'arcane-primal',
              name: 'Arcana e Primal',
              originalName: 'Arcane and Primal',
              description:
                'Em fúria: resistência 3 + CON a dano de magias arcanas ou primais, qualquer tipo.',
            },
            {
              id: 'divine-occult',
              name: 'Divina e Oculta',
              originalName: 'Divine and Occult',
              description:
                'Em fúria: resistência 3 + CON a dano de magias divinas ou ocultas, qualquer tipo.',
            },
            {
              id: 'divine-primal',
              name: 'Divina e Primal',
              originalName: 'Divine and Primal',
              description:
                'Em fúria: resistência 3 + CON a dano de magias divinas ou primais, qualquer tipo.',
            },
          ],
        },
      ],
    },
    {
      id: 'barbarian-reflex-expertise',
      name: 'Expertise em Reflexos',
      originalName: 'Reflex Expertise',
      level: 9,
      description:
        'Você desenvolveu jeito para esquivar do perigo. Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'barbarian-mighty-rage',
      name: 'Fúria Poderosa',
      originalName: 'Mighty Rage',
      level: 11,
      description:
        'Sua fúria se intensifica. A CD de classe de bárbaro sobe para especialista. Além disso, ao usar Temperamento Explosivo, o primeiro Golpe que fizer no seu primeiro turno causa dano adicional igual ao seu dano de Fúria.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'barbarian-greater-juggernaut',
      name: 'Juggernaut Maior',
      originalName: 'Greater Juggernaut',
      level: 13,
      description:
        'Fisiologia robusta. Proficiência em Fortitude sobe para lendária. Em falha crítica em Fortitude, vira falha. Em falha em Fortitude contra efeito que causa dano, reduz o dano pela metade.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'legendary' }],
    },
    {
      id: 'barbarian-medium-armor-expertise',
      name: 'Expertise em Armadura Média',
      originalName: 'Medium Armor Expertise',
      level: 13,
      description:
        'Proficiências em armadura leve, média e defesa sem armadura sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'barbarian-weapon-mastery',
      name: 'Maestria em Arma',
      originalName: 'Weapon Mastery',
      level: 13,
      description:
        'Proficiências em armas simples, marciais e ataques desarmados sobem para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'barbarian-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização sobe para +4 (especialista), +6 (mestre) e +8 (lendário). Você ganha o benefício maior da especialização do instinto.',
    },
    {
      id: 'barbarian-indomitable-will',
      name: 'Vontade Indomável',
      originalName: 'Indomitable Will',
      level: 15,
      description:
        'Sua fúria dificulta controlá-lo. Proficiência em Vontade sobe para mestre. Em sucesso em salvaguarda de Vontade, vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'barbarian-perception-mastery',
      name: 'Maestria em Percepção',
      originalName: 'Perception Mastery',
      level: 17,
      description:
        'Seu instinto aguça ainda mais os sentidos. Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'barbarian-revitalizing-rage',
      name: 'Fúria Revitalizante',
      originalName: 'Revitalizing Rage',
      level: 17,
      description:
        'Em vez de esperar 1 minuto para ganhar PV temporários de Enfurecer-se de novo, basta passar pelo menos um turno completo sem estar enfurecido.',
    },
    {
      id: 'barbarian-armor-mastery',
      name: 'Maestria em Armadura',
      originalName: 'Armor Mastery',
      level: 19,
      description:
        'Proficiências em armadura leve, média e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'barbarian-devastator',
      name: 'Devastador',
      originalName: 'Devastator',
      level: 19,
      description:
        'CD de classe sobe para mestre. Seus Golpes corpo a corpo ignoram até 10 de resistência ao dano físico que causam.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=57',
}
