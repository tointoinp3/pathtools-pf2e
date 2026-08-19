import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_ID, SOURCE_WAR_OF_IMMORTALS_ID } from './sources'
import { CLASS_RANGER_ID } from './ids'

export { CLASS_RANGER_ID }

/** Patrulheiro Remaster — gume do caçador no 1º; feitos de classe no 1º e pares */
export const rangerClass: CharacterClass = {
  id: CLASS_RANGER_ID,
  name: 'Patrulheiro',
  originalName: 'Ranger',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 152,
  hitPointsPerLevel: 10,
  keyAttributeOptions: ['strength', 'dexterity'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'expert',
    reflex: 'expert',
    will: 'trained',
  },
  skills: {
    fixed: [
      { id: 'ranger-nature', rank: 'trained', skillId: 'nature' },
      { id: 'ranger-survival', rank: 'trained', skillId: 'survival' },
    ],
    additionalBase: 4,
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
    id: 'ranger-hunters-edge',
    label: 'Gume do Caçador',
    description:
      'Você treinou para ser um caçador e rastreador habilidoso, ganhando um benefício extra ao Caçar Presa conforme o foco do seu treino. Escolha no 1º nível; cada gume ganha um reforço no 17º com Caçador Magistral. Fonte: Player Core, pág. 154.',
    required: true,
    options: [
      {
        id: 'hunters-edge-flurry',
        name: 'Rajada',
        originalName: 'Flurry',
        description:
          'Você treinou para desencadear uma sequência devastadora de ataques contra sua presa.',
        rulesSummary:
          'Contra a presa caçada, sua penalidade de ataque múltiplo é −3 (−2 com arma ágil) no segundo ataque do turno, em vez de −5, e −6 (−4 com arma ágil) no terceiro ou seguintes, em vez de −10. 17º (Caçador Magistral): com proficiência de mestre na arma, a penalidade vira −2 (−1 com arma ágil) no segundo ataque e −4 (−2 com arma ágil) do terceiro em diante.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 154,
      },
      {
        id: 'hunters-edge-precision',
        name: 'Precisão',
        originalName: 'Precision',
        description:
          'Você treinou para mirar nos pontos fracos da sua presa.',
        rulesSummary:
          'Na primeira vez que acertar sua presa caçada em uma rodada, causa 1d8 de dano de precisão adicional (mesmo tipo de dano; ineficaz contra criaturas sem órgãos vitais ou pontos fracos). Sobe para 2d8 no 11º nível e 3d8 no 19º. 17º (Caçador Magistral): a segunda vez que acertar a presa na rodada também causa 1d8 de precisão; no 19º, o segundo acerto causa 2d8 e o terceiro, 1d8.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 154,
      },
      {
        id: 'hunters-edge-outwit',
        name: 'Astúcia',
        originalName: 'Outwit',
        description:
          'Você é talentoso em ser mais esperto que sua presa e escapar dela.',
        rulesSummary:
          '+2 de bônus de circunstância em testes de Enganação, Intimidação e Furtividade, e em testes para Recordar Conhecimento sobre a presa; +1 de circunstância na CA contra os ataques da presa. 17º (Caçador Magistral): com proficiência de mestre em Enganação, Intimidação, Furtividade ou na perícia usada para Recordar Conhecimento, o bônus daquela perícia contra a presa sobe de +2 para +4; com proficiência de mestre na armadura, o bônus de CA contra a presa sobe de +1 para +2.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 154,
      },
      {
        id: 'hunters-edge-vindication',
        name: 'Vindicação',
        originalName: 'Vindication',
        description:
          'Arquétipo de classe: você caça ameaças ocultas com fé e análise. Escolha uma divindade. Pegue Dedicação de Vindicador no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º. Religião no lugar de Natureza. Treinado na arma predileta (Simplicidade Mortal se o dado for menor que d6; avançada usa proficiência marcial). Magias de guardião são divinas (Sabedoria). +1 de status em ataques de magia contra a presa caçada; a presa sofre −1 de status em salvaguardas contra suas magias divinas. Magia de guardião marca do vindicador. 5º (Jornada sem Rastros): terreno urbano ou natural — você escolhe. 17º: bônus/penalidade sobem para +2/−2. Você escolhe a divindade e a santificação; o motor não escolhe.',
        omitClassSkillIds: ['nature'],
        skillGrants: [
          { id: 'vindicator-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 64,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Exibição',
      originalName: 'Flourish',
      description:
        'Ações com o traço flourish são técnicas especiais que exigem esforço demais para uso frequente. Você só pode usar 1 ação com o traço flourish por rodada.',
    },
    {
      name: 'Pressão',
      originalName: 'Press',
      description:
        'Ações com este traço permitem emendar ataques anteriores: só podem ser usadas se você já estiver sob penalidade de ataque múltiplo, e nunca fora do seu turno (nem com Preparar). Algumas ações de pressão também trazem efeito em caso de falha — esse efeito não se aplica em falha crítica, e se a ação tiver sucesso você pode optar por aplicar o efeito de falha no lugar.',
    },
    {
      name: 'Magias de Guardião',
      originalName: 'Warden Spells',
      description:
        'Certos feitos concedem magias de guardião, um tipo de magia de foco (custam 1 Ponto de Foco). Ao ganhar a primeira, você também ganha uma reserva de foco de 1 ponto e fica treinado em ataques e CDs de magia. São magias primais, e seu atributo de conjuração é Sabedoria. Magias de foco sobem automaticamente para metade do seu nível (arredondado para cima). O máximo da reserva é igual ao número de magias de foco que você tem, até no máximo 3.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Caçar Presa',
      originalName: 'Hunt Prey',
      body: 'Ação de 1 ação (concentrar) que marca um único alvo que você veja, ouça ou esteja rastreando. Contra essa presa você ganha +2 de circunstância em Percepção para Procurar e em Sobrevivência para Rastrear, e ignora a penalidade de ataque à distância dentro do segundo incremento de alcance. Só uma presa por vez — marcar outra desmarca a anterior — e a marcação dura até suas próximas preparações diárias. É o botão que liga o resto da classe: o gume do caçador e boa parte dos feitos só funcionam contra a presa.',
    },
    {
      title: 'Gume do Caçador define o estilo',
      originalName: "Hunter's Edge",
      body: 'A escolha de 1º nível decide como você caça. Rajada quer muitos ataques por turno (ótimo com armas ágeis e duas armas). Precisão quer um acerto grande por rodada (combina com arco e ataques pesados). Astúcia troca dano por perícia e defesa contra a presa (o mais versátil fora de combate). Todos ganham um reforço no 17º nível.',
    },
    {
      title: 'Sem magia por padrão',
      body: 'O Patrulheiro Remaster não é conjurador: nenhuma magia vem da classe. Magias de guardião existem, mas só por feitos — e trazem junto uma reserva de foco de 1 ponto, recarregada nas preparações diárias ou com 10 minutos de Refocar comungando com a natureza.',
    },
    {
      title: 'Especialista em Percepção desde o 1º',
      body: 'Percepção especialista já no 1º nível (mestre no 7º, lendária no 15º) faz do Patrulheiro o batedor natural do grupo: iniciativa alta e quem enxerga a emboscada antes. Fortitude e Reflexos também começam especialistas — só Vontade fica para trás até o 3º.',
    },
    {
      title: 'O terreno é seu aliado',
      body: 'Jornada sem Rastros (5º) esconde seus rastros em terreno natural sem reduzir o deslocamento. Gume da Natureza (9º) deixa inimigos em terreno difícil desprevenidos para você. Jornada Desimpedida (11º) ignora terreno difícil. Juntos, transformam mato fechado e ruínas em vantagem tática em vez de estorvo.',
    },
    {
      title: 'Feitos de patrulheiro',
      body: 'Diferente do clérigo e do mago, você ganha feito de classe já no 1º nível e depois em todos os pares. Companheiro Animal, Emboscada e as posturas de caça saem daqui — vale planejar a linha desde o começo.',
    },
  ],
  lore: {
    summary:
      'Alguns patrulheiros acham que a civilização corrói a alma, mas ainda precisa ser protegida das criaturas selvagens. Outros dizem que a natureza é que precisa de proteção contra os gananciosos, que querem domar sua beleza e saquear seus tesouros. Você pode defender qualquer um dos objetivos, ou os dois. Batedor, rastreador ou caçador de fugitivos e feras, você sabe viver da terra e é hábil em localizar e abater tanto a presa oportuna quanto o inimigo odiado.',
    duringCombat:
      'Você marca inimigos específicos para caçar, o que o torna melhor em derrotá-los. Você mira e castiga a presa escolhida com arco ou armas corpo a corpo, enquanto apoia os aliados com suas perícias.',
    duringSocial:
      'Quando você fala, é com a voz da experiência prática — especialmente sobre exploração dos ermos.',
    whileExploring:
      'Você guia os aliados pelos ermos ou segue rastros. Fica de olho em problemas, constantemente alerta ao perigo mesmo quando ele não é evidente.',
    inDowntime:
      'Você fabrica armas e treina animais preparando a próxima empreitada. Se preferir sair, pode caçar ou explorar as redondezas para entender melhor o ambiente.',
    youMight: [
      'Respeitar o poder bruto da natureza e saber aproveitar o melhor de suas dádivas.',
      'Apreciar a emoção da caçada.',
      'Ir na frente do grupo, reconhecendo os perigos antes do combate começar.',
    ],
    othersProbably: [
      'Chamam você para protegê-los dos ermos ou do avanço da civilização.',
      'Esperam que você seja um solitário quieto ou taciturno.',
      'Acham que há algo perigoso e selvagem em você.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Caçar presa',
        'Gume do caçador',
        'Feito de patrulheiro',
      ],
    },
    { level: 2, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Feito geral', 'Vontade especialista', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Perícia com armas do patrulheiro',
        'Aumento de perícia',
        'Jornada sem rastros',
      ],
    },
    { level: 6, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Feito geral',
        'Reflexos naturais',
        'Aumento de perícia',
        'Maestria em percepção',
        'Especialização em arma',
      ],
    },
    { level: 8, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Gume da natureza',
        'Perícia de patrulheiro',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: [
        'Aumentos de atributo',
        'Feito de patrulheiro',
        'Feito de perícia',
      ],
    },
    {
      level: 11,
      features: [
        'Feito geral',
        'Resistência do guardião',
        'Perícia com armadura média',
        'Aumento de perícia',
        'Jornada desimpedida',
      ],
    },
    { level: 12, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Maestria em armas marciais',
      ],
    },
    { level: 14, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Reflexos naturais maiores',
        'Especialização em arma maior',
        'Percepção lendária',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Caçador magistral',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de patrulheiro', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Maestria com armadura média',
        'Aumento de perícia',
        'Presa rápida',
      ],
    },
    {
      level: 20,
      features: [
        'Aumentos de atributo',
        'Feito de patrulheiro',
        'Feito de perícia',
      ],
    },
  ],
  features: [
    {
      id: 'ranger-hunt-prey',
      name: 'Caçar Presa',
      originalName: 'Hunt Prey',
      level: 1,
      description:
        'Você designa uma única criatura como sua presa e concentra seus ataques nela. Você precisa conseguir ver ou ouvir a presa, ou estar rastreando-a durante a exploração. Ganha +2 de bônus de circunstância em testes de Percepção ao Procurar sua presa e +2 de circunstância em testes de Sobrevivência ao Rastreá-la. Também ignora a penalidade por ataques à distância dentro do segundo incremento de alcance contra a presa. Só pode ter uma criatura designada por vez; designar outra remove a anterior. A designação dura até suas próximas preparações diárias.',
      actionType: 'one',
    },
    {
      id: 'ranger-hunters-edge',
      name: 'Gume do Caçador',
      originalName: "Hunter's Edge",
      level: 1,
      description:
        'Escolha Rajada, Precisão ou Astúcia. Cada opção concede um benefício extra ao Caçar Presa e ganha um reforço no 17º nível com Caçador Magistral.',
    },
    {
      id: 'ranger-will-expertise',
      name: 'Vontade Especialista',
      originalName: 'Will Expertise',
      level: 3,
      description:
        'Suas defesas mentais ficam mais fortes. Proficiência em salvaguardas de Vontade sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'expert' }],
    },
    {
      id: 'ranger-weapon-expertise',
      name: 'Perícia com Armas do Patrulheiro',
      originalName: 'Ranger Weapon Expertise',
      level: 5,
      description:
        'Proficiência com armas marciais, armas simples e ataques desarmados sobe para especialista. Você ganha acesso aos efeitos de especialização crítica dessas armas ao atacar sua presa caçada.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'ranger-trackless-journey',
      name: 'Jornada sem Rastros',
      originalName: 'Trackless Journey',
      level: 5,
      description:
        'Ao se mover por terrenos naturais, você é difícil de rastrear. Você sempre ganha os benefícios da ação Encobrir Rastros nesses terrenos, sem precisar se mover com metade do deslocamento.',
    },
    {
      id: 'ranger-natural-reflexes',
      name: 'Reflexos Naturais',
      originalName: 'Natural Reflexes',
      level: 7,
      description:
        'Proficiência em salvaguardas de Reflexos sobe para mestre. Quando você obtém sucesso em uma salvaguarda de Reflexos, obtém sucesso crítico em vez disso.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'ranger-perception-mastery',
      name: 'Maestria em Percepção',
      originalName: 'Perception Mastery',
      level: 7,
      description: 'Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'ranger-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas e ataques desarmados em que você for especialista. Sobe para +3 se for mestre e +4 se for lendário.',
    },
    {
      id: 'ranger-natures-edge',
      name: 'Gume da Natureza',
      originalName: "Nature's Edge",
      level: 9,
      description:
        'Você sempre encontra as brechas nas defesas dos inimigos quando eles estão em terreno desfavorável. Inimigos ficam desprevenidos contra você se estiverem em terreno difícil.',
    },
    {
      id: 'ranger-expertise',
      name: 'Perícia de Patrulheiro',
      originalName: 'Ranger Expertise',
      level: 9,
      description:
        'Proficiência na sua CD de patrulheiro sobe para especialista. Se você tiver magias de guardião, sua proficiência em ataques e CDs de magia também sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'ranger-wardens-endurance',
      name: 'Resistência do Guardião',
      originalName: "Warden's Endurance",
      level: 11,
      description:
        'Proficiência em salvaguardas de Fortitude sobe para mestre. Quando você obtém sucesso em uma salvaguarda de Fortitude, obtém sucesso crítico em vez disso.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'ranger-medium-armor-expertise',
      name: 'Perícia com Armadura Média',
      originalName: 'Medium Armor Expertise',
      level: 11,
      description:
        'Proficiência em armadura leve, armadura média e defesa sem armadura sobe para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'ranger-unimpeded-journey',
      name: 'Jornada Desimpedida',
      originalName: 'Unimpeded Journey',
      level: 11,
      description:
        'Você ignora os efeitos de terreno difícil. Como de costume ao ignorar terreno difícil, isso também permite tratar os estorvos de terreno muito difícil como os de terreno difícil.',
    },
    {
      id: 'ranger-martial-weapon-mastery',
      name: 'Maestria em Armas Marciais',
      originalName: 'Martial Weapon Mastery',
      level: 13,
      description:
        'Proficiência com ataques desarmados, armas simples e armas marciais sobe para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['unarmed', 'simple', 'martial'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'ranger-greater-natural-reflexes',
      name: 'Reflexos Naturais Maiores',
      originalName: 'Greater Natural Reflexes',
      level: 15,
      description:
        'Proficiência em salvaguardas de Reflexos sobe para lendária. Falha crítica em salvaguarda de Reflexos vira falha. Ao falhar numa salvaguarda de Reflexos contra efeito que cause dano, você reduz o dano à metade.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'legendary' }],
    },
    {
      id: 'ranger-greater-weapon-specialization',
      name: 'Especialização em Arma Maior',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'O dano da especialização em arma sobe para +4 com armas e ataques desarmados em que for especialista, +6 se mestre e +8 se lendário.',
    },
    {
      id: 'ranger-perception-legend',
      name: 'Percepção Lendária',
      originalName: 'Perception Legend',
      level: 15,
      description: 'Proficiência em Percepção sobe para lendária.',
      effects: [{ kind: 'perceptionRank', rank: 'legendary' }],
    },
    {
      id: 'ranger-masterful-hunter',
      name: 'Caçador Magistral',
      originalName: 'Masterful Hunter',
      level: 17,
      description:
        'Proficiência na sua CD de classe de patrulheiro sobe para mestre (e ataques/CDs de magia também, se tiver magias de guardião). Com arma à distância em que tenha proficiência de mestre, ignora a penalidade ao atacar a presa caçada no segundo e terceiro incrementos de alcance. Com proficiência de mestre em Percepção, +4 de circunstância em testes de Percepção ao Procurar sua presa; com mestre em Sobrevivência, +4 de circunstância ao Rastreá-la. Você também ganha um benefício adicional conforme o seu gume do caçador.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'ranger-medium-armor-mastery',
      name: 'Maestria com Armadura Média',
      originalName: 'Medium Armor Mastery',
      level: 19,
      description:
        'Proficiência em armadura leve, armadura média e defesa sem armadura sobe para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'ranger-swift-prey',
      name: 'Presa Rápida',
      originalName: 'Swift Prey',
      level: 19,
      description:
        'Você avalia sua presa num relance. Pode usar Caçar Presa como ação livre se for a primeira ação do seu turno.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=36',
}
