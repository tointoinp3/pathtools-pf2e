import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_ID, SOURCE_SEVERED_AT_THE_ROOT_ID } from './sources'
import { druidSpellcasting } from './druidSpellcasting'
import { CLASS_DRUID_ID } from './ids'

export { CLASS_DRUID_ID }

const DRUID_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Druida — Player Core (Remaster), AoN Classes ID 34 */
export const druidClass: CharacterClass = {
  id: CLASS_DRUID_ID,
  name: 'Druida',
  originalName: 'Druid',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 122,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['wisdom'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'druid-nature', rank: 'trained', skillId: 'nature' }],
    additionalBase: 2,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'light', rank: 'trained', label: 'Armadura leve' },
    { category: 'medium', rank: 'trained', label: 'Armadura média' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  classFeatLevels: DRUID_CLASS_FEAT_LEVELS,
  spellcasting: druidSpellcasting,
  subclass: {
    id: 'druidic-order',
    label: 'Ordem Druídica',
    description:
      'Ao tornar-se druida você se alinha a uma ordem: ganha 1 feito de 1º nível, 1 magia de ordem (foco) e 1 perícia treinada. Você permanece membro da ordem inicial, mas pode estudar outras depois. Cultivo e Esporos (Pathfinder #202) são variantes da Folha. Fonte: Player Core, pág. 125; Pathfinder #202, pág. 72.',
    required: true,
    options: [
      {
        id: 'order-animal',
        name: 'Ordem Animal',
        originalName: 'Animal',
        description:
          'Conexão forte com as bestas — você as entende (e elas entendem você) melhor que as pessoas. Um companheiro animal caminha ao seu lado.',
        rulesSummary:
          'Perícia: Atletismo. Feito: Companheiro Animal. Magia de ordem: Curar Animal. Anátema extra: crueldade gratuita a animais ou matá-los sem necessidade (defender-se ou abater limpo para comida é permitido).',
        skillGrants: [
          { id: 'order-athletics', rank: 'trained', skillId: 'athletics' },
        ],
        grantedFeat: {
          featId: 'feat-druid-animal-companion',
          featName: 'Companheiro Animal',
          originalName: 'Animal Companion',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 125,
      },
      {
        id: 'order-leaf',
        name: 'Ordem da Folha',
        originalName: 'Leaf',
        description:
          'Você reverencia a fartura da natureza: jardineiro e guardião. Com um familiar leshy, ajuda a regenerar após desastres e volta a flora contra abusadores.',
        rulesSummary:
          'Perícia: Diplomacia. Feito: Familiar Leshy. Magia de ordem: Cornucópia. Anátema extra: crueldade gratuita a plantas/fungos ou matá-los sem necessidade (defender-se ou colher para sobrevivência é permitido).',
        skillGrants: [
          { id: 'order-diplomacy', rank: 'trained', skillId: 'diplomacy' },
        ],
        grantedFeat: {
          featId: 'feat-druid-leshy-familiar',
          featName: 'Familiar Leshy',
          originalName: 'Leshy Familiar',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 125,
      },
      {
        id: 'order-storm',
        name: 'Ordem da Tempestade',
        originalName: 'Storm',
        description:
          'Nascido sob tempestade ou atingido por um raio — você carrega a fúria do clima, trovões e ventos.',
        rulesSummary:
          'Perícia: Acrobacia. Feito: Nascido da Tempestade. Magia de ordem: Surto Tempestuoso. Anátema extra: poluir o ar; deixar impunes quem causa grande poluição atmosférica ou mudanças climáticas graves (não exige sacrifício contra inimigo claramente superior).',
        skillGrants: [
          { id: 'order-acrobatics', rank: 'trained', skillId: 'acrobatics' },
        ],
        grantedFeat: {
          featId: 'feat-druid-storm-born',
          featName: 'Nascido da Tempestade',
          originalName: 'Storm Born',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 125,
      },
      {
        id: 'order-untamed',
        name: 'Ordem Indomada',
        originalName: 'Untamed',
        description:
          'O chamado selvagem corre no seu corpo — criado por animais ou rejeitando as artimanhas da cidade. Magia primal veste você na forma de criatura indomada.',
        rulesSummary:
          'Perícia: Intimidação. Feito: Forma Indomada. Magia de ordem: Mudança Indomada. Anátema extra: tornar-se plenamente domesticado pelas tentações da civilização (pode comprar/usar bens e ficar numa cidade numa aventura, mas nunca depender disso como lar permanente).',
        skillGrants: [
          { id: 'order-intimidation', rank: 'trained', skillId: 'intimidation' },
        ],
        grantedFeat: {
          featId: 'feat-druid-untamed-form',
          featName: 'Forma Indomada',
          originalName: 'Untamed Form',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 126,
      },
      {
        id: 'order-cultivation',
        name: 'Ordem do Cultivo',
        originalName: 'Cultivation',
        description:
          'A natureza é caótica por necessidade — mas plantas prosperam em ambientes cuidados. Você poda o que estagna, planta no lugar certo, replanta o que cresce mal, cobre o solo e faz a manutenção. Outros druidas podem chamar isso de intromissão; você sabe que é vital para a saúde do ambiente que tende.',
        rulesSummary:
          'Variante da Folha: conta como membro da Folha e se qualifica para feitos daquela ordem. Perícia: Ofício. Feito: Familiar Leshy. Magia de ordem: Cornucópia. Anátema extra: crueldade gratuita a plantas/fungos, ou negligenciar plantas que precisam de cuidado (matar plantas/fungos e defender-se deles é permitido).',
        skillGrants: [
          { id: 'order-crafting', rank: 'trained', skillId: 'crafting' },
        ],
        grantedFeat: {
          featId: 'feat-druid-leshy-familiar',
          featName: 'Familiar Leshy',
          originalName: 'Leshy Familiar',
          featType: 'class',
        },
        countsAsSubclassIds: ['order-leaf'],
        sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
        sourcePage: 72,
      },
      {
        id: 'order-spore',
        name: 'Ordem dos Esporos',
        originalName: 'Spore',
        description:
          'Você é fascinado por mofos e fungos e entende o papel deles na saúde dos ecossistemas. Isso costuma colocá-lo em conflito com comunidades locais, que veem fungos como praga a erradicar, não como algo a nutrir.',
        rulesSummary:
          'Variante da Folha: conta como membro da Folha e se qualifica para feitos daquela ordem. O familiar precisa ser um leshy fungo. Perícia: Intimidação. Feito: Familiar Leshy. Magia de ordem: Mancha de Cogumelos. Anátema extra: crueldade gratuita a mofos/fungos, matá-los sem necessidade, ou interferir na decomposição natural (defender-se e colher para alimento é permitido).',
        skillGrants: [
          {
            id: 'order-spore-intimidation',
            rank: 'trained',
            skillId: 'intimidation',
          },
        ],
        grantedFeat: {
          featId: 'feat-druid-leshy-familiar',
          featName: 'Familiar Leshy',
          originalName: 'Leshy Familiar',
          featType: 'class',
        },
        countsAsSubclassIds: ['order-leaf'],
        sourceId: SOURCE_SEVERED_AT_THE_ROOT_ID,
        sourcePage: 72,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações de moldagem alteram a próxima magia. Use imediatamente antes de Conjurar a Magia; qualquer outra ação no meio desperdiça o benefício. Efeitos extras fazem parte da magia.',
    },
    {
      name: 'Cântico Selvagem',
      originalName: 'Wildsong',
      description:
        'Idioma secreto das ordens druídicas (além dos idiomas da ancestralidade). Soa como cantos de animais; a escrita usa fractais e espirais. Ensinar o Cântico Selvagem a não-druidas é anátema.',
    },
    {
      name: 'Magia de Ordem',
      originalName: 'Order spell',
      description:
        'Magia de foco da sua ordem. Custa 1 Ponto de Foco (reserva começa em 1). Recarrega nas preparações; Reconcentração (10 min) comunga com espíritos locais ou cuida da natureza no estilo da ordem. Altura automática = metade do nível.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Conjuração primal (preparada)',
      originalName: 'Druid Spellcasting',
      body: 'Tradição primal. Ataque de magia e CD usam Sabedoria. No 1º: prepare 2 magias de 1º + 5 truques da lista primal. Truques à vontade; a altura sobe com metade do nível. No 19º: Hierofante Primal dá 1 espaço especial de 10º.',
    },
    {
      title: 'Ordem = feito + foco + perícia',
      originalName: 'Druidic Order',
      body: 'No 1º nível escolha Animal, Folha, Tempestade, Indomada, Cultivo ou Esporos. Cultivo e Esporos (Pathfinder #202) são variantes da Folha: contam como Folha para feitos da ordem. Cada uma dá feito de 1º, magia de ordem (foco) e perícia. Anátemas extras se somam aos de todos os druidas.',
    },
    {
      title: 'Anátema da natureza',
      originalName: 'Anathema',
      body: 'Todos os druidas: devastar lugares naturais, consumir mais recursos do que precisa para viver com conforto, ensinar o Cântico Selvagem a não-druidas. Repetir anátemas pode cortar conjuração e benefícios da ordem até um ritual de expiação.',
    },
    {
      title: 'Voz da Natureza + Bloqueio',
      originalName: 'Voice of Nature / Shield Block',
      body: 'No 1º você ganha Bloqueio com Escudo e escolhe Empatia Animal ou Empatia Vegetal (feitos de druida). É o “kit básico” além da ordem.',
    },
    {
      title: 'Feitos de druida',
      body: 'Feitos de classe nos pares a partir do 2 (a ordem já deu um de 1º). Muitos feitos expandem forma selvagem, companheiro, elementos ou magias de ordem.',
    },
    {
      title: 'Papel no grupo',
      body: 'Suporte primal: cura, controle, invocações e (conforme a ordem) tanque em forma animal ou dano elemental. Armadura média, Sabedoria alta, Natureza sempre à mão.',
    },
  ],
  lore: {
    summary:
      'A natureza é impossível de resistir — ruína ou fartura. Você ouve o chamado, admira seu poder e se entrega a servi-la.',
    duringCombat:
      'Invoca forças naturais para derrotar inimigos e proteger aliados: magias primais de proteção, cura ou animais mortíferos. Conforme o vínculo, elementos poderosos ou forma de besta aterrorizante.',
    duringSocial:
      'Representa equilíbrio e soluções que sirvam à natureza e à harmonia. Propõe compromissos em que ambos ganham o essencial, mesmo sem tudo o que desejam.',
    whileExploring:
      'Rastreia, navega o ermo e detecta auras. Pode pedir a animais selvagens sentidos e reconhecimento extraordinários.',
    inDowntime:
      'Fabrica itens ou poções; cuida de uma área selvagem; ensina técnicas sustentáveis de cultivo e criação.',
    youMight: [
      'Ter respeito profundo pelo poder da natureza.',
      'Viver em constante admiração pelo mundo natural — e cautela com a influência alheia.',
      'Tratar plantas e animais como aliados.',
    ],
    othersProbably: [
      'Veem você como representante da natureza e acham que a controla.',
      'Assumem que você evita cidades e prefere o ermo.',
      'Consideram você um místico, como um sacerdote — mas respondendo só às forças naturais.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Conjuração de druida',
        'Anátema',
        'Ordem druídica',
        'Bloqueio com Escudo',
        'Voz da Natureza',
        'Cântico Selvagem',
      ],
    },
    { level: 2, features: ['Feito de druida', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º posto',
        'Fortitude especialista',
        'Feito geral',
        'Percepção especialista',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de druida', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Reflexos especialista',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de druida', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Conjurador especialista',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de druida', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de druida', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Feito geral',
        'Aumento de perícia',
        'Maestria com armas',
        'Vontade Selvagem',
      ],
    },
    { level: 12, features: ['Feito de druida', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Armadura média especialista',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de druida', 'Feito de perícia'] },
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
    { level: 16, features: ['Feito de druida', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de druida', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Conjurador lendário',
        'Hierofante Primal',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de druida', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'druid-spellcasting',
      name: 'Conjuração de Druida',
      originalName: 'Druid Spellcasting',
      level: 1,
      description:
        'Conjurador primal preparado. Ataque de magia e CD usam Sabedoria. Prepare magias da lista primal conforme a tabela de espaços.',
    },
    {
      id: 'druid-anathema',
      name: 'Anátema',
      originalName: 'Anathema',
      level: 1,
      description:
        'Anátema a todos: devastar lugares naturais, consumir mais recursos do que precisa, ensinar o Cântico Selvagem a não-druidas. A ordem adiciona anátemas. Repetir pode cortar magias e benefícios da ordem até expiação.',
    },
    {
      id: 'druid-order',
      name: 'Ordem Druídica',
      originalName: 'Druidic Order',
      level: 1,
      description:
        'Escolha uma ordem. Ganha feito de 1º, magia de ordem (foco) e perícia listados na opção.',
    },
    {
      id: 'druid-shield-block',
      name: 'Bloqueio com Escudo',
      originalName: 'Shield Block',
      level: 1,
      description:
        'Você ganha o feito geral Bloqueio com Escudo.',
      effects: [
        {
          kind: 'grantedFeat',
          featId: 'feat-shield-block-general',
          featName: 'Bloqueio com Escudo',
          originalName: 'Shield Block',
          featType: 'general',
        },
      ],
    },
    {
      id: 'druid-voice-of-nature',
      name: 'Voz da Natureza',
      originalName: 'Voice of Nature',
      level: 1,
      description:
        'Escolha Empatia Animal ou Empatia Vegetal (feitos de druida).',
      effects: [
        {
          kind: 'grantedFeatChoice',
          choiceId: 'voice-of-nature',
          featIds: [
            'feat-druid-animal-empathy-druid',
            'feat-druid-plant-empathy',
          ],
          hint: 'Empatia Animal ou Empatia Vegetal — o motor não escolhe.',
        },
      ],
    },
    {
      id: 'druid-wildsong',
      name: 'Cântico Selvagem',
      originalName: 'Wildsong',
      level: 1,
      description:
        'Você conhece o Cântico Selvagem, idioma secreto das ordens druídicas.',
    },
    {
      id: 'druid-fortitude-expertise',
      name: 'Fortitude Especialista',
      originalName: 'Fortitude Expertise',
      level: 3,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'druid-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 3,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'druid-reflex-expertise',
      name: 'Reflexos Especialista',
      originalName: 'Reflex Expertise',
      level: 5,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'druid-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description: 'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'druid-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 11,
      description:
        'Armas simples e ataques desarmados sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'druid-wild-willpower',
      name: 'Vontade Selvagem',
      originalName: 'Wild Willpower',
      level: 11,
      description:
        'Vontade sobe para mestre. Sucesso em salvaguarda de Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'druid-medium-armor-expertise',
      name: 'Armadura Média Especialista',
      originalName: 'Medium Armor Expertise',
      level: 13,
      description:
        'Armadura leve, média e defesa sem armadura sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'druid-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'druid-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'druid-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
    {
      id: 'druid-primal-hierophant',
      name: 'Hierofante Primal',
      originalName: 'Primal Hierophant',
      level: 19,
      description:
        'Ganha 1 espaço de 10º posto (regras especiais). O feito Poder do Hierofante pode dar um segundo.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=34',
}
