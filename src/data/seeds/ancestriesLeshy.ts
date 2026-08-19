import type { Ancestry, Heritage } from '@/types/ancestry'
import {
  SOURCE_PLAYER_CORE_ID,
  SOURCE_TIAN_XIA_CG_ID,
} from './sources'

export const ANCESTRY_LESHY_ID = 'ancestry-leshy'

export const HERITAGE_CACTUS_LESHY_ID = 'heritage-cactus-leshy'
export const HERITAGE_CHRYSANTHEMUM_LESHY_ID = 'heritage-chrysanthemum-leshy'
export const HERITAGE_FRUIT_LESHY_ID = 'heritage-fruit-leshy'
export const HERITAGE_FUNGUS_LESHY_ID = 'heritage-fungus-leshy'
export const HERITAGE_GOURD_LESHY_ID = 'heritage-gourd-leshy'
export const HERITAGE_LEAF_LESHY_ID = 'heritage-leaf-leshy'
export const HERITAGE_LOTUS_LESHY_ID = 'heritage-lotus-leshy'
export const HERITAGE_PEACHCHILD_LESHY_ID = 'heritage-peachchild-leshy'
export const HERITAGE_ROOT_LESHY_ID = 'heritage-root-leshy'
export const HERITAGE_SEAWEED_LESHY_ID = 'heritage-seaweed-leshy'
export const HERITAGE_VINE_LESHY_ID = 'heritage-vine-leshy'

/** Leshy — Player Core (Remaster), Archives of Nethys ID 65 */
export const leshyAncestry: Ancestry = {
  id: ANCESTRY_LESHY_ID,
  name: 'Leshy',
  originalName: 'Leshy',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 66,
  hitPoints: 8,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'leshy-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'leshy-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'leshy-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['intelligence'],
  languages: {
    automatic: ['Comum', 'Feérico'],
    additionalOptions: [
      'Dracônico',
      'Elfo',
      'Gnomo',
      'Goblin',
      'Halfling',
      'Sakvroth',
    ],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'leshy-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'leshy-plant-nourishment',
      name: 'Nutrição Vegetal',
      originalName: 'Plant Nourishment',
      actionType: 'passive',
      description:
        'Você se nutre como as plantas ou fungos do seu tipo de corpo — fotossíntese, minerais pelas raízes ou matéria em decomposição. Em geral não precisa pagar por comida. Se depende de fotossíntese e fica 1 semana sem luz solar, começa a passar fome. Pode se nutrir de frascos especiais de luz solar (custam 10× rações padrão, ou 40 pe).',
    },
  ],
  traits: ['Leshy', 'Planta'],
  lore: {
    summary:
      'Leshies são espíritos imortais da natureza colocados em pequenos corpos vegetais, em busca de experienciar o mundo.',
    youMight: [
      'Atuar como agente itinerante de guardiões naturais que não podem deixar seus territórios.',
      'Incentivar civilizações a cooperar com a natureza e construir cidades de forma ecológica.',
    ],
    othersProbably: [
      'Veem você como uma curiosidade por causa de suas origens espirituais.',
      'Assumem que você só conhece a natureza e desconhece civilização e sociedade.',
    ],
    physicalDescription:
      'Leshies são tão variados quanto o material usado para criar seus vasos, em geral um amálgama bizarro de plantas ou fungos. Corpos vagamente humanoides, com características do vegetal ou fungo de origem. Um leshy típico tem cerca de 90 cm. Começam a vida já adultos e não envelhecem.',
    society:
      'Para a maioria dos leshies, família não é questão de nascimento, mas de laços de lealdade e amizade. São aliados dedicados, com pouca tolerância a quem destrói a natureza. Aceitam de bom grado quem conquista sua confiança, e esperam que a família cuide deles e de seus protegidos naturais. Agrupam-se em categorias semelhantes a etnias, mas ligadas a características do espírito, não ao corpo físico — certos espíritos gravitam a certos vasos, sem absoluta necessidade. Gênero é determinado pelo espírito: alguns são exclusivamente masculinos ou femininos; muitos se consideram ambos; outros (especialmente fungos) têm expressões mais complexas ou rejeitam o conceito. Escolhem e mudam de nome várias vezes ao longo da vida.',
    beliefs:
      'As crenças dos leshies costumam centrar-se no mundo natural. Os mais filosóficos inclinam-se à Fé Verde, e Gozreh é a divindade mais popular entre os fiéis. Alguns também veneram homens verdes, poderosos espíritos da natureza.',
    popularEdicts: [
      'Experienciar o mundo físico',
      'Formar uma família pela lealdade e confiança',
      'Proteger partes da natureza que você personifica',
    ],
    popularAnathema: ['Abraçar magia ou influências antinaturais'],
    sampleNames: [
      'Escarlate no Verão',
      'Tecelão do Conto Verdejante',
      'Caçador à Espreita',
      'Mestre Bebe-Sol',
      'Céu do Meio-Dia Canção Noturna',
      'Galho de Pinheiro Nevado',
      'Correntezas em Cascata',
    ],
  },
  heritageIds: [
    HERITAGE_CACTUS_LESHY_ID,
    HERITAGE_CHRYSANTHEMUM_LESHY_ID,
    HERITAGE_FRUIT_LESHY_ID,
    HERITAGE_FUNGUS_LESHY_ID,
    HERITAGE_GOURD_LESHY_ID,
    HERITAGE_LEAF_LESHY_ID,
    HERITAGE_LOTUS_LESHY_ID,
    HERITAGE_PEACHCHILD_LESHY_ID,
    HERITAGE_ROOT_LESHY_ID,
    HERITAGE_SEAWEED_LESHY_ID,
    HERITAGE_VINE_LESHY_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=65',
}

export const leshyHeritages: Heritage[] = [
  {
    id: HERITAGE_CACTUS_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Cacto',
    originalName: 'Cactus Leshy',
    description:
      'Espinhos cobrem seu corpo. Você ganha um ataque desarmado de espinho que causa 1d6 de dano perfurante. Seus espinhos estão no grupo briga e têm os traços finura e desarmado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary: 'Espinho desarmado 1d6 perfurante (briga, finura, desarmado).',
    specialAbilities: [
      {
        id: 'cactus-spine',
        name: 'Espinho',
        originalName: 'Spine',
        actionType: 'passive',
        description:
          'Ataque desarmado de espinho: 1d6 perfurante, grupo briga, traços finura e desarmado.',
      },
    ],
  },
  {
    id: HERITAGE_CHRYSANTHEMUM_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Crisântemo',
    originalName: 'Chrysanthemum Leshy',
    description:
      'Você parece uma criança humana, mas com uma grande coroa de crisântemos na cabeça, ornamentada como a de um imperador. As pétalas têm propriedades medicinais: +1 de bônus de circunstância a salvaguardas contra veneno. Durante as preparações diárias, pode colher algumas pétalas sem se ferir e prepará-las em água fresca para criar um único antídoto menor na forma de chá. No 6º nível, cria antídoto moderado; no 10º, maior; no 14º, superior. O chá perde o efeito se não for consumido antes das próximas preparações diárias.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 42,
    rulesSummary:
      '+1 vs veneno; 1 antídoto (chá) nas preparações (escala com nível).',
    specialAbilities: [
      {
        id: 'chrysanthemum-antidote-tea',
        name: 'Chá Antídoto',
        originalName: 'Antidote Tea',
        actionType: 'passive',
        frequency: 'Preparações diárias',
        description:
          'Cria 1 antídoto menor (chá); escala para moderado/maior/superior nos níveis 6/10/14. Expira nas próximas preparações.',
      },
    ],
  },
  {
    id: HERITAGE_FRUIT_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Fruto',
    originalName: 'Fruit Leshy',
    description:
      'Seu corpo produz continuamente pequenos frutos imbuídos de magia primal. Ao amanhecer de cada dia, um novo fruto amadurece. Você ou um aliado pode removê-lo com uma ação Interagir. Se uma criatura viva que possa se nutrir de frutos consumi-lo com Interagir na próxima hora, ela recupera 1d8 PV, mais 1d8 adicional a cada 2 níveis seus além do 1º. O efeito tem os traços cura e vitalidade.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary:
      '1 fruto/dia: cura 1d8 + 1d8/2 níveis além do 1º (cura, vitalidade).',
    specialAbilities: [
      {
        id: 'fruit-healing-fruit',
        name: 'Fruto Curativo',
        originalName: 'Healing Fruit',
        actionType: 'passive',
        frequency: '1 por amanhecer',
        description:
          'Fruto que cura 1d8 (+1d8 a cada 2 níveis além do 1º) se consumido em 1 hora.',
      },
    ],
  },
  {
    id: HERITAGE_FUNGUS_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Fungo',
    originalName: 'Fungus Leshy',
    description:
      'Seu corpo foi feito de fungos que crescem na sombra de cavernas e árvores; você se sente em casa em cavernas e tocas escuras. Você ganha Visão no Escuro. Perde o traço planta e ganha o traço fungo.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary: 'Visão no Escuro; perde planta, ganha fungo.',
    traits: ['Fungo'],
    specialAbilities: [
      {
        id: 'fungus-darkvision',
        name: 'Visão no Escuro',
        originalName: 'Darkvision',
        actionType: 'passive',
        description:
          'Você enxerga na escuridão e na penumbra tão bem quanto sob luz intensa (visão na escuridão em preto e branco). Perde o traço planta e ganha o traço fungo.',
      },
    ],
  },
  {
    id: HERITAGE_GOURD_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Cabaça',
    originalName: 'Gourd Leshy',
    description:
      'Você tem uma grande cabaça como crânio e, sem cérebro físico, usa o espaço dentro da cabeça. Pode guardar uma coleção de até 1 Bulk de objetos na cabeça. A CD de testes para Roubar objetos de dentro da cabeça aumenta em 4. Se guardar só um objeto, pode sacá-lo sem esforço para a mão como parte de outra ação para usá-lo — essa outra ação ganha o traço manipular.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary:
      'Guarda até 1 Bulk na cabeça; +4 CD vs Roubar; sacar 1 item junto com outra ação (manipular).',
  },
  {
    id: HERITAGE_LEAF_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Folha',
    originalName: 'Leaf Leshy',
    description:
      'Seu corpo é feito sobretudo de folhagem natural e, como uma folha caindo da árvore, você aterrissa de quedas com graça especial. Não sofre dano de queda, independentemente da distância.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary: 'Imune a dano de queda.',
  },
  {
    id: HERITAGE_LOTUS_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Lótus',
    originalName: 'Lotus Leshy',
    description:
      'Você flutua sem esforço na superfície da água. Pode andar na superfície de água parada e outros líquidos não danosos, movendo-se com metade do Deslocamento normal. Também pode tentar Equilibrar-se para atravessar água corrente, usando a CD de um teste de Nadar para aquela água. Nesse caso, não pode se mover mais rápido que metade do Deslocamento; em falha ou falha crítica, cai na água (em vez dos efeitos normais).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary:
      'Andar sobre líquidos parados (½ desloc.); Equilibrar em água corrente.',
  },
  {
    id: HERITAGE_PEACHCHILD_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Filho-do-Pêssego',
    originalName: 'Peachchild Leshy',
    description:
      'Seu espírito leshy tomou forma num pêssego enorme antes de seu corpo emergir dele — talvez emulando um herói do passado nascido do mesmo modo. Você parece uma criança humana, com tom de pele sempre rosado e talvez algumas folhas de pêssego no corpo. O espírito da natureza em você tranquiliza certos animais: pode fazer perguntas e receber respostas de animais domésticos e de criação (cães, faisões etc.), e usar Diplomacia para Causar Boa Impressão e Fazer Pedidos a eles. A maioria dos animais domesticados começa indiferente ou amigável e lhe dá tempo de falar; outros animais reagem como a qualquer aventureiro.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 42,
    rulesSummary:
      'Falar / Diplomacia com animais domésticos e de criação.',
  },
  {
    id: HERITAGE_ROOT_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Raiz',
    originalName: 'Root Leshy',
    description:
      'Seu corpo é feito de raízes robustas que o fixam ao solo. Você recebe 10 PV da ancestralidade em vez de 8. Pode ficar 2 semanas sem luz solar antes de começar a passar fome. Recebe +2 de bônus de circunstância à CD de Fortitude ou Reflexos contra tentativas de Reposicionar, Empurrar ou Derrubar você. Esse bônus também se aplica a salvaguardas contra magias ou efeitos que tentem movê-lo ou derrubá-lo.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary:
      '10 PV (em vez de 8); 2 semanas sem sol; +2 CD/salvaguardas vs Reposicionar, Empurrar, Derrubar, efeitos de movimento forçado e a condição Caído.',
    hitPointsOverride: 10,
    specialAbilities: [
      {
        id: 'root-ancestry-hp',
        name: 'Vitalidade Enraizada',
        originalName: 'Root Hit Points',
        actionType: 'passive',
        description: 'Você recebe 10 PV da ancestralidade em vez de 8.',
      },
    ],
  },
  {
    id: HERITAGE_SEAWEED_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Alga',
    originalName: 'Seaweed Leshy',
    description:
      'Seu corpo é feito de algas entrelaçadas; você se sente tão à vontade debaixo d’água quanto em terra. Ganha deslocamento de natação de 6 metros e pode sempre respirar debaixo d’água. Porém, seu deslocamento terrestre é reduzido em 1,5 m (para 6 m na maioria dos leshies alga).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 67,
    rulesSummary:
      'Natação 6 m; respirar na água; −1,5 m no deslocamento terrestre.',
    specialAbilities: [
      {
        id: 'seaweed-swim',
        name: 'Natação Natural',
        originalName: 'Swim Speed',
        actionType: 'passive',
        description:
          'Deslocamento de natação 6 m; respira debaixo d’água; −1,5 m no deslocamento terrestre.',
      },
    ],
  },
  {
    id: HERITAGE_VINE_LESHY_ID,
    ancestryId: ANCESTRY_LESHY_ID,
    name: 'Leshy Cipó',
    originalName: 'Vine Leshy',
    description:
      'Seus cipós preênseis concedem habilidade excepcional para escalar. Não precisa ter nenhuma mão livre para Escalar. Além disso, se obtiver sucesso em um teste de Atletismo para Escalar, o resultado vira sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 68,
    rulesSummary:
      'Escalar sem mãos livres; sucesso→crítico ao Escalar.',
  },
]
