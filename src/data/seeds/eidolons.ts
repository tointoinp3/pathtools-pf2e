import type { AttributeId } from '@/types'
import type {
  EidolonNamedArray,
  EidolonTypeDefinition,
} from '@/types/companion'

function attrs(
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,
): Pick<
  Record<AttributeId, number>,
  'constitution' | 'intelligence' | 'wisdom' | 'charisma'
> {
  return { constitution, intelligence, wisdom, charisma }
}

function named(
  id: string,
  name: string,
  originalName: string,
  strength: number,
  dexterity: number,
  constitution: number,
  intelligence: number,
  wisdom: number,
  charisma: number,
  acItemBonus: number,
  dexCap: number,
): EidolonNamedArray {
  return {
    id,
    name,
    originalName,
    attributes: {
      strength,
      dexterity,
      constitution,
      intelligence,
      wisdom,
      charisma,
    },
    acItemBonus,
    dexCap,
  }
}

/**
 * Eidolons Remaster: Impossible Magic + Rage of Elements + Battlecry!
 * Pula Secrets of Magic / Book of the Dead legado.
 */
export const EIDOLON_TYPES: EidolonTypeDefinition[] = [
  {
    id: 'eidolon-aberrant',
    name: 'Aberração',
    originalName: 'Aberrant',
    description:
      'Pesadelo incompreensível no molde dos Deuses Exteriores. Quase ninguém consegue olhar sem dor de cabeça — você já se imunizou.',
    source: 'Impossible Magic pg. 70',
    sourcePage: 70,
    tradition: 'occult',
    sizeOptions: ['medium', 'small'],
    traits: ['aberration', 'eidolon'],
    homePlane: 'Dimensão dos Sonhos ou o Universo',
    language: 'Aklo',
    skills: ['athletics', 'occultism'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'garra (cortante), mandíbulas (perfurante), tentáculo (contundente)',
    attributes: attrs(2, 1, 1, -1),
    initialAbility: {
      name: 'Anatomia Surpreendente',
      originalName: 'Surprising Anatomy',
      actionType: 'reaction',
      description:
        'Gatilho: inimigo adjacente causa dano ao eidolon. Efeito: o eidolon faz um Golpe desarmado corpo a corpo contra o gatilho.',
    },
    symbiosisAbility: {
      name: 'Mente Insondável',
      originalName: 'Unfathomable Mind',
      description:
        '7º. Quem toca a mente do eidolon se estilhaça: sucesso num save mental contra uma criatura causa 4d6 mental (save básico de Vontade vs sua CD de magia); falha também atordoado 1 (falha crítica 2). +1d6 a cada 2 níveis a partir do 9º.',
    },
    transcendenceAbility: {
      name: 'Sussurros Enlouquecedores',
      originalName: 'Maddening Whispers',
      description:
        '17º. Conjura Canção Insondável 1×/dia como magia inata oculta. Pode Sustentar como ação livre se Distanciar em direção a um alvo.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=14',
  },
  {
    id: 'eidolon-angel',
    name: 'Anjo',
    originalName: 'Angel',
    description:
      'Mensageiro celestial com um recado só seu para o mundo mortal. Asas, halo, olhos de luz — ou um servos menor como o cassisiano.',
    source: 'Impossible Magic pg. 71',
    sourcePage: 71,
    tradition: 'divine',
    sizeOptions: ['medium', 'small'],
    traits: ['angel', 'celestial', 'eidolon', 'holy'],
    homePlane: 'Elísio, Céu ou Nirvana',
    language: 'Empíreo',
    skills: ['diplomacy', 'religion'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'punho (contundente), asa (contundente), ataques em forma de arma',
    attributes: attrs(1, -1, 1, 2),
    initialAbility: {
      name: 'Golpes Sagrados',
      originalName: 'Hallowed Strikes',
      description:
        'Golpes desarmados ganham santo e +1 de dano de espírito contra ímpios e fraqueza a santo. Pode fazer ataques não letais sem a penalidade −2.',
    },
    symbiosisAbility: {
      name: 'Aura do Viajante',
      originalName: "Traveler's Aura",
      description:
        '7º. Emanação de 6 m: você, o eidolon e aliados protegidos de calor/frio severos; o eidolon nunca fica desprevenido contra criaturas de nível menor na aura. Na transcendência, protege de dano ambiental de qualquer plano.',
    },
    transcendenceAbility: {
      name: 'Misericórdia Angélica',
      originalName: 'Angelic Mercy',
      description:
        '17º. Purificar Aflição, Clarear a Mente e Curar 1×/dia cada como magias inatas divinas de 9º posto.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=15',
  },
  {
    id: 'eidolon-anger-phantom',
    name: 'Fantasma da Ira',
    originalName: 'Anger Phantom',
    description:
      'Alma presa ao mundo por raiva ou rancor. O vínculo impede que vire morto-vivo — vocês decidem se controlam a fúria ou a canalizam.',
    source: 'Impossible Magic pg. 71',
    sourcePage: 71,
    tradition: 'occult',
    sizeOptions: ['medium', 'small'],
    traits: ['eidolon', 'ethereal', 'phantom'],
    homePlane: 'Plano Etéreo',
    language: 'um idioma mortal comum que falava em vida',
    skills: ['intimidation', 'occultism'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'punho (contundente), tendão (contundente), ataques em forma de arma',
    attributes: attrs(3, 0, -1, 1),
    initialAbility: {
      name: 'Golpe Furioso',
      originalName: 'Furious Strike',
      actionType: 'two',
      description:
        'Golpe corpo a corpo. Conta como 2 ataques na PAM. Se acertar: +1 dado de dano da arma e +1 de circunstância no dano.',
    },
    symbiosisAbility: {
      name: 'Frenesi Fervente',
      originalName: 'Seething Frenzy',
      actionType: 'one',
      description:
        '7º. Sob efeito de Impulsionar Eidolon, PV temporários = seu nível, −1 na CA. Não encerra de propósito. 1 minuto ou até desmanifestar; depois 1 min de espera. Golpe Furioso no frenesi: bônus de Impulsionar = 3 por dado.',
    },
    transcendenceAbility: {
      name: 'Aura de Ira',
      originalName: 'Anger Aura',
      description:
        '17º. Emanação de 6 m: resistências de todos (aliados e inimigos) −10. Ação de concentrar reduz a aura só ao eidolon; repetir restaura. Fúria de bárbaro e similares ignoram a aura.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=16',
  },
  {
    id: 'eidolon-beast',
    name: 'Besta',
    originalName: 'Beast',
    description:
      'Força da natureza em forma de besta mágica — às vezes vários animais numa só criatura. Guardião do lar contra quem o despoja.',
    source: 'Impossible Magic pg. 73',
    sourcePage: 73,
    tradition: 'primal',
    sizeOptions: ['medium'],
    traits: ['beast', 'eidolon'],
    homePlane: 'O Universo',
    language: 'Feérico',
    skills: ['intimidation', 'nature'],
    senses: ['visão na penumbra'],
    speeds: { land: 25 },
    suggestedAttacks: 'garra, presas, casco, chifre, mandíbulas',
    attributes: attrs(3, -1, 1, 0),
    initialAbility: {
      name: 'Investida da Besta',
      originalName: "Beast's Charge",
      actionType: 'two',
      description:
        'Distanciar duas vezes e Golpear. Se andou 6 m em linha reta para longe do ponto inicial: +1 de circunstância no ataque.',
    },
    symbiosisAbility: {
      name: 'Rugido Primevo',
      originalName: 'Primal Roar',
      actionType: 'two',
      description:
        '7º. Desmoralizar cada inimigo que ouvir, um único teste de Intimidação contra a CD de Vontade de cada um; sem penalidade por idioma.',
    },
    transcendenceAbility: {
      name: 'Malho Redemoinho',
      originalName: 'Whirlwind Maul',
      actionType: 'two',
      description:
        '17º. Até 4 Golpes desarmados corpo a corpo em inimigos no alcance (ataques diferentes ok). Cada um conta na PAM, mas a penalidade só sobe no fim.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=17',
  },
  {
    id: 'eidolon-construct',
    name: 'Construto',
    originalName: 'Construct',
    description:
      'Forma astral ganha corpo pela sua vida. Relógio, boneco, o que a imaginação dos dois aguentar — e muda com as evoluções.',
    source: 'Impossible Magic pg. 73',
    sourcePage: 73,
    tradition: 'arcane',
    sizeOptions: ['medium'],
    traits: ['astral', 'construct', 'eidolon'],
    homePlane: 'Plano Astral',
    language: 'um idioma mortal comum',
    skills: ['arcana', 'crafting'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'punho (contundente)',
    attributes: attrs(3, 1, 0, -1),
    initialAbility: {
      name: 'Coração Construto',
      originalName: 'Construct Heart',
      description:
        'É criatura viva (sem imunidades de construto), mas +2 de circunstância em saves vs morte, doença, veneno, espírito, fatigado e enjoado. Sangramento persistente: CD 10 (5 com ajuda boa).',
    },
    symbiosisAbility: {
      name: 'Evolução Reconfigurada',
      originalName: 'Reconfigured Evolution',
      description:
        '7º. Um feito de evolução extra de 6º ou menos. Retreino em 1 dia com teste de Artesanato (DC padrão do nível do eidolon). Muitos pegam Ira do Eidolon.',
    },
    transcendenceAbility: {
      name: 'Reconfiguração Máxima',
      originalName: 'Ultimate Reconfiguration',
      description:
        '17º. Outro feito de evolução de 16º ou menos, retreinável igual. Muitos pegam Sentidos Sempre Vigilantes.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=18',
  },
  {
    id: 'eidolon-demon',
    name: 'Demônio',
    originalName: 'Demon',
    description:
      'Pecado mortal coagulado nas Fendas Exteriores. Escolha o pecado associado. O pacto com você costuma ser honrado — e ainda assim puxa você para aquele pecado.',
    source: 'Impossible Magic pg. 74',
    sourcePage: 74,
    tradition: 'divine',
    sizeOptions: ['medium', 'small'],
    traits: ['demon', 'eidolon', 'fiend', 'unholy'],
    homePlane: 'As Fendas Exteriores',
    language: 'Ctoniano',
    skills: ['intimidation', 'religion'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'garra, chifre, mandíbulas, cauda, tentáculo, asa',
    attributes: attrs(3, 0, -1, 1),
    initialAbility: {
      name: 'Golpes Demoníacos',
      originalName: 'Demonic Strikes',
      description:
        'Desarmados ganham ímpio e +1 espírito contra santos e fraqueza a ímpio. Um ataque físico ganha versátil B, P ou S (sua escolha).',
    },
    symbiosisAbility: {
      name: 'Visões do Pecado',
      originalName: 'Visions of Sin',
      actionType: 'two',
      description:
        '7º. 1×/10 min. Alvo a 9 m: Vontade vs CD de magia. Ímpio −2 de circunstância. Crítico: nada. Sucesso: sem reações. Falha: lentificado 1 e sem reações. Falha crítica: + confuso 1 rodada. Sustentável até 1 min. Imune 1 dia.',
    },
    transcendenceAbility: {
      name: 'Decreto Blasfemo',
      originalName: 'Blasphemous Decree',
      description:
        '17º. Decreto Divino 1×/dia (9º; 10º no 19º). Você não é afetado.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=19',
  },
  {
    id: 'eidolon-devotion-phantom',
    name: 'Fantasma da Devoção',
    originalName: 'Devotion Phantom',
    description:
      'Alma que não parte por dever, lealdade ou uma tarefa inacabada. Juntos vocês cumprem essa devoção.',
    source: 'Impossible Magic pg. 75',
    sourcePage: 75,
    tradition: 'occult',
    sizeOptions: ['medium', 'small'],
    traits: ['eidolon', 'ethereal', 'phantom'],
    homePlane: 'Plano Etéreo',
    language: 'um idioma mortal comum que falava em vida',
    skills: ['medicine', 'occultism'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'punho, tendão, ataques em forma de arma',
    attributes: attrs(3, 0, 0, 0),
    initialAbility: {
      name: 'Retaliação Deverosa',
      originalName: 'Dutiful Retaliation',
      actionType: 'reaction',
      description:
        'Gatilho: inimigo a 4,5 m acerta você com Golpe e causa dano. Requisito: eidolon a 4,5 m de você. Efeito: Golpe desarmado corpo a corpo no gatilho, mesmo fora do alcance.',
    },
    symbiosisAbility: {
      name: 'Devoção Firme',
      originalName: 'Steadfast Devotion',
      description:
        '7º. +2 de circunstância em saves mentais; sucesso vira crítico. Com Resolução Compartilhada, falha crítica mental vira falha.',
    },
    transcendenceAbility: {
      name: 'Aura de Devoção',
      originalName: 'Devotion Aura',
      description:
        '17º. Emanação 6 m: quando um aliado (incluindo você) na aura sofre dano, reduz 6; você perde PV iguais à metade do reduzido.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=20',
  },
  {
    id: 'eidolon-dragon',
    name: 'Dragão',
    originalName: 'Dragon',
    description:
      'Eco astral de uma mente dracônica. Escolha a tradição (arcana, divina, oculta ou primeva) — o traço do eidolon acompanha. Juntos, rumo a arquidragão.',
    source: 'Impossible Magic pg. 75',
    sourcePage: 75,
    sizeOptions: ['medium'],
    traits: ['astral', 'dragon', 'eidolon'],
    homePlane: 'Plano Astral',
    language: 'Dracônico',
    skills: ['intimidation'],
    traditionSkillByTradition: {
      arcane: 'arcana',
      divine: 'religion',
      occult: 'occultism',
      primal: 'nature',
    },
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'garra, chifre, mandíbulas, cauda, asa',
    attributes: attrs(1, 1, 0, 1),
    initialAbility: {
      name: 'Sopro do Dragão',
      originalName: 'Dragon Breath',
      actionType: 'two',
      description:
        '1d6 numa área (linha 18 m ou cone 9 m) com Reflexos básico vs CD de magia. Depois 1d4 rodadas. +1d6 no 3º e a cada 2 níveis. Tipo: ácido, frio, eletricidade, fogo, perfurante, veneno ou vazio; ou força (arcano), espírito (divino), mental (oculto).',
    },
    symbiosisAbility: {
      name: 'Frenesi Dracônico',
      originalName: 'Draconic Frenzy',
      actionType: 'two',
      description:
        '7º. 1 Golpe primário + 2 secundários (qualquer ordem). Crítico num inimigo recupera o Sopro na hora.',
    },
    transcendenceAbility: {
      name: 'Sopro Potencializado',
      originalName: 'Empower Breath',
      actionType: 'free',
      description:
        '17º. 1×/min. Se a próxima ação for Sopro do Dragão, dobra dados e área.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=21',
  },
  {
    id: 'eidolon-elemental',
    name: 'Elemental',
    originalName: 'Elemental',
    description:
      'Matéria elemental com mente, sem forma própria até você emprestar a vida. Núcleo: ar, terra, fogo, metal, água ou madeira.',
    source: 'Rage of Elements pg. 38',
    sourcePage: 38,
    tradition: 'primal',
    sizeOptions: ['medium'],
    traits: ['eidolon', 'elemental'],
    homePlane: 'plano elemental do Núcleo',
    language: 'conforme o elemento (Sussurano, Petrano, Pírico, Talicano, Talássico ou Muan)',
    skills: ['nature', 'survival'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'ramo, punho, espinho, tendão, onda (todos contundentes ou perfurante)',
    namedArrays: [
      named(
        'adaptable',
        'Elemental Adaptável',
        'Adaptable Elemental',
        1,
        4,
        3,
        0,
        1,
        0,
        1,
        4,
      ),
      named(
        'primordial',
        'Elemental Primordial',
        'Primordial Elemental',
        4,
        2,
        3,
        -1,
        1,
        0,
        2,
        3,
      ),
    ],
    initialAbility: {
      name: 'Núcleo Elemental',
      originalName: 'Elemental Core',
      description:
        'Escolha ar, terra, fogo, metal, água ou madeira. +2 vs veneno, sono e paralisado; sangramento persistente CD 10. Efeitos extras conforme o elemento (salto duplo, anti-empurrão, resistência a fogo, versátil, natação, planta/cura no Refocus…).',
    },
    symbiosisAbility: {
      name: 'Rajada Elemental',
      originalName: 'Elemental Burst',
      description: '7º. O eidolon ganha a atividade Rajada Elemental (projéteis do próprio corpo).',
    },
    transcendenceAbility: {
      name: 'Redemoinho Elemental',
      originalName: 'Elemental Maelstrom',
      description:
        '17º. Vórtice de matéria elemental: atravessa o campo e danifica o caminho.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=12',
  },
  {
    id: 'eidolon-fey',
    name: 'Feérico',
    originalName: 'Fey',
    description:
      'Ser caprichoso do Primeiro Mundo. Feéricos não morrem de verdade — o seu provavelmente acabou de reincarnar, com fragmentos da vida anterior.',
    source: 'Impossible Magic pg. 75',
    sourcePage: 75,
    tradition: 'primal',
    sizeOptions: ['small', 'medium'],
    traits: ['eidolon', 'fey'],
    homePlane: 'Primeiro Mundo',
    language: 'Feérico',
    skills: ['deception', 'nature'],
    senses: ['visão na penumbra'],
    speeds: { land: 25 },
    suggestedAttacks: 'punho, asa, ataques em forma de arma',
    attributes: attrs(0, 1, -1, 3),
    initialAbility: {
      name: 'Dádivas Feéricas',
      originalName: 'Fey Gift Spells',
      description:
        'No repertório pode pegar ilusão/mental da lista arcana (continuam primais). Ganha o feito Substituto Mágico (não retreinável) e pode escolher truques de dádiva.',
    },
    symbiosisAbility: {
      name: 'Travessura Feérica',
      originalName: 'Fey Mischief',
      description: '7º. Ganha Adepto Mágico (mesmo sem o nível) e pode escolher magias de dádiva.',
    },
    transcendenceAbility: {
      name: 'Ardil Feérico',
      originalName: 'Fey Chicanery',
      description:
        '17º. Nas preparações o eidolon lança Contingência (magia de 4º primeva ou dádiva, comum ou com acesso).',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=22',
  },
  {
    id: 'eidolon-ooze',
    name: 'Gosma',
    originalName: 'Ooze',
    description:
      'Protoplasma preso por magia e pela sua mente. Não é sem mente — mas a personalidade pode ser só gorgolejos.',
    source: 'Impossible Magic pg. 76',
    sourcePage: 76,
    tradition: 'arcane',
    sizeOptions: ['medium'],
    traits: ['eidolon', 'ooze'],
    homePlane: 'O Universo',
    language: 'nenhum (gorgoleja)',
    skills: ['arcana', 'athletics'],
    senses: ['sentido de movimento preciso 18 m', 'sem visão'],
    speeds: { land: 20 },
    suggestedAttacks: 'pseudópode (contundente)',
    attributes: attrs(3, -1, 1, 0),
    initialAbility: {
      name: 'Fisiologia de Gosma',
      originalName: 'Ooze Physiology',
      description:
        'Sem imunidades de gosma, mas resistência = metade do nível (mín. 1) a ácido, críticos e precisão; +2 vs mental. Sangramento persistente CD 10.',
    },
    symbiosisAbility: {
      name: 'Pseudópodes Elásticos',
      originalName: 'Stretching Pseudopods',
      description: '7º. Todos os Golpes desarmados corpo a corpo ganham alcance.',
    },
    transcendenceAbility: {
      name: 'Engolir Fluido',
      originalName: 'Flowing Engulf',
      actionType: 'three',
      description:
        '17º. Distanciar até o dobro da Velocidade pelo espaço de criaturas. Tamanho igual ou menor: Reflexos vs CD de magia ou engolido (agarrado, lentificado 1). Escapar vs CD de magia.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=23',
  },
  {
    id: 'eidolon-plant',
    name: 'Planta',
    originalName: 'Plant',
    description:
      'Planta inteligente da mesma essência dos leshys — mas a forma pode ser qualquer vegetação, até as que ninguém identifica.',
    source: 'Impossible Magic pg. 76',
    sourcePage: 76,
    tradition: 'primal',
    sizeOptions: ['medium'],
    traits: ['eidolon', 'plant'],
    homePlane: 'O Universo',
    language: 'Muan',
    skills: ['nature', 'survival'],
    senses: ['visão na penumbra'],
    speeds: { land: 25 },
    suggestedAttacks: 'ramo, raiz, cipó (contundente)',
    attributes: attrs(3, -1, 1, 0),
    initialAbility: {
      name: 'Golpe de Cipó',
      originalName: 'Tendril Strike',
      actionType: 'one',
      description:
        'Golpe desarmado corpo a corpo com +1,5 m de alcance. Se o ataque tiver desarmar/empurrar/derrubar, pode usar essa ação no lugar.',
    },
    symbiosisAbility: {
      name: 'Cipós Crescentes',
      originalName: 'Growing Vines',
      description: '7º. Todos os Golpes desarmados corpo a corpo ganham alcance.',
    },
    transcendenceAbility: {
      name: 'Campo de Raízes',
      originalName: 'Field of Roots',
      actionType: 'two',
      description:
        '17º. Inimigos no alcance: dano do Golpe mais forte, Reflexos vs CD de magia (lentidão de deslocamento / dano contínuo / imobilizado). O eidolon fica imobilizado até Interagir para soltar as raízes.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=24',
  },
  {
    id: 'eidolon-psychopomp',
    name: 'Psicopompo',
    originalName: 'Psychopomp',
    description:
      'Guia de almas e guarda dos tribunais dos mortos. Quase sempre usa máscara. Vocês compartilham um destino — a sua alma ou a de outros.',
    source: 'Impossible Magic pg. 77',
    sourcePage: 77,
    tradition: 'divine',
    sizeOptions: ['medium'],
    traits: ['eidolon', 'monitor', 'psychopomp'],
    homePlane: 'O Ossário',
    language: 'Requiano',
    skills: ['intimidation', 'religion'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'bico, garra, punho, mandíbulas, ataques em forma de arma',
    attributes: attrs(3, 0, 1, -1),
    initialAbility: {
      name: 'Toque do Pastor',
      originalName: "Shepherd's Touch",
      description:
        'Desarmados afetam incorpóreos como toque fantasma; +1 vazio em vivos e +1 vitalidade em mortos-vivos.',
    },
    symbiosisAbility: {
      name: 'Vigia Oculto',
      originalName: 'Hidden Watcher',
      description:
        '7º. 1×/hora: Invisibilidade inata divina em você, nele, ou nos dois. Ação hostil de qualquer um encerra para os dois.',
    },
    transcendenceAbility: {
      name: 'Ceifador de Espíritos',
      originalName: 'Spirit Taker',
      description:
        '17º. Vê incorpóreos em objetos sólidos e os Golpeia sem penalidade (expulsa do objeto). Pode atingir consciência projetada/possessão. Morto-vivo destruído vai ao Ossário; PV temporários = seu nível por 1 min.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=25',
  },
  {
    id: 'eidolon-swarm',
    name: 'Enxame',
    originalName: 'Swarm',
    description:
      'Espíritos da natureza num só ser fragmentado. Manifesta como dezenas de animais Minúsculos com o seu sigilo — uma mente, muitas vozes.',
    source: 'Battlecry! pg. 72',
    sourcePage: 72,
    tradition: 'primal',
    sizeOptions: ['medium'],
    traits: ['animal', 'eidolon', 'swarm'],
    homePlane: 'O Universo',
    language: 'Comum',
    skills: ['nature', 'survival'],
    senses: ['visão na penumbra'],
    speeds: { land: 25 },
    suggestedAttacks: 'bicos, garras, mandíbulas, garras de rapina',
    namedArrays: [
      named('brazen', 'Enxame Audaz', 'Brazen Swarm', 4, 2, 3, 0, 0, 0, 2, 3),
      named('slinking', 'Enxame Furtivo', 'Slinking Swarm', 2, 4, 3, 0, 1, -1, 1, 4),
    ],
    initialAbility: {
      name: 'Forma de Enxame',
      originalName: 'Swarm Form',
      description:
        'Imune a agarrado, caído e contido; passa por vãos como Minúsculo; fraqueza a área = nível. Condensado (Médio, alcance 1,5 m, Golpes) ou disperso (Grande, alcance 0, sem Golpes, ocupa o espaço de outros). Trocar forma: 1 ação concentrar.',
    },
    symbiosisAbility: {
      name: 'Mudança Súbita',
      originalName: 'Sudden Shift',
      description:
        '7º. 1×/rodada, trocar forma como ação livre. Ganha a reação Redistribuir.',
    },
    transcendenceAbility: {
      name: 'Enxame Nauseante',
      originalName: 'Sickening Swarm',
      description:
        '17º. Disperso: espaços são terreno difícil. Ganha Assalto Nauseante.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=13',
  },
  {
    id: 'eidolon-undead',
    name: 'Morto-vivo',
    originalName: 'Undead',
    description:
      'Espírito do Éter ou do Vazio preso à sua força vital de um jeito que nem outros invocadores entendem. Forma moldada por memórias, morte e o seu essência.',
    source: 'Impossible Magic pg. 77',
    sourcePage: 77,
    tradition: 'divine',
    sizeOptions: ['medium', 'small'],
    traits: ['eidolon', 'undead'],
    homePlane: 'Plano Etéreo ou Vazio',
    language: 'Necril',
    skills: ['intimidation', 'religion'],
    senses: ['visão no escuro'],
    speeds: { land: 25 },
    suggestedAttacks: 'garra, punho, mandíbulas',
    attributes: attrs(3, -1, 1, 0),
    initialAbility: {
      name: 'Essência do Vazio',
      originalName: 'Void Essence',
      description:
        'Cura de vazio (cura com vazio, dano de vitalidade). Sem imunidades de morto-vivo, mas +2 vs morte, doença, veneno e efeitos não danosos só de morto-vivo. Sangramento persistente CD 10.',
    },
    symbiosisAbility: {
      name: 'Drenar Vida',
      originalName: 'Drain Life',
      actionType: 'free',
      description:
        '7º. Golpeia um vivo. Se causar dano: Fortitude vs CD de magia (crítico piora 1 grau). Sucesso: dano de vazio = metade do nível. Falha: + drenado 1 e PV temp. = nível do inimigo (1 min). Falha crítica: drenado 2 e o dobro de PV temp.',
    },
    transcendenceAbility: {
      name: 'Rejuvenescimento',
      originalName: 'Rejuvenation',
      description:
        '17º. 1×/dia, no início do turno enquanto está morrendo: recupera 3× nível de PV e acorda (ferido sobe normal). Pode Manifestar Eidolon como ação livre e jogar o turno.',
    },
    aonUrl: 'https://2e.aonprd.com/Eidolons.aspx?ID=26',
  },
]

const BY_ID = new Map(EIDOLON_TYPES.map((t) => [t.id, t]))

export function listEidolonTypes(): EidolonTypeDefinition[] {
  return EIDOLON_TYPES
}

export function getEidolonType(id: string | null | undefined) {
  if (!id) return undefined
  return BY_ID.get(id)
}

export function eidolonTypeIdFromSubclass(subclassId: string | null | undefined) {
  if (!subclassId) return null
  if (subclassId.startsWith('eidolon-')) return subclassId
  return null
}
