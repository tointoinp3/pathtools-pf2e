import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_ID, SOURCE_WAR_OF_IMMORTALS_ID } from './sources'
import { CLASS_FIGHTER_ID, CLASS_ROGUE_ID } from './ids'
import { barbarianClass } from './classesBarbarian'
import { wizardClass } from './classesWizard'
import { clericClass } from './classesCleric'
import { bardClass } from './classesBard'
import { witchClass } from './classesWitch'
import { rangerClass } from './classesRanger'
import { druidClass } from './classesDruid'
import { championClass } from './classesChampion'
import { magusClass } from './classesMagus'
import { monkClass } from './classesMonk'
import { sorcererClass } from './classesSorcerer'
import { alchemistClass } from './classesAlchemist'
import { oracleClass } from './classesOracle'
import { summonerClass } from './classesSummoner'
import { psychicClass } from './classesPsychic'
import { thaumaturgeClass } from './classesThaumaturge'
import { swashbucklerClass } from './classesSwashbuckler'
import { investigatorClass } from './classesInvestigator'
import { kineticistClass } from './classesKineticist'
import { gunslingerClass } from './classesGunslinger'
import { inventorClass } from './classesInventor'
import { commanderClass } from './classesCommander'
import { guardianClass } from './classesGuardian'
import { animistClass } from './classesAnimist'
import { exemplarClass } from './classesExemplar'
import { necromancerClass } from './classesNecromancer'
import { runesmithClass } from './classesRunesmith'
import { attachGrantedSpells } from './classGrantedSpells'

export {
  barbarianClass,
  wizardClass,
  clericClass,
  bardClass,
  witchClass,
  rangerClass,
  druidClass,
  magusClass,
  championClass,
  monkClass,
  sorcererClass,
  alchemistClass,
  oracleClass,
  summonerClass,
  psychicClass,
  thaumaturgeClass,
  swashbucklerClass,
  investigatorClass,
  kineticistClass,
  gunslingerClass,
  inventorClass,
  commanderClass,
  guardianClass,
  animistClass,
  exemplarClass,
  necromancerClass,
  runesmithClass,
}

/**
 * IDs continuam reexportados por compatibilidade, mas a fonte é `./ids`.
 * Importe de lá quando precisar só do ID — evita puxar as definições.
 */
export {
  CLASS_FIGHTER_ID,
  CLASS_ROGUE_ID,
  CLASS_BARBARIAN_ID,
  CLASS_BARD_ID,
  CLASS_CHAMPION_ID,
  CLASS_CLERIC_ID,
  CLASS_DRUID_ID,
  CLASS_WITCH_ID,
  CLASS_WIZARD_ID,
  CLASS_RANGER_ID,
  CLASS_MAGUS_ID,
  CLASS_MONK_ID,
  CLASS_SORCERER_ID,
  CLASS_ALCHEMIST_ID,
  CLASS_ORACLE_ID,
  CLASS_SUMMONER_ID,
  CLASS_PSYCHIC_ID,
  CLASS_THAUMATURGE_ID,
  CLASS_SWASHBUCKLER_ID,
  CLASS_INVESTIGATOR_ID,
  CLASS_KINETICIST_ID,
  CLASS_GUNSLINGER_ID,
  CLASS_INVENTOR_ID,
  CLASS_COMMANDER_ID,
  CLASS_GUARDIAN_ID,
  CLASS_ANIMIST_ID,
  CLASS_EXEMPLAR_ID,
  CLASS_NECROMANCER_ID,
  CLASS_RUNESMITH_ID,
} from './ids'

const WEAPON_GROUPS = [
  { id: 'axe', label: 'Machado', originalLabel: 'Axe' },
  { id: 'bomb', label: 'Bomba', originalLabel: 'Bomb' },
  { id: 'bow', label: 'Arco', originalLabel: 'Bow' },
  { id: 'brawling', label: 'Briga', originalLabel: 'Brawling' },
  { id: 'club', label: 'Clava', originalLabel: 'Club' },
  { id: 'crossbow', label: 'Besta', originalLabel: 'Crossbow' },
  { id: 'dart', label: 'Dardo', originalLabel: 'Dart' },
  { id: 'firearm', label: 'Arma de fogo', originalLabel: 'Firearm' },
  { id: 'flail', label: 'Mangual', originalLabel: 'Flail' },
  { id: 'hammer', label: 'Martelo', originalLabel: 'Hammer' },
  { id: 'knife', label: 'Faca', originalLabel: 'Knife' },
  { id: 'pick', label: 'Picareta', originalLabel: 'Pick' },
  { id: 'polearm', label: 'Arma de haste', originalLabel: 'Polearm' },
  { id: 'shield', label: 'Escudo', originalLabel: 'Shield' },
  { id: 'sling', label: 'Funda', originalLabel: 'Sling' },
  { id: 'spear', label: 'Lança', originalLabel: 'Spear' },
  { id: 'sword', label: 'Espada', originalLabel: 'Sword' },
]

/** Guerreiro — Player Core (Remaster), AoN Classes ID 35 */
export const fighterClass: CharacterClass = {
  id: CLASS_FIGHTER_ID,
  name: 'Guerreiro',
  originalName: 'Fighter',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 136,
  hitPointsPerLevel: 10,
  keyAttributeOptions: ['strength', 'dexterity'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'expert',
    reflex: 'expert',
    will: 'trained',
  },
  skills: {
    choiceOptions: ['acrobatics', 'athletics'],
    choiceCount: 1,
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'expert', label: 'Armas simples' },
    { category: 'martial', rank: 'expert', label: 'Armas marciais' },
    { category: 'advanced', rank: 'trained', label: 'Armas avançadas' },
    { category: 'unarmed', rank: 'expert', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'allArmor', rank: 'trained', label: 'Todas as armaduras' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  weaponGroupOptions: WEAPON_GROUPS,
  subclass: {
    id: 'fighter-class-archetype',
    label: 'Arquétipo de classe',
    description:
      'Opcional no 1º nível. O Guerreiro da Lenda troca o caminho clássico por bênção e maldição. Sem esta escolha, você é o guerreiro padrão (todas as armaduras e Bloqueio com Escudo). Fonte: War of Immortals, pág. 66.',
    required: false,
    options: [
      {
        id: 'path-warrior-of-legend',
        name: 'Guerreiro da Lenda',
        originalName: 'Warrior of Legend',
        description:
          'Uma bênção garante sua lenda — e uma maldição anuncia a queda. Pegue Dedicação de Guerreiro da Lenda no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º. Sem treino em armadura pesada (perícia/maestria só em leve, média e sem armadura). Sem Bloqueio com Escudo. Treinado em Acrobacia e Atletismo (não escolhe uma). Fraqueza amaldiçoada: concussão, perfurante ou cortante — você escolhe; fraqueza = metade do nível (mín. 1). Ganha Difícil de Matar (Diehard), mas fica condenado 2 ao sofrer dano da fraqueza. Maestria de arma e Lenda da Arma só em lanças e hastes. O motor não escolhe a fraqueza.',
        skillGrants: [
          { id: 'legend-acrobatics', rank: 'trained', skillId: 'acrobatics' },
          { id: 'legend-athletics', rank: 'trained', skillId: 'athletics' },
        ],
        grantedFeat: {
          featName: 'Difícil de Matar',
          originalName: 'Diehard',
          featType: 'general',
          featId: 'feat-diehard',
        },
        replacesFeatureIds: ['fighter-shield-block'],
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 66,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Apogeu',
      originalName: 'Flourish',
      description:
        'Ações com o traço flourish são técnicas especiais que exigem esforço demais para usar com frequência. Você só pode usar uma ação com o traço flourish por rodada.',
    },
    {
      name: 'Pressão',
      originalName: 'Press',
      description:
        'Ações com este traço permitem acompanhar ataques anteriores. Uma ação press só pode ser usada se você estiver afetado por uma penalidade de ataque múltiplo. Não pode usar press fora do seu turno, mesmo com Preparar. Alguns efeitos de falha em press não se aplicam em falha crítica; se tiver sucesso, pode optar pelo efeito de falha.',
    },
    {
      name: 'Postura',
      originalName: 'Stance',
      description:
        'Uma postura é uma estratégia de combate que você assume com uma ação de stance e mantém por um tempo. Dura até você ficar inconsciente, violar requisitos, o encontro acabar ou usar outra ação de stance. Após uma ação de stance, não pode usar outra por 1 rodada. Só em modo de encontro. Você pode Dispensar uma postura.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Golpe Reativo',
      originalName: 'Reactive Strike',
      body: 'Sua assinatura: reação para atacar quando o inimigo baixa a guarda (sair do alcance, lançar magia, etc.). Combina com feitos que expandem gatilhos e punições.',
    },
    {
      title: 'Feitos de combate em cascata',
      body: 'Você ganha feito de guerreiro já no 1º nível e depois em todos os pares. Muitos feitos usam Pressão (só com penalidade de ataque múltiplo) ou Apogeu (1 por rodada) — leia os traços antes de montar o combo do turno.',
    },
    {
      title: 'Maestria de grupo de arma',
      originalName: 'Fighter Weapon Mastery',
      body: 'No 5º nível você escolhe um grupo de arma (espada, arco, haste…). Esse grupo sobe de proficiência e alimenta feitos/especializações posteriores. É a “especialização” do guerreiro no lugar de racket/escola.',
    },
    {
      title: 'Críticos e pressão de linha de frente',
      body: 'PV altos, todas as armaduras e armas marciais especialista cedo. Seu trabalho é controlar o espaço, gerar críticos e proteger quem não aguenta o frente a frente.',
    },
  ],
  lore: {
    summary:
      'Lutando por honra, ganância, lealdade ou simplesmente pela emoção da batalha, você é um mestre indiscutível de armamentos e técnicas de combate. Combina ações em aberturas, golpes finais e contra-ataques sempre que os inimigos baixam a guarda. Cavaleiro, mercenário, atirador de elite ou mestre de lâminas — você transformou a arte marcial em forma de arte e desfere críticos devastadores.',
    duringCombat:
      'Você ataca com precisão inigualável e usa técnicas especializadas. Um guerreiro corpo a corpo fica entre aliados e inimigos. Um guerreiro à distância entrega tiros precisos de longe.',
    duringSocial:
      'Você pode ser uma presença intimidadora — útil ao negociar com inimigos, às vezes um problema em interações mais refinadas.',
    whileExploring:
      'Você mantém as defesas prontas para o combate e fica atento a ameaças ocultas. Também supera desafios físicos: arrombar portas, levantar obstáculos, escalar e saltar fossos.',
    inDowntime:
      'Você pode fazer trabalho braçal ou fabricar/reparar armamentos. Se souber técnicas que não favorece mais, pode treinar outras. Com reputação, pode erguer uma organização ou fortaleza.',
    youMight: [
      'Conhecer o propósito e a qualidade de cada arma e peça de armadura que possui.',
      'Reconhecer que o perigo da vida de aventureiro precisa ser equilibrado com grande celebração ou obras ambiciosas.',
      'Ter pouca paciência para enigmas ou problemas que exigem lógica detalhada ou estudo.',
    ],
    othersProbably: [
      'Acham você intimidador até conhecê-lo — e talvez mesmo depois.',
      'Esperam que você seja só músculo, sem cérebro.',
      'Respeitam sua expertise na arte da guerra e valorizam sua opinião sobre armamentos.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Golpe Reativo',
        'Feito de guerreiro',
        'Bloqueio com Escudo',
      ],
    },
    { level: 2, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Bravura', 'Feito geral', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Maestria de Arma do Guerreiro',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Observador de Campo',
        'Feito geral',
        'Aumento de perícia',
        'Especialização em Arma',
      ],
    },
    { level: 8, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Endurecido em Batalha',
        'Flexibilidade de Combate',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de guerreiro', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Expertise em Armadura',
        'Expertise de Guerreiro',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Lenda das Armas',
      ],
    },
    { level: 14, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Especialização Maior em Arma',
        'Flexibilidade Aprimorada',
        'Aumento de perícia',
        'Reflexos Temperados',
      ],
    },
    { level: 16, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Maestria em Armadura',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de guerreiro', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Aumento de perícia',
        'Lenda Versátil',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de guerreiro', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'fighter-reactive-strike',
      name: 'Golpe Reativo',
      originalName: 'Reactive Strike',
      level: 1,
      actionType: 'reaction',
      trigger:
        'Uma criatura no seu alcance usa uma ação de manipular ou mover, faz um ataque à distância, ou deixa um quadrado durante uma ação de movimento que está usando.',
      description:
        'Sempre atento a fraquezas, você ataca rapidamente inimigos que deixam uma abertura. Faça um Golpe corpo a corpo contra a criatura que disparou. Se for um crítico e o gatilho foi manipular, você interrompe essa ação. Este Golpe não conta para a penalidade de ataque múltiplo e ela não se aplica a este Golpe.',
    },
    {
      id: 'fighter-shield-block',
      name: 'Bloqueio com Escudo',
      originalName: 'Shield Block',
      level: 1,
      description:
        'Você ganha o feito geral Bloqueio com Escudo, uma reação que permite reduzir dano com seu escudo.',
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
      id: 'fighter-feat-1',
      name: 'Feito de Guerreiro',
      originalName: 'Fighter Feat',
      level: 1,
      description:
        'No 1º nível e em cada nível par, você ganha um feito de classe de guerreiro. (A escolha do feito específico virá no compêndio de feitos.)',
    },
    {
      id: 'fighter-bravery',
      name: 'Bravura',
      originalName: 'Bravery',
      level: 3,
      description:
        'Sua proficiência em Vontade sobe para especialista. Em sucesso em salvaguarda de Vontade contra efeito de medo, vira sucesso crítico. Sempre que ganhar a condição assustado, reduza o valor em 1.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'expert' }],
    },
    {
      id: 'fighter-weapon-mastery',
      name: 'Maestria de Arma do Guerreiro',
      originalName: 'Fighter Weapon Mastery',
      level: 5,
      description:
        'Escolha um grupo de armas. Sua proficiência sobe para mestre com armas simples, marciais e ataques desarmados desse grupo, e para especialista com armas avançadas desse grupo. Você ganha acesso aos efeitos de especialização crítica das armas/ataques em que for mestre.',
    },
    {
      id: 'fighter-battlefield-surveyor',
      name: 'Observador de Campo',
      originalName: 'Battlefield Surveyor',
      level: 7,
      description:
        'Sua proficiência em Percepção sobe para mestre. Além disso, +2 de bônus de circunstância a testes de Percepção para iniciativa.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'fighter-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        'Você causa +2 de dano com armas e ataques desarmados em que for especialista. O dano sobe para +3 se for mestre, e +4 se for lendário.',
    },
    {
      id: 'fighter-battle-hardened',
      name: 'Endurecido em Batalha',
      originalName: 'Battle Hardened',
      level: 9,
      description:
        'Sua proficiência em Fortitude sobe para mestre. Em sucesso em salvaguarda de Fortitude, vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'fighter-combat-flexibility',
      name: 'Flexibilidade de Combate',
      originalName: 'Combat Flexibility',
      level: 9,
      description:
        'Nas preparações diárias, você ganha um feito de guerreiro de 8º nível ou menor cujos pré-requisitos você atenda e que ainda não tenha. Pode usá-lo até as próximas preparações.',
    },
    {
      id: 'fighter-armor-expertise',
      name: 'Expertise em Armadura',
      originalName: 'Armor Expertise',
      level: 11,
      description:
        'Suas proficiências em armadura leve, média, pesada e defesa sem armadura sobem para especialista. Você ganha os efeitos de especialização de armadura média e pesada.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'heavy', 'unarmored', 'allArmor'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'fighter-expertise',
      name: 'Expertise de Guerreiro',
      originalName: 'Fighter Expertise',
      level: 11,
      description:
        'Sua proficiência na CD de classe de guerreiro sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'fighter-weapon-legend',
      name: 'Lenda das Armas',
      originalName: 'Weapon Legend',
      level: 13,
      description:
        'Proficiência em armas simples, marciais e desarmadas sobe para mestre; avançadas para especialista. Você pode escolher um grupo de armas e subir para lendário (simples/marciais/desarmadas desse grupo) e mestre (avançadas desse grupo).',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'master',
        },
        { kind: 'attackRank', categories: ['advanced'], rank: 'expert' },
      ],
    },
    {
      id: 'fighter-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'O dano de especialização em arma sobe para +4 (especialista), +6 (mestre) e +8 (lendário).',
    },
    {
      id: 'fighter-improved-flexibility',
      name: 'Flexibilidade Aprimorada',
      originalName: 'Improved Flexibility',
      level: 15,
      description:
        'Com Flexibilidade de Combate, você ganha dois feitos de guerreiro. O primeiro ainda é de 8º ou menor; o segundo pode ser até 14º, e o primeiro pode cumprir pré-requisitos do segundo.',
    },
    {
      id: 'fighter-tempered-reflexes',
      name: 'Reflexos Temperados',
      originalName: 'Tempered Reflexes',
      level: 15,
      description:
        'Sua proficiência em Reflexos sobe para mestre. Em sucesso em salvaguarda de Reflexos, vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'fighter-armor-mastery',
      name: 'Maestria em Armadura',
      originalName: 'Armor Mastery',
      level: 17,
      description:
        'Proficiências em armadura leve, média, pesada e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'heavy', 'unarmored', 'allArmor'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'fighter-versatile-legend',
      name: 'Lenda Versátil',
      originalName: 'Versatile Legend',
      level: 19,
      description:
        'Proficiências em armas simples, marciais e desarmadas sobem para lendário; avançadas para mestre. CD de classe de guerreiro sobe para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'legendary',
        },
        { kind: 'attackRank', categories: ['advanced'], rank: 'master' },
        { kind: 'classDcRank', rank: 'master' },
      ],
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=35',
}

/** Ladino — Player Core (Remaster), AoN Classes ID 37 */
export const rogueClass: CharacterClass = {
  id: CLASS_ROGUE_ID,
  name: 'Ladino',
  originalName: 'Rogue',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 164,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['dexterity'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'trained',
    reflex: 'expert',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'rogue-stealth', rank: 'trained', skillId: 'stealth' }],
    additionalBase: 7,
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
  subclass: {
    id: 'rogue-racket',
    label: 'Especialização (Racket)',
    description:
      'Você começa a desenvolver suas técnicas e abordagem a um trabalho, enquanto constrói reputação nos círculos de ladinos.',
    required: true,
    options: [
      {
        id: 'racket-thief',
        name: 'Ladrão',
        originalName: 'Thief',
        description:
          'Nada supera a emoção de pegar algo que pertence a outra pessoa — sobretudo sem ser notado. Você pode ser batedor de carteira, ladrão de residência ou consultor testando cofres.',
        rulesSummary:
          'Com arma corpo a corpo de fineza (ou ataque desarmado de fineza), pode somar DES ao dano em vez de FOR. Treinado em Ladroagem. Atributo-chave: Destreza.',
        skillGrants: [
          { id: 'thief-thievery', rank: 'trained', skillId: 'thievery' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 167,
      },
      {
        id: 'racket-scoundrel',
        name: 'Safado',
        originalName: 'Scoundrel',
        description:
          'Você usa conversa rápida, bajulação e língua de prata para evitar perigo e sair de situações apertadas. Pode ser golpista — ou usar as mesmas artes como advogado ou diplomata.',
        rulesSummary:
          'Em Finta bem-sucedida, o alvo fica desprevenido contra seus ataques corpo a corpo até o fim do seu próximo turno (crítico: contra todos os corpo a corpo). Se fintar com arma ágil/fineza, pode Dar um Passo como ação livre. Treinado em Enganação e Diplomacia. Pode escolher Carisma como atributo-chave.',
        extraKeyAttributes: ['charisma'],
        skillGrants: [
          { id: 'scoundrel-deception', rank: 'trained', skillId: 'deception' },
          { id: 'scoundrel-diplomacy', rank: 'trained', skillId: 'diplomacy' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 166,
      },
      {
        id: 'racket-ruffian',
        name: 'Rufião',
        originalName: 'Ruffian',
        description:
          'Você prefere a abordagem direta: intimidação e força bruta. Pode ser capanga do crime organizado, bandido de estrada ou nobre que ameaça com o poder da família.',
        rulesSummary:
          'Pode causar ataque furtivo com qualquer arma (limites de dado). Críticos contra desprevenido aplicam especialização crítica. Treinado em Intimidação e armadura média. Pode escolher Força como atributo-chave. Expertise/maestria de armadura leve também sobem a média.',
        extraKeyAttributes: ['strength'],
        skillGrants: [
          {
            id: 'ruffian-intimidation',
            rank: 'trained',
            skillId: 'intimidation',
          },
        ],
        defenseGrants: [
          { category: 'medium', rank: 'trained', label: 'Armadura média' },
        ],
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 166,
      },
      {
        id: 'racket-mastermind',
        name: 'Cérebro',
        originalName: 'Mastermind',
        description:
          'Você confia no intelecto para tramar esquemas complexos — dez passos à frente onde outros planejam três. Detetive, mestre-espião ou aspirante a chefão do crime.',
        rulesSummary:
          'Se identificar uma criatura com Recordar Conhecimento, ela fica desprevenida contra seus ataques até o início do seu próximo turno (crítico: 1 minuto). Treinado em Sociedade e uma entre Arcanismo, Natureza, Ocultismo ou Religião. Pode escolher Inteligência como atributo-chave.',
        extraKeyAttributes: ['intelligence'],
        skillGrants: [
          { id: 'mastermind-society', rank: 'trained', skillId: 'society' },
        ],
        skillChoiceOptions: ['arcana', 'nature', 'occultism', 'religion'],
        skillChoiceLabel: 'Perícia de conhecimento do Cérebro',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 166,
      },
      {
        id: 'racket-avenger',
        name: 'Vingador',
        originalName: 'Avenger',
        description:
          'Arquétipo de classe: treinado longe dos olhos, você usa furtividade, intimidação e lâminas para proteger a igreja. Escolha uma divindade. Pegue Dedicação de Vingador no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação de Vingador no 2º. Sem Ataque Surpresa; ganha Caçar Presa. Perícias: Intimidação, Religião, Furtividade, perícia divina da divindade (você escolhe) e 3+INT. Treinado na arma predileta; ataque sorrateiro com ela; especialização crítica se crítico contra desprevenido. Armadura média (sobe com perícia/maestria em leve). Pode usar Força como atributo-chave. Você nomeia a divindade e os votos; o motor não escolhe.',
        extraKeyAttributes: ['strength'],
        additionalSkillBaseOverride: 3,
        skillGrants: [
          { id: 'avenger-intimidation', rank: 'trained', skillId: 'intimidation' },
          { id: 'avenger-religion', rank: 'trained', skillId: 'religion' },
        ],
        defenseGrants: [
          { category: 'medium', rank: 'trained', label: 'Armadura média' },
        ],
        sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
        sourcePage: 58,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Debilitação',
      originalName: 'Debilitation',
      description:
        'Debilitações aplicam condições e outros efeitos negativos. Quando a criatura é afetada por uma nova debilitação, qualquer anterior termina.',
    },
    {
      name: 'Apogeu',
      originalName: 'Flourish',
      description:
        'Ações com este traço exigem esforço demais para uso frequente. Você só pode usar 1 ação flourish por turno.',
    },
    {
      name: 'Postura',
      originalName: 'Stance',
      description:
        'Estratégia de combate assumida com ação de stance. Dura até inconsciente, violar requisitos, fim do encontro ou nova posture. Após uma stance, não pode usar outra por 1 rodada. Só em encontro.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Ataque Furtivo',
      originalName: 'Sneak Attack',
      body: 'Dado(s) de precisão extras quando o alvo está desprevenido (ou outras condições do seu racket). Escala com o nível. É o motor de dano do ladino — posicione, flanqueie ou use Ataque Surpresa.',
    },
    {
      title: 'Especialização (Racket)',
      originalName: "Rogue's Racket",
      body: 'No 1º nível você escolhe um racket (Rufião, Ladrão, Escapista, Cérebro…). Ele muda atributo-chave extra, perícias e às vezes como você deixa o inimigo vulnerável. É a identidade do personagem.',
    },
    {
      title: 'Feitos de perícia todo nível',
      body: 'Diferente das outras classes, o ladino ganha feito de perícia em todo nível. Você é o “canivete suíço” do grupo — armadilhas, social, exploração e combate oportunista.',
    },
    {
      title: 'Debilitações',
      originalName: 'Debilitations',
      body: 'Feitos altos aplicam condições (lento, atordoado, etc.). Só uma debilitação sua por vez no mesmo alvo — a nova substitui a anterior.',
    },
  ],
  lore: {
    summary:
      'Você é habilidoso e oportunista. Com esperteza e reações rápidas, aproveita os erros dos oponentes e golpeia onde dói mais. Joga um jogo perigoso, buscando emoção e testando suas habilidades — e provavelmente não se importa muito com leis que atrapalhem. Cada caminho de ladino é único, mas todos compartilham a amplitude e a profundidade das perícias.',
    duringCombat:
      'Você se move furtivamente para pegar inimigos desprevenidos. É um instrumento de precisão — mais útil contra um chefão ou conjurador distante do que contra soldados comuns.',
    duringSocial:
      'Suas perícias dão várias ferramentas para influenciar a oposição. Golpes e obter informação são segunda natureza.',
    whileExploring:
      'Você se esgueira para surpreender inimigos e vasculhar perigos ou armadilhas. Desativa armadilhas, resolve enigmas e antecipa ameaças.',
    inDowntime:
      'Pode bater carteiras ou negociar bens ilegais. Também pode entrar numa guilda de ladrões — ou fundar a sua.',
    youMight: [
      'Aperfeiçoar suas habilidades com prática intensa, sozinho e no mundo.',
      'Saber onde conseguir bens ilícitos.',
      'Contornar ou quebrar a lei porque a considera sem sentido — ou ter o próprio código.',
    ],
    othersProbably: [
      'Acham você charmoso ou fascinante, mesmo achando que sabem melhor do que confiar em você.',
      'Vêm até você quando precisam de alguém disposto a arriscar ou usar métodos questionáveis.',
      'Suspeitam que você é motivado principalmente pela ganância.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Especialização (Racket)',
        'Ataque Furtivo 1d6',
        'Ataque Surpresa',
        'Feito de ladino',
        'Feito de perícia',
      ],
    },
    {
      level: 2,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 3,
      features: [
        'Negar Vantagem',
        'Feito geral',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 4,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Feito de perícia',
        'Aumento de perícia',
        'Ataque Furtivo 2d6',
        'Truques de Arma',
      ],
    },
    {
      level: 6,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 7,
      features: [
        'Reflexos Evasivos',
        'Feito geral',
        'Feito de perícia',
        'Aumento de perícia',
        'Maestria em Percepção',
        'Especialização em Arma',
      ],
    },
    {
      level: 8,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Golpe Debilitante',
        'Resiliência de Ladino',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: [
        'Aumentos de atributo',
        'Feito de ladino',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 11,
      features: [
        'Feito geral',
        'Expertise de Ladino',
        'Feito de perícia',
        'Aumento de perícia',
        'Ataque Furtivo 3d6',
      ],
    },
    {
      level: 12,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Reflexos Maiores de Ladino',
        'Expertise em Armadura Leve',
        'Truques Mestres',
        'Percepção Lendária',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 14,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Debilitação Dupla',
        'Feito geral',
        'Especialização Maior em Arma',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 16,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Feito de perícia',
        'Aumento de perícia',
        'Mente Ágil',
        'Ataque Furtivo 4d6',
      ],
    },
    {
      level: 18,
      features: ['Feito de ladino', 'Feito de perícia', 'Aumento de perícia'],
    },
    {
      level: 19,
      features: [
        'Feito geral',
        'Maestria em Armadura Leve',
        'Golpe Mestre',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: [
        'Aumentos de atributo',
        'Feito de ladino',
        'Feito de perícia',
        'Aumento de perícia',
      ],
    },
  ],
  extraTables: [
    {
      id: 'rogue-sneak-attack',
      title: 'Ataque Furtivo',
      subtitle: 'Player Core',
      caption:
        'Dano de precisão extra se o alvo estiver desprevenido, com arma corpo a corpo ágil ou de fineza, ataque desarmado ágil/fineza, ou ataque à distância (arremesso também precisa ser ágil/fineza).',
      columns: [
        { key: 'levels', label: 'Níveis', align: 'center' },
        { key: 'dice', label: 'Dano extra', align: 'center' },
      ],
      rows: [
        { key: 'sa-1', level: 1, cells: ['1–4', '1d6'] },
        { key: 'sa-5', level: 5, cells: ['5–10', '2d6'] },
        { key: 'sa-11', level: 11, cells: ['11–16', '3d6'] },
        { key: 'sa-17', level: 17, cells: ['17–20', '4d6'] },
      ],
    },
  ],
  features: [
    {
      id: 'rogue-sneak-attack',
      name: 'Ataque Furtivo',
      originalName: 'Sneak Attack',
      level: 1,
      description:
        'Se você Golpear uma criatura desprevenida com arma corpo a corpo ágil ou de fineza, ataque desarmado ágil/fineza, ataque à distância ou ataque desarmado à distância, causa +1d6 de dano de precisão. Em ataque à distância com arma corpo a corpo arremessada, ela também precisa ser ágil ou de fineza. O número de dados sobe no 5º, 11º e 17º níveis.',
    },
    {
      id: 'rogue-surprise-attack',
      name: 'Ataque Surpresa',
      originalName: 'Surprise Attack',
      level: 1,
      description:
        'Na primeira rodada de combate, se você rolar Enganação ou Furtividade para iniciativa, criaturas que ainda não agiram ficam desprevenidas contra você.',
    },
    {
      id: 'rogue-feat-1',
      name: 'Feito de Ladino',
      originalName: 'Rogue Feat',
      level: 1,
      description:
        'No 1º nível e em cada nível par, você ganha um feito de classe de ladino.',
    },
    {
      id: 'rogue-deny-advantage',
      name: 'Negar Vantagem',
      originalName: 'Deny Advantage',
      level: 3,
      description:
        'Você não fica desprevenido contra criaturas ocultas, não detectadas ou flanqueando do seu nível ou menor, nem contra ataque surpresa dessas criaturas. Elas ainda podem ajudar aliados a flanquear.',
    },
    {
      id: 'rogue-weapon-tricks',
      name: 'Truques de Arma',
      originalName: 'Weapon Tricks',
      level: 5,
      description:
        'Você se torna especialista em armas simples, marciais e ataques desarmados. Em crítico contra criatura desprevenida com arma ágil/fineza ou ataque desarmado ágil/fineza, aplica o efeito de especialização crítica.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'rogue-evasive-reflexes',
      name: 'Reflexos Evasivos',
      originalName: 'Evasive Reflexes',
      level: 7,
      description:
        'Sua proficiência em Reflexos sobe para mestre. Em sucesso em salvaguarda de Reflexos, vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'rogue-perception-mastery',
      name: 'Maestria em Percepção',
      originalName: 'Perception Mastery',
      level: 7,
      description: 'Sua proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'rogue-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        'Você causa +2 de dano com armas e ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'rogue-debilitating-strike',
      name: 'Golpe Debilitante',
      originalName: 'Debilitating Strike',
      level: 9,
      actionType: 'free',
      trigger:
        'Seu Golpe acerta uma criatura desprevenida e causa dano.',
      description:
        'Aplique uma debilitação até o fim do seu próximo turno: penalidade de status de −3 m às Velocidades, ou enfraquecido 1.',
    },
    {
      id: 'rogue-resilience',
      name: 'Resiliência de Ladino',
      originalName: 'Rogue Resilience',
      level: 9,
      description:
        'Sua proficiência em Fortitude sobe para especialista. Em sucesso em Fortitude, vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'rogue-expertise',
      name: 'Expertise de Ladino',
      originalName: 'Rogue Expertise',
      level: 11,
      description:
        'Sua proficiência na CD de classe de ladino sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'rogue-greater-reflexes',
      name: 'Reflexos Maiores de Ladino',
      originalName: 'Greater Rogue Reflexes',
      level: 13,
      description:
        'Proficiência em Reflexos sobe para lendário. Falha crítica em Reflexos vira falha; falha contra efeito que causa dano resulta em metade do dano.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'legendary' }],
    },
    {
      id: 'rogue-perception-legend',
      name: 'Percepção Lendária',
      originalName: 'Perception Legend',
      level: 13,
      description: 'Sua proficiência em Percepção sobe para lendário.',
      effects: [{ kind: 'perceptionRank', rank: 'legendary' }],
    },
    {
      id: 'rogue-light-armor-expertise',
      name: 'Expertise em Armadura Leve',
      originalName: 'Light Armor Expertise',
      level: 13,
      description:
        'Proficiências em armadura leve e defesa sem armadura sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'rogue-master-tricks',
      name: 'Truques Mestres',
      originalName: 'Master Tricks',
      level: 13,
      description:
        'Proficiências em armas simples, marciais e ataques desarmados sobem para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'rogue-double-debilitation',
      name: 'Debilitação Dupla',
      originalName: 'Double Debilitation',
      level: 15,
      description:
        'Ao usar Golpe Debilitante, pode aplicar duas debilitações ao mesmo tempo; remover uma remove ambas.',
    },
    {
      id: 'rogue-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização sobe para +4 (especialista), +6 (mestre) e +8 (lendário).',
    },
    {
      id: 'rogue-agile-mind',
      name: 'Mente Ágil',
      originalName: 'Agile Mind',
      level: 17,
      description:
        'Proficiência em Vontade sobe para mestre. Em sucesso em Vontade, vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'rogue-light-armor-mastery',
      name: 'Maestria em Armadura Leve',
      originalName: 'Light Armor Mastery',
      level: 19,
      description:
        'Proficiências em armadura leve e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'rogue-master-strike',
      name: 'Golpe Mestre',
      originalName: 'Master Strike',
      level: 19,
      actionType: 'free',
      description:
        'CD de classe sobe para mestre. O alvo faz salvaguarda de Fortitude contra sua CD de classe e fica temporariamente imune ao seu Golpe Mestre por 1 dia. Sucesso crítico: nada. Sucesso: enfraquecido 2 até o fim do seu próximo turno. Falha: paralisado 4 rodadas. Falha crítica: paralisado 4 rodadas, inconsciente 2 horas, ou morto (sua escolha).',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=37',
}

export const officialClasses: CharacterClass[] = [
  fighterClass,
  rogueClass,
  barbarianClass,
  wizardClass,
  clericClass,
  bardClass,
  witchClass,
  rangerClass,
  druidClass,
  championClass,
  magusClass,
  monkClass,
  sorcererClass,
  alchemistClass,
  oracleClass,
  summonerClass,
  psychicClass,
  thaumaturgeClass,
  swashbucklerClass,
  investigatorClass,
  kineticistClass,
  gunslingerClass,
  inventorClass,
  commanderClass,
  guardianClass,
  animistClass,
  exemplarClass,
  necromancerClass,
  runesmithClass,
].map(attachGrantedSpells)
