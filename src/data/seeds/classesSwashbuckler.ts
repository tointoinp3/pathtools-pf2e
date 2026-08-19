import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'
import { CLASS_SWASHBUCKLER_ID } from './ids'

export { CLASS_SWASHBUCKLER_ID }

/** Espadachim — Player Core 2 (Remaster), AoN Classes ID 63 */
export const swashbucklerClass: CharacterClass = {
  id: CLASS_SWASHBUCKLER_ID,
  name: 'Espadachim',
  originalName: 'Swashbuckler',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 158,
  hitPointsPerLevel: 10,
  keyAttributeOptions: ['dexterity'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'trained',
    reflex: 'expert',
    will: 'expert',
  },
  skills: {
    fixed: [
      { id: 'swashbuckler-acrobatics', rank: 'trained', skillId: 'acrobatics' },
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
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=63',
  subclass: {
    id: 'swashbuckler-style',
    label: 'Estilo',
    description:
      'Seu jeito de ganhar panache além de Atravessar Rolando. Define a perícia extra e o efeito do Finalizador Exemplar (9º). Fonte: Player Core 2, pág. 160.',
    required: true,
    options: [
      {
        id: 'style-battledancer',
        name: 'Dançarino de Batalha',
        originalName: 'Battledancer',
        description:
          'A luta é arte: você prende a atenção com movimentos hipnóticos.',
        rulesSummary:
          'Perícia: Performance. Feito: Performance Fascinante. Performar ganha bravata. Exemplar (9º): Passo como ação livre logo após o finalizador.',
        skillGrants: [
          {
            id: 'style-performance',
            rank: 'trained',
            skillId: 'performance',
          },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 160,
      },
      {
        id: 'style-braggart',
        name: 'Fanfarrão',
        originalName: 'Braggart',
        description:
          'Você se gaba, provoca e cutuca a cabeça do inimigo.',
        rulesSummary:
          'Perícia: Intimidação. Desmoralizar ganha bravata. Exemplar (9º): se o alvo estava imune temporariamente ao seu Desmoralizar, a imunidade acaba.',
        skillGrants: [
          {
            id: 'style-intimidation',
            rank: 'trained',
            skillId: 'intimidation',
          },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 160,
      },
      {
        id: 'style-fencer',
        name: 'Esgrimista',
        originalName: 'Fencer',
        description:
          'Você se move com cuidado, finta e abre falsas brechas para o inimigo errar.',
        rulesSummary:
          'Perícia: Enganação. Criar uma Distração e Fintar ganham bravata. Exemplar (9º): o alvo fica desprevenido até o seu próximo turno.',
        skillGrants: [
          { id: 'style-deception', rank: 'trained', skillId: 'deception' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 161,
      },
      {
        id: 'style-gymnast',
        name: 'Ginasta',
        originalName: 'Gymnast',
        description:
          'Reposiciona, manobra e confunde com proezas físicas ousadas.',
        rulesSummary:
          'Perícia: Atletismo. Agarrar, Reposicionar, Empurrar e Derrubar ganham bravata. Exemplar (9º): se o alvo está agarrado, imobilizado ou caído, +2 de circunstância no dano por dado da arma.',
        skillGrants: [
          { id: 'style-athletics', rank: 'trained', skillId: 'athletics' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 161,
      },
      {
        id: 'style-rascal',
        name: 'Patife',
        originalName: 'Rascal',
        description:
          'Você não tem medo de jogar sujo para ganhar a vantagem.',
        rulesSummary:
          'Perícia: Ladroagem. Feito: Truque Sujo (geral). Truque Sujo ganha bravata. Exemplar (9º): o alvo sofre −3 m de circunstância no deslocamento até o início do seu próximo turno.',
        skillGrants: [
          { id: 'style-thievery', rank: 'trained', skillId: 'thievery' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 161,
      },
      {
        id: 'style-wit',
        name: 'Espírito Ácido',
        originalName: 'Wit',
        description:
          'Amigável, esperto e engraçado: a piada certa deixa o inimigo aberto para o golpe.',
        rulesSummary:
          'Perícia: Diplomacia. Feito: Comentário Ácido (Bon Mot). Comentário Ácido ganha bravata. Exemplar (9º): o alvo sofre −2 de circunstância nos ataques contra você até o início do seu próximo turno.',
        skillGrants: [
          { id: 'style-diplomacy', rank: 'trained', skillId: 'diplomacy' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 161,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Bravata',
      originalName: 'Bravado',
      description:
        'Ações com este traço podem dar panache, conforme o teste. Sucesso: panache. Falha (não crítica): panache só até o fim do seu próximo turno. Vale mesmo se a ação não teve outro efeito (falha ou imunidade). Atravessar Rolando e as ações do seu estilo ganham bravata. O mestre pode dar bravata a um ato ousado (lustre, cortina) com DC não trivial.',
    },
    {
      name: 'Panache',
      originalName: 'Panache',
      description:
        'Estado de flair. Você ganha com ações de bravata. Em geral só em encontro; no fim do encontro, perde. Finalizadores (incluindo Finalizador Confiante) exigem panache e o gastam na hora. Com panache: bônus de status no Deslocamento (Combate Estiloso / Velocidade Viva).',
    },
    {
      name: 'Finalizador',
      originalName: 'Finisher',
      description:
        'Manobra espetacular que gasta panache. Só com armas/ataques desarmados que recebem Golpe Preciso (ágil ou fineza, corpo a corpo, para a maioria). Depois do finalizador: perde panache e não pode usar ações com traço de ataque no resto do turno. Alguns dão efeito na falha (não na falha crítica); no sucesso você pode escolher o efeito de falha (ex.: resistência zerou o dano).',
    },
    {
      name: 'Apogeu',
      originalName: 'Flourish',
      description:
        'Técnicas que exigem esforço demais para repetir. Só 1 ação com o traço flourish por rodada.',
    },
    {
      name: 'Postura',
      originalName: 'Stance',
      description:
        'Estratégia de combate que você assume com uma ação de stance. Dura até inconsciente, violar requisitos, o encontro acabar ou outra stance. Após uma stance, não usa outra por 1 rodada. Só em encontro. Pode Dispensar.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Ganhe panache, gaste no finalizador',
      originalName: 'Panache',
      body: 'O loop é: ação de bravata (Atravessar Rolando ou a do estilo) → panache → Finalizador Confiante (ou outro) que gasta o panache e impede mais ataques no turno. Falha na bravata ainda dá panache até o fim do próximo turno. Anote se está com panache na ficha.',
    },
    {
      title: 'Golpe Preciso',
      originalName: 'Precise Strike',
      body: 'Golpe corpo a corpo ágil ou fineza: +2 de precisão (sobe +1 no 5º, 9º, 13º e 17º). Se o Golpe for parte de um finalizador, vira dados: 2d6, depois 3d6 / 4d6 / 5d6 / 6d6 nesses níveis. Finalizador Confiante na falha ainda causa metade desse dano de precisão.',
    },
    {
      title: 'Estilo define como você brilha',
      originalName: "Swashbuckler's Style",
      body: 'Seis estilos Remaster (Player Core 2), incluindo Patife. Cada um treina uma perícia e transforma uma ação social/atlética em bravata. No 9º o Finalizador Exemplar adiciona um efeito extra no acerto, conforme o estilo.',
    },
    {
      title: 'Riposta Oportuna (3º)',
      originalName: 'Opportune Riposte',
      body: 'Reação (bravata): inimigo no seu alcance falha criticamente um Golpe contra você. Você Golpeia corpo a corpo ou tenta Desarmar a arma usada. No 19º, Confiança Eterna deixa aplicar o efeito de falha do Finalizador Confiante nesse Golpe.',
    },
    {
      title: 'Velocidade Viva',
      originalName: 'Vivacious Speed',
      body: 'Com panache o bônus de deslocamento sobe: +1,5 m (1º), +3 m (3º), +4,5 m (7º), +6 m (11º), +7,5 m (15º), +9 m (19º). Sem panache: metade, arredondada para baixo em incrementos de 1,5 m.',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial de Destreza, 10 PV, armadura leve, armas marciais. Você dança no meio, ganha panache e explode no finalizador. Feito de classe já no 1º. Sem conjuração — a aba Magias ainda tem rituais.',
    },
  ],
  lore: {
    summary:
      'Muitos guerreiros apostam em força bruta, armadura pesada ou armas desajeitadas. Para você a batalha é uma dança: estilo, graça, finalizações com um estalo do pulso e ripostas que deixam o inimigo sem equilíbrio. Assediar e frustrar oponentes é como encantar o destino e trapacear a morte — com aplomb e muito flair.',
    duringCombat:
      'Você se exibe para ganhar panache e construir até o finalizador. Fica ágil, busca a posição certa, desvia e responde com ripostas. Conforme o estilo: dança entre inimigos, escorrega pelas defesas, ou seduz, distrai e amedronta.',
    duringSocial:
      'Tão capaz de encantar quanto de intimidar — ou os dois. Socialite hábil, ou a distração enquanto outros falam.',
    whileExploring:
      'Olho no ambiente e nas pessoas, pronto para saltar com bravata. Interage em traços largos, em vez de se esgueirar para não ser visto.',
    inDowntime:
      'Pode farrear na taverna, cuidar das armas ou treinar manobras novas. Para manter a reputação, talvez funde uma organização no seu nome ou cultive admiradores.',
    youMight: [
      'Pintar-se como herói temerário ou fanfarrão velhaco — e estar à altura da imagem.',
      'Ter alta estima de si, confiante nas habilidades e na fama.',
      'Treinar manobras com regularidade para nunca enferrujar.',
    ],
    othersProbably: [
      'Admiram o teatro, a bravata e a lâmina.',
      'Acham você arrogante até conhecerem o estilo de perto.',
      'Subestimam a ameaça até encarar a ponta da sua espada.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Panache',
        'Golpe preciso',
        'Combatente estiloso',
        'Estilo de espadachim',
        'Finalizador confiante',
        'Feito de espadachim',
      ],
    },
    { level: 2, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 3,
      features: [
        'Expertise em Fortitude',
        'Feito geral',
        'Riposta oportuna',
        'Aumento de perícia',
        'Truques estilosos',
        'Velocidade viva',
      ],
    },
    { level: 4, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Golpe preciso 3 (3d6)',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    { level: 6, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 7,
      features: [
        'Evasão confiante',
        'Feito geral',
        'Aumento de perícia',
        'Truques estilosos',
        'Velocidade viva',
        'Especialização em arma',
      ],
    },
    { level: 8, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Finalizador exemplar',
        'Golpe preciso 4 (4d6)',
        'Aumento de perícia',
        'Expertise de espadachim',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de espadachim'],
    },
    {
      level: 11,
      features: [
        'Flair contínuo',
        'Feito geral',
        'Maestria em Percepção',
        'Aumento de perícia',
        'Velocidade viva',
      ],
    },
    { level: 12, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Evasão assegurada',
        'Expertise em armadura leve',
        'Golpe preciso 5 (5d6)',
        'Aumento de perícia',
        'Maestria com armas (mestre)',
      ],
    },
    { level: 14, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Especialização maior em arma',
        'Flair aguçado',
        'Aumento de perícia',
        'Truques estilosos',
        'Velocidade viva',
      ],
    },
    { level: 16, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Golpe preciso 6 (6d6)',
        'Ego reforçado',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de perícia', 'Feito de espadachim'] },
    {
      level: 19,
      features: [
        'Confiança eterna',
        'Feito geral',
        'Maestria em armadura leve',
        'Aumento de perícia',
        'Velocidade viva',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de espadachim'],
    },
  ],
  extraTables: [
    {
      id: 'swashbuckler-precise-strike',
      title: 'Golpe Preciso',
      subtitle: 'Player Core 2',
      caption:
        'Golpe corpo a corpo ágil ou de fineza. O bônus fixo vale em qualquer desses Golpes; os dados só entram em finalizador. Finalizador Confiante na falha ainda causa metade do dano de precisão em dados.',
      columns: [
        { key: 'levels', label: 'Níveis', align: 'center' },
        { key: 'flat', label: 'Golpe', align: 'center' },
        { key: 'finisher', label: 'Finalizador', align: 'center' },
      ],
      rows: [
        { key: 'ps-1', level: 1, cells: ['1–4', '+2', '2d6'] },
        { key: 'ps-5', level: 5, cells: ['5–8', '+3', '3d6'] },
        { key: 'ps-9', level: 9, cells: ['9–12', '+4', '4d6'] },
        { key: 'ps-13', level: 13, cells: ['13–16', '+5', '5d6'] },
        { key: 'ps-17', level: 17, cells: ['17–20', '+6', '6d6'] },
      ],
    },
  ],
  features: [
    {
      id: 'swashbuckler-panache',
      name: 'Panache',
      originalName: 'Panache',
      level: 1,
      description:
        'Ganha panache com ações de bravata (Atravessar Rolando e as do estilo). Sucesso: panache. Falha: panache até o fim do próximo turno. Em geral só em encontro. Finalizadores exigem e gastam panache.',
    },
    {
      id: 'swashbuckler-precise-strike',
      name: 'Golpe Preciso',
      originalName: 'Precise Strike',
      level: 1,
      description:
        'Golpe corpo a corpo ágil ou fineza: +2 de precisão. Em finalizador: 2d6 de precisão. No 5º/9º/13º/17º: +1 no Golpe e +1d6 no finalizador (até 6 / 6d6).',
    },
    {
      id: 'swashbuckler-stylish-combatant',
      name: 'Combatente Estiloso',
      originalName: 'Stylish Combatant',
      level: 1,
      description:
        '+1 de circunstância em testes de perícia com bravata em encontro. Com panache: +1,5 m de status no Deslocamento.',
    },
    {
      id: 'swashbuckler-style',
      name: 'Estilo de Espadachim',
      originalName: "Swashbuckler's Style",
      level: 1,
      description:
        'Escolha um estilo. Define a perícia extra, quais ações ganham bravata e o efeito do Finalizador Exemplar no 9º.',
    },
    {
      id: 'swashbuckler-confident-finisher',
      name: 'Finalizador Confiante',
      originalName: 'Confident Finisher',
      level: 1,
      actionType: 'one',
      description:
        'Exige panache. Faça um Golpe; na falha, causa metade do dano de Golpe Preciso (tipo da arma). Gasta panache; sem mais ações de ataque neste turno.',
    },
    {
      id: 'swashbuckler-fortitude-expertise',
      name: 'Expertise em Fortitude',
      originalName: 'Fortitude Expertise',
      level: 3,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'swashbuckler-opportune-riposte',
      name: 'Riposta Oportuna',
      originalName: 'Opportune Riposte',
      level: 3,
      actionType: 'reaction',
      trigger:
        'Um inimigo no seu alcance falha criticamente um Golpe contra você.',
      description:
        'Traço bravata. Golpeie corpo a corpo o gatilho ou tente Desarmar a arma usada no Golpe.',
    },
    {
      id: 'swashbuckler-stylish-tricks',
      name: 'Truques Estilosos',
      originalName: 'Stylish Tricks',
      level: 3,
      description:
        'No 3º, 7º e 15º: +1 aumento de perícia só em Acrobacia ou na perícia do estilo, e +1 feito de perícia dessas mesmas perícias.',
    },
    {
      id: 'swashbuckler-vivacious-speed',
      name: 'Velocidade Viva',
      originalName: 'Vivacious Speed',
      level: 3,
      description:
        'O bônus de deslocamento com panache sobe para +3 m, e +1,5 m no 7º, 11º, 15º e 19º. Sem panache: metade (arredondada para baixo em incrementos de 1,5 m).',
      effects: [
        {
          kind: 'speedBonus',
          value: 10,
          extraEveryLevels: 4,
          extraAmount: 5,
          halfRoundedDownTo5: true,
        },
      ],
    },
    {
      id: 'swashbuckler-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 5,
      description:
        'Armas simples, marciais e ataques desarmados sobem para especialista. Acesso à especialização crítica dessas armas.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'swashbuckler-confident-evasion',
      name: 'Evasão Confiante',
      originalName: 'Confident Evasion',
      level: 7,
      description:
        'Reflexos sobem para mestre. Sucesso em Reflexos vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'swashbuckler-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'swashbuckler-exemplary-finisher',
      name: 'Finalizador Exemplar',
      originalName: 'Exemplary Finisher',
      level: 9,
      description:
        'Se um Golpe de finalizador acerta, adiciona o efeito do seu estilo (Passo, quebrar imunidade a Desmoralizar, desprevenido, dano extra em agarrado/caído, −3 m de deslocamento, ou −2 nos ataques contra você).',
    },
    {
      id: 'swashbuckler-expertise',
      name: 'Expertise de Espadachim',
      originalName: 'Swashbuckler Expertise',
      level: 9,
      description:
        'O bônus de circunstância do Combate Estiloso sobe para +2. CD de classe sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'swashbuckler-continuous-flair',
      name: 'Flair Contínuo',
      originalName: 'Continuous Flair',
      level: 11,
      description:
        'O bônus de circunstância do Combate Estiloso também vale em exploração.',
    },
    {
      id: 'swashbuckler-perception-mastery',
      name: 'Maestria em Percepção',
      originalName: 'Perception Mastery',
      level: 11,
      description: 'Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'swashbuckler-assured-evasion',
      name: 'Evasão Assegurada',
      originalName: 'Assured Evasion',
      level: 13,
      description:
        'Reflexos sobem para lendário. Falha crítica em Reflexos vira falha. Falha em Reflexos contra efeito que causa dano: metade do dano.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'legendary' }],
    },
    {
      id: 'swashbuckler-light-armor-expertise',
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
      id: 'swashbuckler-weapon-mastery',
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
      id: 'swashbuckler-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'swashbuckler-keen-flair',
      name: 'Flair Aguçado',
      originalName: 'Keen Flair',
      level: 15,
      description:
        'Ao Golpear com arma ou ataque desarmado em que você é mestre: 19 no d20 que seria sucesso vira sucesso crítico.',
    },
    {
      id: 'swashbuckler-reinforced-ego',
      name: 'Ego Reforçado',
      originalName: 'Reinforced Ego',
      level: 17,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'swashbuckler-eternal-confidence',
      name: 'Confiança Eterna',
      originalName: 'Eternal Confidence',
      level: 19,
      description:
        'CD de classe sobe para mestre. Num Golpe de finalizador ou Riposta Oportuna, pode aplicar o efeito de falha do Finalizador Confiante (incluindo Finalizador Preciso, se tiver o feito), se a arma/ataque serviria para Finalizador Confiante.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'swashbuckler-light-armor-mastery',
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
  ],
}
