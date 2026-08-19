import type { CharacterClass } from '@/types/class'
import { SOURCE_IMPOSSIBLE_MAGIC_ID } from './sources'
import { necromancerSpellcasting } from './necromancerSpellcasting'
import { CLASS_NECROMANCER_ID } from './ids'

export { CLASS_NECROMANCER_ID }

const NECROMANCER_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Necromante — Impossible Magic, AoN Classes ID 75 */
export const necromancerClass: CharacterClass = {
  id: CLASS_NECROMANCER_ID,
  name: 'Necromante',
  originalName: 'Necromancer',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
  sourcePage: 27,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'trained',
  },
  skills: {
    fixed: [{ id: 'necromancer-occultism', rank: 'trained', skillId: 'occultism' }],
    loreGrants: [
      {
        id: 'necromancer-undead-lore',
        rank: 'trained',
        loreId: 'undead-lore',
        loreName: 'Conhecimento de Mortos-Vivos',
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
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'light', rank: 'trained', label: 'Armadura leve' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  classFeatLevels: NECROMANCER_CLASS_FEAT_LEVELS,
  spellcasting: necromancerSpellcasting,
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=75',
  subclass: {
    id: 'necromancer-fatal-method',
    label: 'Método fatal',
    description:
      'Como você estuda a morte no combate. 1º nível. Fonte: Impossible Magic, pág. 29.',
    required: true,
    options: [
      {
        id: 'method-puppeteer',
        name: 'Titereiro',
        originalName: 'Puppeteer',
        description:
          'Estuda vida e morte de longe: mais servos para alimentar magias.',
        rulesSummary:
          'Consumir Servo (livre, 1×/dia): 0 PF e um servo a até 9 m — destrói o servo e recupera 1 PF só para magia de túmulo. Proliferação: 1×/rodada, ao conjurar Criar Servo, cria +1 servo no alcance.',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 29,
      },
      {
        id: 'method-reaper',
        name: 'Ceifador',
        originalName: 'Reaper',
        description:
          'Estuda a carne de perto: lâmina contra osso.',
        rulesSummary:
          'Gume: treinado em armas marciais e armadura média (especialista em marciais no 11º, média no 13º). Trabalho em equipe: 1×/rodada, depois de Criar Servo, Golpe corpo a corpo livre contra criatura no seu alcance adjacente a pelo menos 1 servo.',
        attackGrants: [
          { category: 'martial', rank: 'trained', label: 'Armas marciais' },
        ],
        defenseGrants: [
          { category: 'medium', rank: 'trained', label: 'Armadura média' },
        ],
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 29,
      },
    ],
  },
  secondarySubclass: {
    id: 'necromancer-grim-fascination',
    label: 'Fascínio macabro',
    description:
      'O recorte da necromancia que você domina. Não impede o resto. Concede magia de túmulo + aprimoramento de servo. Fonte: Impossible Magic, pág. 30.',
    required: true,
    options: [
      {
        id: 'fascination-blood',
        name: 'Sangue',
        originalName: 'Blood',
        description:
          'Sanguimante: o próprio sangue e o que corre no inimigo. Servos como spawn vampírico ou construto de sangue endurecido.',
        rulesSummary:
          'Magia de túmulo: Infusão de Sangue. Aprimoramento: ao destruir um servo, recupera 1 PV (+1 no 5º e a cada 4 níveis).',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 30,
      },
      {
        id: 'fascination-bone',
        name: 'Osso',
        originalName: 'Bone',
        description:
          'Osteomante: esculpe esqueletos ou expande lascas de osso.',
        rulesSummary:
          'Magia de túmulo: Lança de Osso. Aprimoramento: Deslocamento de cada servo +1,5 m.',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 30,
      },
      {
        id: 'fascination-flesh',
        name: 'Carne',
        originalName: 'Flesh',
        description:
          'Caromante: destrói, produz e molda carne e músculo. Servos como zumbis.',
        rulesSummary:
          'Magia de túmulo: Barreira Muscular. Aprimoramento: ao destruir um servo, pode deixar terreno difícil naquele espaço por 10 min.',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 30,
      },
      {
        id: 'fascination-spirit',
        name: 'Espírito',
        originalName: 'Spirit',
        description:
          'Vitamante: segredos da alma e energias do vivo e do morto. Servos como fantasmas.',
        rulesSummary:
          'Magia de túmulo: Canção da Alma. Aprimoramento: no Golpe do servo, pode trocar o dano físico por espírito ou vazio.',
        sourceId: SOURCE_IMPOSSIBLE_MAGIC_ID,
        sourcePage: 30,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Servo',
      originalName: 'Thrall',
      description:
        'Morto-vivo sem mente, nível −1. Não é lacaio nem conjurado. 1 PV; imune a sangramento, morte, doença, mental e veneno. Falha em todos os testes; testes contra ele passam. Só age se magia de túmulo ou habilidade mandar. Dura 1 min se nada disser o contrário. Pequeno ou Médio, espaço livre. Flanqueia como se fizesse Golpe desarmado corpo a corpo. Não segura o chão: criatura entra no espaço (terreno difícil) e empurra o servo para o lado. Deslocamento 4,5 m. Comandar um Servo: Rastejar, Cair, Escapar, Interagir simples, Levantar, Distanciar ou Golpe (ataque de magia; 1d6 concussão/perfurante/cortante, +1d6 no 5º e a cada 4 níveis). O Golpe e o Escapar usam e contam na penalidade de ataque múltiplo.',
    },
    {
      name: 'Magia de túmulo',
      originalName: 'Grave Spell',
      description:
        'Foco do necromante. 1 PF. Refocus: falar com os mortos, meditar no sobrenatural local ou contemplar anatomia. Se tiver um servo ao começar o Refocus, pode destruí-lo para recuperar 2 PF. Altura = metade do nível. Máx. 3 PF. Começa com Bomba Necrótica + a do fascínio (2 PF). Truques de túmulo não gastam PF.',
    },
    {
      name: 'Forma de magia',
      originalName: 'Spellshape',
      description:
        'Ajusta a próxima magia. Use a ação de forma imediatamente antes de Conjurar. Qualquer outra ação (incluindo livres e reações) ou o fim do turno desperdiça o benefício. Efeitos extras fazem parte da magia, não da forma.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Servos no tabuleiro',
      originalName: 'Thralls',
      body: 'Peças baratas: criam flanco, terreno difícil e combustível. Não são companheiros da aba — somem em 1 minuto. Comandar um Servo (1 ação) faz um deles agir. Titereiro faz mais servos e os gasta em PF; ceifador golpea ao lado deles.',
    },
    {
      title: 'Dois recortes no 1º',
      originalName: 'Fatal Method & Grim Fascination',
      body: 'Método fatal: titereiro (longe, proliferação) ou ceifador (marciais + média, Golpe livre). Fascínio: sangue, osso, carne ou espírito — magia de túmulo e o que acontece quando o servo cai ou golpeia. Independentes, como escola e tese do mago.',
    },
    {
      title: 'Réquiem, não grimório de papel',
      originalName: 'Dirge',
      body: 'As magias moram num lamento interno. A aba trata como grimório: aprenda no réquiem, prepare no dia. Oculta, Inteligência. Poucos espaços (máx. 2/posto). harm entra de graça como oculta. Maestria de Vida e Morte: dano de vazio/vitalidade você escolhe por alvo; efeitos “só vivos” ou “só mortos-vivos” pegam os dois — não vale para cura.',
    },
    {
      title: 'Foco de túmulo',
      originalName: 'Grave Spells',
      body: 'Aba Foco: Bomba Necrótica + a do fascínio. Reserva 2. Truques Criar Servo e Investida de Servo à vontade. Feitos de necromante acrescentam mais magias de túmulo (máx. 3 PF).',
    },
    {
      title: 'Papel no grupo',
      body: 'Conjurador oculto de Inteligência, 8 PV, armadura leve (média se ceifador), feito de classe a partir do 2º. Cria e gasta mortos, drena vida, controla o campo. Conhecimento de Mortos-Vivos sobe sozinho (especialista 3º, mestre 7º, lendário 15º).',
    },
  ],
  lore: {
    summary:
      'Morte é tão comum quanto vida — ou mais. Mesmo assim, decadência é tabu. Quem mergulha nisso é necromante: ocultista na fronteira, vitalidade e vazio à vontade. Mortos-vivos servem e recuam.',
    duringCombat:
      'Cria e destrói servos para amplificar o oculto. Drena a vida do inimigo para curar o aliado.',
    duringSocial:
      'Saber esotérico e macabro: perspicaz ou assustador. Quando o charme falha, a magia oculta dobra vivo e morto.',
    whileExploring:
      'Assombrações: você as acha e as trata melhor que a maioria. Servos disparam armadilha ou viram isca.',
    inDowntime:
      'Poções, itens, pergaminhos; saber trancado do fascínio. Talvez o cemitério da vila, para o morto descansar de verdade.',
    youMight: [
      'Estudar com febre a anatomia de cada criatura no caminho.',
      'Prestar respeito aos mortos — e à morte que você causa — como fim inevitável.',
      'Buscar furar a ordem natural: imortalidade ou trazer alguém de volta.',
    ],
    othersProbably: [
      'Acham que você goza da crueldade e da podridão.',
      'Procuram você para mandar ou receber recado de quem já partiu.',
      'Evitam você: existência que lembra que todo mundo vai morrer.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Conjuração de necromante',
        'Magias de túmulo',
        'Método fatal',
        'Fascínio macabro',
        'Maestria de vida e morte',
        'Conhecimento de mortos-vivos',
      ],
    },
    { level: 2, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º',
        'Feito geral',
        'Retorno Inevitável',
        'Proteções mentais',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Expertise em Reflexos',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º',
        'Necromancia especialista',
        'Feito geral',
        'Expertise em Percepção',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 9,
      features: ['Magias de 5º', 'Feito de ancestralidade', 'Aumento de perícia'],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de necromante', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º',
        'Feito geral',
        'Aumento de perícia',
        'Fortitude antinatural',
        'Expertise com armas',
      ],
    },
    { level: 12, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º',
        'Feito de ancestralidade',
        'Expertise em armadura leve',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Magias de 8º',
        'Aumentos de atributo',
        'Feito geral',
        'Necromancia mestra',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Magias de 9º',
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Resiliência imorredoura',
      ],
    },
    { level: 18, features: ['Feito de necromante', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Epitáfio',
        'Feito geral',
        'Necromancia lendária',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de necromante', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'necromancer-spellcasting',
      name: 'Conjuração de Necromante',
      originalName: 'Necromancer Spellcasting',
      level: 1,
      description:
        'Oculta, Inteligência. Réquiem interno: 8 truques + harm + 4 magias de 1º; +2 por nível. Prepare 5 truques e os espaços do dia (máx. 2/posto).',
    },
    {
      id: 'necromancer-grave-spells',
      name: 'Magias de Túmulo',
      originalName: 'Grave Spells',
      level: 1,
      description:
        'Foco. Bomba Necrótica + magia do fascínio (2 PF). Truques Criar Servo e Investida de Servo à vontade. Refocus: 1 PF, ou 2 se destruir um servo no início.',
    },
    {
      id: 'necromancer-command-thrall',
      name: 'Comandar um Servo',
      originalName: 'Command a Thrall',
      level: 1,
      actionType: 'one',
      description:
        'Um servo: Rastejar, Cair, Escapar, Interagir simples, Levantar, Distanciar ou Golpe. Golpe: ataque de magia, 1d6 concussão/perfurante/cortante (+1d6 no 5º e a cada 4 níveis). Golpe e Escapar usam e contam na penalidade de ataque múltiplo.',
    },
    {
      id: 'necromancer-mastery-life-death',
      name: 'Maestria de Vida e Morte',
      originalName: 'Mastery of Life and Death',
      level: 1,
      description:
        'Ao causar dano de vazio ou vitalidade, escolhe o tipo por alvo. Efeito que só pega vivos ou só mortos-vivos pega os dois. Não se aplica a cura (harm em vitalidade não cura aliados vivos).',
    },
    {
      id: 'necromancer-undead-lore',
      name: 'Conhecimento de Mortos-Vivos',
      originalName: 'Undead Lore',
      level: 1,
      description:
        'Treinado em Conhecimento de Mortos-Vivos (mortos-vivos, assombrações e efeitos de necromante). Especialista 3º, mestre 7º, lendário 15º. Não serve para outros tópicos.',
    },
    {
      id: 'necromancer-inevitable-return',
      name: 'Retorno Inevitável',
      originalName: 'Inevitable Return',
      level: 3,
      actionType: 'reaction',
      trigger: 'Um inimigo Pequeno ou Médio a até 9 m morre.',
      description:
        'Cria um servo no espaço do cadáver, do mesmo tamanho da criatura.',
    },
    {
      id: 'necromancer-mental-wards',
      name: 'Proteções Mentais',
      originalName: 'Mental Wards',
      level: 3,
      description:
        'Vontade sobe para especialista. Sucesso em Vontade contra efeito mental ou de possessão de morto-vivo ou assombração vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'expert' }],
    },
    {
      id: 'necromancer-reflex-expertise',
      name: 'Expertise em Reflexos',
      originalName: 'Reflex Expertise',
      level: 5,
      description: 'Reflexos sobem para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'necromancer-expert-necromancy',
      name: 'Necromancia Especialista',
      originalName: 'Expert Necromancy',
      level: 7,
      description: 'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'necromancer-perception-expertise',
      name: 'Expertise em Percepção',
      originalName: 'Perception Expertise',
      level: 7,
      description: 'Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'necromancer-unnatural-fortitude',
      name: 'Fortitude Antinatural',
      originalName: 'Unnatural Fortitude',
      level: 11,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'necromancer-weapon-expertise',
      name: 'Expertise com Armas',
      originalName: 'Weapon Expertise',
      level: 11,
      description:
        'Armas simples e ataques desarmados sobem para especialista. Ceifador: marciais também.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'necromancer-light-armor-expertise',
      name: 'Expertise em Armadura Leve',
      originalName: 'Light Armor Expertise',
      level: 13,
      description:
        'Armadura leve e defesa sem armadura sobem para especialista. Ceifador: média também.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'necromancer-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'necromancer-master-necromancy',
      name: 'Necromancia Mestra',
      originalName: 'Master Necromancy',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'necromancer-undying-resilience',
      name: 'Resiliência Imorredoura',
      originalName: 'Undying Resilience',
      level: 17,
      description:
        'Fortitude sobe para lendário. Falha crítica vira falha. Falha contra efeito que causa dano: metade do dano.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'legendary' }],
    },
    {
      id: 'necromancer-epitaph',
      name: 'Epitáfio',
      originalName: 'Epitaph',
      level: 19,
      description:
        '1 espaço de 10º para preparar com conjuração de necromante. Não ganha mais espaços de 10º ao subir de nível. Não usa com habilidades que dão espaços extras ou conjuram sem gastar espaço. O feito Último Mortem dá um segundo espaço.',
    },
    {
      id: 'necromancer-legendary-necromancy',
      name: 'Necromancia Lendária',
      originalName: 'Legendary Necromancy',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
  ],
}
