import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  SOURCE_PLAYER_CORE_ID,
  SOURCE_TIAN_XIA_CG_ID,
} from './sources'

export const ANCESTRY_GOBLIN_ID = 'ancestry-goblin'

export const HERITAGE_CHARHIDE_GOBLIN_ID = 'heritage-charhide-goblin'
export const HERITAGE_DOKKAEBI_GOBLIN_ID = 'heritage-dokkaebi-goblin'
export const HERITAGE_IRONGUT_GOBLIN_ID = 'heritage-irongut-goblin'
export const HERITAGE_RAZORTOOTH_GOBLIN_ID = 'heritage-razortooth-goblin'
export const HERITAGE_SNOW_GOBLIN_ID = 'heritage-snow-goblin'
export const HERITAGE_UNBREAKABLE_GOBLIN_ID = 'heritage-unbreakable-goblin'

/** Goblin — Player Core (Remaster), Archives of Nethys ID 62 */
export const goblinAncestry: Ancestry = {
  id: ANCESTRY_GOBLIN_ID,
  name: 'Goblin',
  originalName: 'Goblin',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 55,
  hitPoints: 6,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'goblin-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'goblin-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'goblin-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['wisdom'],
  languages: {
    automatic: ['Comum', 'Goblin'],
    additionalOptions: [
      'Dracônico',
      'Anão',
      'Gnomo',
      'Halfling',
      'Kholo',
      'Orc',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'goblin-darkvision',
      kind: 'darkvision',
      name: 'Visão no Escuro',
      originalName: 'Darkvision',
      description:
        'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa, embora sua visão na escuridão seja em preto e branco.',
    },
  ],
  specialAbilities: [],
  traits: ['Goblin', 'Humanoide'],
  lore: {
    summary:
      'Goblins são um povo baixo, briguento e cheio de energia, malvisto e temido por milênios. As histórias convolutas a que outros povos se apegam não interessam aos goblins. Este povo pequeno vive o momento e prefere contos exagerados a registros factuais. Virtudes goblinoides são presença, criatividade e honestidade: viver plenamente em vez de preocupar-se com o fim da jornada; contar histórias em vez de caçar detalhes; ser pequeno, mas sonhar grande. Muitos gostam de cantos, fogo e comida, e odeiam leitura, cães e cavalos — embora outros tenham paixões mais complexas, como mexer em sucata ou inventar lanches e explosivos com quase qualquer coisa.',
    youMight: [
      'Esforçar-se para provar que tem lugar entre outros povos civilizados — talvez até para si mesmo.',
      'Aliviar o peso emocional dos outros (e se divertir) com travessuras e pegadinhas.',
    ],
    othersProbably: [
      'Trabalham para garantir que você não ateie fogo em coisas demais — por acidente ou de propósito.',
      'Se perguntam como você sobrevive dadas as escolhas gastronômicas típicas, a imprudência e o amor pelo fogo.',
    ],
    physicalDescription:
      'Goblins são humanoides atarracados, de corpo grande, membros magros e cabeças enormes com orelhas grandes e olhos vermelhos miúdos. A pele vai do verde ao cinza e ao azul; costumam ter cicatrizes, furúnculos e erupções. Medem em média cerca de 90 cm. A maioria é careca, com pouco ou nenhum pelo. Dentes serrilhados caem e regeneram sem parar, e o metabolismo rápido faz com que comam e cochilem o tempo todo. Mutações são mais comuns entre goblins, e mutações marcantes costumam ser vistas como sinal de poder ou fortuna. Alcançam a adolescência por volta dos 3 anos e a idade adulta 4 ou 5 anos depois. Podem viver 50 anos ou mais, mas sem quem os proteja uns dos outros (ou de si mesmos), poucos passam dos 20.',
    society:
      'Goblins tendem a seguir líderes fortes, formando pequenas tribos — raramente com mais de uma centena. Quanto maior a tribo, mais diligente o líder precisa ser para manter a ordem, tarefa notoriamente difícil. Brincadeira e criatividade importam mais que produtividade ou estudo; acampamentos explodem em cantos e risadas. Criam laços estreitos com aliados e protegem com ferocidade quem os protegeu ou ofereceu um ouvido simpático. Por proteção própria, costumam assumir que povos mais altos — os “pernaltas” — não os tratarão bem. Aprender a confiar em pernaltas é difícil, e só em anos recentes essa parceria virou opção real. Nomes goblinoides são simples: fáceis de pronunciar, curtos o bastante para gritar sem perder o fôlego e gostosos de dizer. Quem nomeia muitas vezes escolhe uma palavra que rima com algo de que gosta, para facilitar canções.',
    beliefs:
      'Mesmo os goblins de melhor intenção têm dificuldade em seguir regras, então aventureiros goblins muitas vezes não sabem se estão do lado certo da lei. Culto organizado também os confunde; a maioria prefere escolher as próprias divindades — monstros poderosos, maravilhas naturais ou qualquer fascínio, às vezes até atribuindo status divino a outros goblins notáveis. Quem convive com outros povos pode adotar parte de suas crenças, e muitos aventureiros goblins adoram Cayden Cailean.',
    popularEdicts: [
      'Inventar canções para cada ocasião',
      'Transformar lixo em seus tesouros',
      'Resolver problemas com fogo',
    ],
    popularAnathema: ['Confiar em cão ou cavalo', 'Aprender a ler'],
    sampleNames: [
      'Ak',
      'Bokker',
      'Frum',
      'Guzmuk',
      'Krobby',
      'Loohi',
      'Mazmord',
      'Neeka',
      'Omgot',
      'Ranzak',
      'Rickle',
      'Tup',
      'Wakla',
      'Yonk',
      'Zibini',
    ],
  },
  heritageIds: [
    HERITAGE_CHARHIDE_GOBLIN_ID,
    HERITAGE_DOKKAEBI_GOBLIN_ID,
    HERITAGE_IRONGUT_GOBLIN_ID,
    HERITAGE_RAZORTOOTH_GOBLIN_ID,
    HERITAGE_SNOW_GOBLIN_ID,
    HERITAGE_UNBREAKABLE_GOBLIN_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=62',
}

export const goblinHeritages: Heritage[] = [
  {
    id: HERITAGE_CHARHIDE_GOBLIN_ID,
    ancestryId: ANCESTRY_GOBLIN_ID,
    name: 'Goblin Pele-Carbonizada',
    originalName: 'Charhide Goblin',
    description:
      'Seus ancestrais sempre tiveram conexão com o fogo e uma pele mais grossa, o que permite resistir a queimaduras. Você recebe resistência a fogo igual à metade do seu nível (mínimo 1). Também se recupera mais facilmente de estar em chamas: o teste simples para remover dano de fogo persistente é CD 10 em vez de CD 15, reduzido para CD 5 se outra criatura usar uma ação particularmente adequada para ajudar.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 55,
    rulesSummary:
      'Resistência a fogo = metade do nível (mín. 1); CD 10 (ou 5) para acabar com fogo persistente.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'fire',
        label: 'Resistência a fogo',
      },
    ],
  },
  {
    id: HERITAGE_DOKKAEBI_GOBLIN_ID,
    ancestryId: ANCESTRY_GOBLIN_ID,
    name: 'Goblin Dokkaebi',
    originalName: 'Dokkaebi Goblin',
    description:
      'Seus ancestrais dominaram magia baseada em ilusão, dando-lhe compreensão inata dela. Você pode conjurar Figmento como truque oculto inato à vontade. Um truque é elevado a um posto igual à metade do seu nível (arredondado para cima). Também recebe +1 de bônus de circunstância a salvaguardas de Vontade contra ilusões.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 34,
    rulesSummary:
      'Figmento (oculto inato) à vontade; +1 Vontade vs ilusões.',
    specialAbilities: [
      {
        id: 'dokkaebi-figment',
        name: 'Figmento',
        originalName: 'Figment',
        actionType: 'passive',
        frequency: 'À vontade',
        description:
          'Você conjura o truque Figmento como magia oculta inata à vontade, elevado à metade do seu nível (arredondado para cima).',
      },
    ],
  },
  {
    id: HERITAGE_IRONGUT_GOBLIN_ID,
    ancestryId: ANCESTRY_GOBLIN_ID,
    name: 'Goblin Estômago de Ferro',
    originalName: 'Irongut Goblin',
    description:
      'Você sobrevive com comida que a maioria consideraria estragada. Pode se manter alimentado com refeições ruins em um assentamento enquanto houver lixo disponível, sem usar a atividade de intervalo Subsistir. Pode comer e beber mesmo enjoado. Recebe +2 de bônus de circunstância a salvaguardas contra aflições, contra ganhar a condição enjoado e para remover enjoado. Quando obtém sucesso em uma salvaguarda de Fortitude afetada por este bônus, o resultado vira sucesso crítico. Todos esses benefícios se aplicam apenas quando a aflição ou condição veio de algo que você ingeriu.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 55,
    rulesSummary:
      '+2 vs aflições/enjoado por ingestão; sucesso→crítico em Fortitude afetada; Subsistir com lixo.',
  },
  {
    id: HERITAGE_RAZORTOOTH_GOBLIN_ID,
    ancestryId: ANCESTRY_GOBLIN_ID,
    name: 'Goblin Dente-de-Navalha',
    originalName: 'Razortooth Goblin',
    description:
      'Os dentes da sua família são armas formidáveis. Você ganha um ataque desarmado de mandíbulas que causa 1d6 de dano perfurante. Suas mandíbulas estão no grupo briga e têm os traços finura e desarmado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 55,
    rulesSummary:
      'Mandíbulas desarmadas 1d6 perfurante (briga, finura, desarmado).',
    specialAbilities: [
      {
        id: 'razortooth-jaws',
        name: 'Mandíbulas',
        originalName: 'Jaws',
        actionType: 'passive',
        description:
          'Ataque desarmado de mandíbulas: 1d6 perfurante, grupo briga, traços finura e desarmado.',
      },
    ],
  },
  {
    id: HERITAGE_SNOW_GOBLIN_ID,
    ancestryId: ANCESTRY_GOBLIN_ID,
    name: 'Goblin da Neve',
    originalName: 'Snow Goblin',
    description:
      'Você está aclimatado a terras gélidas, com pele do azul-céu ao azul-marinho e pelo azul. Recebe resistência a frio igual à metade do seu nível (mínimo 1). Trata efeitos ambientais de frio como se fossem um grau menos extremos (frio incrível vira extremo, extremo vira severo, e assim por diante).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 55,
    rulesSummary:
      'Resistência a frio = metade do nível (mín. 1). Frio ambiental um grau menos extremo.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'cold',
        label: 'Resistência a frio',
      },
    ],
  },
  {
    id: HERITAGE_UNBREAKABLE_GOBLIN_ID,
    ancestryId: ANCESTRY_GOBLIN_ID,
    name: 'Goblin Inquebrável',
    originalName: 'Unbreakable Goblin',
    description:
      'Você se recupera facilmente de ferimentos graças a um crânio excepcionalmente grosso, ossos cartilaginosos ou alguma outra bênção ambígua. Você recebe 10 PV da ancestralidade em vez de 6. Quando cai, reduz o dano de queda como se tivesse caído metade da distância.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 55,
    rulesSummary: '10 PV de ancestralidade (em vez de 6); dano de queda pela metade da distância.',
    hitPointsOverride: 10,
    specialAbilities: [
      {
        id: 'unbreakable-ancestry-hp',
        name: 'Vitalidade Inquebrável',
        originalName: 'Unbreakable Hit Points',
        actionType: 'passive',
        description:
          'Você recebe 10 PV da ancestralidade em vez de 6. Ao cair, trate dano de queda como se a distância fosse a metade.',
      },
    ],
  },
]
