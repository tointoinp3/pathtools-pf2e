import type { CharacterClass } from '@/types/class'
import { SOURCE_DIVINE_MYSTERIES_ID, SOURCE_PLAYER_CORE_ID } from './sources'
import { clericSpellcasting } from './clericSpellcasting'
import { CLASS_CLERIC_ID } from './ids'

export { CLASS_CLERIC_ID }

const CLERIC_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Clérigo Remaster — doutrina no 1º; feitos de classe a partir do 2 */
export const clericClass: CharacterClass = {
  id: CLASS_CLERIC_ID,
  name: 'Clérigo',
  originalName: 'Cleric',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 108,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['wisdom'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'cleric-religion', rank: 'trained', skillId: 'religion' }],
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
  classFeatLevels: CLERIC_CLASS_FEAT_LEVELS,
  spellcasting: clericSpellcasting,
  subclass: {
    id: 'cleric-doctrine',
    label: 'Doutrina',
    description:
      'Mesmo entre fiéis da mesma divindade, o caminho muda. No 1º nível escolha Clérigo de Claustro ou Sacerdote Guerreiro; ganhos extras nos níveis 3, 7, 11, 15 e 19. Fonte: Player Core, pág. 112.',
    required: true,
    options: [
      {
        id: 'doctrine-cloistered',
        name: 'Clérigo de Claustro',
        originalName: 'Cloistered Cleric',
        description:
          'Foco em magia divina e nos domínios da sua divindade — o clássico “sacerdote do templo”.',
        rulesSummary:
          '1º: feito Iniciado de Domínio (magia de foco de um domínio). 3º: Fortitude especialista. 7º: ataque de magia e CD especialista. 11º: especialista na arma favorita, simples e desarmado; crítico com arma favorita aplica especialização (use a CD de magia no lugar da CD de classe). 15º: ataque/CD de magia mestre. 19º: ataque/CD de magia lendário.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 112,
      },
      {
        id: 'doctrine-warpriest',
        name: 'Sacerdote Guerreiro',
        originalName: 'Warpriest',
        description:
          'Doutrina militar da igreja: magias e combate lado a lado, armadura e escudo.',
        rulesSummary:
          '1º: treinado em armadura leve e média; Fortitude especialista; feito Bloqueio com Escudo; se a arma favorita for simples ou desarmada, ganha Simplicidade Mortal. No 13º, com Defesa Divina, armadura leve/média também sobem a especialista. 3º: treinado em armas marciais. 7º: especialista na arma favorita, marciais, simples e desarmado; crítico com arma favorita aplica especialização (CD de magia no lugar da CD de classe). 11º: ataque/CD de magia especialista. 15º: Fortitude mestre (sucesso vira crítico). 19º: mestre na arma favorita, ataque de magia e CD de magia.',
        defenseGrants: [
          { category: 'light', rank: 'trained', label: 'Armadura leve' },
          { category: 'medium', rank: 'trained', label: 'Armadura média' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 112,
      },
      {
        id: 'doctrine-battle-creed',
        name: 'Crença de Batalha',
        originalName: 'Battle Creed',
        description:
          'Arquétipo de classe Arauto de Batalha: você é arma viva da fé. Pegue Dedicação de Arauto de Batalha no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º (Resistência e Atletismo ou Acrobacia). Sem doutrina, sem Fé Resoluta, sem Magia Milagrosa. Conjuração reduzida (tabela do Arauto). Fonte de batalha: espaços extras só para bane ou bless — você escolhe a cada preparo. 1º: armadura leve/média, armas marciais, Fortitude perito; Simplicidade Mortal se a arma favorecida for simples ou desarmada. 5º: perito na favorecida, marciais, simples e desarmados; especialização crítica com a favorecida; CD de classe perita. 9º: Golpe Reativo. 11º: perito em ataque e CD de magia. 13º: mestre na favorecida e em Fortitude (sucesso = crítico); perito em leve/média. 15º: mestre em CD de classe e Vontade. 19º: mestre em leve, média e sem armadura; CD de classe lendária.',
        defenseGrants: [
          { category: 'light', rank: 'trained', label: 'Armadura leve' },
          { category: 'medium', rank: 'trained', label: 'Armadura média' },
        ],
        attackGrants: [
          { category: 'martial', rank: 'trained', label: 'Armas marciais' },
        ],
        saveGrants: [{ save: 'fortitude', rank: 'expert' }],
        sourceId: SOURCE_DIVINE_MYSTERIES_ID,
        sourcePage: 272,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Sagrado / Profano',
      originalName: 'Holy / Unholy',
      description:
        'Marcam o lado da luta entre celestiais e demônios/diabos. Em geral mortos-vivos e demônios sofrem com efeitos sagrados; celestiais, com efeitos profanos. Sua santificação (da divindade) pode conceder o traço sagrado ou profano.',
    },
    {
      name: 'Santificado',
      originalName: 'Sanctified',
      description:
        'Se você é sagrado ou profano, ações e magias santificadas ganham o mesmo traço.',
    },
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações de moldagem alteram a próxima magia. Use imediatamente antes de Conjurar a Magia; qualquer outra ação no meio desperdiça o benefício. Efeitos extras fazem parte da magia.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Divindade (escolha central)',
      originalName: 'Deity',
      body: 'Você serve uma divindade do catálogo (aba Divindade): editos, anátema, arma favorita, 1 perícia treinada extra, magias adicionais na lista divina e fonte divina (Curar e/ou Ferir). A santificação pode torná-lo sagrado ou profano (ou permitir escolher). Fonte, santificação e domínio nunca são escolhidos automaticamente.',
    },
    {
      title: 'Fonte divina',
      originalName: 'Divine Font',
      body: 'Espaços extras no seu posto mais alto de magia de clérigo, só para Curar ou só para Ferir (conforme a divindade; se ambas, escolha permanente). 4 espaços no 1º, 5 no 5º, 6 no 15º. É o “tanque” de cura ou dano divino do dia.',
    },
    {
      title: 'Conjuração divina (preparada)',
      originalName: 'Cleric Spellcasting',
      body: 'Tradição divina, preparada. Ataque de magia e CD usam Sabedoria. No 1º: 2 magias de 1º + 5 truques (+ fonte). Truques à vontade; a altura sobe com metade do nível (arredondado para cima). No 19º: espaço especial de 10º (Magia Milagrosa).',
    },
    {
      title: 'Doutrina = estilo de jogo',
      originalName: 'Doctrine',
      body: 'Claustro = magia e domínios primeiro. Sacerdote Guerreiro = armadura, escudo e armas mais cedo, magia um pouco mais tarde. Os “degraus” da doutrina (3/7/11/15/19) moldam a progressão de proficiência.',
    },
    {
      title: 'Anátema e fé',
      originalName: 'Anathema',
      body: 'Atos contra a divindade (incluindo magias sagradas/profanas proibidas) podem cortar fonte e conjuração até um ritual de expiação. Combine com o mestre o que conta como anátema.',
    },
    {
      title: 'Feitos de clérigo',
      body: 'Feitos de classe nos pares a partir do 2 (não no 1º). Domínios, canais, armas sagradas e moldagens de magia costumam vir de feitos — Iniciado de Domínio (claustro) é o ponto de partida típico.',
    },
  ],
  lore: {
    summary:
      'Servo mortal de uma divindade: magia divina, símbolos da fé e a arma favorita do seu deus. Protege e cura aliados — ou pune inimigos da fé — conforme a vontade divina. Vida de devoção, em palavra e ato.',
    duringCombat:
      'Sacerdote Guerreiro equilibra magias e ataques (arma favorita). Claustro prioriza magias. A maioria dos feitiços reforça, protege ou cura; a divindade define extras para curar ou ferir.',
    duringSocial:
      'Diplomacia e discursos impressionantes. Com Sabedoria alta, percebe mentiras.',
    whileExploring:
      'Detecta magia, interpreta textos religiosos, concentra proteção nos aliados e cura após combate ou perigo.',
    inDowntime:
      'Serviços no templo, viagem para espalhar a palavra, estudo de escrituras, dias sagrados — ou fundar um novo templo.',
    youMight: [
      'Visitar locais sagrados e sentir afinidade imediata com outros fiéis.',
      'Conhecer os textos sagrados e aplicá-los a dilemas.',
      'Cooperar com aliados, desde que não peçam o que vai contra a vontade divina.',
    ],
    othersProbably: [
      'Acham sua devoção impressionante, mesmo sem entendê-la.',
      'Esperam que você cure ferimentos.',
      'Contam com você para lidar com outras figuras religiosas.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Divindade',
        'Conjuração de clérigo',
        'Fonte divina',
        'Doutrina',
      ],
    },
    { level: 2, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Magias de 2º posto',
        'Feito geral',
        'Segunda doutrina',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Percepção especialista',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Feito geral',
        'Aumento de perícia',
        'Terceira doutrina',
      ],
    },
    { level: 8, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Fé resoluta',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de clérigo', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Quarta doutrina',
        'Feito geral',
        'Reflexos especialista',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Defesa divina',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Magias de 8º posto',
        'Aumentos de atributo',
        'Quinta doutrina',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de clérigo', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Doutrina final',
        'Feito geral',
        'Magia milagrosa',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de clérigo', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'cleric-deity',
      name: 'Divindade',
      originalName: 'Deity',
      level: 1,
      description:
        'Escolha uma divindade. Ganha perícia treinada determinada por ela, treino (e acesso se incomum) na arma favorita, magias extras na lista e fonte divina (Curar/Ferir). Santificação e anátema conforme a entrada da divindade.',
    },
    {
      id: 'cleric-spellcasting',
      name: 'Conjuração de Clérigo',
      originalName: 'Cleric Spellcasting',
      level: 1,
      description:
        'Conjurador divino preparado. Ataque de magia e CD usam Sabedoria. Prepare magias da lista divina (e as concedidas pela divindade) conforme a tabela de slots.',
    },
    {
      id: 'cleric-divine-font',
      name: 'Fonte Divina',
      originalName: 'Divine Font',
      level: 1,
      description:
        'Espaços extras no posto mais alto só para Curar (fonte de cura) ou Ferir (fonte nociva): 4 no 1º, 5 no 5º, 6 no 15º. A divindade define quais opções existem; se ambas, escolha permanente.',
    },
    {
      id: 'cleric-doctrine',
      name: 'Doutrina',
      originalName: 'Doctrine',
      level: 1,
      description:
        'Escolha Clérigo de Claustro ou Sacerdote Guerreiro. Benefícios nos níveis 1, 3, 7, 11, 15 e 19 conforme a doutrina.',
    },
    {
      id: 'cleric-second-doctrine',
      name: 'Segunda Doutrina',
      originalName: 'Second Doctrine',
      level: 3,
      description: 'Ganhe o benefício de 3º nível da sua doutrina.',
    },
    {
      id: 'cleric-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 5,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'cleric-third-doctrine',
      name: 'Terceira Doutrina',
      originalName: 'Third Doctrine',
      level: 7,
      description: 'Ganhe o benefício de 7º nível da sua doutrina.',
    },
    {
      id: 'cleric-resolute-faith',
      name: 'Fé Resoluta',
      originalName: 'Resolute Faith',
      level: 9,
      description:
        'Vontade sobe para mestre. Sucesso em salvaguarda de Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'cleric-fourth-doctrine',
      name: 'Quarta Doutrina',
      originalName: 'Fourth Doctrine',
      level: 11,
      description: 'Ganhe o benefício de 11º nível da sua doutrina.',
    },
    {
      id: 'cleric-reflex-expertise',
      name: 'Reflexos Especialista',
      originalName: 'Reflex Expertise',
      level: 11,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'cleric-divine-defense',
      name: 'Defesa Divina',
      originalName: 'Divine Defense',
      level: 13,
      description:
        'Defesa sem armadura sobe para especialista. Sacerdote Guerreiro: armadura leve e média também sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'cleric-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'cleric-fifth-doctrine',
      name: 'Quinta Doutrina',
      originalName: 'Fifth Doctrine',
      level: 15,
      description: 'Ganhe o benefício de 15º nível da sua doutrina.',
    },
    {
      id: 'cleric-final-doctrine',
      name: 'Doutrina Final',
      originalName: 'Final Doctrine',
      level: 19,
      description: 'Ganhe o benefício de 19º nível da sua doutrina.',
    },
    {
      id: 'cleric-miraculous-spell',
      name: 'Magia Milagrosa',
      originalName: 'Miraculous Spell',
      level: 19,
      description:
        'Ganha 1 espaço de 10º posto (regras especiais: não combina com efeitos que dão espaços extras ou lançam sem gastar espaço). O feito Criador de Milagres pode dar um segundo.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=33',
}
