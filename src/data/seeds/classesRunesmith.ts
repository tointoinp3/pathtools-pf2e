import type { CharacterClass } from '@/types/class'
import { SOURCE_IMPOSSIBLE_MAGIC_ID } from './sources'
import { CLASS_RUNESMITH_ID } from './ids'

export { CLASS_RUNESMITH_ID }

/** Forjador de Runas — Impossible Magic, AoN Classes ID 76 */
export const runesmithClass: CharacterClass = {
  id: CLASS_RUNESMITH_ID,
  name: 'Forjador de Runas',
  originalName: 'Runesmith',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
  sourcePage: 43,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'runesmith-crafting', rank: 'trained', skillId: 'crafting' }],
    choiceOptions: ['arcana', 'nature', 'occultism', 'religion'],
    choiceCount: 1,
    additionalBase: 2,
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
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=76',
  keyTerms: [
    {
      name: 'Runa',
      originalName: 'Rune',
      description:
        'Não é magia conjurada. Gravar (exploração, dura até gastar/remover) ou traçar (combate, até o fim do seu próximo turno). Efeito igual nos dois. “Portador” = criatura com a runa no corpo ou no equipamento. Precisa de kit de artesão. Salvaguardas usam a CD de forjador de runas. Nível da runa = o seu (grau de neutralizar = metade). Traço mágico pode virar tradição se você for treinado na perícia correspondente.',
    },
    {
      name: 'Invocação',
      originalName: 'Invocation',
      description:
        'Pronuncia o nome verdadeiro. Precisa falar alto e estar a até 9 m da runa, salvo outro efeito. Invocar Runa aplica o efeito de Invocação e a runa some. O padrão invoca até 2; feitos mudam o número ou quais. Cópias da mesma runa no mesmo alvo só pegam uma vez.',
    },
    {
      name: 'Diacrítico',
      originalName: 'Diacritic',
      description:
        'Runa desenhada em cima de outra, não sozinha. Modifica a base. Remover ou invocar a base leva o diacrítico junto. Só 1 por runa. Base + diacrítico conta como 1 runa na invocação. Gramática: en-ranshu = En- em Ranshu.',
    },
    {
      name: 'Exibição',
      originalName: 'Flourish',
      description:
        'Técnica pesada: só 1 ação com o traço Exibição por rodada.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Gravar, traçar, invocar',
      originalName: 'Etch, Trace, Invoke',
      body: 'Gravar: nas preparações ou 10 min de exploração, até o máximo (2 no 1º, +1 no 5º/9º/13º/17º). Não danifica. Se passar do máximo, a mais antiga some. Traçar Runa: 1 ação no adjacente, ou 2 ações a até 9 m. Quantas quiser; duram até o fim do seu próximo turno. Invocar Runa (1 ação): até 2 runas a 9 m aplicam Invocação e somem. O campo é o seu caderno: grave o combo antes, trace o que faltar, invoque na hora.',
    },
    {
      title: 'Repertório rúnico',
      originalName: 'Runic Repertoire',
      body: 'No 1º você aprende 4 runas de 1º (comuns da lista, ou incomuns/raras às quais tenha acesso) — escolha nesta aba. Sobe: 6 no 5º, 8 no 9º, 10 no 13º, 12 no 17º. Pode pegar qualquer runa de nível ≤ o seu. Não há escolha de 1º tipo “escola”: a identidade é o repertório. A aba Magias fica fechada — isto não é conjuração.',
    },
    {
      title: 'Catálogo de 1º (Impossible Magic)',
      originalName: '1st-level Runes',
      body: 'Atryl (Fogo, criatura/objeto); Baruiel (Bravura do Reduto, criatura disposta); Camonica (Perplexidade, criatura); Esvadir (Pedras de Amolar, arma perfurante/cortante); Holtrik (Muralhas Anãs, escudo); Ledria (Apelo, criatura, social); Lyskel (Geada, criatura/objeto); Marssyl (Impacto, arma concussão); Oljinex (Flagelo dos Covardes, escudo vs à distância); Pluuna (Iluminação, criatura/armadura); Ranshu (Trovão, criatura/objeto); Rehgog (Poder Bestial, criatura disposta); Sertum (Preparação, criatura); Thullax (Corrosão, criatura/objeto); Tilus (Vocabulário, criatura, idioma); Zohk (Regresso, criatura, deslocamento para “casa”). Cada uma tem efeito passivo no portador e Invocação no livro.',
    },
    {
      title: 'Diacríticos e runas altas',
      originalName: 'Diacritics and Higher Runes',
      body: '5º: Av- Sucessão, En- Expansão (dano), Fob- Duplicação (sem dano), Kit- Misericórdia, Per- Contínuo, Sun- Preservação, Ti- Fundamentos (ácido/frio/eletricidade/fogo), Ur- Intensidade (dano). 9º: Astillu Submersão, Cruonign Sanguessuga, Feikris Gravidade, Germantria Parceria, Ichelsu Observação, Jurroz Fúria Dracônica, Kojastri Isolamento, Oraloq Inarticulação, Piteregrin Transposição, Trolistri Tristeza Desolada, Ulgatus Contenção, Yudici Repreensão. 13º: Eck- Fantasma, Inth- Corrupção, Nesh- Contingência, Sar- Retidão. 17º: Aiuen Chave do Portão Élfico, Ochygholl a Estrela Envenenada, Rovan Selo da Abóbada Morta, Xinsala o Poço das Virtudes.',
    },
    {
      title: 'Artesão de runas de item',
      originalName: 'Runic Crafter',
      body: 'No 2º ganha Criação Mágica (mesmo sem os pré-requisitos). Aprende sozinho as fórmulas fundamentais (potência e resiliente de armadura, reforço de escudo, potência e golpeante de arma) quando o nível chega. Não precisa de livro de fórmulas para runas. No 4º e a cada 2 níveis: +1 fórmula de runa de propriedade de arma ou armadura do seu nível. Otimização Rúnica (7º): +2 de dano com arma que tenha golpeante (+3 maior, +4 máxima); no 15º isso vira +4/+6/+8.',
    },
    {
      title: 'Papel no grupo',
      body: 'Guerreiro-erudito de Inteligência, 8 PV, armas marciais e armadura média, feito de classe no 1º e nos pares. Buffa aliados, marca inimigos, explode o combo com invocação. Perícia de tradição (Arcanismo, Natureza, Ocultismo ou Religião) define se você troca o traço mágico pela tradição. Kit de artesão sempre à mão.',
    },
  ],
  lore: {
    summary:
      'No fundo de toda fala está a palavra; no fundo de toda magia, a runa. Erudito e artista, você esculpe, grava, marca e pinta os tijolos da magia para canalizar o que é maior que você.',
    duringCombat:
      'O campo vira tela: runas úteis nos aliados, runas nocivas em quem se opõe. Na hora certa, invoca e a magia acende.',
    duringSocial:
      'Teoria mágica vira fato inesperado no diálogo. Se o charme falha, um encanto rúnico sutil segura o colega mais eloquente.',
    whileExploring:
      'Inscrições em templo e artefato: história e aviso. Mantém as runas no equipamento do grupo para o próximo encontro.',
    inDowntime:
      'Pesquisa e ofício. Poema de manhã, forja de tarde — o entendimento das runas cresce os dois.',
    youMight: [
      'Puxar línguas e escritas antigas na conversa, quando o comum não chega.',
      'Personalizar itens com frases ou gravuras que só você entende.',
    ],
    othersProbably: [
      'Pedem ajuda no fecho do colar ou no ajuste da armadura.',
      'Acham que você é conjurador, não um estudioso humilde.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Runas',
        'Repertório rúnico',
        'Bloqueio com Escudo',
        'Feito de forjador de runas',
      ],
    },
    { level: 2, features: ['Feito de forjador de runas', 'Artesão rúnico', 'Feito de perícia'] },
    { level: 3, features: ['Feito geral', 'Aumento de perícia'] },
    { level: 4, features: ['Feito de forjador de runas', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Aumento de perícia',
        'Expertise com armas',
      ],
    },
    { level: 6, features: ['Feito de forjador de runas', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Runas especialistas',
        'Feito geral',
        'Expertise em Reflexos',
        'Otimização rúnica',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de forjador de runas', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Artesão rúnico seguro',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de forjador de runas', 'Feito de perícia'],
    },
    {
      level: 11,
      features: ['Feito geral', 'Resistência forjada', 'Aumento de perícia'],
    },
    { level: 12, features: ['Feito de forjador de runas', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Expertise em armadura média',
        'Expertise em Percepção',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    { level: 14, features: ['Feito de forjador de runas', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Otimização rúnica maior',
        'Runas magistrais',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de forjador de runas', 'Feito de perícia'] },
    { level: 17, features: ['Feito de ancestralidade', 'Aumento de perícia'] },
    { level: 18, features: ['Feito de forjador de runas', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Runas lendárias',
        'Maestria em armadura média',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de forjador de runas', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'runesmith-runes',
      name: 'Runas',
      originalName: 'Runes',
      level: 1,
      description:
        'Aplica runas de forjador em criaturas e objetos. Precisa conhecer a runa (repertório). Kit de artesão. Gravar: preparações ou 10 min de exploração, até o máximo (2 no 1º; 3/4/5/6 no 5º/9º/13º/17º). Não danifica. Passou do máximo: a mais antiga some. Traçar: Traçar Runa. Invocar: Invocar Runa. Salvaguardas = CD de classe. Nível da runa = o seu. Traço mágico pode virar tradição se treinado na perícia. Polimorfia e proteções contra magia também pegam traçar/invocar; runa já aplicada continua.',
    },
    {
      id: 'runesmith-trace-rune',
      name: 'Traçar Runa',
      originalName: 'Trace Rune',
      level: 1,
      actionType: 'one',
      description:
        '1 ação: aplica 1 runa conhecida num alvo adjacente que case com o Uso. 2 ações: desenha no ar e a runa aparece num alvo a até 9 m. Quantas traçadas quiser; cada uma dura até o fim do seu próximo turno.',
    },
    {
      id: 'runesmith-invoke-rune',
      name: 'Invocar Runa',
      originalName: 'Invoke Rune',
      level: 1,
      actionType: 'one',
      description:
        'Pronuncia até 2 runas suas a até 9 m. Cada uma aplica o efeito de Invocação e some. Cópias da mesma runa no mesmo alvo só afetam uma vez.',
    },
    {
      id: 'runesmith-runic-repertoire',
      name: 'Repertório Rúnico',
      originalName: 'Runic Repertoire',
      level: 1,
      description:
        'No 1º: 4 runas de 1º à escolha (comuns da lista, ou incomuns/raras com acesso). 6 no 5º, 8 no 9º, 10 no 13º, 12 no 17º. Qualquer runa de nível ≤ o seu. Catálogo no guia da classe.',
    },
    {
      id: 'runesmith-shield-block',
      name: 'Bloqueio com Escudo',
      originalName: 'Shield Block',
      level: 1,
      description:
        'Ganha o feito geral Bloqueio com Escudo, uma reação que reduz dano com o escudo.',
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
      id: 'runesmith-runic-crafter',
      name: 'Artesão Rúnico',
      originalName: 'Runic Crafter',
      level: 2,
      description:
        'Ganha Criação Mágica mesmo sem os pré-requisitos. Aprende as fórmulas fundamentais (potência e resiliente de armadura, reforço de escudo, potência e golpeante de arma) quando o nível chega. Não precisa de livro de fórmulas para runas. No 4º e a cada 2 níveis: +1 fórmula de runa de propriedade de arma ou armadura do seu nível (comum ou com acesso).',
      effects: [
        {
          kind: 'grantedFeat',
          featId: 'feat-magical-crafting',
          featName: 'Criação Mágica',
          originalName: 'Magical Crafting',
          featType: 'skill',
        },
      ],
    },
    {
      id: 'runesmith-weapon-expertise',
      name: 'Expertise com Armas',
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
      id: 'runesmith-expert-runes',
      name: 'Runas Especialistas',
      originalName: 'Expert Runes',
      level: 7,
      description: 'CD de forjador de runas sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'runesmith-reflex-expertise',
      name: 'Expertise em Reflexos',
      originalName: 'Reflex Expertise',
      level: 7,
      description: 'Reflexos sobem para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'runesmith-runic-optimization',
      name: 'Otimização Rúnica',
      originalName: 'Runic Optimization',
      level: 7,
      description:
        '+2 de dano com armas que tenham runa golpeante (+3 golpeante maior, +4 máxima).',
    },
    {
      id: 'runesmith-assured-runic-crafter',
      name: 'Artesão Rúnico Seguro',
      originalName: 'Assured Runic Crafter',
      level: 9,
      description:
        'Ao Fabricar um item mágico permanente que seja runa no intervalo, o resultado do Artesanato sobe 1 grau de sucesso.',
    },
    {
      id: 'runesmith-forged-endurance',
      name: 'Resistência Forjada',
      originalName: 'Forged Endurance',
      level: 11,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'runesmith-medium-armor-expertise',
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
      id: 'runesmith-perception-expertise',
      name: 'Expertise em Percepção',
      originalName: 'Perception Expertise',
      level: 13,
      description: 'Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'runesmith-weapon-mastery',
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
      id: 'runesmith-greater-runic-optimization',
      name: 'Otimização Rúnica Maior',
      originalName: 'Greater Runic Optimization',
      level: 15,
      description:
        'O dano extra da otimização rúnica sobe para +4 com golpeante, +6 maior, +8 máxima.',
    },
    {
      id: 'runesmith-masterful-runes',
      name: 'Runas Magistrais',
      originalName: 'Masterful Runes',
      level: 15,
      description: 'CD de forjador de runas sobe para mestre.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'runesmith-legendary-runes',
      name: 'Runas Lendárias',
      originalName: 'Legendary Runes',
      level: 19,
      description: 'CD de forjador de runas sobe para lendário.',
      effects: [{ kind: 'classDcRank', rank: 'legendary' }],
    },
    {
      id: 'runesmith-medium-armor-mastery',
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
}
