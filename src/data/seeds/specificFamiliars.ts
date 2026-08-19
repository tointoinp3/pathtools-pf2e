import type { SpecificFamiliarDefinition } from '@/types/companion'

/**
 * Familiares específicos Remaster (consulta).
 * Fonte: https://2e.aonprd.com/Familiars.aspx?Specific=true
 */
export const SPECIFIC_FAMILIAR_DEFINITIONS: SpecificFamiliarDefinition[] = [
  {
    id: 'specific-kinnars',
    name: 'Kinnars',
    originalName: 'Kinnars',
    description:
      'Casal meio-humano, meio-pássaro-cantor: a kinnari com instrumento de cabaças e cordas, o kinnara de cauda ereta. Cantam, dançam e se acompanham; separados, definham. Contam como uma única criatura. Têm acesso a todas as habilidades do tipo, independente do gênero do par.',
    source: 'Tian Xia Character Guide pg. 124',
    traits: ['celestial'],
    rarity: 'uncommon',
    requiredAbilities: 6,
    grantedAbilities: [
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-independent', label: 'Independente' },
      { abilityId: 'mast-lifelink', label: 'Elo Vital' },
      { abilityId: 'fam-manual-dexterity', label: 'Destreza Manual' },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Exibição Ofuscante',
        originalName: 'Dazzling Show',
        actionType: 'two',
        description:
          '1× por minuto: o kinnara abre as penas. Cada criatura numa emanação de 9 m faz salvaguarda de Vontade (CD de classe ou de magia, a maior) ou fica ofuscada por 2 rodadas.',
      },
      {
        name: 'Elo das Almas',
        originalName: 'Soul Bond',
        description:
          'São dois seres, mas uma criatura só (stats e efeitos de familiar normal). Contra efeito mental com salvaguarda, rolam duas vezes e ficam com o maior (fortuna).',
      },
      {
        name: 'Canto da Vina',
        originalName: 'Vina Song',
        actionType: 'two',
        description:
          '1× por hora: a kinnari toca. Cada criatura numa emanação de 9 m faz salvaguarda de Vontade (CD de classe ou de magia, a maior) ou fica fascinada por 1 rodada. Pode repetir na rodada seguinte para forçar nova salvaguarda (falha: +1 rodada). Ao parar, não usa de novo por 1 hora. Sucesso ou fascínio quebrado: imunidade temporária a esse kinnar por 24 h. Kinnars são imunes.',
      },
    ],
  },
  {
    id: 'specific-lantern-wisp',
    name: 'Fogo-fátuo de Lanterna',
    originalName: 'Lantern Wisp',
    description:
      'Lanternas coloridas feitas à mão que flutuam à noite, sempre acesas. Abriga um fogo-fátuo inofensivo que se aninhou num brinquedo esquecido.',
    source: 'Tian Xia Character Guide pg. 125',
    traits: ['constructo'],
    requiredAbilities: 6,
    grantedAbilities: [
      { abilityId: 'fam-construct', label: 'Construto' },
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'mast-kindling', label: 'Acender' },
      {
        abilityId: 'fam-resistance',
        label: 'Resistência',
        note: 'Fogo e frio.',
      },
      { abilityId: 'fam-tough', label: 'Resistente' },
    ],
    specialAbilities: [
      {
        name: 'Clarão Atordoante',
        originalName: 'Stunning Flare',
        actionType: 'one',
        description:
          '1× a cada 10 minutos: explosão de chama e luz. Cada criatura numa emanação de 4,5 m faz salvaguarda de Fortitude (CD de classe ou de magia, a maior) ou fica cega por 1 rodada e depois ofuscada por 2 rodadas.',
      },
    ],
  },
  {
    id: 'specific-makhluk-wayang',
    name: 'Makhluk Wayang',
    originalName: 'Makhluk Wayang',
    description:
      'Marionete de sombra animada, com a personalidade para a qual foi feita. Diferente do povo wayang: é um ser incorpóreo sombrio, com um boneco simples de couro ou pergaminho grosso.',
    source: 'Tian Xia Character Guide pg. 125',
    traits: ['constructo'],
    requiredAbilities: 8,
    grantedAbilities: [
      { abilityId: 'fam-construct', label: 'Construto' },
      { abilityId: 'fam-manual-dexterity', label: 'Destreza Manual' },
      { abilityId: 'fam-play-dead', label: 'Fingir de Morto' },
      { abilityId: 'fam-speech', label: 'Fala' },
      { abilityId: 'fam-tough', label: 'Resistente' },
      { abilityId: 'fam-versatile-form', label: 'Forma Versátil' },
    ],
    specialAbilities: [
      {
        name: 'Projeção de Sombra',
        originalName: 'Shadow Projection',
        actionType: 'one',
        description:
          'Projeta a sombra numa silhueta maior. Alcance de 3 m para ações de Interagir não hostis até o fim do seu turno.',
      },
    ],
  },
  {
    id: 'specific-shikigami',
    name: 'Shikigami',
    originalName: 'Shikigami',
    description:
      'Espírito pequeno invocado e preso a uma figura de papel, para cumprir a vontade do mestre. Praticantes inexperientes costumam acabar à mercê do próprio shikigami.',
    source: 'Tian Xia Character Guide pg. 125',
    traits: ['constructo'],
    requiredAbilities: 6,
    grantedAbilities: [
      { abilityId: 'fam-construct', label: 'Construto' },
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'mast-kindling', label: 'Acender' },
      { abilityId: 'fam-play-dead', label: 'Fingir de Morto' },
      { abilityId: 'fam-tough', label: 'Resistente' },
      { abilityId: 'fam-versatile-form', label: 'Forma Versátil' },
    ],
    specialAbilities: [
      {
        name: 'Achatar',
        originalName: 'Flatten',
        description:
          'Fica da espessura de uma folha de papel e passa por frestas que caibam uma folha, sem precisar Espremer-se.',
      },
      {
        name: 'Produção em Massa',
        originalName: 'Mass-Produced',
        description:
          'Se o shikigami morrer, você pode religar o espírito a outro boneco de papel nas próximas preparações diárias.',
      },
      {
        name: 'Portador de Selo',
        originalName: 'Seal-Bearer',
        description:
          'Nas preparações diárias, inscreva um selo de ar, terra, fogo, metal, água ou madeira. Se usar Acender (Kindling) nesse dia, aplica-se a magia com o traço do elemento escolhido, não só fogo.',
      },
    ],
  },
  {
    id: 'specific-tapir-sage',
    name: 'Sábio Tapir',
    originalName: 'Tapir Sage',
    description:
      'Criatura inteligente que protege o mundo natural. Carrega cestos grandes de rattan nas costas.',
    source: 'Tian Xia Character Guide pg. 125',
    traits: ['besta'],
    rarity: 'uncommon',
    requiredAbilities: 6,
    grantedAbilities: [
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-kinspeech', label: 'Fala de Parentes' },
      { abilityId: 'fam-speech', label: 'Fala' },
      { abilityId: 'fam-toolbearer', label: 'Porta-ferramentas' },
      { abilityId: 'fam-valet', label: 'Valete' },
    ],
    specialAbilities: [
      {
        name: 'Pote de Chá',
        originalName: 'Pot of Tea',
        description:
          '1×/dia, 10 minutos concentrado: ferve chá e ervas (qualquer outra ação arruína o chá; pode recomeçar). Serve 2 xícaras por infusão (1 a um aliado adjacente, 1 para si), nesta ordem. O chá vale por 1 hora.\n• 1ª infusão (2 ações): cura 1d8 × metade do seu nível (mín. 1d8) e +4 de circunstância na próxima salvaguarda contra doença ou veneno em 24 h.\n• 2ª infusão (2 ações): cura 1d4 × metade do nível (mín. 1d4) e +2 de circunstância na mesma salvaguarda.\n• 3ª infusão (2 ações): PV temporários iguais ao seu nível por 1 hora.',
      },
    ],
  },
  {
    id: 'specific-golden-ermine',
    name: 'Arminho Dourado',
    originalName: 'Golden Ermine',
    description:
      'Mamífero esguio de pelagem branca densa e cauda dourada. Quase extinto pela caça; os de cauda dourada restam só em Hermea, onde são protegidos e vistos como símbolo de sorte.',
    source: 'High Seas pg. 50',
    traits: ['besta'],
    requiredAbilities: 4,
    accessHint: 'Acesso: você é de Hermea.',
    grantedAbilities: [
      { abilityId: 'fam-climber', label: 'Escalador' },
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-touch-telepathy', label: 'Telepatia ao Toque' },
      { abilityId: 'fam-valet', label: 'Valete' },
    ],
    specialAbilities: [
      {
        name: 'Faro de Ouro',
        originalName: 'Gold Scent',
        description:
          'Ganha sentido impreciso de 9 m para farejar objetos feitos de ouro.',
      },
      {
        name: 'Cauda Cintilante',
        originalName: 'Twinkle Tail',
        actionType: 'one',
        description:
          '1×/dia (concentração, fortuna): agita a cauda e concede um bônus de sorte a um alvo disposto em até 9 m. O alvo pode rolar um teste de ataque ou salvaguarda duas vezes e ficar com o maior; escolhe qual teste antes de rolar. O bônus some ao ser usado ou após 1 minuto.',
      },
    ],
  },
  {
    id: 'specific-royal-gull',
    name: 'Gaivota Real',
    originalName: 'Royal Gull',
    description:
      'Ave de plumagem colorida e bico dourado. Ao bater as asas, solta poeira iridescente. Vive no litoral rochoso de Hermea; os filhotes comem só o fruto numchrye da Floresta Rortinos, o que dá as cores da plumagem.',
    source: 'High Seas pg. 51',
    traits: ['besta'],
    requiredAbilities: 2,
    accessHint: 'Acesso: você é de Hermea.',
    grantedAbilities: [
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Esvoaçada Fascinante',
        originalName: 'Fascinating Flutter',
        actionType: 'two',
        description:
          '1× por hora (ilusão, manipular, visual): bate as asas e solta poeira iridescente num cone de 3 m. Cada criatura na área faz salvaguarda de Vontade (CD de classe ou de magia, a maior). Falha: ofuscada por 1 rodada. Falha crítica: ofuscada por 1 minuto.',
      },
    ],
  },
  {
    id: 'specific-wildtwig',
    name: 'Galhozinho',
    originalName: 'Wildtwig',
    description:
      'Canídeo de pelagem de folhas macias e dois chifres de madeira que se curvam com a idade. A cor muda com as estações; um pêssego vermelho de pintas amarelas cresce num dos chifres. Só existe em Hermea.',
    source: 'High Seas pg. 51',
    traits: ['besta'],
    requiredAbilities: 6,
    accessHint: 'Acesso: você é de Hermea.',
    grantedAbilities: [
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-plant', label: 'Planta' },
      { abilityId: 'fam-plant-form', label: 'Forma de Planta' },
      {
        abilityId: 'fam-resistance',
        label: 'Resistência',
        note: 'Veneno.',
      },
      { abilityId: 'fam-speech', label: 'Fala' },
      { abilityId: 'fam-tough', label: 'Resistente' },
    ],
    specialAbilities: [
      {
        name: 'Ambrósia Frutada',
        originalName: 'Fruity Ambrosia',
        description:
          'O pêssego do chifre é mágico e tem o gosto da fruta favorita de quem come. Vale 8 horas após colhido. Interagir para comer: PV temporários iguais ao nível da criatura por 1 hora. Um segundo fruto em 1 hora não beneficia e deixa enojado 1 por 10 minutos. Leva 10 minutos calmo e focado para crescer outro (sem outras ações).',
      },
    ],
  },
  {
    id: 'specific-aeon-wyrd',
    name: 'Wyrd de Éon',
    originalName: 'Aeon Wyrd',
    description:
      'Enxame flutuante de gemas em torno de uma pedra maior. Concede ao mestre o poder da pedra de éon no núcleo.',
    source: 'Player Core 2 pg. 170',
    traits: ['constructo'],
    requiredAbilities: 3,
    grantedAbilities: [
      { abilityId: 'fam-construct', label: 'Construto' },
      { abilityId: 'fam-flier', label: 'Voador' },
    ],
    specialAbilities: [
      {
        name: 'Reservatório de Pedra de Éon',
        originalName: 'Aeon Stone Reservoir',
        description:
          'Aloja qualquer pedra de éon como núcleo. Você ganha os benefícios da pedra sem investir, inclusive o poder ressonante. Não interfere com wayfinder investido.',
      },
      {
        name: 'Não Anda',
        originalName: "Can't Walk",
        description: 'Não tem Velocidade terrestre.',
      },
      {
        name: 'Cristalino',
        originalName: 'Crystalline',
        description:
          'Fraqueza a sônico igual ao seu nível.',
      },
    ],
  },
  {
    id: 'specific-fey-dragonet',
    name: 'Dragonete Feérico',
    originalName: 'Fey Dragonet',
    description:
      'Dragões minúsculos e travessos; aliados naturais de personagens benevolentes ou caprichosos.',
    source: 'Player Core 2 pg. 170',
    traits: ['dragão'],
    requiredAbilities: 5,
    grantedAbilities: [
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'fam-manual-dexterity', label: 'Destreza Manual' },
      { abilityId: 'fam-speech', label: 'Fala' },
      { abilityId: 'fam-touch-telepathy', label: 'Telepatia ao Toque' },
    ],
    specialAbilities: [
      {
        name: 'Sopro Eufórico',
        originalName: 'Euphoric Breath',
        actionType: 'two',
        description:
          '1× por hora (arcano, veneno): sopro de gás eufórico num cone de 3 m. Fortitude (CD de classe ou de magia, a maior). Falha: estupefato 2 e lento 1 por 1d4 rodadas. Falha crítica: duração 1 minuto.',
      },
    ],
  },
  {
    id: 'specific-homunculus',
    name: 'Homúnculo',
    originalName: 'Homunculus',
    description:
      'Construto minúsculo feito com uma gota do sangue do criador: espião, batedor, mensageiro ou assistente.',
    source: 'Player Core 2 pg. 171',
    traits: ['constructo'],
    requiredAbilities: 6,
    grantedAbilities: [
      { abilityId: 'fam-construct', label: 'Construto' },
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-manual-dexterity', label: 'Destreza Manual' },
      { abilityId: 'fam-poison-reservoir', label: 'Reservatório de Veneno' },
    ],
    specialAbilities: [
      {
        name: 'Elo de Sangue',
        originalName: 'Blood Link',
        description:
          'Telepatia com o criador em até 450 m (conhecimento do mestre e tudo que o homúnculo ouve). Se você ficar inconsciente e morrendo, ele age automaticamente no próximo turno como se tivesse sido Comandado. Se for destruído, o mestre sofre 2d10 de dano mental.',
      },
      {
        name: 'Carregador',
        originalName: 'Porter',
        description:
          'Escolha Entrega de Item ou Valete (uma das duas).',
      },
    ],
  },
  {
    id: 'specific-imp',
    name: 'Diabrete',
    originalName: 'Imp',
    description:
      'Finge subserviência para enganar o mestre e roubar-lhe a alma — ou mandá-lo cedo para a cova.',
    source: 'Player Core 2 pg. 171',
    traits: ['diabo', 'profano'],
    requiredAbilities: 7,
    grantedAbilities: [
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'fam-manual-dexterity', label: 'Destreza Manual' },
      {
        abilityId: 'fam-resistance',
        label: 'Resistência',
        note: 'Veneno.',
      },
      {
        abilityId: 'fam-skilled',
        label: 'Perito',
        note: 'Enganação.',
      },
      { abilityId: 'fam-speech', label: 'Fala' },
      { abilityId: 'fam-touch-telepathy', label: 'Telepatia ao Toque' },
    ],
    specialAbilities: [
      {
        name: 'Tentação Diabólica',
        originalName: 'Fiendish Temptation',
        actionType: 'one',
        description:
          '1×/dia (concentração, divino, fortuna, profano): oferece um pacto a um não-diabo em até 4,5 m. Se aceitar, por 1 hora pode rolar um teste de ataque ou salvaguarda duas vezes e ficar com o maior. Se morrer com o bônus ativo, o diabrete decide o destino da alma (em geral presa no plano natal; só wish ou similar ressuscita).',
      },
      {
        name: 'Invisibilidade do Diabrete',
        originalName: 'Imp Invisibility',
        description:
          '1× por hora: conjura invisibilidade em si como magia inata divina.',
      },
    ],
  },
  {
    id: 'specific-pipefox',
    name: 'Raposa-cachimbo',
    originalName: 'Pipefox',
    description:
      'Raposa mágica minúscula, corpo fino e sem membros, cerca de 30 cm. Reservada, tímida, evasiva; adora conhecimento.',
    source: 'Player Core 2 pg. 171',
    traits: ['besta'],
    requiredAbilities: 5,
    grantedAbilities: [
      { abilityId: 'fam-climber', label: 'Escalador' },
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-second-opinion', label: 'Segunda Opinião' },
      {
        abilityId: 'fam-skilled',
        label: 'Perito',
        note: 'Uma perícia à escolha.',
      },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Linguista Erudito',
        originalName: 'Scholarly Linguist',
        description:
          'Fala e entende todos os idiomas que você conhece (não só um) e mais um idioma comum que você não conhece.',
      },
    ],
  },
  {
    id: 'specific-poppet',
    name: 'Bonequinho',
    originalName: 'Poppet',
    description:
      'Familiar constructo de madeira e vime, dos mais básicos e modificáveis.',
    source: 'Player Core 2 pg. 171',
    traits: ['constructo'],
    requiredAbilities: 1,
    grantedAbilities: [
      { abilityId: 'fam-construct', label: 'Construto' },
    ],
    specialAbilities: [
      {
        name: 'Inflamável',
        originalName: 'Flammable',
        description:
          'Fraqueza a fogo igual ao seu nível. Você pode gastar 1 habilidade de familiar para reforçar a construção e remover essa fraqueza no dia.',
      },
    ],
  },
  {
    id: 'specific-spellslime',
    name: 'Limo-mágico',
    originalName: 'Spellslime',
    description:
      'Gosmas coloridas e leais, condensadas das essências sobrantes de magias.',
    source: 'Player Core 2 pg. 171',
    traits: ['gosma'],
    requiredAbilities: 4,
    accessHint: 'Você precisa conjurar magias com espaços.',
    grantedAbilities: [
      { abilityId: 'fam-climber', label: 'Escalador' },
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-tough', label: 'Resistente' },
    ],
    specialAbilities: [
      {
        name: 'Faro Mágico',
        originalName: 'Magic Scent',
        description:
          'Sentido impreciso de 9 m para farejar magia da mesma tradição que a sua.',
      },
      {
        name: 'Defesa de Gosma',
        originalName: 'Ooze Defense',
        description:
          'Imune a acertos críticos e dano de precisão, mas a CA é só 10 + seu nível (em vez de espelhar a sua).',
      },
      {
        name: 'Rejuvenescimento de Limo',
        originalName: 'Slime Rejuvenation',
        description:
          'Tem Rejuvenescimento Focado, mas recupera 2 PV por nível quando você Refoca (em vez de 1).',
      },
    ],
  },
  {
    id: 'specific-mood-cloud',
    name: 'Nuvem de Humor',
    originalName: 'Mood Cloud',
    description:
      'Elemental do ar pouco mais que uma nuvem minúscula com emoções. Estudiosos a ligam às névoas do desespero, só que bem menos evoluída.',
    source: 'Rage of Elements pg. 42',
    traits: ['elemental', 'ar'],
    requiredAbilities: 3,
    grantedAbilities: [
      {
        abilityId: 'fam-elemental',
        label: 'Elemental',
        note: 'Só ar.',
      },
      { abilityId: 'fam-flier', label: 'Voador' },
    ],
    specialAbilities: [
      {
        name: 'Expressar',
        originalName: 'Emote',
        actionType: 'one',
        description:
          '1× por rodada: muda a expressão. Prepara-se para Auxiliar num teste: Enganação (inscrutável), Diplomacia (amigável) ou Intimidação (raivoso). Ganha 1 reação nesta rodada só para esse Auxílio. Sucesso automático (crítico se você for mestre na perícia).',
      },
    ],
  },
  {
    id: 'specific-cullitox-shardling',
    name: 'Estilhaço Cullitox',
    originalName: 'Cullitox Shardling',
    description:
      'Versão jovem e menor do cullitox. Como familiar, a fome de cristais é saciada por magia e vira só curiosidade.',
    source: 'Rage of Elements pg. 42',
    traits: ['elemental', 'terra'],
    requiredAbilities: 3,
    grantedAbilities: [
      { abilityId: 'fam-burrower', label: 'Escavador' },
      {
        abilityId: 'fam-elemental',
        label: 'Elemental',
        note: 'Só terra.',
      },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Faro de Cristal',
        originalName: 'Crystal Scent',
        description:
          'Detecta cristais ou gemas em até 18 m como se usasse faro.',
      },
    ],
  },
  {
    id: 'specific-elemental-wisp',
    name: 'Fogo-fátuo Elemental',
    originalName: 'Elemental Wisp',
    description:
      'Elementais minúsculos. Personalidades: ar brincalhão, terra tímida e leal, fogo despreocupado, metal sério, água gentil, madeira feroz e controladora.',
    source: 'Rage of Elements pg. 43',
    traits: ['elemental'],
    requiredAbilities: 3,
    grantedAbilities: [
      { abilityId: 'fam-accompanist', label: 'Acompanhante' },
      { abilityId: 'fam-elemental', label: 'Elemental' },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Mobilidade Elemental',
        originalName: 'Elemental Mobility',
        description:
          'Ganha uma habilidade conforme o elemento: ar Voador, terra Escavador, fogo Jato, metal Levitador, água Anfíbio, madeira Escalador.',
      },
      {
        name: 'Elemento Inato',
        originalName: 'Innate Element',
        description:
          'O elemento é fixo: você escolhe ao ganhar este familiar e não troca a cada dia.',
      },
      {
        name: 'Ressonância',
        originalName: 'Resonance',
        description:
          'Aura de 9 m. Criaturas na área ganham +1 de status no dano de efeitos alquímicos e mágicos com o mesmo traço elemental do fogo-fátuo. Fogo-fátuo de madeira: o bônus também vale para efeitos com traço planta.',
      },
    ],
  },
  {
    id: 'specific-gennayn',
    name: 'Gennayn',
    originalName: 'Gennayn',
    description:
      'Gênios menores, adaptáveis e sociáveis. Humanoides minúsculos envolvidos em energia elemental; costumam levar recados ou anunciar aliados.',
    source: 'Rage of Elements pg. 43',
    traits: ['elemental'],
    requiredAbilities: 5,
    grantedAbilities: [
      { abilityId: 'fam-elemental', label: 'Elemental' },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Diplomata Elemental',
        originalName: 'Elemental Diplomat',
        description:
          'Modificador de Diplomacia = seu nível + atributo-chave de conjuração (não só o nível). +1 de circunstância em Diplomacia contra elementais; você ganha o mesmo bônus se estiver no mesmo espaço.',
      },
      {
        name: 'Mobilidade Elemental',
        originalName: 'Elemental Mobility',
        description:
          'Ganha uma habilidade conforme o elemento: ar Voador, terra Escavador, fogo Jato, metal Levitador, água Anfíbio, madeira Escalador.',
      },
      {
        name: 'Pequeno Desejo',
        originalName: 'Little Wish',
        actionType: 'reaction',
        description:
          '1×/dia (fortuna). Gatilho: uma criatura que o gennayn possa ver em até 18 m faz salvaguarda ou teste de perícia. O gennayn distorce o destino: a criatura rerrola o teste.',
      },
    ],
  },
  {
    id: 'specific-elemental-scamp',
    name: 'Scamp Elemental',
    originalName: 'Elemental Scamp',
    description:
      'Parecem morcegos feitos de matéria elemental, olhos grandes e presas curvas. O familiar é menor e mais travesso. Ego inflado: nomes longos com muitos títulos, e exigem o nome completo.',
    source: 'Rage of Elements pg. 43',
    traits: ['elemental'],
    requiredAbilities: 5,
    grantedAbilities: [
      { abilityId: 'fam-elemental', label: 'Elemental' },
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Sopro Elemental',
        originalName: 'Elemental Breath',
        actionType: 'two',
        description:
          '1× por hora (arcano): sopro num cone de 3 m. 1d6 de dano por cada 2 níveis seus (Reflexo básico, CD de classe ou de magia, a maior). O tipo depende do scamp.',
      },
      {
        name: 'Mobilidade Elemental',
        originalName: 'Elemental Mobility',
        description:
          'Ganha uma habilidade conforme o elemento: ar Voador, terra Escavador, fogo Jato, metal Levitador, água Anfíbio, madeira Escalador.',
      },
      {
        name: 'Elementos do Scamp',
        originalName: 'Scamp Elements',
        description:
          'O elemento é fixo (escolhe o tipo e não troca no dia). Define traços e o dano do Sopro: ar cortante, terra contundente, fogo fogo, metal cortante, água ácido, madeira veneno (traços planta e madeira).',
      },
    ],
  },
  {
    id: 'specific-calligraphy-wyrm',
    name: 'Dragão-calígrafo',
    originalName: 'Calligraphy Wyrm',
    description:
      'Dragõezinhos curiosos sempre à caça de lore e escrita. Aliados naturais de acadêmicos — nas torres de Cobyslarni ou em campo com a Sociedade dos Exploradores — e também de bruxas com patrono dracônico ou magos que os impressionaram. Sabichões: a voz aguda e estridente diverte uns e irrita outros.',
    source: 'Rival Academies pg. 44',
    traits: ['dragão'],
    rarity: 'uncommon',
    requiredAbilities: 6,
    accessHint:
      'Afiliação com Cobyslarni ou a Sociedade dos Exploradores.',
    grantedAbilities: [
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'fam-manual-dexterity', label: 'Destreza Manual' },
      { abilityId: 'fam-scent', label: 'Faro' },
      {
        abilityId: 'fam-skilled',
        label: 'Perito',
        note: 'Arcanismo e Sociedade.',
      },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Jato de Tinta',
        originalName: 'Ink Spray',
        actionType: 'one',
        description:
          '1× a cada 10 minutos (arcano): tinta num cone de 3 m. Reflexo (CD de magia ou de classe, a maior). Sucesso crítico: nada. Sucesso: se estava invisível, fica oculto por 2 rodadas. Falha: o mesmo por 1 minuto. Falha crítica: o mesmo por 10 minutos e cego por 1 rodada (ou até limpar a tinta com Interagir).',
      },
      {
        name: 'Garras-estilete',
        originalName: 'Stylus Claws',
        description:
          'Garras em forma de estilete que enche com a própria tinta — escreve sem comprar tinta.',
      },
    ],
  },
  {
    id: 'specific-mockingfey',
    name: 'Fada-zombeteira',
    originalName: 'Mockingfey',
    description:
      'Fadas minúsculas: cabeça humanóide e corpo de papagaio colorido. Travessas e desobedientes, mas leais aos amigos. Falam e entendem idiomas, mas preferem mímica. Comuns nas torres de Cobyslarni; em outras escolas as palhaçadas caem pior.',
    source: 'Rival Academies pg. 45',
    traits: ['fada'],
    rarity: 'uncommon',
    requiredAbilities: 4,
    grantedAbilities: [
      { abilityId: 'fam-flier', label: 'Voador' },
      { abilityId: 'fam-independent', label: 'Independente' },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Escárnio',
        originalName: 'Gibe',
        actionType: 'one',
        description:
          '1× por rodada (concentrar, ilusão, mental, oculto, visual): assume a aparência ilusória imperfeita de uma criatura que veja em até 18 m, imitando gestos debochados. A ilusão não a deixa maior e dura até o fim do seu próximo turno. Vontade (CD de classe ou de magia, a maior); imunidade temporária 1 minuto. Sucesso: nada. Falha: desprevenido até o início do seu próximo turno. Falha crítica: desprevenido até o fim do seu próximo turno.',
      },
    ],
  },
  {
    id: 'specific-grindle-drake',
    name: 'Grindle-drake',
    originalName: 'Grindle-drake',
    description:
      'Criatura escamosa de cerca de 30 cm, laranja e vermelho, seis patas, cauda pontuda e bico afiado. Recriada em Tar-Kazmukh a partir dos grindlegrubs das Cinco Montanhas-Rei; às vezes presenteada a amigos dos Guardiões Azuis.',
    source: 'Shining Kingdoms pg. 100',
    traits: [],
    rarity: 'rare',
    requiredAbilities: 4,
    accessHint: 'Você é das Cinco Montanhas-Rei.',
    grantedAbilities: [
      { abilityId: 'fam-darkvision', label: 'Visão no Escuro' },
      {
        abilityId: 'fam-skilled',
        label: 'Perito',
        note: 'Percepção e Sobrevivência.',
      },
      { abilityId: 'fam-touch-telepathy', label: 'Telepatia por Toque' },
    ],
    specialAbilities: [
      {
        name: 'Forragear',
        originalName: 'Forage',
        actionType: 'two',
        description:
          '1× a cada 10 minutos (concentrar, manipular): recupera PV iguais à metade do seu nível. Encontra sustento em quase qualquer ambiente.',
      },
      {
        name: 'Pé Firme',
        originalName: 'Sure and Steady',
        actionType: 'two',
        description:
          'Com as seis patas no chão ou em piso de pedra (concentrar, detecção, primordial): lê o terreno numa emanação de 3 m (encantado, oco, traiçoeiro ou diferente do que parece) e passa isso por telepatia por toque.',
      },
    ],
  },
  {
    id: 'specific-spirit-guide',
    name: 'Guia Espiritual',
    originalName: 'Spirit Guide',
    description:
      'Familiar específico que você pode ganhar na aventura Gatewalkers. Costuma tomar a forma de um guia astuto ou ágil.',
    source: 'Gatewalkers (Hardcover) pg. 241',
    traits: ['besta', 'espírito'],
    rarity: 'rare',
    requiredAbilities: 3,
    accessHint: 'Familiar desta aventura (Gatewalkers).',
    grantedAbilities: [
      { abilityId: 'fam-independent', label: 'Independente' },
      { abilityId: 'mast-lifelink', label: 'Elo Vital' },
      { abilityId: 'fam-speech', label: 'Fala' },
    ],
    specialAbilities: [
      {
        name: 'Ligado ao Mortal',
        originalName: 'Bound to Mortal',
        description:
          'O familiar ganha +10 PV e um ataque desarmado (mandíbulas ou garras, escolhido ao ganhar o guia) usando seu bônus de ataque corpo a corpo. Mandíbulas: 1d6 perfurante, grupo briga. Garras: 1d4 cortante, ágil, grupo briga.',
      },
      {
        name: 'Chamado Espiritual',
        originalName: 'Spiritual Recall',
        actionType: 'reaction',
        description:
          '1×/dia (mágico, oculto). Gatilho: um ataque reduziria o familiar a 0 PV. Ele sobrevive com 1 PV e fica incorpóreo até o fim do seu próximo turno.',
      },
    ],
  },
]

export const SPECIFIC_FAMILIARS_BY_ID = Object.fromEntries(
  SPECIFIC_FAMILIAR_DEFINITIONS.map((f) => [f.id, f]),
) as Record<string, SpecificFamiliarDefinition>

export function listSpecificFamiliars(): SpecificFamiliarDefinition[] {
  return [...SPECIFIC_FAMILIAR_DEFINITIONS].sort((a, b) =>
    a.name.localeCompare(b.name, 'pt-BR'),
  )
}

export function getSpecificFamiliar(
  id: string | null | undefined,
): SpecificFamiliarDefinition | null {
  if (!id) return null
  return SPECIFIC_FAMILIARS_BY_ID[id] ?? null
}
