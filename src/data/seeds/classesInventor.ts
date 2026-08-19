import type { CharacterClass } from '@/types/class'
import { SOURCE_BATTLECRY_ID, SOURCE_GUNS_GEARS_ID } from './sources'
import { CLASS_INVENTOR_ID } from './ids'

export { CLASS_INVENTOR_ID }

/** Inventor — Guns & Gears (Remastered), AoN Classes ID 19 */
export const inventorClass: CharacterClass = {
  id: CLASS_INVENTOR_ID,
  name: 'Inventor',
  originalName: 'Inventor',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_GUNS_GEARS_ID,
  sourcePage: 15,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['intelligence'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'inventor-crafting', rank: 'trained', skillId: 'crafting' }],
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
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=19',
  subclass: {
    id: 'inventor-innovation',
    label: 'Inovação',
    description:
      'Sua obra-prima. Nível = o seu. Se destruída: 1 dia de intervalo + Artesanato (CD alta) para reconstruir. Só funciona com sua manutenção — sem preço de mercado. Fonte: Guns & Gears (Remastered), pág. 16. Acesso: Absalom, Novo Thassilon, Alkenstar, Dongun Hold, Arcadia tecnológica, Uomoto, Eihlona, autômatos jistkanos, Ustalav (PFS: todos). Morteiro Leve (Battlecry!) é arquétipo de classe: escolha-o aqui no 1º e pegue a Dedicação no 2º.',
    required: true,
    options: [
      {
        id: 'innovation-armor',
        name: 'Inovação de Armadura',
        originalName: 'Armor Innovation',
        description:
          'Traje de armadura média cheio de engenhocas. Só você é treinado nele.',
        rulesSummary:
          'Escolha Traje de Poder (CA +5, Dex +1, penalidade −2, −1,5 m, For 3, Bulk 2) ou Traje de Subterfúgio (CA +2, Dex +4, −1, For 0, Bulk 1); grupo composto. Aceita runas. 1 modificação inicial de armadura. Explodir: emanação em você. Impulso ofensivo (9º): Golpes desarmados corpo a corpo e 1 arma escolhida nas preparações.',
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 16,
      },
      {
        id: 'innovation-construct',
        name: 'Inovação de Construto',
        originalName: 'Construct Innovation',
        description:
          'Criatura mecânica (protótipo). Use a aba Companheiros — o app já calcula o construto.',
        rulesSummary:
          'Companheiro construto protótipo. Sobrecarga: o construto ganha o mesmo bônus (e o mesmo dano de fogo na falha crítica). Comandar com 2 ações dá +1 ação ao construto (em geral 3). 1 modificação inicial de construto. Explodir: emanação no construto. Impulso ofensivo (9º): Golpes do construto.',
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 17,
      },
      {
        id: 'innovation-weapon',
        name: 'Inovação de Arma',
        originalName: 'Weapon Innovation',
        description:
          'Arma impossível cheia de mecanismos. Só você é treinado nela.',
        rulesSummary:
          'Stats de arma comum de 0º simples ou marcial (ou avançada: conta como marcial, sem mod inicial). Aceita runas. 1 modificação inicial de arma. Sobrecarga: pode converter o dano extra em fogo. Explodir: emanação em você. Impulso ofensivo (9º): Golpes com a inovação.',
        sourceId: SOURCE_GUNS_GEARS_ID,
        sourcePage: 17,
      },
      {
        id: 'innovation-mortar',
        name: 'Inovação de Morteiro Leve',
        originalName: 'Light Mortar Innovation',
        description:
          'Arquétipo de classe Senhor de Munições: arma de cerco portátil. Pegue Dedicação de Senhor de Munições no 2º nível. Escolha a modificação inicial na aba Classe.',
        rulesSummary:
          'Obrigatório: Dedicação no 2º. Morteiro montado 2 Bulk; Interagir para desdobrar; recolher = 2 ações. Mover Máquina de Cerco custa 1 ação desdobrado. Disparo: Reflexos = CD de classe; explosão 3 m. CA = CD de inventor; Dureza 5 (10/15/20 nos 5º/10º/15º). PV 10+(2+INT)×nível. Sobrecarga e Impulso Ofensivo valem nos Disparos. Perícia inventiva no 7º (não 9º); maestria no 15º (não 17º). Você escolhe a modificação inicial; o motor não escolhe.',
        sourceId: SOURCE_BATTLECRY_ID,
        sourcePage: 64,
      },
    ],
  },
  keyTerms: [
    {
      name: 'Instável',
      originalName: 'Unstable',
      description:
        'Depois do efeito, teste simples CD 15 (13 se lendário em Artesanato). Falha: a inovação não aceita mais ações instáveis até 10 min de ajuste. Falha crítica: também sofre fogo = metade do nível. Precisa estar usando a inovação (vestida, empunhada ou o lacaio Comandado). Função instável: versão extra da ação; se não puder usar instável, a ação normal ainda vale.',
    },
    {
      name: 'Modificação',
      originalName: 'Modification',
      description:
        'Altera a construção da inovação (inicial, avanço ou revolucionária). Com Reconfigurar, esses feitos retreinam mais fácil.',
    },
    {
      name: 'Engenhoca',
      originalName: 'Gadget',
      description:
        'Invenção tecnológica consumível. O feito de perícia Inventor (concedido) e vários feitos de classe criam engenhocas temporárias.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Sobrecarga nas engenhocas do corpo',
      originalName: 'Overdrive',
      body: '1 ação, 1×/rodada, Artesanato vs CD padrão do nível. Sucesso crítico: +INT de dano nos Golpes por 1 min, depois 1 min sem Sobrecarga. Sucesso: +metade de INT. Falha: +1 de fogo por 1 min. Falha crítica: fogo = metade do nível (mín. 1) e 1d4 rodadas sem Sobrecarga. Pode tentar de novo durante a Sobrecarga para virar crítica (falha crítica encerra). Avanço 3º/7º/15º: +1/+2/+3 no dano de sucesso e Artesanato sobe (especialista → mestre → lendário).',
    },
    {
      title: 'Explodir (sempre instável)',
      originalName: 'Explode',
      body: '2 ações. 2d6 de fogo (básico de Reflexos) numa emanação de 1,5 m em você (armadura/arma) ou no construto. +1d6 por nível a partir do 3º. Avanço (7º): 1,5 m ou 3 m. Revolução (15º): até 4,5 m. A inovação em si não é destruída — “esperamos”.',
    },
    {
      title: 'Uma inovação, três formas',
      originalName: 'Innovation',
      body: 'Armadura, construto ou arma. Nesta aba: Traje de Poder ou Subterfúgio; arma-base da inovação; modificações (inicial, avanço no 7º, revolucionária no 15º). Construto: o chassi da ficha do lacaio fica na aba Companheiros. No 19º, nas preparações, pode trocar o tipo inteiro.',
    },
    {
      title: 'Reconfigurar',
      originalName: 'Reconfigure',
      body: 'No 3º: 1 dia de intervalo + Artesanato (CD alta) troca 1 modificação do mesmo tipo, ou 1 feito de modificação. No 13º: no sucesso, troca quantas quiser (e o impulso ofensivo).',
    },
    {
      title: 'Impulso ofensivo (9º)',
      originalName: 'Offensive Boost',
      body: '+1d6 nos Golpes da inovação (tipo à escolha: frio, fogo, eletricidade, concussão, cortante, perfurante ou ácido). Armadura = desarmados + 1 arma do dia; construto = Golpes dele; arma = a inovação.',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial de Inteligência, 8 PV, armadura média, incomum. Você é o engenheiro de combate: Sobrecarga, explosão instável e uma máquina que só você entende. Feito de classe já no 1º. Sem magia.',
    },
  ],
  lore: {
    summary:
      'Qualquer funileiro segue um diagrama. Você inventa o impossível: cada engenhoca é um experimento na beira do que dá, uma máquina que parece funcionar só para você. Sempre à beira da próxima descoberta — cada tombo é dado para testar e afinar. Se sonhar, constrói.',
    duringCombat:
      'Confia nas invenções e testa em condições variadas. Não luta só para ganhar: coleta dados para melhorar as criações.',
    duringSocial:
      'Contexto útil em papo acadêmico, sobretudo ofício e invenção. Costuma caçar patrono para experimentos caros ou heterodoxos — material não se paga sozinho.',
    whileExploring:
      'Estuda o desenho do lugar: armadilhas espertas, mecanismos, arquitetura. Anota para depois.',
    inDowntime:
      'Esboça, fabrica, ajusta com os dados do campo. Ferreiro ou funileiro da vila — ou oficina na beira do povoado, onde o barulho incomoda menos.',
    youMight: [
      'Gostar de criar o que o mundo nunca viu.',
      'Arriscar uma hipótese, testar, anotar se falhar e tentar de novo.',
      'Usar roupa suja de óleo ou disparar em tangente técnica numa pergunta simples.',
    ],
    othersProbably: [
      'Maravilham-se com a variedade de milagres que suas máquinas fazem.',
      'Acham que você é um gênio incompreensível.',
      'Temem que a invenção falhe ou exploda.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Proficiências iniciais',
        'Sobrecarga',
        'Inovação',
        'Explodir',
        'Inventor sem igual',
        'Bloqueio com escudo',
        'Feito de inventor',
      ],
    },
    { level: 2, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Sobrecarga especialista',
        'Feito geral',
        'Reconfigurar',
        'Aumento de perícia',
      ],
    },
    { level: 4, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Expertise com armas de inventor',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Inovação de avanço',
        'Feito geral',
        'Expertise em Reflexos',
        'Sobrecarga mestre',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 8, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Expertise inventiva',
        'Impulso ofensivo',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de inventor', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Feito geral',
        'Expertise em armadura média',
        'Determinação',
        'Aumento de perícia',
      ],
    },
    { level: 12, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Alerta',
        'Feito de ancestralidade',
        'Reconfiguração completa',
        'Maestria com armas de inventor',
        'Aumento de perícia',
      ],
    },
    { level: 14, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Especialização maior em arma',
        'Sobrecarga lendária',
        'Inovação revolucionária',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Maestria inventiva',
        'Juggernaut',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de inventor', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Feito geral',
        'Invenção infinita',
        'Maestria em armadura média',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de inventor', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'inventor-overdrive',
      name: 'Sobrecarga',
      originalName: 'Overdrive',
      level: 1,
      actionType: 'one',
      frequency: '1 vez por rodada',
      description:
        'Artesanato vs CD padrão do nível. Sucesso crítico: +INT de dano nos Golpes por 1 min, depois 1 min sem Sobrecarga. Sucesso: +metade de INT. Falha: +1 de fogo por 1 min. Falha crítica: fogo = metade do nível (mín. 1) e 1d4 rodadas sem Sobrecarga. Pode tentar de novo durante a Sobrecarga para virar crítica.',
    },
    {
      id: 'inventor-innovation',
      name: 'Inovação',
      originalName: 'Innovation',
      level: 1,
      description:
        'Escolha armadura, construto ou arma. Nível = o seu. Reconstruir: 1 dia + Artesanato (CD alta). Sem preço de mercado.',
    },
    {
      id: 'inventor-explode',
      name: 'Explodir',
      originalName: 'Explode',
      level: 1,
      actionType: 'two',
      description:
        'Instável. 2d6 de fogo (básico de Reflexos) em emanação de 1,5 m (em você ou no construto). +1d6 por nível a partir do 3º. Avanço: 1,5 m ou 3 m. Revolução: até 4,5 m.',
    },
    {
      id: 'inventor-peerless-inventor',
      name: 'Inventor sem Igual',
      originalName: 'Peerless Inventor',
      level: 1,
      description:
        'Ganha o feito de perícia Inventor, mesmo sem os pré-requisitos.',
      effects: [
        {
          kind: 'grantedFeat',
          featId: 'feat-inventor-skill',
          featName: 'Inventor',
          originalName: 'Inventor',
          featType: 'skill',
        },
      ],
    },
    {
      id: 'inventor-shield-block',
      name: 'Bloqueio com Escudo',
      originalName: 'Shield Block',
      level: 1,
      description:
        'Ganha o feito geral Bloqueio com Escudo, uma reação que reduz dano com o escudo.',
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
      id: 'inventor-expert-overdrive',
      name: 'Sobrecarga Especialista',
      originalName: 'Expert Overdrive',
      level: 3,
      description:
        'Artesanato sobe para especialista. No sucesso da Sobrecarga, o dano extra aumenta em 1.',
    },
    {
      id: 'inventor-reconfigure',
      name: 'Reconfigurar',
      originalName: 'Reconfigure',
      level: 3,
      description:
        '1 dia de intervalo + Artesanato (CD alta): no sucesso, troca 1 modificação pelo mesmo tipo, ou retreina 1 feito de modificação.',
    },
    {
      id: 'inventor-weapon-expertise',
      name: 'Expertise com Armas de Inventor',
      originalName: 'Inventor Weapon Expertise',
      level: 5,
      description:
        'Armas simples, marciais e ataques desarmados sobem para especialista. Inovação de arma: efeitos de especialização crítica na inovação.',
      effects: [
        {
          kind: 'attackRank',
          categories: ['simple', 'martial', 'unarmed'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'inventor-breakthrough-innovation',
      name: 'Inovação de Avanço',
      originalName: 'Breakthrough Innovation',
      level: 7,
      description:
        'Aplique 1 modificação de avanço do tipo da inovação (ou outra inicial, se preferir).',
    },
    {
      id: 'inventor-master-overdrive',
      name: 'Sobrecarga Mestre',
      originalName: 'Master Overdrive',
      level: 7,
      description:
        'Artesanato sobe para mestre. No sucesso da Sobrecarga, o dano extra aumenta em 2 no total (substitui o +1 de especialista).',
    },
    {
      id: 'inventor-reflex-expertise',
      name: 'Expertise em Reflexos',
      originalName: 'Reflex Expertise',
      level: 7,
      description: 'Proficiência em Reflexos sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'inventor-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 7,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'inventor-inventive-expertise',
      name: 'Expertise Inventiva',
      originalName: 'Inventive Expertise',
      level: 9,
      description: 'CD de classe sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'inventor-offensive-boost',
      name: 'Impulso Ofensivo',
      originalName: 'Offensive Boost',
      level: 9,
      description:
        '+1d6 nos Golpes da inovação. Tipo: frio, fogo, eletricidade, concussão, cortante, perfurante ou ácido. Armadura: desarmados + 1 arma do dia. Construto: Golpes dele. Arma: a inovação. Troca no intervalo como modificação.',
    },
    {
      id: 'inventor-medium-armor-expertise',
      name: 'Expertise em Armadura Média',
      originalName: 'Medium Armor Expertise',
      level: 11,
      description:
        'Armadura leve, média e defesa sem armadura sobem para especialista. Inovação de armadura média ou pesada: especialização crítica da armadura.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'medium', 'unarmored'],
          rank: 'expert',
        },
      ],
    },
    {
      id: 'inventor-resolve',
      name: 'Determinação',
      originalName: 'Resolve',
      level: 11,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'inventor-alertness',
      name: 'Alerta',
      originalName: 'Alertness',
      level: 13,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'inventor-complete-reconfiguration',
      name: 'Reconfiguração Completa',
      originalName: 'Complete Reconfiguration',
      level: 13,
      description:
        'Ao Reconfigurar com sucesso, pode trocar qualquer número de modificações (mesmo tipo), o impulso ofensivo e feitos de modificação.',
    },
    {
      id: 'inventor-weapon-mastery',
      name: 'Maestria com Armas de Inventor',
      originalName: 'Inventor Weapon Mastery',
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
      id: 'inventor-greater-weapon-specialization',
      name: 'Especialização Maior em Arma',
      originalName: 'Greater Weapon Specialization',
      level: 15,
      description:
        'Dano de especialização: +4 especialista, +6 mestre, +8 lendário.',
    },
    {
      id: 'inventor-legendary-overdrive',
      name: 'Sobrecarga Lendária',
      originalName: 'Legendary Overdrive',
      level: 15,
      description:
        'Artesanato sobe para lendário. No sucesso da Sobrecarga, o dano extra aumenta em 3 no total (substitui o +2 de mestre).',
    },
    {
      id: 'inventor-revolutionary-innovation',
      name: 'Inovação Revolucionária',
      originalName: 'Revolutionary Innovation',
      level: 15,
      description:
        'Aplique 1 modificação revolucionária (ou inicial/avanço do mesmo tipo).',
    },
    {
      id: 'inventor-inventive-mastery',
      name: 'Maestria Inventiva',
      originalName: 'Inventive Mastery',
      level: 17,
      description: 'CD de classe sobe para mestre.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'inventor-juggernaut',
      name: 'Juggernaut',
      originalName: 'Juggernaut',
      level: 17,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'inventor-infinite-invention',
      name: 'Invenção Infinita',
      originalName: 'Infinite Invention',
      level: 19,
      description:
        'Nas preparações: conserta inovação quebrada/destruída e pode trocar o tipo (armadura, construto, arma), modificações e impulso ofensivo. Feitos que exigiam a inovação antiga ficam inativos até retreino (1 dia, não 1 semana, se o novo feito exigir a inovação nova).',
    },
    {
      id: 'inventor-medium-armor-mastery',
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
  ],
}
