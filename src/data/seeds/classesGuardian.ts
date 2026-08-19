import type { CharacterClass } from '@/types/class'
import { SOURCE_BATTLECRY_ID } from './sources'
import { CLASS_GUARDIAN_ID } from './ids'

export { CLASS_GUARDIAN_ID }

/** Guardião — Battlecry!, AoN Classes ID 67 */
export const guardianClass: CharacterClass = {
  id: CLASS_GUARDIAN_ID,
  name: 'Guardião',
  originalName: 'Guardian',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_BATTLECRY_ID,
  sourcePage: 37,
  hitPointsPerLevel: 12,
  keyAttributeOptions: ['strength'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'guardian-athletics', rank: 'trained', skillId: 'athletics' }],
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
    { category: 'heavy', rank: 'trained', label: 'Armadura pesada' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=67',
  keyTerms: [
    {
      name: 'Provocar',
      originalName: 'Taunt',
      description:
        '1 ação. Escolhe 1 inimigo a até 9 m. Se ele fizer ação hostil que inclua ao menos 1 aliado e não você: −1 de circunstância nas jogadas de ataque e CDs daquela ação, e fica desprevenido até o início do próximo turno dele. Dura até o início do seu próximo turno. Só 1 Provocar por vez (nova troca o alvo). Mesmo criaturas sem mente caem. Traço auditivo, visual ou ambos, conforme o gesto.',
    },
    {
      name: 'Interceptar Ataque',
      originalName: 'Intercept Attack',
      description:
        'Reação. Gatilho: aliado a até 3 m sofre dano físico. Você dá um Passo (precisa terminar adjacente) e sofre o dano no lugar — suas imunidades, fraquezas e resistências, não as dele. Se o dano vem do inimigo Provocado: alcance 4,5 m; se o Passo não alcança, pode Caminhar (ainda precisa terminar adjacente).',
    },
    {
      name: 'Exibição',
      originalName: 'Flourish',
      description:
        'Técnica pesada: só 1 ação com o traço Exibição por rodada.',
    },
    {
      name: 'Postura',
      originalName: 'Stance',
      description:
        'Estratégia de combate. Entra com uma ação de postura; dura até nocaute, requisitos quebrados, fim do encontro ou nova postura. Depois de uma postura, 1 rodada sem outra. Só em encontro. Pode Dispensar.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'A parede de aço',
      originalName: "Guardian's Armor",
      body: 'Com armadura média ou pesada: resistência a dano físico = 1 + metade do nível. Dorme de armadura média/pesada sem penalidade. A proficiência de armadura sobe sozinha e desigual: média/pesada vão a especialista (5º), mestre (11º) e lendário (15º); leve e sem armadura só acompanham no 11º (especialista) e 15º (mestre). No 19º, contra efeito que causa dano (bola de fogo etc.), pode usar o bônus de item da armadura no Reflexos no lugar da Destreza (+1 se a armadura tem Baluarte); sucesso vira crítico.',
    },
    {
      title: 'Provocar para proteger',
      originalName: 'Taunt',
      body: 'O melhor jeito de guardar o grupo é o inimigo querer você. 1 ação, 9 m, 1 alvo. Se ele atacar (ou usar CD) incluindo aliado e sem você: −1 e desprevenido. Troca de alvo encerra a anterior. Interceptar fica melhor contra o Provocado (4,5 m e Caminhar se o Passo não chega).',
    },
    {
      title: 'Interceptar e reações de sobra',
      originalName: 'Intercept Attack / Ever Ready / Reaction Time',
      body: 'Interceptar Ataque: você toma o dano físico no lugar do aliado. Sempre Pronto: na iniciativa, ganha 1 reação só para feitos/recursos de guardião. No 7º (Tempo de Reação): Percepção especialista e, no início de cada turno, +1 reação só de guardião (inclui Bloqueio com Escudo); a da iniciativa também, se tiver Sempre Pronto.',
    },
    {
      title: 'Cair e não morrer',
      originalName: 'Tough to Kill',
      body: 'No 3º: feito geral Difícil de Matar (morre no dobro do máximo de PV negativos). Se já tinha, retreina. Além disso, a 1ª vez no dia em que iria a morrendo 3 ou mais, fica em morrendo 2.',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial de Força, 12 PV, todas as armaduras, feito de classe já no 1º. Você não é o que mais acerta: é o que não deixa o outro cair. Provoca, intercepta, trava o campo. Sem magia.',
    },
  ],
  lore: {
    summary:
      'Morte e perigo ameaçam o que você e os seus amam. Você é o escudo, a parede de aço. Armadura como segunda pele: desvia dano, segura o avanço. Aliado na linha de frente ou atrás conta com você; inimigo vê a ameaça. Sua presença é difícil de ignorar.',
    duringCombat:
      'Saca até a última gota de proteção da armadura. Toma o golpe do aliado vulnerável. Provoca para o ódio vir para você.',
    duringSocial:
      'Conforme a origem: amistoso ou coercitivo. Fica mais à vontade no campo, onde amigo e inimigo se separam — mas ainda cria laço com soldado e quem já viu o mesmo.',
    whileExploring:
      'Vigilante, pronto para entrar. Armadura o dia todo deixou o corpo forte: objeto pesado, muro, o que for.',
    inDowntime:
      'Armadura e escudo amassados da última saída: conserta e afina. Trabalho braçal ou guarda da vila pagam o extra.',
    youMight: [
      'Ficar firme contra o impossível, confiando na armadura.',
      'Brincar de bom humor que o dano que você tomou salvou a vida de alguém.',
      'Demorar a confiar em quem não é aliado — assume que quer te ferir.',
    ],
    othersProbably: [
      'Agradecem a solidez da armadura, sobretudo quando ela come o golpe deles.',
      'Não entendem por que você se põe em perigo provocando.',
      'Sentem-se mais seguros com você perto no campo.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Feito de guardião',
        'Armadura do guardião',
        'Bloqueio com escudo',
        'Provocar',
        'Técnicas do guardião',
      ],
    },
    { level: 2, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Feito geral', 'Aumento de perícia', 'Difícil de matar'],
    },
    { level: 4, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Aumento de perícia',
        'Expertise inquebrável',
        'Expertise com armas',
      ],
    },
    { level: 6, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Feito geral',
        'Tempo de reação',
        'Expertise em Reflexos',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Calejado em batalha',
        'Expertise de guardião',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de guardião', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Feito geral',
        'Aumento de perícia',
        'Maestria inquebrável',
        'Especialização em arma',
      ],
    },
    { level: 12, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    { level: 14, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Aumento de perícia',
        'Lenda inquebrável',
      ],
    },
    { level: 16, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Especialização maior em arma',
        'Aumento de perícia',
        'Determinação inflexível',
      ],
    },
    { level: 18, features: ['Feito de guardião', 'Feito de perícia'] },
    {
      level: 19,
      features: ['Feito geral', 'Maestria de guardião', 'Aumento de perícia'],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de guardião', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'guardian-armor',
      name: 'Armadura do Guardião',
      originalName: "Guardian's Armor",
      level: 1,
      description:
        'Com armadura média ou pesada: resistência a dano físico = 1 + metade do nível. Pode descansar normalmente de armadura média ou pesada.',
    },
    {
      id: 'guardian-shield-block',
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
      id: 'guardian-taunt',
      name: 'Provocar',
      originalName: 'Taunt',
      level: 1,
      actionType: 'one',
      description:
        'Inimigo a até 9 m. Se a ação hostil dele incluir aliado e não você: −1 de circunstância em ataques e CDs daquela ação, e desprevenido até o início do próximo turno dele. Dura até o início do seu próximo turno. Só 1 alvo. Auditivo, visual ou ambos.',
    },
    {
      id: 'guardian-ever-ready',
      name: 'Sempre Pronto',
      originalName: 'Ever Ready',
      level: 1,
      description:
        'Na iniciativa, ganha 1 reação só para feitos ou recursos de guardião. O mestre ainda pode permitir outras reações antes do 1º turno, como de costume.',
    },
    {
      id: 'guardian-intercept-attack',
      name: 'Interceptar Ataque',
      originalName: 'Intercept Attack',
      level: 1,
      actionType: 'reaction',
      trigger: 'Um aliado a até 3 m sofre dano físico.',
      description:
        'Passo (terminar adjacente) e sofre o dano no lugar — suas imunidades, fraquezas e resistências. Se o dano vem do Provocado: 4,5 m; se o Passo não alcança, pode Caminhar (ainda adjacente no fim).',
    },
    {
      id: 'guardian-tough-to-kill',
      name: 'Difícil de Matar',
      originalName: 'Tough to Kill',
      level: 3,
      description:
        'Ganha o feito geral Difícil de Matar (se já tinha, retreina). A 1ª vez no dia em que iria a morrendo 3 ou mais, fica em morrendo 2.',
      effects: [
        {
          kind: 'grantedFeat',
          featId: 'feat-diehard',
          featName: 'Difícil de Matar',
          originalName: 'Diehard',
          featType: 'general',
        },
      ],
    },
    {
      id: 'guardian-unbreakable-expertise',
      name: 'Expertise Inquebrável',
      originalName: 'Unbreakable Expertise',
      level: 5,
      description:
        'Armadura média e pesada sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['medium', 'heavy'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'guardian-weapon-expertise',
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
      id: 'guardian-reaction-time',
      name: 'Tempo de Reação',
      originalName: 'Reaction Time',
      level: 7,
      description:
        'Percepção sobe para especialista. No início de cada turno, +1 reação só para feitos/recursos de guardião (inclui Bloqueio com Escudo). Com Sempre Pronto, essa reação extra também vem na iniciativa.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'guardian-reflex-expertise',
      name: 'Expertise em Reflexos',
      originalName: 'Reflex Expertise',
      level: 7,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'guardian-battle-hardened',
      name: 'Calejado em Batalha',
      originalName: 'Battle Hardened',
      level: 9,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'guardian-expertise',
      name: 'Expertise de Guardião',
      originalName: 'Guardian Expertise',
      level: 9,
      description: 'CD de classe sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'guardian-unbreakable-mastery',
      name: 'Maestria Inquebrável',
      originalName: 'Unbreakable Mastery',
      level: 11,
      description:
        'Armadura média e pesada sobem para mestre. Armadura leve e defesa sem armadura sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['medium', 'heavy'],
          rank: 'master',
        },
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'guardian-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 11,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'guardian-weapon-mastery',
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
      id: 'guardian-unbreakable-legend',
      name: 'Lenda Inquebrável',
      originalName: 'Unbreakable Legend',
      level: 15,
      description:
        'Armadura média e pesada sobem para lendário. Armadura leve e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['medium', 'heavy'],
          rank: 'legendary',
        },
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'guardian-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 17,
      description:
        'Dano de especialização: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'guardian-unyielding-resolve',
      name: 'Determinação Inflexível',
      originalName: 'Unyielding Resolve',
      level: 17,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'guardian-mastery',
      name: 'Maestria de Guardião',
      originalName: 'Guardian Mastery',
      level: 19,
      description:
        'CD de classe sobe para mestre. De armadura, em Reflexos contra efeito que causa dano: pode usar o bônus de item da armadura no lugar da Destreza (+1 se Baluarte). Sucesso vira crítico.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
  ],
}
