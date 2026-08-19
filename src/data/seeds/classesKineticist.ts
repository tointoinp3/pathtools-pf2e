import type { CharacterClass, ClassSubclassOption } from '@/types/class'
import { SOURCE_RAGE_OF_ELEMENTS_ID } from './sources'
import { CLASS_KINETICIST_ID } from './ids'

export { CLASS_KINETICIST_ID }

const ELEMENTS = [
  {
    id: 'air',
    name: 'Ar',
    originalName: 'Air',
    specialist: 'Aerocinético',
    blast: 'Explosão: 1d6 eletricidade ou cortante, 18 m.',
    junction:
      'Junção de impulso (2+ ações): Distanciar metade do Deslocamento ou Passo (Voar metade se tiver voo).',
  },
  {
    id: 'earth',
    name: 'Terra',
    originalName: 'Earth',
    specialist: 'Geocinético',
    blast: 'Explosão: 1d8 concussão ou perfurante, 9 m.',
    junction:
      'Junção de impulso (2+ ações): fragmentos de pedra, +1 de circunstância na CA até o início do seu próximo turno.',
  },
  {
    id: 'fire',
    name: 'Fogo',
    originalName: 'Fire',
    specialist: 'Pirocinético',
    blast: 'Explosão: 1d6 fogo, 18 m.',
    junction:
      'Junção de impulso (2+ ações): aumenta em 1 passo o dado de dano de fogo do impulso.',
  },
  {
    id: 'metal',
    name: 'Metal',
    originalName: 'Metal',
    specialist: 'Metallocinético',
    blast: 'Explosão: 1d8 perfurante ou cortante, 9 m.',
    junction:
      'Junção de impulso (2+ ações): até o próximo turno, quem te tocar ou acertar com corpo a corpo sem alcance sofre ácido, eletricidade ou perfurante = metade do nível (mín. 1).',
  },
  {
    id: 'water',
    name: 'Água',
    originalName: 'Water',
    specialist: 'Hidrocinético',
    blast: 'Explosão: 1d8 concussão ou frio, 9 m.',
    junction:
      'Junção de impulso (2+ ações): move 1,5 m (3 m na água) uma criatura alvo/área — disposta, que falhou na salvaguarda ou que você acertou com ataque de impulso.',
  },
  {
    id: 'wood',
    name: 'Madeira',
    originalName: 'Wood',
    specialist: 'Fitocinético',
    blast: 'Explosão: 1d8 concussão ou vitalidade, 9 m.',
    junction:
      'Junção de impulso (2+ ações): PV temporários = nível até o início do seu próximo turno.',
  },
] as const

function kineticGateOptions(): ClassSubclassOption[] {
  const singles: ClassSubclassOption[] = ELEMENTS.map((el) => ({
    id: `gate-single-${el.id}`,
    name: `Portão Único: ${el.name}`,
    originalName: `Single Gate (${el.originalName})`,
    description: `${el.specialist}. Um plano só — mais poder nesse elemento.`,
    rulesSummary: `Elemento: ${el.name}. 2 feitos de impulso de 1º com o traço ${el.name} (além do feito de cinético do 1º). ${el.junction} ${el.blast}`,
    sourceId: SOURCE_RAGE_OF_ELEMENTS_ID,
    sourcePage: 15,
  }))
  const duals: ClassSubclassOption[] = []
  for (let i = 0; i < ELEMENTS.length; i++) {
    for (let j = i + 1; j < ELEMENTS.length; j++) {
      const a = ELEMENTS[i]
      const b = ELEMENTS[j]
      if (!a || !b) continue
      duals.push({
        id: `gate-dual-${a.id}-${b.id}`,
        name: `Portão Duplo: ${a.name} e ${b.name}`,
        originalName: `Dual Gate (${a.originalName} and ${b.originalName})`,
        description:
          'Conduíte entre dois planos: versatilidade em vez de especialização.',
        rulesSummary: `Elementos: ${a.name} e ${b.name}. 2 feitos de impulso de 1º (1 de cada; além do feito de cinético do 1º). Sem junção de impulso no 1º. Impulsos compostos exigem os dois traços. ${a.blast} ${b.blast}`,
        sourceId: SOURCE_RAGE_OF_ELEMENTS_ID,
        sourcePage: 15,
      })
    }
  }
  return [...singles, ...duals]
}

/** Cinético — Rage of Elements (Remaster), AoN Classes ID 23 */
export const kineticistClass: CharacterClass = {
  id: CLASS_KINETICIST_ID,
  name: 'Cinético',
  originalName: 'Kineticist',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_RAGE_OF_ELEMENTS_ID,
  sourcePage: 13,
  hitPointsPerLevel: 8,
  keyAttributeOptions: ['constitution'],
  perceptionRank: 'trained',
  saves: {
    fortitude: 'expert',
    reflex: 'expert',
    will: 'trained',
  },
  skills: {
    fixed: [{ id: 'kineticist-nature', rank: 'trained', skillId: 'nature' }],
    additionalBase: 3,
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
  aonUrl: 'https://2e.aonprd.com/Classes.aspx?ID=23',
  subclass: {
    id: 'kineticist-kinetic-gate',
    label: 'Portão Cinético',
    description:
      'O conduíte no corpo até os planos elementais. Portão único (1 elemento + junção) ou duplo (2 elementos). Ar, terra, fogo, metal, água ou madeira. Fonte: Rage of Elements, pág. 15.',
    required: true,
    options: kineticGateOptions(),
  },
  keyTerms: [
    {
      name: 'Impulso',
      originalName: 'Impulse',
      description:
        'Ação mágica do cinético. Só com a aura ativa, canalizando aquele elemento, e uma mão livre. Tem concentração, salvo outra habilidade. Nível do impulso = seu nível. Ataque de impulso usa a mesma proficiência e CON da CD de classe (em geral CD − 10). Não é magia, mas o que impede ou protege contra magias também vale.',
    },
    {
      name: 'Transbordamento',
      originalName: 'Overflow',
      description:
        'Impulso forte que desliga a aura cinética até você Canalizar Elementos de novo. Só 1 transbordamento por rodada, mesmo se reativar o portão.',
    },
    {
      name: 'Infusão',
      originalName: 'Infusion',
      description:
        'Ação que ajusta o próximo impulso. Use direto antes do impulso; qualquer outra ação (incluindo livres e reações) no meio desperdiça a infusão.',
    },
    {
      name: 'Composto',
      originalName: 'Composite',
      description:
        'Impulso que mistura elementos. Só se o portão incluir todos os traços elementais listados no impulso.',
    },
  ],
  mechanicsGuide: [
    {
      title: 'Aura ligada, impulsos ligados',
      originalName: 'Kinetic Aura & Channel Elements',
      body: 'Canalizar Elementos (1 ação) liga uma emanação de 3 m com pedaços do seu elemento. Sem aura, não lança impulsos novos (os que já estão no campo continuam; pode Sustentar). Aura cai se você cair, usar transbordamento ou Dispensar. Ao canalizar, pode incluir Explosão Elemental de 1 ação ou um impulso de postura de 1 ação.',
    },
    {
      title: 'Explosão e Cinese Básica',
      originalName: 'Elemental Blast & Base Kinesis',
      body: 'Explosão: 1 ou 2 ações, ataque de impulso vs CA. Corpo a corpo soma FOR no dano; 2 ações somam CON como bônus de status. +1 dado a cada 4 níveis. Cinese Básica (2 ações, 9 m): gerar, mover ou suprimir um pedaço leve do elemento — utilidade, não dano.',
    },
    {
      title: 'Portão único ou duplo',
      originalName: 'Kinetic Gate',
      body: 'Único: 2 impulsos de 1º daquele elemento + junção quando um impulso de 2+ ações daquele elemento dispara (1×/rodada). Duplo: 1 impulso de cada elemento, sem junção no 1º, mas compostos depois. No 5º e a cada 4 níveis, Limiar do Portão: aprofundar (feito + junção) ou abrir outro elemento.',
    },
    {
      title: 'Não é magia de espaços',
      originalName: 'Impulses are not spells',
      body: 'Não há grimório nem espaços. Os “feitiços” são feitos de impulso, à vontade, enquanto a aura estiver ligada. Transbordamento é o preço dos mais fortes. Rituais continuam na aba Magias.',
    },
    {
      title: 'Extrair e refluir',
      originalName: 'Extract Element & Reflow',
      body: 'No 3º, Extrair Elemento fura imunidade/resistência elemental de uma criatura feita do seu elemento. No 11º, nas preparações, troque 1 impulso de um só elemento por outro do mesmo traço (2 no 17º).',
    },
    {
      title: 'Papel no grupo',
      body: 'Mágico de Constituição, 8 PV, armadura leve, só armas simples. Você é o canhão elemental confiável: sempre tem Explosão. Feito de classe já no 1º, além dos 2 impulsos do portão.',
    },
  ],
  lore: {
    summary:
      'O poder dos elementos sai de dentro: fogo, água, ar, terra, madeira que se torce, metal que corta. Um portão cinético no corpo canaliza os planos — os elementos saltam à mão, orbitam o corpo e atingem inimigos à vontade. Com o tempo, você domina de verdade os elementos escolhidos.',
    duringCombat:
      'Magia elemental o tempo todo. Sem limite de “quantas por dia”: você é o lançador confiável. Pode ter um leque para cada situação… ou duas ou três explosões favoritas.',
    duringSocial:
      'O elemento que você canaliza vaza no jeito: raiva de fogo, teimosia de montanha, motivos de vento, fluidez de água, comentários de lâmina, paciência de floresta.',
    whileExploring:
      'A ligação com os planos afia o mundo natural. Num ambiente cheio do seu elemento, ninguém te supera: você mexe nele de novo e de novo.',
    inDowntime:
      'Comungar com os elementos, treinar o controle, ou realinhar o portão (retreino) para outras manifestações.',
    youMight: [
      'Ter uma relação tensa com o portão — talvez ele tenha aparecido num trauma.',
      'Lutar para entender e controlar o poder elemental.',
      'Fazer parentesco com criaturas elementais ou se sentir em casa onde o elemento é forte.',
    ],
    othersProbably: [
      'Ficam pasmos com a quantidade de poder que você ainda tira.',
      'Deixam com você tudo que for do seu elemento — da tarefa miúda à política dos planos.',
      'Temem que você se consuma ou perca o controle das forças primais.',
    ],
  },
  levelTable: [
    {
      level: 1,
      features: [
        'Ancestralidade e origem',
        'Aumentos de atributo',
        'Proficiências iniciais',
        'Portão cinético',
        'Aura cinética',
        'Impulsos (Explosão Elemental, Cinese Básica)',
        'Feito de cinético',
      ],
    },
    { level: 2, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 3,
      features: [
        'Extrair elemento',
        'Feito geral',
        'Aumento de perícia',
        'Expertise em Vontade',
      ],
    },
    { level: 4, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 5,
      features: [
        'Feito de ancestralidade',
        'Aumentos de atributo',
        'Limiar do portão',
        'Aumento de perícia',
      ],
    },
    { level: 6, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 7,
      features: [
        'Feito geral',
        'Durabilidade cinética',
        'Expertise cinética',
        'Aumento de perícia',
      ],
    },
    { level: 8, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 9,
      features: [
        'Feito de ancestralidade',
        'Limiar do portão',
        'Expertise em Percepção',
        'Aumento de perícia',
      ],
    },
    {
      level: 10,
      features: ['Aumentos de atributo', 'Feito de cinético', 'Feito de perícia'],
    },
    {
      level: 11,
      features: [
        'Feito geral',
        'Rapidez cinética',
        'Refluxo de elementos',
        'Aumento de perícia',
        'Maestria com armas',
      ],
    },
    { level: 12, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 13,
      features: [
        'Feito de ancestralidade',
        'Limiar do portão',
        'Expertise em armadura leve',
        'Aumento de perícia',
        'Especialização em arma',
      ],
    },
    { level: 14, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 15,
      features: [
        'Aumentos de atributo',
        'Feito geral',
        'Durabilidade cinética maior',
        'Maestria cinética',
        'Aumento de perícia',
      ],
    },
    { level: 16, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 17,
      features: [
        'Feito de ancestralidade',
        'Refluxo duplo',
        'Limiar do portão',
        'Aumento de perícia',
      ],
    },
    { level: 18, features: ['Feito de cinético', 'Feito de perícia'] },
    {
      level: 19,
      features: [
        'Portão final',
        'Feito geral',
        'Lenda cinética',
        'Maestria em armadura leve',
        'Aumento de perícia',
      ],
    },
    {
      level: 20,
      features: ['Aumentos de atributo', 'Feito de cinético', 'Feito de perícia'],
    },
  ],
  extraTables: [
    {
      id: 'kineticist-elemental-blast',
      title: 'Explosão Elemental',
      subtitle: 'Rage of Elements',
      caption:
        'O tipo de dado e o dano vêm do elemento do portão (ar/fogo d6; terra/metal/água/madeira d8). Corpo a corpo soma FOR; 2 ações somam CON de status. +1 dado no 5º, 9º, 13º e 17º.',
      columns: [
        { key: 'levels', label: 'Níveis', align: 'center' },
        { key: 'dice', label: 'Dados', align: 'center' },
      ],
      rows: [
        { key: 'blast-1', level: 1, cells: ['1–4', '1'] },
        { key: 'blast-5', level: 5, cells: ['5–8', '2'] },
        { key: 'blast-9', level: 9, cells: ['9–12', '3'] },
        { key: 'blast-13', level: 13, cells: ['13–16', '4'] },
        { key: 'blast-17', level: 17, cells: ['17–20', '5'] },
      ],
    },
    {
      id: 'kineticist-blast-elements',
      title: 'Explosão por elemento',
      subtitle: 'Rage of Elements',
      caption:
        'Alcance à distância. Corpo a corpo usa o alcance natural. Escolha um dos tipos listados ao atacar.',
      columns: [
        { key: 'element', label: 'Elemento' },
        { key: 'die', label: 'Dado', align: 'center' },
        { key: 'damage', label: 'Dano' },
        { key: 'range', label: 'Alcance', align: 'center' },
      ],
      rows: [
        { key: 'el-air', cells: ['Ar', 'd6', 'Eletricidade ou cortante', '18 m'] },
        { key: 'el-earth', cells: ['Terra', 'd8', 'Concussão ou perfurante', '9 m'] },
        { key: 'el-fire', cells: ['Fogo', 'd6', 'Fogo', '18 m'] },
        { key: 'el-metal', cells: ['Metal', 'd8', 'Perfurante ou cortante', '9 m'] },
        { key: 'el-water', cells: ['Água', 'd8', 'Concussão ou frio', '9 m'] },
        { key: 'el-wood', cells: ['Madeira', 'd8', 'Concussão ou vitalidade', '9 m'] },
      ],
    },
  ],
  features: [
    {
      id: 'kineticist-kinetic-gate',
      name: 'Portão Cinético',
      originalName: 'Kinetic Gate',
      level: 1,
      description:
        'Escolha portão único (1 elemento, 2 impulsos de 1º daquele traço, junção de impulso) ou duplo (2 elementos, 1 impulso de cada). Os elementos funcionam mesmo onde normalmente não existiriam (fogo debaixo d’água, ar no vácuo).',
    },
    {
      id: 'kineticist-channel-elements',
      name: 'Canalizar Elementos',
      originalName: 'Channel Elements',
      level: 1,
      actionType: 'one',
      description:
        'Ativa a aura cinética (emanação de 3 m). Como parte da ação, pode usar Explosão Elemental de 1 ação ou um impulso de postura de 1 ação. A aura cai se você cair, usar transbordamento ou Dispensar. Sem aura: não usa impulsos novos; os já lançados e Sustentar continuam. Posturas de impulso acabam com a aura.',
    },
    {
      id: 'kineticist-elemental-blast',
      name: 'Explosão Elemental',
      originalName: 'Elemental Blast',
      level: 1,
      actionType: 'one',
      description:
        '1 ou 2 ações. Escolha um elemento do portão e um tipo de dano listado; ataque de impulso (corpo a corpo ou à distância) vs CA. Corpo a corpo: +FOR no dano. 2 ações: +CON de status no dano. Crítico: dano dobrado. +1 dado no 5º, 9º, 13º e 17º.',
    },
    {
      id: 'kineticist-base-kinesis',
      name: 'Cinese Básica',
      originalName: 'Base Kinesis',
      level: 1,
      actionType: 'two',
      description:
        'Alcance 9 m; alvo de Bulk desprezível ou leve, não mágico, não fixo, não atendido por quem recusa. Gerar (pedaço comum do plano), Mover (6 m; Sustentar para continuar) ou Suprimir (apagar chama, evaporar água — não bens duráveis). Sem dano nem condições. A cada 4 níveis: +4,5 m e +1 Bulk.',
    },
    {
      id: 'kineticist-extract-element',
      name: 'Extrair Elemento',
      originalName: 'Extract Element',
      level: 3,
      actionType: 'one',
      description:
        'Alvo a 9 m com traço de um dos seus elementos ou feito dele. 2d4 de dano (sem tipo) e Fortitude vs CD de classe: no sucesso ou pior, matéria entra na aura por 5 min (ou até a aura cair) — impulsos ignoram imunidade ao traço, −1 de circunstância em salvaguardas e CA vs seus impulsos, e resistência daquele tipo é ignorada (imunidade vira resistência = nível). +1d4 a cada 2 níveis.',
    },
    {
      id: 'kineticist-will-expertise',
      name: 'Expertise em Vontade',
      originalName: 'Will Expertise',
      level: 3,
      description: 'Proficiência em Vontade sobe para especialista.',
      effects: [{ kind: 'saveRank', save: 'will', rank: 'expert' }],
    },
    {
      id: 'kineticist-gates-threshold',
      name: 'Limiar do Portão',
      originalName: "Gate's Threshold",
      level: 5,
      description:
        'No 5º e a cada 4 níveis: aprofundar o portal (feito de impulso do nível ou menor, inclusive composto se tiver 2+ elementos, + uma junção de portão) ou forkar o caminho (novo elemento + 1 impulso daquele traço, sem composto).',
    },
    {
      id: 'kineticist-kinetic-durability',
      name: 'Durabilidade Cinética',
      originalName: 'Kinetic Durability',
      level: 7,
      description:
        'Fortitude sobe para mestre. Sucesso em Fortitude vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'master' }],
    },
    {
      id: 'kineticist-kinetic-expertise',
      name: 'Expertise Cinética',
      originalName: 'Kinetic Expertise',
      level: 7,
      description: 'CD de classe sobe para especialista.',
      effects: [{ kind: 'classDcRank', rank: 'expert' }],
    },
    {
      id: 'kineticist-perception-expertise',
      name: 'Expertise em Percepção',
      originalName: 'Perception Expertise',
      level: 9,
      description: 'Proficiência em Percepção sobe para especialista.',
      effects: [{ kind: 'perceptionRank', rank: 'expert' }],
    },
    {
      id: 'kineticist-kinetic-quickness',
      name: 'Rapidez Cinética',
      originalName: 'Kinetic Quickness',
      level: 11,
      description:
        'Reflexos sobem para mestre. Sucesso em Reflexos vira sucesso crítico.',
      effects: [{ kind: 'saveRank', save: 'reflex', rank: 'master' }],
    },
    {
      id: 'kineticist-reflow-elements',
      name: 'Refluxo de Elementos',
      originalName: 'Reflow Elements',
      level: 11,
      description:
        'Nas preparações, troque 1 feito de impulso com exatamente um traço elemental por outro do mesmo traço (regras de retreino). Não vale composto nem feitos que variam de elemento.',
    },
    {
      id: 'kineticist-weapon-expertise',
      name: 'Maestria com Armas',
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
      id: 'kineticist-light-armor-expertise',
      name: 'Expertise em Armadura Leve',
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
      id: 'kineticist-weapon-specialization',
      name: 'Especialização em Arma',
      originalName: 'Weapon Specialization',
      level: 13,
      description:
        '+2 de dano com armas e ataques desarmados em que você é especialista (+3 mestre, +4 lendário).',
    },
    {
      id: 'kineticist-greater-kinetic-durability',
      name: 'Durabilidade Cinética Maior',
      originalName: 'Greater Kinetic Durability',
      level: 15,
      description:
        'Fortitude sobe para lendário. Falha crítica vira falha. Falha em Fortitude contra efeito que causa dano: metade do dano.',
      effects: [{ kind: 'saveRank', save: 'fortitude', rank: 'legendary' }],
    },
    {
      id: 'kineticist-kinetic-mastery',
      name: 'Maestria Cinética',
      originalName: 'Kinetic Mastery',
      level: 15,
      description: 'CD de classe sobe para mestre.',
      effects: [{ kind: 'classDcRank', rank: 'master' }],
    },
    {
      id: 'kineticist-double-reflow',
      name: 'Refluxo Duplo',
      originalName: 'Double Reflow',
      level: 17,
      description: 'Ao usar Refluxo de Elementos, troque 2 feitos de impulso.',
    },
    {
      id: 'kineticist-final-gate',
      name: 'Portão Final',
      originalName: 'Final Gate',
      level: 19,
      description:
        'Se a aura estiver desligada, a primeira ação do turno vira Canalizar Elementos como ação livre (pode suprimir). Se você não puder agir, ainda canaliza, mas sem a Explosão/postura extra.',
    },
    {
      id: 'kineticist-kinetic-legend',
      name: 'Lenda Cinética',
      originalName: 'Kinetic Legend',
      level: 19,
      description: 'CD de classe sobe para lendário.',
      effects: [{ kind: 'classDcRank', rank: 'legendary' }],
    },
    {
      id: 'kineticist-light-armor-mastery',
      name: 'Maestria em Armadura Leve',
      originalName: 'Light Armor Mastery',
      level: 19,
      description:
        'Armadura leve e defesa sem armadura sobem para mestre.',
      effects: [
        {
          kind: 'defenseRank',
          categories: ['light', 'unarmored'],
          rank: 'master',
        },
      ],
    },
  ],
}
