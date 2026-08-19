import type { CharacterClass } from '@/types/class'
import { SOURCE_DARK_ARCHIVES_ID } from './sources'
import { psychicSpellcasting } from './psychicSpellcasting'
import { CLASS_PSYCHIC_ID } from './ids'

export { CLASS_PSYCHIC_ID }

const PSYCHIC_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Psíquico — Dark Archives (Remastered), AoN Classes ID 68 */
export const psychicClass: CharacterClass = {
  id: CLASS_PSYCHIC_ID,
  name: 'Psíquico',
  originalName: 'Psychic',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_DARK_ARCHIVES_ID,
  sourcePage: 9,
  hitPointsPerLevel: 6,
  keyAttributeOptions: ['intelligence', 'charisma'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'psychic-occultism', rank: 'trained', skillId: 'occultism' }],
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
  classFeatLevels: PSYCHIC_CLASS_FEAT_LEVELS,
  spellcasting: psychicSpellcasting,
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=68',
  subclass: {
    id: 'psychic-conscious-mind',
    label: 'Mente consciente',
    description:
      'A expressão externa da sua magia: truques psi, amps e magias extras no repertório. Independente da mente subconsciente. Fonte: Dark Archives (Remastered), pág. 16.',
    required: true,
    options: [
      {
        id: 'conscious-distant-grasp',
        name: 'O Alcance Distante',
        originalName: 'The Distant Grasp',
        description:
          'Mente sobre matéria é mover: telecinese como um braço que alcança o mais longe e o mais fino.',
        rulesSummary:
          'Truques psi padrão: Mão Telecinética e Projétil Telecinético (amps próprios). Superfície: Rasgo Telecinético. 6º: Tela Vetorial. 10º: Lâmina Dançante. Magias: Aríete Cinético, Manobra Telecinética, Poço Gravitacional, Voar, Carga Telecinética, Fúria do Poltergeist, Bombardeio Telecinético, Céu em Queda, Implosão.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 16,
      },
      {
        id: 'conscious-infinite-eye',
        name: 'O Olho Infinito',
        originalName: 'The Infinite Eye',
        description:
          'Poder vem do que você observa. Lança os sentidos no espaço e no tempo: clarividência e precognição.',
        rulesSummary:
          'Truques psi padrão: Detectar Magia e Orientação (amps próprios). Superfície: Vislumbre da Fraqueza. 6º: Varredura Onidirecional. 10º: Prever o Caminho. Magias: Golpe Certo, Augúrio, Localizar, Clarividência, Olho de Patrulha, Visão Verdadeira, Alvo Verdadeiro, Observação Implacável, Premonição.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 18,
      },
      {
        id: 'conscious-oscillating-wave',
        name: 'A Onda Oscilante',
        originalName: 'The Oscillating Wave',
        description:
          'Energia não se cria nem se destrói: cada magia adiciona ou remove calor, e a próxima inverte.',
        rulesSummary:
          'Conservação: na 1ª magia concedida/truque padrão do encontro, escolha adicionar (fogo) ou remover (frio) energia; depois alterna. Refocus zera. Mindshift pode virar fogo/frio (Reflexos). Truques: Geada e Ignição. Superfície: Estase Térmica. 6º: Roda Entrópica. 10º: Redistribuir Potencial. Magias: Soprar Fogo, Dardo Flamejante, Bola de Fogo, Tempestade de Gelo, Nevasca Uivante, Névoa Congelada, Erupção Vulcânica, Fenda Ártica, Estrelas Cadentes.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 19,
      },
      {
        id: 'conscious-silent-whisper',
        name: 'O Sussurro Silencioso',
        originalName: 'The Silent Whisper',
        description:
          'Toda mente murmura. Você usa esses pensamentos para acalmar aliados ou controlar inimigos.',
        rulesSummary:
          'Truques psi padrão: Atordoar e Mensagem (amps próprios). Superfície: Pensamento Proibido. 6º: Estilhaçar a Mente. 10º: Ideia Contagiosa. Magias: Elo Mental, Estupefazer, Heroísmo, Telepatia, Pulso Sináptico, Enviar, Visões de Perigo, Dança Incontrolável, Exigência Telepática.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 20,
      },
      {
        id: 'conscious-tangible-dream',
        name: 'O Sonho Tangível',
        originalName: 'The Tangible Dream',
        description:
          'Você puxa cores e formas da mente e projeta tapeçarias de fio astral ou esculturas de força e luz.',
        rulesSummary:
          'Truques psi padrão: Figmento e Escudo (amps próprios). Superfície: Arma Imaginária. 6º: Chuva Astral. 10º: Gaiola de Holograma. Magias: Cores Vertiginosas, Invisibilidade, Mar de Pensamentos, Contenção, Estilhaços Etéreos, Salvaguarda Cintilante, Projetar Imagem, Cores Confusas, Mansão Resplandecente.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 21,
      },
      {
        id: 'conscious-unbound-step',
        name: 'O Passo Livre',
        originalName: 'The Unbound Step',
        description:
          'A mente salta de pensamento em pensamento — você também, dobrando dimensões além das três usuais.',
        rulesSummary:
          'Truques psi padrão: Dardo de Fase e Passo Distorcido (amps próprios). Superfície: Lente de Distorção. 6º: Deslocamento Fantasmal. 10º: Túnel Tesserato. Magias: Presente Atencioso, Aumentar, Ponto de Reunião, Translocar, Geometria Estranha, Transposição Coletiva, Recuperação Momentânea, Dilema, Bilocação.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 23,
      },
    ],
  },
  secondarySubclass: {
    id: 'psychic-subconscious-mind',
    label: 'Mente subconsciente',
    description:
      'De onde o poder nasce: define atributo-chave (INT ou CAR), o “formato” dos seus pensamentos ao conjurar e a ação de psique. Independente da mente consciente. Fonte: Dark Archives (Remastered), pág. 15.',
    required: true,
    options: [
      {
        id: 'subconscious-emotional-acceptance',
        name: 'Aceitação Emocional',
        originalName: 'Emotional Acceptance',
        extraKeyAttributes: ['charisma'],
        description:
          'A verdade da mente está no sentimento, não na fórmula. O coração (ou a complexidade de um instante) destranca o poder.',
        rulesSummary:
          'Atributo-chave: Carisma. Thoughtforms: emoções (cores vivas, flashes de humor). Ação de psique (1 ação): Restaurar a Mente — aliado a 9 m: +1 de status em saves mentais até a psique acabar, ou recupera PV = 2 + o dobro do seu nível. Imune 10 min.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 15,
      },
      {
        id: 'subconscious-gathered-lore',
        name: 'Saber Reunido',
        originalName: 'Gathered Lore',
        extraKeyAttributes: ['intelligence'],
        description:
          'Você não improvisou: mentor ou academia catalogou cada expressão psíquica numa lição, anedota ou frase.',
        rulesSummary:
          'Atributo-chave: Inteligência. Thoughtforms: mantras (runas/símbolos — parece magia “normal”). Ação de psique (1 ação): Recordar os Ensinamentos — até o próximo turno, conta como preparado para Ajudar todos os aliados a 9 m; a reação de Ajudar usa Ocultismo.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 15,
      },
      {
        id: 'subconscious-precise-discipline',
        name: 'Disciplina Precisa',
        originalName: 'Precise Discipline',
        extraKeyAttributes: ['intelligence'],
        description:
          'Intenção, alinhamento, distrações fora, manifesto. Foco deliberado — o mundo só muda quando você quer.',
        rulesSummary:
          'Atributo-chave: Inteligência. Thoughtforms: cálculos (luzes regulares, tons harmônicos). Ação de psique (1 ação): Calcular Ameaças — +2 de circunstância na CA e em Reflexos até o início do seu próximo turno.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 16,
      },
      {
        id: 'subconscious-wandering-reverie',
        name: 'Devaneio Errante',
        originalName: 'Wandering Reverie',
        extraKeyAttributes: ['charisma'],
        description:
          'Só esvaziando o ruído do dia a dia (sono, autohipnose, exercícios) você acessa o estado caótico que canaliza o poder.',
        rulesSummary:
          'Atributo-chave: Carisma. Thoughtforms: imaginação (devaneio, detalhes que se apagam como sonho). Ação de psique (1 ação): Desvanecer em Devaneios — oculto até o início do próximo turno (não serve para Esconder-se).',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 16,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Amp',
      originalName: 'Amp',
      description:
        'Thoughtform que modifica um truque psi. Gaste 1 PF como ação livre; a próxima ação precisa ser lançar o truque psi para ganhar o efeito amped. Só 1 amp por truque, e não combina amp com moldagem (spellshape), salvo indicação. Feitos com o traço Amp oferecem amps alternativos. Dano do mesmo tipo soma para resistências. Amp Heightened: some os efeitos do amp quando o truque está naquele posto ou maior.',
    },
    {
      name: 'Truque psi',
      originalName: 'Psi Cantrip',
      description:
        'Truque especial da mente consciente (e de alguns feitos). Lança à vontade, altura automática = metade do nível. Cada um tem um Amp. Não troca truques psi de feitos no repertório — só retreinando o feito. Os 3 iniciais da mente consciente são extras aos 3 truques ocultos à escolha.',
    },
    {
      name: 'Mudança mental',
      originalName: 'Mindshift',
      description:
        'Ação com este traço pode usar o poder cru da mente: troque o dano por mental, dê o traço mental e mude o save para Vontade. Perde traços dos tipos de dano que não aplica mais.',
    },
    {
      name: 'Psique',
      originalName: 'Psyche',
      description:
        'Habilidades com este traço só funcionam com a psique Liberada (Unleash Psyche) e acabam quando ela cessa.',
    },
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações que alteram a próxima magia. Use imediatamente antes de Conjurar; qualquer outra ação no meio desperdiça o benefício. Amp e moldagem não se combinam no mesmo truque, salvo indicação.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Duas mentes no 1º',
      originalName: 'Conscious & Subconscious Mind',
      body: 'Subconsciente: de onde vem o poder — INT ou CAR, o “formato” dos pensamentos e a ação de psique. Consciente: como a magia aparece no mundo — 3 truques psi (2 comuns com extra + 1 único), magias no repertório e mais 2 truques únicos no 6º e no 10º. As duas escolhas são independentes.',
    },
    {
      title: 'Poucos espaços, muitos truques',
      originalName: 'Psychic Spellcasting',
      body: 'Espontâneo oculto, mas limitado: 1 espaço de 1º no nível 1, no máximo 2 por posto. Os baixos não somem (diferente da onda do Magus). No 1º você escolhe 1 magia de 1º + 3 truques; a mente consciente adiciona mais 1 magia de 1º e os 3 truques psi. Sem palavras — só o pensamento (ainda há luz e som). A aba Magias trata como repertório espontâneo.',
    },
    {
      title: 'Amp gasta foco, não magia de foco',
      originalName: 'Psi Cantrips and Amps',
      body: 'Você começa com 2 PF e não ganha magias de foco da classe. O PF serve para ampar truques psi (ação livre + conjurar). Se só gastou PF em amps/habilidades de psíquico desde o último Refocus, recupera 2 PF em vez de 1. Clareza de Foco (5º) sobe a reserva para 3. Feitos Amp trocam o amp padrão. Anote a reserva nas notas se a aba Foco mostrar 1.',
    },
    {
      title: 'Liberar a Psique',
      originalName: 'Unleash Psyche',
      body: 'Ação livre no início do turno, se você conjurou na rodada anterior, está em encontro e não está estupefato. Dura 2 rodadas (não pode desligar). Enquanto ativa: manifestação visual; magias de dano psíquicas ganham bônus de status = 2× o posto (só o dano inicial, 1× por criatura); pode usar ações com traço Psique. Depois: 2 rodadas sem poder Liberar de novo e estupefato 1 por 2 rodadas.',
    },
    {
      title: 'Magias emblemáticas (3º)',
      originalName: 'Signature Spells',
      body: '1 emblemática por posto. Eleva livremente sem aprender versões altas. Trocar exige retreino (ou a troca normal de repertório).',
    },
    {
      title: 'Mente Infinita (19º)',
      originalName: 'Infinite Mind',
      body: 'Duas magias ocultas comuns de 10º no repertório e 1 espaço de 10º. Não ganha mais espaços de 10º ao subir, e esse espaço não serve para habilidades que dão slots extras ou conjuram sem gastar espaço. O feito Mente sobre Matéria dá o segundo espaço.',
    },
    {
      title: 'Papel no grupo',
      body: 'Conjurador de 6 PV, sem armadura, simples + desarmado. O “pão” são truques psi amped; magias de espaço entram quando precisa de efeito complexo. Feitos de classe a partir do 2º. INT (disciplina/saber) ou CAR (emoção/devaneio).',
    },
  ],
  lore: {
    summary:
      'A mente vê o que instrumentos não medem, guarda mais segredos que qualquer tomo e move objetos e corações melhor que qualquer alavanca. Você acordou a magia psíquica: conjura pela vontade, não por palavras. Um pensamento errado pode vazar para o mundo — mas se imaginar, é possível.',
    duringCombat:
      'Truques psi são o dia a dia; você escolhe quando ampar. Magias “normais” entram quando o efeito precisa ser mais complexo. Quando a hora chega, libera a mente num clarão de poder.',
    duringSocial:
      'Navega conforme a fonte subconsciente: empatia e sociabilidade se o poder vem da personalidade; frente lógica e estável se é mais cerebral.',
    whileExploring:
      'Mantém o olho da mente aberto a ameaças paranormais que outros não sentem. Em geral detecta magia ou investiga impressões psíquicas, pensamentos velados e espíritos.',
    inDowntime:
      'Estuda as profundezas da mente, busca magias e fenômenos novos. Testa os limites retreinando conforme a compreensão de si mesmo muda.',
    youMight: [
      'Preferir aprendizado, meditação, sonhos e o intangível à imediatidade do mundo físico.',
      'Descobrir coisas novas sobre si mesmo quando já achava que sabia tudo.',
      'Usar magia psíquica mesmo quando o método mundano bastaria — mensagem mental, levitar o copo até o companheiro.',
    ],
    othersProbably: [
      'Ficam maravilhados com suas habilidades, sobretudo com a psique liberada.',
      'Têm dificuldade de aceitar que essa magia da mente vem da mesma fonte que a conjuração convencional.',
      'Perguntam se você é um monstro disfarçado, possuído, escolhido pelos deuses, ou outra estranheza.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Conjuração de psíquico',
        'Repertório de magias',
        'Truques psi e amps',
        'Liberar a Psique',
        'Mente subconsciente',
        'Mente consciente',
      ],
    },
    { level: 2, features: ['Feito de psíquico', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º posto',
        'Feito geral',
        'Magias emblemáticas',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de psíquico', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Clareza de foco',
        'Reflexos precognitivos',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de psíquico', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Conjurador especialista',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de psíquico', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Expertise em Fortitude',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de psíquico', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Percepção extrassensorial',
        'Feito geral',
        'Aumento de perícia',
        'Muros da vontade',
        'Maestria com armas',
      ],
    },
    { level: 12, features: ['Feito de psíquico', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Barreira pessoal',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de psíquico', 'Feito de perícia'] },
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
    { level: 16, features: ['Feito de psíquico', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Fortaleza da vontade',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de psíquico', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Mente infinita',
        'Conjurador lendário',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de psíquico', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'psychic-spellcasting',
      name: 'Conjuração de Psíquico',
      originalName: 'Psychic Spellcasting',
      level: 1,
      description:
        'Conjurador espontâneo da tradição oculta. Sem incantação: o pensamento basta (ainda há manifestações visuais e auditivas). Ataque e CD usam o atributo da mente subconsciente. No 1º: 1 espaço de 1º.',
    },
    {
      id: 'psychic-spell-repertoire',
      name: 'Repertório de Magias',
      originalName: 'Spell Repertoire',
      level: 1,
      description:
        'No 1º: 1 magia oculta de 1º + 3 truques à escolha, mais 1 magia de 1º e 2 truques da mente consciente (lançados como truques psi). Cada espaço novo adiciona magia daquele posto. Ao subir de nível pode trocar 1 magia (pode ser truque). Truques psi de feitos não trocam assim.',
    },
    {
      id: 'psychic-psi-cantrips',
      name: 'Truques Psi e Amps',
      originalName: 'Psi Cantrips and Amps',
      level: 1,
      description:
        'Três truques psi da mente consciente (1 único + 2 comuns com benefício extra). Reserva inicial de 2 PF — não para magias de foco, e sim para ampar. Amp: 1 PF (ação livre) + lançar o truque. Se só gastou PF em amps/habilidades de psíquico, Refocus recupera 2 PF.',
    },
    {
      id: 'psychic-unleash-psyche',
      name: 'Liberar a Psique',
      originalName: 'Unleash Psyche',
      level: 1,
      actionType: 'free',
      trigger: 'Seu turno começa.',
      frequency: 'Encontro; conjurou na rodada anterior; não está estupefato.',
      description:
        'Psique liberada por 2 rodadas (ou até inconsciente); não pode desligar. Manifestação visual; magias de dano psíquicas ganham bônus de status = 2× o posto (dano inicial, 1× por criatura); ações com traço Psique. Depois: 2 rodadas sem Liberar e estupefato 1 por 2 rodadas.',
    },
    {
      id: 'psychic-subconscious-mind',
      name: 'Mente Subconsciente',
      originalName: 'Subconscious Mind',
      level: 1,
      description:
        'Escolha uma mente subconsciente. Define atributo-chave, thoughtforms ao conjurar e a ação de psique.',
    },
    {
      id: 'psychic-conscious-mind',
      name: 'Mente Consciente',
      originalName: 'Conscious Mind',
      level: 1,
      description:
        'Escolha uma mente consciente. Coloca magias no repertório e concede 3 truques psi (mais 1 no 6º e 1 no 10º).',
    },
    {
      id: 'psychic-signature-spells',
      name: 'Magias Emblemáticas',
      originalName: 'Signature Spells',
      level: 3,
      description:
        'Para cada posto que você tem, escolha 1 magia emblemática. Pode elevá-la livremente sem aprender versões altas.',
    },
    {
      id: 'psychic-clarity-of-focus',
      name: 'Clareza de Foco',
      originalName: 'Clarity of Focus',
      level: 5,
      description:
        'A reserva de Pontos de Foco aumenta em 1 (máximo 3, como o normal).',
    },
    {
      id: 'psychic-precognitive-reflexes',
      name: 'Reflexos Precognitivos',
      originalName: 'Precognitive Reflexes',
      level: 5,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'psychic-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description: 'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'psychic-fortitude-expertise',
      name: 'Expertise em Fortitude',
      originalName: 'Fortitude Expertise',
      level: 9,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'psychic-extrasensory-perception',
      name: 'Percepção Extrassensorial',
      originalName: 'Extrasensory Perception',
      level: 11,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'psychic-walls-of-will',
      name: 'Muros da Vontade',
      originalName: 'Walls of Will',
      level: 11,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'psychic-weapon-expertise',
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
      id: 'psychic-personal-barrier',
      name: 'Barreira Pessoal',
      originalName: 'Personal Barrier',
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
      id: 'psychic-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'psychic-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'psychic-fortress-of-will',
      name: 'Fortaleza da Vontade',
      originalName: 'Fortress of Will',
      level: 17,
      description:
        'Vontade sobe para lendário. Falha crítica em Vontade vira falha. Falha em Vontade contra efeito que causa dano: metade do dano.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'legendary' }],
    },
    {
      id: 'psychic-infinite-mind',
      name: 'Mente Infinita',
      originalName: 'Infinite Mind',
      level: 19,
      description:
        'Adicione 2 magias ocultas comuns de 10º ao repertório e ganhe 1 espaço de 10º. Não ganha mais espaços de 10º ao subir, e esse espaço não combina com habilidades que dão slots extras ou conjuram sem gastar espaço. O feito Mente sobre Matéria dá o segundo espaço.',
    },
    {
      id: 'psychic-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description:
        'Ataque de magia oculta e CD de magia sobem para lendário.',
    },
  ],
}
