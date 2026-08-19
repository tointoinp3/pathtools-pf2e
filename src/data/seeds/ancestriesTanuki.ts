import type { Ancestry, Heritage } from '@/types/ancestry'
import { SOURCE_TIAN_XIA_CG_ID } from './sources'

export const ANCESTRY_TANUKI_ID = 'ancestry-tanuki'

export const HERITAGE_ASCETIC_TANUKI_ID = 'heritage-ascetic-tanuki'
export const HERITAGE_COURAGEOUS_TANUKI_ID = 'heritage-courageous-tanuki'
export const HERITAGE_EVEN_TEMPERED_TANUKI_ID = 'heritage-even-tempered-tanuki'
export const HERITAGE_STEADFAST_TANUKI_ID = 'heritage-steadfast-tanuki'
export const HERITAGE_VIRTUOUS_TANUKI_ID = 'heritage-virtuous-tanuki'

/** Tanuki — Tian Xia Character Guide, Archives of Nethys ID 90 */
export const tanukiAncestry: Ancestry = {
  id: ANCESTRY_TANUKI_ID,
  name: 'Tanuki',
  originalName: 'Tanuki',
  rarity: 'uncommon',
  provenance: { type: 'official' },
  sourceId: SOURCE_TIAN_XIA_CG_ID,
  sourcePage: 64,
  hitPoints: 10,
  size: 'small',
  speed: 25,
  attributeBoosts: [
    {
      id: 'tanuki-boost-con',
      label: 'Boost de Constituição',
      option: { kind: 'specific', attributes: ['constitution'] },
    },
    {
      id: 'tanuki-boost-cha',
      label: 'Boost de Carisma',
      option: { kind: 'specific', attributes: ['charisma'] },
    },
    {
      id: 'tanuki-boost-free',
      label: 'Boost livre',
      option: { kind: 'free', excludeAlreadyChosen: true },
    },
  ],
  attributeFlaws: ['wisdom'],
  languages: {
    automatic: ['Comum', 'Tanuki'],
    additionalOptions: [
      'Elfo',
      'Feérico',
      'Gnomo',
      'Goblin',
      'Kitsune',
      'Tengu',
    ],
    additionalFromIntelligence: true,
  },
  senses: [],
  specialAbilities: [
    {
      id: 'tanuki-change-shape',
      name: 'Mudar Forma',
      originalName: 'Change Shape',
      actionType: 'one',
      description:
        '(Concentrar, polimorfia, primal, tanuki.) Você se transforma num cão-guaxinim mundano, usando as estatísticas de forma de praga. É uma forma específica de cão-guaxinim da mesma idade e tipo de corpo da forma verdadeira, com traços físicos análogos (cor da pelagem, etc.). Conta como criar um disfarce para o uso de Enganação para Personificar. Você perde quaisquer Golpes desarmados ganhos de herança ou feito tanuki nesta forma. Pode permanecer na forma de cão-guaxinim indefinidamente e voltar à forma tanuki usando esta ação de novo.',
    },
  ],
  traits: ['Tanuki', 'Humanoide'],
  lore: {
    summary:
      'Tanukis são humanoides semelhantes a cães-guaxinim, nativos de Minkai, com poderes de ilusão e metamorfose que usam sobretudo para se divertir — pregar peças nos poderosos e lembrar a todos que a vida é uma festa antes da sorte acabar.',
    youMight: [
      'Viver no máximo, mesmo que isso traga encrenca.',
      'Orgulhar-se de deveres e feitos, por mais humildes.',
      'Aceitar o papel de azarão e ver a falha como uma boa punchline.',
    ],
    othersProbably: [
      'Acham você a alma de qualquer festa.',
      'Sabem que sempre terá as costas deles.',
      'Esperam que você esteja prestes a pregar uma peça.',
    ],
    physicalDescription:
      'Tanukis são humanoides baixos que lembram cães-guaxinim bípedes, em geral entre 90 cm e 1,20 m. Corpo roliço, barriga larga ainda mais larga pela pelagem espessa. Rosto redondo, olhos alertas numa máscara escura de pelo. Uma única cauda farta, da qual se orgulham e à qual atribuem os poderes. A cultura preza formas arredondadas — bonecos daruma, portas circulares, a lua. Roupas simples no dia a dia; nas festas, capricham. Muitos carregam colete vermelho e toalha de dança para o caso de uma festa improvisada.',
    society:
      'Sabem que, entre os povos de Golarion, são azarões: nem o domínio dos céus dos tengus nem o favor divino dos kitsunes. Por isso se apoiam, em comunidades apertadas onde todos se conhecem, à margem de vilarejos — armazéns abandonados, fazendas, templos. Quando se sobrepõem a outros povos, funcionam quase invisíveis, com códigos próprios. Amam celebrar: uma ponte nova pode ter cerimônia de início, brinde do projeto, almoço da equipe, banquete da conclusão e festival para dançar sobre a ponte. Por isso obras tanuki demoram (e às vezes fracassam com estilo) — mas os laços forjados na festa são parte do projeto.',
    beliefs:
      'Nenhum membro da Corte Celestial é tanuki — mais uma razão para cuidarem uns dos outros. Atraem-se por Kofusachi. Reverenciam a lua, mas evitam Tsukiyo nas festas ruidosas da lua da colheita. No Mar Interior, muitos veem Cayden Cailean como tanuki disfarçado. Usam os poderes para humilhar ricos e snobs; o mal, quando existe, costuma ser só uma piada ou uma refeição de quem pode pagar. Alguns, porém, deixam o rancor apodrecer e viram cruéis.',
    popularEdicts: [
      'Escolher a empolgação em vez da estabilidade',
      'Deixar o passado no passado',
      'Fazer a comunidade rir',
    ],
    popularAnathema: [
      'Sentir-se no direito de status social',
      'Pregar peça em quem tem menos meios que você',
      'Chafurdar nas próprias falhas',
    ],
    sampleNames: [
      'Ame',
      'Chiyo',
      'Chosuke',
      'Hinata',
      'Mari',
      'Nao',
      'Taro',
      'Rei',
      'Ichiro',
      'Satsuki',
      'Nanami',
      'Hazuki',
    ],
  },
  heritageIds: [
    HERITAGE_ASCETIC_TANUKI_ID,
    HERITAGE_COURAGEOUS_TANUKI_ID,
    HERITAGE_EVEN_TEMPERED_TANUKI_ID,
    HERITAGE_STEADFAST_TANUKI_ID,
    HERITAGE_VIRTUOUS_TANUKI_ID,
  ],
  aonUrl: 'https://2e.aonprd.com/Ancestries.aspx?ID=90',
}

export const tanukiHeritages: Heritage[] = [
  {
    id: HERITAGE_ASCETIC_TANUKI_ID,
    ancestryId: ANCESTRY_TANUKI_ID,
    name: 'Tanuki Asceta',
    originalName: 'Ascetic Tanuki',
    description:
      'Dizem que a forma redonda vem de calma e contenção, não de indulgência. Você ganha faro como sentido impreciso com alcance de 9 metros. O mestre em geral dobra o alcance se você está a favor do vento em relação ao que cheira, ou reduz à metade se está contra o vento. Além disso, recebe +2 de bônus de circunstância a Percepção ao tentar localizar comida, bebida ou item consumível ingerido (poção, elixir etc.) usando o faro.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 65,
    rulesSummary:
      'Faro impreciso 9 m; +2 Percepção para achar comida, bebida ou consumível ingerido pelo faro.',
    senses: [
      {
        id: 'ascetic-scent',
        kind: 'scent',
        name: 'Faro',
        originalName: 'Scent',
        range: 30,
        description:
          'Faro impreciso com alcance de 9 metros. O alcance em geral dobra a favor do vento e cai à metade contra o vento.',
      },
    ],
    specialAbilities: [
      {
        id: 'ascetic-food-scent',
        name: 'Faro de Banquete',
        originalName: 'Banquet Scent',
        actionType: 'passive',
        description:
          '+2 de bônus de circunstância a Percepção para localizar comida, bebida ou consumível ingerido usando o faro.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=396',
  },
  {
    id: HERITAGE_COURAGEOUS_TANUKI_ID,
    ancestryId: ANCESTRY_TANUKI_ID,
    name: 'Tanuki Corajoso',
    originalName: 'Courageous Tanuki',
    description:
      'O coração bate com a coragem dos que vieram antes — a bravura que só um tanuki demonstra. Sempre que ganha a condição fugindo, também recebe +3 metros de bônus de circunstância aos Deslocamentos enquanto fugir. Com a condição fugindo, em vez de gastar todas as ações para escapar, pode agir normalmente em uma ação, mas ainda deve gastar o restante fugindo. Você também ganha a habilidade Retirada Tática.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 66,
    rulesSummary:
      'Ao fugir: +3 m aos deslocamentos e 1 ação livre; 1×/hora, ao ficar amedrontado, ganha fugindo até o próximo turno e Avança.',
    specialAbilities: [
      {
        id: 'courageous-fleeing',
        name: 'Fuga Tanuki',
        originalName: 'Tanuki Flight',
        actionType: 'passive',
        description:
          'Com a condição fugindo, +3 m de bônus de circunstância aos Deslocamentos. Pode agir normalmente em uma ação; o restante das ações ainda deve ser gasto fugindo.',
      },
      {
        id: 'courageous-tactical-retreat',
        name: 'Retirada Tática',
        originalName: 'Tactical Retreat',
        actionType: 'reaction',
        frequency: '1 vez por hora',
        trigger: 'Você ganha a condição amedrontado',
        description:
          '(Emoção, medo, mental, tanuki.) A discrição é a melhor parte da valentia: você se afasta da ameaça. Ganha a condição fugindo até o início do seu próximo turno e Avança.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=398',
  },
  {
    id: HERITAGE_EVEN_TEMPERED_TANUKI_ID,
    ancestryId: ANCESTRY_TANUKI_ID,
    name: 'Tanuki Equilibrado',
    originalName: 'Even-tempered Tanuki',
    description:
      'Você tem uma serenidade incomum entre tanukis, que sempre parecem explodir. Recebe +1 de bônus de circunstância a salvaguardas contra efeitos de emoção. Se rolar sucesso numa salvaguarda contra emoção, vira sucesso crítico; se rolar falha, vira falha crítica.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 66,
    rulesSummary:
      '+1 salvaguardas vs emoção; sucesso→crítico e falha→falha crítica contra emoção.',
    specialAbilities: [
      {
        id: 'even-tempered-emotion',
        name: 'Serenidade Volátil',
        originalName: 'Volatile Serenity',
        actionType: 'passive',
        description:
          '+1 de bônus de circunstância a salvaguardas contra efeitos de emoção. Sucesso vira sucesso crítico; falha vira falha crítica.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=397',
  },
  {
    id: HERITAGE_STEADFAST_TANUKI_ID,
    ancestryId: ANCESTRY_TANUKI_ID,
    name: 'Tanuki Firme',
    originalName: 'Steadfast Tanuki',
    description:
      'Seu orgulho da verdadeira forma tanuki não conhece limites. Você ganha Forma Cotidiana ou Forma de Chaleira como feito de ancestralidade bônus (escolha).',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 66,
    rulesSummary: 'Feito bônus: Forma Cotidiana ou Forma de Chaleira.',
    choices: [
      {
        id: 'steadfast-form-feat',
        label: 'Feito de forma',
        options: [
          {
            id: 'feat-tanuki-everyday-form',
            label: 'Forma Cotidiana',
            originalLabel: 'Everyday Form',
          },
          {
            id: 'feat-tanuki-teakettle-form',
            label: 'Forma de Chaleira',
            originalLabel: 'Teakettle Form',
          },
        ],
      },
    ],
    featGrants: [
      {
        id: 'steadfast-form',
        featName: 'Forma (escolhida)',
        originalName: 'Everyday Form or Teakettle Form',
        featType: 'ancestry',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=399',
  },
  {
    id: HERITAGE_VIRTUOUS_TANUKI_ID,
    ancestryId: ANCESTRY_TANUKI_ID,
    name: 'Tanuki Virtuoso',
    originalName: 'Virtuous Tanuki',
    description:
      'Muitos tanukis carregam uma cabaça de álcool para lembrar-se de agir com virtude — e, por esses padrões, você é virtuoso mesmo. Recebe resistência a veneno igual à metade do seu nível (mínimo 1). Pode comer e beber mesmo enjoado. Não fica incapacitado por álcool convencional se não quiser.',
    rarity: 'common',
    provenance: { type: 'official' },
    sourceId: SOURCE_TIAN_XIA_CG_ID,
    sourcePage: 66,
    rulesSummary:
      'Resistência a veneno = metade do nível (mín. 1); come/bebe enjoado; imune a incapacitado por álcool convencional se quiser.',
    resistances: [
      {
        kind: 'halfLevelMin1',
        damageType: 'poison',
        label: 'Resistência a veneno',
      },
    ],
    specialAbilities: [
      {
        id: 'virtuous-drink',
        name: 'Virtude da Cabaça',
        originalName: 'Gourd Virtue',
        actionType: 'passive',
        description:
          'Você pode comer e beber quando está enjoado. Não fica incapacitado por álcool convencional se não quiser.',
      },
    ],
    aonUrl: 'https://2e.aonprd.com/Heritages.aspx?ID=400',
  },
]
