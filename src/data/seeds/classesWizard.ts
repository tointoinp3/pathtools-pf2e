import type { CharacterClass } from '@/types/class'
import { SOURCE_BATTLECRY_ID, SOURCE_PLAYER_CORE_ID, SOURCE_RIVAL_ACADEMIES_ID } from './sources'
import { wizardSpellcasting } from './wizardSpellcasting'
import { CLASS_WIZARD_ID } from './ids'

export { CLASS_WIZARD_ID }

const WIZARD_CLASS_FEAT_LEVELS = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/** Mago Remaster — escola + tese no 1º nível; feitos de classe a partir do 2 */
export const wizardClass: CharacterClass = {
  id: CLASS_WIZARD_ID,
  name: 'Mago',
  originalName: 'Wizard',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 192,
  hitPointsPerLevel: 6,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'trained',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'wizard-arcana', rank: 'trained', skillId: 'arcana' }],
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
  classFeatLevels: WIZARD_CLASS_FEAT_LEVELS,
  spellcasting: wizardSpellcasting,
  subclass: {
    id: 'wizard-arcane-school',
    label: 'Escola Arcana',
    description:
      'Sua formação define o currículo: magias extras no grimório, espaços bônus só para o currículo e magias de foco da escola. Fonte: Player Core, pág. 198.',
    required: true,
    options: [
      {
        id: 'school-ars-grammatica',
        name: 'Escola de Ars Grammatica',
        originalName: 'School of Ars Grammatica',
        description:
          'Runas, números e palavras — a estrutura por trás de toda magia. Você compele, protege oficinas e desmonta feitiços alheios.',
        rulesSummary:
          'Currículo: mensagem, sigilo; comando, magia disfarçada, corpo rúnico, arma rúnica; dissipar magia… Foco inicial: Guardas Protetoras. Foco avançado (feito): Runa de Observação. Espaço bônus por posto + truque de currículo.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 198,
      },
      {
        id: 'school-battle-magic',
        name: 'Escola de Magia de Batalha',
        originalName: 'School of Battle Magic',
        description:
          'Magia como poder de guerra: destroçar tropas, contornar táticas e sobreviver ao campo.',
        rulesSummary:
          'Currículo: escudo, projétil telecinético; sopro de fogo, barragem de força, armadura mística; bola de fogo… Foco inicial: Dardo de Força. Avançado: Absorção de Energia.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 199,
      },
      {
        id: 'school-civic-wizardry',
        name: 'Escola de Magia Cívica',
        originalName: 'School of Civic Wizardry',
        description:
          'Arcana a serviço do cidadão comum: construir, achar o perdido, mover-se pela cidade — e também demolir quando preciso.',
        rulesSummary:
          'Currículo: prestidigitação, ler aura; empurrão hidráulico, escombros, invocar construto; criação, parede de pedra… Foco inicial: Obras de Terra. Avançado: Restauração Comunitária.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 199,
      },
      {
        id: 'school-boundary',
        name: 'Escola do Limiar',
        originalName: 'School of the Boundary',
        description:
          'Além do mundo físico: espíritos, dimensões e planos. Você invoca o que não deveria caminhar aqui.',
        rulesSummary:
          'Currículo: mão telecinética, distorção do vazio; tentáculos sombrios, lacaio fantasmal, invocar morto-vivo; teletransporte… Foco inicial: Fortificar Invocação. Avançado: Espiral de Horrores.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 199,
      },
      {
        id: 'school-mentalism',
        name: 'Escola de Mentalismo',
        originalName: 'School of Mentalism',
        description:
          'Mente contra mente: ilusões, sensações implantadas e confusão dos sentidos.',
        rulesSummary:
          'Currículo: atordoar, figmento; cores vertiginosas, sono, golpe certeiro; criatura ilusória… Foco inicial: Empurrão Encantador. Avançado: Manto de Invisibilidade.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 200,
      },
      {
        id: 'school-protean-form',
        name: 'Escola da Forma Proteica',
        originalName: 'School of Protean Form',
        description:
          'Matéria viva moldável: polimorfia, venenos e formas que trocam corpo por poder.',
        rulesSummary:
          'Currículo: garra dilacerante, vinha enredante; salto, forma de praga, picada de aranha; aumentar, forma humanoide… Foco inicial: Corpo Embaralhado. Avançado: Forma Mutável.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 200,
      },
      {
        id: 'school-unified-theory',
        name: 'Teoria Mágica Unificada',
        originalName: 'School of Unified Magical Theory',
        description:
          'Você rejeita um único currículo e estuda todas as escolas — mais flexível, menos especializado.',
        rulesSummary:
          'Sem currículo / sem espaços de currículo. Em troca: +1 feito de mago de 1º nível e +1 magia de 1º posto no grimório. Drenar Item Vinculado uma vez por dia por posto de magia que você possa lançar (não só 1×/dia). Foco inicial: Mão do Aprendiz. Avançado: Encantamento Interdisciplinar.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 200,
      },
      {
        id: 'school-thassilonian-rune-magic',
        name: 'Escola de Magia Rúnica Thassiloniana',
        originalName: 'School of Thassilonian Rune Magic',
        description:
          'Arquétipo de classe Runelord (raro): sete pecados, runas e poder antigo. Combine com a tese Runa Pessoal. Pegue Dedicação de Runelord no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º e tese Runa Pessoal. Treinado em hastes e lanças marciais (sobem com simples). Idioma tasseloniano. Você escolhe o pecado (Inveja, Gula, Ganância, Luxúria, Orgulho, Preguiça ou Ira). Magias de currículo/escola: só traçar runas (sem falar). Refoco: contemplar ou indulgir o pecado. Anátema dos pecados opostos. Feito Magia de Escola Avançada no 8º. O motor não escolhe o pecado.',
        attackGrants: [
          { category: 'martial', rank: 'trained', label: 'Hastes e lanças marciais' },
        ],
        sourceId: SOURCE_RIVAL_ACADEMIES_ID,
        sourcePage: 114,
      },
      {
        id: 'school-war-mage',
        name: 'Magia de Batalha (Mago de Guerra)',
        originalName: 'War Mage (Battle Magic)',
        description:
          'Arquétipo de classe: currículo de Magia de Batalha + treino de guerra. Combine com a tese Magia de Guerra. Pegue Dedicação de Mago de Guerra no 2º nível.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º e tese Magia de Guerra. Mesmo currículo da Escola de Magia de Batalha. Armadura leve e média; no 11º, perito em leve, média e sem armadura. Armas marciais contam como simples. Bloqueio com Escudo. Magia de Guerra: 1×/rodada no início do turno, ação livre para trocar uma magia memorizada por golpe certeiro. Sem vínculo arcano, sem teses clássicas, sem Túnicas Defensivas no 13º.',
        defenseGrants: [
          { category: 'light', rank: 'trained', label: 'Armadura leve' },
          { category: 'medium', rank: 'trained', label: 'Armadura média' },
        ],
        grantedFeat: {
          featName: 'Bloqueio com Escudo',
          originalName: 'Shield Block',
          featType: 'general',
          featId: 'feat-shield-block-general',
        },
        sourceId: SOURCE_BATTLECRY_ID,
        sourcePage: 68,
      },
    ],
  },
  secondarySubclass: {
    id: 'wizard-arcane-thesis',
    label: 'Tese Arcana',
    description:
      'Sua pesquisa de graduação — o “truque” único que define como você usa magia no dia a dia. Independente da escola. Fonte: Player Core, pág. 195.',
    required: true,
    options: [
      {
        id: 'thesis-experimental-spellshaping',
        name: 'Moldagem Experimental',
        originalName: 'Experimental Spellshaping',
        description:
          'Você trata moldagem de magia como laboratório vivo: parâmetros ajustáveis a cada conjuração.',
        rulesSummary:
          'Ganha 1 feito de mago de moldagem (spellshape) de 1º nível. A partir do 4º, nas preparações diárias, pode ganhar 1 feito de moldagem de mago cujo requisito de nível seja no máximo metade do seu nível (até a próxima preparação).',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 195,
      },
      {
        id: 'thesis-improved-familiar',
        name: 'Familiar Aprimorado',
        originalName: 'Improved Familiar Attunement',
        description:
          'O vínculo com o familiar substitui o item vinculado — mais habilidades, mesma “recarga” mágica.',
        rulesSummary:
          'Ganha o feito Familiar. Familiar com +1 habilidade (+1 em 6º, 12º e 18º). Vínculo arcano fica no familiar: use Drenar Familiar (igual a Drenar Item Vinculado, energia no familiar).',
        grantedFeat: {
          featId: 'feat-wizard-familiar',
          featName: 'Familiar',
          originalName: 'Familiar',
          featType: 'class',
        },
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 195,
      },
      {
        id: 'thesis-spell-blending',
        name: 'Fusão de Magias',
        originalName: 'Spell Blending',
        description:
          'Slots são energia bruta: você funde ou parte para moldar o arsenal do dia.',
        rulesSummary:
          'Nas preparações: troque 2 espaços do mesmo posto por 1 espaço bônus de até +2 postos (posto que você possa lançar; cada bônus de posto diferente). Ou troque 1 espaço por 2 truques extras (no máximo 1 espaço assim por dia).',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 195,
      },
      {
        id: 'thesis-spell-substitution',
        name: 'Substituição de Magia',
        originalName: 'Spell Substitution',
        description:
          'Preparar não precisa ser definitivo — você troca magias do grimório no campo.',
        rulesSummary:
          'Gaste 10 minutos para esvaziar 1 espaço preparado e preparar outra magia do grimório no lugar. Se interrompido, a magia original permanece. Pode tentar de novo depois.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 195,
      },
      {
        id: 'thesis-staff-nexus',
        name: 'Nexo do Cajado',
        originalName: 'Staff Nexus',
        description:
          'Você e o cajado crescem juntos: magia compartilhada, cargas e fusão com cajados mágicos.',
        rulesSummary:
          'Começa com cajado improvisado (mágico) com 1 truque + 1 magia de 1º do grimório. Nas preparações, gaste 1 magia para dar cargas = posto (somem em 24h). Empunhando: lança as magias do cajado (a de 1º consome 1 carga; o truque não). Se destruído, refaz em 1h (sem cargas). Pode fundir o improvisado a outro cajado nas preparações. 8º: gaste 2 magias ao carregar; 16º: até 3.',
        sourceId: SOURCE_PLAYER_CORE_ID,
        sourcePage: 195,
      },
      {
        id: 'thesis-personal-rune',
        name: 'Runa Pessoal',
        originalName: 'Personal Rune',
        description:
          'Arquétipo Runelord: no lugar da tese, sua runa pessoal no vínculo (haste ou lança). Combine com a Escola de Magia Rúnica Thassiloniana.',
        rulesSummary:
          'Sem tese clássica. Vínculo arcano deve ser haste ou lança; a runa pessoal aparece na arma. A arma funciona como cajado só você prepara, com as magias do pecado até o posto mais alto. Nas preparações, pode fundir outro cajado nela. Você escolhe haste/lança e o pecado; o motor não escolhe.',
        sourceId: SOURCE_RIVAL_ACADEMIES_ID,
        sourcePage: 114,
      },
      {
        id: 'thesis-war-mage',
        name: 'Magia de Guerra',
        originalName: 'War Magic',
        description:
          'Arquétipo Mago de Guerra: sem tese e sem vínculo arcano. Combine com Magia de Batalha (Mago de Guerra).',
        rulesSummary:
          'Sem tese clássica e sem vínculo arcano. Magia de Guerra no 1º: 1×/rodada no início do turno, ação livre para trocar uma magia memorizada por golpe certeiro no mesmo posto. Refoco: estudar planos de guerra, mapas e relatórios de um conflito ativo.',
        sourceId: SOURCE_BATTLECRY_ID,
        sourcePage: 68,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Moldar Magia',
      originalName: 'Spellshape',
      description:
        'Ações com o traço de moldagem alteram a próxima magia. Use a ação de moldagem imediatamente antes de Conjurar a Magia. Se fizer qualquer outra ação (incluindo livres e reações) no meio, perde o benefício. Efeitos extras da moldagem fazem parte da magia, não da ação de moldagem.',
    },
    {
      name: 'Preparar',
      originalName: 'Prepared spellcasting',
      description:
        'Você escolhe magias do grimório de manhã e as “carrega” em espaços. Depois de lançar, aquele preparo some até a próxima preparação diária (salvo teses/feitos que digam o contrário).',
    },
    {
      name: 'Currículo',
      originalName: 'Curriculum',
      description:
        'Lista da escola: magias que entram no grimório automaticamente e podem ocupar os espaços extras da escola. Teoria Unificada não tem currículo.',
    },
    {
      name: 'Magia de Foco',
      originalName: 'Focus spell',
      description:
        'Custa 1 Ponto de Foco (a reserva começa em 1; máximo = número de magias de foco, até 3). Recarrega nas preparações; Reconcentração (10 min estudando) recupera 1. Altura automática = metade do nível (arredondado para cima). Não usa espaços de magia.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Conjuração arcana (preparada)',
      originalName: 'Wizard Spellcasting',
      body: 'Você é conjurador da tradição arcana. Ataque de magia e CD usam Inteligência. No 1º nível: prepare até 2 magias de 1º posto e 5 truques do grimório — mais 1 truque de currículo e 1 magia de currículo por posto que puder lançar (se tiver escola com currículo). A tabela de espaços sobe a cada nível; no 19º ganha um espaço especial de 10º posto (Arte do Arquimago).',
    },
    {
      title: 'Escola + tese = duas escolhas',
      originalName: 'Arcane School & Thesis',
      body: 'No 1º nível escolha as duas. A escola define currículo, espaços extras e magia de foco. A tese muda o dia a dia (familiar, cajado, trocar espaços, trocar preparos ou colecionar moldagens). Elas não se excluem.',
    },
    {
      title: 'Vínculo arcano',
      originalName: 'Arcane Bond / Drain Bonded Item',
      body: 'Ao preparar, marque 1 item seu como vinculado (varinha, anel, cajado, arma…). 1×/dia (ou mais com Teoria Unificada): ação livre Drenar Item Vinculado — no turno atual pode relançar 1 magia que já preparou e já lançou hoje, sem gastar espaço. Ainda precisa Conjurar a Magia e cumprir requisitos. Com tese de Familiar, o vínculo vai para o familiar (Drenar Familiar).',
    },
    {
      title: 'Grimório e estudo',
      originalName: 'Spellbook',
      body: 'Suas magias “vivem” no grimório. Você só prepara o que está escrito lá (mais o que a escola adiciona ao currículo). Em intervalo: aprender magias, copiar, fabricar pergaminhos/itens e pesquisar fórmulas.',
    },
    {
      title: 'Feitos de mago',
      originalName: 'Wizard feats',
      body: 'Ao contrário do guerreiro, o mago não ganha feito de classe no 1º nível (exceto bônus da Teoria Unificada). Feitos de mago nos níveis pares a partir do 2. Feitos de perícia também nos pares a partir do 2.',
    },
    {
      title: 'Fraqueza e papel',
      body: 'Poucos PV (6+CON), sem armadura, armas só simples. Seu poder está em posicionamento, conhecimento e escolher a magia certa na hora certa — truques para limpar soldados, magias fortes para chefes e surpresas (invisibilidade, voo, etc.).',
    },
  ],
  lore: {
    summary:
      'Estudante eterno dos segredos do universo: você trata magia como ciência, cruzando tratados práticos com tomos antigos. A teoria é vasta demais para caber numa vida — por isso escola e tese definem o recorte que você domina.',
    duringCombat:
      'Fica fora da briga, julgando quando gastar espaços. Reserva o poder alto para incapacitantes; usa truques quando sobram só inimigos fracos. Responde a truques inimigos (invisibilidade, voo) com magias que nivelam o campo.',
    duringSocial:
      'É poço de conhecimento arcano e resolve discussões com lógica.',
    whileExploring:
      'Detecta auras, interpreta escritos e fenômenos arcanos. Diante de obstáculo estranho, provavelmente tem um pergaminho ou magia certa.',
    inDowntime:
      'Aprende magias, fabrica itens, copia pergaminhos, caça fórmulas e pode fundar escola ou guilda acadêmica.',
    youMight: [
      'Ter curiosidade intelectual insaciável — especialmente sobre magia.',
      'Ver problemas pela lente das magias e da escola que estudou.',
      'Usar jargão técnico preciso que os outros acham pedante.',
    ],
    othersProbably: [
      'Te consideram poderoso e potencialmente perigoso.',
      'Pedem que não conjure em salão fino — ninguém sabe se o feitiço é inocente.',
      'Acham que você resolve tudo com um passe de magia, do clima à colheita.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Conjuração de mago',
        'Tese arcana',
        'Escola arcana',
        'Vínculo arcano',
      ],
    },
    { level: 2, features: ['Feito de perícia', 'Feito de mago'] },
    {
      level: 3,
      features: ['Magias de 2º posto', 'Feito geral', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de perícia', 'Feito de mago'] },
    {
      level: 5,
      features: [
        'Magias de 3º posto',
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Reflexos especialista',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de perícia', 'Feito de mago'] },
    {
      level: 7,
      features: [
        'Magias de 4º posto',
        'Conjurador especialista',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de perícia', 'Feito de mago'] },
    {
      level: 9,
      features: [
        'Magias de 5º posto',
        'Feito de ancestralidade',
        'Fortitude mágica',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de mago'],
    },
    {
      level: 11,
      features: [
        'Magias de 6º posto',
        'Feito geral',
        'Percepção especialista',
        'Aumento de perícia',
        'Maestria com armas de mago',
      ],
    },
    { level: 12, features: ['Feito de perícia', 'Feito de mago'] },
    {
      level: 13,
      features: [
        'Magias de 7º posto',
        'Feito de ancestralidade',
        'Robes defensivas',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de perícia', 'Feito de mago'] },
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
    { level: 16, features: ['Feito de perícia', 'Feito de mago'] },
    {
      level: 17,
      features: [
        'Magias de 9º posto',
        'Feito de ancestralidade',
        'Vontade prodigiosa',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de perícia', 'Feito de mago'] },
    {
      level: 19,
      features: [
        'Arte do Arquimago',
        'Feito geral',
        'Conjurador lendário',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de mago'],
    },
  ],
  features: [
    {
      id: 'wizard-spellcasting',
      name: 'Conjuração de Mago',
      originalName: 'Wizard Spellcasting',
      level: 1,
      description:
        'Conjurador arcano preparado. Prepare magias do grimório conforme a tabela de espaços; ataque de magia e CD usam Inteligência. Escola com currículo dá truque e espaço extras por posto (só currículo).',
    },
    {
      id: 'wizard-arcane-thesis',
      name: 'Tese Arcana',
      originalName: 'Arcane Thesis',
      level: 1,
      description:
        'Escolha uma tese (Moldagem Experimental, Familiar Aprimorado, Fusão, Substituição ou Nexo do Cajado). Concede o benefício permanente descrito na opção.',
    },
    {
      id: 'wizard-arcane-school',
      name: 'Escola Arcana',
      originalName: 'Arcane School',
      level: 1,
      description:
        'Escolha uma escola do Player Core. Ganha currículo (exceto Teoria Unificada), espaços/truques extras, magia de foco inicial e acesso ao foco avançado via feito.',
    },
    {
      id: 'wizard-arcane-bond',
      name: 'Vínculo Arcano',
      originalName: 'Arcane Bond',
      level: 1,
      actionType: 'free',
      frequency: '1×/dia (ou 1×/posto com Teoria Unificada)',
      description:
        'Designe um item vinculado ao preparar. Drenar Item Vinculado: neste turno, relance 1 magia já preparada e já lançada hoje sem gastar espaço. Com Familiar Aprimorado, use o familiar.',
    },
    {
      id: 'wizard-reflex-expertise',
      name: 'Reflexos Especialista',
      originalName: 'Reflex Expertise',
      level: 5,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'wizard-expert-spellcaster',
      name: 'Conjurador Especialista',
      originalName: 'Expert Spellcaster',
      level: 7,
      description:
        'Ataque de magia e CD de magia sobem para especialista.',
    },
    {
      id: 'wizard-magical-fortitude',
      name: 'Fortitude Mágica',
      originalName: 'Magical Fortitude',
      level: 9,
      description: 'Proficiência em Fortitude sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'expert' }],
    },
    {
      id: 'wizard-perception-expertise',
      name: 'Percepção Especialista',
      originalName: 'Perception Expertise',
      level: 11,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'wizard-weapon-expertise',
      name: 'Maestria com Armas de Mago',
      originalName: 'Weapon Expertise',
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
      id: 'wizard-defensive-robes',
      name: 'Robes Defensivas',
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
      id: 'wizard-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas/ataques desarmados em que for especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'wizard-master-spellcaster',
      name: 'Conjurador Mestre',
      originalName: 'Master Spellcaster',
      level: 15,
      description: 'Ataque de magia e CD de magia sobem para mestre.',
    },
    {
      id: 'wizard-prodigious-will',
      name: 'Vontade Prodigiosa',
      originalName: 'Prodigious Will',
      level: 17,
      description:
        'Vontade sobe para mestre. Sucesso em salvaguarda de Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'wizard-archwizard-spellcraft',
      name: 'Arte do Arquimago',
      originalName: "Archwizard's Spellcraft",
      level: 19,
      description:
        'Ganha 1 espaço de 10º posto (regras especiais: não combina com efeitos que dão espaços extras ou lançam sem gastar espaço). O feito Poder do Arquimago pode dar um segundo.',
    },
    {
      id: 'wizard-legendary-spellcaster',
      name: 'Conjurador Lendário',
      originalName: 'Legendary Spellcaster',
      level: 19,
      description: 'Ataque de magia e CD de magia sobem para lendário.',
    },
  ],
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=39',
}
