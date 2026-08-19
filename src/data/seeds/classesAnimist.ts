import type { CharacterClass } from '@/types/class'
import { SOURCE_WAR_OF_IMMORTALS_ID } from './sources'
import { animistSpellcasting } from './animistSpellcasting'
import { CLASS_ANIMIST_ID } from './ids'

export { CLASS_ANIMIST_ID }

const ANIMIST_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Animista — War of Immortals, AoN Classes ID 64 */
export const animistClass: CharacterClass = {
  id: CLASS_ANIMIST_ID,
  name: 'Animista',
  originalName: 'Animist',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
  sourcePage: 10,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['wisdom'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'animist-religion', rank: 'trained', skillId: 'religion' }],
    choiceOptions: ['nature', 'occultism'],
    choiceCount: 1,
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
  classFeatLevels: ANIMIST_CLASS_FEAT_LEVELS,
  spellcasting: animistSpellcasting,
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=64',
  subclass: {
    id: 'animist-practice',
    label: 'Prática animista',
    description:
      'Como o poder cresce. 1º: primeira invocação. 9º: segunda. 17º: terceira. Fonte: War of Immortals, pág. 14. Aparições não são esta escolha — sintoniza nas preparações.',
    required: true,
    options: [
      {
        id: 'practice-liturgist',
        name: 'Liturgista',
        originalName: 'Liturgist',
        description:
          'Traz as aparições com canto e dança — rito próprio ou da religião.',
        rulesSummary:
          '1º Canto de Invocação: feito Círculo de Espíritos. 9º Dança: ao Saltar, Passar ou Atravessar Rolando, também Sustenta magia de aparição ou de vaso. 17º Louvor: na iniciativa, Círculo de Espíritos como livre; se a 1ª ação do 1º turno for o truque de aparição da primária, −1 ação (mín. 1).',
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 14,
      },
      {
        id: 'practice-medium',
        name: 'Médium',
        originalName: 'Medium',
        description:
          'Conduíte amplo: muitas aparições, vínculo menos exclusivo.',
        rulesSummary:
          '1º Unidade: feito Relinquir Controle. 9º Dupla: 2 primárias; avatar (19º) escolhe qual forma; PF = magias de foco conhecidas ou primárias, o que for maior (máx. 3). 17º Sincronia, enquanto Relinquiu: 1×/rodada Recordar Conhecimento livre; Golpes +2 espírito; resistência física = metade do nível e fraqueza a espírito = nível.',
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 15,
      },
      {
        id: 'practice-seer',
        name: 'Vidente',
        originalName: 'Seer',
        description:
          'Sensível a espíritos e mortos-vivos. Enxerga o que ficou para trás.',
        rulesSummary:
          '1º Visão: feito Sentido de Aparição; +1 de status em saves e CA vs assombrações, espíritos e incorpóreos. 9º Proteção: resistência a espírito e vazio = metade do nível; o bônus sobe para +2. 17º Resiliência: a visão vira sentido preciso; bônus +3.',
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 15,
      },
      {
        id: 'practice-shaman',
        name: 'Xamã',
        originalName: 'Shaman',
        description:
          'Vínculo tão estreito que a aparição ganha forma material. Use a aba Companheiros (familiar).',
        rulesSummary:
          '1º Encarnação: feito Familiar Espiritual; no 2º, Familiar Aprimorado. 9º Crescimento: Familiar Incrível. 17º Outro Mundo: o familiar gasta 1 ação de concentrar para ficar incorpóreo 1 min (imunidade a precisão, resistência física = metade do nível, fraqueza a força = metade; máx. 18 m e linha de efeito). Pode Dispensar.',
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 16,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Aparição',
      originalName: 'Apparition',
      description:
        'Entidade espiritual sem corpo o bastante para o mundo físico — memória de lugar, evento ou espírito. Só o animista sintonizado a afeta, salvo texto contrário. Traço aparição: ela age com você; precisa estar sintonizado. Dispersa: perde perícias, repertório, vaso e avatar até sintonizar de novo.',
    },
    {
      name: 'Errante',
      originalName: 'Wandering',
      description:
        'Feito ligado a um tipo de aparição. Nas preparações, pode retreinar qualquer feito Errante por outro do mesmo nível (ou menor). Precisa cumprir os outros pré-requisitos.',
    },
    {
      name: 'Magia de vaso',
      originalName: 'Vessel Spell',
      description:
        'Foco da aparição primária. Não conjura nem Sustenta a mesma magia de vaso duas vezes no mesmo turno. 1 PF. Refocus: tratar com espíritos, meditar no equilíbrio ou contar uma história. Altura automática como truque. Máx. 3 PF.',
    },
    {
      name: 'Postura',
      originalName: 'Stance',
      description:
        'Estratégia de combate. Entra com ação de postura; dura até nocaute, requisitos, fim do encontro ou nova postura. 1 rodada sem outra depois. Só em encontro. Pode Dispensar.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Dois mundos, dois grimórios',
      originalName: 'Animist & Apparition Spellcasting',
      body: 'Preparado: lista divina (2 truques + 1 espaço de 1º no começo). Espontâneo: repertório das aparições sintonizadas (2 truques + 1 espaço de 1º); todas as magias de aparição são signature. Não gasta espaço de um motor no outro. A aba Magias soma os dois para marcar. Cajado conta você como preparado.',
    },
    {
      title: 'Sintonizar nas preparações',
      originalName: 'Apparition Attunement',
      body: 'Cada dia: 2 aparições (3 no 7º, 4 no 15º) — escolha na lista desta aba. Uma é a primária (vaso + avatar no 19º). Ao Refocus, pode trocar qual das sintonizadas é a primária. Dispersar a primária: escolhe outra entre as que restam. Lores da aparição entram na ficha enquanto estiver sintonizado.',
    },
    {
      title: 'Catálogo de aparições (War of Immortals)',
      originalName: 'Apparitions',
      body: 'Artesão no Cofre (Oficina Itinerante); Guardião de Bosques e Jardins (Jardim da Cura); Eco de Momentos Perdidos (Guardar Tempo); Impostor em Lugares Ocultos (Sussurro Incômodo); Espreitador na Escuridão Devoradora (Forma da Escuridão Devoradora); Monarca das Cortes Feéricas (Graça da Ninfa); Folião na Alegria Perdida (Espelhos do Trapaceiro); Espreitador nos Galhos Escuros (Forma da Floresta Sombria); Mordomo de Pedra e Fogo (Bílis da Terra); Vanguarda das Águas Rugindo (Rio que Talha Montanhas); Testemunha de Batalhas Antigas (Encarnação da Batalha). Cada uma dá 2 Lores (treinadas; especialista 8º, mestre 16º), repertório até 9º e um vaso. Aparições de AP ficam de fora do catálogo base.',
    },
    {
      title: 'Prática, não aparição',
      originalName: 'Animistic Practice',
      body: 'A escolha de 1º é liturgista, médium, vidente ou xamã — como o poder cresce (invocações no 1º/9º/17º). Aparição você troca todo dia.',
    },
    {
      title: 'Papel no grupo',
      body: 'Conjurador divino de Sabedoria, 8 PV, armadura média, feito de classe a partir do 2º. Você é a ponte: cura, controle ou destruição conforme as aparições do dia. Magias de vaso na aba Foco.',
    },
  ],
  lore: {
    summary:
      'Voz entre o visível e o invisível. Sintoniza espíritos, manifesta a magia deles e deixa o saber fluir. Confiança sagrada ou campeão de dois mundos: você é a ponte.',
    duringCombat:
      'Canaliza aparições para magia forte e para virar o campo. Mistura divina própria com o que as sintonizadas emprestam.',
    duringSocial:
      'Observa e escuta. Sussurros de espíritos pesam no julgamento.',
    whileExploring:
      'Paciência e sentidos que as aliadas espirituais emprestam: ameaça antes da emboscada, tesouro que os outros passam.',
    inDowntime:
      'Lugares perto de entidades que dão força ou conforto: túmulos, mata antiga, rio. Aparições de saber: biblioteca ou templo.',
    youMight: [
      'Falar com entidades que só você percebe.',
      'Preferir história e anedota a explicação seca.',
      'Ver o mundo mais largo ou mais metafórico que o mortal ao lado.',
    ],
    othersProbably: [
      'Acham você distante — a cabeça está no que eles não veem.',
      'Valorizam a sabedoria de quem acumula mais que uma vida.',
      'Confundem equilíbrio entre matéria e espírito com frieza.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Sintonização de aparição',
        'Conjuração de animista e de aparição',
        'Prática animista',
      ],
    },
    { level: 2, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º',
        'Expertise em Fortitude',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º',
        'Conjurador especialista',
        'Feito geral',
        'Aumento de perícia',
        'Terceira aparição',
      ],
    },
    { level: 8, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Magias de 5º',
        'Feito de ancestralidade',
        'Expertise em Percepção',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de animista', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º',
        'Proteções especialistas',
        'Feito geral',
        'Expertise com armas simples',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º',
        'Feito de ancestralidade',
        'Mestre da mente e do espírito',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Magias de 8º',
        'Aumentos de atributo',
        'Quarta aparição',
        'Feito geral',
        'Conjurador mestre',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 17,
      features: ['Magias de 9º', 'Feito de ancestralidade', 'Aumento de perícia'],
    },
    { level: 18, features: ['Feito de animista', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Conjurador lendário',
        'Aumento de perícia',
        'Encarnação suprema',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de animista', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'animist-apparition-attunement',
      name: 'Sintonização de Aparição',
      originalName: 'Apparition Attunement',
      level: 1,
      description:
        'Nas preparações: 2 aparições, 1 primária (vaso + avatar no 19º). Refocus pode trocar qual é a primária entre as sintonizadas. Dispersa: perde Lores, repertório, vaso e avatar até sintonizar de novo.',
    },
    {
      id: 'animist-spellcasting',
      name: 'Conjuração de Animista e de Aparição',
      originalName: 'Animist & Apparition Spellcasting',
      level: 1,
      description:
        'Divina, Sabedoria. Preparado: lista divina. Espontâneo: repertório das aparições (signature). Espaços não se misturam. Truques à vontade, altura = metade do nível. Vaso = foco da primária (1 PF).',
    },
    {
      id: 'animist-practice',
      name: 'Prática Animista',
      originalName: 'Animistic Practice',
      level: 1,
      description:
        'Escolha liturgista, médium, vidente ou xamã. Invocações no 1º, 9º e 17º.',
    },
    {
      id: 'animist-fortitude-expertise',
      name: 'Expertise em Fortitude',
      originalName: 'Fortitude Expertise',
      level: 3,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'animist-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description:
        'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'animist-third-apparition',
      name: 'Terceira Aparição',
      originalName: 'Third Apparition',
      level: 7,
      description:
        'Nas preparações: 3 aparições (1 primária). Reserva de foco +1 (máx. 3).',
    },
    {
      id: 'animist-perception-expertise',
      name: 'Expertise em Percepção',
      originalName: 'Perception Expertise',
      level: 9,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'animist-expert-protections',
      name: 'Proteções Especialistas',
      originalName: 'Expert Protections',
      level: 11,
      description:
        'Armadura leve, média, defesa sem armadura e Reflexos sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'expert',
        },
        { kind: 'saveRank', save: 'reflex', rank: 'expert' },
      ],
    },
    {
      id: 'animist-simple-weapon-expertise',
      name: 'Expertise com Armas Simples',
      originalName: 'Simple Weapon Expertise',
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
      id: 'animist-master-of-mind-and-spirit',
      name: 'Mestre da Mente e do Espírito',
      originalName: 'Master of Mind and Spirit',
      level: 13,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'animist-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'animist-fourth-apparition',
      name: 'Quarta Aparição',
      originalName: 'Fourth Apparition',
      level: 15,
      description:
        'Nas preparações: 4 aparições (1 primária). Reserva de foco +1 (máx. 3).',
    },
    {
      id: 'animist-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'animist-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
    {
      id: 'animist-supreme-incarnation',
      name: 'Encarnação Suprema',
      originalName: 'Supreme Incarnation',
      level: 19,
      description:
        '1 espaço de 10º de aparição. Além de magias de aparição elevadas, pode conjurar Avatar: não vira deus — a primária encarna no seu corpo (stats do verbete dela).',
    },
  ],
}
