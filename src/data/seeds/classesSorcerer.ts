import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'
import { sorcererSpellcasting } from './sorcererSpellcasting'
import { CLASS_SORCERER_ID } from './ids'

export { CLASS_SORCERER_ID }

const SORCERER_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Feiticeiro — Player Core 2 (Remaster), AoN Classes ID 62 */
export const sorcererClass: CharacterClass = {
  id: CLASS_SORCERER_ID,
  name: 'Feiticeiro',
  originalName: 'Sorcerer',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 144,
  hitPointsPerLevel: 6,
  keyAttributeOptions: ['charisma'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    additionalBase: 2,
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
  classFeatLevels: SORCERER_CLASS_FEAT_LEVELS,
  spellcasting: sorcererSpellcasting,
  subclass: {
    id: 'sorcerer-bloodline',
    label: 'Linhagem',
    description:
      'A linhagem define tradição, 2 perícias treinadas, dádivas feiticeiras no repertório, magia de linhagem (foco) e magia de sangue. Só linhagens Remaster (Player Core 2). Fonte: Player Core 2, pág. 149.',
    required: true,
    options: [
      {
        id: 'bloodline-aberrant',
        name: 'Aberrante',
        originalName: 'Aberrant',
        tradition: 'occult',
        description:
          'Algo antigo e incompreensível fala com você — das estrelas ou das profundezas da terra.',
        rulesSummary:
          'Tradição oculta. Perícias: Intimidação e Ocultismo. Magia de linhagem inicial: Membros Tentaculares. Magia de sangue — Véu Sinistro: alvo −1 de status em Vontade por 1 rodada, ou você +2 de status em Vontade por 1 rodada.',
        skillGrants: [
          { id: 'bloodline-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'bloodline-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 149,
      },
      {
        id: 'bloodline-angelic',
        name: 'Angélica',
        originalName: 'Angelic',
        tradition: 'divine',
        description:
          'Um ancestral veio de um reino celestial, ou a devoção da família abençoou a linhagem.',
        rulesSummary:
          'Tradição divina. Perícias: Diplomacia e Religião. Magia inicial: Halo Angélico. Magia de sangue — Aura Divina: você ou um alvo ganha +1 de status em salvaguardas por 1 rodada.',
        skillGrants: [
          { id: 'bloodline-diplomacy', rank: 'trained', skillId: 'diplomacy' },
          { id: 'bloodline-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 150,
      },
      {
        id: 'bloodline-demonic',
        name: 'Demoníaca',
        originalName: 'Demonic',
        tradition: 'divine',
        description:
          'Demônios corrompem tudo o que tocam. Um ancestral caiu nessa corrupção — e o pecado pesa em você.',
        rulesSummary:
          'Tradição divina. Perícias: Intimidação e Religião. Magia inicial: Mandíbulas da Gula. Magia de sangue — Corrupção do Pecado: alvo −1 de status na CA por 1 rodada, ou você +2 de status em Intimidação por 1 rodada.',
        skillGrants: [
          { id: 'bloodline-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'bloodline-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 150,
      },
      {
        id: 'bloodline-diabolic',
        name: 'Diabólica',
        originalName: 'Diabolic',
        tradition: 'divine',
        description:
          'Diabos são o mal de língua prateada. Um ancestral flertou com as trevas ou fez um pacto infernal.',
        rulesSummary:
          'Tradição divina. Perícias: Enganação e Religião. Magia inicial: Édito Diabólico. Magia de sangue — Língua de Chamas: alvo sofre 1 de fogo por posto da magia, ou você +2 de status em Enganação por 1 rodada.',
        skillGrants: [
          { id: 'bloodline-deception', rank: 'trained', skillId: 'deception' },
          { id: 'bloodline-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 150,
      },
      {
        id: 'bloodline-draconic',
        name: 'Dracônica',
        originalName: 'Draconic',
        description:
          'Sangue de dragão: temidos em combate e hábeis em magia. No 1º escolha o exemplar (tradição).',
        rulesSummary:
          'Tradição variável (arcana, divina, oculta ou primal). Perícias: Intimidação + a perícia da tradição (Arcana, Religião, Ocultismo ou Natureza). Magia inicial: Rajada de Garras. Magia de sangue — Pele Escamosa: +1 de status à CA por 1 rodada (você ou um alvo).',
        skillGrants: [
          { id: 'bloodline-intimidation', rank: 'trained', skillId: 'intimidation' },
        ],
        skillChoiceOptions: ['arcana', 'religion', 'occultism', 'nature'],
        skillChoiceLabel: 'Perícia da tradição do exemplar dracônico',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 150,
      },
      {
        id: 'bloodline-elemental',
        name: 'Elemental',
        originalName: 'Elemental',
        tradition: 'primal',
        description:
          'Influência elemental impregnou seu sangue de fúria primal. No 1º escolha ar, terra, fogo, metal, água ou madeira.',
        rulesSummary:
          'Tradição primal. Perícias: Intimidação e Natureza. Magia inicial: Arremesso Elemental. Magia de sangue — Fúria Elemental: +2 de status em Intimidação por 1 rodada, ou alvo sofre 1 de dano do seu elemento por posto da magia.',
        skillGrants: [
          { id: 'bloodline-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'bloodline-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 151,
      },
      {
        id: 'bloodline-fey',
        name: 'Feérica',
        originalName: 'Fey',
        tradition: 'primal',
        description:
          'Capricho feérico ou um encontro num bosque ao luar colocou a magia do Primeiro Mundo no sangue da família.',
        rulesSummary:
          'Tradição primal. Perícias: Enganação e Natureza. Magia inicial: Poeira de Fada. Magia de sangue — Manto de Fitas: +2 de status em Performance por 1 rodada, ou você fica oculto por 1 rodada (ocultação óbvia — não serve para Esconder-se).',
        skillGrants: [
          { id: 'bloodline-deception', rank: 'trained', skillId: 'deception' },
          { id: 'bloodline-nature', rank: 'trained', skillId: 'nature' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 151,
      },
      {
        id: 'bloodline-hag',
        name: 'Bruxa do Pântano',
        originalName: 'Hag',
        tradition: 'occult',
        description:
          'Uma hag amaldiçoou sua família, ou você descende de hag/changeling — a magia delas infesta sangue e alma.',
        rulesSummary:
          'Tradição oculta. Perícias: Enganação e Ocultismo. Magia inicial: Malefício Ciumento. Magia de sangue — Rancor Retributivo: o primeiro que o danificar até o fim do próximo turno sofre 4 de dano mental por posto (Vontade básica); se ninguém o danificar, você ganha PV temporários iguais ao posto.',
        skillGrants: [
          { id: 'bloodline-deception', rank: 'trained', skillId: 'deception' },
          { id: 'bloodline-occultism', rank: 'trained', skillId: 'occultism' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 152,
      },
      {
        id: 'bloodline-imperial',
        name: 'Imperial',
        originalName: 'Imperial',
        tradition: 'arcane',
        description:
          'Um ancestral foi um mortal que dominou a magia — o poder arcano corre nas veias.',
        rulesSummary:
          'Tradição arcana. Perícias: Arcana e Sociedade. Magia inicial: Memórias Ancestrais. Magia de sangue — Defesa Imperiosa: até o início do próximo turno, +1 de status à CA ou +1 de status em salvaguardas (sua escolha).',
        skillGrants: [
          { id: 'bloodline-arcana', rank: 'trained', skillId: 'arcana' },
          { id: 'bloodline-society', rank: 'trained', skillId: 'society' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 152,
      },
      {
        id: 'bloodline-undead',
        name: 'Morta-Viva',
        originalName: 'Undead',
        tradition: 'divine',
        description:
          'O toque da morte-viva corre no sangue. A árvore genealógica pode ter um morto-vivo poderoso, como um vampiro.',
        rulesSummary:
          'Tradição divina. Perícias: Intimidação e Religião. Magia inicial: Bênção da Morte-Viva. Magia de sangue — Vida Roubada: PV temporários iguais ao posto até o início do próximo turno, ou alvo sofre 1 de dano de vazio por posto da magia.',
        skillGrants: [
          { id: 'bloodline-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'bloodline-religion', rank: 'trained', skillId: 'religion' },
        ],
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 152,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Magia de Sangue',
      originalName: 'Blood Magic',
      description:
        'Ao lançar uma dádiva feiticeira (espaço) ou magia de linhagem (foco), você aplica um efeito de magia de sangue que conhece. Em geral só 1 por vez. Escolha antes de resolver a magia; ocorre depois das jogadas iniciais e, contra inimigo, só se o ataque acertar ou ele falhar na salvaguarda.',
    },
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações de moldagem alteram a próxima magia. Use imediatamente antes de Conjurar a Magia; qualquer outra ação no meio desperdiça o benefício. Efeitos extras fazem parte da magia.',
    },
    {
      name: 'Dádivas Feiticeiras',
      originalName: 'Sorcerous Gifts',
      description:
        'Magias que a linhagem coloca automaticamente no repertório (truque + 1º no 1º nível; as outras quando você ganha aquele posto). Não podem ser trocadas ao subir de nível.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Linhagem = tradição + sangue',
      originalName: 'Bloodline',
      body: 'A escolha de 1º nível define tudo: lista de magias, 2 perícias, dádivas no repertório, magia de foco e o efeito de magia de sangue. Sem grimório — o poder já está no sangue.',
    },
    {
      title: 'Espontâneo + repertório',
      originalName: 'Spell Repertoire',
      body: 'No 1º: 2 magias de 1º à escolha + 4 truques + 1 magia e 1 truque da linhagem. 3 espaços de 1º. Ao ganhar um posto novo, a primeira magia é sempre a dádiva da linhagem. Ao subir de nível pode trocar 1 magia do mesmo posto (não as da linhagem).',
    },
    {
      title: 'Potência Feiticeira',
      originalName: 'Sorcerous Potency',
      body: 'Magias de espaço que causam dano ou restauram PV ganham bônus de status igual ao posto da magia no dano/cura inicial. Cada criatura só recebe isso uma vez por magia. É o “porquê o feiticeiro dói mais” no mesmo posto.',
    },
    {
      title: 'Magias emblemáticas (3º)',
      originalName: 'Signature Spells',
      body: '1 magia emblemática por posto que você tem. Eleva livremente sem aprender versões altas. Trocar emblemática exige retreino (ou a troca normal de repertório no nível).',
    },
    {
      title: 'Foco sem ritual',
      originalName: 'Bloodline Spells',
      body: 'Magias de linhagem são foco. Reserva começa em 1. Refocar não exige atividade especial — o poder nas veias recarrega sozinho em 10 minutos. Máximo = nº de magias de foco (até 3).',
    },
    {
      title: 'Papel no grupo',
      body: 'Conjurador de Carisma, 6 PV, sem armadura. Dano e controle conforme a linhagem. Feitos de classe a partir do 2º. Itens (pergaminhos, varinhas) compensam o repertório curto.',
    },
  ],
  lore: {
    summary:
      'Você não escolheu ser conjurador — nasceu assim. Há magia no sangue: bênção divina, pacto primordial ou ritual oculto antigo. Refinar esse poder é também escolher se vai dominá-lo ou ser destruído por ele.',
    duringCombat:
      'Magias ferem, influenciam e travam inimigos. Pode ser frágil demais para o corpo a corpo — ou a linhagem ajuda na briga. Truques conservam os espaços fortes para o momento certo.',
    duringSocial:
      'Carisma natural: você se sai bem ao lidar com pessoas.',
    whileExploring:
      'Detecta magia, acha tesouros e avisa o grupo de armadilhas mágicas. Mistérios ligados à linhagem são o seu quebra-cabeça.',
    inDowntime:
      'Fabrica itens mágicos ou escreve pergaminhos. A linhagem pode empurrá-lo a pesquisar a ancestralidade ou conviver com povos/criaturas afiliados.',
    youMight: [
      'Ter um traço independente forte e querer se distinguir como conjurador e como pessoa.',
      'Ver a linhagem com fascínio, medo, ou os dois.',
      'Depender de pergaminhos e varinhas para complementar o repertório limitado.',
    ],
    othersProbably: [
      'Maravilham-se com magia do nada — e desconfiam na mesma medida.',
      'Acham você menos dedicado que magos e clérigos, porque o poder veio fácil.',
      'Assumem que você é tão imprevisível quanto a magia que solta.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Linhagem',
        'Conjuração de feiticeiro',
        'Repertório de magias',
        'Potência Feiticeira',
      ],
    },
    { level: 2, features: ['Feito de perícia', 'Feito de feiticeiro'] },
    {
      level: 3,
      features: [
        'Magias de 2º posto',
        'Feito geral',
        'Magias emblemáticas',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de perícia', 'Feito de feiticeiro'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Fortitude mágica',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de perícia', 'Feito de feiticeiro'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Conjurador especialista',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de perícia', 'Feito de feiticeiro'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Reflexos especialista',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de feiticeiro'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Feito geral',
        'Percepção especialista',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    { level: 12, features: ['Feito de perícia', 'Feito de feiticeiro'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Túnicas defensivas',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de perícia', 'Feito de feiticeiro'] },
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
    { level: 16, features: ['Feito de perícia', 'Feito de feiticeiro'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Vontade majestosa',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de perícia', 'Feito de feiticeiro'] },
    {
      level: 19,
      features: [
        'Paragão da linhagem',
        'Feito geral',
        'Conjurador lendário',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de feiticeiro'],
    },
  ],
  features: [
    {
      id: 'sorcerer-bloodline',
      name: 'Linhagem',
      originalName: 'Bloodline',
      level: 1,
      description:
        'Escolha uma linhagem. Define tradição, perícias, dádivas no repertório, magia de foco e magia de sangue.',
    },
    {
      id: 'sorcerer-spellcasting',
      name: 'Conjuração de Feiticeiro',
      originalName: 'Sorcerer Spellcasting',
      level: 1,
      description:
        'Conjurador espontâneo. Tradição vem da linhagem. Ataque de magia e CD usam Carisma. Lança magias do repertório com espaços; truques à vontade.',
    },
    {
      id: 'sorcerer-spell-repertoire',
      name: 'Repertório de Magias',
      originalName: 'Spell Repertoire',
      level: 1,
      description:
        'No 1º: 2 magias de 1º + 4 truques à escolha, mais 1 magia e 1 truque da linhagem. A cada espaço novo, adiciona magia do mesmo posto. Ao subir de nível pode trocar 1 magia (não as da linhagem).',
    },
    {
      id: 'sorcerer-sorcerous-potency',
      name: 'Potência Feiticeira',
      originalName: 'Sorcerous Potency',
      level: 1,
      description:
        'Ao Conjurar uma Magia de espaço que cause dano ou restaure PV, ganha bônus de status igual ao posto da magia nesse dano/cura inicial. Cada criatura só se beneficia uma vez por magia.',
    },
    {
      id: 'sorcerer-signature-spells',
      name: 'Magias Emblemáticas',
      originalName: 'Signature Spells',
      level: 3,
      description:
        'Para cada posto que você tem, escolha 1 magia emblemática. Pode elevá-la livremente sem aprender versões altas.',
    },
    {
      id: 'sorcerer-magical-fortitude',
      name: 'Fortitude Mágica',
      originalName: 'Magical Fortitude',
      level: 5,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'sorcerer-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description: 'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'sorcerer-reflex-expertise',
      name: 'Reflexos Especialista',
      originalName: 'Reflex Expertise',
      level: 9,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'sorcerer-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 11,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'sorcerer-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 11,
      description: 'Armas simples e ataques desarmados sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'sorcerer-defensive-robes',
      name: 'Túnicas Defensivas',
      originalName: 'Defensive Robes',
      level: 13,
      description: 'Defesa sem armadura sobe para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'sorcerer-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'sorcerer-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'sorcerer-majestic-will',
      name: 'Vontade Majestosa',
      originalName: 'Majestic Will',
      level: 17,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'sorcerer-bloodline-paragon',
      name: 'Paragão da Linhagem',
      originalName: 'Bloodline Paragon',
      level: 19,
      description:
        'Adicione 2 magias comuns de 10º posto da sua tradição ao repertório e ganhe 1 espaço de 10º (regras especiais). O feito Perfeição da Linhagem pode dar um segundo espaço.',
    },
    {
      id: 'sorcerer-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=62',
}
