import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'
import { CLASS_ALCHEMIST_ID } from './ids'

export { CLASS_ALCHEMIST_ID }

/** Alquimista — Player Core 2 (Remaster), AoN Classes ID 56 */
export const alchemistClass: CharacterClass = {
  id: CLASS_ALCHEMIST_ID,
  name: 'Alquimista',
  originalName: 'Alchemist',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 56,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'expert',
    will: 'trained',
  },
  skills: {
    fixed: [{ id: 'alchemist-crafting', rank: 'trained', skillId: 'crafting' }],
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'bomb', rank: 'trained', label: 'Bombas alquímicas' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'light', rank: 'trained', label: 'Armadura leve' },
    { category: 'medium', rank: 'trained', label: 'Armadura média' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  subclass: {
    id: 'alchemist-research-field',
    label: 'Campo de Pesquisa',
    description:
      'No 1º você escolhe um campo: fórmulas extras, benefício, uso especial dos frascos versáteis, descoberta (5º), frascos avançados (11º) e descoberta maior (13º). Só campos Remaster (Player Core 2). Fonte: Player Core 2, pág. 59.',
    required: true,
    options: [
      {
        id: 'field-bomber',
        name: 'Bombardeiro',
        originalName: 'Bomber',
        description:
          'Especialista em explosões e reações violentas — o laboratório vai para o campo de batalha.',
        rulesSummary:
          'Fórmulas: 2 bombas alquímicas comuns de 1º. Benefício: ao arremessar bomba com respingo, pode aplicar o respingo só no alvo principal. Frascos: o frasco versátil pode causar frio, eletricidade ou fogo em vez de ácido. 5º: respingo = modificador de INT (mín. 1). 11º: frasco conta como adamantina, ferro frio ou prata da alvorada (ou o material de um item que você empunha). 13º: respingo 3 m (4,5 m com Respingo Expandido).',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 61,
      },
      {
        id: 'field-chirurgeon',
        name: 'Cirurgião',
        originalName: 'Chirurgeon',
        description:
          'Alquimia como medicina: cura, antídotos e o grupo de pé graças aos seus elixires.',
        rulesSummary:
          'Fórmulas: 2 elixires alquímicos comuns de 1º com traço de cura. Benefício: usa proficiência/modificador de Artesanato no lugar de Medicina. Frascos: cura PV iguais ao dano inicial do frasco (beber ou arremessar em aliado disposto a 6 m); perde ácido/respingo, ganha coagulante e cura. 5º: elixir de cura infundido dá PV temporários = INT (1 min). 11º: cura em alvo com metade dos PV ou menos ignora coagulante. 13º: Elixir da Vida via Alquimia Rápida cura o máximo possível.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 61,
      },
      {
        id: 'field-mutagenist',
        name: 'Mutagênico',
        originalName: 'Mutagenist',
        description:
          'Transformações bizarras: sacrifica um aspecto para fortalecer outro — corpo e mente como experimento.',
        rulesSummary:
          'Fórmulas: 2 mutagênicos comuns de 1º. Benefício: ao usar mutagênico, PV temporários = INT + metade do nível (1 min ou até o mutagênico acabar; 1 min de espera). Frascos: beber um frasco suprime 1 desvantagem de mutagênico por 1 min. 5º: com mutagênico ativo, pode encerrar o efeito para rerrolar Fortitude (fortuna). 11º: beber o frasco também dá resistência a dano físico = metade do nível. 13º: dois mutagênicos ao mesmo tempo (benefícios e desvantagens); um terceiro troca um benefício.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 61,
      },
      {
        id: 'field-toxicologist',
        name: 'Toxicólogo',
        originalName: 'Toxicologist',
        description:
          'Toxinas e venenos de todo tipo — o laboratório é um arsenal silencioso.',
        rulesSummary:
          'Fórmulas: 2 venenos alquímicos comuns de 1º. Benefício: ativar veneno de ferimento em 1 ação (arma/munição que segura; pode sacar ou criar com Alquimia Rápida nessa ação). Itens infundidos com traço veneno afetam imunes a veneno (dano vira ácido se for pior). Frascos: traço veneno (dano de veneno); pode aplicar como veneno de ferimento (dano inicial no 1º acerto; inerte no fim do turno). 5º: resistência a veneno = metade do nível. 11º: veneno de ferimento do frasco também causa veneno persistente = respingo. 13º: falha no save inicial de veneno de ferimento infundido espirra em 1 adjacente.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 62,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Aditivo',
      originalName: 'Additive',
      description:
        'Feitos com o traço additive misturam substâncias extras num consumível criado com Alquimia Rápida (não vale em frasco rápido). Só 1 aditivo por item, só 1 vez por rodada, e a maioria vale só para certos tipos de item.',
    },
    {
      name: 'Coagulante',
      originalName: 'Coagulant',
      description:
        'Itens alquímicos de cura com este traço perdem eficácia se aplicados em sequência. Quem recuperar PV de um item coagulante fica imune temporariamente a cura de PV de outros coagulantes por 10 minutos (outros efeitos do item ainda funcionam).',
    },
    {
      name: 'Infundido',
      originalName: 'Infused',
      description:
        'Item alquímico com prazo de validade. Efeitos não permanentes dos seus itens infundidos (exceto aflições como venenos lentos) acabam nas próximas preparações diárias.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Isto não é magia',
      body: 'O alquimista não conjura. Sem grimório; rituais continuam na aba Magias. Seu poder é ciência: livro de fórmulas, itens infundidos e frascos versáteis. Inteligência alimenta a CD de classe (bombas, venenos, elixires que pedem salvaguarda).',
    },
    {
      title: 'Alquimia Avançada (manhã)',
      originalName: 'Advanced Alchemy',
      body: 'Nas preparações diárias você fabrica até 4 + INT consumíveis alquímicos do livro, de nível ≤ o seu, sem teste, sem dias e sem matéria-prima. Ficam infundidos por 24 h ou até a próxima preparação.',
    },
    {
      title: 'Frascos versáteis',
      originalName: 'Versatile Vials',
      body: 'Nas preparações: até 2 + INT frascos (esse também é o máximo). Abaixo do máximo, 10 min em exploração recuperam 2 (3 a partir do 9º). Servem de bomba (ácido + respingo, tipo sobe com o nível) ou de combustível para Alquimia Rápida. O campo de pesquisa muda o que o frasco faz. Guardam no kit sem Bulk extra.',
    },
    {
      title: 'Alquimia Rápida (1 ação)',
      originalName: 'Quick Alchemy',
      body: 'Precisa do kit e de uma mão livre. Gastar 1 frasco: cria 1 consumível do livro (nível ≤ o seu), infundido só até o início do seu próximo turno. Ou criar um frasco rápido (só bomba / opção do campo, até o fim deste turno). Efeitos com duração > 10 min viram 10 min. No 9º, Alquimia Dupla cria dois itens (2 frascos se forem dois consumíveis).',
    },
    {
      title: 'Campo de pesquisa = identidade',
      originalName: 'Research Field',
      body: 'Bombardeiro explode. Cirurgião cura (Artesanato no lugar de Medicina). Mutagênico bebe transformações. Toxicólogo aplica veneno em 1 ação. Cada um muda fórmulas, frascos, descoberta (5º), frascos avançados (11º) e descoberta maior (13º).',
    },
    {
      title: 'Alquimia Poderosa (5º)',
      originalName: 'Powerful Alchemy',
      body: 'Item infundido que pede salvaguarda pode usar a CD de classe no lugar da CD do item. É por isso que INT alta importa tanto — não é “só Craft”.',
    },
    {
      title: 'Papel no grupo',
      body: '8 PV, armadura leve/média, INT. Suporte, controle e dano via consumíveis. Feito de classe já no 1º e nos pares. Livro de fórmulas, infusões do dia e frascos versáteis ficam nesta aba.',
    },
  ],
  lore: {
    summary:
      'Nada é mais belo que um caldo estranho borbulhando no béquer. Você desvenda a ciência e o mundo natural, experimenta no laboratório ou na estrada, e não tem medo de arriscar: explosivos, toxinas e elixires que empurram mente e corpo ao limite.',
    duringCombat:
      'Arremessa bombas, assedia inimigos e sustenta o grupo com elixires. Pode beber mutagênicos e virar arma resiliente.',
    duringSocial:
      'É a referência em itens alquímicos, venenos e doenças.',
    whileExploring:
      'Olho em ingredientes para reagentes. Aconselha o grupo em tudo que for alquímico ou misterioso.',
    inDowntime:
      'Experimenta no laboratório: elixires, bombas e pesquisa.',
    youMight: [
      'Adorar mexer em fórmulas e reagentes, com uma dedicação (e imprudência) que dá medo.',
      'Curtir o caos das suas misturas: queimar, dissolver, congelar, eletrizar.',
      'Experimentar sem parar para achar ferramentas alquímicas mais potentes.',
    ],
    othersProbably: [
      'Acham que você é feiticeiro ou mago excêntrico — e não entendem que você não lança magias.',
      'Não compreendem seu zelo por alquimia, criatividade e invenção.',
      'Assumem que, se ainda não causou uma catástrofe, é só questão de tempo.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Alquimia',
        'Campo de pesquisa',
        'Feito de alquimista',
      ],
    },
    { level: 2, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Feito geral', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Descoberta de campo',
        'Alquimia Poderosa',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Expertise com armas alquímicas',
        'Feito geral',
        'Aumento de perícia',
        'Vontade especialista',
      ],
    },
    { level: 8, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Expertise alquímica',
        'Feito de ancestralidade',
        'Alquimia Dupla',
        'Percepção especialista',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de alquimista', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Frascos avançados',
        'Resistência química',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Descoberta maior de campo',
        'Expertise em armadura média',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Maestria com armas alquímicas',
        'Esquiva de explosão',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Frascos abundantes',
        'Maestria alquímica',
        'Feito de ancestralidade',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de alquimista', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Maestria em armadura média',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de alquimista', 'Feito de perícia'],
    },
  ],
  extraTables: [
    {
      id: 'alchemist-daily',
      title: 'Alquimia do dia',
      subtitle: 'Player Core 2',
      caption:
        'INT = modificador de Inteligência. Infusões duram até a próxima preparação (24 h). Frascos abaixo do máximo: 10 min em exploração recuperam 2 (3 a partir do 9º, Frascos Abundantes).',
      columns: [
        { key: 'item', label: 'Recurso' },
        { key: 'qty', label: 'Quantidade', align: 'center' },
      ],
      rows: [
        {
          key: 'advanced-alchemy',
          cells: ['Alquimia Avançada (itens infundidos)', '4 + INT'],
        },
        {
          key: 'versatile-vials',
          cells: ['Frascos versáteis (máximo)', '2 + INT'],
        },
      ],
    },
  ],
  features: [
    {
      id: 'alchemist-alchemy',
      name: 'Alquimia',
      originalName: 'Alchemy',
      level: 1,
      description:
        'Ganha o feito Criação Alquímica e identifica automaticamente itens alquímicos cuja fórmula você tem. Inclui livro de fórmulas, Alquimia Avançada, frascos versáteis e Alquimia Rápida.',
      effects: [
        {
          kind: 'grantedFeat',
          featId: 'feat-alchemical-crafting',
          featName: 'Criação Alquímica',
          originalName: 'Alchemical Crafting',
          featType: 'skill',
        },
      ],
    },
    {
      id: 'alchemist-formula-book',
      name: 'Livro de Fórmulas',
      originalName: 'Formula Book',
      level: 1,
      description:
        'Começa com um livro padrão grátis: 2 fórmulas comuns de 1º à escolha, mais as de Criação Alquímica e do campo. A cada nível, +2 fórmulas comuns de item que você possa criar. Fórmula base cobre os tipos aprimorados (ex.: elixir da vida menor → todos os graus).',
    },
    {
      id: 'alchemist-advanced-alchemy',
      name: 'Alquimia Avançada',
      originalName: 'Advanced Alchemy',
      level: 1,
      description:
        'Nas preparações diárias, crie até 4 + INT consumíveis alquímicos do livro (nível ≤ o seu), sem teste, sem dias e sem matéria-prima. Infundidos: 24 h ou até a próxima preparação.',
    },
    {
      id: 'alchemist-versatile-vials',
      name: 'Frascos Versáteis',
      originalName: 'Versatile Vials',
      level: 1,
      description:
        'Nas preparações: até 2 + INT frascos (máximo igual). Abaixo do máximo, 10 min em exploração recuperam 2. Infundidos; destruídos se não usados até a próxima preparação. Servem de bomba ou para Alquimia Rápida / campo. Cabem no kit sem Bulk extra; não podem ser duplicados nem preservados.',
    },
    {
      id: 'alchemist-quick-alchemy',
      name: 'Alquimia Rápida',
      originalName: 'Quick Alchemy',
      level: 1,
      actionType: 'one',
      description:
        'Requer kit de alquimista (segurando ou vestido) e uma mão livre. Criar consumível: gasta 1 frasco, item do livro de nível ≤ o seu, infundido até o início do próximo turno. Frasco rápido: bomba ou opção do campo, infundido até o fim deste turno. Duração > 10 min vira 10 min.',
    },
    {
      id: 'alchemist-research-field',
      name: 'Campo de Pesquisa',
      originalName: 'Research Field',
      level: 1,
      description:
        'Escolha um campo. Concede fórmulas, benefício, uso extra dos frascos e descobertas nos níveis 5, 11 e 13.',
    },
    {
      id: 'alchemist-field-discovery',
      name: 'Descoberta de Campo',
      originalName: 'Field Discovery',
      level: 5,
      description: 'Você aprende a descoberta listada no seu campo de pesquisa.',
    },
    {
      id: 'alchemist-powerful-alchemy',
      name: 'Alquimia Poderosa',
      originalName: 'Powerful Alchemy',
      level: 5,
      description:
        'Ao criar um item alquímico infundido que permita salvaguarda, pode trocar a CD pela CD de classe.',
    },
    {
      id: 'alchemist-alchemical-weapon-expertise',
      name: 'Expertise com Armas Alquímicas',
      originalName: 'Alchemical Weapon Expertise',
      level: 7,
      description:
        'Armas simples, bombas alquímicas e ataques desarmados sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'bomb', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'alchemist-will-expertise',
      name: 'Vontade Especialista',
      originalName: 'Will Expertise',
      level: 7,
      description: 'Proficiência em Vontade sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'expert' }],
    },
    {
      id: 'alchemist-alchemical-expertise',
      name: 'Expertise Alquímica',
      originalName: 'Alchemical Expertise',
      level: 9,
      description:
        'CD de classe sobe para especialista. Ao recolher reagentes em exploração, recupera 3 frascos em vez de 2.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'alchemist-double-brew',
      name: 'Alquimia Dupla',
      originalName: 'Double Brew',
      level: 9,
      description:
        'Com Alquimia Rápida você cria dois itens (não precisam ser iguais). Dois consumíveis gastam um frasco cada.',
    },
    {
      id: 'alchemist-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 9,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'alchemist-advanced-vials',
      name: 'Frascos Avançados',
      originalName: 'Advanced Vials',
      level: 11,
      description:
        'Os frascos do campo ganham o benefício avançado descrito no campo de pesquisa.',
    },
    {
      id: 'alchemist-chemical-hardiness',
      name: 'Resistência Química',
      originalName: 'Chemical Hardiness',
      level: 11,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'alchemist-greater-field-discovery',
      name: 'Descoberta Maior de Campo',
      originalName: 'Greater Field Discovery',
      level: 13,
      description:
        'Você aprende a descoberta maior do seu campo de pesquisa.',
    },
    {
      id: 'alchemist-medium-armor-expertise',
      name: 'Expertise em Armadura Média',
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
      id: 'alchemist-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'alchemist-alchemical-weapon-mastery',
      name: 'Maestria com Armas Alquímicas',
      originalName: 'Alchemical Weapon Mastery',
      level: 15,
      description:
        'Armas simples, bombas alquímicas e ataques desarmados sobem para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'bomb', 'unarmed'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'alchemist-explosion-dodger',
      name: 'Esquiva de Explosão',
      originalName: 'Explosion Dodger',
      level: 15,
      description:
        'Reflexos sobem para mestre. Sucesso em Reflexos vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'alchemist-abundant-vials',
      name: 'Frascos Abundantes',
      originalName: 'Abundant Vials',
      level: 17,
      description:
        'Você fica permanentemente acelerado; a ação extra só serve para Alquimia Rápida criando um frasco rápido. Só 1 frasco nessa ação, mesmo com Alquimia Dupla.',
    },
    {
      id: 'alchemist-alchemical-mastery',
      name: 'Maestria Alquímica',
      originalName: 'Alchemical Mastery',
      level: 17,
      description: 'CD de classe sobe para mestre.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'alchemist-medium-armor-mastery',
      name: 'Maestria em Armadura Média',
      originalName: 'Medium Armor Mastery',
      level: 19,
      description:
        'Armadura leve, média e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'master',
        },
      ],
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=56',
}
