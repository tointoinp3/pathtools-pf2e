import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_PLAYER_CORE_ID } from './sources'

export const ANCESTRY_HALFLING_ID = 'ancestry-halfling'

export const HERITAGE_GUTSY_HALFLING_ID = 'heritage-gutsy-halfling'
export const HERITAGE_HILLOCK_HALFLING_ID = 'heritage-hillock-halfling'
export const HERITAGE_JINXED_HALFLING_ID = 'heritage-jinxed-halfling'
export const HERITAGE_NOMADIC_HALFLING_ID = 'heritage-nomadic-halfling'
export const HERITAGE_TWILIGHT_HALFLING_ID = 'heritage-twilight-halfling'
export const HERITAGE_WILDWOOD_HALFLING_ID = 'heritage-wildwood-halfling'

/** Halfling — Player Core (Remaster), Archives of Nethys ID 63 */
export const halflingAncestry: Ancestry = {
  id: ANCESTRY_HALFLING_ID,
  name: 'Halfling',
  originalName: 'Halfling',
  rarity: 'common',
  provenance: { type: 'official' },
  sourceId: SOURCE_PLAYER_CORE_ID,
  sourcePage: 59,
  hitPoints: 6,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'halfling-boost-dex',
      label: 'Boost de Destreza',
      option: { kind: 'specific', attributes: ['dexterity'] },
    },
    {
      id: 'halfling-boost-wis',
      label: 'Boost de Sabedoria',
      option: { kind: 'specific', attributes: ['wisdom'] },
    },
    {
      id: 'halfling-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['strength'],
  languages: {
    automatic: ['Comum', 'Halfling'],
    additionalOptions: ['Anão', 'Elfo', 'Gnomo', 'Goblin'],
    additionalFromIntelligence: true,
  },
  senses: [],
  specialAbilities: [
    {
      id: 'halfling-keen-eyes',
      name: 'Olhos Aguçados',
      originalName: 'Keen Eyes',
      actionType: 'passive',
      description:
        'Seus olhos são afiados e captam detalhes de criaturas ocultadas ou mesmo invisíveis que outros perderiam. Você recebe +2 de bônus de circunstância ao usar a ação Procurar para achar criaturas escondidas ou não detectadas a até 9 metros. Ao mirar um oponente ocultado ou escondido de você, reduza a CD do teste simples para 3 (ocultado) ou 9 (escondido).',
    },
  ],
  traits: ['Halfling', 'Humanoide'],
  lore: {
    summary:
      'Halflings são um povo baixo e resiliente, de curiosidade e humor notáveis. Não reivindicam um lar próprio e controlam poucos assentamentos maiores que vilarejos. Em vez disso, vivem com frequência entre humanos em cidades maiores, abrindo pequenas comunidades ao lado de povos mais altos. Otimistas, alegres e movidos por forte espírito aventureiro, compensam a baixa estatura com bravata de sobra. Excitáveis e descontraídos ao mesmo tempo, são oportunistas do melhor tipo — suas paixões favorecem a alegria sobre a violência. Embora a curiosidade às vezes os leve à aventura, também carregam laços fortes com casa e lar.',
    youMight: [
      'Dar-se bem com muita gente diferente e gostar de fazer novos amigos.',
      'Achar difícil resistir à curiosidade, mesmo sabendo que isso vai dar problema.',
    ],
    othersProbably: [
      'Apreciam sua capacidade de sempre achar um lado bom ou algo para rir, por mais grave que seja a situação.',
      'Acham que você traz boa sorte.',
    ],
    physicalDescription:
      'Halflings são humanoides baixos que lembram vagamente humanos menores. Raramente passam de cerca de 90 cm. As proporções variam: alguns parecem humanos adultos encurtados com cabeça um pouco maior; outros têm proporções mais próximas de uma criança humana. A maioria prefere andar descalça e, com o tempo, desenvolve solas calejadas. Tufo de cabelo espesso, muitas vezes cacheado, aquece o topo dos pés largos e bronzeados. Tons de pele tendem a tons ricos e dourados como âmbar ou carvalho; o cabelo vai do loiro dourado claro ao preto-corvo. Alcançam a maturidade física por volta dos 20 anos. Um halfling típico vive cerca de 150 anos.',
    society:
      'Apesar da natureza jovial e amigável, halflings não costumam se congregar em massa. Têm poucos centros culturais no Mar Interior e preferem se tecer pelas sociedades do mundo. Muitos vivem de trabalho braçal ou empregos simples de serviço. Alguns rejeitam a cidade e seguem a estrada em busca de fortuna e fama, viajando em pequenos grupos que compartilham dificuldades e prazeres simples entre amigos e família. Nomes costumam ter duas ou três sílabas, som suave e sem consoantes duras — nomes longos ou complexos demais soam arrogantes para o povo, embora compreendam que elfos e humanos tenham nomes mais longos.',
    beliefs:
      'Halflings são leais a amigos e família, mas não têm medo de fazer o necessário para sobreviver. Onde quer que vão, misturam-se à sociedade local, adaptando-se à cultura dominante e acrescentando seus toques únicos — uma difusão cultural que enriquece ambos. Favorecem deuses que concedem sorte, como Desna, ou encorajam astúcia, como Norgorber; muitos apreciam Cayden Cailean como libertador, além de religiões comuns entre os povos ao redor.',
    popularEdicts: [
      'Compartilhar boas refeições com amigos e estranhos',
      'Enfrentar valentões e opressores',
      'Permanecer fora do radar dos povos mais altos',
    ],
    popularAnathema: ['Dar sua sorte como certa'],
    sampleNames: [
      'Anafa',
      'Antal',
      'Bellis',
      'Boram',
      'Etune',
      'Filiu',
      'Jamir',
      'Kaleb',
      'Linna',
      'Marra',
      'Miro',
      'Rillka',
      'Sistra',
      'Sumak',
      'Yamyra',
    ],
  },
  heritageIds: [
    HERITAGE_GUTSY_HALFLING_ID,
    HERITAGE_HILLOCK_HALFLING_ID,
    HERITAGE_JINXED_HALFLING_ID,
    HERITAGE_NOMADIC_HALFLING_ID,
    HERITAGE_TWILIGHT_HALFLING_ID,
    HERITAGE_WILDWOOD_HALFLING_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=63',
}

export const halflingHeritages: Heritage[] = [
  {
    id: HERITAGE_GUTSY_HALFLING_ID,
    ancestryId: ANCESTRY_HALFLING_ID,
    name: 'Halfling Corajoso',
    originalName: 'Gutsy Halfling',
    description:
      'Sua linhagem é conhecida por manter a cabeça fria e afastar o medo quando a situação aperta. Quando obtém sucesso em uma salvaguarda contra um efeito de emoção, o resultado vira sucesso crítico.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 59,
    rulesSummary:
      'Sucesso → sucesso crítico em salvaguardas contra efeitos de emoção.',
  },
  {
    id: HERITAGE_HILLOCK_HALFLING_ID,
    ancestryId: ANCESTRY_HALFLING_ID,
    name: 'Halfling do Outeiro',
    originalName: 'Hillock Halfling',
    description:
      'Acostumado a uma vida calma nos outeiros, seu povo acha descanso e relaxamento especialmente restauradores — sobretudo com confortos caseiros. Ao recuperar PV durante a noite, some seu nível aos PV recuperados. Quando alguém usa Medicina para Tratar seus Ferimentos, você pode comer um lanche para somar seu nível aos PV recuperados com o tratamento.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 59,
    rulesSummary:
      '+nível de PV ao descansar à noite; +nível ao Tratar Ferimentos se comer um lanche.',
  },
  {
    id: HERITAGE_JINXED_HALFLING_ID,
    ancestryId: ANCESTRY_HALFLING_ID,
    name: 'Halfling Amaldiçoado',
    originalName: 'Jinxed Halfling',
    description:
      'Você nasceu com uma bênção estranha: sem a sorte típica dos halflings, em vez disso manipula a fortuna alheia. Nunca pode pegar o feito Sorte Halfling, e ganha a atividade Azarar.',
    rarity: 'uncommon',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 59,
    rulesSummary:
      'Não pode pegar Sorte Halfling; 1×/dia Azarar (desajeitado 1/2, Vontade).',
    specialAbilities: [
      {
        id: 'jinx',
        name: 'Azarar',
        originalName: 'Jinx',
        actionType: 'two',
        frequency: '1 vez por dia',
        description:
          'Você amaldiçoa outra criatura com desajeitamento (alcance 9 m; precisa ver o alvo). O alvo faz salvaguarda de Vontade contra sua CD de classe ou de magia (a maior). Sucesso: não afetado e temporariamente imune por 24 horas. Falha: desajeitado 1 por 1 minuto. Falha crítica: desajeitado 2 por 1 minuto.',
      },
    ],
  },
  {
    id: HERITAGE_NOMADIC_HALFLING_ID,
    ancestryId: ANCESTRY_HALFLING_ID,
    name: 'Halfling Nômade',
    originalName: 'Nomadic Halfling',
    description:
      'Seus ancestrais viajaram de lugar em lugar por gerações, nunca contentes em se estabelecer. Você ganha dois idiomas adicionais à escolha, entre os comuns e incomuns disponíveis a você, e cada vez que pegar o feito Multilíngue ganha mais um idioma novo.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 59,
    rulesSummary:
      '+2 idiomas (comum/incomum); Multilíngue concede +1 idioma extra.',
  },
  {
    id: HERITAGE_TWILIGHT_HALFLING_ID,
    ancestryId: ANCESTRY_HALFLING_ID,
    name: 'Halfling do Crepúsculo',
    originalName: 'Twilight Halfling',
    description:
      'Seus ancestrais realizaram muitos atos secretos sob o manto do crepúsculo, para o bem ou para o mal, e com o tempo desenvolveram a capacidade de ver no crepúsculo além mesmo da visão aguçada usual dos halflings. Você ganha visão na penumbra.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 59,
    rulesSummary: 'Ganha Visão na Penumbra.',
    specialAbilities: [
      {
        id: 'twilight-low-light',
        name: 'Visão na Penumbra',
        originalName: 'Low-Light Vision',
        actionType: 'passive',
        description:
          'Você enxerga na penumbra como se fosse luz intensa, ignorando a condição ocultado causada por penumbra.',
      },
    ],
  },
  {
    id: HERITAGE_WILDWOOD_HALFLING_ID,
    ancestryId: ANCESTRY_HALFLING_ID,
    name: 'Halfling do Bosque Selvagem',
    originalName: 'Wildwood Halfling',
    description:
      'Você veio do fundo de uma selva ou floresta e aprendeu a usar seu tamanho pequeno para se contorcer por vegetação e outros obstáculos. Ignora qualquer terreno difícil causado por plantas e fungos, como arbustos, vinhas e sub-bosque.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_PLAYER_CORE_ID,
    sourcePage: 59,
    rulesSummary:
      'Ignora terreno difícil causado por plantas e fungos.',
  },
]
