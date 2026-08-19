import type { CharacterClass } from '@/types/class'
import {
  SOURCE_BATTLECRY_ID,
  SOURCE_IMPOSSIBLE_MAGIC_ID,
  SOURCE_RAGE_OF_ELEMENTS_ID,
} from './sources'
import { summonerSpellcasting } from './summonerSpellcasting'
import { CLASS_SUMMONER_ID } from './ids'

export { CLASS_SUMMONER_ID }

const SUMMONER_CLASS_FEAT_LEVELS = [
  1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20,
]

/** Invocador — Impossible Magic (Remaster), AoN Classes ID 77 */
export const summonerClass: CharacterClass = {
  id: CLASS_SUMMONER_ID,
  name: 'Invocador',
  originalName: 'Summoner',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
  sourcePage: 63,
  hitPointsPerLevel: 10,
  keyAttributeOptions: ['charisma'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  classFeatLevels: SUMMONER_CLASS_FEAT_LEVELS,
  spellcasting: summonerSpellcasting,
  subclass: {
    id: 'summoner-eidolon',
    label: 'Eidolon',
    description:
      'A entidade que você ancora no mundo. Define tradição de magia, perícias, forma, habilidades (inicial / 7º / 17º) e o que aparece na aba Companheiros. Só eidolons Remaster (Impossible Magic, Rage of Elements, Battlecry!). Fonte: Impossible Magic, pág. 69.',
    required: true,
    options: [
      {
        id: 'eidolon-aberrant',
        name: 'Aberração',
        originalName: 'Aberrant',
        tradition: 'occult',
        description:
          'Pesadelo dos Deuses Exteriores. Ocultismo e atletismo; anatomia que contra-ataca.',
        rulesSummary:
          'Tradição oculta. Perícias: Atletismo e Ocultismo. Inicial: Anatomia Surpreendente (reação). 7º: Mente Insondável. 17º: Sussurros Enlouquecedores. Con +2, Int +1, Sab +1, Car −1.',
        skillGrants: [
          { id: 'eidolon-athletics', rank: 'trained', skillId: 'athletics' },
          { id: 'eidolon-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 70,
      },
      {
        id: 'eidolon-angel',
        name: 'Anjo',
        originalName: 'Angel',
        tradition: 'divine',
        description: 'Mensageiro celestial com um recado só seu.',
        rulesSummary:
          'Tradição divina. Perícias: Diplomacia e Religião. Inicial: Golpes Sagrados. 7º: Aura do Viajante. 17º: Misericórdia Angélica. Con +1, Int −1, Sab +1, Car +2.',
        skillGrants: [
          { id: 'eidolon-diplomacy', rank: 'trained', skillId: 'diplomacy' },
          { id: 'eidolon-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 71,
      },
      {
        id: 'eidolon-anger-phantom',
        name: 'Fantasma da Ira',
        originalName: 'Anger Phantom',
        tradition: 'occult',
        description: 'Alma presa por raiva. Vocês controlam ou canalizam a fúria.',
        rulesSummary:
          'Tradição oculta. Perícias: Intimidação e Ocultismo. Inicial: Golpe Furioso (2 ações). 7º: Frenesi Fervente. 17º: Aura de Ira. Con +3, Int +0, Sab −1, Car +1.',
        skillGrants: [
          { id: 'eidolon-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'eidolon-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 71,
      },
      {
        id: 'eidolon-beast',
        name: 'Besta',
        originalName: 'Beast',
        tradition: 'primal',
        description: 'Vida da natureza em forma de besta mágica.',
        rulesSummary:
          'Tradição primeva. Perícias: Intimidação e Natureza. Inicial: Investida da Besta. 7º: Rugido Primevo. 17º: Malho Redemoinho. Con +3, Int −1, Sab +1, Car +0.',
        skillGrants: [
          { id: 'eidolon-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'eidolon-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 73,
      },
      {
        id: 'eidolon-construct',
        name: 'Construto',
        originalName: 'Construct',
        tradition: 'arcane',
        description: 'Pensamento astral com corpo — relógio, boneco, o que imaginarem.',
        rulesSummary:
          'Tradição arcana. Perícias: Arcana e Artesanato. Inicial: Coração Construto. 7º: Evolução Reconfigurada (feito extra). 17º: Reconfiguração Máxima. Con +3, Int +1, Sab +0, Car −1.',
        skillGrants: [
          { id: 'eidolon-arcana', rank: 'trained', skillId: 'arcana' },
          { id: 'eidolon-crafting', rank: 'trained', skillId: 'crafting' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 73,
      },
      {
        id: 'eidolon-demon',
        name: 'Demônio',
        originalName: 'Demon',
        tradition: 'divine',
        description: 'Pecado das Fendas Exteriores. Escolha o pecado associado.',
        rulesSummary:
          'Tradição divina. Perícias: Intimidação e Religião. Inicial: Golpes Demoníacos. 7º: Visões do Pecado. 17º: Decreto Blasfemo. Con +3, Int +0, Sab −1, Car +1.',
        skillGrants: [
          { id: 'eidolon-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'eidolon-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 74,
      },
      {
        id: 'eidolon-devotion-phantom',
        name: 'Fantasma da Devoção',
        originalName: 'Devotion Phantom',
        tradition: 'occult',
        description: 'Alma que não parte por dever ou uma tarefa inacabada.',
        rulesSummary:
          'Tradição oculta. Perícias: Medicina e Ocultismo. Inicial: Retaliação Deverosa. 7º: Devoção Firme. 17º: Aura de Devoção. Con +3, Int +0, Sab +0, Car +0.',
        skillGrants: [
          { id: 'eidolon-medicine', rank: 'trained', skillId: 'medicine' },
          { id: 'eidolon-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 75,
      },
      {
        id: 'eidolon-dragon',
        name: 'Dragão',
        originalName: 'Dragon',
        description:
          'Eco astral de uma mente dracônica. A tradição (e a perícia) é a sua escolha.',
        rulesSummary:
          'Tradição: escolha arcana, divina, oculta ou primal (perícia correspondente + Intimidação). Inicial: Sopro do Dragão. 7º: Frenesi Dracônico. 17º: Sopro Potencializado. Con +1, Int +1, Sab +0, Car +1.',
        skillGrants: [
          { id: 'eidolon-intimidation', rank: 'trained', skillId: 'intimidation' },
        ],
        skillChoiceOptions: ['arcana', 'religion', 'occultism', 'nature'],
        skillChoiceLabel: 'Perícia da tradição do dragão',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 75,
      },
      {
        id: 'eidolon-elemental',
        name: 'Elemental',
        originalName: 'Elemental',
        tradition: 'primal',
        description:
          'Matéria elemental com mente. Núcleo: ar, terra, fogo, metal, água ou madeira.',
        rulesSummary:
          'Tradição primeva. Perícias: Natureza e Sobrevivência. Arranjos: Adaptável (Des +4) ou Primordial (For +4). Inicial: Núcleo Elemental. 7º: Rajada. 17º: Redemoinho Elemental. Rage of Elements.',
        skillGrants: [
          { id: 'eidolon-nature', rank: 'trained', skillId: 'nature' },
          { id: 'eidolon-survival', rank: 'trained', skillId: 'survival' },
        ],
        sourceId: SOURCE_RAGE_OF_ELEMENTS_ID,
        sourcePage: 38,
      },
      {
        id: 'eidolon-fey',
        name: 'Feérico',
        originalName: 'Fey',
        tradition: 'primal',
        description: 'Capricho do Primeiro Mundo, recém-reencarnado ao seu lado.',
        rulesSummary:
          'Tradição primal (+ ilusão/mental arcanas no repertório). Perícias: Enganação e Natureza. Inicial: Dádivas Feéricas. 7º: Travessura. 17º: Ardil (Contingência). Con +0, Int +1, Sab −1, Car +3.',
        skillGrants: [
          { id: 'eidolon-deception', rank: 'trained', skillId: 'deception' },
          { id: 'eidolon-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 75,
      },
      {
        id: 'eidolon-ooze',
        name: 'Gosma',
        originalName: 'Ooze',
        tradition: 'arcane',
        description: 'Protoplasma preso pela sua mente. Gorgoleja. Sem visão.',
        rulesSummary:
          'Tradição arcana. Perícias: Arcana e Atletismo. Sentido de movimento 18 m, sem visão, Deslocamento 6 m. Inicial: Fisiologia de Gosma. 7º: Pseudópodes (alcance). 17º: Engolir Fluido. Con +3, Int −1, Sab +1, Car +0.',
        skillGrants: [
          { id: 'eidolon-arcana', rank: 'trained', skillId: 'arcana' },
          { id: 'eidolon-athletics', rank: 'trained', skillId: 'athletics' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 76,
      },
      {
        id: 'eidolon-plant',
        name: 'Planta',
        originalName: 'Plant',
        tradition: 'primal',
        description: 'Vegetação inteligente da mesma essência dos leshys.',
        rulesSummary:
          'Tradição primal. Perícias: Natureza e Sobrevivência. Inicial: Golpe de Cipó. 7º: Cipós Crescentes (alcance). 17º: Campo de Raízes. Con +3, Int −1, Sab +1, Car +0.',
        skillGrants: [
          { id: 'eidolon-nature', rank: 'trained', skillId: 'nature' },
          { id: 'eidolon-survival', rank: 'trained', skillId: 'survival' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 76,
      },
      {
        id: 'eidolon-psychopomp',
        name: 'Psicopompo',
        originalName: 'Psychopomp',
        tradition: 'divine',
        description: 'Guia de almas, quase sempre de máscara. Destino compartilhado.',
        rulesSummary:
          'Tradição divina. Perícias: Intimidação e Religião. Inicial: Toque do Pastor. 7º: Vigia Oculto. 17º: Ceifador de Espíritos. Con +3, Int +0, Sab +1, Car −1.',
        skillGrants: [
          { id: 'eidolon-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'eidolon-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 77,
      },
      {
        id: 'eidolon-swarm',
        name: 'Enxame',
        originalName: 'Swarm',
        tradition: 'primal',
        description:
          'Muitos bichos Minúsculos, uma mente. Condensado ou disperso. Battlecry!',
        rulesSummary:
          'Tradição primal. Perícias: Natureza e Sobrevivência. Arranjos: Audaz (For +4) ou Furtivo (Des +4). Inicial: Forma de Enxame. 7º: Mudança Súbita. 17º: Enxame Nauseante.',
        skillGrants: [
          { id: 'eidolon-nature', rank: 'trained', skillId: 'nature' },
          { id: 'eidolon-survival', rank: 'trained', skillId: 'survival' },
        ],
        sourceId: SOURCE_BATTLECRY_ID,
        sourcePage: 72,
      },
      {
        id: 'eidolon-undead',
        name: 'Morto-vivo',
        originalName: 'Undead',
        tradition: 'divine',
        description: 'Espírito do Vazio preso à sua vida. Cura de vazio.',
        rulesSummary:
          'Tradição divina. Perícias: Intimidação e Religião. Inicial: Essência do Vazio. 7º: Drenar Vida. 17º: Rejuvenescimento. Con +3, Int −1, Sab +1, Car +0.',
        skillGrants: [
          { id: 'eidolon-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'eidolon-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 77,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Eidolon',
      originalName: 'Eidolon',
      description:
        'A criatura ancorada em você. Não é lacaio nem conjurada. Vocês compartilham ações, PAM e um único poço de PV. Só usa itens com o traço eidolon (até 2 investidos). Fica a no máximo 30 m; se passar disso, você cair a 0 PV ou ele “morrer”, desmancha.',
    },
    {
      name: 'Evolução',
      originalName: 'Evolution',
      description:
        'Feitos que mudam o eidolon (asas, tamanho, ataques…). No 1º você pega um feito de evolução — se retreinar, o substituto também tem que ser evolução.',
    },
    {
      name: 'Em conjunto',
      originalName: 'Tandem',
      description:
        'Ações que vocês dois fazem juntos. Não usa se um não puder agir, se o eidolon não estiver manifestado, ou se estiver fundido (Fundir-se ao Eidolon). Não dá para encadear tandem dentro de tandem.',
    },
    {
      name: 'Agir Juntos',
      originalName: 'Act Together',
      description:
        '1 a 3 ações, 1×/rodada. Um gasta o mesmo número de ações; o outro gasta 1. Ex.: você conjura (2) e o eidolon Golpeia (1). Também vale para exploração (os dois Evitar Atenção).',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Dois corpos, um personagem',
      originalName: 'Eidolon',
      body: 'Você e o eidolon compartilham o turno, a PAM e os PV. Dano em qualquer um tira da sua barra; cura em qualquer um recupera. Manifestar (3 ações, ou 1 no 19º) traz o eidolon ao espaço adjacente — ou o manda embora. A aba Companheiros calcula CA, golpes e habilidades; os PV ficam na sua ficha.',
    },
    {
      title: 'Força ou Destreza',
      originalName: 'Key Attribute',
      body: 'No Impossible Magic o eidolon escolhe o atributo-chave: Força +4 e Des +2 (item +2 na CA, cap de Des +3) ou o inverso (item +1, cap +4). Con/Int/Sab/Car vêm do tipo. Elemental e Enxame ainda usam arranjos nomeados do livro deles. Aumentos de atributo no 5/10/15/20 também valem para o eidolon.',
    },
    {
      title: 'Dois golpes desarmados',
      originalName: 'Unarmed Attacks',
      body: 'Primário: 1d8 (desarmar, não letal, empurrar ou derrubar); ou 1d6 fatal d10; ou 1d6 vigoroso+varredura; ou 1d6 mortal d8 e finesse. Secundário: sempre 1d6 ágil e finesse. A forma (garra, asa, “espada” de essência…) é narrativa.',
    },
    {
      title: 'Magia limitada, não onda',
      originalName: 'Summoner Spellcasting',
      body: 'Espontâneo, tradição do eidolon, Carisma. 5 truques. Poucos espaços (1 no 1º, no máximo 2 por posto) — mas os baixos não somem quando sobe de nível. Isso é diferente do Magus. Magias emblemáticas no 3º. Especialista em magia no 9º, mestre no 17º.',
    },
    {
      title: 'Vínculo = foco',
      originalName: 'Link Spells',
      body: 'Começa com Surto de Evolução (1 PF). Refocus é conversa, brincadeira ou meditação a dois. Feitos acrescentam mais magias de vínculo (máx. 3 PF).',
    },
    {
      title: 'Evolução no 1º',
      originalName: 'Evolution Feat',
      body: 'Feito de classe já no 1º, e tem que ser evolução. Depois, feitos de invocador nos pares. Simbiose no 7º e Transcendência no 17º soltam a habilidade extra do tipo.',
    },
    {
      title: 'Papel no grupo',
      body: '10 PV, sem armadura, Carisma. O eidolon é o corpo a corpo; você segura magia e o vínculo. Itens: runas da sua armadura e das faixas de golpes poderosos (ou uma arma investida) passam para o eidolon.',
    },
  ],
  lore: {
    summary:
      'Você é o conduto mortal de uma entidade poderosa. Amigo, servo ou deus pessoal — o vínculo marca a sua vida e define a magia que flui entre vocês.',
    duringCombat:
      'Lutam como um. O eidolon resolve o mundano; as magias ficam para quando importam.',
    duringSocial:
      'Sua personalidade puxa a conversa. O eidolon pode falar ou só existir — e isso já lembra o quanto você é extraordinário.',
    whileExploring:
      'Alertas a magia estranha e ao perigo. Agir Juntos cobre mais chão e junta o que cada um sabe.',
    inDowntime:
      'Estuda a natureza do eidolon e a tradição dele: Aprender Magia, fabricar itens, fazer aliados.',
    youMight: [
      'Deixar o eidolon no físico e cuidar do mental.',
      'Pegar trejeitos do eidolon — e moldar o comportamento dele no caminho inverso.',
      'Tratar o eidolon como amigo, guia, protetor ou rival preso a você.',
    ],
    othersProbably: [
      'Se sentem seguros com vocês dois por perto.',
      'Acham que, se você conhece o eidolon, conhece outros monstros estranhos.',
      'Olham com awe ou medo da criatura que te acompanha.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Eidolon',
        'Conjuração de invocador',
        'Repertório de magias',
        'Magias de vínculo',
        'Feito de evolução',
      ],
    },
    { level: 2, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º posto',
        'Feito geral',
        'Vigilância compartilhada',
        'Magias emblemáticas',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Expertise desarmada do eidolon',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Simbiose do eidolon',
        'Especialização em arma do eidolon',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Conjurador especialista',
        'Reflexos compartilhados',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de invocador', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Expertise defensiva do eidolon',
        'Feito geral',
        'Expertise em arma simples',
        'Aumento de perícia',
        'Juggernauts gêmeos',
      ],
    },
    { level: 12, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Túnicas defensivas',
        'Maestria desarmada do eidolon',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Magias de 8º posto',
        'Aumentos de atributo',
        'Feito geral',
        'Especialização maior do eidolon',
        'Resolução compartilhada',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Transcendência do eidolon',
        'Conjurador mestre',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de invocador', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Maestria defensiva do eidolon',
        'Feito geral',
        'Manifestação instantânea',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de invocador', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'summoner-eidolon',
      name: 'Eidolon',
      originalName: 'Eidolon',
      level: 1,
      description:
        'Manifestar Eidolon (3 ações; traço da tradição): aparece adjacente e pode gastar 1 ação, ou desmancha. Fica a 30 m. Vocês compartilham ações, PAM e PV. Agir Juntos 1×/rodada. Compartilhar Sentidos (1 ação). Sigilo brilha enquanto estiver manifestado.',
    },
    {
      id: 'summoner-spellcasting',
      name: 'Conjuração de Invocador',
      originalName: 'Summoner Spellcasting',
      level: 1,
      description:
        'Espontâneo da tradição do eidolon. Ataque e CD usam Carisma. Poucos espaços (máx. 2 por posto); os baixos permanecem.',
    },
    {
      id: 'summoner-spell-repertoire',
      name: 'Repertório de Magias',
      originalName: 'Spell Repertoire',
      level: 1,
      description:
        'No 1º: 1 magia de 1º + 5 truques da tradição do eidolon. Cada espaço novo adiciona magia daquele posto.',
    },
    {
      id: 'summoner-link-spells',
      name: 'Magias de Vínculo',
      originalName: 'Link Spells',
      level: 1,
      description:
        'Foco. Começa com Surto de Evolução e 1 PF. Refocus conectando-se ao eidolon. Máx. = nº de magias de foco (até 3).',
    },
    {
      id: 'summoner-evolution-feat',
      name: 'Feito de Evolução',
      originalName: 'Evolution Feat',
      level: 1,
      description:
        'Um feito de invocador com o traço evolução. Se retreinar, o novo também precisa ser evolução.',
    },
    {
      id: 'summoner-shared-vigilance',
      name: 'Vigilância Compartilhada',
      originalName: 'Shared Vigilance',
      level: 3,
      description: 'Sua Percepção e a do eidolon sobem para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'summoner-signature-spells',
      name: 'Magias Emblemáticas',
      originalName: 'Signature Spells',
      level: 3,
      description:
        '1 emblemática por posto. Eleva livremente sem aprender versões altas.',
    },
    {
      id: 'summoner-eidolon-unarmed-expertise',
      name: 'Expertise Desarmada do Eidolon',
      originalName: 'Eidolon Unarmed Expertise',
      level: 5,
      description: 'Ataques desarmados do eidolon sobem para especialista.',
    },
    {
      id: 'summoner-eidolon-symbiosis',
      name: 'Simbiose do Eidolon',
      originalName: 'Eidolon Symbiosis',
      level: 7,
      description: 'O eidolon ganha a habilidade de simbiose do tipo.',
    },
    {
      id: 'summoner-eidolon-weapon-spec',
      name: 'Especialização em Arma do Eidolon',
      originalName: 'Eidolon Weapon Specialization',
      level: 7,
      description:
        'Desarmados: +2 de dano se especialista, +3 mestre, +4 lendário.',
    },
    {
      id: 'summoner-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 9,
      description: 'Ataque de magia e CD sobem para especialista.',
    },
    {
      id: 'summoner-shared-reflexes',
      name: 'Reflexos Compartilhados',
      originalName: 'Shared Reflexes',
      level: 9,
      description: 'Seus Reflexos e os do eidolon sobem para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'summoner-eidolon-defensive-expertise',
      name: 'Expertise Defensiva do Eidolon',
      originalName: 'Eidolon Defensive Expertise',
      level: 11,
      description: 'Defesa sem armadura do eidolon sobe para especialista.',
    },
    {
      id: 'summoner-simple-weapon-expertise',
      name: 'Expertise em Arma Simples',
      originalName: 'Simple Weapon Expertise',
      level: 11,
      description: 'Armas simples e desarmados (seus) sobem para especialista.',
      effects: [
        { kind: 'attackRank', categories: ['simple', 'unarmed'], rank: 'expert' },
      ],
    },
    {
      id: 'summoner-twin-juggernauts',
      name: 'Juggernauts Gêmeos',
      originalName: 'Twin Juggernauts',
      level: 11,
      description:
        'Fortitude sua e do eidolon sobe para mestre. Sucesso vira crítico (para os dois).',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'summoner-defensive-robes',
      name: 'Túnicas Defensivas',
      originalName: 'Defensive Robes',
      level: 13,
      description: 'Sua defesa sem armadura sobe para especialista.',
      effects: [
        { kind: 'defenseRank', categories: ['unarmored'], rank: 'expert' },
      ],
    },
    {
      id: 'summoner-eidolon-unarmed-mastery',
      name: 'Maestria Desarmada do Eidolon',
      originalName: 'Eidolon Unarmed Mastery',
      level: 13,
      description: 'Desarmados do eidolon sobem para mestre.',
    },
    {
      id: 'summoner-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        'Você: +2 de dano com armas/desarmados de especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'summoner-greater-eidolon-spec',
      name: 'Especialização Maior do Eidolon',
      originalName: 'Greater Eidolon Specialization',
      level: 15,
      description:
        'Dano extra do eidolon: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'summoner-shared-resolve',
      name: 'Resolução Compartilhada',
      originalName: 'Shared Resolve',
      level: 15,
      description:
        'Vontade sua e do eidolon sobe para mestre. Sucesso vira crítico (para os dois).',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'summoner-eidolon-transcendence',
      name: 'Transcendência do Eidolon',
      originalName: 'Eidolon Transcendence',
      level: 17,
      description:
        'Habilidade de transcendência do tipo. Além disso, +1 em um modificador de atributo do eidolon.',
    },
    {
      id: 'summoner-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 17,
      description: 'Ataque de magia e CD sobem para mestre.',
    },
    {
      id: 'summoner-eidolon-defensive-mastery',
      name: 'Maestria Defensiva do Eidolon',
      originalName: 'Eidolon Defensive Mastery',
      level: 19,
      description: 'Defesa sem armadura do eidolon sobe para mestre.',
    },
    {
      id: 'summoner-instant-manifestation',
      name: 'Manifestação Instantânea',
      originalName: 'Instant Manifestation',
      level: 19,
      description: 'Manifestar Eidolon passa a ser 1 ação.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=77',
}
