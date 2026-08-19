import type { CharacterClass } from '@/types/class'
import { SOURCE_WAR_OF_IMMORTALS_ID } from './sources'
import { CLASS_EXEMPLAR_ID } from './ids'

export { CLASS_EXEMPLAR_ID }

/** Exemplar — War of Immortals, AoN Classes ID 65 */
export const exemplarClass: CharacterClass = {
  id: CLASS_EXEMPLAR_ID,
  name: 'Exemplar',
  originalName: 'Exemplar',
  rarity: 'rare',
  provenance: { type: 'official' },
  sourceId: SOURCE_WAR_OF_IMMORTALS_ID,
  sourcePage: 28,
  hitPointsPerLevel: 10,
  keyAttributeOptions: ['strength', 'dexterity'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'trained',
    will: 'expert',
  },
  skills: {
    fixed: [{ id: 'exemplar-religion', rank: 'trained', skillId: 'religion' }],
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
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=65',
  keyTerms: [
    {
      name: 'Ícone',
      originalName: 'Ikon',
      description:
        'Item ou traço do corpo ligado à sua divindade — vaso da faísca. No 1º você escolhe 3 (War of Immortals, pág. 43). Cada um tem imanência (passiva com a faísca dentro) e transcendência (ação milagrosa). Feito com traço ícone: escolhe em qual ícone entra; se vários cumprem o uso, pode pegar o feito de novo. Vários feitos no mesmo ícone.',
    },
    {
      name: 'Imanência',
      originalName: 'Immanence',
      description:
        'Enquanto a faísca empoderar um ícone, ele ganha o traço divino e você recebe todas as imanências dele. Imanência em crítico de arma substitui a especialização crítica.',
    },
    {
      name: 'Transcendência',
      originalName: 'Transcendence',
      description:
        'Canaliza a faísca pelo ícone empoderado (precisa estar pronto: arma na mão, vestido no corpo). Depois a faísca é ejetada para outro ícone à escolha. 1× por rodada. Traço divino.',
    },
    {
      name: 'Exibição',
      originalName: 'Flourish',
      description:
        'Técnica pesada: só 1 ação com o traço Exibição por rodada.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Faísca e três ícones',
      originalName: 'Divine Spark and Ikons',
      body: 'Arma, vestido ou corpo — escolha 3 na lista desta aba (pelo menos 1 arma). Cada um tem imanência (passiva com a faísca) e transcendência (ação). Pegue pelo menos 1 arma. Ícone de corpo não se desarma nem se rouba. Arma/vestido: ganha um item nível 0 do uso; runas e troca (1 dia de intervalo) como no livro.',
    },
    {
      title: 'Catálogo de ícones (War of Immortals)',
      originalName: 'Ikons',
      body: 'Arma: Fio da Tumba (cortante/perfurante corpo a corpo; espírito extra, mais se o alvo está abaixo da metade; Beber dos Inimigos cura metade do dano); Lâmina Reluzente (espada/faca ou desarmado cortante; +2 espírito/dado; Golpe do Espírito Fluente = dois Golpes somados em espírito); Mãos do Selvagem (mão livre ou desarmado corpo a corpo; respingo de espírito; Balanço Feral cone 4,5 m); Colheita Mortal (foice ou machado/mangual/haste; espírito persistente; Ceifar o Campo = Distanciar metade + Golpe em outro); Ramo Nobre (lança/haste ou cajado/bo/bastão/khakkhara; +2 espírito/dado; Golpear, Respirar, Dilacerar = dados da arma em espírito); Bainha das Sombras (coldre de arremesso 1 mão, leve; cópias infinitas; +2 espírito, +3 desprevenido; Lâmina Oculta do Mentiroso); Tiro Estelar (à distância; respingo de espírito; Cometa que Derruba Gigantes explosão 1,5 m); Quebra-Titãs (clava/martelo/machado ou desarmado concussão; +2 espírito, fura Dureza de construto; Fraturar Montanhas); Arco Infalível (à distância; +1 espírito, 1d4 no crítico; Flecha Parte Flecha repete o d20). Vestido: Faixas do Cárcere (tornozeleira/bracelete/diadema; +1 Vontade e resistência mental; Romper as Amarras); Pulseiras Cativantes (bracelete; aura 3 m impede afastamento; Abraço do Destino puxa); Cornucópia (bolsa 1 Bulk; elixires temporários; Alimentar as Massas); Égide Espelhada (escudo; aura +1 CA; Erguer os Muros); Pele da Fera (manto/cinto; resistência elemental; Sobreviver aos Ermos); Cinto do Céu (cinto; manobras +2 tamanhos; Carregar os Fardos); Sandálias das Mil Léguas (+3 m Deslocamento; Disparada de Maratona); Grinalda do Vencedor (cabeça/cinto; aura +1 ataque; Um Instante até a Glória). Corpo: Marca que Prende o Olhar (rosto; −1 nos corpo a corpo contra você; Encanto Cativante); Olhar Afiado como Aço (olhos; +1 Percepção, +2 CA vs à distância; Um Instante Sem Fim); Cicatriz do Sobrevivente (pele; Difícil de Matar + +1 Fortitude; Nenhuma Cicatriz Além Desta); Pele Dura como Chifre (pele; resistência ao tipo habituado, não no crítico; Choquem-se Contra Mim).',
    },
    {
      title: 'Epítetos: a lenda que cola',
      originalName: 'Epithets',
      body: 'Não é escolha de 1º. Raiz no 3º (perícia + efeito depois de Acender Transcendência). Domínio no 7º (feito Faísca Energizada, crítico especial, outro efeito ao Acender). Soberania no 15º (efeito ao Acender). Só 1 efeito de epíteto por Acender. Escolha na lista desta aba, conforme o nível. Epítetos de AP ficam de fora.',
    },
    {
      title: 'Golpes Humildes e espírito',
      originalName: 'Humble Strikes / Spirit Striking',
      body: 'Arma simples: dado de dano +1 passo. No 7º, Golpe Espiritual: +2 espírito com arma/desarmado em que é especialista (+3 mestre, +4 lendário). No 15º isso dobra (4/6/8). Não é especialização de arma clássica — é a faísca vazando no golpe.',
    },
    {
      title: 'Papel no grupo',
      body: 'Marcial raro de Força ou Destreza, 10 PV, armadura média, feito de classe já no 1º. Você troca o ícone empoderado conforme o round: dano, cura, controle ou deslocamento. Sem magia — a aba Magias fica bloqueada (rituais continuam). Na Sociedade Pathfinder, todos os agentes têm acesso à classe.',
    },
  ],
  lore: {
    summary:
      'Quando o deus da guerra morreu, o poder choveu pelos planos. Você foi tocado, tomou de um artefato ou acordou algo na linhagem: uma faísca divina agora arde na alma. Armas sagradas, sinais de deus. Herói ou egoísta — você vai gravar o epíteto na memória de deuses e mortais.',
    duringCombat:
      'Vanguarda: dispersa o que é menor, concentra a faísca na arma ou ferramenta certa. Flecha na pele arde como pulga; lança fura até deus.',
    duringSocial:
      'Figura maior que a vida. Magnetismo que inspira, ou silêncio que pesa. Palavra e gesto ficam no ar.',
    whileExploring:
      'Sente o fluxo do destino: o próximo feito vem até você. Natureza, sociedade ou cosmos começam a puxar a faísca.',
    inDowntime:
      'Inatividade não combina. Caça, disputa atlética, artefato perdido — qualquer feito que espalhe o nome.',
    youMight: [
      'Perseguir glória terra, mar e horizonte afora.',
      'Tomar outros heróis sob a asa, para a lenda viver neles.',
      'Sentir o peso de expectativa e obrigação enormes.',
    ],
    othersProbably: [
      'Olham para você na crise, achando que dá conta de tudo.',
      'Veem mais a figura da história do que a pessoa viva.',
      'Confundem heroísmo com orgulho e distância.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Faísca divina e ícones',
        'Feito de exemplar',
        'Golpes Humildes',
        'Bloqueio com Escudo',
      ],
    },
    { level: 2, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 3,
      features: ['Feito geral', 'Epíteto-raiz', 'Aumento de perícia'],
    },
    { level: 4, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Aumentos de atributo',
        'Feito de ancestralidade',
        'Aumento de perícia',
        'Expertise com armas',
      ],
    },
    { level: 6, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Epíteto de domínio',
        'Feito geral',
        'Aumento de perícia',
        'Golpe Espiritual',
        'Alma Inexpugnável',
      ],
    },
    { level: 8, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Premonição divina',
        'Expertise divina',
        'Expertise em Percepção',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de exemplar', 'Feito de perícia'],
    },
    { level: 11, features: ['Feito geral', 'Aumento de perícia'] },
    { level: 12, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Expertise em armadura brunida',
        'Maestria de arma divina',
        'Alma Inexpugnável Maior',
        'Aumento de perícia',
      ],
    },
    { level: 14, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Golpe Espiritual Maior',
        'Mortalidade Reforjada',
        'Epíteto de soberania',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Maestria deífica',
        'Maestria em Percepção',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de exemplar', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Maestria em armadura brunida',
        'Feito geral',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de exemplar', 'Feito de perícia'],
    },
  ],
  features: [
    {
      id: 'exemplar-divine-spark',
      name: 'Faísca Divina e Ícones',
      originalName: 'Divine Spark and Ikons',
      level: 1,
      description:
        'Escolha 3 ícones (War of Immortals, pág. 43). A faísca empoderar 1 por vez. Cada ícone: imanência passiva + transcendência. Catálogo no guia da classe.',
    },
    {
      id: 'exemplar-shift-immanence',
      name: 'Mudar Imanência',
      originalName: 'Shift Immanence',
      level: 1,
      actionType: 'one',
      description:
        'Coloca a faísca num ícone (ele brilha / tine / mostra a divindade; traço divino; imanência) ou a devolve à alma. Indivisível: 1 ícone por vez. Também como ação livre quando rola iniciativa.',
    },
    {
      id: 'exemplar-humble-strikes',
      name: 'Golpes Humildes',
      originalName: 'Humble Strikes',
      level: 1,
      description:
        'Com arma simples, o dado de dano sobe 1 passo.',
    },
    {
      id: 'exemplar-shield-block',
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
      id: 'exemplar-root-epithet',
      name: 'Epíteto-Raiz',
      originalName: 'Root Epithet',
      level: 3,
      description:
        'Escolha um epíteto-raiz (Bravo, Astuto, Hábil, Lamentoso, Orgulhoso ou Radiante). Treina a perícia; se já era treinado, treina outra. Efeito logo após Acender Transcendência. Catálogo no guia.',
    },
    {
      id: 'exemplar-weapon-expertise',
      name: 'Expertise com Armas',
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
      id: 'exemplar-dominion-epithet',
      name: 'Epíteto de Domínio',
      originalName: 'Dominion Epithet',
      level: 7,
      description:
        'Escolha um epíteto de domínio (War of Immortals). Crítico especial + efeito ao Acender. Só 1 efeito de epíteto por Acender. Vários concedem o feito Faísca Energizada.',
    },
    {
      id: 'exemplar-spirit-striking',
      name: 'Golpe Espiritual',
      originalName: 'Spirit Striking',
      level: 7,
      description:
        '+2 de dano de espírito com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'exemplar-unassailable-soul',
      name: 'Alma Inexpugnável',
      originalName: 'Unassailable Soul',
      level: 7,
      description:
        'Vontade sobe para mestre. Sucesso em Vontade vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'master' }],
    },
    {
      id: 'exemplar-divine-premonition',
      name: 'Premonição Divina',
      originalName: 'Divine Premonition',
      level: 9,
      description: 'Reflexos sobem para especialista.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'expert' }],
    },
    {
      id: 'exemplar-godly-expertise',
      name: 'Expertise Divina',
      originalName: 'Godly Expertise',
      level: 9,
      description: 'CD de classe de exemplar sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'exemplar-perception-expertise',
      name: 'Expertise em Percepção',
      originalName: 'Perception Expertise',
      level: 9,
      description: 'Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'exemplar-divine-weapon-mastery',
      name: 'Maestria de Arma Divina',
      originalName: 'Divine Weapon Mastery',
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
      id: 'exemplar-greater-unassailable-soul',
      name: 'Alma Inexpugnável Maior',
      originalName: 'Greater Unassailable Soul',
      level: 13,
      description:
        'Vontade sobe para lendário. Sucesso vira crítico. Falha crítica vira falha. Falha contra efeito que causa dano: metade do dano.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'legendary' }],
    },
    {
      id: 'exemplar-burnished-armor-expertise',
      name: 'Expertise em Armadura Brunida',
      originalName: 'Burnished Armor Expertise',
      level: 13,
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
      id: 'exemplar-greater-spirit-striking',
      name: 'Golpe Espiritual Maior',
      originalName: 'Greater Spirit Striking',
      level: 15,
      description:
        'O dano extra de Golpe Espiritual sobe para +4 (especialista), +6 (mestre) e +8 (lendário).',
    },
    {
      id: 'exemplar-mortality-reforged',
      name: 'Mortalidade Reforjada',
      originalName: 'Mortality Reforged',
      level: 15,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'exemplar-sovereignty-epithet',
      name: 'Epíteto de Soberania',
      originalName: 'Sovereignty Epithet',
      level: 15,
      description:
        'Escolha um epíteto de soberania (Curador do Mundo, Mestre de Heróis, o Último Soberano ou Ladrão do Luar). Efeito ao Acender Transcendência. Só 1 efeito de epíteto por Acender.',
    },
    {
      id: 'exemplar-deific-mastery',
      name: 'Maestria Deífica',
      originalName: 'Deific Mastery',
      level: 17,
      description: 'CD de classe de exemplar sobe para mestre.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'exemplar-perception-mastery',
      name: 'Maestria em Percepção',
      originalName: 'Perception Mastery',
      level: 17,
      description: 'Percepção sobe para mestre.',
      effects: [{ kind: 'perceptionRank', rank: 'master' }],
    },
    {
      id: 'exemplar-burnished-armor-mastery',
      name: 'Maestria em Armadura Brunida',
      originalName: 'Burnished Armor Mastery',
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
