import type { CharacterClass } from '@/types/class'
import { SOURCE_DIVINE_MYSTERIES_ID, SOURCE_PLAYER_CORE_2_ID } from './sources'
import { CLASS_INVESTIGATOR_ID } from './ids'

export { CLASS_INVESTIGATOR_ID }

/** Investigador — Player Core 2 (Remaster), AoN Classes ID 59 */
export const investigatorClass: CharacterClass = {
  id: CLASS_INVESTIGATOR_ID,
  name: 'Investigador',
  originalName: 'Investigator',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 100,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'trained',
    reflex: 'expert',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'investigator-society', rank: 'trained', skillId: 'society' }],
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
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=59',
  subclass: {
    id: 'investigator-methodology',
    label: 'Metodologia',
    description:
      'O processo investigativo que virou obsessão. Define perícia extra, feitos e uma ação própria. Fonte: Player Core 2, pág. 103.',
    required: true,
    options: [
      {
        id: 'methodology-alchemical-sciences',
        name: 'Ciências Alquímicas',
        originalName: 'Alchemical Sciences',
        description:
          'Análise química: partículas e fluidos da cena viram tinturas para o caso.',
        rulesSummary:
          'Perícia: Artesanato. Feito: Criação Alquímica. Livro de fórmulas com 2 elixires/ferramentas alquímicas comuns de 1º + as de Criação Alquímica; +1 fórmula (elixir ou ferramenta) por nível. Nas preparações: frascos versáteis = INT (stats do alquimista). Tintura Rápida (1 ação, 1 frasco): cria elixir/ferramenta do livro (nível ≤ o seu), infundido, só até o fim do turno. Não é magia.',
        skillGrants: [
          { id: 'meth-crafting', rank: 'trained', skillId: 'crafting' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 103,
      },
      {
        id: 'methodology-empiricism',
        name: 'Empirismo',
        originalName: 'Empiricism',
        description:
          'Tudo é dado: estatística, números e indução. O que foge do padrão chama sua atenção.',
        rulesSummary:
          'Perícia: 1 à escolha baseada em Inteligência. Feito: Isso é Estranho (That’s Odd). Inspeção Expedita (ação livre, 1×/10 min): Recordar Conhecimento, Procurar ou Sentir Motivação.',
        skillChoiceOptions: ['arcana', 'crafting', 'occultism', 'society'],
        skillChoiceLabel: 'Perícia de Inteligência do Empirismo',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 104,
      },
      {
        id: 'methodology-forensic-medicine',
        name: 'Medicina Forense',
        originalName: 'Forensic Medicine',
        description:
          'O corpo conta o crime: hematomas, fraturas, respingos e até insetos necrófagos.',
        rulesSummary:
          'Perícia: Medicina. Feitos: Acuidade Forense e Medicina de Combate. Medicina de Combate: no sucesso o alvo recupera +nível de PV, e a imunidade temporária é 1 hora (não 1 dia).',
        skillGrants: [
          { id: 'meth-medicine', rank: 'trained', skillId: 'medicine' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 104,
      },
      {
        id: 'methodology-interrogation',
        name: 'Interrogatório',
        originalName: 'Interrogation',
        description:
          'As pessoas confiam em você — charme ou insistência na verdade. Elas falam.',
        rulesSummary:
          'Perícia: Diplomacia. Feito: Sem Motivo para Alarme. Pode Perseguir uma Pista ao mesmo tempo que Causar Boa Impressão, se a pergunta for sobre a criatura ou o tema. Pergunta Direta (1 ação): Diplomacia vs Vontade; sucesso = resposta + desprevenido ao Golpe de Elaborar um Estratagema neste turno (+2/+4 na CD de Percepção vs Mentir).',
        skillGrants: [
          { id: 'meth-diplomacy', rank: 'trained', skillId: 'diplomacy' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 104,
      },
      {
        id: 'methodology-esoterica',
        name: 'Metodologia Esotérica',
        originalName: 'Esoterica Methodology',
        description:
          'Arquétipo de classe Detetive Palatino: ritual com os Evangelhos Perdidos de Tabris. Pegue Dedicação de Detetive Palatino no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º (amuleto e Égide Mística). Ocultismo ou Religião — você escolhe. Identificação Rápida. Um truque comum divino e um oculto inatos à vontade — você nomeia. Treinado em ataque e CD de magia (Inteligência). Afiliado à Ordem Esotérica do Olho Palatino.',
        skillChoiceOptions: ['occultism', 'religion'],
        skillChoiceLabel: 'Perícia da metodologia esotérica',
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 288,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Perseguir uma Pista',
      originalName: 'Pursue a Lead',
      description:
        '1 minuto examinando um detalhe (item, criatura, cômodo). O mestre confirma se há mistério maior. Se houver, você abre uma investigação (pergunta central + nome). Bônus de circunstância +1 ( +2 no 9º) em Percepção e perícias para chegar à resposta (em geral INT/SAB/CAR). Até 2 investigações ativas. Desistir: só retoma depois das preparações diárias. Resolver não tira o bônus até você fechar (Perseguir de novo ou Dispensar).',
    },
    {
      name: 'Dar a Dica',
      originalName: 'Clue In',
      description:
        'Reação, 1×/10 min. Quando um aliado faz um teste que pode aproximar da resposta de um caso ativo, você passa a ele o seu bônus de Perseguir uma Pista.',
    },
    {
      name: 'Elaborar um Estratagema',
      originalName: 'Devise a Stratagem',
      description:
        '1×/rodada. Ação livre se a criatura puder ajudar a responder uma investigação ativa; senão 1 ação. Role 1d20 e escolha: estratagema de ataque (fortuna: o 1º Golpe contra o alvo usa esse d20; pode somar INT no ataque em vez de FOR/DES; corpo a corpo/arremesso precisa ser ágil ou fineza) ou de perícia (não pode Golpear o alvo até o próximo turno; +1 de circunstância no próximo teste de INT/SAB/CAR ou Percepção envolvendo o alvo, ou +1 extra no bônus de Perseguir uma Pista).',
    },
    {
      name: 'Golpe Estratégico',
      originalName: 'Strategic Strike',
      description:
        'Quando o Golpe usa INT no ataque por Elaborar um Estratagema: +1d6 de precisão (2d6 no 5º, 3d6 no 9º, 4d6 no 13º, 5d6 no 17º).',
    },
  ],
  mechanicsGuide: [
    {
      title: 'O caso é o centro',
      originalName: 'On the Case',
      body: 'Perseguir uma Pista (1 min) abre até 2 investigações. O bônus vale em testes que aproximam da resposta — o mestre decide quais. Dar a Dica (reação, 1×/10 min) passa esse bônus a um aliado cujo teste ajude o caso. Anote os casos ativos nas notas.',
    },
    {
      title: 'Cérebro no ataque',
      originalName: 'Devise a Stratagem',
      body: 'No combate você “joga o d20 antes”. Se o número for alto, Golpeia com INT (ágil/fineza) e soma Golpe Estratégico. Se for baixo, escolha estratagema de perícia e não ataque. Ação livre se o alvo está no caso; senão 1 ação. 1× por rodada.',
    },
    {
      title: 'Metodologia',
      originalName: 'Methodology',
      body: 'Quatro opções Remaster (Player Core 2). Ciências Alquímicas usa frascos versáteis e Tintura Rápida (o item dura só o turno) — não abre grimório (rituais na aba Magias). Empirismo, Medicina Forense e Interrogatório mudam perícia, feitos e uma ação extra.',
    },
    {
      title: 'Mais perícias que ninguém',
      originalName: 'Skill Increases & Skillful Lessons',
      body: 'Aumento de perícia em todo nível a partir do 2º (não só nos ímpares). Truques Hábeis: feito de perícia extra em todo ímpar a partir do 3º, só em perícia de INT/SAB/CAR ou a da metodologia. Recoleção Aguçada (3º): Recordar Conhecimento sem treino usa o nível como bônus de proficiência.',
    },
    {
      title: 'Detetive-mestre (19º)',
      originalName: 'Master Detective',
      body: 'CD de classe mestre. Ao entrar num lugar com outra pista de um caso ativo, o mestre avisa que existe (objeto, pessoa, magia…) e confirma quando você a acha.',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial de Inteligência, 8 PV, armadura leve, armas marciais. Você é o cérebro: pistas, Recordar, e Golpes que doem depois de pensar. Feito de classe já no 1º. Sem magia.',
    },
  ],
  lore: {
    summary:
      'Você corre atrás da verdade: pistas de vilões, segredos antigos, mistérios. A mente analítica formula soluções; os sentidos afiados acham até o indício mais obscuro. Conhecimento é arma: você estuda criaturas e perigos para explorar fraquezas.',
    duringCombat:
      'Insights sobre o inimigo compensam a força. Um instante para estudar, e você age rápido no ponto que dói. Costuma apoiar os mais duros do grupo, protegendo-se e dando ajuda vital.',
    duringSocial:
      'Poucos aguentam seu escrutínio. Pode não ser o mais charmoso, mas vê as coisas como são e lê a sala depressa. Toda conversa é uma investigação.',
    whileExploring:
      'Procura pistas no ambiente. Batedor, analista de enigmas e fenômenos, e o que segue o fio que pode render informação.',
    inDowntime:
      'Estuda assuntos novos e velhos, faz aliados para trocar informação, e hobbies que ocupam a mente. Pode ganhar um extra como detetive particular ou consultor da guarda.',
    youMight: [
      'Começar a fazer perguntas — várias bem longas — assim que aparece um enigma.',
      'Buscar o significado mais fundo e as tramas sociais por trás dos eventos.',
      'Envolver-se tanto num caso que ignora o resto, achando trivial.',
    ],
    othersProbably: [
      'Acham a avalanche de informação útil, se difícil de acompanhar.',
      'Se irritam um pouco com o seu “sabe-tudo”.',
      'Contam com você para mistérios, enigmas e desafios de raciocínio.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'No caso',
        'Elaborar um estratagema',
        'Metodologia',
        'Feito de investigador',
        'Golpe estratégico 1d6',
      ],
    },
    {
      level: 2,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 3,
      features: [
        'Feito geral',
        'Recoleção aguçada',
        'Aumento de perícia',
        'Lição hábil',
      ],
    },
    {
      level: 4,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Aumento de perícia',
        'Lição hábil',
        'Golpe estratégico 2d6',
        'Maestria com armas',
      ],
    },
    {
      level: 6,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 7,
      features: [
        'Feito geral',
        'Aumento de perícia',
        'Lição hábil',
        'Sentidos vigilantes',
        'Especialização em arma',
      ],
    },
    {
      level: 8,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Expertise em Fortitude',
        'Expertise de investigador',
        'Aumento de perícia',
        'Lição hábil',
        'Golpe estratégico 3d6',
      ],
    },
    {
      level: 10,
      features: [
        'Aumentos de atributo',
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 11,
      features: [
        'Improviso dedutivo',
        'Vontade obstinada',
        'Feito geral',
        'Aumento de perícia',
        'Lição hábil',
      ],
    },
    {
      level: 12,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Sentidos incríveis',
        'Expertise em armadura leve',
        'Aumento de perícia',
        'Lição hábil',
        'Golpe estratégico 4d6',
        'Maestria com armas (mestre)',
      ],
    },
    {
      level: 14,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Especialização maior em arma',
        'Reflexos sagazes',
        'Aumento de perícia',
        'Lição hábil',
      ],
    },
    {
      level: 16,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Vontade obstinada maior',
        'Aumento de perícia',
        'Lição hábil',
        'Golpe estratégico 5d6',
      ],
    },
    {
      level: 18,
      features: [
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 19,
      features: [
        'Feito geral',
        'Maestria em armadura leve',
        'Detetive-mestre',
        'Aumento de perícia',
        'Lição hábil',
      ],
    },
    {
      level: 20,
      features: [
        'Aumentos de atributo',
        'Feito de investigador',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
  ],
  extraTables: [
    {
      id: 'investigator-strategic-strike',
      title: 'Golpe Estratégico',
      subtitle: 'Player Core 2',
      caption:
        'Dano de precisão extra no Golpe que usa Inteligência por Elaborar um Estratagema (arma ágil ou de fineza).',
      columns: [
        { key: 'levels', label: 'Níveis', align: 'center' },
        { key: 'dice', label: 'Dano extra', align: 'center' },
      ],
      rows: [
        { key: 'ss-1', level: 1, cells: ['1–4', '1d6'] },
        { key: 'ss-5', level: 5, cells: ['5–8', '2d6'] },
        { key: 'ss-9', level: 9, cells: ['9–12', '3d6'] },
        { key: 'ss-13', level: 13, cells: ['13–16', '4d6'] },
        { key: 'ss-17', level: 17, cells: ['17–20', '5d6'] },
      ],
    },
  ],
  features: [
    {
      id: 'investigator-on-the-case',
      name: 'No Caso',
      originalName: 'On the Case',
      level: 1,
      description:
        'Ganha Perseguir uma Pista (1 min, até 2 investigações, +1 de circunstância) e Dar a Dica (reação, 1×/10 min: passa o bônus a um aliado cujo teste ajude o caso).',
    },
    {
      id: 'investigator-clue-in',
      name: 'Dar a Dica',
      originalName: 'Clue In',
      level: 1,
      actionType: 'reaction',
      frequency: '1 vez a cada 10 minutos',
      trigger:
        'Outra criatura tenta um teste que poderia aproximá-lo da resposta de uma investigação ativa.',
      description:
        'A criatura ganha bônus de circunstância igual ao seu bônus de Perseguir uma Pista. O mestre pode adicionar traços (auditivo, linguístico, etc.).',
    },
    {
      id: 'investigator-devise-a-stratagem',
      name: 'Elaborar um Estratagema',
      originalName: 'Devise a Stratagem',
      level: 1,
      actionType: 'free',
      frequency: '1 vez por rodada',
      description:
        'Ação livre se o alvo puder ajudar um caso ativo; senão 1 ação. Role 1d20: estratagema de ataque (fortuna, INT no 1º Golpe ágil/fineza) ou de perícia (+1 no próximo teste social/mental/Percepção vs o alvo).',
    },
    {
      id: 'investigator-methodology',
      name: 'Metodologia',
      originalName: 'Methodology',
      level: 1,
      description:
        'Escolha uma metodologia. Concede perícia, feitos e uma ação ou benefício próprio.',
    },
    {
      id: 'investigator-strategic-strike',
      name: 'Golpe Estratégico',
      originalName: 'Strategic Strike',
      level: 1,
      description:
        'No Golpe que usa INT por Elaborar um Estratagema: +1d6 de precisão (+1d6 no 5º, 9º, 13º e 17º).',
    },
    {
      id: 'investigator-keen-recollection',
      name: 'Recoleção Aguçada',
      originalName: 'Keen Recollection',
      level: 3,
      description:
        'Em Recordar Conhecimento sem treino, o bônus de proficiência é igual ao seu nível (não +0).',
    },
    {
      id: 'investigator-skillful-lessons',
      name: 'Lições Hábeis',
      originalName: 'Skillful Lessons',
      level: 3,
      description:
        'No 3º e em todo ímpar seguinte: +1 feito de perícia de INT, SAB, CAR ou da perícia da metodologia.',
    },
    {
      id: 'investigator-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 5,
      description:
        'Armas simples, marciais e ataques desarmados sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'investigator-vigilant-senses',
      name: 'Sentidos Vigilantes',
      originalName: 'Vigilant Senses',
      level: 7,
      description: 'Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'investigator-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'investigator-fortitude-expertise',
      name: 'Expertise em Fortitude',
      originalName: 'Fortitude Expertise',
      level: 9,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'investigator-expertise',
      name: 'Expertise de Investigador',
      originalName: 'Investigator Expertise',
      level: 9,
      description:
        'O bônus de circunstância de Perseguir uma Pista sobe para +2. CD de classe sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'investigator-deductive-improvisation',
      name: 'Improviso Dedutivo',
      originalName: 'Deductive Improvisation',
      level: 11,
      description:
        'Pode tentar testes que exigem treinado mesmo sem treino; que exigem especialista se for treinado; que exigem mestre se for especialista.',
    },
    {
      id: 'investigator-dogged-will',
      name: 'Vontade Obstinada',
      originalName: 'Dogged Will',
      level: 11,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'investigator-incredible-senses',
      name: 'Sentidos Incríveis',
      originalName: 'Incredible Senses',
      level: 13,
      description: 'Proficiência em Percepção sobe para lendário.',
      effects: [{ kind: 'perceptionRank', rank: 'legendary' }],
    },
    {
      id: 'investigator-light-armor-expertise',
      name: 'Expertise em Armadura Leve',
      originalName: 'Light Armor Expertise',
      level: 13,
      description:
        'Armadura leve e defesa sem armadura sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'investigator-weapon-mastery',
      name: 'Maestria com Armas',
      originalName: 'Weapon Mastery',
      level: 13,
      description:
        'Armas simples, marciais e ataques desarmados sobem para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'investigator-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'investigator-savvy-reflexes',
      name: 'Reflexos Sagazes',
      originalName: 'Savvy Reflexes',
      level: 15,
      description:
        'Reflexos sobem para mestre. Sucesso em Reflexos vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'investigator-greater-dogged-will',
      name: 'Vontade Obstinada Maior',
      originalName: 'Greater Dogged Will',
      level: 17,
      description:
        'Vontade sobe para lendário. Sucesso vira crítico. Falha crítica vira falha. Falha em Vontade contra efeito que causa dano: metade do dano.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'legendary' }],
    },
    {
      id: 'investigator-light-armor-mastery',
      name: 'Maestria em Armadura Leve',
      originalName: 'Light Armor Mastery',
      level: 19,
      description:
        'Armadura leve e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'investigator-master-detective',
      name: 'Detetive-Mestre',
      originalName: 'Master Detective',
      level: 19,
      description:
        'CD de classe sobe para mestre. Ao entrar num local com outra pista de um caso ativo, o mestre informa que existe (objeto, pessoa, magia…) e confirma quando você a encontra.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
  ],
}
