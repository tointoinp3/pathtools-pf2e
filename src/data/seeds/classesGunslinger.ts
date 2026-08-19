import type { CharacterClass } from '@/types/class'
import { SOURCE_GUNS_GEARS_ID } from './sources'
import { CLASS_GUNSLINGER_ID } from './ids'

export { CLASS_GUNSLINGER_ID }

/** Pistolero — Guns & Gears (Remastered), AoN Classes ID 20 */
export const gunslingerClass: CharacterClass = {
  id: CLASS_GUNSLINGER_ID,
  name: 'Pistolero',
  originalName: 'Gunslinger',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_GUNS_GEARS_ID,
  sourcePage: 105,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['dexterity'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'expert',
    reflex: 'expert',
    will: 'trained',
  },
  skills: {
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    {
      category: 'simpleFirearm',
      rank: 'expert',
      label: 'Armas de fogo e bestas simples',
    },
    {
      category: 'martialFirearm',
      rank: 'expert',
      label: 'Armas de fogo e bestas marciais',
    },
    {
      category: 'advancedFirearm',
      rank: 'trained',
      label: 'Armas de fogo e bestas avançadas',
    },
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
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=20',
  subclass: {
    id: 'gunslinger-way',
    label: 'Caminho',
    description:
      'Filosofia + estilo de tiro. Concede perícia, recarga do atirador e feitos (inicial 1º, avançado 9º, maior 15º). Fonte: Guns & Gears (Remastered), pág. 108. Acesso regional: Ustalav, Shackles, Alkenstar, Tian Xia, Arcadia (PFS: todos).',
    required: true,
    options: [
      {
        id: 'way-drifter',
        name: 'Caminho do Errante',
        originalName: 'Way of the Drifter',
        description:
          'Viajante com arma de fogo numa mão e corpo a corpo na outra. Mobilidade e troca de armas.',
        rulesSummary:
          'Perícia: Acrobacia. Recarga: Golpe Recarregando (1 ação: Golpe corpo a corpo de uma mão ou desarmado + Interagir para recarregar; não precisa de mão livre e não provoca). Inicial: Ao Combate (livre na iniciativa: sacar arma à distância de uma mão e corpo a corpo de uma mão; 1ª ação do 1º turno pode Distanciar como livre rumo a um inimigo). 9º: Terminar o Serviço. 15º: Esteira do Errante.',
        skillGrants: [
          { id: 'way-acrobatics', rank: 'trained', skillId: 'acrobatics' },
        ],
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 108,
      },
      {
        id: 'way-pistolero',
        name: 'Caminho do Pistolero',
        originalName: 'Way of the Pistolero',
        description:
          'Duelista ou artista do revólver: pés rápidos, mãos mais rápidas, língua afiada.',
        rulesSummary:
          'Perícia: Enganação ou Intimidação. Recarga: Recarga do Contador (1 ação: recarregar + Criar uma Distração ou Desmoralizar). Inicial: Dez Passos (livre na iniciativa: +2 de circunstância, sacar arma de fogo/besta de uma mão; 1ª ação do 1º turno pode Passo de até 3 m como livre). 9º: Réplica do Pistolero. 15º: Fanfarrice Sombria.',
        skillChoiceOptions: ['deception', 'intimidation'],
        skillChoiceLabel: 'Perícia do Caminho do Pistolero',
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 109,
      },
      {
        id: 'way-sniper',
        name: 'Caminho do Atirador',
        originalName: 'Way of the Sniper',
        description:
          'O primeiro tiro decide. Você fica escondido ou longe e mata sem ser visto.',
        rulesSummary:
          'Perícia: Furtividade. Recarga: Recarga Coberta (1 ação: Tomar Cobertura ou Esconder-se, depois recarregar). Inicial: Um Tiro, Uma Morte (livre se rolar Furtividade na iniciativa: sacar; 1º Golpe bem-sucedido da arma neste combate +1d6 de precisão, 2d6 no 9º, 3d6 no 15º). 9º: Tiro Vital. 15º: Tiro Fantasma (exibição).',
        skillGrants: [
          { id: 'way-stealth', rank: 'trained', skillId: 'stealth' },
        ],
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 109,
      },
      {
        id: 'way-spellshot',
        name: 'Caminho do Tiro Arcano',
        originalName: 'Way of the Spellshot',
        description:
          'Arcana + arma: energia na bala e grimório de mago. Arquétipo de classe — pegue Dedicação de Spellshot no 2º nível.',
        rulesSummary:
          'Perícia: Arcana. Recarga: Recarga Pensativa (1 ação: Recordar Conhecimento + recarregar). Inicial: Tiro de Energia (livre na iniciativa: sacar; nos 3 primeiros Golpes do combate, +1 de ácido/frio/fogo/eletricidade por dado da arma). 9º: Recolher Munição. 15º: Bala Dissipadora. Obrigatório: Dedicação de Spellshot como feito de classe do 2º (grimório com 4 truques arcanos — você escolhe; prepara 2 por dia; Inteligência).',
        skillGrants: [
          { id: 'way-arcana', rank: 'trained', skillId: 'arcana' },
        ],
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 140,
      },
      {
        id: 'way-vanguard',
        name: 'Caminho da Vanguarda',
        originalName: 'Way of the Vanguard',
        description:
          'Engenharia de cerco anã: armas pesadas, área larga, abrir buraco e defender o terreno.',
        rulesSummary:
          'Perícia: Atletismo. Recarga: Abrir Caminho (1 ação, arma de duas mãos: Empurrar com a arma + recarregar; soma o bônus de item da arma no Atletismo). Inicial: Fortificação Viva (livre na iniciativa: sacar e aparar, +1 na CA no 1º turno / +2 se a arma tiver aparar). 9º: Esmagamento Giratório. 15º: Quebra-cerco.',
        skillGrants: [
          { id: 'way-athletics', rank: 'trained', skillId: 'athletics' },
        ],
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 110,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Exibição',
      originalName: 'Flourish',
      description:
        'Ação que cansa demais para repetir. Só 1 ação com o traço exibição por turno.',
    },
    {
      name: 'Pane',
      originalName: 'Misfire',
      description:
        'Arma de fogo suja (disparada ontem ou antes, sem limpar): teste simples CD 5 antes do ataque. Falha = pane e emperra (crítico automático; Interagir para desentupir antes de recarregar). 1 hora de limpeza (até ~5 armas) evita pane até o dia seguinte, salvo efeito que cause pane.',
    },
    {
      name: 'Recarga do atirador',
      originalName: "Slinger's Reload",
      description:
        'Ação do caminho que inclui Interagir para recarregar. Cobre recarga 1; em recarga 2+ só dá uma das Interações — o resto você paga à parte.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Especialista em arma de fogo desde o 1º',
      originalName: "Slinger's Precision",
      body: 'Você já começa especialista em armas de fogo e bestas (simples e marciais). Precisão: +2 de precisão em bestas sem repetição; +1d4 de precisão em armas de fogo sem repetição. No 13º (Lenda do Tiro) isso vira +3 / +1d6. Arma combinada cuja forma à distância é arma de fogo/besta usa essa proficiência também no corpo a corpo.',
    },
    {
      title: 'Caminho = recarga + feitos',
      originalName: "Gunslinger's Way",
      body: 'Cada caminho troca o “recarregar chato” por uma ação que já faz outra coisa (Golpe, Distração, cobertura, Empurrar…). O feito inicial dispara na iniciativa. Avançado no 9º, maior no 15º. Tiro Arcano mistura um pouco de magia na bala — ainda não é conjurador; sem espaços (rituais na aba Magias).',
    },
    {
      title: 'Limpe a arma',
      originalName: 'Misfire',
      body: 'Se você atirou ontem e não limpou, role CD 5 simples ou a arma emperra. Habilidades que causam pane transformam o ataque em falha crítica. Anote na ficha: limpou hoje?',
    },
    {
      title: 'Teimosia (3º)',
      originalName: 'Stubborn',
      body: 'Vontade sobe para especialista. Se falhar (não criticamente) numa salvaguarda de Vontade que causaria controlado, você tenta de novo no início do próximo turno. Sucesso tira só o controlado.',
    },
    {
      title: 'Lenda do tiro (13º) e fio do atirador (17º)',
      originalName: "Gunslinging Legend & Shootist's Edge",
      body: '13º: lendário com armas de fogo/bestas simples e marciais. 17º: CD de classe mestre; ignore a penalidade do 2º e 3º incremento de alcance em arma à distância em que você é mestre ou melhor.',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial de Destreza, 8 PV, armadura média, incomum. Você mata de longe (ou no corpo a corpo, se for Errante/Vanguarda). Feito de classe já no 1º. Sem magia.',
    },
  ],
  lore: {
    summary:
      'Enquanto outros temem projéteis, você saboreia o clarão, o recuo e a fumaça do tiro — ou o estalo da corda e o thunk da besta. Sempre pronto para cravar a mira: reflexos, pulso firme e conhecimento das armas.',
    duringCombat:
      'Você ataca à distância para derrubar o inimigo antes que vire ameaça. Escondido no primeiro tiro, pistolas no meio da briga, ou um único disparo no momento certo.',
    duringSocial:
      'Olho treinado: vê as coisas de mais longe. Pode não ser a alma da festa, mas o grupo presta atenção no aceno ou no grunhido preocupado.',
    whileExploring:
      'Batedor da posição do grupo, portas secretas e passagens, sempre de olho no que não deveria estar ali.',
    inDowntime:
      'Fabrica munição, limpa armas complexas, pega bico de ferreiro, engenheiro ou guarda. Vagueia de vila em vila — ou fica um tempo no silêncio entre os tiroteios.',
    youMight: [
      'Procurar zonas de conflito onde sua arma constrói reputação.',
      'Explorar horizontes novos, confiando nos sentidos e na arma.',
      'Saber tudo de armas e munição — e querer a novidade tecnológica.',
    ],
    othersProbably: [
      'Acham que, se você entende a arma, resolve qualquer desafio mecânico.',
      'Te subestimam: “só usa arma porque não tem outra perícia”.',
      'Respeitam a vigília eterna, a teimosia e a pontaria.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Proficiências iniciais',
        'Caminho do pistolero',
        'Feito inicial',
        'Feito de pistolero',
        'Precisão do atirador',
      ],
    },
    { level: 2, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Feito geral', 'Aumento de perícia', 'Teimosia'],
    },
    { level: 4, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Maestria com armas de pistolero',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Feito geral',
        'Maestria em Percepção',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 8, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito avançado',
        'Feito de ancestralidade',
        'Expertise de pistolero',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de pistolero', 'Feito de perícia'],
    },
    {
      level: 11,
      features: ['Esquiva de explosão', 'Feito geral', 'Aumento de perícia'],
    },
    { level: 12, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Lenda do tiro',
        'Expertise em armadura média',
        'Aumento de perícia',
      ],
    },
    { level: 14, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Feito maior',
        'Especialização maior em arma',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Constituição de chumbo',
        'Fio do atirador',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de pistolero', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Maestria em armadura média',
        'Percepção lendária',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de pistolero', 'Feito de perícia'],
    },
  ],
  extraTables: [
    {
      id: 'gunslinger-precision',
      title: 'Precisão do Atirador',
      subtitle: 'Guns & Gears Remastered',
      caption:
        'Só em armas sem o traço repetição. Arma combinada cuja forma à distância é arma de fogo ou besta usa essa precisão também no corpo a corpo. Lenda do Tiro (13º) sobe os valores.',
      columns: [
        { key: 'levels', label: 'Níveis', align: 'center' },
        { key: 'xbow', label: 'Besta', align: 'center' },
        { key: 'gun', label: 'Arma de fogo', align: 'center' },
      ],
      rows: [
        { key: 'prec-1', level: 1, cells: ['1–12', '+2', '+1d4'] },
        { key: 'prec-13', level: 13, cells: ['13–20', '+3', '+1d6'] },
      ],
    },
  ],
  features: [
    {
      id: 'gunslinger-way',
      name: 'Caminho do Pistolero',
      originalName: "Gunslinger's Way",
      level: 1,
      description:
        'Escolha um caminho: perícia, recarga do atirador, feito inicial, e depois feito avançado (9º) e maior (15º).',
    },
    {
      id: 'gunslinger-slingers-precision',
      name: 'Precisão do Atirador',
      originalName: "Slinger's Precision",
      level: 1,
      description:
        '+2 de precisão em Golpes com bestas sem o traço repetição. +1d4 de precisão em Golpes com armas de fogo sem repetição. Com Lenda do Tiro: +3 / +1d6. Arma combinada cuja forma à distância é arma de fogo ou besta usa a proficiência de arma de fogo/besta também no corpo a corpo.',
    },
    {
      id: 'gunslinger-stubborn',
      name: 'Teimosia',
      originalName: 'Stubborn',
      level: 3,
      description:
        'Vontade sobe para especialista. Se falhar (não criticamente) numa salvaguarda de Vontade que causaria controlado, tenta de novo no início do próximo turno; sucesso encerra só o controlado.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'expert' }],
    },
    {
      id: 'gunslinger-weapon-mastery',
      name: 'Maestria com Armas de Pistolero',
      originalName: 'Gunslinger Weapon Mastery',
      level: 5,
      description:
        'Armas de fogo e bestas simples e marciais sobem para mestre; avançadas, armas simples, marciais e desarmados sobem para especialista. Ganha os efeitos de especialização crítica de armas de fogo e bestas.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simpleFirearm', 'martialFirearm'],
          rank: 'master',
        },
        {
          kind: 'attackRank',
          categories: ['advancedFirearm', 'simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'gunslinger-perception-mastery',
      name: 'Maestria em Percepção',
      originalName: 'Perception Mastery',
      level: 7,
      description: 'Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'gunslinger-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'gunslinger-advanced-deed',
      name: 'Feito Avançado',
      originalName: 'Advanced Deed',
      level: 9,
      description: 'Ganha o feito avançado do seu caminho.',
    },
    {
      id: 'gunslinger-expertise',
      name: 'Expertise de Pistolero',
      originalName: 'Gunslinger Expertise',
      level: 9,
      description: 'CD de classe sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'gunslinger-blast-dodger',
      name: 'Esquiva de Explosão',
      originalName: 'Blast Dodger',
      level: 11,
      description:
        'Reflexos sobem para mestre. Sucesso em Reflexos vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'gunslinger-gunslinging-legend',
      name: 'Lenda do Tiro',
      originalName: 'Gunslinging Legend',
      level: 13,
      description:
        'Armas de fogo e bestas simples e marciais sobem para lendário; avançadas, armas simples, marciais e desarmados sobem para mestre. Precisão do atirador: +3 / +1d6.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simpleFirearm', 'martialFirearm'],
          rank: 'legendary',
        },
        {
          kind: 'attackRank',
          categories: ['advancedFirearm', 'simple', 'martial', 'unarmed'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'gunslinger-medium-armor-expertise',
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
      id: 'gunslinger-greater-deed',
      name: 'Feito Maior',
      originalName: 'Greater Deed',
      level: 15,
      description: 'Ganha o feito maior do seu caminho.',
    },
    {
      id: 'gunslinger-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'gunslinger-lead-constitution',
      name: 'Constituição de Chumbo',
      originalName: 'Lead Constitution',
      level: 17,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'gunslinger-shootists-edge',
      name: 'Fio do Atirador',
      originalName: "Shootist's Edge",
      level: 17,
      description:
        'CD de classe sobe para mestre. Com arma à distância em que você é mestre ou melhor, ignore a penalidade do 2º e 3º incremento de alcance.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'gunslinger-medium-armor-mastery',
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
    {
      id: 'gunslinger-perception-legend',
      name: 'Percepção Lendária',
      originalName: 'Perception Legend',
      level: 19,
      description: 'Proficiência em Percepção sobe para lendário.',
      effects: [{ kind: 'perceptionRank', rank: 'legendary' }],
    },
  ],
}
