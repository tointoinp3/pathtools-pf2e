import type { CreatureFamily } from '@/types/creature'

const SOURCE = 'Season of Ghosts (Hardcover)'

function fam(
  partial: Omit<CreatureFamily, 'source'> & { source?: string },
): CreatureFamily {
  return { source: SOURCE, ...partial }
}

/**
 * Famílias AoN Monster Families de Season of Ghosts (Hardcover).
 * Asides = barras laterais oficiais da página da família. Sem blurb de membro.
 * Famílias já no catálogo (fantasma, vampiro, zumbi, kami, fantasma/phantom, gremlin)
 * são reusadas pelos IDs antigos.
 */
export const catalogCreatureFamiliesSeasonOfGhosts: CreatureFamily[] = [
  fam({
    id: 'family-nindoru',
    name: "Nindoru",
    originalName: "Nindoru",
    trait: "Nindoru",
    sourcePage: 328,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=676",
    intro:
      "Quando uma alma mortal maligna que já reencarnou várias vezes é arrancada do ciclo das almas e corrompida, pode sofrer uma transformação horrenda e virar um capeta conhecido como nindoru. Força de entropia e de quebra de ciclos, nindorus são criaturas hediondas, com corpos distorcidos, armas estilhaçadas que mesmo assim funcionam, e o verdadeiro rosto quase sempre escondido. Exibem traços que se esperaria de um morto-vivo — carne em decomposição, ossos quebrados — mas nindorus estão muito vivos.\n\nCada nindoru epitomiza a fratura de um ciclo específico, da natureza ou das tradições sociais. Para eles, nada é mais delicioso do que consumir uma criatura que reencarnou várias vezes; as que, em tese, estariam prestes a alcançar a verdadeira iluminação são a refeição mais saborosa. Quem um nindoru mata também é arrancado do ciclo — os sortudos seguem para o Ossuário para o julgamento, mas muitos são corrompidos e viram mais desses capetas horrendos.\n\nSeguidores de Sangpotshi consideram nindorus particularmente abomináveis e entre as maiores ameaças imagináveis. Encontrados sobretudo onde o ciclo de reencarnação é mais forte, nindorus, como os rakshasas, ligam-se ao Universo — e não a um dos planos profanos do Grande Além.",
    sections: [
      {
        id: "nindoru-butterflies",
        title: "Borboletas Nindoru",
        body: "Um dos traços compartilhados mais estranhos dos vários tipos de nindoru são as borboletas vermelho-sangue que parecem segui-los, nidificar no corpo ou emergir periodicamente das feridas. Esses insetos inquietantes são manifestações físicas dos pensamentos dos nindorus e simbolizam as incontáveis vidas passadas que já viveram e das quais viraram as costas. Borboletas nindoru não duram muito depois de voar a mais de uns poucos palmos da fonte: desfazem-se em fumaça que se dissipa no ar.",
      },
      {
        id: "nindoru-demigods",
        title: "Semideuses Nindoru",
        body: "Os nindorus mais poderosos são semideuses, embora os cultos sejam bem raros. Propensos a reencarnar após a morte, semideuses nindoru como Kugaptee são mais propriamente conhecidos como “ascetas nindoru”.",
      },
      {
        id: "nindoru-trait",
        title: "Traço Nindoru",
        body: "Nindorus são capetas profanos que surgem de corrupções no ciclo de almas reencarnantes e vivem no Universo. Embora muitos elementos da aparência os façam parecer mortos-vivos, são seres vivos. A maioria tem visão no escuro, imunidade a efeitos de morte, fraqueza a prata e o poder de manifestar objetos ou criaturas a partir dos pensamentos.",
      },
      {
        id: "nindoru-traitors",
        title: "Traidores Nindoru",
        body: "Embora a maioria dos nindorus seja puramente maligna e profana, lendas falam de nindorus excepcionalmente raros que escapam da própria natureza e ascendem, reencarnando após a morte em kami ou outros espíritos mais benévolos e perdendo o traço nindoru. É claro que esses “traidores” são considerados a refeição mais deliciosa imaginável pelos nindorus que ficaram para trás.",
      },
      {
        id: "reincarnated-souls",
        title: "Almas Reencarnadas",
        body: "Em alguns casos, você saberá se a criatura que um nindoru ataca tem alma reencarnada. Ancestralidades como samsaranos são sempre almas reencarnadas, e o histórico de um PC — ou até o antecedente — pode indicar uma vida anterior. Todos os PCs da Adventure Path Season of Ghosts qualificam-se como almas reencarnadas, pois reliveram as vidas de novo e de novo por décadas. Se precisar determinar se a alma de uma criatura é reencarnada para adjudicar uma habilidade de nindoru, faça um teste simples CD 11 — em um sucesso, ela tem alma reencarnada.",
      },
      {
        id: "weapons-of-choice",
        title: "Armas de Preferência",
        body: "Vários dos nindorus apresentados aqui têm tipos preferidos de arma e até habilidades ligadas a esse tipo. Um nindoru que empunhe outra arma ainda pode usar essas habilidades associadas, mas o sabor da habilidade deve ser ajustado conforme couber.",
      },
    ],
  }),
  fam({
    id: 'family-noppera-bo',
    name: "Noppera-bo",
    originalName: "Noppera-bo",
    trait: null,
    sourcePage: 338,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=677",
    intro:
      "Noppera-bos parecem humanos comuns por trás, e podem até lembrar alguém que você conhece, até se virarem e revelarem um rosto sem feições.",
    sections: [
      {
        id: "consumate-professionals",
        title: "Profissionais Consumados",
        body: "Embora o noppera-bo típico seja cruel e se deleite em assustar ou atormentar humanoides, nem todos se chafurdam no mal. Alguns preferem o papel de trocistas e usam as habilidades para enganar e caçoar, enquanto noppera-bos ainda mais raros honram e idolatram quem admiram e dedicam o tempo a desenvolver a arte ou a fabricar ferramentas de paz.",
      },
      {
        id: "noppera-bo-origins",
        title: "Origens dos Noppera-bo",
        body: "Há muitas teorias sobre a origem dos noppera-bos — de tanukis cuja habilidade Mudar Forma deu errado a humanoides distorcidos por maldições, até yokai que surgem naturalmente. Alguns até teorizam que a condição já foi uma maldição transmissível como a licantropia. A maioria dos noppera-bos não lembra da origem e costuma estar mais interessada em fingir ser outra pessoa por completo.",
      },
    ],
  }),
  fam({
    id: 'family-thatchling',
    name: "Thatchling",
    originalName: "Thatchling",
    trait: null,
    sourcePage: 349,
    aonUrl: "https://2e.aonprd.com/MonsterFamilies.aspx?ID=678",
    intro:
      "No interior de Shenmen, alguns ramos de Sangpotshi alertam o que pode acontecer se uma alma destinada à reencarnação for impedida de entrar no Rio das Almas e retomar o ciclo. Essas almas ficam frustradas, confusas e depois furiosas com o que sentem como a negação do corpo que merecem e, por sua vez, forçam a vegetação a servir de novo corpo. Outros teorizam que, quando um corpo é enterrado em cova rasa, as raízes da grama que crescem para baixo nos restos podem enredar a alma e capturá-la.\n\nThatchlings são inteligentes e capazes de falar, mas raramente o fazem — em geral têm pouco a dizer àqueles cujas vidas cobiçam. Raramente, um pode tentar atrair alguém para um trecho de capim alto ou mato denso pedindo socorro, mas têm pouca habilidade em enganação, então essa tática não é particularmente eficaz para fazê-los parecer criaturas vivas de fato precisando de ajuda.",
    sections: [
      {
        id: "forever-senseless",
        title: "Para Sempre Sem Juízo",
        body: "A maldição do thatchling rouba o senso de direção de quem a sofre, o que gerou toda uma categoria de insultos em Shenmen que comparam a capacidade de alguém de fazer algo ao “senso de thatchling”. Por exemplo, quem tem dificuldade de fazer amigos pode ter “o senso de amizade de um thatchling”, enquanto quem arruína refeições o tempo todo pode ter “o senso de cozinha de um thatchling”.",
      },
      {
        id: "old-friends",
        title: "Velhos Amigos",
        body: "A origem dos thatchlings de Willowshore é o simples fato de que as almas que normalmente reencarnariam ao morrer não conseguem, e assim surgem como thatchlings. É claro que, como cada ano “reinicia” as coisas, quem morreu durante o ano e virou thatchling renasce vivo no primeiro dia de cada verão, sem memórias da existência anterior condenada. Embora ainda impelidos pelo instinto a atacar os vivos, os thatchlings de Willowshore sentem remorso — se o mestre julgar especialmente apropriado, podem sofrer penalidade de circunstância de –2 nas jogadas de ataque e salvaguardas contra criaturas que conheciam em vida.",
      },
    ],
  }),
]
