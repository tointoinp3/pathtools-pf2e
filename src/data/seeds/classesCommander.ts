import type { CharacterClass } from '@/types/class'
import { SOURCE_BATTLECRY_ID } from './sources'
import { CLASS_COMMANDER_ID } from './ids'

export { CLASS_COMMANDER_ID }

/** Comandante — Battlecry!, AoN Classes ID 66 */
export const commanderClass: CharacterClass = {
  id: CLASS_COMMANDER_ID,
  name: 'Comandante',
  originalName: 'Commander',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_BATTLECRY_ID,
  sourcePage: 21,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'trained',
    reflex: 'expert',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'commander-society', rank: 'trained', skillId: 'society' }],
    loreGrants: [
      {
        id: 'commander-warfare-lore',
        rank: 'trained',
        loreId: 'warfare-lore',
        loreName: 'Conhecimento de Guerra',
        expertAtLevel: 3,
        masterAtLevel: 7,
        legendaryAtLevel: 15,
      },
    ],
    additionalBase: 2,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'martial', rank: 'trained', label: 'Armas marciais' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'allArmor', rank: 'trained', label: 'Todas as armaduras' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=66',
  keyTerms: [
    {
      name: 'Tática',
      originalName: 'Tactic',
      description:
        'Manobra combinada: você sinaliza o esquadrão (voz = auditivo, ou acenar o estandarte = visual). Só responde quem foi treinado nas preparações (esquadrão = 2 + INT, e você conta como um sem ocupar vaga). Ninguém responde a mais de 1 tática por rodada, de qualquer fonte. Não pode Preparar tática. Ações extras de tática (livre/reação) podem sair fora do turno do aliado.',
    },
    {
      name: 'Estandarte',
      originalName: 'Banner',
      description:
        'Bandeira, leque, totem ou outro item visível (Volume desprezível ou leve). Empunhado, afixado em arma/escudo, ou no mochilão. Só 1 de cada vez (trocar: 1 min). Aura de 9 m: +1 de status em Vontade e CDs contra medo (você e aliados). Pausar/retomar ao guardar ou sacar. Se destruído ou roubado: aliados com o bônus ficam amedrontados 1. Traços: aura, emoção, mental, visual.',
    },
    {
      name: 'Brandir',
      originalName: 'Brandish',
      description:
        'A tática exige acenar o estandarte: precisa estar na mão ou numa arma empunhada. Enquanto brande, não usa ações livres nem reações concedidas pela própria tática, salvo se o texto disser o contrário.',
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
      title: 'O fólio, não uma especialização',
      originalName: 'Tactics',
      body: 'Não há racket nem doutrina no 1º. Você começa com um fólio de 5 táticas (só mobilidade ou ofensiva) — monte nesta aba. Nas preparações: escolhe 3 e treina o esquadrão (2 + INT aliados). 10 min de treino troca o conjunto e quem está no esquadrão. 7º: +2 táticas (pode ser especialista) e 4 preparadas. 15º: +2 (até mestre) e 5 preparadas. 19º: +2 (até lendária) e 6 preparadas. Feito Expansão Tática adiciona táticas ao fólio, sem aumentar o número preparado.',
    },
    {
      title: 'Sinal, esquadrão e reação extra',
      originalName: 'Drilled Reactions',
      body: 'O aliado precisa perceber o sinal. 1×/rodada, ao usar uma tática, você dá 1 reação extra a um aliado que esteja se beneficiando dela — só para aquela tática, some se não usar. Você também se beneficia das próprias táticas.',
    },
    {
      title: 'Catálogo de 1º (mobilidade e ofensiva)',
      originalName: 'Mobility and Offensive Tactics',
      body: 'Mobilidade: Retirada Defensiva (até 3 Passos para longe); Reúnam-se a Mim! (Caminhar até a aura); Treino de Montanhismo (escalada 6 m; Guerra no lugar de Atletismo para Escalar); Treino Naval (natação 6 m; Guerra para Nadar); Passagem de Linhas (trocar lugar com aliado adjacente); Tela Protetora (um Caminha até outro: o segundo não provoca ao conjurar/atirar). Ofensiva: Manobras Coordenadas (Passo + Reposicionar); Dupla Equipe (Empurrar/Reposicionar + Golpe de outro); Acabem! (Brandir, incapacitação: Passo e medo se vocês estão em vantagem); Ataque de Pinça (Passo; alvo adjacente fica desprevenido aos Golpes corpo a corpo do esquadrão); Recarreguem!; Escudos! (Erguer Escudo / aparar / truque escudo); Golpeiem Forte! (2 ações: 1 aliado Golpeia); Derrubada Tática (até 2 Caminham metade; se os dois ficam adjacentes, Reflexos ou cai). Fonte: Battlecry! pág. 25–26. Táticas de AP (Hell’s Destiny etc.) ficam de fora do catálogo base.',
    },
    {
      title: 'Especialista, mestre e lendário',
      originalName: 'Expert, Master, and Legendary Tactics',
      body: 'Especialista (7º): Passe Aéreo (passar consumível); Blitz dos Cintos (desajeitado); Investida Desmoralizante; Escorrega e Queima (Derrubar + magia); Assalto Estupefaciente; Tomem o Terreno Alto (salto impulsionado). Mestre (15º): Muro Espelhado (cegar com escudos); Assalto Piranha (ignorar resistência); Estoura, Derruba e Trava; Apontar, Mirar, Fogo!; Investida Estrondosa; Quanto Maior, Melhor (manobra com ajuda de tamanho). Lendário (19º): Guilhotina Sangrenta (1/dia, morte); Gritem Caos!; Rajada do Carrasco (1/dia); Insta-Balista; Revitalização Sanguínea (1/dia); Investida da Valquíria (cura 80 + carga).',
    },
    {
      title: 'Estandarte na mesa',
      originalName: "Commander's Banner",
      body: 'A aura de 9 m é o “alcance” da maioria das táticas. Feitos como Companheiro do Comandante ou Plantar Estandarte deixam a aura sair do espaço do estandarte, não do seu. Item padrão: Dureza/PV de pano, couro fino ou madeira fina — ou do objeto em que está afixado, o que for maior.',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial de Inteligência, 8 PV, todas as armaduras, feito de classe já no 1º. Você não é o que mais acerta: é quem faz o grupo acertar junto. Conhecimento de Guerra serve para iniciativa (se estiver vendo ao menos 1 oponente) e para Recordar Conhecimento limitado (dá para negociar? ataque marcante? salvaguarda fraca?). Sem magia.',
    },
  ],
  lore: {
    summary:
      'Força bruta e números importam. Tática importa tanto quanto. Academia clássica, exército ou companhia mercenária: você sinaliza o campo e faz o esquadrão passar do limite.',
    duringCombat:
      'Procura um ponto alto para ver o campo, grita ordens ou acena o estandarte com as táticas que treinou de manhã.',
    duringSocial:
      'Intelecto e guerra: enxerga jogada política hostil e tira o que o rival queria esconder.',
    whileExploring:
      'Percepção de quem já viu emboscada. Monta tática para o terreno da vez.',
    inDowntime:
      'Soldados e aristocratas: contatos, contrato, próximo trabalho. Xadrez, draj, go, conquista imperial — para não enferrujar na paz.',
    youMight: [
      'Assumir a conversa sem pedir, confiando que a cabeça vira a mesa.',
      'Estudar os aliados para tirar o melhor de cada um.',
      'Cobrar de si um padrão que ninguém mais percebe ter falhado.',
    ],
    othersProbably: [
      'Respeitam sua leitura ampla da situação.',
      'Às vezes acham você mandão demais.',
      'Subestimam a astúcia — sobretudo acadêmicos que não viram o estudo que a tática exige.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Estandarte do comandante',
        'Táticas',
        'Reações treinadas',
        'Bloqueio com escudo',
        'Feito de comandante',
      ],
    },
    { level: 2, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Feito geral', 'Aumento de perícia', 'Expertise em guerra'],
    },
    { level: 4, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Expertise militar',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Tático especialista',
        'Feito geral',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 8, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 9,
      features: ['Feito de ancestralidade', 'Expertise em Fortitude', 'Aumento de perícia'],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de comandante', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Expertise em armadura',
        'Vontade de comando',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Maestria em Percepção',
        'Maestria com armas',
      ],
    },
    { level: 14, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Intuição de campo',
        'Feito geral',
        'Especialização maior em arma',
        'Tático mestre',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 17,
      features: ['Feito de ancestralidade', 'Maestria em armadura', 'Aumento de perícia'],
    },
    { level: 18, features: ['Feito de comandante', 'Feito de perícia'] },
    {
      level: 19,
      features: ['Feito geral', 'Tático lendário', 'Aumento de perícia'],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de comandante', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'commander-banner',
      name: 'Estandarte do Comandante',
      originalName: "Commander's Banner",
      level: 1,
      description:
        'Item visível (Volume desprezível ou leve): bandeira, leque, totem. Empunhado, afixado em arma/escudo ou no mochilão. Só 1 (trocar: 1 min). Enquanto visível e com você: aura 9 m, +1 de status em Vontade e CDs contra medo (você e aliados). Pausar/retomar ao guardar ou sacar. Destruído/roubado: aliados com o bônus ficam amedrontados 1. Aura, emoção, mental, visual.',
    },
    {
      id: 'commander-tactics',
      name: 'Táticas',
      originalName: 'Tactics',
      level: 1,
      description:
        'Fólio com 5 táticas de mobilidade ou ofensiva (Battlecry! pág. 25). Preparações: 3 táticas + esquadrão de 2 + INT aliados (você conta sem ocupar vaga). 10 min de treino troca táticas e esquadrão. Sinal: voz (auditivo) ou estandarte (visual). Máx. 1 tática respondida por criatura por rodada. Não Preparar tática.',
    },
    {
      id: 'commander-drilled-reactions',
      name: 'Reações Treinadas',
      originalName: 'Drilled Reactions',
      level: 1,
      frequency: '1 vez por rodada',
      description:
        'Ao usar uma tática, 1 aliado que se beneficie dela ganha 1 reação extra, só para aquela tática. Some se não usar.',
    },
    {
      id: 'commander-shield-block',
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
      id: 'commander-warfare-expertise',
      name: 'Expertise em Guerra',
      originalName: 'Warfare Expertise',
      level: 3,
      description:
        'Conhecimento de Guerra sobe para especialista. Recordar Conhecimento sobre a maioria das criaturas (qualquer tipo), em geral só: dá para negociar? ataque ofensivo mais notável? salvaguarda especialmente fraca? Se estiver observando ao menos 1 oponente na iniciativa, pode usar Conhecimento de Guerra no teste.',
    },
    {
      id: 'commander-military-expertise',
      name: 'Expertise Militar',
      originalName: 'Military Expertise',
      level: 5,
      description:
        'Armas simples, marciais e ataques desarmados sobem para especialista. Sucesso crítico com arma em que você é ao menos especialista: especialização crítica da arma.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'commander-expert-tactician',
      name: 'Tático Especialista',
      originalName: 'Expert Tactician',
      level: 7,
      description:
        'CD de classe sobe para especialista. +2 táticas ao fólio (mobilidade/ofensiva que ainda não tem, ou especialista). Preparadas: 4. Conhecimento de Guerra sobe para mestre.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'commander-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'commander-fortitude-expertise',
      name: 'Expertise em Fortitude',
      originalName: 'Fortitude Expertise',
      level: 9,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'commander-armor-expertise',
      name: 'Expertise em Armadura',
      originalName: 'Armor Expertise',
      level: 11,
      description:
        'Armadura leve, média, pesada e defesa sem armadura sobem para especialista. Ganha especialização de armadura média e pesada.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['allArmor', 'light', 'medium', 'heavy', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'commander-commanding-will',
      name: 'Vontade de Comando',
      originalName: 'Commanding Will',
      level: 11,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'commander-perception-mastery',
      name: 'Maestria em Percepção',
      originalName: 'Perception Mastery',
      level: 13,
      description: 'Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'commander-weapon-mastery',
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
      id: 'commander-battlefield-intuition',
      name: 'Intuição de Campo',
      originalName: 'Battlefield Intuition',
      level: 15,
      description:
        'Reflexos sobem para mestre. Sucesso em Reflexos vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'commander-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'commander-master-tactician',
      name: 'Tático Mestre',
      originalName: 'Master Tactician',
      level: 15,
      description:
        'CD de classe sobe para mestre. +2 táticas ao fólio (mobilidade/ofensiva, especialista ou mestre). Preparadas: 5. Conhecimento de Guerra sobe para lendário.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'commander-armor-mastery',
      name: 'Maestria em Armadura',
      originalName: 'Armor Mastery',
      level: 17,
      description:
        'Armadura leve, média, pesada e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['allArmor', 'light', 'medium', 'heavy', 'unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'commander-legendary-tactician',
      name: 'Tático Lendário',
      originalName: 'Legendary Tactician',
      level: 19,
      description:
        'CD de classe sobe para lendário. +2 táticas ao fólio (qualquer grau). Preparadas: 6.',
      effects: [{ kind: 'classDcRank', rank: 'legendary' }],
    },
  ],
}
