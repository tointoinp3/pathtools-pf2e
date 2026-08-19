import type { CharacterClass } from '@/types/class'
import { SOURCE_HOWL_OF_THE_WILD_ID, SOURCE_PLAYER_CORE_ID } from './sources'
import { bardSpellcasting } from './bardSpellcasting'
import { CLASS_BARD_ID } from './ids'

export { CLASS_BARD_ID }

const BARD_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Bardo Remaster — musa no 1º; feitos de classe a partir do 2 */
export const bardClass: CharacterClass = {
  id: CLASS_BARD_ID,
  name: 'Bardo',
  originalName: 'Bard',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 94,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['charisma'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [
      { id: 'bard-occultism', rank: 'trained', skillId: 'occultism' },
      { id: 'bard-performance', rank: 'trained', skillId: 'performance' },
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
  classFeatLevels: BARD_CLASS_FEAT_LEVELS,
  spellcasting: bardSpellcasting,
  subclass: {
    id: 'bard-muse',
    label: 'Musa',
    description:
      'Sua musa inspira arte e magia: concede 1 feito de bardo de 1º nível, 1 magia no repertório e destranca feitos posteriores. Fonte: Player Core, pág. 97.',
    required: true,
    options: [
      {
        id: 'muse-enigma',
        name: 'Enigma',
        originalName: 'Enigma',
        description:
          'Mistério que empurra você a desvendar segredos da vida e do multiverso — textos simbólicos, paradoxos, aeons, dragões ocultos.',
        rulesSummary:
          'Feito da musa: Sabedoria Bárdica (Lore versátil para Recordar Conhecimento). Magia da musa: Golpe Certeiro no repertório. Estilo: suporte com saber + inspiração + tradição oculta.',
        grantedFeat: {
          featId: 'feat-bard-bardic-lore',
          featName: 'Sabedoria Bárdica',
          originalName: 'Bardic Lore',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 98,
      },
      {
        id: 'muse-maestro',
        name: 'Maestro',
        originalName: 'Maestro',
        description:
          'A musa clássica do virtuoso: professor, rival, compositor lendário ou espírito que ama performance (anjo coral, Shelyn…).',
        rulesSummary:
          'Feito da musa: Composição Duradoura (composições que duram mais; +1 Ponto de Foco). Magia da musa: Acalmar. Estilo: fortalecimentos de composição mais eficientes.',
        grantedFeat: {
          featId: 'feat-bard-lingering-composition',
          featName: 'Composição Duradoura',
          originalName: 'Lingering Composition',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 98,
      },
      {
        id: 'muse-polymath',
        name: 'Polímata',
        originalName: 'Polymath',
        description:
          'Curioso inquieto que quer experimentar de tudo — fey eclético, Desna, Calistria, musas que mudam o tempo todo.',
        rulesSummary:
          'Feito da musa: Performance Versátil (usa Performance no lugar de perícias sociais e para requisitos de feitos). Magia da musa: Lacaio Fantasmal. Estilo: versatilidade de perícias e magia.',
        grantedFeat: {
          featId: 'feat-bard-versatile-performance',
          featName: 'Performance Versátil',
          originalName: 'Versatile Performance',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 98,
      },
      {
        id: 'muse-warrior',
        name: 'Guerreiro',
        originalName: 'Warrior',
        description:
          'O campo de batalha é o palco: aço, trombetas e canções de guerra. Soldado, general, Gorum ou espírito marcial.',
        rulesSummary:
          'Feito da musa: Performance Marcial. Magia da musa: Medo. Estilo: preparar aliados marciais (e às vezes entrar na briga com eles).',
        grantedFeat: {
          featId: 'feat-bard-martial-performance',
          featName: 'Performance Marcial',
          originalName: 'Martial Performance',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 98,
      },
      {
        id: 'muse-zoophonia',
        name: 'Zoofonia',
        originalName: 'Zoophonia',
        description:
          'Canto de pássaros, uivos e trombetas de elefante — conexão com a natureza e comunicação animal (Howl of the Wild).',
        rulesSummary:
          'Feito da musa: Comunicação Zoofônica. Magia da musa: Invocar Animal. Estilo: natureza + performances animais.',
        grantedFeat: {
          featId: 'feat-bard-zoophonic-communication',
          featName: 'Comunicação Zoofônica',
          originalName: 'Zoophonic Communication',
          featType: 'class',
        },
        sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
        sourcePage: 65,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Composição',
      originalName: 'Composition',
      description:
        'Magias de composição (truque ou foco) usam Performance (auditiva: canto/poesia; visual: dança/mímica). Só 1 composição por turno e só 1 ativa por vez — lançar outra encerra a anterior.',
    },
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações de moldagem alteram a próxima magia. Use imediatamente antes de Conjurar a Magia; qualquer outra ação no meio desperdiça o benefício.',
    },
    {
      name: 'Repertório',
      originalName: 'Spell repertoire',
      description:
        'Lista de magias que você conhece (occult espontâneo). Slots e repertório crescem juntos, mas são coisas separadas. Pode trocar 1 magia do mesmo posto ao subir de nível.',
    },
    {
      name: 'Magia Assinatura',
      originalName: 'Signature spell',
      description:
        'A partir do 3º: 1 magia assinatura por posto. Você altura essas livremente sem aprender cada versão no repertório.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Conjuração occult (espontânea)',
      originalName: 'Bard Spellcasting',
      body: 'Tradição oculta. Ataque de magia e CD usam Carisma. Você conhece magias no repertório e gasta espaços (slots) para lançá-las — não prepara de manhã como mago/clérigo. Truques à vontade; a altura sobe com metade do nível.',
    },
    {
      title: 'Composições = sua assinatura',
      originalName: 'Composition spells',
      body: 'Começa com Contraperformance (foco) e Hino Corajoso (truque de composição). Reconcentração: 10 min performando ou escrevendo. A reserva de foco começa em 1 (Maestro costuma subir cedo). Lembre: só 1 composição ativa por vez.',
    },
    {
      title: 'Musa',
      originalName: 'Muse',
      body: 'No 1º nível escolha a musa: feito de 1º + magia no repertório + linha de feitos. O feito Musa Multifária permite “pegar” benefícios de outra musa depois.',
    },
    {
      title: 'Papel no grupo',
      body: 'Fortalecer aliados, cura leve, controle social e magia oculta. Percepção especialista cedo, armadura leve, armas marciais. Alterna ataques, cura e magias úteis — não é tanque; é o maestro do encontro.',
    },
    {
      title: 'Feitos de bardo',
      body: 'Feitos de classe nos pares a partir do 2 (a musa já dá um feito de 1º). Muitos feitos expandem composições, perícias ou o estilo da musa.',
    },
    {
      title: 'Obra-prima (19º)',
      originalName: 'Magnum Opus',
      body: '2 magias comuns de 10º no repertório + 1 espaço de 10º com regras especiais. O feito Bis Perfeito pode dar um segundo espaço.',
    },
  ],
  lore: {
    summary:
      'Mestre da arte, estudioso de segredos e persuasor cativante. Com performances poderosas você molda mentes e eleva aliados. Líder carismático, conselheiro, manipulador, erudito, velhaco ou virtuoso — versátil demais para ser “mestre de nada”.',
    duringCombat:
      'Performances mágicas viram o jogo a favor dos aliados. Alterna com confiança entre ataques, cura e magias de apoio.',
    duringSocial:
      'Persuade, enrola e ameaça com facilidade.',
    whileExploring:
      'Fonte de folclore, lendas e contexto. Magias e performances inspiram descobertas e sucesso do grupo.',
    inDowntime:
      'Ganha dinheiro e prestígio com shows, patronos e fama — até atrair alunos a uma faculdade de bardos.',
    youMight: [
      'Ter paixão pela arte tão forte que vira conexão espiritual.',
      'Assumir a frente quando tato e soluções não violentas importam.',
      'Seguir a musa (fey, filosofia, força psíquica, deus da arte) e aprender lore secreto.',
    ],
    othersProbably: [
      'Adoram te convidar a eventos — e te tratam como curiosidade social.',
      'Subestimam você frente a outros conjuradores (“só um menestrel”).',
      'Respondem bem ao charme, mas desconfiam da magia sedutora.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Conjuração de bardo',
        'Proficiências iniciais',
        'Repertório de magias',
        'Magias de composição',
        'Musa',
      ],
    },
    { level: 2, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º posto',
        'Feito geral',
        'Reflexos especialista',
        'Magias assinatura',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Conjurador especialista',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Fortitude especialista',
        'Coração do Performer',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de bardo', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Maestria com armas de bardo',
        'Feito geral',
        'Aumento de perícia',
        'Percepção mestre',
      ],
    },
    { level: 12, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Armadura leve especialista',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Magias de 8º posto',
        'Aumentos de atributo',
        'Feito geral',
        'Conjurador mestre',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Coração do Performer superior',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de bardo', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Conjurador lendário',
        'Magnum Opus',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de bardo', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'bard-spellcasting',
      name: 'Conjuração de Bardo',
      originalName: 'Bard Spellcasting',
      level: 1,
      description:
        'Conjurador oculto espontâneo. Ataque de magia e CD usam Carisma. Lança magias do repertório com espaços; truques à vontade.',
    },
    {
      id: 'bard-spell-repertoire',
      name: 'Repertório de Magias',
      originalName: 'Spell Repertoire',
      level: 1,
      description:
        'No 1º: 2 magias de 1º + 5 truques ocultos. A cada novo espaço, adiciona magia do mesmo posto. Ao subir de nível pode trocar 1 magia do mesmo posto.',
    },
    {
      id: 'bard-composition-spells',
      name: 'Magias de Composição',
      originalName: 'Composition Spells',
      level: 1,
      description:
        'Aprende Contraperformance (foco) e Hino Corajoso (truque de composição). Reserva de foco 1; Reconcentração performando. Só 1 composição ativa por vez.',
    },
    {
      id: 'bard-muse',
      name: 'Musa',
      originalName: 'Muse',
      level: 1,
      description:
        'Escolha uma musa. Ganha o feito e a magia listados na opção e acesso a feitos daquela linha.',
    },
    {
      id: 'bard-reflex-expertise',
      name: 'Reflexos Especialista',
      originalName: 'Reflex Expertise',
      level: 3,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'bard-signature-spells',
      name: 'Magias Assinatura',
      originalName: 'Signature Spells',
      level: 3,
      description:
        'Para cada posto que puder lançar, escolha 1 magia assinatura. Altura livremente essas magias sem aprender cada versão separada.',
    },
    {
      id: 'bard-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description: 'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'bard-fortitude-expertise',
      name: 'Fortitude Especialista',
      originalName: 'Fortitude Expertise',
      level: 9,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'bard-performers-heart',
      name: 'Coração do Performer',
      originalName: "Performer's Heart",
      level: 9,
      description:
        'Vontade sobe para mestre. Sucesso em salvaguarda de Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'bard-weapon-expertise',
      name: 'Maestria com Armas de Bardo',
      originalName: 'Bard Weapon Expertise',
      level: 11,
      description:
        'Armas marciais, simples e desarmadas sobem para especialista. Com composição ativa, crítico nesses ataques aplica especialização crítica.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['martial', 'simple', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'bard-perception-mastery',
      name: 'Percepção Mestre',
      originalName: 'Perception Mastery',
      level: 11,
      description: 'Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'bard-light-armor-expertise',
      name: 'Armadura Leve Especialista',
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
      id: 'bard-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'bard-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'bard-greater-performers-heart',
      name: 'Coração do Performer Superior',
      originalName: "Greater Performer's Heart",
      level: 17,
      description:
        'Vontade sobe para lendária. Falha crítica em Vontade vira falha. Em falha contra efeito que causa dano, sofre metade do dano.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'legendary' }],
    },
    {
      id: 'bard-magnum-opus',
      name: 'Magnum Opus',
      originalName: 'Magnum Opus',
      level: 19,
      description:
        'Adiciona 2 magias comuns de 10º posto ao repertório e ganha 1 espaço de 10º (regras especiais). Bis Perfeito pode dar um segundo espaço.',
    },
    {
      id: 'bard-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=32',
}
