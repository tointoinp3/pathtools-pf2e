import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'
import { monkSpellcasting } from './monkSpellcasting'
import { CLASS_MONK_ID } from './ids'

export { CLASS_MONK_ID }

/** Monge — Player Core 2 (Remaster), AoN Classes ID 60 */
export const monkClass: CharacterClass = {
  id: CLASS_MONK_ID,
  name: 'Monge',
  originalName: 'Monk',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 114,
  hitPointsPerLevel: 10,
  keyAttributeOptions: ['strength', 'dexterity'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'expert',
    will: 'expert',
  },
  skills: {
    additionalBase: 4,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'unarmored', rank: 'expert', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  spellcasting: monkSpellcasting,
  keyTerms: [
    {
      name: 'Exibição',
      originalName: 'Flourish',
      description:
        'Ações com o traço flourish exigem esforço demais para uso frequente. Você só pode usar 1 ação com o traço flourish por turno. Rajada de Golpes é flourish — então é no máximo uma rajada por turno.',
    },
    {
      name: 'Postura',
      originalName: 'Stance',
      description:
        'Estratégia de combate que você entra com uma ação de postura e mantém. Dura até você cair, violar requisitos, o encontro acabar ou entrar em outra postura. Depois de uma ação de postura, não pode usar outra por 1 rodada. Só em modo de encontro. Pode Dispensar a postura.',
    },
    {
      name: 'Magias de Qi',
      originalName: 'Qi Spells',
      description:
        'Magias de foco alimentadas pela reserva interna de qi. Ao ganhar a primeira, escolha tradição divina ou oculta; fica treinado em ataque/CD de magia (Sabedoria) e ganha reserva de 1 PF. Recarrega nas preparações ou com 10 min de Refocar (mente e respiração). Altura = metade do nível. Máximo da reserva = nº de magias de foco (até 3).',
    },
    {
      name: 'Incapacitação',
      originalName: 'Incapacitation',
      description:
        'Efeitos que podem tirar alguém da luta. Contra criatura de nível maior que o seu, o grau de sucesso do seu ataque cai um degrau e o da salvaguarda dela sobe um degrau.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Rajada de Golpes é o motor',
      originalName: 'Flurry of Blows',
      body: '1 ação (flourish): dois Golpes desarmados. Se os dois acertam a mesma criatura, some o dano para resistências/fraquezas. Penalidade de ataque múltiplo aplica normalmente. Só uma vez por turno — o resto do turno é movimento, postura ou um terceiro golpe.',
    },
    {
      title: 'Punho Poderoso',
      originalName: 'Powerful Fist',
      body: 'Seu punho causa 1d6 (não 1d4) e você não sofre −2 ao atacar de forma letal com punhos ou outros ataques desarmados. O monge luta de verdade com as mãos — não é “soco de brincadeira”.',
    },
    {
      title: 'Feito de 1º = seu estilo',
      body: 'Não há subclasse: o feito de monge no 1º (e nos pares) define o jeito de lutar. Posturas (Tigre, Lobo, Montanha, Garça…) mudam o que seus golpes fazem. Magias de Qi abrem cura, explosão e voo. Armas Monásticas deixa usar certas armas na rajada. Escolha o feito na aba de feitos.',
    },
    {
      title: 'Sem armadura, rápido e difícil de acertar',
      originalName: 'Incredible Movement',
      body: 'Especialista em defesa sem armadura já no 1º. No 3º, +3 m de deslocamento se não estiver de armadura (sobe +1,5 m a cada 4 níveis). Armadura atrapalha o kit — o monge quer estar leve.',
    },
    {
      title: 'Caminho da Perfeição',
      originalName: 'Path to Perfection',
      body: 'No 7º escolha Fortitude, Reflexos ou Vontade: sobe a mestre e sucesso vira crítico. No 11º, outra salvaguarda. No 15º, uma das duas vai a lendário (falha crítica vira falha; falha contra dano causa metade). Três salvaguardas especialistas no 1º já fazem do monge o mais resistente a efeitos.',
    },
    {
      title: 'Papel no grupo',
      body: 'Dano corpo a corpo em rajada, mobilidade e salvaguardas altas. Sabedoria ajuda Percepção, Vontade e magias de qi. Força ou Destreza no atributo-chave: Força bate mais; Destreza esquiva e acerta com armas ágeis.',
    },
  ],
  lore: {
    summary:
      'A força do punho vem da mente e do espírito. Você busca perfeição: o corpo como instrumento impecável, a mente como bastião de sabedoria. Combatente feroz, famoso por artes marciais e posturas — e também por meditar sobre paz e iluminação.',
    duringCombat:
      'Entra na briga rápido, desvia ou salta obstáculos. Golpeia em rajada com punhos ou armas monásticas. Posturas mudam o estilo; qi permite feitos místicos como curar-se ou voar.',
    duringSocial:
      'Perceptivo contra mentiras; treino filosófico dá leitura de qualquer situação.',
    whileExploring:
      'Escala paredes, desvia de armadilhas, salta fossos. Costuma ficar na borda do grupo para proteger os mais frágeis; serve bem para procurar perigo ou mover-se em furtividade.',
    inDowntime:
      'Exercício diligente, alimentação saudável, meditação e estudo de filosofias. Pode aperfeiçoar um ofício.',
    youMight: [
      'Manter um regime de treino físico e meditação.',
      'Enfrentar adversidade com calma medida, sem pânico nem desespero.',
      'Olhar para o futuro em busca de melhorar, em paz com quem você é agora.',
    ],
    othersProbably: [
      'Maravilham-se com seus feitos físicos.',
      'Acham você um pouco rígido, dados os votos e preceitos.',
      'Vêm até você em busca de conselho filosófico.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Rajada de Golpes',
        'Feito de monge',
        'Punho Poderoso',
      ],
    },
    { level: 2, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Feito geral',
        'Movimento Incrível +3 m',
        'Golpes Místicos',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Golpes Especialistas',
        'Percepção especialista',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Feito geral',
        'Movimento Incrível +4,5 m',
        'Caminho da Perfeição',
        'Aumento de perícia',
        'Especialização em Arma',
      ],
    },
    { level: 8, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Golpes Metálicos',
        'Expertise de Monge',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de monge', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Feito geral',
        'Movimento Incrível +6 m',
        'Segundo Caminho da Perfeição',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Maestria Graciosa',
        'Golpes Mestres',
        'Aumento de perícia',
      ],
    },
    { level: 14, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Especialização Maior em Arma',
        'Movimento Incrível +7,5 m',
        'Aumento de perícia',
        'Terceiro Caminho da Perfeição',
      ],
    },
    { level: 16, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Golpes de Adamantina',
        'Feito de ancestralidade',
        'Lenda Graciosa',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de monge', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Movimento Incrível +9 m',
        'Forma Aperfeiçoada',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de monge', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'monk-flurry-of-blows',
      name: 'Rajada de Golpes',
      originalName: 'Flurry of Blows',
      level: 1,
      actionType: 'one',
      description:
        'Faça dois Golpes desarmados. Se ambos acertarem a mesma criatura, some o dano para resistências e fraquezas. Aplique a penalidade de ataque múltiplo normalmente. Flourish: só uma vez por turno.',
    },
    {
      id: 'monk-powerful-fist',
      name: 'Punho Poderoso',
      originalName: 'Powerful Fist',
      level: 1,
      description:
        'O dado de dano do punho sobe para 1d6. Você não sofre a penalidade de −2 ao fazer ataques letais com o punho ou outros ataques desarmados.',
    },
    {
      id: 'monk-incredible-movement',
      name: 'Movimento Incrível',
      originalName: 'Incredible Movement',
      level: 3,
      description:
        '+3 m de bônus de status no Deslocamento quando não estiver de armadura. Sobe +1,5 m a cada 4 níveis após o 3º (+4,5 m no 7º, +6 m no 11º, +7,5 m no 15º, +9 m no 19º).',
      effects: [
        {
          kind: 'speedBonus',
          value: 10,
          extraEveryLevels: 4,
          extraAmount: 5,
          unarmoredOnly: true,
        },
      ],
    },
    {
      id: 'monk-mystic-strikes',
      name: 'Golpes Místicos',
      originalName: 'Mystic Strikes',
      level: 3,
      description:
        'Seus ataques desarmados se tornam mágicos e atravessam resistência a ataques não mágicos. Ainda precisa de item (ex.: envoltórios de golpes poderosos) para bônus de item ou dados extras de dano.',
    },
    {
      id: 'monk-expert-strikes',
      name: 'Golpes Especialistas',
      originalName: 'Expert Strikes',
      level: 5,
      description:
        'Ataques desarmados e armas simples sobem para especialista. Acerto crítico com ataque desarmado do grupo briga aplica o efeito de especialização crítica.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['unarmed', 'simple'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'monk-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 5,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'monk-path-to-perfection',
      name: 'Caminho da Perfeição',
      originalName: 'Path to Perfection',
      level: 7,
      description:
        'Escolha Fortitude, Reflexos ou Vontade. A proficiência escolhida sobe para mestre. Sucesso nessa salvaguarda vira sucesso crítico.',
      effects: [
        {
          kind: 'saveRankChoice',
          choiceId: 'path-to-perfection',
          rank: 'master',
          hint: 'Escolha a salvaguarda. Sobe para mestre; sucesso vira crítico.',
        },
      ],
    },
    {
      id: 'monk-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'monk-metal-strikes',
      name: 'Golpes Metálicos',
      originalName: 'Metal Strikes',
      level: 9,
      description:
        'Ataques desarmados contam como ferro frio e prata (melhor contra demônios, diabos, fadas e similares).',
    },
    {
      id: 'monk-expertise',
      name: 'Expertise de Monge',
      originalName: 'Monk Expertise',
      level: 9,
      description:
        'CD de classe sobe para especialista. Se tiver magias de qi, ataque de magia e CD de magia também sobem para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'monk-second-path',
      name: 'Segundo Caminho da Perfeição',
      originalName: 'Second Path to Perfection',
      level: 11,
      description:
        'Escolha outra salvaguarda diferente da primeira. Sobe para mestre; sucesso vira crítico.',
      effects: [
        {
          kind: 'saveRankChoice',
          choiceId: 'second-path-to-perfection',
          rank: 'master',
          excludeChoiceIds: ['path-to-perfection'],
          hint: 'Escolha outra salvaguarda. Sobe para mestre; sucesso vira crítico.',
        },
      ],
    },
    {
      id: 'monk-graceful-mastery',
      name: 'Maestria Graciosa',
      originalName: 'Graceful Mastery',
      level: 13,
      description: 'Defesa sem armadura sobe para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'monk-master-strikes',
      name: 'Golpes Mestres',
      originalName: 'Master Strikes',
      level: 13,
      description: 'Ataques desarmados e armas simples sobem para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['unarmed', 'simple'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'monk-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização sobe para +4 (especialista), +6 (mestre) ou +8 (lendário).',
    },
    {
      id: 'monk-third-path',
      name: 'Terceiro Caminho da Perfeição',
      originalName: 'Third Path to Perfection',
      level: 15,
      description:
        'Escolha uma das salvaguardas já aperfeiçoadas. Sobe para lendário. Falha crítica vira falha. Falha contra efeito que causa dano: metade do dano.',
      effects: [
        {
          kind: 'saveRankChoice',
          choiceId: 'third-path-to-perfection',
          rank: 'legendary',
          requireRank: 'master',
          hint: 'Escolha uma salvaguarda já aperfeiçoada. Sobe para lendário.',
        },
      ],
    },
    {
      id: 'monk-adamantine-strikes',
      name: 'Golpes de Adamantina',
      originalName: 'Adamantine Strikes',
      level: 17,
      description: 'Ataques desarmados contam como adamantina.',
    },
    {
      id: 'monk-graceful-legend',
      name: 'Lenda Graciosa',
      originalName: 'Graceful Legend',
      level: 17,
      description:
        'Defesa sem armadura sobe para lendário. CD de classe sobe para mestre. Se tiver magias de qi, ataque/CD de magia também sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['unarmored'],
          rank: 'legendary',
        },
        { kind: 'classDcRank', rank: 'master' },
      ],
    },
    {
      id: 'monk-perfected-form',
      name: 'Forma Aperfeiçoada',
      originalName: 'Perfected Form',
      level: 19,
      description:
        'No primeiro Golpe do seu turno, se rolar menos de 10, pode tratar a rolagem como 10. Efeito de destino (fortune).',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=60',
}
