import type { CharacterClass } from '@/types/class'
import { SOURCE_PLAYER_CORE_2_ID } from './sources'
import { championSpellcasting } from './championSpellcasting'
import { CLASS_CHAMPION_ID } from './ids'

export { CLASS_CHAMPION_ID }

/** Campeão — Player Core 2 (Remaster), AoN Classes ID 58 */
export const championClass: CharacterClass = {
  id: CLASS_CHAMPION_ID,
  name: 'Campeão',
  originalName: 'Champion',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_2_ID,
  sourcePage: 86,
  hitPointsPerLevel: 10,
  keyAttributeOptions: ['strength', 'dexterity'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'champion-religion', rank: 'trained', skillId: 'religion' }],
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
  spellcasting: championSpellcasting,
  subclass: {
    id: 'champion-cause',
    label: 'Causa',
    description:
      'Você se dedica a uma causa no nome da sua divindade. A causa adiciona editos/anátemas e concede a reação de campeão (melhorada nos níveis 9 e 11). Algumas causas exigem santificação sagrada ou profana. Fonte: Player Core 2, pág. 91.',
    required: true,
    options: [
      {
        id: 'cause-grandeur',
        name: 'Grandeza',
        originalName: 'Grandeur',
        description:
          'Causa sagrada: a luz dos reinos celestiais inspira você a exortar virtudes e humilhar mundos sombrios.',
        rulesSummary:
          'Requer santificação sagrada. Editos: ser exemplo, apreciar/compartilhar beleza, manter-se asseado. Anátema: associar-se a demônios/forças profanas. Reação — Clarão de Grandeza: aliado danificado (ambos na aura) ganha resistência 2+nível ao dano; o atacante fica sob luz reveladora até o fim do seu próximo turno. 9º: dano espiritual persistente = Carisma; não recupera enquanto sob a luz. 11º: outros inimigos na aura também sofrem luz reveladora por 1 rodada.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 91,
      },
      {
        id: 'cause-justice',
        name: 'Justiça',
        originalName: 'Justice',
        description:
          'Em nome da divindade você busca justiça: segue a lei e pune quem a transgride.',
        rulesSummary:
          'Sem requisito de santificação. Editos: seguir a lei; respeitar autoridades legítimas. Anátema: tirar vantagem de outrem; trapacear. Reação — Golpe Retributivo: aliado danificado (ambos na aura) ganha resistência 2+nível; se o inimigo estiver no alcance, você faz um Golpe corpo a corpo. 9º: acerto causa dano espiritual persistente = Carisma. 11º: cada aliado na aura com o alvo no alcance corpo a corpo pode gastar reação para Golpear com −5.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 92,
      },
      {
        id: 'cause-liberation',
        name: 'Libertação',
        originalName: 'Liberation',
        description:
          'Você quer ver todos livres de cativeiro e proibições.',
        rulesSummary:
          'Sem requisito de santificação. Editos: opor-se a escravidão e tirania; lutar pela liberdade de escolha; respeitar decisões alheias. Anátema: forçar/ameaçar alguém a agir de certo modo; praticar escravidão ou tirania. Reação — Passo Libertador: gatilho dano, agarrar ou restringir em aliado (ambos na aura). Se for dano: resistência 2+nível. O aliado pode tentar livrar-se (nova salvaguarda ou Escapar como ação livre) e depois Passo como ação livre. 9º: se o inimigo estava agarrando/restringindo/imobilizando/paralisando, sofre dano espiritual persistente = Carisma. 11º: você e demais aliados na aura também podem Passar como ação livre.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 92,
      },
      {
        id: 'cause-obedience',
        name: 'Obediência',
        originalName: 'Obedience',
        description:
          'A sociedade tem ordem por uma razão — cada um deve ocupar seu lugar adequado.',
        rulesSummary:
          'Sem requisito de santificação. Editos: impor hierarquias corretas; derrubar hierarquias ilegítimas; liderar quando for o mais apto. Anátema: deixar alguém inferior a você exercer poder sobre você. Reação — Comando de Ferro: inimigo na aura que o danifica deve ajoelhar (caído) ou recusar e sofrer 1d6 mental (sobe com nível). Seus Golpes nele causam +1 dano espiritual até o fim do próximo turno (+2 no 9º, +3 no 16º). 9º: se recusar, dano espiritual persistente = Carisma. 11º: outros inimigos na aura também escolhem ajoelhar ou dano mental mínimo.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 93,
      },
      {
        id: 'cause-redemption',
        name: 'Redenção',
        originalName: 'Redemption',
        description:
          'Causa sagrada: anseia harmonia e tenta redimir quem outros matariam ou descartariam.',
        rulesSummary:
          'Requer santificação sagrada. Editos: tentar redimir quem pratica maldade; mostrar compaixão independentemente de estação. Anátema: matar inimigo senciente sem antes oferecer chance de redenção. Reação — Visão de Redenção: inimigo que danifica aliado (ambos na aura) escolhe arrepender-se (aliado não sofre o dano) ou recusar (aliado ganha resistência 2+nível; inimigo fica enfraquecido 2 até o fim do próximo turno). 9º: se recusar, dano espiritual persistente = Carisma. 11º: se recusar, você pode espalhar a resistência (reduzida em 2) a si e a todos os aliados na aura.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 93,
      },
      {
        id: 'cause-desecration',
        name: 'Desecração',
        originalName: 'Desecration',
        description:
          'Causa profana (incomum): você toma o que agrada, sem se importar com quem machuca, e espalha influência maligna.',
        rulesSummary:
          'Requer santificação profana (opção incomum — combine com o grupo). Editos: subverter/corromper o que for puro ou sagrado; semear dúvida em quem defende pureza/santidade. Reação — Escudo Egoísta: quando um inimigo na aura o danifica, você ganha resistência 2+metade do nível (qualquer tipo) e seus Golpes nele causam +1 dano espiritual até o fim do próximo turno (+2 no 9º, +3 no 16º). 9º: se Carisma ≥ +3, resistência = Carisma + metade do nível. 11º: cada inimigo na aura sofre −1 de status em ataques contra você até o início do seu próximo turno.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 91,
      },
      {
        id: 'cause-iniquity',
        name: 'Iniquidade',
        originalName: 'Iniquity',
        description:
          'Causa profana (incomum): desonroso, mentiroso e dedicado a quebrar falsas esperanças de bondade.',
        rulesSummary:
          'Requer santificação profana (opção incomum — combine com o grupo). Editos: destruir o que o ofende ou impede; tirar vantagem; trapacear; roubar. Anátema: prender-se a uma lei além do que a divindade exige. Reação — Vingança Destrutiva: ao ser danificado por inimigo na aura, você aumenta o dano recebido em 1d6 e causa 1d6 espiritual nele (sobe com nível); Golpes nele causam +2 espiritual até o fim do próximo turno (+4 no 9º, +6 no 16º). 9º: dano inicial também causa persistente espiritual = Carisma. 11º: outros inimigos na aura sofrem metade do dano da reação.',
        sourceId: SOURCE_PLAYER_CORE_2_ID,
        sourcePage: 91,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Exibição',
      originalName: 'Flourish',
      description:
        'Ações com o traço flourish exigem esforço demais para uso frequente. Você só pode usar 1 ação com o traço flourish por rodada.',
    },
    {
      name: 'Santificado',
      originalName: 'Sanctified',
      description:
        'Se você é sagrado ou profano, ações e magias santificadas ganham o mesmo traço.',
    },
    {
      name: 'Sagrado / Profano',
      originalName: 'Holy / Unholy',
      description:
        'Marcam o lado da luta espiritual. Santificação da divindade pode tornar você sagrado, profano ou nenhum. Causas sagradas/profanas exigem o traço correspondente. Profano é incomum e pode desestabilizar mesas típicas — combine com o grupo.',
    },
    {
      name: 'Aura de Campeão',
      originalName: "Champion's Aura",
      description:
        'Emanação de 4,5 m com traços aura e divina. Seguidores da sua divindade na aura sabem que você é campeão dela. Define o alcance da reação de campeão e de vários efeitos. Pode ser suprimida/retomada com 1 ação (concentrar); termina se você ficar inconsciente.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Divindade + santificação',
      originalName: 'Deity',
      body: 'Você serve uma divindade do catálogo (aba Divindade): editos, anátema, perícia divina treinada, arma deífica e santificação (sagrado / profano / nenhum). A santificação limita causas, magias de devoção e feitos. Fonte e santificação com mais de uma opção ficam pendentes até você escolher.',
    },
    {
      title: 'Causa = reação protetora',
      originalName: 'Cause',
      body: 'A escolha de 1º nível define sua reação de campeão (proteger aliado ou punir quem o ataca) e editos extras. No 9º a reação fica Relentless; no 11º, Exalted (beneficia o grupo ou castiga mais inimigos). É o “botão” de tanque do campeão.',
    },
    {
      title: 'Magias de devoção (foco)',
      originalName: 'Devotion Spells',
      body: 'Magias de foco divinas; atributo de conjuração = Carisma. No 1º escolha Escudos do Espírito ou a fonte da divindade (Imposição das Mãos se Curar, Toque do Vazio se Ferir). Reserva começa em 1 PF; Recarrega nas preparações ou com 10 min de Refocar em oração/serviço. Altura = metade do nível. Máximo da reserva = nº de magias de foco (até 3).',
    },
    {
      title: 'Arma deífica + Bloqueio',
      originalName: 'Deific Weapon / Shield Block',
      body: 'A arma favorita da divindade sobe 1 passo de dado se for simples ou desarmada d4; arma avançada conta como marcial; incomum libera acesso. Você também ganha Bloqueio com Escudo no 1º.',
    },
    {
      title: 'Bênção dos Devotos (3º)',
      originalName: 'Blessing of the Devoted',
      body: 'Escolha Armamento Abençoado (especialização crítica + runa de propriedade rotativa), Escudo Abençoado (runa de reforço que escala) ou Rapidez Abençoada (+1,5 m de deslocamento e bônus a aliados na aura contra reações).',
    },
    {
      title: 'Papel no grupo',
      body: 'Tanque divino de linha de frente: armadura completa, reação que salva aliados, Charisma para foco e presença. Feitos de classe no 1º e nos pares. Carisma alto melhora várias melhorias de reação.',
    },
  ],
  lore: {
    summary:
      'Emissário de uma divindade: assumiu um manto pesado e persegue uma causa que o distingue. Defesas poderosas compartilhadas com aliados e inocentes, e poder divino contra ameaças que seu deus se opõe.',
    duringCombat:
      'Confronta inimigos corpo a corpo e se posiciona para proteger aliados — a aura e a reação de campeão são o centro do combate.',
    duringSocial:
      'Voz de autoridade devota, com intenção firme de viver o que a divindade incentiva.',
    whileExploring:
      'Supera barreiras físicas e espirituais; inspira o grupo e, quando pedem, orienta com mão firme.',
    inDowntime:
      'Oração solene, treino rigoroso e cumprimento dos editos da causa — sem impedir um ofício ou hobby.',
    youMight: [
      'Acreditar que a retidão da sua causa vencerá, por piores que sejam as chances.',
      'Explicar como os ensinamentos da divindade se aplicam ao dia a dia.',
      'Ser um pouco superprotetor com os aliados.',
    ],
    othersProbably: [
      'Veem você como símbolo da divindade e projetam nela suas opiniões sobre ela.',
      'Temem que você os despreze por não viver no seu padrão, ou que não saiba ceder.',
      'Sabem que você jurou serviços divinos e pode ser confiado a cumpri-los.',
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
        'Causa',
        'Magias de devoção',
        'Feito de campeão',
        'Bloqueio com Escudo',
      ],
    },
    { level: 2, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Bênção dos Devotos', 'Feito geral', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Maestria com Armas',
      ],
    },
    { level: 6, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Maestria em Armadura',
        'Feito geral',
        'Aumento de perícia',
        'Especialização em Arma',
      ],
    },
    { level: 8, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Expertise de Campeão',
        'Expertise em Reflexos',
        'Reação Incansável',
        'Corpo Sagrado',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de campeão', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Vontade Divina',
        'Reação Exaltada',
        'Feito geral',
        'Percepção especialista',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Maestria em Armadura (mestre)',
        'Aumento de perícia',
        'Maestria em Arma',
      ],
    },
    { level: 14, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Especialização Maior em Arma',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Maestria de Campeão',
        'Armadura Lendária',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de campeão', 'Feito de perícia'] },
    {
      level: 19,
      features: ['Feito geral', 'Desafio do Herói', 'Aumento de perícia'],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de campeão', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'champion-deity',
      name: 'Divindade',
      originalName: 'Deity',
      level: 1,
      description:
        'Escolha uma divindade. Ganha a perícia divina dela, anátema/editos, santificação, arma deífica e aura de campeão (emanção de 4,5 m).',
    },
    {
      id: 'champion-cause',
      name: 'Causa',
      originalName: 'Cause',
      level: 1,
      description:
        'Escolha uma causa. Ganha editos/anátemas adicionais e a reação de campeão da causa.',
    },
    {
      id: 'champion-devotion-spells',
      name: 'Magias de Devoção',
      originalName: 'Devotion Spells',
      level: 1,
      description:
        'Magias de foco divinas (Carisma). Escolha Escudos do Espírito ou a magia da fonte divina (Imposição das Mãos / Toque do Vazio). Reserva de 1 PF.',
    },
    {
      id: 'champion-shield-block',
      name: 'Bloqueio com Escudo',
      originalName: 'Shield Block',
      level: 1,
      description: 'Você ganha o feito geral Bloqueio com Escudo.',
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
      id: 'champion-blessing',
      name: 'Bênção dos Devotos',
      originalName: 'Blessing of the Devoted',
      level: 3,
      description:
        'Escolha Armamento Abençoado, Escudo Abençoado ou Rapidez Abençoada (ou outra bênção a que tenha acesso).',
      effects: [
        {
          kind: 'featureChoice',
          choiceId: 'blessing-of-the-devoted',
          hint: 'Armamento, escudo ou rapidez — o motor não escolhe.',
          options: [
            {
              id: 'blessed-armament',
              name: 'Armamento Abençoado',
              originalName: 'Blessed Armament',
              description:
                'Escolha uma arma ou envoltórios de golpes poderosos. Você ganha o efeito de especialização crítica dessa arma e concede uma runa de propriedade à escolha: aterradora, toque espectral, retornante, mutável ou vitalizante. Nas preparações diárias, pode mudar a arma, a runa, ou ambas.',
            },
            {
              id: 'blessed-shield',
              name: 'Escudo Abençoado',
              originalName: 'Blessed Shield',
              description:
                'Nas suas mãos, um escudo ganha a runa de reforço menor. Conforme o nível, recebe a runa de reforço do seu nível (menor no 7º, moderada no 10º, maior no 13º, máxima no 16º e suprema no 19º). Se o escudo já tiver a runa adequada (ou for um Escudo Resistente do mesmo nível), a Dureza aumenta em 1.',
            },
            {
              id: 'blessed-swiftness',
              name: 'Rapidez Abençoada',
              originalName: 'Blessed Swiftness',
              description:
                '+1,5 m de bônus de status à Velocidade (se montado, o bônus vai para a montaria). Quando o movimento de um aliado na sua aura de campeão dispara a reação de um inimigo, o aliado ganha +2 de status em todas as defesas contra essa reação.',
              speedBonus: 5,
            },
          ],
        },
      ],
    },
    {
      id: 'champion-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 5,
      description:
        'Armas simples, marciais e ataques desarmados sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'champion-armor-expertise',
      name: 'Maestria em Armadura',
      originalName: 'Armor Expertise',
      level: 7,
      description:
        'Todas as armaduras e defesa sem armadura sobem para especialista. Ganha especialização de armadura média e pesada.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['allArmor', 'unarmored', 'light', 'medium', 'heavy'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'champion-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'champion-expertise',
      name: 'Expertise de Campeão',
      originalName: 'Champion Expertise',
      level: 9,
      description:
        'CD de classe, ataque de magia e CD de magia sobem para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'champion-reflex-expertise',
      name: 'Expertise em Reflexos',
      originalName: 'Reflex Expertise',
      level: 9,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'champion-relentless-reaction',
      name: 'Reação Incansável',
      originalName: 'Relentless Reaction',
      level: 9,
      description:
        'Sua reação de campeão melhora conforme a causa (geralmente punição espiritual). Dano da reação ganha seu traço sagrado/profano, se houver.',
    },
    {
      id: 'champion-sacred-body',
      name: 'Corpo Sagrado',
      originalName: 'Sacred Body',
      level: 9,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'champion-divine-will',
      name: 'Vontade Divina',
      originalName: 'Divine Will',
      level: 11,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'champion-exalted-reaction',
      name: 'Reação Exaltada',
      originalName: 'Exalted Reaction',
      level: 11,
      description:
        'Ao usar a reação de campeão, também aplica o benefício exaltado da causa (aliados ou inimigos na aura).',
    },
    {
      id: 'champion-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 11,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'champion-armor-mastery',
      name: 'Maestria em Armadura',
      originalName: 'Armor Mastery',
      level: 13,
      description:
        'Todas as armaduras e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['allArmor', 'unarmored', 'light', 'medium', 'heavy'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'champion-weapon-mastery',
      name: 'Maestria em Arma',
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
      id: 'champion-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização sobe para +4 (especialista), +6 (mestre) ou +8 (lendário).',
    },
    {
      id: 'champion-mastery',
      name: 'Maestria de Campeão',
      originalName: 'Champion Mastery',
      level: 17,
      description:
        'CD de classe, ataque de magia e CD de magia sobem para mestre.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'champion-legendary-armor',
      name: 'Armadura Lendária',
      originalName: 'Legendary Armor',
      level: 17,
      description:
        'Todas as armaduras e defesa sem armadura sobem para lendário.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['allArmor', 'unarmored', 'light', 'medium', 'heavy'],
          rank: 'legendary',
        },
      ],
    },
    {
      id: 'champion-heros-defiance',
      name: 'Desafio do Herói',
      originalName: "Hero's Defiance",
      level: 19,
      description:
        'Você ganha a magia de devoção Desafio do Herói — continua lutando enquanto tiver energia divina.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=58',
}
