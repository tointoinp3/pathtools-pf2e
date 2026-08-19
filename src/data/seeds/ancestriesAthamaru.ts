import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_HOWL_OF_THE_WILD_ID } from './sources'

export const ANCESTRY_ATHAMARU_ID = 'ancestry-athamaru'

export const HERITAGE_CORAL_ATHAMARU_ID = 'heritage-coral-athamaru'
export const HERITAGE_HOPEFUL_ATHAMARU_ID = 'heritage-hopeful-athamaru'
export const HERITAGE_KALEIDOSCOPIC_ATHAMARU_ID = 'heritage-kaleidoscopic-athamaru'
export const HERITAGE_QUILLED_ATHAMARU_ID = 'heritage-quilled-athamaru'

/** Athamaru — Howl of the Wild, Archives of Nethys ID 71 */
export const athamaruAncestry: Ancestry = {
  id: ANCESTRY_ATHAMARU_ID,
  name: 'Athamaru',
  originalName: 'Athamaru',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
  sourcePage: 17,
  hitPoints: 8,
  size: 'medium',
  speed: 20,
  attributeBoosts: [
    {
      id: 'athamaru-boost-str',
      label: 'Boost de Força',
      option: { kind: 'specific', attributes: ['strength'] },
    },
    {
      id: 'athamaru-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'athamaru-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['intelligence'],
  languages: {
    automatic: ['Comum', 'Talássico'],
    additionalOptions: ['Alghollthu', 'Azlanti', 'Feérico', 'Tien'],
    additionalFromIntelligence: true,
  },
  senses: [
    {
      id: 'athamaru-low-light',
      kind: 'lowLightVision',
      name: 'Visão na Penumbra',
      originalName: 'Low-Light Vision',
      description:
        'Você enxerga na penumbra como se fosse luz intensa, então ignora a condição oculto causada por penumbra.',
    },
  ],
  specialAbilities: [
    {
      id: 'athamaru-swim',
      name: 'Natação',
      originalName: 'Swim',
      actionType: 'passive',
      description: 'Deslocamento de natação 25 pés / 7,5 m.',
    },
  ],
  traits: ['Athamaru', 'Anfíbio', 'Humanoide'],
  lore: {
    summary:
      'Athamarus são humanoides semelhantes a peixes que formam comunidades unidas sob o mar, com aldeias de irmãos lideradas por uma matriarca comum. Praticam cultivo de subsistência de algas, treinam enguias como montarias e criam elaboradas obras de arte em coral.',
    youMight: [
      'Valorizar sua comunidade acima de quase tudo.',
      'Abordar estranhos com curiosidade calorosa.',
    ],
    othersProbably: [
      'Presumem que você domina sobrevivência subaquática.',
      'Acreditam que você é o culpado por odores desagradáveis.',
    ],
    physicalDescription:
      'Athamarus têm aparência distinta que lembra peixes. A pele vivamente colorida costuma combinar com os recifes onde constroem suas comunidades. Barbatanas, barbilhões e cristas ornamentam a silhueta exuberante. A enorme variedade de formatos de crista, padrões de escamas e estilos de nadadeira torna cada indivíduo único, mesmo quando a comunidade compartilha traços. Forasteiros notam com frequência um cheiro característico — feromônios usados para comunicação e defesa. Todos os athamarus conseguem transmitir emoções básicas por via química, e cada assentamento tem variações únicas que funcionam como impressão digital comunitária. Mestres da expressão feromonal comunicam conceitos filosóficos complexos só com química, papel semelhante ao de cantores virtuosos em outras culturas. Valorizam adornos naturais que misturam joalheria e modificação corporal: coral vivo guiado a crescer como brincos ou mangas, peças que circulam por gerações como história viva da comunidade.',
    society:
      'A maior população vive na nação submarina de Xidao, em Tian Xia, onde cidades-estado juram proteger umas às outras. Fora de Xidao, comunidades mais isoladas aparecem nas Shackles, perto de Sedeq e nos grandes golfos de Arcadia. Cada comunidade costuma ser formada por athamarus geneticamente relacionados, nascidos de um mesmo progenitor — a matriarca, líder responsável pela sobrevivência e continuidade. Quando ela se aproxima do fim da vida ou deixa de botar ovos, alguns membros passam por mudanças físicas (incluindo aumento de tamanho) para se candidatar à sucessão. Animais, sobretudo enguias domesticadas, integram a vida comunitária como parceiros. Interações com outras ancestralidades aquáticas costumam ser tensas por maus-tratos passados, mas a curiosidade por novas conexões permanece. Confiança de forasteiros se ganha com dificuldade e se perde com facilidade; muitos preferem fugir — às vezes desarraigando a comunidade inteira — a arriscar hostilidades abertas.',
    beliefs:
      'Por natureza comunitária, athamarus favorecem filosofias de conexão e ajuda mútua. No Mar Interior, costumam venerar Gozreh ou Erastil; em Tian Xia, buscam o favor de Hei Feng nas estações e na política, enquanto guardiões contra horrores das profundezas invocam a tríade Srikalis, Sritaming e Sribaril.',
    popularEdicts: [
      'Buscar novas experiências longe do local de nascimento',
      'Conduzir a comunidade a um futuro melhor',
    ],
    popularAnathema: [
      'Trair a comunidade ou prejudicá-la de propósito',
    ],
    sampleNames: [
      'Aussandor',
      'Cayiel',
      'Corlena',
      'Mithae',
      'Onteac',
      'Paquotal',
    ],
  },
  heritageIds: [
    HERITAGE_CORAL_ATHAMARU_ID,
    HERITAGE_HOPEFUL_ATHAMARU_ID,
    HERITAGE_KALEIDOSCOPIC_ATHAMARU_ID,
    HERITAGE_QUILLED_ATHAMARU_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=71',
}

export const athamaruHeritages: Heritage[] = [
  {
    id: HERITAGE_CORAL_ATHAMARU_ID,
    ancestryId: ANCESTRY_ATHAMARU_ID,
    name: 'Athamaru de Coral',
    originalName: 'Coral Athamaru',
    description:
      'Coral cobre partes do seu corpo, fornecendo uma camada natural de defesa. As placas de coral são armadura média do grupo placa que concedem +4 de bônus de item à CA, limite de Destreza +1, penalidade de teste −2, penalidade de Deslocamento −5 pés, valor de Força +3, e têm os traços aquadinâmico e conforto. Você nunca pode vestir outra armadura nem remover o coral. Pode gravar runas de armadura no coral.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 18,
    rulesSummary:
      'Armadura natural de coral (média, grupo placa): +4 CA, Dex +1, teste −2, Desloc. −5 pés, For +3, aquadinâmico e conforto; não veste outra armadura; pode gravar runas.',
    specialAbilities: [
      {
        id: 'coral-athamaru-plates',
        name: 'Placas de Coral',
        originalName: 'Coral Plates',
        actionType: 'passive',
        description:
          'Placas de coral funcionam como armadura média do grupo placa (+4 CA, Dex cap +1, check −2, Speed −5 pés, Str +3, aquadinâmico e conforto). Não podem ser removidas nem substituídas por outra armadura; runas de armadura podem ser gravadas nelas.',
      },
    ],
  },
  {
    id: HERITAGE_HOPEFUL_ATHAMARU_ID,
    ancestryId: ANCESTRY_ATHAMARU_ID,
    name: 'Athamaru Esperançoso',
    originalName: 'Hopeful Athamaru',
    description:
      'Você começou a se preparar para se tornar uma matriarca athamaru e provavelmente saiu da comunidade para se fortalecer como líder. Como parte da mudança física, você ficou substancialmente mais alto. Em vez de Médio, seu tamanho é Grande. Além disso, inspira esperança nos aliados: você tem uma aura de 10 pés que concede a qualquer aliado nela +1 de bônus de circunstância a salvaguardas contra medo; isso é um efeito de emoção e mental.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 18,
    rulesSummary:
      'Tamanho Grande (em vez de Médio); aura de 10 pés: +1 circunstância a salvaguardas de aliados vs medo (emoção/mental).',
    specialAbilities: [
      {
        id: 'hopeful-athamaru-large',
        name: 'Tamanho Grande',
        originalName: 'Large Size',
        actionType: 'passive',
        description:
          'Seu tamanho é Grande em vez de Médio. Isso substitui o tamanho padrão da ancestralidade athamaru.',
      },
      {
        id: 'hopeful-athamaru-aura',
        name: 'Aura de Esperança',
        originalName: 'Hopeful Aura',
        actionType: 'passive',
        description:
          'Aura de 10 pés: aliados recebem +1 de bônus de circunstância a salvaguardas contra medo (efeito de emoção e mental).',
      },
    ],
  },
  {
    id: HERITAGE_KALEIDOSCOPIC_ATHAMARU_ID,
    ancestryId: ANCESTRY_ATHAMARU_ID,
    name: 'Athamaru Caleidoscópico',
    originalName: 'Kaleidoscopic Athamaru',
    description:
      'Suas escamas formam um espectro de cores que cintila na luz. Em áreas de luz intensa ou penumbra, você recebe +1 de bônus de circunstância a testes de Performance. Também ganha a reação Ofuscar Buscador.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 18,
    rulesSummary:
      '+1 Performance sob luz intensa/penumbra; reação Ofuscar Buscador (azar): flat check de oculto rola duas vezes e usa o pior.',
    specialAbilities: [
      {
        id: 'kaleidoscopic-performance',
        name: 'Escamas Cintilantes',
        originalName: 'Shimmering Scales',
        actionType: 'passive',
        description:
          'Em luz intensa ou penumbra, +1 de bônus de circunstância a testes de Performance.',
      },
      {
        id: 'kaleidoscopic-dazzle-seeker',
        name: 'Ofuscar Buscador',
        originalName: 'Dazzle Seeker',
        actionType: 'reaction',
        trigger:
          'Uma criatura tenta um flat check para mirá-lo porque você está oculto dela.',
        description:
          '(Azar) Você lampeja suas escamas brilhantes nos olhos da criatura. Ela deve rolar o flat check duas vezes e usar o pior resultado.',
      },
    ],
  },
  {
    id: HERITAGE_QUILLED_ATHAMARU_ID,
    ancestryId: ANCESTRY_ATHAMARU_ID,
    name: 'Athamaru Espinhoso',
    originalName: 'Quilled Athamaru',
    description:
      'Espinhos afiados na cabeça podem perfurar inimigos profundamente. A maioria dos athamarus usa esses espinhos para defesa, mas uma cabeçada bem cronometrada pode ser devastadora. Você ganha um ataque desarmado corpo a corpo de espinhos que causa 1d6 de dano perfurante. Seus espinhos estão no grupo briga e têm os traços ágil, finura e desarmado.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_HOWL_OF_THE_WILD_ID,
    sourcePage: 18,
    rulesSummary:
      'Espinhos desarmados 1d6 perfurante (briga, ágil, finura, desarmado).',
    specialAbilities: [
      {
        id: 'quilled-athamaru-quills',
        name: 'Espinhos',
        originalName: 'Quills',
        actionType: 'passive',
        description:
          'Ataque desarmado de espinhos: 1d6 perfurante, grupo briga, traços ágil, finura e desarmado.',
      },
    ],
  },
]
