import type { CharacterClass } from '@/types/class'
import { SOURCE_BATTLECRY_ID, SOURCE_DARK_ARCHIVES_ID } from './sources'
import { CLASS_THAUMATURGE_ID } from './ids'

export { CLASS_THAUMATURGE_ID }

/** Taumaturgo — Dark Archives (Remastered), AoN Classes ID 69 */
export const thaumaturgeClass: CharacterClass = {
  id: CLASS_THAUMATURGE_ID,
  name: 'Taumaturgo',
  originalName: 'Thaumaturge',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_DARK_ARCHIVES_ID,
  sourcePage: 31,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['charisma'],
  perceptionRank: 'expert',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [
      { id: 'thaumaturge-arcana', rank: 'trained', skillId: 'arcana' },
      { id: 'thaumaturge-nature', rank: 'trained', skillId: 'nature' },
      { id: 'thaumaturge-occultism', rank: 'trained', skillId: 'occultism' },
      { id: 'thaumaturge-religion', rank: 'trained', skillId: 'religion' },
    ],
    additionalBase: 3,
    additionalFromIntelligence: true,
  },
  attacks: [
    { category: 'simple', rank: 'trained', label: 'Armas simples' },
    { category: 'martial', rank: 'trained', label: 'Armas marciais' },
    { category: 'unarmed', rank: 'trained', label: 'Ataques desarmados' },
  ],
  defenses: [
    { category: 'light', rank: 'trained', label: 'Armadura leve' },
    { category: 'medium', rank: 'trained', label: 'Armadura média' },
    { category: 'unarmored', rank: 'trained', label: 'Defesa sem armadura' },
  ],
  classDcRank: 'trained',
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=69',
  subclass: {
    id: 'thaumaturge-implement',
    label: 'Primeiro implemento',
    description:
      'Objeto simbólico: crachá e ferramenta. No 1º você ganha o benefício inicial. No 5º e no 15º escolhe o 2º e o 3º (tipos diferentes) nesta aba. Troca o objeto do mesmo tipo com 1 dia de intervalo. Fonte: Dark Archives (Remastered), pág. 36. Escudo: Battlecry!, pág. 73.',
    required: true,
    options: [
      {
        id: 'implement-amulet',
        name: 'Amuleto',
        originalName: 'Amulet',
        description:
          'Sorte e proteção: diagrama, símbolo sagrado, pata de coelho, moeda da sorte.',
        rulesSummary:
          'Inicial — reação Suspensão do Amuleto: o alvo de Explorar Vulnerabilidade causaria dano em você ou aliado a 4,5 m; você ou o aliado ganha resistência a todo o dano do gatilho = 2 + nível. Adepto (7º): resistência 5 (10 no 15º) ao tipo escolhido até seu próximo turno. Intensificar (9º): +2 de status na CA e saves vs o alvo. Paragão (17º): Suspensão em você e aliados a 4,5 m.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 36,
      },
      {
        id: 'implement-bell',
        name: 'Sino',
        originalName: 'Bell',
        description:
          'Som e emoção: sino, tambor, címbalo — qualquer instrumento de uma mão.',
        rulesSummary:
          'Inicial — reação Toque do Sino (alvo de EV a 9 m Golpeia ou Conjura afetando você/aliado): Cacofonia (magia) Fortitude vs CD de classe ou estupefato 1 (2 na falha crítica). Adepto: condições duram 3 rodadas. Intensificar: Golpe no alvo dá −2 de status em saves vs o Toque (1 rodada; −3 no crítico). Paragão: valores 2 (3 na falha crítica); pode disparar em qualquer inimigo (dura até seu próximo turno).',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 37,
      },
      {
        id: 'implement-chalice',
        name: 'Cálice',
        originalName: 'Chalice',
        description:
          'Vaso que se enche: cura, nutrição, vida. Taça, cabaça ou até um crânio polido.',
        rulesSummary:
          'Inicial — Beber do Cálice (1×/rodada, empunhando): gole = PV temporários = nível (mín. 3) até o fim do seu próximo turno; esgotar = cura 3 × nível (depois só gole até 10 min sem beber). Adepto: após crítico perfurante/cortante ou sangramento persistente a 9 m, gole dá 2× nível de PV temp. e esgotar cura 5 × nível. Intensificar: +nível / +2× nível se o alvo de EV está a 9 m. Paragão: reduz condições e tenta contrapor veneno/doença/maldição.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 37,
      },
      {
        id: 'implement-lantern',
        name: 'Lanterna',
        originalName: 'Lantern',
        description:
          'Luz da revelação: lanterna, tocha ou papel — parte sombras e expõe a verdade.',
        rulesSummary:
          'Inicial: acender/apagar (ação livre, concentrar). Aura de luz 6 m (luz mágica, ignora cobertura); +1 de status em Percepção visual e Recordar Conhecimento vs criaturas na aura; o mestre rola Procurar secreto vs armadilhas/assombrações/segredos. Adepto: aura 9 m; invisíveis/etéreos visíveis como distorção (ainda ocultos). Intensificar: aura dobra; +2 vs o alvo de EV; alvo −2 Enganação/Furtividade e não fica oculto na aura. Paragão: aura 12 m; contrapõe ilusão/morfo/polimorfia para ver a forma verdadeira.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 38,
      },
      {
        id: 'implement-mirror',
        name: 'Espelho',
        originalName: 'Mirror',
        description:
          'Desvio, ilusão e prestidigitação. Sempre um espelho portátil de mão.',
        rulesSummary:
          'Inicial — Reflexo do Espelho: projeta uma versão a 4,5 m; você ocupa os dois espaços até o próximo turno (flanqueia, inclusive a si). Adepto: inimigo adjacente que te danifica — ação livre, o reflexo explode (corte 2 + metade do nível ou o dano do ataque, o menor) e o efeito acaba. Intensificar: oculto para o alvo de EV (não serve para Esconder-se). Paragão: um dos eus Interage, Procura ou Golpeia na hora.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 38,
      },
      {
        id: 'implement-regalia',
        name: 'Insígnia',
        originalName: 'Regalia',
        description:
          'Autoridade e laços sociais: cetro, orbe, estandarte heráldico.',
        rulesSummary:
          'Inicial: +1 de circunstância em Enganação, Diplomacia e Intimidação; aliados podem Seguir o Especialista mesmo se você for só treinado (+1). Aura 4,5 m: +1 de status em saves vs medo; no fim do turno reduz assustado dos aliados em 1. Adepto: bônus social +2 se mestre; aura vale vs efeitos mentais e +2/+3/+4 de status no dano (11º/17º). Intensificar: Golpe no alvo de EV dá +1 de circunstância no ataque de um aliado (+2 no crítico). Paragão: falha crítica social vira falha; aliados na aura não ficam desprevenidos por flanco se você não estiver.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 39,
      },
      {
        id: 'implement-tome',
        name: 'Tomo',
        originalName: 'Tome',
        description:
          'Saber perdido: livro gasto, tábuas, cordas com nós — qualquer forma de guardar conhecimento.',
        rulesSummary:
          'Inicial: +1 de circunstância em Recordar Conhecimento (segurando). Nas preparações: treinado em 2 perícias até a próxima (especialista em 1 no 3º; nas 2 no 5º; não serve de pré-requisito). Adepto: no início do turno, Recordar vs criatura observada; sucesso = +1 no próximo ataque contra ela; perícias temporárias sobem (mestre). Intensificar: role 1d20 e reserve — pode usar nesse ataque vs o alvo de EV (fortuna). Paragão: iniciativa com Conhecimento Esotérico +3; bônus de RK +2; perícias temporárias lendárias.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 40,
      },
      {
        id: 'implement-wand',
        name: 'Varinha',
        originalName: 'Wand',
        description:
          'Bastão curto: magia, direção e manipulação de energia. Escolha frio, eletricidade ou fogo.',
        rulesSummary:
          'Inicial — Arremessar Magia (alvo a 18 m): 3d4 do tipo escolhido, Reflexos básico vs CD de classe (+1d4 no 3º e a cada 2 níveis). Pode gastar energia extra (d6 em vez de d4); recarrega no fim do próximo turno. Adepto: 36 m; 2º tipo; falha: frio −3 m de deslocamento, eletricidade desprevenido, fogo 1d10 persistente. Intensificar: +nível de status no dano vs o alvo de EV. Paragão: 54 m; os 3 tipos; pode ser explosão de 6 m.',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 41,
      },
      {
        id: 'implement-weapon',
        name: 'Arma',
        originalName: 'Weapon',
        description:
          'Confronto direto. Só arma de uma mão — a outra fica livre para implementos e esotérica.',
        rulesSummary:
          'Inicial — reação Interrupção do Implemento: Golpe com a arma-implemento quando o alvo de EV age. No 5º: especialização crítica da arma. Adepto: falha (não crítica) na Interrupção ainda causa 1 de dano (aplica fraqueza). Intensificar: +2 de status nos ataques vs o alvo de EV. Paragão: acerto na Interrupção já interrompe (não precisa crítico).',
        sourceId: SOURCE_DARK_ARCHIVES_ID,
        sourcePage: 41,
      },
      {
        id: 'implement-shield',
        name: 'Escudo',
        originalName: 'Shield',
        description:
          'Símbolo universal de defesa. Só escudos de Bulk 1 ou menos, para gerir a esotérica.',
        rulesSummary:
          'Inicial: feito Bloqueio com Escudo. Se o escudo-implemento iria a 0 PV, fica em 1, o bônus de CA ao Erguer cai 1 e não Bloqueia até perder quebrado — ainda serve de implemento. No 5º: ao Explorar Vulnerabilidade pode Erguer o Escudo como ação livre. Adepto: escudo erguido dá bônus de status em saves vs magia = bônus de CA; Bloqueio dispara vs dano mágico. Intensificar: Golpe no alvo de EV restaura PV do escudo = metade do nível (ou +CAR de Dureza se cheio). Paragão: bônus e Bloqueio também para aliados a 4,5 m.',
        sourceId: SOURCE_BATTLECRY_ID,
        sourcePage: 73,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Esotérica',
      originalName: 'Esoterica',
      description:
        'Talismãs, relíquias e tralhas sobrenaturais que você carrega. Habilidades com este traço exigem estar de posse da esotérica. Em geral você sempre a tem; raro ficar sem (equipamento confiscado, etc.). Empunha implemento e esotérica na mesma mão.',
    },
    {
      name: 'Itens temporários',
      originalName: 'Temporary Items',
      description:
        'Vários feitos preparam itens que duram pouco, como os infundidos do alquimista. Se o feito não disser a duração, valem até a próxima preparação diária. Efeitos deles também acabam aí (salvo efeito permanente). Qualidade baixa: em geral não se vendem.',
    },
    {
      name: 'Implemento',
      originalName: 'Implement',
      description:
        'Objeto simbólico. Começa mundano e sem valor de venda. Troca por outro do mesmo tipo com 1 dia de intervalo. Até 3 tipos (1º, 5º, 15º). Benefícios: inicial → adepto (7º/11º) → intensificar (9º, todos) → paragon (17º, um). Trocar o empunhado: Interagir como ação livre imediatamente antes da ação do implemento que você está colocando na mão.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Explorar Vulnerabilidade',
      originalName: 'Exploit Vulnerability',
      body: '1 ação: teste de Conhecimento Esotérico vs CD padrão do nível do alvo. Até Explorar de novo: Golpes viram mágicos. Sucesso crítico: todas as fraquezas/resistências/imunidades. Sucesso: a maior fraqueza. Falha: só antítese pessoal. Falha crítica: desprevenido até o próximo turno. Fraqueza mortal: seus Golpes ativam a maior fraqueza daquele tipo de criatura. Antítese pessoal: o alvo ganha fraqueza 2 + metade do nível só contra os seus Golpes.',
    },
    {
      title: 'Conhecimento Esotérico usa Carisma',
      originalName: 'Esoteric Lore',
      body: 'Perícia especial (não é Ocultismo). Recordar Conhecimento sobre assombrações, maldições e criaturas de qualquer tipo — só isso. O modificador é Carisma. Feito Conhecimento Duvidoso de graça. Especialista no 3º, mestre no 7º, lendário no 15º. Anote nas notas da ficha.',
    },
    {
      title: 'Empoderamento do implemento',
      originalName: "Implement's Empowerment",
      body: '+2 de dano por dado da arma no Golpe, se você empunha pelo menos um implemento e nas mãos só há: uma arma de uma mão, outros implementos ou esotérica. Duas armas, escudo + arma de duas mãos, ou item extra = sem o bônus.',
    },
    {
      title: 'Três implementos, não magia',
      originalName: 'Implements',
      body: 'O 1º no nível 1 (escolha acima). 2º no 5º, 3º no 15º — tipos diferentes. Adepto no 7º (um) e 11º (o segundo). Intensificar Vulnerabilidade (9º) libera o benefício de intensificar de todos. Paragão no 17º (um que já seja adepto). Sem espaços de magia (rituais na aba Magias): varinha Arremessa Magia pela CD de classe, não por espaços.',
    },
    {
      title: 'Intensificar Vulnerabilidade (9º)',
      originalName: 'Intensify Vulnerability',
      body: '1 ação, 1×/rodada, se Explorar Vulnerabilidade está ativo e você não Explorou nesta rodada. Ganha o benefício de intensificar de um implemento que estiver empunhando, até o início do próximo turno. No 19º, Explorar e Intensificar viram ação livre (ainda 1×/rodada).',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial de Carisma, 8 PV, armadura leve/média, armas marciais. Você é o “eu sei a fraqueza disso”: Recordar, Explorar, Golpe. Feito de classe já no 1º. Sem conjuração — pergaminhos e feitos entram depois, se quiser.',
    },
  ],
  lore: {
    summary:
      'O mundo está cheio do inexplicável. Você catou o melhor de cada tradição e montou uma coleção de esotérica — relíquia quebrada aqui, visco ali — para derrubar qualquer criatura explorando fraquezas. O implemento é crachá e arma: peso simbólico para negociar com o sobrenatural. Você é taumaturgo, e faz milagres.',
    duringCombat:
      'Implementos e um arsenal de truques místicos. Sempre o ban certo para a fraqueza do inimigo, ou o amuleto que protege o grupo do sobrenatural.',
    duringSocial:
      'Entende e empurra conexões entre pessoas, como faz com mistérios. Encontra terreno comum entre o mundano e o sobrenatural — ou joga um lado contra o outro.',
    whileExploring:
      'Investiga fenômenos inexplicáveis e toma precauções contra ameaças paranormais. Quando precisa, abre o próprio caminho no desconhecido.',
    inDowntime:
      'Pesquisa os mistérios da última aventura. Tira o pó de relíquias, cultiva ervas, forja tralhas. Devolve ou cobra favores de pessoas, criaturas estranhas e forças místicas.',
    youMight: [
      'Preparar-se para o pior e improvisar o resto, impressionando o grupo quando dá conta de qualquer coisa.',
      'Assumir que tudo se conecta num nível mais fundo, em vez de se contentar com a superfície.',
      'Obcecar-se por um fenômeno sobrenatural e puxar tudo de volta para ele.',
    ],
    othersProbably: [
      'Olham para você quando uma ameaça sobrenatural aparece — mesmo as explicações inventadas na hora parecem funcionar.',
      'Contam com você quando a situação parece sem saída.',
      'Te confundem com um mago ou mágico comum.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Conhecimento esotérico',
        'Primeiro implemento e esotérica',
        'Empoderamento do implemento',
        'Feito de taumaturgo',
      ],
    },
    { level: 2, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 3,
      features: ['Feito geral', 'Expertise em Reflexos', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Segundo implemento',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    { level: 6, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 7,
      features: [
        'Mente disciplinada',
        'Feito geral',
        'Adepto do implemento',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 8, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Intensificar vulnerabilidade',
        'Expertise em Percepção',
        'Aumento de perícia',
        'Expertise taumatúrgica',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de taumaturgo'],
    },
    {
      level: 11,
      features: [
        'Feito geral',
        'Expertise em armadura média',
        'Segundo adepto',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Mente aperfeiçoada',
        'Aumento de perícia',
        'Maestria com armas (mestre)',
      ],
    },
    { level: 14, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Resiliência conquistada',
        'Feito geral',
        'Especialização maior em arma',
        'Aumento de perícia',
        'Terceiro implemento',
      ],
    },
    { level: 16, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Paragão do implemento',
        'Aumento de perícia',
        'Maestria taumatúrgica',
      ],
    },
    { level: 18, features: ['Feito de perícia', 'Feito de taumaturgo'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Maestria em armadura média',
        'Aumento de perícia',
        'Esotérica ilimitada',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de perícia', 'Feito de taumaturgo'],
    },
  ],
  features: [
    {
      id: 'thaumaturge-esoteric-lore',
      name: 'Conhecimento Esotérico',
      originalName: 'Esoteric Lore',
      level: 1,
      description:
        'Treinado em Conhecimento Esotérico (usa Carisma). Recordar Conhecimento só sobre assombrações, maldições e criaturas de qualquer tipo. Ganha o feito Conhecimento Duvidoso. Especialista no 3º, mestre no 7º, lendário no 15º.',
      effects: [
        {
          kind: 'grantedFeat',
          featId: 'feat-dubious-knowledge',
          featName: 'Conhecimento Duvidoso',
          originalName: 'Dubious Knowledge',
          featType: 'skill',
        },
      ],
    },
    {
      id: 'thaumaturge-first-implement',
      name: 'Primeiro Implemento e Esotérica',
      originalName: 'First Implement and Esoterica',
      level: 1,
      description:
        'Escolha um implemento e comece com um item mundano daquele tipo (benefício inicial). Coleta esotérica no corpo; empunha implemento e esotérica na mesma mão.',
    },
    {
      id: 'thaumaturge-exploit-vulnerability',
      name: 'Explorar Vulnerabilidade',
      originalName: 'Exploit Vulnerability',
      level: 1,
      actionType: 'one',
      description:
        'Teste de Conhecimento Esotérico vs CD padrão do nível. Até Explorar de novo: Golpes mágicos; fraqueza mortal ou antítese pessoal (2 + metade do nível). Falha crítica: desprevenido até o próximo turno.',
    },
    {
      id: 'thaumaturge-implements-empowerment',
      name: 'Empoderamento do Implemento',
      originalName: "Implement's Empowerment",
      level: 1,
      description:
        'No Golpe, +2 de dano por dado da arma se empunha pelo menos um implemento e nas mãos só há uma arma de uma mão, outros implementos ou esotérica.',
    },
    {
      id: 'thaumaturge-lightning-reflexes',
      name: 'Reflexos Relâmpago',
      originalName: 'Lightning Reflexes',
      level: 3,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'thaumaturge-second-implement',
      name: 'Segundo Implemento',
      originalName: 'Second Implement',
      level: 5,
      description:
        'Escolha um segundo tipo de implemento (benefício inicial). Trocar o empunhado: Interagir como ação livre imediatamente antes da ação do implemento que entra na mão.',
    },
    {
      id: 'thaumaturge-weapon-expertise',
      name: 'Maestria com Armas',
      originalName: 'Weapon Expertise',
      level: 5,
      description:
        'Ataques desarmados, armas simples e marciais sobem para especialista.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'thaumaturge-disciplined-mind',
      name: 'Mente Disciplinada',
      originalName: 'Disciplined Mind',
      level: 7,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'thaumaturge-implement-adept',
      name: 'Adepto do Implemento',
      originalName: 'Implement Adept',
      level: 7,
      description: 'Escolha um implemento e ganhe o benefício de adepto dele.',
    },
    {
      id: 'thaumaturge-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'thaumaturge-intensify-vulnerability',
      name: 'Intensificar Vulnerabilidade',
      originalName: 'Intensify Vulnerability',
      level: 9,
      actionType: 'one',
      frequency: '1 vez por rodada',
      trigger:
        'Você se beneficia de Explorar Vulnerabilidade, vê o alvo e não Explorou nesta rodada.',
      description:
        'Ganha o benefício de intensificar de todos os implementos, mais a ação Intensificar: o benefício de um implemento empunhado até o início do próximo turno.',
    },
    {
      id: 'thaumaturge-perception-expertise',
      name: 'Expertise em Percepção',
      originalName: 'Perception Expertise',
      level: 9,
      description: 'Proficiência em Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'thaumaturge-thaumaturgic-expertise',
      name: 'Expertise Taumatúrgica',
      originalName: 'Thaumaturgic Expertise',
      level: 9,
      description:
        'CD de classe sobe para especialista. +1 aumento de perícia só em Arcana, Natureza, Ocultismo ou Religião.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'thaumaturge-medium-armor-expertise',
      name: 'Expertise em Armadura Média',
      originalName: 'Medium Armor Expertise',
      level: 11,
      description:
        'Armadura leve, média e defesa sem armadura sobem para especialista.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'thaumaturge-second-adept',
      name: 'Segundo Adepto',
      originalName: 'Second Adept',
      level: 11,
      description: 'Ganha o benefício de adepto do segundo implemento.',
    },
    {
      id: 'thaumaturge-perfected-mind',
      name: 'Mente Aperfeiçoada',
      originalName: 'Perfected Mind',
      level: 13,
      description:
        'Vontade sobe para lendário. Falha crítica em Vontade vira falha. Falha em Vontade contra efeito que causa dano: metade do dano.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'legendary' }],
    },
    {
      id: 'thaumaturge-weapon-mastery',
      name: 'Maestria com Armas',
      originalName: 'Weapon Mastery',
      level: 13,
      description:
        'Ataques desarmados, armas simples e marciais sobem para mestre.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'thaumaturge-earned-resilience',
      name: 'Resiliência Conquistada',
      originalName: 'Earned Resilience',
      level: 15,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'thaumaturge-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'thaumaturge-third-implement',
      name: 'Terceiro Implemento',
      originalName: 'Third Implement',
      level: 15,
      description:
        'Terceiro tipo (diferente dos outros). Ganha o benefício inicial e o de intensificar.',
    },
    {
      id: 'thaumaturge-implement-paragon',
      name: 'Paragão do Implemento',
      originalName: 'Implement Paragon',
      level: 17,
      description:
        'Escolha um implemento que já tenha o benefício de adepto e ganhe o de paragon.',
    },
    {
      id: 'thaumaturge-thaumaturgic-mastery',
      name: 'Maestria Taumatúrgica',
      originalName: 'Thaumaturgic Mastery',
      level: 17,
      description:
        'CD de classe sobe para mestre. +1 aumento de perícia só em Arcana, Natureza, Ocultismo ou Religião.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'thaumaturge-medium-armor-mastery',
      name: 'Maestria em Armadura Média',
      originalName: 'Medium Armor Mastery',
      level: 19,
      description:
        'Armadura leve, média e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'master',
        },
      ],
    },
    {
      id: 'thaumaturge-unlimited-esoterica',
      name: 'Esotérica Ilimitada',
      originalName: 'Unlimited Esoterica',
      level: 19,
      description:
        'Explorar Vulnerabilidade e Intensificar Vulnerabilidade viram ação livre (ainda 1× por rodada).',
    },
  ],
}
